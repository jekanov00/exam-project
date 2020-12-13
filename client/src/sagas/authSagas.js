import { put } from 'redux-saga/effects';
import * as AuthActionCreators from '../actions/authActionCreators';
import * as Api from './../api/http';

const createAuthSaga = apiMethod =>
  function* authSaga(action) {
    yield put(AuthActionCreators.authRequest());
    try {
      const {
        payload: { values },
      } = action;
      const {
        data: { data },
      } = yield apiMethod(values);
      yield put(AuthActionCreators.authRequestSuccess(data));
    } catch (err) {
      yield put(AuthActionCreators.authRequestFailed(err));
    }
  };

export const loginSaga = createAuthSaga(Api.auth.login);
export const signUpSaga = createAuthSaga(Api.auth.signUp);
export const refreshAuthSaga = createAuthSaga(Api.auth.refresh);

export const logoutSaga = function* () {
  yield Api.auth.logout();
  yield put(AuthActionCreators.logoutRequestSuccess());
};
