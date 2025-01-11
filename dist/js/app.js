var st=globalThis,Nt=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ue=Symbol(),de=new WeakMap,Ot=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ue)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Nt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=de.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&de.set(e,t))}return t}toString(){return this.cssText}},We=i=>new Ot(typeof i=="string"?i:i+"",void 0,Ue);var qe=(i,t)=>{if(Nt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=st.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},pe=Nt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return We(e)})(i):i,{is:Je,defineProperty:Ke,getOwnPropertyDescriptor:Xe,getOwnPropertyNames:Qe,getOwnPropertySymbols:ts,getPrototypeOf:es}=Object,ut=globalThis,ue=ut.trustedTypes,ss=ue?ue.emptyScript:"",is=ut.reactiveElementPolyfillSupport,F=(i,t)=>i,Dt={toAttribute(i,t){switch(t){case Boolean:i=i?ss:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Le=(i,t)=>!Je(i,t),me={attribute:!0,type:String,converter:Dt,reflect:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),ut.litPropertyMetadata??=new WeakMap;var P=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=me){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Ke(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:a}=Xe(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let h=r?.call(this);a.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??me}static o(){if(this.hasOwnProperty(F("elementProperties")))return;let t=es(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(F("properties"))){let e=this.properties,s=[...Qe(e),...ts(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(pe(r))}else t!==void 0&&e.push(pe(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return qe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:Dt).toAttribute(e,s.type);this.m=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let a=s.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Dt;this.m=r,this[r]=o.fromAttribute(e,a.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Le)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,a]of this.v)this[r]=a;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,a]of s)a.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],a)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[F("elementProperties")]=new Map,P[F("finalized")]=new Map,is?.({ReactiveElement:P}),(ut.reactiveElementVersions??=[]).push("2.0.4");var It=globalThis,it=It.trustedTypes,ge=it?it.createPolicy("lit-html",{createHTML:i=>i}):void 0,Bt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Gt="?"+C,rs=`<${Gt}>`,j=document,q=()=>j.createComment(""),J=i=>i===null||typeof i!="object"&&typeof i!="function",Me=Array.isArray,ke=i=>Me(i)||typeof i?.[Symbol.iterator]=="function",Mt=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,$e=/>/g,B=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,Ae=/"/g,Ce=/^(?:script|style|textarea|title)$/i,Oe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),c=Oe(1),as=Oe(2),y=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ye=new WeakMap,G=j.createTreeWalker(j,129);function De(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(t):t}var Pe=(i,t)=>{let e=i.length-1,s=[],r,a=t===2?"<svg>":"",o=Z;for(let h=0;h<e;h++){let n=i[h],m,f,p=-1,$=0;for(;$<n.length&&(o.lastIndex=$,f=o.exec(n),f!==null);)$=o.lastIndex,o===Z?f[1]==="!--"?o=fe:f[1]!==void 0?o=$e:f[2]!==void 0?(Ce.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=B):f[3]!==void 0&&(o=B):o===B?f[0]===">"?(o=r??Z,p=-1):f[1]===void 0?p=-2:(p=o.lastIndex-f[2].length,m=f[1],o=f[3]===void 0?B:f[3]==='"'?Ae:be):o===Ae||o===be?o=B:o===fe||o===$e?o=Z:(o=B,r=void 0);let g=o===B&&i[h+1].startsWith("/>")?" ":"";a+=o===Z?n+rs:p>=0?(s.push(m),n.slice(0,p)+Bt+n.slice(p)+C+g):n+C+(p===-2?h:g)}return[De(i,a+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},K=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let a=0,o=0,h=t.length-1,n=this.parts,[m,f]=Pe(t,e);if(this.el=i.createElement(m,s),G.currentNode=this.el.content,e===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=G.nextNode())!==null&&n.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Bt)){let $=f[o++],g=r.getAttribute(p).split(C),_=/([.?@])?(.*)/.exec($);n.push({type:1,index:a,name:_[2],strings:g,ctor:_[1]==="."?at:_[1]==="?"?ot:_[1]==="@"?nt:Y}),r.removeAttribute(p)}else p.startsWith(C)&&(n.push({type:6,index:a}),r.removeAttribute(p));if(Ce.test(r.tagName)){let p=r.textContent.split(C),$=p.length-1;if($>0){r.textContent=it?it.emptyScript:"";for(let g=0;g<$;g++)r.append(p[g],q()),G.nextNode(),n.push({type:2,index:++a});r.append(p[$],q())}}}else if(r.nodeType===8)if(r.data===Gt)n.push({type:2,index:a});else{let p=-1;for(;(p=r.data.indexOf(C,p+1))!==-1;)n.push({type:7,index:a}),p+=C.length-1}a++}}static createElement(t,e){let s=j.createElement("template");return s.innerHTML=t,s}};function H(i,t,e=i,s){if(t===y)return t;let r=s!==void 0?e.U?.[s]:e.N,a=J(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=H(i,r._$AS(i,t.values),r,s)),t}var rt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??j).importNode(e,!0);G.currentNode=r;let a=G.nextNode(),o=0,h=0,n=s[0];for(;n!==void 0;){if(o===n.index){let m;n.type===2?m=new mt(a,a.nextSibling,this,t):n.type===1?m=new n.ctor(a,n.name,n.strings,this,t):n.type===6&&(m=new lt(a,this,t)),this._$AV.push(m),n=s[++h]}o!==n?.index&&(a=G.nextNode(),o++)}return G.currentNode=j,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},mt=class Re{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),J(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):ke(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==b&&J(this._$AH)?this._$AA.nextSibling.data=t:this.j(j.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(De(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let a=new rt(r,this),o=a.O(this.options);a.R(e),this.j(o),this._$AH=a}}_$AC(t){let e=ye.get(t.strings);return e===void 0&&ye.set(t.strings,e=new K(t)),e}D(t){Me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let a of t)r===e.length?e.push(s=new Re(this.H(q()),this.H(q()),this,this.options)):s=e[r],s._$AI(a),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,a){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,r){let a=this.strings,o=!1;if(a===void 0)t=H(this,t,e,0),o=!J(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{let h=t,n,m;for(t=a[0],n=0;n<a.length-1;n++)m=H(this,h[s+n],e,n),m===y&&(m=this._$AH[n]),o||=!J(m)||m!==this._$AH[n],m===b?t=b:t!==b&&(t+=(m??"")+a[n+1]),this._$AH[n]=m}o&&!r&&this.B(t)}B(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends Y{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===b?void 0:t}},ot=class extends Y{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},nt=class extends Y{constructor(t,e,s,r,a){super(t,e,s,r,a),this.type=5}_$AI(t,e=this){if((t=H(this,t,e,0)??b)===y)return;let s=this._$AH,r=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==b&&(s===b||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},lt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}},os={W:Bt,q:C,J:Gt,Z:1,F:Pe,G:rt,K:ke,X:H,Y:mt,tt:Y,st:ot,it:nt,et:at,ot:lt},ns=It.litHtmlPolyfillSupport;ns?.(K,mt),(It.litHtmlVersions??=[]).push("3.1.3");var Ne=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let a=e?.renderBefore??null;s._$litPart$=r=new mt(t.insertBefore(q(),a),a,void 0,e??{})}return r._$AI(i),r};var N=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};N._$litElement$=!0,N.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:N});var ls=globalThis.litElementPolyfillSupport;ls?.({LitElement:N});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:cs}=os,hs=i=>i===null||typeof i!="object"&&typeof i!="function";var _e=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,ds=i=>i?._$litType$?.h!=null;var Ie=i=>i.strings===void 0,ve=()=>document.createComment(""),R=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let a=s.insertBefore(ve(),r),o=s.insertBefore(ve(),r);e=new cs(a,o,i,i.options)}else{let a=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let n;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(n=i._$AU)!==o._$AU&&e._$AP(n)}if(a!==r||h){let n=e._$AA;for(;n!==a;){let m=n.nextSibling;s.insertBefore(n,r),n=m}}}return e},D=(i,t,e=i)=>(i._$AI(t,e),i),ps={},X=(i,t=ps)=>i._$AH=t,Pt=i=>i._$AH,kt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},Be=i=>{i._$AR()};var x=i=>(...t)=>({_$litDirective$:i,values:t}),M=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var W=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),W(s,t);return!0},ct=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},Ge=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),gs(t)}};function us(i){this._$AN!==void 0?(ct(this),this._$AM=i,Ge(this)):this._$AM=i}function ms(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let a=e;a<s.length;a++)W(s[a],!1),ct(s[a]);else s!=null&&(W(s,!1),ct(s));else W(this,i)}var gs=i=>{i.type==2&&(i._$AP??=ms,i._$AQ??=us)},Q=class extends M{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Ge(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(W(this,t),ct(this))}setValue(t){if(Ie(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ht=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},dt=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var pt=class extends Q{constructor(){super(...arguments),this.dt=new ht(this),this.ft=new dt}render(t,e){return y}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:a,ft:o}=this;return(async(h,n)=>{for await(let m of h)if(await n(m)===!1)return})(e,async h=>{for(;o.get();)await o.get();let n=a.deref();if(n!==void 0){if(n.vt!==e)return!1;s!==void 0&&(h=s(h,r)),n.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},ws=x(pt),Ss=x(class extends pt{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&Be(this.ht);let e=R(this.ht);D(e,i)}}),we=i=>ds(i)?i._$litType$.h:i.strings,Es=x(class extends M{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=_e(this.bt)?we(this.bt):null,s=_e(t)?we(t):null;if(e!==null&&(s===null||e!==s)){let r=Pt(i).pop(),a=this.yt.get(e);if(a===void 0){let o=document.createDocumentFragment();a=Ne(b,o),a.setConnected(!1),this.yt.set(e,a)}X(a,[r]),R(a,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let a=Pt(r).pop();Be(i),R(i,void 0,a),X(i,[a])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var xs=x(class extends M{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return y}}),fs={},Ts=x(class extends M{constructor(){super(...arguments),this._t=fs}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Us=x(class extends M{constructor(){super(...arguments),this.key=b}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(X(i),this.key=t),e}}),Ls=x(class extends M{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ie(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===y||t===b)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return y;if(i.type===4){if(!!t===e.hasAttribute(s))return y;if(i.type===1&&e.getAttribute(s)===t+"")return y}}return X(i),t}});var Ct=new WeakMap,Ms=x(class extends Q{render(i){return b}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),b}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Ct.get(t);e===void 0&&(e=new WeakMap,Ct.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Ct.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Se=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},ks=x(class extends M{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],a=[],o=0;for(let h of i)r[o]=s?s(h,o):o,a[o]=e(h,o),o++;return{values:a,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Pt(i),{values:a,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,a;let h=this.Ct??=[],n=[],m,f,p=0,$=r.length-1,g=0,_=a.length-1;for(;p<=$&&g<=_;)if(r[p]===null)p++;else if(r[$]===null)$--;else if(h[p]===o[g])n[g]=D(r[p],a[g]),p++,g++;else if(h[$]===o[_])n[_]=D(r[$],a[_]),$--,_--;else if(h[p]===o[_])n[_]=D(r[p],a[_]),R(i,n[_+1],r[p]),p++,_--;else if(h[$]===o[g])n[g]=D(r[$],a[g]),R(i,r[p],r[$]),$--,g++;else if(m===void 0&&(m=Se(o,g,_),f=Se(h,p,$)),m.has(h[p]))if(m.has(h[$])){let k=f.get(o[g]),z=k!==void 0?r[k]:null;if(z===null){let he=R(i,r[p]);D(he,a[g]),n[g]=he}else n[g]=D(z,a[g]),R(i,r[p],z),r[k]=null;g++}else kt(r[$]),$--;else kt(r[p]),p++;for(;g<=_;){let k=R(i,n[_+1]);D(k,a[g]),n[g++]=k}for(;p<=$;){let k=r[p++];k!==null&&kt(k)}return this.Ct=o,X(i,n),y}}),je="important",$s=" !"+je,Cs=x(class extends M{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let a=typeof r=="string"&&r.endsWith($s);s.includes("-")||a?e.setProperty(s,a?r.slice(0,-11):r,a?je:""):e[s]=r}}return y}}),Os=x(class extends M{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?y:(this.At=i,document.importNode(i.content,!0))}}),V=class extends M{constructor(t){if(super(t),this.bt=b,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===b||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};V.directiveName="unsafeHTML",V.resultType=1;var gt=x(V);var tt=class extends V{};tt.directiveName="unsafeSVG",tt.resultType=2;var Ds=x(tt),Ee=i=>!hs(i)&&typeof i.then=="function",xe=1073741823;var Rt=class extends Q{constructor(){super(...arguments),this.Mt=xe,this.Ut=[],this.dt=new ht(this),this.ft=new dt}render(...t){return t.find(e=>!Ee(e))??y}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let a=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let n=e[h];if(!Ee(n))return this.Mt=h,n;h<r&&n===s[h]||(this.Mt=xe,r=0,Promise.resolve(n).then(async m=>{for(;o.get();)await o.get();let f=a.deref();if(f!==void 0){let p=f.Ut.indexOf(n);p>-1&&p<f.Mt&&(f.Mt=p,f.setValue(m))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ps=x(Rt);var bs=Symbol.for(""),As=i=>{if(i?.r===bs)return i?._$litStatic$};var Te=new Map,He=i=>(t,...e)=>{let s=e.length,r,a,o=[],h=[],n,m=0,f=!1;for(;m<s;){for(n=t[m];m<s&&(a=e[m],(r=As(a))!==void 0);)n+=r+t[++m],f=!0;m!==s&&h.push(a),o.push(n),m++}if(m===s&&o.push(t[s]),f){let p=o.join("$$lit$$");(t=Te.get(p))===void 0&&(o.raw=o,Te.set(p,t=o)),e=h}return i(t,...e)},Rs=He(c),Ns=He(as);var u=class extends N{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var ft=Symbol("the albums manifest"),$t=Symbol("the images manifest"),Ks=Symbol("the site manifest"),bt=Symbol("metadata about the site manifest"),At=Symbol("the videos manifest"),yt=Symbol("the exif data"),_t=Symbol("the semantic data"),Ye=53.33306,Ve=-6.24889,ze=6,Ze="photos",l=class{static EAGER="eager";static LAZY="lazy"},d=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function ys(i="/manifest/env.json"){return await(await fetch(i)).json()}var et=await ys(),vt=class{_data;constructor(t=`/manifest/images.${et.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];s.push(a)}return s}async init(){if(window[$t]&&(this._data=window[$t]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[$t]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}))}},wt=class{_data;constructor(t=`/manifest/videos.${et.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];s.push(a)}return s}async init(){if(window[At]&&(this._data=window[At]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[At]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},St=class{_data;constructor(t=`/manifest/albums.${et.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];s.push(a)}return s}async init(){if(window[ft]&&(this._data=window[ft]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[ft]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Et=class{_data;constructor(t=`/manifest/exif.${et.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let a={};for(let o=0;o<e.length;o++)a[e[o]]=r[o];s.push(a)}return s}async init(){if(window[yt]&&(this._data=window[yt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[yt]=e,this._data=e}exif(){return this._data}};function Fe(i,t,e){if(!i.hasOwnProperty(t))return!1;let s=i[t];if(s.includes(e))return!0;for(let r of s)if(Fe(i,r,e))return!0;return!1}var xt=class{_data;constructor(t=`/manifest/semantic.${et.publication_id}.json`){this.url=t}async init(){if(window[_t]&&(this._data=window[_t]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[_t]=t,this._data=t}semantic(){return this._data}},Tt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[bt]&&(this._data=window[bt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[bt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Fe(this._data,t,e)}childrenOf(t,e){let s=new Set([]);for(let r of e)this.isChild(t,r)&&s.add(r);return s}};var v=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var jt=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),c`
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
    `}};customElements.define("photo-sidebar",jt);var Ht=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/feed.json"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Ze;return c`
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
    `}};customElements.define("photo-header",Ht);var Yt=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return c`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:this.thumbnailDataUrl,tags:this.tags};return c`
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
    `}};customElements.define("app-photo",Yt);var Vt=class extends u{render(){return c`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",Vt);var I=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(s/r);return t>a*o+1?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/feed.json";t.href=e}};var zt=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images()}render(){let t=this.allImages().map((e,s)=>c`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return c`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",zt);var O=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let a=i.parse(r.created_at);a<e&&(e=a),a>s&&(s=a)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),a=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",o),n=a.toLocaleDateString("en-IE",o),m=r.toLocaleDateString("en-IE",{day:"numeric"}),f=a.toLocaleDateString("en-IE",{day:"numeric"}),p=r.toLocaleDateString("en-IE",{month:"short"}),$=a.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),_=a.getFullYear(),k=p===$,z=g===_;return h===n?`${h} ${g}`:k&&z?`${m} - ${f} ${$} ${g}`:`${h} ${g} - ${n} ${_}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",o),n=a.toLocaleDateString("en-IE",o);return h===n?h:`${h} \u2014 ${n}`}}};var Zt=class extends u{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return O.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),c`
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
    `}};customElements.define("photo-album",Zt);var Ft=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}})}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(s/r);return t>a*o?"lazy":"eager"}render(){return performance.mark("start-albums-render"),c`
    <section class="album-metadata">
      <h1>Albums</h1>
      <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let s=this.loadingMode(e);return c`
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
    `}};customElements.define("photo-album-page",Ft);var Wt=class extends u{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([Ye,Ve],ze);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let r=this.albums.albums();for(let a of Object.values(r)){let o=a.geolocation;o&&geoJSON(o,{style:function(){return{color:"red"}},onEachFeature:(h,n)=>{let m=`
            <section>
              <h3>${a.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${a.id}">
                  <img width="170" height="170" src="${a.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;n.bindPopup(m)}}).addTo(e)}}render(){return c`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",Wt);var qt=class extends u{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return c`
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
    `}};customElements.define("app-video",qt);var Jt=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Jt);var Ut=class i{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){i.setXTheEverythingAppFormallyKnownAsTwitter(t),i.setOpenGraph(t)}};var Kt=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Ut.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return console.log(this),this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=O.dateRange(this.minDate,this.maxDate,t.matches),s=this.albumPhotos().map((a,o)=>c`
      <app-photo
        id=${a.id}
        tags="${a.tags}"
        loading="${I.loadingMode(o)}"
        thumbnailUrl="${a.thumbnail_url}"
        thumbnailDataUrl="${a.thumbnail_mosaic_url}"
        imageUrl="${a.full_image}"></app-photo>`),r=this.albumVideos().map((a,o)=>c`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`);return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${gt(this.description)}</p>
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
    `}};customElements.define("album-page",Kt);var Xt=class extends u{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return c`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",Xt);var Qt=class extends u{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,s]=O.findRange(this.photos()),r=O.dateRange(e,s,t.matches);return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${r}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(a=>c`
        <app-photo
          id="${a.id}"
          tags="${a.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${a.thumbnail_url}"
          thumbnailDataUrl="${a.thumbnail_mosaic_url}"
          imageUrl="${a.full_image}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",Qt);var te=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?c`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:c`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",te);var ee=class extends u{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return c`<div class="photo-album">
      <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.thumbnailDataUrl}"/>

      <img
        @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
        class="thumbnail-image" width="400" height="400" src="${this.url}" title="${t}" alt="${t} - Tag Photo Album Thumbnail"
        @click=${this.broadcast("click-tag",{tagName:t})}
        loading="${this.loading}"/>

      <br>
      <p>${t}</p>

      <!-- Add links to wikipedia and birdwatch -->
      ${this?.links?.wikipedia?c`<a href="${this.links.wikipedia}">[wiki]</a>`:""}
      ${this?.links?.birdwatch?c`<a href="${this.links.birdwatch}">[birdwatch]</a>`:""}
    </div>`}};customElements.define("tag-album",ee);var se=class extends u{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let s of e.tags)t[s]||(t[s]=0),t[s]++;return Object.entries(t).toSorted((e,s)=>e[0].localeCompare(s[0]))}renderTagLink(t){return c`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(s=>s.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),s=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return c`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_mosaic_url}" tagName=${t} .links=${s}>`}tagsFamily(t,e){let s=new Set(t._data[e].children);return Array.from(s).sort()}render(){return c`
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
    `}};customElements.define("tags-page",se);var ie=class extends u{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",ie);var re=class extends u{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?c`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?c`<td>Manual aperture control</td>`:c`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?c`${this.exif.focal_length}`:this.exif.focal_length==="0"?c`<td>Manual lens</td>`:c`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?c`<em>${e}</em>`:e}renderSemanticData(t){return c`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>c`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,s=this.semantic;return c`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?c`<br/><p>${gt(t.description)}</p>`:c``}

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
    `}};customElements.define("metadata-page",re);var ae=class extends u{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.created_at)return!1;let[e]=t.created_at.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,s)=>c`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${I.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return c`
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
    `}};customElements.define("date-page",ae);var oe=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return c`
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
    `}};customElements.define("about-page",oe);var Lt=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,a=Math.floor(e/r),o=Math.floor(s/r),h=t>a*o+1;return t===0?"auto":"none"}};var ne=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,s)=>c`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Lt.loadingMode(s)}"
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
    `}};customElements.define("videos-page",ne);var S=new St,w=new vt,E=new wt,T=new Tt,U=new Et,L=new xt,_s=[[S,l.EAGER],[w,l.EAGER],[E,l.EAGER],[T,l.EAGER],[U,l.EAGER],[L,l.EAGER]],vs={[d.ABOUT]:[[S,l.LAZY],[w,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.ALBUMS]:[[S,l.EAGER],[w,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.PHOTOS]:[[S,l.EAGER],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.VIDEOS]:[[S,l.LAZY],[w,l.LAZY],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.ALBUM]:[[S,l.EAGER],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.PHOTO]:[[S,l.EAGER],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.DATE]:[[S,l.EAGER],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.TAG_ALBUM]:[[S,l.LAZY],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.TAG]:[[S,l.LAZY],[w,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.LOCATIONS]:[[S,l.EAGER],[w,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.METADATA]:[[S,l.LAZY],[w,l.EAGER],[E,l.EAGER],[T,l.EAGER],[U,l.EAGER],[L,l.EAGER]],[d.STATS]:[[S,l.LAZY],[w,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]]},le=class{static async init(){let t=v.getUrl();console.log(`loading ${t?.type}`);let e=vs[t?.type]??_s,s=[];for(let[r,a]of e)a===l.EAGER?s.push(r.init()):a===l.LAZY&&r.init();await Promise.all(s)}};await le.init();var ce=class i extends u{static DEFAULT_PAGE=d.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:d.ALBUM,albums:d.ALBUMS,photos:d.PHOTOS,date:d.DATE,"tag-album":d.TAG_ALBUM,tags:d.TAGS,locations:d.LOCATIONS,stats:d.STATS,metadata:d.METADATA,about:d.ABOUT,videos:d.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=v.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),this.page===d.METADATA||this.page===d.ALBUM||this.page===d.METADATA?this.id=t.id:this.page===d.TAG_ALBUM?this.tag=t.tag:this.page===d.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=d.PHOTOS,this.id=s,this.title=e,v.showAlbumUrl(s)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=d.TAG_ALBUM,this.tag=e,v.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r,tags:a}=t.detail;this.page=d.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,this.tags=a??[],v.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===d.ABOUT?v.showAboutUrl():this.page===d.PHOTOS?v.showPhotosUrl():this.page===d.ALBUMS?v.showAlbumsUrl():this.page===d.TAGS?v.showTagsUrl():this.page===d.LOCATIONS?v.showLocationsUrl():this.page===d.STATS?v.showStatsUrl():this.page===d.PHOTOS?v.showAlbumUrl(this.id):this.page===d.METADATA?v.showMetadataUrl(this.id):this.page===d.DATE?v.showDateUrl(this.date):this.page===d.VIDEOS?v.showVideosUrl():v.showAlbumsUrl(),this.sidebarVisible=!1}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return c`
      <photo-album-page .albums="${S}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===d.ABOUT)return c`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===d.PHOTOS)return c`<photos-page class="${e.join(" ")}" .images=${w}></photos-page>`;if(this.page===d.ALBUM){this.id||console.error("no album id provided");let s=S.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),c`
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
      `}if(this.page===d.DATE)return console.log(this.date),c`<date-page
        .images=${w} date="${this.date}"
        ></date-page>`;if(this.page===d.TAG_ALBUM)return c`
      <tag-page tag=${this.tag} .images=${w} class="${e.join(" ")}"></tag-page>
      `;if(this.page===d.TAGS)return c`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${w}></tags-page>
      `;if(this.page===d.LOCATIONS)return c`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===d.STATS)return c`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page===d.METADATA){let s=w.images().find(h=>h.id===this.id),r=U.exif().find(h=>h.id===this.id),a=L.semantic().filter(h=>h[0]===this.id),o={};for(let[h,n,m]of a)o[n]?typeof o[n]=="string"&&(o[n]=[o[n],m]):o[n]=m;return s||console.error(`failed to find photo with id ${this.id}`),c`
      <metadata-page .image=${s} .semantic=${o} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===d.VIDEOS)return c`
      <videos-page .videos=${E} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,s=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),s.push("dark-mode")):e.classList=[],c`
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
    `}};customElements.define("photo-app",ce);export{_s as DEFAULT_DEPENDENCIES,vs as PAGE_DEPENDECIES,ce as PhotoApp};
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
