/* ============================================
   ✅ MAIN.JS — LIGHTHOUSE OPTIMIZED
   Only real functionality, no wasted JS
============================================ */

/* ✅ Footer Year */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ✅ Theme Slider Controls (Correct IDs) */
document.addEventListener("DOMContentLoaded", () => {
  const scrollBox = document.getElementById("themesScroll");
  const prevBtn = document.getElementById("themePrev");
  const nextBtn = document.getElementById("themeNext");

  if (!scrollBox || !prevBtn || !nextBtn) return;

  const scrollStep = 320;

  prevBtn.addEventListener("click", () => {
    scrollBox.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    scrollBox.scrollBy({ left: scrollStep, behavior: "smooth" });
  });
});
