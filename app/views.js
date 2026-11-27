// Viet Nam in Numbers — the eight views and the router.
//
// One job: turn the figures in data.js into pages. Each view is a function
// that returns HTML. The router reads the hash, renders the view, marks the
// nav link, and wires up the interactive controls on the page: sortable
// table headers and the chart toggles.

import {
  YEARS, GDP_BN, GDP_PC, GDP_GROWTH, POP_M, HEADLINES, ECONOMY, PEOPLE,
  SOCIETY, ENERGY, COMPARE, PROVINCES, PROVINCE_ECONOMIES, SOURCES,
} from "./data.js";
import { lineChart, barChart, shareBars, CHART_COLORS } from "./charts.js";

const NAV = [
  { route: "", label: "Dashboard" },
  { route: "economy", label: "Economy" },
  { route: "compare", label: "Compare" },
  { route: "people", label: "People" },
  { route: "society", label: "Society" },
  { route: "energy", label: "Energy" },
  { route: "provinces", label: "Provinces" },
  { route: "sources", label: "Sources" },
];

const fmtInt = (n) => n.toLocaleString("en-US");
const fmtPop = (n) => (n / 1000000).toFixed(2) + "m";
const density = (p) => Math.round(p.pop / p.area);

function cards(items) {
  return `<div class="cards">` + items.map((c) => `
    <article class="card">
      <p class="card-label">${c.label}</p>
      <p class="card-value">${c.value}</p>
      <p class="card-note">${c.note}</p>
      ${c.detail ? `<p class="card-detail">${c.detail}</p>` : ""}
    </article>`).join("") + `</div>`;
}

function sourceLine(text) {
  return `<p class="src">${text}</p>`;
}

// ---------- sortable tables ----------
// Any table with class "sortable" gets click-to-sort headers. A header
// carries data-key (the row index in its data array is not needed: we sort
// the rendered rows) and data-type ("num" or "text"). Numbers are read
// from the cell's data-v attribute, so formatted text never breaks sorting.
export function wireSortable(root) {
  root.querySelectorAll("table.sortable").forEach((table) => {
    const head = table.querySelector("thead tr");
    if (!head) return;
    head.querySelectorAll("th[data-key]").forEach((th) => {
      th.addEventListener("click", () => {
        const key = Number(th.dataset.key);
        const type = th.dataset.type || "text";
        const body = table.querySelector("tbody");
        const rows = Array.from(body.querySelectorAll("tr"));
        const dir = th.dataset.dir === "asc" ? -1 : 1;
        head.querySelectorAll("th").forEach((h) => { delete h.dataset.dir; });
        th.dataset.dir = dir === 1 ? "asc" : "desc";
        rows.sort((a, b) => {
          const av = a.children[key].dataset.v;
          const bv = b.children[key].dataset.v;
          if (type === "num") return (Number(av) - Number(bv)) * dir;
          return av.localeCompare(bv) * dir;
        });
        rows.forEach((r) => body.appendChild(r));
      });
    });
  });
}

// ---------- views ----------

function viewDashboard() {
  return `
  <section class="hero">
    <p class="kicker">National statistics portal · Updated November 2026</p>
    <h1>Viet Nam in numbers</h1>
    <p class="lede">The country's economy, people and infrastructure, in the figures
    the publishers themselves report. Every number on this site names its
    year and its source.</p>
  </section>
  ${cards(HEADLINES)}
  <section class="panel">
    <h2>Growth, 2015–2024</h2>
    <p>Real GDP growth, percent a year. The pandemic years 2020–2021 are the
    dip; 2022 is the rebound.</p>
    ${lineChart(YEARS, GDP_GROWTH, { color: CHART_COLORS.red, unit: "%", decimals: 2, label: "GDP growth 2015 to 2024" })}
    ${sourceLine("Source: World Bank, World Development Indicators. 2024: 7.09% (GSO).")}
  </section>
  <section class="panel">
    <h2>The economy doubled in a decade</h2>
    <p>Nominal GDP, billion US dollars. From $239bn in 2015 to $476bn in 2024.</p>
    ${barChart(YEARS.map((y, i) => ({ name: String(y), value: GDP_BN[i] })), { color: CHART_COLORS.teal, unit: "", decimals: 0, label: "GDP in billion US dollars, 2015 to 2024" })}
    ${sourceLine("Source: World Bank, World Development Indicators.")}
  </section>
  <section class="panel">
    <h2>2024 in brief</h2>
    <ul class="brief">
      <li><strong>7.09% growth</strong> — the fastest of Southeast Asia's five largest economies (GSO, 2024).</li>
      <li><strong>$405.5bn of exports</strong>, a record, and a ninth straight trade surplus of $24.8bn (GSO, 2024).</li>
      <li><strong>$38.2bn of registered foreign investment</strong>, with $25.4bn actually disbursed (GSO, 2024).</li>
      <li><strong>Prices rose 3.63%</strong>, inside the National Assembly's below-4% target (GSO, 2024).</li>
      <li><strong>101.0 million people</strong>, median age 32.4 — one of Asia's youngest workforces (World Bank, 2024; UN, 2023).</li>
    </ul>
    <p><a href="#/economy">Economy in detail →</a> &nbsp;·&nbsp; <a href="#/compare">How Viet Nam compares →</a></p>
  </section>`;
}

function viewEconomy() {
  const tradeRows = ECONOMY.trade.map((t) => `
    <tr><td data-v="${t.item}">${t.item}</td><td data-v="${t.value}">${t.value}</td>
    <td data-v="${t.change}">${t.change}</td><td data-v="${t.source}">${t.source}</td></tr>`).join("");
  return `
  <section class="hero">
    <p class="kicker">Economy</p>
    <h1>A $476 billion economy, still growing fast</h1>
    <p class="lede">Ten years of growth, trade and investment — and what the economy
    is made of.</p>
  </section>
  <section class="panel">
    <h2>GDP growth</h2>
    <div class="toggle" role="group" aria-label="Years shown">
      <button type="button" data-years="10" class="on">10 years</button>
      <button type="button" data-years="5">5 years</button>
    </div>
    <div id="growth-chart">${lineChart(YEARS, GDP_GROWTH, { color: CHART_COLORS.red, unit: "%", decimals: 2, label: "GDP growth 2015 to 2024" })}</div>
    ${sourceLine("Source: World Bank, World Development Indicators. 2024: 7.09% (GSO).")}
  </section>
  <section class="panel">
    <h2>GDP per person</h2>
    <p>Nominal GDP per capita, US dollars. It nearly doubled in ten years.</p>
    ${barChart(YEARS.map((y, i) => ({ name: String(y), value: GDP_PC[i] })), { color: CHART_COLORS.teal, unit: "", decimals: 0, label: "GDP per capita in US dollars, 2015 to 2024" })}
    ${sourceLine("Source: World Bank, World Development Indicators.")}
  </section>
  <section class="panel">
    <h2>Trade and prices, 2024</h2>
    <table class="data">
      <thead><tr><th>Indicator</th><th>Value</th><th>Change</th><th>Source</th></tr></thead>
      <tbody>${tradeRows}</tbody>
    </table>
    ${sourceLine("Source: General Statistics Office of Viet Nam (GSO), 2024.")}
  </section>
  <section class="panel">
    <h2>What the economy is made of</h2>
    ${shareBars(ECONOMY.sectors.map((s) => ({ name: s.name, share: s.share })), [CHART_COLORS.teal, CHART_COLORS.red, CHART_COLORS.gold, "#8a94a6"])}
    ${sourceLine("Shares of GDP, 2024. Source: GSO.")}
  </section>
  ${cards(ECONOMY.extras)}`;
}

function compareRows() {
  return COMPARE.map((c) => `
    <tr${c.self ? ' class="self"' : ""}>
      <td data-v="${c.country}">${c.country}${c.self ? " ★" : ""}</td>
      <td data-v="${c.gdp}">$${c.gdp.toFixed(1)}bn</td>
      <td data-v="${c.pc}">$${fmtInt(c.pc)}</td>
      <td data-v="${c.pop}">${c.pop.toFixed(1)}m</td>
      <td data-v="${c.life}">${c.life.toFixed(1)} yrs</td>
      <td data-v="${c.net}">${c.net.toFixed(1)}%</td>
    </tr>`).join("");
}

function viewCompare() {
  return `
  <section class="hero">
    <p class="kicker">Compare · ASEAN neighbours</p>
    <h1>Viet Nam against its neighbours</h1>
    <p class="lede">Five countries, one year, one source — the World Bank's 2024
    figures. Click any column heading to sort.</p>
  </section>
  <section class="panel">
    <h2>The five largest ASEAN economies, 2024</h2>
    <table class="data sortable">
      <thead><tr>
        <th data-key="0" data-type="text">Country</th>
        <th data-key="1" data-type="num">GDP</th>
        <th data-key="2" data-type="num">GDP per capita</th>
        <th data-key="3" data-type="num">Population</th>
        <th data-key="4" data-type="num">Life expectancy</th>
        <th data-key="5" data-type="num">Internet users</th>
      </tr></thead>
      <tbody>${compareRows()}</tbody>
    </table>
    ${sourceLine("Source: World Bank, World Development Indicators, 2024. GDP is nominal US dollars; internet users are percent of population.")}
  </section>
  <section class="panel">
    <h2>GDP per person, 2024</h2>
    <div class="toggle" role="group" aria-label="Compare metric">
      <button type="button" data-metric="pc" class="on">GDP per capita</button>
      <button type="button" data-metric="gdp">GDP</button>
      <button type="button" data-metric="pop">Population</button>
      <button type="button" data-metric="net">Internet users</button>
    </div>
    <div id="compare-chart">${barChart(COMPARE.map((c) => ({ name: c.country, value: c.pc })), { color: CHART_COLORS.teal, unit: "", decimals: 0, highlight: "Viet Nam", label: "GDP per capita in US dollars, 2024" })}</div>
    ${sourceLine("Source: World Bank, World Development Indicators, 2024. Viet Nam is shown in red.")}
  </section>
  <section class="panel">
    <h2>Reading the table</h2>
    <ul class="brief">
      <li><strong>Indonesia</strong> is the giant: three times Viet Nam's GDP, nearly three times its people.</li>
      <li><strong>Malaysia</strong> is the richest per person — $11,874, two and a half times Viet Nam's $4,717.</li>
      <li><strong>Thailand</strong> is closest in size ($526bn) but grows slowest at 2.5% a year.</li>
      <li><strong>Viet Nam</strong> grew fastest in 2024 at 7.1%, and has the region's second-youngest population after the Philippines.</li>
      <li><strong>The Philippines</strong> is the youngest and the least connected — 67.3% online against Viet Nam's 84.2%.</li>
    </ul>
  </section>`;
}

function viewPeople() {
  return `
  <section class="hero">
    <p class="kicker">People</p>
    <h1>101 million people, median age 32</h1>
    <p class="lede">A young, urbanising population: the workforce is still growing,
    and the cities are growing faster.</p>
  </section>
  <section class="panel">
    <h2>Population, 2015–2024</h2>
    <p>Millions of people. Viet Nam passed 100 million in 2023.</p>
    ${lineChart(YEARS, POP_M, { color: CHART_COLORS.teal, unit: "m", decimals: 1, label: "Population in millions, 2015 to 2024" })}
    ${sourceLine("Source: World Bank, World Development Indicators.")}
  </section>
  ${cards(PEOPLE)}
  <section class="panel">
    <h2>Where people live</h2>
    <p>Ho Chi Minh City (13.6m after the 2025 merger) and Hanoi (8.4m) hold
    about 22% of the country between them. See the
    <a href="#/provinces">provinces</a> page for every province's population.</p>
    ${sourceLine("Source: GSO, figures published with the 2025 merger plan.")}
  </section>`;
}

function viewSociety() {
  const group = (title, rows) => `
    <section class="panel"><h2>${title}</h2>
    <table class="data"><thead><tr><th>Indicator</th><th>Value</th><th>Source</th></tr></thead>
    <tbody>${rows.map((r) => `<tr><td data-v="${r.item}">${r.item}</td><td data-v="${r.value}">${r.value}</td><td data-v="${r.source}">${r.source}</td></tr>`).join("")}</tbody></table>
    </section>`;
  return `
  <section class="hero">
    <p class="kicker">Society</p>
    <h1>Schooling, health and digital life</h1>
    <p class="lede">What daily life looks like in the numbers: classrooms, clinics
    and connections.</p>
  </section>
  <section class="panel">
    <h2>Human development</h2>
    <p>Viet Nam's Human Development Index is <strong>0.766</strong> (2023, UNDP) —
    "high human development", rank 93 of 193 countries. It has risen from
    0.499 in 1990.</p>
    ${sourceLine("Source: UNDP, Human Development Report 2025.")}
  </section>
  ${group("Education", SOCIETY.education)}
  ${group("Health", SOCIETY.health)}
  ${group("Digital life", SOCIETY.digital)}`;
}

function viewEnergy() {
  return `
  <section class="hero">
    <p class="kicker">Energy &amp; infrastructure</p>
    <h1>Power for a fast-growing economy</h1>
    <p class="lede">Electricity demand grows about 10% a year. Coal still generates
    half the power; renewables are a quarter of capacity and rising.</p>
  </section>
  ${cards(ENERGY.facts)}
  <section class="panel">
    <h2>Where the power comes from, 2024</h2>
    ${shareBars(ENERGY.mix.map((m) => ({ name: m.source, share: m.share })), [CHART_COLORS.red, CHART_COLORS.teal, CHART_COLORS.gold, "#8a94a6"])}
    ${sourceLine("Shares of electricity generated, 2024. Source: EVN.")}
  </section>
  <section class="panel">
    <h2>The grid</h2>
    <ul class="brief">
      <li><strong>308.7 TWh generated</strong> in 2024, up 9.9% on 2023 (EVN).</li>
      <li><strong>82.4 GW of installed capacity</strong>, of which 21.4 GW is renewable (EVN, 2024).</li>
      <li><strong>99.7% rural electrification</strong> — nearly every household has power (EVN, 2024).</li>
      <li><strong>Power Development Plan VIII</strong> (revised 2025) aims for renewables to dominate the mix by 2050.</li>
      <li><strong>EVN</strong>, the state utility, generated 124 TWh itself — 40% of national output (EVN, 2024).</li>
    </ul>
  </section>`;
}

function viewProvinces() {
  const rows = PROVINCES.map((p) => `
    <tr>
      <td data-v="${p.name}">${p.name}</td>
      <td data-v="${p.pop}">${fmtPop(p.pop)}</td>
      <td data-v="${p.area}">${fmtInt(p.area)}</td>
      <td data-v="${density(p)}">${fmtInt(density(p))}</td>
      <td data-v="${p.grdp}">${fmtInt(p.grdp)}</td>
    </tr>`).join("");
  const top = PROVINCE_ECONOMIES.map((p) => `
    <tr>
      <td data-v="${p.name}">${p.name}</td>
      <td data-v="${p.grdp}">${fmtInt(p.grdp)}</td>
      <td data-v="${p.growth}">+${p.growth.toFixed(2)}%</td>
      <td data-v="${p.pc}">$${fmtInt(p.pc)}</td>
    </tr>`).join("");
  return `
  <section class="hero">
    <p class="kicker">Provinces</p>
    <h1>34 provinces after the 2025 merger</h1>
    <p class="lede">In 2025 Viet Nam merged 63 provinces and cities into 34. The
    figures below use the merged boundaries. Click any column heading to sort.</p>
  </section>
  <section class="panel">
    <h2>Provinces by population</h2>
    <table class="data sortable">
      <thead><tr>
        <th data-key="0" data-type="text">Province / city</th>
        <th data-key="1" data-type="num">Population</th>
        <th data-key="2" data-type="num">Area (km²)</th>
        <th data-key="3" data-type="num">Density (/km²)</th>
        <th data-key="4" data-type="num">GRDP (bn VND)</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${sourceLine("Population, area and GRDP: GSO figures published with Resolution 60-NQ/TW, the 2025 merger plan. Density is calculated from population and area.")}
  </section>
  <section class="panel">
    <h2>The five largest provincial economies, 2025</h2>
    <table class="data sortable">
      <thead><tr>
        <th data-key="0" data-type="text">Province / city</th>
        <th data-key="1" data-type="num">GRDP (bn VND)</th>
        <th data-key="2" data-type="num">GRDP growth</th>
        <th data-key="3" data-type="num">GRDP per capita</th>
      </tr></thead>
      <tbody>${top}</tbody>
    </table>
    ${sourceLine("Source: GSO, 2025. Ho Chi Minh City's economy alone is larger than Hanoi's and Hai Phong's combined.")}
  </section>`;
}

function viewSources() {
  const rows = SOURCES.map((s) => `
    <tr>
      <td data-v="${s.source}"><strong>${s.source}</strong><br><span class="muted">${s.note}</span></td>
      <td data-v="${s.covers}">${s.covers}</td>
      <td data-v="${s.year}">${s.year}</td>
    </tr>`).join("");
  return `
  <section class="hero">
    <p class="kicker">Sources</p>
    <h1>Where every number comes from</h1>
    <p class="lede">This site publishes no figure it cannot name a source for. The
    full list is below; each figure on the other pages names its own source
    and year next to it.</p>
  </section>
  <section class="panel">
    <table class="data">
      <thead><tr><th>Source</th><th>What it covers here</th><th>Years</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <section class="panel">
    <h2>How to read this site</h2>
    <ul class="brief">
      <li>Figures marked <strong>World Bank</strong> come from the World Development Indicators database, the Bank's country data pages.</li>
      <li>Figures marked <strong>GSO</strong> come from the General Statistics Office of Viet Nam, mostly its 6 January 2025 press conference on 2024.</li>
      <li><strong>Density</strong> is the only computed figure: population divided by area. It is labelled "calculated" wherever it appears.</li>
      <li>Provincial figures use the <strong>merged boundaries of 2025</strong> (34 provinces and cities). Pre-merger figures would not be comparable.</li>
      <li>Money is in <strong>nominal US dollars</strong> unless the figure says VND. Growth rates are real (inflation-adjusted) unless labelled otherwise.</li>
    </ul>
  </section>`;
}

const VIEWS = {
  "": { title: "Dashboard", render: viewDashboard },
  economy: { title: "Economy", render: viewEconomy },
  compare: { title: "Compare", render: viewCompare },
  people: { title: "People", render: viewPeople },
  society: { title: "Society", render: viewSociety },
  energy: { title: "Energy", render: viewEnergy },
  provinces: { title: "Provinces", render: viewProvinces },
  sources: { title: "Sources", render: viewSources },
};

function wireToggles(root) {
  // Economy: 10-year / 5-year growth chart.
  const growthBox = root.querySelector("#growth-chart");
  if (growthBox) {
    root.querySelectorAll('[data-years]').forEach((btn) => {
      btn.addEventListener("click", () => {
        root.querySelectorAll("[data-years]").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const n = Number(btn.dataset.years);
        const years = YEARS.slice(-n);
        const vals = GDP_GROWTH.slice(-n);
        growthBox.innerHTML = lineChart(years, vals, { color: CHART_COLORS.red, unit: "%", decimals: 2, label: `GDP growth, last ${n} years` });
      });
    });
  }
  // Compare: switch the bar chart between metrics.
  const compareBox = root.querySelector("#compare-chart");
  if (compareBox) {
    const metrics = {
      pc: { key: "pc", unit: "", label: "GDP per capita in US dollars, 2024" },
      gdp: { key: "gdp", unit: "bn", label: "GDP in billion US dollars, 2024" },
      pop: { key: "pop", unit: "m", label: "Population in millions, 2024" },
      net: { key: "net", unit: "%", label: "Internet users, percent of population, 2024" },
    };
    root.querySelectorAll("[data-metric]").forEach((btn) => {
      btn.addEventListener("click", () => {
        root.querySelectorAll("[data-metric]").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const m = metrics[btn.dataset.metric];
        compareBox.innerHTML = barChart(
          COMPARE.map((c) => ({ name: c.country, value: c[m.key] })),
          { color: CHART_COLORS.teal, unit: m.unit, decimals: m.key === "gdp" || m.key === "pop" ? 1 : 0, highlight: "Viet Nam", label: m.label },
        );
      });
    });
  }
}

export function render() {
  const route = window.location.hash.replace(/^#\/?/, "");
  const view = VIEWS[route] || VIEWS[""];
  const main = document.getElementById("view");
  main.innerHTML = view.render();
  document.title = `Viet Nam in Numbers — ${view.title}`;
  document.querySelectorAll("nav a").forEach((a) => {
    const r = a.getAttribute("href").replace(/^#\/?/, "");
    a.classList.toggle("active", r === route);
  });
  wireSortable(main);
  wireToggles(main);
  window.scrollTo(0, 0);
}
