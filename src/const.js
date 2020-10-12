const MAX_RATE = 5;

export const RATE_COEFFICIENT = 100 / MAX_RATE;

export const MAX_NEAR_OFFERS = 3;

export const HousingType = {
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

export const Paths = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  OFFER_ID: `offerId`
};

export const CardStyle = {
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
  },
  NEAR_PLACES: {
    article: `near-places__card`,
    imgWrapper: `near-places__image-wrapper`,
    imgWidth: 260,
    imgHeight: 200,
    info: ``,
  }
};
