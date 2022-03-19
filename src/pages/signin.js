import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { addToast } = useToasts();
  const [rememberMe, setRememberMe] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser();
  };

  const loginUser = async () => {
    try {
      setIsloading(true);
      const user = await Auth.signIn(email, password);
      addToast("You are now logged in!", {
        appearance: "success",
        autoDismiss: true,
      });
      if (user) {
        setIsloading(false);
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setIsloading(false);
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            Don't have an account yet? Sign up{" "}
            <Link href="/signup" color="blue.400">
              features
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox
                  onChange={({ target }) => setRememberMe(target.value)}
                >
                  Remember me
                </Checkbox>
                <Link color="blue.400" href="/forgotpassword">
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg="blue.400"
                color="white"
                isLoading={isLoading}
                onClick={handleSubmit}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
