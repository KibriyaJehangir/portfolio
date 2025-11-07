
  window.addEventListener("load", () => {
    document.body.classList.add("shake-on-load");

    // Remove the class after animation ends (so it won’t repeat)
    setTimeout(() => {
      document.body.classList.remove("shake-on-load");
    }, 500); // matches animation duration
  });


const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
  const username = "KibriyaJehangir"; // <-- Replace with your GitHub username
    const projectCountElem = document.getElementById("project-count");
    const projectsContainer = document.getElementById("projects");

    async function fetchProjects() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await response.json();

        projectCountElem.textContent = repos.length;

        repos.forEach(repo => {
          const projectDiv = document.createElement("div");
          projectDiv.className = "project";

          projectDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description"}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            <a href="${repo.html_url}" target="_blank">Open Repo</a>
          `;

          projectsContainer.appendChild(projectDiv);
        });
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        projectCountElem.textContent = "Error";
      }
    }

    fetchProjects();
async function loadCertificates() {
  const repo = "KibriyaJehangir/portfolio"; // Replace with your GitHub repo
  const folder = "certificates";
  const branch = "main"; 
  const url = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
  const verificationFile = `https://raw.githubusercontent.com/${repo}/${branch}/${folder}/verification.txt`;

  try {
    // Fetch certificate files
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const files = await response.json();

    // Fetch verification links
    const verResponse = await fetch(verificationFile);
    const verText = await verResponse.text();
    const verLinks = verText.split('\n').map(line => line.trim());

    const container = document.getElementById("certificates");
    container.innerHTML = "";

    let certIndex = 0; // index to match verification links

    files.forEach(file => {
      // Skip verification.txt itself
      if(file.name.toLowerCase() === "verification.txt") return;

      const name = file.name.split(".")[0];
      const card = document.createElement("div");
      card.className = "certificate-card";

      let verLink = verLinks[certIndex] || "#"; // get link from txt file
      certIndex++;

      // Add https:// if missing (fixes localhost errors)
      if (verLink && !verLink.startsWith("http://") && !verLink.startsWith("https://")) {
        verLink = "https://" + verLink;
      }

      if (file.name.match(/\.(jpg|jpeg|png)$/i)) {
        card.innerHTML = `
          <h3>${name}</h3>
          <img src="${file.download_url}" alt="${name}">
          <div class="buttons">
            <a href="${file.download_url}" target="_blank" rel="noopener noreferrer">View Image</a>
            <a href="${verLink}" target="_blank" rel="noopener noreferrer">Verify</a>
          </div>
        `;
      } else if (file.name.match(/\.pdf$/i)) {
        card.innerHTML = `
          <h3>${name}</h3>
          <div class="buttons">
            <a href="${file.download_url}" target="_blank" rel="noopener noreferrer">View PDF</a>
            <a href="${verLink}" target="_blank" rel="noopener noreferrer">Verify</a>
          </div>
        `;
      }

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading certificates:", error);
    document.getElementById("certificates").innerHTML = "<p>Failed to load certificates.</p>";
  }
}

// ----------------- Load Certificates -----------------
async function loadCertificates() {
  const repo = "KibriyaJehangir/portfolio";
  const folder = "certificates";
  const branch = "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;

  const container = document.getElementById("gigs-container");
  const countEl = document.getElementById("gig-count");

  if (!container) return;

  container.innerHTML = "Loading...";
  if (countEl) countEl.textContent = "Loading...";

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
    const files = await res.json();

    // Filter image files only
    const images = files.filter(f => /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name));

    container.innerHTML = "";
    let count = 0;

    images.forEach(file => {
      const filename = file.name;
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

      // create anchor for full screen
      const a = document.createElement("a");
      a.href = file.download_url;
      a.target = "_blank"; // open in new tab
      a.rel = "noopener noreferrer";
      a.className = "certificate-card";

      // create image
      const img = document.createElement("img");
      img.src = file.download_url;
      img.alt = title;

      // create overlay title
      const h3 = document.createElement("h3");
      h3.textContent = title;
      h3.className = "overlay-title";

      a.appendChild(img);
      a.appendChild(h3);
      container.appendChild(a);

      count++;
    });

    if (countEl) countEl.textContent = count;
    if (count === 0) container.innerHTML = "<p>No certificate images found.</p>";

  } catch (err) {
    console.error("Error loading certificates:", err);
    container.innerHTML = `<p style="color:red">Failed to load certificates: ${err.message}</p>`;
    if (countEl) countEl.textContent = "0";
  }
}

// ----------------- Certificate Search -----------------
function enableCertificateSearch() {
  const searchInput = document.getElementById("gig-search");
  const container = document.getElementById("gigs-container");

  if (!searchInput || !container) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll(".certificate-card");

    let visibleCount = 0;
    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    document.getElementById("gig-count").textContent = visibleCount;
  });
}

// ----------------- Init -----------------
document.addEventListener("DOMContentLoaded", () => {
  loadCertificates();
  enableCertificateSearch();
});
// JavaScript to detect when an item is in the viewport and add the 'visible' class

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

// Run the scroll detection on page load and scroll
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll); // Initial check when the page loads
// JavaScript to handle the toggle of the burger menu

burger.addEventListener('click', () => {
    // Toggle the 'open' class on the burger
    burger.classList.toggle('open');
    // Toggle the display of nav links
    navLinks.classList.toggle('open');
});
