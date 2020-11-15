import React from "react";
import {configure, shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlacesSorting} from "./places-sorting";
import {
  mockFunction,
  Key,
  SortType,
  mockEvent,
  mockEscKeyEvent,
} from "../../mocks/mock-data";

configure({adapter: new Adapter()});

const MENU_CLASS = `places__options`;
const MENU_OPENED_CLASS = `places__options--opened`;
const TOGGLE_MENU_BUTTON_CLASS = `places__sorting-type`;
const SORT_TYPE_CLASS = `places__option`;
const SORT_TYPE_FOCUS_CLASS = `places__option--focus`;

describe(`Toggling visibility menu of PlacesSorting`, () => {
  it(`Click on toggleMenuButton calls callback`, () => {
    const handleSortPanelClick = jest.fn();
    const wrapper = shallow(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleSortPanelClick}
        />
    );

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(handleSortPanelClick).toHaveBeenCalledTimes(1);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(handleSortPanelClick).toHaveBeenCalledTimes(2);
  });

  it(`Opening and closing menu by click`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Opening and closing menu by Enter`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`keydown`, {key: Key.ENTER});
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`keydown`, {key: Key.ENTER});
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Opening and closing menu by Space`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`keydown`, {key: Key.SPACE});
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`keydown`, {key: Key.SPACE});
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Closing menu by ESC`, () => {
    const map = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    // Так как Enzyme обработывает только события,
    // прикрепленные к элементам тестируемого компонента,
    // то для вызова событий, прекрепленных к document метод simulate заменен
    // на вызов заглушки addEventListener
    // https://github.com/enzymejs/enzyme/issues/426
    map.keydown(mockEscKeyEvent);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Closing menu by click on any element outside the menu`, () => {
    const map = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    map.mousedown(Object.assign({}, mockEvent, {target: {closest: () => true}}));
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    map.mousedown(Object.assign({}, mockEvent, {target: {closest: () => false}}));
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });
});

describe(`Selecting new SortType`, () => {
  it(`Select new SortType by click`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const handleSortTypeSelect = jest.fn();
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={handleSortTypeSelect}
          isMenuOpened={true}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${SORT_TYPE_CLASS}`).at(1).simulate(`click`);
    expect(handleSortTypeSelect.mock.calls[0][0])
      .toBe(SortType.PRICE_TO_HIGH.value);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Changing SortType after click on menu item`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const handleSortTypeSelect = (newSortType) => {
      wrapper.setProps({activeSort: newSortType});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={handleSortTypeSelect}
          isMenuOpened={true}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${SORT_TYPE_CLASS}`).at(1).simulate(`click`);
    expect(wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).text())
      .toBe(SortType.PRICE_TO_HIGH.value);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Changing SortType after press Enter on menu item`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const handleSortTypeSelect = (newSortType) => {
      wrapper.setProps({activeSort: newSortType});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={handleSortTypeSelect}
          isMenuOpened={true}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${SORT_TYPE_CLASS}`).at(1).simulate(`keydown`, {key: Key.ENTER});
    expect(wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).text())
      .toBe(SortType.PRICE_TO_HIGH.value);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });

  it(`Changing SortType after press Space on menu item`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const handleSortTypeSelect = (newSortType) => {
      wrapper.setProps({activeSort: newSortType});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={handleSortTypeSelect}
          isMenuOpened={true}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    wrapper.find(`.${SORT_TYPE_CLASS}`).at(1).simulate(`keydown`, {key: Key.SPACE});
    expect(wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).text())
      .toBe(SortType.PRICE_TO_HIGH.value);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);
  });
});

describe(`Checking focus`, () => {
  it(`Checking focus element after open menu`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    const activeMenuItem = wrapper.find(`.${SORT_TYPE_FOCUS_CLASS}`).instance();
    jest.spyOn(activeMenuItem, `focus`);

    const restMenuItems = wrapper.find(`.${SORT_TYPE_CLASS}:not(.${SORT_TYPE_FOCUS_CLASS})`);
    restMenuItems.forEach((item) => jest.spyOn(item.instance(), `focus`));


    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    expect(activeMenuItem.focus).toHaveBeenCalledTimes(1);

    restMenuItems.forEach((item) => {
      expect(item.instance().focus).not.toHaveBeenCalled();
    });
  });

  it(`Focus on next SortType by arrow down`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    const currentFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(0);
    jest.spyOn(currentFocusItem.instance(), `focus`);
    const nextFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(1);
    jest.spyOn(nextFocusItem.instance(), `focus`);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    currentFocusItem.simulate(`keydown`, {key: Key.DOWN});

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(1);
    expect(nextFocusItem.instance().focus).toHaveBeenCalledTimes(1);
  });

  it(`Focus on previous SortType by arrow up`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    const currentFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(0);
    jest.spyOn(currentFocusItem.instance(), `focus`);
    const previousFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(3);
    jest.spyOn(previousFocusItem.instance(), `focus`);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    currentFocusItem.simulate(`keydown`, {key: Key.UP});

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(1);
    expect(previousFocusItem.instance().focus).toHaveBeenCalledTimes(1);
  });

  it(`Focus on next SortType by Tab`, () => {
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    const currentFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(0);
    jest.spyOn(currentFocusItem.instance(), `focus`);
    const nextFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(1);
    jest.spyOn(nextFocusItem.instance(), `focus`);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    currentFocusItem.simulate(`keydown`, {key: Key.TAB});

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(1);
    expect(nextFocusItem.instance().focus).toHaveBeenCalledTimes(1);
  });

  it(`Focus on previous SortType by Shift + Tab`, () => {
    const map = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    const handleMenuButtonToggle = (isOpen) => {
      wrapper.setProps({isMenuOpened: isOpen});
    };
    const wrapper = mount(
        <PlacesSorting
          activeSort={SortType.DEFAULT.value}
          onActiveSortChange={mockFunction}
          isMenuOpened={false}
          onMenuVisibilityChange={handleMenuButtonToggle}
        />
    );

    const currentFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(0);
    jest.spyOn(currentFocusItem.instance(), `focus`);
    const previousFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(3);
    jest.spyOn(previousFocusItem.instance(), `focus`);
    const nextFocusItem = wrapper.find(`.${SORT_TYPE_CLASS}`).at(1);
    jest.spyOn(nextFocusItem.instance(), `focus`);

    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(false);

    wrapper.find(`.${TOGGLE_MENU_BUTTON_CLASS}`).simulate(`click`);
    expect(wrapper.find(`.${MENU_CLASS}`).hasClass(MENU_OPENED_CLASS))
      .toBe(true);

    currentFocusItem.simulate(`keydown`, {key: Key.SHIFT});
    currentFocusItem.simulate(`keydown`, {key: Key.TAB});
    map.keyup(Object.assign({}, mockEvent, {key: Key.SHIFT}));

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(1);
    expect(previousFocusItem.instance().focus).toHaveBeenCalledTimes(1);

    previousFocusItem.simulate(`keydown`, {key: Key.TAB});

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(2);

    currentFocusItem.simulate(`keydown`, {key: Key.TAB});

    expect(nextFocusItem.instance().focus).toHaveBeenCalledTimes(1);

    nextFocusItem.simulate(`keydown`, {key: Key.SHIFT});
    nextFocusItem.simulate(`keydown`, {key: Key.TAB});

    expect(currentFocusItem.instance().focus).toHaveBeenCalledTimes(3);
  });
});
