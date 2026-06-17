(function () {
  "use strict";

  const LANE_META = {
    ar: { id: "ar_hf", label: "AR-HF", channel: "LN-01" },
    vllm: { id: "vllm_ar", label: "vLLM AR", channel: "LN-02" },
    dflash: { id: "dflash", label: "DFlash", channel: "LN-03" },
    ptd: { id: "ptd", label: "PTD", channel: "LN-04" },
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    const lanes = normalizeSiteLanes(window.PTD_DEMO_LANES_ALL || window.PTD_DEMO_LANES || []);
    const generated = window.PTD_C3_FIGURE_GENERATED_METRICS || null;
    const metrics = generated || buildMetricsFromLanes(lanes);
    window.PTD_C3_FIGURE_READY = false;
    window.PTD_C3_FIGURE_STATE = { runState: "armed", hud: "" };

    if (!metrics) {
      exposeState("blocked", "metrics unavailable");
      return;
    }

    renderMetrics(metrics, lanes);
    setupRun(metrics);
    window.setTimeout(fillPreviews, 0);
    setupTreeBreakout(metrics, lanes);
    exposeState("armed", "");
    window.PTD_C3_FIGURE_READY = true;
  }

  function normalizeSiteLanes(rawLanes) {
    return rawLanes.map((lane, index) => {
      const key = methodKey(lane.lane && lane.lane.method);
      const meta = LANE_META[key] || {
        id: key || `lane_${index + 1}`,
        label: lane.lane && lane.lane.method ? lane.lane.method : `Lane ${index + 1}`,
        channel: `LN-${String(index + 1).padStart(2, "0")}`,
      };
      lane.__siteId = meta.id;
      lane.__siteLabel = meta.label;
      lane.__siteChannel = meta.channel;
      return lane;
    });
  }

  function renderMetrics(metrics, lanes) {
    const ptd = findMethod(metrics, "ptd");
    text(
      "[data-race-caption]",
      `${metrics.prompt.model} / ${metrics.prompt.device} / ${metrics.prompt.config} / ${metrics.prompt.recorded}`
    );
    text("[data-run-state]", "ARMED");
    text("[data-clock-label]", "0 ms");
    renderRows(metrics);
    renderTapeLinks(metrics);
    reconcileGenerated(metrics, lanes);
    document.documentElement.dataset.ptdTps = formatFixed(ptd.display_tps || ptd.tps, 1);
  }

  function renderRows(metrics) {
    const node = document.querySelector("[data-metrics-rows]");
    if (!node) return;
    node.innerHTML = metrics.methods
      .map((row) => {
        return `<tr data-lane-id="${escapeHtml(row.id)}">
          <th scope="row">${escapeHtml(row.label)}</th>
          <td class="num">${formatFixed(row.display_tps, 1)}</td>
          <td>${escapeHtml(formatAccept(metrics, row))}</td>
          <td>${escapeHtml(formatSpeedup(row))}</td>
          <td><a href="${escapeHtml(sourceHref(metrics, row))}">${escapeHtml(row.provenance_marker)}</a></td>
        </tr>`;
      })
      .join("");
  }

  function renderTapeLinks(metrics) {
    const node = document.querySelector("[data-tape-links]");
    if (!node) return;
    node.innerHTML = metrics.source.lane_files
      .map((href) => href.replace(/\.js$/, ".json"))
      .map((href) => `<a href="${escapeHtml(href)}">${escapeHtml(href.split("/").pop())}</a>`)
      .join(", ");
  }

  function fillPreviews() {
    const lanes = window.PTD_DEMO_LANES || [];
    document.querySelectorAll(".lane-card").forEach((card) => {
      const idx = Number(card.dataset.laneIndex);
      const lane = lanes[idx];
      const pre = card.querySelector("[data-stream]");
      if (!lane || !pre || pre.textContent.trim()) return;
      const text = (lane.events || [])
        .map((event) => (event.token_texts || []).join(""))
        .join("");
      pre.textContent = text;
      pre.classList.add("stream-preview");
      const totalTokens = Number(lane.totals && lane.totals.tokens) || 0;
      const wallMs = Number(lane.totals && lane.totals.wall_ms) || 0;
      const tokensEl = card.querySelector("[data-tokens]");
      const elapsedEl = card.querySelector("[data-elapsed]");
      const tpsEl = card.querySelector("[data-tps]");
      const progressEl = card.querySelector("[data-progress]");
      if (tokensEl) tokensEl.textContent = `${totalTokens}/${totalTokens}`;
      if (elapsedEl) elapsedEl.textContent = `${Math.round(wallMs).toLocaleString()} ms`;
      if (tpsEl && wallMs > 0) tpsEl.textContent = (totalTokens / wallMs * 1000).toFixed(1);
      if (progressEl) progressEl.style.width = "100%";
    });
  }

  function clearPreviews() {
    document.querySelectorAll(".stream-preview").forEach((pre) => {
      pre.classList.remove("stream-preview");
      pre.textContent = "";
    });
  }

  function setupRun(metrics) {
    const runButton = document.getElementById("siteRunButton");
    const playToggle = document.getElementById("playToggle");
    const resetButton = document.getElementById("resetButton");
    const scrubRange = document.getElementById("scrubRange");
    const clockLabel = document.querySelector("[data-clock-label]");
    const stateLabel = document.querySelector("[data-run-state]");
    const plate = document.querySelector("[data-result-plate]");
    const hud = document.querySelector("[data-run-hud]");
    let poll = 0;
    let started = false;

    if (!runButton || !playToggle || !resetButton || !scrubRange) return;

    runButton.addEventListener("click", () => {
      clearPreviews();
      started = true;
      if (Number(scrubRange.value) >= Number(scrubRange.max) - 1) {
        resetButton.click();
      }
      if (playToggle.textContent.trim().toLowerCase() !== "pause") {
        playToggle.click();
      }
      setRunState("running");
      window.clearInterval(poll);
      poll = window.setInterval(checkComplete, 100);
      runButton.textContent = "Running";
    });

    playToggle.addEventListener("click", () => {
      if (!started) return;
      window.setTimeout(() => {
        const playing = playToggle.textContent.trim().toLowerCase() === "pause";
        if (playing) setRunState("running");
        else if (document.body.dataset.runState !== "settled") setRunState("armed");
      }, 0);
    });

    function checkComplete() {
      const value = Number(scrubRange.value);
      const max = Number(scrubRange.max);
      if (clockLabel && Number.isFinite(value)) clockLabel.textContent = `${Math.round(value)} ms`;
      if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0 || value < max - 1) return;
      window.clearInterval(poll);
      const result = `JetFlow ${formatFixed(metrics.headline.tps, 1)} tok/s · ${formatFixed(metrics.headline.speedup_vs_ar, 2)}× vs AR baseline.`;
      setRunState("settled");
      if (plate) {
        plate.textContent = result;
        plate.hidden = false;
      }
      if (hud) {
        hud.textContent = result;
        hud.hidden = false;
      }
      runButton.textContent = "Run again";
      exposeState("settled", result);
    }

    function setRunState(state) {
      document.body.dataset.runState = state;
      if (stateLabel) stateLabel.textContent = state.toUpperCase();
      if (clockLabel && state === "armed") clockLabel.textContent = `${Math.round(Number(scrubRange.value) || 0)} ms`;
      if (clockLabel && state === "settled") clockLabel.textContent = `${Math.round(Number(scrubRange.max) || 0)} ms`;
      exposeState(state, window.PTD_C3_FIGURE_STATE && window.PTD_C3_FIGURE_STATE.hud);
    }
  }

  function setupTreeBreakout(metrics, lanes) {
    const mount = document.getElementById("treeBreakoutPanel");
    const ptdLane = lanes.find((lane) => lane.__siteId === "ptd");
    if (!mount || !ptdLane || !window.PTDTreePanel || typeof window.PTDTreePanel.createTreePanel !== "function") return;
    const panel = window.PTDTreePanel.createTreePanel({ className: "breakout-return-stroke" });
    panel.init(mount, ptdLane);
    const firstTree = ptdLane.events.find((event) => event.tree);
    const targetTime = firstTree ? Number(firstTree.t_ms) + Number(firstTree.dur_ms) * 0.55 : Number(metrics.trace.max_wall_ms) * 0.15;
    panel.onSeek(targetTime, { playing: false, speed: 0.25, scrubbing: false });
    window.addEventListener("resize", () => panel.resize());
  }

  function reconcileGenerated(metrics, lanes) {
    const live = buildMetricsFromLanes(lanes);
    window.PTD_C3_FIGURE_METRICS = metrics;
    window.PTD_C3_FIGURE_LIVE_METRICS = live;
    window.PTD_C3_FIGURE_METRICS_MATCH = Boolean(
      live &&
        String(live.headline.tps) === String(metrics.headline.tps) &&
        String(live.headline.speedup_vs_ar) === String(metrics.headline.speedup_vs_ar) &&
        String(live.headline.speedup_vs_vllm) === String(metrics.headline.speedup_vs_vllm)
    );
  }

  function buildMetricsFromLanes(lanes) {
    const ar = lanes.find((lane) => lane.__siteId === "ar_hf");
    const ptd = lanes.find((lane) => lane.__siteId === "ptd");
    const vllm = lanes.find((lane) => lane.__siteId === "vllm_ar");
    if (!ar || !ptd || !vllm) return null;
    const baselineTps = Number(ar.totals.tps);
    const vllmTps = Number(vllm.totals.tps);
    const headlineTps = Number(ptd.totals.tps);
    const maxWallMs = Math.max(...lanes.map((lane) => Number(lane.totals.wall_ms)));
    const maxTps = Math.max(...lanes.map((lane) => Number(lane.totals.tps)));
    const config = ptd.lane.run_config || {};
    return {
      schema: "ptd-c3-figure-metrics/browser",
      source: { lane_files: lanes.map((lane) => `../../player/data/synthetic/lane_${lane.__siteId}.js`) },
      prompt: {
        id: ptd.prompt.id,
        model: ptd.lane.model,
        device: ptd.lane.device,
        dataset: ptd.lane.dataset,
        recorded: ptd.lane.recorded,
        config: summarizeConfig(config),
      },
      headline: {
        method: "PTD",
        tps: round(headlineTps, 3),
        display_tps: round(headlineTps, 1),
        speedup_vs_ar: round(headlineTps / baselineTps, 2),
        speedup_vs_vllm: round(headlineTps / vllmTps, 2),
      },
      tree: {
        width: Number(config.tree_width),
        depth: Number(config.num_speculative_tokens),
        budget: Number(config.max_tree_budget),
      },
      trace: {
        max_wall_ms: round(maxWallMs, 6),
        max_tps: round(maxTps, 3),
        all_timing_sources_synthetic: lanes.every((lane) => lane.lane.timing_source === "synthetic"),
      },
      acceptance: {
        ptd_mean_from_tape: round(Number(ptd.totals.accept_len_mean), 3),
      },
      methods: lanes.map((lane, index) => {
        const tps = Number(lane.totals.tps);
        return {
          id: lane.__siteId,
          order: index + 1,
          channel: lane.__siteChannel,
          label: lane.__siteLabel,
          method: lane.lane.method,
          engine: lane.lane.engine,
          model: lane.lane.model,
          device: lane.lane.device,
          dataset: lane.lane.dataset,
          recorded: lane.lane.recorded,
          timing_source: lane.lane.timing_source,
          prompt_id: lane.prompt.id,
          tokens: Number(lane.totals.tokens),
          wall_ms: round(Number(lane.totals.wall_ms), 6),
          tps: round(tps, 3),
          display_tps: round(tps, 1),
          speedup_vs_ar: round(tps / baselineTps, 2),
          speedup_vs_vllm: round(tps / vllmTps, 2),
          accept_len_mean: lane.totals.accept_len_mean == null ? null : round(Number(lane.totals.accept_len_mean), 3),
          provenance_marker: `M${index + 1}`,
          provenance: `lane_${lane.__siteId}.js | ${lane.lane.engine} | ${lane.lane.device} | ${lane.lane.recorded} | ${lane.prompt.id}`,
        };
      }),
    };
  }

  function formatAccept(metrics, row) {
    if (row.id === "ptd" && row.accept_len_mean != null) {
      return `${formatFixed(row.accept_len_mean, 2)} excl bonus`;
    }
    if (row.id === "dflash") return "not exposed in tape";
    if (row.id === "ar_hf" || row.id === "vllm_ar") return "n/a (autoregressive)";
    return row.accept_len_mean == null ? "--" : formatFixed(row.accept_len_mean, 2);
  }

  function formatSpeedup(row) {
    if (row.id === "ar_hf") return "1.00x";
    if (row.id === "ptd") return `${formatFixed(row.speedup_vs_ar, 2)}x vs AR-HF; ${formatFixed(row.speedup_vs_vllm, 2)}x vs vLLM AR`;
    return `${formatFixed(row.speedup_vs_ar, 2)}x vs AR-HF`;
  }

  function sourceHref(metrics, row) {
    const href = (metrics.source.lane_files || []).find((item) => item.includes(sourceFileKey(row.id)));
    return href ? href.replace(/\.js$/, ".json") : "#demo-tapes";
  }

  function sourceFileKey(id) {
    if (id === "dflash") return "lane_dflash";
    return `lane_${id}`;
  }

  function summarizeConfig(config) {
    if (!config) return "greedy single-stream replay";
    const parts = [];
    if (config.tree_width) parts.push(`width ${config.tree_width}`);
    if (config.num_speculative_tokens) parts.push(`depth ${config.num_speculative_tokens}`);
    if (config.max_tree_budget) parts.push(`budget ${config.max_tree_budget}`);
    if (config.tree_construction) parts.push(String(config.tree_construction).replace(/_/g, " "));
    return parts.join(" / ") || "greedy single-stream replay";
  }

  function findMethod(metrics, id) {
    return metrics.methods.find((row) => row.id === id) || {};
  }

  function methodKey(method) {
    const key = String(method || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (key === "ar") return "ar";
    if (key === "vllm") return "vllm";
    if (key === "vllmar") return "vllm";
    return key;
  }

  function exposeState(runState, hud) {
    window.PTD_C3_FIGURE_STATE = {
      runState,
      hud: hud || "",
      generatedMetrics: Boolean(window.PTD_C3_FIGURE_GENERATED_METRICS),
    };
  }

  function text(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = value == null ? "--" : String(value);
  }

  function round(value, places) {
    const factor = 10 ** places;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function formatFixed(value, places) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toFixed(places) : "--";
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
