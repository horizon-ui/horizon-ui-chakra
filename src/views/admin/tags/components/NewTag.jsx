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
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createTagRequest } from "redux/saga/requests/tag";


const NewTag = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleAddNewTag = async () => {
    const request = {
      name: name,
      description: description,
    }
    console.log("request:", request)
    toast.promise(
      new Promise((resolve, reject) => {
        createTagRequest(request)
          .then((resp) => {
            if (resp.newTag) {
              resolve("Thêm tag thành công!")
              console.log("resp", resp)
            }
            else {
              reject("Thêm thất bại!");
            }
          })
          .catch(err => {
            console.log("err", err)
          })

      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );

  }
  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        <>
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
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Flex>

          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Description</FormLabel>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </Flex>

          <Button
            width="100px"
            colorScheme="blue"
            right="0"
            position="absolute"
            marginRight="25px"
            marginBottom="25px"
            bottom="-10px"
            onClick={handleAddNewTag}

          >
            Update
          </Button>
        </>
      </Card>
      <Toaster />
    </div>
  );
};

export default NewTag;
