import React from 'react'
import Meta from '../../components/meta';
import Orders from '../../components/order/ordersTab/order';

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;

const Index = (props) => {
    return (
        <>
            <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
            <Orders />
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Index