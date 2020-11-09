import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OffersListMain from "./offers-list-main";
import {mockOffers, SortType, mockFunction} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const CARD_STYLE = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

describe(`Render correctly component OffersList`, () => {
  it(`Render OffersList`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
              activeSort={SortType.DEFAULT.value}
              onActiveCardChange={mockFunction}
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
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={CARD_STYLE}
              activeSort={SortType.DEFAULT.value}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});


