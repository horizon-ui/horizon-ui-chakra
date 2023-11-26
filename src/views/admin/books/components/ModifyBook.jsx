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
  Tag,
  TagLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAccountById } from "redux/actions/account";
import { getBookById } from "redux/actions/book";
import { getBookByIdRequest } from "redux/saga/requests/book";
import { Toaster, toast } from "react-hot-toast";
import { getAllTagsRequest } from "redux/saga/requests/tag";
import { uploadBookPdfRequest } from "redux/saga/requests/book";
import { updateBookRequest } from "redux/saga/requests/book";
import { uploadBookImageRequest } from "redux/saga/requests/book";

const ModifyBook = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams()
  const dispatch = useDispatch();
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const id = params.id;

  const [name, setName] = useState(null)
  const [author, setAuthor] = useState(null)
  const [intro, setIntro] = useState(null)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [accessLevel, setAccessLevel] = useState(null)
  const [tagList, setTagList] = useState(null)
  const [uploadedPdf, setUploadedPdf] = useState("")
  const [uploadedImage, setUploadedImage] = useState("")
  const [currentPdf, setCurrentPdf] = useState("")
  const [currentImage, setCurrentImage] = useState("")
  const { isOpen: isOpenTag, onOpen: onOpenTag, onClose: onCloseTag } = useDisclosure()
  const { isOpen: isOpenPdf, onOpen: onOpenPdf, onClose: onClosePdf } = useDisclosure()
  const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure()


  const handleAddNewTag = () => {
    if (newTag !== "") {
      tags.push(newTag)
    }
    onCloseTag()
  }

  const handleGetAllTags = async () => {
    await getAllTagsRequest()
      .then(res => {
        setTagList(res.allTags)
      })
  }
  const handleUploadPdf = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        uploadBookPdfRequest(uploadedPdf)
          .then((resp) => {
            if (resp.message) {
              resolve(resp.message)
              setCurrentPdf(resp.blobUrl)
            }
            else {
              reject("Upload error!");
            }
          })

      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );

  }
  const handleUploadImage = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        uploadBookImageRequest(uploadedImage)
          .then((resp) => {
            if (resp.message) {
              resolve(resp.message)
              setCurrentImage(resp.blobUrl)
            }
            else {
              reject("Upload error!");
            }
          })

      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );

  }
  const handleUpdateBook = async () => {
    const request = {
      book: {
        name: name,
        author: author,
        pdf: currentPdf,
        image: currentImage,
        intro: intro,
        tags: tagList,
        access_level: accessLevel
      }
    }
    console.log("request:", request)
    toast.promise(
      new Promise((resolve, reject) => {
        updateBookRequest(id, request)
          .then((resp) => {
            if (resp.updatedBook) {
              resolve("Cập nhật thành công!")
              console.log("resp", resp)
            }
            else {
              reject("Cập nhật thất bại!");
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

  useEffect(() => {
    getBookByIdRequest(id)
      .then(res => setBook(res.book))
  }, [])
  useEffect(() => {
    if (book) {
      setName(book.name)
      setAuthor(book.author)
      setIntro(book.intro)
      setTagList(book.tags)
      setCurrentPdf(book.pdf)
      setCurrentImage(book.image)
      setAccessLevel(book.access_level)
    }
  }, [book])

  return (
    <div>
      {!book ? <Loading /> :
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
              src={book.image}
              width="120px"
              height="auto"
              alt="img"
            />
            <FormLabel w="auto" marginLeft="30px" fontSize="30px">
              {book.name}
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
            <Textarea value={intro} height={200} onChange={(e) => setIntro(e.target.value)} />
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Total pages</FormLabel>
            <Input value={book.totalPages} disabled />
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Total read</FormLabel>
            <Input value={book.totalRead} disabled />
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Total saved</FormLabel>
            <Input value={book.totalSaved.length} disabled />
          </Flex>

          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Rating</FormLabel>
            <Input value={book.rating} disabled />
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
                variant='outline'
                colorScheme="blue"
                onClick={() => { onOpenTag(); setNewTag(""); handleGetAllTags() }}
              >
                +
              </Button>
            </Flex>
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="150px">Access level</FormLabel>
            <Select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
              <option value="0">0 (For free user)</option>
              <option value="1">1 (For member)</option>
            </Select>
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            paddingBottom={"30px"}
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="148px">Pdf</FormLabel>
            <Flex w="100%" justifyContent={"space-between"}>
              <Flex flexWrap={"wrap"} w="90%" marginRight={"10px"}>
                <Input value={currentPdf} disabled />

              </Flex>
              <Button
                width="auto"
                colorScheme="blue"
                variant='outline'
                onClick={() => { onOpenPdf() }}
              >
                Upload pdf
              </Button>
            </Flex>
          </Flex>
          <Flex
            mx="25px"
            my="5px"
            paddingBottom={"30px"}
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="148px">Image</FormLabel>
            <Flex w="100%" justifyContent={"space-between"}>
              <Flex flexWrap={"wrap"} w="90%" marginRight={"10px"}>
                <Input value={currentImage} disabled />
              </Flex>
              <Button
                width="auto"
                colorScheme="blue"
                variant='outline'
                onClick={() => { onOpenImage() }}
              >
                Upload image
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
            onClick={handleUpdateBook}
          >
            Update
          </Button>
        </Card>}
      <Modal isOpen={isOpenTag} onClose={onCloseTag}>
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
            <Button colorScheme='red' mr={3} onClick={onCloseTag}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleAddNewTag}>Add new Tag</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenPdf} onClose={onClosePdf}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload PDF file:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file" name="file"
              onChange={(e) => setUploadedPdf(e.target.files[0])}
            />

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseTag}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleUploadPdf}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenImage} onClose={onCloseImage}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file" name="file"
              onChange={(e) => {
                setUploadedImage(e.target.files[0]);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseImage}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleUploadImage}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Toaster />
    </div>
  );
};

export default ModifyBook;
