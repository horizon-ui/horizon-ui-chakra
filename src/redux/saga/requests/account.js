export const getAccountsRequest = async () => {
  return fetch(`http://localhost:8080/api/account/get-account`, {
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
