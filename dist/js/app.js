var lt=globalThis,Dt=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),ce=new WeakMap,Et=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Dt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ce.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(e,t))}return t}toString(){return this.cssText}},es=r=>new Et(typeof r=="string"?r:r+"",void 0,Ie);var ss=(r,t)=>{if(Dt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=lt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},he=Dt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return es(e)})(r):r,{is:rs,defineProperty:is,getOwnPropertyDescriptor:ns,getOwnPropertyNames:os,getOwnPropertySymbols:as,getPrototypeOf:ls}=Object,yt=globalThis,de=yt.trustedTypes,cs=de?de.emptyScript:"",hs=yt.reactiveElementPolyfillSupport,Z=(r,t)=>r,kt={toAttribute(r,t){switch(t){case Boolean:r=r?cs:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ue=(r,t)=>!rs(r,t),ue={attribute:!0,type:String,converter:kt,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??=Symbol("metadata"),yt.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=ue){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&is(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=ns(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let h=i?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ue}static o(){if(this.hasOwnProperty(Z("elementProperties")))return;let t=ls(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(Z("properties"))){let e=this.properties,s=[...os(e),...as(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this.u=new Map;for(let[e,s]of this.elementProperties){let i=this.p(e,s);i!==void 0&&this.u.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(he(i))}else t!==void 0&&e.push(he(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ss(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor.p(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:kt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this.m=null}}_$AK(t,e){let s=this.constructor,i=s.u.get(t);if(i!==void 0&&this.m!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:kt;this.m=i;let h=o.fromAttribute(e,n.type);this[i]=h??this.T?.get(i)??h,this.m=null}}requestUpdate(t,e,s){if(t!==void 0){let i=this.constructor,n=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Ue)(n,e)||s.useDefault&&s.reflect&&n===this.T?.get(t)&&!this.hasAttribute(i.p(t,s))))return;this.M(t,e,s)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this.T??=new Map).has(t)&&(this.T.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[i,n]of this.v)this[i]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.M(i,void 0,n,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.U()}catch(s){throw t=!1,this.U(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach(e=>this.C(e,this[e])),this.U()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[Z("elementProperties")]=new Map,O[Z("finalized")]=new Map,hs?.({ReactiveElement:O}),(yt.reactiveElementVersions??=[]).push("2.1.1");var Pt=globalThis,ct=Pt.trustedTypes,pe=ct?ct.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ot="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+M,ds=`<${Lt}>`,H=document,et=()=>H.createComment(""),st=r=>r===null||typeof r!="object"&&typeof r!="function",Nt=Array.isArray,Te=r=>Nt(r)||typeof r?.[Symbol.iterator]=="function",Ut=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,ge=/>/g,j=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,be=/"/g,Ce=/^(?:script|style|textarea|title)$/i,jt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),l=jt(1),us=jt(2),Ps=jt(3),x=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),$e=new WeakMap,B=H.createTreeWalker(H,129);function Ee(r,t){if(!Nt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pe!==void 0?pe.createHTML(t):t}var ke=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=X;for(let h=0;h<e;h++){let a=r[h],c,u,d=-1,m=0;for(;m<a.length&&(o.lastIndex=m,u=o.exec(a),u!==null);)m=o.lastIndex,o===X?u[1]==="!--"?o=me:u[1]!==void 0?o=ge:u[2]!==void 0?(Ce.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=j):u[3]!==void 0&&(o=j):o===j?u[0]===">"?(o=i??X,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?j:u[3]==='"'?be:fe):o===be||o===fe?o=j:o===me||o===ge?o=X:(o=j,i=void 0);let p=o===j&&r[h+1].startsWith("/>")?" ":"";n+=o===X?a+ds:d>=0?(s.push(c),a.slice(0,d)+Ot+a.slice(d)+M+p):a+M+(d===-2?h:p)}return[Ee(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},rt=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,h=t.length-1,a=this.parts,[c,u]=ke(t,e);if(this.el=r.createElement(c,s),B.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=B.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Ot)){let m=u[o++],p=i.getAttribute(d).split(M),f=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:f[2],strings:p,ctor:f[1]==="."?dt:f[1]==="?"?ut:f[1]==="@"?pt:z}),i.removeAttribute(d)}else d.startsWith(M)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Ce.test(i.tagName)){let d=i.textContent.split(M),m=d.length-1;if(m>0){i.textContent=ct?ct.emptyScript:"";for(let p=0;p<m;p++)i.append(d[p],et()),B.nextNode(),a.push({type:2,index:++n});i.append(d[m],et())}}}else if(i.nodeType===8)if(i.data===Lt)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(M,d+1))!==-1;)a.push({type:7,index:n}),d+=M.length-1}n++}}static createElement(t,e){let s=H.createElement("template");return s.innerHTML=t,s}};function V(r,t,e=r,s){if(t===x)return t;let i=s!==void 0?e.N?.[s]:e.O,n=st(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e.N??=[])[s]=i:e.O=i),i!==void 0&&(t=V(r,i._$AS(r,t.values),i,s)),t}var ht=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);B.currentNode=i;let n=B.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new wt(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new mt(n,this,t)),this._$AV.push(c),a=s[++h]}o!==a?.index&&(n=B.nextNode(),o++)}return B.currentNode=H,i}V(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},wt=class Me{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.D=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),st(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==x&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):Te(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==$&&st(this._$AH)?this._$AA.nextSibling.data=t:this.I(H.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=rt.createElement(Ee(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.V(e);else{let n=new ht(i,this),o=n.R(this.options);n.V(e),this.I(o),this._$AH=n}}_$AC(t){let e=$e.get(t.strings);return e===void 0&&$e.set(t.strings,e=new rt(t)),e}H(t){Nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new Me(this.B(et()),this.B(et()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=V(this,t,e,0),o=!st(t)||t!==this._$AH&&t!==x,o&&(this._$AH=t);else{let h=t,a,c;for(t=n[0],a=0;a<n.length-1;a++)c=V(this,h[s+a],e,a),c===x&&(c=this._$AH[a]),o||=!st(c)||c!==this._$AH[a],c===$?t=$:t!==$&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!i&&this.W(t)}W(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},dt=class extends z{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===$?void 0:t}},ut=class extends z{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},pt=class extends z{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=V(this,t,e,0)??$)===x)return;let s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}},ps={q:Ot,J:M,Z:Lt,F:1,G:ke,K:ht,X:Te,Y:V,tt:wt,st:z,it:ut,et:pt,ht:dt,ot:mt},ms=Pt.litHtmlPolyfillSupport;ms?.(rt,wt),(Pt.litHtmlVersions??=[]).push("3.3.1");var Re=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new wt(t.insertBefore(et(),n),n,void 0,e??{})}return i._$AI(r),i},Bt=globalThis;var E=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return x}};E._$litElement$=!0,E.finalized=!0,Bt.litElementHydrateSupport?.({LitElement:E});var gs=Bt.litElementPolyfillSupport;gs?.({LitElement:E});(Bt.litElementVersions??=[]).push("4.2.1");var{tt:fs}=ps,bs=r=>r===null||typeof r!="object"&&typeof r!="function";var ye=(r,t)=>t===void 0?r?._$litType$!==void 0:r?._$litType$===t,$s=r=>r?._$litType$?.h!=null;var De=r=>r.strings===void 0,we=()=>document.createComment(""),L=(r,t,e)=>{let s=r._$AA.parentNode,i=t===void 0?r._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(we(),i),o=s.insertBefore(we(),i);e=new fs(n,o,r,r.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==r;if(h){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==o._$AU&&e._$AP(a)}if(n!==i||h){let a=e._$AA;for(;a!==n;){let c=a.nextSibling;s.insertBefore(a,i),a=c}}}return e},P=(r,t,e=r)=>(r._$AI(t,e),r),ys={},it=(r,t=ys)=>r._$AH=t,Mt=r=>r._$AH,Tt=r=>{r._$AR(),r._$AA.remove()},Pe=r=>{r._$AR()};var T=r=>(...t)=>({_$litDirective$:r,values:t}),C=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.ct=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var tt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),tt(s,t);return!0},gt=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Oe=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),xs(t)}};function ws(r){this._$AN!==void 0?(gt(this),this._$AM=r,Oe(this)):this._$AM=r}function vs(r,t=!1,e=0){let s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)tt(s[n],!1),gt(s[n]);else s!=null&&(tt(s,!1),gt(s));else tt(this,r)}var xs=r=>{r.type==2&&(r._$AP??=vs,r._$AQ??=ws)},nt=class extends C{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Oe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(tt(this,t),gt(this))}setValue(t){if(De(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ft=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},bt=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise(t=>this.dt=t)}resume(){this.dt?.(),this.ut=this.dt=void 0}};var $t=class extends nt{constructor(){super(...arguments),this.ft=new ft(this),this.vt=new bt}render(t,e){return x}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.yt)return x;this.yt=e;let i=0,{ft:n,vt:o}=this;return(async(h,a)=>{for await(let c of h)if(await a(c)===!1)return})(e,async h=>{for(;o.get();)await o.get();let a=n.deref();if(a!==void 0){if(a.yt!==e)return!1;s!==void 0&&(h=s(h,i)),a.commitValue(h,i),i++}return!0}),x}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Os=T($t),Q=T(class extends $t{constructor(r){if(super(r),r.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(r,t){return this.rt=r,super.update(r,t)}commitValue(r,t){t===0&&Pe(this.rt);let e=L(this.rt);P(e,r)}}),ve=r=>$s(r)?r._$litType$.h:r.strings,Ls=T(class extends C{constructor(r){super(r),this.bt=new WeakMap}render(r){return[r]}update(r,[t]){let e=ye(this.gt)?ve(this.gt):null,s=ye(t)?ve(t):null;if(e!==null&&(s===null||e!==s)){let i=Mt(r).pop(),n=this.bt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Re($,o),n.setConnected(!1),this.bt.set(e,n)}it(n,[i]),L(n,void 0,i)}if(s!==null){if(e===null||e!==s){let i=this.bt.get(s);if(i!==void 0){let n=Mt(i).pop();Pe(r),L(r,void 0,n),it(r,[n])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var Ns=T(class extends C{constructor(r){if(super(r),r.type!==1||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(t=>r[t]).join(" ")+" "}update(r,[t]){if(this.wt===void 0){this.wt=new Set,r.strings!==void 0&&(this._t=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this._t?.has(s)&&this.wt.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.wt)s in t||(e.remove(s),this.wt.delete(s));for(let s in t){let i=!!t[s];i===this.wt.has(s)||this._t?.has(s)||(i?(e.add(s),this.wt.add(s)):(e.remove(s),this.wt.delete(s)))}return x}}),Ss={},js=T(class extends C{constructor(){super(...arguments),this.St=Ss}render(r,t){return t()}update(r,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every((s,i)=>s===this.St[i]))return x}else if(this.St===t)return x;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Bs=T(class extends C{constructor(){super(...arguments),this.key=$}render(r,t){return this.key=r,t}update(r,[t,e]){return t!==this.key&&(it(r),this.key=t),e}}),Hs=T(class extends C{constructor(r){if(super(r),r.type!==3&&r.type!==1&&r.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!De(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[t]){if(t===x||t===$)return t;let e=r.element,s=r.name;if(r.type===3){if(t===e[s])return x}else if(r.type===4){if(!!t===e.hasAttribute(s))return x}else if(r.type===1&&e.getAttribute(s)===t+"")return x;return it(r),t}});var Ct=new WeakMap,Vs=T(class extends nt{render(r){return $}update(r,[t]){let e=t!==this.lt;return e&&this.lt!==void 0&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=r.options?.host,this.$t(this.xt=r.element)),$}$t(r){if(this.isConnected||(r=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=Ct.get(t);e===void 0&&(e=new WeakMap,Ct.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,r),r!==void 0&&this.lt.call(this.Et,r)}else this.lt.value=r}get Tt(){return typeof this.lt=="function"?Ct.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),xe=(r,t,e)=>{let s=new Map;for(let i=t;i<=e;i++)s.set(r[i],i);return s},zs=T(class extends C{constructor(r){if(super(r),r.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let i=[],n=[],o=0;for(let h of r)i[o]=s?s(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:i}}render(r,t,e){return this.Ct(r,t,e).values}update(r,[t,e,s]){let i=Mt(r),{values:n,keys:o}=this.Ct(t,e,s);if(!Array.isArray(i))return this.Pt=o,n;let h=this.Pt??=[],a=[],c,u,d=0,m=i.length-1,p=0,f=n.length-1;for(;d<=m&&p<=f;)if(i[d]===null)d++;else if(i[m]===null)m--;else if(h[d]===o[p])a[p]=P(i[d],n[p]),d++,p++;else if(h[m]===o[f])a[f]=P(i[m],n[f]),m--,f--;else if(h[d]===o[f])a[f]=P(i[d],n[f]),L(r,a[f+1],i[d]),d++,f--;else if(h[m]===o[p])a[p]=P(i[m],n[p]),L(r,i[d],i[m]),m--,p++;else if(c===void 0&&(c=xe(o,p,f),u=xe(h,d,m)),c.has(h[d]))if(c.has(h[m])){let S=u.get(o[p]),N=S!==void 0?i[S]:null;if(N===null){let at=L(r,i[d]);P(at,n[p]),a[p]=at}else a[p]=P(N,n[p]),L(r,i[d],N),i[S]=null;p++}else Tt(i[m]),m--;else Tt(i[d]),d++;for(;p<=f;){let S=L(r,a[f+1]);P(S,n[p]),a[p++]=S}for(;d<=m;){let S=i[d++];S!==null&&Tt(S)}return this.Pt=o,it(r,a),x}}),Le="important",As=" !"+Le,Fs=T(class extends C{constructor(r){if(super(r),r.type!==1||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let s=r[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(r,[t]){let{style:e}=r.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let s of this.Mt)t[s]==null&&(this.Mt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.Mt.add(s);let n=typeof i=="string"&&i.endsWith(As);s.includes("-")||n?e.setProperty(s,n?i.slice(0,-11):i,n?Le:""):e[s]=i}}return x}}),qs=T(class extends C{constructor(r){if(super(r),r.type!==2)throw Error("templateContent can only be used in child bindings")}render(r){return this.At===r?x:(this.At=r,document.importNode(r.content,!0))}}),G=class extends C{constructor(t){if(super(t),this.gt=$,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this.kt=void 0,this.gt=t;if(t===x)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};G.directiveName="unsafeHTML",G.resultType=1;var vt=T(G);var ot=class extends G{};ot.directiveName="unsafeSVG",ot.resultType=2;var Ws=T(ot),Se=r=>!bs(r)&&typeof r.then=="function",Ae=1073741823;var Rt=class extends nt{constructor(){super(...arguments),this.Ot=Ae,this.Ut=[],this.ft=new ft(this),this.vt=new bt}render(...t){return t.find(e=>!Se(e))??x}update(t,e){let s=this.Ut,i=s.length;this.Ut=e;let n=this.ft,o=this.vt;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Ot);h++){let a=e[h];if(!Se(a))return this.Ot=h,a;h<i&&a===s[h]||(this.Ot=Ae,i=0,Promise.resolve(a).then(async c=>{for(;o.get();)await o.get();let u=n.deref();if(u!==void 0){let d=u.Ut.indexOf(a);d>-1&&d<u.Ot&&(u.Ot=d,u.setValue(c))}}))}return x}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Gs=T(Rt);var _s=Symbol.for(""),Is=r=>{if(r?.r===_s)return r?._$litStatic$};var _e=new Map,Ne=r=>(t,...e)=>{let s=e.length,i,n,o=[],h=[],a,c=0,u=!1;for(;c<s;){for(a=t[c];c<s&&(n=e[c],(i=Is(n))!==void 0);)a+=i+t[++c],u=!0;c!==s&&h.push(n),o.push(a),c++}if(c===s&&o.push(t[s]),u){let d=o.join("$$lit$$");(t=_e.get(d))===void 0&&(o.raw=o,_e.set(d,t=o)),e=h}return r(t,...e)},Qs=Ne(l),Ks=Ne(us);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");var g=class extends E{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var je=class{#t;#e;#s;constructor(){this.#t=0,this.#e=new Map,this.#s=new Map}map(){return this.#e}reverseMap(){return this.#s}add(r){return this.#e.has(r)?this.#e.get(r):(this.#e.set(r,this.#t),this.#s.set(this.#t,r),this.#t++,this.#t-1)}setIndex(r,t){this.#e.set(r,t),this.#s.set(t,r)}getIndex(r){return this.#e.get(r)}getValue(r){return this.#s.get(r)}has(r){return this.#e.has(r)}},Be=class{static intersection(r,t){if(t.length===0)return new Set;t.sort((s,i)=>s.size-i.size);let e=new Set(t[0]);for(let s=1;s<t.length;s++){let i=t[s];for(let n of e)r.setCheck(),i.has(n)||e.delete(n);if(e.size===0)break}return e}},He=class{stringIndex;constructor(){this.stringIndex=new je}parseTriple(r){let t=r.match(/^(\d+) (\d+) (\d+)$/);if(!t)throw new SyntaxError(`Invalid format for triple line: ${r}`);let e=this.stringIndex.getValue(parseInt(t[1],10)),s=this.stringIndex.getValue(parseInt(t[2],10)),i=this.stringIndex.getValue(parseInt(t[3],10));if(e===void 0||s===void 0||i===void 0)throw new SyntaxError(`Invalid triple reference: ${r}`);return[e,s,i]}parseDeclaration(r){let t=r.match(/^(\d+) "(.*)"$/);if(!t)throw new SyntaxError(`Invalid format for declaration line: ${r}`);let e=t[1],s=t[2];this.stringIndex.setIndex(s,parseInt(e,10))}parse(r){if(/^(\d+)\s(\d+)\s(\d+)$/.test(r))return this.parseTriple(r);this.parseDeclaration(r)}};function A(r,t="r\xF3"){if(!r.startsWith(`urn:${t}:`))throw new Error(`Invalid URN for namespace ${t}: ${r}`);let e=r.split(":")[2],[s,i]=r.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}function I(r,t="r\xF3"){try{return A(r,t)}catch{return{type:"unknown",id:r,qs:{}}}}var Us=class{mapReadCount;constructor(){this.mapReadCount=0}mapRead(){this.mapReadCount++}},Ts=class{setCheckCount;constructor(){this.setCheckCount=0}setCheck(){this.setCheckCount++}},Cs=class{indexedTriples;stringIndex;sourceType;sourceId;sourceQs;relations;targetType;targetId;targetQs;metrics;stringUrn;constructor(r){this.indexedTriples=[],this.stringIndex=new je,this.sourceType=new Map,this.sourceId=new Map,this.sourceQs=new Map,this.relations=new Map,this.targetType=new Map,this.targetId=new Map,this.targetQs=new Map,this.stringUrn=new Map,this.add(r),this.metrics=new Us}add(r){let t=this.indexedTriples.length;for(let e=0;e<r.length;e++){let s=t+e,i=r[e],n=this.stringUrn.has(i[0])?this.stringUrn.get(i[0]):this.stringUrn.set(i[0],I(i[0])).get(i[0]),o=i[1],h=this.stringUrn.has(i[2])?this.stringUrn.get(i[2]):this.stringUrn.set(i[2],I(i[2])).get(i[2]),a=this.stringIndex.add(n.type),c=this.stringIndex.add(n.id),u=this.stringIndex.add(o),d=this.stringIndex.add(h.type),m=this.stringIndex.add(h.id);this.indexedTriples.push([this.stringIndex.add(i[0]),u,this.stringIndex.add(i[2])]),this.sourceType.has(a)||this.sourceType.set(a,new Set),this.sourceType.get(a).add(s),this.sourceId.has(c)||this.sourceId.set(c,new Set),this.sourceId.get(c).add(s);for(let[p,f]of Object.entries(n.qs)){let S=this.stringIndex.add(`${p}=${f}`);this.sourceQs.has(S)||this.sourceQs.set(S,new Set),this.sourceQs.get(S).add(s)}this.relations.has(u)||this.relations.set(u,new Set),this.relations.get(u).add(s),this.targetType.has(d)||this.targetType.set(d,new Set),this.targetType.get(d).add(s),this.targetId.has(m)||this.targetId.set(m,new Set),this.targetId.get(m).add(s);for(let[p,f]of Object.entries(h.qs)){let S=this.stringIndex.add(`${p}=${f}`);this.targetQs.has(S)||this.targetQs.set(S,new Set),this.targetQs.get(S).add(s)}}}get length(){return this.indexedTriples.length}triples(){return this.indexedTriples.map(([r,t,e])=>[this.stringIndex.getValue(r),this.stringIndex.getValue(t),this.stringIndex.getValue(e)])}getTriple(r){if(r<0||r>=this.indexedTriples.length)return;let[t,e,s]=this.indexedTriples[r];return[this.stringIndex.getValue(t),this.stringIndex.getValue(e),this.stringIndex.getValue(s)]}getTripleIndices(r){if(!(r<0||r>=this.indexedTriples.length))return this.indexedTriples[r]}getSourceTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceType.get(t)}getSourceIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.sourceId.get(t)}getSourceQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.sourceQs.get(e)}getRelationSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.relations.get(t)}getTargetTypeSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetType.get(t)}getTargetIdSet(r){let t=this.stringIndex.getIndex(r);if(t!==void 0)return this.metrics.mapRead(),this.targetId.get(t)}getTargetQsSet(r,t){let e=this.stringIndex.getIndex(`${r}=${t}`);if(e!==void 0)return this.metrics.mapRead(),this.targetQs.get(e)}},R=class{static source(r){return r[0]}static relation(r){return r[1]}static target(r){return r[2]}};function Es(r,t,e){let s=t.names.concat(e.names);if(t.rows.length===0||e.rows.length===0)return{names:s,rows:[]};let i=new Map,n=new Map;for(let a=0;a<t.rows.length;a++){let c=t.rows[a][2];i.has(c)||i.set(c,[]),i.get(c).push(a)}for(let a=0;a<e.rows.length;a++){let c=e.rows[a][0];n.has(c)||n.set(c,[]),n.get(c).push(a)}let o=Be.intersection(r,[new Set(i.keys()),new Set(n.keys())]),h=[];for(let a of o){let c=n.get(a),u=i.get(a);for(let d of c)for(let m of u){let p=t.rows[d].concat(e.rows[m]);h.push(p)}}return{names:s,rows:h}}var Ve=class F{index;triplesCount;cursorIndices;metrics;constructor(t){this.index=new Cs(t),this.triplesCount=this.index.length,this.cursorIndices=new Set,this.metrics=new Ts;for(let e=0;e<this.triplesCount;e++)this.cursorIndices.add(e)}clone(){let t=new F([]);return t.index=this.index,t.triplesCount=this.triplesCount,t.cursorIndices=this.cursorIndices,t.metrics=this.metrics,t}static of(t){return new F(t)}static from(t){let e=[];for(let s of t){let{id:i,...n}=s;if(typeof i!="string")throw new Error("Each TripleObject must have a string id.");for(let[o,h]of Object.entries(n))if(Array.isArray(h))for(let a of h)e.push([i,o,a]);else e.push([i,o,h])}return new F(e)}add(t){let e=this.index.length;this.index.add(t),this.triplesCount=this.index.length;for(let s=e;s<this.triplesCount;s++)this.cursorIndices.add(s)}map(t){return new F(this.index.triples().map(t))}flatMap(t){let e=this.index.triples().flatMap(t);return new F(e)}firstTriple(){return this.index.length>0?this.index.getTriple(0):void 0}firstSource(){let t=this.firstTriple();return t?R.source(t):void 0}firstRelation(){let t=this.firstTriple();return t?R.relation(t):void 0}firstTarget(){let t=this.firstTriple();return t?R.target(t):void 0}firstObject(t=!1){return this.objects(t)[0]}triples(){return this.index.triples()}sources(){return new Set(this.index.triples().map(R.source))}relations(){return new Set(this.index.triples().map(R.relation))}targets(){return new Set(this.index.triples().map(R.target))}objects(t=!1){let e=[];for(let[s,i]of Object.entries(this.object(t)))i.id=s,e.push(i);return e}object(t=!1){let e={};for(let[s,i,n]of this.index.triples())e[s]||(e[s]={id:s}),e[s][i]?Array.isArray(e[s][i])?e[s][i].push(n):e[s][i]=[e[s][i],n]:e[s][i]=t?[n]:n;return e}#t(t){let e=[this.cursorIndices],{source:s,relation:i,target:n}=t;if(typeof s>"u"&&typeof n>"u"&&typeof i>"u")throw new Error("At least one search parameter must be defined");let o=["source","relation","target"];for(let c of Object.keys(t))if(Object.prototype.hasOwnProperty.call(t,c)&&!o.includes(c))throw new Error(`Unexpected search parameter: ${c}`);if(s){if(s.type){let c=this.index.getSourceTypeSet(s.type);if(c)e.push(c);else return new Set}if(s.id){let c=this.index.getSourceIdSet(s.id);if(c)e.push(c);else return new Set}if(s.qs)for(let[c,u]of Object.entries(s.qs)){let d=this.index.getSourceQsSet(c,u);if(d)e.push(d);else return new Set}}if(n){if(n.type){let c=this.index.getTargetTypeSet(n.type);if(c)e.push(c);else return new Set}if(n.id){let c=this.index.getTargetIdSet(n.id);if(c)e.push(c);else return new Set}if(n.qs)for(let[c,u]of Object.entries(n.qs)){let d=this.index.getTargetQsSet(c,u);if(d)e.push(d);else return new Set}}if(i){let c=typeof i=="string"?{relation:[i]}:i;if(c.relation){let u=new Set;for(let d of c.relation){let m=this.index.getRelationSet(d);if(m)for(let p of m)u.add(p)}if(u.size>0)e.push(u);else return new Set}}let h=Be.intersection(this.metrics,e),a=new Set;for(let c of h){let u=this.index.getTriple(c);if(!s?.predicate&&!n?.predicate&&!(typeof i=="object"&&i.predicate)){a.add(c);continue}let d=!0;s?.predicate&&(d=d&&s.predicate(R.source(u))),n?.predicate&&(d=d&&n.predicate(R.target(u))),typeof i=="object"&&i.predicate&&(d=d&&i.predicate(R.relation(u))),d&&a.add(c)}return a}search(t){let e=[];for(let s of this.#t(t)){let i=this.index.getTriple(s);i&&e.push(i)}return new F(e)}search2(t){let e=Object.entries(t),s=[];for(let h=0;h<e.length-2;h+=2){let a=e.slice(h,h+3),c={source:a[0][1],relation:a[1][1],target:a[2][1]},u=a.map(p=>p[0]),d=this.#t(c),m=Array.from(d).flatMap(p=>{let f=this.index.getTripleIndices(p);return typeof f>"u"?[]:[f]});s.push({names:u,rows:m})}let i=s.reduce(Es.bind(this,this.metrics)),n=i.names,o=[];for(let h of i.rows){let a={};for(let c=0;c<n.length;c++){let u=n[c];a[u]=this.index.stringIndex.getValue(h[c])}o.push(a)}return o}getMetrics(){return{index:this.index.metrics,db:this.metrics}}};var ks=window.envConfig,xt=class{constructor(t=`/manifest/tribbles.${ks.publication_id}.txt`){this.url=t}async*stream(){let t=new He,e=await fetch(this.url);if(!e.body)throw new Error("No response body");let s=new TextDecoderStream,i=e.body.pipeThrough(s).getReader(),n="";for(;;){let{value:o,done:h}=await i.read();if(h)break;n+=o;let a=n.split(`
`);n=a.pop()??"";for(let c of a){let u=t.parse(c);u!==void 0&&(yield u)}}if(n.length>0){let o=t.parse(n);o!==void 0&&(yield o)}}};var ze="photos";var Fe={photos:"photos",albums:"albums",album:"album",metadata:"metadata",about:"about",videos:"videos",thing:"thing",listing:"listing"},b=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},y=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static COUNTRY="country";static FLAG="flag";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia";static CREATED_AT="created_at";static F_STOP="f_stop";static FOCAL_LENGTH="focal_length";static MODEL="model";static EXPOSURE_TIME="exposure_time";static ISO="iso";static WIDTH="width";static HEIGHT="height"},qe=new Set(["created_at","f_stop","focal_length","model","exposure_time","iso","width","height"]),q=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var k=class r{static{this.ROUTES={photos:this.showPhotosUrl,albums:this.showAlbumsUrl,album:this.showAlbumUrl,metadata:this.showMetadataUrl,about:this.showAboutUrl,videos:this.showVideosUrl,thing:this.showThingUrl,listing:this.showListingUrl}}static{this.URL_PREFIX_TO_PAGE={"#/albums":"albums","#/album":"album","#/metadata":"metadata","#/about":"about","#/videos":"videos","#/thing":"thing","#/photos":"photos","#/listing":"listing"}}static{this.ID_PAGES=new Set(["album","metadata","thing"])}static isPage(t){return t in Fe}static router(t){if(r.isPage(t))return r.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return r.isPage(t)&&r.ID_PAGES.has(t)}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static showListingUrl(t){window.location.hash=`#/listing/${t}`,document.title="Listing - photos"}static getUrl(){let t=window.location.hash;for(let[e,s]of Object.entries(r.URL_PREFIX_TO_PAGE))if(t.startsWith(e)){let i={type:s};return r.ID_PAGES.has(s)&&(i.id=t.split("/")[2]),i}return{type:"albums"}}};var Ht=class extends g{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),l`
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
    `}};customElements.define("photo-sidebar",Ht);var Vt=class extends g{static get properties(){return{darkMode:{type:Boolean}}}feedUrl(){return"/manifest/atom/atom-index.xml"}renderRss(){return l`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=ze;return l`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${e}</span></a></li>
      ${this.renderRss()}
      <li style="float: right">
      <a>
      <span @click=${this.broadcast("switch-theme")} class="brand switch">${t}</span>
      </a>
      </li>

      </ul>
    </nav>
    `}};customElements.define("photo-header",Vt);var St=new Map,_=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,i=400,n=Math.floor(e/i),o=Math.floor(s/i);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(St.has(t))return St.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let i=s.getContext("2d");if(!i){console.error("context missing, cannot render colours");return}return i.fillStyle=e[1],i.fillRect(0,0,1,1),i.fillStyle=e[2],i.fillRect(1,0,1,1),i.fillStyle=e[3],i.fillRect(0,1,1,1),i.fillStyle=e[4],i.fillRect(1,1,1,1),St.set(t,s.toDataURL("image/png")),St.get(t)}};var zt=class extends g{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target?.parentNode?.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){if(!this.id)return l`<p>Missing photo ID</p>`;let t=this.id.startsWith("urn:")?A(this.id).id:this.id,e={id:t,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:_.encodeBitmapDataURL(this.mosaicColours)},s=document.createElement("div");s.innerHTML=this.summary??"";let i=s.textContent??s.innerText??"";return l`
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
          alt=${i}
          title=${i}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `}};customElements.define("app-photo",zt);var U=class{static getElement(){return document.getElementById("rss")}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Ft=class extends g{static get properties(){return{triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),U.setIndex()}allImages(){return this.triples.search({source:{type:"photo"},relation:{relation:["thumbnail_url","mosaic_colours","full_image"]},target:{type:"unknown"}}).objects().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let i=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`
          <app-photo
            id=${I(i.id).id}
            loading="${_.loadingMode(s)}"
            thumbnailUrl="${i.thumbnail_url}"
            mosaicColours="${i.mosaic_colours}"
            imageUrl="${i.full_image}"></app-photo>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${Q(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",Ft);var qt=class extends g{static get properties(){return{albums:{type:Array}}}render(){let t=document.getElementById("stats-data");if(!t)return console.error("No stats data found"),l``;let e=JSON.parse(t.innerText);return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${e.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",qt);var K=class{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,i]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${i}`}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let i=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},h=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o),c=i.toLocaleDateString("en-IE",{day:"numeric"}),u=n.toLocaleDateString("en-IE",{day:"numeric"}),d=i.toLocaleDateString("en-IE",{month:"short"}),m=n.toLocaleDateString("en-IE",{month:"short"}),p=i.getFullYear(),f=n.getFullYear(),S=d===m,N=p===f;return h===a?`${h} ${p}`:S&&N?`${c} - ${u} ${m} ${p}`:`${h} ${p} - ${a} ${f}`}else{let o={year:"numeric",month:"short",day:"numeric"},h=i.toLocaleDateString("en-IE",o),a=n.toLocaleDateString("en-IE",o);return h===a?h:`${h} \u2014 ${a}`}}};var Ms=window.envConfig,w=class{static isUrnSource(t){return v.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return v.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}},v=class r{static isUrn(t){return typeof t=="string"&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,i]=t.split("?"),n=s.split(":")[3],o=i?Object.fromEntries(new URLSearchParams(i)):{};return{type:e,id:n,qs:o}}static is(t,e){return r.isUrn(t)&&r.parseUrn(t).type===e}static toURL(t){if(!r.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=r.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type&&s.id===i.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return r.isUrn(t)&&r.parseUrn(t).id===e}static sameType(t,e){if(!r.isUrn(t)||!r.isUrn(e))return!1;let s=r.parseUrn(t),i=r.parseUrn(e);return s.type===i.type}static isType(t,e){return r.isUrn(t)?r.parseUrn(t).type===e:!1}},W=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){return t.search({source:{id:e},relation:y.NAME}).firstTarget()??e}static birdwatchUrl(t,e){let{id:s}=A(e);return t.search({source:{id:s},relation:y.BIRDWATCH_URL}).firstTarget()}},Y=class{static details(t,e){let s=t.search({source:{type:"country"},relation:{relation:[y.NAME,y.FLAG]}}),i=s.search({relation:y.NAME,target:{id:e}}).firstSource(),n=A(i),o=s.search({source:n,relation:y.FLAG}).firstTarget();return{urn:i,name:e,flag:o}}static urnDetails(t,e){let s=A(e),i=t.search({source:{type:"country",id:s.id},relation:y.NAME}).firstTarget();return{urn:e,name:i}}};function Qe(r){return w.getRelation(r)!==y.RATING?[r]:[[w.getSource(r),w.getRelation(r),`urn:r\xF3:rating:${encodeURIComponent(w.getTarget(r))}`]]}function Ke(r){if(w.getRelation(r)!==y.COUNTRY)return[r];let e=`urn:r\xF3:country:${w.getTarget(r).toLowerCase().replace(" ","-")}`;return[[w.getSource(r),w.getRelation(r),e]]}var We=/^\[([^\:]*):(.*)\]$/;function Ge(r,t){if(typeof t!="string"||!We.test(t))return t;let e=t.match(We);if(!e)return t;let s=e[1],i=e[2];return r[s]?`${r[s]}${i}`:t}function Ye(r,t){let[e,s,i]=t;return[[Ge(r,e),s,Ge(r,i)]]}function Je(r){for(let t of["thumbnail_url","full_image","poster_url","video_url_1080p","video_url_480p","video_url_720p","video_url_unscaled"])if(w.getRelation(r)===t)return[[w.getSource(r),t,`${Ms.photos_url}${w.getTarget(r)}`]];return[r]}function Xe(r){return w.getRelation(r)!==y.BIRDWATCH_URL?[r]:[[w.getSource(r),y.BIRDWATCH_URL,`https://birdwatchireland.ie/birds/${w.getTarget(r)}`]]}function Ze(r){let[t,e,s]=r;return[[t.startsWith("::")?`urn:r\xF3:${t.slice(2)}`:t,e,s.startsWith("::")?`urn:r\xF3:${s.slice(2)}`:s]]}var Wt=class extends E{broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}static get properties(){return{title:{type:String},triples:{type:Object,state:!0},url:{type:String},mosaicColours:{type:String},id:{type:String},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}renderLink(){return l`
    `}renderPlaceholder(){let t=_.encodeBitmapDataURL(this.mosaicColours);return l`
    <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
    `}renderImage(){let t=A(this.id);return l`
    <img @load=${this.hidePlaceholder.bind(this)} style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.broadcast("click-album",{id:t.id,title:this.title})}>
    `}render(){return performance.mark(`start-album-render-${this.url}`),l`
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="photo-album">
      <a href="${"/#/album/"+this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`}},Gt=class extends g{static get properties(){return{title:{type:String},triples:{type:Object},minDate:{type:String},maxDate:{type:String},countries:{type:String},count:{type:Number}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return K.dateRange(this.minDate,this.maxDate,t.matches)}renderCountries(){return this.countries.split(",").map(t=>{let{flag:e,urn:s}=Y.details(this.triples,t),i=A(s);return l`<a href="#/thing/country:${i.id}" title=${t}>${e}</a>`})}render(){let t=this.count===1?"photo":"photos",e=this.renderCountries();return l`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`}};customElements.define("photo-album",Wt);customElements.define("photo-album-metadata",Gt);var Qt=class extends g{constructor(){super(),this._onScroll=this._onScroll.bind(this),this._clearCacheOnResize=this._clearCacheOnResize.bind(this),this.datesCache=[]}_onScroll(){let t=document.getElementById("year-cursor");if(window.scrollY<200){t&&(t.style.display="none");return}else t&&(t.style.display="block");let e=this.getDates(),s,i=[];for(let a=0;a<e.length;a++)if(e[a].position.top>window.scrollY)if(s||(s=e[a].position.top,i.push(e[a])),e[a].position.top===s)i.push(e[a]);else break;let n=Math.min(...i.map(a=>a.minDate)),h=new Date(n).toLocaleString("default",{month:"short",year:"numeric"});t&&h!=="Invalid Date"&&(t.textContent=h)}_clearCacheOnResize(){this.datesCache=[]}getDates(){if(this.datesCache.length>0)return this.datesCache;let t=document.querySelectorAll(".photo-album-date"),e=Array.from(t).flatMap(s=>{let i=s.getAttribute("data-min-date");return i?[{position:s.getBoundingClientRect(),minDate:parseInt(i,10)}]:[]});return this.datesCache=e,this.datesCache}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._onScroll,{passive:!0}),window.addEventListener("resize",this._clearCacheOnResize,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("scroll",this._clearCacheOnResize)}render(){return l`<div id="year-cursor"></div>`}};customElements.define("year-cursor",Qt);var Kt=class extends g{static get properties(){return{albums:{type:Object},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),U.setIndex()}getAlbums(){return this.triples.search({source:{type:"album"}}).objects().map(t=>({title:t.name,minDate:parseInt(t.min_date),maxDate:parseInt(t.max_date),url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:t.photos_count,flags:t.flags}))}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,i)=>i.maxDate-s.maxDate);async function*e(){let s=2e3,i=new Date().getFullYear();for(let n=0;n<t.length;n++){let o=t[n],h=_.loadingMode(n),a=new Date(o.minDate).getFullYear();a!==s&&(s=a,a!==i&&(yield l`<h2 class="album-year-heading">${a}</h2>`)),n%4===0&&await new Promise(u=>setTimeout(u,0));let c=l`
        <photo-album-metadata
          .triples=${this.triples}
            title="${o.title}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
            count="${o.count}"
        ></photo-album-metadata>`;yield l`
          <photo-album
            .triples=${this.triples}
            title="${o.title}"
            url="${o.url}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}"
            loading=${h}>
            ${c}
            </photo-album>
          `}}return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${Q(e.bind(this)())}
    </section>
    `}};customElements.define("albums-page",Kt);var Yt=class extends g{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return l`
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
    `}};customElements.define("app-video",Yt);var Jt=class extends g{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",Jt);var Xt=class extends g{static{this.properties={urn:{type:String}}}getId(){return v.parseUrn(this.urn)?.id??"unknown"}url(){return this.getId()?`https://whc.unesco.org/en/list/${this.getId()}`:null}render(){return this.getId()?l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `:l`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",Xt);var Zt=class extends g{static{this.properties={urn:{type:String},triples:{type:Object}}}name(){let{type:t,id:e}=v.parseUrn(this.urn);if(q.has(t))return l`<span>${W.toCommonName(this.triples,e)}</span>`;let s=this.triples.search({source:v.parseUrn(this.urn),relation:y.NAME}).firstTarget();return s?l`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=v.parseUrn(this.urn);return{[b.BIRD]:"bird-link",[b.MAMMAL]:"mammal-link",[b.REPTILE]:"reptile-link",[b.AMPHIBIAN]:"amphibian-link",[b.FISH]:"fish-link",[b.INSECT]:"insect-link"}[t]??""}render(){return v.isUrn(this.urn)?l`
      <a class="thing-link ${this.linkClass()}" href="${v.toURL(this.urn)}">${this.name()}</a>
    `:l`<span>Invalid URN</span>`}};customElements.define("thing-link",Zt);var te=class extends g{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},triples:{type:Object,state:!0},countries:{type:String}}}connectedCallback(){super.connectedCallback(),U.setIndex()}albumPhotos(t){let e=t.search({source:{type:"photo"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let i=t.search({source:A(s)}).firstObject(!0);return i?[i]:[]})}albumVideos(t){let e=t.search({source:{type:"video"},relation:"album_id",target:{id:this.id}}).sources();return Array.from(e).flatMap(s=>{let i=t.search({source:A(s)}).firstObject();return i?[i]:[]})}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(t){let e={},s=this.albumPhotos(t);for(let n of[b.UNESCO])e[n]=Array.from(new Set(s.flatMap(o=>o[y.LOCATION]?.filter(h=>v.is(h,n))).filter(o=>o)));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])e[n]=Array.from(new Set(s.flatMap(o=>o[y.SUBJECT]?.filter(h=>v.is(h,n))).filter(o=>o)));let i=[];i=i.concat(e[b.UNESCO].map(n=>l`<unesco-link urn="${n}"></unesco-link>`));for(let n of[b.BIRD,b.MAMMAL,b.REPTILE,b.FISH,b.AMPHIBIAN,b.INSECT])i=i.concat(e[n].map(o=>l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`));return i}render(){let t=this.triples,e=window.matchMedia("(max-width: 500px)"),s=K.dateRange(this.minDate,this.maxDate,e.matches),n=this.albumPhotos(t).map((a,c)=>l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${_.loadingMode(c)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`),o=this.albumVideos(t).map((a,c)=>l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`),h=this?.countries.split(",").map(a=>{let{flag:c,urn:u}=Y.details(this.triples,a),d=A(u);return l`<span href="#/thing/country:${d.id}" title=${a}>${c}</span>`});return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${h}</p>
        <p class="photo-album-description">${vt(this.description)}
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
    `}};customElements.define("album-page",te);var ee=class extends g{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),s=new URL(t).pathname;await navigator.share({title:s,files:[new File([await e.blob()],s,{type:this.format})]})}catch(e){console.error("Error sharing:",e)}finally{this.sharing=!1}}}render(){return this.sharing?l`<button class="photo-share-button" disabled>[sharing...]</button>`:l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",ee);function J(r){return l`<th class="exif-heading">${r}</th>`}var se=class extends g{static get properties(){return{id:{type:String},image:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),U.setIndex()}renderAperture(t){return t.f_stop==="Unknown"?l`<td>Unknown</td>`:t.f_stop==="0.0"?l`<td>Manual aperture control</td>`:t.f_stop?l`<td>ƒ/${t.f_stop}</td>`:l`<td>Unknown</td>`}renderFocalLength(t){return t.focal_length==="Unknown"?l`${t.focal_length}`:t.focal_length==="0"?l`<td>Manual lens</td>`:t.focal_length?l`<td>${t.focal_length}mm equiv.</td>`:l`<td>Unknown</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return l`<ul class="thing-list">
        ${e.map(s=>l`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return l`<em>${e}</em>`;if(t.toLowerCase()==="summary")return l`${vt(e??"")}`;if(v.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(v.isUrn(e)&&v.is(e,b.UNESCO))return l`<unesco-link .urn="${e}"></unesco-link>`;if(v.isUrn(e))return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${t.sort((e,s)=>w.getRelation(e).localeCompare(w.getRelation(s))).filter(e=>!this.isIgnoredKey(w.getRelation(e))).map(e=>l`
          <tr>
            <th class="exif-heading">${this.renderSemanticKey(w.getRelation(e))}</th>
              <td>${this.renderSemanticValue(w.getRelation(e),w.getTarget(e))}</td>
          `)}
      <table>
    `}renderModel(t){return typeof t.model=="string"?l`
      ${J("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`:l`
      ${J("Camera Model")}
      <td>Unknown</td>
    `}renderDimensions(t){return typeof t.width=="number"&&typeof t.height=="number"?l`
        ${J("Dimensions")}
        <td>${t.width} x ${t.height}</td>`:l`
      ${J("Dimensions")}
      <td>Unknown</td>
    `}renderShutterSpeed(t){return typeof t.shutter_speed=="number"?l`
        ${J("Shutter Speed")}
        <td>1/${Math.round(1/t.shutter_speed)}</td>`:l`
      ${J("Shutter Speed")}
      <td>Unknown</td>
    `}renderExif(t){let e=t.search({source:{type:"photo",id:this.id},relation:{}}).firstObject();if(!e)return l`<p>No EXIF data available</p>`;let s=new Date(parseInt(e.created_at)),i={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"},n=s.toLocaleDateString("en-US",i);return l`
    <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>
        ${n}
      </time></td>
      </tr>
      <tr>
        ${this.renderModel(e)}
        </tr>
      <tr>
        ${this.renderDimensions(e)}
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        ${this.renderFocalLength(e)}
      </tr>
      <tr>
        ${this.renderShutterSpeed(e)}
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        ${this.renderAperture(e)}
        </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${e.iso??"Unknown"}</td>
      </tr>
    </table>
    `}render(){let t=this.image,e=t.album_id,s=this.triples,i=s.search({source:{id:A(t.id).id},relation:{predicate:n=>{let o=new Set(["album_id","full_image","mosaic_colours","thumbnail_url"]);return!qe.has(n)&&!o.has(n)}}}).triples();return l`
    <section>
    <h1>Metadata</h1>

    <img class="u-photo thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
        <a href="#/album/${e}">[album]</a>
      </p>

      ${this.renderSemanticData(i)}
      ${this.renderExif(s)}

    </section>
    `}};customElements.define("metadata-page",se);var re=class extends g{connectedCallback(){super.connectedCallback(),U.setIndex()}render(){return l`
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
    `}};customElements.define("about-page",re);var ie=class extends g{static get properties(){return{urn:{type:String},triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),U.setIndex()}isValidImage(t){return t&&t.thumbnail_url}urnImages(t,e){let i=t.search(e).sources();return Array.from(i).flatMap(n=>{if(n.startsWith("urn:r\xF3")){let h=t.search({source:I(n)}).firstObject();return this.isValidImage(h)?[h]:[]}let o=t.search({source:{id:n,type:"photo"}}).firstObject();return this.isValidImage(o)?[o]:[]})}renderSubjectPhotos(t){return t.sort((e,s)=>s.created_at-e.created_at).map((e,s)=>l`
      <app-photo
        id=${e.id.startsWith("urn:")?A(e.id).id:e.id}
        loading="${_.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        mosaicColours="${e.mosaic_colours}"
        imageUrl="${e.full_image}"></app-photo>`)}getAlbums(){return this.triples.search({source:{type:"album"}}).objects()}renderSubjectAlbums(t,e){let s=this.urnImages(t,e),i=new Set(s.map(n=>n.album_id));return Array.from(i).flatMap(n=>this.getAlbums().filter(o=>A(o.id).id===n)).sort((n,o)=>o.min_date-n.min_date).map(n=>{let o=l`
        <photo-album-metadata slot="metadata"
            .triples=${this.triples}
            title="${n.name}"
            count="${n.photos_count}"
            minDate="${n.min_date}"
            maxDate="${n.max_date}"
            countries="${n.flags}"
        ></photo-album-metadata>`;return l`
          <photo-album
            .triples=${this.triples}
            title="${n.name}"
            url="${n.thumbnail_url}"
            mosaicColours="${n.mosaic}"
            id="${n.id}"
            loading="eager">
      ${o}
          </photo-album>
      `})}firstPhotographed(t,e,s){let n=this.urnImages(e,s).sort((o,h)=>o.created_at-h.created_at)[0];return n?new Date(parseInt(n.created_at)).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}renderTitle(){let{id:t,type:e}=v.parseUrn(this.urn),s=this.triples.search({source:{id:t,type:e},relation:y.NAME}).firstTarget();if(s)return s;try{let i=v.parseUrn(this.urn),n=decodeURIComponent(i.id);return i.id==="*"?`${i.type.charAt(0).toUpperCase()}${i.type.slice(1)}`:q.has(i.type)?W.toCommonName(this.triples,n):n}catch{return this.urn}}renderClassification(t){return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${t.slice(1)}</a>`}getPhotoQueries(t){let e=t;e.id==="*"&&delete e.id;let s=[];if(q.has(t.type))for(let i of["captivity","wild"]){let o={...t,qs:{context:i}};s.push({label:i,query:{target:o}})}else s.push({label:"default",query:{source:{type:"photo"},target:t}});return s}renderPhotoSection(t){return l`<div>
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
    <div/>`}render(){let t=this.triples,e=t.search({source:{type:"photo"}}).objects(),s=v.parseUrn(this.urn),i=s.type,n=t.search({source:I(this.urn)}).firstObject()??{},o=Object.assign({Classification:this.renderClassification(i)});if(n.country&&(o.Country=l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),n.fcode_name){let D=n.fcode_name;o["Place Type"]=l`${D.charAt(0).toUpperCase()}${D.slice(1)}`}q.has(i)&&(o["First Photographed"]=l`<span>${this.firstPhotographed(e,t,{target:I(this.urn)})}</span>`);let h=n[y.WIKIPEDIA],a=n[y.BIRDWATCH_URL],c=n[y.LONGITUDE],u=n[y.LATITUDE],d;if(c&&u){let D=`https://www.google.com/maps?q=${u},${c}`;d=l`
      <a href="${D}" target="_blank" rel="noopener">[maps]</a>
      `}let m=I(this.urn);m.id==="*"&&delete m.id;let p=this.getPhotoQueries(I(this.urn)),f={};for(let{query:D,label:It}of p){let ts=this.urnImages(t,D);f[It]=this.renderSubjectPhotos(ts)}let S={source:{type:"photo"},target:m},N=this.renderSubjectAlbums(t,S),at=this.renderPhotoSection(f);return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${q.has(i)&&s.id!=="*"?l`<span class="thing-binomial">(${W.pretty(s.id)})</span>`:l``}
        </p>
        <br>

        ${h?l`<a href="${h}" target="_blank" rel="noopener">[wikipedia]</a>`:l``}
        ${a?l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>`:l``}
        ${d?l`<span class="location">${d}</span>`:l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(o).map(([D,It])=>l`
          <tr>
            <th class="exif-heading">${D}</th>
            <td>${It}</td>
          </tr>
          `)}
        </table>

        <br>
        ${at}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${N}
        </section>

      </div>
    `}};customElements.define("thing-page",ie);var At=class{static loadingMode(t){return t===0?"auto":"none"}};var ne=class extends g{static get properties(){return{triples:{type:Object,state:!0}}}connectedCallback(){super.connectedCallback(),U.setIndex()}getVideos(){return this.triples.search({source:{type:"video"}}).objects()}render(){let t=this.getVideos();async function*e(){for(let s=0;s<t.length;s++){let i=t[s];s%4===0&&await new Promise(n=>setTimeout(n,0)),yield l`<app-video
          id=${i.id}
          url_poster=${i.poster_url}
          url_unscaled=${i.video_url_unscaled}
          url_1080p=${i.video_url_1080p}
          url_720p=${i.video_url_720p}
          url_480p=${i.video_url_480p}
          preload="${At.loadingMode(s)}"
        ></app-video>`}}return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${Q(e())}
      </section>
    </div>
    `}};customElements.define("videos-page",ne);var _t=class{static getDistinctThings(t,e){return t.search({source:{type:e},relation:"name"}).objects().sort((i,n)=>i.name.localeCompare(n.name))}static chooseBestImage(t,e,s){let n=t.search({source:{type:"photo"},target:I(s)}).sources(),h=Array.from(n).map(a=>{let c=t.search({source:I(a),relation:"rating"}),u=Array.from(c.targets()).map(d=>decodeURIComponent(I(d).id).length);return{photo:a,rating:Math.max(...u)}}).sort((a,c)=>c.rating-a.rating)[0];return h||console.error("No photo found for",e,s),h?.photo}},oe=class extends g{static get properties(){return{triples:{type:Object,state:!0},url:{type:String},id:{type:String},mosaicColours:{type:String},count:{type:Number},loading:{type:String}}}render(){let t=_.encodeBitmapDataURL(this.mosaicColours);return l`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `}};customElements.define("thing-album",oe);var ae=class extends g{static get properties(){return{id:{type:String},triples:{type:Object,state:!0}}}renderMetadata(t,e,s){let i=this.triples.search({source:I(e)}).firstObject();return l`
      <div>
        <p>${s}</p>
        ${i.wikipedia?l`<span><a href="${i.wikipedia}">[wiki]</a></span>`:""}

        ${i.birdwatch_url?l`<span><a href="${i.birdwatch_url}">[birdwatch]</a></span>`:""}
      </div>
    `}renderThingAlbum(t,e,s,i){let n=_t.chooseBestImage(this.triples,t,e),o=this.triples.search({source:I(n)}).firstObject();return l`
          <photo-album
            .triples=${this.triples}
            title="${"no such thing exists"}"
            url="${o.thumbnail_url}"
            mosaicColours="${o.mosaic_colours}"
            id="${"urn:r\xF3:album:fake"}"
            loading=${_.loadingMode(i)}>
          ${this.renderMetadata(t,e,s)}
            </photo-album>

    `}render(){let t=this.triples;this.id="bird";let e=_t.getDistinctThings(t,this.id);return l`
    <h1>${this.id.charAt(0).toUpperCase()+this.id.slice(1)}s</h1>

    <section class="album-container">
      ${e.map((s,i)=>this.renderThingAlbum(this.id,s.id,s.name,i))}
    </section>
    `}};customElements.define("listing-page",ae);function Rs(r,t){let e=[Ze,Qe,Ke,Je,Xe,Ye.bind(null,r)],s=[t];for(let i of e)s=s.flatMap(i);return s}var Ds=new xt,le=class r extends g{static{this.DEFAULT_PAGE="albums"}static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean},tribbleDB:{type:Object,state:!0,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),this._onPopState=this.handlePopState.bind(this),this.sidebarVisible=!1,window.addEventListener("popstate",this._onPopState),(async()=>{let t=[];this.tribbleDB||(this.tribbleDB=new Ve([]));let e={i:"urn:r\xF3:",birdwatch:"https://birdwatchireland.ie/birds/",photos:"https://photos-cdn.rgrannell.xyz/",wiki:"https://en.wikipedia.org/wiki/"};for await(let s of Ds.stream())t.push(...[s].flatMap(Rs.bind(null,e))),t.length>500&&(this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB,t.length=0,this.requestUpdate());this.tribbleDB.add(t),this.tribbleDB=this.tribbleDB.clone(),this.requestUpdate()})()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onPopState)}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=k.getUrl();k.isPage(t?.type)?this.page=t.type:(console.error("did not match pagetype",t?.type),this.page=r.DEFAULT_PAGE),k.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page="photos",this.id=s,this.title=e,k.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:i}=t.detail;this.page="metadata",this.id=e,this.imageUrl=s,this.thumbnailUrl=i,k.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=k.router(this.page);e||console.error(`no router found for page ${this.page}`),k.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;if(this.page==="about")return l`<about-page class="${e}"></about-page>`;if(this.page==="photos")return l`<photos-page .triples=${this.tribbleDB} class="${e}"></photos-page>`;if(this.page==="album"){this.id||console.error("no album id provided");let s=this.tribbleDB.search({source:{type:"album",id:this.id}}).firstObject();return s||console.error(`failed to find album with id ${this.id}`),l`
      <album-page
        .triples=${this.tribbleDB}
        title=${s.name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page==="metadata"){let s=this.tribbleDB.search({source:{type:"photo",id:this.id}}).firstObject();return s||console.error(`failed to find photo with id ${this.id}`),l`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `}if(this.page==="videos")return l`
      <videos-page .triples=${this.tribbleDB} class="${e}"></videos-page>
      `;if(this.page==="thing")return l`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .triples=${this.tribbleDB}
        class="${e}"></thing-page>
      `;if(this.page==="listing")return l`
      <listing-page id=${this.id} .triples=${this.tribbleDB} class="${e}"></listing-page>
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
    `}};customElements.define("photo-app",le);export{le as PhotoApp};
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
