import React from "react";
import renderer from "react-test-renderer";
import {LoginForm} from "./login-form";
import {mockFunction} from "../../mocks/mock-data";

it(`Render correctly component LoginForm`, () => {
  const component = renderer.create(
      <LoginForm
        logIn={mockFunction}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
