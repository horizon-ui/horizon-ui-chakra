import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import logobfsmall from "assets/img/black-friday/logo-bf-small.png";
import priceribbon from "assets/img/black-friday/price-ribbon.png";
import { useEffect, useRef, useState } from "react";
import { MdChevronRight } from "react-icons/md";
const Announcement = ({ date }) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef("");

  const startTimer = () => {
    const countdownDate = new Date(`${date}`);

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days < 10) {
        days = `0${days}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      // eslint-disable-next-line
      clearInterval(interval.current);
    };
  });
  return (
    <Link
      isExternal
      href="https://horizon-ui.com/campaign"
      position="absolute"
      w="100%"
      zIndex="10"
    >
      <Flex
        px={{
          base: "0px",
          xl: "unset",
        }}
        bg="radial-gradient(127.15% 100% at 47.42% 0%, #B4B0FE 0%, #363285 22.92%, #110D5B 42.71%, #050327 88.54%)"
        w="100%"
        bgPosition="center"
        h={{ base: "90px", lg: "90px" }}
        bgSize="cover"
        justify={"center"}
        items="center"
      >
        <Image
          src={logobfsmall}
          me={{ lg: "10px", xl: "45px" }}
          w={{ base: "138px", lg: "138px" }}
          h={{ base: "65px", lg: "65px" }}
          my="auto"
        />
        <SimpleGrid
          display={{ base: "none", md: "flex" }}
          maxW="max-content"
          columns={{ base: "2", md: "4" }}
          gap="10px"
          w={{ base: "335px", md: "510px", lg: "100%" }}
          my="auto"
          me={{ lg: "45px", xl: "45px" }}
        >
          <Flex
            direction="column"
            p={"8px"}
            maxW="60px"
            maxH="60px"
            textAlign="center"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="10px"
          >
            <Text
              fontSize={{ base: "20px", md: "26px" }}
              color="#fff"
              lineHeight={"100%"}
              mb="4px"
              fontWeight="800"
            >
              {timerDays}
            </Text>
            <Text
              fontSize={{ base: "6px", md: "8px" }}
              fontWeight="700"
              letterSpacing="0px"
              w="100%"
              color="#fff"
            >
              DAYS
            </Text>
          </Flex>
          <Flex
            direction="column"
            p={"8px"}
            maxW="60px"
            maxH="60px"
            textAlign="center"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="10px"
          >
            <Text
              fontSize={{ base: "20px", md: "26px" }}
              color="#fff"
              lineHeight={"100%"}
              mb="4px"
              fontWeight="800"
            >
              {timerHours}
            </Text>
            <Text
              fontSize={{ base: "6px", md: "8px" }}
              fontWeight="700"
              letterSpacing="0px"
              w="100%"
              color="#fff"
            >
              HOURS
            </Text>
          </Flex>
          <Flex
            direction="column"
            p={"8px"}
            maxW="60px"
            maxH="60px"
            textAlign="center"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="10px"
          >
            <Text
              fontSize={{ base: "20px", md: "26px" }}
              color="#fff"
              lineHeight={"100%"}
              mb="4px"
              fontWeight="800"
            >
              {timerMinutes}
            </Text>
            <Text
              fontSize={{ base: "6px", md: "8px" }}
              fontWeight="700"
              letterSpacing="0px"
              w="100%"
              color="#fff"
            >
              MINUTES
            </Text>
          </Flex>
          <Flex
            direction="column"
            p={"8px"}
            maxW="60px"
            maxH="60px"
            textAlign="center"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="10px"
          >
            <Text
              fontSize={{ base: "20px", md: "26px" }}
              color="#fff"
              lineHeight={"100%"}
              mb="4px"
              fontWeight="800"
            >
              {timerSeconds}
            </Text>
            <Text
              fontSize={{ base: "6px", md: "8px" }}
              fontWeight="700"
              letterSpacing="0px"
              w="100%"
              color="#fff"
            >
              SECONDS
            </Text>
          </Flex>
        </SimpleGrid>
        <Image
          display={{ base: "none", md: "flex" }}
          src={priceribbon}
          w={{ base: "120px", lg: "120px" }}
          mt="-3px"
          me={{ base: "0px", lg: "40px" }}
        />
        <Link isExternal href="https://horizon-ui.com/campaign" my="auto">
          <Button
            border="0.6px solid"
            borderColor="rgba(255, 255, 255, 0.25)"
            bg="rgba(255, 255, 255, 0.1)"
            py="16px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            me={{ base: "0px", md: "14px" }}
            w={{ base: "200px", md: "210px" }}
            color="white"
            _hover={{ background: "rgba(255, 255, 255, 0.18)" }}
            _active={{ background: "rgba(255, 255, 255, 0.28)" }}
            _focus={{ background: "rgba(255, 255, 255, 0.18)" }}
            h="46px"
          >
            See all Offers now
            <Icon as={MdChevronRight} color="white" h="16px" w="16px" />
          </Button>
        </Link>
      </Flex>
    </Link>
  );
};

export default Announcement;
