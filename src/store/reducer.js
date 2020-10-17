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

const allOffersByCity = getOffersByCities(mockOffers);

const initialState = {
  city: City.PARIS,
  offers: allOffersByCity.get(City.PARIS.name),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      const newCity = action.payload;

      return extend(state, {
        city: newCity,
        offers: allOffersByCity.get(newCity),
      });
    case ActionType.GET_OFFERS:
      return state;
  }

  return state.offers;
};

export {reducer};
