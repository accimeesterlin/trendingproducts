/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { Auth } from "aws-amplify";

import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";

export function MultiFactor({ username }) {
  const [code, setCode] = useState("");
  const [isError, setError] = useState(false);
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

  const handleChange = {
    code: useCallback((value) => setCode(value), []),
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      setError(false);
      addToast("User has been confirmed", {
        appearance: "success",
        autoDismiss: true,
      });
      router.push("/auth/signin");
    } catch (error) {
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
    <Card title="Code Verification" sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={code}
            onChange={handleChange.code}
            label="Code"
            type="text"
            autoComplete="text"
          />
          <Button submit>Verify Code</Button>
        </FormLayout>
      </Form>
      <TextContainer>
        <TextStyle>Resend verification code?</TextStyle>{" "}
        <Link href="#">
          <a onClick={resentConfirmationCode}>Resend</a>
        </Link>
      </TextContainer>
    </Card>
  );
}

export default MultiFactor;
