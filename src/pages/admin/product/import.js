import React, { useState, useCallback } from "react";
import { useToasts } from "react-toast-notifications";

import SidebarWithHeader from "@Components/sidebar";
import { createProduct, getProduct } from "@Libs/api-product";

const endpoint = "https://w8shi2rp09.execute-api.us-east-1.amazonaws.com";

const ImportProductPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const productId = url?.match(/\d+/)[0];

      const { data } = await getProduct(productId);
      if (data?.getProduct) {
        // TODO - give the user a direct link to the product
        addToast("Product successfully imported!", { appearance: "success" });
      } else {
        const { data: result } = await axios(
          `${endpoint}/aliImport-dev?aliUrl=${url}`
        );

        const {
          title,
          productPrice,
          sold,
          totalReviews,
          positiveFeedBack,
          storeName,
          followers,
          images,
          imageCover,
        } = result;

        const payload = {
          productId,
          title,
          // description,
          productPrice,
          productUrl: url,
          sold,
          totalReviews,
          positiveFeedBack,
          storeName,
          followers,
          images,
          imageCover,
        };
        await createProduct(payload);
        addToast("Product successfully imported & saved!", {
          appearance: "success",
        });
      }
      setLoading(false);
      setUrl("");
    } catch (error) {
      setLoading(false);
      addToast("Error getting product", { appearance: "error" });
    }
  });

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <h1> I am the product import page</h1>
    </SidebarWithHeader>
  );
};

/*

<Page title="Product">
        <Layout>
          {skipToContentTarget}
          <Layout.AnnotatedSection
            title="AliExpress Product URL"
            description="Please add the product url from aliexpress"
          >
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <Layout.Section>
                  <TextField
                    value={url}
                    onChange={handleUrlChange}
                    label="URL"
                    placeholder="Ex: https://www.aliexpress.com/item/4000878553948.html"
                    type="text"
                  />
                </Layout.Section>

                <Layout.Section>
                  <Button loading={loading} submit>
                    Import Product
                  </Button>
                </Layout.Section>
              </FormLayout>
            </Form>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>

*/

export default ImportProductPage;
