import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Head from "next/head";

// Html Parser
import parse from 'html-react-parser';

// scss
import faqCss from "./faq.scss";

import Img from "../../Common/image";

const Faq = (props) => {

  var [faqData, setFaqData] = useState([]);
  const [faqTitle, setFaqTitle] = useState('');

  const getRandomString = (length) => {
    var randomChars = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  useEffect(() => {
    if (props.faqData) {
      let myArray = [];
      let i = 1;
      (props.faqData.faq).forEach(element => {
        let uniqueStr = "";
        if (i === 1) {
          uniqueStr = "a";
        }
        else {
          uniqueStr = getRandomString(2).toLowerCase();
        }
        myArray.push({ uuid: uniqueStr, question: element.question, answer: element.answer });
        i++;
      });
      setFaqData(myArray);

      if (props.faqData && props.faqData.page_contents && props.faqData.page_contents.name) {
        var convTitle = parse(props.faqData.page_contents.name)
        if (convTitle && convTitle.props && convTitle.props.children) {
          setFaqTitle(convTitle.props.children)
        }
        else {
          setFaqTitle(props.faqData.page_contents.name)
        }
      }
    }
  }, [props.faqData]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: faqCss }}></style>
      <Head>
        {faqData.length > 0 ?
          <script type="application/ld+json">
            {`
              {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "name": "FAQs",
                  "mainEntity": [                                    
                      ${faqData.map(element =>
                      `{
                            "@type": "Question",
                            "name": "${(element.question).replace(/"/g, '&quot;')}",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "${(element.answer).replace(/"/g, '&quot;')}"
                            }
                        }`
                     )}
                  ]
              }
          `}
          </script>
          :
          null
        }
      </Head>
      <section className="faq pt-0" id="faq">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title text-capitalize">{faqTitle && parse(faqTitle)} F.A.Q.</h2>
          </div>
          <div className="faqAccordion">
            <Accordion allowZeroExpanded preExpanded={['a']}>
              {faqData && faqData.length > 0 ? faqData.map((item, index) => (
                <AccordionItem key={index} uuid={item.uuid}>
                  <AccordionItemHeading className="accordion-header">
                    <AccordionItemButton className="accordion-button">
                      <Img src="/faq.svg" alt="faq" width="60" height="60" />
                      <h3 className="faqTitle">{item.question}</h3>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="accordion-body">
                    <div className="desc">{item.answer && parse(item.answer)}</div>
                  </AccordionItemPanel>
                </AccordionItem>
              ))
                : null}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
