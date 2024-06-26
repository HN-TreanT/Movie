import actions from "./actions";

const initAuth = {
  user_name: "",
  passwork: "",
};
const AuthReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.UPDATE_LOGIN_INFO:
      return {
        ...state,
        ...{
          login_info: action.payload.loginInfo,
        },
      };
    case actions.types.LOAD_ACCESS_TOKEN:
      return {
        ...state,
      };
    case actions.types.LOAD_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        ...{
          token: action.payload.token,
        },
      };
    case actions.types.USER_INFO:
      return {
        ...state,
        ...{
          user_info: action.payload.userInfo,
        },
      };
    case actions.types.UPDATE_USER_INFO:
      return {
        ...state,
        ...{
          info_update: action.payload.infoUpdate,
        },
      };
    case actions.types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default AuthReducer;
