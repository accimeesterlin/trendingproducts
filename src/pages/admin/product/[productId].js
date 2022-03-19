import React, { useRef } from "react";
import numeral from "numeral";
import moment from "moment";
import { getProduct, listProducts } from "@Libs/api-product";
import SidebarWithHeader from "@Components/sidebar";

const ProductIdPage = ({ product }) => {
  console.log("product id page...", product);
  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <h1>I am the Product ID Page</h1>
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
