# Viet Nam in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/h2tran/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/h2tran/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry by [@minh-h-tran](https://make.fun) — GitHub
[h2tran/best-national-statistics-site-20261126-0539](https://github.com/h2tran/best-national-statistics-site-20261126-0539).
No wallet address is set in this entry; the entrant links their Solana
wallet on make.fun when they submit and claim.

Viet Nam's national statistics portal: the economy, the people, schooling
and health, energy, the provinces, and a comparison with four ASEAN
neighbours — every figure labelled with its year and its source.

## What's inside

Eight hash-routed views, all static files under `app/`:

- **Dashboard** — headline indicators, GDP growth 2015–2024, GDP in
  billion dollars, and 2024 in brief.
- **Economy** — GDP growth with a 5-year / 10-year toggle, GDP per person,
  the 2024 trade table, and what the economy is made of.
- **Compare** — Viet Nam vs Thailand, Indonesia, Philippines and Malaysia
  on GDP, GDP per capita, population, life expectancy and internet users
  (World Bank, 2024), with a sortable table and a metric switcher.
- **People** — population 2015–2024, median age, fertility, life
  expectancy, infant mortality, urban share, HDI.
- **Society** — education, health and digital life.
- **Energy** — generation mix, capacity, prices, EVN in 2024.
- **Provinces** — sortable table of the 34 provinces after the 2025
  merger (population, area, density, GRDP) and the five largest provincial
  economies.
- **Sources** — where every figure comes from, and how to read the site.

Interactive controls that do what they say: sortable table columns on the
Compare and Provinces pages, a year toggle on the growth chart, and a
metric switcher on the comparison chart. Charts are hand-rolled SVG; no
library, no network: every script, stylesheet and figure is a file under
`app/`.

## Figures

Real published figures only, each labelled with year and source on the
page itself: World Bank World Development Indicators (2015–2024), the
General Statistics Office of Viet Nam (2024), UNDP Human Development
Report (2023), United Nations World Population Prospects (2023), and
Viet Nam Electricity (EVN, 2024). Density is the only computed value and
is labelled "calculated".

## Run

```sh
node serve.ts            # serves app/ at http://localhost:8082
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22, standard library only. `main.ts` copies `app/` and
`screenshots/` to the output directory and writes `dossier.json` with the
vendored make.fun library. It never deletes the output directory: the
grader mounts it.

## License

MIT — see LICENSE.
