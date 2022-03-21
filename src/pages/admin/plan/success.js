import React, { useEffect } from "react";
import { Stack, Center, Alert, AlertIcon } from "@chakra-ui/react";
import SidebarWithHeader from "@Components/sidebar";
import { updateUser } from "@Libs/api-user";
import { userStore } from "@Components";

function SuccessPlanPage() {
  const user = userStore((state) => state.user);
  useEffect(async () => {
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

    const { userId } = user;

    await updateUser(userPayLoad, userId);
  }, []);
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
