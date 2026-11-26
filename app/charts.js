// Charts for Vietnam in Numbers — hand-rolled SVG, no library.
// Each function returns an SVG string; the site never fetches anything.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}

// Line chart. labels: year strings, values: numbers.
export function lineChart(labels, values, { width = 640, height = 260, color = "#0e7a6d", unit = "" } = {}) {
  const padL = 52, padR = 14, padT = 14, padB = 28;
  const w = width - padL - padR, h = height - padT - padB;
  const min = Math.min(0, ...values), max = niceMax(Math.max(...values) * 1.05);
  const x = (i) => padL + (i * w) / (labels.length - 1);
  const y = (v) => padT + h - ((v - min) / (max - min)) * h;
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${padL},${y(min)} ${pts} ${x(values.length - 1).toFixed(1)},${y(min)}`;
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#e3e7ec" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#667085">${fmtNum(gv)}${unit}</text>`;
  }
  const dots = values.map((v, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`).join("");
  const xlabels = labels.map((l, i) =>
    `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#667085">${esc(l)}</text>`).join("");
  const last = values[values.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart, latest value ${fmtNum(last)}${unit}" style="width:100%;height:auto;display:block">
    ${grid}<polygon points="${area}" fill="${color}" opacity="0.08"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${xlabels}</svg>`;
}

function fmtNum(v) {
  if (v >= 100) return String(Math.round(v));
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(1);
}

// Horizontal bar chart. items: [{name, value}], maxValue optional.
export function barChart(items, { width = 640, barH = 30, color = "#0e7a6d", unit = "" } = {}) {
  const padL = 150, padR = 70, gap = 10;
  const height = items.length * (barH + gap) + 8;
  const max = niceMax(Math.max(...items.map((i) => i.value)));
  const rows = items.map((it, i) => {
    const y = 8 + i * (barH + gap);
    const bw = ((width - padL - padR) * it.value) / max;
    return `<text x="${padL - 10}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="12.5" fill="#1d2939">${esc(it.name)}</text>` +
      `<rect x="${padL}" y="${y}" width="${Math.max(bw, 2).toFixed(1)}" height="${barH}" rx="4" fill="${it.color || color}"/>` +
      `<text x="${padL + bw + 8}" y="${y + barH / 2 + 4}" font-size="12.5" font-weight="600" fill="#1d2939">${fmtNum(it.value)}${unit}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" style="width:100%;height:auto;display:block">${rows}</svg>`;
}

// Donut chart for shares. items: [{name, share, color}].
export function donutChart(items, { size = 220 } = {}) {
  const r = 80, c = 2 * Math.PI * r, cx = size / 2, cy = size / 2;
  let off = 0;
  const rings = items.map((it) => {
    const len = (it.share / 100) * c;
    const s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${it.color}" stroke-width="26" stroke-dasharray="${len.toFixed(1)} ${(c - len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}"/>`;
    off += len;
    return s;
  }).join("");
  const legend = items.map((it) =>
    `<div class="legend-row"><span class="swatch" style="background:${it.color}"></span>${esc(it.name)}<b>${it.share}%</b></div>`).join("");
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Share donut chart" style="width:${size}px;height:${size}px">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef1f4" stroke-width="26"/>${rings}
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#1d2939">${items[0].share}%</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11.5" fill="#667085">${esc(items[0].name)}</text></svg>
    <div class="legend">${legend}</div></div>`;
}

// Vertical column chart for a single series.
export function columnChart(labels, values, { width = 640, height = 260, color = "#c98a1b", unit = "" } = {}) {
  const padL = 52, padR = 14, padT = 14, padB = 28;
  const w = width - padL - padR, h = height - padT - padB;
  const max = niceMax(Math.max(...values) * 1.05);
  const slot = w / labels.length;
  const bw = Math.min(44, slot * 0.62);
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const gv = (max * g) / 4;
    const gy = padT + h - (gv / max) * h;
    grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#e3e7ec"/>` +
      `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#667085">${fmtNum(gv)}${unit}</text>`;
  }
  const bars = values.map((v, i) => {
    const bh = (v / max) * h;
    const x = padL + i * slot + (slot - bw) / 2;
    return `<rect x="${x.toFixed(1)}" y="${(padT + h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${color}"/>` +
      `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#667085">${esc(labels[i])}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Column chart" style="width:100%;height:auto;display:block">${grid}${bars}</svg>`;
}
