import { generateSubNav } from "@Utils/navigationUtils";
import { HomeMajor, ProductsMajor } from "@shopify/polaris-icons";

export const dashboard = (pageName) => ({
  url: "/admin/dashboard",
  label: "Dashboard",
  selected: pageName === "Home",
  icon: HomeMajor,
});

export const product = (pageName, router) => ({
  url: "/admin/product",
  label: "Product",
  icon: ProductsMajor,
  selected: router.pathname.includes("nrt"),
  subNavigationItems: generateSubNav(pageName, "nrt"),
});

// List of all the menu items
export const items = (pageName, router, disableUpload) => [
  dashboard(pageName),
  product(pageName, router),
];
