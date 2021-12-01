import React, { useState, useEffect } from "react";

// reactstrap
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

// Html Parser
import parse from 'html-react-parser';

// scss
import serviceCss from "./service.scss";

import Img from "../../Common/image";

const Service = (props) => {
  const [curTab, setCurTab] = useState(1);

  const toggle = (tab) => {
    setCurTab(tab);
  };

  const [serviceData, setServiceData] = useState();

  useEffect(() => {
    if(props.serviceData){
      setServiceData(props.serviceData)
    }
  }, [props.serviceData])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: serviceCss }}></style>
      <section className="services" id="howwork">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              {serviceData && serviceData.how_it_works_section && serviceData.how_it_works_section.title ? parse(serviceData.how_it_works_section.title.title) : ''}
            </h2>
          </div>

          <Nav tabs className="nav nav-pills justify-content-center">
            {serviceData && serviceData.how_it_works_section && serviceData.how_it_works_section.steps.map((tab, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    className={curTab == tab.id ? "active" : null}
                    onClick={() => { toggle(tab.id); }}>
                    <span>{tab.id}</span>
                  </NavLink>
                </NavItem>
              )
            })}
          </Nav>
          <TabContent>
            {serviceData && serviceData.how_it_works_section && serviceData.how_it_works_section.steps.map((tab, index) => {
              return (
                <TabPane tabId={tab.id} className={curTab == tab.id ? "active" : null} key={index}>
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div className="service-box">
                        <span className="services">{tab.id}</span>
                        <h3 className="title">{tab.content_header && parse(tab.content_header)}</h3>
                        <div className="desc">
                          {tab.content && parse(tab.content)}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="serviceImg text-center">
                        {(() => {
                          if (tab.id === 1) {
                            return (
                              <Img
                                src="/how-it-works-img1.svg"
                                alt="how-it-works-img"
                                width="280"
                                height="250"
                              />
                            );
                          } else if (tab.id === 2) {
                            return (
                              <Img
                                src="/how-it-works-img2.svg"
                                alt="how-it-works-img"
                                width="280"
                                height="250"
                              />
                            );
                          }
                          else if (tab.id === 3) {
                            return (
                              <Img
                                src="/how-it-works-img3.svg"
                                alt="how-it-works-img"
                                width="280"
                                height="250"
                              />
                            );
                          }
                          else if (tab.id === 4) {
                            return (
                              <Img
                                src="/how-it-works-img4.svg"
                                alt="how-it-works-img"
                                width="280"
                                height="250"
                              />
                            );
                          }
                        })()}

                      </div>
                    </div>
                  </div>
                </TabPane>
              )
            })}
          </TabContent>
        </div>
      </section>
    </>
  );
}

export default Service;
