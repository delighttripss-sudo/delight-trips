/* ============================================================
   THEME-SLIDER.JS — CLEAN, ISOLATED, PRODUCTION
   Works with Scroll-Snap • Lighthouse Safe
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     1️⃣ THEME MOOD PICKER (UNCHANGED, SAFE)
  ============================================================ */
  const themeScroll = document.getElementById("themesScroll");
  const themePrev = document.getElementById("themePrev");
  const themeNext = document.getElementById("themeNext");

  if (themeScroll && themePrev && themeNext) {
    themeNext.addEventListener("click", () => {
      themeScroll.scrollBy({ left: 260, behavior: "smooth" });
    });

    themePrev.addEventListener("click", () => {
      themeScroll.scrollBy({ left: -260, behavior: "smooth" });
    });
  }

  /* ============================================================
     2️⃣ FEATURED SLIDER (UNCHANGED, SAFE)
  ============================================================ */
  initEliteSlider();

  function initEliteSlider() {
    const viewport = document.getElementById("featuredSlider");
    const track = viewport?.querySelector(".carousel-track");
    const cards = track?.querySelectorAll(".carousel-card");
    const nextBtn = document.getElementById("featNext");
    const prevBtn = document.getElementById("featPrev");

    if (!viewport || !track || !cards.length) return;

    let index = 0;
    let timer;

    const move = () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    };

    const next = () => {
      index = (index + 1) % cards.length;
      move();
    };

    const prev = () => {
      index = (index - 1 + cards.length) % cards.length;
      move();
    };

    const start = () => {
      clearInterval(timer);
      timer = setInterval(next, 4500);
    };

    const stop = () => clearInterval(timer);

    nextBtn?.addEventListener("click", () => {
      next();
      start();
    });

    prevBtn?.addEventListener("click", () => {
      prev();
      start();
    });

    viewport.addEventListener("mouseenter", stop);
    viewport.addEventListener("mouseleave", start);

    window.addEventListener("resize", move);

    start();
  }

  /* ============================================================
     3️⃣ TRENDING TOURS — REAL AUTOPLAY (FIXED)
     ✔ Scroll-Snap Compatible
     ✔ Visible Movement
     ✔ Stable
  ============================================================ */

  const tourCarousels = document.querySelectorAll(".tour-carousel");

  tourCarousels.forEach((carousel) => {
    const card = carousel.querySelector(".tour-card");
    if (!card) return;

    let isPaused = false;
    let timer;

    const gap = parseInt(getComputedStyle(carousel).gap) || 18;
    const step = card.offsetWidth + gap;

    const autoplay = () => {
      timer = setInterval(() => {
        if (isPaused) return;

        const maxScroll =
          carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft >= maxScroll - 5) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 3500);
    };

    const stop = () => clearInterval(timer);

    carousel.addEventListener("mouseenter", () => (isPaused = true));
    carousel.addEventListener("mouseleave", () => (isPaused = false));

    carousel.addEventListener("touchstart", () => (isPaused = true), {
      passive: true,
    });
    carousel.addEventListener("touchend", () => (isPaused = false));

    stop();
    autoplay();
  });

});
