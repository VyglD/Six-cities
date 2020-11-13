import {ActionType, ActionCreator} from "./redirect-actions";

describe(`ActionCreator of redirect-actions work correctly`, () => {
  it(`Action redirectTo work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.redirectTo(mockData)).toEqual({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: mockData,
    });
  });
});
