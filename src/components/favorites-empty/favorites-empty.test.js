import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty";

it(`Render correctly component FavoritesEmpty`, () => {
  const component = renderer.create(
      <FavoritesEmpty />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
