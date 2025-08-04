var dt=globalThis,Wt=dt.ShadowRoot&&(dt.ShadyCSS===void 0||dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ne=Symbol(),Ae=new WeakMap,Vt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Wt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ae.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ae.set(e,t))}return t}toString(){return this.cssText}},Xe=i=>new Vt(typeof i=="string"?i:i+"",void 0,Ne);var ts=(i,t)=>{if(Wt)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=dt.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},_e=Wt?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Xe(e)})(i):i,{is:es,defineProperty:ss,getOwnPropertyDescriptor:is,getOwnPropertyNames:rs,getOwnPropertySymbols:ns,getPrototypeOf:os}=Object,vt=globalThis,ve=vt.trustedTypes,as=ve?ve.emptyScript:"",ls=vt.reactiveElementPolyfillSupport,it=(i,t)=>i,zt={toAttribute(i,t){switch(t){case Boolean:i=i?as:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},De=(i,t)=>!es(i,t),Se={attribute:!0,type:String,converter:zt,reflect:!1,hasChanged:De};Symbol.metadata??=Symbol("metadata"),vt.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=Se){if(e.state&&(e.attribute=!1),this.o(),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&ss(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=is(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r?.call(this)},set(o){let c=r?.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Se}static o(){if(this.hasOwnProperty(it("elementProperties")))return;let t=os(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(it("properties"))){let e=this.properties,s=[...rs(e),...ns(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this.u=new Map;for(let[e,s]of this.elementProperties){let r=this.p(e,s);r!==void 0&&this.u.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(_e(r))}else t!==void 0&&e.push(_e(t));return e}static p(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ts(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this.P?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}C(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor.p(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:zt).toAttribute(e,s.type);this.m=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this.m=null}}_$AK(t,e){let s=this.constructor,r=s.u.get(t);if(r!==void 0&&this.m!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:zt;this.m=r,this[r]=o.fromAttribute(e,n.type),this.m=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??De)(this[t],e))return;this.T(t,e,s)}this.isUpdatePending===!1&&(this.S=this.A())}T(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this.m!==t&&(this.M??=new Set).add(t)}async A(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[r,n]of this.v)this[r]=n;this.v=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.T(r,this[r],n)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach(s=>s.hostUpdate?.()),this.update(e)):this.k()}catch(s){throw t=!1,this.k(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}k(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.M&&=this.M.forEach(e=>this.C(e,this[e])),this.k()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[it("elementProperties")]=new Map,j[it("finalized")]=new Map,ls?.({ReactiveElement:j}),(vt.reactiveElementVersions??=[]).push("2.0.4");var qt=globalThis,pt=qt.trustedTypes,we=pt?pt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Kt="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,Jt="?"+D,cs=`<${Jt}>`,F=document,nt=()=>F.createComment(""),ot=i=>i===null||typeof i!="object"&&typeof i!="function",Be=Array.isArray,He=i=>Be(i)||typeof i?.[Symbol.iterator]=="function",jt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,xe=/>/g,V=RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Te=/"/g,je=/^(?:script|style|textarea|title)$/i,Ge=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),a=Ge(1),hs=Ge(2),v=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ce=new WeakMap,z=F.createTreeWalker(F,129);function Ye(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(t):t}var Ve=(i,t)=>{let e=i.length-1,s=[],r,n=t===2?"<svg>":"",o=st;for(let c=0;c<e;c++){let l=i[c],p,$,d=-1,b=0;for(;b<l.length&&(o.lastIndex=b,$=o.exec(l),$!==null);)b=o.lastIndex,o===st?$[1]==="!--"?o=Ee:$[1]!==void 0?o=xe:$[2]!==void 0?(je.test($[2])&&(r=RegExp("</"+$[2],"g")),o=V):$[3]!==void 0&&(o=V):o===V?$[0]===">"?(o=r??st,d=-1):$[1]===void 0?d=-2:(d=o.lastIndex-$[2].length,p=$[1],o=$[3]===void 0?V:$[3]==='"'?Te:Ue):o===Te||o===Ue?o=V:o===Ee||o===xe?o=st:(o=V,r=void 0);let f=o===V&&i[c+1].startsWith("/>")?" ":"";n+=o===st?l+cs:d>=0?(s.push(p),l.slice(0,d)+Kt+l.slice(d)+D+f):l+D+(d===-2?c:f)}return[Ye(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]},at=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0,c=t.length-1,l=this.parts,[p,$]=Ve(t,e);if(this.el=i.createElement(p,s),z.currentNode=this.el.content,e===2){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=z.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(Kt)){let b=$[o++],f=r.getAttribute(d).split(D),A=/([.?@])?(.*)/.exec(b);l.push({type:1,index:n,name:A[2],strings:f,ctor:A[1]==="."?mt:A[1]==="?"?ft:A[1]==="@"?gt:W}),r.removeAttribute(d)}else d.startsWith(D)&&(l.push({type:6,index:n}),r.removeAttribute(d));if(je.test(r.tagName)){let d=r.textContent.split(D),b=d.length-1;if(b>0){r.textContent=pt?pt.emptyScript:"";for(let f=0;f<b;f++)r.append(d[f],nt()),z.nextNode(),l.push({type:2,index:++n});r.append(d[b],nt())}}}else if(r.nodeType===8)if(r.data===Jt)l.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(D,d+1))!==-1;)l.push({type:7,index:n}),d+=D.length-1}n++}}static createElement(t,e){let s=F.createElement("template");return s.innerHTML=t,s}};function Z(i,t,e=i,s){if(t===v)return t;let r=s!==void 0?e.U?.[s]:e.N,n=ot(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e.U??=[])[s]=r:e.N=r),r!==void 0&&(t=Z(i,r._$AS(i,t.values),r,s)),t}var ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}O(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??F).importNode(e,!0);z.currentNode=r;let n=z.nextNode(),o=0,c=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new St(n,n.nextSibling,this,t):l.type===1?p=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(p=new $t(n,this,t)),this._$AV.push(p),l=s[++c]}o!==l?.index&&(n=z.nextNode(),o++)}return z.currentNode=F,r}R(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},St=class ze{get _$AU(){return this._$AM?._$AU??this.V}constructor(t,e,s,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this.V=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ot(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==v&&this.L(t):t._$litType$!==void 0?this.I(t):t.nodeType!==void 0?this.j(t):He(t)?this.D(t):this.L(t)}H(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}j(t){this._$AH!==t&&(this._$AR(),this._$AH=this.H(t))}L(t){this._$AH!==_&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.j(F.createTextNode(t)),this._$AH=t}I(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=at.createElement(Ye(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.R(e);else{let n=new ut(r,this),o=n.O(this.options);n.R(e),this.j(o),this._$AH=n}}_$AC(t){let e=Ce.get(t.strings);return e===void 0&&Ce.set(t.strings,e=new at(t)),e}D(t){Be(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new ze(this.H(nt()),this.H(nt()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this.V=t,this._$AP?.(t))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,e=this,s,r){let n=this.strings,o=!1;if(n===void 0)t=Z(this,t,e,0),o=!ot(t)||t!==this._$AH&&t!==v,o&&(this._$AH=t);else{let c=t,l,p;for(t=n[0],l=0;l<n.length-1;l++)p=Z(this,c[s+l],e,l),p===v&&(p=this._$AH[l]),o||=!ot(p)||p!==this._$AH[l],p===_?t=_:t!==_&&(t+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!r&&this.B(t)}B(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mt=class extends W{constructor(){super(...arguments),this.type=3}B(t){this.element[this.name]=t===_?void 0:t}},ft=class extends W{constructor(){super(...arguments),this.type=4}B(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}},gt=class extends W{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??_)===v)return;let s=this._$AH,r=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==_&&(s===_||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},$t=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},ds={W:Kt,q:D,J:Jt,Z:1,F:Ve,G:ut,K:He,X:Z,Y:St,tt:W,st:ft,it:gt,et:mt,ot:$t},ps=qt.litHtmlPolyfillSupport;ps?.(at,St),(qt.litHtmlVersions??=[]).push("3.1.3");var Fe=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new St(t.insertBefore(nt(),n),n,void 0,e??{})}return r._$AI(i),r};var Y=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this.ht=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ht=Fe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.ht?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.ht?.setConnected(!1)}render(){return v}};Y._$litElement$=!0,Y.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:Y});var us=globalThis.litElementPolyfillSupport;us?.({LitElement:Y});(globalThis.litElementVersions??=[]).push("4.0.5");var{Y:ms}=ds,fs=i=>i===null||typeof i!="object"&&typeof i!="function";var Le=(i,t)=>t===void 0?i?._$litType$!==void 0:i?._$litType$===t,gs=i=>i?._$litType$?.h!=null;var Ze=i=>i.strings===void 0,Me=()=>document.createComment(""),G=(i,t,e)=>{let s=i._$AA.parentNode,r=t===void 0?i._$AB:t._$AA;if(e===void 0){let n=s.insertBefore(Me(),r),o=s.insertBefore(Me(),r);e=new ms(n,o,i,i.options)}else{let n=e._$AB.nextSibling,o=e._$AM,c=o!==i;if(c){let l;e._$AQ?.(i),e._$AM=i,e._$AP!==void 0&&(l=i._$AU)!==o._$AU&&e._$AP(l)}if(n!==r||c){let l=e._$AA;for(;l!==n;){let p=l.nextSibling;s.insertBefore(l,r),l=p}}}return e},H=(i,t,e=i)=>(i._$AI(t,e),i),$s={},lt=(i,t=$s)=>i._$AH=t,Ft=i=>i._$AH,Gt=i=>{i._$AP?.(!1,!0);let t=i._$AA,e=i._$AB.nextSibling;for(;t!==e;){let s=t.nextSibling;t.remove(),t=s}},We=i=>{i._$AR()};var E=i=>(...t)=>({_$litDirective$:i,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this.nt=t,this._$AM=e,this.rt=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var rt=(i,t)=>{let e=i._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),rt(s,t);return!0},bt=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},qe=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),As(t)}};function bs(i){this._$AN!==void 0?(bt(this),this._$AM=i,qe(this)):this._$AM=i}function ys(i,t=!1,e=0){let s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)rt(s[n],!1),bt(s[n]);else s!=null&&(rt(s,!1),bt(s));else rt(this,i)}var As=i=>{i.type==2&&(i._$AP??=ys,i._$AQ??=bs)},ct=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),qe(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(rt(this,t),bt(this))}setValue(t){if(Ze(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.rt]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var yt=class{constructor(t){this.ct=t}disconnect(){this.ct=void 0}reconnect(t){this.ct=t}deref(){return this.ct}},At=class{constructor(){this.lt=void 0,this.ut=void 0}get(){return this.lt}pause(){this.lt??=new Promise(t=>this.ut=t)}resume(){this.ut?.(),this.lt=this.ut=void 0}};var _t=class extends ct{constructor(){super(...arguments),this.dt=new yt(this),this.ft=new At}render(t,e){return v}update(t,[e,s]){if(this.isConnected||this.disconnected(),e===this.vt)return v;this.vt=e;let r=0,{dt:n,ft:o}=this;return(async(c,l)=>{for await(let p of c)if(await l(p)===!1)return})(e,async c=>{for(;o.get();)await o.get();let l=n.deref();if(l!==void 0){if(l.vt!==e)return!1;s!==void 0&&(c=s(c,r)),l.commitValue(c,r),r++}return!0}),v}commitValue(t,e){this.setValue(t)}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Us=E(_t),wt=E(class extends _t{constructor(i){if(super(i),i.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(i,t){return this.ht=i,super.update(i,t)}commitValue(i,t){t===0&&We(this.ht);let e=G(this.ht);H(e,i)}}),Re=i=>gs(i)?i._$litType$.h:i.strings,Ts=E(class extends L{constructor(i){super(i),this.yt=new WeakMap}render(i){return[i]}update(i,[t]){let e=Le(this.bt)?Re(this.bt):null,s=Le(t)?Re(t):null;if(e!==null&&(s===null||e!==s)){let r=Ft(i).pop(),n=this.yt.get(e);if(n===void 0){let o=document.createDocumentFragment();n=Fe(_,o),n.setConnected(!1),this.yt.set(e,n)}lt(n,[r]),G(n,void 0,r)}if(s!==null){if(e===null||e!==s){let r=this.yt.get(s);if(r!==void 0){let n=Ft(r).pop();We(i),G(i,void 0,n),lt(i,[n])}}this.bt=t}else this.bt=void 0;return this.render(t)}});var Cs=E(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.gt===void 0){this.gt=new Set,i.strings!==void 0&&(this.wt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.wt?.has(s)&&this.gt.add(s);return this.render(t)}let e=i.element.classList;for(let s of this.gt)s in t||(e.remove(s),this.gt.delete(s));for(let s in t){let r=!!t[s];r===this.gt.has(s)||this.wt?.has(s)||(r?(e.add(s),this.gt.add(s)):(e.remove(s),this.gt.delete(s)))}return v}}),_s={},Ls=E(class extends L{constructor(){super(...arguments),this._t=_s}render(i,t){return t()}update(i,[t,e]){if(Array.isArray(t)){if(Array.isArray(this._t)&&this._t.length===t.length&&t.every((s,r)=>s===this._t[r]))return v}else if(this._t===t)return v;return this._t=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Ms=E(class extends L{constructor(){super(...arguments),this.key=_}render(i,t){return this.key=i,t}update(i,[t,e]){return t!==this.key&&(lt(i),this.key=t),e}}),Rs=E(class extends L{constructor(i){if(super(i),i.type!==3&&i.type!==1&&i.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ze(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===v||t===_)return t;let e=i.element,s=i.name;if(i.type===3){if(t===e[s])return v;if(i.type===4){if(!!t===e.hasAttribute(s))return v;if(i.type===1&&e.getAttribute(s)===t+"")return v}}return lt(i),t}});var Yt=new WeakMap,Is=E(class extends ct{render(i){return _}update(i,[t]){let e=t!==this.ct;return e&&this.ct!==void 0&&this.St(void 0),(e||this.$t!==this.Tt)&&(this.ct=t,this.xt=i.options?.host,this.St(this.Tt=i.element)),_}St(i){if(typeof this.ct=="function"){let t=this.xt??globalThis,e=Yt.get(t);e===void 0&&(e=new WeakMap,Yt.set(t,e)),e.get(this.ct)!==void 0&&this.ct.call(this.xt,void 0),e.set(this.ct,i),i!==void 0&&this.ct.call(this.xt,i)}else this.ct.value=i}get $t(){return typeof this.ct=="function"?Yt.get(this.xt??globalThis)?.get(this.ct):this.ct?.value}disconnected(){this.$t===this.Tt&&this.St(void 0)}reconnected(){this.St(this.Tt)}}),Ie=(i,t,e)=>{let s=new Map;for(let r=t;r<=e;r++)s.set(i[r],r);return s},Os=E(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("repeat() can only be used in text expressions")}Et(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let r=[],n=[],o=0;for(let c of i)r[o]=s?s(c,o):o,n[o]=e(c,o),o++;return{values:n,keys:r}}render(i,t,e){return this.Et(i,t,e).values}update(i,[t,e,s]){let r=Ft(i),{values:n,keys:o}=this.Et(t,e,s);if(!Array.isArray(r))return this.Ct=o,n;let c=this.Ct??=[],l=[],p,$,d=0,b=r.length-1,f=0,A=n.length-1;for(;d<=b&&f<=A;)if(r[d]===null)d++;else if(r[b]===null)b--;else if(c[d]===o[f])l[f]=H(r[d],n[f]),d++,f++;else if(c[b]===o[A])l[A]=H(r[b],n[A]),b--,A--;else if(c[d]===o[A])l[A]=H(r[d],n[A]),G(i,l[A+1],r[d]),d++,A--;else if(c[b]===o[f])l[f]=H(r[b],n[f]),G(i,r[d],r[b]),b--,f++;else if(p===void 0&&(p=Ie(o,f,A),$=Ie(c,d,b)),p.has(c[d]))if(p.has(c[b])){let U=$.get(o[f]),et=U!==void 0?r[U]:null;if(et===null){let ye=G(i,r[d]);H(ye,n[f]),l[f]=ye}else l[f]=H(et,n[f]),G(i,r[d],et),r[U]=null;f++}else Gt(r[b]),b--;else Gt(r[d]),d++;for(;f<=A;){let U=G(i,l[A+1]);H(U,n[f]),l[f++]=U}for(;d<=b;){let U=r[d++];U!==null&&Gt(U)}return this.Ct=o,lt(i,l),v}}),Ke="important",vs=" !"+Ke,Ps=E(class extends L{constructor(i){if(super(i),i.type!==1||i.name!=="style"||i.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,e)=>{let s=i[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(i,[t]){let{style:e}=i.element;if(this.Pt===void 0)return this.Pt=new Set(Object.keys(t)),this.render(t);for(let s of this.Pt)t[s]==null&&(this.Pt.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let r=t[s];if(r!=null){this.Pt.add(s);let n=typeof r=="string"&&r.endsWith(vs);s.includes("-")||n?e.setProperty(s,n?r.slice(0,-11):r,n?Ke:""):e[s]=r}}return v}}),ks=E(class extends L{constructor(i){if(super(i),i.type!==2)throw Error("templateContent can only be used in child bindings")}render(i){return this.At===i?v:(this.At=i,document.importNode(i.content,!0))}}),J=class extends L{constructor(t){if(super(t),this.bt=_,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_||t==null)return this.kt=void 0,this.bt=t;if(t===v)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.bt)return this.kt;this.bt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};J.directiveName="unsafeHTML",J.resultType=1;var Et=E(J);var ht=class extends J{};ht.directiveName="unsafeSVG",ht.resultType=2;var Ns=E(ht),Oe=i=>!fs(i)&&typeof i.then=="function",Pe=1073741823;var Zt=class extends ct{constructor(){super(...arguments),this.Mt=Pe,this.Ut=[],this.dt=new yt(this),this.ft=new At}render(...t){return t.find(e=>!Oe(e))??v}update(t,e){let s=this.Ut,r=s.length;this.Ut=e;let n=this.dt,o=this.ft;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this.Mt);c++){let l=e[c];if(!Oe(l))return this.Mt=c,l;c<r&&l===s[c]||(this.Mt=Pe,r=0,Promise.resolve(l).then(async p=>{for(;o.get();)await o.get();let $=n.deref();if($!==void 0){let d=$.Ut.indexOf(l);d>-1&&d<$.Mt&&($.Mt=d,$.setValue(p))}}))}return v}disconnected(){this.dt.disconnect(),this.ft.pause()}reconnected(){this.dt.reconnect(this),this.ft.resume()}},Ds=E(Zt);var Ss=Symbol.for(""),ws=i=>{if(i?.r===Ss)return i?._$litStatic$};var ke=new Map,Je=i=>(t,...e)=>{let s=e.length,r,n,o=[],c=[],l,p=0,$=!1;for(;p<s;){for(l=t[p];p<s&&(n=e[p],(r=ws(n))!==void 0);)l+=r+t[++p],$=!0;p!==s&&c.push(n),o.push(l),p++}if(p===s&&o.push(t[s]),$){let d=o.join("$$lit$$");(t=ke.get(d))===void 0&&(o.raw=o,ke.set(d,t=o)),e=c}return i(t,...e)},Bs=Je(a),Hs=Je(hs);var u=class extends Y{createRenderRoot(){return this}broadcast(t,e){return()=>{let s=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(s)}}};var xt=Symbol("the albums manifest"),Ut=Symbol("the images manifest"),ti=Symbol("the site manifest"),Tt=Symbol("the videos manifest"),Ct=Symbol("the exif data"),Lt=Symbol("the semantic data"),ei=Symbol("the album stats"),Mt=Symbol("the triples data");var Qe="photos",h=class{static EAGER="eager";static LAZY="lazy"},m=class{static PHOTOS="photos";static ALBUMS="albums";static ALBUM="album";static METADATA="metadata";static ABOUT="about";static VIDEOS="videos";static THING="thing"},y=class{static UNESCO="unesco";static BIRD="bird";static MAMMAL="mammal";static REPTILE="reptile";static FISH="fish";static INSECT="insect";static AMPHIBIAN="amphibian";static GEONAME="geoname"},S=class{static SUBJECT="subject";static LOCATION="location";static LONGITUDE="longitude";static LATITUDE="latitude";static RATING="rating";static NAME="name";static BIRDWATCH_URL="birdwatch_url";static WIKIPEDIA="wikipedia"},Q=new Set(["bird","mammal","reptile","amphibian","fish","insect"]);var q=window.envConfig,Rt=class{_data;constructor(t=`/manifest/images.${q.publication_id}.json`){this.url=t}processImages(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Ut]&&(this._data=window[Ut]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processImages(t);window[Ut]=e,this._data=e}images(){return this._data.map(t=>({...t,full_image:`https://photos-cdn.rgrannell.xyz${t.full_image}`,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`}))}},It=class{_data;constructor(t=`/manifest/videos.${q.publication_id}.json`){this.url=t}processVideos(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Tt]&&(this._data=window[Tt]),this._data||this.loading)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.processVideos(t);window[Tt]=e,this._data=e}videos(){return this._data.map(t=>({...t,poster_url:`https://photos-cdn.rgrannell.xyz${t.poster_url}`,video_url_1080p:`https://photos-cdn.rgrannell.xyz${t.video_url_1080p}`,video_url_480p:`https://photos-cdn.rgrannell.xyz${t.video_url_480p}`,video_url_720p:`https://photos-cdn.rgrannell.xyz${t.video_url_720p}`,video_url_unscaled:`https://photos-cdn.rgrannell.xyz${t.video_url_unscaled}`,tags:(t.tags??"").split(",").filter(e=>e!="Published").map(e=>e.trim())}))}},Ot=class{_data;constructor(t=`/manifest/albums.${q.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};if(r.length!==e.length)throw new Error(`album row length mismatch: expected ${e.length}, got ${r.length}`);for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[xt]&&(this._data=window[xt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[xt]=e,this._data=e}albums(){return this._data.map(t=>({...t,thumbnail_url:`https://photos-cdn.rgrannell.xyz${t.thumbnail_url}`,thumbnail_mosaic_url:`${t.thumbnail_mosaic_url}`}))}},Pt=class{_data;constructor(t=`/manifest/exif.${q.publication_id}.json`){this.url=t}process(t){let e=t[0],s=[];for(let r of t.slice(1)){let n={};for(let o=0;o<e.length;o++)n[e[o]]=r[o];s.push(n)}return s}async init(){if(window[Ct]&&(this._data=window[Ct]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json(),e=this.process(t);window[Ct]=e,this._data=e}exif(){return this._data}};var kt=class{_data;constructor(t=`/manifest/semantic.${q.publication_id}.json`){this.url=t}async init(){if(window[Lt]&&(this._data=window[Lt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Lt]=t,this._data=t}semantic(){return this._data}},Nt=class{_data;constructor(t=`/manifest/stats.${q.publication_id}.json`){this.url=t}async init(){let t=document.getElementById("stats-data");this._data=JSON.parse(t.textContent),this._data||console.error("stats symbol not injected")}stats(){return this._data}},Dt=class{_data;constructor(t=`/manifest/triples.${q.publication_id}.json`){this.url=t}async init(){if(window[Mt]&&(this._data=window[Mt]),this._data)return;console.log(`\u{1F50E} fetching ${this.url}`);let t=await(await fetch(this.url)).json();window[Mt]=t,this._data=t}};var O=class i{static ROUTES={[m.PHOTOS]:this.showPhotosUrl,[m.ALBUMS]:this.showAlbumsUrl,[m.ALBUM]:this.showAlbumUrl,[m.METADATA]:this.showMetadataUrl,[m.ABOUT]:this.showAboutUrl,[m.VIDEOS]:this.showVideosUrl,[m.THING]:this.showThingUrl};static router(t){if(i.ROUTES.hasOwnProperty(t))return i.ROUTES[t];throw new Error(`Unknown page: ${t}`)}static pageUsesId(t){return t===m.ALBUM||t===m.PHOTO||t===m.METADATA||t===m.THING}static showAboutUrl(){window.location.hash="#/about",document.title="About - photos"}static showAlbumsUrl(){window.location.hash="#/albums",document.title="Albums - photos"}static showPhotosUrl(){window.location.hash="#/photos",document.title="Photos - photos"}static showAlbumUrl(t){window.location.hash=`#/album/${t}`,document.title="Album - photos"}static showPhotoUrl(t){window.location.hash=`#/photo/${t}`,document.title="Photo - photos"}static showMetadataUrl(t){window.location.hash=`#/metadata/${t}`,document.title="Metadata - photos"}static showVideosUrl(){window.location.hash="#/videos",document.title="Videos - photos"}static showThingUrl(t){window.location.hash=`#/thing/${t}`,document.title="Thing - photos"}static getUrl(){return window.location.hash.startsWith("#/albums")?{type:"albums"}:window.location.hash.startsWith("#/album")?{type:"album",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/metadata")?{type:"metadata",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/thing")?{type:"thing",id:window.location.hash.split("/")[2]}:window.location.hash.startsWith("#/photos")?{type:"photos"}:window.location.hash.startsWith("#/about")?{type:"about"}:window.location.hash.startsWith("#/videos")?{type:"videos"}:{type:"albums"}}};var Qt=class extends u{static get properties(){return{visible:{type:Boolean}}}render(){let t=["photo-sidebar"];return this.visible&&t.push("sidebar-visible"),a`
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
    `}};customElements.define("photo-sidebar",Qt);var Xt=class extends u{static get properties(){return{darkMode:{type:Boolean},tag:{type:String}}}feedUrl(){return this.tag?`/feeds/tags/${this.tag}.json`:"/manifest/atom/atom-index.xml"}render(){let t=this.darkMode?"\u2600\uFE0F":"\u{1F319}",e=Qe;return a`
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
    `}};customElements.define("photo-header",Xt);var Bt=new Map,x=class{static loadingMode(t){let e=window.innerWidth,s=window.innerHeight,r=400,n=Math.floor(e/r),o=Math.floor(s/r);return t>n*o+1?"lazy":"eager"}static encodeBitmapDataURL(t){if(Bt.has(t))return Bt.get(t);let e=t.split("#").map(n=>`#${n}`),s=document.createElement("canvas");s.width=2,s.height=2;let r=s.getContext("2d");return r.fillStyle=e[1],r.fillRect(0,0,1,1),r.fillStyle=e[2],r.fillRect(1,0,1,1),r.fillStyle=e[3],r.fillRect(0,1,1,1),r.fillStyle=e[4],r.fillRect(1,1,1,1),Bt.set(t,s.toDataURL("image/png")),Bt.get(t)}};var te=class extends u{static get properties(){return{id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},mosaicColours:{type:String},summary:{type:String},loading:{type:String}}}renderIcon(){return a`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.thumbnailUrl})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){let t={id:this.id,imageUrl:this.imageUrl,thumbnailUrl:this.thumbnailUrl,thumbnailDataUrl:x.encodeBitmapDataURL(this.mosaicColours)},e=document.createElement("div");e.innerHTML=this.summary??"";let s=e.textContent??e.innerText??"";return a`
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
    `}};customElements.define("app-photo",te);var ee=class extends u{render(){return a`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `}};customElements.define("search-bar",ee);var w=class{static getElement(){return document.getElementById("rss")}static setTag(t){let e=this.getElement();if(!e||!t)return;let s=`/feeds/tags/${t}.json`;e.href=s}static setIndex(){let t=this.getElement();if(!t)return;let e="/manifest/atom/atom-index.xml";t.href=e}};var se=class extends u{static get properties(){return{images:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}allImages(){return this.images.images().sort((t,e)=>e.created_at-t.created_at)}render(){let t=this.allImages();async function*e(){for(let s=0;s<t.length;s++){let r=t[s];yield a`
          <app-photo
            id=${r.id}
            loading="${x.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`}}return a`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${wt(e())}
      </section>
    </div>
    `}};customElements.define("photos-page",se);var ie=class extends u{static get properties(){return{albums:{type:Array},stats:{type:Array}}}render(){return a`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `}};customElements.define("photos-stats",ie);var X=class i{static parse(t){let[e,s]=t.split(" ");return e=e.replace(/:/g,"-"),new Date(`${e} ${s}`)}static formatExifDate(t){if(!t)return t;let e=new Date(t).toISOString(),[s,r]=e.split("T")[0].replace(/\:/g,"-");return`${s.replace(/\:/g,"/")} ${r}`}static findRange(t){let e=1/0,s=-1/0;for(let r of t){if(!r.created_at)continue;let n=i.parse(r.created_at);n<e&&(e=n),n>s&&(s=n)}return[e,s]}static dateRange(t,e,s){if(!t&&!e)return"unknown date";let r=t instanceof Date?t:new Date(parseFloat(t)),n=e instanceof Date?e:new Date(parseFloat(e));if(s){let o={day:"numeric",month:"short"},c=r.toLocaleDateString("en-IE",o),l=n.toLocaleDateString("en-IE",o),p=r.toLocaleDateString("en-IE",{day:"numeric"}),$=n.toLocaleDateString("en-IE",{day:"numeric"}),d=r.toLocaleDateString("en-IE",{month:"short"}),b=n.toLocaleDateString("en-IE",{month:"short"}),f=r.getFullYear(),A=n.getFullYear(),U=d===b,et=f===A;return c===l?`${c} ${f}`:U&&et?`${p} - ${$} ${b} ${f}`:`${c} ${f} - ${l} ${A}`}else{let o={year:"numeric",month:"short",day:"numeric"},c=r.toLocaleDateString("en-IE",o),l=n.toLocaleDateString("en-IE",o);return c===l?c:`${c} \u2014 ${l}`}}};var tt=class i{static TABLE={England:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",France:"\u{1F1EB}\u{1F1F7}",Germany:"\u{1F1E9}\u{1F1EA}",Ireland:"\u{1F1EE}\u{1F1EA}",Italy:"\u{1F1EE}\u{1F1F9}",Lanzarote:"\u{1F1EA}\u{1F1F8}",Mallorca:"\u{1F1EA}\u{1F1F8}","Northern Ireland":"\u{1F1EC}\u{1F1E7}",Norway:"\u{1F1F3}\u{1F1F4}",Scotland:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",Slovenia:"\u{1F1F8}\u{1F1EE}",Spain:"\u{1F1EA}\u{1F1F8}",Sweden:"\u{1F1F8}\u{1F1EA}",Switzerland:"\u{1F1E8}\u{1F1ED}",Tenerife:"\u{1F1EA}\u{1F1F8}","The Netherlands":"\u{1F1F3}\u{1F1F1}","United States of America":"\u{1F1FA}\u{1F1F8}",Wales:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"};static flag(t){return i.TABLE[t]?i.TABLE[t]:"\u{1F3F3}\uFE0F"}static flags(t){return t.map(e=>i.flag(e)).join(" ")}};var re=class extends u{static get properties(){return{title:{type:String},url:{type:String},mosaicColours:{type:String},minDate:{type:String},maxDate:{type:String},id:{type:String},count:{type:Number},countries:{type:String},loading:{type:String}}}dateRange(){if(!this.minDate&&!this.maxDate)return"unknown date";let t=window.matchMedia("(max-width: 500px)");return X.dateRange(this.minDate,this.maxDate,t.matches)}hidePlaceholder(t){this.broadcast("photo-loaded",{url:this.url})();let e=t.target.parentNode.querySelector(".thumbnail-placeholder");e.style.zIndex=-1}render(){performance.mark(`start-album-render-${this.url}`);let t=x.encodeBitmapDataURL(this.mosaicColours),e=tt.flags(this?.countries.split(","));return a`
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
    `}};customElements.define("photo-album",re);var ne=class extends u{static get properties(){return{albums:{type:Object},stats:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}getAlbums(){return Object.values(this.albums.albums()).map(t=>{let{photos_count:e}=t;return{title:t.album_name,minDate:t.min_date,maxDate:t.max_date,url:t.thumbnail_url,mosaicColours:t.mosaic,id:t.id,count:e,flags:t.flags}})}render(){performance.mark("start-albums-render");let t=this.getAlbums().sort((s,r)=>r.maxDate-s.maxDate);async function*e(){for(let s=0;s<t.length;s++){let r=t[s],n=x.loadingMode(s);yield a`
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
      ${wt(e())}
    </section>
    `}};customElements.define("photo-album-page",ne);var oe=class extends u{static get properties(){return{id:{type:String},url:{type:String},preload:{type:String},url_poster:{type:String},url_unscaled:{type:String},url_1080p:{type:String},url_720p:{type:String},url_480p:{type:String}}}render(){return a`
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
    `}};customElements.define("app-video",oe);var ae=class extends u{static get properties(){return{title:{type:String},url:{type:String},sharing:{state:!0,type:Boolean}}}async shareAlbum(t){if(!navigator.share)console.error("navigator.share not available");else{this.sharing=!0;try{await navigator.share({title:`${this.title} - photos.rgrannell.xyz`,url:t})}finally{this.sharing=!1}}}render(){return this.sharing?a`<button class="photo-share-button" disabled>[sharing...]</button>`:a`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${this.shareAlbum.bind(this,this.url)}>[share]</button>
      `}};customElements.define("album-share-button",ae);var P=class i{static findSourceRelation(t,e,s){if(!Array.isArray(e))throw new TypeError("Triples must be an array");let r=e.find(n=>g.sameURN(n[0],s)&&B.hasRelation(n,t));return r?B.getTarget(r):null}static findSubject(t,e){return i.findSourceRelation(S.SUBJECT,t,e)}static findLocation(t,e){return i.findSourceRelation(S.LOCATION,t,e)}static findRating(t,e){return i.findSourceRelation(S.RATING,t,e)}static findName(t,e){return i.findSourceRelation(S.NAME,t,e)}static findBirdwatchUrl(t,e){return i.findSourceRelation(S.BIRDWATCH_URL,t,e)}static findWikipedia(t,e){return i.findSourceRelation(S.WIKIPEDIA,t,e)}static findLongitude(t,e){return i.findSourceRelation(S.LONGITUDE,t,e)}static findLatitude(t,e){return i.findSourceRelation(S.LATITUDE,t,e)}},B=class{static isUrnSource(t){return g.isUrn(t[0])}static hasRelation(t,e){return t[1]===e}static hasUrnTarget(t){return g.isUrn(t[2])}static getSource(t){return t[0]}static getRelation(t){return t[1]}static getTarget(t){return t[2]}static filterRelation(t,e){return t.filter(s=>s[1]===e)}static filterSourceId(t,e){if(!g.isUrn(e))throw new Error(`Invalid URN: ${e}`);let s=g.parseUrn(e);return t.filter(r=>g.sameURN(r[0],e)||g.hasId(r[0],s.id))}},g=class i{static isUrn(t){return t&&t.startsWith("urn:r\xF3")}static parseUrn(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let e=t.split(":")[2],[s,r]=t.split("?"),n=s.split(":")[3],o=r?Object.fromEntries(new URLSearchParams(r)):{};return{type:e,id:n,qs:o}}static is(t,e){return i.isUrn(t)&&i.parseUrn(t).type===e}static toURL(t){if(!i.isUrn(t))throw new Error(`Invalid URN: ${t}`);let{type:e,id:s}=i.parseUrn(t);return`#/thing/${e}:${s}`}static sameURN(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type&&s.id===r.id}static isRating(t){return/^[⭐]{1,5}$/.test(t)}static hasId(t,e){return i.isUrn(t)&&i.parseUrn(t).id===e}static sameType(t,e){if(!i.isUrn(t)||!i.isUrn(e))return!1;let s=i.parseUrn(t),r=i.parseUrn(e);return s.type===r.type}static isType(t,e){return i.isUrn(t)?i.parseUrn(t).type===e:!1}},K=class{static pretty(t){let e=t.replace(/-/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}static toCommonName(t,e){let r=B.filterRelation(t,S.NAME).find(n=>g.hasId(n[0],e));return r?B.getTarget(r):e}static birdwatchUrl(t,e){let s=B.filterSourceId(B.filterRelation(t,S.BIRDWATCH_URL),e);if(s.length===0)return;let[r]=s;return B.getTarget(r)}};var le=class extends u{static properties={urn:{type:String}};id(){return g.parseUrn(this.urn)?.id??"unknown"}url(){return this.id()?`https://whc.unesco.org/en/list/${this.id()}`:null}render(){return this.id()?a`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.id()}</span>
        <span class="unesco-text-short">UNESCO #${this.id()}</span>
      </a>
    `:a`<span>Invalid UNESCO URN</span>`}};customElements.define("unesco-link",le);var ce=class extends u{static properties={urn:{type:String},triples:{type:Array}};name(){let{type:t,id:e}=g.parseUrn(this.urn);if(Q.has(t))return a`<span>${K.toCommonName(this.triples,e)}</span>`;let s=P.findName(this.triples,this.urn);return s?a`<span>${s}</span>`:decodeURIComponent(e)}linkClass(){let{type:t}=g.parseUrn(this.urn);return{[y.BIRD]:"bird-link",[y.MAMMAL]:"mammal-link",[y.REPTILE]:"reptile-link",[y.AMPHIBIAN]:"amphibian-link",[y.FISH]:"fish-link",[y.INSECT]:"insect-link"}[t]??""}render(){return g.isUrn(this.urn)?a`
      <a class="thing-link ${this.linkClass()}" href="${g.toURL(this.urn)}">${this.name()}</a>
    `:a`<span>Invalid URN</span>`}};customElements.define("thing-link",ce);var he=class extends u{static get properties(){return{title:{type:String},id:{type:String},minDate:{type:String},maxDate:{type:String},imageCount:{type:Number},description:{type:String},images:{type:Object},videos:{type:Object},semantic:{type:Object},triples:{type:Array},countries:{type:String}}}connectedCallback(){super.connectedCallback(),this.albumPhotos()[0]||console.error(`empty album! ${this.id}`),w.setIndex()}albumPhotos(){let t=this.semantic.semantic();return this.images.images().filter(e=>e.album_id===this.id).map(e=>{let s={},r=t.filter(n=>n[0]===e.id);for(let[n,o,c]of r)s[o]||(s[o]=[]),s[o].push(c);return{...e,relations:s}})}albumVideos(){return this.videos.videos().filter(t=>t.album_id===this.id)}renderPhotoCount(){return this.imageCount===1?`${this.imageCount} photo`:`${this.imageCount} photos`}thingsLinks(){let t={},e=this.albumPhotos();for(let r of[y.UNESCO])t[r]=Array.from(new Set(e.flatMap(n=>n.relations.location?.filter(o=>g.is(o,r))).filter(n=>n)));for(let r of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])t[r]=Array.from(new Set(e.flatMap(n=>n.relations.subject?.filter(o=>g.is(o,r))).filter(n=>n)));let s=[];s=s.concat(t[y.UNESCO].map(r=>a`<unesco-link urn="${r}"></unesco-link>`));for(let r of[y.BIRD,y.MAMMAL,y.REPTILE,y.FISH,y.AMPHIBIAN,y.INSECT])s=s.concat(t[r].map(n=>a`<thing-link .urn="${n}" .triples="${this.triples}"></thing-link>`));return s}render(){let t=window.matchMedia("(max-width: 500px)"),e=X.dateRange(this.minDate,this.maxDate,t.matches),r=this.albumPhotos().map((c,l)=>a`
      <app-photo
        id=${c.id}
        summary=${c.relations.summary}
        loading="${x.loadingMode(l)}"
        thumbnailUrl="${c.thumbnail_url}"
        mosaicColours="${c.mosaic_colours}"
        imageUrl="${c.full_image}"></app-photo>`),n=this.albumVideos().map((c,l)=>a`<app-video
        id=${c.id}
        url_poster=${c.poster_url}
        url_unscaled=${c.video_url_unscaled}
        url_1080p=${c.video_url_1080p}
        url_720p=${c.video_url_720p}
        url_480p=${c.video_url_480p}
        ></app-video>`),o=tt.flags(this?.countries.split(","));return a`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${e}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${o}</p>
        <p class="photo-album-description">${Et(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks().map(c=>a`<li>${c}</li>`)}
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
      `}};customElements.define("share-metadata-button",de);var pe=class extends u{static get properties(){return{tagName:{type:String},count:{type:Number}}}render(){let{tagName:t,count:e}=this,s=encodeURIComponent(t);return typeof e>"u"?a`<a
        href="#/tag/${s}"
        @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a>`:a`<a
      href="#/tag/${s}"
      rel="tag"
      @click=${this.broadcast("click-tag",{tagName:t})}>${t}</a> (${e})`}};customElements.define("tag-link",pe);var ue=class extends u{static get properties(){return{id:{type:String},image:{type:Object},exif:{type:Object},semantic:{type:Object},sharing:{state:!0,type:Boolean},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),w.setIndex()}renderAperture(){return this.exif.f_stop==="Unknown"?a`<td>Unknown aperture</td>`:this.exif.f_stop==="0.0"?a`<td>Manual aperture control</td>`:a`<td>ƒ/${this.exif.f_stop}</td>`}renderFocalLength(){return this.exif.focal_length==="Unknown"?a`${this.exif.focal_length}`:this.exif.focal_length==="0"?a`<td>Manual lens</td>`:a`<td>${this.exif.focal_length}mm equiv.</td>`}renderSemanticKey(t){return t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}renderSemanticValue(t,e){if(Array.isArray(e))return a`<ul class="thing-list">
        ${e.map(s=>a`<li>${this.renderSemanticValue.call(this,t,s)}</li>`)}
      </ul>`;if(t.includes("binomial"))return a`<em>${e}</em>`;if(t.toLowerCase()==="summary")return a`${Et(e??"")}`;if(g.isRating(e)){let s=`urn:r\xF3:rating:${e}`;return a`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`}else{if(g.isUrn(e)&&g.is(e,y.UNESCO))return a`<unesco-link .urn="${e}"></unesco-link>`;if(g.isUrn(e))return a`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`}return e}isIgnoredKey(t){return console.log(t),new Set(["bird_binomial","wildlife","living_conditions"]).has(t)}renderSemanticData(t){return a`
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
    `}};customElements.define("metadata-page",ue);var me=class extends u{static get properties(){return{}}connectedCallback(){super.connectedCallback(),w.setIndex()}render(){return a`
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
    `}};customElements.define("about-page",me);var Ht=class{static loadingMode(t){return t===0?"auto":"none"}};var fe=class extends u{static get properties(){return{videos:{type:Object}}}connectedCallback(){super.connectedCallback(),w.setIndex()}videos(){return this.videos.videos()}render(){let t=this.videos().map((e,s)=>a`<app-video
      id=${e.id}
      url_poster=${e.poster_url}
      url_unscaled=${e.video_url_unscaled}
      url_1080p=${e.video_url_1080p}
      url_720p=${e.video_url_720p}
      url_480p=${e.video_url_480p}
      preload="${Ht.loadingMode(s)}"
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
    `}};customElements.define("videos-page",fe);var ge=class extends u{static get properties(){return{urn:{type:String},images:{type:Object},albums:{type:Object},semantic:{type:Object},triples:{type:Array}}}connectedCallback(){super.connectedCallback(),w.setIndex()}isSemanticRelation(t){return t===S.SUBJECT||t===S.LOCATION||t===S.RATING}filterPhotos(t,e){return e.filter(s=>{let[r,n,o]=s,c=g.isRating(o)?`urn:r\xF3:rating:${encodeURIComponent(o)}`:o;if(!this.isSemanticRelation(n)&&!g.isUrn(c))return!1;try{let l=g.parseUrn(c),p=g.parseUrn(this.urn);return p.id==="*"?p.type===l.type:g.sameURN(c,this.urn)}catch{return!1}}).map(s=>t.find(r=>r.id===s[0])).filter(s=>s!==void 0)}subjectPhotos(t,e){return this.filterPhotos(t,e).sort((s,r)=>r.created_at-s.created_at).map((s,r)=>a`
      <app-photo
        id=${s.id}
        loading="${x.loadingMode(r)}"
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
      `)}getFacts(){let t=this.triples.filter(s=>s[0]===this.urn),e={};for(let s of t){let[r,n,o]=s;e.hasOwnProperty(n)||(e[n]=[]),e[n].push(o)}return e}binomialToCommonName(t){let e=this.triples.find(s=>{let[r,n,o]=s;if(!g.isUrn(r))return!1;let c=g.parseUrn(r),l=t.replace(" ","-").toLowerCase();return c.id===l&&n===S.NAME});return e?e[2]:t}firstPhotographed(t,e){let r=this.filterPhotos(t,e).sort((n,o)=>n.created_at-o.created_at)[0];return r?new Date(r.created_at).toLocaleDateString("en-IE",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}getTitle(){let t=P.findName(this.triples,this.urn);if(t)return t;try{let e=g.parseUrn(this.urn),s=decodeURIComponent(e.id);return e.id==="*"?`${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}`:Q.has(e.type)?K.toCommonName(this.triples,s):s}catch{return this.urn}}renderFacts(t,e){let s={};return e.country&&(s.Country=a`${e.country}`),s}render(){let t=this.images.images(),e=this.semantic.semantic(),s=this.subjectPhotos(t,e),r=this.subjectAlbums(t,e),n=this.getFacts(),o=g.parseUrn(this.urn),c=o.type,l=Object.assign({Classification:a`<a href="#/thing/${c}:*">${c.charAt(0).toUpperCase()}${c.slice(1)}</a>`},this.renderFacts(o,n));Q.has(c)&&(l["First Photographed"]=a`<span>${this.firstPhotographed(t,e)}</span>`);let p=P.findWikipedia(this.triples,this.urn),$=P.findBirdwatchUrl(this.triples,this.urn),d=P.findLongitude(this.triples,this.urn),b=P.findLatitude(this.triples,this.urn),f;if(d&&b){let A=`https://www.google.com/maps?q=${n.latitude},${n.longitude}`;f=a`
      <a href="${A}" target="_blank" rel="noopener">[maps]</a>
      `}return a`
      <div>
      <section class="thing-page">
        <h1>${this.getTitle()}</h1>

        <p>
          ${Q.has(c)?a`<span class="thing-binomial">(${K.pretty(o.id)})</span>`:a``}
        </p>
        <br>

        ${p?a`<a href="${p}" target="_blank" rel="noopener">[wikipedia]</a>`:a``}
        ${$?a`<a href="${$}" target="_blank" rel="noopener">[birdwatch]</a>`:a``}
        ${f?a`<span class="location">${f}</span>`:a``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${Object.entries(l).map(([A,U])=>a`
          <tr>
            <th class="exif-heading">${A}</th>
            <td>${U}</td>
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
    `}};customElements.define("thing-page",ge);var M=new Ot,C=new Rt,I=new It,k=new Pt,T=new kt,N=new Nt,R=new Dt,Es=[[M,h.EAGER],[C,h.EAGER],[I,h.EAGER],[k,h.EAGER],[T,h.EAGER],[N,h.EAGER],[R,h.LAZY]],xs={[m.ABOUT]:[[M,h.LAZY],[C,h.LAZY],[I,h.LAZY],[k,h.LAZY],[N,h.LAZY],[T,h.EAGER],[R,h.LAZY]],[m.ALBUMS]:[[M,h.EAGER],[C,h.LAZY],[I,h.LAZY],[k,h.LAZY],[N,h.EAGER],[T,h.EAGER],[R,h.LAZY]],[m.PHOTOS]:[[M,h.EAGER],[C,h.EAGER],[I,h.EAGER],[k,h.LAZY],[N,h.LAZY],[T,h.EAGER],[R,h.LAZY]],[m.VIDEOS]:[[M,h.LAZY],[C,h.LAZY],[I,h.EAGER],[k,h.LAZY],[N,h.LAZY],[T,h.EAGER],[R,h.LAZY]],[m.ALBUM]:[[M,h.EAGER],[C,h.EAGER],[I,h.EAGER],[N,h.LAZY],[k,h.LAZY],[T,h.EAGER],[R,h.EAGER]],[m.PHOTO]:[[M,h.EAGER],[C,h.EAGER],[I,h.EAGER],[k,h.EAGER],[T,h.EAGER],[N,h.LAZY],[R,h.LAZY]],[m.METADATA]:[[M,h.LAZY],[C,h.EAGER],[I,h.EAGER],[k,h.EAGER],[T,h.EAGER],[N,h.LAZY],[T,h.EAGER],[R,h.EAGER]],[m.THING]:[[M,h.EAGER],[C,h.EAGER],[I,h.LAZY],[k,h.LAZY],[T,h.EAGER],[N,h.LAZY],[R,h.EAGER]]},$e=class{static async init(){let t=O.getUrl();console.log(`loading ${t?.type}`);let e=xs[t?.type]??Es,s=[];for(let[r,n]of e)n===h.EAGER?s.push(r.init()):n===h.LAZY&&r.init();await Promise.all(s)}};await $e.init();var be=class i extends u{static DEFAULT_PAGE=m.ALBUMS;static LOCATION_TYPE_TO_PAGE={album:m.ALBUM,albums:m.ALBUMS,photos:m.PHOTOS,metadata:m.METADATA,about:m.ABOUT,videos:m.VIDEOS,thing:m.THING};static get properties(){return{title:{type:String},page:{type:String},sidebarVisible:{type:Boolean,state:!0},id:{type:String},imageUrl:{type:String},thumbnailUrl:{type:String},route:{type:String},params:{type:Object},query:{type:Object},darkMode:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.setStateFromUrl(),this.requestUpdate(),window.addEventListener("popstate",this.handlePopState.bind(this)),this.sidebarVisible=!1}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handlePopState.bind(this))}handlePopState(){this.setStateFromUrl(),this.requestUpdate()}setStateFromUrl(){let t=O.getUrl();i.LOCATION_TYPE_TO_PAGE[t?.type]?this.page=i.LOCATION_TYPE_TO_PAGE[t.type]:(console.error("did not match pagetype",t?.type),this.page=i.DEFAULT_PAGE),O.pageUsesId(this.page)&&(this.id=t.id)}receiveClickAlbum(t){let{title:e,id:s}=t.detail;this.page=m.PHOTOS,this.id=s,this.title=e,O.showAlbumUrl(s)}async receiveClickBurgerMenu(){this.sidebarVisible=!this.sidebarVisible}async receiveClickPhotoMetadata(t){let{id:e,imageUrl:s,thumbnailUrl:r}=t.detail;this.page=m.METADATA,this.id=e,this.imageUrl=s,this.thumbnailUrl=r,O.showMetadataUrl(e)}receiveSwitchTheme(t){this.darkMode=!this.darkMode,localStorage.setItem("darkMode",this.darkMode.toString()),this.requestUpdate()}receiveNavigatePage(t){this.page=t.detail.page,this.sidebarVisible=!1;let e=O.router(this.page);O.pageUsesId(this.page)?e(this.id):e()}pageClasses(t){let e=["page"];return t&&e.push("sidebar-visible"),e.join(" ")}renderPage(t){let e=this.pageClasses(t);if(!this.page||this.page==="albums")return a`
      <photo-album-page .stats=${N} .albums="${M}" class="${e}"></photo-album-page>
      `;if(this.page===m.ABOUT)return a`<about-page class="${e}"></about-page>`;if(this.page===m.PHOTOS)return a`<photos-page class="${e}" .images=${C}></photos-page>`;if(this.page===m.ALBUM){this.id||console.error("no album id provided");let s=M.albums().find(r=>r.id===this.id);return s||console.error(`failed to find album with id ${this.id}`),a`
      <album-page
        .images=${C}
        .videos=${I}
        .semantic=${T}
        .triples=${R._data}
        title=${s.album_name}
        id=${this.id}
        minDate=${s.min_date}
        maxDate=${s.max_date}
        imageCount=${s.photos_count}
        description=${s.description}
        countries=${s.flags}
        class="${e}"></album-page>
      `}if(this.page===m.METADATA){let s=C.images().find(c=>c.id===this.id),r=k.exif().find(c=>c.id===this.id),n=T.semantic().filter(c=>c[0]===this.id),o={};for(let[c,l,p]of n)o[l]?typeof o[l]=="string"&&(o[l]=[o[l],p]):o[l]=p;return s||console.error(`failed to find photo with id ${this.id}`),a`
      <metadata-page
        .triples=${R._data}
        .image=${s}
        .semantic=${o} .exif=${r} id=${this.id} class="${e}"></metadata-page>
      `}if(this.page===m.VIDEOS)return a`
      <videos-page .videos=${I} class="${e}"></videos-page>
      `;if(this.page===m.THING)return a`
      <thing-page
        .urn=${"urn:r\xF3:"+this.id}
        .images=${C}
        .albums=${M}
        .semantic=${T}
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
    `}};customElements.define("photo-app",be);export{Es as DEFAULT_DEPENDENCIES,xs as PAGE_DEPENDECIES,be as PhotoApp};
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
