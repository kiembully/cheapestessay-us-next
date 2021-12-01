import React from "react";
import {
    UncontrolledCollapse
} from "reactstrap";
import Link from "next/link";

// components
import Contact from "../components/home/contact";
import PaginationMain from "../components/pagination";
import ArticleData from "../components/Article";
import Meta from "../components/meta";

// scss
import articleCss from "../styles/article.scss";

import Img from "../components/Common/image";

//api
import { ukApiHelper } from "../helper/apiHelper";

const data = [
    { link: "All" },
    { link: "Case Studies" },
    { link: "Design" },
    { link: "Development" },
    { link: "Interviews" },
    { link: "Machine Learning" },
    { link: "Project Management" },
];

const topics = [
    { link: "Project Management" },
    { link: "Remote Work" },
    { link: "Law" },
    { link: "essay tips" },
];

const Article = (props) => {
    return (
        <>

            <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />

            <style dangerouslySetInnerHTML={{ __html: articleCss }}></style>
            <div className="articleMain">
                <div className="top-navbar">
                    <div className="header">
                        <div className="container">
                            <div className="text-center">
                                <h1 className="section-title">Articles</h1>
                                <p className="desc">
                                    Read articles on hiring, remote work, development, sales &amp;
                                    marketing, talent education, and more.
                                </p>
                                <div className="row">
                                    <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                                        <div className="input-group faQform mt-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Articles..."
                                            />
                                            <div className="searchBtn">
                                                <Img src="/faq/search.svg" alt="search" width="18" height="18" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="articlesDetail">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="sidebar">
                                    <div className="title">Browse by:</div>
                                    <div className="categories">
                                        <div id="categories" className="subTitle">
                                            <span className="me-2">Categories</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="11.031"
                                                height="6.311"
                                                viewBox="0 0 11.031 6.311"
                                            >
                                                <path
                                                    id="Path_605"
                                                    data-name="Path 605"
                                                    d="M1277.09,8417.86l4.46,4.5,4.45-4.5"
                                                    transform="translate(-1276.029 -8416.8)"
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </div>
                                        <UncontrolledCollapse toggler="#categories">
                                            <ul className="list">
                                                {data &&
                                                    data.map(function (item, index) {
                                                        return (
                                                            <li key={index}>
                                                                <Link href={process.env.basePath}>{item.link}</Link>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </UncontrolledCollapse>
                                    </div>
                                    <div className="categories">
                                        <div id="categories" className="subTitle">
                                            <span className="me-2">Populer topics:</span>
                                        </div>
                                        <ul className="topicList">
                                            {topics &&
                                                topics.map(function (item, index) {
                                                    return (
                                                        <li key={index}>
                                                            <Link href={process.env.basePath}>{item.link}</Link>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="articlesCard">
                                    <ArticleData />
                                </div>
                                <div className="pagePagination">
                                    <PaginationMain />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Contact />
            </div>
        </>
    );
};

export async function getStaticProps(context) {
    const DEFAULT_META = process.env.defaultMeta
    const res = await ukApiHelper(`seoV1?page=articles`, 'GET', null, null)
    const meta = res.data.status ? res.data.data : DEFAULT_META

    return {
        props: {
            meta
        }
    }
}

export default Article;
