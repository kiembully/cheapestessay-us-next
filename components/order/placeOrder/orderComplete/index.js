import React, { Component } from 'react';

import Img from '../../../Common/image';
class Index extends Component {
    constructor() {
        super()
        this.state = {
            oDetails: null,
            pDetails: null
        }
    }

    //componentDidMount
    componentDidMount() {
        this.getCompletedOrderData();
    }

    //getCompletedOrderData
    getCompletedOrderData = () => {

        if (localStorage.getItem('paidOrderDetails')) {
            let oDetails = JSON.parse(localStorage.getItem('paidOrderDetails'));
            this.setState({ oDetails: oDetails });
        }

        if (localStorage.getItem('paidPaymentDetails')) {
            let pDetails = JSON.parse(localStorage.getItem('paidPaymentDetails'));
            this.setState({ pDetails: pDetails });
        }
    }

    viewOrder = () => {
        // order related 
        localStorage.removeItem("orderId");
        localStorage.removeItem("orderToken");
        localStorage.removeItem("uploadedToken");
        localStorage.removeItem("discount_token");

        // Rightbar related
        localStorage.removeItem("orderRight");

        //completed order
        localStorage.removeItem('paidOrderDetails')
        localStorage.removeItem('paidPaymentDetails')

        this.props.resetOrder(`${process.env.basePath}/my-orders/order-details?order_id=${this.state.oDetails && parseInt(this.state.oDetails.order_id)}`)

    }

    render() {
        return (
            <>
                <div className="row align-items-center">
                    <div className="col-md-6 offset-md-2 m-auto">
                        <div className="section-part leftSide orderComplete">
                            <div className="orderSummary rightSection">
                                <h3 className="section-title">Order Summary</h3>
                                <div className="calculate-Part pt-0">
                                    <div className="price d-flex justify-content-between">
                                        <span>Order ID</span> <span> {this.state.oDetails && this.state.oDetails.order_id} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Type of Service</span> <span> {this.state.oDetails && this.state.oDetails.service_id} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Academic Level</span> <span> {this.state.oDetails && this.state.oDetails.academic_id} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Subject</span> <span> {this.state.oDetails && this.state.oDetails.subject} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Pages(s)</span> <span> {this.state.oDetails && this.state.oDetails.pages} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Slides</span> <span> {this.state.oDetails && this.state.oDetails.slides} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Turnitin Plagiarism Report </span> <span> {this.state.oDetails && this.state.oDetails.is_plagiarism_report === 1 ? "Yes" : "No"}  </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Top 10 Writers</span> <span> {this.state.oDetails && this.state.oDetails.writer} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Deadline</span> <span> {this.state.oDetails && this.state.oDetails.deadlinedate} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Order On</span> <span> {this.state.oDetails && this.state.oDetails.date_paid} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Payment Mode</span> <span> {this.state.oDetails && this.state.pDetails.payment_mode} </span>
                                    </div>
                                    <div className="price d-flex justify-content-between">
                                        <span>Transaction ID</span> <span> {this.state.oDetails && this.state.pDetails.transaction_id} </span>
                                    </div>
                                    <div className="calculate-Part bottomCalculate">
                                        <div className="price d-flex justify-content-between">
                                            <span>SubTotal</span> <span> $ {this.state.oDetails && this.state.oDetails.sub_total} </span>
                                        </div>
                                        {this.state.oDetails && this.state.oDetails.redeemAmt && parseFloat(this.state.oDetails.redeemAmt) > 0 ?
                                            <div className="price d-flex justify-content-between">
                                                <span>Redeemed Amount</span> <span> $ {this.state.oDetails.redeemAmt} </span>
                                            </div> :
                                            null}
                                        <div className="bottomPart">
                                            <div className="d-flex justify-content-between">
                                                <span className="totalPrice">Total</span>
                                                <span className="price mt-0"> $ {this.state.oDetails && this.state.oDetails.total} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="orderSummaryDiv">
                            <div className="orderingDiv text-center">
                                <Img src="/order/completedOrder.svg" alt="Thank you For Ordering" width="280" height="280" />
                                <h3 className="title">Thank you For Ordering</h3>
                                <p className="desc">
                                    We received your order and will begin processing it soon.
                                    Your order information appears below.
                                </p>
                                <button className="btn theme-btn" onClick={this.viewOrder}>
                                    View Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Index