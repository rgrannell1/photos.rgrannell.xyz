var gt=globalThis,Xt=gt.ShadowRoot&&(gt.ShadyCSS===void 0||gt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ge=Symbol(),xe=new WeakMap,Zt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Xt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=xe.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&xe.set(e,t))}return t}toString(){return this.cssText}},as=i=>new Zt(typeof i=="string"?i:i+"",void 0,Ge);var ls=(i,t)=>{if(Xt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=gt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Ee=Xt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return as(e)})(i):i,{is:cs,defineProperty:hs,getOwnPropertyDescriptor:ds,getOwnPropertyNames:us,getOwnPropertySymbols:ps,getPrototypeOf:ms}=Object,Tt=globalThis,Te=Tt.trustedTypes,fs=Te?Te.emptyScript:"",gs=Tt.reactiveElementPolyfillSupport,ot=(i,t)=>i,Qt={toAttribute(i,t){switch(t){case Boolean:i=i?fs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ye=(i,t)=>!cs(i,t),Ue={attribute:!0,type:String,converter:Qt,reflect:!1,hasChanged:Ye};Symbol.metadata??=Symbol("metadata"),Tt.litPropertyMetadata??=new WeakMap;var Y=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Ue){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&hs(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=ds(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let c=r?.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ue}static o(){if(this.hasOwnProperty(ot("elementProperties")))return;let t=ms(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(ot("properties"))){let e=this.properties,s=[...us(e),...ps(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Ee(r))}else t!==void 0&&e.push(Ee(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ls(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:Qt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Qt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Ye)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[ot("elementProperties")]=new Map,Y[ot("finalized")]=new Map,gs?.({ReactiveElement:Y}),(Tt.reactiveElementVersions??=[]).push("2.0.4");var te=globalThis,$t=te.trustedTypes,Ie=$t?$t.createPolicy("lit-html",{createHTML:i=>i}):void 0,ee="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,se="?"+B,$s=`<${se}>`,Q=document,lt=()=>Q.createComment(""),ct=i=>i===null||typeof i!="object"&&typeof i!="function",Ve=Array.isArray,ze=i=>Ve(i)||typeof i?.[Symbol.iterator]=="function",Ft=`[ 	
\f\r]`,nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Me=/>/g,W=RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Re=/'/g,Le=/"/g,Fe=/^(?:script|style|textarea|title)$/i,qe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=qe(1),ys=qe(2),_=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Oe=new WeakMap,Z=Q.createTreeWalker(Q,129);function We(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(t):t}var Ze=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=nt;for(let c=0;c<e;c++){let a=i[c],h,p,d=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===nt?p[1]==="!--"?o=Ce:p[1]!==void 0?o=Me:p[2]!==void 0?(Fe.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=W):p[3]!==void 0&&(o=W):o===W?p[0]===">"?(o=r??nt,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?W:p[3]==='"'?Le:Re):o===Le||o===Re?o=W:o===Ce||o===Me?o=nt:(o=W,r=void 0);let $=o===W&&i[c+1].startsWith("/>")?" ":"";n+=o===nt?a+$s:d>=0?(s.push(h),a.slice(0,d)+ee+a.slice(d)+B+$):a+B+(d===-2?c:$)}return[We(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},ht=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,c=t.length-1,a=this.parts,[h,p]=Ze(t,e);if(this.el=i.createElement(h,s),Z.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=Z.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(ee)){let m=p[o++],$=r.getAttribute(d).split(B),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:v[2],strings:$,ctor:v[1]==="."?bt:v[1]==="?"?At:v[1]==="@"?vt:J}),r.removeAttribute(d)}else d.startsWith(B)&&(a.push({type:6,index:n}),r.removeAttribute(d));if(Fe.test(r.tagName)){let d=r.textContent.split(B),m=d.length-1;if(m>0){r.textContent=$t?$t.emptyScript:"";for(let $=0;$<m;$++)r.append(d[$],lt()),Z.nextNode(),a.push({type:2,index:++n});r.append(d[m],lt())}}}else if(r.nodeType===8)if(r.data===se)a.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(B,d+1))!==-1;)a.push({type:7,index:n}),d+=B.length-1}n++}}static createElement(t,e){let s=Q.createElement("template");return s.innerHTML=t,s}};function K(i,t,e=i,s){if(t===_)return t;let r=s!==void 0?e.U?.[s]:e.N,n=ct(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=K(i,r._$AS(i,t.values),r,s)),t}var yt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??Q).importNode(e,!0);Z.currentNode=r;let n=Z.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new Ut(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new wt(n,this,t)),this._$AV.push(h),a=s[++c]}o!==a?.index&&(n=Z.nextNode(),o++)}return Z.currentNode=Q,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Ut=class Qe{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),ct(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==_&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):ze(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==A&&ct(this._$AH)?this._$AA.nextSibling.data=t:this.j(Q.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ht.createElement(We(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new yt(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Oe.get(t.strings);return e===void 0&&Oe.set(t.strings,e=new ht(t)),e}D(t){Ve(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new Qe(this.H(lt()),this.H(lt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=K(this,t,e,0),o=!ct(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let c=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=K(this,c[s+a],e,a),h===_&&(h=this._$AH[a]),o||=!ct(h)||h!==this._$AH[a],h===A?t=A:t!==A&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!r&&this.B(t)}B(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bt=class extends J{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===A?void 0:t}},At=class extends J{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}},vt=class extends J{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??A)===_)return;let s=this._$AH,r=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==A&&(s===A||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},wt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}},bs={W:ee,q:B,J:se,Z:1,F:Ze,G:yt,K:ze,X:K,Y:Ut,tt:J,st:At,it:vt,et:bt,ot:wt},As=te.litHtmlPolyfillSupport;As?.(ht,Ut),(te.litHtmlVersions??=[]).push("3.1.3");var Ke=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new Ut(t.insertBefore(lt(),n),n,void 0,e??{})}return r._$AI(i),r};var z=class extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Ke(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return _}};z._$litElement$=!0,z.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:z});var vs=globalThis.litElementPolyfillSupport;vs?.({LitElement:z});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ws}=bs,_s=i=>i===null||typeof i!="object"&&typeof i!="function";var ke=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,Ss=i=>i?._$litType$?.h!=null;var Je=i=>i.strings===void 0,Pe=()=>document.createComment(""),V=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Pe(),r),o=s.insertBefore(Pe(),r);e=new ws(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==i;if(c){let a;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(a=i._$AU)!==o._$AU&&e._$AP(a)}if(n!==r||c){let a=e._$AA;for(;a!==n;){let h=a.nextSibling;s.insertBefore(a,r),a=h}}}return e},G=(i,t,e=i)=>(i._$AI(t,e),i),xs={},dt=(i,t=xs)=>i._$AH=t,Kt=i=>i._$AH,qt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Xe=i=>{i._$AR()};var U=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var at=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),at(s,t);return!0},_t=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},ts=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),Us(t)}};function Es(i){this._$AN!==void 0?(_t(this),this._$AM=i,ts(this)):this._$AM=i}function Ts(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)at(s[n],!1),_t(s[n]);else s!=null&&(at(s,!1),_t(s));else at(this,i)}var Us=i=>{i.type==2&&(i._$AP??=Ts,i._$AQ??=Es)},ut=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),ts(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(at(this,t),_t(this))}setValue(t){if(Je(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var St=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},xt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var Et=class extends ut{constructor(){super(...arguments),this.dt=new St(this),this.ft=new xt}render(t,e){return _}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return _;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(c,a)=>{for await(let h of c)if(await a(h)===!1)return})(e,async c=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.vt!==e)return!1;s!==void 0&&(c=s(c,r)),a.commitValue(c,r),r++}return!0}),_}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Gs=U(Et),It=U(class extends Et{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Xe(this.ht);let e=V(this.ht);G(e,i)}}),De=i=>Ss(i)?i._$litType$.h:i.strings,Ys=U(class extends L{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=ke(this.bt)?De(this.bt):null,s=ke(t)?De(t):null;if(e!==null&&(s===null||e!==s)){let r=Kt(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Ke(A,o),n.setConnected(!1),this.yt.set(e,n)}dt(n,[r]),V(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Kt(r).pop();Xe(i),V(i,void 0,n),dt(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Vs=U(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return _}}),Is={},zs=U(class extends L{constructor(){super(...arguments),this._t=Is}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return _}else if(this._t===t)return _;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Fs=U(class extends L{constructor(){super(...arguments),this.key=A}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(dt(i),this.key=t),e}}),qs=U(class extends L{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Je(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===_||t===A)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return _;if(i.type===4){if(!!t===e.hasAttribute(s))return _;if(i.type===1&&e.getAttribute(s)===t+"")return _}}return dt(i),t}});var Wt=new WeakMap,Ws=U(class extends ut{render(i){return A}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),A}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Wt.get(t);e===void 0&&(e=new WeakMap,Wt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Wt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Ne=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Zs=U(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let c of i)r[o]=s?s(c,o):o,n[o]=e(c,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Kt(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let c=this.Ct??=[],a=[],h,p,d=0,m=r.length-1,$=0,v=n.length-1;for(;d<=m&&$<=v;)if(r[d]===null)d++;else if(r[m]===null)m--;else if(c[d]===o[$])a[$]=G(r[d],n[$]),d++,$++;else if(c[m]===o[v])a[v]=G(r[m],n[v]),m--,v--;else if(c[d]===o[v])a[v]=G(r[d],n[v]),V(i,a[v+1],r[d]),d++,v--;else if(c[m]===o[$])a[$]=G(r[m],n[$]),V(i,r[d],r[m]),m--,$++;else if(h===void 0&&(h=Ne(o,$,v),p=Ne(c,d,m)),h.has(c[d]))if(h.has(c[m])){let T=p.get(o[$]),q=T!==void 0?r[T]:null;if(q===null){let ft=V(i,r[d]);G(ft,n[$]),a[$]=ft}else a[$]=G(q,n[$]),V(i,r[d],q),r[T]=null;$++}else qt(r[m]),m--;else qt(r[d]),d++;for(;$<=v;){let T=V(i,a[v+1]);G(T,n[$]),a[$++]=T}for(;d<=m;){let T=r[d++];T!==null&&qt(T)}return this.Ct=o,dt(i,a),_}}),es="important",Cs=" !"+es,Qs=U(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(Cs);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?es:""):e[s]=r}}return _}}),Ks=U(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?_:(this.At=i,document.importNode(i.content,!0))}}),et=class extends L{constructor(t){if(super(t),this.bt=A,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this.kt=void 0,this.bt=t;if(t===_)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};et.directiveName="unsafeHTML",et.resultType=1;var Ct=U(et);var pt=class extends et{};pt.directiveName="unsafeSVG",pt.resultType=2;var Js=U(pt),Be=i=>!_s(i)&&typeof i.then=="function",je=1073741823;var Jt=class extends ut{constructor(){super(...arguments),this.Mt=je,this.Ut=[],this.dt=new St(this),this.ft=new xt}render(...t){return t.find(e=>!Be(e))??_}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this.Mt);c++){let a=e[c];if(!Be(a))return this.Mt=c,a;c<r&&a===s[c]||(this.Mt=je,r=0,Promise.resolve(a).then(async h=>{for(;o.get();)await o.get();let p=n.deref();if(p!==void 0){let d=p.Ut.indexOf(a);d>-1&&d<p.Mt&&(p.Mt=d,p.setValue(h))}}))}return _}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Xs=U(Jt);var Ms=Symbol.for(""),Rs=i=>{if(i?.r===Ms)return i?._$litStatic$};var He=new Map,ss=i=>(t,...e)=>{let s=e.length,r,n,o=[],c=[],a,h=0,p=!1;for(;h<s;){for(a=t[h];h<s&&(n=e[h],(r=Rs(n))!==void 0);)a+=r+t[++h],p=!0;h!==s&&c.push(n),o.push(a),h++}if(h===s&&o.push(t[s]),p){let d=o.join("$$lit$$");(t=He.get(d))===void 0&&(o.raw=o,He.set(d,t=o)),e=c}return i(t,...e)},ti=ss(l),ei=ss(ys);var f=class extends z{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var Mt=Symbol("the albums manifest"),Rt=Symbol("the images manifest"),fi=Symbol("the site manifest"),Lt=Symbol("the videos manifest"),Ot=Symbol("the exif data"),gi=Symbol("the semantic data"),$i=Symbol("the album stats"),kt=Symbol("the triples data");var is="photos",u=class{static EAGER="eager";static LAZY="lazy"},g=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},y=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},b=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia"},X=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var st=window.envConfig,Pt=class{constructor(t=`/manifest/images.${st.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Rt]&&(this._data=window[Rt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[Rt]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},Dt=class{constructor(t=`/manifest/videos.${st.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Lt]&&(this._data=window[Lt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[Lt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Nt=class{constructor(t=`/manifest/albums.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Mt]&&(this._data=window[Mt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Mt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Bt=class{constructor(t=`/manifest/exif.${st.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Ot]&&(this._data=window[Ot]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Ot]=e,this._data=e}exif(){return this._data}};var jt=class{constructor(t=`/manifest/stats.${st.publication_id}.json`){this.url=t}async init(){let e=document.getElementById("stats-data").textContent;if(!e)throw new Error("stats-data empty");try{this._data=JSON.parse(e)}catch{throw new Error(`failed to parse stats-data as JSON: ${e}`)}this._data||console.error("stats symbol not injected")}stats(){return this._data}},Ht=class{constructor(t=`/manifest/triples.${st.publication_id}.json`){this.url=t}async init(){if(window[kt]&&(this._data=window[kt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[kt]=t,this._data=t}};var P=class i{static{this.ROUTES={[g.PHOTOS]:this.showPhotosUrl,[g.ALBUMS]:this.showAlbumsUrl,[g.ALBUM]:this.showAlbumUrl,[g.METADATA]:this.showMetadataUrl,[g.ABOUT]:this.showAboutUrl,[g.VIDEOS]:this.showVideosUrl,[g.THING]:this.showThingUrl}}static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===g.ALBUM||t===g.PHOTO||t===g.METADATA||t===g.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var ie=class extends f{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",ie);var re=class extends f{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=is;return l`
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
    `}};customElements.define("photo-header",re);var Gt=new Map,I=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Gt.has(t))return Gt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Gt.set(t,s.toDataURL("image/png")),Gt.get(t)}};var ne=class extends f{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
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
    `}};customElements.define("app-photo",ne);var oe=class extends f{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",oe);var x=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var ae=class extends f{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];yield l`
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
        ${It(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",ae);var le=class extends f{static get properties(){return{albums:{type:Array},stats:{type:Array}}}render(){return l`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",le);function j(i,t="r\xF3"){if(!i.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${i}`);let e=i.split(":")[2],[s,r]=i.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}function F(i,t="r\xF3"){try{return j(i,t)}catch{return{type:"unknown",id:i,qs:{}}}}var C=class{static source(i){return i[0]}static relation(i){return i[1]}static target(i){return i[2]}},Ls=class{#e;#t;#s;constructor(){this.#e=0,this.#t=new Map,this.#s=new Map}map(){return this.#t}reverseMap(){return this.#s}add(i){return this.#t.has(i)?this.#t.get(i):(this.#t.set(i,this.#e),this.#s.set(this.#e,i),this.#e++,this.#e-1)}getIndex(i){return this.#t.get(i)}getValue(i){return this.#s.get(i)}has(i){return this.#t.has(i)}},Os=class{static intersection(i,t){if(t.length===0)return new Set;t.sort((s,r)=>s.size-r.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let r=t[s];for(let n of e)i.setCheck(),r.has(n)||e.delete(n);if(e.size===0)break}return e}},ks=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Ps=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Ds=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;constructor(i){this.indexedTriples=[],this.stringIndex=new Ls,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.indexTriples(i),this.metrics=new ks}indexTriples(i){for(let t=0;t<i.length;t++)this.indexTriple(i[t],t)}indexTriple(i,t){let e=F(C.source(i)),s=C.relation(i),r=F(C.target(i)),n=this.stringIndex.add(e.type),o=this.stringIndex.add(e.id),c=this.stringIndex.add(s),a=this.stringIndex.add(r.type),h=this.stringIndex.add(r.id);this.indexedTriples.push([this.stringIndex.add(C.source(i)),c,this.stringIndex.add(C.target(i))]),this.sourceType.has(n)||this.sourceType.set(n,new Set),this.sourceType.get(n).add(t),this.sourceId.has(o)||this.sourceId.set(o,new Set),this.sourceId.get(o).add(t);for(let[p,d]of Object.entries(e.qs)){let m=this.stringIndex.add(`${p}=${d}`);this.sourceQs.has(m)||this.sourceQs.set(m,new Set),this.sourceQs.get(m).add(t)}this.relations.has(c)||this.relations.set(c,new Set),this.relations.get(c).add(t),this.targetType.has(a)||this.targetType.set(a,new Set),this.targetType.get(a).add(t),this.targetId.has(h)||this.targetId.set(h,new Set),this.targetId.get(h).add(t);for(let[p,d]of Object.entries(r.qs)){let m=this.stringIndex.add(`${p}=${d}`);this.targetQs.has(m)||this.targetQs.set(m,new Set),this.targetQs.get(m).add(t)}}add(i){let t=this.indexedTriples.length;for(let e=0;e<i.length;e++)this.indexTriple(i[e],t+e)}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([i,t,e])=>[this.stringIndex.getValue(i),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(i){if(i<0||i>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[i];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getSourceTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(i){let t=this.stringIndex.getIndex(i);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(i,t){let e=this.stringIndex.getIndex(`${i}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},rs=class M{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new Ds(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Ps;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}static of(t){return new M(t)}static from(t){let e=[];for(let s of t){let{id:r,...n}=s;if(typeof r!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,c]of Object.entries(n))if(Array.isArray(c))for(let a of c)e.push([r,o,a]);else e.push([r,o,c])}return new M(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new M(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new M(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?C.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?C.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?C.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(C.source))}relations(){return new Set(this.index.triples().map(C.relation))}targets(){return new Set(this.index.triples().map(C.target))}objects(t=!1){let e=[];for(let[s,r]of Object.entries(this.object(t)))r.id=s,e.push(r);return e}object(t=!1){let e={};for(let[s,r,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][r]?Array.isArray(e[s][r])?e[s][r].push(n):e[s][r]=[e[s][r],n]:e[s][r]=t?[n]:n;return e}search(t){let e=[this.cursorIndices],{source:s,relation:r,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof r>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let h of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,h)&&!o.includes(h))throw new Error(`Unexpected search parameter: ${h}`);if(s){if(s.type){let h=this.index.getSourceTypeSet(s.type);if(h)e.push(h);else return new M([])}if(s.id){let h=this.index.getSourceIdSet(s.id);if(h)e.push(h);else return new M([])}if(s.qs)for(let[h,p]of Object.entries(s.qs)){let d=this.index.getSourceQsSet(h,p);if(d)e.push(d);else return new M([])}}if(n){if(n.type){let h=this.index.getTargetTypeSet(n.type);if(h)e.push(h);else return new M([])}if(n.id){let h=this.index.getTargetIdSet(n.id);if(h)e.push(h);else return new M([])}if(n.qs)for(let[h,p]of Object.entries(n.qs)){let d=this.index.getTargetQsSet(h,p);if(d)e.push(d);else return new M([])}}if(r){let h=typeof r=="string"?{relation:[r]}:r,p=new Set;for(let d of h.relation){let m=this.index.getRelationSet(d);if(m)for(let $ of m)p.add($)}if(p.size>0)e.push(p);else return new M([])}let c=Os.intersection(this.metrics,e),a=[];for(let h of c){let p=this.index.getTriple(h);if(!s?.predicate&&!n?.predicate&&!(typeof r=="object"&&r.predicate)){a.push(p);continue}let d=!0;s?.predicate&&(d=d&&s.predicate(C.source(p))),n?.predicate&&(d=d&&n.predicate(C.target(p))),typeof r=="object"&&r.predicate&&(d=d&&r.predicate(C.relation(p))),d&&a.push(p)}return new M(a)}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var it=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},c=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),h=r.toLocaleDateString("en-IE",{day:"numeric"}),p=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),m=n.toLocaleDateString("en-IE",{month:"short"}),$=r.getFullYear(),v=n.getFullYear(),T=d===m,q=$===v;return c===a?`${c} ${$}`:T&&q?`${h} - ${p} ${m} ${$}`:`${c} ${$} - ${a} ${v}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=r.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return c===a?c:`${c} \u2014 ${a}`}}};var S=class{static isUrnSource(t){return w.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return w.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},w=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},tt=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:b.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=j(e);return t.search({source:{id:s},relation:b.BIRDWATCH_URL}).firstTarget()}},rt=class{static details(t,e){let s=t.search({source:{type:"country"},relation:{relation:[b.NAME,b.FLAG]}}),r=s.search({relation:b.NAME,target:{id:e}}).firstSource(),n=j(r),o=s.search({source:n,relation:b.FLAG}).firstTarget();return{urn:r,name:e,flag:o}}static urnDetails(t,e){let s=j(e),r=t.search({source:{type:"country",id:s.id},relation:b.NAME}).firstTarget();return{urn:e,name:r}}},ns=!1,Yt=new rs([]);function Ns(i){return S.getRelation(i)!==b.RATING?[i]:[[S.getSource(i),S.getRelation(i),`urn:r\xF3:rating:${encodeURIComponent(S.getTarget(i))}`]]}function Bs(i){if(S.getRelation(i)!==b.COUNTRY)return[i];let e=`urn:r\xF3:country:${S.getTarget(i).toLowerCase().replace(" ","-")}`;return[[S.getSource(i),S.getRelation(i),e,e,S.getRelation(i),S.getTarget(i)]]}function mt(i){return ns||(Yt.add(i),Yt=Yt.flatMap(Ns).flatMap(Bs),ns=!0),Yt}var ce=class extends f{static get properties(){return{title:{type:String},triples:{type:Object},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return it.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=rt.details(this.triples,t),r=j(s);return l`<span href="#/thing/country:${r.id}" title=${t}>${e}</span>`})}render(){performance.mark(`start-album-render-${this.url}`);let t=I.encodeBitmapDataURL(this.mosaicColours),e=this.renderCountries();return l`
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
    `}};customElements.define("photo-album",ce);var he=class extends f{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,r=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,r.push(e[a])),e[a].position.top===s)r.push(e[a]);else break;let n=Math.min(...r.map(a=>a.minDate)),c=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&c!=="Invalid Date"&&(t.textContent=c)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let r=s.getAttribute("data-min-date");return r?[{position:s.getBoundingClientRect(),minDate:parseInt(r,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};customElements.define("year-cursor",he);var de=class extends f{static get properties(){return{albums:{type:Object},stats:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){let s=2e3,r=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],c=I.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==s&&(s=a,a!==r&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),yield l`
          <photo-album
            .triples=${this.triples}
            title="${o.title}"
            url="${o.url}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}" count="${o.count}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
            loading=${c}>
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats
        .stats=${this.stats.stats()}
        ></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${It(e.bind(this)())}
    </section>
    `}};customElements.define("albums-page",de);var ue=class extends f{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",ue);var pe=class extends f{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",pe);var me=class extends f{static{this.properties={urn:{type:String}}}id(){return w.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",me);var fe=class extends f{static{this.properties={urn:{type:String},triples:{type:Array}}}name(){let{type:t,id:e}=w.parseUrn(this.urn);if(X.has(t))return l`<span>${tt.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:w.parseUrn(this.urn),relation:b.NAME}).firstTarget();return console.log(this.urn),s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=w.parseUrn(this.urn);return{[y.BIRD]:"bird-link",[y.MAMMAL]:"mammal-link",[y.REPTILE]:"reptile-link",[y.AMPHIBIAN]:"amphibian-link",[y.FISH]:"fish-link",[y.INSECT]:"insect-link"}[t]??""}render(){return w.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${w.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",fe);var ge=class extends f{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),x.setIndex()}albumPhotos(t){return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s=t.search({source:{id:e.id}}).firstObject(!0);return{...e,relations:s??{}}})}albumVideos(t){return this.videos.videos().filter(e=>e.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[y.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o.relations[b.LOCATION]?.filter(c=>w.is(c,n))).filter(o=>o)));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o.relations[b.SUBJECT]?.filter(c=>w.is(c,n))).filter(o=>o)));let r=[];r=r.concat(e[y.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])r=r.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return r}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=it.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,h)=>l`
      <app-photo
        id=${a.id}
        summary=${a.relations.summary}
        loading="${I.loadingMode(h)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos().map((a,h)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),c=this?.countries.split(",").map(a=>{let{flag:h,urn:p}=rt.details(this.triples,a),d=j(p);return l`<span href="#/thing/country:${d.id}" title=${a}>${h}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${c}</p>
        <p class="photo-album-description">${Ct(this.description)}
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
    `}};customElements.define("album-page",ge);var $e=class extends f{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",$e);var ye=class extends f{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",ye);var be=class extends f{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),x.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown aperture</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${t.f_stop}</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${t.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${Ct(e??"")}`;if(w.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(w.isUrn(e)&&w.is(e,y.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(w.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>S.getRelation(e).localeCompare(S.getRelation(s))).filter(e=>!this.isIgnoredKey(S.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(S.getRelation(e))}</th>
              <td>${this.renderSemanticValue(S.getRelation(e),S.getTarget(e))}</td>
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

    <img class="u-photo thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(r)}

    ${this.exif?this.renderExif(this.exif):l``}

    </section>
    `}};customElements.define("metadata-page",be);var Ae=class extends f{static get properties(){return{}}connectedCallback(){super.connectedCallback(),x.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",Ae);var Vt=class{static loadingMode(t){return t===0?"auto":"none"}};var ve=class extends f{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}getVideos(){return this.videos.videos()}render(){let t=this.getVideos().map((e,s)=>l`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Vt.loadingMode(s)}"
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
    `}};customElements.define("videos-page",ve);var we=class extends f{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},triples:{type:Object}}}connectedCallback(){super.connectedCallback(),x.setIndex()}filterUrnImages(t,e,s){let r=[b.SUBJECT,b.LOCATION,b.RATING],n=F(this.urn);n.id==="*"&&delete n.id;let c=e.search(s).sources();return Array.from(c).flatMap(a=>t.filter(h=>h.id===a).slice(0,1))}renderSubjectPhotos(t,e){return t.sort((s,r)=>r.created_at-s.created_at).map((s,r)=>l`
      <app-photo
        id=${s.id}
        loading="${I.loadingMode(r)}"
        thumbnailUrl="${s.thumbnail_url}"
        mosaicColours="${s.mosaic_colours}"
        imageUrl="${s.full_image}"></app-photo>`)}renderSubjectAlbums(t,e,s){let r=this.filterUrnImages(t,e,s),n=new Set(r.map(o=>o.album_id));return Array.from(n).flatMap(o=>this.albums.albums().filter(c=>c.id===o)).sort((o,c)=>c.min_date-o.min_date).map(o=>l`
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
      `)}firstPhotographed(t,e,s){let n=this.filterUrnImages(t,e,s).sort((o,c)=>o.created_at-c.created_at)[0];return n?new Date(n.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=w.parseUrn(this.urn),s=this.triples.search({source:{id:t,type:e},relation:b.NAME}).firstTarget();if(s)return s;try{let r=w.parseUrn(this.urn),n=decodeURIComponent(r.id);return r.id==="*"?`${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`:X.has(r.type)?tt.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(X.has(t.type))for(let r of["captivity","wild"]){let o={...t,qs:{context:r}};s.push({label:r,query:{target:o}})}else s.push({label:"default",query:{target:t}});return s}renderPhotoSection(t){return l`<div>
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
    <div/>`}render(){let t=this.triples,e=this.images.images(),s=w.parseUrn(this.urn),r=s.type,n=t.search({source:F(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(r)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let H=n.fcode_name;o["Place Type"]=l`${H.charAt(0).toUpperCase()}${H.slice(1)}`}X.has(r)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:F(this.urn)})}</span>`);let c=n[b.WIKIPEDIA],a=n[b.BIRDWATCH_URL],h=n[b.LONGITUDE],p=n[b.LATITUDE],d;if(h&&p){let H=`https://www.google.com/maps?q=${p},${h}`;d=l`
      <a href="${H}" target="_blank" rel="noopener">[maps]</a>
      `}let m=F(this.urn);m.id==="*"&&delete m.id;let $={target:m},v=this.getPhotoQueries(F(this.urn)),T={};for(let{query:H,label:zt}of v){let os=this.filterUrnImages(e,t,H);T[zt]=this.renderSubjectPhotos(os)}let q=this.renderSubjectAlbums(e,t,$),ft=this.renderPhotoSection(T);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${X.has(r)&&s.id!=="*"?l`<span class="thing-binomial">(${tt.pretty(s.id)})</span>`:l``}
        </p>
        <br>

        ${c?l`<a href="${c}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([H,zt])=>l`
          <tr>
            <th class="exif-heading">${H}</th>
            <td>${zt}</td>
          </tr>
          `)}
        </table>

        <br>
        ${ft}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${q}
        </section>

      </div>
    `}};customElements.define("thing-page",we);var O=new Nt,R=new Pt,k=new Dt,D=new Bt,N=new jt,E=new Ht,js=[[O,u.EAGER],[R,u.EAGER],[k,u.EAGER],[D,u.EAGER],[N,u.EAGER],[E,u.EAGER]],Hs={[g.ABOUT]:[[O,u.LAZY],[R,u.LAZY],[k,u.LAZY],[D,u.LAZY],[N,u.LAZY],[E,u.EAGER]],[g.ALBUMS]:[[O,u.EAGER],[R,u.LAZY],[k,u.LAZY],[D,u.LAZY],[N,u.EAGER],[E,u.EAGER]],[g.PHOTOS]:[[O,u.EAGER],[R,u.EAGER],[k,u.EAGER],[D,u.LAZY],[N,u.LAZY],[E,u.EAGER]],[g.VIDEOS]:[[O,u.LAZY],[R,u.LAZY],[k,u.EAGER],[D,u.LAZY],[N,u.LAZY],[E,u.EAGER]],[g.ALBUM]:[[O,u.EAGER],[R,u.EAGER],[k,u.EAGER],[N,u.LAZY],[D,u.LAZY],[E,u.EAGER]],[g.PHOTO]:[[O,u.EAGER],[R,u.EAGER],[k,u.EAGER],[D,u.EAGER],[N,u.LAZY],[E,u.EAGER]],[g.METADATA]:[[O,u.LAZY],[R,u.EAGER],[k,u.EAGER],[D,u.EAGER],[N,u.LAZY],[E,u.EAGER]],[g.THING]:[[O,u.EAGER],[R,u.EAGER],[k,u.LAZY],[D,u.LAZY],[N,u.LAZY],[E,u.EAGER]]},_e=class{static async init(){let t=P.getUrl();console.log(`loading ${t?.type}`);let e=Hs[t?.type]??js,s=[];for(let[r,n]of e)n===u.EAGER?s.push(r.init()):n===u.LAZY&&r.init();await Promise.all(s)}};await _e.init();var Se=class i extends f{static{this.DEFAULT_PAGE=g.ALBUMS}static{this.LOCATION_TYPE_TO_PAGE={album:g.ALBUM,albums:g.ALBUMS,photos:g.PHOTOS,metadata:g.METADATA,about:g.ABOUT,videos:g.VIDEOS,thing:g.THING}}static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=P.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),P.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=g.PHOTOS,this.id=s,this.title=e,P.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=g.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,P.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=P.router(this.page);e||console.error(`no router found for page ${this.page}`),P.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums"){let s=mt(E._data);return l`
      <albums-page .triples=${s} .stats=${N} .albums="${O}" class="${e}"></albums-page>
      `}if(this.page===g.ABOUT)return l`<about-page class="${e}"></about-page>`;if(this.page===g.PHOTOS)return l`<photos-page class="${e}" .images=${R}></photos-page>`;if(this.page===g.ALBUM){this.id||console.error("no album id provided");let s=O.albums().find(n=>n.id===this.id);s||console.error(`failed to find album with id ${this.id}`);let r=mt(E._data);return l`
      <album-page
        .images=${R}
        .videos=${k}
        .triples=${r}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page===g.METADATA){let s=R.images().find(c=>c.id===this.id),r=D.exif().find(c=>c.id===this.id),n=E._data.filter(c=>c[0]===this.id),o={};for(let[c,a,h]of n)o[a]?typeof o[a]=="string"&&(o[a]=[o[a],h]):o[a]=h;return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${mt(E._data)}
        .image=${s}
        .semantic=${E._data} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===g.VIDEOS)return l`
      <videos-page .videos=${k} class="${e}"></videos-page>
      `;if(this.page===g.THING)return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${R}
        .albums=${O}
        .triples=${mt(E._data)}
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
    `}};customElements.define("photo-app",Se);export{js as DEFAULT_DEPENDENCIES,Hs as PAGE_DEPENDECIES,Se as PhotoApp};
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
