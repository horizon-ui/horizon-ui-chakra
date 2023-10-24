/* eslint-disable */
import {
  Button,
  Flex,
  Link,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdManageAccounts,
  MdEdit,
  MdRemove,
  MdRemoveCircle,
  MdRemoveCircleOutline,
  MdRemoveShoppingCart,
  MdRemoveDone,
  MdOutlineRemoveFromQueue,
  MdAdd,
} from "react-icons/md";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll" }}
      overflowY={{ sm: "scroll" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Book Manage
        </Text>
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
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
              <Th pe="10px" borderColor={borderColor}>
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                ></Flex>
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
          ))}
        </Thead>
        <Tbody>
          <Tr>
            <Td>cdsfd</Td>
            <Td>cdsfd</Td>
            <Td>cdsfd</Td>
            <Td>cdsfd</Td>
            <Td>cdsfd</Td>
            <Td>cdsfd</Td>
            <Td>
              <Link href="/book/edit">
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
        </Tbody>
      </Table>
    </Card>
  );
}
