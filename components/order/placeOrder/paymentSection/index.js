import React, { Component } from 'react';

import { UncontrolledTooltip, Input } from "reactstrap";
import Select from 'react-select';

// scss
import paymentCss from "../paymentCard.scss";
import cardDetailsCss from "../../balance/payment/cardDetails.scss";

// API and JWT helper
import { apiHelper } from '../../../../helper/apiHelper';
import { jwtDecode } from "../../../../helper/jwtHelper";

import { AMERICANEXPRESS, OTHERCARDS, CVV } from '../../../../helper/constantHelper';

// Toaster
import { toast } from 'react-toastify';
import ReactToastifyCss from 'react-toastify/dist/ReactToastify.min.css';

import MaskedInput from "react-text-mask";

// icons
import PrevStep from "../icons/prevStep";
import ConfirmStep from "../icons/confirmStep";

// orderSummary
import OrderSummary from "../orderSummary/index";

import Img from '../../../Common/image';

class Index extends Component {
    constructor() {
        super()
        this.state = {
            countryList: [],
            reedemAmount: "",
            orderId: '',

            // card addEditSection
            addEditSection: false,
            totalBalance: 0,
            ordersTotal: 0,

            // isAdd
            isAdd: false,

            // form states
            user: {
                firstname: "",
                lastname: "",
                card_number: "",
                cMonth: "",
                cYear: "",
                cvv: "",
                country: "",
                email: ""
            },
            errors: {},

            //current card
            currentCard: null,

            // payment 
            paymentType: "card",
            outerCvv: "",
            isOutCvvOk: false,

            // extra for re redner
            settedRedeemAmount: "",
            settedFinalAmount: "",
            isLoader: false
        }
    }

    //changePaymentType
    changePaymentType = (e) => {
        this.setState({ paymentType: e.currentTarget.value });
    }

    //componentDidMount
    componentDidMount = async () => {

        this.getCountryList();

        //get user's current balance first
        const loginToken = localStorage.getItem('token');
        var convertedToken = loginToken ? jwtDecode((JSON.parse(loginToken)).value) : null;

        if (convertedToken) {
            this.setState({ totalBalance: convertedToken.account.total_balance ? convertedToken.account.total_balance : 0 });
        }

        // get orderId from saved token
        let orderId = this.props.getIdFromUrl();
        if (orderId && orderId !== '') {
            this.setState({
                orderId: orderId
            }, () => {
                this.displayOrder();
            })
        }

        this.getUserDetail();
        document.getElementById("cvvInput").focus();
    }

    displayOrder = async () => {
        const loginToken = localStorage.getItem('token');
        var cToken = loginToken ? JSON.parse(loginToken) : null;

        const formData = new FormData();
        formData.append("order_id", this.state.orderId);
        formData.append("user_token", cToken ? cToken.value : '');

        await apiHelper('displayorder', 'POST', formData, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;
                let totalP = (data.payment.total).split('$');
                this.setState({ ordersTotal: parseFloat(totalP[1]) })
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentStep !== this.props.currentStep && this.props.currentStep === 4) {
            document.getElementById("cvvInput").focus();
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

    //getUserDetail
    getUserDetail = async () => {

        //loginToken
        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);

        //getCardDetails
        const formData = new FormData();
        formData.append("user_token", convertedToken ? convertedToken.value : '');

        //getCardDetails
        apiHelper('getCardDetails', 'POST', formData, null).then(res => {

            // if status is true
            if (res.data.status) {

                let currentCard = jwtDecode(res.data.data.card_token);

                const { user } = this.state;
                user["firstname"] = currentCard[0].cFName;
                user["lastname"] = currentCard[0].cLName;
                user["card_number"] = currentCard[0].cNo;
                user["cMonth"] = currentCard[0].expMonth;
                user["cYear"] = currentCard[0].expYear;
                user["country"] = { 'value': currentCard[0].country, 'label': currentCard[0].country };
                user["email"] = currentCard[0].email;

                this.setState({ user });
                this.setState({ isAdd: false });

            } else { this.setState({ isAdd: true }); }
        }).catch(error => console.error(`Error: ${error}`));
    }

    getCountryList = () => {

        apiHelper('countrylist', 'GET', null, null)
            .then(res => {
                if (res.data.status) {
                    var countryArr = res.data.data.map(info => ({ value: info.country_name, label: info.country_name }))
                    this.setState({
                        countryList: countryArr
                    })
                }
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    //sendReedemAmount
    sendReedemAmount = async () => {
        if (this.state.settedRedeemAmount) { }  // nothing to so
        else {
            if (this.state.reedemAmount === "") { toast.error("Please enter a reedem amount"); }
            else if (this.state.reedemAmount > this.state.totalBalance) { toast.error("Reedem amount should be smaller than total balance"); }
            else if (this.state.reedemAmount > this.state.ordersTotal) { toast.error("Reedem amount should be smaller than Order Amount"); }
            else {

                //loginToken
                const loginToken = localStorage.getItem('token');
                var convertedToken = JSON.parse(loginToken);

                // sendReedemAmount
                const formData = new FormData();
                formData.append("user_token", convertedToken ? convertedToken.value : '');
                formData.append("order_id", this.state.orderId);
                formData.append("redeem", this.state.reedemAmount);

                apiHelper('reedemAmount', 'POST', formData, null).then(res => {
                    if (res.data.status) {
                        toast.success(res.data.message);

                        // set amount and send it to orderSummary
                        this.setState({
                            totalBalance: parseFloat(this.state.totalBalance) - parseFloat(this.state.reedemAmount),
                            settedRedeemAmount: this.state.reedemAmount,
                            settedFinalAmount: parseFloat(this.state.ordersTotal) - parseFloat(this.state.reedemAmount)
                        });
                    }
                    else { toast.error(res.data.message); }
                    // this.setState({ reedemAmount: "" });
                }).catch(error => console.error(`Error: ${error}`));
            }
        }
    }

    returnAmount = () => {
        this.setState({
            reedemAmount: '',
            totalBalance: parseFloat(this.state.totalBalance) + parseFloat(this.state.reedemAmount),
            settedRedeemAmount: '',
            settedFinalAmount: parseFloat(this.state.ordersTotal)
        });
    }

    //changeReedemAmount
    changeReedemAmount = (e) => {
        this.setState({ reedemAmount: e.target.value });
    }

    handleCountryChange = selectedOption => {
        this.setState({ user: { ...this.state.user, country: selectedOption } }, () => {
            this.formValidation()
        });
    };

    // change method
    handleChange = (event) => {

        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });

        // check form validation
        this.formValidation();
    }

    //formValidation
    formValidation = () => {

        const { user: { firstname, lastname, card_number, cMonth, cYear, cvv, country, email } } = this.state;

        var reEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var reFLName = /[0-9`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

        var date = new Date();
        var currMonth = date.getMonth() + 1;
        var currYear = date.getFullYear();

        // Form validation
        let err = {};
        if (!firstname) {
            err.firstname = "Enter firstname";
        } else {
            if (reFLName.test(firstname)) { err.firstname = "May only include letters and spaces" }
        }
        if (!lastname) {
            err.lastname = "Enter lastname";
        } else {
            if (reFLName.test(lastname)) { err.lastname = "May only include letters and spaces" }
        }

        if (!card_number) {
            err.card_number = "Enter card number";
        } else {
            const regexPattern = {
                MASTERCARD: new RegExp(/^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/),
                VISA: new RegExp(/^4[0-9]{2,}$/),
                AMERICAN_EXPRESS: new RegExp(/^3[47][0-9]{5,}$/),
                DISCOVER: new RegExp(/^6(?:011|5[0-9]{2})[0-9]{3,}$/),
                // DINERS_CLUB:  new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/),
                JCB: new RegExp(/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/),
                UNIONPAY: new RegExp(/^(62[0-9]{14,17})$/),
                MAESTRO: new RegExp(/^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/),
                DINERS_CLUB: new RegExp(/3(?:0[0-5]|[68][0-9])[0-9]{11}/g)
            };
            for (const card in regexPattern) {
                if (card_number.replace(/[^\d]/g, "").match(regexPattern[card])) {
                    if (!/^[1-6]{1}[0-9]{11,15}$/i.test(card_number.replace(/[^\d]/g, "").trim())) {
                        err.card_number = "Enter a valid Card";
                    }
                }
            }
        }
        if (!cMonth || cMonth === '') {
            err.cMonth = "Enter expiry month";
        } else if (cMonth !== '' && (cMonth > 12 || cMonth <= 0)) {
            err.cMonth = "Invalid expiry month";
        } else {
            if (!cYear) { err.cYear = "Enter expiry year"; }
            else if (cYear !== '' && (cYear < currYear || (cYear.toString()).length > 4)) { err.cYear = "Invalid expiry year"; }
            else if (cMonth !== '' && cYear !== '' && cYear === currYear && cMonth <= currMonth) { err.cMonth = "Invalid expiry month"; }
        }
        if (!cvv) {
            err.cvv = "Enter CVV";
        } else {
            if (cvv !== '' && ((cvv).length < 3 || (cvv).length > 4)) { err.cvv = "Invalid cvv"; }
        }
        if (!country) { err.country = "Enter country"; }
        if (!email) {
            err.email = "Enter email";
        } else {
            if (!reEmail.test(email)) { err.email = "Please enter a valid email address" }
        }

        this.setState({ errors: err });
    }

    //addUpdateCard
    addUpdateCard = () => {

        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);

        // First check validation 
        this.formValidation();

        setTimeout(() => {

            if (Object.getOwnPropertyNames(this.state.errors).length === 0) {

                let expiry_date = this.state.user.cMonth + "/" + this.state.user.cYear;

                //formData
                const formData = new FormData();
                formData.append("card_firstname", this.state.user.firstname);
                formData.append("card_lastname", this.state.user.lastname);
                formData.append("cardnumber", (this.state.user.card_number).replace(/[^\d]/g, "").trim());
                formData.append("expiry", expiry_date);
                formData.append("country", this.state.user.country.label);
                formData.append("cvv", this.state.user.cvv);
                formData.append("email", this.state.user.email);
                formData.append("user_token", convertedToken ? convertedToken.value : '');

                // sendCardDetails
                apiHelper('saveCardDetails', 'POST', formData, null).then(res => {
                    if (res.data.status === true) {
                        toast.success(res.data.message);
                        this.setState({ addEditSection: false, outerCvv: this.state.user.cvv }, () => {
                            this.getUserDetail()
                        });
                    }
                    else if (res.data.status === false) {
                        toast.error(res.data.message);
                    }
                }).catch(error => console.error(`Error: ${error}`));
            }
        }, 20);
    }

    //cvvValidation
    cvvValidation = () => {
        this.setState({ isOutCvvOk: true });
        if (this.state.outerCvv === "") {
            toast.error('Enter CVV');
            this.setState({ isOutCvvOk: false });
        }
        else if ((this.state.outerCvv).length < 3 || (this.state.outerCvv).length > 3) {
            toast.error('Invalid CVV Length');
            this.setState({ isOutCvvOk: false });
        }
    }

    //confirmPayment
    confirmPayment = () => {

        let paymentType = this.state.paymentType;

        // Payment with card
        if (paymentType === "card") {
            if (!this.state.isAdd) {
                this.cvvValidation(); // Validation
                setTimeout(() => {
                    if (this.state.isOutCvvOk === true) {
                        this.setState({ isLoader: true });
                        this.payByCard();
                    }
                }, 10);
            } else {
                this.setState({
                    addEditSection: true
                })
            }
        }
    }

    // payByCard
    payByCard = async () => {

        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);

        //formData
        const formData = new FormData();
        formData.append("cardnumber", this.state.user.card_number);
        formData.append("cvv", this.state.outerCvv);
        formData.append("expiry", this.state.user.cMonth + "/" + this.state.user.cYear);
        formData.append("order_id", this.state.orderId);
        formData.append("redeem_amt", this.state.settedRedeemAmount);
        formData.append("user_token", convertedToken ? convertedToken.value : '');

        // sendCardDetails
        apiHelper('payWithStripeCard', 'POST', formData, null).then(res => {
            if (res.data.status === true) {

                // set loader false
                this.setState({ isLoader: false });
                toast.success(res.data.message);

                convertedToken.value = res.data.data.user_token
                localStorage.setItem('token', JSON.stringify(convertedToken));

                // set orderdata into localstorage
                localStorage.setItem('paidOrderDetails', JSON.stringify(res.data.data.order_data));
                localStorage.setItem('paidPaymentDetails', JSON.stringify(res.data.data.payment_data));

                this.props.onChangeNext(4);
                this.props.orderComplete(true);
                setTimeout(() => {
                    this.props.changeUserProfile()
                }, 50);
            }
            else if (res.data.status === false) { this.setState({ isLoader: false }); toast.error(res.data.message); }
        }).catch(error => console.error(`Error: ${error}`));
    }

    render() {
        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: paymentCss }}></style>
                <style dangerouslySetInnerHTML={{ __html: ReactToastifyCss }}></style>
                <style dangerouslySetInnerHTML={{ __html: cardDetailsCss }}></style>

                <div className="row">
                    <div className={`col-md-8 ${this.state.addEditSection ? "col-md-12" : null}`}>
                        <div className="section-part leftSide">
                            {
                                this.state.addEditSection ?
                                    <>
                                        <div className="row">
                                            <div className="col-md-6 pe-xl-5">
                                                <div className="paymentOpt">
                                                    <div className="d-flex align-items-center justify-content-between totalPrice">
                                                        <span className="label">Total Price</span>
                                                        <span className="price">${this.state.ordersTotal}</span>
                                                    </div>
                                                    <div className="top text-center">
                                                        <Img src="/order/paymentOpt.svg" alt="paymentOpt" width="250" height="24" />
                                                    </div>
                                                    <div className="cardDetails">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Firstname</label>
                                                                    <input type="text" name="firstname"
                                                                        value={this.state.user.firstname}
                                                                        onChange={this.handleChange} className="form-control" placeholder="First name" />
                                                                    <span className="errorMsg">{this.state.errors.firstname}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Lastname</label>
                                                                    <input type="text" name="lastname"
                                                                        value={this.state.user.lastname}
                                                                        onChange={this.handleChange} className="form-control" placeholder="Last name" />
                                                                    <span className="errorMsg">{this.state.errors.lastname}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Card Number</label>
                                                            <MaskedInput
                                                                mask={["37", "34"].includes(this.state.user.card_number !== '' && this.state.user.card_number.split("").splice(0, 2).join("")) ? AMERICANEXPRESS : OTHERCARDS}
                                                                guide={false}
                                                                placeholderChar={"\u2000"}
                                                                placeholder="xxxx xxxx xxxx xxxx"
                                                                name="card_number"
                                                                value={this.state.user.card_number}
                                                                onChange={this.handleChange}
                                                                className='form-control'
                                                            />
                                                            <span className="errorMsg">{this.state.errors.card_number}</span>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Card Expiry</label>
                                                                    <div className="d-flex">
                                                                        <div className="input-group flex-wrap d-block">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                placeholder="MM"
                                                                                value={this.state.user.cMonth}
                                                                                name="cMonth"
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <span className="errorMsg">{this.state.errors.cMonth}</span>
                                                                        </div>

                                                                        <span className="arrow">/</span>

                                                                        <div className="input-group">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                name="cYear"
                                                                                placeholder="YYYY"
                                                                                value={this.state.user.cYear}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <span className="errorMsg">{this.state.errors.cYear}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>CVV</label>
                                                                    <MaskedInput
                                                                        type="password"
                                                                        mask={CVV}
                                                                        guide={false}
                                                                        name="cvv"
                                                                        className='form-control'
                                                                        placeholderChar={"\u2000"}
                                                                        placeholder="CVV2"
                                                                        value={this.state.user.cvv}
                                                                        onChange={this.handleChange}
                                                                    />
                                                                    <span className="errorMsg">{this.state.errors.cvv}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Country</label>
                                                                    <Select
                                                                        value={this.state.user.country}
                                                                        onChange={this.handleCountryChange}
                                                                        options={this.state.countryList}
                                                                        isSearchable={true}
                                                                        classNamePrefix="country-dd"
                                                                        name="country"
                                                                    // menuIsOpen
                                                                    />

                                                                    <span className="errorMsg">{this.state.errors.country}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange} className="form-control" placeholder="Email Address" />
                                                                    <span className="errorMsg">{this.state.errors.email}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex align-items-center justify-content-between bottom">
                                                            <p className="condition">
                                                                <input id="save_data" checked={this.state.isShow} onChange={() => { this.setState({ isShow: !this.state.isShow }) }} type="checkbox" />
                                                                <label htmlFor="save_data">Save information to pay faster next time</label>
                                                            </p>
                                                            <div className="actionBtn d-flex justify-content-end">
                                                                <a onClick={() => this.setState({ addEditSection: false }, () => { document.getElementById("cvvInput").focus(); })} className="btn outline-btn">Back</a>
                                                                <a onClick={() => this.addUpdateCard()} className="btn confirmPay-btn">{this.state.isAdd ? "Add" : "Save"}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ps-xl-5 border-leftSide">
                                                <div className="securePay text-center">
                                                    <Img src="/order/securePay.svg" alt="securePay" />
                                                    <div className="label mt-3">Easy and secure way to pay</div>
                                                    <div className="desc mb-4">You will receive an email after your payment is processed.</div>
                                                </div>
                                                <div className="options">
                                                    <div className="ways d-flex align-items-start">
                                                        <Img src="/order/refundPolicy.svg" alt="refundPolicy" width="56" height="56" />
                                                        <div className="details">
                                                            <div className="label">Refund Policy</div>
                                                            <div className="desc">Funds loaded to your account are 100% refundable.</div>
                                                        </div>
                                                    </div>
                                                    <div className="ways d-flex align-items-start">
                                                        <Img src="/order/confidentiality.svg" alt="confidentiality" width="56" height="56" />
                                                        <div className="details">
                                                            <div className="label">Confidentiality</div>
                                                            <div className="desc">We never ask for more information than we need to get you started with an order.</div>
                                                        </div>
                                                    </div>
                                                    <div className="ways d-flex align-items-start">
                                                        <Img src="/order/security.svg" alt="security" width="56" height="56" />
                                                        <div className="details">
                                                            <div className="label">Security</div>
                                                            <div className="desc">We do not collect or share your personal info with your writer.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="paymentDef">
                                            <div className="balaceDetails">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-6 col-md-12 col-xl-6">
                                                        <span className="text">Main Balance</span>
                                                        <span className="price">${parseFloat(this.state.totalBalance).toFixed(2)}</span>
                                                    </div>
                                                    <div className="col-sm-6 col-md-12 col-xl-6">
                                                        <div className="input-group">
                                                            <input className="form-control" readOnly={this.state.settedRedeemAmount ? true : false} value={this.state.reedemAmount} onChange={(e) => this.changeReedemAmount(e)} placeholder="$0.00" type="number" />
                                                            <button className="btn theme-btn redeemBtn" onClick={() => this.sendReedemAmount()}>Redeem </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="paymentCard">
                                                <div className="orderFormLabel">
                                                    <div className="d-flex align-items-center">
                                                        <div className="radioLabel d-flex align-items-center">
                                                            <input type="radio" name="card" value="card"
                                                                checked={this.state.paymentType === "card" ? true : false}
                                                                onChange={(e) => this.changePaymentType(e)} />
                                                            <label>Pay using Payment Card
                                                                <span id="paymentCard" className="paymentCard ms-2">
                                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clipPath="url(#clip0)">
                                                                            <path d="M7.99967 14.8103C11.6816 14.8103 14.6663 11.8256 14.6663 8.14367C14.6663 4.46177 11.6816 1.47701 7.99967 1.47701C4.31778 1.47701 1.33301 4.46177 1.33301 8.14367C1.33301 11.8256 4.31778 14.8103 7.99967 14.8103Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M7.99963 5.47701V8.14367" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M7.99963 10.8103H8.0063" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0">
                                                                                <rect width="16" height="16" fill="white" transform="translate(-0.000366211 0.143677)" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </span>
                                                            </label>
                                                            <UncontrolledTooltip placement="right" target="paymentCard">
                                                                Abstract Page - is a brief summary of the service
                                                                you avail or any in-depth analysis of a particular
                                                                subject and is often used to help the reader
                                                                quickly ascertain the paper's purpose.
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="input-group">
                                                    {!this.state.isAdd ?
                                                        <>
                                                            <input type="text" value={(this.state.user && this.state.user.card_number) ? '**** **** **** ' + this.state.user.card_number.substr(-4) : "**** **** **** ****"} readOnly className="cardInput form-control cardNumber" />
                                                            <MaskedInput
                                                                type="password"
                                                                mask={CVV}
                                                                guide={false}
                                                                name="cvv"
                                                                className='cardInput form-control cvvInput'
                                                                placeholderChar={"\u2000"}
                                                                placeholder="CVV"
                                                                value={this.state.outerCvv}
                                                                onChange={(e) => this.setState({ outerCvv: e.target.value })}
                                                                id="cvvInput"
                                                            />
                                                        </>
                                                        : null
                                                    }
                                                    <button className="editBtn btn outline-btn" onClick={() => this.setState({ addEditSection: !this.state.addEditSection, outerCvv: '' })}> {this.state.isAdd ? "Add" : "Edit"} </button>
                                                </div>
                                                {/* <div className="d-flex align-items-center orderFormLabel">
                                                            <div className="radioLabel d-flex align-items-center">
                                                                <input
                                                                    type="radio" name="card" value="paypal"
                                                                    checked={this.state.paymentType === "paypal" ? true : false}
                                                                    onChange={(e) => this.changePaymentType(e)} />
                                                                <label htmlFor="paypal"> <img src="./order/paypal.svg" alt="paypal" /> </label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center orderFormLabel">
                                                            <div className="radioLabel d-flex align-items-center">
                                                                <input type="radio" name="card" value="apple"
                                                                    checked={this.state.paymentType === "apple" ? true : false}
                                                                    onChange={(e) => this.changePaymentType(e)} />
                                                                <label htmlFor="applepay"> <img src="./order/applepay.svg" alt="applepay" /> </label>
                                                            </div>
                                                        </div> */}
                                            </div>

                                            <div className="bottompart">
                                                <div className="d-flex justify-content-between options">
                                                    <a onClick={() => this.props.onChangePrev(4)} className="btn outline-btn" > <PrevStep /> <span className="ms-2">Previous Step</span></a>
                                                    <button onClick={() => this.confirmPayment()} className="btn confirmPay-btn">
                                                        {this.state.isLoader ? "Loading..." : <> <span className="me-2">Confirm &amp; Pay</span></>}
                                                        <ConfirmStep />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    {!this.state.addEditSection ?
                        <div className="col-md-4">
                            <OrderSummary
                                getIdFromUrl={this.props.getIdFromUrl}
                                currentStep={this.props.currentStep}
                                settedRedeemAmount={this.state.settedRedeemAmount}
                                settedFinalAmount={this.state.settedFinalAmount}
                                returnAmount={this.returnAmount}
                                onChangeNext={this.props.onChangeNext}
                                setTotalPrice={this.props.setTotalPrice}
                                confirmPayment={this.confirmPayment} />
                        </div>
                        : null}
                </div>
            </>
        )
    }
}

export default Index