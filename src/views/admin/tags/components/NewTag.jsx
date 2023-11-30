import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { addNewTagRequest } from "redux/saga/requests/tag";
import { Toaster, toast } from "react-hot-toast";

const NewTag = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTag = async () => {
    if (tagName === "" || tagDescription === "") {
      toast.error("Vui lòng nhập đầy đủ!");
    } else {
      const request = {
        name: tagName,
        description: tagDescription,
      };

      toast.promise(
        new Promise((resolve, reject) => {
          addNewTagRequest(request)
            .then((resp) => {
              console.log(resp.message );
              if (resp.message == "Tag added successfully!") {
                resolve("Thêm tag thành công!");
              } else if(resp.message == "Tag already exists"){
                reject("Tag đã tồn tại!");
              }
            })
            .catch((err) => {
              console.error("Đã xảy ra lỗi", err);
              reject("Đã xảy ra lỗi");
            });
        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error,
        }
      );

      console.log("request", request);
      setTagName("");
      setTagDescription("");
    }
  };

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
          <FormLabel w="150px">Tag Name</FormLabel>
          <Input value={tagName} onChange={(e) => setTagName(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Description</FormLabel>
          <Input
            value={tagDescription}
            onChange={(e) => setTagDescription(e.target.value)}
          />
        </Flex>

        <Button
          width="100px"
          colorScheme="blue"
          right="0"
          position="absolute"
          marginRight="25px"
          marginBottom="25px"
          bottom="-10px"
          onClick={handleAddTag}
        >
          Add
        </Button>
      </Card>

      <Toaster />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Tag:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{tagName}</Text>
            <Text>{tagDescription}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Add new Tag
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewTag;
