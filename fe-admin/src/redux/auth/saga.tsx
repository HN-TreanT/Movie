import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import stateActions from "../state/actions";
import { authService } from "../../untils/networks/services/authService";
// function* handleErr(type: any, err: any) {
//   console.log(type, err.data ? err.data.message : "Unknown error");
//   yield put(reqActions.action.updateRequestState(-1));
//   if (err.data && err.data.code === 4204) {
//     let msg = "";
//     if (err.data.data && err.data.data.length > 0) {
//       msg = err.data.data[0];
//     }
//     return NotificationService.error(msg);
//   }
//   if (err.data && errorCode.has(err.data.code)) {
//     NotificationService.error(errorCode.get(err.data.code));
//   } else NotificationService.error("Lỗi không xác định");
// }

function* load_access_token() {
  try {
    let _loginInfo: Promise<any> = yield select(
      (state: any) => state.auth.login_info
    );
    let loginInfo = _loginInfo;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield authService.handleLoginApi(loginInfo);
    let response: any = _response;
    if (response.data.accessToken) {
      yield put(
        actions.action.loadAccessTokenSuccess(response.data.accessToken)
      );
      yield put(actions.action.userInfo(response.data.user));
      yield put(actions.action.updateLoginInfo({}));
      yield put(stateActions.action.loadingState(false));
      yield put(stateActions.action.loginState(true));
    }
  } catch (err) {
    console.log(err);
  }
}
function* update_user_info() {
  try {
    let _infoUpdate: Promise<any> = yield select(
      (state: any) => state.auth.info_update
    );

    let infoUpdate = _infoUpdate;
    let _userInfo: Promise<any> = yield select(
      (state: any) => state.auth.user_info
    );
    let userInfo: any = _userInfo;
    let _response: Promise<any> = yield authService.refreshToken(userInfo);
    let response: any = _response;
    localStorage.setItem("token", response.data.accessToken);
    let _message: Promise<any> = yield authService.updateUserInfo(infoUpdate);
    let message = _message;
    console.log(message);
    let _user: Promise<any> = yield authService.getInfoUser();
    let user: any = _user;
    if (user) {
      yield put(actions.action.userInfo(user.data));
    }
  } catch (err) {
    console.log("error--->", err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_ACCESS_TOKEN, load_access_token);
  yield takeEvery(actions.types.UPDATE_USER_INFO, update_user_info);
}
export default function* mainSaga() {
  yield all([fork(listen)]);
}
