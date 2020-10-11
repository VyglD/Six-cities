const MAX_RATE = 5;

export const RATE_COEFFICIENT = 100 / MAX_RATE;

export const PLACES_COUNT = 312;

export const HOUSING_TYPE = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

export const PATHS = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/`,
  OFFER_ID: `/offer/:id`,
};
