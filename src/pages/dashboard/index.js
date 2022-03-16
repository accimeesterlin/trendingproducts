import React, { useState, useEffect, useCallback } from "react";

import { Page, Layout, Button, Modal } from "@shopify/polaris";
import { listNrts } from "@Libs/api-nrt";
import { MainLayout } from "@Blocks";
import DatesSelection from "./dates-selection";
import { NRTTable } from "./nrttable";

const Dashboardpage = () => {
  const [nrts, setNrts] = useState([]);

  useEffect(async () => {
    listNrts()
      .then(({ data }) => setNrts(data?.listNrts?.items))
      .catch((error) => {
        // Handle fetching nrts
        // setTotalDonation(data?.listNrts.items);
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
      <Page title="List of nrts">
        <Layout>
          <Layout.Section>
            <Modal
              large
              activator={activator}
              open={active}
              onClose={toggleActive}
              title="NRTs Dates"
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
