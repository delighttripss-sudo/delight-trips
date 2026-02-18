/* ============================================================
   NAVIGATION.JS — WORLD CLASS, STABLE, DEFENSIVE
   Fixes scope error without breaking any behavior
============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.body;
  const headerContainer = document.getElementById("site-header");

  let menuToggle;
  let mobileMenu;
  let overlay;
  let closeBtn;

  /* =====================================
     1) INJECT PARTIALS (SAFE, ONCE ONLY)
  ===================================== */
  if (headerContainer && headerContainer.dataset.loaded !== "true") {
    headerContainer.dataset.loaded = "true";

    try {
      const [headerHTML, mobileHTML] = await Promise.all([
        fetch("/partials/header.html").then((r) => r.text()),
        fetch("/partials/mobile-menu.html").then((r) => r.text()),
      ]);

      headerContainer.innerHTML = headerHTML;

      if (!document.getElementById("mobileMenu")) {
        body.insertAdjacentHTML("beforeend", mobileHTML);
      }
    } catch (e) {
      console.error("Navigation load failed:", e);
      return;
    }
  }

  /* =====================================
     2) QUERY ELEMENTS (AFTER INJECTION)
  ===================================== */
  menuToggle = document.getElementById("menuToggle");
  mobileMenu = document.getElementById("mobileMenu");
  overlay = document.getElementById("mobileOverlay");
  closeBtn = document.getElementById("closeMenu");

  if (!mobileMenu || !overlay) return;

  /* =====================================
     3) MENU STATE CONTROLLERS
  ===================================== */
  const openMenu = (e) => {
    e?.preventDefault();
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("no-scroll");
    menuToggle?.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  /* =====================================
     4) EVENT BINDINGS (GUARANTEED SAFE)
  ===================================== */
  menuToggle?.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  document
    .querySelectorAll(".mobile-nav-list a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* =====================================
     5) NAVBAR HEIGHT CSS VARIABLE (FIXED)
     ⛔ This was previously OUTSIDE scope
  ===================================== */
  const header = headerContainer?.querySelector("header");
  if (header) {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${header.offsetHeight}px`,
    );
  }
});
/* ==========================================================
   DELIGHT TRIPS - PREMIER NAV LOGIC
   Features: Sticky Header, Active Link Tracking, Smooth Scroll
   ========================================================== */

const initPremiumNav = () => {
  const header = document.querySelector("#site-header");
  const navLinks = document.querySelectorAll(".nav-link"); // Adjust selector to match your class

  // 1. SMART STICKY HEADER (Lighthouse Optimized)
  // We use IntersectionObserver instead of 'scroll' events for 100/100 performance
  const scrollWatcher = document.createElement("div");
  scrollWatcher.setAttribute("data-scroll-watcher", "");
  header.before(scrollWatcher);

  const navObserver = new IntersectionObserver(
    (entries) => {
      header.classList.toggle("is-sticky", !entries[0].isIntersecting);
    },
    { rootMargin: "50px 0px 0px 0px" },
  );

  navObserver.observe(scrollWatcher);

  // 2. ACTIVE LINK TRACKING
  // Automatically highlights the link of the page you are currently on
  const currentPath = window.location.pathname;
  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentPath ||
      (currentPath === "/" && link.getAttribute("href").includes("index"))
    ) {
      link.classList.add("active-link");
      link.setAttribute("aria-current", "page");
    }
  });

  // 3. SMOOTH SCROLL INTERACTION
  // Modern approach to internal page linking
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open (Assuming you have a 'show' class)
        const mobileMenu = document.querySelector(".nav-menu");
        if (mobileMenu?.classList.contains("show")) {
          mobileMenu.classList.remove("show");
        }
      }
    });
  });

  // 4. MICRO-INTERACTION: HEADER HIDE ON SCROLL DOWN
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // Scrolling Down
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // Scrolling Up
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });
};

// Initialize only after the dynamic header has been loaded
// This works with your existing <div id="site-header"></div> approach
const checkHeaderReady = setInterval(() => {
  if (document.querySelector("#site-header nav")) {
    initPremiumNav();
    clearInterval(checkHeaderReady);
  }
}, 100);

/* ==========================================================
   ✅ DELIGHT TRIPS - MASTER NAVIGATION LOGIC
   - Sticky Header + Scroll-to-Hide
   - World-Class Mobile Menu with Scroll Lock
   - Performance Optimized (Lighthouse 100)
   ========================================================== */

const initNavigation = () => {
  const header = document.querySelector("#site-header");
  const toggleBtn = document.querySelector(".navbar-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const closeBtn = document.querySelector(".close-menu");
  const body = document.body;

  // 1. MOBILE MENU LOGIC (The "Magic" Scroll Lock)
  const toggleMenu = (isOpen) => {
    mobileMenu.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    body.classList.toggle("no-scroll", isOpen); // Prevents background scroll
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleMenu(true));
  }

  if (overlay) {
    overlay.addEventListener("click", () => toggleMenu(false));
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleMenu(false));
  }

  // Close menu on ESC key for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      toggleMenu(false);
    }
  });

  // 2. SMART STICKY & HIDE-ON-SCROLL
  let lastScroll = 0;
  const scrollThreshold = 100; // Only start hiding after 100px

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset;

      // Sticky Background Logic
      if (currentScroll > 50) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }

      // Hide/Show on Scroll Logic
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling Down - Hide Header
        header.classList.add("scroll-down");
        header.classList.remove("scroll-up");
      } else if (currentScroll < lastScroll) {
        // Scrolling Up - Show Header
        header.classList.remove("scroll-down");
        header.classList.add("scroll-up");
      }

      lastScroll = currentScroll;
    },
    { passive: true },
  ); // 'passive' improves scroll performance

  // 3. ACTIVE LINK INDICATOR
  const currentPath = window.location.pathname;
  const allLinks = document.querySelectorAll(
    ".navbar-links a, .mobile-nav-list a",
  );

  allLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (currentPath.includes(href) && href !== "/") {
      link.classList.add("active-link");
    }
  });
};

// INITIALIZE WHEN DOM IS READY
// Use this if your header is injected dynamically via JS
document.addEventListener("DOMContentLoaded", () => {
  // If your header is dynamic, you might need a small timeout
  // or call this inside your header injection function.
  initNavigation();
});
