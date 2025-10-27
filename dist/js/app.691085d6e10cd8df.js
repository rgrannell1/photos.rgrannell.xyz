var yr=Object.defineProperty;var vr=Object.getOwnPropertyDescriptor;var h=(s,t,e,r)=>{for(var i=r>1?void 0:r?vr(t,e):t,n=s.length-1,o;n>=0;n--)(o=s[n])&&(i=(r?o(t,e,i):o(i))||i);return r&&i&&yr(t,e,i),i};var kt=globalThis,Ot=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),_e=new WeakMap,ft=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ot&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=_e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&_e.set(e,t))}return t}toString(){return this.cssText}},Lt=s=>new ft(typeof s=="string"?s:s+"",void 0,ce),de=(s,...t)=>{let e=s.length===1?s[0]:t.reduce(((r,i,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[n+1]),s[0]);return new ft(e,s,ce)},Ae=(s,t)=>{if(Ot)s.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let r=document.createElement("style"),i=kt.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,s.appendChild(r)}},he=Ot?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Lt(e)})(s):s;var{is:xr,defineProperty:wr,getOwnPropertyDescriptor:Sr,getOwnPropertyNames:Tr,getOwnPropertySymbols:Ir,getPrototypeOf:Er}=Object,Mt=globalThis,Ue=Mt.trustedTypes,_r=Ue?Ue.emptyScript:"",Ar=Mt.reactiveElementPolyfillSupport,$t=(s,t)=>s,bt={toAttribute(s,t){switch(t){case Boolean:s=s?_r:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Nt=(s,t)=>!xr(s,t),Ce={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:Nt};Symbol.metadata??=Symbol("metadata"),Mt.litPropertyMetadata??=new WeakMap;var H=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ce){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&wr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:n}=Sr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);n?.call(this,o),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ce}static _$Ei(){if(this.hasOwnProperty($t("elementProperties")))return;let t=Er(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($t("properties"))){let e=this.properties,r=[...Tr(e),...Ir(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(he(i))}else t!==void 0&&e.push(he(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ae(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:bt).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=r.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:bt;this._$Em=i;let c=o.fromAttribute(e,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){let i=this.constructor,n=this[t];if(r??=i.getPropertyOptions(t),!((r.hasChanged??Nt)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:n},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,n]of r){let{wrapped:o}=n,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[$t("elementProperties")]=new Map,H[$t("finalized")]=new Map,Ar?.({ReactiveElement:H}),(Mt.reactiveElementVersions??=[]).push("2.1.1");var ue=globalThis,Pt=ue.trustedTypes,De=Pt?Pt.createPolicy("lit-html",{createHTML:s=>s}):void 0,me="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+V,Ur=`<${ge}>`,Z=document,vt=()=>Z.createComment(""),xt=s=>s===null||typeof s!="object"&&typeof s!="function",fe=Array.isArray,Ne=s=>fe(s)||typeof s?.[Symbol.iterator]=="function",pe=`[ 	
\f\r]`,yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,ke=/>/g,J=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Le=/"/g,Pe=/^(?:script|style|textarea|title)$/i,$e=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),l=$e(1),cs=$e(2),ds=$e(3),O=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),Me=new WeakMap,X=Z.createTreeWalker(Z,129);function Be(s,t){if(!fe(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(t):t}var je=(s,t)=>{let e=s.length-1,r=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=yt;for(let c=0;c<e;c++){let a=s[c],p,f,g=-1,u=0;for(;u<a.length&&(o.lastIndex=u,f=o.exec(a),f!==null);)u=o.lastIndex,o===yt?f[1]==="!--"?o=Re:f[1]!==void 0?o=ke:f[2]!==void 0?(Pe.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=J):f[3]!==void 0&&(o=J):o===J?f[0]===">"?(o=i??yt,g=-1):f[1]===void 0?g=-2:(g=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?J:f[3]==='"'?Le:Oe):o===Le||o===Oe?o=J:o===Re||o===ke?o=yt:(o=J,i=void 0);let b=o===J&&s[c+1].startsWith("/>")?" ":"";n+=o===yt?a+Ur:g>=0?(r.push(p),a.slice(0,g)+me+a.slice(g)+V+b):a+V+(g===-2?c:b)}return[Be(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},wt=class s{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[p,f]=je(t,e);if(this.el=s.createElement(p,r),X.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=X.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(me)){let u=f[o++],b=i.getAttribute(g).split(V),v=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:v[2],strings:b,ctor:v[1]==="."?jt:v[1]==="?"?Ht:v[1]==="@"?Vt:et}),i.removeAttribute(g)}else g.startsWith(V)&&(a.push({type:6,index:n}),i.removeAttribute(g));if(Pe.test(i.tagName)){let g=i.textContent.split(V),u=g.length-1;if(u>0){i.textContent=Pt?Pt.emptyScript:"";for(let b=0;b<u;b++)i.append(g[b],vt()),X.nextNode(),a.push({type:2,index:++n});i.append(g[u],vt())}}}else if(i.nodeType===8)if(i.data===ge)a.push({type:2,index:n});else{let g=-1;for(;(g=i.data.indexOf(V,g+1))!==-1;)a.push({type:7,index:n}),g+=V.length-1}n++}}static createElement(t,e){let r=Z.createElement("template");return r.innerHTML=t,r}};function tt(s,t,e=s,r){if(t===O)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,n=xt(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=tt(s,i._$AS(s,t.values),i,r)),t}var Bt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??Z).importNode(e,!0);X.currentNode=i;let n=X.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new lt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new qt(n,this,t)),this._$AV.push(p),a=r[++c]}o!==a?.index&&(n=X.nextNode(),o++)}return X.currentNode=Z,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},lt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),xt(t)?t===I||t==null||t===""?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ne(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&xt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Z.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=wt.createElement(Be(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Bt(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new wt(t)),e}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let n of t)i===e.length?e.push(r=new s(this.O(vt()),this.O(vt()),this,this.options)):r=e[i],r._$AI(n),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=I}_$AI(t,e=this,r,i){let n=this.strings,o=!1;if(n===void 0)t=tt(this,t,e,0),o=!xt(t)||t!==this._$AH&&t!==O,o&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=tt(this,c[r+a],e,a),p===O&&(p=this._$AH[a]),o||=!xt(p)||p!==this._$AH[a],p===I?t=I:t!==I&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},jt=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}},Ht=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}},Vt=class extends et{constructor(t,e,r,i,n){super(t,e,r,i,n),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??I)===O)return;let r=this._$AH,i=t===I&&r!==I||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==I&&(r===I||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},qt=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}},He={M:me,P:V,A:ge,C:1,L:je,R:Bt,D:Ne,V:tt,I:lt,H:et,N:Ht,U:Vt,B:jt,F:qt},Cr=ue.litHtmlPolyfillSupport;Cr?.(wt,lt),(ue.litHtmlVersions??=[]).push("3.3.1");var Ve=(s,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let n=e?.renderBefore??null;r._$litPart$=i=new lt(t.insertBefore(vt(),n),n,void 0,e??{})}return i._$AI(s),i};var be=globalThis,M=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ve(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};M._$litElement$=!0,M.finalized=!0,be.litElementHydrateSupport?.({LitElement:M});var Dr=be.litElementPolyfillSupport;Dr?.({LitElement:M});(be.litElementVersions??=[]).push("4.2.1");var $=class extends M{createRenderRoot(){return this}broadcast(t,e){return()=>{let r=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(r)}}};var qe=class{#e;#t;#r;constructor(){this.#e=0,this.#t=new Map,this.#r=new Map}map(){return this.#t}reverseMap(){return this.#r}add(s){return this.#t.has(s)?this.#t.get(s):(this.#t.set(s,this.#e),this.#r.set(this.#e,s),this.#e++,this.#e-1)}setIndex(s,t){this.#t.set(s,t),this.#r.set(t,s)}getIndex(s){return this.#t.get(s)}getValue(s){return this.#r.get(s)}has(s){return this.#t.has(s)}},Ft=class{static intersection(s,t){if(t.length===0)return new Set;t.sort((r,i)=>r.size-i.size);let e=new Set(t[0]);for(let r=1;r<t.length;r++){let i=t[r];for(let n of e)s.setCheck(),i.has(n)||e.delete(n);if(e.size===0)break}return e}static append(s,t){for(let e of t)s.add(e);return s}},Fe=class{stringIndex;constructor(){this.stringIndex=new qe}parseTriple(s){let t=s.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${s}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),r=this.stringIndex.getValue(parseInt(t[2],10)),i=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||r===void 0||i===void 0)throw new SyntaxError(`Invalid triple reference: ${s}`);return[e,r,i]}parseDeclaration(s){let t=s.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${s}`);let e=t[1],r=t[2];this.stringIndex.setIndex(r,parseInt(e,10))}parse(s){if(/^(\d+)\s(\d+)\s(\d+)$/.test(s))return this.parseTriple(s);this.parseDeclaration(s)}};function A(s,t="r\xF3"){if(!s.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${s}`);let e=s.split(":"),r=e[2],i=s.indexOf("?"),n=i!==-1?s.slice(i+1):"",o=i!==-1?e[3].slice(0,e[3].indexOf("?")):e[3],c=n?Object.fromEntries(new URLSearchParams(n)):{};return{type:r,id:o,qs:c}}function w(s,t="r\xF3"){return typeof s!="string"||!s.startsWith(`urn:${t}:`)?{type:"unknown",id:s,qs:{}}:A(s,t)}var Rr=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},kr=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Or=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(s){this.indexedTriples=[],this.stringIndex=new qe,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(s),this.metrics=new Rr}add(s){let t=this.indexedTriples.length;for(let e=0;e<s.length;e++){let r=t+e,i=s[e],n=i[0],o=i[1],c=i[2],a=this.stringUrn.get(n);a||(a=w(n),this.stringUrn.set(n,a));let p=this.stringUrn.get(c);p||(p=w(c),this.stringUrn.set(c,p));let f=this.stringIndex.add(a.type),g=this.stringIndex.add(a.id),u=this.stringIndex.add(o),b=this.stringIndex.add(p.type),v=this.stringIndex.add(p.id);this.indexedTriples.push([this.stringIndex.add(n),u,this.stringIndex.add(c)]);let C=this.sourceType.get(f);C||(C=new Set,this.sourceType.set(f,C)),C.add(r);let _=this.sourceId.get(g);_||(_=new Set,this.sourceId.set(g,_)),_.add(r);for(let[ae,le]of Object.entries(a.qs)){let K=this.stringIndex.add(`${ae}=${le}`);this.sourceQs.has(K)||this.sourceQs.set(K,new Set),this.sourceQs.get(K).add(r)}let L=this.relations.get(u);L||(L=new Set,this.relations.set(u,L)),L.add(r);let at=this.targetType.get(b);at||(at=new Set,this.targetType.set(b,at)),at.add(r);let Rt=this.targetId.get(v);Rt||(Rt=new Set,this.targetId.set(v,Rt)),Rt.add(r);for(let[ae,le]of Object.entries(p.qs)){let K=this.stringIndex.add(`${ae}=${le}`);this.targetQs.has(K)||this.targetQs.set(K,new Set),this.targetQs.get(K).add(r)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([s,t,e])=>[this.stringIndex.getValue(s),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(s){if(s<0||s>=this.indexedTriples.length)return;let[t,e,r]=this.indexedTriples[s];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(r)]}getTripleIndices(s){if(!(s<0||s>=this.indexedTriples.length))return this.indexedTriples[s]}getSourceTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},q=class{static source(s){return s[0]}static relation(s){return s[1]}static target(s){return s[2]}};function Lr(s,t,e){let r=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:r,rows:[]};let i=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let p=t.rows[a][2];i.has(p)||i.set(p,[]),i.get(p).push(a)}for(let a=0;a<e.rows.length;a++){let p=e.rows[a][0];n.has(p)||n.set(p,[]),n.get(p).push(a)}let o=Ft.intersection(s,[new Set(i.keys()),new Set(n.keys())]),c=[];for(let a of o){let p=n.get(a),f=i.get(a);for(let g of p)for(let u of f){let b=t.rows[g].concat(e.rows[u]);c.push(b)}}return{names:r,rows:c}}var ze=class rt{index;triplesCount;cursorIndices;metrics;validations;constructor(t,e={}){this.index=new Or(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new kr,this.validations=e;for(let r=0;r<this.triplesCount;r++)this.cursorIndices.add(r)}clone(){let t=new rt([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new rt(t)}static from(t){let e=[];for(let r of t){let{id:i,...n}=r;if(typeof i!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,c]of Object.entries(n))if(Array.isArray(c))for(let a of c)e.push([i,o,a]);else e.push([i,o,c])}return new rt(e)}validateTriples(t){let e=[];for(let[r,i,n]of t){let o=this.validations[i];if(!o)continue;let{type:c}=w(r),a=o(c,i,n);typeof a=="string"&&e.push(a)}if(e.length>0)throw new Error(`Triple validation failed:
- ${e.join(`
- `)}`)}add(t){let e=this.index.length;this.validateTriples(t),this.index.add(t),this.triplesCount=this.index.length;for(let r=e;r<this.triplesCount;r++)this.cursorIndices.add(r)}map(t){return new rt(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new rt(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?q.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?q.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?q.target(t):void 0}firstObject(t=!1){let e,r={};for(let[i,n,o]of this.index.triples())e===void 0&&(e=i,r.id=i),e===i&&(r[n]?Array.isArray(r[n])?r[n].push(o):r[n]=[r[n],o]:r[n]=t?[o]:o);return r}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(q.source))}relations(){return new Set(this.index.triples().map(q.relation))}targets(){return new Set(this.index.triples().map(q.target))}objects(t=!1){let e=[];for(let[r,i]of Object.entries(this.#e(t)))i.id=r,e.push(i);return e}#e(t=!1){let e={};for(let[r,i,n]of this.index.triples())e[r]||(e[r]={id:r}),e[r][i]?Array.isArray(e[r][i])?e[r][i].push(n):e[r][i]=[e[r][i],n]:e[r][i]=t?[n]:n;return e}nodeAsDSL(t){if(!(typeof t>"u"))return typeof t=="string"?{type:"unknown",id:t}:Array.isArray(t)?{type:"unknown",id:t}:t}relationAsDSL(t){if(!(typeof t>"u"))return typeof t=="string"?{relation:[t]}:Array.isArray(t)?{relation:t}:t}searchParamsToObject(t){if(!Array.isArray(t))return t;let[e,r,i]=t;return{source:this.nodeAsDSL(e),relation:this.relationAsDSL(r),target:this.nodeAsDSL(i)}}#t(t){let e=[this.cursorIndices],{source:r,relation:i,target:n}=this.searchParamsToObject(t);if(typeof r>"u"&&typeof n>"u"&&typeof i>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];if(!Array.isArray(t)){for(let u of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,u)&&!o.includes(u))throw new Error(`Unexpected search parameter: ${u}`)}let c=this.nodeAsDSL(r),a=this.relationAsDSL(i),p=this.nodeAsDSL(n);if(c){if(c.type){let u=this.index.getSourceTypeSet(c.type);if(u)e.push(u);else return new Set}if(c.id){let u=Array.isArray(c.id)?c.id:[c.id],b=new Set;for(let v of u){let C=this.index.getSourceIdSet(v);if(C)Ft.append(b,C);else return new Set}e.push(b)}if(c.qs)for(let[u,b]of Object.entries(c.qs)){let v=this.index.getSourceQsSet(u,b);if(v)e.push(v);else return new Set}}if(p){if(p.type){let u=this.index.getTargetTypeSet(p.type);if(u)e.push(u);else return new Set}if(p.id){let u=Array.isArray(p.id)?p.id:[p.id],b=new Set;for(let v of u){let C=this.index.getTargetIdSet(v);if(C)Ft.append(b,C);else return new Set}e.push(b)}if(p.qs)for(let[u,b]of Object.entries(p.qs)){let v=this.index.getTargetQsSet(u,b);if(v)e.push(v);else return new Set}}if(a&&a.relation){let u=new Set;for(let b of a.relation){let v=this.index.getRelationSet(b);if(v)for(let C of v)u.add(C)}if(u.size>0)e.push(u);else return new Set}let f=Ft.intersection(this.metrics,e),g=new Set;for(let u of f){let b=this.index.getTriple(u);if(!c?.predicate&&!p?.predicate&&!a?.predicate){g.add(u);continue}let v=!0;c?.predicate&&(v=v&&c.predicate(q.source(b))),p?.predicate&&(v=v&&p.predicate(q.target(b))),typeof a=="object"&&a.predicate&&(v=v&&a.predicate(q.relation(b))),v&&g.add(u)}return g}search(t){let e=[];for(let r of this.#t(t)){let i=this.index.getTriple(r);i&&e.push(i)}return new rt(e)}search2(t){let e=Object.entries(t),r=[];for(let c=0;c<e.length-2;c+=2){let a=e.slice(c,c+3),p={source:a[0][1],relation:a[1][1],target:a[2][1]},f=a.map(b=>b[0]),g=this.#t(p),u=Array.from(g).flatMap(b=>{let v=this.index.getTripleIndices(b);return typeof v>"u"?[]:[v]});r.push({names:f,rows:u})}let i=r.reduce(Lr.bind(this,this.metrics)),n=i.names,o=[];for(let c of i.rows){let a={};for(let p=0;p<n.length;p++){let f=n[p];a[f]=this.index.stringIndex.getValue(c[p])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var Mr=window.envConfig,zt=class{constructor(t=`/manifest/tribbles.${Mr.publication_id}.txt`){this.url=t}async*stream(){let t=new Fe,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let r=new TextDecoderStream,i=e.body.pipeThrough(r).getReader(),n="";for(;;){let{value:o,done:c}=await i.read();if(c)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let p of a){let f=t.parse(p);f!==void 0&&(yield f)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var Ge="photos";var We={photos:"photos",albums:"albums",album:"album",metadata:"metadata",about:"about",videos:"videos",thing:"thing",listing:"listing"},y=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static PLACE="place";static PHOTO="photo";static ALBUM="album";static VIDEO="video";static COUNTRY="country"},m=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatchUrl";static WIKIPEDIA="wikipedia";static CREATED_AT="createdAt";static SEASON="season";static F_STOP="f_stop";static FOCAL_LENGTH="focalLength";static MODEL="model";static EXPOSURE_TIME="exposureTime";static ISO="iso";static WIDTH="width";static HEIGHT="height";static THUMBNAIL_URL="thumbnailUrl";static PNG_URL="pngUrl";static MID_IMAGE_LOSSY_URL="midImageLossyUrl";static FULL_IMAGE="fullImage";static POSTER_URL="posterUrl";static VIDEO_URL_1080P="videoUrl1080p";static VIDEO_URL_480P="videoUrl480p";static VIDEO_URL_720P="videoUrl720p";static VIDEO_URL_UNSCALED="videoUrlUnscaled";static YEAR="year";static CONTAINS="contains";static IN="in"},Ye=new Set([m.CREATED_AT,m.F_STOP,m.FOCAL_LENGTH,m.MODEL,m.EXPOSURE_TIME,m.ISO,m.WIDTH,m.HEIGHT]),st=new Set([y.BIRD,y.MAMMAL,y.REPTILE,y.AMPHIBIAN,y.FISH,y.INSECT]),Qe=new Set([m.THUMBNAIL_URL,m.PNG_URL,m.MID_IMAGE_LOSSY_URL,m.FULL_IMAGE,m.POSTER_URL,m.VIDEO_URL_1080P,m.VIDEO_URL_480P,m.VIDEO_URL_720P,m.VIDEO_URL_UNSCALED]),Os=[[m.IN,m.CONTAINS]];function Nr(s,t){let{id:e,type:r}=w(t),i=s.search({source:{id:e,type:r},relation:m.NAME}).firstTarget();if(typeof i>"u")return i;if(typeof i!="string")throw new TypeError(`name is not a string: ${i}`);return i}function Pr(s,t){let{id:e,type:r}=w(t),i=s.search({source:{id:e,type:r},relation:[m.LONGITUDE,m.LATITUDE]}).firstObject();if(i)return{longitude:i.longitude,latitude:i.latitude}}function Br(s){return{name:s.name,minDate:parseInt(s.minDate),maxDate:parseInt(s.maxDate),thumbnailUrl:s.thumbnailUrl,mosaicColours:s.mosaic,id:s.id,photosCount:s.photosCount,flags:s.flags}}function jr(s){return{...s}}function Hr(s){return{...s}}function Vr(s,t){return s.search({source:{type:"photo"},relation:"albumId",target:{id:t}}).sources()}function qr(s,t){return s.search({source:{type:t},relation:"name"}).objects().sort((r,i)=>r.name.localeCompare(i.name))}var E=class{static getName(t,e){return Nr(t,e)}static getAlbumPhotoSources(t,e){return Vr(t,e)}static getDistinctNames(t,e){return qr(t,e)}static getGeocoordinates(t,e){return Pr(t,e)}static videoObjects(t){return t.search({source:{type:"video"}}).objects().map(jr)}static photoObjects(t,e={}){return t.search({...e,source:{type:"photo"}}).objects().map(Hr).sort((r,i)=>i.createdAt-r.createdAt)}static albumObjects(t){return t.search({source:{type:"album"}}).objects().map(Br).sort((e,r)=>r.minDate-e.minDate)}},Gt=class{static getURL(t,e){let r=E.getGeocoordinates(t,e);if(!r)return;let{longitude:i,latitude:n}=r;if(i&&n){let o=`https://www.google.com/maps?q=${n},${i}`;return l`
      <a href="${o}" target="_blank" rel="noopener">[maps]</a>
      `}}};var R=class{static capitalise(t){return t.charAt(0).toUpperCase()+t.slice(1)}static pluralise(t){return t+"s"}static camelCase(t){return t.replace(/[-_ ]+([a-zA-Z0-9])/g,(e,r)=>r.toUpperCase())}};var N=class s{static{this.ROUTES={photos:this.showPhotosUrl,albums:this.showAlbumsUrl,album:this.showAlbumUrl,metadata:this.showMetadataUrl,about:this.showAboutUrl,videos:this.showVideosUrl,thing:this.showThingUrl,listing:this.showListingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":"albums","#/album":"album","#/metadata":"metadata","#/about":"about","#/videos":"videos","#/thing":"thing","#/photos":"photos","#/listing":"listing"}}static{this.ID_PAGES=new Set(["album","metadata","thing","listing"])}static isPage(t){return t in We}static router(t){if(s.isPage(t))return s.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return s.isPage(t)&&s.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t,e){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t,e){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t,e){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t,e){window.location.hash=`#/thing/${t}`;let r=E.getName(e,t);if(!r){document.title="Thing - photos";return}document.title=`${R.capitalise(r)} - photos`}static showListingUrl(t,e){window.location.hash=`#/listing/${t}`,document.title="Listing - photos"}static extractQueryParams(){let t={},e=i=>{let n=new URLSearchParams(i);for(let[o,c]of n.entries())t[o]=c},r=window.location.hash.indexOf("?");return r!==-1&&e(window.location.hash.slice(r+1)),t}static getUrl(){let t=window.location.hash;for(let[e,r]of Object.entries(s.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let i=s.extractQueryParams(),n={type:r,qs:i};return s.ID_PAGES.has(r)&&(n.id=t.split("/")[2]),n}return{type:"albums",qs:{}}}};var Fr={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Nt},zr=(s=Fr,t,e)=>{let{kind:r,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),r==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,s)},init(c){return c!==void 0&&this.C(o,void 0,s,c),c}}}if(r==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,s)}}throw Error("Unsupported decorator location: "+r)};function d(s){return(t,e)=>typeof e=="object"?zr(s,t,e):((r,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(i,n):void 0})(s,t,e)}var Yt=class extends ${render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};h([d({type:Boolean,state:!0})],Yt.prototype,"visible",2);customElements.define("photo-sidebar",Yt);var Qt=class extends ${constructor(){super(...arguments);this.darkMode=!1}feedUrl(){return"/manifest/atom/atom-index.xml"}renderRss(){return l`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `}render(){let e=this.darkMode?"\u2600\uFE0F":"\u{1F319}",r=Ge;return l`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${r}</span></a></li>
      ${this.renderRss()}
      <li style="float: right">
      <a>
      <span @click=${this.broadcast("switch-theme")} class="brand switch">${e}</span>
      </a>
      </li>

      </ul>
    </nav>
    `}};h([d()],Qt.prototype,"darkMode",2);customElements.define("photo-header",Qt);var dt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},it=s=>(...t)=>({_$litDirective$:s,values:t}),ct=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Gr}=He;var Je=s=>s.strings===void 0,Ke=()=>document.createComment(""),Xe=(s,t,e)=>{let r=s._$AA.parentNode,i=t===void 0?s._$AB:t._$AA;if(e===void 0){let n=r.insertBefore(Ke(),i),o=r.insertBefore(Ke(),i);e=new Gr(n,o,s,s.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==s;if(c){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==o._$AU&&e._$AP(a)}if(n!==i||c){let a=e._$AA;for(;a!==n;){let p=a.nextSibling;r.insertBefore(a,i),a=p}}}return e},Ze=(s,t,e=s)=>(s._$AI(t,e),s);var tr=s=>{s._$AR()};var St=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let r of e)r._$AO?.(t,!1),St(r,t);return!0},Kt=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},er=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),Qr(t)}};function Wr(s){this._$AN!==void 0?(Kt(this),this._$AM=s,er(this)):this._$AM=s}function Yr(s,t=!1,e=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let n=e;n<r.length;n++)St(r[n],!1),Kt(r[n]);else r!=null&&(St(r,!1),Kt(r));else St(this,s)}var Qr=s=>{s.type==dt.CHILD&&(s._$AP??=Yr,s._$AQ??=Wr)},Jt=class extends ct{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),er(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(St(this,t),Kt(this))}setValue(t){if(Je(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var rr=async(s,t)=>{for await(let e of s)if(await t(e)===!1)return},Xt=class{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}},Zt=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((t=>this.Z=t))}resume(){this.Z?.(),this.Y=this.Z=void 0}};var Tt=class extends Jt{constructor(){super(...arguments),this._$CK=new Xt(this),this._$CX=new Zt}render(t,e){return O}update(t,[e,r]){if(this.isConnected||this.disconnected(),e===this._$CJ)return O;this._$CJ=e;let i=0,{_$CK:n,_$CX:o}=this;return rr(e,(async c=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a._$CJ!==e)return!1;r!==void 0&&(c=r(c,i)),a.commitValue(c,i),i++}return!0})),O}commitValue(t,e){this.setValue(t)}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},Wi=it(Tt);var ht=it(class extends Tt{constructor(s){if(super(s),s.type!==dt.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this._$Ctt=s,super.update(s,t)}commitValue(s,t){t===0&&tr(this._$Ctt);let e=Xe(this._$Ctt);Ze(e,s)}});var te=new Map,U=class{static loadingMode(t){let e=globalThis.innerWidth,r=globalThis.innerHeight,i=400,n=Math.floor(e/i),o=Math.floor(r/i);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(te.has(t))return te.get(t);let e=t.split("#").map(n=>`#${n}`),r=document.createElement("canvas");r.width=2,r.height=2;let i=r.getContext("2d");if(!i){console.error("context missing, cannot render colours");return}return i.fillStyle=e[1],i.fillRect(0,0,1,1),i.fillStyle=e[2],i.fillRect(1,0,1,1),i.fillStyle=e[3],i.fillRect(0,1,1,1),i.fillStyle=e[4],i.fillRect(1,1,1,1),te.set(t,r.toDataURL("image/png")),te.get(t)}};var F=class extends ${constructor(){super(...arguments);this.loading="eager"}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let r=e.target?.parentNode?.querySelector(".thumbnail-placeholder");r.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let e=this.id.startsWith("urn:")?A(this.id).id:this.id,r={id:e,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:U.encodeBitmapDataURL(this.mosaicColours)},i=document.createElement("div");i.innerHTML=this.summary??"";let n=i.textContent??i.innerText??"";return l`
    <div class="photo">
      <a href="${"#/metadata/"+e}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",r)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${r.thumbnailDataUrl}"/>

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
    `}};h([d()],F.prototype,"id",2),h([d()],F.prototype,"imageUrl",2),h([d()],F.prototype,"thumbnailUrl",2),h([d()],F.prototype,"mosaicColours",2),h([d()],F.prototype,"summary",2),h([d()],F.prototype,"loading",2);customElements.define("app-photo",F);var D=class{static getElement(){return document.getElementById("rss")}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var It=class It extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title="Photos - photos"}static{this.IMAGE_RELATIONS=["thumbnailUrl","mosaicColours","fullImage"]}matchingImages(){return E.photoObjects(this.triples,{relation:{relation:It.IMAGE_RELATIONS},target:{type:"unknown"}})}async forceRerender(t){t%4===0&&await new Promise(e=>setTimeout(e,0))}render(){let t=this.matchingImages(),e=this;async function*r(){for(let i=0;i<t.length;i++){let n=t[i];await e.forceRerender(i),yield l`
          <app-photo
            id=${w(n.id).id}
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
        ${ht(r())}
      </section>
    </div>
    `}};h([d({state:!0})],It.prototype,"triples",2),h([d()],It.prototype,"qs",2);var ye=It;customElements.define("photos-page",ye);var ve=class extends ${render(){let t=document.getElementById("stats-data");if(!t)return console.error("No stats data found"),l``;let e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <a href="#/listing/country">countries</a> ·
        ${e.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${e.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        a few <a href="#/listing/amphibian">amphibians</a> and <a href="#/listing/reptile">reptiles</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",ve);var pt=class{static parse(t){let[e,r]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${r}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[r,i]=e.split("T")[0].replace(/\:/g,"-");return`${r.replace(/\:/g,"/")} ${i}`}static dateRange(t,e,r){if(!t&&!e)return"unknown date";let i=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(r){let o={day:"numeric",month:"short"},c=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),p=i.toLocaleDateString("en-IE",{day:"numeric"}),f=n.toLocaleDateString("en-IE",{day:"numeric"}),g=i.toLocaleDateString("en-IE",{month:"short"}),u=n.toLocaleDateString("en-IE",{month:"short"}),b=i.getFullYear(),v=n.getFullYear(),C=g===u,_=b===v;return c===a?`${c} ${b}`:C&&_?`${p} - ${f} ${u} ${b}`:`${c} ${b} - ${a} ${v}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return c===a?c:`${c} \u2014 ${a}`}}};var xe={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"},ee=/^\[([a-z]*):(.*)\]$/;function sr(s,t){if(typeof t!="string"||!ee.test(t))return t;let e=t.match(ee);if(!e)return t;let r=e[1],i=e[2];return s[r]?`${s[r]}${i}`:t}function we(s,t){let[e,r,i]=t,n=sr(s,e),o=sr(s,i);if(ee.test(n))throw new Error(`Source still matches CURIE regex after expansion: "${e}" ${n}`);if(ee.test(o))throw new Error(`Target still matches CURIE regex after expansion: "${i}" ${o}`);return[[n,r,o]]}var x=class{static isUrnSource(t){return S.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return S.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},S=class s{static isUrn(t){return typeof t=="string"&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[r,i]=t.split("?"),n=r.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}static is(t,e){return s.isUrn(t)&&s.parseUrn(t).type===e}static toURL(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:r}=s.parseUrn(t);return`#/thing/${e}:${r}`}static sameURN(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let r=s.parseUrn(t),i=s.parseUrn(e);return r.type===i.type&&r.id===i.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return s.isUrn(t)&&s.parseUrn(t).id===e}static sameType(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let r=s.parseUrn(t),i=s.parseUrn(e);return r.type===i.type}static isType(t,e){return s.isUrn(t)?s.parseUrn(t).type===e:!1}},nt=class{static pretty(t){let e=t.replace(/-/g," ");return R.capitalise(e)}static toCommonName(t,e){return t.search({source:{id:e},relation:m.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:r}=A(e);return t.search({source:{id:r},relation:m.BIRDWATCH_URL}).firstTarget()}},W=class{static details(t,e){let r=t.search({source:{type:y.COUNTRY},relation:{relation:[m.NAME,m.FLAG]}}),i=r.search({relation:m.NAME,target:{id:e}}).firstSource();if(!i)throw new Error(`No urn for country found with name ${e}`);let n=A(i),o=r.search({source:n,relation:m.FLAG}).firstTarget();return{urn:i,name:e,flag:o}}static urnDetails(t,e){let r=A(e),i=t.search({source:{type:y.COUNTRY,id:r.id},relation:m.NAME}).firstTarget(),n=t.search({source:r,relation:m.FLAG}).firstTarget();return{urn:e,name:i,flag:n}}};function ir(s){return x.getRelation(s)!==m.RATING?[s]:[[x.getSource(s),x.getRelation(s),`urn:r\xF3:rating:${encodeURIComponent(x.getTarget(s))}`]]}function nr(s){if(x.getRelation(s)!==m.LOCATION)return[s];let t=x.getTarget(s);return S.is(t,y.COUNTRY)?[[x.getSource(s),m.COUNTRY,t]]:[s]}function or(s){if(x.getRelation(s)!==m.COUNTRY)return[s];let e=`urn:r\xF3:country:${x.getTarget(s).toLowerCase().replace(/ /g,"-")}`;return[[x.getSource(s),x.getRelation(s),e]]}function ar(s,t){for(let e of Qe)if(x.getRelation(t)===e)return[[x.getSource(t),e,`${s}${x.getTarget(t)}`]];return[t]}function lr(s){let[t,e,r]=s;return[[typeof t=="string"&&t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,typeof r=="string"&&r.startsWith("::")?`urn:r\xF3:${r.slice(2)}`:r]]}function cr(s){let[t,e,r]=s;return[[t,R.camelCase(e),r]]}function dr(s){if(x.getRelation(s)!==m.CREATED_AT)return[s];let t=new Date(x.getTarget(s));if(isNaN(t.getTime()))return[s];let e=t.getUTCMonth()+1,r="Winter";return e>=3&&e<=5?r="Spring":e>=6&&e<=8?r="Summer":e>=9&&e<=11&&(r="Autumn"),[s,[x.getSource(s),m.SEASON,r]]}function hr(s){if(x.getRelation(s)!==m.CREATED_AT)return[s];let t=new Date(x.getTarget(s));if(isNaN(t.getTime()))return[s];let e=t.getUTCFullYear().toString();return[s,[x.getSource(s),m.YEAR,e]]}function pr(s){return x.getRelation(s)!==m.IN?[s]:[s,[x.getTarget(s),m.CONTAINS,x.getSource(s)]]}var Kr=await fetch(`/dist/css/photo-album.${window.envConfig.build_id}.css`),Jr=await Kr.text(),Xr={default:Jr},ur=de`${Lt(Xr.default)}`,P=class extends M{constructor(){super(...arguments);this.path="/#/album/"}broadcast(e,r){return()=>{let i=new CustomEvent(e,{detail:r,bubbles:!0,composed:!0});this.dispatchEvent(i)}}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.url})();let r=e.target.parentNode.querySelector(".thumbnail-placeholder");r.style.zIndex=-1}renderLink(){return l`
    `}renderPlaceholder(){if(this.mosaicColours){let e=U.encodeBitmapDataURL(this.mosaicColours);return l`
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${e}"/>
      `}return l``}renderImage(){return l`
    <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.onClick?.bind(this)}>
    `}static{this.styles=ur}render(){return performance.mark(`start-album-render-${this.url}`),l`
    <div class="photo-album">
      <a href="${this.path+this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`}};h([d()],P.prototype,"id",2),h([d()],P.prototype,"title",2),h([d()],P.prototype,"triples",2),h([d()],P.prototype,"url",2),h([d()],P.prototype,"mosaicColours",2),h([d()],P.prototype,"loading",2),h([d()],P.prototype,"path",2),h([d()],P.prototype,"onClick",2);var z=class extends ${static{this.styles=ur}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=globalThis.matchMedia("(max-width: 500px)");return pt.dateRange(this.minDate,this.maxDate,t.matches)}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:r}=W.details(this.triples,t),i=A(r);return l`<a href="#/thing/country:${i.id}" title=${t}>${e}</a>`})}render(){let t=this.count===1?"photo":"photos",e=this.renderCountries();return l`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`}};h([d()],z.prototype,"title",2),h([d()],z.prototype,"triples",2),h([d()],z.prototype,"minDate",2),h([d()],z.prototype,"maxDate",2),h([d()],z.prototype,"countries",2),h([d()],z.prototype,"count",2);customElements.define("photo-album",P);customElements.define("photo-album-metadata",z);var re=class extends ${constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(globalThis.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),r,i=[];for(let a=0;a<e.length;a++)if(e[a].position.top>globalThis.scrollY)if(r||(r=e[a].position.top,i.push(e[a])),e[a].position.top===r)i.push(e[a]);else break;let n=Math.min(...i.map(a=>a.minDate)),c=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&c!=="Invalid Date"&&(t.textContent=c)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(r=>{let i=r.getAttribute("data-min-date");return i?[{position:r.getBoundingClientRect(),minDate:parseInt(i,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),globalThis.addEventListener("scroll",this._onScroll,{passive:!0}),globalThis.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){globalThis.removeEventListener("scroll",this._onScroll),globalThis.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};h([d({type:Array})],re.prototype,"datesCache",2);customElements.define("year-cursor",re);var Et=class extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title="Albums - photos"}render(){performance.mark("start-albums-render");let t=i=>{let n=w(i.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:n.id,title:i.name},bubbles:!0,composed:!0}))},e=E.albumObjects(this.triples);async function*r(){let i=2e3,n=new Date().getFullYear();for(let o=0;o<e.length;o++){let c=e[o],a=U.loadingMode(o),p=new Date(c.minDate).getFullYear();p!==i&&(i=p,p!==n&&(yield l`<h2 class="album-year-heading">${p}</h2>`)),o%4===0&&await new Promise(g=>setTimeout(g,0));let f=l`
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
            ${f}
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${ht(r.bind(this)())}
    </section>
    `}};h([d({})],Et.prototype,"albums",2),h([d({state:!0})],Et.prototype,"triples",2);customElements.define("albums-page",Et);var _t=class extends ct{constructor(t){if(super(t),this.it=I,t.type!==dt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===I||t==null)return this._t=void 0,this.it=t;if(t===O)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};_t.directiveName="unsafeHTML",_t.resultType=1;var se=it(_t);var B=class extends ${render(){return l`
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
    `}};h([d()],B.prototype,"id",2),h([d()],B.prototype,"url",2),h([d()],B.prototype,"preload",2),h([d()],B.prototype,"urlPoster",2),h([d()],B.prototype,"urlUnscaled",2),h([d()],B.prototype,"url1080p",2),h([d()],B.prototype,"url720p",2),h([d()],B.prototype,"url480p",2);customElements.define("app-video",B);var ut=class extends ${async shareAlbum(t){if(!navigator.share){console.error("navigator.share not available");return}this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}render(){let t=this.shareAlbum.bind(this,this.url);return l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${t}>
        ${this.sharing?"[sharing...]":"[share]"}
      </button>
      `}};h([d()],ut.prototype,"title",2),h([d()],ut.prototype,"url",2),h([d({state:!0})],ut.prototype,"sharing",2);customElements.define("album-share-button",ut);var ie=class extends ${getId(){return S.parseUrn(this.urn)?.id??"unknown"}url(){return this.getId()?`https://whc.unesco.org/en/list/${this.getId()}`:null}render(){return this.getId()?l`
      <a class="unesco-link thing-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};h([d()],ie.prototype,"urn",2);customElements.define("unesco-link",ie);var At=class extends ${render(){let t=W.urnDetails(this.triples,this.urn),e=S.toURL(this.urn);return l`<a class="country-link" href="${e}">${t.flag} ${t.name}</a>`}};h([d()],At.prototype,"urn",2),h([d()],At.prototype,"triples",2);customElements.define("country-link",At);var Ut=class extends ${name(){let{type:t,id:e}=S.parseUrn(this.urn);if(st.has(t))return l`<span>${nt.toCommonName(this.triples,e)}</span>`;let r=this.triples.search({source:S.parseUrn(this.urn),relation:m.NAME}).firstTarget();return r?l`<span>${r}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=S.parseUrn(this.urn);return{[y.BIRD]:"bird-link",[y.MAMMAL]:"mammal-link",[y.REPTILE]:"reptile-link",[y.AMPHIBIAN]:"amphibian-link",[y.FISH]:"fish-link",[y.INSECT]:"insect-link"}[t]??""}render(){if(!S.isUrn(this.urn))return l`<span>Invalid URN</span>`;let t=S.toURL(this.urn);return S.is(this.urn,y.COUNTRY)?l`
        <country-link .triples=${this.triples} urn="${this.urn}"></country-link>
      `:l`
      <a class="thing-link ${this.linkClass()}" href="${t}">${this.name()}</a>
    `}};h([d()],Ut.prototype,"urn",2),h([d()],Ut.prototype,"triples",2);customElements.define("thing-link",Ut);var j=class extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title=`${this.title} - photos`}albumPhotos(t){let e=E.getAlbumPhotoSources(t,this.id);return Array.from(e).flatMap(r=>{let i=t.search({source:A(r)}).firstObject(!0);return i?[i]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"albumId",target:{id:this.id}}).sources();return Array.from(e).flatMap(r=>{let i=t.search({source:A(r)}).firstObject();return i?[i]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},r=this.albumPhotos(t);for(let n of[y.UNESCO])e[n]=Array.from(new Set(r.flatMap(o=>o[m.LOCATION]?.filter(c=>S.is(c,n))).filter(o=>o)));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])e[n]=Array.from(new Set(r.flatMap(o=>o[m.SUBJECT]?.filter(c=>S.is(c,n))).filter(o=>o)));let i=[];i=i.concat(e[y.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])i=i.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return i}render(){let t=this.triples,e=globalThis.matchMedia("(max-width: 500px)"),r=pt.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,p)=>l`
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
        ></app-video>`),c=this?.countries.split(",").map(a=>{let{flag:p,urn:f}=W.details(this.triples,a),g=A(f);return l`<span href="#/thing/country:${g.id}" title=${a}>${p}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${r}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${c}</p>
        <p class="photo-album-description">${se(this.description)}
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
    `}};h([d()],j.prototype,"title",2),h([d()],j.prototype,"id",2),h([d()],j.prototype,"minDate",2),h([d()],j.prototype,"maxDate",2),h([d()],j.prototype,"imageCount",2),h([d()],j.prototype,"description",2),h([d({state:!0})],j.prototype,"triples",2),h([d()],j.prototype,"countries",2);customElements.define("album-page",j);var mt=class extends ${handleError(t){t.includes("Shared canceled")||alert(t)}async shareImage(t){if(!navigator.share){this.handleError("navigator.share not available");return}this.sharing=!0;try{let e=await fetch(t);if(!e.ok){this.handleError(`failed to fetch image! status: ${e.status}`);return}let r=await e.blob(),n={files:[new File([r],"image.webp",{type:this.format})],title:"Sharing Image"};if(!navigator.canShare?.(n)){await navigator.share({title:"Sharing Image",url:this.url});return}await navigator.share(n)}catch(e){this.handleError("Error sharing image"+e)}finally{this.sharing=!1}}render(){return l`
    <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[${this.sharing?"sharing...":"share"}]</button>
    `}};h([d()],mt.prototype,"url",2),h([d()],mt.prototype,"format",2),h([d({state:!0})],mt.prototype,"sharing",2);customElements.define("share-metadata-button",mt);function gt(s){return l`<th class="exif-heading">${s}</th>`}var ot=class extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title="Metadata - photos"}renderAperture(t){return t.fStop==="Unknown"?l`<td>Unknown</td>`:t.fStop==="0.0"?l`<td>Manual aperture control</td>`:t.fStop?l`<td>ƒ/${t.fStop}</td>`:l`<td>Unknown</td>`}renderFocalLength(t){return t.focalLength==="Unknown"?l`${t.focalLength}`:t.focalLength==="0"?l`<td>Manual lens</td>`:t.focalLength?l`<td>${t.focalLength}mm</td>`:l`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(r=>l`<li>${this.renderSemanticValue.call(this,t,r)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${se(e??"")}`;if(S.isRating(e)){let r=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${r}"></thing-link>`}else{if(S.isUrn(e)&&S.is(e,y.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(S.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["birdBinomial","mammalBinomial","wildlife","livingConditions","pngUrl","cover","fStop"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,r)=>x.getRelation(e).localeCompare(x.getRelation(r))).filter(e=>!this.isIgnoredKey(x.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(x.getRelation(e))}</th>
              <td>${this.renderSemanticValue(x.getRelation(e),x.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?l`
      ${gt("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:l`
      ${gt("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?l`
        ${gt("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:l`
      ${gt("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutterSpeed=="number"?l`
        ${gt("Shutter Speed")}
        <td>1/${Math.round(1/t.shutterSpeed)}</td>`:l`
      ${gt("Shutter Speed")}
      <td>Unknown</td>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();if(!e)return l`<p>No EXIF data available</p>`;let r=new Date(parseInt(e.createdAt)),i={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},n=r.toLocaleDateString("en-US",i);return l`
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
    `}render(){let t=this.image,e=t.albumId,r=this.triples,i=r.search({source:{id:A(t.id).id},relation:{predicate:n=>{let o=new Set(["albumId","fullImage","mosaicColours","thumbnailUrl","midImageLossyUrl"]);return!Ye.has(n)&&!o.has(n)}}}).triples();return l`
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
      ${this.renderExif(r)}

    </section>
    `}};h([d()],ot.prototype,"id",2),h([d()],ot.prototype,"image",2),h([d({state:!0})],ot.prototype,"sharing",2),h([d({state:!0})],ot.prototype,"triples",2);customElements.define("metadata-page",ot);var Se=class extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title="About - photos"}render(){return l`
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
    `}};customElements.define("about-page",Se);var Y=class Y extends ${static{this.TYPE_VIEW={unesco:{title:"\u{1F3DB}\uFE0F Unesco World Heritage Sites",description:"Photos from some of the most outstanding places on earth."},country:{title:"\u{1F30D} Countries",description:"All photos are taken in some country..."}}}connectedCallback(){super.connectedCallback(),D.setIndex(),this.updatePageLocation()}updatePageLocation(){let t=E.getName(this.triples,this.urn);if(!t){document.title="Thing - photos";return}document.title=`${R.capitalise(t)} - photos`}isValidImage(t){return t&&t.thumbnailUrl}urnImages(t,e){let i=t.search(e).sources();return Array.from(i).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let c=t.search({source:w(n)}).firstObject();return this.isValidImage(c)?[c]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return this.isValidImage(o)?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,r)=>r.createdAt-e.createdAt).map((e,r)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?A(e.id).id:e.id}
        loading="${U.loadingMode(r)}"
        thumbnailUrl="${e.thumbnailUrl}"
        mosaicColours="${e.mosaicColours}"
        imageUrl="${e.fullImage}"></app-photo>`)}renderSubjectAlbums(t,e){let r=this.urnImages(t,e),i=new Set(r.map(o=>o.albumId)),n=o=>{let c=w(o.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:c.id,title:o.title??o.name},bubbles:!0,composed:!0}))};return Array.from(i).flatMap(o=>E.albumObjects(this.triples).filter(c=>A(c.id).id===o)).map(o=>{console.log(o);let c=l`
        <photo-album-metadata
            .triples=${this.triples}
            title="${o.name}"
            count="${o.photosCount}"
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
      `})}firstPhotographed(t,e){let i=this.urnImages(t,e).sort((n,o)=>n.createdAt-o.createdAt)[0];return i?new Date(parseInt(i.createdAt)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTypeTitle(t){let e=t.toLowerCase();return Y.TYPE_VIEW.hasOwnProperty(e)?Y.TYPE_VIEW[e].title:R.capitalise(t)}renderTypeDescription(t){let e=t.toLowerCase();return Y.TYPE_VIEW.hasOwnProperty(e)?Y.TYPE_VIEW[e].description:""}renderTitle(){let t=E.getName(this.triples,this.urn);if(t)return t;try{let e=S.parseUrn(this.urn),r=decodeURIComponent(e.id);if(e.id==="*")return this.renderTypeTitle(e.type);if(e.type===y.COUNTRY){let i=this.triples.search({source:e}).firstObject();return i?i.flag?`${i.flag} ${t}`:t:r}return st.has(e.type)?nt.toCommonName(this.triples,r):r}catch{return this.urn}}renderClassification(t){return l`<a href="#/listing/${t}">${R.capitalise(t)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let r=[];if(st.has(t.type))for(let i of["captivity","wild"]){let o={...t,qs:{context:i}};r.push({label:i,query:{target:o}})}else r.push({label:"default",query:{source:{type:"photo"},target:t}});return r}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,r])=>r?r.length===0?[]:e==="default"?[l`
        <div class="photo-group">
          ${r}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${R.capitalise(e)}</h4>
          ${r}
        </div>
      `]:[])}
    <div/>`}thingCountries(){let t=this.triples,e=S.parseUrn(this.urn);if(e.id==="*")return[];let i=[...t.search({source:{type:"photo"},target:{id:e.id,type:e.type}}).sources()].flatMap(n=>Array.from(t.search({source:w(n),relation:m.COUNTRY}).targets()));return Array.from(new Set(i))}renderPlacesIn(t,e){if(!e.in)return l``}renderPlacesContained(t,e){if(!e.contains)return l``}render(){let t=this.triples,e=S.parseUrn(this.urn),r=e.type,i=t.search({source:w(this.urn)}).firstObject()??{},n=Object.assign({Classification:this.renderClassification(r)});if(i.country&&(n.Country=l`<thing-link .triples=${this.triples} urn=${i.country}></thing-link>`),i.fcodeName){let _=i.fcodeName;n["Place Type"]=l`${R.capitalise(_)}`}i.in&&(Array.isArray(i.in)?n["Located In"]=l`
          <ul class="thing-list">
        ${i.in.map(_=>l`<li><thing-link .triples=${this.triples} urn=${_}></thing-link></li>`)}
          </ul>
        `:n["Located In"]=l`<thing-link .triples=${this.triples} urn=${i.in}></thing-link>`),st.has(r)&&(n["First Photographed"]=l`<span>${this.firstPhotographed(t,{target:w(this.urn)})}</span>`);let o=this.thingCountries();if(o.length>0&&r!==y.PLACE&&r!==y.COUNTRY){let _=o.map(L=>l`<country-link .triples=${this.triples} urn=${L}></country-link>`);n["Seen In"]=l`<ul>${_}</ul>`}if(i?.feature){Array.isArray(i.feature)||(i.feature=[i.feature]);let _=i.feature?.map(L=>l`<span><thing-link .triples=${this.triples} urn=${L}></thing-link></span>`);n["Place Details"]=l`${_}`}let c=i[m.WIKIPEDIA],a=i[m.BIRDWATCH_URL],p=Gt.getURL(t,this.urn),f=w(this.urn);f.id==="*"&&delete f.id;let g=this.getPhotoQueries(w(this.urn)),u={};for(let{query:_,label:L}of g){let at=this.urnImages(t,_);u[L]=this.renderSubjectPhotos(at)}let b={source:{type:"photo"},target:f},v=this.renderSubjectAlbums(t,b),C=this.renderPhotoSection(u);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        ${e.id==="*"?l`<p class="thing-description">${this.renderTypeDescription(r)}</p>`:l``}
          ${st.has(r)&&e.id!=="*"?l`<span class="thing-binomial ${r}-binomial">${nt.pretty(e.id)}</span>`:l``}
        </p>
        <br>

        ${c?l`<a href="${c}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${p?l`<span class="location">${p}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(n).map(([_,L])=>l`
          <tr>
            <th class="exif-heading">${_}</th>
            <td>${L}</td>
          </tr>
          `)}
        </table>

        ${this.renderPlacesIn(this.triples,i)}
        ${this.renderPlacesContained(this.triples,i)}

        <br>
        ${C}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${v}
        </section>

      </div>
    `}};h([d()],Y.prototype,"urn",2),h([d({state:!0})],Y.prototype,"triples",2);var Te=Y;customElements.define("thing-page",Te);var ne=class{static loadingMode(t){return t===0?"auto":"none"}};var oe=class extends ${connectedCallback(){super.connectedCallback(),D.setIndex(),document.title="Videos- photos"}render(){let t=E.videoObjects(this.triples);async function*e(){for(let r=0;r<t.length;r++){let i=t[r];r%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`<app-video
          id=${i.id}
          urlPoster=${i.posterUrl}
          urlUnscaled=${i.videoUrlUnscaled}
          url1080p=${i.videoUrl1080p}
          url720p=${i.videoUrl720p}
          url480p=${i.videoUrl480p}
          preload="${ne.loadingMode(r)}"
        ></app-video>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${ht(e())}
      </section>
    </div>
    `}};h([d({state:!0})],oe.prototype,"triples",2);customElements.define("videos-page",oe);var Ie=class{static chooseCoverImage(t,e,r){return t.search({source:{type:"photo"},relation:"cover",target:w(r)}).firstObject()?.id}static chooseBestImage(t,e,r){let n=t.search({source:{type:"photo"},target:w(r)}).sources();n||console.error("no photos found");let o=this.chooseCoverImage(t,e,r);if(o&&n.has(o))return o;let a=Array.from(n).map(p=>{let f=t.search({source:w(p),relation:"rating"}),g=Array.from(f.targets()).map(u=>decodeURIComponent(w(u).id).length);return{photo:p,rating:Math.max(...g)}}).sort((p,f)=>f.rating-p.rating)[0];return a||console.error("No photo found for",e,r),a?.photo}},G=class extends ${connectedCallback(){super.connectedCallback(),document.title="Listing - photos"}render(){let t=U.encodeBitmapDataURL(this.mosaicColours);return l`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `}};h([d({state:!0})],G.prototype,"triples",2),h([d()],G.prototype,"url",2),h([d()],G.prototype,"id",2),h([d()],G.prototype,"mosaicColours",2),h([d()],G.prototype,"count",2),h([d()],G.prototype,"loading",2);customElements.define("thing-album",G);var Ct=class extends ${getTitle(){return R.capitalise(this.id)}getThingAlbumTitle(t,e){let r=this.triples.search({source:w(t)}).firstObject();return r&&r.flag?`${e} ${r.flag}`:e}renderMetadata(t,e,r){let i=this.triples.search({source:w(e)}).firstObject();return i?l`
      <div class="thing-metadata">
        <p>${this.getThingAlbumTitle(e,r)}</p>
        ${i.wikipedia?l`<span><a href="${i.wikipedia}">[wiki]</a></span>`:""}

        ${i.birdwatchUrl?l`<span><a href="${i.birdwatchUrl}">[birdwatch]</a></span>`:""}
      </div>
    `:l`<div class="thing-metadata"><p>${r}</p></div>`}renderThingAlbum(t,e,r,i){let n=Ie.chooseBestImage(this.triples,t,e);if(!n)return console.error("No image found for",t,e),l``;let o=(f,g)=>{let{type:u,id:b}=w(f),v=new CustomEvent("click-thing-album",{detail:{id:`${u}:${b}`,name:g},bubbles:!0,composed:!0});this.dispatchEvent(v)},c=this.triples.search({source:w(n)}).firstObject(),a=w(this.id),p=`${a.type}:${a.id}`;return l`
      <photo-album
        .onClick=${o.bind(null,e,r)}
        .triples=${this.triples}
        title="${r}"
        url="${c.thumbnailUrl}"
        mosaicColours="${c.mosaicColours}"
        id=${p}
        path="#/thing/"
        loading=${U.loadingMode(i)}>
      ${this.renderMetadata(t,e,r)}
        </photo-album>
    `}render(){let t=this.triples,e=E.getDistinctNames(t,this.id);return l`
    <section class="album-metadata">
      <h1 class="albums-header">${this.getTitle()}s</h1>
      <a href="/#/thing/${this.id}:*">See all ${this.id} photos</a>
    </section>

    <section class="album-container">

      ${e.map((r,i)=>this.renderThingAlbum(this.id,r.id,r.name,i))}
    </section>
    `}};h([d()],Ct.prototype,"id",2),h([d({state:!0})],Ct.prototype,"triples",2);customElements.define("listing-page",Ct);function mr(s,t,e){return typeof e=="string"&&parseInt(e)>=0?void 0:`invalid relation ${t} for value ${e}`}function Q(s,t,e){return typeof e=="string"&&(e.startsWith("/")||e.startsWith("http"))?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Dt(s,t,e){return`${t} deprecated`}function T(s,t,e){}function gr(s,t,e){return typeof e=="string"&&/\d+/.test(e)?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function fr(s,t,e){return typeof e=="string"&&/^\d+$/.test(e)&&Number(e)>0?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Zr(s,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-180&&Number(e)<=180?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function ts(s,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-90&&Number(e)<=90?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function es(s,t,e){return typeof e=="string"&&e.startsWith("urn:r\xF3:country")?void 0:`invalid country value ${e}`}function rs(s,t,e){if(typeof e!="string")return`invalid rating value ${e}`;let r=decodeURIComponent(e);return r.match(/^⭐{0,5}$/)||r.match(/^urn:ró:rating:⭐{0,5}$/)?void 0:`invalid rating value ${e}`}var $r={living_conditions:Dt,mammal_binomial:Dt,plane_model:Dt,vehicle:Dt,videos_count:mr,photos_count:mr,height:gr,width:gr,max_date:fr,min_date:fr,png_url:Q,poster_url:Q,thumbnail_url:Q,video_url_1080p:Q,video_url_480p:Q,video_url_720p:Q,video_url_unscaled:Q,latitude:ts,longitude:Zr,full_image:Q,country:es,rating:rs,flag:T,album_id:T,bird_binomial:Dt,birdwatch_url:T,created_at:T,curie:T,description:T,exposure_time:T,fcode:T,fcode_name:T,flags:T,focal_length:T,f_stop:T,iso:T,location:T,model:T,mosaic:T,mosaic_colours:T,name:T,style:T,subject:T,summary:T,wikidata:T,wikipedia:T,wildlife:T};function br(s){let t=[cr,lr,ir,or,nr,ar.bind(null,"https://photos-cdn.rgrannell.xyz"),we.bind(null,xe),pr,dr,hr],e=[s];for(let r of t)e=e.flatMap(r);return e}var ss=new zt,k=class k extends ${static{this.DEFAULT_PAGE="albums"}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,globalThis.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new ze([],$r));for await(let e of ss.stream())t.push(...[e].flatMap(br)),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),globalThis.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=N.getUrl();N.isPage(t?.type)?this.page=t.type:(console.error("did not match pagetype",t?.type),this.page=k.DEFAULT_PAGE),N.pageUsesId(this.page)&&typeof t.id=="string"&&(this.id=t.id),this.qs=t.qs}receiveClickAlbum(t){let{title:e,id:r}=t.detail;this.page="photos",this.id=r,this.title=e,N.showAlbumUrl(r)}receiveClickThingAlbum(t){let{title:e,id:r}=t.detail;this.page="thing",this.id=r,this.title=e,N.showThingUrl(r,this.tribbleDB)}receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}receiveClickPhotoMetadata(t){let{id:e,imageUrl:r,thumbnailUrl:i}=t.detail;this.page="metadata",this.id=e,this.imageUrl=r,this.thumbnailUrl=i,N.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=N.router(this.page);e||console.error(`no router found for page ${this.page}`),N.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page==="about")return l`<about-page class="${e}"></about-page>`;if(this.page==="photos")return l`<photos-page
        .qs=${this.qs}
        .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page==="album"){this.id||console.error("no album id provided");let r=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return r||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .triples=${this.tribbleDB}
        title=${r.name}
        id=${this.id}
        minDate=${r.minDate}
        maxDate=${r.maxDate}
        imageCount=${r.photosCount}
        description=${r.description}
        countries=${r.flags}
        class="${e}"></album-page>
      `}if(this.page==="metadata"){let r=this.tribbleDB.search({source:{type:"photo",id:this.id}}).firstObject();return r||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${r}
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
        `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,r=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),r.push("dark-mode")):e.classList=[],l`
    <body>
      <div class="${r.join(" ")}"
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
    `}};h([d()],k.prototype,"title",2),h([d()],k.prototype,"page",2),h([d({state:!0})],k.prototype,"sidebarVisible",2),h([d()],k.prototype,"tribbleDB",2),h([d()],k.prototype,"darkMode",2),h([d()],k.prototype,"id",2),h([d()],k.prototype,"imageUrl",2),h([d()],k.prototype,"thumbnailUrl",2),h([d()],k.prototype,"route",2),h([d()],k.prototype,"params",2),h([d()],k.prototype,"query",2),h([d()],k.prototype,"qs",2);var Ee=k;customElements.define("photo-app",Ee);export{Ee as PhotoApp};
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
//# sourceMappingURL=app.691085d6e10cd8df.js.map
