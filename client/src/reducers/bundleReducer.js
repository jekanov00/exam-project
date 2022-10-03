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
        ...state,
        bundle: null,
        isFetching: true,
      };
    }
    case ACTION.RECEIVE_ALL_OFFERS_SUCCESS: {
      return {
        ...state,
        bundle: action.data,
        isFetching: false,
      };
    }
    case ACTION.RECEIVE_ALL_OFFERS_FAILED: {
      return {
        ...state,
        bundle: null,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.ACCEPT_OFFER_BUNDLE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION.ACCEPT_OFFER_BUNDLE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        bundle: { offers: [...action.data] },
      };
    }
    case ACTION.ACCEPT_OFFER_BUNDLE_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.DELETE_OFFER_BUNDLE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION.DELETE_OFFER_BUNDLE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        bundle: { offers: [...action.data] },
      };
    }
    case ACTION.DELETE_OFFER_BUNDLE_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
