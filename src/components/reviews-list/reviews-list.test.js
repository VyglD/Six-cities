import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import {mockReview} from "../../mocks/mock-data";

describe(`Render correctly component ReviewsList`, () => {
  it(`Render ReviewsList`, () => {
    const component = renderer.create(
        <ReviewsList
          reviews={[mockReview]}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`Render ReviewsList without reviews`, () => {
    const component = renderer.create(
        <ReviewsList
          reviews={[]}
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
