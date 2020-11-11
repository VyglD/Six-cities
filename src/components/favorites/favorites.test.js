import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Favorites from "./favorites";
import {mockOffersFavoriteIds} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

describe(`Render correctly component Favorites`, () => {
  it(`Render Favorites`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Favorites
              favoriteIds={mockOffersFavoriteIds}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render Favorites without favorites`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Favorites
              favoriteIds={[]}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
