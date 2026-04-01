(() => {
  const getAccent = () => {
    const styles = getComputedStyle(document.documentElement);
    return (styles.getPropertyValue("--vi-accent") || "#A16207").trim();
  };

  const initTabs = () => {
    const buttons = Array.from(document.querySelectorAll("[data-vi-tab-btn]"));
    const tabs = Array.from(document.querySelectorAll("[data-vi-tab]"));
    if (!buttons.length || !tabs.length) return;

    const activate = (id) => {
      buttons.forEach((b) => b.classList.toggle("active", b.getAttribute("data-vi-tab-btn") === id));
      tabs.forEach((t) => t.classList.toggle("active", t.getAttribute("data-vi-tab") === id));
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-vi-tab-btn");
        if (id) activate(id);
      });
    });

    const initial = buttons.find((b) => b.classList.contains("active"))?.getAttribute("data-vi-tab-btn") || buttons[0].getAttribute("data-vi-tab-btn");
    if (initial) activate(initial);
  };

  const initSortableTables = () => {
    const table = document.querySelector("[data-vi-sort-table]");
    if (!table) return;

    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    const getCellValue = (row, index) => (row.children[index]?.textContent || "").trim();
    const parseNumber = (s) => {
      const normalized = s.replace(/[^0-9.\-]/g, "");
      const n = Number(normalized);
      return Number.isFinite(n) ? n : null;
    };

    let state = { index: 0, dir: "asc" };

    const sortRows = (index, dir) => {
      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const av = getCellValue(a, index);
        const bv = getCellValue(b, index);
        const an = parseNumber(av);
        const bn = parseNumber(bv);
        if (an !== null && bn !== null) return dir === "asc" ? an - bn : bn - an;
        return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      rows.forEach((r) => tbody.appendChild(r));
    };

    const headers = Array.from(table.querySelectorAll("thead th.vi-sort"));
    headers.forEach((th) => {
      th.addEventListener("click", () => {
        const index = Number(th.getAttribute("data-vi-sort-index") || 0);
        const nextDir = state.index === index && state.dir === "asc" ? "desc" : "asc";
        state = { index, dir: nextDir };
        headers.forEach((h) => h.setAttribute("aria-sort", "none"));
        th.setAttribute("aria-sort", nextDir === "asc" ? "ascending" : "descending");
        sortRows(index, nextDir);
      });
    });

    sortRows(state.index, state.dir);
  };

  const initCharts = () => {
    const canvas = document.getElementById("viWeeklyTrend");
    if (!canvas) return;
    if (typeof window.Chart !== "function") return;

    const accent = getAccent();
    const isRtl = () => document.documentElement.getAttribute("dir") === "rtl";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [61, 58, 66, 64, 71, 69, 74];

    const chart = new window.Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sentiment Index",
            data,
            backgroundColor: accent,
            borderColor: accent,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            intersect: false,
            mode: "index",
            rtl: isRtl(),
            textDirection: isRtl() ? "rtl" : "ltr",
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 },
            position: isRtl() ? "right" : "left",
          },
        },
      },
    });

    document.documentElement.addEventListener("vi-dir-change", (e) => {
      const { dir } = e.detail;
      const rtl = dir === "rtl";
      chart.options.plugins.tooltip.rtl = rtl;
      chart.options.plugins.tooltip.textDirection = rtl ? "rtl" : "ltr";
      chart.options.scales.y.position = rtl ? "right" : "left";
      chart.update();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initSortableTables();
    initCharts();
  });
})();
