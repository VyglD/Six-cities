import {ActionType, ActionCreator} from "./offers-actions";

describe(`ActionCreator of offers-actions work correctly`, () => {
  it(`Action loadOffers work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.loadOffers(mockData)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: mockData,
    });
  });
});
