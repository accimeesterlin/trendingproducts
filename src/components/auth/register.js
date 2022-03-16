import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { Auth } from "aws-amplify";

import { Form, FormLayout, TextField, Button } from "@shopify/polaris";

export function Register({ setIsMFA, setUsername }) {
  const [email, setEmail] = useState("");
  const [isError, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [view, setView] = useState("");
  const { addToast } = useToasts();

  const actions = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      setView("signup");
    }
  };

  useEffect(() => {
    actions();
  }, []);

  const handleSubmit = () => {
    registerNewUser();

    if (!isError) {
      // resetFields();
    }
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setPhone("");
  };

  const handleChange = {
    password: useCallback((value) => setPassword(value), []),
    phone: useCallback((value) => setPhone(value), []),
    email: useCallback((value) => setEmail(value), []),
    passwordConfirmation: useCallback(
      (value) => setPasswordConfirmation(value),
      []
    ),
  };

  const registerNewUser = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          phone_number: phone, // optional - E.164 number convention
          // Other custom attributes...
        },
        validationData: [], // optional
      });
      setError(false);
      addToast("User successfully registered!", {
        appearance: "success",
        autoDismiss: true,
      });
      setUsername(email);
      setIsMFA(true);
    } catch (error) {
      setError(true);
      addToast(error?.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (view !== "signup") {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={email}
          onChange={handleChange.email}
          label="Email"
          type="email"
          autoComplete="email"
        />

        <TextField
          value={password}
          onChange={handleChange.password}
          label="Password"
          type="password"
          autoComplete="password"
        />
        <TextField
          value={passwordConfirmation}
          onChange={handleChange.passwordConfirmation}
          label="Confirm Password"
          type="password"
          autoComplete="password"
        />
        <TextField
          value={phone}
          onChange={handleChange.phone}
          label="Phone"
          type="text"
          autoComplete="text"
        />
        <Button submit>Create an Account</Button>
      </FormLayout>
    </Form>
  );
}

export default Register;
