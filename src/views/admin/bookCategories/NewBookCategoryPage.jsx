import { Box } from "@chakra-ui/react";
import React from "react";
import NewBookCategory from "./components/NewBookCategory";

export default function NewBookCategoryPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <NewBookCategory />
    </Box>
  );
}
