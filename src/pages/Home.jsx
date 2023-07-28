import { Box, Container, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { RiShoppingCartFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsFilePerson } from "react-icons/bs";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import show1 from "../img/showshoes.png";
import show2 from "../img/shoes2.png";
import show3 from "../img/shoes3.png";
import axios from "axios";
const api = "http://localhost:3001/";

export default function HomePage() {
  async function fetch() {
    await axios.get(api + "product").then((res) => {
      console.log(res.data);
    });
  }
  fetch();
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
          STORE + SHOES
        </Box>

        <Flex
          height={"50%"}
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
        </Flex>
        <Flex
          justifyContent={"start"}
          w={"100%"}
          textAlign={"center"}
          fontWeight={"bold"}
          flexWrap={"wrap"}
          gap={"1rem"}
        >
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            padding={"4px"}
            w={"30%"}
            bgColor={"#FAF0E4"}
            boxShadow={".4rem .4rem #05060f"}
          >
            <Image
              maxW={"100px"}
              src={"http://dummyimage.com/198x100.png/ff4444/ffffff"}
            ></Image>
            <Box>Title Judul</Box>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
          <Flex>
            <Icon cursor={"pointer"} as={GrCaretPrevious}></Icon>
          </Flex>
          <Flex gap={"0.5rem"}>
            <Box>1</Box>
            <Box fontWeight={"bold"} fontSize={"xl"}>
              2
            </Box>
            <Box>3</Box>
          </Flex>
          <Flex>
            <Icon cursor={"pointer"} as={GrCaretNext}></Icon>
          </Flex>
        </Flex>
        <Flex
          position={"sticky"}
          bottom={0}
          // marginBottom={"8px"}
          width={"100%"}
          // height={"50px"}
          justifyContent={"space-evenly"}
          bgColor={"#FFDEDE"}
          boxShadow={".4rem .4rem #FF8551"}
          padding={"1rem 0"}
          fontSize={"1.2rem"}
        >
          <Icon
            cursor={"pointer"}
            _hover={{ color: "#FF8551" }}
            as={RiShoppingCartFill}
          ></Icon>
          <Icon
            cursor={"pointer"}
            _hover={{ color: "#FF8551" }}
            color={"#FF8551"}
            as={SiHomeassistantcommunitystore}
          ></Icon>
          <Icon
            cursor={"pointer"}
            _hover={{ color: "#FF8551" }}
            as={BsFilePerson}
          ></Icon>
        </Flex>
      </Flex>
    </Container>
  );
}
