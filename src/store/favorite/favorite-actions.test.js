import {ActionType, ActionCreator} from "./favorite-actions";

describe(`ActionCreator of favorite-actions work correctly`, () => {
  it(`Action addFavorite work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.addFavorite(mockData)).toEqual({
      type: ActionType.ADD_FAVORITE,
      payload: mockData,
    });
  });

  it(`Action deleteFavorite work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.deleteFavorite(mockData)).toEqual({
      type: ActionType.DELETE_FAVORITE,
      payload: mockData,
    });
  });

  it(`Action updateFavotites work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.updateFavotites(mockData)).toEqual({
      type: ActionType.UPDATE_FAVORITES,
      payload: mockData,
    });
  });
});
