import * as type from "../../types";
export const getAllTransactionsRequest = async () => {
  console.log("type.requestHeader,", type.requestHeader);
  return fetch(`${type.BACKEND_URL_DEV}/api/transaction/get-transaction`, {
    method: "GET",
    headers: type.requestHeader,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
