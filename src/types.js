import PropTypes from "prop-types";
import {HousingType, City} from "./const";

export const stringType = PropTypes.string.isRequired;

export const cityNameType = PropTypes.oneOf(
    Object.values(City).map((properties) => properties.name)
).isRequired;

export const CityType = PropTypes.exact({
  name: cityNameType,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
}).isRequired;

export const offerIdType = PropTypes.string.isRequired;

export const offerType = PropTypes.exact({
  id: offerIdType,
  city: cityNameType,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
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

export const functionType = PropTypes.func.isRequired;
export const notRequiredFunctionType = PropTypes.func;

export const mapType = PropTypes.instanceOf(Map).isRequired;

export const emailType = PropTypes.string.isRequired;

export const cardStyleType = PropTypes.shape({
  article: PropTypes.string,
  imgWrapper: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  info: PropTypes.string,
}).isRequired;
