import React from "react";
import { useRouter } from "next/router";
import { Navigation } from "@shopify/polaris";
import {
  HomeMajor,
  ProductsMajor,
  IncomingMajor,
} from "@shopify/polaris-icons";

import { generateSubNav } from "@Utils/navigationUtils";

export const NavigationMarkup = ({ pageName, toggleIsLoading }) => {
  const router = useRouter();

  const navigateTo = (url) => {
    router.push(url);
    toggleIsLoading();
  };

  // TODO - Display Sub Menu without the url
  const items = [
    {
      onClick: () => navigateTo("/admin/dashboard"),
      label: "Dashboard",
      selected: pageName === "Home",
      icon: HomeMajor,
    },
    {
      onClick: () => navigateTo("/admin/product"),
      // url: "",
      label: "Products",
      icon: ProductsMajor,
      selected: true,
      subNavigationItems: generateSubNav(pageName, "products"),
    },
    {
      onClick: () => navigateTo("/admin/product/import"),
      // url: "",
      label: "Import AliExpress",
      icon: IncomingMajor,
      selected: true,
      subNavigationItems: generateSubNav(pageName, "import"),
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
