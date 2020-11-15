import React from "react";
import renderer from "react-test-renderer";
import Stars from "./stars";
import {mockOffers} from "../../mocks/mock-data";

it(`Render correctly component Stars`, () => {
  const component = renderer.create(
      <Stars
        offer={mockOffers[0]}
        customClass={`stars`}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
