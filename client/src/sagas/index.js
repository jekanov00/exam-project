import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as AuthSagas from './authSagas';

import { paymentSaga, cashoutSaga } from './paymentSaga';
import {
  activeContestsSaga,
  customerContestsSaga,
  updateContestSaga,
  dataForContestSaga,
  getContestByIdSaga,
  downloadContestFileSaga,
} from './contestsSagas';
import { changeMarkSaga, setOfferStatusSaga, addOfferSaga } from './offerSagas';
import {
  previewSaga,
  getDialog,
  sendMessage,
  changeChatFavorite,
  changeChatBlock,
  getCatalogListSaga,
  addChatToCatalog,
  createCatalog,
  deleteCatalog,
  removeChatFromCatalogSaga,
  changeCatalogName,
} from './chatSagas';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';

function* rootSaga() {
  // my super cool code
  // AUTH
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, AuthSagas.loginSaga);
  yield takeLatest(AUTH_ACTION_TYPES.SIGNUP_REQUEST, AuthSagas.signUpSaga);
  yield takeLatest(AUTH_ACTION_TYPES.REFRESH_AUTH_REQUEST, AuthSagas.refreshAuthSaga);
  yield takeLatest(AUTH_ACTION_TYPES.LOGOUT_REQUEST, AuthSagas.logoutSaga);
  // legacy
  yield takeEvery(ACTION.GET_DATA_FOR_CONTEST_ACTION, dataForContestSaga);
  yield takeLatest(ACTION.PAYMENT_ACTION, paymentSaga);
  yield takeLatest(ACTION.CASHOUT_ACTION, cashoutSaga);
  yield takeLeading(ACTION.GET_CONTESTS_FOR_CUSTOMER, customerContestsSaga);
  yield takeLatest(ACTION.GET_CONTEST_BY_ID_ACTION, getContestByIdSaga);
  yield takeEvery(ACTION.GET_CONTESTS_FOR_CREATIVE, activeContestsSaga);
  yield takeLatest(ACTION.DOWNLOAD_CONTEST_FILE_ACTION, downloadContestFileSaga);
  yield takeLatest(ACTION.UPDATE_CONTEST_ACTION, updateContestSaga);
  yield takeEvery(ACTION.SET_OFFER_ACTION, addOfferSaga);
  yield takeLatest(ACTION.SET_OFFER_STATUS_ACTION, setOfferStatusSaga);
  yield takeLatest(ACTION.CHANGE_MARK_ACTION, changeMarkSaga);
  yield takeLatest(ACTION.GET_PREVIEW_CHAT_ASYNC, previewSaga);
  yield takeLatest(ACTION.GET_DIALOG_MESSAGES_ASYNC, getDialog);
  yield takeLatest(ACTION.SEND_MESSAGE_ACTION, sendMessage);
  yield takeLatest(ACTION.SET_CHAT_FAVORITE_FLAG, changeChatFavorite);
  yield takeLatest(ACTION.SET_CHAT_BLOCK_FLAG, changeChatBlock);
  yield takeLatest(ACTION.GET_CATALOG_LIST_ASYNC, getCatalogListSaga);
  yield takeLatest(ACTION.ADD_CHAT_TO_CATALOG_ASYNC, addChatToCatalog);
  yield takeLatest(ACTION.CREATE_CATALOG_REQUEST, createCatalog);
  yield takeLatest(ACTION.DELETE_CATALOG_REQUEST, deleteCatalog);
  yield takeLatest(ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST, removeChatFromCatalogSaga);
  yield takeLatest(ACTION.CHANGE_CATALOG_NAME_REQUEST, changeCatalogName);
}

export default rootSaga;
