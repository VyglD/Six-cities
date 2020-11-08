import React from "react";
import {
  isSelectKeyDown,
  isControlKeyDown,
  isEscKeyDown,
  getNextArrayElement,
  getPreviousArrayElement
} from "../../util";
import {SortType, Key} from "../../const";
import {boolType, functionType, sortType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const CONTAINER_CLASS = `places__options`;
const BUTTON_CLASS = `places__sorting-type`;
const FOCUS_CLASS = `places__option--focus`;
const OPEN_CLASS = `places__options--opened`;

class PlacesSorting extends React.PureComponent {
  constructor(props) {
    super(props);

    this._sortTypeRefs = [];
    this._shiftPressed = false;

    this._handleSortPanelClick = this._handleSortPanelClick.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleSortPanelKeyDown = this._handleSortPanelKeyDown.bind(this);
    this._handleSortTypeKeyDown = this._handleSortTypeKeyDown.bind(this);
    this._handleSortTypeKeyUp = this._handleSortTypeKeyUp.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isMenuOpened) {
      this._sortTypeRefs
        .find((ref) => ref.current.classList.contains(FOCUS_CLASS))
        .current
        .focus();
    }
  }

  _closeMenu() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.removeEventListener(`mousedown`, this._handleCloseClick);
    document.removeEventListener(`keyup`, this._handleSortTypeKeyUp);

    this.props.onMenuVisibilityChange(false);
  }

  _openMenu() {
    document.addEventListener(`keydown`, this._handleEscKeyDown);
    document.addEventListener(`mousedown`, this._handleCloseClick);
    document.addEventListener(`keyup`, this._handleSortTypeKeyUp);

    this.props.onMenuVisibilityChange(true);
  }

  _toggleMenu() {
    if (this.props.isMenuOpened) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _changeSortType(chosenSortType) {
    const newSortType = Object.values(SortType)
      .map(({value}) => value)
      .find((name) => name === chosenSortType);

    if (newSortType) {
      this.props.onActiveSortChange(newSortType);
    } else {
      this.props.onActiveSortChange(SortType.DEFAULT.value);
    }

    this._closeMenu();
  }

  _handleEscKeyDown(evt) {
    if (isEscKeyDown(evt.key)) {
      this._closeMenu();
    }
  }

  _handleCloseClick(evt) {
    if (!evt.target.closest(`.${BUTTON_CLASS}`) && !evt.target.closest(`.${CONTAINER_CLASS}`)) {
      this._closeMenu();
    }
  }

  _handleSortPanelClick() {
    this._toggleMenu();
  }

  _handleSortPanelKeyDown(evt) {
    if (isSelectKeyDown(evt)) {
      evt.preventDefault();

      this._toggleMenu();
    }
  }

  _handleSortTypeClick(evt) {
    this._changeSortType(evt.target.textContent);
  }

  _handleSortTypeKeyDown(evt) {
    if (isSelectKeyDown(evt)) {
      evt.preventDefault();

      this._changeSortType(evt.target.textContent);
    } else if (this.props.isMenuOpened && isControlKeyDown(evt)) {
      const indexRef = this._sortTypeRefs
        .findIndex((ref) => ref.current === evt.target);

      evt.preventDefault();

      if (evt.key === Key.UP || evt.key === Key.TAB && this._shiftPressed) {
        getPreviousArrayElement(indexRef, this._sortTypeRefs).current.focus();
      } else if (evt.key === Key.DOWN || evt.key === Key.TAB) {
        getNextArrayElement(indexRef, this._sortTypeRefs).current.focus();
      }
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
    const {activeSort, isMenuOpened} = this.props;

    this._sortTypeRefs = [];
    this._shiftPressed = false;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className={BUTTON_CLASS}
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
          className={
            `places__options places__options--custom ${isMenuOpened ? OPEN_CLASS : ``}`
          }
        >
          {
            Object.entries(SortType).map(([title, {value}]) => {
              const sortRef = React.createRef();
              this._sortTypeRefs.push(sortRef);

              return (
                <li
                  key={title}
                  ref={sortRef}
                  className={`places__option ${activeSort === value ? FOCUS_CLASS : ``}`}
                  tabIndex="0"
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
  onActiveSortChange: functionType,
  isMenuOpened: boolType,
  onMenuVisibilityChange: functionType,
};

export {PlacesSorting};
export default withActiveItem(
    PlacesSorting,
    {
      initialActiveItem: false,
      activeItemName: `isMenuOpened`,
      onItemChangeName: `onMenuVisibilityChange`,
    }
);
