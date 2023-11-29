import * as type from "../types";

const initialState = {
  bookCategories: [],
  bookCategory: null,
  loading: false,
  error: null,
};

export default function bookCategories(state = initialState, action) {
  switch (action.type) {
    case type.GET_BOOKCATEGORIES_REQUESTED:
      console.log("request");
      return {
        ...state,
        loading: true,
      };
    case type.GET_BOOKCATEGORY_REQUESTED:
      console.log("request");
      return {
        ...state,
        loading: true,
      };
    case type.GET_BOOKCATEGORIES_SUCCESS:
      console.log("success");
      console.log("action.bookCategories", action.bookCategories);
      return {
        ...state,
        loading: false,
        bookCategories: action.bookCategories,
      };
    case type.GET_BOOKCATEGORY_SUCCESS:
      console.log("success");

      return {
        ...state,
        loading: false,
        bookCategory: action.bookCategory,
      };
    case type.GET_BOOKCATEGORIES_FAILED:
    case type.GET_BOOKCATEGORY_FAILED:
      console.log("failed");

      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
