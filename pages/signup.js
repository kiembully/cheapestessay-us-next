import React from "react";

// components
import Account from "../components/Account/account";
import Meta from "../components/meta";

export default function Login(props) {
  return (
    <>
      <Meta />
      <Account
        title="Create Account"
        btntext="Create Account"
        text="Sign in"
        linktext="Already have an account?"
        link={`${process.env.hostBaseUrl}/login`}
      />
    </>
  );
}
