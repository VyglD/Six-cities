import reducer from "./city-reducer";
import {ActionType} from "./city-actions";
import {CITIES} from "../../mocks/mock-data";

describe(`Checking city reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: CITIES[0],
    });
  });

  it(`Reducer should assign new city`, () => {
    expect(reducer(
        {
          activeCity: CITIES[0],
        },
        {
          type: ActionType.CHANGE_CITY,
          payload: CITIES[1],
        }
    )).toEqual({
      activeCity: CITIES[1],
    });
  });
});
