import * as type from "../../types";

export const getAllTagsRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/get-tags`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const getTagByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/get-tag/${id}`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const updateTagByIdRequest = async (id, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/${id}`, {
    method: "PUT",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const createTagRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag`, {
    method: "POST",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const deleteTagByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/${id}`, {
    method: "DELETE",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
