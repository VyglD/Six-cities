import {createSelector} from "reselect";
import {City} from "../const";

export const allOffers = (state) => state.OFFERS.allOffers;

export const getAllOfferIds = createSelector(
    [allOffers],
    (offers) => {
      return offers.map((offer) => offer.id);
    }
);

export const getOffersByCities = createSelector(
    [allOffers],
    (offers) => {
      const offersByCity = new Map(
          Object.entries(City).map(([_, values]) => [values.name, []])
      );

      offers.forEach((offer) => {
        offersByCity.get(offer.city).push(offer);
      });

      return offersByCity;
    }
);

export const getFirstNotEmptyCity = createSelector(
    [getOffersByCities],
    (offersByCity) => {
      const cities = Array.from(offersByCity.keys());
      const firstNotEmptyCity = cities.find((city) => offersByCity.get(city).length > 0);

      return firstNotEmptyCity ? firstNotEmptyCity : cities[0];
    }
);
