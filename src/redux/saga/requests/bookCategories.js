import * as type from "../../types";

export const getBookCategoriesRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/get-categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const getBookCategoryByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/get-category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const addNewBookCategoryRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/add-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
