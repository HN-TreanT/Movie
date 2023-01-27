import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import actions from "./actions";
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
    let _response: Promise<any> = yield authService.handleLoginApi(loginInfo);
    let response: any = _response;
    // console.log(response.data.accessToken);
    if (response.data.accessToken) {
      yield put(
        actions.action.loadAccessTokenSuccess(response.data.accessToken)
      );
      yield put(actions.action.userInfo(response.data.user));
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
    let _message: Promise<any> = yield authService.updateUserInfo(infoUpdate);
    let message = _message;
    console.log(message);
  } catch (err) {
    console.log("error--->", err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_ACCESS_TOKEN, load_access_token);
  yield takeEvery(actions.types.UPDATE_USER_INFO_SUCCESS, update_user_info);
}
export default function* mainSaga() {
  yield all([fork(listen)]);
}
