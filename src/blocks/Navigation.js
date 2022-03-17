import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { Navigation } from "@shopify/polaris";
import {
  HomeMajor,
  ProductsMajor,
  IncomingMajor,
} from "@shopify/polaris-icons";
import { getUserByEmail } from "@Libs/api-user";

import { generateSubNav } from "@Utils/navigationUtils";

export const NavigationMarkup = ({ pageName, toggleIsLoading }) => {
  const [role, setRole] = useState("user");
  const router = useRouter();

  const navigateTo = (url) => {
    router.push(url);
    toggleIsLoading();
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const email = currentUser?.attributes?.email;

      // const { data } = await getUser(email);

      console.log("User: ", await getUserByEmail(email));
    } catch (error) {}
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
  ];

  if (role === "user") {
    items.push({
      onClick: () => navigateTo("/admin/product/import"),
      label: "Import AliExpress",
      icon: IncomingMajor,
      selected: true,
      subNavigationItems: generateSubNav(pageName, "import"),
    });
  }
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
