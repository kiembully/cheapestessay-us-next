import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

// components
import MorePageHeader from "../components/otherPages/topHeader";
import FreeFeature from "../components/freeFeature";
import Feedback from "../components/home/feedback";
import Contact from "../components/home/contact";
import Faq from "../components/home/faq";

// API helper
import { ukApiHelper } from "../helper/apiHelper";

// scss
import faqCss from "../styles/faq.scss"

import Img from "../components/Common/image";
import Meta from "../components/meta";

const getFaqDetails = [
    { img: "/faq/about-writer.svg", label: "About the Writers" },
    { img: "/faq/account-security.svg", label: "Account Security" },
    { img: "/faq/order-delivery.svg", label: "Order and Delivery" },
    { img: "/faq/pricing-payment.svg", label: "Pricing and Payment" },
    { img: "/faq/quality-service.svg", label: "Quality of Service" },
];

const Guarantee = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    // search text
    const [searchText, setsearchText] = useState("");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [searchData, setSearchData] = useState(null)

    //changeText
    const changeText = value => {
        let searchTxt = (value).toLowerCase();

        let passedData = null;
        if (value !== '') {
            let fArray = [];

            getContent.forEach(element => {
                let cleanText = ((element.question + " " + element.answer)).replace(/<\/?[^>]+(>|$)/g, "").toLowerCase();

                let fetchedElement = cleanText.search(searchTxt);
                if (parseInt(fetchedElement) >= 0) {
                    fArray.push(element);
                }
            });

            passedData = { ...contentData }
            passedData.faq = fArray
        }

        setSearchData(passedData);
        setsearchText(value);
    }

    useEffect(() => {
        getFaqs();
    }, []);

    const [isLoader, setIsLoader] = useState(true)
    const [contentData, setContentData] = useState(null)
    const [getContent, setGetContent] = useState([])
    const getFaqs = async () => {
        setIsLoader(true)
        await ukApiHelper("servicesV1?page=faqs", "GET", null, null)
            .then((res) => {
                if (res.data.status) {
                    var data = res.data.data;
                    setContentData(data)

                    data = data.faq && data.faq
                    setGetContent(data);

                    setTimeout(() => {
                        setIsLoader(false)
                    }, 50);
                }
            })
            .catch((error) => console.error(`Error: ${error}`));
    };


    const [faqDetail, setFaqDetail] = useState(getFaqDetails)

    return (
        <>

            <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

            <style dangerouslySetInnerHTML={{ __html: faqCss }}></style>
            <div className="faqPage">
                <MorePageHeader title="Cheapest Essay FAQs" desc="Do you have questions about our writing and editing service? If you want to know how our service works then read the answers at FAQs on our site and learn more about our service. These are the collection of frequently asked questions of our customers."
                    href={`${process.env.hostBaseUrl}/order`} btnText="Order Now" src="/faq/faqImg.svg" alt="our Guarantee" />
                <section className="howCanHelp">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title">Hello, How Can We Help?</h2>
                            <p className="desc">Cheapest Essay Frequently Asked Questions by Our Customers About Our Service</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="input-group mb-4 faQform">
                                    <input className="form-control" value={searchText} onChange={(e) => changeText(e.target.value)} type="text" placeholder="Ask Question..." />
                                    <div className="searchBtn" onClick={() => changeText(searchText)}>
                                        <Img src="/faq/search.svg" alt="search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="desc text-center">or choose a catagory to quickly find the help you need</p>
                        <div className="helpInfo">
                            {
                                searchText === '' ?
                                    <>
                                        <Nav tabs>
                                            {faqDetail.map(function (list, index) {
                                                return (
                                                    <NavItem key={index}>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === index })}
                                                            onClick={() => { toggle(index); }}
                                                        >
                                                            <Img src={list.img} alt={list.label} width="40" height="40" />
                                                            <span>{list.label}</span>
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            })}
                                        </Nav>
                                        <TabContent activeTab={activeTab}>
                                            {!isLoader ?
                                                getFaqDetails.map(function (list, index) {
                                                    let faqData = [];
                                                    let passedData = { ...contentData };
                                                    if (getContent && getContent.length) {
                                                        faqData = getContent.filter(function (item) { return (item.category_name).toLowerCase() === list.label.toLowerCase() });
                                                    }
                                                    passedData.faq = faqData;
                                                    return (
                                                        <TabPane key={index} tabId={index}>
                                                            <Faq faqData={passedData} />
                                                        </TabPane>
                                                    )
                                                }) :
                                                null}
                                        </TabContent>
                                    </> :
                                    searchData && searchData.faq && searchData.faq.length > 0 ?
                                        <Faq faqData={searchData} /> :
                                        <div className="noReview-found">No found data</div>
                            }
                        </div>
                    </div>
                </section>
                <FreeFeature />
                <Feedback pageName="faqs" />
                <Contact />
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const DEFAULT_META = process.env.defaultMeta
    const res = await ukApiHelper(`seoV1?page=faqs`, 'GET', null, null)
    const meta = res.data.status ? res.data.data : DEFAULT_META

    return {
        props: {
            meta
        }
    }
}

export default Guarantee;