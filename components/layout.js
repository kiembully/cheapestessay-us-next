import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// reactstrap
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";

// components
import Header from "./header";
import Footer from "./footer";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Order from "../pages/order";
import MyOrders from "../pages/my-orders/index";
import OrderDetail from '../pages/my-orders/order-details'
import Profile from "../pages/profile";
import Balance from "../pages/balance";
import Level from "../pages/level";
import Referral from "../pages/referral";
import Sidebar from "./order/sidebar";
// import OrderIDPage from "../pages/viewOrder/[id]";
import NotLoginOrder from "../components/order/placeOrder/notLoginOrder";
import ForgetPwd from "../pages/forget-password";

// API helper
import { apiHelper } from '../helper/apiHelper';
import { jwtDecode } from "../helper/jwtHelper";

import CryptoJS from "crypto-js";

const Layout = ({ children }) => {

  const router = useRouter();

  const [isReadyRender, setIsReadyRender] = useState(false);
  const [coupenCode, setCoupenCode] = useState("");

  const beforeLoginPages = ['/login', '/signup', '/forget-password']
  const afterLoginPages = ['/profile', '/balance', '/level', '/referral', '/my-orders', '/my-orders/order-details', '/order']
  // const [pageUrl, setpageUrl] = useState()

  const setInterComData = (userToken) => {

    const formData = new FormData();
    formData.append("user_token", userToken);

    apiHelper('getintercomdata', 'POST', formData, null)
      .then(res => {

        if (res.data.status) {
          var data = res.data.data;

          var secret = 'r12Ntl2v4JtgWI8Hri7GBkZqb0YhlXcdBoKRmkXj';
          var cryptoJS = CryptoJS;
          var stringID = data.user_id.toString();
          var hash = cryptoJS.HmacSHA256(stringID, secret);
          var hex = cryptoJS.enc.Hex.stringify(hash);

          data.user_hash = hex
          if (!!window.Intercom && !(typeof window === 'undefined'))
            window.Intercom('boot', data);
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const exipreToken = () => {
    var pathname = router.pathname

    if (!!window.Intercom && !(typeof window === 'undefined')) {
      window.Intercom('boot', {
        app_id: 'je6f9lsz'
      });
    }

    if (afterLoginPages && afterLoginPages.includes(pathname) && pathname !== '/order') {
      router.push(`${process.env.basePath}/logout`)
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      var convertedToken = JSON.parse(loginToken);
      const now = new Date()
      var decodeToken = convertedToken ? jwtDecode(convertedToken.value) : null
      if (decodeToken && decodeToken.exp && (decodeToken.exp * 1000) >= now.getTime() && now.getTime() <= convertedToken.expiry) {
        setInterComData(convertedToken.value)
      } else {
        exipreToken()
      }
    } else {
      exipreToken()
    }

    if (router.query && router.query.code) {
      setCoupenCode(router.query.code);
    } else if (router.query && router.query.discount_code) {
      setCoupenCode(router.query.discount_code);
    }

    setIsReadyRender(true)

  }, [router.isReady]);

  const [changeProfile, setchangeProfile] = useState(false);
  const changeUserProfile = () => {
    setchangeProfile(!changeProfile);
  };

  // navbar toggle
  const [isOpen, setIsOpen] = useState(false);

  // header sidebar
  const toggle = () => {
    document.body.classList.add("headerSidebar-open");
    setIsOpen(true);
  };

  const toggleClose = () => {
    document.body.classList.remove("headerSidebar-open");
    setIsOpen(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, (event) => toggleClose());

  var pathname = router.pathname;
  return (
    <div>
      {isReadyRender ?
        pathname && pathname !== '' ?
          (() => {
            const loginToken = localStorage.getItem("token");
            var pathname = router.pathname
            var checkLogin = ''

            if (loginToken) {
              var convertedToken = JSON.parse(loginToken);
              const now = new Date()
              var decodeToken = convertedToken ? jwtDecode(convertedToken.value) : null
              if (decodeToken && decodeToken.exp && (decodeToken.exp * 1000) >= now.getTime() && now.getTime() <= convertedToken.expiry) {
                if (beforeLoginPages && beforeLoginPages.includes(pathname)) {
                  router.push(`${process.env.basePath}/order`);
                } else {
                  checkLogin = 'true';
                }
              } else {
                checkLogin = 'false';
              }
            } else {
              checkLogin = 'false';
            }

            if (checkLogin !== '') {
              if (pathname === "/login") {
                return <Login />
              } else if (pathname === "/signup") {
                return <Signup />
              } else if (pathname === "/forget-password") {
                return <ForgetPwd />
              } else if (afterLoginPages && afterLoginPages.includes(pathname)) {
                return checkLogin === 'true' ?
                  <>
                    <div className="order">

                      <div className="top-navbar orderMobileMenu d-md-block d-lg-none">
                        <Navbar expand="md">
                          <div className="container">
                            <NavbarBrand
                              href={process.env.hostBaseUrl}
                              onClick={
                                router.pathname === "/" ? (e) => e.preventDefault() : null
                              }
                            >
                              Cheapest <span>Essay</span>
                            </NavbarBrand>
                            <a className="btn secondary-btn" href={`${process.env.hostBaseUrl}/logout`}>
                              Logout
                            </a>
                          </div>
                        </Navbar>
                      </div>
                      <NavbarToggler className="d-lg-none d-md-block" onClick={toggle}>
                        <div className="navbar-toggler-icon open">
                          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                              <path d="M1.25 9H17.75" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10.25 2.25H17.75" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1.25 15.75H8.75" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="18" height="18" fill="white" transform="translate(0.5)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </NavbarToggler>
                      {isOpen ?
                        <div className='sidebarOverlay'>
                          <div className={`orderLogin m-0`} ref={wrapperRef}>
                            <Sidebar
                              toggleClose={toggleClose}
                              changeProfile={changeProfile}
                            />
                            <div className="navbar-toggler-icon close">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.4895 1.98975L13.4895 13.9897" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.6567 2L7.99988 7.65685" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.65649 14L7.65649 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>

                        </div> : null}

                      <div className="orderLogin">
                        <Sidebar
                          toggleClose={toggleClose}
                          className="d-none d-lg-block"
                          changeProfile={changeProfile}
                        />
                        <div className="orderingDetails">
                          {
                            (pathname === "/profile") ?
                              <Profile changeUserProfile={changeUserProfile} /> :
                              (pathname === "/balance") ?
                                <Balance changeUserProfile={changeUserProfile} /> :
                                (pathname === "/level") ?
                                  <Level /> :
                                  (pathname === "/referral") ?
                                    <Referral /> :
                                    (pathname === "/my-orders") ?
                                      <MyOrders /> :
                                      (pathname === "/my-orders/order-details") ?
                                        <OrderDetail /> :
                                        (pathname === "/order") ?
                                          <Order coupenCode={coupenCode} changeUserProfile={changeUserProfile} /> :
                                          null
                          }
                        </div>
                      </div>
                    </div>
                  </>
                  : (pathname === "/order" ?
                    <>
                      <Header />
                      <div className="bodyMain"><NotLoginOrder /></div>
                      <Footer />
                    </> :
                    null)
              } else {
                return (
                  <>
                    <Header />
                    <div className="bodyMain">{children}</div>
                    <Footer />
                  </>
                );
              }
            }
          })() :
          null :
        null}
    </div >
  );
};

export default Layout;

function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
