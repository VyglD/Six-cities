export const MAX_RATE = 5;
export const RATE_COEFFICIENT = 100 / MAX_RATE;

export const MAX_NEAR_OFFERS = 3;
export const MAX_REVIEWS = 10;

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

export const Path = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  OFFER_ID: `offerId`
};

export const APIRoute = {
  OFFERS: `/hotels`,
  REVIEWS: `/comments`,
  NEAR: `/nearby`,
  LOGIN: `/login`,
  FAVORITE: `/favorite`,
};
