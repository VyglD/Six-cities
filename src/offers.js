import {City} from "./const";

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

export {getOffersByCities, getFirstNotEmptyCity};
