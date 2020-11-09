import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersListFavorite from "./offers-list-favorite";
import {mockOffers} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const CARD_STYLE = {
  article: `favorites__card`,
  imgWrapper: `favorites__image-wrapper`,
  imgWidth: 150,
  imgHeight: 110,
  info: `favorites__card-info`,
};

describe(`Render correctly component OffersList`, () => {
  it(`Render OffersList`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListFavorite
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
            <OffersListFavorite
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


