import React from "react";
import renderer from "react-test-renderer";
import {LocationsList} from "./locations-list";
import {mockFunction, CITIES, activeCity} from "../../mocks/mock-data";

it(`Render correctly component LocationsList`, () => {
  const component = renderer.create(
      <LocationsList
        activeCity={activeCity}
        onActiveCityChange={mockFunction}
        cities={CITIES}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
