/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { createUser } from "@Libs/api-user";
import { MultiFactor } from "@Components/auth/mfa";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isMFA, setIsMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [view, setView] = useState(""); // TODO - handle with the different view here
  const [isError, setError] = useState(false);
  const router = useRouter();

  // TODO - check and see if password is the same
  const registerNewUser = async () => {
    try {
      if (password !== passwordConfirmation) {
        addToast("Please make sure that your password is the same", {
          appearance: "error",
          autoDismiss: true,
        });

        return;
      }

      setIsLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          phone_number: `+${phone}`,
          // Other custom attributes...
        },
        validationData: [], // optional
      });

      const userPayLoad = {
        email,
        phone,
        role: "user",
        firstName,
        lastName,
      };

      await createUser(userPayLoad);
      setError(false);
      addToast("User successfully registered!", {
        appearance: "success",
        autoDismiss: true,
      });
      setIsLoading(false);
      setEmail(email);
      setIsMFA(true);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      addToast(error?.message || "Error creating up user", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (isMFA) {
    return <MultiFactor username={email} />;
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={({ target }) => setFirstName(target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={({ target }) => setLastName(target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                type="number"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setShowPassword((displayPassword) => !displayPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={({ target }) =>
                    setPasswordConfirmation(target.value)
                  }
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setShowPassword((displayPassword) => !displayPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="blue.400"
                color="white"
                isLoading={isLoading}
                onClick={registerNewUser}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Already a user?{" "}
                <Link href="/signin" color="blue.400">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
