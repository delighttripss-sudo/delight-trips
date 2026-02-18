/* ============================================
   ✅ MAIN.JS — WORLD CLASS + LIGHTHOUSE SAFE
   Only real functionality, no wasted JS
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     Footer Year
  =============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===============================
     Theme Horizontal Slider
  =============================== */
  const scrollBox = document.getElementById("themesScroll");
  const prevBtn = document.getElementById("themePrev");
  const nextBtn = document.getElementById("themeNext");

  if (scrollBox && prevBtn && nextBtn) {
    const scrollStep = 320;

    prevBtn.addEventListener("click", () => {
      scrollBox.scrollBy({ left: -scrollStep, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      scrollBox.scrollBy({ left: scrollStep, behavior: "smooth" });
    });
  }

  /* ===============================
     Hero Slider (Auto Fade)
  =============================== */
  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length > 1) {
    let index = 0;
    const interval = 6000; // 6 seconds

    setInterval(() => {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, interval);
  }
});
