import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { editDiscountVoucherRequest, getDiscountVoucherByIdRequest } from "../../../../redux/saga/requests/voucher";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ModifyVoucher = () => {
  const params = useParams();
  const id = params.id
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [code, setCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [description, setDescription] = useState("")
  const [expiresIn, setExpiresIn] = useState(0)
  const [booksBought, setBooksBought] = useState(0)
  const [voucher, setVoucher] = useState(null)

  const handleEditVoucher = async () => {
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
          editDiscountVoucherRequest(id, request).then((resp) => {
            if (resp.message) {
              resolve(resp.message);
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

  const getVoucherData = () => {
    getDiscountVoucherByIdRequest(id).then(resp => {
      setVoucher(resp.data)
    })
  }
  useEffect(() => {
    if (voucher) {
      setCode(voucher.code)
      setDiscount(voucher.discount)
      setDescription(voucher.description)
      setExpiresIn(voucher.expiresIn)
      setBooksBought(voucher.booksBought)
    }
  }, [voucher])

  useEffect(() => {
    getVoucherData()
  }, [])


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
          onClick={handleEditVoucher}
        >
          Submit
        </Button>
      </Card>

      <Toaster />
    </div>
  );
};

export default ModifyVoucher;
