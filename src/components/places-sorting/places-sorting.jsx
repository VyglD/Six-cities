import React from "react";
import {isEnterKeyDown, isEscKeyDown, getNextArrayElement, getPrevArrayElement} from "../../util";
import {SortType, Key} from "../../const";
import {cityNameType, functionType, sortType} from "../../types";

const ACTIVE_CLASS = `places__option--active`;
const OPEN_CLASS = `places__options--opened`;

class PlacesSorting extends React.Component {
  constructor(props) {
    super(props);

    this._menuRef = React.createRef();

    this._sortTypeRefs = [];
    this._shiftPressed = false;

    this._handleSortPanelClick = this._handleSortPanelClick.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleSortPanelKeyDown = this._handleSortPanelKeyDown.bind(this);
    this._handleSortTypeKeyDown = this._handleSortTypeKeyDown.bind(this);
    this._handleSortTypeKeyUp = this._handleSortTypeKeyUp.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {activeCity} = this.props;

    if (nextProps.activeCity !== activeCity) {
      this._closeMenu();
    }

    return true;
  }

  _closeMenu() {
    const menu = this._menuRef.current;
    menu.classList.remove(OPEN_CLASS);

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.removeEventListener(`keyup`, this._handleSortTypeKeyUp);
  }

  _toggleMenu() {
    const menu = this._menuRef.current;

    if (menu.classList.contains(OPEN_CLASS)) {
      this._closeMenu();
    } else {
      menu.classList.add(OPEN_CLASS);

      document.addEventListener(`keydown`, this._handleEscKeyDown);
      document.addEventListener(`keyup`, this._handleSortTypeKeyUp);
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
    if (isEscKeyDown(evt.key)) {
      this._closeMenu();
    }
  }

  _handleSortPanelClick() {
    this._toggleMenu();
  }

  _handleSortPanelKeyDown(evt) {
    if (isEnterKeyDown(evt.key)) {

      evt.preventDefault();

      this._toggleMenu();
    } else if (
      evt.key === Key.DOWN
      && this._menuRef.current.classList.contains(OPEN_CLASS)
    ) {
      evt.preventDefault();

      this._sortTypeRefs[0].current.focus();
    } else if (
      evt.key === Key.UP
      && this._menuRef.current.classList.contains(OPEN_CLASS)
    ) {
      evt.preventDefault();

      this._sortTypeRefs[this._sortTypeRefs.length - 1].current.focus();
    } else if (
      evt.key === Key.TAB && this._shiftPressed
      && this._menuRef.current.classList.contains(OPEN_CLASS)
    ) {
      evt.preventDefault();

      this._sortTypeRefs[this._sortTypeRefs.length - 1].current.focus();
    } else if (evt.key === Key.SHIFT) {
      this._shiftPressed = true;
    }
  }

  _handleSortTypeClick(evt) {
    this._changeSortType(evt.target.textContent);
  }

  _handleSortTypeKeyDown(evt) {
    if (isEnterKeyDown(evt.key)) {
      this._changeSortType(evt.target.textContent);
    } else if (evt.key === Key.UP || evt.key === Key.TAB && this._shiftPressed) {
      const index = this._sortTypeRefs
        .findIndex((ref) => ref.current === evt.target);

      evt.preventDefault();

      getPrevArrayElement(index, this._sortTypeRefs).current.focus();
    } else if (evt.key === Key.DOWN || evt.key === Key.TAB && !this._shiftPressed) {
      const index = this._sortTypeRefs
        .findIndex((ref) => ref.current === evt.target);

      evt.preventDefault();

      getNextArrayElement(index, this._sortTypeRefs).current.focus();
    } else if (evt.key === Key.SHIFT) {
      this._shiftPressed = true;
    }
  }

  _handleSortTypeKeyUp(evt) {
    if (evt.key === Key.SHIFT) {
      this._shiftPressed = false;
    }
  }

  render() {
    const {activeSort} = this.props;

    this._sortTypeRefs = [];
    this._shiftPressed = false;

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
            Object.entries(SortType).map(([title, {value}]) => {
              const isActive = activeSort === value;
              const sortRef = React.createRef();
              if (!isActive) {
                this._sortTypeRefs.push(sortRef);
              }

              return (
                <li
                  key={title}
                  ref={sortRef}
                  className={`places__option ${isActive ? ACTIVE_CLASS : ``}`}
                  tabIndex={isActive ? -1 : 0}
                  onClick={this._handleSortTypeClick}
                  onKeyDown={this._handleSortTypeKeyDown}
                >
                  {value}
                </li>
              );
            })
          }
        </ul>
      </form>
    );
  }
}

PlacesSorting.propTypes = {
  activeSort: sortType,
  onChangeActiveSort: functionType,
  activeCity: cityNameType,
};

export default PlacesSorting;
