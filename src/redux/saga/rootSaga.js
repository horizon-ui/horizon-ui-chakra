import { all } from "redux-saga/effects";
import accountSaga from "./accountSaga";
import bookSaga from "./bookSaga";
import tagSaga from "./tagSaga";

export default function* rootSaga() {
  yield all([accountSaga(), bookSaga(), tagSaga()]);
}
