var ur = Object.create;
var Ye = Object.defineProperty;
var fr = Object.getOwnPropertyDescriptor;
var lr = Object.getOwnPropertyNames;
var sr = Object.getPrototypeOf, cr = Object.prototype.hasOwnProperty;
var T = (i, a) => () => (a || i((a = { exports: {} }).exports, a), a.exports);
var or = (i, a, s, l) => {
  if (a && typeof a == "object" || typeof a == "function") {
    for (let m of lr(a)) {
      !cr.call(i, m) && m !== s && Ye(i, m, {
        get: () => a[m],
        enumerable: !(l = fr(a, m)) || l.enumerable,
      });
    }
  }
  return i;
};
var fe = (
  i,
  a,
  s,
) => (s = i != null ? ur(sr(i)) : {},
  or(
    a || !i || !i.__esModule
      ? Ye(s, "default", { value: i, enumerable: !0 })
      : s,
    i,
  ));
var G = T((Jr, Ze) => {
  "use strict";
  function Z(i, a, s, l, m, o) {
    return {
      tag: i,
      key: a,
      attrs: s,
      children: l,
      text: m,
      dom: o,
      is: void 0,
      domSize: void 0,
      state: void 0,
      events: void 0,
      instance: void 0,
    };
  }
  Z.normalize = function (i) {
    return Array.isArray(i)
      ? Z("[", void 0, void 0, Z.normalizeChildren(i), void 0, void 0)
      : i == null || typeof i == "boolean"
      ? null
      : typeof i == "object"
      ? i
      : Z("#", void 0, void 0, String(i), void 0, void 0);
  };
  Z.normalizeChildren = function (i) {
    var a = [];
    if (i.length) {
      for (var s = i[0] != null && i[0].key != null, l = 1; l < i.length; l++) {
        if ((i[l] != null && i[l].key != null) !== s) {
          throw new TypeError(
            s && (i[l] == null || typeof i[l] == "boolean")
              ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
              : "In fragments, vnodes must either all have keys or none have keys.",
          );
        }
      }
      for (var l = 0; l < i.length; l++) a[l] = Z.normalize(i[l]);
    }
    return a;
  };
  Ze.exports = Z;
});
var Te = T((Gr, ke) => {
  "use strict";
  var mr = G();
  ke.exports = function (i, a) {
    return i == null ||
        typeof i == "object" && i.tag == null && !Array.isArray(i)
      ? a.length === 1 && Array.isArray(a[0]) && (a = a[0])
      : (a = a.length === 0 && Array.isArray(i) ? i : [i, ...a], i = void 0),
      mr("", i && i.key, i, a);
  };
});
var ce = T((Xr, et) => {
  "use strict";
  et.exports = {}.hasOwnProperty;
});
var ze = T((Wr, tt) => {
  "use strict";
  tt.exports = {};
});
var Re = T((Yr, rt) => {
  "use strict";
  var pr = ze();
  rt.exports = new Map([[pr, !0]]);
});
var Ne = T((Zr, at) => {
  "use strict";
  var hr = G(),
    yr = Te(),
    Pe = ce(),
    it = ze(),
    gr = Re(),
    wr =
      /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
    nt = Object.create(null);
  function br(i) {
    for (var a in i) if (Pe.call(i, a)) return !1;
    return !0;
  }
  function xr(i) {
    return i === "value" || i === "checked" || i === "selectedIndex" ||
      i === "selected";
  }
  function Ar(i) {
    for (var a, s = "div", l = [], m = {}, o = !0; a = wr.exec(i);) {
      var f = a[1], g = a[2];
      if (f === "" && g !== "") s = g;
      else if (f === "#") m.id = g;
      else if (f === ".") l.push(g);
      else if (a[3][0] === "[") {
        var h = a[6];
        h && (h = h.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")),
          a[4] === "class"
            ? l.push(h)
            : (m[a[4]] = h === "" ? h : h || !0, xr(a[4]) && (o = !1));
      }
    }
    return l.length > 0 && (m.className = l.join(" ")),
      br(m) ? m = it : gr.set(m, o),
      nt[i] = { tag: s, attrs: m, is: m.is };
  }
  function qr(i, a) {
    a.tag = i.tag;
    var s = a.attrs;
    if (s == null) return a.attrs = i.attrs, a.is = i.is, a;
    var l = Pe.call(s, "class"), m = l ? s.class : s.className;
    return i.attrs !== it
      ? (s = Object.assign({}, i.attrs, s),
        (m != null || i.attrs.className != null) &&
        (s.className = m != null
          ? i.attrs.className != null
            ? String(i.attrs.className) + " " + String(m)
            : m
          : i.attrs.className))
      : m != null && (s.className = m),
      l && (s.class = null),
      i.tag === "input" && Pe.call(s, "type") &&
      (s = Object.assign({ type: s.type }, s)),
      a.is = s.is,
      a.attrs = s,
      a;
  }
  function dr(i, a, ...s) {
    if (
      i == null ||
      typeof i != "string" && typeof i != "function" &&
        typeof i.view != "function"
    ) throw Error("The selector must be either a string or a component.");
    var l = yr(a, s);
    return typeof i == "string" &&
        (l.children = hr.normalizeChildren(l.children), i !== "[")
      ? qr(nt[i] || Ar(i), l)
      : (l.attrs == null && (l.attrs = {}), l.tag = i, l);
  }
  at.exports = dr;
});
var ft = T((kr, ut) => {
  "use strict";
  var Er = G();
  ut.exports = function (i) {
    return i == null && (i = ""), Er("<", void 0, void 0, i, void 0, void 0);
  };
});
var st = T((ei, lt) => {
  "use strict";
  var Cr = G(), Or = Te();
  lt.exports = function (i, ...a) {
    var s = Or(i, a);
    return s.attrs == null && (s.attrs = {}),
      s.tag = "[",
      s.children = Cr.normalizeChildren(s.children),
      s;
  };
});
var ot = T((ti, ct) => {
  "use strict";
  var Me = Ne();
  Me.trust = ft();
  Me.fragment = st();
  ct.exports = Me;
});
var ve = T((ri, mt) => {
  "use strict";
  var Ie = new WeakMap();
  function* Sr(i) {
    var a = i.dom, s = i.domSize, l = Ie.get(a);
    if (a != null) {
      do {
        var m = a.nextSibling;
        Ie.get(a) === l && (yield a, s--), a = m;
      } while (s);
    }
  }
  mt.exports = { delayedRemoval: Ie, domFor: Sr };
});
var gt = T((ii, yt) => {
  "use strict";
  var je = G(), ht = ve(), Tr = ht.delayedRemoval, Le = ht.domFor, pt = Re();
  yt.exports = function () {
    var i = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML",
      },
      a,
      s;
    function l(t) {
      return t.ownerDocument;
    }
    function m(t) {
      return t.attrs && t.attrs.xmlns || i[t.tag];
    }
    function o(t, e) {
      if (t.state !== e) throw new Error("'vnode.state' must not be modified.");
    }
    function f(t) {
      var e = t.state;
      try {
        return this.apply(e, arguments);
      } finally {
        o(t, e);
      }
    }
    function g(t) {
      try {
        return l(t).activeElement;
      } catch {
        return null;
      }
    }
    function h(t, e, r, n, u, c, d) {
      for (var E = r; E < n; E++) {
        var p = e[E];
        p != null && b(t, p, u, d, c);
      }
    }
    function b(t, e, r, n, u) {
      var c = e.tag;
      if (typeof c == "string") {
        switch (e.state = {}, e.attrs != null && xe(e.attrs, e, r), c) {
          case "#":
            A(t, e, u);
            break;
          case "<":
            I(t, e, n, u);
            break;
          case "[":
            w(t, e, r, n, u);
            break;
          default:
            P(t, e, r, n, u);
        }
      } else K(t, e, r, n, u);
    }
    function A(t, e, r) {
      e.dom = l(t).createTextNode(e.children), Q(t, e.dom, r);
    }
    var S = {
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
    function I(t, e, r, n) {
      var u = e.children.match(/^\s*?<(\w+)/im) || [],
        c = l(t).createElement(S[u[1]] || "div");
      r === "http://www.w3.org/2000/svg"
        ? (c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' +
          e.children + "</svg>",
          c = c.firstChild)
        : c.innerHTML = e.children,
        e.dom = c.firstChild,
        e.domSize = c.childNodes.length;
      for (var d = l(t).createDocumentFragment(), E; E = c.firstChild;) {
        d.appendChild(E);
      }
      Q(t, d, n);
    }
    function w(t, e, r, n, u) {
      var c = l(t).createDocumentFragment();
      if (e.children != null) {
        var d = e.children;
        h(c, d, 0, d.length, r, null, n);
      }
      e.dom = c.firstChild, e.domSize = c.childNodes.length, Q(t, c, u);
    }
    function P(t, e, r, n, u) {
      var c = e.tag, d = e.attrs, E = e.is;
      n = m(e) || n;
      var p = n
        ? E ? l(t).createElementNS(n, c, { is: E }) : l(t).createElementNS(n, c)
        : E
        ? l(t).createElement(c, { is: E })
        : l(t).createElement(c);
      if (
        e.dom = p,
          d != null && kt(e, d, n),
          Q(t, p, u),
          !W(e) && e.children != null
      ) {
        var C = e.children;
        h(p, C, 0, C.length, r, null, n),
          e.tag === "select" && d != null && tr(e, d);
      }
    }
    function X(t, e) {
      var r;
      if (typeof t.tag.view == "function") {
        if (
          t.state = Object.create(t.tag),
            r = t.state.view,
            r.$$reentrantLock$$ != null
        ) return;
        r.$$reentrantLock$$ = !0;
      } else {
        if (t.state = void 0, r = t.tag, r.$$reentrantLock$$ != null) return;
        r.$$reentrantLock$$ = !0,
          t.state =
            t.tag.prototype != null && typeof t.tag.prototype.view == "function"
              ? new t.tag(t)
              : t.tag(t);
      }
      if (
        xe(t.state, t, e),
          t.attrs != null && xe(t.attrs, t, e),
          t.instance = je.normalize(f.call(t.state.view, t)),
          t.instance === t
      ) throw Error("A view cannot return the vnode it received as argument");
      r.$$reentrantLock$$ = null;
    }
    function K(t, e, r, n, u) {
      X(e, r),
        e.instance != null
          ? (b(t, e.instance, r, n, u),
            e.dom = e.instance.dom,
            e.domSize = e.dom != null ? e.instance.domSize : 0)
          : e.domSize = 0;
    }
    function B(t, e, r, n, u, c) {
      if (!(e === r || e == null && r == null)) {
        if (e == null || e.length === 0) {
          h(t, r, 0, r.length, n, u, c);
        } else if (r == null || r.length === 0) ne(t, e, 0, e.length);
        else {
          var d = e[0] != null && e[0].key != null,
            E = r[0] != null && r[0].key != null,
            p = 0,
            C = 0;
          if (!d) { for (; C < e.length && e[C] == null;) C++; }
          if (!E) { for (; p < r.length && r[p] == null;) p++; }
          if (d !== E) ne(t, e, C, e.length), h(t, r, p, r.length, n, u, c);
          else if (E) {
            for (
              var U = e.length - 1, _ = r.length - 1, se, V, v, F, R, de;
              U >= C && _ >= p && (F = e[U], R = r[_], F.key === R.key);
            ) {
              F !== R && $(t, F, R, n, u, c),
                R.dom != null && (u = R.dom),
                U--,
                _--;
            }
            for (; U >= C && _ >= p && (V = e[C], v = r[p], V.key === v.key);) {
              C++, p++, V !== v && $(t, V, v, n, Y(e, C, u), c);
            }
            for (
              ;
              U >= C && _ >= p &&
              !(p === _ || V.key !== R.key || F.key !== v.key);
            ) {
              de = Y(e, C, u),
                ie(t, F, de),
                F !== v && $(t, F, v, n, de, c),
                ++p <= --_ && ie(t, V, u),
                V !== R && $(t, V, R, n, u, c),
                R.dom != null && (u = R.dom),
                C++,
                U--,
                F = e[U],
                R = r[_],
                V = e[C],
                v = r[p];
            }
            for (; U >= C && _ >= p && F.key === R.key;) {
              F !== R && $(t, F, R, n, u, c),
                R.dom != null && (u = R.dom),
                U--,
                _--,
                F = e[U],
                R = r[_];
            }
            if (p > _) ne(t, e, C, U + 1);
            else if (C > U) h(t, r, p, _ + 1, n, u, c);
            else {
              var ar = u,
                We = _ - p + 1,
                ue = new Array(We),
                Ee = 0,
                M = 0,
                Ce = 2147483647,
                Oe = 0,
                se,
                Se;
              for (M = 0; M < We; M++) ue[M] = -1;
              for (M = _; M >= p; M--) {
                se == null && (se = z(e, C, U + 1)), R = r[M];
                var k = se[R.key];
                k != null &&
                  (Ce = k < Ce ? k : -1,
                    ue[M - p] = k,
                    F = e[k],
                    e[k] = null,
                    F !== R && $(t, F, R, n, u, c),
                    R.dom != null && (u = R.dom),
                    Oe++);
              }
              if (u = ar, Oe !== U - C + 1 && ne(t, e, C, U + 1), Oe === 0) {
                h(t, r, p, _ + 1, n, u, c);
              } else if (Ce === -1) {
                for (Se = L(ue), Ee = Se.length - 1, M = _; M >= p; M--) {
                  v = r[M],
                    ue[M - p] === -1
                      ? b(t, v, n, c, u)
                      : Se[Ee] === M - p
                      ? Ee--
                      : ie(t, v, u),
                    v.dom != null && (u = r[M].dom);
                }
              } else {for (M = _; M >= p; M--) {
                  v = r[M],
                    ue[M - p] === -1 && b(t, v, n, c, u),
                    v.dom != null && (u = r[M].dom);
                }}
            }
          } else {
            var qe = e.length < r.length ? e.length : r.length;
            for (p = p < C ? p : C; p < qe; p++) {
              V = e[p],
                v = r[p],
                !(V === v || V == null && v == null) && (V == null
                  ? b(t, v, n, c, Y(e, p + 1, u))
                  : v == null
                  ? le(t, V)
                  : $(t, V, v, n, Y(e, p + 1, u), c));
            }
            e.length > qe && ne(t, e, p, e.length),
              r.length > qe && h(t, r, p, r.length, n, u, c);
          }
        }
      }
    }
    function $(t, e, r, n, u, c) {
      var d = e.tag, E = r.tag;
      if (d === E && e.is === r.is) {
        if (r.state = e.state, r.events = e.events, nr(r, e)) return;
        if (typeof d == "string") {
          switch (r.attrs != null && Ae(r.attrs, r, n), d) {
            case "#":
              N(e, r);
              break;
            case "<":
              y(t, e, r, c, u);
              break;
            case "[":
              O(t, e, r, n, u, c);
              break;
            default:
              x(e, r, n, c);
          }
        } else j(t, e, r, n, u, c);
      } else le(t, e), b(t, r, n, c, u);
    }
    function N(t, e) {
      t.children.toString() !== e.children.toString() &&
      (t.dom.nodeValue = e.children), e.dom = t.dom;
    }
    function y(t, e, r, n, u) {
      e.children !== r.children
        ? (Ke(t, e), I(t, r, n, u))
        : (r.dom = e.dom, r.domSize = e.domSize);
    }
    function O(t, e, r, n, u, c) {
      B(t, e.children, r.children, n, u, c);
      var d = 0, E = r.children;
      if (r.dom = null, E != null) {
        for (var p = 0; p < E.length; p++) {
          var C = E[p];
          C != null && C.dom != null &&
            (r.dom == null && (r.dom = C.dom), d += C.domSize || 1);
        }
        d !== 1 && (r.domSize = d);
      }
    }
    function x(t, e, r, n) {
      var u = e.dom = t.dom;
      n = m(e) || n,
        (t.attrs != e.attrs || e.attrs != null && !pt.get(e.attrs)) &&
        rr(e, t.attrs, e.attrs, n),
        W(e) || B(u, t.children, e.children, r, null, n);
    }
    function j(t, e, r, n, u, c) {
      if (
        r.instance = je.normalize(f.call(r.state.view, r)), r.instance === r
      ) throw Error("A view cannot return the vnode it received as argument");
      Ae(r.state, r, n),
        r.attrs != null && Ae(r.attrs, r, n),
        r.instance != null
          ? (e.instance == null
            ? b(t, r.instance, n, c, u)
            : $(t, e.instance, r.instance, n, u, c),
            r.dom = r.instance.dom,
            r.domSize = r.instance.domSize)
          : e.instance != null
          ? (le(t, e.instance), r.dom = void 0, r.domSize = 0)
          : (r.dom = e.dom, r.domSize = e.domSize);
    }
    function z(t, e, r) {
      for (var n = Object.create(null); e < r; e++) {
        var u = t[e];
        if (u != null) {
          var c = u.key;
          c != null && (n[c] = e);
        }
      }
      return n;
    }
    var q = [];
    function L(t) {
      for (
        var e = [0], r = 0, n = 0, u = 0, c = q.length = t.length, u = 0;
        u < c;
        u++
      ) q[u] = t[u];
      for (var u = 0; u < c; ++u) {
        if (t[u] !== -1) {
          var d = e[e.length - 1];
          if (t[d] < t[u]) {
            q[u] = d, e.push(u);
            continue;
          }
          for (r = 0, n = e.length - 1; r < n;) {
            var E = (r >>> 1) + (n >>> 1) + (r & n & 1);
            t[e[E]] < t[u] ? r = E + 1 : n = E;
          }
          t[u] < t[e[r]] && (r > 0 && (q[u] = e[r - 1]), e[r] = u);
        }
      }
      for (r = e.length, n = e[r - 1]; r-- > 0;) e[r] = n, n = q[n];
      return q.length = 0, e;
    }
    function Y(t, e, r) {
      for (; e < t.length; e++) {
        if (t[e] != null && t[e].dom != null) return t[e].dom;
      }
      return r;
    }
    function ie(t, e, r) {
      if (e.dom != null) {
        var n;
        if (e.domSize == null) n = e.dom;
        else {
          n = l(t).createDocumentFragment();
          for (var u of Le(e)) n.appendChild(u);
        }
        Q(t, n, r);
      }
    }
    function Q(t, e, r) {
      r != null ? t.insertBefore(e, r) : t.appendChild(e);
    }
    function W(t) {
      if (
        t.attrs == null ||
        t.attrs.contenteditable == null && t.attrs.contentEditable == null
      ) return !1;
      var e = t.children;
      if (e != null && e.length === 1 && e[0].tag === "<") {
        var r = e[0].children;
        t.dom.innerHTML !== r && (t.dom.innerHTML = r);
      } else if (e != null && e.length !== 0) {
        throw new Error("Child node of a contenteditable must be trusted.");
      }
      return !0;
    }
    function ne(t, e, r, n) {
      for (var u = r; u < n; u++) {
        var c = e[u];
        c != null && le(t, c);
      }
    }
    function $e(t, e, r, n) {
      var u = e.state, c = f.call(r.onbeforeremove, e);
      if (c != null) {
        var d = s;
        for (var E of Le(e)) Tr.set(E, d);
        n.v++,
          Promise.resolve(c).finally(function () {
            o(e, u), Be(t, e, n);
          });
      }
    }
    function Be(t, e, r) {
      --r.v === 0 && (ge(e), Ke(t, e));
    }
    function le(t, e) {
      var r = { v: 1 };
      typeof e.tag != "string" && typeof e.state.onbeforeremove == "function" &&
      $e(t, e, e.state, r),
        e.attrs && typeof e.attrs.onbeforeremove == "function" &&
        $e(t, e, e.attrs, r),
        Be(t, e, r);
    }
    function Ke(t, e) {
      if (e.dom != null) {
        if (e.domSize == null) t.removeChild(e.dom);
        else for (var r of Le(e)) t.removeChild(r);
      }
    }
    function ge(t) {
      if (
        typeof t.tag != "string" && typeof t.state.onremove == "function" &&
        f.call(t.state.onremove, t),
          t.attrs && typeof t.attrs.onremove == "function" &&
          f.call(t.attrs.onremove, t),
          typeof t.tag != "string"
      ) t.instance != null && ge(t.instance);
      else {
        t.events != null && (t.events._ = null);
        var e = t.children;
        if (Array.isArray(e)) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n != null && ge(n);
          }
        }
      }
    }
    function kt(t, e, r) {
      for (var n in e) we(t, n, null, e[n], r);
    }
    function we(t, e, r, n, u) {
      if (
        !(e === "key" || n == null || Qe(e) ||
          r === n && !ir(t, e) && typeof n != "object")
      ) {
        if (e[0] === "o" && e[1] === "n") return Xe(t, e, n);
        if (e.slice(0, 6) === "xlink:") {
          t.dom.setAttributeNS("http://www.w3.org/1999/xlink", e.slice(6), n);
        } else if (e === "style") Ge(t.dom, r, n);
        else if (Je(t, e, u)) {
          if (e === "value") {
            if (
              (t.tag === "input" || t.tag === "textarea") &&
                t.dom.value === "" + n ||
              t.tag === "select" && r !== null && t.dom.value === "" + n ||
              t.tag === "option" && r !== null && t.dom.value === "" + n
            ) return;
            if (t.tag === "input" && t.attrs.type === "file" && "" + n != "") {
              console.error("`value` is read-only on file inputs!");
              return;
            }
          }
          t.tag === "input" && e === "type"
            ? t.dom.setAttribute(e, n)
            : t.dom[e] = n;
        } else {typeof n == "boolean"
            ? n ? t.dom.setAttribute(e, "") : t.dom.removeAttribute(e)
            : t.dom.setAttribute(e === "className" ? "class" : e, n);}
      }
    }
    function er(t, e, r, n) {
      if (!(e === "key" || r == null || Qe(e))) {
        if (e[0] === "o" && e[1] === "n") {
          Xe(t, e, void 0);
        } else if (e === "style") Ge(t.dom, r, null);
        else if (
          Je(t, e, n) && e !== "className" && e !== "title" &&
          !(e === "value" &&
            (t.tag === "option" ||
              t.tag === "select" && t.dom.selectedIndex === -1 &&
                t.dom === g(t.dom))) &&
          !(t.tag === "input" && e === "type")
        ) t.dom[e] = null;
        else {
          var u = e.indexOf(":");
          u !== -1 && (e = e.slice(u + 1)),
            r !== !1 && t.dom.removeAttribute(e === "className" ? "class" : e);
        }
      }
    }
    function tr(t, e) {
      if ("value" in e) {
        if (e.value === null) {
          t.dom.selectedIndex !== -1 && (t.dom.value = null);
        } else {
          var r = "" + e.value;
          (t.dom.value !== r || t.dom.selectedIndex === -1) &&
            (t.dom.value = r);
        }
      }
      "selectedIndex" in e &&
        we(t, "selectedIndex", null, e.selectedIndex, void 0);
    }
    function rr(t, e, r, n) {
      var u;
      if (e != null) {
        e === r && !pt.has(r) &&
          console.warn(
            "Don't reuse attrs object, use new object for every redraw, this will throw in next major",
          );
        for (var c in e) {
          (u = e[c]) != null && (r == null || r[c] == null) && er(t, c, u, n);
        }
      }
      if (r != null) { for (var c in r) we(t, c, e && e[c], r[c], n); }
    }
    function ir(t, e) {
      return e === "value" || e === "checked" || e === "selectedIndex" ||
        e === "selected" &&
          (t.dom === g(t.dom) ||
            t.tag === "option" && t.dom.parentNode === g(t.dom));
    }
    function Qe(t) {
      return t === "oninit" || t === "oncreate" || t === "onupdate" ||
        t === "onremove" || t === "onbeforeremove" || t === "onbeforeupdate";
    }
    function Je(t, e, r) {
      return r === void 0 &&
        (t.tag.indexOf("-") > -1 || t.is ||
          e !== "href" && e !== "list" && e !== "form" && e !== "width" &&
            e !== "height") &&
        e in t.dom;
    }
    function Ge(t, e, r) {
      if (e !== r) {
        if (r == null) t.style = "";
        else if (typeof r != "object") t.style = r;
        else if (e == null || typeof e != "object") {
          t.style = "";
          for (var n in r) {
            var u = r[n];
            u != null &&
              (n.includes("-")
                ? t.style.setProperty(n, String(u))
                : t.style[n] = String(u));
          }
        } else {
          for (var n in e) {
            e[n] != null && r[n] == null &&
              (n.includes("-") ? t.style.removeProperty(n) : t.style[n] = "");
          }
          for (var n in r) {
            var u = r[n];
            u != null && (u = String(u)) !== String(e[n]) &&
              (n.includes("-") ? t.style.setProperty(n, u) : t.style[n] = u);
          }
        }
      }
    }
    function be() {
      this._ = a;
    }
    be.prototype = Object.create(null),
      be.prototype.handleEvent = function (t) {
        var e = this["on" + t.type], r;
        typeof e == "function"
          ? r = e.call(t.currentTarget, t)
          : typeof e.handleEvent == "function" && e.handleEvent(t);
        var n = this;
        n._ != null &&
        (t.redraw !== !1 && (0, n._)(),
          r != null && typeof r.then == "function" &&
          Promise.resolve(r).then(function () {
            n._ != null && t.redraw !== !1 && (0, n._)();
          })), r === !1 && (t.preventDefault(), t.stopPropagation());
      };
    function Xe(t, e, r) {
      if (t.events != null) {
        if (t.events._ = a, t.events[e] === r) return;
        r != null && (typeof r == "function" || typeof r == "object")
          ? (t.events[e] == null &&
            t.dom.addEventListener(e.slice(2), t.events, !1),
            t.events[e] = r)
          : (t.events[e] != null &&
            t.dom.removeEventListener(e.slice(2), t.events, !1),
            t.events[e] = void 0);
      } else {r != null && (typeof r == "function" || typeof r == "object") &&
          (t.events = new be(),
            t.dom.addEventListener(e.slice(2), t.events, !1),
            t.events[e] = r);}
    }
    function xe(t, e, r) {
      typeof t.oninit == "function" && f.call(t.oninit, e),
        typeof t.oncreate == "function" && r.push(f.bind(t.oncreate, e));
    }
    function Ae(t, e, r) {
      typeof t.onupdate == "function" && r.push(f.bind(t.onupdate, e));
    }
    function nr(t, e) {
      do {
        if (t.attrs != null && typeof t.attrs.onbeforeupdate == "function") {
          var r = f.call(t.attrs.onbeforeupdate, t, e);
          if (r !== void 0 && !r) break;
        }
        if (
          typeof t.tag != "string" &&
          typeof t.state.onbeforeupdate == "function"
        ) {
          var r = f.call(t.state.onbeforeupdate, t, e);
          if (r !== void 0 && !r) break;
        }
        return !1;
      } while (!1);
      return t.dom = e.dom,
        t.domSize = e.domSize,
        t.instance = e.instance,
        t.attrs = e.attrs,
        t.children = e.children,
        t.text = e.text,
        !0;
    }
    var ae;
    return function (t, e, r) {
      if (!t) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (ae != null && t.contains(ae)) {
        throw new TypeError(
          "Node is currently being rendered to and thus is locked.",
        );
      }
      var n = a, u = ae, c = [], d = g(t), E = t.namespaceURI;
      ae = t, a = typeof r == "function" ? r : void 0, s = {};
      try {
        t.vnodes == null && (t.textContent = ""),
          e = je.normalizeChildren(Array.isArray(e) ? e : [e]),
          B(
            t,
            t.vnodes,
            e,
            c,
            null,
            E === "http://www.w3.org/1999/xhtml" ? void 0 : E,
          ),
          t.vnodes = e,
          d != null && g(t) !== d && typeof d.focus == "function" && d.focus();
        for (var p = 0; p < c.length; p++) c[p]();
      } finally {
        a = n, ae = u;
      }
    };
  };
});
var De = T((ni, wt) => {
  "use strict";
  wt.exports = gt()(typeof window < "u" ? window : null);
});
var At = T((ai, xt) => {
  "use strict";
  var bt = G();
  xt.exports = function (i, a, s) {
    var l = [], m = !1, o = -1;
    function f() {
      for (o = 0; o < l.length; o += 2) {
        try {
          i(l[o], bt(l[o + 1]), g);
        } catch (b) {
          s.error(b);
        }
      }
      o = -1;
    }
    function g() {
      m || (m = !0,
        a(function () {
          m = !1, f();
        }));
    }
    g.sync = f;
    function h(b, A) {
      if (A != null && A.view == null && typeof A != "function") {
        throw new TypeError("m.mount expects a component, not a vnode.");
      }
      var S = l.indexOf(b);
      S >= 0 && (l.splice(S, 2), S <= o && (o -= 2), i(b, [])),
        A != null && (l.push(b, A), i(b, bt(A), g));
    }
    return { mount: h, redraw: g };
  };
});
var oe = T((ui, qt) => {
  "use strict";
  var zr = De();
  qt.exports = At()(
    zr,
    typeof requestAnimationFrame < "u" ? requestAnimationFrame : null,
    typeof console < "u" ? console : null,
  );
});
var _e = T((fi, dt) => {
  "use strict";
  dt.exports = function (i) {
    if (Object.prototype.toString.call(i) !== "[object Object]") return "";
    var a = [];
    for (var s in i) l(s, i[s]);
    return a.join("&");
    function l(m, o) {
      if (Array.isArray(o)) {
        for (var f = 0; f < o.length; f++) {
          l(
            m + "[" + f + "]",
            o[f],
          );
        }
      } else if (Object.prototype.toString.call(o) === "[object Object]") {
        for (var f in o) {
          l(m + "[" + f + "]", o[f]);
        }
      } else {a.push(
          encodeURIComponent(m) +
            (o != null && o !== "" ? "=" + encodeURIComponent(o) : ""),
        );}
    }
  };
});
var me = T((li, Et) => {
  "use strict";
  var Rr = _e();
  Et.exports = function (i, a) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(i)) {
      throw new SyntaxError(
        "Template parameter names must be separated by either a '/', '-', or '.'.",
      );
    }
    if (a == null) return i;
    var s = i.indexOf("?"),
      l = i.indexOf("#"),
      m = l < 0 ? i.length : l,
      o = s < 0 ? m : s,
      f = i.slice(0, o),
      g = {};
    Object.assign(g, a);
    var h = f.replace(/:([^\/\.-]+)(\.{3})?/g, function (X, K, B) {
        return delete g[K],
          a[K] == null ? X : B ? a[K] : encodeURIComponent(String(a[K]));
      }),
      b = h.indexOf("?"),
      A = h.indexOf("#"),
      S = A < 0 ? h.length : A,
      I = b < 0 ? S : b,
      w = h.slice(0, I);
    s >= 0 && (w += i.slice(s, m)),
      b >= 0 && (w += (s < 0 ? "?" : "&") + h.slice(b, S));
    var P = Rr(g);
    return P && (w += (s < 0 && b < 0 ? "?" : "&") + P),
      l >= 0 && (w += i.slice(l)),
      A >= 0 && (w += (l < 0 ? "" : "&") + h.slice(A)),
      w;
  };
});
var St = T((si, Ot) => {
  "use strict";
  var Pr = me(), Ct = ce();
  Ot.exports = function (i, a) {
    function s(o) {
      return new Promise(o);
    }
    function l(o, f) {
      return new Promise(function (g, h) {
        o = Pr(o, f.params);
        var b = f.method != null ? f.method.toUpperCase() : "GET",
          A = f.body,
          S = (f.serialize == null || f.serialize === JSON.serialize) &&
            !(A instanceof i.FormData || A instanceof i.URLSearchParams),
          I = f.responseType || (typeof f.extract == "function" ? "" : "json"),
          w = new i.XMLHttpRequest(),
          P = !1,
          X = !1,
          K = w,
          B,
          $ = w.abort;
        w.abort = function () {
          P = !0, $.call(this);
        },
          w.open(
            b,
            o,
            f.async !== !1,
            typeof f.user == "string" ? f.user : void 0,
            typeof f.password == "string" ? f.password : void 0,
          ),
          S && A != null && !m(f, "content-type") &&
          w.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
          typeof f.deserialize != "function" && !m(f, "accept") &&
          w.setRequestHeader("Accept", "application/json, text/*"),
          f.withCredentials && (w.withCredentials = f.withCredentials),
          f.timeout && (w.timeout = f.timeout),
          w.responseType = I;
        for (var N in f.headers) {
          Ct.call(f.headers, N) && w.setRequestHeader(N, f.headers[N]);
        }
        w.onreadystatechange = function (y) {
          if (!P && y.target.readyState === 4) {
            try {
              var O = y.target.status >= 200 && y.target.status < 300 ||
                  y.target.status === 304 || /^file:\/\//i.test(o),
                x = y.target.response,
                j;
              if (I === "json") {
                if (!y.target.responseType && typeof f.extract != "function") {
                  try {
                    x = JSON.parse(y.target.responseText);
                  } catch {
                    x = null;
                  }
                }
              } else {(!I || I === "text") && x == null &&
                  (x = y.target.responseText);}
              if (
                typeof f.extract == "function"
                  ? (x = f.extract(y.target, f), O = !0)
                  : typeof f.deserialize == "function" &&
                    (x = f.deserialize(x)), O
              ) {
                if (typeof f.type == "function") {
                  if (Array.isArray(x)) {
                    for (var z = 0; z < x.length; z++) {
                      x[z] = new f.type(x[z]);
                    }
                  } else x = new f.type(x);
                }
                g(x);
              } else {
                var q = function () {
                  try {
                    j = y.target.responseText;
                  } catch {
                    j = x;
                  }
                  var L = new Error(j);
                  L.code = y.target.status, L.response = x, h(L);
                };
                w.status === 0
                  ? setTimeout(function () {
                    X || q();
                  })
                  : q();
              }
            } catch (L) {
              h(L);
            }
          }
        },
          w.ontimeout = function (y) {
            X = !0;
            var O = new Error("Request timed out");
            O.code = y.target.status, h(O);
          },
          typeof f.config == "function" &&
          (w = f.config(w, f, o) || w,
            w !== K && (B = w.abort,
              w.abort = function () {
                P = !0, B.call(this);
              })),
          A == null
            ? w.send()
            : typeof f.serialize == "function"
            ? w.send(f.serialize(A))
            : A instanceof i.FormData || A instanceof i.URLSearchParams
            ? w.send(A)
            : w.send(JSON.stringify(A));
      });
    }
    s.prototype = Promise.prototype, s.__proto__ = Promise;
    function m(o, f) {
      for (var g in o.headers) {
        if (Ct.call(o.headers, g) && g.toLowerCase() === f) return !0;
      }
      return !1;
    }
    return {
      request: function (o, f) {
        typeof o != "string" ? (f = o, o = o.url) : f == null && (f = {});
        var g = l(o, f);
        if (f.background === !0) return g;
        var h = 0;
        function b() {
          --h === 0 && typeof a == "function" && a();
        }
        return A(g);
        function A(S) {
          var I = S.then;
          return S.constructor = s,
            S.then = function () {
              h++;
              var w = I.apply(S, arguments);
              return w.then(b, function (P) {
                if (b(), h === 0) throw P;
              }),
                A(w);
            },
            S;
        }
      },
    };
  };
});
var zt = T((ci, Tt) => {
  "use strict";
  var Nr = oe();
  Tt.exports = St()(typeof window < "u" ? window : null, Nr.redraw);
});
var He = T((oi, Pt) => {
  "use strict";
  function Rt(i) {
    try {
      return decodeURIComponent(i);
    } catch {
      return i;
    }
  }
  Pt.exports = function (i) {
    if (i === "" || i == null) return {};
    i.charAt(0) === "?" && (i = i.slice(1));
    for (var a = i.split("&"), s = {}, l = {}, m = 0; m < a.length; m++) {
      var o = a[m].split("="), f = Rt(o[0]), g = o.length === 2 ? Rt(o[1]) : "";
      g === "true" ? g = !0 : g === "false" && (g = !1);
      var h = f.split(/\]\[?|\[/), b = l;
      f.indexOf("[") > -1 && h.pop();
      for (var A = 0; A < h.length; A++) {
        var S = h[A], I = h[A + 1], w = I == "" || !isNaN(parseInt(I, 10));
        if (S === "") {
          var f = h.slice(0, A).join();
          s[f] == null && (s[f] = Array.isArray(b) ? b.length : 0), S = s[f]++;
        } else if (S === "__proto__") break;
        if (A === h.length - 1) b[S] = g;
        else {
          var P = Object.getOwnPropertyDescriptor(b, S);
          P != null && (P = P.value),
            P == null && (b[S] = P = w ? [] : {}),
            b = P;
        }
      }
    }
    return l;
  };
});
var pe = T((mi, Nt) => {
  "use strict";
  var Mr = He();
  Nt.exports = function (i) {
    var a = i.indexOf("?"),
      s = i.indexOf("#"),
      l = s < 0 ? i.length : s,
      m = a < 0 ? l : a,
      o = i.slice(0, m).replace(/\/{2,}/g, "/");
    return o ? o[0] !== "/" && (o = "/" + o) : o = "/",
      { path: o, params: a < 0 ? {} : Mr(i.slice(a + 1, l)) };
  };
});
var It = T((pi, Mt) => {
  "use strict";
  var Ir = pe();
  Mt.exports = function (i) {
    var a = Ir(i),
      s = Object.keys(a.params),
      l = [],
      m = new RegExp(
        "^" +
          a.path.replace(
            /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
            function (o, f, g) {
              return f == null
                ? "\\" + o
                : (l.push({ k: f, r: g === "..." }),
                  g === "..."
                    ? "(.*)"
                    : g === "."
                    ? "([^/]+)\\."
                    : "([^/]+)" + (g || ""));
            },
          ) + "\\/?$",
      );
    return function (o) {
      for (var f = 0; f < s.length; f++) {
        if (a.params[s[f]] !== o.params[s[f]]) return !1;
      }
      if (!l.length) return m.test(o.path);
      var g = m.exec(o.path);
      if (g == null) return !1;
      for (var f = 0; f < l.length; f++) {
        o.params[l[f].k] = l[f].r ? g[f + 1] : decodeURIComponent(g[f + 1]);
      }
      return !0;
    };
  };
});
var Fe = T((hi, Lt) => {
  "use strict";
  var vt = ce(),
    jt = new RegExp(
      "^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$",
    );
  Lt.exports = function (i, a) {
    var s = {};
    if (a != null) {
      for (var l in i) {
        vt.call(i, l) && !jt.test(l) && a.indexOf(l) < 0 && (s[l] = i[l]);
      }
    } else for (var l in i) vt.call(i, l) && !jt.test(l) && (s[l] = i[l]);
    return s;
  };
});
var Ft = T((yi, Ht) => {
  "use strict";
  var vr = G(), jr = Ne(), Dt = me(), _t = pe(), Lr = It(), Dr = Fe();
  function _r(i) {
    try {
      return decodeURIComponent(i);
    } catch {
      return i;
    }
  }
  Ht.exports = function (i, a) {
    var s = i == null
        ? null
        : typeof i.setImmediate == "function"
        ? i.setImmediate
        : i.setTimeout,
      l = Promise.resolve(),
      m = !1,
      o = !1,
      f = !1,
      g,
      h,
      b,
      A,
      S,
      I,
      w,
      P,
      X = {
        onremove: function () {
          o = f = !1, i.removeEventListener("popstate", $, !1);
        },
        view: function () {
          var y = vr(S, I.key, I);
          return A ? A.render(y) : [y];
        },
      },
      K = N.SKIP = {};
    function B() {
      m = !1;
      var y = i.location.hash;
      N.prefix[0] !== "#" &&
        (y = i.location.search + y,
          N.prefix[0] !== "?" &&
          (y = i.location.pathname + y, y[0] !== "/" && (y = "/" + y)));
      var O = y.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, _r).slice(
          N.prefix.length,
        ),
        x = _t(O);
      Object.assign(x.params, i.history.state);
      function j(q) {
        console.error(q), N.set(b, null, { replace: !0 });
      }
      z(0);
      function z(q) {
        for (; q < h.length; q++) {
          if (h[q].check(x)) {
            var L = h[q].component,
              Y = h[q].route,
              ie = L,
              Q = P = function (W) {
                if (Q === P) {
                  if (W === K) return z(q + 1);
                  S = W != null &&
                      (typeof W.view == "function" || typeof W == "function")
                    ? W
                    : "div",
                    I = x.params,
                    w = O,
                    P = null,
                    A = L.render ? L : null,
                    f ? a.redraw() : (f = !0, a.mount(g, X));
                }
              };
            L.view || typeof L == "function"
              ? (L = {}, Q(ie))
              : L.onmatch
              ? l.then(function () {
                return L.onmatch(x.params, O, Y);
              }).then(Q, O === b ? null : j)
              : Q();
            return;
          }
        }
        if (O === b) {
          throw new Error("Could not resolve default route " + b + ".");
        }
        N.set(b, null, { replace: !0 });
      }
    }
    function $() {
      m || (m = !0, s(B));
    }
    function N(y, O, x) {
      if (!y) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (
        h = Object.keys(x).map(function (z) {
          if (z[0] !== "/") {
            throw new SyntaxError("Routes must start with a '/'.");
          }
          if (/:([^\/\.-]+)(\.{3})?:/.test(z)) {
            throw new SyntaxError(
              "Route parameter names must be separated with either '/', '.', or '-'.",
            );
          }
          return { route: z, component: x[z], check: Lr(z) };
        }),
          b = O,
          O != null
      ) {
        var j = _t(O);
        if (
          !h.some(function (z) {
            return z.check(j);
          })
        ) {
          throw new ReferenceError(
            "Default route doesn't match any known routes.",
          );
        }
      }
      g = y, i.addEventListener("popstate", $, !1), o = !0, B();
    }
    return N.set = function (y, O, x) {
      if (
        P != null && (x = x || {}, x.replace = !0), P = null, y = Dt(y, O), o
      ) {
        $();
        var j = x ? x.state : null, z = x ? x.title : null;
        x && x.replace
          ? i.history.replaceState(j, z, N.prefix + y)
          : i.history.pushState(j, z, N.prefix + y);
      } else i.location.href = N.prefix + y;
    },
      N.get = function () {
        return w;
      },
      N.prefix = "#!",
      N.Link = {
        view: function (y) {
          var O = jr(
              y.attrs.selector || "a",
              Dr(y.attrs, ["options", "params", "selector", "onclick"]),
              y.children,
            ),
            x,
            j,
            z;
          return (O.attrs.disabled = !!O.attrs.disabled)
            ? (O.attrs.href = null, O.attrs["aria-disabled"] = "true")
            : (x = y.attrs.options,
              j = y.attrs.onclick,
              z = Dt(O.attrs.href, y.attrs.params),
              O.attrs.href = N.prefix + z,
              O.attrs.onclick = function (q) {
                var L;
                typeof j == "function"
                  ? L = j.call(q.currentTarget, q)
                  : j == null || typeof j != "object" ||
                    typeof j.handleEvent == "function" && j.handleEvent(q),
                  L !== !1 && !q.defaultPrevented &&
                  (q.button === 0 || q.which === 0 || q.which === 1) &&
                  (!q.currentTarget.target ||
                    q.currentTarget.target === "_self") &&
                  !q.ctrlKey && !q.metaKey && !q.shiftKey && !q.altKey &&
                  (q.preventDefault(), q.redraw = !1, N.set(z, null, x));
              }),
            O;
        },
      },
      N.param = function (y) {
        return I && y != null ? I[y] : I;
      },
      N;
  };
});
var Vt = T((gi, Ut) => {
  "use strict";
  var Hr = oe();
  Ut.exports = Ft()(typeof window < "u" ? window : null, Hr);
});
var ee = T((wi, Bt) => {
  "use strict";
  var he = ot(),
    Fr = zt(),
    $t = oe(),
    Ur = ve(),
    H = function () {
      return he.apply(this, arguments);
    };
  H.m = he;
  H.trust = he.trust;
  H.fragment = he.fragment;
  H.Fragment = "[";
  H.mount = $t.mount;
  H.route = Vt();
  H.render = De();
  H.redraw = $t.redraw;
  H.request = Fr.request;
  H.parseQueryString = He();
  H.buildQueryString = _e();
  H.parsePathname = pe();
  H.buildPathname = me();
  H.vnode = G();
  H.censor = Fe();
  H.domFor = Ur.domFor;
  Bt.exports = H;
});
var Zt = fe(ee());
var te = fe(ee());
var D = fe(ee());
function Ue(i, a) {
  console.info(`broadcasting event: ${i}`, a),
    document.dispatchEvent(new CustomEvent(i, { detail: a }));
}
function Vr() {
  let i = (a) => {
    Ue("click_burger_menu", {});
  };
  return {
    view() {
      return (0, D.default)(
        "a",
        { href: "/", onclick: i },
        (0, D.default)("span.burger", "\u039E"),
      );
    },
  };
}
function $r() {
  let i = "photos";
  return {
    view() {
      return (0, D.default)(
        "a",
        { href: "/" },
        (0, D.default)("span.brand", i),
      );
    },
  };
}
function Br() {
  let i = (0, D.default)("path", {
    fill: "#ff9132",
    d: "M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z",
  });
  return {
    view() {
      return (0, D.default)("a.rss", {
        title: "rss",
        href: "/manifest/atom-index.xml",
      }, [
        (0, D.default)("svg", {
          alt: "rss",
          width: "25px",
          height: "25px",
          viewBox: "0 0 32 32",
          style: "position: relative; top: 5px;",
        }, [i]),
      ]);
    },
  };
}
function Kr() {
  return {
    view(i) {
      let a = i.attrs.darkMode ? "\u2600\uFE0F" : "\u{1F319}";
      return (0, D.default)(
        "a",
        {},
        (0, D.default)("span.brand.switch", {
          onclick: () => {
            Ue("switch_theme", {});
          },
        }, a),
      );
    },
  };
}
function Kt() {
  return {
    view(i) {
      return (0, D.default)("nav.header", { role: "navigation" }, [
        (0, D.default)("ul", [
          (0, D.default)("li", {}, (0, D.default)(Vr())),
          (0, D.default)("li", {}, (0, D.default)($r())),
          (0, D.default)(
            "li.rss-tag",
            { style: "float: right" },
            (0, D.default)(Br()),
          ),
          (0, D.default)(
            "li",
            { style: "float: right" },
            (0, D.default)(Kr(), { darkMode: i.attrs.darkMode }),
          ),
        ]),
      ]);
    },
  };
}
var Ve = class {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }
  static save(a) {
    return localStorage.setItem("darkMode", `${a}`);
  }
};
function Qt() {
  return { darkMode: Ve.load() };
}
var J = fe(ee());
function ye() {
  return {
    view(i) {
      return (0, J.default)("li", {
        class: "sidebar-item",
        onclick() {
          J.default.route.set(i.attrs.route);
        },
      }, i.attrs.name);
    },
  };
}
function Jt() {
  function i(a) {
    let s = ["photo-sidebar"];
    return a && s.push("sidebar-visible"), s.join(" ");
  }
  return {
    view(a) {
      return (0, J.default)("aside", { class: i(a.attrs.visible) }, [
        (0, J.default)("nav", [
          (0, J.default)("ul", [
            (0, J.default)(ye, { name: "PHOTOS", route: "/photos" }),
            (0, J.default)(ye, { name: "VIDEOS", route: "/videos" }),
            (0, J.default)(ye, { name: "ALBUMS", route: "/albums" }),
            (0, J.default)(ye, { name: "ABOUT", route: "/about" }),
          ]),
        ]),
      ]);
    },
  };
}
var Gt = Qt();
function Xt(i) {
  return {
    view(a) {
      return (0, te.default)("body", [
        (0, te.default)("div", [
          (0, te.default)(Kt, Gt),
          (0, te.default)("div", [
            (0, te.default)(Jt, { visible: Gt.sidebarVisible }),
            i,
          ]),
        ]),
      ]);
    },
  };
}
var re = fe(ee());
function Wt() {
  return { view() {} };
}
function Yt() {
  return {
    oninit() {
      document.title = "Albums - photos";
    },
    view(i) {
      let a = (0, re.default)("section.album-metadata", [
        (0, re.default)("h1.albums-header", "Albums"),
        (0, re.default)(Wt),
      ]);
      return (0, re.default)("div", [
        a,
        (0, re.default)("section.album-container", []),
      ]);
    },
  };
}
Zt.default.route(document.body, "/albums", { "/albums": Xt(Yt()) });
//# sourceMappingURL=app.js.map
