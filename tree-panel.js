(function () {
  "use strict";

  const WIDTH = 1800;
  const HEIGHT = 260;
  const BG = "#1a1a1a";
  const COLD_RAMP = ["#3a4150", "#4a5367", "#59657d", "#6b7894"];
  const SPINE = "#7ab874";
  const ACCENT = "#d97757";
  const TEXT = "#e8e6e3";
  const FIELD_TOP = 10;
  const FIELD_HEIGHT = 226;
  const CENTER_Y = 123;
  const GUTTER_TOP = 242;
  const GUTTER_HEIGHT = 16;
  const GUTTER_LEFT = 70;
  const GUTTER_RIGHT = 1770;
  const DEPTH_STEP = 96;
  const ROOT_X = 70;
  const BONUS_X = 1702;
  const MAX_DEPTH = 16;
  const PURGE_EVERY = 240;
  const DOM_SPEED_LIMIT = 0.5;
  const DISCLOSURE_FLOOR_MS = 40;
  const CHIP_DWELL_MS = 80;
  const NARRATIVE_DWELL_MS = 150;
  const LABEL_DWELL_MS = 400;
  const CHIP_LIMIT = 17;
  const HIT_CELL = 20;
  const FRAME_MS = 1000 / 60;

  const DEFAULT_OPTIONS = {
    halfLifeRounds: 4,
    stampGain: 0.82,
    coldContrast: 1,
    maxDpr: 2,
    showDebug: false,
    className: "",
  };

  let styleInstalled = false;

  window.PTDTreePanel = {
    constants: {
      WIDTH,
      HEIGHT,
      BG,
      COLD_RAMP: COLD_RAMP.slice(),
      SPINE,
      ACCENT,
      FIELD_TOP,
      FIELD_HEIGHT,
      CENTER_Y,
      GUTTER_TOP,
      GUTTER_HEIGHT,
    },
    createTreePanel,
    createSyntheticLane,
    analyzeLane,
    auditColdRamp,
  };

  function createTreePanel(options) {
    return new ReturnStrokePanel(options || {});
  }

  function ReturnStrokePanel(options) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.el = null;
    this.lane = null;
    this.prepared = null;
    this.layers = {};
    this.ctx = {};
    this.frame = null;
    this.hudEl = null;
    this.debugEl = null;
    this.purgeEl = null;
    this.chipLayer = null;
    this.tooltipEl = null;
    this.chips = [];
    this.particles = [];
    this.spriteAtlas = null;
    this.dpr = 1;
    this.lastTimeMs = null;
    this.lastPerf = 0;
    this.stampedThrough = -1;
    this.activeIdx = -1;
    this.activeEvent = null;
    this.frameCount = 0;
    this.stampCount = 0;
    this.lastPurgeAt = -1;
    this.particleCursor = 0;
    this.playback = {
      speed: 1,
      playing: true,
      scrubbing: false,
    };
    this.domVisible = false;
    this.lastChipKey = "";
    this.hover = {
      roundIdx: -1,
      nodeIdx: -1,
      mode: "idle",
      x: 0,
      y: 0,
    };
    this.replayIdx = -1;
    this.replayUntil = 0;
    this.scrubHandler = null;
    this.isDraggingGutter = false;
    this.settleUntil = 0;
    this.lastCompletedIdx = -1;
    this.phaseSeen = Object.create(null);
    this.debugCounters = createDebugCounters();
    this.metrics = {
      fps: 0,
      stampedRounds: 0,
      activeRound: 0,
      gutterBars: 0,
      lastFrameMs: 0,
      lastPurgeFrame: -1,
      completedRound: 0,
      slowmoPhase: "idle",
      maxCommitDeltaMs: 0,
      layout: [],
    };
  }

  ReturnStrokePanel.prototype.init = function init(el, lane) {
    installStyle();
    this.el = el;
    this.lane = normalizeLane(lane);
    this.prepared = prepareLane(this.lane, this.options);
    this.metrics.layout = this.prepared.rounds.map((round) => ({ ...round.metrics }));
    this.el.innerHTML = "";
    this.el.classList.add("return-stroke-host");
    if (this.options.className) this.el.classList.add(this.options.className);

    this.frame = document.createElement("div");
    this.frame.className = "return-stroke-frame";
    this.frame.setAttribute("role", "img");
    this.frame.setAttribute("aria-label", "Parallel tree decoding round topology replay");

    this.layers.base = createCanvas("L0 base");
    this.layers.ember = createCanvas("L1 ember");
    this.layers.live = createCanvas("L2 live");
    this.layers.fx = createCanvas("L3 fx");
    this.chipLayer = document.createElement("div");
    this.chipLayer.className = "return-stroke-chips";
    this.chipLayer.style.display = "none";

    this.frame.append(this.layers.base, this.layers.ember, this.layers.live, this.layers.fx, this.chipLayer);
    this.el.appendChild(this.frame);

    const info = document.createElement("div");
    info.className = "return-stroke-info";
    info.innerHTML = this.options.showDebug
      ? [
          '<div class="return-stroke-hud" data-return-stroke-hud>round 0/' + this.lane.events.length + " - waiting</div>",
          '<div class="return-stroke-flags">',
          '<span data-return-stroke-purge>purge idle</span>',
          '<span data-return-stroke-debug></span>',
          "</div>",
        ].join("")
      : '<div class="return-stroke-hud" data-return-stroke-hud>round 0/' + this.lane.events.length + " - waiting</div>";
    this.el.appendChild(info);
    this.hudEl = info.querySelector("[data-return-stroke-hud]");
    this.debugEl = info.querySelector("[data-return-stroke-debug]");
    this.purgeEl = info.querySelector("[data-return-stroke-purge]");

    for (let i = 0; i < 24; i += 1) {
      const chip = document.createElement("div");
      chip.className = "return-stroke-chip";
      chip.style.display = "none";
      this.chipLayer.appendChild(chip);
      this.chips.push(chip);
    }
    this.tooltipEl = document.createElement("div");
    this.tooltipEl.className = "return-stroke-tooltip";
    this.tooltipEl.style.display = "none";
    this.chipLayer.appendChild(this.tooltipEl);

    for (let i = 0; i < 150; i += 1) {
      this.particles.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        age: 0,
        life: 0,
        size: 1,
        color: SPINE,
      });
    }

    this.ctx.base = this.layers.base.getContext("2d", { alpha: false });
    this.ctx.ember = this.layers.ember.getContext("2d");
    this.ctx.live = this.layers.live.getContext("2d");
    this.ctx.fx = this.layers.fx.getContext("2d");
    this.spriteAtlas = createSpriteAtlas();
    window.PTD_RETURN_STROKE_PANEL = this;
    window.PTD_RETURN_STROKE_METRICS = () => this.getMetrics();
    window.PTD_RETURN_STROKE_DEBUG = () => this.getDebugCounters();
    window.PTD_RETURN_STROKE_RESET_DEBUG = () => this.resetDebugCounters();
    this.attachPointerHandlers();
    this.resize();
    this.drawBase(-1);
    this.drawLive(-1);
    this.renderFx(0);
  };

  ReturnStrokePanel.prototype.attachPointerHandlers = function attachPointerHandlers() {
    this.frame.addEventListener("pointermove", (event) => this.onPointerMove(event));
    this.frame.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    window.addEventListener("pointerup", () => {
      this.isDraggingGutter = false;
      this.playback.scrubbing = false;
    });
    this.frame.addEventListener("pointerleave", () => {
      if (this.isDraggingGutter) return;
      this.hover.roundIdx = -1;
      this.hover.nodeIdx = -1;
      this.hover.mode = "idle";
      this.hideTooltip();
    });
  };

  ReturnStrokePanel.prototype.setOptions = function setOptions(partial) {
    this.options = { ...this.options, ...partial };
    if (!this.prepared) return;
    this.prepared = prepareLane(this.lane, this.options);
    this.metrics.layout = this.prepared.rounds.map((round) => ({ ...round.metrics }));
    this.rebuildTo(this.lastCompletedIdx);
    this.drawLive(this.activeIdx);
  };

  ReturnStrokePanel.prototype.setPlaybackState = function setPlaybackState(partial) {
    if (!partial) return;
    if (Number.isFinite(Number(partial.speed))) {
      this.playback.speed = Math.max(0.05, Number(partial.speed));
    }
    if (typeof partial.playing === "boolean") this.playback.playing = partial.playing;
    if (typeof partial.scrubbing === "boolean") this.playback.scrubbing = partial.scrubbing;
  };

  ReturnStrokePanel.prototype.setScrubHandler = function setScrubHandler(handler) {
    this.scrubHandler = typeof handler === "function" ? handler : null;
  };

  ReturnStrokePanel.prototype.highlightRound = function highlightRound(roundIdx, hot) {
    const idx = Number(roundIdx);
    this.replayIdx = hot && Number.isInteger(idx) && idx >= 0 && this.prepared && idx < this.prepared.rounds.length ? idx : -1;
    this.replayUntil = this.replayIdx >= 0 ? performance.now() + 600 : 0;
  };

  ReturnStrokePanel.prototype.onRound = function onRound(event, idx) {
    this.activeEvent = event;
    this.activeIdx = idx;
  };

  ReturnStrokePanel.prototype.onSeek = function onSeek(t, meta) {
    if (!this.prepared) return;
    this.setPlaybackState(meta);
    const started = performance.now();
    const now = started;
    const realDelta = this.lastPerf ? Math.min(80, Math.max(0, now - this.lastPerf)) : 16.7;
    this.lastPerf = now;

    const timeMs = clamp(Number(t) || 0, 0, this.prepared.totalMs);
    const activeIdx = this.indexForTime(timeMs);
    const completedIdx = this.completedIndexForTime(timeMs);
    this.activeIdx = activeIdx;
    this.activeEvent = activeIdx >= 0 ? this.lane.events[activeIdx] : null;
    if (timeMs < this.prepared.totalMs - 0.001) this.settleUntil = 0;

    if (this.lastTimeMs === null || timeMs < this.lastTimeMs - 0.001 || completedIdx < this.stampedThrough) {
      this.rebuildTo(completedIdx);
    } else {
      const deltaRounds = Math.abs(timeMs - this.lastTimeMs) / this.prepared.meanRoundMs;
      if (!this.isSettlePaused(now, timeMs)) this.fadeEmber(deltaRounds);
      for (let i = this.stampedThrough + 1; i <= completedIdx; i += 1) {
        this.stampRound(i, 1, true);
        this.recordCommitArrival(i, timeMs);
      }
    }

    this.drawLive(activeIdx, timeMs);
    this.renderFx(realDelta);
    this.updateOverlay(timeMs, activeIdx);
    this.updateHud(activeIdx, completedIdx);
    this.lastTimeMs = timeMs;
    this.lastCompletedIdx = completedIdx;
    this.frameCount += 1;

    if (this.frameCount > 0 && this.frameCount % PURGE_EVERY === 0) {
      this.purgeEmber(completedIdx);
    }

    this.metrics.activeRound = activeIdx + 1;
    this.metrics.completedRound = completedIdx + 1;
    this.metrics.stampedRounds = this.stampCount;
    this.metrics.gutterBars = Math.max(0, this.stampedThrough + 1);
    this.metrics.lastFrameMs = performance.now() - started;
    this.metrics.maxCommitDeltaMs = this.debugCounters.maxCommitDeltaMs;
    this.updateFps(realDelta);
    if (this.debugEl) {
      this.debugEl.textContent = this.options.showDebug
        ? "stamp " + this.stampCount + " - frame " + this.metrics.lastFrameMs.toFixed(2) + " ms"
        : "";
    }
  };

  ReturnStrokePanel.prototype.indexForTime = function indexForTime(t) {
    const events = this.lane.events;
    let lo = 0;
    let hi = events.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (events[mid].end_ms > t + 0.001) {
        found = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    return found;
  };

  ReturnStrokePanel.prototype.completedIndexForTime = function completedIndexForTime(t) {
    const events = this.lane.events;
    let lo = 0;
    let hi = events.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (events[mid].end_ms <= t + 0.001) {
        found = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return found;
  };

  ReturnStrokePanel.prototype.resize = function resize() {
    const nextDpr = Math.min(this.options.maxDpr, Math.max(1, window.devicePixelRatio || 1));
    if (nextDpr === this.dpr && this.layers.base.width === WIDTH * nextDpr) return;
    this.dpr = nextDpr;
    Object.keys(this.layers).forEach((key) => {
      const canvas = this.layers[key];
      canvas.width = Math.round(WIDTH * this.dpr);
      canvas.height = Math.round(HEIGHT * this.dpr);
      const ctx = canvas.getContext("2d", key === "base" ? { alpha: false } : undefined);
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    });
    this.rebuildTo(this.lastCompletedIdx);
  };

  ReturnStrokePanel.prototype.drawBase = function drawBase(gutterThrough) {
    const ctx = this.ctx.base;
    if (!ctx || !this.prepared) return;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const vignette = ctx.createLinearGradient(0, 0, WIDTH, 0);
    vignette.addColorStop(0, "rgba(0,0,0,0.32)");
    vignette.addColorStop(0.45, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.28)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "rgba(232,230,227,0.08)";
    ctx.lineWidth = 1;
    for (let d = 0; d <= MAX_DEPTH; d += 4) {
      const x = depthX(d);
      ctx.beginPath();
      ctx.moveTo(x, FIELD_TOP);
      ctx.lineTo(x, FIELD_TOP + FIELD_HEIGHT);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(232,230,227,0.08)";
    ctx.fillRect(GUTTER_LEFT, GUTTER_TOP, GUTTER_RIGHT - GUTTER_LEFT, 1);
    ctx.fillRect(GUTTER_LEFT, GUTTER_TOP + GUTTER_HEIGHT - 1, GUTTER_RIGHT - GUTTER_LEFT, 1);
    ctx.fillStyle = "rgba(122,184,116,0.08)";
    ctx.fillRect(GUTTER_LEFT, CENTER_Y - 0.5, GUTTER_RIGHT - GUTTER_LEFT, 1);

    const limit = Math.min(gutterThrough, this.prepared.rounds.length - 1);
    for (let i = 0; i <= limit; i += 1) {
      drawHeartbeat(ctx, this.prepared.rounds[i], 1);
    }
    ctx.restore();
  };

  ReturnStrokePanel.prototype.fadeEmber = function fadeEmber(deltaRounds) {
    if (deltaRounds <= 0) return;
    const alpha = clamp(1 - Math.pow(2, -deltaRounds / this.options.halfLifeRounds), 0, 0.45);
    const ctx = this.ctx.ember;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0," + alpha.toFixed(4) + ")";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.rebuildTo = function rebuildTo(activeIdx) {
    if (!this.prepared) return;
    this.ctx.ember.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawBase(activeIdx);
    const history = Math.ceil(this.options.halfLifeRounds * 2);
    const start = Math.max(0, activeIdx - history + 1);
    for (let i = start; i <= activeIdx; i += 1) {
      const age = activeIdx - i;
      const alpha = Math.pow(2, -age / this.options.halfLifeRounds);
      this.stampRound(i, alpha, false);
    }
    this.stampedThrough = activeIdx;
  };

  ReturnStrokePanel.prototype.purgeEmber = function purgeEmber(activeIdx) {
    this.ctx.ember.clearRect(0, 0, WIDTH, HEIGHT);
    const history = Math.ceil(this.options.halfLifeRounds * 2);
    const start = Math.max(0, activeIdx - history + 1);
    for (let i = start; i <= activeIdx; i += 1) {
      const age = activeIdx - i;
      const alpha = Math.pow(2, -age / this.options.halfLifeRounds);
      this.drawRound(this.ctx.ember, this.prepared.rounds[i], alpha * this.options.stampGain, false);
    }
    this.lastPurgeAt = this.frameCount;
    this.metrics.lastPurgeFrame = this.frameCount;
    if (this.purgeEl) {
      this.purgeEl.textContent = "purge frame " + this.frameCount;
      this.purgeEl.classList.add("is-hot");
      window.setTimeout(() => {
        if (this.purgeEl) this.purgeEl.classList.remove("is-hot");
      }, 220);
    }
  };

  ReturnStrokePanel.prototype.stampRound = function stampRound(idx, alpha, emitFx) {
    if (idx < 0 || idx >= this.prepared.rounds.length) return;
    const round = this.prepared.rounds[idx];
    this.drawRound(this.ctx.ember, round, alpha * this.options.stampGain, false);
    if (idx > this.stampedThrough) {
      drawHeartbeat(this.ctx.base, round, 1);
      this.stampedThrough = idx;
    }
    if (emitFx) this.emitBurst(round);
    this.stampCount += 1;
  };

  ReturnStrokePanel.prototype.drawLive = function drawLive(idx, timeMs) {
    const ctx = this.ctx.live;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (idx < 0 || idx >= this.prepared.rounds.length) return;
    const replayRound =
      this.replayIdx >= 0 && performance.now() <= this.replayUntil
        ? this.prepared.rounds[this.replayIdx]
        : null;
    const round = replayRound || this.prepared.rounds[idx];
    if (round.isPrefill) {
      this.drawPrefill(ctx, round, timeMs);
      return;
    }
    const lod = this.getLod(round.event);
    if (lod.narrative) {
      this.drawNarrativeRound(ctx, round, timeMs, lod);
    } else {
      this.drawRound(ctx, round, 1, true);
      this.metrics.slowmoPhase = "live";
    }
    if (this.hover.roundIdx === round.idx && this.hover.nodeIdx >= 0) {
      this.drawHoverAncestry(ctx, round, this.hover.nodeIdx);
    }
    if (replayRound) {
      ctx.save();
      ctx.strokeStyle = withAlpha(ACCENT, 0.7);
      ctx.lineWidth = 2;
      ctx.strokeRect(replayRound.gutterX, GUTTER_TOP, Math.max(2, replayRound.gutterW), GUTTER_HEIGHT);
      ctx.restore();
    }
  };

  ReturnStrokePanel.prototype.drawRound = function drawRound(ctx, round, alpha, live) {
    if (!round) return;
    const contrastRamp = getContrastRamp(this.options.coldContrast);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = "source-over";
    for (let tier = 0; tier < 4; tier += 1) {
      const edges = round.edgesByTier[tier];
      if (edges.length) {
        ctx.beginPath();
        ctx.strokeStyle = withAlpha(contrastRamp[tier], live ? 0.46 : 0.22);
        ctx.lineWidth = live ? 1.15 : 0.82;
        for (let i = 0; i < edges.length; i += 1) {
          const edge = edges[i];
          ctx.moveTo(edge.x1, edge.y1);
          ctx.lineTo(edge.x2, edge.y2);
        }
        ctx.stroke();
      }
    }

    for (let tier = 0; tier < 4; tier += 1) {
      const nodes = round.nodesByTier[tier];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        drawSprite(ctx, this.spriteAtlas, tier, node.sizeIndex, node.x, node.y, live ? 1.15 : 0.78);
      }
    }

    if (round.rejected.length) {
      ctx.fillStyle = withAlpha(ACCENT, live ? 0.5 : 0.28);
      for (let i = 0; i < round.rejected.length; i += 1) {
        const node = round.rejected[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, live ? 3.1 : 2.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalCompositeOperation = "lighter";
    drawSpine(ctx, round, live ? 0.85 : 0.42, live ? 5 : 3.5);
    drawSpine(ctx, round, live ? 1 : 0.65, live ? 1.6 : 1.1);
    if (round.hasBonus) drawBonus(ctx, live ? 0.8 : 0.36);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawPrefill = function drawPrefill(ctx, round, timeMs) {
    const local = round && round.event ? localProgress(round.event, timeMs) : 0;
    this.metrics.slowmoPhase = "prefill";
    ctx.save();
    ctx.fillStyle = withAlpha(TEXT, 0.12);
    ctx.fillRect(GUTTER_LEFT, CENTER_Y - 1, GUTTER_RIGHT - GUTTER_LEFT, 2);
    ctx.fillStyle = withAlpha(TEXT, 0.72);
    ctx.font = '13px "SF Mono", Menlo, Consolas, monospace';
    ctx.fillText("prefill - prompt/context hydrate", GUTTER_LEFT, CENTER_Y - 14);
    ctx.fillStyle = withAlpha(SPINE, 0.7);
    ctx.fillRect(GUTTER_LEFT, CENTER_Y + 12, (GUTTER_RIGHT - GUTTER_LEFT) * local, 3);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawNarrativeRound = function drawNarrativeRound(ctx, round, timeMs, lod) {
    const local = localProgress(round.event, timeMs);
    const phase = local < 0.4 ? "draft" : local < 0.7 ? "verify" : "commit";
    const phaseProgress =
      phase === "draft" ? local / 0.4 : phase === "verify" ? (local - 0.4) / 0.3 : (local - 0.7) / 0.3;
    this.metrics.slowmoPhase = phase;
    this.recordPhase(round.idx, phase);

    if (phase === "draft") {
      this.drawDepthWave(ctx, round, round.layouts.draft, phaseProgress, false);
      this.drawDraftLeader(ctx, round, phaseProgress);
      return;
    }

    if (phase === "verify") {
      const eased = easeOutCubic(phaseProgress);
      this.drawBlendedRound(ctx, round, eased, phaseProgress);
      this.drawScanline(ctx, round, phaseProgress);
      return;
    }

    this.drawBlendedRound(ctx, round, 1, 1);
    this.drawCommitLabels(ctx, round, lod.labels ? 2 : 1);
    if (round.hasBonus) drawBonus(ctx, 1);
  };

  ReturnStrokePanel.prototype.drawDepthWave = function drawDepthWave(ctx, round, layout, progress, committed) {
    const contrastRamp = getContrastRamp(this.options.coldContrast);
    const maxDepth = Math.max(1, round.metrics.maxDepth || MAX_DEPTH);
    const waveDepth = progress * (maxDepth + 1);
    ctx.save();
    for (let tier = 0; tier < 4; tier += 1) {
      ctx.beginPath();
      ctx.strokeStyle = withAlpha(contrastRamp[tier], committed ? 0.42 : 0.34);
      ctx.lineWidth = 1.05;
      for (let i = 1; i < round.parents.length; i += 1) {
        if (round.tiers[i] !== tier) continue;
        const depth = round.depths[i] || 0;
        if (depth > waveDepth) continue;
        const parent = round.parents[i];
        const edgeP = clamp(waveDepth - depth + 1, 0, 1);
        const x1 = layout.x[parent];
        const y1 = layout.y[parent];
        const x2 = lerp(x1, layout.x[i], edgeP);
        const y2 = lerp(y1, layout.y[i], edgeP);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
    for (let tier = 0; tier < 4; tier += 1) {
      for (let i = 0; i < round.parents.length; i += 1) {
        if (round.tiers[i] !== tier || (round.depths[i] || 0) > waveDepth) continue;
        drawSprite(ctx, this.spriteAtlas, tier, radiusToSizeIndex(round.radii[i]), layout.x[i], layout.y[i], 0.88);
      }
    }
    if (committed) drawSpineLayout(ctx, round.layouts.verdict, 0.85, 1.8);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawDraftLeader = function drawDraftLeader(ctx, round, progress) {
    if (!round.draftPath.length) return;
    const layout = round.layouts.draft;
    const count = Math.max(1, Math.min(round.draftPath.length, Math.ceil(progress * round.draftPath.length)));
    ctx.save();
    ctx.strokeStyle = withAlpha(TEXT, 0.46);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const first = round.draftPath[0];
    ctx.moveTo(layout.x[first], layout.y[first]);
    for (let i = 1; i < count; i += 1) {
      const node = round.draftPath[i];
      ctx.lineTo(layout.x[node], layout.y[node]);
    }
    ctx.stroke();
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawBlendedRound = function drawBlendedRound(ctx, round, mix, scanProgress) {
    const contrastRamp = getContrastRamp(this.options.coldContrast);
    const draft = round.layouts.draft;
    const verdict = round.layouts.verdict;
    const scanDepth = (round.metrics.maxDepth || MAX_DEPTH) * scanProgress;
    ctx.save();
    for (let tier = 0; tier < 4; tier += 1) {
      ctx.beginPath();
      ctx.lineWidth = 1.08;
      ctx.strokeStyle = withAlpha(contrastRamp[tier], 0.34);
      for (let i = 1; i < round.parents.length; i += 1) {
        if (round.tiers[i] !== tier) continue;
        const parent = round.parents[i];
        ctx.moveTo(blend(draft.x[parent], verdict.x[parent], mix), blend(draft.y[parent], verdict.y[parent], mix));
        ctx.lineTo(blend(draft.x[i], verdict.x[i], mix), blend(draft.y[i], verdict.y[i], mix));
      }
      ctx.stroke();
    }
    for (let tier = 0; tier < 4; tier += 1) {
      for (let i = 0; i < round.parents.length; i += 1) {
        if (round.tiers[i] !== tier) continue;
        const accepted = Boolean(round.acceptedSet[i]);
        const behindScan = (round.depths[i] || 0) <= scanDepth + 0.001;
        const alpha = behindScan && !accepted ? 0.42 : 0.95;
        drawSprite(
          ctx,
          this.spriteAtlas,
          tier,
          radiusToSizeIndex(round.radii[i]),
          blend(draft.x[i], verdict.x[i], mix),
          blend(draft.y[i], verdict.y[i], mix),
          alpha
        );
      }
    }
    ctx.globalCompositeOperation = "lighter";
    this.drawIgnitedSpine(ctx, round, scanDepth);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawIgnitedSpine = function drawIgnitedSpine(ctx, round, scanDepth) {
    const path = round.acceptedPath;
    if (path.length < 2) return;
    const layout = round.layouts.verdict;
    ctx.strokeStyle = withAlpha(SPINE, 0.92);
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(layout.x[path[0]], layout.y[path[0]]);
    for (let i = 1; i < path.length; i += 1) {
      const node = path[i];
      if ((round.depths[node] || 0) > scanDepth + 0.001) break;
      ctx.lineTo(layout.x[node], layout.y[node]);
    }
    ctx.stroke();
  };

  ReturnStrokePanel.prototype.drawScanline = function drawScanline(ctx, round, progress) {
    const maxDepth = Math.max(1, round.metrics.maxDepth || MAX_DEPTH);
    const x = depthX(progress * maxDepth);
    ctx.save();
    ctx.strokeStyle = withAlpha(TEXT, 0.72);
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(x, FIELD_TOP);
    ctx.lineTo(x, FIELD_TOP + FIELD_HEIGHT);
    ctx.stroke();
    ctx.fillStyle = withAlpha(TEXT, 0.72);
    ctx.font = '11px "SF Mono", Menlo, Consolas, monospace';
    ctx.fillText("verify", x + 6, FIELD_TOP + 14);
    ctx.restore();
  };

  ReturnStrokePanel.prototype.drawCommitLabels = function drawCommitLabels(ctx, round, limit) {
    const labels = round.siblingLabels || [];
    ctx.save();
    ctx.font = '10px "SF Mono", Menlo, Consolas, monospace';
    for (let i = 0; i < labels.length; i += 1) {
      const label = labels[i];
      if (label.rank > limit) continue;
      const text = trimToken(label.token) || "reject";
      ctx.fillStyle = withAlpha(ACCENT, label.rank === 1 ? 0.72 : 0.5);
      ctx.fillText(text, label.x + 6, label.y - 4);
      if (limit > 1) {
        const bar = clamp((label.lp + 4) / 4, 0.08, 1);
        ctx.fillRect(label.x + 6, label.y + 3, 28 * bar, 2);
      }
    }
    ctx.restore();
  };

  ReturnStrokePanel.prototype.emitBurst = function emitBurst(round) {
    const path = round.spine;
    if (!path.length) return;
    const tail = path[path.length - 1];
    const count = clamp(Math.round(6 + round.k * 0.4), 6, 12);
    for (let i = 0; i < count; i += 1) {
      const particle = this.particles[this.particleCursor];
      this.particleCursor = (this.particleCursor + 1) % this.particles.length;
      const seed = hashInt(round.idx * 97 + i * 17);
      const targetY = CENTER_Y + ((seed % 21) - 10) * 0.22;
      const life = 260 + (seed % 120);
      particle.active = true;
      particle.x = tail.x;
      particle.y = tail.y;
      particle.vx = (BONUS_X - tail.x) / life;
      particle.vy = (targetY - tail.y) / life;
      particle.age = 0;
      particle.life = life;
      particle.size = 1 + (seed % 4) * 0.35;
      particle.color = i % 5 === 0 && round.hasBonus ? ACCENT : SPINE;
    }
  };

  ReturnStrokePanel.prototype.renderFx = function renderFx(dtMs) {
    const ctx = this.ctx.fx;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      if (!p.active) continue;
      p.age += dtMs;
      if (p.age >= p.life) {
        p.active = false;
        continue;
      }
      p.x += p.vx * dtMs;
      p.y += p.vy * dtMs;
      const a = 1 - p.age / p.life;
      ctx.fillStyle = withAlpha(p.color, a * 0.75);
      ctx.fillRect(p.x, p.y, p.size * 3.5, p.size);
    }
    ctx.restore();
  };

  ReturnStrokePanel.prototype.updateOverlay = function updateOverlay(timeMs, activeIdx) {
    if (!this.chips.length) return;
    const round = activeIdx >= 0 ? this.prepared.rounds[activeIdx] : null;
    const instruments =
      this.playback.speed < DOM_SPEED_LIMIT && (!this.playback.playing || this.playback.scrubbing || this.isDraggingGutter);
    const lod = round ? this.getLod(round.event) : { chips: false, narrative: false, labels: false };
    if (!round || round.isPrefill || (!lod.chips && !instruments)) {
      this.hideOverlay();
      return;
    }

    this.setLayerVisible(true);
    if (lod.chips) {
      this.renderChipFlight(round, timeMs, lod);
    } else {
      this.hideChipsOnly();
    }
    if (instruments && this.hover.roundIdx >= 0 && this.hover.nodeIdx >= 0) {
      this.showTooltip(this.hover);
    } else {
      this.hideTooltip();
    }
  };

  ReturnStrokePanel.prototype.renderChipFlight = function renderChipFlight(round, timeMs, lod) {
    const event = round.event;
    const local = localProgress(event, timeMs);
    const tokens = event.token_texts || [];
    const count = Math.min(CHIP_LIMIT, tokens.length);
    const phaseC = lod.narrative && local >= 0.7;
    const tailNode = round.acceptedPath[Math.max(0, Math.min(round.acceptedPath.length - 1, count))] || round.acceptedPath[0];
    const startX = tailNode == null ? GUTTER_LEFT : round.layouts.verdict.x[tailNode];
    const startY = tailNode == null ? CENTER_Y : round.layouts.verdict.y[tailNode];
    const targetX = BONUS_X - 18;
    const key = [round.idx, count, phaseC ? "fly" : "fade", Math.floor(local * 20)].join(":");
    if (key === this.lastChipKey) return;
    this.lastChipKey = key;
    for (let i = 0; i < this.chips.length; i += 1) {
      const chip = this.chips[i];
      if (i >= count) {
        this.setStyle(chip, "display", "none");
        continue;
      }
      const stagger = Math.min(0.18, (i * 30) / Math.max(CHIP_DWELL_MS, lod.dwellMs));
      const start = phaseC ? Math.max(0.7, 0.86 - stagger) : 0;
      const denom = Math.max(0.001, 1 - start);
      const p = phaseC ? easeOutCubic(clamp((local - start) / denom, 0, 1)) : clamp(local * 3, 0, 1);
      const x = phaseC ? lerp(startX, targetX, p) : startX + i * 12;
      const y = phaseC ? lerp(startY, CENTER_Y - 18 + i * 4, p) : startY - 18 - i * 2;
      const css = this.canvasToCss(x, y);
      this.setStyle(chip, "display", "block");
      this.setText(chip, tokens[i]);
      this.setStyle(chip, "transform", "translate(" + css.x.toFixed(1) + "px," + css.y.toFixed(1) + "px)");
      this.setStyle(chip, "opacity", String(phaseC ? clamp(0.18 + p, 0, 1) : p));
      this.setStyle(chip, "borderColor", round.hasBonus && i === count - 1 ? withAlpha(ACCENT, 0.72) : "rgba(122, 184, 116, 0.32)");
    }
  };

  ReturnStrokePanel.prototype.hideOverlay = function hideOverlay() {
    if (!this.domVisible) return;
    this.setLayerVisible(false);
    this.lastChipKey = "";
    this.hideTooltip();
  };

  ReturnStrokePanel.prototype.hideChipsOnly = function hideChipsOnly() {
    for (let i = 0; i < this.chips.length; i += 1) this.setStyle(this.chips[i], "display", "none");
    this.lastChipKey = "";
  };

  ReturnStrokePanel.prototype.setLayerVisible = function setLayerVisible(visible) {
    if (this.domVisible === visible) return;
    this.domVisible = visible;
    this.setStyle(this.chipLayer, "display", visible ? "block" : "none");
  };

  ReturnStrokePanel.prototype.setText = function setText(el, value) {
    const text = String(value == null ? "" : value);
    if (el.textContent === text) return;
    el.textContent = text;
    this.recordDomWrite();
  };

  ReturnStrokePanel.prototype.setStyle = function setStyle(el, prop, value) {
    const text = String(value);
    if (el.style[prop] === text) return;
    el.style[prop] = text;
    this.recordDomWrite();
  };

  ReturnStrokePanel.prototype.updateHud = function updateHud(activeIdx, completedIdx) {
    if (!this.hudEl) return;
    if (activeIdx < 0) {
      const total = this.lane.events.length;
      const nextText =
        completedIdx >= total - 1
          ? total +
            " rounds - " +
            (Number(this.lane.totals && this.lane.totals.tokens) || 0) +
            " tok - " +
            (Number(this.lane.totals && this.lane.totals.wall_ms) || this.prepared.totalMs).toFixed(0) +
            " ms - recorded replay"
          : "round 0/" + total + " - waiting";
      if (this.hudEl.textContent !== nextText) this.hudEl.textContent = nextText;
      return;
    }
    const event = this.lane.events[activeIdx];
    if (event.kind === "prefill" && !event.tree) {
      const prefill = "prefill - " + event.dur_ms.toFixed(1) + " ms - recorded replay";
      if (this.hudEl.textContent !== prefill) this.hudEl.textContent = prefill;
      return;
    }
    const k = acceptedCount(event);
    const nextText =
      "round " +
      (activeIdx + 1) +
      "/" +
      this.lane.events.length +
      " - committed " +
      Math.max(0, completedIdx + 1) +
      " - +" +
      k +
      " tok - " +
      event.dur_ms.toFixed(1) +
      " ms - " +
      this.metrics.slowmoPhase +
      " - " +
      this.getLod(event).dwellMs.toFixed(0) +
      " ms - recorded replay";
    if (this.hudEl.textContent !== nextText) this.hudEl.textContent = nextText;
  };

  ReturnStrokePanel.prototype.getLod = function getLod(event) {
    if (!event || this.playback.speed >= DOM_SPEED_LIMIT) {
      return { dwellMs: 0, chips: false, narrative: false, labels: false };
    }
    const dwellMs = Math.max(DISCLOSURE_FLOOR_MS, Number(event.dur_ms) || 0) / Math.max(0.05, this.playback.speed);
    return {
      dwellMs,
      chips: dwellMs >= CHIP_DWELL_MS,
      narrative: dwellMs >= NARRATIVE_DWELL_MS,
      labels: dwellMs >= LABEL_DWELL_MS,
    };
  };

  ReturnStrokePanel.prototype.onPointerDown = function onPointerDown(event) {
    const point = this.localPoint(event);
    if (point.y >= GUTTER_TOP - 6 && point.y <= GUTTER_TOP + GUTTER_HEIGHT + 6) {
      this.isDraggingGutter = true;
      this.playback.scrubbing = true;
      this.handleGutterScrub(point.x);
      event.preventDefault();
    }
  };

  ReturnStrokePanel.prototype.onPointerMove = function onPointerMove(event) {
    const point = this.localPoint(event);
    if (this.isDraggingGutter) {
      this.handleGutterScrub(point.x);
      return;
    }
    const activeRound =
      this.replayIdx >= 0 && this.prepared.rounds[this.replayIdx]
        ? this.prepared.rounds[this.replayIdx]
        : this.activeIdx >= 0
          ? this.prepared.rounds[this.activeIdx]
          : null;
    if (!activeRound || activeRound.isPrefill) return;
    const instruments = this.playback.speed < DOM_SPEED_LIMIT && (!this.playback.playing || this.playback.scrubbing);
    if (!instruments) return;
    const hit = findHit(activeRound.hitGrid, point.x, point.y);
    if (!hit) {
      this.hover.roundIdx = -1;
      this.hover.nodeIdx = -1;
      this.hover.mode = "idle";
      this.hideTooltip();
      return;
    }
    this.hover.roundIdx = activeRound.idx;
    this.hover.nodeIdx = hit.idx;
    this.hover.mode = hit.mode;
    this.hover.x = point.x;
    this.hover.y = point.y;
    this.showTooltip(this.hover);
    this.drawLive(activeRound.idx, this.lastTimeMs || activeRound.event.t_ms);
  };

  ReturnStrokePanel.prototype.localPoint = function localPoint(event) {
    const rect = this.frame.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / Math.max(1, rect.width)) * WIDTH,
      y: ((event.clientY - rect.top) / Math.max(1, rect.height)) * HEIGHT,
    };
  };

  ReturnStrokePanel.prototype.handleGutterScrub = function handleGutterScrub(x) {
    const t = this.timeForGutterX(x);
    if (this.scrubHandler) this.scrubHandler(t);
  };

  ReturnStrokePanel.prototype.timeForGutterX = function timeForGutterX(x) {
    if (!this.prepared || !this.prepared.rounds.length) return 0;
    const clampedX = clamp(x, GUTTER_LEFT, GUTTER_RIGHT);
    for (let i = 0; i < this.prepared.rounds.length; i += 1) {
      const round = this.prepared.rounds[i];
      const left = round.gutterX;
      const right = round.gutterX + round.gutterW;
      if (clampedX <= right || i === this.prepared.rounds.length - 1) {
        const p = clamp((clampedX - left) / Math.max(1, round.gutterW), 0, 1);
        return round.event.t_ms + round.event.dur_ms * p;
      }
    }
    return this.prepared.totalMs;
  };

  ReturnStrokePanel.prototype.showTooltip = function showTooltip(hover) {
    if (!this.tooltipEl || hover.roundIdx < 0 || hover.nodeIdx < 0) return;
    const round = this.prepared.rounds[hover.roundIdx];
    if (!round) return;
    const node = hover.nodeIdx;
    const entry = round.hitGrid.entries[node];
    if (!entry) return;
    const subtree = subtreeTokens(round, node, 40);
    const lines = [
      "token " + (trimToken(entry.token) || "root"),
      "draft lp " + entry.draftLp.toFixed(3) + " / cum " + entry.cumLp.toFixed(3),
      "depth " + entry.depth + (entry.accepted ? " / accepted" : " / cold"),
    ];
    if (subtree.length > 1 || hover.mode === "dense") {
      lines.push("subtree " + subtree.join(" "));
    }
    const css = this.canvasToCss(hover.x + 12, hover.y + 10);
    this.setText(this.tooltipEl, lines.join("\n"));
    this.setStyle(this.tooltipEl, "display", "block");
    this.setStyle(this.tooltipEl, "transform", "translate(" + css.x.toFixed(1) + "px," + css.y.toFixed(1) + "px)");
    this.setStyle(this.tooltipEl, "opacity", "1");
  };

  ReturnStrokePanel.prototype.canvasToCss = function canvasToCss(x, y) {
    const rect = this.frame.getBoundingClientRect();
    return {
      x: (Number(x) / WIDTH) * Math.max(1, rect.width),
      y: (Number(y) / HEIGHT) * Math.max(1, rect.height),
    };
  };

  ReturnStrokePanel.prototype.hideTooltip = function hideTooltip() {
    if (!this.tooltipEl) return;
    this.setStyle(this.tooltipEl, "display", "none");
  };

  ReturnStrokePanel.prototype.drawHoverAncestry = function drawHoverAncestry(ctx, round, nodeIdx) {
    const path = [];
    let node = nodeIdx;
    while (node >= 0 && node < round.parents.length && path.length < MAX_DEPTH + 2) {
      path.push(node);
      node = round.parents[node];
    }
    if (!path.length) return;
    const layout = round.layouts.verdict;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = withAlpha(TEXT, 0.84);
    ctx.lineWidth = 2;
    ctx.beginPath();
    const first = path[0];
    ctx.moveTo(layout.x[first], layout.y[first]);
    for (let i = 1; i < path.length; i += 1) {
      const n = path[i];
      ctx.lineTo(layout.x[n], layout.y[n]);
    }
    ctx.stroke();
    ctx.fillStyle = withAlpha(TEXT, 0.9);
    ctx.beginPath();
    ctx.arc(layout.x[first], layout.y[first], 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  ReturnStrokePanel.prototype.recordPhase = function recordPhase(roundIdx, phase) {
    const key = roundIdx + ":" + phase;
    if (this.phaseSeen[key]) return;
    this.phaseSeen[key] = true;
    if (phase === "draft") this.debugCounters.phaseA += 1;
    if (phase === "verify") this.debugCounters.phaseB += 1;
    if (phase === "commit") this.debugCounters.phaseC += 1;
  };

  ReturnStrokePanel.prototype.recordCommitArrival = function recordCommitArrival(idx, timeMs) {
    const round = this.prepared.rounds[idx];
    if (!round || round.isPrefill) return;
    const delta = Math.abs(timeMs - round.event.end_ms);
    this.debugCounters.chipArrivals += 1;
    this.debugCounters.maxCommitDeltaMs = Math.max(this.debugCounters.maxCommitDeltaMs, delta);
    if (this.getLod(round.event).narrative) {
      this.recordPhase(idx, "commit");
      this.replayIdx = idx;
      this.replayUntil = performance.now() + 1;
    }
  };

  ReturnStrokePanel.prototype.recordDomWrite = function recordDomWrite() {
    this.debugCounters.domWrites += 1;
    if (this.playback.playing && this.playback.speed >= DOM_SPEED_LIMIT) {
      this.debugCounters.fastDomWrites += 1;
    }
  };

  ReturnStrokePanel.prototype.updateFps = function updateFps(realDelta) {
    if (realDelta <= 0) return;
    const fps = 1000 / realDelta;
    this.metrics.fps = this.metrics.fps ? this.metrics.fps * 0.88 + fps * 0.12 : fps;
  };

  ReturnStrokePanel.prototype.isSettlePaused = function isSettlePaused(now, timeMs) {
    if (timeMs < this.prepared.totalMs - 0.001) return false;
    if (!this.settleUntil) this.settleUntil = now + 600;
    const paused = now <= this.settleUntil;
    if (paused) this.debugCounters.settleFrames += 1;
    return paused;
  };

  ReturnStrokePanel.prototype.getMetrics = function getMetrics() {
    return {
      ...this.metrics,
      layout: this.metrics.layout.map((item) => ({ ...item })),
    };
  };

  ReturnStrokePanel.prototype.getDebugCounters = function getDebugCounters() {
    return {
      ...this.debugCounters,
      phaseCounts: {
        draft: this.debugCounters.phaseA,
        verify: this.debugCounters.phaseB,
        commit: this.debugCounters.phaseC,
      },
      activeRound: this.activeIdx,
      completedRound: this.lastCompletedIdx,
      domLayerDisplay: this.chipLayer ? this.chipLayer.style.display : "",
    };
  };

  ReturnStrokePanel.prototype.resetDebugCounters = function resetDebugCounters() {
    this.phaseSeen = Object.create(null);
    this.debugCounters = createDebugCounters();
    this.lastChipKey = "";
    return this.getDebugCounters();
  };

  function createCanvas(label) {
    const canvas = document.createElement("canvas");
    canvas.className = "return-stroke-canvas";
    canvas.setAttribute("aria-label", label);
    return canvas;
  }

  function normalizeLane(lane) {
    const events = (lane.events || []).map((event, idx) => ({
      ...event,
      idx: event.idx == null ? idx : event.idx,
      t_ms: Number(event.t_ms) || 0,
      dur_ms: Number(event.dur_ms) || 0,
      end_ms: (Number(event.t_ms) || 0) + (Number(event.dur_ms) || 0),
      token_texts: event.token_texts || [],
    }));
    return { ...lane, events };
  }

  function prepareLane(lane, options) {
    const declaredTotalMs =
      lane.totals && Number.isFinite(Number(lane.totals.wall_ms))
        ? Number(lane.totals.wall_ms)
        : lane.events.reduce((sum, event) => sum + event.dur_ms, 0);
    const eventTotalMs = lane.events.reduce((max, event) => Math.max(max, event.end_ms), 0);
    const totalMs = Math.max(declaredTotalMs, eventTotalMs);
    const sumDur = lane.events.reduce((sum, event) => sum + event.dur_ms, 0);
    let cursor = GUTTER_LEFT;
    const gutterScale = (GUTTER_RIGHT - GUTTER_LEFT) / Math.max(1, sumDur);
    const rounds = lane.events.map((event, idx) => {
      const width = Math.max(2, event.dur_ms * gutterScale);
      const round = prepareRound(event, idx, options);
      round.gutterX = cursor;
      round.gutterW = width;
      cursor += width;
      return round;
    });
    return {
      rounds,
      totalMs,
      meanRoundMs: Math.max(1, sumDur / Math.max(1, lane.events.length)),
    };
  }

  function prepareRound(event, idx, options) {
    const isPrefill = event.kind === "prefill" && !event.tree;
    const tree = event.tree || syntheticEmptyTree();
    const parents = tree.parent_indices || [-1];
    const depths = tree.depths || [0];
    const draftLp = tree.draft_lp || [];
    const cumLp = tree.cum_lp || draftLp;
    const n = Math.min(tree.num_nodes || parents.length, parents.length, depths.length);
    const children = Array.from({ length: n }, () => []);
    let root = 0;
    for (let i = 0; i < n; i += 1) {
      const parent = parents[i];
      if (parent >= 0 && parent < n) children[parent].push(i);
      if (parent < 0) root = i;
    }

    const acceptedPath = (tree.accepted_path || [root]).filter((node) => node >= 0 && node < n);
    const acceptedSet = new Uint8Array(n);
    for (let i = 0; i < acceptedPath.length; i += 1) acceptedSet[acceptedPath[i]] = 1;
    const nextAccepted = new Int16Array(n);
    nextAccepted.fill(-1);
    for (let i = 0; i < acceptedPath.length - 1; i += 1) {
      nextAccepted[acceptedPath[i]] = acceptedPath[i + 1];
    }

    const leafCounts = new Uint16Array(n);
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => depths[b] - depths[a]);
    for (let i = 0; i < order.length; i += 1) {
      const node = order[i];
      if (!children[node].length) {
        leafCounts[node] = 1;
      } else {
        let sum = 0;
        for (let c = 0; c < children[node].length; c += 1) sum += leafCounts[children[node][c]];
        leafCounts[node] = Math.max(1, sum);
      }
    }

    const x = new Float32Array(n);
    for (let i = 0; i < n; i += 1) {
      x[i] = depthX(depths[i]);
    }

    const tiers = tierDraftLogprobs(draftLp, n);
    const radii = radiiFromCum(cumLp, n);
    const verdict = buildLayout("verdict");
    const draft = buildLayout("draft");

    const rejected = [];
    for (let i = 0; i < acceptedPath.length; i += 1) {
      const node = acceptedPath[i];
      const acceptedChild = nextAccepted[node];
      const ranked = children[node]
        .filter((child) => child !== acceptedChild)
        .sort((a, b) => valueAt(draftLp, b) - valueAt(draftLp, a))
        .slice(0, 2);
      for (let r = 0; r < ranked.length; r += 1) {
        const child = ranked[r];
        rejected.push({ idx: child, x: verdict.x[child], y: verdict.y[child] });
      }
    }

    const siblingLabels = collectSiblingLabels(verdict);
    const draftPath = collectDraftPath();
    const ys = Array.from(verdict.y);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const bMin = Math.min(4, FIELD_HEIGHT / Math.max(1, leafCounts[root]));
    const maxDepth = Math.max(...Array.from(depths).slice(0, n));
    const metrics = {
      round: idx + 1,
      leaves: leafCounts[root],
      b_min: Number(bMin.toFixed(3)),
      minY: Number(minY.toFixed(2)),
      maxY: Number(maxY.toFixed(2)),
      overflow: minY < FIELD_TOP - 0.01 || maxY > FIELD_TOP + FIELD_HEIGHT + 0.01,
      spinePinned: verdict.spine.every((node) => Math.abs(node.y - CENTER_Y) < 0.001),
      maxDepth,
      nodes: n,
    };

    return {
      idx,
      event,
      isPrefill,
      parents,
      depths,
      draftLp,
      cumLp,
      children,
      acceptedSet,
      acceptedPath,
      nextAccepted,
      x,
      y: verdict.y,
      tiers,
      radii,
      nodesByTier: verdict.nodesByTier,
      edgesByTier: verdict.edgesByTier,
      rejected,
      spine: verdict.spine,
      layouts: {
        verdict,
        draft,
      },
      siblingLabels,
      draftPath,
      metrics,
      k: acceptedCount(event),
      hasBonus: Boolean(tree.correction_token),
      hitGrid: buildHitGrid(verdict.x, verdict.y, tree.token_texts || [], depths, acceptedSet, parents, draftLp, cumLp),
    };

    function buildLayout(mode) {
      const yRaw = new Float32Array(n);
      assignBands(root, FIELD_TOP, FIELD_HEIGHT, yRaw, mode);
      const y = new Float32Array(n);
      for (let i = 0; i < n; i += 1) {
        const gravity = 0.15 * clamp(depths[i], 0, MAX_DEPTH) / MAX_DEPTH;
        const jitter = mode === "verdict" && acceptedSet[i] ? 0 : ((hashInt((idx + 1) * 4099 + i * 131) % 3) - 1);
        y[i] = mode === "verdict" && acceptedSet[i] ? CENTER_Y : lerp(yRaw[i], CENTER_Y, gravity) + jitter;
      }
      if (mode === "verdict") {
        for (let i = 0; i < acceptedPath.length; i += 1) y[acceptedPath[i]] = CENTER_Y;
      }
      const layoutNodesByTier = [[], [], [], []];
      const layoutEdgesByTier = [[], [], [], []];
      for (let i = 0; i < n; i += 1) {
        const tier = tiers[i];
        layoutNodesByTier[tier].push({
          idx: i,
          x: x[i],
          y: y[i],
          sizeIndex: radiusToSizeIndex(radii[i]),
        });
        const parent = parents[i];
        if (parent >= 0 && parent < n) {
          layoutEdgesByTier[tier].push({ idx: i, x1: x[parent], y1: y[parent], x2: x[i], y2: y[i] });
        }
      }
      return {
        x,
        y,
        nodesByTier: layoutNodesByTier,
        edgesByTier: layoutEdgesByTier,
        spine: acceptedPath.map((node) => ({ x: x[node], y: y[node], idx: node })),
      };
    }

    function assignBands(node, top, height, yRaw, mode) {
      yRaw[node] = top + height / 2;
      const kids = children[node];
      if (!kids.length) return;
      const centerChild = centeredChild(node, mode);
      if (centerChild >= 0 && kids.includes(centerChild)) {
        const acceptedHeight = height * (leafCounts[centerChild] / leafCounts[node]);
        const acceptedTop = clamp(top + height / 2 - acceptedHeight / 2, top, top + height - acceptedHeight);
        const ranked = kids
          .filter((child) => child !== centerChild)
          .sort((a, b) => valueAt(draftLp, b) - valueAt(draftLp, a));
        const above = [];
        const below = [];
        for (let i = 0; i < ranked.length; i += 1) (i % 2 === 0 ? above : below).push(ranked[i]);
        assignGroup(above, top, acceptedTop - top, yRaw, mode);
        assignBands(centerChild, acceptedTop, acceptedHeight, yRaw, mode);
        assignGroup(below, acceptedTop + acceptedHeight, top + height - acceptedTop - acceptedHeight, yRaw, mode);
      } else {
        const ranked = kids.slice().sort((a, b) => valueAt(draftLp, b) - valueAt(draftLp, a));
        assignGroup(ranked, top, height, yRaw, mode);
      }
    }

    function assignGroup(group, top, height, yRaw, mode) {
      if (!group.length || height <= 0) return;
      let totalLeaves = 0;
      for (let i = 0; i < group.length; i += 1) totalLeaves += leafCounts[group[i]];
      let cursor = top;
      for (let i = 0; i < group.length; i += 1) {
        const child = group[i];
        const childHeight = height * (leafCounts[child] / Math.max(1, totalLeaves));
        assignBands(child, cursor, childHeight, yRaw, mode);
        cursor += childHeight;
      }
    }

    function centeredChild(node, mode) {
      if (mode === "verdict" && nextAccepted[node] >= 0) return nextAccepted[node];
      const kids = children[node];
      if (!kids.length) return -1;
      let best = kids[0];
      for (let i = 1; i < kids.length; i += 1) {
        if (valueAt(draftLp, kids[i]) > valueAt(draftLp, best)) best = kids[i];
      }
      return best;
    }

    function collectSiblingLabels(layout) {
      const labels = [];
      for (let i = 0; i < acceptedPath.length; i += 1) {
        const node = acceptedPath[i];
        const acceptedChild = nextAccepted[node];
        const ranked = children[node]
          .filter((child) => child !== acceptedChild)
          .sort((a, b) => valueAt(draftLp, b) - valueAt(draftLp, a))
          .slice(0, 2);
        for (let r = 0; r < ranked.length; r += 1) {
          const child = ranked[r];
          labels.push({
            idx: child,
            rank: r + 1,
            token: (tree.token_texts && tree.token_texts[child]) || "",
            lp: valueAt(draftLp, child),
            x: layout.x[child],
            y: layout.y[child],
          });
        }
      }
      return labels;
    }

    function collectDraftPath() {
      const path = [root];
      let node = root;
      while (children[node] && children[node].length && path.length <= MAX_DEPTH + 1) {
        node = centeredChild(node, "draft");
        if (node < 0) break;
        path.push(node);
      }
      return path;
    }
  }

  function drawHeartbeat(ctx, round, alpha) {
    const barHeight = clamp((round.k / 17) * 14, 1, 14);
    const x = round.gutterX;
    const w = round.gutterW;
    const y = GUTTER_TOP + GUTTER_HEIGHT - barHeight;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = withAlpha(SPINE, 0.78);
    ctx.fillRect(x, y, w, barHeight);
    if (round.hasBonus) {
      ctx.fillStyle = withAlpha(ACCENT, 0.88);
      ctx.fillRect(x, Math.max(GUTTER_TOP, y - 2), w, 2);
    }
    ctx.restore();
  }

  function drawSpine(ctx, round, alpha, width) {
    if (round.spine.length < 2) return;
    ctx.strokeStyle = withAlpha(SPINE, alpha);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(round.spine[0].x, round.spine[0].y);
    for (let i = 1; i < round.spine.length; i += 1) ctx.lineTo(round.spine[i].x, round.spine[i].y);
    ctx.stroke();
  }

  function drawSpineLayout(ctx, layout, alpha, width) {
    if (!layout || layout.spine.length < 2) return;
    ctx.strokeStyle = withAlpha(SPINE, alpha);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(layout.spine[0].x, layout.spine[0].y);
    for (let i = 1; i < layout.spine.length; i += 1) ctx.lineTo(layout.spine[i].x, layout.spine[i].y);
    ctx.stroke();
  }

  function drawBonus(ctx, alpha) {
    ctx.strokeStyle = withAlpha(ACCENT, alpha);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(BONUS_X, CENTER_Y, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = withAlpha(ACCENT, alpha * 0.42);
    ctx.fillRect(BONUS_X - 1, CENTER_Y - 13, 2, 26);
  }

  function createSpriteAtlas() {
    const cell = 20;
    const canvas = document.createElement("canvas");
    canvas.width = cell * 4;
    canvas.height = cell * 4;
    const ctx = canvas.getContext("2d");
    for (let tier = 0; tier < 4; tier += 1) {
      for (let size = 0; size < 4; size += 1) {
        const cx = size * cell + cell / 2;
        const cy = tier * cell + cell / 2;
        const radius = 2.2 + size * 1.25;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6);
        gradient.addColorStop(0, withAlpha(COLD_RAMP[tier], 0.9));
        gradient.addColorStop(0.42, withAlpha(COLD_RAMP[tier], 0.5));
        gradient.addColorStop(1, withAlpha(COLD_RAMP[tier], 0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLD_RAMP[tier];
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    return { canvas, cell };
  }

  function drawSprite(ctx, atlas, tier, sizeIndex, x, y, alpha) {
    const cell = atlas.cell;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.drawImage(atlas.canvas, sizeIndex * cell, tier * cell, cell, cell, x - cell / 2, y - cell / 2, cell, cell);
    ctx.restore();
  }

  function tierDraftLogprobs(values, n) {
    const numeric = [];
    for (let i = 0; i < n; i += 1) numeric.push(valueAt(values, i));
    const sorted = numeric.slice().sort((a, b) => a - b);
    const q1 = sorted[Math.floor(n * 0.25)] || 0;
    const q2 = sorted[Math.floor(n * 0.5)] || 0;
    const q3 = sorted[Math.floor(n * 0.75)] || 0;
    return numeric.map((v) => (v <= q1 ? 0 : v <= q2 ? 1 : v <= q3 ? 2 : 3));
  }

  function radiiFromCum(values, n) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < n; i += 1) {
      const value = valueAt(values, i);
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    const span = Math.max(0.0001, max - min);
    const radii = new Float32Array(n);
    for (let i = 0; i < n; i += 1) {
      const norm = (valueAt(values, i) - min) / span;
      radii[i] = 1.5 + 2.5 * norm;
    }
    return radii;
  }

  function radiusToSizeIndex(radius) {
    if (radius < 2.1) return 0;
    if (radius < 2.8) return 1;
    if (radius < 3.5) return 2;
    return 3;
  }

  function buildHitGrid(x, y, tokens, depths, acceptedSet, parents, draftLp, cumLp) {
    const cols = Math.ceil(WIDTH / HIT_CELL);
    const rows = Math.ceil(HEIGHT / HIT_CELL);
    const buckets = Array.from({ length: cols * rows }, () => []);
    const entries = [];
    for (let i = 0; i < x.length; i += 1) {
      const entry = {
        idx: i,
        x: x[i],
        y: y[i],
        token: tokens[i] || "",
        depth: depths[i] || 0,
        accepted: Boolean(acceptedSet[i]),
        parent: parents[i],
        draftLp: valueAt(draftLp, i),
        cumLp: valueAt(cumLp, i),
      };
      entries.push(entry);
      const cx = clamp(Math.floor(x[i] / HIT_CELL), 0, cols - 1);
      const cy = clamp(Math.floor(y[i] / HIT_CELL), 0, rows - 1);
      buckets[cy * cols + cx].push(i);
    }
    return {
      cell: HIT_CELL,
      cols,
      rows,
      buckets,
      entries,
    };
  }

  function analyzeLane(lane, options) {
    const prepared = prepareLane(normalizeLane(lane), { ...DEFAULT_OPTIONS, ...(options || {}) });
    return prepared.rounds.map((round) => ({ ...round.metrics }));
  }

  function auditColdRamp() {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < 4; i += 1) {
      ctx.fillStyle = COLD_RAMP[i];
      ctx.fillRect(i, 0, 1, 1);
    }
    const data = ctx.getImageData(0, 0, 4, 1).data;
    const bgL = hslLightness(hexToRgb(BG));
    const tiers = [];
    for (let i = 0; i < 4; i += 1) {
      const rgb = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
      tiers.push({
        color: COLD_RAMP[i],
        deltaL: Number((hslLightness(rgb) - bgL).toFixed(2)),
      });
    }
    return {
      bg: BG,
      dimmestDeltaL: tiers[0].deltaL,
      pass: tiers[0].deltaL >= 12,
      tiers,
    };
  }

  function createSyntheticLane(rounds) {
    const total = rounds || 96;
    const events = [];
    for (let i = 0; i < total; i += 1) {
      const tree = i % 2 === 0 ? createDepthChainTree(i) : createBushyTree(i);
      const k = tree.accepted_path.length - 1;
      events.push({
        idx: i,
        t_ms: i * 25,
        dur_ms: 25,
        text: " r" + (i + 1),
        token_texts: Array.from({ length: Math.max(1, k) }, (_, n) => " t" + n),
        accepted_count: Math.max(1, k),
        tree,
      });
    }
    return {
      schema: "ptd-demo-trace/v0",
      lane: {
        method: "PTD",
        engine: "synthetic-return-stroke-rig",
        model: "synthetic",
        device: "browser",
        dataset: "p1_worst_case",
        run_config: { rounds: total, round_ms: 25 },
        recorded: "2026-06-09",
        timing_source: "placeholder-mean",
      },
      prompt: { id: "p1-synthetic", text: "Synthetic worst-case tree alternation." },
      events,
      totals: {
        tokens: events.reduce((sum, event) => sum + event.token_texts.length, 0),
        wall_ms: total * 25,
        tps: 40,
        accept_len_mean: 8,
      },
    };
  }

  function createDepthChainTree(seed) {
    const parents = [-1];
    const depths = [0];
    const accepted = [0];
    const draft = [0];
    const cum = [0];
    const tokens = ["root"];
    let last = 0;
    for (let d = 1; d <= MAX_DEPTH; d += 1) {
      const node = parents.length;
      parents.push(last);
      depths.push(d);
      accepted.push(node);
      draft.push(-0.05 * d);
      cum.push(-0.08 * d);
      tokens.push(" a" + d);
      last = node;
      for (let s = 0; s < 3 && parents.length < 255; s += 1) {
        parents.push(node - 1);
        depths.push(d);
        draft.push(-0.4 - s * 0.2 - d * 0.01);
        cum.push(-0.5 - s * 0.25 - d * 0.04);
        tokens.push(" r" + s);
      }
    }
    fillTreeBudget(parents, depths, draft, cum, tokens, seed);
    return finishTree(parents, depths, draft, cum, tokens, accepted, " +");
  }

  function createBushyTree(seed) {
    const parents = [-1];
    const depths = [0];
    const draft = [0];
    const cum = [0];
    const tokens = ["root"];
    const accepted = [0];
    let frontier = [0];
    for (let depth = 1; depth <= 4 && parents.length < 255; depth += 1) {
      const next = [];
      for (let f = 0; f < frontier.length && parents.length < 255; f += 1) {
        for (let w = 0; w < 7 && parents.length < 255; w += 1) {
          const node = parents.length;
          parents.push(frontier[f]);
          depths.push(depth);
          draft.push(-0.08 * w - depth * 0.03 - (hashInt(seed + node) % 17) * 0.003);
          cum.push(-0.12 * depth - w * 0.06);
          tokens.push(" b" + w);
          next.push(node);
          if (f === 0 && w === 0) accepted[depth] = node;
        }
      }
      frontier = next;
    }
    fillTreeBudget(parents, depths, draft, cum, tokens, seed + 77);
    return finishTree(parents, depths, draft, cum, tokens, accepted.filter((node) => node != null), " *");
  }

  function fillTreeBudget(parents, depths, draft, cum, tokens, seed) {
    let cursor = 0;
    while (parents.length < 255) {
      const parent = cursor % parents.length;
      const depth = Math.min(MAX_DEPTH, depths[parent] + 1);
      parents.push(parent);
      depths.push(depth);
      draft.push(-0.65 - (hashInt(seed + parents.length * 11) % 100) / 90);
      cum.push(-0.9 - depth * 0.12);
      tokens.push(" x");
      cursor += 3;
    }
  }

  function finishTree(parents, depths, draft, cum, tokens, accepted, correctionToken) {
    return {
      num_nodes: parents.length,
      token_texts: tokens,
      parent_indices: parents,
      depths,
      draft_lp: draft,
      cum_lp: cum,
      accepted_path: accepted,
      correction_token: correctionToken,
    };
  }

  function syntheticEmptyTree() {
    return {
      num_nodes: 1,
      token_texts: ["root"],
      parent_indices: [-1],
      depths: [0],
      draft_lp: [0],
      cum_lp: [0],
      accepted_path: [0],
    };
  }

  function getContrastRamp(gain) {
    if (Math.abs(gain - 1) < 0.001) return COLD_RAMP;
    return COLD_RAMP.map((color) => mixHex(BG, color, gain));
  }

  function depthX(depth) {
    return Math.min(BONUS_X, ROOT_X + DEPTH_STEP * clamp(depth, 0, MAX_DEPTH));
  }

  function acceptedCount(event) {
    if (!event) return 0;
    if (Number.isFinite(Number(event.accepted_count))) return Number(event.accepted_count);
    return event.token_texts ? event.token_texts.length : 0;
  }

  function localProgress(event, timeMs) {
    if (!event) return 0;
    return clamp((timeMs - event.t_ms) / Math.max(1, event.dur_ms), 0, 1);
  }

  function findHit(grid, x, y) {
    if (!grid || !grid.entries || !grid.entries.length) return null;
    const cx = clamp(Math.floor(x / grid.cell), 0, grid.cols - 1);
    const cy = clamp(Math.floor(y / grid.cell), 0, grid.rows - 1);
    let best = null;
    let bestDist = Infinity;
    let count = 0;
    for (let oy = -1; oy <= 1; oy += 1) {
      const yy = cy + oy;
      if (yy < 0 || yy >= grid.rows) continue;
      for (let ox = -1; ox <= 1; ox += 1) {
        const xx = cx + ox;
        if (xx < 0 || xx >= grid.cols) continue;
        const bucket = grid.buckets[yy * grid.cols + xx];
        count += bucket.length;
        for (let i = 0; i < bucket.length; i += 1) {
          const entry = grid.entries[bucket[i]];
          const dx = entry.x - x;
          const dy = entry.y - y;
          const dist = dx * dx + dy * dy;
          if (dist < bestDist) {
            bestDist = dist;
            best = entry;
          }
        }
      }
    }
    if (!best || bestDist > 24 * 24) return null;
    return {
      idx: best.idx,
      mode: count > 8 && !best.accepted ? "dense" : "node",
    };
  }

  function subtreeTokens(round, nodeIdx, limit) {
    const out = [];
    const stack = [nodeIdx];
    while (stack.length && out.length < limit) {
      const node = stack.pop();
      const entry = round.hitGrid.entries[node];
      if (entry) out.push(trimToken(entry.token) || "root");
      const kids = round.children[node] || [];
      for (let i = kids.length - 1; i >= 0; i -= 1) stack.push(kids[i]);
    }
    return out;
  }

  function trimToken(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim().slice(0, 18);
  }

  function valueAt(values, idx) {
    const value = values && Number(values[idx]);
    return Number.isFinite(value) ? value : 0;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function blend(a, b, t) {
    return a + (b - a) * clamp(t, 0, 1);
  }

  function easeOutCubic(t) {
    const p = 1 - clamp(t, 0, 1);
    return 1 - p * p * p;
  }

  function createDebugCounters() {
    return {
      phaseA: 0,
      phaseB: 0,
      phaseC: 0,
      chipArrivals: 0,
      maxCommitDeltaMs: 0,
      domWrites: 0,
      fastDomWrites: 0,
      settleFrames: 0,
    };
  }

  function hashInt(value) {
    let x = value | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return Math.abs(x);
  }

  function withAlpha(hex, alpha) {
    const rgb = hexToRgb(hex);
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + clamp(alpha, 0, 1).toFixed(3) + ")";
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function hslLightness(rgb) {
    const max = Math.max(rgb[0], rgb[1], rgb[2]) / 255;
    const min = Math.min(rgb[0], rgb[1], rgb[2]) / 255;
    return ((max + min) / 2) * 100;
  }

  function mixHex(fromHex, toHex, amount) {
    const from = hexToRgb(fromHex);
    const to = hexToRgb(toHex);
    const t = clamp(amount, 0.2, 1.8);
    const rgb = from.map((channel, idx) => Math.round(clamp(channel + (to[idx] - channel) * t, 0, 255)));
    return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  function installStyle() {
    if (styleInstalled) return;
    styleInstalled = true;
    const style = document.createElement("style");
    style.textContent = `
.return-stroke-host {
  width: 100%;
  min-width: 0;
}

.return-stroke-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1800 / 260;
  overflow: hidden;
  border: 1px solid rgba(232, 230, 227, 0.1);
  border-radius: 6px;
  background: ${BG};
}

.return-stroke-canvas,
.return-stroke-chips {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.return-stroke-canvas {
  display: block;
}

.return-stroke-chips {
  pointer-events: none;
  transform-origin: top left;
}

.return-stroke-chip {
  position: absolute;
  max-width: 110px;
  padding: 2px 5px;
  border: 1px solid rgba(122, 184, 116, 0.32);
  border-radius: 4px;
  background: rgba(26, 26, 26, 0.78);
  color: ${TEXT};
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  white-space: nowrap;
  will-change: transform, opacity;
}

.return-stroke-tooltip {
  position: absolute;
  z-index: 4;
  max-width: 280px;
  padding: 7px 8px;
  border: 1px solid rgba(232, 230, 227, 0.22);
  border-radius: 6px;
  background: rgba(26, 26, 26, 0.94);
  color: ${TEXT};
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 10px;
  line-height: 1.45;
  white-space: pre-wrap;
  pointer-events: none;
}

.stream-burst {
  border-bottom: 1px solid rgba(122, 184, 116, 0.18);
  cursor: crosshair;
}

.stream-burst:nth-of-type(2n) {
  border-bottom-color: rgba(122, 184, 116, 0.32);
}

.stream-burst.is-linked {
  color: ${SPINE};
  background: rgba(122, 184, 116, 0.12);
}

.return-stroke-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 8px;
  color: rgba(232, 230, 227, 0.72);
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
}

.return-stroke-hud {
  min-width: 0;
  overflow: hidden;
  color: ${SPINE};
  text-overflow: ellipsis;
  white-space: nowrap;
}

.return-stroke-flags {
  display: inline-flex;
  flex-shrink: 0;
  gap: 8px;
  color: rgba(232, 230, 227, 0.55);
}

.return-stroke-flags span {
  min-height: 20px;
  padding: 2px 6px;
  border: 1px solid rgba(232, 230, 227, 0.12);
  border-radius: 999px;
}

.return-stroke-flags .is-hot {
  color: ${ACCENT};
  border-color: rgba(217, 119, 87, 0.52);
}
`;
    document.head.appendChild(style);
  }
})();
