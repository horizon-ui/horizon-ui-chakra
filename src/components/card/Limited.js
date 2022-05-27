// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React from "react";
import { MdFastfood, MdOutlineWatchLater } from "react-icons/md";

export default function Limited(props) {
  const { image, name, offer, avatar } = props;
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <Flex
            bg={`url(${image})`}
            bgSize='cover'
            bgPosition={{ base: "center", "3xl": "unset" }}
            maxW='100%'
            w={{ base: "343px", lg: "343px" }}
            h={{ base: "185px", lg: "185px" }}
            borderRadius='20px'
          />
          <Flex
            position='absolute'
            align='center'
            justify='center'
            bg='linear-gradient(112.83deg, rgba(255, 255, 255, 0.47) 0%, rgba(255, 255, 255, 0) 110.84%)'
            backdropFilter='blur(50px)'
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='12px'
            minW='42px'
            h='42px'>
            <Icon
              transition='0.2s linear'
              w='24px'
              h='24px'
              as={MdOutlineWatchLater}
              color='white'
            />
          </Flex>
        </Box>
        <Avatar src={avatar} h='60px' w='60px' mt='-50px' ms='15px' mb='15px' />
        <Flex ms='10px' flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  "2xl": "md",
                  "3xl": "2xl",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
              <Flex align='center'>
                <Icon
                  as={MdFastfood}
                  color='secondaryGray.600'
                  me='10px'
                  h='24px'
                  w='24px'
                />
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "lg",
                  }}
                  fontWeight='400'
                  me='14px'>
                  {offer}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
