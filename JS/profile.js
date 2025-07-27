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