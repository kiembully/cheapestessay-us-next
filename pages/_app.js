import React, { useEffect } from "react";
// import { useRouter } from "next/router";

// for header and footer
import Layout from '../components/layout'

// common css
import globalCss from '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  // Add lang in html tag
  // const { pathname } = useRouter();
  const lang = "en";
  // const lang = pathname.startsWith("/de") ? "de" : "en";
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCss }}></style>
      <noscript dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TR6NLSZ"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp;
