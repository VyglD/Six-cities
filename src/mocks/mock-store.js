import configureStore from 'redux-mock-store';
import {
  mockOffers,
  mockOffersFavoriteIds,
  activeCity,
} from "./mock-data";

const createStore = configureStore();

const mockStore = createStore({
  OFFERS: {
    allOffers: mockOffers,
  },
  FAVORITES: {
    favoriteIds: mockOffersFavoriteIds,
  },
  OFFER: {
    openedOfferId: null,
    reviews: [],
    nearOffers: [],
  },
  USER: {
    isLogin: false,
    email: ``,
    avatar: ``,
    isSuper: false,
  },
  REDIRECT: {},
  CITY: {
    activeCity,
  },
});

export {mockStore};
