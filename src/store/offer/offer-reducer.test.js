import reducer from "./offer-reducer";
import {ActionType} from "./offer-actions";
import {mockReview, mockOffers} from "../../mocks/mock-data";

describe(`Checking offer reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      openedOfferId: null,
      reviews: [],
      nearOffers: [],
    });
  });

  it(`Reducer should assign new offer`, () => {
    expect(reducer(
        {
          openedOfferId: mockOffers[0].id,
          reviews: [mockReview],
          nearOffers: mockOffers,
        },
        {
          type: ActionType.OPEN_OFFER,
          payload: mockOffers[1].id,
        }
    )).toEqual({
      openedOfferId: mockOffers[1].id,
      reviews: [],
      nearOffers: [],
    });
  });

  it(`Reducer should confirm offer`, () => {
    expect(reducer(
        {
          openedOfferId: mockOffers[0].id,
          reviews: [mockReview],
          nearOffers: mockOffers,
        },
        {
          type: ActionType.OPEN_OFFER,
          payload: mockOffers[0].id,
        }
    )).toEqual({
      openedOfferId: mockOffers[0].id,
      reviews: [mockReview],
      nearOffers: mockOffers,
    });
  });

  it(`Reducer should update reviews`, () => {
    expect(reducer(
        {
          openedOfferId: mockOffers[0].id,
          reviews: [],
          nearOffers: mockOffers,
        },
        {
          type: ActionType.LOAD_REVIEWS,
          payload: [mockReview],
        }
    )).toEqual({
      openedOfferId: mockOffers[0].id,
      reviews: [mockReview],
      nearOffers: mockOffers,
    });
  });

  it(`Reducer should update near offers`, () => {
    expect(reducer(
        {
          openedOfferId: mockOffers[0].id,
          reviews: [mockReview],
          nearOffers: [],
        },
        {
          type: ActionType.LOAD_NEAR_OFFERS,
          payload: mockOffers,
        }
    )).toEqual({
      openedOfferId: mockOffers[0].id,
      reviews: [mockReview],
      nearOffers: mockOffers,
    });
  });
});
