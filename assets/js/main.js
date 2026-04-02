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
  };

  const setDir = (dir) => {
    const normalized = dir === "rtl" ? "rtl" : "ltr";
    root.setAttribute("dir", normalized);
    localStorage.setItem(storageKeys.dir, normalized);
    document.querySelectorAll("[data-vi-dir-toggle]").forEach((btn) => {
      const label = btn.querySelector("[data-vi-dir-label]");
      if (label) label.textContent = normalized.toUpperCase();
      btn.setAttribute("aria-pressed", normalized === "rtl" ? "true" : "false");
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

  document.addEventListener("DOMContentLoaded", () => {
    applyPrefs();
    bindToggles();
    initBootstrapValidation();
    initTranscriptDemo();
    initRoiCalculator();
    initBackToTop();
  });
})();
