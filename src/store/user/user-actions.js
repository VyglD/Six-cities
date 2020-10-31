export const ActionType = {
  LOGIN: `LOGIN`,
};

export const ActionCreator = {
  login: (email) => ({
    type: ActionType.LOGIN,
    payload: email,
  }),
};
