var mt=globalThis,Jt=mt.ShadowRoot&&(mt.ShadyCSS===void 0||mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,He=Symbol(),_e=new WeakMap,Zt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==He)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Jt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=_e.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_e.set(e,t))}return t}toString(){return this.cssText}},is=i=>new Zt(typeof i=="string"?i:i+"",void 0,He);var rs=(i,t)=>{if(Jt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=mt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},ve=Jt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return is(e)})(i):i,{is:ns,defineProperty:os,getOwnPropertyDescriptor:as,getOwnPropertyNames:ls,getOwnPropertySymbols:cs,getPrototypeOf:hs}=Object,xt=globalThis,xe=xt.trustedTypes,ds=xe?xe.emptyScript:"",ps=xt.reactiveElementPolyfillSupport,nt=(i,t)=>i,qt={toAttribute(i,t){switch(t){case Boolean:i=i?ds:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},je=(i,t)=>!ns(i,t),Ee={attribute:!0,type:String,converter:qt,reflect:!1,hasChanged:je};Symbol.metadata??=Symbol("metadata"),xt.litPropertyMetadata??=new WeakMap;var Y=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Ee){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&os(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=as(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let l=r?.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ee}static o(){if(this.hasOwnProperty(nt("elementProperties")))return;let t=hs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(nt("properties"))){let e=this.properties,s=[...ls(e),...cs(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(ve(r))}else t!==void 0&&e.push(ve(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rs(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:qt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:qt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??je)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[nt("elementProperties")]=new Map,Y[nt("finalized")]=new Map,ps?.({ReactiveElement:Y}),(xt.reactiveElementVersions??=[]).push("2.0.4");var Xt=globalThis,ft=Xt.trustedTypes,Te=ft?ft.createPolicy("lit-html",{createHTML:i=>i}):void 0,te="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+H,us=`<${ee}>`,Z=document,at=()=>Z.createComment(""),lt=i=>i===null||typeof i!="object"&&typeof i!="function",Ge=Array.isArray,Ye=i=>Ge(i)||typeof i?.[Symbol.iterator]=="function",zt=`[ 	
\f\r]`,rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ue=/-->/g,Ie=/>/g,F=RegExp(`>|${zt}(?:([^\\s"'>=/]+)(${zt}*=${zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Ce=/"/g,Ve=/^(?:script|style|textarea|title)$/i,ze=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),c=ze(1),ms=ze(2),S=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Le=new WeakMap,W=Z.createTreeWalker(Z,129);function Fe(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(t):t}var We=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=rt;for(let l=0;l<e;l++){let a=i[l],d,u,p=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===rt?u[1]==="!--"?o=Ue:u[1]!==void 0?o=Ie:u[2]!==void 0?(Ve.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=F):u[3]!==void 0&&(o=F):o===F?u[0]===">"?(o=r??rt,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?F:u[3]==='"'?Ce:Me):o===Ce||o===Me?o=F:o===Ue||o===Ie?o=rt:(o=F,r=void 0);let $=o===F&&i[l+1].startsWith("/>")?" ":"";n+=o===rt?a+us:p>=0?(s.push(d),a.slice(0,p)+te+a.slice(p)+H+$):a+H+(p===-2?l:$)}return[Fe(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},ct=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[d,u]=We(t,e);if(this.el=i.createElement(d,s),W.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=W.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(te)){let f=u[o++],$=r.getAttribute(p).split(H),w=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:w[2],strings:$,ctor:w[1]==="."?$t:w[1]==="?"?yt:w[1]==="@"?bt:Q}),r.removeAttribute(p)}else p.startsWith(H)&&(a.push({type:6,index:n}),r.removeAttribute(p));if(Ve.test(r.tagName)){let p=r.textContent.split(H),f=p.length-1;if(f>0){r.textContent=ft?ft.emptyScript:"";for(let $=0;$<f;$++)r.append(p[$],at()),W.nextNode(),a.push({type:2,index:++n});r.append(p[f],at())}}}else if(r.nodeType===8)if(r.data===ee)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(H,p+1))!==-1;)a.push({type:7,index:n}),p+=H.length-1}n++}}static createElement(t,e){let s=Z.createElement("template");return s.innerHTML=t,s}};function q(i,t,e=i,s){if(t===S)return t;let r=s!==void 0?e.U?.[s]:e.N,n=lt(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=q(i,r._$AS(i,t.values),r,s)),t}var gt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??Z).importNode(e,!0);W.currentNode=r;let n=W.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Et(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new At(n,this,t)),this._$AV.push(d),a=s[++l]}o!==a?.index&&(n=W.nextNode(),o++)}return W.currentNode=Z,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Et=class Ze{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),lt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==S&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Ye(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==A&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.j(Z.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ct.createElement(Fe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new gt(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Le.get(t.strings);return e===void 0&&Le.set(t.strings,e=new ct(t)),e}D(t){Ge(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Ze(this.H(at()),this.H(at()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=q(this,t,e,0),o=!lt(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let l=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=q(this,l[s+a],e,a),d===S&&(d=this._$AH[a]),o||=!lt(d)||d!==this._$AH[a],d===A?t=A:t!==A&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.B(t)}B(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$t=class extends Q{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===A?void 0:t}},yt=class extends Q{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}},bt=class extends Q{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??A)===S)return;let s=this._$AH,r=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==A&&(s===A||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},At=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}},fs={W:te,q:H,J:ee,Z:1,F:We,G:gt,K:Ye,X:q,Y:Et,tt:Q,st:yt,it:bt,et:$t,ot:At},gs=Xt.litHtmlPolyfillSupport;gs?.(ct,Et),(Xt.litHtmlVersions??=[]).push("3.1.3");var qe=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new Et(t.insertBefore(at(),n),n,void 0,e??{})}return r._$AI(i),r};var z=class extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=qe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return S}};z._$litElement$=!0,z.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:z});var $s=globalThis.litElementPolyfillSupport;$s?.({LitElement:z});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ys}=fs,bs=i=>i===null||typeof i!="object"&&typeof i!="function";var Re=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,As=i=>i?._$litType$?.h!=null;var Qe=i=>i.strings===void 0,Oe=()=>document.createComment(""),V=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Oe(),r),o=s.insertBefore(Oe(),r);e=new ys(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,l=o!==i;if(l){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||l){let a=e._$AA;for(;a!==n;){let d=a.nextSibling;s.insertBefore(a,r),a=d}}}return e},G=(i,t,e=i)=>(i._$AI(t,e),i),ws={},ht=(i,t=ws)=>i._$AH=t,Qt=i=>i._$AH,Ft=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Ke=i=>{i._$AR()};var E=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var ot=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),ot(s,t);return!0},wt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Je=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),vs(t)}};function Ss(i){this._$AN!==void 0?(wt(this),this._$AM=i,Je(this)):this._$AM=i}function _s(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)ot(s[n],!1),wt(s[n]);else s!=null&&(ot(s,!1),wt(s));else ot(this,i)}var vs=i=>{i.type==2&&(i._$AP??=_s,i._$AQ??=Ss)},dt=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Je(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(ot(this,t),wt(this))}setValue(t){if(Qe(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var St=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},_t=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var vt=class extends dt{constructor(){super(...arguments),this.dt=new St(this),this.ft=new _t}render(t,e){return S}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return S;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(l,a)=>{for await(let d of l)if(await a(d)===!1)return})(e,async l=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;s!==void 0&&(l=s(l,r)),a.commitValue(l,r),r++}return!0}),S}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ps=E(vt),Tt=E(class extends vt{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Ke(this.ht);let e=V(this.ht);G(e,i)}}),Pe=i=>As(i)?i._$litType$.h:i.strings,ks=E(class extends L{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=Re(this.bt)?Pe(this.bt):null,s=Re(t)?Pe(t):null;if(e!==null&&(s===null||e!==s)){let r=Qt(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=qe(A,o),n.setConnected(!1),this.yt.set(e,n)}ht(n,[r]),V(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Qt(r).pop();Ke(i),V(i,void 0,n),ht(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Ns=E(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return S}}),xs={},Ds=E(class extends L{constructor(){super(...arguments),this._t=xs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return S}else if(this._t===t)return S;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Bs=E(class extends L{constructor(){super(...arguments),this.key=A}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(ht(i),this.key=t),e}}),Hs=E(class extends L{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qe(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===S||t===A)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return S;if(i.type===4){if(!!t===e.hasAttribute(s))return S;if(i.type===1&&e.getAttribute(s)===t+"")return S}}return ht(i),t}});var Wt=new WeakMap,js=E(class extends dt{render(i){return A}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),A}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Wt.get(t);e===void 0&&(e=new WeakMap,Wt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Wt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),ke=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Gs=E(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let l of i)r[o]=s?s(l,o):o,n[o]=e(l,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Qt(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let l=this.Ct??=[],a=[],d,u,p=0,f=r.length-1,$=0,w=n.length-1;for(;p<=f&&$<=w;)if(r[p]===null)p++;else if(r[f]===null)f--;else if(l[p]===o[$])a[$]=G(r[p],n[$]),p++,$++;else if(l[f]===o[w])a[w]=G(r[f],n[w]),f--,w--;else if(l[p]===o[w])a[w]=G(r[p],n[w]),V(i,a[w+1],r[p]),p++,w--;else if(l[f]===o[$])a[$]=G(r[f],n[$]),V(i,r[p],r[f]),f--,$++;else if(d===void 0&&(d=ke(o,$,w),u=ke(l,p,f)),d.has(l[p]))if(d.has(l[f])){let x=u.get(o[$]),B=x!==void 0?r[x]:null;if(B===null){let ut=V(i,r[p]);G(ut,n[$]),a[$]=ut}else a[$]=G(B,n[$]),V(i,r[p],B),r[x]=null;$++}else Ft(r[f]),f--;else Ft(r[p]),p++;for(;$<=w;){let x=V(i,a[w+1]);G(x,n[$]),a[$++]=x}for(;p<=f;){let x=r[p++];x!==null&&Ft(x)}return this.Ct=o,ht(i,a),S}}),Xe="important",Es=" !"+Xe,Ys=E(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(Es);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?Xe:""):e[s]=r}}return S}}),Vs=E(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?S:(this.At=i,document.importNode(i.content,!0))}}),X=class extends L{constructor(t){if(super(t),this.bt=A,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this.kt=void 0,this.bt=t;if(t===S)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};X.directiveName="unsafeHTML",X.resultType=1;var Ut=E(X);var pt=class extends X{};pt.directiveName="unsafeSVG",pt.resultType=2;var zs=E(pt),Ne=i=>!bs(i)&&typeof i.then=="function",De=1073741823;var Kt=class extends dt{constructor(){super(...arguments),this.Mt=De,this.Ut=[],this.dt=new St(this),this.ft=new _t}render(...t){return t.find(e=>!Ne(e))??S}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let l=0;l<e.length&&!(l>this.Mt);l++){let a=e[l];if(!Ne(a))return this.Mt=l,a;l<r&&a===s[l]||(this.Mt=De,r=0,Promise.resolve(a).then(async d=>{for(;o.get();)await o.get();let u=n.deref();if(u!==void 0){let p=u.Ut.indexOf(a);p>-1&&p<u.Mt&&(u.Mt=p,u.setValue(d))}}))}return S}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Fs=E(Kt);var Ts=Symbol.for(""),Us=i=>{if(i?.r===Ts)return i?._$litStatic$};var Be=new Map,ts=i=>(t,...e)=>{let s=e.length,r,n,o=[],l=[],a,d=0,u=!1;for(;d<s;){for(a=t[d];d<s&&(n=e[d],(r=Us(n))!==void 0);)a+=r+t[++d],u=!0;d!==s&&l.push(n),o.push(a),d++}if(d===s&&o.push(t[s]),u){let p=o.join("$$lit$$");(t=Be.get(p))===void 0&&(o.raw=o,Be.set(p,t=o)),e=l}return i(t,...e)},Ws=ts(c),Zs=ts(ms);var m=class extends z{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var It=Symbol("the albums manifest"),Mt=Symbol("the images manifest"),li=Symbol("the site manifest"),Ct=Symbol("the videos manifest"),Lt=Symbol("the exif data"),Rt=Symbol("the semantic data"),ci=Symbol("the album stats"),Ot=Symbol("the triples data");var es="photos",h=class{static EAGER="eager";static LAZY="lazy"},g=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},b=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},_=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia"},tt=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var K=window.envConfig,Pt=class{_data;constructor(t=`/manifest/images.${K.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Mt]&&(this._data=window[Mt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[Mt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},kt=class{_data;constructor(t=`/manifest/videos.${K.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Ct]&&(this._data=window[Ct]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[Ct]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Nt=class{_data;constructor(t=`/manifest/albums.${K.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[It]&&(this._data=window[It]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[It]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Dt=class{_data;constructor(t=`/manifest/exif.${K.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Lt]&&(this._data=window[Lt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Lt]=e,this._data=e}exif(){return this._data}};var Bt=class{_data;constructor(t=`/manifest/semantic.${K.publication_id}.json`){this.url=t}async init(){if(window[Rt]&&(this._data=window[Rt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Rt]=t,this._data=t}semantic(){return this._data}},Ht=class{_data;constructor(t=`/manifest/stats.${K.publication_id}.json`){this.url=t}async init(){let t=document.getElementById("stats-data");this._data=JSON.parse(t.textContent),this._data||console.error("stats symbol not injected")}stats(){return this._data}},jt=class{_data;constructor(t=`/manifest/triples.${K.publication_id}.json`){this.url=t}async init(){if(window[Ot]&&(this._data=window[Ot]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Ot]=t,this._data=t}};var k=class i{static ROUTES={[g.PHOTOS]:this.showPhotosUrl,[g.ALBUMS]:this.showAlbumsUrl,[g.ALBUM]:this.showAlbumUrl,[g.METADATA]:this.showMetadataUrl,[g.ABOUT]:this.showAboutUrl,[g.VIDEOS]:this.showVideosUrl,[g.THING]:this.showThingUrl};static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===g.ALBUM||t===g.PHOTO||t===g.METADATA||t===g.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var se=class extends m{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),c`
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
    `}};customElements.define("photo-sidebar",se);var ie=class extends m{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=es;return c`
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
    `}};customElements.define("photo-header",ie);var Gt=new Map,T=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Gt.has(t))return Gt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Gt.set(t,s.toDataURL("image/png")),Gt.get(t)}};var re=class extends m{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return c`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:T.encodeBitmapDataURL(this.mosaicColours)},e=document.createElement("div");e.innerHTML=this.summary??"";let s=e.textContent??e.innerText??"";return c`
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
          alt=${s}
          title=${s}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};customElements.define("app-photo",re);var ne=class extends m{render(){return c`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",ne);var v=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var oe=class extends m{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];yield c`
          <app-photo
            id=${r.id}
            loading="${T.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return c`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${Tt(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",oe);var ae=class extends m{static get properties(){return{albums:{type:Array},stats:{type:Array}}}render(){return c`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",ae);var et=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},l=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),d=r.toLocaleDateString("en-IE",{day:"numeric"}),u=n.toLocaleDateString("en-IE",{day:"numeric"}),p=r.toLocaleDateString("en-IE",{month:"short"}),f=n.toLocaleDateString("en-IE",{month:"short"}),$=r.getFullYear(),w=n.getFullYear(),x=p===f,B=$===w;return l===a?`${l} ${$}`:x&&B?`${d} - ${u} ${f} ${$}`:`${l} ${$} - ${a} ${w}`}else{let o={year:"numeric",month:"short",day:"numeric"},l=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return l===a?l:`${l} \u2014 ${a}`}}};var st=class i{static TABLE={England:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",France:"\u{1F1EB}\u{1F1F7}",Germany:"\u{1F1E9}\u{1F1EA}",Ireland:"\u{1F1EE}\u{1F1EA}",Italy:"\u{1F1EE}\u{1F1F9}",Lanzarote:"\u{1F1EA}\u{1F1F8}",Mallorca:"\u{1F1EA}\u{1F1F8}","Northern Ireland":"\u{1F1EC}\u{1F1E7}",Norway:"\u{1F1F3}\u{1F1F4}",Scotland:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",Slovenia:"\u{1F1F8}\u{1F1EE}",Spain:"\u{1F1EA}\u{1F1F8}",Sweden:"\u{1F1F8}\u{1F1EA}",Switzerland:"\u{1F1E8}\u{1F1ED}",Tenerife:"\u{1F1EA}\u{1F1F8}","The Netherlands":"\u{1F1F3}\u{1F1F1}","United States of America":"\u{1F1FA}\u{1F1F8}",Wales:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"};static flag(t){return i.TABLE[t]?i.TABLE[t]:"\u{1F3F3}\uFE0F"}static flags(t){return t.map(e=>i.flag(e)).join(" ")}};var le=class extends m{static get properties(){return{title:{type:String},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return et.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){performance.mark(`start-album-render-${this.url}`);let t=T.encodeBitmapDataURL(this.mosaicColours),e=st.flags(this?.countries.split(","));return c`
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
    `}};customElements.define("photo-album",le);var ce=class extends m{static get properties(){return{albums:{type:Object},stats:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){for(let s=0;s<t.length;s++){let r=t[s],n=T.loadingMode(s);yield c`
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
          `}}return c`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <section class="album-container">
      ${Tt(e())}
    </section>
    `}};customElements.define("photo-album-page",ce);var he=class extends m{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return c`
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
    `}};customElements.define("app-video",he);var de=class extends m{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",de);var it=class i{static findSourceRelation(t,e,s){if(!Array.isArray(e))throw new TypeError("Triples must be an array");let r=e.find(n=>y.sameURN(n[0],s)&&j.hasRelation(n,t));return r?j.getTarget(r):null}static findSubject(t,e){return i.findSourceRelation(_.SUBJECT,t,e)}static findLocation(t,e){return i.findSourceRelation(_.LOCATION,t,e)}static findRating(t,e){return i.findSourceRelation(_.RATING,t,e)}static findName(t,e){return i.findSourceRelation(_.NAME,t,e)}static findBirdwatchUrl(t,e){return i.findSourceRelation(_.BIRDWATCH_URL,t,e)}static findWikipedia(t,e){return i.findSourceRelation(_.WIKIPEDIA,t,e)}static findLongitude(t,e){return i.findSourceRelation(_.LONGITUDE,t,e)}static findLatitude(t,e){return i.findSourceRelation(_.LATITUDE,t,e)}},j=class{static isUrnSource(t){return y.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return y.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}static filterRelation(t,e){return t.filter(s=>s[1]===e)}static filterSourceId(t,e){if(!y.isUrn(e))throw new Error(`Invalid URN: ${e}`);let s=y.parseUrn(e);return t.filter(r=>y.sameURN(r[0],e)||y.hasId(r[0],s.id))}},y=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},J=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){let r=j.filterRelation(t,_.NAME).find(n=>y.hasId(n[0],e));return r?j.getTarget(r):e}static birdwatchUrl(t,e){let s=j.filterSourceId(j.filterRelation(t,_.BIRDWATCH_URL),e);if(s.length===0)return;let[r]=s;return j.getTarget(r)}};var pe=class extends m{static properties={urn:{type:String}};id(){return y.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?c`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:c`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",pe);var ue=class extends m{static properties={urn:{type:String},triples:{type:Array}};name(){let{type:t,id:e}=y.parseUrn(this.urn);if(tt.has(t))return c`<span>${J.toCommonName(this.triples,e)}</span>`;let s=it.findName(this.triples,this.urn);return s?c`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=y.parseUrn(this.urn);return{[b.BIRD]:"bird-link",[b.MAMMAL]:"mammal-link",[b.REPTILE]:"reptile-link",[b.AMPHIBIAN]:"amphibian-link",[b.FISH]:"fish-link",[b.INSECT]:"insect-link"}[t]??""}render(){return y.isUrn(this.urn)?c`
      <a class="thing-link ${this.linkClass()}" href="${y.toURL(this.urn)}">${this.name()}</a>
    `:c`<span>Invalid URN</span>`}};customElements.define("thing-link",ue);var me=class extends m{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),this.albumPhotos()[0]||console.error(`empty album! ${this.id}`),v.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s={},r=t.filter(n=>n[0]===e.id);for(let[n,o,l]of r)s[o]||(s[o]=[]),s[o].push(l);return{...e,relations:s}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(){let t={},e=this.albumPhotos();for(let r of[b.UNESCO])t[r]=Array.from(new Set(e.flatMap(n=>n.relations.location?.filter(o=>y.is(o,r))).filter(n=>n)));for(let r of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])t[r]=Array.from(new Set(e.flatMap(n=>n.relations.subject?.filter(o=>y.is(o,r))).filter(n=>n)));let s=[];s=s.concat(t[b.UNESCO].map(r=>c`<unesco-link urn="${r}"></unesco-link>`));for(let r of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])s=s.concat(t[r].map(n=>c`<thing-link .urn="${n}" .triples="${this.triples}"></thing-link>`));return s}render(){let t=window.matchMedia("(max-width: 500px)"),e=et.dateRange(this.minDate,this.maxDate,t.matches),r=this.albumPhotos().map((l,a)=>c`
      <app-photo
        id=${l.id}
        summary=${l.relations.summary}
        loading="${T.loadingMode(a)}"
        thumbnailUrl="${l.thumbnail_url}"
        mosaicColours="${l.mosaic_colours}"
        imageUrl="${l.full_image}"></app-photo>`),n=this.albumVideos().map((l,a)=>c`<app-video
        id=${l.id}
        url_poster=${l.poster_url}
        url_unscaled=${l.video_url_unscaled}
        url_1080p=${l.video_url_1080p}
        url_720p=${l.video_url_720p}
        url_480p=${l.video_url_480p}
        ></app-video>`),o=st.flags(this?.countries.split(","));return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${o}</p>
        <p class="photo-album-description">${Ut(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks().map(l=>c`<li>${l}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${r}
      </section>

      <section class="video-container">
        ${n}
      </section>
    </div>
    `}};customElements.define("album-page",me);var fe=class extends m{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",fe);var ge=class extends m{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?c`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:c`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",ge);var $e=class extends m{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),v.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?c`<td>Unknown aperture</td>`:t.f_stop==="0.0"?c`<td>Manual aperture control</td>`:c`<td>ƒ/${t.f_stop}</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?c`${t.focal_length}`:t.focal_length==="0"?c`<td>Manual lens</td>`:c`<td>${t.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return c`<ul class="thing-list">
        ${e.map(s=>c`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return c`<em>${e}</em>`;if(t.toLowerCase()==="summary")return c`${Ut(e??"")}`;if(y.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return c`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(y.isUrn(e)&&y.is(e,b.UNESCO))return c`<unesco-link .urn="${e}"></unesco-link>`;if(y.isUrn(e))return c`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return c`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().filter(e=>!this.isIgnoredKey(e)).map(e=>c`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}renderExif(t){return c`
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
    `}render(){let t=this.image,e=this.semantic,s=t.album_id;return c`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${s}">[album]</a>
      </p>

      ${this.renderSemanticData(e)}

    ${this.exif?this.renderExif(this.exif):c``}

    </section>
    `}};customElements.define("metadata-page",$e);var ye=class extends m{static get properties(){return{}}connectedCallback(){super.connectedCallback(),v.setIndex()}render(){return c`
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
    `}};customElements.define("about-page",ye);var Yt=class{static loadingMode(t){return t===0?"auto":"none"}};var be=class extends m{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),v.setIndex()}videos(){return this.videos.videos()}render(){let t=this.videos().map((e,s)=>c`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Yt.loadingMode(s)}"
      ></app-video>`);return c`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("videos-page",be);function Is(i,t="r\xF3"){if(!i.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${i}`);let e=i.split(":")[2],[s,r]=i.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function Vt(i,t="r\xF3"){try{return Is(i,t)}catch{return{type:"unknown",id:i,qs:{}}}}var Ms=class{#e;#t;#s;constructor(){this.#e=0,this.#t=new Map,this.#s=new Map}map(){return this.#t}reverseMap(){return this.#s}add(i){return this.#t.has(i)?this.#t.get(i):(this.#t.set(i,this.#e),this.#s.set(this.#e,i),this.#e++,this.#e-1)}getIndex(i){return this.#t.get(i)}getValue(i){return this.#s.get(i)}has(i){return this.#t.has(i)}},Cs=class{static intersection(i){if(i.length===0)return new Set;i.sort((e,s)=>e.size-s.size);let t=new Set(i[0]);for(let e=1;e<i.length;e++){let s=i[e];for(let r of t)s.has(r)||t.delete(r);if(t.size===0)break}return t}},Ls=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;constructor(i){this.indexedTriples=[],this.stringIndex=new Ms,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.indexTriples(i)}indexTriples(i){for(let t=0;t<i.length;t++)this.indexTriple(i[t],t)}indexTriple(i,t){let e=Vt(I.source(i)),s=I.relation(i),r=Vt(I.target(i)),n=this.stringIndex.add(e.type),o=this.stringIndex.add(e.id),l=this.stringIndex.add(s),a=this.stringIndex.add(r.type),d=this.stringIndex.add(r.id);this.indexedTriples.push([this.stringIndex.add(I.source(i)),l,this.stringIndex.add(I.target(i))]),this.sourceType.has(n)||this.sourceType.set(n,new Set),this.sourceType.get(n).add(t),this.sourceId.has(o)||this.sourceId.set(o,new Set),this.sourceId.get(o).add(t);for(let[u,p]of Object.entries(e.qs)){let f=this.stringIndex.add(`${u}=${p}`);this.sourceQs.has(f)||this.sourceQs.set(f,new Set),this.sourceQs.get(f).add(t)}this.relations.has(l)||this.relations.set(l,new Set),this.relations.get(l).add(t),this.targetType.has(a)||this.targetType.set(a,new Set),this.targetType.get(a).add(t),this.targetId.has(d)||this.targetId.set(d,new Set),this.targetId.get(d).add(t);for(let[u,p]of Object.entries(r.qs)){let f=this.stringIndex.add(`${u}=${p}`);this.targetQs.has(f)||this.targetQs.set(f,new Set),this.targetQs.get(f).add(t)}}add(i){let t=this.indexedTriples.length;for(let e=0;e<i.length;e++)this.indexTriple(i[e],t+e)}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([i,t,e])=>[this.stringIndex.getValue(i),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(i){if(i<0||i>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[i];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getSourceTypeSet(i){let t=this.stringIndex.getIndex(i);return t!==void 0?this.sourceType.get(t):void 0}getSourceIdSet(i){let t=this.stringIndex.getIndex(i);return t!==void 0?this.sourceId.get(t):void 0}getSourceQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);return e!==void 0?this.sourceQs.get(e):void 0}getRelationSet(i){let t=this.stringIndex.getIndex(i);return t!==void 0?this.relations.get(t):void 0}getTargetTypeSet(i){let t=this.stringIndex.getIndex(i);return t!==void 0?this.targetType.get(t):void 0}getTargetIdSet(i){let t=this.stringIndex.getIndex(i);return t!==void 0?this.targetId.get(t):void 0}getTargetQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);return e!==void 0?this.targetQs.get(e):void 0}},I=class{static source(i){return i[0]}static relation(i){return i[1]}static target(i){return i[2]}},ss=class U{index;triplesCount;constructor(t){this.index=new Ls(t),this.triplesCount=this.index.length}static of(t){return new U(t)}static from(t){let e=[];for(let s of t){let{id:r,...n}=s;for(let[o,l]of Object.entries(n))if(Array.isArray(l))for(let a of l)e.push([r,o,a]);else e.push([r,o,l])}return new U(e)}add(t){this.index.add(t),this.triplesCount=this.index.length}map(t){return new U(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new U(e)}first(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.first();return t?I.source(t):void 0}firstRelation(){let t=this.first();return t?I.relation(t):void 0}firstTarget(){let t=this.first();return t?I.target(t):void 0}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(t=>I.source(t)))}relations(){return new Set(this.index.triples().map(t=>I.relation(t)))}targets(){return new Set(this.index.triples().map(t=>I.target(t)))}objects(){let t={};for(let[s,r,n]of this.index.triples())t[s]||(t[s]={}),t[s][r]?Array.isArray(t[s][r])?t[s][r].push(n):t[s][r]=[t[s][r],n]:t[s][r]=n;let e=[];for(let[s,r]of Object.entries(t))r.id=s,e.push(r);return e}search(t){let e=[new Set(Array.from({length:this.triplesCount},(a,d)=>d))],s=t.source,r=t.relation,n=t.target;if(s){if(s.type){let a=this.index.getSourceTypeSet(s.type);if(a)e.push(a);else return new U([])}if(s.id){let a=this.index.getSourceIdSet(s.id);if(a)e.push(a);else return new U([])}if(s.qs)for(let[a,d]of Object.entries(s.qs)){let u=this.index.getSourceQsSet(a,d);if(u)e.push(u);else return new U([])}}if(n){if(n.type){let a=this.index.getTargetTypeSet(n.type);if(a)e.push(a);else return new U([])}if(n.id){let a=this.index.getTargetIdSet(n.id);if(a)e.push(a);else return new U([])}if(n.qs)for(let[a,d]of Object.entries(n.qs)){let u=this.index.getTargetQsSet(a,d);if(u)e.push(u);else return new U([])}}if(r){let a=this.index.getRelationSet(r);if(a)e.push(a);else return new U([])}let o=Cs.intersection(e),l=[];for(let a of o){let d=this.index.getTriple(a);if(s?.predicate||n?.predicate){let u=s?.predicate?s.predicate(I.source(d)):!0,p=n?.predicate?n.predicate(I.target(d)):!0;u&&p&&l.push(d)}else l.push(d)}return new U(l)}searchArray(t){return this.search(t).triples()}};var Ae=class extends m{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},semantic:{type:Object},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),v.setIndex()}isSemanticRelation(t){return t===_.SUBJECT||t===_.LOCATION||t===_.RATING}filterPhotos(t,e){return e.filter(s=>{let[r,n,o]=s,l=y.isRating(o)?`urn:r\xF3:rating:${encodeURIComponent(o)}`:o;if(!this.isSemanticRelation(n)&&!y.isUrn(l))return!1;try{let a=y.parseUrn(l),d=y.parseUrn(this.urn);return d.id==="*"?d.type===a.type:y.sameURN(l,this.urn)}catch{return!1}}).map(s=>t.find(r=>r.id===s[0])).filter(s=>s!==void 0)}subjectPhotos(t,e){return this.filterPhotos(t,e).sort((s,r)=>r.created_at-s.created_at).map((s,r)=>c`
      <app-photo
        id=${s.id}
        loading="${T.loadingMode(r)}"
        thumbnailUrl="${s.thumbnail_url}"
        mosaicColours="${s.mosaic_colours}"
        imageUrl="${s.full_image}"></app-photo>`)}subjectAlbums(t,e){let s=this.filterPhotos(t,e),r=new Set(s.map(n=>n.album_id));return Array.from(r).flatMap(n=>this.albums.albums().filter(o=>o.id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>c`
          <photo-album
            title="${n.album_name}"
            url="${n.thumbnail_url}"
            mosaicColours="${n.mosaic}"
            id="${n.id}"
            count="${n.photos_count}"
            minDate="${n.min_date}"
            maxDate="${n.max_date}"
            countries="${n.flags}"
            loading="eager">
            </photo-album>
      `)}getFacts(){let t=this.triples.filter(s=>s[0]===this.urn),e={};for(let s of t){let[r,n,o]=s;e.hasOwnProperty(n)||(e[n]=[]),e[n].push(o)}return e}binomialToCommonName(t){let e=this.triples.find(s=>{let[r,n,o]=s;if(!y.isUrn(r))return!1;let l=y.parseUrn(r),a=t.replace(" ","-").toLowerCase();return l.id===a&&n===_.NAME});return e?e[2]:t}firstPhotographed(t,e){let r=this.filterPhotos(t,e).sort((n,o)=>n.created_at-o.created_at)[0];return r?new Date(r.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}getTitle(){let t=it.findName(this.triples,this.urn);if(t)return t;try{let e=y.parseUrn(this.urn),s=decodeURIComponent(e.id);return e.id==="*"?`${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`:tt.has(e.type)?J.toCommonName(this.triples,s):s}catch{return this.urn}}renderFacts(t,e){let s={};return e.country&&(s.Country=c`${e.country}`),s}render(){let t=this.images.images(),e=this.semantic.semantic(),s=this.subjectPhotos(t,e),r=this.subjectAlbums(t,e),n=this.getFacts(),o=y.parseUrn(this.urn),l=o.type,a=Object.assign({Classification:c`<a href="#/thing/${l}:*">${l.charAt(0).toUpperCase()}${l.slice(1)}</a>`},this.renderFacts(o,n));tt.has(l)&&(a["First Photographed"]=c`<span>${this.firstPhotographed(t,e)}</span>`);let u=new ss(this.triples).search({source:Vt(this.urn)}),p=u.search({relation:_.WIKIPEDIA}).firstTarget(),f=u.search({relation:_.BIRDWATCH_URL}).firstTarget(),$=u.search({relation:_.LONGITUDE}).firstTarget(),w=u.search({relation:_.LATITUDE}).firstTarget(),x;if($&&w){let B=`https://www.google.com/maps?q=${n.latitude},${n.longitude}`;x=c`
      <a href="${B}" target="_blank" rel="noopener">[maps]</a>
      `}return c`
      <div>
      <section class="thing-page">
        <h1>${this.getTitle()}</h1>

        <p>
          ${tt.has(l)?c`<span class="thing-binomial">(${J.pretty(o.id)})</span>`:c``}
        </p>
        <br>

        ${p?c`<a href="${p}" target="_blank" rel="noopener">[wikipedia]</a>`:c``}
        ${f?c`<a href="${f}" target="_blank" rel="noopener">[birdwatch]</a>`:c``}
        ${x?c`<span class="location">${x}</span>`:c``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(a).map(([B,ut])=>c`
          <tr>
            <th class="exif-heading">${B}</th>
            <td>${ut}</td>
          </tr>
          `)}
        </table>

        <br>
        ${s}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${r}
        </section>

      </div>
    `}};customElements.define("thing-page",Ae);var R=new Nt,C=new Pt,P=new kt,N=new Dt,M=new Bt,D=new Ht,O=new jt,Rs=[[R,h.EAGER],[C,h.EAGER],[P,h.EAGER],[N,h.EAGER],[M,h.EAGER],[D,h.EAGER],[O,h.LAZY]],Os={[g.ABOUT]:[[R,h.LAZY],[C,h.LAZY],[P,h.LAZY],[N,h.LAZY],[D,h.LAZY],[M,h.EAGER],[O,h.LAZY]],[g.ALBUMS]:[[R,h.EAGER],[C,h.LAZY],[P,h.LAZY],[N,h.LAZY],[D,h.EAGER],[M,h.EAGER],[O,h.LAZY]],[g.PHOTOS]:[[R,h.EAGER],[C,h.EAGER],[P,h.EAGER],[N,h.LAZY],[D,h.LAZY],[M,h.EAGER],[O,h.LAZY]],[g.VIDEOS]:[[R,h.LAZY],[C,h.LAZY],[P,h.EAGER],[N,h.LAZY],[D,h.LAZY],[M,h.EAGER],[O,h.LAZY]],[g.ALBUM]:[[R,h.EAGER],[C,h.EAGER],[P,h.EAGER],[D,h.LAZY],[N,h.LAZY],[M,h.EAGER],[O,h.EAGER]],[g.PHOTO]:[[R,h.EAGER],[C,h.EAGER],[P,h.EAGER],[N,h.EAGER],[M,h.EAGER],[D,h.LAZY],[O,h.LAZY]],[g.METADATA]:[[R,h.LAZY],[C,h.EAGER],[P,h.EAGER],[N,h.EAGER],[M,h.EAGER],[D,h.LAZY],[M,h.EAGER],[O,h.EAGER]],[g.THING]:[[R,h.EAGER],[C,h.EAGER],[P,h.LAZY],[N,h.LAZY],[M,h.EAGER],[D,h.LAZY],[O,h.EAGER]]},we=class{static async init(){let t=k.getUrl();console.log(`loading ${t?.type}`);let e=Os[t?.type]??Rs,s=[];for(let[r,n]of e)n===h.EAGER?s.push(r.init()):n===h.LAZY&&r.init();await Promise.all(s)}};await we.init();var Se=class i extends m{static DEFAULT_PAGE=g.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:g.ALBUM,albums:g.ALBUMS,photos:g.PHOTOS,metadata:g.METADATA,about:g.ABOUT,videos:g.VIDEOS,thing:g.THING};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=k.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),k.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=g.PHOTOS,this.id=s,this.title=e,k.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=g.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,k.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=k.router(this.page);k.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return c`
      <photo-album-page .stats=${D} .albums="${R}" class="${e}"></photo-album-page>
      `;if(this.page===g.ABOUT)return c`<about-page class="${e}"></about-page>`;if(this.page===g.PHOTOS)return c`<photos-page class="${e}" .images=${C}></photos-page>`;if(this.page===g.ALBUM){this.id||console.error("no album id provided");let s=R.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),c`
      <album-page
        .images=${C}
        .videos=${P}
        .semantic=${M}
        .triples=${O._data}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page===g.METADATA){let s=C.images().find(l=>l.id===this.id),r=N.exif().find(l=>l.id===this.id),n=M.semantic().filter(l=>l[0]===this.id),o={};for(let[l,a,d]of n)o[a]?typeof o[a]=="string"&&(o[a]=[o[a],d]):o[a]=d;return s||console.error(`failed to find photo with id ${this.id}`),c`
      <metadata-page
        .triples=${O._data}
        .image=${s}
        .semantic=${o} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===g.VIDEOS)return c`
      <videos-page .videos=${P} class="${e}"></videos-page>
      `;if(this.page===g.THING)return c`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${C}
        .albums=${R}
        .semantic=${M}
        .triples=${O._data}
        class="${e}"></thing-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],c`
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
    `}};customElements.define("photo-app",Se);export{Rs as DEFAULT_DEPENDENCIES,Os as PAGE_DEPENDECIES,Se as PhotoApp};
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
