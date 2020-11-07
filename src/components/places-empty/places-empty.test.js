import React from "react";
import renderer from "react-test-renderer";
import PlacesEmpty from "./places-empty";

it(`Render correctly component PlacesEmpty`, () => {
  const component = renderer.create(
      <PlacesEmpty />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
