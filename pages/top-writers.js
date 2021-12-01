import React, { useEffect, useState } from "react";
import Router from "next/router";

// components
import Feedback from "../components/home/feedback";
import Content from "../components/home/content";
import Faq from "../components/home/faq";
import Contact from "../components/home/contact";
import HeaderRating from "../components/header/rating";
import FreeFeature from "../components/freeFeature";
import Rating from "react-rating";
import ShowMoreText from "react-show-more-text";
// import axios from 'axios';

// API helper
import { ukApiHelper, apiHelper } from "../helper/apiHelper";
import { jwtDecode } from "../helper/jwtHelper";

// scss
import topWriterCss from "../styles/top-writer.scss";
import WriterCss from "../components/topWriter/writer.scss";

import Img from "../components/Common/image";
import { Spinner } from "reactstrap";

import Meta from "../components/meta";

export default function Home(props) {
  useEffect(() => {
    // top writer list
    getTopWriter();

    // faq and content
    getTopWriterContent();
  }, []);

  const [data, setData] = useState([]);

  const getTopWriter = () => {
    ukApiHelper("top10WritersV1?limit=10", "GET", null, null)
      .then((res) => {
        if (res.data.status) {
          const wData = res.data.data;
          setData(wData);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // ShowMoreText
  const executeOnClick = (isExpanded) => {
  }

  let i = 1;

  const styles = [
    { name: "APA" },
    { name: "MLA" },
    { name: "Harvard" },
    { name: "Turabian" },
    { name: "Chicago" },
    { name: "Vancouver" },
  ]

  const subjects = [
    { name: "English" },
    { name: "Business" },
    { name: "Nursing" },
    { name: "History" },
    { name: "Psychology" },
    { name: "Management" },
    { name: "Sociology" },
    { name: "Law" },
    { name: "Finance" },
    { name: "Literature" },
    { name: "Philosophy" },
    { name: "Engineering" },
  ]

  const types = [
    { name: "Essay (Any Type)" },
    { name: "Research Paper" },
    { name: "Term Paper" },
    { name: "Dissertation" },
    { name: "Thesis" },
    { name: "Assignment" },
  ]

  const [content, setcontent] = useState()
  const getTopWriterContent = () => {
    ukApiHelper("servicesV1?page=top-writers", "GET", null, null)
      .then((res) => {
        if (res.data.status) {
          const data = res.data.data;
          setcontent(data)
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const redirectUrl = async (user_name) => {

    var order_token = localStorage.getItem("orderToken");
    let decodeOrder = null;
    if (order_token && order_token !== '') {
      decodeOrder = jwtDecode(order_token);
    }

    const formData = new FormData();

    formData.append("service", decodeOrder.service ? decodeOrder.service : 3);
    formData.append("paper", decodeOrder.paper ? decodeOrder.paper : 1);
    formData.append("page", decodeOrder.page ? decodeOrder.page : 1);
    formData.append("deadline", decodeOrder.deadline ? decodeOrder.deadline : 19);
    formData.append("duration", decodeOrder.duration ? decodeOrder.duration : 'Days');
    formData.append("deadlineLable", decodeOrder.deadlineLable ? decodeOrder.deadlineLable : '');
    formData.append("coupon_code", decodeOrder.coupon_code ? decodeOrder.coupon_code : '');
    formData.append("preferred_writer", 'my_previous_writer');
    formData.append("writer_id", user_name);
    // formData.append("discount_token", localStorage.getItem('discount_token') ? localStorage.getItem('discount_token') : "");

    // formData.append("other_paper", '');
    // formData.append("subject", 49);
    // formData.append("other_subject", '');
    // formData.append("formated_style", 1);
    // formData.append("other_format", '');
    // formData.append("source", 0);

    apiHelper("setOrderV1", "POST", formData, null)
      .then((res) => {
        if (res.data.status) {
          const token = res.data.data.order_token;
          localStorage.setItem("orderToken", token);

          // var redirect = '/price';
          // const loginToken = localStorage.getItem("token");
          // if (loginToken) {
          //   var convertedToken = JSON.parse(loginToken);
          //   const now = new Date()
          //   var decodeToken = convertedToken ? jwtDecode(convertedToken.value) : null
          //   if (decodeToken && decodeToken.exp && (decodeToken.exp * 1000) >= now.getTime() && now.getTime() <= convertedToken.expiry) {
          //     redirect = '/order';
          //   }
          // }

          Router.push('/order');
        }
      })
      .catch((error) => console.error(`Error: ${error}`));

  }
  // console.log(props);
  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

      <style dangerouslySetInnerHTML={{ __html: topWriterCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: WriterCss }}></style>
      <div className="top-navbar">
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="cheapest-detail text-center">
                  <h1 className="title">
                    Cheapest Essay <span>Top Writers</span>
                  </h1>
                  <p className="desc">
                    Get access to a vast database of freelance writers for hire
                    to work on your essay. Check their ratings and customer’s
                    feedback before making a decision to hire a writer.
                  </p>
                </div>
                <div className="bottom-star">
                  <HeaderRating />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="pb-0">
        <div className="container">
          <div className="topWriter">
            {data && data.length > 0 ?
              data.map(function (item, id) {
                return (
                  <div className="writeDetails" key={id}>
                    <div className="number">{i++}</div>
                    <div className="writerImage">
                      <img src={item.profile_pic && item.profile_pic ? item.profile_pic : "./dummy-profile.png"} alt="writer" />
                    </div>
                    <div className="writeRight">
                      <h3 className="name">
                        {item.writer_name ? item.writer_name : item.user_name}
                        <span className="certified">
                          <Img src="/success-badge.svg" alt="success-badge" width="20" height="20" />
                        </span>
                      </h3>
                      <div className="viewProfile">
                        <a href={`${process.env.hostBaseUrl}/writers-profile?id=${item.user_name}`}>View Profile</a>
                      </div>
                      <ShowMoreText
                        lines={2}
                        more="Read more"
                        less="Read less"
                        className="desc"
                        anchorClass="showText"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"... "}
                      >
                        {item.description}
                      </ShowMoreText>
                      <ul className="list d-flex flex-wrap">
                        {item.subject_specialization.map((list, index) => {
                          return <li key={index}>{list.subject_name}</li>;
                        })}
                      </ul>
                      <div className="d-flex align-item-center ratingPoint flex-wrap">
                        <span>{item.review_count}</span>
                        <div className="d-flex">
                          <Rating
                            readonly={true}
                            initialRating={item.review_rate}
                            emptySymbol={
                              <Img
                                src="/empty.svg"
                                className="icon"
                                alt="ratingImg" width="16px" height="16px"
                              />
                            }
                            fullSymbol={
                              <Img
                                src="/full.svg"
                                className="icon"
                                alt="ratingImg"
                                width="16px" height="16px"
                              />
                            }
                          />
                        </div>
                        <span>{item.success_rate} Success rate</span>
                        <span>{item.completed_order} orders completed</span>
                      </div>
                      <div className="hireBtnFix">
                        {/* href={`${process.env.hostBaseUrl}/order`}  */}
                        <button className="btn secondary-btn" onClick={() => redirectUrl(item.user_name)}>Hire Now</button>
                      </div>
                    </div>
                  </div>
                );
              }) :
              <div className="text-center w-100">
                <Spinner animation="border" />
              </div>
            }
          </div>
        </div>
      </section>
      <section className="hire-writer-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">How We Hire Writer For our Team</h2>
            <p className="desc">
              Before the applicants make their position in our Galaxy; they
              undergo these three steps:
            </p>
          </div>
          <div className="mainWrapper">
            <div className="row">
              <div className="col-md-4">
                <div className="hire-writer-box text-center">
                  <div className="writer-box">
                    <span>1</span>
                    <Img
                      src="/top-writer/grammar-writing.svg"
                      alt="grammar-writing"
                      width="50"
                      height="50"
                    />
                  </div>
                  <h3 className="title">Grammar &amp; Writing Tests</h3>
                  <p className="desc">
                    Making a position in our writer’s team is not a cakewalk.
                    Every writer undergoes a challenging writing test. Our
                    selection team has years of experience in this industry.
                    Thus, they know exactly what to look for in a candidate
                    while hiring them.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="hire-writer-box text-center">
                  <div className="writer-box">
                    <span>2</span>
                    <Img
                      src="/top-writer/online-interview.svg"
                      alt="online-interview"
                      width="50"
                      height="50"
                    />
                  </div>
                  <h3 className="title"> Telephonic Interview</h3>
                  <p className="desc">
                    At CheapestEssay, we give importance to verbal communication
                    as a form of rating candidates. We explain a thorough
                    process of working with us. This round helps us evaluate the
                    writers on various perspectives for the vacant position.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="hire-writer-box text-center">
                  <div className="writer-box">
                    <span>3</span>
                    <Img src="/top-writer/test-drive.svg" alt="test-drive"
                      width="50"
                      height="50" />
                  </div>
                  <h3 className="title">Trial Assignment</h3>
                  <p className="desc">
                    Writers who perform well in their interviews are required to
                    work on a trial assignment. This helps us check the writing
                    skills and knowledge of the writers. Every assessment is
                    scanned in an anti-plagiarism tool to check its uniqueness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Feedback pageName="top-writers" />
      <FreeFeature />
      <section className="what-we-do pb-0">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">What we do</h2>
          </div>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="row">
                <div className="col col-md-3 list">
                  <h4 className="title">Styles</h4>
                  <ul className="box-list">
                    {styles.map(function (list, index) {
                      return (
                        <li key={index}>{list.name}</li>
                      )
                    })}
                  </ul>
                </div>
                <div className="col col-md-3 list d-md-none d-sm-block">
                  <h4 className="title">Types</h4>
                  <ul className="box-list">
                    {types.map(function (list, index) {
                      return (
                        <li key={index}>{list.name}</li>
                      )
                    })}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4 className="title text-center">Subjects</h4>
                  <ul className="box-list">
                    {subjects.map(function (list, index) {
                      return (
                        <li key={index}>{list.name}</li>
                      )
                    })}
                  </ul>
                </div>
                <div className="col-md-3 list d-none d-md-block">
                  <h4 className="title">Types</h4>
                  <ul className="box-list">
                    {types.map(function (list, index) {
                      return (
                        <li key={index}>{list.name}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href={`${process.env.hostBaseUrl}/order`} className="btn secondary-btn">
            Order Now
          </a>
        </div>
      </section>
      <section className="pb-0">
        <div className="container">
          <div className="row">
            <div className="text-center">
              <h2 className="section-title">Freelance Writers for Hire is Just a Click Away</h2>
            </div>
          </div>
        </div>
      </section>
      <Content serviceData={content} />
      <Faq faqData={content} />
      <Contact />
    </>
  );
}

export async function getStaticProps(context) {

  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=top-writers`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META

  return {
    props: {
      meta
    }
  }
}

// Home.getInitialProps = async (appContext) => {
//   const { req } = context;
//   console.log(req);
//   var getUrl = req.url.split('/');
//   const appProps = await ukApiHelper(`seo?page=${getUrl[1]}`, "GET", null, null)
//     .then((res) => {
//       if (res.data.status) {
//         apiresponse = res.data.data
//       }
//     })
//     .catch((error) => console.error(`Error: ${error}`));
//   return appProps;
// }


// export async function getServerSideProps() {
//   // var apiresponse = await axios.get('https://web.cheapestessay.com/uk/seo?page=top-writers');
//   var apiresponse = {}
//   await ukApiHelper("seoV1?page=top-writers", "GET", null, null)
//     .then((res) => {
//       if (res.data.status) {
//         apiresponse = res.data.data
//       }
//     })
//     .catch((error) => console.error(`Error: ${error}`));

//   return {
//     props: {
//       metaData: apiresponse
//     }
//   }
// }

// export async function getServerSideProps(context) {
//   const {req} = context;
//   console.log(req);
//   var getUrl = req.url.split('/'); 
//   var apiresponse = {}
//   await ukApiHelper(`seo?page=${getUrl[1]}`, "GET", null, null)
//     .then((res) => {
//       if (res.data.status) {
//         apiresponse = res.data.data
//       }
//     })
//     .catch((error) => console.error(`Error: ${error}`));

//   return {
//     props: {
//       metaData: apiresponse,
//       fallback: false
//     }
//   }
// }


