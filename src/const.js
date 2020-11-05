const MAX_RATE = 5;
const RATE_COEFFICIENT = 100 / MAX_RATE;

const MAX_NEAR_OFFERS = 3;
const MAX_REVIEWS = 10;

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

const HousingType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

const AMSTERDAM = `Amsterdam`;

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  AMSTERDAM,
  `Hamburg`,
  `Dusseldorf`
];

const Path = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  OFFER_ID: `offerId`
};

const APIRoute = {
  OFFERS: `/hotels`,
  REVIEWS: `/comments`,
  NEAR: `/nearby`,
  LOGIN: `/login`,
  FAVORITE: `/favorite`,
};

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
  MAX_RATE,
  RATE_COEFFICIENT,
  MAX_NEAR_OFFERS,
  MAX_REVIEWS,
  Key,
  HousingType,
  AMSTERDAM,
  CITIES,
  Path,
  APIRoute,
  SortType,
};
