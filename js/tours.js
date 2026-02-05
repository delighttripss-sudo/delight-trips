/* ✅ Trending Tours Slider — FINAL WORKING */

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".carousel-btn[data-target]");

  buttons.forEach((btn) => {
    const target = btn.getAttribute("data-target");
    const carousel = document.getElementById(target);

    if (!carousel) return;

    btn.addEventListener("click", () => {
      const card = carousel.querySelector(".tour-card");
      if (!card) return;

      const step = card.offsetWidth + 18;

      carousel.scrollBy({
        left: btn.classList.contains("left") ? -step : step,
        behavior: "smooth",
      });
    });
  });
});
