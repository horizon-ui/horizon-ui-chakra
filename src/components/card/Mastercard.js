import React from "react";

// Chakra imports
import { Flex, Box, Icon, Text, Spacer } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import bgMastercard from "assets/img/dashboards/Debit.png";
import { RiMastercardFill } from "react-icons/ri";

export default function Banner(props) {
  const { exp, cvv, number, ...rest } = props;

  // Chakra Color Mode
  return (
    <Card
      backgroundImage={bgMastercard}
      backgroundRepeat='no-repeat'
      bgSize='cover'
      alignSelf='center'
      w={{ base: "100%", md: "60%", xl: "99%" }}
      bgPosition='10%'
      mx='auto'
      p='20px'
      {...rest}>
      <Flex direction='column' color='white' h='100%' w='100%'>
        <Flex justify='space-between' align='center' mb='37px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Glassy.
          </Text>
          <Icon as={RiMastercardFill} w='48px' h='auto' color='gray.400' />
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Box>
            <Text fontSize={{ sm: "xl", lg: "lg", xl: "xl" }} fontWeight='bold'>
              {number}
            </Text>
          </Box>
          <Flex mt='14px'>
            <Flex direction='column' me='34px'>
              <Text fontSize='xs'>VALID THRU</Text>
              <Text fontSize='sm' fontWeight='500'>
                {exp}
              </Text>
            </Flex>
            <Flex direction='column'>
              <Text fontSize='xs'>CVV</Text>
              <Text fontSize='sm' fontWeight='500'>
                {cvv}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
