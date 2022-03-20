import React from "react";
import numeral from "numeral";
import moment from "moment";
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  useClipboard,
} from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";

import { InfoOutlineIcon, CopyIcon } from "@chakra-ui/icons";

import { getProduct, listProducts } from "@Libs/api-product";
import SidebarWithHeader from "@Components/sidebar";

const ProductIdPage = ({ product }) => {
  console.log("product id page...", product);
  const { hasCopied, onCopy } = useClipboard(product?.productUrl);
  const { addToast } = useToasts();
  const copyUrl = () => {
    onCopy(product?.productUrl);
    if (hasCopied) {
      addToast("AliExpress Link Copied!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Box bg="white" p="10px">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded="md"
              alt="product image"
              src={product?.imageCover}
              fit="cover"
              align="center"
              w="100%"
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product?.title.slice(0, 20)}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize="2xl"
              >
                $350.00 USD
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize="2xl"
                  fontWeight="300"
                >
                  {product?.title}
                </Text>
                <Text fontSize="lg">{product?.description}</Text>
              </VStack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CopyIcon
                  onClick={() => copyUrl()}
                  _hover={{
                    cursor: "pointer",
                  }}
                />
                <Text>Click on the icon to copy the link</Text>
              </Stack>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight="500"
                  textTransform="uppercase"
                  mb="4"
                >
                  Store Info
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>{product?.followers} followers</ListItem>
                    <ListItem>
                      {product?.positiveFeedBack} positive feeback
                    </ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>{product?.storeName}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight="500"
                  textTransform="uppercase"
                  mb="4"
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Amount Sold:
                    </Text>
                    " " {product?.sold}
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="bold">
                      Total Reviews:
                    </Text>
                    " " {product?.totalReviews}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded="none"
              w="full"
              mt={8}
              size="lg"
              py="7"
              onClick={() => window.open(product?.productUrl)}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform="uppercase"
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              View On AliExpress
            </Button>

            <Stack direction="row" alignItems="center" justifyContent="center">
              <InfoOutlineIcon />
              <Text>This product is likely to be sold</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Box>
    </SidebarWithHeader>
  );
};

export async function getStaticPaths() {
  const { data } = await listProducts();
  const items = data?.listProducts?.items;

  const paths = items.map((item) => ({
    params: {
      productId: item?.productId,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const productId = params?.productId;
  const { data } = await getProduct(productId);
  const product = data?.getProduct;

  return {
    props: {
      product,
      productId,
    },
  };
}

export default ProductIdPage;
