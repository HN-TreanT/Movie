import actions from "./actions";
const initState = {
  loginState: false,
  loadingState: false,
};
const StateReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.IS_lOGIN:
      return {
        ...state,
        ...{
          loginState: action.payload.isLogin,
        },
      };
    case actions.types.IS_LOADING:
      return {
        ...state,
        ...{
          loadingState: action.payload.isLoading,
        },
      };

    default:
      return state;
  }
};

export default StateReducer;
