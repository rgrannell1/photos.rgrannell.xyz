var ct=globalThis,Dt=ct.ShadowRoot&&(ct.ShadyCSS===void 0||ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),ae=new WeakMap,Ct=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Dt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ae.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(e,t))}return t}toString(){return this.cssText}},Xe=i=>new Ct(typeof i=="string"?i:i+"",void 0,xe);var Ze=(i,t)=>{if(Dt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=ct.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},le=Dt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Xe(e)})(i):i,{is:ts,defineProperty:es,getOwnPropertyDescriptor:ss,getOwnPropertyNames:is,getOwnPropertySymbols:rs,getPrototypeOf:ns}=Object,vt=globalThis,ce=vt.trustedTypes,os=ce?ce.emptyScript:"",as=vt.reactiveElementPolyfillSupport,tt=(i,t)=>i,Mt={toAttribute(i,t){switch(t){case Boolean:i=i?os:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},_e=(i,t)=>!ts(i,t),he={attribute:!0,type:String,converter:Mt,reflect:!1,useDefault:!1,hasChanged:_e};Symbol.metadata??=Symbol("metadata"),vt.litPropertyMetadata??=new WeakMap;var P=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=he){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&es(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=ss(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let h=r?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??he}static o(){if(this.hasOwnProperty(tt("elementProperties")))return;let t=ns(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(tt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(tt("properties"))){let e=this.properties,s=[...is(e),...rs(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(le(r))}else t!==void 0&&e.push(le(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ze(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Mt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Mt;this.m=r;let h=o.fromAttribute(e,n.type);this[r]=h??this.T?.get(r)??h,this.m=null}}requestUpdate(t,e,s){if(t!==void 0){let r=this.constructor,n=this[t];if(s??=r.getPropertyOptions(t),!((s.hasChanged??_e)(n,e)||s.useDefault&&s.reflect&&n===this.T?.get(t)&&!this.hasAttribute(r.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:o}=n,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.M(r,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[tt("elementProperties")]=new Map,P[tt("finalized")]=new Map,as?.({ReactiveElement:P}),(vt.reactiveElementVersions??=[]).push("2.1.1");var Rt=globalThis,ht=Rt.trustedTypes,de=ht?ht.createPolicy("lit-html",{createHTML:i=>i}):void 0,Pt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+M,ls=`<${Lt}>`,V=document,st=()=>V.createComment(""),it=i=>i===null||typeof i!="object"&&typeof i!="function",Nt=Array.isArray,Te=i=>Nt(i)||typeof i?.[Symbol.iterator]=="function",It=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,j=RegExp(`>|${It}(?:([^\\s"'>=/]+)(${It}*=${It}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,ge=/"/g,Ie=/^(?:script|style|textarea|title)$/i,Bt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Bt(1),cs=Bt(2),Os=Bt(3),x=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),fe=new WeakMap,H=V.createTreeWalker(V,129);function Ue(i,t){if(!Nt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(t):t}var Ee=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":t===3?"<math>":"",o=Z;for(let h=0;h<e;h++){let a=i[h],c,p,d=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===Z?p[1]==="!--"?o=pe:p[1]!==void 0?o=ue:p[2]!==void 0?(Ie.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=j):p[3]!==void 0&&(o=j):o===j?p[0]===">"?(o=r??Z,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?j:p[3]==='"'?ge:me):o===ge||o===me?o=j:o===pe||o===ue?o=Z:(o=j,r=void 0);let u=o===j&&i[h+1].startsWith("/>")?" ":"";n+=o===Z?a+ls:d>=0?(s.push(c),a.slice(0,d)+Pt+a.slice(d)+M+u):a+M+(d===-2?h:u)}return[Ue(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},rt=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[c,p]=Ee(t,e);if(this.el=i.createElement(c,s),H.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=H.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Pt)){let m=p[o++],u=r.getAttribute(d).split(M),b=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:b[2],strings:u,ctor:b[1]==="."?pt:b[1]==="?"?ut:b[1]==="@"?mt:F}),r.removeAttribute(d)}else d.startsWith(M)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(Ie.test(r.tagName)){let d=r.textContent.split(M),m=d.length-1;if(m>0){r.textContent=ht?ht.emptyScript:"";for(let u=0;u<m;u++)r.append(d[u],st()),H.nextNode(),a.push({type:2,index:++n});r.append(d[m],st())}}}else if(r.nodeType===8)if(r.data===Lt)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(M,d+1))!==-1;)a.push({type:7,index:n}),d+=M.length-1}n++}}static createElement(t,e){let s=V.createElement("template");return s.innerHTML=t,s}};function z(i,t,e=i,s){if(t===x)return t;let r=s!==void 0?e.N?.[s]:e.O,n=it(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.N??=[])[s]=r:e.O=r),r!==void 0&&(t=z(i,r._$AS(i,t.values),r,s)),t}var dt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??V).importNode(e,!0);H.currentNode=r;let n=H.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new wt(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new gt(n,this,t)),this._$AV.push(c),a=s[++h]}o!==a?.index&&(n=H.nextNode(),o++)}return H.currentNode=V,r}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},wt=class Ce{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.D=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),it(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==x&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):Te(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==y&&it(this._$AH)?this._$AA.nextSibling.data=t:this.I(V.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=rt.createElement(Ue(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.V(e);else{let n=new dt(r,this),o=n.R(this.options);n.V(e),this.I(o),this._$AH=n}}_$AC(t){let e=fe.get(t.strings);return e===void 0&&fe.set(t.strings,e=new rt(t)),e}H(t){Nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Ce(this.B(st()),this.B(st()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=z(this,t,e,0),o=!it(t)||t!==this._$AH&&t!==x,o&&(this._$AH=t);else{let h=t,a,c;for(t=n[0],a=0;a<n.length-1;a++)c=z(this,h[s+a],e,a),c===x&&(c=this._$AH[a]),o||=!it(c)||c!==this._$AH[a],c===y?t=y:t!==y&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!r&&this.W(t)}W(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},pt=class extends F{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===y?void 0:t}},ut=class extends F{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},mt=class extends F{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=z(this,t,e,0)??y)===x)return;let s=this._$AH,r=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==y&&(s===y||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},gt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}},hs={q:Pt,J:M,Z:Lt,F:1,G:Ee,K:dt,X:Te,Y:z,tt:wt,st:F,it:ut,et:mt,ht:pt,ot:gt},ds=Rt.litHtmlPolyfillSupport;ds?.(rt,wt),(Rt.litHtmlVersions??=[]).push("3.3.1");var Me=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new wt(t.insertBefore(st(),n),n,void 0,e??{})}return r._$AI(i),r},jt=globalThis;var N=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=Me(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return x}};N._$litElement$=!0,N.finalized=!0,jt.litElementHydrateSupport?.({LitElement:N});var ps=jt.litElementPolyfillSupport;ps?.({LitElement:N});(jt.litElementVersions??=[]).push("4.2.1");var{tt:us}=hs,ms=i=>i===null||typeof i!="object"&&typeof i!="function";var be=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,gs=i=>i?._$litType$?.h!=null;var Oe=i=>i.strings===void 0,$e=()=>document.createComment(""),L=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore($e(),r),o=s.insertBefore($e(),r);e=new us(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let c=a.nextSibling;s.insertBefore(a,r),a=c}}}return e},R=(i,t,e=i)=>(i._$AI(t,e),i),fs={},nt=(i,t=fs)=>i._$AH=t,Ot=i=>i._$AH,Ut=i=>{i._$AR(),i._$AA.remove()},ke=i=>{i._$AR()};var I=i=>(...t)=>({_$litDirective$:i,values:t}),E=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var et=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),et(s,t);return!0},ft=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},De=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ys(t)}};function bs(i){this._$AN!==void 0?(ft(this),this._$AM=i,De(this)):this._$AM=i}function $s(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)et(s[n],!1),ft(s[n]);else s!=null&&(et(s,!1),ft(s));else et(this,i)}var ys=i=>{i.type==2&&(i._$AP??=$s,i._$AQ??=bs)},ot=class extends E{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),De(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(et(this,t),ft(this))}setValue(t){if(Oe(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var bt=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},$t=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var yt=class extends ot{constructor(){super(...arguments),this.ft=new bt(this),this.vt=new $t}render(t,e){return x}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return x;this.yt=e;let r=0,{ft:n,vt:o}=this;return(async(h,a)=>{for await(let c of h)if(await a(c)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.yt!==e)return!1;s!==void 0&&(h=s(h,r)),a.commitValue(h,r),r++}return!0}),x}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},ks=I(yt),Q=I(class extends yt{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.rt=i,super.update(i,t)}commitValue(i,t){t===0&&ke(this.rt);let e=L(this.rt);R(e,i)}}),ye=i=>gs(i)?i._$litType$.h:i.strings,Ds=I(class extends E{constructor(i){super(i),this.bt=new WeakMap}render(i){return[i]}update(i,[t]){let e=be(this.gt)?ye(this.gt):null,s=be(t)?ye(t):null;if(e!==null&&(s===null||e!==s)){let r=Ot(i).pop(),n=this.bt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Me(y,o),n.setConnected(!1),this.bt.set(e,n)}nt(n,[r]),L(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.bt.get(s);if(r!==void 0){let n=Ot(r).pop();ke(i),L(i,void 0,n),nt(i,[n])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var Rs=I(class extends E{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.wt===void 0){this.wt=new Set,i.strings!==void 0&&(this._t=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let r=!!t[s];r===this.wt.has(s)||this._t?.has(s)||(r?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return x}}),vs={},Ps=I(class extends E{constructor(){super(...arguments),this.St=vs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,r)=>s===this.St[r]))return x}else if(this.St===t)return x;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ls=I(class extends E{constructor(){super(...arguments),this.key=y}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(nt(i),this.key=t),e}}),Ns=I(class extends E{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Oe(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===x||t===y)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return x}else if(i.type===4){if(!!t===e.hasAttribute(s))return x}else if(i.type===1&&e.getAttribute(s)===t+"")return x;return nt(i),t}});var Et=new WeakMap,Bs=I(class extends ot{render(i){return y}update(i,[t]){let e=t!==this.lt;return e&&this.lt!==void 0&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=i.options?.host,this.$t(this.xt=i.element)),y}$t(i){if(this.isConnected||(i=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=Et.get(t);e===void 0&&(e=new WeakMap,Et.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,i),i!==void 0&&this.lt.call(this.Et,i)}else this.lt.value=i}get Tt(){return typeof this.lt=="function"?Et.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),ve=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},js=I(class extends E{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let h of i)r[o]=s?s(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Ct(i,t,e).values}update(i,[t,e,s]){let r=Ot(i),{values:n,keys:o}=this.Ct(t,e,s);if(!Array.isArray(r))return this.Pt=o,n;let h=this.Pt??=[],a=[],c,p,d=0,m=r.length-1,u=0,b=n.length-1;for(;d<=m&&u<=b;)if(r[d]===null)d++;else if(r[m]===null)m--;else if(h[d]===o[u])a[u]=R(r[d],n[u]),d++,u++;else if(h[m]===o[b])a[b]=R(r[m],n[b]),m--,b--;else if(h[d]===o[b])a[b]=R(r[d],n[b]),L(i,a[b+1],r[d]),d++,b--;else if(h[m]===o[u])a[u]=R(r[m],n[u]),L(i,r[d],r[m]),m--,u++;else if(c===void 0&&(c=ve(o,u,b),p=ve(h,d,m)),c.has(h[d]))if(c.has(h[m])){let A=p.get(o[u]),B=A!==void 0?r[A]:null;if(B===null){let lt=L(i,r[d]);R(lt,n[u]),a[u]=lt}else a[u]=R(B,n[u]),L(i,r[d],B),r[A]=null;u++}else Ut(r[m]),m--;else Ut(r[d]),d++;for(;u<=b;){let A=L(i,a[b+1]);R(A,n[u]),a[u++]=A}for(;d<=m;){let A=r[d++];A!==null&&Ut(A)}return this.Pt=o,nt(i,a),x}}),Re="important",ws=" !"+Re,Hs=I(class extends E{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Mt.add(s);let n=typeof r=="string"&&r.endsWith(ws);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?Re:""):e[s]=r}}return x}}),Vs=I(class extends E{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?x:(this.At=i,document.importNode(i.content,!0))}}),Y=class extends E{constructor(t){if(super(t),this.gt=y,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===y||t==null)return this.kt=void 0,this.gt=t;if(t===x)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Y.directiveName="unsafeHTML",Y.resultType=1;var St=I(Y);var at=class extends Y{};at.directiveName="unsafeSVG",at.resultType=2;var zs=I(at),we=i=>!ms(i)&&typeof i.then=="function",Se=1073741823;var kt=class extends ot{constructor(){super(...arguments),this.Ot=Se,this.Ut=[],this.ft=new bt(this),this.vt=new $t}render(...t){return t.find(e=>!we(e))??x}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Ot);h++){let a=e[h];if(!we(a))return this.Ot=h,a;h<r&&a===s[h]||(this.Ot=Se,r=0,Promise.resolve(a).then(async c=>{for(;o.get();)await o.get();let p=n.deref();if(p!==void 0){let d=p.Ut.indexOf(a);d>-1&&d<p.Ot&&(p.Ot=d,p.setValue(c))}}))}return x}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Fs=I(kt);var Ss=Symbol.for(""),As=i=>{if(i?.r===Ss)return i?._$litStatic$};var Ae=new Map,Pe=i=>(t,...e)=>{let s=e.length,r,n,o=[],h=[],a,c=0,p=!1;for(;c<s;){for(a=t[c];c<s&&(n=e[c],(r=As(n))!==void 0);)a+=r+t[++c],p=!0;c!==s&&h.push(n),o.push(a),c++}if(c===s&&o.push(t[s]),p){let d=o.join("$$lit$$");(t=Ae.get(d))===void 0&&(o.raw=o,Ae.set(d,t=o)),e=h}return i(t,...e)},qs=Pe(l),Gs=Pe(cs);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var g=class extends N{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Le=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(i){return this.#e.has(i)?this.#e.get(i):(this.#e.set(i,this.#t),this.#s.set(this.#t,i),this.#t++,this.#t-1)}setIndex(i,t){this.#e.set(i,t),this.#s.set(t,i)}getIndex(i){return this.#e.get(i)}getValue(i){return this.#s.get(i)}has(i){return this.#e.has(i)}},Ne=class{static intersection(i,t){if(t.length===0)return new Set;t.sort((s,r)=>s.size-r.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let r=t[s];for(let n of e)i.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},Be=class{stringIndex;constructor(){this.stringIndex=new Le}parseTriple(i){let t=i.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${i}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),s=this.stringIndex.getValue(parseInt(t[2],10)),r=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||s===void 0||r===void 0)throw new SyntaxError(`Invalid triple reference: ${i}`);return[e,s,r]}parseDeclaration(i){let t=i.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${i}`);let e=t[1],s=t[2];this.stringIndex.setIndex(s,parseInt(e,10))}parse(i){if(/^(\d+)\s(\d+)\s(\d+)$/.test(i))return this.parseTriple(i);this.parseDeclaration(i)}};function _(i,t="r\xF3"){if(!i.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${i}`);let e=i.split(":")[2],[s,r]=i.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function C(i,t="r\xF3"){try{return _(i,t)}catch{return{type:"unknown",id:i,qs:{}}}}var xs=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},_s=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Ts=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(i){this.indexedTriples=[],this.stringIndex=new Le,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(i),this.metrics=new xs}add(i){let t=this.indexedTriples.length;for(let e=0;e<i.length;e++){let s=t+e,r=i[e],n=this.stringUrn.has(r[0])?this.stringUrn.get(r[0]):this.stringUrn.set(r[0],C(r[0])).get(r[0]),o=r[1],h=this.stringUrn.has(r[2])?this.stringUrn.get(r[2]):this.stringUrn.set(r[2],C(r[2])).get(r[2]),a=this.stringIndex.add(n.type),c=this.stringIndex.add(n.id),p=this.stringIndex.add(o),d=this.stringIndex.add(h.type),m=this.stringIndex.add(h.id);this.indexedTriples.push([this.stringIndex.add(r[0]),p,this.stringIndex.add(r[2])]),this.sourceType.has(a)||this.sourceType.set(a,new Set),this.sourceType.get(a).add(s),this.sourceId.has(c)||this.sourceId.set(c,new Set),this.sourceId.get(c).add(s);for(let[u,b]of Object.entries(n.qs)){let A=this.stringIndex.add(`${u}=${b}`);this.sourceQs.has(A)||this.sourceQs.set(A,new Set),this.sourceQs.get(A).add(s)}this.relations.has(p)||this.relations.set(p,new Set),this.relations.get(p).add(s),this.targetType.has(d)||this.targetType.set(d,new Set),this.targetType.get(d).add(s),this.targetId.has(m)||this.targetId.set(m,new Set),this.targetId.get(m).add(s);for(let[u,b]of Object.entries(h.qs)){let A=this.stringIndex.add(`${u}=${b}`);this.targetQs.has(A)||this.targetQs.set(A,new Set),this.targetQs.get(A).add(s)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([i,t,e])=>[this.stringIndex.getValue(i),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(i){if(i<0||i>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[i];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(i){if(!(i<0||i>=this.indexedTriples.length))return this.indexedTriples[i]}getSourceTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},O=class{static source(i){return i[0]}static relation(i){return i[1]}static target(i){return i[2]}};function Is(i,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let r=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let c=t.rows[a][2];r.has(c)||r.set(c,[]),r.get(c).push(a)}for(let a=0;a<e.rows.length;a++){let c=e.rows[a][0];n.has(c)||n.set(c,[]),n.get(c).push(a)}let o=Ne.intersection(i,[new Set(r.keys()),new Set(n.keys())]),h=[];for(let a of o){let c=n.get(a),p=r.get(a);for(let d of c)for(let m of p){let u=t.rows[d].concat(e.rows[m]);h.push(u)}}return{names:s,rows:h}}var je=class q{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new Ts(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new _s;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}clone(){let t=new q([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new q(t)}static from(t){let e=[];for(let s of t){let{id:r,...n}=s;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,h]of Object.entries(n))if(Array.isArray(h))for(let a of h)e.push([r,o,a]);else e.push([r,o,h])}return new q(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new q(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new q(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?O.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?O.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?O.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(O.source))}relations(){return new Set(this.index.triples().map(O.relation))}targets(){return new Set(this.index.triples().map(O.target))}objects(t=!1){let e=[];for(let[s,r]of Object.entries(this.object(t)))r.id=s,e.push(r);return e}object(t=!1){let e={};for(let[s,r,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][r]?Array.isArray(e[s][r])?e[s][r].push(n):e[s][r]=[e[s][r],n]:e[s][r]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:r,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let c of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,c)&&!o.includes(c))throw new Error(`Unexpected search parameter: ${c}`);if(s){if(s.type){let c=this.index.getSourceTypeSet(s.type);if(c)e.push(c);else return new Set}if(s.id){let c=this.index.getSourceIdSet(s.id);if(c)e.push(c);else return new Set}if(s.qs)for(let[c,p]of Object.entries(s.qs)){let d=this.index.getSourceQsSet(c,p);if(d)e.push(d);else return new Set}}if(n){if(n.type){let c=this.index.getTargetTypeSet(n.type);if(c)e.push(c);else return new Set}if(n.id){let c=this.index.getTargetIdSet(n.id);if(c)e.push(c);else return new Set}if(n.qs)for(let[c,p]of Object.entries(n.qs)){let d=this.index.getTargetQsSet(c,p);if(d)e.push(d);else return new Set}}if(r){let c=typeof r=="string"?{relation:[r]}:r;if(c.relation){let p=new Set;for(let d of c.relation){let m=this.index.getRelationSet(d);if(m)for(let u of m)p.add(u)}if(p.size>0)e.push(p);else return new Set}}let h=Ne.intersection(this.metrics,e),a=new Set;for(let c of h){let p=this.index.getTriple(c);if(!s?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){a.add(c);continue}let d=!0;s?.predicate&&(d=d&&s.predicate(O.source(p))),n?.predicate&&(d=d&&n.predicate(O.target(p))),typeof r=="object"&&r.predicate&&(d=d&&r.predicate(O.relation(p))),d&&a.add(c)}return a}search(t){let e=[];for(let s of this.#t(t)){let r=this.index.getTriple(s);r&&e.push(r)}return new q(e)}search2(t){let e=Object.entries(t),s=[];for(let h=0;h<e.length-2;h+=2){let a=e.slice(h,h+3),c={source:a[0][1],relation:a[1][1],target:a[2][1]},p=a.map(u=>u[0]),d=this.#t(c),m=Array.from(d).flatMap(u=>{let b=this.index.getTripleIndices(u);return typeof b>"u"?[]:[b]});s.push({names:p,rows:m})}let r=s.reduce(Is.bind(this,this.metrics)),n=r.names,o=[];for(let h of r.rows){let a={};for(let c=0;c<n.length;c++){let p=n[c];a[p]=this.index.stringIndex.getValue(h[c])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var Us=window.envConfig,At=class{constructor(t=`/manifest/tribbles.${Us.publication_id}.txt`){this.url=t}async*stream(){let t=new Be,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let s=new TextDecoderStream,r=e.body.pipeThrough(s).getReader(),n="";for(;;){let{value:o,done:h}=await r.read();if(h)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let c of a){let p=t.parse(c);p!==void 0&&(yield p)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var fi=Symbol("the albums manifest"),bi=Symbol("the images manifest"),$i=Symbol("the site manifest"),yi=Symbol("the videos manifest"),vi=Symbol("the semantic data"),wi=Symbol("the album stats"),Si=Symbol("the triples data");var He="photos";var f=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},$=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},v=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia";static CREATED_AT="created_at";static F_STOP="f_stop";static FOCAL_LENGTH="focal_length";static MODEL="model";static EXPOSURE_TIME="exposure_time";static ISO="iso";static WIDTH="width";static HEIGHT="height"},Ve=new Set(["created_at","f_stop","focal_length","model","exposure_time","iso","width","height"]),G=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var k=class i{static{this.ROUTES={[f.PHOTOS]:this.showPhotosUrl,[f.ALBUMS]:this.showAlbumsUrl,[f.ALBUM]:this.showAlbumUrl,[f.METADATA]:this.showMetadataUrl,[f.ABOUT]:this.showAboutUrl,[f.VIDEOS]:this.showVideosUrl,[f.THING]:this.showThingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":f.ALBUMS,"#/album":f.ALBUM,"#/metadata":f.METADATA,"#/about":f.ABOUT,"#/videos":f.VIDEOS,"#/thing":f.THING,"#/photos":f.PHOTOS}}static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return i.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static{this.ID_PAGES=new Set([f.ALBUM,f.METADATA,f.THING])}static getUrl(){let t=window.location.hash;for(let[e,s]of Object.entries(i.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let r={type:s};return i.ID_PAGES.has(s)&&(r.id=t.split("/")[2]),r}return{type:f.ALBUMS}}};var Ht=class extends g{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",Ht);var Vt=class extends g{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=He;return l`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${e}</span></a></li>

      <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
      <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
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
    `}};customElements.define("photo-header",Vt);var xt=new Map,U=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(xt.has(t))return xt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");if(!r){console.error("context missing, cannot render colours");return}return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),xt.set(t,s.toDataURL("image/png")),xt.get(t)}};var zt=class extends g{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let t=this.id.startsWith("urn:")?_(this.id).id:this.id,e={id:t,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:U.encodeBitmapDataURL(this.mosaicColours)},s=document.createElement("div");s.innerHTML=this.summary??"";let r=s.textContent??s.innerText??"";return l`
    <div class="photo">
      <a href="${"#/metadata/"+t}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",e)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${e.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          alt=${r}
          title=${r}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};customElements.define("app-photo",zt);var T=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Ft=class extends g{static get properties(){return{triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),T.setIndex()}allImages(){return this.triples.search({source:{type:"photo"},relation:{relation:["thumbnail_url","mosaic_colours","full_image"]},target:{type:"unknown"}}).objects().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`
          <app-photo
            id=${C(r.id).id}
            loading="${U.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${Q(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",Ft);var qt=class extends g{static get properties(){return{albums:{type:Array}}}render(){let t=document.getElementById("stats-data"),e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${e.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",qt);var K=class{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),c=r.toLocaleDateString("en-IE",{day:"numeric"}),p=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),m=n.toLocaleDateString("en-IE",{month:"short"}),u=r.getFullYear(),b=n.getFullYear(),A=d===m,B=u===b;return h===a?`${h} ${u}`:A&&B?`${c} - ${p} ${m} ${u}`:`${h} ${u} - ${a} ${b}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Es=window.envConfig,w=class{static isUrnSource(t){return S.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return S.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},S=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},W=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:v.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=_(e);return t.search({source:{id:s},relation:v.BIRDWATCH_URL}).firstTarget()}},J=class{static details(t,e){let s=t.search({source:{type:"country"},relation:{relation:[v.NAME,v.FLAG]}}),r=s.search({relation:v.NAME,target:{id:e}}).firstSource(),n=_(r),o=s.search({source:n,relation:v.FLAG}).firstTarget();return{urn:r,name:e,flag:o}}static urnDetails(t,e){let s=_(e),r=t.search({source:{type:"country",id:s.id},relation:v.NAME}).firstTarget();return{urn:e,name:r}}};function qe(i){return w.getRelation(i)!==v.RATING?[i]:[[w.getSource(i),w.getRelation(i),`urn:r\xF3:rating:${encodeURIComponent(w.getTarget(i))}`]]}function Ge(i){if(w.getRelation(i)!==v.COUNTRY)return[i];let e=`urn:r\xF3:country:${w.getTarget(i).toLowerCase().replace(" ","-")}`;return[[w.getSource(i),w.getRelation(i),e]]}var ze=/^\[([^\:]*):(.*)\]$/;function Fe(i,t){if(typeof t!="string"||!ze.test(t))return t;let e=t.match(ze);if(!e)return t;let s=e[1],r=e[2];return i[s]?`${i[s]}${r}`:t}function We(i,t){let[e,s,r]=t;return[[Fe(i,e),s,Fe(i,r)]]}function Ye(i){for(let t of["thumbnail_url","full_image","poster_url","video_url_1080p","video_url_480p","video_url_720p","video_url_unscaled"])if(w.getRelation(i)===t)return[[w.getSource(i),t,`${Es.photos_url}${w.getTarget(i)}`]];return[i]}function Qe(i){return w.getRelation(i)!==v.BIRDWATCH_URL?[i]:[[w.getSource(i),v.BIRDWATCH_URL,`https://birdwatchireland.ie/birds/${w.getTarget(i)}`]]}function Ke(i){let[t,e,s]=i;return[[t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,s.startsWith("::")?`urn:r\xF3:${s.slice(2)}`:s]]}var Gt=class extends g{static get properties(){return{title:{type:String},triples:{type:Object,state:!0},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return K.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=J.details(this.triples,t),r=_(s);return l`<span href="#/thing/country:${r.id}" title=${t}>${e}</span>`})}render(){performance.mark(`start-album-render-${this.url}`);let t=U.encodeBitmapDataURL(this.mosaicColours),e=this.renderCountries(),s=_(this.id);return l`
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
        <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${this.broadcast("click-album",{id:s.id,title:this.title})}>
    </a>
      <div class="photo-album-metadata">
        <p class="photo-album-title">${this.title}</p>
        <p class="photo-album-date" data-min-date=${this.minDate}>
          <time>${this.dateRange()}</time>
        </p>
        <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${this.count===1?"photo":"photos"}</p>
        <p class="photo-album-countries">${e}</p>
        </div>

    </div>
    </div>
    `}};customElements.define("photo-album",Gt);var Wt=class extends g{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,r=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,r.push(e[a])),e[a].position.top===s)r.push(e[a]);else break;let n=Math.min(...r.map(a=>a.minDate)),h=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&h!=="Invalid Date"&&(t.textContent=h)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let r=s.getAttribute("data-min-date");return r?[{position:s.getBoundingClientRect(),minDate:parseInt(r,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};customElements.define("year-cursor",Wt);var Yt=class extends g{static get properties(){return{albums:{type:Object},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),T.setIndex()}getAlbums(){return this.triples.search({source:{type:"album"}}).objects().map(t=>({title:t.name,minDate:parseInt(t.min_date),maxDate:parseInt(t.max_date),url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:t.photos_count,flags:t.flags}))}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){let s=2e3,r=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],h=U.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==s&&(s=a,a!==r&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),n%4===0&&await new Promise(c=>setTimeout(c,0)),yield l`
          <photo-album
            .triples=${this.triples}
            title="${o.title}"
            url="${o.url}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}" count="${o.count}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
            loading=${h}>
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${Q(e.bind(this)())}
    </section>
    `}};customElements.define("albums-page",Yt);var Qt=class extends g{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",Qt);var Kt=class extends g{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Kt);var Jt=class extends g{static{this.properties={urn:{type:String}}}id(){return S.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Jt);var Xt=class extends g{static{this.properties={urn:{type:String},triples:{type:Array}}}name(){let{type:t,id:e}=S.parseUrn(this.urn);if(G.has(t))return l`<span>${W.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:S.parseUrn(this.urn),relation:v.NAME}).firstTarget();return s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=S.parseUrn(this.urn);return{[$.BIRD]:"bird-link",[$.MAMMAL]:"mammal-link",[$.REPTILE]:"reptile-link",[$.AMPHIBIAN]:"amphibian-link",[$.FISH]:"fish-link",[$.INSECT]:"insect-link"}[t]??""}render(){return S.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${S.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",Xt);var Zt=class extends g{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},triples:{type:Object,state:!0},countries:{type:String}}}connectedCallback(){super.connectedCallback(),T.setIndex()}albumPhotos(t){let e=t.search({source:{type:"photo"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let r=t.search({source:_(s)}).firstObject();return r?[r]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let r=t.search({source:_(s)}).firstObject();return r?[r]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[$.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o[v.LOCATION]?.filter(h=>S.is(h,n))).filter(o=>o)));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o[v.SUBJECT]?.filter(h=>S.is(h,n))).filter(o=>o)));let r=[];r=r.concat(e[$.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[$.BIRD,$.MAMMAL,$.REPTILE,$.FISH,$.AMPHIBIAN,$.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=K.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,c)=>l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${U.loadingMode(c)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos(t).map((a,c)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),h=this?.countries.split(",").map(a=>{let{flag:c,urn:p}=J.details(this.triples,a),d=_(p);return l`<span href="#/thing/country:${d.id}" title=${a}>${c}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${h}</p>
        <p class="photo-album-description">${St(this.description)}
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
    `}};customElements.define("album-page",Zt);var te=class extends g{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",te);var ee=class extends g{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",ee);function X(i){return l`<th class="exif-heading">${i}</th>`}var se=class extends g{static get properties(){return{id:{type:String},image:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),T.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:t.f_stop?l`<td>ƒ/${t.f_stop}</td>`:l`<td>Unknown</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:t.focal_length?l`<td>${t.focal_length}mm equiv.</td>`:l`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${St(e??"")}`;if(S.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(S.isUrn(e)&&S.is(e,$.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(S.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>w.getRelation(e).localeCompare(w.getRelation(s))).filter(e=>!this.isIgnoredKey(w.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(w.getRelation(e))}</th>
              <td>${this.renderSemanticValue(w.getRelation(e),w.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?l`
      ${X("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:l`
      ${X("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?l`
        ${X("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:l`
      ${X("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutter_speed=="number"?l`
        ${X("Shutter Speed")}
        <td>1/${Math.round(1/t.shutter_speed)}</td>`:l`
      ${X("Shutter Speed")}
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
    `}render(){let t=this.image,e=t.album_id,s=this.triples,r=s.search({source:{id:_(t.id).id},relation:{predicate:n=>{let o=new Set(["album_id","full_image","mosaic_colours","thumbnail_url"]);return!Ve.has(n)&&!o.has(n)}}}).triples();return l`
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
    `}};customElements.define("metadata-page",se);var ie=class extends g{static get properties(){return{}}connectedCallback(){super.connectedCallback(),T.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",ie);var re=class extends g{static get properties(){return{urn:{type:String},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),T.setIndex()}urnImages(t,e){let r=t.search(e).sources();return Array.from(r).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let h=t.search({source:C(n)}).firstObject();return h?[h]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return o?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,s)=>s.created_at-e.created_at).map((e,s)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?_(e.id).id:e.id}
        loading="${U.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        mosaicColours="${e.mosaic_colours}"
        imageUrl="${e.full_image}"></app-photo>`)}getAlbums(){return this.triples.search({source:{type:"album"}}).objects()}renderSubjectAlbums(t,e){let s=this.urnImages(t,e),r=new Set(s.map(n=>n.album_id));return Array.from(r).flatMap(n=>this.getAlbums().filter(o=>_(o.id).id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>l`
          <photo-album
            .triples=${this.triples}
            title="${n.name}"
            url="${n.thumbnail_url}"
            mosaicColours="${n.mosaic}"
            id="${n.id}"
            count="${n.photos_count}"
            minDate="${n.min_date}"
            maxDate="${n.max_date}"
            countries="${n.flags}"
            loading="eager">
            </photo-album>
      `)}firstPhotographed(t,e,s){let n=this.urnImages(e,s).sort((o,h)=>o.created_at-h.created_at)[0];return n?new Date(parseInt(n.created_at)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=S.parseUrn(this.urn),s=this.triples.search({source:{id:t,type:e},relation:v.NAME}).firstTarget();if(s)return s;try{let r=S.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:G.has(r.type)?W.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(G.has(t.type))for(let r of["captivity","wild"]){let o={...t,qs:{context:r}};s.push({label:r,query:{target:o}})}else s.push({label:"default",query:{target:t}});return s}renderPhotoSection(t){return l`<div>
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
    <div/>`}render(){let t=this.triples,e=t.search({source:{type:"photo"}}).objects(),s=S.parseUrn(this.urn),r=s.type,n=t.search({source:C(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let D=n.fcode_name;o["Place Type"]=l`${D.charAt(0).toUpperCase()}${D.slice(1)}`}G.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:C(this.urn)})}</span>`);let h=n[v.WIKIPEDIA],a=n[v.BIRDWATCH_URL],c=n[v.LONGITUDE],p=n[v.LATITUDE],d;if(c&&p){let D=`https://www.google.com/maps?q=${p},${c}`;d=l`
      <a href="${D}" target="_blank" rel="noopener">[maps]</a>
      `}let m=C(this.urn);m.id==="*"&&delete m.id;let u={target:m},b=this.getPhotoQueries(C(this.urn)),A={};for(let{query:D,label:Tt}of b){let Je=this.urnImages(t,D);A[Tt]=this.renderSubjectPhotos(Je)}let B=this.renderSubjectAlbums(t,u),lt=this.renderPhotoSection(A);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${G.has(r)&&s.id!=="*"?l`<span class="thing-binomial">(${W.pretty(s.id)})</span>`:l``}
        </p>
        <br>

        ${h?l`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([D,Tt])=>l`
          <tr>
            <th class="exif-heading">${D}</th>
            <td>${Tt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${lt}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${B}
        </section>

      </div>
    `}};customElements.define("thing-page",re);var _t=class{static loadingMode(t){return t===0?"auto":"none"}};var ne=class extends g{static get properties(){return{triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),T.setIndex()}getVideos(){return this.triples.search({source:{type:"video"}}).objects()}render(){let t=this.getVideos();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`<app-video
          id=${r.id}
          url_poster=${r.poster_url}
          url_unscaled=${r.video_url_unscaled}
          url_1080p=${r.video_url_1080p}
          url_720p=${r.video_url_720p}
          url_480p=${r.video_url_480p}
          preload="${_t.loadingMode(s)}"
        ></app-video>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${Q(e())}
      </section>
    </div>
    `}};customElements.define("videos-page",ne);function Cs(i,t){let e=[Ke,qe,Ge,Ye,Qe,We.bind(null,i)],s=[t];for(let r of e)s=s.flatMap(r);return s}var Ms=new At,oe=class i extends g{static{this.DEFAULT_PAGE=f.ALBUMS}static{this.LOCATION_TYPE_TO_PAGE={album:f.ALBUM,albums:f.ALBUMS,photos:f.PHOTOS,metadata:f.METADATA,about:f.ABOUT,videos:f.VIDEOS,thing:f.THING}}static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean},tribbleDB:{type:Object,state:!0,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,window.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new je([]));let e={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"};for await(let s of Ms.stream())t.push(...[s].flatMap(Cs.bind(null,e))),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=k.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),k.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=f.PHOTOS,this.id=s,this.title=e,k.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=f.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,k.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=k.router(this.page);e||console.error(`no router found for page ${this.page}`),k.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page===f.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===f.PHOTOS)return l`<photos-page .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page===f.ALBUM){this.id||console.error("no album id provided");let s=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return s||console.error(`failed to find album with id ${this.id}`),l`
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
      `}if(this.page===f.METADATA){let s=this.tribbleDB.search({source:{type:"photo",id:this.id}}).firstObject();return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===f.VIDEOS)return l`
      <videos-page .triples=${this.tribbleDB} class="${e}"></videos-page>
      `;if(this.page===f.THING)return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .triples=${this.tribbleDB}
        class="${e}"></thing-page>
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
    `}};customElements.define("photo-app",oe);export{oe as PhotoApp};
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
