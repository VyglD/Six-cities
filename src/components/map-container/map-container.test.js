import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import MapContainer from "./map-container";
import {activeCity, mockOffers} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component MapContainer`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MapContainer
            offers={mockOffers}
            activeOffer={mockOffers[0]}
            activeCity={activeCity}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
