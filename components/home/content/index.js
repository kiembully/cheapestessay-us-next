import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Html Parser
import parse from 'html-react-parser';

// scss
import contentCss from "./content.scss";

const Content = (props) => {
  // get route
  const router = useRouter();

  // essay service content
  const [essayContent1, setessayContent1] = useState();
  const [essayContent2, setessayContent2] = useState();

  useEffect(() => {
    if (props.serviceData) {
      let essay_content1 = [];
      let essay_content2 = [];
      var contentLength = props.serviceData.sub_contents.length;
      var data = props.serviceData.sub_contents
      for (let i = 0; i < contentLength; i++) {
        if (i < 4) {
          essay_content1.push(data[i])
        }
        else {
          essay_content2.push(data[i])
        }
      }
      setessayContent1(essay_content1);
      setessayContent2(essay_content2);
    }
  }, [props.serviceData])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: contentCss }}></style>

      <section className="content-wrapper">
        <div className="container">
          <div className="main-wrapper">
            <>
              {props.bottomContent ? (
                <>
                  {essayContent2 && essayContent2.map((list, index) => {
                    return (
                      <div className="content-box" key={index}>
                        <div className="content">
                          <h2>{list.header && parse(list.header)}</h2>
                        </div>
                        <div className="desc mb-0">
                          {list.content && parse(list.content)}
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : (
                <>
                  {essayContent1 && essayContent1.map((list, index) => {
                    return (
                      <div className="content-box" key={index}>
                        <div className="content">
                          <h2>{list.header && parse(list.header)}</h2>
                        </div>
                        <div className="desc mb-0">
                          {list.content && parse(list.content)}
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </>
          </div>
        </div>
      </section>
    </>
  );
}

export default Content;
