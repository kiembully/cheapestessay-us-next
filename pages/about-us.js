import React from "react";
import CountUp from "react-countup";

// component
import Feedback from "../components/home/feedback";
import Contact from "../components/home/contact";
import HeaderRating from "../components/header/rating";

//api
import { ukApiHelper } from "../helper/apiHelper";

// scss
import aboutCss from "../styles/about.scss";

import Img from "../components/Common/image";
import Meta from "../components/meta";

export default function HowItWork(props) {
  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

      <style dangerouslySetInnerHTML={{ __html: aboutCss }}></style>
      <div className="about">
        <div className="top-navbar">
          <div className="header">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <div className="cheapest-details text-center">
                    <h2 className="section-title">About CheapestEssay</h2>
                    <p className="desc">
                      Worried about how to complete your college assignments on
                      time? Leave all your assignment worries with us and excel
                      in your academics with our paper writing services online.
                      We pride ourselves on what we execute and are thrilled to
                      show you what all we have in our box to offer.
                    </p>
                    <div className="order-now">
                      <a href={`${process.env.hostBaseUrl}/order`} className="btn secondary-btn">
                        Order Now
                      </a>
                    </div>
                    <div className="bottom-star">
                      <div className="row">
                        <div className="col-md-10 offset-md-1">
                          <HeaderRating />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="scholarly">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="section-title text-start">
                All Your Scholarly Devoir Under One Roof
              </h2>
              <p className="desc w-100">
                No matter what all subjects you need help with, our paper
                writing service covers all. Our exceptional online assignment
                writing services help clients all across the globe get the
                best-quality paper written by top professionals within their
                timeline.{" "}
              </p>
              <p className="desc w-100">
                CheapestEssay has been active in the market of online paper
                writing services since 2014. From then, we have entirely
                focussed on facilitating candidates to accomplish their desired
                result with little effort. We own a strong team of experienced
                and qualified writers who have the expertise to work on any
                paper, no matter how complex it is. You can get your custom
                assignment worked from scratch without worrying about your data
                being confidential.{" "}
              </p>
            </div>
            <div className="col-md-4">
              <div className="image text-center">
                <Img src="/about/about1.gif" alt="about" width="212" height="226" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-details">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <h4 className="number">
                  <CountUp end={600} duration={5} />
                  <span>+</span>
                </h4>
                <span className="content">Skilled Writers</span>
              </div>
            </div>
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <h4 className="number">
                  <CountUp end={100} duration={5} />
                  <span>k+</span>
                </h4>
                <span className="content">Student Fall in Love With Us</span>
              </div>
            </div>
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <h4 className="number">
                  <CountUp end={7} duration={5} />
                  <span>+</span>
                </h4>
                <span className="content">Years on the Market</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">
              What Makes Us An Exceptional Academic Writing Helper?
            </h2>
            <p className="desc">
              When you are entirely blank about working on your college
              assignment, use our affordable paper writing service. Give your
              academic burden to us and meanwhile take advantage of these perks
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img src="/about/fast-delivery.svg" alt="fast-delivery" width="80" height="80" />
                </div>
                <h3 className="subTitle">Fast Delivery</h3>
                <p className="desc">
                  Looking for urgent essay help and don’t know where to start?
                  Avail of our paper writing services and get your assignment
                  done in as little as 3 hours.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img src="/about/clock-service.svg" alt="clock-service" width="80" height="80" />
                </div>
                <h3 className="subTitle">Round the Clock Service</h3>
                <p className="desc">
                  Stuck with some primary concern regarding your paper? Connect
                  to our support team, who are available 24X7 and get your
                  queries resolved in no time
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img src="/about/money-back.svg" alt="money-back" width="80" height="80" />
                </div>
                <h3 className="subTitle">Money-Back Guarantee</h3>
                <p className="desc">
                  Wish to know about the refund policy? If the article does not
                  meet your expectations, you can request a refund within 14
                  days from the time of delivery
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img
                    src="/about/plagiarism-Free.svg"
                    alt="plagiarism-Free"
                    width="80" height="80"
                  />
                </div>
                <h3 className="subTitle">Plagiarism-Free</h3>
                <p className="desc">
                  Worried about the uniqueness of the paper? Rest assured, as
                  all your writing is checked on top plagiarism software to
                  ensure the article is unique and authentic
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img src="/about/anonymity.svg" alt="anonymity" width="80" height="80" />
                </div>
                <h3 className="subTitle">Anonymity</h3>
                <p className="desc">
                  Stressed out about your privacy? Safeguarding your data is our
                  top priority. Thus we assure complete anonymity for both the
                  writers and students
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="helper text-center">
                <div className="image">
                  <Img
                    src="/about/unlimited-revision.svg"
                    alt="unlimited-revision"
                    width="80" height="80"
                  />
                </div>
                <h3 className="subTitle">Unlimited Revision</h3>
                <p className="desc">
                  Concerned about your paper not meeting the expectations? In
                  case the writer has not followed the foremost instructions,
                  you can raise a request to revise your paper for free
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-details">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <span className="content">
                  <span>80000</span> academic papers were completed in 2020!
                </span>
              </div>
            </div>
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <span className="content">
                  we write over <span>6500</span> orders per month!
                </span>
              </div>
            </div>
            <div className="col-sm-4 box">
              <div className="aboutDetailBox">
                <span className="content">
                  we take on <span>200</span> new papers per Day!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-0 aboutImg">
        <div className="container">
          <h2 className="section-title text-center">
            More advantages when opting for our Essay Writing Services
          </h2>
          <div className="row">
            <div className="col-xl-6">
              <div className="image text-center">
                <Img src="/about/about-service.png" alt="About Service" width="537" height="666" />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="serviceBox d-flex align-items-center">
                <div className="image">
                  <Img
                    src="/about/supreme-quality.svg"
                    alt="Supreme Quality"
                  />
                </div>
                <div className="details">
                  <h3 className="subTitle">Supreme Quality</h3>
                  <p className="desc">
                    Our reputation is established on delivering supreme quality
                    assignments within the given timeline. No matter how complex
                    or small the task is, we offer our clients the best
                  </p>
                </div>
              </div>
              <div className="serviceBox d-flex align-items-center">
                <div className="image">
                  <Img
                    src="/about/experienced-writers.svg"
                    alt="Experienced Writers"
                  />
                </div>
                <div className="details">
                  <h3 className="subTitle">Experienced Writers</h3>
                  <p className="desc">
                    We take great pride in a strong team of hand-picked
                    professionals. Every writer undergoes a multiple-level
                    selection process before joining our expert team of writers
                  </p>
                </div>
              </div>
              <div className="serviceBox d-flex align-items-center">
                <div className="image">
                  <Img
                    src="/about/costs.svg"
                    alt="No Hidden Costs"
                  />
                </div>
                <div className="details">
                  <h3 className="subTitle">No Hidden Costs</h3>
                  <p className="desc">
                    When placing your order with us, you just need to pay once.
                    There is a clear and transparent pricing structure with no
                    hidden charges
                  </p>
                </div>
              </div>
              <div className="serviceBox d-flex align-items-center">
                <div className="image">
                  <Img
                    src="/about/time-delivery.svg"
                    alt="On-Time Deliveryy"
                  />
                </div>
                <div className="details">
                  <h3 className="subTitle">On-Time Delivery</h3>
                  <p className="desc">
                    Punctuality is what we are known for. Rest assured to get
                    your order within the given timeline. If you have any prior
                    requirements, we can deliver them in just 3 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Feedback pageName="about-us" />
      <div className="text-center mb-5">
        <a className="btn theme-btn" href={`${process.env.hostBaseUrl}/order`}>Place an order</a>
      </div>
      <Contact />
    </>
  );
}

export async function getStaticProps(context) {
  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=about-us`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META
  return {
    props: {
      meta
    }
  }
}
