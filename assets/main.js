/* ------------------------------------------------------------------
   SITE SETTINGS — edit here, every WhatsApp button updates.
   ------------------------------------------------------------------ */
window.SITE = {
  whatsappNumber: "6582687880",   // Luis, country code first, no + or spaces
  contactName: "Luis",
  messages: {
    general: "Hi Luis, I came across Platinum Immigration and would like to find out more about Singapore PR.",
    owner:   "Hi Luis, I run a business in Singapore and would like a PR profile review, for myself or a key employee.",
    partner: "Hi Luis, I'd like to find out more about becoming a referral partner with Platinum Immigration.",
    property:"Hi Luis, I'm a property agent and would like the 'Rent Now, Buy as PR' one-pager for my expat clients."
  }
};

window.waLink = function (text) {
  return "https://wa.me/" + window.SITE.whatsappNumber + "?text=" + encodeURIComponent(text);
};

(function () {
  var S = window.SITE;
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var key = a.getAttribute("data-wa");
    a.href = window.waLink(S.messages[key] || S.messages.general);
    a.target = "_blank";
    a.rel = "noopener";
  });

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
