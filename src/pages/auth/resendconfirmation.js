import React, { useState, useCallback } from "react";
import Link from "next/link";

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

/*
  Use Cases
    - A link to Forgot Password
    - A Link to Sign up
    - 

*/

export function ResendConfirmation() {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    // TODO - handle the login email and password
    setCode("");
  };

  const handleCodeChange = useCallback((value) => setCode(value), []);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card title="Code Confirmation" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={code}
                  onChange={handleCodeChange}
                  label="Code"
                  type="text"
                  autoComplete="text"
                />

                <Button submit>Verify Code</Button>
              </FormLayout>
            </Form>
            <TextContainer>
              <TextStyle>Didn't receive code</TextStyle>{" "}
              <Link href="/auth/signin">
                <a>Request New Code</a>
              </Link>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ResendConfirmation;
