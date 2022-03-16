import React, { useState, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  TextStyle,
  TextField,
  Filters,
  Page,
} from "@shopify/polaris";
import { MainLayout } from "@Blocks";
import { getAllCampaign, deleteCampaignById } from "@Libs";

const AllCampaignPage = () => {
  const { addToast } = useToasts();
  const [campaign, setCampaign] = useState([]);

  const fetchAllCampaign = () => {
    getAllCampaign()
      .then((response) => {
        setCampaign(response.campaign);
      })
      .catch(() =>
        addToast("Error retrieving Campaign", { appearance: "error" })
      );
  };

  useEffect(() => fetchAllCampaign(), []);

  const [selectedItems, setSelectedItems] = useState(campaign || []);
  const [sortValue, setSortValue] = useState("DATE_MODIFIED_DESC");
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: "Campaign",
    plural: "Campaign",
  };
  const promotedBulkActions = [
    {
      content: "Edit Campaign",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];

  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete Campaign",
      onAction: () => {
        console.log("Todo: implement bulk delete");
        console.log("Selected Items: ", selectedItems);
        deleteCampaignById(selectedItems[0])
          .then(() => {
            setSelectedItems([]);
            addToast("Campaign successfully deleted", {
              appearance: "success",
            });
            fetchAllCampaign();
          })
          .catch(() =>
            addToast("Error retrieving Campaign", { appearance: "error" })
          );
      },
    },
  ];

  const filters = [
    {
      key: "taggedWith3",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith3",
          label: disambiguateLabel("taggedWith3", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{ paddingLeft: "8px" }}>
        <Button onClick={() => console.log("New filter saved")}>Save</Button>
      </div>
    </Filters>
  );

  return (
    <MainLayout className="Campaign" pageName="All Campaign">
      <Page title="All Campaign">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={campaign}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            sortValue={sortValue}
            sortOptions={[
              { label: "Newest update", value: "DATE_MODIFIED_DESC" },
              { label: "Oldest update", value: "DATE_MODIFIED_ASC" },
            ]}
            onSortChange={(selected) => {
              setSortValue(selected);
              console.log(`Sort option changed to ${selected}.`);
            }}
            filterControl={filterControl}
          />
        </Card>
      </Page>
    </MainLayout>
  );

  function renderItem(item) {
    const { CampaignID, CampaignName, CampaignDesc } = item;
    const media = <Avatar customer size="medium" name={CampaignName} />;
    const shortcutActions = CampaignID
      ? [
          {
            content: "View latest Campaign",
            url: `/Campaign/${CampaignID}`,
          },
        ]
      : null;
    return (
      <ResourceItem
        id={CampaignID}
        url={CampaignID}
        media={media}
        accessibilityLabel={`View details for ${CampaignName}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{CampaignName}</TextStyle>
        </h3>
        <div>CampaignDesc: {CampaignDesc}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith3":
        return `Tagged with ${value}`;
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
};

export default AllCampaignPage;
