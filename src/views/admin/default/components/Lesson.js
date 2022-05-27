// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
// Assets
import React from "react";
import {
  MdLocalFireDepartment,
  MdTimer,
  MdSlowMotionVideo,
} from "react-icons/md";

export default function Limited(props) {
  const { attendants, ...rest } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const box = useColorModeValue("red.100", "navy.700");
  const icon = useColorModeValue("red.500", "white");
  const down = useColorModeValue("gray.100", "navy.700");
  return (
    <Card p='0px' {...rest}>
      <Flex direction={{ base: "column" }} justify='center'>
        <Flex direction='column' pt='32px' px='17px'>
          <Flex align='center' mb={{ base: "40px", xl: "20px", "2xl": "40px" }}>
            <IconBox
              me={{ base: "12px", xl: "8px", "2xl": "12px" }}
              h={{ base: "48px", xl: "38px", "2xl": "48px" }}
              w={{ base: "48px", xl: "38px", "2xl": "48px" }}
              borderRadius={{ base: "16px", xl: "12px", "2xl": "16px" }}
              bg={box}
              icon={
                <Icon
                  h={{ base: "28px", xl: "20px", "2xl": "28px" }}
                  w={{ base: "28px", xl: "20px", "2xl": "28px" }}
                  as={MdLocalFireDepartment}
                  color={icon}
                />
              }
            />
            <Flex direction='column' align='start'>
              <Text
                color='secondaryGray.600'
                fontSize={{ base: "sm" }}
                fontWeight='400'>
                Business Design
              </Text>
              <Text
                color={textColor}
                fontSize={{ base: "md" }}
                fontWeight='700'>
                New lession is available
              </Text>
            </Flex>
          </Flex>
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
            <Text
              color={textColor}
              fontSize={{
                base: "xl",
                "2xl": "md",
                "3xl": "xl",
              }}
              mb='5px'
              fontWeight='bold'
              me='14px'>
              What do you need to know to create better products?
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction='column'
          mt='40px'
          borderBottomRightRadius='20px'
          borderBottomLeftRadius='20px'
          pb='30px'
          pt='15px'
          px={{ base: "28px", xl: "20px", "2xl": "28px" }}
          bg={down}
          h='150px'
          w='100%'>
          <Flex>
            <Flex align='center' me='26px'>
              <Icon as={MdTimer} h='24px' w='24px' me='6px' color='green.500' />
              <Text
                color={textColor}
                fontSize={{ base: "sm", xl: "xs", "2xl": "sm" }}
                fontWeight='700'>
                85 mins
              </Text>
            </Flex>
            <Flex align='center'>
              <Icon
                as={MdSlowMotionVideo}
                h='24px'
                w='24px'
                me='6px'
                color='red.500'
              />
              <Text
                color={textColor}
                fontSize={{ base: "sm", xl: "xs", "2xl": "sm" }}
                fontWeight='700'>
                Video format
              </Text>
            </Flex>
          </Flex>
          <Flex
            w='100%'
            align={{
              base: "center",
              xl: "start",
              "2xl": "center",
            }}
            justifyContent='space-between'
            mt='auto'
            direction={{
              base: "row",
              xl: "column",
              "2xl": "row",
            }}>
            <AvatarGroup
              mb={{
                base: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              max={4}
              color={textColorBid}
              size='sm'
              mt={{
                base: "0px",
                md: "10px",
                "2xl": "0px",
              }}
              fontSize='12px'>
              {attendants.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup>
            <Button
              h='46px'
              w='100%'
              maxW='128px'
              py='10px'
              variant='brand'
              fontWeight='500'>
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
