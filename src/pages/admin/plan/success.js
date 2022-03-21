import React, { useEffect } from "react";
import { Stack, Center, Alert, AlertIcon } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import SidebarWithHeader from "@Components/sidebar";
import { updateUser } from "@Libs/api-user";
import { useRouter } from "next/router";
import { userStore } from "@Components";
import { getUserByEmail } from "@Libs";

function SuccessPlanPage() {
  const { setUser, setIsAuthenticated } = userStore((state) => state);
  const router = useRouter();
  useEffect(async () => {
    isInitializeUser();
  }, []);

  const isInitializeUser = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const { data } = await getUserByEmail(attributes?.email);
      const currentUser = data?.userByEmail?.items[0];
      patchUser(currentUser);
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const patchUser = async (user) => {
    const userPayLoad = {
      userId: user.userId,
      email: user.email,
      phone: user.phone,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isPlanActive: true,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    try {
      const { data } = await updateUser(userPayLoad);
      const updatedUser = data?.updateUser;
      setUser(updatedUser);

      // TODO - move to dashboard once dashboard is built
      router.push("/admin/product");
    } catch (error) {
      console.log("Error updating your profile. Please contact an admin");
    }
  };

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Center>
        <Stack spacing={3}>
          <Alert status="success">
            <AlertIcon />
            Thank you for your payment. You have 14 days trial. You can cancel
            at anytime!
          </Alert>
        </Stack>
      </Center>
    </SidebarWithHeader>
  );
}

export default SuccessPlanPage;
