var tt=globalThis,Dt=tt.ShadowRoot&&(tt.ShadyCSS===void 0||tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),le=new WeakMap,kt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Dt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=le.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&le.set(e,t))}return t}toString(){return this.cssText}},Ve=i=>new kt(typeof i=="string"?i:i+"",void 0,Ee);var Fe=(i,t)=>{if(Dt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=tt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},he=Dt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ve(e)})(i):i,{is:Ze,defineProperty:We,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Je,getOwnPropertySymbols:Ke,getPrototypeOf:Xe}=Object,dt=globalThis,ce=dt.trustedTypes,Qe=ce?ce.emptyScript:"",ts=dt.reactiveElementPolyfillSupport,F=(i,t)=>i,Mt={toAttribute(i,t){switch(t){case Boolean:i=i?Qe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},xe=(i,t)=>!Ze(i,t),de={attribute:!0,type:String,converter:Mt,reflect:!1,hasChanged:xe};Symbol.metadata??=Symbol("metadata"),dt.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=de){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&We(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:o}=qe(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return r?.call(this)},set(a){let d=r?.call(this);o.call(this,a),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??de}static o(){if(this.hasOwnProperty(F("elementProperties")))return;let t=Xe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(F("properties"))){let e=this.properties,s=[...Je(e),...Ke(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(he(r))}else t!==void 0&&e.push(he(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:Mt).toAttribute(e,s.type);this.m=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let o=s.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Mt;this.m=r,this[r]=a.fromAttribute(e,o.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??xe)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,o]of this.v)this[r]=o;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],o)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[F("elementProperties")]=new Map,D[F("finalized")]=new Map,ts?.({ReactiveElement:D}),(dt.reactiveElementVersions??=[]).push("2.0.4");var Pt=globalThis,et=Pt.trustedTypes,pe=et?et.createPolicy("lit-html",{createHTML:i=>i}):void 0,Nt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Rt="?"+M,es=`<${Rt}>`,j=document,W=()=>j.createComment(""),q=i=>i===null||typeof i!="object"&&typeof i!="function",Te=Array.isArray,Ue=i=>Te(i)||typeof i?.[Symbol.iterator]=="function",Tt=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,me=/>/g,I=RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ge=/'/g,fe=/"/g,Le=/^(?:script|style|textarea|title)$/i,ke=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),n=ke(1),ss=ke(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),$e=new WeakMap,B=j.createTreeWalker(j,129);function Me(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pe!==void 0?pe.createHTML(t):t}var Ce=(i,t)=>{let e=i.length-1,s=[],r,o=t===2?"<svg>":"",a=V;for(let d=0;d<e;d++){let l=i[d],m,f,p=-1,$=0;for(;$<l.length&&(a.lastIndex=$,f=a.exec(l),f!==null);)$=a.lastIndex,a===V?f[1]==="!--"?a=ue:f[1]!==void 0?a=me:f[2]!==void 0?(Le.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=I):f[3]!==void 0&&(a=I):a===I?f[0]===">"?(a=r??V,p=-1):f[1]===void 0?p=-2:(p=a.lastIndex-f[2].length,m=f[1],a=f[3]===void 0?I:f[3]==='"'?fe:ge):a===fe||a===ge?a=I:a===ue||a===me?a=V:(a=I,r=void 0);let g=a===I&&i[d+1].startsWith("/>")?" ":"";o+=a===V?l+es:p>=0?(s.push(m),l.slice(0,p)+Nt+l.slice(p)+M+g):l+M+(p===-2?d:g)}return[Me(i,o+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},J=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,a=0,d=t.length-1,l=this.parts,[m,f]=Ce(t,e);if(this.el=i.createElement(m,s),B.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=B.nextNode())!==null&&l.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Nt)){let $=f[a++],g=r.getAttribute(p).split(M),_=/([.?@])?(.*)/.exec($);l.push({type:1,index:o,name:_[2],strings:g,ctor:_[1]==="."?it:_[1]==="?"?rt:_[1]==="@"?ot:G}),r.removeAttribute(p)}else p.startsWith(M)&&(l.push({type:6,index:o}),r.removeAttribute(p));if(Le.test(r.tagName)){let p=r.textContent.split(M),$=p.length-1;if($>0){r.textContent=et?et.emptyScript:"";for(let g=0;g<$;g++)r.append(p[g],W()),B.nextNode(),l.push({type:2,index:++o});r.append(p[$],W())}}}else if(r.nodeType===8)if(r.data===Rt)l.push({type:2,index:o});else{let p=-1;for(;(p=r.data.indexOf(M,p+1))!==-1;)l.push({type:7,index:o}),p+=M.length-1}o++}}static createElement(t,e){let s=j.createElement("template");return s.innerHTML=t,s}};function H(i,t,e=i,s){if(t===y)return t;let r=s!==void 0?e.U?.[s]:e.N,o=q(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=H(i,r._$AS(i,t.values),r,s)),t}var st=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??j).importNode(e,!0);B.currentNode=r;let o=B.nextNode(),a=0,d=0,l=s[0];for(;l!==void 0;){if(a===l.index){let m;l.type===2?m=new pt(o,o.nextSibling,this,t):l.type===1?m=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(m=new at(o,this,t)),this._$AV.push(m),l=s[++d]}a!==l?.index&&(o=B.nextNode(),a++)}return B.currentNode=j,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},pt=class Oe{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),q(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Ue(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&q(this._$AH)?this._$AA.nextSibling.data=t:this.j(j.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=J.createElement(Me(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let o=new st(r,this),a=o.O(this.options);o.R(e),this.j(a),this._$AH=o}}_$AC(t){let e=$e.get(t.strings);return e===void 0&&$e.set(t.strings,e=new J(t)),e}D(t){Te(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let o of t)r===e.length?e.push(s=new Oe(this.H(W()),this.H(W()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,r){let o=this.strings,a=!1;if(o===void 0)t=H(this,t,e,0),a=!q(t)||t!==this._$AH&&t!==y,a&&(this._$AH=t);else{let d=t,l,m;for(t=o[0],l=0;l<o.length-1;l++)m=H(this,d[s+l],e,l),m===y&&(m=this._$AH[l]),a||=!q(m)||m!==this._$AH[l],m===b?t=b:t!==b&&(t+=(m??"")+o[l+1]),this._$AH[l]=m}a&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},it=class extends G{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},rt=class extends G{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},ot=class extends G{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=H(this,t,e,0)??b)===y)return;let s=this._$AH,r=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==b&&(s===b||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}},is={W:Nt,q:M,J:Rt,Z:1,F:Ce,G:st,K:Ue,X:H,Y:pt,tt:G,st:rt,it:ot,et:it,ot:at},rs=Pt.litHtmlPolyfillSupport;rs?.(J,pt),(Pt.litHtmlVersions??=[]).push("3.1.3");var De=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let o=e?.renderBefore??null;s._$litPart$=r=new pt(t.insertBefore(W(),o),o,void 0,e??{})}return r._$AI(i),r};var N=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};N._$litElement$=!0,N.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:N});var os=globalThis.litElementPolyfillSupport;os?.({LitElement:N});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:as}=is,ns=i=>i===null||typeof i!="object"&&typeof i!="function";var be=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,ls=i=>i?._$litType$?.h!=null;var Pe=i=>i.strings===void 0,Ae=()=>document.createComment(""),P=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let o=s.insertBefore(Ae(),r),a=s.insertBefore(Ae(),r);e=new as(o,a,i,i.options)}else{let o=e._$AB.nextSibling,a=e._$AM,d=a!==i;if(d){let l;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(l=i._$AU)!==a._$AU&&e._$AP(l)}if(o!==r||d){let l=e._$AA;for(;l!==o;){let m=l.nextSibling;s.insertBefore(l,r),l=m}}}return e},O=(i,t,e=i)=>(i._$AI(t,e),i),hs={},K=(i,t=hs)=>i._$AH=t,Ct=i=>i._$AH,Ut=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Ne=i=>{i._$AR()};var x=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Z=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),Z(s,t);return!0},nt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Re=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ps(t)}};function cs(i){this._$AN!==void 0?(nt(this),this._$AM=i,Re(this)):this._$AM=i}function ds(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let o=e;o<s.length;o++)Z(s[o],!1),nt(s[o]);else s!=null&&(Z(s,!1),nt(s));else Z(this,i)}var ps=i=>{i.type==2&&(i._$AP??=ds,i._$AQ??=cs)},X=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Re(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Z(this,t),nt(this))}setValue(t){if(Pe(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var lt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},ht=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var ct=class extends X{constructor(){super(...arguments),this.dt=new lt(this),this.ft=new ht}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:o,ft:a}=this;return(async(d,l)=>{for await(let m of d)if(await l(m)===!1)return})(e,async d=>{for(;a.get();)await a.get();let l=o.deref();if(l!==void 0){if(l.vt!==e)return!1;s!==void 0&&(d=s(d,r)),l.commitValue(d,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ys=x(ct),_s=x(class extends ct{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Ne(this.ht);let e=P(this.ht);O(e,i)}}),ye=i=>ls(i)?i._$litType$.h:i.strings,vs=x(class extends L{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=be(this.bt)?ye(this.bt):null,s=be(t)?ye(t):null;if(e!==null&&(s===null||e!==s)){let r=Ct(i).pop(),o=this.yt.get(e);if(o===void 0){let a=document.createDocumentFragment();o=De(b,a),o.setConnected(!1),this.yt.set(e,o)}K(o,[r]),P(o,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let o=Ct(r).pop();Ne(i),P(i,void 0,o),K(i,[o])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var ws=x(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return y}}),us={},Ss=x(class extends L{constructor(){super(...arguments),this._t=us}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Es=x(class extends L{constructor(){super(...arguments),this.key=b}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(K(i),this.key=t),e}}),xs=x(class extends L{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pe(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===y||t===b)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return y;if(i.type===4){if(!!t===e.hasAttribute(s))return y;if(i.type===1&&e.getAttribute(s)===t+"")return y}}return K(i),t}});var Lt=new WeakMap,Ts=x(class extends X{render(i){return b}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),b}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Lt.get(t);e===void 0&&(e=new WeakMap,Lt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Lt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),_e=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Us=x(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],o=[],a=0;for(let d of i)r[a]=s?s(d,a):a,o[a]=e(d,a),a++;return{values:o,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Ct(i),{values:o,keys:a}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=a,o;let d=this.Ct??=[],l=[],m,f,p=0,$=r.length-1,g=0,_=o.length-1;for(;p<=$&&g<=_;)if(r[p]===null)p++;else if(r[$]===null)$--;else if(d[p]===a[g])l[g]=O(r[p],o[g]),p++,g++;else if(d[$]===a[_])l[_]=O(r[$],o[_]),$--,_--;else if(d[p]===a[_])l[_]=O(r[p],o[_]),P(i,l[_+1],r[p]),p++,_--;else if(d[$]===a[g])l[g]=O(r[$],o[g]),P(i,r[p],r[$]),$--,g++;else if(m===void 0&&(m=_e(a,g,_),f=_e(d,p,$)),m.has(d[p]))if(m.has(d[$])){let k=f.get(a[g]),z=k!==void 0?r[k]:null;if(z===null){let ne=P(i,r[p]);O(ne,o[g]),l[g]=ne}else l[g]=O(z,o[g]),P(i,r[p],z),r[k]=null;g++}else Ut(r[$]),$--;else Ut(r[p]),p++;for(;g<=_;){let k=P(i,l[_+1]);O(k,o[g]),l[g++]=k}for(;p<=$;){let k=r[p++];k!==null&&Ut(k)}return this.Ct=a,K(i,l),y}}),Ie="important",ms=" !"+Ie,Ls=x(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let o=typeof r=="string"&&r.endsWith(ms);s.includes("-")||o?e.setProperty(s,o?r.slice(0,-11):r,o?Ie:""):e[s]=r}}return y}}),ks=x(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?y:(this.At=i,document.importNode(i.content,!0))}}),Y=class extends L{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Y.directiveName="unsafeHTML",Y.resultType=1;var ut=x(Y);var Q=class extends Y{};Q.directiveName="unsafeSVG",Q.resultType=2;var Ms=x(Q),ve=i=>!ns(i)&&typeof i.then=="function",we=1073741823;var Ot=class extends X{constructor(){super(...arguments),this.Mt=we,this.Ut=[],this.dt=new lt(this),this.ft=new ht}render(...t){return t.find(e=>!ve(e))??y}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let o=this.dt,a=this.ft;this.isConnected||this.disconnected();for(let d=0;d<e.length&&!(d>this.Mt);d++){let l=e[d];if(!ve(l))return this.Mt=d,l;d<r&&l===s[d]||(this.Mt=we,r=0,Promise.resolve(l).then(async m=>{for(;a.get();)await a.get();let f=o.deref();if(f!==void 0){let p=f.Ut.indexOf(l);p>-1&&p<f.Mt&&(f.Mt=p,f.setValue(m))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Cs=x(Ot);var gs=Symbol.for(""),fs=i=>{if(i?.r===gs)return i?._$litStatic$};var Se=new Map,Be=i=>(t,...e)=>{let s=e.length,r,o,a=[],d=[],l,m=0,f=!1;for(;m<s;){for(l=t[m];m<s&&(o=e[m],(r=fs(o))!==void 0);)l+=r+t[++m],f=!0;m!==s&&d.push(o),a.push(l),m++}if(m===s&&a.push(t[s]),f){let p=a.join("$$lit$$");(t=Se.get(p))===void 0&&(a.raw=a,Se.set(p,t=a)),e=d}return i(t,...e)},Os=Be(n),Ds=Be(ss);var u=class extends N{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var mt=Symbol("the albums manifest"),gt=Symbol("the images manifest"),Ws=Symbol("the site manifest"),ft=Symbol("metadata about the site manifest"),$t=Symbol("the videos manifest"),bt=Symbol("the exif data"),je=53.33306,He=-6.24889,Ge=6,Ye="photos",h=class{static EAGER="eager";static LAZY="lazy"},c=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function $s(i="/manifest/env.json"){return await(await fetch(i)).json()}var St=await $s(),At=class{_data;constructor(t=`/manifest/images.${St.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[gt]&&(this._data=window[gt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[gt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},yt=class{_data;constructor(t=`/manifest/videos.${St.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[$t]&&(this._data=window[$t]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[$t]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},_t=class{_data;constructor(t=`/manifest/albums.${St.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[mt]&&(this._data=window[mt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[mt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},vt=class{_data;constructor(t=`/manifest/exif.${St.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];s.push(o)}return s}async init(){if(window[bt]&&(this._data=window[bt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[bt]=e,this._data=e}exif(){return this._data}};function ze(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let r of s)if(ze(i,r,e))return!0;return!1}var wt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[ft]&&(this._data=window[ft]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[ft]=t,this._data=t}metadata(){return this._data}isChild(t,e){return ze(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let r of e)this.isChild(t,r)&&s.add(r);return s}};var v=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var It=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),n`
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
    `}};customElements.define("photo-sidebar",It);var Bt=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/feed.json"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Ye;return n`
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
    `}};customElements.define("photo-header",Bt);var jt=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return n`
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
    `}};customElements.define("app-photo",jt);var Ht=class extends u{render(){return n`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Ht);var R=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r);return t>o*a+1?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/feed.json";t.href=e}};var Gt=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${R.loadingMode(s)}"
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
    `}};customElements.define("photos-page",Gt);var C=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let o=i.parse(r.created_at);o<e&&(e=o),o>s&&(s=o)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),o=e instanceof Date?e:new Date(parseFloat(e));if(s){let a={day:"numeric",month:"short"},d=r.toLocaleDateString("en-IE",a),l=o.toLocaleDateString("en-IE",a),m=r.toLocaleDateString("en-IE",{day:"numeric"}),f=o.toLocaleDateString("en-IE",{day:"numeric"}),p=r.toLocaleDateString("en-IE",{month:"short"}),$=o.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),_=o.getFullYear(),k=p===$,z=g===_;return d===l?`${d} ${g}`:k&&z?`${m} - ${f} ${$} ${g}`:`${d} ${g} - ${l} ${_}`}else{let a={year:"numeric",month:"short",day:"numeric"},d=r.toLocaleDateString("en-IE",a),l=o.toLocaleDateString("en-IE",a);return d===l?d:`${d} \u2014 ${l}`}}};var Yt=class extends u{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return C.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),n`
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
    `}};customElements.define("photo-album",Yt);var zt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r);return t>o*a?"lazy":"eager"}render(){return performance.mark("start-albums-render"),n`
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
    `}};customElements.define("photo-album-page",zt);var Vt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([je,He],Ge);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let r=this.albums.albums();for(let o of Object.values(r)){let a=o.geolocation;a&&geoJSON(a,{style:function(){return{color:"red"}},onEachFeature:(d,l)=>{let m=`
            <section>
              <h3>${o.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${o.id}">
                  <img width="170" height="170" src="${o.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;l.bindPopup(m)}}).addTo(e)}}render(){return n`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",Vt);var Ft=class extends u{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return n`
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
    `}};customElements.define("app-video",Ft);var Zt=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Zt);var Et=class i{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setXTheEverythingAppFormallyKnownAsTwitter(t),i.setOpenGraph(t)}};var Wt=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Et.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return console.log(this),this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=C.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos().map((o,a)=>n`
      <app-photo
        id=${o.id}
        tags="${o.tags}"
        loading="${R.loadingMode(a)}"
        thumbnailUrl="${o.thumbnail_url}"
        thumbnailDataUrl="${o.thumbnail_mosaic_url}"
        imageUrl="${o.full_image}"></app-photo>`),r=this.albumVideos().map((o,a)=>n`<app-video
        id=${o.id}
        url_poster=${o.poster_url}
        url_unscaled=${o.video_url_unscaled}
        url_1080p=${o.video_url_1080p}
        url_720p=${o.video_url_720p}
        url_480p=${o.video_url_480p}
        ></app-video>`);return n`
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

      <section class="video-container">
        ${r}
      </section>
    </div>
    `}};customElements.define("album-page",Wt);var qt=class extends u{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",qt);var Jt=class extends u{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=C.findRange(this.photos()),r=C.dateRange(e,s,t.matches);return n`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${r}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(o=>n`
        <app-photo
          id="${o.id}"
          tags="${o.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${o.thumbnail_url}"
          thumbnailDataUrl="${o.thumbnail_mosaic_url}"
          imageUrl="${o.full_image}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",Jt);var Kt=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?n`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:n`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",Kt);var Xt=class extends u{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return n`<div class="photo-album">
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
    </div>`}};customElements.define("tag-album",Xt);var Qt=class extends u{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return n`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return n`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_mosaic_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return n`
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
    `}};customElements.define("tags-page",Qt);var te=class extends u{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?n`<button class="photo-share-button" disabled>[sharing...]</button>`:n`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",te);var ee=class extends u{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?n`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?n`<td>Manual aperture control</td>`:n`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?n`${this.exif.focal_length}`:this.exif.focal_length==="0"?n`<td>Manual lens</td>`:n`<td>${this.exif.focal_length}mm equiv.</td>`}render(){let t=this.image,e=this.exif,s=(t.tags.sort()??[]).filter(r=>r!=="Published"&&!r.includes("\u2B50")).sort().map(r=>n`<li><tag-link tagName="${r}"></tag-link></li>`);return n`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?n`<br/><p>${ut(t.description)}</p>`:n``}

      <h3>Rating</h3>
      <p>${t.rating??"unrated"}</p>

      <h3>Photo Subject</h3>
      <p>${t.subject??""}</p>

      <h3>Tags</h3>
      <ul class="photo-tag-list">${s}</ul>

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
    `}};customElements.define("metadata-page",ee);var se=class extends u{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.created_at)return!1;let[e]=t.created_at.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>n`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${R.loadingMode(s)}"
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
    `}};customElements.define("date-page",se);var ie=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return n`
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
    `}};customElements.define("about-page",ie);var xt=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(s/r),d=t>o*a+1;return t===0?"auto":"none"}};var re=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,s)=>n`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${xt.loadingMode(s)}"
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
    `}};customElements.define("videos-page",re);var S=new _t,w=new At,E=new yt,T=new wt,U=new vt,bs=[[S,h.EAGER],[w,h.EAGER],[E,h.EAGER],[T,h.EAGER],[U,h.EAGER]],As={[c.ABOUT]:[[S,h.LAZY],[w,h.LAZY],[E,h.LAZY],[T,h.LAZY],[U,h.LAZY]],[c.ALBUMS]:[[S,h.EAGER],[w,h.LAZY],[E,h.LAZY],[T,h.LAZY],[U,h.LAZY]],[c.PHOTOS]:[[S,h.EAGER],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.LAZY]],[c.VIDEOS]:[[S,h.LAZY],[w,h.LAZY],[E,h.EAGER],[T,h.LAZY],[U,h.LAZY]],[c.ALBUM]:[[S,h.EAGER],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.LAZY]],[c.PHOTO]:[[S,h.EAGER],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.EAGER]],[c.DATE]:[[S,h.EAGER],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.LAZY]],[c.TAG_ALBUM]:[[S,h.LAZY],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.EAGER]],[c.TAG]:[[S,h.LAZY],[w,h.EAGER],[E,h.EAGER],[T,h.LAZY],[U,h.EAGER]],[c.LOCATIONS]:[[S,h.EAGER],[w,h.LAZY],[E,h.LAZY],[T,h.LAZY],[U,h.EAGER]],[c.METADATA]:[[S,h.LAZY],[w,h.EAGER],[E,h.EAGER],[T,h.EAGER],[U,h.EAGER]],[c.STATS]:[[S,h.LAZY],[w,h.LAZY],[E,h.LAZY],[T,h.LAZY],[U,h.EAGER]]},oe=class{static async init(){let t=v.getUrl();console.log(`loading ${t?.type}`);let e=As[t?.type]??bs,s=[];for(let[r,o]of e)o===h.EAGER?s.push(r.init()):o===h.LAZY&&r.init();await Promise.all(s)}};await oe.init();var ae=class i extends u{static DEFAULT_PAGE=c.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:c.ALBUM,albums:c.ALBUMS,photos:c.PHOTOS,date:c.DATE,"tag-album":c.TAG_ALBUM,tags:c.TAGS,locations:c.LOCATIONS,stats:c.STATS,metadata:c.METADATA,about:c.ABOUT,videos:c.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=v.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===c.METADATA||this.page===c.ALBUM||this.page===c.METADATA?this.id=t.id:this.page===c.TAG_ALBUM?this.tag=t.tag:this.page===c.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=c.PHOTOS,this.id=s,this.title=e,v.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=c.TAG_ALBUM,this.tag=e,v.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r,tags:o}=t.detail;this.page=c.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,this.tags=o??[],v.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===c.ABOUT?v.showAboutUrl():this.page===c.PHOTOS?v.showPhotosUrl():this.page===c.ALBUMS?v.showAlbumsUrl():this.page===c.TAGS?v.showTagsUrl():this.page===c.LOCATIONS?v.showLocationsUrl():this.page===c.STATS?v.showStatsUrl():this.page===c.PHOTOS?v.showAlbumUrl(this.id):this.page===c.METADATA?v.showMetadataUrl(this.id):this.page===c.DATE?v.showDateUrl(this.date):this.page===c.VIDEOS?v.showVideosUrl():v.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return n`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===c.ABOUT)return n`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===c.PHOTOS)return n`<photos-page class="${e.join(" ")}" .images=${w}></photos-page>`;if(this.page===c.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),n`
      <album-page
        .images=${w}
        .videos=${E}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===c.DATE)return console.log(this.date),n`<date-page
        .images=${w} date="${this.date}"
        ></date-page>`;if(this.page===c.TAG_ALBUM)return n`
      <tag-page tag=${this.tag} .images=${w} class="${e.join(" ")}"></tag-page>
      `;if(this.page===c.TAGS)return n`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${w}></tags-page>
      `;if(this.page===c.LOCATIONS)return n`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===c.STATS)return n`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page===c.METADATA){let s=w.images().find(o=>o.id===this.id),r=U.exif().find(o=>o.id===this.id);return s||console.error(`failed to find photo with id ${this.id}`),n`
      <metadata-page .image=${s} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
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
    `}};customElements.define("photo-app",ae);export{bs as DEFAULT_DEPENDENCIES,As as PAGE_DEPENDECIES,ae as PhotoApp};
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
