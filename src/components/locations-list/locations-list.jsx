import React from "react";
import {connect} from "react-redux";
import {getCities} from "../../store/selectors";
import {cityNameType, functionType, citiesType} from "../../types";

const LocationsList = (props) => {
  const {activeCity, onActiveCityChange, cities} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => {

            return (
              <li className="locations__item" key={city}>
                <a
                  className={
                    `locations__item-link tabs__item ${
                      (city === activeCity) && `tabs__item--active
                    `}`
                  }
                  href="#"
                  onClick={onActiveCityChange}
                >
                  <span>{city}</span>
                </a>
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
