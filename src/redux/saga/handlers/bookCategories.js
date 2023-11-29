import { call, put } from "redux-saga/effects";
import * as bookCategoriesRequest from "../requests/bookCategories";
import * as types from "../../types";

export function* getBookCategoriesHandler() {
  try {
    const bookCategories = yield call( bookCategoriesRequest.getBookCategoriesRequest);
    yield put({
      type: types.GET_BOOKCATEGORIES_SUCCESS,
      bookCategories: bookCategories.bookCategories,
    });
  } catch (e) {
    yield put({ type: types.GET_BOOKCATEGORIES_FAILED, message: e.message });
  }
}
export function* getBookCategorByIdHandler({ payload }) {
  console.log("handler");
  try {
    const bookCategory = yield call(
      bookCategoriesRequest.getBookCategoryByIdRequest,
      payload
    );
    yield put({
      type: types.GET_BOOKCATEGORY_SUCCESS,
      bookCategory: bookCategory.bookCategory,
    });
  } catch (e) {
    yield put({ type: types.GET_BOOKCATEGORY_FAILED, message: e.message });
  }
}
