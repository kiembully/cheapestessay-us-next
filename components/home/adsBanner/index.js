import React, { useEffect, useState } from "react";
import Router from "next/router";

// API helper
import { ukApiHelper } from '../../../helper/apiHelper';

// Html Parser
import parse from "html-react-parser";

// scss
import adsBannerCss from "./adsBanner.scss";

import Img from "../../Common/image";

function AdsBanner(props) {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [emailInValidMsg, setEmailInValidMsg] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
    setEmailInValidMsg("Email should be either valid or not be blank.");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredEmail === "") {
      setEmailInValidMsg("Please Enter Email");
    }
    else {
      setEmailInValidMsg('');
      const formData = new FormData();
      formData.append("email", enteredEmail);
      formData.append("fx", "unlockDiscount");

      ukApiHelper('createAccountV1', 'POST', formData, null)
        .then(res => {
          const response = res.data;
          if (response.status) {
            // Set Data in localstrorage
            const now = new Date()
            const item = {
              value: response.data,
              expiry: now.getTime() + (12 * 60 * 60 * 1000),
            }

            localStorage.setItem("token", JSON.stringify(item));
            Router.push('/order');
            setEmailInValidMsg('');
          }
          else {
            setEmailInValidMsg(res.data.message)
          }
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  };

  const [ctaSection, setCtaSection] = useState()
  useEffect(() => {
    if (props.serviceContent) {
      setCtaSection(props.serviceContent.cta_section)
    }
  }, [props.serviceContent])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adsBannerCss }}></style>
      {props.adsbanner ?
        <section className="for-new orderBanner">
          <div className="container">
            <div className="text-center">
              <div className="section-title">{ctaSection && parse(ctaSection.title)}</div>
              <div className="desc">{ctaSection && parse(ctaSection.content)}</div>
              <div className="mt-5">
                <a className="btn secondary-btn" href={`${process.env.hostBaseUrl}/order`}>Order an Essay</a>
                <a className="btn white-btn" href={`${process.env.hostBaseUrl}/price`}>Check Prices</a>
              </div>
            </div>
          </div>
        </section>
        :
        <section className={`for-new ${props.className}`} id="offer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="banner">
                  <Img src={props.src} alt="banner" width="148" height="148" />
                  <div className="content">15% <span>off</span></div>
                </div>
                <div className="text">on your first checkout</div>
              </div>
              <div className="col-md-8">
                <div className="text-center">
                  <div className="title">New to CheapestEssay Sign up &amp; Save</div>
                </div>
                <div className="input-wrpper">
                  <form className="input-group" method="post" onSubmit={submitHandler}>
                    <div className="emailInput">
                      <input
                        type="text"
                        placeholder="Your Email"
                        className="form-control"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                      />
                      <p className="errorMsg" title={emailInValidMsg}>{emailInValidMsg}</p>
                    </div>
                    <button type="submit" className={`btn theme-btn ${props.btnclassName}`}>Get a Discount</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default AdsBanner;
