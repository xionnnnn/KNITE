document.addEventListener("DOMContentLoaded", function () {
  // Initial fade-in
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 10);

  // Highlight current page in navigation
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf("/") + 1);

  document.querySelectorAll(".nav-list a").forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Enhanced CTA button interaction
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();
      handlePageTransition("gallery.html");
    });

    // Add ripple effect to button
    ctaButton.addEventListener("mousedown", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Enhanced smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced smooth page transition for navigation links
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Only apply smooth transition for internal HTML links
      if (href.endsWith(".html") || href === "/") {
        e.preventDefault();
        handlePageTransition(href);
      }
    });
  });

  // Improved page transition function
  function handlePageTransition(url) {
    // Create transition overlay if it doesn't exist
    let overlay = document.querySelector(".page-transition-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      document.body.appendChild(overlay);
    }

    // Start transition
    overlay.style.opacity = "1";

    // Wait for transition to complete before navigation
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }
});

// Handle back/forward navigation
window.addEventListener("pageshow", function (event) {
  // If page is loaded from cache, fade in
  if (event.persisted) {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 10);
  }

  // Reset transition overlay
  const overlay = document.querySelector(".page-transition-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
  }
});

// Handle page exit to ensure smooth transition
window.addEventListener("beforeunload", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";
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
