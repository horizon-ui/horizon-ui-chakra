export const getAllTagsRequest = async () => {
  return fetch(`http://localhost:8080/api/tag/get-tags`, {
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
  return fetch(`http://localhost:8080/api/tag/${id}`, {
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
