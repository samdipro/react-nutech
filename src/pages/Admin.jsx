import { Box, Container, Flex } from "@chakra-ui/react";

export default function Product() {
  return (
    <Container>
      <Box>Navbar</Box>
      <Box>
        <Flex>
          <Flex>
            <Box>
              Transaction
              <Flex>
                <Box>List of Orders with option to send or cancel</Box>
              </Flex>
            </Box>
          </Flex>

          <Flex>
            <Box>
              Report
              <Flex>
                <Box>Sales</Box>
                <Box>Stock</Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box>Cart</Box>
    </Container>
  );
}
