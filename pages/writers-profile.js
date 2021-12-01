import React, { useState, useEffect } from "react";

// components
import Meta from "../components/meta";

import ShowMoreText from "react-show-more-text";
import Rating from "react-rating";

// API helper
import { ukApiHelper, apiHelper } from "../helper/apiHelper";
import { jwtDecode } from "../helper/jwtHelper";

// scss
import writerDetailCss from "../styles/writer-detail.scss";

// router
import Router, { useRouter } from 'next/router';

// Image
import DummyProfile from "../public/dummy-profile.png";
import FreeFeature from "../components/freeFeature";

import Img from "../components/Common/image";

const WriterDetail = (props) => {
  const [data, setData] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [isAsc, setIsAsc] = useState(false);

  // router
  const router = useRouter()
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const formData = new FormData;
      formData.append("writer_id", id);

      ukApiHelper("writerDetailV1", "POST", formData, null)
        .then((res) => {
          if (res.data.status) {
            setData(res.data.data);
            setReviewList(res.data.data.reviews);
            setIsAsc(!isAsc);
          }
        })
        .catch((error) => console.error(`Error: ${error}`));
    }

  }, [id]);

  // ShowMoreText
  const executeOnClick = (isExpanded) => {
  }

  // imgNotFound
  const imgNotFound = (e) => {
    e.target.src = DummyProfile;
  };

  const sortReview = () => {
    setIsAsc(!isAsc);
  }

  useEffect(() => {
    let rList = reviewList;
    if (isAsc === true) {
      rList.sort((a, b) => (a.rating_number < b.rating_number) ? 1 : -1);
    }
    if (isAsc === false) {
      rList.sort((a, b) => (a.rating_number > b.rating_number) ? 1 : -1);
    }
    setReviewList(rList);
  }, [isAsc]);

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

          var redirect = '/price';
          const loginToken = localStorage.getItem("token");
          if (loginToken) {
            var convertedToken = JSON.parse(loginToken);
            const now = new Date()
            var decodeToken = convertedToken ? jwtDecode(convertedToken.value) : null
            if (decodeToken && decodeToken.exp && (decodeToken.exp * 1000) >= now.getTime() && now.getTime() <= convertedToken.expiry) {
              redirect = '/order';
            }
          }

          Router.push(redirect);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));

  }

  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} robotText="noindex,follow" />

      <style dangerouslySetInnerHTML={{ __html: writerDetailCss }}></style>
      <div className="writerDetail">
        <div className="top-navbar">
          <div className="header">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="leftDetail">
                    <div className="whiteBox">
                      <div className="top">
                        <div className="media">
                          <img src={
                            data && data.profile_pic ? data.profile_pic
                              : "./dummy-profile.png"} onError={imgNotFound} alt="Writer Profile" />
                        </div>
                        <div className="detail">
                          <h3 className="name">
                            {data && data.writer_name ? data.writer_name : data && data.user_name}
                            <Img
                              src="/top-writer/certified-io.svg"
                              alt="certified"
                              className="ms-2"
                              width="15"
                              height="15"
                            />
                          </h3>
                          <p>
                            <b>{data && data.completed_order}</b> projects completed
                          </p>
                          <div className="success-rate d-flex">
                            {data && data.successRate}<span>success rate</span>
                            <div className="rated ms-3">
                              <Img
                                src="/top-writer/rated-io.svg"
                                alt="Top rated"
                                className="me-2"
                                width="15"
                                height="15"
                              />
                              Top rated
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="otherDetail">
                        <h4 className="name">About {data && data.writer_name ? data.writer_name : data && data.user_name}</h4>
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
                          {data && data.description}
                        </ShowMoreText>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-6">
                        <div className="whiteBox details">
                          <span className="text1">{data && data.joined}</span>
                          <span className="text2">Joined us</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-6">
                        <div className="whiteBox details">
                          <span className="text1">{data && data.review_rate}</span>
                          <span className="text2">Review rate</span>
                        </div>
                      </div>
                      <div className="col-md-4 col-12">
                        <div className="whiteBox details">
                          <span className="text1">{data && data.completed_order}</span>
                          <span className="text2">Completed projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="innerTitle">
                      <h3 className="divTitle">Writer’s Sample</h3>
                      <div className="whiteBox writerSampleDetail">
                        <div className="row gx-5">
                          <div className="col-md-8">
                            <div className="sampleDetail">
                              <div className="sampleContent mb-3">
                                <span className="detail1">Paper Type</span>
                                <span className="detail2"> {data && data.writers_paper.paper_name}</span>
                              </div>
                              <div className="sampleContent">
                                <span className="detail1">Style</span>
                                <span className="detail2"> {data && data.writers_paper.format_name}</span>
                              </div>
                              <div className="sampleContent mb-3">
                                <span className="detail1">Subject</span>
                                <span className="detail2"> {data && data.writers_paper.subject_name}</span>
                              </div>
                              <div className="sampleContent">
                                <span className="detail1">Sources</span>
                                <span className="detail2">{data && data.writers_paper.sources}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <a href={data && data.writers_paper.link} target="_blank" className="sampleImage">
                              <Img
                                src="/top-writer/sampleImage.png"
                                alt="sampleImage"
                                width="160"
                                height="204"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="innerTitle mb-0">
                      <h3 className="divTitle">Reviews ({data && data.review_count})</h3>
                      {data && data.review_count > 0 ?
                        <div className="row align-items-center">
                          <div className="col-sm-8 col-9">
                            <div className="d-flex align-items-center">
                              Review Rate
                              <span className="ms-2 me-2 rating">{data && data.review_rate}</span>
                              <div className="rating">
                                <Rating
                                  readonly={true}
                                  initialRating={data && data.review_rate}
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
                            </div>
                          </div>
                          <div className="col-sm-4 col-3">
                            <div className="text-end">
                              <span className="sortDropdown" onClick={sortReview}>
                                Sort
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="11.031"
                                  height="6.311"
                                  viewBox="0 0 11.031 6.311"
                                  className="ms-2"
                                >
                                  <path
                                    id="Path_605"
                                    data-name="Path 605"
                                    d="M1277.09,8417.86l4.46,4.5,4.45-4.5"
                                    transform="translate(-1276.029 -8416.8)"
                                    fill="none"
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                        :
                        <p className="desc mb-0">No reviews</p>
                      }
                      <div className="reviews">
                        {reviewList && reviewList.map(function (list, index) {
                          return (
                            <div className="reviewsBox" key={index}>
                              <div className="whiteBox">
                                <div className="top row m-0">
                                  <div className="left col-sm-6 p-0">
                                    <h4 className="name">
                                      {list.customer_no} <span>({list.total_orders} order)</span>
                                    </h4>
                                    <span className="text">{list.addedon}</span>
                                  </div>
                                  <div className="text-end col-sm-6 p-0">
                                    <div className="mb-2 rating">
                                      <Rating
                                        readonly={true}
                                        initialRating={list.rating_number}
                                        emptySymbol={
                                          <Img
                                            src="/empty.svg"
                                            className="icon"
                                            alt="ratingImg"
                                            width="16"
                                            height="16"
                                          />
                                        }
                                        fullSymbol={
                                          <Img
                                            src="/full.svg"
                                            className="icon"
                                            alt="ratingImg"
                                            width="16"
                                            height="16"
                                          />
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <p className="reviews">
                                  {list.remark}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="rightDetail">
                    <div className="top">
                      <div className="media">
                        <img src={
                          data && data.profile_pic ? data.profile_pic
                            : "./dummy-profile.png"} onError={imgNotFound} alt="Writer Profile" />
                      </div>
                      <div className="detail">
                        <h3 className="name">{data && data.writer_name ? data.writer_name : data && data.user_name}</h3>
                        <p className="success-rate">
                          {data && data.successRate}<span>success rate</span>
                        </p>
                      </div>
                    </div>
                    <div className="otherDetail">
                      <h4 className="text mb-3">You also get:</h4>
                      <ul>
                        <li>Any-style formatting</li>
                        <li>Free title &amp; bibliography pages</li>
                        <li>Unlimited revision guarantee</li>
                        <li>24/7 phone &amp; chat support</li>
                      </ul>
                      <div className="mt-4">
                        {/* href={`${process.env.basePath}/order`} */}
                        <button className="btn secondary-btn w-100" onClick={() => redirectUrl(data.user_name)}>Hire</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FreeFeature />
      </div>
    </>
  );
}

// export async function getStaticProps(context) {
//   const DEFAULT_META = process.env.defaultMeta
//   const res = await ukApiHelper(`seoV1?page=writers-profile&writer_id=W1624`, 'GET', null, null)
//   const meta = res.data.status ? res.data.data : DEFAULT_META

//   return {
//       props: {
//           meta
//       }
//   }
// }

WriterDetail.getInitialProps = async ({ query }) => {
  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=writers-profile&writer_id=${query.id}`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META
  console.log(res.data.data);
  return {
    meta
  }
}

export default WriterDetail;
