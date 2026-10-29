(() => {
  "use strict";
<<<<<<< Updated upstream

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
=======
  const root = document.documentElement, body = document.body, canvas = document.querySelector("#starfield"), context = canvas?.getContext("2d"), reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const subjects = [
    ["solar","Solar System","Our neighborhood","Eight planets orbit the Sun, alongside dwarf planets, moons, asteroids, and comets.","It is the only planetary system we can study up close, making it a reference point for other worlds.",["The Sun holds about 99.8% of the Solar System's mass.","The planets formed from a disk of gas and dust around the young Sun."],"exoplanet","system","01"],
    ["black-hole","Black holes","Gravity, taken to an extreme","A black hole is a region where gravity is so strong that, inside its event horizon, nothing that travels at light speed or slower can escape.","They let scientists test gravity in its most intense known environments. The bright disk is hot matter outside the horizon, not the black hole itself.",["The event horizon is a boundary, not a solid surface.","Black holes can grow by accreting gas, dust, and stars."],"neutron-star","deep-space","02"],
    ["neutron-star","Neutron stars","A star compressed to a city","A neutron star is the dense collapsed core left after some massive stars explode as supernovae.","Their matter is packed at nuclear density, giving us a natural laboratory for extreme physics.",["A typical neutron star is roughly the width of a city.","Its mass can exceed that of the Sun despite the small size."],"pulsar","stars","03"],
    ["nebula","Nebulae","Clouds that shape stars","Nebulae are vast clouds of gas and dust. Some glow when energized; others block or reflect light.","Many are stellar nurseries, where gravity gathers material into new stars and planetary systems.",["Image colors can represent different wavelengths of light.","Supernova remnants are also nebulae."],"supernova","deep-space","04"],
    ["galaxy","Galaxies","Cities of stars","A galaxy is a gravitationally bound system of stars, gas, dust, dark matter, and planetary systems.","Galaxies show how matter organizes across immense scales and how star formation changes over cosmic time.",["The Milky Way is a barred spiral galaxy.","Galaxies can merge without individual stars usually colliding."],"nebula","deep-space","05"],
    ["supernova","Supernovae","A star's spectacular ending","Some massive stars end in core-collapse supernovae; others happen when a white dwarf undergoes a runaway thermonuclear explosion.","These explosions distribute elements forged in stars into space, helping seed future stars, planets, and life.",["Supernovae can briefly outshine their host galaxies.","Their remnants can expand into glowing nebulae."],"galaxy","stars","06"],
    ["exoplanet","Exoplanets","Worlds beyond the Sun","Exoplanets are planets orbiting stars other than the Sun. Scientists often find them when a planet dims its star during a transit.","They reveal how diverse planetary systems can be and help us ask which conditions might support life.",["A transit measures a dip in starlight, not a direct photograph.","Atmospheres can sometimes be studied through passing starlight."],"solar","system","07"],
    ["pulsar","Pulsars","Cosmic clockwork","A pulsar is a rotating neutron star whose beams of radiation sweep past Earth like a lighthouse.","Their regular pulses can be used as cosmic clocks and probes of matter, gravity, and interstellar space.",["The pulses come from rotating beams, not the star turning on and off.","Some pulsars rotate many times per second."],"black-hole","stars","08"]
  ].map(([id,name,label,fact,why,facts,next,category,index]) => ({id,name,label,fact,why,facts,next,category,index}));
  const get = (id) => subjects.find((item) => item.id === id), grid = document.querySelector("#atlas-grid"); let current;
  function render(filter = "all", query = "") { const term = query.toLowerCase().trim(), list = subjects.filter((s) => (filter === "all" || s.category === filter) && `${s.name} ${s.label}`.toLowerCase().includes(term)); grid.innerHTML = list.map((s) => `<button class="atlas-card visual-${s.id}" data-subject="${s.id}"><span class="card-index">${s.index}</span><span class="card-art"><i></i><b></b></span><span class="card-content"><small>${s.label}</small><strong>${s.name}</strong><em>Open field notes ↗</em></span></button>`).join(""); document.querySelector("#atlas-empty").hidden = list.length > 0; grid.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => open(button.dataset.subject))); }
  function open(id) { current = get(id); const panel = document.querySelector("#discovery-panel"); ["index","category","title","fact","description"].forEach((key) => { const name = key === "index" ? "discovery-index" : `discovery-${key}`; document.querySelector(`#${name}`).textContent = current[key === "category" ? "label" : key === "title" ? "name" : key]; }); document.querySelector("#fact-list").innerHTML = current.facts.map((fact) => `<span>${fact}</span>`).join(""); document.querySelector("#discovery-visual").className = `discovery-visual visual-${current.id}`; panel.hidden = false; document.querySelector("#atlas-status").textContent = `${current.name} selected. Field notes open below.`; requestAnimationFrame(() => panel.classList.add("is-visible")); }
  document.querySelector("#related-action").onclick = () => current && open(current.next); document.querySelector("#discovery-close").onclick = () => { const panel = document.querySelector("#discovery-panel"); panel.classList.remove("is-visible"); setTimeout(() => { panel.hidden = true; }, 350); };
  document.querySelectorAll(".filter-button").forEach((button) => button.onclick = () => { document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active")); button.classList.add("is-active"); render(button.dataset.filter, document.querySelector("#atlas-search").value); }); document.querySelector("#atlas-search").oninput = (event) => render(document.querySelector(".filter-button.is-active").dataset.filter, event.target.value);
  const orbit = document.querySelector("#orbit-speed"); orbit.oninput = (event) => { const value = Number(event.target.value), demo = document.querySelector("#orbit-demo"); document.querySelector("#orbit-speed-value").textContent = `${value}%`; demo.dataset.motion = value < 38 ? "inward" : value > 68 ? "outward" : "stable"; document.querySelector("#orbit-readout").textContent = value < 38 ? "falling inward" : value > 68 ? "stretched path" : "stable orbit"; demo.style.setProperty("--orbit-scale", .72 + value / 100 * .55); };
  const stages = {cloud:["stellar nursery","Stars begin in cold clouds of gas and dust. Gravity gathers denser clumps until a protostar forms."],main:["main sequence","A stable star fuses hydrogen in its core. How long this lasts depends strongly on its initial mass."],giant:["giant phase","When core hydrogen runs low, the star expands. Low-mass stars become red giants; massive stars can become supergiants."],remnant:["stellar remnant","A low-mass star can leave a white dwarf. A massive star may leave a neutron star or black hole after a supernova."]}; function setStage(stage) { document.querySelector("#life-caption").textContent = stages[stage][0]; document.querySelector("#life-title").textContent = stages[stage][0].replace(/^./, (c) => c.toUpperCase()); document.querySelector("#life-description").textContent = stages[stage][1]; document.querySelectorAll(".stage-button,.life-node").forEach((item) => item.classList.toggle("is-active", item.dataset.stage === stage)); document.querySelector("#life-demo").dataset.stage = stage; } document.querySelectorAll(".stage-button").forEach((button) => button.onclick = () => setStage(button.dataset.stage));
  document.querySelectorAll(".lab-tab").forEach((button) => button.onclick = () => { document.querySelectorAll(".lab-tab").forEach((tab) => tab.setAttribute("aria-selected", String(tab === button))); document.querySelectorAll(".lab-panel").forEach((panel) => { const active = panel.id === button.getAttribute("aria-controls"); panel.hidden = !active; panel.classList.toggle("is-active", active); }); });
  const questions = [{q:"What creates a pulsar's regular pulse?",a:["A star turning on and off","A rotating beam sweeping past Earth","A planet orbiting a neutron star"],i:1,w:"A pulsar is a rotating neutron star whose radiation beams sweep past us like a lighthouse."},{q:"What can a transit tell scientists about an exoplanet?",a:["That it dims its star from our viewpoint","That it is definitely habitable","Its exact surface photograph"],i:0,w:"A transit is a small dip in starlight. It can reveal a planet's size and orbit, but not prove habitability."},{q:"What mainly determines a star's life path?",a:["Its color today","Its distance from Earth","Its initial mass"],i:2,w:"Initial mass controls how quickly a star uses fuel and whether it ends as a white dwarf, neutron star, or black hole."}]; let qi = 0, score = 0; const quiz = document.querySelector("#quiz-panel"); function showQuestion() { const q = questions[qi]; document.querySelector("#quiz-progress").textContent = `Question ${qi+1} / 3`; document.querySelector("#quiz-score").textContent = `Score ${score}`; document.querySelector("#quiz-question").textContent = q.q; document.querySelector("#quiz-feedback").textContent = ""; document.querySelector("#next-question").hidden = true; document.querySelector("#quiz-options").innerHTML = q.a.map((answer,index) => `<button class="quiz-option" data-answer="${index}">${answer}</button>`).join(""); document.querySelectorAll(".quiz-option").forEach((button) => button.onclick = () => answer(Number(button.dataset.answer))); } function answer(index) { const q = questions[qi], correct = index === q.i; if (correct) score++; document.querySelectorAll(".quiz-option").forEach((button, n) => { button.disabled = true; button.classList.toggle("is-correct", n === q.i); button.classList.toggle("is-wrong", n === index && !correct); }); document.querySelector("#quiz-score").textContent = `Score ${score}`; document.querySelector("#quiz-feedback").textContent = `${correct ? "Correct. " : "Not quite. "}${q.w}`; document.querySelector("#next-question").hidden = false; } document.querySelector("#start-quiz").onclick = () => { qi = 0; score = 0; quiz.hidden = false; showQuestion(); quiz.scrollIntoView({behavior: reduced ? "auto" : "smooth", block: "nearest"}); }; document.querySelector("#next-question").onclick = () => { if (++qi < questions.length) showQuestion(); else { document.querySelector("#quiz-question").textContent = `Challenge complete: ${score} / 3`; document.querySelector("#quiz-options").innerHTML = `<p class="quiz-complete">Keep exploring the atlas, then try again.</p>`; document.querySelector("#quiz-feedback").textContent = "Your score is kept for this session."; document.querySelector("#next-question").textContent = "Retry challenge ↗"; document.querySelector("#next-question").onclick = () => { qi = 0; score = 0; document.querySelector("#next-question").textContent = "Next question →"; showQuestion(); }; } };
  const motion = document.querySelector(".motion-toggle"); motion.onclick = () => { const active = body.classList.contains("motion-off"); body.classList.toggle("motion-off", !active); motion.setAttribute("aria-pressed", String(active)); document.querySelector(".motion-label").textContent = active ? "Motion on" : "Motion off"; };
  const menu = document.querySelector(".menu-toggle"), nav = document.querySelector("#main-nav"); menu.onclick = () => { const open = menu.getAttribute("aria-expanded") === "true"; menu.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open); }; nav.querySelectorAll("a").forEach((link) => link.onclick = () => { nav.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); });
  let stars = [], frame; function resize() { const ratio = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * ratio; canvas.height = innerHeight * ratio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; context.setTransform(ratio,0,0,ratio,0,0); stars = Array.from({length:Math.min(150,Math.floor(innerWidth/7))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,a:Math.random()*.65+.15,d:Math.random()*.18+.03})); } function draw() { context.clearRect(0,0,innerWidth,innerHeight); stars.forEach((s) => { context.beginPath(); context.fillStyle=`rgba(220,237,255,${s.a})`; context.arc(s.x,s.y,s.r,0,Math.PI*2); context.fill(); if (!body.classList.contains("motion-off")) { s.y-=s.d; if(s.y < -2)s.y=innerHeight+2; } }); if(!body.classList.contains("motion-off")&&!reduced) frame=requestAnimationFrame(draw); } if(canvas&&context){resize();draw();addEventListener("resize",()=>{cancelAnimationFrame(frame);resize();draw();});}
  if("IntersectionObserver" in window){const observer=new IntersectionObserver((entries,instance)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");instance.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll(".reveal").forEach((item)=>observer.observe(item));}else document.querySelectorAll(".reveal").forEach((item)=>item.classList.add("is-visible")); render();
})();
>>>>>>> Stashed changes
