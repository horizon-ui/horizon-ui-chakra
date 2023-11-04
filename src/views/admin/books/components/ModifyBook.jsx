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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAccountById } from "redux/actions/account";
import { getBookById } from "redux/actions/book";

const ModifyBook = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const params = useParams()
  const dispatch = useDispatch();
  const book = useSelector(state => state.books.book)
  const isLoading = useSelector(state => state.books.loading)
  const id = params.id;

  console.log("book:", book)

  useEffect(() => {
    dispatch(getBookById(id))
  }, [dispatch])

  return (
    <div>
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
          <Input value={book.name} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Author</FormLabel>
          <Input value={book.author} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Image</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Intro</FormLabel>
          <Textarea value={book.intro} height={200} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">pdf</FormLabel>
          <Input value="" />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">audio</FormLabel>
          <Input value="" />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total pages</FormLabel>
          <Input value={book.totalPages} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total read</FormLabel>
          <Input value={book.totalRead} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total saved</FormLabel>
          <Input value={book.totalSaved} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Total hearted</FormLabel>
          <Input value={book.totalHearted} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Rating</FormLabel>
          <Input value={book.rating} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Tags</FormLabel>
          <Input value={book.tags} disabled={true} />
          <Button>Add new tag</Button>
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Access level</FormLabel>
          <Select value={book.accessLevel}>
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

        <Button
          width="100px"
          colorScheme="blue"
          right="0"
          position="absolute"
          marginRight="25px"
          marginBottom="25px"
          bottom="-10px"
        >
          Update
        </Button>
      </Card>
    </div>
  );
};

export default ModifyBook;
