import React from "react";
import {connect} from "react-redux";
import LocationsLink from "../locations-link/locations-link";
import {getCities} from "../../store/selectors";
import {cityNameType, functionType, citiesType} from "../../types";

const CUSTOM_CLASS = `tabs__item`;

const LocationsList = (props) => {
  const {activeCity, onActiveCityChange, cities} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => {
            return (
              <li className="locations__item" key={city}>
                <LocationsLink
                  city={city}
                  activeCity={activeCity}
                  onCityClick={onActiveCityChange}
                  customClass={CUSTOM_CLASS}
                />
              </li>
            );
          })
        }
      </ul>
    </section>
  );
};

LocationsList.propTypes = {
  activeCity: cityNameType,
  onActiveCityChange: functionType,
  cities: citiesType,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
});

export {LocationsList};
export default connect(mapStateToProps)(LocationsList);
