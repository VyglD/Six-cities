import reducer from "./user-reducer";
import {ActionType} from "./user-actions";

describe(`Checking user reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isLogin: false,
      email: ``,
      avatar: ``,
      isSuper: false,
    });
  });

  it(`Reducer should log in`, () => {
    expect(reducer(
        {
          isLogin: false,
          email: ``,
          avatar: ``,
          isSuper: false,
        },
        {
          type: ActionType.LOGIN,
          payload: {
            email: `example@email.ru`,
            avatar: `img/photo.png`,
            isSuper: false,
          },
        }
    )).toEqual({
      isLogin: true,
      email: `example@email.ru`,
      avatar: `img/photo.png`,
      isSuper: false,
    });
  });

  it(`Reducer should log in`, () => {
    expect(reducer(
        {
          isLogin: true,
          email: `example@email.ru`,
          avatar: `img/photo.png`,
          isSuper: false,
        },
        {
          type: ActionType.LOGOUT,
          payload: {},
        }
    )).toEqual({
      isLogin: false,
      email: ``,
      avatar: ``,
      isSuper: false,
    });
  });
});
