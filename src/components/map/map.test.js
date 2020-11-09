import React from "react";
import renderer from "react-test-renderer";
import {Map as MapComponent} from "./map";
import {activeCity, mockOffers, CITIES} from "../../mocks/mock-data";

const getCitiesInfo = (offers) => {
  const City = new Map(
      CITIES.map((city) => [city, null])
  );

  offers.forEach((offer) => {
    const cityName = offer.cityInfo.name;
    if (!City.get(cityName)) {
      City.set(cityName, offer.cityInfo);
    }
  });

  return City;
};

it(`Render correctly component Map`, () => {
  const div = document.createElement(`div`);
  div.id = `map`;
  document.body.appendChild(div);

  const component = renderer.create(
      <MapComponent
        offers={mockOffers}
        activeOffer={mockOffers[0]}
        activeCity={activeCity}
        citiesInfo={getCitiesInfo(mockOffers)}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
