import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import { thunk } from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
