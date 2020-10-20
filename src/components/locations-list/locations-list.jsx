import React from "react";
import {cityNameType, functionType} from "../../types";
import {City} from "../../const";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const LocationsList = (props) => {
  const {activeCity, onChangeActiveCity} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          Object.entries(City).map(([_, values]) => {
            const city = values.name;

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
};

export {LocationsList};
export default withActiveItem(LocationsList);
