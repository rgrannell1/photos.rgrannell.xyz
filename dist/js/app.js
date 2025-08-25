var Qe = Object.defineProperty;
var Ke = Object.getOwnPropertyDescriptor;
var m = (i, t, e, s) => {
  for (
    var r = s > 1 ? void 0 : s ? Ke(t, e) : t, n = i.length - 1, o;
    n >= 0;
    n--
  ) (o = i[n]) && (r = (s ? o(t, e, r) : o(r)) || r);
  return s && r && Qe(t, e, r), r;
};
var mt = globalThis,
  ft = mt.ShadowRoot && (mt.ShadyCSS === void 0 || mt.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  ae = Symbol(),
  oe = new WeakMap(),
  gt = class {
    constructor(t, e, s) {
      if (this._$cssResult$ = !0, s !== ae) {
        throw Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
        );
      }
      this.cssText = t, this.t = e;
    }
    get styleSheet() {
      let t = this.o, e = this.t;
      if (ft && t === void 0) {
        let s = e !== void 0 && e.length === 1;
        s && (t = oe.get(e)),
          t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
            s && oe.set(e, t));
      }
      return t;
    }
    toString() {
      return this.cssText;
    }
  },
  le = (i) => new gt(typeof i == "string" ? i : i + "", void 0, ae);
var ce = (i, t) => {
    if (ft) {
      i.adoptedStyleSheets = t.map(
        (e) => e instanceof CSSStyleSheet ? e : e.styleSheet,
      );
    } else {for (let e of t) {
        let s = document.createElement("style"), r = mt.litNonce;
        r !== void 0 && s.setAttribute("nonce", r),
          s.textContent = e.cssText,
          i.appendChild(s);
      }}
  },
  qt = ft ? (i) => i : (i) =>
    i instanceof CSSStyleSheet
      ? ((t) => {
        let e = "";
        for (let s of t.cssRules) e += s.cssText;
        return le(e);
      })(i)
      : i;
var {
    is: Ye,
    defineProperty: Je,
    getOwnPropertyDescriptor: Xe,
    getOwnPropertyNames: Ze,
    getOwnPropertySymbols: ts,
    getPrototypeOf: es,
  } = Object,
  $t = globalThis,
  he = $t.trustedTypes,
  ss = he ? he.emptyScript : "",
  rs = $t.reactiveElementPolyfillSupport,
  it = (i, t) => i,
  nt = {
    toAttribute(i, t) {
      switch (t) {
        case Boolean:
          i = i ? ss : null;
          break;
        case Object:
        case Array:
          i = i == null ? i : JSON.stringify(i);
      }
      return i;
    },
    fromAttribute(i, t) {
      let e = i;
      switch (t) {
        case Boolean:
          e = i !== null;
          break;
        case Number:
          e = i === null ? null : Number(i);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(i);
          } catch {
            e = null;
          }
      }
      return e;
    },
  },
  bt = (i, t) => !Ye(i, t),
  de = {
    attribute: !0,
    type: String,
    converter: nt,
    reflect: !1,
    useDefault: !1,
    hasChanged: bt,
  };
Symbol.metadata ??= Symbol("metadata"),
  $t.litPropertyMetadata ??= new WeakMap();
var k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = de) {
    if (
      e.state && (e.attribute = !1),
        this._$Ei(),
        this.prototype.hasOwnProperty(t) &&
        ((e = Object.create(e)).wrapped = !0),
        this.elementProperties.set(t, e),
        !e.noAccessor
    ) {
      let s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Je(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    let { get: r, set: n } = Xe(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(o) {
        this[e] = o;
      },
    };
    return {
      get: r,
      set(o) {
        let c = r?.call(this);
        n?.call(this, o), this.requestUpdate(t, c, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    let t = es(this);
    t.finalize(),
      t.l !== void 0 && (this.l = [...t.l]),
      this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (
      this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))
    ) {
      let e = this.properties, s = [...Ze(e), ...ts(e)];
      for (let r of s) this.createProperty(r, e[r]);
    }
    let t = this[Symbol.metadata];
    if (t !== null) {
      let e = litPropertyMetadata.get(t);
      if (e !== void 0) {
        for (let [s, r] of e) this.elementProperties.set(s, r);
      }
    }
    this._$Eh = new Map();
    for (let [e, s] of this.elementProperties) {
      let r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    let e = [];
    if (Array.isArray(t)) {
      let s = new Set(t.flat(1 / 0).reverse());
      for (let r of s) e.unshift(qt(r));
    } else t !== void 0 && e.push(qt(t));
    return e;
  }
  static _$Eu(t, e) {
    let s = e.attribute;
    return s === !1
      ? void 0
      : typeof s == "string"
      ? s
      : typeof t == "string"
      ? t.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      this._$Ep = void 0,
      this.isUpdatePending = !1,
      this.hasUpdated = !1,
      this._$Em = null,
      this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t),
      this._$AL = new Map(),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= new Set()).add(t),
      this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    let t = new Map(), e = this.constructor.elementProperties;
    for (let s of e.keys()) {
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    }
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    let t = this.shadowRoot ??
      this.attachShadow(this.constructor.shadowRootOptions);
    return ce(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(),
      this.enableUpdating(!0),
      this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    let s = this.constructor.elementProperties.get(t),
      r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      let n = (s.converter?.toAttribute !== void 0 ? s.converter : nt)
        .toAttribute(e, s.type);
      this._$Em = t,
        n == null ? this.removeAttribute(r) : this.setAttribute(r, n),
        this._$Em = null;
    }
  }
  _$AK(t, e) {
    let s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      let n = s.getPropertyOptions(r),
        o = typeof n.converter == "function"
          ? { fromAttribute: n.converter }
          : n.converter?.fromAttribute !== void 0
          ? n.converter
          : nt;
      this._$Em = r;
      let c = o.fromAttribute(e, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      let r = this.constructor, n = this[t];
      if (
        s ??= r.getPropertyOptions(t),
          !((s.hasChanged ?? bt)(n, e) ||
            s.useDefault && s.reflect && n === this._$Ej?.get(t) &&
              !this.hasAttribute(r._$Eu(t, s)))
      ) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= new Map()).has(t) &&
        (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) ||
      (this._$AL.has(t) ||
        (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)),
        r === !0 && this._$Em !== t && (this._$Eq ??= new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    let t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (let [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      let s = this.constructor.elementProperties;
      if (s.size > 0) {
        for (let [r, n] of s) {
          let { wrapped: o } = n, c = this[r];
          o !== !0 || this._$AL.has(r) || c === void 0 ||
            this.C(r, void 0, n, c);
        }
      }
    }
    let t = !1, e = this._$AL;
    try {
      t = this.shouldUpdate(e),
        t
          ? (this.willUpdate(e),
            this._$EO?.forEach((s) => s.hostUpdate?.()),
            this.update(e))
          : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()),
      this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)),
      this.updated(t);
  }
  _$EM() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {}
  firstUpdated(t) {}
};
k.elementStyles = [],
  k.shadowRootOptions = { mode: "open" },
  k[it("elementProperties")] = new Map(),
  k[it("finalized")] = new Map(),
  rs?.({ ReactiveElement: k }),
  ($t.reactiveElementVersions ??= []).push("2.1.1");
var Ft = globalThis,
  yt = Ft.trustedTypes,
  pe = yt ? yt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0,
  zt = "$lit$",
  M = `lit$${Math.random().toFixed(9).slice(2)}$`,
  Wt = "?" + M,
  is = `<${Wt}>`,
  H = document,
  at = () => H.createComment(""),
  lt = (i) => i === null || typeof i != "object" && typeof i != "function",
  Gt = Array.isArray,
  be = (i) => Gt(i) || typeof i?.[Symbol.iterator] == "function",
  Vt = `[ 	
\f\r]`,
  ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  ue = /-->/g,
  me = />/g,
  j = RegExp(
    `>|${Vt}(?:([^\\s"'>=/]+)(${Vt}*=${Vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    "g",
  ),
  ge = /'/g,
  fe = /"/g,
  ye = /^(?:script|style|textarea|title)$/i,
  Qt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }),
  l = Qt(1),
  Es = Qt(2),
  Cs = Qt(3),
  C = Symbol.for("lit-noChange"),
  x = Symbol.for("lit-nothing"),
  $e = new WeakMap(),
  B = H.createTreeWalker(H, 129);
function _e(i, t) {
  if (!Gt(i) || !i.hasOwnProperty("raw")) {
    throw Error("invalid template strings array");
  }
  return pe !== void 0 ? pe.createHTML(t) : t;
}
var we = (i, t) => {
    let e = i.length - 1,
      s = [],
      r,
      n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "",
      o = ot;
    for (let c = 0; c < e; c++) {
      let a = i[c], h, p, d = -1, f = 0;
      for (; f < a.length && (o.lastIndex = f, p = o.exec(a), p !== null);) {
        f = o.lastIndex,
          o === ot
            ? p[1] === "!--"
              ? o = ue
              : p[1] !== void 0
              ? o = me
              : p[2] !== void 0
              ? (ye.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = j)
              : p[3] !== void 0 && (o = j)
            : o === j
            ? p[0] === ">"
              ? (o = r ?? ot, d = -1)
              : p[1] === void 0
              ? d = -2
              : (d = o.lastIndex - p[2].length,
                h = p[1],
                o = p[3] === void 0 ? j : p[3] === '"' ? fe : ge)
            : o === fe || o === ge
            ? o = j
            : o === ue || o === me
            ? o = ot
            : (o = j, r = void 0);
      }
      let $ = o === j && i[c + 1].startsWith("/>") ? " " : "";
      n += o === ot
        ? a + is
        : d >= 0
        ? (s.push(h), a.slice(0, d) + zt + a.slice(d) + M + $)
        : a + M + (d === -2 ? c : $);
    }
    return [
      _e(
        i,
        n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : ""),
      ),
      s,
    ];
  },
  ct = class i {
    constructor({ strings: t, _$litType$: e }, s) {
      let r;
      this.parts = [];
      let n = 0, o = 0, c = t.length - 1, a = this.parts, [h, p] = we(t, e);
      if (
        this.el = i.createElement(h, s),
          B.currentNode = this.el.content,
          e === 2 || e === 3
      ) {
        let d = this.el.content.firstChild;
        d.replaceWith(...d.childNodes);
      }
      for (; (r = B.nextNode()) !== null && a.length < c;) {
        if (r.nodeType === 1) {
          if (r.hasAttributes()) {
            for (let d of r.getAttributeNames()) {
              if (d.endsWith(zt)) {
                let f = p[o++],
                  $ = r.getAttribute(d).split(M),
                  S = /([.?@])?(.*)/.exec(f);
                a.push({
                  type: 1,
                  index: n,
                  name: S[2],
                  strings: $,
                  ctor: S[1] === "."
                    ? wt
                    : S[1] === "?"
                    ? xt
                    : S[1] === "@"
                    ? vt
                    : V,
                }), r.removeAttribute(d);
              } else {d.startsWith(M) &&
                  (a.push({ type: 6, index: n }), r.removeAttribute(d));}
            }
          }
          if (ye.test(r.tagName)) {
            let d = r.textContent.split(M), f = d.length - 1;
            if (f > 0) {
              r.textContent = yt ? yt.emptyScript : "";
              for (let $ = 0; $ < f; $++) {
                r.append(d[$], at()),
                  B.nextNode(),
                  a.push({ type: 2, index: ++n });
              }
              r.append(d[f], at());
            }
          }
        } else if (r.nodeType === 8) {
          if (r.data === Wt) a.push({ type: 2, index: n });
          else {
            let d = -1;
            for (; (d = r.data.indexOf(M, d + 1)) !== -1;) {
              a.push({ type: 7, index: n }), d += M.length - 1;
            }
          }
        }
        n++;
      }
    }
    static createElement(t, e) {
      let s = H.createElement("template");
      return s.innerHTML = t, s;
    }
  };
function q(i, t, e = i, s) {
  if (t === C) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl,
    n = lt(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n &&
    (r?._$AO?.(!1),
      n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)),
      s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r),
    r !== void 0 && (t = q(i, r._$AS(i, t.values), r, s)),
    t;
}
var _t = class {
    constructor(t, e) {
      this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t) {
      let { el: { content: e }, parts: s } = this._$AD,
        r = (t?.creationScope ?? H).importNode(e, !0);
      B.currentNode = r;
      let n = B.nextNode(), o = 0, c = 0, a = s[0];
      for (; a !== void 0;) {
        if (o === a.index) {
          let h;
          a.type === 2
            ? h = new K(n, n.nextSibling, this, t)
            : a.type === 1
            ? h = new a.ctor(n, a.name, a.strings, this, t)
            : a.type === 6 && (h = new St(n, this, t)),
            this._$AV.push(h),
            a = s[++c];
        }
        o !== a?.index && (n = B.nextNode(), o++);
      }
      return B.currentNode = H, r;
    }
    p(t) {
      let e = 0;
      for (let s of this._$AV) {
        s !== void 0 &&
        (s.strings !== void 0
          ? (s._$AI(t, s, e), e += s.strings.length - 2)
          : s._$AI(t[e])), e++;
      }
    }
  },
  K = class i {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, e, s, r) {
      this.type = 2,
        this._$AH = x,
        this._$AN = void 0,
        this._$AA = t,
        this._$AB = e,
        this._$AM = s,
        this.options = r,
        this._$Cv = r?.isConnected ?? !0;
    }
    get parentNode() {
      let t = this._$AA.parentNode, e = this._$AM;
      return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t, e = this) {
      t = q(this, t, e),
        lt(t)
          ? t === x || t == null || t === ""
            ? (this._$AH !== x && this._$AR(), this._$AH = x)
            : t !== this._$AH && t !== C && this._(t)
          : t._$litType$ !== void 0
          ? this.$(t)
          : t.nodeType !== void 0
          ? this.T(t)
          : be(t)
          ? this.k(t)
          : this._(t);
    }
    O(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
      this._$AH !== x && lt(this._$AH)
        ? this._$AA.nextSibling.data = t
        : this.T(H.createTextNode(t)), this._$AH = t;
    }
    $(t) {
      let { values: e, _$litType$: s } = t,
        r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 &&
          (s.el = ct.createElement(_e(s.h, s.h[0]), this.options)),
          s);
      if (this._$AH?._$AD === r) this._$AH.p(e);
      else {
        let n = new _t(r, this), o = n.u(this.options);
        n.p(e), this.T(o), this._$AH = n;
      }
    }
    _$AC(t) {
      let e = $e.get(t.strings);
      return e === void 0 && $e.set(t.strings, e = new ct(t)), e;
    }
    k(t) {
      Gt(this._$AH) || (this._$AH = [], this._$AR());
      let e = this._$AH, s, r = 0;
      for (let n of t) {
        r === e.length
          ? e.push(s = new i(this.O(at()), this.O(at()), this, this.options))
          : s = e[r],
          s._$AI(n),
          r++;
      }
      r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
    }
    _$AR(t = this._$AA.nextSibling, e) {
      for (this._$AP?.(!1, !0, e); t !== this._$AB;) {
        let s = t.nextSibling;
        t.remove(), t = s;
      }
    }
    setConnected(t) {
      this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
    }
  },
  V = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t, e, s, r, n) {
      this.type = 1,
        this._$AH = x,
        this._$AN = void 0,
        this.element = t,
        this.name = e,
        this._$AM = r,
        this.options = n,
        s.length > 2 || s[0] !== "" || s[1] !== ""
          ? (this._$AH = Array(s.length - 1).fill(new String()),
            this.strings = s)
          : this._$AH = x;
    }
    _$AI(t, e = this, s, r) {
      let n = this.strings, o = !1;
      if (n === void 0) {
        t = q(this, t, e, 0),
          o = !lt(t) || t !== this._$AH && t !== C,
          o && (this._$AH = t);
      } else {
        let c = t, a, h;
        for (t = n[0], a = 0; a < n.length - 1; a++) {
          h = q(this, c[s + a], e, a),
            h === C && (h = this._$AH[a]),
            o ||= !lt(h) || h !== this._$AH[a],
            h === x ? t = x : t !== x && (t += (h ?? "") + n[a + 1]),
            this._$AH[a] = h;
        }
      }
      o && !r && this.j(t);
    }
    j(t) {
      t === x
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, t ?? "");
    }
  },
  wt = class extends V {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === x ? void 0 : t;
    }
  },
  xt = class extends V {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== x);
    }
  },
  vt = class extends V {
    constructor(t, e, s, r, n) {
      super(t, e, s, r, n), this.type = 5;
    }
    _$AI(t, e = this) {
      if ((t = q(this, t, e, 0) ?? x) === C) return;
      let s = this._$AH,
        r = t === x && s !== x || t.capture !== s.capture ||
          t.once !== s.once || t.passive !== s.passive,
        n = t !== x && (s === x || r);
      r && this.element.removeEventListener(this.name, this, s),
        n && this.element.addEventListener(this.name, this, t),
        this._$AH = t;
    }
    handleEvent(t) {
      typeof this._$AH == "function"
        ? this._$AH.call(this.options?.host ?? this.element, t)
        : this._$AH.handleEvent(t);
    }
  },
  St = class {
    constructor(t, e, s) {
      this.element = t,
        this.type = 6,
        this._$AN = void 0,
        this._$AM = e,
        this.options = s;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      q(this, t);
    }
  },
  xe = {
    M: zt,
    P: M,
    A: Wt,
    C: 1,
    L: we,
    R: _t,
    D: be,
    V: q,
    I: K,
    H: V,
    N: xt,
    U: vt,
    B: wt,
    F: St,
  },
  ns = Ft.litHtmlPolyfillSupport;
ns?.(ct, K), (Ft.litHtmlVersions ??= []).push("3.3.1");
var ve = (i, t, e) => {
  let s = e?.renderBefore ?? t, r = s._$litPart$;
  if (r === void 0) {
    let n = e?.renderBefore ?? null;
    s._$litPart$ = r = new K(t.insertBefore(at(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
var Kt = globalThis,
  T = class extends k {
    constructor() {
      super(...arguments),
        this.renderOptions = { host: this },
        this._$Do = void 0;
    }
    createRenderRoot() {
      let t = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
      let e = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(t),
        this._$Do = ve(e, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return C;
    }
  };
T._$litElement$ = !0,
  T.finalized = !0,
  Kt.litElementHydrateSupport?.({ LitElement: T });
var os = Kt.litElementPolyfillSupport;
os?.({ LitElement: T });
(Kt.litElementVersions ??= []).push("4.2.1");
var g = class extends T {
  createRenderRoot() {
    return this;
  }
  broadcast(t, e) {
    return () => {
      let s = new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 });
      this.dispatchEvent(s);
    };
  }
};
var Se = class {
    #t;
    #e;
    #s;
    constructor() {
      this.#t = 0, this.#e = new Map(), this.#s = new Map();
    }
    map() {
      return this.#e;
    }
    reverseMap() {
      return this.#s;
    }
    add(i) {
      return this.#e.has(i)
        ? this.#e.get(i)
        : (this.#e.set(i, this.#t),
          this.#s.set(this.#t, i),
          this.#t++,
          this.#t - 1);
    }
    setIndex(i, t) {
      this.#e.set(i, t), this.#s.set(t, i);
    }
    getIndex(i) {
      return this.#e.get(i);
    }
    getValue(i) {
      return this.#s.get(i);
    }
    has(i) {
      return this.#e.has(i);
    }
  },
  Ae = class {
    static intersection(i, t) {
      if (t.length === 0) return new Set();
      t.sort((s, r) => s.size - r.size);
      let e = new Set(t[0]);
      for (let s = 1; s < t.length; s++) {
        let r = t[s];
        for (let n of e) i.setCheck(), r.has(n) || e.delete(n);
        if (e.size === 0) break;
      }
      return e;
    }
  },
  Ie = class {
    stringIndex;
    constructor() {
      this.stringIndex = new Se();
    }
    parseTriple(i) {
      let t = i.match(/^(\d+) (\d+) (\d+)$/);
      if (!t) throw new SyntaxError(`Invalid format for triple line: ${i}`);
      let e = this.stringIndex.getValue(parseInt(t[1], 10)),
        s = this.stringIndex.getValue(parseInt(t[2], 10)),
        r = this.stringIndex.getValue(parseInt(t[3], 10));
      if (e === void 0 || s === void 0 || r === void 0) {
        throw new SyntaxError(`Invalid triple reference: ${i}`);
      }
      return [e, s, r];
    }
    parseDeclaration(i) {
      let t = i.match(/^(\d+) "(.*)"$/);
      if (!t) {
        throw new SyntaxError(`Invalid format for declaration line: ${i}`);
      }
      let e = t[1], s = t[2];
      this.stringIndex.setIndex(s, parseInt(e, 10));
    }
    parse(i) {
      if (/^(\d+)\s(\d+)\s(\d+)$/.test(i)) return this.parseTriple(i);
      this.parseDeclaration(i);
    }
  };
function v(i, t = "r\xF3") {
  if (!i.startsWith(`urn:${t}:`)) {
    throw new Error(`Invalid URN for namespace ${t}: ${i}`);
  }
  let e = i.split(":")[2],
    [s, r] = i.split("?"),
    n = s.split(":")[3],
    o = r ? Object.fromEntries(new URLSearchParams(r)) : {};
  return { type: e, id: n, qs: o };
}
function I(i, t = "r\xF3") {
  try {
    return v(i, t);
  } catch {
    return { type: "unknown", id: i, qs: {} };
  }
}
var as = class {
    mapReadCount;
    constructor() {
      this.mapReadCount = 0;
    }
    mapRead() {
      this.mapReadCount++;
    }
  },
  ls = class {
    setCheckCount;
    constructor() {
      this.setCheckCount = 0;
    }
    setCheck() {
      this.setCheckCount++;
    }
  },
  cs = class {
    indexedTriples;
    stringIndex;
    sourceType;
    sourceId;
    sourceQs;
    relations;
    targetType;
    targetId;
    targetQs;
    metrics;
    stringUrn;
    constructor(i) {
      this.indexedTriples = [],
        this.stringIndex = new Se(),
        this.sourceType = new Map(),
        this.sourceId = new Map(),
        this.sourceQs = new Map(),
        this.relations = new Map(),
        this.targetType = new Map(),
        this.targetId = new Map(),
        this.targetQs = new Map(),
        this.stringUrn = new Map(),
        this.add(i),
        this.metrics = new as();
    }
    add(i) {
      let t = this.indexedTriples.length;
      for (let e = 0; e < i.length; e++) {
        let s = t + e,
          r = i[e],
          n = this.stringUrn.has(r[0])
            ? this.stringUrn.get(r[0])
            : this.stringUrn.set(r[0], I(r[0])).get(r[0]),
          o = r[1],
          c = this.stringUrn.has(r[2])
            ? this.stringUrn.get(r[2])
            : this.stringUrn.set(r[2], I(r[2])).get(r[2]),
          a = this.stringIndex.add(n.type),
          h = this.stringIndex.add(n.id),
          p = this.stringIndex.add(o),
          d = this.stringIndex.add(c.type),
          f = this.stringIndex.add(c.id);
        this.indexedTriples.push([
          this.stringIndex.add(r[0]),
          p,
          this.stringIndex.add(r[2]),
        ]),
          this.sourceType.has(a) || this.sourceType.set(a, new Set()),
          this.sourceType.get(a).add(s),
          this.sourceId.has(h) || this.sourceId.set(h, new Set()),
          this.sourceId.get(h).add(s);
        for (let [$, S] of Object.entries(n.qs)) {
          let U = this.stringIndex.add(`${$}=${S}`);
          this.sourceQs.has(U) || this.sourceQs.set(U, new Set()),
            this.sourceQs.get(U).add(s);
        }
        this.relations.has(p) || this.relations.set(p, new Set()),
          this.relations.get(p).add(s),
          this.targetType.has(d) || this.targetType.set(d, new Set()),
          this.targetType.get(d).add(s),
          this.targetId.has(f) || this.targetId.set(f, new Set()),
          this.targetId.get(f).add(s);
        for (let [$, S] of Object.entries(c.qs)) {
          let U = this.stringIndex.add(`${$}=${S}`);
          this.targetQs.has(U) || this.targetQs.set(U, new Set()),
            this.targetQs.get(U).add(s);
        }
      }
    }
    get length() {
      return this.indexedTriples.length;
    }
    triples() {
      return this.indexedTriples.map((
        [i, t, e],
      ) => [
        this.stringIndex.getValue(i),
        this.stringIndex.getValue(t),
        this.stringIndex.getValue(e),
      ]);
    }
    getTriple(i) {
      if (i < 0 || i >= this.indexedTriples.length) return;
      let [t, e, s] = this.indexedTriples[i];
      return [
        this.stringIndex.getValue(t),
        this.stringIndex.getValue(e),
        this.stringIndex.getValue(s),
      ];
    }
    getTripleIndices(i) {
      if (!(i < 0 || i >= this.indexedTriples.length)) {
        return this.indexedTriples[i];
      }
    }
    getSourceTypeSet(i) {
      let t = this.stringIndex.getIndex(i);
      if (t !== void 0) return this.metrics.mapRead(), this.sourceType.get(t);
    }
    getSourceIdSet(i) {
      let t = this.stringIndex.getIndex(i);
      if (t !== void 0) return this.metrics.mapRead(), this.sourceId.get(t);
    }
    getSourceQsSet(i, t) {
      let e = this.stringIndex.getIndex(`${i}=${t}`);
      if (e !== void 0) return this.metrics.mapRead(), this.sourceQs.get(e);
    }
    getRelationSet(i) {
      let t = this.stringIndex.getIndex(i);
      if (t !== void 0) return this.metrics.mapRead(), this.relations.get(t);
    }
    getTargetTypeSet(i) {
      let t = this.stringIndex.getIndex(i);
      if (t !== void 0) return this.metrics.mapRead(), this.targetType.get(t);
    }
    getTargetIdSet(i) {
      let t = this.stringIndex.getIndex(i);
      if (t !== void 0) return this.metrics.mapRead(), this.targetId.get(t);
    }
    getTargetQsSet(i, t) {
      let e = this.stringIndex.getIndex(`${i}=${t}`);
      if (e !== void 0) return this.metrics.mapRead(), this.targetQs.get(e);
    }
  },
  O = class {
    static source(i) {
      return i[0];
    }
    static relation(i) {
      return i[1];
    }
    static target(i) {
      return i[2];
    }
  };
function hs(i, t, e) {
  let s = t.names.concat(e.names);
  if (t.rows.length === 0 || e.rows.length === 0) return { names: s, rows: [] };
  let r = new Map(), n = new Map();
  for (let a = 0; a < t.rows.length; a++) {
    let h = t.rows[a][2];
    r.has(h) || r.set(h, []), r.get(h).push(a);
  }
  for (let a = 0; a < e.rows.length; a++) {
    let h = e.rows[a][0];
    n.has(h) || n.set(h, []), n.get(h).push(a);
  }
  let o = Ae.intersection(i, [new Set(r.keys()), new Set(n.keys())]), c = [];
  for (let a of o) {
    let h = n.get(a), p = r.get(a);
    for (let d of h) {
      for (let f of p) {
        let $ = t.rows[d].concat(e.rows[f]);
        c.push($);
      }
    }
  }
  return { names: s, rows: c };
}
var Ee = class F {
  index;
  triplesCount;
  cursorIndices;
  metrics;
  constructor(t) {
    this.index = new cs(t),
      this.triplesCount = this.index.length,
      this.cursorIndices = new Set(),
      this.metrics = new ls();
    for (let e = 0; e < this.triplesCount; e++) this.cursorIndices.add(e);
  }
  clone() {
    let t = new F([]);
    return t.index = this.index,
      t.triplesCount = this.triplesCount,
      t.cursorIndices = this.cursorIndices,
      t.metrics = this.metrics,
      t;
  }
  static of(t) {
    return new F(t);
  }
  static from(t) {
    let e = [];
    for (let s of t) {
      let { id: r, ...n } = s;
      if (typeof r != "string") {
        throw new Error("Each TripleObject must have a string id.");
      }
      for (let [o, c] of Object.entries(n)) {
        if (Array.isArray(c)) {
          for (let a of c) e.push([r, o, a]);
        } else e.push([r, o, c]);
      }
    }
    return new F(e);
  }
  add(t) {
    let e = this.index.length;
    this.index.add(t), this.triplesCount = this.index.length;
    for (let s = e; s < this.triplesCount; s++) this.cursorIndices.add(s);
  }
  map(t) {
    return new F(this.index.triples().map(t));
  }
  flatMap(t) {
    let e = this.index.triples().flatMap(t);
    return new F(e);
  }
  firstTriple() {
    return this.index.length > 0 ? this.index.getTriple(0) : void 0;
  }
  firstSource() {
    let t = this.firstTriple();
    return t ? O.source(t) : void 0;
  }
  firstRelation() {
    let t = this.firstTriple();
    return t ? O.relation(t) : void 0;
  }
  firstTarget() {
    let t = this.firstTriple();
    return t ? O.target(t) : void 0;
  }
  firstObject(t = !1) {
    return this.objects(t)[0];
  }
  triples() {
    return this.index.triples();
  }
  sources() {
    return new Set(this.index.triples().map(O.source));
  }
  relations() {
    return new Set(this.index.triples().map(O.relation));
  }
  targets() {
    return new Set(this.index.triples().map(O.target));
  }
  objects(t = !1) {
    let e = [];
    for (let [s, r] of Object.entries(this.object(t))) r.id = s, e.push(r);
    return e;
  }
  object(t = !1) {
    let e = {};
    for (let [s, r, n] of this.index.triples()) {
      e[s] || (e[s] = { id: s }),
        e[s][r]
          ? Array.isArray(e[s][r]) ? e[s][r].push(n) : e[s][r] = [e[s][r], n]
          : e[s][r] = t ? [n] : n;
    }
    return e;
  }
  #t(t) {
    let e = [this.cursorIndices], { source: s, relation: r, target: n } = t;
    if (typeof s > "u" && typeof n > "u" && typeof r > "u") {
      throw new Error("At least one search parameter must be defined");
    }
    let o = ["source", "relation", "target"];
    for (let h of Object.keys(t)) {
      if (Object.prototype.hasOwnProperty.call(t, h) && !o.includes(h)) {
        throw new Error(`Unexpected search parameter: ${h}`);
      }
    }
    if (s) {
      if (s.type) {
        let h = this.index.getSourceTypeSet(s.type);
        if (h) e.push(h);
        else return new Set();
      }
      if (s.id) {
        let h = this.index.getSourceIdSet(s.id);
        if (h) e.push(h);
        else return new Set();
      }
      if (s.qs) {
        for (let [h, p] of Object.entries(s.qs)) {
          let d = this.index.getSourceQsSet(h, p);
          if (d) e.push(d);
          else return new Set();
        }
      }
    }
    if (n) {
      if (n.type) {
        let h = this.index.getTargetTypeSet(n.type);
        if (h) e.push(h);
        else return new Set();
      }
      if (n.id) {
        let h = this.index.getTargetIdSet(n.id);
        if (h) e.push(h);
        else return new Set();
      }
      if (n.qs) {
        for (let [h, p] of Object.entries(n.qs)) {
          let d = this.index.getTargetQsSet(h, p);
          if (d) e.push(d);
          else return new Set();
        }
      }
    }
    if (r) {
      let h = typeof r == "string" ? { relation: [r] } : r;
      if (h.relation) {
        let p = new Set();
        for (let d of h.relation) {
          let f = this.index.getRelationSet(d);
          if (f) { for (let $ of f) p.add($); }
        }
        if (p.size > 0) e.push(p);
        else return new Set();
      }
    }
    let c = Ae.intersection(this.metrics, e), a = new Set();
    for (let h of c) {
      let p = this.index.getTriple(h);
      if (
        !s?.predicate && !n?.predicate && !(typeof r == "object" && r.predicate)
      ) {
        a.add(h);
        continue;
      }
      let d = !0;
      s?.predicate && (d = d && s.predicate(O.source(p))),
        n?.predicate && (d = d && n.predicate(O.target(p))),
        typeof r == "object" && r.predicate &&
        (d = d && r.predicate(O.relation(p))),
        d && a.add(h);
    }
    return a;
  }
  search(t) {
    let e = [];
    for (let s of this.#t(t)) {
      let r = this.index.getTriple(s);
      r && e.push(r);
    }
    return new F(e);
  }
  search2(t) {
    let e = Object.entries(t), s = [];
    for (let c = 0; c < e.length - 2; c += 2) {
      let a = e.slice(c, c + 3),
        h = { source: a[0][1], relation: a[1][1], target: a[2][1] },
        p = a.map(($) => $[0]),
        d = this.#t(h),
        f = Array.from(d).flatMap(($) => {
          let S = this.index.getTripleIndices($);
          return typeof S > "u" ? [] : [S];
        });
      s.push({ names: p, rows: f });
    }
    let r = s.reduce(hs.bind(this, this.metrics)), n = r.names, o = [];
    for (let c of r.rows) {
      let a = {};
      for (let h = 0; h < n.length; h++) {
        let p = n[h];
        a[p] = this.index.stringIndex.getValue(c[h]);
      }
      o.push(a);
    }
    return o;
  }
  getMetrics() {
    return { index: this.index.metrics, db: this.metrics };
  }
};
var ds = window.envConfig,
  At = class {
    constructor(t = `/manifest/tribbles.${ds.publication_id}.txt`) {
      this.url = t;
    }
    async *stream() {
      let t = new Ie(), e = await fetch(this.url);
      if (!e.body) throw new Error("No response body");
      let s = new TextDecoderStream(),
        r = e.body.pipeThrough(s).getReader(),
        n = "";
      for (;;) {
        let { value: o, done: c } = await r.read();
        if (c) break;
        n += o;
        let a = n.split(`
`);
        n = a.pop() ?? "";
        for (let h of a) {
          let p = t.parse(h);
          p !== void 0 && (yield p);
        }
      }
      if (n.length > 0) {
        let o = t.parse(n);
        o !== void 0 && (yield o);
      }
    }
  };
var Ce = "photos";
var Ue = {
    photos: "photos",
    albums: "albums",
    album: "album",
    metadata: "metadata",
    about: "about",
    videos: "videos",
    thing: "thing",
    listing: "listing",
  },
  b = class {
    static UNESCO = "unesco";
    static BIRD = "bird";
    static MAMMAL = "mammal";
    static REPTILE = "reptile";
    static FISH = "fish";
    static INSECT = "insect";
    static AMPHIBIAN = "amphibian";
    static GEONAME = "geoname";
  },
  y = class {
    static SUBJECT = "subject";
    static LOCATION = "location";
    static LONGITUDE = "longitude";
    static LATITUDE = "latitude";
    static COUNTRY = "country";
    static FLAG = "flag";
    static RATING = "rating";
    static NAME = "name";
    static BIRDWATCH_URL = "birdwatch_url";
    static WIKIPEDIA = "wikipedia";
    static CREATED_AT = "created_at";
    static F_STOP = "f_stop";
    static FOCAL_LENGTH = "focal_length";
    static MODEL = "model";
    static EXPOSURE_TIME = "exposure_time";
    static ISO = "iso";
    static WIDTH = "width";
    static HEIGHT = "height";
  },
  Te = new Set([
    "created_at",
    "f_stop",
    "focal_length",
    "model",
    "exposure_time",
    "iso",
    "width",
    "height",
  ]),
  z = new Set(["bird", "mammal", "reptile", "amphibian", "fish", "insect"]);
var D = class i {
  static {
    this.ROUTES = {
      photos: this.showPhotosUrl,
      albums: this.showAlbumsUrl,
      album: this.showAlbumUrl,
      metadata: this.showMetadataUrl,
      about: this.showAboutUrl,
      videos: this.showVideosUrl,
      thing: this.showThingUrl,
      listing: this.showListingUrl,
    };
  }
  static {
    this.URL_PREFIX_TO_PAGE = {
      "#/albums": "albums",
      "#/album": "album",
      "#/metadata": "metadata",
      "#/about": "about",
      "#/videos": "videos",
      "#/thing": "thing",
      "#/photos": "photos",
      "#/listing": "listing",
    };
  }
  static {
    this.ID_PAGES = new Set(["album", "metadata", "thing"]);
  }
  static isPage(t) {
    return t in Ue;
  }
  static router(t) {
    if (i.isPage(t)) return i.ROUTES[t];
    throw new Error(`Unknown page: ${t}`);
  }
  static pageUsesId(t) {
    return i.isPage(t) && i.ID_PAGES.has(t);
  }
  static showAboutUrl() {
    window.location.hash = "#/about", document.title = "About - photos";
  }
  static showAlbumsUrl() {
    window.location.hash = "#/albums", document.title = "Albums - photos";
  }
  static showPhotosUrl() {
    window.location.hash = "#/photos", document.title = "Photos - photos";
  }
  static showAlbumUrl(t) {
    window.location.hash = `#/album/${t}`, document.title = "Album - photos";
  }
  static showPhotoUrl(t) {
    window.location.hash = `#/photo/${t}`, document.title = "Photo - photos";
  }
  static showMetadataUrl(t) {
    window.location.hash = `#/metadata/${t}`,
      document.title = "Metadata - photos";
  }
  static showVideosUrl() {
    window.location.hash = "#/videos", document.title = "Videos - photos";
  }
  static showThingUrl(t) {
    window.location.hash = `#/thing/${t}`, document.title = "Thing - photos";
  }
  static showListingUrl(t) {
    window.location.hash = `#/listing/${t}`,
      document.title = "Listing - photos";
  }
  static getUrl() {
    let t = window.location.hash;
    for (let [e, s] of Object.entries(i.URL_PREFIX_TO_PAGE)) {
      if (t.startsWith(e)) {
        let r = { type: s };
        return i.ID_PAGES.has(s) && (r.id = t.split("/")[2]), r;
      }
    }
    return { type: "albums" };
  }
};
var ps = {
    attribute: !0,
    type: String,
    converter: nt,
    reflect: !1,
    hasChanged: bt,
  },
  us = (i = ps, t, e) => {
    let { kind: s, metadata: r } = e, n = globalThis.litPropertyMetadata.get(r);
    if (
      n === void 0 && globalThis.litPropertyMetadata.set(r, n = new Map()),
        s === "setter" && ((i = Object.create(i)).wrapped = !0),
        n.set(e.name, i),
        s === "accessor"
    ) {
      let { name: o } = e;
      return {
        set(c) {
          let a = t.get.call(this);
          t.set.call(this, c), this.requestUpdate(o, a, i);
        },
        init(c) {
          return c !== void 0 && this.C(o, void 0, i, c), c;
        },
      };
    }
    if (s === "setter") {
      let { name: o } = e;
      return function (c) {
        let a = this[o];
        t.call(this, c), this.requestUpdate(o, a, i);
      };
    }
    throw Error("Unsupported decorator location: " + s);
  };
function u(i) {
  return (t, e) =>
    typeof e == "object" ? us(i, t, e) : ((s, r, n) => {
      let o = r.hasOwnProperty(n);
      return r.constructor.createProperty(n, s),
        o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
    })(i, t, e);
}
var Et = class extends g {
  render() {
    let t = ["photo-sidebar"];
    return this.visible && t.push("sidebar-visible"),
      l`
    <aside class="${t.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${this.broadcast("navigate-page", { page: "photos" })}
            class="sidebar-item">PHOTOS</li>

          <li
            @click=${this.broadcast("navigate-page", { page: "videos" })}
            class="sidebar-item">VIDEOS</li>

          <li
            @click=${this.broadcast("navigate-page", { page: "albums" })}
            id="albums-sidebar-link" class="sidebar-item">ALBUMS</li>
          <li
            @click=${this.broadcast("navigate-page", { page: "about" })}
            class="sidebar-item">ABOUT</li>

      </nav>
    </aside>
    `;
  }
};
m([u({ type: Boolean, state: !0 })], Et.prototype, "visible", 2);
customElements.define("photo-sidebar", Et);
var Ct = class extends g {
  constructor() {
    super(...arguments);
    this.darkMode = !1;
  }
  feedUrl() {
    return "/manifest/atom/atom-index.xml";
  }
  renderRss() {
    return l`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `;
  }
  render() {
    let e = this.darkMode ? "\u2600\uFE0F" : "\u{1F319}", s = Ce;
    return l`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${s}</span></a></li>
      ${this.renderRss()}
      <li style="float: right">
      <a>
      <span @click=${
      this.broadcast("switch-theme")
    } class="brand switch">${e}</span>
      </a>
      </li>

      </ul>
    </nav>
    `;
  }
};
m([u()], Ct.prototype, "darkMode", 2);
customElements.define("photo-header", Ct);
var J = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  W = (i) => (...t) => ({ _$litDirective$: i, values: t }),
  Y = class {
    constructor(t) {}
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t, e, s) {
      this._$Ct = t, this._$AM = e, this._$Ci = s;
    }
    _$AS(t, e) {
      return this.update(t, e);
    }
    update(t, e) {
      return this.render(...e);
    }
  };
var { I: ms } = xe;
var De = (i) => i.strings === void 0,
  Re = () => document.createComment(""),
  ke = (i, t, e) => {
    let s = i._$AA.parentNode, r = t === void 0 ? i._$AB : t._$AA;
    if (e === void 0) {
      let n = s.insertBefore(Re(), r), o = s.insertBefore(Re(), r);
      e = new ms(n, o, i, i.options);
    } else {
      let n = e._$AB.nextSibling, o = e._$AM, c = o !== i;
      if (c) {
        let a;
        e._$AQ?.(i),
          e._$AM = i,
          e._$AP !== void 0 && (a = i._$AU) !== o._$AU && e._$AP(a);
      }
      if (n !== r || c) {
        let a = e._$AA;
        for (; a !== n;) {
          let h = a.nextSibling;
          s.insertBefore(a, r), a = h;
        }
      }
    }
    return e;
  },
  Me = (i, t, e = i) => (i._$AI(t, e), i);
var Oe = (i) => {
  i._$AR();
};
var ht = (i, t) => {
    let e = i._$AN;
    if (e === void 0) return !1;
    for (let s of e) s._$AO?.(t, !1), ht(s, t);
    return !0;
  },
  Ut = (i) => {
    let t, e;
    do {
      if ((t = i._$AM) === void 0) break;
      e = t._$AN, e.delete(i), i = t;
    } while (e?.size === 0);
  },
  Pe = (i) => {
    for (let t; t = i._$AM; i = t) {
      let e = t._$AN;
      if (e === void 0) t._$AN = e = new Set();
      else if (e.has(i)) break;
      e.add(i), $s(t);
    }
  };
function gs(i) {
  this._$AN !== void 0 ? (Ut(this), this._$AM = i, Pe(this)) : this._$AM = i;
}
function fs(i, t = !1, e = 0) {
  let s = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) {
    if (t) {
      if (Array.isArray(s)) {
        for (let n = e; n < s.length; n++) ht(s[n], !1), Ut(s[n]);
      } else s != null && (ht(s, !1), Ut(s));
    } else ht(this, i);
  }
}
var $s = (i) => {
    i.type == J.CHILD && (i._$AP ??= fs, i._$AQ ??= gs);
  },
  Tt = class extends Y {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(t, e, s) {
      super._$AT(t, e, s), Pe(this), this.isConnected = t._$AU;
    }
    _$AO(t, e = !0) {
      t !== this.isConnected &&
      (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()),
        e && (ht(this, t), Ut(this));
    }
    setValue(t) {
      if (De(this._$Ct)) this._$Ct._$AI(t, this);
      else {
        let e = [...this._$Ct._$AH];
        e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
      }
    }
    disconnected() {}
    reconnected() {}
  };
var Le = async (i, t) => {
    for await (let e of i) if (await t(e) === !1) return;
  },
  Rt = class {
    constructor(t) {
      this.G = t;
    }
    disconnect() {
      this.G = void 0;
    }
    reconnect(t) {
      this.G = t;
    }
    deref() {
      return this.G;
    }
  },
  Dt = class {
    constructor() {
      this.Y = void 0, this.Z = void 0;
    }
    get() {
      return this.Y;
    }
    pause() {
      this.Y ??= new Promise((t) => this.Z = t);
    }
    resume() {
      this.Z?.(), this.Y = this.Z = void 0;
    }
  };
var dt = class extends Tt {
    constructor() {
      super(...arguments), this._$CK = new Rt(this), this._$CX = new Dt();
    }
    render(t, e) {
      return C;
    }
    update(t, [e, s]) {
      if (this.isConnected || this.disconnected(), e === this._$CJ) return C;
      this._$CJ = e;
      let r = 0, { _$CK: n, _$CX: o } = this;
      return Le(e, async (c) => {
        for (; o.get();) await o.get();
        let a = n.deref();
        if (a !== void 0) {
          if (a._$CJ !== e) return !1;
          s !== void 0 && (c = s(c, r)), a.commitValue(c, r), r++;
        }
        return !0;
      }),
        C;
    }
    commitValue(t, e) {
      this.setValue(t);
    }
    disconnected() {
      this._$CK.disconnect(), this._$CX.pause();
    }
    reconnected() {
      this._$CK.reconnect(this), this._$CX.resume();
    }
  },
  ri = W(dt);
var X = W(
  class extends dt {
    constructor(i) {
      if (super(i), i.type !== J.CHILD) {
        throw Error(
          "asyncAppend can only be used in child expressions",
        );
      }
    }
    update(i, t) {
      return this._$Ctt = i, super.update(i, t);
    }
    commitValue(i, t) {
      t === 0 && Oe(this._$Ctt);
      let e = ke(this._$Ctt);
      Me(e, i);
    }
  },
);
var kt = new Map(),
  A = class {
    static loadingMode(t) {
      let e = window.innerWidth,
        s = window.innerHeight,
        r = 400,
        n = Math.floor(e / r),
        o = Math.floor(s / r);
      return t > n * o + 1 ? "lazy" : "eager";
    }
    static encodeBitmapDataURL(t) {
      if (kt.has(t)) return kt.get(t);
      let e = t.split("#").map((n) => `#${n}`),
        s = document.createElement("canvas");
      s.width = 2, s.height = 2;
      let r = s.getContext("2d");
      if (!r) {
        console.error("context missing, cannot render colours");
        return;
      }
      return r.fillStyle = e[1],
        r.fillRect(0, 0, 1, 1),
        r.fillStyle = e[2],
        r.fillRect(1, 0, 1, 1),
        r.fillStyle = e[3],
        r.fillRect(0, 1, 1, 1),
        r.fillStyle = e[4],
        r.fillRect(1, 1, 1, 1),
        kt.set(t, s.toDataURL("image/png")),
        kt.get(t);
    }
  };
var P = class extends g {
  constructor() {
    super(...arguments);
    this.loading = "eager";
  }
  renderIcon() {
    return l`
    <svg class="photo-icon" height="40" width="40" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
    `;
  }
  hidePlaceholder(e) {
    this.broadcast("photo-loaded", { url: this.thumbnailUrl })();
    let s = e.target?.parentNode?.querySelector(".thumbnail-placeholder");
    s.style.zIndex = -1;
  }
  render() {
    if (!this.id) return l`<p>Missing photo ID</p>`;
    let e = this.id.startsWith("urn:") ? v(this.id).id : this.id,
      s = {
        id: e,
        imageUrl: this.imageUrl,
        thumbnailUrl: this.thumbnailUrl,
        thumbnailDataUrl: A.encodeBitmapDataURL(this.mosaicColours),
      },
      r = document.createElement("div");
    r.innerHTML = this.summary ?? "";
    let n = r.textContent ?? r.innerText ?? "";
    return l`
    <div class="photo">
      <a href="${"#/metadata/" + e}" onclick="event.preventDefault();">
        <div
          @click=${this.broadcast("click-photo-metadata", s)}
          class="photo-metadata-popover">${this.renderIcon()}</div>
      </a>

      <a href="${this.imageUrl}" target="_blank" rel="external">
        <img class="u-photo thumbnail-image thumbnail-placeholder" width="400" height="400" src="${s.thumbnailDataUrl}"/>

        <img
          @load=${this.hidePlaceholder.bind(this)} style="z-index: -1"
          class="thumbnail-image"
          alt=${n}
          title=${n}
          width="400"
          height="400"
          src="${this.thumbnailUrl}"
          loading="${this.loading}"/>
      </a>
    </div>
    `;
  }
};
m([u()], P.prototype, "id", 2),
  m([u()], P.prototype, "imageUrl", 2),
  m([u()], P.prototype, "thumbnailUrl", 2),
  m([u()], P.prototype, "mosaicColours", 2),
  m([u()], P.prototype, "summary", 2),
  m([u()], P.prototype, "loading", 2);
customElements.define("app-photo", P);
var E = class {
  static getElement() {
    return document.getElementById("rss");
  }
  static setIndex() {
    let t = this.getElement();
    if (!t) return;
    let e = "/manifest/atom/atom-index.xml";
    t.href = e;
  }
};
var Mt = class extends g {
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  allImages() {
    return this.triples.search({
      source: { type: "photo" },
      relation: { relation: ["thumbnail_url", "mosaic_colours", "full_image"] },
      target: { type: "unknown" },
    }).objects().sort((t, e) => e.created_at - t.created_at);
  }
  render() {
    let t = this.allImages();
    async function* e() {
      for (let s = 0; s < t.length; s++) {
        let r = t[s];
        s % 4 === 0 && await new Promise((n) => setTimeout(n, 0)),
          yield l`
          <app-photo
            id=${I(r.id).id}
            loading="${A.loadingMode(s)}"
            thumbnailUrl="${r.thumbnail_url}"
            mosaicColours="${r.mosaic_colours}"
            imageUrl="${r.full_image}"></app-photo>`;
      }
    }
    return l`
    <div>
      <section class="photos-metadata">
        <h1>Photos</h1>
        <p class="photo-album-count">${t.length} photos</p>
      </section>

      <section class="photo-container">
        ${X(e())}
      </section>
    </div>
    `;
  }
};
m([u({ state: !0 })], Mt.prototype, "triples", 2);
customElements.define("photos-page", Mt);
var Yt = class extends g {
  render() {
    let t = document.getElementById("stats-data");
    if (!t) return console.error("No stats data found"), l``;
    let e = JSON.parse(t.innerText);
    return l`
      <p class="photo-stats">${e.photos} <a href="#/photos">photos</a> ·
        ${e.albums} albums · ${e.years} years ·
        ${e.countries} <span title="well, roughly">countries</span> ·
        ${e.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${e.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        ${e.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `;
  }
};
customElements.define("photos-stats", Yt);
var Z = class {
  static parse(t) {
    let [e, s] = t.split(" ");
    return e = e.replace(/:/g, "-"), new Date(`${e} ${s}`);
  }
  static formatExifDate(t) {
    if (!t) return t;
    let e = new Date(t).toISOString(),
      [s, r] = e.split("T")[0].replace(/\:/g, "-");
    return `${s.replace(/\:/g, "/")} ${r}`;
  }
  static dateRange(t, e, s) {
    if (!t && !e) return "unknown date";
    let r = t instanceof Date ? t : new Date(parseFloat(t)),
      n = e instanceof Date ? e : new Date(parseFloat(e));
    if (s) {
      let o = { day: "numeric", month: "short" },
        c = r.toLocaleDateString("en-IE", o),
        a = n.toLocaleDateString("en-IE", o),
        h = r.toLocaleDateString("en-IE", { day: "numeric" }),
        p = n.toLocaleDateString("en-IE", { day: "numeric" }),
        d = r.toLocaleDateString("en-IE", { month: "short" }),
        f = n.toLocaleDateString("en-IE", { month: "short" }),
        $ = r.getFullYear(),
        S = n.getFullYear(),
        U = d === f,
        Bt = $ === S;
      return c === a
        ? `${c} ${$}`
        : U && Bt
        ? `${h} - ${p} ${f} ${$}`
        : `${c} ${$} - ${a} ${S}`;
    } else {
      let o = { year: "numeric", month: "short", day: "numeric" },
        c = r.toLocaleDateString("en-IE", o),
        a = n.toLocaleDateString("en-IE", o);
      return c === a ? c : `${c} \u2014 ${a}`;
    }
  }
};
var bs = window.envConfig,
  _ = class {
    static isUrnSource(t) {
      return w.isUrn(t[0]);
    }
    static hasRelation(t, e) {
      return t[1] === e;
    }
    static hasUrnTarget(t) {
      return w.isUrn(t[2]);
    }
    static getSource(t) {
      return t[0];
    }
    static getRelation(t) {
      return t[1];
    }
    static getTarget(t) {
      return t[2];
    }
  },
  w = class i {
    static isUrn(t) {
      return typeof t == "string" && t.startsWith("urn:r\xF3");
    }
    static parseUrn(t) {
      if (!i.isUrn(t)) throw new Error(`Invalid URN: ${t}`);
      let e = t.split(":")[2],
        [s, r] = t.split("?"),
        n = s.split(":")[3],
        o = r ? Object.fromEntries(new URLSearchParams(r)) : {};
      return { type: e, id: n, qs: o };
    }
    static is(t, e) {
      return i.isUrn(t) && i.parseUrn(t).type === e;
    }
    static toURL(t) {
      if (!i.isUrn(t)) throw new Error(`Invalid URN: ${t}`);
      let { type: e, id: s } = i.parseUrn(t);
      return `#/thing/${e}:${s}`;
    }
    static sameURN(t, e) {
      if (!i.isUrn(t) || !i.isUrn(e)) return !1;
      let s = i.parseUrn(t), r = i.parseUrn(e);
      return s.type === r.type && s.id === r.id;
    }
    static isRating(t) {
      return /^[⭐]{1,5}$/.test(t);
    }
    static hasId(t, e) {
      return i.isUrn(t) && i.parseUrn(t).id === e;
    }
    static sameType(t, e) {
      if (!i.isUrn(t) || !i.isUrn(e)) return !1;
      let s = i.parseUrn(t), r = i.parseUrn(e);
      return s.type === r.type;
    }
    static isType(t, e) {
      return i.isUrn(t) ? i.parseUrn(t).type === e : !1;
    }
  },
  G = class {
    static pretty(t) {
      let e = t.replace(/-/g, " ");
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
    static toCommonName(t, e) {
      return t.search({ source: { id: e }, relation: y.NAME }).firstTarget() ??
        e;
    }
    static birdwatchUrl(t, e) {
      let { id: s } = v(e);
      return t.search({ source: { id: s }, relation: y.BIRDWATCH_URL })
        .firstTarget();
    }
  },
  tt = class {
    static details(t, e) {
      let s = t.search({
          source: { type: "country" },
          relation: { relation: [y.NAME, y.FLAG] },
        }),
        r = s.search({ relation: y.NAME, target: { id: e } }).firstSource(),
        n = v(r),
        o = s.search({ source: n, relation: y.FLAG }).firstTarget();
      return { urn: r, name: e, flag: o };
    }
    static urnDetails(t, e) {
      let s = v(e),
        r = t.search({
          source: { type: "country", id: s.id },
          relation: y.NAME,
        }).firstTarget();
      return { urn: e, name: r };
    }
  };
function Be(i) {
  return _.getRelation(i) !== y.RATING ? [i] : [[
    _.getSource(i),
    _.getRelation(i),
    `urn:r\xF3:rating:${encodeURIComponent(_.getTarget(i))}`,
  ]];
}
function He(i) {
  if (_.getRelation(i) !== y.COUNTRY) return [i];
  let e = `urn:r\xF3:country:${_.getTarget(i).toLowerCase().replace(" ", "-")}`;
  return [[_.getSource(i), _.getRelation(i), e]];
}
var Ne = /^\[([^\:]*):(.*)\]$/;
function je(i, t) {
  if (typeof t != "string" || !Ne.test(t)) return t;
  let e = t.match(Ne);
  if (!e) return t;
  let s = e[1], r = e[2];
  return i[s] ? `${i[s]}${r}` : t;
}
function qe(i, t) {
  let [e, s, r] = t;
  return [[je(i, e), s, je(i, r)]];
}
function Ve(i) {
  for (
    let t of [
      "thumbnail_url",
      "full_image",
      "poster_url",
      "video_url_1080p",
      "video_url_480p",
      "video_url_720p",
      "video_url_unscaled",
    ]
  ) {
    if (_.getRelation(i) === t) {
      return [[_.getSource(i), t, `${bs.photos_url}${_.getTarget(i)}`]];
    }
  }
  return [i];
}
function Fe(i) {
  return _.getRelation(i) !== y.BIRDWATCH_URL ? [i] : [[
    _.getSource(i),
    y.BIRDWATCH_URL,
    `https://birdwatchireland.ie/birds/${_.getTarget(i)}`,
  ]];
}
function ze(i) {
  let [t, e, s] = i;
  return [[
    t.startsWith("::") ? `urn:r\xF3:${t.slice(2)}` : t,
    e,
    s.startsWith("::") ? `urn:r\xF3:${s.slice(2)}` : s,
  ]];
}
var L = class extends T {
  broadcast(t, e) {
    return () => {
      let s = new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 });
      this.dispatchEvent(s);
    };
  }
  static get properties() {
    return {
      title: { type: String },
      triples: { type: Object, state: !0 },
      url: { type: String },
      mosaicColours: { type: String },
      id: { type: String },
      loading: { type: String },
    };
  }
  hidePlaceholder(t) {
    this.broadcast("photo-loaded", { url: this.url })();
    let e = t.target.parentNode.querySelector(".thumbnail-placeholder");
    e.style.zIndex = -1;
  }
  renderLink() {
    return l`
    `;
  }
  renderPlaceholder() {
    let t = A.encodeBitmapDataURL(this.mosaicColours);
    return l`
    <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${t}"/>
    `;
  }
  renderImage() {
    let t = v(this.id);
    return l`
    <img @load=${
      this.hidePlaceholder.bind(this)
    } style="z-index: -1" class="u-photo thumbnail-image" width="400" height="400" src="${this.url}" alt="${this.title} - Photo Album Thumbnail" loading="${this.loading}"
      @click=${this.broadcast("click-album", { id: t.id, title: this.title })}>
    `;
  }
  render() {
    return performance.mark(`start-album-render-${this.url}`),
      l`
    <link rel="stylesheet" href="/dist/css/style.css">
    <div class="photo-album">
      <a href="${"/#/album/" + this.id}" onclick="event.preventDefault();">
        ${this.renderPlaceholder()}
        ${this.renderImage()}
      </a>
      <slot></slot>
    </div>`;
  }
};
m([u()], L.prototype, "id", 2),
  m([u()], L.prototype, "title", 2),
  m([u()], L.prototype, "triples", 2),
  m([u()], L.prototype, "url", 2),
  m([u()], L.prototype, "mosaicColours", 2),
  m([u()], L.prototype, "loading", 2);
var Jt = class extends g {
  static get properties() {
    return {
      title: { type: String },
      triples: { type: Object },
      minDate: { type: String },
      maxDate: { type: String },
      countries: { type: String },
      count: { type: Number },
    };
  }
  dateRange() {
    if (!this.minDate && !this.maxDate) return "unknown date";
    let t = window.matchMedia("(max-width: 500px)");
    return Z.dateRange(this.minDate, this.maxDate, t.matches);
  }
  renderCountries() {
    return this.countries.split(",").map((t) => {
      let { flag: e, urn: s } = tt.details(this.triples, t), r = v(s);
      return l`<a href="#/thing/country:${r.id}" title=${t}>${e}</a>`;
    });
  }
  render() {
    let t = this.count === 1 ? "photo" : "photos", e = this.renderCountries();
    return l`
    <div class="photo-album-metadata">
      <p class="photo-album-title">${this.title}</p>
      <p class="photo-album-date" data-min-date=${this.minDate}>
        <time>${this.dateRange()}</time>
      </p>
      <div class="photo-metadata-inline">
        <p class="photo-album-count">${this.count} ${t}</p>
        <p class="photo-album-countries">${e}</p>
      </div>
    </div>`;
  }
};
customElements.define("photo-album", L);
customElements.define("photo-album-metadata", Jt);
var Xt = class extends g {
  constructor() {
    super(),
      this._onScroll = this._onScroll.bind(this),
      this._clearCacheOnResize = this._clearCacheOnResize.bind(this),
      this.datesCache = [];
  }
  _onScroll() {
    let t = document.getElementById("year-cursor");
    if (window.scrollY < 200) {
      t && (t.style.display = "none");
      return;
    } else t && (t.style.display = "block");
    let e = this.getDates(), s, r = [];
    for (let a = 0; a < e.length; a++) {
      if (e[a].position.top > window.scrollY) {
        if (
          s || (s = e[a].position.top, r.push(e[a])), e[a].position.top === s
        ) r.push(e[a]);
        else break;
      }
    }
    let n = Math.min(...r.map((a) => a.minDate)),
      c = new Date(n).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    t && c !== "Invalid Date" && (t.textContent = c);
  }
  _clearCacheOnResize() {
    this.datesCache = [];
  }
  getDates() {
    if (this.datesCache.length > 0) return this.datesCache;
    let t = document.querySelectorAll(".photo-album-date"),
      e = Array.from(t).flatMap((s) => {
        let r = s.getAttribute("data-min-date");
        return r
          ? [{ position: s.getBoundingClientRect(), minDate: parseInt(r, 10) }]
          : [];
      });
    return this.datesCache = e, this.datesCache;
  }
  connectedCallback() {
    super.connectedCallback(),
      window.addEventListener("scroll", this._onScroll, { passive: !0 }),
      window.addEventListener("resize", this._clearCacheOnResize, {
        passive: !0,
      });
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this._onScroll),
      window.removeEventListener("scroll", this._clearCacheOnResize);
  }
  render() {
    return l`<div id="year-cursor"></div>`;
  }
};
customElements.define("year-cursor", Xt);
var Zt = class extends g {
  static get properties() {
    return { albums: { type: Object }, triples: { type: Object, state: !0 } };
  }
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  getAlbums() {
    return this.triples.search({ source: { type: "album" } }).objects().map(
      (t) => ({
        title: t.name,
        minDate: parseInt(t.min_date),
        maxDate: parseInt(t.max_date),
        url: t.thumbnail_url,
        mosaicColours: t.mosaic,
        id: t.id,
        count: t.photos_count,
        flags: t.flags,
      }),
    );
  }
  render() {
    performance.mark("start-albums-render");
    let t = this.getAlbums().sort((s, r) => r.maxDate - s.maxDate);
    async function* e() {
      let s = 2e3, r = new Date().getFullYear();
      for (let n = 0; n < t.length; n++) {
        let o = t[n],
          c = A.loadingMode(n),
          a = new Date(o.minDate).getFullYear();
        a !== s &&
        (s = a, a !== r && (yield l`<h2 class="album-year-heading">${a}</h2>`)),
          n % 4 === 0 && await new Promise((p) => setTimeout(p, 0));
        let h = l`
        <photo-album-metadata
          .triples=${this.triples}
            title="${o.title}"
            minDate="${o.minDate}"
            maxDate="${o.maxDate}"
            countries="${o.flags}"
            count="${o.count}"
        ></photo-album-metadata>`;
        yield l`
          <photo-album
            .triples=${this.triples}
            title="${o.title}"
            url="${o.url}"
            mosaicColours="${o.mosaicColours}"
            id="${o.id}"
            loading=${c}>
            ${h}
            </photo-album>
          `;
      }
    }
    return l`
    <section class="album-metadata">
      <h1 class="albums-header">Albums</h1>
      <photos-stats></photos-stats>
    </section>

    <year-cursor></year-cursor>

    <section class="album-container">
      ${X(e.bind(this)())}
    </section>
    `;
  }
};
customElements.define("albums-page", Zt);
var pt = class extends Y {
  constructor(t) {
    if (super(t), this.it = x, t.type !== J.CHILD) {
      throw Error(
        this.constructor.directiveName +
          "() can only be used in child bindings",
      );
    }
  }
  render(t) {
    if (t === x || t == null) return this._t = void 0, this.it = t;
    if (t === C) return t;
    if (typeof t != "string") {
      throw Error(
        this.constructor.directiveName + "() called with a non-string value",
      );
    }
    if (t === this.it) return this._t;
    this.it = t;
    let e = [t];
    return e.raw = e,
      this._t = {
        _$litType$: this.constructor.resultType,
        strings: e,
        values: [],
      };
  }
};
pt.directiveName = "unsafeHTML", pt.resultType = 1;
var Ot = W(pt);
var R = class extends g {
  static get properties() {
    return {
      id: { type: String },
      url: { type: String },
      preload: { type: String },
      url_poster: { type: String },
      url_unscaled: { type: String },
      url_1080p: { type: String },
      url_720p: { type: String },
      url_480p: { type: String },
    };
  }
  render() {
    return l`
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
    `;
  }
};
m([u()], R.prototype, "id", 2),
  m([u()], R.prototype, "url", 2),
  m([u()], R.prototype, "preload", 2),
  m([u()], R.prototype, "url_poster", 2),
  m([u()], R.prototype, "url_unscaled", 2),
  m([u()], R.prototype, "url_1080p", 2),
  m([u()], R.prototype, "url_720p", 2),
  m([u()], R.prototype, "url_480p", 2);
customElements.define("app-video", R);
var et = class extends g {
  async shareAlbum(t) {
    if (!navigator.share) console.error("navigator.share not available");
    else {
      this.sharing = !0;
      try {
        await navigator.share({
          title: `${this.title} - photos.rgrannell.xyz`,
          url: t,
        });
      } catch (e) {
        console.error("Error sharing:", e);
      } finally {
        this.sharing = !1;
      }
    }
  }
  render() {
    return this.sharing
      ? l`<button class="photo-share-button" disabled>[sharing...]</button>`
      : l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${
        this.shareAlbum.bind(this, this.url)
      }>[share]</button>
      `;
  }
};
m([u()], et.prototype, "title", 2),
  m([u()], et.prototype, "url", 2),
  m([u({ state: !0 })], et.prototype, "sharing", 2);
customElements.define("album-share-button", et);
var Pt = class extends g {
  getId() {
    return w.parseUrn(this.urn)?.id ?? "unknown";
  }
  url() {
    return this.getId()
      ? `https://whc.unesco.org/en/list/${this.getId()}`
      : null;
  }
  render() {
    return this.getId()
      ? l`
      <a class="unesco-link" href="${this.url()}" target="_blank" rel="noopener noreferrer">
        <span class="unesco-text-full">UNESCO World Heritage Site #${this.getId()}</span>
        <span class="unesco-text-short">UNESCO #${this.getId()}</span>
      </a>
    `
      : l`<span>Invalid UNESCO URN</span>`;
  }
};
m([u()], Pt.prototype, "urn", 2);
customElements.define("unesco-link", Pt);
var te = class extends g {
  static {
    this.properties = { urn: { type: String }, triples: { type: Object } };
  }
  name() {
    let { type: t, id: e } = w.parseUrn(this.urn);
    if (z.has(t)) return l`<span>${G.toCommonName(this.triples, e)}</span>`;
    let s = this.triples.search({
      source: w.parseUrn(this.urn),
      relation: y.NAME,
    }).firstTarget();
    return s ? l`<span>${s}</span>` : decodeURIComponent(e);
  }
  linkClass() {
    let { type: t } = w.parseUrn(this.urn);
    return {
      [b.BIRD]: "bird-link",
      [b.MAMMAL]: "mammal-link",
      [b.REPTILE]: "reptile-link",
      [b.AMPHIBIAN]: "amphibian-link",
      [b.FISH]: "fish-link",
      [b.INSECT]: "insect-link",
    }[t] ?? "";
  }
  render() {
    return w.isUrn(this.urn)
      ? l`
      <a class="thing-link ${this.linkClass()}" href="${
        w.toURL(this.urn)
      }">${this.name()}</a>
    `
      : l`<span>Invalid URN</span>`;
  }
};
customElements.define("thing-link", te);
var ee = class extends g {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String },
      minDate: { type: String },
      maxDate: { type: String },
      imageCount: { type: Number },
      description: { type: String },
      triples: { type: Object, state: !0 },
      countries: { type: String },
    };
  }
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  albumPhotos(t) {
    let e = t.search({
      source: { type: "photo" },
      relation: "album_id",
      target: { id: this.id },
    }).sources();
    return Array.from(e).flatMap((s) => {
      let r = t.search({ source: v(s) }).firstObject(!0);
      return r ? [r] : [];
    });
  }
  albumVideos(t) {
    let e = t.search({
      source: { type: "video" },
      relation: "album_id",
      target: { id: this.id },
    }).sources();
    return Array.from(e).flatMap((s) => {
      let r = t.search({ source: v(s) }).firstObject();
      return r ? [r] : [];
    });
  }
  renderPhotoCount() {
    return this.imageCount === 1
      ? `${this.imageCount} photo`
      : `${this.imageCount} photos`;
  }
  thingsLinks(t) {
    let e = {}, s = this.albumPhotos(t);
    for (let n of [b.UNESCO]) {
      e[n] = Array.from(
        new Set(
          s.flatMap((o) => o[y.LOCATION]?.filter((c) => w.is(c, n))).filter(
            (o) => o,
          ),
        ),
      );
    }
    for (
      let n of [b.BIRD, b.MAMMAL, b.REPTILE, b.FISH, b.AMPHIBIAN, b.INSECT]
    ) {
      e[n] = Array.from(
        new Set(
          s.flatMap((o) => o[y.SUBJECT]?.filter((c) => w.is(c, n))).filter(
            (o) => o,
          ),
        ),
      );
    }
    let r = [];
    r = r.concat(
      e[b.UNESCO].map((n) => l`<unesco-link urn="${n}"></unesco-link>`),
    );
    for (
      let n of [b.BIRD, b.MAMMAL, b.REPTILE, b.FISH, b.AMPHIBIAN, b.INSECT]
    ) {
      r = r.concat(
        e[n].map((o) =>
          l`<thing-link .urn="${o}" .triples="${this.triples}"></thing-link>`
        ),
      );
    }
    return r;
  }
  render() {
    let t = this.triples,
      e = window.matchMedia("(max-width: 500px)"),
      s = Z.dateRange(this.minDate, this.maxDate, e.matches),
      n = this.albumPhotos(t).map((a, h) =>
        l`
      <app-photo
        id=${a.id}
        summary=${a.summary}
        loading="${A.loadingMode(h)}"
        thumbnailUrl="${a.thumbnail_url}"
        mosaicColours="${a.mosaic_colours}"
        imageUrl="${a.full_image}"></app-photo>`
      ),
      o = this.albumVideos(t).map((a, h) =>
        l`<app-video
        id=${a.id}
        url_poster=${a.poster_url}
        url_unscaled=${a.video_url_unscaled}
        url_1080p=${a.video_url_1080p}
        url_720p=${a.video_url_720p}
        url_480p=${a.video_url_480p}
        ></app-video>`
      ),
      c = this?.countries.split(",").map((a) => {
        let { flag: h, urn: p } = tt.details(this.triples, a), d = v(p);
        return l`<span href="#/thing/country:${d.id}" title=${a}>${h}</span>`;
      });
    return l`
    <div>
      <section class="photos-metadata">
        <h1>${this.title}</h1>
        <p class="photo-album-date">
          <time>${s}</time>
        </p>
        <p class="photo-album-count">${this.renderPhotoCount()}</p>
        <p class="photo-album-countries">${c}</p>
        <p class="photo-album-description">${Ot(this.description)}
        </p>

        <album-share-button
          .title=${this.title}
          .url=${window.location.href}></album-share-button>
        <a href="#/albums">[albums]</a>

        <ul class="unesco-links">
          ${this.thingsLinks(t).map((a) => l`<li>${a}</li>`)}
        </ul>

      </section>

      <section class="photo-container">
        ${n}
      </section>

      <section class="video-container">
        ${o}
      </section>
    </div>
    `;
  }
};
customElements.define("album-page", ee);
var st = class extends g {
  async shareImage(t) {
    if (!navigator.share) console.error("navigator.share not available");
    else {
      this.sharing = !0;
      try {
        let e = await fetch(t), s = new URL(t).pathname;
        await navigator.share({
          title: s,
          files: [new File([await e.blob()], s, { type: this.format })],
        });
      } catch (e) {
        console.error("Error sharing:", e);
      } finally {
        this.sharing = !1;
      }
    }
  }
  render() {
    return this.sharing
      ? l`<button class="photo-share-button" disabled>[sharing...]</button>`
      : l`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${
        this.shareImage.bind(this, this.url)
      }>[share]</button>
      `;
  }
};
m([u()], st.prototype, "url", 2),
  m([u()], st.prototype, "format", 2),
  m([u({ state: !0 })], st.prototype, "sharing", 2);
customElements.define("share-metadata-button", st);
function rt(i) {
  return l`<th class="exif-heading">${i}</th>`;
}
var Q = class extends g {
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  renderAperture(t) {
    return t.f_stop === "Unknown"
      ? l`<td>Unknown</td>`
      : t.f_stop === "0.0"
      ? l`<td>Manual aperture control</td>`
      : t.f_stop
      ? l`<td>ƒ/${t.f_stop}</td>`
      : l`<td>Unknown</td>`;
  }
  renderFocalLength(t) {
    return t.focal_length === "Unknown"
      ? l`${t.focal_length}`
      : t.focal_length === "0"
      ? l`<td>Manual lens</td>`
      : t.focal_length
      ? l`<td>${t.focal_length}mm equiv.</td>`
      : l`<td>Unknown</td>`;
  }
  renderSemanticKey(t) {
    return t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
  }
  renderSemanticValue(t, e) {
    if (Array.isArray(e)) {
      return l`<ul class="thing-list">
        ${
        e.map((s) => l`<li>${this.renderSemanticValue.call(this, t, s)}</li>`)
      }
      </ul>`;
    }
    if (t.includes("binomial")) return l`<em>${e}</em>`;
    if (t.toLowerCase() === "summary") return l`${Ot(e ?? "")}`;
    if (w.isRating(e)) {
      let s = `urn:r\xF3:rating:${e}`;
      return l`<thing-link .triples=${this.triples} .urn="${s}"></thing-link>`;
    } else {
      if (w.isUrn(e) && w.is(e, b.UNESCO)) {
        return l`<unesco-link .urn="${e}"></unesco-link>`;
      }
      if (w.isUrn(e)) {
        return l`<thing-link .triples=${this.triples} .urn="${e}"></thing-link>`;
      }
    }
    return e;
  }
  isIgnoredKey(t) {
    return new Set(["bird_binomial", "wildlife", "living_conditions"]).has(t);
  }
  renderSemanticData(t) {
    return l`
      <h3>Photo Information</h3>
      <table class="metadata-table">
        ${
      t.sort((e, s) => _.getRelation(e).localeCompare(_.getRelation(s))).filter(
        (e) => !this.isIgnoredKey(_.getRelation(e)),
      ).map((e) =>
        l`
          <tr>
            <th class="exif-heading">${
          this.renderSemanticKey(_.getRelation(e))
        }</th>
              <td>${
          this.renderSemanticValue(_.getRelation(e), _.getTarget(e))
        }</td>
          `
      )
    }
      <table>
    `;
  }
  renderModel(t) {
    return typeof t.model == "string"
      ? l`
      ${rt("Camera Model")}
      <td><thing-link .triples=${this.triples} .urn=${t.model}></thing-link></td>`
      : l`
      ${rt("Camera Model")}
      <td>Unknown</td>
    `;
  }
  renderDimensions(t) {
    return typeof t.width == "number" && typeof t.height == "number"
      ? l`
        ${rt("Dimensions")}
        <td>${t.width} x ${t.height}</td>`
      : l`
      ${rt("Dimensions")}
      <td>Unknown</td>
    `;
  }
  renderShutterSpeed(t) {
    return typeof t.shutter_speed == "number"
      ? l`
        ${rt("Shutter Speed")}
        <td>1/${Math.round(1 / t.shutter_speed)}</td>`
      : l`
      ${rt("Shutter Speed")}
      <td>Unknown</td>
    `;
  }
  renderExif(t) {
    let e = t.search({ source: { type: "photo", id: this.id }, relation: {} })
      .firstObject();
    if (!e) return l`<p>No EXIF data available</p>`;
    let s = new Date(parseInt(e.created_at)),
      r = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
      n = s.toLocaleDateString("en-US", r);
    return l`
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
        <td>${e.iso ?? "Unknown"}</td>
      </tr>
    </table>
    `;
  }
  render() {
    let t = this.image,
      e = t.album_id,
      s = this.triples,
      r = s.search({
        source: { id: v(t.id).id },
        relation: {
          predicate: (n) => {
            let o = new Set([
              "album_id",
              "full_image",
              "mosaic_colours",
              "thumbnail_url",
            ]);
            return !Te.has(n) && !o.has(n);
          },
        },
      }).triples();
    return l`
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
    `;
  }
};
m([u()], Q.prototype, "id", 2),
  m([u()], Q.prototype, "image", 2),
  m([u({ state: !0 })], Q.prototype, "sharing", 2),
  m([u({ state: !0 })], Q.prototype, "triples", 2);
customElements.define("metadata-page", Q);
var se = class extends g {
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  render() {
    return l`
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
    `;
  }
};
customElements.define("about-page", se);
var ut = class extends g {
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  isValidImage(t) {
    return t && t.thumbnail_url;
  }
  urnImages(t, e) {
    let r = t.search(e).sources();
    return Array.from(r).flatMap((n) => {
      if (n.startsWith("urn:r\xF3")) {
        let c = t.search({ source: I(n) }).firstObject();
        return this.isValidImage(c) ? [c] : [];
      }
      let o = t.search({ source: { id: n, type: "photo" } }).firstObject();
      return this.isValidImage(o) ? [o] : [];
    });
  }
  renderSubjectPhotos(t) {
    return t.sort((e, s) => s.created_at - e.created_at).map((e, s) =>
      l`
      <app-photo
        id=${e.id.startsWith("urn:") ? v(e.id).id : e.id}
        loading="${A.loadingMode(s)}"
        thumbnailUrl="${e.thumbnail_url}"
        mosaicColours="${e.mosaic_colours}"
        imageUrl="${e.full_image}"></app-photo>`
    );
  }
  getAlbums() {
    return this.triples.search({ source: { type: "album" } }).objects();
  }
  renderSubjectAlbums(t, e) {
    let s = this.urnImages(t, e), r = new Set(s.map((n) => n.album_id));
    return Array.from(r).flatMap((n) =>
      this.getAlbums().filter((o) => v(o.id).id === n)
    ).sort((n, o) => o.min_date - n.min_date).map((n) => {
      let o = l`
        <photo-album-metadata slot="metadata"
            .triples=${this.triples}
            title="${n.name}"
            count="${n.photos_count}"
            minDate="${n.min_date}"
            maxDate="${n.max_date}"
            countries="${n.flags}"
        ></photo-album-metadata>`;
      return l`
          <photo-album
            .triples=${this.triples}
            title="${n.name}"
            url="${n.thumbnail_url}"
            mosaicColours="${n.mosaic}"
            id="${n.id}"
            loading="eager">
      ${o}
          </photo-album>
      `;
    });
  }
  firstPhotographed(t, e, s) {
    let n = this.urnImages(e, s).sort((o, c) => o.created_at - c.created_at)[0];
    return n
      ? new Date(parseInt(n.created_at)).toLocaleDateString("en-IE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      : "Unknown";
  }
  renderTitle() {
    let { id: t, type: e } = w.parseUrn(this.urn),
      s = this.triples.search({ source: { id: t, type: e }, relation: y.NAME })
        .firstTarget();
    if (s) return s;
    try {
      let r = w.parseUrn(this.urn), n = decodeURIComponent(r.id);
      return r.id === "*"
        ? `${r.type.charAt(0).toUpperCase()}${r.type.slice(1)}`
        : z.has(r.type)
        ? G.toCommonName(this.triples, n)
        : n;
    } catch {
      return this.urn;
    }
  }
  renderClassification(t) {
    return l`<a href="#/thing/${t}:*">${t.charAt(0).toUpperCase()}${
      t.slice(1)
    }</a>`;
  }
  getPhotoQueries(t) {
    let e = t;
    e.id === "*" && delete e.id;
    let s = [];
    if (z.has(t.type)) {
      for (let r of ["captivity", "wild"]) {
        let o = { ...t, qs: { context: r } };
        s.push({ label: r, query: { target: o } });
      }
    } else {s.push({
        label: "default",
        query: { source: { type: "photo" }, target: t },
      });}
    return s;
  }
  renderPhotoSection(t) {
    return l`<div>
    ${
      Object.entries(t).flatMap(([e, s]) =>
        s
          ? s.length === 0 ? [] : e === "default"
            ? [l`
        <div class="photo-group">
          ${s}
        </div>
        `]
            : [l`
        <div class="photo-group">
          <h4>${e.charAt(0).toUpperCase() + e.slice(1)}</h4>
          ${s}
        </div>
      `]
          : []
      )
    }
    <div/>`;
  }
  render() {
    let t = this.triples,
      e = t.search({ source: { type: "photo" } }).objects(),
      s = w.parseUrn(this.urn),
      r = s.type,
      n = t.search({ source: I(this.urn) }).firstObject() ?? {},
      o = Object.assign({ Classification: this.renderClassification(r) });
    if (
      n.country &&
      (o.Country =
        l`<thing-link .triples=${this.triples} urn=${n.country}></thing-link>`),
        n.fcode_name
    ) {
      let N = n.fcode_name;
      o["Place Type"] = l`${N.charAt(0).toUpperCase()}${N.slice(1)}`;
    }
    z.has(r) &&
      (o["First Photographed"] = l`<span>${
        this.firstPhotographed(e, t, { target: I(this.urn) })
      }</span>`);
    let c = n[y.WIKIPEDIA],
      a = n[y.BIRDWATCH_URL],
      h = n[y.LONGITUDE],
      p = n[y.LATITUDE],
      d;
    if (h && p) {
      let N = `https://www.google.com/maps?q=${p},${h}`;
      d = l`
      <a href="${N}" target="_blank" rel="noopener">[maps]</a>
      `;
    }
    let f = I(this.urn);
    f.id === "*" && delete f.id;
    let $ = this.getPhotoQueries(I(this.urn)), S = {};
    for (let { query: N, label: Ht } of $) {
      let Ge = this.urnImages(t, N);
      S[Ht] = this.renderSubjectPhotos(Ge);
    }
    let U = { source: { type: "photo" }, target: f },
      Bt = this.renderSubjectAlbums(t, U),
      We = this.renderPhotoSection(S);
    return l`
      <div>
      <section class="thing-page">
        <h1>${this.renderTitle()}</h1>

        <p>
          ${
      z.has(r) && s.id !== "*"
        ? l`<span class="thing-binomial">(${G.pretty(s.id)})</span>`
        : l``
    }
        </p>
        <br>

        ${
      c ? l`<a href="${c}" target="_blank" rel="noopener">[wikipedia]</a>` : l``
    }
        ${
      a ? l`<a href="${a}" target="_blank" rel="noopener">[birdwatch]</a>` : l``
    }
        ${d ? l`<span class="location">${d}</span>` : l``}

        <h3>Metadata</h3>
        <table class="metadata-table">
        ${
      Object.entries(o).map(([N, Ht]) =>
        l`
          <tr>
            <th class="exif-heading">${N}</th>
            <td>${Ht}</td>
          </tr>
          `
      )
    }
        </table>

        <br>
        ${We}

        <h3>Albums</h3>

        </section>

        <section class="album-container">
          ${Bt}
        </section>

      </div>
    `;
  }
};
m([u()], ut.prototype, "urn", 2),
  m([u({ state: !0 })], ut.prototype, "triples", 2);
customElements.define("thing-page", ut);
var Lt = class {
  static loadingMode(t) {
    return t === 0 ? "auto" : "none";
  }
};
var Nt = class extends g {
  connectedCallback() {
    super.connectedCallback(), E.setIndex();
  }
  getVideos() {
    return this.triples.search({ source: { type: "video" } }).objects();
  }
  render() {
    let t = this.getVideos();
    async function* e() {
      for (let s = 0; s < t.length; s++) {
        let r = t[s];
        s % 4 === 0 && await new Promise((n) => setTimeout(n, 0)),
          yield l`<app-video
          id=${r.id}
          url_poster=${r.poster_url}
          url_unscaled=${r.video_url_unscaled}
          url_1080p=${r.video_url_1080p}
          url_720p=${r.video_url_720p}
          url_480p=${r.video_url_480p}
          preload="${Lt.loadingMode(s)}"
        ></app-video>`;
      }
    }
    return l`
    <div>
      <section class="photos-metadata">
        <h1>Videos</h1>
        <p class="photo-album-count">${t.length} videos</p>
      </section>

      <section class="photo-container">
        ${X(e())}
      </section>
    </div>
    `;
  }
};
m([u({ state: !0 })], Nt.prototype, "triples", 2);
customElements.define("videos-page", Nt);
var jt = class {
    static getDistinctThings(t, e) {
      return t.search({ source: { type: e }, relation: "name" }).objects().sort(
        (r, n) => r.name.localeCompare(n.name),
      );
    }
    static chooseBestImage(t, e, s) {
      let n = t.search({ source: { type: "photo" }, target: I(s) }).sources(),
        c = Array.from(n).map((a) => {
          let h = t.search({ source: I(a), relation: "rating" }),
            p = Array.from(h.targets()).map((d) =>
              decodeURIComponent(I(d).id).length
            );
          return { photo: a, rating: Math.max(...p) };
        }).sort((a, h) => h.rating - a.rating)[0];
      return c || console.error("No photo found for", e, s), c?.photo;
    }
  },
  re = class extends g {
    static get properties() {
      return {
        triples: { type: Object, state: !0 },
        url: { type: String },
        id: { type: String },
        mosaicColours: { type: String },
        count: { type: Number },
        loading: { type: String },
      };
    }
    render() {
      let t = A.encodeBitmapDataURL(this.mosaicColours);
      return l`
    <div class="photo-album">
        <img class="thumbnail-image thumbnail-placeholder" width="400" height="400" src="${this.url}" src="${t}"/>
    </div>
    `;
    }
  };
customElements.define("thing-album", re);
var ie = class extends g {
  static get properties() {
    return { id: { type: String }, triples: { type: Object, state: !0 } };
  }
  renderMetadata(t, e, s) {
    let r = this.triples.search({ source: I(e) }).firstObject();
    return l`
      <div>
        <p>${s}</p>
        ${
      r.wikipedia ? l`<span><a href="${r.wikipedia}">[wiki]</a></span>` : ""
    }

        ${
      r.birdwatch_url
        ? l`<span><a href="${r.birdwatch_url}">[birdwatch]</a></span>`
        : ""
    }
      </div>
    `;
  }
  renderThingAlbum(t, e, s, r) {
    let n = jt.chooseBestImage(this.triples, t, e),
      o = this.triples.search({ source: I(n) }).firstObject();
    return l`
          <photo-album
            .triples=${this.triples}
            title="${"no such thing exists"}"
            url="${o.thumbnail_url}"
            mosaicColours="${o.mosaic_colours}"
            id="${"urn:r\xF3:album:fake"}"
            loading=${A.loadingMode(r)}>
          ${this.renderMetadata(t, e, s)}
            </photo-album>

    `;
  }
  render() {
    let t = this.triples;
    this.id = "bird";
    let e = jt.getDistinctThings(t, this.id);
    return l`

    <section class="album-container">
      <h1>${this.id.charAt(0).toUpperCase() + this.id.slice(1)}s</h1>
      <br>

      <a href="/#thing/${this.id}:*">See all ${this.id} photos</a>

      ${e.map((s, r) => this.renderThingAlbum(this.id, s.id, s.name, r))}
    </section>
    `;
  }
};
customElements.define("listing-page", ie);
function ys(i, t) {
  let e = [ze, Be, He, Ve, Fe, qe.bind(null, i)], s = [t];
  for (let r of e) s = s.flatMap(r);
  return s;
}
var _s = new At(),
  ne = class i extends g {
    static {
      this.DEFAULT_PAGE = "albums";
    }
    static get properties() {
      return {
        title: { type: String },
        page: { type: String },
        sidebarVisible: { type: Boolean, state: !0 },
        id: { type: String },
        imageUrl: { type: String },
        thumbnailUrl: { type: String },
        route: { type: String },
        params: { type: Object },
        query: { type: Object },
        darkMode: { type: Boolean },
        tribbleDB: { type: Object, state: !0, attribute: !1 },
      };
    }
    connectedCallback() {
      super.connectedCallback(),
        this.setStateFromUrl(),
        this.requestUpdate(),
        this._onPopState = this.handlePopState.bind(this),
        this.sidebarVisible = !1,
        window.addEventListener("popstate", this._onPopState),
        (async () => {
          let t = [];
          this.tribbleDB || (this.tribbleDB = new Ee([]));
          let e = {
            i: "urn:r\xF3:",
            birdwatch: "https://birdwatchireland.ie/birds/",
            photos: "https://photos-cdn.rgrannell.xyz/",
            wiki: "https://en.wikipedia.org/wiki/",
          };
          for await (let s of _s.stream()) {
            t.push(...[s].flatMap(ys.bind(null, e))),
              t.length > 500 &&
              (this.tribbleDB.add(t),
                this.tribbleDB = this.tribbleDB,
                t.length = 0,
                this.requestUpdate());
          }
          this.tribbleDB.add(t),
            this.tribbleDB = this.tribbleDB.clone(),
            this.requestUpdate();
        })();
    }
    disconnectedCallback() {
      super.disconnectedCallback(),
        window.removeEventListener("popstate", this._onPopState);
    }
    handlePopState() {
      this.setStateFromUrl(), this.requestUpdate();
    }
    setStateFromUrl() {
      let t = D.getUrl();
      D.isPage(t?.type)
        ? this.page = t.type
        : (console.error("did not match pagetype", t?.type),
          this.page = i.DEFAULT_PAGE),
        D.pageUsesId(this.page) && (this.id = t.id);
    }
    receiveClickAlbum(t) {
      let { title: e, id: s } = t.detail;
      this.page = "photos", this.id = s, this.title = e, D.showAlbumUrl(s);
    }
    async receiveClickBurgerMenu() {
      this.sidebarVisible = !this.sidebarVisible;
    }
    async receiveClickPhotoMetadata(t) {
      let { id: e, imageUrl: s, thumbnailUrl: r } = t.detail;
      this.page = "metadata",
        this.id = e,
        this.imageUrl = s,
        this.thumbnailUrl = r,
        D.showMetadataUrl(e);
    }
    receiveSwitchTheme(t) {
      this.darkMode = !this.darkMode,
        localStorage.setItem("darkMode", this.darkMode.toString()),
        this.requestUpdate();
    }
    receiveNavigatePage(t) {
      this.page = t.detail.page, this.sidebarVisible = !1;
      let e = D.router(this.page);
      e || console.error(`no router found for page ${this.page}`),
        D.pageUsesId(this.page) ? e(this.id) : e();
    }
    pageClasses(t) {
      let e = ["page"];
      return t && e.push("sidebar-visible"), e.join(" ");
    }
    renderPage(t) {
      let e = this.pageClasses(t);
      if (!this.page || this.page === "albums") {
        return l`
      <albums-page .triples=${this.tribbleDB} class="${e}"></albums-page>
      `;
      }
      if (this.page === "about") {
        return l`<about-page class="${e}"></about-page>`;
      }
      if (this.page === "photos") {
        return l`<photos-page .triples=${this.tribbleDB} class="${e}"></photos-page>`;
      }
      if (this.page === "album") {
        this.id || console.error("no album id provided");
        let s = this.tribbleDB.search({
          source: { type: "album", id: this.id },
        }).firstObject();
        return s || console.error(`failed to find album with id ${this.id}`),
          l`
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
      `;
      }
      if (this.page === "metadata") {
        let s = this.tribbleDB.search({
          source: { type: "photo", id: this.id },
        }).firstObject();
        return s || console.error(`failed to find photo with id ${this.id}`),
          l`
      <metadata-page
        .triples=${this.tribbleDB}
        .image=${s}
        id=${this.id} class="${e}"></metadata-page>
      `;
      }
      if (this.page === "videos") {
        return l`
      <videos-page .triples=${this.tribbleDB} class="${e}"></videos-page>
      `;
      }
      if (this.page === "thing") {
        return l`
      <thing-page
        .urn=${"urn:r\xF3:" + this.id}
        .triples=${this.tribbleDB}
        class="${e}"></thing-page>
      `;
      }
      if (this.page === "listing") {
        return l`
      <listing-page id=${this.id} .triples=${this.tribbleDB} class="${e}"></listing-page>
      `;
      }
    }
    loadDarkMode() {
      return typeof this.darkMode < "u"
        ? this.darkMode
        : localStorage.getItem("darkMode") === "true";
    }
    render() {
      let t = ["app-container"];
      this.sidebarVisible && t.push("sidebar-visible");
      let e = document.documentElement, s = ["photos-app"];
      return this.darkMode
        ? (e.classList.add("dark-mode"), s.push("dark-mode"))
        : e.classList = [],
        l`
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
    `;
    }
  };
customElements.define("photo-app", ne);
export { ne as PhotoApp };
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/async-directive.js:
lit-html/directives/async-replace.js:
lit-html/directives/async-append.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=app.js.map
