
import {
  Button,
  Flex,
  Link,
  ModalBody,
  ModalFooter,
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
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton
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
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { getTags } from "redux/actions/tag";
import { Toaster, toast } from "react-hot-toast";
import { deleteTagByIdRequest } from "redux/saga/requests/tag";


export default function DevelopmentTable() {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags.tags)
  const isLoading = useSelector(state => state.tags.loading)
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const [deleteTag, setDeleteTag] = useState(null);
  const [reload, setReload] = useState(0)



  const handleDeleteTag = async () => {
    console.log("id:", deleteTag)
    toast.promise(
      new Promise((resolve, reject) => {
        deleteTagByIdRequest(deleteTag._id)
          .then((resp) => {
            if (resp.message) {
              resolve("Xóa tag thành công!")
              console.log("resp", resp)
            }
            else {
              reject("Xóa tag thất bại!");
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
    onCloseDelete()
    setReload(i => i + 1)
  }
  console.log("tags:", tags)
  useEffect(() => {
    dispatch(getTags())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTags())
  }, [reload])

  const [tagList, setTagList] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const handleValueChange = (value) => {
    setSearchValue(value)
    const result = tagList.filter((tag) => {
      return tag.name?.toLowerCase().includes(value) ||
        tag.description?.toLowerCase().includes(value)
    })
    setTagList(result)
    console.log("tagList", tagList)
    if (value === "") {
      setTagList(tags)
    }
  }

  useEffect(() => {
    if (tags) {
      setTagList(tags)
    }
  }, [tags])

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll" }}
      overflowY={{ sm: "scroll" }}
    >
      <SearchBar mx="20px" mb="10px" onValueChange={handleValueChange} />
      {!tagList ? <Loading />
        : <>
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Tag Manage
            </Text>
            <Link href="/#/admin/tag/new">
              <Button>
                <Icon
                  as={MdAdd}
                  width="20px"
                  height="20px"
                  color="inherit"
                  cursor="pointer"
                />
                Add new tag
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
                  >Name</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Description</Flex>
                </Th>

              </Tr>

            </Thead>

            <Tbody>
              {
                tagList.map((tag) => (
                  <Tr>
                    <Td>{tag.name}</Td>
                    <Td>{tag.description}</Td>
                    <Td>
                      <Link href={`/#/admin/tag/edit/${tag._id}`}>
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
                        onClick={() => { onOpenDelete(); setDeleteTag(tag) }}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>}
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Delete tag {deleteTag ? deleteTag.name : <Spinner />}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseDelete}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleDeleteTag}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </Card>


  );
}
