import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { UserAuth } from "contexts/AuthContext";
import { useDispatch } from "react-redux";
import { createAccountRequest } from "../../../redux/saga/requests/account";
import { getCurrentAccountRequest } from "../../../redux/saga/requests/account";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toast, { Toaster } from "react-hot-toast";
import { loginAccountRequest } from "../../../redux/saga/requests/account";

function SignIn() {
  const history = useHistory();
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const { user, googleSignIn } = UserAuth();
  const [authenticated, setAuthenticated] = useState(null)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  async function handleSignInGoogle() {
    try {
      const googleLogin = await googleSignIn()

    }
    catch (err) {
      toast(err, {
        autoClose: 2000,
        type: "error",
      });
      console.log("err:", err)
    }

  }
  const handleSignInKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleSignIn()
    }
  }

  const handleSignIn = () => {

    if (username == "" || password == "") {
      toast.error("Vui lòng nhập đủ thông tin!", {
        duration: 2000, position: 'top-center',
      })
    }
    else {
      const account = {
        username: username,
        password: password
      }
      toast.promise(
        new Promise((resolve, reject) => {
          loginAccountRequest(account)
            .then((resp) => {
              if (resp.message) {
                // Kiểm tra account có bị khóa không
                if (resp.user.is_blocked) {
                  reject(new Error("Tài khoản này đã bị khóa!"));

                }
                // trường hợp account không bị khóa
                else {
                  //  trường hợp account là admin
                  if (resp.user.role) {
                    if (resp.user.role === 1) {
                      resolve("Đăng nhập thành công!");
                      localStorage.setItem("authenticated", true);
                      localStorage.setItem("user", JSON.stringify({
                        _id: resp.user._id,
                        username: resp.user.username,
                        email: resp.user.email,
                        displayName: resp.user.displayName,
                        phoneNumber: resp.user.phoneNumber,
                        avatar: resp.user.avatar
                      }));
                      history.push('/')
                      localStorage.setItem("authenticated", true);
                    }
                    else {
                      toast.error("Account role is not admin!")

                    }
                  }
                }
              }
              else {
                console.log("resp:", resp)
                reject(resp.error);
              }
            })
        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error,
        }
      );

    }
  }
  const getUserInfo = useCallback(() => {
    if (user) {
      let newAccount = {
        email: user.email,
        displayName: user.displayName,
        avatar: user.photoURL,
      };
      createAccountRequest(newAccount)
        .then(() => {
          getCurrentAccountRequest(newAccount)
            .then(res => {
              if (res.account.role) {
                if (res.account.role === 1) {
                  localStorage.setItem("user", JSON.stringify(res.account))
                  localStorage.setItem("authenticated", true);
                  setAuthenticated(localStorage.getItem("authenticated"))
                  toast.success("Login successfully!")
                }
                else {
                  toast.error("Account role is not admin!")

                }
              }
              else {
                toast.error("Account role is not admin!")
              }
            })
            .catch((err) => console.log("err", err))
        })
    }
  }, [user])

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("authenticated"))) {
  //     window.location.replace('/')
  //   }

  // }, [])

  useEffect(() => {
    getUserInfo()
  }, [user])

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto' onClick={() => handleSignIn()}>
          <Heading color={textColor} fontSize='36px' mb='10px' onClick={handleSignIn}>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            onClick={() => handleSignInGoogle()}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'
            >
              Username<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={password}
                onChange={e => setPassword(e.target.value)} onKeyPress={(e) => handleSignInKeyPressed(e)}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel> 
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>  */}
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={handleSignIn}>
              Sign In
            </Button>
          </FormControl>
          {/* <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
      <Toaster />
    </DefaultAuth >
  );
}

export default SignIn;
