(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,840380,t=>{"use strict";var e=t.i(981932),a=t.i(7284),o=t=>"number"==typeof t&&!isNaN(t),s=t=>"string"==typeof t||"function"==typeof t?t:null,r=t=>(0,e.isValidElement)(t)||"string"==typeof t||"function"==typeof t||o(t);function n({enter:t,exit:a,appendPosition:o=!1,collapse:s=!0,collapseDuration:r=300}){return function({children:n,position:i,preventExitTransition:l,done:c,nodeRef:f,isIn:d,playToast:p}){let m=o?`${t}--${i}`:t,u=o?`${a}--${i}`:a,x=(0,e.useRef)(0);return(0,e.useLayoutEffect)(()=>{let t=f.current,e=m.split(" "),a=o=>{o.target===f.current&&(p(),t.removeEventListener("animationend",a),t.removeEventListener("animationcancel",a),0===x.current&&"animationcancel"!==o.type&&t.classList.remove(...e))};t.classList.add(...e),t.addEventListener("animationend",a),t.addEventListener("animationcancel",a)},[]),(0,e.useEffect)(()=>{let t=f.current,e=()=>{t.removeEventListener("animationend",e),s?function(t,e,a=300){let{scrollHeight:o,style:s}=t;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition=`all ${a}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(e,a)})})}(t,c,r):c()};d||(l?e():(x.current=1,t.className+=` ${u}`,t.addEventListener("animationend",e)))},[d]),e.default.createElement(e.default.Fragment,null,n)}}function i(t,e){return{content:l(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function l(t,a,o=!1){return(0,e.isValidElement)(t)&&"string"!=typeof t.type?(0,e.cloneElement)(t,{closeToast:a.closeToast,toastProps:a,data:a.data,isPaused:o}):"function"==typeof t?t({closeToast:a.closeToast,toastProps:a,data:a.data,isPaused:o}):t}function c({delay:t,isRunning:o,closeToast:s,type:r="default",hide:n,className:i,controlledProgress:l,progress:c,rtl:f,isIn:d,theme:p}){let m=n||l&&0===c,u={animationDuration:`${t}ms`,animationPlayState:o?"running":"paused"};l&&(u.transform=`scaleX(${c})`);let x=(0,a.default)("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${p}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":f}),y="function"==typeof i?i({rtl:f,type:r,defaultClassName:x}):(0,a.default)(x,i);return e.default.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":m},e.default.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${p} Toastify__progress-bar--${r}`}),e.default.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer","aria-valuenow":l?Math.round(100*c):void 0,"aria-valuemin":0,"aria-valuemax":100,className:y,style:u,...{[l&&c>=1?"onTransitionEnd":"onAnimationEnd"]:l&&c<1?null:()=>{d&&s()}}}))}var f=1,d=()=>`${f++}`,p=new Map,m=[],u=new Set,x=t=>u.forEach(e=>e(t));function y(t,e){var a;if(e)return!!(null!=(a=p.get(e))&&a.isToastActive(t));let o=!1;return p.forEach(e=>{e.isToastActive(t)&&(o=!0)}),o}function g(t,e){r(t)&&(p.size>0||m.push({content:t,options:e}),p.forEach(a=>{a.buildToast(t,e)}))}function h(t,e){p.forEach(a=>{null!=e&&null!=e&&e.containerId&&(null==e?void 0:e.containerId)!==a.id||a.toggle(t,null==e?void 0:e.id)})}function b(t,e){return g(t,e),e.toastId}function _(t,e){var a;return{...e,type:e&&e.type||t,toastId:(a=e)&&("string"==typeof a.toastId||o(a.toastId))?a.toastId:d()}}function v(t){return(e,a)=>b(e,_(t,a))}function T(t,e){return b(t,_("default",e))}T.loading=(t,e)=>b(t,_("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),T.promise=function(t,{pending:e,error:a,success:o},s){let r;e&&(r="string"==typeof e?T.loading(e,s):T.loading(e.render,{...s,...e}));let n={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},i=(t,e,a)=>{if(null==e)return void T.dismiss(r);let o={type:t,...n,...s,data:a},i="string"==typeof e?{render:e}:e;return r?T.update(r,{...o,...i}):T(i.render,{...o,...i}),a},l="function"==typeof t?t():t;return l.then(t=>i("success",o,t)).catch(t=>i("error",a,t)),l},T.success=v("success"),T.info=v("info"),T.error=v("error"),T.warning=v("warning"),T.warn=T.warning,T.dark=(t,e)=>b(t,_("default",{theme:"dark",...e})),T.dismiss=function(t){!function(t){let e;if(!(p.size>0)){m=m.filter(e=>null!=t&&e.options.toastId!==t);return}if(null==t||"string"==typeof(e=t)||o(e))p.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=p.get(t.containerId);e?e.removeToast(t.id):p.forEach(e=>{e.removeToast(t.id)})}}(t)},T.clearWaitingQueue=(t={})=>{p.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})},T.isActive=y,T.update=(t,e={})=>{let a=((t,{containerId:e})=>{var a;return null==(a=p.get(e||1))?void 0:a.toasts.get(t)})(t,e);if(a){let{props:o,content:s}=a,r={delay:100,...o,...e,toastId:e.toastId||t,updateId:d()};r.toastId!==t&&(r.staleId=t);let n=r.render||s;delete r.render,b(n,r)}},T.done=t=>{T.update(t,{progress:1})},T.onChange=function(t){return u.add(t),()=>{u.delete(t)}},T.play=t=>h(!0,t),T.pause=t=>h(!1,t);var w="u">typeof window?e.useLayoutEffect:e.useEffect,j=({theme:t,type:a,isLoading:o,...s})=>e.default.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${a})`,...s}),k={info:function(t){return e.default.createElement(j,{...t},e.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return e.default.createElement(j,{...t},e.default.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return e.default.createElement(j,{...t},e.default.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return e.default.createElement(j,{...t},e.default.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return e.default.createElement("div",{className:"Toastify__spinner"})}},N=t=>{let{isRunning:o,preventExitTransition:s,toastRef:r,eventHandlers:n,playToast:i}=function(t){var a,o;let[s,r]=(0,e.useState)(!1),[n,i]=(0,e.useState)(!1),l=(0,e.useRef)(null),c=(0,e.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:f,pauseOnHover:d,closeToast:m,onClick:u,closeOnClick:x}=t;function y(){r(!0)}function g(){r(!1)}function h(e){let a=l.current;if(c.canDrag&&a){c.didMove=!0,s&&g(),"x"===t.draggableDirection?c.delta=e.clientX-c.start:c.delta=e.clientY-c.start,c.start!==e.clientX&&(c.canCloseOnClick=!1);let o="x"===t.draggableDirection?`${c.delta}px, var(--y)`:`0, calc(${c.delta}px + var(--y))`;a.style.transform=`translate3d(${o},0)`,a.style.opacity=`${1-Math.abs(c.delta/c.removalDistance)}`}}function b(){document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",b);let e=l.current;if(c.canDrag&&c.didMove&&e){if(c.canDrag=!1,Math.abs(c.delta)>c.removalDistance){i(!0),t.closeToast(!0),t.collapseAll();return}e.style.transition="transform 0.2s, opacity 0.2s",e.style.removeProperty("transform"),e.style.removeProperty("opacity")}}a={id:t.toastId,containerId:t.containerId,fn:r},null==(o=p.get(a.containerId||1))||o.setToggle(a.id,a.fn),(0,e.useEffect)(()=>{if(t.pauseOnFocusLoss)return document.hasFocus()||g(),window.addEventListener("focus",y),window.addEventListener("blur",g),()=>{window.removeEventListener("focus",y),window.removeEventListener("blur",g)}},[t.pauseOnFocusLoss]);let _={onPointerDown:function(e){if(!0===t.draggable||t.draggable===e.pointerType){c.didMove=!1,document.addEventListener("pointermove",h),document.addEventListener("pointerup",b);let a=l.current;c.canCloseOnClick=!0,c.canDrag=!0,a.style.transition="none","x"===t.draggableDirection?(c.start=e.clientX,c.removalDistance=a.offsetWidth*(t.draggablePercent/100)):(c.start=e.clientY,c.removalDistance=a.offsetHeight*(80===t.draggablePercent?1.5*t.draggablePercent:t.draggablePercent)/100)}},onPointerUp:function(e){let{top:a,bottom:o,left:s,right:r}=l.current.getBoundingClientRect();"mouse"===e.pointerType&&t.pauseOnHover&&e.clientX>=s&&e.clientX<=r&&e.clientY>=a&&e.clientY<=o?g():y()}};return f&&d&&(_.onMouseEnter=g,t.stacked||(_.onMouseLeave=y)),x&&(_.onClick=t=>{u&&u(t),c.canCloseOnClick&&m(!0)}),{playToast:y,pauseToast:g,isRunning:s,preventExitTransition:n,toastRef:l,eventHandlers:_}}(t),{closeButton:f,children:d,autoClose:m,onClick:u,type:x,hideProgressBar:y,closeToast:g,transition:h,position:b,className:_,style:v,progressClassName:T,updateId:w,role:j,progress:N,rtl:E,toastId:I,deleteToast:C,isIn:L,isLoading:O,closeOnClick:M,theme:$,ariaLabel:P}=t,z=(0,a.default)("Toastify__toast",`Toastify__toast-theme--${$}`,`Toastify__toast--${x}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":M}),A="function"==typeof _?_({rtl:E,position:b,type:x,defaultClassName:z}):(0,a.default)(z,_),D=function({theme:t,type:a,isLoading:o,icon:s}){let r=null,n={theme:t,type:a};return!1===s||("function"==typeof s?r=s({...n,isLoading:o}):(0,e.isValidElement)(s)?r=(0,e.cloneElement)(s,n):o?r=k.spinner():a in k&&(r=k[a](n))),r}(t),R=!!N||!m,S={closeToast:g,type:x,theme:$},F=null;return!1===f||(F="function"==typeof f?f(S):(0,e.isValidElement)(f)?(0,e.cloneElement)(f,S):function({closeToast:t,theme:a,ariaLabel:o="close"}){return e.default.createElement("button",{className:`Toastify__close-button Toastify__close-button--${a}`,type:"button",onClick:e=>{e.stopPropagation(),t(!0)},"aria-label":o},e.default.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},e.default.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(S)),e.default.createElement(h,{isIn:L,done:C,position:b,preventExitTransition:s,nodeRef:r,playToast:i},e.default.createElement("div",{id:I,tabIndex:0,onClick:u,"data-in":L,className:A,...n,style:v,ref:r,...L&&{role:j,"aria-label":P}},null!=D&&e.default.createElement("div",{className:(0,a.default)("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!O})},D),l(d,t,!o),F,!t.customProgressBar&&e.default.createElement(c,{...w&&!R?{key:`p-${w}`}:{},rtl:E,theme:$,delay:m,isRunning:o,isIn:L,closeToast:g,hide:y,type:x,className:T,controlledProgress:R,progress:N||0})))},E=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),I=n(E("bounce",!0));n(E("slide",!0)),n(E("zoom")),n(E("flip"));var C={position:"top-right",transition:I,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&"KeyT"===t.code};function L(t){let n={...C,...t},l=t.stacked,[c,f]=(0,e.useState)(!0),d=(0,e.useRef)(null),{getToastToRender:u,isToastActive:h,count:b}=function(t){var a;let n,{subscribe:l,getSnapshot:c,setProps:f}=(0,e.useRef)((n=t.containerId||1,{subscribe(e){let a,l,c,f,d,u,y,h,b,_,v,T=(a=1,l=0,c=[],f=[],d=t,u=new Map,y=new Set,h=()=>{f=Array.from(u.values()),y.forEach(t=>t())},b=t=>{var e,a;t.isActive&&(null==(a=null==(e=t.props)?void 0:e.onClose)||a.call(e,t.removalReason),t.isActive=!1,x(i(t,"removed")))},_=t=>{if(null==t)u.forEach(b);else{let e=u.get(t);e&&b(e)}h()},v=t=>{var e,a;let{toastId:o,updateId:s}=t.props,r=null==s;t.staleId&&u.delete(t.staleId),t.isActive=!0,u.set(o,t),h(),x(i(t,r?"added":"updated")),r&&(null==(a=(e=t.props).onOpen)||a.call(e))},{id:n,props:d,observe:t=>(y.add(t),()=>y.delete(t)),toggle:(t,e)=>{u.forEach(a=>{var o;(null==e||e===a.props.toastId)&&(null==(o=a.toggle)||o.call(a,t))})},removeToast:_,toasts:u,clearQueue:()=>{l-=c.length,c=[]},buildToast:(t,e)=>{let i,f;if((({containerId:t,toastId:e,updateId:a})=>{let o=u.has(e)&&null==a;return(t?t!==n:1!==n)||o})(e))return;let{toastId:p,updateId:m,data:x,staleId:y,delay:g}=e,b=null==m;b&&l++;let T={...d,style:d.toastStyle,key:a++,...Object.fromEntries(Object.entries(e).filter(([t,e])=>null!=e)),toastId:p,updateId:m,data:x,isIn:!1,className:s(e.className||d.toastClassName),progressClassName:s(e.progressClassName||d.progressClassName),autoClose:!e.isLoading&&(i=e.autoClose,f=d.autoClose,!1===i||o(i)&&i>0?i:f),closeToast(t){let e=u.get(p);e&&(e.removalReason=t,_(p))},deleteToast(){if(null!=u.get(p)){if(u.delete(p),--l<0&&(l=0),c.length>0)return void v(c.shift());h()}}};T.closeButton=d.closeButton,!1===e.closeButton||r(e.closeButton)?T.closeButton=e.closeButton:!0===e.closeButton&&(T.closeButton=!r(d.closeButton)||d.closeButton);let w={content:t,props:T,staleId:y};d.limit&&d.limit>0&&l>d.limit&&b?c.push(w):o(g)?setTimeout(()=>{v(w)},g):v(w)},setProps(t){d=t},setToggle:(t,e)=>{let a=u.get(t);a&&(a.toggle=e)},isToastActive:t=>{var e;return null==(e=u.get(t))?void 0:e.isActive},getSnapshot:()=>f});p.set(n,T);let w=T.observe(e);return m.forEach(t=>g(t.content,t.options)),m=[],()=>{w(),p.delete(n)}},setProps(t){var e;null==(e=p.get(n))||e.setProps(t)},getSnapshot(){var t;return null==(t=p.get(n))?void 0:t.getSnapshot()}})).current;f(t);let d=null==(a=(0,e.useSyncExternalStore)(l,c,c))?void 0:a.slice();return{getToastToRender:function(e){if(!d)return[];let a=new Map;return t.newestOnTop&&d.reverse(),d.forEach(t=>{let{position:e}=t.props;a.has(e)||a.set(e,[]),a.get(e).push(t)}),Array.from(a,t=>e(t[0],t[1]))},isToastActive:y,count:null==d?void 0:d.length}}(n),{className:_,style:v,rtl:j,containerId:k,hotKeys:E}=n;function I(){l&&(f(!0),T.play())}return w(()=>{var t;if(l){let e=d.current.querySelectorAll('[data-in="true"]'),a=null==(t=n.position)?void 0:t.includes("top"),o=0,s=0;Array.from(e).reverse().forEach((t,e)=>{t.classList.add("Toastify__toast--stacked"),e>0&&(t.dataset.collapsed=`${c}`),t.dataset.pos||(t.dataset.pos=a?"top":"bot");let r=o*(c?.2:1)+(c?0:12*e),n=Math.max(.5,1-(c?s:0));t.style.setProperty("--y",`${a?r:-1*r}px`),t.style.setProperty("--g","12"),t.style.setProperty("--s",`${n}`),o+=t.offsetHeight,s+=.025})}},[c,b,l]),(0,e.useEffect)(()=>{function t(t){var e;let a=d.current;E(t)&&(null==(e=null==a?void 0:a.querySelector('[tabIndex="0"]'))||e.focus(),f(!1),T.pause()),"Escape"===t.key&&(document.activeElement===a||null!=a&&a.contains(document.activeElement))&&(f(!0),T.play())}return document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}},[E]),e.default.createElement("section",{ref:d,className:"Toastify",id:k,onMouseEnter:()=>{l&&(f(!1),T.pause())},onMouseLeave:I,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":n["aria-label"]},u((t,o)=>{var r;let n,i=o.length?{...v}:{...v,pointerEvents:"none"};return e.default.createElement("div",{tabIndex:-1,className:(r=t,n=(0,a.default)("Toastify__toast-container",`Toastify__toast-container--${r}`,{"Toastify__toast-container--rtl":j}),"function"==typeof _?_({position:r,rtl:j,defaultClassName:n}):(0,a.default)(n,s(_))),"data-stacked":l,style:i,key:`c-${t}`},o.map(({content:t,props:a})=>e.default.createElement(N,{...a,stacked:l,collapseAll:I,isIn:h(a.toastId,a.containerId),key:`t-${a.key}`},t)))}))}var O=`:root {
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
`,M=new Map;function $(t){var a;return w(()=>{if(!O||"u"<typeof document)return;let t=document,e=M.get(t);if(e){a&&e.setAttribute("nonce",a);return}let o=t.createElement("style");o.textContent=O,a&&o.setAttribute("nonce",a),t.head.appendChild(o),M.set(t,o)},[a=t.nonce]),e.default.createElement(L,{...t})}t.s(["ToastContainer",()=>$,"toast",()=>T])},522362,t=>{"use strict";var e=t.i(981932);function a(t,a){let[o,s]=(0,e.useState)({site:"",type:"",date:""}),r=(0,e.useRef)(null),[n,i]=(0,e.useState)(1),[l,c]=(0,e.useState)(13),f=(0,e.useMemo)(()=>t.filter(t=>{let e=a?.toLowerCase()||"",s=!a||Object.values(t).some(t=>t?.toString().toLowerCase().includes(e)),r=!o.site||t.numBerson.toString()===String(o.site),n=!o.type||function(t){if(!t)return"";if(t=t.trim(),/^\d{1,2}:\d{2}$/.test(t)){let[e,a]=t.split(":");return`${String(e).padStart(2,"0")}:${a}`}let e=t.match(/^(\d{1,2}:\d{2})\s*([AaPp][Mm])$/);if(!e)return t;let[,a,o]=e,[s,r]=a.split(":").map(t=>t.padStart(2,"0"));o=o.toUpperCase();let n=parseInt(s,10);return"PM"===o&&12!==n&&(n+=12),"AM"===o&&12===n&&(n=0),`${String(n).padStart(2,"0")}:${r}`}(t.time)===String(o.type).slice(0,5),i=(()=>{if(!o.date)return!0;if(!t.Date)return!1;let e=t.Date.split("/");if(3!==e.length)return!1;let[a,s,r]=e;return`${r}-${s.padStart(2,"0")}-${a.padStart(2,"0")}`===o.date})();return s&&r&&n&&i}),[t,a,o]),d=Math.ceil(f.length/l),p=f.slice((n-1)*l,n*l);return{setFilterData:s,currentPage:n,setCurrentPage:i,numPages:d,setNumRow:c,displayedCustomers:p,scroll:t=>{r.current&&r.current.scrollBy({left:"right"===t?120:-120,behavior:"smooth"})},numRow:l,numbersRef:r}}t.s(["usePagnation",()=>a])},626453,t=>{"use strict";var e=t.i(683034);function a({numRow:t,setNumRow:a,scroll:o,numbersRef:s,numPages:r,currentPage:n,setCurrentPage:i}){return(0,e.jsxs)("div",{className:"flex w-full justify-between items-center py-[10px] px-[20px]",children:[(0,e.jsxs)("div",{className:"flex items-center gap-[10px]",children:[(0,e.jsx)("p",{className:"text-[12px] font-normal text-[rgba(29,29,29,0.8)]",children:"حدد عدد صفوف السجلات لكل صفحة"}),(0,e.jsx)("select",{value:t,onChange:t=>a(parseInt(t.target.value)),className:"appearance-none bg-white text-[16px] bg-[url('/arrow.svg')] bg-no-repeat bg-[position:right_10px_center] bg-[length:12px] border border-gray-300 rounded-md px-4 py-1 text-[12px] text-[#1D1D1D] focus:outline-none focus:ring-1 focus:ring-[#183866]",children:[10,20,30,40,50].map(t=>(0,e.jsx)("option",{value:t,children:t},t))})]}),(0,e.jsxs)("div",{className:"flex items-center justify-center gap-2",children:[(0,e.jsx)("button",{onClick:()=>o("left"),className:"w-[40px] h-[40px] flex items-center justify-center rounded-r-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200",children:(0,e.jsx)("img",{src:"/img/;lhjn;jh.svg",className:"w-3 h-3",alt:"next"})}),(0,e.jsx)("div",{ref:s,className:"flex overflow-x-auto overflow-y-hidden w-[200px] scroll-smooth no-scrollbar",children:[...Array(r)].map((t,a)=>{let o=n===a+1;return(0,e.jsx)("div",{onClick:()=>i(a+1),className:`min-w-[40px] h-[40px] shadow-[0_0_2px_#00000040] flex items-center justify-center  text-[13px] font-medium cursor-pointer transition-all duration-200
                ${o?"bg-[#183866] text-white shadow-[0_0_4px_#18386680]":"bg-white text-[#1D1D1D] hover:bg-[#f3f4f6] shadow-[0_0_2px_#59595933]"}`,children:a+1},a)})}),(0,e.jsx)("button",{onClick:()=>o("right"),className:"w-[40px] h-[40px] flex items-center justify-center rounded-l-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200",children:(0,e.jsx)("img",{src:"/img/;lhjn;jh.svg",className:"w-3 h-3 rotate-180",alt:"prev"})})]})]})}t.s(["default",()=>a])},745883,t=>{"use strict";var e=t.i(683034);function a({text:t,handleDelete:a,onClose:o}){return(0,e.jsx)("div",{className:"fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center ",children:(0,e.jsx)("div",{className:"w-[min(684px,92%)] h-auto rounded-[12px] bg-white p-[20px]",children:(0,e.jsxs)("div",{children:[(0,e.jsxs)("div",{className:"w-full flex flex-col gap-[25px]",children:[(0,e.jsx)("p",{className:"text-[#131313] font-semibold text-[20px]",children:"تأكيد الإجراء"}),(0,e.jsx)("p",{className:"text-[rgba(19,19,19,0.5)] text-[18px] font-normal",children:t})]}),(0,e.jsxs)("div",{className:"flex gap-[16px] justify-end mt-[20px]",children:[(0,e.jsx)("button",{className:"bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center",onClick:()=>{a(),o()},children:"تأكيد"}),(0,e.jsx)("button",{className:"bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center",onClick:o,children:"إلغاء"})]})]})})})}t.s(["default",()=>a])},622449,t=>{"use strict";var e=t.i(683034),a=t.i(981932),o=t.i(522362),s=t.i(626453),r=t.i(772407),n=t.i(358628),i=t.i(836882),l=t.i(745883),c=t.i(679323),f=t.i(840380);function d(){let t=(0,n.useRouter)(),[d,p]=(0,a.useState)(""),[m,u]=(0,a.useState)(!1),x=(0,a.useRef)(null),y=[{id:"1",img:"/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg",number:"0121022904",name:"هشام عبد الحميد",address:"الرياض",mail:"mohamed@icloud.com",namecompany:"شركة مؤمن",date:"10/2/2025",fromMonay:"500 جنيه",toMonay:"500 جنيه"},{id:"2",img:"/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg",number:"0121022904",name:"أحمد محمد",address:"الرياض",mail:"mohamed@icloud.com",namecompany:"شركة مؤمن",date:"12/2/2025",fromMonay:"500 جنيه",toMonay:"500 جنيه"},{id:"3",img:"/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg",number:"0121022904",name:"محمد علي",address:"الرياض",mail:"mohamed@icloud.com",namecompany:"شركة مؤمن",date:"15/2/2025",fromMonay:"500 جنيه",toMonay:"500 جنيه"},{id:"4",img:"/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg",number:"0121022904",name:"محمود خالد",address:"الرياض",mail:"mohamed@icloud.com",namecompany:"شركة مؤمن",date:"18/2/2025",fromMonay:"500 جنيه",toMonay:"500 جنيه"},{id:"5",img:"/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg",number:"0121022904",name:"خالد يوسف",address:"الرياض",mail:"mohamed@icloud.com",namecompany:"شركة مؤمن",date:"20/2/2025",fromMonay:"500 جنيه",toMonay:"500 جنيه"}],[g,h]=(0,a.useState)(!1),b=(0,a.useMemo)(()=>{if(!d)return y;let t=d.toLowerCase();return y.filter(e=>Object.values(e).some(e=>e&&e.toString().toLowerCase().includes(t)))},[d,y]),{currentPage:_,setCurrentPage:v,numPages:T,setNumRow:w,displayedCustomers:j,scroll:k,numRow:N,numbersRef:E}=(0,o.usePagnation)(b,d),I=async()=>{try{await c.default.delete("/inventory/supplier"),f.toast.success("تم حذف المورد بنجاح ✅")}catch(t){console.error("Failed to delete:",t),f.toast.error("حدث خطأ أثناء حذف المورد ❌")}};return(0,e.jsxs)("section",{className:"flex w-[98%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]",children:[g&&(0,e.jsx)(l.default,{text:"هل أنت متأكد أنك تريد حذف هذا المورد ؟",handleDelete:I,onClose:()=>h(!1)}),m&&(0,e.jsx)("div",{className:"fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]",children:(0,e.jsx)("div",{className:"w-[484px] rounded-[12px] bg-white py-[20px]",children:(0,e.jsxs)("div",{children:[(0,e.jsxs)("div",{className:"w-full flex flex-col gap-[25px]",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between px-[20px]",children:[(0,e.jsx)("p",{className:"text-[#131313] font-semibold text-[20px]",children:"فلتر الموردين"}),(0,e.jsx)(r.default,{src:"/assets/icons/close.png",alt:"close",width:18,height:18,onClick:()=>u(!1),className:"cursor-pointer",title:"اغلاق"})]}),(0,e.jsx)("hr",{className:"text-[var(--color-gray-six)]"}),(0,e.jsxs)("div",{className:"px-[20px] flex flex-col gap-[16px]",children:[(0,e.jsxs)("div",{className:"flex gap-[12px]",children:[(0,e.jsxs)("div",{className:"flex flex-col gap-[12px] w-full",children:[(0,e.jsx)("label",{htmlFor:"",className:"text-xs text-[var(--color-dark-bg-tow)]",children:"العنوان"}),(0,e.jsx)("input",{type:"text",placeholder:"العنوان",className:"border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]"})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[12px] w-full",children:[(0,e.jsx)("label",{htmlFor:"",className:"text-xs text-[var(--color-dark-bg-tow)]",children:"تاريخ الاضافه"}),(0,e.jsx)("input",{type:"date",placeholder:"اخر عملية جرد",className:"border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]"})]})]}),(0,e.jsxs)("div",{className:"flex gap-[12px]",children:[(0,e.jsxs)("div",{className:"flex flex-col gap-[12px]",children:[(0,e.jsx)("label",{htmlFor:"",className:"text-xs text-[var(--color-dark-bg-tow)]",children:"له فلوس"}),(0,e.jsx)("input",{type:"number",placeholder:"جنيه",className:"border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]"})]}),(0,e.jsxs)("div",{className:"flex flex-col gap-[12px] w-full",children:[(0,e.jsx)("label",{htmlFor:"",className:"text-xs text-[var(--color-dark-bg-tow)]",children:"عليه فلوس"}),(0,e.jsx)("input",{type:"number",placeholder:"جنيه",className:"border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]"})]})]})]})]}),(0,e.jsxs)("div",{className:"flex gap-[16px] justify-between mt-[20px] px-[20px]",children:[(0,e.jsx)("button",{className:"bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center",onClick:()=>u(!1),children:"إلغاء"}),(0,e.jsx)("button",{className:"bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center",onClick:()=>{console.log("تم تطبيق الفلتر"),u(!1)},children:"بحث"})]})]})})}),(0,e.jsxs)("div",{className:"p-[10px] flex flex-wrap items-center justify-between ",children:[(0,e.jsx)("p",{className:"text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap",children:"كل الموردين"}),(0,e.jsxs)("div",{className:"flex items-center gap-[15px] flex-1 justify-end",children:[(0,e.jsxs)("div",{className:"relative w-[300px]",children:[(0,e.jsx)("span",{className:"absolute top-[10px] mr-[10px]",children:(0,e.jsx)("img",{src:"/img/MagnifyingGlass.svg",className:"w-4 h-4"})}),(0,e.jsx)("input",{type:"search",placeholder:"ابحث عن مشرف...",value:d,onChange:t=>p(t.target.value),className:"w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"})]}),(0,e.jsx)("img",{onClick:()=>{u(!0)},src:"/img/Frame 1686553878.svg",className:"w-[32px] h-[32px] cursor-pointer",alt:"filter"}),(0,e.jsx)(i.default,{href:"/inventory/suppliers/add-suppliers",className:"cursor-pointer text-center border-[1px] border-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px] whitespace-nowrap",children:"اضافة"})]})]}),(0,e.jsx)("div",{className:"h-[80vh] overflow-auto",style:{scrollbarWidth:"none",msOverflowStyle:"none"},ref:x,children:(0,e.jsxs)("table",{className:"min-w-full text-right",children:[(0,e.jsx)("thead",{className:"sticky top-0 bg-[#F9FAFB] rounded-[4px]",children:(0,e.jsxs)("tr",{children:[(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"اسم المورد"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"تاريخ الاضافه"}),(0,e.jsx)("th",{className:"px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"رقم الجوال"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"البريد"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"رقم الهوية"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"العنوان"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"اسم الشركه"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"له فلوس"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"عليه فلوس"}),(0,e.jsx)("th",{className:"px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap",children:"الاجراء"})]})}),(0,e.jsx)("tbody",{className:"divide-gray-50",children:j.length>0?j.map((a,o)=>(0,e.jsxs)("tr",{className:"hover:bg-[#F9FAFB]/50 transition-colors",children:[(0,e.jsx)("td",{className:"flex justify-center items-center px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)] px-[8px] py-[12px]",children:a.name}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]",children:a.date}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]",children:a.number}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]",children:a.mail}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-dark-blue-gray)]",children:a.id}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]",children:a.address}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]",children:a.namecompany}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-green-bright)]",children:a.fromMonay}),(0,e.jsx)("td",{className:"px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-red-bright-tow)]",children:a.toMonay}),(0,e.jsx)("td",{className:"px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center",children:(0,e.jsxs)("div",{className:"flex items-center justify-center gap-[10px]",children:[(0,e.jsx)("img",{className:"cursor-pointer",title:"تعديل",src:"/img/تعديل.svg",width:"24px",height:"24px",onClick:()=>{t.push("/inventory/1")}}),(0,e.jsx)("img",{className:"cursor-pointer",title:"حذف",src:"/img/Frame 1261153571.svg",width:"24px",height:"24px",alt:"حذف",onClick:()=>{h(!0)}})]})})]},o)):(0,e.jsx)("tr",{children:(0,e.jsx)("td",{className:"p-[20px] text-center text-gray-500 text-[12px]",children:"لا يوجد سجلات"})})})]})}),(0,e.jsx)(s.default,{numRow:N,setNumRow:w,scroll:k,numbersRef:E,numPages:T,currentPage:_,setCurrentPage:v})]})}t.s(["default",()=>d],622449)}]);