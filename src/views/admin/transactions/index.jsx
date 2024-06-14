
import { Box, Flex, Input, Text, useColorModeValue, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TransactionTable from "./components/TransactionTable";
import InfoTransaction from "./components/InfoTransaction";
import Card from "components/card/Card";
import { getAllTransactionsByDateRangeRequest, getAllTransactionsRequest } from "../../../redux/saga/requests/transaction";

export default function Transactions() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [selectedEndDate, setSelectedEndDate] = useState('')
  const [fromMonth, setFromMonth] = useState('')
  const [fromYear, setFromYear] = useState('')
  const [toMonth, setToMonth] = useState('')
  const [toYear, setToYear] = useState('')

  console.log(`${fromMonth} / ${fromYear} - ${toMonth} / ${toYear}`)

  const getTransactionData = () => {
    setIsLoading(true)
    getAllTransactionsRequest().then(resp => {
      console.log("resp", resp.data)
      setTransactions(resp.data)
      setIsLoading(false)
    })
  }
  const getTransactionByDateRangeData = () => {
    setIsLoading(true)
    getAllTransactionsByDateRangeRequest(
      fromMonth,
      toMonth,
      fromYear,
      toYear).then(resp => {
        console.log("resp", resp.transactions)
        setTransactions(resp.transactions)
        setIsLoading(false)
      })
  }

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
    setFromMonth(getExtractedMonth(event.target.value))
    setFromYear(getExtractedYear(event.target.value))
  };
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
    setToMonth(getExtractedMonth(event.target.value))
    setToYear(getExtractedYear(event.target.value))
  };

  const getExtractedMonth = (dateString) => {
    if (!dateString) return ''
    const parts = dateString.split('-'); // Split on hyphen
    const month = parts[1];
    return month
  }
  const getExtractedYear = (dateString) => {
    if (!dateString) return ''
    const parts = dateString.split('-'); // Split on hyphen
    const year = parts[0];
    return year
  }

  const handleFilterTransactions = () => {
    getTransactionByDateRangeData()
  }

  useEffect(() => {
    getTransactionData()
  }, [])
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
          <Input placeholder='Select Date and Time' size='md' type='month'
            value={selectedStartDate}
            onChange={handleStartDateChange} />
          <Text
            color={textColor}
            fontSize="17px"
            fontWeight="500"
            lineHeight="100%"
            margin={"0 30px"}
          >
            đến:
          </Text>
          <Input placeholder='Select Date and Time' size='md' type='month'
            value={selectedEndDate}
            onChange={handleEndDateChange} />
        </Flex>

        <Button colorScheme="blue" style={{ width: "fit-content", marginLeft: "auto" }}
          onClick={() => handleFilterTransactions()}
        >Filter</Button>
      </Card>
      <InfoTransaction transactions={transactions} isLoading={isLoading}
        fromMonth={fromMonth} fromYear={fromYear} toMonth={toMonth} toYear={toYear}
      />
      <TransactionTable transactions={transactions} isLoading={isLoading} />
    </Box>
  );
}
