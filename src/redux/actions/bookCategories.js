import * as type from "../types";

export const getBookCategories = () => ({
  type: type.GET_BOOKCATEGORIES_REQUESTED,
});
export const getBookCategoryById = (id) => {
  console.log("get bookCategory by id:", id);
  return {
    type: type.GET_BOOKCATEGORY_REQUESTED,
    payload: id,
  };
};
