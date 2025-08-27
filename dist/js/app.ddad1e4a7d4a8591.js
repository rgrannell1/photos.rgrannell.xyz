var Ke=Object.defineProperty;var Ye=Object.getOwnPropertyDescriptor;var d=(i,t,e,s)=>{for(var r=s>1?void 0:s?Ye(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Ke(t,e,r),r};var yt=globalThis,wt=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),ae=new WeakMap,_t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(wt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ae.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(e,t))}return t}toString(){return this.cssText}},ce=i=>new _t(typeof i=="string"?i:i+"",void 0,le);var he=(i,t)=>{if(wt)i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let s=document.createElement("style"),r=yt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Qt=wt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ce(e)})(i):i;var{is:Je,defineProperty:Xe,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:ts,getOwnPropertySymbols:es,getPrototypeOf:ss}=Object,xt=globalThis,de=xt.trustedTypes,rs=de?de.emptyScript:"",is=xt.reactiveElementPolyfillSupport,lt=(i,t)=>i,ct={toAttribute(i,t){switch(t){case Boolean:i=i?rs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},vt=(i,t)=>!Je(i,t),pe={attribute:!0,type:String,converter:ct,reflect:!1,useDefault:!1,hasChanged:vt};Symbol.metadata??=Symbol("metadata"),xt.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=pe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Xe(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=Ze(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let h=r?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pe}static _$Ei(){if(this.hasOwnProperty(lt("elementProperties")))return;let t=ss(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(lt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lt("properties"))){let e=this.properties,s=[...ts(e),...es(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Qt(r))}else t!==void 0&&e.push(Qt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:ct).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ct;this._$Em=r;let h=o.fromAttribute(e,n.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let r=this.constructor,n=this[t];if(s??=r.getPropertyOptions(t),!((s.hasChanged??vt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:o}=n,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[lt("elementProperties")]=new Map,L[lt("finalized")]=new Map,is?.({ReactiveElement:L}),(xt.reactiveElementVersions??=[]).push("2.1.1");var Yt=globalThis,St=Yt.trustedTypes,ue=St?St.createPolicy("lit-html",{createHTML:i=>i}):void 0,Jt="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Xt="?"+N,ns=`<${Xt}>`,z=document,dt=()=>z.createComment(""),pt=i=>i===null||typeof i!="object"&&typeof i!="function",Zt=Array.isArray,ye=i=>Zt(i)||typeof i?.[Symbol.iterator]=="function",Kt=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,ge=/>/g,V=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,$e=/"/g,_e=/^(?:script|style|textarea|title)$/i,te=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=te(1),As=te(2),Us=te(3),U=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),be=new WeakMap,F=z.createTreeWalker(z,129);function we(i,t){if(!Zt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(t):t}var xe=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":t===3?"<math>":"",o=ht;for(let h=0;h<e;h++){let a=i[h],p,m,u=-1,f=0;for(;f<a.length&&(o.lastIndex=f,m=o.exec(a),m!==null);)f=o.lastIndex,o===ht?m[1]==="!--"?o=me:m[1]!==void 0?o=ge:m[2]!==void 0?(_e.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=V):m[3]!==void 0&&(o=V):o===V?m[0]===">"?(o=r??ht,u=-1):m[1]===void 0?u=-2:(u=o.lastIndex-m[2].length,p=m[1],o=m[3]===void 0?V:m[3]==='"'?$e:fe):o===$e||o===fe?o=V:o===me||o===ge?o=ht:(o=V,r=void 0);let $=o===V&&i[h+1].startsWith("/>")?" ":"";n+=o===ht?a+ns:u>=0?(s.push(p),a.slice(0,u)+Jt+a.slice(u)+N+$):a+N+(u===-2?h:$)}return[we(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},ut=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[p,m]=xe(t,e);if(this.el=i.createElement(p,s),F.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=F.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(Jt)){let f=m[o++],$=r.getAttribute(u).split(N),S=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:S[2],strings:$,ctor:S[1]==="."?Et:S[1]==="?"?Ct:S[1]==="@"?At:G}),r.removeAttribute(u)}else u.startsWith(N)&&(a.push({type:6,index:n}),r.removeAttribute(u));if(_e.test(r.tagName)){let u=r.textContent.split(N),f=u.length-1;if(f>0){r.textContent=St?St.emptyScript:"";for(let $=0;$<f;$++)r.append(u[$],dt()),F.nextNode(),a.push({type:2,index:++n});r.append(u[f],dt())}}}else if(r.nodeType===8)if(r.data===Xt)a.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(N,u+1))!==-1;)a.push({type:7,index:n}),u+=N.length-1}n++}}static createElement(t,e){let s=z.createElement("template");return s.innerHTML=t,s}};function W(i,t,e=i,s){if(t===U)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,n=pt(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=W(i,r._$AS(i,t.values),r,s)),t}var It=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??z).importNode(e,!0);F.currentNode=r;let n=F.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new Z(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Ut(n,this,t)),this._$AV.push(p),a=s[++h]}o!==a?.index&&(n=F.nextNode(),o++)}return F.currentNode=z,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Z=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),pt(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==U&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ye(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==x&&pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ut.createElement(we(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new It(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=be.get(t.strings);return e===void 0&&be.set(t.strings,e=new ut(t)),e}k(t){Zt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new i(this.O(dt()),this.O(dt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=x}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=W(this,t,e,0),o=!pt(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{let h=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=W(this,h[s+a],e,a),p===U&&(p=this._$AH[a]),o||=!pt(p)||p!==this._$AH[a],p===x?t=x:t!==x&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!r&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Et=class extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},Ct=class extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}},At=class extends G{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??x)===U)return;let s=this._$AH,r=t===x&&s!==x||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==x&&(s===x||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ut=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}},ve={M:Jt,P:N,A:Xt,C:1,L:xe,R:It,D:ye,V:W,I:Z,H:G,N:Ct,U:At,B:Et,F:Ut},os=Yt.litHtmlPolyfillSupport;os?.(ut,Z),(Yt.litHtmlVersions??=[]).push("3.3.1");var Se=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new Z(t.insertBefore(dt(),n),n,void 0,e??{})}return r._$AI(i),r};var ee=globalThis,R=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Se(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};R._$litElement$=!0,R.finalized=!0,ee.litElementHydrateSupport?.({LitElement:R});var as=ee.litElementPolyfillSupport;as?.({LitElement:R});(ee.litElementVersions??=[]).push("4.2.1");var g=class extends R{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Ie=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(i){return this.#e.has(i)?this.#e.get(i):(this.#e.set(i,this.#t),this.#s.set(this.#t,i),this.#t++,this.#t-1)}setIndex(i,t){this.#e.set(i,t),this.#s.set(t,i)}getIndex(i){return this.#e.get(i)}getValue(i){return this.#s.get(i)}has(i){return this.#e.has(i)}},Ee=class{static intersection(i,t){if(t.length===0)return new Set;t.sort((s,r)=>s.size-r.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let r=t[s];for(let n of e)i.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},Ce=class{stringIndex;constructor(){this.stringIndex=new Ie}parseTriple(i){let t=i.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${i}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),s=this.stringIndex.getValue(parseInt(t[2],10)),r=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||s===void 0||r===void 0)throw new SyntaxError(`Invalid triple reference: ${i}`);return[e,s,r]}parseDeclaration(i){let t=i.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${i}`);let e=t[1],s=t[2];this.stringIndex.setIndex(s,parseInt(e,10))}parse(i){if(/^(\d+)\s(\d+)\s(\d+)$/.test(i))return this.parseTriple(i);this.parseDeclaration(i)}};function v(i,t="r\xF3"){if(!i.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${i}`);let e=i.split(":")[2],[s,r]=i.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function I(i,t="r\xF3"){try{return v(i,t)}catch{return{type:"unknown",id:i,qs:{}}}}var ls=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},cs=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},hs=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(i){this.indexedTriples=[],this.stringIndex=new Ie,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(i),this.metrics=new ls}add(i){let t=this.indexedTriples.length;for(let e=0;e<i.length;e++){let s=t+e,r=i[e],n=this.stringUrn.has(r[0])?this.stringUrn.get(r[0]):this.stringUrn.set(r[0],I(r[0])).get(r[0]),o=r[1],h=this.stringUrn.has(r[2])?this.stringUrn.get(r[2]):this.stringUrn.set(r[2],I(r[2])).get(r[2]),a=this.stringIndex.add(n.type),p=this.stringIndex.add(n.id),m=this.stringIndex.add(o),u=this.stringIndex.add(h.type),f=this.stringIndex.add(h.id);this.indexedTriples.push([this.stringIndex.add(r[0]),m,this.stringIndex.add(r[2])]),this.sourceType.has(a)||this.sourceType.set(a,new Set),this.sourceType.get(a).add(s),this.sourceId.has(p)||this.sourceId.set(p,new Set),this.sourceId.get(p).add(s);for(let[$,S]of Object.entries(n.qs)){let T=this.stringIndex.add(`${$}=${S}`);this.sourceQs.has(T)||this.sourceQs.set(T,new Set),this.sourceQs.get(T).add(s)}this.relations.has(m)||this.relations.set(m,new Set),this.relations.get(m).add(s),this.targetType.has(u)||this.targetType.set(u,new Set),this.targetType.get(u).add(s),this.targetId.has(f)||this.targetId.set(f,new Set),this.targetId.get(f).add(s);for(let[$,S]of Object.entries(h.qs)){let T=this.stringIndex.add(`${$}=${S}`);this.targetQs.has(T)||this.targetQs.set(T,new Set),this.targetQs.get(T).add(s)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([i,t,e])=>[this.stringIndex.getValue(i),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(i){if(i<0||i>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[i];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(i){if(!(i<0||i>=this.indexedTriples.length))return this.indexedTriples[i]}getSourceTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},P=class{static source(i){return i[0]}static relation(i){return i[1]}static target(i){return i[2]}};function ds(i,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let r=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let p=t.rows[a][2];r.has(p)||r.set(p,[]),r.get(p).push(a)}for(let a=0;a<e.rows.length;a++){let p=e.rows[a][0];n.has(p)||n.set(p,[]),n.get(p).push(a)}let o=Ee.intersection(i,[new Set(r.keys()),new Set(n.keys())]),h=[];for(let a of o){let p=n.get(a),m=r.get(a);for(let u of p)for(let f of m){let $=t.rows[u].concat(e.rows[f]);h.push($)}}return{names:s,rows:h}}var Ae=class Q{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new hs(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new cs;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}clone(){let t=new Q([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new Q(t)}static from(t){let e=[];for(let s of t){let{id:r,...n}=s;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,h]of Object.entries(n))if(Array.isArray(h))for(let a of h)e.push([r,o,a]);else e.push([r,o,h])}return new Q(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new Q(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new Q(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?P.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?P.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?P.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(P.source))}relations(){return new Set(this.index.triples().map(P.relation))}targets(){return new Set(this.index.triples().map(P.target))}objects(t=!1){let e=[];for(let[s,r]of Object.entries(this.object(t)))r.id=s,e.push(r);return e}object(t=!1){let e={};for(let[s,r,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][r]?Array.isArray(e[s][r])?e[s][r].push(n):e[s][r]=[e[s][r],n]:e[s][r]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:r,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let p of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,p)&&!o.includes(p))throw new Error(`Unexpected search parameter: ${p}`);if(s){if(s.type){let p=this.index.getSourceTypeSet(s.type);if(p)e.push(p);else return new Set}if(s.id){let p=this.index.getSourceIdSet(s.id);if(p)e.push(p);else return new Set}if(s.qs)for(let[p,m]of Object.entries(s.qs)){let u=this.index.getSourceQsSet(p,m);if(u)e.push(u);else return new Set}}if(n){if(n.type){let p=this.index.getTargetTypeSet(n.type);if(p)e.push(p);else return new Set}if(n.id){let p=this.index.getTargetIdSet(n.id);if(p)e.push(p);else return new Set}if(n.qs)for(let[p,m]of Object.entries(n.qs)){let u=this.index.getTargetQsSet(p,m);if(u)e.push(u);else return new Set}}if(r){let p=typeof r=="string"?{relation:[r]}:r;if(p.relation){let m=new Set;for(let u of p.relation){let f=this.index.getRelationSet(u);if(f)for(let $ of f)m.add($)}if(m.size>0)e.push(m);else return new Set}}let h=Ee.intersection(this.metrics,e),a=new Set;for(let p of h){let m=this.index.getTriple(p);if(!s?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){a.add(p);continue}let u=!0;s?.predicate&&(u=u&&s.predicate(P.source(m))),n?.predicate&&(u=u&&n.predicate(P.target(m))),typeof r=="object"&&r.predicate&&(u=u&&r.predicate(P.relation(m))),u&&a.add(p)}return a}search(t){let e=[];for(let s of this.#t(t)){let r=this.index.getTriple(s);r&&e.push(r)}return new Q(e)}search2(t){let e=Object.entries(t),s=[];for(let h=0;h<e.length-2;h+=2){let a=e.slice(h,h+3),p={source:a[0][1],relation:a[1][1],target:a[2][1]},m=a.map($=>$[0]),u=this.#t(p),f=Array.from(u).flatMap($=>{let S=this.index.getTripleIndices($);return typeof S>"u"?[]:[S]});s.push({names:m,rows:f})}let r=s.reduce(ds.bind(this,this.metrics)),n=r.names,o=[];for(let h of r.rows){let a={};for(let p=0;p<n.length;p++){let m=n[p];a[m]=this.index.stringIndex.getValue(h[p])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var ps=window.envConfig,Tt=class{constructor(t=`/manifest/tribbles.${ps.publication_id}.txt`){this.url=t}async*stream(){let t=new Ce,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let s=new TextDecoderStream,r=e.body.pipeThrough(s).getReader(),n="";for(;;){let{value:o,done:h}=await r.read();if(h)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let p of a){let m=t.parse(p);m!==void 0&&(yield m)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var Ue="photos";var Te={photos:"photos",albums:"albums",album:"album",metadata:"metadata",about:"about",videos:"videos",thing:"thing",listing:"listing"},b=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},y=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia";static CREATED_AT="created_at";static F_STOP="f_stop";static FOCAL_LENGTH="focal_length";static MODEL="model";static EXPOSURE_TIME="exposure_time";static ISO="iso";static WIDTH="width";static HEIGHT="height"},Re=new Set(["created_at","f_stop","focal_length","model","exposure_time","iso","width","height"]),K=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var M=class i{static{this.ROUTES={photos:this.showPhotosUrl,albums:this.showAlbumsUrl,album:this.showAlbumUrl,metadata:this.showMetadataUrl,about:this.showAboutUrl,videos:this.showVideosUrl,thing:this.showThingUrl,listing:this.showListingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":"albums","#/album":"album","#/metadata":"metadata","#/about":"about","#/videos":"videos","#/thing":"thing","#/photos":"photos","#/listing":"listing"}}static{this.ID_PAGES=new Set(["album","metadata","thing","listing"])}static isPage(t){return t in Te}static router(t){if(i.isPage(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return i.isPage(t)&&i.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static showListingUrl(t){window.location.hash=`#/listing/${t}`,document.title="Listing - photos"}static getUrl(){let t=window.location.hash;for(let[e,s]of Object.entries(i.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let r={type:s};return i.ID_PAGES.has(s)&&(r.id=t.split("/")[2]),r}return{type:"albums"}}};var us={attribute:!0,type:String,converter:ct,reflect:!1,hasChanged:vt},ms=(i=us,t,e)=>{let{kind:s,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),s==="accessor"){let{name:o}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,i)},init(h){return h!==void 0&&this.C(o,void 0,i,h),h}}}if(s==="setter"){let{name:o}=e;return function(h){let a=this[o];t.call(this,h),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+s)};function c(i){return(t,e)=>typeof e=="object"?ms(i,t,e):((s,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,t,e)}var Dt=class extends g{render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};d([c({type:Boolean,state:!0})],Dt.prototype,"visible",2);customElements.define("photo-sidebar",Dt);var kt=class extends g{constructor(){super(...arguments);this.darkMode=!1}feedUrl(){return"/manifest/atom/atom-index.xml"}renderRss(){return l`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `}render(){let e=this.darkMode?"\u2600\uFE0F":"\u{1F319}",s=Ue;return l`
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
    `}};d([c()],kt.prototype,"darkMode",2);customElements.define("photo-header",kt);var et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Y=i=>(...t)=>({_$litDirective$:i,values:t}),tt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:gs}=ve;var ke=i=>i.strings===void 0,De=()=>document.createComment(""),Me=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(De(),r),o=s.insertBefore(De(),r);e=new gs(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let p=a.nextSibling;s.insertBefore(a,r),a=p}}}return e},Oe=(i,t,e=i)=>(i._$AI(t,e),i);var Le=i=>{i._$AR()};var mt=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),mt(s,t);return!0},Mt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ne=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),bs(t)}};function fs(i){this._$AN!==void 0?(Mt(this),this._$AM=i,Ne(this)):this._$AM=i}function $s(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)mt(s[n],!1),Mt(s[n]);else s!=null&&(mt(s,!1),Mt(s));else mt(this,i)}var bs=i=>{i.type==et.CHILD&&(i._$AP??=$s,i._$AQ??=fs)},Ot=class extends tt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ne(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(mt(this,t),Mt(this))}setValue(t){if(ke(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Pe=async(i,t)=>{for await(let e of i)if(await t(e)===!1)return},Lt=class{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}},Nt=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((t=>this.Z=t))}resume(){this.Z?.(),this.Y=this.Z=void 0}};var gt=class extends Ot{constructor(){super(...arguments),this._$CK=new Lt(this),this._$CX=new Nt}render(t,e){return U}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this._$CJ)return U;this._$CJ=e;let r=0,{_$CK:n,_$CX:o}=this;return Pe(e,(async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a._$CJ!==e)return!1;s!==void 0&&(h=s(h,r)),a.commitValue(h,r),r++}return!0})),U}commitValue(t,e){this.setValue(t)}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},ii=Y(gt);var st=Y(class extends gt{constructor(i){if(super(i),i.type!==et.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this._$Ctt=i,super.update(i,t)}commitValue(i,t){t===0&&Le(this._$Ctt);let e=Me(this._$Ctt);Oe(e,i)}});var Pt=new Map,E=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Pt.has(t))return Pt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");if(!r){console.error("context missing, cannot render colours");return}return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Pt.set(t,s.toDataURL("image/png")),Pt.get(t)}};var j=class extends g{constructor(){super(...arguments);this.loading="eager"}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let s=e.target?.parentNode?.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let e=this.id.startsWith("urn:")?v(this.id).id:this.id,s={id:e,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:E.encodeBitmapDataURL(this.mosaicColours)},r=document.createElement("div");r.innerHTML=this.summary??"";let n=r.textContent??r.innerText??"";return l`
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
    `}};d([c()],j.prototype,"id",2),d([c()],j.prototype,"imageUrl",2),d([c()],j.prototype,"thumbnailUrl",2),d([c()],j.prototype,"mosaicColours",2),d([c()],j.prototype,"summary",2),d([c()],j.prototype,"loading",2);customElements.define("app-photo",j);var C=class{static getElement(){return document.getElementById("rss")}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var jt=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}allImages(){return this.triples.search({source:{type:"photo"},relation:{relation:["thumbnail_url","mosaic_colours","full_image"]},target:{type:"unknown"}}).objects().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`
          <app-photo
            id=${I(r.id).id}
            loading="${E.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${st(e())}
      </section>
    </div>
    `}};d([c({state:!0})],jt.prototype,"triples",2);customElements.define("photos-page",jt);var se=class extends g{render(){let t=document.getElementById("stats-data");if(!t)return console.error("No stats data found"),l``;let e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${e.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",se);var rt=class{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),p=r.toLocaleDateString("en-IE",{day:"numeric"}),m=n.toLocaleDateString("en-IE",{day:"numeric"}),u=r.toLocaleDateString("en-IE",{month:"short"}),f=n.toLocaleDateString("en-IE",{month:"short"}),$=r.getFullYear(),S=n.getFullYear(),T=u===f,Wt=$===S;return h===a?`${h} ${$}`:T&&Wt?`${p} - ${m} ${f} ${$}`:`${h} ${$} - ${a} ${S}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var ys=window.envConfig,_=class{static isUrnSource(t){return w.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return w.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},w=class i{static isUrn(t){return typeof t=="string"&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},J=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:y.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=v(e);return t.search({source:{id:s},relation:y.BIRDWATCH_URL}).firstTarget()}},it=class{static details(t,e){let s=t.search({source:{type:"country"},relation:{relation:[y.NAME,y.FLAG]}}),r=s.search({relation:y.NAME,target:{id:e}}).firstSource(),n=v(r),o=s.search({source:n,relation:y.FLAG}).firstTarget();return{urn:r,name:e,flag:o}}static urnDetails(t,e){let s=v(e),r=t.search({source:{type:"country",id:s.id},relation:y.NAME}).firstTarget();return{urn:e,name:r}}};function He(i){return _.getRelation(i)!==y.RATING?[i]:[[_.getSource(i),_.getRelation(i),`urn:r\xF3:rating:${encodeURIComponent(_.getTarget(i))}`]]}function qe(i){if(_.getRelation(i)!==y.COUNTRY)return[i];let e=`urn:r\xF3:country:${_.getTarget(i).toLowerCase().replace(" ","-")}`;return[[_.getSource(i),_.getRelation(i),e]]}var je=/^\[([^\:]*):(.*)\]$/;function Be(i,t){if(typeof t!="string"||!je.test(t))return t;let e=t.match(je);if(!e)return t;let s=e[1],r=e[2];return i[s]?`${i[s]}${r}`:t}function Ve(i,t){let[e,s,r]=t;return[[Be(i,e),s,Be(i,r)]]}function Fe(i){for(let t of["thumbnail_url","full_image","poster_url","video_url_1080p","video_url_480p","video_url_720p","video_url_unscaled"])if(_.getRelation(i)===t)return[[_.getSource(i),t,`${ys.photos_url}${_.getTarget(i)}`]];return[i]}function ze(i){return _.getRelation(i)!==y.BIRDWATCH_URL?[i]:[[_.getSource(i),y.BIRDWATCH_URL,`https://birdwatchireland.ie/birds/${_.getTarget(i)}`]]}function We(i){let[t,e,s]=i;return[[t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,s.startsWith("::")?`urn:r\xF3:${s.slice(2)}`:s]]}var O=class extends R{constructor(){super(...arguments);this.path="/#/album/"}broadcast(e,s){return()=>{let r=new CustomEvent(e,{detail:s,bubbles:!0,composed:!0});this.dispatchEvent(r)}}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.url})();let s=e.target.parentNode.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}renderLink(){return l`
    `}renderPlaceholder(){if(this.mosaicColours){let e=E.encodeBitmapDataURL(this.mosaicColours);return l`
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${e}"/>
      `}return l``}renderImage(){let e=v(this.id);return l`
    <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.broadcast("click-album",{id:e.id,title:this.title})}>
    `}render(){return performance.mark(`start-album-render-${this.url}`),l`
    <link rel="stylesheet" href="/dist/css/style.${window.envConfig.build_id}.css">
    <div class="photo-album">
      <a href="${this.path+this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`}};d([c()],O.prototype,"id",2),d([c()],O.prototype,"title",2),d([c()],O.prototype,"triples",2),d([c()],O.prototype,"url",2),d([c()],O.prototype,"mosaicColours",2),d([c()],O.prototype,"loading",2),d([c()],O.prototype,"path",2);var B=class extends g{dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return rt.dateRange(this.minDate,this.maxDate,t.matches)}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=it.details(this.triples,t),r=v(s);return l`<a href="#/thing/country:${r.id}" title=${t}>${e}</a>`})}render(){let t=this.count===1?"photo":"photos",e=this.renderCountries();return l`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`}};d([c()],B.prototype,"title",2),d([c()],B.prototype,"triples",2),d([c()],B.prototype,"minDate",2),d([c()],B.prototype,"maxDate",2),d([c()],B.prototype,"countries",2),d([c()],B.prototype,"count",2);customElements.define("photo-album",O);customElements.define("photo-album-metadata",B);var Bt=class extends g{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,r=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,r.push(e[a])),e[a].position.top===s)r.push(e[a]);else break;let n=Math.min(...r.map(a=>a.minDate)),h=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&h!=="Invalid Date"&&(t.textContent=h)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let r=s.getAttribute("data-min-date");return r?[{position:s.getBoundingClientRect(),minDate:parseInt(r,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};d([c({type:Array})],Bt.prototype,"datesCache",2);customElements.define("year-cursor",Bt);var ft=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}getAlbums(){return this.triples.search({source:{type:"album"}}).objects().map(t=>({title:t.name,minDate:parseInt(t.min_date),maxDate:parseInt(t.max_date),url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:t.photos_count,flags:t.flags}))}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){let s=2e3,r=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],h=E.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==s&&(s=a,a!==r&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),n%4===0&&await new Promise(m=>setTimeout(m,0));let p=l`
        <photo-album-metadata
          .triples=${this.triples}
            title="${o.title}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
            count="${o.count}"
        ></photo-album-metadata>`;yield l`
          <photo-album
            .triples=${this.triples}
            title="${o.title}"
            url="${o.url}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}"
            loading=${h}>
            ${p}
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${st(e.bind(this)())}
    </section>
    `}};d([c({})],ft.prototype,"albums",2),d([c({state:!0})],ft.prototype,"triples",2);customElements.define("albums-page",ft);var $t=class extends tt{constructor(t){if(super(t),this.it=x,t.type!==et.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===x||t==null)return this._t=void 0,this.it=t;if(t===U)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};$t.directiveName="unsafeHTML",$t.resultType=1;var Ht=Y($t);var D=class extends g{render(){return l`
    <div>
      <video controls class="thumbnail-video" preload="${this.preload}" poster=${this.url_poster}>
        <source src="${this.url_480p}" type="video/mp4">
      </video>
      <ul>
        <a href="${this.url_unscaled}">[L]</a>
        <a href="${this.url_1080p}">[M]</a>
        <a href="${this.url_720p}">[S]</a>
        <a href="${this.url_480p}">[XS]</a>
      </ul>

    </div>
    `}};d([c()],D.prototype,"id",2),d([c()],D.prototype,"url",2),d([c()],D.prototype,"preload",2),d([c()],D.prototype,"url_poster",2),d([c()],D.prototype,"url_unscaled",2),d([c()],D.prototype,"url_1080p",2),d([c()],D.prototype,"url_720p",2),d([c()],D.prototype,"url_480p",2);customElements.define("app-video",D);var nt=class extends g{async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};d([c()],nt.prototype,"title",2),d([c()],nt.prototype,"url",2),d([c({state:!0})],nt.prototype,"sharing",2);customElements.define("album-share-button",nt);var qt=class extends g{getId(){return w.parseUrn(this.urn)?.id??"unknown"}url(){return this.getId()?`https://whc.unesco.org/en/list/${this.getId()}`:null}render(){return this.getId()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};d([c()],qt.prototype,"urn",2);customElements.define("unesco-link",qt);var re=class extends g{static{this.properties={urn:{type:String},triples:{type:Object}}}name(){let{type:t,id:e}=w.parseUrn(this.urn);if(K.has(t))return l`<span>${J.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:w.parseUrn(this.urn),relation:y.NAME}).firstTarget();return s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=w.parseUrn(this.urn);return{[b.BIRD]:"bird-link",[b.MAMMAL]:"mammal-link",[b.REPTILE]:"reptile-link",[b.AMPHIBIAN]:"amphibian-link",[b.FISH]:"fish-link",[b.INSECT]:"insect-link"}[t]??""}render(){return w.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${w.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",re);var k=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}albumPhotos(t){let e=t.search({source:{type:"photo"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let r=t.search({source:v(s)}).firstObject(!0);return r?[r]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let r=t.search({source:v(s)}).firstObject();return r?[r]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[b.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o[y.LOCATION]?.filter(h=>w.is(h,n))).filter(o=>o)));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o[y.SUBJECT]?.filter(h=>w.is(h,n))).filter(o=>o)));let r=[];r=r.concat(e[b.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=rt.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,p)=>l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${E.loadingMode(p)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos(t).map((a,p)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),h=this?.countries.split(",").map(a=>{let{flag:p,urn:m}=it.details(this.triples,a),u=v(m);return l`<span href="#/thing/country:${u.id}" title=${a}>${p}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${h}</p>
        <p class="photo-album-description">${Ht(this.description)}
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
    `}};d([c()],k.prototype,"title",2),d([c()],k.prototype,"id",2),d([c()],k.prototype,"minDate",2),d([c()],k.prototype,"maxDate",2),d([c()],k.prototype,"imageCount",2),d([c()],k.prototype,"description",2),d([c({state:!0})],k.prototype,"triples",2),d([c()],k.prototype,"countries",2);customElements.define("album-page",k);var ot=class extends g{async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};d([c()],ot.prototype,"url",2),d([c()],ot.prototype,"format",2),d([c({state:!0})],ot.prototype,"sharing",2);customElements.define("share-metadata-button",ot);function at(i){return l`<th class="exif-heading">${i}</th>`}var X=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:t.f_stop?l`<td>ƒ/${t.f_stop}</td>`:l`<td>Unknown</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:t.focal_length?l`<td>${t.focal_length}mm equiv.</td>`:l`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${Ht(e??"")}`;if(w.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(w.isUrn(e)&&w.is(e,b.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(w.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>_.getRelation(e).localeCompare(_.getRelation(s))).filter(e=>!this.isIgnoredKey(_.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(_.getRelation(e))}</th>
              <td>${this.renderSemanticValue(_.getRelation(e),_.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?l`
      ${at("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:l`
      ${at("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?l`
        ${at("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:l`
      ${at("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutter_speed=="number"?l`
        ${at("Shutter Speed")}
        <td>1/${Math.round(1/t.shutter_speed)}</td>`:l`
      ${at("Shutter Speed")}
      <td>Unknown</td>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();if(!e)return l`<p>No EXIF data available</p>`;let s=new Date(parseInt(e.created_at)),r={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},n=s.toLocaleDateString("en-US",r);return l`
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
    `}render(){let t=this.image,e=t.album_id,s=this.triples,r=s.search({source:{id:v(t.id).id},relation:{predicate:n=>{let o=new Set(["album_id","full_image","mosaic_colours","thumbnail_url"]);return!Re.has(n)&&!o.has(n)}}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(r)}
      ${this.renderExif(s)}

    </section>
    `}};d([c()],X.prototype,"id",2),d([c()],X.prototype,"image",2),d([c({state:!0})],X.prototype,"sharing",2),d([c({state:!0})],X.prototype,"triples",2);customElements.define("metadata-page",X);var ie=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}render(){return l`
    <div>
      <section class="about-page">
        <h1>About</h1>

        <h2>Can I use the photos on this site?</h2>

        <p>You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not.</p>

        <h2>Can I use data from this site to train AI?</h2>

        <p>No, absolutely not. The <a href="http://photos.rgrannell.xyz/robots.txt">robots.txt</a> file for this site explicitly prohibits this.</p>

        <h2>What is your contact information?</h2>

        <p>See <a href="https://rgrannell.xyz/">my personal site</a> for contact details.</p>

        </section>
    </div>
    `}};customElements.define("about-page",ie);var bt=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}isValidImage(t){return t&&t.thumbnail_url}urnImages(t,e){let r=t.search(e).sources();return Array.from(r).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let h=t.search({source:I(n)}).firstObject();return this.isValidImage(h)?[h]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return this.isValidImage(o)?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,s)=>s.created_at-e.created_at).map((e,s)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?v(e.id).id:e.id}
        loading="${E.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        mosaicColours="${e.mosaic_colours}"
        imageUrl="${e.full_image}"></app-photo>`)}getAlbums(){return this.triples.search({source:{type:"album"}}).objects()}renderSubjectAlbums(t,e){let s=this.urnImages(t,e),r=new Set(s.map(n=>n.album_id));return Array.from(r).flatMap(n=>this.getAlbums().filter(o=>v(o.id).id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>{let o=l`
        <photo-album-metadata slot="metadata"
            .triples=${this.triples}
            title="${n.name}"
            count="${n.photos_count}"
            minDate="${n.min_date}"
            maxDate="${n.max_date}"
            countries="${n.flags}"
        ></photo-album-metadata>`;return l`
          <photo-album
            .triples=${this.triples}
            title="${n.name}"
            url="${n.thumbnail_url}"
            mosaicColours="${n.mosaic}"
            id="${n.id}"
            loading="eager">
      ${o}
          </photo-album>
      `})}firstPhotographed(t,e,s){let n=this.urnImages(e,s).sort((o,h)=>o.created_at-h.created_at)[0];return n?new Date(parseInt(n.created_at)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=w.parseUrn(this.urn),s=this.triples.search({source:{id:t,type:e},relation:y.NAME}).firstTarget();if(s)return s;try{let r=w.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:K.has(r.type)?J.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(K.has(t.type))for(let r of["captivity","wild"]){let o={...t,qs:{context:r}};s.push({label:r,query:{target:o}})}else s.push({label:"default",query:{source:{type:"photo"},target:t}});return s}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,s])=>s?s.length===0?[]:e==="default"?[l`
        <div class="photo-group">
          ${s}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${e.charAt(0).toUpperCase()+e.slice(1)}</h4>
          ${s}
        </div>
      `]:[])}
    <div/>`}render(){let t=this.triples,e=t.search({source:{type:"photo"}}).objects(),s=w.parseUrn(this.urn),r=s.type,n=t.search({source:I(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let q=n.fcode_name;o["Place Type"]=l`${q.charAt(0).toUpperCase()}${q.slice(1)}`}K.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:I(this.urn)})}</span>`);let h=n[y.WIKIPEDIA],a=n[y.BIRDWATCH_URL],p=n[y.LONGITUDE],m=n[y.LATITUDE],u;if(p&&m){let q=`https://www.google.com/maps?q=${m},${p}`;u=l`
      <a href="${q}" target="_blank" rel="noopener">[maps]</a>
      `}let f=I(this.urn);f.id==="*"&&delete f.id;let $=this.getPhotoQueries(I(this.urn)),S={};for(let{query:q,label:Gt}of $){let Qe=this.urnImages(t,q);S[Gt]=this.renderSubjectPhotos(Qe)}let T={source:{type:"photo"},target:f},Wt=this.renderSubjectAlbums(t,T),Ge=this.renderPhotoSection(S);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${K.has(r)&&s.id!=="*"?l`<span class="thing-binomial">(${J.pretty(s.id)})</span>`:l``}
        </p>
        <br>

        ${h?l`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${u?l`<span class="location">${u}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([q,Gt])=>l`
          <tr>
            <th class="exif-heading">${q}</th>
            <td>${Gt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${Ge}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${Wt}
        </section>

      </div>
    `}};d([c()],bt.prototype,"urn",2),d([c({state:!0})],bt.prototype,"triples",2);customElements.define("thing-page",bt);var Vt=class{static loadingMode(t){return t===0?"auto":"none"}};var Ft=class extends g{connectedCallback(){super.connectedCallback(),C.setIndex()}getVideos(){return this.triples.search({source:{type:"video"}}).objects()}render(){let t=this.getVideos();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`<app-video
          id=${r.id}
          url_poster=${r.poster_url}
          url_unscaled=${r.video_url_unscaled}
          url_1080p=${r.video_url_1080p}
          url_720p=${r.video_url_720p}
          url_480p=${r.video_url_480p}
          preload="${Vt.loadingMode(s)}"
        ></app-video>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${st(e())}
      </section>
    </div>
    `}};d([c({state:!0})],Ft.prototype,"triples",2);customElements.define("videos-page",Ft);var zt=class{static getDistinctThings(t,e){return t.search({source:{type:e},relation:"name"}).objects().sort((r,n)=>r.name.localeCompare(n.name))}static chooseBestImage(t,e,s){let n=t.search({source:{type:"photo"},target:I(s)}).sources(),h=Array.from(n).map(a=>{let p=t.search({source:I(a),relation:"rating"}),m=Array.from(p.targets()).map(u=>decodeURIComponent(I(u).id).length);return{photo:a,rating:Math.max(...m)}}).sort((a,p)=>p.rating-a.rating)[0];return h||console.error("No photo found for",e,s),h?.photo}},H=class extends g{render(){let t=E.encodeBitmapDataURL(this.mosaicColours);return l`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `}};d([c({state:!0})],H.prototype,"triples",2),d([c()],H.prototype,"url",2),d([c()],H.prototype,"id",2),d([c()],H.prototype,"mosaicColours",2),d([c()],H.prototype,"count",2),d([c()],H.prototype,"loading",2);customElements.define("thing-album",H);var ne=class extends g{static get properties(){return{id:{type:String},triples:{type:Object,state:!0}}}renderMetadata(t,e,s){let r=this.triples.search({source:I(e)}).firstObject();return l`
      <div>
        <p>${s}</p>
        ${r.wikipedia?l`<span><a href="${r.wikipedia}">[wiki]</a></span>`:""}

        ${r.birdwatch_url?l`<span><a href="${r.birdwatch_url}">[birdwatch]</a></span>`:""}
      </div>
    `}renderThingAlbum(t,e,s,r){let n=zt.chooseBestImage(this.triples,t,e),o=this.triples.search({source:I(n)}).firstObject(),h=I(this.id),a=`${h.type}:${h.id}`;return l`
      <photo-album
        .triples=${this.triples}
        title="${"no such thing exists"}"
        url="${o.thumbnail_url}"
        mosaicColours="${o.mosaic_colours}"
        id=${a}
        path="#/thing/"
        loading=${E.loadingMode(r)}>
      ${this.renderMetadata(t,e,s)}
        </photo-album>
    `}render(){let t=this.triples,e=zt.getDistinctThings(t,this.id);return l`
    <section class="album-metadata">
      <h1 class="albums-header">${this.id.charAt(0).toUpperCase()+this.id.slice(1)}s</h1>
      <a href="/#thing/${this.id}:*">See all ${this.id} photos</a>
    </section>

    <section class="album-container">

      ${e.map((s,r)=>this.renderThingAlbum(this.id,s.id,s.name,r))}
    </section>
    `}};customElements.define("listing-page",ne);function _s(i,t){let e=[We,He,qe,Fe,ze,Ve.bind(null,i)],s=[t];for(let r of e)s=s.flatMap(r);return s}var ws=new Tt,A=class A extends g{static{this.DEFAULT_PAGE="albums"}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,window.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new Ae([]));let e={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"};for await(let s of ws.stream())t.push(...[s].flatMap(_s.bind(null,e))),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=M.getUrl();M.isPage(t?.type)?this.page=t.type:(console.error("did not match pagetype",t?.type),this.page=A.DEFAULT_PAGE),M.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page="photos",this.id=s,this.title=e,M.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page="metadata",this.id=e,this.imageUrl=s,this.thumbnailUrl=r,M.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=M.router(this.page);e||console.error(`no router found for page ${this.page}`),M.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page==="about")return l`<about-page class="${e}"></about-page>`;if(this.page==="photos")return l`<photos-page .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page==="album"){this.id||console.error("no album id provided");let s=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .triples=${this.tribbleDB}
        title=${s.name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
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
    `}};d([c()],A.prototype,"title",2),d([c()],A.prototype,"page",2),d([c({state:!0})],A.prototype,"sidebarVisible",2),d([c()],A.prototype,"tribbleDB",2),d([c()],A.prototype,"darkMode",2),d([c()],A.prototype,"id",2),d([c()],A.prototype,"imageUrl",2),d([c()],A.prototype,"thumbnailUrl",2),d([c()],A.prototype,"route",2),d([c()],A.prototype,"params",2),d([c()],A.prototype,"query",2);var oe=A;customElements.define("photo-app",oe);export{oe as PhotoApp};
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
//# sourceMappingURL=app.ddad1e4a7d4a8591.js.map
