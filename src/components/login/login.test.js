import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {Login} from "./login";
import {mockFunction} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component Login`, () => {
  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Login
            showAmsterdamOffers={mockFunction}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
