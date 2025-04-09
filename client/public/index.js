document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
  });

  // Add scroll class to navbar on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Add active class to current nav item
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      currentLocation === linkPath ||
      (linkPath !== "/" && currentLocation.startsWith(linkPath))
    ) {
      link.classList.add("active");
    }
  });

  // Form validation and submission feedback
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Show submission feedback for contact form
        if (form.id === "contactForm") {
          e.preventDefault();
          showFormSubmissionFeedback(form);
        }
      }
      form.classList.add("was-validated");
    });
  });

  // Simulate form submission feedback
  function showFormSubmissionFeedback(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Update button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.classList.add("success");

      // Reset form
      form.reset();
      form.classList.remove("was-validated");

      // Reset button after delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("success");
      }, 3000);
    }, 1500);
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll(".card-dark");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("card-hover");
    });
  });

  // Enable tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // File upload preview
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const fileName = this.files[0]?.name;
      const fileLabel = this.nextElementSibling;

      if (fileName) {
        if (fileLabel.tagName === "LABEL") {
          const span = fileLabel.nextElementSibling;
          if (span) {
            span.textContent = fileName;
            span.classList.add("file-selected");
          }
        }
      }
    });
  });

  // Add CSS classes for page transitions
  document.body.classList.add("page-loaded");
});

// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Handle navbar toggler animation
const navbarToggler = document.querySelector(".navbar-toggler");
if (navbarToggler) {
  navbarToggler.addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

// Add additional CSS classes for animations
window.addEventListener("load", function () {
  // Animate elements that are in viewport on page load
  const animateElements = document.querySelectorAll(
    ".animate-fade-in, .animate-fade-in-left, .animate-fade-in-right, .animate-zoom-in"
  );

  animateElements.forEach((element) => {
    // Add a small delay before animation to ensure smooth page transition
    setTimeout(() => {
      element.classList.add("visible");
    }, 100);
  });
});
