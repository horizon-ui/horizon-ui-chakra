import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdManageAccounts,
  MdBook,
  MdTag,
  MdLogout,
  MdCategory,
  MdMoney,
  MdComment,
  MdDiscount,
} from "react-icons/md";

import AccountManage from "views/admin/accounts";
import BookManage from "views/admin/books";
import TagManage from "views/admin/tags";
import BookCategoryManage from "views/admin/bookCategories";

import MofifyAccountPage from "views/admin/accounts/ModifyAccountPage";
import ModifyBookPage from "views/admin/books/ModifyBookPage";
import ModifyTagPage from "views/admin/tags/ModifyTagPage";
import ModifyBookCategoryPage from "views/admin/bookCategories/ModifyBookCategoryPage";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import NewAccountPage from "views/admin/accounts/NewAccountPage";
import NewBookPage from "views/admin/books/NewBookPage";
import NewTagPage from "views/admin/tags/NewTagPage";
import NewBookCategoryPage from "views/admin/bookCategories/NewBookCategoryPage";
import TransactionsPage from "views/admin/transactions/index";
import CommentsPage from "views/admin/comments";
import VouchersPage from "views/admin/vouchers";
import NewVoucherPage from "views/admin/vouchers/NewVoucherPage";
import EditVoucherPage from "views/admin/vouchers/EditVoucherPage";

const routes = [
  {
    name: "Accounts",
    layout: "/admin",
    path: "/accounts",
    icon: (
      <Icon as={MdManageAccounts} width="20px" height="20px" color="inherit" />
    ),
    component: AccountManage,
    display: "true",
  },
  {
    name: "account edit",
    layout: "/admin",
    path: "/account/edit/:id",
    display: "false",
    component: MofifyAccountPage,
  },
  {
    name: "account new",
    layout: "/admin",
    path: "/account/new",
    display: "false",
    component: NewAccountPage,
  },
  {
    name: "Books",
    layout: "/admin",
    path: "/books",
    icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
    component: BookManage,
    display: "true",
  },
  {
    name: "book edit",
    layout: "/admin",
    path: "/book/edit/:id",
    display: "false",
    component: ModifyBookPage,
  },
  {
    name: "book new",
    layout: "/admin",
    path: "/book/new",
    display: "false",
    component: NewBookPage,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "/bookCategories",
    icon: <Icon as={MdCategory} width="20px" height="20px" color="inherit" />,
    component: BookCategoryManage,
    display: "true",
  },
  {
    name: "category edit",
    layout: "/admin",
    path: "/bookCategory/edit/:id",
    display: "false",
    component: ModifyBookCategoryPage,
  },
  {
    name: "category new",
    layout: "/admin",
    path: "/bookCategory/new",
    display: "false",
    component: NewBookCategoryPage,
  },
  {
    name: "Tags",
    layout: "/admin",
    path: "/tags",
    icon: <Icon as={MdTag} width="20px" height="20px" color="inherit" />,
    component: TagManage,
    display: "true",
  },
  {
    name: "tag edit",
    layout: "/admin",
    path: "/tag/edit/:id",
    display: "false",
    component: ModifyTagPage,
  },
  {
    name: "tag new",
    layout: "/admin",
    path: "/tag/new",
    display: "false",
    component: NewTagPage,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/transactions",
    display: "true",
    icon: <Icon as={MdMoney} width="20px" height="20px" color="inherit" />,
    component: TransactionsPage,
  },
  {
    name: "Comments",
    layout: "/admin",
    path: "/comments",
    display: "true",
    icon: <Icon as={MdComment} width="20px" height="20px" color="inherit" />,
    component: CommentsPage,
  },
  {
    name: "Vouchers",
    layout: "/admin",
    path: "/vouchers",
    display: "true",
    icon: <Icon as={MdDiscount} width="20px" height="20px" color="inherit" />,
    component: VouchersPage,
  },
  {
    name: "Vouchers",
    layout: "/admin",
    path: "/voucher/new",
    display: "false",
    icon: <Icon as={MdDiscount} width="20px" height="20px" color="inherit" />,
    component: NewVoucherPage,
  },
  {
    name: "Vouchers",
    layout: "/admin",
    path: "/voucher/edit/:id",
    display: "false",
    icon: <Icon as={MdDiscount} width="20px" height="20px" color="inherit" />,
    component: EditVoucherPage,
  },
  {
    name: "Log out",
    // layout: "/auth",

    feature: "logout",
    path: "/login",
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
    display: "true",
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  //   display: "true",
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  //   display: "true",
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  //   display: "true",
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  //   display: "true",
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  //   display: "true",
  // },
];

export default routes;
