import * as type from "../../types";

export const getAllDiscountVouchersRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/discountVoucher`, {
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

export const getDiscountVoucherByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/discountVoucher/${id}`, {
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

export const createDiscountVoucherRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/discountVoucher/`, {
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

export const editDiscountVoucherRequest = async (voucherId, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/discountVoucher/${voucherId}`, {
    method: "PUT",
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

export const deleteDiscountVoucherRequest = async (voucherId) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/discountVoucher/${voucherId}`, {
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
