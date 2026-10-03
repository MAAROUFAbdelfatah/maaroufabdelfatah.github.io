/* ==========================================================================
   MAAROUF ABDELFATAH — PORTFOLIO SCRIPTS
   Vanilla JS. No libraries.
   Features:
   1. Mobile navigation toggle (+ close on click/Escape/outside click)
   2. Smooth scrolling for anchor links (with sticky-header offset)
   3. Active-link highlighting while scrolling (IntersectionObserver)
   4. Featured Projects rendered from a JS data array
   5. Research / Publications rendered from a JS data array
   6. Fade-in-on-scroll for sections (IntersectionObserver)
   7. Contact form -> mailto (no backend)
   8. Auto-updating footer year
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
     4. FEATURED PROJECTS (RENDERED FROM A DATA ARRAY)
     The #projects-grid is filled from this array. Add/edit projects purely
     in JS — no HTML or CSS changes needed. Newest/strongest first.

     Fields:
       title      : project name (linked to `link`)
       role       : your role caption, e.g. "Research & development — co-author"
       category   : short label drawn on the card media header
       media      : gradient variant class: "ai" | "ml" | "dm"
       tags       : category tags (Backend, Full Stack, AI / Machine Learning...)
       description: 1–2 sentences
       features   : key technical features (bullets)
       stack      : main technologies (chips)
       link       : primary external link (demo, paper, repo...)
       linkLabel  : label for the primary link button
       github     : repository URL, or null if you don't have one
       demo       : live demo URL, or null if not available

     NOTE: The starter entries below are derived from published papers
     (no fabricated repo/demo links). Replace or extend them with your
     commercial / personal projects.
     ---------------------------------------------------------------------- */
  var projects = [
    {
      title: "Arabic Sign Language Alphabet Recognition (ArSL2018)",
      role: "Research & development — co-author",
      category: "AI / Deep Learning",
      media: "ai",
      tags: ["AI / Machine Learning", "Computer Vision", "Research"],
      description:
        "Transfer-learning framework (InceptionV3) that classifies the 32 Arabic Sign Language alphabet classes on the ArSL2018 dataset (54,049 images), with ablation testing and per-class error analysis.",
      features: [
        "InceptionV3 transfer learning",
        "Ablation experiments",
        "Per-class error analysis",
        "54,049-image ArSL2018 dataset"
      ],
      stack: ["Transfer Learning", "InceptionV3", "Convolutional Networks", "Image Classification"],
      link: "https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf",
      linkLabel: "Paper (PDF)",
      github: null,
      demo: null
    },
    {
      title: "Deep Learning Approach for Arabic Sign Language Alphabet Recognition",
      role: "Research & development — co-author",
      category: "AI / Deep Learning",
      media: "ai",
      tags: ["AI / Machine Learning", "Computer Vision", "Research"],
      description:
        "A CNN classification model for recognizing Arabic Sign Language alphabets, trained and evaluated on an Arabic Sign Language alphabet image dataset; the proposed CNN achieved 99.4% accuracy on the training set and 96.57% accuracy on the test set.",
      features: [
        "Convolutional neural network classifier",
        "Arabic Sign Language alphabet recognition",
        "99.4% train / 96.57% test accuracy"
      ],
      stack: ["Deep Learning", "Convolutional Neural Networks", "Image Classification"],
      link: "https://sct.ageditor.ar/index.php/sct/article/view/2309",
      linkLabel: "Read Paper",
      github: null,
      demo: null
    },
    {
      title: "Moroccan Sign Language (MSL) dataset",
      role: "Data curation & research — co-author",
      category: "Dataset / Computer Vision",
      media: "ai",
      tags: ["Dataset", "Computer Vision", "Sign Language", "Research"],
      description:
        "Annotated Moroccan Sign Language (MSL) video clips collected from publicly available online videos, selected for clarity, Arabic subtitles, and diversity in signers (adults and children). Includes 2,310 videos totalling 7 hours, 15 minutes, 19 seconds, covering 2,069 unique words and sentences, with raw .mp4 clips plus extracted normalized 3D keypoints (75 points covering the face, hands, and upper body) in .npy format.",
      features: [
        "2,310 annotated video clips",
        "2,069 unique words and sentences",
        "75 normalized 3D keypoints (.npy)",
        "MP4 + keypoint data, CC BY 4.0"
      ],
      stack: ["Computer Vision", "Keypoint Extraction", "Machine Learning"],
      link: "https://data.mendeley.com/datasets/85hhbtykrp/1",
      linkLabel: "View Dataset",
      github: null,
      demo: null
    },
    {
      title: "English–Amazigh Machine Translation with Transformers",
      role: "Research & development — co-author",
      category: "AI / NLP",
      media: "ml",
      tags: ["AI / Machine Learning", "Natural Language Processing", "Research"],
      description:
        "Neural machine translation for the low-resource Amazigh–English language pair, comparing LSTM, GRU and Transformer architectures on a 137,322-sentence parallel corpus; the Transformer reached 91.37% accuracy.",
      features: [
        "LSTM / GRU / Transformer comparison",
        "Low-resource parallel corpus (137,322 sentences)",
        "Top accuracy: Transformer (91.37%)"
      ],
      stack: ["Transformers", "LSTM", "GRU", "Machine Translation"],
      link: "https://doi.org/10.11591/ijeecs.v34.i3",
      linkLabel: "Paper (DOI)",
      github: null,
      demo: null
    },
    {
      title: "Association-Rule Mining on a Diabetic Dataset",
      role: "Research & development — co-author",
      category: "Data Mining",
      media: "dm",
      tags: ["Data Mining", "Research"],
      description:
        "Evaluation of FP-Growth and its variants (CFP-Growth, ICFP-Growth) for association-rule mining on a diabetic dataset; ICFP-Growth proved the most accurate.",
      features: [
        "FP-Growth and its variants",
        "Association-rule mining",
        "Best accuracy: ICFP-Growth"
      ],
      stack: ["FP-Growth", "CFP-Growth", "ICFP-Growth", "Association Rules"],
      link: "https://doi.org/10.1007/978-3-031-06458-6_12",
      linkLabel: "Paper (DOI)",
      github: null,
      demo: null
    }
  ];

  var projectsGrid = $("#projects-grid");
  if (projectsGrid && projects.length) {
    projectsGrid.innerHTML = projects
      .map(function (p) {
        // Optional secondary links (GitHub / demo) — only rendered when set.
        var extraLinks = "";
        if (p.github) {
          extraLinks +=
            '<a class="btn btn--outline btn--sm" href="' +
            p.github +
            '" target="_blank" rel="noopener">GitHub</a>';
        }
        if (p.demo) {
          extraLinks +=
            '<a class="btn btn--outline btn--sm" href="' +
            p.demo +
            '" target="_blank" rel="noopener">Live demo</a>';
        }

        return (
          '<article class="project-card reveal">' +
            '<div class="project-card__media project-card__media--' + p.media + '">' +
              '<span class="project-card__cat">' + p.category + "</span>" +
            "</div>" +
            '<div class="project-card__body">' +
              "<h3 class=\"project-card__title\">" +
                '<a href="' + p.link + '" target="_blank" rel="noopener">' + p.title + "</a>" +
              "</h3>" +
              '<p class="project-card__role">' + p.role + "</p>" +
              '<p class="project-card__desc">' + p.description + "</p>" +
              '<ul class="project-card__features">' +
                p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") +
              "</ul>" +
              '<ul class="tags" aria-label="Project technologies">' +
                p.stack.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
              "</ul>" +
              '<div class="project-card__links">' +
                '<a class="btn btn--primary btn--sm" href="' + p.link + '" target="_blank" rel="noopener">' + p.linkLabel + "</a>" +
                extraLinks +
              "</div>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
     5. RESEARCH / PUBLICATIONS (RENDERED FROM A DATA ARRAY)
     The #research-publications-list is filled from this array. Add/edit
     entries purely in JS.

     Fields:
       title     : paper / dataset title (linked to `link`)
       authors   : full author list
       venue     : journal / conference / repository + volume / version
       year      : publication year
       status    : e.g. "Published" — placeholder only if unknown
       type      : optional category badge text (e.g. "Dataset", "Research Paper")
       topics    : research topics / keywords (chips)
       summary   : 1–2 sentence description of the contribution
       link      : URL (article, DOI or dataset page)
       doi       : optional DOI URL rendered as a second link
       linkLabel : optional label for `link` (defaults to "Read paper")
       doiLabel  : optional label for `doi` (defaults to "DOI")
       featured  : true gives the AI / sign-language paper a highlighted card
     ---------------------------------------------------------------------- */
  var publications = [
    {
      title:
        "Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment",
      authors:
        "Abdelfatah Maarouf, Otman Maarouf, Abdelaali Benaiss, Rachid El Ayachi, Mohamed Biniz",
      venue: "International Journal of Advanced Computer Science and Applications (IJACSA), Vol. 17, No. 6",
      year: "2026",
      status: "Published",
      topics: ["Arabic Sign Language Recognition", "Computer Vision", "Deep Learning", "Transfer Learning"],
      summary:
        "A transfer-learning (InceptionV3) framework for classifying Arabic Sign Language alphabets on the ArSL2018 dataset (54,049 images), evaluated through ablation testing and per-class error analysis.",
      link: "https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf"
    },
    {
      type: "Research Paper",
      title: "Deep Learning Approach for Arabic Sign Language Alphabet Recognition",
      authors: "Abdelfatah Maarouf, Otman Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Salud, Ciencia y Tecnología, Vol. 5, Article 2309",
      year: "2025",
      status: "Published",
      topics: ["Arabic Sign Language Alphabets", "Deep Learning", "Convolutional Neural Network", "ArSL2018"],
      summary:
        "A CNN classification model for recognizing Arabic Sign Language alphabets, trained and evaluated on an Arabic Sign Language alphabet image dataset. The proposed CNN achieved 99.4% accuracy on the training set and 96.57% accuracy on the test set, highlighting the potential of deep learning for sign-language recognition and accessibility for individuals with hearing disabilities.",
      link: "https://sct.ageditor.ar/index.php/sct/article/view/2309",
      doi: "https://doi.org/10.56294/saludcyt20252309",
      linkLabel: "Read Paper"
    },
    {
      type: "Dataset",
      title: "Moroccan Sign Language (MSL) dataset",
      authors: "Abdelfatah Maarouf, Otman Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Mendeley Data, Version 1",
      year: "2025",
      status: "Published",
      topics: ["Moroccan Sign Language", "Machine Learning", "Computer Vision", "Sign Language Recognition", "Human-Computer Interaction"],
      summary:
        "Annotated video clips of Moroccan Sign Language (MSL) collected from publicly available online videos, selected for clarity, Arabic subtitles, and diversity in signers (adults and children). The dataset includes 2,310 videos totalling 7 hours, 15 minutes, 19 seconds, covering 2,069 unique words and sentences, with raw .mp4 clips plus extracted normalized 3D keypoints (75 tracked points covering the face, hands, and upper body) in .npy format.",
      link: "https://data.mendeley.com/datasets/85hhbtykrp/1",
      doi: "https://doi.org/10.17632/85hhbtykrp.1",
      linkLabel: "View Dataset"
    },
    {
      title: "Automatic Translation from English to Amazigh Using Transformer Learning",
      authors: "Otman Maarouf, Abdelfatah Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS), Vol. 34, No. 3",
      year: "2024",
      status: "Published",
      topics: ["Machine Translation", "Natural Language Processing", "Deep Learning"],
      summary:
        "Neural machine translation models (LSTM, GRU, Transformer) for the low-resource Amazigh–English language pair, trained on a 137,322-sentence parallel corpus; the Transformer achieved the highest accuracy (91.37%).",
      link: "https://doi.org/10.11591/ijeecs.v34.i3"
    },
    {
      title: "Mining Frequents Itemset and Association Rules in Diabetic Dataset",
      authors: "Youssef Fakir, Abdelfatah Maarouf, Rachid El Ayachi",
      venue: "Business Intelligence, CBI 2022 — Springer, LNBIP vol. 449",
      year: "2022",
      status: "Published",
      topics: ["Data Mining", "Association Rules"],
      summary:
        "FP-Growth and its variants (CFP-Growth, ICFP-Growth) applied to a diabetic dataset for association-rule mining; ICFP-Growth was found to be the most accurate.",
      link: "https://doi.org/10.1007/978-3-031-06458-6_12"
    }
  ];

  var pubList = $("#research-publications-list");
  if (pubList && publications.length) {
    pubList.innerHTML = publications
      .map(function (pub) {
        var topics = pub.topics
          ? '<ul class="tags tags--accent pub-card__topics" aria-label="Research topics">' +
              pub.topics.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
            "</ul>"
          : "";

        var statusBadge =
          '<span class="badge badge--' +
          (pub.status === "Published" ? "published" : "featured") +
          '">' +
          pub.status +
          "</span>";

        var typeBadge = pub.type
          ? '<span class="badge badge--featured">' + pub.type + "</span>"
          : "";

        var links =
          '<div class="pub-card__links">' +
            '<a class="pub-card__link" href="' + pub.link + '" target="_blank" rel="noopener noreferrer">' +
              (pub.linkLabel || "Read paper") +
            "</a>" +
            (pub.doi
              ? '<a class="pub-card__link" href="' + pub.doi + '" target="_blank" rel="noopener noreferrer">' +
                  (pub.doiLabel || "DOI") +
                "</a>"
              : "") +
          "</div>";

        return (
          '<li class="pub-item reveal">' +
            '<article class="pub-card' + (pub.featured ? " pub-card--featured" : "") + '">' +
              '<div class="pub-card__head">' +
                typeBadge +
                statusBadge +
                '<time class="pub-card__year">' + pub.year + "</time>" +
              "</div>" +
              "<h3 class=\"pub-card__title\">" +
                '<a href="' + pub.link + '" target="_blank" rel="noopener noreferrer">' + pub.title + "</a>" +
              "</h3>" +
              '<p class="pub-card__authors">' + pub.authors + "</p>" +
              '<p class="pub-card__venue">' + pub.venue + "</p>" +
              topics +
              '<p class="pub-card__summary">' + pub.summary + "</p>" +
              links +
            "</article>" +
          "</li>"
        );
      })
      .join("");
  }

  /* ----------------------------------------------------------------------
     6. FADE-IN-ON-SCROLL
     Elements with the `.reveal` class animate in the first time they enter
     the viewport. Once visible they are un-observed (single animation).
     Note: this block runs AFTER the renderers above so that newly created
     `.reveal` cards (projects + publications) are observed too.
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
     7. CONTACT FORM -> MAILTO
     No backend on GitHub Pages: on submit we validate the fields and open
     the visitor's email application with a pre-filled message addressed to
     you. The form genuinely works (it never silently drops a message).
     ---------------------------------------------------------------------- */
  var form = $("#contact-form");

  if (form) {
    var note = $("#form-note");
    var recipient = "abdelfatah0maarouf@gmail.com"; // <-- your email address

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
     8. FOOTER YEAR
     Keeps the copyright year current without manual edits.
     ---------------------------------------------------------------------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();