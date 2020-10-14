import PropTypes from "prop-types";
import {HousingType, CITIES} from "./const";

export const offerIdType = PropTypes.string.isRequired;

export const offerType = PropTypes.exact({
  id: offerIdType,
  city: PropTypes.oneOf(Object.values(CITIES)).isRequired,
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isPremium: PropTypes.bool.isRequired,
  housingType: PropTypes.oneOf(Object.values(HousingType)).isRequired,
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

export const favoriteOfferIdsType = PropTypes.arrayOf(offerIdType).isRequired;

export const reviewType = PropTypes.exact({
  offerId: offerIdType,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired
});

export const reviewsType = PropTypes.arrayOf(reviewType).isRequired;

export const pathsType = PropTypes.shape().isRequired;

export const citiesType = PropTypes.arrayOf(
    PropTypes.oneOf(CITIES).isRequired
).isRequired;

export const numberConstantType = PropTypes.number.isRequired;

export const cardStyleType = PropTypes.shape({
  article: PropTypes.string.isRequired,
  imgWrapper: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired,
}).isRequired;

export const cardStyleEnumType = PropTypes.shape().isRequired;

export const functionType = PropTypes.func.isRequired;
export const notRequiredFunctionType = PropTypes.func;

export const mapType = PropTypes.instanceOf(Map).isRequired;

export const emailType = PropTypes.string.isRequired;

export const activeCityType = PropTypes.oneOf(CITIES);

