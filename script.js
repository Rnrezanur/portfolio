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
const sectionIds = ["home", "about", "skills", "experience", "projects", "achievements", "education", "contact"];
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
}

menuToggle?.addEventListener("click", () => toggleMenu(true));
menuClose?.addEventListener("click", () => toggleMenu(false));
menuOverlay?.addEventListener("click", () => toggleMenu(false));
sideMenuLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

const projects = [
  {
    title: "IntelliEco Smart Eco-System Management Platform",
    description: "A web app concept for monitoring and managing eco-friendly systems with smart data tracking.",
    demo: null,
    link: "https://github.com/Rnrezanur/intellieco-eco-system",
    pinned: true,
    tags: ["JavaScript", "Full Stack", "Dashboard"],
  },
  {
    title: "Simple Fashion UI",
    description: "A responsive fashion landing page focused on clean layout, stylish presentation, and modern visuals.",
    demo: "https://simple-fashion.vercel.app",
    link: "https://github.com/Rnrezanur/simple-fashion",
    pinned: false,
    tags: ["HTML", "Tailwind", "Responsive"],
  },
  {
    title: "Influencer Gear",
    description: "A responsive e-commerce showcase page designed to present products with a simple and polished layout.",
    demo: "https://influencer-gear-hazel.vercel.app/",
    link: "",
    pinned: false,
    tags: ["HTML", "CSS", "E-commerce UI"],
  },
  {
    title: "Rock-Paper-Scissors",
    description: "An interactive game project with a graphical interface and clear user feedback.",
    demo: null,
    link: "https://github.com/Rnrezanur/rock-paper-scissors",
    pinned: false,
    tags: ["Python", "GUI", "Logic"],
  },
];

const seeMoreBtn = document.getElementById("seeMoreBtn");
const featuredPagination = document.getElementById("featuredPagination");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const featuredPageNumber = document.getElementById("featuredPageNumber");

let showAllFeatured = false;
let featuredPage = 1;
const FEATURE_LIMIT = 2;
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
  seeMoreBtn.textContent = showAllFeatured ? "Collapse Featured" : "Explore Featured";
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
