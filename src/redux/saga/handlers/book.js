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
export function* getBookByIdHandler({ payload }) {
  try {
    const book = yield call(bookRequest.getBookByIdRequest, payload);
    yield put({
      type: types.GET_BOOK_SUCCESS,
      book: book.book,
    });
  } catch (e) {
    yield put({ type: types.GET_BOOK_FAILED, message: e.message });
  }
}
