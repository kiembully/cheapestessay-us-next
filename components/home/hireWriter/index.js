import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Rating from 'react-rating';

// react slick
import Slider from "react-slick";
import slickCss from "slick-carousel/slick/slick.css";

// API helper
import { ukApiHelper, apiHelper } from '../../../helper/apiHelper';
import { jwtDecode } from "../../../helper/jwtHelper";

// scss
import hireWriterCss from "./hirewriter.scss";

// Image
import DummyProfile from '../../../public/dummy-profile.png';

import Img from "../../Common/image";

const SVGIcon = (props) =>
  <svg className={props.className} pointerEvents="none">
    <use xlinkHref={props.href} />
  </svg>;

const HireWriter = (props) => {

  const router = useRouter();

  const servicePage = [
    { name: "essay writing services" },
    { name: "research paper writing services" },
    { name: "case study writing" },
    { name: "coursework writing services" },
    { name: "assignment writing service" },
    { name: "dissertation help" },
  ]

  var [hireSlider, setHireSlider] = useState([]);

  useEffect(() => {
    if (props.serviceType && props.serviceType !== '') {
      // getServiceTypeTopWriter()
      getTop10Wrtiters();
    } else {
      getTop10Wrtiters();
    }
  }, []);

  const getTop10Wrtiters = () => {
    ukApiHelper('top10WritersV1?limit=5', 'GET', null, null)
      .then(res => {
        if (res.data.status) {
          const data = res.data.data;
          setHireSlider(data);
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const getServiceTypeTopWriter = () => {
    ukApiHelper(`topwritersbyservicetype?service=${props.serviceType}`, 'GET', null, null)
      .then(res => {
        if (res.data.status) {
          const data = res.data.data;
          setHireSlider(data);
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  }

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
  const imgNotFound = (e) => {
    e.target.src = DummyProfile;
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    loop: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: slickCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: hireWriterCss }}></style>

      <Head>
        {hireSlider.length > 0 ?
          <script type="application/ld+json">
            {`
              [                                    
                ${hireSlider.map(element =>
                `{
                      "@type": "Person",
                      "url": "${process.env.hostBaseUrl}/writers-profile?id=${element.id && element.id}",
                      "name": "${element.user_name && element.user_name}",
                      "description": "${element.description ? (element.description).replace(/"/g, '&quot;') : ''}",
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
      </Head>

      <section className="hire-writer pb-0">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">
              {props.title}
            </h2>
            <div className="desc">
              {props.desc}
            </div>
          </div>
        </div>
        <div className="writer-wrpper">
          <div className="container">
            <div className="hire-write-slider" id="hire-write-slider">
              {hireSlider && hireSlider.length > 0 ?
                <Slider {...settings}>
                  {hireSlider.map((info, i) =>
                    <div className="writerBox" key={i}>
                      <div className="writer-img">
                        <img
                          src={info.profile_pic}
                          alt={info.writer_name ? info.writer_name : info.user_name}
                          className="img-fluid"
                          onError={(e) => imgNotFound(e)}
                          width="402"
                          height="250"
                        />
                      </div>
                      <div className="writerDetail">
                        <div className="star">
                          <Rating
                            readonly={true}
                            initialRating={info.review_count}
                            emptySymbol={<Img src="/empty.svg" className="icon" alt="ratingImg" width="16px" height="16px" />}
                            fullSymbol={<Img src="/full.svg" className="icon" alt="ratingImg" width="16px" height="16px" />}
                          />
                        </div>
                        <h3 className="name">{info.writer_name ? info.writer_name : info.user_name}</h3>
                        <ul className="sub-detail">
                          <li className="d-flex">
                            <Img src="/excellence.svg" alt="excellence" width="21" height="21" />
                            <span>{info.completed_order} orders completed</span>
                          </li>
                        </ul>
                        <ul className="sub-detail d-flex">
                          <li className="d-flex">
                            <Img src="/success-badge.svg" alt="success-badge" width="21" height="21" />
                            <span>{info.success_rate} Success rate</span>
                          </li>
                          <li className="d-flex">
                            <Img src="/reviews.svg" width="21" height="21" alt="reviews" />
                            <span>{info.review_count} Reviews</span>
                          </li>
                        </ul>
                        <div className="text-center">
                          <button onClick={() => redirectUrl(info.user_name)} className="btn">Hire Writer</button>
                        </div>
                      </div>
                    </div>)}
                </Slider> :
                <div className="noReview-found">No writer found</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HireWriter;
