// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "contexts/SidebarContext";
import routes from "routes.js";

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();
  // Menu States
  const {
    isOpen: isOpenPages,
    onOpen: onOpenPages,
    onClose: onClosePages,
  } = useDisclosure();

  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();

  const {
    isOpen: isOpenApplication,
    onOpen: onOpenApplication,
    onClose: onCloseApplication,
  } = useDisclosure();

  const {
    isOpen: isOpenEcommerce,
    onOpen: onOpenEcommerce,
    onClose: onCloseEcommerce,
  } = useDisclosure();

  // Menus
  let authObject = {};
  routes.map((route) => {
    if (route.items) {
      authObject = route.items.find((link) => link.name === "Authentication");
    }
  });

  let applicationsObject = {};
  routes.map((route) => {
    if (route.items) {
      applicationsObject = route.items.find(
        (link) => link.name === "Applications"
      );
    }
  });

  let ecommerceObject = {};
  routes.map((route) => {
    if (route.items) {
      ecommerceObject = route.items.find((link) => link.name === "Ecommerce");
    }
  });

  let extraArr = [];
  routes.map((route) => {
    route.items.map((item) => {
      if (item.items && item.name === "Pages") {
        extraArr = item.items.filter((link) => !link.collapse);
      }
    });
  });

  // Chakra color mode

  const textColor = useColorModeValue("gray.700", "#fff");
  let menuBg = useColorModeValue("white", "navy.900");
  let mainText = "#fff";
  let navbarBg = "none";
  let navbarShadow = "initial";
  let bgButton = useColorModeValue("white", "navy.900");
  let colorButton = useColorModeValue("gray.700", "white");
  let navbarPosition = "absolute";

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Text fontsize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        href={`${process.env.PUBLIC_URL}/#/`}
        target='_blank'
        display='flex'
        lineHeight='100%'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        color={mainText}>
        <Stack direction='row' spacing='12px' align='center' justify='center'>
          <Box
            w='1px'
            h='20px'
            //  bg={useColorModeValue("gray.700", "white")}
          />
        </Stack>
        <Text fontsize='sm' mt='3px'>
          {logoText}
        </Text>
      </Link>
    );
    // mainText = useColorModeValue("gray.700", "gray.200");
    // navbarBg = useColorModeValue("white", "navy.800");
    // navbarShadow = useColorModeValue(
    //   "0px 7px 23px rgba(0, 0, 0, 0.05)",
    //   "none"
    // );
    // bgButton = useColorModeValue("gray.700", "white");
    // colorButton = useColorModeValue("white", "gray.700");
    // navbarPosition = "fixed";
  }

  const createPagesLinks = (routes) => {
    return routes.map((link) => {
      if (
        link.name === "Applications" ||
        link.name === "Ecommerce" ||
        link.name === "Authentication" ||
        link.name === "RTL" ||
        link.name === "Widgets" ||
        link.name === "Charts" ||
        link.name === "Alerts"
      ) {
        return;
      }
      if (link.name === "Pricing Page") {
        return (
          <Stack direction='column'>
            <Stack
              direction='row'
              spacing='6px'
              align='center'
              mb='6px'
              cursor='default'>
              <IconBox bg='blue.500' color='white' h='30px' w='30px'>
                {/* <RocketIcon color='inherit' /> */}
              </IconBox>
              <Text fontWeight='bold' fontSize='sm' color={textColor}>
                Extra
              </Text>
            </Stack>
            {createExtraLinks(extraArr)}
          </Stack>
        );
      }
      if (link.authIcon) {
        return (
          <Stack direction='column'>
            <Stack
              direction='row'
              spacing='6px'
              align='center'
              mb='6px'
              cursor='default'>
              <IconBox bg='blue.500' color='white' h='30px' w='30px'>
                {link.authIcon}
              </IconBox>
              <Text fontWeight='bold' fontSize='sm' color={textColor}>
                {link.name}
              </Text>
            </Stack>
            {createPagesLinks(link.items)}
          </Stack>
        );
      } else {
        if (link.component) {
          return (
            <NavLink to={link.layout + link.path}>
              <MenuItem
                ps='36px'
                py='0px'
                _hover={{ boxShadow: "none", bg: "none" }}
                borderRadius='12px'>
                <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                  {link.name}
                </Text>
              </MenuItem>
            </NavLink>
          );
        } else {
          return <>{createPagesLinks(link.items)}</>;
        }
      }
    });
  };

  const createExtraLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink to={link.layout + link.path}>
          <MenuItem
            ps='36px'
            py='0px'
            _hover={{ boxShadow: "none", bg: "none" }}
            borderRadius='12px'>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </MenuItem>
        </NavLink>
      );
    });
  };

  const createAuthLinks = (routes) => {
    return routes.map((link) => {
      if (link.authIcon && link.collapse === true) {
        return (
          <Stack direction='column' my='auto'>
            <Stack
              direction='row'
              spacing='0px'
              align='center'
              cursor='default'>
              <Text fontWeight='bold' fontSize='sm' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon
                as={GoChevronRight}
                color={mainText}
                w='14px'
                h='14px'
                fontWeight='2000'
              />
            </Stack>

            <Flex direction='column' bg={menuBg}>
              {createAuthLinks(link.items)}
            </Flex>
          </Stack>
        );
      } else {
        return (
          <NavLink to={link.layout + link.path}>
            <Text color='red' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });
  };

  const createApplicationLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink to={link.layout + link.path}>
          <Stack direction='row' spacing='12px' align='center' cursor='pointer'>
            <IconBox bg='blue.500' color='white' h='30px' w='30px'>
              {link.authIcon}
            </IconBox>
            <Text fontWeight='bold' fontSize='sm' color={textColor}>
              {link.name}
            </Text>
          </Stack>
        </NavLink>
      );
    });
  };

  const createEcommerceLinks = (routes) => {
    return routes.map((link) => {
      if (link.authIcon) {
        return (
          <Stack direction='column'>
            <Stack
              direction='row'
              spacing='6px'
              align='center'
              mb='6px'
              cursor='default'>
              <IconBox bg='blue.500' color='white' h='30px' w='30px'>
                {link.authIcon}
              </IconBox>
              <Text fontWeight='bold' fontSize='sm' color={textColor}>
                {link.name}
              </Text>
            </Stack>
            {createPagesLinks(link.items)}
          </Stack>
        );
      } else {
        if (link.component) {
          return (
            <NavLink to={link.layout + link.path}>
              <MenuItem
                ps='36px'
                py='0px'
                _hover={{ boxShadow: "none", bg: "none" }}
                borderRadius='12px'>
                <Text color='gray.400' fontSize='sm' fontWeight='normal'>
                  {link.name}
                </Text>
              </MenuItem>
            </NavLink>
          );
        } else {
          return <>{createPagesLinks(link.items)}</>;
        }
      }
    });
  };

  const linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }} spacing='12px'>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenPages}
        onMouseLeave={onClosePages}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Pages
        </Text>
        <Icon
          as={GoChevronDown}
          color={mainText}
          w='14px'
          h='14px'
          fontWeight='2000'
        />
        <Menu isOpen={isOpenPages}>
          <MenuList
            bg={menuBg}
            p='22px'
            minW='550px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Grid templateColumns='repeat(3, 1fr)' gap='16px'>
              {createPagesLinks(routes)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}></Text>
        <Icon
          as={GoChevronDown}
          color={mainText}
          w='14px'
          h='14px'
          fontWeight='2000'
        />
        <Menu isOpen={isOpenAuth}>
          <MenuList
            bg={menuBg}
            p='22px'
            minW='450px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Stack direction='row' spacing='24px'>
              <Flex
                direction='column'
                justify='center'
                align='center'
                // bgImage={bgCard}
                minW='200px'
                maxW='200px'
                minH='230px'
                borderRadius='15px'>
                <IconBox
                  bg='white'
                  color='white'
                  borderRadius='50%'
                  h='50px'
                  w='50px'
                  mb='12px'>
                  <Icon as={AiFillStar} w='25px' h='25px' color='blue.500' />
                </IconBox>
                <Text
                  fontSize='xl'
                  fontWeight='bold'
                  color='#fff'
                  maxW='80%'
                  textAlign='center'>
                  Explore our utilities pages
                </Text>
              </Flex>
              <SimpleGrid templateColumns='1fr' width='100%'>
                {createAuthLinks(authObject.items)}
              </SimpleGrid>
            </Stack>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenApplication}
        onMouseLeave={onCloseApplication}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Application
        </Text>
        <Icon
          as={GoChevronDown}
          color={mainText}
          w='14px'
          h='14px'
          fontWeight='2000'
        />
        <Menu isOpen={isOpenApplication}>
          <MenuList
            bg={menuBg}
            p='22px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Grid templateColumns='1fr' gap='16px'>
              {createApplicationLinks(applicationsObject.items)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenEcommerce}
        onMouseLeave={onCloseEcommerce}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Ecommerce
        </Text>
        <Icon
          as={GoChevronDown}
          color={mainText}
          w='14px'
          h='14px'
          fontWeight='2000'
        />
        <Menu isOpen={isOpenEcommerce}>
          <MenuList
            bg={menuBg}
            p='22px'
            minW='350px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Grid templateColumns='repeat(2, 1fr)' gap='16px'>
              {createEcommerceLinks(ecommerceObject.items)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top='16px'
        left='50%'
        transform='translate(-50%, 0px)'
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius='15px'
        px='16px'
        py='22px'
        mx='auto'
        width='1044px'
        maxW='90%'
        alignItems='center'
        zIndex='3'>
        <Flex w='100%' justifyContent={{ sm: "start", lg: "space-between" }}>
          {brand}
          <Box
            ms={{ base: "auto", lg: "0px" }}
            display={{ base: "flex", lg: "none" }}
            justifyContent='center'
            alignItems='center'>
            <SidebarResponsive
              logo={
                <Stack
                  direction='row'
                  spacing='12px'
                  align='center'
                  justify='center'>
                  <Box
                    w='1px'
                    h='20px'
                    bg={colorMode === "dark" ? "white" : "gray.700"}
                  />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </Box>
          {linksAuth}
          <Link href='https://www.horizon-ui.com/pro'>
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize='xs'
              variant='no-effects'
              px='30px'
              display={{
                sm: "none",
                lg: "flex",
              }}>
              Buy Now
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
