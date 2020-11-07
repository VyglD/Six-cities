import React from "react";
import renderer from "react-test-renderer";
import LocationsLink from "./locations-link";
import {mockFunction, city, activeCity} from "../../tests/mock-data";

describe(`Render correctly component LocationsLink`, () => {
  it(`Render LocationsLink`, () => {
    const component = renderer.create(
        <LocationsLink
          city={city}
          activeCity={activeCity}
          onCityClick={mockFunction}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render LocationsLink with activeCity`, () => {
    const component = renderer.create(
        <LocationsLink
          city={activeCity}
          activeCity={activeCity}
          onCityClick={mockFunction}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render LocationsLink with cusomClass`, () => {
    const component = renderer.create(
        <LocationsLink
          city={city}
          activeCity={activeCity}
          onCityClick={mockFunction}
          customClass={`tabs__item`}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render LocationsLink with activeCity and cusomClass`, () => {
    const component = renderer.create(
        <LocationsLink
          city={activeCity}
          activeCity={activeCity}
          onCityClick={mockFunction}
          customClass={`tabs__item`}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
