import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {FavoritesCities} from "./favorites-cities";
import {mockFunction, mockOffers, mockOffersFavoriteIds} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const getFavoriteOffersByCities = (offers, offersIds) => {
  const favoriteOffersByCities = new Map();

  offers.filter((offer) => offersIds.includes(offer.id))
  .forEach((offer) => {
    if (favoriteOffersByCities.has(offer.city)) {
      favoriteOffersByCities.get(offer.city).push(offer);
    } else {
      favoriteOffersByCities.set(offer.city, [offer]);
    }
  });

  return favoriteOffersByCities;
};

it(`Render correctly component FavoritesCities`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <FavoritesCities
            favoriteOffersByCities={
              getFavoriteOffersByCities(mockOffers, mockOffersFavoriteIds)
            }
            showCityOffers={mockFunction}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
