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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { MdEdit, MdRemoveCircle, MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import { getBookCategories } from "../../../../redux/actions/bookCategories";
import { deleteBookCategoryByIdRequest } from "../../../../redux/saga/requests/bookCategories";

export default function DevelopmentTable() {
  const dispatch = useDispatch();
  const bookCategories = useSelector(
    (state) => state.bookCategories.bookCategories
  );
  const isLoading = useSelector((state) => state.bookCategories.loading);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [deleteBookCategory, setDelete] = useState(null);
  const [reload, setReload] = useState(0);

  const handleDelete = async () => {
    console.log("id:", deleteBookCategory);
    toast.promise(
      new Promise((resolve, reject) => {
        deleteBookCategoryByIdRequest(deleteBookCategory._id)
          .then((resp) => {
            if (resp.message) {
              resolve("Xóa sách thành công!");
              console.log("resp", resp);
            } else {
              reject("Xóa sách thất bại!");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );
    // setDeleteBook(null)
    onCloseDelete();
    setReload((i) => i + 1);
  };

  useEffect(() => {
    dispatch(getBookCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBookCategories());
  }, [reload]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [cateList, setCateList] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const handleValueChange = (value) => {
    setSearchValue(value)
    const result = cateList.filter((cate) => {
      return cate.name?.toLowerCase().includes(value) ||
        cate.author?.toLowerCase().includes(value) ||
        cate._id?.includes(value)
    })
    setCateList(result)
    if (value === "") {
      setCateList(bookCategories)
    }
  }

  useEffect(() => {
    if (bookCategories) {
      setCateList(bookCategories)
    }
  }, [bookCategories])

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
        {!cateList ? (
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
                BookCategories Manage
              </Text>
              <Link href="/admin/bookCategory/new">
                <Button>
                  <Icon
                    as={MdAdd}
                    width="20px"
                    height="20px"
                    color="inherit"
                    cursor="pointer"
                  />
                  Add new BookCategory
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
                    >
                      Tag
                    </Flex>
                  </Th>
                  <Th pe="10px" borderColor={borderColor}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      Name
                    </Flex>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {cateList.map((bookCategory) => (
                  <Tr>
                    <Td>{bookCategory.tag}</Td>
                    <Td>{bookCategory.name}</Td>
                    <Td>
                      <Link
                        href={`/admin/bookCategory/edit/${bookCategory._id}`}
                      >
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
                        onClick={() => {
                          onOpenDelete();
                          setDelete(bookCategory);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </Card>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Delete BookCategory {deleteBookCategory ? deleteBookCategory.name : <Spinner />}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onCloseDelete}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </>
  );
}
