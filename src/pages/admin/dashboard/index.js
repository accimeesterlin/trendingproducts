import React, { useState, useEffect, useCallback } from "react";

import { Page, Layout, Button, Modal } from "@shopify/polaris";
import { listProducts } from "@Libs/api-product";
import { MainLayout } from "@Blocks";
import DatesSelection from "./dates-selection";
import { NRTTable } from "./nrttable";

const Dashboardpage = () => {
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
      <Page title="List of dashboard">
        <Layout>
          <Layout.Section>
            <Modal
              large
              activator={activator}
              open={active}
              onClose={toggleActive}
              title="Products Dates"
              primaryAction={{
                content: "Apply",
                onAction: toggleActive,
              }}
              secondaryActions={[
                {
                  content: "Cancel",
                  onAction: toggleActive,
                },
              ]}
            >
              <Modal.Section>
                <DatesSelection />
              </Modal.Section>
            </Modal>
          </Layout.Section>

          <Layout.Section oneHalf>
            <NRTTable data={nrts} />
          </Layout.Section>
        </Layout>
      </Page>
    </MainLayout>
  );
};

export default Dashboardpage;
