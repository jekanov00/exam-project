import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  error: null,
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
        user: null,
      };
    }
    case ACTION.GET_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.user,
      };
    }
    case ACTION.GET_USER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        user: null,
      };
    }
    case ACTION.CLEAR_USER_STORE: {
      return {
        ...state,
        user: null,
        error: null,
      };
    }
    case ACTION.UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, ...action.user },
        error: null,
      };
    }
    case ACTION.UPDATE_USER_DATA_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ACTION.CLEAR_USER_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
}
