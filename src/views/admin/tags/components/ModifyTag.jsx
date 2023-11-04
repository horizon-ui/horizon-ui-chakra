import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";

const ModifyTag = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
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
            Tag Information
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

export default ModifyTag;
