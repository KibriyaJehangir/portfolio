// Shake animation on page load
window.addEventListener("load", () => {
  document.body.classList.add("shake-on-load");
  setTimeout(() => {
    document.body.classList.remove("shake-on-load");
  }, 500); // matches animation duration
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

// Certificates Loader (unified version)
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

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadCertificates();
  if (typeof enableCertificateSearch === "function") {
    enableCertificateSearch();
  }
});

// Timeline scroll reveal
const timelineItems = document.querySelectorAll('.timeline-item');

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
};

const handleScroll = () => {
  timelineItems.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
