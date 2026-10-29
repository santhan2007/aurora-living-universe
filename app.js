(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const canvas = document.querySelector("#starfield");
<<<<<<< HEAD
  const context = canvas?.getContext("2d");
=======
  const context = canvas.getContext("2d");
>>>>>>> origin/main
  const motionToggle = document.querySelector(".motion-toggle");
  const motionLabel = document.querySelector(".motion-label");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  const status = document.querySelector("#environment-status");
  const savedNote = document.querySelector("#saved-note");
<<<<<<< HEAD
  const discoveryPanel = document.querySelector("#cosmic-discovery");
  const discoveryTitle = document.querySelector("#discovery-title");
  const discoveryFact = document.querySelector("#discovery-fact");
  const discoveryDescription = document.querySelector("#discovery-description");
  const discoveryIndex = document.querySelector("#discovery-index");
  const discoveryClose = document.querySelector(".discovery-close");
  const revealItems = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const validThemes = new Set(["quiet", "velvet", "electric"]);
  let stars = [];
  let animationFrame;
  let discoveryOrigin;

  if (!canvas || !context) return;
=======
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let animationFrame;
>>>>>>> origin/main

  function readPreference(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }

  function savePreference(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (error) { return false; }
  }

  function setTheme(theme, announce = false) {
<<<<<<< HEAD
    if (!validThemes.has(theme)) theme = "quiet";
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    const motionEnabled = enabled && !prefersReducedMotion;
    body.classList.toggle("motion-off", !motionEnabled);
    motionToggle.setAttribute("aria-pressed", String(motionEnabled));
    motionLabel.textContent = motionEnabled ? "Motion on" : "Motion off";
    savePreference("aurora-motion", motionEnabled ? "on" : "off");
    cancelAnimationFrame(animationFrame);
    if (motionEnabled && stars.length) drawStars();
=======
    body.classList.toggle("motion-off", !enabled);
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionLabel.textContent = enabled ? "Motion on" : "Motion off";
    savePreference("aurora-motion", enabled ? "on" : "off");
>>>>>>> origin/main
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
<<<<<<< HEAD
    if (document.hidden) return;
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    if (!body.classList.contains("motion-off") && !prefersReducedMotion) {
      animationFrame = requestAnimationFrame(drawStars);
    }
  }

  const worlds = {
    quiet: {
      name: "Quiet Tide", index: "01", status: "Quiet Tide is surrounding you",
      fact: "Its tides move at the speed of a held breath.",
      description: "A pale current for untangling the noise. Listen closely and the horizon begins to pulse back."
    },
    velvet: {
      name: "Velvet Dream", index: "02", status: "Velvet Dream is unfolding",
      fact: "The last violet bloom appears every 17,000 nights.",
      description: "A softer orbit where lost ideas leave warm trails behind them. Nothing here arrives in a straight line."
    },
    electric: {
      name: "Electric Pulse", index: "03", status: "Electric Pulse is online",
      fact: "Its blue lightning travels inward, not out.",
      description: "A charged field for the wide awake. Follow the signal and let momentum become its own kind of map."
    }
  };

  function setJourneyWorld(world) {
    if (!worlds[world]) return;
    body.dataset.activeWorld = world;
    status.textContent = worlds[world].status;
    document.querySelectorAll("[data-environment]").forEach((card) => {
      card.classList.toggle("is-in-view", card.dataset.environment === world);
    });
  }

  function revealDiscovery(button) {
    const world = worlds[button.dataset.environment];
    if (!world) return;
    discoveryOrigin = button;
    discoveryTitle.textContent = world.name;
    discoveryIndex.textContent = world.index;
    discoveryFact.textContent = world.fact;
    discoveryDescription.textContent = world.description;
    discoveryPanel.hidden = false;
    button.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => discoveryPanel.classList.add("is-visible"));
  }

  function closeDiscovery() {
    discoveryPanel.classList.remove("is-visible");
    document.querySelectorAll("[data-environment]").forEach((card) => card.setAttribute("aria-expanded", "false"));
    window.setTimeout(() => { discoveryPanel.hidden = true; }, prefersReducedMotion ? 0 : 420);
    if (discoveryOrigin) discoveryOrigin.focus();
  }

  function updateWorldFromViewport() {
    const closest = [...document.querySelectorAll("[data-environment]")].map((card) => {
      const bounds = card.getBoundingClientRect();
      return {
        card,
        distance: Math.abs((bounds.top + bounds.height / 2) - window.innerHeight / 2),
        visible: bounds.bottom > 0 && bounds.top < window.innerHeight
      };
    }).filter((candidate) => candidate.visible).sort((a, b) => a.distance - b.distance)[0];
    if (closest) setJourneyWorld(closest.card.dataset.environment);
  }

=======
    if (!body.classList.contains("motion-off") && !prefersReducedMotion) animationFrame = requestAnimationFrame(drawStars);
  }

  const environmentNames = { quiet: "Quiet Tide is surrounding you", velvet: "Velvet Dream is unfolding", electric: "Electric Pulse is online" };
>>>>>>> origin/main
  document.querySelectorAll("[data-environment]").forEach((button) => {
    button.addEventListener("click", () => {
      const environment = button.dataset.environment;
      setTheme(environment, true);
<<<<<<< HEAD
      setJourneyWorld(environment);
=======
>>>>>>> origin/main
      document.querySelectorAll("[data-environment]").forEach((card) => {
        const selected = card === button;
        card.classList.toggle("is-selected", selected);
        card.setAttribute("aria-pressed", String(selected));
      });
<<<<<<< HEAD
      revealDiscovery(button);
    });
  });

  discoveryClose.addEventListener("click", closeDiscovery);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !discoveryPanel.hidden) closeDiscovery();
  });

  if ("IntersectionObserver" in window) {
    let queuedWorldUpdate = false;
    const worldObserver = new IntersectionObserver((entries) => {
      if (queuedWorldUpdate) return;
      queuedWorldUpdate = true;
      requestAnimationFrame(() => {
        if (entries.some((entry) => entry.isIntersecting)) updateWorldFromViewport();
        queuedWorldUpdate = false;
      });
    }, { threshold: [0, .35, .65], rootMargin: "-12% 0px -18% 0px" });
    document.querySelectorAll("[data-environment]").forEach((card) => worldObserver.observe(card));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  let scrollUpdateQueued = false;
  window.addEventListener("scroll", () => {
    if (scrollUpdateQueued) return;
    scrollUpdateQueued = true;
    requestAnimationFrame(() => {
      updateWorldFromViewport();
      scrollUpdateQueued = false;
    });
  }, { passive: true });

=======
      status.textContent = environmentNames[environment];
    });
  });

>>>>>>> origin/main
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeChoice, true));
  });
  motionToggle.addEventListener("click", () => setMotion(body.classList.contains("motion-off")));
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
<<<<<<< HEAD
    menuToggle.querySelector(".sr-only").textContent = open ? "Open navigation" : "Close navigation";
=======
>>>>>>> origin/main
    navigation.classList.toggle("is-open", !open);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
<<<<<<< HEAD
    menuToggle.querySelector(".sr-only").textContent = "Open navigation";
  }));
  window.addEventListener("resize", () => { cancelAnimationFrame(animationFrame); resizeCanvas(); drawStars(); });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(animationFrame);
    if (!document.hidden && !body.classList.contains("motion-off") && !prefersReducedMotion) drawStars();
  });
  if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
    window.addEventListener("pointermove", (event) => {
      const x = ((event.clientX / window.innerWidth) - .5) * 12;
      const y = ((event.clientY / window.innerHeight) - .5) * 8;
      root.style.setProperty("--pointer-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--pointer-y", `${y.toFixed(2)}px`);
    }, { passive: true });
  }

  setTheme(readPreference("aurora-theme") || "quiet");
  setJourneyWorld("quiet");
=======
  }));
  window.addEventListener("resize", () => { cancelAnimationFrame(animationFrame); resizeCanvas(); drawStars(); });

  setTheme(readPreference("aurora-theme") || "quiet");
>>>>>>> origin/main
  setMotion(!prefersReducedMotion && readPreference("aurora-motion") !== "off");
  resizeCanvas();
  drawStars();
})();
