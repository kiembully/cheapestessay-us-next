import React from 'react'

import Meta from '../../components/meta';
import OrderStatus from '../../components/order/ordersTab/OrderStatus/orderStatus';

// scss
import ordersCss from "../../components/order/ordersTab/ordersTab.scss";

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;

const Index = (props) => {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: ordersCss }}></style>
            <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
            <div className="ordersTab">
                <OrderStatus />
            </div>
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Index