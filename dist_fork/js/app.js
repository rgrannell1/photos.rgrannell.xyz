var Ir = Object.create;
var le = Object.defineProperty;
var Sr = Object.getOwnPropertyDescriptor;
var Tr = Object.getOwnPropertyNames;
var Ar = Object.getPrototypeOf, vr = Object.prototype.hasOwnProperty;
var E = (i, n) => () => (n || i((n = { exports: {} }).exports, n), n.exports);
var qr = (i, n, a, l) => {
  if (n && typeof n == "object" || typeof n == "function") {
    for (let f of Tr(n)) {
      !vr.call(i, f) && f !== a && le(i, f, {
        get: () => n[f],
        enumerable: !(l = Sr(n, f)) || l.enumerable,
      });
    }
  }
  return i;
};
var J = (
  i,
  n,
  a,
) => (a = i != null ? Ir(Ar(i)) : {},
  qr(
    n || !i || !i.__esModule
      ? le(a, "default", { value: i, enumerable: !0 })
      : a,
    i,
  ));
var X = E((di, ue) => {
  "use strict";
  function nt(i, n, a, l, f, c) {
    return {
      tag: i,
      key: n,
      attrs: a,
      children: l,
      text: f,
      dom: c,
      is: void 0,
      domSize: void 0,
      state: void 0,
      events: void 0,
      instance: void 0,
    };
  }
  nt.normalize = function (i) {
    return Array.isArray(i)
      ? nt("[", void 0, void 0, nt.normalizeChildren(i), void 0, void 0)
      : i == null || typeof i == "boolean"
      ? null
      : typeof i == "object"
      ? i
      : nt("#", void 0, void 0, String(i), void 0, void 0);
  };
  nt.normalizeChildren = function (i) {
    var n = [];
    if (i.length) {
      for (var a = i[0] != null && i[0].key != null, l = 1; l < i.length; l++) {
        if ((i[l] != null && i[l].key != null) !== a) {
          throw new TypeError(
            a && (i[l] == null || typeof i[l] == "boolean")
              ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
              : "In fragments, vnodes must either all have keys or none have keys.",
          );
        }
      }
      for (var l = 0; l < i.length; l++) n[l] = nt.normalize(i[l]);
    }
    return n;
  };
  ue.exports = nt;
});
var Nt = E((gi, ce) => {
  "use strict";
  var Mr = X();
  ce.exports = function (i, n) {
    return i == null ||
        typeof i == "object" && i.tag == null && !Array.isArray(i)
      ? n.length === 1 && Array.isArray(n[0]) && (n = n[0])
      : (n = n.length === 0 && Array.isArray(i) ? i : [i, ...n], i = void 0),
      Mr("", i && i.key, i, n);
  };
});
var yt = E((yi, fe) => {
  "use strict";
  fe.exports = {}.hasOwnProperty;
});
var _t = E((wi, me) => {
  "use strict";
  me.exports = {};
});
var kt = E((bi, he) => {
  "use strict";
  var Er = _t();
  he.exports = new Map([[Er, !0]]);
});
var Vt = E((xi, ge) => {
  "use strict";
  var Dr = X(),
    Rr = Nt(),
    Ht = yt(),
    pe = _t(),
    Or = kt(),
    Cr =
      /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
    de = Object.create(null);
  function Pr(i) {
    for (var n in i) if (Ht.call(i, n)) return !1;
    return !0;
  }
  function $r(i) {
    return i === "value" || i === "checked" || i === "selectedIndex" ||
      i === "selected";
  }
  function Ur(i) {
    for (var n, a = "div", l = [], f = {}, c = !0; n = Cr.exec(i);) {
      var o = n[1], h = n[2];
      if (o === "" && h !== "") a = h;
      else if (o === "#") f.id = h;
      else if (o === ".") l.push(h);
      else if (n[3][0] === "[") {
        var p = n[6];
        p && (p = p.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")),
          n[4] === "class"
            ? l.push(p)
            : (f[n[4]] = p === "" ? p : p || !0, $r(n[4]) && (c = !1));
      }
    }
    return l.length > 0 && (f.className = l.join(" ")),
      Pr(f) ? f = pe : Or.set(f, c),
      de[i] = { tag: a, attrs: f, is: f.is };
  }
  function jr(i, n) {
    n.tag = i.tag;
    var a = n.attrs;
    if (a == null) return n.attrs = i.attrs, n.is = i.is, n;
    var l = Ht.call(a, "class"), f = l ? a.class : a.className;
    return i.attrs !== pe
      ? (a = Object.assign({}, i.attrs, a),
        (f != null || i.attrs.className != null) &&
        (a.className = f != null
          ? i.attrs.className != null
            ? String(i.attrs.className) + " " + String(f)
            : f
          : i.attrs.className))
      : f != null && (a.className = f),
      l && (a.class = null),
      i.tag === "input" && Ht.call(a, "type") &&
      (a = Object.assign({ type: a.type }, a)),
      n.is = a.is,
      n.attrs = a,
      n;
  }
  function zr(i, n, ...a) {
    if (
      i == null ||
      typeof i != "string" && typeof i != "function" &&
        typeof i.view != "function"
    ) throw Error("The selector must be either a string or a component.");
    var l = Rr(n, a);
    return typeof i == "string" &&
        (l.children = Dr.normalizeChildren(l.children), i !== "[")
      ? jr(de[i] || Ur(i), l)
      : (l.attrs == null && (l.attrs = {}), l.tag = i, l);
  }
  ge.exports = zr;
});
var we = E((Ii, ye) => {
  "use strict";
  var Lr = X();
  ye.exports = function (i) {
    return i == null && (i = ""), Lr("<", void 0, void 0, i, void 0, void 0);
  };
});
var xe = E((Si, be) => {
  "use strict";
  var Nr = X(), _r = Nt();
  be.exports = function (i, ...n) {
    var a = _r(i, n);
    return a.attrs == null && (a.attrs = {}),
      a.tag = "[",
      a.children = Nr.normalizeChildren(a.children),
      a;
  };
});
var Se = E((Ti, Ie) => {
  "use strict";
  var Ft = Vt();
  Ft.trust = we();
  Ft.fragment = xe();
  Ie.exports = Ft;
});
var Bt = E((Ai, Te) => {
  "use strict";
  var Qt = new WeakMap();
  function* kr(i) {
    var n = i.dom, a = i.domSize, l = Qt.get(n);
    if (n != null) {
      do {
        var f = n.nextSibling;
        Qt.get(n) === l && (yield n, a--), n = f;
      } while (a);
    }
  }
  Te.exports = { delayedRemoval: Qt, domFor: kr };
});
var Me = E((vi, qe) => {
  "use strict";
  var Yt = X(), ve = Bt(), Hr = ve.delayedRemoval, Wt = ve.domFor, Ae = kt();
  qe.exports = function () {
    var i = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML",
      },
      n,
      a;
    function l(e) {
      return e.ownerDocument;
    }
    function f(e) {
      return e.attrs && e.attrs.xmlns || i[e.tag];
    }
    function c(e, t) {
      if (e.state !== t) throw new Error("'vnode.state' must not be modified.");
    }
    function o(e) {
      var t = e.state;
      try {
        return this.apply(t, arguments);
      } finally {
        c(e, t);
      }
    }
    function h(e) {
      try {
        return l(e).activeElement;
      } catch {
        return null;
      }
    }
    function p(e, t, r, s, u, m, S) {
      for (var T = r; T < s; T++) {
        var d = t[T];
        d != null && w(e, d, u, S, m);
      }
    }
    function w(e, t, r, s, u) {
      var m = t.tag;
      if (typeof m == "string") {
        switch (t.state = {}, t.attrs != null && Ot(t.attrs, t, r), m) {
          case "#":
            b(e, t, u);
            break;
          case "<":
            D(e, t, s, u);
            break;
          case "[":
            y(e, t, r, s, u);
            break;
          default:
            M(e, t, r, s, u);
        }
      } else F(e, t, r, s, u);
    }
    function b(e, t, r) {
      t.dom = l(e).createTextNode(t.children), K(e, t.dom, r);
    }
    var v = {
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
    function D(e, t, r, s) {
      var u = t.children.match(/^\s*?<(\w+)/im) || [],
        m = l(e).createElement(v[u[1]] || "div");
      r === "http://www.w3.org/2000/svg"
        ? (m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' +
          t.children + "</svg>",
          m = m.firstChild)
        : m.innerHTML = t.children,
        t.dom = m.firstChild,
        t.domSize = m.childNodes.length;
      for (var S = l(e).createDocumentFragment(), T; T = m.firstChild;) {
        S.appendChild(T);
      }
      K(e, S, s);
    }
    function y(e, t, r, s, u) {
      var m = l(e).createDocumentFragment();
      if (t.children != null) {
        var S = t.children;
        p(m, S, 0, S.length, r, null, s);
      }
      t.dom = m.firstChild, t.domSize = m.childNodes.length, K(e, m, u);
    }
    function M(e, t, r, s, u) {
      var m = t.tag, S = t.attrs, T = t.is;
      s = f(t) || s;
      var d = s
        ? T ? l(e).createElementNS(s, m, { is: T }) : l(e).createElementNS(s, m)
        : T
        ? l(e).createElement(m, { is: T })
        : l(e).createElement(m);
      if (
        t.dom = d,
          S != null && pr(t, S, s),
          K(e, d, u),
          !et(t) && t.children != null
      ) {
        var A = t.children;
        p(d, A, 0, A.length, r, null, s),
          t.tag === "select" && S != null && gr(t, S);
      }
    }
    function W(e, t) {
      var r;
      if (typeof e.tag.view == "function") {
        if (
          e.state = Object.create(e.tag),
            r = e.state.view,
            r.$$reentrantLock$$ != null
        ) return;
        r.$$reentrantLock$$ = !0;
      } else {
        if (e.state = void 0, r = e.tag, r.$$reentrantLock$$ != null) return;
        r.$$reentrantLock$$ = !0,
          e.state =
            e.tag.prototype != null && typeof e.tag.prototype.view == "function"
              ? new e.tag(e)
              : e.tag(e);
      }
      if (
        Ot(e.state, e, t),
          e.attrs != null && Ot(e.attrs, e, t),
          e.instance = Yt.normalize(o.call(e.state.view, e)),
          e.instance === e
      ) throw Error("A view cannot return the vnode it received as argument");
      r.$$reentrantLock$$ = null;
    }
    function F(e, t, r, s, u) {
      W(t, r),
        t.instance != null
          ? (w(e, t.instance, r, s, u),
            t.dom = t.instance.dom,
            t.domSize = t.dom != null ? t.instance.domSize : 0)
          : t.domSize = 0;
    }
    function B(e, t, r, s, u, m) {
      if (!(t === r || t == null && r == null)) {
        if (t == null || t.length === 0) {
          p(e, r, 0, r.length, s, u, m);
        } else if (r == null || r.length === 0) mt(e, t, 0, t.length);
        else {
          var S = t[0] != null && t[0].key != null,
            T = r[0] != null && r[0].key != null,
            d = 0,
            A = 0;
          if (!S) { for (; A < t.length && t[A] == null;) A++; }
          if (!T) { for (; d < r.length && r[d] == null;) d++; }
          if (S !== T) mt(e, t, A, t.length), p(e, r, d, r.length, s, u, m);
          else if (T) {
            for (
              var k = t.length - 1, L = r.length - 1, gt, H, $, _, O, $t;
              k >= A && L >= d && (_ = t[k], O = r[L], _.key === O.key);
            ) {
              _ !== O && V(e, _, O, s, u, m),
                O.dom != null && (u = O.dom),
                k--,
                L--;
            }
            for (; k >= A && L >= d && (H = t[A], $ = r[d], H.key === $.key);) {
              A++, d++, H !== $ && V(e, H, $, s, it(t, A, u), m);
            }
            for (
              ;
              k >= A && L >= d &&
              !(d === L || H.key !== O.key || _.key !== $.key);
            ) {
              $t = it(t, A, u),
                ft(e, _, $t),
                _ !== $ && V(e, _, $, s, $t, m),
                ++d <= --L && ft(e, H, u),
                H !== O && V(e, H, O, s, u, m),
                O.dom != null && (u = O.dom),
                A++,
                k--,
                _ = t[k],
                O = r[L],
                H = t[A],
                $ = r[d];
            }
            for (; k >= A && L >= d && _.key === O.key;) {
              _ !== O && V(e, _, O, s, u, m),
                O.dom != null && (u = O.dom),
                k--,
                L--,
                _ = t[k],
                O = r[L];
            }
            if (d > L) mt(e, t, A, k + 1);
            else if (A > k) p(e, r, d, L + 1, s, u, m);
            else {
              var xr = u,
                oe = L - d + 1,
                pt = new Array(oe),
                Ut = 0,
                P = 0,
                jt = 2147483647,
                zt = 0,
                gt,
                Lt;
              for (P = 0; P < oe; P++) pt[P] = -1;
              for (P = L; P >= d; P--) {
                gt == null && (gt = R(t, A, k + 1)), O = r[P];
                var at = gt[O.key];
                at != null &&
                  (jt = at < jt ? at : -1,
                    pt[P - d] = at,
                    _ = t[at],
                    t[at] = null,
                    _ !== O && V(e, _, O, s, u, m),
                    O.dom != null && (u = O.dom),
                    zt++);
              }
              if (u = xr, zt !== k - A + 1 && mt(e, t, A, k + 1), zt === 0) {
                p(e, r, d, L + 1, s, u, m);
              } else if (jt === -1) {
                for (Lt = j(pt), Ut = Lt.length - 1, P = L; P >= d; P--) {
                  $ = r[P],
                    pt[P - d] === -1
                      ? w(e, $, s, m, u)
                      : Lt[Ut] === P - d
                      ? Ut--
                      : ft(e, $, u),
                    $.dom != null && (u = r[P].dom);
                }
              } else {for (P = L; P >= d; P--) {
                  $ = r[P],
                    pt[P - d] === -1 && w(e, $, s, m, u),
                    $.dom != null && (u = r[P].dom);
                }}
            }
          } else {
            var Pt = t.length < r.length ? t.length : r.length;
            for (d = d < A ? d : A; d < Pt; d++) {
              H = t[d],
                $ = r[d],
                !(H === $ || H == null && $ == null) && (H == null
                  ? w(e, $, s, m, it(t, d + 1, u))
                  : $ == null
                  ? dt(e, H)
                  : V(e, H, $, s, it(t, d + 1, u), m));
            }
            t.length > Pt && mt(e, t, d, t.length),
              r.length > Pt && p(e, r, d, r.length, s, u, m);
          }
        }
      }
    }
    function V(e, t, r, s, u, m) {
      var S = t.tag, T = r.tag;
      if (S === T && t.is === r.is) {
        if (r.state = t.state, r.events = t.events, br(r, t)) return;
        if (typeof S == "string") {
          switch (r.attrs != null && Ct(r.attrs, r, s), S) {
            case "#":
              C(t, r);
              break;
            case "<":
              g(e, t, r, m, u);
              break;
            case "[":
              q(e, t, r, s, u, m);
              break;
            default:
              x(t, r, s, m);
          }
        } else U(e, t, r, s, u, m);
      } else dt(e, t), w(e, r, s, m, u);
    }
    function C(e, t) {
      e.children.toString() !== t.children.toString() &&
      (e.dom.nodeValue = t.children), t.dom = e.dom;
    }
    function g(e, t, r, s, u) {
      t.children !== r.children
        ? (re(e, t), D(e, r, s, u))
        : (r.dom = t.dom, r.domSize = t.domSize);
    }
    function q(e, t, r, s, u, m) {
      B(e, t.children, r.children, s, u, m);
      var S = 0, T = r.children;
      if (r.dom = null, T != null) {
        for (var d = 0; d < T.length; d++) {
          var A = T[d];
          A != null && A.dom != null &&
            (r.dom == null && (r.dom = A.dom), S += A.domSize || 1);
        }
        S !== 1 && (r.domSize = S);
      }
    }
    function x(e, t, r, s) {
      var u = t.dom = e.dom;
      s = f(t) || s,
        (e.attrs != t.attrs || t.attrs != null && !Ae.get(t.attrs)) &&
        yr(t, e.attrs, t.attrs, s),
        et(t) || B(u, e.children, t.children, r, null, s);
    }
    function U(e, t, r, s, u, m) {
      if (
        r.instance = Yt.normalize(o.call(r.state.view, r)), r.instance === r
      ) throw Error("A view cannot return the vnode it received as argument");
      Ct(r.state, r, s),
        r.attrs != null && Ct(r.attrs, r, s),
        r.instance != null
          ? (t.instance == null
            ? w(e, r.instance, s, m, u)
            : V(e, t.instance, r.instance, s, u, m),
            r.dom = r.instance.dom,
            r.domSize = r.instance.domSize)
          : t.instance != null
          ? (dt(e, t.instance), r.dom = void 0, r.domSize = 0)
          : (r.dom = t.dom, r.domSize = t.domSize);
    }
    function R(e, t, r) {
      for (var s = Object.create(null); t < r; t++) {
        var u = e[t];
        if (u != null) {
          var m = u.key;
          m != null && (s[m] = t);
        }
      }
      return s;
    }
    var I = [];
    function j(e) {
      for (
        var t = [0], r = 0, s = 0, u = 0, m = I.length = e.length, u = 0;
        u < m;
        u++
      ) I[u] = e[u];
      for (var u = 0; u < m; ++u) {
        if (e[u] !== -1) {
          var S = t[t.length - 1];
          if (e[S] < e[u]) {
            I[u] = S, t.push(u);
            continue;
          }
          for (r = 0, s = t.length - 1; r < s;) {
            var T = (r >>> 1) + (s >>> 1) + (r & s & 1);
            e[t[T]] < e[u] ? r = T + 1 : s = T;
          }
          e[u] < e[t[r]] && (r > 0 && (I[u] = t[r - 1]), t[r] = u);
        }
      }
      for (r = t.length, s = t[r - 1]; r-- > 0;) t[r] = s, s = I[s];
      return I.length = 0, t;
    }
    function it(e, t, r) {
      for (; t < e.length; t++) {
        if (e[t] != null && e[t].dom != null) return e[t].dom;
      }
      return r;
    }
    function ft(e, t, r) {
      if (t.dom != null) {
        var s;
        if (t.domSize == null) s = t.dom;
        else {
          s = l(e).createDocumentFragment();
          for (var u of Wt(t)) s.appendChild(u);
        }
        K(e, s, r);
      }
    }
    function K(e, t, r) {
      r != null ? e.insertBefore(t, r) : e.appendChild(t);
    }
    function et(e) {
      if (
        e.attrs == null ||
        e.attrs.contenteditable == null && e.attrs.contentEditable == null
      ) return !1;
      var t = e.children;
      if (t != null && t.length === 1 && t[0].tag === "<") {
        var r = t[0].children;
        e.dom.innerHTML !== r && (e.dom.innerHTML = r);
      } else if (t != null && t.length !== 0) {
        throw new Error("Child node of a contenteditable must be trusted.");
      }
      return !0;
    }
    function mt(e, t, r, s) {
      for (var u = r; u < s; u++) {
        var m = t[u];
        m != null && dt(e, m);
      }
    }
    function te(e, t, r, s) {
      var u = t.state, m = o.call(r.onbeforeremove, t);
      if (m != null) {
        var S = a;
        for (var T of Wt(t)) Hr.set(T, S);
        s.v++,
          Promise.resolve(m).finally(function () {
            c(t, u), ee(e, t, s);
          });
      }
    }
    function ee(e, t, r) {
      --r.v === 0 && (Et(t), re(e, t));
    }
    function dt(e, t) {
      var r = { v: 1 };
      typeof t.tag != "string" && typeof t.state.onbeforeremove == "function" &&
      te(e, t, t.state, r),
        t.attrs && typeof t.attrs.onbeforeremove == "function" &&
        te(e, t, t.attrs, r),
        ee(e, t, r);
    }
    function re(e, t) {
      if (t.dom != null) {
        if (t.domSize == null) e.removeChild(t.dom);
        else for (var r of Wt(t)) e.removeChild(r);
      }
    }
    function Et(e) {
      if (
        typeof e.tag != "string" && typeof e.state.onremove == "function" &&
        o.call(e.state.onremove, e),
          e.attrs && typeof e.attrs.onremove == "function" &&
          o.call(e.attrs.onremove, e),
          typeof e.tag != "string"
      ) e.instance != null && Et(e.instance);
      else {
        e.events != null && (e.events._ = null);
        var t = e.children;
        if (Array.isArray(t)) {
          for (var r = 0; r < t.length; r++) {
            var s = t[r];
            s != null && Et(s);
          }
        }
      }
    }
    function pr(e, t, r) {
      for (var s in t) Dt(e, s, null, t[s], r);
    }
    function Dt(e, t, r, s, u) {
      if (
        !(t === "key" || s == null || ie(t) ||
          r === s && !wr(e, t) && typeof s != "object")
      ) {
        if (t[0] === "o" && t[1] === "n") return ae(e, t, s);
        if (t.slice(0, 6) === "xlink:") {
          e.dom.setAttributeNS("http://www.w3.org/1999/xlink", t.slice(6), s);
        } else if (t === "style") se(e.dom, r, s);
        else if (ne(e, t, u)) {
          if (t === "value") {
            if (
              (e.tag === "input" || e.tag === "textarea") &&
                e.dom.value === "" + s ||
              e.tag === "select" && r !== null && e.dom.value === "" + s ||
              e.tag === "option" && r !== null && e.dom.value === "" + s
            ) return;
            if (e.tag === "input" && e.attrs.type === "file" && "" + s != "") {
              console.error("`value` is read-only on file inputs!");
              return;
            }
          }
          e.tag === "input" && t === "type"
            ? e.dom.setAttribute(t, s)
            : e.dom[t] = s;
        } else {typeof s == "boolean"
            ? s ? e.dom.setAttribute(t, "") : e.dom.removeAttribute(t)
            : e.dom.setAttribute(t === "className" ? "class" : t, s);}
      }
    }
    function dr(e, t, r, s) {
      if (!(t === "key" || r == null || ie(t))) {
        if (t[0] === "o" && t[1] === "n") {
          ae(e, t, void 0);
        } else if (t === "style") se(e.dom, r, null);
        else if (
          ne(e, t, s) && t !== "className" && t !== "title" &&
          !(t === "value" &&
            (e.tag === "option" ||
              e.tag === "select" && e.dom.selectedIndex === -1 &&
                e.dom === h(e.dom))) &&
          !(e.tag === "input" && t === "type")
        ) e.dom[t] = null;
        else {
          var u = t.indexOf(":");
          u !== -1 && (t = t.slice(u + 1)),
            r !== !1 && e.dom.removeAttribute(t === "className" ? "class" : t);
        }
      }
    }
    function gr(e, t) {
      if ("value" in t) {
        if (t.value === null) {
          e.dom.selectedIndex !== -1 && (e.dom.value = null);
        } else {
          var r = "" + t.value;
          (e.dom.value !== r || e.dom.selectedIndex === -1) &&
            (e.dom.value = r);
        }
      }
      "selectedIndex" in t &&
        Dt(e, "selectedIndex", null, t.selectedIndex, void 0);
    }
    function yr(e, t, r, s) {
      var u;
      if (t != null) {
        t === r && !Ae.has(r) &&
          console.warn(
            "Don't reuse attrs object, use new object for every redraw, this will throw in next major",
          );
        for (var m in t) {
          (u = t[m]) != null && (r == null || r[m] == null) && dr(e, m, u, s);
        }
      }
      if (r != null) { for (var m in r) Dt(e, m, t && t[m], r[m], s); }
    }
    function wr(e, t) {
      return t === "value" || t === "checked" || t === "selectedIndex" ||
        t === "selected" &&
          (e.dom === h(e.dom) ||
            e.tag === "option" && e.dom.parentNode === h(e.dom));
    }
    function ie(e) {
      return e === "oninit" || e === "oncreate" || e === "onupdate" ||
        e === "onremove" || e === "onbeforeremove" || e === "onbeforeupdate";
    }
    function ne(e, t, r) {
      return r === void 0 &&
        (e.tag.indexOf("-") > -1 || e.is ||
          t !== "href" && t !== "list" && t !== "form" && t !== "width" &&
            t !== "height") &&
        t in e.dom;
    }
    function se(e, t, r) {
      if (t !== r) {
        if (r == null) e.style = "";
        else if (typeof r != "object") e.style = r;
        else if (t == null || typeof t != "object") {
          e.style = "";
          for (var s in r) {
            var u = r[s];
            u != null &&
              (s.includes("-")
                ? e.style.setProperty(s, String(u))
                : e.style[s] = String(u));
          }
        } else {
          for (var s in t) {
            t[s] != null && r[s] == null &&
              (s.includes("-") ? e.style.removeProperty(s) : e.style[s] = "");
          }
          for (var s in r) {
            var u = r[s];
            u != null && (u = String(u)) !== String(t[s]) &&
              (s.includes("-") ? e.style.setProperty(s, u) : e.style[s] = u);
          }
        }
      }
    }
    function Rt() {
      this._ = n;
    }
    Rt.prototype = Object.create(null),
      Rt.prototype.handleEvent = function (e) {
        var t = this["on" + e.type], r;
        typeof t == "function"
          ? r = t.call(e.currentTarget, e)
          : typeof t.handleEvent == "function" && t.handleEvent(e);
        var s = this;
        s._ != null &&
        (e.redraw !== !1 && (0, s._)(),
          r != null && typeof r.then == "function" &&
          Promise.resolve(r).then(function () {
            s._ != null && e.redraw !== !1 && (0, s._)();
          })), r === !1 && (e.preventDefault(), e.stopPropagation());
      };
    function ae(e, t, r) {
      if (e.events != null) {
        if (e.events._ = n, e.events[t] === r) return;
        r != null && (typeof r == "function" || typeof r == "object")
          ? (e.events[t] == null &&
            e.dom.addEventListener(t.slice(2), e.events, !1),
            e.events[t] = r)
          : (e.events[t] != null &&
            e.dom.removeEventListener(t.slice(2), e.events, !1),
            e.events[t] = void 0);
      } else {r != null && (typeof r == "function" || typeof r == "object") &&
          (e.events = new Rt(),
            e.dom.addEventListener(t.slice(2), e.events, !1),
            e.events[t] = r);}
    }
    function Ot(e, t, r) {
      typeof e.oninit == "function" && o.call(e.oninit, t),
        typeof e.oncreate == "function" && r.push(o.bind(e.oncreate, t));
    }
    function Ct(e, t, r) {
      typeof e.onupdate == "function" && r.push(o.bind(e.onupdate, t));
    }
    function br(e, t) {
      do {
        if (e.attrs != null && typeof e.attrs.onbeforeupdate == "function") {
          var r = o.call(e.attrs.onbeforeupdate, e, t);
          if (r !== void 0 && !r) break;
        }
        if (
          typeof e.tag != "string" &&
          typeof e.state.onbeforeupdate == "function"
        ) {
          var r = o.call(e.state.onbeforeupdate, e, t);
          if (r !== void 0 && !r) break;
        }
        return !1;
      } while (!1);
      return e.dom = t.dom,
        e.domSize = t.domSize,
        e.instance = t.instance,
        e.attrs = t.attrs,
        e.children = t.children,
        e.text = t.text,
        !0;
    }
    var ht;
    return function (e, t, r) {
      if (!e) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (ht != null && e.contains(ht)) {
        throw new TypeError(
          "Node is currently being rendered to and thus is locked.",
        );
      }
      var s = n, u = ht, m = [], S = h(e), T = e.namespaceURI;
      ht = e, n = typeof r == "function" ? r : void 0, a = {};
      try {
        e.vnodes == null && (e.textContent = ""),
          t = Yt.normalizeChildren(Array.isArray(t) ? t : [t]),
          B(
            e,
            e.vnodes,
            t,
            m,
            null,
            T === "http://www.w3.org/1999/xhtml" ? void 0 : T,
          ),
          e.vnodes = t,
          S != null && h(e) !== S && typeof S.focus == "function" && S.focus();
        for (var d = 0; d < m.length; d++) m[d]();
      } finally {
        n = s, ht = u;
      }
    };
  };
});
var Kt = E((qi, Ee) => {
  "use strict";
  Ee.exports = Me()(typeof window < "u" ? window : null);
});
var Oe = E((Mi, Re) => {
  "use strict";
  var De = X();
  Re.exports = function (i, n, a) {
    var l = [], f = !1, c = -1;
    function o() {
      for (c = 0; c < l.length; c += 2) {
        try {
          i(l[c], De(l[c + 1]), h);
        } catch (w) {
          a.error(w);
        }
      }
      c = -1;
    }
    function h() {
      f || (f = !0,
        n(function () {
          f = !1, o();
        }));
    }
    h.sync = o;
    function p(w, b) {
      if (b != null && b.view == null && typeof b != "function") {
        throw new TypeError("m.mount expects a component, not a vnode.");
      }
      var v = l.indexOf(w);
      v >= 0 && (l.splice(v, 2), v <= c && (c -= 2), i(w, [])),
        b != null && (l.push(w, b), i(w, De(b), h));
    }
    return { mount: p, redraw: h };
  };
});
var wt = E((Ei, Ce) => {
  "use strict";
  var Vr = Kt();
  Ce.exports = Oe()(
    Vr,
    typeof requestAnimationFrame < "u" ? requestAnimationFrame : null,
    typeof console < "u" ? console : null,
  );
});
var Jt = E((Di, Pe) => {
  "use strict";
  Pe.exports = function (i) {
    if (Object.prototype.toString.call(i) !== "[object Object]") return "";
    var n = [];
    for (var a in i) l(a, i[a]);
    return n.join("&");
    function l(f, c) {
      if (Array.isArray(c)) {
        for (var o = 0; o < c.length; o++) {
          l(
            f + "[" + o + "]",
            c[o],
          );
        }
      } else if (Object.prototype.toString.call(c) === "[object Object]") {
        for (var o in c) {
          l(f + "[" + o + "]", c[o]);
        }
      } else {n.push(
          encodeURIComponent(f) +
            (c != null && c !== "" ? "=" + encodeURIComponent(c) : ""),
        );}
    }
  };
});
var bt = E((Ri, $e) => {
  "use strict";
  var Fr = Jt();
  $e.exports = function (i, n) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(i)) {
      throw new SyntaxError(
        "Template parameter names must be separated by either a '/', '-', or '.'.",
      );
    }
    if (n == null) return i;
    var a = i.indexOf("?"),
      l = i.indexOf("#"),
      f = l < 0 ? i.length : l,
      c = a < 0 ? f : a,
      o = i.slice(0, c),
      h = {};
    Object.assign(h, n);
    var p = o.replace(/:([^\/\.-]+)(\.{3})?/g, function (W, F, B) {
        return delete h[F],
          n[F] == null ? W : B ? n[F] : encodeURIComponent(String(n[F]));
      }),
      w = p.indexOf("?"),
      b = p.indexOf("#"),
      v = b < 0 ? p.length : b,
      D = w < 0 ? v : w,
      y = p.slice(0, D);
    a >= 0 && (y += i.slice(a, f)),
      w >= 0 && (y += (a < 0 ? "?" : "&") + p.slice(w, v));
    var M = Fr(h);
    return M && (y += (a < 0 && w < 0 ? "?" : "&") + M),
      l >= 0 && (y += i.slice(l)),
      b >= 0 && (y += (l < 0 ? "" : "&") + p.slice(b)),
      y;
  };
});
var ze = E((Oi, je) => {
  "use strict";
  var Qr = bt(), Ue = yt();
  je.exports = function (i, n) {
    function a(c) {
      return new Promise(c);
    }
    function l(c, o) {
      return new Promise(function (h, p) {
        c = Qr(c, o.params);
        var w = o.method != null ? o.method.toUpperCase() : "GET",
          b = o.body,
          v = (o.serialize == null || o.serialize === JSON.serialize) &&
            !(b instanceof i.FormData || b instanceof i.URLSearchParams),
          D = o.responseType || (typeof o.extract == "function" ? "" : "json"),
          y = new i.XMLHttpRequest(),
          M = !1,
          W = !1,
          F = y,
          B,
          V = y.abort;
        y.abort = function () {
          M = !0, V.call(this);
        },
          y.open(
            w,
            c,
            o.async !== !1,
            typeof o.user == "string" ? o.user : void 0,
            typeof o.password == "string" ? o.password : void 0,
          ),
          v && b != null && !f(o, "content-type") &&
          y.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
          typeof o.deserialize != "function" && !f(o, "accept") &&
          y.setRequestHeader("Accept", "application/json, text/*"),
          o.withCredentials && (y.withCredentials = o.withCredentials),
          o.timeout && (y.timeout = o.timeout),
          y.responseType = D;
        for (var C in o.headers) {
          Ue.call(o.headers, C) && y.setRequestHeader(C, o.headers[C]);
        }
        y.onreadystatechange = function (g) {
          if (!M && g.target.readyState === 4) {
            try {
              var q = g.target.status >= 200 && g.target.status < 300 ||
                  g.target.status === 304 || /^file:\/\//i.test(c),
                x = g.target.response,
                U;
              if (D === "json") {
                if (!g.target.responseType && typeof o.extract != "function") {
                  try {
                    x = JSON.parse(g.target.responseText);
                  } catch {
                    x = null;
                  }
                }
              } else {(!D || D === "text") && x == null &&
                  (x = g.target.responseText);}
              if (
                typeof o.extract == "function"
                  ? (x = o.extract(g.target, o), q = !0)
                  : typeof o.deserialize == "function" &&
                    (x = o.deserialize(x)), q
              ) {
                if (typeof o.type == "function") {
                  if (Array.isArray(x)) {
                    for (var R = 0; R < x.length; R++) {
                      x[R] = new o.type(x[R]);
                    }
                  } else x = new o.type(x);
                }
                h(x);
              } else {
                var I = function () {
                  try {
                    U = g.target.responseText;
                  } catch {
                    U = x;
                  }
                  var j = new Error(U);
                  j.code = g.target.status, j.response = x, p(j);
                };
                y.status === 0
                  ? setTimeout(function () {
                    W || I();
                  })
                  : I();
              }
            } catch (j) {
              p(j);
            }
          }
        },
          y.ontimeout = function (g) {
            W = !0;
            var q = new Error("Request timed out");
            q.code = g.target.status, p(q);
          },
          typeof o.config == "function" &&
          (y = o.config(y, o, c) || y,
            y !== F && (B = y.abort,
              y.abort = function () {
                M = !0, B.call(this);
              })),
          b == null
            ? y.send()
            : typeof o.serialize == "function"
            ? y.send(o.serialize(b))
            : b instanceof i.FormData || b instanceof i.URLSearchParams
            ? y.send(b)
            : y.send(JSON.stringify(b));
      });
    }
    a.prototype = Promise.prototype, a.__proto__ = Promise;
    function f(c, o) {
      for (var h in c.headers) {
        if (Ue.call(c.headers, h) && h.toLowerCase() === o) return !0;
      }
      return !1;
    }
    return {
      request: function (c, o) {
        typeof c != "string" ? (o = c, c = c.url) : o == null && (o = {});
        var h = l(c, o);
        if (o.background === !0) return h;
        var p = 0;
        function w() {
          --p === 0 && typeof n == "function" && n();
        }
        return b(h);
        function b(v) {
          var D = v.then;
          return v.constructor = a,
            v.then = function () {
              p++;
              var y = D.apply(v, arguments);
              return y.then(w, function (M) {
                if (w(), p === 0) throw M;
              }),
                b(y);
            },
            v;
        }
      },
    };
  };
});
var Ne = E((Ci, Le) => {
  "use strict";
  var Br = wt();
  Le.exports = ze()(typeof window < "u" ? window : null, Br.redraw);
});
var Gt = E((Pi, ke) => {
  "use strict";
  function _e(i) {
    try {
      return decodeURIComponent(i);
    } catch {
      return i;
    }
  }
  ke.exports = function (i) {
    if (i === "" || i == null) return {};
    i.charAt(0) === "?" && (i = i.slice(1));
    for (var n = i.split("&"), a = {}, l = {}, f = 0; f < n.length; f++) {
      var c = n[f].split("="), o = _e(c[0]), h = c.length === 2 ? _e(c[1]) : "";
      h === "true" ? h = !0 : h === "false" && (h = !1);
      var p = o.split(/\]\[?|\[/), w = l;
      o.indexOf("[") > -1 && p.pop();
      for (var b = 0; b < p.length; b++) {
        var v = p[b], D = p[b + 1], y = D == "" || !isNaN(parseInt(D, 10));
        if (v === "") {
          var o = p.slice(0, b).join();
          a[o] == null && (a[o] = Array.isArray(w) ? w.length : 0), v = a[o]++;
        } else if (v === "__proto__") break;
        if (b === p.length - 1) w[v] = h;
        else {
          var M = Object.getOwnPropertyDescriptor(w, v);
          M != null && (M = M.value),
            M == null && (w[v] = M = y ? [] : {}),
            w = M;
        }
      }
    }
    return l;
  };
});
var xt = E(($i, He) => {
  "use strict";
  var Yr = Gt();
  He.exports = function (i) {
    var n = i.indexOf("?"),
      a = i.indexOf("#"),
      l = a < 0 ? i.length : a,
      f = n < 0 ? l : n,
      c = i.slice(0, f).replace(/\/{2,}/g, "/");
    return c ? c[0] !== "/" && (c = "/" + c) : c = "/",
      { path: c, params: n < 0 ? {} : Yr(i.slice(n + 1, l)) };
  };
});
var Fe = E((Ui, Ve) => {
  "use strict";
  var Wr = xt();
  Ve.exports = function (i) {
    var n = Wr(i),
      a = Object.keys(n.params),
      l = [],
      f = new RegExp(
        "^" +
          n.path.replace(
            /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
            function (c, o, h) {
              return o == null
                ? "\\" + c
                : (l.push({ k: o, r: h === "..." }),
                  h === "..."
                    ? "(.*)"
                    : h === "."
                    ? "([^/]+)\\."
                    : "([^/]+)" + (h || ""));
            },
          ) + "\\/?$",
      );
    return function (c) {
      for (var o = 0; o < a.length; o++) {
        if (n.params[a[o]] !== c.params[a[o]]) return !1;
      }
      if (!l.length) return f.test(c.path);
      var h = f.exec(c.path);
      if (h == null) return !1;
      for (var o = 0; o < l.length; o++) {
        c.params[l[o].k] = l[o].r ? h[o + 1] : decodeURIComponent(h[o + 1]);
      }
      return !0;
    };
  };
});
var Xt = E((ji, Ye) => {
  "use strict";
  var Qe = yt(),
    Be = new RegExp(
      "^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$",
    );
  Ye.exports = function (i, n) {
    var a = {};
    if (n != null) {
      for (var l in i) {
        Qe.call(i, l) && !Be.test(l) && n.indexOf(l) < 0 && (a[l] = i[l]);
      }
    } else for (var l in i) Qe.call(i, l) && !Be.test(l) && (a[l] = i[l]);
    return a;
  };
});
var Ge = E((zi, Je) => {
  "use strict";
  var Kr = X(), Jr = Vt(), We = bt(), Ke = xt(), Gr = Fe(), Xr = Xt();
  function Zr(i) {
    try {
      return decodeURIComponent(i);
    } catch {
      return i;
    }
  }
  Je.exports = function (i, n) {
    var a = i == null
        ? null
        : typeof i.setImmediate == "function"
        ? i.setImmediate
        : i.setTimeout,
      l = Promise.resolve(),
      f = !1,
      c = !1,
      o = !1,
      h,
      p,
      w,
      b,
      v,
      D,
      y,
      M,
      W = {
        onremove: function () {
          c = o = !1, i.removeEventListener("popstate", V, !1);
        },
        view: function () {
          var g = Kr(v, D.key, D);
          return b ? b.render(g) : [g];
        },
      },
      F = C.SKIP = {};
    function B() {
      f = !1;
      var g = i.location.hash;
      C.prefix[0] !== "#" &&
        (g = i.location.search + g,
          C.prefix[0] !== "?" &&
          (g = i.location.pathname + g, g[0] !== "/" && (g = "/" + g)));
      var q = g.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, Zr).slice(
          C.prefix.length,
        ),
        x = Ke(q);
      Object.assign(x.params, i.history.state);
      function U(I) {
        console.error(I), C.set(w, null, { replace: !0 });
      }
      R(0);
      function R(I) {
        for (; I < p.length; I++) {
          if (p[I].check(x)) {
            var j = p[I].component,
              it = p[I].route,
              ft = j,
              K = M = function (et) {
                if (K === M) {
                  if (et === F) return R(I + 1);
                  v = et != null &&
                      (typeof et.view == "function" || typeof et == "function")
                    ? et
                    : "div",
                    D = x.params,
                    y = q,
                    M = null,
                    b = j.render ? j : null,
                    o ? n.redraw() : (o = !0, n.mount(h, W));
                }
              };
            j.view || typeof j == "function"
              ? (j = {}, K(ft))
              : j.onmatch
              ? l.then(function () {
                return j.onmatch(x.params, q, it);
              }).then(K, q === w ? null : U)
              : K();
            return;
          }
        }
        if (q === w) {
          throw new Error("Could not resolve default route " + w + ".");
        }
        C.set(w, null, { replace: !0 });
      }
    }
    function V() {
      f || (f = !0, a(B));
    }
    function C(g, q, x) {
      if (!g) {
        throw new TypeError("DOM element being rendered to does not exist.");
      }
      if (
        p = Object.keys(x).map(function (R) {
          if (R[0] !== "/") {
            throw new SyntaxError("Routes must start with a '/'.");
          }
          if (/:([^\/\.-]+)(\.{3})?:/.test(R)) {
            throw new SyntaxError(
              "Route parameter names must be separated with either '/', '.', or '-'.",
            );
          }
          return { route: R, component: x[R], check: Gr(R) };
        }),
          w = q,
          q != null
      ) {
        var U = Ke(q);
        if (
          !p.some(function (R) {
            return R.check(U);
          })
        ) {
          throw new ReferenceError(
            "Default route doesn't match any known routes.",
          );
        }
      }
      h = g, i.addEventListener("popstate", V, !1), c = !0, B();
    }
    return C.set = function (g, q, x) {
      if (
        M != null && (x = x || {}, x.replace = !0), M = null, g = We(g, q), c
      ) {
        V();
        var U = x ? x.state : null, R = x ? x.title : null;
        x && x.replace
          ? i.history.replaceState(U, R, C.prefix + g)
          : i.history.pushState(U, R, C.prefix + g);
      } else i.location.href = C.prefix + g;
    },
      C.get = function () {
        return y;
      },
      C.prefix = "#!",
      C.Link = {
        view: function (g) {
          var q = Jr(
              g.attrs.selector || "a",
              Xr(g.attrs, ["options", "params", "selector", "onclick"]),
              g.children,
            ),
            x,
            U,
            R;
          return (q.attrs.disabled = !!q.attrs.disabled)
            ? (q.attrs.href = null, q.attrs["aria-disabled"] = "true")
            : (x = g.attrs.options,
              U = g.attrs.onclick,
              R = We(q.attrs.href, g.attrs.params),
              q.attrs.href = C.prefix + R,
              q.attrs.onclick = function (I) {
                var j;
                typeof U == "function"
                  ? j = U.call(I.currentTarget, I)
                  : U == null || typeof U != "object" ||
                    typeof U.handleEvent == "function" && U.handleEvent(I),
                  j !== !1 && !I.defaultPrevented &&
                  (I.button === 0 || I.which === 0 || I.which === 1) &&
                  (!I.currentTarget.target ||
                    I.currentTarget.target === "_self") &&
                  !I.ctrlKey && !I.metaKey && !I.shiftKey && !I.altKey &&
                  (I.preventDefault(), I.redraw = !1, C.set(R, null, x));
              }),
            q;
        },
      },
      C.param = function (g) {
        return D && g != null ? D[g] : D;
      },
      C;
  };
});
var Ze = E((Li, Xe) => {
  "use strict";
  var ti = wt();
  Xe.exports = Ge()(typeof window < "u" ? window : null, ti);
});
var Y = E((Ni, er) => {
  "use strict";
  var It = Se(),
    ei = Ne(),
    tr = wt(),
    ri = Bt(),
    N = function () {
      return It.apply(this, arguments);
    };
  N.m = It;
  N.trust = It.trust;
  N.fragment = It.fragment;
  N.Fragment = "[";
  N.mount = tr.mount;
  N.route = Ze();
  N.render = Kt();
  N.redraw = tr.redraw;
  N.request = ei.request;
  N.parseQueryString = Gt();
  N.buildQueryString = Jt();
  N.parsePathname = xt();
  N.buildPathname = bt();
  N.vnode = X();
  N.censor = Xt();
  N.domFor = ri.domFor;
  er.exports = N;
});
var hr = J(Y());
var st = J(Y());
var z = J(Y());
function ot(i, n) {
  console.info(`broadcasting event: ${i}`, n),
    document.dispatchEvent(new CustomEvent(i, { detail: n }));
}
function ii() {
  let i = (n) => {
    ot("click_burger_menu", {});
  };
  return {
    view() {
      return (0, z.default)(
        "a",
        { href: "/", onclick: i },
        (0, z.default)("span.burger", "\u039E"),
      );
    },
  };
}
function ni() {
  let i = "photos";
  return {
    view() {
      return (0, z.default)(
        "a",
        { href: "/" },
        (0, z.default)("span.brand", i),
      );
    },
  };
}
function si() {
  let i = (0, z.default)("path", {
    fill: "#ff9132",
    d: "M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z",
  });
  return {
    view() {
      return (0, z.default)("a.rss", {
        title: "rss",
        href: "/manifest/atom-index.xml",
      }, [
        (0, z.default)("svg", {
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
function ai() {
  return {
    view(i) {
      let n = i.attrs.darkMode ? "\u2600\uFE0F" : "\u{1F319}";
      return (0, z.default)(
        "a",
        {},
        (0, z.default)("span.brand.switch", {
          onclick: () => {
            ot("switch_theme", {});
          },
        }, n),
      );
    },
  };
}
function rr() {
  return {
    view(i) {
      return (0, z.default)("nav.header", { role: "navigation" }, [
        (0, z.default)("ul", [
          (0, z.default)("li", {}, (0, z.default)(ii())),
          (0, z.default)("li", {}, (0, z.default)(ni())),
          (0, z.default)(
            "li.rss-tag",
            { style: "float: right" },
            (0, z.default)(si()),
          ),
          (0, z.default)(
            "li",
            { style: "float: right" },
            (0, z.default)(ai(), { darkMode: i.attrs.darkMode }),
          ),
        ]),
      ]);
    },
  };
}
var St = class {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }
  static save(n) {
    return localStorage.setItem("darkMode", `${n}`);
  }
};
function ir() {
  return { darkMode: St.load(), sidebarVisible: !1 };
}
var G = J(Y());
function Tt() {
  return {
    view(i) {
      return (0, G.default)("li", {
        class: "sidebar-item",
        onclick() {
          G.default.route.set(i.attrs.route);
        },
      }, i.attrs.name);
    },
  };
}
function nr() {
  function i(n) {
    let a = ["photo-sidebar"];
    return n && a.push("sidebar-visible"), a.join(" ");
  }
  return {
    view(n) {
      return (0, G.default)("aside", { class: i(n.attrs.visible) }, [
        (0, G.default)("nav", [
          (0, G.default)("ul", [
            (0, G.default)(Tt, { name: "PHOTOS", route: "/photos" }),
            (0, G.default)(Tt, { name: "VIDEOS", route: "/videos" }),
            (0, G.default)(Tt, { name: "ALBUMS", route: "/albums" }),
            (0, G.default)(Tt, { name: "ABOUT", route: "/about" }),
          ]),
        ]),
      ]);
    },
  };
}
var Q = J(Y());
var tt = J(Y());
var Z = {
  photos: 1203,
  albums: 106,
  years: 13,
  countries: 18,
  bird_species: 142,
  mammal_species: 55,
  reptile_species: 5,
  amphibian_species: 3,
  fish_species: 1,
  unesco_sites: 8,
};
function li(i) {
  if (typeof i != "object" || i === null) {
    throw new Error("Stats is not an object");
  }
  let n = [
    "photos",
    "albums",
    "years",
    "countries",
    "bird_species",
    "mammal_species",
    "amphibian_species",
    "reptile_species",
    "unesco_sites",
  ];
  for (let a of n) {
    if (!(a in i)) throw new Error(`Stats is missing key: ${a}`);
    if (typeof i[a] != "number") {
      throw new Error(`Stats key ${a} is not a number`);
    }
  }
}
function sr() {
  return li(Z), {
    view() {
      return (0, tt.default)("p.photo-stats", [
        `${Z.photos} `,
        (0, tt.default)("a", { href: "#/photos" }, "photos"),
        " \xB7 ",
        `${Z.albums} albums \xB7 ${Z.years} years \xB7 `,
        `${Z.countries} `,
        (0, tt.default)("a", { href: "#/listing/country" }, "countries"),
        " \xB7 ",
        `${Z.bird_species} `,
        (0, tt.default)("a", { href: "#/listing/bird" }, "bird species"),
        " \xB7 ",
        `${Z.mammal_species} `,
        (0, tt.default)("a", { href: "#/listing/mammal" }, "mammal species"),
        " \xB7 a few ",
        (0, tt.default)("a", { href: "#/listing/amphibian" }, "amphibians"),
        " and ",
        (0, tt.default)("a", { href: "#/listing/reptile" }, "reptiles"),
        " \xB7 ",
        `${Z.unesco_sites} `,
        (0, tt.default)("a", { href: "#/thing/unesco:*" }, "UNESCO sites"),
      ]);
    },
  };
}
function ar() {
  return { view() {} };
}
var At = new Map(),
  lt = class {
    static loadingMode(n) {
      let a = globalThis.innerWidth,
        l = globalThis.innerHeight,
        f = 400,
        c = Math.floor(a / f),
        o = Math.floor(l / f);
      return n > c * o + 1 ? "lazy" : "eager";
    }
    static encodeBitmapDataURL(n) {
      if (At.has(n)) return At.get(n);
      let a = n.split("#").map((c) => `#${c}`),
        l = document.createElement("canvas");
      l.width = 2, l.height = 2;
      let f = l.getContext("2d");
      if (!f) throw new Error("context missing");
      return f.fillStyle = a[1],
        f.fillRect(0, 0, 1, 1),
        f.fillStyle = a[2],
        f.fillRect(1, 0, 1, 1),
        f.fillStyle = a[3],
        f.fillRect(0, 1, 1, 1),
        f.fillStyle = a[4],
        f.fillRect(1, 1, 1, 1),
        At.set(n, l.toDataURL("image/png")),
        At.get(n);
    }
  };
var rt = J(Y());
var ut = class {
  static isSmallerThan(n = 500) {
    return globalThis.matchMedia(`(max-width: ${n}px)`).matches;
  }
  static setTitle(n) {
    document.title = n;
  }
};
var qt = class {
  static parse(n) {
    let [a, l] = n.split(" ");
    return a = a.replace(/:/g, "-"), new Date(`${a} ${l}`);
  }
  static formatExifDate(n) {
    if (!n) return n;
    let a = new Date(n).toISOString(),
      [l, f] = a.split("T")[0].replace(/\:/g, "-");
    return `${l.replace(/\:/g, "/")} ${f}`;
  }
  static dateRange(n, a, l) {
    if (!n && !a) return "unknown date";
    let f = n instanceof Date ? n : new Date(parseFloat(n)),
      c = a instanceof Date ? a : new Date(parseFloat(a));
    if (l) {
      let o = { day: "numeric", month: "short" },
        h = f.toLocaleDateString("en-IE", o),
        p = c.toLocaleDateString("en-IE", o),
        w = f.toLocaleDateString("en-IE", { day: "numeric" }),
        b = c.toLocaleDateString("en-IE", { day: "numeric" }),
        v = f.toLocaleDateString("en-IE", { month: "short" }),
        D = c.toLocaleDateString("en-IE", { month: "short" }),
        y = f.getFullYear(),
        M = c.getFullYear(),
        W = v === D,
        F = y === M;
      return h === p
        ? `${h} ${y}`
        : W && F
        ? `${w} - ${b} ${D} ${y}`
        : `${h} ${y} - ${p} ${M}`;
    } else {
      let o = { year: "numeric", month: "short", day: "numeric" },
        h = f.toLocaleDateString("en-IE", o),
        p = c.toLocaleDateString("en-IE", o);
      return h === p ? h : `${h} \u2014 ${p}`;
    }
  }
};
function or() {
  function i(n, a) {
    if (!n || !a) return "unknown date";
    let l = ut.isSmallerThan(500);
    return qt.dateRange(n, a, l);
  }
  return {
    view(n) {
      let { title: a, minDate: l, maxDate: f, count: c, countryLinks: o } =
          n.attrs,
        h = c === 1 ? "photo" : "photos";
      return (0, rt.default)("div.photo-album-metadata", [
        (0, rt.default)("p.photo-album-title", a),
        (0, rt.default)("p.photo-album-date", [
          (0, rt.default)("time", i(l, f)),
        ]),
        (0, rt.default)("div.photo-metadata-inline", [
          (0, rt.default)("p.photo-album-count", `${c} ${h}`),
          (0, rt.default)("p.photo-album-countries", o),
        ]),
      ]);
    },
  };
}
var Zt = J(Y());
var ct = J(Y());
var ui = J(Y());
function ci(i, n) {
  ot("photo_loaded", { url: i });
  let a = n.target?.parentNode?.querySelector(".thumbnail-placeholder");
  a && (a.style.zIndex = "-1");
}
function fi() {
  return {
    view(i) {
      let { thumbnailUrl: n, loading: a, onclick: l } = i.attrs;
      return (0, ct.default)("img.thumbnail-image", {
        load: ci.bind(null, n),
        width: 400,
        height: 400,
        src: n,
        loading: a,
        onclick: l,
      });
    },
  };
}
function mi() {
  return {
    view(i) {
      let { thumbnailDataUrl: n } = i.attrs;
      return (0, ct.default)(
        "img.u-photo.thumbnail-image.thumbnail-placeholder",
        { width: 400, height: 400, src: n },
      );
    },
  };
}
function ur() {
  return {
    view(i) {
      let {
        imageUrl: n,
        thumbnailUrl: a,
        thumbnailDataUrl: l,
        loading: f,
        onclick: c,
      } = i.attrs;
      return (0, ct.default)("a", {
        href: n,
        target: "_blank",
        rel: "external",
      }, [
        (0, ct.default)(mi, { thumbnailDataUrl: l }),
        (0, ct.default)(fi, { thumbnailUrl: a, loading: f, onclick: c }),
      ]);
    },
  };
}
function cr() {
  return {
    view(i) {
      let {
        imageUrl: n,
        thumbnailUrl: a,
        thumbnailDataUrl: l,
        loading: f,
        child: c,
        onclick: o,
      } = i.attrs;
      return (0, Zt.default)("div.photo-album", [
        (0, Zt.default)(ur, {
          imageUrl: n,
          thumbnailUrl: a,
          thumbnailDataUrl: l,
          loading: f,
          onclick: o,
        }),
        c,
      ]);
    },
  };
}
function hi() {
  let i = [];
  function n(a) {
    return new Date(a.minDate).getFullYear();
  }
  return {
    view(a) {
      let l = 2e3, { albums: f } = a.attrs;
      for (let c = 0; c < f.length; c++) {
        let o = f[c], h = lt.loadingMode(c);
        if (l !== n(o)) {
          l = n(o);
          let b = (0, Q.default)("h2.album-year-header", l.toString());
          i.push(b);
        }
        let p = (0, Q.default)(or, {
            title: o.name,
            minDate: o.minDate,
            maxDate: o.maxDate,
            count: o.photosCount,
            countryLinks: [],
          }),
          w = (0, Q.default)(cr, {
            imageUrl: o.thumbnailUrl,
            thumbnailUrl: o.thumbnailUrl,
            thumbnailDataUrl: lt.encodeBitmapDataURL(o.mosaicColours),
            loading: h,
            onclick: () => {},
          });
        i.push(p), i.push(w);
      }
      return (0, Q.default)("section.album-container", i);
    },
  };
}
function Mt() {
  return {
    oninit() {
      ut.setTitle("Albums - photos");
    },
    view(i) {
      let n = (0, Q.default)("section.album-metadata", [
          (0, Q.default)("h1.albums-header", "Albums"),
          (0, Q.default)(sr),
        ]),
        a = (0, Q.default)("section.album-container", [
          (0, Q.default)(ar),
          (0, Q.default)(hi, { albums: i.attrs.albums }),
        ]);
      return (0, Q.default)("div", [n, a]);
    },
  };
}
var fr = ir();
function mr() {
  return {
    view(i) {
      return (0, st.default)("body", [
        (0, st.default)("div", [
          (0, st.default)(rr, fr),
          (0, st.default)("div", [
            (0, st.default)(nr, { visible: fr.sidebarVisible }),
            (0, st.default)(Mt, { albums: [] }),
          ]),
        ]),
      ]);
    },
  };
}
hr.default.mount(document.body, mr(Mt));
//# sourceMappingURL=app.js.map
