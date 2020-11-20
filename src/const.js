const MAX_RATE = 5;
const RATE_COEFFICIENT = 100 / MAX_RATE;

const MAX_OFFER_PHOTO = 6;
const MAX_NEAR_OFFERS = 3;
const MAX_REVIEWS = 10;

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`,
  SPACE: ` `,
  TAB: `Tab`,
  SHIFT: `Shift`,
  UP: `ArrowUp`,
  DOWN: `ArrowDown`,
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

const OffersListProps = {
  MAIN: {
    containerClass: `cities__places-list places__list tabs__content`,
    cardStyle: {
      article: `cities__place-card`,
      imgWrapper: `cities__image-wrapper`,
      imgWidth: 260,
      imgHeight: 200,
      info: ``,
    }
  },
  NEAR: {
    containerClass: `near-places__list places__list`,
    cardStyle: {
      article: `near-places__card`,
      imgWrapper: `near-places__image-wrapper`,
      imgWidth: 260,
      imgHeight: 200,
      info: ``,
    }
  },
  FAVORITE: {
    containerClass: `favorites__places`,
    cardStyle: {
      article: `favorites__card`,
      imgWrapper: `favorites__image-wrapper`,
      imgWidth: 150,
      imgHeight: 110,
      info: `favorites__card-info`,
    }
  }
};

const FavoriteBtnStyle = {
  CARD: {
    btnClassName: `place-card__bookmark-button`,
    btnActiveClassName: `place-card__bookmark-button--active`,
    iconClassName: `place-card__bookmark-icon`,
    iconWidth: 18,
    iconHeight: 19,
  },
  OFFER: {
    btnClassName: `property__bookmark-button`,
    btnActiveClassName: `property__bookmark-button--active`,
    iconClassName: `property__bookmark-icon`,
    iconWidth: 31,
    iconHeight: 33,
  }
};

export {
  MAX_RATE,
  RATE_COEFFICIENT,
  MAX_OFFER_PHOTO,
  MAX_NEAR_OFFERS,
  MAX_REVIEWS,
  Key,
  HousingType,
  AMSTERDAM,
  CITIES,
  Path,
  APIRoute,
  SortType,
  OffersListProps,
  FavoriteBtnStyle,
};
