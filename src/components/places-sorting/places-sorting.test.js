import React from "react";
import renderer from "react-test-renderer";
import {PlacesSorting} from "./places-sorting";
import {mockFunction, SortType} from "../../mocks/mock-data";

describe(`Render correctly component PlacesSorting`, () => {
  it(`Render PlacesSorting with closed menu`, () => {
    const component = renderer.create(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={mockFunction}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render PlacesSorting with opened menu`, () => {
    const component = renderer.create(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={true}
          onMenuVisibilityChange={mockFunction}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
