/* ============================================================
   THEME-SLIDER.JS — RECTIFIED PRODUCTION VERSION
   ✔ Fixed: No blank slides
   ✔ Fixed: Button alignment & interaction
   ✔ Feature: Synchronized Scroll Logic
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- UNIVERSAL CAROUSEL HANDLER ---
  // This works for BOTH Trending (.tour-carousel) and Spiritual (.carousel-track)
  const initCarousel = (
    trackSelector,
    viewportSelector,
    nextBtnId,
    prevBtnId,
  ) => {
    const track = document.querySelector(trackSelector);
    const viewport = document.querySelector(viewportSelector) || track;
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);

    if (!track) return;

    const getStep = () => {
      const firstCard = track.firstElementChild;
      const gap = parseInt(window.getComputedStyle(track).gap) || 0;
      return firstCard ? firstCard.offsetWidth + gap : 0;
    };

    let timer;
    let isPaused = false;

    const startAutoplay = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (isPaused) return;

        const step = getStep();
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 4500);
    };

    const stopAutoplay = () => clearInterval(timer);

    // Click Events
    nextBtn?.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
      startAutoplay(); // Reset timer on click
    });

    prevBtn?.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
      startAutoplay();
    });

    // Pause on Hover / Touch
    track.addEventListener("mouseenter", () => (isPaused = true));
    track.addEventListener("mouseleave", () => (isPaused = false));
    track.addEventListener("touchstart", () => (isPaused = true), {
      passive: true,
    });
    track.addEventListener("touchend", () => (isPaused = false), {
      passive: true,
    });

    startAutoplay();
  };

  // --- 1. INITIALIZE SPIRITUAL JOURNEYS ---
  initCarousel("#spiritual-track", "#featuredSlider", "featNext", "featPrev");

  // --- 2. INITIALIZE TRENDING TOURS (DOMESTIC) ---
  // Since Trending has multiple rows, we use your existing loop logic:
  const trendingCarousels = document.querySelectorAll(".tour-carousel");
  trendingCarousels.forEach((carousel) => {
    const wrapper = carousel.closest(".tour-carousel-wrapper");
    const nextBtn = wrapper?.querySelector(".carousel-btn.right");
    const prevBtn = wrapper?.querySelector(".carousel-btn.left");

    if (!carousel) return;

    let timer;
    const startAutoplay = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        const firstCard = carousel.querySelector(".destination-card");
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 28;
        const step = firstCard.offsetWidth + gap;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft >= maxScroll - 10) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 3500);
    };

    nextBtn?.addEventListener("click", () => {
      const firstCard = carousel.querySelector(".destination-card");
      const gap = parseInt(window.getComputedStyle(carousel).gap) || 28;
      carousel.scrollBy({
        left: firstCard.offsetWidth + gap,
        behavior: "smooth",
      });
      startAutoplay();
    });

    prevBtn?.addEventListener("click", () => {
      const firstCard = carousel.querySelector(".destination-card");
      const gap = parseInt(window.getComputedStyle(carousel).gap) || 28;
      carousel.scrollBy({
        left: -(firstCard.offsetWidth + gap),
        behavior: "smooth",
      });
      startAutoplay();
    });

    startAutoplay();
  });
});
