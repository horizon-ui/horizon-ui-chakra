import { call, put } from "redux-saga/effects";
import * as bookRequest from "../requests/book";
import * as types from "../../types";

export function* getAllBooksHandler() {
  try {
    const books = yield call(bookRequest.getAllBooksRequest);
    yield put({
      type: types.GET_BOOKS_SUCCESS,
      books: books.books,
    });
  } catch (e) {
    yield put({ type: types.GET_BOOKS_FAILED, message: e.message });
  }
}
