// Views for Vietnam in Numbers — one render function per hash route.
// Each view is a full page of real figures; every figure names its year
// and source, and every control on the page works.

import * as D from "./data.js";
import { lineChart, barChart, donutChart, columnChart } from "./charts.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function statCard(s) {
  return `<article class="card stat"><h3>${esc(s.label)}</h3><p class="big">${esc(s.value)}</p>
    <p class="src">${esc(s.sub)}</p><p class="muted">${esc(s.detail)}</p></article>`;
}

function factTable(rows) {
  return `<table class="facts"><tbody>${rows.map((r) =>
    `<tr><th>${esc(r.label)}</th><td class="num">${esc(r.value)}</td><td>${esc(r.year)}</td><td>${esc(r.source)}</td></tr>`).join("")}</tbody></table>`;
}

export function viewOverview() {
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · Viet Nam</p>
    <h1>Viet Nam in numbers</h1>
    <p class="lede">One country's published statistics, in one place: population, economy,
    health, education, trade and the provinces — every figure labelled with its year and source.</p>
    <p class="meta">Updated ${esc(D.META.updated)} · Sources: General Statistics Office of Viet Nam, World Bank, IMF, UNDP, EVN</p>
  </section>
  <section class="grid stats">${D.KEY_STATS.map(statCard).join("")}</section>
  <section class="grid two">
    <article class="card"><h2>GDP, 2015–2024</h2>
      ${lineChart(D.YEARS.map(String), D.GDP_SERIES, { unit: "" })}
      <p class="src">Nominal GDP, US$ billion · World Bank</p></article>
    <article class="card"><h2>Population, 2015–2024</h2>
      ${lineChart(D.YEARS.map(String), D.POP_SERIES, { color: "#c98a1b" })}
      <p class="src">Millions · General Statistics Office of Viet Nam</p></article>
  </section>
  <section class="grid three">
    <article class="card"><h2>Economy at a glance</h2>
      <p>Real growth of <b>7.09%</b> in 2024, the fastest in the region's large economies, with
      inflation held to <b>3.63%</b>. Exports of <b>$405.5bn</b> beat imports of <b>$380.8bn</b>.</p>
      <p><a class="btn" href="#/economy">Explore the economy →</a></p></article>
    <article class="card"><h2>People at a glance</h2>
      <p><b>101.3 million</b> people, median age about 33. Two in three are of working age,
      and <b>42.6%</b> live in towns and cities.</p>
      <p><a class="btn" href="#/population">Explore demographics →</a></p></article>
    <article class="card"><h2>Trade at a glance</h2>
      <p>The United States takes <b>$119.6bn</b> of exports — nearly a third — followed by
      China at <b>$61.2bn</b>. Phones and electronics lead the goods sold abroad.</p>
      <p><a class="btn" href="#/trade">Explore trade →</a></p></article>
  </section>
  <section class="card"><h2>How to use this site</h2>
    <p>Pick a section above or in the menu: <b>Economy</b> for growth and prices, <b>Population</b> for
    age and provinces, <b>Health &amp; Education</b> for wellbeing, <b>Trade</b> for exports and partners,
    <b>Regions</b> to compare provinces, and <b>Data Explorer</b> to chart any indicator over 2015–2024
    and download it as a spreadsheet file.</p></section>`;
}

export function viewEconomy() {
  return `
  <h1>Economy</h1>
  <p class="lede">Growth, prices, jobs and investment — Viet Nam's economy in 2024, with the ten-year trend.</p>
  <section class="grid stats">
    ${statCard({ label: "GDP", value: "$476bn", sub: "2024 · World Bank", detail: "Nominal, current US dollars." })}
    ${statCard({ label: "GDP growth", value: "7.09%", sub: "2024 · GSO", detail: "Real, year on year." })}
    ${statCard({ label: "GDP per capita", value: "$4,700", sub: "2024 · World Bank", detail: "Nominal, current US dollars." })}
    ${statCard({ label: "Inflation (CPI)", value: "3.63%", sub: "2024 · GSO", detail: "Average CPI rise." })}
    ${statCard({ label: "Unemployment", value: "2.24%", sub: "2024 · GSO", detail: "Ages 15+, urban and rural." })}
    ${statCard({ label: "FDI disbursed", value: "$25.4bn", sub: "2024 · GSO", detail: "Registered FDI $38.2bn." })}
    ${statCard({ label: "Exports", value: "$405.5bn", sub: "2024 · GSO", detail: "Trade surplus $24.8bn." })}
    ${statCard({ label: "Public debt", value: "≈37%", sub: "2024 · IMF, approx.", detail: "General government gross debt, % of GDP." })}
  </section>
  <section class="grid two">
    <article class="card"><h2>Real GDP growth, %</h2>
      ${columnChart(D.YEARS.map(String), D.GROWTH_SERIES, { unit: "%" })}
      <p class="src">Annual real growth · GSO. The 2020–21 dip is the pandemic; 2022 rebounded to 8.02%.</p></article>
    <article class="card"><h2>What the economy is made of</h2>
      ${donutChart(D.SECTORS)}
      <p class="src">Share of GDP, 2024 · GSO. Services is the largest sector at 42.4%.</p></article>
  </section>
  <section class="card"><h2>Inflation, 2015–2024</h2>
    ${lineChart(D.YEARS.map(String), D.CPI_SERIES, { color: "#5b8c2a", unit: "%" })}
    <p class="src">Average CPI inflation, % · GSO. Inflation stayed below 4% in every year shown; the highest was 3.6% in 2024.</p></section>`;
}

export function viewPopulation() {
  return `
  <h1>Population &amp; demographics</h1>
  <p class="lede">101.3 million people in 2024 — a young, working-age population that is urbanising fast.</p>
  <section class="grid stats">
    ${statCard({ label: "Population", value: "101.3m", sub: "2024 · GSO", detail: "Up from 92.2m in 2015." })}
    ${statCard({ label: "Working age (15–64)", value: "67.7%", sub: "2024 · GSO, approx.", detail: "About two in three people." })}
    ${statCard({ label: "Median age", value: "≈33 years", sub: "2024 · GSO, approx.", detail: "One of Asia's younger populations." })}
    ${statCard({ label: "Urban share", value: "42.6%", sub: "2024 · GSO", detail: "Up from 33% a decade ago." })}
  </section>
  <section class="grid two">
    <article class="card"><h2>Population growth, 2015–2024</h2>
      ${lineChart(D.YEARS.map(String), D.POP_SERIES, { color: "#0e7a6d" })}
      <p class="src">Millions · GSO. Growth has slowed to about 0.8% a year.</p></article>
    <article class="card"><h2>Age structure, 2024</h2>
      ${barChart(D.AGE_GROUPS.map((a) => ({ name: a.name, value: a.share })), { unit: "%", color: "#5b8c2a" })}
      <p class="src">Share of population · GSO, approx. Children are 23.2%; over-65s are 9.1%.</p></article>
  </section>
  <section class="card"><h2>Largest provinces</h2>
    <p>Ho Chi Minh City (9.5m) and Ha Noi (8.7m) hold nearly a fifth of the country.
    <a href="#/regions">Compare all twelve largest provinces →</a></p></section>`;
}

export function viewHealth() {
  return `
  <h1>Health &amp; education</h1>
  <p class="lede">How long people live, how healthy they are, and how much schooling they get.</p>
  <section class="grid two">
    <article class="card"><h2>Health</h2>${factTable(D.HEALTH)}
      <p class="src">Life expectancy has risen from 72.6 years in 2000 to 74.7 in 2024 (GSO).</p></article>
    <article class="card"><h2>Education</h2>${factTable(D.EDUCATION)}
      <p class="src">Adult literacy is 95.8% (2023, GSO); mean schooling is 9.2 years (2023, UNDP).</p></article>
  </section>
  <section class="card"><h2>Energy &amp; agriculture</h2>${factTable(D.ENERGY_AGRI)}
    <p class="src">Viet Nam is the world's second-largest coffee exporter and third-largest rice exporter (2024, GSO).</p></section>`;
}

export function viewTrade() {
  return `
  <h1>Trade</h1>
  <p class="lede">A trading nation: exports of $405.5bn against imports of $380.8bn in 2024 — a $24.8bn surplus.</p>
  <section class="grid stats">
    ${statCard({ label: "Exports", value: "$405.5bn", sub: "2024 · GSO", detail: "Goods exports." })}
    ${statCard({ label: "Imports", value: "$380.8bn", sub: "2024 · GSO", detail: "Goods imports." })}
    ${statCard({ label: "Trade surplus", value: "$24.8bn", sub: "2024 · GSO", detail: "Ninth straight annual surplus." })}
    ${statCard({ label: "Trade openness", value: "≈165% of GDP", sub: "2024 · World Bank, approx.", detail: "Exports + imports over GDP." })}
  </section>
  <section class="grid two">
    <article class="card"><h2>Exports vs imports, US$ bn</h2>
      ${lineChart(D.YEARS.map(String), D.EXPORT_SERIES, { color: "#0e7a6d" })}
      <p class="src">Goods exports (teal) · GSO. Imports tracked closely until the surplus widened after 2020.</p></article>
    <article class="card"><h2>Top export destinations, 2024</h2>
      ${barChart(D.TRADE_PARTNERS, { unit: " bn", color: "#c98a1b" })}
      <p class="src">US$ billion · GSO. The US alone takes 29% of exports.</p></article>
  </section>
  <section class="card"><h2>Top export goods, 2024</h2>
    ${barChart(D.EXPORT_GOODS, { unit: " bn", color: "#0e7a6d" })}
    <p class="src">US$ billion · GSO, approx. Electronics, phones and machinery are more than 40% of exports.</p></section>`;
}

export function viewRegions() {
  const rows = D.PROVINCES.map((p) => `<tr><td>${esc(p.name)}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${D.fmt(p.density)}</td><td class="num">${p.urban.toFixed(1)}%</td></tr>`).join("");
  return `
  <h1>Regions &amp; provinces</h1>
  <p class="lede">Compare the twelve largest provinces by population. Use the search box or click a column heading to sort.</p>
  <section class="card">
    <div class="toolbar">
      <label>Search provinces <input id="prov-search" type="search" placeholder="e.g. Da Nang" aria-label="Search provinces"></label>
      <p class="src">Population, millions · density, people per km² · urban share, % · 2024, GSO (approx.)</p>
    </div>
    <div class="table-wrap"><table id="prov-table" class="sortable">
      <thead><tr>
        <th><button data-sort="name">Province</button></th>
        <th><button data-sort="pop">Population (m)</button></th>
        <th><button data-sort="density">Density /km²</button></th>
        <th><button data-sort="urban">Urban %</button></th>
      </tr></thead><tbody>${rows}</tbody></table></div>
    <p class="muted">Ho Chi Minh City is the densest at 4,580 people per km²; Nghe An the sparsest here at 206.
    Da Nang (87.5%) and Binh Duong (84.0%) are the most urbanised.</p>
  </section>
  <section class="card"><h2>Population of the twelve largest provinces</h2>
    ${barChart(D.PROVINCES.map((p) => ({ name: p.name, value: p.pop })), { unit: "m", color: "#0e7a6d" })}
    <p class="src">Millions, 2024 · GSO, approx.</p></section>`;
}

export function viewExplorer() {
  const options = Object.entries(D.INDICATORS).map(([k, v]) =>
    `<option value="${k}">${esc(v.name)}</option>`).join("");
  const yearOptions = D.YEARS.map((y) => `<option value="${y}">${y}</option>`).join("");
  return `
  <h1>Data explorer</h1>
  <p class="lede">Chart any indicator from 2015 to 2024. Pick an indicator and a year range; the chart,
  the table and the download all follow.</p>
  <section class="card">
    <div class="toolbar explorer-bar">
      <label>Indicator
        <select id="ex-indicator">${options}</select></label>
      <label>From
        <select id="ex-from">${yearOptions}</select></label>
      <label>To
        <select id="ex-to">${yearOptions}</select></label>
      <button id="ex-download" class="btn" type="button">Download CSV</button>
    </div>
    <div id="ex-chart"></div>
    <p class="src" id="ex-source"></p>
    <div class="table-wrap"><table id="ex-table" class="facts">
      <thead><tr><th>Year</th><th>Value</th><th>Change on year before</th></tr></thead>
      <tbody id="ex-tbody"></tbody></table></div>
  </section>
  <section class="card"><h2>About the data</h2>
    <p>All series come from the General Statistics Office of Viet Nam or the World Bank's
    World Development Indicators, 2015–2024. GDP is nominal in current US dollars; growth and
    inflation are annual percentages; trade is goods only. Figures are rounded from the publishers' releases.</p></section>`;
}
