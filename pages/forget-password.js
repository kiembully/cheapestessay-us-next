import React from "react";

// components
import Account from "../components/Account/account";
import Meta from "../components/meta";

const ForgetPwd = () => {
    return (
        <>
            <Meta />
            <Account
                title="Forgot password"
                btntext="Submit"
                text="Login"
                linktext="Go back to"
                link={`${process.env.hostBaseUrl}/login`}
            />
        </>
    );
}

export default ForgetPwd;
