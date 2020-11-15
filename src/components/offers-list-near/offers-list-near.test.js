import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersListNear from "./offers-list-near";
import {mockOffers} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const CARD_STYLE = {
  article: `near-places__card`,
  imgWrapper: `near-places__image-wrapper`,
};

describe(`Render correctly component OffersList`, () => {
  it(`Render OffersList`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListNear
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render OffersList with cardStyle`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListNear
              offers={mockOffers}
              className={`class`}
              cardStyle={CARD_STYLE}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
