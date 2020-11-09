import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersList from "./offers-list";
import {mockOffers, mockFunction} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component OffersList`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <OffersList
            offers={mockOffers}
            className={`class`}
            cardStyle={{}}
            onActiveCardChange={mockFunction}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
