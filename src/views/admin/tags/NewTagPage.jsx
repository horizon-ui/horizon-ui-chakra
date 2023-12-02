
import { Box, } from "@chakra-ui/react";
import React from "react";
import NewTag from "./components/NewTag";

export default function NewTagPage() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <NewTag
      />
    </Box>
  );
}
