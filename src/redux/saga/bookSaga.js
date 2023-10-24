import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAllAccountsHandler } from "../saga/handlers/account";
import * as handler from "../saga/handlers/book";
import * as type from "../types";

export default function* bookSaga() {
  yield takeEvery(type.GET_BOOKS_REQUESTED, handler.getAllBooksHandler);
}
