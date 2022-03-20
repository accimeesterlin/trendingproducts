/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { listProducts } from "@Libs/api-product";
import { FormControl, Box, FormLabel, Input, Flex } from "@chakra-ui/react";
import SidebarWithHeader from "@Components/sidebar";
import ProductCard from "@Components/product/productcard";

function TrendingPage({ products }) {
  const renderProductCard = () => {
    if (!products?.length) {
      return null;
    }

    return products.map((item) => <ProductCard item={item} />);
  };

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Box bg="white" p="10px">
        <FormControl>
          <FormLabel htmlFor="search-products">Search Products</FormLabel>
          <Input id="search-products" type="text" />
        </FormControl>
      </Box>

      <Box>
        <Flex flexWrap="wrap" justifyContent="space-around">
          {renderProductCard()}
        </Flex>
      </Box>
    </SidebarWithHeader>
  );
}

export async function getStaticProps() {
  const { data } = await listProducts();
  const items = data?.listProducts.items;

  return {
    props: {
      products: items || [],
    },
  };
}

export default TrendingPage;
