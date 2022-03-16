import React, { useRef } from "react";
import { Layout, MediaCard, Page } from "@shopify/polaris";
import { MainLayout } from "@Blocks";
import { listProducts } from "@Libs/api-product";

const ProductPage = ({ products }) => {
  const skipToContentRef = useRef(null);
  const skipToContentTarget = (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );

  const renderCard = (data) =>
    data.map(({ title, imageCover, productId }) => (
      <MediaCard
        key={productId}
        title={title}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "cover", objectPosition: "center" }}
          src={imageCover}
        />
      </MediaCard>
    ));

  return (
    <MainLayout className="dashboard" pageName="Add Product">
      <Page title="Product">
        <Layout>
          {skipToContentTarget}
          <Layout.AnnotatedSection
            title="Product details"
            description="List of products that are trending."
          >
            {renderCard(products)}
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </MainLayout>
  );
};

export async function getStaticProps() {
  const { data } = await listProducts();
  const items = data?.listProducts.items;
  console.log("Data: ", items);

  return {
    props: {
      products: items || [],
    },
  };
}

export default ProductPage;
