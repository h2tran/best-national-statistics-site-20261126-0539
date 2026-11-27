// Viet Nam in Numbers — boot.
//
// One job: build the navigation from the view list and start the router.
// All rendering lives in views.js; all figures live in data.js.

import { render } from "./views.js";

const NAV = [
  ["", "Dashboard"],
  ["economy", "Economy"],
  ["compare", "Compare"],
  ["people", "People"],
  ["society", "Society"],
  ["energy", "Energy"],
  ["provinces", "Provinces"],
  ["sources", "Sources"],
];

const nav = document.getElementById("nav");
NAV.forEach(([route, label]) => {
  const a = document.createElement("a");
  a.href = "#/" + route;
  a.textContent = label;
  nav.appendChild(a);
});

window.addEventListener("hashchange", render);
render();

// Signal to screenshot tooling that the first render is done.
window.__shotReady = true;
