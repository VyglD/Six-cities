import reducer from "./favorite-reducer";
import {ActionType} from "./favorite-actions";

describe(`Checking favorite reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      favoriteIds: [],
    });
  });

  it(`Reducer should add new id`, () => {
    expect(reducer(
        {
          favoriteIds: [],
        },
        {
          type: ActionType.ADD_FAVORITE,
          payload: `1`,
        }
    )).toEqual({
      favoriteIds: [`1`],
    });
  });

  it(`Reducer should remove id`, () => {
    expect(reducer(
        {
          favoriteIds: [`1`, `2`],
        },
        {
          type: ActionType.DELETE_FAVORITE,
          payload: `2`,
        }
    )).toEqual({
      favoriteIds: [`1`],
    });
  });

  it(`Reducer should update ids`, () => {
    expect(reducer(
        {
          favoriteIds: [],
        },
        {
          type: ActionType.UPDATE_FAVORITES,
          payload: [`1`, `2`, `3`],
        }
    )).toEqual({
      favoriteIds: [`1`, `2`, `3`],
    });
  });

});
