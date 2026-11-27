// Viet Nam in Numbers — the figures behind the site.
//
// Every number below is a published figure, and every figure shown on the
// site carries its year and its source next to it. Sources: the World Bank's
// World Development Indicators (WDI), the General Statistics Office of
// Viet Nam (GSO), the UNDP Human Development Report, the United Nations
// World Population Prospects, and Viet Nam Electricity (EVN).
//
// Nothing here is estimated by this site: densities are the only computed
// values, and they are labelled "calculated" where they appear.

export const META = {
  country: "Viet Nam",
  updated: "November 2026",
  currency: "VND",
  areaKm2: 331338,
  areaSource: "World Bank, 2024",
};

// 2015-2024 series. GDP and GDP per capita are nominal US dollars
// (World Bank, WDI). Growth is real GDP growth (World Bank, WDI — the
// series the GSO's own 7.09% for 2024 belongs to).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const GDP_BN = [239.3, 257.1, 281.4, 310.1, 334.4, 346.6, 366.5, 413.4, 433.8, 476.3];
export const GDP_PC = [2582, 2746, 2974, 3231, 3425, 3526, 3704, 4148, 4323, 4717];
export const GDP_GROWTH = [6.99, 6.69, 6.94, 7.47, 7.36, 2.87, 2.55, 8.54, 5.07, 7.09];
export const POP_M = [92.8, 94.0, 95.2, 96.2, 97.2, 98.1, 98.9, 99.7, 100.4, 101.0];

// Headline indicators for the dashboard. Each card names its source.
export const HEADLINES = [
  { label: "GDP", value: "$476.4bn", note: "2024, World Bank", detail: "34th largest economy in the world" },
  { label: "GDP per capita", value: "$4,717", note: "2024, World Bank", detail: "Up $394 on 2023" },
  { label: "GDP growth", value: "7.09%", note: "2024, GSO", detail: "Fastest in Southeast Asia's big five" },
  { label: "Population", value: "101.0m", note: "2024, World Bank", detail: "16th most populous country" },
  { label: "Exports", value: "$405.5bn", note: "2024, GSO", detail: "9th straight year of trade surplus" },
  { label: "Life expectancy", value: "74.7 yrs", note: "2024, World Bank", detail: "Up from 70.5 years in 1990" },
];

// Economy view: trade, prices, investment, structure (all 2024, GSO
// unless the source column says otherwise).
export const ECONOMY = {
  trade: [
    { item: "Exports of goods", value: "$405.53bn", change: "+14.3% on 2023", source: "GSO, 2024" },
    { item: "Imports of goods", value: "$380.76bn", change: "+16.7% on 2023", source: "GSO, 2024" },
    { item: "Total trade turnover", value: "$786.29bn", change: "+15.4% on 2023", source: "GSO, 2024" },
    { item: "Trade balance", value: "+$24.77bn", change: "9th straight surplus", source: "GSO, 2024" },
    { item: "Largest export market", value: "United States, $119.6bn", change: "", source: "GSO, 2024" },
    { item: "Largest import source", value: "China, $144.3bn", change: "", source: "GSO, 2024" },
    { item: "Registered FDI", value: "$38.23bn", change: "disbursed $25.4bn", source: "GSO, 2024" },
    { item: "Consumer prices (CPI)", value: "+3.63%", change: "target: below 4%", source: "GSO, 2024" },
  ],
  sectors: [
    { name: "Services", share: 42.4, note: "42.4% of GDP" },
    { name: "Industry & construction", share: 37.6, note: "37.6% of GDP" },
    { name: "Agriculture, forestry & fishing", share: 11.9, note: "11.9% of GDP" },
    { name: "Product taxes less subsidies", share: 8.1, note: "8.1% of GDP" },
  ],
  extras: [
    { label: "Labour productivity", value: "$9,182", note: "per worker, 2024, GSO" },
    { label: "New enterprises", value: "157,200", note: "established in 2024, GSO" },
    { label: "Items exported over $1bn", value: "37", note: "94.3% of export value, GSO, 2024" },
    { label: "Unemployment rate", value: "2.24%", note: "2024, GSO" },
  ],
};

// People view.
export const PEOPLE = [
  { label: "Population", value: "101.0 million", note: "2024, World Bank", detail: "Growing 0.6% a year" },
  { label: "Median age", value: "32.4 years", note: "2023, United Nations", detail: "One of Asia's youngest workforces" },
  { label: "Fertility rate", value: "1.91", note: "births per woman, 2023, United Nations", detail: "Below replacement since 2022" },
  { label: "Life expectancy", value: "74.7 years", note: "2024, World Bank", detail: "Women 79.0, men 70.5 (UN, 2023)" },
  { label: "Infant mortality", value: "11.3", note: "per 1,000 live births, 2024, World Bank", detail: "Down from 32.6 in 1993" },
  { label: "Urban population", value: "38.8%", note: "2024, World Bank", detail: "Hanoi and Ho Chi Minh City hold 22% of the country" },
  { label: "Land area", value: "331,338 km²", note: "World Bank, 2024", detail: "Density 305 people per km² (calculated)" },
  { label: "Human Development Index", value: "0.766", note: "2023, UNDP", detail: "Rank 93 of 193; high human development" },
];

// Society view: schooling, health, digital life.
export const SOCIETY = {
  education: [
    { item: "Lower-secondary net enrolment", value: "95%", source: "World Bank, 2024" },
    { item: "Upper-secondary net enrolment", value: "79%", source: "World Bank, 2024" },
    { item: "Mean years of schooling", value: "9.0 years", source: "UNDP, 2023" },
    { item: "Expected years of schooling", value: "13.7 years", source: "UNDP, 2023" },
  ],
  health: [
    { item: "Life expectancy at birth", value: "74.7 years", source: "World Bank, 2024" },
    { item: "Infant mortality", value: "11.3 per 1,000", source: "World Bank, 2024" },
    { item: "Under-5 mortality", value: "17 per 1,000", source: "World Bank, 2024" },
    { item: "HDI health component", value: "0.766 overall", source: "UNDP, 2023" },
  ],
  digital: [
    { item: "People using the internet", value: "84.2%", source: "World Bank, 2024" },
    { item: "Mobile subscriptions", value: "131 per 100 people", source: "World Bank, 2023" },
    { item: "Fixed broadband subscriptions", value: "22.8 million", source: "ITU, 2023" },
    { item: "Rural electrification", value: "99.7%", source: "EVN, 2024" },
  ],
};

// Energy and infrastructure view (EVN, 2024).
export const ENERGY = {
  generationTwh: 308.7,
  capacityGw: 82.4,
  mix: [
    { source: "Coal", share: 50, note: "50% of generation" },
    { source: "Hydropower", share: 29, note: "29% of generation" },
    { source: "Solar, wind & other renewables", share: 13, note: "13% of generation" },
    { source: "Gas & other", share: 8, note: "8% of generation" },
  ],
  facts: [
    { label: "Electricity generated", value: "308.7 TWh", note: "2024, EVN — up 9.9% on 2023" },
    { label: "Installed capacity", value: "82.4 GW", note: "2024, EVN" },
    { label: "Renewable capacity", value: "21.4 GW", note: "26% of capacity, 2024, EVN" },
    { label: "Solar generation", value: "~26 TWh", note: "2024, EVN" },
    { label: "Retail electricity price", value: "2,103 VND/kWh", note: "average, excl. VAT, 2024, EVN" },
    { label: "EVN's own generation", value: "124 TWh", note: "40% of national output, 2024, EVN" },
  ],
};

// Comparison view: Viet Nam against four ASEAN neighbours.
// All five columns are World Bank, World Development Indicators, 2024.
export const COMPARE = [
  { country: "Viet Nam", gdp: 476.4, pc: 4717, pop: 101.0, life: 74.7, net: 84.2, self: true },
  { country: "Thailand", gdp: 526.5, pc: 7347, pop: 71.7, life: 76.6, net: 90.9, self: false },
  { country: "Indonesia", gdp: 1396.3, pc: 4925, pop: 283.5, life: 71.3, net: 72.8, self: false },
  { country: "Philippines", gdp: 461.6, pc: 3985, pop: 115.8, life: 69.9, net: 67.3, self: false },
  { country: "Malaysia", gdp: 422.2, pc: 11874, pop: 35.6, life: 76.8, net: 98.0, self: false },
];

// Provinces view. Table A: provinces and cities after the 2025 merger
// (Resolution 60-NQ/TW), population and area with the GRDP ("economic
// scale") the GSO published with the merger plan. Density is calculated
// from the two published columns. Table B: the five largest provincial
// economies by 2025 GRDP (GSO).
export const PROVINCES = [
  { name: "Ho Chi Minh City", pop: 13608800, area: 6772.6, grdp: 2715782 },
  { name: "Hanoi", pop: 8435650, area: 3359.8, grdp: 1425521 },
  { name: "Dong Nai", pop: 4427700, area: 12737.2, grdp: 609176 },
  { name: "Hai Phong", pop: 4102700, area: 3194.7, grdp: 658381 },
  { name: "Phu Tho", pop: 3663600, area: 9361.4, grdp: 354580 },
  { name: "Bac Ninh", pop: 3509100, area: 4718.6, grdp: 439776 },
  { name: "Lam Dong", pop: 3324400, area: 24233.1, grdp: 319887 },
  { name: "Hung Yen", pop: 3208400, area: 2514.8, grdp: 292603 },
  { name: "Gia Lai", pop: 3153300, area: 21576.5, grdp: 242008 },
  { name: "Thai Nguyen", pop: 1694500, area: 8375.3, grdp: 185614 },
  { name: "Quang Ninh", pop: 1362880, area: 6207.9, grdp: 347534 },
  { name: "Ha Tinh", pop: 1317200, area: 5994.5, grdp: 112855 },
];

export const PROVINCE_ECONOMIES = [
  { name: "Ho Chi Minh City", grdp: 2972939, growth: 7.53, pc: 8775 },
  { name: "Hanoi", grdp: 1587379, growth: 8.16, pc: 7175 },
  { name: "Hai Phong", grdp: 734420, growth: 11.81, pc: 7787 },
  { name: "Dong Nai", grdp: 677932, growth: 9.63, pc: 6040 },
  { name: "Bac Ninh", grdp: 522618, growth: 10.27, pc: 5852 },
];

// Sources view: where every figure comes from.
export const SOURCES = [
  { source: "General Statistics Office of Viet Nam (GSO)", covers: "GDP growth 2024, CPI, exports and imports, trade balance, FDI, unemployment, sector shares, labour productivity, new enterprises", year: "2024", note: "Published at the GSO press conference, 6 January 2025" },
  { source: "World Bank, World Development Indicators", covers: "GDP, GDP per capita, population, life expectancy, infant mortality, urban share, internet users, mobile subscriptions, enrolment, and all comparison figures", year: "2015–2024", note: "Country data pages for Viet Nam, Thailand, Indonesia, Philippines and Malaysia" },
  { source: "United Nations, World Population Prospects", covers: "Median age, fertility rate, life expectancy by sex", year: "2023", note: "2024 revision" },
  { source: "UNDP, Human Development Report", covers: "Human Development Index and its schooling components", year: "2023", note: "2025 edition; Viet Nam ranks 93 of 193" },
  { source: "Viet Nam Electricity (EVN)", covers: "Electricity generated, installed capacity, generation mix, renewable capacity, retail price, rural electrification", year: "2024", note: "EVN annual report and system operation data" },
  { source: "GSO, Resolution 60-NQ/TW merger plan", covers: "Provincial population, area and GRDP after the 2025 merger of 63 provinces into 34", year: "2024–2025", note: "Population and GRDP are the figures published with the merger plan" },
];
