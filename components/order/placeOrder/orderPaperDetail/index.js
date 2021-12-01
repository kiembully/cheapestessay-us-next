import React, { Component } from 'react';
import Router, { useRouter } from "next/router";
import Select from "react-select";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { UncontrolledTooltip } from "reactstrap";

// Toaster
import ReactToastifyCss from 'react-toastify/dist/ReactToastify.min.css';
// React Bootstrap
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import moment from 'moment-timezone';

// scss
import orderCss from "../../../../styles/order.scss";
import OrderSidebarRight from "../sidebarRight";

// services
import { apiHelper } from '../../../../helper/apiHelper';
import { jwtDecode } from "../../../../helper/jwtHelper";

//icons
import AttachmentIcon from "../icons/attachmentIcon";
import RemoveIcon from "../icons/removeIcon";

const MyClassWithRouter = (props) => {
    const router = useRouter()
    return <Index {...props} router={router} />
}

class Index extends Component {

    _unmounted = false;

    constructor() {
        super()
        this.state = {

            // service
            serviceList: [{ name: 'Writing', value: 3 }, { name: 'Editing', value: 1 }, { name: 'PowerPoint', value: 2 }],
            serviceType: 3,

            // writer
            writerList: [{ name: 'College', value: 3 }, { name: 'Bachelor', value: 1 }, { name: 'Master', value: 2 }],
            writerType: 1,

            // Spacing
            spacingList: [{ name: 'Double-spaced', value: 1 }, { name: 'Single-spaced', value: 2 }],
            spacingType: 1,

            // paper type
            paperValue: { label: "Essay (Any Type)", value: 1 },
            paperList: [],
            isPlagOption: false,

            // Subject type
            subjectValue: { label: "English", value: 18 },
            subjectList: [],
            subjectPlaceholder: "Select Subject",
            otherSubjectValue: "",

            // no of page
            noOfPage: 0,

            // Topic
            topicValue: "",

            //Detail
            detailValue: "",
            detailValidation: "",

            // file upload
            isDragActive: true,
            uploadedFiles: [],
            fileArray: [],
            uploadedToken: '',

            // deadline
            deadlineList: [],
            deadlineValue: { label: "19 Days / September 14, 2021 11:25 AM", value: 19, duration: "Days", name: "September 14, 2021 11:25 AM" },
            orderDeadline: null,
            day: null,
            duration: '',
            defaultDay: null,
            defaultDuration: '',
            defaultDeadline: null,
            defaultDeadlineOption: [],

            deadline: 0,
            deadlineLable: "",

            // placeholder
            paperPlaceholder: "",
            deadlinePlaceholder: "Select Deadline",
            paperOtherPaperType: "",

            // Extra field
            storedToken: '',
            // discountCoupon: '',
            sidebarTotalPrice: 0,

            // order variables
            orderId: 0,
            orderStatus: 0,

            isorderChanged: false,

            //loader
            isFileLoader: false,
            windowWidth: 0,

            dropdownOpen: false
        }
    }

    toggle = () => {
        if (_unmounted) {
            this.setState({ dropdownOpen: !this.state.dropdownOpen })
        }
    };

    // storeRightData
    storeRightData = (key, value) => {

        var rightData = localStorage.getItem("orderRight");
        let item = {};
        if (rightData && rightData !== '') {
            item = JSON.parse(rightData);
        }
        item[key] = value;
        localStorage.setItem("orderRight", JSON.stringify(item));
        this.setState({ subjectDefaultValue: item && item.subject ? item.subject : 'English' })
    }

    // change Service
    changeService = (e) => {

        if (parseInt(e.currentTarget.value) === 2) {
            this.storeRightData('slide', 1);
            this.storeRightData('page', 0);
            this.props.changeSlide(1);
        } else {
            this.storeRightData('slide', 0);
            this.storeRightData('page', 1);
            this.props.changeSlide(0);
        }

        this.setState({ serviceType: parseInt(e.currentTarget.value), noOfPage: 1 }, () => { this.setOrderData(); });

        var sList = this.state.serviceList;
        for (var i = 0; i < sList.length; i++) {
            if (sList[i].value === parseInt(e.currentTarget.value)) {
                this.storeRightData('service', sList[i].name);
            }
        }
    }

    //changeWriter1
    changeWriter1 = (e) => {
        this.setState({ writerType: parseInt(e.currentTarget.value) }, () => { this.setOrderData(); });

        var wList = this.state.writerList;
        for (var i = 0; i < wList.length; i++) { if (wList[i].value === parseInt(e.currentTarget.value)) { this.storeRightData('level', wList[i].name); } }
    }

    //changePaper
    changePaper = (e) => {

        if (e.value === 127) { this.setState({ isPlagOption: true }); }
        else { this.setState({ isPlagOption: false }); }

        this.setState({ paperValue: e }, () => { this.setOrderData(); });
        this.storeRightData('paper', e.label);
        localStorage.setItem('calculator_pages', JSON.stringify(e))
    }

    //changeSubject
    changeSubject = (e) => {
        this.setState({ subjectValue: e, subjectPlaceholder: e.label }, () => { this.setOrderData(); });
        this.storeRightData('subject', e.label);
    }

    //changeSpacing
    changeSpacing = (e) => {
        this.setState({ spacingType: parseInt(e.currentTarget.value) }, () => { this.setOrderData(); });

        var sList = this.state.spacingList;
        for (var i = 0; i < sList.length; i++) { if (sList[i].value === e) { this.storeRightData('spacing', sList[i].name); } }
    }

    //changeOtherSubject
    changeOtherSubject = (e) => {
        this.setState({ otherSubjectValue: e.target.value }, () => { this.setOrderData(); });
    }

    //changeTopic
    changeTopic = (e) => {
        this.setState({ topicValue: e.target.value }, () => { this.setOrderData(); });
    }

    //changeDetail
    changeDetail = (e) => {
        this.setState({ detailValue: e.target.value }, () => { this.setOrderData(); });
        if (e.target.value.length > 0) { this.setState({ detailValidation: '' }); }
        else { this.setState({ detailValidation: 'Enter Paper Instructions for complete your Order' }); }
    }

    //ChangeDeadline
    changeDeadline = (e) => {
        this.setState({ orderDeadline: "" });
        this.setState({ deadlineValue: e, day: e, deadline: e.value, deadlineLable: e.name, duration: e.duration, orderDeadline: e.name },
            () => {
                var deadline = {
                    "digit": e.value,
                    "durations": e.duration,
                    "label": e.label
                }
                localStorage.setItem('calculator_deadline', JSON.stringify(deadline))
                this.setOrderData();
            }
        );
    }

    // IncrementCounter
    incrementCounter = () => {

        let nCount;
        // if(this.state.serviceType && this.state.serviceType === 2) {    }
        // else {   nCount = this.state.noOfPage + 1;   }

        nCount = this.props.current_slide + 1;

        this.storeRightData('slide', nCount);

        this.setState({ noOfPage: nCount }, () => { this.setOrderData(); });
        this.props.changeSlide(nCount);

    }

    // incrementCounterPage
    incrementCounterPage = () => {
        let nCount = this.state.noOfPage + 1;
        this.storeRightData('page', nCount);
        this.setState({ noOfPage: nCount }, () => { this.setOrderData(); });
    }

    // DecrementCounter
    decrementCounter = () => {

        let nCount;
        nCount = this.props.current_slide - 1;

        if (nCount <= 0) { nCount = 1; }
        this.storeRightData('slide', nCount);

        this.setState({ noOfPage: nCount }, () => { this.setOrderData(); });
        this.props.changeSlide(nCount);
    }

    // DecrementCounter
    decrementCounterPage = () => {
        let nCount = this.state.noOfPage - 1;
        if (nCount <= 0) { nCount = 1; }
        this.storeRightData('page', nCount);
        this.setState({ noOfPage: nCount }, () => { this.setOrderData(); });
    }

    //changeFile
    changeFile = (e) => {

        // set loader
        this.setState({ isFileLoader: true });

        var files = e.target.files;
        var fArray = this.state.uploadedFiles;
        var fileSize = 0;

        for (var i = 0; i < files.length; i++) {

            let lastModified = files[i].lastModified || 0;
            let lastModifiedDate = files[i].lastModifiedDate || null;
            let name = files[i].name || '';
            let size = files[i].size || 0;
            let type = files[i].type || '';
            let webkitRelativePath = files[i].webkitRelativePath || null;

            fArray.push({ lastModified, lastModifiedDate, name, size, type, webkitRelativePath });
            fileSize += files[i].size;
        }

        this.setState({ fileArray: files });

        // set files in localstorage
        var fileToken = JSON.stringify(fArray);
        localStorage.setItem("orderFileUpload", fileToken);

        this.setState({ uploadedFiles: fArray });

        // upload file automatic
        this.uploadFilesHandler();
    }

    //removeFile
    removeFile = (data) => {
        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);
        const { uploadedToken } = this.state;

        var array = this.state.uploadedFiles; // make a separate copy of the array
        var index = array.indexOf(data);
        if (uploadedToken) {
            let uploadTokenDecode = jwtDecode(uploadedToken);
            const result = uploadTokenDecode.filter(file => file.file_name1 === array[index].name);

            if (result.length > 0) {

                const formData = new FormData();
                formData.append("user_token", convertedToken ? convertedToken.value : '');
                formData.append("uploaded_token", uploadedToken ? uploadedToken : '');
                formData.append("order_id", this.state.orderId ? this.state.orderId : '');
                if (index > -1) { formData.append("file_name", array[index].name); }

                apiHelper('deleteMaterial', 'POST', formData, null).then(res => {
                    if (res.data.status) {
                        const data = res.data.data;
                        this.setState({ uploadedToken: data.uploaded_token })
                        localStorage.setItem('uploadedToken', data.uploaded_token);
                    }
                }).catch(error => console.error(`Error: ${error}`));
            }
        }
        if (index > -1) {
            array.splice(index, 1);
            this.setState({ uploadedFiles: [...array] })
            localStorage.setItem("orderFileUpload", JSON.stringify(array));
        }
    }

    //componentDidMount
    componentDidMount() {

        this._unmounted = true;

        if (this._unmounted) {

            // first check that user has logged or not
            this.checkLogin();

            // get paperList
            this.getPaperList();

            // get subjectList
            this.getSubjectList();

            // get deadlineList
            this.getDeadlineList();

            if (Router.router && Router.router.query) {
                var orderId = Router.router.query.order_id
                if (orderId && orderId !== '') {
                    this.setState({
                        orderId: orderId
                    })
                }
            }
            this.setDefaultVal()

            if (typeof window !== 'undefined') {
                this.setState({
                    windowWidth: window.innerWidth
                })
            }
        }
    }

    componentWillUnmount() {
        this._unmounted = false;
    }

    setDefaultVal = () => {

        if (this._unmounted) {
            var paper = 'Essay (Any Type)';
            var storedFiles = localStorage.getItem("orderFileUpload");
            if (storedFiles && storedFiles !== '') {
                storedFiles = JSON.parse(storedFiles);
                this.setState({ uploadedFiles: storedFiles });
            }

            var savedFileToken = localStorage.getItem('uploadedToken');
            if (savedFileToken && savedFileToken !== '') { this.setState({ uploadedToken: savedFileToken }); }

            var orderToken = localStorage.getItem("orderToken");
            if (orderToken && orderToken !== '') {
                var decodeOrder = jwtDecode(orderToken);


                this.setState({ storedToken: decodeOrder });
                if (decodeOrder && decodeOrder.paper === 127) { this.setState({ isPlagOption: true }); }
                else { this.setState({ isPlagOption: false }); }


                if (decodeOrder) {
                    this.setState({
                        topicValue: decodeOrder.topic ? decodeOrder.topic : "Writer's Choice",
                        detailValue: decodeOrder.add_detail,
                        serviceType: decodeOrder.service ? decodeOrder.service : 3,
                        writerType: decodeOrder.academic ? decodeOrder.academic : 3,
                        subjectValue: { label: decodeOrder.subject_label !== '' ? decodeOrder.subject_label : "English", value: decodeOrder.subject ? decodeOrder.subject : 18 },
                        noOfPage: decodeOrder.service === 2 ? (decodeOrder.slide ? decodeOrder.slide : 1) : (decodeOrder.page ? decodeOrder.page : 1)
                    });

                    this.props.setTotalPrice(decodeOrder.totalPrice)

                    this.storeRightData('ppSlideCost', decodeOrder.slideCost ? (decodeOrder.slideCost).toString() : '');
                    this.storeRightData('pageCost', decodeOrder.pageCost ? (decodeOrder.pageCost).toString() : '');

                    // SET total price OF sidebar
                    if (decodeOrder.service === 2) {
                        this.setState({ sidebarTotalPrice: decodeOrder.slideTotal ? (decodeOrder.slideTotal).toString() : '0.00' });

                        this.storeRightData('ppSlideTotal', decodeOrder.slideTotal ? (decodeOrder.slideTotal).toString() : '');

                        this.props.changeSlide(decodeOrder.slide ? decodeOrder.slide : 1);
                        this.storeRightData('slide', decodeOrder.slide ? decodeOrder.slide : 1);
                        this.storeRightData('page', 0);

                    } else {
                        this.setState({ sidebarTotalPrice: decodeOrder.totalPrice ? (decodeOrder.totalPrice).toString() : '0.00' });

                        this.storeRightData('totalCost', decodeOrder.pageTotal ? (decodeOrder.pageTotal).toString() : '');
                        this.props.changeSlide(0);
                        this.storeRightData('slide', 0);
                        this.storeRightData('page', decodeOrder.page ? decodeOrder.page : 1);

                    }
                    this.storeRightData('level', (decodeOrder.academic === 3 ? 'College' : (decodeOrder.academic === 1 ? 'Bachelor' : 'Master')))
                    this.storeRightData('subject', decodeOrder.subject_label !== '' ? decodeOrder.subject_label : "English")

                    // Set Writer's Choice Value of service
                    var defaultServiceId = decodeOrder.service ? (decodeOrder.service).toString() : '3';
                    var sList = this.state.serviceList;
                    for (var i = 0; i < sList.length; i++) {
                        if (sList[i].value === defaultServiceId) { this.storeRightData('service', sList[i].name); }
                    }

                    let cp = localStorage.getItem("calculator_pages");
                    let cd = localStorage.getItem("calculator_deadline");
                    let cw = localStorage.getItem("calculator_word");

                    let ddValue = JSON.parse(cd);
                    let ddNewValue = { label: "19 Days / September 14, 2021 11:25 AM", value: 19 };
                    let fulldd_label = '';

                    if (ddValue) {
                        fulldd_label = ddValue.digit && ddValue.digit + " " + ddValue.durations && ddValue.durations + " / " + ddValue.label && ddValue.label;
                        ddNewValue = { label: fulldd_label, value: ddValue.digit };
                    }

                    if (cp && JSON.parse(cp)) {
                        this.setState({
                            paperValue: JSON.parse(cp),
                        });
                    }

                    this.setState({
                        deadlineValue: ddNewValue,
                        // noOfPage: JSON.parse(cw) && JSON.parse(cw).id
                    });

                    // let cur_s = JSON.parse(cw) && JSON.parse(cw).id;
                    // this.props.changeSlide(cur_s);

                    var deadlineLabel = ((ddValue.label).indexOf('/') > -1) ? ((ddValue.label).split('/'))[1] : ddValue.label

                    this.setState({
                        deadline: ddValue.digit,
                        duration: ddValue.durations,
                        deadlineLable: deadlineLabel,
                        deadlineid: ddValue.digit
                    });

                    paper = decodeOrder.paper_label && decodeOrder.paper_label

                }

            }

            // set default spacing value in order right
            this.storeRightData('spacing', 'Double-spaced');
            this.storeRightData('paper', paper);
            this.setState({
                isorderChanged: !this.state.isorderChanged
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._unmounted) {
            if (this.props.currentStep != prevProps.currentStep && this.props.currentStep === 1) {
                if (Router.router && Router.router.query) {
                    var orderId = Router.router.query.order_id
                    if (orderId && orderId !== '') {
                        this.setState({
                            orderId: orderId
                        })
                    }
                }
                this.setDefaultVal()
            }
        }
    }

    //checkLogin
    checkLogin = () => {
        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);

        if (loginToken) {
            const now = new Date();
            if (now.getTime() > convertedToken.expiry) {
                localStorage.removeItem('token');
                Router.push('/login');
            }
        }
    }

    //getPaperList
    getPaperList = async () => {
        apiHelper('displaypapertypes', 'GET', null, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;

                let myPaperOpt = []; // popular 
                (data.popular_papers).forEach(pop_p => { myPaperOpt.push({ label: pop_p.paper_name, value: pop_p.paper_id }); });

                let myOtherOpt = []; // other
                (data.other_papers).forEach(pop_p => { myOtherOpt.push({ label: pop_p.paper_name, value: pop_p.paper_id }); });

                let popularArr = { label: "Popular Papers", options: myPaperOpt };
                let otherArr = { label: "Other Papers", options: myOtherOpt };

                let paperArr = [];
                paperArr.push(popularArr);
                paperArr.push(otherArr);
                this.setState({ paperList: paperArr });
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    //getSubjectList
    getSubjectList = async () => {
        // popular subject
        apiHelper('displaypopularsubject', 'GET', null, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;

                // other subject
                apiHelper('displayothersubject', 'GET', null, null).then(res => {
                    if (res.data.status) {
                        const data2 = res.data.data;

                        let mySubOpt = [];
                        data.forEach(otherS => { mySubOpt.push({ label: otherS.subject_name, value: otherS.id }); });

                        let myOtherSubOpt = [];
                        data2.forEach(otherS => { myOtherSubOpt.push({ label: otherS.subject_name, value: otherS.id }); });

                        let popularSArr = { label: "Popular Subject", options: mySubOpt };
                        let otherSArr = { label: "Other Subject", options: myOtherSubOpt };

                        let subjectArr = [];
                        subjectArr.push(popularSArr);
                        subjectArr.push(otherSArr);

                        this.setState({ subjectList: subjectArr });
                    }
                }).catch(error => console.error(`Error: ${error}`));
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    //getDeadlineList
    getDeadlineList = async () => {

        var localTime = moment.tz.guess();

        var timezone = 'Europe/London';
        var userToken = localStorage.getItem("token");

        if (userToken && userToken !== '') {
            userToken = JSON.parse(userToken);
            var decodeToken = jwtDecode(userToken.value);
            if (decodeToken && decodeToken.timezone && decodeToken.timezone !== '') {
                timezone = decodeToken.timezone;
            }
        }

        const formData = new FormData();
        formData.append("timezone", localTime ? localTime : timezone);

        apiHelper('displaydealineformat', 'POST', formData, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;

                var date_val = data[data.length - 1];
                this.setState({
                    defaultDay: date_val.deadline,
                    defaultDuration: date_val.duration,
                    defaultDeadline: date_val.deadline_label,
                    defaultDeadlineOption: `${date_val.deadline} ${date_val.duration} / ${date_val.deadline_label}`
                })

                let myDeadlineOpt = [];
                (data).forEach(dateD => {
                    myDeadlineOpt.push({
                        label: `${dateD.deadline} ${dateD.duration} / ${dateD.deadline_label}`,
                        value: dateD.deadline,
                        duration: dateD.duration,
                        name: dateD.deadline_label
                    });
                });
                this.setState({ deadlineList: myDeadlineOpt });
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    //uploadFilesHandler
    uploadFilesHandler = () => {
        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);

        const { uploadedToken, orderId, fileArray } = this.state;

        const formData = new FormData();
        formData.append("user_token", convertedToken ? convertedToken.value : '');
        formData.append("uploaded_token", uploadedToken ? uploadedToken : '');
        formData.append("order_id", orderId ? orderId : '');

        var array = fileArray; // make a separate copy of the array

        for (var i = 0; i < array.length; i++) {
            formData.append(`material`, array[i]);
        }

        apiHelper('uploadmaterial', 'POST', formData, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;
                this.setState({ uploadedToken: data.uploaded_token });
                localStorage.setItem('uploadedToken', data.uploaded_token);

                // set loader
                this.setState({ isFileLoader: false });
            }
            else {
                // set loader
                this.setState({ isFileLoader: false });
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    //otherPaperChangeHandler
    otherPaperChangeHandler = () => {
        this.setState({ paperOtherPaperType: e.target.value }, () => { this.setOrderData(); });
    }

    //setDiscount
    // setDiscount = (token) => {
    //     // localStorage.setItem('discount_token', token);
    //     // this.storeRightData('discount_token', token);
    //     this.setState({ discountCoupon: token }, () => { this.setOrderData(); });
    // }

    setOrderData = async () => {

        var localTime = moment.tz.guess();

        var order_token = localStorage.getItem("orderToken");
        let decodeToken = null;
        if (order_token && order_token !== '') {
            decodeToken = jwtDecode(order_token);
        }

        const loginToken = localStorage.getItem('token');
        var convertedUserToken = loginToken && loginToken !== '' ? JSON.parse(loginToken) : null;

        const formData = new FormData();
        formData.append("service", this.state.serviceType);
        formData.append("page", this.state.serviceType && this.state.serviceType !== 2 && this.state.noOfPage ? this.state.noOfPage : 0);
        formData.append("set_spacing", this.state.spacingType);
        formData.append("academic", this.state.writerType);
        formData.append("paper", this.state.paperValue ? this.state.paperValue.value : 1);
        formData.append("other_paper", this.state.paperOtherPaperType);
        formData.append("subject", this.state.subjectValue ? this.state.subjectValue.value : 18);
        formData.append("other_subject", this.state.otherSubjectValue);
        formData.append("formated_style", decodeToken && decodeToken.formated_style);
        formData.append("other_format", decodeToken && decodeToken.other_format);
        formData.append("source", decodeToken && decodeToken.source);
        formData.append("discipline", decodeToken && decodeToken.discipline);
        formData.append("topic", this.state.topicValue ? this.state.topicValue : `Writer's Choice`);
        formData.append("add_detail", this.state.detailValue ? this.state.detailValue : '');
        formData.append("timezone", localTime ? localTime : 'Europe/London');
        formData.append("deadline", this.state.deadline);
        formData.append("duration", this.state.duration);
        formData.append("coupon_code", decodeToken && decodeToken.coupon_code ? decodeToken.coupon_code : '');
        formData.append("slide", this.state.serviceType && this.state.serviceType === 2 ? this.state.noOfPage : 0);
        formData.append("chart", decodeToken && decodeToken.chart);
        formData.append("preferred_writer", decodeToken && decodeToken.preferred_writer);
        formData.append("writer_id", decodeToken && decodeToken.writer_id ? decodeToken.writer_id : '');
        formData.append("additionalextra", decodeToken && decodeToken.additionalextra);
        // formData.append("order_token", order_token && order_token);
        formData.append("user_token", convertedUserToken && convertedUserToken.value ? convertedUserToken.value : '');
        // formData.append("discount_token", this.state.discountCoupon ? this.state.discountCoupon : '');

        formData.append("deadlineLable", this.state.deadlineLable);
        formData.append("deadlineid", this.state.deadlineValue ? this.state.deadlineValue.value : 0);

        apiHelper('setOrderV1', 'POST', formData, null).then(res => {
            if (res.data.status) {
                const data = res.data.data;

                localStorage.setItem("orderToken", data.order_token);

                let token = data.order_token;
                let cost = jwtDecode(token);

                if (cost.service === 2) { this.setState({ sidebarTotalPrice: cost.slideTotal ? (cost.slideTotal).toString() : '0.00' }); }
                else { this.setState({ sidebarTotalPrice: cost.totalPrice ? (cost.totalPrice).toString() : '0.00' }); }

                if (cost.service === 2) {
                    this.storeRightData('ppSlideCost', cost.slideCost);
                    this.storeRightData('ppSlideTotal', cost.slideTotal);
                    this.storeRightData('discountTotal', 0);
                }
                else {
                    this.storeRightData('pageCost', cost.pageCost);
                    this.storeRightData('totalCost', cost.pageTotal);
                    this.storeRightData('discountTotal', 0);
                }
                if (parseFloat(cost.couponDisc) > 0 && cost.couponDisc !== '') {
                    this.storeRightData('discountTotal', cost.totalPrice);
                }

                this.setState({ isorderChanged: !this.state.isorderChanged });
                this.props.setTotalPrice(cost.totalPrice)
            }
        }).catch(error => console.error(`Error: ${error}`));
    }

    //nextStep
    nextStep = () => {
        if (this.state.detailValue.length < 1) {
            this.setState({ detailValidation: "Enter Paper Instructions for complete your Order" }, () => {
                this.detailInput.focus();
            });
        }
        else {
            if (this.state.detailValue.split(" ").length < 3) {
                this.setState({ detailValidation: "Paper Instructions must have at least 3 words" }, () => {
                    this.detailInput.focus();
                });
            }
            else {
                this.setState({ detailValidation: "" });
                if (this.props.router && this.props.router.asPath && this.props.router.asPath === '/price') {
                    Router.push('/order')
                } else {
                    this.props.onChangeNext(1);
                }
            }
        }
    }

    //submitFirstStep
    submitFirstStep = () => {
        if (this.state.detailValue.length < 1) {
            this.setState({ detailValidation: "Enter Paper Instructions for complete your Order" }, () => {
                this.detailInput.focus();
            });
        }
        else {
            if (this.state.detailValue.split(" ").length < 3) {
                this.setState({ detailValidation: "Paper Instructions must have at least 3 words" }, () => {
                    this.detailInput.focus();
                });
            }
            else {
                this.setState({ detailValidation: "" });
                localStorage.setItem("onceStep", JSON.stringify([1, 2]))
                this.props.submitFirstStep();
            }
        }
    }

    render() {
        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: orderCss }}></style>
                <style dangerouslySetInnerHTML={{ __html: ReactToastifyCss }}></style>
                <div className="row">
                    <div className="col-md-8">
                        <div className="section-part leftSide">

                            {this.props.router && this.props.router.asPath && (this.props.router.asPath === '/price' || (this.props.router.asPath === '/order' && !localStorage.getItem('token'))) ?
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="section-title">Place an order</h2>
                                    </div>
                                </div> :
                                null}

                            {/* Toggle Is plag Option */}
                            {this.state.isPlagOption === true ? null :
                                <>
                                    {/* Type of Serive */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p> Type of Service
                                                    <span id="TooltipExample1">
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
                                                </p>
                                                <UncontrolledTooltip placement="right" target="TooltipExample1">
                                                    Please select the type of service you need help with. We
                                                    offer writing from Scratch, Editing and Powerpoint
                                                    Presentation. If you're not sure of the service, please
                                                    contact our Customer Support.
                                                </UncontrolledTooltip>
                                            </div>
                                            <div className="col-md-8">
                                                <ButtonGroup className="list d-flex flex-nowrap">
                                                    {this.state.serviceList && this.state.serviceList.map((ser, idx) => (
                                                        <ToggleButton
                                                            key={idx}
                                                            id={"service_" + idx}
                                                            type="radio"
                                                            value={ser.value}
                                                            checked={this.state.serviceType === ser.value}
                                                            onChange={(e) => this.changeService(e)}> {ser.name}
                                                        </ToggleButton>
                                                    ))}
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Writer Level */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>  Writer Level
                                                    <span id="te2">
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
                                                </p>
                                                <UncontrolledTooltip placement="right" target="te2">
                                                    Please choose the Writer's level. The level you should choose should match the Academic level you're currently in.
                                                </UncontrolledTooltip>
                                            </div>
                                            <div className="col-md-8">
                                                <ButtonGroup className="list d-flex flex-nowrap">
                                                    {this.state.writerList && this.state.writerList.map((wr, idx) => (
                                                        <ToggleButton
                                                            key={idx}
                                                            id={"writer__" + idx}
                                                            type="radio"
                                                            value={wr.value}
                                                            checked={this.state.writerType === wr.value}
                                                            onChange={(e) => this.changeWriter1(e)} >{wr.name}
                                                        </ToggleButton>
                                                    ))}
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </div>

                                </>}

                            {/* Type of paper */}
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p>Type of Paper
                                            <span id="TooltipExample3">
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
                                        </p>
                                        <UncontrolledTooltip placement="right" target="TooltipExample3">
                                            Please select the most suitable type of paper needed. We
                                            offer any academic help from essays to dissertations. If
                                            it's not listed here, you may select ''other paper'' then
                                            specify the type on the field provided.
                                        </UncontrolledTooltip>
                                    </div>

                                    <div className="col-md-8">
                                        <Select
                                            instanceId="paperDD"
                                            value={this.state.paperValue}
                                            onChange={(e) => this.changePaper(e)}
                                            options={this.state.paperList && this.state.paperList}
                                            classNamePrefix="selectInput"
                                            isSearchable={this.state.windowWidth < 1199 ? false : true}
                                            // placeholder={this.state.paperPlaceholder}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        />

                                    </div>
                                </div>

                                {/* Other Type of Paper */}
                                {this.state.storedToken && this.state.storedToken.paper === 33 || this.state.selectedPaperOption && this.state.selectedPaperOption.value === 33 ?
                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <p>Other Type of Paper</p>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                value={this.state.paperOtherPaperType}
                                                className="form-control"
                                                type="text"
                                                placeholder="Specify the Type of Paper"
                                                onChange={this.otherPaperChangeHandler} />
                                        </div>
                                    </div>
                                    : null}
                            </div>

                            {/* Toggle Is plag option */}
                            {this.state.isPlagOption === true ? null :
                                <>
                                    {/* Type of Subject */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p> Subject
                                                    <span id="te4">
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
                                                </p>
                                                <UncontrolledTooltip placement="right" target="te4">
                                                    Please choose the subject of your paper. If none of the
                                                    subjects applies, choose ''Other Subject'' and provide
                                                    additional information on the field provided.
                                                </UncontrolledTooltip>
                                            </div>

                                            <div className="col-md-8">
                                                <Select
                                                    instanceId="subDD"
                                                    value={this.state.subjectValue}
                                                    onChange={this.changeSubject}
                                                    options={this.state.subjectList && this.state.subjectList}
                                                    classNamePrefix="selectInput"
                                                    isSearchable={this.state.windowWidth < 1199 ? false : true}
                                                    placeholder={this.state.subjectPlaceholder}
                                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </div>

                                        {/* Show when subjectvalue is   */}
                                        {this.state.subjectValue && this.state.subjectValue === 49 ?
                                            <div className="row mt-2">
                                                <div className="col-md-4">
                                                    <p>Other Subject</p>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        value={this.state.otherSubjectValue}
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Type of Your Subject"
                                                        onChange={this.changeOtherSubject}
                                                    />
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>

                                    {/* Number of Pages */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p> Number of
                                                    {this.state.serviceType && this.state.serviceType === 2 ? " Slides" : " Pages"}
                                                    <span id="te6">
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
                                                </p>
                                                <UncontrolledTooltip placement="right" target="te6" >
                                                    One page is approximately 280 words. Bibliography and
                                                    title page are free of charge, so you do not need to
                                                    include them in the total number of pages. If your
                                                    assignment cannot be measured in words/pages (computer
                                                    programs, etc.) please contact our Customer Support
                                                    for assistance.
                                                </UncontrolledTooltip>
                                            </div>
                                            <div className="col-md-8">

                                                <ButtonGroup className="list d-flex">
                                                    {this.state.serviceType && this.state.serviceType === 2 ?
                                                        <div className="numberOfPages">
                                                            <span className="counter" onClick={this.decrementCounter}>&#8722; </span>
                                                            <span className="count"> {this.props.current_slide}</span>
                                                            <span className="counter" onClick={this.incrementCounter}> &#43;</span>
                                                        </div>
                                                        :
                                                        <div className="numberOfPages">
                                                            <span className="counter" onClick={this.decrementCounterPage}>&#8722; </span>
                                                            <span className="count"> {this.state.noOfPage}</span>
                                                            <span className="counter" onClick={this.incrementCounterPage}> &#43;</span>
                                                        </div>
                                                    }

                                                    {this.state.spacingList && this.state.spacingList.map((sp, idx) => (
                                                        <ToggleButton key={idx}
                                                            type="radio"
                                                            id={"no_of_" + idx}
                                                            value={sp.value}
                                                            checked={this.state.spacingType === sp.value}
                                                            onChange={(e) => this.changeSpacing(e)}>{sp.name}
                                                        </ToggleButton>
                                                    ))}
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            {/* Topic */}
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p> Topic
                                            <span id="te8">
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
                                        </p>
                                        <UncontrolledTooltip placement="right" target="te8" >
                                            This is the topic of your paper. It is very important to
                                            state your topic clearly now as you cannot change it once
                                            the writer starts working on your paper. If you don't have
                                            any topic, leave it as Writer's Choice.
                                        </UncontrolledTooltip>
                                    </div>
                                    <div className="col-md-8">
                                        <input value={this.state.topicValue}
                                            className="form-control"
                                            type="text"
                                            placeholder="Writer's choice"
                                            onChange={this.changeTopic} />
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Is plag option */}
                            {this.state.isPlagOption ? null :
                                <>
                                    {/* Detail */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p> Details
                                                    <span id="teDesc">
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
                                                </p>
                                                <UncontrolledTooltip placement="right" target="teDesc" >
                                                    You can include paper structure and/or outline, types and
                                                    number of references to be used, grading scale or any
                                                    other requirements…
                                                </UncontrolledTooltip>
                                            </div>
                                            <div className="col-md-8">
                                                <textarea className="form-control"
                                                    ref={(input) => { this.detailInput = input; }}
                                                    value={this.state.detailValue}
                                                    placeholder="Detail"
                                                    onChange={this.changeDetail}> </textarea>
                                                <p className="error-text">{this.state.detailValidation}</p>
                                            </div>
                                        </div>
                                    </div></>
                            }

                            {/* upload File */}
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p> Additional materials
                                            <span id="TooltipExample10">
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
                                        </p>
                                        <UncontrolledTooltip placement="right" target="TooltipExample10">
                                            Details - Use this area to submit instructions for our
                                            team and the writer. Please try to be as detailed as
                                            possible. The more info we have about your work, the
                                            quicker we can find the best writer for your project and
                                            the sooner the writer will catch on. If you have lots of
                                            info to submit, just type in the main points.
                                        </UncontrolledTooltip>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="dropzoneInput">
                                            <input type="file" name="files[]" onChange={this.changeFile} multiple={true} />

                                            {this.state.isDragActive ? (<p className="mb-0 label"> or <span>Drop files here</span> </p>)
                                                : (<>  <button className="browse-btn">Browse</button>
                                                    <p className="mb-0 label"> or <span>Drop files here</span></p>
                                                </>)}
                                        </div>
                                        {this.state.uploadedFiles && this.state.uploadedFiles.length > 0 ?
                                            <ul className="fileListing">
                                                {this.state.uploadedFiles.map((info, i) => (
                                                    <li key={i} className="d-flex align-items-center">
                                                        <span className="attchment-icon"><AttachmentIcon /></span>

                                                        {(((parseInt(i) + 1) === (this.state.uploadedFiles).length) && this.state.isFileLoader === true)
                                                            ?
                                                            <><ProgressBar animated style={{ width: "80%", height: "0.5rem" }} variant="success" now={80} /></>
                                                            :
                                                            <>
                                                                <ProgressBar variant="success" now={40} />
                                                                <p>{info.name} ({(info.size / (1024 * 1024)).toFixed(2)}MB)</p>
                                                                <button aria-label="Button Delete" type="button" onClick={() => this.removeFile(info)}>
                                                                    <RemoveIcon />
                                                                </button>
                                                            </>
                                                        }
                                                    </li>
                                                ))}
                                            </ul> :
                                            null}
                                    </div>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="form-group mb-0">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p> Deadline
                                            <span id="TooltipExample11">
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
                                        </p>
                                        <UncontrolledTooltip placement="right" target="TooltipExample11" >
                                            Upload - You can upload additional instructions, readings,
                                            list of sources to be used or any other information. Make
                                            sure not to attach any files containing your personal
                                            information.
                                        </UncontrolledTooltip>
                                    </div>
                                    <div className="col-md-8 selectInputDeadline">

                                        <Select
                                            instanceId="deadlineDD"
                                            value={this.state.deadlineValue}
                                            onChange={this.changeDeadline}
                                            options={this.state.deadlineList && this.state.deadlineList}
                                            classNamePrefix="selectInput"
                                            isSearchable={this.state.windowWidth < 1199 ? false : true}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                        />

                                        <span className="deadlineLabel">Order will be ready before {this.state.deadline + " " + this.state.duration + " " + this.state.deadlineLable} </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {(typeof window !== "undefined" && this.state.orderId && this.state.orderId !== '') ?
                            <div className="text-end mt-4">
                                <button onClick={() => this.props.saveOrder(true)} className="btn theme-btn"> Save</button>
                            </div>
                            : null}
                    </div>

                    {/* OrderSidebarRight */}
                    <OrderSidebarRight
                        isorderChanged={this.state.isorderChanged && this.state.isorderChanged}
                        currentStep={this.props.currentStep}
                        isPlagOption={this.state.isPlagOption}
                        // setDiscount={(t) => this.setDiscount(t)}
                        // discountCoupon={this.state.discountCoupon}
                        enteredTopic={this.state.topicValue}
                        sidebarTotalPrice={this.state.sidebarTotalPrice}
                        onNext={this.nextStep}
                        submitFirstStep={this.submitFirstStep}
                        onSkipNext={this.skipStep} />
                </div>
            </>
        )
    }
}

export default MyClassWithRouter