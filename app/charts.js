// Viet Nam in Numbers — hand-rolled SVG charts.
//
// No chart library: every chart is plain SVG built from the data, so the
// site loads nothing from anywhere and every number in a chart is a number
// from data.js. Two builders: a line chart for year series and a horizontal
// bar chart for comparing values across categories.

const INK = "#1c2733";
const GRID = "#ddd5c3";
const RED = "#a31d1d";
const TEAL = "#0e6b6b";
const GOLD = "#b98a1d";
const MUTED = "#6b6f76";

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function niceMax(value) {
  // Round the axis ceiling up to a tidy step (1, 2, 5 or 10 x 10^n).
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const base = value / pow;
  const step = base <= 1 ? 1 : base <= 2 ? 2 : base <= 5 ? 5 : 10;
  return step * pow;
}

function fmtTick(value) {
  if (value >= 1000) return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + "k";
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

// Line chart for a year series. opts: { width, height, color, unit,
// decimals, label }.
export function lineChart(years, values, opts) {
  const w = opts.width || 720;
  const h = opts.height || 260;
  const padL = 56;
  const padR = 14;
  const padT = 14;
  const padB = 30;
  const color = opts.color || RED;
  const max = niceMax(Math.max(...values) * 1.05);
  const min = 0;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const x = (i) => padL + (i / (values.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;

  let grid = "";
  for (let t = 0; t <= 4; t++) {
    const gv = min + ((max - min) * t) / 4;
    const gy = y(gv);
    grid += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(gv)}</text>`;
  }

  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${padL},${padT + ih} ${points} ${x(values.length - 1).toFixed(1)},${padT + ih}`;
  let dots = "";
  let labels = "";
  values.forEach((v, i) => {
    dots += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${color}"/>`;
    if (i % 2 === 0 || i === values.length - 1) {
      labels += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${years[i]}</text>`;
    }
  });
  const last = values[values.length - 1];
  const lastLabel = opts.decimals ? last.toFixed(opts.decimals) : String(last);
  const valueTag = `<text x="${x(values.length - 1)}" y="${y(last) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${esc(lastLabel)}${esc(opts.unit || "")}</text>`;

  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label || "Line chart")}">` +
    grid +
    `<polygon points="${area}" fill="${color}" opacity="0.08"/>` +
    `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` +
    dots + valueTag + labels +
    `</svg>`;
}

// Horizontal bar chart for named values. opts: { width, barH, color,
// unit, decimals, label, highlight } — highlight names the row drawn in
// red (the rest use teal); the others use the accent colour.
export function barChart(rows, opts) {
  const w = opts.width || 720;
  const rowH = opts.barH || 34;
  const padL = 150;
  const padR = 74;
  const h = rows.length * rowH + 16;
  const max = niceMax(Math.max(...rows.map((r) => r.value)) * 1.05);
  const iw = w - padL - padR;
  const accent = opts.color || TEAL;

  let out = `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label || "Bar chart")}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(2, (r.value / max) * iw);
    const fill = opts.highlight && r.name === opts.highlight ? RED : accent;
    const shown = opts.decimals ? r.value.toFixed(opts.decimals) : String(r.value);
    out += `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.name)}</text>` +
      `<rect x="${padL}" y="${y + 5}" width="${bw.toFixed(1)}" height="18" rx="3" fill="${fill}"/>` +
      `<text x="${padL + bw + 8}" y="${y + 19}" font-size="12" font-weight="600" fill="${INK}">${esc(shown)}${esc(opts.unit || "")}</text>`;
  });
  out += "</svg>";
  return out;
}

// Small horizontal share bars for a composition (sector shares, energy
// mix). Returns stacked HTML bars with a legend; the widths are the
// published shares, so the bars always add up to 100.
export function shareBars(rows, colors) {
  let bars = "";
  let legend = "";
  rows.forEach((r, i) => {
    const color = colors[i % colors.length];
    bars += `<div style="flex:${r.share} 1 0%;background:${color};min-width:2px" title="${esc(r.name)}: ${r.share}%"></div>`;
    legend += `<span class="legend-item"><i style="background:${color}"></i>${esc(r.name)} — ${r.share}%</span>`;
  });
  return `<div class="sharebar" role="img" aria-label="Shares add up to 100 percent">${bars}</div><div class="legend">${legend}</div>`;
}

export const CHART_COLORS = { red: RED, teal: TEAL, gold: GOLD };
