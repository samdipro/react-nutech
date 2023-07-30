import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import show1 from "../img/showshoes.png";
import show2 from "../img/shoes2.png";
import show3 from "../img/shoes3.png";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";
import ModalProduct from "../component/ModalProduct";
const api = "http://localhost:5000/";

export default function HomePage() {
  // modal product details
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState({});
  // const [page, setPage] = useState(1);

  // product state
  const [product, setProduct] = useState([]);

  // GET
  async function fetch(page) {
    console.log(page);
    await axios
      .get(api + "product", {
        // params: { _limit: 3, _page: page },
      })
      .then((res) => {
        // console.log(res.headers["x-total-count"]);
        // let total = Math.ceil(res.headers["x-total-count"] / 2);
        // if (total >= page && page > 0) {
        //   setProduct(res.data);
        // } else if (page) {
        //   page--;
        // } else {
        //   page = 1;
        // }
        setProduct(res.data);
      });
  }

  // Did Mount
  useEffect(() => {
    fetch();
  }, []);

  const showing = [
    <Box>
      <Box>NEW This Month</Box>
      <Image src={show1}></Image>
      <Box fontWeight={"bold"}>R3T Funky</Box>
    </Box>,
    <Box>
      <Box>Hiker Favorite</Box>
      <Image src={show2}></Image>
      <Box fontWeight={"bold"}>R4T Track</Box>
    </Box>,
    <Box>
      <Box>Calssic Sport</Box>
      <Image src={show3}></Image>
      <Box fontWeight={"bold"}>R5T Speed</Box>
    </Box>,
  ];

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
          // height={"50%"}
          borderRadius={"1rem"}
          border={".5vmin solid #05060f"}
          boxShadow={".4rem .4rem #05060f"}
          bgColor={"#FAF0E4"}
          flexDir={"column"}
          padding={"2rem"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          {/* Carousel */}
          <Box>
            <Carousel showThumbs={false} showIndicators={false}>
              {showing.map((val) => val)}
            </Carousel>
          </Box>
          {/* Carousel */}
        </Flex>
        <Flex
          justifyContent={"start"}
          w={"100%"}
          textAlign={"center"}
          fontWeight={"bold"}
          flexWrap={"wrap"}
          gap={"1rem"}
        >
          {product.map((val, idx) => {
            return (
              <>
                <Flex
                  flexDir={"column"}
                  alignItems={"center"}
                  padding={"4px"}
                  w={"30%"}
                  bgColor={"#FAF0E4"}
                  boxShadow={".4rem .4rem #05060f"}
                  justifyContent={"space-evenly"}
                  onClick={() => {
                    onOpen();
                    setModal(val);
                  }}
                  cursor={"pointer"}
                >
                  <Image maxW={"100px"} src={val.imgurl}></Image>
                  <Box>{val.name}</Box>
                </Flex>
                <ModalProduct
                  modal={modal}
                  isOpen={isOpen}
                  onClose={onClose}
                ></ModalProduct>
              </>
            );
          })}
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
          <Flex>
            <Icon
              cursor={"pointer"}
              as={GrCaretPrevious}
              id={"minus"}
              // onClick={async () => {
              //   const p = await fetch(page - 1);
              //   return setPage(p);
              // }}
            ></Icon>
          </Flex>
          <Flex gap={"0.5rem"}>
            <Box fontWeight={"bold"} fontSize={"xl"}>
              {/* {page} */}
              page:
            </Box>
          </Flex>
          <Flex>
            <Icon
              cursor={"pointer"}
              as={GrCaretNext}
              id={"plus"}
              // onClick={async () => {
              //   const p = await fetch(page + 1);
              //   return setPage(p);
              // }}
            ></Icon>
          </Flex>
        </Flex>
        {/* import Navbar Component */}
        <Navbar></Navbar>
        {/* import Navbar Component*/}
      </Flex>
    </Container>
  );
}
