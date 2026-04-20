(() => {
  const storageKeys = {
    theme: "vi-theme",
    dir: "vi-dir",
  };

  const root = document.documentElement;

  const setTheme = (theme) => {
    const normalized = theme === "dark" ? "dark" : "light";
    if (normalized === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    localStorage.setItem(storageKeys.theme, normalized);
    document.querySelectorAll("[data-vi-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", normalized === "dark" ? "true" : "false");
    });
    root.dispatchEvent(new CustomEvent("vi-theme-change", { detail: { theme: normalized } }));
  };

  const setDir = (dir) => {
    const normalized = dir === "rtl" ? "rtl" : "ltr";
    root.setAttribute("dir", normalized);
    localStorage.setItem(storageKeys.dir, normalized);
    document.querySelectorAll("[data-vi-dir-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", normalized === "rtl" ? "true" : "false");
      const icon = btn.querySelector("i");
      if (icon) {
        // Show target direction: if currently RTL, show LTR icon (left). If LTR, show RTL icon (right).
        if (normalized === "rtl") {
          icon.classList.replace("bi-text-right", "bi-text-left");
          icon.classList.replace("bi-text-paragraph", "bi-text-left");
        } else {
          icon.classList.replace("bi-text-left", "bi-text-right");
          icon.classList.replace("bi-text-paragraph", "bi-text-right");
        }
      }
    });
    root.dispatchEvent(new CustomEvent("vi-dir-change", { detail: { dir: normalized } }));
  };

  const applyPrefs = () => {
    const theme = localStorage.getItem(storageKeys.theme) || "light";
    const dir = localStorage.getItem(storageKeys.dir) || "ltr";
    setTheme(theme);
    setDir(dir);
  };

  const bindToggles = () => {
    document.querySelectorAll("[data-vi-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        setTheme(isDark ? "light" : "dark");
      });
    });

    document.querySelectorAll("[data-vi-dir-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isRtl = root.getAttribute("dir") === "rtl";
        setDir(isRtl ? "ltr" : "rtl");
      });
    });
  };


  const initBootstrapValidation = () => {
    const forms = document.querySelectorAll("form.needs-validation");
    forms.forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  const initTranscriptDemo = () => {
    const transcriptEl = document.querySelector("[data-vi-transcript]");
    const gaugeRing = document.querySelector("[data-vi-gauge-ring]");
    const scoreEl = document.querySelector("[data-vi-gauge-score]");
    const stateEl = document.querySelector("[data-vi-gauge-state]");

    if (!transcriptEl || !gaugeRing || !scoreEl || !stateEl) return;

    const script = [
      { s: "Agent Sarah", t: "Thanks for calling. I can pull up your account in 10 seconds.", v: 78 },
      { s: "Customer Mike", t: "I’ve been transferred twice. I’m already frustrated.", v: 52 },
      { s: "Agent Sarah", t: "I hear you. I’m going to own this until it’s resolved.", v: 64 },
      { s: "Customer Mike", t: "My bill doubled and nobody can explain why.", v: 38 },
      { s: "Agent Sarah", t: "Let’s review the line items together. I’ll flag any mismatch.", v: 56 },
      { s: "Customer Mike", t: "If this isn’t fixed today, I’m canceling.", v: 28 },
      { s: "Agent Sarah", t: "Understood. I’m applying the credit and confirming in writing.", v: 70 },
      { s: "Customer Mike", t: "Okay. That’s the first clear answer I’ve gotten.", v: 82 },
    ];

    const stateFrom = (score) => {
      if (score >= 70) return "Positive";
      if (score >= 45) return "Neutral";
      return "Negative";
    };

    let i = 0;
    const maxLines = 9;

    const render = ({ s, t, v }) => {
      const line = document.createElement("div");
      line.className = "vi-transcript-line";
      line.innerHTML = `<strong>${s}:</strong> ${t}`;
      transcriptEl.appendChild(line);

      while (transcriptEl.children.length > maxLines) transcriptEl.removeChild(transcriptEl.firstElementChild);

      const deg = Math.max(10, Math.min(350, (v / 100) * 360));
      gaugeRing.style.setProperty("--vi-gauge-deg", `${deg}deg`);
      scoreEl.textContent = `${v}`;
      stateEl.textContent = stateFrom(v);
    };

    render(script[0]);
    i = 1;

    const timer = window.setInterval(() => {
      if (i >= script.length) {
        window.clearInterval(timer);
        return;
      }
      render(script[i]);
      i += 1;
    }, 1000);
  };

  const initScrollReveal = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const candidates = Array.from(
      document.querySelectorAll(
        "section.vi-section, section.vi-trust, .vi-dashboard-mock, .vi-card, .vi-bento-item, .vi-row, .vi-transcript, .vi-gauge"
      )
    );

    if (!candidates.length) return;

    candidates.forEach((el) => el.classList.add("vi-reveal"));

    if (prefersReducedMotion) {
      candidates.forEach((el) => el.classList.add("vi-reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vi-reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    candidates.forEach((el) => observer.observe(el));
  };

  const initDashboardMockPreview = () => {
    const mock = document.querySelector("[data-vi-dashboard-mock]");
    if (!mock) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const metrics = Array.from(mock.querySelectorAll("[data-vi-count]"));
    const bars = Array.from(mock.querySelectorAll("[data-vi-bar]"));

    const pad2 = (n) => String(n).padStart(2, "0");

    const formatTime = (totalSeconds) => {
      const s = Math.max(0, Math.round(totalSeconds));
      const m = Math.floor(s / 60);
      const r = s % 60;
      return `${m}:${pad2(r)}`;
    };

    const animate = (el, to, fmt) => {
      const durationMs = 950;
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = from + (to - from) * eased;
        el.textContent = fmt(v);
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const run = () => {
      if (prefersReducedMotion) {
        metrics.forEach((el) => {
          const type = el.getAttribute("data-vi-count");
          const to = Number(el.getAttribute("data-vi-to"));
          if (!Number.isFinite(to)) return;
          if (type === "percent") el.textContent = `${Math.round(to)}%`;
          else if (type === "decimal") el.textContent = `${to}%`;
          else if (type === "time") el.textContent = formatTime(to);
        });
        bars.forEach((span) => {
          const target = Number(span.getAttribute("data-vi-bar"));
          if (!Number.isFinite(target)) return;
          span.style.height = `${target}%`;
        });
        return;
      }

      metrics.forEach((el) => {
        const type = el.getAttribute("data-vi-count");
        const to = Number(el.getAttribute("data-vi-to"));
        if (!Number.isFinite(to)) return;

        if (type === "percent") animate(el, to, (v) => `${Math.round(v)}%`);
        else if (type === "decimal") animate(el, to, (v) => `${v.toFixed(1)}%`);
        else if (type === "time") animate(el, to, (v) => formatTime(v));
      });

      window.setTimeout(() => {
        bars.forEach((span) => {
          const target = Number(span.getAttribute("data-vi-bar"));
          if (!Number.isFinite(target)) return;
          span.style.height = `${target}%`;
        });
      }, 120);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        run();
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(mock);
  };

  const initHeroCanvas = () => {
    const canvas = document.querySelector("[data-vi-hero-canvas]");
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      mouseX: 0,
      mouseY: 0,
      hasMouse: false,
      particles: [],
      raf: 0,
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      state.dpr = dpr;
      state.w = Math.max(1, Math.floor(rect.width));
      state.h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = state.w < 520 ? 34 : 56;
      const count = Math.max(24, Math.floor((state.w * state.h) / (density * density)));

      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.2 + Math.random() * 1.6,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;
      state.hasMouse = true;
    };

    const clear = () => ctx.clearRect(0, 0, state.w, state.h);

    const readRgb = (prop, fallback) => {
      const raw = getComputedStyle(root).getPropertyValue(prop).trim();
      if (!raw) return fallback;
      const cleaned = raw.replace(/[^0-9,\s]/g, "").trim();
      return cleaned || fallback;
    };

    const draw = () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const accentRgb = readRgb("--vi-accent-rgb", "161, 98, 7");
      const accent2Rgb = readRgb("--vi-accent2-rgb", "34, 211, 238");
      const dot = isDark ? `rgba(${accent2Rgb}, .56)` : `rgba(${accentRgb}, .42)`;
      const line = isDark ? `rgba(${accent2Rgb}, .18)` : `rgba(${accentRgb}, .14)`;
      const highlight = isDark ? `rgba(${accentRgb}, .26)` : `rgba(${accent2Rgb}, .20)`;

      clear();

      const maxLink = Math.max(90, Math.min(140, state.w * 0.16));

      for (let i = 0; i < state.particles.length; i += 1) {
        const p = state.particles[i];
        for (let j = i + 1; j < state.particles.length; j += 1) {
          const q = state.particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d > maxLink) continue;
          const a = 1 - d / maxLink;
          ctx.strokeStyle = a > 0.6 ? highlight : line;
          ctx.globalAlpha = Math.max(0, Math.min(1, a));
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      for (const p of state.particles) {
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (state.hasMouse) {
        ctx.fillStyle = isDark ? `rgba(${accentRgb}, .16)` : `rgba(${accentRgb}, .10)`;
        ctx.beginPath();
        ctx.arc(state.mouseX, state.mouseY, 120, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (state.hasMouse) {
          const dx = p.x - state.mouseX;
          const dy = p.y - state.mouseY;
          const d = Math.hypot(dx, dy);
          if (d < 140 && d > 0.001) {
            const push = (140 - d) / 140;
            p.vx += (dx / d) * push * 0.004;
            p.vy += (dy / d) * push * 0.004;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < -20) p.x = state.w + 20;
        if (p.x > state.w + 20) p.x = -20;
        if (p.y < -20) p.y = state.h + 20;
        if (p.y > state.h + 20) p.y = -20;
      }

      draw();
      state.raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    root.addEventListener("vi-theme-change", () => draw());
    root.addEventListener("vi-dir-change", () => draw());

    if (prefersReducedMotion) {
      draw();
      return;
    }

    state.raf = requestAnimationFrame(step);
  };

  const initRoiCalculator = () => {
    const form = document.querySelector("[data-vi-roi-form]");
    const out = document.querySelector("[data-vi-roi-out]");
    if (!form || !out) return;

    const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const calls = Number(form.querySelector("[name='call_volume']")?.value || 0);
      const agents = Number(form.querySelector("[name='agent_count']")?.value || 0);

      if (!Number.isFinite(calls) || !Number.isFinite(agents) || calls <= 0 || agents <= 0) {
        out.textContent = "Enter valid numbers to estimate savings.";
        return;
      }

      const savings = Math.round(calls * 0.18 + agents * 2400);
      out.textContent = `Projected annual savings: ${fmt.format(savings)} in reduced escalations.`;
    });
  };

  const initBackToTop = () => {
    const btn = document.createElement("button");
    btn.className = "vi-back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(btn);

    const checkScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      if (scrolled > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", checkScroll);
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const initPasswordToggle = () => {
    const toggles = document.querySelectorAll("[data-vi-password-toggle]");
    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        const icon = btn.querySelector("i");
        if (!input || !icon) return;

        if (input.type === "password") {
          input.type = "text";
          icon.classList.replace("bi-eye", "bi-eye-slash");
          btn.setAttribute("aria-label", "Hide password");
        } else {
          input.type = "password";
          icon.classList.replace("bi-eye-slash", "bi-eye");
          btn.setAttribute("aria-label", "Show password");
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyPrefs();
    bindToggles();
    initBootstrapValidation();
    initScrollReveal();
    initTranscriptDemo();
    initHeroCanvas();
    initDashboardMockPreview();
    initRoiCalculator();
    initBackToTop();
    initPasswordToggle();
  });
})();
