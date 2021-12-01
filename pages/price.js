import React, { useState } from "react";
import {
  Modal,
  ModalBody,
} from "reactstrap";

import { useRouter } from "next/router";

// TimezonePicker
import timezoneCss from 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

import OrderPaperDetail from '../components/order/placeOrder/orderPaperDetail/index'

//api
import { ukApiHelper } from "../helper/apiHelper";

// scss
import orderCss from "../styles/order.scss";
import priceCss from "../styles/price.scss";

import Img from "../components/Common/image";
import Meta from "../components/meta";

export default function Order(props) {

  // how to order modal
  const [HowOrderModal, setOrderModal] = useState(false);
  const orderModal = () => setOrderModal(!HowOrderModal);

  const [current_slide, setcurrent_slide] = useState(0);

  const router = useRouter();

  //submitFirstStep
  const submitFirstStep = () => {
    router.push(`/login`);
  };

  //changeSlide
  const changeSlide = (nCount) => {
    setcurrent_slide(nCount);
  };

  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

      <style dangerouslySetInnerHTML={{ __html: timezoneCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: orderCss }}></style>
      <style dangerouslySetInnerHTML={{ __html: priceCss }}></style>
      <div className="order price">
        <div className="top-navbar">
          <div className="header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="cheapest-detail">
                    <h1 className="title">
                      Order Essay Online from Team of Expert Writers
                    </h1>
                    <p className="desc">
                      No more restless nights! Gain Access to 100% unique
                      academic papers
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-end">
                    <div className="desc">Don’t Know how to order?</div>
                    <div className="mt-3 mb-2">
                      <Img
                        src="/order/order.gif"
                        alt="order"
                        width="60"
                        height="60"
                      />
                    </div>
                    <a
                      className="btn secondary-btn"
                      href="#"
                      onClick={orderModal}
                    >
                      Click Here
                    </a>
                    <Modal isOpen={HowOrderModal} toggle={orderModal} centered>
                      <ModalBody>
                        <div className="how-to-order-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/DerCRVja8O4?rel=0"
                            srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/DerCRVja8O4?rel=0?autoplay=1><img src=https://d3se3mk07n7blr.cloudfront.net/assets/img/ce-web-app/compressed/video-thumbnail.webp alt='CheapestEssay Video Order Tutorial'><span>▶</span></a>"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen=""
                            title="Cheapest Essay Pitch"
                          ></iframe>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="text-left orderForm">
          <div className="container">

            <OrderPaperDetail
              coupenCode=""
              current_slide={current_slide}
              changeSlide={(nCount) => changeSlide(nCount)}
              currentStep={1}
              submitFirstStep={submitFirstStep}
              setTotalPrice={() => { return }}
            />

          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=price`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META

  return {
    props: {
      meta
    }
  }
}
