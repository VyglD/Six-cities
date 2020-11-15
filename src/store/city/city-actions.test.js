import {ActionType, ActionCreator} from "./city-actions";

describe(`ActionCreator of city-actions work correctly`, () => {
  it(`Action changeCity work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.changeCity(mockData)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: mockData,
    });
  });
});
