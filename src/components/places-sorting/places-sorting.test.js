import React from "react";
import renderer from "react-test-renderer";
import PlacesSorting from "./places-sorting";
import {mockFunction, SortType} from "../../mocks/mock-data";

it(`Render correctly component PlacesSorting`, () => {
  const component = renderer.create(
      <PlacesSorting
        activeSort={SortType.DEFAULT.value}
        onActiveSortChange={mockFunction}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
