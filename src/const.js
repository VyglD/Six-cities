const MAX_RATE = 5;

export const RATE_COEFFICIENT = 100 / MAX_RATE;

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

export const CUSTOM_OFFER_CARD_PROPERTIES_ENUM = {
  CITIES: {
    article: `cities__place-card`,
    imgWrapper: `cities__image-wrapper`,
    imgWidth: 260,
    imgHeight: 200,
    info: ``,
  },
  FAVORITES: {
    article: `favorites__card`,
    imgWrapper: `favorites__image-wrapper`,
    imgWidth: 150,
    imgHeight: 110,
    info: `favorites__card-info`,
  }
};
