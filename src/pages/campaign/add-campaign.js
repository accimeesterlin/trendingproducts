import React, { useState, useCallback, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  Form,
  FormLayout,
  Layout,
  Button,
  Page,
} from "@shopify/polaris";
import { MainLayout } from "@Blocks";
import { addCampaign } from "@Libs";

const AddCampaignpage = () => {
  const [CampaignName, setCampaignName] = useState("");
  const [CampaignDesc, setCampaignDesc] = useState(0);
  const [CampaignReason, setCampaignReason] = useState("");
  const { addToast } = useToasts();

  const handleSubmit = useCallback(() => {
    const Campaign = {
      CampaignName,
      CampaignDesc,
      CampaignReason,
    };

    addCampaign(Campaign)
      .then(() =>
        addToast("Campaign successfully saved!", { appearance: "success" })
      )
      .catch(() =>
        addToast("Error saving Campaign", { appearance: "success" })
      );
  });

  const handleCampaignNameChange = useCallback(
    (value) => setCampaignName(value),
    []
  );
  const handleCampaignDescChange = useCallback(
    (value) => setCampaignDesc(value),
    []
  );
  const handleCampaignReasonChange = useCallback(
    (value) => setCampaignReason(value),
    []
  );

  const skipToContentRef = useRef(null);
  const skipToContentTarget = (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );

  return (
    <MainLayout className="Campaign" pageName="Add Campaign">
      <Page title="Campaign">
        <Layout>
          {skipToContentTarget}
          <Layout.AnnotatedSection
            title="Campaign details"
            description="Provide the Campaign details"
          >
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <Layout.Section>
                  <TextField
                    value={CampaignName}
                    onChange={handleCampaignNameChange}
                    label="Campaign Name"
                    placeholder=""
                    type="text"
                  />
                </Layout.Section>

                <Layout.Section>
                  <TextField
                    value={CampaignDesc}
                    onChange={handleCampaignDescChange}
                    label="Campaign Desc"
                    placeholder=""
                    type="text"
                  />
                </Layout.Section>

                <Layout.Section>
                  <TextField
                    value={CampaignReason}
                    onChange={handleCampaignReasonChange}
                    label="Campaign Reason"
                    placeholder=""
                    type="text"
                  />
                </Layout.Section>

                <Layout.Section>
                  <Button submit>Add Campaign</Button>
                </Layout.Section>
              </FormLayout>
            </Form>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </MainLayout>
  );
};

export default AddCampaignpage;
