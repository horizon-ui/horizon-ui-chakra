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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getTagById } from "redux/actions/tag";
import { Toaster, toast } from "react-hot-toast";
import { updateTagByIdRequest } from "redux/saga/requests/tag";


const ModifyTag = () => {

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const params = useParams()
  const dispatch = useDispatch();
  const tag = useSelector(state => state.tags.tag)
  const isLoading = useSelector(state => state.tags.loading)
  const id = params.id;
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)


  const handleUpdateTag = async () => {
    const request = {
      name: name,
      description: description,

    }
    console.log("request:", request)
    toast.promise(
      new Promise((resolve, reject) => {
        updateTagByIdRequest(id, request)
          .then((resp) => {
            if (resp.updatedTag) {
              resolve("Cập nhật thành công!")
              console.log("resp", resp)
            }
            else {
              reject("Cập nhật thất bại!");
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

  }
  useEffect(() => {
    dispatch(getTagById(params.id))
  }, [dispatch])
  useEffect(() => {
    if (tag) {
      setName(tag.name)
      setDescription(tag.description)
    }
  }, [tag])

  return (
    <div>
      <Card direction="column" w="100%" px="0px" pb="60px">
        {!tag ? <Loading /> :
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
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Description</FormLabel>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Flex>

            <Button
              width="100px"
              colorScheme="blue"
              right="0"
              position="absolute"
              marginRight="25px"
              marginBottom="25px"
              bottom="-10px"
              onClick={handleUpdateTag}

            >
              Update
            </Button>
          </>}
      </Card>
      <Toaster />
    </div>
  );
};

export default ModifyTag;
