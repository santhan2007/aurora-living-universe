(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const canvas = document.querySelector("#starfield");
  const context = canvas.getContext("2d");
  const motionToggle = document.querySelector(".motion-toggle");
  const motionLabel = document.querySelector(".motion-label");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  const status = document.querySelector("#environment-status");
  const savedNote = document.querySelector("#saved-note");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let animationFrame;

  function readPreference(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }

  function savePreference(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (error) { return false; }
  }

  function setTheme(theme, announce = false) {
    root.dataset.theme = theme;
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const selected = button.dataset.themeChoice === theme;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const stored = savePreference("aurora-theme", theme);
    if (announce) savedNote.textContent = stored ? "Your signal is saved locally." : "Signal changed for this visit.";
  }

  function setMotion(enabled) {
    body.classList.toggle("motion-off", !enabled);
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionLabel.textContent = enabled ? "Motion on" : "Motion off";
    savePreference("aurora-motion", enabled ? "on" : "off");
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 8)) }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + .2, alpha: Math.random() * .65 + .15, drift: Math.random() * .18 + .03
    }));
  }

  function drawStars() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((star) => {
      context.beginPath();
      context.fillStyle = `rgba(220, 237, 255, ${star.alpha})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
      if (!body.classList.contains("motion-off")) {
        star.y -= star.drift;
        if (star.y < -2) star.y = window.innerHeight + 2;
      }
    });
    if (!body.classList.contains("motion-off") && !prefersReducedMotion) animationFrame = requestAnimationFrame(drawStars);
  }

  const environmentNames = { quiet: "Quiet Tide is surrounding you", velvet: "Velvet Dream is unfolding", electric: "Electric Pulse is online" };
  document.querySelectorAll("[data-environment]").forEach((button) => {
    button.addEventListener("click", () => {
      const environment = button.dataset.environment;
      setTheme(environment, true);
      document.querySelectorAll("[data-environment]").forEach((card) => {
        const selected = card === button;
        card.classList.toggle("is-selected", selected);
        card.setAttribute("aria-pressed", String(selected));
      });
      status.textContent = environmentNames[environment];
    });
  });

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeChoice, true));
  });
  motionToggle.addEventListener("click", () => setMotion(body.classList.contains("motion-off")));
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("is-open", !open);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
  window.addEventListener("resize", () => { cancelAnimationFrame(animationFrame); resizeCanvas(); drawStars(); });

  setTheme(readPreference("aurora-theme") || "quiet");
  setMotion(!prefersReducedMotion && readPreference("aurora-motion") !== "off");
  resizeCanvas();
  drawStars();
})();
