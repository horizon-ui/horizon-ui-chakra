import { Box } from "@chakra-ui/react";

import React from "react";
import ModifyBook from "./components/ModifyBook";

export default function ModifyBookPage() {

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModifyBook
      />
    </Box>
  );
}
