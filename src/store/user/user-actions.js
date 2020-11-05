const ActionType = {
  LOGIN: `LOGIN`,
  LOGOUT: `LOGOUT`,
};

const ActionCreator = {
  logIn: (data) => ({
    type: ActionType.LOGIN,
    payload: data,
  }),
  logOut: () => ({
    type: ActionType.LOGOUT,
  }),
};

export {
  ActionType,
  ActionCreator,
};
