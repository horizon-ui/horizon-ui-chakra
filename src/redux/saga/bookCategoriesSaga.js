import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as handler from "../saga/handlers/bookCategories";
import * as type from "../types";

export default function* bookCategoriesSaga() {
  yield takeEvery(
    type.GET_BOOKCATEGORIES_REQUESTED,
    handler.getBookCategoriesHandler
  );
  yield takeEvery(
    type.GET_BOOKCATEGORY_REQUESTED,
    handler.getBookCategorByIdHandler
  );
}
