import React from "react";
import SidebarWithHeader from "@Components/sidebar";
import { Box } from "@chakra-ui/react";

const RegisterComponent = () => {
  console.log("loading...");
  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Box bg="white" p={4} m={4}>
        <h1>I am the Date Selection Page</h1>
      </Box>
    </SidebarWithHeader>
  );
};
export default RegisterComponent;
