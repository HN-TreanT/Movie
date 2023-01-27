const types = {
  UPDATE_LOGIN_INFO: "auth/update_login_info",
  LOAD_ACCESS_TOKEN: "auth/load_access_token",
  LOAD_ACCESS_TOKEN_SUCCESS: "auth/load_access_token_success",
  USER_INFO: "auth/user_info",
  UPDATE_USER_INFO: "auth/update_user_info",
  UPDATE_USER_INFO_SUCCESS: "auth/update_user_info_success",
};
const action = {
  updateLoginInfo: (loginInfo: any) => {
    return {
      type: types.UPDATE_LOGIN_INFO,
      payload: { loginInfo },
    };
  },
  loadAccessToken: () => {
    return {
      type: types.LOAD_ACCESS_TOKEN,
    };
  },
  loadAccessTokenSuccess: (token: any) => {
    return {
      type: types.LOAD_ACCESS_TOKEN_SUCCESS,
      payload: { token },
    };
  },
  userInfo: (userInfo: any) => {
    return {
      type: types.USER_INFO,
      payload: { userInfo },
    };
  },
  updateUserInfo: (infoUpdate: any) => {
    return {
      type: types.UPDATE_USER_INFO,
      payload: { infoUpdate },
    };
  },
  updateUserInfoSuccess: () => {
    return {
      type: types.UPDATE_USER_INFO_SUCCESS,
    };
  },
};
const actions = {
  types,
  action,
};

export default actions;
export const AuthActions = action;
