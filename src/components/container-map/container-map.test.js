import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import ContainerMap from "./container-map";
import {mockOffers, activeCity} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

it(`Render correctly component ContainerMap`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ContainerMap
            id={`id`}
            style={{}}
            offers={mockOffers}
            activeOffer={mockOffers[0]}
            activeCity={activeCity}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
