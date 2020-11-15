import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import PlacesOffers from "./places-offers";
import {mockFunction, mockOffers, activeCity, SortType} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component PlacesOffers`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PlacesOffers
            offers={mockOffers}
            activeCity={activeCity}
            activeSort={SortType.DEFAULT.value}
            onActiveSortChange={mockFunction}
            onActiveCardChange={mockFunction}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
