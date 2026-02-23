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
    title: "updating",
    description: ".............",
    link: "link_here"
  },
  {
    title: "updating",
    description: ".............",
    link: "link_here"
  },
  {
    title: "updating",
    description: ".............",
    link: "link_here"
  },
  {
    title: "updating",
    description: "..........",
    link: "link_here"
  },
  {
    title: "updating",
    description: "..........",
    link: "link_here"
  }

];


const projectsPerPage = 6;

let currentPage = 1;

const container = document.getElementById("project-container");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function displayProjects() {

  // Fade out
  container.classList.remove("opacity-100");
  container.classList.add("opacity-0");

  setTimeout(() => {

    container.innerHTML = "";

    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;

    const currentProjects = projects.slice(start, end);

currentProjects.forEach(project => {

  container.innerHTML += `
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

      <a href="${project.link}" target="_blank"
         class="inline-block px-5 py-2 bg-cyan-400 text-black 
                rounded-lg font-medium 
                hover:bg-white transition self-start">
        View Project
      </a>

    </div>
  `;
});
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Fade in
    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");

  }, 300);
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProjects();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProjects();
  }
});

displayProjects();