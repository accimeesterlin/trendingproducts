import { generateSubNav } from "@Utils/navigationUtils";
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

export const dashboard = (pageName) => ({
  url: "/dashboard",
  label: "Dashboard",
  selected: pageName === "Home",
  icon: HomeMajor,
});

export const nrt = (pageName, router) => ({
  url: "/admin/product",
  label: "Product",
  icon: ProductsMajor,
  selected: router.pathname.includes("nrt"),
  subNavigationItems: generateSubNav(pageName, "nrt"),
});

export const everi = (pageName, router) => ({
  url: "/everi/all-everi",
  label: "Everi",
  selected: router.pathname.includes("everi"),
  icon: CashDollarMajor,
  subNavigationItems: generateSubNav(pageName, "everi"),
});

export const ledger = (pageName, router, disableUpload) => ({
  url: "/ledger/all-ledger",
  label: "Ledger",
  selected: router.pathname.includes("ledger"),
  icon: UploadMajor,
  subNavigationItems: generateSubNav(pageName, "ledger", disableUpload),
});

export const organization = (pageName, router, disableUpload) => ({
  url: "/organization/all-organization",
  label: "Organization",
  selected: router.pathname.includes("organization"),
  icon: BankMajor,
  subNavigationItems: generateSubNav(pageName, "organization", disableUpload),
});

export const campaign = (pageName, router, disableUpload) => ({
  url: "/campaign/all-campaign",
  label: "Campaign",
  selected: router.pathname.includes("campaign"),
  icon: CategoriesMajor,
  subNavigationItems: generateSubNav(pageName, "campaign", disableUpload),
});

export const loyalty = (pageName, router, disableUpload) => ({
  url: "/loyalty/all-loyalty",
  label: "Loyalty",
  selected: router.pathname.includes("loyalty"),
  icon: BalanceMajor,
  subNavigationItems: generateSubNav(pageName, "loyalty", disableUpload),
});

export const property = (pageName, router, disableUpload) => ({
  url: "/property/all-property",
  label: "Property",
  selected: router.pathname.includes("property"),
  icon: InventoryMajor,
  subNavigationItems: generateSubNav(pageName, "property", disableUpload),
});

export const status = (pageName, router, disableUpload) => ({
  url: "/status/all-status",
  label: "Status",
  selected: router.pathname.includes("status"),
  icon: StoreStatusMajor,
  subNavigationItems: generateSubNav(pageName, "status", disableUpload),
});

// List of all the menu items
export const items = (pageName, router, disableUpload) => [
  dashboard(pageName),
  nrt(pageName),
  everi(pageName),
  ledger(pageName),
  organization(pageName, router, disableUpload),
  campaign,
  loyalty,
  property,
  status,
];
