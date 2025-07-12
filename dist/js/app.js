var it=globalThis,It=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),pe=new WeakMap,Dt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(It&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pe.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(e,t))}return t}toString(){return this.cssText}},Qe=i=>new Dt(typeof i=="string"?i:i+"",void 0,ke);var Ke=(i,t)=>{if(It)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=it.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},me=It?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Qe(e)})(i):i,{is:Xe,defineProperty:ts,getOwnPropertyDescriptor:es,getOwnPropertyNames:ss,getOwnPropertySymbols:is,getPrototypeOf:rs}=Object,mt=globalThis,ge=mt.trustedTypes,os=ge?ge.emptyScript:"",as=mt.reactiveElementPolyfillSupport,W=(i,t)=>i,Rt={toAttribute(i,t){switch(t){case Boolean:i=i?os:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Me=(i,t)=>!Xe(i,t),fe={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:Me};Symbol.metadata??=Symbol("metadata"),mt.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=fe){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&ts(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:o}=es(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return r?.call(this)},set(a){let h=r?.call(this);o.call(this,a),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??fe}static o(){if(this.hasOwnProperty(W("elementProperties")))return;let t=rs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(W("properties"))){let e=this.properties,s=[...ss(e),...is(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(me(r))}else t!==void 0&&e.push(me(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ke(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:Rt).toAttribute(e,s.type);this.m=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let o=s.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Rt;this.m=r,this[r]=a.fromAttribute(e,o.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Me)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,o]of this.v)this[r]=o;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],o)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[W("elementProperties")]=new Map,R[W("finalized")]=new Map,as?.({ReactiveElement:R}),(mt.reactiveElementVersions??=[]).push("2.0.4");var Bt=globalThis,rt=Bt.trustedTypes,$e=rt?rt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Gt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+C,ns=`<${Ht}>`,H=document,J=()=>H.createComment(""),Q=i=>i===null||typeof i!="object"&&typeof i!="function",Ce=Array.isArray,Oe=i=>Ce(i)||typeof i?.[Symbol.iterator]=="function",Mt=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,Ae=/>/g,B=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,_e=/"/g,De=/^(?:script|style|textarea|title)$/i,Re=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Re(1),ls=Re(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ve=new WeakMap,G=H.createTreeWalker(H,129);function Ne(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(t):t}var Pe=(i,t)=>{let e=i.length-1,s=[],r,o=t===2?"<svg>":"",a=F;for(let h=0;h<e;h++){let n=i[h],u,f,d=-1,$=0;for(;$<n.length&&(a.lastIndex=$,f=a.exec(n),f!==null);)$=a.lastIndex,a===F?f[1]==="!--"?a=be:f[1]!==void 0?a=Ae:f[2]!==void 0?(De.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=B):f[3]!==void 0&&(a=B):a===B?f[0]===">"?(a=r??F,d=-1):f[1]===void 0?d=-2:(d=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?B:f[3]==='"'?_e:ye):a===_e||a===ye?a=B:a===be||a===Ae?a=F:(a=B,r=void 0);let g=a===B&&i[h+1].startsWith("/>")?" ":"";o+=a===F?n+ns:d>=0?(s.push(u),n.slice(0,d)+Gt+n.slice(d)+C+g):n+C+(d===-2?h:g)}return[Ne(i,o+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},K=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,a=0,h=t.length-1,n=this.parts,[u,f]=Pe(t,e);if(this.el=i.createElement(u,s),G.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=G.nextNode())!==null&&n.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Gt)){let $=f[a++],g=r.getAttribute(d).split(C),_=/([.?@])?(.*)/.exec($);n.push({type:1,index:o,name:_[2],strings:g,ctor:_[1]==="."?at:_[1]==="?"?nt:_[1]==="@"?lt:j}),r.removeAttribute(d)}else d.startsWith(C)&&(n.push({type:6,index:o}),r.removeAttribute(d));if(De.test(r.tagName)){let d=r.textContent.split(C),$=d.length-1;if($>0){r.textContent=rt?rt.emptyScript:"";for(let g=0;g<$;g++)r.append(d[g],J()),G.nextNode(),n.push({type:2,index:++o});r.append(d[$],J())}}}else if(r.nodeType===8)if(r.data===Ht)n.push({type:2,index:o});else{let d=-1;for(;(d=r.data.indexOf(C,d+1))!==-1;)n.push({type:7,index:o}),d+=C.length-1}o++}}static createElement(t,e){let s=H.createElement("template");return s.innerHTML=t,s}};function Y(i,t,e=i,s){if(t===y)return t;let r=s!==void 0?e.U?.[s]:e.N,o=Q(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=Y(i,r._$AS(i,t.values),r,s)),t}var ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??H).importNode(e,!0);G.currentNode=r;let o=G.nextNode(),a=0,h=0,n=s[0];for(;n!==void 0;){if(a===n.index){let u;n.type===2?u=new gt(o,o.nextSibling,this,t):n.type===1?u=new n.ctor(o,n.name,n.strings,this,t):n.type===6&&(u=new ct(o,this,t)),this._$AV.push(u),n=s[++h]}a!==n?.index&&(o=G.nextNode(),a++)}return G.currentNode=H,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},gt=class Ie{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),Q(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Oe(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&Q(this._$AH)?this._$AA.nextSibling.data=t:this.j(H.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(Ne(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let o=new ot(r,this),a=o.O(this.options);o.R(e),this.j(a),this._$AH=o}}_$AC(t){let e=ve.get(t.strings);return e===void 0&&ve.set(t.strings,e=new K(t)),e}D(t){Ce(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let o of t)r===e.length?e.push(s=new Ie(this.H(J()),this.H(J()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,r){let o=this.strings,a=!1;if(o===void 0)t=Y(this,t,e,0),a=!Q(t)||t!==this._$AH&&t!==y,a&&(this._$AH=t);else{let h=t,n,u;for(t=o[0],n=0;n<o.length-1;n++)u=Y(this,h[s+n],e,n),u===y&&(u=this._$AH[n]),a||=!Q(u)||u!==this._$AH[n],u===b?t=b:t!==b&&(t+=(u??"")+o[n+1]),this._$AH[n]=u}a&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends j{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},nt=class extends j{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},lt=class extends j{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??b)===y)return;let s=this._$AH,r=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==b&&(s===b||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}},cs={W:Gt,q:C,J:Ht,Z:1,F:Pe,G:ot,K:Oe,X:Y,Y:gt,tt:j,st:nt,it:lt,et:at,ot:ct},hs=Bt.litHtmlPolyfillSupport;hs?.(K,gt),(Bt.litHtmlVersions??=[]).push("3.1.3");var Be=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let o=e?.renderBefore??null;s._$litPart$=r=new gt(t.insertBefore(J(),o),o,void 0,e??{})}return r._$AI(i),r};var P=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var ds=globalThis.litElementPolyfillSupport;ds?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:us}=cs,ps=i=>i===null||typeof i!="object"&&typeof i!="function";var we=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,ms=i=>i?._$litType$?.h!=null;var Ge=i=>i.strings===void 0,Se=()=>document.createComment(""),N=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let o=s.insertBefore(Se(),r),a=s.insertBefore(Se(),r);e=new us(o,a,i,i.options)}else{let o=e._$AB.nextSibling,a=e._$AM,h=a!==i;if(h){let n;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(n=i._$AU)!==a._$AU&&e._$AP(n)}if(o!==r||h){let n=e._$AA;for(;n!==o;){let u=n.nextSibling;s.insertBefore(n,r),n=u}}}return e},D=(i,t,e=i)=>(i._$AI(t,e),i),gs={},X=(i,t=gs)=>i._$AH=t,Nt=i=>i._$AH,Ct=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},He=i=>{i._$AR()};var T=i=>(...t)=>({_$litDirective$:i,values:t}),k=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var q=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),q(s,t);return!0},ht=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ye=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),bs(t)}};function fs(i){this._$AN!==void 0?(ht(this),this._$AM=i,Ye(this)):this._$AM=i}function $s(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let o=e;o<s.length;o++)q(s[o],!1),ht(s[o]);else s!=null&&(q(s,!1),ht(s));else q(this,i)}var bs=i=>{i.type==2&&(i._$AP??=$s,i._$AQ??=fs)},tt=class extends k{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ye(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(q(this,t),ht(this))}setValue(t){if(Ge(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var dt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},ut=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var pt=class extends tt{constructor(){super(...arguments),this.dt=new dt(this),this.ft=new ut}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:o,ft:a}=this;return(async(h,n)=>{for await(let u of h)if(await n(u)===!1)return})(e,async h=>{for(;a.get();)await a.get();let n=o.deref();if(n!==void 0){if(n.vt!==e)return!1;s!==void 0&&(h=s(h,r)),n.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ks=T(pt),Ms=T(class extends pt{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&He(this.ht);let e=N(this.ht);D(e,i)}}),Ee=i=>ms(i)?i._$litType$.h:i.strings,Cs=T(class extends k{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=we(this.bt)?Ee(this.bt):null,s=we(t)?Ee(t):null;if(e!==null&&(s===null||e!==s)){let r=Nt(i).pop(),o=this.yt.get(e);if(o===void 0){let a=document.createDocumentFragment();o=Be(b,a),o.setConnected(!1),this.yt.set(e,o)}X(o,[r]),N(o,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let o=Nt(r).pop();He(i),N(i,void 0,o),X(i,[o])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Os=T(class extends k{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return y}}),As={},Ds=T(class extends k{constructor(){super(...arguments),this._t=As}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Rs=T(class extends k{constructor(){super(...arguments),this.key=b}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(X(i),this.key=t),e}}),Ns=T(class extends k{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ge(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===y||t===b)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return y;if(i.type===4){if(!!t===e.hasAttribute(s))return y;if(i.type===1&&e.getAttribute(s)===t+"")return y}}return X(i),t}});var Ot=new WeakMap,Ps=T(class extends tt{render(i){return b}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),b}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Ot.get(t);e===void 0&&(e=new WeakMap,Ot.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Ot.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),xe=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Is=T(class extends k{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],o=[],a=0;for(let h of i)r[a]=s?s(h,a):a,o[a]=e(h,a),a++;return{values:o,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Nt(i),{values:o,keys:a}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=a,o;let h=this.Ct??=[],n=[],u,f,d=0,$=r.length-1,g=0,_=o.length-1;for(;d<=$&&g<=_;)if(r[d]===null)d++;else if(r[$]===null)$--;else if(h[d]===a[g])n[g]=D(r[d],o[g]),d++,g++;else if(h[$]===a[_])n[_]=D(r[$],o[_]),$--,_--;else if(h[d]===a[_])n[_]=D(r[d],o[_]),N(i,n[_+1],r[d]),d++,_--;else if(h[$]===a[g])n[g]=D(r[$],o[g]),N(i,r[d],r[$]),$--,g++;else if(u===void 0&&(u=xe(a,g,_),f=xe(h,d,$)),u.has(h[d]))if(u.has(h[$])){let M=f.get(a[g]),Z=M!==void 0?r[M]:null;if(Z===null){let ue=N(i,r[d]);D(ue,o[g]),n[g]=ue}else n[g]=D(Z,o[g]),N(i,r[d],Z),r[M]=null;g++}else Ct(r[$]),$--;else Ct(r[d]),d++;for(;g<=_;){let M=N(i,n[_+1]);D(M,o[g]),n[g++]=M}for(;d<=$;){let M=r[d++];M!==null&&Ct(M)}return this.Ct=a,X(i,n),y}}),je="important",ys=" !"+je,Bs=T(class extends k{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let o=typeof r=="string"&&r.endsWith(ys);s.includes("-")||o?e.setProperty(s,o?r.slice(0,-11):r,o?je:""):e[s]=r}}return y}}),Gs=T(class extends k{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?y:(this.At=i,document.importNode(i.content,!0))}}),V=class extends k{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};V.directiveName="unsafeHTML",V.resultType=1;var ft=T(V);var et=class extends V{};et.directiveName="unsafeSVG",et.resultType=2;var Hs=T(et),Te=i=>!ps(i)&&typeof i.then=="function",Ue=1073741823;var Pt=class extends tt{constructor(){super(...arguments),this.Mt=Ue,this.Ut=[],this.dt=new dt(this),this.ft=new ut}render(...t){return t.find(e=>!Te(e))??y}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let o=this.dt,a=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let n=e[h];if(!Te(n))return this.Mt=h,n;h<r&&n===s[h]||(this.Mt=Ue,r=0,Promise.resolve(n).then(async u=>{for(;a.get();)await a.get();let f=o.deref();if(f!==void 0){let d=f.Ut.indexOf(n);d>-1&&d<f.Mt&&(f.Mt=d,f.setValue(u))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ys=T(Pt);var _s=Symbol.for(""),vs=i=>{if(i?.r===_s)return i?._$litStatic$};var Le=new Map,Ve=i=>(t,...e)=>{let s=e.length,r,o,a=[],h=[],n,u=0,f=!1;for(;u<s;){for(n=t[u];u<s&&(o=e[u],(r=vs(o))!==void 0);)n+=r+t[++u],f=!0;u!==s&&h.push(o),a.push(n),u++}if(u===s&&a.push(t[s]),f){let d=a.join("$$lit$$");(t=Le.get(d))===void 0&&(a.raw=a,Le.set(d,t=a)),e=h}return i(t,...e)},js=Ve(l),Vs=Ve(ls);var ws=/^\s*([a-zA-Z]+)\:/,Ss=/^\s*"([^\"]+?)"/,Es=/^\s*([^\s]+)/,z=class{static START="START";static RELATION="RELATION";static SUBQUERY="SUBQUERY";static END="END"},xs=class{state;lastState;constructor(){this.state=z.RELATION,this.lastState=z.START}parseRelation(i){let t=i.match(ws);if(!t)throw new SyntaxError(`failed while parsing relationship: ${i}, expected relation`);return[t[1],i.slice(t[0].length)]}parseSubquery(i){let t=i.match(Ss);if(t)return[t[1],i.slice(t[0].length)];let e=i.match(Es);if(e)return[e[1],i.slice(e[0].length)];throw new SyntaxError(`subquery: failed to parse query: ${i}, expected subquery`)}advanceState(i){this.lastState=this.state,this.state=i}tokenise(i){let t=i.trim(),e=[],s={};for(;t.length>0;){if(this.state===z.RELATION){let r=this.parseRelation(t);s.relation=r[0],t=r[1],this.advanceState(z.SUBQUERY);continue}if(this.state===z.SUBQUERY){let r=this.parseSubquery(t);s.subquery=r[0],t=r[1],e.push({...s}),t=r[1],this.advanceState(z.RELATION);continue}if(this.state===this.lastState)throw new SyntaxError(`failed to parse query: ${i}, expected relation`)}for(let r of e){if(!r.relation)throw new SyntaxError(`failed to parse query: ${i}, expected relation`);if(!r.subquery)throw new SyntaxError(`failed to parse query: ${i}, expected subquery`)}return e}},ze=class{content;comparators;constructor(i,t){this.content=i,this.comparators=t}*search(i){let e=new xs().tokenise(i);for(let s of this.content){let r=!0;for(let{relation:o,subquery:a}of e){if(!o||!a)continue;let h=this.comparators[o];if(!h)r=!1;else if(!r)continue;r=r&&h(s,a)}r&&(yield s)}}};var m=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var $t=Symbol("the albums manifest"),bt=Symbol("the images manifest"),li=Symbol("the site manifest"),At=Symbol("metadata about the site manifest"),yt=Symbol("the videos manifest"),_t=Symbol("the exif data"),vt=Symbol("the semantic data"),Ze=53.33306,Fe=-6.24889,We=6,qe="photos",c=class{static EAGER="eager";static LAZY="lazy"},p=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function Ts(i="/manifest/env.json"){return await(await fetch(i)).json()}var st=await Ts(),wt=class{_data;constructor(t=`/manifest/images.${st.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[bt]&&(this._data=window[bt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[bt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},St=class{_data;constructor(t=`/manifest/videos.${st.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[yt]&&(this._data=window[yt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[yt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Et=class{_data;constructor(t=`/manifest/albums.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[$t]&&(this._data=window[$t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[$t]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},xt=class{_data;constructor(t=`/manifest/exif.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[_t]=e,this._data=e}exif(){return this._data}};function Je(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let r of s)if(Je(i,r,e))return!0;return!1}var Tt=class{_data;constructor(t=`/manifest/semantic.${st.publication_id}.json`){this.url=t}async init(){if(window[vt]&&(this._data=window[vt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[vt]=t,this._data=t}semantic(){return this._data}},Ut=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[At]&&(this._data=window[At]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[At]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Je(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let r of e)this.isChild(t,r)&&s.add(r);return s}};var v=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Yt=class extends m{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",Yt);var jt=class extends m{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=qe;return l`
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
    `}};customElements.define("photo-header",jt);var Vt=class extends m{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return l`
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
    `}};customElements.define("app-photo",Vt);var zt=class extends m{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",zt);var I=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r);return t>o*a+1?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Zt=class extends m{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(s)}"
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
    `}};customElements.define("photos-page",Zt);var O=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let o=i.parse(r.created_at);o<e&&(e=o),o>s&&(s=o)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),o=e instanceof Date?e:new Date(parseFloat(e));if(s){let a={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",a),n=o.toLocaleDateString("en-IE",a),u=r.toLocaleDateString("en-IE",{day:"numeric"}),f=o.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),$=o.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),_=o.getFullYear(),M=d===$,Z=g===_;return h===n?`${h} ${g}`:M&&Z?`${u} - ${f} ${$} ${g}`:`${h} ${g} - ${n} ${_}`}else{let a={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",a),n=o.toLocaleDateString("en-IE",a);return h===n?h:`${h} \u2014 ${n}`}}};var Ft=class extends m{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return O.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),l`
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
    `}};customElements.define("photo-album",Ft);var Wt=class extends m{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r);return t>o*a?"lazy":"eager"}render(){return performance.mark("start-albums-render"),l`
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
    `}};customElements.define("photo-album-page",Wt);var qt=class extends m{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Ze,Fe],We);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let r=this.albums.albums();for(let o of Object.values(r)){let a=o.geolocation;a&&geoJSON(a,{style:function(){return{color:"red"}},onEachFeature:(h,n)=>{let u=`
            <section>
              <h3>${o.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${o.id}">
                  <img width="170" height="170" src="${o.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;n.bindPopup(u)}}).addTo(e)}}render(){return l`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",qt);var Jt=class extends m{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",Jt);var Qt=class extends m{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Qt);var Kt=class extends m{static properties={urn:{type:String}};get placeId(){let t=this.urn?.match(/^urn:ró:unesco:(\d+)$/);return t?t[1]:null}get url(){return this.placeId?`https://whc.unesco.org/en/list/${this.placeId}`:null}render(){return this.placeId?l`
      <a class="unesco-link" href="${this.url}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.placeId}</span>
        <span class="unesco-text-short">UNESCO #${this.placeId}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Kt);var Lt=class i{static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setOpenGraph(t)}};var Xt=class extends m{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Lt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s={},r=t.filter(o=>o[0]===e.id);for(let[o,a,h]of r)s[a]||(s[a]=[]),s[a].push(h);return{...e,relations:s}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=O.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos(),r=s.map((n,u)=>l`
      <app-photo
        id=${n.id}
        tags="${n.tags}"
        loading="${I.loadingMode(u)}"
        thumbnailUrl="${n.thumbnail_url}"
        thumbnailDataUrl="${n.thumbnail_mosaic_url}"
        imageUrl="${n.full_image}"></app-photo>`),o=this.albumVideos().map((n,u)=>l`<app-video
        id=${n.id}
        url_poster=${n.poster_url}
        url_unscaled=${n.video_url_unscaled}
        url_1080p=${n.video_url_1080p}
        url_720p=${n.video_url_720p}
        url_480p=${n.video_url_480p}
        ></app-video>`),a=new Set(s.flatMap(n=>n.relations.location?.filter(u=>u.startsWith("urn:r\xF3:unesco:"))).filter(n=>n)),h=Array.from(a).map(n=>l`<unesco-link urn="${n}"></unesco-link>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${ft(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>

        <ul class="unesco-links">
          ${h.map(n=>l`<li>${n}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${r}
      </section>

      <section class="video-container">
        ${o}
      </section>
    </div>
    `}};customElements.define("album-page",Xt);var te=class extends m{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return l`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",te);var ee=class extends m{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=O.findRange(this.photos()),r=O.dateRange(e,s,t.matches);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${r}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(o=>l`
        <app-photo
          id="${o.id}"
          tags="${o.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${o.thumbnail_url}"
          thumbnailDataUrl="${o.thumbnail_mosaic_url}"
          imageUrl="${o.full_image}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",ee);var se=class extends m{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",se);var ie=class extends m{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return l`<div class="photo-album">
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
    </div>`}};customElements.define("tag-album",ie);var re=class extends m{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return l`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return l`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_mosaic_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return l`
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
    `}};customElements.define("tags-page",re);var oe=class extends m{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",oe);var ae=class extends m{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?l`${this.exif.focal_length}`:this.exif.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?l`<em>${e}</em>`:e.startsWith("urn:r\xF3:unesco")?l`<unesco-link .urn="${e}"></unesco-link>`:e}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>l`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,s=this.semantic;return l`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?l`<br/><p>${ft(t.description)}</p>`:l``}

      ${this.renderSemanticData(s)}

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
    `}};customElements.define("metadata-page",ae);var ne=class extends m{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.created_at)return!1;let[e]=t.created_at.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return l`
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
    `}};customElements.define("date-page",ne);var le=class extends m{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",le);var kt=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r),h=t>o*a+1;return t===0?"auto":"none"}};var ce=class extends m{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,s)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${kt.loadingMode(s)}"
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
    `}};customElements.define("videos-page",ce);var S=new Et,w=new wt,E=new St,L=new Ut,U=new xt,x=new Tt,Us=[[S,c.EAGER],[w,c.EAGER],[E,c.EAGER],[L,c.EAGER],[U,c.EAGER],[x,c.EAGER]],Ls={[p.ABOUT]:[[S,c.LAZY],[w,c.LAZY],[E,c.LAZY],[L,c.LAZY],[U,c.LAZY],[x,c.LAZY]],[p.ALBUMS]:[[S,c.EAGER],[w,c.LAZY],[E,c.LAZY],[L,c.LAZY],[U,c.LAZY],[x,c.LAZY]],[p.PHOTOS]:[[S,c.EAGER],[w,c.EAGER],[E,c.EAGER],[L,c.LAZY],[U,c.LAZY],[x,c.LAZY]],[p.VIDEOS]:[[S,c.LAZY],[w,c.LAZY],[E,c.EAGER],[L,c.LAZY],[U,c.LAZY],[x,c.LAZY]],[p.ALBUM]:[[S,c.EAGER],[w,c.EAGER],[E,c.EAGER],[x,c.EAGER],[L,c.LAZY],[U,c.LAZY]],[p.PHOTO]:[[S,c.EAGER],[w,c.EAGER],[E,c.EAGER],[L,c.LAZY],[U,c.EAGER],[x,c.EAGER]],[p.DATE]:[[S,c.EAGER],[w,c.EAGER],[E,c.EAGER],[L,c.LAZY],[U,c.LAZY],[x,c.LAZY]],[p.TAG_ALBUM]:[[S,c.LAZY],[w,c.EAGER],[E,c.EAGER],[L,c.LAZY],[U,c.EAGER],[x,c.EAGER]],[p.TAG]:[[S,c.LAZY],[w,c.EAGER],[E,c.EAGER],[L,c.LAZY],[U,c.EAGER],[x,c.EAGER]],[p.LOCATIONS]:[[S,c.EAGER],[w,c.LAZY],[E,c.LAZY],[L,c.LAZY],[U,c.EAGER],[x,c.EAGER]],[p.METADATA]:[[S,c.LAZY],[w,c.EAGER],[E,c.EAGER],[L,c.EAGER],[U,c.EAGER],[x,c.EAGER]],[p.STATS]:[[S,c.LAZY],[w,c.LAZY],[E,c.LAZY],[L,c.LAZY],[U,c.EAGER],[x,c.EAGER]]},he=class{static async init(){let t=v.getUrl();console.log(`loading ${t?.type}`);let e=Ls[t?.type]??Us,s=[];for(let[r,o]of e)o===c.EAGER?s.push(r.init()):o===c.LAZY&&r.init();await Promise.all(s)}};await he.init();var de=class i extends m{static DEFAULT_PAGE=p.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:p.ALBUM,albums:p.ALBUMS,photos:p.PHOTOS,date:p.DATE,"tag-album":p.TAG_ALBUM,tags:p.TAGS,locations:p.LOCATIONS,stats:p.STATS,metadata:p.METADATA,about:p.ABOUT,videos:p.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=v.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===p.METADATA||this.page===p.ALBUM||this.page===p.METADATA?this.id=t.id:this.page===p.TAG_ALBUM?this.tag=t.tag:this.page===p.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=p.PHOTOS,this.id=s,this.title=e,v.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=p.TAG_ALBUM,this.tag=e,v.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r,tags:o}=t.detail;this.page=p.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,this.tags=o??[],v.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===p.ABOUT?v.showAboutUrl():this.page===p.PHOTOS?v.showPhotosUrl():this.page===p.ALBUMS?v.showAlbumsUrl():this.page===p.TAGS?v.showTagsUrl():this.page===p.LOCATIONS?v.showLocationsUrl():this.page===p.STATS?v.showStatsUrl():this.page===p.PHOTOS?v.showAlbumUrl(this.id):this.page===p.METADATA?v.showMetadataUrl(this.id):this.page===p.DATE?v.showDateUrl(this.date):this.page===p.VIDEOS?v.showVideosUrl():v.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return l`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===p.ABOUT)return l`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===p.PHOTOS)return l`<photos-page class="${e.join(" ")}" .images=${w}></photos-page>`;if(this.page===p.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${w}
        .videos=${E}
        .semantic=${x}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===p.METADATA){let s=w.images().find(h=>h.id===this.id),r=U.exif().find(h=>h.id===this.id),o=x.semantic().filter(h=>h[0]===this.id),a={};for(let[h,n,u]of o)a[n]?typeof a[n]=="string"&&(a[n]=[a[n],u]):a[n]=u;return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page .image=${s} .semantic=${a} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===p.VIDEOS)return l`
      <videos-page .videos=${E} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[];let r=new ze;return l`
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
    `}};customElements.define("photo-app",de);export{Us as DEFAULT_DEPENDENCIES,Ls as PAGE_DEPENDECIES,de as PhotoApp};
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
