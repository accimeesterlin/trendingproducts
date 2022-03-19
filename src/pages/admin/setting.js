/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useCallback } from "react";
import { listProducts } from "@Libs/api-product";
import { useRouter } from "next/router";
import SidebarWithHeader from "@Components/sidebar";

function ProductPage({ products }) {
  const router = useRouter();
  console.log("product search page...");
  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <h1>I am the settings page</h1>
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

export default ProductPage;
