import React, { useState, useEffect, useCallback } from "react";

import { Page, Layout, Button, Modal } from "@shopify/polaris";
import { listProducts } from "@Libs/api-product";
import { MainLayout } from "@Blocks";

const ProductPage = () => {
  const [nrts, setNrts] = useState([]);

  useEffect(async () => {
    listProducts()
      .then(({ data }) => setNrts(data?.listProducts?.items))
      .catch((error) => {
        // Handle fetching nrts
        // setTotalDonation(data?.listProducts.items);
      });
  }, []);
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(
    () => setActive((activeItem) => !activeItem),
    []
  );

  const activator = (
    <Layout.Section>
      <Button onClick={toggleActive}>Today</Button>
    </Layout.Section>
  );

  return (
    <MainLayout className="dashboard" pageName="Home">
      <Page title="List of products">
        <Layout>
          <Layout.Section oneHalf>
            <h1>Hello World!!</h1>
          </Layout.Section>
        </Layout>
      </Page>
    </MainLayout>
  );
};

export default ProductPage;
