import React, { useEffect } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { getUserByEmail } from "@Libs";
import { userStore } from "@Components/stores";
import { MobileNav } from "./mobilenav";
import { SidebarContent } from "./sidebarcontent";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, isAuthenticated, setIsAuthenticated } = userStore(
    (state) => state
  );
  const router = useRouter();

  // TODO - protect the admin route so user doesn't go there
  // itinializing the app
  useEffect(async () => {}, [user]);

  const isInitializeUser = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const { data } = await getUserByEmail(attributes?.email);
      const currentUser = data?.userByEmail?.items[0];
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error: ", error);
      setIsAuthenticated(false);
      router.push("/signin");
    }
  };

  if (!isAuthenticated || !user.isPlanActive) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
