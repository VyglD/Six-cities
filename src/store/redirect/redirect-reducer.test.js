import reducer from "./redirect-reducer";
import {ActionType} from "./redirect-actions";
import {mockOffers} from "../../mocks/mock-data";

describe(`Checking redirect reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it(`Reducer should update redirect`, () => {
    expect(reducer(
        {},
        {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: mockOffers,
        }
    )).toEqual({});
  });
});
