import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {Header} from "./header";
import {} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

describe(`Render correctly component Header`, () => {
  it(`Render Header`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Header
              isLogin={false}
              email={``}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render Header with email`, () => {
    const component = renderer.create(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Header
              isLogin={true}
              email={`examle@email.ru`}
            />
          </MemoryRouter>
        </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});

