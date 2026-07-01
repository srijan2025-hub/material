/* ==========================================================================
   JEE PORTAL — SHARED JS
   Handles: theme (day/night) persistence, tab switching, scroll progress.
   Linked from every chapter page. Do not duplicate this logic inline.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- 1. THEME (day / night) ---------- */

  const THEME_KEY = "jee-portal-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* storage unavailable — theme just won't persist */
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      const icon = toggle.querySelector(".icon");
      const label = toggle.querySelector(".label");
      if (icon) icon.textContent = theme === "night" ? "\u2600\uFE0F" : "\u{1F319}";
      if (label) label.textContent = theme === "night" ? "Day mode" : "Night mode";
      toggle.setAttribute("aria-pressed", theme === "night" ? "true" : "false");
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    const theme = stored || (systemPrefersDark() ? "night" : "day");
    applyTheme(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "day";
    const next = current === "day" ? "night" : "day";
    applyTheme(next);
    setStoredTheme(next);
  }

  /* Apply theme immediately (before DOMContentLoaded) to avoid a flash of the wrong theme */
  initTheme();

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    /* ---------- 2. TAB SWITCHING ---------- */

    const tabButtons = document.querySelectorAll(".tab-btn[data-tab]");
    const tabPanels = document.querySelectorAll(".tab-panel[data-tab-panel]");

    function activateTab(tabId, updateHash) {
      tabButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.getAttribute("data-tab-panel") === tabId);
      });
      if (updateHash) {
        history.replaceState(null, "", "#" + tabId);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    if (tabButtons.length) {
      tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => activateTab(btn.getAttribute("data-tab"), true));
      });

      const initial = window.location.hash ? window.location.hash.slice(1) : null;
      const validInitial = initial && document.querySelector('.tab-btn[data-tab="' + initial + '"]');
      activateTab(validInitial ? initial : tabButtons[0].getAttribute("data-tab"), false);
    }

    /* ---------- 3. SIDEBAR SMOOTH SCROLL (Full Notes style pages, if present) ---------- */

    document.querySelectorAll(".sidebar-nav a[href^='#']").forEach((link) => {
      link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    /* ---------- 4. COLLAPSIBLE SECTIONS ---------- */

    document.querySelectorAll("[data-collapse-toggle]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-collapse-toggle");
        const target = document.getElementById(targetId);
        if (!target) return;
        const isOpen = target.classList.toggle("open");
        this.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  });

  /* ---------- 5. SCROLL PROGRESS BAR ---------- */

  function updateProgressBar() {
    const bar = document.querySelector(".progress-bar");
    if (!bar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }

  window.addEventListener("scroll", updateProgressBar, { passive: true });
  window.addEventListener("resize", updateProgressBar);
  document.addEventListener("DOMContentLoaded", updateProgressBar);
})();
