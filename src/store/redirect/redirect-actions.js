const ActionType = {
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
};

const ActionCreator = {
  redirectTo: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};

export {
  ActionType,
  ActionCreator,
};
