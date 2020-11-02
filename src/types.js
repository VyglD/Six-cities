import PropTypes from "prop-types";
import {HousingType, CITIES} from "./const";

export const anyType = PropTypes.any;

export const stringType = PropTypes.string.isRequired;

export const numberType = PropTypes.number.isRequired;

export const boolType = PropTypes.bool.isRequired;

export const functionType = PropTypes.func.isRequired;
export const notRequiredFunctionType = PropTypes.func;

export const notRequiredCityNameType = PropTypes.oneOf(CITIES);
export const cityNameType = notRequiredCityNameType.isRequired;

export const citiesType = PropTypes.arrayOf(cityNameType).isRequired;

export const CityInfoType = PropTypes.exact({
  name: cityNameType,
  latitude: numberType,
  longitude: numberType,
  zoom: numberType,
}).isRequired;

export const offerIdType = PropTypes.string.isRequired;
export const offerIdsType = PropTypes.arrayOf(offerIdType).isRequired;

export const notRequiredOfferType = PropTypes.exact({
  id: offerIdType,
  city: cityNameType,
  latitude: numberType,
  longitude: numberType,
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.string.isRequired,
  isPremium: boolType,
  housingType: PropTypes.oneOf(Object.values(HousingType)).isRequired,
  rate: numberType,
  rooms: numberType,
  guests: numberType,
  cost: numberType,
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  owner: PropTypes.exact({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSuper: boolType,
  }).isRequired,
  cityInfo: CityInfoType,
});
export const offerType = notRequiredOfferType.isRequired;

export const offersType = PropTypes.arrayOf(offerType).isRequired;

export const reviewType = PropTypes.exact({
  id: stringType,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  rate: numberType,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired
});

export const reviewsType = PropTypes.arrayOf(reviewType).isRequired;

export const mapType = PropTypes.instanceOf(Map).isRequired;

export const emailType = PropTypes.string.isRequired;

export const cardStyleType = PropTypes.shape({
  article: PropTypes.string,
  imgWrapper: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  info: PropTypes.string,
}).isRequired;

export const favoriteBtnStyleType = PropTypes.shape({
  btnClassName: PropTypes.string,
  btnActiveClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
});
