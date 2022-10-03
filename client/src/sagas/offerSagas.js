import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        offer.mark = action.data.mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
          data.id === offer.id ? CONSTANTS.OFFER_STATUS_WON : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (data.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}

export function* acceptOfferSaga(action) {
  yield put({ type: ACTION.ACCEPT_OFFER_REQUEST });
  try {
    const { data } = action;
    const { data: newOffers } = yield restController.activateOffer(data);
    yield put({ type: ACTION.ACCEPT_OFFER_SUCCESS, data: newOffers });
  } catch (e) {
    yield put({ type: ACTION.ACCEPT_OFFER_FAILED, error: e });
  }
}

export function* deleteOfferSaga(action) {
  yield put({ type: ACTION.DELETE_OFFER_REQUEST });
  try {
    const { data } = action;
    const { data: newOffers } = yield restController.deleteOffer(data);
    yield put({ type: ACTION.DELETE_OFFER_SUCCESS, data: newOffers });
  } catch (e) {
    yield put({ type: ACTION.DELETE_OFFER_FAILED, error: e });
  }
}

export function* getOffersForModerator(action) {
  yield put({ type: ACTION.RECEIVE_ALL_OFFERS_REQUEST });
  try {
    const { data } = action;
    const {data: offersData} = yield restController.getModeratorOffers(data);
    yield put({ type: ACTION.RECEIVE_ALL_OFFERS_SUCCESS, data: offersData });
  } catch (e) {
    yield put({ type: ACTION.RECEIVE_ALL_OFFERS_FAILED, error: e });
  }
}

export function* acceptOfferBundleSaga(action) {
  yield put({ type: ACTION.ACCEPT_OFFER_BUNDLE_REQUEST });
  try {
    const { data } = action;
    const { data: newOffers } = yield restController.activateOfferBundle(data);
    yield put({ type: ACTION.ACCEPT_OFFER_BUNDLE_SUCCESS, data: newOffers });
  } catch (e) {
    yield put({ type: ACTION.ACCEPT_OFFER_BUNDLE_FAILED, error: e });
  }
}

export function* deleteOfferBundleSaga(action) {
  yield put({ type: ACTION.DELETE_OFFER_BUNDLE_REQUEST });
  try {
    const { data } = action;
    const { data: newOffers } = yield restController.deleteOfferBundle(data);
    yield put({ type: ACTION.DELETE_OFFER_BUNDLE_SUCCESS, data: newOffers });
  } catch (e) {
    yield put({ type: ACTION.DELETE_OFFER_BUNDLE_FAILED, error: e });
  }
}
