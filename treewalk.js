/* §3 "How JetFlow builds the tree" — an illustrative, intuitive diagram of one
   drafting round (representative tokens + shape, in the spirit of DDTree's
   explainer). Two stages: Draft (grow the tree best-first, keeping the top few
   continuations at each step, fanning above and below the running text) and
   Verify (the target accepts the longest matching prefix, even where it preferred
   a token the drafter ranked below its top guess; the next uncovered token is
   rejected, and the target's own token is a free bonus). Two showcase splits use
   close probabilities so the target's pick is NOT the drafter's top, and the tree
   covers it anyway: "told" over "given", "is" over "equals". Per-edge draft
   probabilities show the alternatives were weighed. No deps. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var FRAME = { w: 1100, h: 300 };
  var COL = 90, X0 = 44;

  // spine is centred (y 150); alternatives fan above (92) and below (208).
  // d = depth (column), p = draft prob given parent, a = on accepted path.
  // dtop = the drafter's top-ranked child the target did NOT take (the non-greedy
  // contrast). n11 is drafted on the spine but rejected; nb is the target's free
  // correction, revealed only at verify.
  var NODES = [
    { id: "n0", tok: "We", d: 0, y: 150, p: 1, a: true, root: true },
    { id: "n1", tok: "are", d: 1, y: 150, p: 0.58, a: true, parent: "n0" },
    { id: "b1", tok: "have", d: 1, y: 208, p: 0.22, parent: "n0" },
    // --- non-greedy #1: three close children of "are"; drafter's top "given" sits
    //     ABOVE, but the target takes "told" on the spine ---
    { id: "g1", tok: "given", d: 2, y: 92, p: 0.36, dtop: true, parent: "n1" },
    { id: "n2", tok: "told", d: 2, y: 150, p: 0.33, a: true, parent: "n1" },
    { id: "b2", tok: "asked", d: 2, y: 208, p: 0.29, parent: "n1" },
    { id: "n3", tok: "that", d: 3, y: 150, p: 0.71, a: true, parent: "n2" },
    { id: "a1", tok: "to", d: 3, y: 92, p: 0.16, parent: "n2" },
    { id: "n4", tok: "the", d: 4, y: 150, p: 0.62, a: true, parent: "n3" },
    { id: "b3", tok: "a", d: 4, y: 208, p: 0.25, parent: "n3" },
    { id: "n5", tok: "altitude", d: 5, y: 150, p: 0.45, a: true, parent: "n4" },
    { id: "a2", tok: "base", d: 5, y: 92, p: 0.31, parent: "n4" },
    // --- non-greedy #2: three close children of "altitude"; drafter's top "equals"
    //     sits BELOW, but the target takes "is" on the spine ---
    { id: "a3", tok: "was", d: 6, y: 92, p: 0.27, parent: "n5" },
    { id: "n6", tok: "is", d: 6, y: 150, p: 0.36, a: true, parent: "n5" },
    { id: "g2", tok: "equals", d: 6, y: 208, p: 0.39, dtop: true, parent: "n5" },
    { id: "n7", tok: "4√2", d: 7, y: 150, p: 0.58, a: true, parent: "n6" },
    { id: "n8", tok: ",", d: 8, y: 150, p: 0.71, a: true, parent: "n7" },
    { id: "n9", tok: "so", d: 9, y: 150, p: 0.52, a: true, parent: "n8" },
    { id: "a4", tok: "and", d: 9, y: 92, p: 0.30, parent: "n8" },
    { id: "n10", tok: "the", d: 10, y: 150, p: 0.64, a: true, parent: "n9" },
    { id: "b4", tok: "each", d: 10, y: 208, p: 0.22, parent: "n9" },
    { id: "n11", tok: "area", d: 11, y: 150, p: 0.44, reject: true, parent: "n10" },
    { id: "nb", tok: "leg", d: 11, y: 74, bonus: true, parent: "n10" }
  ];
  // draft reveal order (best-first: deepen the spine; the top few children of each
  // node appear together as it expands). nb (the bonus) is NOT drafted.
  var ORDER = [
    ["n1", "b1"], ["g1", "n2", "b2"], ["n3", "a1"], ["n4", "b3"], ["n5", "a2"],
    ["a3", "n6", "g2"], ["n7"], ["n8"], ["n9", "a4"], ["n10", "b4"], ["n11"]
  ];
  var ACCEPT_N = 10;

  // draft + verify copy are kept to a matched length (~2 lines) so switching
  // stages does not change the box height and shove the caption below it.
  var COPY = {
    draft: "JetFlow drafts the whole tree in one forward pass, keeping the top few continuations at every position, above and below the running text, not only the most likely one.",
    verify: "The target verifies the tree in one forward pass, keeps the longest matching prefix including both non-greedy picks, and adds its own next token as a free bonus."
  };
  var READOUT = {
    draft: "best-first drafting · keep the top few continuations at each step",
    verify: "accepted 10 + 1 bonus · 2 non-greedy picks (“told”, “is”) taken over the drafter’s top"
  };
  // localization: the Chinese page sets window.JF_LANG + window.JF_TREE_ZH before
  // this script; the English page leaves them unset and falls back to the consts.
  function L(group, stage, fallback) {
    var z = window.JF_TREE_ZH;
    if (window.JF_LANG === "zh" && z && z[group] && z[group][stage]) return z[group][stage];
    return fallback;
  }

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function chipW(t) { return Math.max(32, 8.2 * t.length + 16); }

  function build(mount) {
    var by = {}; NODES.forEach(function (n) { n.x = X0 + n.d * COL; by[n.id] = n; });
    var svg = el("svg", { viewBox: "0 0 " + FRAME.w + " " + FRAME.h, class: "tb-svg", role: "img", "aria-label": "Tree construction" });

    var eLayer = el("g", { class: "tb-edges" });
    var pLayer = el("g", { class: "tb-plabels" });
    NODES.forEach(function (n) {
      if (!n.parent) return;
      var p = by[n.parent];
      var cls = "tb-e";
      if (n.a && p.a) cls += " tb-acc";
      else if (n.reject) cls += " tb-rej";
      else if (n.bonus) cls += " tb-bon";
      else if (n.dtop) cls += " tb-dtop";
      eLayer.appendChild(el("line", { x1: p.x, y1: p.y, x2: n.x, y2: n.y, class: cls, "data-edge": n.id }));
      if (!n.bonus) {
        // place the label in the GAP between the two chips' edges (not the node
        // centre midpoint), so it never lands on a wide chip
        var gx = ((p.x + chipW(p.tok) / 2) + (n.x - chipW(n.tok) / 2)) / 2;
        var t = el("text", { x: gx, y: (p.y + n.y) / 2 - 9, class: "tb-pl", "data-pl": n.id });
        t.textContent = n.p.toFixed(2);
        pLayer.appendChild(t);
      }
    });
    svg.appendChild(eLayer);

    var nLayer = el("g", { class: "tb-nodes" });
    NODES.forEach(function (n) {
      var cls = "tb-n";
      if (n.root) cls += " tb-n--root";
      if (n.bonus) cls += " tb-n--bonus";
      if (n.reject) cls += " tb-n--reject";
      if (n.dtop) cls += " tb-n--dtop";
      if (n.a && !n.root) cls += " tb-acc";
      var g = el("g", { class: cls, "data-node": n.id, transform: "translate(" + n.x + " " + n.y + ")" });
      var w = chipW(n.tok);
      g.appendChild(el("rect", { x: -w / 2, y: -13, width: w, height: 26, rx: 6, class: "tb-chip" }));
      var tx = el("text", { x: 0, y: 4, class: "tb-tok" });
      tx.textContent = n.tok;
      g.appendChild(tx);
      nLayer.appendChild(g);
    });
    svg.appendChild(nLayer);
    svg.appendChild(pLayer);

    mount.innerHTML = "";
    mount.appendChild(svg);
    return svg;
  }

  function init() {
    var tw = document.getElementById("treewalk");
    if (!tw) return;
    var mount = tw.querySelector(".tb-canvas");
    if (!mount) return;
    var copyEl = tw.querySelector("[data-tb-copy]");
    var readEl = tw.querySelector("[data-tb-readout]");
    var stageBtns = Array.prototype.slice.call(tw.querySelectorAll(".tb-stage"));
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var svg = build(mount);
    var timers = [];
    var auto = !reduce.matches;

    function clearTimers() { timers.forEach(window.clearTimeout); timers = []; }
    function show(id, on) {
      ["[data-node=\"", "[data-edge=\"", "[data-pl=\""].forEach(function (sel) {
        var n = svg.querySelector(sel + id + "\"]"); if (n) n.classList.toggle("on", on);
      });
    }
    function flash(id) {
      var n = svg.querySelector('[data-node="' + id + '"]'); if (!n) return;
      n.classList.add("exp"); timers.push(window.setTimeout(function () { n.classList.remove("exp"); }, 360));
    }
    function setStage(stage) {
      tw.dataset.stage = stage;
      if (copyEl) copyEl.textContent = L("copy", stage, COPY[stage] || "");
      if (readEl) readEl.textContent = L("readout", stage, READOUT[stage] || "");
      stageBtns.forEach(function (b) { b.classList.toggle("active", b.dataset.go === stage); });
    }

    function toDraft(autoNext) {
      clearTimers(); setStage("draft");
      NODES.forEach(function (n) { show(n.id, n.id === "n0"); }); // start from root; hide bonus
      var step = 340;
      ORDER.forEach(function (grp, i) {
        timers.push(window.setTimeout(function () { grp.forEach(function (id) { show(id, true); flash(id); }); }, 260 + i * step));
      });
      if (autoNext && auto) timers.push(window.setTimeout(function () { toVerify(true); }, 260 + ORDER.length * step + 700));
    }
    function toVerify(autoNext) {
      clearTimers(); setStage("verify");
      NODES.forEach(function (n) { show(n.id, true); }); // reveal all incl. the bonus
      if (autoNext && auto) timers.push(window.setTimeout(function () { toDraft(true); }, 5000));
    }
    var GO = { draft: toDraft, verify: toVerify };
    stageBtns.forEach(function (b) { b.addEventListener("click", function () { auto = false; GO[b.dataset.go](false); }); });
    var rb = tw.querySelector("[data-replay]");
    if (rb) rb.addEventListener("click", function () { auto = !reduce.matches; toDraft(true); });

    setStage("draft");
    NODES.forEach(function (n) { show(n.id, n.id === "n0"); });
    if ("IntersectionObserver" in window) {
      var seen = false;
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && !seen) { seen = true; if (auto) toDraft(true); } });
      }, { threshold: 0.3 });
      io.observe(tw);
    } else if (auto) { toDraft(true); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
