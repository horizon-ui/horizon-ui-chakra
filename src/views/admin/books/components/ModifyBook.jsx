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
  TagCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  ModalFooter,
  useDisclosure,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBookByIdRequest } from "../../../../redux/saga/requests/book";
import { Toaster, toast } from "react-hot-toast";
import { getAllTagsRequest } from "../../../../redux/saga/requests/tag"; import { updateBookRequest } from "../../../../redux/saga/requests/book";
import { uploadBookImageRequest } from "../../../../redux/saga/requests/book";
import { uploadBookEpubRequest } from "../../../../redux/saga/requests/book";
import { uploadNewChapterRequest } from "../../../../redux/saga/requests/book";
import * as type from '../../../../redux/types'


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
  const [uploadedAudio, setUploadedAudio] = useState("")
  const [uploadedEpub, setUploadedEpub] = useState("")
  const [totalPages, setTotalPages] = useState("")
  const [currentPdf, setCurrentPdf] = useState("")
  const [currentImage, setCurrentImage] = useState("")
  const [currentAudio, setCurrentAudio] = useState("")
  const [currentEpub, setCurrentEpub] = useState("")
  const [audioName, setAudioName] = useState("")
  const [bookChapters, setBookChapters] = useState([])
  const { isOpen: isOpenTag, onOpen: onOpenTag, onClose: onCloseTag } = useDisclosure()
  const { isOpen: isOpenPdf, onOpen: onOpenPdf, onClose: onClosePdf } = useDisclosure()
  const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure()
  const { isOpen: isOpenAudio, onOpen: onOpenAudio, onClose: onCloseAudio } = useDisclosure()
  const { isOpen: isOpenEpub, onOpen: onOpenEpub, onClose: onCloseEpub } = useDisclosure()
  const [reload, setReload] = useState(0)

  const handleAddNewTag = () => {
    if (newTag !== '') {
      setTags([...tags, newTag]);
    }
    onCloseTag();
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleGetAllTags = async () => {
    await getAllTagsRequest()
      .then(res => {
        setTagList(res.allTags)
      })
  }

  const handleUploadEpub = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        uploadBookEpubRequest(uploadedEpub)
          .then((resp) => {
            if (resp.message) {
              resolve(resp.message)
              setCurrentEpub(resp.filename)
              onCloseEpub()
            }
            else {
              reject("Upload error!");
            }
          })

      }),
      {
        loading: "Uploading...",
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
            if (resp.error) {
              reject(resp.error)
            }
            if (resp.message) {
              resolve(resp.message)
              setCurrentImage(resp.filename)
              onCloseImage()
            }
            else {
              reject("Upload error!");
            }
          })

      }),
      {
        loading: "Uploading...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );

  }
  const handleUploadAudio = async () => {
    if (uploadedAudio == "") {
      toast.error("Please upload new audio chapter!")
    }
    else {
      const newChapter = {
        book_id: book._id,
        audio: uploadedAudio
      }
      console.log("newChapter", newChapter)
      toast.promise(
        new Promise((resolve, reject) => {
          uploadNewChapterRequest(newChapter)
            .then((resp) => {
              if (resp.error) {
                reject(resp.message)
              }
              else {
                resolve(resp.message)
                setReload(p => p + 1)
              }
            })

        }),
        {
          loading: "Uploading...",
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    }
  }
  const handleUpdateBook = async () => {
    const request = {
      book: {
        name: name,
        author: author,
        pdf: currentPdf,
        image: currentImage,
        epub: currentEpub,
        totalPages: totalPages,
        intro: intro,
        tags: tags,
        access_level: accessLevel,
        chapters: bookChapters
      }
    }

    toast.promise(
      new Promise((resolve, reject) => {
        updateBookRequest(id, request)
          .then((resp) => {
            if (resp.updatedBook) {
              resolve("Cập nhật thành công!")
              window.location.replace("/admin/books");
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
    getBookByIdRequest(id)
      .then(res => setBook(res.book))
  }, [reload])
  useEffect(() => {
    if (book) {
      setName(book.name)
      setAuthor(book.author)
      setIntro(book.intro)
      setTags(book.tags)
      setCurrentPdf(book.pdf)
      setCurrentEpub(book.epub)
      setTotalPages(book.totalPages)
      setCurrentImage(book.image)
      setAccessLevel(book.access_level)
      setBookChapters(book.chapters)
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
              src={`${type.BACKEND_URL_DEV}/api/bookimg/${book.image}`}
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
            <Input value={totalPages} onChange={(e) => setTotalPages(e.target.value)} />
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
            <Flex w="100%" justifyContent="space-between">
              <Flex flexWrap="wrap" w="100%">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                    marginRight="10px"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                  </Tag>
                ))}
              </Flex>
              <Button
                width="50px"
                variant="outline"
                colorScheme="blue"
                onClick={() => onOpenTag()}
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
              <option value="2">2 (For purchase)</option>
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
            <FormLabel w="148px">Epub</FormLabel>
            <Flex w="100%" justifyContent={"space-between"}>
              <Flex flexWrap={"wrap"} w="90%" marginRight={"10px"}>
                <Input value={currentEpub} disabled />

              </Flex>
              <Button
                width="auto"
                colorScheme="blue"
                variant='outline'
                onClick={() => { onOpenEpub() }}
              >
                Upload epub
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
          <Flex
            mx="25px"
            my="5px"
            paddingBottom={"30px"}
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel w="148px">Audio</FormLabel>
            <Flex w="100%" justifyContent={"space-between"}>
              <Flex flexWrap={"wrap"} w="90%" marginRight={"10px"}>
                <UnorderedList>
                  {
                    bookChapters.length != 0 ?
                      bookChapters.map((chapter) => (
                        <ListItem>
                          <a href={chapter.audio}>{chapter.name}</a></ListItem>
                      ))
                      :
                      <></>
                  }
                </UnorderedList>
              </Flex>
              <Button
                width="auto"
                colorScheme="blue"
                variant='outline'
                onClick={() => { onOpenAudio() }}
              >
                Upload audio
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

      <Modal isOpen={isOpenEpub} onClose={onCloseEpub}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload epub file:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file"
              onChange={(e) => setUploadedEpub(e.target.files[0])}
            />

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseEpub}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleUploadEpub}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenImage} onClose={onCloseImage}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file"
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
      <Modal isOpen={isOpenAudio} onClose={onCloseAudio}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Audio:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Audio name:</FormLabel>
              <Input value={audioName} onChange={(e) => setAudioName(e.target.value)} />
            </Flex>
            <input type="file" name="file"
              onChange={(e) => {
                setUploadedAudio(e.target.files[0]);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseAudio}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleUploadAudio}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Toaster />
    </div>
  );
};

export default ModifyBook;
