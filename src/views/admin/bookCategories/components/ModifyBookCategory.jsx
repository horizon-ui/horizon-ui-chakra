import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Loading from "components/loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBookCategoryById } from "redux/actions/bookCategories";

const ModifyBookCategory = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams();
  const dispatch = useDispatch();
  const bookCategory = useSelector((state) => state.bookCategories.bookCategory);
  const isLoading = useSelector((state) => state.bookCategories.loading);
  const id = params.id;

  console.log("bookCategory:", bookCategory);
  useEffect(() => {
    dispatch(getBookCategoryById(params.id));
  }, [dispatch]);

  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        {isLoading ? (
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
                BookCategory Information
              </Text>
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Name</FormLabel>
              <Input value={bookCategory.name} />
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Description</FormLabel>
              <Input value={bookCategory.description} />
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
          </>
        )}
      </Card>
    </div>
  );
};

export default ModifyBookCategory;
