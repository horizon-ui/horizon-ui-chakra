
import React, { useEffect, useState } from 'react'
import Card from "components/card/Card";
import { useColorModeValue } from '@chakra-ui/system';
import { Text, Flex } from '@chakra-ui/react';


const InfoTransaction = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const transactions = props.transactions;
  const isLoading = props.isLoading;
  const fromMonth = props.fromMonth;
  const fromYear = props.fromYear;
  const toMonth = props.toMonth;
  const toYear = props.toYear;
  const [totalRevenue, setTotalRevenue] = useState(0)

  function calculateTotalRevenueVnd(transactions) {
    let t = 0
    for (const transaction of transactions) {
      t = t + transaction.amount
    }
    return t
  }

  useEffect(() => {
    setTotalRevenue(calculateTotalRevenueVnd(transactions))
  }, [transactions])
  return (
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
        Thống kê doanh thu Mori
      </Text>
      <Flex
        my="15px"
        flexDirection="row"
        alignItems={"center"}
      >
        <Text w="200px">Tổng doanh thu:</Text>
        <Text
          color={textColor}
          fontSize="17px"
          fontWeight="500"
          lineHeight="100%"
        >
          {totalRevenue} vnd
        </Text>
      </Flex>
      <Flex
        my="15px"
        flexDirection="row"
        alignItems={"center"}
      >
        <Text w="200px">Thời gian:</Text>
        <Text
          color={textColor}
          fontSize="17px"
          fontWeight="500"
          lineHeight="100%"
        >
          Tháng {fromMonth}/{fromYear} - Tháng {toMonth}/{toYear}
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        my="15px"
        flexDirection="row"
      >
        <Text w="200px">Số lượng giao dịch:</Text>
        <Text
          color={textColor}
          fontSize="17px"
          fontWeight="500"
          lineHeight="100%"
        >
          {transactions.length}
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        my="15px"
        flexDirection="row"
      >
        <Text w="200px">Số lượng giao dịch hội viên:</Text>
        <Text
          color={textColor}
          fontSize="17px"
          fontWeight="500"
          lineHeight="100%"
        >
          {transactions.filter(t => t.productType === "Membership").length}
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        my="15px"
        flexDirection="row"
      >
        <Text w="200px">Số lượng giao dịch mua lẻ:</Text>
        <Text
          color={textColor}
          fontSize="17px"
          fontWeight="500"
          lineHeight="100%"
        >
          {transactions.filter(t => t.productType !== "Membership").length}
        </Text>
      </Flex>
    </Card>
  )
}

export default InfoTransaction
