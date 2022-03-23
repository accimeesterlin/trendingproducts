import React, { useState, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import SidebarWithHeader from "@Components/sidebar";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { createProduct, getProduct } from "@Libs/api-product";

const endpoint = "https://w8shi2rp09.execute-api.us-east-1.amazonaws.com";

const ImportProductPage = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToasts();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const productId = url?.match(/\d+/)[0];

      const { data } = await getProduct(productId);
      if (data?.getProduct) {
        // TODO - give the user a direct link to the product
        addToast("Product successfully imported!", { appearance: "success" });
      } else {
        const { data: result } = await axios(
          `${endpoint}/aliImport-dev?aliUrl=${url}`
        );

        const {
          title,
          productPrice,
          sold,
          totalReviews,
          positiveFeedBack,
          storeName,
          followers,
          images,
          imageCover,
        } = result;

        const payload = {
          productId,
          title,
          // description,
          productPrice,
          productUrl: url,
          sold,
          totalReviews,
          positiveFeedBack,
          storeName,
          followers,
          images,
          imageCover,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await createProduct(payload);
        addToast("Product successfully imported & saved!", {
          appearance: "success",
        });
      }
      setIsLoading(false);
      setUrl("");
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
      addToast("Error getting product", { appearance: "error" });
    }
  });

  return (
    <SidebarWithHeader className="dashboard" pageName="Add Product">
      <Box bg="white" p={4} m={4}>
        <FormControl m={4} w="90%">
          <FormLabel htmlFor="text">AliExpress Product URL</FormLabel>
          <Input
            placeholder="Ex: https://www.aliexpress.com/item/33005594727.html"
            id="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            type="text"
          />
        </FormControl>

        <Button
          m={4}
          bg="#010080"
          isLoading={isLoading}
          onClick={handleSubmit}
          colorScheme="blue"
        >
          Import
        </Button>
      </Box>
    </SidebarWithHeader>
  );
};
export default ImportProductPage;
