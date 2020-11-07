import React from "react";
import {SortType, Key} from "../../const";
import {functionType, sortType} from "../../types";

const ACTIVE_CLASS = `places__option--active`;
const OPEN_CLASS = `places__options--opened`;

class PlacesSorting extends React.PureComponent {
  constructor(props) {
    super(props);

    this._menuRef = React.createRef();

    this._handleSortPanelClick = this._handleSortPanelClick.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleSortPanelKeyDown = this._handleSortPanelKeyDown.bind(this);
    this._handleSortTypeKeyDown = this._handleSortTypeKeyDown.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  _closeMenu() {
    const menu = this._menuRef.current;
    menu.classList.remove(OPEN_CLASS);

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _toggleMenu() {
    const menu = this._menuRef.current;

    if (menu.classList.contains(OPEN_CLASS)) {
      this._closeMenu();
    } else {
      menu.classList.add(OPEN_CLASS);

      document.addEventListener(`keydown`, this._handleEscKeyDown);
    }
  }

  _changeSortType(chosenSortType) {
    const newSortType = Object.values(SortType)
      .map(({value}) => value)
      .find((name) => name === chosenSortType);

    if (newSortType) {
      this.props.onChangeActiveSort(newSortType);
    } else {
      this.props.onChangeActiveSort(SortType.DEFAULT.value);
    }

    this._closeMenu();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === Key.ESC) {
      this._closeMenu();
    }
  }

  _handleSortPanelClick() {
    this._toggleMenu();
  }

  _handleSortPanelKeyDown(evt) {
    if (evt.key === Key.ENTER) {
      this._toggleMenu();
    }
  }

  _handleSortTypeClick(evt) {
    this._changeSortType(evt.target.textContent);
  }

  _handleSortTypeKeyDown(evt) {
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
          onClick={this._handleSortPanelClick}
          onKeyDown={this._handleSortPanelKeyDown}
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
            Object.entries(SortType).map(([title, {value}]) => (
              <li
                key={title}
                className={`places__option ${activeSort === value && ACTIVE_CLASS}`}
                tabIndex="0"
                onClick={this._handleSortTypeClick}
                onKeyDown={this._handleSortTypeKeyDown}
              >
                {value}
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

export default PlacesSorting;
