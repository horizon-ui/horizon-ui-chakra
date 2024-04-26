
import React from 'react'
import Card from "components/card/Card";
import { useColorModeValue } from '@chakra-ui/system';
import { Text, Flex } from '@chakra-ui/react';


const InfoTransaction = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

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
          220,000,000 vnd
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
          Tháng 4/2024 - Tháng 5/2024
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
          72
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
          21
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
          48
        </Text>
      </Flex>
    </Card>
  )
}

export default InfoTransaction
