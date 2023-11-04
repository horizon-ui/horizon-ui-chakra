import { call, put } from "redux-saga/effects";
import * as accountRequest from "../requests/account";
import * as types from "../../types";

export function* getAllAccountsHandler() {
  try {
    const accounts = yield call(accountRequest.getAccountsRequest);
    yield put({
      type: types.GET_ACCOUNTS_SUCCESS,
      accounts: accounts.accounts,
    });
  } catch (e) {
    yield put({ type: types.GET_ACCOUNTS_FAILED, message: e.message });
  }
}
export function* getAccountByIdHandler({ payload }) {
  try {
    const account = yield call(accountRequest.getAccountByIdRequest, payload);
    yield put({
      type: types.GET_ACCOUNT_SUCCESS,
      account: account.account,
    });
  } catch (e) {
    yield put({ type: types.GET_ACCOUNT_FAILED, message: e.message });
  }
}
