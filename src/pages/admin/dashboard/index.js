import React, { useState, useEffect } from "react";
import { listProducts } from "@Libs/api-product";
import SidebarWithHeader from "@Components/sidebar";

const Dashboardpage = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    listProducts()
      .then(({ data }) => setProducts(data?.listProducts?.items))
      .catch(() => {
        // Handle fetching nrts
        // setTotalDonation(data?.listProducts.items);
      });
  }, []);

  return (
    <SidebarWithHeader className="dashboard" pageName="Home">
      <h1>I am the Dashboard Page</h1>
    </SidebarWithHeader>
  );
};

export default Dashboardpage;
