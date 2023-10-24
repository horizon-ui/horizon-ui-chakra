import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Avatar,
  Select,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";

const ModifyAccount = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Account Information
          </Text>
        </Flex>
        <Flex
          mx="25px"
          my="10px"
          justifyContent="left"
          flexDirection="row"
          alignItems="center"
        >
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            marginRight="20px"
          />
          <FormLabel w="auto">Pham Quynh Huong</FormLabel>
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Email</FormLabel>
          <Input value="hihi" disabled="true" />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Phone Number</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Role</FormLabel>
          <Select placeholder="Customer">
            <option value="0">Customer</option>
            <option value="1">Admin</option>
          </Select>
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Is member</FormLabel>
          <Select placeholder="True">
            <option value="0">True</option>
            <option value="1">False</option>
          </Select>
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Is blocked</FormLabel>
          <Select placeholder="False">
            <option value="0">True</option>
            <option value="1">False</option>
          </Select>
        </Flex>
        <Button
          width="100px"
          colorScheme="blue"
          right="0"
          position="absolute"
          marginRight="25px"
          marginBottom="25px"
          bottom="-10px"
        >
          Update
        </Button>
      </Card>
    </div>
  );
};

export default ModifyAccount;
