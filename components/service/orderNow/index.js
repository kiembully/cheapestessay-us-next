import React from "react";

// scss
import orderNowCss from "./orderNow.scss";

export default function OrderNow() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: orderNowCss }}></style>
      <section className="for-new orderNow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="content-box w-100">
                <h2 className="content">
                  Essay Writing Service With Extensive Experience
                </h2>
                <div className="desc w-100 pe-md-5">
                  Engulfing in the splash of your college assignments? Get a
                  grip of our support and leave all your academic headaches with
                  us. Whenever you have an assignment urgency, our qualified
                  team of experts is there to provide you with best-in-class
                  online writing solutions in just a matter of hours as per your
                  needs and requirements.ways depend on our writers to deliver
                  exemplary work.
                </div>
                <a className="btn secondary-btn" href={`${process.env.hostBaseUrl}/order`}>Order Now</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="how-to-order-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/DerCRVja8O4?rel=0"
                  srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/DerCRVja8O4?rel=0?autoplay=1><img src=https://d3se3mk07n7blr.cloudfront.net/assets/img/ce-web-app/compressed/video-thumbnail.webp alt='CheapestEssay Video Order Tutorial'><span>▶</span></a>"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                  title="Cheapest Essay Pitch"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
