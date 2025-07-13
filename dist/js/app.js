var rt=globalThis,It=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),ae=new WeakMap,Pt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(It&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ae.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ae.set(e,t))}return t}toString(){return this.cssText}},Ye=s=>new Pt(typeof s=="string"?s:s+"",void 0,Se);var je=(s,t)=>{if(It)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=rt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},le=It?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ye(e)})(s):s,{is:Ve,defineProperty:ze,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Ze,getOwnPropertySymbols:Fe,getPrototypeOf:We}=Object,ft=globalThis,he=ft.trustedTypes,qe=he?he.emptyScript:"",Qe=ft.reactiveElementPolyfillSupport,q=(s,t)=>s,Rt={toAttribute(s,t){switch(t){case Boolean:s=s?qe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ee=(s,t)=>!Ve(s,t),ce={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:Ee};Symbol.metadata??=Symbol("metadata"),ft.litPropertyMetadata??=new WeakMap;var P=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=ce){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&ze(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=Ge(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);n.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ce}static o(){if(this.hasOwnProperty(q("elementProperties")))return;let t=We(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(q("properties"))){let e=this.properties,i=[...Ze(e),...Fe(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(le(r))}else t!==void 0&&e.push(le(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return je(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Rt).toAttribute(e,i.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Rt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??Ee)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[q("elementProperties")]=new Map,P[q("finalized")]=new Map,Qe?.({ReactiveElement:P}),(ft.reactiveElementVersions??=[]).push("2.0.4");var Bt=globalThis,nt=Bt.trustedTypes,de=nt?nt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ht="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Yt="?"+L,Je=`<${Yt}>`,Y=document,J=()=>Y.createComment(""),K=s=>s===null||typeof s!="object"&&typeof s!="function",xe=Array.isArray,Ue=s=>xe(s)||typeof s?.[Symbol.iterator]=="function",Lt=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,pe=/>/g,B=RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,fe=/"/g,Te=/^(?:script|style|textarea|title)$/i,Me=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),l=Me(1),Ke=Me(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ge=new WeakMap,H=Y.createTreeWalker(Y,129);function Oe(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(t):t}var Le=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":"",o=W;for(let h=0;h<e;h++){let a=s[h],u,g,c=-1,$=0;for(;$<a.length&&(o.lastIndex=$,g=o.exec(a),g!==null);)$=o.lastIndex,o===W?g[1]==="!--"?o=ue:g[1]!==void 0?o=pe:g[2]!==void 0?(Te.test(g[2])&&(r=RegExp("</"+g[2],"g")),o=B):g[3]!==void 0&&(o=B):o===B?g[0]===">"?(o=r??W,c=-1):g[1]===void 0?c=-2:(c=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?B:g[3]==='"'?fe:me):o===fe||o===me?o=B:o===ue||o===pe?o=W:(o=B,r=void 0);let f=o===B&&s[h+1].startsWith("/>")?" ":"";n+=o===W?a+Je:c>=0?(i.push(u),a.slice(0,c)+Ht+a.slice(c)+L+f):a+L+(c===-2?h:f)}return[Oe(s,n+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},X=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[u,g]=Le(t,e);if(this.el=s.createElement(u,i),H.currentNode=this.el.content,e===2){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=H.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Ht)){let $=g[o++],f=r.getAttribute(c).split(L),A=/([.?@])?(.*)/.exec($);a.push({type:1,index:n,name:A[2],strings:f,ctor:A[1]==="."?at:A[1]==="?"?lt:A[1]==="@"?ht:V}),r.removeAttribute(c)}else c.startsWith(L)&&(a.push({type:6,index:n}),r.removeAttribute(c));if(Te.test(r.tagName)){let c=r.textContent.split(L),$=c.length-1;if($>0){r.textContent=nt?nt.emptyScript:"";for(let f=0;f<$;f++)r.append(c[f],J()),H.nextNode(),a.push({type:2,index:++n});r.append(c[$],J())}}}else if(r.nodeType===8)if(r.data===Yt)a.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(L,c+1))!==-1;)a.push({type:7,index:n}),c+=L.length-1}n++}}static createElement(t,e){let i=Y.createElement("template");return i.innerHTML=t,i}};function j(s,t,e=s,i){if(t===y)return t;let r=i!==void 0?e.U?.[i]:e.N,n=K(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=j(s,r._$AS(s,t.values),r,i)),t}var ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??Y).importNode(e,!0);H.currentNode=r;let n=H.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new gt(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new ct(n,this,t)),this._$AV.push(u),a=i[++h]}o!==a?.index&&(n=H.nextNode(),o++)}return H.currentNode=Y,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},gt=class Ce{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),K(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Ue(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&K(this._$AH)?this._$AA.nextSibling.data=t:this.j(Y.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=X.createElement(Oe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new ot(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=ge.get(t.strings);return e===void 0&&ge.set(t.strings,e=new X(t)),e}D(t){xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new Ce(this.H(J()),this.H(J()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,r){let n=this.strings,o=!1;if(n===void 0)t=j(this,t,e,0),o=!K(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{let h=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=j(this,h[i+a],e,a),u===y&&(u=this._$AH[a]),o||=!K(u)||u!==this._$AH[a],u===b?t=b:t!==b&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends V{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},lt=class extends V{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},ht=class extends V{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=j(this,t,e,0)??b)===y)return;let i=this._$AH,r=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==b&&(i===b||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}},Xe={W:Ht,q:L,J:Yt,Z:1,F:Le,G:ot,K:Ue,X:j,Y:gt,tt:V,st:lt,it:ht,et:at,ot:ct},ts=Bt.litHtmlPolyfillSupport;ts?.(X,gt),(Bt.litHtmlVersions??=[]).push("3.1.3");var ke=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new gt(t.insertBefore(J(),n),n,void 0,e??{})}return r._$AI(s),r};var D=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};D._$litElement$=!0,D.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:D});var es=globalThis.litElementPolyfillSupport;es?.({LitElement:D});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ss}=Xe,is=s=>s===null||typeof s!="object"&&typeof s!="function";var $e=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,rs=s=>s?._$litType$?.h!=null;var Pe=s=>s.strings===void 0,be=()=>document.createComment(""),R=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let n=i.insertBefore(be(),r),o=i.insertBefore(be(),r);e=new ss(n,o,s,s.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==s;if(h){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let u=a.nextSibling;i.insertBefore(a,r),a=u}}}return e},k=(s,t,e=s)=>(s._$AI(t,e),s),ns={},tt=(s,t=ns)=>s._$AH=t,Dt=s=>s._$AH,Ct=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},Re=s=>{s._$AR()};var _=s=>(...t)=>({_$litDirective$:s,values:t}),w=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Q=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),Q(i,t);return!0},dt=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},De=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),ls(t)}};function os(s){this._$AN!==void 0?(dt(this),this._$AM=s,De(this)):this._$AM=s}function as(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let n=e;n<i.length;n++)Q(i[n],!1),dt(i[n]);else i!=null&&(Q(i,!1),dt(i));else Q(this,s)}var ls=s=>{s.type==2&&(s._$AP??=as,s._$AQ??=os)},et=class extends w{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),De(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Q(this,t),dt(this))}setValue(t){if(Pe(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ut=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},pt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var mt=class extends et{constructor(){super(...arguments),this.dt=new ut(this),this.ft=new pt}render(t,e){return y}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(h,a)=>{for await(let u of h)if(await a(u)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;i!==void 0&&(h=i(h,r)),a.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},gs=_(mt),$s=_(class extends mt{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&Re(this.ht);let e=R(this.ht);k(e,s)}}),ye=s=>rs(s)?s._$litType$.h:s.strings,bs=_(class extends w{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=$e(this.bt)?ye(this.bt):null,i=$e(t)?ye(t):null;if(e!==null&&(i===null||e!==i)){let r=Dt(s).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=ke(b,o),n.setConnected(!1),this.yt.set(e,n)}tt(n,[r]),R(n,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let n=Dt(r).pop();Re(s),R(s,void 0,n),tt(s,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var ys=_(class extends w{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return y}}),hs={},As=_(class extends w{constructor(){super(...arguments),this._t=hs}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var _s=_(class extends w{constructor(){super(...arguments),this.key=b}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(tt(s),this.key=t),e}}),vs=_(class extends w{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pe(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===y||t===b)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return y;if(s.type===4){if(!!t===e.hasAttribute(i))return y;if(s.type===1&&e.getAttribute(i)===t+"")return y}}return tt(s),t}});var kt=new WeakMap,ws=_(class extends et{render(s){return b}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),b}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=kt.get(t);e===void 0&&(e=new WeakMap,kt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?kt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Ae=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},Ss=_(class extends w{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],n=[],o=0;for(let h of s)r[o]=i?i(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Dt(s),{values:n,keys:o}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=o,n;let h=this.Ct??=[],a=[],u,g,c=0,$=r.length-1,f=0,A=n.length-1;for(;c<=$&&f<=A;)if(r[c]===null)c++;else if(r[$]===null)$--;else if(h[c]===o[f])a[f]=k(r[c],n[f]),c++,f++;else if(h[$]===o[A])a[A]=k(r[$],n[A]),$--,A--;else if(h[c]===o[A])a[A]=k(r[c],n[A]),R(s,a[A+1],r[c]),c++,A--;else if(h[$]===o[f])a[f]=k(r[$],n[f]),R(s,r[c],r[$]),$--,f++;else if(u===void 0&&(u=Ae(o,f,A),g=Ae(h,c,$)),u.has(h[c]))if(u.has(h[$])){let S=g.get(o[f]),F=S!==void 0?r[S]:null;if(F===null){let oe=R(s,r[c]);k(oe,n[f]),a[f]=oe}else a[f]=k(F,n[f]),R(s,r[c],F),r[S]=null;f++}else Ct(r[$]),$--;else Ct(r[c]),c++;for(;f<=A;){let S=R(s,a[A+1]);k(S,n[f]),a[f++]=S}for(;c<=$;){let S=r[c++];S!==null&&Ct(S)}return this.Ct=o,tt(s,a),y}}),Ne="important",cs=" !"+Ne,Es=_(class extends w{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let n=typeof r=="string"&&r.endsWith(cs);i.includes("-")||n?e.setProperty(i,n?r.slice(0,-11):r,n?Ne:""):e[i]=r}}return y}}),xs=_(class extends w{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?y:(this.At=s,document.importNode(s.content,!0))}}),G=class extends w{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};G.directiveName="unsafeHTML",G.resultType=1;var $t=_(G);var st=class extends G{};st.directiveName="unsafeSVG",st.resultType=2;var Us=_(st),_e=s=>!is(s)&&typeof s.then=="function",ve=1073741823;var Nt=class extends et{constructor(){super(...arguments),this.Mt=ve,this.Ut=[],this.dt=new ut(this),this.ft=new pt}render(...t){return t.find(e=>!_e(e))??y}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let a=e[h];if(!_e(a))return this.Mt=h,a;h<r&&a===i[h]||(this.Mt=ve,r=0,Promise.resolve(a).then(async u=>{for(;o.get();)await o.get();let g=n.deref();if(g!==void 0){let c=g.Ut.indexOf(a);c>-1&&c<g.Mt&&(g.Mt=c,g.setValue(u))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ts=_(Nt);var ds=Symbol.for(""),us=s=>{if(s?.r===ds)return s?._$litStatic$};var we=new Map,Ie=s=>(t,...e)=>{let i=e.length,r,n,o=[],h=[],a,u=0,g=!1;for(;u<i;){for(a=t[u];u<i&&(n=e[u],(r=us(n))!==void 0);)a+=r+t[++u],g=!0;u!==i&&h.push(n),o.push(a),u++}if(u===i&&o.push(t[i]),g){let c=o.join("$$lit$$");(t=we.get(c))===void 0&&(o.raw=o,we.set(c,t=o)),e=h}return s(t,...e)},Ms=Ie(l),Os=Ie(Ke);var p=class extends D{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var bt=Symbol("the albums manifest"),yt=Symbol("the images manifest"),Gs=Symbol("the site manifest"),At=Symbol("metadata about the site manifest"),_t=Symbol("the videos manifest"),vt=Symbol("the exif data"),wt=Symbol("the semantic data");var Be="photos",d=class{static EAGER="eager";static LAZY="lazy"},m=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"},z=class{static UNESCO="unesco"};async function ps(s="/manifest/env.json"){return await(await fetch(s)).json()}var it=await ps(),St=class{_data;constructor(t=`/manifest/images.${it.publication_id}.json`){this.url=t}processImages(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[yt]&&(this._data=window[yt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[yt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},Et=class{_data;constructor(t=`/manifest/videos.${it.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[_t]&&(this._data=window[_t]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[_t]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},xt=class{_data;constructor(t=`/manifest/albums.${it.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[bt]&&(this._data=window[bt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[bt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Ut=class{_data;constructor(t=`/manifest/exif.${it.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[vt]&&(this._data=window[vt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[vt]=e,this._data=e}exif(){return this._data}};function He(s,t,e){if(!s.hasOwnProperty(t))return!1;let i=s[t];if(i.includes(e))return!0;for(let r of i)if(He(s,r,e))return!0;return!1}var Tt=class{_data;constructor(t=`/manifest/semantic.${it.publication_id}.json`){this.url=t}async init(){if(window[wt]&&(this._data=window[wt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[wt]=t,this._data=t}semantic(){return this._data}},Mt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[At]&&(this._data=window[At]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[At]=t,this._data=t}metadata(){return this._data}isChild(t,e){return He(this._data,t,e)}childrenOf(t,e){let i=new Set([]);for(let r of e)this.isChild(t,r)&&i.add(r);return i}};var x=class s{static ROUTES={[m.PHOTOS]:this.showPhotosUrl,[m.ALBUMS]:this.showAlbumsUrl,[m.ALBUM]:this.showAlbumUrl,[m.METADATA]:this.showMetadataUrl,[m.ABOUT]:this.showAboutUrl,[m.VIDEOS]:this.showVideosUrl};static router(t){if(s.ROUTES.hasOwnProperty(t))return s.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===m.ALBUM||t===m.PHOTO||t===m.PHOTOS||t===m.METADATA}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var jt=class extends p{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",jt);var Vt=class extends p{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Be;return l`
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
    `}};customElements.define("photo-header",Vt);var zt=class extends p{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return l`
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
    `}};customElements.define("app-photo",zt);var Gt=class extends p{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Gt);var N=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(i/r);return t>n*o+1?"lazy":"eager"}};var v=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Zt=class extends p{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages().map((e,i)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${N.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",Zt);var Z=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let n=s.parse(r.created_at);n<e&&(e=n),n>i&&(i=n)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(i){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),u=r.toLocaleDateString("en-IE",{day:"numeric"}),g=n.toLocaleDateString("en-IE",{day:"numeric"}),c=r.toLocaleDateString("en-IE",{month:"short"}),$=n.toLocaleDateString("en-IE",{month:"short"}),f=r.getFullYear(),A=n.getFullYear(),S=c===$,F=f===A;return h===a?`${h} ${f}`:S&&F?`${u} - ${g} ${$} ${f}`:`${h} ${f} - ${a} ${A}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Ft=class extends p{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return Z.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),l`
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
    `}};customElements.define("photo-album",Ft);var Wt=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){return this.getAlbums().reduce((t,e)=>t+e.count,0)}render(){return performance.mark("start-albums-render"),l`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let i=N.loadingMode(e);return l`
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
    `}};customElements.define("photo-album-page",Wt);var qt=class extends p{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",qt);var Qt=class extends p{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Qt);var U=class s{static isUrn(t){return t.startsWith("urn:r\xF3")}static parseUrn(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[i,r]=t.split("?"),n=i.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return s.isUrn(t)&&s.parseUrn(t).type===e}};var Jt=class extends p{static properties={urn:{type:String}};id(){return U.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Jt);var Kt=class extends p{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object}}}connectedCallback(){super.connectedCallback(),this.albumPhotos()[0]||console.error(`empty album! ${this.id}`),v.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let i={},r=t.filter(n=>n[0]===e.id);for(let[n,o,h]of r)i[o]||(i[o]=[]),i[o].push(h);return{...e,relations:i}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=Z.dateRange(this.minDate,this.maxDate,t.matches),i=this.albumPhotos(),r=i.map((a,u)=>l`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${N.loadingMode(u)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_mosaic_url}"
        imageUrl="${a.full_image}"></app-photo>`),n=this.albumVideos().map((a,u)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),o=new Set(i.flatMap(a=>a.relations.location?.filter(u=>(console.log(U.parseUrn(u),z.UNESCO,u),U.is(u,z.UNESCO)))).filter(a=>a)),h=Array.from(o).map(a=>l`<unesco-link urn="${a}"></unesco-link>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${$t(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>

        <ul class="unesco-links">
          ${h.map(a=>l`<li>${a}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${r}
      </section>

      <section class="video-container">
        ${n}
      </section>
    </div>
    `}};customElements.define("album-page",Kt);var Xt=class extends p{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",Xt);var te=class extends p{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",te);var ee=class extends p{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),v.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?l`${this.exif.focal_length}`:this.exif.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?l`<em>${e}</em>`:U.isUrn(e)&&U.is(e,z.UNESCO)?l`<unesco-link .urn="${e}"></unesco-link>`:t.toLowerCase()==="summary"?l`${$t(e??"")}`:e}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>l`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,i=this.semantic;return l`
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
    `}};customElements.define("metadata-page",ee);var se=class extends p{static get properties(){return{}}connectedCallback(){super.connectedCallback(),v.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",se);var Ot=class{static loadingMode(t){return t===0?"auto":"none"}};var ie=class extends p{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,i)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Ot.loadingMode(i)}"
      ></app-video>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("videos-page",ie);var T=new xt,E=new St,M=new Et,I=new Mt,C=new Ut,O=new Tt,ms=[[T,d.EAGER],[E,d.EAGER],[M,d.EAGER],[I,d.EAGER],[C,d.EAGER],[O,d.EAGER]],fs={[m.ABOUT]:[[T,d.LAZY],[E,d.LAZY],[M,d.LAZY],[I,d.LAZY],[C,d.LAZY],[O,d.LAZY]],[m.ALBUMS]:[[T,d.EAGER],[E,d.LAZY],[M,d.LAZY],[I,d.LAZY],[C,d.LAZY],[O,d.LAZY]],[m.PHOTOS]:[[T,d.EAGER],[E,d.EAGER],[M,d.EAGER],[I,d.LAZY],[C,d.LAZY],[O,d.LAZY]],[m.VIDEOS]:[[T,d.LAZY],[E,d.LAZY],[M,d.EAGER],[I,d.LAZY],[C,d.LAZY],[O,d.LAZY]],[m.ALBUM]:[[T,d.EAGER],[E,d.EAGER],[M,d.EAGER],[O,d.EAGER],[I,d.LAZY],[C,d.LAZY]],[m.PHOTO]:[[T,d.EAGER],[E,d.EAGER],[M,d.EAGER],[I,d.LAZY],[C,d.EAGER],[O,d.EAGER]],[m.METADATA]:[[T,d.LAZY],[E,d.EAGER],[M,d.EAGER],[I,d.EAGER],[C,d.EAGER],[O,d.EAGER]]},re=class{static async init(){let t=x.getUrl();console.log(`loading ${t?.type}`);let e=fs[t?.type]??ms,i=[];for(let[r,n]of e)n===d.EAGER?i.push(r.init()):n===d.LAZY&&r.init();await Promise.all(i)}};await re.init();var ne=class s extends p{static DEFAULT_PAGE=m.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:m.ALBUM,albums:m.ALBUMS,photos:m.PHOTOS,metadata:m.METADATA,about:m.ABOUT,videos:m.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=x.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),x.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=m.PHOTOS,this.id=i,this.title=e,x.showAlbumUrl(i)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r,tags:n}=t.detail;this.page=m.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,this.tags=n??[],x.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=x.router(this.page);x.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <photo-album-page .albums="${T}" class="${e}"></photo-album-page>
      `;if(this.page===m.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===m.PHOTOS)return l`<photos-page class="${e}" .images=${E}></photos-page>`;if(this.page===m.ALBUM){this.id||console.error("no album id provided");let i=T.albums().find(r=>r.id===this.id);return i||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${E}
        .videos=${M}
        .semantic=${O}
        title=${i.album_name}
        id=${this.id}
        minDate=${i.min_date}
        maxDate=${i.max_date}
        imageCount=${i.photos_count}
        description=${i.description}
        class="${e}"></album-page>
      `}if(this.page===m.METADATA){let i=E.images().find(h=>h.id===this.id),r=C.exif().find(h=>h.id===this.id),n=O.semantic().filter(h=>h[0]===this.id),o={};for(let[h,a,u]of n)o[a]?typeof o[a]=="string"&&(o[a]=[o[a],u]):o[a]=u;return i||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page .image=${i} .semantic=${o} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===m.VIDEOS)return l`
      <videos-page .videos=${M} class="${e}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,i=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),i.push("dark-mode")):e.classList=[],l`
    <body>
      <div class="${i.join(" ")}"
        @click-album=${this.receiveClickAlbum}
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
    `}};customElements.define("photo-app",ne);export{ms as DEFAULT_DEPENDENCIES,fs as PAGE_DEPENDECIES,ne as PhotoApp};
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
