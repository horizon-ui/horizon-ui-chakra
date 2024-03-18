export const BACKEND_URL_DEV = process.env.REACT_APP_BACKEND_URL ?? "";
export const FRONTEND_URL_DEV = process.env.REACT_APP_FRONTEND_URL ?? "";
export const ADMIN_URL_DEV = process.env.REACT_APP_ADMIN_URL ?? "";
export const ALLOW_ORIGIN_TOKEN = process.env.REACT_APP_ALLOW_ORIGIN_TOKEN;

console.log("ALLOW_ORIGIN_TOKEN", ALLOW_ORIGIN_TOKEN);
export const requestHeader = {
  "Content-Type": "application/json",
};

// *Accounts
export const GET_ACCOUNTS_REQUESTED = "GET_ACCOUNTS_REQUESTED";
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS";
export const GET_ACCOUNTS_FAILED = "GET_ACCOUNTS_FAILED";

export const GET_ACCOUNT_REQUESTED = "GET_ACCOUNT_REQUESTED";
export const GET_ACCOUNT_SUCCESS = "GET_ACCOUNT_SUCCESS";
export const GET_ACCOUNT_FAILED = "GET_ACCOUNT_FAILED";

// * Books
export const GET_BOOKS_REQUESTED = "GET_BOOKS_REQUESTED";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILED = "GET_BOOKS_FAILED";

export const GET_BOOK_REQUESTED = "GET_BOOK_REQUESTED";
export const GET_BOOK_SUCCESS = "GET_BOOK_SUCCESS";
export const GET_BOOK_FAILED = "GET_BOOK_FAILED";

// * bookCategories
export const GET_BOOKCATEGORIES_REQUESTED = "GET_BOOKCATEGORIES_REQUESTED";
export const GET_BOOKCATEGORIES_SUCCESS = "GET_BOOKCATEGORIES_SUCCESS";
export const GET_BOOKCATEGORIES_FAILED = "GET_BOOKCATEGORIES_FAILED";

export const GET_BOOKCATEGORY_REQUESTED = "GET_BOOKCATEGORY_REQUESTED";
export const GET_BOOKCATEGORY_SUCCESS = "GET_BOOKCATEGORY_SUCCESS";
export const GET_BOOKCATEGORY_FAILED = "GET_BOOKCATEGORY_FAILED";

// * Tags
export const GET_TAGS_REQUESTED = "GET_TAGS_REQUESTED";
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";
export const GET_TAGS_FAILED = "GET_TAGS_FAILED";

export const GET_TAG_REQUESTED = "GET_TAG_REQUESTED";
export const GET_TAG_SUCCESS = "GET_TAG_SUCCESS";
export const GET_TAG_FAILED = "GET_TAG_FAILED";
