import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdAssignmentAdd } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsFilePerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  return (
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
        as={MdAssignmentAdd}
        onClick={() => nav("/product")}
      ></Icon>
      <Icon
        cursor={"pointer"}
        _hover={{ color: "#FF8551" }}
        // color={"#FF8551"}
        as={SiHomeassistantcommunitystore}
        onClick={() => nav("/")}
      ></Icon>
      <Flex>
        <Menu>
          <MenuButton _hover={{ color: "#FF8551" }}>
            <Icon cursor={"pointer"} as={BsFilePerson}></Icon>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Icon as={GrLogout}></Icon>Logout
            </MenuItem>
            <MenuItem>
              <Icon as={BsFilePerson}></Icon>Profile
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
