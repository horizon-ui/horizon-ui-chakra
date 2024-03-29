/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import * as type from "../../../redux/types";
import { UserAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useNavigate } from 'react-router-dom';

export function SidebarLinks(props) {
  //   Chakra color mode

  // const navigate = useNavigate();
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  const { user, logOut } = UserAuth();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const history = useHistory();
  const handleSignOut = async () => {
    try {
      await logOut();
      setAuthenticated(null);
      localStorage.removeItem("authenticated");
      localStorage.removeItem("user");
      setAuthenticated("false");
      window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }

    console.log("user", user);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            {
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight="bold"
                mx="auto"
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                pt="18px"
                pb="12px"
                key={index}
              >
                {route.name}
              </Text>
            }
            {createLinks(route.items)}
          </>
        );
      } else if (route.feature === "logout") {
        return (
          <Box className="cursor-pointer" onClick={handleSignOut}>
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeIcon
                      : textColor
                  }
                  me="18px"
                >
                  {route.icon}
                </Box>
                <Text
                  me="auto"
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : textColor
                  }
                  fontWeight={
                    activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                  }
                >
                  {route.name}
                </Text>
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={
                  activeRoute(route.path.toLowerCase())
                    ? brandColor
                    : "transparent"
                }
                borderRadius="5px"
              />
            </HStack>
          </Box>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.display == "false" ? (
              <></>
            ) : (
              <>
                {route.icon ? (
                  <Box>
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                      py="5px"
                      ps="10px"
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : textColor
                          }
                          me="18px"
                        >
                          {route.icon}
                        </Box>
                        <Text
                          me="auto"
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : textColor
                          }
                          fontWeight={
                            activeRoute(route.path.toLowerCase())
                              ? "bold"
                              : "normal"
                          }
                        >
                          {route.name}
                        </Text>
                      </Flex>
                      <Box
                        h="36px"
                        w="4px"
                        bg={
                          activeRoute(route.path.toLowerCase())
                            ? brandColor
                            : "transparent"
                        }
                        borderRadius="5px"
                      />
                    </HStack>
                  </Box>
                ) : (
                  <Box>
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                      py="5px"
                      ps="10px"
                    >
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : inactiveColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                      <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                    </HStack>
                  </Box>
                )}
              </>
            )}
          </NavLink>
        );
      }
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
