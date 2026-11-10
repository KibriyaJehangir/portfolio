// Glow circle follow
const glowCircle = document.getElementById("glowCircle");
document.addEventListener("mousemove", (e) => {
  glowCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
document.addEventListener("mouseleave", () => { glowCircle.style.opacity = "0"; });
document.addEventListener("mouseenter", () => { glowCircle.style.opacity = "1"; });

// Shake animation on page load
window.addEventListener("load", () => {
  document.body.classList.add("shake-on-load");
  setTimeout(() => { document.body.classList.remove("shake-on-load"); }, 500);
});

// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// GitHub Projects
const username = "KibriyaJehangir";
const projectCountElem = document.getElementById("project-count");
const mainProjectsContainer = document.getElementById("main-projects");
const otherProjectsContainer = document.getElementById("other-projects");
const excludedProjects = ["KibriyaJehangir", "youtube-shorts_feed_shopify", "Kibriya_Video_Editor"];
const mainProjectsList = ["portfolio", "Type_50"];

async function fetchProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await response.json();
    const filteredRepos = repos.filter(repo => !excludedProjects.includes(repo.name));
    projectCountElem.textContent = filteredRepos.length;

    filteredRepos.forEach(repo => {
      const projectDiv = document.createElement("div");
      projectDiv.className = "project";
      projectDiv.innerHTML = `
        <h4>${repo.name}</h4>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      if (mainProjectsList.includes(repo.name)) {
        mainProjectsContainer.appendChild(projectDiv);
      } else {
        otherProjectsContainer.appendChild(projectDiv);
      }
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    projectCountElem.textContent = "Error";
  }
}
fetchProjects();

// Certificates Loader
async function loadCertificates() {
  const repo = "KibriyaJehangir/portfolio";
  const folder = "certificates";
  const branch = "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
  const container = document.getElementById("certificates") || document.getElementById("gigs-container");
  const countEl = document.getElementById("gig-count");
  if (!container) return;

  container.innerHTML = "Loading...";
  if (countEl) countEl.textContent = "Loading...";

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
    const files = await res.json();
    const images = files.filter(f => /\.(jpe?g|png|gif|webp|svg|pdf)$/i.test(f.name));
    container.innerHTML = "";
    let count = 0;

    images.forEach(file => {
      const filename = file.name;
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const card = document.createElement("div");
      card.className = "certificate-card";

      if (file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        card.innerHTML = `
          <h3>${title}</h3>
          <img src="${file.download_url}" alt="${title}">
          <div class="buttons">
            <a href="${file.download_url}" target="_blank" rel="noopener noreferrer">View Image</a>
          </div>
        `;
      } else if (file.name.match(/\.pdf$/i)) {
        card.innerHTML = `
          <h3>${title}</h3>
          <div class="buttons">
            <a href="${file.download_url}" target="_blank" rel="noopener noreferrer">View PDF</a>
          </div>
        `;
      }

      container.appendChild(card);
      count++;
    });

    if (countEl) countEl.textContent = count;
    if (count === 0) container.innerHTML = "<p>No certificate files found.</p>";
  } catch (err) {
    console.error("Error loading certificates:", err);
    container.innerHTML = `<p style="color:red">Failed to load certificates: ${err.message}</p>`;
    if (countEl) countEl.textContent = "0";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCertificates();
  if (typeof enableCertificateSearch === "function") enableCertificateSearch();
});

// Header hide on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) header.classList.add("hide-header");
  else header.classList.remove("hide-header");
});

// Timeline scroll reveal
const timelineItems = document.querySelectorAll('.timeline-item');

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

const handleScroll = () => {
  timelineItems.forEach((item) => {
    if (isInViewport(item)) {
      if (!item.classList.contains("visible")) {
        if (item.classList.contains("left")) {
          item.classList.add("slide-in-left");
        } else if (item.classList.contains("right")) {
          item.classList.add("slide-in-right");
        }
        item.classList.add("visible");
      }
    } else {
      item.classList.remove(
        "visible",
        "slide-in-left",
        "slide-in-right"
      );
    }
  });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Skill Cards Animation
const cards = document.querySelectorAll(".skill-card");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.15
});

cards.forEach(card => observer.observe(card));

// Hire Button Shake
const hireBtn = document.querySelector(".hire-btn");
function triggerShake() {
  if (!hireBtn) return;
  hireBtn.classList.add("shake");
  setTimeout(() => {
    hireBtn.classList.remove("shake");
  }, 500);
}
setInterval(triggerShake, 2000);

// Smooth Staggered Reveal for About Section
document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll("#about h2, #about p");

  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 250); // 250ms delay between each item
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const aboutSec = document.querySelector("#about");
  if (aboutSec) {
    aboutObserver.observe(aboutSec);
  }
});

// GitHub Configuration
const GITHUB_USERNAME = "KibriyaJehangir";
const GITHUB_REPO = "portfolio"; // 👈 Make sure to replace with your actual repository name!

async function loadFeaturedProjects() {
  const container = document.getElementById("featured-projects-container");
  if (!container) return;

  const folderUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/featured_projects`;

  try {
    const response = await fetch(folderUrl);
    if (!response.ok) throw new Error("Could not fetch featured_projects directory");

    const items = await response.json();
    const projectFolders = items.filter(item => item.type === "dir");

    if (projectFolders.length === 0) {
      container.innerHTML = "<p>No featured projects found.</p>";
      return;
    }

    container.innerHTML = ""; // Clear loading text

    for (const folder of projectFolders) {
      const contentsUrl = folder.url;
      const contentsRes = await fetch(contentsUrl);
      const contents = await contentsRes.json();

      let thumbnailUrl = "";
      let descriptionText = "Data analytics project detailing workflow, transformations, and insights.";
      let videoUrl = "";
      let demoUrl = "";

      // 1. Find thumbnail image (accepts any image extension)
      const thumbnailFile = contents.find(f =>
        f.name.toLowerCase().startsWith("thumbnail") &&
        /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name)
      );
      if (thumbnailFile) thumbnailUrl = thumbnailFile.download_url;

      // 2. Find README file for project description
      const readmeFile = contents.find(f =>
        f.name.toLowerCase() === "readme.md" || f.name.toLowerCase() === "project.readme"
      );
      if (readmeFile) {
        const textRes = await fetch(readmeFile.download_url);
        const fullText = await textRes.text();
        const cleanLines = fullText.split("\n").filter(l => l.trim() && !l.startsWith("#"));
        if (cleanLines.length > 0) {
          descriptionText = cleanLines[0].substring(0, 140) + "...";
        }
      }

      // 3. Extract Video (URL 1) and Live Demo (URL 2) from any .txt file
      const txtFile = contents.find(f => f.name.toLowerCase().endsWith(".txt"));
      if (txtFile) {
        const txtRes = await fetch(txtFile.download_url);
        const txtContent = await txtRes.text();

        // Find all http/https links inside the text file
        const urlMatches = txtContent.match(/https?:\/\/[^\s]+/g);

        if (urlMatches && urlMatches.length > 0) {
          videoUrl = urlMatches[0].trim(); // First link -> Watch Video
        }
        if (urlMatches && urlMatches.length > 1) {
          demoUrl = urlMatches[1].trim();  // Second link -> Live Demo
        }
      }

      const projectTitle = folder.name.replace(/[-_]/g, " ");

      // Build card HTML
      const card = document.createElement("div");
      card.className = "featured-card";
      card.innerHTML = `
        <div class="card-thumbnail-container">
          <img src="${thumbnailUrl || 'https://via.placeholder.com/400x200?text=Project+Thumbnail'}" alt="${projectTitle}" class="card-thumbnail" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${projectTitle}</h3>
          <p class="card-description">${descriptionText}</p>
          <div class="card-actions">
            ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-action btn-demo">Live Demo</a>` : ''}
            ${videoUrl ? `<a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-action btn-video">Watch Video</a>` : ''}
            <a href="${folder.html_url}" target="_blank" rel="noopener noreferrer" class="btn-action btn-code">Code & Docs</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  } catch (error) {
    console.error("Error loading projects:", error);
    container.innerHTML = "<p>Failed to load projects. Check GitHub repository configuration.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProjects();
});

// Directional Scroll Reveal for Featured Projects & Data Process Sections
function initSectionDirectionalReveal(sectionSelector) {
  const targetSection = document.querySelector(sectionSelector);
  if (!targetSection) return;

  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop >= lastScrollTop;
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

      if (entry.isIntersecting) {
        // Remove directional offsets
        targetSection.classList.remove("from-top", "from-bottom");

        if (isScrollingDown) {
          targetSection.classList.add("from-bottom");
        } else {
          targetSection.classList.add("from-top");
        }

        // Trigger smooth slide into position
        setTimeout(() => {
          targetSection.classList.add("visible");
        }, 50);
      } else {
        // Slide away when leaving screen
        targetSection.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px"
  });

  observer.observe(targetSection);
}

document.addEventListener("DOMContentLoaded", () => {
  initSectionDirectionalReveal("#featured-projects-section");
  initSectionDirectionalReveal("#data-process");
});
  const nav = performance.getEntriesByType("navigation")[0];
  const isReload = nav ? nav.type === "reload"
                       : performance.navigation && performance.navigation.type === 1;
  if (isReload) window.location.replace("index.html");
  // Dark Mode Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-mode");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      
      // Save user preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
});
document.getElementById('rowLeft').innerHTML += document.getElementById('rowLeft').innerHTML;
  document.getElementById('rowRight').innerHTML += document.getElementById('rowRight').innerHTML;

  // Mimics your initSectionDirectionalReveal() so the whole preview
  // scrolls into view the same way #featured-projects-section does.
  function initSectionDirectionalReveal(sectionSelector) {
    const targetSection = document.querySelector(sectionSelector);
    if (!targetSection) return;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const isScrollingDown = currentScrollTop >= lastScrollTop;
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        if (entry.isIntersecting) {
          targetSection.classList.remove("from-top", "from-bottom");
          targetSection.classList.add(isScrollingDown ? "from-bottom" : "from-top");
          setTimeout(() => targetSection.classList.add("visible"), 50);
        } else {
          targetSection.classList.remove("visible");
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });
    observer.observe(targetSection);
  }
  initSectionDirectionalReveal("#testimonials");
document.addEventListener("DOMContentLoaded", () => {
  // Default to dark mode unless the user previously chose light mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme !== "light") {
    document.body.classList.add("dark-mode");
  }
});
