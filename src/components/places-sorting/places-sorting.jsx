import React from "react";
import {SortType} from "../../const";
import {functionType, sortType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const activeClass = `places__option--active`;
const openClass = `places__options--opened`;
const Key = {
  ENTER: `Enter`,
  ESC: `Escape`
};

class PlacesSorting extends React.PureComponent {
  constructor(props) {
    super(props);

    this._menuRef = React.createRef();

    this._onSortPanelClick = this._onSortPanelClick.bind(this);
    this._onSortTypeClick = this._onSortTypeClick.bind(this);
    this._onSortPanelEnter = this._onSortPanelEnter.bind(this);
    this._onSortTypeEnter = this._onSortTypeEnter.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _closeMenu() {
    const menu = this._menuRef.current;
    menu.classList.remove(openClass);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _toggleMenu() {
    const menu = this._menuRef.current;

    if (menu.classList.contains(openClass)) {
      this._closeMenu();
    } else {
      menu.classList.add(openClass);

      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _changeSortType(chosenSortType) {
    const newSortType = Object.values(SortType).find((name) => name === chosenSortType);

    if (newSortType) {
      this.props.onChangeActiveSort(newSortType);
    } else {
      this.props.onChangeActiveSort(SortType.DEFAULT);
    }

    this._closeMenu();
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESC) {
      this._closeMenu();
    }
  }

  _onSortPanelClick() {
    this._toggleMenu();
  }

  _onSortPanelEnter(evt) {
    if (evt.key === Key.ENTER) {
      this._toggleMenu();
    }
  }

  _onSortTypeClick(evt) {
    this._changeSortType(evt.target.textContent);
  }

  _onSortTypeEnter(evt) {
    if (evt.key === Key.ENTER) {
      this._changeSortType(evt.target.textContent);
    }
  }

  render() {
    const {activeSort} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={this._onSortPanelClick}
          onKeyDown={this._onSortPanelEnter}
        >
          {activeSort}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          ref={this._menuRef}
          className="places__options places__options--custom"
        >
          {
            Object.entries(SortType).map(([title, name]) => (
              <li
                key={title}
                className={`places__option ${activeSort === name && activeClass}`}
                tabIndex="0"
                onClick={this._onSortTypeClick}
                onKeyDown={this._onSortTypeEnter}
              >
                {name}
              </li>
            ))
          }
        </ul>
      </form>
    );
  }
}

PlacesSorting.propTypes = {
  activeSort: sortType,
  onChangeActiveSort: functionType,
};

export {PlacesSorting};
export default withActiveItem(
    PlacesSorting,
    {
      initialActiveItem: SortType.DEFAULT,
      activeItemName: `activeSort`,
      onItemChangeName: `onChangeActiveSort`,
    }
);

