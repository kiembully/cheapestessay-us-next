import React from "react";

// components
import MorePageHeader from "../components/otherPages/topHeader";
import FreeFeature from "../components/freeFeature";
import Feedback from "../components/home/feedback";
import Contact from "../components/home/contact";
import GuaranteeDetail from "../components/otherPages/guaranteeDetail";
import Meta from "../components/meta";

//api
import { ukApiHelper } from "../helper/apiHelper";


// scss
import guaranteeCss from "../styles/guarantee.scss"

const Guarantee = (props) => {
    return (
        <>
            <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

            <style dangerouslySetInnerHTML={{ __html: guaranteeCss }}></style>
            <div className="guarantee">
                <MorePageHeader title="Our Guarantees" desc="Looking for the best quality essay, experienced writers, and extraordinary client relations? Trust us, with Cheapest Essay; you’ll get all these when you avail our essay writing services. At Cheapest Essay, we completely understand how tough it gets to lay your trust in someone else with your custom academic writing. That’s the reason we guarantee you complete confidentiality of your data, 100% refund, etc. Read on to know more about our guarantees." href={`${process.env.hostBaseUrl}/order`} btnText="Order Now" src="/guarantee/ourGuarantee.svg" alt="our Guarantee" />
                <GuaranteeDetail />
                <FreeFeature />
                <Feedback pageName="guarantees" />
                <Contact />
            </div>
        </>

    )
}

export async function getStaticProps(context) {
    const DEFAULT_META = process.env.defaultMeta
    const res = await ukApiHelper(`seoV1?page=guarantees`, 'GET', null, null)
    const meta = res.data.status ? res.data.data : DEFAULT_META

    return {
        props: {
            meta
        }
    }
}

export default Guarantee;