import { combineReducers } from "redux";
import accounts from "./account";
import books from "./book";
import tags from "./tag";

const rootReducer = combineReducers({
  accounts: accounts,
  books: books,
  tags: tags,
});
export default rootReducer;
