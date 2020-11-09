import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {MainContent} from "./main-content";
import {activeCity, mockFunction, mockOffers, CITIES} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

const getOffersByCities = (offers, cities) => {
  const offersByCity = new Map(
      cities.map((city) => [city, []])
  );

  offers.forEach((offer) => {
    offersByCity.get(offer.city).push(offer);
  });

  return offersByCity;
};

it(`Render correctly component MainContent`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MainContent
            activeCity={activeCity}
            onActiveCityChange={mockFunction}
            offersByCities={getOffersByCities(mockOffers, CITIES)}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
