import * as type from "../types";

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case type.GET_ACCOUNTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.accounts,
      };
    case type.GET_ACCOUNTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
