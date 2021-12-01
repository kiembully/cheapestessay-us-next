import React from "react";

// scss
import ratingScss from "./rating.scss";

import Img from "../Common/image";

function HeaderRating() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ratingScss }}></style>
      <div className="row">
        <div className="col col-xl-4">
          <div className="rating">
            <div className="left">
              <Img
                src="/trustpilot.png"
                alt="trustpilot"
                width="25"
                height="25"
              />
            </div>
            <div className="right">
              <div className="name">trustpilot</div>
              <div className="rate">
                4.8
                <Img src="/stars.svg" alt="star" width="80"
                  height="20" />
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xl-4">
          <div className="rating">
            <div className="left">
              <Img
                src="/sitejabber.png"
                alt="sitejabber"
                width="25"
                height="25"
              />
            </div>
            <div className="right">
              <div className="name">Sitejabber</div>
              <div className="rate">
                4.7
                <Img src="/stars.svg" alt="star" width="80"
                  height="20" />
              </div>
            </div>
          </div>
        </div>
        <div className="col col-xl-4">
          <div className="rating">
            <div className="left">
              <Img
                src="/Cheapestessay.png"
                alt="cheapestessay"
                width="25"
                height="25"
              />
            </div>
            <div className="right">
              <div className="name">Cheapestessay</div>
              <div className="rate">
                4.9
                <Img src="/stars.svg" alt="star" width="80"
                  height="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderRating;
