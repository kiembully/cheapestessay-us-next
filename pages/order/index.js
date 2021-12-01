import React from "react";

import PlaceOrder from '../../components/order/placeOrder/index'
import Meta from "../../components/meta";
// import CombineOrderPage from "../../components/order/combineOrderPage";

// Toaster
import { ToastContainer } from "react-toastify";

var defaultMeta = process.env.defaultMeta;
const Order = (props) => {
  return (
    <>
      <Meta title={defaultMeta.title} description={defaultMeta.description} keywords={defaultMeta.keywords} />
      <PlaceOrder
        coupenCode={props.coupenCode}
        changeUserProfile={props.changeUserProfile}
      />
      <ToastContainer autoClose={2000} />
      {/* <CombineOrderPage /> */}
    </>
  );
};
export default Order;
