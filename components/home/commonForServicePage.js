import React, { useState, useEffect } from "react";

// components
import HeaderSection from "../header/headerSection";
import HireWriter from "../home/hireWriter";
import AssignmentService from "../service/assignmentService";
import AdsBanner from "../home/adsBanner";
import Feedback from "../home/feedback";
import Service from "../home/service";
import Content from "../home/content";
import Contact from "../home/contact";
import Faq from "./faq";
import OrderNow from "../service/orderNow";
import AlsoLike from "../service/alsoLike";

// Html Parser
import parse from "html-react-parser";

// scss
import serviceCss from "../../styles/service.scss";

// API helper
import { ukApiHelper } from "../../helper/apiHelper";

let mainMenu = [
  'custom-essay',
  'assignment-writing-service',
  'research-paper-writing-services',
  'coursework-writing-services',
  'case-study-writing'
]

export default function Home(props) {
  const [serviceTitle, setServiceTitle] = useState([]);
  const [serviceDesc, setServiceDesc] = useState([]);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    // getServiceData();
    if (props.content) {
      setServiceTitle(props.content.page_contents.initial_pitch_content);
      setServiceDesc(props.content.page_contents.main_header);
      setServiceData(props.content)
    }
  }, [props.content]);

  // const getServiceData = () => {
  //   ukApiHelper(`servicesV1?page=${props.serviceName}`, "GET", null, null)
  //     .then((res) => {
  //       if (res.data.status) {
  //         const data = res.data.data;
  //         setServiceTitle(data.page_contents.initial_pitch_content);
  //         setServiceDesc(data.page_contents.main_header);
  //         setServiceData(data)
  //       }
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: serviceCss }}></style>
      <HeaderSection serviceData={serviceData} />
      <HireWriter
        title={parse(serviceTitle.toString())}
        desc={parse(serviceDesc.toString())}
        serviceType={props.serviceName}
      />
      <AssignmentService guaranteeContent={serviceData} />
      <AdsBanner src="/discount-banner.svg" serviceContent={serviceData} />
      <Feedback pageName={props.serviceName} />
      <OrderNow />
      <Service serviceData={serviceData} />
      <Content serviceData={serviceData} />
      <AdsBanner adsbanner={true} serviceContent={serviceData} />
      {mainMenu && mainMenu.length > 0 ?
        mainMenu.map((info, i) => {
          if (info === props.serviceName) {
            <AlsoLike serviceName={props.serviceName} />
          }
        })
        :
        null}
      <Faq faqData={serviceData && serviceData} />
      <Content bottomContent={true} serviceData={serviceData} />
      <Contact />
    </>
  );
}
