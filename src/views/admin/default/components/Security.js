// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { Fingerprint } from "components/icons/Icons";
import React from "react";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brand = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} h='100%' mb='20px' align='center' p='20px'>
      <Flex direction='column' height='100%'>
        <Fingerprint
          h={{ base: "58px", "3xl": "91px" }}
          w={{ base: "58px", "3xl": "91px" }}
          color={brand}
        />
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          textAlign='start'
          fontSize={{ base: "xl", "3xl": "2xl" }}
          ps='10px'
          pe={{ "3xl": "60px" }}
          mb='10px'
          mt='15px'>
          Control card security in-app with a tap
        </Text>
        <Text
          color={textColorSecondary}
          fontSize='md'
          ps='10px'
          mt={{ base: "0px", lg: "0px", "2xl": "10px" }}
          mb={{ base: "auto", lg: "auto", "2xl": "10px" }}
          textAlign='start'>
          Discover our cards benefits, with one tap.
        </Text>
        <Button
          h='46px'
          w='100%'
          py='10px'
          mt={{ base: "20px", "2xl": "auto" }}
          variant='brand'
          fontWeight='500'>
          Cards
        </Button>
      </Flex>
    </Card>
  );
}
