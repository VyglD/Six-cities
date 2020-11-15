import React from "react";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import RestrictiveRoute from "./restrictive-route";
import {mockFunction} from "../../mocks/mock-data";

describe(`Render correctly component RestrictiveRoute`, () => {
  it(`Render RestrictiveRoute with access`, () => {
    const component = renderer.create(
        <MemoryRouter>
          <RestrictiveRoute
            condition={true}
            exact={true}
            path={`/`}
            redirectPath={`/`}
            render={mockFunction}
          />
        </MemoryRouter>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render RestrictiveRoute without access`, () => {
    const component = renderer.create(
        <MemoryRouter>
          <RestrictiveRoute
            condition={false}
            exact={true}
            path={`/`}
            redirectPath={`/`}
            render={mockFunction}
          />
        </MemoryRouter>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

});
