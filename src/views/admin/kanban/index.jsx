/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import "assets/css/Plugins.css";
import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Flex,
  Icon,
  FormControl,
  IconButton,
  Image,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { MdEdit } from "react-icons/md";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import kanban1 from "assets/img/applications/kanban1.png";
import kanban2 from "assets/img/applications/kanban2.png";
import {
  kanbanRenderThumb,
  kanbanRenderTrack,
  kanbanRenderView,
} from "components/scrollbar/Scrollbar";
import React, { useState, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

function Kanban() {
  // Kanban Settings, states, etc.
  let initialBoard = {
    counter: 9,
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1.1,
            title: 'Option to "use local/server version" feature',
            desc: "It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.",
            status: "UPDATES",
            members: [avatar2, avatar3],
          },
          {
            id: 1.2,
            image: kanban1,
            members: [avatar2, avatar3, avatar4],
            status: "PENDING",
            title: "Add/modify your own CSS-Selectors",
            desc: "Website Design: The ability to add/modify your own CSS-Selectors like its done in Venus.",
            attachements: "3",
          },
          {
            id: 1.3,
            title: "Shortcode for templates to display correctly",
            members: [avatar2],
            desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
            status: "ERRORS",
          },
        ],
      },
      {
        id: 2,
        title: "In progress",
        cards: [
          {
            id: 2.1,
            title: "General ideas to improve 'Edit' workflow",
            desc: "Currently, I have a few templates in the Local Library and when I want to add them I'm always presented (by default).",
            members: [avatar2, avatar3, avatar4],
            status: "PENDING",
            attachements: "2",
          },
          {
            id: 2.2,
            title: "Shortcode for templates to display correctly",
            desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
            status: "UPDATES",
            members: [avatar2],
          },
          {
            id: 2.3,
            image: kanban2,
            members: [avatar2, avatar3],
            status: "ERRORS",
            title: "[UX Design] - Set the default Library tab",
            desc: "I want to be able to set the default Library tab (or a way to remember the last active tab), especially when I already...",
          },
        ],
      },
      {
        id: 3,
        title: "Done",
        cards: [
          {
            id: 3.1,
            title: "Copy/Paste elements between pages",
            desc: "We can only copy/paste elements (or group of elements) in the same page, which is quite limited.",
            status: "DONE",
            members: [avatar2],
          },
          {
            id: 3.2,
            title: "Remove Extra DIV for each container added",
            desc: "I still hope there won't have an extra div for each container we added. It should be something for better styling...",
            status: "DONE",
            members: [avatar2, avatar3, avatar4],
          },
          {
            id: 3.3,
            title: "Add Figma files for the Library design blocks",
            desc: "I want to present my clients the Figma files first, so it would be great if you add those as well, more manual downloads...",
            status: "DONE",
            members: [avatar2, avatar3],
          },
        ],
      },
    ],
  };
  const [board, setBoard] = useState(initialBoard);
  function onCardNew(newCard) {
    const newCardLocal = { id: initialBoard.counter + 1, ...newCard };
    initialBoard.counter = initialBoard.counter + 1;
    setBoard(initialBoard);
    return newCardLocal;
  }
  const kanbanFormA = useRef(null);
  const cardInputA = useRef(null);
  const kanbanFormB = useRef(null);
  const cardInputB = useRef(null);
  const kanbanFormC = useRef(null);
  const cardInputC = useRef(null);

  // Chakra color mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "transparent"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const brandText = useColorModeValue("brand.500", "white");
  const kanbanCardBg = useColorModeValue("white", "navy.700");

  return (
    <Flex
      direction='column'
      minH='100vh'
      align='center'
      pt={{ sm: "125px", lg: "75px" }}
      overflow='hidden'>
      <Flex maxWidth='100%'>
        <Scrollbars
          autoHide
          renderTrackHorizontal={kanbanRenderTrack}
          renderThumbHorizontal={kanbanRenderThumb}
          renderView={kanbanRenderView}>
          <Board
            initialBoard={board}
            allowAddCard
            onNewCardConfirm={onCardNew}
            onCardNew={console.log}
            renderColumnHeader={function ({ title, id }, { addCard }) {
              function kanbanFormOpenA() {
                kanbanFormA.current.style.display = "flex";
                console.log(id);
              }
              function kanbanFormCloseA() {
                kanbanFormA.current.style.display = "none";
              }
              function formSubmitA() {
                addCard({ title: cardInputA.current.value });
                cardInputA.current.value = "";
              }
              function kanbanFormOpenB() {
                kanbanFormB.current.style.display = "flex";
              }
              function kanbanFormCloseB() {
                kanbanFormB.current.style.display = "none";
              }
              function formSubmitB() {
                addCard({ title: cardInputB.current.value });
                cardInputB.current.value = "";
              }
              function kanbanFormOpenC() {
                kanbanFormC.current.style.display = "flex";
              }
              function kanbanFormCloseC() {
                kanbanFormC.current.style.display = "none";
              }
              function formSubmitC() {
                addCard({ title: cardInputC.current.value });
                cardInputC.current.value = "";
              }
              return (
                <Flex
                  key={id}
                  flexDirection='column'
                  mb='7px'
                  fontWeight='bold'
                  w='100%'>
                  <Flex justify='space-between' align='center' mb='24px'>
                    <Text fontSize='22px' mt='5px' color={textColor}>
                      {title}
                    </Text>
                    <IconButton
                      w='92px'
                      h='35px'
                      borderRadius='12px'
                      aria-label='Search database'
                      variant='no-hover'
                      bg={bgButton}
                      icon={<AddIcon w='12px' h='12px' color={brandText} />}
                      onClick={
                        id === 1
                          ? kanbanFormOpenA
                          : id === 2
                          ? kanbanFormOpenB
                          : id === 3
                          ? kanbanFormOpenC
                          : null
                      }
                    />
                  </Flex>
                  <Flex
                    flexDirection='column'
                    ref={
                      id === 1
                        ? kanbanFormA
                        : id === 2
                        ? kanbanFormB
                        : id === 3
                        ? kanbanFormC
                        : null
                    }
                    display='none'>
                    <FormControl>
                      <Input
                        ref={
                          id === 1
                            ? cardInputA
                            : id === 2
                            ? cardInputB
                            : id === 3
                            ? cardInputC
                            : null
                        }
                        borderRadius='15px'
                        mb='20px'
                        variant='main'
                      />
                      <Flex>
                        <Button
                          variant='brand'
                          me='14px'
                          onClick={
                            id === 1
                              ? formSubmitA
                              : id === 2
                              ? formSubmitB
                              : id === 3
                              ? formSubmitC
                              : null
                          }>
                          Add Card
                        </Button>
                        <Button
                          variant='no-hover'
                          bg={bgButton}
                          onClick={
                            id === 1
                              ? kanbanFormCloseA
                              : id === 2
                              ? kanbanFormCloseB
                              : id === 3
                              ? kanbanFormCloseC
                              : null
                          }>
                          Cancel
                        </Button>
                      </Flex>
                    </FormControl>
                  </Flex>
                </Flex>
              );
            }}
            renderCard={(
              { image, title, desc, status, members, id },
              { dragging }
            ) => (
              <Flex
                key={id}
                boxShadow={shadow}
                mt='10px'
                dragging={dragging}
                flexDirection='column'
                bg={kanbanCardBg}
                p='25px'
                borderRadius='15px'
                w='470px'>
                <Flex align='center' mb='20px'>
                  <Text fontWeight='700' fontSize='lg' color={textColor}>
                    {title}
                  </Text>
                  <Flex
                    ms='auto'
                    cursor='pointer'
                    h='max-content'
                    w='max-content'>
                    <Icon
                      color='secondaryGray.500'
                      as={MdEdit}
                      w='17px'
                      h='17px'
                    />
                  </Flex>
                </Flex>
                {image ? (
                  <Image
                    borderRadius='15px'
                    w='420px'
                    h='284px'
                    src={image}
                    mb='20px'
                  />
                ) : null}
                <Text fontSize='md' color={textColorSecondary}>
                  {desc}
                </Text>
                <Flex w='100%' mt='20px' align='center'>
                  {members ? (
                    <AvatarGroup size='sm'>
                      <Avatar src={avatar2} />
                      <Avatar src={avatar3} />
                      <Avatar src={avatar4} />
                    </AvatarGroup>
                  ) : null}
                  {status ? (
                    <Badge
                      fontSize='10px'
                      fontWeight='bold'
                      variant='solid'
                      h='28px'
                      w='94px'
                      ms='auto'
                      display='flex'
                      borderRadius='8px'
                      alignItems='center'
                      justifyContent='center'
                      bg={
                        status === "ERRORS"
                          ? "red.500"
                          : status === "PENDING"
                          ? "orange.300"
                          : status === "DONE"
                          ? "green.500"
                          : status === "UPDATES"
                          ? "blue.400"
                          : "teal"
                      }
                      colorScheme={
                        status === "ERRORS"
                          ? "red"
                          : status === "PENDING"
                          ? "orange"
                          : status === "DONE"
                          ? "green"
                          : status === "UPDATES"
                          ? "blue"
                          : "teal"
                      }>
                      {status}
                    </Badge>
                  ) : null}
                </Flex>
              </Flex>
            )}
          />
        </Scrollbars>
      </Flex>
    </Flex>
  );
}

export default Kanban;
