
import { Box } from "@chakra-ui/react"
import React from "react";
import ModifyVoucher from "./components/ModifyVoucher";

export default function EditVoucherPage() {

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModifyVoucher />
    </Box>
  );
}
