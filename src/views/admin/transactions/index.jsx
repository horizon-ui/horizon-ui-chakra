
import { Box, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import TransactionTable from "./components/TransactionTable";
import InfoTransaction from "./components/InfoTransaction";
import Card from "components/card/Card";

export default function Transactions() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card
        direction="column"
        w="100%"
        px="20px"
        my="10px"
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Doanh thu tính từ:
        </Text>
        <Flex
          my="15px"
          flexDirection="row"
          alignItems={"center"}
        >
          <Input placeholder='Select Date and Time' size='md' type='month' />
          <Text
            color={textColor}
            fontSize="17px"
            fontWeight="500"
            lineHeight="100%"
            margin={"0 30px"}
          >
            đến:
          </Text>
          <Input placeholder='Select Date and Time' size='md' type='month' />

        </Flex>

      </Card>
      <InfoTransaction />
      <TransactionTable />
    </Box>
  );
}
