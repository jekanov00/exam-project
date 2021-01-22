import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { restorePassword } from '../api/rest/restController';

export function* forgotPassword(action) {
  yield put({ type: ACTION.FORGOT_PASSWORD_REQUEST });
  try {
    const {
      payload: { values },
    } = action;
    const { data } = yield restorePassword(values);
    yield put({ type: ACTION.FORGOT_PASSWORD_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: ACTION.FORGOT_PASSWORD_FAILED, error: e.response });
  }
}
