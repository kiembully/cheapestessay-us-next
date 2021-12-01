import CommonForServicePage from "../../components/home/commonForServicePage";
import Meta from "../../components/meta";

import { ukApiHelper, apiHelper } from "../../helper/apiHelper";

export default function Home(props) {
    return (
        <>
            <Meta title={props.meta.title} description={props.meta.description} keywords={props.meta.keywords} serviceName={props.serviceName && props.serviceName} />
            <CommonForServicePage serviceName={props.serviceName && props.serviceName} content={props.content && props.content} />
        </>
    )
}

export async function getStaticProps(context) {

    const DEFAULT_META = process.env.defaultMeta
    const res = await ukApiHelper(`seoV1?page=${context.params.serviceName}`, 'GET', null, null)
    const meta = res.data.status ? res.data.data : DEFAULT_META

    const resContent = await ukApiHelper(`servicesV1?page=${context.params.serviceName}`, 'GET', null, null)
    const content = resContent.data.status ? resContent.data.data : null

    return {
        props: {
            meta,
            serviceName: context.params.serviceName,
            content
        }
    }
}

export async function getStaticPaths() {
    // const res = await ukApiHelper('subMenu', 'GET', null, null)
    const res = await ukApiHelper('servicesUrl', 'GET', null, null)
    // const res = await apiHelper('servicesroutes', 'GET', null, null)
    let servicesPaths = await res.data

    // remove trailing slash
    const sanitizedPaths = servicesPaths.map(s => ({ serviceName: s.slice(1) }));
    const paths = sanitizedPaths.map((service) => ({
        params: { serviceName: service.serviceName.toString() },
    }))

    // var paths = servicesPaths.map((service) => ({
    //     params: { serviceName: service.file_name.toString() },
    // }))

    return { paths: paths, fallback: false }
}
