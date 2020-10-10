import PropTypes from "prop-types";
import {HOUSING_TYPE} from "./const";

export const offerType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isPremium: PropTypes.bool.isRequired,
  housingType: PropTypes.oneOf(Object.values(HOUSING_TYPE)),
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

export const reviewType = PropTypes.exact({
  offerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
});

export const reviewsType = PropTypes.arrayOf(reviewType).isRequired;

export const placesCountType = PropTypes.number.isRequired;

export const rateCoefficientType = PropTypes.number.isRequired;

export const onMouseEnterType = PropTypes.func.isRequired;
