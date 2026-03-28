document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark Mode Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");
  const sunIcons = document.querySelectorAll('[data-lucide="sun"]');
  const moonIcons = document.querySelectorAll('[data-lucide="moon"]');

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
      sunIcons.forEach((i) => i.classList.remove("hidden"));
      moonIcons.forEach((i) => i.classList.add("hidden"));
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      sunIcons.forEach((i) => i.classList.add("hidden"));
      moonIcons.forEach((i) => i.classList.remove("hidden"));
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(savedTheme === "dark");

  [themeToggleBtn, mobileThemeToggleBtn].forEach(btn => {
    btn?.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(!isDark);
    });
  });

  // 2. Navigation & Mobile Drawer
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMenu = () => mobileMenu.classList.toggle("translate-x-full");

  menuBtn?.addEventListener("click", toggleMenu);
  closeBtn?.addEventListener("click", toggleMenu);
  mobileLinks.forEach(link => link.addEventListener("click", toggleMenu));

  // 3. Scroll Spy & Navbar Shadow
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) link.classList.add("active");
    });

    header.classList.toggle("shadow-lg", window.scrollY > 50);
  });

  // 4. Reveal Animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // 5. Contact Form Simulation
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button");
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span class="animate-spin inline-block h-5 w-5 border-b-2 border-white rounded-full"></span> Envoi...';

    setTimeout(() => {
      feedback.classList.remove("hidden");
      feedback.className = "text-center p-4 rounded-xl bg-green-500/10 text-green-500";
      feedback.innerText = "Message envoyé avec succès !";
      btn.innerHTML = originalText;
      btn.disabled = false;
      contactForm.reset();
    }, 1500);
  });

  // 6. Lucide Icons
  lucide.createIcons();
});