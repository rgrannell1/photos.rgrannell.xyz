var X=globalThis,kt=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ve=Symbol(),ae=new WeakMap,Et=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(kt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ae.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(e,t))}return t}toString(){return this.cssText}},je=i=>new Et(typeof i=="string"?i:i+"",void 0,ve);var Ge=(i,t)=>{if(kt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=X.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}},re=kt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return je(e)})(i):i,{is:Ye,defineProperty:Ve,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:ze,getOwnPropertySymbols:Ze,getPrototypeOf:We}=Object,ct=globalThis,oe=ct.trustedTypes,qe=oe?oe.emptyScript:"",Je=ct.reactiveElementPolyfillSupport,F=(i,t)=>i,xt={toAttribute(i,t){switch(t){case Boolean:i=i?qe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},we=(i,t)=>!Ye(i,t),ne={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:we};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=ne){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Ve(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:r}=Fe(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return a?.call(this)},set(o){let d=a?.call(this);r.call(this,o),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ne}static o(){if(this.hasOwnProperty(F("elementProperties")))return;let t=We(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(F("properties"))){let e=this.properties,s=[...ze(e),...Ze(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(re(a))}else t!==void 0&&e.push(re(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ge(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:xt).toAttribute(e,s.type);this.m=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let r=s.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xt;this.m=a,this[a]=o.fromAttribute(e,r.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??we)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,r]of this.v)this[a]=r;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,r]of s)r.wrapped!==!0||this._$AL.has(a)||this[a]===void 0||this.T(a,this[a],r)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[F("elementProperties")]=new Map,O[F("finalized")]=new Map,Je?.({ReactiveElement:O}),(ct.reactiveElementVersions??=[]).push("2.0.4");var Lt=globalThis,tt=Lt.trustedTypes,le=tt?tt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Mt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+M,Ke=`<${Ct}>`,B=document,Z=()=>B.createComment(""),W=i=>i===null||typeof i!="object"&&typeof i!="function",_e=Array.isArray,Se=i=>_e(i)||typeof i?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ce=/>/g,I=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,pe=/"/g,Ee=/^(?:script|style|textarea|title)$/i,xe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),n=xe(1),Qe=xe(2),y=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ue=new WeakMap,R=B.createTreeWalker(B,129);function Te(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(t):t}var Ue=(i,t)=>{let e=i.length-1,s=[],a,r=t===2?"<svg>":"",o=V;for(let d=0;d<e;d++){let l=i[d],m,f,p=-1,b=0;for(;b<l.length&&(o.lastIndex=b,f=o.exec(l),f!==null);)b=o.lastIndex,o===V?f[1]==="!--"?o=he:f[1]!==void 0?o=ce:f[2]!==void 0?(Ee.test(f[2])&&(a=RegExp("</"+f[2],"g")),o=I):f[3]!==void 0&&(o=I):o===I?f[0]===">"?(o=a??V,p=-1):f[1]===void 0?p=-2:(p=o.lastIndex-f[2].length,m=f[1],o=f[3]===void 0?I:f[3]==='"'?pe:de):o===pe||o===de?o=I:o===he||o===ce?o=V:(o=I,a=void 0);let g=o===I&&i[d+1].startsWith("/>")?" ":"";r+=o===V?l+Ke:p>=0?(s.push(m),l.slice(0,p)+Mt+l.slice(p)+M+g):l+M+(p===-2?d:g)}return[Te(i,r+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},q=class i{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let r=0,o=0,d=t.length-1,l=this.parts,[m,f]=Ue(t,e);if(this.el=i.createElement(m,s),R.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=R.nextNode())!==null&&l.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(Mt)){let b=f[o++],g=a.getAttribute(p).split(M),v=/([.?@])?(.*)/.exec(b);l.push({type:1,index:r,name:v[2],strings:g,ctor:v[1]==="."?st:v[1]==="?"?it:v[1]==="@"?at:j}),a.removeAttribute(p)}else p.startsWith(M)&&(l.push({type:6,index:r}),a.removeAttribute(p));if(Ee.test(a.tagName)){let p=a.textContent.split(M),b=p.length-1;if(b>0){a.textContent=tt?tt.emptyScript:"";for(let g=0;g<b;g++)a.append(p[g],Z()),R.nextNode(),l.push({type:2,index:++r});a.append(p[b],Z())}}}else if(a.nodeType===8)if(a.data===Ct)l.push({type:2,index:r});else{let p=-1;for(;(p=a.data.indexOf(M,p+1))!==-1;)l.push({type:7,index:r}),p+=M.length-1}r++}}static createElement(t,e){let s=B.createElement("template");return s.innerHTML=t,s}};function H(i,t,e=i,s){if(t===y)return t;let a=s!==void 0?e.U?.[s]:e.N,r=W(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(i),a._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=a:e.N=a),a!==void 0&&(t=H(i,a._$AS(i,t.values),a,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??B).importNode(e,!0);R.currentNode=a;let r=R.nextNode(),o=0,d=0,l=s[0];for(;l!==void 0;){if(o===l.index){let m;l.type===2?m=new dt(r,r.nextSibling,this,t):l.type===1?m=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(m=new rt(r,this,t)),this._$AV.push(m),l=s[++d]}o!==l?.index&&(r=R.nextNode(),o++)}return R.currentNode=B,a}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},dt=class ke{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,a){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.V=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),W(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Se(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==$&&W(this._$AH)?this._$AA.nextSibling.data=t:this.j(B.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Te(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.R(e);else{let r=new et(a,this),o=r.O(this.options);r.R(e),this.j(o),this._$AH=r}}_$AC(t){let e=ue.get(t.strings);return e===void 0&&ue.set(t.strings,e=new q(t)),e}D(t){_e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let r of t)a===e.length?e.push(s=new ke(this.H(Z()),this.H(Z()),this,this.options)):s=e[a],s._$AI(r),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,a){let r=this.strings,o=!1;if(r===void 0)t=H(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{let d=t,l,m;for(t=r[0],l=0;l<r.length-1;l++)m=H(this,d[s+l],e,l),m===y&&(m=this._$AH[l]),o||=!W(m)||m!==this._$AH[l],m===$?t=$:t!==$&&(t+=(m??"")+r[l+1]),this._$AH[l]=m}o&&!a&&this.B(t)}B(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends j{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===$?void 0:t}},it=class extends j{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},at=class extends j{constructor(t,e,s,a,r){super(t,e,s,a,r),this.type=5}_$AI(t,e=this){if((t=H(this,t,e,0)??$)===y)return;let s=this._$AH,a=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==$&&(s===$||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}},Xe={W:Mt,q:M,J:Ct,Z:1,F:Ue,G:et,K:Se,X:H,Y:dt,tt:j,st:it,it:at,et:st,ot:rt},ts=Lt.litHtmlPolyfillSupport;ts?.(q,dt),(Lt.litHtmlVersions??=[]).push("3.1.3");var Le=(i,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let r=e?.renderBefore??null;s._$litPart$=a=new dt(t.insertBefore(Z(),r),r,void 0,e??{})}return a._$AI(i),a};var P=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Le(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var es=globalThis.litElementPolyfillSupport;es?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ss}=Xe,is=i=>i===null||typeof i!="object"&&typeof i!="function";var me=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,as=i=>i?._$litType$?.h!=null;var Me=i=>i.strings===void 0,ge=()=>document.createComment(""),D=(i,t,e)=>{let s=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(ge(),a),o=s.insertBefore(ge(),a);e=new ss(r,o,i,i.options)}else{let r=e._$AB.nextSibling,o=e._$AM,d=o!==i;if(d){let l;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(l=i._$AU)!==o._$AU&&e._$AP(l)}if(r!==a||d){let l=e._$AA;for(;l!==r;){let m=l.nextSibling;s.insertBefore(l,a),l=m}}}return e},C=(i,t,e=i)=>(i._$AI(t,e),i),rs={},J=(i,t=rs)=>i._$AH=t,Tt=i=>i._$AH,_t=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Ce=i=>{i._$AR()};var x=i=>(...t)=>({_$litDirective$:i,values:t}),U=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var z=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),z(s,t);return!0},ot=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Oe=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ls(t)}};function os(i){this._$AN!==void 0?(ot(this),this._$AM=i,Oe(this)):this._$AM=i}function ns(i,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)z(s[r],!1),ot(s[r]);else s!=null&&(z(s,!1),ot(s));else z(this,i)}var ls=i=>{i.type==2&&(i._$AP??=ns,i._$AQ??=os)},K=class extends U{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Oe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(z(this,t),ot(this))}setValue(t){if(Me(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var nt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},lt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var ht=class extends K{constructor(){super(...arguments),this.dt=new nt(this),this.ft=new lt}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let a=0,{dt:r,ft:o}=this;return(async(d,l)=>{for await(let m of d)if(await l(m)===!1)return})(e,async d=>{for(;o.get();)await o.get();let l=r.deref();if(l!==void 0){if(l.vt!==e)return!1;s!==void 0&&(d=s(d,a)),l.commitValue(d,a),a++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},fs=x(ht),bs=x(class extends ht{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Ce(this.ht);let e=D(this.ht);C(e,i)}}),fe=i=>as(i)?i._$litType$.h:i.strings,$s=x(class extends U{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=me(this.bt)?fe(this.bt):null,s=me(t)?fe(t):null;if(e!==null&&(s===null||e!==s)){let a=Tt(i).pop(),r=this.yt.get(e);if(r===void 0){let o=document.createDocumentFragment();r=Le($,o),r.setConnected(!1),this.yt.set(e,r)}J(r,[a]),D(r,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.yt.get(s);if(a!==void 0){let r=Tt(a).pop();Ce(i),D(i,void 0,r),J(i,[r])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var As=x(class extends U{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let a=!!t[s];a===this.gt.has(s)||this.wt?.has(s)||(a?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return y}}),hs={},ys=x(class extends U{constructor(){super(...arguments),this._t=hs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,a)=>s===this._t[a]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var vs=x(class extends U{constructor(){super(...arguments),this.key=$}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(J(i),this.key=t),e}}),ws=x(class extends U{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Me(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===y||t===$)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return y;if(i.type===4){if(!!t===e.hasAttribute(s))return y;if(i.type===1&&e.getAttribute(s)===t+"")return y}}return J(i),t}});var St=new WeakMap,_s=x(class extends K{render(i){return $}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),$}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=St.get(t);e===void 0&&(e=new WeakMap,St.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?St.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),be=(i,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(i[a],a);return s},Ss=x(class extends U{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],r=[],o=0;for(let d of i)a[o]=s?s(d,o):o,r[o]=e(d,o),o++;return{values:r,keys:a}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let a=Tt(i),{values:r,keys:o}=this.Et(t,e,s);if(!Array.isArray(a))return this.Ct=o,r;let d=this.Ct??=[],l=[],m,f,p=0,b=a.length-1,g=0,v=r.length-1;for(;p<=b&&g<=v;)if(a[p]===null)p++;else if(a[b]===null)b--;else if(d[p]===o[g])l[g]=C(a[p],r[g]),p++,g++;else if(d[b]===o[v])l[v]=C(a[b],r[v]),b--,v--;else if(d[p]===o[v])l[v]=C(a[p],r[v]),D(i,l[v+1],a[p]),p++,v--;else if(d[b]===o[g])l[g]=C(a[b],r[g]),D(i,a[p],a[b]),b--,g++;else if(m===void 0&&(m=be(o,g,v),f=be(d,p,b)),m.has(d[p]))if(m.has(d[b])){let k=f.get(o[g]),Y=k!==void 0?a[k]:null;if(Y===null){let ie=D(i,a[p]);C(ie,r[g]),l[g]=ie}else l[g]=C(Y,r[g]),D(i,a[p],Y),a[k]=null;g++}else _t(a[b]),b--;else _t(a[p]),p++;for(;g<=v;){let k=D(i,l[v+1]);C(k,r[g]),l[g++]=k}for(;p<=b;){let k=a[p++];k!==null&&_t(k)}return this.Ct=o,J(i,l),y}}),De="important",cs=" !"+De,Es=x(class extends U{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Pt.add(s);let r=typeof a=="string"&&a.endsWith(cs);s.includes("-")||r?e.setProperty(s,r?a.slice(0,-11):a,r?De:""):e[s]=a}}return y}}),xs=x(class extends U{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?y:(this.At=i,document.importNode(i.content,!0))}}),G=class extends U{constructor(t){if(super(t),this.bt=$,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};G.directiveName="unsafeHTML",G.resultType=1;var pt=x(G);var Q=class extends G{};Q.directiveName="unsafeSVG",Q.resultType=2;var Ts=x(Q),$e=i=>!is(i)&&typeof i.then=="function",Ae=1073741823;var Ut=class extends K{constructor(){super(...arguments),this.Mt=Ae,this.Ut=[],this.dt=new nt(this),this.ft=new lt}render(...t){return t.find(e=>!$e(e))??y}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let r=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let d=0;d<e.length&&!(d>this.Mt);d++){let l=e[d];if(!$e(l))return this.Mt=d,l;d<a&&l===s[d]||(this.Mt=Ae,a=0,Promise.resolve(l).then(async m=>{for(;o.get();)await o.get();let f=r.deref();if(f!==void 0){let p=f.Ut.indexOf(l);p>-1&&p<f.Mt&&(f.Mt=p,f.setValue(m))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Us=x(Ut);var ds=Symbol.for(""),ps=i=>{if(i?.r===ds)return i?._$litStatic$};var ye=new Map,Pe=i=>(t,...e)=>{let s=e.length,a,r,o=[],d=[],l,m=0,f=!1;for(;m<s;){for(l=t[m];m<s&&(r=e[m],(a=ps(r))!==void 0);)l+=a+t[++m],f=!0;m!==s&&d.push(r),o.push(l),m++}if(m===s&&o.push(t[s]),f){let p=o.join("$$lit$$");(t=ye.get(p))===void 0&&(o.raw=o,ye.set(p,t=o)),e=d}return i(t,...e)},ks=Pe(n),Ls=Pe(Qe);var u=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var ut=Symbol("the albums manifest"),mt=Symbol("the images manifest"),Vs=Symbol("the site manifest"),gt=Symbol("metadata about the site manifest"),ft=Symbol("the videos manifest"),Ne=53.33306,Ie=-6.24889,Re=6,Be="photos",h=class{static EAGER="eager";static LAZY="lazy"},c=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function us(){return await(await fetch("/manifest/env.json")).json()}var Ot=await us(),bt=class{_data;constructor(t=`/manifest/images.${Ot.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[mt]&&(this._data=window[mt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[mt]=e,this._data=e}images(){return this._data.map(t=>({...t,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},$t=class{_data;constructor(t=`/manifest/videos.${Ot.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[ft]&&(this._data=window[ft]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[ft]=e,this._data=e}videos(){return this._data.map(t=>({...t,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},At=class{_data;constructor(t=`/manifest/albums.${Ot.publication_id}.json`){this.url=t}processAlbums(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[ut]&&(this._data=window[ut]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processAlbums(t);window[ut]=e,this._data=e}albums(){return this._data}};function He(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let a of s)if(He(i,a,e))return!0;return!1}var yt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[gt]&&(this._data=window[gt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[gt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return He(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let a of e)this.isChild(t,a)&&s.add(a);return s}};var w=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Dt=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),n`
    <aside class="${t.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${this.broadcast("navigate-page",{page:"photos"})}
            id="photos-sidebar-link" class="sidebar-item">PHOTOS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"videos"})}
            id="photos-sidebar-link" class="sidebar-item">VIDEOS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"albums"})}
            id="albums-sidebar-link" class="sidebar-item">ALBUMS</li>
          <li
            @click=${this.broadcast("navigate-page",{page:"tags"})}
            id="tags-sidebar-link" class="sidebar-item">TAGS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"about"})}
            id="photos-sidebar-link" class="sidebar-item">ABOUT</li>

      </nav>
    </aside>
    `}};customElements.define("photo-sidebar",Dt);var Pt=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/feeds/index.json"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Be;return n`
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
    `}};customElements.define("photo-header",Pt);var Nt=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return n`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return n`
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
    `}};customElements.define("app-photo",Nt);var It=class extends u{render(){return n`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",It);var N=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/feeds/index.json";t.href=e}};var Rt=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${N.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",Rt);var L=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let[e,s]=t.split(" ");return`${e.replace(/\:/g,"/")} ${s}`}static findRange(t){let e=1/0,s=-1/0;for(let a of t){if(!a.date_time)continue;let r=i.parse(a.date_time);r<e&&(e=r),r>s&&(s=r)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let a=t instanceof Date?t:new Date(parseFloat(t)),r=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},d=a.toLocaleDateString("en-IE",o),l=r.toLocaleDateString("en-IE",o),m=a.toLocaleDateString("en-IE",{day:"numeric"}),f=r.toLocaleDateString("en-IE",{day:"numeric"}),p=a.toLocaleDateString("en-IE",{month:"short"}),b=r.toLocaleDateString("en-IE",{month:"short"}),g=a.getFullYear(),v=r.getFullYear(),k=p===b,Y=g===v;return d===l?`${d} ${g}`:k&&Y?`${m} - ${f} ${b} ${g}`:`${d} ${g} - ${l} ${v}`}else{let o={year:"numeric",month:"short",day:"numeric"},d=a.toLocaleDateString("en-IE",o),l=r.toLocaleDateString("en-IE",o);return d===l?d:`${d} \u2014 ${l}`}}};var Bt=class extends u{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return L.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),n`
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
    `}};customElements.define("photo-album",Bt);var Ht=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{image_count:e}=t;if(e)return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:t.thumbnail_mosaic_url,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}render(){return performance.mark("start-albums-render"),n`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let s=this.loadingMode(e);return n`
            <photo-album
              title="${t.title}"
              url="${t.url}"
              thumbnailDataUrl="${t.thumbnailDataUrl}"
              id="${t.id}" count="${t.count}"
              minDate="${t.minDate}"
              maxDate="${t.maxDate}"
              .countries="${t.flags}"
              loading=${s}>
              </photo-album>
            `})}
    </section>
    `}};customElements.define("photo-album-page",Ht);var jt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Ne,Ie],Re);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let a=this.albums.albums();for(let r of Object.values(a)){let o=r.geolocation;o&&geoJSON(o,{style:function(){return{color:"red"}},onEachFeature:(d,l)=>{let m=`
            <section>
              <h3>${r.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${r.id}">
                  <img width="170" height="170" src="${r.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;l.bindPopup(m)}}).addTo(e)}}render(){return n`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",jt);var Gt=class extends u{static get properties(){return{id:{type:String},url:{type:String}}}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return n`
    <video controls class="thumbnail-video">
      <source src="${this.url}" type="video/mp4">
    </video>
    `}};customElements.define("app-video",Gt);var Yt=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Yt);var vt=class i{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setXTheEverythingAppFormallyKnownAsTwitter(t),i.setOpenGraph(t)}};var Vt=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),vt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=L.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos().map((r,o)=>n`
      <app-photo
        id=${r.id}
        tags="${r.tags}"
        loading="${N.loadingMode(o)}"
        thumbnailUrl="${r.thumbnail_url}"
        thumbnailDataUrl="${r.thumbnail_data_url}"
        imageUrl="${r.image_url}"></app-photo>`),a=this.albumVideos().map((r,o)=>n`<app-video
        id=${r.id}
        url=${r.video_url_unscaled}
        ></app-video>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${pt(this.description)}</p>
        <br>
        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
      </section>

      <section class="photo-container">
        ${s}
      </section>

      <section class="photo-container">
        ${a}
      </section>
    </div>
    `}};customElements.define("album-page",Vt);var Ft=class extends u{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",Ft);var zt=class extends u{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=L.findRange(this.photos()),a=L.dateRange(e,s,t.matches);return n`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${a}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(r=>n`
        <app-photo
          id="${r.id}"
          tags="${r.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${r.thumbnail_url}"
          thumbnailDataUrl="${r.thumbnail_data_url}"
          imageUrl="${r.image_url}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",zt);var Zt=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?n`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:n`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",Zt);var Wt=class extends u{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return n`<div class="photo-album">
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

      <img
        @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
        class="thumbnail-image" width="400" height="400" src="${this.url}" title="${t}" alt="${t} - Tag Photo Album Thumbnail"
        @click=${this.broadcast("click-tag",{tagName:t})}
        loading="${this.loading}"/>

      <br>
      <p>${t}</p>

      <!-- Add links to wikipedia and birdwatch -->
      ${this?.links?.wikipedia?n`<a href="${this.links.wikipedia}">[wiki]</a>`:""}
      ${this?.links?.birdwatch?n`<a href="${this.links.birdwatch}">[birdwatch]</a>`:""}
    </div>`}};customElements.define("tag-album",Wt);var qt=class extends u{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return n`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return n`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_data_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return n`
    <section>
      <h2>By Ratings</h2>

      <ul>
        <li><tag-link tagName="⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐"></tag-link></li>
        <li><tag-link tagName="⭐⭐⭐⭐⭐"></tag-link></li>
      </ul>

      <h2>By Species</h2>

      <h3>Mammals</h3>

      <section class="no-margin album-container">
        ${this.tagsFamily(this.metadata,"Mammal").sort().map(this.renderTagCover.bind(this))}
      </section>

      <h3>Birds</h3>

      <section class="no-margin album-container">
        ${this.tagsFamily(this.metadata,"Bird").sort().map(this.renderTagCover.bind(this))}
      </section>

      <h2>Planes</h2>
      <section class="no-margin album-container">
        ${this.tagsFamily(this.metadata,"Plane").sort().map(this.renderTagCover.bind(this))}
    </section>

      <h2>Helicopters</h2>
      <section class="no-margin album-container">
        ${this.tagsFamily(this.metadata,"Helicopter").sort().map(this.renderTagCover.bind(this))}
    </section>
    </section>
    `}};customElements.define("tags-page",qt);var Jt=class extends u{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",Jt);var Kt=class extends u{static get properties(){return{id:{type:String},image:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.image.f_number==="Unknown"?n`<td>Unknown aperture</td>`:this.image.f_number==="0.0"?n`<td>Manual aperture control</td>`:n`<td>ƒ/${this.image.f_number}</td>`}renderFocalLength(){return this.image.focal_length==="Unknown"?n`${this.image.focal_length}`:this.image.focal_length==="0"?n`<td>Manual lens</td>`:n`<td>${this.image.focal_length}mm equiv.</td>`}render(){let t=this.image,e=(t.tags.sort()??[]).filter(a=>a!=="Published"&&!a.includes("\u2B50")).sort().map(a=>n`<li><tag-link tagName="${a}"></tag-link></li>`),s=t.date_time.split(" ")[0].replace(/\:/g,"-");return n`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.image_url}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?n`<br/><p>${pt(t.description)}</p>`:n``}

      <h3>Rating</h3>
      <p>${t.rating??"unrated"}</p>

      <h3>Photo Subject</h3>
      <p>${t.subject??""}</p>

      <h3>Tags</h3>
      <ul class="photo-tag-list">${e}</ul>

      <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading" title="The variance of the image's laplacian; one measure of blur. Bigger is sharper.">Blur</th>
        <td>${t.blur}</td>
      </tr>
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time><a href="#/date/${s}">
        ${L.formatExifDate(t.date_time)}
        </a></time></td>
      </tr>
      <tr>
        <th class="exif-heading">Camera Model</th>
        <td>${t.model}</td>
        </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${t.width} x ${t.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength()}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1 / ${t.shutter_speed?Math.round(1/t.shutter_speed):"Unknown"}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture()}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${t.iso}</td>
      </tr>
    </table>

    </section>
    `}};customElements.define("metadata-page",Kt);var Qt=class extends u{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.date_time)return!1;let[e]=t.date_time.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${N.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>Photos from ${this.date}</h1>
        <p class="photo-album-date">
          <time>${this.date}</time>
        </p>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("date-page",Qt);var Xt=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
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
    `}};customElements.define("about-page",Xt);var te=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,s)=>n`<app-video
      id=${e.id}
      url=${e.video_url_unscaled}
      ></app-video>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("videos-page",te);var S=new At,_=new bt,E=new $t,T=new yt,ms=[[S,h.EAGER],[_,h.EAGER],[E,h.EAGER],[T,h.EAGER]],gs={[c.ABOUT]:[[S,h.LAZY],[_,h.LAZY],[E,h.LAZY],[T,h.LAZY]],[c.ALBUMS]:[[S,h.EAGER],[_,h.LAZY],[E,h.LAZY],[T,h.LAZY]],[c.PHOTOS]:[[S,h.EAGER],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.VIDEOS]:[[S,h.LAZY],[_,h.LAZY],[E,h.EAGER],[T,h.LAZY]],[c.ALBUM]:[[S,h.EAGER],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.PHOTO]:[[S,h.EAGER],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.DATE]:[[S,h.EAGER],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.TAG_ALBUM]:[[S,h.LAZY],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.TAG]:[[S,h.LAZY],[_,h.EAGER],[E,h.EAGER],[T,h.LAZY]],[c.LOCATIONS]:[[S,h.EAGER],[_,h.LAZY],[E,h.LAZY],[T,h.LAZY]],[c.METADATA]:[[S,h.LAZY],[_,h.EAGER],[E,h.EAGER],[T,h.EAGER]],[c.STATS]:[[S,h.LAZY],[_,h.LAZY],[E,h.LAZY],[T,h.LAZY]]},ee=class{static async init(){let t=w.getUrl();console.log(`loading ${t?.type}`);let e=gs[t?.type]??ms,s=[];for(let[a,r]of e)r===h.EAGER?s.push(a.init()):r===h.LAZY&&a.init();await Promise.all(s)}};await ee.init();var se=class i extends u{static DEFAULT_PAGE=c.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:c.ALBUM,albums:c.ALBUMS,photos:c.PHOTOS,date:c.DATE,"tag-album":c.TAG_ALBUM,tags:c.TAGS,locations:c.LOCATIONS,stats:c.STATS,metadata:c.METADATA,about:c.ABOUT,videos:c.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=w.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===c.METADATA||this.page===c.ALBUM||this.page===c.METADATA?this.id=t.id:this.page===c.TAG_ALBUM?this.tag=t.tag:this.page===c.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=c.PHOTOS,this.id=s,this.title=e,w.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=c.TAG_ALBUM,this.tag=e,w.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:a,tags:r}=t.detail;this.page=c.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=a,this.tags=r??[],w.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===c.ABOUT?w.showAboutUrl():this.page===c.PHOTOS?w.showPhotosUrl():this.page===c.ALBUMS?w.showAlbumsUrl():this.page===c.TAGS?w.showTagsUrl():this.page===c.LOCATIONS?w.showLocationsUrl():this.page===c.STATS?w.showStatsUrl():this.page===c.PHOTOS?w.showAlbumUrl(this.id):this.page===c.METADATA?w.showMetadataUrl(this.id):this.page===c.DATE?w.showDateUrl(this.date):this.page===c.VIDEOS?w.showVideosUrl():w.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return n`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===c.ABOUT)return n`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===c.PHOTOS)return n`<photos-page class="${e.join(" ")}" .images=${_}></photos-page>`;if(this.page===c.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(a=>a.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),n`
      <album-page
        .images=${_}
        .videos=${E}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.image_count}
        description=${s.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===c.DATE)return console.log(this.date),n`<date-page
        .images=${_} date="${this.date}"
        ></date-page>`;if(this.page===c.TAG_ALBUM)return n`
      <tag-page tag=${this.tag} .images=${_} class="${e.join(" ")}"></tag-page>
      `;if(this.page===c.TAGS)return n`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${_}></tags-page>
      `;if(this.page===c.LOCATIONS)return n`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===c.STATS)return n`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page===c.METADATA){let s=_.images().find(a=>a.id===this.id);return s||console.error(`failed to find photo with id ${this.id}`),n`
      <metadata-page .image=${s} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===c.VIDEOS)return n`
      <videos-page .videos=${E} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],n`
    <body>
      <div class="${s.join(" ")}"
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
    `}};customElements.define("photo-app",se);export{ms as DEFAULT_DEPENDENCIES,gs as PAGE_DEPENDECIES,se as PhotoApp};
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
