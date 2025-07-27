// Page transition
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const infoSections = document.querySelectorAll(".info-section");
  const infoItems = document.querySelectorAll(".info-item");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  infoSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  infoItems.forEach((item) => {
    itemObserver.observe(item);
  });

  // Handle typing animation completion
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    // Wait for animation to complete before removing effects
    setTimeout(() => {
      typingText.style.borderRight = "none";
      typingText.style.whiteSpace = "normal";
      typingText.style.overflow = "visible";
      typingText.style.display = "inline";
    }, 4000); // Match this with the typing animation duration
  }

  // Ripple effect for buttons
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

fetch("nav.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;

    // Mobile menu functionality
    const menuButton = document.querySelector(".mobile-menu-button");
    const navList = document.querySelector(".nav-list");

    if (menuButton && navList) {
      menuButton.addEventListener("click", function () {
        navList.classList.toggle("active");
        menuButton.innerHTML = navList.classList.contains("active")
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });
    }

    // Active page highlighting
    function setActivePage() {
      const path = window.location.pathname;
      let currentPage = path.split("/").pop();
      currentPage = currentPage.replace(".html", "");

      if (currentPage === "" || currentPage === "/") {
        currentPage = "index";
      }

      document.querySelectorAll(".nav-list a").forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav-list a[data-page="${currentPage}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }

    setActivePage();

    // Click handler for navigation links
    document.querySelectorAll(".nav-list a").forEach((link) => {
      link.addEventListener("click", function (e) {
        document.querySelectorAll(".nav-list a").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");

        if (navList && navList.classList.contains("active")) {
          navList.classList.remove("active");
          menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  });
