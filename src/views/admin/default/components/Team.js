// Chakra imports
import { Button, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Member from "components/card/Member.js";

// Assets
import { MdAddCircle } from "react-icons/md";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar5 from "assets/img/avatars/avatar5.png";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex alignItems='center' w='100%' mb='30px'>
        <Text color={textColor} fontSize='lg' fontWeight='700'>
          Team members
        </Text>
        <Button
          ms='auto'
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'>
          <Icon as={MdAddCircle} color={iconColor} h='24px' w='24px' />
        </Button>
      </Flex>
      <Member
        mb='17px'
        name='Adela Parkson'
        job='Creative Director'
        avatar={Avatar3}
      />
      <Member
        mb='17px'
        name='Christian Mad'
        job='Product Designer'
        avatar={Avatar2}
      />
      <Member
        name='Jason Statham'
        job='Junior Graphic Designer'
        avatar={Avatar5}
      />
    </Card>
  );
}
