import React, { useState, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

import {
  Page,
  Layout,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
} from "@shopify/polaris";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();

  const handleSubmit = () => {
    if (isCodeSent) {
      submitNewPassword();
    } else {
      forgotPassword();
    }
  };

  const forgotPassword = async () => {
    try {
      await Auth.forgotPassword(email);
      setIsCodeSent(true);
      addToast("Code has been sent!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const submitNewPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      addToast("New password has been updated!", {
        appearance: "success",
        autoDismiss: true,
      });
      router.push("/auth/signin");
    } catch (error) {
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleCodeChange = useCallback((value) => setCode(value), []);
  const handleNewPasswordChange = useCallback(
    (value) => setNewPassword(value),
    []
  );

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card title="Forgot Your Password" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  type="email"
                  autoComplete="email"
                />

                {isCodeSent ? (
                  <>
                    <TextField
                      value={code}
                      onChange={handleCodeChange}
                      label="Code"
                      type="text"
                      autoComplete="text"
                    />

                    <TextField
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      label="New Password"
                      type="password"
                      autoComplete="password"
                    />
                  </>
                ) : null}

                <Button submit>Reset Your Password</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ForgotPassword;
