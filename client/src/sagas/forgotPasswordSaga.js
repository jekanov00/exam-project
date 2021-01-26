import { put } from 'redux-saga/effects';
import * as ACTION_CREATORS from '../actions/actionCreator';
import history from '../browserHistory';
import { changeUserEmail, restorePassword } from '../api/rest/restController';

export function* forgotPassword(action) {
  yield put(ACTION_CREATORS.restoreRequest());
  try {
    const {
      payload: { values },
    } = action;
    yield restorePassword(values);
    yield put(ACTION_CREATORS.restoreSuccess());
    history.push('/restore-email');
  } catch (e) {
    yield put(ACTION_CREATORS.restoreFailed(e));
  }
}

export function* changeEmail(action) {
  yield put(ACTION_CREATORS.changeEmailRequest());
  try {
    const {
      payload: { data: restoreToken },
    } = action;
    yield changeUserEmail({ restoreToken });
    yield put(ACTION_CREATORS.changeEmailSuccess());
  } catch (e) {
    yield put(ACTION_CREATORS.changeEmailFailed(e));
  }
}
