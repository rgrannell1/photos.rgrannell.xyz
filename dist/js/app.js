var Q=globalThis,Et=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Qt=new WeakMap,wt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Et&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Qt.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Qt.set(e,t))}return t}toString(){return this.cssText}},Ne=i=>new wt(typeof i=="string"?i:i+"",void 0,ge);var Ie=(i,t)=>{if(Et)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),a=Q.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}},Xt=Et?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Ne(e)})(i):i,{is:Re,defineProperty:Be,getOwnPropertyDescriptor:He,getOwnPropertyNames:je,getOwnPropertySymbols:Ge,getPrototypeOf:Ye}=Object,ht=globalThis,te=ht.trustedTypes,ze=te?te.emptyScript:"",Fe=ht.reactiveElementPolyfillSupport,z=(i,t)=>i,_t={toAttribute(i,t){switch(t){case Boolean:i=i?ze:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},fe=(i,t)=>!Re(i,t),ee={attribute:!0,type:String,converter:_t,reflect:!1,hasChanged:fe};Symbol.metadata??=Symbol("metadata"),ht.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=ee){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(t,s,e);a!==void 0&&Be(this.prototype,t,a)}}static getPropertyDescriptor(t,e,s){let{get:a,set:r}=He(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return a?.call(this)},set(o){let h=a?.call(this);r.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ee}static o(){if(this.hasOwnProperty(z("elementProperties")))return;let t=Ye(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(z("properties"))){let e=this.properties,s=[...je(e),...Ge(e)];for(let a of s)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,a]of e)this.elementProperties.set(s,a)}this.u=new Map;for(let[e,s]of this.elementProperties){let a=this.p(e,s);a!==void 0&&this.u.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let a of s)e.unshift(Xt(a))}else t!==void 0&&e.push(Xt(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ie(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),a=this.constructor.p(t,s);if(a!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:_t).toAttribute(e,s.type);this.m=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this.m=null}}_$AK(t,e){let s=this.constructor,a=s.u.get(t);if(a!==void 0&&this.m!==a){let r=s.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:_t;this.m=a,this[a]=o.fromAttribute(e,r.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??fe)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[a,r]of this.v)this[a]=r;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,r]of s)r.wrapped!==!0||this._$AL.has(a)||this[a]===void 0||this.T(a,this[a],r)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[z("elementProperties")]=new Map,L[z("finalized")]=new Map,Fe?.({ReactiveElement:L}),(ht.reactiveElementVersions??=[]).push("2.0.4");var Tt=globalThis,X=Tt.trustedTypes,se=X?X.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ut="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,kt="?"+M,Ve=`<${kt}>`,R=document,V=()=>R.createComment(""),W=i=>i===null||typeof i!="object"&&typeof i!="function",$e=Array.isArray,be=i=>$e(i)||typeof i?.[Symbol.iterator]=="function",At=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,ae=/>/g,N=RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,oe=/"/g,Ae=/^(?:script|style|textarea|title)$/i,ye=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=ye(1),We=ye(2),A=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ne=new WeakMap,I=R.createTreeWalker(R,129);function ve(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(t):t}var we=(i,t)=>{let e=i.length-1,s=[],a,r=t===2?"<svg>":"",o=Y;for(let h=0;h<e;h++){let n=i[h],u,f,c=-1,$=0;for(;$<n.length&&(o.lastIndex=$,f=o.exec(n),f!==null);)$=o.lastIndex,o===Y?f[1]==="!--"?o=ie:f[1]!==void 0?o=ae:f[2]!==void 0?(Ae.test(f[2])&&(a=RegExp("</"+f[2],"g")),o=N):f[3]!==void 0&&(o=N):o===N?f[0]===">"?(o=a??Y,c=-1):f[1]===void 0?c=-2:(c=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?N:f[3]==='"'?oe:re):o===oe||o===re?o=N:o===ie||o===ae?o=Y:(o=N,a=void 0);let g=o===N&&i[h+1].startsWith("/>")?" ":"";r+=o===Y?n+Ve:c>=0?(s.push(u),n.slice(0,c)+Ut+n.slice(c)+M+g):n+M+(c===-2?h:g)}return[ve(i,r+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},Z=class i{constructor({strings:t,_$litType$:e},s){let a;this.parts=[];let r=0,o=0,h=t.length-1,n=this.parts,[u,f]=we(t,e);if(this.el=i.createElement(u,s),I.currentNode=this.el.content,e===2){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=I.nextNode())!==null&&n.length<h;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(Ut)){let $=f[o++],g=a.getAttribute(c).split(M),v=/([.?@])?(.*)/.exec($);n.push({type:1,index:r,name:v[2],strings:g,ctor:v[1]==="."?et:v[1]==="?"?st:v[1]==="@"?it:H}),a.removeAttribute(c)}else c.startsWith(M)&&(n.push({type:6,index:r}),a.removeAttribute(c));if(Ae.test(a.tagName)){let c=a.textContent.split(M),$=c.length-1;if($>0){a.textContent=X?X.emptyScript:"";for(let g=0;g<$;g++)a.append(c[g],V()),I.nextNode(),n.push({type:2,index:++r});a.append(c[$],V())}}}else if(a.nodeType===8)if(a.data===kt)n.push({type:2,index:r});else{let c=-1;for(;(c=a.data.indexOf(M,c+1))!==-1;)n.push({type:7,index:r}),c+=M.length-1}r++}}static createElement(t,e){let s=R.createElement("template");return s.innerHTML=t,s}};function B(i,t,e=i,s){if(t===A)return t;let a=s!==void 0?e.U?.[s]:e.N,r=W(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(i),a._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=a:e.N=a),a!==void 0&&(t=B(i,a._$AS(i,t.values),a,s)),t}var tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,a=(t?.creationScope??R).importNode(e,!0);I.currentNode=a;let r=I.nextNode(),o=0,h=0,n=s[0];for(;n!==void 0;){if(o===n.index){let u;n.type===2?u=new ct(r,r.nextSibling,this,t):n.type===1?u=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(u=new at(r,this,t)),this._$AV.push(u),n=s[++h]}o!==n?.index&&(r=I.nextNode(),o++)}return I.currentNode=R,a}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ct=class _e{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,a){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=a,this.V=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),W(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==A&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):be(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&W(this._$AH)?this._$AA.nextSibling.data=t:this.j(R.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Z.createElement(ve(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.R(e);else{let r=new tt(a,this),o=r.O(this.options);r.R(e),this.j(o),this._$AH=r}}_$AC(t){let e=ne.get(t.strings);return e===void 0&&ne.set(t.strings,e=new Z(t)),e}D(t){$e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,a=0;for(let r of t)a===e.length?e.push(s=new _e(this.H(V()),this.H(V()),this,this.options)):s=e[a],s._$AI(r),a++;a<e.length&&(this._$AR(s&&s._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,a,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,a){let r=this.strings,o=!1;if(r===void 0)t=B(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let h=t,n,u;for(t=r[0],n=0;n<r.length-1;n++)u=B(this,h[s+n],e,n),u===A&&(u=this._$AH[n]),o||=!W(u)||u!==this._$AH[n],u===b?t=b:t!==b&&(t+=(u??"")+r[n+1]),this._$AH[n]=u}o&&!a&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends H{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},st=class extends H{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},it=class extends H{constructor(t,e,s,a,r){super(t,e,s,a,r),this.type=5}_$AI(t,e=this){if((t=B(this,t,e,0)??b)===A)return;let s=this._$AH,a=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==b&&(s===b||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}},Ze={W:Ut,q:M,J:kt,Z:1,F:we,G:tt,K:be,X:B,Y:ct,tt:H,st,it,et,ot:at},qe=Tt.litHtmlPolyfillSupport;qe?.(Z,ct),(Tt.litHtmlVersions??=[]).push("3.1.3");var Se=(i,t,e)=>{let s=e?.renderBefore??t,a=s._$litPart$;if(a===void 0){let r=e?.renderBefore??null;s._$litPart$=a=new ct(t.insertBefore(V(),r),r,void 0,e??{})}return a._$AI(i),a};var P=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Se(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return A}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var Je=globalThis.litElementPolyfillSupport;Je?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:Ke}=Ze,Qe=i=>i===null||typeof i!="object"&&typeof i!="function";var le=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,Xe=i=>i?._$litType$?.h!=null;var xe=i=>i.strings===void 0,he=()=>document.createComment(""),O=(i,t,e)=>{let s=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){let r=s.insertBefore(he(),a),o=s.insertBefore(he(),a);e=new Ke(r,o,i,i.options)}else{let r=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let n;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(n=i._$AU)!==o._$AU&&e._$AP(n)}if(r!==a||h){let n=e._$AA;for(;n!==r;){let u=n.nextSibling;s.insertBefore(n,a),n=u}}}return e},C=(i,t,e=i)=>(i._$AI(t,e),i),ts={},q=(i,t=ts)=>i._$AH=t,St=i=>i._$AH,yt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Ee=i=>{i._$AR()};var x=i=>(...t)=>({_$litDirective$:i,values:t}),T=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var F=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),F(s,t);return!0},rt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Te=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),is(t)}};function es(i){this._$AN!==void 0?(rt(this),this._$AM=i,Te(this)):this._$AM=i}function ss(i,t=!1,e=0){let s=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)F(s[r],!1),rt(s[r]);else s!=null&&(F(s,!1),rt(s));else F(this,i)}var is=i=>{i.type==2&&(i._$AP??=ss,i._$AQ??=es)},J=class extends T{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Te(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(F(this,t),rt(this))}setValue(t){if(xe(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ot=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},nt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var lt=class extends J{constructor(){super(...arguments),this.dt=new ot(this),this.ft=new nt}render(t,e){return A}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return A;this.vt=e;let a=0,{dt:r,ft:o}=this;return(async(h,n)=>{for await(let u of h)if(await n(u)===!1)return})(e,async h=>{for(;o.get();)await o.get();let n=r.deref();if(n!==void 0){if(n.vt!==e)return!1;s!==void 0&&(h=s(h,a)),n.commitValue(h,a),a++}return!0}),A}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ds=x(lt),us=x(class extends lt{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Ee(this.ht);let e=O(this.ht);C(e,i)}}),ce=i=>Xe(i)?i._$litType$.h:i.strings,ps=x(class extends T{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=le(this.bt)?ce(this.bt):null,s=le(t)?ce(t):null;if(e!==null&&(s===null||e!==s)){let a=St(i).pop(),r=this.yt.get(e);if(r===void 0){let o=document.createDocumentFragment();r=Se(b,o),r.setConnected(!1),this.yt.set(e,r)}q(r,[a]),O(r,void 0,a)}if(s!==null){if(e===null||e!==s){let a=this.yt.get(s);if(a!==void 0){let r=St(a).pop();Ee(i),O(i,void 0,r),q(i,[r])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var ms=x(class extends T{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let a=!!t[s];a===this.gt.has(s)||this.wt?.has(s)||(a?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return A}}),as={},gs=x(class extends T{constructor(){super(...arguments),this._t=as}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,a)=>s===this._t[a]))return A}else if(this._t===t)return A;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var fs=x(class extends T{constructor(){super(...arguments),this.key=b}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(q(i),this.key=t),e}}),$s=x(class extends T{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!xe(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===A||t===b)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return A;if(i.type===4){if(!!t===e.hasAttribute(s))return A;if(i.type===1&&e.getAttribute(s)===t+"")return A}}return q(i),t}});var vt=new WeakMap,bs=x(class extends J{render(i){return b}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),b}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=vt.get(t);e===void 0&&(e=new WeakMap,vt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?vt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),de=(i,t,e)=>{let s=new Map;for(let a=t;a<=e;a++)s.set(i[a],a);return s},As=x(class extends T{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let a=[],r=[],o=0;for(let h of i)a[o]=s?s(h,o):o,r[o]=e(h,o),o++;return{values:r,keys:a}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let a=St(i),{values:r,keys:o}=this.Et(t,e,s);if(!Array.isArray(a))return this.Ct=o,r;let h=this.Ct??=[],n=[],u,f,c=0,$=a.length-1,g=0,v=r.length-1;for(;c<=$&&g<=v;)if(a[c]===null)c++;else if(a[$]===null)$--;else if(h[c]===o[g])n[g]=C(a[c],r[g]),c++,g++;else if(h[$]===o[v])n[v]=C(a[$],r[v]),$--,v--;else if(h[c]===o[v])n[v]=C(a[c],r[v]),O(i,n[v+1],a[c]),c++,v--;else if(h[$]===o[g])n[g]=C(a[$],r[g]),O(i,a[c],a[$]),$--,g++;else if(u===void 0&&(u=de(o,g,v),f=de(h,c,$)),u.has(h[c]))if(u.has(h[$])){let U=f.get(o[g]),G=U!==void 0?a[U]:null;if(G===null){let Kt=O(i,a[c]);C(Kt,r[g]),n[g]=Kt}else n[g]=C(G,r[g]),O(i,a[c],G),a[U]=null;g++}else yt(a[$]),$--;else yt(a[c]),c++;for(;g<=v;){let U=O(i,n[v+1]);C(U,r[g]),n[g++]=U}for(;c<=$;){let U=a[c++];U!==null&&yt(U)}return this.Ct=o,q(i,n),A}}),Ue="important",rs=" !"+Ue,ys=x(class extends T{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let a=t[s];if(a!=null){this.Pt.add(s);let r=typeof a=="string"&&a.endsWith(rs);s.includes("-")||r?e.setProperty(s,r?a.slice(0,-11):a,r?Ue:""):e[s]=a}}return A}}),vs=x(class extends T{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?A:(this.At=i,document.importNode(i.content,!0))}}),j=class extends T{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===A)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};j.directiveName="unsafeHTML",j.resultType=1;var dt=x(j);var K=class extends j{};K.directiveName="unsafeSVG",K.resultType=2;var ws=x(K),ue=i=>!Qe(i)&&typeof i.then=="function",pe=1073741823;var xt=class extends J{constructor(){super(...arguments),this.Mt=pe,this.Ut=[],this.dt=new ot(this),this.ft=new nt}render(...t){return t.find(e=>!ue(e))??A}update(t,e){let s=this.Ut,a=s.length;this.Ut=e;let r=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let n=e[h];if(!ue(n))return this.Mt=h,n;h<a&&n===s[h]||(this.Mt=pe,a=0,Promise.resolve(n).then(async u=>{for(;o.get();)await o.get();let f=r.deref();if(f!==void 0){let c=f.Ut.indexOf(n);c>-1&&c<f.Mt&&(f.Mt=c,f.setValue(u))}}))}return A}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},_s=x(xt);var os=Symbol.for(""),ns=i=>{if(i?.r===os)return i?._$litStatic$};var me=new Map,ke=i=>(t,...e)=>{let s=e.length,a,r,o=[],h=[],n,u=0,f=!1;for(;u<s;){for(n=t[u];u<s&&(r=e[u],(a=ns(r))!==void 0);)n+=a+t[++u],f=!0;u!==s&&h.push(r),o.push(n),u++}if(u===s&&o.push(t[s]),f){let c=o.join("$$lit$$");(t=me.get(c))===void 0&&(o.raw=o,me.set(c,t=o)),e=h}return i(t,...e)},Ss=ke(l),xs=ke(We);var p=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var ut=Symbol("the albums manifest"),pt=Symbol("the images manifest"),Bs=Symbol("the site manifest"),mt=Symbol("metadata about the site manfiest"),Me=53.33306,Ce=-6.24889,Le=6,Oe="photos",m=class{static EAGER="eager";static LAZY="lazy"},d=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about"};async function ls(){return await(await fetch("/manifest/env.json")).json()}var Pe=await ls(),gt=class{_data;constructor(t=`/manifest/images.${Pe.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[pt]&&(this._data=window[pt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[pt]=e,this._data=e}images(){return this._data.map(t=>({...t,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},ft=class{_data;constructor(t=`/manifest/albums.${Pe.publication_id}.json`){this.url=t}processAlbums(t){let e=t[0],s=[];for(let a of t.slice(1)){let r={};for(let o=0;o<e.length;o++)r[e[o]]=a[o];s.push(r)}return s}async init(){if(window[ut]&&(this._data=window[ut]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processAlbums(t);window[ut]=e,this._data=e}albums(){return this._data}};function De(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let a of s)if(De(i,a,e))return!0;return!1}var $t=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[mt]&&(this._data=window[mt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[mt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return De(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let a of e)this.isChild(t,a)&&s.add(a);return s}};var w=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:{type:"albums"}}};var Mt=class extends p{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
    <aside class="${t.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${this.broadcast("navigate-page",{page:"photos"})}
            id="photos-sidebar-link" class="sidebar-item">PHOTOS</li>

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
    `}};customElements.define("photo-sidebar",Mt);var Ct=class extends p{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/feeds/index.json"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Oe;return l`
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
    `}};customElements.define("photo-header",Ct);var Lt=class extends p{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return l`
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
    `}};customElements.define("app-photo",Lt);var Ot=class extends p{render(){return l`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Ot);var D=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}};var y=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/feeds/index.json";t.href=e}};var Pt=class extends p{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${D.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",Pt);var k=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let[e,s]=t.split(" ");return`${e.replace(/\:/g,"/")} ${s}`}static findRange(t){let e=1/0,s=-1/0;for(let a of t){if(!a.date_time)continue;let r=i.parse(a.date_time);r<e&&(e=r),r>s&&(s=r)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let a=t instanceof Date?t:new Date(parseFloat(t)),r=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=a.toLocaleDateString("en-IE",o),n=r.toLocaleDateString("en-IE",o),u=a.toLocaleDateString("en-IE",{day:"numeric"}),f=r.toLocaleDateString("en-IE",{day:"numeric"}),c=a.toLocaleDateString("en-IE",{month:"short"}),$=r.toLocaleDateString("en-IE",{month:"short"}),g=a.getFullYear(),v=r.getFullYear(),U=c===$,G=g===v;return h===n?`${h} ${g}`:U&&G?`${u} - ${f} ${$} ${g}`:`${h} ${g} - ${n} ${v}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=a.toLocaleDateString("en-IE",o),n=r.toLocaleDateString("en-IE",o);return h===n?h:`${h} \u2014 ${n}`}}};var Dt=class extends p{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return k.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),l`
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
    `}};customElements.define("photo-album",Dt);var Nt=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{image_count:e}=t;if(e)return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:t.thumbnail_mosaic_url,id:t.id,count:e,flags:t.flags.split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,a=400,r=Math.floor(e/a),o=Math.floor(s/a);return t>r*o?"lazy":"eager"}render(){return performance.mark("start-albums-render"),l`
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
    `}};customElements.define("photo-album-page",Nt);var It=class extends p{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Me,Ce],Le);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let a=this.albums.albums();for(let r of Object.values(a)){let o=r.geolocation;o&&geoJSON(o,{style:function(){return{color:"red"}},onEachFeature:(h,n)=>{let u=`
            <section>
              <h3>${r.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${r.id}">
                  <img width="170" height="170" src="${r.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;n.bindPopup(u)}}).addTo(e)}}render(){return l`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",It);var Rt=class extends p{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Rt);var bt=class i{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setXTheEverythingAppFormallyKnownAsTwitter(t),i.setOpenGraph(t)}};var Bt=class extends p{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];bt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),y.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=k.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos().map((a,r)=>l`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${D.loadingMode(r)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_data_url}"
        imageUrl="${a.image_url}"></app-photo>`);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${dt(this.description)}</p>
        <br>
        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
      </section>

      <section class="photo-container">
        ${s}
      </section>
    </div>
    `}};customElements.define("album-page",Bt);var Ht=class extends p{connectedCallback(){super.connectedCallback(),y.setIndex()}render(){return l`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",Ht);var jt=class extends p{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=k.findRange(this.photos()),a=k.dateRange(e,s,t.matches);return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${a}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(r=>l`
        <app-photo
          id="${r.id}"
          tags="${r.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${r.thumbnail_url}"
          thumbnailDataUrl="${r.thumbnail_data_url}"
          imageUrl="${r.image_url}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",jt);var Gt=class extends p{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?l`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:l`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",Gt);var Yt=class extends p{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return l`<div class="photo-album">
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
    </div>`}};customElements.define("tag-album",Yt);var zt=class extends p{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return l`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return l`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_data_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return l`
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

      <section class="album-container">
        ${this.tagsFamily(this.metadata,"Mammal").sort().map(this.renderTagCover.bind(this))}
      </section>

      <h3>Birds</h3>

      <section class="album-container">
        ${this.tagsFamily(this.metadata,"Bird").sort().map(this.renderTagCover.bind(this))}
      </section>

      <h2>Planes</h2>
      <section class="album-container">
        ${this.tagsFamily(this.metadata,"Plane").sort().map(this.renderTagCover.bind(this))}
      </section>

      <br>
      <details>
        <summary>All Tags</summary>
        <ul>
          ${this.tags().map(t=>this.renderTagLink(t))}
        </ul>
      </details>
    </section>
    `}};customElements.define("tags-page",zt);var Ft=class extends p{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",Ft);var Vt=class extends p{static get properties(){return{id:{type:String},image:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),y.setIndex()}renderAperture(){return this.image.f_number==="Unknown"?l`<td>Unknown aperture</td>`:this.image.f_number==="0.0"?l`<td>Manual aperture control</td>`:l`<td>ƒ/${this.image.f_number}</td>`}renderFocalLength(){return this.image.focal_length==="Unknown"?l`${this.image.focal_length}`:this.image.focal_length==="0"?l`<td>Manual lens</td>`:l`<td>${this.image.focal_length}mm equiv.</td>`}render(){let t=this.image,e=(t.tags.sort()??[]).filter(a=>a!=="Published"&&!a.includes("\u2B50")).sort().map(a=>l`<li><tag-link tagName="${a}"></tag-link></li>`),s=t.date_time.split(" ")[0].replace(/\:/g,"-");return l`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.image_url}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?l`<br/><p>${dt(t.description)}</p>`:l``}

      <h3>Rating</h3>
      <p>${t.rating??"unrated"}</p>

      <h3>Photo Subject</h3>
      <p>${t.subject??""}</p>

      <h3>Tags</h3>
      <ul class="photo-tag-list">${e}</ul>

      <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading" title="The variance of the image's laplacian; one measure of blur. Bigger is sharper.">Blur</th>
        <td>${t.blur}</td>
      </tr>
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time><a href="#/date/${s}">
        ${k.formatExifDate(t.date_time)}
        </a></time></td>
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
        ${this.renderFocalLength()}
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1 / ${t.shutter_speed?Math.round(1/t.shutter_speed):"Unknown"}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture()}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${t.iso}</td>
      </tr>
    </table>

    </section>
    `}};customElements.define("metadata-page",Vt);var Wt=class extends p{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),y.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.date_time)return!1;let[e]=t.date_time.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>l`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${D.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_data_url}"
        imageUrl="${e.image_url}"></app-photo>`);return l`
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
    `}};customElements.define("date-page",Wt);var Zt=class extends p{static get properties(){return{}}connectedCallback(){super.connectedCallback(),y.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",Zt);var S=new ft,_=new gt,E=new $t,hs=[[S,m.EAGER],[_,m.EAGER],[E,m.EAGER]],cs={[d.ABOUT]:[[S,m.LAZY],[_,m.LAZY],[E,m.LAZY]],[d.ALBUMS]:[[S,m.EAGER],[_,m.LAZY],[E,m.LAZY]],[d.PHOTOS]:[[S,m.EAGER],[_,m.EAGER],[E,m.LAZY]],[d.ALBUM]:[[S,m.EAGER],[_,m.EAGER],[E,m.LAZY]],[d.PHOTO]:[[S,m.EAGER],[_,m.EAGER],[E,m.LAZY]],[d.DATE]:[[S,m.EAGER],[_,m.EAGER],[E,m.LAZY]],[d.TAG_ALBUM]:[[S,m.LAZY],[_,m.EAGER],[E,m.LAZY]],[d.TAG]:[[S,m.LAZY],[_,m.EAGER],[E,m.LAZY]],[d.LOCATIONS]:[[S,m.EAGER],[_,m.LAZY],[E,m.LAZY]],[d.METADATA]:[[S,m.LAZY],[_,m.EAGER],[E,m.EAGER]],[d.STATS]:[[S,m.LAZY],[_,m.LAZY],[E,m.LAZY]]},qt=class{static async init(){let t=w.getUrl();console.log(`loading ${t?.type}`);let e=cs[t?.type]??hs,s=[];for(let[a,r]of e)r===m.EAGER?s.push(a.init()):r===m.LAZY&&a.init();await Promise.all(s)}};await qt.init();var Jt=class i extends p{static DEFAULT_PAGE=d.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:d.ALBUM,albums:d.ALBUMS,photos:d.PHOTOS,date:d.DATE,"tag-album":d.TAG_ALBUM,tags:d.TAGS,locations:d.LOCATIONS,stats:d.STATS,metadata:d.METADATA,about:d.ABOUT};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=w.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===d.METADATA||this.page===d.ALBUM||this.page===d.METADATA?this.id=t.id:this.page===d.TAG_ALBUM?this.tag=t.tag:this.page===d.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=d.PHOTOS,this.id=s,this.title=e,w.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=d.TAG_ALBUM,this.tag=e,w.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:a,tags:r}=t.detail;this.page=d.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=a,this.tags=r??[],w.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===d.ABOUT?w.showAboutUrl():this.page===d.PHOTOS?w.showPhotosUrl():this.page===d.ALBUMS?w.showAlbumsUrl():this.page===d.TAGS?w.showTagsUrl():this.page===d.LOCATIONS?w.showLocationsUrl():this.page===d.STATS?w.showStatsUrl():this.page===d.PHOTOS?w.showAlbumUrl(this.id):this.page===d.METADATA?w.showMetadataUrl(this.id):this.page===d.DATE?w.showDateUrl(this.date):w.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return l`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===d.ABOUT)return l`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===d.PHOTOS)return l`<photos-page class="${e.join(" ")}" .images=${_}></photos-page>`;if(this.page===d.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(a=>a.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .images=${_}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.image_count}
        description=${s.description}
        class="${e.join(" ")}"></album-page>
      `}if(this.page===d.DATE)return console.log(this.date),l`<date-page
        .images=${_} date="${this.date}"
        ></date-page>`;if(this.page===d.TAG_ALBUM)return l`
      <tag-page tag=${this.tag} .images=${_} class="${e.join(" ")}"></tag-page>
      `;if(this.page===d.TAGS)return l`
      <tags-page class="${e.join(" ")}" .metadata=${E} .images=${_}></tags-page>
      `;if(this.page===d.LOCATIONS)return l`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===d.STATS)return l`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page==="metadata"){let s=_.images().find(a=>a.id===this.id);return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page .image=${s} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],l`
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
    `}};customElements.define("photo-app",Jt);export{hs as DEFAULT_DEPENDENCIES,cs as PAGE_DEPENDECIES,Jt as PhotoApp};
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
