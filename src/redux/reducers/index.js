import { combineReducers } from "redux";
import accounts from "./account";
import books from "./book";
import tags from "./tag";
import bookCategories from "./bookCategories"

const rootReducer = combineReducers({
  accounts: accounts,
  books: books,
  tags: tags,
  bookCategories: bookCategories,
});
export default rootReducer;
