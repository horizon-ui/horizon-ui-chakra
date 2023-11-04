import * as type from "../types";

const initialState = {
  accounts: [],
  account: null,
  loading: false,
  error: null,
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case type.GET_ACCOUNTS_REQUESTED:
    case type.GET_ACCOUNT_REQUESTED:
      console.log("request");
      return {
        ...state,
        loading: true,
      };
    case type.GET_ACCOUNTS_SUCCESS:
      console.log("success");
      return {
        ...state,
        loading: false,
        accounts: action.accounts,
      };
    case type.GET_ACCOUNT_SUCCESS:
      console.log("success");
      return {
        ...state,
        loading: false,
        account: action.account,
      };
    case type.GET_ACCOUNTS_FAILED:
    case type.GET_ACCOUNT_FAILED:
      console.log("failed");

      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
