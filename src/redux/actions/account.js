import * as type from "../types";

export const getAccounts = () => ({
  type: type.GET_ACCOUNTS_REQUESTED,
});
export const getAccountById = (id) => {
  return {
    type: type.GET_ACCOUNT_REQUESTED,
    payload: id,
  };
};
