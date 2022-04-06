import React, { useState, useEffect } from "react";
import {
  FormControl,
  Box,
  FormLabel,
  Input,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { listProducts } from "@Libs/api-product";
import SidebarWithHeader from "@Components/sidebar";
import ProductCard from "@Components/product/productcard";

function ProductPage() {
  const [searchInput, setSearchInput] = useState("");
  const [nextToken, setNextToken] = useState("");

  // Loading state of the next/previous button
  const [nextLoading, setNextLoading] = useState(false);
  const [previousLoading, setPreviousLoading] = useState(false);

  // Submit
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  // Token
  const [previousToken, setPreviousToken] = useState(nextToken);

  useEffect(async () => {
    const { data } = await listProducts();

    const items = data?.listProducts.items;
    const tokenData = data?.listProducts?.nextToken;
    setProducts(items);
    setNextToken(tokenData);
  }, []);

  const nextProductList = async () => {
    try {
      setNextLoading(true);

      const { data } = await listProducts(nextToken);
      handleTokenAndProducts(data?.listProducts);
      setNextLoading(false);
    } catch (error) {
      setNextLoading(false);
      console.log("Erorr: ", error);
    }
  };

  const previousProductList = async () => {
    try {
      setPreviousLoading(true);
      const { data } = await listProducts(previousToken);
      handleTokenAndProducts(data?.listProducts);
      setPreviousLoading(false);
    } catch (error) {
      setPreviousLoading(false);
    }
  };

  const handleTokenAndProducts = ({ items, nextToken: currentToken }) => {
    setPreviousToken(nextToken);
    setNextToken(currentToken);
    setProducts(items);
  };

  const renderProductCard = () => {
    if (!products?.length) {
      return null;
    }

    return products.map((item) => (
      <ProductCard item={item} key={item?.productId} />
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const filter = {
        title: {
          contains: searchInput,
        },
      };
      const { data } = await listProducts(null, filter);
      const items = data?.productByTitle?.items;
      console.log("Items: ", items);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const renderNext = () => (
    <Box>
      <Flex justifyContent="flex-start" justifyItems="center" spacing={4}>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          variant="outline"
          color="#010080"
          isLoading={previousLoading}
          onClick={() => previousProductList()}
          m="10px"
        />
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          color="#010080"
          isLoading={nextLoading}
          variant="outline"
          m="10px"
          onClick={() => nextProductList()}
        />
      </Flex>
    </Box>
  );

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Box bg="white" p="10px">
        <FormControl>
          <FormLabel htmlFor="search-products">Search Products</FormLabel>
          <Input
            id="search-products"
            type="text"
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
          />

          <Button
            onClick={handleSubmit}
            mt={4}
            bg="#010080"
            colorScheme="teal"
            isLoading={loading}
            type="submit"
          >
            Search
          </Button>
        </FormControl>
      </Box>

      {renderNext()}

      <Box>
        <Flex flexWrap="wrap" justifyContent="space-around">
          {renderProductCard()}
        </Flex>
      </Box>

      <Center>{renderNext()}</Center>
    </SidebarWithHeader>
  );
}

export default ProductPage;
