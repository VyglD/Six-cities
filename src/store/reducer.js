import {City} from "../const";
import {extend} from "../util";
import {ActionType} from "../store/action";
import mockOffers from "../mocks/offers";

const getOffersByCities = (offers) => {
  const offersByCity = new Map(
      Object.entries(City).map(([_, values]) => [values.name, []])
  );

  offers.forEach((offer) => {
    offersByCity.get(offer.city).push(offer);
  });

  return offersByCity;
};

const getFirstNotEmptyCity = (offersByCity) => {
  const keys = Array.from(offersByCity.keys());
  const firstNotEmptyCity = keys.find((key) => offersByCity.get(key).length > 0);

  return firstNotEmptyCity ? firstNotEmptyCity : keys[0];
};

const allOffersByCity = getOffersByCities(mockOffers);
const firstNotEmptyCity = getFirstNotEmptyCity(allOffersByCity);

const initialState = {
  allOffers: mockOffers,
  activeCity: firstNotEmptyCity,
  activeOffer: null,
  offers: allOffersByCity.get(firstNotEmptyCity),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CITY:
      const newCity = action.payload;

      return extend(state, {
        activeCity: newCity,
        activeOffer: null,
        offers: allOffersByCity.get(newCity),
      });
    case ActionType.CHANGE_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer};
