import React from 'react'
import Profile from '../components/order/profile/index';
import Meta from '../components/meta';

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;

const Index = (props) => {
    return (
        <>
            <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
            <Profile changeUserProfile={this.props.changeUserProfile} />
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Index