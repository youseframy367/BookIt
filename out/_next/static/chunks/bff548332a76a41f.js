(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,840380,t=>{"use strict";var e=t.i(981932),a=t.i(7284),o=t=>"number"==typeof t&&!isNaN(t),r=t=>"string"==typeof t||"function"==typeof t?t:null,s=t=>(0,e.isValidElement)(t)||"string"==typeof t||"function"==typeof t||o(t);function n({enter:t,exit:a,appendPosition:o=!1,collapse:r=!0,collapseDuration:s=300}){return function({children:n,position:i,preventExitTransition:l,done:c,nodeRef:f,isIn:d,playToast:u}){let p=o?`${t}--${i}`:t,m=o?`${a}--${i}`:a,h=(0,e.useRef)(0);return(0,e.useLayoutEffect)(()=>{let t=f.current,e=p.split(" "),a=o=>{o.target===f.current&&(u(),t.removeEventListener("animationend",a),t.removeEventListener("animationcancel",a),0===h.current&&"animationcancel"!==o.type&&t.classList.remove(...e))};t.classList.add(...e),t.addEventListener("animationend",a),t.addEventListener("animationcancel",a)},[]),(0,e.useEffect)(()=>{let t=f.current,e=()=>{t.removeEventListener("animationend",e),r?function(t,e,a=300){let{scrollHeight:o,style:r}=t;requestAnimationFrame(()=>{r.minHeight="initial",r.height=o+"px",r.transition=`all ${a}ms`,requestAnimationFrame(()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(e,a)})})}(t,c,s):c()};d||(l?e():(h.current=1,t.className+=` ${m}`,t.addEventListener("animationend",e)))},[d]),e.default.createElement(e.default.Fragment,null,n)}}function i(t,e){return{content:l(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function l(t,a,o=!1){return(0,e.isValidElement)(t)&&"string"!=typeof t.type?(0,e.cloneElement)(t,{closeToast:a.closeToast,toastProps:a,data:a.data,isPaused:o}):"function"==typeof t?t({closeToast:a.closeToast,toastProps:a,data:a.data,isPaused:o}):t}function c({delay:t,isRunning:o,closeToast:r,type:s="default",hide:n,className:i,controlledProgress:l,progress:c,rtl:f,isIn:d,theme:u}){let p=n||l&&0===c,m={animationDuration:`${t}ms`,animationPlayState:o?"running":"paused"};l&&(m.transform=`scaleX(${c})`);let h=(0,a.default)("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${u}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":f}),y="function"==typeof i?i({rtl:f,type:s,defaultClassName:h}):(0,a.default)(h,i);return e.default.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":p},e.default.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${u} Toastify__progress-bar--${s}`}),e.default.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer","aria-valuenow":l?Math.round(100*c):void 0,"aria-valuemin":0,"aria-valuemax":100,className:y,style:m,...{[l&&c>=1?"onTransitionEnd":"onAnimationEnd"]:l&&c<1?null:()=>{d&&r()}}}))}var f=1,d=()=>`${f++}`,u=new Map,p=[],m=new Set,h=t=>m.forEach(e=>e(t));function y(t,e){var a;if(e)return!!(null!=(a=u.get(e))&&a.isToastActive(t));let o=!1;return u.forEach(e=>{e.isToastActive(t)&&(o=!0)}),o}function g(t,e){s(t)&&(u.size>0||p.push({content:t,options:e}),u.forEach(a=>{a.buildToast(t,e)}))}function x(t,e){u.forEach(a=>{null!=e&&null!=e&&e.containerId&&(null==e?void 0:e.containerId)!==a.id||a.toggle(t,null==e?void 0:e.id)})}function _(t,e){return g(t,e),e.toastId}function v(t,e){var a;return{...e,type:e&&e.type||t,toastId:(a=e)&&("string"==typeof a.toastId||o(a.toastId))?a.toastId:d()}}function b(t){return(e,a)=>_(e,v(t,a))}function T(t,e){return _(t,v("default",e))}T.loading=(t,e)=>_(t,v("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),T.promise=function(t,{pending:e,error:a,success:o},r){let s;e&&(s="string"==typeof e?T.loading(e,r):T.loading(e.render,{...r,...e}));let n={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},i=(t,e,a)=>{if(null==e)return void T.dismiss(s);let o={type:t,...n,...r,data:a},i="string"==typeof e?{render:e}:e;return s?T.update(s,{...o,...i}):T(i.render,{...o,...i}),a},l="function"==typeof t?t():t;return l.then(t=>i("success",o,t)).catch(t=>i("error",a,t)),l},T.success=b("success"),T.info=b("info"),T.error=b("error"),T.warning=b("warning"),T.warn=T.warning,T.dark=(t,e)=>_(t,v("default",{theme:"dark",...e})),T.dismiss=function(t){!function(t){let e;if(!(u.size>0)){p=p.filter(e=>null!=t&&e.options.toastId!==t);return}if(null==t||"string"==typeof(e=t)||o(e))u.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=u.get(t.containerId);e?e.removeToast(t.id):u.forEach(e=>{e.removeToast(t.id)})}}(t)},T.clearWaitingQueue=(t={})=>{u.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})},T.isActive=y,T.update=(t,e={})=>{let a=((t,{containerId:e})=>{var a;return null==(a=u.get(e||1))?void 0:a.toasts.get(t)})(t,e);if(a){let{props:o,content:r}=a,s={delay:100,...o,...e,toastId:e.toastId||t,updateId:d()};s.toastId!==t&&(s.staleId=t);let n=s.render||r;delete s.render,_(n,s)}},T.done=t=>{T.update(t,{progress:1})},T.onChange=function(t){return m.add(t),()=>{m.delete(t)}},T.play=t=>x(!0,t),T.pause=t=>x(!1,t);var E="u">typeof window?e.useLayoutEffect:e.useEffect,w=({theme:t,type:a,isLoading:o,...r})=>e.default.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${a})`,...r}),C={info:function(t){return e.default.createElement(w,{...t},e.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return e.default.createElement(w,{...t},e.default.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return e.default.createElement(w,{...t},e.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return e.default.createElement(w,{...t},e.default.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return e.default.createElement("div",{className:"Toastify__spinner"})}},N=t=>{let{isRunning:o,preventExitTransition:r,toastRef:s,eventHandlers:n,playToast:i}=function(t){var a,o;let[r,s]=(0,e.useState)(!1),[n,i]=(0,e.useState)(!1),l=(0,e.useRef)(null),c=(0,e.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:f,pauseOnHover:d,closeToast:p,onClick:m,closeOnClick:h}=t;function y(){s(!0)}function g(){s(!1)}function x(e){let a=l.current;if(c.canDrag&&a){c.didMove=!0,r&&g(),"x"===t.draggableDirection?c.delta=e.clientX-c.start:c.delta=e.clientY-c.start,c.start!==e.clientX&&(c.canCloseOnClick=!1);let o="x"===t.draggableDirection?`${c.delta}px, var(--y)`:`0, calc(${c.delta}px + var(--y))`;a.style.transform=`translate3d(${o},0)`,a.style.opacity=`${1-Math.abs(c.delta/c.removalDistance)}`}}function _(){document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",_);let e=l.current;if(c.canDrag&&c.didMove&&e){if(c.canDrag=!1,Math.abs(c.delta)>c.removalDistance){i(!0),t.closeToast(!0),t.collapseAll();return}e.style.transition="transform 0.2s, opacity 0.2s",e.style.removeProperty("transform"),e.style.removeProperty("opacity")}}a={id:t.toastId,containerId:t.containerId,fn:s},null==(o=u.get(a.containerId||1))||o.setToggle(a.id,a.fn),(0,e.useEffect)(()=>{if(t.pauseOnFocusLoss)return document.hasFocus()||g(),window.addEventListener("focus",y),window.addEventListener("blur",g),()=>{window.removeEventListener("focus",y),window.removeEventListener("blur",g)}},[t.pauseOnFocusLoss]);let v={onPointerDown:function(e){if(!0===t.draggable||t.draggable===e.pointerType){c.didMove=!1,document.addEventListener("pointermove",x),document.addEventListener("pointerup",_);let a=l.current;c.canCloseOnClick=!0,c.canDrag=!0,a.style.transition="none","x"===t.draggableDirection?(c.start=e.clientX,c.removalDistance=a.offsetWidth*(t.draggablePercent/100)):(c.start=e.clientY,c.removalDistance=a.offsetHeight*(80===t.draggablePercent?1.5*t.draggablePercent:t.draggablePercent)/100)}},onPointerUp:function(e){let{top:a,bottom:o,left:r,right:s}=l.current.getBoundingClientRect();"mouse"===e.pointerType&&t.pauseOnHover&&e.clientX>=r&&e.clientX<=s&&e.clientY>=a&&e.clientY<=o?g():y()}};return f&&d&&(v.onMouseEnter=g,t.stacked||(v.onMouseLeave=y)),h&&(v.onClick=t=>{m&&m(t),c.canCloseOnClick&&p(!0)}),{playToast:y,pauseToast:g,isRunning:r,preventExitTransition:n,toastRef:l,eventHandlers:v}}(t),{closeButton:f,children:d,autoClose:p,onClick:m,type:h,hideProgressBar:y,closeToast:g,transition:x,position:_,className:v,style:b,progressClassName:T,updateId:E,role:w,progress:N,rtl:k,toastId:I,deleteToast:R,isIn:M,isLoading:A,closeOnClick:P,theme:O,ariaLabel:L}=t,z=(0,a.default)("Toastify__toast",`Toastify__toast-theme--${O}`,`Toastify__toast--${h}`,{"Toastify__toast--rtl":k},{"Toastify__toast--close-on-click":P}),S="function"==typeof v?v({rtl:k,position:_,type:h,defaultClassName:z}):(0,a.default)(z,v),D=function({theme:t,type:a,isLoading:o,icon:r}){let s=null,n={theme:t,type:a};return!1===r||("function"==typeof r?s=r({...n,isLoading:o}):(0,e.isValidElement)(r)?s=(0,e.cloneElement)(r,n):o?s=C.spinner():a in C&&(s=C[a](n))),s}(t),F=!!N||!p,j={closeToast:g,type:h,theme:O},B=null;return!1===f||(B="function"==typeof f?f(j):(0,e.isValidElement)(f)?(0,e.cloneElement)(f,j):function({closeToast:t,theme:a,ariaLabel:o="close"}){return e.default.createElement("button",{className:`Toastify__close-button Toastify__close-button--${a}`,type:"button",onClick:e=>{e.stopPropagation(),t(!0)},"aria-label":o},e.default.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},e.default.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(j)),e.default.createElement(x,{isIn:M,done:R,position:_,preventExitTransition:r,nodeRef:s,playToast:i},e.default.createElement("div",{id:I,tabIndex:0,onClick:m,"data-in":M,className:S,...n,style:b,ref:s,...M&&{role:w,"aria-label":L}},null!=D&&e.default.createElement("div",{className:(0,a.default)("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!A})},D),l(d,t,!o),B,!t.customProgressBar&&e.default.createElement(c,{...E&&!F?{key:`p-${E}`}:{},rtl:k,theme:O,delay:p,isRunning:o,isIn:M,closeToast:g,hide:y,type:h,className:T,controlledProgress:F,progress:N||0})))},k=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),I=n(k("bounce",!0));n(k("slide",!0)),n(k("zoom")),n(k("flip"));var R={position:"top-right",transition:I,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&"KeyT"===t.code};function M(t){let n={...R,...t},l=t.stacked,[c,f]=(0,e.useState)(!0),d=(0,e.useRef)(null),{getToastToRender:m,isToastActive:x,count:_}=function(t){var a;let n,{subscribe:l,getSnapshot:c,setProps:f}=(0,e.useRef)((n=t.containerId||1,{subscribe(e){let a,l,c,f,d,m,y,x,_,v,b,T=(a=1,l=0,c=[],f=[],d=t,m=new Map,y=new Set,x=()=>{f=Array.from(m.values()),y.forEach(t=>t())},_=t=>{var e,a;t.isActive&&(null==(a=null==(e=t.props)?void 0:e.onClose)||a.call(e,t.removalReason),t.isActive=!1,h(i(t,"removed")))},v=t=>{if(null==t)m.forEach(_);else{let e=m.get(t);e&&_(e)}x()},b=t=>{var e,a;let{toastId:o,updateId:r}=t.props,s=null==r;t.staleId&&m.delete(t.staleId),t.isActive=!0,m.set(o,t),x(),h(i(t,s?"added":"updated")),s&&(null==(a=(e=t.props).onOpen)||a.call(e))},{id:n,props:d,observe:t=>(y.add(t),()=>y.delete(t)),toggle:(t,e)=>{m.forEach(a=>{var o;(null==e||e===a.props.toastId)&&(null==(o=a.toggle)||o.call(a,t))})},removeToast:v,toasts:m,clearQueue:()=>{l-=c.length,c=[]},buildToast:(t,e)=>{let i,f;if((({containerId:t,toastId:e,updateId:a})=>{let o=m.has(e)&&null==a;return(t?t!==n:1!==n)||o})(e))return;let{toastId:u,updateId:p,data:h,staleId:y,delay:g}=e,_=null==p;_&&l++;let T={...d,style:d.toastStyle,key:a++,...Object.fromEntries(Object.entries(e).filter(([t,e])=>null!=e)),toastId:u,updateId:p,data:h,isIn:!1,className:r(e.className||d.toastClassName),progressClassName:r(e.progressClassName||d.progressClassName),autoClose:!e.isLoading&&(i=e.autoClose,f=d.autoClose,!1===i||o(i)&&i>0?i:f),closeToast(t){let e=m.get(u);e&&(e.removalReason=t,v(u))},deleteToast(){if(null!=m.get(u)){if(m.delete(u),--l<0&&(l=0),c.length>0)return void b(c.shift());x()}}};T.closeButton=d.closeButton,!1===e.closeButton||s(e.closeButton)?T.closeButton=e.closeButton:!0===e.closeButton&&(T.closeButton=!s(d.closeButton)||d.closeButton);let E={content:t,props:T,staleId:y};d.limit&&d.limit>0&&l>d.limit&&_?c.push(E):o(g)?setTimeout(()=>{b(E)},g):b(E)},setProps(t){d=t},setToggle:(t,e)=>{let a=m.get(t);a&&(a.toggle=e)},isToastActive:t=>{var e;return null==(e=m.get(t))?void 0:e.isActive},getSnapshot:()=>f});u.set(n,T);let E=T.observe(e);return p.forEach(t=>g(t.content,t.options)),p=[],()=>{E(),u.delete(n)}},setProps(t){var e;null==(e=u.get(n))||e.setProps(t)},getSnapshot(){var t;return null==(t=u.get(n))?void 0:t.getSnapshot()}})).current;f(t);let d=null==(a=(0,e.useSyncExternalStore)(l,c,c))?void 0:a.slice();return{getToastToRender:function(e){if(!d)return[];let a=new Map;return t.newestOnTop&&d.reverse(),d.forEach(t=>{let{position:e}=t.props;a.has(e)||a.set(e,[]),a.get(e).push(t)}),Array.from(a,t=>e(t[0],t[1]))},isToastActive:y,count:null==d?void 0:d.length}}(n),{className:v,style:b,rtl:w,containerId:C,hotKeys:k}=n;function I(){l&&(f(!0),T.play())}return E(()=>{var t;if(l){let e=d.current.querySelectorAll('[data-in="true"]'),a=null==(t=n.position)?void 0:t.includes("top"),o=0,r=0;Array.from(e).reverse().forEach((t,e)=>{t.classList.add("Toastify__toast--stacked"),e>0&&(t.dataset.collapsed=`${c}`),t.dataset.pos||(t.dataset.pos=a?"top":"bot");let s=o*(c?.2:1)+(c?0:12*e),n=Math.max(.5,1-(c?r:0));t.style.setProperty("--y",`${a?s:-1*s}px`),t.style.setProperty("--g","12"),t.style.setProperty("--s",`${n}`),o+=t.offsetHeight,r+=.025})}},[c,_,l]),(0,e.useEffect)(()=>{function t(t){var e;let a=d.current;k(t)&&(null==(e=null==a?void 0:a.querySelector('[tabIndex="0"]'))||e.focus(),f(!1),T.pause()),"Escape"===t.key&&(document.activeElement===a||null!=a&&a.contains(document.activeElement))&&(f(!0),T.play())}return document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}},[k]),e.default.createElement("section",{ref:d,className:"Toastify",id:C,onMouseEnter:()=>{l&&(f(!1),T.pause())},onMouseLeave:I,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":n["aria-label"]},m((t,o)=>{var s;let n,i=o.length?{...b}:{...b,pointerEvents:"none"};return e.default.createElement("div",{tabIndex:-1,className:(s=t,n=(0,a.default)("Toastify__toast-container",`Toastify__toast-container--${s}`,{"Toastify__toast-container--rtl":w}),"function"==typeof v?v({position:s,rtl:w,defaultClassName:n}):(0,a.default)(n,r(v))),"data-stacked":l,style:i,key:`c-${t}`},o.map(({content:t,props:a})=>e.default.createElement(N,{...a,stacked:l,collapseAll:I,isIn:x(a.toastId,a.containerId),key:`t-${a.key}`},t)))}))}var A=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,P=new Map;function O(t){var a;return E(()=>{if(!A||"u"<typeof document)return;let t=document,e=P.get(t);if(e){a&&e.setAttribute("nonce",a);return}let o=t.createElement("style");o.textContent=A,a&&o.setAttribute("nonce",a),t.head.appendChild(o),P.set(t,o)},[a=t.nonce]),e.default.createElement(M,{...t})}t.s(["ToastContainer",()=>O,"toast",()=>T])},664202,t=>{"use strict";let e,a;var o,r,s,n,i,l=t.i(981932),c=Object.defineProperty,f=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,p=(t,e,a)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,m=(t,e)=>{for(var a in e||(e={}))d.call(e,a)&&p(t,a,e[a]);if(f)for(var a of f(e))u.call(e,a)&&p(t,a,e[a]);return t},h=(t,e)=>{var a={};for(var o in t)d.call(t,o)&&0>e.indexOf(o)&&(a[o]=t[o]);if(null!=t&&f)for(var o of f(t))0>e.indexOf(o)&&u.call(t,o)&&(a[o]=t[o]);return a};(t=>{let e=class e{constructor(t,a,o,s){if(this.version=t,this.errorCorrectionLevel=a,this.modules=[],this.isFunction=[],t<e.MIN_VERSION||t>e.MAX_VERSION)throw RangeError("Version value out of range");if(s<-1||s>7)throw RangeError("Mask value out of range");this.size=4*t+17;let n=[];for(let t=0;t<this.size;t++)n.push(!1);for(let t=0;t<this.size;t++)this.modules.push(n.slice()),this.isFunction.push(n.slice());this.drawFunctionPatterns();const i=this.addEccAndInterleave(o);if(this.drawCodewords(i),-1==s){let t=1e9;for(let e=0;e<8;e++){this.applyMask(e),this.drawFormatBits(e);const a=this.getPenaltyScore();a<t&&(s=e,t=a),this.applyMask(e)}}r(0<=s&&s<=7),this.mask=s,this.applyMask(s),this.drawFormatBits(s),this.isFunction=[]}static encodeText(a,o){let r=t.QrSegment.makeSegments(a);return e.encodeSegments(r,o)}static encodeBinary(a,o){let r=t.QrSegment.makeBytes(a);return e.encodeSegments([r],o)}static encodeSegments(t,o,s=1,i=40,l=-1,c=!0){let f,d;if(!(e.MIN_VERSION<=s&&s<=i&&i<=e.MAX_VERSION)||l<-1||l>7)throw RangeError("Invalid value");for(f=s;;f++){let a=8*e.getNumDataCodewords(f,o),r=n.getTotalBits(t,f);if(r<=a){d=r;break}if(f>=i)throw RangeError("Data too long")}for(let t of[e.Ecc.MEDIUM,e.Ecc.QUARTILE,e.Ecc.HIGH])c&&d<=8*e.getNumDataCodewords(f,t)&&(o=t);let u=[];for(let e of t)for(let t of(a(e.mode.modeBits,4,u),a(e.numChars,e.mode.numCharCountBits(f),u),e.getData()))u.push(t);r(u.length==d);let p=8*e.getNumDataCodewords(f,o);r(u.length<=p),a(0,Math.min(4,p-u.length),u),a(0,(8-u.length%8)%8,u),r(u.length%8==0);for(let t=236;u.length<p;t^=253)a(t,8,u);let m=[];for(;8*m.length<u.length;)m.push(0);return u.forEach((t,e)=>m[e>>>3]|=t<<7-(7&e)),new e(f,o,m,l)}getModule(t,e){return 0<=t&&t<this.size&&0<=e&&e<this.size&&this.modules[e][t]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);let t=this.getAlignmentPatternPositions(),e=t.length;for(let a=0;a<e;a++)for(let o=0;o<e;o++)(0!=a||0!=o)&&(0!=a||o!=e-1)&&(a!=e-1||0!=o)&&this.drawAlignmentPattern(t[a],t[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(t){let e=this.errorCorrectionLevel.formatBits<<3|t,a=e;for(let t=0;t<10;t++)a=a<<1^(a>>>9)*1335;let s=(e<<10|a)^21522;r(s>>>15==0);for(let t=0;t<=5;t++)this.setFunctionModule(8,t,o(s,t));this.setFunctionModule(8,7,o(s,6)),this.setFunctionModule(8,8,o(s,7)),this.setFunctionModule(7,8,o(s,8));for(let t=9;t<15;t++)this.setFunctionModule(14-t,8,o(s,t));for(let t=0;t<8;t++)this.setFunctionModule(this.size-1-t,8,o(s,t));for(let t=8;t<15;t++)this.setFunctionModule(8,this.size-15+t,o(s,t));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let t=this.version;for(let e=0;e<12;e++)t=t<<1^(t>>>11)*7973;let e=this.version<<12|t;r(e>>>18==0);for(let t=0;t<18;t++){let a=o(e,t),r=this.size-11+t%3,s=Math.floor(t/3);this.setFunctionModule(r,s,a),this.setFunctionModule(s,r,a)}}drawFinderPattern(t,e){for(let a=-4;a<=4;a++)for(let o=-4;o<=4;o++){let r=Math.max(Math.abs(o),Math.abs(a)),s=t+o,n=e+a;0<=s&&s<this.size&&0<=n&&n<this.size&&this.setFunctionModule(s,n,2!=r&&4!=r)}}drawAlignmentPattern(t,e){for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)this.setFunctionModule(t+o,e+a,1!=Math.max(Math.abs(o),Math.abs(a)))}setFunctionModule(t,e,a){this.modules[e][t]=a,this.isFunction[e][t]=!0}addEccAndInterleave(t){let a=this.version,o=this.errorCorrectionLevel;if(t.length!=e.getNumDataCodewords(a,o))throw RangeError("Invalid argument");let s=e.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][a],n=e.ECC_CODEWORDS_PER_BLOCK[o.ordinal][a],i=Math.floor(e.getNumRawDataModules(a)/8),l=s-i%s,c=Math.floor(i/s),f=[],d=e.reedSolomonComputeDivisor(n);for(let a=0,o=0;a<s;a++){let r=t.slice(o,o+c-n+(a<l?0:1));o+=r.length;let s=e.reedSolomonComputeRemainder(r,d);a<l&&r.push(0),f.push(r.concat(s))}let u=[];for(let t=0;t<f[0].length;t++)f.forEach((e,a)=>{(t!=c-n||a>=l)&&u.push(e[t])});return r(u.length==i),u}drawCodewords(t){if(t.length!=Math.floor(e.getNumRawDataModules(this.version)/8))throw RangeError("Invalid argument");let a=0;for(let e=this.size-1;e>=1;e-=2){6==e&&(e=5);for(let r=0;r<this.size;r++)for(let s=0;s<2;s++){let n=e-s,i=(e+1&2)==0?this.size-1-r:r;!this.isFunction[i][n]&&a<8*t.length&&(this.modules[i][n]=o(t[a>>>3],7-(7&a)),a++)}}r(a==8*t.length)}applyMask(t){if(t<0||t>7)throw RangeError("Mask value out of range");for(let e=0;e<this.size;e++)for(let a=0;a<this.size;a++){let o;switch(t){case 0:o=(a+e)%2==0;break;case 1:o=e%2==0;break;case 2:o=a%3==0;break;case 3:o=(a+e)%3==0;break;case 4:o=(Math.floor(a/3)+Math.floor(e/2))%2==0;break;case 5:o=a*e%2+a*e%3==0;break;case 6:o=(a*e%2+a*e%3)%2==0;break;case 7:o=((a+e)%2+a*e%3)%2==0;break;default:throw Error("Unreachable")}!this.isFunction[e][a]&&o&&(this.modules[e][a]=!this.modules[e][a])}}getPenaltyScore(){let t=0;for(let a=0;a<this.size;a++){let o=!1,r=0,s=[0,0,0,0,0,0,0];for(let n=0;n<this.size;n++)this.modules[a][n]==o?5==++r?t+=e.PENALTY_N1:r>5&&t++:(this.finderPenaltyAddHistory(r,s),o||(t+=this.finderPenaltyCountPatterns(s)*e.PENALTY_N3),o=this.modules[a][n],r=1);t+=this.finderPenaltyTerminateAndCount(o,r,s)*e.PENALTY_N3}for(let a=0;a<this.size;a++){let o=!1,r=0,s=[0,0,0,0,0,0,0];for(let n=0;n<this.size;n++)this.modules[n][a]==o?5==++r?t+=e.PENALTY_N1:r>5&&t++:(this.finderPenaltyAddHistory(r,s),o||(t+=this.finderPenaltyCountPatterns(s)*e.PENALTY_N3),o=this.modules[n][a],r=1);t+=this.finderPenaltyTerminateAndCount(o,r,s)*e.PENALTY_N3}for(let a=0;a<this.size-1;a++)for(let o=0;o<this.size-1;o++){let r=this.modules[a][o];r==this.modules[a][o+1]&&r==this.modules[a+1][o]&&r==this.modules[a+1][o+1]&&(t+=e.PENALTY_N2)}let a=0;for(let t of this.modules)a=t.reduce((t,e)=>t+ +!!e,a);let o=this.size*this.size,s=Math.ceil(Math.abs(20*a-10*o)/o)-1;return r(0<=s&&s<=9),r(0<=(t+=s*e.PENALTY_N4)&&t<=2568888),t}getAlignmentPatternPositions(){if(1==this.version)return[];{let t=Math.floor(this.version/7)+2,e=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*t-2)),a=[6];for(let o=this.size-7;a.length<t;o-=e)a.splice(1,0,o);return a}}static getNumRawDataModules(t){if(t<e.MIN_VERSION||t>e.MAX_VERSION)throw RangeError("Version number out of range");let a=(16*t+128)*t+64;if(t>=2){let e=Math.floor(t/7)+2;a-=(25*e-10)*e-55,t>=7&&(a-=36)}return r(208<=a&&a<=29648),a}static getNumDataCodewords(t,a){return Math.floor(e.getNumRawDataModules(t)/8)-e.ECC_CODEWORDS_PER_BLOCK[a.ordinal][t]*e.NUM_ERROR_CORRECTION_BLOCKS[a.ordinal][t]}static reedSolomonComputeDivisor(t){if(t<1||t>255)throw RangeError("Degree out of range");let a=[];for(let e=0;e<t-1;e++)a.push(0);a.push(1);let o=1;for(let r=0;r<t;r++){for(let t=0;t<a.length;t++)a[t]=e.reedSolomonMultiply(a[t],o),t+1<a.length&&(a[t]^=a[t+1]);o=e.reedSolomonMultiply(o,2)}return a}static reedSolomonComputeRemainder(t,a){let o=a.map(t=>0);for(let r of t){let t=r^o.shift();o.push(0),a.forEach((a,r)=>o[r]^=e.reedSolomonMultiply(a,t))}return o}static reedSolomonMultiply(t,e){if(t>>>8!=0||e>>>8!=0)throw RangeError("Byte out of range");let a=0;for(let o=7;o>=0;o--)a=a<<1^(a>>>7)*285^(e>>>o&1)*t;return r(a>>>8==0),a}finderPenaltyCountPatterns(t){let e=t[1];r(e<=3*this.size);let a=e>0&&t[2]==e&&t[3]==3*e&&t[4]==e&&t[5]==e;return(a&&t[0]>=4*e&&t[6]>=e?1:0)+(a&&t[6]>=4*e&&t[0]>=e?1:0)}finderPenaltyTerminateAndCount(t,e,a){return t&&(this.finderPenaltyAddHistory(e,a),e=0),e+=this.size,this.finderPenaltyAddHistory(e,a),this.finderPenaltyCountPatterns(a)}finderPenaltyAddHistory(t,e){0==e[0]&&(t+=this.size),e.pop(),e.unshift(t)}};function a(t,e,a){if(e<0||e>31||t>>>e!=0)throw RangeError("Value out of range");for(let o=e-1;o>=0;o--)a.push(t>>>o&1)}function o(t,e){return(t>>>e&1)!=0}function r(t){if(!t)throw Error("Assertion error")}e.MIN_VERSION=1,e.MAX_VERSION=40,e.PENALTY_N1=3,e.PENALTY_N2=3,e.PENALTY_N3=40,e.PENALTY_N4=10,e.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],e.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],t.QrCode=e;let s=class t{constructor(t,e,a){if(this.mode=t,this.numChars=e,this.bitData=a,e<0)throw RangeError("Invalid argument");this.bitData=a.slice()}static makeBytes(e){let o=[];for(let t of e)a(t,8,o);return new t(t.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!t.isNumeric(e))throw RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){let r=Math.min(e.length-t,3);a(parseInt(e.substring(t,t+r),10),3*r+1,o),t+=r}return new t(t.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){let o;if(!t.isAlphanumeric(e))throw RangeError("String contains unencodable characters in alphanumeric mode");let r=[];for(o=0;o+2<=e.length;o+=2){let s=45*t.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o));a(s+=t.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o+1)),11,r)}return o<e.length&&a(t.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o)),6,r),new t(t.Mode.ALPHANUMERIC,e.length,r)}static makeSegments(e){return""==e?[]:t.isNumeric(e)?[t.makeNumeric(e)]:t.isAlphanumeric(e)?[t.makeAlphanumeric(e)]:[t.makeBytes(t.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw RangeError("ECI assignment value out of range");if(e<128)a(e,8,o);else if(e<16384)a(2,2,o),a(e,14,o);else if(e<1e6)a(6,3,o),a(e,21,o);else throw RangeError("ECI assignment value out of range");return new t(t.Mode.ECI,0,o)}static isNumeric(e){return t.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return t.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(t,e){let a=0;for(let o of t){let t=o.mode.numCharCountBits(e);if(o.numChars>=1<<t)return 1/0;a+=4+t+o.bitData.length}return a}static toUtf8ByteArray(t){t=encodeURI(t);let e=[];for(let a=0;a<t.length;a++)"%"!=t.charAt(a)?e.push(t.charCodeAt(a)):(e.push(parseInt(t.substring(a+1,a+3),16)),a+=2);return e}};s.NUMERIC_REGEX=/^[0-9]*$/,s.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,s.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let n=s;t.QrSegment=s})(i||(i={})),r=(o=i||(i={})).QrCode||(o.QrCode={}),(e=class{constructor(t,e){this.ordinal=t,this.formatBits=e}}).LOW=new e(0,1),e.MEDIUM=new e(1,0),e.QUARTILE=new e(2,3),e.HIGH=new e(3,2),r.Ecc=e,n=(s=i||(i={})).QrSegment||(s.QrSegment={}),(a=class{constructor(t,e){this.modeBits=t,this.numBitsCharCount=e}numCharCountBits(t){return this.numBitsCharCount[Math.floor((t+7)/17)]}}).NUMERIC=new a(1,[10,12,14]),a.ALPHANUMERIC=new a(2,[9,11,13]),a.BYTE=new a(4,[8,16,16]),a.KANJI=new a(8,[8,10,12]),a.ECI=new a(7,[0,0,0]),n.Mode=a;var y=i,g={L:y.QrCode.Ecc.LOW,M:y.QrCode.Ecc.MEDIUM,Q:y.QrCode.Ecc.QUARTILE,H:y.QrCode.Ecc.HIGH},x="#FFFFFF",_="#000000";function v(t,e=0){let a=[];return t.forEach(function(t,o){let r=null;t.forEach(function(s,n){if(!s&&null!==r){a.push(`M${r+e} ${o+e}h${n-r}v1H${r+e}z`),r=null;return}if(n===t.length-1){if(!s)return;null===r?a.push(`M${n+e},${o+e} h1v1H${n+e}z`):a.push(`M${r+e},${o+e} h${n+1-r}v1H${r+e}z`);return}s&&null===r&&(r=n)})}),a.join("")}function b(t,e){return t.slice().map((t,a)=>a<e.y||a>=e.y+e.h?t:t.map((t,a)=>(a<e.x||a>=e.x+e.w)&&t))}function T({value:t,level:e,minVersion:a,includeMargin:o,marginSize:r,imageSettings:s,size:n,boostLevel:i}){let c=l.default.useMemo(()=>{let o=(Array.isArray(t)?t:[t]).reduce((t,e)=>(t.push(...y.QrSegment.makeSegments(e)),t),[]);return y.QrCode.encodeSegments(o,g[e],a,void 0,void 0,i)},[t,e,a,i]),{cells:f,margin:d,numCells:u,calculatedImageSettings:p}=l.default.useMemo(()=>{let t=c.getModules(),e=null!=r?Math.max(Math.floor(r),0):4*!!o,a=t.length+2*e,i=function(t,e,a,o){if(null==o)return null;let r=t.length+2*a,s=Math.floor(.1*e),n=r/e,i=(o.width||s)*n,l=(o.height||s)*n,c=null==o.x?t.length/2-i/2:o.x*n,f=null==o.y?t.length/2-l/2:o.y*n,d=null==o.opacity?1:o.opacity,u=null;if(o.excavate){let t=Math.floor(c),e=Math.floor(f),a=Math.ceil(i+c-t),o=Math.ceil(l+f-e);u={x:t,y:e,w:a,h:o}}return{x:c,y:f,h:l,w:i,excavation:u,opacity:d,crossOrigin:o.crossOrigin}}(t,n,e,s);return{cells:t,margin:e,numCells:a,calculatedImageSettings:i}},[c,n,s,o,r]);return{qrcode:c,margin:d,cells:f,numCells:u,calculatedImageSettings:p}}var E=function(){try{new Path2D().addPath(new Path2D)}catch(t){return!1}return!0}(),w=l.default.forwardRef(function(t,e){let{value:a,size:o=128,level:r="L",bgColor:s=x,fgColor:n=_,includeMargin:i=!1,minVersion:c=1,boostLevel:f,marginSize:d,imageSettings:u}=t,p=h(t,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:y}=p,g=h(p,["style"]),w=null==u?void 0:u.src,C=l.default.useRef(null),N=l.default.useRef(null),k=l.default.useCallback(t=>{C.current=t,"function"==typeof e?e(t):e&&(e.current=t)},[e]),[I,R]=l.default.useState(!1),{margin:M,cells:A,numCells:P,calculatedImageSettings:O}=T({value:a,level:r,minVersion:c,boostLevel:f,includeMargin:i,marginSize:d,imageSettings:u,size:o});l.default.useEffect(()=>{if(null!=C.current){let t=C.current,e=t.getContext("2d");if(!e)return;let a=A,r=N.current,i=null!=O&&null!==r&&r.complete&&0!==r.naturalHeight&&0!==r.naturalWidth;i&&null!=O.excavation&&(a=b(A,O.excavation));let l=window.devicePixelRatio||1;t.height=t.width=o*l;let c=o/P*l;e.scale(c,c),e.fillStyle=s,e.fillRect(0,0,P,P),e.fillStyle=n,E?e.fill(new Path2D(v(a,M))):A.forEach(function(t,a){t.forEach(function(t,o){t&&e.fillRect(o+M,a+M,1,1)})}),O&&(e.globalAlpha=O.opacity),i&&e.drawImage(r,O.x+M,O.y+M,O.w,O.h)}}),l.default.useEffect(()=>{R(!1)},[w]);let L=m({height:o,width:o},y),z=null;return null!=w&&(z=l.default.createElement("img",{src:w,key:w,style:{display:"none"},onLoad:()=>{R(!0)},ref:N,crossOrigin:null==O?void 0:O.crossOrigin})),l.default.createElement(l.default.Fragment,null,l.default.createElement("canvas",m({style:L,height:o,width:o,ref:k,role:"img"},g)),z)});w.displayName="QRCodeCanvas",l.default.forwardRef(function(t,e){let{value:a,size:o=128,level:r="L",bgColor:s=x,fgColor:n=_,includeMargin:i=!1,minVersion:c=1,boostLevel:f,title:d,marginSize:u,imageSettings:p}=t,y=h(t,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:g,cells:E,numCells:w,calculatedImageSettings:C}=T({value:a,level:r,minVersion:c,boostLevel:f,includeMargin:i,marginSize:u,imageSettings:p,size:o}),N=E,k=null;null!=p&&null!=C&&(null!=C.excavation&&(N=b(E,C.excavation)),k=l.default.createElement("image",{href:p.src,height:C.h,width:C.w,x:C.x+g,y:C.y+g,preserveAspectRatio:"none",opacity:C.opacity,crossOrigin:C.crossOrigin}));let I=v(N,g);return l.default.createElement("svg",m({height:o,width:o,viewBox:`0 0 ${w} ${w}`,ref:e,role:"img"},y),!!d&&l.default.createElement("title",null,d),l.default.createElement("path",{fill:s,d:`M0,0 h${w}v${w}H0z`,shapeRendering:"crispEdges"}),l.default.createElement("path",{fill:n,d:I,shapeRendering:"crispEdges"}),k)}).displayName="QRCodeSVG",t.s(["QRCodeCanvas",()=>w])},466362,t=>{"use strict";var e=t.i(683034),a=t.i(981932),o=t.i(840380),r=t.i(664202);function s(){let t=`
  https://www.restaurant-management-system-t...
`,s=(0,a.useRef)(null),[n,i]=(0,a.useState)({placeName:"قصر الكبابجى",site:"القاهره",email:"youssefRamy@gmail.com",numPon:"010 2352 2063",lastNumPon:"0102358890",TypeOfTrade:"حساب خاص بمطعم",image:"/img/lkhgkjggujk.svg"}),[l,c]=(0,a.useState)({placeName:!0,site:!0,email:!0,numPon:!0,lastNumPon:!0,TypeOfTrade:!0}),[f,d]=(0,a.useState)(null),u=(0,a.useRef)(null),p=t=>{c(e=>({...e,[t]:!1}))},m=(t,e)=>{let a={...n,[t]:e};i(a),u.current&&clearTimeout(u.current),u.current=setTimeout(async()=>{try{await fetch("/api/update-portfolio",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),console.log(`${t} updated`)}catch(t){console.error(t)}},500)},h=async t=>{let e=t.target.files[0];if(!e)return;if(e.size>1048576)return void o.toast.error("حجم الصورة أكبر من 1 ميجا بايت ❌");let a=new Image;a.src=URL.createObjectURL(e),a.onload=()=>{if(a.width!==a.height)return void o.toast.error("يجب أن تكون نسبة الصورة 1:1 ❌");let t=new FileReader;t.onload=async()=>{let a={...n,image:t.result};i(a),d(e);let o=new FormData;o.append("image",e),o.append("data",JSON.stringify(a));try{await fetch("/api/update-portfolio",{method:"POST",body:o}),console.log("Image updated")}catch(t){console.error(t)}},t.readAsDataURL(e)}};return(0,e.jsxs)("div",{className:"w-[98%] m-[1%] h-auto md:h-[100vh] bg-[#fff] rounded-[16px] shadow-[0_1px_6px_#E5E9F2] p-[20px]",children:[(0,e.jsx)("p",{className:"text-[18px] font-[600] text-[#3D3D3D] m-[10px]",children:"تعديل تفاصيل المعاين"}),(0,e.jsxs)("div",{className:"flex gap-[15px]",children:[(0,e.jsxs)("div",{className:"w-[90%] md:w-[264px] h-[316px] bg-[#F4F4FE] rounded-[20px] m-[10px] mt-[20px] relative",children:[(0,e.jsxs)("label",{className:"flex relative translate-x-[-1rem] translate-y-[1rem] z-10 justify-center items-center gap-[8px] bg-[#fff] w-[89px] h-[36px] rounded-[8px] shadow-[0_1px_1px_rgba(0,0,0,0.25)] cursor-pointer",children:[(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",width:"14px",height:"14px"}),(0,e.jsx)("p",{children:"تعديل"}),(0,e.jsx)("input",{type:"file",accept:"image/*",className:"absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer",onChange:h})]}),(0,e.jsx)("img",{src:n.image,width:"200px",height:"200px",className:"mx-auto rounded-[14px]"}),(0,e.jsx)("p",{className:"text-[12px] font-[400] text-[#6E7485] leading-[16px] mx-[32px] my-[20px] text-center",children:"يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1"})]}),(0,e.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 w-[80%] gap-[10px] mt-[10px]",children:[(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"اسم المكان التجارى"}),(0,e.jsx)("input",{type:"text",value:n.placeName,disabled:l.placeName,onChange:t=>m("placeName",t.target.value),className:" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("placeName")})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"موقع المكان التجارى"}),(0,e.jsx)("input",{type:"text",value:n.site,disabled:l.site,onChange:t=>m("site",t.target.value),className:" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("site")})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"البريد الالكترونى"}),(0,e.jsx)("input",{dir:"ltr",type:"text",value:n.email,disabled:l.email,onChange:t=>m("email",t.target.value),className:" text-[16px] font-[400] text-[#8C94A3] w-[100%]  h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[5%] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("email")})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"رقم الجوال"}),(0,e.jsx)("input",{type:"text",value:n.numPon,disabled:l.numPon,onChange:t=>m("numPon",t.target.value),className:" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("numPon")})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"نوع التجاره"}),(0,e.jsx)("input",{type:"text",value:n.TypeOfTrade,disabled:l.TypeOfTrade,onChange:t=>m("TypeOfTrade",t.target.value),className:" text-[16px] font-[400] text-[#23BD33] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("TypeOfTrade")})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[6px] relative",children:[(0,e.jsx)("label",{className:"text-[14px] font-[400] text-[#131313]",children:"رقم هاتف اخر"}),(0,e.jsx)("input",{type:"text",value:n.lastNumPon,disabled:l.lastNumPon,onChange:t=>m("lastNumPon",t.target.value),className:" text-[16px] font-[400] text-[#8C94A3] w-[100%] h-[48px] rounded-[8px] px-[5px] border-[#E9EAF0] border-[1px] outline-none"}),(0,e.jsx)("img",{src:"/img/نمالمخهناه.svg",className:"w-[16px] h-[16px] absolute top-[50px] right-[10px] -translate-y-1/2 cursor-pointer z-30",alt:"Edit",onClick:()=>p("lastNumPon")})]})]})]}),(0,e.jsxs)("div",{className:" flex m-[15px] mx-[20px] justify-between",children:[(0,e.jsx)("button",{className:"w-[81px] h-[48px] border-[1px] border-[#E9EAF0] bg-[#fff] text-[#6E7485] rounded-[12px]",children:"الغاء"}),(0,e.jsx)("button",{className:"w-[100px] h-[48px] bg-[#183866] rounded-[12px] text-[#fff] text-[16px] gap-[16px]",children:"حفظ"})]}),(0,e.jsx)("hr",{className:"w-[96%] m-[2%] h-[1px] bg-black/17 border-none"}),(0,e.jsx)("p",{className:"text-[18px] font-[600] text-[#3D3D3D]",children:"تفاصيل اخري مثل مشاركة  ( لينك السايت و QR )"}),(0,e.jsxs)("div",{className:"w-[237px] flex flex-col  border-[1px] border-[#2BFFFF1A] m-[20px] h-[322px] rounded-[32px] bg-[linear-gradient(to_right,rgba(43,255,255,0.3),rgba(43,255,255,0.38),rgba(43,255,255,0.31))] backdrop-blur-[40px]",children:[(0,e.jsxs)("div",{className:"w-[215px] h-[31px] rounded-[30px] border-[0.3px] border-[rgba(0,0,0,0.7)] mx-auto my-[15px] flex items-center overflow-hidden",children:[(0,e.jsx)("div",{className:"flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#fff] my-auto mx-[5px]",onClick:()=>{navigator.clipboard.writeText(t).then(()=>{})},children:(0,e.jsx)("img",{src:"/img/gtfg.svg",alt:"icon"})}),(0,e.jsx)("a",{className:"flex-1 overflow-hidden whitespace-nowrap text-[8px] font-[600] px-[8px]",ref:s,dir:"ltr",href:t,children:t})]}),(0,e.jsx)("div",{ref:s,className:"mt-[-4px] p-[10px] bg-white rounded-lg shadow-lg w-[187px] h-[207px] mx-auto rounded-[17px] flex justify-center items-center",children:(0,e.jsx)(r.QRCodeCanvas,{value:t,size:170})}),(0,e.jsx)("button",{onClick:()=>{let t=s.current.querySelector("canvas");if(!t)return;let e=t.toDataURL("image/png").replace("image/png","image/octet-stream"),a=document.createElement("a");a.href=e,a.download="qr-code.png",a.click()},className:"w-[186px] text-[14px] font-[500] text-[#fff] h-[37px] rounded-[12px]  bg-[linear-gradient(to_bottom,#2BFFFF,#1A9999)] shadow-[0_0_1px_2px_rgba(0,0,0,0.15)] mx-auto mt-[9px]",children:"تحميل الصوره بصيغه PNG"})]})]})}t.s(["default",()=>s])}]);