var ht=globalThis,Bt=ht.ShadowRoot&&(ht.ShadyCSS===void 0||ht.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),de=new WeakMap,Pt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Bt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=de.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&de.set(e,t))}return t}toString(){return this.cssText}},Ze=s=>new Pt(typeof s=="string"?s:s+"",void 0,Ee);var Xe=(s,t)=>{if(Bt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=ht.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},pe=Bt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ze(e)})(s):s,{is:ts,defineProperty:es,getOwnPropertyDescriptor:ss,getOwnPropertyNames:is,getOwnPropertySymbols:rs,getPrototypeOf:ns}=Object,At=globalThis,ue=At.trustedTypes,os=ue?ue.emptyScript:"",as=At.reactiveElementPolyfillSupport,et=(s,t)=>s,Lt={toAttribute(s,t){switch(t){case Boolean:s=s?os:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ue=(s,t)=>!ts(s,t),me={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:Ue};Symbol.metadata??=Symbol("metadata"),At.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=me){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&es(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=ss(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);n.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??me}static o(){if(this.hasOwnProperty(et("elementProperties")))return;let t=ns(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(et("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(et("properties"))){let e=this.properties,i=[...is(e),...rs(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(pe(r))}else t!==void 0&&e.push(pe(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Lt).toAttribute(e,i.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Lt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??Ue)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[et("elementProperties")]=new Map,N[et("finalized")]=new Map,as?.({ReactiveElement:N}),(At.reactiveElementVersions??=[]).push("2.0.4");var jt=globalThis,dt=jt.trustedTypes,fe=dt?dt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ht="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Vt="?"+R,ls=`<${Vt}>`,G=document,it=()=>G.createComment(""),rt=s=>s===null||typeof s!="object"&&typeof s!="function",Ce=Array.isArray,Me=s=>Ce(s)||typeof s?.[Symbol.iterator]=="function",Ot=`[ 	
\f\r]`,tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,$e=/>/g,z=RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,Oe=/^(?:script|style|textarea|title)$/i,ke=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),l=ke(1),cs=ke(2),S=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),we=new WeakMap,F=G.createTreeWalker(G,129);function Re(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(t):t}var Pe=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":"",o=tt;for(let h=0;h<e;h++){let a=s[h],c,p,d=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===tt?p[1]==="!--"?o=ge:p[1]!==void 0?o=$e:p[2]!==void 0?(Oe.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=z):p[3]!==void 0&&(o=z):o===z?p[0]===">"?(o=r??tt,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?z:p[3]==='"'?ye:be):o===ye||o===be?o=z:o===ge||o===$e?o=tt:(o=z,r=void 0);let m=o===z&&s[h+1].startsWith("/>")?" ":"";n+=o===tt?a+ls:d>=0?(i.push(c),a.slice(0,d)+Ht+a.slice(d)+R+m):a+R+(d===-2?h:m)}return[Re(s,n+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},nt=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[c,p]=Pe(t,e);if(this.el=s.createElement(c,i),F.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=F.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Ht)){let u=p[o++],m=r.getAttribute(d).split(R),$=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:$[2],strings:m,ctor:$[1]==="."?ut:$[1]==="?"?mt:$[1]==="@"?ft:W}),r.removeAttribute(d)}else d.startsWith(R)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(Oe.test(r.tagName)){let d=r.textContent.split(R),u=d.length-1;if(u>0){r.textContent=dt?dt.emptyScript:"";for(let m=0;m<u;m++)r.append(d[m],it()),F.nextNode(),a.push({type:2,index:++n});r.append(d[u],it())}}}else if(r.nodeType===8)if(r.data===Vt)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(R,d+1))!==-1;)a.push({type:7,index:n}),d+=R.length-1}n++}}static createElement(t,e){let i=G.createElement("template");return i.innerHTML=t,i}};function q(s,t,e=s,i){if(t===S)return t;let r=i!==void 0?e.U?.[i]:e.N,n=rt(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=q(s,r._$AS(s,t.values),r,i)),t}var pt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??G).importNode(e,!0);F.currentNode=r;let n=F.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new St(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new gt(n,this,t)),this._$AV.push(c),a=i[++h]}o!==a?.index&&(n=F.nextNode(),o++)}return F.currentNode=G,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},St=class Le{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),rt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==S&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Me(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==y&&rt(this._$AH)?this._$AA.nextSibling.data=t:this.j(G.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=nt.createElement(Re(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new pt(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=we.get(t.strings);return e===void 0&&we.set(t.strings,e=new nt(t)),e}D(t){Ce(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new Le(this.H(it()),this.H(it()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,e=this,i,r){let n=this.strings,o=!1;if(n===void 0)t=q(this,t,e,0),o=!rt(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let h=t,a,c;for(t=n[0],a=0;a<n.length-1;a++)c=q(this,h[i+a],e,a),c===S&&(c=this._$AH[a]),o||=!rt(c)||c!==this._$AH[a],c===y?t=y:t!==y&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!r&&this.B(t)}B(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ut=class extends W{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===y?void 0:t}},mt=class extends W{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},ft=class extends W{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??y)===S)return;let i=this._$AH,r=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},gt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}},hs={W:Ht,q:R,J:Vt,Z:1,F:Pe,G:pt,K:Me,X:q,Y:St,tt:W,st:mt,it:ft,et:ut,ot:gt},ds=jt.litHtmlPolyfillSupport;ds?.(nt,St),(jt.litHtmlVersions??=[]).push("3.1.3");var De=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new St(t.insertBefore(it(),n),n,void 0,e??{})}return r._$AI(s),r};var j=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return S}};j._$litElement$=!0,j.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:j});var ps=globalThis.litElementPolyfillSupport;ps?.({LitElement:j});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:us}=hs,ms=s=>s===null||typeof s!="object"&&typeof s!="function";var Ae=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,fs=s=>s?._$litType$?.h!=null;var Ne=s=>s.strings===void 0,Se=()=>document.createComment(""),B=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let n=i.insertBefore(Se(),r),o=i.insertBefore(Se(),r);e=new us(n,o,s,s.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==s;if(h){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let c=a.nextSibling;i.insertBefore(a,r),a=c}}}return e},D=(s,t,e=s)=>(s._$AI(t,e),s),gs={},ot=(s,t=gs)=>s._$AH=t,Dt=s=>s._$AH,kt=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},Be=s=>{s._$AR()};var E=s=>(...t)=>({_$litDirective$:s,values:t}),O=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var st=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),st(i,t);return!0},$t=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},je=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),ys(t)}};function $s(s){this._$AN!==void 0?($t(this),this._$AM=s,je(this)):this._$AM=s}function bs(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let n=e;n<i.length;n++)st(i[n],!1),$t(i[n]);else i!=null&&(st(i,!1),$t(i));else st(this,s)}var ys=s=>{s.type==2&&(s._$AP??=bs,s._$AQ??=$s)},at=class extends O{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),je(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(st(this,t),$t(this))}setValue(t){if(Ne(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var bt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},yt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var wt=class extends at{constructor(){super(...arguments),this.dt=new bt(this),this.ft=new yt}render(t,e){return S}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return S;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(h,a)=>{for await(let c of h)if(await a(c)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;i!==void 0&&(h=i(h,r)),a.commitValue(h,r),r++}return!0}),S}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ls=E(wt),vt=E(class extends wt{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&Be(this.ht);let e=B(this.ht);D(e,s)}}),ve=s=>fs(s)?s._$litType$.h:s.strings,Ds=E(class extends O{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=Ae(this.bt)?ve(this.bt):null,i=Ae(t)?ve(t):null;if(e!==null&&(i===null||e!==i)){let r=Dt(s).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=De(y,o),n.setConnected(!1),this.yt.set(e,n)}ot(n,[r]),B(n,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let n=Dt(r).pop();Be(s),B(s,void 0,n),ot(s,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Ns=E(class extends O{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return S}}),ws={},Bs=E(class extends O{constructor(){super(...arguments),this._t=ws}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return S}else if(this._t===t)return S;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var js=E(class extends O{constructor(){super(...arguments),this.key=y}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(ot(s),this.key=t),e}}),Hs=E(class extends O{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ne(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===S||t===y)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return S;if(s.type===4){if(!!t===e.hasAttribute(i))return S;if(s.type===1&&e.getAttribute(i)===t+"")return S}}return ot(s),t}});var Rt=new WeakMap,Vs=E(class extends at{render(s){return y}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),y}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Rt.get(t);e===void 0&&(e=new WeakMap,Rt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?Rt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),xe=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},zs=E(class extends O{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],n=[],o=0;for(let h of s)r[o]=i?i(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Dt(s),{values:n,keys:o}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=o,n;let h=this.Ct??=[],a=[],c,p,d=0,u=r.length-1,m=0,$=n.length-1;for(;d<=u&&m<=$;)if(r[d]===null)d++;else if(r[u]===null)u--;else if(h[d]===o[m])a[m]=D(r[d],n[m]),d++,m++;else if(h[u]===o[$])a[$]=D(r[u],n[$]),u--,$--;else if(h[d]===o[$])a[$]=D(r[d],n[$]),B(s,a[$+1],r[d]),d++,$--;else if(h[u]===o[m])a[m]=D(r[u],n[m]),B(s,r[d],r[u]),u--,m++;else if(c===void 0&&(c=xe(o,m,$),p=xe(h,d,u)),c.has(h[d]))if(c.has(h[u])){let T=p.get(o[m]),V=T!==void 0?r[T]:null;if(V===null){let ct=B(s,r[d]);D(ct,n[m]),a[m]=ct}else a[m]=D(V,n[m]),B(s,r[d],V),r[T]=null;m++}else kt(r[u]),u--;else kt(r[d]),d++;for(;m<=$;){let T=B(s,a[$+1]);D(T,n[m]),a[m++]=T}for(;d<=u;){let T=r[d++];T!==null&&kt(T)}return this.Ct=o,ot(s,a),S}}),He="important",As=" !"+He,Fs=E(class extends O{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let n=typeof r=="string"&&r.endsWith(As);i.includes("-")||n?e.setProperty(i,n?r.slice(0,-11):r,n?He:""):e[i]=r}}return S}}),Gs=E(class extends O{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?S:(this.At=s,document.importNode(s.content,!0))}}),K=class extends O{constructor(t){if(super(t),this.bt=y,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===y||t==null)return this.kt=void 0,this.bt=t;if(t===S)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};K.directiveName="unsafeHTML",K.resultType=1;var xt=E(K);var lt=class extends K{};lt.directiveName="unsafeSVG",lt.resultType=2;var qs=E(lt),_e=s=>!ms(s)&&typeof s.then=="function",Ie=1073741823;var Nt=class extends at{constructor(){super(...arguments),this.Mt=Ie,this.Ut=[],this.dt=new bt(this),this.ft=new yt}render(...t){return t.find(e=>!_e(e))??S}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let a=e[h];if(!_e(a))return this.Mt=h,a;h<r&&a===i[h]||(this.Mt=Ie,r=0,Promise.resolve(a).then(async c=>{for(;o.get();)await o.get();let p=n.deref();if(p!==void 0){let d=p.Ut.indexOf(a);d>-1&&d<p.Mt&&(p.Mt=d,p.setValue(c))}}))}return S}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ws=E(Nt);var Ss=Symbol.for(""),vs=s=>{if(s?.r===Ss)return s?._$litStatic$};var Te=new Map,Ve=s=>(t,...e)=>{let i=e.length,r,n,o=[],h=[],a,c=0,p=!1;for(;c<i;){for(a=t[c];c<i&&(n=e[c],(r=vs(n))!==void 0);)a+=r+t[++c],p=!0;c!==i&&h.push(n),o.push(a),c++}if(c===i&&o.push(t[i]),p){let d=o.join("$$lit$$");(t=Te.get(d))===void 0&&(o.raw=o,Te.set(d,t=o)),e=h}return s(t,...e)},Ys=Ve(l),Qs=Ve(cs);var f=class extends j{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var ci=Symbol("the albums manifest"),xs=Symbol("the images manifest"),hi=Symbol("the site manifest"),di=Symbol("the videos manifest"),pi=Symbol("the semantic data"),ui=Symbol("the album stats"),_t=Symbol("the triples data");var ze="photos",U=class{static EAGER="eager";static LAZY="lazy"},g=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},b=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},w=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia";static CREATED_AT="created_at";static F_STOP="f_stop";static FOCAL_LENGTH="focal_length";static MODEL="model";static EXPOSURE_TIME="exposure_time";static ISO="iso";static WIDTH="width";static HEIGHT="height"},Fe=new Set(["created_at","f_stop","focal_length","model","exposure_time","iso","width","height"]),Y=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var Ge=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(s){return this.#e.has(s)?this.#e.get(s):(this.#e.set(s,this.#t),this.#s.set(this.#t,s),this.#t++,this.#t-1)}setIndex(s,t){this.#e.set(s,t),this.#s.set(t,s)}getIndex(s){return this.#e.get(s)}getValue(s){return this.#s.get(s)}has(s){return this.#e.has(s)}},qe=class{static intersection(s,t){if(t.length===0)return new Set;t.sort((i,r)=>i.size-r.size);let e=new Set(t[0]);for(let i=1;i<t.length;i++){let r=t[i];for(let n of e)s.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},We=class{stringIndex;constructor(){this.stringIndex=new Ge}parseTriple(s){let t=s.match(/^src (\d+) rel (\d+) tgt (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${s}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),i=this.stringIndex.getValue(parseInt(t[2],10)),r=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||i===void 0||r===void 0)throw new SyntaxError(`Invalid triple reference: ${s}`);return[e,i,r]}parseDeclaration(s){console.log(s);let t=s.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${s}`);let e=t[1],i=t[2];this.stringIndex.setIndex(i,parseInt(e,10))}parse(s){if(s.startsWith("src"))return this.parseTriple(s);this.parseDeclaration(s)}};function x(s,t="r\xF3"){if(!s.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${s}`);let e=s.split(":")[2],[i,r]=s.split("?"),n=i.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function P(s,t="r\xF3"){try{return x(s,t)}catch{return{type:"unknown",id:s,qs:{}}}}var C=class{static source(s){return s[0]}static relation(s){return s[1]}static target(s){return s[2]}},_s=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Is=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Ts=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;constructor(s){this.indexedTriples=[],this.stringIndex=new Ge,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.indexTriples(s),this.metrics=new _s}indexTriples(s){for(let t=0;t<s.length;t++)this.indexTriple(s[t],t)}indexTriple(s,t){let e=P(C.source(s)),i=C.relation(s),r=P(C.target(s)),n=this.stringIndex.add(e.type),o=this.stringIndex.add(e.id),h=this.stringIndex.add(i),a=this.stringIndex.add(r.type),c=this.stringIndex.add(r.id);this.indexedTriples.push([this.stringIndex.add(C.source(s)),h,this.stringIndex.add(C.target(s))]),this.sourceType.has(n)||this.sourceType.set(n,new Set),this.sourceType.get(n).add(t),this.sourceId.has(o)||this.sourceId.set(o,new Set),this.sourceId.get(o).add(t);for(let[p,d]of Object.entries(e.qs)){let u=this.stringIndex.add(`${p}=${d}`);this.sourceQs.has(u)||this.sourceQs.set(u,new Set),this.sourceQs.get(u).add(t)}this.relations.has(h)||this.relations.set(h,new Set),this.relations.get(h).add(t),this.targetType.has(a)||this.targetType.set(a,new Set),this.targetType.get(a).add(t),this.targetId.has(c)||this.targetId.set(c,new Set),this.targetId.get(c).add(t);for(let[p,d]of Object.entries(r.qs)){let u=this.stringIndex.add(`${p}=${d}`);this.targetQs.has(u)||this.targetQs.set(u,new Set),this.targetQs.get(u).add(t)}}add(s){let t=this.indexedTriples.length;for(let e=0;e<s.length;e++)this.indexTriple(s[e],t+e)}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([s,t,e])=>[this.stringIndex.getValue(s),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(s){if(s<0||s>=this.indexedTriples.length)return;let[t,e,i]=this.indexedTriples[s];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(i)]}getTripleIndices(s){if(!(s<0||s>=this.indexedTriples.length))return this.indexedTriples[s]}getSourceTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(s){let t=this.stringIndex.getIndex(s);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(s,t){let e=this.stringIndex.getIndex(`${s}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}};function Es(s,t,e){let i=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:i,rows:[]};let r=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let c=t.rows[a][2];r.has(c)||r.set(c,[]),r.get(c).push(a)}for(let a=0;a<e.rows.length;a++){let c=e.rows[a][0];n.has(c)||n.set(c,[]),n.get(c).push(a)}let o=qe.intersection(s,[new Set(r.keys()),new Set(n.keys())]),h=[];for(let a of o){let c=n.get(a),p=r.get(a);for(let d of c)for(let u of p){let m=t.rows[d].concat(e.rows[u]);h.push(m)}}return{names:i,rows:h}}var Ye=class J{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new Ts(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Is;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}static of(t){return new J(t)}static from(t){let e=[];for(let i of t){let{id:r,...n}=i;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,h]of Object.entries(n))if(Array.isArray(h))for(let a of h)e.push([r,o,a]);else e.push([r,o,h])}return new J(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let i=e;i<this.triplesCount;i++)this.cursorIndices.add(i)}map(t){return new J(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new J(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?C.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?C.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?C.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(C.source))}relations(){return new Set(this.index.triples().map(C.relation))}targets(){return new Set(this.index.triples().map(C.target))}objects(t=!1){let e=[];for(let[i,r]of Object.entries(this.object(t)))r.id=i,e.push(r);return e}object(t=!1){let e={};for(let[i,r,n]of this.index.triples())e[i]||(e[i]={id:i}),e[i][r]?Array.isArray(e[i][r])?e[i][r].push(n):e[i][r]=[e[i][r],n]:e[i][r]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:i,relation:r,target:n}=t;if(typeof i>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let c of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,c)&&!o.includes(c))throw new Error(`Unexpected search parameter: ${c}`);if(i){if(i.type){let c=this.index.getSourceTypeSet(i.type);if(c)e.push(c);else return new Set}if(i.id){let c=this.index.getSourceIdSet(i.id);if(c)e.push(c);else return new Set}if(i.qs)for(let[c,p]of Object.entries(i.qs)){let d=this.index.getSourceQsSet(c,p);if(d)e.push(d);else return new Set}}if(n){if(n.type){let c=this.index.getTargetTypeSet(n.type);if(c)e.push(c);else return new Set}if(n.id){let c=this.index.getTargetIdSet(n.id);if(c)e.push(c);else return new Set}if(n.qs)for(let[c,p]of Object.entries(n.qs)){let d=this.index.getTargetQsSet(c,p);if(d)e.push(d);else return new Set}}if(r){let c=typeof r=="string"?{relation:[r]}:r;if(c.relation){let p=new Set;for(let d of c.relation){let u=this.index.getRelationSet(d);if(u)for(let m of u)p.add(m)}if(p.size>0)e.push(p);else return new Set}}let h=qe.intersection(this.metrics,e),a=new Set;for(let c of h){let p=this.index.getTriple(c);if(!i?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){a.add(c);continue}let d=!0;i?.predicate&&(d=d&&i.predicate(C.source(p))),n?.predicate&&(d=d&&n.predicate(C.target(p))),typeof r=="object"&&r.predicate&&(d=d&&r.predicate(C.relation(p))),d&&a.add(c)}return a}search(t){let e=[];for(let i of this.#t(t)){let r=this.index.getTriple(i);r&&e.push(r)}return new J(e)}search2(t){let e=Object.entries(t),i=[];for(let h=0;h<e.length-2;h+=2){let a=e.slice(h,h+3),c={source:a[0][1],relation:a[1][1],target:a[2][1]},p=a.map(m=>m[0]),d=this.#t(c),u=Array.from(d).flatMap(m=>{let $=this.index.getTripleIndices(m);return typeof $>"u"?[]:[$]});i.push({names:p,rows:u})}let r=i.reduce(Es.bind(this,this.metrics)),n=r.names,o=[];for(let h of r.rows){let a={};for(let c=0;c<n.length;c++){let p=n[c];a[p]=this.index.stringIndex.getValue(h[c])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var Qe=window.envConfig;var It=class{constructor(t=`/manifest/triples.${Qe.publication_id}.json`){this.url=t}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[_t]=t,this._data=t}},Tt=class{constructor(t=`/manifest/tribbles.${Qe.publication_id}.txt`){this.url=t}async init(){let t=new We,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let i=new TextDecoderStream,r=e.body.pipeThrough(i).getReader(),n="";for(;;){let{value:o,done:h}=await r.read();if(h)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let c of a){let p=t.parse(c);console.log(p),console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")}}n.length>0&&t.parse(n)}};var k=class s{static{this.ROUTES={[g.PHOTOS]:this.showPhotosUrl,[g.ALBUMS]:this.showAlbumsUrl,[g.ALBUM]:this.showAlbumUrl,[g.METADATA]:this.showMetadataUrl,[g.ABOUT]:this.showAboutUrl,[g.VIDEOS]:this.showVideosUrl,[g.THING]:this.showThingUrl}}static router(t){if(s.ROUTES.hasOwnProperty(t))return s.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===g.ALBUM||t===g.PHOTO||t===g.METADATA||t===g.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var zt=class extends f{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",zt);var Ft=class extends f{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=ze;return l`
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
    `}};customElements.define("photo-header",Ft);var Et=new Map,M=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(i/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Et.has(t))return Et.get(t);let e=t.split("#").map(n=>`#${n}`),i=document.createElement("canvas");i.width=2,i.height=2;let r=i.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Et.set(t,i.toDataURL("image/png")),Et.get(t)}};var Gt=class extends f{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let t=this.id.startsWith("urn:")?x(this.id).id:this.id,e={id:t,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:M.encodeBitmapDataURL(this.mosaicColours)},i=document.createElement("div");i.innerHTML=this.summary??"";let r=i.textContent??i.innerText??"";return l`
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
    `}};customElements.define("app-photo",Gt);var qt=class extends f{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",qt);var _=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Wt=class extends f{static get properties(){return{triples:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}allImages(){return this.triples.search({source:{type:"photo"},relation:{relation:["thumbnail_url","mosaic_colours","full_image"]},target:{type:"unknown"}}).objects().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let i=0;i<t.length;i++){let r=t[i];yield l`
          <app-photo
            id=${P(r.id).id}
            loading="${M.loadingMode(i)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${vt(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",Wt);var Yt=class extends f{static get properties(){return{albums:{type:Array}}}render(){let t=document.getElementById("stats-data"),e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${e.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",Yt);var Z=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let n=s.parse(r.created_at);n<e&&(e=n),n>i&&(i=n)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(i){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),c=r.toLocaleDateString("en-IE",{day:"numeric"}),p=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),u=n.toLocaleDateString("en-IE",{month:"short"}),m=r.getFullYear(),$=n.getFullYear(),T=d===u,V=m===$;return h===a?`${h} ${m}`:T&&V?`${c} - ${p} ${u} ${m}`:`${h} ${m} - ${a} ${$}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Us=window.envConfig,v=class{static isUrnSource(t){return A.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return A.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},A=class s{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[i,r]=t.split("?"),n=i.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return s.isUrn(t)&&s.parseUrn(t).type===e}static toURL(t){if(!s.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:i}=s.parseUrn(t);return`#/thing/${e}:${i}`}static sameURN(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let i=s.parseUrn(t),r=s.parseUrn(e);return i.type===r.type&&i.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return s.isUrn(t)&&s.parseUrn(t).id===e}static sameType(t,e){if(!s.isUrn(t)||!s.isUrn(e))return!1;let i=s.parseUrn(t),r=s.parseUrn(e);return i.type===r.type}static isType(t,e){return s.isUrn(t)?s.parseUrn(t).type===e:!1}},Q=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:w.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:i}=x(e);return t.search({source:{id:i},relation:w.BIRDWATCH_URL}).firstTarget()}},X=class{static details(t,e){let i=t.search({source:{type:"country"},relation:{relation:[w.NAME,w.FLAG]}}),r=i.search({relation:w.NAME,target:{id:e}}).firstSource(),n=x(r),o=i.search({source:n,relation:w.FLAG}).firstTarget();return{urn:r,name:e,flag:o}}static urnDetails(t,e){let i=x(e),r=t.search({source:{type:"country",id:i.id},relation:w.NAME}).firstTarget();return{urn:e,name:r}}},Ke=!1,Ut=new Ye([]);function Cs(s){return v.getRelation(s)!==w.RATING?[s]:[[v.getSource(s),v.getRelation(s),`urn:r\xF3:rating:${encodeURIComponent(v.getTarget(s))}`]]}function Ms(s){if(v.getRelation(s)!==w.COUNTRY)return[s];let e=`urn:r\xF3:country:${v.getTarget(s).toLowerCase().replace(" ","-")}`;return[[v.getSource(s),v.getRelation(s),e,e,v.getRelation(s),v.getTarget(s)]]}function Os(s){for(let t of["thumbnail_url","full_image","poster_url","video_url_1080p","video_url_480p","video_url_720p","video_url_unscaled"])if(v.getRelation(s)===t)return[[v.getSource(s),t,`${Us.photos_url}${v.getTarget(s)}`]];return[s]}function H(s){return Ke||(Ut.add(s),Ut=Ut.flatMap(Cs).flatMap(Ms).flatMap(Os),Ke=!0),Ut}var Qt=class extends f{static get properties(){return{title:{type:String},triples:{type:Object},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return Z.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:i}=X.details(this.triples,t),r=x(i);return l`<span href="#/thing/country:${r.id}" title=${t}>${e}</span>`})}render(){performance.mark(`start-album-render-${this.url}`);let t=M.encodeBitmapDataURL(this.mosaicColours),e=this.renderCountries(),i=x(this.id);return l`
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
        <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${this.broadcast("click-album",{id:i.id,title:this.title})}>
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
    `}};customElements.define("photo-album",Qt);var Kt=class extends f{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),i,r=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(i||(i=e[a].position.top,r.push(e[a])),e[a].position.top===i)r.push(e[a]);else break;let n=Math.min(...r.map(a=>a.minDate)),h=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&h!=="Invalid Date"&&(t.textContent=h)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(i=>{let r=i.getAttribute("data-min-date");return r?[{position:i.getBoundingClientRect(),minDate:parseInt(r,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};customElements.define("year-cursor",Kt);var Jt=class extends f{static get properties(){return{albums:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}getAlbums(){return this.triples.search({source:{type:"album"}}).objects().map(t=>({title:t.name,minDate:parseInt(t.min_date),maxDate:parseInt(t.max_date),url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:t.photos_count,flags:t.flags}))}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((i,r)=>r.maxDate-i.maxDate);async function*e(){let i=2e3,r=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],h=M.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==i&&(i=a,a!==r&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),yield l`
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
      ${vt(e.bind(this)())}
    </section>
    `}};customElements.define("albums-page",Jt);var Zt=class extends f{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",Zt);var Xt=class extends f{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Xt);var te=class extends f{static{this.properties={urn:{type:String}}}id(){return A.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",te);var ee=class extends f{static{this.properties={urn:{type:String},triples:{type:Array}}}name(){let{type:t,id:e}=A.parseUrn(this.urn);if(Y.has(t))return l`<span>${Q.toCommonName(this.triples,e)}</span>`;let i=this.triples.search({source:A.parseUrn(this.urn),relation:w.NAME}).firstTarget();return console.log(this.urn),i?l`<span>${i}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=A.parseUrn(this.urn);return{[b.BIRD]:"bird-link",[b.MAMMAL]:"mammal-link",[b.REPTILE]:"reptile-link",[b.AMPHIBIAN]:"amphibian-link",[b.FISH]:"fish-link",[b.INSECT]:"insect-link"}[t]??""}render(){return A.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${A.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",ee);var se=class extends f{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),_.setIndex()}albumPhotos(t){let e=t.search({source:{type:"photo"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(i=>{let r=t.search({source:x(i)}).firstObject();return r?[r]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(i=>{let r=t.search({source:x(i)}).firstObject();return r?[r]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},i=this.albumPhotos(t);for(let n of[b.UNESCO])e[n]=Array.from(new Set(i.flatMap(o=>o[w.LOCATION]?.filter(h=>A.is(h,n))).filter(o=>o)));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])e[n]=Array.from(new Set(i.flatMap(o=>o[w.SUBJECT]?.filter(h=>A.is(h,n))).filter(o=>o)));let r=[];r=r.concat(e[b.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),i=Z.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,c)=>l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${M.loadingMode(c)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos(t).map((a,c)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),h=this?.countries.split(",").map(a=>{let{flag:c,urn:p}=X.details(this.triples,a),d=x(p);return l`<span href="#/thing/country:${d.id}" title=${a}>${c}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${i}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${h}</p>
        <p class="photo-album-description">${xt(this.description)}
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
    `}};customElements.define("album-page",se);var ie=class extends f{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",ie);var re=class extends f{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",re);var ne=class extends f{static get properties(){return{id:{type:String},image:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),_.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${t.f_stop}</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${t.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(i=>l`<li>${this.renderSemanticValue.call(this,t,i)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${xt(e??"")}`;if(A.isRating(e)){let i=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${i}"></thing-link>`}else{if(A.isUrn(e)&&A.is(e,b.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(A.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,i)=>v.getRelation(e).localeCompare(v.getRelation(i))).filter(e=>!this.isIgnoredKey(v.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(v.getRelation(e))}</th>
              <td>${this.renderSemanticValue(v.getRelation(e),v.getTarget(e))}</td>
          `)}
      <table>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();return e?l`
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
        <td><thing-link .triples=${this.triples} urn=${e.model}></thing-link></td>
        </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${e.width} x ${e.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength(e)}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1/${e.exposure_time?Math.round(1/e.exposure_time):"Unknown"}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture(e)}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${e.iso}</td>
      </tr>
    </table>
    `:l`<p>No EXIF data available</p>`}render(){let t=this.image,e=t.album_id,i=this.triples,r=i.search({source:{id:x(t.id).id},relation:{predicate:n=>{let o=new Set(["album_id","full_image","mosaic_colours","thumbnail_url"]);return!Fe.has(n)&&!o.has(n)}}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(r)}
      ${this.renderExif(i)}

    </section>
    `}};customElements.define("metadata-page",ne);var oe=class extends f{static get properties(){return{}}connectedCallback(){super.connectedCallback(),_.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",oe);var ae=class extends f{static get properties(){return{urn:{type:String},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}urnImages(t,e){let r=t.search(e).sources();return Array.from(r).flatMap(n=>{let o=t.search({source:{id:n,type:"photo"}}).firstObject();return o?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,i)=>i.created_at-e.created_at).map((e,i)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?x(e.id).id:e.id}
        loading="${M.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        mosaicColours="${e.mosaic_colours}"
        imageUrl="${e.full_image}"></app-photo>`)}getAlbums(){return this.triples.search({source:{type:"album"}}).objects()}renderSubjectAlbums(t,e){let i=this.urnImages(t,e),r=new Set(i.map(n=>n.album_id));return Array.from(r).flatMap(n=>this.getAlbums().filter(o=>x(o.id).id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>l`
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
      `)}firstPhotographed(t,e,i){let n=this.urnImages(e,i).sort((o,h)=>o.created_at-h.created_at)[0];return n?new Date(n.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=A.parseUrn(this.urn),i=this.triples.search({source:{id:t,type:e},relation:w.NAME}).firstTarget();if(i)return i;try{let r=A.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:Y.has(r.type)?Q.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let i=[];if(Y.has(t.type))for(let r of["captivity","wild"]){let o={...t,qs:{context:r}};i.push({label:r,query:{target:o}})}else i.push({label:"default",query:{target:t}});return i}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,i])=>i?i.length===0?[]:e==="default"?[l`
        <div class="photo-group">
          ${i}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${e.charAt(0).toUpperCase()+e.slice(1)}</h4>
          ${i}
        </div>
      `]:[])}
    <div/>`}render(){let t=this.triples,e=t.search({source:{type:"photo"}}).objects(),i=A.parseUrn(this.urn),r=i.type,n=t.search({source:P(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let L=n.fcode_name;o["Place Type"]=l`${L.charAt(0).toUpperCase()}${L.slice(1)}`}Y.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:P(this.urn)})}</span>`);let h=n[w.WIKIPEDIA],a=n[w.BIRDWATCH_URL],c=n[w.LONGITUDE],p=n[w.LATITUDE],d;if(c&&p){let L=`https://www.google.com/maps?q=${p},${c}`;d=l`
      <a href="${L}" target="_blank" rel="noopener">[maps]</a>
      `}let u=P(this.urn);u.id==="*"&&delete u.id;let m={target:u},$=this.getPhotoQueries(P(this.urn)),T={};for(let{query:L,label:Mt}of $){let Je=this.urnImages(t,L);T[Mt]=this.renderSubjectPhotos(Je)}let V=this.renderSubjectAlbums(t,m),ct=this.renderPhotoSection(T);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${Y.has(r)&&i.id!=="*"?l`<span class="thing-binomial">(${Q.pretty(i.id)})</span>`:l``}
        </p>
        <br>

        ${h?l`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([L,Mt])=>l`
          <tr>
            <th class="exif-heading">${L}</th>
            <td>${Mt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${ct}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${V}
        </section>

      </div>
    `}};customElements.define("thing-page",ae);var Ct=class{static loadingMode(t){return t===0?"auto":"none"}};var le=class extends f{static get properties(){return{triples:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}getVideos(){return this.triples.search({source:{type:"video"}}).objects()}render(){let t=this.getVideos().map((e,i)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Ct.loadingMode(i)}"
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
    `}};customElements.define("videos-page",le);var I=new It,ks=new Tt;ks.init();var Rs=[[I,U.EAGER]],Ps={[g.ABOUT]:[[I,U.EAGER]],[g.ALBUMS]:[[I,U.EAGER]],[g.PHOTOS]:[[I,U.EAGER]],[g.VIDEOS]:[[I,U.EAGER]],[g.ALBUM]:[[I,U.EAGER]],[g.PHOTO]:[[I,U.EAGER]],[g.METADATA]:[[I,U.EAGER]],[g.THING]:[[I,U.EAGER]]},ce=class{static async init(){let t=k.getUrl();console.log(`loading ${t?.type}`);let e=Ps[t?.type]??Rs,i=[];for(let[r,n]of e)n===U.EAGER?i.push(r.init()):n===U.LAZY&&r.init();await Promise.all(i)}};await ce.init();var he=class s extends f{static{this.DEFAULT_PAGE=g.ALBUMS}static{this.LOCATION_TYPE_TO_PAGE={album:g.ALBUM,albums:g.ALBUMS,photos:g.PHOTOS,metadata:g.METADATA,about:g.ABOUT,videos:g.VIDEOS,thing:g.THING}}static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=k.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),k.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=g.PHOTOS,this.id=i,this.title=e,k.showAlbumUrl(i)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r}=t.detail;this.page=g.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,k.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=k.router(this.page);e||console.error(`no router found for page ${this.page}`),k.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums"){let i=H(I._data);return l`
      <albums-page .triples=${i} class="${e}"></albums-page>
      `}if(this.page===g.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===g.PHOTOS){let i=H(I._data);return l`<photos-page .triples=${i} class="${e}"></photos-page>`}if(this.page===g.ALBUM){this.id||console.error("no album id provided");let i=H(I._data),r=i.search({source:{type:"album",id:this.id}}).firstObject();return r||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .triples=${i}
        title=${r.name}
        id=${this.id}
        minDate=${r.min_date}
        maxDate=${r.max_date}
        imageCount=${r.photos_count}
        description=${r.description}
        countries=${r.flags}
        class="${e}"></album-page>
      `}if(this.page===g.METADATA){let i=H(I._data).search({source:{type:"photo",id:this.id}}).firstObject();return i||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${H(I._data)}
        .image=${i}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===g.VIDEOS)return l`
      <videos-page .triples=${H(I._data)} class="${e}"></videos-page>
      `;if(this.page===g.THING)return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .triples=${H(I._data)}
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
    `}};customElements.define("photo-app",he);export{Rs as DEFAULT_DEPENDENCIES,Ps as PAGE_DEPENDECIES,he as PhotoApp};
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
