var nt=globalThis,Bt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),ce=new WeakMap,Rt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Bt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ce.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(e,t))}return t}toString(){return this.cssText}},Ve=i=>new Rt(typeof i=="string"?i:i+"",void 0,Ue);var ze=(i,t)=>{if(Bt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=nt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},de=Bt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ve(e)})(i):i,{is:Ze,defineProperty:Fe,getOwnPropertyDescriptor:We,getOwnPropertyNames:qe,getOwnPropertySymbols:Qe,getPrototypeOf:Je}=Object,gt=globalThis,ue=gt.trustedTypes,Ke=ue?ue.emptyScript:"",Xe=gt.reactiveElementPolyfillSupport,q=(i,t)=>i,Nt={toAttribute(i,t){switch(t){case Boolean:i=i?Ke:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Te=(i,t)=>!Ze(i,t),pe={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:Te};Symbol.metadata??=Symbol("metadata"),gt.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=pe){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Fe(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=We(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);n.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pe}static o(){if(this.hasOwnProperty(q("elementProperties")))return;let t=Je(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(q("properties"))){let e=this.properties,s=[...qe(e),...Qe(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(de(r))}else t!==void 0&&e.push(de(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ze(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Nt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Nt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Te)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[q("elementProperties")]=new Map,N[q("finalized")]=new Map,Xe?.({ReactiveElement:N}),(gt.reactiveElementVersions??=[]).push("2.0.4");var Ht=globalThis,ot=Ht.trustedTypes,me=ot?ot.createPolicy("lit-html",{createHTML:i=>i}):void 0,jt="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,Yt="?"+k,ts=`<${Yt}>`,j=document,J=()=>j.createComment(""),K=i=>i===null||typeof i!="object"&&typeof i!="function",Me=Array.isArray,Oe=i=>Me(i)||typeof i?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ge=/>/g,B=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,be=/"/g,Le=/^(?:script|style|textarea|title)$/i,Ce=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Ce(1),es=Ce(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ye=new WeakMap,H=j.createTreeWalker(j,129);function ke(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(t):t}var Pe=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=W;for(let h=0;h<e;h++){let a=i[h],u,g,d=-1,$=0;for(;$<a.length&&(o.lastIndex=$,g=o.exec(a),g!==null);)$=o.lastIndex,o===W?g[1]==="!--"?o=fe:g[1]!==void 0?o=ge:g[2]!==void 0?(Le.test(g[2])&&(r=RegExp("</"+g[2],"g")),o=B):g[3]!==void 0&&(o=B):o===B?g[0]===">"?(o=r??W,d=-1):g[1]===void 0?d=-2:(d=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?B:g[3]==='"'?be:$e):o===be||o===$e?o=B:o===fe||o===ge?o=W:(o=B,r=void 0);let f=o===B&&i[h+1].startsWith("/>")?" ":"";n+=o===W?a+ts:d>=0?(s.push(u),a.slice(0,d)+jt+a.slice(d)+k+f):a+k+(d===-2?h:f)}return[ke(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},X=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[u,g]=Pe(t,e);if(this.el=i.createElement(u,s),H.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=H.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(jt)){let $=g[o++],f=r.getAttribute(d).split(k),A=/([.?@])?(.*)/.exec($);a.push({type:1,index:n,name:A[2],strings:f,ctor:A[1]==="."?lt:A[1]==="?"?ht:A[1]==="@"?ct:G}),r.removeAttribute(d)}else d.startsWith(k)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(Le.test(r.tagName)){let d=r.textContent.split(k),$=d.length-1;if($>0){r.textContent=ot?ot.emptyScript:"";for(let f=0;f<$;f++)r.append(d[f],J()),H.nextNode(),a.push({type:2,index:++n});r.append(d[$],J())}}}else if(r.nodeType===8)if(r.data===Yt)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(k,d+1))!==-1;)a.push({type:7,index:n}),d+=k.length-1}n++}}static createElement(t,e){let s=j.createElement("template");return s.innerHTML=t,s}};function Y(i,t,e=i,s){if(t===y)return t;let r=s!==void 0?e.U?.[s]:e.N,n=K(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=Y(i,r._$AS(i,t.values),r,s)),t}var at=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??j).importNode(e,!0);H.currentNode=r;let n=H.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new $t(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new dt(n,this,t)),this._$AV.push(u),a=s[++h]}o!==a?.index&&(n=H.nextNode(),o++)}return H.currentNode=j,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},$t=class Re{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),K(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Oe(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&K(this._$AH)?this._$AA.nextSibling.data=t:this.j(j.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=X.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new at(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=ye.get(t.strings);return e===void 0&&ye.set(t.strings,e=new X(t)),e}D(t){Me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Re(this.H(J()),this.H(J()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=Y(this,t,e,0),o=!K(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{let h=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=Y(this,h[s+a],e,a),u===y&&(u=this._$AH[a]),o||=!K(u)||u!==this._$AH[a],u===b?t=b:t!==b&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},lt=class extends G{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},ht=class extends G{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},ct=class extends G{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??b)===y)return;let s=this._$AH,r=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}},ss={W:jt,q:k,J:Yt,Z:1,F:Pe,G:at,K:Oe,X:Y,Y:$t,tt:G,st:ht,it:ct,et:lt,ot:dt},is=Ht.litHtmlPolyfillSupport;is?.(X,$t),(Ht.litHtmlVersions??=[]).push("3.1.3");var Ne=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new $t(t.insertBefore(J(),n),n,void 0,e??{})}return r._$AI(i),r};var I=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};I._$litElement$=!0,I.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:I});var rs=globalThis.litElementPolyfillSupport;rs?.({LitElement:I});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ns}=ss,os=i=>i===null||typeof i!="object"&&typeof i!="function";var Ae=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,as=i=>i?._$litType$?.h!=null;var De=i=>i.strings===void 0,_e=()=>document.createComment(""),D=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(_e(),r),o=s.insertBefore(_e(),r);e=new ns(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let u=a.nextSibling;s.insertBefore(a,r),a=u}}}return e},R=(i,t,e=i)=>(i._$AI(t,e),i),ls={},tt=(i,t=ls)=>i._$AH=t,Dt=i=>i._$AH,kt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Ie=i=>{i._$AR()};var w=i=>(...t)=>({_$litDirective$:i,values:t}),E=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Q=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),Q(s,t);return!0},ut=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Be=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ds(t)}};function hs(i){this._$AN!==void 0?(ut(this),this._$AM=i,Be(this)):this._$AM=i}function cs(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)Q(s[n],!1),ut(s[n]);else s!=null&&(Q(s,!1),ut(s));else Q(this,i)}var ds=i=>{i.type==2&&(i._$AP??=cs,i._$AQ??=hs)},et=class extends E{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Be(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Q(this,t),ut(this))}setValue(t){if(De(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var pt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},mt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var ft=class extends et{constructor(){super(...arguments),this.dt=new pt(this),this.ft=new mt}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(h,a)=>{for await(let u of h)if(await a(u)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;s!==void 0&&(h=s(h,r)),a.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ys=w(ft),As=w(class extends ft{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Ie(this.ht);let e=D(this.ht);R(e,i)}}),ve=i=>as(i)?i._$litType$.h:i.strings,_s=w(class extends E{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=Ae(this.bt)?ve(this.bt):null,s=Ae(t)?ve(t):null;if(e!==null&&(s===null||e!==s)){let r=Dt(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Ne(b,o),n.setConnected(!1),this.yt.set(e,n)}tt(n,[r]),D(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Dt(r).pop();Ie(i),D(i,void 0,n),tt(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var vs=w(class extends E{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return y}}),us={},ws=w(class extends E{constructor(){super(...arguments),this._t=us}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ss=w(class extends E{constructor(){super(...arguments),this.key=b}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(tt(i),this.key=t),e}}),Es=w(class extends E{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!De(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===y||t===b)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return y;if(i.type===4){if(!!t===e.hasAttribute(s))return y;if(i.type===1&&e.getAttribute(s)===t+"")return y}}return tt(i),t}});var Pt=new WeakMap,xs=w(class extends et{render(i){return b}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),b}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Pt.get(t);e===void 0&&(e=new WeakMap,Pt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Pt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),we=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Us=w(class extends E{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let h of i)r[o]=s?s(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Dt(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let h=this.Ct??=[],a=[],u,g,d=0,$=r.length-1,f=0,A=n.length-1;for(;d<=$&&f<=A;)if(r[d]===null)d++;else if(r[$]===null)$--;else if(h[d]===o[f])a[f]=R(r[d],n[f]),d++,f++;else if(h[$]===o[A])a[A]=R(r[$],n[A]),$--,A--;else if(h[d]===o[A])a[A]=R(r[d],n[A]),D(i,a[A+1],r[d]),d++,A--;else if(h[$]===o[f])a[f]=R(r[$],n[f]),D(i,r[d],r[$]),$--,f++;else if(u===void 0&&(u=we(o,f,A),g=we(h,d,$)),u.has(h[d]))if(u.has(h[$])){let U=g.get(o[f]),F=U!==void 0?r[U]:null;if(F===null){let he=D(i,r[d]);R(he,n[f]),a[f]=he}else a[f]=R(F,n[f]),D(i,r[d],F),r[U]=null;f++}else kt(r[$]),$--;else kt(r[d]),d++;for(;f<=A;){let U=D(i,a[A+1]);R(U,n[f]),a[f++]=U}for(;d<=$;){let U=r[d++];U!==null&&kt(U)}return this.Ct=o,tt(i,a),y}}),He="important",ps=" !"+He,Ts=w(class extends E{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(ps);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?He:""):e[s]=r}}return y}}),Ms=w(class extends E{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?y:(this.At=i,document.importNode(i.content,!0))}}),z=class extends E{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};z.directiveName="unsafeHTML",z.resultType=1;var bt=w(z);var st=class extends z{};st.directiveName="unsafeSVG",st.resultType=2;var Os=w(st),Se=i=>!os(i)&&typeof i.then=="function",Ee=1073741823;var It=class extends et{constructor(){super(...arguments),this.Mt=Ee,this.Ut=[],this.dt=new pt(this),this.ft=new mt}render(...t){return t.find(e=>!Se(e))??y}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let a=e[h];if(!Se(a))return this.Mt=h,a;h<r&&a===s[h]||(this.Mt=Ee,r=0,Promise.resolve(a).then(async u=>{for(;o.get();)await o.get();let g=n.deref();if(g!==void 0){let d=g.Ut.indexOf(a);d>-1&&d<g.Mt&&(g.Mt=d,g.setValue(u))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ls=w(It);var ms=Symbol.for(""),fs=i=>{if(i?.r===ms)return i?._$litStatic$};var xe=new Map,je=i=>(t,...e)=>{let s=e.length,r,n,o=[],h=[],a,u=0,g=!1;for(;u<s;){for(a=t[u];u<s&&(n=e[u],(r=fs(n))!==void 0);)a+=r+t[++u],g=!0;u!==s&&h.push(n),o.push(a),u++}if(u===s&&o.push(t[s]),g){let d=o.join("$$lit$$");(t=xe.get(d))===void 0&&(o.raw=o,xe.set(d,t=o)),e=h}return i(t,...e)},Cs=je(l),ks=je(es);var p=class extends I{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var yt=Symbol("the albums manifest"),At=Symbol("the images manifest"),Ws=Symbol("the site manifest"),_t=Symbol("metadata about the site manifest"),vt=Symbol("the videos manifest"),wt=Symbol("the exif data"),St=Symbol("the semantic data");var Ye="photos",c=class{static EAGER="eager";static LAZY="lazy"},m=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},V=class{static UNESCO="unesco"},it=class{static SUBJECT="subject";static LOCATION="location"};async function gs(i="/manifest/env.json"){return await(await fetch(i)).json()}var rt=await gs(),Et=class{_data;constructor(t=`/manifest/images.${rt.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[At]&&(this._data=window[At]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[At]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},xt=class{_data;constructor(t=`/manifest/videos.${rt.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[vt]&&(this._data=window[vt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[vt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Ut=class{_data;constructor(t=`/manifest/albums.${rt.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[yt]&&(this._data=window[yt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[yt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Tt=class{_data;constructor(t=`/manifest/exif.${rt.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[wt]&&(this._data=window[wt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[wt]=e,this._data=e}exif(){return this._data}};function Ge(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let r of s)if(Ge(i,r,e))return!0;return!1}var Mt=class{_data;constructor(t=`/manifest/semantic.${rt.publication_id}.json`){this.url=t}async init(){if(window[St]&&(this._data=window[St]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[St]=t,this._data=t}semantic(){return this._data}},Ot=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[_t]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Ge(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let r of e)this.isChild(t,r)&&s.add(r);return s}};var O=class i{static ROUTES={[m.PHOTOS]:this.showPhotosUrl,[m.ALBUMS]:this.showAlbumsUrl,[m.ALBUM]:this.showAlbumUrl,[m.METADATA]:this.showMetadataUrl,[m.ABOUT]:this.showAboutUrl,[m.VIDEOS]:this.showVideosUrl,[m.THING]:this.showThingUrl};static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===m.ALBUM||t===m.PHOTO||t===m.METADATA||t===m.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Gt=class extends p{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",Gt);var Vt=class extends p{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Ye;return l`
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
    `}};customElements.define("app-photo",zt);var Zt=class extends p{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Zt);var L=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}};var _=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Ft=class extends p{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${L.loadingMode(s)}"
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
    `}};customElements.define("photos-page",Ft);var Z=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),u=r.toLocaleDateString("en-IE",{day:"numeric"}),g=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),$=n.toLocaleDateString("en-IE",{month:"short"}),f=r.getFullYear(),A=n.getFullYear(),U=d===$,F=f===A;return h===a?`${h} ${f}`:U&&F?`${u} - ${g} ${$} ${f}`:`${h} ${f} - ${a} ${A}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Wt=class extends p{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return Z.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),l`
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
    `}};customElements.define("photo-album",Wt);var qt=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){return this.getAlbums().reduce((t,e)=>t+e.count,0)}render(){return performance.mark("start-albums-render"),l`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let s=L.loadingMode(e);return l`
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
    `}};customElements.define("photo-album-page",qt);var Qt=class extends p{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",Qt);var Jt=class extends p{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Jt);var v=class i{static isUrn(t){return t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}};var Kt=class extends p{static properties={urn:{type:String}};id(){return v.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Kt);var Xt=class extends p{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object}}}connectedCallback(){super.connectedCallback(),this.albumPhotos()[0]||console.error(`empty album! ${this.id}`),_.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s={},r=t.filter(n=>n[0]===e.id);for(let[n,o,h]of r)s[o]||(s[o]=[]),s[o].push(h);return{...e,relations:s}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=Z.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos(),r=s.map((a,u)=>l`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${L.loadingMode(u)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_mosaic_url}"
        imageUrl="${a.full_image}"></app-photo>`),n=this.albumVideos().map((a,u)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),o=new Set(s.flatMap(a=>a.relations.location?.filter(u=>(console.log(v.parseUrn(u),V.UNESCO,u),v.is(u,V.UNESCO)))).filter(a=>a)),h=Array.from(o).map(a=>l`<unesco-link urn="${a}"></unesco-link>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${bt(this.description)}
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
    `}};customElements.define("album-page",Xt);var te=class extends p{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",te);var ee=class extends p{static properties={urn:{type:String}};render(){return v.isUrn(this.urn)?l`
      <a class="thing-link" href="${v.toURL(this.urn)}">${this.urn}</a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("thing-link",ee);var se=class extends p{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",se);var ie=class extends p{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),_.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?l`${this.exif.focal_length}`:this.exif.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?l`<em>${e}</em>`:t.toLowerCase()==="summary"?l`${bt(e??"")}`:v.isUrn(e)&&v.is(e,V.UNESCO)?l`<unesco-link .urn="${e}"></unesco-link>`:v.isUrn(e)?l`<thing-link .urn="${e}"></thing-link>`:e}renderSemanticData(t){return l`
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
    `}};customElements.define("metadata-page",ie);var re=class extends p{static get properties(){return{}}connectedCallback(){super.connectedCallback(),_.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",re);var Lt=class{static loadingMode(t){return t===0?"auto":"none"}};var ne=class extends p{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}videos(){return this.videos.videos()}render(){let t=this.videos().map((e,s)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Lt.loadingMode(s)}"
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
    `}};customElements.define("videos-page",ne);var oe=class extends p{static get properties(){return{urn:{type:String},images:{type:Object},semantic:{type:Object}}}connectedCallback(){super.connectedCallback(),_.setIndex()}subjectPhotos(t,e){return e.filter(s=>{let[r,n,o]=s;return(n===it.SUBJECT||n===it.LOCATION)&&v.sameURN(o,this.urn)}).map(s=>t.find(r=>r.id===s[0])).filter(s=>s!==void 0).map((s,r)=>l`
      <app-photo
        id=${s.id}
        tags="${s.tags}"
        loading="${L.loadingMode(r)}"
        thumbnailUrl="${s.thumbnail_url}"
        thumbnailDataUrl="${s.thumbnail_mosaic_url}"
        imageUrl="${s.full_image}"></app-photo>`)}render(){let t=this.images.images(),e=this.semantic.semantic(),s=this.subjectPhotos(t,e);return l`
      <div>
        <section class="thing-page">
          <h1>${this.urn}</h1>

          ${s}
        </section>
      </div>
    `}};customElements.define("thing-page",oe);var T=new Ut,S=new Et,M=new xt,P=new Ot,C=new Tt,x=new Mt,$s=[[T,c.EAGER],[S,c.EAGER],[M,c.EAGER],[P,c.EAGER],[C,c.EAGER],[x,c.EAGER]],bs={[m.ABOUT]:[[T,c.LAZY],[S,c.LAZY],[M,c.LAZY],[P,c.LAZY],[C,c.LAZY],[x,c.LAZY]],[m.ALBUMS]:[[T,c.EAGER],[S,c.LAZY],[M,c.LAZY],[P,c.LAZY],[C,c.LAZY],[x,c.LAZY]],[m.PHOTOS]:[[T,c.EAGER],[S,c.EAGER],[M,c.EAGER],[P,c.LAZY],[C,c.LAZY],[x,c.LAZY]],[m.VIDEOS]:[[T,c.LAZY],[S,c.LAZY],[M,c.EAGER],[P,c.LAZY],[C,c.LAZY],[x,c.LAZY]],[m.ALBUM]:[[T,c.EAGER],[S,c.EAGER],[M,c.EAGER],[x,c.EAGER],[P,c.LAZY],[C,c.LAZY]],[m.PHOTO]:[[T,c.EAGER],[S,c.EAGER],[M,c.EAGER],[P,c.LAZY],[C,c.EAGER],[x,c.EAGER]],[m.METADATA]:[[T,c.LAZY],[S,c.EAGER],[M,c.EAGER],[P,c.EAGER],[C,c.EAGER],[x,c.EAGER]],[m.THING]:[[T,c.LAZY],[S,c.EAGER],[M,c.LAZY],[P,c.EAGER],[C,c.LAZY],[x,c.EAGER]]},ae=class{static async init(){let t=O.getUrl();console.log(`loading ${t?.type}`);let e=bs[t?.type]??$s,s=[];for(let[r,n]of e)n===c.EAGER?s.push(r.init()):n===c.LAZY&&r.init();await Promise.all(s)}};await ae.init();var le=class i extends p{static DEFAULT_PAGE=m.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:m.ALBUM,albums:m.ALBUMS,photos:m.PHOTOS,metadata:m.METADATA,about:m.ABOUT,videos:m.VIDEOS,thing:m.THING};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=O.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),O.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=m.PHOTOS,this.id=s,this.title=e,O.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r,tags:n}=t.detail;this.page=m.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,this.tags=n??[],O.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=O.router(this.page);O.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <photo-album-page .albums="${T}" class="${e}"></photo-album-page>
      `;if(this.page===m.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===m.PHOTOS)return l`<photos-page class="${e}" .images=${S}></photos-page>`;if(this.page===m.ALBUM){this.id||console.error("no album id provided");let s=T.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${S}
        .videos=${M}
        .semantic=${x}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        class="${e}"></album-page>
      `}if(this.page===m.METADATA){let s=S.images().find(h=>h.id===this.id),r=C.exif().find(h=>h.id===this.id),n=x.semantic().filter(h=>h[0]===this.id),o={};for(let[h,a,u]of n)o[a]?typeof o[a]=="string"&&(o[a]=[o[a],u]):o[a]=u;return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page .image=${s} .semantic=${o} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===m.VIDEOS)return l`
      <videos-page .videos=${M} class="${e}"></videos-page>
      `;if(this.page===m.THING)return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${S}
        .semantic=${x}
        class="${e}"></thing-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],l`
    <body>
      <div class="${s.join(" ")}"
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
    `}};customElements.define("photo-app",le);export{$s as DEFAULT_DEPENDENCIES,bs as PAGE_DEPENDECIES,le as PhotoApp};
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
