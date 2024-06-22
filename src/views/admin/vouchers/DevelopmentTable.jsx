
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
  MdApproval,
  MdCheck,
  MdCallToAction,
  MdKebabDining,
  MdMenu,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import * as type from '../../../redux/types'
import { approveCommentRequest, approveManyCommentRequest, deleteManyComments, deleteVoucherById, getAllCommentsRequest } from "../../../redux/saga/requests/comment";
import * as utils from '../../../utils/utils'
import styles from './style.scss'
import { getAllDiscountVouchersRequest } from "../../../redux/saga/requests/voucher";
import { deleteDiscountVoucherRequest } from "../../../redux/saga/requests/voucher";

export default function DevelopmentTable() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const skeletons = Array(7).fill(null);
  const [isLoading, setIsLoading] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [comments, setComments] = useState([])
  const [filteredVouchers, setFilteredVouchers] = useState([])
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const getVouchersData = () => {
    setIsLoading(true)
    getAllDiscountVouchersRequest().then((resp) => {
      setVouchers(resp.data)
      setFilteredVouchers(resp.data)
      setIsLoading(false)
    })
  }
  const handleDelete = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        deleteDiscountVoucherRequest(selectedVoucher._id)
          .then((resp) => {
            if (resp.message) {
              resolve(resp.message);
              getVouchersData();
            } else {
              reject("Xóa voucher thất bại!");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error,
      }
    );
    onCloseDelete();
  }
  useEffect(() => {
    getVouchersData()
  }, [])

  useEffect(() => {
    const filteredList = filteredVouchers.filter((voucher) => {
      const searchTextLower = searchTerm.toLowerCase();
      const id = voucher._id.toLowerCase();
      const code = voucher.code.toLowerCase();
      const discount = voucher.discount.toLowerCase();
      const description = voucher.description.toLowerCase();
      const expiresIn = voucher.expiresIn.toLowerCase();
      return id?.includes(searchTextLower) ||
        code?.includes(searchTextLower) ||
        discount.toString().includes(searchTextLower) ||
        description?.includes(searchTextLower)
    });

    setFilteredVouchers(filteredList);

    if (searchTerm === "") {
      setFilteredVouchers(vouchers)
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
              Vouchers Manage
            </Text>

          </Flex>
          <Link href="/admin/voucher/new">
            <Button>
              <Icon
                as={MdAdd}
                width="20px"
                height="20px"
                color="inherit"
                cursor="pointer"
              />
              Add new voucher
            </Button>
          </Link>
          <Table variant="simple" color="gray.500" mb="24px"
            display={"block"} maxHeight={"400px"} overflowY={"scroll"}
          >
            <Thead>
              <Tr>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >ID</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Code</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Số lượng giảm</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    Mô tả
                  </Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Số sách cần mua</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Ngày hết hạn</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Action</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  ></Flex>
                </Th>
              </Tr>

            </Thead>

            <Tbody style={{
              overflowY: "scroll", maxHeight: "200px"
            }}>
              {
                !isLoading ?
                  filteredVouchers.map(v => (
                    <Tr>
                      <Td>{v._id}</Td>
                      <Td>{v.code}</Td>
                      <Td>{v.discount}%</Td>
                      <Td>{v.description}</Td>
                      <Td>{v.booksBought}</Td>
                      <Td>{v.expiresIn} days</Td>
                      <Td onClick={() => {
                        setSelectedVoucher(v)
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
                      <Td >
                        <Link href={`/admin/voucher/edit/${v._id}`}>
                          <Icon
                            as={MdEdit}
                            width="20px"
                            height="20px"
                            color="inherit"
                            cursor="pointer"
                          />
                        </Link>
                      </Td>
                    </Tr>
                  )) :
                  skeletons.map((_, index) => (
                    <Tr>
                      <Td><Skeleton height='10px' /></Td>
                      <Td><Skeleton height='10px' /></Td>
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
            Bạn muốn xóa voucher này?
            <div>
              {selectedVoucher?.content}
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

      <Toaster />
    </>

  );
}
