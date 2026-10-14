/* ------------------------------------------------------------------
   SITE SETTINGS — edit these, every button on the site updates.
   ------------------------------------------------------------------ */
window.SITE = {
  // Where "Book a call" / "Book a profile review" buttons go.
  // Swap for a Calendly / Google booking link when Platinum has one.
  bookingUrl: "https://platinum-immigration.com/contact-us/",

  // Partnerships inbox. Leave "" to send partner enquiries to bookingUrl instead.
  partnerEmail: "",

  // Main Platinum site.
  mainSite: "https://platinum-immigration.com/"
};

(function () {
  var S = window.SITE;

  // Wire up call-to-action links
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    var kind = a.getAttribute("data-cta");
    var subject = a.getAttribute("data-subject") || "Enquiry from the partner site";
    if (kind === "partner" && S.partnerEmail) {
      a.href = "mailto:" + S.partnerEmail + "?subject=" + encodeURIComponent(subject);
    } else if (kind === "main") {
      a.href = S.mainSite;
    } else {
      a.href = S.bookingUrl;
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  // Mobile nav
  var t = document.querySelector(".nav-toggle");
  var n = document.querySelector(".nav");
  if (t && n) {
    t.addEventListener("click", function () {
      var open = n.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
