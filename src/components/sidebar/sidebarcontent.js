import React from "react";
import { Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

import { NavItem } from "./navitem";

const LinkItems = [
  { name: "Home", icon: FiHome, url: "/admin/dashboard" },
  { name: "Trending", icon: FiTrendingUp, url: "/admin/product" },
  { name: "Products", icon: FiCompass, url: "/admin/product" },
  { name: "Import", icon: FiStar, url: "/admin/product/import" },
  { name: "Settings", icon: FiSettings, url: "/admin/setting" },
];

export const SidebarContent = ({ onClose, ...rest }) => (
  <Box
    transition="3s ease"
    bg={useColorModeValue("white", "gray.900")}
    borderRight="1px"
    borderRightColor={useColorModeValue("gray.200", "gray.700")}
    w={{ base: "full", md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <img
        width="50px"
        src="https://pgecom.com/store/1018/main_logo.JPG"
        alt=""
      />
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>
    {LinkItems.map(({ name, icon, url }) => (
      <NavItem key={name} icon={icon} url={url}>
        {name}
      </NavItem>
    ))}
  </Box>
);
