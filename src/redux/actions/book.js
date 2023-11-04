import * as type from "../types";

export const getBooks = () => ({
  type: type.GET_BOOKS_REQUESTED,
});
export const getBookById = (id) => {
  return {
    type: type.GET_BOOK_REQUESTED,
    payload: id,
  };
};
