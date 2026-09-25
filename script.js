/* ==========================================================================
   MAAROUF ABDELFATAH — PORTFOLIO SCRIPTS
   Vanilla JS. No libraries.
   Features:
   1. Mobile navigation toggle (+ close on click/Escape/outside click)
   2. Smooth scrolling for anchor links (with sticky-header offset)
   3. Active-link highlighting while scrolling (IntersectionObserver)
   4. Publications rendered from a JS data array (add new ones in JS only)
   5. Fade-in-on-scroll for sections (IntersectionObserver)
   6. Contact form -> mailto (no backend)
   7. Auto-updating footer year
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */
  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  /* Sticky header height. Read from the header element so any change to
     the CSS (e.g. a taller nav) is picked up automatically. */
  function getHeaderHeight() {
    var header = $("#site-header");
    return header ? header.offsetHeight : 0;
  }

  /* ----------------------------------------------------------------------
     1. MOBILE NAVIGATION
     ---------------------------------------------------------------------- */
  var toggleButton = $("#nav-toggle");
  var nav = $("#site-header");
  var navList = $("#primary-menu");
  var navLinks = navList.querySelectorAll(".nav__link");

  function isMenuOpen() {
    return navList.classList.contains("is-open");
  }

  function setMenu(open) {
    // Sync classes between the nav wrapper and the list, and the
    // aria-expanded attribute so screen readers know the state.
    navList.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    toggleButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggleButton && navList) {
    toggleButton.addEventListener("click", function () {
      setMenu(!isMenuOpen());
    });

    // Close the menu when a link inside it is clicked (mobile behaviour).
    Array.prototype.forEach.call(navLinks, function (link) {
      link.addEventListener("click", function () {
        if (isMenuOpen()) setMenu(false);
      });
    });

    // Close with the Escape key while the menu is open.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        toggleButton.focus();
      }
    });

    // Close when clicking outside the header.
    document.addEventListener("click", function (event) {
      if (isMenuOpen() && !nav.contains(event.target)) setMenu(false);
    });
  }

  /* ----------------------------------------------------------------------
     2. SMOOTH SCROLLING
     Native CSS `scroll-behavior: smooth` handles the easing; this handler
     additionally accounts for the sticky header height so sections land
     below the nav instead of underneath it.
     ---------------------------------------------------------------------- */
  Array.prototype.forEach.call(navLinks, function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      // Only intercept in-page anchor links.
      if (!id || id.charAt(0) !== "#") return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      var top =
        target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() - 8;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------------------
     3. ACTIVE-LINK HIGHLIGHTING
     Uses IntersectionObserver: the section whose top crosses a band in the
     middle of the viewport becomes "active", highlighting its nav link.
     ---------------------------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");
  var linkBySection = {};

  sections.forEach(function (section) {
    linkBySection[section.id] = $('.nav__link[href="#' + section.id + '"]');
  });

  function setActiveSection(id) {
    Object.keys(linkBySection).forEach(function (key) {
      var link = linkBySection[key];
      if (link) link.classList.toggle("is-active", key === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // The section active while its top lives in the mid-40% of the viewport.
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    // Fallback for very old browsers: no scroll-spy behaviour.
    var homeLink = linkBySection["home"];
    if (homeLink) homeLink.classList.add("is-active");
  }

  /* ----------------------------------------------------------------------
     4. PUBLICATIONS (RENDERED FROM A DATA ARRAY)
     The <ul> in the Publications section is filled from this array, so you
     can add/edit papers purely in JS — no HTML or CSS changes needed.
     Prepend new entries (newest first).

     Fields:
       title    : paper title (linked externally)
       authors  : full author list (comma separated)
       venue    : journal / conference + volume / issue
       date     : publication date (+ page range if you like)
       link     : URL for the paper (opens in a new tab)
       summary  : 1–2 sentence description of the contribution
     ---------------------------------------------------------------------- */
  var publications = [
    {
      title:
        "Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment",
      authors:
        "Abdelfatah Maarouf, Otman Maarouf, Abdelaali Benaiss, Rachid El Ayachi, Mohamed Biniz",
      venue:
        "International Journal of Advanced Computer Science and Applications (IJACSA), Vol. 17, No. 6",
      date: "2026",
      link:
        "https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf",
      summary:
        "Transfer learning (InceptionV3) approach for classifying Arabic Sign Language alphabets on the ArSL2018 dataset (54,049 images), with ablation testing and per-class error analysis."
    },
    {
      title: "Automatic Translation from English to Amazigh Using Transformer Learning",
      authors: "Otman Maarouf, Abdelfatah Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue:
        "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS), Vol. 34, No. 3",
      date: "June 2024, pp. 1924\u20131934",
      link: "https://doi.org/10.11591/ijeecs.v34.i3",
      summary:
        "Neural machine translation models (LSTM, GRU, Transformer) for the low-resource Amazigh\u2013English pair, trained on a 137,322-sentence parallel corpus; the Transformer achieved the highest accuracy (91.37%)."
    },
    {
      title: "Mining Frequents Itemset and Association Rules in Diabetic Dataset",
      authors: "Youssef Fakir, Abdelfatah Maarouf, Rachid El Ayachi",
      venue: "Business Intelligence, CBI 2022 \u2014 Springer, LNBIP vol. 449",
      date: "May 2022, pp. 146\u2013157",
      link: "https://doi.org/10.1007/978-3-031-06458-6_12",
      summary:
        "FP-Growth and its variants (CFP-Growth, ICFP-Growth) applied to a diabetic dataset for association rule mining; ICFP-Growth was found to be the most accurate."
    }
  ];

  var pubList = $("#publications-list");
  if (pubList && publications.length) {
    pubList.innerHTML = publications
      .map(function (pub) {
        return (
          '<li class="pub-item reveal">' +
            '<article class="pub-card">' +
              '<h3 class="pub-card__title">' +
                '<a href="' + pub.link + '" target="_blank" rel="noopener">' + pub.title + "</a>" +
              "</h3>" +
              '<p class="pub-card__authors">' + pub.authors + "</p>" +
              '<p class="pub-card__meta">' + pub.venue + " &middot; " + pub.date + "</p>" +
              '<p class="pub-card__summary">' + pub.summary + "</p>" +
            "</article>" +
          "</li>"
        );
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
     5. FADE-IN-ON-SCROLL
     Elements with the `.reveal` class animate in the first time they enter
     the viewport. Once visible they are un-observed (single animation).
     Note: this block runs AFTER the publications renderer above so that
     newly created `.reveal` cards are observed too.
     ---------------------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Fallback: show everything immediately.
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ----------------------------------------------------------------------
     6. CONTACT FORM -> MAILTO
     No backend: on submit we validate the fields and open the visitor's
     email application with a pre-filled message addressed to you.
     ---------------------------------------------------------------------- */
  var form = $("#contact-form");

  if (form) {
    var note = $("#form-note");
    var recipient = "abdelfatahOmaarouf@gmail.com"; // <-- your email address

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();

      // Simple validation with a friendly status message.
      if (!name || !email || !message) {
        setNote("Please fill in all fields before sending.", "error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setNote("Please enter a valid email address.", "error");
        return;
      }

      // Compose the mailto URL (encodeURIComponent handles special chars).
      var subject = encodeURIComponent("Message from " + name + " (portfolio)");
      var body = encodeURIComponent("Hi Maarouf,\n\n" + message + "\n\n— " + name + "\nReply to: " + email);
      var url = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;

      window.location.href = url;
      setNote("Opening your email app — thanks for reaching out!", "ok");
    });

    function setNote(text, state) {
      note.textContent = text;
      note.setAttribute("data-state", state);
    }
  }

  /* ----------------------------------------------------------------------
     7. FOOTER YEAR
     Keeps the copyright year current without manual edits.
     ---------------------------------------------------------------------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();