
import { Box } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/accounts/components/DevelopmentTable";

import React from "react";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <DevelopmentTable
      />
    </Box>
  );
}
