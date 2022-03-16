import React from "react";
import { useRouter } from "next/router";
import { Navigation } from "@shopify/polaris";
import {
  HomeMajor,
  ProductsMajor,
  BalanceMajor,
  CashDollarMajor,
  CategoriesMajor,
  BankMajor,
  InventoryMajor,
  StoreStatusMajor,
  UploadMajor,
} from "@shopify/polaris-icons";

import { generateSubNav } from "@Utils/navigationUtils";

export const NavigationMarkup = ({ pageName, toggleIsLoading }) => {
  const router = useRouter();
  const disableUpload = true;

  const navigateTo = (url) => {
    router.push(url);
    toggleIsLoading();
  };

  // TODO - Display Sub Menu without the url
  const items = [
    {
      onClick: () => navigateTo("/dashboard"),
      label: "Dashboard",
      selected: pageName === "Home",
      icon: HomeMajor,
    },
    {
      onClick: () => navigateTo("/nrt/nrts"),
      // url: "",
      label: "NRT",
      icon: ProductsMajor,
      selected: true,
      subNavigationItems: generateSubNav(pageName, "nrt"),
    },
    {
      onClick: () => navigateTo("/everi/all-everi"),
      label: "Everi",
      selected: pageName.includes("everi"),
      icon: CashDollarMajor,
      subNavigationItems: generateSubNav(pageName, "everi"),
    },
    {
      onClick: () => navigateTo("/ledger/all-ledger"),
      label: "Ledger",
      selected: pageName.includes("ledger"),
      icon: UploadMajor,
      subNavigationItems: generateSubNav(pageName, "ledger", disableUpload),
    },
    {
      onClick: () => navigateTo("/organization/all-organization"),
      label: "Organization",
      selected: pageName.includes("organization"),
      icon: BankMajor,
      subNavigationItems: generateSubNav(
        pageName,
        "organization",
        disableUpload
      ),
    },
    {
      onClick: () => navigateTo("/campaign/all-campaign"),
      label: "Campaign",
      selected: pageName.includes("campaign"),
      icon: CategoriesMajor,
      subNavigationItems: generateSubNav(pageName, "campaign", disableUpload),
    },
    {
      onClick: () => navigateTo("/loyalty/all-loyalty"),
      label: "Loyalty",
      selected: pageName.includes("loyalty"),
      icon: BalanceMajor,
      subNavigationItems: generateSubNav(pageName, "loyalty", disableUpload),
    },

    {
      onClick: () => navigateTo("/property/all-property"),
      label: "Property",
      selected: pageName.includes("property"),
      icon: InventoryMajor,
      subNavigationItems: generateSubNav(pageName, "property", disableUpload),
    },

    {
      onClick: () => navigateTo("/status/all-status"),
      label: "Status",
      selected: pageName.includes("status"),
      icon: StoreStatusMajor,
      subNavigationItems: generateSubNav(pageName, "status", disableUpload),
    },
  ];
  return (
    <Navigation location={router.pathname}>
      <Navigation.Section
        rollup={{
          after: 5,
          view: "view",
          hide: "hide",
          activePath: "/",
        }}
        action={{
          onClick: () => console.log("Yes yes and yes!!"),
        }}
        items={items}
      />
    </Navigation>
  );
};
