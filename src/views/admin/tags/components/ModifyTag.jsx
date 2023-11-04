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
import { getTagById } from "redux/actions/tag";

const ModifyTag = () => {

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams()
  const dispatch = useDispatch();
  const tag = useSelector(state => state.tags.tag)
  const isLoading = useSelector(state => state.tags.loading)
  const id = params.id;

  console.log("tag:", tag)
  useEffect(() => {

    dispatch(getTagById(params.id))
  }, [dispatch])

  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        {isLoading ? <Loading /> :
          <>
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                Tag Information
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
              <Input value={tag.name} />
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Description</FormLabel>
              <Input value={tag.description} />
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
          </>}
      </Card>
    </div>
  );
};

export default ModifyTag;
