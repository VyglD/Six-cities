import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ReviewForm} from "./review-form";
import {mockOffers} from "../../mocks/mock-data";

configure({adapter: new Adapter()});

it(`Checking correction of submit data in ReviewForm`, () => {
  const handleSumbitForm = jest.fn();

  const wrapper = mount(
      <ReviewForm
        chosenOffer={mockOffers[0]}
        postNewReview={handleSumbitForm}
      />
  );

  const textAreaField = wrapper.find(`.reviews__textarea`).instance();
  const ratingFields = wrapper.find(`.form__rating-input`);
  const sumbitButton = wrapper.find(`.reviews__submit`);

  textAreaField.value = ``;
  ratingFields.forEach((item) => {
    item.instance().checked = false;
  });
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  textAreaField.value = ``;
  ratingFields.at(4).instance().checked = true;
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  textAreaField.value = new Array(51).fill(`a`).reduce((item, result) => result.concat(item));
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(1);

  textAreaField.value = new Array(301).fill(`a`).reduce((item, result) => result.concat(item));
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(1);

  textAreaField.value = new Array(49).fill(`a`).reduce((item, result) => result.concat(item));
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(1);

  textAreaField.value = new Array(51).fill(`a`).reduce((item, result) => result.concat(item));
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(2);

  ratingFields.forEach((item) => {
    item.instance().checked = false;
  });
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(2);

  ratingFields.at(0).instance().checked = true;
  sumbitButton.simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(3);
});
