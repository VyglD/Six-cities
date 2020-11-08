import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {OfferCard} from "./offer-card";
import {mockOffers} from "../../mocks/mock-data";

configure({adapter: new Adapter()});

it(`Toggling of selecting OfferCard`, () => {
  const handleActiveCardChange = jest.fn();

  const wrapper = shallow(
      <OfferCard
        offer={mockOffers[0]}
        onActiveCardChange={handleActiveCardChange}
        cardStyle={{}}
      />
  );

  wrapper.simulate(`focus`);
  expect(handleActiveCardChange).toHaveBeenCalledTimes(1);

  wrapper.simulate(`blur`);
  expect(handleActiveCardChange).toHaveBeenCalledTimes(2);
});
