/* eslint-disable no-unreachable */
import React, { useEffect } from "react";
import { Auth } from "aws-amplify";

export default function SignOut() {
  try {
    // By setting global, you signing out user from all devices

    useEffect(() => {
      logOut();
    }, []);

    const logOut = async () => {
      try {
        await Auth.signOut({ global: true });
      } catch (error) {
        console.log("Error signing out");
      }
    };

    return (
      <div>
        <h1>I am the Sign Out Component</h1>
      </div>
    );
  } catch (error) {
    console.log("Error signing out: ", error);
  }
}
