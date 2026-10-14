(function () {
  var root = document.getElementById("scorecard-tool");
  if (!root) return;

  var WHO = [
    { id: "me", label: "Myself" },
    { id: "staff", label: "A key employee in my business" }
  ];

  // Each option scores 0–3. "area" groups questions for the breakdown.
  var Q = [
    { area: "Pass & residence", q: { me: "Which pass do you currently hold?", staff: "Which pass does your employee currently hold?" },
      opts: [["Employment Pass, EntrePass or Personalised EP", 3], ["S Pass", 2], ["Dependant's Pass or LTVP", 1], ["Not yet living or working in Singapore", 0]],
      tip: "Applicants usually need to be living and working in Singapore on a valid pass when they apply." },
    { area: "Pass & residence", q: { me: "How long have you been working in Singapore?", staff: "How long have they been working in Singapore?" },
      opts: [["More than 5 years", 3], ["2 to 5 years", 2], ["1 to 2 years", 1], ["Less than 1 year", 0]],
      tip: "A longer, settled track record in Singapore usually strengthens an application." },
    { area: "Economic contribution", q: { me: "What is your fixed monthly salary?", staff: "What is their fixed monthly salary?" },
      help: "Indicative bands only. ICA does not publish a salary threshold.",
      opts: [["Above $12,000", 3], ["$8,000 to $12,000", 2], ["$5,000 to $8,000", 1], ["Below $5,000", 0]],
      tip: "Salary is weighed alongside role and seniority. Recent payslips and IRAS notices help show it clearly." },
    { area: "Economic contribution", q: { me: "What is your highest qualification?", staff: "What is their highest qualification?" },
      opts: [["Master's degree or PhD", 3], ["Bachelor's degree", 2], ["Diploma or professional certification", 1], ["Secondary school or other", 0]],
      tip: "Certified copies of qualifications, and where relevant their recognition, should be ready before applying." },
    { area: "Stability", q: { me: "How stable has your employment been over the last three years?", staff: "How stable has their employment been over the last three years?" },
      opts: [["Same employer or own company throughout", 3], ["One job change", 2], ["Two job changes", 1], ["Three or more changes, or gaps", 0]],
      tip: "Frequent changes or gaps can raise questions. Timing an application after a settled period often helps." },
    { area: "Stability", q: { me: "How established is the company you work for or own in Singapore?", staff: "How established is your company in Singapore?" },
      opts: [["Operating for over 5 years, steady results", 3], ["3 to 5 years", 2], ["1 to 3 years", 1], ["Less than a year", 0]],
      tip: "For owners on an EP, the company's track record matters. Clean filings and steady financials help." },
    { area: "Ties to Singapore", q: { me: "What are your family ties to Singapore?", staff: "What are their family ties to Singapore?" },
      opts: [["Spouse, parent or child is a Singapore citizen or PR", 3], ["Immediate family lives here with me", 2], ["Single, or family living overseas", 1]],
      opts_staff: [["Spouse, parent or child is a Singapore citizen or PR", 3], ["Immediate family lives here with them", 2], ["Single, or family living overseas", 1]],
      tip: "Family roots in Singapore are one sign of long-term commitment ICA considers." },
    { area: "Ties to Singapore", q: { me: "How involved are you in the community here?", staff: "How involved are they in the community here?" },
      opts: [["Regular, sustained involvement with records", 3], ["Some regular volunteering or associations", 2], ["Occasional", 1], ["None yet", 0]],
      tip: "Genuine, sustained community involvement shows integration. It takes time, so it's worth starting early." },
    { area: "Application history", q: { me: "Have you applied for PR before?", staff: "Have they applied for PR before?" },
      opts: [["Never applied", 3], ["Rejected, and the profile has improved since", 2], ["Rejected over a year ago, little has changed", 1], ["Rejected in the last 6 months", 0]],
      tip: "ICA doesn't explain rejections. Resubmitting the same case usually gets the same answer, so it's worth reviewing what has changed." },
    { area: "Application history", q: { me: "How ready are your documents?", staff: "How ready are their documents?" },
      help: "Payslips, IRAS notices, CPF statements, certificates, birth and marriage records.",
      opts: [["All gathered and consistent", 3], ["Mostly ready", 2], ["Some gaps or inconsistencies", 1], ["Haven't started", 0]],
      tip: "Missing or inconsistent documents are one of the most avoidable weaknesses in an application." }
  ];

  var state = { who: null, i: -1, answers: [] };
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.6-8.3z"/></svg>';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function optionButton(label, selected, onClick) {
    var b = el("button", { type: "button", class: "option", "aria-pressed": selected ? "true" : "false" }, '<span class="dot"></span><span>' + label + "</span>");
    b.addEventListener("click", onClick);
    return b;
  }

  function render() {
    root.innerHTML = "";
    if (state.i === -1) return renderWho();
    if (state.i >= Q.length) return renderResult();
    renderQuestion();
  }

  function progress(n) {
    var p = el("div", { class: "progress" });
    var s = el("span");
    s.style.width = (n * 100) + "%";
    p.appendChild(s);
    return p;
  }

  function renderWho() {
    root.appendChild(progress(0));
    root.appendChild(el("div", { class: "q-count" }, "Before we start"));
    root.appendChild(el("h2", { class: "q-title" }, "Who are you checking readiness for?"));
    root.appendChild(el("p", { class: "q-help" }, "The questions adjust to suit."));
    var opts = el("div", { class: "options" });
    WHO.forEach(function (w) {
      opts.appendChild(optionButton(w.label, state.who === w.id, function () {
        state.who = w.id; state.i = 0; render(); focusTitle();
      }));
    });
    root.appendChild(opts);
  }

  function renderQuestion() {
    var q = Q[state.i];
    root.appendChild(progress(state.i / Q.length));
    root.appendChild(el("div", { class: "q-count" }, "Question " + (state.i + 1) + " of " + Q.length + " · " + q.area));
    root.appendChild(el("h2", { class: "q-title", tabindex: "-1" }, q.q[state.who]));
    if (q.help) root.appendChild(el("p", { class: "q-help" }, q.help));
    else root.appendChild(el("div", { style: "height:14px" }));
    var list = (state.who === "staff" && q.opts_staff) ? q.opts_staff : q.opts;
    var opts = el("div", { class: "options" });
    list.forEach(function (o, idx) {
      opts.appendChild(optionButton(o[0], state.answers[state.i] === idx, function () {
        state.answers[state.i] = idx;
        state.i++;
        render(); focusTitle();
      }));
    });
    root.appendChild(opts);
    var nav = el("div", { class: "tool-nav" });
    var back = el("button", { type: "button", class: "linkbtn" }, "&larr; Back");
    back.addEventListener("click", function () { state.i--; render(); focusTitle(); });
    nav.appendChild(back);
    root.appendChild(nav);
  }

  function score() {
    var total = 0, max = 0, areas = {}, gaps = [];
    Q.forEach(function (q, i) {
      var list = (state.who === "staff" && q.opts_staff) ? q.opts_staff : q.opts;
      var top = Math.max.apply(null, list.map(function (o) { return o[1]; }));
      var s = list[state.answers[i]][1];
      total += s; max += top;
      areas[q.area] = areas[q.area] || { s: 0, m: 0 };
      areas[q.area].s += s; areas[q.area].m += top;
      if (s <= 1) gaps.push(q.tip);
    });
    return { total: total, max: max, pct: Math.round(total / max * 100), areas: areas, gaps: gaps };
  }

  function band(pct) {
    if (pct >= 75) return { key: "strong", label: "Strong foundation", text: "This profile already has many of the elements ICA tends to look for. A specialist review can check how it will be presented and whether the timing is right." };
    if (pct >= 50) return { key: "developing", label: "Developing", text: "There's a reasonable base here, with a few areas that could be strengthened. Closing those gaps before applying is usually better than reapplying after a rejection." };
    return { key: "early", label: "Early stage", text: "Several areas would benefit from time or preparation before applying. That's useful to know now. A conversation can help map out what to build and when." };
  }

  function gauge(pct, key) {
    var c = { strong: "#2f6b4a", developing: "#9a6b1e", early: "#8c3b30" }[key];
    var r = 54, C = 2 * Math.PI * r, off = C * (1 - pct / 100);
    return '<svg class="gauge" viewBox="0 0 132 132" role="img" aria-label="Score ' + pct + ' out of 100">' +
      '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="#f2f1ee" stroke-width="10"/>' +
      '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="' + c + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 66 66)"/>' +
      '<text x="66" y="66" text-anchor="middle" dominant-baseline="central" font-family="Newsreader, Georgia, serif" font-size="34" fill="#16181d">' + pct + '</text>' +
      '<text x="66" y="92" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="11" fill="#6b717c">out of 100</text></svg>';
  }

  function renderResult() {
    var r = score(), b = band(r.pct);
    var colour = { strong: "#2f6b4a", developing: "#9a6b1e", early: "#8c3b30" }[b.key];
    root.appendChild(progress(1));
    var head = el("div", { class: "result-head" });
    head.innerHTML = gauge(r.pct, b.key) + '<div><div class="q-count">' + (state.who === "staff" ? "Your employee's readiness" : "Your readiness") + '</div><p class="band-label ' + b.key + '" tabindex="-1">' + b.label + "</p></div>";
    root.appendChild(head);
    root.appendChild(el("p", null, b.text));

    var ul = el("ul", { class: "areas" });
    Object.keys(r.areas).forEach(function (k) {
      var a = r.areas[k], p = Math.round(a.s / a.m * 100);
      ul.appendChild(el("li", null, "<span>" + k + '</span><span class="bar"><span style="width:' + p + "%;background:" + colour + '"></span></span>'));
    });
    root.appendChild(ul);

    if (r.gaps.length) {
      var g = el("div", { class: "gaps" }, "<h3>Where to focus</h3>");
      var gl = el("ul");
      r.gaps.slice(0, 4).forEach(function (t) { gl.appendChild(el("li", null, t)); });
      g.appendChild(gl);
      root.appendChild(g);
    }

    var cta = el("div", { class: "btn-row" });
    var msg = "Hi Luis, I just took the PR Readiness Scorecard " + (state.who === "staff" ? "for a key employee" : "for myself") +
      " and scored " + r.pct + "/100 (" + b.label + "). I'd like a free profile review.";
    var book = el("a", { class: "btn", href: window.waLink ? window.waLink(msg) : "#", target: "_blank", rel: "noopener" },
      WA_ICON + "WhatsApp Luis for a free profile review");
    var again = el("button", { type: "button", class: "btn ghost" }, "Start again");
    again.addEventListener("click", function () { state = { who: null, i: -1, answers: [] }; render(); });
    cta.appendChild(book); cta.appendChild(again);
    root.appendChild(cta);
    root.appendChild(el("p", { class: "fine", style: "margin-top:18px" }, "Indicative only. ICA assesses each application holistically, and no consultancy can guarantee approval."));
  }

  function focusTitle() {
    var t = root.querySelector(".q-title, .band-label");
    if (t) { t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
    var top = root.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
  }

  render();
})();
