var ps=Object.defineProperty;var us=Object.getOwnPropertyDescriptor;var p=(r,t,e,s)=>{for(var i=s>1?void 0:s?us(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ps(t,e,i),i};var It=globalThis,Ut=It.ShadowRoot&&(It.ShadyCSS===void 0||It.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),ye=new WeakMap,pt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ut&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ye.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ye.set(e,t))}return t}toString(){return this.cssText}},Ct=r=>new pt(typeof r=="string"?r:r+"",void 0,te),ee=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1]),r[0]);return new pt(e,r,te)},ve=(r,t)=>{if(Ut)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let s=document.createElement("style"),i=It.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},se=Ut?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ct(e)})(r):r;var{is:ms,defineProperty:gs,getOwnPropertyDescriptor:fs,getOwnPropertyNames:$s,getOwnPropertySymbols:bs,getPrototypeOf:ys}=Object,At=globalThis,we=At.trustedTypes,vs=we?we.emptyScript:"",ws=At.reactiveElementPolyfillSupport,ut=(r,t)=>r,mt={toAttribute(r,t){switch(t){case Boolean:r=r?vs:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Tt=(r,t)=>!ms(r,t),xe={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Tt};Symbol.metadata??=Symbol("metadata"),At.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&gs(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=fs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xe}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;let t=ys(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){let e=this.properties,s=[...$s(e),...bs(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(se(i))}else t!==void 0&&e.push(se(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:mt).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:mt;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let i=this.constructor,n=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Tt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[ut("elementProperties")]=new Map,j[ut("finalized")]=new Map,ws?.({ReactiveElement:j}),(At.reactiveElementVersions??=[]).push("2.1.1");var ie=globalThis,Rt=ie.trustedTypes,Se=Rt?Rt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ne="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,oe="?"+H,xs=`<${oe}>`,Q=document,ft=()=>Q.createComment(""),$t=r=>r===null||typeof r!="object"&&typeof r!="function",ae=Array.isArray,Ae=r=>ae(r)||typeof r?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,Ee=/>/g,W=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Ue=/"/g,Te=/^(?:script|style|textarea|title)$/i,ce=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),c=ce(1),sr=ce(2),rr=ce(3),R=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ce=new WeakMap,Y=Q.createTreeWalker(Q,129);function Re(r,t){if(!ae(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(t):t}var De=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=gt;for(let l=0;l<e;l++){let a=r[l],h,m,u=-1,b=0;for(;b<a.length&&(o.lastIndex=b,m=o.exec(a),m!==null);)b=o.lastIndex,o===gt?m[1]==="!--"?o=_e:m[1]!==void 0?o=Ee:m[2]!==void 0?(Te.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=W):m[3]!==void 0&&(o=W):o===W?m[0]===">"?(o=i??gt,u=-1):m[1]===void 0?u=-2:(u=o.lastIndex-m[2].length,h=m[1],o=m[3]===void 0?W:m[3]==='"'?Ue:Ie):o===Ue||o===Ie?o=W:o===_e||o===Ee?o=gt:(o=W,i=void 0);let y=o===W&&r[l+1].startsWith("/>")?" ":"";n+=o===gt?a+xs:u>=0?(s.push(h),a.slice(0,u)+ne+a.slice(u)+H+y):a+H+(u===-2?l:y)}return[Re(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},bt=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[h,m]=De(t,e);if(this.el=r.createElement(h,s),Y.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=Y.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(ne)){let b=m[o++],y=i.getAttribute(u).split(H),E=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:E[2],strings:y,ctor:E[1]==="."?Ot:E[1]==="?"?kt:E[1]==="@"?Mt:K}),i.removeAttribute(u)}else u.startsWith(H)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Te.test(i.tagName)){let u=i.textContent.split(H),b=u.length-1;if(b>0){i.textContent=Rt?Rt.emptyScript:"";for(let y=0;y<b;y++)i.append(u[y],ft()),Y.nextNode(),a.push({type:2,index:++n});i.append(u[b],ft())}}}else if(i.nodeType===8)if(i.data===oe)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(H,u+1))!==-1;)a.push({type:7,index:n}),u+=H.length-1}n++}}static createElement(t,e){let s=Q.createElement("template");return s.innerHTML=t,s}};function J(r,t,e=r,s){if(t===R)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=$t(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=J(r,i._$AS(r,t.values),i,s)),t}var Dt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??Q).importNode(e,!0);Y.currentNode=i;let n=Y.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new rt(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new Lt(n,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=Q,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},rt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),$t(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ae(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.T(Q.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=bt.createElement(Re(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Dt(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Ce.get(t.strings);return e===void 0&&Ce.set(t.strings,e=new bt(t)),e}k(t){ae(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(ft()),this.O(ft()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=J(this,t,e,0),o=!$t(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{let l=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=J(this,l[s+a],e,a),h===R&&(h=this._$AH[a]),o||=!$t(h)||h!==this._$AH[a],h===_?t=_:t!==_&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ot=class extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}},kt=class extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}},Mt=class extends K{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??_)===R)return;let s=this._$AH,i=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==_&&(s===_||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Lt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}},Oe={M:ne,P:H,A:oe,C:1,L:De,R:Dt,D:Ae,V:J,I:rt,H:K,N:kt,U:Mt,B:Ot,F:Lt},Ss=ie.litHtmlPolyfillSupport;Ss?.(bt,rt),(ie.litHtmlVersions??=[]).push("3.3.1");var ke=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new rt(t.insertBefore(ft(),n),n,void 0,e??{})}return i._$AI(r),i};var le=globalThis,k=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};k._$litElement$=!0,k.finalized=!0,le.litElementHydrateSupport?.({LitElement:k});var _s=le.litElementPolyfillSupport;_s?.({LitElement:k});(le.litElementVersions??=[]).push("4.2.1");var f=class extends k{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Me=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(r){return this.#e.has(r)?this.#e.get(r):(this.#e.set(r,this.#t),this.#s.set(this.#t,r),this.#t++,this.#t-1)}setIndex(r,t){this.#e.set(r,t),this.#s.set(t,r)}getIndex(r){return this.#e.get(r)}getValue(r){return this.#s.get(r)}has(r){return this.#e.has(r)}},Le=class{static intersection(r,t){if(t.length===0)return new Set;t.sort((s,i)=>s.size-i.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let i=t[s];for(let n of e)r.setCheck(),i.has(n)||e.delete(n);if(e.size===0)break}return e}},Ne=class{stringIndex;constructor(){this.stringIndex=new Me}parseTriple(r){let t=r.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${r}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),s=this.stringIndex.getValue(parseInt(t[2],10)),i=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||s===void 0||i===void 0)throw new SyntaxError(`Invalid triple reference: ${r}`);return[e,s,i]}parseDeclaration(r){let t=r.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${r}`);let e=t[1],s=t[2];this.stringIndex.setIndex(s,parseInt(e,10))}parse(r){if(/^(\d+)\s(\d+)\s(\d+)$/.test(r))return this.parseTriple(r);this.parseDeclaration(r)}};function I(r,t="r\xF3"){if(!r.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${r}`);let e=r.split(":")[2],[s,i]=r.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}function w(r,t="r\xF3"){try{return I(r,t)}catch{return{type:"unknown",id:r,qs:{}}}}var Es=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Is=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Us=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(r){this.indexedTriples=[],this.stringIndex=new Me,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(r),this.metrics=new Es}add(r){let t=this.indexedTriples.length;for(let e=0;e<r.length;e++){let s=t+e,i=r[e],n=this.stringUrn.has(i[0])?this.stringUrn.get(i[0]):this.stringUrn.set(i[0],w(i[0])).get(i[0]),o=i[1],l=this.stringUrn.has(i[2])?this.stringUrn.get(i[2]):this.stringUrn.set(i[2],w(i[2])).get(i[2]),a=this.stringIndex.add(n.type),h=this.stringIndex.add(n.id),m=this.stringIndex.add(o),u=this.stringIndex.add(l.type),b=this.stringIndex.add(l.id);this.indexedTriples.push([this.stringIndex.add(i[0]),m,this.stringIndex.add(i[2])]),this.sourceType.has(a)||this.sourceType.set(a,new Set),this.sourceType.get(a).add(s),this.sourceId.has(h)||this.sourceId.set(h,new Set),this.sourceId.get(h).add(s);for(let[y,E]of Object.entries(n.qs)){let O=this.stringIndex.add(`${y}=${E}`);this.sourceQs.has(O)||this.sourceQs.set(O,new Set),this.sourceQs.get(O).add(s)}this.relations.has(m)||this.relations.set(m,new Set),this.relations.get(m).add(s),this.targetType.has(u)||this.targetType.set(u,new Set),this.targetType.get(u).add(s),this.targetId.has(b)||this.targetId.set(b,new Set),this.targetId.get(b).add(s);for(let[y,E]of Object.entries(l.qs)){let O=this.stringIndex.add(`${y}=${E}`);this.targetQs.has(O)||this.targetQs.set(O,new Set),this.targetQs.get(O).add(s)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([r,t,e])=>[this.stringIndex.getValue(r),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(r){if(r<0||r>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[r];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(r){if(!(r<0||r>=this.indexedTriples.length))return this.indexedTriples[r]}getSourceTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},B=class{static source(r){return r[0]}static relation(r){return r[1]}static target(r){return r[2]}};function Cs(r,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let i=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let h=t.rows[a][2];i.has(h)||i.set(h,[]),i.get(h).push(a)}for(let a=0;a<e.rows.length;a++){let h=e.rows[a][0];n.has(h)||n.set(h,[]),n.get(h).push(a)}let o=Le.intersection(r,[new Set(i.keys()),new Set(n.keys())]),l=[];for(let a of o){let h=n.get(a),m=i.get(a);for(let u of h)for(let b of m){let y=t.rows[u].concat(e.rows[b]);l.push(y)}}return{names:s,rows:l}}var Pe=class X{index;triplesCount;cursorIndices;metrics;validations;constructor(t,e={}){this.index=new Us(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Is,this.validations=e;for(let s=0;s<this.triplesCount;s++)this.cursorIndices.add(s)}clone(){let t=new X([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new X(t)}static from(t){let e=[];for(let s of t){let{id:i,...n}=s;if(typeof i!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,l]of Object.entries(n))if(Array.isArray(l))for(let a of l)e.push([i,o,a]);else e.push([i,o,l])}return new X(e)}validateTriples(t){let e=[];for(let[s,i,n]of t){let o=this.validations[i];if(!o)continue;let{type:l}=w(s),a=o(l,i,n);typeof a=="string"&&e.push(a)}if(e.length>0)throw new Error(`Triple validation failed:
- ${e.join(`
- `)}`)}add(t){let e=this.index.length;this.validateTriples(t),this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new X(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new X(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?B.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?B.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?B.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(B.source))}relations(){return new Set(this.index.triples().map(B.relation))}targets(){return new Set(this.index.triples().map(B.target))}objects(t=!1){let e=[];for(let[s,i]of Object.entries(this.object(t)))i.id=s,e.push(i);return e}object(t=!1){let e={};for(let[s,i,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][i]?Array.isArray(e[s][i])?e[s][i].push(n):e[s][i]=[e[s][i],n]:e[s][i]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:i,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof i>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let h of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,h)&&!o.includes(h))throw new Error(`Unexpected search parameter: ${h}`);if(s){if(s.type){let h=this.index.getSourceTypeSet(s.type);if(h)e.push(h);else return new Set}if(s.id){let h=this.index.getSourceIdSet(s.id);if(h)e.push(h);else return new Set}if(s.qs)for(let[h,m]of Object.entries(s.qs)){let u=this.index.getSourceQsSet(h,m);if(u)e.push(u);else return new Set}}if(n){if(n.type){let h=this.index.getTargetTypeSet(n.type);if(h)e.push(h);else return new Set}if(n.id){let h=this.index.getTargetIdSet(n.id);if(h)e.push(h);else return new Set}if(n.qs)for(let[h,m]of Object.entries(n.qs)){let u=this.index.getTargetQsSet(h,m);if(u)e.push(u);else return new Set}}if(i){let h=typeof i=="string"?{relation:[i]}:i;if(h.relation){let m=new Set;for(let u of h.relation){let b=this.index.getRelationSet(u);if(b)for(let y of b)m.add(y)}if(m.size>0)e.push(m);else return new Set}}let l=Le.intersection(this.metrics,e),a=new Set;for(let h of l){let m=this.index.getTriple(h);if(!s?.predicate&&!n?.predicate&&!(typeof i=="object"&&i.predicate)){a.add(h);continue}let u=!0;s?.predicate&&(u=u&&s.predicate(B.source(m))),n?.predicate&&(u=u&&n.predicate(B.target(m))),typeof i=="object"&&i.predicate&&(u=u&&i.predicate(B.relation(m))),u&&a.add(h)}return a}search(t){let e=[];for(let s of this.#t(t)){let i=this.index.getTriple(s);i&&e.push(i)}return new X(e)}search2(t){let e=Object.entries(t),s=[];for(let l=0;l<e.length-2;l+=2){let a=e.slice(l,l+3),h={source:a[0][1],relation:a[1][1],target:a[2][1]},m=a.map(y=>y[0]),u=this.#t(h),b=Array.from(u).flatMap(y=>{let E=this.index.getTripleIndices(y);return typeof E>"u"?[]:[E]});s.push({names:m,rows:b})}let i=s.reduce(Cs.bind(this,this.metrics)),n=i.names,o=[];for(let l of i.rows){let a={};for(let h=0;h<n.length;h++){let m=n[h];a[m]=this.index.stringIndex.getValue(l[h])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var As=window.envConfig,Nt=class{constructor(t=`/manifest/tribbles.${As.publication_id}.txt`){this.url=t}async*stream(){let t=new Ne,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let s=new TextDecoderStream,i=e.body.pipeThrough(s).getReader(),n="";for(;;){let{value:o,done:l}=await i.read();if(l)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let h of a){let m=t.parse(h);m!==void 0&&(yield m)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var je="photos";var He={photos:"photos",albums:"albums",album:"album",metadata:"metadata",about:"about",videos:"videos",thing:"thing",listing:"listing"},$=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname";static PHOTO="photo";static ALBUM="album";static VIDEO="video";static COUNTRY="country"},g=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatchUrl";static WIKIPEDIA="wikipedia";static CREATED_AT="createdAt";static SEASON="season";static F_STOP="f_stop";static FOCAL_LENGTH="focalLength";static MODEL="model";static EXPOSURE_TIME="exposureTime";static ISO="iso";static WIDTH="width";static HEIGHT="height";static THUMBNAIL_URL="thumbnailUrl";static PNG_URL="pngUrl";static FULL_IMAGE="fullImage";static POSTER_URL="posterUrl";static VIDEO_URL_1080P="videoUrl1080p";static VIDEO_URL_480P="videoUrl480p";static VIDEO_URL_720P="videoUrl720p";static VIDEO_URL_UNSCALED="videoUrlUnscaled";static YEAR="year"},Be=new Set([g.CREATED_AT,g.F_STOP,g.FOCAL_LENGTH,g.MODEL,g.EXPOSURE_TIME,g.ISO,g.WIDTH,g.HEIGHT]),Z=new Set([$.BIRD,$.MAMMAL,$.REPTILE,$.AMPHIBIAN,$.FISH,$.INSECT]),Ve=new Set([g.THUMBNAIL_URL,g.PNG_URL,g.FULL_IMAGE,g.POSTER_URL,g.VIDEO_URL_1080P,g.VIDEO_URL_480P,g.VIDEO_URL_720P,g.VIDEO_URL_UNSCALED]);var M=class r{static{this.ROUTES={photos:this.showPhotosUrl,albums:this.showAlbumsUrl,album:this.showAlbumUrl,metadata:this.showMetadataUrl,about:this.showAboutUrl,videos:this.showVideosUrl,thing:this.showThingUrl,listing:this.showListingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":"albums","#/album":"album","#/metadata":"metadata","#/about":"about","#/videos":"videos","#/thing":"thing","#/photos":"photos","#/listing":"listing"}}static{this.ID_PAGES=new Set(["album","metadata","thing","listing"])}static isPage(t){return t in He}static router(t){if(r.isPage(t))return r.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return r.isPage(t)&&r.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static showListingUrl(t){window.location.hash=`#/listing/${t}`,document.title="Listing - photos"}static extractQueryParams(){let t={},e=i=>{let n=new URLSearchParams(i);for(let[o,l]of n.entries())t[o]=l},s=window.location.hash.indexOf("?");return s!==-1&&e(window.location.hash.slice(s+1)),t}static getUrl(){let t=window.location.hash;for(let[e,s]of Object.entries(r.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let i=r.extractQueryParams(),n={type:s,qs:i};return r.ID_PAGES.has(s)&&(n.id=t.split("/")[2]),n}return{type:"albums",qs:{}}}};var Ts={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:Tt},Rs=(r=Ts,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function d(r){return(t,e)=>typeof e=="object"?Rs(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}var jt=class extends f{render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),c`
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
    `}};p([d({type:Boolean,state:!0})],jt.prototype,"visible",2);customElements.define("photo-sidebar",jt);var Ht=class extends f{constructor(){super(...arguments);this.darkMode=!1}feedUrl(){return"/manifest/atom/atom-index.xml"}renderRss(){return c`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `}render(){let e=this.darkMode?"\u2600\uFE0F":"\u{1F319}",s=je;return c`
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
    `}};p([d()],Ht.prototype,"darkMode",2);customElements.define("photo-header",Ht);var nt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},tt=r=>(...t)=>({_$litDirective$:r,values:t}),it=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Ds}=Oe;var Fe=r=>r.strings===void 0,qe=()=>document.createComment(""),ze=(r,t,e)=>{let s=r._$AA.parentNode,i=t===void 0?r._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(qe(),i),o=s.insertBefore(qe(),i);e=new Ds(n,o,r,r.options)}else{let n=e._$AB.nextSibling,o=e._$AM,l=o!==r;if(l){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==o._$AU&&e._$AP(a)}if(n!==i||l){let a=e._$AA;for(;a!==n;){let h=a.nextSibling;s.insertBefore(a,i),a=h}}}return e},Ge=(r,t,e=r)=>(r._$AI(t,e),r);var We=r=>{r._$AR()};var yt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),yt(s,t);return!0},Bt=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Ye=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),Ms(t)}};function Os(r){this._$AN!==void 0?(Bt(this),this._$AM=r,Ye(this)):this._$AM=r}function ks(r,t=!1,e=0){let s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)yt(s[n],!1),Bt(s[n]);else s!=null&&(yt(s,!1),Bt(s));else yt(this,r)}var Ms=r=>{r.type==nt.CHILD&&(r._$AP??=ks,r._$AQ??=Os)},Vt=class extends it{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ye(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(yt(this,t),Bt(this))}setValue(t){if(Fe(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Qe=async(r,t)=>{for await(let e of r)if(await t(e)===!1)return},qt=class{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}},Ft=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise((t=>this.Z=t))}resume(){this.Z?.(),this.Y=this.Z=void 0}};var vt=class extends Vt{constructor(){super(...arguments),this._$CK=new qt(this),this._$CX=new Ft}render(t,e){return R}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this._$CJ)return R;this._$CJ=e;let i=0,{_$CK:n,_$CX:o}=this;return Qe(e,(async l=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a._$CJ!==e)return!1;s!==void 0&&(l=s(l,i)),a.commitValue(l,i),i++}return!0})),R}commitValue(t,e){this.setValue(t)}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}},Di=tt(vt);var ot=tt(class extends vt{constructor(r){if(super(r),r.type!==nt.CHILD)throw Error("asyncAppend can only be used in child expressions")}update(r,t){return this._$Ctt=r,super.update(r,t)}commitValue(r,t){t===0&&We(this._$Ctt);let e=ze(this._$Ctt);Ge(e,r)}});var zt=new Map,U=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,i=400,n=Math.floor(e/i),o=Math.floor(s/i);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(zt.has(t))return zt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let i=s.getContext("2d");if(!i){console.error("context missing, cannot render colours");return}return i.fillStyle=e[1],i.fillRect(0,0,1,1),i.fillStyle=e[2],i.fillRect(1,0,1,1),i.fillStyle=e[3],i.fillRect(0,1,1,1),i.fillStyle=e[4],i.fillRect(1,1,1,1),zt.set(t,s.toDataURL("image/png")),zt.get(t)}};var V=class extends f{constructor(){super(...arguments);this.loading="eager"}renderIcon(){return c`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let s=e.target?.parentNode?.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}render(){if(!this.id)return c`<p>Missing photo ID</p>`;let e=this.id.startsWith("urn:")?I(this.id).id:this.id,s={id:e,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:U.encodeBitmapDataURL(this.mosaicColours)},i=document.createElement("div");i.innerHTML=this.summary??"";let n=i.textContent??i.innerText??"";return c`
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
    `}};p([d()],V.prototype,"id",2),p([d()],V.prototype,"imageUrl",2),p([d()],V.prototype,"thumbnailUrl",2),p([d()],V.prototype,"mosaicColours",2),p([d()],V.prototype,"summary",2),p([d()],V.prototype,"loading",2);customElements.define("app-photo",V);var A=class{static getElement(){return document.getElementById("rss")}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};function Ls(r,t){let{id:e,type:s}=w(t),i=r.search({source:{id:e,type:s},relation:g.NAME}).firstTarget();if(typeof i>"u")return i;if(typeof i!="string")throw new TypeError(`name is not a string: ${i}`);return i}function Ns(r,t){let{id:e,type:s}=w(t),i=r.search({source:{id:e,type:s},relation:{relation:[g.LONGITUDE,g.LATITUDE]}}).firstObject();if(i)return{longitude:i.longitude,latitude:i.latitude}}function Ps(r){return{name:r.name,minDate:parseInt(r.minDate),maxDate:parseInt(r.maxDate),thumbnailUrl:r.thumbnailUrl,mosaicColours:r.mosaic,id:r.id,photosCount:r.photosCount,flags:r.flags}}function js(r){return{...r}}function Hs(r){return{...r}}function Bs(r,t){return r.search({source:{type:"photo"},relation:"albumId",target:{id:t}}).sources()}function Vs(r,t){return r.search({source:{type:t},relation:"name"}).objects().sort((s,i)=>s.name.localeCompare(i.name))}var C=class{static getName(t,e){return Ls(t,e)}static getAlbumPhotoSources(t,e){return Bs(t,e)}static getDistinctNames(t,e){return Vs(t,e)}static getGeocoordinates(t,e){return Ns(t,e)}static videoObjects(t){return t.search({source:{type:"video"}}).objects().map(js)}static photoObjects(t,e={}){return t.search({...e,source:{type:"photo"}}).objects().map(Hs).sort((s,i)=>i.createdAt-s.createdAt)}static albumObjects(t){return t.search({source:{type:"album"}}).objects().map(Ps).sort((e,s)=>s.minDate-e.minDate)}},Gt=class{static getURL(t,e){let s=C.getGeocoordinates(t,e);if(!s)return;let{longitude:i,latitude:n}=s;if(i&&n){let o=`https://www.google.com/maps?q=${n},${i}`;return c`
      <a href="${o}" target="_blank" rel="noopener">[maps]</a>
      `}}};var wt=class wt extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}static{this.IMAGE_RELATIONS=["thumbnailUrl","mosaicColours","fullImage"]}matchingImages(){return C.photoObjects(this.triples,{relation:{relation:wt.IMAGE_RELATIONS},target:{type:"unknown"}})}async forceRerender(t){t%4===0&&await new Promise(e=>setTimeout(e,0))}render(){let t=this.matchingImages(),e=this;async function*s(){for(let i=0;i<t.length;i++){let n=t[i];await e.forceRerender(i),yield c`
          <app-photo
            id=${w(n.id).id}
            loading="${U.loadingMode(i)}"
            thumbnailUrl="${n.thumbnailUrl}"
            mosaicColours="${n.mosaicColours}"
            imageUrl="${n.fullImage}"></app-photo>`}}return c`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${ot(s())}
      </section>
    </div>
    `}};p([d({state:!0})],wt.prototype,"triples",2),p([d()],wt.prototype,"qs",2);var de=wt;customElements.define("photos-page",de);var he=class extends f{render(){let t=document.getElementById("stats-data");if(!t)return console.error("No stats data found"),c``;let e=JSON.parse(t.innerText);return c`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <a href="#/listing/country">countries</a> ·
        ${e.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${e.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",he);var at=class{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,i]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${i}`}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let i=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},l=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),h=i.toLocaleDateString("en-IE",{day:"numeric"}),m=n.toLocaleDateString("en-IE",{day:"numeric"}),u=i.toLocaleDateString("en-IE",{month:"short"}),b=n.toLocaleDateString("en-IE",{month:"short"}),y=i.getFullYear(),E=n.getFullYear(),O=u===b,G=y===E;return l===a?`${l} ${y}`:O&&G?`${h} - ${m} ${b} ${y}`:`${l} ${y} - ${a} ${E}`}else{let o={year:"numeric",month:"short",day:"numeric"},l=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return l===a?l:`${l} \u2014 ${a}`}}};var D=class{static capitalise(t){return t.charAt(0).toUpperCase()+t.slice(1)}static pluralise(t){return t+"s"}static camelCase(t){return t.replace(/[-_ ]+([a-zA-Z0-9])/g,(e,s)=>s.toUpperCase())}};var pe={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"},Wt=/^\[([a-z]*):(.*)\]$/;function Je(r,t){if(typeof t!="string"||!Wt.test(t))return t;let e=t.match(Wt);if(!e)return t;let s=e[1],i=e[2];return r[s]?`${r[s]}${i}`:t}function ue(r,t){let[e,s,i]=t,n=Je(r,e),o=Je(r,i);if(Wt.test(n))throw new Error(`Source still matches CURIE regex after expansion: "${e}" ${n}`);if(Wt.test(o))throw new Error(`Target still matches CURIE regex after expansion: "${i}" ${o}`);return[[n,s,o]]}var v=class{static isUrnSource(t){return S.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return S.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},S=class r{static isUrn(t){return typeof t=="string"&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,i]=t.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}static is(t,e){return r.isUrn(t)&&r.parseUrn(t).type===e}static toURL(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=r.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type&&s.id===i.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return r.isUrn(t)&&r.parseUrn(t).id===e}static sameType(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type}static isType(t,e){return r.isUrn(t)?r.parseUrn(t).type===e:!1}},et=class{static pretty(t){let e=t.replace(/-/g," ");return D.capitalise(e)}static toCommonName(t,e){return t.search({source:{id:e},relation:g.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=I(e);return t.search({source:{id:s},relation:g.BIRDWATCH_URL}).firstTarget()}},ct=class{static details(t,e){let s=t.search({source:{type:$.COUNTRY},relation:{relation:[g.NAME,g.FLAG]}}),i=s.search({relation:g.NAME,target:{id:e}}).firstSource(),n=I(i),o=s.search({source:n,relation:g.FLAG}).firstTarget();return{urn:i,name:e,flag:o}}static urnDetails(t,e){let s=I(e),i=t.search({source:{type:$.COUNTRY,id:s.id},relation:g.NAME}).firstTarget();return{urn:e,name:i}}};function Ke(r){return v.getRelation(r)!==g.RATING?[r]:[[v.getSource(r),v.getRelation(r),`urn:r\xF3:rating:${encodeURIComponent(v.getTarget(r))}`]]}function Xe(r){if(v.getRelation(r)!==g.LOCATION)return[r];let t=v.getTarget(r);return S.is(t,$.COUNTRY)?[[v.getSource(r),g.COUNTRY,t]]:[r]}function Ze(r){if(v.getRelation(r)!==g.COUNTRY)return[r];let e=`urn:r\xF3:country:${v.getTarget(r).toLowerCase().replace(/ /g,"-")}`;return[[v.getSource(r),v.getRelation(r),e]]}function ts(r,t){for(let e of Ve)if(v.getRelation(t)===e)return[[v.getSource(t),e,`${r}${v.getTarget(t)}`]];return[t]}function es(r){let[t,e,s]=r;return[[t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,s.startsWith("::")?`urn:r\xF3:${s.slice(2)}`:s]]}function ss(r){let[t,e,s]=r;return[[t,D.camelCase(e),s]]}function rs(r){if(v.getRelation(r)!==g.CREATED_AT)return[r];let t=new Date(v.getTarget(r));if(isNaN(t.getTime()))return[r];let e=t.getUTCMonth()+1,s="Winter";return e>=3&&e<=5?s="Spring":e>=6&&e<=8?s="Summer":e>=9&&e<=11&&(s="Autumn"),[r,[v.getSource(r),g.SEASON,s]]}function is(r){if(v.getRelation(r)!==g.CREATED_AT)return[r];let t=new Date(v.getTarget(r));if(isNaN(t.getTime()))return[r];let e=t.getUTCFullYear().toString();return[r,[v.getSource(r),g.YEAR,e]]}var qs=await fetch(`/dist/css/photo-album.${window.envConfig.build_id}.css`),Fs=await qs.text(),zs={default:Fs},ns=ee`${Ct(zs.default)}`,L=class extends k{constructor(){super(...arguments);this.path="/#/album/"}broadcast(e,s){return()=>{let i=new CustomEvent(e,{detail:s,bubbles:!0,composed:!0});this.dispatchEvent(i)}}hidePlaceholder(e){this.broadcast("photo-loaded",{url:this.url})();let s=e.target.parentNode.querySelector(".thumbnail-placeholder");s.style.zIndex=-1}renderLink(){return c`
    `}renderPlaceholder(){if(this.mosaicColours){let e=U.encodeBitmapDataURL(this.mosaicColours);return c`
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${e}"/>
      `}return c``}renderImage(){return c`
    <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.onClick?.bind(this)}>
    `}static{this.styles=ns}render(){return performance.mark(`start-album-render-${this.url}`),c`
    <div class="photo-album">
      <a href="${this.path+this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`}};p([d()],L.prototype,"id",2),p([d()],L.prototype,"title",2),p([d()],L.prototype,"triples",2),p([d()],L.prototype,"url",2),p([d()],L.prototype,"mosaicColours",2),p([d()],L.prototype,"loading",2),p([d()],L.prototype,"path",2),p([d()],L.prototype,"onClick",2);var q=class extends f{static{this.styles=ns}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return at.dateRange(this.minDate,this.maxDate,t.matches)}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=ct.details(this.triples,t),i=I(s);return c`<a href="#/thing/country:${i.id}" title=${t}>${e}</a>`})}render(){let t=this.count===1?"photo":"photos",e=this.renderCountries();return c`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`}};p([d()],q.prototype,"title",2),p([d()],q.prototype,"triples",2),p([d()],q.prototype,"minDate",2),p([d()],q.prototype,"maxDate",2),p([d()],q.prototype,"countries",2),p([d()],q.prototype,"count",2);customElements.define("photo-album",L);customElements.define("photo-album-metadata",q);var Yt=class extends f{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,i=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,i.push(e[a])),e[a].position.top===s)i.push(e[a]);else break;let n=Math.min(...i.map(a=>a.minDate)),l=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&l!=="Invalid Date"&&(t.textContent=l)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let i=s.getAttribute("data-min-date");return i?[{position:s.getBoundingClientRect(),minDate:parseInt(i,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return c`<div id="year-cursor"></div>`}};p([d({type:Array})],Yt.prototype,"datesCache",2);customElements.define("year-cursor",Yt);var xt=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){performance.mark("start-albums-render");let t=i=>{let n=w(i.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:n.id,title:i.name},bubbles:!0,composed:!0}))},e=C.albumObjects(this.triples);async function*s(){let i=2e3,n=new Date().getFullYear();for(let o=0;o<e.length;o++){let l=e[o],a=U.loadingMode(o),h=new Date(l.minDate).getFullYear();h!==i&&(i=h,h!==n&&(yield c`<h2 class="album-year-heading">${h}</h2>`)),o%4===0&&await new Promise(u=>setTimeout(u,0));let m=c`
        <photo-album-metadata
          .triples=${this.triples}
            title="${l.name}"
            minDate="${l.minDate}"
            maxDate="${l.maxDate}"
            countries="${l.flags}"
            count="${l.photosCount}"
        ></photo-album-metadata>`;yield c`
          <photo-album
            .onClick=${t.bind(null,l)}
            .triples=${this.triples}
            title="${l.name}"
            url="${l.thumbnailUrl}"
            mosaicColours="${l.mosaicColours}"
            id="${l.id}"
            loading=${a}>
            ${m}
            </photo-album>
          `}}return c`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${ot(s.bind(this)())}
    </section>
    `}};p([d({})],xt.prototype,"albums",2),p([d({state:!0})],xt.prototype,"triples",2);customElements.define("albums-page",xt);var St=class extends it{constructor(t){if(super(t),this.it=_,t.type!==nt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_||t==null)return this._t=void 0,this.it=t;if(t===R)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};St.directiveName="unsafeHTML",St.resultType=1;var Qt=tt(St);var N=class extends f{render(){return c`
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
    `}};p([d()],N.prototype,"id",2),p([d()],N.prototype,"url",2),p([d()],N.prototype,"preload",2),p([d()],N.prototype,"urlPoster",2),p([d()],N.prototype,"urlUnscaled",2),p([d()],N.prototype,"url1080p",2),p([d()],N.prototype,"url720p",2),p([d()],N.prototype,"url480p",2);customElements.define("app-video",N);var lt=class extends f{async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};p([d()],lt.prototype,"title",2),p([d()],lt.prototype,"url",2),p([d({state:!0})],lt.prototype,"sharing",2);customElements.define("album-share-button",lt);var Jt=class extends f{getId(){return S.parseUrn(this.urn)?.id??"unknown"}url(){return this.getId()?`https://whc.unesco.org/en/list/${this.getId()}`:null}render(){return this.getId()?c`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `:c`<span>Invalid UNESCO URN</span>`}};p([d()],Jt.prototype,"urn",2);customElements.define("unesco-link",Jt);var me=class extends f{static{this.properties={urn:{type:String},triples:{type:Object}}}name(){let{type:t,id:e}=S.parseUrn(this.urn);if(Z.has(t))return c`<span>${et.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:S.parseUrn(this.urn),relation:g.NAME}).firstTarget();return s?c`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=S.parseUrn(this.urn);return{[$.BIRD]:"bird-link",[$.MAMMAL]:"mammal-link",[$.REPTILE]:"reptile-link",[$.AMPHIBIAN]:"amphibian-link",[$.FISH]:"fish-link",[$.INSECT]:"insect-link"}[t]??""}render(){return S.isUrn(this.urn)?c`
      <a class="thing-link ${this.linkClass()}" href="${S.toURL(this.urn)}">${this.name()}</a>
    `:c`<span>Invalid URN</span>`}};customElements.define("thing-link",me);var P=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}albumPhotos(t){let e=C.getAlbumPhotoSources(t,this.id);return Array.from(e).flatMap(s=>{let i=t.search({source:I(s)}).firstObject(!0);return i?[i]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"albumId",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let i=t.search({source:I(s)}).firstObject();return i?[i]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[$.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o[g.LOCATION]?.filter(l=>S.is(l,n))).filter(o=>o)));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o[g.SUBJECT]?.filter(l=>S.is(l,n))).filter(o=>o)));let i=[];i=i.concat(e[$.UNESCO].map(n=>c`<unesco-link urn="${n}"></unesco-link>`));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])i=i.concat(e[n].map(o=>c`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return i}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=at.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,h)=>c`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${U.loadingMode(h)}"
        thumbnailUrl="${a.thumbnailUrl}"
        mosaicColours="${a.mosaicColours}"
        imageUrl="${a.fullImage}"></app-photo>`),o=this.albumVideos(t).map((a,h)=>c`<app-video
        id=${a.id}
        urlPoster=${a.posterUrl}
        urlUnscaled=${a.videoUrlUnscaled}
        url1080p=${a.videoUrl1080p}
        url720p=${a.videoUrl720p}
        url480p=${a.videoUrl480p}
        ></app-video>`),l=this?.countries.split(",").map(a=>{let{flag:h,urn:m}=ct.details(this.triples,a),u=I(m);return c`<span href="#/thing/country:${u.id}" title=${a}>${h}</span>`});return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${l}</p>
        <p class="photo-album-description">${Qt(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks(t).map(a=>c`<li>${a}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${n}
      </section>

      <section class="video-container">
        ${o}
      </section>
    </div>
    `}};p([d()],P.prototype,"title",2),p([d()],P.prototype,"id",2),p([d()],P.prototype,"minDate",2),p([d()],P.prototype,"maxDate",2),p([d()],P.prototype,"imageCount",2),p([d()],P.prototype,"description",2),p([d({state:!0})],P.prototype,"triples",2),p([d()],P.prototype,"countries",2);customElements.define("album-page",P);var dt=class extends f{async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};p([d()],dt.prototype,"url",2),p([d()],dt.prototype,"format",2),p([d({state:!0})],dt.prototype,"sharing",2);customElements.define("share-metadata-button",dt);function ht(r){return c`<th class="exif-heading">${r}</th>`}var st=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(t){return t.fStop==="Unknown"?c`<td>Unknown</td>`:t.fStop==="0.0"?c`<td>Manual aperture control</td>`:t.fStop?c`<td>ƒ/${t.fStop}</td>`:c`<td>Unknown</td>`}renderFocalLength(t){return t.focalLength==="Unknown"?c`${t.focalLength}`:t.focalLength==="0"?c`<td>Manual lens</td>`:t.focalLength?c`<td>${t.focalLength}mm equiv.</td>`:c`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return c`<ul class="thing-list">
        ${e.map(s=>c`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return c`<em>${e}</em>`;if(t.toLowerCase()==="summary")return c`${Qt(e??"")}`;if(S.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return c`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(S.isUrn(e)&&S.is(e,$.UNESCO))return c`<unesco-link .urn="${e}"></unesco-link>`;if(S.isUrn(e))return c`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["birdBinomial","mammalBinomial","wildlife","livingConditions","pngUrl","cover"]).has(t)}renderSemanticData(t){return c`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>v.getRelation(e).localeCompare(v.getRelation(s))).filter(e=>!this.isIgnoredKey(v.getRelation(e))).map(e=>c`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(v.getRelation(e))}</th>
              <td>${this.renderSemanticValue(v.getRelation(e),v.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?c`
      ${ht("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:c`
      ${ht("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?c`
        ${ht("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:c`
      ${ht("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutterSpeed=="number"?c`
        ${ht("Shutter Speed")}
        <td>1/${Math.round(1/t.shutterSpeed)}</td>`:c`
      ${ht("Shutter Speed")}
      <td>Unknown</td>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();if(!e)return c`<p>No EXIF data available</p>`;let s=new Date(parseInt(e.createdAt)),i={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},n=s.toLocaleDateString("en-US",i);return c`
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
    `}render(){let t=this.image,e=t.albumId,s=this.triples,i=s.search({source:{id:I(t.id).id},relation:{predicate:n=>{let o=new Set(["albumId","fullImage","mosaicColours","thumbnailUrl"]);return!Be.has(n)&&!o.has(n)}}}).triples();return c`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnailUrl}"/>

      <p>
        <a href="${t.fullImage}" rel="noreferrer">[webp]</a>
        <a href="${t.pngUrl}" rel="noreferrer">[png]</a>
        <share-metadata-button format="image/webp" url=${t.pngUrl}></share-metadata-button>
        <a href="#/album/${e}" rel="noreferrer">[album]</a>
      </p>

      ${this.renderSemanticData(i)}
      ${this.renderExif(s)}

    </section>
    `}};p([d()],st.prototype,"id",2),p([d()],st.prototype,"image",2),p([d({state:!0})],st.prototype,"sharing",2),p([d({state:!0})],st.prototype,"triples",2);customElements.define("metadata-page",st);var ge=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return c`
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
    `}};customElements.define("about-page",ge);var _t=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}isValidImage(t){return t&&t.thumbnailUrl}urnImages(t,e){let i=t.search(e).sources();return Array.from(i).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let l=t.search({source:w(n)}).firstObject();return this.isValidImage(l)?[l]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return this.isValidImage(o)?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,s)=>s.createdAt-e.createdAt).map((e,s)=>c`
      <app-photo
        id=${e.id.startsWith("urn:")?I(e.id).id:e.id}
        loading="${U.loadingMode(s)}"
        thumbnailUrl="${e.thumbnailUrl}"
        mosaicColours="${e.mosaicColours}"
        imageUrl="${e.fullImage}"></app-photo>`)}renderSubjectAlbums(t,e){let s=this.urnImages(t,e),i=new Set(s.map(o=>o.albumId)),n=o=>{let l=w(o.id);this.dispatchEvent(new CustomEvent("click-album",{detail:{id:l.id,title:o.title??o.name},bubbles:!0,composed:!0}))};return Array.from(i).flatMap(o=>C.albumObjects(this.triples).filter(l=>I(l.id).id===o)).map(o=>{let l=c`
        <photo-album-metadata
            .triples=${this.triples}
            title="${o.name}"
            count="${o.count}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
        ></photo-album-metadata>`;return c`
          <photo-album
            .onClick=${n.bind(null,o)}
            .triples=${this.triples}
            title="${o.name}"
            url="${o.thumbnailUrl}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}"
            loading="eager">
      ${l}
          </photo-album>
      `})}firstPhotographed(t,e){let i=this.urnImages(t,e).sort((n,o)=>n.createdAt-o.createdAt)[0];return i?new Date(parseInt(i.createdAt)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let t=C.getName(this.triples,this.urn);if(t)return t;try{let e=S.parseUrn(this.urn),s=decodeURIComponent(e.id);return e.id==="*"?D.capitalise(e.type):Z.has(e.type)?et.toCommonName(this.triples,s):s}catch{return this.urn}}renderClassification(t){return c`<a href="#/listing/${t}">${D.capitalise(t)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(Z.has(t.type))for(let i of["captivity","wild"]){let o={...t,qs:{context:i}};s.push({label:i,query:{target:o}})}else s.push({label:"default",query:{source:{type:"photo"},target:t}});return s}renderPhotoSection(t){return c`<div>
    ${Object.entries(t).flatMap(([e,s])=>s?s.length===0?[]:e==="default"?[c`
        <div class="photo-group">
          ${s}
        </div>
        `]:[c`
        <div class="photo-group">
          <h4>${D.capitalise(e)}</h4>
          ${s}
        </div>
      `]:[])}
    <div/>`}render(){let t=this.triples,e=C.photoObjects(t),s=S.parseUrn(this.urn),i=s.type,n=t.search({source:w(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(i)});if(n.country&&(o.Country=c`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcodeName){let G=n.fcodeName;o["Place Type"]=c`${D.capitalise(G)}`}Z.has(i)&&(o["First Photographed"]=c`<span>${this.firstPhotographed(t,{target:w(this.urn)})}</span>`);let l=n[g.WIKIPEDIA],a=n[g.BIRDWATCH_URL],h=Gt.getURL(t,this.urn),m=w(this.urn);m.id==="*"&&delete m.id;let u=this.getPhotoQueries(w(this.urn)),b={};for(let{query:G,label:Zt}of u){let hs=this.urnImages(t,G);b[Zt]=this.renderSubjectPhotos(hs)}let y={source:{type:"photo"},target:m},E=this.renderSubjectAlbums(t,y),O=this.renderPhotoSection(b);return c`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${Z.has(i)&&s.id!=="*"?c`<span class="thing-binomial">(${et.pretty(s.id)})</span>`:c``}
        </p>
        <br>

        ${l?c`<a href="${l}" target="_blank" rel="noopener">[wikipedia]</a>`:c``}
        ${a?c`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:c``}
        ${h?c`<span class="location">${h}</span>`:c``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([G,Zt])=>c`
          <tr>
            <th class="exif-heading">${G}</th>
            <td>${Zt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${O}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${E}
        </section>

      </div>
    `}};p([d()],_t.prototype,"urn",2),p([d({state:!0})],_t.prototype,"triples",2);customElements.define("thing-page",_t);var Kt=class{static loadingMode(t){return t===0?"auto":"none"}};var Xt=class extends f{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){let t=C.videoObjects(this.triples);async function*e(){for(let s=0;s<t.length;s++){let i=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield c`<app-video
          id=${i.id}
          urlPoster=${i.posterUrl}
          urlUnscaled=${i.videoUrlUnscaled}
          url1080p=${i.videoUrl1080p}
          url720p=${i.videoUrl720p}
          url480p=${i.videoUrl480p}
          preload="${Kt.loadingMode(s)}"
        ></app-video>`}}return c`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${ot(e())}
      </section>
    </div>
    `}};p([d({state:!0})],Xt.prototype,"triples",2);customElements.define("videos-page",Xt);var fe=class{static chooseCoverImage(t,e,s){return t.search({source:{type:"photo"},relation:"cover",target:w(s)}).firstObject()?.id}static chooseBestImage(t,e,s){let n=t.search({source:{type:"photo"},target:w(s)}).sources();n||console.error("no photos found");let o=this.chooseCoverImage(t,e,s);if(o&&n.has(o))return o;let a=Array.from(n).map(h=>{let m=t.search({source:w(h),relation:"rating"}),u=Array.from(m.targets()).map(b=>decodeURIComponent(w(b).id).length);return{photo:h,rating:Math.max(...u)}}).sort((h,m)=>m.rating-h.rating)[0];return a||console.error("No photo found for",e,s),a?.photo}},F=class extends f{render(){let t=U.encodeBitmapDataURL(this.mosaicColours);return c`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `}};p([d({state:!0})],F.prototype,"triples",2),p([d()],F.prototype,"url",2),p([d()],F.prototype,"id",2),p([d()],F.prototype,"mosaicColours",2),p([d()],F.prototype,"count",2),p([d()],F.prototype,"loading",2);customElements.define("thing-album",F);var $e=class extends f{static get properties(){return{id:{type:String},triples:{type:Object,state:!0}}}renderMetadata(t,e,s){let i=this.triples.search({source:w(e)}).firstObject();return c`
      <div class="thing-metadata">
        <p>${s}</p>
        ${i.wikipedia?c`<span><a href="${i.wikipedia}">[wiki]</a></span>`:""}

        ${i.birdwatchUrl?c`<span><a href="${i.birdwatchUrl}">[birdwatch]</a></span>`:""}
      </div>
    `}renderThingAlbum(t,e,s,i){let n=fe.chooseBestImage(this.triples,t,e),o=(m,u)=>{let{type:b,id:y}=w(m),E=new CustomEvent("click-thing-album",{detail:{id:`${b}:${y}`,name:u},bubbles:!0,composed:!0});this.dispatchEvent(E)},l=this.triples.search({source:w(n)}).firstObject(),a=w(this.id),h=`${a.type}:${a.id}`;return c`
      <photo-album
        .onClick=${o.bind(null,e,s)}
        .triples=${this.triples}
        title="${s}"
        url="${l.thumbnailUrl}"
        mosaicColours="${l.mosaicColours}"
        id=${h}
        path="#/thing/"
        loading=${U.loadingMode(i)}>
      ${this.renderMetadata(t,e,s)}
        </photo-album>
    `}render(){let t=this.triples,e=C.getDistinctNames(t,this.id);return c`
    <section class="album-metadata">
      <h1 class="albums-header">${D.capitalise(this.id)}s</h1>
      <a href="/#/thing/${this.id}:*">See all ${D.pluralise(this.id)} photos</a>
    </section>

    <section class="album-container">

      ${e.map((s,i)=>this.renderThingAlbum(this.id,s.id,s.name,i))}
    </section>
    `}};customElements.define("listing-page",$e);function os(r,t,e){return typeof e=="string"&&parseInt(e)>=0?void 0:`invalid relation ${t} for value ${e}`}function z(r,t,e){return typeof e=="string"&&(e.startsWith("/")||e.startsWith("http"))?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Et(r,t,e){return`${t} deprecated`}function x(r,t,e){}function as(r,t,e){return typeof e=="string"&&/\d+/.test(e)?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function cs(r,t,e){return typeof e=="string"&&/^\d+$/.test(e)&&Number(e)>0?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Gs(r,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-180&&Number(e)<=180?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Ws(r,t,e){return typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)&&Number(e)>=-90&&Number(e)<=90?void 0:`invalid relation ${t} for value ${JSON.stringify(e)}`}function Ys(r,t,e){return typeof e=="string"&&e.startsWith("urn:r\xF3:country")?void 0:`invalid country value ${e}`}function Qs(r,t,e){if(typeof e!="string")return`invalid rating value ${e}`;let s=decodeURIComponent(e);return s.match(/^⭐{0,5}$/)||s.match(/^urn:ró:rating:⭐{0,5}$/)?void 0:`invalid rating value ${e}`}var ls={living_conditions:Et,mammal_binomial:Et,plane_model:Et,vehicle:Et,videos_count:os,photos_count:os,height:as,width:as,max_date:cs,min_date:cs,png_url:z,poster_url:z,thumbnail_url:z,video_url_1080p:z,video_url_480p:z,video_url_720p:z,video_url_unscaled:z,latitude:Ws,longitude:Gs,full_image:z,country:Ys,rating:Qs,flag:x,album_id:x,bird_binomial:Et,birdwatch_url:x,created_at:x,curie:x,description:x,exposure_time:x,fcode:x,fcode_name:x,flags:x,focal_length:x,f_stop:x,iso:x,location:x,model:x,mosaic:x,mosaic_colours:x,name:x,style:x,subject:x,summary:x,wikidata:x,wikipedia:x,wildlife:x};function ds(r){let t=[ss,es,Ke,Ze,Xe,ts.bind(null,"https://photos-cdn.rgrannell.xyz"),ue.bind(null,pe),rs,is],e=[r];for(let s of t)e=e.flatMap(s);return e}var Js=new Nt,T=class T extends f{static{this.DEFAULT_PAGE="albums"}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,window.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new Pe([],ls));for await(let e of Js.stream())t.push(...[e].flatMap(ds)),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=M.getUrl();M.isPage(t?.type)?this.page=t.type:(console.error("did not match pagetype",t?.type),this.page=T.DEFAULT_PAGE),M.pageUsesId(this.page)&&typeof t.id=="string"&&(this.id=t.id),this.qs=t.qs}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page="photos",this.id=s,this.title=e,M.showAlbumUrl(s)}receiveClickThingAlbum(t){let{title:e,id:s}=t.detail;this.page="thing",this.id=s,this.title=e,M.showThingUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:i}=t.detail;this.page="metadata",this.id=e,this.imageUrl=s,this.thumbnailUrl=i,M.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=M.router(this.page);e||console.error(`no router found for page ${this.page}`),M.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return c`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page==="about")return c`<about-page class="${e}"></about-page>`;if(this.page==="photos")return c`<photos-page
        .qs=${this.qs}
        .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page==="album"){this.id||console.error("no album id provided");let s=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return s||console.error(`failed to find album with id ${this.id}`),c`
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
      `}if(this.page==="metadata"){let s=this.tribbleDB.search({source:{type:"photo",id:this.id}}).firstObject();return s||console.error(`failed to find photo with id ${this.id}`),c`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page==="videos")return c`
      <videos-page .triples=${this.tribbleDB} class="${e}"></videos-page>
      `;if(this.page==="thing")return c`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .triples=${this.tribbleDB}
        class="${e}"></thing-page>
      `;if(this.page==="listing")if(!this.id)console.error("no listing provided");else return c`
        <listing-page id=${this.id} .triples=${this.tribbleDB} class="${e}"></listing-page>
        `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],c`
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
    `}};p([d()],T.prototype,"title",2),p([d()],T.prototype,"page",2),p([d({state:!0})],T.prototype,"sidebarVisible",2),p([d()],T.prototype,"tribbleDB",2),p([d()],T.prototype,"darkMode",2),p([d()],T.prototype,"id",2),p([d()],T.prototype,"imageUrl",2),p([d()],T.prototype,"thumbnailUrl",2),p([d()],T.prototype,"route",2),p([d()],T.prototype,"params",2),p([d()],T.prototype,"query",2),p([d()],T.prototype,"qs",2);var be=T;customElements.define("photo-app",be);export{be as PhotoApp};
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
//# sourceMappingURL=app.42aacd6a18b6159e.js.map
