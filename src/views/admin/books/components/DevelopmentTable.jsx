
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Input
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdEdit,
  MdRemoveCircle,
  MdAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../../../redux/actions/book";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { deleteBookByIdRequest } from "../../../../redux/saga/requests/book";
import { Toaster, toast } from "react-hot-toast";
import * as type from '../../../../redux/types'

export default function DevelopmentTable() {
  console.log("type:", type)
  const dispatch = useDispatch()
  const books = useSelector(state => state.books.books)
  const isLoading = useSelector(state => state.books.loading)
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const [deleteBook, setDeleteBook] = useState(null)
  const [reload, setReload] = useState(0);
  const [password, setPassword] = useState("");
  const handleDeleteBook = async () => {
    console.log("id:", deleteBook)

    // Kiểm tra mật khẩu
    if (password !== "03350141") {
      toast.error("Wrong password, cannot delete book");
      return;
    }

    toast.promise(
      new Promise((resolve, reject) => {
        deleteBookByIdRequest(deleteBook._id)
          .then((resp) => {
            if (resp.message) {
              resolve("Xóa sách thành công!")
              console.log("resp", resp)
            }
            else {
              reject("Xóa sách thất bại!");
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
    // setDeleteBook(null)
    onCloseDelete()
    setReload(i => i + 1)
  }

  console.log("books:", books)
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])
  useEffect(() => {
    dispatch(getBooks())
  }, [reload])


  const [bookList, setBookList] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const handleValueChange = (value) => {
    setSearchValue(value)
    const result = bookList.filter((book) => {
      return book.name?.toLowerCase().includes(value) ||
        book.author?.toLowerCase().includes(value) ||
        book._id?.includes(value)
    })
    setBookList(result)
    console.log("bookList", bookList)
    if (value === "") {
      setBookList(books)
    }
  }

  useEffect(() => {
    if (books) {
      setBookList(books)
    }
  }, [books])



  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll" }}
        overflowY={{ sm: "scroll" }}
      >
        <SearchBar mx="20px" mb="10px" onValueChange={handleValueChange} />
        {!bookList ? <Loading />
          : <>
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                Book Manage
              </Text>
              <Link href="/admin/book/new">
                <Button>
                  <Icon
                    as={MdAdd}
                    width="20px"
                    height="20px"
                    color="inherit"
                    cursor="pointer"
                  />
                  Add new book
                </Button>
              </Link>
            </Flex>
            <Table variant="simple" color="gray.500" mb="24px">
              <Thead>

                <Tr>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >Image</Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >Name</Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      Author
                    </Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >Total Pages</Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >Total Read</Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >Rating</Flex>
                  </Th>
                </Tr>

              </Thead>

              <Tbody>
                {
                  bookList.length != 0 ? bookList.map((book) => (
                    <Tr>
                      <Td>
                        <img src={`${type.BACKEND_URL_DEV}/api/bookimg/${book.image}`} alt="img" width={60} height={60} />
                      </Td>
                      <Td>{book.name}</Td>
                      <Td>{book.author}</Td>
                      <Td>{book.totalPages}</Td>
                      <Td>{book.totalRead}</Td>
                      <Td>{book.rating}</Td>
                      <Td>
                        <Link href={`/admin/book/edit/${book._id}`}>
                          <Icon
                            as={MdEdit}
                            width="20px"
                            height="20px"
                            color="inherit"
                            cursor="pointer"
                          />
                        </Link>
                      </Td>
                      <Td>
                        <Icon
                          as={MdRemoveCircle}
                          width="20px"
                          height="20px"
                          color="inherit"
                          cursor="pointer"
                          onClick={() => { onOpenDelete(); setDeleteBook(book) }}

                        />
                      </Td>
                    </Tr>


                  ))
                    :
                    <Tr>
                      <Td>
                        <Skeleton height='10px' />
                      </Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td>
                        <Skeleton height='10px' />
                      </Td>
                      <Td>
                        <Skeleton height='10px' />
                      </Td>
                    </Tr>
                }
              </Tbody>
            </Table>
          </>}
      </Card>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Delete book {deleteBook ? deleteBook.name : <Spinner />}? Please enter password to delete
            <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseDelete}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleDeleteBook}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </>

  );
}
