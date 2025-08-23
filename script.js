
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

// Load certificates after page loads
window.addEventListener("DOMContentLoaded", loadCertificates);
