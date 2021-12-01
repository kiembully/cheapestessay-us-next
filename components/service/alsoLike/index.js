import React, { useEffect, useState } from "react";

// scss
import alsoLikeCss from "./alsoLike.scss";

const peopleForCustomEssay = [
    { name: "Same Day Essay", link: "https://www.cheapestessay.com/same-day-essay-writing-service" },
    { name: "Essay Editing", link: "https://www.cheapestessay.com/essay-editing-service" },
    { name: "Scholarship Essay", link: "https://www.cheapestessay.com/scholarship-essay-writing-service" },
    { name: "College Essay", link: "https://www.cheapestessay.com/college-essay-writing-service" },
    { name: "Essay Formatting", link: "https://www.cheapestessay.com/essay-formatting-service" },
    { name: "Buy Essay", link: "https://www.cheapestessay.com/buy-essay" },
    { name: "Admission Essay", link: "https://www.cheapestessay.com/admission-essay-writing-service" },
    { name: "Pay for Essay", link: "https://www.cheapestessay.com/pay-for-essay" },
    { name: "Essay Outline", link: "https://www.cheapestessay.com/writing-an-essay-outline" },
    { name: "Write Essay For Money", link: "https://www.cheapestessay.com/write-essay-for-money" },
    { name: "Pay For Paper", link: "https://www.cheapestessay.com/pay-for-paper" },
    { name: "Fast Essay Writing Service", link: "https://www.cheapestessay.com/fast-essay-writing-service" },
    { name: "Order An Essay", link: "https://www.cheapestessay.com/order-an-essay" },
    { name: "Argumentative Essay Writing Service", link: "https://www.cheapestessay.com/argumentative-essay-writing-service" },
    { name: "Buy Argumentative Essay", link: "https://www.cheapestessay.com/buy-argumentative-essay" },
    { name: "Essays For Sale", link: "https://www.cheapestessay.com/essays-for-sale" },
    { name: "Persuasive Essay Writing Service", link: "https://www.cheapestessay.com/persuasive-essay-writing-service" },
    { name: "College Essay Editing Service", link: "https://www.cheapestessay.com/college-essay-editing-service" },
    { name: "Buy College Essays", link: "https://www.cheapestessay.com/buy-college-essays" },
    { name: "Pay For College Essay", link: "https://www.cheapestessay.com/pay-for-college-essay" },
]

const peopleForAssignment = [
    { name: "Programming Assignment Help", link: "https://www.cheapestessay.com/programming-assignment-help" },
    { name: "University Assignment Help", link: "https://www.cheapestessay.com/university-assignment-help" },
    { name: "Assignment Editing", link: "https://www.cheapestessay.com/assignment-editing" },
    { name: "Write My Assignment", link: "https://www.cheapestessay.com/write-my-assignment" },
    { name: "Assignment Help", link: "https://www.cheapestessay.com/assignment-help" },
    { name: "Buy Assignment", link: "https://www.cheapestessay.com/buy-assignment" },
    { name: "College Assignment Help", link: "https://www.cheapestessay.com/college-assignment-help" },
    { name: "Writing Multiple Choice Questions", link: "https://www.cheapestessay.com/writing-multiple-choice-questions" },
]

const peopleForResearch = [
    { name: "Custom Research Paper", link: "https://www.cheapestessay.com/custom-research-paper-writing" },
    { name: "Write Research Paper", link: "https://www.cheapestessay.com/write-my-research-paper" },
    { name: "Cheap Research Paper", link: "https://www.cheapestessay.com/cheap-research-paper" },
    { name: "Buy Research Paper", link: "https://www.cheapestessay.com/buy-research-paper-online" },
    { name: "Pay For Research Paper", link: "https://www.cheapestessay.com/pay-for-research-paper" },
    { name: "Term Paper Writer", link: "https://www.cheapestessay.com/term-paper-writer" },
    { name: "Write My Term Paper", link: "https://www.cheapestessay.com/write-my-term-paper" },
    { name: "Term Paper Help", link: "https://www.cheapestessay.com/term-paper-help" },
    { name: "Custom Term Paper", link: "https://www.cheapestessay.com/custom-term-paper" },
    { name: "Research Paper Help", link: "https://www.cheapestessay.com/research-paper-help" },
    { name: "Research Proposal", link: "https://www.cheapestessay.com/research-proposal" },
]

const peopleForCaseStudy = [
    { name: "Write My Case Study", link: "https://www.cheapestessay.com/write-my-case-study" },
    { name: "Case Study Help", link: "https://www.cheapestessay.com/case-study-help" },
]
const peopleForCourseWork = [
    { name: "Buy Coursework", link: "https://www.cheapestessay.com/buy-coursework" },
    { name: "Custom Coursework", link: "https://www.cheapestessay.com/custom-coursework" },
    { name: "Coursework Help", link: "https://www.cheapestessay.com/coursework-help-online" },
]


export default function AlsoLike(props) {
    const [serviceData, setServiceData] = useState("");
    useEffect(() => {
        if (props.serviceName) {
            if (props.serviceName === "custom-essay") {
                setServiceData(peopleForCustomEssay);
            }
            else if (props.serviceName === "research-paper-writing-services") {
                setServiceData(peopleForResearch);
            }
            else if (props.serviceName === "case-study-writing") {
                setServiceData(peopleForCaseStudy);
            }
            else if (props.serviceName === "coursework-writing-services") {
                setServiceData(peopleForCourseWork);
            }
            else if (props.serviceName === "assignment-writing-service"){
                setServiceData(peopleForAssignment);
            }
        }
    }, [props.serviceName])
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: alsoLikeCss }}></style>
            <section className="alsoLike pb-0">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">
                            People also like
                        </h2>
                        <div className="desc">CheapestEssay has 6000+ experts to handle any writing task. From essays to thesis, we create customized content to match customers’ needs. Our proficient writers have the knowledge and expertise to craft high-quality documents. Here is what we offer:
                        </div>
                    </div>
                    <ul className="list d-sm-flex flex-wrap justify-content-center">
                        {serviceData && serviceData.length > 0 ? serviceData.map(function (list, index) {
                            return (
                                <li key={index}><a href={list.link}>{list.name}</a></li>
                            )
                        }): null}
                    </ul>
                </div>
            </section>
        </>
    );
}
