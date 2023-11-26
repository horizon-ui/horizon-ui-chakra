import * as type from "../../types";
export const getAllBooksRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/get-book`, {
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

export const getBookByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/get-book/${id}`, {
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
export const deleteBookByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/${id}`, {
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

export const addNewBookRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/add-book`, {
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

export const updateBookRequest = async (id, request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/${id}`, {
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

export const uploadBookPdfRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${type.BACKEND_URL_DEV}/api/azure/upload/book-pdf`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const uploadBookImageRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${type.BACKEND_URL_DEV}/api/azure/upload/book-img`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
