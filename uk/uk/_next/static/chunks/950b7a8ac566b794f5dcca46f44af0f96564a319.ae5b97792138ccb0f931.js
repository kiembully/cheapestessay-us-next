(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{Ojay:function(e,t,n){"use strict";t.a='.faq .accordion__item{border:none;-webkit-box-shadow:0 0 20px rgba(0,0,0,.06);box-shadow:0 0 20px rgba(0,0,0,.06);margin-bottom:20px;border-radius:10px;background-color:#fff}.faq .accordion__item .accordion-button{font-size:18px;color:#151515;font-weight:500;line-height:24px;background:#fff;padding:10px 30px 10px 10px;border-radius:10px;-webkit-box-shadow:0 0 20px rgba(0,0,0,.06);box-shadow:0 0 20px rgba(0,0,0,.06)}.faq .accordion__item .accordion-button[aria-expanded=true]::after{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.faq .accordion__item .accordion-button::after{content:"";background-image:url("/dropdown-toggle.svg");width:18px;height:10px;background-size:16px;-webkit-transform:rotate(0deg);transform:rotate(0deg)}.faq .accordion__item .accordion-button img{margin-right:30px}.faq .accordion__item .accordion-body{padding:30px}.faq .accordion__item .accordion-body .desc{margin-bottom:0;width:100%;font-size:16px;line-height:28px}.faq .accordion__item .accordion-body .desc ul,.faq .accordion__item .accordion-body .desc ol{padding-left:18px}.faq .accordion__item .accordion-body .desc ul li,.faq .accordion__item .accordion-body .desc ol li{list-style:decimal;padding-left:5px}@media screen and (max-width: 991px){.faq .accordion__item .accordion-button{font-size:16px;padding-right:20px}.faq .accordion__item .accordion-button:after{width:15px;height:15px;background-size:contain}.faq .accordion__item .accordion-button img{margin-right:10px;width:40px}}'},QYuT:function(e,t,n){"use strict"},jPax:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"b",(function(){return B})),n.d(t,"c",(function(){return Q})),n.d(t,"d",(function(){return Y})),n.d(t,"e",(function(){return $}));var r=n("q1tI");function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?b(e):t}function g(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(d){o=!0,a=d}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||v(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e){return function(e){if(Array.isArray(e))return y(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||v(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){if(e){if("string"===typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var E=function e(t){var n=this,r=t.expanded,a=void 0===r?[]:r,i=t.allowMultipleExpanded,d=void 0!==i&&i,l=t.allowZeroExpanded,s=void 0!==l&&l;o(this,e),c(this,"expanded",void 0),c(this,"allowMultipleExpanded",void 0),c(this,"allowZeroExpanded",void 0),c(this,"toggleExpanded",(function(e){return n.isItemDisabled(e)?n:n.isItemExpanded(e)?n.augment({expanded:n.expanded.filter((function(t){return t!==e}))}):n.augment({expanded:n.allowMultipleExpanded?[].concat(x(n.expanded),[e]):[e]})})),c(this,"isItemDisabled",(function(e){var t=n.isItemExpanded(e),r=1===n.expanded.length;return Boolean(t&&!n.allowZeroExpanded&&r)})),c(this,"isItemExpanded",(function(e){return-1!==n.expanded.indexOf(e)})),c(this,"getPanelAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e);return{role:n.allowMultipleExpanded?void 0:"region","aria-hidden":n.allowMultipleExpanded?!r:void 0,"aria-labelledby":n.getButtonId(e),id:n.getPanelId(e),hidden:!r||void 0}})),c(this,"getHeadingAttributes",(function(){return{role:"heading"}})),c(this,"getButtonAttributes",(function(e,t){var r=null!==t&&void 0!==t?t:n.isItemExpanded(e),o=n.isItemDisabled(e);return{id:n.getButtonId(e),"aria-disabled":o,"aria-expanded":r,"aria-controls":n.getPanelId(e),role:"button",tabIndex:0}})),c(this,"getPanelId",(function(e){return"accordion__panel-".concat(e)})),c(this,"getButtonId",(function(e){return"accordion__heading-".concat(e)})),c(this,"augment",(function(t){return new e(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({expanded:n.expanded,allowMultipleExpanded:n.allowMultipleExpanded,allowZeroExpanded:n.allowZeroExpanded},t))})),this.expanded=a,this.allowMultipleExpanded=d,this.allowZeroExpanded=s},w=Object(r.createContext)(null),A=function(e){l(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return c(b(e=t.call.apply(t,[this].concat(a))),"state",new E({expanded:e.props.preExpanded,allowMultipleExpanded:e.props.allowMultipleExpanded,allowZeroExpanded:e.props.allowZeroExpanded})),c(b(e),"toggleExpanded",(function(t){e.setState((function(e){return e.toggleExpanded(t)}),(function(){e.props.onChange&&e.props.onChange(e.state.expanded)}))})),c(b(e),"isItemDisabled",(function(t){return e.state.isItemDisabled(t)})),c(b(e),"isItemExpanded",(function(t){return e.state.isItemExpanded(t)})),c(b(e),"getPanelAttributes",(function(t,n){return e.state.getPanelAttributes(t,n)})),c(b(e),"getHeadingAttributes",(function(){return e.state.getHeadingAttributes()})),c(b(e),"getButtonAttributes",(function(t,n){return e.state.getButtonAttributes(t,n)})),e}return i(n,[{key:"render",value:function(){var e=this.state,t=e.allowZeroExpanded,n=e.allowMultipleExpanded;return Object(r.createElement)(w.Provider,{value:{allowMultipleExpanded:n,allowZeroExpanded:t,toggleExpanded:this.toggleExpanded,isItemDisabled:this.isItemDisabled,isItemExpanded:this.isItemExpanded,getPanelAttributes:this.getPanelAttributes,getHeadingAttributes:this.getHeadingAttributes,getButtonAttributes:this.getButtonAttributes}},this.props.children||null)}}]),n}(r.PureComponent);c(A,"defaultProps",{allowMultipleExpanded:!1,allowZeroExpanded:!1});var O,I=function(e){l(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return c(b(e=t.call.apply(t,[this].concat(a))),"renderChildren",(function(t){return t?e.props.children(t):null})),e}return i(n,[{key:"render",value:function(){return Object(r.createElement)(w.Consumer,null,this.renderChildren)}}]),n}(r.PureComponent),j=function(e){var t=e.className,n=void 0===t?"accordion":t,o=e.allowMultipleExpanded,a=e.allowZeroExpanded,i=e.onChange,c=e.preExpanded,u=f(e,["className","allowMultipleExpanded","allowZeroExpanded","onChange","preExpanded"]);return Object(r.createElement)(A,{preExpanded:c,allowMultipleExpanded:o,allowZeroExpanded:a,onChange:i},Object(r.createElement)("div",d({"data-accordion-component":"Accordion",className:n},u)))};!function(e){e.Accordion="Accordion",e.AccordionItem="AccordionItem",e.AccordionItemButton="AccordionItemButton",e.AccordionItemHeading="AccordionItemHeading",e.AccordionItemPanel="AccordionItemPanel"}(O||(O={}));var _=O,P=0;var D=/[\u0009\u000a\u000c\u000d\u0020]/g;function k(e){return""!==e&&!D.test(e)||(console.error('uuid must be a valid HTML5 id but was given "'.concat(e,'", ASCII whitespaces are forbidden')),!1)}var C=Object(r.createContext)(null),S=function(e){var t=e.children,n=e.uuid,o=e.accordionContext,a=e.dangerouslySetExpanded,i=function(){o.toggleExpanded(n)},c=function(e){var o=null!==a&&void 0!==a?a:e.isItemExpanded(n),c=e.isItemDisabled(n),d=e.getPanelAttributes(n,a),u=e.getHeadingAttributes(n),l=e.getButtonAttributes(n,a);return Object(r.createElement)(C.Provider,{value:{uuid:n,expanded:o,disabled:c,toggleExpanded:i,panelAttributes:d,headingAttributes:u,buttonAttributes:l}},t)};return Object(r.createElement)(I,null,c)},M=function(e){return Object(r.createElement)(I,null,(function(t){return Object(r.createElement)(S,d({},e,{accordionContext:t}))}))},N=function(e){var t=e.children,n=function(e){return e?t(e):null};return Object(r.createElement)(C.Consumer,null,n)},B=function(e){var t=e.uuid,n=e.dangerouslySetExpanded,o=e.className,a=void 0===o?"accordion__item":o,i=e.activeClassName,c=f(e,["uuid","dangerouslySetExpanded","className","activeClassName"]),u=h(Object(r.useState)(function(){var e=P;return P+=1,"raa-".concat(e)}()),1)[0],l=t||u,s=function(e){var t=e.expanded&&i?i:a;return Object(r.createElement)("div",d({"data-accordion-component":"AccordionItem",className:t},c))};return k(l),c.id&&k(c.id),Object(r.createElement)(M,{uuid:l,dangerouslySetExpanded:n},Object(r.createElement)(N,null,s))};function q(e){return e&&(e.matches('[data-accordion-component="Accordion"]')?e:q(e.parentElement))}function Z(e){var t=q(e);return t&&Array.from(t.querySelectorAll('[data-accordion-component="AccordionItemButton"]'))}B.displayName=_.AccordionItem;var H="End",T="Enter",R="Home",L=" ",z="Spacebar",U="ArrowUp",V="ArrowDown",J="ArrowLeft",F="ArrowRight",K=function(e){var t=e.toggleExpanded,n=e.className,o=void 0===n?"accordion__button":n,a=f(e,["toggleExpanded","className"]);return a.id&&k(a.id),Object(r.createElement)("div",d({className:o},a,{role:"button",tabIndex:0,onClick:t,onKeyDown:function(e){var n=e.key;if(n!==T&&n!==L&&n!==z||(e.preventDefault(),t()),e.target instanceof HTMLElement)switch(n){case R:e.preventDefault(),function(e){var t=(Z(e)||[])[0];t&&t.focus()}(e.target);break;case H:e.preventDefault(),function(e){var t=Z(e)||[],n=t[t.length-1];n&&n.focus()}(e.target);break;case J:case U:e.preventDefault(),function(e){var t=Z(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n-1];r&&r.focus()}}(e.target);break;case F:case V:e.preventDefault(),function(e){var t=Z(e)||[],n=t.indexOf(e);if(-1!==n){var r=t[n+1];r&&r.focus()}}(e.target)}},"data-accordion-component":"AccordionItemButton"}))},Q=function(e){return Object(r.createElement)(N,null,(function(t){var n=t.toggleExpanded,o=t.buttonAttributes;return Object(r.createElement)(K,d({toggleExpanded:n},e,o))}))},W=function(e){l(n,e);var t=g(n);function n(){var e;o(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return c(b(e=t.call.apply(t,[this].concat(a))),"ref",void 0),c(b(e),"setRef",(function(t){e.ref=t})),e}return i(n,[{key:"componentDidUpdate",value:function(){n.VALIDATE(this.ref)}},{key:"componentDidMount",value:function(){n.VALIDATE(this.ref)}},{key:"render",value:function(){return Object(r.createElement)("div",d({"data-accordion-component":"AccordionItemHeading"},this.props,{ref:this.setRef}))}}],[{key:"VALIDATE",value:function(e){if(void 0===e)throw new Error("ref is undefined");if(1!==e.childElementCount||!e.firstElementChild||"AccordionItemButton"!==e.firstElementChild.getAttribute("data-accordion-component"))throw new Error("AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201cThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201d\n\n")}}]),n}(r.PureComponent);c(W,"defaultProps",{className:"accordion__heading","aria-level":3});var Y=function(e){return Object(r.createElement)(N,null,(function(t){var n=t.headingAttributes;return e.id&&k(e.id),Object(r.createElement)(W,d({},e,n))}))};Y.displayName=_.AccordionItemHeading;var $=function(e){var t=e.className,n=void 0===t?"accordion__panel":t,o=e.id,a=f(e,["className","id"]),i=function(e){var t=e.panelAttributes;return o&&k(o),Object(r.createElement)("div",d({"data-accordion-component":"AccordionItemPanel",className:n},a,t))};return Object(r.createElement)(N,null,i)}}}]);