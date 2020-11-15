import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Offer from "./offer";
import {mockOffers, mockReview} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

describe(`Render correctly component Offer`, () => {
  it(`Render Offer`, () => {
    const div = document.createElement(`div`);
    div.id = `map`;
    document.body.appendChild(div);

    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Offer
              offerId={mockOffers[0].id}
              allOffers={mockOffers}
              isLogin={true}
              reviews={[mockReview]}
              nearOffers={mockOffers}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();

    div.remove();
  });

  it(`Render Offer without login`, () => {
    const div = document.createElement(`div`);
    div.id = `map`;
    document.body.appendChild(div);

    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Offer
              offerId={mockOffers[0].id}
              allOffers={mockOffers}
              isLogin={false}
              reviews={[mockReview]}
              nearOffers={mockOffers}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();

    div.remove();
  });
});
