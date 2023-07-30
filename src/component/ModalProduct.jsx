import React, { useState } from "react";
import {
  Modal,
  // ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Image,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const api = "http://localhost:5000/";

export default function ModalProduct(props) {
  // const nav = useNavigate();
  const modal = props.modal;
  const id = props.modal.id;
  async function hapus() {
    await axios.delete(api + "product/" + id);
    window.location.reload(false);
  }
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        {/* <ModalOverlay /> */}
        <ModalContent maxWidth={"350px"}>
          <ModalHeader>
            <Flex gap={"1rem"} alignItems={"center"}>
              <Text>{props.modal.name}</Text>
              {/* EDIT */}
              <ModalEdit
                isOpen={props.isOpen}
                onClose={props.onClose}
                modal={modal}
              />
              {/* EDIT */}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex maxHeight={"200px"} justifyContent={"center"}>
                <Image src={props.modal.imgurl}></Image>
              </Flex>
              <Flex gap={"1rem"}>
                <Box>Buying Price</Box>
                <Box>{props.modal.bprice}</Box>
              </Flex>
              <Flex gap={"1rem"}>
                <Box>Selling Price</Box>
                <Box>{props.modal.sprice}</Box>
              </Flex>
              <Flex gap={"1rem"}>
                <Box>Stock</Box>
                <Box>{props.modal.stock}</Box>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {/* DELETE */}
            <AlertDialogExample hapus={hapus}></AlertDialogExample>
            {/* DELETE */}
            <Button colorScheme="yellow" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function AlertDialogExample(props) {
  const secondModalDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = secondModalDisclosure;
  const cancelRef = React.useRef();

  return (
    <>
      <Button colorScheme="red" mr={3} onClick={onOpen}>
        Delete Product
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={props.hapus} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function ModalEdit(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState();

  console.log(product);
  // inputHandler
  function inputHandler(e) {
    const { value, id } = e.target;
    const tempAccount = { ...product };
    tempAccount[id] = value;
    setProduct(tempAccount);
  }

  // Edit Product
  async function edit() {
    const id = props.modal.id;
    await axios.patch(api + "product/" + id, product).then((res) => {
      alert("product edited");
      window.location.reload(false);
    });
  }

  return (
    <>
      <Button colorScheme="blue" mr={3} onClick={onOpen}>
        Edit Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {/* Modal content */}
        <ModalContent maxWidth={"350px"}>
          <ModalHeader>
            {/* Display product name here */}
            {props.modal && props.modal.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir={"column"}
              padding={"2rem"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Image src={props.modal.imgurl}></Image>
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
                    defaultValue={props.modal.name}
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
                      defaultValue={props.modal.bprice}
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
                      defaultValue={props.modal.sprice}
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
                      defaultValue={props.modal.stock}
                      onChange={inputHandler}
                    />
                  </InputGroup>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={edit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
