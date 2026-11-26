# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/h2tran/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/h2tran/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Viet Nam in Numbers — a national statistics site for Viet Nam, built for make.fun's "Make the best national statistics site" bounty. Overview dashboard, economy, population & demographics, health & education, trade, province comparison, and a data explorer with filters, charts and CSV download. Every figure is a real published statistic labelled with its year and source (General Statistics Office of Viet Nam, World Bank, IMF, UNDP, EVN). Static files only, no network requests, works on desktop and phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. Or serve `app/` with any static server.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22, standard library only. `main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

---

<sub>Entered on [make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
