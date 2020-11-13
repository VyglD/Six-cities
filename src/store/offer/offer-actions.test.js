import {ActionType, ActionCreator} from "./offer-actions";

describe(`ActionCreator of offer-actions work correctly`, () => {
  it(`Action openOffer work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.openOffer(mockData)).toEqual({
      type: ActionType.OPEN_OFFER,
      payload: mockData,
    });
  });

  it(`Action loadReviews work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.loadReviews(mockData)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: mockData,
    });
  });

  it(`Action loadNearOffers work correctly`, () => {
    const mockData = `test`;

    expect(ActionCreator.loadNearOffers(mockData)).toEqual({
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: mockData,
    });
  });
});
