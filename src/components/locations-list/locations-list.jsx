import React from "react";
import {connect} from "react-redux";
import {cityNameType, functionType, citiesType} from "../../types";
import {getCities} from "../../store/selectors";

const LocationsList = (props) => {
  const {activeCity, onChangeActiveCity, cities} = props;

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
                  onClick={onChangeActiveCity}
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
  onChangeActiveCity: functionType,
  cities: citiesType,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
});

export {LocationsList};
export default connect(mapStateToProps)(LocationsList);
