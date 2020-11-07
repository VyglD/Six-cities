const mockFunction = () => {};

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

const city = CITIES[3];
const activeCity = CITIES[0];

const SortType = {
  DEFAULT: {
    value: `Popular`,
    method: () => {},
  },
  PRICE_TO_HIGH: {
    value: `Price: low to high`,
    method: (i, j) => (i.cost - j.cost),
  },
  PRICE_TO_LOW: {
    value: `Price: high to low`,
    method: (i, j) => (j.cost - i.cost),
  },
  RATE: {
    value: `Top rated first`,
    method: (i, j) => (j.rate - i.rate),
  },
};

export {
  mockFunction,
  city,
  activeCity,
  CITIES,
  SortType,
};
