import React, { useEffect, useState } from "react";

// reactstrap
import classnames from "classnames";

// react slick
import Slider from "react-slick";
import slickCss from "slick-carousel/slick/slick.css";

import { ukApiHelper } from "../../../helper/apiHelper";
// import { useRouter } from "next/router";
import Rating from 'react-rating';
import moment from "moment";

// scss
import feedbackCss from "./feedback.scss";

import Img from "../../Common/image";

export default function Feedback(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [showReviewType, setShowReviewType] = useState("googleReviews");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      setShowReviewType(tab === '1' ? 'googleReviews' : (tab === '2' ? 'trustPilot' : 'siteJabber'))
    };
  };

  const [reviewArr, setReviewArr] = useState(null);
  // var router = useRouter()
  useEffect(() => {
    // if (router.asPath) {
    //   router = router.asPath.split('/')
    //   var pageName = router[1];
    //   if (pageName === '') {
    //     pageName = 'index'
    //   }
    // }
    if (props.pageName && props.pageName !== '') {
      getReview()
    }
  }, [props.pageName]);

  const getReview = () => {
    if (props.pageName && props.pageName !== '') {
      ukApiHelper(`webReviewsV1?page=${props.pageName}`, "GET", null, null)
        .then((res) => {
          if (res.data.status) {
            const data = res.data.data;
            setReviewArr(data.review_list);
          }
        })
        .catch((error) => console.error(`Error: ${error}`));
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: slickCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: feedbackCss }}></style>

      {/* <Head>
        {reviewArr.length > 0 ?
          <script type="application/ld+json">
            {`
              [                                    
                ${reviewArr.map(element =>
                  `{
                      "@type": "Review",
                      "url": "${process.env.hostBaseUrl}/writers-profile?id=${element.id && element.id}",
                      "name": "${element.user_name && element.user_name}",
                      "description": "${element.description && element.description}",
                      "nationality": {
                        "@type": "Country",
                        "name": "${element.location}"
                      }
                  }`
                )}
              ]
          `}
          </script>
          :
          null
        }
      </Head> */}

      <section className="feedback" id="reviews">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Client's Feedback for Essay Help that Keeps Us Motivated
            </h2>
          </div>
          <ul className="nav justify-content-end nav-pills">
            <li
              onClick={() => {
                toggle("1");
              }}
              className={`nav-item ${classnames({
                active: activeTab === "1",
              })}`}
            >
              <div className="d-flex align-items-center nav-link">
                <Img src="/Cheapestessay.png" alt="Cheapestessay" width="40" height="40" />
                <div className="d-flex rate-detail">
                  <div className="left">
                    <div className="name">Cheapestessy reviews</div>
                    <div className="star mb-0">
                      <Img src="/stars.svg" alt="stars" width="100" height="14" />
                    </div>
                  </div>
                  <div className="rating mb-0">
                    <span>4.7</span>
                  </div>
                </div>
              </div>
            </li>
            <li
              onClick={() => {
                toggle("2");
              }}
              className={`nav-item ${classnames({
                active: activeTab === "2",
              })}`}
            >
              <div className="d-flex align-items-center nav-link">
                <Img src="/trustpilot.png" alt="trustpilot.png" width="40" height="40" />
                <div className="d-flex rate-detail">
                  <div className="left">
                    <div className="name">trustpilot reviews</div>
                    <div className="star mb-0">
                      <Img src="/stars.svg" alt="stars" width="100" height="14" />
                    </div>
                  </div>
                  <div className="rating mb-0">
                    <span>4.5</span>
                  </div>
                </div>
              </div>
            </li>
            <li
              onClick={() => {
                toggle("3");
              }}
              className={`nav-item ${classnames({
                active: activeTab === "3",
              })}`}
            >
              <div className="d-flex align-items-center nav-link">
                <Img src="/sitejabber.png" alt="sitejabber.png" width="40" height="40" />
                <div className="d-flex rate-detail">
                  <div className="left">
                    <div className="name">sitejabber reviews</div>
                    <div className="star mb-0">
                      <Img src="/stars.svg" alt="stars" width="100" height="14" />
                    </div>
                  </div>
                  <div className="rating mb-0">
                    <span>4.4</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="tab-content">
            <div className="feedback-slider">
              <Slider
                dots={true}
                arrows={false}
                autplay={true}
                speed={500}
                slidesToShow={reviewArr && reviewArr[showReviewType] ? (reviewArr[showReviewType].length < 3 ? reviewArr[showReviewType].length : 3) : 1}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: reviewArr && reviewArr[showReviewType] ? (reviewArr[showReviewType].length < 2 ? reviewArr[showReviewType].length : 2) : 1
                    },
                  },
                  {
                    breakpoint: 575,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
              >
                {reviewArr && reviewArr[showReviewType] ?
                  reviewArr[showReviewType].map((data, index) => {
                    return <div className="feedback-detail" key={index}>
                      <div className="customer-detail">
                        <div className="name">{data.customer_name}</div>
                        <span className="id">{moment(data.review_date).format('DD MMM YYYY')}</span>
                      </div>
                      <div className="info">
                        <Rating
                          readonly={true}
                          initialRating={data.rating}
                          emptySymbol={<Img src="/empty.svg" className="icon" alt="ratingImg" width="16px" height="16px" />}
                          fullSymbol={<Img src="/full.svg" className="icon" alt="ratingImg" width="16px" height="16px" />}
                        />
                        <div className="reviewTitle"><strong style={{ 'fontWeight': '500' }}>{data.review_headline}</strong></div>
                        <p className="content">
                          {data.review}
                        </p>
                      </div>
                    </div>
                  })
                  : <div className="noReview-found">No feedback found</div>
                }
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
