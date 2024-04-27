import * as type from "../../types";
export const getAllBooksRequest = async () => {
  console.log("type.requestHeader,", type.requestHeader);
  return fetch(`${type.BACKEND_URL_DEV}/api/book/get-book`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const getBookByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/get-book/${id}`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
export const deleteBookByIdRequest = async (id) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/${id}`, {
    method: "DELETE",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const addNewBookRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/book/add-book`, {
    method: "POST",
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const addNewChapterRequest = async (request) => {
  return fetch(`${type.BACKEND_URL_DEV}/api/chapter/add-chapter`, {
    method: "POST",
    headers: type.requestHeader,
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
    headers: type.requestHeader,
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const uploadNewChapterRequest = async (newChapter) => {
  const formData = new FormData();
  formData.append("audio", newChapter.audio);
  formData.append("book_id", newChapter.book_id);

  return fetch(`${type.BACKEND_URL_DEV}/api/azure/upload/chapter`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const uploadBookImageRequest = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  return fetch(`${type.BACKEND_URL_DEV}/api/book/upload-image`, {
    method: "POST",
    headers: {
      Origin: type.BACKEND_URL_DEV,
    },

    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const uploadBookEpubRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${type.BACKEND_URL_DEV}/api/book/upload-epub`, {
    method: "POST",
    headers: {
      Origin: type.BACKEND_URL_DEV,
    },

    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
