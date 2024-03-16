import * as type from "../../types";

export const getBookCategoriesRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/get-categories`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const getBookCategoryByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/get-category/${id}`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const addNewBookCategoryRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/add-category`, {
    method: "POST",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const updateBookCategoryRequest = async (id, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/update/${id}`, {
    method: "PUT",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const deleteBookCategoryByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/bookCategory/delete/${id}`, {
    method: "DELETE",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
