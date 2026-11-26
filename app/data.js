// Vietnam in Numbers — the data behind the site.
//
// Every figure is a real published statistic, labelled with its year and
// its publisher. Figures marked "approx." are rounded from the publisher's
// release. Sources: GSO = General Statistics Office of Viet Nam,
// World Bank = World Bank World Development Indicators,
// IMF = International Monetary Fund, UNDP = UN Development Programme,
// EVN = Viet Nam Electricity.

export const META = {
  country: "Viet Nam",
  updated: "November 2026",
  note: "All figures are published statistics. Each card and chart names its year and source.",
};

export const KEY_STATS = [
  { label: "Population", value: "101.3m", sub: "2024 · GSO", detail: "The 15th most populous country in the world." },
  { label: "GDP", value: "$476bn", sub: "2024 · World Bank", detail: "Nominal GDP, current US dollars." },
  { label: "GDP per capita", value: "$4,700", sub: "2024 · World Bank", detail: "Nominal, current US dollars." },
  { label: "GDP growth", value: "7.09%", sub: "2024 · GSO", detail: "Real GDP growth, year on year." },
  { label: "Inflation (CPI)", value: "3.63%", sub: "2024 · GSO", detail: "Average consumer price index rise." },
  { label: "Unemployment", value: "2.24%", sub: "2024 · GSO", detail: "Urban and rural, ages 15+." },
  { label: "Exports", value: "$405.5bn", sub: "2024 · GSO", detail: "Goods exports; trade surplus $24.8bn." },
  { label: "Life expectancy", value: "74.7 yrs", sub: "2024 · GSO", detail: "At birth, both sexes combined." },
];

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Nominal GDP, US$ billion (World Bank, current US$)
export const GDP_SERIES = [233, 252, 281, 310, 334, 343, 366, 408, 430, 476];
// Real GDP growth, % (GSO)
export const GROWTH_SERIES = [6.68, 6.21, 6.81, 7.08, 7.02, 2.91, 2.58, 8.02, 5.05, 7.09];
// Population, millions (GSO)
export const POP_SERIES = [92.2, 93.3, 94.4, 95.5, 96.5, 97.6, 98.5, 99.5, 100.3, 101.3];
// CPI inflation, % average (GSO)
export const CPI_SERIES = [0.6, 2.7, 3.5, 3.5, 2.8, 3.2, 1.8, 3.2, 3.3, 3.6];
// Goods exports, US$ billion (GSO)
export const EXPORT_SERIES = [162, 176, 214, 243, 264, 283, 336, 371, 355, 406];
// Goods imports, US$ billion (GSO)
export const IMPORT_SERIES = [166, 175, 213, 237, 253, 263, 333, 360, 327, 381];
// FDI disbursed, US$ billion (GSO)
export const FDI_SERIES = [14.5, 15.8, 17.5, 19.1, 20.4, 20.0, 19.7, 22.4, 23.2, 25.4];

export const INDICATORS = {
  gdp: { name: "GDP (nominal, US$ bn)", series: GDP_SERIES, unit: "US$ bn", source: "World Bank, 2015–2024" },
  growth: { name: "Real GDP growth (%)", series: GROWTH_SERIES, unit: "%", source: "GSO, 2015–2024" },
  population: { name: "Population (millions)", series: POP_SERIES, unit: "million", source: "GSO, 2015–2024" },
  cpi: { name: "CPI inflation (%)", series: CPI_SERIES, unit: "%", source: "GSO, 2015–2024" },
  exports: { name: "Goods exports (US$ bn)", series: EXPORT_SERIES, unit: "US$ bn", source: "GSO, 2015–2024" },
  imports: { name: "Goods imports (US$ bn)", series: IMPORT_SERIES, unit: "US$ bn", source: "GSO, 2015–2024" },
  fdi: { name: "FDI disbursed (US$ bn)", series: FDI_SERIES, unit: "US$ bn", source: "GSO, 2015–2024" },
};

// Share of GDP, 2024 (GSO). Taxes less subsidies on products: 8.1%.
export const SECTORS = [
  { name: "Services", share: 42.4, color: "#0e7a6d" },
  { name: "Industry & construction", share: 37.6, color: "#c98a1b" },
  { name: "Agriculture, forestry & fishery", share: 11.9, color: "#5b8c2a" },
  { name: "Taxes less subsidies", share: 8.1, color: "#8a94a6" },
];

// Age structure, 2024 (GSO, approx.)
export const AGE_GROUPS = [
  { name: "0–14 years", share: 23.2 },
  { name: "15–24 years", share: 15.6 },
  { name: "25–54 years", share: 42.1 },
  { name: "55–64 years", share: 10.0 },
  { name: "65+ years", share: 9.1 },
];

// Top export destinations, 2024, US$ bn (GSO)
export const TRADE_PARTNERS = [
  { name: "United States", value: 119.6 },
  { name: "China", value: 61.2 },
  { name: "European Union", value: 52.0 },
  { name: "South Korea", value: 25.5 },
  { name: "Japan", value: 21.6 },
  { name: "Netherlands", value: 12.7 },
];

// Top export goods, 2024, US$ bn (GSO, approx.)
export const EXPORT_GOODS = [
  { name: "Electronics & computers", value: 72.0 },
  { name: "Phones & parts", value: 53.0 },
  { name: "Machinery & equipment", value: 52.5 },
  { name: "Textiles & garments", value: 44.0 },
  { name: "Footwear", value: 22.0 },
  { name: "Wood & wooden products", value: 16.3 },
];

// Provinces by population, 2024 (GSO, approx.). Density is people per km².
export const PROVINCES = [
  { name: "Ho Chi Minh City", pop: 9.5, density: 4580, urban: 79.6 },
  { name: "Ha Noi", pop: 8.7, density: 2590, urban: 49.1 },
  { name: "Thanh Hoa", pop: 3.7, density: 330, urban: 26.4 },
  { name: "Nghe An", pop: 3.4, density: 206, urban: 21.8 },
  { name: "Dong Nai", pop: 3.2, density: 546, urban: 41.9 },
  { name: "Binh Duong", pop: 2.8, density: 1034, urban: 84.0 },
  { name: "Hai Phong", pop: 2.1, density: 1356, urban: 47.4 },
  { name: "An Giang", pop: 1.9, density: 540, urban: 36.0 },
  { name: "Dak Lak", pop: 1.9, density: 144, urban: 25.4 },
  { name: "Thai Binh", pop: 1.9, density: 1190, urban: 13.5 },
  { name: "Quang Ngai", pop: 1.3, density: 248, urban: 21.6 },
  { name: "Da Nang", pop: 1.2, density: 960, urban: 87.5 },
];

export const HEALTH = [
  { label: "Life expectancy at birth", value: "74.7 years", year: "2024", source: "GSO" },
  { label: "Under-5 mortality", value: "18.8 per 1,000", year: "2023", source: "UN IGME" },
  { label: "Health spending", value: "5.9% of GDP", year: "2022", source: "World Bank" },
  { label: "Health insurance coverage", value: "94.3%", year: "2024", source: "GSO" },
  { label: "Hospital beds", value: "32 per 10,000", year: "2023", source: "GSO, approx." },
  { label: "Physicians", value: "1.3 per 1,000", year: "2023", source: "World Bank, approx." },
];

export const EDUCATION = [
  { label: "Adult literacy (15+)", value: "95.8%", year: "2023", source: "GSO" },
  { label: "Mean years of schooling", value: "9.2 years", year: "2023", source: "UNDP" },
  { label: "Primary school enrolment", value: "99.0%", year: "2023", source: "World Bank, approx." },
  { label: "Higher-education students", value: "2.1 million", year: "2023", source: "GSO, approx." },
  { label: "Public education spending", value: "4.1% of GDP", year: "2022", source: "World Bank, approx." },
];

export const ENERGY_AGRI = [
  { label: "Installed power capacity", value: "84.1 GW", year: "2024", source: "EVN" },
  { label: "Renewables share of capacity", value: "43%", year: "2024", source: "EVN, approx." },
  { label: "Electricity access", value: "99.7%", year: "2023", source: "World Bank" },
  { label: "Rice production", value: "43.5m tonnes", year: "2024", source: "GSO" },
  { label: "Rice exports", value: "9.2m tonnes · $5.7bn", year: "2024", source: "GSO" },
  { label: "Coffee exports", value: "1.32m tonnes · $5.5bn", year: "2024", source: "GSO" },
];

export function fmt(n, decimals = 0) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
