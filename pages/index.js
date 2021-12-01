import React from "react";
import HomeComp from "../components/home";
import Meta from "../components/meta";
import { ukApiHelper } from "../helper/apiHelper";

export default function Home(props) {
  return (
    <>
      <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} />
      <HomeComp metaDescription={props.meta.description}/>
    </>
  );
}

export async function getStaticProps(context) {

  const DEFAULT_META = process.env.defaultMeta
  const res = await ukApiHelper(`seoV1?page=index`, 'GET', null, null)
  const meta = res.data.status ? res.data.data : DEFAULT_META

  return {
    props: {
      meta
    }
  }
}
