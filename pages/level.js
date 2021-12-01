import React, { Component } from 'react'
import Level from '../components/order/level';
import Meta from '../components/meta';

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;
class Index extends Component {
    render() {
        return (
            <>
                <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
                <Level />
                <ToastContainer autoClose={2000} />
            </>
        )
    }
}

export default Index