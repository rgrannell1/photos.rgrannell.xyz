var To = Object.create;
var Kr = Object.defineProperty;
var Io = Object.getOwnPropertyDescriptor;
var Eo = Object.getOwnPropertyNames;
var So = Object.getPrototypeOf, Do = Object.prototype.hasOwnProperty;
var F = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var Po = (t, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function") {
    for (let i of Eo(e)) {
      !Do.call(t, i) && i !== r && Kr(t, i, {
        get: () => e[i],
        enumerable: !(n = Io(e, i)) || n.enumerable,
      });
    }
  }
  return t;
};
var L = (
  t,
  e,
  r,
) => (r = t != null ? To(So(t)) : {},
  Po(
    e || !t || !t.__esModule
      ? Kr(r, "default", { value: t, enumerable: !0 })
      : r,
    t,
  ));
var Te = F((Ma, Zr) => {
  "use strict";
  function Re(t, e, r, n, i, s) {
    return {
      tag: t,
      key: e,
      attrs: r,
      children: n,
      text: i,
      dom: s,
      is: void 0,
      domSize: void 0,
      state: void 0,
      events: void 0,
      instance: void 0,
    };
  }
  Re.normalize = function (t) {
    return Array.isArray(t)
      ? Re("[", void 0, void 0, Re.normalizeChildren(t), void 0, void 0)
      : t == null || typeof t == "boolean"
      ? null
      : typeof t == "object"
      ? t
      : Re("#", void 0, void 0, String(t), void 0, void 0);
  };
  Re.normalizeChildren = function (t) {
    for (var e = new Array(t.length), r = 0, n = 0; n < t.length; n++) {
      e[n] = Re.normalize(t[n]), e[n] !== null && e[n].key != null && r++;
    }
    if (r !== 0 && r !== t.length) {
      throw new TypeError(
        e.includes(null)
          ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
          : "In fragments, vnodes must either all have keys or none have keys.",
      );
    }
    return e;
  };
  Zr.exports = Re;
});
var Yt = F((Ca, en) => {
  "use strict";
  var _o = Te();
  en.exports = function (t, e) {
    return t == null ||
        typeof t == "object" && t.tag == null && !Array.isArray(t)
      ? e.length === 1 && Array.isArray(e[0]) && (e = e[0])
      : (e = e.length === 0 && Array.isArray(t) ? t : [t, ...e], t = void 0),
      _o("", t && t.key, t, e);
  };
});
var ft = F((Ra, tn) => {
  "use strict";
  tn.exports = {}.hasOwnProperty;
});
var Kt = F((ja, rn) => {
  "use strict";
  rn.exports = {};
});
var Zt = F((Ua, nn) => {
  "use strict";
  var Lo = Kt();
  nn.exports = new Map([[Lo, !0]]);
});
var tr = F(($a, un) => {
  "use strict";
  var Oo = Te(),
    Mo = Yt(),
    er = ft(),
    sn = Kt(),
    Co = Zt(),
    Ro =
      /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
    on = Object.create(null);
  function jo(t) {
    for (var e in t) if (er.call(t, e)) return !1;
    return !0;
  }
  function Uo(t) {
    return t === "value" || t === "checked" || t === "selectedIndex" ||
      t === "selected";
  }
  function $o(t) {
    for (var e, r = "div", n = [], i = {}, s = !0; e = Ro.exec(t);) {
      var a = e[1], p = e[2];
      if (a === "" && p !== "") r = p;
      else if (a === "#") i.id = p;
      else if (a === ".") n.push(p);
      else if (e[3][0] === "[") {
        var f = e[6];
        f && (f = f.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")),
          e[4] === "class"
            ? n.push(f)
            : (i[e[4]] = f === "" ? f : f || !0, Uo(e[4]) && (s = !1));
      }
    }
    return n.length > 0 && (i.className = n.join(" ")),
      jo(i) ? i = sn : Co.set(i, s),
      on[t] = { tag: r, attrs: i, is: i.is };
  }
  function No(t, e) {
    e.tag = t.tag;
    var r = e.attrs;
    if (r == null) return e.attrs = t.attrs, e.is = t.is, e;
    if (
      er.call(r, "class") &&
      (r.class != null && (r.className = r.class), r.class = null),
        t.attrs !== sn
    ) {
      var n = r.className;
      r = Object.assign({}, t.attrs, r),
        t.attrs.className != null &&
        (r.className = n != null
          ? String(t.attrs.className) + " " + String(n)
          : t.attrs.className);
    }
    return t.tag === "input" && er.call(r, "type") &&
      (r = Object.assign({ type: r.type }, r)),
      e.is = r.is,
      e.attrs = r,
      e;
  }
  function Vo(t, e, ...r) {
    if (
      t == null ||
      typeof t != "string" && typeof t != "function" &&
        typeof t.view != "function"
    ) throw Error("The selector must be either a string or a component.");
    var n = Mo(e, r);
    return typeof t == "string" &&
        (n.children = Oo.normalizeChildren(n.children), t !== "[")
      ? No(on[t] || $o(t), n)
      : (n.attrs == null && (n.attrs = {}), n.tag = t, n);
  }
  un.exports = Vo;
});
var ln = F((Na, an) => {
  "use strict";
  var qo = Te();
  an.exports = function (t) {
    return t == null && (t = ""), qo("<", void 0, void 0, t, void 0, void 0);
  };
});
var pn = F((Va, cn) => {
  "use strict";
  var Bo = Te(), zo = Yt();
  cn.exports = function (t, ...e) {
    var r = zo(t, e);
    return r.attrs == null && (r.attrs = {}),
      r.tag = "[",
      r.children = Bo.normalizeChildren(r.children),
      r;
  };
});
var mn = F((qa, fn) => {
  "use strict";
  var rr = tr();
  rr.trust = ln();
  rr.fragment = pn();
  fn.exports = rr;
});
var nr = F((Ba, hn) => {
  "use strict";
  hn.exports = new WeakMap();
});
var ir = F((za, dn) => {
  "use strict";
  var yn = nr();
  function* Fo(t) {
    var e = t.dom, r = t.domSize, n = yn.get(e);
    if (e != null) {
      do {
        var i = e.nextSibling;
        yn.get(e) === n && (yield e, r--), e = i;
      } while (r);
    }
  }
  dn.exports = Fo;
});
var bn = F((Fa, vn) => {
  "use strict";
  var sr = Te(), Ho = nr(), or = ir(), gn = Zt();
  vn.exports = function () {
    var t = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML",
      },
      e,
      r;
    function n(u) {
      return u.ownerDocument;
    }
    function i(u) {
      return u.attrs && u.attrs.xmlns || t[u.tag];
    }
    function s(u, o) {
      if (u.state !== o) throw new Error("'vnode.state' must not be modified.");
    }
    function a(u) {
      var o = u.state;
      try {
        return this.apply(o, arguments);
      } finally {
        s(u, o);
      }
    }
    function p(u) {
      try {
        return n(u).activeElement;
      } catch {
        return null;
      }
    }
    function f(u, o, c, m, h, g, U) {
      for (var V = c; V < m; V++) {
        var k = o[V];
        k != null && y(u, k, h, U, g);
      }
    }
    function y(u, o, c, m, h) {
      var g = o.tag;
      if (typeof g == "string") {
        switch (o.state = {}, o.attrs != null && zt(o.attrs, o, c), g) {
          case "#":
            v(u, o, h);
            break;
          case "<":
            I(u, o, m, h);
            break;
          case "[":
            w(u, o, c, m, h);
            break;
          default:
            $(u, o, c, m, h);
        }
      } else W(u, o, c, m, h);
    }
    function v(u, o, c) {
      o.dom = n(u).createTextNode(o.children), de(u, o.dom, c);
    }
    var b = {
      caption: "table",
      thead: "table",
      tbody: "table",
      tfoot: "table",
      tr: "tbody",
      th: "tr",
      td: "tr",
      colgroup: "table",
      col: "colgroup",
    };
    function I(u, o, c, m) {
      var h = o.children.match(/^\s*?<(\w+)/im) || [],
        g = n(u).createElement(b[h[1]] || "div");
      c === "http://www.w3.org/2000/svg"
        ? (g.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' +
          o.children + "</svg>",
          g = g.firstChild)
        : g.innerHTML = o.children,
        o.dom = g.firstChild,
        o.domSize = g.childNodes.length;
      for (var U = n(u).createDocumentFragment(), V; V = g.firstChild;) {
        U.appendChild(V);
      }
      de(u, U, m);
    }
    function w(u, o, c, m, h) {
      var g = n(u).createDocumentFragment();
      if (o.children != null) {
        var U = o.children;
        f(g, U, 0, U.length, c, null, m);
      }
      o.dom = g.firstChild, o.domSize = g.childNodes.length, de(u, g, h);
    }
    function $(u, o, c, m, h) {
      var g = o.tag, U = o.attrs, V = o.is;
      m = i(o) || m;
      var k = m
        ? V ? n(u).createElementNS(m, g, { is: V }) : n(u).createElementNS(m, g)
        : V
        ? n(u).createElement(g, { is: V })
        : n(u).createElement(g);
      if (
        o.dom = k,
          U != null && go(o, U, m),
          de(u, k, h),
          !zr(o) && o.children != null
      ) {
        var q = o.children;
        f(k, q, 0, q.length, c, null, m),
          o.tag === "select" && U != null && bo(o, U);
      }
    }
    function ie(u, o) {
      var c;
      if (typeof u.tag.view == "function") {
        if (
          u.state = Object.create(u.tag),
            c = u.state.view,
            c.$$reentrantLock$$ != null
        ) return;
        c.$$reentrantLock$$ = !0;
      } else {
        if (u.state = void 0, c = u.tag, c.$$reentrantLock$$ != null) return;
        c.$$reentrantLock$$ = !0,
          u.state =
            u.tag.prototype != null && typeof u.tag.prototype.view == "function"
              ? new u.tag(u)
              : u.tag(u);
      }
      if (
        zt(u.state, u, o),
          u.attrs != null && zt(u.attrs, u, o),
          u.instance = sr.normalize(a.call(u.state.view, u)),
          u.instance === u
      ) throw Error("A view cannot return the vnode it received as argument");
      c.$$reentrantLock$$ = null;
    }
    function W(u, o, c, m, h) {
      ie(o, c),
        o.instance != null
          ? (y(u, o.instance, c, m, h),
            o.dom = o.instance.dom,
            o.domSize = o.instance.domSize)
          : o.domSize = 0;
    }
    function ee(u, o, c, m, h, g) {
      if (!(o === c || o == null && c == null)) {
        if (o == null || o.length === 0) {
          f(u, c, 0, c.length, m, h, g);
        } else if (c == null || c.length === 0) et(u, o, 0, o.length);
        else {
          var U = o[0] != null && o[0].key != null,
            V = c[0] != null && c[0].key != null,
            k = 0,
            q = 0;
          if (!U) { for (; q < o.length && o[q] == null;) q++; }
          if (!V) { for (; k < c.length && c[k] == null;) k++; }
          if (U !== V) et(u, o, q, o.length), f(u, c, k, c.length, m, h, g);
          else if (V) {
            for (
              var oe = o.length - 1, Z = c.length - 1, pt, ue, J, se, G, Gt;
              oe >= q && Z >= k && (se = o[oe], G = c[Z], se.key === G.key);
            ) {
              se !== G && R(u, se, G, m, h, g),
                G.dom != null && (h = G.dom),
                oe--,
                Z--;
            }
            for (
              ;
              oe >= q && Z >= k && (ue = o[q], J = c[k], ue.key === J.key);
            ) q++, k++, ue !== J && R(u, ue, J, m, te(o, q, h), g);
            for (
              ;
              oe >= q && Z >= k &&
              !(k === Z || ue.key !== G.key || se.key !== J.key);
            ) {
              Gt = te(o, q, h),
                Se(u, se, Gt),
                se !== J && R(u, se, J, m, Gt, g),
                ++k <= --Z && Se(u, ue, h),
                ue !== G && R(u, ue, G, m, h, g),
                G.dom != null && (h = G.dom),
                q++,
                oe--,
                se = o[oe],
                G = c[Z],
                ue = o[q],
                J = c[k];
            }
            for (; oe >= q && Z >= k && se.key === G.key;) {
              se !== G && R(u, se, G, m, h, g),
                G.dom != null && (h = G.dom),
                oe--,
                Z--,
                se = o[oe],
                G = c[Z];
            }
            if (k > Z) et(u, o, q, oe + 1);
            else if (q > oe) f(u, c, k, Z + 1, m, h, g);
            else {
              var ko = h,
                Yr = Z - k + 1,
                rt = new Array(Yr),
                Wt = 0,
                X = 0,
                Xt = 2147483647,
                Jt = 0,
                pt,
                Qt;
              for (X = 0; X < Yr; X++) rt[X] = -1;
              for (X = Z; X >= k; X--) {
                pt == null && (pt = M(o, q, oe + 1)), G = c[X];
                var He = pt[G.key];
                He != null &&
                  (Xt = He < Xt ? He : -1,
                    rt[X - k] = He,
                    se = o[He],
                    o[He] = null,
                    se !== G && R(u, se, G, m, h, g),
                    G.dom != null && (h = G.dom),
                    Jt++);
              }
              if (h = ko, Jt !== oe - q + 1 && et(u, o, q, oe + 1), Jt === 0) {
                f(u, c, k, Z + 1, m, h, g);
              } else if (Xt === -1) {
                for (Qt = K(rt), Wt = Qt.length - 1, X = Z; X >= k; X--) {
                  J = c[X],
                    rt[X - k] === -1
                      ? y(u, J, m, g, h)
                      : Qt[Wt] === X - k
                      ? Wt--
                      : Se(u, J, h),
                    J.dom != null && (h = c[X].dom);
                }
              } else {for (X = Z; X >= k; X--) {
                  J = c[X],
                    rt[X - k] === -1 && y(u, J, m, g, h),
                    J.dom != null && (h = c[X].dom);
                }}
            }
          } else {
            var Ht = o.length < c.length ? o.length : c.length;
            for (k = k < q ? k : q; k < Ht; k++) {
              ue = o[k],
                J = c[k],
                !(ue === J || ue == null && J == null) && (ue == null
                  ? y(u, J, m, g, te(o, k + 1, h))
                  : J == null
                  ? ct(u, ue)
                  : R(u, ue, J, m, te(o, k + 1, h), g));
            }
            o.length > Ht && et(u, o, k, o.length),
              c.length > Ht && f(u, c, k, c.length, m, h, g);
          }
        }
      }
    }
    function R(u, o, c, m, h, g) {
      var U = o.tag, V = c.tag;
      if (U === V && o.is === c.is) {
        if (c.state = o.state, c.events = o.events, Ao(c, o)) return;
        if (typeof U == "string") {
          switch (c.attrs != null && Ft(c.attrs, c, m), U) {
            case "#":
              T(o, c);
              break;
            case "<":
              E(u, o, c, g, h);
              break;
            case "[":
              j(u, o, c, m, h, g);
              break;
            default:
              P(o, c, m, g);
          }
        } else z(u, o, c, m, h, g);
      } else ct(u, o), y(u, c, m, g, h);
    }
    function T(u, o) {
      u.children.toString() !== o.children.toString() &&
      (u.dom.nodeValue = o.children), o.dom = u.dom;
    }
    function E(u, o, c, m, h) {
      o.children !== c.children
        ? (Gr(u, o), I(u, c, m, h))
        : (c.dom = o.dom, c.domSize = o.domSize);
    }
    function j(u, o, c, m, h, g) {
      ee(u, o.children, c.children, m, h, g);
      var U = 0, V = c.children;
      if (c.dom = null, V != null) {
        for (var k = 0; k < V.length; k++) {
          var q = V[k];
          q != null && q.dom != null &&
            (c.dom == null && (c.dom = q.dom), U += q.domSize || 1);
        }
      }
      c.domSize = U;
    }
    function P(u, o, c, m) {
      var h = o.dom = u.dom;
      m = i(o) || m,
        (u.attrs != o.attrs || o.attrs != null && !gn.get(o.attrs)) &&
        xo(o, u.attrs, o.attrs, m),
        zr(o) || ee(h, u.children, o.children, c, null, m);
    }
    function z(u, o, c, m, h, g) {
      if (
        c.instance = sr.normalize(a.call(c.state.view, c)), c.instance === c
      ) throw Error("A view cannot return the vnode it received as argument");
      Ft(c.state, c, m),
        c.attrs != null && Ft(c.attrs, c, m),
        c.instance != null
          ? (o.instance == null
            ? y(u, c.instance, m, g, h)
            : R(u, o.instance, c.instance, m, h, g),
            c.dom = c.instance.dom,
            c.domSize = c.instance.domSize)
          : (o.instance != null && ct(u, o.instance), c.domSize = 0);
    }
    function M(u, o, c) {
      for (var m = Object.create(null); o < c; o++) {
        var h = u[o];
        if (h != null) {
          var g = h.key;
          g != null && (m[g] = o);
        }
      }
      return m;
    }
    var H = [];
    function K(u) {
      for (
        var o = [0], c = 0, m = 0, h = 0, g = H.length = u.length, h = 0;
        h < g;
        h++
      ) H[h] = u[h];
      for (var h = 0; h < g; ++h) {
        if (u[h] !== -1) {
          var U = o[o.length - 1];
          if (u[U] < u[h]) {
            H[h] = U, o.push(h);
            continue;
          }
          for (c = 0, m = o.length - 1; c < m;) {
            var V = (c >>> 1) + (m >>> 1) + (c & m & 1);
            u[o[V]] < u[h] ? c = V + 1 : m = V;
          }
          u[h] < u[o[c]] && (c > 0 && (H[h] = o[c - 1]), o[c] = h);
        }
      }
      for (c = o.length, m = o[c - 1]; c-- > 0;) o[c] = m, m = H[m];
      return H.length = 0, o;
    }
    function te(u, o, c) {
      for (; o < u.length; o++) {
        if (u[o] != null && u[o].dom != null) return u[o].dom;
      }
      return c;
    }
    function Se(u, o, c) {
      if (o.dom != null) {
        var m;
        if (o.domSize == null || o.domSize === 1) m = o.dom;
        else {
          m = n(u).createDocumentFragment();
          for (var h of or(o)) m.appendChild(h);
        }
        de(u, m, c);
      }
    }
    function de(u, o, c) {
      c != null ? u.insertBefore(o, c) : u.appendChild(o);
    }
    function zr(u) {
      if (
        u.attrs == null ||
        u.attrs.contenteditable == null && u.attrs.contentEditable == null
      ) return !1;
      var o = u.children;
      if (o != null && o.length === 1 && o[0].tag === "<") {
        var c = o[0].children;
        u.dom.innerHTML !== c && (u.dom.innerHTML = c);
      } else if (o != null && o.length !== 0) {
        throw new Error("Child node of a contenteditable must be trusted.");
      }
      return !0;
    }
    function et(u, o, c, m) {
      for (var h = c; h < m; h++) {
        var g = o[h];
        g != null && ct(u, g);
      }
    }
    function Fr(u, o, c, m) {
      var h = o.state, g = a.call(c.onbeforeremove, o);
      if (g != null) {
        var U = r;
        for (var V of or(o)) Ho.set(V, U);
        m.v++,
          Promise.resolve(g).finally(function () {
            s(o, h), Hr(u, o, m);
          });
      }
    }
    function Hr(u, o, c) {
      --c.v === 0 && (Vt(o), Gr(u, o));
    }
    function ct(u, o) {
      var c = { v: 1 };
      typeof o.tag != "string" && typeof o.state.onbeforeremove == "function" &&
      Fr(u, o, o.state, c),
        o.attrs && typeof o.attrs.onbeforeremove == "function" &&
        Fr(u, o, o.attrs, c),
        Hr(u, o, c);
    }
    function Gr(u, o) {
      if (o.dom != null) {
        if (o.domSize == null || o.domSize === 1) u.removeChild(o.dom);
        else for (var c of or(o)) u.removeChild(c);
      }
    }
    function Vt(u) {
      if (
        typeof u.tag != "string" && typeof u.state.onremove == "function" &&
        a.call(u.state.onremove, u),
          u.attrs && typeof u.attrs.onremove == "function" &&
          a.call(u.attrs.onremove, u),
          typeof u.tag != "string"
      ) u.instance != null && Vt(u.instance);
      else {
        u.events != null && (u.events._ = null);
        var o = u.children;
        if (Array.isArray(o)) {
          for (var c = 0; c < o.length; c++) {
            var m = o[c];
            m != null && Vt(m);
          }
        }
      }
    }
    function go(u, o, c) {
      for (var m in o) qt(u, m, null, o[m], c);
    }
    function qt(u, o, c, m, h) {
      if (
        !(o === "key" || m == null || Wr(o) ||
          c === m && !wo(u, o) && typeof m != "object")
      ) {
        if (o[0] === "o" && o[1] === "n") return Qr(u, o, m);
        if (o.slice(0, 6) === "xlink:") {
          u.dom.setAttributeNS("http://www.w3.org/1999/xlink", o.slice(6), m);
        } else if (o === "style") Jr(u.dom, c, m);
        else if (Xr(u, o, h)) {
          if (o === "value") {
            if (
              (u.tag === "input" || u.tag === "textarea") &&
                u.dom.value === "" + m ||
              u.tag === "select" && c !== null && u.dom.value === "" + m ||
              u.tag === "option" && c !== null && u.dom.value === "" + m
            ) return;
            if (u.tag === "input" && u.attrs.type === "file" && "" + m != "") {
              console.error("`value` is read-only on file inputs!");
              return;
            }
          }
          u.tag === "input" && o === "type"
            ? u.dom.setAttribute(o, m)
            : u.dom[o] = m;
        } else {typeof m == "boolean"
            ? m ? u.dom.setAttribute(o, "") : u.dom.removeAttribute(o)
            : u.dom.setAttribute(o === "className" ? "class" : o, m);}
      }
    }
    function vo(u, o, c, m) {
      if (!(o === "key" || c == null || Wr(o))) {
        if (o[0] === "o" && o[1] === "n") {
          Qr(u, o, void 0);
        } else if (o === "style") Jr(u.dom, c, null);
        else if (
          Xr(u, o, m) && o !== "className" && o !== "title" &&
          !(o === "value" &&
            (u.tag === "option" ||
              u.tag === "select" && u.dom.selectedIndex === -1 &&
                u.dom === p(u.dom))) &&
          !(u.tag === "input" && o === "type")
        ) u.dom[o] = null;
        else {
          var h = o.indexOf(":");
          h !== -1 && (o = o.slice(h + 1)),
            c !== !1 && u.dom.removeAttribute(o === "className" ? "class" : o);
        }
      }
    }
    function bo(u, o) {
      if ("value" in o) {
        if (o.value === null) {
          u.dom.selectedIndex !== -1 && (u.dom.value = null);
        } else {
          var c = "" + o.value;
          (u.dom.value !== c || u.dom.selectedIndex === -1) &&
            (u.dom.value = c);
        }
      }
      "selectedIndex" in o &&
        qt(u, "selectedIndex", null, o.selectedIndex, void 0);
    }
    function xo(u, o, c, m) {
      var h;
      if (o != null) {
        o === c && !gn.has(c) &&
          console.warn(
            "Don't reuse attrs object, use new object for every redraw, this will throw in next major",
          );
        for (var g in o) {
          (h = o[g]) != null && (c == null || c[g] == null) && vo(u, g, h, m);
        }
      }
      if (c != null) { for (var g in c) qt(u, g, o && o[g], c[g], m); }
    }
    function wo(u, o) {
      return o === "value" || o === "checked" || o === "selectedIndex" ||
        o === "selected" &&
          (u.dom === p(u.dom) ||
            u.tag === "option" && u.dom.parentNode === p(u.dom));
    }
    function Wr(u) {
      return u === "oninit" || u === "oncreate" || u === "onupdate" ||
        u === "onremove" || u === "onbeforeremove" || u === "onbeforeupdate";
    }
    function Xr(u, o, c) {
      return c === void 0 &&
        (u.tag.indexOf("-") > -1 || u.is ||
          o !== "href" && o !== "list" && o !== "form" && o !== "width" &&
            o !== "height") &&
        o in u.dom;
    }
    function Jr(u, o, c) {
      if (o !== c) {
        if (c == null) u.style = "";
        else if (typeof c != "object") u.style = c;
        else if (o == null || typeof o != "object") {
          u.style = "";
          for (var m in c) {
            var h = c[m];
            h != null &&
              (m.includes("-")
                ? u.style.setProperty(m, String(h))
                : u.style[m] = String(h));
          }
        } else {
          for (var m in o) {
            o[m] != null && c[m] == null &&
              (m.includes("-") ? u.style.removeProperty(m) : u.style[m] = "");
          }
          for (var m in c) {
            var h = c[m];
            h != null && (h = String(h)) !== String(o[m]) &&
              (m.includes("-") ? u.style.setProperty(m, h) : u.style[m] = h);
          }
        }
      }
    }
    function Bt() {
      this._ = e;
    }
    Bt.prototype = Object.create(null),
      Bt.prototype.handleEvent = function (u) {
        var o = this["on" + u.type], c;
        typeof o == "function"
          ? c = o.call(u.currentTarget, u)
          : typeof o.handleEvent == "function" && o.handleEvent(u);
        var m = this;
        m._ != null &&
        (u.redraw !== !1 && (0, m._)(),
          c != null && typeof c.then == "function" &&
          Promise.resolve(c).then(function () {
            m._ != null && u.redraw !== !1 && (0, m._)();
          })), c === !1 && (u.preventDefault(), u.stopPropagation());
      };
    function Qr(u, o, c) {
      if (u.events != null) {
        if (u.events._ = e, u.events[o] === c) return;
        c != null && (typeof c == "function" || typeof c == "object")
          ? (u.events[o] == null &&
            u.dom.addEventListener(o.slice(2), u.events, !1),
            u.events[o] = c)
          : (u.events[o] != null &&
            u.dom.removeEventListener(o.slice(2), u.events, !1),
            u.events[o] = void 0);
      } else {c != null && (typeof c == "function" || typeof c == "object") &&
          (u.events = new Bt(),
            u.dom.addEventListener(o.slice(2), u.events, !1),
            u.events[o] = c);}
    }
    function zt(u, o, c) {
      typeof u.oninit == "function" && a.call(u.oninit, o),
        typeof u.oncreate == "function" && c.push(a.bind(u.oncreate, o));
    }
    function Ft(u, o, c) {
      typeof u.onupdate == "function" && c.push(a.bind(u.onupdate, o));
    }
    function Ao(u, o) {
      do {
        if (u.attrs != null && typeof u.attrs.onbeforeupdate == "function") {
          var c = a.call(u.attrs.onbeforeupdate, u, o);
          if (c !== void 0 && !c) break;
        }
        if (
          typeof u.tag != "string" &&
          typeof u.state.onbeforeupdate == "function"
        ) {
          var c = a.call(u.state.onbeforeupdate, u, o);
          if (c !== void 0 && !c) break;
        }
        return !1;
      } while (!1);
      return u.dom = o.dom,
        u.domSize = o.domSize,
        u.instance = o.instance,
        u.attrs = o.attrs,
        u.children = o.children,
        u.text = o.text,
        !0;
    }
    var tt;
    return function (u, o, c) {
      if (!u) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (tt != null && u.contains(tt)) {
        throw new TypeError(
          "Node is currently being rendered to and thus is locked.",
        );
      }
      var m = e, h = tt, g = [], U = p(u), V = u.namespaceURI;
      tt = u, e = typeof c == "function" ? c : void 0, r = {};
      try {
        u.vnodes == null && (u.textContent = ""),
          o = sr.normalizeChildren(Array.isArray(o) ? o : [o]),
          ee(
            u,
            u.vnodes,
            o,
            g,
            null,
            V === "http://www.w3.org/1999/xhtml" ? void 0 : V,
          ),
          u.vnodes = o,
          U != null && p(u) !== U && typeof U.focus == "function" && U.focus();
        for (var k = 0; k < g.length; k++) g[k]();
      } finally {
        e = m, tt = h;
      }
    };
  };
});
var ur = F((Ha, xn) => {
  "use strict";
  xn.exports = bn()();
});
var kn = F((Ga, An) => {
  "use strict";
  var wn = Te();
  An.exports = function (t, e, r) {
    var n = [], i = !1, s = -1;
    function a() {
      for (s = 0; s < n.length; s += 2) {
        try {
          t(n[s], wn(n[s + 1]), p);
        } catch (y) {
          r.error(y);
        }
      }
      s = -1;
    }
    function p() {
      i || (i = !0,
        e(function () {
          i = !1, a();
        }));
    }
    p.sync = a;
    function f(y, v) {
      if (v != null && v.view == null && typeof v != "function") {
        throw new TypeError("m.mount expects a component, not a vnode.");
      }
      var b = n.indexOf(y);
      b >= 0 && (n.splice(b, 2), b <= s && (s -= 2), t(y, [])),
        v != null && (n.push(y, v), t(y, wn(v), p));
    }
    return { mount: f, redraw: p };
  };
});
var mt = F((Wa, Tn) => {
  "use strict";
  var Go = ur();
  Tn.exports = kn()(
    Go,
    typeof requestAnimationFrame < "u" ? requestAnimationFrame : null,
    typeof console < "u" ? console : null,
  );
});
var ar = F((Xa, In) => {
  "use strict";
  In.exports = function (t) {
    if (Object.prototype.toString.call(t) !== "[object Object]") return "";
    var e = [];
    for (var r in t) n(r, t[r]);
    return e.join("&");
    function n(i, s) {
      if (Array.isArray(s)) {
        for (var a = 0; a < s.length; a++) {
          n(
            i + "[" + a + "]",
            s[a],
          );
        }
      } else if (Object.prototype.toString.call(s) === "[object Object]") {
        for (var a in s) {
          n(i + "[" + a + "]", s[a]);
        }
      } else {e.push(
          encodeURIComponent(i) +
            (s != null && s !== "" ? "=" + encodeURIComponent(s) : ""),
        );}
    }
  };
});
var ht = F((Ja, En) => {
  "use strict";
  var Wo = ar();
  En.exports = function (t, e) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(t)) {
      throw new SyntaxError(
        "Template parameter names must be separated by either a '/', '-', or '.'.",
      );
    }
    if (e == null) return t;
    var r = t.indexOf("?"),
      n = t.indexOf("#"),
      i = n < 0 ? t.length : n,
      s = r < 0 ? i : r,
      a = t.slice(0, s),
      p = {};
    Object.assign(p, e);
    var f = a.replace(/:([^\/\.-]+)(\.{3})?/g, function (ie, W, ee) {
        return delete p[W],
          e[W] == null ? ie : ee ? e[W] : encodeURIComponent(String(e[W]));
      }),
      y = f.indexOf("?"),
      v = f.indexOf("#"),
      b = v < 0 ? f.length : v,
      I = y < 0 ? b : y,
      w = f.slice(0, I);
    r >= 0 && (w += t.slice(r, i)),
      y >= 0 && (w += (r < 0 ? "?" : "&") + f.slice(y, b));
    var $ = Wo(p);
    return $ && (w += (r < 0 && y < 0 ? "?" : "&") + $),
      n >= 0 && (w += t.slice(n)),
      v >= 0 && (w += (n < 0 ? "" : "&") + f.slice(v)),
      w;
  };
});
var Pn = F((Qa, Dn) => {
  "use strict";
  var Xo = ht(), Sn = ft();
  Dn.exports = function (t, e) {
    function r(s) {
      return new Promise(s);
    }
    function n(s, a) {
      return new Promise(function (p, f) {
        s = Xo(s, a.params);
        var y = a.method != null ? a.method.toUpperCase() : "GET",
          v = a.body,
          b = (a.serialize == null || a.serialize === JSON.serialize) &&
            !(v instanceof t.FormData || v instanceof t.URLSearchParams),
          I = a.responseType || (typeof a.extract == "function" ? "" : "json"),
          w = new t.XMLHttpRequest(),
          $ = !1,
          ie = !1,
          W = w,
          ee,
          R = w.abort;
        w.abort = function () {
          $ = !0, R.call(this);
        },
          w.open(
            y,
            s,
            a.async !== !1,
            typeof a.user == "string" ? a.user : void 0,
            typeof a.password == "string" ? a.password : void 0,
          ),
          b && v != null && !i(a, "content-type") &&
          w.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
          typeof a.deserialize != "function" && !i(a, "accept") &&
          w.setRequestHeader("Accept", "application/json, text/*"),
          a.withCredentials && (w.withCredentials = a.withCredentials),
          a.timeout && (w.timeout = a.timeout),
          w.responseType = I;
        for (var T in a.headers) {
          Sn.call(a.headers, T) && w.setRequestHeader(T, a.headers[T]);
        }
        w.onreadystatechange = function (E) {
          if (!$ && E.target.readyState === 4) {
            try {
              var j = E.target.status >= 200 && E.target.status < 300 ||
                  E.target.status === 304 || /^file:\/\//i.test(s),
                P = E.target.response,
                z;
              if (I === "json") {
                if (!E.target.responseType && typeof a.extract != "function") {
                  try {
                    P = JSON.parse(E.target.responseText);
                  } catch {
                    P = null;
                  }
                }
              } else {(!I || I === "text") && P == null &&
                  (P = E.target.responseText);}
              if (
                typeof a.extract == "function"
                  ? (P = a.extract(E.target, a), j = !0)
                  : typeof a.deserialize == "function" &&
                    (P = a.deserialize(P)), j
              ) {
                if (typeof a.type == "function") {
                  if (Array.isArray(P)) {
                    for (var M = 0; M < P.length; M++) {
                      P[M] = new a.type(P[M]);
                    }
                  } else P = new a.type(P);
                }
                p(P);
              } else {
                var H = function () {
                  try {
                    z = E.target.responseText;
                  } catch {
                    z = P;
                  }
                  var K = new Error(z);
                  K.code = E.target.status, K.response = P, f(K);
                };
                w.status === 0
                  ? setTimeout(function () {
                    ie || H();
                  })
                  : H();
              }
            } catch (K) {
              f(K);
            }
          }
        },
          w.ontimeout = function (E) {
            ie = !0;
            var j = new Error("Request timed out");
            j.code = E.target.status, f(j);
          },
          typeof a.config == "function" &&
          (w = a.config(w, a, s) || w,
            w !== W && (ee = w.abort,
              w.abort = function () {
                $ = !0, ee.call(this);
              })),
          v == null
            ? w.send()
            : typeof a.serialize == "function"
            ? w.send(a.serialize(v))
            : v instanceof t.FormData || v instanceof t.URLSearchParams
            ? w.send(v)
            : w.send(JSON.stringify(v));
      });
    }
    r.prototype = Promise.prototype, r.__proto__ = Promise;
    function i(s, a) {
      for (var p in s.headers) {
        if (Sn.call(s.headers, p) && p.toLowerCase() === a) return !0;
      }
      return !1;
    }
    return {
      request: function (s, a) {
        typeof s != "string" ? (a = s, s = s.url) : a == null && (a = {});
        var p = n(s, a);
        if (a.background === !0) return p;
        var f = 0;
        function y() {
          --f === 0 && typeof e == "function" && e();
        }
        return v(p);
        function v(b) {
          var I = b.then;
          return b.constructor = r,
            b.then = function () {
              f++;
              var w = I.apply(b, arguments);
              return w.then(y, function ($) {
                if (y(), f === 0) throw $;
              }),
                v(w);
            },
            b;
        }
      },
    };
  };
});
var Ln = F((Ya, _n) => {
  "use strict";
  var Jo = mt();
  _n.exports = Pn()(typeof window < "u" ? window : null, Jo.redraw);
});
var lr = F((Ka, On) => {
  "use strict";
  var Qo =
    /%(?:[0-7]|(?!c[01]|e0%[89]|ed%[ab]|f0%8|f4%[9ab])(?:c|d|(?:e|f[0-4]%[89ab])[\da-f]%[89ab])[\da-f]%[89ab])[\da-f]/gi;
  On.exports = function (t) {
    return String(t).replace(Qo, decodeURIComponent);
  };
});
var cr = F((Za, Cn) => {
  "use strict";
  var Mn = lr();
  Cn.exports = function (t) {
    if (t === "" || t == null) return {};
    t.charAt(0) === "?" && (t = t.slice(1));
    for (var e = t.split("&"), r = {}, n = {}, i = 0; i < e.length; i++) {
      var s = e[i].split("="), a = Mn(s[0]), p = s.length === 2 ? Mn(s[1]) : "";
      p === "true" ? p = !0 : p === "false" && (p = !1);
      var f = a.split(/\]\[?|\[/), y = n;
      a.indexOf("[") > -1 && f.pop();
      for (var v = 0; v < f.length; v++) {
        var b = f[v], I = f[v + 1], w = I == "" || !isNaN(parseInt(I, 10));
        if (b === "") {
          var a = f.slice(0, v).join();
          r[a] == null && (r[a] = Array.isArray(y) ? y.length : 0), b = r[a]++;
        } else if (b === "__proto__") break;
        if (v === f.length - 1) y[b] = p;
        else {
          var $ = Object.getOwnPropertyDescriptor(y, b);
          $ != null && ($ = $.value),
            $ == null && (y[b] = $ = w ? [] : {}),
            y = $;
        }
      }
    }
    return n;
  };
});
var yt = F((el, Rn) => {
  "use strict";
  var Yo = cr();
  Rn.exports = function (t) {
    var e = t.indexOf("?"),
      r = t.indexOf("#"),
      n = r < 0 ? t.length : r,
      i = e < 0 ? n : e,
      s = t.slice(0, i).replace(/\/{2,}/g, "/");
    return s ? s[0] !== "/" && (s = "/" + s) : s = "/",
      { path: s, params: e < 0 ? {} : Yo(t.slice(e + 1, n)) };
  };
});
var Un = F((tl, jn) => {
  "use strict";
  var Ko = yt();
  jn.exports = function (t) {
    var e = Ko(t),
      r = Object.keys(e.params),
      n = [],
      i = new RegExp(
        "^" +
          e.path.replace(
            /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
            function (s, a, p) {
              return a == null
                ? "\\" + s
                : (n.push({ k: a, r: p === "..." }),
                  p === "..."
                    ? "(.*)"
                    : p === "."
                    ? "([^/]+)\\."
                    : "([^/]+)" + (p || ""));
            },
          ) + "\\/?$",
      );
    return function (s) {
      for (var a = 0; a < r.length; a++) {
        if (e.params[r[a]] !== s.params[r[a]]) return !1;
      }
      if (!n.length) return i.test(s.path);
      var p = i.exec(s.path);
      if (p == null) return !1;
      for (var a = 0; a < n.length; a++) {
        s.params[n[a].k] = n[a].r ? p[a + 1] : decodeURIComponent(p[a + 1]);
      }
      return !0;
    };
  };
});
var pr = F((rl, Vn) => {
  "use strict";
  var $n = ft(),
    Nn =
      /^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$/;
  Vn.exports = function (t, e) {
    var r = {};
    if (e != null) {
      for (var n in t) {
        $n.call(t, n) && !Nn.test(n) && e.indexOf(n) < 0 && (r[n] = t[n]);
      }
    } else for (var n in t) $n.call(t, n) && !Nn.test(n) && (r[n] = t[n]);
    return r;
  };
});
var Fn = F((nl, zn) => {
  "use strict";
  var Zo = Te(),
    eu = tr(),
    tu = lr(),
    qn = ht(),
    Bn = yt(),
    ru = Un(),
    nu = pr();
  zn.exports = function (t, e) {
    var r = Promise.resolve(),
      n = !1,
      i = !1,
      s = !1,
      a,
      p,
      f,
      y,
      v,
      b,
      I,
      w,
      $ = {
        onremove: function () {
          i = s = !1, t.removeEventListener("popstate", ee, !1);
        },
        view: function () {
          var T = Zo(v, b.key, b);
          return y ? y.render(T) : [T];
        },
      },
      ie = R.SKIP = {};
    function W() {
      n = !1;
      var T = t.location.hash;
      R.prefix[0] !== "#" &&
        (T = t.location.search + T,
          R.prefix[0] !== "?" &&
          (T = t.location.pathname + T, T[0] !== "/" && (T = "/" + T)));
      var E = tu(T).slice(R.prefix.length), j = Bn(E);
      Object.assign(j.params, t.history.state);
      function P(M) {
        console.error(M), R.set(f, null, { replace: !0 });
      }
      z(0);
      function z(M) {
        for (; M < p.length; M++) {
          if (p[M].check(j)) {
            var H = p[M].component,
              K = p[M].route,
              te = H,
              Se = w = function (de) {
                if (Se === w) {
                  if (de === ie) return z(M + 1);
                  v = de != null &&
                      (typeof de.view == "function" || typeof de == "function")
                    ? de
                    : "div",
                    b = j.params,
                    I = E,
                    w = null,
                    y = H.render ? H : null,
                    s ? e.redraw() : (s = !0, e.mount(a, $));
                }
              };
            H.view || typeof H == "function"
              ? (H = {}, Se(te))
              : H.onmatch
              ? r.then(function () {
                return H.onmatch(j.params, E, K);
              }).then(Se, E === f ? null : P)
              : Se();
            return;
          }
        }
        if (E === f) {
          throw new Error("Could not resolve default route " + f + ".");
        }
        R.set(f, null, { replace: !0 });
      }
    }
    function ee() {
      n || (n = !0, setTimeout(W));
    }
    function R(T, E, j) {
      if (!T) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (
        p = Object.keys(j).map(function (z) {
          if (z[0] !== "/") {
            throw new SyntaxError("Routes must start with a '/'.");
          }
          if (/:([^\/\.-]+)(\.{3})?:/.test(z)) {
            throw new SyntaxError(
              "Route parameter names must be separated with either '/', '.', or '-'.",
            );
          }
          return { route: z, component: j[z], check: ru(z) };
        }),
          f = E,
          E != null
      ) {
        var P = Bn(E);
        if (
          !p.some(function (z) {
            return z.check(P);
          })
        ) {
          throw new ReferenceError(
            "Default route doesn't match any known routes.",
          );
        }
      }
      a = T, t.addEventListener("popstate", ee, !1), i = !0, W();
    }
    return R.set = function (T, E, j) {
      if (
        w != null && (j = j || {}, j.replace = !0), w = null, T = qn(T, E), i
      ) {
        ee();
        var P = j ? j.state : null, z = j ? j.title : null;
        j && j.replace
          ? t.history.replaceState(P, z, R.prefix + T)
          : t.history.pushState(P, z, R.prefix + T);
      } else t.location.href = R.prefix + T;
    },
      R.get = function () {
        return I;
      },
      R.prefix = "#!",
      R.Link = {
        view: function (T) {
          var E = eu(
              T.attrs.selector || "a",
              nu(T.attrs, ["options", "params", "selector", "onclick"]),
              T.children,
            ),
            j,
            P,
            z;
          return (E.attrs.disabled = !!E.attrs.disabled)
            ? (E.attrs.href = null, E.attrs["aria-disabled"] = "true")
            : (j = T.attrs.options,
              P = T.attrs.onclick,
              z = qn(E.attrs.href, T.attrs.params),
              E.attrs.href = R.prefix + z,
              E.attrs.onclick = function (M) {
                var H;
                typeof P == "function"
                  ? H = P.call(M.currentTarget, M)
                  : P == null || typeof P != "object" ||
                    typeof P.handleEvent == "function" && P.handleEvent(M),
                  H !== !1 && !M.defaultPrevented &&
                  (M.button === 0 || M.which === 0 || M.which === 1) &&
                  (!M.currentTarget.target ||
                    M.currentTarget.target === "_self") &&
                  !M.ctrlKey && !M.metaKey && !M.shiftKey && !M.altKey &&
                  (M.preventDefault(), M.redraw = !1, R.set(z, null, j));
              }),
            E;
        },
      },
      R.param = function (T) {
        return b && T != null ? b[T] : b;
      },
      R;
  };
});
var Gn = F((il, Hn) => {
  "use strict";
  var iu = mt();
  Hn.exports = Fn()(typeof window < "u" ? window : null, iu);
});
var _ = F((sl, Xn) => {
  "use strict";
  var dt = mn(),
    Wn = mt(),
    su = Ln(),
    ou = Gn(),
    re = function () {
      return dt.apply(this, arguments);
    };
  re.m = dt;
  re.trust = dt.trust;
  re.fragment = dt.fragment;
  re.Fragment = "[";
  re.mount = Wn.mount;
  re.route = ou;
  re.render = ur();
  re.redraw = Wn.redraw;
  re.request = su.request;
  re.parseQueryString = cr();
  re.buildQueryString = ar();
  re.parsePathname = yt();
  re.buildPathname = ht();
  re.vnode = Te();
  re.censor = pr();
  re.domFor = ir();
  Xn.exports = re;
});
var yo = L(_());
var x = L(_());
var Q = L(_());
function le(t, e) {
  console.info(`broadcasting event: ${t}`, e),
    window.document.dispatchEvent(new CustomEvent(t, { detail: e }));
}
function gt(t, e) {
  window.document.addEventListener(t, e);
}
function Ie(t) {
  t?.preventDefault();
}
function Y(t) {
  return (e) => {
    le("navigate", { route: t }), Ie(e);
  };
}
function uu() {
  let t = (e) => {
    le("click_burger_menu", {});
  };
  return {
    view() {
      return (0, Q.default)(
        "a",
        { onclick: t },
        (0, Q.default)("span.burger", "\u039E"),
      );
    },
  };
}
function au() {
  let t = "photos";
  return {
    view() {
      return (0, Q.default)(
        "a",
        { href: "#/", onclick: Y("/") },
        (0, Q.default)("span.brand", t),
      );
    },
  };
}
function lu() {
  let t = (0, Q.default)("path", {
    fill: "#ff9132",
    d: "M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z",
  });
  return {
    view() {
      return (0, Q.default)("a.rss", {
        title: "rss",
        href: "/manifest/atom/atom-index.xml",
      }, [
        (0, Q.default)("svg", {
          alt: "rss",
          width: "25px",
          height: "25px",
          viewBox: "0 0 32 32",
          style: "position: relative; top: 5px;",
        }, [t]),
      ]);
    },
  };
}
function cu() {
  return {
    view(t) {
      let e = t.attrs.darkMode ? "\u2600\uFE0F" : "\u{1F319}";
      return (0, Q.default)(
        "a",
        {},
        (0, Q.default)("span.brand.switch", {
          onclick: () => {
            le("switch_theme", {});
          },
        }, e),
      );
    },
  };
}
function be() {
  return {
    view(t) {
      return (0, Q.default)("nav.header", { role: "navigation" }, [
        (0, Q.default)("ul", { style: "display: ruby" }, [
          (0, Q.default)("li.header-item", {}, (0, Q.default)(uu())),
          (0, Q.default)("li.header-item", {}, (0, Q.default)(au())),
          (0, Q.default)(
            "li.rss-tag header-item",
            { style: "float: right" },
            (0, Q.default)(lu()),
          ),
          (0, Q.default)(
            "li.header-item",
            { style: "float: right" },
            (0, Q.default)(cu(), { darkMode: t.attrs.darkMode }),
          ),
        ]),
      ]);
    },
  };
}
function Jn() {
  return localStorage.getItem("darkMode") === "true";
}
var Zn = class ei {
    #t;
    #e;
    #r;
    constructor() {
      this.#t = 0, this.#e = new Map(), this.#r = new Map();
    }
    map() {
      return this.#e;
    }
    reverseMap() {
      return this.#r;
    }
    add(e) {
      return this.#e.has(e)
        ? this.#e.get(e)
        : (this.#e.set(e, this.#t),
          this.#r.set(this.#t, e),
          this.#t++,
          this.#t - 1);
    }
    setIndex(e, r) {
      this.#e.set(e, r), this.#r.set(r, e);
    }
    getIndex(e) {
      return this.#e.get(e);
    }
    getValue(e) {
      return this.#r.get(e);
    }
    has(e) {
      return this.#e.has(e);
    }
    clone() {
      let e = new ei();
      for (let [r, n] of this.#e.entries()) e.setIndex(r, n);
      return e;
    }
  },
  We = class {
    static intersection(t, e) {
      if (e.length === 0) return new Set();
      e.sort((n, i) => n.size - i.size);
      let r = new Set(e[0]);
      for (let n = 1; n < e.length; n++) {
        let i = e[n];
        for (let s of r) t.setCheck(), i.has(s) || r.delete(s);
        if (r.size === 0) break;
      }
      return r;
    }
    static append(t, e) {
      for (let r of e) t.add(r);
      return t;
    }
    static difference(t, e) {
      let r = new Set();
      for (let n of t) e.has(n) || r.add(n);
      return r;
    }
  },
  ti = class {
    stringIndex;
    constructor() {
      this.stringIndex = new Zn();
    }
    parseTriple(t) {
      let e = t.match(/^(\d+) (\d+) (\d+)$/);
      if (!e) throw new SyntaxError(`Invalid format for triple line: ${t}`);
      let r = this.stringIndex.getValue(parseInt(e[1], 10)),
        n = this.stringIndex.getValue(parseInt(e[2], 10)),
        i = this.stringIndex.getValue(parseInt(e[3], 10));
      if (r === void 0 || n === void 0 || i === void 0) {
        throw new SyntaxError(`Invalid triple reference: ${t}`);
      }
      return [r, n, i];
    }
    parseDeclaration(t) {
      let e = t.match(/^(\d+) "(.*)"$/);
      if (!e) {
        throw new SyntaxError(`Invalid format for declaration line: ${t}`);
      }
      let r = e[1], n = e[2];
      this.stringIndex.setIndex(n, parseInt(r, 10));
    }
    parse(t) {
      if (/^(\d+)\s(\d+)\s(\d+)$/.test(t)) return this.parseTriple(t);
      this.parseDeclaration(t);
    }
  };
function nt(t) {
  let e = t.split(":", 4),
    r = e[2],
    n = e[3] ?? "",
    i = n.indexOf("?"),
    s = i !== -1 ? n.slice(i + 1) : "",
    a = i !== -1 ? n.slice(0, i) : n,
    p = s ? Object.fromEntries(new URLSearchParams(s)) : {};
  return { type: r, id: a, qs: p };
}
function A(t, e = "r\xF3") {
  return typeof t != "string" || !t.startsWith(`urn:${e}:`)
    ? { type: "unknown", id: t, qs: {} }
    : nt(t);
}
var fu = class ri {
    mapReadCount;
    constructor() {
      this.mapReadCount = 0;
    }
    mapRead() {
      this.mapReadCount++;
    }
    clone() {
      let e = new ri();
      return e.mapReadCount = this.mapReadCount, e;
    }
  },
  mu = class ni {
    setCheckCount;
    constructor() {
      this.setCheckCount = 0;
    }
    setCheck() {
      this.setCheckCount++;
    }
    clone() {
      let e = new ni();
      return e.setCheckCount = this.setCheckCount, e;
    }
  };
function Ue(t) {
  let [e, r, n] = t, i = 0;
  for (let s = 0; s < e.length; s++) i = (i << 5) - i + e.charCodeAt(s), i |= 0;
  for (let s = 0; s < r.length; s++) i = (i << 5) - i + r.charCodeAt(s), i |= 0;
  for (let s = 0; s < n.length; s++) i = (i << 5) - i + n.charCodeAt(s), i |= 0;
  return i.toString();
}
var hu = class ii {
    indexedTriples;
    tripleMetadata;
    stringIndex;
    tripleHashes;
    hashIndices;
    sourceType;
    sourceId;
    sourceQs;
    relations;
    targetType;
    targetId;
    targetQs;
    metrics;
    stringUrn;
    constructor(e) {
      this.indexedTriples = [],
        this.tripleMetadata = new Map(),
        this.stringIndex = new Zn(),
        this.tripleHashes = new Set(),
        this.hashIndices = new Map(),
        this.sourceType = new Map(),
        this.sourceId = new Map(),
        this.sourceQs = new Map(),
        this.relations = new Map(),
        this.targetType = new Map(),
        this.targetId = new Map(),
        this.targetQs = new Map(),
        this.stringUrn = new Map(),
        this.add(e),
        this.metrics = new fu();
    }
    delete(e) {
      for (let r = 0; r < e.length; r++) {
        let n = e[r], i = Ue(n), s = this.hashIndices.get(i);
        if (s === void 0) continue;
        this.tripleHashes.delete(i), this.hashIndices.delete(i);
        let a = this.tripleMetadata.get(s);
        if (a) {
          this.sourceType.get(a.sourceTypeIdx)?.delete(s),
            this.sourceId.get(a.sourceIdIdx)?.delete(s),
            this.relations.get(a.relation)?.delete(s),
            this.targetType.get(a.targetTypeIdx)?.delete(s),
            this.targetId.get(a.targetIdIdx)?.delete(s);
          for (let p of a.sourceQsIndices) this.sourceQs.get(p)?.delete(s);
          for (let p of a.targetQsIndices) this.targetQs.get(p)?.delete(s);
          this.tripleMetadata.delete(s);
        }
        delete this.indexedTriples[s];
      }
    }
    difference(e) {
      return e.filter((r) => !this.hasTriple(r));
    }
    hasTriple(e) {
      return this.tripleHashes.has(Ue(e));
    }
    getTripleIndex(e) {
      let r = Ue(e);
      return this.hashIndices.get(r);
    }
    add(e) {
      for (let r = 0; r < e.length; r++) {
        let n = e[r], i = n[0], s = n[1], a = n[2], p = this.stringUrn.get(i);
        p || (p = A(i), this.stringUrn.set(i, p));
        let f = this.stringUrn.get(a);
        f || (f = A(a), this.stringUrn.set(a, f));
        let y = this.stringIndex.add(i),
          v = this.stringIndex.add(a),
          b = this.stringIndex.add(p.type),
          I = this.stringIndex.add(p.id),
          w = this.stringIndex.add(f.type),
          $ = this.stringIndex.add(f.id),
          ie = Ue(n);
        if (this.tripleHashes.has(ie)) continue;
        this.tripleHashes.add(ie);
        let W = this.indexedTriples.length;
        this.hashIndices.set(ie, W), this.indexedTriples.push([y, s, v]);
        let ee = [], R = [], T = this.sourceType.get(b);
        T || (T = new Set(), this.sourceType.set(b, T)), T.add(W);
        let E = this.sourceId.get(I);
        E || (E = new Set(), this.sourceId.set(I, E)), E.add(W);
        for (let [M, H] of Object.entries(p.qs)) {
          let K = this.stringIndex.add(`${M}=${H}`);
          ee.push(K);
          let te = this.sourceQs.get(K);
          te || (te = new Set(), this.sourceQs.set(K, te)), te.add(W);
        }
        let j = this.relations.get(s);
        j || (j = new Set(), this.relations.set(s, j)), j.add(W);
        let P = this.targetType.get(w);
        P || (P = new Set(), this.targetType.set(w, P)), P.add(W);
        let z = this.targetId.get($);
        z || (z = new Set(), this.targetId.set($, z)), z.add(W);
        for (let [M, H] of Object.entries(f.qs)) {
          let K = this.stringIndex.add(`${M}=${H}`);
          R.push(K);
          let te = this.targetQs.get(K);
          te || (te = new Set(), this.targetQs.set(K, te)), te.add(W);
        }
        this.tripleMetadata.set(W, {
          sourceTypeIdx: b,
          sourceIdIdx: I,
          sourceQsIndices: ee,
          relation: s,
          targetTypeIdx: w,
          targetIdIdx: $,
          targetQsIndices: R,
        });
      }
    }
    get length() {
      return this.tripleHashes.size;
    }
    get arrayLength() {
      return this.indexedTriples.length;
    }
    triples() {
      return this.indexedTriples.filter((e) => e !== void 0).map((
        [e, r, n],
      ) => [this.stringIndex.getValue(e), r, this.stringIndex.getValue(n)]);
    }
    getTriple(e) {
      if (e < 0 || e >= this.indexedTriples.length) return;
      let r = this.indexedTriples[e];
      if (!r) return;
      let [n, i, s] = r;
      return [this.stringIndex.getValue(n), i, this.stringIndex.getValue(s)];
    }
    getTripleIndices(e) {
      if (!(e < 0 || e >= this.indexedTriples.length)) {
        return this.indexedTriples[e];
      }
    }
    getSourceTypeSet(e) {
      let r = this.stringIndex.getIndex(e);
      if (r !== void 0) return this.metrics.mapRead(), this.sourceType.get(r);
    }
    getSourceIdSet(e) {
      let r = this.stringIndex.getIndex(e);
      if (r !== void 0) return this.metrics.mapRead(), this.sourceId.get(r);
    }
    getSourceQsSet(e, r) {
      let n = this.stringIndex.getIndex(`${e}=${r}`);
      if (n !== void 0) return this.metrics.mapRead(), this.sourceQs.get(n);
    }
    getRelationSet(e) {
      return this.metrics.mapRead(), this.relations.get(e);
    }
    getTargetTypeSet(e) {
      let r = this.stringIndex.getIndex(e);
      if (r !== void 0) return this.metrics.mapRead(), this.targetType.get(r);
    }
    getTargetIdSet(e) {
      let r = this.stringIndex.getIndex(e);
      if (r !== void 0) return this.metrics.mapRead(), this.targetId.get(r);
    }
    getTargetQsSet(e, r) {
      let n = this.stringIndex.getIndex(`${e}=${r}`);
      if (n !== void 0) return this.metrics.mapRead(), this.targetQs.get(n);
    }
    clone() {
      let e = new ii([]);
      e.indexedTriples = this.indexedTriples.slice(),
        e.tripleMetadata = new Map(this.tripleMetadata),
        e.stringIndex = this.stringIndex.clone(),
        e.tripleHashes = new Set(this.tripleHashes),
        e.hashIndices = new Map(this.hashIndices);
      let r = (i) => {
          let s = new Map();
          for (let [a, p] of i.entries()) s.set(a, new Set(p));
          return s;
        },
        n = (i) => {
          let s = new Map();
          for (let [a, p] of i.entries()) s.set(a, new Set(p));
          return s;
        };
      return e.sourceType = r(this.sourceType),
        e.sourceId = r(this.sourceId),
        e.sourceQs = r(this.sourceQs),
        e.relations = n(this.relations),
        e.targetType = r(this.targetType),
        e.targetId = r(this.targetId),
        e.targetQs = r(this.targetQs),
        e.stringUrn = new Map(this.stringUrn),
        e.metrics = this.metrics.clone(),
        e;
    }
  },
  Ge = class {
    static source(t) {
      return t[0];
    }
    static relation(t) {
      return t[1];
    }
    static target(t) {
      return t[2];
    }
  };
function yu(t) {
  let e = ["source", "relation", "target"];
  if (!Array.isArray(t)) {
    for (let r of Object.keys(t)) {
      if (
        Object.prototype.hasOwnProperty.call(t, r) && !e.includes(r)
      ) throw new Error(`Unexpected search parameter: ${r}`);
    }
  }
}
function du(t, e, r) {
  let n = e ? r.getSourceTypeSet(t) : r.getTargetTypeSet(t);
  return n === void 0 || n.size === 0 ? new Set() : n;
}
function gu(t, e, r) {
  let n = new Set(), i = Array.isArray(t) ? t : [t];
  for (let s of i) {
    let a = e ? r.getSourceIdSet(s) : r.getTargetIdSet(s);
    a && We.append(n, a);
  }
  return n.size === 0 ? new Set() : n;
}
function vu(t, e, r, n) {
  let i = [];
  for (let [s, a] of Object.entries(t)) {
    let p = e ? r.getSourceQsSet(s, a) : r.getTargetQsSet(s, a);
    if (typeof p > "u") return new Set();
    i.push(p);
  }
  return We.intersection(n, i);
}
function bu(t, e, r, n, i) {
  let s;
  if (t.type && (s = du(t.type, e, r), s.size === 0)) return new Set();
  let a;
  if (t.id && (a = gu(t.id, e, r), a.size === 0)) return new Set();
  let p;
  if (
    t.qs && Object.keys(t.qs).length > 0 &&
    (p = vu(t.qs, e, r, n), p.size === 0)
  ) return new Set();
  if (s === void 0 && a === void 0 && p === void 0) {
    let b = t.predicate;
    if (!b) return i;
    let I = new Set([...i]);
    for (let w of I) {
      let $ = r.getTriple(w);
      if (!$) {
        I.delete(w);
        continue;
      }
      b(e ? $[0] : $[2]) || I.delete(w);
    }
    return I;
  }
  let f = [i];
  s !== void 0 && f.push(s),
    a !== void 0 && f.push(a),
    p !== void 0 && f.push(p);
  let y = We.intersection(n, f);
  if (!t.predicate) return y;
  let v = t.predicate;
  for (let b of y) {
    let I = r.getTriple(b);
    v(e ? I[0] : I[2]) || y.delete(b);
  }
  return y;
}
function Qn(t, e, r, n, i) {
  let s = new Set();
  for (let a of t) We.append(s, bu(a, e, r, n, i));
  return s;
}
function xu(t, e) {
  let r = Array.isArray(t.relation) ? t.relation : [t.relation], n = new Set();
  for (let s of r) {
    let a = e.getRelationSet(s);
    a && We.append(n, a);
  }
  if (!t.predicate) return n;
  let i = t.predicate;
  for (let s of n) {
    let a = e.getTriple(s);
    if (!a) {
      n.delete(s);
      continue;
    }
    i(a[1]) || n.delete(s);
  }
  return n;
}
function wu(t, e, r, n) {
  let { source: i, relation: s, target: a } = t, p = [];
  if (i) {
    let f = Array.isArray(i) ? i : [i], y = Qn(f, !0, e, n, r);
    p.push(y);
  }
  if (s && p.push(xu(s, e)), a) {
    let f = Array.isArray(a) ? a : [a], y = Qn(f, !1, e, n, r);
    p.push(y);
  }
  return p.length === 0 ? r : We.intersection(n, p);
}
function Yn(t) {
  return t.startsWith("urn:");
}
function Kn(t) {
  return typeof t == "string"
    ? Yn(t) ? [A(t)] : [{ type: "unknown", id: t }]
    : Array.isArray(t)
    ? t.map((e) => Yn(e) ? A(e) : { type: "unknown", id: e })
    : [t];
}
function Au(t) {
  return typeof t == "string" || Array.isArray(t) ? { relation: t } : t;
}
function ku(t) {
  let e = Array.isArray(t) ? t[0] : t.source,
    r = Array.isArray(t) ? t[1] : t.relation,
    n = Array.isArray(t) ? t[2] : t.target,
    i = {};
  return e && (i.source = Kn(e)),
    r && (i.relation = Au(r)),
    n && (i.target = Kn(n)),
    i;
}
var si = class je {
  index;
  triplesCount;
  cursorIndices;
  metrics;
  validations;
  constructor(e, r = {}) {
    this.index = new hu(e),
      this.triplesCount = this.index.length,
      this.cursorIndices = new Set(),
      this.metrics = new mu(),
      this.validations = r;
    for (let n = 0; n < this.triplesCount; n++) this.cursorIndices.add(n);
  }
  clone() {
    let e = new je([]);
    return e.index = this.index,
      e.triplesCount = this.triplesCount,
      e.cursorIndices = this.cursorIndices,
      e.metrics = this.metrics,
      e;
  }
  static of(e) {
    return new je(e);
  }
  static from(e) {
    let r = [];
    for (let n of e) {
      let { id: i, ...s } = n;
      if (typeof i != "string") {
        throw new Error("Each TripleObject must have a string id.");
      }
      for (let [a, p] of Object.entries(s)) {
        if (Array.isArray(p)) {
          for (let f of p) r.push([i, a, f]);
        } else r.push([i, a, p]);
      }
    }
    return new je(r);
  }
  validateTriples(e) {
    let r = [];
    for (let [n, i, s] of e) {
      let a = this.validations[i];
      if (!a) continue;
      let { type: p } = A(n), f = a(p, i, s);
      typeof f == "string" && r.push(f);
    }
    if (r.length > 0) {
      throw new Error(`Triple validation failed:
- ${
        r.join(`
- `)
      }`);
    }
  }
  add(e) {
    let r = this.index.arrayLength;
    this.validateTriples(e),
      this.index.add(e),
      this.triplesCount = this.index.length;
    for (let n = r; n < this.index.arrayLength; n++) this.cursorIndices.add(n);
  }
  map(e) {
    return new je(this.index.triples().map(e));
  }
  flatMap(e) {
    let r = this.index.triples().flatMap(e), n = new je([]);
    return n.index = this.index.clone(), n.add(r), n;
  }
  deduplicateTriples(e) {
    let r = new Set(), n = [];
    for (let i of e) {
      let s = Ue(i);
      r.has(s) || (r.add(s), n.push(i));
    }
    return n;
  }
  searchFlatmap(e, r) {
    let i = this.search(e).triples(),
      s = i.flatMap(r),
      a = this.deduplicateTriples(s),
      p = new Map();
    for (let b of i) p.set(Ue(b), b);
    let f = new Map();
    for (let b of a) f.set(Ue(b), b);
    let y = [], v = [];
    for (let [b, I] of p) f.has(b) || y.push(I);
    for (let [b, I] of f) p.has(b) || v.push(I);
    return this.delete(y), this.add(v), this;
  }
  firstTriple() {
    return this.index.length > 0 ? this.index.getTriple(0) : void 0;
  }
  firstSource() {
    let e = this.firstTriple();
    return e ? Ge.source(e) : void 0;
  }
  firstRelation() {
    let e = this.firstTriple();
    return e ? Ge.relation(e) : void 0;
  }
  firstTarget() {
    let e = this.firstTriple();
    return e ? Ge.target(e) : void 0;
  }
  firstObject(e = !1) {
    let r, n = {};
    for (let [i, s, a] of this.index.triples()) {
      r === void 0 && (r = i, n.id = i),
        r === i &&
        (n[s]
          ? Array.isArray(n[s])
            ? n[s].includes(a) || n[s].push(a)
            : n[s] = n[s] === a ? n[s] : [n[s], a]
          : n[s] = e ? [a] : a);
    }
    return Object.keys(n).length > 0 ? n : void 0;
  }
  triples() {
    return this.index.triples();
  }
  sources() {
    return new Set(this.index.triples().map(Ge.source));
  }
  relations() {
    return new Set(this.index.triples().map(Ge.relation));
  }
  targets() {
    return new Set(this.index.triples().map(Ge.target));
  }
  objects(e = !1) {
    let r = [];
    for (let [n, i] of Object.entries(this.#t(e))) i.id = n, r.push(i);
    return r;
  }
  #t(e = !1) {
    let r = {};
    for (let [n, i, s] of this.index.triples()) {
      r[n] || (r[n] = { id: n });
      let a = r[n][i];
      a
        ? Array.isArray(a)
          ? a.includes(s) || a.push(s)
          : r[n][i] = a === s ? a : [a, s]
        : r[n][i] = e ? [s] : s;
    }
    return r;
  }
  search(e) {
    let r = ku(e);
    yu(r);
    let n = [];
    for (let i of wu(r, this.index, this.cursorIndices, this.metrics)) {
      let s = this.index.getTriple(i);
      s !== void 0 && n.push(s);
    }
    return new je(n);
  }
  getMetrics() {
    return { index: this.index.metrics, db: this.metrics };
  }
  readThing(e, r = { qs: !1 }) {
    if (r.qs) {
      let { type: n, id: i } = A(e);
      return this.search({ source: { type: n, id: i } }).firstObject();
    } else return this.search({ source: e }).firstObject();
  }
  readThings(e, r = { qs: !1 }) {
    let n = [];
    for (let i of e) {
      let s = this.readThing(i, r);
      s !== void 0 && n.push(s);
    }
    return n;
  }
  parseThing(e, r, n = { qs: !1 }) {
    let i = this.readThing(r, n);
    if (i) return e(i);
  }
  parseThings(e, r, n = { qs: !1 }) {
    let i = [];
    for (let s of r) {
      let a = this.parseThing(e, s, n);
      a && i.push(a);
    }
    return i;
  }
  merge(e) {
    return this.add(e.triples()), this;
  }
  delete(e) {
    let r = new Set();
    for (let n of e) {
      let i = this.index.getTripleIndex(n);
      i !== void 0 && r.add(i);
    }
    this.index.delete(e), this.triplesCount = this.index.length;
    for (let n of r) this.cursorIndices.delete(n);
    return this;
  }
};
async function* Tu(t) {
  let e = new ti(), r = await fetch(t);
  if (!r.body) throw new Error("No response body");
  let n = new TextDecoderStream(),
    i = r.body.pipeThrough(n).getReader(),
    s = "",
    a = [];
  for (;;) {
    let { value: p, done: f } = await i.read();
    if (f) break;
    s += p;
    let y = s.split(`
`);
    s = y.pop() ?? "";
    for (let v of y) {
      let b = e.parse(v);
      b !== void 0 && a.push(b),
        a.length >= 500 && (yield [...a], a.length = 0);
    }
  }
  if (s.length > 0) {
    let p = e.parse(s);
    p !== void 0 && a.push(p);
  }
  a.length > 0 && (yield [...a]);
}
var vt = null;
async function oi(t, e = {}, r = (n) => [n]) {
  vt || (vt = new si([], e));
  for await (let n of Tu(t)) for (let i of n) vt.add(r(i));
  return vt;
}
var O = class {
    static ALBUM_ID = "albumId";
    static SUBJECT = "subject";
    static LOCATION = "location";
    static LONGITUDE = "longitude";
    static LATITUDE = "latitude";
    static COUNTRY = "country";
    static FLAG = "flag";
    static RATING = "rating";
    static NAME = "name";
    static BIRDWATCH_URL = "birdwatchUrl";
    static WIKIPEDIA = "wikipedia";
    static CREATED_AT = "createdAt";
    static SEASON = "season";
    static F_STOP = "f_stop";
    static FOCAL_LENGTH = "focalLength";
    static MODEL = "model";
    static EXPOSURE_TIME = "exposureTime";
    static ISO = "iso";
    static WIDTH = "width";
    static HEIGHT = "height";
    static THUMBNAIL_URL = "thumbnailUrl";
    static PNG_URL = "pngUrl";
    static MID_IMAGE_LOSSY_URL = "midImageLossyUrl";
    static FULL_IMAGE = "fullImage";
    static POSTER_URL = "posterUrl";
    static VIDEO_URL_1080P = "videoUrl1080p";
    static VIDEO_URL_480P = "videoUrl480p";
    static VIDEO_URL_720P = "videoUrl720p";
    static VIDEO_URL_UNSCALED = "videoUrlUnscaled";
    static YEAR = "year";
    static CONTAINS = "contains";
    static IN = "in";
    static STYLE = "style";
    static FLAGS = "flags";
    static CONTAINS_ALBUM = "containsAlbum";
    static TRIP = "trip";
  },
  S = class {
    static PLACE = "place";
    static COUNTRY = "country";
    static BIRD = "bird";
    static MAMMAL = "mammal";
    static REPTILE = "reptile";
    static AMPHIBIAN = "amphibian";
    static INSECT = "insect";
    static CAMERA = "camera";
    static PHOTO = "photo";
    static VIDEO = "video";
    static ALBUM = "album";
    static UNESCO = "unesco";
    static FISH = "fish";
    static PLACE_FEATURE = "place_feature";
  },
  ui = new Set([S.COUNTRY, S.CAMERA, S.PLACE]),
  fr = new Map([["country", "countries"]]);
var ai = new Set([
    O.THUMBNAIL_URL,
    O.PNG_URL,
    O.MID_IMAGE_LOSSY_URL,
    O.FULL_IMAGE,
    O.POSTER_URL,
    O.VIDEO_URL_1080P,
    O.VIDEO_URL_480P,
    O.VIDEO_URL_720P,
    O.VIDEO_URL_UNSCALED,
  ]),
  li = [[O.IN, O.CONTAINS], [O.CONTAINS_ALBUM, O.TRIP]],
  mr = {
    i: "urn:r\xF3:",
    birdwatch: "https://birdwatchireland.ie/birds/",
    photos: "https://photos-cdn.rgrannell.xyz/",
    wiki: "https://en.wikipedia.org/wiki/",
  },
  hr = /^\[([a-z]*):(.*)\]$/,
  ci = "https://photos-cdn.rgrannell.xyz";
var it = {
    aquarium: "\u{1F420}",
    aquaduct: "\u{1F3DB}\uFE0F",
    archaeological: "\u{1F3FA}",
    beach: "\u{1F3D6}\uFE0F",
    bridge: "\u{1F309}",
    canal: "\u{1F6A4}",
    castle: "\u{1F3F0}",
    church: "\u26EA",
    cathedral: "\u26EA",
    continent: "\u{1F30D}",
    cave: "\u26CF\uFE0F",
    city: "\u{1F3D9}\uFE0F",
    cliffs: "\u26F0\uFE0F",
    county: "\u{1F5FA}\uFE0F",
    district: "\u{1F3D8}\uFE0F",
    garden: "\u{1F33A}",
    harbor: "\u2693",
    island: "\u{1F3DD}\uFE0F",
    lake: "\u{1F3DE}\uFE0F",
    monument: "\u{1F5FF}",
    mosque: "\u{1F54C}",
    mountain: "\u{1F3D4}\uFE0F",
    mountains: "\u{1F3D4}\uFE0F",
    museum: "\u{1F3DB}\uFE0F",
    monastery: "\u{1F3EF}",
    national: "\u{1F1FA}\u{1F1F3}",
    nature: "\u{1F33F}",
    palace: "\u{1F3EF}",
    park: "\u{1F333}",
    port: "\u{1F6F3}\uFE0F",
    rainforest: "\u{1F334}",
    square: "\u{1F3E2}",
    state: "\u{1F3DB}\uFE0F",
    street: "\u{1F6B6}\u200D\u2642\uFE0F",
    town: "\u{1F3D8}\uFE0F",
    train: "\u{1F686}",
    unesco: "\u{1F3DB}\uFE0F",
    village: "\u{1F3E1}",
    volcano: "\u{1F30B}",
    waterfall: "\u{1F4A6}",
    wildlife: "\u{1F981}",
    zoo: "\u{1F993}",
  },
  pi = new Set([
    "dc-gh5",
    "dc-gh6",
    "dmc-fz72",
    "dmc-g7",
    "finepix-f70exr",
    "xz-1",
  ]),
  fi = new Set(["pixel-4a", "pixel-7-pro", "pixel-9a", "sm-a520f"]),
  mi = new Set([S.BIRD, S.MAMMAL, S.REPTILE, S.AMPHIBIAN, S.FISH, S.INSECT]);
function Iu(t) {
  let [e, r, n] = t;
  return Array.from(ai).some((s) => r === s) ? [[e, r, `${ci}${n}`]] : [t];
}
function Eu(t) {
  let [e, r, n] = t;
  return [[
    typeof e == "string" && e.startsWith("::") ? `urn:r\xF3:${e.slice(2)}` : e,
    r,
    typeof n == "string" && n.startsWith("::") ? `urn:r\xF3:${n.slice(2)}` : n,
  ]];
}
function Su(t) {
  let e = t.search({ relation: O.CREATED_AT }).triples().flatMap(
    ([r, n, i]) => {
      let s = new Date(i);
      if (isNaN(s.getTime())) return [];
      let a = s.getUTCFullYear().toString();
      return [[r, O.YEAR, a]];
    },
  );
  t.add(e);
}
function Du(t) {
  let e = [];
  for (let [r, n] of li) {
    let i = t.search({ relation: r }).triples();
    for (let [s, a, p] of i) e.push([p, n, s]);
  }
  t.add(e);
}
var hi = new Map();
function yi(t, e) {
  let r = hi.get(e);
  if (r) return r;
  if (typeof e != "string" || !hr.test(e)) return e;
  let n = e.match(hr);
  if (!n) return e;
  let i = n[1], s = n[2], a = t[i] ? `${t[i]}${s}` : e;
  return hi.set(e, a), a;
}
function Pu(t) {
  let [e, r, n] = t;
  return [[yi(mr, e), r, yi(mr, n)]];
}
function _u(t) {
  let e = { nodes: new Map(), branchIds: new Set() },
    r = t.search({ relation: O.IN }).triples(),
    n = e.nodes;
  for (let [i, , s] of r) {
    let a = n.get(i);
    a || (a = { id: i, parents: new Set() }, n.set(i, a));
    let p = n.get(s);
    p || (p = { id: s, parents: new Set() }, n.set(s, p)),
      e.branchIds.add(s),
      a?.parents.add(s);
  }
  return e;
}
var di = [["urn:r\xF3:rating:%E2%AD%90", O.NAME, "\u2B50"], [
  "urn:r\xF3:rating:%E2%AD%90%E2%AD%90",
  O.NAME,
  "\u2B50\u2B50",
], [
  "urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90",
  O.NAME,
  "\u2B50\u2B50\u2B50",
], [
  "urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
  O.NAME,
  "\u2B50\u2B50\u2B50\u2B50",
], [
  "urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
  O.NAME,
  "\u2B50\u2B50\u2B50\u2B50\u2B50",
]];
function gi(t) {
  let e = [Eu, Pu, Iu], r = [t];
  for (let n of e) {
    let i = [];
    for (let s of r) i.push(...n(s));
    r = [...i], i = [];
  }
  return r;
}
function vi(t) {
  Su(t), Du(t), Lu(t);
}
function Lu(t) {
  let e = _u(t);
  function r(i, s) {
    let a = [], p = e.nodes.get(s);
    if (!p) throw new Error(`no node in location tree for ${s}`);
    if (i.length > 5) throw new Error(`likely cycle; ${JSON.stringify(i)}`);
    if (p.parents.size === 0) {
      let f = [...i, s];
      for (let y = 0; y < f.length - 1; y++) {
        for (let v = y; v < f.length; v++) {
          let b = f[y], I = f[v];
          b !== I && (a.push([b, O.IN, I]), a.push([I, O.CONTAINS, b]));
        }
      }
    } else for (let f of p.parents) a.push(...r([...i, s], f));
    return a;
  }
  let n = [];
  for (let i of e.nodes.keys()) e.branchIds.has(i) || n.push(...r([], i));
  t.add(n);
}
function bi(t) {
  let e = [];
  for (let r of t) {
    e.push(`Parse warning @
${JSON.stringify(r.path, null, 2)}
: ${r.message}`);
  }
  console.warn(e.join(`
`)), console.trace();
}
var yr;
function wi(t) {
  return {
    lang: t?.lang ?? yr?.lang,
    message: t?.message,
    abortEarly: t?.abortEarly ?? yr?.abortEarly,
    abortPipeEarly: t?.abortPipeEarly ?? yr?.abortPipeEarly,
  };
}
var Ou;
function Mu(t) {
  return Ou?.get(t);
}
var Cu;
function Ru(t) {
  return Cu?.get(t);
}
var ju;
function Uu(t, e) {
  return ju?.get(t)?.get(e);
}
function $u(t) {
  let e = typeof t;
  return e === "string"
    ? `"${t}"`
    : e === "number" || e === "bigint" || e === "boolean"
    ? `${t}`
    : e === "object" || e === "function"
    ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null"
    : e;
}
function Ee(t, e, r, n, i) {
  let s = i && "input" in i ? i.input : r.value,
    a = i?.expected ?? t.expects ?? null,
    p = i?.received ?? $u(s),
    f = {
      kind: t.kind,
      type: t.type,
      input: s,
      expected: a,
      received: p,
      message: `Invalid ${e}: ${a ? `Expected ${a} but r` : "R"}eceived ${p}`,
      requirement: t.requirement,
      path: i?.path,
      issues: i?.issues,
      lang: n.lang,
      abortEarly: n.abortEarly,
      abortPipeEarly: n.abortPipeEarly,
    },
    y = t.kind === "schema",
    v = i?.message ?? t.message ?? Uu(t.reference, f.lang) ??
      (y ? Ru(f.lang) : null) ?? n.message ?? Mu(f.lang);
  v !== void 0 && (f.message = typeof v == "function" ? v(f) : v),
    y && (r.typed = !1),
    r.issues ? r.issues.push(f) : r.issues = [f];
}
function De(t) {
  return {
    version: 1,
    vendor: "valibot",
    validate(e) {
      return t["~run"]({ value: e }, wi());
    },
  };
}
function Nu(t, e) {
  let r = [...new Set(t)];
  return r.length > 1 ? `(${r.join(` ${e} `)})` : r[0] ?? "never";
}
function dr(t) {
  return {
    kind: "validation",
    type: "integer",
    reference: dr,
    async: !1,
    expects: null,
    requirement: Number.isInteger,
    message: t,
    "~run"(e, r) {
      return e.typed && !this.requirement(e.value) && Ee(this, "integer", e, r),
        e;
    },
  };
}
function gr(t) {
  return {
    kind: "transformation",
    type: "transform",
    reference: gr,
    async: !1,
    operation: t,
    "~run"(e) {
      return e.value = this.operation(e.value), e;
    },
  };
}
function vr(t) {
  return {
    kind: "validation",
    type: "url",
    reference: vr,
    async: !1,
    expects: null,
    requirement(e) {
      try {
        return new URL(e), !0;
      } catch {
        return !1;
      }
    },
    message: t,
    "~run"(e, r) {
      return e.typed && !this.requirement(e.value) && Ee(this, "URL", e, r), e;
    },
  };
}
function Vu(t, e, r) {
  return typeof t.fallback == "function" ? t.fallback(e, r) : t.fallback;
}
function Ai(t, e, r) {
  return typeof t.default == "function" ? t.default(e, r) : t.default;
}
function br() {
  return {
    kind: "schema",
    type: "any",
    reference: br,
    expects: "any",
    async: !1,
    get "~standard"() {
      return De(this);
    },
    "~run"(t) {
      return t.typed = !0, t;
    },
  };
}
function xr(t, e) {
  return {
    kind: "schema",
    type: "array",
    reference: xr,
    expects: "Array",
    async: !1,
    item: t,
    message: e,
    get "~standard"() {
      return De(this);
    },
    "~run"(r, n) {
      let i = r.value;
      if (Array.isArray(i)) {
        r.typed = !0, r.value = [];
        for (let s = 0; s < i.length; s++) {
          let a = i[s], p = this.item["~run"]({ value: a }, n);
          if (p.issues) {
            let f = {
              type: "array",
              origin: "value",
              input: i,
              key: s,
              value: a,
            };
            for (let y of p.issues) {
              y.path ? y.path.unshift(f) : y.path = [f], r.issues?.push(y);
            }
            if (r.issues || (r.issues = p.issues), n.abortEarly) {
              r.typed = !1;
              break;
            }
          }
          p.typed || (r.typed = !1), r.value.push(p.value);
        }
      } else Ee(this, "type", r, n);
      return r;
    },
  };
}
function wr(t) {
  return {
    kind: "schema",
    type: "number",
    reference: wr,
    expects: "number",
    async: !1,
    message: t,
    get "~standard"() {
      return De(this);
    },
    "~run"(e, r) {
      return typeof e.value == "number" && !isNaN(e.value)
        ? e.typed = !0
        : Ee(this, "type", e, r),
        e;
    },
  };
}
function Ar(t, e) {
  return {
    kind: "schema",
    type: "object",
    reference: Ar,
    expects: "Object",
    async: !1,
    entries: t,
    message: e,
    get "~standard"() {
      return De(this);
    },
    "~run"(r, n) {
      let i = r.value;
      if (i && typeof i == "object") {
        r.typed = !0, r.value = {};
        for (let s in this.entries) {
          let a = this.entries[s];
          if (
            s in i ||
            (a.type === "exact_optional" || a.type === "optional" ||
                a.type === "nullish") && a.default !== void 0
          ) {
            let p = s in i ? i[s] : Ai(a), f = a["~run"]({ value: p }, n);
            if (f.issues) {
              let y = {
                type: "object",
                origin: "value",
                input: i,
                key: s,
                value: p,
              };
              for (let v of f.issues) {
                v.path ? v.path.unshift(y) : v.path = [y], r.issues?.push(v);
              }
              if (r.issues || (r.issues = f.issues), n.abortEarly) {
                r.typed = !1;
                break;
              }
            }
            f.typed || (r.typed = !1), r.value[s] = f.value;
          } else if (a.fallback !== void 0) r.value[s] = Vu(a);
          else if (
            a.type !== "exact_optional" && a.type !== "optional" &&
            a.type !== "nullish" &&
            (Ee(this, "key", r, n, {
              input: void 0,
              expected: `"${s}"`,
              path: [{
                type: "object",
                origin: "key",
                input: i,
                key: s,
                value: i[s],
              }],
            }),
              n.abortEarly)
          ) break;
        }
      } else Ee(this, "type", r, n);
      return r;
    },
  };
}
function kr(t, e) {
  return {
    kind: "schema",
    type: "optional",
    reference: kr,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: e,
    get "~standard"() {
      return De(this);
    },
    "~run"(r, n) {
      return r.value === void 0 &&
          (this.default !== void 0 && (r.value = Ai(this, r, n)),
            r.value === void 0)
        ? (r.typed = !0, r)
        : this.wrapped["~run"](r, n);
    },
  };
}
function Tr(t) {
  return {
    kind: "schema",
    type: "string",
    reference: Tr,
    expects: "string",
    async: !1,
    message: t,
    get "~standard"() {
      return De(this);
    },
    "~run"(e, r) {
      return typeof e.value == "string" ? e.typed = !0 : Ee(this, "type", e, r),
        e;
    },
  };
}
function xi(t) {
  let e;
  if (t) { for (let r of t) e ? e.push(...r.issues) : e = r.issues; }
  return e;
}
function Ir(t, e) {
  return {
    kind: "schema",
    type: "union",
    reference: Ir,
    expects: Nu(t.map((r) => r.expects), "|"),
    async: !1,
    options: t,
    message: e,
    get "~standard"() {
      return De(this);
    },
    "~run"(r, n) {
      let i, s, a;
      for (let p of this.options) {
        let f = p["~run"]({ value: r.value }, n);
        if (f.typed) {
          if (f.issues) s ? s.push(f) : s = [f];
          else {
            i = f;
            break;
          }
        } else a ? a.push(f) : a = [f];
      }
      if (i) return i;
      if (s) {
        if (s.length === 1) return s[0];
        Ee(this, "type", r, n, { issues: xi(s) }), r.typed = !0;
      } else {
        if (a?.length === 1) return a[0];
        Ee(this, "type", r, n, { issues: xi(a) });
      }
      return r;
    },
  };
}
function ki(...t) {
  return {
    ...t[0],
    pipe: t,
    get "~standard"() {
      return De(this);
    },
    "~run"(e, r) {
      for (let n of t) {
        if (n.kind !== "metadata") {
          if (
            e.issues && (n.kind === "schema" || n.kind === "transformation")
          ) {
            e.typed = !1;
            break;
          }
          (!e.issues || !r.abortEarly && !r.abortPipeEarly) &&
            (e = n["~run"](e, r));
        }
      }
      return e;
    },
  };
}
function bt(t, e, r) {
  let n = t["~run"]({ value: e }, wi(r));
  return {
    typed: n.typed,
    success: !n.issues,
    output: n.value,
    issues: n.issues,
  };
}
var Ii = L(_());
var Ti = L(_());
function Xe(t) {
  return t === void 0 ? [] : Array.isArray(t) ? t : [t];
}
function C(t) {
  return Array.isArray(t) ? t[0] : t;
}
function xt(t) {
  let e = C(t.features), { id: r } = A(e);
  return Object.prototype.hasOwnProperty.call(it, r) ? it[r] : "\u{1F4CD}";
}
function qu(t) {
  let { id: e } = A(t);
  return Object.prototype.hasOwnProperty.call(it, e) ? it[e] : "\u{1F4CD}";
}
function $e(t) {
  return C(t.flag);
}
function Bu() {
  return "\u{1F424}";
}
function zu(t) {
  let { id: e } = A(t.id);
  return pi.has(e) ? "\u{1F4F7}" : fi.has(e) ? "\u{1F4F1}" : "\u{1F4F7}";
}
function wt(t, e, r) {
  let { type: n } = A(t);
  switch (n) {
    case S.PLACE:
      return xt(r);
    case S.COUNTRY:
      return $e(r);
    case S.BIRD:
      return Bu();
    case S.CAMERA:
      return zu(r);
    case S.PLACE_FEATURE:
      return qu(t);
    default:
      return "";
  }
}
function At() {
  return {
    view(t) {
      let { urn: e, thing: r } = t.attrs, { type: n, id: i } = A(e), s = i;
      if (Object.prototype.hasOwnProperty.call(r, "name")) {
        let p = C(r.name);
        p && (s = p);
      }
      let a = wt(e, s, r);
      return (0, Ti.default)("a", {
        href: e,
        onclick: Y(`/thing/${n}:${i}`),
        class: ["thing-link", `${n}-link`].join(" "),
      }, `${a}	${s}`);
    },
  };
}
function Je(t, e) {
  let { id: r, type: n } = A(e);
  return t.search({ source: { id: r, type: n } }).firstObject();
}
function Ei(t, e, r) {
  let n = Je(e, r);
  if (n) return t(e, n);
}
function Si(t, e) {
  let r = [];
  for (let n of e) {
    let i = Je(t, n);
    i && r.push(i);
  }
  return r;
}
var Di = function (t, e, r) {
  if (typeof t != "function") throw new Error("Parser must be a function");
  let n = [];
  for (let i of r) {
    let s = Je(e, i);
    if (!s) continue;
    let a = t(e, s);
    a && n.push(a);
  }
  return n;
};
function Er(t, e) {
  return t.search({ source: { type: e } }).objects().filter((n) =>
    Object.prototype.hasOwnProperty.call(n, "name")
  ).sort((n, i) => {
    let s = n.name, a = i.name, p = C(s), f = C(a);
    return p.localeCompare(f);
  });
}
function Pi(t, e) {
  return e.flatMap((r) => {
    if (!r) return [];
    let n = Je(t, r);
    return !n || !n.name ? [] : [(0, Ii.default)(At, { urn: r, thing: n })];
  });
}
function ce(t, e) {
  return (r, n) => {
    let i = bt(t, n);
    if (!i.success) {
      bi(i.issues);
      return;
    }
    return { ...i.output, type: e };
  };
}
function Sr(t) {
  return (e, r) => {
    let { type: n } = A(C(r.id)), i = t[n] ?? t.default;
    if (i) return i(e, r);
  };
}
function Fu(t) {
  return (e, r) => Ei(t, e, r);
}
function Hu(t) {
  if (typeof t != "function") throw new Error("Parser must be a function");
  return (e, r) => Di(t, e, r);
}
function ae(t) {
  return { one: Fu(t), many: Hu(t) };
}
var l = {
    string: Tr,
    array: xr,
    object: Ar,
    optional: kr,
    union: Ir,
    any: br,
    pipe: ki,
    url: vr,
    integer: dr,
    number: wr,
    transform: gr,
  },
  _i = l.object({
    name: l.string(),
    id: l.string(),
    trip: l.optional(l.string()),
    minDate: l.pipe(l.string(), l.transform(Number)),
    maxDate: l.pipe(l.string(), l.transform(Number)),
    thumbnailUrl: l.string(),
    mosaic: l.string(),
    photosCount: l.pipe(l.string(), l.transform(Number)),
    videosCount: l.pipe(l.string(), l.transform(Number)),
    country: l.union([l.string(), l.array(l.string())]),
    description: l.optional(l.string()),
    dateRange: l.string(),
    shortDateRange: l.string(),
  }),
  Li = l.object({
    id: l.string(),
    flag: l.optional(l.string()),
    name: l.string(),
    contains: l.optional(l.union([l.string(), l.array(l.string())])),
    in: l.optional(l.union([l.string(), l.array(l.string())])),
  }),
  Oi = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    longitude: l.optional(l.string()),
    latitude: l.optional(l.string()),
  }),
  Mi = l.object({
    id: l.string(),
    name: l.string(),
    features: l.optional(l.union([l.string(), l.array(l.string())])),
    in: l.optional(l.union([l.string(), l.array(l.string())])),
    shortName: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
    unescoId: l.optional(l.string()),
  }),
  Ci = l.object({
    albumId: l.string(),
    country: l.optional(l.union([l.string(), l.array(l.string())])),
    createdAt: l.string(),
    subject: l.optional(l.union([l.string(), l.array(l.string())])),
    exposureTime: l.optional(l.string()),
    fStop: l.optional(l.string()),
    focalLength: l.optional(l.string()),
    fullImage: l.string(),
    height: l.optional(l.string()),
    id: l.string(),
    iso: l.optional(l.string()),
    location: l.optional(l.union([l.string(), l.array(l.string())])),
    midImageLossyUrl: l.string(),
    model: l.optional(l.string()),
    mosaicColours: l.string(),
    pngUrl: l.string(),
    rating: l.string(),
    style: l.optional(l.string()),
    thumbnailUrl: l.string(),
    width: l.optional(l.string()),
    description: l.optional(l.string()),
    summary: l.optional(l.string()),
    contrastingGrey: l.string(),
  }),
  Ri = l.object({
    id: l.string(),
    name: l.string(),
    wikipedia: l.optional(l.string()),
  }),
  ji = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
  }),
  Ui = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
  }),
  $i = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
  }),
  Ni = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
  }),
  zl = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
  }),
  Vi = l.object({
    id: l.string(),
    name: l.optional(l.string()),
    wikipedia: l.optional(l.string()),
    birdwatchUrl: l.optional(l.union([l.string(), l.array(l.string())])),
  }),
  qi = l.object({
    id: l.string(),
    albumId: l.string(),
    description: l.string(),
    posterUrl: l.pipe(l.string(), l.url()),
    videoUrl1080p: l.pipe(l.string(), l.url()),
    videoUrl480p: l.pipe(l.string(), l.url()),
    videoUrl720p: l.pipe(l.string(), l.url()),
    videoUrlUnscaled: l.pipe(l.string(), l.url()),
  }),
  Bi = l.object({
    photos: l.pipe(l.number(), l.integer()),
    videos: l.pipe(l.number(), l.integer()),
    albums: l.pipe(l.number(), l.integer()),
    years: l.pipe(l.number(), l.integer()),
    countries: l.pipe(l.number(), l.integer()),
    bird_species: l.pipe(l.number(), l.integer()),
    mammal_species: l.pipe(l.number(), l.integer()),
    amphibian_species: l.pipe(l.number(), l.integer()),
    reptile_species: l.pipe(l.number(), l.integer()),
    unesco_sites: l.pipe(l.number(), l.integer()),
  }),
  zi = l.object({ id: l.string(), name: l.optional(l.string()) });
var Fi = ce(zi, "feature"),
  Dr = ce(Li, "country"),
  Pr = ce(Oi, "unesco"),
  Hi = ce(Ci, "photo"),
  Gu = ce(Vi, "bird"),
  _r = ce(Ri, "mammal"),
  Lr = ce(ji, "reptile"),
  Or = ce($i, "amphibian"),
  Mr = ce(Ni, "insect"),
  Cr = ce(Ui, "fish"),
  Gi = ce(qi, "video"),
  Rr = ce(Mi, "place"),
  Wi = ce(_i, "album"),
  Xi = Sr({
    [S.BIRD]: Gu,
    [S.MAMMAL]: _r,
    [S.REPTILE]: Lr,
    [S.AMPHIBIAN]: Or,
    [S.INSECT]: Mr,
    [S.FISH]: Cr,
  }),
  Ji = Sr({ [S.PLACE]: Rr, [S.COUNTRY]: Dr, [S.UNESCO]: Pr });
function Qi(t) {
  return bt(Bi, t).success ? t : void 0;
}
var { one: Yi, many: Ki } = ae(Dr),
  { one: Zi, many: ec } = ae(Rr),
  { one: es, many: kt } = ae(Ji),
  { one: ts, many: rs } = ae(Pr),
  { one: Tt, many: jr } = ae(Wi),
  { one: ns, many: tc } = ae(_r),
  { one: is, many: rc } = ae(Lr),
  { one: ss, many: nc } = ae(Mr),
  { one: ic, many: sc } = ae(Cr),
  { one: oc, many: os } = ae(Xi),
  { one: us, many: uc } = ae(Or),
  { one: as, many: It } = ae(Gi),
  { one: Qe, many: Pe } = ae(Hi),
  { one: ac, many: ls } = ae(Fi);
function xe(t) {
  let e = globalThis.innerWidth,
    r = globalThis.innerHeight,
    n = 400,
    i = Math.floor(e / n),
    s = Math.floor(r / n);
  return t > i * s + 1 ? "lazy" : "eager";
}
var Et = new Map();
function _e(t) {
  if (Et.has(t)) return Et.get(t);
  let e = t.split("#").map((i) => `#${i}`),
    r = window.document.createElement("canvas");
  r.width = 2, r.height = 2;
  let n = r.getContext("2d");
  if (!n) throw new Error("context missing");
  return n.fillStyle = e[1],
    n.fillRect(0, 0, 1, 1),
    n.fillStyle = e[2],
    n.fillRect(1, 0, 1, 1),
    n.fillStyle = e[3],
    n.fillRect(0, 1, 1, 1),
    n.fillStyle = e[4],
    n.fillRect(1, 1, 1, 1),
    Et.set(t, r.toDataURL("image/png")),
    Et.get(t);
}
function cs(t) {
  let e = t.search({ source: { type: "photo" } }).sources();
  return Pe(t, e).sort((r, n) => parseInt(n.createdAt) - parseInt(r.createdAt));
}
function ps(t, e) {
  let r = new Set(), n = new Set();
  for (let i of e) {
    let s = A(i),
      a = t.search({
        source: { type: s.type, id: s.id },
        relation: [O.LOCATION, O.SUBJECT],
      }).firstObject(!0);
    if (!a) continue;
    let p = a?.location ?? [], f = a?.subject ?? [];
    for (let y of p) r.add(y);
    for (let y of f) n.add(y);
  }
  return { subjects: os(t, n), locations: kt(t, r) };
}
function fs(t, e) {
  let r = new Set();
  for (let n of e) {
    let { type: i, id: s } = A(n),
      a = t.search({ source: { type: "photo" }, target: { type: i, id: s } })
        .sources();
    for (let p of a) r.add(p);
  }
  return Pe(t, r).sort((n, i) => parseInt(i.createdAt) - parseInt(n.createdAt));
}
function Wu(t, e) {
  let { type: r, id: n } = A(e),
    i = t.search({
      source: { type: "photo" },
      relation: "cover",
      target: { type: r, id: n },
    }).firstSource();
  return i ? Qe(t, i) : void 0;
}
function Xu(t, e) {
  let r = t.rating;
  return e.rating.toLocaleString().localeCompare(r.toLocaleString());
}
function ms(t, e) {
  let { type: r, id: n } = A(e), i = Wu(t, e);
  if (i) return i;
  let s = t.search({ source: { type: "photo" }, target: { type: r, id: n } })
      .sources(),
    a = Pe(t, new Set(s)).sort(Xu);
  return a.length > 0 ? a[0] : null;
}
function Ur(t) {
  return new Date(t.minDate).getFullYear();
}
function hs(t) {
  let e = t.search({ source: { type: S.ALBUM } }).sources();
  return jr(t, e).sort((r, n) => n.minDate - r.minDate);
}
function ys(t, e) {
  return t.search({
    source: { type: S.PHOTO },
    relation: O.ALBUM_ID,
    target: { id: A(e).id },
  }).sources();
}
function ds(t, e) {
  return Pe(t, ys(t, e));
}
function Ju(t, e) {
  return t.search({
    source: { type: S.VIDEO },
    relation: O.ALBUM_ID,
    target: { id: A(e).id },
  }).sources();
}
function gs(t, e) {
  return It(t, Ju(t, e));
}
function vs(t, e) {
  return ps(t, ys(t, e));
}
function bs(t, e) {
  let r = new Set();
  for (let i of e) {
    let { type: s, id: a } = A(i),
      p = t.search({ target: { type: s, id: a } }).sources();
    for (let f of p) r.add(f);
  }
  let n = new Set();
  for (let i of r) {
    let s = A(i),
      a = t.search({ source: { type: s.type, id: s.id }, relation: O.ALBUM_ID })
        .targets();
    for (let p of a) n.add(`urn:r\xF3:album:${p}`);
  }
  return jr(t, n);
}
var xs = new Map();
function ws(t, e) {
  let r = new Set();
  if (e.size === 0) return r;
  for (let i of e) {
    if (xs.has(i)) {
      let s = xs.get(i);
      s && r.add(s);
    }
  }
  if (r.size === e.size) return r;
  let n = t.search({ relation: O.NAME, target: Array.from(e) });
  for (let [i, s, a] of n.triples()) e.has(a) && r.add(i);
  return r;
}
async function Qu() {
  let t = {},
    e = await oi(
      `/manifest/tribbles.${window.envConfig.publication_id}.txt`,
      t,
      gi,
    );
  return vi(e), e.add(di), e;
}
function Yu(t) {
  return {
    readThing: t.readThing,
    readAlbum: Tt.bind(null, t),
    readCountry: Yi.bind(null, t),
    readPlace: Zi.bind(null, t),
    readPhoto: Qe.bind(null, t),
    readMammal: ns.bind(null, t),
    readReptile: is.bind(null, t),
    readAmphibian: us.bind(null, t),
    readInsect: ss.bind(null, t),
    readVideo: as.bind(null, t),
    readLocation: es.bind(null, t),
    readUnesco: ts.bind(null, t),
    readLocations: kt.bind(null, t),
    readFeatures: ls.bind(null, t),
    readPhotos: Pe.bind(null, t),
    readUnescos: rs.bind(null, t),
    readThings: Si.bind(null, t),
    readCountries: Ki.bind(null, t),
    namesToUrns: ws.bind(null, t),
    readThingCover: ms.bind(null, t),
    readPhotosByThingIds: fs.bind(null, t),
    readAlbumsByThingIds: bs.bind(null, t),
    toThingLinks: Pi.bind(null, t),
  };
}
async function As() {
  let t = await Qu();
  return {
    currentAlbum: void 0,
    currentPhoto: void 0,
    currentUrn: void 0,
    currentType: void 0,
    data: t,
    darkMode: Jn(),
    sidebarVisible: !1,
    services: Yu(t),
  };
}
var we = L(_());
function st() {
  return {
    view(t) {
      return (0, we.default)("li", {
        class: "sidebar-item",
        onclick: Y(t.attrs.route),
      }, t.attrs.name);
    },
  };
}
function Ae() {
  function t(e) {
    let r = ["photo-sidebar"];
    return e && r.push("sidebar-visible"), r.join(" ");
  }
  return {
    view(e) {
      return (0, we.default)("aside", { class: t(e.attrs.visible) }, [
        (0, we.default)("nav", [
          (0, we.default)("ul", [
            (0, we.default)(st, { name: "PHOTOS", route: "/photos" }),
            (0, we.default)(st, { name: "VIDEOS", route: "/videos" }),
            (0, we.default)(st, { name: "ALBUMS", route: "/albums" }),
            (0, we.default)(st, { name: "LISTINGS", route: "/listings" }),
            (0, we.default)(st, { name: "ABOUT", route: "/about" }),
          ]),
        ]),
      ]);
    },
  };
}
var he = L(_());
var ge = L(_());
function ks() {
  let t = Qi(window.stats);
  return {
    view() {
      return t
        ? (0, ge.default)("p.photo-stats", [
          `${t.photos} `,
          (0, ge.default)("a", { href: "#/photos" }, "photos"),
          " \xB7 ",
          `${t.videos} `,
          (0, ge.default)("a", { href: "#/videos" }, "videos"),
          " \xB7 ",
          `${t.albums} albums \xB7 ${t.years} years \xB7 `,
          `${t.countries} `,
          (0, ge.default)("a", { href: "#/listing/country" }, "countries"),
          " \xB7 ",
          `${t.bird_species} `,
          (0, ge.default)("a", { href: "#/listing/bird" }, "bird species"),
          " \xB7 ",
          `${t.mammal_species} `,
          (0, ge.default)("a", { href: "#/listing/mammal" }, "mammal species"),
          " \xB7 a few ",
          (0, ge.default)("a", { href: "#/listing/amphibian" }, "amphibians"),
          " and ",
          (0, ge.default)("a", { href: "#/listing/reptile" }, "reptiles"),
          " \xB7 ",
          `${t.unesco_sites} `,
          (0, ge.default)("a", { href: "#/thing/unesco:*" }, "UNESCO sites"),
        ])
        : (0, ge.default)("p");
    },
  };
}
var Oe = L(_());
function Dt(t = 500) {
  return globalThis.matchMedia(`(max-width: ${t}px)`).matches;
}
function Le(t) {
  document.title = t;
}
function Pt() {
  return {
    view(t) {
      let {
          title: e,
          minDate: r,
          maxDate: n,
          count: i,
          countryLinks: s,
          dateRange: a,
          shortDateRange: p,
        } = t.attrs,
        f = i === 1 ? "photo" : "photos",
        v = Dt(500) ? p : a;
      return (0, Oe.default)("div.photo-album-metadata", [
        (0, Oe.default)("p.photo-album-title", e),
        (0, Oe.default)("p.photo-album-date", [(0, Oe.default)("time", v)]),
        (0, Oe.default)("div.photo-metadata-inline", [
          (0, Oe.default)("p.photo-album-count", `${i} ${f}`),
          (0, Oe.default)("p.photo-album-countries", s),
        ]),
      ]);
    },
  };
}
var at = L(_());
var ve = L(_());
var ut = L(_());
function Ku() {
  return {
    view(t) {
      let { colour: e } = t.attrs;
      return (0, ut.default)("svg.photo-icon", {
        height: 40,
        width: 40,
        preserveAspectRatio: "xMinYMin",
        viewBox: "-2 -2 24 24",
        xmlns: "http://www.w3.org/2000/svg",
      }, [(0, ut.default)("path", {
        d: "m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
        fill: e,
      })]);
    },
  };
}
function Ts() {
  return {
    view(t) {
      let { id: e, colour: r } = t.attrs;
      return (0, ut.default)("div.photo-metadata-popover", {
        onclick: () => le("navigate", { route: `/photo/${e}` }),
      }, (0, ut.default)(Ku, { colour: r }));
    },
  };
}
function Zu(t, e) {
  le("photo_loaded", { url: t });
  let r = e.target?.parentNode?.querySelector(".thumbnail-placeholder");
  r && (r.style.zIndex = "-1");
}
function ea() {
  return {
    view(t) {
      let { thumbnailUrl: e, loading: r, onclick: n } = t.attrs;
      return (0, ve.default)("img.thumbnail-image", {
        onload: Zu.bind(null, e),
        width: 400,
        height: 400,
        src: e,
        loading: r,
        onclick: n,
      });
    },
  };
}
function ta() {
  return {
    view(t) {
      let { thumbnailDataUrl: e } = t.attrs;
      return (0, ve.default)(
        "img.u-photo.thumbnail-image.thumbnail-placeholder",
        { width: 400, height: 400, src: e },
      );
    },
  };
}
function $r() {
  return {
    view(t) {
      let {
        imageUrl: e,
        thumbnailUrl: r,
        thumbnailDataUrl: n,
        loading: i,
        onclick: s,
      } = t.attrs;
      return (0, ve.default)("a", {
        href: e,
        target: "_blank",
        rel: "external",
      }, [
        (0, ve.default)(ta, { thumbnailDataUrl: n }),
        (0, ve.default)(ea, { thumbnailUrl: r, loading: i, onclick: s }),
      ]);
    },
  };
}
function ra(t) {
  return t.startsWith("urn:") ? nt(t).id : t;
}
function Me() {
  return {
    view(t) {
      let { photo: e, loading: r, interactive: n } = t.attrs,
        i = ra(e.id),
        { fullImage: s, thumbnailUrl: a, mosaicColours: p } = e,
        f = _e(p),
        y = (0, ve.default)(Ts, { id: i, colour: e.contrastingGrey }),
        v = (0, ve.default)($r, {
          imageUrl: e.fullImage,
          thumbnailUrl: a,
          thumbnailDataUrl: f,
          loading: r,
          onclick: () => {
            window.location.href = s;
          },
        });
      return (0, ve.default)(
        "div",
        (0, ve.default)("div.photo", {}, [
          (0, ve.default)("a", { onclick: Ie }, n ? [y, v] : [v]),
        ]),
      );
    },
  };
}
var Nr = [];
function na() {
  return {
    view(t) {
      let { trip: e } = t.attrs;
      if (!e) return null;
      Nr.includes(e) || Nr.push(e);
      let r = Nr.indexOf(e);
      return (0, at.default)("div.trip-tag .trip-color-" + r % 2);
    },
  };
}
function Ye() {
  return {
    view(t) {
      let {
        imageUrl: e,
        thumbnailUrl: r,
        thumbnailDataUrl: n,
        loading: i,
        child: s,
        minDate: a,
        onclick: p,
        trip: f,
      } = t.attrs;
      return (0, at.default)("div.photo-album", { "data-min-date": a }, [
        (0, at.default)(na, { trip: f }),
        (0, at.default)($r, {
          imageUrl: e,
          thumbnailUrl: r,
          thumbnailDataUrl: n,
          loading: i,
          onclick: p,
        }),
        s,
      ]);
    },
  };
}
var _t = L(_());
function Vr(t) {
  let { type: e, id: r } = A(t);
  return `#/thing/${e}:${r}`;
}
function Ke() {
  return {
    view(t) {
      let { country: e, mode: r } = t.attrs, { id: n, name: i } = e;
      if (!n) return (0, _t.default)("p");
      let s = $e(e), a = A(n), p = Y(`/thing/${a.type}:${a.id}`);
      return r === "flag"
        ? (0, _t.default)(
          "a.country-link-short",
          { href: Vr(n), onclick: p },
          s,
        )
        : (0, _t.default)(
          "a.country-link",
          { href: Vr(n), onclick: p },
          `${s} ${i}`,
        );
    },
  };
}
function Ne(t) {
  return t === void 0 ? new Set() : new Set(Array.isArray(t) ? t : [t]);
}
function lt(t, e) {
  let r = new Set();
  for (let n of e) {
    if (t in n) {
      let i = n[t];
      if (i === void 0) continue;
      if (Array.isArray(i)) { for (let s of i) r.add(s); }
      else r.add(i);
    }
  }
  return r;
}
function ia(t, e, r) {
  let n = A(t);
  le("navigate", { route: `/album/${n.id}`, title: e }), Ie(r);
}
function sa(t, e, r, n) {
  let i = xe(r), s = [];
  if (
    t.year !== Ur(e) && (t.year = Ur(e), t.year !== new Date().getFullYear())
  ) {
    let y = (0, he.default)(
      "h2.album-year-heading",
      { key: `year-${t.year}` },
      t.year.toString(),
    );
    s.push(y);
  }
  let a = n.readCountries(Ne(e.country)).map((y) =>
      (0, he.default)(Ke, {
        country: y,
        key: `album-country-${e.id}-${y.id}`,
        mode: "flag",
      })
    ),
    p = (0, he.default)(Pt, {
      title: e.name,
      minDate: e.minDate,
      maxDate: e.maxDate,
      count: e.photosCount,
      countryLinks: a,
      services: n,
      dateRange: e.dateRange,
      shortDateRange: e.shortDateRange,
    }),
    f = (0, he.default)(Ye, {
      trip: e.trip,
      imageUrl: e.thumbnailUrl,
      thumbnailUrl: e.thumbnailUrl,
      thumbnailDataUrl: _e(e.mosaic),
      loading: i,
      minDate: e.minDate,
      onclick: ia.bind(null, e.id, e.name),
    });
  return s.push((0, he.default)("div", { key: `album-${e.id}` }, [f, p])), s;
}
function oa() {
  return {
    view(t) {
      let e = { year: 2005 }, { albums: r, services: n } = t.attrs, i = [];
      for (let s = 0; s < r.length; s++) i.push(...sa(e, r[s], s, n));
      return (0, he.default)("section.album-container", i);
    },
  };
}
function Es() {
  return {
    oninit() {
      Le("Albums - photos");
    },
    view(t) {
      let { albums: e, services: r } = t.attrs,
        n = (0, he.default)("section.album-metadata", [
          (0, he.default)("h1.albums-header", "Albums"),
          (0, he.default)(ks),
        ]);
      return (0, he.default)("div.page", [
        n,
        (0, he.default)(oa, { albums: e, services: r }),
      ]);
    },
  };
}
var pe = L(_());
function Ss() {
  return {
    oninit() {
      Le("About - photos");
    },
    view() {
      let t = new Date().getFullYear() - 2012;
      return (0, pe.default)("div.page", [
        (0, pe.default)("section.about-page", [
          (0, pe.default)("h1", "About"),
          (0, pe.default)(
            "p",
            `I started taking photos ${t} years ago, and have taken a lot of photos since. I've become, in my opinion, a reasonable wildlife photographer (though hit-or-miss at other styles of photography). I built this website to share the things`,
            (0, pe.default)("a", {
              href: "https://photos.rgrannell.xyz/#/thing/rating:4",
              onclick: Y("/thing/rating:4"),
            }, " I found beautiful in this world."),
          ),
          (0, pe.default)("h2", "Can I use the photos on this site?"),
          (0, pe.default)(
            "p",
            "You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not.",
          ),
          (0, pe.default)("h2", "Can I use data from this site to train AI?"),
          (0, pe.default)(
            "p",
            "No, absolutely not. The ",
            (0, pe.default)("a", {
              href: "http://photos.rgrannell.xyz/robots.txt",
            }, "robots.txt"),
            " file for this site explicitly prohibits this.",
          ),
          (0, pe.default)("h2", "What is your contact information?"),
          (0, pe.default)(
            "p",
            "See ",
            (0, pe.default)(
              "a",
              { href: "https://rgrannell.xyz/" },
              "my personal site",
            ),
            " for contact details.",
          ),
        ]),
      ]);
    },
  };
}
var Ve = L(_());
var ke = L(_());
function Lt() {
  return {
    view(t) {
      let { preload: e, video: r } = t.attrs;
      if (!r) return (0, ke.default)("div", "No video");
      let {
          posterUrl: n,
          videoUrl1080p: i,
          videoUrl480p: s,
          videoUrl720p: a,
          videoUrlUnscaled: p,
        } = r,
        f = (0, ke.default)("source", { src: s, type: "video/mp4" }),
        y = (0, ke.default)("ul", [
          (0, ke.default)("a", { href: p }, "[L]"),
          (0, ke.default)("a", { href: i }, "[M]"),
          (0, ke.default)("a", { href: a }, "[S]"),
          (0, ke.default)("a", { href: s }, "[XS]"),
        ]);
      return (0, ke.default)("div", { key: `video-${r.id}` }, [
        (0, ke.default)("video.thumbnail-video", {
          controls: !0,
          preload: e,
          poster: n,
        }, f),
        y,
      ]);
    },
  };
}
function Ds() {
  return {
    view(t) {
      let { videos: e } = t.attrs,
        r = e.length === 1 ? "1 video" : `${e.length} videos`,
        n = e.map((i) => (0, Ve.default)(Lt, { video: i, preload: "auto" }));
      return (0, Ve.default)(
        "div.page",
        (0, Ve.default)("section.photos-metadata", [
          (0, Ve.default)("h1", "Videos"),
          (0, Ve.default)("p.photo-album-count", r),
        ]),
        (0, Ve.default)("section.photo-container", n),
      );
    },
  };
}
function Ps(t) {
  let e = t.search({ source: { type: "video" } }).sources();
  return It(t, e);
}
var ne = L(_());
function _s(t) {
  let e = new Date(parseInt(t)),
    r = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  return e.toLocaleDateString("en-US", r);
}
function Ls(t, e, r) {
  if (!t && !e) return "unknown date";
  let n = t instanceof Date ? t : new Date(t),
    i = e instanceof Date ? e : new Date(e);
  if (r) {
    let s = { day: "numeric", month: "short" },
      a = n.toLocaleDateString("en-IE", s),
      p = i.toLocaleDateString("en-IE", s),
      f = n.toLocaleDateString("en-IE", { day: "numeric" }),
      y = i.toLocaleDateString("en-IE", { day: "numeric" }),
      v = n.toLocaleDateString("en-IE", { month: "short" }),
      b = i.toLocaleDateString("en-IE", { month: "short" }),
      I = n.getFullYear(),
      w = i.getFullYear(),
      $ = v === b,
      ie = I === w;
    return a === p
      ? `${a} ${I}`
      : $ && ie
      ? `${f} - ${y} ${b} ${I}`
      : `${a} ${I} - ${p} ${w}`;
  } else {
    let s = { year: "numeric", month: "short", day: "numeric" },
      a = n.toLocaleDateString("en-IE", s),
      p = i.toLocaleDateString("en-IE", s);
    return a === p ? a : `${a} \u2014 ${p}`;
  }
}
var Ms = L(_());
function ua(t) {
  t.includes("Shared canceled") || alert(t);
}
async function aa(t, e, r) {
  if (!navigator.share) {
    ua("navigator.share not available");
    return;
  }
  try {
    await navigator.share({ title: `${r} - photos.rgrannell.xyz`, url: e });
  } catch (n) {
    console.error("Error sharing:", n);
  } finally {
    t.sharing = !1;
  }
}
function la(t) {
  return t.sharing ? "[sharing...]" : "[share]";
}
function Cs() {
  let t = { sharing: !1 };
  return {
    view(e) {
      let { url: r, name: n } = e.attrs;
      return (0, Ms.default)("button.photo-share-button", {
        disabled: !navigator.share,
        onclick: aa.bind(null, t, r, n),
      }, la(t));
    },
  };
}
var Rs = L(_());
function js() {
  return {
    view() {
      return (0, Rs.default)(
        "a",
        { href: "/albums", onclick: Y("/albums") },
        "[albums]",
      );
    },
  };
}
function qe(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ot(t) {
  return fr.has(t) ? fr.get(t) : t + "s";
}
function Us(t) {
  let e = t.replace(/-/g, " ");
  return qe(e);
}
function Mt(t) {
  return t.replace(/\\"/g, '"');
}
function $s() {
  return {
    oninit() {
      Le("Album - photos");
    },
    view(t) {
      let { album: e, photos: r, videos: n, services: i } = t.attrs,
        {
          name: s,
          minDate: a,
          maxDate: p,
          photosCount: f,
          description: y,
          country: v,
        } = e,
        b = Ls(a, p, Dt(500)),
        I = f === 1 ? "1 photo" : `${f} photos`,
        w = i.readCountries(i.namesToUrns(Ne(v))).map((T) =>
          (0, ne.default)(Ke, { country: T, mode: "flag" })
        ),
        { id: $ } = A(e.id),
        ie = `https://sharephoto.rgrannell.xyz/album/${$}`,
        W = (0, ne.default)("section.photos-metadata", [
          (0, ne.default)("h1", s),
          (0, ne.default)("p.photo-album-date", (0, ne.default)("time", b)),
          (0, ne.default)("p.photo-album-count", I),
          (0, ne.default)("p.photo-album-countries", w),
          (0, ne.default)(
            "p.photo-album-description",
            ne.default.trust(Mt(y ?? "") ?? ""),
          ),
          (0, ne.default)(Cs, { url: ie, name: s }),
          " ",
          (0, ne.default)(js),
          " ",
        ]),
        ee = r.map((T, E) =>
          (0, ne.default)(Me, { photo: T, loading: xe(E), interactive: !0 })
        ),
        R = n.map((T) => (0, ne.default)(Lt, { video: T, preload: "auto" }));
      return (0, ne.default)(
        "div.page",
        W,
        (0, ne.default)("section.photo-container", ee),
        (0, ne.default)("section.video-container", R),
      );
    },
  };
}
var Ce = L(_());
function ca() {
  return {
    view(t) {
      let { photos: e } = t.attrs;
      return (0, Ce.default)(
        "section.photo-container",
        e.map((r, n) => {
          let i = xe(n);
          return (0, Ce.default)(Me, {
            key: `photo-${r.id}`,
            photo: r,
            loading: i,
            interactive: !0,
          });
        }),
      );
    },
  };
}
function Ns() {
  return {
    view(t) {
      let { photos: e } = t.attrs,
        r = `${e.length} photo${e.length === 1 ? "" : "s"}`,
        n = (0, Ce.default)("section.photos-metadata", [
          (0, Ce.default)("h1", "Photos"),
          (0, Ce.default)("p.photo-album-count", r),
        ]);
      return (0, Ce.default)("div.page", [
        n,
        (0, Ce.default)(ca, { photos: e }),
      ]);
    },
  };
}
var me = L(_());
var Vs = L(_());
function qs() {
  return {
    view(t) {
      let { id: e } = t.attrs;
      return (0, Vs.default)("a", {
        href: `#/album/${e}`,
        onclick: Y(`/album/${e}`),
      }, "[album]");
    },
  };
}
var D = L(_());
function Be() {
  return {
    view(t) {
      let { text: e } = t.attrs;
      return (0, D.default)("th.exif-heading", e);
    },
  };
}
function pa() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs, n = r.toThingLinks([e.model]);
      return n.length > 0
        ? (0, D.default)("td", n)
        : (0, D.default)("td", "Unknown");
    },
  };
}
function fa() {
  return {
    view(t) {
      let { photo: e } = t.attrs;
      return typeof e.width == "string" && typeof e.height == "string"
        ? (0, D.default)("td", `${e.width} x ${e.height}`)
        : (0, D.default)("td", "Unknown");
    },
  };
}
function ma() {
  return {
    view(t) {
      let { photo: e } = t.attrs;
      return e.focalLength === "Unknown"
        ? (0, D.default)("td", "Unknown")
        : e.focalLength === "0"
        ? (0, D.default)("td", "Manual lens")
        : e.focalLength
        ? (0, D.default)("td", `${e.focalLength}mm`)
        : (0, D.default)("td", "Unknown");
    },
  };
}
function ha() {
  return {
    view(t) {
      let { photo: e } = t.attrs, { exposureTime: r } = e;
      if (typeof r == "string") {
        let n = parseFloat(r);
        return isNaN(n)
          ? (0, D.default)("td", "Unknown")
          : n >= 1
          ? (0, D.default)("td", `${n} s`)
          : (0, D.default)("td", `1/${Math.round(1 / n)} s`);
      }
      return (0, D.default)("td", "Unknown");
    },
  };
}
function ya() {
  return {
    view(t) {
      let { photo: e } = t.attrs;
      return e.fStop === "Unknown"
        ? (0, D.default)("td", "Unknown")
        : e.fStop === "0.0"
        ? (0, D.default)("td", "Manual aperture control")
        : e.fStop
        ? (0, D.default)("td", `\u0192/${e.fStop}`)
        : (0, D.default)("td", "Unknown");
    },
  };
}
function Bs() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs,
        n = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Date-Time" }),
          (0, D.default)("td", (0, D.default)("time", _s(e.createdAt))),
        ]),
        i = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Camera Model" }),
          (0, D.default)(pa, { photo: e, services: r }),
        ]),
        s = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Dimensions" }),
          (0, D.default)(fa, { photo: e, services: r }),
        ]),
        a = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Focal Length" }),
          (0, D.default)(ma, { photo: e, services: r }),
        ]),
        p = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Shutter Speed" }),
          (0, D.default)(ha, { photo: e, services: r }),
        ]),
        f = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "Aperture" }),
          (0, D.default)(ya, { photo: e, services: r }),
        ]),
        y = (0, D.default)("tr", [
          (0, D.default)(Be, { text: "ISO" }),
          (0, D.default)("td", e.iso ?? "Unknown"),
        ]);
      return (0, D.default)("table.metadata-table", [n, i, s, a, p, f, y]);
    },
  };
}
var B = L(_());
function Ze() {
  return {
    view(t) {
      let { text: e } = t.attrs;
      return (0, B.default)("th.exif-heading", e);
    },
  };
}
function da() {
  return {
    view(t) {
      let { photo: e } = t.attrs, r = Mt(e.description ?? e.summary ?? "");
      return r
        ? (0, B.default)("td", B.default.trust(r))
        : (0, B.default)("td", "\u2014");
    },
  };
}
function ga() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs,
        n = r.toThingLinks(Xe(e.location));
      return (0, B.default)("td", n.length > 0 ? n : "\u2014");
    },
  };
}
function va() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs, n = r.toThingLinks([e.rating]);
      return (0, B.default)("td", n.length > 0 ? n : "\u2014");
    },
  };
}
function ba() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs, n = r.toThingLinks([e.style]);
      return (0, B.default)("td", n.length > 0 ? n : "\u2014");
    },
  };
}
function xa() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs,
        n = r.toThingLinks(Xe(e.subject));
      return (0, B.default)("td", n.length > 0 ? n : "\u2014");
    },
  };
}
function wa() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs,
        n = r.toThingLinks(Xe(e.country));
      return (0, B.default)("td", n.length > 0 ? n : "\u2014");
    },
  };
}
function zs() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs, n = [];
      return (e.description || e.summary) &&
        n.push(
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Description" }),
            (0, B.default)(da, { photo: e, services: r }),
          ]),
        ),
        n.push(
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Country" }),
            (0, B.default)(wa, { photo: e, services: r }),
          ]),
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Location" }),
            (0, B.default)(ga, { photo: e, services: r }),
          ]),
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Rating" }),
            (0, B.default)(va, { photo: e, services: r }),
          ]),
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Style" }),
            (0, B.default)(ba, { photo: e, services: r }),
          ]),
          (0, B.default)("tr", [
            (0, B.default)(Ze, { text: "Subject" }),
            (0, B.default)(xa, { photo: e, services: r }),
          ]),
        ),
        (0, B.default)("table.metadata-table", n);
    },
  };
}
function Fs() {
  return {
    view(t) {
      let { photo: e, services: r } = t.attrs,
        n = (0, me.default)("li.link-list", [
          (0, me.default)(
            "a",
            { href: e.fullImage, rel: "noreferrer" },
            "[webp]",
          ),
          " ",
          (0, me.default)("a", { href: e.pngUrl, rel: "noreferrer" }, "[png]"),
          " ",
          (0, me.default)(qs, { id: e.albumId }),
        ]),
        i = (0, me.default)(Bs, { photo: e, services: r }),
        s = (0, me.default)(zs, { photo: e, services: r });
      return (0, me.default)("section", [
        (0, me.default)("h1", "Photo"),
        (0, me.default)(Me, { photo: e, loading: "eager", interactive: !1 }),
        n,
        (0, me.default)(
          "div.page",
          (0, me.default)("h3", "Photo Information"),
          s,
          (0, me.default)("h3", "Exif Data"),
          i,
        ),
      ]);
    },
  };
}
var ye = L(_());
var Rt = L(_());
var ze = L(_());
var Hs = L(_());
function qr() {
  return {
    view(t) {
      let { href: e, text: r } = t.attrs;
      return (0, Hs.default)("a", {
        href: e,
        target: "_blank",
        rel: "noopener",
      }, r);
    },
  };
}
function Ct() {
  return {
    view(t) {
      let { things: e } = t.attrs;
      if (e.length !== 1) return (0, ze.default)("ul");
      let [r] = e, n = [], i = C(r.wikipedia);
      i &&
        n.push(
          (0, ze.default)(
            "li",
            (0, ze.default)(qr, { href: i, text: "[wikipedia]" }),
          ),
        );
      let s = C(r.birdwatchUrl);
      return s &&
        n.push(
          (0, ze.default)(
            "li",
            (0, ze.default)(qr, { href: s, text: "[birdwatch]" }),
          ),
        ),
        (0, ze.default)("ul.link-list", n);
    },
  };
}
function Gs() {
  let t = new Set([S.AMPHIBIAN, S.REPTILE, S.INSECT, S.FISH, S.MAMMAL]);
  return {
    view(e) {
      let { thing: r } = e.attrs,
        { type: n } = A(C(r.id)),
        i = (0, Rt.default)(Ct, { things: [r] }),
        s = n === S.COUNTRY ? `${$e(r)} ${C(r.name)}` : C(r.name);
      return (0, Rt.default)("div.photo-album-metadata", [
        (0, Rt.default)("p.photo-album-title", s),
        i,
      ]);
    },
  };
}
function Aa(t, e, r) {
  let n = C(e.id);
  if (!n) return [];
  let i = t.readThingCover(n);
  if (!i) return [];
  let s = (0, ye.default)(Gs, { thing: e }), { id: a, type: p } = A(n);
  return [
    (0, ye.default)(Ye, {
      imageUrl: i.fullImage,
      thumbnailUrl: i.thumbnailUrl,
      thumbnailDataUrl: _e(i?.mosaicColours),
      loading: xe(r),
      trip: void 0,
      child: s,
      onclick: Y(`/thing/${p}:${a}`),
    }),
  ];
}
function ka() {
  return {
    view(t) {
      let { services: e, things: r } = t.attrs,
        n = r.flatMap((
          i,
          s,
        ) => (console.log("Drawing album for thing:", i), Aa(e, i, s)));
      return (0, ye.default)("section.album-container", n);
    },
  };
}
function Ta() {
  return {
    view(t) {
      let { type: e } = t.attrs;
      return (0, ye.default)("h1.albums-header", `${qe(Ot(e))}`);
    },
  };
}
function Ia() {
  return {
    view(t) {
      let { type: e } = t.attrs;
      return (0, ye.default)("a", {
        href: `#/thing/${e}:*`,
        onclick: Y(`/thing/${e}:*`),
      }, `See all ${e} photos`);
    },
  };
}
function Ws() {
  return {
    view(t) {
      let { type: e, things: r, services: n } = t.attrs,
        i = [(0, ye.default)(Ta, { type: e })];
      return ui.has(e) ||
        i.push(
          (0, ye.default)("section.album-metadata", [
            (0, ye.default)(Ia, { type: e }),
          ]),
        ),
        (0, ye.default)("div.page", [
          (0, ye.default)("section.album-metadata", i),
          (0, ye.default)(ka, { services: n, things: r }),
        ]);
    },
  };
}
var fe = L(_());
function Fe() {
  return {
    view(t) {
      return (0, fe.default)(
        "li",
        (0, fe.default)("a", {
          class: "listing-item",
          onclick: Y(t.attrs.route),
        }, t.attrs.name),
      );
    },
  };
}
function Xs() {
  return {
    view() {
      return (0, fe.default)("div.page", [
        (0, fe.default)("h1", "Listings"),
        (0, fe.default)(
          "section",
          (0, fe.default)("ul", [
            (0, fe.default)(Fe, { route: "/listing/place", name: "Places" }),
            (0, fe.default)(Fe, {
              route: "/listing/country",
              name: "Countries",
            }),
            (0, fe.default)(Fe, { route: "/listing/bird", name: "Birds" }),
            (0, fe.default)(Fe, { route: "/listing/mammal", name: "Mammals" }),
            (0, fe.default)(Fe, {
              route: "/listing/reptile",
              name: "Reptiles",
            }),
            (0, fe.default)(Fe, {
              route: "/listing/amphibian",
              name: "Amphibians",
            }),
            (0, fe.default)(Fe, { route: "/listing/insect", name: "Insects" }),
          ]),
        ),
      ]);
    },
  };
}
var N = L(_());
var jt = L(_());
function Ea(t, e) {
  let r = nt(t);
  if (r.id === "*") return qe(Ot(r.type));
  if (e.length === 0) return t;
  let [n] = e, i = C(n.name) ?? r.id;
  return r.type === S.COUNTRY
    ? `${$e(n)} ${i}`
    : r.type === S.PLACE
    ? `${xt(n)} ${i}`
    : i;
}
function Js() {
  return {
    view(t) {
      let { urn: e, things: r } = t.attrs, n = Ea(e, r);
      return Le(n), (0, jt.default)("h1", n);
    },
  };
}
function Qs() {
  return {
    view(t) {
      let e = A(t.attrs.urn);
      return mi.has(e.type) && e.id !== "*"
        ? (0, jt.default)("span", {
          class: `thing-binomial ${e.type}-binomial`,
        }, Us(e.id))
        : (0, jt.default)("span");
    },
  };
}
var Ut = L(_());
function Br() {
  return {
    view(t) {
      let { urns: e, services: r } = t.attrs,
        i = r.readLocations(e).sort((s, a) =>
          (C(s.name) ?? "").localeCompare(C(a.name) ?? "")
        ).map((s) => {
          let a = (0, Ut.default)(At, { urn: C(s.id), thing: s });
          return (0, Ut.default)("li", { key: `place-${s.id}` }, a);
        });
      return (0, Ut.default)("ul", i);
    },
  };
}
var Ys = L(_());
function Sa(t, e) {
  le("navigate", { route: `/listing/${t}` }), Ie(e);
}
function Ks() {
  return {
    view(t) {
      let e = "";
      return "type" in t.attrs ? e = t.attrs.type : e = A(t.attrs.urn).type,
        (0, Ys.default)("a", {
          href: `#/listing/${e}`,
          onclick: Sa.bind(null, e),
        }, qe(e));
    },
  };
}
var $t = L(_());
var Zs = L(_());
function eo() {
  return {
    view(t) {
      let { urn: e, thing: r } = t.attrs,
        { type: n, id: i } = A(e),
        s = C(r.name) ?? i,
        p = `${wt(e, s, r)}	${s}`;
      return (0, Zs.default)("p", {
        class: ["thing-link", `${n}-link`].join(" "),
      }, p);
    },
  };
}
function to() {
  return {
    view(t) {
      let { urns: e, services: r } = t.attrs,
        i = r.readFeatures(e).map((s) => {
          let a = C(s.id);
          return (0, $t.default)(
            "li",
            { key: `feature-${a}` },
            (0, $t.default)(eo, { urn: a, thing: s }),
          );
        });
      return (0, $t.default)("ul", i);
    },
  };
}
var Nt = L(_());
var ro = L(_());
function no() {
  return {
    view(t) {
      let { urn: e, thing: r } = t.attrs,
        { type: n, id: i } = A(e),
        s = C(r.name) ?? i;
      return (0, ro.default)("a", {
        href: `https://whc.unesco.org/en/list/${i}`,
        target: "_blank",
        rel: "noopener noreferrer",
        class: ["thing-link", `${n}-link`].join(" "),
      }, s);
    },
  };
}
function io() {
  return {
    view(t) {
      let { urns: e, services: r } = t.attrs,
        i = r.readUnescos(e).map((s) => {
          let a = C(s.id);
          return (0, Nt.default)(
            "li",
            (0, Nt.default)(no, { urn: a, thing: s }),
          );
        });
      return (0, Nt.default)("ul", i);
    },
  };
}
function Da() {
  return {
    view(t) {
      let e = {}, { urn: r, things: n, services: i } = t.attrs;
      e.Classification = (0, N.default)(Ks, { urn: r });
      let s = lt(O.IN, n);
      if (
        s.size > 0 &&
        (e["Located In"] = (0, N.default)(Br, { services: i, urns: s })),
          n.length !== 1
      ) return;
      let [a] = n;
      a.features &&
      (e["Place Type"] = (0, N.default)(to, {
        urns: Ne(a.features),
        services: i,
      })),
        a.contains &&
        (e.Contains = (0, N.default)(Br, {
          services: i,
          urns: Ne(a.contains),
        })),
        a.unescoId &&
        (e.UNESCO = (0, N.default)(io, {
          urns: new Set(Xe(a.unescoId)),
          services: i,
        }));
      let p = Object.entries(e).map(([f, y]) =>
        (0, N.default)("tr", [
          (0, N.default)("th.exif-heading", f),
          (0, N.default)("td", y),
        ])
      );
      return (0, N.default)("div", [
        (0, N.default)("h3", "Details"),
        (0, N.default)("table.metadata-table", p),
      ]);
    },
  };
}
function Pa(t, e, r) {
  let n = A(t);
  le("navigate", { route: `/album/${n.id}`, title: e }), Ie(r);
}
function _a() {
  return {
    view(t) {
      let { things: e, services: r } = t.attrs,
        n = lt("id", e),
        i = r.readAlbumsByThingIds(new Set(n)),
        s = r.readCountries(lt("country", i)),
        a = i.map((p) => {
          let f = [...s].map((b) =>
              (0, N.default)(Ke, {
                country: b,
                key: `album-country-${p.id}-${b.id}`,
                mode: "flag",
              })
            ),
            y = (0, N.default)(Pt, {
              title: p.name,
              minDate: p.minDate,
              maxDate: p.maxDate,
              count: p.photosCount,
              countryLinks: f,
              dateRange: p.dateRange,
              shortDateRange: p.shortDateRange,
            }),
            v = (0, N.default)(Ye, {
              imageUrl: p.thumbnailUrl,
              thumbnailUrl: p.thumbnailUrl,
              thumbnailDataUrl: _e(p.mosaic),
              loading: "lazy",
              minDate: p.minDate,
              onclick: Pa.bind(null, p.id, p.name),
              trip: void 0,
              child: (0, N.default)("p"),
            });
          return (0, N.default)("div", v, y);
        });
      return (0, N.default)("section.album-container", a);
    },
  };
}
function La() {
  return {
    view(t) {
      let { things: e, services: r } = t.attrs,
        n = lt("id", e),
        i = r.readPhotosByThingIds(n);
      return (0, N.default)(
        "section.photo-container",
        i.map((s, a) => {
          let p = xe(a);
          return (0, N.default)(Me, {
            key: `photo-${s.id}`,
            photo: s,
            loading: p,
            interactive: !0,
          });
        }),
      );
    },
  };
}
function so() {
  return {
    view(t) {
      let { urn: e, things: r, services: n } = t.attrs;
      return (0, N.default)("div.page", [
        (0, N.default)("section.thing-page", [
          (0, N.default)(Js, { urn: e, things: r }),
          (0, N.default)(Qs, { urn: e }),
          (0, N.default)("br"),
          (0, N.default)(Ct, { things: r }),
          (0, N.default)(Da, { urn: e, things: r, services: n }),
          (0, N.default)("h3", "Photos"),
          (0, N.default)(La, { urn: e, things: r, services: n }),
          (0, N.default)("h3", "Albums"),
          (0, N.default)(_a, { urn: e, things: r, services: n }),
        ]),
      ]);
    },
  };
}
var d = await As();
gt("navigate", (t) => {
  let { route: e } = t.detail;
  console.info(`navigating to route: ${e}`), x.default.route.set(e);
});
gt("switch_theme", () => {
  d.darkMode = !d.darkMode;
});
gt("click_burger_menu", () => {
  d.sidebarVisible = !d.sidebarVisible;
});
function oo() {
  return {
    oninit() {},
    view() {
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Es, { albums: hs(d.data), services: d.services }),
        ]),
      ]);
    },
  };
}
function uo() {
  return {
    oninit() {
      let t = x.default.route.param("id");
      d.currentAlbum = `urn:r\xF3:album:${t}`;
    },
    view() {
      if (!d.currentAlbum) return (0, x.default)("p", "No album selected");
      let t = Tt(d.data, d.currentAlbum),
        e = ds(d.data, d.currentAlbum),
        r = gs(d.data, d.currentAlbum);
      if (!t) return (0, x.default)("p", "Album not found");
      let { subjects: n, locations: i } = vs(d.data, d.currentAlbum);
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)($s, {
            album: t,
            subjects: n,
            country: t.country || [],
            locations: i,
            photos: e,
            videos: r,
            services: d.services,
          }),
        ]),
      ]);
    },
  };
}
function ao() {
  return {
    view() {
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Ss),
        ]),
      ]);
    },
  };
}
function lo() {
  return {
    view() {
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Ds, { videos: Ps(d.data) }),
        ]),
      ]);
    },
  };
}
function co() {
  return {
    view() {
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Ns, { photos: cs(d.data) }),
        ]),
      ]);
    },
  };
}
function po() {
  let t = [];
  return {
    view() {
      let e = x.default.route.param("pair");
      if (d.currentUrn = `urn:r\xF3:${e}`, A(d.currentUrn).id === "*") {
        t = Er(d.data, e.split(":")[0]);
      } else {
        let n = Je(d.data, d.currentUrn);
        n && (t = [n]);
      }
      return d.currentUrn
        ? (0, x.default)("div.photos-app", {
          class: d.darkMode ? "dark-mode" : void 0,
        }, [
          (0, x.default)(be, d),
          (0, x.default)("div.app-container", {
            class: d.sidebarVisible ? "sidebar-visible" : void 0,
          }, [
            (0, x.default)(Ae, { visible: d.sidebarVisible }),
            (0, x.default)(so, {
              urn: d.currentUrn,
              things: t,
              services: d.services,
            }),
          ]),
        ])
        : (0, x.default)("p", "No thing selected");
    },
  };
}
function fo() {
  return {
    oninit() {
      let t = x.default.route.param("id");
      d.currentPhoto = `urn:r\xF3:photo:${t}`;
    },
    view() {
      if (!d.currentPhoto) return (0, x.default)("p", "No photo selected");
      let t = Qe(d.data, d.currentPhoto);
      return t
        ? (0, x.default)("div.photos-app", {
          class: d.darkMode ? "dark-mode" : void 0,
        }, [
          (0, x.default)(be, d),
          (0, x.default)("div.app-container", {
            class: d.sidebarVisible ? "sidebar-visible" : void 0,
          }, [
            (0, x.default)(Ae, { visible: d.sidebarVisible }),
            (0, x.default)(Fs, { photo: t, services: d.services }),
          ]),
        ])
        : (0, x.default)("p", "Photo not found");
    },
  };
}
function mo() {
  return {
    oninit() {
      let t = x.default.route.param("type");
      d.currentType = t;
    },
    view() {
      if (!d.currentType) return (0, x.default)("p", "No type selected");
      let t = Er(d.data, d.currentType);
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Ws, {
            type: d.currentType,
            things: t,
            services: d.services,
          }),
        ]),
      ]);
    },
  };
}
function ho() {
  return {
    view() {
      return (0, x.default)("div.photos-app", {
        class: d.darkMode ? "dark-mode" : void 0,
      }, [
        (0, x.default)(be, d),
        (0, x.default)("div.app-container", {
          class: d.sidebarVisible ? "sidebar-visible" : void 0,
        }, [
          (0, x.default)(Ae, { visible: d.sidebarVisible }),
          (0, x.default)(Xs, {}),
        ]),
      ]);
    },
  };
}
yo.default.route(document.body, "/albums", {
  "/albums": oo,
  "/about": ao,
  "/videos": lo,
  "/photos": co,
  "/album/:id": uo,
  "/thing/:pair": po,
  "/photo/:id": fo,
  "/listing/:type": mo,
  "/listings": ho,
});
//# sourceMappingURL=app.c1beff7cf7.js.map
