import React, { Component } from 'react'

//component
import Discount from '../components/order/discount';
import Meta from '../components/meta';

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;

const Index = (props) => {
    return (
        <>
            <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
            <Discount />
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Index