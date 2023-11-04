
import { Box } from "@chakra-ui/react"
import React from "react";
import NewBook from "./components/NewBook";

export default function NewBookPage() {

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <NewBook
      />
    </Box>
  );
}
