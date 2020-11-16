import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import {mockOffers, activeCity, CITIES} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

import withMap from "./with-map";

const getCitiesInfo = (offers) => {
  const City = new Map(
      CITIES.map((city) => [city, null])
  );

  offers.forEach((offer) => {
    const cityName = offer.cityInfo.name;
    if (!City.get(cityName)) {
      City.set(cityName, offer.cityInfo);
    }
  });

  return City;
};

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withMap(MockComponent);

it(`Render correctly hoc withActiveItem`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create((
    <Provider store={mockStore}>
      <MemoryRouter>
        <MockComponentWrapped
          offers={mockOffers}
          activeOffer={mockOffers[0]}
          activeCity={activeCity}
          citiesInfo={getCitiesInfo(mockOffers)}
        >
          <React.Fragment />
        </MockComponentWrapped>
      </MemoryRouter>
    </Provider>
  )).toJSON();

  expect(component).toMatchSnapshot();
});
