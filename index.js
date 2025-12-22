// Set footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mainNav.classList.remove("open");
      }
    });
  }

  // Smooth scrolling for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to top button
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Simple FAQ toggle on mobile
  document.querySelectorAll(".faq-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  // Offer form mock submit
  const offerForm = document.getElementById("offerForm");
  const offerSuccess = document.getElementById("offerFormSuccess");
  if (offerForm && offerSuccess) {
    offerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { valid } = validateForm(offerForm);
      if (!valid) return;

      console.log("Offer form data:", Object.fromEntries(new FormData(offerForm)));
      offerSuccess.textContent =
        "Thank you! Our team will contact you shortly with the best offer.";
      offerForm.reset();

      setTimeout(() => {
        offerSuccess.textContent = "";
      }, 6000);
    });
  }

  // Contact form mock submit
  const contactForm = document.getElementById("contactForm");
  const contactSuccess = document.getElementById("contactFormSuccess");
  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { valid } = validateForm(contactForm);
      if (!valid) return;

      console.log("Contact form data:", Object.fromEntries(new FormData(contactForm)));
      contactSuccess.textContent =
        "Thank you for contacting us. We will get back to you soon.";
      contactForm.reset();

      setTimeout(() => {
        contactSuccess.textContent = "";
      }, 6000);
    });
  }
});

// Basic client-side validation
function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll("[required]");
  fields.forEach((field) => {
    const errorEl = form.querySelector(
      `.form__error[data-error-for="${field.id}"]`
    );
    let msg = "";
    if (!field.value.trim()) {
      msg = "This field is required.";
    } else if (
      field.type === "tel" &&
      !/^[0-9]{10}$/.test(field.value.trim())
    ) {
      msg = "Enter a valid 10-digit mobile number.";
    } else if (field.type === "email") {
      const v = field.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        msg = "Enter a valid email address.";
      }
    }

    if (errorEl) {
      errorEl.textContent = msg;
    }
    if (msg) {
      valid = false;
    }
  });

  return { valid };
}