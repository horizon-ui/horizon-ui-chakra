// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
export default function HeaderLinks(props) {
  const { secondary } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}>
      <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me='10px'
        borderRadius='30px'
      />
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'>
        <Flex
          align='center'
          justify='center'
          bg={ethBox}
          h='29px'
          w='29px'
          borderRadius='30px'
          me='7px'>
          <Icon color={ethColor} w='9px' h='14px' as={FaEthereum} />
        </Flex>
        <Text
          w='max-content'
          color={ethColor}
          fontSize='sm'
          fontWeight='700'
          me='6px'>
          1,924
          <Text as='span' display={{ base: "none", md: "unset" }}>
            {" "}
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p='0px'>
          <Icon
            mt='6px'
            as={MdNotificationsNone}
            color={navbarIcon}
            w='18px'
            h='18px'
            me='10px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}>
          <Flex jusitfy='space-between' w='100%' mb='20px'>
            <Text fontSize='md' fontWeight='600' color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize='sm'
              fontWeight='500'
              color={textColorBrand}
              ms='auto'
              cursor='pointer'>
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection='column'>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px='0'
              borderRadius='8px'
              mb='10px'>
              <ItemContent info='Horizon UI Dashboard PRO' aName='Alicia' />
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px='0'
              borderRadius='8px'
              mb='10px'>
              <ItemContent
                info='Horizon Design System Free'
                aName='Josh Henry'
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton p='0px'>
          <Icon
            mt='6px'
            as={MdInfoOutline}
            color={navbarIcon}
            w='18px'
            h='18px'
            me='10px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          me={{ base: "30px", md: "unset" }}
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}>
          <Image src={navImage} borderRadius='16px' mb='28px' />
          <Flex flexDirection='column'>
            <Link w='100%' href='https://horizon-ui.com/pro'>
              <Button w='100%' h='44px' mb='10px' variant='brand'>
                Buy Horizon UI PRO
              </Button>
            </Link>
            <Link
              w='100%'
              href='https://horizon-ui.com/documentation/docs/introduction'>
              <Button
                w='100%'
                h='44px'
                mb='10px'
                border='1px solid'
                bg='transparent'
                borderColor={borderButton}>
                See Documentation
              </Button>
            </Link>
            <Link
              w='100%'
              href='https://github.com/horizon-ui/horizon-ui-chakra'>
              <Button
                w='100%'
                h='44px'
                variant='no-hover'
                color={textColor}
                bg='transparent'>
                Try Horizon Free
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      <ThemeEditor navbarIcon={navbarIcon} /> 

      <Menu>
        <MenuButton p='0px'>
          <Avatar
            _hover={{ cursor: "pointer" }}
            color='white'
            name='Adela Parkson'
            bg='#11047A'
            size='sm'
            w='40px'
            h='40px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'>
          <Flex w='100%' mb='0px'>
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}>
              👋&nbsp; Hey, Adela
            </Text>
          </Flex>
          <Flex flexDirection='column' p='10px'>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius='8px'
              px='14px'>
              <Text fontSize='sm'>Profile Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius='8px'
              px='14px'>
              <Text fontSize='sm'>Newsletter Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color='red.400'
              borderRadius='8px'
              px='14px'>
              <Text fontSize='sm'>Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
