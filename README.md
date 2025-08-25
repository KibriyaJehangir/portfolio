# 🌟 Personal Portfolio Website

#### Live Demo: (https://kibriyajehangir.github.io/portfolio)

Welcome to my personal portfolio website! This project is built using **HTML**, **CSS**, and **JavaScript** to showcase my skills, achievements, and certificates in a clean, responsive layout.

## 🔧 Technologies Used

- **HTML5** – Semantic structure and layout
- **CSS3** – Custom styling and responsive design
- **JavaScript** – Basic interactivity and DOM manipulation

## 📁 Folder Structure

portfolio/ ├── index.html # Main webpage ├── style.css # Custom styles ├── script.js # JavaScript functionality ├── assets/ # Images and media files └── certificates/ # Certificate images/documents



## 🚀 Features

- ✅ Responsive design for desktop and mobile
- ✅ Certificate showcase section
- ✅ Smooth scrolling and basic animations
- ✅ GitHub integration: **automatically displays latest public repositories**
- ✅ Easy-to-edit structure for personalization

## 🔄 Automatic GitHub Updates

Whenever a new public repository is added to my GitHub account, it will **automatically appear** on the portfolio website. This is powered by the **GitHub REST API**, which fetches and displays my latest projects dynamically.

### Example Code Snippet (in `script.js`)
```javascript
fetch('https://api.github.com/users/KibriyaJehangir/repos')
  .then(response => response.json())
  .then(repos => {
    const container = document.getElementById('projects');
    repos.forEach(repo => {
      const item = document.createElement('div');
      item.className = 'repo';
      item.innerHTML = `<h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3><p>${repo.description || ''}</p>`;
      container.appendChild(item);
    });
  });
thub.com/KibriyaJehangir/portfolio.git
