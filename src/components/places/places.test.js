import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Places from "./places";
import {mockOffers, mockFunction, activeCity} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

describe(`Render correctly component Places`, () => {
  it(`Render Places`, () => {
    const div = document.createElement(`div`);
    div.id = `map`;
    document.body.appendChild(div);

    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Places
              offers={mockOffers}
              activeCity={activeCity}
              activeOffer={mockOffers[0]}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render Places without offers`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Places
              offers={[]}
              activeCity={activeCity}
              activeOffer={null}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
