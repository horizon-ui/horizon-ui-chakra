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
import { addNewBookCategoryRequest } from "../../../../redux/saga/requests/bookCategories";
import { Toaster, toast } from "react-hot-toast";

const NewBookCategory = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [bookCategoryName, setBookCategoryName] = useState("");
  const [bookCategoryTag, setBookCategoryTag] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBookCategory = async () => {
    if (bookCategoryName === "" || bookCategoryTag === "") {
      toast.error("Vui lòng nhập đầy đủ!");
    } else {
      const request = { tag: bookCategoryTag, name: bookCategoryName };

      toast.promise(
        new Promise((resolve, reject) => {
          addNewBookCategoryRequest(request)
            .then((resp) => {
              console.log(resp.message);
              if (resp.message == "Book category added successfully!") {
                resolve("Thêm book category thành công!");
              } else if (resp.message == "BookCategory already exist!") {
                reject("Book category  đã tồn tại!");
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
      setBookCategoryName("");
      setBookCategoryTag("");
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
            New BookCategory Information
          </Text>
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Tag</FormLabel>
          <Input
            value={bookCategoryTag}
            onChange={(e) => setBookCategoryTag(e.target.value)}
          />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Name</FormLabel>
          <Input
            value={bookCategoryName}
            onChange={(e) => setBookCategoryName(e.target.value)}
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
          onClick={handleAddBookCategory}
        >
          Add
        </Button>
      </Card>

      <Toaster />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Book Category:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{bookCategoryTag}</Text>
            <Text>{bookCategoryName}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Add new Book Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewBookCategory;
