var X=globalThis,kt=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ye=Symbol(),ie=new WeakMap,Et=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(kt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ie.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ie.set(e,t))}return t}toString(){return this.cssText}},He=i=>new Et(typeof i=="string"?i:i+"",void 0,ye);var je=(i,t)=>{if(kt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=X.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}},ae=kt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return He(e)})(i):i,{is:Ge,defineProperty:Ye,getOwnPropertyDescriptor:ze,getOwnPropertyNames:Fe,getOwnPropertySymbols:Ve,getPrototypeOf:Ze}=Object,ct=globalThis,re=ct.trustedTypes,We=re?re.emptyScript:"",qe=ct.reactiveElementPolyfillSupport,F=(i,t)=>i,xt={toAttribute(i,t){switch(t){case Boolean:i=i?We:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ve=(i,t)=>!Ge(i,t),oe={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:ve};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=oe){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Ye(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:r}=ze(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return a?.call(this)},set(o){let h=a?.call(this);r.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??oe}static o(){if(this.hasOwnProperty(F("elementProperties")))return;let t=Ze(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(F("properties"))){let e=this.properties,s=[...Fe(e),...Ve(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(ae(a))}else t!==void 0&&e.push(ae(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return je(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:xt).toAttribute(e,s.type);this.m=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let r=s.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xt;this.m=a,this[a]=o.fromAttribute(e,r.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??ve)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,r]of this.v)this[a]=r;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,r]of s)r.wrapped!==!0||this._$AL.has(a)||this[a]===void 0||this.T(a,this[a],r)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[F("elementProperties")]=new Map,O[F("finalized")]=new Map,qe?.({ReactiveElement:O}),(ct.reactiveElementVersions??=[]).push("2.0.4");var Mt=globalThis,tt=Mt.trustedTypes,ne=tt?tt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Lt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+L,Je=`<${Ct}>`,B=document,Z=()=>B.createComment(""),W=i=>i===null||typeof i!="object"&&typeof i!="function",we=Array.isArray,_e=i=>we(i)||typeof i?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,he=/>/g,R=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,de=/"/g,Se=/^(?:script|style|textarea|title)$/i,Ee=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Ee(1),Ke=Ee(2),A=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ue=new WeakMap,I=B.createTreeWalker(B,129);function xe(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(t):t}var Te=(i,t)=>{let e=i.length-1,s=[],a,r=t===2?"<svg>":"",o=z;for(let h=0;h<e;h++){let n=i[h],m,f,c=-1,b=0;for(;b<n.length&&(o.lastIndex=b,f=o.exec(n),f!==null);)b=o.lastIndex,o===z?f[1]==="!--"?o=le:f[1]!==void 0?o=he:f[2]!==void 0?(Se.test(f[2])&&(a=RegExp("</"+f[2],"g")),o=R):f[3]!==void 0&&(o=R):o===R?f[0]===">"?(o=a??z,c=-1):f[1]===void 0?c=-2:(c=o.lastIndex-f[2].length,m=f[1],o=f[3]===void 0?R:f[3]==='"'?de:ce):o===de||o===ce?o=R:o===le||o===he?o=z:(o=R,a=void 0);let g=o===R&&i[h+1].startsWith("/>")?" ":"";r+=o===z?n+Je:c>=0?(s.push(m),n.slice(0,c)+Lt+n.slice(c)+L+g):n+L+(c===-2?h:g)}return[xe(i,r+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},q=class i{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let r=0,o=0,h=t.length-1,n=this.parts,[m,f]=Te(t,e);if(this.el=i.createElement(m,s),I.currentNode=this.el.content,e===2){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=I.nextNode())!==null&&n.length<h;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(Lt)){let b=f[o++],g=a.getAttribute(c).split(L),v=/([.?@])?(.*)/.exec(b);n.push({type:1,index:r,name:v[2],strings:g,ctor:v[1]==="."?st:v[1]==="?"?it:v[1]==="@"?at:j}),a.removeAttribute(c)}else c.startsWith(L)&&(n.push({type:6,index:r}),a.removeAttribute(c));if(Se.test(a.tagName)){let c=a.textContent.split(L),b=c.length-1;if(b>0){a.textContent=tt?tt.emptyScript:"";for(let g=0;g<b;g++)a.append(c[g],Z()),I.nextNode(),n.push({type:2,index:++r});a.append(c[b],Z())}}}else if(a.nodeType===8)if(a.data===Ct)n.push({type:2,index:r});else{let c=-1;for(;(c=a.data.indexOf(L,c+1))!==-1;)n.push({type:7,index:r}),c+=L.length-1}r++}}static createElement(t,e){let s=B.createElement("template");return s.innerHTML=t,s}};function H(i,t,e=i,s){if(t===A)return t;let a=s!==void 0?e.U?.[s]:e.N,r=W(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(i),a._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=a:e.N=a),a!==void 0&&(t=H(i,a._$AS(i,t.values),a,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??B).importNode(e,!0);I.currentNode=a;let r=I.nextNode(),o=0,h=0,n=s[0];for(;n!==void 0;){if(o===n.index){let m;n.type===2?m=new dt(r,r.nextSibling,this,t):n.type===1?m=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(m=new rt(r,this,t)),this._$AV.push(m),n=s[++h]}o!==n?.index&&(r=I.nextNode(),o++)}return I.currentNode=B,a}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},dt=class Ue{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,a){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.V=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),W(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==A&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):_e(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==$&&W(this._$AH)?this._$AA.nextSibling.data=t:this.j(B.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(xe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.R(e);else{let r=new et(a,this),o=r.O(this.options);r.R(e),this.j(o),this._$AH=r}}_$AC(t){let e=ue.get(t.strings);return e===void 0&&ue.set(t.strings,e=new q(t)),e}D(t){we(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let r of t)a===e.length?e.push(s=new Ue(this.H(Z()),this.H(Z()),this,this.options)):s=e[a],s._$AI(r),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,a){let r=this.strings,o=!1;if(r===void 0)t=H(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let h=t,n,m;for(t=r[0],n=0;n<r.length-1;n++)m=H(this,h[s+n],e,n),m===A&&(m=this._$AH[n]),o||=!W(m)||m!==this._$AH[n],m===$?t=$:t!==$&&(t+=(m??"")+r[n+1]),this._$AH[n]=m}o&&!a&&this.B(t)}B(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends j{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===$?void 0:t}},it=class extends j{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},at=class extends j{constructor(t,e,s,a,r){super(t,e,s,a,r),this.type=5}_$AI(t,e=this){if((t=H(this,t,e,0)??$)===A)return;let s=this._$AH,a=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==$&&(s===$||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}},Qe={W:Lt,q:L,J:Ct,Z:1,F:Te,G:et,K:_e,X:H,Y:dt,tt:j,st:it,it:at,et:st,ot:rt},Xe=Mt.litHtmlPolyfillSupport;Xe?.(q,dt),(Mt.litHtmlVersions??=[]).push("3.1.3");var ke=(i,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let r=e?.renderBefore??null;s._$litPart$=a=new dt(t.insertBefore(Z(),r),r,void 0,e??{})}return a._$AI(i),a};var P=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return A}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var ts=globalThis.litElementPolyfillSupport;ts?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:es}=Qe,ss=i=>i===null||typeof i!="object"&&typeof i!="function";var pe=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,is=i=>i?._$litType$?.h!=null;var Me=i=>i.strings===void 0,me=()=>document.createComment(""),D=(i,t,e)=>{let s=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(me(),a),o=s.insertBefore(me(),a);e=new es(r,o,i,i.options)}else{let r=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let n;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(n=i._$AU)!==o._$AU&&e._$AP(n)}if(r!==a||h){let n=e._$AA;for(;n!==r;){let m=n.nextSibling;s.insertBefore(n,a),n=m}}}return e},C=(i,t,e=i)=>(i._$AI(t,e),i),as={},J=(i,t=as)=>i._$AH=t,Tt=i=>i._$AH,_t=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Le=i=>{i._$AR()};var E=i=>(...t)=>({_$litDirective$:i,values:t}),U=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var V=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),V(s,t);return!0},ot=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ce=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ns(t)}};function rs(i){this._$AN!==void 0?(ot(this),this._$AM=i,Ce(this)):this._$AM=i}function os(i,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)V(s[r],!1),ot(s[r]);else s!=null&&(V(s,!1),ot(s));else V(this,i)}var ns=i=>{i.type==2&&(i._$AP??=os,i._$AQ??=rs)},K=class extends U{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ce(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(V(this,t),ot(this))}setValue(t){if(Me(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var nt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},lt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var ht=class extends K{constructor(){super(...arguments),this.dt=new nt(this),this.ft=new lt}render(t,e){return A}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return A;this.vt=e;let a=0,{dt:r,ft:o}=this;return(async(h,n)=>{for await(let m of h)if(await n(m)===!1)return})(e,async h=>{for(;o.get();)await o.get();let n=r.deref();if(n!==void 0){if(n.vt!==e)return!1;s!==void 0&&(h=s(h,a)),n.commitValue(h,a),a++}return!0}),A}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},gs=E(ht),fs=E(class extends ht{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Le(this.ht);let e=D(this.ht);C(e,i)}}),ge=i=>is(i)?i._$litType$.h:i.strings,bs=E(class extends U{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=pe(this.bt)?ge(this.bt):null,s=pe(t)?ge(t):null;if(e!==null&&(s===null||e!==s)){let a=Tt(i).pop(),r=this.yt.get(e);if(r===void 0){let o=document.createDocumentFragment();r=ke($,o),r.setConnected(!1),this.yt.set(e,r)}J(r,[a]),D(r,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.yt.get(s);if(a!==void 0){let r=Tt(a).pop();Le(i),D(i,void 0,r),J(i,[r])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var $s=E(class extends U{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let a=!!t[s];a===this.gt.has(s)||this.wt?.has(s)||(a?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return A}}),ls={},As=E(class extends U{constructor(){super(...arguments),this._t=ls}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,a)=>s===this._t[a]))return A}else if(this._t===t)return A;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var ys=E(class extends U{constructor(){super(...arguments),this.key=$}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(J(i),this.key=t),e}}),vs=E(class extends U{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Me(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===A||t===$)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return A;if(i.type===4){if(!!t===e.hasAttribute(s))return A;if(i.type===1&&e.getAttribute(s)===t+"")return A}}return J(i),t}});var St=new WeakMap,ws=E(class extends K{render(i){return $}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),$}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=St.get(t);e===void 0&&(e=new WeakMap,St.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?St.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),fe=(i,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(i[a],a);return s},_s=E(class extends U{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],r=[],o=0;for(let h of i)a[o]=s?s(h,o):o,r[o]=e(h,o),o++;return{values:r,keys:a}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let a=Tt(i),{values:r,keys:o}=this.Et(t,e,s);if(!Array.isArray(a))return this.Ct=o,r;let h=this.Ct??=[],n=[],m,f,c=0,b=a.length-1,g=0,v=r.length-1;for(;c<=b&&g<=v;)if(a[c]===null)c++;else if(a[b]===null)b--;else if(h[c]===o[g])n[g]=C(a[c],r[g]),c++,g++;else if(h[b]===o[v])n[v]=C(a[b],r[v]),b--,v--;else if(h[c]===o[v])n[v]=C(a[c],r[v]),D(i,n[v+1],a[c]),c++,v--;else if(h[b]===o[g])n[g]=C(a[b],r[g]),D(i,a[c],a[b]),b--,g++;else if(m===void 0&&(m=fe(o,g,v),f=fe(h,c,b)),m.has(h[c]))if(m.has(h[b])){let k=f.get(o[g]),Y=k!==void 0?a[k]:null;if(Y===null){let se=D(i,a[c]);C(se,r[g]),n[g]=se}else n[g]=C(Y,r[g]),D(i,a[c],Y),a[k]=null;g++}else _t(a[b]),b--;else _t(a[c]),c++;for(;g<=v;){let k=D(i,n[v+1]);C(k,r[g]),n[g++]=k}for(;c<=b;){let k=a[c++];k!==null&&_t(k)}return this.Ct=o,J(i,n),A}}),Oe="important",hs=" !"+Oe,Ss=E(class extends U{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Pt.add(s);let r=typeof a=="string"&&a.endsWith(hs);s.includes("-")||r?e.setProperty(s,r?a.slice(0,-11):a,r?Oe:""):e[s]=a}}return A}}),Es=E(class extends U{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?A:(this.At=i,document.importNode(i.content,!0))}}),G=class extends U{constructor(t){if(super(t),this.bt=$,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this.kt=void 0,this.bt=t;if(t===A)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};G.directiveName="unsafeHTML",G.resultType=1;var ut=E(G);var Q=class extends G{};Q.directiveName="unsafeSVG",Q.resultType=2;var xs=E(Q),be=i=>!ss(i)&&typeof i.then=="function",$e=1073741823;var Ut=class extends K{constructor(){super(...arguments),this.Mt=$e,this.Ut=[],this.dt=new nt(this),this.ft=new lt}render(...t){return t.find(e=>!be(e))??A}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let r=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let n=e[h];if(!be(n))return this.Mt=h,n;h<a&&n===s[h]||(this.Mt=$e,a=0,Promise.resolve(n).then(async m=>{for(;o.get();)await o.get();let f=r.deref();if(f!==void 0){let c=f.Ut.indexOf(n);c>-1&&c<f.Mt&&(f.Mt=c,f.setValue(m))}}))}return A}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ts=E(Ut);var cs=Symbol.for(""),ds=i=>{if(i?.r===cs)return i?._$litStatic$};var Ae=new Map,De=i=>(t,...e)=>{let s=e.length,a,r,o=[],h=[],n,m=0,f=!1;for(;m<s;){for(n=t[m];m<s&&(r=e[m],(a=ds(r))!==void 0);)n+=a+t[++m],f=!0;m!==s&&h.push(r),o.push(n),m++}if(m===s&&o.push(t[s]),f){let c=o.join("$$lit$$");(t=Ae.get(c))===void 0&&(o.raw=o,Ae.set(c,t=o)),e=h}return i(t,...e)},Us=De(l),ks=De(Ke);var p=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var pt=Symbol("the albums manifest"),mt=Symbol("the images manifest"),Ys=Symbol("the site manifest"),gt=Symbol("metadata about the site manifest"),ft=Symbol("the videos manifest"),Pe=53.33306,Ne=-6.24889,Re=6,Ie="photos",d=class{static EAGER="eager";static LAZY="lazy"},u=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about"};async function us(){return await(await fetch("/manifest/env.json")).json()}var Ot=await us(),bt=class{_data;constructor(t=`/manifest/images.${Ot.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[mt]&&(this._data=window[mt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[mt]=e,this._data=e}images(){return this._data.map(t=>({...t,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},$t=class{_data;constructor(t=`/manifest/videos.${Ot.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[ft]&&(this._data=window[ft]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[ft]=e,this._data=e}videos(){return this._data.map(t=>({...t,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},At=class{_data;constructor(t=`/manifest/albums.${Ot.publication_id}.json`){this.url=t}processAlbums(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[pt]&&(this._data=window[pt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processAlbums(t);window[pt]=e,this._data=e}albums(){return this._data}};function Be(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let a of s)if(Be(i,a,e))return!0;return!1}var yt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[gt]&&(this._data=window[gt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[gt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Be(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let a of e)this.isChild(t,a)&&s.add(a);return s}};var w=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:{type:"albums"}}};var Dt=class extends p{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
    <aside class="${t.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${this.broadcast("navigate-page",{page:"photos"})}
            id="photos-sidebar-link" class="sidebar-item">PHOTOS</li>

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
    `}};customElements.define("photo-sidebar",Dt);var Pt=class extends p{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/feeds/index.json"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Ie;return l`
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
    `}};customElements.define("photo-header",Pt);var Nt=class extends p{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return l`
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
    `}};customElements.define("app-photo",Nt);var Rt=class extends p{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Rt);var N=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}};var y=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/feeds/index.json";t.href=e}};var It=class extends p{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${N.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",It);var M=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let[e,s]=t.split(" ");return`${e.replace(/\:/g,"/")} ${s}`}static findRange(t){let e=1/0,s=-1/0;for(let a of t){if(!a.date_time)continue;let r=i.parse(a.date_time);r<e&&(e=r),r>s&&(s=r)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let a=t instanceof Date?t:new Date(parseFloat(t)),r=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=a.toLocaleDateString("en-IE",o),n=r.toLocaleDateString("en-IE",o),m=a.toLocaleDateString("en-IE",{day:"numeric"}),f=r.toLocaleDateString("en-IE",{day:"numeric"}),c=a.toLocaleDateString("en-IE",{month:"short"}),b=r.toLocaleDateString("en-IE",{month:"short"}),g=a.getFullYear(),v=r.getFullYear(),k=c===b,Y=g===v;return h===n?`${h} ${g}`:k&&Y?`${m} - ${f} ${b} ${g}`:`${h} ${g} - ${n} ${v}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=a.toLocaleDateString("en-IE",o),n=r.toLocaleDateString("en-IE",o);return h===n?h:`${h} \u2014 ${n}`}}};var Bt=class extends p{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return M.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),l`
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
    `}};customElements.define("photo-album",Bt);var Ht=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{image_count:e}=t;if(e)return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:t.thumbnail_mosaic_url,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}render(){return performance.mark("start-albums-render"),l`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let s=this.loadingMode(e);return l`
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
    `}};customElements.define("photo-album-page",Ht);var jt=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Pe,Ne],Re);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let a=this.albums.albums();for(let r of Object.values(a)){let o=r.geolocation;o&&geoJSON(o,{style:function(){return{color:"red"}},onEachFeature:(h,n)=>{let m=`
            <section>
              <h3>${r.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${r.id}">
                  <img width="170" height="170" src="${r.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;n.bindPopup(m)}}).addTo(e)}}render(){return l`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",jt);var Gt=class extends p{static get properties(){return{id:{type:String},url:{type:String}}}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return l`
    <video controls class="thumbnail-video">
      <source src="${this.url}" type="video/mp4">
    </video>
    `}};customElements.define("app-video",Gt);var Yt=class extends p{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Yt);var vt=class i{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setXTheEverythingAppFormallyKnownAsTwitter(t),i.setOpenGraph(t)}};var zt=class extends p{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),vt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),y.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=M.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos().map((r,o)=>l`
      <app-photo
        id=${r.id}
        tags="${r.tags}"
        loading="${N.loadingMode(o)}"
        thumbnailUrl="${r.thumbnail_url}"
        thumbnailDataUrl="${r.thumbnail_data_url}"
        imageUrl="${r.image_url}"></app-photo>`),a=this.albumVideos().map((r,o)=>l`<app-video
        id=${r.id}
        url=${r.video_url_unscaled}
        ></app-video>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${ut(this.description)}</p>
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
    `}};customElements.define("album-page",zt);var Ft=class extends p{connectedCallback(){super.connectedCallback(),y.setIndex()}render(){return l`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",Ft);var Vt=class extends p{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=M.findRange(this.photos()),a=M.dateRange(e,s,t.matches);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${a}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(r=>l`
        <app-photo
          id="${r.id}"
          tags="${r.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${r.thumbnail_url}"
          thumbnailDataUrl="${r.thumbnail_data_url}"
          imageUrl="${r.image_url}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",Vt);var Zt=class extends p{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",Zt);var Wt=class extends p{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return l`<div class="photo-album">
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

      <img
        @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
        class="thumbnail-image" width="400" height="400" src="${this.url}" title="${t}" alt="${t} - Tag Photo Album Thumbnail"
        @click=${this.broadcast("click-tag",{tagName:t})}
        loading="${this.loading}"/>

      <br>
      <p>${t}</p>

      <!-- Add links to wikipedia and birdwatch -->
      ${this?.links?.wikipedia?l`<a href="${this.links.wikipedia}">[wiki]</a>`:""}
      ${this?.links?.birdwatch?l`<a href="${this.links.birdwatch}">[birdwatch]</a>`:""}
    </div>`}};customElements.define("tag-album",Wt);var qt=class extends p{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return l`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return l`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_data_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return l`
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
    `}};customElements.define("tags-page",qt);var Jt=class extends p{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",Jt);var Kt=class extends p{static get properties(){return{id:{type:String},image:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),y.setIndex()}renderAperture(){return this.image.f_number==="Unknown"?l`<td>Unknown aperture</td>`:this.image.f_number==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${this.image.f_number}</td>`}renderFocalLength(){return this.image.focal_length==="Unknown"?l`${this.image.focal_length}`:this.image.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${this.image.focal_length}mm equiv.</td>`}render(){let t=this.image,e=(t.tags.sort()??[]).filter(a=>a!=="Published"&&!a.includes("\u2B50")).sort().map(a=>l`<li><tag-link tagName="${a}"></tag-link></li>`),s=t.date_time.split(" ")[0].replace(/\:/g,"-");return l`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.image_url}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?l`<br/><p>${ut(t.description)}</p>`:l``}

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
        ${M.formatExifDate(t.date_time)}
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
    `}};customElements.define("metadata-page",Kt);var Qt=class extends p{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.date_time)return!1;let[e]=t.date_time.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${N.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return l`
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
    `}};customElements.define("date-page",Qt);var Xt=class extends p{static get properties(){return{}}connectedCallback(){super.connectedCallback(),y.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",Xt);var S=new At,_=new bt,x=new $t,T=new yt,ps=[[S,d.EAGER],[_,d.EAGER],[x,d.EAGER],[T,d.EAGER]],ms={[u.ABOUT]:[[S,d.LAZY],[_,d.LAZY],[x,d.LAZY],[T,d.LAZY]],[u.ALBUMS]:[[S,d.EAGER],[_,d.LAZY],[x,d.LAZY],[T,d.LAZY]],[u.PHOTOS]:[[S,d.EAGER],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.ALBUM]:[[S,d.EAGER],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.PHOTO]:[[S,d.EAGER],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.DATE]:[[S,d.EAGER],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.TAG_ALBUM]:[[S,d.LAZY],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.TAG]:[[S,d.LAZY],[_,d.EAGER],[x,d.EAGER],[T,d.LAZY]],[u.LOCATIONS]:[[S,d.EAGER],[_,d.LAZY],[x,d.LAZY],[T,d.LAZY]],[u.METADATA]:[[S,d.LAZY],[_,d.EAGER],[x,d.EAGER],[T,d.EAGER]],[u.STATS]:[[S,d.LAZY],[_,d.LAZY],[x,d.LAZY],[T,d.LAZY]]},te=class{static async init(){let t=w.getUrl();console.log(`loading ${t?.type}`);let e=ms[t?.type]??ps,s=[];for(let[a,r]of e)r===d.EAGER?s.push(a.init()):r===d.LAZY&&a.init();await Promise.all(s)}};await te.init();var ee=class i extends p{static DEFAULT_PAGE=u.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:u.ALBUM,albums:u.ALBUMS,photos:u.PHOTOS,date:u.DATE,"tag-album":u.TAG_ALBUM,tags:u.TAGS,locations:u.LOCATIONS,stats:u.STATS,metadata:u.METADATA,about:u.ABOUT};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=w.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===u.METADATA||this.page===u.ALBUM||this.page===u.METADATA?this.id=t.id:this.page===u.TAG_ALBUM?this.tag=t.tag:this.page===u.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=u.PHOTOS,this.id=s,this.title=e,w.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=u.TAG_ALBUM,this.tag=e,w.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:a,tags:r}=t.detail;this.page=u.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=a,this.tags=r??[],w.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===u.ABOUT?w.showAboutUrl():this.page===u.PHOTOS?w.showPhotosUrl():this.page===u.ALBUMS?w.showAlbumsUrl():this.page===u.TAGS?w.showTagsUrl():this.page===u.LOCATIONS?w.showLocationsUrl():this.page===u.STATS?w.showStatsUrl():this.page===u.PHOTOS?w.showAlbumUrl(this.id):this.page===u.METADATA?w.showMetadataUrl(this.id):this.page===u.DATE?w.showDateUrl(this.date):w.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return l`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===u.ABOUT)return l`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===u.PHOTOS)return l`<photos-page class="${e.join(" ")}" .images=${_}></photos-page>`;if(this.page===u.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(a=>a.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${_}
        .videos=${x}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.image_count}
        description=${s.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===u.DATE)return console.log(this.date),l`<date-page
        .images=${_} date="${this.date}"
        ></date-page>`;if(this.page===u.TAG_ALBUM)return l`
      <tag-page tag=${this.tag} .images=${_} class="${e.join(" ")}"></tag-page>
      `;if(this.page===u.TAGS)return l`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${_}></tags-page>
      `;if(this.page===u.LOCATIONS)return l`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===u.STATS)return l`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page==="metadata"){let s=_.images().find(a=>a.id===this.id);return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page .image=${s} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],l`
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
    `}};customElements.define("photo-app",ee);export{ps as DEFAULT_DEPENDENCIES,ms as PAGE_DEPENDECIES,ee as PhotoApp};
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
