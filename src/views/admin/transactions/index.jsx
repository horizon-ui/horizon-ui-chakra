
import { Box } from "@chakra-ui/react";
import React from "react";
import TransactionTable from "./components/TransactionTable";
import InfoTransaction from "./components/InfoTransaction";

export default function Transactions() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <InfoTransaction />
      <TransactionTable />
    </Box>
  );
}
