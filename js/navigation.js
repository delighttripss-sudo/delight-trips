document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("site-header");
  const body = document.body;

  // ❌ If no header placeholder, do nothing
  if (!headerContainer) return;

  // ✅ Prevent double-injection (CRITICAL FIX)
  if (headerContainer.dataset.loaded === "true") return;
  headerContainer.dataset.loaded = "true";

  Promise.all([
    fetch("/partials/header.html").then((r) => r.text()),
    fetch("/partials/mobile-menu.html").then((r) => r.text()),
  ])
    .then(([headerHTML, mobileHTML]) => {
      // Inject header
      headerContainer.innerHTML = headerHTML;

      // Inject mobile menu ONLY if not already present
      if (!document.getElementById("mobileMenu")) {
        body.insertAdjacentHTML("beforeend", mobileHTML);
      }

      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      const overlay = document.getElementById("mobileOverlay");
      const closeMenu = document.getElementById("closeMenu");

      // ❌ If any critical element missing, stop
      if (!menuToggle || !mobileMenu || !overlay) return;

      // ===============================
      // OPEN / CLOSE FUNCTIONS
      // ===============================

      const openMenu = (e) => {
        e.stopPropagation(); // ✅ prevents instant close
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        body.style.overflow = "hidden";
      };

      const closeMenuFn = () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        body.style.overflow = "";
      };

      // ===============================
      // EVENT BINDINGS
      // ===============================

      menuToggle.addEventListener("click", openMenu);
      overlay.addEventListener("click", closeMenuFn);

      if (closeMenu) {
        closeMenu.addEventListener("click", closeMenuFn);
      }

      document
        .querySelectorAll(".mobile-nav-list a")
        .forEach((link) => link.addEventListener("click", closeMenuFn));

      // ===============================
      // SAFETY: ESC KEY CLOSE
      // ===============================

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeMenuFn();
        }
      });
    })
    .catch((err) => {
      console.error("Navigation load failed:", err);
    });
});
