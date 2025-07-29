var dt=globalThis,qt=dt.ShadowRoot&&(dt.ShadyCSS===void 0||dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,De=Symbol(),_e=new WeakMap,zt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==De)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(qt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=_e.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_e.set(e,t))}return t}toString(){return this.cssText}},ts=i=>new zt(typeof i=="string"?i:i+"",void 0,De);var es=(i,t)=>{if(qt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=dt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},ve=qt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ts(e)})(i):i,{is:ss,defineProperty:is,getOwnPropertyDescriptor:rs,getOwnPropertyNames:ns,getOwnPropertySymbols:os,getPrototypeOf:as}=Object,vt=globalThis,we=vt.trustedTypes,ls=we?we.emptyScript:"",cs=vt.reactiveElementPolyfillSupport,it=(i,t)=>i,Ft={toAttribute(i,t){switch(t){case Boolean:i=i?ls:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Be=(i,t)=>!ss(i,t),Se={attribute:!0,type:String,converter:Ft,reflect:!1,hasChanged:Be};Symbol.metadata??=Symbol("metadata"),vt.litPropertyMetadata??=new WeakMap;var H=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Se){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&is(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=rs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let c=r?.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Se}static o(){if(this.hasOwnProperty(it("elementProperties")))return;let t=as(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(it("properties"))){let e=this.properties,s=[...ns(e),...os(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(ve(r))}else t!==void 0&&e.push(ve(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return es(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Ft).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Ft;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Be)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[it("elementProperties")]=new Map,H[it("finalized")]=new Map,cs?.({ReactiveElement:H}),(vt.reactiveElementVersions??=[]).push("2.0.4");var Kt=globalThis,pt=Kt.trustedTypes,Ee=pt?pt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Jt="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Qt="?"+N,hs=`<${Qt}>`,z=document,nt=()=>z.createComment(""),ot=i=>i===null||typeof i!="object"&&typeof i!="function",He=Array.isArray,je=i=>He(i)||typeof i?.[Symbol.iterator]=="function",Gt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Ue=/>/g,Y=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Te=/'/g,Le=/"/g,Ge=/^(?:script|style|textarea|title)$/i,Ye=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),a=Ye(1),ds=Ye(2),_=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Ce=new WeakMap,V=z.createTreeWalker(z,129);function Ve(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}var ze=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=st;for(let c=0;c<e;c++){let l=i[c],h,m,p=-1,b=0;for(;b<l.length&&(o.lastIndex=b,m=o.exec(l),m!==null);)b=o.lastIndex,o===st?m[1]==="!--"?o=xe:m[1]!==void 0?o=Ue:m[2]!==void 0?(Ge.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=Y):m[3]!==void 0&&(o=Y):o===Y?m[0]===">"?(o=r??st,p=-1):m[1]===void 0?p=-2:(p=o.lastIndex-m[2].length,h=m[1],o=m[3]===void 0?Y:m[3]==='"'?Le:Te):o===Le||o===Te?o=Y:o===xe||o===Ue?o=st:(o=Y,r=void 0);let g=o===Y&&i[c+1].startsWith("/>")?" ":"";n+=o===st?l+hs:p>=0?(s.push(h),l.slice(0,p)+Jt+l.slice(p)+N+g):l+N+(p===-2?c:g)}return[Ve(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},at=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,c=t.length-1,l=this.parts,[h,m]=ze(t,e);if(this.el=i.createElement(h,s),V.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=V.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Jt)){let b=m[o++],g=r.getAttribute(p).split(N),y=/([.?@])?(.*)/.exec(b);l.push({type:1,index:n,name:y[2],strings:g,ctor:y[1]==="."?mt:y[1]==="?"?ft:y[1]==="@"?gt:Z}),r.removeAttribute(p)}else p.startsWith(N)&&(l.push({type:6,index:n}),r.removeAttribute(p));if(Ge.test(r.tagName)){let p=r.textContent.split(N),b=p.length-1;if(b>0){r.textContent=pt?pt.emptyScript:"";for(let g=0;g<b;g++)r.append(p[g],nt()),V.nextNode(),l.push({type:2,index:++n});r.append(p[b],nt())}}}else if(r.nodeType===8)if(r.data===Qt)l.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(N,p+1))!==-1;)l.push({type:7,index:n}),p+=N.length-1}n++}}static createElement(t,e){let s=z.createElement("template");return s.innerHTML=t,s}};function F(i,t,e=i,s){if(t===_)return t;let r=s!==void 0?e.U?.[s]:e.N,n=ot(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=F(i,r._$AS(i,t.values),r,s)),t}var ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??z).importNode(e,!0);V.currentNode=r;let n=V.nextNode(),o=0,c=0,l=s[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new wt(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new $t(n,this,t)),this._$AV.push(h),l=s[++c]}o!==l?.index&&(n=V.nextNode(),o++)}return V.currentNode=z,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},wt=class Fe{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),ot(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==_&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):je(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==A&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.j(z.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=at.createElement(Ve(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new ut(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Ce.get(t.strings);return e===void 0&&Ce.set(t.strings,e=new at(t)),e}D(t){He(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Fe(this.H(nt()),this.H(nt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=F(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let c=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=F(this,c[s+l],e,l),h===_&&(h=this._$AH[l]),o||=!ot(h)||h!==this._$AH[l],h===A?t=A:t!==A&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}o&&!r&&this.B(t)}B(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mt=class extends Z{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===A?void 0:t}},ft=class extends Z{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}},gt=class extends Z{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??A)===_)return;let s=this._$AH,r=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==A&&(s===A||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$t=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}},ps={W:Jt,q:N,J:Qt,Z:1,F:ze,G:ut,K:je,X:F,Y:wt,tt:Z,st:ft,it:gt,et:mt,ot:$t},us=Kt.litHtmlPolyfillSupport;us?.(at,wt),(Kt.litHtmlVersions??=[]).push("3.1.3");var Ze=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new wt(t.insertBefore(nt(),n),n,void 0,e??{})}return r._$AI(i),r};var G=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return _}};G._$litElement$=!0,G.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:G});var ms=globalThis.litElementPolyfillSupport;ms?.({LitElement:G});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:fs}=ps,gs=i=>i===null||typeof i!="object"&&typeof i!="function";var Me=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,$s=i=>i?._$litType$?.h!=null;var We=i=>i.strings===void 0,Re=()=>document.createComment(""),j=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Re(),r),o=s.insertBefore(Re(),r);e=new fs(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==i;if(c){let l;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(l=i._$AU)!==o._$AU&&e._$AP(l)}if(n!==r||c){let l=e._$AA;for(;l!==n;){let h=l.nextSibling;s.insertBefore(l,r),l=h}}}return e},B=(i,t,e=i)=>(i._$AI(t,e),i),bs={},lt=(i,t=bs)=>i._$AH=t,Zt=i=>i._$AH,Yt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},qe=i=>{i._$AR()};var S=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var rt=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),rt(s,t);return!0},bt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ke=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),_s(t)}};function ys(i){this._$AN!==void 0?(bt(this),this._$AM=i,Ke(this)):this._$AM=i}function As(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)rt(s[n],!1),bt(s[n]);else s!=null&&(rt(s,!1),bt(s));else rt(this,i)}var _s=i=>{i.type==2&&(i._$AP??=As,i._$AQ??=ys)},ct=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ke(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(rt(this,t),bt(this))}setValue(t){if(We(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var yt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},At=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var _t=class extends ct{constructor(){super(...arguments),this.dt=new yt(this),this.ft=new At}render(t,e){return _}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return _;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(c,l)=>{for await(let h of c)if(await l(h)===!1)return})(e,async c=>{for(;o.get();)await o.get();let l=n.deref();if(l!==void 0){if(l.vt!==e)return!1;s!==void 0&&(c=s(c,r)),l.commitValue(c,r),r++}return!0}),_}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ts=S(_t),St=S(class extends _t{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&qe(this.ht);let e=j(this.ht);B(e,i)}}),Oe=i=>$s(i)?i._$litType$.h:i.strings,Ls=S(class extends L{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=Me(this.bt)?Oe(this.bt):null,s=Me(t)?Oe(t):null;if(e!==null&&(s===null||e!==s)){let r=Zt(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Ze(A,o),n.setConnected(!1),this.yt.set(e,n)}lt(n,[r]),j(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Zt(r).pop();qe(i),j(i,void 0,n),lt(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Cs=S(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return _}}),vs={},Ms=S(class extends L{constructor(){super(...arguments),this._t=vs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return _}else if(this._t===t)return _;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Rs=S(class extends L{constructor(){super(...arguments),this.key=A}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(lt(i),this.key=t),e}}),Os=S(class extends L{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!We(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===_||t===A)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return _;if(i.type===4){if(!!t===e.hasAttribute(s))return _;if(i.type===1&&e.getAttribute(s)===t+"")return _}}return lt(i),t}});var Vt=new WeakMap,Ps=S(class extends ct{render(i){return A}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),A}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Vt.get(t);e===void 0&&(e=new WeakMap,Vt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Vt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Pe=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Is=S(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let c of i)r[o]=s?s(c,o):o,n[o]=e(c,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Zt(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let c=this.Ct??=[],l=[],h,m,p=0,b=r.length-1,g=0,y=n.length-1;for(;p<=b&&g<=y;)if(r[p]===null)p++;else if(r[b]===null)b--;else if(c[p]===o[g])l[g]=B(r[p],n[g]),p++,g++;else if(c[b]===o[y])l[y]=B(r[b],n[y]),b--,y--;else if(c[p]===o[y])l[y]=B(r[p],n[y]),j(i,l[y+1],r[p]),p++,y--;else if(c[b]===o[g])l[g]=B(r[b],n[g]),j(i,r[p],r[b]),b--,g++;else if(h===void 0&&(h=Pe(o,g,y),m=Pe(c,p,b)),h.has(c[p]))if(h.has(c[b])){let x=m.get(o[g]),et=x!==void 0?r[x]:null;if(et===null){let Ae=j(i,r[p]);B(Ae,n[g]),l[g]=Ae}else l[g]=B(et,n[g]),j(i,r[p],et),r[x]=null;g++}else Yt(r[b]),b--;else Yt(r[p]),p++;for(;g<=y;){let x=j(i,l[y+1]);B(x,n[g]),l[g++]=x}for(;p<=b;){let x=r[p++];x!==null&&Yt(x)}return this.Ct=o,lt(i,l),_}}),Je="important",ws=" !"+Je,ks=S(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(ws);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?Je:""):e[s]=r}}return _}}),Ns=S(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?_:(this.At=i,document.importNode(i.content,!0))}}),J=class extends L{constructor(t){if(super(t),this.bt=A,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this.kt=void 0,this.bt=t;if(t===_)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};J.directiveName="unsafeHTML",J.resultType=1;var Et=S(J);var ht=class extends J{};ht.directiveName="unsafeSVG",ht.resultType=2;var Ds=S(ht),Ie=i=>!gs(i)&&typeof i.then=="function",ke=1073741823;var Wt=class extends ct{constructor(){super(...arguments),this.Mt=ke,this.Ut=[],this.dt=new yt(this),this.ft=new At}render(...t){return t.find(e=>!Ie(e))??_}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this.Mt);c++){let l=e[c];if(!Ie(l))return this.Mt=c,l;c<r&&l===s[c]||(this.Mt=ke,r=0,Promise.resolve(l).then(async h=>{for(;o.get();)await o.get();let m=n.deref();if(m!==void 0){let p=m.Ut.indexOf(l);p>-1&&p<m.Mt&&(m.Mt=p,m.setValue(h))}}))}return _}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Bs=S(Wt);var Ss=Symbol.for(""),Es=i=>{if(i?.r===Ss)return i?._$litStatic$};var Ne=new Map,Qe=i=>(t,...e)=>{let s=e.length,r,n,o=[],c=[],l,h=0,m=!1;for(;h<s;){for(l=t[h];h<s&&(n=e[h],(r=Es(n))!==void 0);)l+=r+t[++h],m=!0;h!==s&&c.push(n),o.push(l),h++}if(h===s&&o.push(t[s]),m){let p=o.join("$$lit$$");(t=Ne.get(p))===void 0&&(o.raw=o,Ne.set(p,t=o)),e=c}return i(t,...e)},Hs=Qe(a),js=Qe(ds);var u=class extends G{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var xt=Symbol("the albums manifest"),Ut=Symbol("the images manifest"),ei=Symbol("the site manifest"),Tt=Symbol("the videos manifest"),Lt=Symbol("the exif data"),Ct=Symbol("the semantic data"),Mt=Symbol("the album stats"),Rt=Symbol("the triples data");var Xe="photos",d=class{static EAGER="eager";static LAZY="lazy"},f=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},W=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static GEONAME="geoname"},v=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia"},Q=new Set(["bird","mammal","reptile","amphibian","fish"]);var q=window.envConfig,Ot=class{_data;constructor(t=`/manifest/images.${q.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Ut]&&(this._data=window[Ut]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[Ut]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},Pt=class{_data;constructor(t=`/manifest/videos.${q.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Tt]&&(this._data=window[Tt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[Tt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},It=class{_data;constructor(t=`/manifest/albums.${q.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[xt]&&(this._data=window[xt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[xt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},kt=class{_data;constructor(t=`/manifest/exif.${q.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Lt]&&(this._data=window[Lt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Lt]=e,this._data=e}exif(){return this._data}};var Nt=class{_data;constructor(t=`/manifest/semantic.${q.publication_id}.json`){this.url=t}async init(){if(window[Ct]&&(this._data=window[Ct]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Ct]=t,this._data=t}semantic(){return this._data}},Dt=class{_data;constructor(t=`/manifest/stats.${q.publication_id}.json`){this.url=t}async init(){if(window[Mt]&&(this._data=window[Mt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Mt]=t,this._data=t}stats(){return this._data}},Bt=class{_data;constructor(t=`/manifest/triples.${q.publication_id}.json`){this.url=t}async init(){if(window[Rt]&&(this._data=window[Rt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Rt]=t,this._data=t}};var O=class i{static ROUTES={[f.PHOTOS]:this.showPhotosUrl,[f.ALBUMS]:this.showAlbumsUrl,[f.ALBUM]:this.showAlbumUrl,[f.METADATA]:this.showMetadataUrl,[f.ABOUT]:this.showAboutUrl,[f.VIDEOS]:this.showVideosUrl,[f.THING]:this.showThingUrl};static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===f.ALBUM||t===f.PHOTO||t===f.METADATA||t===f.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Xt=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),a`
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
    `}};customElements.define("photo-sidebar",Xt);var te=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Xe;return a`
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
    `}};customElements.define("photo-header",te);var Ht=new Map,E=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Ht.has(t))return Ht.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Ht.set(t,s.toDataURL("image/png")),Ht.get(t)}};var ee=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return a`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){console.log(this.mosaicColours,"colours");let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:E.encodeBitmapDataURL(this.mosaicColours)},e=document.createElement("div");e.innerHTML=this.summary??"";let s=e.textContent??e.innerText??"";return a`
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
    `}};customElements.define("app-photo",ee);var se=class extends u{render(){return a`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",se);var w=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var ie=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];yield a`
          <app-photo
            id=${r.id}
            loading="${E.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return a`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${St(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",ie);var re=class extends u{static get properties(){return{albums:{type:Array},stats:{type:Array}}}render(){return a`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",re);var X=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},c=r.toLocaleDateString("en-IE",o),l=n.toLocaleDateString("en-IE",o),h=r.toLocaleDateString("en-IE",{day:"numeric"}),m=n.toLocaleDateString("en-IE",{day:"numeric"}),p=r.toLocaleDateString("en-IE",{month:"short"}),b=n.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),y=n.getFullYear(),x=p===b,et=g===y;return c===l?`${c} ${g}`:x&&et?`${h} - ${m} ${b} ${g}`:`${c} ${g} - ${l} ${y}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=r.toLocaleDateString("en-IE",o),l=n.toLocaleDateString("en-IE",o);return c===l?c:`${c} \u2014 ${l}`}}};var tt=class i{static TABLE={England:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",France:"\u{1F1EB}\u{1F1F7}",Germany:"\u{1F1E9}\u{1F1EA}",Ireland:"\u{1F1EE}\u{1F1EA}",Italy:"\u{1F1EE}\u{1F1F9}",Lanzarote:"\u{1F1EA}\u{1F1F8}",Mallorca:"\u{1F1EA}\u{1F1F8}","Northern Ireland":"\u{1F1EC}\u{1F1E7}",Norway:"\u{1F1F3}\u{1F1F4}",Scotland:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",Slovenia:"\u{1F1F8}\u{1F1EE}",Spain:"\u{1F1EA}\u{1F1F8}",Sweden:"\u{1F1F8}\u{1F1EA}",Switzerland:"\u{1F1E8}\u{1F1ED}",Tenerife:"\u{1F1EA}\u{1F1F8}","The Netherlands":"\u{1F1F3}\u{1F1F1}","United States of America":"\u{1F1FA}\u{1F1F8}",Wales:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"};static flag(t){return i.TABLE[t]?i.TABLE[t]:"\u{1F3F3}\uFE0F"}static flags(t){return t.map(e=>i.flag(e)).join(" ")}};var ne=class extends u{static get properties(){return{title:{type:String},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return X.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){performance.mark(`start-album-render-${this.url}`);let t=E.encodeBitmapDataURL(this.mosaicColours),e=tt.flags(this?.countries.split(","));return a`
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
    `}};customElements.define("photo-album",ne);var oe=class extends u{static get properties(){return{albums:{type:Object},stats:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){for(let s=0;s<t.length;s++){let r=t[s],n=E.loadingMode(s);yield a`
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
          `}}return a`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <section class="album-container">
      ${St(e())}
    </section>
    `}};customElements.define("photo-album-page",oe);var ae=class extends u{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return a`
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
    `}};customElements.define("app-video",ae);var le=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?a`<button class="photo-share-button" disabled>[sharing...]</button>`:a`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",le);var P=class i{static findSourceRelation(t,e,s){if(!Array.isArray(e))throw new TypeError("Triples must be an array");let r=e.find(n=>$.sameURN(n[0],s)&&D.hasRelation(n,t));return r?D.getTarget(r):null}static findSubject(t,e){return i.findSourceRelation(v.SUBJECT,t,e)}static findLocation(t,e){return i.findSourceRelation(v.LOCATION,t,e)}static findRating(t,e){return i.findSourceRelation(v.RATING,t,e)}static findName(t,e){return i.findSourceRelation(v.NAME,t,e)}static findBirdwatchUrl(t,e){return i.findSourceRelation(v.BIRDWATCH_URL,t,e)}static findWikipedia(t,e){return i.findSourceRelation(v.WIKIPEDIA,t,e)}static findLongitude(t,e){return i.findSourceRelation(v.LONGITUDE,t,e)}static findLatitude(t,e){return i.findSourceRelation(v.LATITUDE,t,e)}},D=class{static isUrnSource(t){return $.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return $.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}static filterRelation(t,e){return t.filter(s=>s[1]===e)}static filterSourceId(t,e){if(!$.isUrn(e))throw new Error(`Invalid URN: ${e}`);let s=$.parseUrn(e);return t.filter(r=>$.sameURN(r[0],e)||$.hasId(r[0],s.id))}},$=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},K=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){let r=D.filterRelation(t,v.NAME).find(n=>$.hasId(n[0],e));return r?D.getTarget(r):e}static birdwatchUrl(t,e){let s=D.filterSourceId(D.filterRelation(t,v.BIRDWATCH_URL),e);if(s.length===0)return;let[r]=s;return D.getTarget(r)}};var ce=class extends u{static properties={urn:{type:String}};id(){return $.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?a`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:a`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",ce);var he=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object},countries:{type:String}}}connectedCallback(){super.connectedCallback(),this.albumPhotos()[0]||console.error(`empty album! ${this.id}`),w.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s={},r=t.filter(n=>n[0]===e.id);for(let[n,o,c]of r)s[o]||(s[o]=[]),s[o].push(c);return{...e,relations:s}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=X.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos(),r=s.map((h,m)=>a`
      <app-photo
        id=${h.id}
        summary=${h.relations.summary}
        loading="${E.loadingMode(m)}"
        thumbnailUrl="${h.thumbnail_url}"
        mosaicColours="${h.mosaic_colours}"
        imageUrl="${h.full_image}"></app-photo>`),n=this.albumVideos().map((h,m)=>a`<app-video
        id=${h.id}
        url_poster=${h.poster_url}
        url_unscaled=${h.video_url_unscaled}
        url_1080p=${h.video_url_1080p}
        url_720p=${h.video_url_720p}
        url_480p=${h.video_url_480p}
        ></app-video>`),o=new Set(s.flatMap(h=>h.relations.location?.filter(m=>(console.log($.parseUrn(m),W.UNESCO,m),$.is(m,W.UNESCO)))).filter(h=>h)),c=Array.from(o).map(h=>a`<unesco-link urn="${h}"></unesco-link>`),l=tt.flags(this?.countries.split(","));return a`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${l}</p>
        <p class="photo-album-description">${Et(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${c.map(h=>a`<li>${h}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${r}
      </section>

      <section class="video-container">
        ${n}
      </section>
    </div>
    `}};customElements.define("album-page",he);var de=class extends u{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?a`<button class="photo-share-button" disabled>[sharing...]</button>`:a`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",de);var pe=class extends u{static properties={urn:{type:String},triples:{type:Array}};name(){let{type:t,id:e}=$.parseUrn(this.urn);if(Q.has(t))return a`<span>${K.toCommonName(this.triples,e)}</span>`;let s=P.findName(this.triples,this.urn);return s?a`<span>${s}</span>`:decodeURIComponent(e)}render(){return $.isUrn(this.urn)?a`
      <a class="thing-link" href="${$.toURL(this.urn)}">${this.name()}</a>
    `:a`<span>Invalid URN</span>`}};customElements.define("thing-link",pe);var ue=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?a`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:a`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",ue);var me=class extends u{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),w.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?a`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?a`<td>Manual aperture control</td>`:a`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?a`${this.exif.focal_length}`:this.exif.focal_length==="0"?a`<td>Manual lens</td>`:a`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return a`<ul class="thing-list">
        ${e.map(s=>a`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return a`<em>${e}</em>`;if(t.toLowerCase()==="summary")return a`${Et(e??"")}`;if($.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return a`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if($.isUrn(e)&&$.is(e,W.UNESCO))return a`<unesco-link .urn="${e}"></unesco-link>`;if($.isUrn(e))return a`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return console.log(t),new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return a`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().filter(e=>!this.isIgnoredKey(e)).map(e=>a`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,s=this.semantic,r=t.album_id;return a`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${r}">[album]</a>
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
    `}};customElements.define("metadata-page",me);var fe=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),w.setIndex()}render(){return a`
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
    `}};customElements.define("about-page",fe);var jt=class{static loadingMode(t){return t===0?"auto":"none"}};var ge=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}videos(){return this.videos.videos()}render(){let t=this.videos().map((e,s)=>a`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${jt.loadingMode(s)}"
      ></app-video>`);return a`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("videos-page",ge);var $e=class extends u{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},semantic:{type:Object},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),w.setIndex()}isSemanticRelation(t){return t===v.SUBJECT||t===v.LOCATION||t===v.RATING}filterPhotos(t,e){return e.filter(s=>{let[r,n,o]=s,c=$.isRating(o)?`urn:r\xF3:rating:${encodeURIComponent(o)}`:o;if(!this.isSemanticRelation(n)&&!$.isUrn(c))return!1;try{let l=$.parseUrn(c),h=$.parseUrn(this.urn);return h.id==="*"?h.type===l.type:$.sameURN(c,this.urn)}catch{return!1}}).map(s=>t.find(r=>r.id===s[0])).filter(s=>s!==void 0)}subjectPhotos(t,e){return this.filterPhotos(t,e).map((s,r)=>a`
      <app-photo
        id=${s.id}
        loading="${E.loadingMode(r)}"
        thumbnailUrl="${s.thumbnail_url}"
        mosaicColours="${s.mosaic_colours}"
        imageUrl="${s.full_image}"></app-photo>`)}subjectAlbums(t,e){let s=this.filterPhotos(t,e),r=new Set(s.map(n=>n.album_id));return Array.from(r).flatMap(n=>this.albums.albums().filter(o=>o.id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>a`
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
      `)}getFacts(){let t=this.triples.filter(s=>s[0]===this.urn),e={};for(let s of t){let[r,n,o]=s;e.hasOwnProperty(n)||(e[n]=[]),e[n].push(o)}return e}binomialToCommonName(t){let e=this.triples.find(s=>{let[r,n,o]=s;if(!$.isUrn(r))return!1;let c=$.parseUrn(r),l=t.replace(" ","-").toLowerCase();return c.id===l&&n===v.NAME});return e?e[2]:t}firstPhotographed(t,e){let r=this.filterPhotos(t,e).sort((n,o)=>n.created_at-o.created_at)[0];return r?new Date(r.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}getTitle(){let t=P.findName(this.triples,this.urn);if(t)return t;try{let e=$.parseUrn(this.urn),s=decodeURIComponent(e.id);return e.id==="*"?`${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`:Q.has(e.type)?K.toCommonName(this.triples,s):s}catch{return this.urn}}renderFacts(t,e){let s={};return e.country&&(s.Country=a`${e.country}`),s}render(){let t=this.images.images(),e=this.semantic.semantic(),s=this.subjectPhotos(t,e),r=this.subjectAlbums(t,e),n=this.getFacts(),o=$.parseUrn(this.urn),c=o.type,l=Object.assign({Classification:a`<a href="#/thing/${c}:*">${c.charAt(0).toUpperCase()}${c.slice(1)}</a>`},this.renderFacts(o,n));Q.has(c)&&(l["First Photographed"]=a`<span>${this.firstPhotographed(t,e)}</span>`);let h=P.findWikipedia(this.triples,this.urn),m=P.findBirdwatchUrl(this.triples,this.urn),p=P.findLongitude(this.triples,this.urn),b=P.findLatitude(this.triples,this.urn),g;if(p&&b){let y=`https://www.google.com/maps?q=${n.latitude},${n.longitude}`;g=a`
      <a href="${y}" target="_blank" rel="noopener">[maps]</a>
      `}return a`
      <div>
      <section class="thing-page">
        <h1>${this.getTitle()}</h1>

        <p>
          ${Q.has(c)?a`<span class="thing-binomial">(${K.pretty(o.id)})</span>`:a``}
        </p>
        <br>

        ${h?a`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:a``}
        ${m?a`<a href="${m}" target="_blank" rel="noopener">[birdwatch]</a>`:a``}
        ${g?a`<span class="location">${g}</span>`:a``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(l).map(([y,x])=>a`
          <tr>
            <th class="exif-heading">${y}</th>
            <td>${x}</td>
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
    `}};customElements.define("thing-page",$e);var C=new It,T=new Ot,M=new Pt,I=new kt,U=new Nt,k=new Dt,R=new Bt,xs=[[C,d.EAGER],[T,d.EAGER],[M,d.EAGER],[I,d.EAGER],[U,d.EAGER],[k,d.EAGER],[R,d.LAZY]],Us={[f.ABOUT]:[[C,d.LAZY],[T,d.LAZY],[M,d.LAZY],[I,d.LAZY],[k,d.LAZY],[U,d.EAGER],[R,d.LAZY]],[f.ALBUMS]:[[C,d.EAGER],[T,d.LAZY],[M,d.LAZY],[I,d.LAZY],[k,d.EAGER],[U,d.EAGER],[R,d.LAZY]],[f.PHOTOS]:[[C,d.EAGER],[T,d.EAGER],[M,d.EAGER],[I,d.LAZY],[k,d.LAZY],[U,d.EAGER],[R,d.LAZY]],[f.VIDEOS]:[[C,d.LAZY],[T,d.LAZY],[M,d.EAGER],[I,d.LAZY],[k,d.LAZY],[U,d.EAGER],[R,d.LAZY]],[f.ALBUM]:[[C,d.EAGER],[T,d.EAGER],[M,d.EAGER],[k,d.LAZY],[I,d.LAZY],[U,d.EAGER],[R,d.LAZY]],[f.PHOTO]:[[C,d.EAGER],[T,d.EAGER],[M,d.EAGER],[I,d.EAGER],[U,d.EAGER],[k,d.LAZY],[R,d.LAZY]],[f.METADATA]:[[C,d.LAZY],[T,d.EAGER],[M,d.EAGER],[I,d.EAGER],[U,d.EAGER],[k,d.LAZY],[U,d.EAGER],[R,d.EAGER]],[f.THING]:[[C,d.EAGER],[T,d.EAGER],[M,d.LAZY],[I,d.LAZY],[U,d.EAGER],[k,d.LAZY],[R,d.EAGER]]},be=class{static async init(){let t=O.getUrl();console.log(`loading ${t?.type}`);let e=Us[t?.type]??xs,s=[];for(let[r,n]of e)n===d.EAGER?s.push(r.init()):n===d.LAZY&&r.init();await Promise.all(s)}};await be.init();var ye=class i extends u{static DEFAULT_PAGE=f.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:f.ALBUM,albums:f.ALBUMS,photos:f.PHOTOS,metadata:f.METADATA,about:f.ABOUT,videos:f.VIDEOS,thing:f.THING};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=O.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),O.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=f.PHOTOS,this.id=s,this.title=e,O.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=f.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,O.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=O.router(this.page);O.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return a`
      <photo-album-page .stats=${k} .albums="${C}" class="${e}"></photo-album-page>
      `;if(this.page===f.ABOUT)return a`<about-page class="${e}"></about-page>`;if(this.page===f.PHOTOS)return a`<photos-page class="${e}" .images=${T}></photos-page>`;if(this.page===f.ALBUM){this.id||console.error("no album id provided");let s=C.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),a`
      <album-page
        .images=${T}
        .videos=${M}
        .semantic=${U}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page===f.METADATA){let s=T.images().find(c=>c.id===this.id),r=I.exif().find(c=>c.id===this.id),n=U.semantic().filter(c=>c[0]===this.id),o={};for(let[c,l,h]of n)o[l]?typeof o[l]=="string"&&(o[l]=[o[l],h]):o[l]=h;return s||console.error(`failed to find photo with id ${this.id}`),a`
      <metadata-page
        .triples=${R._data}
        .image=${s}
        .semantic=${o} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===f.VIDEOS)return a`
      <videos-page .videos=${M} class="${e}"></videos-page>
      `;if(this.page===f.THING)return a`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${T}
        .albums=${C}
        .semantic=${U}
        .triples=${R._data}
        class="${e}"></thing-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],a`
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
    `}};customElements.define("photo-app",ye);export{xs as DEFAULT_DEPENDENCIES,Us as PAGE_DEPENDECIES,ye as PhotoApp};
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
