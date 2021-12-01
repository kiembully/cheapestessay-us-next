import React, { useState } from "react";
import { useRouter } from 'next/router'

// reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// scss
import footerCss from "./footer.scss";

import Img from "../Common/image";

function Footer() {
  const router = useRouter();

  // global menu
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [dropdownOpenM, setDropdownOpenM] = useState(false);
  const toggleM = () => setDropdownOpenM(prevState => !prevState);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: footerCss }}></style>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row align-items-center">
              <div className="col-md-5">
                <ul className="connection d-flex">
                  <li>
                    <a href="https://www.facebook.com/CheapestEssay/">
                      <Img src="/facebook.svg" alt="facebook" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/CheapestEssay">
                      <Img src="/twitter.svg" alt="twitter" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/cheapestessay/">
                      <Img src="/instagram.svg" alt="instagram" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCP45PAPiPMtFsmqNpkPJ8dg">
                      <Img src="/youtube.svg" alt="youtube" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/cheapest-essay">
                      <Img src="/linkedin.svg" alt="linkedin" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@cheapestessay">
                      <Img src="/tiktok.svg" alt="tiktok" width="20" height="20" />
                    </a>
                  </li>
                  <li className="global-menu d-block d-sm-none">
                    <Dropdown isOpen={dropdownOpenM} toggle={toggleM} className="global-menu">
                      <DropdownToggle className="dropdown-btn btn theme-btn">
                        Global
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><a href="https://essay-nextjs-uk.firebaseapp.com/uk">UK</a></DropdownItem>
                        <DropdownItem><a href="https://essay-nextjs-us.firebaseapp.com/" className="active">US</a></DropdownItem>
                        <DropdownItem><a href="https://essay-nextjs-uae.firebaseapp.com/">UAE</a></DropdownItem>
                        <DropdownItem><a href="https://essay-nextjs-ca.firebaseapp.com/">CA</a></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
              <div className="col-md-7">
                <div className="download">
                  <ul className="d-flex justify-content-end align-items-center">
                    <li>
                      <a href="https://apps.apple.com/us/app/cheapest-custom-writing-papers/id1447217562" target="_blank" rel="noreferrer">
                        <Img src="/app-store.png" alt="app store" width="146" height="44" />
                      </a>
                    </li>
                    <li>
                      <a href="https://play.google.com/store/apps/details?id=com.cheapestessay.service" target="_blank" rel="noreferrer">
                        <Img src="/google-play.png" alt="google play" width="146" height="44" />
                      </a>
                    </li>
                    <li className="d-none d-sm-block">
                      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="global-menu">
                        <DropdownToggle className="dropdown-btn btn theme-btn">
                          Global
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem><a href="https://essay-nextjs-uk.firebaseapp.com/">UK</a></DropdownItem>
                          <DropdownItem><a href="https://essay-nextjs-us.firebaseapp.com/" className="active">US</a></DropdownItem>
                          <DropdownItem><a href="https://essay-nextjs-uae.firebaseapp.com/">UAE</a></DropdownItem>
                          <DropdownItem><a href="https://essay-nextjs-ca.firebaseapp.com/">CA</a></DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-center">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-widget">
                  <div className="title">General</div>
                  <ul>
                    <li>
                      <a href={process.env.hostBaseUrl} onClick={router.pathname === '/' ? (e) => e.preventDefault() : null}>Essay Writing</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/services`}>Our Services</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/top-writers`}>Top Writers</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/articles`}>Articles</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/reviews`}>Essay Reviews</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/order`}>Order Now</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-widget">
                  <div className="title">Client Area</div>
                  <ul>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/about-us`}>About Us</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/how-it-works`}>How it Works</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/price`}>Pricing</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/faqs`}>FAQs</a>
                    </li>
                    <li>
                      <a href='https://www.couponupto.com/deals/cheapestessay-com'>Coupon Partner</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/contact-us`}>Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-widget">
                  <div className="title">Policy</div>
                  <ul>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/terms-of-use`}>Terms of Use</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/privacy-policy`}>Privacy Policy</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/revision-policy`}>Revision Policy</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/guarantees`}>Guarantee</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/money-back-guarantee`}>Money Back Guarantee</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/disclaimer`}>Disclaimer</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-widget">
                  <div className="title">Top Services</div>
                  <ul>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/custom-essay`}>Custom Essay</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/research-paper-writing-services`}>Research Paper</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/coursework-writing-services`}>Course Work</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/case-study-writing`}>Case Study</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/assignment-writing-service`}>Assignment</a>
                    </li>
                    <li>
                      <a href={`${process.env.hostBaseUrl}/dissertation-help`}>Dissertation</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 footer-info">
                <div className="footer-widget">
                  <div className="title">Contact</div>
                  <ul className="contactList">
                    <li><a href="tel:+19094411414" target="_blank">Text &amp; Call: +1 (909) 441-1414</a></li>
                    <li><a href="support@cheapestessay.com" target="_blank">Email: Support@CheapestEssay.com</a></li>
                    <li><a href="https://api.whatsapp.com/send?phone=19094411414" target="_blank">WhatsApp: +1 (909) 441-1414</a></li>
                    <li><a href="https://goo.gl/maps/FWiQ33fegs92" target="_blank">Location: Columbus, OH 43229</a></li>
                  </ul>
                  <a href="https://www.dmca.com/Protection/Status.aspx?ID=c9e0d5bb-c1dc-49c1-9612-a7a8ccf78800&refurl=https://www.cheapestessay.com/" target="_blank"><Img src="/paymentOpt.svg" alt="payment options" width="204" height="28" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright text-center">
            <p className="mb-0">
              <a href="https://www.copyrighted.com/website/Jtx7WAUqoPwLf5yx" target="_blank">Copyright &copy; 2021. www.CheapestEssay.com. All rights reserved.</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
