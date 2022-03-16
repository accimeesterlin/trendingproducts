import React, { useState } from "react";
import Link from "next/link";

import { Page, Layout, Card, TextContainer, TextStyle } from "@shopify/polaris";
import { Register } from "@Components/auth/register";
import { MultiFactor } from "@Components/auth/mfa";

export function SignUp() {
  const [isMFA, setIsMFA] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          {isMFA ? (
            <MultiFactor username={username} />
          ) : (
            <Card title="Create An Account" sectioned>
              <Register setIsMFA={setIsMFA} setUsername={setUsername} />
              <TextContainer>
                <TextStyle>
                  Already have an account? to Trending Products
                </TextStyle>{" "}
                <Link href="/">
                  <a>Log In</a>
                </Link>
              </TextContainer>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default SignUp;
