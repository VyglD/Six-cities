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

export const City = {
  PARIS: {
    name: `Paris`,
    latitude: 48.85341,
    longitude: 2.3,
  },
  COLOGNE: {
    name: `Cologne`,
    latitude: 50.9333,
    longitude: 7.0,
  },
  BRUSSELS: {
    name: `Brussels`,
    latitude: 50.8504,
    longitude: 4.3,
  },
  AMSTERDAM: {
    name: `Amsterdam`,
    latitude: 52.38333,
    longitude: 4.9,
  },
  HAMBURG: {
    name: `Hamburg`,
    latitude: 53.5753,
    longitude: 10.0,
  },
  DUSSELDORF: {
    name: `Dusseldorf`,
    latitude: 51.2217,
    longitude: 6.8,
  },
};

export const Path = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  OFFER_ID: `offerId`
};
