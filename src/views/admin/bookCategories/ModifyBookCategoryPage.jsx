import { Box } from "@chakra-ui/react";

import React from "react";

import ModifyBookCategory from "./components/ModifyBookCategory";

export default function ModifyBookCategoryPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModifyBookCategory />
    </Box>
  );
}
