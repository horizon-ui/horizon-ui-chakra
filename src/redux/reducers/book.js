import * as type from "../types";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case type.GET_BOOKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.books,
      };
    case type.GET_BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
