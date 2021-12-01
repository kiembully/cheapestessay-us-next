import React from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Favicon from '../public/favicon.ico'
import CoverPic from '../public/cover.jpg'

const setIntercom = () => {
    if (typeof window !== "undefined") {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
            ic('reattach_activator');
            ic('update', w.intercomSettings);
        } else {
            var d = document;
            var i = function () {
                i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args);
            };
            w.Intercom = i;
            var l = function () {
                var s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://widget.intercom.io/widget/je6f9lsz';
                var x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            };
            if (w.attachEvent) {
                w.attachEvent('onload', l);
            } else {
                w.addEventListener('load', l, false);
            }
        }
    }
}

function Meta(props) {

    const router = useRouter();
    var lang = 'X-default'
    if (process.env.basePath === '/uk') {
        lang = 'en-GB'
    }
    if (process.env.basePath === '/uae') {
        lang = 'en-AE'
    }
    if (process.env.basePath === '/ca') {
        lang = 'en-CA'
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />

                <title>{props.title && props.title !== '' ? props.title : 'Cheapest Essay Writing Service by Professional Essay Writer'}</title>

                <meta name="title" content={props.title && props.title !== '' ? props.title : 'Cheapest Essay Writing Service by Professional Essay Writer'} />
                <meta name="description" content={props.description && props.description !== '' ? props.description : 'Cheapest essay writing service: Hire professional essay writers &amp; get your 100 % plagiarism-free paper delivered on time. Avail of 15% discount on first order.'} />
                {/* <meta name="keywords" content={props.keywords && props.keywords !== '' ? props.keywords : 'cheapest essay writing service, essay service, essay writing service, professional essay writers, essay writers'} /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="alternate" hrefLang={lang} href={!(typeof window === 'undefined') ? window.location.href : '/'} />

                <meta name="theme-color" content="#12245A" />
                {router.pathname && router.pathname !== "/404" ? 
                <>
                <meta name="robots" content={ props.robotText ? props.robotText : "index,follow" } />
                </> : null}
                <meta name="referrer" content="no-referrer" />
                <meta name="author" content="CheapestEssay Team" />

                <meta property="og:url" content={!(typeof window === 'undefined') ? window.location.href : '/'} />
                <meta property="og:title" content={props.title && props.title !== '' ? props.title : 'Cheapest Essay Writing Service by Professional Essay Writer'} />
                <meta property="og:description" content={props.description && props.description !== '' ? props.description : 'Cheapest essay writing service: Hire professional essay writers &amp; get your 100 % plagiarism-free paper delivered on time. Avail of 15% discount on first order.'} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={props.serviceName && props.serviceName !== '' ? `/OG-Images/${props.serviceName}` : CoverPic} />

                <meta name="twitter:title" content={props.title && props.title !== '' ? props.title : 'Cheapest Essay Writing Service by Professional Essay Writer'} />
                <meta name="twitter:description" content={props.description && props.description !== '' ? props.description : 'Cheapest essay writing service: Hire professional essay writers &amp; get your 100 % plagiarism-free paper delivered on time. Avail of 15% discount on first order.'} />
                <meta name="twitter:site" content="@cheapestessay" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={CoverPic} />

                {/* <meta property="fb:app_id" content="879411082414506" /> */}

                <link rel="icon" href={Favicon} type="image/ico" sizes="16x16" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
                {router.pathname && router.pathname !== "/404" ? <link rel="canonical" href={!(typeof window === 'undefined') ? window.location.href : '/'} /> : null}
                <link rel="apple-touch-icon" href={`${process.env.hostBaseUrl}/apple-touch-icon.png`} />

                {/* Google Tag Manager */}
                <script dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-TR6NLSZ');`,
                }}>
                </script>
                {/* End Google Tag Manager  */}

                <script>
                    {setIntercom()}
                </script>
            </Head>
        </>
    );
}

export default Meta;
