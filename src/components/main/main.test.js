import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Main from "./main";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component Main`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
