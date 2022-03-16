/* eslint-disable no-shadow */
import React, { useState, useRef, useCallback } from "react";
import {
  Loading,
  AppProvider,
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import Protected from "@Blocks/protected";
import { loadingPageMarkup } from "./loadingPageMarkup";

import { NavigationMarkup } from "./Navigation";
import { i18nPolaris } from "./i18n";
import { theme } from "./theme";
import { TopBarComponent } from "./TopBarComponent";

export const MainLayout = ({
  children,
  handleSave,
  handleDiscard,
  isDirty,
  pageName,
}) => {
  const skipToContentRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const loadingMarkup = isLoading ? <Loading /> : null;
  const pageMarkup = isLoading ? loadingPageMarkup() : children;
  const navigationItems = (
    <NavigationMarkup pageName={pageName} toggleIsLoading={toggleIsLoading} />
  );

  return (
    <Protected style={{ height: "500px" }}>
      <AppProvider theme={theme} i18n={i18nPolaris}>
        <Frame
          topBar={
            <TopBarComponent
              toggleMobileNavigationActive={toggleMobileNavigationActive}
            />
          }
          navigation={navigationItems}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
        </Frame>
      </AppProvider>
    </Protected>
  );
};
