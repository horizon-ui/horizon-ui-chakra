import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as handler from "../saga/handlers/tag";
import * as type from "../types";

export default function* tagSaga() {
  yield takeEvery(type.GET_TAGS_REQUESTED, handler.getAllTagsHandler);
  yield takeEvery(type.GET_TAG_REQUESTED, handler.getTagByIdHandler);
}
