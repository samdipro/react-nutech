import {
  Box,
  Container,
  Flex,
  // Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import img from "../img/pic.png";

const api = "https://mock-db-nutech.onrender.com/";
const imgBbApiKey = "b1bfb232bbb29cee9086fc2935b6e86b";
export default function ProductPage() {
  const nav = useNavigate();
  const [product, setProduct] = useState();
  // const [pic, setPic] = useState(img);
  const [existingProductNames, setExistingProductNames] = useState([]);
  // console.log(product);
  // inputHandler for non-file
  function inputHandler(e) {
    const { value, id } = e.target;
    const tempAccount = { ...product };
    tempAccount[id] = value;
    setProduct(tempAccount);
  }

  // File change handler for the image input
  function fileChangeHandler(e) {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeKB = 100;

    if (file) {
      if (allowedTypes.includes(file.type)) {
        if (file.size / 1024 <= maxSizeKB) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            imgurl: file,
          }));
        } else {
          alert("File size exceeds the limit of 100KB.");
        }
      } else {
        alert("Only JPG and PNG image formats are allowed.");
      }
    }
  }

  // Add Product
  async function submit() {
    try {
      const formData = new FormData();
      formData.append("image", product.imgurl);

      // Upload image to imgBB
      const imgBbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBbApiKey}`,
        formData
      );

      // get the url
      const imgUrl = imgBbResponse.data.data.url;

      // Create a new product object with the uploaded image URL
      const newProduct = {
        ...product,
        imgurl: imgUrl,
      };

      // Post to JSON server
      // Check uniq product name
      if (existingProductNames.includes(newProduct.name)) {
        alert("Product name must be unique.");
        // You can also disable the submit button or show an error message.
        // For example, add a state to hold the form validity:
        // setFormValid(false);
      }
      // console.log(newProduct);
      // console.log(newProduct.name);
      await axios.post(api + "product", newProduct);

      alert("Product submitted successfully");
      nav("/");
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   setPic();
  // }, []);

  // Check uniq name
  useEffect(() => {
    axios.get(api + "product").then((res) => {
      const products = res.data;
      const productNames = products.map((product) => product.name);
      setExistingProductNames(productNames);
    });
  }, []);

  return (
    <Container
      maxWidth={"400px"}
      //  height={"100vh"}
      bgColor={"#9BCDD2"}
    >
      <Flex
        flexDir={"column"}
        gap={"1rem"}
        height={"100%"}
        width={"100%"}
        position={"relative"}
        paddingTop={"80px"}
        paddingBottom={"8px"}
      >
        <Box
          top={"10px"}
          marginBottom={"10px"}
          className="header"
          width={"100%"}
          bgColor={"#FFDEDE"}
          padding={".75rem 1.65rem"}
          textAlign={"center"}
          transform={"rotate(-2deg)"}
          position={"absolute"}
          cursor={"pointer"}
          boxShadow={".4rem .4rem #FF8551"}
          zIndex={"1"}
        >
          NuTech + SHOES
        </Box>
        <Flex
          flexDir={"column"}
          borderRadius={"1rem"}
          border={".5vmin solid #05060f"}
          boxShadow={".4rem .4rem #05060f"}
          bgColor={"#FAF0E4"}
          padding={"2rem"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Flex flexDir={"column"} border={"2px solid black"}>
            {/* <Image src={img}></Image> */}
            <Box> Chose Image File</Box>
            <Input
              id={"imgurl"}
              cursor={"pointer"}
              border={"none"}
              type={"file"}
              onChange={fileChangeHandler}
            ></Input>
          </Flex>
          <Flex
            flexDir={"column"}
            gap={"0.5rem"}
            padding={"1rem"}
            alignItems={"center"}
          >
            <Flex>
              <Box width={"30%"}>Nama Barang</Box>
              <Input
                width={"70%"}
                border={"2px solid black"}
                id={"name"}
                onChange={inputHandler}
              ></Input>
            </Flex>
            <Flex>
              <Box width={"30%"}>Buying Price</Box>
              <InputGroup size="sm" width={"70%"}>
                <InputLeftAddon children="Rp" />
                <Input
                  type={"number"}
                  border={"2px solid black"}
                  id={"bprice"}
                  onChange={inputHandler}
                />
                <InputRightAddon children=",-" />
              </InputGroup>
            </Flex>
            <Flex>
              <Box width={"30%"}>Selling Price</Box>
              <InputGroup size="sm" width={"70%"}>
                <InputLeftAddon children="Rp" />
                <Input
                  type={"number"}
                  border={"2px solid black"}
                  id={"sprice"}
                  onChange={inputHandler}
                />
                <InputRightAddon children=",-" />
              </InputGroup>
            </Flex>
            <Flex>
              <Box width={"30%"}>Stock</Box>
              <InputGroup size="sm" width={"40%"}>
                <InputLeftAddon children="#" />
                <Input
                  type={"number"}
                  border={"2px solid black"}
                  id={"stock"}
                  onChange={inputHandler}
                />
              </InputGroup>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"}>
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            padding={"4px"}
            w={"30%"}
            bgColor={"#FAF0E4"}
            boxShadow={".4rem .4rem #05060f"}
            cursor={"pointer"}
            _hover={{ bgColor: "white" }}
          >
            <Box onClick={submit}>Sumbit</Box>
          </Flex>
        </Flex>
        <Navbar></Navbar>
      </Flex>
    </Container>
  );
}
