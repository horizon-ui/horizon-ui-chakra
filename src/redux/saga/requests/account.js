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
export const updateAccountRequest = async (id, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/${id}`, {
    method: "PATCH",
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

export const createAccountRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/add-account`, {
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
export const getCurrentAccountRequest = async (account) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/find-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
