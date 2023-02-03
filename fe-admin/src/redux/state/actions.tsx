const types = {
  IS_lOGIN: "state/is_login",
  IS_LOADING: "state/is_loading",
};

const action = {
  loginState(isLogin: boolean) {
    return {
      type: types.IS_lOGIN,
      payload: { isLogin },
    };
  },
  loadingState(isLoading: boolean) {
    return {
      type: types.IS_LOADING,
      payload: { isLoading },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const StateAction = action;
