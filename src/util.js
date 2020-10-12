import {RATE_COEFFICIENT, CITIES} from "./const";
import moment from "moment";

export const getSystemFormattedDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getHumanFormattedDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

export const getRateVisualisation = (rate) => {
  return {width: `${rate * RATE_COEFFICIENT}%`};
};

export const getOffersByCities = (offers) => {
  const offersByCity = new Map([
    ...CITIES.map((city) => [city, []])
  ]);

  offers.forEach((offer) => {
    offersByCity.get(offer.city).push(offer);
  });

  return offersByCity;
};
