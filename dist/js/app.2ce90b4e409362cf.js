var ms=Object.defineProperty;var gs=Object.getOwnPropertyDescriptor;var d=(r,t,e,s)=>{for(var i=s>1?void 0:s?gs(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ms(t,e,i),i};var At=globalThis,Dt=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),xe=new WeakMap,mt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Dt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=xe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(e,t))}return t}toString(){return this.cssText}},Rt=r=>new mt(typeof r=="string"?r:r+"",void 0,re),ie=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1]),r[0]);return new mt(e,r,re)},we=(r,t)=>{if(Dt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let s=document.createElement("style"),i=At.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ne=Dt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Rt(e)})(r):r;var{is:fs,defineProperty:$s,getOwnPropertyDescriptor:bs,getOwnPropertyNames:ys,getOwnPropertySymbols:vs,getPrototypeOf:xs}=Object,kt=globalThis,Te=kt.trustedTypes,ws=Te?Te.emptyScript:"",Ts=kt.reactiveElementPolyfillSupport,gt=(r,t)=>r,ft={toAttribute(r,t){switch(t){case Boolean:r=r?ws:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ot=(r,t)=>!fs(r,t),Se={attribute:!0,type:String,converter:ft,reflect:!1,useDefault:!1,hasChanged:Ot};Symbol.metadata??=Symbol("metadata"),kt.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Se){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&$s(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=bs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);n?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Se}static _$Ei(){if(this.hasOwnProperty(gt("elementProperties")))return;let t=xs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gt("properties"))){let e=this.properties,s=[...ys(e),...vs(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ne(i))}else t!==void 0&&e.push(ne(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return we(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:ft).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ft;this._$Em=i;let c=o.fromAttribute(e,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let i=this.constructor,n=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Ot)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[gt("elementProperties")]=new Map,j[gt("finalized")]=new Map,Ts?.({ReactiveElement:j}),(kt.reactiveElementVersions??=[]).push("2.1.1");var ae=globalThis,Mt=ae.trustedTypes,Ee=Mt?Mt.createPolicy("lit-html",{createHTML:r=>r}):void 0,le="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,ce="?"+H,Ss=`<${ce}>`,J=document,bt=()=>J.createComment(""),yt=r=>r===null||typeof r!="object"&&typeof r!="function",he=Array.isArray,De=r=>he(r)||typeof r?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,$t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,Ie=/>/g,Q=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ce=/"/g,Re=/^(?:script|style|textarea|title)$/i,de=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),l=de(1),ir=de(2),nr=de(3),R=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Ae=new WeakMap,K=J.createTreeWalker(J,129);function ke(r,t){if(!he(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}var Oe=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=$t;for(let c=0;c<e;c++){let a=r[c],p,m,u=-1,b=0;for(;b<a.length&&(o.lastIndex=b,m=o.exec(a),m!==null);)b=o.lastIndex,o===$t?m[1]==="!--"?o=_e:m[1]!==void 0?o=Ie:m[2]!==void 0?(Re.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=Q):m[3]!==void 0&&(o=Q):o===Q?m[0]===">"?(o=i??$t,u=-1):m[1]===void 0?u=-2:(u=o.lastIndex-m[2].length,p=m[1],o=m[3]===void 0?Q:m[3]==='"'?Ce:Ue):o===Ce||o===Ue?o=Q:o===_e||o===Ie?o=$t:(o=Q,i=void 0);let y=o===Q&&r[c+1].startsWith("/>")?" ":"";n+=o===$t?a+Ss:u>=0?(s.push(p),a.slice(0,u)+le+a.slice(u)+H+y):a+H+(u===-2?c:y)}return[ke(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},vt=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[p,m]=Oe(t,e);if(this.el=r.createElement(p,s),K.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=K.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(le)){let b=m[o++],y=i.getAttribute(u).split(H),_=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:_[2],strings:y,ctor:_[1]==="."?Nt:_[1]==="?"?Pt:_[1]==="@"?Bt:Z}),i.removeAttribute(u)}else u.startsWith(H)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Re.test(i.tagName)){let u=i.textContent.split(H),b=u.length-1;if(b>0){i.textContent=Mt?Mt.emptyScript:"";for(let y=0;y<b;y++)i.append(u[y],bt()),K.nextNode(),a.push({type:2,index:++n});i.append(u[b],bt())}}}else if(i.nodeType===8)if(i.data===ce)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(H,u+1))!==-1;)a.push({type:7,index:n}),u+=H.length-1}n++}}static createElement(t,e){let s=J.createElement("template");return s.innerHTML=t,s}};function X(r,t,e=r,s){if(t===R)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=yt(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=X(r,i._$AS(r,t.values),i,s)),t}var Lt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??J).importNode(e,!0);K.currentNode=i;let n=K.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new nt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new jt(n,this,t)),this._$AV.push(p),a=s[++c]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=J,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},nt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),yt(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):De(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==S&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(J.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=vt.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Lt(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Ae.get(t.strings);return e===void 0&&Ae.set(t.strings,e=new vt(t)),e}k(t){he(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(bt()),this.O(bt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=S}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=X(this,t,e,0),o=!yt(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=X(this,c[s+a],e,a),p===R&&(p=this._$AH[a]),o||=!yt(p)||p!==this._$AH[a],p===S?t=S:t!==S&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Nt=class extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}},Pt=class extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==S)}},Bt=class extends Z{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??S)===R)return;let s=this._$AH,i=t===S&&s!==S||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==S&&(s===S||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},jt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}},Me={M:le,P:H,A:ce,C:1,L:Oe,R:Lt,D:De,V:X,I:nt,H:Z,N:Pt,U:Bt,B:Nt,F:jt},Es=ae.litHtmlPolyfillSupport;Es?.(vt,nt),(ae.litHtmlVersions??=[]).push("3.3.1");var Le=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new nt(t.insertBefore(bt(),n),n,void 0,e??{})}return i._$AI(r),i};var pe=globalThis,O=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Le(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};O._$litElement$=!0,O.finalized=!0,pe.litElementHydrateSupport?.({LitElement:O});var _s=pe.litElementPolyfillSupport;_s?.({LitElement:O});(pe.litElementVersions??=[]).push("4.2.1");var f=class extends O{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Ne=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(r){return this.#e.has(r)?this.#e.get(r):(this.#e.set(r,this.#t),this.#s.set(this.#t,r),this.#t++,this.#t-1)}setIndex(r,t){this.#e.set(r,t),this.#s.set(t,r)}getIndex(r){return this.#e.get(r)}getValue(r){return this.#s.get(r)}has(r){return this.#e.has(r)}},Pe=class{static intersection(r,t){if(t.length===0)return new Set;t.sort((s,i)=>s.size-i.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let i=t[s];for(let n of e)r.setCheck(),i.has(n)||e.delete(n);if(e.size===0)break}return e}},Be=class{stringIndex;constructor(){this.stringIndex=new Ne}parseTriple(r){let t=r.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${r}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),s=this.stringIndex.getValue(parseInt(t[2],10)),i=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||s===void 0||i===void 0)throw new SyntaxError(`Invalid triple reference: ${r}`);return[e,s,i]}parseDeclaration(r){let t=r.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${r}`);let e=t[1],s=t[2];this.stringIndex.setIndex(s,parseInt(e,10))}parse(r){if(/^(\d+)\s(\d+)\s(\d+)$/.test(r))return this.parseTriple(r);this.parseDeclaration(r)}};function I(r,t="r\xF3"){if(!r.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${r}`);let e=r.split(":")[2],[s,i]=r.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}function x(r,t="r\xF3"){try{return I(r,t)}catch{return{type:"unknown",id:r,qs:{}}}}var Is=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Us=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Cs=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(r){this.indexedTriples=[],this.stringIndex=new Ne,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(r),this.metrics=new Is}add(r){let t=this.indexedTriples.length;for(let e=0;e<r.length;e++){let s=t+e,i=r[e],n=this.stringUrn.has(i[0])?this.stringUrn.get(i[0]):this.stringUrn.set(i[0],x(i[0])).get(i[0]),o=i[1],c=this.stringUrn.has(i[2])?this.stringUrn.get(i[2]):this.stringUrn.set(i[2],x(i[2])).get(i[2]),a=this.stringIndex.add(n.type),p=this.stringIndex.add(n.id),m=this.stringIndex.add(o),u=this.stringIndex.add(c.type),b=this.stringIndex.add(c.id);this.indexedTriples.push([this.stringIndex.add(i[0]),m,this.stringIndex.add(i[2])]),this.sourceType.has(a)||this.sourceType.set(a,new Set),this.sourceType.get(a).add(s),this.sourceId.has(p)||this.sourceId.set(p,new Set),this.sourceId.get(p).add(s);for(let[y,_]of Object.entries(n.qs)){let k=this.stringIndex.add(`${y}=${_}`);this.sourceQs.has(k)||this.sourceQs.set(k,new Set),this.sourceQs.get(k).add(s)}this.relations.has(m)||this.relations.set(m,new Set),this.relations.get(m).add(s),this.targetType.has(u)||this.targetType.set(u,new Set),this.targetType.get(u).add(s),this.targetId.has(b)||this.targetId.set(b,new Set),this.targetId.get(b).add(s);for(let[y,_]of Object.entries(c.qs)){let k=this.stringIndex.add(`${y}=${_}`);this.targetQs.has(k)||this.targetQs.set(k,new Set),this.targetQs.get(k).add(s)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([r,t,e])=>[this.stringIndex.getValue(r),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(r){if(r<0||r>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[r];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(r){if(!(r<0||r>=this.indexedTriples.length))return this.indexedTriples[r]}getSourceTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},V=class{static source(r){return r[0]}static relation(r){return r[1]}static target(r){return r[2]}};function As(r,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let i=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let p=t.rows[a][2];i.has(p)||i.set(p,[]),i.get(p).push(a)}for(let a=0;a<e.rows.length;a++){let p=e.rows[a][0];n.has(p)||n.set(p,[]),n.get(p).push(a)}let o=Pe.intersection(r,[new Set(i.keys()),new Set(n.keys())]),c=[];for(let a of o){let p=n.get(a),m=i.get(a);for(let u of p)for(let b of m){let y=t.rows[u].concat(e.rows[b]);c.push(y)}}return{names:s,rows:c}}var je=class tt{index;triplesCount;cursorIndices;metrics;validations;constructor(t,e={}){this.index=new Cs(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Us,this.validations=e;for(let s=0;s<this.triplesCount;s++)this.cursorIndices.add(s)}clone(){let t=new tt([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new tt(t)}static from(t){let e=[];for(let s of t){let{id:i,...n}=s;if(typeof i!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,c]of Object.entries(n))if(Array.isArray(c))for(let a of c)e.push([i,o,a]);else e.push([i,o,c])}return new tt(e)}validateTriples(t){let e=[];for(let[s,i,n]of t){let o=this.validations[i];if(!o)continue;let{type:c}=x(s),a=o(c,i,n);typeof a=="string"&&e.push(a)}if(e.length>0)throw new Error(`Triple validation failed:
- ${e.join(`
- `)}`)}add(t){let e=this.index.length;this.validateTriples(t),this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new tt(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new tt(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?V.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?V.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?V.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(V.source))}relations(){return new Set(this.index.triples().map(V.relation))}targets(){return new Set(this.index.triples().map(V.target))}objects(t=!1){let e=[];for(let[s,i]of Object.entries(this.object(t)))i.id=s,e.push(i);return e}object(t=!1){let e={};for(let[s,i,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][i]?Array.isArray(e[s][i])?e[s][i].push(n):e[s][i]=[e[s][i],n]:e[s][i]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:i,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof i>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let p of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,p)&&!o.includes(p))throw new Error(`Unexpected search parameter: ${p}`);if(s){if(s.type){let p=this.index.getSourceTypeSet(s.type);if(p)e.push(p);else return new Set}if(s.id){let p=this.index.getSourceIdSet(s.id);if(p)e.push(p);else return new Set}if(s.qs)for(let[p,m]of Object.entries(s.qs)){let u=this.index.getSourceQsSet(p,m);if(u)e.push(u);else return new Set}}if(n){if(n.type){let p=this.index.getTargetTypeSet(n.type);if(p)e.push(p);else return new Set}if(n.id){let p=this.index.getTargetIdSet(n.id);if(p)e.push(p);else return new Set}if(n.qs)for(let[p,m]of Object.entries(n.qs)){let u=this.index.getTargetQsSet(p,m);if(u)e.push(u);else return new Set}}if(i){let p=typeof i=="string"?{relation:[i]}:i;if(p.relation){let m=new Set;for(let u of p.relation){let b=this.index.getRelationSet(u);if(b)for(let y of b)m.add(y)}if(m.size>0)e.push(m);else return new Set}}let c=Pe.intersection(this.metrics,e),a=new Set;for(let p of c){let m=this.index.getTriple(p);if(!s?.predicate&&!n?.predicate&&!(typeof i=="object"&&i.predicate)){a.add(p);continue}let u=!0;s?.predicate&&(u=u&&s.predicate(V.source(m))),n?.predicate&&(u=u&&n.predicate(V.target(m))),typeof i=="object"&&i.predicate&&(u=u&&i.predicate(V.relation(m))),u&&a.add(p)}return a}search(t){let e=[];for(let s of this.#t(t)){let i=this.index.getTriple(s);i&&e.push(i)}return new tt(e)}search2(t){let e=Object.entries(t),s=[];for(let c=0;c<e.length-2;c+=2){let a=e.slice(c,c+3),p={source:a[0][1],relation:a[1][1],target:a[2][1]},m=a.map(y=>y[0]),u=this.#t(p),b=Array.from(u).flatMap(y=>{let _=this.index.getTripleIndices(y);return typeof _>"u"?[]:[_]});s.push({names:m,rows:b})}let i=s.reduce(As.bind(this,this.metrics)),n=i.names,o=[];for(let c of i.rows){let a={};for(let p=0;p<n.length;p++){let m=n[p];a[m]=this.index.stringIndex.getValue(c[p])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var Ds=window.envConfig,Ht=class{constructor(t=`/manifest/tribbles.${Ds.publication_id}.txt`){this.url=t}async*stream(){let t=new Be,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let s=new TextDecoderStream,i=e.body.pipeThrough(s).getReader(),n="";for(;;){let{value:o,done:c}=await i.read();if(c)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let p of a){let m=t.parse(p);m!==void 0&&(yield m)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var He="photos";var Ve={photos:"photos",albums:"albums",album:"album",metadata:"metadata",about:"about",videos:"videos",thing:"thing",listing:"listing"},$=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname";static PHOTO="photo";static ALBUM="album";static VIDEO="video";static COUNTRY="country"},g=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatchUrl";static WIKIPEDIA="wikipedia";static CREATED_AT="createdAt";static SEASON="season";static F_STOP="f_stop";static FOCAL_LENGTH="focalLength";static MODEL="model";static EXPOSURE_TIME="exposureTime";static ISO="iso";static WIDTH="width";static HEIGHT="height";static THUMBNAIL_URL="thumbnailUrl";static PNG_URL="pngUrl";static MID_IMAGE_LOSSY_URL="midImageLossyUrl";static FULL_IMAGE="fullImage";static POSTER_URL="posterUrl";static VIDEO_URL_1080P="videoUrl1080p";static VIDEO_URL_480P="videoUrl480p";static VIDEO_URL_720P="videoUrl720p";static VIDEO_URL_UNSCALED="videoUrlUnscaled";static YEAR="year"},qe=new Set([g.CREATED_AT,g.F_STOP,g.FOCAL_LENGTH,g.MODEL,g.EXPOSURE_TIME,g.ISO,g.WIDTH,g.HEIGHT]),et=new Set([$.BIRD,$.MAMMAL,$.REPTILE,$.AMPHIBIAN,$.FISH,$.INSECT]),Fe=new Set([g.THUMBNAIL_URL,g.PNG_URL,g.MID_IMAGE_LOSSY_URL,g.FULL_IMAGE,g.POSTER_URL,g.VIDEO_URL_1080P,g.VIDEO_URL_480P,g.VIDEO_URL_720P,g.VIDEO_URL_UNSCALED]);function Rs(r,t){let{id:e,type:s}=x(t),i=r.search({source:{id:e,type:s},relation:g.NAME}).firstTarget();if(typeof i>"u")return i;if(typeof i!="string")throw new TypeError(`name is not a string: ${i}`);return i}function ks(r,t){let{id:e,type:s}=x(t),i=r.search({source:{id:e,type:s},relation:[g.LONGITUDE,g.LATITUDE]}).firstObject();if(i)return{longitude:i.longitude,latitude:i.latitude}}function Os(r){return{name:r.name,minDate:parseInt(r.minDate),maxDate:parseInt(r.maxDate),thumbnailUrl:r.thumbnailUrl,mosaicColours:r.mosaic,id:r.id,photosCount:r.photosCount,flags:r.flags}}function Ms(r){return{...r}}function Ls(r){return{...r}}function Ns(r,t){return r.search({source:{type:"photo"},relation:"albumId",target:{id:t}}).sources()}function Ps(r,t){return r.search({source:{type:t},relation:"name"}).objects().sort((s,i)=>s.name.localeCompare(i.name))}var E=class{static getName(t,e){return Rs(t,e)}static getAlbumPhotoSources(t,e){return Ns(t,e)}static getDistinctNames(t,e){return Ps(t,e)}static getGeocoordinates(t,e){return ks(t,e)}static videoObjects(t){return t.search({source:{type:"video"}}).objects().map(Ms)}static photoObjects(t,e={}){return t.search({...e,source:{type:"photo"}}).objects().map(Ls).sort((s,i)=>i.createdAt-s.createdAt)}static albumObjects(t){return t.search({source:{type:"album"}}).objects().map(Os).sort((e,s)=>s.minDate-e.minDate)}},Vt=class{static getURL(t,e){let s=E.getGeocoordinates(t,e);if(!s)return;let{longitude:i,latitude:n}=s;if(i&&n){let o=`https://www.google.com/maps?q=${n},${i}`;return l`
      <a href="${o}" target="_blank" rel="noopener">[maps]</a>
      `}}};var A=class{static capitalise(t){return t.charAt(0).toUpperCase()+t.slice(1)}static pluralise(t){return t+"s"}static camelCase(t){return t.replace(/[-_ ]+([a-zA-Z0-9])/g,(e,s)=>s.toUpperCase())}};var M=class r{static{this.ROUTES={photos:this.showPhotosUrl,albums:this.showAlbumsUrl,album:this.showAlbumUrl,metadata:this.showMetadataUrl,about:this.showAboutUrl,videos:this.showVideosUrl,thing:this.showThingUrl,listing:this.showListingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":"albums","#/album":"album","#/metadata":"metadata","#/about":"about","#/videos":"videos","#/thing":"thing","#/photos":"photos","#/listing":"listing"}}static{this.ID_PAGES=new Set(["album","metadata","thing","listing"])}static isPage(t){return t in Ve}static router(t){if(r.isPage(t))return r.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return r.isPage(t)&&r.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t,e){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t,e){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t,e){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t,e){window.location.hash=`#/thing/${t}`;let s=E.getName(e,t);if(!s){document.title="Thing - photos";return}document.title=`${A.capitalise(s)} - photos`}static showListingUrl(t,e){window.location.hash=`#/listing/${t}`,document.title="Listing - photos"}static extractQueryParams(){let t={},e=i=>{let n=new URLSearchParams(i);for(let[o,c]of n.entries())t[o]=c},s=window.location.hash.indexOf("?");return s!==-1&&e(window.location.hash.slice(s+1)),t}static getUrl(){let t=window.location.hash;for(let[e,s]of Object.entries(r.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let i=r.extractQueryParams(),n={type:s,qs:i};return r.ID_PAGES.has(s)&&(n.id=t.split("/")[2]),n}return{type:"albums",qs:{}}}};var Bs={attribute:!0,type:String,converter:ft,reflect:!1,hasChanged:Ot},js=(r=Bs,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,r)},init(c){return c!==void 0&&this.C(o,void 0,r,c),c}}}if(s==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function h(r){return(t,e)=>typeof e=="object"?js(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}var Ft=class extends f{render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
    <aside class="${t.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${this.broadcast("navigate-page",{page:"photos"})}
            class="sidebar-item">PHOTOS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"videos"})}
            class="sidebar-item">VIDEOS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"albums"})}
            id="albums-sidebar-link" class="sidebar-item">ALBUMS</li>
          <li
            @click=${this.broadcast("navigate-page",{page:"about"})}
            class="sidebar-item">ABOUT</li>

      </nav>
    </aside>
    `}};d([h({type:Boolean,state:!0})],Ft.prototype,"visible",2);customElements.define("photo-sidebar",Ft);var zt=class extends f{constructor(){super(...arguments);this.darkMode=!1}feedUrl(){return"/manifest/atom/atom-index.xml"}renderRss(){return l`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `}render(){let e=this.darkMode?"\u2600\uFE0F":"\u{1F319}",s=He;return l`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${s}</span></a></li>
      ${this.renderRss()}
      <li style="float: right">
      <a>
      <span @click=${this.broadcast("switch-theme")} class="brand switch">${e}</span>
      </a>
      </li>

      </ul>
    </nav>
    `}};d([h()],zt.prototype,"darkMode",2);customElements.define("photo-header",zt);var at={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=r=>(...t)=>({_$litDirective$:r,values:t}),ot=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Hs}=Me;var Ge=r=>r.strings===void 0,ze=()=>document.createComment(""),We=(r,t,e)=>{let s=r._$AA.parentNode,i=t===void 0?r._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(ze(),i),o=s.insertBefore(ze(),i);e=new Hs(n,o,r,r.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==r;if(c){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==o._$AU&&e._$AP(a)}if(n!==i||c){let a=e._$AA;for(;a!==n;){let p=a.nextSibling;s.insertBefore(a,i),a=p}}}return e},Ye=(r,t,e=r)=>(r._$AI(t,e),r);var Qe=r=>{r._$AR()};var xt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),xt(s,t);return!0},Gt=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Ke=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),Fs(t)}};function Vs(r){this._$AN!==void 0?(Gt(this),this._$AM=r,Ke(this)):this._$AM=r}function qs(r,t=!1,e=0){let s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)xt(s[n],!1),Gt(s[n]);else s!=null&&(xt(s,!1),Gt(s));else xt(this,r)}var Fs=r=>{r.type==at.CHILD&&(r._$AP??=qs,r._$AQ??=Vs)},Wt=class extends ot{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ke(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(xt(this,t),Gt(this))}setValue(t){if(Ge(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Je=async(r,t)=>{for await(let e of r)if(await t(e)===!1)return},Yt=class{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}},Qt=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((t=>this.Z=t))}resume(){this.Z?.(),this.Y=this.Z=void 0}};var wt=class extends Wt{constructor(){super(...arguments),this._$CK=new Yt(this),this._$CX=new Qt}render(t,e){return R}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this._$CJ)return R;this._$CJ=e;let i=0,{_$CK:n,_$CX:o}=this;return Je(e,(async c=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a._$CJ!==e)return!1;s!==void 0&&(c=s(c,i)),a.commitValue(c,i),i++}return!0})),R}commitValue(t,e){this.setValue(t)}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},Hi=st(wt);var lt=st(class extends wt{constructor(r){if(super(r),r.type!==at.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(r,t){return this._$Ctt=r,super.update(r,t)}commitValue(r,t){t===0&&Qe(this._$Ctt);let e=We(this._$Ctt);Ye(e,r)}});var Kt=new Map,U=class{static loadingMode(t){let e=globalThis.innerWidth,s=globalThis.innerHeight,i=400,n=Math.floor(e/i),o=Math.floor(s/i);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Kt.has(t))return Kt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let i=s.getContext("2d");if(!i){console.error("context missing, cannot render colours");return}return i.fillStyle=e[1],i.fillRect(0,0,1,1),i.fillStyle=e[2],i.fillRect(1,0,1,1),i.fillStyle=e[3],i.fillRect(0,1,1,1),i.fillStyle=e[4],i.fillRect(1,1,1,1),Kt.set(t,s.toDataURL("image/png")),Kt.get(t)}};var q=class extends f{constructor(){super(...arguments);this.loading="eager"}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let s=e.target?.parentNode?.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let e=this.id.startsWith("urn:")?I(this.id).id:this.id,s={id:e,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:U.encodeBitmapDataURL(this.mosaicColours)},i=document.createElement("div");i.innerHTML=this.summary??"";let n=i.textContent??i.innerText??"";return l`
    <div class="photo">
      <a href="${"#/metadata/"+e}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",s)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${s.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          alt=${n}
          title=${n}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};d([h()],q.prototype,"id",2),d([h()],q.prototype,"imageUrl",2),d([h()],q.prototype,"thumbnailUrl",2),d([h()],q.prototype,"mosaicColours",2),d([h()],q.prototype,"summary",2),d([h()],q.prototype,"loading",2);customElements.define("app-photo",q);var C=class{static getElement(){return document.getElementById("rss")}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Tt=class Tt extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title="Photos - photos"}static{this.IMAGE_RELATIONS=["thumbnailUrl","mosaicColours","fullImage"]}matchingImages(){return E.photoObjects(this.triples,{relation:{relation:Tt.IMAGE_RELATIONS},target:{type:"unknown"}})}async forceRerender(t){t%4===0&&await new Promise(e=>setTimeout(e,0))}render(){let t=this.matchingImages(),e=this;async function*s(){for(let i=0;i<t.length;i++){let n=t[i];await e.forceRerender(i),yield l`
          <app-photo
            id=${x(n.id).id}
            loading="${U.loadingMode(i)}"
            thumbnailUrl="${n.thumbnailUrl}"
            mosaicColours="${n.mosaicColours}"
            imageUrl="${n.fullImage}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${lt(s())}
      </section>
    </div>
    `}};d([h({state:!0})],Tt.prototype,"triples",2),d([h()],Tt.prototype,"qs",2);var ue=Tt;customElements.define("photos-page",ue);var me=class extends f{render(){let t=document.getElementById("stats-data");if(!t)return console.error("No stats data found"),l``;let e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <a href="#/listing/country">countries</a> ·
        ${e.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${e.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        a few <a href="#/listing/amphibian">amphibians</a> and <a href="#/listing/reptile">reptiles</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",me);var ct=class{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,i]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${i}`}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let i=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},c=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),p=i.toLocaleDateString("en-IE",{day:"numeric"}),m=n.toLocaleDateString("en-IE",{day:"numeric"}),u=i.toLocaleDateString("en-IE",{month:"short"}),b=n.toLocaleDateString("en-IE",{month:"short"}),y=i.getFullYear(),_=n.getFullYear(),k=u===b,B=y===_;return c===a?`${c} ${y}`:k&&B?`${p} - ${m} ${b} ${y}`:`${c} ${y} - ${a} ${_}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return c===a?c:`${c} \u2014 ${a}`}}};var ge={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"},Jt=/^\[([a-z]*):(.*)\]$/;function Xe(r,t){if(typeof t!="string"||!Jt.test(t))return t;let e=t.match(Jt);if(!e)return t;let s=e[1],i=e[2];return r[s]?`${r[s]}${i}`:t}function fe(r,t){let[e,s,i]=t,n=Xe(r,e),o=Xe(r,i);if(Jt.test(n))throw new Error(`Source still matches CURIE regex after expansion: "${e}" ${n}`);if(Jt.test(o))throw new Error(`Target still matches CURIE regex after expansion: "${i}" ${o}`);return[[n,s,o]]}var v=class{static isUrnSource(t){return w.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return w.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},w=class r{static isUrn(t){return typeof t=="string"&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,i]=t.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}static is(t,e){return r.isUrn(t)&&r.parseUrn(t).type===e}static toURL(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=r.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type&&s.id===i.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return r.isUrn(t)&&r.parseUrn(t).id===e}static sameType(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type}static isType(t,e){return r.isUrn(t)?r.parseUrn(t).type===e:!1}},rt=class{static pretty(t){let e=t.replace(/-/g," ");return A.capitalise(e)}static toCommonName(t,e){return t.search({source:{id:e},relation:g.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=I(e);return t.search({source:{id:s},relation:g.BIRDWATCH_URL}).firstTarget()}},G=class{static details(t,e){let s=t.search({source:{type:$.COUNTRY},relation:{relation:[g.NAME,g.FLAG]}}),i=s.search({relation:g.NAME,target:{id:e}}).firstSource();if(!i)throw new Error(`No urn for country found with name ${e}`);let n=I(i),o=s.search({source:n,relation:g.FLAG}).firstTarget();return{urn:i,name:e,flag:o}}static urnDetails(t,e){let s=I(e),i=t.search({source:{type:$.COUNTRY,id:s.id},relation:g.NAME}).firstTarget(),n=t.search({source:s,relation:g.FLAG}).firstTarget();return{urn:e,name:i,flag:n}}};function Ze(r){return v.getRelation(r)!==g.RATING?[r]:[[v.getSource(r),v.getRelation(r),`urn:r\xF3:rating:${encodeURIComponent(v.getTarget(r))}`]]}function ts(r){if(v.getRelation(r)!==g.LOCATION)return[r];let t=v.getTarget(r);return w.is(t,$.COUNTRY)?[[v.getSource(r),g.COUNTRY,t]]:[r]}function es(r){if(v.getRelation(r)!==g.COUNTRY)return[r];let e=`urn:r\xF3:country:${v.getTarget(r).toLowerCase().replace(/ /g,"-")}`;return[[v.getSource(r),v.getRelation(r),e]]}function ss(r,t){for(let e of Fe)if(v.getRelation(t)===e)return[[v.getSource(t),e,`${r}${v.getTarget(t)}`]];return[t]}function rs(r){let[t,e,s]=r;return[[typeof t=="string"&&t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,typeof s=="string"&&s.startsWith("::")?`urn:r\xF3:${s.slice(2)}`:s]]}function is(r){let[t,e,s]=r;return[[t,A.camelCase(e),s]]}function ns(r){if(v.getRelation(r)!==g.CREATED_AT)return[r];let t=new Date(v.getTarget(r));if(isNaN(t.getTime()))return[r];let e=t.getUTCMonth()+1,s="Winter";return e>=3&&e<=5?s="Spring":e>=6&&e<=8?s="Summer":e>=9&&e<=11&&(s="Autumn"),[r,[v.getSource(r),g.SEASON,s]]}function os(r){if(v.getRelation(r)!==g.CREATED_AT)return[r];let t=new Date(v.getTarget(r));if(isNaN(t.getTime()))return[r];let e=t.getUTCFullYear().toString();return[r,[v.getSource(r),g.YEAR,e]]}var zs=await fetch(`/dist/css/photo-album.${window.envConfig.build_id}.css`),Gs=await zs.text(),Ws={default:Gs},as=ie`${Rt(Ws.default)}`,L=class extends O{constructor(){super(...arguments);this.path="/#/album/"}broadcast(e,s){return()=>{let i=new CustomEvent(e,{detail:s,bubbles:!0,composed:!0});this.dispatchEvent(i)}}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.url})();let s=e.target.parentNode.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}renderLink(){return l`
    `}renderPlaceholder(){if(this.mosaicColours){let e=U.encodeBitmapDataURL(this.mosaicColours);return l`
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${e}"/>
      `}return l``}renderImage(){return l`
    <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.onClick?.bind(this)}>
    `}static{this.styles=as}render(){return performance.mark(`start-album-render-${this.url}`),l`
    <div class="photo-album">
      <a href="${this.path+this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`}};d([h()],L.prototype,"id",2),d([h()],L.prototype,"title",2),d([h()],L.prototype,"triples",2),d([h()],L.prototype,"url",2),d([h()],L.prototype,"mosaicColours",2),d([h()],L.prototype,"loading",2),d([h()],L.prototype,"path",2),d([h()],L.prototype,"onClick",2);var F=class extends f{static{this.styles=as}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=globalThis.matchMedia("(max-width: 500px)");return ct.dateRange(this.minDate,this.maxDate,t.matches)}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=G.details(this.triples,t),i=I(s);return l`<a href="#/thing/country:${i.id}" title=${t}>${e}</a>`})}render(){let t=this.count===1?"photo":"photos",e=this.renderCountries();return l`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`}};d([h()],F.prototype,"title",2),d([h()],F.prototype,"triples",2),d([h()],F.prototype,"minDate",2),d([h()],F.prototype,"maxDate",2),d([h()],F.prototype,"countries",2),d([h()],F.prototype,"count",2);customElements.define("photo-album",L);customElements.define("photo-album-metadata",F);var Xt=class extends f{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(globalThis.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,i=[];for(let a=0;a<e.length;a++)if(e[a].position.top>globalThis.scrollY)if(s||(s=e[a].position.top,i.push(e[a])),e[a].position.top===s)i.push(e[a]);else break;let n=Math.min(...i.map(a=>a.minDate)),c=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&c!=="Invalid Date"&&(t.textContent=c)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let i=s.getAttribute("data-min-date");return i?[{position:s.getBoundingClientRect(),minDate:parseInt(i,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("scroll",this._onScroll,{passive:!0}),globalThis.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){globalThis.removeEventListener("scroll",this._onScroll),globalThis.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};d([h({type:Array})],Xt.prototype,"datesCache",2);customElements.define("year-cursor",Xt);var St=class extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title="Albums - photos"}render(){performance.mark("start-albums-render");let t=i=>{let n=x(i.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:n.id,title:i.name},bubbles:!0,composed:!0}))},e=E.albumObjects(this.triples);async function*s(){let i=2e3,n=new Date().getFullYear();for(let o=0;o<e.length;o++){let c=e[o],a=U.loadingMode(o),p=new Date(c.minDate).getFullYear();p!==i&&(i=p,p!==n&&(yield l`<h2 class="album-year-heading">${p}</h2>`)),o%4===0&&await new Promise(u=>setTimeout(u,0));let m=l`
        <photo-album-metadata
          .triples=${this.triples}
            title="${c.name}"
            minDate="${c.minDate}"
            maxDate="${c.maxDate}"
            countries="${c.flags}"
            count="${c.photosCount}"
        ></photo-album-metadata>`;yield l`
          <photo-album
            .onClick=${t.bind(null,c)}
            .triples=${this.triples}
            title="${c.name}"
            url="${c.thumbnailUrl}"
            mosaicColours="${c.mosaicColours}"
            id="${c.id}"
            loading=${a}>
            ${m}
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${lt(s.bind(this)())}
    </section>
    `}};d([h({})],St.prototype,"albums",2),d([h({state:!0})],St.prototype,"triples",2);customElements.define("albums-page",St);var Et=class extends ot{constructor(t){if(super(t),this.it=S,t.type!==at.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===S||t==null)return this._t=void 0,this.it=t;if(t===R)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Et.directiveName="unsafeHTML",Et.resultType=1;var Zt=st(Et);var N=class extends f{render(){return l`
    <div>
      <video controls class="thumbnail-video" preload="${this.preload}" poster=${this.urlPoster}>
        <source src="${this.url480p}" type="video/mp4">
      </video>
      <ul>
        <a href="${this.urlUnscaled}">[L]</a>
        <a href="${this.url1080p}">[M]</a>
        <a href="${this.url720p}">[S]</a>
        <a href="${this.url480p}">[XS]</a>
      </ul>

    </div>
    `}};d([h()],N.prototype,"id",2),d([h()],N.prototype,"url",2),d([h()],N.prototype,"preload",2),d([h()],N.prototype,"urlPoster",2),d([h()],N.prototype,"urlUnscaled",2),d([h()],N.prototype,"url1080p",2),d([h()],N.prototype,"url720p",2),d([h()],N.prototype,"url480p",2);customElements.define("app-video",N);var ht=class extends f{async shareAlbum(t){if(!navigator.share){console.error("navigator.share not available");return}this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}render(){let t=this.shareAlbum.bind(this,this.url);return l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${t}>
        ${this.sharing?"[sharing...]":"[share]"}
      </button>
      `}};d([h()],ht.prototype,"title",2),d([h()],ht.prototype,"url",2),d([h({state:!0})],ht.prototype,"sharing",2);customElements.define("album-share-button",ht);var te=class extends f{getId(){return w.parseUrn(this.urn)?.id??"unknown"}url(){return this.getId()?`https://whc.unesco.org/en/list/${this.getId()}`:null}render(){return this.getId()?l`
      <a class="unesco-link thing-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};d([h()],te.prototype,"urn",2);customElements.define("unesco-link",te);var _t=class extends f{render(){let t=G.urnDetails(this.triples,this.urn),e=w.toURL(this.urn);return l`<a class="country-link" href="${e}">${t.flag} ${t.name}</a>`}};d([h()],_t.prototype,"urn",2),d([h()],_t.prototype,"triples",2);customElements.define("country-link",_t);var It=class extends f{name(){let{type:t,id:e}=w.parseUrn(this.urn);if(et.has(t))return l`<span>${rt.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:w.parseUrn(this.urn),relation:g.NAME}).firstTarget();return s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=w.parseUrn(this.urn);return{[$.BIRD]:"bird-link",[$.MAMMAL]:"mammal-link",[$.REPTILE]:"reptile-link",[$.AMPHIBIAN]:"amphibian-link",[$.FISH]:"fish-link",[$.INSECT]:"insect-link"}[t]??""}render(){if(!w.isUrn(this.urn))return l`<span>Invalid URN</span>`;let t=w.toURL(this.urn);return w.is(this.urn,$.COUNTRY)?l`
        <country-link .triples=${this.triples} urn="${this.urn}"></country-link>
      `:l`
      <a class="thing-link ${this.linkClass()}" href="${t}">${this.name()}</a>
    `}};d([h()],It.prototype,"urn",2),d([h()],It.prototype,"triples",2);customElements.define("thing-link",It);var P=class extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title=`${this.title} - photos`}albumPhotos(t){let e=E.getAlbumPhotoSources(t,this.id);return Array.from(e).flatMap(s=>{let i=t.search({source:I(s)}).firstObject(!0);return i?[i]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"albumId",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let i=t.search({source:I(s)}).firstObject();return i?[i]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[$.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o[g.LOCATION]?.filter(c=>w.is(c,n))).filter(o=>o)));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o[g.SUBJECT]?.filter(c=>w.is(c,n))).filter(o=>o)));let i=[];i=i.concat(e[$.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])i=i.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return i}render(){let t=this.triples,e=globalThis.matchMedia("(max-width: 500px)"),s=ct.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,p)=>l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${U.loadingMode(p)}"
        thumbnailUrl="${a.thumbnailUrl}"
        mosaicColours="${a.mosaicColours}"
        imageUrl="${a.fullImage}"></app-photo>`),o=this.albumVideos(t).map((a,p)=>l`<app-video
        id=${a.id}
        urlPoster=${a.posterUrl}
        urlUnscaled=${a.videoUrlUnscaled}
        url1080p=${a.videoUrl1080p}
        url720p=${a.videoUrl720p}
        url480p=${a.videoUrl480p}
        ></app-video>`),c=this?.countries.split(",").map(a=>{let{flag:p,urn:m}=G.details(this.triples,a),u=I(m);return l`<span href="#/thing/country:${u.id}" title=${a}>${p}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${c}</p>
        <p class="photo-album-description">${Zt(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks(t).map(a=>l`<li>${a}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${n}
      </section>

      <section class="video-container">
        ${o}
      </section>
    </div>
    `}};d([h()],P.prototype,"title",2),d([h()],P.prototype,"id",2),d([h()],P.prototype,"minDate",2),d([h()],P.prototype,"maxDate",2),d([h()],P.prototype,"imageCount",2),d([h()],P.prototype,"description",2),d([h({state:!0})],P.prototype,"triples",2),d([h()],P.prototype,"countries",2);customElements.define("album-page",P);var dt=class extends f{handleError(t){alert(t)}async shareImage(t){if(!navigator.share){this.handleError("navigator.share not available");return}this.sharing=!0;try{let e=await fetch(t);if(!e.ok){this.handleError(`failed to fetch image! status: ${e.status}`);return}let s=await e.blob(),n={files:[new File([s],"image.webp",{type:this.format})],title:"Sharing Image"};if(!navigator.canShare?.(n)){await navigator.share({title:"Sharing Image",url:this.url});return}await navigator.share(n)}catch(e){this.handleError("Error sharing image"+e)}finally{this.sharing=!1}}render(){return l`
    <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[${this.sharing?"sharing...":"share"}]</button>
    `}};d([h()],dt.prototype,"url",2),d([h()],dt.prototype,"format",2),d([h({state:!0})],dt.prototype,"sharing",2);customElements.define("share-metadata-button",dt);function pt(r){return l`<th class="exif-heading">${r}</th>`}var it=class extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title="Metadata - photos"}renderAperture(t){return t.fStop==="Unknown"?l`<td>Unknown</td>`:t.fStop==="0.0"?l`<td>Manual aperture control</td>`:t.fStop?l`<td>ƒ/${t.fStop}</td>`:l`<td>Unknown</td>`}renderFocalLength(t){return t.focalLength==="Unknown"?l`${t.focalLength}`:t.focalLength==="0"?l`<td>Manual lens</td>`:t.focalLength?l`<td>${t.focalLength}mm</td>`:l`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${Zt(e??"")}`;if(w.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(w.isUrn(e)&&w.is(e,$.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(w.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["birdBinomial","mammalBinomial","wildlife","livingConditions","pngUrl","cover","fStop"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>v.getRelation(e).localeCompare(v.getRelation(s))).filter(e=>!this.isIgnoredKey(v.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(v.getRelation(e))}</th>
              <td>${this.renderSemanticValue(v.getRelation(e),v.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?l`
      ${pt("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:l`
      ${pt("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?l`
        ${pt("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:l`
      ${pt("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutterSpeed=="number"?l`
        ${pt("Shutter Speed")}
        <td>1/${Math.round(1/t.shutterSpeed)}</td>`:l`
      ${pt("Shutter Speed")}
      <td>Unknown</td>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();if(!e)return l`<p>No EXIF data available</p>`;let s=new Date(parseInt(e.createdAt)),i={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},n=s.toLocaleDateString("en-US",i);return l`
    <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${n}
      </time></td>
      </tr>
      <tr>
        ${this.renderModel(e)}
        </tr>
      <tr>
        ${this.renderDimensions(e)}
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength(e)}
      </tr>
      <tr>
        ${this.renderShutterSpeed(e)}
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture(e)}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${e.iso??"Unknown"}</td>
      </tr>
    </table>
    `}render(){let t=this.image,e=t.albumId,s=this.triples,i=s.search({source:{id:I(t.id).id},relation:{predicate:n=>{let o=new Set(["albumId","fullImage","mosaicColours","thumbnailUrl","midImageLossyUrl"]);return!qe.has(n)&&!o.has(n)}}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnailUrl}"/>

      <p>
        <a href="${t.fullImage}" rel="noreferrer">[webp]</a>
        <a href="${t.pngUrl}" rel="noreferrer">[png]</a>
        <share-metadata-button format="image/webp" url=${t.midImageLossyUrl}></share-metadata-button>
        <a href="#/album/${e}" rel="noreferrer">[album]</a>
      </p>

      ${this.renderSemanticData(i)}
      ${this.renderExif(s)}

    </section>
    `}};d([h()],it.prototype,"id",2),d([h()],it.prototype,"image",2),d([h({state:!0})],it.prototype,"sharing",2),d([h({state:!0})],it.prototype,"triples",2);customElements.define("metadata-page",it);var $e=class extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title="About - photos"}render(){return l`
    <div>
      <section class="about-page">
        <h1>About</h1>

        <p>I started taking photos back in 2012, and have taken a lot of photos since. I've become, in my opinion, a reasonable wildlife photographer (though hit-or-miss at other styles of photography). I built this website to share the things <a href="https://photos.rgrannell.xyz/#/thing/rating:⭐⭐⭐⭐⭐">I found beautiful in this world.</a></p>

        <h2>Can I use the photos on this site?</h2>

        <p>You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not.</p>

        <h2>Can I use data from this site to train AI?</h2>

        <p>No, absolutely not. The <a href="http://photos.rgrannell.xyz/robots.txt">robots.txt</a> file for this site explicitly prohibits this.</p>

        <h2>What is your contact information?</h2>

        <p>See <a href="https://rgrannell.xyz/">my personal site</a> for contact details.</p>

        </section>
    </div>
    `}};customElements.define("about-page",$e);var W=class W extends f{static{this.TYPE_VIEW={unesco:{title:"\u{1F3DB}\uFE0F Unesco World Heritage Sites",description:"Photos from some of the most outstanding places on earth."},country:{title:"\u{1F30D} Countries",description:"All photos are taken in some country..."}}}connectedCallback(){super.connectedCallback(),C.setIndex(),this.updatePageLocation()}updatePageLocation(){let t=E.getName(this.triples,this.urn);if(!t){document.title="Thing - photos";return}document.title=`${A.capitalise(t)} - photos`}isValidImage(t){return t&&t.thumbnailUrl}urnImages(t,e){let i=t.search(e).sources();return Array.from(i).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let c=t.search({source:x(n)}).firstObject();return this.isValidImage(c)?[c]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return this.isValidImage(o)?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,s)=>s.createdAt-e.createdAt).map((e,s)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?I(e.id).id:e.id}
        loading="${U.loadingMode(s)}"
        thumbnailUrl="${e.thumbnailUrl}"
        mosaicColours="${e.mosaicColours}"
        imageUrl="${e.fullImage}"></app-photo>`)}renderSubjectAlbums(t,e){let s=this.urnImages(t,e),i=new Set(s.map(o=>o.albumId)),n=o=>{let c=x(o.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:c.id,title:o.title??o.name},bubbles:!0,composed:!0}))};return Array.from(i).flatMap(o=>E.albumObjects(this.triples).filter(c=>I(c.id).id===o)).map(o=>{let c=l`
        <photo-album-metadata
            .triples=${this.triples}
            title="${o.name}"
            count="${o.count}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
        ></photo-album-metadata>`;return l`
          <photo-album
            .onClick=${n.bind(null,o)}
            .triples=${this.triples}
            title="${o.name}"
            url="${o.thumbnailUrl}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}"
            loading="eager">
      ${c}
          </photo-album>
      `})}firstPhotographed(t,e){let i=this.urnImages(t,e).sort((n,o)=>n.createdAt-o.createdAt)[0];return i?new Date(parseInt(i.createdAt)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTypeTitle(t){let e=t.toLowerCase();return W.TYPE_VIEW.hasOwnProperty(e)?W.TYPE_VIEW[e].title:A.capitalise(t)}renderTypeDescription(t){let e=t.toLowerCase();return W.TYPE_VIEW.hasOwnProperty(e)?W.TYPE_VIEW[e].description:""}renderTitle(){let t=E.getName(this.triples,this.urn);if(t)return t;try{let e=w.parseUrn(this.urn),s=decodeURIComponent(e.id);if(e.id==="*")return this.renderTypeTitle(e.type);if(e.type===$.COUNTRY){let i=this.triples.search({source:e}).firstObject();return i?i.flag?`${i.flag} ${t}`:t:s}return et.has(e.type)?rt.toCommonName(this.triples,s):s}catch{return this.urn}}renderClassification(t){return l`<a href="#/listing/${t}">${A.capitalise(t)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(et.has(t.type))for(let i of["captivity","wild"]){let o={...t,qs:{context:i}};s.push({label:i,query:{target:o}})}else s.push({label:"default",query:{source:{type:"photo"},target:t}});return s}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,s])=>s?s.length===0?[]:e==="default"?[l`
        <div class="photo-group">
          ${s}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${A.capitalise(e)}</h4>
          ${s}
        </div>
      `]:[])}
    <div/>`}thingCountries(){let t=this.triples,e=w.parseUrn(this.urn);if(e.id==="*")return[];let i=[...t.search({source:{type:"photo"},target:{id:e.id,type:e.type}}).sources()].flatMap(n=>Array.from(t.search({source:x(n),relation:g.COUNTRY}).targets()));return Array.from(new Set(i))}render(){let t=this.triples,e=w.parseUrn(this.urn),s=e.type,i=t.search({source:x(this.urn)}).firstObject()??{},n=Object.assign({Classification:this.renderClassification(s)});if(i.country&&(n.Country=l`<thing-link .triples=${this.triples} urn=${i.country}></thing-link>`),i.fcodeName){let B=i.fcodeName;n["Place Type"]=l`${A.capitalise(B)}`}et.has(s)&&(n["First Photographed"]=l`<span>${this.firstPhotographed(t,{target:x(this.urn)})}</span>`);let o=this.thingCountries();if(o.length>0){let B=o.map(ut=>l`<country-link .triples=${this.triples} urn=${ut}></country-link>`);n["Seen In"]=l`<ul>${B}</ul>`}let c=i[g.WIKIPEDIA],a=i[g.BIRDWATCH_URL],p=Vt.getURL(t,this.urn),m=x(this.urn);m.id==="*"&&delete m.id;let u=this.getPhotoQueries(x(this.urn)),b={};for(let{query:B,label:ut}of u){let us=this.urnImages(t,B);b[ut]=this.renderSubjectPhotos(us)}let y={source:{type:"photo"},target:m},_=this.renderSubjectAlbums(t,y),k=this.renderPhotoSection(b);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p class="thing-description">${this.renderTypeDescription(s)}</p>

        <p>
          ${et.has(s)&&e.id!=="*"?l`<span class="thing-binomial ${s}-binomial">${rt.pretty(e.id)}</span>`:l``}
        </p>
        <br>

        ${c?l`<a href="${c}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${p?l`<span class="location">${p}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(n).map(([B,ut])=>l`
          <tr>
            <th class="exif-heading">${B}</th>
            <td>${ut}</td>
          </tr>
          `)}
        </table>

        <br>
        ${k}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${_}
        </section>

      </div>
    `}};d([h()],W.prototype,"urn",2),d([h({state:!0})],W.prototype,"triples",2);var be=W;customElements.define("thing-page",be);var ee=class{static loadingMode(t){return t===0?"auto":"none"}};var se=class extends f{connectedCallback(){super.connectedCallback(),C.setIndex(),document.title="Videos- photos"}render(){let t=E.videoObjects(this.triples);async function*e(){for(let s=0;s<t.length;s++){let i=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`<app-video
          id=${i.id}
          urlPoster=${i.posterUrl}
          urlUnscaled=${i.videoUrlUnscaled}
          url1080p=${i.videoUrl1080p}
          url720p=${i.videoUrl720p}
          url480p=${i.videoUrl480p}
          preload="${ee.loadingMode(s)}"
        ></app-video>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${lt(e())}
      </section>
    </div>
    `}};d([h({state:!0})],se.prototype,"triples",2);customElements.define("videos-page",se);var ye=class{static chooseCoverImage(t,e,s){return t.search({source:{type:"photo"},relation:"cover",target:x(s)}).firstObject()?.id}static chooseBestImage(t,e,s){let n=t.search({source:{type:"photo"},target:x(s)}).sources();n||console.error("no photos found");let o=this.chooseCoverImage(t,e,s);if(o&&n.has(o))return o;let a=Array.from(n).map(p=>{let m=t.search({source:x(p),relation:"rating"}),u=Array.from(m.targets()).map(b=>decodeURIComponent(x(b).id).length);return{photo:p,rating:Math.max(...u)}}).sort((p,m)=>m.rating-p.rating)[0];return a||console.error("No photo found for",e,s),a?.photo}},z=class extends f{connectedCallback(){super.connectedCallback(),document.title="Listing - photos"}render(){let t=U.encodeBitmapDataURL(this.mosaicColours);return l`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `}};d([h({state:!0})],z.prototype,"triples",2),d([h()],z.prototype,"url",2),d([h()],z.prototype,"id",2),d([h()],z.prototype,"mosaicColours",2),d([h()],z.prototype,"count",2),d([h()],z.prototype,"loading",2);customElements.define("thing-album",z);var Ut=class extends f{getTitle(){return A.capitalise(this.id)}getThingAlbumTitle(t,e){let s=this.triples.search({source:x(t)}).firstObject();return s&&s.flag?`${e} ${s.flag}`:e}renderMetadata(t,e,s){let i=this.triples.search({source:x(e)}).firstObject();return i?l`
      <div class="thing-metadata">
        <p>${this.getThingAlbumTitle(e,s)}</p>
        ${i.wikipedia?l`<span><a href="${i.wikipedia}">[wiki]</a></span>`:""}

        ${i.birdwatchUrl?l`<span><a href="${i.birdwatchUrl}">[birdwatch]</a></span>`:""}
      </div>
    `:l`<div class="thing-metadata"><p>${s}</p></div>`}renderThingAlbum(t,e,s,i){let n=ye.chooseBestImage(this.triples,t,e);if(!n)return console.error("No image found for",t,e),l``;let o=(m,u)=>{let{type:b,id:y}=x(m),_=new CustomEvent("click-thing-album",{detail:{id:`${b}:${y}`,name:u},bubbles:!0,composed:!0});this.dispatchEvent(_)},c=this.triples.search({source:x(n)}).firstObject(),a=x(this.id),p=`${a.type}:${a.id}`;return l`
      <photo-album
        .onClick=${o.bind(null,e,s)}
        .triples=${this.triples}
        title="${s}"
        url="${c.thumbnailUrl}"
        mosaicColours="${c.mosaicColours}"
        id=${p}
        path="#/thing/"
        loading=${U.loadingMode(i)}>
      ${this.renderMetadata(t,e,s)}
        </photo-album>
    `}render(){let t=this.triples,e=E.getDistinctNames(t,this.id);return l`
    <section class="album-metadata">
      <h1 class="albums-header">${this.getTitle()}s</h1>
      <a href="/#/thing/${this.id}:*">See all ${this.id} photos</a>
    </section>

    <section class="album-container">

      ${e.map((s,i)=>this.renderThingAlbum(this.id,s.id,s.name,i))}
    </section>
    `}};d([h()],Ut.prototype,"id",2),d([h({state:!0})],Ut.prototype,"triples",2);customElements.define("listing-page",Ut);function ls(r,t,e){return typeof e=="string"&&parseInt(e)>=0?void 0:`invalid relation ${t} for value ${e}`}function Y(r,t,e){return typeof e=="string"&&(e.startsWith("/")||e.startsWith("http"))?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Ct(r,t,e){return`${t} deprecated`}function T(r,t,e){}function cs(r,t,e){return typeof e=="string"&&/\d+/.test(e)?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function hs(r,t,e){return typeof e=="string"&&/^\d+$/.test(e)&&Number(e)>0?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Ys(r,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-180&&Number(e)<=180?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Qs(r,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-90&&Number(e)<=90?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Ks(r,t,e){return typeof e=="string"&&e.startsWith("urn:r\xF3:country")?void 0:`invalid country value ${e}`}function Js(r,t,e){if(typeof e!="string")return`invalid rating value ${e}`;let s=decodeURIComponent(e);return s.match(/^⭐{0,5}$/)||s.match(/^urn:ró:rating:⭐{0,5}$/)?void 0:`invalid rating value ${e}`}var ds={living_conditions:Ct,mammal_binomial:Ct,plane_model:Ct,vehicle:Ct,videos_count:ls,photos_count:ls,height:cs,width:cs,max_date:hs,min_date:hs,png_url:Y,poster_url:Y,thumbnail_url:Y,video_url_1080p:Y,video_url_480p:Y,video_url_720p:Y,video_url_unscaled:Y,latitude:Qs,longitude:Ys,full_image:Y,country:Ks,rating:Js,flag:T,album_id:T,bird_binomial:Ct,birdwatch_url:T,created_at:T,curie:T,description:T,exposure_time:T,fcode:T,fcode_name:T,flags:T,focal_length:T,f_stop:T,iso:T,location:T,model:T,mosaic:T,mosaic_colours:T,name:T,style:T,subject:T,summary:T,wikidata:T,wikipedia:T,wildlife:T};function ps(r){let t=[is,rs,Ze,es,ts,ss.bind(null,"https://photos-cdn.rgrannell.xyz"),fe.bind(null,ge),ns,os],e=[r];for(let s of t)e=e.flatMap(s);return e}var Xs=new Ht,D=class D extends f{static{this.DEFAULT_PAGE="albums"}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,globalThis.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new je([],ds));for await(let e of Xs.stream())t.push(...[e].flatMap(ps)),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),globalThis.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=M.getUrl();M.isPage(t?.type)?this.page=t.type:(console.error("did not match pagetype",t?.type),this.page=D.DEFAULT_PAGE),M.pageUsesId(this.page)&&typeof t.id=="string"&&(this.id=t.id),this.qs=t.qs}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page="photos",this.id=s,this.title=e,M.showAlbumUrl(s)}receiveClickThingAlbum(t){let{title:e,id:s}=t.detail;this.page="thing",this.id=s,this.title=e,M.showThingUrl(s,this.tribbleDB)}receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:i}=t.detail;this.page="metadata",this.id=e,this.imageUrl=s,this.thumbnailUrl=i,M.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=M.router(this.page);e||console.error(`no router found for page ${this.page}`),M.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page==="about")return l`<about-page class="${e}"></about-page>`;if(this.page==="photos")return l`<photos-page
        .qs=${this.qs}
        .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page==="album"){this.id||console.error("no album id provided");let s=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .triples=${this.tribbleDB}
        title=${s.name}
        id=${this.id}
        minDate=${s.minDate}
        maxDate=${s.maxDate}
        imageCount=${s.photosCount}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page==="metadata"){let s=this.tribbleDB.search({source:{type:"photo",id:this.id}}).firstObject();return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page==="videos")return l`
      <videos-page .triples=${this.tribbleDB} class="${e}"></videos-page>
      `;if(this.page==="thing")return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .triples=${this.tribbleDB}
        class="${e}"></thing-page>
      `;if(this.page==="listing")if(!this.id)console.error("no listing provided");else return l`
        <listing-page id=${this.id} .triples=${this.tribbleDB} class="${e}"></listing-page>
        `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],l`
    <body>
      <div class="${s.join(" ")}"
        @click-album=${this.receiveClickAlbum}
        @click-thing-album=${this.receiveClickThingAlbum}
        @click-burger-menu=${this.receiveClickBurgerMenu}
        @click-photo-metadata=${this.receiveClickPhotoMetadata}
        @switch-theme=${this.receiveSwitchTheme}
        @navigate-page=${this.receiveNavigatePage}>

        <photo-header .darkMode=${this.loadDarkMode()}></photo-header>

        <div class="${t.join(" ")}">
            <photo-sidebar visible=${this.sidebarVisible}></photo-sidebar>
            ${this.renderPage(this.sidebarVisible)}
        </div>
      </div>
    </body>
    `}};d([h()],D.prototype,"title",2),d([h()],D.prototype,"page",2),d([h({state:!0})],D.prototype,"sidebarVisible",2),d([h()],D.prototype,"tribbleDB",2),d([h()],D.prototype,"darkMode",2),d([h()],D.prototype,"id",2),d([h()],D.prototype,"imageUrl",2),d([h()],D.prototype,"thumbnailUrl",2),d([h()],D.prototype,"route",2),d([h()],D.prototype,"params",2),d([h()],D.prototype,"query",2),d([h()],D.prototype,"qs",2);var ve=D;customElements.define("photo-app",ve);export{ve as PhotoApp};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/async-directive.js:
lit-html/directives/async-replace.js:
lit-html/directives/async-append.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=app.2ce90b4e409362cf.js.map
