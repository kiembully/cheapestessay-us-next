import React from "react";

import { ukApiHelper } from "../helper/apiHelper";

// components
import Account from "../components/Account/account";
import Meta from "../components/meta";

const Login = (props) => {
  return (
    <>
      <Meta title={props.meta && props.meta.title} description={props.meta && props.meta.description} keywords={props.meta && props.meta.keywords} />
      <Account
        step={props.stepForPlaceOrder}
        title="Login to your account"
        condition="Remember me"
        btntext="Sign in"
        text="Sign Up"
        linktext="Don’t have an account?"
        link={`${process.env.hostBaseUrl}/signup`}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=login`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META

  return {
    props: {
      meta
    }
  }
}

export default Login;