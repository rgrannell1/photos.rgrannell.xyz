/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  s = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  i = Symbol(),
  e = new WeakMap();
class n {
  constructor(t, s, e) {
    if (this._$cssResult$ = !0, e !== i) {
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    }
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.i;
    const i = this.t;
    if (s && void 0 === t) {
      const s = void 0 !== i && 1 === i.length;
      s && (t = e.get(i)),
        void 0 === t &&
        ((this.i = t = new CSSStyleSheet()).replaceSync(this.cssText),
          s && e.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const r = (t) => new n("string" == typeof t ? t : t + "", void 0, i),
  o = (t, ...s) => {
    const e = 1 === t.length ? t[0] : s.reduce((s, i, e) =>
      s + ((t) => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error(
          "Value passed to 'css' function must be a 'css' function result: " +
            t +
            ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
        );
      })(i) + t[e + 1], t[0]);
    return new n(e, t, i);
  },
  h = (i, e) => {
    if (s) {
      i.adoptedStyleSheets = e.map(
        (t) => t instanceof CSSStyleSheet ? t : t.styleSheet,
      );
    } else {for (const s of e) {
        const e = document.createElement("style"), n = t.litNonce;
        void 0 !== n && e.setAttribute("nonce", n),
          e.textContent = s.cssText,
          i.appendChild(e);
      }}
  },
  c = s ? (t) => t : (t) =>
    t instanceof CSSStyleSheet
      ? ((t) => {
        let s = "";
        for (const i of t.cssRules) s += i.cssText;
        return r(s);
      })(t)
      : t,
  {
    is: l,
    defineProperty: a,
    getOwnPropertyDescriptor: u,
    getOwnPropertyNames: d,
    getOwnPropertySymbols: f,
    getPrototypeOf: p,
  } = Object,
  v = globalThis,
  y = v.trustedTypes,
  m = y ? y.emptyScript : "",
  b = v.reactiveElementPolyfillSupport,
  g = (t, s) => t,
  w = {
    toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? m : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, s) {
      let i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    },
  },
  _ = (t, s) => !l(t, s),
  S = { attribute: !0, type: String, converter: w, reflect: !1, hasChanged: _ };
Symbol.metadata ??= Symbol("metadata"), v.litPropertyMetadata ??= new WeakMap();
class $ extends HTMLElement {
  static addInitializer(t) {
    this.o(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this.u && [...this.u.keys()];
  }
  static createProperty(t, s = S) {
    if (
      s.state && (s.attribute = !1),
        this.o(),
        this.elementProperties.set(t, s),
        !s.noAccessor
    ) {
      const i = Symbol(), e = this.getPropertyDescriptor(t, i, s);
      void 0 !== e && a(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: e, set: n } = u(this.prototype, t) ?? {
      get() {
        return this[s];
      },
      set(t) {
        this[s] = t;
      },
    };
    return {
      get() {
        return e?.call(this);
      },
      set(s) {
        const r = e?.call(this);
        n.call(this, s), this.requestUpdate(t, r, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? S;
  }
  static o() {
    if (this.hasOwnProperty(g("elementProperties"))) return;
    const t = p(this);
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(g("finalized"))) return;
    if (this.finalized = !0, this.o(), this.hasOwnProperty(g("properties"))) {
      const t = this.properties, s = [...d(t), ...f(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const s = litPropertyMetadata.get(t);
      if (void 0 !== s) {
        for (const [t, i] of s) this.elementProperties.set(t, i);
      }
    }
    this.u = new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this.p(t, s);
      void 0 !== i && this.u.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) s.unshift(c(t));
    } else void 0 !== t && s.push(c(t));
    return s;
  }
  static p(t, s) {
    const i = s.attribute;
    return !1 === i
      ? void 0
      : "string" == typeof i
      ? i
      : "string" == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      this.v = void 0,
      this.isUpdatePending = !1,
      this.hasUpdated = !1,
      this.m = null,
      this._();
  }
  _() {
    this.S = new Promise((t) => this.enableUpdating = t),
      this._$AL = new Map(),
      this.$(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this.P ??= new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this.P?.delete(t);
  }
  $() {
    const t = new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) {
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    }
    t.size > 0 && (this.v = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ??
      this.attachShadow(this.constructor.shadowRootOptions);
    return h(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(),
      this.enableUpdating(!0),
      this.P?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this.P?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  C(t, s) {
    const i = this.constructor.elementProperties.get(t),
      e = this.constructor.p(t, i);
    if (void 0 !== e && !0 === i.reflect) {
      const n = (void 0 !== i.converter?.toAttribute ? i.converter : w)
        .toAttribute(s, i.type);
      this.m = t,
        null == n ? this.removeAttribute(e) : this.setAttribute(e, n),
        this.m = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, e = i.u.get(t);
    if (void 0 !== e && this.m !== e) {
      const t = i.getPropertyOptions(e),
        n = "function" == typeof t.converter
          ? { fromAttribute: t.converter }
          : void 0 !== t.converter?.fromAttribute
          ? t.converter
          : w;
      this.m = e, this[e] = n.fromAttribute(s, t.type), this.m = null;
    }
  }
  requestUpdate(t, s, i) {
    if (void 0 !== t) {
      if (
        i ??= this.constructor.getPropertyOptions(t),
          !(i.hasChanged ?? _)(this[t], s)
      ) return;
      this.T(t, s, i);
    }
    !1 === this.isUpdatePending && (this.S = this.A());
  }
  T(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s),
      !0 === i.reflect && this.m !== t && (this.M ??= new Set()).add(t);
  }
  async A() {
    this.isUpdatePending = !0;
    try {
      await this.S;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this.v) {
        for (const [t, s] of this.v) this[t] = s;
        this.v = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0) {
        for (const [s, i] of t) {
          !0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] ||
            this.T(s, this[s], i);
        }
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s),
        t
          ? (this.willUpdate(s),
            this.P?.forEach((t) => t.hostUpdate?.()),
            this.update(s))
          : this.k();
    } catch (s) {
      throw t = !1, this.k(), s;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    this.P?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)),
      this.updated(t);
  }
  k() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.S;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this.M &&= this.M.forEach((t) => this.C(t, this[t])), this.k();
  }
  updated(t) {}
  firstUpdated(t) {}
}
$.elementStyles = [],
  $.shadowRootOptions = { mode: "open" },
  $[g("elementProperties")] = new Map(),
  $[g("finalized")] = new Map(),
  b?.({ ReactiveElement: $ }),
  (v.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis,
  x = T.trustedTypes,
  E = x ? x.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
  C = "$lit$",
  P = `lit$${Math.random().toFixed(9).slice(2)}$`,
  A = "?" + P,
  k = `<${A}>`,
  M = document,
  U = () => M.createComment(""),
  V = (t) => null === t || "object" != typeof t && "function" != typeof t,
  O = Array.isArray,
  R = (t) => O(t) || "function" == typeof t?.[Symbol.iterator],
  N = "[ \t\n\f\r]",
  z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  L = /-->/g,
  j = />/g,
  H = RegExp(
    `>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    "g",
  ),
  I = /'/g,
  D = /"/g,
  B = /^(?:script|style|textarea|title)$/i,
  W = (t) => (s, ...i) => ({ _$litType$: t, strings: s, values: i }),
  Z = W(1),
  q = W(2),
  F = Symbol.for("lit-noChange"),
  G = Symbol.for("lit-nothing"),
  J = new WeakMap(),
  K = M.createTreeWalker(M, 129);
function Y(t, s) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) {
    throw Error("invalid template strings array");
  }
  return void 0 !== E ? E.createHTML(s) : s;
}
const Q = (t, s) => {
  const i = t.length - 1, e = [];
  let n, r = 2 === s ? "<svg>" : "", o = z;
  for (let s = 0; s < i; s++) {
    const i = t[s];
    let h, c, l = -1, a = 0;
    for (; a < i.length && (o.lastIndex = a, c = o.exec(i), null !== c);) {
      a = o.lastIndex,
        o === z
          ? "!--" === c[1]
            ? o = L
            : void 0 !== c[1]
            ? o = j
            : void 0 !== c[2]
            ? (B.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = H)
            : void 0 !== c[3] && (o = H)
          : o === H
          ? ">" === c[0]
            ? (o = n ?? z, l = -1)
            : void 0 === c[1]
            ? l = -2
            : (l = o.lastIndex - c[2].length,
              h = c[1],
              o = void 0 === c[3] ? H : '"' === c[3] ? D : I)
          : o === D || o === I
          ? o = H
          : o === L || o === j
          ? o = z
          : (o = H, n = void 0);
    }
    const u = o === H && t[s + 1].startsWith("/>") ? " " : "";
    r += o === z
      ? i + k
      : l >= 0
      ? (e.push(h), i.slice(0, l) + C + i.slice(l) + P + u)
      : i + P + (-2 === l ? s : u);
  }
  return [Y(t, r + (t[i] || "<?>") + (2 === s ? "</svg>" : "")), e];
};
class X {
  constructor({ strings: t, _$litType$: s }, i) {
    let e;
    this.parts = [];
    let n = 0, r = 0;
    const o = t.length - 1, h = this.parts, [c, l] = Q(t, s);
    if (
      this.el = X.createElement(c, i), K.currentNode = this.el.content, 2 === s
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (e = K.nextNode()) && h.length < o;) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          for (const t of e.getAttributeNames()) {
            if (t.endsWith(C)) {
              const s = l[r++],
                i = e.getAttribute(t).split(P),
                o = /([.?@])?(.*)/.exec(s);
              h.push({
                type: 1,
                index: n,
                name: o[2],
                strings: i,
                ctor: "." === o[1]
                  ? nt
                  : "?" === o[1]
                  ? rt
                  : "@" === o[1]
                  ? ot
                  : et,
              }), e.removeAttribute(t);
            } else {t.startsWith(P) &&
                (h.push({ type: 6, index: n }), e.removeAttribute(t));}
          }
        }
        if (B.test(e.tagName)) {
          const t = e.textContent.split(P), s = t.length - 1;
          if (s > 0) {
            e.textContent = x ? x.emptyScript : "";
            for (let i = 0; i < s; i++) {
              e.append(t[i], U()),
                K.nextNode(),
                h.push({ type: 2, index: ++n });
            }
            e.append(t[s], U());
          }
        }
      } else if (8 === e.nodeType) {
        if (e.data === A) h.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(P, t + 1));) {
            h.push({ type: 7, index: n }), t += P.length - 1;
          }
        }
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = M.createElement("template");
    return i.innerHTML = t, i;
  }
}
function tt(t, s, i = t, e) {
  if (s === F) return s;
  let n = void 0 !== e ? i.U?.[e] : i.N;
  const r = V(s) ? void 0 : s._$litDirective$;
  return n?.constructor !== r &&
    (n?._$AO?.(!1),
      void 0 === r ? n = void 0 : (n = new r(t), n._$AT(t, i, e)),
      void 0 !== e ? (i.U ??= [])[e] = n : i.N = n),
    void 0 !== n && (s = tt(t, n._$AS(t, s.values), n, e)),
    s;
}
class st {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  O(t) {
    const { el: { content: s }, parts: i } = this._$AD,
      e = (t?.creationScope ?? M).importNode(s, !0);
    K.currentNode = e;
    let n = K.nextNode(), r = 0, o = 0, h = i[0];
    for (; void 0 !== h;) {
      if (r === h.index) {
        let s;
        2 === h.type
          ? s = new it(n, n.nextSibling, this, t)
          : 1 === h.type
          ? s = new h.ctor(n, h.name, h.strings, this, t)
          : 6 === h.type && (s = new ht(n, this, t)),
          this._$AV.push(s),
          h = i[++o];
      }
      r !== h?.index && (n = K.nextNode(), r++);
    }
    return K.currentNode = M, e;
  }
  R(t) {
    let s = 0;
    for (const i of this._$AV) {
      void 0 !== i &&
      (void 0 !== i.strings
        ? (i._$AI(t, i, s), s += i.strings.length - 2)
        : i._$AI(t[s])), s++;
    }
  }
}
let it = class t {
  get _$AU() {
    return this._$AM?._$AU ?? this.V;
  }
  constructor(t, s, i, e) {
    this.type = 2,
      this._$AH = G,
      this._$AN = void 0,
      this._$AA = t,
      this._$AB = s,
      this._$AM = i,
      this.options = e,
      this.V = e?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return void 0 !== s && 11 === t?.nodeType && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = tt(this, t, s),
      V(t)
        ? t === G || null == t || "" === t
          ? (this._$AH !== G && this._$AR(), this._$AH = G)
          : t !== this._$AH && t !== F && this.L(t)
        : void 0 !== t._$litType$
        ? this.I(t)
        : void 0 !== t.nodeType
        ? this.j(t)
        : R(t)
        ? this.D(t)
        : this.L(t);
  }
  H(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  j(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.H(t));
  }
  L(t) {
    this._$AH !== G && V(this._$AH)
      ? this._$AA.nextSibling.data = t
      : this.j(M.createTextNode(t)), this._$AH = t;
  }
  I(t) {
    const { values: s, _$litType$: i } = t,
      e = "number" == typeof i ? this._$AC(t) : (void 0 === i.el &&
        (i.el = X.createElement(Y(i.h, i.h[0]), this.options)),
        i);
    if (this._$AH?._$AD === e) this._$AH.R(s);
    else {
      const t = new st(e, this), i = t.O(this.options);
      t.R(s), this.j(i), this._$AH = t;
    }
  }
  _$AC(t) {
    let s = J.get(t.strings);
    return void 0 === s && J.set(t.strings, s = new X(t)), s;
  }
  D(s) {
    O(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let e, n = 0;
    for (const r of s) {
      n === i.length
        ? i.push(e = new t(this.H(U()), this.H(U()), this, this.options))
        : e = i[n],
        e._$AI(r),
        n++;
    }
    n < i.length && (this._$AR(e && e._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t && t !== this._$AB;) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    void 0 === this._$AM && (this.V = t, this._$AP?.(t));
  }
};
class et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, e, n) {
    this.type = 1,
      this._$AH = G,
      this._$AN = void 0,
      this.element = t,
      this.name = s,
      this._$AM = e,
      this.options = n,
      i.length > 2 || "" !== i[0] || "" !== i[1]
        ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i)
        : this._$AH = G;
  }
  _$AI(t, s = this, i, e) {
    const n = this.strings;
    let r = !1;
    if (void 0 === n) {
      t = tt(this, t, s, 0),
        r = !V(t) || t !== this._$AH && t !== F,
        r && (this._$AH = t);
    } else {
      const e = t;
      let o, h;
      for (t = n[0], o = 0; o < n.length - 1; o++) {
        h = tt(this, e[i + o], s, o),
          h === F && (h = this._$AH[o]),
          r ||= !V(h) || h !== this._$AH[o],
          h === G ? t = G : t !== G && (t += (h ?? "") + n[o + 1]),
          this._$AH[o] = h;
      }
    }
    r && !e && this.B(t);
  }
  B(t) {
    t === G
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? "");
  }
}
class nt extends et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  B(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class rt extends et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  B(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class ot extends et {
  constructor(t, s, i, e, n) {
    super(t, s, i, e, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = tt(this, t, s, 0) ?? G) === F) return;
    const i = this._$AH,
      e = t === G && i !== G || t.capture !== i.capture || t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== G && (i === G || e);
    e && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      this._$AH = t;
  }
  handleEvent(t) {
    "function" == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class ht {
  constructor(t, s, i) {
    this.element = t,
      this.type = 6,
      this._$AN = void 0,
      this._$AM = s,
      this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    tt(this, t);
  }
}
const ct = {
    W: C,
    q: P,
    J: A,
    Z: 1,
    F: Q,
    G: st,
    K: R,
    X: tt,
    Y: it,
    tt: et,
    st: rt,
    it: ot,
    et: nt,
    ot: ht,
  },
  lt = T.litHtmlPolyfillSupport;
lt?.(X, it), (T.litHtmlVersions ??= []).push("3.1.3");
const at = (t, s, i) => {
  const e = i?.renderBefore ?? s;
  let n = e._$litPart$;
  if (void 0 === n) {
    const t = i?.renderBefore ?? null;
    e._$litPart$ = n = new it(s.insertBefore(U(), t), t, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class ut extends $ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.ht = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      this.ht = at(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.ht?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.ht?.setConnected(!1);
  }
  render() {
    return F;
  }
}
ut._$litElement$ = !0,
  ut[("finalized", "finalized")] = !0,
  globalThis.litElementHydrateSupport?.({ LitElement: ut });
const dt = globalThis.litElementPolyfillSupport;
dt?.({ LitElement: ut });
const ft = {
  _$AK: (t, s, i) => {
    t._$AK(s, i);
  },
  _$AL: (t) => t._$AL,
};
(globalThis.litElementVersions ??= []).push("4.0.5");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = !1,
  { Y: vt } = ct,
  yt = (t) => null === t || "object" != typeof t && "function" != typeof t,
  mt = { HTML: 1, SVG: 2 },
  bt = (t, s) => void 0 === s ? void 0 !== t?._$litType$ : t?._$litType$ === s,
  gt = (t) => null != t?._$litType$?.h,
  wt = (t) => void 0 !== t?._$litDirective$,
  _t = (t) => t?._$litDirective$,
  St = (t) => void 0 === t.strings,
  $t = () => document.createComment(""),
  Tt = (t, s, i) => {
    const e = t._$AA.parentNode, n = void 0 === s ? t._$AB : s._$AA;
    if (void 0 === i) {
      const s = e.insertBefore($t(), n), r = e.insertBefore($t(), n);
      i = new vt(s, r, t, t.options);
    } else {
      const s = i._$AB.nextSibling, r = i._$AM, o = r !== t;
      if (o) {
        let s;
        i._$AQ?.(t),
          i._$AM = t,
          void 0 !== i._$AP && (s = t._$AU) !== r._$AU && i._$AP(s);
      }
      if (s !== n || o) {
        let t = i._$AA;
        for (; t !== s;) {
          const s = t.nextSibling;
          e.insertBefore(t, n), t = s;
        }
      }
    }
    return i;
  },
  xt = (t, s, i = t) => (t._$AI(s, i), t),
  Et = {},
  Ct = (t, s = Et) => t._$AH = s,
  Pt = (t) => t._$AH,
  At = (t) => {
    t._$AP?.(!1, !0);
    let s = t._$AA;
    const i = t._$AB.nextSibling;
    for (; s !== i;) {
      const t = s.nextSibling;
      s.remove(), s = t;
    }
  },
  kt = (t) => {
    t._$AR();
  },
  Mt = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  Ut = (t) => (...s) => ({ _$litDirective$: t, values: s });
class Vt {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this.nt = t, this._$AM = s, this.rt = i;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const Ot = (t, s) => {
    const i = t._$AN;
    if (void 0 === i) return !1;
    for (const t of i) t._$AO?.(s, !1), Ot(t, s);
    return !0;
  },
  Rt = (t) => {
    let s, i;
    do {
      if (void 0 === (s = t._$AM)) break;
      i = s._$AN, i.delete(t), t = s;
    } while (0 === i?.size);
  },
  Nt = (t) => {
    for (let s; s = t._$AM; t = s) {
      let i = s._$AN;
      if (void 0 === i) s._$AN = i = new Set();
      else if (i.has(t)) break;
      i.add(t), jt(s);
    }
  };
function zt(t) {
  void 0 !== this._$AN ? (Rt(this), this._$AM = t, Nt(this)) : this._$AM = t;
}
function Lt(t, s = !1, i = 0) {
  const e = this._$AH, n = this._$AN;
  if (void 0 !== n && 0 !== n.size) {
    if (s) {
      if (Array.isArray(e)) {
        for (let t = i; t < e.length; t++) Ot(e[t], !1), Rt(e[t]);
      } else null != e && (Ot(e, !1), Rt(e));
    } else Ot(this, t);
  }
}
const jt = (t) => {
  2 == t.type && (t._$AP ??= Lt, t._$AQ ??= zt);
};
class Ht extends Vt {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, s, i) {
    super._$AT(t, s, i), Nt(this), this.isConnected = t._$AU;
  }
  _$AO(t, s = !0) {
    t !== this.isConnected &&
    (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()),
      s && (Ot(this, t), Rt(this));
  }
  setValue(t) {
    if (St(this.nt)) this.nt._$AI(t, this);
    else {
      const s = [...this.nt._$AH];
      s[this.rt] = t, this.nt._$AI(s, this, 0);
    }
  }
  disconnected() {}
  reconnected() {}
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class It {
  constructor(t) {
    this.ct = t;
  }
  disconnect() {
    this.ct = void 0;
  }
  reconnect(t) {
    this.ct = t;
  }
  deref() {
    return this.ct;
  }
}
class Dt {
  constructor() {
    this.lt = void 0, this.ut = void 0;
  }
  get() {
    return this.lt;
  }
  pause() {
    this.lt ??= new Promise((t) => this.ut = t);
  }
  resume() {
    this.ut?.(), this.lt = this.ut = void 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class Bt extends Ht {
  constructor() {
    super(...arguments), this.dt = new It(this), this.ft = new Dt();
  }
  render(t, s) {
    return F;
  }
  update(t, [s, i]) {
    if (this.isConnected || this.disconnected(), s === this.vt) return F;
    this.vt = s;
    let e = 0;
    const { dt: n, ft: r } = this;
    return (async (t, s) => {
      for await (const i of t) if (!1 === await s(i)) return;
    })(s, async (t) => {
      for (; r.get();) await r.get();
      const o = n.deref();
      if (void 0 !== o) {
        if (o.vt !== s) return !1;
        void 0 !== i && (t = i(t, e)), o.commitValue(t, e), e++;
      }
      return !0;
    }),
      F;
  }
  commitValue(t, s) {
    this.setValue(t);
  }
  disconnected() {
    this.dt.disconnect(), this.ft.pause();
  }
  reconnected() {
    this.dt.reconnect(this), this.ft.resume();
  }
}
const Wt = Ut(Bt),
  Zt = Ut(
    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    class extends Bt {
      constructor(t) {
        if (super(t), 2 !== t.type) {
          throw Error(
            "asyncAppend can only be used in child expressions",
          );
        }
      }
      update(t, s) {
        return this.ht = t, super.update(t, s);
      }
      commitValue(t, s) {
        0 === s && kt(this.ht);
        const i = Tt(this.ht);
        xt(i, t);
      }
    },
  ),
  qt = (t) => gt(t) ? t._$litType$.h : t.strings,
  Ft = Ut(
    class extends Vt {
      constructor(t) {
        super(t), this.yt = new WeakMap();
      }
      render(t) {
        return [t];
      }
      update(t, [s]) {
        const i = bt(this.bt) ? qt(this.bt) : null, e = bt(s) ? qt(s) : null;
        if (null !== i && (null === e || i !== e)) {
          const s = Pt(t).pop();
          let e = this.yt.get(i);
          if (void 0 === e) {
            const t = document.createDocumentFragment();
            e = at(G, t), e.setConnected(!1), this.yt.set(i, e);
          }
          Ct(e, [s]), Tt(e, void 0, s);
        }
        if (null !== e) {
          if (null === i || i !== e) {
            const s = this.yt.get(e);
            if (void 0 !== s) {
              const i = Pt(s).pop();
              kt(t), Tt(t, void 0, i), Ct(t, [i]);
            }
          }
          this.bt = s;
        } else this.bt = void 0;
        return this.render(s);
      }
    },
  ),
  Gt = (t, s, i) => {
    for (const i of s) if (i[0] === t) return (0, i[1])();
    return i?.();
  },
  Jt = Ut(
    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    class extends Vt {
      constructor(t) {
        if (
          super(t), 1 !== t.type || "class" !== t.name || t.strings?.length > 2
        ) {
          throw Error(
            "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.",
          );
        }
      }
      render(t) {
        return " " + Object.keys(t).filter((s) => t[s]).join(" ") + " ";
      }
      update(t, [s]) {
        if (void 0 === this.gt) {
          this.gt = new Set(),
            void 0 !== t.strings &&
            (this.wt = new Set(
              t.strings.join(" ").split(/\s/).filter((t) => "" !== t),
            ));
          for (const t in s) s[t] && !this.wt?.has(t) && this.gt.add(t);
          return this.render(s);
        }
        const i = t.element.classList;
        for (const t of this.gt) t in s || (i.remove(t), this.gt.delete(t));
        for (const t in s) {
          const e = !!s[t];
          e === this.gt.has(t) || this.wt?.has(t) ||
            (e ? (i.add(t), this.gt.add(t)) : (i.remove(t), this.gt.delete(t)));
        }
        return F;
      }
    },
  ),
  Kt = {},
  Yt = Ut(
    class extends Vt {
      constructor() {
        super(...arguments), this._t = Kt;
      }
      render(t, s) {
        return s();
      }
      update(t, [s, i]) {
        if (Array.isArray(s)) {
          if (
            Array.isArray(this._t) && this._t.length === s.length &&
            s.every((t, s) => t === this._t[s])
          ) return F;
        } else if (this._t === s) return F;
        return this._t = Array.isArray(s) ? Array.from(s) : s,
          this.render(s, i);
      }
    },
  ),
  Qt = (t) => t ?? G; /**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

function* Xt(t, s) {
  const i = "function" == typeof s;
  if (void 0 !== t) {
    let e = -1;
    for (const n of t) e > -1 && (yield i ? s(e) : s), e++, yield n;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ts = Ut(
    class extends Vt {
      constructor() {
        super(...arguments), this.key = G;
      }
      render(t, s) {
        return this.key = t, s;
      }
      update(t, [s, i]) {
        return s !== this.key && (Ct(t), this.key = s), i;
      }
    },
  ),
  ss = Ut(
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    class extends Vt {
      constructor(t) {
        if (super(t), 3 !== t.type && 1 !== t.type && 4 !== t.type) {
          throw Error(
            "The `live` directive is not allowed on child or event bindings",
          );
        }
        if (!St(t)) {
          throw Error("`live` bindings can only contain a single expression");
        }
      }
      render(t) {
        return t;
      }
      update(t, [s]) {
        if (s === F || s === G) return s;
        const i = t.element, e = t.name;
        if (3 === t.type) {
          if (s === i[e]) return F;
          else if (4 === t.type) {
            if (!!s === i.hasAttribute(e)) return F;
            else if (1 === t.type && i.getAttribute(e) === s + "") return F;
          }
        }
        return Ct(t), s;
      }
    },
  );
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* is(t, s) {
  if (void 0 !== t) {
    let i = 0;
    for (const e of t) yield s(e, i++);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function* es(t, s, i = 1) {
  const e = void 0 === s ? 0 : t;
  s ??= t;
  for (let t = e; i > 0 ? t < s : s < t; t += i) yield t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ns = () => new rs();
class rs {}
const os = new WeakMap(),
  hs = Ut(
    class extends Ht {
      render(t) {
        return G;
      }
      update(t, [s]) {
        const i = s !== this.ct;
        return i && void 0 !== this.ct && this.St(void 0),
          (i || this.$t !== this.Tt) &&
          (this.ct = s,
            this.xt = t.options?.host,
            this.St(this.Tt = t.element)),
          G;
      }
      St(t) {
        if ("function" == typeof this.ct) {
          const s = this.xt ?? globalThis;
          let i = os.get(s);
          void 0 === i && (i = new WeakMap(), os.set(s, i)),
            void 0 !== i.get(this.ct) && this.ct.call(this.xt, void 0),
            i.set(this.ct, t),
            void 0 !== t && this.ct.call(this.xt, t);
        } else this.ct.value = t;
      }
      get $t() {
        return "function" == typeof this.ct
          ? os.get(this.xt ?? globalThis)?.get(this.ct)
          : this.ct?.value;
      }
      disconnected() {
        this.$t === this.Tt && this.St(void 0);
      }
      reconnected() {
        this.St(this.Tt);
      }
    },
  ),
  cs = (t, s, i) => {
    const e = new Map();
    for (let n = s; n <= i; n++) e.set(t[n], n);
    return e;
  },
  ls = Ut(
    class extends Vt {
      constructor(t) {
        if (super(t), 2 !== t.type) {
          throw Error(
            "repeat() can only be used in text expressions",
          );
        }
      }
      Et(t, s, i) {
        let e;
        void 0 === i ? i = s : void 0 !== s && (e = s);
        const n = [], r = [];
        let o = 0;
        for (const s of t) n[o] = e ? e(s, o) : o, r[o] = i(s, o), o++;
        return { values: r, keys: n };
      }
      render(t, s, i) {
        return this.Et(t, s, i).values;
      }
      update(t, [s, i, e]) {
        const n = Pt(t), { values: r, keys: o } = this.Et(s, i, e);
        if (!Array.isArray(n)) return this.Ct = o, r;
        const h = this.Ct ??= [], c = [];
        let l, a, u = 0, d = n.length - 1, f = 0, p = r.length - 1;
        for (; u <= d && f <= p;) {
          if (null === n[u]) u++;
          else if (null === n[d]) d--;
          else if (h[u] === o[f]) c[f] = xt(n[u], r[f]), u++, f++;
          else if (h[d] === o[p]) c[p] = xt(n[d], r[p]), d--, p--;
          else if (h[u] === o[p]) {
            c[p] = xt(n[u], r[p]), Tt(t, c[p + 1], n[u]), u++, p--;
          } else if (h[d] === o[f]) {
            c[f] = xt(n[d], r[f]), Tt(t, n[u], n[d]), d--, f++;
          } else if (
            void 0 === l && (l = cs(o, f, p), a = cs(h, u, d)), l.has(h[u])
          ) {
            if (l.has(h[d])) {
              const s = a.get(o[f]), i = void 0 !== s ? n[s] : null;
              if (null === i) {
                const s = Tt(t, n[u]);
                xt(s, r[f]), c[f] = s;
              } else c[f] = xt(i, r[f]), Tt(t, n[u], i), n[s] = null;
              f++;
            } else At(n[d]), d--;
          } else At(n[u]), u++;
        }
        for (; f <= p;) {
          const s = Tt(t, c[p + 1]);
          xt(s, r[f]), c[f++] = s;
        }
        for (; u <= d;) {
          const t = n[u++];
          null !== t && At(t);
        }
        return this.Ct = o, Ct(t, c), F;
      }
    },
  ),
  as = "important",
  us = " !" + as,
  ds = Ut(
    class extends Vt {
      constructor(t) {
        if (
          super(t), 1 !== t.type || "style" !== t.name || t.strings?.length > 2
        ) {
          throw Error(
            "The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.",
          );
        }
      }
      render(t) {
        return Object.keys(t).reduce((s, i) => {
          const e = t[i];
          return null == e
            ? s
            : s + `${i = i.includes("-")
              ? i
              : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&")
                .toLowerCase()}:${e};`;
        }, "");
      }
      update(t, [s]) {
        const { style: i } = t.element;
        if (void 0 === this.Pt) {
          return this.Pt = new Set(Object.keys(s)), this.render(s);
        }
        for (const t of this.Pt) {
          null == s[t] &&
            (this.Pt.delete(t),
              t.includes("-") ? i.removeProperty(t) : i[t] = null);
        }
        for (const t in s) {
          const e = s[t];
          if (null != e) {
            this.Pt.add(t);
            const s = "string" == typeof e && e.endsWith(us);
            t.includes("-") || s
              ? i.setProperty(t, s ? e.slice(0, -11) : e, s ? as : "")
              : i[t] = e;
          }
        }
        return F;
      }
    },
  ),
  fs = Ut(
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    class extends Vt {
      constructor(t) {
        if (super(t), 2 !== t.type) {
          throw Error("templateContent can only be used in child bindings");
        }
      }
      render(t) {
        return this.At === t
          ? F
          : (this.At = t, document.importNode(t.content, !0));
      }
    },
  );
class ps extends Vt {
  constructor(t) {
    if (super(t), this.bt = G, 2 !== t.type) {
      throw Error(
        this.constructor.directiveName +
          "() can only be used in child bindings",
      );
    }
  }
  render(t) {
    if (t === G || null == t) return this.kt = void 0, this.bt = t;
    if (t === F) return t;
    if ("string" != typeof t) {
      throw Error(
        this.constructor.directiveName + "() called with a non-string value",
      );
    }
    if (t === this.bt) return this.kt;
    this.bt = t;
    const s = [t];
    return s.raw = s,
      this.kt = {
        _$litType$: this.constructor.resultType,
        strings: s,
        values: [],
      };
  }
}
ps.directiveName = "unsafeHTML", ps.resultType = 1;
const vs = Ut(ps);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class ys extends ps {}
ys.directiveName = "unsafeSVG", ys.resultType = 2;
const ms = Ut(ys),
  bs = (t) => !yt(t) && "function" == typeof t.then,
  gs = 1073741823;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class ws extends Ht {
  constructor() {
    super(...arguments),
      this.Mt = gs,
      this.Ut = [],
      this.dt = new It(this),
      this.ft = new Dt();
  }
  render(...t) {
    return t.find((t) => !bs(t)) ?? F;
  }
  update(t, s) {
    const i = this.Ut;
    let e = i.length;
    this.Ut = s;
    const n = this.dt, r = this.ft;
    this.isConnected || this.disconnected();
    for (let t = 0; t < s.length && !(t > this.Mt); t++) {
      const o = s[t];
      if (!bs(o)) return this.Mt = t, o;
      t < e && o === i[t] ||
        (this.Mt = gs,
          e = 0,
          Promise.resolve(o).then(async (t) => {
            for (; r.get();) await r.get();
            const s = n.deref();
            if (void 0 !== s) {
              const i = s.Ut.indexOf(o);
              i > -1 && i < s.Mt && (s.Mt = i, s.setValue(t));
            }
          }));
    }
    return F;
  }
  disconnected() {
    this.dt.disconnect(), this.ft.pause();
  }
  reconnected() {
    this.dt.reconnect(this), this.ft.resume();
  }
}
const _s = Ut(ws);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function Ss(t, s, i) {
  return t ? s(t) : i?.(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $s = Symbol.for(""),
  Ts = (t) => {
    if (t?.r === $s) return t?._$litStatic$;
  },
  xs = (t) => ({ _$litStatic$: t, r: $s }),
  Es = (t, ...s) => ({
    _$litStatic$: s.reduce((s, i, e) =>
      s + ((t) => {
        if (void 0 !== t._$litStatic$) return t._$litStatic$;
        throw Error(
          `Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`,
        );
      })(i) + t[e + 1], t[0]),
    r: $s,
  }),
  Cs = new Map(),
  Ps = (t) => (s, ...i) => {
    const e = i.length;
    let n, r;
    const o = [], h = [];
    let c, l = 0, a = !1;
    for (; l < e;) {
      for (c = s[l]; l < e && void 0 !== (r = i[l], n = Ts(r));) {
        c += n + s[++l], a = !0;
      }
      l !== e && h.push(r), o.push(c), l++;
    }
    if (l === e && o.push(s[e]), a) {
      const t = o.join("$$lit$$");
      void 0 === (s = Cs.get(t)) && (o.raw = o, Cs.set(t, s = o)), i = h;
    }
    return t(s, ...i);
  },
  As = Ps(Z),
  ks = Ps(q);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export {
  $ as ReactiveElement,
  _ as notEqual,
  _s as until,
  _t as getDirectiveClass,
  As as staticHtml,
  At as removePart,
  at as render,
  Bt as AsyncReplaceDirective,
  bt as isTemplateResult,
  c as getCompatibleStyle,
  Ct as setCommittedValue,
  ct as _$LH,
  ds as styleMap,
  Es as literal,
  es as range,
  F as noChange,
  fs as templateContent,
  Ft as cache,
  ft as _$LE,
  G as nothing,
  Gt as choose,
  gt as isCompiledTemplateResult,
  h as adoptStyles,
  hs as ref,
  Ht as AsyncDirective,
  is as map,
  Jt as classMap,
  ks as staticSvg,
  kt as clearPart,
  ls as repeat,
  ms as unsafeSVG,
  Mt as PartType,
  mt as TemplateResultType,
  n as CSSResult,
  ns as createRef,
  o as css,
  Ps as withStatic,
  ps as UnsafeHTMLDirective,
  Pt as getCommittedValue,
  pt as isServer,
  q as svg,
  Qt as ifDefined,
  r as unsafeCSS,
  s as supportsAdoptingStyleSheets,
  Ss as when,
  ss as live,
  St as isSingleExpression,
  ts as keyed,
  Tt as insertPart,
  Ut as directive,
  ut as LitElement,
  vs as unsafeHTML,
  Vt as Directive,
  w as defaultConverter,
  ws as UntilDirective,
  Wt as asyncReplace,
  wt as isDirectiveResult,
  xs as unsafeStatic,
  Xt as join,
  xt as setChildPartValue,
  Yt as guard,
  yt as isPrimitive,
  Z as html,
  Zt as asyncAppend,
};
//# sourceMappingURL=lit-all.min.js.map
