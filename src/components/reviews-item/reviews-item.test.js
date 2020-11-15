import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item";
import {mockReview} from "../../mocks/mock-data";

it(`Render correctly component ReviewsItem`, () => {
  const component = renderer.create(
      <ReviewsItem
        review={mockReview}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
