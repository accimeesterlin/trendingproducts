/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useCallback } from "react";
import {
  Layout,
  Page,
  ChoiceList,
  TextField,
  RangeSlider,
  Card,
  ResourceList,
  Filters,
  MediaCard,
} from "@shopify/polaris";
import { MainLayout } from "@Blocks";
import { listProducts } from "@Libs/api-product";
import { useRouter } from "next/router";

function ProductPage({ products }) {
  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const router = useRouter();

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    []
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    []
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (!isEmpty(moneySpent)) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <MainLayout className="dashboard" pageName="Add Product">
      <Page
        title="Product"
        pagination={{
          hasPrevious: true,
          hasNext: true,
          label: "Results",
          onPrevious: () => {
            console.log("Previous");
          },
          onNext: () => {
            console.log("Next");
          },
        }}
      >
        <Layout>
          {/* {skipToContentTarget} */}
          <Layout.Section
            title="Product details"
            description="List of products that are trending."
          >
            <div style={{ height: "568px" }}>
              <Card>
                <ResourceList
                  resourceName={{ singular: "customer", plural: "customers" }}
                  filterControl={
                    <Filters
                      queryValue={queryValue}
                      filters={filters}
                      appliedFilters={appliedFilters}
                      onQueryChange={handleFiltersQueryChange}
                      onQueryClear={handleQueryValueRemove}
                      onClearAll={handleFiltersClearAll}
                    />
                  }
                  items={products}
                  renderItem={(item) => {
                    const { productId, imageCover, sold, title } = item;

                    let description =
                      "Discover this great product from our tool.";
                    if (Number(sold) > 0) {
                      description += ` Over ${sold} sold on AliExpress`;
                    }

                    return (
                      <Layout.Section oneThird key={productId}>
                        <MediaCard
                          title={title.slice(0, 50)}
                          primaryAction={{
                            content: "Learn about getting started",
                            onAction: () => {},
                          }}
                          description={description}
                          popoverActions={[
                            { content: "Dismiss", onAction: () => {} },
                          ]}
                          size="small"
                        >
                          <img
                            alt=""
                            width="100%"
                            height="100%"
                            aria-labelledby="button"
                            onClick={() =>
                              router.push(`/admin/product/${productId}`)
                            }
                            onKeyPress={() =>
                              router.push(`/admin/product/${productId}`)
                            }
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            src={imageCover}
                          />
                        </MediaCard>
                      </Layout.Section>
                    );
                  }}
                />
              </Card>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </MainLayout>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case "taggedWith":
        return `Tagged with ${value}`;
      case "accountStatus":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value == null;
  }
}

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
