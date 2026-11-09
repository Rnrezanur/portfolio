// Admin Dashboard Logic for Rezanur Portfolio
(function () {
  "use strict";

  // Elements
  const authLoading = document.getElementById("authLoading");
  const loginSection = document.getElementById("loginSection");
  const dashboardSection = document.getElementById("dashboardSection");
  const authForm = document.getElementById("authForm");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authAlert = document.getElementById("authAlert");
  const authSubmitText = document.getElementById("authSubmitText");
  const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
  const userEmailBadge = document.getElementById("userEmailBadge");
  const logoutBtn = document.getElementById("logoutBtn");
  const toastContainer = document.getElementById("toastContainer");

  // Tab elements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Projects elements
  const projectsGrid = document.getElementById("projectsGrid");
  const projectsEmptyState = document.getElementById("projectsEmptyState");
  const projectSearchInput = document.getElementById("projectSearchInput");
  const projectFilterPinned = document.getElementById("projectFilterPinned");
  const openAddProjectModalBtn = document.getElementById("openAddProjectModalBtn");
  const importDefaultsBtn = document.getElementById("importDefaultsBtn");
  const openGithubModalBtn = document.getElementById("openGithubModalBtn");
  const githubModal = document.getElementById("githubModal");
  const closeGithubModalBtn = document.getElementById("closeGithubModalBtn");
  const closeGithubModalFooterBtn = document.getElementById("closeGithubModalFooterBtn");
  const githubReposList = document.getElementById("githubReposList");
  const githubSearchInput = document.getElementById("githubSearchInput");
  const refreshGithubBtn = document.getElementById("refreshGithubBtn");
  const importAllGithubBtn = document.getElementById("importAllGithubBtn");
  const githubReposCount = document.getElementById("githubReposCount");
  const quickGithubRepoBtn = document.getElementById("quickGithubRepoBtn");
  const projectModal = document.getElementById("projectModal");
  const closeProjectModalBtn = document.getElementById("closeProjectModalBtn");
  const cancelProjectModalBtn = document.getElementById("cancelProjectModalBtn");
  const projectForm = document.getElementById("projectForm");
  const modalTitle = document.getElementById("modalTitle");
  const projectId = document.getElementById("projectId");
  const projectTitle = document.getElementById("projectTitle");
  const projectDescription = document.getElementById("projectDescription");
  const projectTags = document.getElementById("projectTags");
  const projectDemo = document.getElementById("projectDemo");
  const projectLink = document.getElementById("projectLink");
  const projectImage = document.getElementById("projectImage");
  const projectImageFile = document.getElementById("projectImageFile");
  const imagePreview = document.getElementById("imagePreview");
  const imagePreviewContainer = document.getElementById("imagePreviewContainer");
  const projectPinned = document.getElementById("projectPinned");
  const projectOrder = document.getElementById("projectOrder");

  // Education elements
  const educationGrid = document.getElementById("educationGrid");
  const openAddEducationModalBtn = document.getElementById("openAddEducationModalBtn");
  const importEducationDefaultsBtn = document.getElementById("importEducationDefaultsBtn");
  const educationModal = document.getElementById("educationModal");
  const closeEducationModalBtn = document.getElementById("closeEducationModalBtn");
  const cancelEducationModalBtn = document.getElementById("cancelEducationModalBtn");
  const educationForm = document.getElementById("educationForm");
  const educationModalTitle = document.getElementById("educationModalTitle");
  const educationId = document.getElementById("educationId");
  const educationRole = document.getElementById("educationRole");
  const educationMeta = document.getElementById("educationMeta");
  const educationPeriod = document.getElementById("educationPeriod");
  const educationNote = document.getElementById("educationNote");
  const educationActive = document.getElementById("educationActive");
  const educationOrder = document.getElementById("educationOrder");

  // Experience elements
  const experienceList = document.getElementById("experienceList");
  const openAddExperienceBtn = document.getElementById("openAddExperienceBtn");
  const importExperienceDefaultsBtn = document.getElementById("importExperienceDefaultsBtn");
  const experienceModal = document.getElementById("experienceModal");
  const closeExperienceModalBtn = document.getElementById("closeExperienceModalBtn");
  const cancelExperienceModalBtn = document.getElementById("cancelExperienceModalBtn");
  const experienceForm = document.getElementById("experienceForm");
  const experienceModalTitle = document.getElementById("experienceModalTitle");
  const experienceId = document.getElementById("experienceId");
  const expRole = document.getElementById("expRole");
  const expCompany = document.getElementById("expCompany");
  const expPeriod = document.getElementById("expPeriod");
  const expLink = document.getElementById("expLink");
  const expPoints = document.getElementById("expPoints");
  const expActive = document.getElementById("expActive");
  const expOrder = document.getElementById("expOrder");

  // Skills elements
  const skillsContainer = document.getElementById("skillsContainer");
  const openAddSkillModalBtn = document.getElementById("openAddSkillModalBtn");
  const importSkillsDefaultsBtn = document.getElementById("importSkillsDefaultsBtn");
  const skillModal = document.getElementById("skillModal");
  const closeSkillModalBtn = document.getElementById("closeSkillModalBtn");
  const cancelSkillModalBtn = document.getElementById("cancelSkillModalBtn");
  const skillForm = document.getElementById("skillForm");
  const skillCategory = document.getElementById("skillCategory");
  const skillName = document.getElementById("skillName");
  const skillIcon = document.getElementById("skillIcon");

  // Quick Info & CV elements
  const quickInfoForm = document.getElementById("quickInfoForm");
  const infoStatus = document.getElementById("infoStatus");
  const infoRole = document.getElementById("infoRole");
  const infoEmail = document.getElementById("infoEmail");
  const infoResume = document.getElementById("infoResume");
  const cvFileInput = document.getElementById("cvFileInput");
  const cvFileSize = document.getElementById("cvFileSize");
  const cvCurrentStatus = document.getElementById("cvCurrentStatus");
  const cvPreviewRow = document.getElementById("cvPreviewRow");
  const cvPreviewLink = document.getElementById("cvPreviewLink");
  const resetCvBtn = document.getElementById("resetCvBtn");

  // State
  let allProjects = [];
  let allEducation = [];
  let allExperience = [];
  let allSkills = [];
  let githubRepos = [];
  let isFetchingGithub = false;
  let pendingCvBase64 = null;
  let pendingCvName = null;

  // ================= DEFAULT DATA (Pre-populates database) =================
  const defaultProjects = [
    {
      title: "IntelliEco Smart Eco-System Management Platform",
      description: "A web app concept for monitoring and managing eco-friendly systems with smart data tracking.",
      demo: "",
      link: "https://github.com/Rnrezanur/intellieco-eco-system",
      pinned: true,
      tags: ["JavaScript", "Full Stack", "Dashboard"],
      order: 1,
    },
    {
      title: "TaskGram",
      description: "TaskGram is a Telegram-based task manager that sends automated reminders for scheduled tasks.",
      demo: "https://task-gram-one.vercel.app",
      link: "https://github.com/Rnrezanur/TaskGram",
      pinned: true,
      tags: ["Automated Reminders", "TypeScript", "Telegram Bot", "PLpgSQL"],
      order: 2,
    },
    {
      title: "Simple Fashion UI",
      description: "A responsive fashion landing page focused on clean layout, stylish presentation, and modern visuals.",
      demo: "https://simple-fashion.vercel.app",
      link: "https://github.com/Rnrezanur/simple-fashion",
      pinned: false,
      tags: ["HTML", "Tailwind", "Responsive"],
      order: 3,
    },
    {
      title: "Influencer Gear",
      description: "A responsive e-commerce showcase page designed to present products with a simple and polished layout.",
      demo: "https://influencer-gear-hazel.vercel.app/",
      link: "",
      pinned: false,
      tags: ["HTML", "CSS", "E-commerce UI"],
      order: 4,
    },
    {
      title: "Rock-Paper-Scissors",
      description: "An interactive game project with a graphical interface and clear user feedback.",
      demo: "",
      link: "https://github.com/Rnrezanur/rock-paper-scissors",
      pinned: false,
      tags: ["Python", "GUI", "Logic"],
      order: 5,
    },
  ];

  const defaultEducation = [
    {
      role: "Green University of Bangladesh",
      meta: "BSc in Computer Science and Engineering",
      period: "Feb 2022 - Running",
      note: "Ongoing",
      isActive: true,
      order: 1,
    },
    {
      role: "Shahid Bulbul Government College",
      meta: "Science",
      period: "2018 - 2019",
      note: "GPA 5.00",
      isActive: false,
      order: 2,
    },
    {
      role: "Pabna Collectorate Public School and College",
      meta: "Science",
      period: "2016 - 2017",
      note: "GPA 5.00",
      isActive: false,
      order: 3,
    },
  ];

  const defaultExperience = [
    {
      role: "Junior Backend Engineer Intern",
      company: "9 AM Solution",
      period: "Feb 2026 - Present",
      link: "https://www.9amsolution.com/",
      points: [
        "Assisted in backend development tasks and API integration",
        "Worked with databases and server-side logic",
        "Collaborated with the development team on real-world projects",
        "Learned practical workflow and software engineering practices",
      ],
      isActive: true,
      order: 1,
    },
    {
      role: "Esports Secretary - GUCC Virtual Gaming Society",
      company: "Green University of Bangladesh",
      period: "June 2024 - Nov 2025",
      link: "https://gucc.green.edu.bd/executives/2024",
      points: [
        "Organized and managed 5+ esports tournaments with 400+ participants",
        "Coordinated with teams, sponsors, and volunteers",
        "Developed event materials and basic web-based systems",
        "Strengthened leadership and communication skills",
      ],
      isActive: false,
      order: 2,
    },
    {
      role: "Content Creator / Streamer",
      company: "YouTube, Facebook & Instagram",
      period: "2021 - Present",
      link: "https://www.youtube.com/@FunkyFighter",
      points: [
        "Built a combined audience of 60K+ across Facebook, YouTube & Instagram",
        "Managed live streams, gaming content, and audience engagement",
        "Maintained consistency in content creation, personal branding, and community growth",
      ],
      isActive: false,
      order: 3,
    },
  ];

  const defaultSkills = [
    { name: "C++", category: "Languages", icon: "fa-solid fa-code" },
    { name: "C", category: "Languages", icon: "fa-solid fa-code" },
    { name: "Java", category: "Languages", icon: "fa-brands fa-java" },
    { name: "Python", category: "Languages", icon: "fa-brands fa-python" },
    { name: "JavaScript", category: "Languages", icon: "fa-brands fa-js" },
    { name: "TypeScript", category: "Languages", icon: "fa-solid fa-file-code" },
    { name: "PHP", category: "Languages", icon: "fa-brands fa-php" },
    { name: "HTML5", category: "Frontend", icon: "fa-brands fa-html5" },
    { name: "CSS3", category: "Frontend", icon: "fa-brands fa-css3-alt" },
    { name: "Tailwind CSS", category: "Frontend", icon: "fa-solid fa-wind" },
    { name: "React", category: "Frontend", icon: "fa-brands fa-react" },
    { name: "Next.js", category: "Frontend", icon: "fa-solid fa-n" },
    { name: "Node.js", category: "Backend", icon: "fa-brands fa-node-js" },
    { name: "Express.js", category: "Backend", icon: "fa-solid fa-server" },
    { name: "NestJS", category: "Backend", icon: "fa-solid fa-layer-group" },
    { name: "PostgreSQL", category: "Databases", icon: "fa-solid fa-database" },
    { name: "MongoDB", category: "Databases", icon: "fa-solid fa-leaf" },
    { name: "MySQL", category: "Databases", icon: "fa-solid fa-database" },
    { name: "Git & GitHub", category: "Tools", icon: "fa-brands fa-git-alt" },
    { name: "Docker", category: "Tools", icon: "fa-brands fa-docker" },
  ];

  // Toast Notification
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `p-3 rounded-lg text-xs font-mono-code shadow-lg flex items-center gap-2 pointer-events-auto border transition-all duration-300 transform translate-y-2 opacity-0 ${
      type === "success"
        ? "bg-[#1c2e24] text-[#2ce98a] border-[#2ce98a]/30"
        : type === "error"
        ? "bg-[#351a1a] text-red-400 border-red-500/30"
        : "bg-[#252525] text-white border-white/20"
    }`;
    const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    });

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Auth State Listener
  auth.onAuthStateChanged(async (user) => {
    authLoading.classList.add("hidden");
    if (user) {
      loginSection.classList.add("hidden");
      dashboardSection.classList.remove("hidden");
      userEmailBadge.textContent = user.email;

      // Auto-load and auto-seed all sections if empty
      await Promise.all([
        loadProjects(),
        loadEducation(),
        loadExperience(),
        loadSkills(),
        loadQuickInfo(),
      ]);
    } else {
      dashboardSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    }
  });

  // Auth Form Submit (Sign In Only)
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = authEmail.value.trim();
    const password = authPassword.value;

    authAlert.classList.add("hidden");
    authSubmitText.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Signing In...';

    try {
      await auth.signInWithEmailAndPassword(email, password);
      showToast("Signed in successfully!", "success");
    } catch (err) {
      authAlert.textContent = err.message;
      authAlert.className = "mb-4 p-3 rounded-lg text-xs font-mono-code border bg-red-950/40 text-red-400 border-red-500/30";
      authAlert.classList.remove("hidden");
    } finally {
      authSubmitText.textContent = "Sign In to Dashboard";
    }
  });

  // Forgot Password
  forgotPasswordBtn.addEventListener("click", async () => {
    const email = authEmail.value.trim();
    if (!email) {
      alert("Please enter your email address in the email field first.");
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      showToast(`Password reset link sent to ${email}`, "info");
    } catch (err) {
      alert(`Error sending reset email: ${err.message}`);
    }
  });

  // Logout
  logoutBtn.addEventListener("click", async () => {
    await auth.signOut();
    showToast("Logged out successfully.", "info");
  });

  // Tab Switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("text-[#9d9da5]");
      });
      btn.classList.add("active");
      btn.classList.remove("text-[#9d9da5]");

      tabContents.forEach((c) => {
        c.classList.add("hidden");
      });
      document.getElementById(`tab-${tabId}`).classList.remove("hidden");
    });
  });

  // =============================================================
  // 1. PROJECTS MANAGEMENT
  // =============================================================
  async function loadProjects() {
    projectsGrid.innerHTML = `
      <div class="col-span-full py-12 text-center text-[#9d9da5] font-mono-code text-xs">
        <i class="fa-solid fa-spinner animate-spin text-lg text-[#2ce98a] mb-2"></i>
        <p>Loading projects...</p>
      </div>
    `;

    try {
      const snapshot = await db.collection("projects").get();

      // AUTO-SEED if database is empty!
      if (snapshot.empty) {
        console.log("No projects found in Firestore. Auto-seeding default portfolio projects...");
        await seedDefaultProjects(false);
        return;
      }

      allProjects = [];
      const seenTitles = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const normTitle = (data.title || "").toLowerCase().trim();
        // Prevent duplicate cards from rendering if DB has duplicates
        if (normTitle && seenTitles.has(normTitle)) {
          return;
        }
        if (normTitle) seenTitles.add(normTitle);
        allProjects.push({ id: doc.id, ...data });
      });

      allProjects.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      renderProjects();
    } catch (err) {
      console.error("Error loading projects:", err);
      projectsGrid.innerHTML = `<div class="col-span-full text-red-400 text-xs p-4">Error loading projects: ${err.message}</div>`;
    }
  }

  async function seedDefaultProjects(showToastAlert = true) {
    try {
      // Deduplicate: Only add default projects that don't already exist in the database
      const existingTitles = new Set(allProjects.map((p) => (p.title || "").toLowerCase().trim()));
      const toAdd = defaultProjects.filter((p) => !existingTitles.has((p.title || "").toLowerCase().trim()));

      if (toAdd.length === 0) {
        if (showToastAlert) showToast("All default projects are already present!", "info");
        return;
      }

      const batch = db.batch();
      toAdd.forEach((proj) => {
        const docRef = db.collection("projects").doc();
        batch.set(docRef, {
          ...proj,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
      if (showToastAlert) showToast(`Added ${toAdd.length} default project(s)!`, "success");

      await loadProjects();
    } catch (err) {
      console.error("Error auto-seeding projects:", err);
    }
  }

  function renderProjects() {
    const searchTerm = projectSearchInput.value.toLowerCase().trim();
    const filter = projectFilterPinned.value;

    const filtered = allProjects.filter((p) => {
      const matchesSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchTerm))) ||
        (p.description && p.description.toLowerCase().includes(searchTerm));

      const matchesFilter =
        filter === "all" ||
        (filter === "pinned" && p.pinned) ||
        (filter === "unpinned" && !p.pinned);

      return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = "";
      projectsEmptyState.classList.remove("hidden");
      return;
    }

    projectsEmptyState.classList.add("hidden");
    projectsGrid.innerHTML = filtered
      .map((p) => {
        const tagsHtml = (p.tags || [])
          .map(
            (tag) =>
              `<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/10 text-[#9d9da5]">${tag}</span>`
          )
          .join("");

        return `
          <div class="panel rounded-xl p-5 flex flex-col justify-between group hover:border-[#2ce98a]/40 transition-all">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2 flex-wrap">
                  ${
                    p.pinned
                      ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#2ce98a]/15 text-[#2ce98a] border border-[#2ce98a]/30"><i class="fa-solid fa-star text-[9px] mr-1"></i>Featured</span>'
                      : '<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-[#9d9da5] border border-white/10">Standard</span>'
                  }
                  <span class="text-[10px] font-mono-code text-[#9d9da5]">Order: ${p.order ?? 0}</span>
                </div>
                <div class="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                  <button onclick="window.editProject('${p.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-[#2ce98a] flex items-center justify-center text-xs" title="Edit Project">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onclick="window.deleteProject('${p.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-red-400 hover:border-red-500/40 flex items-center justify-center text-xs" title="Delete Project">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              ${
                p.image
                  ? `<div class="h-32 w-full rounded-lg overflow-hidden border border-[var(--line)] bg-black/40"><img src="${p.image}" class="w-full h-full object-cover" alt="${p.title}" onerror="this.style.display='none'" /></div>`
                  : ""
              }

              <h4 class="font-syne font-bold text-base leading-snug group-hover:text-[#2ce98a] transition-colors">${p.title}</h4>
              <p class="text-xs text-[#9d9da5] line-clamp-3 leading-relaxed">${p.description || "No description provided."}</p>

              <div class="flex flex-wrap gap-1.5 pt-1">
                ${tagsHtml}
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-code">
              <div class="flex items-center gap-3">
                ${
                  p.demo
                    ? `<a href="${p.demo}" target="_blank" class="text-[#2ce98a] hover:underline flex items-center gap-1"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Live</a>`
                    : '<span class="text-[#9d9da5]/50">No demo</span>'
                }
                ${
                  p.link
                    ? `<a href="${p.link}" target="_blank" class="text-white hover:text-[#2ce98a] flex items-center gap-1"><i class="fa-brands fa-github text-[11px]"></i> Code</a>`
                    : '<span class="text-[#9d9da5]/50">No repo</span>'
                }
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  projectSearchInput.addEventListener("input", renderProjects);
  projectFilterPinned.addEventListener("change", renderProjects);

  openAddProjectModalBtn.addEventListener("click", () => {
    projectForm.reset();
    projectId.value = "";
    modalTitle.textContent = "Add New Project";
    imagePreview.src = "";
    imagePreviewContainer.classList.add("hidden");
    projectOrder.value = allProjects.length + 1;
    projectModal.classList.remove("hidden");
  });

  function closeProjectModal() {
    projectModal.classList.add("hidden");
  }

  closeProjectModalBtn.addEventListener("click", closeProjectModal);
  cancelProjectModalBtn.addEventListener("click", closeProjectModal);

  projectImageFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);

        projectImage.value = dataUrl;
        imagePreview.src = dataUrl;
        imagePreviewContainer.classList.remove("hidden");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  projectImage.addEventListener("input", () => {
    if (projectImage.value.trim()) {
      imagePreview.src = projectImage.value.trim();
      imagePreviewContainer.classList.remove("hidden");
    } else {
      imagePreviewContainer.classList.add("hidden");
    }
  });

  projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = projectId.value;

    const tagsArray = projectTags.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const data = {
      title: projectTitle.value.trim(),
      description: projectDescription.value.trim(),
      tags: tagsArray,
      demo: projectDemo.value.trim() || null,
      link: projectLink.value.trim() || "",
      image: projectImage.value.trim() || null,
      pinned: projectPinned.checked,
      order: Number(projectOrder.value) || 0,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const submitBtn = document.getElementById("saveProjectBtn");
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Saving...';
    submitBtn.disabled = true;

    try {
      if (id) {
        await db.collection("projects").doc(id).update(data);
        showToast("Project updated successfully!", "success");
      } else {
        // Prevent accidental duplicate project entry
        const isDuplicate = allProjects.some(
          (p) => (p.title || "").toLowerCase().trim() === data.title.toLowerCase().trim()
        );
        if (isDuplicate) {
          alert(`A project with the title "${data.title}" already exists. Please choose a different title or edit the existing one.`);
          submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Save Project</span>';
          submitBtn.disabled = false;
          return;
        }

        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("projects").add(data);
        showToast("Project added to portfolio!", "success");
      }
      closeProjectModal();
      await loadProjects();
    } catch (err) {
      console.error(err);
      alert(`Error saving project: ${err.message}`);
    } finally {
      submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Save Project</span>';
      submitBtn.disabled = false;
    }
  });

  window.editProject = function (id) {
    const project = allProjects.find((p) => p.id === id);
    if (!project) return;

    projectId.value = project.id;
    projectTitle.value = project.title || "";
    projectDescription.value = project.description || "";
    projectTags.value = (project.tags || []).join(", ");
    projectDemo.value = project.demo || "";
    projectLink.value = project.link || "";
    projectImage.value = project.image || "";
    projectPinned.checked = Boolean(project.pinned);
    projectOrder.value = project.order ?? 0;

    if (project.image) {
      imagePreview.src = project.image;
      imagePreviewContainer.classList.remove("hidden");
    } else {
      imagePreviewContainer.classList.add("hidden");
    }

    modalTitle.textContent = "Edit Project";
    projectModal.classList.remove("hidden");
  };

  window.deleteProject = async function (id) {
    const project = allProjects.find((p) => p.id === id);
    const title = project ? project.title : "this project";
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await db.collection("projects").doc(id).delete();
      showToast("Project deleted.", "info");
      await loadProjects();
    } catch (err) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  importDefaultsBtn.addEventListener("click", () => seedDefaultProjects(true));

  // =============================================================
  // GITHUB REPOSITORIES IMPORT SYSTEM
  // =============================================================
  function openGithubModal() {
    githubModal.classList.remove("hidden");
    if (githubRepos.length === 0) {
      fetchGithubRepos();
    } else {
      renderGithubRepos();
    }
  }

  function closeGithubModal() {
    githubModal.classList.add("hidden");
  }

  openGithubModalBtn?.addEventListener("click", openGithubModal);
  closeGithubModalBtn?.addEventListener("click", closeGithubModal);
  closeGithubModalFooterBtn?.addEventListener("click", closeGithubModal);
  quickGithubRepoBtn?.addEventListener("click", () => {
    closeProjectModal();
    openGithubModal();
  });

  refreshGithubBtn?.addEventListener("click", () => fetchGithubRepos(true));
  importAllGithubBtn?.addEventListener("click", importAllGithubRepos);
  githubSearchInput?.addEventListener("input", renderGithubRepos);

  async function fetchGithubRepos(force = false) {
    if (isFetchingGithub) return;
    if (githubRepos.length > 0 && !force) {
      renderGithubRepos();
      return;
    }

    isFetchingGithub = true;
    githubReposList.innerHTML = `
      <div class="py-16 text-center text-[#9d9da5] font-mono-code text-xs space-y-2">
        <i class="fa-solid fa-spinner animate-spin text-xl text-[#2ce98a]"></i>
        <p>Connecting to GitHub API for @Rnrezanur...</p>
      </div>
    `;
    githubReposCount.textContent = "Fetching repositories...";

    try {
      const response = await fetch("https://api.github.com/users/Rnrezanur/repos?sort=updated&per_page=100");
      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }
      const data = await response.json();
      // Filter out forks or sort by pushed_at descending
      githubRepos = Array.isArray(data) ? data : [];
      renderGithubRepos();
    } catch (err) {
      console.error("Error fetching GitHub repos:", err);
      githubReposList.innerHTML = `
        <div class="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono-code space-y-2">
          <p class="font-bold"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Failed to load GitHub repositories</p>
          <p class="text-[11px] opacity-80">${err.message}</p>
          <button onclick="fetchGithubRepos(true)" class="accent-btn px-3 py-1 rounded text-[11px] mt-2">Retry</button>
        </div>
      `;
      githubReposCount.textContent = "Error loading";
    } finally {
      isFetchingGithub = false;
    }
  }

  function renderGithubRepos() {
    if (!githubReposList) return;

    const query = (githubSearchInput?.value || "").toLowerCase().trim();
    const filtered = githubRepos.filter((repo) => {
      if (!query) return true;
      const matchesName = repo.name.toLowerCase().includes(query);
      const matchesDesc = (repo.description || "").toLowerCase().includes(query);
      const matchesLang = (repo.language || "").toLowerCase().includes(query);
      return matchesName || matchesDesc || matchesLang;
    });

    githubReposCount.textContent = `${filtered.length} of ${githubRepos.length} repositories`;

    if (filtered.length === 0) {
      githubReposList.innerHTML = `
        <div class="py-12 text-center text-[#9d9da5] font-mono-code text-xs space-y-2">
          <i class="fa-brands fa-github text-2xl opacity-40"></i>
          <p>No repositories match your filter "${query}".</p>
        </div>
      `;
      return;
    }

    githubReposList.innerHTML = filtered
      .map((repo) => {
        // Check if repo is already on portfolio
        const isAlreadyAdded = allProjects.some((p) => {
          const matchLink = p.link && p.link.toLowerCase().trim() === repo.html_url.toLowerCase().trim();
          const matchTitle = p.title && p.title.toLowerCase().trim() === repo.name.toLowerCase().trim();
          return matchLink || matchTitle;
        });

        const topics = repo.topics || [];
        const tags = [repo.language, ...topics.slice(0, 3)].filter(Boolean);
        const tagsHtml = tags
          .map((t) => `<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/10 text-[#9d9da5]">${t}</span>`)
          .join("");

        return `
          <div class="panel-soft rounded-xl p-4 border border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#2ce98a]/30 transition-all group">
            <div class="space-y-1.5 flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-syne font-bold text-sm text-white group-hover:text-[#2ce98a] transition-colors truncate">${repo.name}</h4>
                ${
                  repo.language
                    ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#2ce98a]/15 text-[#2ce98a] border border-[#2ce98a]/30 font-semibold">${repo.language}</span>`
                    : ""
                }
                ${
                  repo.stargazers_count > 0
                    ? `<span class="text-[10px] font-mono-code text-yellow-400/90 flex items-center gap-1"><i class="fa-solid fa-star text-[9px]"></i>${repo.stargazers_count}</span>`
                    : ""
                }
              </div>

              <p class="text-xs text-[#9d9da5] line-clamp-2 leading-relaxed">${repo.description || "No description provided on GitHub."}</p>

              <div class="flex items-center gap-3 text-[11px] font-mono-code pt-1 flex-wrap">
                <a href="${repo.html_url}" target="_blank" class="text-white/80 hover:text-[#2ce98a] flex items-center gap-1">
                  <i class="fa-brands fa-github text-xs"></i> GitHub
                </a>
                ${
                  repo.homepage
                    ? `<a href="${repo.homepage.startsWith("http") ? repo.homepage : "https://" + repo.homepage}" target="_blank" class="text-[#2ce98a] hover:underline flex items-center gap-1"><i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i> Live Demo</a>`
                    : ""
                }
                ${tagsHtml}
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
              ${
                isAlreadyAdded
                  ? `
                  <span class="px-3 py-1.5 rounded-lg text-xs font-mono-code bg-[#2ce98a]/10 text-[#2ce98a] border border-[#2ce98a]/20 flex items-center gap-1.5">
                    <i class="fa-solid fa-check text-[10px]"></i> In Portfolio
                  </span>
                `
                  : `
                  <button onclick="window.quickImportGithubRepo('${repo.name}')" class="accent-btn px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5" title="Add directly to your portfolio">
                    <i class="fa-solid fa-plus text-[10px]"></i> Add
                  </button>
                  <button onclick="window.selectAndEditGithubRepo('${repo.name}')" class="ghost-btn hover:text-[#2ce98a] px-2.5 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1" title="Customize details before adding">
                    <i class="fa-solid fa-pen text-[10px]"></i> Edit
                  </button>
                `
              }
            </div>
          </div>
        `;
      })
      .join("");
  }

  // 1-Click Quick Import from GitHub
  window.quickImportGithubRepo = async function (repoName) {
    const repo = githubRepos.find((r) => r.name === repoName);
    if (!repo) return;

    // Check if repo is already added in portfolio
    const alreadyExists = allProjects.some((p) => {
      const matchLink = p.link && p.link.toLowerCase().trim() === repo.html_url.toLowerCase().trim();
      const matchTitle = p.title && p.title.toLowerCase().trim() === repo.name.toLowerCase().trim();
      return matchLink || matchTitle;
    });

    if (alreadyExists) {
      showToast(`"${repo.name}" is already in your portfolio!`, "info");
      return;
    }

    const tags = [repo.language, ...(repo.topics || [])].filter(Boolean);
    if (tags.length === 0) tags.push("GitHub");

    let demoUrl = null;
    if (repo.homepage) {
      demoUrl = repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`;
    }

    const newProject = {
      title: repo.name,
      description: repo.description || "Open source project by Rezanur.",
      tags: tags,
      demo: demoUrl,
      link: repo.html_url,
      image: null,
      pinned: false,
      order: allProjects.length + 1,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection("projects").add(newProject);
      showToast(`Added "${repo.name}" to your portfolio!`, "success");
      await loadProjects();
      renderGithubRepos();
    } catch (err) {
      console.error(err);
      alert(`Error importing repository: ${err.message}`);
    }
  };

  // Bulk Import All New GitHub Repositories at Once
  async function importAllGithubRepos() {
    if (!githubRepos || githubRepos.length === 0) {
      showToast("Please wait for repositories to finish loading.", "info");
      return;
    }

    const newRepos = githubRepos.filter((repo) => {
      if (repo.name.toLowerCase() === "rnrezanur") return false; // skip personal profile README repo
      const alreadyExists = allProjects.some((p) => {
        const matchLink = p.link && p.link.toLowerCase().trim() === repo.html_url.toLowerCase().trim();
        const matchTitle = p.title && p.title.toLowerCase().trim() === repo.name.toLowerCase().trim();
        return matchLink || matchTitle;
      });
      return !alreadyExists;
    });

    if (newRepos.length === 0) {
      showToast("All your GitHub repositories are already added to your portfolio!", "info");
      return;
    }

    if (!confirm(`Found ${newRepos.length} new GitHub repository(ies). Do you want to import all of them to your portfolio now?`)) {
      return;
    }

    if (importAllGithubBtn) {
      importAllGithubBtn.disabled = true;
      importAllGithubBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Importing...</span>';
    }

    try {
      const batch = db.batch();
      let currentOrder = allProjects.length + 1;

      newRepos.forEach((repo) => {
        const docRef = db.collection("projects").doc();
        const tags = [repo.language, ...(repo.topics || [])].filter(Boolean);
        if (tags.length === 0) tags.push("GitHub");

        let demoUrl = null;
        if (repo.homepage) {
          demoUrl = repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`;
        }

        batch.set(docRef, {
          title: repo.name,
          description: repo.description || "Open source project by Rezanur.",
          tags: tags,
          demo: demoUrl,
          link: repo.html_url,
          image: null,
          pinned: false,
          order: currentOrder++,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();
      showToast(`Successfully imported ${newRepos.length} repository(ies) from GitHub!`, "success");
      await loadProjects();
      renderGithubRepos();
    } catch (err) {
      console.error("Error bulk importing GitHub repos:", err);
      alert(`Error importing repositories: ${err.message}`);
    } finally {
      if (importAllGithubBtn) {
        importAllGithubBtn.disabled = false;
        importAllGithubBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> <span>Import All New</span>';
      }
    }
  }

  // Select and Edit GitHub repo before adding
  window.selectAndEditGithubRepo = function (repoName) {
    const repo = githubRepos.find((r) => r.name === repoName);
    if (!repo) return;

    const tags = [repo.language, ...(repo.topics || [])].filter(Boolean);
    if (tags.length === 0) tags.push("GitHub");

    let demoUrl = "";
    if (repo.homepage) {
      demoUrl = repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`;
    }

    projectForm.reset();
    projectId.value = "";
    projectTitle.value = repo.name;
    projectDescription.value = repo.description || "";
    projectTags.value = tags.join(", ");
    projectDemo.value = demoUrl;
    projectLink.value = repo.html_url;
    projectImage.value = "";
    imagePreview.src = "";
    imagePreviewContainer.classList.add("hidden");
    projectPinned.checked = false;
    projectOrder.value = allProjects.length + 1;

    modalTitle.textContent = `Add "${repo.name}" from GitHub`;
    closeGithubModal();
    projectModal.classList.remove("hidden");
  };

  // =============================================================
  // 2. EDUCATION MANAGEMENT
  // =============================================================
  async function loadEducation() {
    try {
      const snapshot = await db.collection("education").get();
      if (snapshot.empty) {
        await seedDefaultEducation(false);
        return;
      }
      allEducation = [];
      snapshot.forEach((doc) => {
        allEducation.push({ id: doc.id, ...doc.data() });
      });
      allEducation.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      renderEducation();
    } catch (err) {
      console.error("Error loading education:", err);
    }
  }

  async function seedDefaultEducation(showToastAlert = true) {
    try {
      const existingKeys = new Set(
        allEducation.map((e) => `${(e.role || "").toLowerCase()}_${(e.meta || "").toLowerCase()}`)
      );
      const toAdd = defaultEducation.filter(
        (e) => !existingKeys.has(`${(e.role || "").toLowerCase()}_${(e.meta || "").toLowerCase()}`)
      );

      if (toAdd.length === 0) {
        if (showToastAlert) showToast("All default education entries are already present!", "info");
        return;
      }

      const batch = db.batch();
      toAdd.forEach((edu) => {
        const docRef = db.collection("education").doc();
        batch.set(docRef, {
          ...edu,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
      if (showToastAlert) showToast(`Added ${toAdd.length} default education entry!`, "success");

      await loadEducation();
    } catch (err) {
      console.error("Error seeding education:", err);
    }
  }

  function renderEducation() {
    if (allEducation.length === 0) {
      educationGrid.innerHTML = `
        <div class="panel rounded-xl p-8 text-center text-xs text-[#9d9da5] font-mono-code">
          No education history found. Click "Add Education" or "Re-sync Defaults".
        </div>
      `;
      return;
    }

    educationGrid.innerHTML = allEducation
      .map(
        (edu) => `
        <div class="panel rounded-xl p-5 flex items-start justify-between gap-4 group hover:border-[#2ce98a]/40 transition-all">
          <div class="space-y-1.5 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono-code text-[#2ce98a] font-semibold">${edu.period}</span>
              ${
                edu.isActive
                  ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#2ce98a]/15 text-[#2ce98a] border border-[#2ce98a]/30">Current / Ongoing</span>'
                  : ""
              }
              <span class="text-[10px] font-mono-code text-[#9d9da5]">Order: ${edu.order ?? 0}</span>
            </div>
            <h4 class="font-syne font-bold text-base text-white group-hover:text-[#2ce98a] transition-colors">${edu.role}</h4>
            <p class="text-xs text-[#9d9da5]">${edu.meta}</p>
            ${edu.note ? `<p class="text-xs font-mono-code text-[#9d9da5]/80 pt-1">Note: ${edu.note}</p>` : ""}
          </div>
          <div class="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
            <button onclick="window.editEducation('${edu.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-[#2ce98a] flex items-center justify-center text-xs" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="window.deleteEducation('${edu.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-red-400 flex items-center justify-center text-xs" title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  openAddEducationModalBtn.addEventListener("click", () => {
    educationForm.reset();
    educationId.value = "";
    educationModalTitle.textContent = "Add Education";
    educationOrder.value = allEducation.length + 1;
    educationModal.classList.remove("hidden");
  });

  function closeEducationModal() {
    educationModal.classList.add("hidden");
  }

  closeEducationModalBtn.addEventListener("click", closeEducationModal);
  cancelEducationModalBtn.addEventListener("click", closeEducationModal);

  educationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = educationId.value;
    const data = {
      role: educationRole.value.trim(),
      meta: educationMeta.value.trim(),
      period: educationPeriod.value.trim(),
      note: educationNote.value.trim(),
      isActive: educationActive.checked,
      order: Number(educationOrder.value) || 0,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      if (id) {
        await db.collection("education").doc(id).update(data);
        showToast("Education updated!", "success");
      } else {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("education").add(data);
        showToast("Education added!", "success");
      }
      closeEducationModal();
      await loadEducation();
    } catch (err) {
      alert(`Error saving education: ${err.message}`);
    }
  });

  window.editEducation = function (id) {
    const item = allEducation.find((e) => e.id === id);
    if (!item) return;

    educationId.value = item.id;
    educationRole.value = item.role || "";
    educationMeta.value = item.meta || "";
    educationPeriod.value = item.period || "";
    educationNote.value = item.note || "";
    educationActive.checked = Boolean(item.isActive);
    educationOrder.value = item.order ?? 0;

    educationModalTitle.textContent = "Edit Education";
    educationModal.classList.remove("hidden");
  };

  window.deleteEducation = async function (id) {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await db.collection("education").doc(id).delete();
      showToast("Education removed", "info");
      await loadEducation();
    } catch (err) {
      alert(`Error deleting education: ${err.message}`);
    }
  };

  importEducationDefaultsBtn.addEventListener("click", () => seedDefaultEducation(true));

  // =============================================================
  // 3. EXPERIENCE MANAGEMENT
  // =============================================================
  async function loadExperience() {
    try {
      const snapshot = await db.collection("experience").get();
      if (snapshot.empty) {
        await seedDefaultExperience(false);
        return;
      }
      allExperience = [];
      snapshot.forEach((doc) => {
        allExperience.push({ id: doc.id, ...doc.data() });
      });
      allExperience.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      renderExperience();
    } catch (err) {
      console.error("Error loading experience:", err);
    }
  }

  async function seedDefaultExperience(showToastAlert = true) {
    try {
      const existingKeys = new Set(
        allExperience.map((e) => `${(e.role || "").toLowerCase()}_${(e.company || "").toLowerCase()}`)
      );
      const toAdd = defaultExperience.filter(
        (e) => !existingKeys.has(`${(e.role || "").toLowerCase()}_${(e.company || "").toLowerCase()}`)
      );

      if (toAdd.length === 0) {
        if (showToastAlert) showToast("All default experience entries are already present!", "info");
        return;
      }

      const batch = db.batch();
      toAdd.forEach((exp) => {
        const docRef = db.collection("experience").doc();
        batch.set(docRef, {
          ...exp,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
      if (showToastAlert) showToast(`Added ${toAdd.length} default experience entry!`, "success");

      await loadExperience();
    } catch (err) {
      console.error("Error seeding experience:", err);
    }
  }

  function renderExperience() {
    if (allExperience.length === 0) {
      experienceList.innerHTML = `
        <div class="panel rounded-xl p-8 text-center text-xs text-[#9d9da5] font-mono-code">
          No experience entries found. Click "Add Experience" or "Re-sync Defaults".
        </div>
      `;
      return;
    }

    experienceList.innerHTML = allExperience
      .map((exp) => {
        const pointsList = (exp.points || [])
          .map((pt) => `<li class="text-xs text-[#9d9da5] list-disc ml-4">${pt}</li>`)
          .join("");

        return `
          <div class="panel rounded-xl p-5 flex items-start justify-between gap-4 group hover:border-[#2ce98a]/40 transition-all">
            <div class="space-y-2 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-mono-code text-[#2ce98a] font-semibold">${exp.period}</span>
                ${
                  exp.isActive
                    ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono-code bg-[#2ce98a]/15 text-[#2ce98a] border border-[#2ce98a]/30">Current Role</span>'
                    : ""
                }
                <span class="text-[10px] font-mono-code text-[#9d9da5]">Order: ${exp.order ?? 0}</span>
              </div>
              <h4 class="font-syne font-bold text-base text-white group-hover:text-[#2ce98a] transition-colors">${exp.role}</h4>
              <p class="text-xs text-[#2ce98a] font-mono-code">${exp.company} ${exp.link ? `<a href="${exp.link}" target="_blank" class="text-[#9d9da5] hover:underline ml-1"><i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i></a>` : ""}</p>
              <ul class="space-y-1 pt-1">
                ${pointsList}
              </ul>
            </div>
            <div class="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
              <button onclick="window.editExperience('${exp.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-[#2ce98a] flex items-center justify-center text-xs" title="Edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onclick="window.deleteExperience('${exp.id}')" class="w-7 h-7 rounded-lg ghost-btn hover:text-red-400 flex items-center justify-center text-xs" title="Delete">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  openAddExperienceBtn.addEventListener("click", () => {
    experienceForm.reset();
    experienceId.value = "";
    experienceModalTitle.textContent = "Add Work Experience";
    expOrder.value = allExperience.length + 1;
    experienceModal.classList.remove("hidden");
  });

  function closeExperienceModal() {
    experienceModal.classList.add("hidden");
  }

  closeExperienceModalBtn.addEventListener("click", closeExperienceModal);
  cancelExperienceModalBtn.addEventListener("click", closeExperienceModal);

  experienceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = experienceId.value;
    const pointsArray = expPoints.value
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const data = {
      role: expRole.value.trim(),
      company: expCompany.value.trim(),
      period: expPeriod.value.trim(),
      link: expLink.value.trim() || null,
      points: pointsArray,
      isActive: expActive.checked,
      order: Number(expOrder.value) || 0,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      if (id) {
        await db.collection("experience").doc(id).update(data);
        showToast("Experience updated!", "success");
      } else {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("experience").add(data);
        showToast("Experience added!", "success");
      }
      closeExperienceModal();
      await loadExperience();
    } catch (err) {
      alert(`Error saving experience: ${err.message}`);
    }
  });

  window.editExperience = function (id) {
    const item = allExperience.find((e) => e.id === id);
    if (!item) return;

    experienceId.value = item.id;
    expRole.value = item.role || "";
    expCompany.value = item.company || "";
    expPeriod.value = item.period || "";
    expLink.value = item.link || "";
    expPoints.value = (item.points || []).join("\n");
    expActive.checked = Boolean(item.isActive);
    expOrder.value = item.order ?? 0;

    experienceModalTitle.textContent = "Edit Work Experience";
    experienceModal.classList.remove("hidden");
  };

  window.deleteExperience = async function (id) {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;
    try {
      await db.collection("experience").doc(id).delete();
      showToast("Experience removed", "info");
      await loadExperience();
    } catch (err) {
      alert(`Error deleting experience: ${err.message}`);
    }
  };

  importExperienceDefaultsBtn.addEventListener("click", () => seedDefaultExperience(true));

  // =============================================================
  // 4. SKILLS MANAGEMENT
  // =============================================================
  async function loadSkills() {
    try {
      const snapshot = await db.collection("skills").get();
      if (snapshot.empty) {
        await seedDefaultSkills(false);
        return;
      }
      allSkills = [];
      snapshot.forEach((doc) => {
        allSkills.push({ id: doc.id, ...doc.data() });
      });
      renderSkills();
    } catch (err) {
      console.error("Error loading skills:", err);
    }
  }

  async function seedDefaultSkills(showToastAlert = true) {
    try {
      const existingKeys = new Set(
        allSkills.map((s) => `${(s.name || "").toLowerCase()}_${(s.category || "").toLowerCase()}`)
      );
      const toAdd = defaultSkills.filter(
        (s) => !existingKeys.has(`${(s.name || "").toLowerCase()}_${(s.category || "").toLowerCase()}`)
      );

      if (toAdd.length === 0) {
        if (showToastAlert) showToast("All default skills are already present!", "info");
        return;
      }

      const batch = db.batch();
      toAdd.forEach((s) => {
        const docRef = db.collection("skills").doc();
        batch.set(docRef, {
          ...s,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
      if (showToastAlert) showToast(`Added ${toAdd.length} default skill(s)!`, "success");

      await loadSkills();
    } catch (err) {
      console.error("Error seeding skills:", err);
    }
  }

  function renderSkills() {
    if (allSkills.length === 0) {
      skillsContainer.innerHTML = `
        <div class="panel rounded-xl p-8 text-center text-xs text-[#9d9da5] font-mono-code">
          No skills stored. Click "Re-sync Defaults".
        </div>
      `;
      return;
    }

    const categories = ["Languages", "Frontend", "Backend", "Databases", "Tools"];
    const grouped = {};
    categories.forEach((c) => (grouped[c] = []));

    allSkills.forEach((s) => {
      const cat = s.category || "Tools";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });

    skillsContainer.innerHTML = Object.entries(grouped)
      .map(([cat, list]) => {
        if (list.length === 0) return "";
        const badges = list
          .map(
            (item) => `
            <div class="panel-soft rounded-lg px-3 py-1.5 flex items-center gap-2 group text-xs border border-[var(--line)]">
              <i class="${item.icon || "fa-solid fa-code"} text-[#2ce98a]"></i>
              <span class="font-medium">${item.name}</span>
              <button onclick="window.deleteSkill('${item.id}')" class="text-[#9d9da5] hover:text-red-400 ml-1 text-[11px]" title="Remove skill">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          `
          )
          .join("");

        return `
          <div class="panel rounded-xl p-5 space-y-3">
            <h4 class="font-syne font-bold text-sm text-[#2ce98a] uppercase tracking-wider">${cat}</h4>
            <div class="flex flex-wrap gap-2">
              ${badges}
            </div>
          </div>
        `;
      })
      .join("");
  }

  openAddSkillModalBtn.addEventListener("click", () => {
    skillForm.reset();
    skillModal.classList.remove("hidden");
  });

  function closeSkillModal() {
    skillModal.classList.add("hidden");
  }

  closeSkillModalBtn.addEventListener("click", closeSkillModal);
  cancelSkillModalBtn.addEventListener("click", closeSkillModal);

  skillForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await db.collection("skills").add({
        name: skillName.value.trim(),
        category: skillCategory.value,
        icon: skillIcon.value.trim() || "fa-solid fa-code",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast("Skill added!", "success");
      closeSkillModal();
      await loadSkills();
    } catch (err) {
      alert(`Error saving skill: ${err.message}`);
    }
  });

  window.deleteSkill = async function (id) {
    if (!confirm("Delete this skill?")) return;
    try {
      await db.collection("skills").doc(id).delete();
      showToast("Skill removed", "info");
      await loadSkills();
    } catch (err) {
      alert(`Error deleting skill: ${err.message}`);
    }
  };

  importSkillsDefaultsBtn.addEventListener("click", () => seedDefaultSkills(true));

  // =============================================================
  // 5. QUICK INFO & CV UPLOAD MANAGEMENT
  // =============================================================
  async function loadQuickInfo() {
    try {
      const doc = await db.collection("settings").doc("profile").get();
      if (doc.exists) {
        const data = doc.data();
        if (data.status) infoStatus.value = data.status;
        if (data.role) infoRole.value = data.role;
        if (data.email) infoEmail.value = data.email;
        if (data.resume) infoResume.value = data.resume;

        if (data.cvDataUrl) {
          cvCurrentStatus.textContent = `Uploaded: ${data.cvFileName || "CV.pdf"} (${data.cvFileSize || "Custom"})`;
          cvPreviewLink.href = data.cvDataUrl;
          cvPreviewRow.classList.remove("hidden");
        }
      } else {
        // Pre-fill with default values
        infoStatus.value = "Available for new opportunities";
        infoRole.value = "Full Stack Developer";
        infoEmail.value = "rezanurbinshamim@gmail.com";
      }
    } catch (err) {
      console.warn("Could not load quick info settings:", err);
    }
  }

  // Handle PDF file selection for CV
  cvFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      pendingCvBase64 = null;
      pendingCvName = null;
      cvFileSize.textContent = "";
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      alert("Please upload a PDF under 2.5 MB to ensure fast loading.");
      cvFileInput.value = "";
      return;
    }

    const sizeKb = (file.size / 1024).toFixed(1);
    cvFileSize.textContent = `Selected: ${file.name} (${sizeKb} KB)`;

    const reader = new FileReader();
    reader.onload = function (event) {
      pendingCvBase64 = event.target.result;
      pendingCvName = file.name;
    };
    reader.readAsDataURL(file);
  });

  // Reset CV to default assets file
  resetCvBtn.addEventListener("click", async () => {
    if (!confirm("Reset to the default CV file (assets/Md_Rezanur_Bin_Shamim_CV.pdf)?")) return;
    try {
      await db.collection("settings").doc("profile").update({
        cvDataUrl: firebase.firestore.FieldValue.delete(),
        cvFileName: firebase.firestore.FieldValue.delete(),
        cvFileSize: firebase.firestore.FieldValue.delete(),
      });
      pendingCvBase64 = null;
      pendingCvName = null;
      cvFileInput.value = "";
      cvFileSize.textContent = "";
      cvPreviewRow.classList.add("hidden");
      cvCurrentStatus.textContent = "Default: assets/Md_Rezanur_Bin_Shamim_CV.pdf";
      showToast("Reset to default CV file.", "info");
    } catch (err) {
      alert(`Error resetting CV: ${err.message}`);
    }
  });

  quickInfoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById("saveQuickInfoBtn");
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Saving...';
    saveBtn.disabled = true;

    try {
      const payload = {
        status: infoStatus.value.trim(),
        role: infoRole.value.trim(),
        email: infoEmail.value.trim(),
        resume: infoResume.value.trim(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      if (pendingCvBase64) {
        payload.cvDataUrl = pendingCvBase64;
        payload.cvFileName = pendingCvName;
        const file = cvFileInput.files[0];
        if (file) {
          payload.cvFileSize = `${(file.size / 1024).toFixed(1)} KB`;
        }
      }

      await db.collection("settings").doc("profile").set(payload, { merge: true });
      showToast("Quick info & CV updated successfully!", "success");
      await loadQuickInfo();
      cvFileInput.value = "";
      cvFileSize.textContent = "";
      pendingCvBase64 = null;
    } catch (err) {
      alert(`Error updating info: ${err.message}`);
    } finally {
      saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Save Quick Info &amp; CV</span>';
      saveBtn.disabled = false;
    }
  });

  // Change Admin Password Form Handler
  const changePasswordForm = document.getElementById("changePasswordForm");
  const newAdminPassword = document.getElementById("newAdminPassword");
  const confirmAdminPassword = document.getElementById("confirmAdminPassword");
  const changePasswordBtn = document.getElementById("changePasswordBtn");

  changePasswordForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPass = newAdminPassword.value;
    const confirmPass = confirmAdminPassword.value;

    if (newPass.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    changePasswordBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Updating...';
    changePasswordBtn.disabled = true;

    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error("No authenticated user found. Please log in again.");
      }
      await user.updatePassword(newPass);
      showToast("Password updated successfully! Use your new password next time.", "success");
      newAdminPassword.value = "";
      confirmAdminPassword.value = "";
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        alert("For security, please log out and log in again before changing your password.");
      } else {
        alert(`Error changing password: ${err.message}`);
      }
    } finally {
      changePasswordBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> <span>Update Password</span>';
      changePasswordBtn.disabled = false;
    }
  });
})();
