// Function to apply Directional Staggered Scroll Reveal to any selector
function initStaggeredScrollReveal(sectionSelector, elementSelector, delay = 150) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const elements = section.querySelectorAll(elementSelector);
  if (elements.length === 0) return;

  let timeouts = [];
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop > lastScrollTop;
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

      if (entry.isIntersecting) {
        // Clear active timeouts before starting a new reveal
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        const elementsArray = Array.from(elements);

        // Scroll DOWN -> Top-to-Bottom | Scroll UP -> Bottom-to-Top
        const elementsToAnimate = isScrollingDown 
          ? elementsArray 
          : elementsArray.reverse();

        elementsToAnimate.forEach((el, index) => {
          const t = setTimeout(() => {
            el.classList.add("visible");
          }, index * delay);
          timeouts.push(t);
        });
      } else {
        // Immediately reset elements when section leaves viewport
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        elements.forEach(el => {
          el.classList.remove("visible");
        });
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  observer.observe(section);
}

// Special handler for dynamic elements like Certificate Cards
function initDynamicCertificatesReveal() {
  const gigsContainer = document.querySelector("#gigs-container");
  if (!gigsContainer) return;

  // Run observer whenever cards exist or get loaded
  const applyCertObserver = () => {
    initStaggeredScrollReveal("#gigs", ".certificate-card", 150);
  };

  // Try applying immediately in case certificates are static
  applyCertObserver();

  // Watch for dynamic rendering inside #gigs-container
  const mutationObserver = new MutationObserver(() => {
    applyCertObserver();
  });

  mutationObserver.observe(gigsContainer, { childList: true });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // 1. About Section Text
  initStaggeredScrollReveal("#about", "h2, p", 150);

  // 2. Contact Section Text
  initStaggeredScrollReveal("#contact", "h2, p", 150);

  // 3. Certificates Section (Handles dynamic API rendering)
  initDynamicCertificatesReveal();
});
// Slide Projects Section In/Out from Right on Scroll
function initProjectsSectionReveal() {
  const projectsSection = document.querySelector("#projects");
  if (!projectsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Slide in from right
        projectsSection.classList.add("visible");
      } else {
        // Slide back out to right when out of view
        projectsSection.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.1,                // Triggers when 10% of section is visible
    rootMargin: "0px 0px -50px 0px" // Resets cleanly before completely leaving screen
  });

  observer.observe(projectsSection);
}

// Call inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initProjectsSectionReveal();
});
function initContactSectionReveal() {
  const contactSection = document.querySelector("#contact");
  if (!contactSection) return;

  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop >= lastScrollTop;
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

      if (entry.isIntersecting) {
        if (isScrollingDown) {
          contactSection.classList.remove("from-bottom");
          contactSection.classList.add("from-top");
        } else {
          contactSection.classList.remove("from-top");
          contactSection.classList.add("from-bottom");
        }

        setTimeout(() => {
          contactSection.classList.add("visible");
        }, 50);
      } else {
        contactSection.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.05
  });

  observer.observe(contactSection);
}

document.addEventListener("DOMContentLoaded", () => {
  initContactSectionReveal();
});
// Tab Switching Function for Data Analysis Process Card
function openProcessTab(evt, stepId) {
  // Hide all tab content
  const tabContents = document.querySelectorAll(".process-body .tab-content");
  tabContents.forEach(content => content.classList.remove("active"));

  // Remove "active" class from all tab buttons
  const tabBtns = document.querySelectorAll(".process-tabs .tab-btn");
  tabBtns.forEach(btn => btn.classList.remove("active"));

  // Show selected tab content and activate button
  document.getElementById(stepId).classList.add("active");
  evt.currentTarget.classList.add("active");
}
