import { Box, Container, Flex } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Container>
      <Flex>
        <Box>Logo</Box>
        <Box>Books</Box>
        <Box>Categories</Box>
        <Box>Profile</Box>
      </Flex>
    </Container>
  );
}
