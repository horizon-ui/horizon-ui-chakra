import * as type from "../../types";

export const getAllCommentsRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/comment`, {
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

export const deleteOneCommentById = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/comment/delete-one/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const deleteManyComments = async (commentIds) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/comment/delete-many`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentIds),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
