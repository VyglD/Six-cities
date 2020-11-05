import PropTypes from "prop-types";
import {HousingType, CITIES, SortType} from "./const";

const anyType = PropTypes.any;

const stringType = PropTypes.string.isRequired;

const numberType = PropTypes.number.isRequired;

const boolType = PropTypes.bool.isRequired;

const notRequiredFunctionType = PropTypes.func;
const functionType = notRequiredFunctionType.isRequired;

const notRequiredCityNameType = PropTypes.oneOf(CITIES);
const cityNameType = notRequiredCityNameType.isRequired;

const citiesType = PropTypes.arrayOf(cityNameType).isRequired;

const CityInfoType = PropTypes.exact({
  name: cityNameType,
  latitude: numberType,
  longitude: numberType,
  zoom: numberType,
}).isRequired;

const offerIdType = PropTypes.string.isRequired;
const offerIdsType = PropTypes.arrayOf(offerIdType).isRequired;

const notRequiredOfferType = PropTypes.exact({
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
const offerType = notRequiredOfferType.isRequired;

const offersType = PropTypes.arrayOf(offerType).isRequired;

const reviewType = PropTypes.exact({
  id: stringType,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  rate: numberType,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired
});

const reviewsType = PropTypes.arrayOf(reviewType).isRequired;

const mapType = PropTypes.instanceOf(Map).isRequired;

const emailType = PropTypes.string.isRequired;

const cardStyleType = PropTypes.shape({
  article: PropTypes.string,
  imgWrapper: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  info: PropTypes.string,
}).isRequired;

const favoriteBtnStyleType = PropTypes.shape({
  btnClassName: PropTypes.string,
  btnActiveClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
});

const sortType = PropTypes.oneOf(
    Object.values(SortType).map(({value}) => value)
).isRequired;

export {
  anyType,
  stringType,
  numberType,
  boolType,
  notRequiredFunctionType,
  functionType,
  notRequiredCityNameType,
  cityNameType,
  citiesType,
  CityInfoType,
  offerIdType,
  offerIdsType,
  notRequiredOfferType,
  offerType,
  offersType,
  reviewType,
  reviewsType,
  mapType,
  emailType,
  cardStyleType,
  favoriteBtnStyleType,
  sortType,
};
