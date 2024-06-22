
import { Box } from "@chakra-ui/react";
import React from "react";
import DevelopmentTable from "./DevelopmentTable";

export default function VouchersPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <DevelopmentTable />
    </Box>
  );
}
