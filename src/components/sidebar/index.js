import React, { useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import Protected from "@Blocks/protected";
import { Auth } from "aws-amplify";
import { getUserByEmail } from "@Libs";
import { userStore } from "@Components/stores";
import { MobileNav } from "./mobilenav";
import { SidebarContent } from "./sidebarcontent";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUser, isInit, setIsInit } = userStore((state) => state);

  // TODO - protect the admin route so user doesn't go there

  // itinializing the app
  useEffect(async () => {
    if (!isInit) {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const { data } = await getUserByEmail(attributes?.email);
      const currentUser = data?.userByEmail?.items[0];
      setUser(currentUser);
      setIsInit(true);
    }
  }, []);
  return (
    <Protected>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </Protected>
  );
}
