import React from "react";
import { TopBar } from "@shopify/polaris";

export const topBarMarkup = ({
  userMenuMarkup,
  searchActive,
  searchFieldMarkup,
  searchResultsMarkup,
  handleSearchResultsDismiss,
  toggleMobileNavigationActive,
}) => (
  <TopBar
    showNavigationToggle
    userMenu={userMenuMarkup}
    searchResultsVisible={searchActive}
    searchField={searchFieldMarkup}
    searchResults={searchResultsMarkup}
    onSearchResultsDismiss={handleSearchResultsDismiss}
    onNavigationToggle={toggleMobileNavigationActive}
  />
);
