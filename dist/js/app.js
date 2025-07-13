var it=globalThis,Nt=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),ae=new WeakMap,Rt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Nt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ae.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ae.set(e,t))}return t}toString(){return this.cssText}},He=s=>new Rt(typeof s=="string"?s:s+"",void 0,Se);var je=(s,t)=>{if(Nt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=it.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},le=Nt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return He(e)})(s):s,{is:Ve,defineProperty:Ze,getOwnPropertyDescriptor:ze,getOwnPropertyNames:We,getOwnPropertySymbols:Fe,getPrototypeOf:qe}=Object,mt=globalThis,ce=mt.trustedTypes,Qe=ce?ce.emptyScript:"",Je=mt.reactiveElementPolyfillSupport,F=(s,t)=>s,Dt={toAttribute(s,t){switch(t){case Boolean:s=s?Qe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ee=(s,t)=>!Ve(s,t),he={attribute:!0,type:String,converter:Dt,reflect:!1,hasChanged:Ee};Symbol.metadata??=Symbol("metadata"),mt.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=he){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Ze(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:o}=ze(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return r?.call(this)},set(n){let c=r?.call(this);o.call(this,n),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??he}static o(){if(this.hasOwnProperty(F("elementProperties")))return;let t=qe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(F("properties"))){let e=this.properties,i=[...We(e),...Fe(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(le(r))}else t!==void 0&&e.push(le(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return je(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:Dt).toAttribute(e,i.type);this.m=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Dt;this.m=r,this[r]=n.fromAttribute(e,o.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??Ee)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,o]of this.v)this[r]=o;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],o)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[F("elementProperties")]=new Map,R[F("finalized")]=new Map,Je?.({ReactiveElement:R}),(mt.reactiveElementVersions??=[]).push("2.0.4");var Bt=globalThis,rt=Bt.trustedTypes,de=rt?rt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Gt="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Yt="?"+O,Ke=`<${Yt}>`,B=document,Q=()=>B.createComment(""),J=s=>s===null||typeof s!="object"&&typeof s!="function",xe=Array.isArray,Te=s=>xe(s)||typeof s?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,pe=/>/g,I=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,fe=/"/g,Ue=/^(?:script|style|textarea|title)$/i,Me=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),h=Me(1),Xe=Me(2),b=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),ge=new WeakMap,N=B.createTreeWalker(B,129);function Le(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(t):t}var Ce=(s,t)=>{let e=s.length-1,i=[],r,o=t===2?"<svg>":"",n=W;for(let c=0;c<e;c++){let a=s[c],p,g,d=-1,$=0;for(;$<a.length&&(n.lastIndex=$,g=n.exec(a),g!==null);)$=n.lastIndex,n===W?g[1]==="!--"?n=ue:g[1]!==void 0?n=pe:g[2]!==void 0?(Ue.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=I):g[3]!==void 0&&(n=I):n===I?g[0]===">"?(n=r??W,d=-1):g[1]===void 0?d=-2:(d=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?I:g[3]==='"'?fe:me):n===fe||n===me?n=I:n===ue||n===pe?n=W:(n=I,r=void 0);let f=n===I&&s[c+1].startsWith("/>")?" ":"";o+=n===W?a+Ke:d>=0?(i.push(p),a.slice(0,d)+Gt+a.slice(d)+O+f):a+O+(d===-2?c:f)}return[Le(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},K=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0,c=t.length-1,a=this.parts,[p,g]=Ce(t,e);if(this.el=s.createElement(p,i),N.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=N.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Gt)){let $=g[n++],f=r.getAttribute(d).split(O),y=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:y[2],strings:f,ctor:y[1]==="."?nt:y[1]==="?"?at:y[1]==="@"?lt:Y}),r.removeAttribute(d)}else d.startsWith(O)&&(a.push({type:6,index:o}),r.removeAttribute(d));if(Ue.test(r.tagName)){let d=r.textContent.split(O),$=d.length-1;if($>0){r.textContent=rt?rt.emptyScript:"";for(let f=0;f<$;f++)r.append(d[f],Q()),N.nextNode(),a.push({type:2,index:++o});r.append(d[$],Q())}}}else if(r.nodeType===8)if(r.data===Yt)a.push({type:2,index:o});else{let d=-1;for(;(d=r.data.indexOf(O,d+1))!==-1;)a.push({type:7,index:o}),d+=O.length-1}o++}}static createElement(t,e){let i=B.createElement("template");return i.innerHTML=t,i}};function G(s,t,e=s,i){if(t===b)return t;let r=i!==void 0?e.U?.[i]:e.N,o=J(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=G(s,r._$AS(s,t.values),r,i)),t}var ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??B).importNode(e,!0);N.currentNode=r;let o=N.nextNode(),n=0,c=0,a=i[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new ft(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new ct(o,this,t)),this._$AV.push(p),a=i[++c]}n!==a?.index&&(o=N.nextNode(),n++)}return N.currentNode=B,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ft=class Oe{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),J(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==b&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Te(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==A&&J(this._$AH)?this._$AA.nextSibling.data=t:this.j(B.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=K.createElement(Le(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let o=new ot(r,this),n=o.O(this.options);o.R(e),this.j(n),this._$AH=o}}_$AC(t){let e=ge.get(t.strings);return e===void 0&&ge.set(t.strings,e=new K(t)),e}D(t){xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let o of t)r===e.length?e.push(i=new Oe(this.H(Q()),this.H(Q()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=A}_$AI(t,e=this,i,r){let o=this.strings,n=!1;if(o===void 0)t=G(this,t,e,0),n=!J(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let c=t,a,p;for(t=o[0],a=0;a<o.length-1;a++)p=G(this,c[i+a],e,a),p===b&&(p=this._$AH[a]),n||=!J(p)||p!==this._$AH[a],p===A?t=A:t!==A&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!r&&this.B(t)}B(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends Y{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===A?void 0:t}},at=class extends Y{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}},lt=class extends Y{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??A)===b)return;let i=this._$AH,r=t===A&&i!==A||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==A&&(i===A||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}},ts={W:Gt,q:O,J:Yt,Z:1,F:Ce,G:ot,K:Te,X:G,Y:ft,tt:Y,st:at,it:lt,et:nt,ot:ct},es=Bt.litHtmlPolyfillSupport;es?.(K,ft),(Bt.litHtmlVersions??=[]).push("3.1.3");var ke=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let o=e?.renderBefore??null;i._$litPart$=r=new ft(t.insertBefore(Q(),o),o,void 0,e??{})}return r._$AI(s),r};var P=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return b}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var ss=globalThis.litElementPolyfillSupport;ss?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:is}=ts,rs=s=>s===null||typeof s!="object"&&typeof s!="function";var $e=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,os=s=>s?._$litType$?.h!=null;var Re=s=>s.strings===void 0,Ae=()=>document.createComment(""),D=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let o=i.insertBefore(Ae(),r),n=i.insertBefore(Ae(),r);e=new is(o,n,s,s.options)}else{let o=e._$AB.nextSibling,n=e._$AM,c=n!==s;if(c){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==n._$AU&&e._$AP(a)}if(o!==r||c){let a=e._$AA;for(;a!==o;){let p=a.nextSibling;i.insertBefore(a,r),a=p}}}return e},k=(s,t,e=s)=>(s._$AI(t,e),s),ns={},X=(s,t=ns)=>s._$AH=t,Pt=s=>s._$AH,Ot=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},De=s=>{s._$AR()};var x=s=>(...t)=>({_$litDirective$:s,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var q=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),q(i,t);return!0},ht=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},Pe=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),cs(t)}};function as(s){this._$AN!==void 0?(ht(this),this._$AM=s,Pe(this)):this._$AM=s}function ls(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)q(i[o],!1),ht(i[o]);else i!=null&&(q(i,!1),ht(i));else q(this,s)}var cs=s=>{s.type==2&&(s._$AP??=ls,s._$AQ??=as)},tt=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Pe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(q(this,t),ht(this))}setValue(t){if(Re(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var dt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},ut=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var pt=class extends tt{constructor(){super(...arguments),this.dt=new dt(this),this.ft=new ut}render(t,e){return b}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return b;this.vt=e;let r=0,{dt:o,ft:n}=this;return(async(c,a)=>{for await(let p of c)if(await a(p)===!1)return})(e,async c=>{for(;n.get();)await n.get();let a=o.deref();if(a!==void 0){if(a.vt!==e)return!1;i!==void 0&&(c=i(c,r)),a.commitValue(c,r),r++}return!0}),b}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},_s=x(pt),ws=x(class extends pt{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&De(this.ht);let e=D(this.ht);k(e,s)}}),be=s=>os(s)?s._$litType$.h:s.strings,vs=x(class extends L{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=$e(this.bt)?be(this.bt):null,i=$e(t)?be(t):null;if(e!==null&&(i===null||e!==i)){let r=Pt(s).pop(),o=this.yt.get(e);if(o===void 0){let n=document.createDocumentFragment();o=ke(A,n),o.setConnected(!1),this.yt.set(e,o)}X(o,[r]),D(o,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let o=Pt(r).pop();De(s),D(s,void 0,o),X(s,[o])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Ss=x(class extends L{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return b}}),hs={},Es=x(class extends L{constructor(){super(...arguments),this._t=hs}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return b}else if(this._t===t)return b;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var xs=x(class extends L{constructor(){super(...arguments),this.key=A}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(X(s),this.key=t),e}}),Ts=x(class extends L{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Re(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===b||t===A)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return b;if(s.type===4){if(!!t===e.hasAttribute(i))return b;if(s.type===1&&e.getAttribute(i)===t+"")return b}}return X(s),t}});var kt=new WeakMap,Us=x(class extends tt{render(s){return A}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),A}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=kt.get(t);e===void 0&&(e=new WeakMap,kt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?kt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),ye=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},Ms=x(class extends L{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],o=[],n=0;for(let c of s)r[n]=i?i(c,n):n,o[n]=e(c,n),n++;return{values:o,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Pt(s),{values:o,keys:n}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=n,o;let c=this.Ct??=[],a=[],p,g,d=0,$=r.length-1,f=0,y=o.length-1;for(;d<=$&&f<=y;)if(r[d]===null)d++;else if(r[$]===null)$--;else if(c[d]===n[f])a[f]=k(r[d],o[f]),d++,f++;else if(c[$]===n[y])a[y]=k(r[$],o[y]),$--,y--;else if(c[d]===n[y])a[y]=k(r[d],o[y]),D(s,a[y+1],r[d]),d++,y--;else if(c[$]===n[f])a[f]=k(r[$],o[f]),D(s,r[d],r[$]),$--,f++;else if(p===void 0&&(p=ye(n,f,y),g=ye(c,d,$)),p.has(c[d]))if(p.has(c[$])){let C=g.get(n[f]),z=C!==void 0?r[C]:null;if(z===null){let ne=D(s,r[d]);k(ne,o[f]),a[f]=ne}else a[f]=k(z,o[f]),D(s,r[d],z),r[C]=null;f++}else Ot(r[$]),$--;else Ot(r[d]),d++;for(;f<=y;){let C=D(s,a[y+1]);k(C,o[f]),a[f++]=C}for(;d<=$;){let C=r[d++];C!==null&&Ot(C)}return this.Ct=n,X(s,a),b}}),Ie="important",ds=" !"+Ie,Ls=x(class extends L{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let o=typeof r=="string"&&r.endsWith(ds);i.includes("-")||o?e.setProperty(i,o?r.slice(0,-11):r,o?Ie:""):e[i]=r}}return b}}),Cs=x(class extends L{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?b:(this.At=s,document.importNode(s.content,!0))}}),H=class extends L{constructor(t){if(super(t),this.bt=A,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this.kt=void 0,this.bt=t;if(t===b)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};H.directiveName="unsafeHTML",H.resultType=1;var gt=x(H);var et=class extends H{};et.directiveName="unsafeSVG",et.resultType=2;var Os=x(et),_e=s=>!rs(s)&&typeof s.then=="function",we=1073741823;var It=class extends tt{constructor(){super(...arguments),this.Mt=we,this.Ut=[],this.dt=new dt(this),this.ft=new ut}render(...t){return t.find(e=>!_e(e))??b}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let o=this.dt,n=this.ft;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this.Mt);c++){let a=e[c];if(!_e(a))return this.Mt=c,a;c<r&&a===i[c]||(this.Mt=we,r=0,Promise.resolve(a).then(async p=>{for(;n.get();)await n.get();let g=o.deref();if(g!==void 0){let d=g.Ut.indexOf(a);d>-1&&d<g.Mt&&(g.Mt=d,g.setValue(p))}}))}return b}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ks=x(It);var us=Symbol.for(""),ps=s=>{if(s?.r===us)return s?._$litStatic$};var ve=new Map,Ne=s=>(t,...e)=>{let i=e.length,r,o,n=[],c=[],a,p=0,g=!1;for(;p<i;){for(a=t[p];p<i&&(o=e[p],(r=ps(o))!==void 0);)a+=r+t[++p],g=!0;p!==i&&c.push(o),n.push(a),p++}if(p===i&&n.push(t[i]),g){let d=n.join("$$lit$$");(t=ve.get(d))===void 0&&(n.raw=n,ve.set(d,t=n)),e=c}return s(t,...e)},Rs=Ne(h),Ds=Ne(Xe);var ms=/^\s*([a-zA-Z]+)\:/,fs=/^\s*"([^\"]+?)"/,gs=/^\s*([^\s]+)/,j=class{static START="START";static RELATION="RELATION";static SUBQUERY="SUBQUERY";static END="END"},$s=class{state;lastState;constructor(){this.state=j.RELATION,this.lastState=j.START}parseRelation(s){let t=s.match(ms);if(!t)throw new SyntaxError(`failed while parsing relationship: ${s}, expected relation`);return[t[1],s.slice(t[0].length)]}parseSubquery(s){let t=s.match(fs);if(t)return[t[1],s.slice(t[0].length)];let e=s.match(gs);if(e)return[e[1],s.slice(e[0].length)];throw new SyntaxError(`subquery: failed to parse query: ${s}, expected subquery`)}advanceState(s){this.lastState=this.state,this.state=s}tokenise(s){let t=s.trim(),e=[],i={};for(;t.length>0;){if(this.state===j.RELATION){let r=this.parseRelation(t);i.relation=r[0],t=r[1],this.advanceState(j.SUBQUERY);continue}if(this.state===j.SUBQUERY){let r=this.parseSubquery(t);i.subquery=r[0],t=r[1],e.push({...i}),t=r[1],this.advanceState(j.RELATION);continue}if(this.state===this.lastState)throw new SyntaxError(`failed to parse query: ${s}, expected relation`)}for(let r of e){if(!r.relation)throw new SyntaxError(`failed to parse query: ${s}, expected relation`);if(!r.subquery)throw new SyntaxError(`failed to parse query: ${s}, expected subquery`)}return e}},Be=class{content;comparators;constructor(s,t){this.content=s,this.comparators=t}*search(s){let e=new $s().tokenise(s);for(let i of this.content){let r=!0;for(let{relation:o,subquery:n}of e){if(!o||!n)continue;let c=this.comparators[o];if(!c)r=!1;else if(!r)continue;r=r&&c(i,n)}r&&(yield i)}}};var m=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var $t=Symbol("the albums manifest"),At=Symbol("the images manifest"),Xs=Symbol("the site manifest"),bt=Symbol("metadata about the site manifest"),yt=Symbol("the videos manifest"),_t=Symbol("the exif data"),wt=Symbol("the semantic data");var Ge="photos",l=class{static EAGER="eager";static LAZY="lazy"},u=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function As(s="/manifest/env.json"){return await(await fetch(s)).json()}var st=await As(),vt=class{_data;constructor(t=`/manifest/images.${st.publication_id}.json`){this.url=t}processImages(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let n=0;n<e.length;n++)o[e[n]]=r[n];i.push(o)}return i}async init(){if(window[At]&&(this._data=window[At]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[At]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},St=class{_data;constructor(t=`/manifest/videos.${st.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let n=0;n<e.length;n++)o[e[n]]=r[n];i.push(o)}return i}async init(){if(window[yt]&&(this._data=window[yt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[yt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Et=class{_data;constructor(t=`/manifest/albums.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let n=0;n<e.length;n++)o[e[n]]=r[n];i.push(o)}return i}async init(){if(window[$t]&&(this._data=window[$t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[$t]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},xt=class{_data;constructor(t=`/manifest/exif.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let n=0;n<e.length;n++)o[e[n]]=r[n];i.push(o)}return i}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[_t]=e,this._data=e}exif(){return this._data}};function Ye(s,t,e){if(!s.hasOwnProperty(t))return!1;let i=s[t];if(i.includes(e))return!0;for(let r of i)if(Ye(s,r,e))return!0;return!1}var Tt=class{_data;constructor(t=`/manifest/semantic.${st.publication_id}.json`){this.url=t}async init(){if(window[wt]&&(this._data=window[wt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[wt]=t,this._data=t}semantic(){return this._data}},Ut=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[bt]&&(this._data=window[bt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[bt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Ye(this._data,t,e)}childrenOf(t,e){let i=new Set([]);for(let r of e)this.isChild(t,r)&&i.add(r);return i}};var _=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Ht=class extends m{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),h`
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
    `}};customElements.define("photo-sidebar",Ht);var jt=class extends m{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Ge;return h`
    <nav class="header" role="navigation">
      <ul>
        <li @click=${this.broadcast("click-burger-menu")}>
          <a><span class="burger">Ξ</span></a>
        </li>
        <li><a href="/"><span class="brand">${e}</span></a></li>

        <li class="rss-tag" style="float: right">
          <a id="rss" title="rss" href="${this.feedUrl()}">
          <svg alt="rss" width="32px" height="32px">
            <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
            </svg>
          </a>
        </li>

        <li style="float: right">
          <a>
            <span @click=${this.broadcast("switch-theme")} class="brand switch">${t}</span>
          </a>
        </li>

      </ul>
    </nav>
    `}};customElements.define("photo-header",jt);var Vt=class extends m{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return h`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return h`
    <div class="photo">
      <a href="${"#/metadata/"+this.id}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",t)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};customElements.define("app-photo",Vt);var Zt=class extends m{render(){return h`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Zt);var V=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),n=Math.floor(i/r);return t>o*n+1?"lazy":"eager"}};var T=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var zt=class extends m{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),T.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,i)=>h`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${V.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return h`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",zt);var Z=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let o=s.parse(r.created_at);o<e&&(e=o),o>i&&(i=o)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),o=e instanceof Date?e:new Date(parseFloat(e));if(i){let n={day:"numeric",month:"short"},c=r.toLocaleDateString("en-IE",n),a=o.toLocaleDateString("en-IE",n),p=r.toLocaleDateString("en-IE",{day:"numeric"}),g=o.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),$=o.toLocaleDateString("en-IE",{month:"short"}),f=r.getFullYear(),y=o.getFullYear(),C=d===$,z=f===y;return c===a?`${c} ${f}`:C&&z?`${p} - ${g} ${$} ${f}`:`${c} ${f} - ${a} ${y}`}else{let n={year:"numeric",month:"short",day:"numeric"},c=r.toLocaleDateString("en-IE",n),a=o.toLocaleDateString("en-IE",n);return c===a?c:`${c} \u2014 ${a}`}}};var Wt=class extends m{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return Z.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),h`
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>
        <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${this.broadcast("click-album",{id:this.id,title:this.title})}>
    </a>
      <div class="photo-album-metadata">
        <p class="photo-album-title">${this.title}</p>
        <p class="photo-album-date">
          <time>${this.dateRange()}</time>
        </p>
        <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${this.count===1?"photo":"photos"}</p>
        <p class="photo-album-countries">${this.countries.join(" ")}</p>
        </div>

    </div>
    </div>
    `}};customElements.define("photo-album",Wt);var Ft=class extends m{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),T.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),n=Math.floor(i/r);return t>o*n?"lazy":"eager"}render(){return performance.mark("start-albums-render"),h`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let i=this.loadingMode(e);return h`
            <photo-album
              title="${t.title}"
              url="${t.url}"
              thumbnailDataUrl="${t.thumbnailDataUrl}"
              id="${t.id}" count="${t.count}"
              minDate="${t.minDate}"
              maxDate="${t.maxDate}"
              .countries="${t.flags}"
              loading=${i}>
              </photo-album>
            `})}
    </section>
    `}};customElements.define("photo-album-page",Ft);var qt=class extends m{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return h`
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
    `}};customElements.define("app-video",qt);var Qt=class extends m{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?h`<button class="photo-share-button" disabled>[sharing...]</button>`:h`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Qt);var Jt=class extends m{static properties={urn:{type:String}};get placeId(){let t=this.urn?.match(/^urn:ró:unesco:(\d+)$/);return t?t[1]:null}get url(){return this.placeId?`https://whc.unesco.org/en/list/${this.placeId}`:null}render(){return this.placeId?h`
      <a class="unesco-link" href="${this.url}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.placeId}</span>
        <span class="unesco-text-short">UNESCO #${this.placeId}</span>
      </a>
    `:h`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Jt);var Mt=class s{static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){s.setOpenGraph(t)}};var Kt=class extends m{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Mt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),T.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let i={},r=t.filter(o=>o[0]===e.id);for(let[o,n,c]of r)i[n]||(i[n]=[]),i[n].push(c);return{...e,relations:i}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=Z.dateRange(this.minDate,this.maxDate,t.matches),i=this.albumPhotos(),r=i.map((a,p)=>h`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${V.loadingMode(p)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_mosaic_url}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos().map((a,p)=>h`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),n=new Set(i.flatMap(a=>a.relations.location?.filter(p=>p.startsWith("urn:r\xF3:unesco:"))).filter(a=>a)),c=Array.from(n).map(a=>h`<unesco-link urn="${a}"></unesco-link>`);return h`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${gt(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>

        <ul class="unesco-links">
          ${c.map(a=>h`<li>${a}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${r}
      </section>

      <section class="video-container">
        ${o}
      </section>
    </div>
    `}};customElements.define("album-page",Kt);var Xt=class extends m{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?h`<button class="photo-share-button" disabled>[sharing...]</button>`:h`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",Xt);var te=class extends m{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?h`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:h`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",te);var ee=class extends m{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),T.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?h`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?h`<td>Manual aperture control</td>`:h`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?h`${this.exif.focal_length}`:this.exif.focal_length==="0"?h`<td>Manual lens</td>`:h`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?h`<em>${e}</em>`:e.startsWith("urn:r\xF3:unesco")?h`<unesco-link .urn="${e}"></unesco-link>`:t.toLowerCase()==="summary"?h`${gt(e??"")}`:e}renderSemanticData(t){return h`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>h`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,i=this.semantic;return h`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${this.renderSemanticData(i)}

    <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${e.created_at}
      </time></td>
      </tr>
      <tr>
        <th class="exif-heading">Camera Model</th>
        <td>${e.model}</td>
        </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${e.width} x ${e.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength()}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1/${e.exposure_time?Math.round(1/e.exposure_time):"Unknown"}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture()}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${e.iso}</td>
      </tr>
    </table>

    </section>
    `}};customElements.define("metadata-page",ee);var se=class extends m{static get properties(){return{}}connectedCallback(){super.connectedCallback(),T.setIndex()}render(){return h`
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
    `}};customElements.define("about-page",se);var Lt=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),n=Math.floor(i/r),c=t>o*n+1;return t===0?"auto":"none"}};var ie=class extends m{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),T.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,i)=>h`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Lt.loadingMode(i)}"
      ></app-video>`);return h`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("videos-page",ie);var v=new Et,w=new vt,S=new St,M=new Ut,U=new xt,E=new Tt,bs=[[v,l.EAGER],[w,l.EAGER],[S,l.EAGER],[M,l.EAGER],[U,l.EAGER],[E,l.EAGER]],ys={[u.ABOUT]:[[v,l.LAZY],[w,l.LAZY],[S,l.LAZY],[M,l.LAZY],[U,l.LAZY],[E,l.LAZY]],[u.ALBUMS]:[[v,l.EAGER],[w,l.LAZY],[S,l.LAZY],[M,l.LAZY],[U,l.LAZY],[E,l.LAZY]],[u.PHOTOS]:[[v,l.EAGER],[w,l.EAGER],[S,l.EAGER],[M,l.LAZY],[U,l.LAZY],[E,l.LAZY]],[u.VIDEOS]:[[v,l.LAZY],[w,l.LAZY],[S,l.EAGER],[M,l.LAZY],[U,l.LAZY],[E,l.LAZY]],[u.ALBUM]:[[v,l.EAGER],[w,l.EAGER],[S,l.EAGER],[E,l.EAGER],[M,l.LAZY],[U,l.LAZY]],[u.PHOTO]:[[v,l.EAGER],[w,l.EAGER],[S,l.EAGER],[M,l.LAZY],[U,l.EAGER],[E,l.EAGER]],[u.DATE]:[[v,l.EAGER],[w,l.EAGER],[S,l.EAGER],[M,l.LAZY],[U,l.LAZY],[E,l.LAZY]],[u.TAG_ALBUM]:[[v,l.LAZY],[w,l.EAGER],[S,l.EAGER],[M,l.LAZY],[U,l.EAGER],[E,l.EAGER]],[u.TAG]:[[v,l.LAZY],[w,l.EAGER],[S,l.EAGER],[M,l.LAZY],[U,l.EAGER],[E,l.EAGER]],[u.LOCATIONS]:[[v,l.EAGER],[w,l.LAZY],[S,l.LAZY],[M,l.LAZY],[U,l.EAGER],[E,l.EAGER]],[u.METADATA]:[[v,l.LAZY],[w,l.EAGER],[S,l.EAGER],[M,l.EAGER],[U,l.EAGER],[E,l.EAGER]],[u.STATS]:[[v,l.LAZY],[w,l.LAZY],[S,l.LAZY],[M,l.LAZY],[U,l.EAGER],[E,l.EAGER]]},re=class{static async init(){let t=_.getUrl();console.log(`loading ${t?.type}`);let e=ys[t?.type]??bs,i=[];for(let[r,o]of e)o===l.EAGER?i.push(r.init()):o===l.LAZY&&r.init();await Promise.all(i)}};await re.init();var oe=class s extends m{static DEFAULT_PAGE=u.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:u.ALBUM,albums:u.ALBUMS,photos:u.PHOTOS,date:u.DATE,"tag-album":u.TAG_ALBUM,tags:u.TAGS,locations:u.LOCATIONS,stats:u.STATS,metadata:u.METADATA,about:u.ABOUT,videos:u.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=_.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),this.page===u.METADATA||this.page===u.ALBUM||this.page===u.METADATA?this.id=t.id:this.page===u.TAG_ALBUM?this.tag=t.tag:this.page===u.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=u.PHOTOS,this.id=i,this.title=e,_.showAlbumUrl(i)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=u.TAG_ALBUM,this.tag=e,_.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r,tags:o}=t.detail;this.page=u.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,this.tags=o??[],_.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===u.ABOUT?_.showAboutUrl():this.page===u.PHOTOS?_.showPhotosUrl():this.page===u.ALBUMS?_.showAlbumsUrl():this.page===u.TAGS?_.showTagsUrl():this.page===u.LOCATIONS?_.showLocationsUrl():this.page===u.STATS?_.showStatsUrl():this.page===u.PHOTOS?_.showAlbumUrl(this.id):this.page===u.METADATA?_.showMetadataUrl(this.id):this.page===u.DATE?_.showDateUrl(this.date):this.page===u.VIDEOS?_.showVideosUrl():_.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return h`
      <photo-album-page .albums="${v}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===u.ABOUT)return h`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===u.PHOTOS)return h`<photos-page class="${e.join(" ")}" .images=${w}></photos-page>`;if(this.page===u.ALBUM){this.id||console.error("no album id provided");let i=v.albums().find(r=>r.id===this.id);return i||console.error(`failed to find album with id ${this.id}`),h`
      <album-page
        .images=${w}
        .videos=${S}
        .semantic=${E}
        title=${i.album_name}
        id=${this.id}
        minDate=${i.min_date}
        maxDate=${i.max_date}
        imageCount=${i.photos_count}
        description=${i.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===u.METADATA){let i=w.images().find(c=>c.id===this.id),r=U.exif().find(c=>c.id===this.id),o=E.semantic().filter(c=>c[0]===this.id),n={};for(let[c,a,p]of o)n[a]?typeof n[a]=="string"&&(n[a]=[n[a],p]):n[a]=p;return i||console.error(`failed to find photo with id ${this.id}`),h`
      <metadata-page .image=${i} .semantic=${n} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===u.VIDEOS)return h`
      <videos-page .videos=${S} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,i=["photos-app"];this.darkMode?(e.classList.add("dark-mode"),i.push("dark-mode")):e.classList=[];let r=new Be;return h`
    <body>
      <div class="${i.join(" ")}"
        @click-album=${this.receiveClickAlbum}
        @click-tag=${this.receiveClickTag}
        @click-burger-menu=${this.receiveClickBurgerMenu}
        @click-photo-metadata=${this.receiveClickPhotoMetadata}
        @switch-theme=${this.receiveSwitchTheme}
        @navigate-page=${this.receiveNavigatePage}>

        <photo-header .tag=${this.tag} .darkMode=${this.loadDarkMode()}></photo-header>

        <div class="${t.join(" ")}">
            <photo-sidebar visible=${this.sidebarVisible}></photo-sidebar>
            ${this.renderPage(this.sidebarVisible)}
        </div>
      </div>
    </body>
    `}};customElements.define("photo-app",oe);export{bs as DEFAULT_DEPENDENCIES,ys as PAGE_DEPENDECIES,oe as PhotoApp};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=app.js.map
