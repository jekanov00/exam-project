import AUTH_ACTION_TYPES from './authActionTypes';

/**
 *
 * @typedef {object} Action
 * @property {string} type
 * @property {string} [payload]
 */

/**
 *
 * @param {object} values
 * @param {string} values.email
 * @param {string} values.password
 * @returns {Action}
 */
export const loginRequest = values => ({
  type: AUTH_ACTION_TYPES.LOGIN_REQUEST,
  payload: {
    values,
  },
});

/**
 *
 * @param {object} values
 * @returns {Action}
 */
export const signUpRequest = values => ({
  type: AUTH_ACTION_TYPES.SIGNUP_REQUEST,
  payload: {
    values,
  },
});

/**
 *
 * @param {object} values
 * @returns {Action}
 */
export const refreshAuthRequest = values => ({
  type: AUTH_ACTION_TYPES.REFRESH_AUTH_REQUEST,
  payload: {
    values,
  },
});

/**
 *
 * @returns {Action}
 */
export const authRequest = () => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST,
});

/**
 *
 * @param {object} data
 * @param {object} data.user
 * @param {object} data.tokenPair
 * @returns {Action}
 */
export const authRequestSuccess = data => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

/**
 *
 * @param {object} err
 * @returns {Action}
 */
export const authRequestFailed = err => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED,
  payload: {
    error: err,
  },
});

export const logoutRequest = () => ({
  type: AUTH_ACTION_TYPES.LOGOUT_REQUEST,
});

export const logoutRequestSuccess = () => ({
  type: AUTH_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS,
});
