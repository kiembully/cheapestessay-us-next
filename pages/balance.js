import React from 'react'
import Balance from '../components/order/balance/balance'
import Meta from '../components/meta';

// Toaster
import { ToastContainer } from "react-toastify";

const Index = (props) => {
    var defaultMeta = process.env.defaultMeta;
    return (
        <>
            <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
            <Balance changeUserProfile={props.changeUserProfile} />
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Index