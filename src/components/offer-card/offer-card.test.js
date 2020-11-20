import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {OfferCard} from "./offer-card";
import {mockFunction, mockOffers} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const CARD_STYLE = {
  article: `favorites__card`,
  imgWrapper: `favorites__image-wrapper`,
  imgWidth: 150,
  imgHeight: 110,
  info: `favorites__card-info`,
};

it(`Render correctly component OfferCard`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <OfferCard
            offer={mockOffers[0]}
            onActiveCardChange={mockFunction}
            cardStyle={CARD_STYLE}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
