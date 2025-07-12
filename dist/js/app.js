var nt=globalThis,Gt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oe=Symbol(),fe=new WeakMap,Nt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Gt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=fe.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&fe.set(e,t))}return t}toString(){return this.cssText}},ts=s=>new Nt(typeof s=="string"?s:s+"",void 0,Oe);var es=(s,t)=>{if(Gt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=nt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},be=Gt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ts(e)})(s):s,{is:ss,defineProperty:is,getOwnPropertyDescriptor:rs,getOwnPropertyNames:os,getOwnPropertySymbols:as,getPrototypeOf:ns}=Object,$t=globalThis,$e=$t.trustedTypes,ls=$e?$e.emptyScript:"",cs=$t.reactiveElementPolyfillSupport,J=(s,t)=>s,It={toAttribute(s,t){switch(t){case Boolean:s=s?ls:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},De=(s,t)=>!ss(s,t),Ae={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),$t.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&is(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:o}=rs(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return r?.call(this)},set(a){let h=r?.call(this);o.call(this,a),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static o(){if(this.hasOwnProperty(J("elementProperties")))return;let t=ns(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(J("properties"))){let e=this.properties,i=[...os(e),...as(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this.u=new Map;for(let[e,i]of this.elementProperties){let r=this.p(e,i);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(be(r))}else t!==void 0&&e.push(be(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return es(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor.p(t,i);if(r!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:It).toAttribute(e,i.type);this.m=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this.m=null}}_$AK(t,e){let i=this.constructor,r=i.u.get(t);if(r!==void 0&&this.m!==r){let o=i.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:It;this.m=r,this[r]=a.fromAttribute(e,o.type),this.m=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??De)(this[t],e))return;this.T(t,e,i)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,o]of this.v)this[r]=o;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],o)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(i=>i.hostUpdate?.()),this.update(e)):this.k()}catch(i){throw t=!1,this.k(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[J("elementProperties")]=new Map,N[J("finalized")]=new Map,cs?.({ReactiveElement:N}),($t.reactiveElementVersions??=[]).push("2.0.4");var Yt=globalThis,lt=Yt.trustedTypes,ye=lt?lt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ht="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,jt="?"+O,hs=`<${jt}>`,H=document,X=()=>H.createComment(""),tt=s=>s===null||typeof s!="object"&&typeof s!="function",Re=Array.isArray,Ne=s=>Re(s)||typeof s?.[Symbol.iterator]=="function",Ot=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,_e=/>/g,G=RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,Se=/"/g,Ie=/^(?:script|style|textarea|title)$/i,Pe=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),c=Pe(1),ds=Pe(2),y=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Ee=new WeakMap,Y=H.createTreeWalker(H,129);function Be(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(t):t}var Ge=(s,t)=>{let e=s.length-1,i=[],r,o=t===2?"<svg>":"",a=Q;for(let h=0;h<e;h++){let n=s[h],p,f,u=-1,b=0;for(;b<n.length&&(a.lastIndex=b,f=a.exec(n),f!==null);)b=a.lastIndex,a===Q?f[1]==="!--"?a=we:f[1]!==void 0?a=_e:f[2]!==void 0?(Ie.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=G):f[3]!==void 0&&(a=G):a===G?f[0]===">"?(a=r??Q,u=-1):f[1]===void 0?u=-2:(u=a.lastIndex-f[2].length,p=f[1],a=f[3]===void 0?G:f[3]==='"'?Se:ve):a===Se||a===ve?a=G:a===we||a===_e?a=Q:(a=G,r=void 0);let g=a===G&&s[h+1].startsWith("/>")?" ":"";o+=a===Q?n+hs:u>=0?(i.push(p),n.slice(0,u)+Ht+n.slice(u)+O+g):n+O+(u===-2?h:g)}return[Be(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),i]},et=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,a=0,h=t.length-1,n=this.parts,[p,f]=Ge(t,e);if(this.el=s.createElement(p,i),Y.currentNode=this.el.content,e===2){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=Y.nextNode())!==null&&n.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(Ht)){let b=f[a++],g=r.getAttribute(u).split(O),w=/([.?@])?(.*)/.exec(b);n.push({type:1,index:o,name:w[2],strings:g,ctor:w[1]==="."?ht:w[1]==="?"?dt:w[1]==="@"?ut:V}),r.removeAttribute(u)}else u.startsWith(O)&&(n.push({type:6,index:o}),r.removeAttribute(u));if(Ie.test(r.tagName)){let u=r.textContent.split(O),b=u.length-1;if(b>0){r.textContent=lt?lt.emptyScript:"";for(let g=0;g<b;g++)r.append(u[g],X()),Y.nextNode(),n.push({type:2,index:++o});r.append(u[b],X())}}}else if(r.nodeType===8)if(r.data===jt)n.push({type:2,index:o});else{let u=-1;for(;(u=r.data.indexOf(O,u+1))!==-1;)n.push({type:7,index:o}),u+=O.length-1}o++}}static createElement(t,e){let i=H.createElement("template");return i.innerHTML=t,i}};function j(s,t,e=s,i){if(t===y)return t;let r=i!==void 0?e.U?.[i]:e.N,o=tt(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e.U??=[])[i]=r:e.N=r),r!==void 0&&(t=j(s,r._$AS(s,t.values),r,i)),t}var ct=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??H).importNode(e,!0);Y.currentNode=r;let o=Y.nextNode(),a=0,h=0,n=i[0];for(;n!==void 0;){if(a===n.index){let p;n.type===2?p=new At(o,o.nextSibling,this,t):n.type===1?p=new n.ctor(o,n.name,n.strings,this,t):n.type===6&&(p=new pt(o,this,t)),this._$AV.push(p),n=i[++h]}a!==n?.index&&(o=Y.nextNode(),a++)}return Y.currentNode=H,r}R(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},At=class Ye{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,i,r){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),tt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==y&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):Ne(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==$&&tt(this._$AH)?this._$AA.nextSibling.data=t:this.j(H.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=et.createElement(Be(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.R(e);else{let o=new ct(r,this),a=o.O(this.options);o.R(e),this.j(a),this._$AH=o}}_$AC(t){let e=Ee.get(t.strings);return e===void 0&&Ee.set(t.strings,e=new et(t)),e}D(t){Re(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let o of t)r===e.length?e.push(i=new Ye(this.H(X()),this.H(X()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,e=this,i,r){let o=this.strings,a=!1;if(o===void 0)t=j(this,t,e,0),a=!tt(t)||t!==this._$AH&&t!==y,a&&(this._$AH=t);else{let h=t,n,p;for(t=o[0],n=0;n<o.length-1;n++)p=j(this,h[i+n],e,n),p===y&&(p=this._$AH[n]),a||=!tt(p)||p!==this._$AH[n],p===$?t=$:t!==$&&(t+=(p??"")+o[n+1]),this._$AH[n]=p}a&&!r&&this.B(t)}B(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ht=class extends V{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===$?void 0:t}},dt=class extends V{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},ut=class extends V{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=j(this,t,e,0)??$)===y)return;let i=this._$AH,r=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}},us={W:Ht,q:O,J:jt,Z:1,F:Ge,G:ct,K:Ne,X:j,Y:At,tt:V,st:dt,it:ut,et:ht,ot:pt},ps=Yt.litHtmlPolyfillSupport;ps?.(et,At),(Yt.litHtmlVersions??=[]).push("3.1.3");var He=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let o=e?.renderBefore??null;i._$litPart$=r=new At(t.insertBefore(X(),o),o,void 0,e??{})}return r._$AI(s),r};var P=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=He(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return y}};P._$litElement$=!0,P.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:P});var ms=globalThis.litElementPolyfillSupport;ms?.({LitElement:P});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:gs}=us,fs=s=>s===null||typeof s!="object"&&typeof s!="function";var xe=(s,t)=>t===void 0?s?._$litType$!==void 0:s?._$litType$===t,bs=s=>s?._$litType$?.h!=null;var je=s=>s.strings===void 0,Te=()=>document.createComment(""),I=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let o=i.insertBefore(Te(),r),a=i.insertBefore(Te(),r);e=new gs(o,a,s,s.options)}else{let o=e._$AB.nextSibling,a=e._$AM,h=a!==s;if(h){let n;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(n=s._$AU)!==a._$AU&&e._$AP(n)}if(o!==r||h){let n=e._$AA;for(;n!==o;){let p=n.nextSibling;i.insertBefore(n,r),n=p}}}return e},R=(s,t,e=s)=>(s._$AI(t,e),s),$s={},st=(s,t=$s)=>s._$AH=t,Pt=s=>s._$AH,Dt=s=>{s._$AP?.(!1,!0);let t=s._$AA,e=s._$AB.nextSibling;for(;t!==e;){let i=t.nextSibling;t.remove(),t=i}},Ve=s=>{s._$AR()};var x=s=>(...t)=>({_$litDirective$:s,values:t}),C=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.rt=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var K=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),K(i,t);return!0},mt=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},ze=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),ws(t)}};function As(s){this._$AN!==void 0?(mt(this),this._$AM=s,ze(this)):this._$AM=s}function ys(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)K(i[o],!1),mt(i[o]);else i!=null&&(K(i,!1),mt(i));else K(this,s)}var ws=s=>{s.type==2&&(s._$AP??=ys,s._$AQ??=As)},it=class extends C{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),ze(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(K(this,t),mt(this))}setValue(t){if(je(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var gt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},ft=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var bt=class extends it{constructor(){super(...arguments),this.dt=new gt(this),this.ft=new ft}render(t,e){return y}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.vt)return y;this.vt=e;let r=0,{dt:o,ft:a}=this;return(async(h,n)=>{for await(let p of h)if(await n(p)===!1)return})(e,async h=>{for(;a.get();)await a.get();let n=o.deref();if(n!==void 0){if(n.vt!==e)return!1;i!==void 0&&(h=i(h,r)),n.commitValue(h,r),r++}return!0}),y}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ys=x(bt),Hs=x(class extends bt{constructor(s){if(super(s),s.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(s,t){return this.ht=s,super.update(s,t)}commitValue(s,t){t===0&&Ve(this.ht);let e=I(this.ht);R(e,s)}}),Ue=s=>bs(s)?s._$litType$.h:s.strings,js=x(class extends C{constructor(s){super(s),this.yt=new WeakMap}render(s){return[s]}update(s,[t]){let e=xe(this.bt)?Ue(this.bt):null,i=xe(t)?Ue(t):null;if(e!==null&&(i===null||e!==i)){let r=Pt(s).pop(),o=this.yt.get(e);if(o===void 0){let a=document.createDocumentFragment();o=He($,a),o.setConnected(!1),this.yt.set(e,o)}st(o,[r]),I(o,void 0,r)}if(i!==null){if(e===null||e!==i){let r=this.yt.get(i);if(r!==void 0){let o=Pt(r).pop();Ve(s),I(s,void 0,o),st(s,[o])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Vs=x(class extends C{constructor(s){if(super(s),s.type!==1||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){if(this.gt===void 0){this.gt=new Set,s.strings!==void 0&&(this.wt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.wt?.has(i)&&this.gt.add(i);return this.render(t)}let e=s.element.classList;for(let i of this.gt)i in t||(e.remove(i),this.gt.delete(i));for(let i in t){let r=!!t[i];r===this.gt.has(i)||this.wt?.has(i)||(r?(e.add(i),this.gt.add(i)):(e.remove(i),this.gt.delete(i)))}return y}}),_s={},zs=x(class extends C{constructor(){super(...arguments),this._t=_s}render(s,t){return t()}update(s,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((i,r)=>i===this._t[r]))return y}else if(this._t===t)return y;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Zs=x(class extends C{constructor(){super(...arguments),this.key=$}render(s,t){return this.key=s,t}update(s,[t,e]){return t!==this.key&&(st(s),this.key=t),e}}),Fs=x(class extends C{constructor(s){if(super(s),s.type!==3&&s.type!==1&&s.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!je(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[t]){if(t===y||t===$)return t;let e=s.element,i=s.name;if(s.type===3){if(t===e[i])return y;if(s.type===4){if(!!t===e.hasAttribute(i))return y;if(s.type===1&&e.getAttribute(i)===t+"")return y}}return st(s),t}});var Rt=new WeakMap,Ws=x(class extends it{render(s){return $}update(s,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=s.options?.host,this.St(this.Tt=s.element)),$}St(s){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Rt.get(t);e===void 0&&(e=new WeakMap,Rt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,s),s!==void 0&&this.ct.call(this.xt,s)}else this.ct.value=s}get $t(){return typeof this.ct=="function"?Rt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Le=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},qs=x(class extends C{constructor(s){if(super(s),s.type!==2)throw Error("repeat() can only be used in text expressions")}Et(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],o=[],a=0;for(let h of s)r[a]=i?i(h,a):a,o[a]=e(h,a),a++;return{values:o,keys:r}}render(s,t,e){return this.Et(s,t,e).values}update(s,[t,e,i]){let r=Pt(s),{values:o,keys:a}=this.Et(t,e,i);if(!Array.isArray(r))return this.Ct=a,o;let h=this.Ct??=[],n=[],p,f,u=0,b=r.length-1,g=0,w=o.length-1;for(;u<=b&&g<=w;)if(r[u]===null)u++;else if(r[b]===null)b--;else if(h[u]===a[g])n[g]=R(r[u],o[g]),u++,g++;else if(h[b]===a[w])n[w]=R(r[b],o[w]),b--,w--;else if(h[u]===a[w])n[w]=R(r[u],o[w]),I(s,n[w+1],r[u]),u++,w--;else if(h[b]===a[g])n[g]=R(r[b],o[g]),I(s,r[u],r[b]),b--,g++;else if(p===void 0&&(p=Le(a,g,w),f=Le(h,u,b)),p.has(h[u]))if(p.has(h[b])){let k=f.get(a[g]),q=k!==void 0?r[k]:null;if(q===null){let ge=I(s,r[u]);R(ge,o[g]),n[g]=ge}else n[g]=R(q,o[g]),I(s,r[u],q),r[k]=null;g++}else Dt(r[b]),b--;else Dt(r[u]),u++;for(;g<=w;){let k=I(s,n[w+1]);R(k,o[g]),n[g++]=k}for(;u<=b;){let k=r[u++];k!==null&&Dt(k)}return this.Ct=a,st(s,n),y}}),Ze="important",vs=" !"+Ze,Qs=x(class extends C{constructor(s){if(super(s),s.type!==1||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let i of this.Pt)t[i]==null&&(this.Pt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.Pt.add(i);let o=typeof r=="string"&&r.endsWith(vs);i.includes("-")||o?e.setProperty(i,o?r.slice(0,-11):r,o?Ze:""):e[i]=r}}return y}}),Js=x(class extends C{constructor(s){if(super(s),s.type!==2)throw Error("templateContent can only be used in child bindings")}render(s){return this.At===s?y:(this.At=s,document.importNode(s.content,!0))}}),z=class extends C{constructor(t){if(super(t),this.bt=$,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this.kt=void 0,this.bt=t;if(t===y)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};z.directiveName="unsafeHTML",z.resultType=1;var yt=x(z);var rt=class extends z{};rt.directiveName="unsafeSVG",rt.resultType=2;var Ks=x(rt),Ce=s=>!fs(s)&&typeof s.then=="function",Me=1073741823;var Bt=class extends it{constructor(){super(...arguments),this.Mt=Me,this.Ut=[],this.dt=new gt(this),this.ft=new ft}render(...t){return t.find(e=>!Ce(e))??y}update(t,e){let i=this.Ut,r=i.length;this.Ut=e;let o=this.dt,a=this.ft;this.isConnected||this.disconnected();for(let h=0;h<e.length&&!(h>this.Mt);h++){let n=e[h];if(!Ce(n))return this.Mt=h,n;h<r&&n===i[h]||(this.Mt=Me,r=0,Promise.resolve(n).then(async p=>{for(;a.get();)await a.get();let f=o.deref();if(f!==void 0){let u=f.Ut.indexOf(n);u>-1&&u<f.Mt&&(f.Mt=u,f.setValue(p))}}))}return y}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Xs=x(Bt);var Ss=Symbol.for(""),Es=s=>{if(s?.r===Ss)return s?._$litStatic$};var ke=new Map,Fe=s=>(t,...e)=>{let i=e.length,r,o,a=[],h=[],n,p=0,f=!1;for(;p<i;){for(n=t[p];p<i&&(o=e[p],(r=Es(o))!==void 0);)n+=r+t[++p],f=!0;p!==i&&h.push(o),a.push(n),p++}if(p===i&&a.push(t[i]),f){let u=a.join("$$lit$$");(t=ke.get(u))===void 0&&(a.raw=a,ke.set(u,t=a)),e=h}return s(t,...e)},ti=Fe(c),ei=Fe(ds);var m=class extends P{createRenderRoot(){return this}broadcast(t,e){return()=>{let i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}}};var wt=Symbol("the albums manifest"),_t=Symbol("the images manifest"),gi=Symbol("the site manifest"),vt=Symbol("metadata about the site manifest"),St=Symbol("the videos manifest"),Et=Symbol("the exif data"),M=Symbol("the semantic data"),We=53.33306,qe=-6.24889,Qe=6,Je="photos",l=class{static EAGER="eager";static LAZY="lazy"},d=class{static PHOTOS="photos";static ALBUMS="albums";static DATE="date";static LOCATIONS="locations";static ALBUM="album";static STATS="stats";static TAG="tag";static TAG_ALBUM="tag-album";static TAGS="tags";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos"};async function xs(s="/manifest/env.json"){return await(await fetch(s)).json()}var ot=await xs(),Z=class s{_data;constructor(t=`/manifest/images.${ot.publication_id}.json`){this.url=t}processCSVImages(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];i.push(o)}return i}async init(){if(window[_t]&&(this._data=window[_t]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processCSVImages(t);window[_t]=e,this._data=e}static processImage(t){return{...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`}}images(){return this._data.map(s.processImage)}},xt=class{_data;constructor(t=`/manifest/videos.${ot.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];i.push(o)}return i}async init(){if(window[St]&&(this._data=window[St]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[St]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},F=class s{_data;constructor(t=`/manifest/albums.${ot.publication_id}.json`){this.url=t}processCSV(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];i.push(o)}return i}async init(){if(window[wt]&&(this._data=window[wt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processCSV(t);window[wt]=e,this._data=e}static processAlbum(t){return{...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}}albums(){return this._data.map(t=>s.processAlbum)}},Tt=class{_data;constructor(t=`/manifest/exif.${ot.publication_id}.json`){this.url=t}process(t){let e=t[0],i=[];for(let r of t.slice(1)){let o={};for(let a=0;a<e.length;a++)o[e[a]]=r[a];i.push(o)}return i}async init(){if(window[Et]&&(this._data=window[Et]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Et]=e,this._data=e}exif(){return this._data}};function Ke(s,t,e){if(!s.hasOwnProperty(t))return!1;let i=s[t];if(i.includes(e))return!0;for(let r of i)if(Ke(s,r,e))return!0;return!1}var Ut=class{_data;constructor(t=`/manifest/semantic.${ot.publication_id}.json`){this.url=t}async init(){if(window[M]&&(this._data=window[M]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[M]=t,this._data=t}semantic(){return this._data}},Lt=class{_data;constructor(t="/manifest/metadata.json"){this.url=t}async init(){if(window[vt]&&(this._data=window[vt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[vt]=t,this._data=t}metadata(){return this._data}isChild(t,e){return Ke(this._data,t,e)}childrenOf(t,e){let i=new Set([]);for(let r of e)this.isChild(t,r)&&i.add(r);return i}};var _=class{static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showDateUrl(t){window.location.hash=`#/date/${t}`,document.title="Date - photos"}static showLocationsUrl(){window.location.hash="#/locations",document.title="Locations - photos"}static showTagsUrl(){window.location.hash="#/tags",document.title="Tags - photos"}static showStatsUrl(){window.location.hash="#/stats",document.title="Stats - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showTagAlbumUrl(t){window.location.hash=`#/tag/${encodeURIComponent(t)}`,document.title="Tag - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showSearchQuery(t){if(window.location.toString().indexOf("?")>0){let i=window.location.hash.toString().slice(0,window.location.hash.toString().indexOf("?"));window.location.hash=i+"?"+encodeURIComponent(t)}else window.location.hash=window.location.hash+"?"+encodeURIComponent(t)}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/locations")?{type:"locations"}:window.location.hash.startsWith("#/tags")?{type:"tags"}:window.location.hash.startsWith("#/tag")?{type:"tag-album",tag:decodeURIComponent(window.location.hash.split("/")[2])}:window.location.hash.startsWith("#/stats")?{type:"stats"}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/date")?{type:"date",date:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Ts=/^\s*([a-zA-Z]+)\:/,Us=/^\s*"([^\"]+?)"/,Ls=/^\s*([^\s]+)/,W=class{static START="START";static RELATION="RELATION";static SUBQUERY="SUBQUERY";static END="END"},Cs=class{state;lastState;constructor(){this.state=W.RELATION,this.lastState=W.START}parseRelation(s){let t=s.match(Ts);if(!t)throw new SyntaxError(`failed while parsing relationship: ${s}, expected relation`);return[t[1],s.slice(t[0].length)]}parseSubquery(s){let t=s.match(Us);if(t)return[t[1],s.slice(t[0].length)];let e=s.match(Ls);if(e)return[e[1],s.slice(e[0].length)];throw new SyntaxError(`subquery: failed to parse query: ${s}, expected subquery`)}advanceState(s){this.lastState=this.state,this.state=s}tokenise(s){let t=s.trim(),e=[],i={};for(;t.length>0;){if(this.state===W.RELATION){let r=this.parseRelation(t);i.relation=r[0],t=r[1],this.advanceState(W.SUBQUERY);continue}if(this.state===W.SUBQUERY){let r=this.parseSubquery(t);i.subquery=r[0],t=r[1],e.push({...i}),t=r[1],this.advanceState(W.RELATION);continue}if(this.state===this.lastState)throw new SyntaxError(`failed to parse query: ${s}, expected relation`)}for(let r of e){if(!r.relation)throw new SyntaxError(`failed to parse query: ${s}, expected relation`);if(!r.subquery)throw new SyntaxError(`failed to parse query: ${s}, expected subquery`)}return e}},Vt=class{content;comparators;constructor(s,t){this.content=s,this.comparators=t}*search(s){let e=new Cs().tokenise(s);for(let i of this.content){let r=!0;for(let{relation:o,subquery:a}of e){if(!o||!a)continue;let h=this.comparators[o];if(!h)r=!1;else if(!r)continue;console.log(this.comparators,i,a),r=r&&h(i,a)}r&&(yield i)}}};function Ct(s){let t=new Set(["yes","true","1"]),e=new Set(["no","false","0"]);if(t.has(s))return!0;if(e.has(s))return!1;throw new SyntaxError(`Invalid boolean value: ${s}`)}function Ms(s){return s.startsWith(">")?[">",s.slice(1)]:s.startsWith("<")?["<",s.slice(1)]:["=",s]}function zt(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e,a=Ct(t);return i===s.id&&r==="in_flight"&&(a?o==="Yes":o!=="Yes")})}function ks(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e,a=Ct(t);return i===s.id&&r==="living_conditions"&&(a?o!=="Wild":o==="Wild")})}function Os(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e,a=Ct(t);return i===s.id&&r==="living_conditions"&&(a?o==="Wild":o!=="Wild")})}function Ds(s,t){let[e,i]=Ms(t),r=parseInt(i,10);if(isNaN(r))throw new SyntaxError(`Invalid rating value: ${i}`);return(window[M]??[]).some(o=>{let[a,h,n]=o,p=a===s.id&&h==="rating";return e==="="?p&&n.length===r:e===">"?p&&n.length>r:e==="<"?p&&n.length<r:!1})}function Rs(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e;return i===s.id&&r==="style"&&o.toLowerCase()===t.toLowerCase()})}function Ns(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e;return i===s.id&&r==="wildlife"&&o.toLowerCase()===t.toLowerCase()})}function Xe(s,t){return(window[M]??[]).some(e=>{let[i,r,o]=e,a=Ct(t);return i===s.id&&r==="has_body_of_water"&&(a?o==="Yes":o!=="Yes")})}var Is={watery:Xe,has_water:Xe,wildlife:Ns,inFlight:zt,in_flight:zt,flying:zt,rating:Ds,captive:ks,wild:Os,style:Rs},Ps={},at=class{static photos(t){return new Vt(t,Is)}static albums(t){return new Vt(t,Ps)}};var Zt=class extends m{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),c`
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
            @click=${this.broadcast("navigate-page",{page:"tags"})}
            id="tags-sidebar-link" class="sidebar-item">TAGS</li>

          <li
            @click=${this.broadcast("navigate-page",{page:"about"})}
            class="sidebar-item">ABOUT</li>

      </nav>
    </aside>
    `}};customElements.define("photo-sidebar",Zt);var Ft=class extends m{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Je;return c`
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
    `}};customElements.define("photo-header",Ft);var Wt=class extends m{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailDataUrl:{type:String},thumbnailUrl:{type:String},tags:{type:Array},loading:{type:String}}}renderIcon(){return c`
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
    `}};customElements.define("app-photo",Wt);var qt=class extends m{static get properties(){return{entity:{type:String},content:{type:Array}}}broadcastQuery(t){let e=document.querySelector("#search"),i=new CustomEvent("search-query",{detail:{query:e.value},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return c`
    <input
      @keyup=${this.broadcastQuery}
      class="search-bar"
      type="search"
      name="query"
      id="search"
      placeholder="Search..." />
    `}};customElements.define("content-searchbar",qt);var B=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(i/r);return t>o*a+1?"lazy":"eager"}};var A=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let i=`/feeds/tags/${t}.json`;e.href=i}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var Qt=class extends m{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allImages(){return this.images.images?this.images.images():this.images._data.map(Z.processImage)}render(){let t=this.allImages().map((e,i)=>c`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${B.loadingMode(i)}"
        thumbnailUrl="${e.thumbnail_url}"
        thumbnailDataUrl="${e.thumbnail_mosaic_url}"
        imageUrl="${e.full_image}"></app-photo>`);return c`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <content-searchbar entity="photo" .content=${this.allImages()}>
      </content-searchbar>

      <section class="photo-container">
        ${t}
      </section>
    </div>
    `}};customElements.define("photos-page",Qt);var D=class s{static parse(t){let[e,i]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${i}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[i,r]=e.split("T")[0].replace(/\:/g,"-");return`${i.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,i=-1/0;for(let r of t){if(!r.created_at)continue;let o=s.parse(r.created_at);o<e&&(e=o),o>i&&(i=o)}return[e,i]}static dateRange(t,e,i){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),o=e instanceof Date?e:new Date(parseFloat(e));if(i){let a={day:"numeric",month:"short"},h=r.toLocaleDateString("en-IE",a),n=o.toLocaleDateString("en-IE",a),p=r.toLocaleDateString("en-IE",{day:"numeric"}),f=o.toLocaleDateString("en-IE",{day:"numeric"}),u=r.toLocaleDateString("en-IE",{month:"short"}),b=o.toLocaleDateString("en-IE",{month:"short"}),g=r.getFullYear(),w=o.getFullYear(),k=u===b,q=g===w;return h===n?`${h} ${g}`:k&&q?`${p} - ${f} ${b} ${g}`:`${h} ${g} - ${n} ${w}`}else{let a={year:"numeric",month:"short",day:"numeric"},h=r.toLocaleDateString("en-IE",a),n=o.toLocaleDateString("en-IE",a);return h===n?h:`${h} \u2014 ${n}`}}};var Jt=class extends m{static get properties(){return{title:{type:String},url:{type:String},thumbnailDataUrl:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:Array},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return D.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){return performance.mark(`start-album-render-${this.url}`),c`
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
    `}};customElements.define("photo-album",Jt);var Kt=class extends m{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}processAlbum(t){let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,thumbnailDataUrl:`data:image/bmp;base64,${t.thumbnail_mosaic_url}`,id:t.id,count:e,flags:(t.flags??"").split(",")}}getAlbums(){return this.albums.albums?Object.values(this.albums.albums()).map(this.processAlbum):this.albums._data.map(F.processAlbum).map(this.processAlbum)}imageCount(){let t=0;for(let e of this.getAlbums())t+=e.count;return t}loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(i/r);return t>o*a?"lazy":"eager"}render(){return performance.mark("start-albums-render"),c`

    <section class="album-metadata">
    <h1>Albums</h1>
    <p class="photo-count">${this.imageCount()} photos</p>
    </section>

    <content-searchbar entity="album" .content=${this.getAlbums()}>
    </content-searchbar>

    <section class="album-container">
      ${this.getAlbums().sort((t,e)=>e.maxDate-t.maxDate).map((t,e)=>{let i=this.loadingMode(e);return c`
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
    `}};customElements.define("photo-album-page",Kt);var Xt=class extends m{static get properties(){return{albums:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}firstUpdated(){super.firstUpdated();let t=this.querySelector("#map"),e=createMap(t).setView([We,qe],Qe);e.addLayer(tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{minZoom:4}));let r=this.albums.albums();for(let o of Object.values(r)){let a=o.geolocation;a&&geoJSON(a,{style:function(){return{color:"red"}},onEachFeature:(h,n)=>{let p=`
            <section>
              <h3>${o.name}</h3>
              <div class="photo" onclick="">
                <a href="#/album/${o.id}">
                  <img width="170" height="170" src="${o.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;n.bindPopup(p)}}).addTo(e)}}render(){return c`
    <section>
      <h1>Locations</h1>

      <div id="map"></div>
    </section>
    `}};customElements.define("locations-page",Xt);var te=class extends m{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return c`
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
    `}};customElements.define("app-video",te);var ee=class extends m{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",ee);var Mt=class s{static setXTheEverythingAppFormallyKnownAsTwitter(t){let e=document.querySelector('meta[property="twitter:url"]');e.setAttribute("content",t.url),document.querySelector('meta[name="twitter:title"]').setAttribute("content",t.title),document.querySelector('meta[name="twitter:description"]').setAttribute("content",t.description),document.querySelector('meta[name="twitter:image"]').setAttribute("content",t.image),console.log(e)}static setOpenGraph(t){document.querySelector('meta[property="og:url"]').setAttribute("content",t.url),document.querySelector('meta[property="og:title"]').setAttribute("content",t.title),document.querySelector('meta[property="og:description"]').setAttribute("content",t.description),document.querySelector('meta[property="og:image"]').setAttribute("content",t.image)}static set(t){s.setXTheEverythingAppFormallyKnownAsTwitter(t),s.setOpenGraph(t)}};var se=class extends m{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object}}}connectedCallback(){super.connectedCallback();let t=this.albumPhotos()[0];t||console.error(`empty album! ${this.id}`),Mt.set({url:window.location.href,title:this.title,description:this.description,image:t.thumbnail_url}),A.setIndex()}albumPhotos(){return this.images.images().filter(t=>t.album_id===this.id)}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return console.log(this),this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}render(){let t=window.matchMedia("(max-width: 500px)"),e=D.dateRange(this.minDate,this.maxDate,t.matches),i=this.albumPhotos().map((o,a)=>c`
      <app-photo
        id=${o.id}
        tags="${o.tags}"
        loading="${B.loadingMode(a)}"
        thumbnailUrl="${o.thumbnail_url}"
        thumbnailDataUrl="${o.thumbnail_mosaic_url}"
        imageUrl="${o.full_image}"></app-photo>`),r=this.albumVideos().map((o,a)=>c`<app-video
        id=${o.id}
        url_poster=${o.poster_url}
        url_unscaled=${o.video_url_unscaled}
        url_1080p=${o.video_url_1080p}
        url_720p=${o.video_url_720p}
        url_480p=${o.video_url_480p}
        ></app-video>`);return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-description">${yt(this.description)}</p>
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
    `}};customElements.define("album-page",se);var ie=class extends m{connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return c`
    <section>
      <h1>Statistics</h1>
    </section>
    `}};customElements.define("stats-page",ie);var re=class extends m{static get properties(){return{tag:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setTag(this.tag)}photos(){return this.images.images().filter(t=>t.tags.includes(this.tag))}imageCount(){return this.photos().length}render(){let t=window.matchMedia("(max-width: 500px)"),[e,i]=D.findRange(this.photos()),r=D.dateRange(e,i,t.matches);return c`
    <div>
      <section class="photos-metadata">
        <h1>${this.tag}</h1>
        <p class="photo-album-date">${r}</p>
        <p class="photo-album-count">${this.imageCount()} photos</p>
      </section>

      <section class="photo-container">
        ${this.photos().map(o=>c`
        <app-photo
          id="${o.id}"
          tags="${o.tags}"
          loading="${"lazy"}"
          thumbnailUrl="${o.thumbnail_url}"
          thumbnailDataUrl="${o.thumbnail_mosaic_url}"
          imageUrl="${o.full_image}"></app-photo>`)}
      </section>
    </div>
    `}};customElements.define("tag-page",re);var oe=class extends m{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,i=encodeURIComponent(t);return typeof e>"u"?c`<a
        href="#/tag/${i}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:c`<a
      href="#/tag/${i}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",oe);var ae=class extends m{static get properties(){return{tagName:{type:String},url:{type:String},thumbnailDataUrl:{type:String},links:{type:Object},loading:{type:String}}}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let{tagName:t}=this;return c`<div class="photo-album">
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
    </div>`}};customElements.define("tag-album",ae);var ne=class extends m{static get properties(){return{images:{type:Object},metadata:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}tags(){let t={};for(let e of this.images.images())for(let i of e.tags)t[i]||(t[i]=0),t[i]++;return Object.entries(t).toSorted((e,i)=>e[0].localeCompare(i[0]))}renderTagLink(t){return c`<li>
      <tag-link tagName="${t[0]}" count="${t[1]}"></tag-link>
    </li>`}tagCover(t){return this.images.images().filter(i=>i.tags.includes(t))[0]}tagLinks(t){return this.metadata[t]?.links}renderTagCover(t){let e=this.tagCover(t),i=this.tagLinks(t);if(!e){console.error(`No cover image for tag: ${t}`);return}return c`<tag-album url="${e.thumbnail_url}" thumbnailDataUrl="${e.thumbnail_mosaic_url}" tagName=${t} .links=${i}>`}tagsFamily(t,e){let i=new Set(t._data[e].children);return Array.from(i).sort()}render(){return c`
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
    `}};customElements.define("tags-page",ne);var le=class extends m{static get properties(){return{url:{type:String},format:{type:String},sharing:{state:!0,type:Boolean}}}async shareImage(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{let e=await fetch(t),i=new URL(t).pathname;await navigator.share({title:i,files:[new File([await e.blob()],i,{type:this.format})]})}finally{this.sharing=!1}}}render(){return this.sharing?c`<button class="photo-share-button" disabled>[sharing...]</button>`:c`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareImage.bind(this,this.url)}>[share]</button>
      `}};customElements.define("share-metadata-button",le);var ce=class extends m{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean}}}connectedCallback(){super.connectedCallback(),A.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?c`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?c`<td>Manual aperture control</td>`:c`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?c`${this.exif.focal_length}`:this.exif.focal_length==="0"?c`<td>Manual lens</td>`:c`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){return t.includes("binomial")?c`<em>${e}</em>`:e}renderSemanticData(t){return c`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${Object.keys(t).sort().map(e=>c`
            <tr>
              <th class="exif-heading">${this.renderSemanticKey(e)}</th>
              <td>${this.renderSemanticValue(e,t[e])}</td>
          `)}
      <table>
    `}render(){let t=this.image,e=this.exif,i=this.semantic;return c`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${t.thumbnail_url}"/>

      <p>
        <a href="${t.full_image}">[full image]</a>
        <share-metadata-button format="image/webp" url=${t.image_url}></share-metadata-button>
      </p>

      ${t.description?c`<br/><p>${yt(t.description)}</p>`:c``}

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
    `}};customElements.define("metadata-page",ce);var he=class extends m{static get properties(){return{date:{type:String},images:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}datePhotos(){return this.images.images().filter(t=>{if(!t.created_at)return!1;let[e]=t.created_at.split(" ");return e.replace(/\:/g,"-")===this.date})}render(){let t=this.datePhotos().map((e,i)=>c`
      <app-photo
        id=${e.id}
        tags="${e.tags}"
        loading="${B.loadingMode(i)}"
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
    `}};customElements.define("date-page",he);var de=class extends m{static get properties(){return{}}connectedCallback(){super.connectedCallback(),A.setIndex()}render(){return c`
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
    `}};customElements.define("about-page",de);var kt=class{static loadingMode(t){let e=window.innerWidth,i=window.innerHeight,r=400,o=Math.floor(e/r),a=Math.floor(i/r),h=t>o*a+1;return t===0?"auto":"none"}};var ue=class extends m{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),A.setIndex()}allVideos(){return this.videos.videos()}render(){let t=this.allVideos().map((e,i)=>c`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${kt.loadingMode(i)}"
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
    `}};customElements.define("videos-page",ue);var S=new F,v=new Z,E=new xt,T=new Lt,U=new Tt,L=new Ut,Bs=[[S,l.EAGER],[v,l.EAGER],[E,l.EAGER],[T,l.EAGER],[U,l.EAGER],[L,l.EAGER]],Gs={[d.ABOUT]:[[S,l.LAZY],[v,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.ALBUMS]:[[S,l.EAGER],[v,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.PHOTOS]:[[S,l.EAGER],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.VIDEOS]:[[S,l.LAZY],[v,l.LAZY],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.ALBUM]:[[S,l.EAGER],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.PHOTO]:[[S,l.EAGER],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.DATE]:[[S,l.EAGER],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.LAZY],[L,l.LAZY]],[d.TAG_ALBUM]:[[S,l.LAZY],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.TAG]:[[S,l.LAZY],[v,l.EAGER],[E,l.EAGER],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.LOCATIONS]:[[S,l.EAGER],[v,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]],[d.METADATA]:[[S,l.LAZY],[v,l.EAGER],[E,l.EAGER],[T,l.EAGER],[U,l.EAGER],[L,l.EAGER]],[d.STATS]:[[S,l.LAZY],[v,l.LAZY],[E,l.LAZY],[T,l.LAZY],[U,l.EAGER],[L,l.EAGER]]},pe=class{static async init(){let t=_.getUrl();console.log(`loading ${t?.type}`);let e=Gs[t?.type]??Bs,i=[];for(let[r,o]of e)o===l.EAGER?i.push(r.init()):o===l.LAZY&&r.init();await Promise.all(i)}};await pe.init();var me=class s extends m{static DEFAULT_PAGE=d.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:d.ALBUM,albums:d.ALBUMS,photos:d.PHOTOS,date:d.DATE,"tag-album":d.TAG_ALBUM,tags:d.TAGS,locations:d.LOCATIONS,stats:d.STATS,metadata:d.METADATA,about:d.ABOUT,videos:d.VIDEOS};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},tags:{type:Array},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:String},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=_.getUrl();s.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=s.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=s.DEFAULT_PAGE),this.page===d.METADATA||this.page===d.ALBUM||this.page===d.METADATA?this.id=t.id:this.page===d.TAG_ALBUM?this.tag=t.tag:this.page===d.DATE&&(this.date=t.date)}receiveClickAlbum(t){let{title:e,id:i}=t.detail;this.page=d.PHOTOS,this.id=i,this.title=e,_.showAlbumUrl(i)}async receiveClickTag(t){let{tagName:e}=t.detail;this.page=d.TAG_ALBUM,this.tag=e,_.showTagAlbumUrl(e)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:i,thumbnailUrl:r,tags:o}=t.detail;this.page=d.METADATA,this.id=e,this.imageUrl=i,this.thumbnailUrl=r,this.tags=o??[],_.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.page===d.ABOUT?_.showAboutUrl():this.page===d.PHOTOS?_.showPhotosUrl():this.page===d.ALBUMS?_.showAlbumsUrl():this.page===d.TAGS?_.showTagsUrl():this.page===d.LOCATIONS?_.showLocationsUrl():this.page===d.STATS?_.showStatsUrl():this.page===d.PHOTOS?_.showAlbumUrl(this.id):this.page===d.METADATA?_.showMetadataUrl(this.id):this.page===d.DATE?_.showDateUrl(this.date):this.page===d.VIDEOS?_.showVideosUrl():_.showAlbumsUrl(),this.sidebarVisible=!1}filterContent(t){if(!this.query?.trim())return t;let e;this.entity="photo";let i=t._data;if(this.entity==="photo")e=at.photos(i);else if(this.entity==="album")e=at.albums(i);else throw new Error(`incorrectily initialised with ${this.entity}`);try{return{_data:Array.from(e.search(this.query??"")),url:t.url}}catch(r){return r instanceof SyntaxError||console.error(r),t}}receiveSearchQuery(t){_.showSearchQuery(t.detail.query),this.query=t.detail.query}renderPage(t){let e=["page"];if(t&&e.push("sidebar-visible"),!this.page||this.page==="albums")return c`
      <photo-album-page .albums="${this.filterContent(S)}" class="${e.join(" ")}"></photo-album-page>
      `;if(this.page===d.ABOUT)return c`<about-page class="${e.join(" ")}"></about-page>`;if(this.page===d.PHOTOS)return c`<photos-page class="${e.join(" ")}" .images=${this.filterContent(v)}></photos-page>`;if(this.page===d.ALBUM){this.id||console.error("no album id provided");let i=S.albums().find(r=>r.id===this.id);return i||console.error(`failed to find album with id ${this.id}`),c`
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
      `}if(this.page===d.DATE)return console.log(this.date),c`<date-page
        .images=${v} date="${this.date}"
        ></date-page>`;if(this.page===d.TAG_ALBUM)return c`
      <tag-page tag=${this.tag} .images=${v} class="${e.join(" ")}"></tag-page>
      `;if(this.page===d.TAGS)return c`
      <tags-page class="${e.join(" ")}" .metadata=${T} .images=${v}></tags-page>
      `;if(this.page===d.LOCATIONS)return c`
      <locations-page .albums="${S}" class="${e.join(" ")}"></locations-page>
      `;if(this.page===d.STATS)return c`
      <stats-page class="${e.join(" ")}"></stats-page>
      `;if(this.page===d.METADATA){let i=v.images().find(h=>h.id===this.id),r=U.exif().find(h=>h.id===this.id),o=L.semantic().filter(h=>h[0]===this.id),a={};for(let[h,n,p]of o)a[n]?typeof a[n]=="string"&&(a[n]=Array.from(new Set([a[n],p]))):a[n]=p;return i||console.error(`failed to find photo with id ${this.id}`),c`
      <metadata-page .image=${i} .semantic=${a} .exif=${r} id=${this.id} class="${e.join(" ")}"></metadata-page>
      `}if(this.page===d.VIDEOS)return c`
      <videos-page .videos=${E} class="${e.join(" ")}"></videos-page>
      `}loadDarkMode(){return typeof this.darkMode<"u"?this.darkMode:localStorage.getItem("darkMode")==="true"}render(){let t=["app-container"];this.sidebarVisible&&t.push("sidebar-visible");let e=document.documentElement,i=["photos-app"];return this.darkMode?(e.classList.add("dark-mode"),i.push("dark-mode")):e.classList=[],c`
    <body>
      <div class="${i.join(" ")}"
        @click-album=${this.receiveClickAlbum}
        @click-tag=${this.receiveClickTag}
        @click-burger-menu=${this.receiveClickBurgerMenu}
        @click-photo-metadata=${this.receiveClickPhotoMetadata}
        @switch-theme=${this.receiveSwitchTheme}
        @search-query=${this.receiveSearchQuery}
        @navigate-page=${this.receiveNavigatePage}>

        <photo-header .tag=${this.tag} .darkMode=${this.loadDarkMode()}></photo-header>

        <div class="${t.join(" ")}">
            <photo-sidebar visible=${this.sidebarVisible}></photo-sidebar>
            ${this.renderPage(this.sidebarVisible)}
        </div>
      </div>
    </body>
    `}};customElements.define("photo-app",me);export{Bs as DEFAULT_DEPENDENCIES,Gs as PAGE_DEPENDECIES,me as PhotoApp};
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
