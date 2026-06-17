(function () {
  "use strict";

  const lanes = normalizeLanes(window.PTD_DEMO_LANES || []);
  const autostart = window.PTD_DEMO_AUTOSTART !== false;
  const state = {
    playing: autostart,
    speed: 1,
    timeMs: 0,
    lastFrame: 0,
    durationMs: 0,
    activeTreeIdx: -1,
    linkedBurst: null,
  };

  const els = {};

  const TreePanel =
    window.PTDTreePanel && typeof window.PTDTreePanel.createTreePanel === "function"
      ? window.PTDTreePanel.createTreePanel({ showDebug: new URLSearchParams(window.location.search).get("debug") === "1" })
      : null;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    if (!lanes.length) {
      renderFatalError("No lanes loaded. Expected real lane data scripts in player/data/.");
      return;
    }

    const validations = lanes.map(validateLaneTiming);
    state.durationMs = Math.max(...lanes.map((lane) => laneDuration(lane)));

    buildHero(validations);
    buildCards(validations);
    buildRaceBars();
    setupTreePanel(validations);
    setupControls();
    render();
    window.requestAnimationFrame(tick);
  }

  function cacheElements() {
    els.heroStats = document.getElementById("heroStats");
    els.playToggle = document.getElementById("playToggle");
    els.resetButton = document.getElementById("resetButton");
    els.speedRange = document.getElementById("speedRange");
    els.speedValue = document.getElementById("speedValue");
    els.scrubRange = document.getElementById("scrubRange");
    els.clockReadout = document.getElementById("clockReadout");
    els.syntheticWatermark = document.getElementById("syntheticWatermark");
    els.laneGrid = document.getElementById("laneGrid");
    els.raceBars = document.getElementById("raceBars");
    els.raceSummary = document.getElementById("raceSummary");
    els.treePanel = document.getElementById("treePanel");
    els.treeTimingBadge = document.getElementById("treeTimingBadge");
    els.provenance = document.getElementById("provenance");
  }

  function normalizeLanes(rawLanes) {
    return rawLanes.map((lane, laneIdx) => {
      const events = lane.events.map((event, eventIdx) => ({
        ...event,
        idx: event.idx ?? eventIdx,
        t_ms: Number(event.t_ms),
        dur_ms: Number(event.dur_ms),
        end_ms: Number(event.t_ms) + Number(event.dur_ms),
      }));
      const tokenOffsets = [];
      let tokenCursor = 0;
      events.forEach((event) => {
        tokenOffsets.push(tokenCursor);
        tokenCursor += event.token_texts.length;
      });
      return {
        ...lane,
        laneIdx,
        events,
        tokenOffsets,
        fullText: events.map((event) => event.text).join(""),
      };
    });
  }

  function validateLaneTiming(lane) {
    const sum = round2(lane.events.reduce((total, event) => total + event.dur_ms, 0));
    const wall = Number(lane.totals.wall_ms);
    const tolerance = Math.max(wall * 0.01, 0.01);
    const timelineEnd = lane.events.reduce((max, event) => Math.max(max, event.end_ms), 0);
    const valid = Math.abs(sum - wall) <= tolerance || (sum <= wall + tolerance && timelineEnd <= wall + tolerance);
    const source = lane.lane.timing_source;
    const real = source === "real" && valid;
    return {
      method: lane.lane.method,
      source,
      sum,
      wall,
      valid,
      badge: real ? "real recorded timing" : valid ? "synthetic timing" : "timing mismatch",
      badgeClass: real ? "real" : valid ? "synthetic" : "invalid",
    };
  }

  function laneDuration(lane) {
    const declared = lane.totals && Number.isFinite(Number(lane.totals.wall_ms)) ? Number(lane.totals.wall_ms) : 0;
    const lastEnd = lane.events.reduce((max, event) => Math.max(max, event.end_ms), 0);
    return Math.max(declared, lastEnd);
  }

  function buildHero(validations) {
    const hasSynthetic = validations.some((item) => item.source !== "real" || !item.valid);
    els.syntheticWatermark.hidden = !hasSynthetic;
    els.heroStats.innerHTML = "";
    lanes.forEach((lane) => {
      const pill = document.createElement("span");
      pill.className = "stat-pill";
      pill.textContent = `${lane.lane.method}: ${lane.totals.tokens} tok / ${formatMs(laneDuration(lane))}`;
      els.heroStats.appendChild(pill);
    });
    const prompt = lanes[0].prompt;
    const laneDevices = lanes
      .map((lane) => `${lane.lane.method}: ${lane.lane.device} (${lane.lane.recorded})`)
      .join(" / ");
    els.provenance.textContent = `${prompt.id} - ${lanes[0].lane.model} - ${laneDevices}`;
    els.raceSummary.textContent = `${lanes.length} lanes / ${formatMs(state.durationMs)} master`;
  }

  function buildCards(validations) {
    els.laneGrid.innerHTML = "";
    lanes.forEach((lane, idx) => {
      const validation = validations[idx];
      const card = document.createElement("article");
      card.className = "lane-card";
      card.dataset.laneIndex = String(idx);
      card.innerHTML = `
        <div class="terminal-chrome">
          <div class="traffic" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="lane-title">${escapeHtml(lane.lane.method)} - ${escapeHtml(lane.lane.model)}</div>
          <span class="timing-badge ${validation.badgeClass}">${validation.badge}</span>
        </div>
        <div class="terminal-body">
          <pre class="stream-text" data-stream></pre>
          <div>
            <div class="metric-grid">
              <div class="metric"><span>Tokens</span><strong data-tokens>0/${lane.totals.tokens}</strong></div>
              <div class="metric"><span>Elapsed</span><strong data-elapsed>0 ms</strong></div>
              <div class="metric"><span>Live TPS</span><strong data-tps>0.0</strong></div>
            </div>
            <div class="progress-track" aria-hidden="true"><div class="progress-fill" data-progress></div></div>
            <div class="lane-foot">
              <span data-burst>waiting</span>
              <span class="finish-badge" data-finish>Total ${formatMs(laneDuration(lane))}</span>
            </div>
          </div>
        </div>
      `;
      els.laneGrid.appendChild(card);
    });
  }

  function buildRaceBars() {
    els.raceBars.innerHTML = "";
    lanes.forEach((lane, idx) => {
      const row = document.createElement("div");
      row.className = "race-row";
      row.dataset.laneIndex = String(idx);
      row.innerHTML = `
        <span>${escapeHtml(lane.lane.method)}</span>
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" data-race-progress></div></div>
        <span data-race-text>0%</span>
      `;
      els.raceBars.appendChild(row);
    });
  }

  function setupTreePanel(validations) {
    const ptdIndex = lanes.findIndex((lane) => lane.lane.method.toLowerCase() === "ptd");
    if (ptdIndex < 0) {
      els.treePanel.innerHTML = '<div class="error">No PTD lane found for TreePanel.</div>';
      return;
    }
    if (!TreePanel) {
      els.treePanel.innerHTML = '<div class="error">tree-panel.js did not load.</div>';
      return;
    }
    TreePanel.init(els.treePanel, lanes[ptdIndex]);
    if (typeof TreePanel.setScrubHandler === "function") {
      TreePanel.setScrubHandler((timeMs) => {
        state.timeMs = clamp(timeMs, 0, state.durationMs);
        state.playing = false;
        updatePlayButton();
        render();
      });
    }
    els.treePanel.dataset.laneIndex = String(ptdIndex);
    const validation = validations[ptdIndex];
    els.treeTimingBadge.textContent = validation.badge;
    els.treeTimingBadge.className = `timing-badge ${validation.badgeClass}`;
    window.addEventListener("resize", () => TreePanel.resize());
  }

  function setupControls() {
    els.scrubRange.max = String(Math.ceil(state.durationMs));
    els.playToggle.addEventListener("click", () => {
      if (!state.playing && state.timeMs >= state.durationMs) {
        state.timeMs = 0;
        render();
      }
      state.playing = !state.playing;
      state.lastFrame = performance.now();
      updatePlayButton();
    });
    els.resetButton.addEventListener("click", () => {
      state.timeMs = 0;
      state.playing = true;
      state.lastFrame = performance.now();
      updatePlayButton();
      render();
    });
    els.speedRange.addEventListener("input", () => {
      state.speed = Number(els.speedRange.value);
      els.speedValue.textContent = `${state.speed.toFixed(2)}x`;
      render();
    });
    els.scrubRange.addEventListener("input", () => {
      state.timeMs = clamp(Number(els.scrubRange.value), 0, state.durationMs);
      state.playing = false;
      updatePlayButton();
      render();
    });
    els.laneGrid.addEventListener("mouseover", handleBurstOver);
    els.laneGrid.addEventListener("mouseout", handleBurstOut);
    updatePlayButton();
  }

  function tick(now) {
    if (!state.lastFrame) state.lastFrame = now;
    const delta = now - state.lastFrame;
    state.lastFrame = now;
    if (state.playing) {
      state.timeMs = clamp(state.timeMs + delta * state.speed, 0, state.durationMs);
      if (state.timeMs >= state.durationMs) {
        state.playing = false;
        updatePlayButton();
      }
      render();
    }
    window.requestAnimationFrame(tick);
  }

  function render() {
    els.scrubRange.value = String(Math.round(state.timeMs));
    els.clockReadout.textContent = formatMs(state.timeMs);
    const laneStates = lanes.map((lane) => deriveLaneState(lane, state.timeMs));
    const leaderTokens = Math.max(...laneStates.map((item) => item.visibleTokens));

    laneStates.forEach((laneState, idx) => {
      renderLane(lanes[idx], laneState, leaderTokens);
      renderRaceRow(lanes[idx], laneState);
    });
    renderTree(laneStates);
  }

  function deriveLaneState(lane, t) {
    const visibleEvents = [];
    let visibleTokens = 0;
    let activeIdx = -1;

    lane.events.forEach((event, idx) => {
      if (event.end_ms <= t + 0.001) {
        visibleEvents.push(event);
        visibleTokens += event.token_texts.length;
      }
      if (event.t_ms <= t + 0.001 && event.end_ms > t + 0.001) {
        activeIdx = idx;
      }
    });

    const duration = laneDuration(lane);
    const elapsed = clamp(t, 0, duration);
    const progress = clamp(visibleTokens / lane.totals.tokens, 0, 1);
    const finished = elapsed >= duration - 0.001;
    const text = visibleEvents.map((event) => event.text).join("");
    const activeEvent = activeIdx >= 0 ? lane.events[activeIdx] : null;
    const tps = elapsed > 0 ? visibleTokens / (elapsed / 1000) : 0;

    return {
      visibleEvents,
      visibleTokens,
      activeIdx,
      activeEvent,
      elapsed,
      progress,
      finished,
      text,
      tps,
    };
  }

  function renderLane(lane, laneState, leaderTokens) {
    const card = els.laneGrid.querySelector(`[data-lane-index="${lane.laneIdx}"]`);
    card.classList.toggle("leader", laneState.visibleTokens === leaderTokens && leaderTokens > 0);
    card.querySelector("[data-stream]").innerHTML = renderStream(lane, laneState);
    card.querySelector("[data-tokens]").textContent = `${laneState.visibleTokens}/${lane.totals.tokens}`;
    card.querySelector("[data-elapsed]").textContent = formatMs(laneState.elapsed);
    card.querySelector("[data-tps]").textContent = laneState.tps.toFixed(1);
    card.querySelector("[data-progress]").style.width = `${(laneState.progress * 100).toFixed(1)}%`;
    card.querySelector("[data-burst]").textContent = laneState.activeEvent
      ? `${laneState.activeEvent.token_texts.length} tok event`
      : "waiting";
    card.querySelector("[data-finish]").style.visibility = laneState.finished ? "visible" : "hidden";
  }

  function renderRaceRow(lane, laneState) {
    const row = els.raceBars.querySelector(`[data-lane-index="${lane.laneIdx}"]`);
    row.querySelector("[data-race-progress]").style.width = `${(laneState.progress * 100).toFixed(1)}%`;
    row.querySelector("[data-race-text]").textContent = `${Math.round(laneState.progress * 100)}%`;
  }

  function renderTree(laneStates) {
    const ptdIndex = Number(els.treePanel.dataset.laneIndex);
    if (!Number.isInteger(ptdIndex)) return;
    if (!TreePanel) return;
    const laneState = laneStates[ptdIndex];
    if (laneState.activeIdx !== state.activeTreeIdx) {
      state.activeTreeIdx = laneState.activeIdx;
      TreePanel.onRound(laneState.activeEvent, laneState.activeIdx);
    }
    TreePanel.onSeek(state.timeMs, {
      speed: state.speed,
      playing: state.playing,
      scrubbing: false,
    });
  }

  function renderStream(lane, laneState) {
    const bursts = laneState.visibleEvents
      .map((event, idx) => {
        const tint = idx % 2 === 0 ? "0.18" : "0.32";
        return (
          '<span class="stream-burst" data-lane-index="' +
          lane.laneIdx +
          '" data-round-index="' +
          idx +
          '" style="border-bottom-color: rgba(122, 184, 116, ' +
          tint +
          ')">' +
          escapeHtml(event.text) +
          "</span>"
        );
      })
      .join("");
    return bursts + (laneState.finished ? "" : '<span class="cursor"></span>');
  }

  function handleBurstOver(event) {
    const burst = event.target.closest(".stream-burst");
    if (!burst || !els.laneGrid.contains(burst)) return;
    const ptdIndex = Number(els.treePanel.dataset.laneIndex);
    if (Number(burst.dataset.laneIndex) !== ptdIndex) return;
    if (state.linkedBurst && state.linkedBurst !== burst) state.linkedBurst.classList.remove("is-linked");
    state.linkedBurst = burst;
    burst.classList.add("is-linked");
    if (TreePanel && typeof TreePanel.highlightRound === "function") {
      TreePanel.highlightRound(Number(burst.dataset.roundIndex), true);
    }
  }

  function handleBurstOut(event) {
    const burst = event.target.closest(".stream-burst");
    if (!burst || !els.laneGrid.contains(burst)) return;
    if (event.relatedTarget && burst.contains(event.relatedTarget)) return;
    burst.classList.remove("is-linked");
    if (state.linkedBurst === burst) state.linkedBurst = null;
    if (TreePanel && typeof TreePanel.highlightRound === "function") {
      TreePanel.highlightRound(-1, false);
    }
  }

  function updatePlayButton() {
    els.playToggle.textContent = state.playing ? "Pause" : "Resume";
    els.playToggle.setAttribute(
      "aria-label",
      state.playing ? "Pause playback" : "Resume playback"
    );
  }

  function renderFatalError(message) {
    document.body.innerHTML = `<main class="app-shell"><div class="error">${escapeHtml(message)}</div></main>`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round2(value) {
    return Math.round(value * 100) / 100;
  }

  function formatMs(value) {
    return `${Math.round(value).toLocaleString("en-US")} ms`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
