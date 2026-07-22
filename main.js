/* ===========================================================
   MEDIVO — shared site script
   Mobile nav, dynamic year, scroll reveal, contact form handling.
   =========================================================== */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
  // Close mobile menu after tapping a link
  document.querySelectorAll(".nav-mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     Reliable scroll-to-anchor
     ---------------------------------------------------------
     CSS `scroll-behavior: smooth` on <html> can silently break
     the browser's native "jump to URL fragment" behavior,
     especially right after a fresh page load (the layout isn't
     settled yet when the browser tries to position the scroll).
     This was caught by automated testing: links like
     about.html -> index.html#clinics were landing on the right
     PAGE but not scrolling to the right SECTION. Handling it by
     hand fixes both a fresh navigation that lands on a hash and
     an in-page click on an anchor link.
     --------------------------------------------------------- */
  function scrollToHashTarget(hash, instant) {
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
  }
  // Landing here from another page with a #hash in the URL: position instantly.
  // (Native browser scroll-to-fragment can silently fail to happen at all when
  // `scroll-behavior: smooth` is set on <html> — confirmed via testing — so this
  // is handled explicitly rather than relying on default browser behavior.)
  if (window.location.hash) {
    window.addEventListener("load", function () {
      // Applied twice: once quickly, once again after layout has had more time
      // to settle (fonts, images). Cheap, and self-heals slower page loads
      // rather than relying on a single fixed delay being "enough."
      setTimeout(function () { scrollToHashTarget(window.location.hash, true); }, 60);
      setTimeout(function () { scrollToHashTarget(window.location.hash, true); }, 400);
    });
  }
  // Clicking an anchor link while already on the page: animate smoothly.
  window.addEventListener("hashchange", function () {
    scrollToHashTarget(window.location.hash, false);
  });

  /* ---- Dynamic copyright year ---- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal (skipped entirely if reduced motion is preferred) ---- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReducedMotion && "IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------
     Contact form
     ---------------------------------------------------------
     Works with zero backend: it assembles a pre-filled mailto:
     link so the message opens directly in the visitor's email
     client. This means it works the moment you publish, with
     no server or form service required.

     TO UPGRADE (recommended before heavy traffic — a mailto
     link depends on the visitor having a desktop mail client
     configured, and you won't get submissions in one place):
     Replace the body of handleSubmit() below with a fetch()
     POST to a form backend such as Formspree, Basin, or your
     own API endpoint. Example:

       fetch("https://formspree.io/f/yourFormId", {
         method: "POST",
         headers: { "Accept": "application/json" },
         body: new FormData(form)
       }).then(...)

     Everything else on the page (validation, the status
     message) can stay exactly the same.
     --------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var statusEl = form.querySelector("[data-form-status]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var role = (data.get("role") || "Other").toString();
      var org = (data.get("organization") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        showStatus("Please fill in your name, email, and message before sending.", false);
        return;
      }

      var subject = "Medivo inquiry (" + role + ") from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Organization: " + (org || "—"),
        "Role: " + role,
        "",
        message
      ];
      var mailto =
        "mailto:ashaolu@medivosolutions.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
      showStatus("Opening your email client to send this — if nothing happens, email ashaolu@medivosolutions.com directly.", true);
    });

    function showStatus(text, success) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.add("visible");
      statusEl.classList.toggle("success", success);
    }
  }
})();
