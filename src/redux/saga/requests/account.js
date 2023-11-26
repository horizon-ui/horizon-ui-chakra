import * as type from "../../types";

export const getAccountsRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/get-account`, {
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
export const getAccountByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/get-account/${id}`, {
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
