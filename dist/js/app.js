var ft=globalThis,Jt=ft.ShadowRoot&&(ft.ShadyCSS===void 0||ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,je=Symbol(),we=new WeakMap,Wt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Jt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=we.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&we.set(e,t))}return t}toString(){return this.cssText}},os=s=>new Wt(typeof s=="string"?s:s+"",void 0,je);var as=(s,t)=>{if(Jt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=ft.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},xe=Jt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return os(e)})(s):s,{is:ls,defineProperty:cs,getOwnPropertyDescriptor:hs,getOwnPropertyNames:ds,getOwnPropertySymbols:ps,getPrototypeOf:us}=Object,Et=globalThis,Ee=Et.trustedTypes,ms=Ee?Ee.emptyScript:"",fs=Et.reactiveElementPolyfillSupport,nt=(s,t)=>s,Zt={toAttribute(s,t){switch(t){case Boolean:s=s?ms:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ge=(s,t)=>!ls(s,t),Te={attribute:!0,type:String,converter:Zt,reflect:!1,hasChanged:Ge};Symbol.metadata??=Symbol("metadata"),Et.litPropertyMetadata??=new WeakMap;var G=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Te){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&cs(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=hs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let c=r?.call(this);n.call(this,o),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Te}static o(){if(this.hasOwnProperty(nt("elementProperties")))return;let t=us(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(nt("properties"))){let e=this.properties,i=[...ds(e),...ps(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(xe(r))}else t!==void 0&&e.push(xe(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return as(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Zt).toAttribute(e,i.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Zt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??Ge)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[nt("elementProperties")]=new Map,G[nt("finalized")]=new Map,fs?.({ReactiveElement:G}),(Et.reactiveElementVersions??=[]).push("2.0.4");var Xt=globalThis,gt=Xt.trustedTypes,Ue=gt?gt.createPolicy("lit-html",{createHTML:s=>s}):void 0,te="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+B,gs=`<${ee}>`,Z=document,at=()=>Z.createComment(""),lt=s=>s===null||typeof s!="object"&&typeof s!="function",Ve=Array.isArray,Ye=s=>Ve(s)||typeof s?.[Symbol.iterator]=="function",zt=`[ 	
\f\r]`,rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ie=/-->/g,Ce=/>/g,F=RegExp(`>|${zt}(?:([^\\s"'>=/]+)(${zt}*=${zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Re=/"/g,ze=/^(?:script|style|textarea|title)$/i,qe=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),l=qe(1),$s=qe(2),S=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Le=new WeakMap,W=Z.createTreeWalker(Z,129);function Fe(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(t):t}var We=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":"",o=rt;for(let c=0;c<e;c++){let a=s[c],h,u,d=-1,m=0;for(;m<a.length&&(o.lastIndex=m,u=o.exec(a),u!==null);)m=o.lastIndex,o===rt?u[1]==="!--"?o=Ie:u[1]!==void 0?o=Ce:u[2]!==void 0?(ze.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=F):u[3]!==void 0&&(o=F):o===F?u[0]===">"?(o=r??rt,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?F:u[3]==='"'?Re:Me):o===Re||o===Me?o=F:o===Ie||o===Ce?o=rt:(o=F,r=void 0);let $=o===F&&s[c+1].startsWith("/>")?" ":"";n+=o===rt?a+gs:d>=0?(i.push(h),a.slice(0,d)+te+a.slice(d)+B+$):a+B+(d===-2?c:$)}return[Fe(s,n+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},ct=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[h,u]=We(t,e);if(this.el=s.createElement(h,i),W.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=W.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(te)){let m=u[o++],$=r.getAttribute(d).split(B),A=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:A[2],strings:$,ctor:A[1]==="."?bt:A[1]==="?"?yt:A[1]==="@"?At:K}),r.removeAttribute(d)}else d.startsWith(B)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(ze.test(r.tagName)){let d=r.textContent.split(B),m=d.length-1;if(m>0){r.textContent=gt?gt.emptyScript:"";for(let $=0;$<m;$++)r.append(d[$],at()),W.nextNode(),a.push({type:2,index:++n});r.append(d[m],at())}}}else if(r.nodeType===8)if(r.data===ee)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(B,d+1))!==-1;)a.push({type:7,index:n}),d+=B.length-1}n++}}static createElement(t,e){let i=Z.createElement("template");return i.innerHTML=t,i}};function Q(s,t,e=s,i){if(t===S)return t;let r=i!==void 0?e.U?.[i]:e.N,n=lt(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=Q(s,r._$AS(s,t.values),r,i)),t}var $t=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??Z).importNode(e,!0);W.currentNode=r;let n=W.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new Tt(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new vt(n,this,t)),this._$AV.push(h),a=i[++c]}o!==a?.index&&(n=W.nextNode(),o++)}return W.currentNode=Z,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Tt=class Ze{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),lt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==S&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Ye(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==y&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.j(Z.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ct.createElement(Fe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new $t(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Le.get(t.strings);return e===void 0&&Le.set(t.strings,e=new ct(t)),e}D(t){Ve(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new Ze(this.H(at()),this.H(at()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,e=this,i,r){let n=this.strings,o=!1;if(n===void 0)t=Q(this,t,e,0),o=!lt(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let c=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=Q(this,c[i+a],e,a),h===S&&(h=this._$AH[a]),o||=!lt(h)||h!==this._$AH[a],h===y?t=y:t!==y&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!r&&this.B(t)}B(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bt=class extends K{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===y?void 0:t}},yt=class extends K{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},At=class extends K{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??y)===S)return;let i=this._$AH,r=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}},bs={W:te,q:B,J:ee,Z:1,F:We,G:$t,K:Ye,X:Q,Y:Tt,tt:K,st:yt,it:At,et:bt,ot:vt},ys=Xt.litHtmlPolyfillSupport;ys?.(ct,Tt),(Xt.litHtmlVersions??=[]).push("3.1.3");var Qe=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new Tt(t.insertBefore(at(),n),n,void 0,e??{})}return r._$AI(s),r};var Y=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Qe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return S}};Y._$litElement$=!0,Y.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:Y});var As=globalThis.litElementPolyfillSupport;As?.({LitElement:Y});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:vs}=bs,Ss=s=>s===null||typeof s!="object"&&typeof s!="function";var Oe=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,_s=s=>s?._$litType$?.h!=null;var Ke=s=>s.strings===void 0,ke=()=>document.createComment(""),V=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let n=i.insertBefore(ke(),r),o=i.insertBefore(ke(),r);e=new vs(n,o,s,s.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==s;if(c){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||c){let a=e._$AA;for(;a!==n;){let h=a.nextSibling;i.insertBefore(a,r),a=h}}}return e},j=(s,t,e=s)=>(s._$AI(t,e),s),ws={},ht=(s,t=ws)=>s._$AH=t,Qt=s=>s._$AH,qt=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},Je=s=>{s._$AR()};var T=s=>(...t)=>({_$litDirective$:s,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var ot=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),ot(i,t);return!0},St=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},Xe=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),Ts(t)}};function xs(s){this._$AN!==void 0?(St(this),this._$AM=s,Xe(this)):this._$AM=s}function Es(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let n=e;n<i.length;n++)ot(i[n],!1),St(i[n]);else i!=null&&(ot(i,!1),St(i));else ot(this,s)}var Ts=s=>{s.type==2&&(s._$AP??=Es,s._$AQ??=xs)},dt=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Xe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(ot(this,t),St(this))}setValue(t){if(Ke(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var _t=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},wt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var xt=class extends dt{constructor(){super(...arguments),this.dt=new _t(this),this.ft=new wt}render(t,e){return S}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return S;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(c,a)=>{for await(let h of c)if(await a(h)===!1)return})(e,async c=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;i!==void 0&&(c=i(c,r)),a.commitValue(c,r),r++}return!0}),S}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Hs=T(xt),Ut=T(class extends xt{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&Je(this.ht);let e=V(this.ht);j(e,s)}}),Pe=s=>_s(s)?s._$litType$.h:s.strings,js=T(class extends L{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=Oe(this.bt)?Pe(this.bt):null,i=Oe(t)?Pe(t):null;if(e!==null&&(i===null||e!==i)){let r=Qt(s).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Qe(y,o),n.setConnected(!1),this.yt.set(e,n)}ht(n,[r]),V(n,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let n=Qt(r).pop();Je(s),V(s,void 0,n),ht(s,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Gs=T(class extends L{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return S}}),Us={},Vs=T(class extends L{constructor(){super(...arguments),this._t=Us}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return S}else if(this._t===t)return S;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ys=T(class extends L{constructor(){super(...arguments),this.key=y}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(ht(s),this.key=t),e}}),zs=T(class extends L{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ke(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===S||t===y)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return S;if(s.type===4){if(!!t===e.hasAttribute(i))return S;if(s.type===1&&e.getAttribute(i)===t+"")return S}}return ht(s),t}});var Ft=new WeakMap,qs=T(class extends dt{render(s){return y}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),y}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Ft.get(t);e===void 0&&(e=new WeakMap,Ft.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?Ft.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Ne=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},Fs=T(class extends L{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],n=[],o=0;for(let c of s)r[o]=i?i(c,o):o,n[o]=e(c,o),o++;return{values:n,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Qt(s),{values:n,keys:o}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=o,n;let c=this.Ct??=[],a=[],h,u,d=0,m=r.length-1,$=0,A=n.length-1;for(;d<=m&&$<=A;)if(r[d]===null)d++;else if(r[m]===null)m--;else if(c[d]===o[$])a[$]=j(r[d],n[$]),d++,$++;else if(c[m]===o[A])a[A]=j(r[m],n[A]),m--,A--;else if(c[d]===o[A])a[A]=j(r[d],n[A]),V(s,a[A+1],r[d]),d++,A--;else if(c[m]===o[$])a[$]=j(r[m],n[$]),V(s,r[d],r[m]),m--,$++;else if(h===void 0&&(h=Ne(o,$,A),u=Ne(c,d,m)),h.has(c[d]))if(h.has(c[m])){let E=u.get(o[$]),q=E!==void 0?r[E]:null;if(q===null){let mt=V(s,r[d]);j(mt,n[$]),a[$]=mt}else a[$]=j(q,n[$]),V(s,r[d],q),r[E]=null;$++}else qt(r[m]),m--;else qt(r[d]),d++;for(;$<=A;){let E=V(s,a[A+1]);j(E,n[$]),a[$++]=E}for(;d<=m;){let E=r[d++];E!==null&&qt(E)}return this.Ct=o,ht(s,a),S}}),ts="important",Is=" !"+ts,Ws=T(class extends L{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let n=typeof r=="string"&&r.endsWith(Is);i.includes("-")||n?e.setProperty(i,n?r.slice(0,-11):r,n?ts:""):e[i]=r}}return S}}),Zs=T(class extends L{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?S:(this.At=s,document.importNode(s.content,!0))}}),tt=class extends L{constructor(t){if(super(t),this.bt=y,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===y||t==null)return this.kt=void 0,this.bt=t;if(t===S)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};tt.directiveName="unsafeHTML",tt.resultType=1;var It=T(tt);var pt=class extends tt{};pt.directiveName="unsafeSVG",pt.resultType=2;var Qs=T(pt),De=s=>!Ss(s)&&typeof s.then=="function",Be=1073741823;var Kt=class extends dt{constructor(){super(...arguments),this.Mt=Be,this.Ut=[],this.dt=new _t(this),this.ft=new wt}render(...t){return t.find(e=>!De(e))??S}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this.Mt);c++){let a=e[c];if(!De(a))return this.Mt=c,a;c<r&&a===i[c]||(this.Mt=Be,r=0,Promise.resolve(a).then(async h=>{for(;o.get();)await o.get();let u=n.deref();if(u!==void 0){let d=u.Ut.indexOf(a);d>-1&&d<u.Mt&&(u.Mt=d,u.setValue(h))}}))}return S}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ks=T(Kt);var Cs=Symbol.for(""),Ms=s=>{if(s?.r===Cs)return s?._$litStatic$};var He=new Map,es=s=>(t,...e)=>{let i=e.length,r,n,o=[],c=[],a,h=0,u=!1;for(;h<i;){for(a=t[h];h<i&&(n=e[h],(r=Ms(n))!==void 0);)a+=r+t[++h],u=!0;h!==i&&c.push(n),o.push(a),h++}if(h===i&&o.push(t[i]),u){let d=o.join("$$lit$$");(t=He.get(d))===void 0&&(o.raw=o,He.set(d,t=o)),e=c}return s(t,...e)},Js=es(l),Xs=es($s);var f=class extends Y{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var Ct=Symbol("the albums manifest"),Mt=Symbol("the images manifest"),ui=Symbol("the site manifest"),Rt=Symbol("the videos manifest"),Lt=Symbol("the exif data"),mi=Symbol("the semantic data"),fi=Symbol("the album stats"),Ot=Symbol("the triples data");var ss="photos",p=class{static EAGER="eager";static LAZY="lazy"},g=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},b=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},_=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia"},J=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var et=window.envConfig,kt=class{_data;constructor(t=`/manifest/images.${et.publication_id}.json`){this.url=t}processImages(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[Mt]&&(this._data=window[Mt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[Mt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},Pt=class{_data;constructor(t=`/manifest/videos.${et.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[Rt]&&(this._data=window[Rt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[Rt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Nt=class{_data;constructor(t=`/manifest/albums.${et.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[Ct]&&(this._data=window[Ct]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Ct]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Dt=class{_data;constructor(t=`/manifest/exif.${et.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];i.push(n)}return i}async init(){if(window[Lt]&&(this._data=window[Lt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Lt]=e,this._data=e}exif(){return this._data}};var Bt=class{_data;constructor(t=`/manifest/stats.${et.publication_id}.json`){this.url=t}async init(){let t=document.getElementById("stats-data");this._data=JSON.parse(t.textContent),this._data||console.error("stats symbol not injected")}stats(){return this._data}},Ht=class{_data;constructor(t=`/manifest/triples.${et.publication_id}.json`){this.url=t}async init(){if(window[Ot]&&(this._data=window[Ot]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Ot]=t,this._data=t}};var P=class s{static ROUTES={[g.PHOTOS]:this.showPhotosUrl,[g.ALBUMS]:this.showAlbumsUrl,[g.ALBUM]:this.showAlbumUrl,[g.METADATA]:this.showMetadataUrl,[g.ABOUT]:this.showAboutUrl,[g.VIDEOS]:this.showVideosUrl,[g.THING]:this.showThingUrl};static router(t){if(s.ROUTES.hasOwnProperty(t))return s.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===g.ALBUM||t===g.PHOTO||t===g.METADATA||t===g.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var se=class extends f{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",se);var ie=class extends f{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=ss;return l`
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
    `}};customElements.define("photo-header",ie);var jt=new Map,U=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(i/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(jt.has(t))return jt.get(t);let e=t.split("#").map(n=>`#${n}`),i=document.createElement("canvas");i.width=2,i.height=2;let r=i.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),jt.set(t,i.toDataURL("image/png")),jt.get(t)}};var re=class extends f{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:U.encodeBitmapDataURL(this.mosaicColours)},e=document.createElement("div");e.innerHTML=this.summary??"";let i=e.textContent??e.innerText??"";return l`
    <div class="photo">
      <a href="${"#/metadata/"+this.id}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",t)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          alt=${i}
          title=${i}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};customElements.define("app-photo",re);var ne=class extends f{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",ne);var w=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var oe=class extends f{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let i=0;i<t.length;i++){let r=t[i];yield l`
          <app-photo
            id=${r.id}
            loading="${U.loadingMode(i)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${Ut(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",oe);var ae=class extends f{static get properties(){return{albums:{type:Array},stats:{type:Array}}}render(){return l`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",ae);var st=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let n=s.parse(r.created_at);n<e&&(e=n),n>i&&(i=n)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(i){let o={day:"numeric",month:"short"},c=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),h=r.toLocaleDateString("en-IE",{day:"numeric"}),u=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),m=n.toLocaleDateString("en-IE",{month:"short"}),$=r.getFullYear(),A=n.getFullYear(),E=d===m,q=$===A;return c===a?`${c} ${$}`:E&&q?`${h} - ${u} ${m} ${$}`:`${c} ${$} - ${a} ${A}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return c===a?c:`${c} \u2014 ${a}`}}};var it=class s{static TABLE={England:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",France:"\u{1F1EB}\u{1F1F7}",Germany:"\u{1F1E9}\u{1F1EA}",Ireland:"\u{1F1EE}\u{1F1EA}",Italy:"\u{1F1EE}\u{1F1F9}",Lanzarote:"\u{1F1EA}\u{1F1F8}",Mallorca:"\u{1F1EA}\u{1F1F8}","Northern Ireland":"\u{1F1EC}\u{1F1E7}",Norway:"\u{1F1F3}\u{1F1F4}",Scotland:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",Slovenia:"\u{1F1F8}\u{1F1EE}",Spain:"\u{1F1EA}\u{1F1F8}",Sweden:"\u{1F1F8}\u{1F1EA}",Switzerland:"\u{1F1E8}\u{1F1ED}",Tenerife:"\u{1F1EA}\u{1F1F8}","The Netherlands":"\u{1F1F3}\u{1F1F1}","United States of America":"\u{1F1FA}\u{1F1F8}",Wales:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"};static flag(t){return s.TABLE[t]?s.TABLE[t]:"\u{1F3F3}\uFE0F"}static flags(t){return t.map(e=>s.flag(e)).join(" ")}};var le=class extends f{static get properties(){return{title:{type:String},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return st.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){performance.mark(`start-album-render-${this.url}`);let t=U.encodeBitmapDataURL(this.mosaicColours),e=it.flags(this?.countries.split(","));return l`
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
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
        <p class="photo-album-countries">${e}</p>
        </div>

    </div>
    </div>
    `}};customElements.define("photo-album",le);var ce=class extends f{static get properties(){return{albums:{type:Object},stats:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((i,r)=>r.maxDate-i.maxDate);async function*e(){for(let i=0;i<t.length;i++){let r=t[i],n=U.loadingMode(i);yield l`
          <photo-album
            title="${r.title}"
            url="${r.url}"
            mosaicColours="${r.mosaicColours}"
            id="${r.id}" count="${r.count}"
            minDate="${r.minDate}"
            maxDate="${r.maxDate}"
            countries="${r.flags}"
            loading=${n}>
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <section class="album-container">
      ${Ut(e())}
    </section>
    `}};customElements.define("photo-album-page",ce);var he=class extends f{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",he);var de=class extends f{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",de);function pe(s,t="r\xF3"){if(!s.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${s}`);let e=s.split(":")[2],[i,r]=s.split("?"),n=i.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function z(s,t="r\xF3"){try{return pe(s,t)}catch{return{type:"unknown",id:s,qs:{}}}}var I=class{static source(s){return s[0]}static relation(s){return s[1]}static target(s){return s[2]}},Rs=class{#e;#t;#s;constructor(){this.#e=0,this.#t=new Map,this.#s=new Map}map(){return this.#t}reverseMap(){return this.#s}add(s){return this.#t.has(s)?this.#t.get(s):(this.#t.set(s,this.#e),this.#s.set(this.#e,s),this.#e++,this.#e-1)}getIndex(s){return this.#t.get(s)}getValue(s){return this.#s.get(s)}has(s){return this.#t.has(s)}},Ls=class{static intersection(s,t){if(t.length===0)return new Set;t.sort((i,r)=>i.size-r.size);let e=new Set(t[0]);for(let i=1;i<t.length;i++){let r=t[i];for(let n of e)s.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},Os=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},ks=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Ps=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;constructor(s){this.indexedTriples=[],this.stringIndex=new Rs,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.indexTriples(s),this.metrics=new Os}indexTriples(s){for(let t=0;t<s.length;t++)this.indexTriple(s[t],t)}indexTriple(s,t){let e=z(I.source(s)),i=I.relation(s),r=z(I.target(s)),n=this.stringIndex.add(e.type),o=this.stringIndex.add(e.id),c=this.stringIndex.add(i),a=this.stringIndex.add(r.type),h=this.stringIndex.add(r.id);this.indexedTriples.push([this.stringIndex.add(I.source(s)),c,this.stringIndex.add(I.target(s))]),this.sourceType.has(n)||this.sourceType.set(n,new Set),this.sourceType.get(n).add(t),this.sourceId.has(o)||this.sourceId.set(o,new Set),this.sourceId.get(o).add(t);for(let[u,d]of Object.entries(e.qs)){let m=this.stringIndex.add(`${u}=${d}`);this.sourceQs.has(m)||this.sourceQs.set(m,new Set),this.sourceQs.get(m).add(t)}this.relations.has(c)||this.relations.set(c,new Set),this.relations.get(c).add(t),this.targetType.has(a)||this.targetType.set(a,new Set),this.targetType.get(a).add(t),this.targetId.has(h)||this.targetId.set(h,new Set),this.targetId.get(h).add(t);for(let[u,d]of Object.entries(r.qs)){let m=this.stringIndex.add(`${u}=${d}`);this.targetQs.has(m)||this.targetQs.set(m,new Set),this.targetQs.get(m).add(t)}}add(s){let t=this.indexedTriples.length;for(let e=0;e<s.length;e++)this.indexTriple(s[e],t+e)}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([s,t,e])=>[this.stringIndex.getValue(s),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(s){if(s<0||s>=this.indexedTriples.length)return;let[t,e,i]=this.indexedTriples[s];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(i)]}getSourceTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},is=class C{index;triplesCount;tripleRows;metrics;constructor(t){this.index=new Ps(t),this.triplesCount=this.index.length,this.tripleRows=new Set,this.metrics=new ks;for(let e=0;e<this.triplesCount;e++)this.tripleRows.add(e)}static of(t){return new C(t)}static from(t){let e=[];for(let i of t){let{id:r,...n}=i;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,c]of Object.entries(n))if(Array.isArray(c))for(let a of c)e.push([r,o,a]);else e.push([r,o,c])}return new C(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let i=e;i<this.triplesCount;i++)this.tripleRows.add(i)}map(t){return new C(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new C(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?I.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?I.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?I.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(I.source))}relations(){return new Set(this.index.triples().map(I.relation))}targets(){return new Set(this.index.triples().map(I.target))}objects(t=!1){let e={};for(let[r,n,o]of this.index.triples())e[r]||(e[r]={}),e[r][n]?Array.isArray(e[r][n])?e[r][n].push(o):e[r][n]=[e[r][n],o]:e[r][n]=t?[o]:o;let i=[];for(let[r,n]of Object.entries(e))n.id=r,i.push(n);return i}search(t){let e=[this.tripleRows],{source:i,relation:r,target:n}=t;if(typeof i>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");if(i){if(i.type){let a=this.index.getSourceTypeSet(i.type);if(a)e.push(a);else return new C([])}if(i.id){let a=this.index.getSourceIdSet(i.id);if(a)e.push(a);else return new C([])}if(i.qs)for(let[a,h]of Object.entries(i.qs)){let u=this.index.getSourceQsSet(a,h);if(u)e.push(u);else return new C([])}}if(n){if(n.type){let a=this.index.getTargetTypeSet(n.type);if(a)e.push(a);else return new C([])}if(n.id){let a=this.index.getTargetIdSet(n.id);if(a)e.push(a);else return new C([])}if(n.qs)for(let[a,h]of Object.entries(n.qs)){let u=this.index.getTargetQsSet(a,h);if(u)e.push(u);else return new C([])}}if(r){let a=typeof r=="string"?{relation:[r]}:r,h=new Set;for(let u of a.relation){let d=this.index.getRelationSet(u);if(d)for(let m of d)h.add(m)}if(h.size>0)e.push(h);else return new C([])}let o=Ls.intersection(this.metrics,e),c=[];for(let a of o){let h=this.index.getTriple(a);if(!i?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){c.push(h);continue}let u=!0;i?.predicate&&(u=u&&i.predicate(I.source(h))),n?.predicate&&(u=u&&n.predicate(I.target(h))),typeof r=="object"&&r.predicate&&(u=u&&r.predicate(I.relation(h))),u&&c.push(h)}return new C(c)}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var M=class{static isUrnSource(t){return v.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return v.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},v=class s{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[i,r]=t.split("?"),n=i.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return s.isUrn(t)&&s.parseUrn(t).type===e}static toURL(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:i}=s.parseUrn(t);return`#/thing/${e}:${i}`}static sameURN(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let i=s.parseUrn(t),r=s.parseUrn(e);return i.type===r.type&&i.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return s.isUrn(t)&&s.parseUrn(t).id===e}static sameType(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let i=s.parseUrn(t),r=s.parseUrn(e);return i.type===r.type}static isType(t,e){return s.isUrn(t)?s.parseUrn(t).type===e:!1}},X=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:_.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:i}=pe(e);return t.search({source:{id:i},relation:_.BIRDWATCH_URL}).firstTarget()}},rs=!1,Gt=new is([]);function Ns(s){return M.getRelation(s)!==_.RATING?s:[M.getSource(s),M.getRelation(s),`urn:r\xF3:rating:${encodeURIComponent(M.getTarget(s))}`]}function ut(s){return rs||(Gt.add(s),Gt=Gt.map(Ns),rs=!0),Gt}var ue=class extends f{static properties={urn:{type:String}};id(){return v.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",ue);var me=class extends f{static properties={urn:{type:String},triples:{type:Array}};name(){let{type:t,id:e}=v.parseUrn(this.urn);if(J.has(t))return l`<span>${X.toCommonName(this.triples,e)}</span>`;let i=this.triples.search({source:v.parseUrn(this.urn),relation:_.NAME}).firstTarget();return i?l`<span>${i}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=v.parseUrn(this.urn);return{[b.BIRD]:"bird-link",[b.MAMMAL]:"mammal-link",[b.REPTILE]:"reptile-link",[b.AMPHIBIAN]:"amphibian-link",[b.FISH]:"fish-link",[b.INSECT]:"insect-link"}[t]??""}render(){return v.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${v.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",me);var fe=class extends f{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),w.setIndex()}albumPhotos(t){return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let i=t.search({source:{id:e.id}}).firstObject(!0);return{...e,relations:i??{}}})}albumVideos(t){return this.videos.videos().filter(e=>e.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},i=this.albumPhotos(t);for(let n of[b.UNESCO])e[n]=Array.from(new Set(i.flatMap(o=>o.relations[_.LOCATION]?.filter(c=>v.is(c,n))).filter(o=>o)));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])e[n]=Array.from(new Set(i.flatMap(o=>o.relations[_.SUBJECT]?.filter(c=>v.is(c,n))).filter(o=>o)));let r=[];r=r.concat(e[b.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),i=st.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,h)=>l`
      <app-photo
        id=${a.id}
        summary=${a.relations.summary}
        loading="${U.loadingMode(h)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos().map((a,h)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),c=it.flags(this?.countries.split(","));return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${i}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${c}</p>
        <p class="photo-album-description">${It(this.description)}
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
    `}};customElements.define("album-page",fe);var ge=class extends f{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",ge);var $e=class extends f{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",$e);var be=class extends f{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),w.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${t.f_stop}</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${t.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(i=>l`<li>${this.renderSemanticValue.call(this,t,i)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${It(e??"")}`;if(v.isRating(e)){let i=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${i}"></thing-link>`}else{if(v.isUrn(e)&&v.is(e,b.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(v.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,i)=>M.getRelation(e).localeCompare(M.getRelation(i))).filter(e=>!this.isIgnoredKey(M.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(M.getRelation(e))}</th>
              <td>${this.renderSemanticValue(M.getRelation(e),M.getTarget(e))}</td>
          `)}
      <table>
    `}renderExif(t){return l`
    <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${t.created_at}
      </time></td>
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
        ${this.renderFocalLength(t)}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1/${t.exposure_time?Math.round(1/t.exposure_time):"Unknown"}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture(t)}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${t.iso}</td>
      </tr>
    </table>
    `}render(){let t=this.image,e=t.album_id,r=this.triples.search({source:{id:t.id}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(r)}

    ${this.exif?this.renderExif(this.exif):l``}

    </section>
    `}};customElements.define("metadata-page",be);var ye=class extends f{static get properties(){return{}}connectedCallback(){super.connectedCallback(),w.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",ye);var Vt=class{static loadingMode(t){return t===0?"auto":"none"}};var Ae=class extends f{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}videos(){return this.videos.videos()}render(){let t=this.videos().map((e,i)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Vt.loadingMode(i)}"
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
    `}};customElements.define("videos-page",Ae);var ve=class extends f{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}filterUrnImages(t,e,i){let r=[_.SUBJECT,_.LOCATION,_.RATING],n=z(this.urn);n.id==="*"&&delete n.id;let c=e.search(i).sources();return Array.from(c).flatMap(a=>t.filter(h=>h.id===a).slice(0,1))}renderSubjectPhotos(t,e){return t.sort((i,r)=>r.created_at-i.created_at).map((i,r)=>l`
      <app-photo
        id=${i.id}
        loading="${U.loadingMode(r)}"
        thumbnailUrl="${i.thumbnail_url}"
        mosaicColours="${i.mosaic_colours}"
        imageUrl="${i.full_image}"></app-photo>`)}renderSubjectAlbums(t,e,i){let r=this.filterUrnImages(t,e,i),n=new Set(r.map(o=>o.album_id));return Array.from(n).flatMap(o=>this.albums.albums().filter(c=>c.id===o)).sort((o,c)=>c.min_date-o.min_date).map(o=>l`
          <photo-album
            title="${o.album_name}"
            url="${o.thumbnail_url}"
            mosaicColours="${o.mosaic}"
            id="${o.id}"
            count="${o.photos_count}"
            minDate="${o.min_date}"
            maxDate="${o.max_date}"
            countries="${o.flags}"
            loading="eager">
            </photo-album>
      `)}firstPhotographed(t,e,i){let n=this.filterUrnImages(t,e,i).sort((o,c)=>o.created_at-c.created_at)[0];return n?new Date(n.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=v.parseUrn(this.urn),i=this.triples.search({source:{id:t,type:e},relation:_.NAME}).firstTarget();if(i)return i;try{let r=v.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:J.has(r.type)?X.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=[];if(J.has(t.type))for(let i of["captivity","wild"]){let n={...t,qs:{context:i}};e.push({label:i,query:{target:n}})}else e.push({label:"default",query:{target:t}});return e}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,i])=>i?e==="default"?[l`
        <div class="photo-group">
          ${i}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${e.charAt(0).toUpperCase()+e.slice(1)}</h4>
          ${i}
        </div>
      `]:[])}
    <div/>`}render(){let t=this.triples,e=this.images.images(),i=v.parseUrn(this.urn),r=i.type,n=t.search({source:z(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`${n.country}`),n.fcode_name){let H=n.fcode_name;o["Place Type"]=l`${H.charAt(0).toUpperCase()}${H.slice(1)}`}J.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:z(this.urn)})}</span>`);let c=n[_.WIKIPEDIA],a=n[_.BIRDWATCH_URL],h=n[_.LONGITUDE],u=n[_.LATITUDE],d;if(h&&u){let H=`https://www.google.com/maps?q=${u},${h}`;d=l`
      <a href="${H}" target="_blank" rel="noopener">[maps]</a>
      `}let m=z(this.urn);m.id==="*"&&delete m.id;let $={target:m},A=this.getPhotoQueries(z(this.urn)),E={};for(let{query:H,label:Yt}of A){let ns=this.filterUrnImages(e,t,H);E[Yt]=this.renderSubjectPhotos(ns)}let q=this.renderSubjectAlbums(e,t,$),mt=this.renderPhotoSection(E);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${J.has(r)&&i.id!=="*"?l`<span class="thing-binomial">(${X.pretty(i.id)})</span>`:l``}
        </p>
        <br>

        ${c?l`<a href="${c}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([H,Yt])=>l`
          <tr>
            <th class="exif-heading">${H}</th>
            <td>${Yt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${mt}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${q}
        </section>

      </div>
    `}};customElements.define("thing-page",ve);var O=new Nt,R=new kt,k=new Pt,N=new Dt,D=new Bt,x=new Ht,Ds=[[O,p.EAGER],[R,p.EAGER],[k,p.EAGER],[N,p.EAGER],[D,p.EAGER],[x,p.EAGER]],Bs={[g.ABOUT]:[[O,p.LAZY],[R,p.LAZY],[k,p.LAZY],[N,p.LAZY],[D,p.LAZY],[x,p.EAGER]],[g.ALBUMS]:[[O,p.EAGER],[R,p.LAZY],[k,p.LAZY],[N,p.LAZY],[D,p.EAGER],[x,p.EAGER]],[g.PHOTOS]:[[O,p.EAGER],[R,p.EAGER],[k,p.EAGER],[N,p.LAZY],[D,p.LAZY],[x,p.EAGER]],[g.VIDEOS]:[[O,p.LAZY],[R,p.LAZY],[k,p.EAGER],[N,p.LAZY],[D,p.LAZY],[x,p.EAGER]],[g.ALBUM]:[[O,p.EAGER],[R,p.EAGER],[k,p.EAGER],[D,p.LAZY],[N,p.LAZY],[x,p.EAGER]],[g.PHOTO]:[[O,p.EAGER],[R,p.EAGER],[k,p.EAGER],[N,p.EAGER],[D,p.LAZY],[x,p.EAGER]],[g.METADATA]:[[O,p.LAZY],[R,p.EAGER],[k,p.EAGER],[N,p.EAGER],[D,p.LAZY],[x,p.EAGER]],[g.THING]:[[O,p.EAGER],[R,p.EAGER],[k,p.LAZY],[N,p.LAZY],[D,p.LAZY],[x,p.EAGER]]},Se=class{static async init(){let t=P.getUrl();console.log(`loading ${t?.type}`);let e=Bs[t?.type]??Ds,i=[];for(let[r,n]of e)n===p.EAGER?i.push(r.init()):n===p.LAZY&&r.init();await Promise.all(i)}};await Se.init();var _e=class s extends f{static DEFAULT_PAGE=g.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:g.ALBUM,albums:g.ALBUMS,photos:g.PHOTOS,metadata:g.METADATA,about:g.ABOUT,videos:g.VIDEOS,thing:g.THING};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=P.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),P.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=g.PHOTOS,this.id=i,this.title=e,P.showAlbumUrl(i)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r}=t.detail;this.page=g.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,P.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=P.router(this.page);P.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <photo-album-page .stats=${D} .albums="${O}" class="${e}"></photo-album-page>
      `;if(this.page===g.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===g.PHOTOS)return l`<photos-page class="${e}" .images=${R}></photos-page>`;if(this.page===g.ALBUM){this.id||console.error("no album id provided");let i=O.albums().find(r=>r.id===this.id);return i||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${R}
        .videos=${k}
        .triples=${ut(x._data)}
        title=${i.album_name}
        id=${this.id}
        minDate=${i.min_date}
        maxDate=${i.max_date}
        imageCount=${i.photos_count}
        description=${i.description}
        countries=${i.flags}
        class="${e}"></album-page>
      `}if(this.page===g.METADATA){let i=R.images().find(c=>c.id===this.id),r=N.exif().find(c=>c.id===this.id),n=x._data.filter(c=>c[0]===this.id),o={};for(let[c,a,h]of n)o[a]?typeof o[a]=="string"&&(o[a]=[o[a],h]):o[a]=h;return i||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${ut(x._data)}
        .image=${i}
        .semantic=${x._data} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===g.VIDEOS)return l`
      <videos-page .videos=${k} class="${e}"></videos-page>
      `;if(this.page===g.THING)return console.log(ut(x._data)),l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${R}
        .albums=${O}
        .triples=${ut(x._data)}
        class="${e}"></thing-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,i=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),i.push("dark-mode")):e.classList=[],l`
    <body>
      <div class="${i.join(" ")}"
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
    `}};customElements.define("photo-app",_e);export{Ds as DEFAULT_DEPENDENCIES,Bs as PAGE_DEPENDECIES,_e as PhotoApp};
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
