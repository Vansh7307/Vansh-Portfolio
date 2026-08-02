const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

const cursorGlow = document.querySelector(".cursor-glow");
const cursorRing = document.querySelector(".cursor-ring");
const cursorDot = document.querySelector(".cursor-dot");

const profileOpen = document.getElementById("profileOpen");
const profileModal = document.getElementById("profileModal");
const profileClose = document.getElementById("profileClose");
const profileOverlay = document.querySelector(".profile-modal-overlay");

const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

const interactiveElements = document.querySelectorAll(
  "a, button, .nav-profile, .project-card, .about-card, .skill-column, .education-card, .achievement-card, .youtube-card"
);

const spotlightCards = document.querySelectorAll(".spotlight-card");
const magneticButtons = document.querySelectorAll(".interactive-button");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isFinePointer = window.matchMedia("(pointer: fine)").matches;

/* MOBILE MENU */

const closeMobileMenu = () => {
  navLinks.classList.remove("active");

  const icon = menuBtn.querySelector("i");

  if (icon) {
    icon.className = "ri-menu-3-line";
  }

  menuBtn.setAttribute("aria-expanded", "false");
};

const toggleMobileMenu = () => {
  navLinks.classList.toggle("active");

  const icon = menuBtn.querySelector("i");
  const isOpen = navLinks.classList.contains("active");

  if (icon) {
    icon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
  }

  menuBtn.setAttribute("aria-expanded", String(isOpen));
};

menuBtn.addEventListener("click", toggleMobileMenu);

navItems.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* NAVBAR SCROLL STATE */

const updateNavbar = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
};

window.addEventListener("scroll", updateNavbar, { passive: true });
window.addEventListener("load", updateNavbar);

/* ACTIVE NAVIGATION LINK */

const updateActiveNavigation = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === currentSection);
  });
};

window.addEventListener("scroll", updateActiveNavigation, {
  passive: true
});

window.addEventListener("load", updateActiveNavigation);

/* PREMIUM CURSOR */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

let glowX = mouseX;
let glowY = mouseY;

const updateCursorPosition = (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  document.body.classList.add("cursor-active");

  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
};

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  glowX += (mouseX - glowX) * 0.09;
  glowY += (mouseY - glowY) * 0.09;

  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;

  cursorGlow.style.left = `${glowX}px`;
  cursorGlow.style.top = `${glowY}px`;

  requestAnimationFrame(animateCursor);
};

if (isFinePointer && !prefersReducedMotion) {
  window.addEventListener("mousemove", updateCursorPosition);

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
  });

  window.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-active");
  });

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  animateCursor();
}

/* PROFILE MODAL */

const openProfileModal = () => {
  profileModal.classList.add("active");
  document.body.classList.add("modal-open");

  profileClose.focus();
};

const closeProfileModal = () => {
  profileModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  profileOpen.focus();
};

profileOpen.addEventListener("click", openProfileModal);

profileOpen.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openProfileModal();
  }
});

profileClose.addEventListener("click", closeProfileModal);
profileOverlay.addEventListener("click", closeProfileModal);

window.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    profileModal.classList.contains("active")
  ) {
    closeProfileModal();
  }
});

/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-card, .skill-column, .project-card, .education-card, .achievement-card, .certification-box, .youtube-card, .contact-box"
);

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}

/* CARD SPOTLIGHT */

if (isFinePointer && !prefersReducedMotion) {
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* SUBTLE 3D PROJECT CARD TILT */

if (isFinePointer && !prefersReducedMotion) {
  const tiltCards = document.querySelectorAll(
    ".project-card, .education-card, .achievement-card, .youtube-card"
  );

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2.2;
      const rotateY = ((x - centerX) / centerX) * 2.2;

      card.style.transform = `
        perspective(1000px)
        translateY(-8px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* MAGNETIC BUTTONS */

if (isFinePointer && !prefersReducedMotion) {
  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const bounds = button.getBoundingClientRect();

      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

/* HERO PARALLAX */

const heroCard = document.querySelector(".hero-card");
const heroContent = document.querySelector(".hero-content");

if (isFinePointer && !prefersReducedMotion) {
  const hero = document.querySelector(".hero");

  hero.addEventListener("mousemove", (event) => {
    const bounds = hero.getBoundingClientRect();

    const normalizedX =
      (event.clientX - bounds.left) / bounds.width - 0.5;

    const normalizedY =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    heroCard.style.transform = `
      translate3d(
        ${normalizedX * 9}px,
        ${normalizedY * 7}px,
        0
      )
    `;

    heroContent.style.transform = `
      translate3d(
        ${normalizedX * -4}px,
        ${normalizedY * -3}px,
        0
      )
    `;
  });

  hero.addEventListener("mouseleave", () => {
    heroCard.style.transform = "";
    heroContent.style.transform = "";
  });
}

/* CLOSE MENU WHEN SCREEN BECOMES DESKTOP */

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) {
    closeMobileMenu();
  }
});

/* SUPABASE CONTACT FORM */

const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const contactFormStatus = document.getElementById("contactFormStatus");

const setFormStatus = (message, type = "info") => {
  if (!contactFormStatus) {
    return;
  }

  contactFormStatus.textContent = message;
  contactFormStatus.className = `form-status ${type}`;
};

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      setFormStatus("Please fill in all fields.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormStatus("Please enter a valid email address.", "error");
      return;
    }

    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.classList.add("form-submitting");
    }

    setFormStatus("Sending...");

    const supabase = window.supabaseClient;

    const { error } = await supabase.insert("contact_messages", {
      name,
      email,
      message,
      created_at: new Date().toISOString()
    });

    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = false;
      contactSubmitBtn.classList.remove("form-submitting");
    }

    if (error) {
      setFormStatus(
        "Supabase is not configured yet. Please email me directly instead.",
        "error"
      );
      return;
    }

    setFormStatus("Message sent! I’ll get back to you soon.", "success");
    contactForm.reset();
  });
}
