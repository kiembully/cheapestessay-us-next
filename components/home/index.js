import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";

// components
const HeaderSection = dynamic(() => import('../header/headerSection'));
const HireWriter = dynamic(() => import("./hireWriter"));
const Assignment = dynamic(() => import("./assignment"));
const AdsBanner = dynamic(() => import("./adsBanner"));
const Feedback = dynamic(() => import("./feedback"));
const Feature = dynamic(() => import("./feature"));
const Service = dynamic(() => import("./service"));
const Content = dynamic(() => import("./content"));
const Faq = dynamic(() => import("./faq"));
const Contact = dynamic(() => import("./contact"));
const AcademicService = dynamic(() => import("./academicService"));

// Html Parser
import parse from "html-react-parser";

// API helper
import { ukApiHelper } from "../../helper/apiHelper";

var webSchema = `{
                  "@context": "https://schema.org",
                  "@type": "Website",
                  "name": "Cheapest Essay",
                  "url": "https://www.cheapestessay.com/",
                  "inLanguage": "en-US"
                }`;

var viewSchema = `[{
                    "@context": "https://schema.org",
                    "@type": "ViewAction",
                    "target": {
                      "@type":	"EntryPoint",
                      "urlTemplate": "android-app://com.cheapestessay.service/https/www/cheapestessay.com"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "ViewAction",
                    "target": {
                      "@type":	"EntryPoint",
                      "urlTemplate": "ios-app://1447217562/https/www/cheapestessay.com"
                    }
                  }]`

const Home = (props) => {

  var orgSchema = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cheapest Essay",
    "url": "https://www.cheapestessay.com/",
    "logo": "${process.env.hostBaseUrl}/logo.svg",
    "description": "${props.metaDescription ? (props.metaDescription).replace(/"/g, '&quot;') : ''}",
    "email": "support@cheapestessay.com",
    "sameAs":	["https://www.facebook.com/CheapestEssay/","https://twitter.com/CheapestEssay","https://www.instagram.com/cheapestessay/","https://www.youtube.com/channel/UCP45PAPiPMtFsmqNpkPJ8dg","https://www.linkedin.com/company/cheapest-essay","https://www.tiktok.com/@cheapestessay","https://www.sitejabber.com/reviews/cheapestessay.com","https://www.trustpilot.com/review/cheapestessay.com"],
    "foundingDate": "2014",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Columbus Ohio",
      "postOfficeBoxNumber": "43229",
      "addressLocality": "Columbus",
      "addressRegion": "Ohio",
      "postalCode":	"43229",
      "addressCountry": {
        "@type": "Country",
        "name":	"USA"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(+)1.909.441.1414",
      "contactType": "customer support"
    }
  }`;

  const [serviceTitle, setServiceTitle] = useState([]);
  const [serviceDesc, setServiceDesc] = useState([]);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    getServiceContent();
  }, []);

  const getServiceContent = () => {
    ukApiHelper("servicesV1?page=index", "GET", null, null)
      .then((res) => {
        if (res.data.status) {
          const data = res.data.data;
          setServiceData(data)
          setServiceTitle(data.page_contents.initial_pitch_content);
          setServiceDesc(data.page_contents.main_header);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <>

      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(viewSchema) }} />
      </Head>

      <HeaderSection serviceData={serviceData} />
      <HireWriter
        title={parse(serviceTitle.toString())}
        desc={parse(serviceDesc.toString())}
      // title="Hire Committed Essay Writers UK For Prodigious Results"
      // desc="We have onboarded a group of talented UK-based writers dedicated to offering you top-quality essays. Click on their profile to know what client’s have to say about them. Make your decision based on the client's reviews and completion rates."
      />
      <Assignment />
      <AdsBanner src="/discount-banner.svg" serviceContent={serviceData} />
      <Feedback pageName="index" />
      <Feature />
      <AcademicService />
      <Service serviceData={serviceData} />
      <AdsBanner adsbanner={true} serviceContent={serviceData} />
      <Content serviceData={serviceData} />
      <Faq faqData={serviceData} />
      <Contact />
    </>
  );
}

export default Home;
