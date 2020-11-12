import reducer from "./offers-reducer";
import {ActionType} from "./offers-actions";
import {mockOffers} from "../../mocks/mock-data";

describe(`Checking offers reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      allOffers: [],
    });
  });

  it(`Reducer should update offers`, () => {
    expect(reducer(
        {
          allOffers: [],
        },
        {
          type: ActionType.LOAD_OFFERS,
          payload: mockOffers,
        }
    )).toEqual({
      allOffers: mockOffers,
    });
  });
});
