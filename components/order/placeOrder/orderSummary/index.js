import React, { Component } from 'react';
// API helper
import { apiHelper } from '../../../../helper/apiHelper';

// scss
import orderCss from "../../../../styles/order.scss";

// Toaster
import { toast, ToastContainer } from 'react-toastify';
import ReactToastifyCss from 'react-toastify/dist/ReactToastify.min.css';

class Index extends Component {
    _unmounted = false;

    constructor() {
        super()
        this.state = {
            detailOrder: null,
            orderId: 0
        }
    }

    // Display Order data
    displayOrder = async () => {
        if (this._unmounted) {
            const loginToken = localStorage.getItem('token');
            var convertedToken = JSON.parse(loginToken);

            const formData = new FormData();
            formData.append("order_id", this.state.orderId);
            formData.append("user_token", convertedToken ? convertedToken.value : '');

            apiHelper('displayorder', 'POST', formData, null).then(res => {
                if (res.data.status) {
                    const data = res.data.data;
                    this.setState({ detailOrder: data });
                    this.props.setTotalPrice(data && data.payment && data.payment.total)
                }
            }).catch(error => console.error(`Error: ${error}`));
        }
    }

    //componentDidMount
    componentDidMount() {
        this._unmounted = true;

        if (this._unmounted) {
            var orderId = this.props.getIdFromUrl()
            if (orderId && orderId !== '') {
                this.setState({
                    orderId: orderId
                }, () => {
                    this.displayOrder();
                })
            }
        }
    }

    componentWillUnmount() {
        this._unmounted = false;
    }

    // componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        if (this._unmounted) {
            setTimeout(() => {
                if (prevProps.currentStep !== this.props.currentStep && (this.props.currentStep === 3 || this.props.currentStep === 4)) {
                    var orderId = this.props.getIdFromUrl()

                    if (orderId && orderId !== '') {
                        this.setState({
                            orderId: orderId
                        }, () => {
                            this.displayOrder();
                        })
                    }
                }
            }, 100);
        }
    }

    //gotoNextStep
    gotoNextStep = () => {
        if (this._unmounted) {
            if (this.props.currentStep === 3) {
                // toast.success("Saved as Draft");
                setTimeout(() => {
                    this.props.onChangeNext(3);
                }, 100);
            } else {
                this.props.confirmPayment();
            }
        }
    }

    render() {
        var { detailOrder } = this.state
        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: ReactToastifyCss }}></style>
                <style dangerouslySetInnerHTML={{ __html: orderCss }}></style>
                <div className="section-part rightSide">
                    <div className="orderSummary rightSection">
                        <h3 className="section-title">Order Summary</h3>
                        <div className="calculate-Part pt-0">
                            <div className="price d-flex justify-content-between">
                                <span title="Order Number">Order Number</span>
                                <span title={this.state.detailOrder && this.state.detailOrder.order_no_custom}>{this.state.detailOrder && this.state.detailOrder.order_no_custom}</span>
                            </div>
                            <div className="price d-flex justify-content-between">
                                <span title="Order Date">Order Date</span>
                                <span title={detailOrder && detailOrder.order_date}>{detailOrder && detailOrder.order_date}</span>
                            </div>
                            <div className="price d-flex justify-content-between">
                                <span title="Deadline">Deadline</span>
                                <span title={detailOrder && detailOrder.deadlinedate}>{detailOrder && detailOrder.deadlinedate}</span>
                            </div>
                            <div className="price d-flex justify-content-between">
                                <span title="Lifetime Discount">Lifetime Discount</span>
                                <span title={detailOrder && detailOrder.payment.ltDisc ? detailOrder.payment.ltDisc : 0}>{detailOrder && detailOrder.payment.ltDisc ? detailOrder.payment.ltDisc : 0}</span>
                            </div>

                            {detailOrder && detailOrder.payment.coupon_code && detailOrder.payment.coupon_code !== '' ?
                                <div className="price d-flex justify-content-between">
                                    <span>Coupon Discount</span>
                                    <span title={`$ ${detailOrder.payment.coupon_discount ? detailOrder.payment.coupon_discount : 0.00}`}>${detailOrder.payment.coupon_discount ? detailOrder.payment.coupon_discount : 0.00}</span>
                                </div> :
                                null}

                            {this.props.settedRedeemAmount &&
                                <div className="price d-flex justify-content-between">
                                    <span title="Redeem">Redeem</span>
                                    <div>
                                        <span className="returnRedeem me-3" onClick={() => this.props.returnAmount()}>Return</span>
                                        <span title={this.props.settedRedeemAmount}>{this.props.settedRedeemAmount}</span>
                                    </div>
                                </div>}
                        </div>

                        <div className="bottomPart">
                            {this.props.settedFinalAmount && this.props.settedFinalAmount ?
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className="totalPrice">Total Price</span>
                                    <span className="price">$ {(this.props.settedFinalAmount).toFixed(2)}</span>
                                </div>
                                :
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <span className="totalPrice">Total Price</span>
                                    <span className="price">{detailOrder && detailOrder.payment && detailOrder.payment.total}</span>
                                </div>
                            }

                            <div className="mt-2">
                                <a className="btn theme-btn w-100" onClick={() => this.gotoNextStep()}>
                                    Confirm &amp; Pay
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Index