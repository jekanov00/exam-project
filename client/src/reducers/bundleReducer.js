import ACTION from '../actions/actionTypes';

const initialState = {
  bundle: null,
  error: null,
  isFetching: false,
};

export default function bundleReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SELECT_BUNDLE_ACTION: {
      return {
        bundle: action.bundle,
        isFetching: false,
      };
    }
    case ACTION.CLEAR_BUNDLE_ACTION: {
      return {
        bundle: null,
        isFetching: false,
      };
    }
    case ACTION.RECEIVE_ALL_OFFERS_REQUEST: {
      return {
        bundle: null,
        isFetching: true,
      };
    }
    case ACTION.RECEIVE_ALL_OFFERS_SUCCESS: {
      return {
        bundle: { offers: action.data },
        isFetching: false,
      };
    }
    case ACTION.RECEIVE_ALL_OFFERS_FAILED: {
      return {
        bundle: null,
        isFetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
