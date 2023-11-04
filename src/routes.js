import React from "react";
import { Icon } from "@chakra-ui/react";
import { MdManageAccounts, MdBook, MdTag, MdLogout } from "react-icons/md";

import AccountManage from "views/admin/accounts";
import BookManage from "views/admin/books";
import TagManage from "views/admin/tags";
import MofifyAccountPage from "views/admin/accounts/ModifyAccountPage";
import ModifyBookPage from "views/admin/books/ModifyBookPage";
import ModifyTagPage from "views/admin/tags/ModifyTagPage";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import NewAccountPage from "views/admin/accounts/NewAccountPage";
import NewBookPage from "views/admin/books/NewBookPage";

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
    path: "/account/edit",
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
    path: "/book/edit",
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
    path: "/tag/edit",
    display: "false",
    component: ModifyTagPage,
  },
  {
    name: "tag new",
    layout: "/admin",
    path: "/tag/new",
    display: "false",
    component: ModifyTagPage,
  },
  {
    name: "Log out",
    layout: "/auth",
    path: "/sign-in",
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
