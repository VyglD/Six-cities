import React from "react";
import {
  isSelectKeyDown,
  isControlKeyDown,
  isEscKeyDown,
  getNextArrayElement,
  getPreviousArrayElement
} from "../../util";
import {SortType, Key} from "../../const";
import {functionType, sortType} from "../../types";

const CONTAINER_CLASS = `places__options`;
const BUTTON_CLASS = `places__sorting-type`;
const FOCUS_CLASS = `places__option--focus`;
const OPEN_CLASS = `places__options--opened`;

const PlacesSorting = (props) => {
  const {activeSort, onActiveSortChange} = props;
  const [isMenuOpened, setMenuVisibility] = React.useState(false);

  const menuRef = React.useRef();
  const shiftPressed = React.useRef(false);

  React.useEffect(
      () => {
        if (isMenuOpened) {
          Array.from(menuRef.current.children)
            .find((item) => item.classList.contains(FOCUS_CLASS))
            .focus();
        }
      },
      [isMenuOpened]
  );

  React.useEffect(
      () => {
        if (isMenuOpened) {
          document.addEventListener(`keydown`, handleEscKeyDown);
          document.addEventListener(`mousedown`, handleCloseClick);
          document.addEventListener(`keyup`, handleSortTypeKeyUp);
        }

        return () => {
          document.removeEventListener(`keydown`, handleEscKeyDown);
          document.removeEventListener(`mousedown`, handleCloseClick);
          document.removeEventListener(`keyup`, handleSortTypeKeyUp);
        };
      }
  );

  const toggleMenu = React.useCallback(
      () => {
        setMenuVisibility((menuStatus) => !menuStatus);
      },
      []
  );

  const changeSortType = React.useCallback(
      (chosenSortType) => {
        const newSortType = Object.values(SortType)
          .map(({value}) => value)
          .find((name) => name === chosenSortType);

        if (newSortType) {
          onActiveSortChange(newSortType);
        } else {
          onActiveSortChange(SortType.DEFAULT.value);
        }

        setMenuVisibility(false);
      },
      [onActiveSortChange]
  );

  const handleEscKeyDown = React.useCallback(
      (evt) => {
        if (isEscKeyDown(evt)) {
          setMenuVisibility(false);
        }
      },
      []
  );

  const handleCloseClick = React.useCallback(
      (evt) => {
        if (
          !evt.target.closest(`.${BUTTON_CLASS}`)
          && !evt.target.closest(`.${CONTAINER_CLASS}`)
        ) {
          setMenuVisibility(false);
        }
      },
      []
  );

  const handleSortTypeKeyUp = React.useCallback(
      (evt) => {
        if (evt.key === Key.SHIFT) {
          shiftPressed.current = false;
        }
      },
      []
  );

  const handleSortPanelClick = React.useCallback(
      () => {
        toggleMenu();
      },
      [toggleMenu]
  );

  const handleSortPanelKeyDown = React.useCallback(
      (evt) => {
        if (isSelectKeyDown(evt)) {
          evt.preventDefault();

          toggleMenu();
        }
      },
      [toggleMenu]
  );

  const handleSortTypeClick = React.useCallback(
      (evt) => {
        changeSortType(evt.target.textContent);
      },
      [changeSortType]
  );

  const handleSortTypeKeyDown = React.useCallback(
      (evt) => {
        if (isSelectKeyDown(evt)) {
          evt.preventDefault();

          changeSortType(evt.target.textContent);
        } else if (isMenuOpened && isControlKeyDown(evt)) {
          const typeItems = Array.from(menuRef.current.children);
          const indexRef = typeItems.findIndex((item) => item === evt.target);

          evt.preventDefault();

          if (evt.key === Key.UP || evt.key === Key.TAB && shiftPressed.current) {
            getPreviousArrayElement(indexRef, typeItems).focus();
          } else if (evt.key === Key.DOWN || evt.key === Key.TAB) {
            getNextArrayElement(indexRef, typeItems).focus();
          }
        } else if (evt.key === Key.SHIFT) {
          shiftPressed.current = true;
        }
      },
      [isMenuOpened, changeSortType, shiftPressed]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className={BUTTON_CLASS}
        tabIndex="0"
        onClick={handleSortPanelClick}
        onKeyDown={handleSortPanelKeyDown}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        ref={menuRef}
        className={
          `places__options places__options--custom ${isMenuOpened ? OPEN_CLASS : ``}`
        }
      >
        {
          Object.entries(SortType).map(([title, {value}]) => {
            return (
              <li
                key={title}
                className={`places__option ${activeSort === value ? FOCUS_CLASS : ``}`}
                tabIndex="0"
                onClick={handleSortTypeClick}
                onKeyDown={handleSortTypeKeyDown}
              >
                {value}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
};

PlacesSorting.propTypes = {
  activeSort: sortType,
  onActiveSortChange: functionType,
};

export default PlacesSorting;
