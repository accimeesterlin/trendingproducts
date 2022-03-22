import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";

const Logo = (props) => (
  <img width="120px" src="https://pgecom.com/store/1018/main_logo.JPG" alt="" />
);

const ListHeader = ({ children }) => (
  <Text fontWeight="500" fontSize="lg" mb={2}>
    {children}
  </Text>
);

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Product</ListHeader>
            <Link href="https://www.youtube.com/c/PGecomHT">Overview</Link>
            <Stack direction="row" align="center" spacing={2}>
              <Link href="#features">Features</Link>
              <Tag
                size="sm"
                bg={useColorModeValue("#010080", "#010080")}
                ml={2}
                color="white"
              >
                New
              </Tag>
            </Stack>
            <Link href="https://www.youtube.com/c/PGecomHT">Tutorials</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/signin">Releases</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link href="/aboutus">About Us</Link>
            <Link href="https://form.asana.com?k=C0BCWZqV1w5MjQmOPgM1CQ&d=1200940046299845">
              Press
            </Link>
            <Link href="https://form.asana.com?k=C0BCWZqV1w5MjQmOPgM1CQ&d=1200940046299845">
              Careers
            </Link>
            <Link href="https://form.asana.com?k=C0BCWZqV1w5MjQmOPgM1CQ&d=1200940046299845">
              Contact Us
            </Link>
            <Link href="https://form.asana.com?k=C0BCWZqV1w5MjQmOPgM1CQ&d=1200940046299845">
              Partners
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Link href="https://store.pgecom.com/policies/privacy-policy">
              Privacy Policy
            </Link>
            <Link href="https://store.pgecom.com/policies/privacy-policy">
              Terms of Service
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Follow Us</ListHeader>
            <Link href="https://facebook.com/pgecom">Facebook</Link>
            <Link href="https://twitter.com/pgecommerce">Twitter</Link>
            <Link href="https://instagram.com/pgecom">Instagram</Link>
            <Link href="https://www.linkedin.com/company/pg-ecom/?viewAsMember=true">
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align="center"
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize="sm" textAlign="center">
          © 2022 PGecom. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
