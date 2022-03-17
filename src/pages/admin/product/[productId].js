import React, { useRef } from "react";
import numeral from "numeral";
import moment from "moment";
import { Layout, MediaCard, Card, Page } from "@shopify/polaris";
import { MainLayout } from "@Blocks";
import { getProduct, listProducts } from "@Libs/api-product";

const ProductIdPage = ({ product }) => {
  const skipToContentRef = useRef(null);
  const skipToContentTarget = (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );

  return (
    <MainLayout className="dashboard" pageName="Add Product">
      <Page title="Product">
        <Layout>
          {skipToContentTarget}
          <Layout.AnnotatedSection
            title="Product Detail"
            description="Please add the product url from aliexpress"
          >
            <MediaCard
              title={product?.title.slice(0, 60)}
              primaryAction={{
                content: "View Product On AliExpress",
                onAction: () => {
                  if (product?.productUrl) {
                    window.location.href = product?.productUrl;
                  }
                },
              }}
              portrait
              description="Discover the most trending products."
              popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
              size="small"
            >
              <img
                alt=""
                width="50%"
                height="50%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={product?.imageCover}
              />
            </MediaCard>
            <Card title="Main Info">
              <Card.Section>
                <a href={product?.productUrl} target="_blank" rel="noreferrer">
                  View Store
                </a>
              </Card.Section>
              <Card.Section title="Product Information">
                <Card.Subsection>
                  <b>Amount Sold</b>: {product?.sold} quantity
                  <br />
                  <b>Found Since: </b>
                  {moment(product?.createdAt).format("MMM Do YYYY")}
                  <br />
                  <b>Total Reviews: </b>
                  {product?.totalReviews} reviews
                  <br />
                </Card.Subsection>
              </Card.Section>
              <Card.Section title="Store Information">
                <Card.Subsection>
                  <b>Name</b>: {product?.storeName}
                  <br />
                  <b>Followers</b>: {numeral(product?.followers).format("0a")}
                  <br />
                  <b>Positive Feedback</b>: {product?.positiveFeedBack}
                  <br />
                </Card.Subsection>
              </Card.Section>

              <Card.Section>
                <Card.Subsection>
                  FeedBack: This product is likely to be sold
                </Card.Subsection>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </MainLayout>
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
