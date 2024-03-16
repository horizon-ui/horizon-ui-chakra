import * as type from "../../types";

export const getAccountsRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/get-account`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const getAccountByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/get-account/${id}`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const updateAccountRequest = async (id, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/${id}`, {
    method: "PATCH",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const createAccountRequest = async (account) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/add-account`, {
    method: "POST",
    headers: type.requestHeader,
    body: JSON.stringify(account),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const getCurrentAccountRequest = async (account) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/account/find-account`, {
    method: "POST",
    headers: type.requestHeader,
    body: JSON.stringify(account),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
