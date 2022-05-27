// Chakra imports
import React from "react";
import { Avatar, Flex, useColorModeValue, Icon, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import TransparentMenu from "components/menu/TransparentMenu";
// Custom icons
import { IoEllipsisVertical } from "react-icons/io5";

export default function Default(props) {
  const { avatar, name, job, ...rest } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("white", "#1B254B");
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "none"
  );

  return (
    <Card boxShadow={shadow} py='10px' bg={bg} {...rest}>
      <Flex align='center'>
        <Flex justifyContent='center' alignItems='center'>
          <Avatar
            h={{ base: "48px", xl: "36px", "2xl": "48px" }}
            w={{ base: "48px", xl: "36px", "2xl": "48px" }}
            src={avatar}
            me='20px'
          />
          <Flex direction='column' align='start'>
            <Text
              color={textColor}
              fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
              fontWeight='700'>
              {name}
            </Text>
            <Text
              color='secondaryGray.600'
              textAlign='left'
              fontSize={{ base: "sm", xl: "xs", "3xl": "sm" }}
              fontWeight='400'>
              {job}
            </Text>
          </Flex>
        </Flex>

        <TransparentMenu
          ms='auto'
          mb='0px'
          icon={
            <Icon as={IoEllipsisVertical} w='24px' h='24px' color={textColor} />
          }
        />
      </Flex>
    </Card>
  );
}
