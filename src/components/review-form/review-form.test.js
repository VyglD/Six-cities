import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form";
import {mockOffers, mockFunction} from "../../mocks/mock-data";

it(`Render correctly component ReviewForm`, () => {
  const component = renderer.create(
      <ReviewForm
        chosenOffer={mockOffers[0]}
        postNewReview={mockFunction}
      />,
      {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(component).toMatchSnapshot();
});
