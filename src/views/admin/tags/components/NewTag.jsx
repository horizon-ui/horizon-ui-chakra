import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Avatar,
  Select,
  Button,
  Image,
  Textarea,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";

const NewTag = () => {
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
            New Tag Information
          </Text>
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Name</FormLabel>
          <Input value="hihi" />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Description</FormLabel>
          <Input value="hihi" />
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

export default NewTag;
