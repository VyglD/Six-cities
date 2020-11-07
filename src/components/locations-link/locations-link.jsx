import React from "react";
import {cityNameType, functionType, notRequiredStringType} from "../../types";

const LocationsLink = (props) => {
  const {city, activeCity, onCityClick, customClass} = props;
  return (
    <a
      className={
        `locations__item-link
          ${customClass}
          ${(city === activeCity) ? `tabs__item--active` : ``}`
      }
      href="#"
      onClick={onCityClick}
    >
      <span>{city}</span>
    </a>
  );
};

LocationsLink.propTypes = {
  city: cityNameType,
  activeCity: cityNameType,
  onCityClick: functionType,
  customClass: notRequiredStringType,
};

LocationsLink.defaultProps = {
  customClass: ``,
};

export default LocationsLink;
