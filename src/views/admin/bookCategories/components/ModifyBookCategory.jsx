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
import Loading from "components/loading/Loading";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateBookCategoryRequest } from "../../../../redux/saga/requests/bookCategories";
import { Toaster, toast } from "react-hot-toast";
import { getBookCategoryByIdRequest } from "../../../../redux/saga/requests/bookCategories";

const ModifyBookCategory = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams();
  const dispatch = useDispatch();
  const [bookCategory, setBookCategory] = useState(null);
  const [name, setName] = useState(null);
  const [tag, setTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = params.id;

  const handleUpdateTag = async () => {
    if (name === "" || tag === "") {
      toast.error("Vui lòng nhập đầy đủ!");
    } else {
      const request = {
        name: name,
        tag: tag,
      };

      toast.promise(
        new Promise((resolve, reject) => {
          updateBookCategoryRequest(id, request)
            .then((resp) => {
              console.log("updatedBookCategory: ", resp.updatedBookCategory);
              if (resp.updatedBookCategory) {
                resolve("Cập nhật thành công!");
                window.location.replace("/admin/bookCategories");
              } else if (resp.message == "BookCategory not found") {
                reject("Không tìm thấy BookCategory!");
              }
            })
            .catch((err) => {
              console.error("Cập nhật thất bại!", err);
              reject("Cập nhật thất bại!");
            });
        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error,
        }
      );

      console.log("request", request);
      setName("");
      setTag("");
    }
  };

  console.log("bookCategory:", bookCategory);
  useEffect(() => {
    getBookCategoryByIdRequest(id).then((res) => setBookCategory(res.bookCategory));
  }, [id]);
  useEffect(() => {
    if (bookCategory) {
      setTag(bookCategory.tag);
      setName(bookCategory.name);
    }
  }, [bookCategory]);

  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                BookCategory Information
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
              <Input value={tag} onChange={(e) => setTag(e.target.value)}
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
              <Input value={name} onChange={(e) => setName(e.target.value)}
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
              onClick={handleUpdateTag}
            >
              Update
            </Button>
          </>
        )}
      </Card>

      <Toaster />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Tag:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{tag}</Text>
            <Text>{name}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Update Tag
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModifyBookCategory;
