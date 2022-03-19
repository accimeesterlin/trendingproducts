/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { Auth } from "aws-amplify";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export function MultiFactor({ username }) {
  const [code, setCode] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [view, setView] = useState("");
  const { addToast } = useToasts();

  // TODO - turn this into a reusable function
  const actions = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setView("multifactor");
    }
  };

  useEffect(() => {
    actions();
  }, []);

  const handleSubmit = () => {
    confirmSignUp();

    if (!isError) {
      // resetFields();
    }
  };

  const confirmSignUp = async () => {
    try {
      setIsLoading(true);
      await Auth.confirmSignUp(username, code);
      setError(false);
      addToast("User has been confirmed", {
        appearance: "success",
        autoDismiss: true,
      });
      setIsLoading(false);
      router.push("/signin");
    } catch (error) {
      setIsLoading(false);
      setError(true);
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const resentConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      const message = "code resent successfully";
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      addToast(err?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (view !== "multifactor") {
    return null;
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue("white", "gray.700")}
        rounded="xl"
        boxShadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Code
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Enter Code</FormLabel>
          <Input
            placeholder="Ex: 759743 "
            onChange={({ target }) => setCode(target.value)}
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align="start"
          justify="space-between"
        >
          <a color="blue.400" onClick={resentConfirmationCode}>
            Resend Code
          </a>
        </Stack>
        <Stack spacing={6}>
          <Button
            bg="blue.400"
            color="white"
            isLoading={isLoading}
            onClick={confirmSignUp}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit Code
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default MultiFactor;
