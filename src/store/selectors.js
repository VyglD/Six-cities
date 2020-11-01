import {createSelector} from "reselect";
import {CITIES as orderedCities} from "../const";

const allOffers = (state) => state.OFFERS.allOffers;

export const getAllOfferIds = createSelector(
    [allOffers],
    (offers) => {
      return offers.map((offer) => offer.id);
    }
);

export const getCitiesInfo = createSelector(
    [allOffers],
    (offers) => {
      const City = new Map(
          orderedCities.map((city) => [city, null])
      );

      offers.forEach((offer) => {
        const cityName = offer.cityInfo.name;
        if (!City.get(cityName)) {
          City.set(cityName, offer.cityInfo);
        }
      });

      return City;
    }
);

export const getCities = createSelector(
    [getCitiesInfo],
    (citiesInfo) => {
      return Array.from(citiesInfo.entries()).map(([_, values]) => values.name);
    }
);

export const getOffersByCities = createSelector(
    [allOffers, getCities],
    (offers, cities) => {
      const offersByCity = new Map(
          cities.map((city) => [city, []])
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
