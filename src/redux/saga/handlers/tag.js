import { call, put } from "redux-saga/effects";
import * as tagRequest from "../requests/tag";
import * as types from "../../types";

export function* getAllTagsHandler() {
  try {
    const tags = yield call(tagRequest.getAllTagsRequest);
    yield put({
      type: types.GET_TAGS_SUCCESS,
      tags: tags.allTags,
    });
  } catch (e) {
    yield put({ type: types.GET_TAGS_FAILED, message: e.message });
  }
}
export function* getTagByIdHandler({ payload }) {
  console.log("handler");
  try {
    const tag = yield call(tagRequest.getTagByIdRequest, payload);
    yield put({
      type: types.GET_TAG_SUCCESS,
      tag: tag.tag,
    });
  } catch (e) {
    yield put({ type: types.GET_TAG_FAILED, message: e.message });
  }
}
