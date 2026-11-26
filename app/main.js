// Vietnam in Numbers — router and page behaviour.
// Hash routes: #/ overview, #/economy, #/population, #/health, #/trade,
// #/regions, #/explorer. Regions table sorts and searches; the explorer
// re-charts its indicator and downloads the visible range as CSV.

import * as D from "./data.js";
import { lineChart } from "./charts.js";
import {
  viewOverview, viewEconomy, viewPopulation, viewHealth, viewTrade,
  viewRegions, viewExplorer,
} from "./views.js";

const ROUTES = {
  "/": viewOverview,
  "/economy": viewEconomy,
  "/population": viewPopulation,
  "/health": viewHealth,
  "/trade": viewTrade,
  "/regions": viewRegions,
  "/explorer": viewExplorer,
};

const NAV = [
  ["/", "Overview"],
  ["/economy", "Economy"],
  ["/population", "Population"],
  ["/health", "Health & Education"],
  ["/trade", "Trade"],
  ["/regions", "Regions"],
  ["/explorer", "Data Explorer"],
];

const app = document.getElementById("app");
const nav = document.getElementById("nav");

function currentRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  nav.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + route);
    if (a.getAttribute("href") === "#" + route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = "Viet Nam in Numbers — " + (NAV.find(([r]) => r === route)?.[1] ?? "Overview");
  if (route === "/regions") initRegions();
  if (route === "/explorer") initExplorer();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// --- Regions: sortable, searchable province table --------------------------
function initRegions() {
  const table = document.getElementById("prov-table");
  const tbody = table.querySelector("tbody");
  const search = document.getElementById("prov-search");
  let rows = [...D.PROVINCES];
  let key = "pop";
  let dir = -1;

  function draw() {
    const q = search.value.trim().toLowerCase();
    const shown = rows
      .filter((p) => p.name.toLowerCase().includes(q))
      .sort((a, b) => (a[key] < b[key] ? -dir : a[key] > b[key] ? dir : 0));
    tbody.innerHTML = shown.length ? shown.map((p) =>
      `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(1)}</td>` +
      `<td class="num">${D.fmt(p.density)}</td><td class="num">${p.urban.toFixed(1)}%</td></tr>`).join("")
      : `<tr><td colspan="4">No province matches “${search.value}”.</td></tr>`;
  }
  table.querySelectorAll("th button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.sort;
      if (k === key) dir = -dir; else { key = k; dir = k === "name" ? 1 : -1; }
      draw();
    });
  });
  search.addEventListener("input", draw);
  draw();
}

// --- Explorer: indicator + year range chart, table, CSV --------------------
function initExplorer() {
  const indSel = document.getElementById("ex-indicator");
  const fromSel = document.getElementById("ex-from");
  const toSel = document.getElementById("ex-to");
  const chart = document.getElementById("ex-chart");
  const tbody = document.getElementById("ex-tbody");
  const source = document.getElementById("ex-source");
  const download = document.getElementById("ex-download");
  fromSel.value = "2015";
  toSel.value = "2024";

  function range() {
    const from = Number(fromSel.value), to = Number(toSel.value);
    return from <= to ? [from, to] : [to, from];
  }
  function draw() {
    const ind = D.INDICATORS[indSel.value];
    const [from, to] = range();
    const years = D.YEARS.filter((y) => y >= from && y <= to);
    const values = years.map((y) => ind.series[D.YEARS.indexOf(y)]);
    chart.innerHTML = lineChart(years.map(String), values, { unit: ind.unit === "%" ? "%" : "" });
    source.textContent = `${ind.name} · ${ind.source}`;
    tbody.innerHTML = years.map((y, i) => {
      const v = values[i];
      const prev = i === 0 ? null : values[i - 1];
      const chg = prev === null ? "—" : (v >= prev ? "+" : "") + (v - prev).toFixed(1);
      return `<tr><th>${y}</th><td class="num">${v}</td><td class="num">${chg}</td></tr>`;
    }).join("");
  }
  function csv() {
    const ind = D.INDICATORS[indSel.value];
    const [from, to] = range();
    const lines = [`indicator,${ind.name}`, `source,${ind.source}`, "year,value"];
    D.YEARS.filter((y) => y >= from && y <= to).forEach((y) => {
      lines.push(`${y},${ind.series[D.YEARS.indexOf(y)]}`);
    });
    const blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vietnam-${indSel.value}-${from}-${to}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  [indSel, fromSel, toSel].forEach((el) => el.addEventListener("change", draw));
  download.addEventListener("click", csv);
  draw();
}

window.addEventListener("hashchange", render);
render();
