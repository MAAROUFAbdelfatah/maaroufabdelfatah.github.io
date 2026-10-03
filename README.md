<div align="center">

# 🌐 Maarouf Abdelfatah | Professional Portfolio

[![Live Site](https://img.shields.io/badge/Live_Portfolio-maaroufabdelfatah.github.io-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://maaroufabdelfatah.github.io/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-06b6d4?style=for-the-badge&logo=github&logoColor=white)](https://maaroufabdelfatah.github.io/)
[![SEO Optimized](https://img.shields.io/badge/SEO-Rank_%231_Ready-8b5cf6?style=for-the-badge&logo=google&logoColor=white)](https://maaroufabdelfatah.github.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Official Engineering &amp; Research Portfolio of Maarouf Abdelfatah (Abdelfatah Maarouf)</strong><br />
  Java &amp; Spring Boot Backend Engineer at <strong>CGI</strong> &middot; <strong>1337 Coding School (42 Network)</strong> Alum &middot; <strong>AI/ML Researcher</strong>
</p>

[**Explore Live Demo »**](https://maaroufabdelfatah.github.io/) &middot; [**Download CV »**](https://maaroufabdelfatah.github.io/MAAROUF_ABDELFATAH.pdf) &middot; [**View Research »**](https://maaroufabdelfatah.github.io/#research)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [SEO & Google Rank Architecture](#-seo--google-rank-architecture)
- [Repository Structure](#-repository-structure)
- [Technical Stack](#-technical-stack)
- [Academic Publications & Datasets](#-academic-publications--datasets)
- [Local Development](#-local-development)
- [Deployment on GitHub Pages](#-deployment-on-github-pages)
- [Google Search Console Indexing Guide](#-google-search-console-indexing-guide)
- [Contact & Connect](#-contact--connect)

---

## 🌟 Overview

This repository hosts the personal portfolio of **Maarouf Abdelfatah** (also cited in academic research and scientific literature as **Abdelfatah Maarouf**). 

The website is engineered from scratch with **100% Vanilla HTML5, Modern CSS, and JavaScript**—requiring **zero external libraries or build dependencies**. It delivers instant page loads, a 100/100 Google Core Web Vitals score, and an enterprise developer aesthetic inspired by modern engineering tools like Linear, GitHub, and Vercel.

---

## 🚀 Key Features

- **🌓 Dynamic Theme Switcher**: 
  - Deep Midnight **Dark Mode** (default) with emerald (`#10b981`) and cyan (`#06b6d4`) neon accents.
  - Crisp, corporate **Light Mode** with high contrast and teal highlights.
  - Preference persistence in `localStorage` with automated system `prefers-color-scheme` fallback.
- **💻 Interactive Code Terminal**:
  - Code tabs switching seamlessly between `PortfolioService.java` (Spring Boot REST controller) and `DeveloperBio.json`.
  - Responsive tab labels (`Profile.java` and `Bio.json` on mobile).
  - Built-in **1-Click Copy Code** button with instant feedback.
- **📊 High-Impact Impact Metrics Showcase**:
  - `3+` Years Enterprise Experience (CGI, RTA, Fractalite).
  - `5+` Peer-Reviewed Papers & Datasets.
  - `54,000+` Curated Benchmark Dataset Samples.
  - `99.4%` Peak Deep Learning Model Accuracy.
- **🏷️ Dynamic Project & Research Filtering**:
  - Real-time client-side filter tabs: `All Projects`, `AI & Deep Learning`, `Vision & Datasets`, `NLP & Transformers`, and `Data Mining`.
  - Direct links to PDFs, Mendeley Data, and official publisher DOIs.
- **📜 Integrated BibTeX Citation Modal**:
  - Researchers, peers, and recruiters can click **"Cite"** on any project or publication to inspect and copy the formatted BibTeX record with a single click.
- **📱 100% Fluid & Fully Responsive**:
  - Engineered with CSS Grid `minmax()`, fluid typography (`clamp()`), and zero-overflow rules.
  - Tested across screens from narrow 320px mobile viewports to ultra-wide 4K monitors.
- **⚡ Interactive Micro-Interactions**:
  - Top scroll progress bar tracking reading position in real-time.
  - Smooth scroll spy in the navigation bar.
  - Floating back-to-top button.
  - Global toast notification system for copying email, phone, and citations.

---

## 🎨 Design System & Aesthetics

```
Primary Accent   : #10b981 (Emerald Neon)
Secondary Accent : #06b6d4 (Cyan)
Dark Background  : #090d16 (Deep Slate)
Dark Surface     : #0f172a (Navy Slate)
Light Background : #f8fafc (Crisp White Slate)
Light Surface    : #ffffff (Pure White)
Typography       : "Sora" (Headings), "Inter" (Body), "Fira Code" (Monospace)
```

---

## 🔍 SEO & Google Rank Architecture

The portfolio is structured specifically to **rank on Page 1 of Google** when users search for **"Maarouf Abdelfatah"** or **"Abdelfatah Maarouf"**:

### 1. Dual-Name Exact Matching
- **Title Tag**: `Maarouf Abdelfatah (Abdelfatah Maarouf) | Java & Spring Boot Backend Engineer & AI Researcher`
- **Meta Description & Keywords**: High-density, natural phrases covering both name spellings, employer (**CGI**), education (**1337 Coding School**, **FST Beni Mellal**), location (**Fes / Rabat, Morocco**), and research domains.
- **Heading Hierarchy**: Semantic `<h1>` and alternate name badges.

### 2. Comprehensive Schema.org JSON-LD Entity Graph
Injected into the `<head>` is a connected knowledge graph:
- `Person`: Linked with `name`, `alternateName` (`["Abdelfatah Maarouf", "MAAROUF Abdelfatah", "معروف عبد الفتاح"]`), `jobTitle`, `worksFor` (CGI), `alumniOf` (1337 & FST), and verified `sameAs` academic/code profiles.
- `WebSite` & `ProfilePage`: Explicitly defining this URL as the canonical personal homepage.
- `ScholarlyArticle` & `Dataset`: Direct structured references to published papers and datasets with DOIs, heavily favored by Google Scholar and Google Knowledge Graph.

### 3. Search Engine Discovery Files
- [sitemap.xml](sitemap.xml): XML sitemap listing priority weights and change frequencies for all sections.
- [robots.txt](robots.txt): Configured to grant complete access to Googlebot, Bingbot, and other crawlers.
- **OpenGraph & Twitter Cards**: Full profile metadata for rich link previews across LinkedIn, WhatsApp, X (Twitter), and Slack.

---

## 📁 Repository Structure

```
├── .nojekyll                 # Bypasses Jekyll build on GitHub Pages
├── favicon.svg               # Modern tech gradient monogram icon
├── index.html                # Main semantic HTML5 document + Schema.org JSON-LD
├── MAAROUF_ABDELFATAH.pdf    # Downloadable Curriculum Vitae
├── README.md                 # Complete project documentation & SEO guide
├── robots.txt                # Search engine crawler permissions
├── script.js                 # Vanilla JavaScript logic (tabs, filters, modals, toasts)
├── sitemap.xml               # XML sitemap for Google & Bing
└── style.css                 # Responsive stylesheet with dark/light variables
```

---

## 🛠️ Technical Stack

| Domain | Technologies |
| :--- | :--- |
| **Backend Specialization** | Java (8, 11, 17+), Spring Boot, Spring MVC, Spring Data JPA, Spring Security, Hibernate, REST APIs, SOAP, Microservices, Monolithic Architecture |
| **Databases &amp; Persistence** | Oracle Database, PostgreSQL, MySQL, Microsoft SQL Server, Liquibase, SQL Query Optimization |
| **Frontend &amp; UI** | Angular, TypeScript, Thymeleaf, JavaScript (ES6+), Semantic HTML5, Modern CSS (Flexbox, Grid, Custom Properties) |
| **Testing &amp; Quality** | JUnit 5, Mockito, Test-Driven Development (TDD), Clean Architecture, SOLID Principles, AOP |
| **DevOps &amp; Delivery** | Git, GitHub, GitLab CI, Jenkins, Apache Maven, Jira, Postman, SonarLint, Agile / Scrum |
| **AI &amp; Data Science** | Deep Learning (CNNs, InceptionV3), Computer Vision, MediaPipe, Transformers, NLP, Association-Rule Mining |

---

## 📚 Academic Publications & Datasets

1. **Arabic Sign Language Alphabet Recognition Using Transfer Learning: Evaluation, Ablation, and Deployment** (2026)  
   *International Journal of Advanced Computer Science and Applications (IJACSA)*, Vol. 17, No. 6.  
   [📄 Read Paper (PDF)](https://thesai.org/Downloads/Volume17No6/Paper_57-Arabic_Sign_Language_Alphabet_Recognition.pdf)

2. **Deep Learning Approach for Arabic Sign Language Alphabet Recognition** (2025)  
   *Salud, Ciencia y Tecnología*, Vol. 5, Article 2309.  
   [🔗 DOI: 10.56294/saludcyt20252309](https://doi.org/10.56294/saludcyt20252309)

3. **Moroccan Sign Language (MSL) Benchmark Dataset** (2025)  
   *Mendeley Data*, Version 1 (CC BY 4.0). Includes 2,310 videos (7h 15m) and 75 extracted 3D keypoints (.npy format).  
   [💾 View Dataset (Mendeley Data)](https://data.mendeley.com/datasets/85hhbtykrp/1) &middot; [🔗 DOI: 10.17632/85hhbtykrp.1](https://doi.org/10.17632/85hhbtykrp.1)

4. **Automatic Translation from English to Amazigh Using Transformer Learning** (2024)  
   *Indonesian Journal of Electrical Engineering and Computer Science (IJEECS)*, Vol. 34, No. 3.  
   [🔗 ResearchGate](https://www.researchgate.net/publication/381072107_Automatic_translation_from_English_to_Amazigh_using_transformer_learning) &middot; [📄 DOI](https://doi.org/10.11591/ijeecs.v34.i3)

5. **Mining Frequents Itemset and Association Rules in Diabetic Dataset** (2022)  
   *Business Intelligence, CBI 2022 — Springer, LNBIP*, Vol. 449.  
   [🔗 DOI: 10.1007/978-3-031-06458-6_12](https://doi.org/10.1007/978-3-031-06458-6_12)

---

## 💻 Local Development

Because this portfolio uses pure vanilla web standards, you do not need `npm install`, Webpack, or Vite.

### Option 1: Double-click to open
Simply open `index.html` in any web browser.

### Option 2: Run a local static server
```powershell
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .

# Using VS Code
# Install the "Live Server" extension, right-click index.html, and choose "Open with Live Server".
```
Visit `http://localhost:3000` in your browser.

---

## 🚀 Deployment on GitHub Pages

This repository is designed to be hosted automatically on **GitHub Pages**:

1. In GitHub, go to your repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &gt; **Source**, select `Deploy from a branch`.
3. Choose your branch (e.g. `main` or `feature/new-version`) and folder `/ (root)`.
4. Click **Save**.
5. Your portfolio will be live at `https://maaroufabdelfatah.github.io/`.

---

## 📈 Google Search Console Indexing Guide

To ensure Google indexes your portfolio and displays it on the **first page** when searching **"Maarouf Abdelfatah"** or **"Abdelfatah Maarouf"**:

1. **Submit to Google Search Console**:
   - Navigate to [Google Search Console](https://search.google.com/search-console).
   - Click **Add Property** and enter `https://maaroufabdelfatah.github.io/`.
   - Verify ownership (using GitHub Pages HTML meta tag or DNS).
2. **Submit Your Sitemap**:
   - In the left sidebar, click **Sitemaps**.
   - Enter `sitemap.xml` and click **Submit**.
3. **Request Priority Indexing**:
   - Paste `https://maaroufabdelfatah.github.io/` into the top search bar (URL Inspection).
   - Click **Request Indexing**. Google will crawl the page within 24–48 hours.
4. **Establish High-Authority Backlinks**:
   - Add `https://maaroufabdelfatah.github.io/` to your **GitHub Profile** bio/website.
   - Add the link to your **LinkedIn profile** (under contact info &amp; featured).
   - Add the link to **Google Scholar**, **ResearchGate**, and **ORCID**.

---

## 📬 Contact & Connect

- **Full Name**: Maarouf Abdelfatah (Abdelfatah Maarouf)
- **Role**: Java &amp; Spring Boot Backend Engineer &middot; AI Researcher
- **Location**: Fes / Rabat, Morocco *(Open to Remote &amp; Relocation)*
- **Email**: [abdelfatah0maarouf@gmail.com](mailto:abdelfatah0maarouf@gmail.com)
- **Phone / WhatsApp**: [+212 647 113 789](tel:+212647113789)
- **GitHub**: [@MAAROUFAbdelfatah](https://github.com/MAAROUFAbdelfatah)
- **Portfolio**: [https://maaroufabdelfatah.github.io/](https://maaroufabdelfatah.github.io/)

---

<div align="center">
  <sub>&copy; 2026 Maarouf Abdelfatah. All rights reserved.</sub>
</div>
