!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1),n(2),n(3),n(4),n(5),n(6),n(7);jQuery;document.body.addEventListener("touchstart",()=>{document.querySelector("html").classList.add("touch-device")});const o=document.querySelectorAll(".main-menu__link");for(const e of o)e.classList.contains("active")&&(delete e.href,e.parentElement.classList.add("active"));const r=document.querySelectorAll('.local-menu [href*="#"]');for(let e of r)e.addEventListener("click",(function(t){t.preventDefault();const n=e.getAttribute("href");document.querySelector(n).scrollIntoView({behavior:"smooth",block:"start"})}))},function(e,t,n){!function(t,n){var o=function(e,t,n){"use strict";var o,r;if(function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in r=e.lazySizesConfig||e.lazysizesConfig||{},n)t in r||(r[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:r,noSupport:!0};var i=t.documentElement,l=e.HTMLPictureElement,a=e.addEventListener.bind(e),s=e.setTimeout,c=e.requestAnimationFrame||s,d=e.requestIdleCallback,u=/^picture$/i,f=["load","error","lazyincluded","_lazyloaded"],m={},h=Array.prototype.forEach,p=function(e,t){return m[t]||(m[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),m[t].test(e.getAttribute("class")||"")&&m[t]},g=function(e,t){p(e,t)||e.setAttribute("class",(e.getAttribute("class")||"").trim()+" "+t)},y=function(e,t){var n;(n=p(e,t))&&e.setAttribute("class",(e.getAttribute("class")||"").replace(n," "))},v=function(e,t,n){var o=n?"addEventListener":"removeEventListener";n&&v(e,t),f.forEach((function(n){e[o](n,t)}))},b=function(e,n,r,i,l){var a=t.createEvent("Event");return r||(r={}),r.instance=o,a.initEvent(n,!i,!l),a.detail=r,e.dispatchEvent(a),a},_=function(t,n){var o;!l&&(o=e.picturefill||r.pf)?(n&&n.src&&!t.getAttribute("srcset")&&t.setAttribute("srcset",n.src),o({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},w=function(e,t){return(getComputedStyle(e,null)||{})[t]},S=function(e,t,n){for(n=n||e.offsetWidth;n<r.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},z=(me=[],he=[],pe=me,ge=function(){var e=pe;for(pe=me.length?he:me,ue=!0,fe=!1;e.length;)e.shift()();ue=!1},ye=function(e,n){ue&&!n?e.apply(this,arguments):(pe.push(e),fe||(fe=!0,(t.hidden?s:c)(ge)))},ye._lsFlush=ge,ye),E=function(e,t){return t?function(){z(e)}:function(){var t=this,n=arguments;z((function(){e.apply(t,n)}))}},A=function(e){var t,o,r=function(){t=null,e()},i=function(){var e=n.now()-o;e<99?s(i,99-e):(d||r)(r)};return function(){o=n.now(),t||(t=s(i,99))}},C=(Q=/^img$/i,U=/^iframe$/i,V="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),G=0,J=0,K=-1,X=function(e){J--,(!e||J<0||!e.target)&&(J=0)},Y=function(e){return null==I&&(I="hidden"==w(t.body,"visibility")),I||!("hidden"==w(e.parentNode,"visibility")&&"hidden"==w(e,"visibility"))},Z=function(e,n){var o,r=e,l=Y(e);for(D-=n,F+=n,B-=n,H+=n;l&&(r=r.offsetParent)&&r!=t.body&&r!=i;)(l=(w(r,"opacity")||1)>0)&&"visible"!=w(r,"overflow")&&(o=r.getBoundingClientRect(),l=H>o.left&&B<o.right&&F>o.top-1&&D<o.bottom+1);return l},ee=function(){var e,n,l,a,s,c,d,u,f,m,h,p,g=o.elements;if((O=r.loadMode)&&J<8&&(e=g.length)){for(n=0,K++;n<e;n++)if(g[n]&&!g[n]._lazyRace)if(!V||o.prematureUnveil&&o.prematureUnveil(g[n]))ae(g[n]);else if((u=g[n].getAttribute("data-expand"))&&(c=1*u)||(c=G),m||(m=!r.expand||r.expand<1?i.clientHeight>500&&i.clientWidth>500?500:370:r.expand,o._defEx=m,h=m*r.expFactor,p=r.hFac,I=null,G<h&&J<1&&K>2&&O>2&&!t.hidden?(G=h,K=0):G=O>1&&K>1&&J<6?m:0),f!==c&&(j=innerWidth+c*p,R=innerHeight+c,d=-1*c,f=c),l=g[n].getBoundingClientRect(),(F=l.bottom)>=d&&(D=l.top)<=R&&(H=l.right)>=d*p&&(B=l.left)<=j&&(F||H||B||D)&&(r.loadHidden||Y(g[n]))&&(N&&J<3&&!u&&(O<3||K<4)||Z(g[n],c))){if(ae(g[n]),s=!0,J>9)break}else!s&&N&&!a&&J<4&&K<4&&O>2&&(W[0]||r.preloadAfterLoad)&&(W[0]||!u&&(F||H||B||D||"auto"!=g[n].getAttribute(r.sizesAttr)))&&(a=W[0]||g[n]);a&&!s&&ae(a)}},te=function(e){var t,o=0,i=r.throttleDelay,l=r.ricTimeout,a=function(){t=!1,o=n.now(),e()},c=d&&l>49?function(){d(a,{timeout:l}),l!==r.ricTimeout&&(l=r.ricTimeout)}:E((function(){s(a)}),!0);return function(e){var r;(e=!0===e)&&(l=33),t||(t=!0,(r=i-(n.now()-o))<0&&(r=0),e||r<9?c():s(c,r))}}(ee),ne=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(X(e),g(t,r.loadedClass),y(t,r.loadingClass),v(t,re),b(t,"lazyloaded"))},oe=E(ne),re=function(e){oe({target:e.target})},ie=function(e){var t,n=e.getAttribute(r.srcsetAttr);(t=r.customMedia[e.getAttribute("data-media")||e.getAttribute("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},le=E((function(e,t,n,o,i){var l,a,c,d,f,m;(f=b(e,"lazybeforeunveil",t)).defaultPrevented||(o&&(n?g(e,r.autosizesClass):e.setAttribute("sizes",o)),a=e.getAttribute(r.srcsetAttr),l=e.getAttribute(r.srcAttr),i&&(d=(c=e.parentNode)&&u.test(c.nodeName||"")),m=t.firesLoad||"src"in e&&(a||l||d),f={target:e},g(e,r.loadingClass),m&&(clearTimeout(T),T=s(X,2500),v(e,re,!0)),d&&h.call(c.getElementsByTagName("source"),ie),a?e.setAttribute("srcset",a):l&&!d&&(U.test(e.nodeName)?function(e,t){try{e.contentWindow.location.replace(t)}catch(n){e.src=t}}(e,l):e.src=l),i&&(a||d)&&_(e,{src:l})),e._lazyRace&&delete e._lazyRace,y(e,r.lazyClass),z((function(){var t=e.complete&&e.naturalWidth>1;m&&!t||(t&&g(e,"ls-is-cached"),ne(f),e._lazyCache=!0,s((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&J--}),!0)})),ae=function(e){if(!e._lazyRace){var t,n=Q.test(e.nodeName),o=n&&(e.getAttribute(r.sizesAttr)||e.getAttribute("sizes")),i="auto"==o;(!i&&N||!n||!e.getAttribute("src")&&!e.srcset||e.complete||p(e,r.errorClass)||!p(e,r.lazyClass))&&(t=b(e,"lazyunveilread").detail,i&&q.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,J++,le(e,t,i,o,n))}},se=A((function(){r.loadMode=3,te()})),ce=function(){3==r.loadMode&&(r.loadMode=2),se()},de=function(){N||(n.now()-$<999?s(de,999):(N=!0,r.loadMode=3,te(),a("scroll",ce,!0)))},{_:function(){$=n.now(),o.elements=t.getElementsByClassName(r.lazyClass),W=t.getElementsByClassName(r.lazyClass+" "+r.preloadClass),a("scroll",te,!0),a("resize",te,!0),a("pageshow",(function(e){if(e.persisted){var n=t.querySelectorAll("."+r.loadingClass);n.length&&n.forEach&&c((function(){n.forEach((function(e){e.complete&&ae(e)}))}))}})),e.MutationObserver?new MutationObserver(te).observe(i,{childList:!0,subtree:!0,attributes:!0}):(i.addEventListener("DOMNodeInserted",te,!0),i.addEventListener("DOMAttrModified",te,!0),setInterval(te,999)),a("hashchange",te,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t.addEventListener(e,te,!0)})),/d$|^c/.test(t.readyState)?de():(a("load",de),t.addEventListener("DOMContentLoaded",te),s(de,2e4)),o.elements.length?(ee(),z._lsFlush()):te()},checkElems:te,unveil:ae,_aLSL:ce}),q=(k=E((function(e,t,n,o){var r,i,l;if(e._lazysizesWidth=o,o+="px",e.setAttribute("sizes",o),u.test(t.nodeName||""))for(i=0,l=(r=t.getElementsByTagName("source")).length;i<l;i++)r[i].setAttribute("sizes",o);n.detail.dataAttr||_(e,n.detail)})),M=function(e,t,n){var o,r=e.parentNode;r&&(n=S(e,r,n),(o=b(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=o.detail.width)&&n!==e._lazysizesWidth&&k(e,r,o,n))},P=A((function(){var e,t=x.length;if(t)for(e=0;e<t;e++)M(x[e])})),{_:function(){x=t.getElementsByClassName(r.autosizesClass),a("resize",P)},checkElems:P,updateElem:M}),L=function(){!L.i&&t.getElementsByClassName&&(L.i=!0,q._(),C._())};var x,k,M,P;var W,N,T,O,$,j,R,D,B,H,F,I,Q,U,V,G,J,K,X,Y,Z,ee,te,ne,oe,re,ie,le,ae,se,ce,de;var ue,fe,me,he,pe,ge,ye;return s((function(){r.init&&L()})),o={cfg:r,autoSizer:q,loader:C,init:L,uP:_,aC:g,rC:y,hC:p,fire:b,gW:S,rAF:z}}(t,t.document,Date);t.lazySizes=o,e.exports&&(e.exports=o)}("undefined"!=typeof window?window:{})},function(e,t){let n=!0,o="";try{o=localStorage.getItem("bp_notice_date")}catch(e){n=!1}const r=document.querySelector(".notice"),i=r.querySelector(".notice__section").dataset.date,l=e=>{e.hidden=!0,localStorage.setItem("bp_notice_date",i),document.removeEventListener("keydown",a)},a=e=>{e.preventDefault(),"Escape"!==e.key&&"Enter"!==e.key||l(r)};n&&(o===i?l(r):(r.hidden=!1,document.addEventListener("keydown",a))),r.addEventListener("click",e=>{e.preventDefault(),l(r)})},function(e,t){var n;(n=jQuery)("tbody td, thead th:not([colspan])").hover((function(){const e=n(this);if(e.closest("table").hasClass("table--poor"))return;const t=e.closest("table").children("tbody").children().first().children("th").size(),o=t=>{const o=e.closest("table").children(t).children(),r=new Array(o.size()).fill(0);return o.each((e,t)=>{n(t).children().each((t,o)=>{const i=+n(o).attr("rowspan"),l=+n(o).attr("colspan");for(let t=e+1;t<e+i;t++)r[t]++,l>1&&(r[t]+=l-1)})}),r},r=t=>{let n=e.index()-t;return e.closest("thead").size()>0?n+=i[e.parent().index()]:n+=l[e.parent().index()],n},i=o("thead"),l=o("tbody"),a=l.map(r),s=i.map(r);a.forEach((function(o,r){o>t-1-l[r]&&n(n(e.closest("table").children("tbody").children()[r]).children()[o]).toggleClass("highlighted")})),s.forEach((function(o,r){o>t-1-i[r]&&n(n(e.closest("table").children("thead").children()[r]).children("th:not([colspan])")[o]).toggleClass("highlighted")}))}))},function(e,t){let n=jQuery;const o=document.querySelector(".webform-client-form-74");let r={};function i(){document.querySelector("#edit-submitted-parameters-amount").innerHTML=function(e){let t='<optgroup label="Цифровая печать">',n=Object.entries(e[1].digital);for(let e of n)t+=`<option value="${e[0]}" data-metod="digital">${e[0]}</option>`;t+='<optgroup label="Офсетная печать">',n=Object.entries(e[1].offset);for(let e of n)t+=`<option value="${e[0]}" data-metod="offset">${e[0]}</option>`;return t}(r.vizPrices),document.querySelector("#edit-submitted-parameters-carton").innerHTML=function(e){let t="",n=1,o=Object.entries(e);for(let e of o.values())t+=`<option value="${n}" data-carton="${e[0]}">${e[1].name}</option>`,n++;return t}(r.cartonPrices)}function l(){let{designPrice:e,shippingPrice:t,vizPrices:o,cartonPrices:i}=r;const l=n("#edit-submitted-option :radio:checked").val(),a=n("#edit-submitted-parameters-amount option:selected").data("metod"),s=n("#edit-submitted-parameters-amount option:selected").text(),c=n("#edit-submitted-parameters-carton option:selected").data("carton"),d=n("#edit-submitted-parameters-carton option:selected").text(),u=n("#edit-submitted-parameters-sides :radio:checked").val(),f=n("#edit-submitted-parameters-rounded :checkbox").prop("checked"),m=n("#edit-submitted-order-get-option :radio:checked").val(),h=n(".webform-component--parameters--amount .description");h.text("* офсетная печать одного макета"),n("#edit-submitted-parameters-amount .description").text();let p=o[u][a][s];if("digital"==a){const e=document.querySelector("#edit-submitted-parameters-carton");for(const t of e.querySelectorAll("option"))t.disabled=!1;p+=i[c][s]-i.cristalBoard[s],f&&(p+=+s),h.text("* цифровая печать"+(+s>100?" до "+Math.round(s/100)+" разных макетов":""))}else{const e=document.querySelector("#edit-submitted-parameters-carton");e.selectedIndex=0;for(const t of e.querySelectorAll("option"))t.value>1&&(t.disabled=!0)}"design"==l&&(p+=e),"shipping"==m&&(p+=t),n(".total__price").text(p),n("#edit-submitted-summa").val(p);let g="<ul>";g+=1==u?"<li>визитки односторонние</li>":"<li>визитки двусторонние</li>",g+="digital"==a?"<li>цифровая печать</li>":"<li>офсетная печать</li>",g+="<li>"+d.toLowerCase()+"</li>",g+=f?"<li>скругление</li>":"",g+="shipping"==m?"<li>доставка</li>":"<li>самовывоз</li>",g+=`</ul>Тираж ${s} шт.`,n(".total__summary").html(g)}const a=()=>{const e=document.querySelector(".webform .form-actions .form-submit"),t=document.querySelector('[name="submitted[design][src][file][fid]"]').value>0||document.querySelector("#edit-submitted-design-information-text").textLength>0||document.querySelector("#edit-submitted-design-src-link").value.length>0,n=document.querySelector("#edit-submitted-customer-mail").validity.valid,o=document.querySelector("#edit-submitted-customer-consent-1").validity.valid;e.disabled=!(t&&n&&o);let r=`<span class="total__warning--${t}">макет</span>`;r+=` <span class="total__warning--${n}">e-mail</span>`,r+=` <span class="total__warning--${o}">согласие</span>`;const i=document.querySelector(".total__warning")||document.createElement("p");i.className="total__warning",i.innerHTML=r;document.querySelector(".total__warning-wrap").prepend(i),e.disabled?document.querySelector(".total__warning").classList.add("total__warning--invalid"):document.querySelector(".total__warning").classList.remove("total__warning--invalid")},s=()=>{document.querySelector(".webform").classList.add("webform--active");const e=document.querySelectorAll(".webform fieldset");for(const t of e)t.classList.remove("disabled"),t.disabled=!1},c=()=>{a(),l()},d=e=>{a(),e.find(e=>"form-managed-file"==e.target.className)&&m()},u=e=>{let t=new MouseEvent("mousedown");e.target.closest(".form-managed-file").querySelector(".upload-button").dispatchEvent(t)},f=e=>{const t=e.querySelector(".upload-button");t&&(t.style.display="none"),e.addEventListener("change",u)},m=()=>{const e=document.querySelectorAll(".form-managed-file");for(const t of e)f(t)};if(o){fetch("sites/belka-print.ru/themes/bs4theme/src.php",{method:"POST",body:"viz"}).then(e=>e.json()).then(e=>{r=e,i(),l()});document.querySelector(".webform-component--option").addEventListener("click",s,{once:!0}),o.addEventListener("keyup",a),o.addEventListener("change",c);new MutationObserver(d).observe(o.querySelector(".webform-component--design--src"),{childList:!0,subtree:!0}),a(),m()}},function(e,t){const n=jQuery,o=document.querySelector(".main-nav__navbar");document.querySelector(".main-menu").insertAdjacentHTML("beforeend",'<li class="folder folder--more main-menu__item">\n  <button class="main-menu__link folder__toggle folder__toggle" type="button">. . .</button>\n  <div class="folder__wrap">\n    <ul class="folder__menu">\n    </ul>\n  </div>\n</li>');const r=document.querySelector(".folder--more"),i=document.querySelectorAll(".main-menu > .main-menu__item:not(.folder--more)"),l=document.querySelectorAll(".main-menu__item"),a=(e,t)=>{const n=e.type;e.stopPropagation();let o=new MouseEvent(n);t.dispatchEvent(o)},s=()=>{if((()=>{let e=r.querySelector(".main-menu__item");for(;e;)c(e,r),e=r.querySelector(".main-menu__item");r.style.display="none"})(),n(".main-nav__toggler").is(":visible"))return;let e=i.length-1;for(;o.scrollWidth>o.clientWidth;){if(e<2)return;r.querySelector(".folder__menu").prepend(i[e]),e--}(e=>{for(const t of e)n(t).off("click mouseenter focus mouseleave"),n(t).children(".folder__wrap").removeAttr("style"),n(t).children("button").attr("disabled","true"),n(t).addClass("main-menu__item--hover")})(r.querySelectorAll(".folder")),r.style.display=r.querySelector(".main-menu__item")?"":"none"};function c(e,t){e.classList.contains("folder")&&(n(e).on("click mouseenter focus",d),n(e).on("mouseleave",u),n(e).children("button").removeAttr("disabled"),n(e).removeClass("main-menu__item--hover")),t.before(e)}function d(e){var t;!function(e){const t=e.children(".folder__wrap"),o=t.offset().top,r=t.offset().left,i=n(".main-nav__navbar").width()-r-t.width();r<0&&i>0&&t.offset({top:o,left:0});i<0&&r>0&&t.offset({top:top,left:n(".main-nav__navbar").width()-t.width()-0})}(n(this)),"mouseenter"==e.type&&n("html").hasClass("touch-device")||(n(this).hasClass("folder--opened")?((t=n(this)).children(".folder__wrap").removeClass("folder__wrap--show"),t.children(".folder__wrap").height(0),t.children(".folder__toggle").blur(),t.removeClass("folder--opened")):function(e){const t=e.children(".folder__wrap").children(".folder__menu").outerHeight(!0);e.children(".folder__wrap").addClass("folder__wrap--show"),e.children(".folder__wrap").height(t),e.addClass("folder--opened")}(n(this)))}function u(){n(".folder__wrap").each((function(e,t){n(t).parents(".folder__wrap").length>0||(n(t).css("left","unset").removeProp("style").height(0).removeClass("folder__wrap--show").parents(".folder").removeClass("folder--opened"),n(this).children(".folder__toggle").blur())}))}for(const e of l)e.addEventListener("click",t=>{e.classList.contains("folder")||a(t,e.querySelector(".main-menu__link"))});window.addEventListener("resize",s),n(".folder").on("click mouseenter focus",d),n(".folder").on("mouseleave",u),s()},function(e,t){const n=()=>{document.querySelector(".banner").classList.remove("banner--init")},o=document.querySelector(".banner--init"),r=document.querySelector(".banner__wrap"),i=document.querySelector(".banner__title"),l=document.querySelector(".banner__slogan");o&&((e=>{let t=getComputedStyle(i).fontSize.slice(0,-2),n=getComputedStyle(l).fontSize.slice(0,-2),o=i.scrollWidth/i.clientWidth,a=l.scrollWidth/l.clientWidth,s=Math.max(o,a);for(;(o>1||a>1)&&!(t<32);)t/=s,n/=s,i.style.fontSize=t+"px",l.style.fontSize=n+"px",o=i.scrollWidth/i.clientWidth,a=l.scrollWidth/l.clientWidth;r.style.transition="opacity 1s",r.style.opacity=1})(),window.addEventListener("scroll",n))},function(e,t){class n{constructor(e){if(this.el=e.el,!this.el)return console.log("wrong selector");this.layout=e.layout||"+7 (___) ___-__-__",this.maskreg=this.getRegexp(),this.setListeners()}getRegexp(){let e=this.layout.replace(/_/g,"\\d");return e=e.replace(/\(/g,"\\("),e=e.replace(/\)/g,"\\)"),e=e.replace(/\+/g,"\\+"),e=e.replace(/\s/g,"\\s"),e}mask(e){let t=e.target,n=this.layout,o=0,r=n.replace(/\D/g,""),i=t.value.replace(/\D/g,"");if(r.length>=i.length&&(i=r),t.value=n.replace(/./g,(function(e){return/[_\d]/.test(e)&&o<i.length?i.charAt(o++):o>=i.length?"":e})),"blur"===e.type){new RegExp(this.maskreg).test(t.value)||(t.value="")}else this.setCursorPosition(t.value.length,t)}setCursorPosition(e,t){if(t.focus(),t.setSelectionRange)t.setSelectionRange(e,e);else if(t.createTextRange){let n=t.createTextRange();n.collapse(!0),n.moveEnd("character",e),n.moveStart("character",e),n.select()}}setListeners(){this.el.addEventListener("input",this.mask.bind(this),!1),this.el.addEventListener("focus",this.mask.bind(this),!1),this.el.addEventListener("blur",this.mask.bind(this),!1)}}const o=document.querySelectorAll('input[name$="[tel]"]');if(o){const e=[];for(const t of o)e.push(new n({el:t,layout:t.attributes.placeholder.nodeValue}))}}]);