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
import { getTagByIdRequest } from "redux/saga/requests/tag";
import { updateTagRequest } from "redux/saga/requests/tag";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ModifyTag = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams();
  const dispatch = useDispatch();
  const [tag, setTag] = useState(null);
  const [name, setTagName] = useState(null);
  const [description, setTagDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = params.id;

  const handleUpdateTag = async () => {
    if (name === "" || description === "") {
      toast.error("Vui lòng nhập đầy đủ!");
    } else {
      const request = {
          name: name,
          description: description,
      };

      toast.promise(
        new Promise((resolve, reject) => {
          updateTagRequest(id, request)
            .then((resp) => {
              console.log("updatedTag: ",resp.updatedTag);
              if (resp.updatedTag) {
                resolve("Cập nhật thành công!");
              } else if (resp.message == "Tag not found") {
                reject("Không tìm thấy tag!");
              } else if (resp.message === "Name and description are required") {
                reject("Name and description are required");
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
      setTagName("");
      setTagDescription("");
    }
  };

  console.log("tag:", tag);
  useEffect(() => {
    getTagByIdRequest(id).then((res) => setTag(res.tag));
  }, []);
  useEffect(() => {
    if (tag) {
      setTagName(tag.name);
      setTagDescription(tag.description);
    }
  }, [tag]);

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
              <Input
                value={name}
                onChange={(e) => setTagName(e.target.value)}
              />
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
                value={description}
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
            <Text>{name}</Text>
            <Text>{description}</Text>
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

export default ModifyTag;
