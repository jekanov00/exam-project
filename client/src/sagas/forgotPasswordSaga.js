import { put } from 'redux-saga/effects';
import * as ACTION_CREATORS from '../actions/actionCreator';
import history from '../browserHistory';
import { restorePassword } from '../api/rest/restController';

export function* forgotPassword(action) {
  yield put(ACTION_CREATORS.restoreRequest());
  try {
    const {
      payload: { values },
    } = action;
    yield restorePassword(values);
    yield put(ACTION_CREATORS.restoreSuccess());
    history.push('/login');
  } catch (e) {
    yield put(ACTION_CREATORS.restoreFailed(e));
  }
}
