import React from "react";
import renderer from "react-test-renderer";
import Container from "./container";

it(`Render correctly component Container`, () => {
  const component = renderer.create(
      <Container
        id={`id`}
        style={{}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
