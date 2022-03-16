import React, { useState, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Page } from "@shopify/polaris";
import { MainLayout } from "@Blocks";

const Campaignpage = () => {
  console.log("Campaign Page");
  return (
    <MainLayout className="dashboard" pageName="Campaign">
      <Page title="Campaign Page">
        <h1>Under Construction</h1>
      </Page>
    </MainLayout>
  );
};

export default Campaignpage;
