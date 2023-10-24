
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/books/components/DevelopmentTable";

import {
  columnsDataDevelopment,
} from "views/admin/books/variables/columnsData";
import tableDataDevelopment from "views/admin/books/variables/tableDataDevelopment.json";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <DevelopmentTable
        columnsData={columnsDataDevelopment}
        tableData={tableDataDevelopment}
      />
    </Box>
  );
}
