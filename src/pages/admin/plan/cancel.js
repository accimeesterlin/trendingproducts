import React, { useEffect } from "react";
import { Stack, Center, Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SidebarWithHeader from "@Components/sidebar";

function CancelPlanPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/admin/plan/checkout");
    }, 2000);
  }, []);
  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Center>
        <Stack spacing={3}>
          <Alert status="error">
            <AlertIcon />
            Oops, something went wrong. Please the payment again!
          </Alert>
        </Stack>
      </Center>
    </SidebarWithHeader>
  );
}

export default CancelPlanPage;
