import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Auth, Hub, Logger } from "aws-amplify";

const logger = new Logger("casino-logger");

const ProtectedRoute = (props) => {
  const router = useRouter();
  const [isNotAuthenticated, setIsNotAuthenticated] = useState(true);

  const { children } = props;
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      setIsNotAuthenticated(false);
    } catch (err) {
      router.push("/");
    }
  }

  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        router.push("/admin/product");
        break;
      case "signUp":
        logger.info("user signed up");
        router.push("/admin/product");
        break;
      case "signOut":
        router.push("/admin/product");
        logger.info("user signed out");
        break;
      case "signIn_failure":
        logger.error("user sign in failed");
        router.push("/");
        break;
      default:
        return "Happy to be her";
    }
  };

  useEffect(() => {
    checkAuthState();
    Hub.listen("auth", listener);
  });

  if (isNotAuthenticated) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
