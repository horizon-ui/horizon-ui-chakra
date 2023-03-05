import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import RankingTables from "views/admin/rankingTables";

const routes = [
  {
    name: "Profile Rankings",
    layout: "/attestation",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/ranking-tables",
    component: RankingTables,
  },
];

export default routes;
