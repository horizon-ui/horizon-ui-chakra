import * as type from "../../types";

export const getAllTagsRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/get-tags`, {
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
export const getTagByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/tag/${id}`, {
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
