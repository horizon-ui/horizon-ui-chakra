import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createDiscountVoucherRequest } from "../../../../redux/saga/requests/voucher";

const NewVoucher = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [code, setCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [description, setDescription] = useState("")
  const [expiresIn, setExpiresIn] = useState(0)
  const [booksBought, setBooksBought] = useState(0)

  const handleCreateNewVoucher = async () => {
    if (code === "" || description === "") {
      toast.error("Vui lòng nhập đủ thông tin!");
    }
    if (expiresIn === 0) {
      toast.error("Vui lòng nhập ngày hết hạn!");
    }
    else {
      const request = {
        code, discount, description, expiresIn, booksBought
      };
      toast.promise(
        new Promise((resolve, reject) => {
          createDiscountVoucherRequest(request).then((resp) => {
            if (resp.message) {
              resolve("Thêm voucher thành công!");
              window.location.replace("/admin/vouchers");
            } else {
              reject(resp.error);
            }
          });
        }),
        {
          loading: "Processing...",
          success: (message) => message,
          error: (error) => error,
        }
      );

      console.log("request", request);
    }
  };


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
            New Voucher Information
          </Text>
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="200px">Code</FormLabel>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="200px">Discount</FormLabel>
          <Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="200px">Description</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="200px">Expires in</FormLabel>
          <Input type="number" value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)} />
        </Flex>

        <Flex
          mx="25px"
          my="5px"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <FormLabel w="200px">Books need to buy</FormLabel>
          <Input type="number" value={booksBought} onChange={(e) => setBooksBought(e.target.value)} />
        </Flex>
        <Button
          width="100px"
          colorScheme="blue"
          right="0"
          position="absolute"
          marginRight="25px"
          marginBottom="25px"
          bottom="-10px"
          onClick={handleCreateNewVoucher}
        >
          Submit
        </Button>
      </Card>

      <Toaster />
    </div>
  );
};

export default NewVoucher;
