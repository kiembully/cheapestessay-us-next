(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[22,61],{"33Jr":function(t,e,n){"use strict";n.d(e,"r",(function(){return c})),n.d(e,"l",(function(){return i})),n.d(e,"h",(function(){return l})),n.d(e,"o",(function(){return s})),n.d(e,"p",(function(){return d})),n.d(e,"q",(function(){return u})),n.d(e,"a",(function(){return f})),n.d(e,"t",(function(){return g})),n.d(e,"s",(function(){return h})),n.d(e,"e",(function(){return b})),n.d(e,"c",(function(){return m})),n.d(e,"d",(function(){return x})),n.d(e,"n",(function(){return y})),n.d(e,"b",(function(){return v})),n.d(e,"g",(function(){return j})),n.d(e,"j",(function(){return B})),n.d(e,"m",(function(){return E})),n.d(e,"i",(function(){return N})),n.d(e,"f",(function(){return C})),n.d(e,"k",(function(){return I}));var o,r=n("17x9"),a=n.n(r);function c(t){document.body.style.paddingRight=t>0?t+"px":null}function i(){var t=window.getComputedStyle(document.body,null);return parseInt(t&&t.getPropertyValue("padding-right")||0,10)}function l(){var t=function(){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}(),e=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=e?parseInt(e.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&c(n+t)}function s(t,e){return void 0===t&&(t=""),void 0===e&&(e=o),e?t.split(" ").map((function(t){return e[t]||t})).join(" "):t}function d(t,e){var n={};return Object.keys(t).forEach((function(o){-1===e.indexOf(o)&&(n[o]=t[o])})),n}function u(t,e){for(var n,o=Array.isArray(e)?e:[e],r=o.length,a={};r>0;)a[n=o[r-=1]]=t[n];return a}var p="object"===typeof window&&window.Element||function(){};function f(t,e,n){if(!(t[e]instanceof p))return new Error("Invalid prop `"+e+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var g=a.a.oneOfType([a.a.string,a.a.func,f,a.a.shape({current:a.a.any})]),h=a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func}),a.a.arrayOf(a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func})]))]),b={Fade:150,Collapse:350,Modal:300,Carousel:600},m=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],x={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},y={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},v=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],j=!("undefined"===typeof window||!window.document||!window.document.createElement);function w(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}function k(t){var e=typeof t;return null!=t&&("object"===e||"function"===e)}function B(t){if(function(t){return!(!t||"object"!==typeof t)&&"current"in t}(t))return t.current;if(function(t){if(!k(t))return!1;var e=w(t);return"[object Function]"===e||"[object AsyncFunction]"===e||"[object GeneratorFunction]"===e||"[object Proxy]"===e}(t))return t();if("string"===typeof t&&j){var e=document.querySelectorAll(t);if(e.length||(e=document.querySelectorAll("#"+t)),!e.length)throw new Error("The target '"+t+"' could not be identified in the dom, tip: check spelling");return e}return t}function O(t){return null!==t&&(Array.isArray(t)||j&&"number"===typeof t.length)}function E(t,e){var n=B(t);return e?O(n)?n:null===n?[]:[n]:O(n)?n[0]:n}var N=["touchstart","click"];function C(t,e,n,o){var r=t;O(r)||(r=[r]);var a=n;if("string"===typeof a&&(a=a.split(/\s+/)),!O(r)||"function"!==typeof e||!Array.isArray(a))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(a,(function(t){Array.prototype.forEach.call(r,(function(n){n.addEventListener(t,e,o)}))})),function(){Array.prototype.forEach.call(a,(function(t){Array.prototype.forEach.call(r,(function(n){n.removeEventListener(t,e,o)}))}))}}var I=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},JiBr:function(t,e,n){"use strict";n.r(e);var o=n("nKUr"),r=n("q1tI"),a=n("3Imm"),c=n("FGyW"),i=n("IgdK");e.default=function(){var t=Object(r.useState)(""),e=t[0],n=t[1],l=Object(r.useState)(),s=(l[0],l[1]),d=Object(r.useState)(""),u=d[0],p=d[1];return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("style",{dangerouslySetInnerHTML:{__html:'button.themeBtn{background:#12245a;color:#fff}button.themeBtn:before{border-color:#12245a}.contact{margin:0}.contact::before{content:""}.contactBlock{border-radius:10px;overflow:hidden;background:#fbd501;display:flex;position:relative;z-index:1}.contactBlock .left{background:#12245a;padding:22px 30px;width:380px;flex-wrap:wrap;display:flex;align-items:stretch}.contactBlock .left .title{font-size:40px;color:#fff;font-weight:700;line-height:44px;margin-bottom:15px;width:100%}.contactBlock .left .desc{color:#fff;margin-bottom:0;font-weight:400;line-height:30px;font-size:18px}.contactBlock .contactBg{position:relative;width:calc(100% - 380px)}.contactBlock .contactBg:before{content:"";background-image:url("/uk/footer-shine.svg");width:100%;height:100%;background-size:cover;position:absolute;background-position:left}.contactBlock .contactBg .right{width:70%;margin:0 auto;vertical-align:middle;height:180px;display:flex;align-items:center;justify-content:center;position:relative}.contactBlock .contactBg .right .form-control{display:block;width:100%;padding:6px 15px;font-size:16px;font-weight:400;line-height:1.5;color:#212529;background-color:#f2f6f8;background-clip:padding-box;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:6px;height:50px;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.contactBlock .contactBg .right .inputGroup{position:relative;display:flex;width:100%}.contactBlock .contactBg .right .inputGroup .emailInput{width:calc(100% - 220px);position:relative}.contactBlock .contactBg .right .inputGroup .emailInput .errorMsg{position:absolute}.contactBlock .contactBg .right .inputGroup .formControl{background:#f2f6f8;font-size:16px;padding:6px 15px;height:50px;border:none}.contactBlock .contactBg .right .inputGroup .formControl:focus{outline:none}.contactBlock .contactBg .right .inputGroup>button{margin-left:20px !important;width:200px;height:50px}.contactBlock .contactBg .right .inputGroup>button::before{content:none}@media screen and (max-width: 1440px){.contactBlock .contactBg .right{width:80%}}@media screen and (max-width: 1199px){.contactBlock .contactBg .right{width:90%}}@media screen and (max-width: 991px){.contact .contactBlock .left{width:300px;padding:28px 30px}.contact .contactBlock .left .title{font-size:24px;margin-bottom:5px}.contact .contactBlock .left .desc{line-height:24px;font-size:16px}.contact .contactBlock .contactBg{width:calc(100% - 300px)}.contact .contactBlock .contactBg .right{height:160px}.contact .contactBlock .contactBg .right .inputGroup .emailInput{width:100%}}@media screen and (max-width: 767px){.contactBlock .contactBg .right .inputGroup .emailInput .errorMsg{position:relative}}@media screen and (min-width: 576px)and (max-width: 767px){.contactBlock .contactBg .right .inputGroup{flex-wrap:wrap;justify-content:center}.contactBlock .contactBg .right .inputGroup button{margin-left:0 !important;width:auto;margin-top:10px}}@media screen and (max-width: 575px){.contact .contactBlock{display:block}.contact .contactBlock .left .desc{font-size:14px}.contact .contactBlock .left,.contact .contactBlock .contactBg{width:100%;padding:15px;text-align:center;justify-content:center}.contact .contactBlock .contactBg .right{width:100%;height:auto}.contact .contactBlock .contactBg .right .form-control{height:40px;font-size:14px}.contact .contactBlock .contactBg .right .inputGroup{flex-wrap:wrap;justify-content:center}.contact .contactBlock .contactBg .right .inputGroup button{margin-left:0 !important;margin-top:10px;padding:8px 10px;width:150px;height:auto}.contact .contactBlock .contactBg .right .inputGroup .formControl{height:40px;font-size:14px}}'}}),Object(o.jsx)("style",{dangerouslySetInnerHTML:{__html:i.a}}),Object(o.jsx)("div",{className:"contact",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"contactBlock",children:[Object(o.jsxs)("div",{className:"left",children:[Object(o.jsx)("div",{className:"title",children:"Let\u2019s Talk!"}),Object(o.jsx)("p",{className:"desc",children:"Enter your email, and we shall get back to you in an hour."})]}),Object(o.jsx)("div",{className:"contactBg",children:Object(o.jsx)("div",{className:"right",children:Object(o.jsxs)("form",{className:"inputGroup",method:"post",onSubmit:function(t){if(t.preventDefault(),""===e)p("Please Enter Email");else{p("");var n=new FormData;n.append("name","User"),n.append("email",e),n.append("message","This message was submitted thru Contact Us section."),Object(a.a)("sendcontactus","POST",n,null).then((function(t){t.data.status?(c.b.success(t.data.message),p("")):p(t.data.message)})).catch((function(t){return console.error("Error: ".concat(t))}))}},children:[Object(o.jsxs)("div",{className:"emailInput",children:[Object(o.jsx)("input",{type:"text",placeholder:"Your Email",className:"form-control",value:e,onChange:function(t){n(t.target.value)},onBlur:function(){s(e.includes("@")),p("Email should be either valid or not be blank.")}}),Object(o.jsx)("p",{className:"errorMsg",title:u,children:u})]}),Object(o.jsx)("button",{type:"submit",className:"btn theme-btn",children:"Contact Me"})]})})})]})})}),Object(o.jsx)(c.a,{autoClose:2e3})]})}},LuuA:function(t,e,n){"use strict";var o=n("nKUr"),r=n("q1tI"),a=n.n(r),c=n("wx14"),i=n("zLVn"),l=n("17x9"),s=n.n(l),d=n("TSYQ"),u=n.n(d),p=n("33Jr"),f={tag:p.s,inverse:s.a.bool,color:s.a.string,body:s.a.bool,outline:s.a.bool,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},g=function(t){var e=t.className,n=t.cssModule,o=t.color,r=t.body,l=t.inverse,s=t.outline,d=t.tag,f=t.innerRef,g=Object(i.a)(t,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),h=Object(p.o)(u()(e,"card",!!l&&"text-white",!!r&&"card-body",!!o&&(s?"border":"bg")+"-"+o),n);return a.a.createElement(d,Object(c.a)({},g,{className:h,ref:f}))};g.propTypes=f,g.defaultProps={tag:"div"};var h=g,b={tag:p.s,top:s.a.bool,bottom:s.a.bool,className:s.a.string,cssModule:s.a.object},m=function(t){var e=t.className,n=t.cssModule,o=t.top,r=t.bottom,l=t.tag,s=Object(i.a)(t,["className","cssModule","top","bottom","tag"]),d="card-img";o&&(d="card-img-top"),r&&(d="card-img-bottom");var f=Object(p.o)(u()(e,d),n);return a.a.createElement(l,Object(c.a)({},s,{className:f}))};m.propTypes=b,m.defaultProps={tag:"img"};var x=m,y={tag:p.s,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},v=function(t){var e=t.className,n=t.cssModule,o=t.innerRef,r=t.tag,l=Object(i.a)(t,["className","cssModule","innerRef","tag"]),s=Object(p.o)(u()(e,"card-body"),n);return a.a.createElement(r,Object(c.a)({},l,{className:s,ref:o}))};v.propTypes=y,v.defaultProps={tag:"div"};var j=v,w=n("YFqc"),k=n.n(w),B=[{imgSrc:"./articlesImg/article1.jpg",title:"A Leader\u2019s Guide to Building an Agile Workforce",by:"By Nishar Multani"},{imgSrc:"./articlesImg/article1.jpg",title:"How Deel Is Bringing a Global Workforce Together",by:"By Nishar Multani"},{imgSrc:"./articlesImg/article1.jpg",title:"\u2728 Codestories Newsletter  Just How Smart is AI?",by:"By Nishar Multani"}];e.a=function(){return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("style",{dangerouslySetInnerHTML:{__html:'.articlesCard{display:flex;flex-wrap:wrap;justify-content:space-between}.articlesCard .card{width:calc(33.3333333333% - 30px);margin-bottom:40px;border:none;background-color:transparent;border-radius:10px;overflow:hidden;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.articlesCard .card:hover{-webkit-box-shadow:0px 16px 48px rgba(0,0,0,.08);box-shadow:0px 16px 48px rgba(0,0,0,.08)}.articlesCard .card:hover .card-body{background-color:#fff}.articlesCard .card .img{position:relative}.articlesCard .card .img .articleImg{position:relative;overflow:hidden;height:171px}.articlesCard .card .img .articleImg img{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;object-fit:cover}.articlesCard .card .img span{position:absolute;background:#fff;font-size:14px;line-height:23px;color:#000;box-shadow:0px 6px 20px rgba(0,0,0,.04);border-radius:10px;padding:5px 15px;top:15px;left:15px;z-index:1}.articlesCard .card .img .card-img{border-radius:10px 10px 0px 0px}.articlesCard .card .card-body{padding:10px 20px;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.articlesCard .card .card-body .articleTitle{font-weight:bold;font-size:18px;line-height:23px;margin:10px 0}.articlesCard .card .card-body .articleTitle a{color:#151515;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.articlesCard .card .card-body .articleTitle a:hover{color:#12245a}.articlesCard .card .card-body .by,.articlesCard .card .card-body li{font-size:12px;line-height:28px;color:#878787}.articlesCard .card .card-body .list li+li{margin-left:15px;position:relative}.articlesCard .card .card-body .list li+li::before{content:"";position:absolute;width:4px;height:4px;border-radius:50%;background-color:#878787;left:-10px;top:10px}@media screen and (max-width: 1199px){.articlesCard .card{width:calc(33.3333333333% - 15px);margin-bottom:30px}}@media screen and (max-width: 991px){.articlesCard .card{width:calc(50% - 15px);margin-bottom:20px}.articlesCard .card .card-body{padding:10px}}@media screen and (max-width: 575px){.articlesCard .card{width:100%}.articlesCard .card .card-body .articleTitle{font-size:16px}}'}}),B&&B.map((function(t,e){return Object(o.jsxs)(h,{children:[Object(o.jsxs)("div",{className:"img",children:[Object(o.jsx)("span",{children:"Featured"}),Object(o.jsx)("div",{className:"articleImg",children:Object(o.jsx)(x,{src:t.imgSrc,alt:"Articles Img"})})]}),Object(o.jsxs)(j,{children:[Object(o.jsxs)("ul",{className:"list d-flex",children:[Object(o.jsx)("li",{children:"May 13, 2021"}),Object(o.jsx)("li",{children:"11 min read"})]}),Object(o.jsx)("h2",{className:"articleTitle",children:Object(o.jsx)(k.a,{href:"".concat("/uk","/article-detail"),children:t.title})}),Object(o.jsx)("span",{className:"by",children:t.by})]})]},e)}))]})}},TSYQ:function(t,e,n){var o;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var a=typeof o;if("string"===a||"number"===a)t.push(o);else if(Array.isArray(o)&&o.length){var c=r.apply(null,o);c&&t.push(c)}else if("object"===a)for(var i in o)n.call(o,i)&&o[i]&&t.push(i)}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(o=function(){return r}.apply(e,[]))||(t.exports=o)}()},YFqc:function(t,e,n){t.exports=n("cTJO")},cTJO:function(t,e,n){"use strict";var o=n("J4zp"),r=n("284h");e.__esModule=!0,e.default=void 0;var a=r(n("q1tI")),c=n("elyg"),i=n("nOHt"),l=n("vNVm"),s={};function d(t,e,n,o){if(t&&(0,c.isLocalURL)(e)){t.prefetch(e,n,o).catch((function(t){0}));var r=o&&"undefined"!==typeof o.locale?o.locale:t&&t.locale;s[e+"%"+n+(r?"%"+r:"")]=!0}}var u=function(t){var e=!1!==t.prefetch,n=(0,i.useRouter)(),r=n&&n.asPath||"/",u=a.default.useMemo((function(){var e=(0,c.resolveHref)(r,t.href,!0),n=o(e,2),a=n[0],i=n[1];return{href:a,as:t.as?(0,c.resolveHref)(r,t.as):i||a}}),[r,t.href,t.as]),p=u.href,f=u.as,g=t.children,h=t.replace,b=t.shallow,m=t.scroll,x=t.locale;"string"===typeof g&&(g=a.default.createElement("a",null,g));var y=a.Children.only(g),v=y&&"object"===typeof y&&y.ref,j=(0,l.useIntersection)({rootMargin:"200px"}),w=o(j,2),k=w[0],B=w[1],O=a.default.useCallback((function(t){k(t),v&&("function"===typeof v?v(t):"object"===typeof v&&(v.current=t))}),[v,k]);(0,a.useEffect)((function(){var t=B&&e&&(0,c.isLocalURL)(p),o="undefined"!==typeof x?x:n&&n.locale,r=s[p+"%"+f+(o?"%"+o:"")];t&&!r&&d(n,p,f,{locale:o})}),[f,p,B,x,e,n]);var E={ref:O,onClick:function(t){y.props&&"function"===typeof y.props.onClick&&y.props.onClick(t),t.defaultPrevented||function(t,e,n,o,r,a,i,l){("A"!==t.currentTarget.nodeName||!function(t){var e=t.currentTarget.target;return e&&"_self"!==e||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which}(t)&&(0,c.isLocalURL)(n))&&(t.preventDefault(),null==i&&(i=o.indexOf("#")<0),e[r?"replace":"push"](n,o,{shallow:a,locale:l,scroll:i}))}(t,n,p,f,h,b,m,x)},onMouseEnter:function(t){(0,c.isLocalURL)(p)&&(y.props&&"function"===typeof y.props.onMouseEnter&&y.props.onMouseEnter(t),d(n,p,f,{priority:!0}))}};if(t.passHref||"a"===y.type&&!("href"in y.props)){var N="undefined"!==typeof x?x:n&&n.locale,C=n&&n.isLocaleDomain&&(0,c.getDomainLocale)(f,N,n&&n.locales,n&&n.domainLocales);E.href=C||(0,c.addBasePath)((0,c.addLocale)(f,N,n&&n.defaultLocale))}return a.default.cloneElement(y,E)};e.default=u},vNVm:function(t,e,n){"use strict";var o=n("J4zp");e.__esModule=!0,e.useIntersection=function(t){var e=t.rootMargin,n=t.disabled||!c,l=(0,r.useRef)(),s=(0,r.useState)(!1),d=o(s,2),u=d[0],p=d[1],f=(0,r.useCallback)((function(t){l.current&&(l.current(),l.current=void 0),n||u||t&&t.tagName&&(l.current=function(t,e,n){var o=function(t){var e=t.rootMargin||"",n=i.get(e);if(n)return n;var o=new Map,r=new IntersectionObserver((function(t){t.forEach((function(t){var e=o.get(t.target),n=t.isIntersecting||t.intersectionRatio>0;e&&n&&e(n)}))}),t);return i.set(e,n={id:e,observer:r,elements:o}),n}(n),r=o.id,a=o.observer,c=o.elements;return c.set(t,e),a.observe(t),function(){c.delete(t),a.unobserve(t),0===c.size&&(a.disconnect(),i.delete(r))}}(t,(function(t){return t&&p(t)}),{rootMargin:e}))}),[n,e,u]);return(0,r.useEffect)((function(){if(!c&&!u){var t=(0,a.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,a.cancelIdleCallback)(t)}}}),[u]),[f,u]};var r=n("q1tI"),a=n("0G5g"),c="undefined"!==typeof IntersectionObserver;var i=new Map},wx14:function(t,e,n){"use strict";function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}n.d(e,"a",(function(){return o}))},zLVn:function(t,e,n){"use strict";function o(t,e){if(null==t)return{};var n,o,r={},a=Object.keys(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}n.d(e,"a",(function(){return o}))}}]);