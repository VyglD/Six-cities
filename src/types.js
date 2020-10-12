import PropTypes from "prop-types";
import {HOUSING_TYPE, CITIES} from "./const";

export const offerType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  city: PropTypes.oneOf(Object.values(CITIES)).isRequired,
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isPremium: PropTypes.bool.isRequired,
  housingType: PropTypes.oneOf(Object.values(HOUSING_TYPE)).isRequired,
  rate: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  owner: PropTypes.exact({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired
  }).isRequired,
});

export const offersType = PropTypes.arrayOf(offerType).isRequired;

export const favoriteOffersType = PropTypes.arrayOf(
    PropTypes.string.isRequired
).isRequired;

export const reviewType = PropTypes.exact({
  offerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired
});

export const reviewsType = PropTypes.arrayOf(reviewType).isRequired;

export const functionType = PropTypes.func.isRequired;

export const emailType = PropTypes.string.isRequired;

export const pathsType = PropTypes.shape().isRequired;

export const citiesType = PropTypes.arrayOf(
    PropTypes.oneOf(CITIES).isRequired
).isRequired;

export const historyType = PropTypes.shape({
  push: PropTypes.func.isRequired,
}).isRequired;

export const componentType = PropTypes.element.isRequired;

export const activeCityType = PropTypes.oneOf(CITIES);

export const offersByCityEntriesType = PropTypes.arrayOf(
    PropTypes.array.isRequired
).isRequired;

export const customOfferCardPropertiesEmumType = PropTypes.shape().isRequired;

export const customOfferCardPropertiesType = PropTypes.shape({
  article: PropTypes.string.isRequired,
  imgWrapper: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired,
}).isRequired;
