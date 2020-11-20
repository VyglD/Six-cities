import React from "react";
import renderer from "react-test-renderer";
import {FavoriteButton} from "./favorite-button";
import {
  mockOffers,
  mockOffersFavoriteIds,
  mockFunction
} from "../../mocks/mock-data";

const FAVORITE_BTN_STYLE = {
  btnClassName: `property__bookmark-button`,
  btnActiveClassName: `property__bookmark-button--active`,
  iconClassName: `property__bookmark-icon`,
  iconWidth: 31,
  iconHeight: 33,
};

describe(`Render correctly component FavoriteButton`, () => {
  it(`Render FavoriteButton`, () => {
    const component = renderer.create(
        <FavoriteButton
          offer={mockOffers[3]}
          favoriteIds={mockOffersFavoriteIds}
          addFavorite={mockFunction}
          deleteFavorite={mockFunction}
          favoriteBtnStyle={FAVORITE_BTN_STYLE}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render FavoriteButton of favorite offer`, () => {
    const component = renderer.create(
        <FavoriteButton
          offer={mockOffers[0]}
          favoriteIds={mockOffersFavoriteIds}
          addFavorite={mockFunction}
          deleteFavorite={mockFunction}
          favoriteBtnStyle={FAVORITE_BTN_STYLE}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
