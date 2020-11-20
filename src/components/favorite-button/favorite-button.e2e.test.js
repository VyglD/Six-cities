import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FavoriteButton} from "./favorite-button";
import {mockOffers, mockOffersFavoriteIds} from "../../mocks/mock-data";

configure({adapter: new Adapter()});

const FAVORITE_BTN_STYLE = {
  btnClassName: `property__bookmark-button`,
  btnActiveClassName: `property__bookmark-button--active`,
  iconClassName: `property__bookmark-icon`,
  iconWidth: 31,
  iconHeight: 33,
};

describe(`Click on component calls callback`, () => {
  it(`Click calls addFavorite`, () => {
    const handleClickForAdd = jest.fn();
    const handleClickForDelete = jest.fn();

    const wrapper = shallow(
        <FavoriteButton
          offer={mockOffers[3]}
          favoriteIds={mockOffersFavoriteIds}
          addFavorite={handleClickForAdd}
          deleteFavorite={handleClickForDelete}
          favoriteBtnStyle={FAVORITE_BTN_STYLE}
        />
    );

    wrapper.simulate(`click`);
    expect(handleClickForAdd).toHaveBeenCalledTimes(1);
    expect(handleClickForDelete).toHaveBeenCalledTimes(0);
  });

  it(`Click calls deleteFavorite`, () => {
    const handleClickForAdd = jest.fn();
    const handleClickForDelete = jest.fn();

    const wrapper = shallow(
        <FavoriteButton
          offer={mockOffers[0]}
          favoriteIds={mockOffersFavoriteIds}
          addFavorite={handleClickForAdd}
          deleteFavorite={handleClickForDelete}
          favoriteBtnStyle={FAVORITE_BTN_STYLE}
        />
    );

    wrapper.simulate(`click`);
    expect(handleClickForAdd).toHaveBeenCalledTimes(0);
    expect(handleClickForDelete).toHaveBeenCalledTimes(1);
  });
});
