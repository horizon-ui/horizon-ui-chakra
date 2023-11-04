import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Avatar,
  Select,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Loading from "components/loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAccountById } from "redux/actions/account";

const ModifyAccount = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const params = useParams()
  const dispatch = useDispatch();
  const account = useSelector(state => state.accounts.account)
  const isLoading = useSelector(state => state.accounts.loading)
  const id = params.id;

  console.log("account:", account)
  console.log("account:", account)
  useEffect(() => {
    dispatch(getAccountById(id))
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
                Account Information
              </Text>
            </Flex>
            <Flex
              mx="25px"
              my="10px"
              justifyContent="left"
              flexDirection="row"
              alignItems="center"
            >
              <Avatar
                name="Dan Abrahmov"
                src={account.avatar}
                marginRight="20px"
              />
              <FormLabel w="auto">{account.displayName}</FormLabel>
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Email</FormLabel>
              <Input value={account.email} disabled="true" />
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Phone Number</FormLabel>
              <Input value={account.phoneNumber} />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Role</FormLabel>
              <Select value={account.role == 0 ? "User" : "Admin"}>
                <option value="0">User</option>
                <option value="1">Admin</option>
              </Select>
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Is member</FormLabel>
              <Select value={account.is_member}>
                <option value="0">True</option>
                <option value="1">False</option>
              </Select>
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Is blocked</FormLabel>
              <Select value={account.is_blocked}>
                <option value="0">True</option>
                <option value="1">False</option>
              </Select>
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

export default ModifyAccount;
