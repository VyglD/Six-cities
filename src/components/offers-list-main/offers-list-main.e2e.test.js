import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OffersListMain from "./offers-list-main";
import {mockOffers, SortType, mockFunction} from "../../mocks/mock-data";
import {mockStore} from "../../mocks/mock-store";

configure({adapter: new Adapter()});

const LIST_ITEM_TITLE_CLASS = `place-card__name`;

describe(`Checking sorting`, () => {
  it(`Check sort by default`, () => {
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
              activeSort={SortType.DEFAULT.value}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(`.${LIST_ITEM_TITLE_CLASS} a`).at(0).text())
      .toBe(`Title of first server offer`);
  });

  it(`Check sort by PRICE_TO_HIGH`, () => {
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
              activeSort={SortType.PRICE_TO_HIGH.value}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(`.${LIST_ITEM_TITLE_CLASS} a`).at(0).text())
      .toBe(`Title of cheapest offer`);
  });

  it(`Check sort by PRICE_TO_LOW`, () => {
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
              activeSort={SortType.PRICE_TO_LOW.value}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(`.${LIST_ITEM_TITLE_CLASS} a`).at(0).text())
      .toBe(`Title of most expensive offer`);
  });

  it(`Check sort by RATE`, () => {
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OffersListMain
              offers={mockOffers}
              className={`class`}
              cardStyle={{}}
              activeSort={SortType.RATE.value}
              onActiveCardChange={mockFunction}
            />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(`.${LIST_ITEM_TITLE_CLASS} a`).at(0).text())
      .toBe(`Title of top rated offer`);
  });
});
