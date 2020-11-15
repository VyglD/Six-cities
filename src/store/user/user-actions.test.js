import {ActionType, ActionCreator} from "./user-actions";

describe(`ActionCreator of user-actions work correctly`, () => {
  it(`Action logIn work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.logIn(mockData)).toEqual({
      type: ActionType.LOGIN,
      payload: mockData,
    });
  });

  it(`Action logIn work correctly`, () => {
    expect(ActionCreator.logOut()).toEqual({
      type: ActionType.LOGOUT,
    });
  });
});
