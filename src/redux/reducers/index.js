import { combineReducers } from "redux";
import accounts from "./account";
import books from "./book";

const rootReducer = combineReducers({
  accounts: accounts,
  books: books,
});
export default rootReducer;
