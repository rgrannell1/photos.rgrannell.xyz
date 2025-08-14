var ut=globalThis,zt=ut.ShadowRoot&&(ut.ShadyCSS===void 0||ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),$e=new WeakMap,Ht=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(zt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=$e.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$e.set(e,t))}return t}toString(){return this.cssText}},es=i=>new Ht(typeof i=="string"?i:i+"",void 0,ke);var ss=(i,t)=>{if(zt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=ut.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},be=zt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return es(e)})(i):i,{is,defineProperty:rs,getOwnPropertyDescriptor:ns,getOwnPropertyNames:os,getOwnPropertySymbols:as,getPrototypeOf:ls}=Object,vt=globalThis,ye=vt.trustedTypes,cs=ye?ye.emptyScript:"",hs=vt.reactiveElementPolyfillSupport,it=(i,t)=>i,jt={toAttribute(i,t){switch(t){case Boolean:i=i?cs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Le=(i,t)=>!is(i,t),Ae={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),vt.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&rs(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=ns(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);n.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static o(){if(this.hasOwnProperty(it("elementProperties")))return;let t=ls(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(it("properties"))){let e=this.properties,s=[...os(e),...as(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(be(r))}else t!==void 0&&e.push(be(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ss(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:jt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:jt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Le)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[it("elementProperties")]=new Map,B[it("finalized")]=new Map,hs?.({ReactiveElement:B}),(vt.reactiveElementVersions??=[]).push("2.0.4");var Ft=globalThis,pt=Ft.trustedTypes,we=pt?pt.createPolicy("lit-html",{createHTML:i=>i}):void 0,qt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Yt="?"+P,ds=`<${Yt}>`,q=document,nt=()=>q.createComment(""),ot=i=>i===null||typeof i!="object"&&typeof i!="function",Pe=Array.isArray,De=i=>Pe(i)||typeof i?.[Symbol.iterator]=="function",Dt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,ve=/>/g,z=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,xe=/"/g,Ne=/^(?:script|style|textarea|title)$/i,Be=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Be(1),us=Be(2),v=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Ee=new WeakMap,F=q.createTreeWalker(q,129);function He(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(t):t}var je=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=st;for(let h=0;h<e;h++){let a=i[h],c,u,d=-1,p=0;for(;p<a.length&&(o.lastIndex=p,u=o.exec(a),u!==null);)p=o.lastIndex,o===st?u[1]==="!--"?o=Se:u[1]!==void 0?o=ve:u[2]!==void 0?(Ne.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=z):u[3]!==void 0&&(o=z):o===z?u[0]===">"?(o=r??st,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?z:u[3]==='"'?xe:_e):o===xe||o===_e?o=z:o===Se||o===ve?o=st:(o=z,r=void 0);let m=o===z&&i[h+1].startsWith("/>")?" ":"";n+=o===st?a+ds:d>=0?(s.push(c),a.slice(0,d)+qt+a.slice(d)+P+m):a+P+(d===-2?h:m)}return[He(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},at=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[c,u]=je(t,e);if(this.el=i.createElement(c,s),F.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=F.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(qt)){let p=u[o++],m=r.getAttribute(d).split(P),b=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:b[2],strings:m,ctor:b[1]==="."?ft:b[1]==="?"?gt:b[1]==="@"?$t:W}),r.removeAttribute(d)}else d.startsWith(P)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(Ne.test(r.tagName)){let d=r.textContent.split(P),p=d.length-1;if(p>0){r.textContent=pt?pt.emptyScript:"";for(let m=0;m<p;m++)r.append(d[m],nt()),F.nextNode(),a.push({type:2,index:++n});r.append(d[p],nt())}}}else if(r.nodeType===8)if(r.data===Yt)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(P,d+1))!==-1;)a.push({type:7,index:n}),d+=P.length-1}n++}}static createElement(t,e){let s=q.createElement("template");return s.innerHTML=t,s}};function Y(i,t,e=i,s){if(t===v)return t;let r=s!==void 0?e.U?.[s]:e.N,n=ot(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=Y(i,r._$AS(i,t.values),r,s)),t}var mt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??q).importNode(e,!0);F.currentNode=r;let n=F.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new _t(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new bt(n,this,t)),this._$AV.push(c),a=s[++h]}o!==a?.index&&(n=F.nextNode(),o++)}return F.currentNode=q,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},_t=class Ge{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),ot(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==v&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):De(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==w&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.j(q.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=at.createElement(He(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new mt(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Ee.get(t.strings);return e===void 0&&Ee.set(t.strings,e=new at(t)),e}D(t){Pe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Ge(this.H(nt()),this.H(nt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=Y(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==v,o&&(this._$AH=t);else{let h=t,a,c;for(t=n[0],a=0;a<n.length-1;a++)c=Y(this,h[s+a],e,a),c===v&&(c=this._$AH[a]),o||=!ot(c)||c!==this._$AH[a],c===w?t=w:t!==w&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!r&&this.B(t)}B(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ft=class extends W{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===w?void 0:t}},gt=class extends W{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},$t=class extends W{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??w)===v)return;let s=this._$AH,r=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==w&&(s===w||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},bt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}},ps={W:qt,q:P,J:Yt,Z:1,F:je,G:mt,K:De,X:Y,Y:_t,tt:W,st:gt,it:$t,et:ft,ot:bt},ms=Ft.litHtmlPolyfillSupport;ms?.(at,_t),(Ft.litHtmlVersions??=[]).push("3.1.3");var Ve=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new _t(t.insertBefore(nt(),n),n,void 0,e??{})}return r._$AI(i),r};var j=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Ve(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return v}};j._$litElement$=!0,j.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:j});var fs=globalThis.litElementPolyfillSupport;fs?.({LitElement:j});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:gs}=ps,$s=i=>i===null||typeof i!="object"&&typeof i!="function";var Te=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,bs=i=>i?._$litType$?.h!=null;var ze=i=>i.strings===void 0,Ie=()=>document.createComment(""),H=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Ie(),r),o=s.insertBefore(Ie(),r);e=new gs(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||h){let a=e._$AA;for(;a!==n;){let c=a.nextSibling;s.insertBefore(a,r),a=c}}}return e},N=(i,t,e=i)=>(i._$AI(t,e),i),ys={},lt=(i,t=ys)=>i._$AH=t,Gt=i=>i._$AH,Nt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Fe=i=>{i._$AR()};var T=i=>(...t)=>({_$litDirective$:i,values:t}),R=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var rt=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),rt(s,t);return!0},yt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},qe=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),Ss(t)}};function As(i){this._$AN!==void 0?(yt(this),this._$AM=i,qe(this)):this._$AM=i}function ws(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)rt(s[n],!1),yt(s[n]);else s!=null&&(rt(s,!1),yt(s));else rt(this,i)}var Ss=i=>{i.type==2&&(i._$AP??=ws,i._$AQ??=As)},ct=class extends R{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),qe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(rt(this,t),yt(this))}setValue(t){if(ze(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var At=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},wt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var St=class extends ct{constructor(){super(...arguments),this.dt=new At(this),this.ft=new wt}render(t,e){return v}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return v;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(h,a)=>{for await(let c of h)if(await a(c)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;s!==void 0&&(h=s(h,r)),a.commitValue(h,r),r++}return!0}),v}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ns=T(St),xt=T(class extends St{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Fe(this.ht);let e=H(this.ht);N(e,i)}}),Ue=i=>bs(i)?i._$litType$.h:i.strings,Bs=T(class extends R{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=Te(this.bt)?Ue(this.bt):null,s=Te(t)?Ue(t):null;if(e!==null&&(s===null||e!==s)){let r=Gt(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Ve(w,o),n.setConnected(!1),this.yt.set(e,n)}lt(n,[r]),H(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Gt(r).pop();Fe(i),H(i,void 0,n),lt(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Hs=T(class extends R{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return v}}),vs={},js=T(class extends R{constructor(){super(...arguments),this._t=vs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return v}else if(this._t===t)return v;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Gs=T(class extends R{constructor(){super(...arguments),this.key=w}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(lt(i),this.key=t),e}}),Vs=T(class extends R{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!ze(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===v||t===w)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return v;if(i.type===4){if(!!t===e.hasAttribute(s))return v;if(i.type===1&&e.getAttribute(s)===t+"")return v}}return lt(i),t}});var Bt=new WeakMap,zs=T(class extends ct{render(i){return w}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),w}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Bt.get(t);e===void 0&&(e=new WeakMap,Bt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Bt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Ce=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Fs=T(class extends R{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let h of i)r[o]=s?s(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Gt(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let h=this.Ct??=[],a=[],c,u,d=0,p=r.length-1,m=0,b=n.length-1;for(;d<=p&&m<=b;)if(r[d]===null)d++;else if(r[p]===null)p--;else if(h[d]===o[m])a[m]=N(r[d],n[m]),d++,m++;else if(h[p]===o[b])a[b]=N(r[p],n[b]),p--,b--;else if(h[d]===o[b])a[b]=N(r[d],n[b]),H(i,a[b+1],r[d]),d++,b--;else if(h[p]===o[m])a[m]=N(r[p],n[m]),H(i,r[d],r[p]),p--,m++;else if(c===void 0&&(c=Ce(o,m,b),u=Ce(h,d,p)),c.has(h[d]))if(c.has(h[p])){let E=u.get(o[m]),V=E!==void 0?r[E]:null;if(V===null){let dt=H(i,r[d]);N(dt,n[m]),a[m]=dt}else a[m]=N(V,n[m]),H(i,r[d],V),r[E]=null;m++}else Nt(r[p]),p--;else Nt(r[d]),d++;for(;m<=b;){let E=H(i,a[b+1]);N(E,n[m]),a[m++]=E}for(;d<=p;){let E=r[d++];E!==null&&Nt(E)}return this.Ct=o,lt(i,a),v}}),Ye="important",_s=" !"+Ye,qs=T(class extends R{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(_s);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?Ye:""):e[s]=r}}return v}}),Ys=T(class extends R{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?v:(this.At=i,document.importNode(i.content,!0))}}),J=class extends R{constructor(t){if(super(t),this.bt=w,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this.kt=void 0,this.bt=t;if(t===v)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};J.directiveName="unsafeHTML",J.resultType=1;var Et=T(J);var ht=class extends J{};ht.directiveName="unsafeSVG",ht.resultType=2;var Ws=T(ht),Me=i=>!$s(i)&&typeof i.then=="function",Re=1073741823;var Vt=class extends ct{constructor(){super(...arguments),this.Mt=Re,this.Ut=[],this.dt=new At(this),this.ft=new wt}render(...t){return t.find(e=>!Me(e))??v}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let a=e[h];if(!Me(a))return this.Mt=h,a;h<r&&a===s[h]||(this.Mt=Re,r=0,Promise.resolve(a).then(async c=>{for(;o.get();)await o.get();let u=n.deref();if(u!==void 0){let d=u.Ut.indexOf(a);d>-1&&d<u.Mt&&(u.Mt=d,u.setValue(c))}}))}return v}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Qs=T(Vt);var xs=Symbol.for(""),Es=i=>{if(i?.r===xs)return i?._$litStatic$};var Oe=new Map,We=i=>(t,...e)=>{let s=e.length,r,n,o=[],h=[],a,c=0,u=!1;for(;c<s;){for(a=t[c];c<s&&(n=e[c],(r=Es(n))!==void 0);)a+=r+t[++c],u=!0;c!==s&&h.push(n),o.push(a),c++}if(c===s&&o.push(t[s]),u){let d=o.join("$$lit$$");(t=Oe.get(d))===void 0&&(o.raw=o,Oe.set(d,t=o)),e=h}return i(t,...e)},Ks=We(l),Js=We(us);var f=class extends j{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Tt=Symbol("the albums manifest"),It=Symbol("the images manifest"),di=Symbol("the site manifest"),ui=Symbol("the videos manifest"),pi=Symbol("the semantic data"),mi=Symbol("the album stats"),Ut=Symbol("the triples data");var Qe="photos",$=class{static EAGER="eager";static LAZY="lazy"},g=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},y=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},A=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia";static CREATED_AT="created_at";static F_STOP="f_stop";static FOCAL_LENGTH="focal_length";static MODEL="model";static EXPOSURE_TIME="exposure_time";static ISO="iso";static WIDTH="width";static HEIGHT="height"},Ke=new Set(["created_at","f_stop","focal_length","model","exposure_time","iso","width","height"]),Q=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var Wt=window.envConfig,Ct=class{constructor(t=`/manifest/images.${Wt.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[It]&&(this._data=window[It]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[It]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},Mt=class{constructor(t=`/manifest/albums.${Wt.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Tt]&&(this._data=window[Tt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Tt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:t.thumbnail_mosaic_url}))}},Rt=class{constructor(t=`/manifest/triples.${Wt.publication_id}.json`){this.url=t}async init(){if(window[Ut]&&(this._data=window[Ut]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Ut]=t,this._data=t}};var k=class i{static{this.ROUTES={[g.PHOTOS]:this.showPhotosUrl,[g.ALBUMS]:this.showAlbumsUrl,[g.ALBUM]:this.showAlbumUrl,[g.METADATA]:this.showMetadataUrl,[g.ABOUT]:this.showAboutUrl,[g.VIDEOS]:this.showVideosUrl,[g.THING]:this.showThingUrl}}static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===g.ALBUM||t===g.PHOTO||t===g.METADATA||t===g.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Qt=class extends f{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",Qt);var Kt=class extends f{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Qe;return l`
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
    `}};customElements.define("photo-header",Kt);var Ot=new Map,I=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Ot.has(t))return Ot.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Ot.set(t,s.toDataURL("image/png")),Ot.get(t)}};var Jt=class extends f{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:I.encodeBitmapDataURL(this.mosaicColours)},e=document.createElement("div");e.innerHTML=this.summary??"";let s=e.textContent??e.innerText??"";return l`
    <div class="photo">
      <a href="${"#/metadata/"+this.id}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata",t)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t.thumbnailDataUrl}"/>

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
    `}};customElements.define("app-photo",Jt);var Zt=class extends f{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Zt);var x=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Xt=class extends f{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];yield l`
          <app-photo
            id=${r.id}
            loading="${I.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${xt(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",Xt);var te=class extends f{static get properties(){return{albums:{type:Array}}}render(){let t=document.getElementById("stats-data"),e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${e.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",te);function L(i,t="r\xF3"){if(!i.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${i}`);let e=i.split(":")[2],[s,r]=i.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function G(i,t="r\xF3"){try{return L(i,t)}catch{return{type:"unknown",id:i,qs:{}}}}var U=class{static source(i){return i[0]}static relation(i){return i[1]}static target(i){return i[2]}},Ts=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(i){return this.#e.has(i)?this.#e.get(i):(this.#e.set(i,this.#t),this.#s.set(this.#t,i),this.#t++,this.#t-1)}getIndex(i){return this.#e.get(i)}getValue(i){return this.#s.get(i)}has(i){return this.#e.has(i)}},Je=class{static intersection(i,t){if(t.length===0)return new Set;t.sort((s,r)=>s.size-r.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let r=t[s];for(let n of e)i.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},Is=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Us=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Cs=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;constructor(i){this.indexedTriples=[],this.stringIndex=new Ts,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.indexTriples(i),this.metrics=new Is}indexTriples(i){for(let t=0;t<i.length;t++)this.indexTriple(i[t],t)}indexTriple(i,t){let e=G(U.source(i)),s=U.relation(i),r=G(U.target(i)),n=this.stringIndex.add(e.type),o=this.stringIndex.add(e.id),h=this.stringIndex.add(s),a=this.stringIndex.add(r.type),c=this.stringIndex.add(r.id);this.indexedTriples.push([this.stringIndex.add(U.source(i)),h,this.stringIndex.add(U.target(i))]),this.sourceType.has(n)||this.sourceType.set(n,new Set),this.sourceType.get(n).add(t),this.sourceId.has(o)||this.sourceId.set(o,new Set),this.sourceId.get(o).add(t);for(let[u,d]of Object.entries(e.qs)){let p=this.stringIndex.add(`${u}=${d}`);this.sourceQs.has(p)||this.sourceQs.set(p,new Set),this.sourceQs.get(p).add(t)}this.relations.has(h)||this.relations.set(h,new Set),this.relations.get(h).add(t),this.targetType.has(a)||this.targetType.set(a,new Set),this.targetType.get(a).add(t),this.targetId.has(c)||this.targetId.set(c,new Set),this.targetId.get(c).add(t);for(let[u,d]of Object.entries(r.qs)){let p=this.stringIndex.add(`${u}=${d}`);this.targetQs.has(p)||this.targetQs.set(p,new Set),this.targetQs.get(p).add(t)}}add(i){let t=this.indexedTriples.length;for(let e=0;e<i.length;e++)this.indexTriple(i[e],t+e)}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([i,t,e])=>[this.stringIndex.getValue(i),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(i){if(i<0||i>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[i];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(i){if(!(i<0||i>=this.indexedTriples.length))return this.indexedTriples[i]}getSourceTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}};function Ms(i,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let r=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let c=t.rows[a][2];r.has(c)||r.set(c,[]),r.get(c).push(a)}for(let a=0;a<e.rows.length;a++){let c=e.rows[a][0];n.has(c)||n.set(c,[]),n.get(c).push(a)}let o=Je.intersection(i,[new Set(r.keys()),new Set(n.keys())]),h=[];for(let a of o){let c=n.get(a),u=r.get(a);for(let d of c)for(let p of u){let m=t.rows[d].concat(e.rows[p]);h.push(m)}}return{names:s,rows:h}}var Ze=class Z{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new Cs(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Us;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}static of(t){return new Z(t)}static from(t){let e=[];for(let s of t){let{id:r,...n}=s;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,h]of Object.entries(n))if(Array.isArray(h))for(let a of h)e.push([r,o,a]);else e.push([r,o,h])}return new Z(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new Z(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new Z(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?U.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?U.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?U.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(U.source))}relations(){return new Set(this.index.triples().map(U.relation))}targets(){return new Set(this.index.triples().map(U.target))}objects(t=!1){let e=[];for(let[s,r]of Object.entries(this.object(t)))r.id=s,e.push(r);return e}object(t=!1){let e={};for(let[s,r,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][r]?Array.isArray(e[s][r])?e[s][r].push(n):e[s][r]=[e[s][r],n]:e[s][r]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:r,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let c of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,c)&&!o.includes(c))throw new Error(`Unexpected search parameter: ${c}`);if(s){if(s.type){let c=this.index.getSourceTypeSet(s.type);if(c)e.push(c);else return new Set}if(s.id){let c=this.index.getSourceIdSet(s.id);if(c)e.push(c);else return new Set}if(s.qs)for(let[c,u]of Object.entries(s.qs)){let d=this.index.getSourceQsSet(c,u);if(d)e.push(d);else return new Set}}if(n){if(n.type){let c=this.index.getTargetTypeSet(n.type);if(c)e.push(c);else return new Set}if(n.id){let c=this.index.getTargetIdSet(n.id);if(c)e.push(c);else return new Set}if(n.qs)for(let[c,u]of Object.entries(n.qs)){let d=this.index.getTargetQsSet(c,u);if(d)e.push(d);else return new Set}}if(r){let c=typeof r=="string"?{relation:[r]}:r;if(c.relation){let u=new Set;for(let d of c.relation){let p=this.index.getRelationSet(d);if(p)for(let m of p)u.add(m)}if(u.size>0)e.push(u);else return new Set}}let h=Je.intersection(this.metrics,e),a=new Set;for(let c of h){let u=this.index.getTriple(c);if(!s?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){a.add(c);continue}let d=!0;s?.predicate&&(d=d&&s.predicate(U.source(u))),n?.predicate&&(d=d&&n.predicate(U.target(u))),typeof r=="object"&&r.predicate&&(d=d&&r.predicate(U.relation(u))),d&&a.add(c)}return a}search(t){let e=[];for(let s of this.#t(t)){let r=this.index.getTriple(s);r&&e.push(r)}return new Z(e)}search2(t){let e=Object.entries(t),s=[];for(let h=0;h<e.length-2;h+=2){let a=e.slice(h,h+3),c={source:a[0][1],relation:a[1][1],target:a[2][1]},u=a.map(m=>m[0]),d=this.#t(c),p=Array.from(d).flatMap(m=>{let b=this.index.getTripleIndices(m);return typeof b>"u"?[]:[b]});s.push({names:u,rows:p})}let r=s.reduce(Ms.bind(this,this.metrics)),n=r.names,o=[];for(let h of r.rows){let a={};for(let c=0;c<n.length;c++){let u=n[c];a[u]=this.index.stringIndex.getValue(h[c])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var X=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),c=r.toLocaleDateString("en-IE",{day:"numeric"}),u=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),p=n.toLocaleDateString("en-IE",{month:"short"}),m=r.getFullYear(),b=n.getFullYear(),E=d===p,V=m===b;return h===a?`${h} ${m}`:E&&V?`${c} - ${u} ${p} ${m}`:`${h} ${m} - ${a} ${b}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Rs=window.envConfig,_=class{static isUrnSource(t){return S.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return S.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},S=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},K=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:A.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=L(e);return t.search({source:{id:s},relation:A.BIRDWATCH_URL}).firstTarget()}},tt=class{static details(t,e){let s=t.search({source:{type:"country"},relation:{relation:[A.NAME,A.FLAG]}}),r=s.search({relation:A.NAME,target:{id:e}}).firstSource(),n=L(r),o=s.search({source:n,relation:A.FLAG}).firstTarget();return{urn:r,name:e,flag:o}}static urnDetails(t,e){let s=L(e),r=t.search({source:{type:"country",id:s.id},relation:A.NAME}).firstTarget();return{urn:e,name:r}}},Xe=!1,kt=new Ze([]);function Os(i){return _.getRelation(i)!==A.RATING?[i]:[[_.getSource(i),_.getRelation(i),`urn:r\xF3:rating:${encodeURIComponent(_.getTarget(i))}`]]}function ks(i){if(_.getRelation(i)!==A.COUNTRY)return[i];let e=`urn:r\xF3:country:${_.getTarget(i).toLowerCase().replace(" ","-")}`;return[[_.getSource(i),_.getRelation(i),e,e,_.getRelation(i),_.getTarget(i)]]}function Ls(i){for(let t of["poster_url","video_url_1080p","video_url_480p","video_url_720p","video_url_unscaled"])if(_.getRelation(i)===t)return[[_.getSource(i),t,`${Rs.photos_url}${_.getTarget(i)}`]];return[i]}function et(i){return Xe||(kt.add(i),kt=kt.flatMap(Os).flatMap(ks).flatMap(Ls),Xe=!0),kt}var ee=class extends f{static get properties(){return{title:{type:String},triples:{type:Object},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return X.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=tt.details(this.triples,t),r=L(s);return l`<span href="#/thing/country:${r.id}" title=${t}>${e}</span>`})}render(){performance.mark(`start-album-render-${this.url}`);let t=I.encodeBitmapDataURL(this.mosaicColours),e=this.renderCountries();return l`
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
        <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
        @click=${this.broadcast("click-album",{id:this.id,title:this.title})}>
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
    `}};customElements.define("photo-album",ee);var se=class extends f{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,r=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,r.push(e[a])),e[a].position.top===s)r.push(e[a]);else break;let n=Math.min(...r.map(a=>a.minDate)),h=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&h!=="Invalid Date"&&(t.textContent=h)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let r=s.getAttribute("data-min-date");return r?[{position:s.getBoundingClientRect(),minDate:parseInt(r,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};customElements.define("year-cursor",se);var ie=class extends f{static get properties(){return{albums:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){let s=2e3,r=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],h=I.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==s&&(s=a,a!==r&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),yield l`
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
      ${xt(e.bind(this)())}
    </section>
    `}};customElements.define("albums-page",ie);var re=class extends f{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",re);var ne=class extends f{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",ne);var oe=class extends f{static{this.properties={urn:{type:String}}}id(){return S.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",oe);var ae=class extends f{static{this.properties={urn:{type:String},triples:{type:Array}}}name(){let{type:t,id:e}=S.parseUrn(this.urn);if(Q.has(t))return l`<span>${K.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:S.parseUrn(this.urn),relation:A.NAME}).firstTarget();return console.log(this.urn),s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=S.parseUrn(this.urn);return{[y.BIRD]:"bird-link",[y.MAMMAL]:"mammal-link",[y.REPTILE]:"reptile-link",[y.AMPHIBIAN]:"amphibian-link",[y.FISH]:"fish-link",[y.INSECT]:"insect-link"}[t]??""}render(){return S.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${S.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",ae);var le=class extends f{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),x.setIndex()}albumPhotos(t){return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s=t.search({source:{id:e.id}}).firstObject(!0);return{...e,relations:s??{}}})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let r=t.search({source:L(s)}).firstObject();return r?[r]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[y.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o.relations[A.LOCATION]?.filter(h=>S.is(h,n))).filter(o=>o)));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o.relations[A.SUBJECT]?.filter(h=>S.is(h,n))).filter(o=>o)));let r=[];r=r.concat(e[y.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=X.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,c)=>l`
      <app-photo
        id=${a.id}
        summary=${a.relations.summary}
        loading="${I.loadingMode(c)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos(t).map((a,c)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),h=this?.countries.split(",").map(a=>{let{flag:c,urn:u}=tt.details(this.triples,a),d=L(u);return l`<span href="#/thing/country:${d.id}" title=${a}>${c}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${h}</p>
        <p class="photo-album-description">${Et(this.description)}
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
    `}};customElements.define("album-page",le);var ce=class extends f{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",ce);var he=class extends f{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",he);var de=class extends f{static get properties(){return{id:{type:String},image:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),x.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${t.f_stop}</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${t.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${Et(e??"")}`;if(S.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(S.isUrn(e)&&S.is(e,y.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(S.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>_.getRelation(e).localeCompare(_.getRelation(s))).filter(e=>!this.isIgnoredKey(_.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(_.getRelation(e))}</th>
              <td>${this.renderSemanticValue(_.getRelation(e),_.getTarget(e))}</td>
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
    `:l`<p>No EXIF data available</p>`}render(){let t=this.image,e=t.album_id,s=this.triples,r=s.search({source:{id:t.id},relation:{predicate:n=>!Ke.has(n)}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(r)}
      ${this.renderExif(s)}

    </section>
    `}};customElements.define("metadata-page",de);var ue=class extends f{static get properties(){return{}}connectedCallback(){super.connectedCallback(),x.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",ue);var pe=class extends f{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}filterUrnImages(t,e,s){let r=[A.SUBJECT,A.LOCATION,A.RATING],n=G(this.urn);n.id==="*"&&delete n.id;let h=e.search(s).sources();return Array.from(h).flatMap(a=>t.filter(c=>c.id===a).slice(0,1))}renderSubjectPhotos(t,e){return t.sort((s,r)=>r.created_at-s.created_at).map((s,r)=>l`
      <app-photo
        id=${s.id}
        loading="${I.loadingMode(r)}"
        thumbnailUrl="${s.thumbnail_url}"
        mosaicColours="${s.mosaic_colours}"
        imageUrl="${s.full_image}"></app-photo>`)}renderSubjectAlbums(t,e,s){let r=this.filterUrnImages(t,e,s),n=new Set(r.map(o=>o.album_id));return Array.from(n).flatMap(o=>this.albums.albums().filter(h=>h.id===o)).sort((o,h)=>h.min_date-o.min_date).map(o=>l`
          <photo-album
            .triples=${this.triples}
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
      `)}firstPhotographed(t,e,s){let n=this.filterUrnImages(t,e,s).sort((o,h)=>o.created_at-h.created_at)[0];return n?new Date(n.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=S.parseUrn(this.urn),s=this.triples.search({source:{id:t,type:e},relation:A.NAME}).firstTarget();if(s)return s;try{let r=S.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:Q.has(r.type)?K.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(Q.has(t.type))for(let r of["captivity","wild"]){let o={...t,qs:{context:r}};s.push({label:r,query:{target:o}})}else s.push({label:"default",query:{target:t}});return s}renderPhotoSection(t){return l`<div>
    ${Object.entries(t).flatMap(([e,s])=>s?s.length===0?[]:e==="default"?[l`
        <div class="photo-group">
          ${s}
        </div>
        `]:[l`
        <div class="photo-group">
          <h4>${e.charAt(0).toUpperCase()+e.slice(1)}</h4>
          ${s}
        </div>
      `]:[])}
    <div/>`}render(){let t=this.triples,e=this.images.images(),s=S.parseUrn(this.urn),r=s.type,n=t.search({source:G(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let D=n.fcode_name;o["Place Type"]=l`${D.charAt(0).toUpperCase()}${D.slice(1)}`}Q.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:G(this.urn)})}</span>`);let h=n[A.WIKIPEDIA],a=n[A.BIRDWATCH_URL],c=n[A.LONGITUDE],u=n[A.LATITUDE],d;if(c&&u){let D=`https://www.google.com/maps?q=${u},${c}`;d=l`
      <a href="${D}" target="_blank" rel="noopener">[maps]</a>
      `}let p=G(this.urn);p.id==="*"&&delete p.id;let m={target:p},b=this.getPhotoQueries(G(this.urn)),E={};for(let{query:D,label:Pt}of b){let ts=this.filterUrnImages(e,t,D);E[Pt]=this.renderSubjectPhotos(ts)}let V=this.renderSubjectAlbums(e,t,m),dt=this.renderPhotoSection(E);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${Q.has(r)&&s.id!=="*"?l`<span class="thing-binomial">(${K.pretty(s.id)})</span>`:l``}
        </p>
        <br>

        ${h?l`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([D,Pt])=>l`
          <tr>
            <th class="exif-heading">${D}</th>
            <td>${Pt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${dt}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${V}
        </section>

      </div>
    `}};customElements.define("thing-page",pe);var Lt=class{static loadingMode(t){return t===0?"auto":"none"}};var me=class extends f{static get properties(){return{triples:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}getVideos(){return this.triples.search({source:{type:"video"}}).objects()}render(){let t=this.getVideos().map((e,s)=>l`<app-video
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
    `}};customElements.define("videos-page",me);var O=new Mt,M=new Ct,C=new Rt,Ps=[[O,$.EAGER],[M,$.EAGER],[C,$.EAGER]],Ds={[g.ABOUT]:[[O,$.LAZY],[M,$.LAZY],[C,$.EAGER]],[g.ALBUMS]:[[O,$.EAGER],[M,$.LAZY],[C,$.EAGER]],[g.PHOTOS]:[[O,$.EAGER],[M,$.EAGER],[C,$.EAGER]],[g.VIDEOS]:[[O,$.LAZY],[M,$.LAZY],[C,$.EAGER]],[g.ALBUM]:[[O,$.EAGER],[M,$.EAGER],[C,$.EAGER]],[g.PHOTO]:[[O,$.EAGER],[M,$.EAGER],[C,$.EAGER]],[g.METADATA]:[[O,$.LAZY],[M,$.EAGER],[C,$.EAGER]],[g.THING]:[[O,$.EAGER],[M,$.EAGER],[C,$.EAGER]]},fe=class{static async init(){let t=k.getUrl();console.log(`loading ${t?.type}`);let e=Ds[t?.type]??Ps,s=[];for(let[r,n]of e)n===$.EAGER?s.push(r.init()):n===$.LAZY&&r.init();await Promise.all(s)}};await fe.init();var ge=class i extends f{static{this.DEFAULT_PAGE=g.ALBUMS}static{this.LOCATION_TYPE_TO_PAGE={album:g.ALBUM,albums:g.ALBUMS,photos:g.PHOTOS,metadata:g.METADATA,about:g.ABOUT,videos:g.VIDEOS,thing:g.THING}}static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=k.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),k.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=g.PHOTOS,this.id=s,this.title=e,k.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=g.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,k.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=k.router(this.page);e||console.error(`no router found for page ${this.page}`),k.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums"){let s=et(C._data);return l`
      <albums-page .triples=${s} .albums="${O}" class="${e}"></albums-page>
      `}if(this.page===g.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===g.PHOTOS)return l`<photos-page class="${e}" .images=${M}></photos-page>`;if(this.page===g.ALBUM){this.id||console.error("no album id provided");let s=O.albums().find(n=>n.id===this.id);s||console.error(`failed to find album with id ${this.id}`);let r=et(C._data);return l`
      <album-page
        .images=${M}
        .triples=${r}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page===g.METADATA){let s=M.images().find(r=>r.id===this.id);return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${et(C._data)}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===g.VIDEOS)return l`
      <videos-page .triples=${et(C._data)} class="${e}"></videos-page>
      `;if(this.page===g.THING)return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${M}
        .albums=${O}
        .triples=${et(C._data)}
        class="${e}"></thing-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],l`
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
    `}};customElements.define("photo-app",ge);export{Ps as DEFAULT_DEPENDENCIES,Ds as PAGE_DEPENDECIES,ge as PhotoApp};
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
