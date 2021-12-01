import React from "react";
import {
    CardBody,
} from "reactstrap";
import Img from "../Common/image";

// scss
import articleCss from "./article.scss";

const articlesData = [
    {
        imgSrc: "/articlesImg/article1.jpg",
        title: "A Leader’s Guide to Building an Agile Workforce",
        by: "By Nishar Multani",
    },
    {
        imgSrc: "/articlesImg/article1.jpg",
        title: "How Deel Is Bringing a Global Workforce Together",
        by: "By Nishar Multani",
    },
    {
        imgSrc: "/articlesImg/article1.jpg",
        title: "✨ Codestories Newsletter  Just How Smart is AI?",
        by: "By Nishar Multani",
    }
];

const ArticleData = () => {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: articleCss }}></style>
            {articlesData && articlesData.length > 0 ?
                articlesData.map(function (item, index) {
                    return (
                        <a href={`${process.env.hostBaseUrl}/article-detail`} className="card" key={index}>
                            <div className="img">
                                <span>Featured</span>
                                <div className="articleImg">
                                    <Img src={item.imgSrc} alt="Articles Img" height="171" width="100%" />
                                </div>
                            </div>
                            <CardBody>
                                <ul className="list d-flex">
                                    <li>May 13, 2021</li>
                                    <li>11 min read</li>
                                </ul>
                                <h2 className="articleTitle">
                                    {item.title}
                                </h2>
                                <span className="by">{item.by}</span>
                            </CardBody>
                        </a>
                    );
                }) : <div className="noReview-found">No article found</div> }
        </>
    );
};
export default ArticleData;
