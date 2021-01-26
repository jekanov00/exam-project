import produce from 'immer';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import ACTION_TYPES from '../actions/actionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handlers = {
  [AUTH_ACTION_TYPES.AUTH_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { user },
      },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
  [AUTH_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS]: () => ({
    ...initialState,
  }),
  [ACTION_TYPES.UPDATE_USER_DATA_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.UPDATE_USER_DATA_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.user = { ...draftState.user, ...action.data };
  }),
  [ACTION_TYPES.UPDATE_USER_DATA_ERROR]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.error = action.error;
  }),
  [ACTION_TYPES.RESTORE_PASSWORD_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.RESTORE_PASSWORD_SUCCESS]: produce((draftState) => {
    draftState.isFetching = false;
  }),
  [ACTION_TYPES.RESTORE_PASSWORD_FAILED]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.error = action.payload.error;
  }),
  [ACTION_TYPES.CHANGE_EMAIL_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [ACTION_TYPES.CHANGE_EMAIL_SUCCESS]: produce((draftState) => {
    draftState.isFetching = false;
  }),
  [ACTION_TYPES.CHANGE_EMAIL_FAILED]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.error = action.payload.error;
  }),
};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
