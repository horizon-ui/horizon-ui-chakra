
import {
  Button,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
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
import { getBookCategories } from "redux/actions/bookCategories";

export default function DevelopmentTable() {
  const dispatch = useDispatch()
  const bookCategories = useSelector(state => state.bookCategories.bookCategories)
  const isLoading = useSelector(state => state.bookCategories.loading)

  console.log("bookCategories:", bookCategories)
  useEffect(() => {
    dispatch(getBookCategories())
  }, [dispatch])



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
      <SearchBar mx="20px" mb="10px" />
      {isLoading ? <Loading />
        : <>
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              BookCategories Manage
            </Text>
            <Link href="/#/admin/bookCategory/new">
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
                  >Tag</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Name</Flex>
                </Th>

              </Tr>

            </Thead>

            <Tbody>
              {
                bookCategories.map((bookCategory) => (
                  <Tr>
                    <Td>{bookCategory.tag}</Td>
                    <Td>{bookCategory.name}</Td>
                    <Td>
                      <Link href={`/#/admin/bookCategory/edit/${bookCategory._id}`}>
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
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>}
    </Card>

  );
}
