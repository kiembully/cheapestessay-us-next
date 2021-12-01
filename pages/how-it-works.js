import React from "react";

// component
import HeaderRating from "../components/header/rating";
import AdsBanner from "../components/home/adsBanner";
import Feedback from "../components/home/feedback";
import Contact from "../components/home/contact";
import Meta from "../components/meta";

// react slick
import Slider from "react-slick";
import slickCss from "slick-carousel/slick/slick.css";

// scss
import howworkCss from "../styles/work.scss";

//api
import { ukApiHelper } from "../helper/apiHelper";

import Img from "../components/Common/image";

export default function HowItWork(props) {
  const settings = {
    dots: true,
    centerMode: true,
    centerPadding: "200px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };
  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

      <style dangerouslySetInnerHTML={{ __html: slickCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: howworkCss }}></style>
      <section className="work pt-0 pb-0">
        <div className="top-navbar">
          <div className="header pt-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="section-title">
                    How our Professional Essay Writing Service Works?
                  </h1>
                  <p className="desc">
                    Are you searching for the top essay writing services to
                    excel in your academics? You are just 4 steps away from
                    receiving a top-notch academic paper created by our top and
                    experienced professionals. Our unique approach to custom
                    paper writing services makes the ordering process seamless
                    and hassle-free. Read ahead to know how you can place your
                    order and gain access to the best-in-class essay in your
                    desired time
                  </p>
                  <a className="btn secondary-btn" href={`${process.env.hostBaseUrl}/order`}>Order Now</a>
                </div>
                <div className="col-md-6">
                  <div className="text-center">
                    <div className="writerImg">
                      <Img src="/how-it-work/writer.gif" alt="writer" width="509" height="509" />
                    </div>
                  </div>
                  <div className="bottom-star">
                    <HeaderRating />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">
              Follow These Steps To Place your Order Without Any Struggle
            </h2>
          </div>
        </div>
        <div className="how-it-work">
          <Slider {...settings}>
            <div className="how-it-work-slider">
              <div className="content">
                <div className="sliderImage">
                  <Img
                    src="/how-it-work/how-it-work-1.png"
                    alt="how it work"
                  />
                </div>
                <div className="details text-center">
                  <h3 className="title">Tell Us Your Requirements</h3>
                  <p className="desc">
                    Fill in a short order form and specify all the vital details
                    related to your assignment like the total number of pages,
                    deadlines, type of assignment, etc. Just keep in mind that
                    the more clear instruction you provide, the more satisfied
                    and perfect paper you will receive
                  </p>
                  <a className="btn theme-btn" href={`${process.env.hostBaseUrl}/order`}>Get Started</a>
                </div>
              </div>
            </div>
            <div className="how-it-work-slider">
              <div className="content">
                <div className="sliderImage">
                  <Img
                    src="/how-it-work/how-it-work-2.png"
                    alt="how it work"
                  />
                </div>
                <div className="details text-center">
                  <h3 className="title">Make the Payment</h3>
                  <p className="desc">
                    After filling in the order forms with all the essential
                    details, move ahead to finish your order request by making
                    the payment via credit card or PayPal. Even if you pay
                    before, you don’t need to worry about your money. We ensure
                    to deliver your paper as per your expectation. If you are
                    not pleased with your assignment, you can raise a revision
                    request and get your paper reworked as per your need
                  </p>
                  <a className="btn theme-btn" href={`${process.env.hostBaseUrl}/order`}>Place An Ordrer</a>
                </div>
              </div>
            </div>
            <div className="how-it-work-slider">
              <div className="content">
                <div className="sliderImage">
                  <Img
                    src="/how-it-work/how-it-work-3.png"
                    alt="how it work"
                  />
                </div>
                <div className="details text-center">
                  <h3 className="title">Analyze the Order in Progress</h3>
                  <p className="desc">
                    Stay updated with the latest status of your order. Once you
                    have placed the order, we review your task and assign it to
                    the most appropriate and expert writer who has previously
                    worked on the concerned subject and domain. In case you find
                    any issue with your ongoing order, connect with our support
                    team to get it resolved in no time
                  </p>
                  <a className="btn theme-btn" href={`${process.env.hostBaseUrl}/top-writers`}>Hire A Writer</a>
                </div>
              </div>
            </div>
            <div className="how-it-work-slider">
              <div className="content">
                <div className="sliderImage">
                  <Img
                    src="/how-it-work/how-it-work-4.png"
                    alt="how it work"
                  />
                </div>
                <div className="details text-center">
                  <h3 className="title">Receive an Impeccable Paper</h3>
                  <p className="desc">
                    You will get an email once your paper is complete and ready to download. Ensure that you are fully convinced and satisfied with the article. Go through the entire content and see if the piece is worked as per your instructions. In case you feel the writer has missed some point, you can request revision without paying any extra amount. It’s that hassle-free
                  </p>
                  <a className="btn theme-btn" href={`${process.env.hostBaseUrl}/order`}>Order Now</a>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      <AdsBanner className="work-feedback" btnclassName="secondary-btn" src="/how-it-work/discount-banner-w.svg" serviceContent={null} />
      <Feedback pageName="how-it-works" />
      <Contact />
    </>
  );
}

export async function getStaticProps(context) {
  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=how-it-works`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META

  return {
    props: {
      meta
    }
  }
}
