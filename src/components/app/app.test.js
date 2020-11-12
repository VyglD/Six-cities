import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import App from "./app";
import {mockOffers, mockOffersFavoriteIds} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component App`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <App
            isLogin={true}
            allOffersIds={mockOffersFavoriteIds}
            openOffer={mockOffers[0]}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
