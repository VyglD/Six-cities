import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LocationsLink from "./locations-link";
import {city, activeCity} from "../../tests/mock-data";

configure({adapter: new Adapter()});

it(`Click on link calls callback`, () => {
  const handleLinkClick = jest.fn();

  const wrapper = shallow(
      <LocationsLink
        city={city}
        activeCity={activeCity}
        onCityClick={handleLinkClick}
      />
  );

  wrapper.find(`.locations__item-link`).simulate(`click`);
  expect(handleLinkClick).toHaveBeenCalledTimes(1);
});
