const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.18,
  rootMargin: "0px 0px -10% 0px",
});

elements.forEach((el) => observer.observe(el));
window.addEventListener("load", () => {
  document.body.classList.add("page-ready");
  initHeroTyping();
  initConsoleTyping();
});

function initHeroTyping() {
  const heading = document.querySelector(".hero-heading-typed");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!heading || prefersReducedMotion) {
    return;
  }

  const line1 = heading.querySelector('[data-typed-line="1"]');
  const line2 = heading.querySelector('[data-typed-line="2"]');

  if (!line1 || !line2) {
    return;
  }

  const prefix = heading.dataset.prefix ?? "";
  const name = heading.dataset.name ?? "";
  const suffix = "";
  const role = heading.dataset.role ?? "";
  const fullLine1 = `${prefix}${name}${suffix}`;
  const nameStart = prefix.length;
  const nameEnd = nameStart + name.length;
  const cursor = '<span class="typing-cursor" aria-hidden="true"></span>';

  function renderLine1(count, activeCursor = false) {
    const visible = fullLine1.slice(0, count);
    const before = visible.slice(0, Math.min(count, nameStart));
    const accentPart = count > nameStart ? visible.slice(nameStart, Math.min(count, nameEnd)) : "";
    const after = count > nameEnd ? visible.slice(nameEnd) : "";

    line1.innerHTML = `${before}${accentPart ? `<span class="hero-accent">${accentPart}</span>` : ""}${after}${activeCursor ? cursor : ""}`;
  }

  function renderLine2(count, activeCursor = false) {
    line2.innerHTML = `${role.slice(0, count)}${activeCursor ? cursor : ""}`;
  }

  renderLine1(0, true);
  renderLine2(role.length, false);

  const line1Speed = 70;

  function typeFirstLine(index = 0) {
    if (index <= fullLine1.length) {
      renderLine1(index, true);
      setTimeout(() => typeFirstLine(index + 1), line1Speed);
      return;
    }

    renderLine1(fullLine1.length, true);
  }

  setTimeout(() => typeFirstLine(0), 220);
}

function initConsoleTyping() {
  const typingTargets = Array.from(document.querySelectorAll(".dev-console-typing"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!typingTargets.length) {
    return;
  }

  if (prefersReducedMotion) {
    typingTargets.forEach((target) => {
      target.textContent = target.dataset.codeText ?? "";
      target.classList.remove("is-typing");
    });
    return;
  }

  typingTargets.forEach((target) => {
    target.textContent = "";
    target.classList.remove("is-typing");
  });

  let hasTyped = false;
  const consoleCard = document.querySelector(".dev-console-code");

  if (!consoleCard) {
    return;
  }

  function resetTargets() {
    typingTargets.forEach((target) => {
      target.textContent = "";
      target.classList.remove("is-typing");
    });
  }

  function runConsoleLoop() {
    function typeTargetAt(targetIndex = 0) {
      const target = typingTargets[targetIndex];

      if (!target) {
        typingTargets.forEach((item) => item.classList.remove("is-typing"));
        setTimeout(() => {
          resetTargets();
          runConsoleLoop();
        }, 1400);
        return;
      }

      const fullText = target.dataset.codeText ?? "";
      let charIndex = 0;
      typingTargets.forEach((item) => item.classList.remove("is-typing"));
      target.classList.add("is-typing");

      function typeNextChar() {
        target.textContent = fullText.slice(0, charIndex);
        charIndex += 1;

        if (charIndex <= fullText.length) {
          setTimeout(typeNextChar, targetIndex === 0 ? 34 : 30);
          return;
        }

        target.classList.remove("is-typing");
        setTimeout(() => typeTargetAt(targetIndex + 1), 90);
      }

      typeNextChar();
    }

    typeTargetAt(0);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || hasTyped) {
        return;
      }

      hasTyped = true;
      resetTargets();
      runConsoleLoop();
      observer.disconnect();
    });
  }, {
    threshold: 0.25,
  });

  observer.observe(consoleCard);
}

function prepareScrollSequences(scope = document) {
  const groups = [
    ".timeline-resume",
    ".skills-groups",
    ".project-grid",
    ".contact-list",
  ];

  groups.forEach((selector) => {
    scope.querySelectorAll(selector).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.classList.add("scroll-sequence-item");
        child.style.setProperty("--reveal-delay", `${index * 110}ms`);
        child.classList.remove("reveal-soft-left", "reveal-soft-right", "reveal-soft-up");
        if (index === 0) {
          child.classList.add("reveal-soft-up");
        } else if (index % 2 === 0) {
          child.classList.add("reveal-soft-right");
        } else {
          child.classList.add("reveal-soft-left");
        }
      });
    });
  });
}

prepareScrollSequences();

const navLinks = document.querySelectorAll(".nav-link");
const sectionIds = ["home", "about", "skills", "experience", "projects", "education", "achievements", "contact"];
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const sideMenuLinks = document.querySelectorAll(".side-menu-link");
const scrollTopShortcut = document.getElementById("scrollTopShortcut");

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
}

if (sections.length) {
  function updateActiveSection() {
    const probe = window.scrollY + window.innerHeight * 0.38;
    let activeId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= probe) {
        activeId = section.id;
      }
    });

    setActiveLink(activeId);
  }

  function updateScrollShortcut() {
    if (!scrollTopShortcut) {
      return;
    }

    scrollTopShortcut.classList.toggle("is-visible", window.scrollY > 420);
  }

  updateActiveSection();
  updateScrollShortcut();
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("scroll", updateScrollShortcut, { passive: true });
  window.addEventListener("resize", updateActiveSection);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    if (href?.startsWith("#")) {
      setActiveLink(href.slice(1));
    }
  });
});

function toggleMenu(isOpen) {
  if (!sideMenu || !menuOverlay || !menuToggle) {
    return;
  }

  sideMenu.classList.toggle("is-open", isOpen);
  menuOverlay.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  sideMenu.setAttribute("aria-hidden", String(!isOpen));
  
  if (isOpen) {
    document.body.classList.add("menu-locked");
  } else {
    document.body.classList.remove("menu-locked");
  }
}

menuToggle?.addEventListener("click", () => toggleMenu(true));
menuClose?.addEventListener("click", () => toggleMenu(false));
menuOverlay?.addEventListener("click", () => toggleMenu(false));
sideMenuLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sideMenu?.classList.contains("is-open")) {
    toggleMenu(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024 && sideMenu?.classList.contains("is-open")) {
    toggleMenu(false);
  }
});

let projects = [
  // --- FEATURED PROJECTS (1-5) ---
  {
    title: "TaskGram",
    description: "A Telegram-based intelligent task manager and automation bot that sends automated reminders, scheduled alerts, and task notifications directly into your Telegram chat.",
    tags: ["TypeScript", "Telegram Bot API", "PostgreSQL", "Node.js"],
    demo: "https://task-gram-one.vercel.app",
    link: "https://github.com/Rnrezanur/TaskGram",
    pinned: true,
    order: 1,
  },
  {
    title: "Stream Command Center",
    description: "Unified live-streaming dashboard allowing creators to switch OBS scenes, mute audio feeds, trigger streams/recordings, and aggregate multi-platform chat and real-time viewer analytics.",
    tags: ["JavaScript", "OBS WebSocket", "Real-Time Dashboard", "Live Streaming"],
    demo: "https://stream-command.vercel.app",
    link: "https://github.com/Rnrezanur/Stream-Command-Center",
    pinned: true,
    order: 2,
  },
  {
    title: "DFM (Download Fast Manager)",
    description: "High-performance Internet Download Manager alternative featuring multi-threaded segmented file downloads, streaming video grabber, pause/resume engine, and modern desktop UI for Windows and Ubuntu.",
    tags: ["Python", "Multi-Threading", "Network I/O", "Desktop GUI"],
    demo: null,
    link: "https://github.com/Rnrezanur/DFM",
    pinned: true,
    order: 3,
  },
  {
    title: "Network Anomaly & Threat Detection Engine",
    description: "High-throughput packet analysis engine designed for real-time network anomaly detection, traffic profiling, signature-based security monitoring, and cyber threat mitigation.",
    tags: ["Java", "Network Security", "Multi-Threading", "Packet Analysis"],
    demo: null,
    link: "https://github.com/Rnrezanur/Multithreated-network-anomaly-and-threat-detection-engine",
    pinned: true,
    order: 4,
  },
  {
    title: "IntelliEco Smart Eco-System Management Platform",
    description: "A web app concept for monitoring and managing eco-friendly systems with smart data tracking, environmental sensor metrics, and resource sustainability analytics.",
    tags: ["JavaScript", "IoT Analytics", "Dashboard", "Full Stack"],
    demo: null,
    link: "https://github.com/Rnrezanur/intellieco-eco-system",
    pinned: true,
    order: 5,
  },

  // --- ALL PROJECTS / STANDARD PORTFOLIO (6-14) ---
  {
    title: "Rezanur Pay",
    description: "Modern fintech payment interface and checkout concept with transaction flows, interactive card validation, and sleek mobile-first design.",
    tags: ["HTML5", "CSS3", "JavaScript", "Fintech UI"],
    demo: "https://rezanur-pay.vercel.app/",
    link: "https://github.com/Rnrezanur/rezanur-pay",
    pinned: false,
    order: 6,
  },
  {
    title: "Job Tracker",
    description: "Interactive career job application tracking board with stage metrics (Applied, Interview, Offer, Rejected), notes logging, and dark-themed interface.",
    tags: ["JavaScript", "Productivity", "LocalStorage", "Dark Theme"],
    demo: null,
    link: "https://github.com/Rnrezanur/job-tracker",
    pinned: false,
    order: 7,
  },
  {
    title: "Funky Flowers Market",
    description: "Interactive e-commerce florist shop template with animated bouquet showcases, catalog filtering, and modern responsive visual presentation.",
    tags: ["HTML5", "CSS3", "JavaScript", "E-commerce UI"],
    demo: "https://funky-flowers-market.vercel.app",
    link: "https://github.com/Rnrezanur/flowers-market",
    pinned: false,
    order: 8,
  },
  {
    title: "Simple Fashion UI",
    description: "A responsive fashion landing page focused on clean layout, stylish presentation, and modern visual typography.",
    tags: ["HTML5", "Tailwind CSS", "Responsive Design"],
    demo: "https://simple-fashion.vercel.app",
    link: "https://github.com/Rnrezanur/simple-fashion",
    pinned: false,
    order: 9,
  },
  {
    title: "Influencer Gear",
    description: "Responsive digital creator equipment review and showcase landing page designed to present creator gear setups cleanly.",
    tags: ["HTML5", "CSS3", "E-Commerce UI"],
    demo: "https://influencer-gear-hazel.vercel.app/",
    link: "https://github.com/Rnrezanur/influencer-gear",
    pinned: false,
    order: 10,
  },
  {
    title: "Esports Gaming Tournament Hub",
    description: "Esports tournament hub concept featuring dynamic match bracket rendering, tournament schedules, and competitor team profiles.",
    tags: ["HTML5", "CSS3", "JavaScript", "Gaming UI"],
    demo: null,
    link: "https://github.com/Rnrezanur/gaming-tournament",
    pinned: false,
    order: 11,
  },
  {
    title: "TypeScript Problem Solving & DSA",
    description: "Curated collection of algorithms, data structure implementations, and competitive coding problem solutions written in modern TypeScript.",
    tags: ["TypeScript", "Algorithms", "Data Structures", "Problem Solving"],
    demo: null,
    link: "https://github.com/Rnrezanur/typescript-problem-solving",
    pinned: false,
    order: 12,
  },
  {
    title: "Rock-Paper-Scissors Interactive Game",
    description: "Interactive graphical Python game implementation featuring score counters, animated gameplay feedback, and clean state logic.",
    tags: ["Python", "Game Logic", "UI Development"],
    demo: null,
    link: "https://github.com/Rnrezanur/rock-paper-scissors",
    pinned: false,
    order: 13,
  },
  {
    title: "Frontend Logic & Experiments (Simple Java P1)",
    description: "Interactive frontend coding experiments focusing on DOM manipulation techniques, state handling, and interactive UI logic.",
    tags: ["JavaScript", "DOM API", "Frontend Logic"],
    demo: null,
    link: "https://github.com/Rnrezanur/simple-java-p1",
    pinned: false,
    order: 14,
  },
];

const seeMoreBtn = document.getElementById("seeMoreBtn");
const featuredPagination = document.getElementById("featuredPagination");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const featuredPageNumber = document.getElementById("featuredPageNumber");

let showAllFeatured = false;
let featuredPage = 1;
const FEATURE_LIMIT = 4;
const FEATURE_PER_PAGE = 4;

const projectsPerPage = 4;
let currentPage = 1;

const container = document.getElementById("project-container");
const featuredContainer = document.getElementById("featured-container");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderTags(tags = []) {
  return tags.map((tag) => `<span>${tag}</span>`).join("");
}

function createActionButton(label, href, type) {
  if (!href) {
    return "";
  }

  return `
    <a href="${href}" target="_blank" class="project-btn ${type}">
      ${label}
    </a>
  `;
}

function createCard(project) {
  return `
    <article class="project-card scroll-sequence-item">
      ${project.image ? `<div class="project-card-image"><img src="${project.image}" alt="${project.title}" loading="lazy" /></div>` : ""}
      <div class="project-tags">
        ${renderTags(project.tags)}
      </div>

      <h3 class="project-title">${project.title}</h3>

      <p class="project-desc">
        ${project.description}
      </p>

      <div class="project-actions">
        ${createActionButton("Live Demo", project.demo, "primary")}
        ${createActionButton("GitHub", project.link, "secondary")}
      </div>
    </article>
  `;
}

function displayFeatured() {
  if (!featuredContainer) {
    return;
  }

  featuredContainer.innerHTML = "";
  const featuredProjects = projects.filter((project) => project.pinned);

  if (featuredProjects.length === 0) {
    const featuredSection = document.getElementById("featured-section");
    if (featuredSection) {
      featuredSection.style.display = "none";
    }
    return;
  }

  if (featuredProjects.length > FEATURE_LIMIT) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }

  if (!showAllFeatured) {
    featuredProjects.slice(0, FEATURE_LIMIT).forEach((project) => {
      featuredContainer.innerHTML += createCard(project);
    });

    featuredPagination.classList.add("hidden");
  } else {
    const start = (featuredPage - 1) * FEATURE_PER_PAGE;
    const end = start + FEATURE_PER_PAGE;

    featuredProjects.slice(start, end).forEach((project) => {
      featuredContainer.innerHTML += createCard(project);
    });

    const totalPages = Math.ceil(featuredProjects.length / FEATURE_PER_PAGE);
    featuredPageNumber.textContent = `Page ${featuredPage} of ${totalPages}`;
    featuredPrev.disabled = featuredPage === 1;
    featuredNext.disabled = featuredPage === totalPages;
    featuredPagination.classList.remove("hidden");
  }

  prepareScrollSequences(featuredContainer.parentElement ?? document);
  if (seeMoreBtn) {
    seeMoreBtn.innerHTML = showAllFeatured
      ? '<span>Collapse Featured</span> <i class="fa-solid fa-chevron-up"></i>'
      : '<span>Explore Featured</span> <i class="fa-solid fa-arrow-right"></i>';
  }
}

function displayProjects() {
  if (!container) {
    return;
  }

  container.classList.remove("opacity-100");
  container.classList.add("opacity-0");

  setTimeout(() => {
    container.innerHTML = "";

    const nonPinned = projects.filter((project) => !project.pinned);
    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;

    nonPinned.slice(start, end).forEach((project) => {
      container.innerHTML += createCard(project);
    });

    const totalPages = Math.max(1, Math.ceil(nonPinned.length / projectsPerPage));
    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    Array.from(container.children).forEach((child, index) => {
      child.style.setProperty("--reveal-delay", `${index * 110}ms`);
      child.classList.add("show");
      child.classList.remove("reveal-soft-left", "reveal-soft-right", "reveal-soft-up");
      if (index === 0) {
        child.classList.add("reveal-soft-up");
      } else if (index % 2 === 0) {
        child.classList.add("reveal-soft-right");
      } else {
        child.classList.add("reveal-soft-left");
      }
    });

    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");
  }, 220);
}

featuredPrev?.addEventListener("click", () => {
  if (featuredPage > 1) {
    featuredPage -= 1;
    displayFeatured();
  }
});

featuredNext?.addEventListener("click", () => {
  const featuredProjects = projects.filter((project) => project.pinned);
  const totalPages = Math.ceil(featuredProjects.length / FEATURE_PER_PAGE);

  if (featuredPage < totalPages) {
    featuredPage += 1;
    displayFeatured();
  }
});

prevBtn?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    displayProjects();
  }
});

nextBtn?.addEventListener("click", () => {
  const nonPinned = projects.filter((project) => !project.pinned);
  const totalPages = Math.max(1, Math.ceil(nonPinned.length / projectsPerPage));

  if (currentPage < totalPages) {
    currentPage += 1;
    displayProjects();
  }
});

seeMoreBtn?.addEventListener("click", () => {
  showAllFeatured = !showAllFeatured;
  featuredPage = 1;
  displayFeatured();
});

displayFeatured();
displayProjects();

// Dynamic Firebase Firestore Integration (with offline fallback)
async function initDynamicPortfolio() {
  if (typeof db === "undefined" || !db) {
    return;
  }

  // 1. Fetch Projects from Firestore
  try {
    const projectsSnapshot = await db.collection("projects").get();
    if (!projectsSnapshot.empty) {
      const remoteProjects = [];
      const seenTitles = new Set();
      projectsSnapshot.forEach((doc) => {
        const data = doc.data();
        const normTitle = (data.title || "").toLowerCase().trim();
        if (normTitle && seenTitles.has(normTitle)) {
          return;
        }
        if (normTitle) seenTitles.add(normTitle);
        remoteProjects.push({ id: doc.id, ...data });
      });
      // Sort by order ascending
      remoteProjects.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      projects = remoteProjects;
      featuredPage = 1;
      currentPage = 1;
      displayFeatured();
      displayProjects();
    }
  } catch (err) {
    console.warn("Firestore projects unavailable, using static fallback:", err);
  }

  // 2. Fetch Skills from Firestore
  try {
    const skillsSnapshot = await db.collection("skills").get();
    if (!skillsSnapshot.empty) {
      const skillsContainer = document.querySelector(".skills-groups");
      if (skillsContainer) {
        const categories = ["Languages", "Frontend", "Backend", "Databases", "Tools"];
        const grouped = {};
        categories.forEach((c) => (grouped[c] = []));

        skillsSnapshot.forEach((doc) => {
          const item = doc.data();
          const cat = item.category || "Tools";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        });

        let html = "";
        for (const [cat, items] of Object.entries(grouped)) {
          if (items.length === 0) continue;
          const badges = items
            .map(
              (s) =>
                `<span class="skill-badge"><i class="${s.icon || "fa-solid fa-code"}"></i>${s.name}</span>`
            )
            .join("");
          html += `
            <div class="skills-group">
              <h3 class="skills-group-title">${cat}</h3>
              <div class="skills-badges">
                ${badges}
              </div>
            </div>
          `;
        }
        if (html) {
          skillsContainer.innerHTML = html;
        }
      }
    }
  } catch (err) {
    console.warn("Firestore skills unavailable, using static fallback:", err);
  }

  // 3. Fetch Education from Firestore
  try {
    const eduSnapshot = await db.collection("education").get();
    if (!eduSnapshot.empty) {
      const eduContainer = document.getElementById("education-timeline");
      if (eduContainer) {
        const eduList = [];
        eduSnapshot.forEach((doc) => {
          eduList.push({ id: doc.id, ...doc.data() });
        });
        eduList.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

        eduContainer.innerHTML = eduList
          .map(
            (edu) => `
            <div class="timeline-block">
              <div class="timeline-dot ${edu.isActive ? "is-active" : ""}"></div>
              <div class="timeline-content">
                <p class="timeline-period">${edu.period || ""}</p>
                <div class="timeline-entry">
                  <h3 class="timeline-role">${edu.role || ""}</h3>
                  <p class="timeline-meta">${edu.meta || ""}</p>
                  ${edu.note ? `<p class="timeline-note">${edu.note}</p>` : ""}
                </div>
              </div>
            </div>
          `
          )
          .join("");
      }
    }
  } catch (err) {
    console.warn("Firestore education unavailable, using static fallback:", err);
  }

  // 4. Fetch Experience from Firestore
  try {
    const expSnapshot = await db.collection("experience").get();
    if (!expSnapshot.empty) {
      const expContainer = document.getElementById("experience-timeline");
      if (expContainer) {
        const expList = [];
        expSnapshot.forEach((doc) => {
          expList.push({ id: doc.id, ...doc.data() });
        });
        expList.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

        expContainer.innerHTML = expList
          .map(
            (exp) => `
            <div class="timeline-block">
              <div class="timeline-dot ${exp.isActive ? "is-active" : ""}"></div>
              <div class="timeline-content">
                <p class="timeline-period">${exp.period || ""}</p>
                <div class="timeline-entry">
                  <h3 class="timeline-role">${exp.role || ""}</h3>
                  <p class="timeline-meta">
                    ${
                      exp.link
                        ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer">${exp.company}</a>`
                        : exp.company || ""
                    }
                  </p>
                  ${
                    exp.points && exp.points.length
                      ? `<ul class="timeline-points">${exp.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `
          )
          .join("");
      }
    }
  } catch (err) {
    console.warn("Firestore experience unavailable, using static fallback:", err);
  }

  // 5. Fetch Quick Info & CV from Firestore
  try {
    const profileDoc = await db.collection("settings").doc("profile").get();
    if (profileDoc.exists) {
      const data = profileDoc.data();
      if (data.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach((el) => {
          el.setAttribute("href", `mailto:${data.email}`);
        });
        document.querySelectorAll(".profile-email").forEach((el) => {
          el.textContent = data.email;
        });
      }
      if (data.cvDataUrl) {
        const downloadCvBtn = document.getElementById("downloadCvBtn");
        if (downloadCvBtn) {
          downloadCvBtn.setAttribute("href", data.cvDataUrl);
          downloadCvBtn.setAttribute("download", data.cvFileName || "Md_Rezanur_Bin_Shamim_CV.pdf");
        }
      } else if (data.resume) {
        const downloadCvBtn = document.getElementById("downloadCvBtn");
        if (downloadCvBtn) {
          downloadCvBtn.setAttribute("href", data.resume);
        }
      }
    }
  } catch (err) {
    console.warn("Firestore settings unavailable, using static fallback:", err);
  }
}

// Initialize dynamic data once DOM is ready
window.addEventListener("DOMContentLoaded", initDynamicPortfolio);
