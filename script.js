/* ==========================================================================
   MAAROUF ABDELFATAH — PORTFOLIO SCRIPTS
   Modern vanilla JavaScript engine. Blazing fast, zero external dependencies.
   Features:
   1. Dynamic Dark/Light Theme Switcher (persists in localStorage)
   2. Reading / Scroll Progress Bar
   3. Mobile Navigation Menu Toggle with keyboard & outside-click support
   4. Smooth Scrolling with sticky header compensation
   5. Active Section ScrollSpy (IntersectionObserver)
   6. Terminal Code Tabs & Copy-to-Clipboard
   7. Interactive Projects Filtering by category
   8. Research & Publications Showcase
   9. BibTeX / Citation Modal with 1-Click Copy
   10. Global Toast Notification System
   11. Contact Form validation & Mailto generator
   12. Floating Back-to-Top Button
   13. Scroll Reveal Animations (IntersectionObserver)
   14. Dynamic Copyright Year
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     DOM Helpers
     ---------------------------------------------------------------------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* ----------------------------------------------------------------------
     1. TOAST NOTIFICATION SYSTEM
     ---------------------------------------------------------------------- */
  const toastEl = $("#toast");
  let toastTimeout = null;

  function showToast(message, duration = 3000) {
    if (!toastEl) return;
    const msgEl = toastEl.querySelector(".toast__message");
    if (msgEl) msgEl.textContent = message;
    toastEl.classList.add("is-visible");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, duration);
  }

  // Generic copy helper with toast feedback
  function copyText(text, label = "Copied to clipboard!") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(`✓ ${label}`),
        () => fallbackCopy(text, label)
      );
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast(`✓ ${label}`);
    } catch (e) {
      showToast("Could not copy automatically. Please copy manually.");
    }
  }

  /* ----------------------------------------------------------------------
     2. DYNAMIC THEME SWITCHER (Dark default / Light toggle)
     ---------------------------------------------------------------------- */
  const themeToggle = $("#theme-toggle");
  const htmlRoot = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem("portfolio_theme");
    if (saved) return saved;
    // Default to dark theme for modern developer aesthetic
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function setTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  // Initial theme setup
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      showToast(`Theme switched to ${nextTheme} mode`);
    });
  }

  /* ----------------------------------------------------------------------
     3. SCROLL PROGRESS BAR & BACK TO TOP
     ---------------------------------------------------------------------- */
  const scrollProgress = $("#scroll-progress");
  const backToTopBtn = $("#back-to-top");

  function handleScroll() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = scrolled + "%";
    }

    if (backToTopBtn) {
      if (winScroll > 350) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----------------------------------------------------------------------
     4. HEADER & MOBILE NAVIGATION
     ---------------------------------------------------------------------- */
  const header = $("#site-header");
  const navToggle = $("#nav-toggle");
  const navList = $("#primary-menu");
  const navLinks = $$(".nav__link", navList);

  function getHeaderHeight() {
    return header ? header.offsetHeight : 72;
  }

  function setMobileMenu(open) {
    if (!navList || !navToggle) return;
    navList.classList.toggle("is-open", open);
    if (header) header.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.contains("is-open");
      setMobileMenu(!isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMobileMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navList.classList.contains("is-open")) {
        setMobileMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (navList.classList.contains("is-open") && !header.contains(e.target)) {
        setMobileMenu(false);
      }
    });
  }

  // Smooth scroll with sticky header offset
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------------------
     5. SCROLLSPY (ACTIVE NAV LINK)
     ---------------------------------------------------------------------- */
  const sections = $$("section[id]");
  const linkBySection = {};
  sections.forEach((sec) => {
    linkBySection[sec.id] = $(`.nav__link[href="#${sec.id}"]`);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            Object.keys(linkBySection).forEach((key) => {
              const link = linkBySection[key];
              if (link) link.classList.toggle("is-active", key === id);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }

  /* ----------------------------------------------------------------------
     6. INTERACTIVE TERMINAL
     ---------------------------------------------------------------------- */
  const terminalTabs = $$(".terminal__tab");
  const terminalPanes = $$(".terminal__pane");
  const terminalCopyBtn = $("#terminal-copy");

  terminalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPaneId = tab.getAttribute("data-tab");

      terminalTabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      terminalPanes.forEach((p) => p.classList.toggle("is-active", p.id === targetPaneId));
    });
  });

  if (terminalCopyBtn) {
    terminalCopyBtn.addEventListener("click", () => {
      const activePane = $(".terminal__pane.is-active");
      if (activePane) {
        const codeText = activePane.innerText;
        copyText(codeText, "Terminal code copied to clipboard!");
      }
    });
  }

  /* ----------------------------------------------------------------------
     7. FEATURED PROJECTS (DYNAMIC RENDERING & FILTERING)
     ---------------------------------------------------------------------- */
  const projects = [
    {
      id: "arsl-transfer",
      title: "Arabic Sign Language Alphabet Recognition (ArSL2018)",
      role: "Research & Development — Co-Author",
      category: "AI / Deep Learning",
      categoryKey: "ai",
      media: "ai",
      year: "2026",
      description:
        "Transfer-learning framework (InceptionV3) that classifies the 32 Arabic Sign Language alphabet classes on the ArSL2018 dataset (54,049 images), with ablation testing and per-class error analysis.",
      features: [
        "InceptionV3 transfer learning architecture",
        "Comprehensive ablation experiments",
        "Per-class confusion & error analysis",
        "54,049-image benchmark evaluation"
      ],
      stack: ["Transfer Learning", "InceptionV3", "CNN", "Image Classification", "Python"],
      link: "https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf",
      linkLabel: "Paper (PDF)",
      bibtex: `@article{maarouf2026arabic,
  title={Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment},
  author={Maarouf, Abdelfatah and Maarouf, Otman and Benaiss, Abdelaali and El Ayachi, Rachid and Biniz, Mohamed},
  journal={International Journal of Advanced Computer Science and Applications (IJACSA)},
  volume={17},
  number={6},
  year={2026}
}`
    },
    {
      id: "arsl-cnn",
      title: "Deep Learning Approach for Arabic Sign Language Recognition",
      role: "Research & Development — Co-Author",
      category: "AI / Deep Learning",
      categoryKey: "ai",
      media: "ai",
      year: "2025",
      description:
        "Convolutional neural network for recognizing Arabic Sign Language alphabets. Achieved 99.4% training accuracy and 96.57% test accuracy, advancing accessibility tools for the hearing-impaired community.",
      features: [
        "Custom CNN architecture design",
        "99.4% train / 96.57% test accuracy",
        "Sign language alphabet recognition",
        "High-performance image inference"
      ],
      stack: ["Deep Learning", "CNN", "Computer Vision", "Accessibility AI"],
      link: "https://sct.ageditor.ar/index.php/sct/article/view/2309",
      linkLabel: "Read Paper",
      doi: "https://doi.org/10.56294/saludcyt20252309",
      bibtex: `@article{maarouf2025deep,
  title={Deep Learning Approach for Arabic Sign Language Alphabet Recognition},
  author={Maarouf, Abdelfatah and Maarouf, Otman and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Salud, Ciencia y Tecnolog{\'i}a},
  volume={5},
  pages={2309},
  year={2025},
  doi={10.56294/saludcyt20252309}
}`
    },
    {
      id: "msl-dataset",
      title: "Moroccan Sign Language (MSL) Benchmark Dataset",
      role: "Data Curation & Research — Co-Author",
      category: "Dataset / Vision",
      categoryKey: "cv",
      media: "ai",
      year: "2025",
      description:
        "Annotated Moroccan Sign Language (MSL) benchmark dataset collected and curated under CC BY 4.0. Contains 2,310 videos (7h 15m), 2,069 unique words/sentences, and 75 normalized 3D keypoints per frame.",
      features: [
        "2,310 annotated video clips (7h 15m)",
        "2,069 unique words & sentences",
        "75 normalized 3D keypoints (.npy format)",
        "Hosted on Mendeley Data (CC BY 4.0)"
      ],
      stack: ["Computer Vision", "Keypoint Extraction", "MediaPipe", "Benchmark Dataset"],
      link: "https://data.mendeley.com/datasets/85hhbtykrp/1",
      linkLabel: "View Dataset",
      doi: "https://doi.org/10.17632/85hhbtykrp.1",
      bibtex: `@dataset{maarouf2025msl,
  title={Moroccan Sign Language (MSL) dataset},
  author={Maarouf, Abdelfatah and Maarouf, Otman and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Mendeley Data},
  volume={V1},
  year={2025},
  doi={10.17632/85hhbtykrp.1}
}`
    },
    {
      id: "amazigh-translation",
      title: "English–Amazigh Machine Translation with Transformers",
      role: "Research & Development — Co-Author",
      category: "NLP / Transformers",
      categoryKey: "nlp",
      media: "ml",
      year: "2024",
      description:
        "Neural machine translation for the low-resource English–Amazigh language pair. Compared LSTM, GRU, and Transformer architectures on a 137,322 parallel sentence corpus; Transformer achieved 91.37% accuracy.",
      features: [
        "LSTM, GRU, and Transformer benchmark",
        "Low-resource parallel corpus (137,322 pairs)",
        "Top translation accuracy: Transformer (91.37%)",
        "Published in IJEECS"
      ],
      stack: ["Transformers", "NLP", "Sequence-to-Sequence", "Low-Resource MT"],
      link: "https://www.researchgate.net/publication/381072107_Automatic_translation_from_English_to_Amazigh_using_transformer_learning",
      linkLabel: "Read Paper",
      bibtex: `@article{maarouf2024automatic,
  title={Automatic Translation from English to Amazigh Using Transformer Learning},
  author={Maarouf, Otman and Maarouf, Abdelfatah and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Indonesian Journal of Electrical Engineering and Computer Science (IJEECS)},
  volume={34},
  number={3},
  year={2024},
  doi={10.11591/ijeecs.v34.i3}
}`
    },
    {
      id: "diabetic-mining",
      title: "Association-Rule Mining on Diabetic Dataset (Springer CBI)",
      role: "Research & Development — Co-Author",
      category: "Data Mining",
      categoryKey: "dm",
      media: "dm",
      year: "2022",
      description:
        "Comparative evaluation of FP-Growth, CFP-Growth, and ICFP-Growth algorithms for association-rule mining in healthcare clinical records; ICFP-Growth demonstrated the highest accuracy and rule extraction precision.",
      features: [
        "FP-Growth, CFP-Growth & ICFP-Growth algorithms",
        "Clinical healthcare data pattern discovery",
        "Evaluated on real diabetic patient cohorts",
        "Published in Springer LNBIP Vol. 449"
      ],
      stack: ["Data Mining", "Association Rules", "Algorithms", "Springer"],
      link: "https://doi.org/10.1007/978-3-031-06458-6_12",
      linkLabel: "Paper (Springer)",
      bibtex: `@inproceedings{fakir2022mining,
  title={Mining Frequents Itemset and Association Rules in Diabetic Dataset},
  author={Fakir, Youssef and Maarouf, Abdelfatah and El Ayachi, Rachid},
  booktitle={Business Intelligence: 7th International Conference, CBI 2022},
  series={LNBIP},
  volume={449},
  year={2022},
  publisher={Springer},
  doi={10.1007/978-3-031-06458-6_12}
}`
    }
  ];

  const projectsGrid = $("#projects-grid");
  const filterBtns = $$(".filter-btn");

  function renderProjects(filter = "all") {
    if (!projectsGrid) return;

    const filtered = filter === "all" ? projects : projects.filter((p) => p.categoryKey === filter);

    projectsGrid.innerHTML = filtered
      .map((p) => {
        const doiBtn = p.doi
          ? `<a class="btn btn--outline btn--sm" href="${p.doi}" target="_blank" rel="noopener">DOI</a>`
          : "";

        return `
          <article class="project-card reveal is-visible" data-id="${p.id}">
            <div class="project-card__media project-card__media--${p.media}">
              <div class="project-card__badge-row">
                <span class="project-card__cat">${p.category}</span>
                <span class="project-card__year">${p.year}</span>
              </div>
            </div>
            <div class="project-card__body">
              <h3 class="project-card__title">
                <a href="${p.link}" target="_blank" rel="noopener">${p.title}</a>
              </h3>
              <p class="project-card__role">${p.role}</p>
              <p class="project-card__desc">${p.description}</p>
              <ul class="project-card__features">
                ${p.features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
              <ul class="tags" aria-label="Project technologies">
                ${p.stack.map((t) => `<li>${t}</li>`).join("")}
              </ul>
              <div class="project-card__links">
                <a class="btn btn--primary btn--sm" href="${p.link}" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  ${p.linkLabel}
                </a>
                ${doiBtn}
                <button class="btn btn--outline btn--sm btn-cite" type="button" data-cite-id="${p.id}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                  Cite
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    attachCiteListeners();
  }

  // Filter button interactions
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });

  /* ----------------------------------------------------------------------
     8. RESEARCH & PUBLICATIONS RENDERER
     ---------------------------------------------------------------------- */
  const publications = [
    {
      id: "pub-ijacsa-2026",
      type: "Research Paper",
      title: "Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment",
      authors: "Abdelfatah Maarouf, Otman Maarouf, Abdelaali Benaiss, Rachid El Ayachi, Mohamed Biniz",
      venue: "International Journal of Advanced Computer Science and Applications (IJACSA), Vol. 17, No. 6",
      year: "2026",
      status: "Published",
      featured: true,
      topics: ["Arabic Sign Language Recognition", "Computer Vision", "Deep Learning", "Transfer Learning", "InceptionV3"],
      summary:
        "A transfer-learning (InceptionV3) framework for classifying Arabic Sign Language alphabets on the ArSL2018 dataset (54,049 images), rigorously evaluated through ablation testing and per-class error analysis for real-world deployment.",
      link: "https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf",
      bibtex: `@article{maarouf2026arabic,
  title={Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment},
  author={Maarouf, Abdelfatah and Maarouf, Otman and Benaiss, Abdelaali and El Ayachi, Rachid and Biniz, Mohamed},
  journal={International Journal of Advanced Computer Science and Applications (IJACSA)},
  volume={17},
  number={6},
  year={2026}
}`
    },
    {
      id: "pub-sct-2025",
      type: "Research Paper",
      title: "Deep Learning Approach for Arabic Sign Language Alphabet Recognition",
      authors: "Abdelfatah Maarouf, Otman Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Salud, Ciencia y Tecnología, Vol. 5, Article 2309",
      year: "2025",
      status: "Published",
      topics: ["Arabic Sign Language", "Deep Learning", "CNN", "ArSL2018", "Accessibility AI"],
      summary:
        "A CNN classification model for recognizing Arabic Sign Language alphabets, trained and evaluated on an Arabic Sign Language alphabet image dataset. The proposed CNN achieved 99.4% accuracy on training and 96.57% accuracy on test data, emphasizing accessibility for deaf and hard-of-hearing individuals.",
      link: "https://sct.ageditor.ar/index.php/sct/article/view/2309",
      doi: "https://doi.org/10.56294/saludcyt20252309",
      bibtex: `@article{maarouf2025deep,
  title={Deep Learning Approach for Arabic Sign Language Alphabet Recognition},
  author={Maarouf, Abdelfatah and Maarouf, Otman and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Salud, Ciencia y Tecnolog{\'i}a},
  volume={5},
  pages={2309},
  year={2025},
  doi={10.56294/saludcyt20252309}
}`
    },
    {
      id: "pub-msl-2025",
      type: "Benchmark Dataset",
      title: "Moroccan Sign Language (MSL) Dataset",
      authors: "Abdelfatah Maarouf, Otman Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Mendeley Data, Version 1",
      year: "2025",
      status: "Published",
      topics: ["Moroccan Sign Language", "Computer Vision", "3D Keypoints", "Benchmark Dataset", "HCI"],
      summary:
        "Annotated video dataset of Moroccan Sign Language (MSL) containing 2,310 videos across 2,069 distinct words and phrases (7 hours, 15 minutes total). Delivered with raw MP4 video files and extracted normalized 3D keypoints (75 key landmarks across face, hands, and upper torso) in NumPy .npy format under CC BY 4.0.",
      link: "https://data.mendeley.com/datasets/85hhbtykrp/1",
      doi: "https://doi.org/10.17632/85hhbtykrp.1",
      bibtex: `@dataset{maarouf2025msl,
  title={Moroccan Sign Language (MSL) dataset},
  author={Maarouf, Abdelfatah and Maarouf, Otman and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Mendeley Data},
  volume={V1},
  year={2025},
  doi={10.17632/85hhbtykrp.1}
}`
    },
    {
      id: "pub-ijeecs-2024",
      type: "Research Paper",
      title: "Automatic Translation from English to Amazigh Using Transformer Learning",
      authors: "Otman Maarouf, Abdelfatah Maarouf, Rachid El Ayachi, Mohamed Biniz",
      venue: "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS), Vol. 34, No. 3",
      year: "2024",
      status: "Published",
      topics: ["Machine Translation", "Natural Language Processing", "Transformers", "Amazigh Language"],
      summary:
        "Neural machine translation architectures (LSTM, GRU, Transformer) evaluated on a 137,322-sentence English-Amazigh parallel corpus; the Transformer configuration reached 91.37% translation accuracy.",
      link: "https://www.researchgate.net/publication/381072107_Automatic_translation_from_English_to_Amazigh_using_transformer_learning",
      doi: "https://doi.org/10.11591/ijeecs.v34.i3",
      bibtex: `@article{maarouf2024automatic,
  title={Automatic Translation from English to Amazigh Using Transformer Learning},
  author={Maarouf, Otman and Maarouf, Abdelfatah and El Ayachi, Rachid and Biniz, Mohamed},
  journal={Indonesian Journal of Electrical Engineering and Computer Science (IJEECS)},
  volume={34},
  number={3},
  year={2024},
  doi={10.11591/ijeecs.v34.i3}
}`
    },
    {
      id: "pub-springer-2022",
      type: "Conference Paper",
      title: "Mining Frequents Itemset and Association Rules in Diabetic Dataset",
      authors: "Youssef Fakir, Abdelfatah Maarouf, Rachid El Ayachi",
      venue: "Business Intelligence, CBI 2022 — Springer, LNBIP vol. 449",
      year: "2022",
      status: "Published",
      topics: ["Data Mining", "Association Rules", "Healthcare Informatics", "ICFP-Growth"],
      summary:
        "Comparative benchmark of FP-Growth, CFP-Growth, and ICFP-Growth algorithms for association-rule mining on diabetic clinical records; ICFP-Growth achieved optimal precision and rule compaction.",
      link: "https://doi.org/10.1007/978-3-031-06458-6_12",
      bibtex: `@inproceedings{fakir2022mining,
  title={Mining Frequents Itemset and Association Rules in Diabetic Dataset},
  author={Fakir, Youssef and Maarouf, Abdelfatah and El Ayachi, Rachid},
  booktitle={Business Intelligence: 7th International Conference, CBI 2022},
  series={LNBIP},
  volume={449},
  year={2022},
  publisher={Springer},
  doi={10.1007/978-3-031-06458-6_12}
}`
    }
  ];

  const pubList = $("#research-publications-list");

  function renderPublications() {
    if (!pubList) return;

    pubList.innerHTML = publications
      .map((pub) => {
        // Highlight "Abdelfatah Maarouf" in bold for clear identity
        const formattedAuthors = pub.authors
          .replace("Abdelfatah Maarouf", "<strong>Abdelfatah Maarouf</strong>")
          .replace("Maarouf Abdelfatah", "<strong>Maarouf Abdelfatah</strong>");

        const doiLink = pub.doi
          ? `<a class="btn btn--outline btn--sm" href="${pub.doi}" target="_blank" rel="noopener">DOI</a>`
          : "";

        return `
          <li class="pub-item reveal is-visible">
            <article class="pub-card ${pub.featured ? "pub-card--featured" : ""}">
              <div class="pub-card__head">
                <span class="badge badge--featured">${pub.type}</span>
                <span class="badge badge--published">${pub.status}</span>
                <time class="pub-card__year">${pub.year}</time>
              </div>
              <h3 class="pub-card__title">
                <a href="${pub.link}" target="_blank" rel="noopener">${pub.title}</a>
              </h3>
              <p class="pub-card__authors">${formattedAuthors}</p>
              <p class="pub-card__venue">${pub.venue}</p>
              <ul class="tags tags--accent" aria-label="Research topics">
                ${pub.topics.map((t) => `<li>${t}</li>`).join("")}
              </ul>
              <p class="pub-card__summary">${pub.summary}</p>
              <div class="pub-card__links">
                <a class="btn btn--primary btn--sm" href="${pub.link}" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Read Paper
                </a>
                ${doiLink}
                <button class="btn btn--outline btn--sm btn-cite" type="button" data-pub-id="${pub.id}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                  BibTeX Citation
                </button>
              </div>
            </article>
          </li>
        `;
      })
      .join("");

    attachCiteListeners();
  }

  /* ----------------------------------------------------------------------
     9. BIBTEX / CITATION MODAL
     ---------------------------------------------------------------------- */
  const modalBackdrop = $("#citation-modal");
  const modalTitle = $("#modal-title");
  const modalCode = $("#modal-code");
  const modalCloseBtn = $("#modal-close");
  const modalCopyBtn = $("#modal-copy-btn");

  let activeBibtex = "";

  function openCitationModal(title, bibtex) {
    if (!modalBackdrop) return;
    activeBibtex = bibtex;
    if (modalTitle) modalTitle.textContent = `Citation: ${title}`;
    if (modalCode) modalCode.textContent = bibtex;
    modalBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeCitationModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeCitationModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeCitationModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("is-open")) {
      closeCitationModal();
    }
  });

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener("click", () => {
      copyText(activeBibtex, "BibTeX citation copied to clipboard!");
    });
  }

  function attachCiteListeners() {
    $$(".btn-cite").forEach((btn) => {
      btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-cite-id");
        const pubId = btn.getAttribute("data-pub-id");

        let item = null;
        if (projectId) {
          item = projects.find((p) => p.id === projectId);
        } else if (pubId) {
          item = publications.find((p) => p.id === pubId);
        }

        if (item && item.bibtex) {
          openCitationModal(item.title, item.bibtex);
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     10. COPY BUTTONS (Email, Phone, Quick Buttons)
     ---------------------------------------------------------------------- */
  $$("[data-copy-text]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy-text");
      const label = btn.getAttribute("data-copy-label") || "Copied to clipboard!";
      copyText(textToCopy, label);
    });
  });

  /* ----------------------------------------------------------------------
     11. CONTACT FORM WITH REAL VALIDATION & MAILTO DISPATCH
     ---------------------------------------------------------------------- */
  const contactForm = $("#contact-form");
  if (contactForm) {
    const note = $("#form-note");
    const recipient = "abdelfatah0maarouf@gmail.com";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = contactForm.elements["name"];
      const emailInput = contactForm.elements["email"];
      const msgInput = contactForm.elements["message"];

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = msgInput ? msgInput.value.trim() : "";

      if (!name || !email || !message) {
        if (note) {
          note.textContent = "Please fill in your name, email, and message.";
          note.setAttribute("data-state", "error");
        }
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (note) {
          note.textContent = "Please enter a valid email address.";
          note.setAttribute("data-state", "error");
        }
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Maarouf,\n\n${message}\n\n— Best regards,\n${name}\nEmail: ${email}`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      if (note) {
        note.textContent = "Opening your email client with your drafted message. Thank you!";
        note.setAttribute("data-state", "ok");
      }
      showToast("✓ Opening your email application!");
    });
  }

  /* ----------------------------------------------------------------------
     12. SCROLL REVEAL (INTERSECTION OBSERVER)
     ---------------------------------------------------------------------- */
  function initReveal() {
    const reveals = $$(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      reveals.forEach((el) => revealObserver.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ----------------------------------------------------------------------
     13. INITIALIZE PAGE
     ---------------------------------------------------------------------- */
  renderProjects("all");
  renderPublications();
  initReveal();

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();