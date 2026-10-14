(function () {
  var input = document.getElementById("price");
  if (!input) return;
  var compare = document.getElementById("compare");
  var saving = document.getElementById("saving");
  var chips = document.querySelectorAll(".chip");

  var BUYERS = [
    { who: "Foreigner", rate: 0.60, note: "60% ABSD", colour: "#8c3b30" },
    { who: "PR, first home", rate: 0.05, note: "5% ABSD", colour: "#1f4e5a" },
    { who: "Singapore citizen, first home", rate: 0, note: "0% ABSD", colour: "#6b717c" }
  ];

  function fmt(n) { return "S$" + Math.round(n).toLocaleString("en-SG"); }
  function parse(v) { var n = parseInt(String(v).replace(/[^0-9]/g, ""), 10); return isNaN(n) ? 0 : n; }

  function draw() {
    var p = parse(input.value);
    var max = p * 0.6 || 1;
    compare.innerHTML = "";
    BUYERS.forEach(function (b) {
      var amt = p * b.rate;
      var row = document.createElement("div");
      row.className = "row";
      row.innerHTML = '<span class="who">' + b.who + '</span><span class="amt">' + fmt(amt) + '</span><span class="rate">' + b.note + '</span>' +
        '<span class="track"><span style="width:' + (amt / max * 100) + '%;background:' + b.colour + '"></span></span>';
      compare.appendChild(row);
    });
    saving.textContent = fmt(p * 0.55);
    chips.forEach(function (c) { c.classList.toggle("on", parse(c.dataset.p) === p); });
  }

  input.addEventListener("input", function () {
    var n = parse(input.value);
    input.value = n ? n.toLocaleString("en-SG") : "";
    draw();
  });
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      input.value = parse(c.dataset.p).toLocaleString("en-SG");
      draw();
    });
  });

  var ref = document.getElementById("ref");
  [1000000, 1500000, 2500000].forEach(function (p) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + fmt(p) + "</td><td>" + fmt(p * 0.6) + "</td><td>" + fmt(p * 0.05) + "</td><td><strong>" + fmt(p * 0.55) + "</strong></td>";
    ref.appendChild(tr);
  });

  draw();
})();
