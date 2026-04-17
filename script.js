const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

elements.forEach(el => observer.observe(el));


const projects = [
  {
    title: "Simple Fashion UI",
    description:"A responsive fashion landing page built with HTML and Tailwind CSS.",
    demo: "https://simple-fashion.vercel.app",   // Live link
    link: "https://github.com/Rnrezanur/simple-fashion",
    pinned: false
  },
  {
    title: "Influencer Gear",
    description: "Responsive e-commerce product showcase built with HTML & CSS.",
    demo: "https://influencer-gear-hazel.vercel.app/",
    link:"",
    pinned: false
  },
  
  {
    title: "IntelliEco – Smart Eco-System Management Platform",
    description: "A web app for monitoring and managing eco-friendly systems with smart data tracking.",
    demo: null,
    link: "https://github.com/Rnrezanur/intellieco-eco-system",
    pinned: false
  },

  {
    title: "Rock-Paper-Scissors",
    description: "Interactive GUI game built with Python.",
    demo: null,
    link: "https://github.com/Rnrezanur/rock-paper-scissors",
    pinned: false
  }
  


];

// for next page in feature pin option 

const seeMoreBtn = document.getElementById("seeMoreBtn");
const featuredPagination = document.getElementById("featuredPagination");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const featuredPageNumber = document.getElementById("featuredPageNumber");

let showAllFeatured = false;
let featuredPage = 1;
const FEATURE_LIMIT = 3;
const FEATURE_PER_PAGE = 6;

const projectsPerPage = 6;
let currentPage = 1;

const container = document.getElementById("project-container");
const featuredContainer = document.getElementById("featured-container");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");





// DISPLAY FEATURED PROJECTS


function displayFeatured() {

  featuredContainer.innerHTML = "";

  const featuredProjects = projects.filter(p => p.pinned);

  if (featuredProjects.length === 0) {
    document.getElementById("featured-section").style.display = "none";
    return;
  }

  // If less than limit → no button
  if (featuredProjects.length > FEATURE_LIMIT) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }

  if (!showAllFeatured) {

    // Default mode → show only 3
    const initial = featuredProjects.slice(0, FEATURE_LIMIT);
    initial.forEach(project => {
      featuredContainer.innerHTML += createCard(project);
    });

    featuredPagination.classList.add("hidden");

  } else {

    // Paginated mode
    const start = (featuredPage - 1) * FEATURE_PER_PAGE;
    const end = start + FEATURE_PER_PAGE;

    const current = featuredProjects.slice(start, end);

    current.forEach(project => {
      featuredContainer.innerHTML += createCard(project);
    });

    const totalPages = Math.ceil(featuredProjects.length / FEATURE_PER_PAGE);

    featuredPageNumber.textContent =
      `Page ${featuredPage} of ${totalPages}`;

    featuredPrev.disabled = featuredPage === 1;
    featuredNext.disabled = featuredPage === totalPages;

    featuredPagination.classList.remove("hidden");
  }

  seeMoreBtn.textContent = showAllFeatured
    ? "Collapse Featured"
    : "Explore Featured";
}

// Featured Pagination Events

featuredPrev.addEventListener("click", () => {
  if (featuredPage > 1) {
    featuredPage--;
    displayFeatured();
  }
});

featuredNext.addEventListener("click", () => {
  const featuredProjects = projects.filter(p => p.pinned);
  const totalPages = Math.ceil(featuredProjects.length / FEATURE_PER_PAGE);

  if (featuredPage < totalPages) {
    featuredPage++;
    displayFeatured();
  }
});


// DISPLAY ALL PROJECTS (EXCLUDING PINNED)

function displayProjects() {

  container.classList.remove("opacity-100");
  container.classList.add("opacity-0");

  setTimeout(() => {

    container.innerHTML = "";

    const nonPinned = projects.filter(p => !p.pinned);

    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;

    const currentProjects = nonPinned.slice(start, end);

    currentProjects.forEach(project => {
      container.innerHTML += createCard(project);
    });

    const totalPages = Math.ceil(nonPinned.length / projectsPerPage);

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");

  }, 300);
}



// CARD TEMPLATE

function createCard(project) {
  return `
    <div class="bg-slate-900 p-8 rounded-2xl
                hover:-translate-y-3
                hover:shadow-2xl
                hover:shadow-cyan-400/30
                transition-all duration-300
                flex flex-col
                min-h-[260px]">

      <h3 class="font-semibold text-xl mb-4 text-white">
        ${project.title}
      </h3>

      <p class="text-slate-400 text-sm mb-6 flex-grow">
        ${project.description}
      </p>

      <div class="flex gap-4 mt-auto">

        ${project.demo ? `
          <a href="${project.demo}" target="_blank"
             class="px-4 py-2 bg-cyan-400 text-black 
                    rounded-lg font-medium 
                    hover:bg-white transition">
            Live Demo
          </a>
        ` : ''}

        <a href="${project.link}" target="_blank"
           class="px-4 py-2 border border-cyan-400 text-cyan-400 
                  rounded-lg font-medium 
                  hover:bg-cyan-400 hover:text-black transition">
          GitHub
        </a>

      </div>

    </div>
  `;
}



// Pagination Events

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProjects();
  }
});

nextBtn.addEventListener("click", () => {
  const nonPinned = projects.filter(p => !p.pinned);
  const totalPages = Math.ceil(nonPinned.length / projectsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    displayProjects();
  }
});



// See More Toggle

seeMoreBtn.addEventListener("click", () => {
  showAllFeatured = !showAllFeatured;
  featuredPage = 1;
  displayFeatured();
});



// Initialize
displayFeatured();
displayProjects();