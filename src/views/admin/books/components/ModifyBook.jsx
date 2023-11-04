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

const ModifyBook = () => {
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
            Book Information
          </Text>
        </Flex>
        <Flex
          mx="25px"
          my="10px"
          justifyContent="left"
          flexDirection="row"
          alignItems="center"
        >
          <Image
            src="https://docsachhay.net/images/e-book/tuyen-tap-hat-giong-tam-hon.jpg"
            width="120px"
            height="auto"
          />
          <FormLabel w="auto" marginLeft="30px" fontSize="30px">
            hat giong tam hon
          </FormLabel>
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
          <FormLabel w="150px">Author</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Image</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Content</FormLabel>
          <Textarea value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">audio</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Intro</FormLabel>
          <Textarea value="" />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total pages</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total read</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total saved</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total hearted</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Rating</FormLabel>
          <Input value="2" disabled="true" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Tags</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Liked</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Access level</FormLabel>
          <Select placeholder="">
            <option value="0">0</option>
            <option value="1">1</option>
          </Select>
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Is active</FormLabel>
          <Select placeholder="">
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

export default ModifyBook;
