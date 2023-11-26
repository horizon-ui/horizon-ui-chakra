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
  Stack,
  Container,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tag,
  TagLabel,
  Spinner,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { getAllTagsRequest } from "redux/saga/requests/tag";
import { Toaster, toast } from "react-hot-toast";
import { addNewBookRequest } from "redux/saga/requests/book";


const NewBook = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [intro, setIntro] = useState("")
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [tagList, setTagList] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAdd = async () => {
    if (name === "" || author === "" || intro === "" || tags.length === 0) {
      toast.error('Vui lòng nhập đủ thông tin!')
    }
    else {
      const request = {
        name: name,
        author: author,
        intro: intro,
        tags: tags
      }
      toast.promise(
        new Promise((resolve, reject) => {
          addNewBookRequest(request)
            .then((resp) => {
              if (resp.message) {
                resolve("Thêm sách thành công!")
              }
              else {
                reject("Sách đã tồn tại!");
              }
            })

        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error.message,
        }
      );

      console.log("request", request)

    }
  }

  const handleAddNewTag = () => {
    if (newTag !== "") {
      tags.push(newTag)
    }
    onClose()
  }


  const handleGetAllTags = async () => {
    await getAllTagsRequest()
      .then(res => {
        console.log("res:", res.allTags)
        setTagList(res.allTags)
      })
  }


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
            New Book Information
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
          <FormLabel w="150px">Author</FormLabel>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Intro</FormLabel>
          <Textarea value={intro} onChange={(e) => setIntro(e.target.value)} />
        </Flex>


        <Flex
          mx="25px"
          my="5px"
          paddingBottom={"30px"}
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="148px">Tags</FormLabel>
          <Flex w="100%" justifyContent={"space-between"}>
            <Flex flexWrap={"wrap"} w="90%">
              {
                tags.map(tag => (
                  <Tag size="md" borderRadius='full'
                    variant='solid'
                    colorScheme='blue' marginRight={"10px"}>
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))
              }

            </Flex>
            <Button
              width="50px"
              colorScheme="blue"
              onClick={() => { onOpen(); setNewTag(""); handleGetAllTags() }}
            >
              +
            </Button>
          </Flex>
        </Flex>


        <Button
          width="100px"
          colorScheme="blue"
          right="0"
          position="absolute"
          marginRight="25px"
          marginBottom="25px"
          bottom="-10px"
          onClick={handleAdd}
        >
          Add
        </Button>
      </Card >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New tag:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} /> */}
            {tagList ? <Select placeholder='Select option' onChange={(e) => setNewTag(e.target.value)}>
              {
                tagList.map(tag => (
                  <option value={tag.name}>{tag.description}</option>
                ))
              }

            </Select> : <Spinner />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleAddNewTag}>Add new Tag</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </div >
  );
};

export default NewBook;
