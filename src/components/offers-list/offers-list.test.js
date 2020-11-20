import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersList from "./offers-list";
import {mockOffers, mockFunction} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const CARD_STYLE = {
  article: `near-places__card`,
  imgWrapper: `near-places__image-wrapper`,
  imgWidth: 260,
  imgHeight: 200,
  info: ``,
};

it(`Render correctly component OffersList`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <OffersList
            offers={mockOffers}
            className={`class`}
            cardStyle={CARD_STYLE}
            onActiveCardChange={mockFunction}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
