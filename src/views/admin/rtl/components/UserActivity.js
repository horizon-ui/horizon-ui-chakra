// Chakra imports
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React from "react";
import {
  barChartDataUserActivity,
  barChartOptionsUserActivity,
} from "variables/charts";

export default function UserActivity(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          User Activity
        </Text>
        <Select
          id='user_type'
          w='unset'
          variant='transparent'
          display='flex'
          alignItems='center'
          defaultValue='Weekly'>
          <option value='Weekly'>Weekly</option>
          <option value='Daily'>Daily</option>
          <option value='Monthly'>Monthly</option>
        </Select>
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataUserActivity}
          chartOptions={barChartOptionsUserActivity}
        />
      </Box>
    </Card>
  );
}
