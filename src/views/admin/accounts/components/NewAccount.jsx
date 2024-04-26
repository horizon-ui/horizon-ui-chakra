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
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createAccountRequest } from "../../../../redux/saga/requests/account";


const NewAccount = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [role, setRole] = useState(0)

  const handleAddNewAccount = async () => {
    if (email === "" || username === "" || displayName === "" || password === "" || retypePassword === "") {
      toast.error("Vui lòng nhập đủ thông tin!")
    }
    else if (password !== retypePassword) {
      toast.error("Mật khẩu không khớp!")
    }
    else {
      const request = {
        email, username, displayName, phoneNumber, password, role
      }
      console.log("request", request)
      toast.promise(
        new Promise((resolve, reject) => {
          createAccountRequest(request)
            .then((resp) => {
              console.log("resp", resp.error)
              console.log("resp", resp.message)
              if (resp.error) {
                console.log("vao error")
                alert(resp.message)
              }
              else {
                console.log("vao thanh cong")
                resolve("Tạo tài khoản thành công!")
              }

            })
            .catch(err => {
              reject(err)

            })

        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    }
  }
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
            New Account Information
          </Text>
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Display name</FormLabel>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Phone Number</FormLabel>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Flex>
        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Retype Password</FormLabel>
          <Input type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="150px">Role</FormLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="0">Customer</option>
            <option value="1">Admin</option>
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
          onClick={handleAddNewAccount}
        >
          Update
        </Button>
      </Card>
      <Toaster />
    </div>
  );
};

export default NewAccount;
