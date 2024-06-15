
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdEdit,
  MdRemoveCircle,
  MdAdd,
  MdLink,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import * as type from '../../../redux/types'
import { deleteManyComments, deleteOneCommentById, getAllCommentsRequest } from "../../../redux/saga/requests/comment";
import * as utils from '../../../utils/utils'
import styles from './style.scss'

export default function DevelopmentTable() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const skeletons = Array(7).fill(null);
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [filteredComments, setFilteredComments] = useState([])
  const [selectedOneComment, setSelectedOneComment] = useState(null);
  const [selectedCommentList, setSelectedCommentList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteCommentList,
    onOpen: onOpenDeleteCommentList,
    onClose: onCloseDeleteCommentList,
  } = useDisclosure();

  const getCommentsData = () => {
    setIsLoading(true)
    getAllCommentsRequest().then((resp) => {
      setComments(resp.data.reverse())
      setFilteredComments(resp.data)
      setIsLoading(false)
    })
  }
  const handleDelete = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        deleteOneCommentById(selectedOneComment._id)
          .then((resp) => {
            if (resp.message) {
              resolve("Xóa bình luận thành công!");
              console.log("resp", resp);
              getCommentsData();
            } else {
              reject("Xóa bình luận thất bại!");
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
    onCloseDelete();
  }

  const handleDeleteSelectedCommentList = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        deleteManyComments({
          commentIds: selectedCommentList
        })
          .then((resp) => {
            if (resp.message) {
              resolve("Xóa bình luận thành công!");
              console.log("resp", resp);
              getCommentsData();
            } else {
              reject("Xóa bình luận thất bại!");
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
    onCloseDeleteCommentList();
  }

  const onFilterChange = (isToxic) => {
    if (isToxic === "true") {
      setFilteredComments(comments.filter(c => c.is_toxic === true))
    }
    if (isToxic === "false") {
      setFilteredComments(comments.filter(c => c.is_toxic === false))
    }
    if (isToxic === "all") {
      setFilteredComments(comments)
    }
  }

  const handleCheckboxChange = (commentId, isChecked) => {
    console.log("selectedCommentList", selectedCommentList)
    const updatedSelectedComments = isChecked
      ? [...selectedCommentList, commentId] // Add comment ID if checked
      : selectedCommentList.filter(id => id !== commentId); // Remove comment ID if unchecked
    setSelectAll(updatedSelectedComments.length === comments.length);
    setSelectedCommentList(updatedSelectedComments);
  };
  const handleSelectAllChange = (isChecked) => {
    const updatedSelectedComments = isChecked ? filteredComments.map(comment => comment._id) : [];
    setSelectedCommentList(updatedSelectedComments);
    console.log("updatedSelectedComments", updatedSelectedComments)
    console.log(updatedSelectedComments.includes(filteredComments[0]._id))
    setSelectAll(isChecked);
  };

  useEffect(() => {
    getCommentsData()
  }, [])

  useEffect(() => {
    const filteredList = filteredComments.filter((comment) => {
      const searchTextLower = searchTerm.toLowerCase();
      const commentId = comment._id?.toLowerCase();
      const content = comment.content?.toLowerCase();
      const postId = comment.post?.toLowerCase();
      return commentId?.includes(searchTextLower) ||
        postId?.includes(searchTextLower) ||
        content?.includes(searchTextLower)
    });

    setFilteredComments(filteredList);

    if (searchTerm === "") {
      setFilteredComments(comments)
    }
  }, [searchTerm])

  return (
    <>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll" }}
        overflowY={{ sm: "scroll" }}
      >
        <SearchBar mx="20px" mb="10px" onValueChange={(value) => setSearchTerm(value)} />
        <>
          <Flex style={{
            paddingLeft: "25px",
            marginBottom: "20px"
          }} justify="space-between" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Comments Manage
            </Text>
            <Flex justify="space-between" align="center">
              <Select width={"200px"} style={{ cursor: "pointer" }} placeholder='Lọc theo kết quả'
                onChange={(e) => onFilterChange(e.target.value)}
              >
                <option value='true'>Negative</option>
                <option value='false'>Positive</option>
                <option value='all'>All</option>
              </Select>
              <Button marginLeft={"10px"} colorScheme='blue'
                onClick={() => {
                  if (selectedCommentList.length > 0) {
                    onOpenDeleteCommentList();
                  }
                  else {
                    toast.error("Vui lòng chọn bình luận cần xóa!")
                  }
                }}
              >Delete selected comments</Button>
            </Flex>
          </Flex>
          <Checkbox
            style={{ marginLeft: "auto" }}
            checked={selectAll}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
          >Chọn tất cả</Checkbox>
          <Table variant="simple" color="gray.500" mb="24px">
            <Thead>
              <Tr>
                <Th></Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Bình luận</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Người dùng</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    Link Bài viết
                  </Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Ngày tạo</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Kết quả</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Action</Flex>
                </Th>
              </Tr>

            </Thead>

            <Tbody overflowY={"scroll"} maxHeight={"200px"}>
              {
                !isLoading ?
                  filteredComments.map(c => (
                    <Tr>
                      <Td>
                        <Checkbox
                          isChecked={selectedCommentList.includes(c._id)}
                          // checked={true}
                          onChange={(e) => handleCheckboxChange(c._id, e.target.checked)}
                        />

                      </Td>
                      <Td>{c.content}</Td>
                      <Td>{c.account ? c.account.displayName : ""}</Td>
                      <Td>
                        <Link href={`${type.FRONTEND_URL_DEV}/post/${c.post}`}>
                          <Icon
                            as={MdLink}
                            width="20px"
                            height="20px"
                            color="inherit"
                            cursor="pointer"
                          />
                        </Link>

                      </Td>
                      <Td>{utils.convertMongoDBTimeToHourMinDate(c.created_at)}</Td>
                      <Td>
                        {
                          c.is_toxic ?
                            <div className="negative-tag" >Negative</div>
                            :
                            <div className="positive-tag" >Positive</div>
                        }
                      </Td>

                      <Td onClick={() => {
                        setSelectedOneComment(c)
                        onOpenDelete()
                      }}>
                        <Icon
                          as={MdRemoveCircle}
                          width="20px"
                          height="20px"
                          color="inherit"
                          cursor="pointer"
                        />
                      </Td>
                    </Tr>
                  )) :
                  skeletons.map((_, index) => (
                    <Tr>
                      <Td>
                        <Skeleton height='10px' />
                      </Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>

                    </Tr>
                  ))
              }

            </Tbody>
          </Table>
        </>
      </Card >

      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Bạn muốn xóa bình luận này?
            <div>
              {selectedOneComment?.content}
            </div>
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
      <Modal isOpen={isOpenDeleteCommentList} onClose={onCloseDeleteCommentList}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Bạn muốn xoá {selectedCommentList.length} bình luận được chọn?
            <div>
              {selectedOneComment?.content}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onCloseDeleteCommentList}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleDeleteSelectedCommentList}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </>

  );
}
