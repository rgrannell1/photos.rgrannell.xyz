var it=globalThis,It=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Me=Symbol(),ue=new WeakMap,Dt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(It&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ue.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ue.set(e,t))}return t}toString(){return this.cssText}},Qe=s=>new Dt(typeof s=="string"?s:s+"",void 0,Me);var Ke=(s,t)=>{if(It)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=it.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},me=It?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Qe(e)})(s):s,{is:Xe,defineProperty:ts,getOwnPropertyDescriptor:es,getOwnPropertyNames:ss,getOwnPropertySymbols:is,getPrototypeOf:rs}=Object,mt=globalThis,ge=mt.trustedTypes,as=ge?ge.emptyScript:"",os=mt.reactiveElementPolyfillSupport,W=(s,t)=>s,Rt={toAttribute(s,t){switch(t){case Boolean:s=s?as:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ke=(s,t)=>!Xe(s,t),fe={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:ke};Symbol.metadata??=Symbol("metadata"),mt.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=fe){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&ts(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:a}=es(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);a.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??fe}static o(){if(this.hasOwnProperty(W("elementProperties")))return;let t=rs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(W("properties"))){let e=this.properties,i=[...ss(e),...is(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(me(r))}else t!==void 0&&e.push(me(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ke(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:Rt).toAttribute(e,i.type);this.m=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let a=i.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Rt;this.m=r,this[r]=o.fromAttribute(e,a.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??ke)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,a]of this.v)this[r]=a;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,a]of i)a.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],a)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[W("elementProperties")]=new Map,R[W("finalized")]=new Map,os?.({ReactiveElement:R}),(mt.reactiveElementVersions??=[]).push("2.0.4");var Bt=globalThis,rt=Bt.trustedTypes,$e=rt?rt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Gt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+C,ns=`<${Ht}>`,H=document,J=()=>H.createComment(""),Q=s=>s===null||typeof s!="object"&&typeof s!="function",Ce=Array.isArray,Oe=s=>Ce(s)||typeof s?.[Symbol.iterator]=="function",kt=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,Ae=/>/g,B=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,_e=/"/g,De=/^(?:script|style|textarea|title)$/i,Re=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),n=Re(1),ls=Re(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),we=new WeakMap,G=H.createTreeWalker(H,129);function Ne(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(t):t}var Pe=(s,t)=>{let e=s.length-1,i=[],r,a=t===2?"<svg>":"",o=F;for(let h=0;h<e;h++){let l=s[h],m,f,p=-1,$=0;for(;$<l.length&&(o.lastIndex=$,f=o.exec(l),f!==null);)$=o.lastIndex,o===F?f[1]==="!--"?o=be:f[1]!==void 0?o=Ae:f[2]!==void 0?(De.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=B):f[3]!==void 0&&(o=B):o===B?f[0]===">"?(o=r??F,p=-1):f[1]===void 0?p=-2:(p=o.lastIndex-f[2].length,m=f[1],o=f[3]===void 0?B:f[3]==='"'?_e:ye):o===_e||o===ye?o=B:o===be||o===Ae?o=F:(o=B,r=void 0);let g=o===B&&s[h+1].startsWith("/>")?" ":"";a+=o===F?l+ns:p>=0?(i.push(m),l.slice(0,p)+Gt+l.slice(p)+C+g):l+C+(p===-2?h:g)}return[Ne(s,a+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},K=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,o=0,h=t.length-1,l=this.parts,[m,f]=Pe(t,e);if(this.el=s.createElement(m,i),G.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=G.nextNode())!==null&&l.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Gt)){let $=f[o++],g=r.getAttribute(p).split(C),_=/([.?@])?(.*)/.exec($);l.push({type:1,index:a,name:_[2],strings:g,ctor:_[1]==="."?ot:_[1]==="?"?nt:_[1]==="@"?lt:j}),r.removeAttribute(p)}else p.startsWith(C)&&(l.push({type:6,index:a}),r.removeAttribute(p));if(De.test(r.tagName)){let p=r.textContent.split(C),$=p.length-1;if($>0){r.textContent=rt?rt.emptyScript:"";for(let g=0;g<$;g++)r.append(p[g],J()),G.nextNode(),l.push({type:2,index:++a});r.append(p[$],J())}}}else if(r.nodeType===8)if(r.data===Ht)l.push({type:2,index:a});else{let p=-1;for(;(p=r.data.indexOf(C,p+1))!==-1;)l.push({type:7,index:a}),p+=C.length-1}a++}}static createElement(t,e){let i=H.createElement("template");return i.innerHTML=t,i}};function Y(s,t,e=s,i){if(t===y)return t;let r=i!==void 0?e.U?.[i]:e.N,a=Q(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=Y(s,r._$AS(s,t.values),r,i)),t}var at=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??H).importNode(e,!0);G.currentNode=r;let a=G.nextNode(),o=0,h=0,l=i[0];for(;l!==void 0;){if(o===l.index){let m;l.type===2?m=new gt(a,a.nextSibling,this,t):l.type===1?m=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(m=new ct(a,this,t)),this._$AV.push(m),l=i[++h]}o!==l?.index&&(a=G.nextNode(),o++)}return G.currentNode=H,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},gt=class Ie{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),Q(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Oe(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&Q(this._$AH)?this._$AA.nextSibling.data=t:this.j(H.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=K.createElement(Ne(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let a=new at(r,this),o=a.O(this.options);a.R(e),this.j(o),this._$AH=a}}_$AC(t){let e=we.get(t.strings);return e===void 0&&we.set(t.strings,e=new K(t)),e}D(t){Ce(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let a of t)r===e.length?e.push(i=new Ie(this.H(J()),this.H(J()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,r){let a=this.strings,o=!1;if(a===void 0)t=Y(this,t,e,0),o=!Q(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{let h=t,l,m;for(t=a[0],l=0;l<a.length-1;l++)m=Y(this,h[i+l],e,l),m===y&&(m=this._$AH[l]),o||=!Q(m)||m!==this._$AH[l],m===b?t=b:t!==b&&(t+=(m??"")+a[l+1]),this._$AH[l]=m}o&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ot=class extends j{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},nt=class extends j{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},lt=class extends j{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??b)===y)return;let i=this._$AH,r=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==b&&(i===b||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}},cs={W:Gt,q:C,J:Ht,Z:1,F:Pe,G:at,K:Oe,X:Y,Y:gt,tt:j,st:nt,it:lt,et:ot,ot:ct},hs=Bt.litHtmlPolyfillSupport;hs?.(K,gt),(Bt.litHtmlVersions??=[]).push("3.1.3");var Be=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let a=e?.renderBefore??null;i._$litPart$=r=new gt(t.insertBefore(J(),a),a,void 0,e??{})}return r._$AI(s),r};var P=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var ds=globalThis.litElementPolyfillSupport;ds?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ps}=cs,us=s=>s===null||typeof s!="object"&&typeof s!="function";var ve=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,ms=s=>s?._$litType$?.h!=null;var Ge=s=>s.strings===void 0,Se=()=>document.createComment(""),N=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let a=i.insertBefore(Se(),r),o=i.insertBefore(Se(),r);e=new ps(a,o,s,s.options)}else{let a=e._$AB.nextSibling,o=e._$AM,h=o!==s;if(h){let l;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(l=s._$AU)!==o._$AU&&e._$AP(l)}if(a!==r||h){let l=e._$AA;for(;l!==a;){let m=l.nextSibling;i.insertBefore(l,r),l=m}}}return e},D=(s,t,e=s)=>(s._$AI(t,e),s),gs={},X=(s,t=gs)=>s._$AH=t,Nt=s=>s._$AH,Ct=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},He=s=>{s._$AR()};var x=s=>(...t)=>({_$litDirective$:s,values:t}),M=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var q=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),q(i,t);return!0},ht=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},Ye=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),bs(t)}};function fs(s){this._$AN!==void 0?(ht(this),this._$AM=s,Ye(this)):this._$AM=s}function $s(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let a=e;a<i.length;a++)q(i[a],!1),ht(i[a]);else i!=null&&(q(i,!1),ht(i));else q(this,s)}var bs=s=>{s.type==2&&(s._$AP??=$s,s._$AQ??=fs)},tt=class extends M{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Ye(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(q(this,t),ht(this))}setValue(t){if(Ge(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var dt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},pt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var ut=class extends tt{constructor(){super(...arguments),this.dt=new dt(this),this.ft=new pt}render(t,e){return y}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:a,ft:o}=this;return(async(h,l)=>{for await(let m of h)if(await l(m)===!1)return})(e,async h=>{for(;o.get();)await o.get();let l=a.deref();if(l!==void 0){if(l.vt!==e)return!1;i!==void 0&&(h=i(h,r)),l.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ms=x(ut),ks=x(class extends ut{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&He(this.ht);let e=N(this.ht);D(e,s)}}),Ee=s=>ms(s)?s._$litType$.h:s.strings,Cs=x(class extends M{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=ve(this.bt)?Ee(this.bt):null,i=ve(t)?Ee(t):null;if(e!==null&&(i===null||e!==i)){let r=Nt(s).pop(),a=this.yt.get(e);if(a===void 0){let o=document.createDocumentFragment();a=Be(b,o),a.setConnected(!1),this.yt.set(e,a)}X(a,[r]),N(a,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let a=Nt(r).pop();He(s),N(s,void 0,a),X(s,[a])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Os=x(class extends M{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return y}}),As={},Ds=x(class extends M{constructor(){super(...arguments),this._t=As}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Rs=x(class extends M{constructor(){super(...arguments),this.key=b}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(X(s),this.key=t),e}}),Ns=x(class extends M{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ge(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===y||t===b)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return y;if(s.type===4){if(!!t===e.hasAttribute(i))return y;if(s.type===1&&e.getAttribute(i)===t+"")return y}}return X(s),t}});var Ot=new WeakMap,Ps=x(class extends tt{render(s){return b}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),b}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Ot.get(t);e===void 0&&(e=new WeakMap,Ot.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?Ot.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),xe=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},Is=x(class extends M{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],a=[],o=0;for(let h of s)r[o]=i?i(h,o):o,a[o]=e(h,o),o++;return{values:a,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Nt(s),{values:a,keys:o}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=o,a;let h=this.Ct??=[],l=[],m,f,p=0,$=r.length-1,g=0,_=a.length-1;for(;p<=$&&g<=_;)if(r[p]===null)p++;else if(r[$]===null)$--;else if(h[p]===o[g])l[g]=D(r[p],a[g]),p++,g++;else if(h[$]===o[_])l[_]=D(r[$],a[_]),$--,_--;else if(h[p]===o[_])l[_]=D(r[p],a[_]),N(s,l[_+1],r[p]),p++,_--;else if(h[$]===o[g])l[g]=D(r[$],a[g]),N(s,r[p],r[$]),$--,g++;else if(m===void 0&&(m=xe(o,g,_),f=xe(h,p,$)),m.has(h[p]))if(m.has(h[$])){let k=f.get(o[g]),Z=k!==void 0?r[k]:null;if(Z===null){let pe=N(s,r[p]);D(pe,a[g]),l[g]=pe}else l[g]=D(Z,a[g]),N(s,r[p],Z),r[k]=null;g++}else Ct(r[$]),$--;else Ct(r[p]),p++;for(;g<=_;){let k=N(s,l[_+1]);D(k,a[g]),l[g++]=k}for(;p<=$;){let k=r[p++];k!==null&&Ct(k)}return this.Ct=o,X(s,l),y}}),je="important",ys=" !"+je,Bs=x(class extends M{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let a=typeof r=="string"&&r.endsWith(ys);i.includes("-")||a?e.setProperty(i,a?r.slice(0,-11):r,a?je:""):e[i]=r}}return y}}),Gs=x(class extends M{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?y:(this.At=s,document.importNode(s.content,!0))}}),V=class extends M{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};V.directiveName="unsafeHTML",V.resultType=1;var ft=x(V);var et=class extends V{};et.directiveName="unsafeSVG",et.resultType=2;var Hs=x(et),Te=s=>!us(s)&&typeof s.then=="function",Ue=1073741823;var Pt=class extends tt{constructor(){super(...arguments),this.Mt=Ue,this.Ut=[],this.dt=new dt(this),this.ft=new pt}render(...t){return t.find(e=>!Te(e))??y}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let a=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let l=e[h];if(!Te(l))return this.Mt=h,l;h<r&&l===i[h]||(this.Mt=Ue,r=0,Promise.resolve(l).then(async m=>{for(;o.get();)await o.get();let f=a.deref();if(f!==void 0){let p=f.Ut.indexOf(l);p>-1&&p<f.Mt&&(f.Mt=p,f.setValue(m))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ys=x(Pt);var _s=Symbol.for(""),ws=s=>{if(s?.r===_s)return s?._$litStatic$};var Le=new Map,Ve=s=>(t,...e)=>{let i=e.length,r,a,o=[],h=[],l,m=0,f=!1;for(;m<i;){for(l=t[m];m<i&&(a=e[m],(r=ws(a))!==void 0);)l+=r+t[++m],f=!0;m!==i&&h.push(a),o.push(l),m++}if(m===i&&o.push(t[i]),f){let p=o.join("$$lit$$");(t=Le.get(p))===void 0&&(o.raw=o,Le.set(p,t=o)),e=h}return s(t,...e)},js=Ve(n),Vs=Ve(ls);var vs=/^\s*([a-zA-Z]+)\:/,Ss=/^\s*"([^\"]+?)"/,Es=/^\s*([^\s]+)/,z=class{static START="START";static RELATION="RELATION";static SUBQUERY="SUBQUERY";static END="END"},xs=class{state;lastState;constructor(){this.state=z.RELATION,this.lastState=z.START}parseRelation(s){let t=s.match(vs);if(!t)throw new SyntaxError(`failed while parsing relationship: ${s}, expected relation`);return[t[1],s.slice(t[0].length)]}parseSubquery(s){let t=s.match(Ss);if(t)return[t[1],s.slice(t[0].length)];let e=s.match(Es);if(e)return[e[1],s.slice(e[0].length)];throw new SyntaxError(`subquery: failed to parse query: ${s}, expected subquery`)}advanceState(s){this.lastState=this.state,this.state=s}tokenise(s){let t=s.trim(),e=[],i={};for(;t.length>0;){if(this.state===z.RELATION){let r=this.parseRelation(t);i.relation=r[0],t=r[1],this.advanceState(z.SUBQUERY);continue}if(this.state===z.SUBQUERY){let r=this.parseSubquery(t);i.subquery=r[0],t=r[1],e.push({...i}),t=r[1],this.advanceState(z.RELATION);continue}if(this.state===this.lastState)throw new SyntaxError(`failed to parse query: ${s}, expected relation`)}for(let r of e){if(!r.relation)throw new SyntaxError(`failed to parse query: ${s}, expected relation`);if(!r.subquery)throw new SyntaxError(`failed to parse query: ${s}, expected subquery`)}return e}},ze=class{content;comparators;constructor(s,t){this.content=s,this.comparators=t}*search(s){let e=new xs().tokenise(s);for(let i of this.content){let r=!0;for(let{relation:a,subquery:o}of e){if(!a||!o)continue;let h=this.comparators[a];if(!h)r=!1;else if(!r)continue;r=r&&h(i,o)}r&&(yield i)}}};var u=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var $t=Symbol("the albums manifest"),bt=Symbol("the images manifest"),li=Symbol("the site manifest"),At=Symbol("metadata about the site manifest"),yt=Symbol("the videos manifest"),_t=Symbol("the exif data"),wt=Symbol("the semantic data"),Ze=53.33306,Fe=-6.24889,We=6,qe="photos",c=class{static EAGER="eager";static LAZY="lazy"},d=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function Ts(s="/manifest/env.json"){return await(await fetch(s)).json()}var st=await Ts(),vt=class{_data;constructor(t=`/manifest/images.${st.publication_id}.json`){this.url=t}processImages(t){let e=t[0],i=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];i.push(a)}return i}async init(){if(window[bt]&&(this._data=window[bt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[bt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},St=class{_data;constructor(t=`/manifest/videos.${st.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],i=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];i.push(a)}return i}async init(){if(window[yt]&&(this._data=window[yt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[yt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Et=class{_data;constructor(t=`/manifest/albums.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];i.push(a)}return i}async init(){if(window[$t]&&(this._data=window[$t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[$t]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},xt=class{_data;constructor(t=`/manifest/exif.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];i.push(a)}return i}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[_t]=e,this._data=e}exif(){return this._data}};function Je(s,t,e){if(!s.hasOwnProperty(t))return!1;let i=s[t];if(i.includes(e))return!0;for(let r of i)if(Je(s,r,e))return!0;return!1}var Tt=class{_data;constructor(t=`/manifest/semantic.${st.publication_id}.json`){this.url=t}async init(){if(window[wt]&&(this._data=window[wt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[wt]=t,this._data=t}semantic(){return this._data}},Ut=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[At]&&(this._data=window[At]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[At]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Je(this._data,t,e)}childrenOf(t,e){let i=new Set([]);for(let r of e)this.isChild(t,r)&&i.add(r);return i}};var w=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Yt=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),n`
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
    `}};customElements.define("photo-sidebar",Yt);var jt=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=qe;return n`
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
    `}};customElements.define("photo-header",jt);var Vt=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return n`
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
    `}};customElements.define("app-photo",Vt);var zt=class extends u{render(){return n`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",zt);var I=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(i/r);return t>a*o+1?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Zt=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,i)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",Zt);var O=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let a=s.parse(r.created_at);a<e&&(e=a),a>i&&(i=a)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),a=e instanceof Date?e:new Date(parseFloat(e));if(i){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),l=a.toLocaleDateString("en-IE",o),m=r.toLocaleDateString("en-IE",{day:"numeric"}),f=a.toLocaleDateString("en-IE",{day:"numeric"}),p=r.toLocaleDateString("en-IE",{month:"short"}),$=a.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),_=a.getFullYear(),k=p===$,Z=g===_;return h===l?`${h} ${g}`:k&&Z?`${m} - ${f} ${$} ${g}`:`${h} ${g} - ${l} ${_}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),l=a.toLocaleDateString("en-IE",o);return h===l?h:`${h} \u2014 ${l}`}}};var Ft=class extends u{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return O.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),n`
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
    `}};customElements.define("photo-album",Ft);var Wt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(i/r);return t>a*o?"lazy":"eager"}render(){return performance.mark("start-albums-render"),n`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let i=this.loadingMode(e);return n`
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
    `}};customElements.define("photo-album-page",Wt);var qt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Ze,Fe],We);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let r=this.albums.albums();for(let a of Object.values(r)){let o=a.geolocation;o&&geoJSON(o,{style:function(){return{color:"red"}},onEachFeature:(h,l)=>{let m=`
            <section>
              <h3>${a.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${a.id}">
                  <img width="170" height="170" src="${a.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;l.bindPopup(m)}}).addTo(e)}}render(){return n`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",qt);var Jt=class extends u{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return n`
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
    `}};customElements.define("app-video",Jt);var Qt=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Qt);var Lt=class s{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){s.setXTheEverythingAppFormallyKnownAsTwitter(t),s.setOpenGraph(t)}};var Kt=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Lt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return console.log(this),this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=O.dateRange(this.minDate,this.maxDate,t.matches),i=this.albumPhotos().map((a,o)=>n`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${I.loadingMode(o)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_mosaic_url}"
        imageUrl="${a.full_image}"></app-photo>`),r=this.albumVideos().map((a,o)=>n`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`);return n`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${ft(this.description)}</p>
        <br>
        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
      </section>

      <section class="photo-container">
        ${i}
      </section>

      <section class="video-container">
        ${r}
      </section>
    </div>
    `}};customElements.define("album-page",Kt);var Xt=class extends u{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",Xt);var te=class extends u{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,i]=O.findRange(this.photos()),r=O.dateRange(e,i,t.matches);return n`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${r}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(a=>n`
        <app-photo
          id="${a.id}"
          tags="${a.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${a.thumbnail_url}"
          thumbnailDataUrl="${a.thumbnail_mosaic_url}"
          imageUrl="${a.full_image}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",te);var ee=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?n`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:n`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",ee);var se=class extends u{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return n`<div class="photo-album">
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
    </div>`}};customElements.define("tag-album",se);var ie=class extends u{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let i of e.tags)t[i]||(t[i]=0),t[i]++;return Object.entries(t).toSorted((e,i)=>e[0].localeCompare(i[0]))}renderTagLink(t){return n`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(i=>i.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),i=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return n`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_mosaic_url}" tagName=${t} .links=${i}>`}tagsFamily(t,e){let i=new Set(t._data[e].children);return Array.from(i).sort()}render(){return n`
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
    `}};customElements.define("tags-page",ie);var re=class extends u{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",re);var ae=class extends u{static properties={urn:{type:String}};get placeId(){let t=this.urn?.match(/^urn:ró:unesco:(\d+)$/);return t?t[1]:null}get url(){return this.placeId?`https://whc.unesco.org/en/list/${this.placeId}`:null}render(){return this.placeId?n`
      <a class="unesco-link" href="${this.url}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.placeId}</span>
        <span class="unesco-text-short">UNESCO #${this.placeId}</span>
      </a>
    `:n`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",ae);var oe=class extends u{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?n`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?n`<td>Manual aperture control</td>`:n`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?n`${this.exif.focal_length}`:this.exif.focal_length==="0"?n`<td>Manual lens</td>`:n`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?n`<em>${e}</em>`:e.startsWith("urn:r\xF3:unesco")?n`<unesco-link .urn="${e}"></unesco-link>`:e}renderSemanticData(t){return n`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>n`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,i=this.semantic;return n`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?n`<br/><p>${ft(t.description)}</p>`:n``}

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
    `}};customElements.define("metadata-page",oe);var ne=class extends u{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.created_at)return!1;let[e]=t.created_at.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,i)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return n`
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
    `}};customElements.define("date-page",ne);var le=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
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
    `}};customElements.define("about-page",le);var Mt=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(i/r),h=t>a*o+1;return t===0?"auto":"none"}};var ce=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,i)=>n`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Mt.loadingMode(i)}"
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
    `}};customElements.define("videos-page",ce);var S=new Et,v=new vt,E=new St,T=new Ut,U=new xt,L=new Tt,Us=[[S,c.EAGER],[v,c.EAGER],[E,c.EAGER],[T,c.EAGER],[U,c.EAGER],[L,c.EAGER]],Ls={[d.ABOUT]:[[S,c.LAZY],[v,c.LAZY],[E,c.LAZY],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.ALBUMS]:[[S,c.EAGER],[v,c.LAZY],[E,c.LAZY],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.PHOTOS]:[[S,c.EAGER],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.VIDEOS]:[[S,c.LAZY],[v,c.LAZY],[E,c.EAGER],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.ALBUM]:[[S,c.EAGER],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.PHOTO]:[[S,c.EAGER],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.EAGER],[L,c.EAGER]],[d.DATE]:[[S,c.EAGER],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.LAZY],[L,c.LAZY]],[d.TAG_ALBUM]:[[S,c.LAZY],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.EAGER],[L,c.EAGER]],[d.TAG]:[[S,c.LAZY],[v,c.EAGER],[E,c.EAGER],[T,c.LAZY],[U,c.EAGER],[L,c.EAGER]],[d.LOCATIONS]:[[S,c.EAGER],[v,c.LAZY],[E,c.LAZY],[T,c.LAZY],[U,c.EAGER],[L,c.EAGER]],[d.METADATA]:[[S,c.LAZY],[v,c.EAGER],[E,c.EAGER],[T,c.EAGER],[U,c.EAGER],[L,c.EAGER]],[d.STATS]:[[S,c.LAZY],[v,c.LAZY],[E,c.LAZY],[T,c.LAZY],[U,c.EAGER],[L,c.EAGER]]},he=class{static async init(){let t=w.getUrl();console.log(`loading ${t?.type}`);let e=Ls[t?.type]??Us,i=[];for(let[r,a]of e)a===c.EAGER?i.push(r.init()):a===c.LAZY&&r.init();await Promise.all(i)}};await he.init();var de=class s extends u{static DEFAULT_PAGE=d.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:d.ALBUM,albums:d.ALBUMS,photos:d.PHOTOS,date:d.DATE,"tag-album":d.TAG_ALBUM,tags:d.TAGS,locations:d.LOCATIONS,stats:d.STATS,metadata:d.METADATA,about:d.ABOUT,videos:d.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=w.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),this.page===d.METADATA||this.page===d.ALBUM||this.page===d.METADATA?this.id=t.id:this.page===d.TAG_ALBUM?this.tag=t.tag:this.page===d.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=d.PHOTOS,this.id=i,this.title=e,w.showAlbumUrl(i)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=d.TAG_ALBUM,this.tag=e,w.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r,tags:a}=t.detail;this.page=d.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,this.tags=a??[],w.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===d.ABOUT?w.showAboutUrl():this.page===d.PHOTOS?w.showPhotosUrl():this.page===d.ALBUMS?w.showAlbumsUrl():this.page===d.TAGS?w.showTagsUrl():this.page===d.LOCATIONS?w.showLocationsUrl():this.page===d.STATS?w.showStatsUrl():this.page===d.PHOTOS?w.showAlbumUrl(this.id):this.page===d.METADATA?w.showMetadataUrl(this.id):this.page===d.DATE?w.showDateUrl(this.date):this.page===d.VIDEOS?w.showVideosUrl():w.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return n`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===d.ABOUT)return n`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===d.PHOTOS)return n`<photos-page class="${e.join(" ")}" .images=${v}></photos-page>`;if(this.page===d.ALBUM){this.id||console.error("no album id provided");let i=S.albums().find(r=>r.id===this.id);return i||console.error(`failed to find album with id ${this.id}`),n`
      <album-page
        .images=${v}
        .videos=${E}
        title=${i.album_name}
        id=${this.id}
        minDate=${i.min_date}
        maxDate=${i.max_date}
        imageCount=${i.photos_count}
        description=${i.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===d.DATE)return console.log(this.date),n`<date-page
        .images=${v} date="${this.date}"
        ></date-page>`;if(this.page===d.TAG_ALBUM)return n`
      <tag-page tag=${this.tag} .images=${v} class="${e.join(" ")}"></tag-page>
      `;if(this.page===d.TAGS)return n`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${v}></tags-page>
      `;if(this.page===d.LOCATIONS)return n`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===d.STATS)return n`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page===d.METADATA){let i=v.images().find(h=>h.id===this.id),r=U.exif().find(h=>h.id===this.id),a=L.semantic().filter(h=>h[0]===this.id),o={};for(let[h,l,m]of a)o[l]?typeof o[l]=="string"&&(o[l]=[o[l],m]):o[l]=m;return i||console.error(`failed to find photo with id ${this.id}`),n`
      <metadata-page .image=${i} .semantic=${o} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===d.VIDEOS)return n`
      <videos-page .videos=${E} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,i=["photos-app"];this.darkMode?(e.classList.add("dark-mode"),i.push("dark-mode")):e.classList=[];let r=new ze;return n`
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
