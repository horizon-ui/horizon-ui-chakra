
import { Box } from "@chakra-ui/react"
import React from "react";
import NewVoucher from "./components/NewVoucher";

export default function NewVoucherPage() {

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <NewVoucher />
    </Box>
  );
}
