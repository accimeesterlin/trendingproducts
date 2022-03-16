import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import {
  Page,
  Layout,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();
  const [view, setView] = useState("");
  const router = useRouter();

  const actions = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setView("signin");
    }
  };

  useEffect(() => {
    actions();
  }, []);

  const handleSubmit = () => {
    loginUser();
    // setEmail("");
    // setPassword("");
  };

  const handlePassword = useCallback((value) => setPassword(value), []);
  const handleEmail = useCallback((value) => setEmail(value), []);

  const loginUser = async () => {
    try {
      const user = await Auth.signIn(email, password);
      addToast("You are now logged in!", {
        appearance: "success",
        autoDismiss: true,
      });
      if (user) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (view !== "signin") {
    return null;
  }

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card title="Log In" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmail}
                  label="Email"
                  type="email"
                  autoComplete="email"
                />

                <TextField
                  value={password}
                  onChange={handlePassword}
                  label="Password"
                  type="password"
                  autoComplete="password"
                />

                <Button submit>Login</Button>
              </FormLayout>
            </Form>

            <TextContainer>
              <TextStyle>New to Trending Products</TextStyle>{" "}
              <Link href="/auth/signup">
                <a>Sign Up</a>
              </Link>
            </TextContainer>
            <TextContainer>
              <TextStyle>Forgot Your Password?</TextStyle>{" "}
              <Link href="/auth/forgotpassword">
                <a>Click here</a>
              </Link>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default SignIn;
