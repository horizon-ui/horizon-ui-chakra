'use client';
/* eslint-disable */

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  SimpleGrid
} from '@chakra-ui/react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useEffect, useState } from 'react';

const columnHelper = createColumnHelper();

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'User', // Placeholder role
          status: index % 2 === 0 ? 'Active' : 'Inactive',
          createdAt: '2025-02-26', // Placeholder date
        }));
        setUsers(formattedData);
      })
      .catch((err) => console.error('Error fetching users:', err))
      .finally(() => setLoading(false)); // Ensures `setLoading(false)` runs regardless of success or failure
  }, []);

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => <Text color='gray.400'>ID</Text>,
      cell: (info) => <Text fontWeight='700'>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <Text color='gray.400'>NAME</Text>,
      cell: (info) => <Text fontWeight='700'>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text color='gray.400'>EMAIL</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => <Text color='gray.400'>ROLE</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Text color='gray.400'>STATUS</Text>,
      cell: (info) => (
        <Text color={info.getValue() === 'Active' ? 'green.500' : 'red.500'}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => <Text color='gray.400'>CREATED AT</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <Text textAlign="center" fontSize="xl" fontWeight="bold">Loading...</Text>;
  }
  

  return (
     <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            mb='20px'
            columns={1}
            spacing={{ base: "20px", xl: "20px" }}>
    <Card flexDirection='column' w='100%' px='0px' overflowX='scroll'>
      <Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
        <Text fontSize='22px' fontWeight='700'>User Listing Table</Text>
        <Menu />
      </Flex>
      <Box>
        <Table variant='simple' color='gray.500'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} borderColor={borderColor}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} borderColor='transparent'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
    </SimpleGrid>  
    </Box>
   
  );
}
