!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("vega"))
    : "function" == typeof define && define.amd
    ? define(["exports", "vega"], t)
    : t(
      (e = "undefined" != typeof globalThis ? globalThis : e || self).vegaLite =
        {},
      e.vega,
    );
}(this, function (e, t) {
  "use strict";
  var n = "5.19.0";
  function i(e) {
    return !!e.or;
  }
  function r(e) {
    return !!e.and;
  }
  function o(e) {
    return !!e.not;
  }
  function a(e, t) {
    if (o(e)) a(e.not, t);
    else if (r(e)) { for (const n of e.and) a(n, t); }
    else if (i(e)) { for (const n of e.or) a(n, t); }
    else t(e);
  }
  function s(e, t) {
    return o(e)
      ? { not: s(e.not, t) }
      : r(e)
      ? { and: e.and.map((e) => s(e, t)) }
      : i(e)
      ? { or: e.or.map((e) => s(e, t)) }
      : t(e);
  }
  const l = structuredClone;
  function c(e) {
    throw new Error(e);
  }
  function u(e, n) {
    const i = {};
    for (const r of n) t.hasOwnProperty(e, r) && (i[r] = e[r]);
    return i;
  }
  function f(e, t) {
    const n = { ...e };
    for (const e of t) delete n[e];
    return n;
  }
  function d(e) {
    if (t.isNumber(e)) return e;
    const n = t.isString(e) ? e : X(e);
    if (n.length < 250) return n;
    let i = 0;
    for (let e = 0; e < n.length; e++) {
      i = (i << 5) - i + n.charCodeAt(e), i |= 0;
    }
    return i;
  }
  function m(e) {
    return !1 === e || null === e;
  }
  function p(e, t) {
    return e.includes(t);
  }
  function g(e, t) {
    let n = 0;
    for (const [i, r] of e.entries()) if (t(r, i, n++)) return !0;
    return !1;
  }
  function h(e, t) {
    let n = 0;
    for (const [i, r] of e.entries()) if (!t(r, i, n++)) return !1;
    return !0;
  }
  function y(e) {
    for (
      var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
      i < t;
      i++
    ) n[i - 1] = arguments[i];
    for (const t of n) v(e, t ?? {});
    return e;
  }
  function v(e, n) {
    for (const i of D(n)) t.writeConfig(e, i, n[i], !0);
  }
  function b(e, t) {
    const n = [], i = {};
    let r;
    for (const o of e) r = t(o), r in i || (i[r] = 1, n.push(o));
    return n;
  }
  function x(e, t) {
    if (e.size !== t.size) return !1;
    for (const n of e) if (!t.has(n)) return !1;
    return !0;
  }
  function $(e, t) {
    for (const n of e) if (t.has(n)) return !0;
    return !1;
  }
  function w(e) {
    const n = new Set();
    for (const i of e) {
      const e = t.splitAccessPath(i).map((e, t) => 0 === t ? e : `[${e}]`),
        r = e.map((t, n) => e.slice(0, n + 1).join(""));
      for (const e of r) n.add(e);
    }
    return n;
  }
  function k(e, t) {
    return void 0 === e || void 0 === t || $(w(e), w(t));
  }
  function S(e) {
    return 0 === D(e).length;
  }
  Set.prototype.toJSON = function () {
    return `Set(${[...this].map((e) => X(e)).join(",")})`;
  };
  const D = Object.keys, F = Object.values, z = Object.entries;
  function O(e) {
    return !0 === e || !1 === e;
  }
  function C(e) {
    const t = e.replace(/\W/g, "_");
    return (e.match(/^\d+/) ? "_" : "") + t;
  }
  function N(e, t) {
    return o(e)
      ? `!(${N(e.not, t)})`
      : r(e)
      ? `(${e.and.map((e) => N(e, t)).join(") && (")})`
      : i(e)
      ? `(${e.or.map((e) => N(e, t)).join(") || (")})`
      : t(e);
  }
  function _(e, t) {
    if (0 === t.length) return !0;
    const n = t.shift();
    return n in e && _(e[n], t) && delete e[n], S(e);
  }
  function P(e) {
    return e.charAt(0).toUpperCase() + e.substr(1);
  }
  function A(e) {
    let n = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : "datum";
    const i = t.splitAccessPath(e), r = [];
    for (let e = 1; e <= i.length; e++) {
      const o = `[${i.slice(0, e).map(t.stringValue).join("][")}]`;
      r.push(`${n}${o}`);
    }
    return r.join(" && ");
  }
  function T(e) {
    return `${
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "datum"
    }[${t.stringValue(t.splitAccessPath(e).join("."))}]`;
  }
  function j(e) {
    return e.replace(/(\[|\]|\.|'|")/g, "\\$1");
  }
  function E(e) {
    return `${t.splitAccessPath(e).map(j).join("\\.")}`;
  }
  function M(e, t, n) {
    return e.replace(
      new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
      n,
    );
  }
  function R(e) {
    return `${t.splitAccessPath(e).join(".")}`;
  }
  function L(e) {
    return e ? t.splitAccessPath(e).length : 0;
  }
  function q() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    for (const e of t) if (void 0 !== e) return e;
  }
  let U = 42;
  function W(e) {
    const t = ++U;
    return e ? String(e) + t : t;
  }
  function I(e) {
    return B(e) ? e : `__${e}`;
  }
  function B(e) {
    return e.startsWith("__");
  }
  function V(e) {
    if (void 0 !== e) return (e % 360 + 360) % 360;
  }
  function H(e) {
    return !!t.isNumber(e) || !isNaN(e) && !isNaN(parseFloat(e));
  }
  const G = Object.getPrototypeOf(structuredClone({}));
  function Y(e, t) {
    if (e === t) return !0;
    if (e && t && "object" == typeof e && "object" == typeof t) {
      if (e.constructor.name !== t.constructor.name) return !1;
      let n, i;
      if (Array.isArray(e)) {
        if (n = e.length, n != t.length) return !1;
        for (i = n; 0 != i--;) if (!Y(e[i], t[i])) return !1;
        return !0;
      }
      if (e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) return !1;
        for (i of e.entries()) if (!t.has(i[0])) return !1;
        for (i of e.entries()) if (!Y(i[1], t.get(i[0]))) return !1;
        return !0;
      }
      if (e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) return !1;
        for (i of e.entries()) if (!t.has(i[0])) return !1;
        return !0;
      }
      if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
        if (n = e.length, n != t.length) return !1;
        for (i = n; 0 != i--;) if (e[i] !== t[i]) return !1;
        return !0;
      }
      if (e.constructor === RegExp) {
        return e.source === t.source && e.flags === t.flags;
      }
      if (e.valueOf !== Object.prototype.valueOf && e.valueOf !== G.valueOf) {
        return e.valueOf() === t.valueOf();
      }
      if (
        e.toString !== Object.prototype.toString && e.toString !== G.toString
      ) return e.toString() === t.toString();
      const r = Object.keys(e);
      if (n = r.length, n !== Object.keys(t).length) return !1;
      for (i = n; 0 != i--;) {
        if (!Object.prototype.hasOwnProperty.call(t, r[i])) return !1;
      }
      for (i = n; 0 != i--;) {
        const n = r[i];
        if (!Y(e[n], t[n])) return !1;
      }
      return !0;
    }
    return e != e && t != t;
  }
  function X(e) {
    const t = [];
    return function e(n) {
      if (
        n && n.toJSON && "function" == typeof n.toJSON && (n = n.toJSON()),
          void 0 === n
      ) return;
      if ("number" == typeof n) return isFinite(n) ? "" + n : "null";
      if ("object" != typeof n) return JSON.stringify(n);
      let i, r;
      if (Array.isArray(n)) {
        for (r = "[", i = 0; i < n.length; i++) {
          i && (r += ","), r += e(n[i]) || "null";
        }
        return r + "]";
      }
      if (null === n) return "null";
      if (t.includes(n)) {
        throw new TypeError("Converting circular structure to JSON");
      }
      const o = t.push(n) - 1, a = Object.keys(n).sort();
      for (r = "", i = 0; i < a.length; i++) {
        const t = a[i], o = e(n[t]);
        o && (r && (r += ","), r += JSON.stringify(t) + ":" + o);
      }
      return t.splice(o, 1), `{${r}}`;
    }(e);
  }
  const Q = "row",
    J = "column",
    K = "facet",
    Z = "x",
    ee = "y",
    te = "x2",
    ne = "y2",
    ie = "xOffset",
    re = "yOffset",
    oe = "radius",
    ae = "radius2",
    se = "theta",
    le = "theta2",
    ce = "latitude",
    ue = "longitude",
    fe = "latitude2",
    de = "longitude2",
    me = "color",
    pe = "fill",
    ge = "stroke",
    he = "shape",
    ye = "size",
    ve = "angle",
    be = "opacity",
    xe = "fillOpacity",
    $e = "strokeOpacity",
    we = "strokeWidth",
    ke = "strokeDash",
    Se = "text",
    De = "order",
    Fe = "detail",
    ze = "key",
    Oe = "tooltip",
    Ce = "href",
    Ne = "url",
    _e = "description",
    Pe = { theta: 1, theta2: 1, radius: 1, radius2: 1 };
  function Ae(e) {
    return e in Pe;
  }
  const Te = { longitude: 1, longitude2: 1, latitude: 1, latitude2: 1 };
  function je(e) {
    switch (e) {
      case ce:
        return "y";
      case fe:
        return "y2";
      case ue:
        return "x";
      case de:
        return "x2";
    }
  }
  function Ee(e) {
    return e in Te;
  }
  const Me = D(Te),
    Re = {
      x: 1,
      y: 1,
      x2: 1,
      y2: 1,
      ...Pe,
      ...Te,
      xOffset: 1,
      yOffset: 1,
      color: 1,
      fill: 1,
      stroke: 1,
      opacity: 1,
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeDash: 1,
      size: 1,
      angle: 1,
      shape: 1,
      order: 1,
      text: 1,
      detail: 1,
      key: 1,
      tooltip: 1,
      href: 1,
      url: 1,
      description: 1,
    };
  function Le(e) {
    return e === me || e === pe || e === ge;
  }
  const qe = { row: 1, column: 1, facet: 1 },
    Ue = D(qe),
    We = { ...Re, ...qe },
    Ie = D(We),
    { order: Be, detail: Ve, tooltip: He, ...Ge } = We,
    { row: Ye, column: Xe, facet: Qe, ...Je } = Ge;
  function Ke(e) {
    return !!We[e];
  }
  const Ze = [te, ne, fe, de, le, ae];
  function et(e) {
    return tt(e) !== e;
  }
  function tt(e) {
    switch (e) {
      case te:
        return Z;
      case ne:
        return ee;
      case fe:
        return ce;
      case de:
        return ue;
      case le:
        return se;
      case ae:
        return oe;
    }
    return e;
  }
  function nt(e) {
    if (Ae(e)) {
      switch (e) {
        case se:
          return "startAngle";
        case le:
          return "endAngle";
        case oe:
          return "outerRadius";
        case ae:
          return "innerRadius";
      }
    }
    return e;
  }
  function it(e) {
    switch (e) {
      case Z:
        return te;
      case ee:
        return ne;
      case ce:
        return fe;
      case ue:
        return de;
      case se:
        return le;
      case oe:
        return ae;
    }
  }
  function rt(e) {
    switch (e) {
      case Z:
      case te:
        return "width";
      case ee:
      case ne:
        return "height";
    }
  }
  function ot(e) {
    switch (e) {
      case Z:
        return "xOffset";
      case ee:
        return "yOffset";
      case te:
        return "x2Offset";
      case ne:
        return "y2Offset";
      case se:
        return "thetaOffset";
      case oe:
        return "radiusOffset";
      case le:
        return "theta2Offset";
      case ae:
        return "radius2Offset";
    }
  }
  function at(e) {
    switch (e) {
      case Z:
        return "xOffset";
      case ee:
        return "yOffset";
    }
  }
  function st(e) {
    switch (e) {
      case "xOffset":
        return "x";
      case "yOffset":
        return "y";
    }
  }
  const lt = D(Re),
    {
      x: ct,
      y: ut,
      x2: ft,
      y2: dt,
      xOffset: mt,
      yOffset: pt,
      latitude: gt,
      longitude: ht,
      latitude2: yt,
      longitude2: vt,
      theta: bt,
      theta2: xt,
      radius: $t,
      radius2: wt,
      ...kt
    } = Re,
    St = D(kt),
    Dt = { x: 1, y: 1 },
    Ft = D(Dt);
  function zt(e) {
    return e in Dt;
  }
  const Ot = { theta: 1, radius: 1 }, Ct = D(Ot);
  function Nt(e) {
    return "width" === e ? Z : ee;
  }
  const _t = { xOffset: 1, yOffset: 1 };
  function Pt(e) {
    return e in _t;
  }
  const {
      text: At,
      tooltip: Tt,
      href: jt,
      url: Et,
      description: Mt,
      detail: Rt,
      key: Lt,
      order: qt,
      ...Ut
    } = kt,
    Wt = D(Ut);
  const It = { ...Dt, ...Ot, ..._t, ...Ut }, Bt = D(It);
  function Vt(e) {
    return !!It[e];
  }
  function Ht(e, t) {
    return function (e) {
      switch (e) {
        case me:
        case pe:
        case ge:
        case _e:
        case Fe:
        case ze:
        case Oe:
        case Ce:
        case De:
        case be:
        case xe:
        case $e:
        case we:
        case K:
        case Q:
        case J:
          return Gt;
        case Z:
        case ee:
        case ie:
        case re:
        case ce:
        case ue:
          return Xt;
        case te:
        case ne:
        case fe:
        case de:
          return {
            area: "always",
            bar: "always",
            image: "always",
            rect: "always",
            rule: "always",
            circle: "binned",
            point: "binned",
            square: "binned",
            tick: "binned",
            line: "binned",
            trail: "binned",
          };
        case ye:
          return {
            point: "always",
            tick: "always",
            rule: "always",
            circle: "always",
            square: "always",
            bar: "always",
            text: "always",
            line: "always",
            trail: "always",
          };
        case ke:
          return {
            line: "always",
            point: "always",
            tick: "always",
            rule: "always",
            circle: "always",
            square: "always",
            bar: "always",
            geoshape: "always",
          };
        case he:
          return { point: "always", geoshape: "always" };
        case Se:
          return { text: "always" };
        case ve:
          return { point: "always", square: "always", text: "always" };
        case Ne:
          return { image: "always" };
        case se:
        case oe:
          return { text: "always", arc: "always" };
        case le:
        case ae:
          return { arc: "always" };
      }
    }(e)[t];
  }
  const Gt = {
      arc: "always",
      area: "always",
      bar: "always",
      circle: "always",
      geoshape: "always",
      image: "always",
      line: "always",
      rule: "always",
      point: "always",
      rect: "always",
      square: "always",
      trail: "always",
      text: "always",
      tick: "always",
    },
    { geoshape: Yt, ...Xt } = Gt;
  function Qt(e) {
    switch (e) {
      case Z:
      case ee:
      case se:
      case oe:
      case ie:
      case re:
      case ye:
      case ve:
      case we:
      case be:
      case xe:
      case $e:
      case te:
      case ne:
      case le:
      case ae:
        return;
      case K:
      case Q:
      case J:
      case he:
      case ke:
      case Se:
      case Oe:
      case Ce:
      case Ne:
      case _e:
        return "discrete";
      case me:
      case pe:
      case ge:
        return "flexible";
      case ce:
      case ue:
      case fe:
      case de:
      case Fe:
      case ze:
      case De:
        return;
    }
  }
  const Jt = {
      argmax: 1,
      argmin: 1,
      average: 1,
      count: 1,
      distinct: 1,
      exponential: 1,
      exponentialb: 1,
      product: 1,
      max: 1,
      mean: 1,
      median: 1,
      min: 1,
      missing: 1,
      q1: 1,
      q3: 1,
      ci0: 1,
      ci1: 1,
      stderr: 1,
      stdev: 1,
      stdevp: 1,
      sum: 1,
      valid: 1,
      values: 1,
      variance: 1,
      variancep: 1,
    },
    Kt = { count: 1, min: 1, max: 1 };
  function Zt(e) {
    return !!e && !!e.argmin;
  }
  function en(e) {
    return !!e && !!e.argmax;
  }
  function tn(e) {
    return t.isString(e) && !!Jt[e];
  }
  const nn = new Set(["count", "valid", "missing", "distinct"]);
  function rn(e) {
    return t.isString(e) && nn.has(e);
  }
  const on = new Set(["count", "sum", "distinct", "valid", "missing"]),
    an = new Set(["mean", "average", "median", "q1", "q3", "min", "max"]);
  function sn(e) {
    return t.isBoolean(e) && (e = ya(e, void 0)),
      "bin" +
      D(e).map((t) => fn(e[t]) ? C(`_${t}_${z(e[t])}`) : C(`_${t}_${e[t]}`))
        .join("");
  }
  function ln(e) {
    return !0 === e || un(e) && !e.binned;
  }
  function cn(e) {
    return "binned" === e || un(e) && !0 === e.binned;
  }
  function un(e) {
    return t.isObject(e);
  }
  function fn(e) {
    return e?.param;
  }
  function dn(e) {
    switch (e) {
      case Q:
      case J:
      case ye:
      case me:
      case pe:
      case ge:
      case we:
      case be:
      case xe:
      case $e:
      case he:
        return 6;
      case ke:
        return 4;
      default:
        return 10;
    }
  }
  function mn(e) {
    return !!e?.expr;
  }
  function pn(e) {
    let { level: t } = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : { level: 0 };
    const n = D(e || {}), i = {};
    for (const r of n) i[r] = 0 === t ? Sn(e[r]) : pn(e[r], { level: t - 1 });
    return i;
  }
  function gn(e) {
    const {
        anchor: t,
        frame: n,
        offset: i,
        orient: r,
        angle: o,
        limit: a,
        color: s,
        subtitleColor: l,
        subtitleFont: c,
        subtitleFontSize: f,
        subtitleFontStyle: d,
        subtitleFontWeight: m,
        subtitleLineHeight: p,
        subtitlePadding: g,
        ...h
      } = e,
      y = {
        ...t ? { anchor: t } : {},
        ...n ? { frame: n } : {},
        ...i ? { offset: i } : {},
        ...r ? { orient: r } : {},
        ...void 0 !== o ? { angle: o } : {},
        ...void 0 !== a ? { limit: a } : {},
      },
      v = {
        ...l ? { subtitleColor: l } : {},
        ...c ? { subtitleFont: c } : {},
        ...f ? { subtitleFontSize: f } : {},
        ...d ? { subtitleFontStyle: d } : {},
        ...m ? { subtitleFontWeight: m } : {},
        ...p ? { subtitleLineHeight: p } : {},
        ...g ? { subtitlePadding: g } : {},
      };
    return {
      titleMarkConfig: { ...h, ...s ? { fill: s } : {} },
      subtitleMarkConfig: u(e, ["align", "baseline", "dx", "dy", "limit"]),
      nonMarkTitleProperties: y,
      subtitle: v,
    };
  }
  function hn(e) {
    return t.isString(e) || t.isArray(e) && t.isString(e[0]);
  }
  function yn(e) {
    return !!e?.signal;
  }
  function vn(e) {
    return !!e.step;
  }
  function bn(e) {
    return !t.isArray(e) && ("field" in e && "data" in e);
  }
  const xn = D({
      aria: 1,
      description: 1,
      ariaRole: 1,
      ariaRoleDescription: 1,
      blend: 1,
      opacity: 1,
      fill: 1,
      fillOpacity: 1,
      stroke: 1,
      strokeCap: 1,
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeDash: 1,
      strokeDashOffset: 1,
      strokeJoin: 1,
      strokeOffset: 1,
      strokeMiterLimit: 1,
      startAngle: 1,
      endAngle: 1,
      padAngle: 1,
      innerRadius: 1,
      outerRadius: 1,
      size: 1,
      shape: 1,
      interpolate: 1,
      tension: 1,
      orient: 1,
      align: 1,
      baseline: 1,
      text: 1,
      dir: 1,
      dx: 1,
      dy: 1,
      ellipsis: 1,
      limit: 1,
      radius: 1,
      theta: 1,
      angle: 1,
      font: 1,
      fontSize: 1,
      fontWeight: 1,
      fontStyle: 1,
      lineBreak: 1,
      lineHeight: 1,
      cursor: 1,
      href: 1,
      tooltip: 1,
      cornerRadius: 1,
      cornerRadiusTopLeft: 1,
      cornerRadiusTopRight: 1,
      cornerRadiusBottomLeft: 1,
      cornerRadiusBottomRight: 1,
      aspect: 1,
      width: 1,
      height: 1,
      url: 1,
      smooth: 1,
    }),
    $n = {
      arc: 1,
      area: 1,
      group: 1,
      image: 1,
      line: 1,
      path: 1,
      rect: 1,
      rule: 1,
      shape: 1,
      symbol: 1,
      text: 1,
      trail: 1,
    },
    wn = [
      "cornerRadius",
      "cornerRadiusTopLeft",
      "cornerRadiusTopRight",
      "cornerRadiusBottomLeft",
      "cornerRadiusBottomRight",
    ];
  function kn(e) {
    const n = t.isArray(e.condition) ? e.condition.map(Dn) : Dn(e.condition);
    return { ...Sn(e), condition: n };
  }
  function Sn(e) {
    if (mn(e)) {
      const { expr: t, ...n } = e;
      return { signal: t, ...n };
    }
    return e;
  }
  function Dn(e) {
    if (mn(e)) {
      const { expr: t, ...n } = e;
      return { signal: t, ...n };
    }
    return e;
  }
  function Fn(e) {
    if (mn(e)) {
      const { expr: t, ...n } = e;
      return { signal: t, ...n };
    }
    return yn(e) ? e : void 0 !== e ? { value: e } : void 0;
  }
  function zn(e) {
    return yn(e) ? e.signal : t.stringValue(e.value);
  }
  function On(e) {
    return yn(e) ? e.signal : null == e ? null : t.stringValue(e);
  }
  function Cn(e, t, n) {
    for (const i of n) {
      const n = Pn(i, t.markDef, t.config);
      void 0 !== n && (e[i] = Fn(n));
    }
    return e;
  }
  function Nn(e) {
    return [].concat(e.type, e.style ?? []);
  }
  function _n(e, t, n) {
    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const { vgChannel: r, ignoreVgConfig: o } = i;
    return r && void 0 !== t[r]
      ? t[r]
      : void 0 !== t[e]
      ? t[e]
      : !o || r && r !== e
      ? Pn(e, t, n, i)
      : void 0;
  }
  function Pn(e, t, n) {
    let { vgChannel: i } = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : {};
    return q(
      i ? An(e, t, n.style) : void 0,
      An(e, t, n.style),
      i ? n[t.type][i] : void 0,
      n[t.type][e],
      i ? n.mark[i] : n.mark[e],
    );
  }
  function An(e, t, n) {
    return Tn(e, Nn(t), n);
  }
  function Tn(e, n, i) {
    let r;
    n = t.array(n);
    for (const t of n) {
      const n = i[t];
      n && void 0 !== n[e] && (r = n[e]);
    }
    return r;
  }
  function jn(e, n) {
    return t.array(e).reduce(
      (
        e,
        t,
      ) => (e.field.push(ia(t, n)), e.order.push(t.sort ?? "ascending"), e),
      { field: [], order: [] },
    );
  }
  function En(e, t) {
    const n = [...e];
    return t.forEach((e) => {
      for (const t of n) if (Y(t, e)) return;
      n.push(e);
    }),
      n;
  }
  function Mn(e, n) {
    return Y(e, n) || !n
      ? e
      : e
      ? [...t.array(e), ...t.array(n)].join(", ")
      : n;
  }
  function Rn(e, t) {
    const n = e.value, i = t.value;
    if (null == n || null === i) return { explicit: e.explicit, value: null };
    if ((hn(n) || yn(n)) && (hn(i) || yn(i))) {
      return { explicit: e.explicit, value: Mn(n, i) };
    }
    if (hn(n) || yn(n)) return { explicit: e.explicit, value: n };
    if (hn(i) || yn(i)) return { explicit: e.explicit, value: i };
    if (!(hn(n) || yn(n) || hn(i) || yn(i))) {
      return { explicit: e.explicit, value: En(n, i) };
    }
    throw new Error("It should never reach here");
  }
  function Ln(e) {
    return `Invalid specification ${
      X(e)
    }. Make sure the specification includes at least one of the following properties: "mark", "layer", "facet", "hconcat", "vconcat", "concat", or "repeat".`;
  }
  const qn = 'Autosize "fit" only works for single views and layered views.';
  function Un(e) {
    return `${
      "width" == e ? "Width" : "Height"
    } "container" only works for single views and layered views.`;
  }
  function Wn(e) {
    return `${
      "width" == e ? "Width" : "Height"
    } "container" only works well with autosize "fit" or "fit-${
      "width" == e ? "x" : "y"
    }".`;
  }
  function In(e) {
    return e
      ? `Dropping "fit-${e}" because spec has discrete ${rt(e)}.`
      : 'Dropping "fit" because spec has discrete size.';
  }
  function Bn(e) {
    return `Unknown field for ${e}. Cannot calculate view size.`;
  }
  function Vn(e) {
    return `Cannot project a selection on encoding channel "${e}", which has no field.`;
  }
  function Hn(e, t) {
    return `Cannot project a selection on encoding channel "${e}" as it uses an aggregate function ("${t}").`;
  }
  function Gn(e) {
    return `Selection not supported for ${e} yet.`;
  }
  const Yn =
    "The same selection must be used to override scale domains in a layered view.";
  function Xn(e) {
    return `The "columns" property cannot be used when "${e}" has nested row/column.`;
  }
  function Qn(e, t, n) {
    return `An ancestor parsed field "${e}" as ${n} but a child wants to parse the field as ${t}.`;
  }
  function Jn(e) {
    return `Config.customFormatTypes is not true, thus custom format type and format for channel ${e} are dropped.`;
  }
  function Kn(e) {
    return `${e}Offset dropped because ${e} is continuous`;
  }
  function Zn(e) {
    return `Invalid field type "${e}".`;
  }
  function ei(e, t) {
    const { fill: n, stroke: i } = t;
    return `Dropping color ${e} as the plot also has ${
      n && i ? "fill and stroke" : n ? "fill" : "stroke"
    }.`;
  }
  function ti(e, t) {
    return `Dropping ${
      X(e)
    } from channel "${t}" since it does not contain any data field, datum, value, or signal.`;
  }
  function ni(e, t, n) {
    return `${e} dropped as it is incompatible with "${t}".`;
  }
  function ii(e) {
    return `${e} encoding should be discrete (ordinal / nominal / binned).`;
  }
  function ri(e) {
    return `${e} encoding should be discrete (ordinal / nominal / binned) or use a discretizing scale (e.g. threshold).`;
  }
  function oi(e, t) {
    return `Using discrete channel "${e}" to encode "${t}" field can be misleading as it does not encode ${
      "ordinal" === t ? "order" : "magnitude"
    }.`;
  }
  function ai(e) {
    return `Using unaggregated domain with raw field has no effect (${X(e)}).`;
  }
  function si(e) {
    return `Unaggregated domain not applicable for "${e}" since it produces values outside the origin domain of the source data.`;
  }
  function li(e) {
    return `Unaggregated domain is currently unsupported for log scale (${
      X(e)
    }).`;
  }
  function ci(e, t, n) {
    return `${n}-scale's "${t}" is dropped as it does not work with ${e} scale.`;
  }
  function ui(e) {
    return `The step for "${e}" is dropped because the ${
      "width" === e ? "x" : "y"
    } is continuous.`;
  }
  const fi =
    "Domains that should be unioned has conflicting sort properties. Sort will be set to true.";
  function di(e, t) {
    return `Invalid ${e}: ${X(t)}.`;
  }
  function mi(e) {
    return `1D error band does not support ${e}.`;
  }
  function pi(e) {
    return `Channel ${e} is required for "binned" bin.`;
  }
  const gi = t.logger(t.Warn);
  let hi = gi;
  function yi() {
    hi.warn(...arguments);
  }
  function vi(e) {
    if (e && t.isObject(e)) { for (const t of Fi) if (t in e) return !0; }
    return !1;
  }
  const bi = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
    xi = bi.map((e) => e.substr(0, 3)),
    $i = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ],
    wi = $i.map((e) => e.substr(0, 3));
  function ki(e, n) {
    const i = [];
    if (
      n && void 0 !== e.day && D(e).length > 1 && (yi(function (e) {
        return `Dropping day from datetime ${
          X(e)
        } as day cannot be combined with other units.`;
      }(e)),
        delete (e = l(e)).day),
        void 0 !== e.year ? i.push(e.year) : i.push(2012),
        void 0 !== e.month
    ) {
      const r = n
        ? function (e) {
          if (H(e) && (e = +e), t.isNumber(e)) return e - 1;
          {
            const t = e.toLowerCase(), n = bi.indexOf(t);
            if (-1 !== n) return n;
            const i = t.substr(0, 3), r = xi.indexOf(i);
            if (-1 !== r) return r;
            throw new Error(di("month", e));
          }
        }(e.month)
        : e.month;
      i.push(r);
    } else if (void 0 !== e.quarter) {
      const r = n
        ? function (e) {
          if (H(e) && (e = +e), t.isNumber(e)) {
            return e > 4 && yi(di("quarter", e)), e - 1;
          }
          throw new Error(di("quarter", e));
        }(e.quarter)
        : e.quarter;
      i.push(t.isNumber(r) ? 3 * r : `${r}*3`);
    } else i.push(0);
    if (void 0 !== e.date) i.push(e.date);
    else if (void 0 !== e.day) {
      const r = n
        ? function (e) {
          if (H(e) && (e = +e), t.isNumber(e)) return e % 7;
          {
            const t = e.toLowerCase(), n = $i.indexOf(t);
            if (-1 !== n) return n;
            const i = t.substr(0, 3), r = wi.indexOf(i);
            if (-1 !== r) return r;
            throw new Error(di("day", e));
          }
        }(e.day)
        : e.day;
      i.push(t.isNumber(r) ? r + 1 : `${r}+1`);
    } else i.push(1);
    for (const t of ["hours", "minutes", "seconds", "milliseconds"]) {
      const n = e[t];
      i.push(void 0 === n ? 0 : n);
    }
    return i;
  }
  function Si(e) {
    const t = ki(e, !0).join(", ");
    return e.utc ? `utc(${t})` : `datetime(${t})`;
  }
  const Di = {
      year: 1,
      quarter: 1,
      month: 1,
      week: 1,
      day: 1,
      dayofyear: 1,
      date: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      milliseconds: 1,
    },
    Fi = D(Di);
  function zi(e) {
    return t.isObject(e) ? e.binned : Oi(e);
  }
  function Oi(e) {
    return e && e.startsWith("binned");
  }
  function Ci(e) {
    return e.startsWith("utc");
  }
  const Ni = { "year-month": "%b %Y ", "year-month-date": "%b %d, %Y " };
  function _i(e) {
    return Fi.filter((t) => Ai(e, t));
  }
  function Pi(e) {
    const t = _i(e);
    return t[t.length - 1];
  }
  function Ai(e, t) {
    const n = e.indexOf(t);
    return !(n < 0) &&
      (!(n > 0 && "seconds" === t && "i" === e.charAt(n - 1)) &&
        (!(e.length > n + 3 && "day" === t && "o" === e.charAt(n + 3)) &&
          !(n > 0 && "year" === t && "f" === e.charAt(n - 1))));
  }
  function Ti(e, t) {
    let { end: n } = arguments.length > 2 && void 0 !== arguments[2]
      ? arguments[2]
      : { end: !1 };
    const i = A(t), r = Ci(e) ? "utc" : "";
    let o;
    const a = {};
    for (const t of Fi) {
      Ai(e, t) &&
        (a[t] = "quarter" === (s = t)
          ? `(${r}quarter(${i})-1)`
          : `${r}${s}(${i})`,
          o = t);
    }
    var s;
    return n && (a[o] += "+1"),
      function (e) {
        const t = ki(e, !1).join(", ");
        return e.utc ? `utc(${t})` : `datetime(${t})`;
      }(a);
  }
  function ji(e) {
    if (!e) return;
    return `timeUnitSpecifier(${X(_i(e))}, ${X(Ni)})`;
  }
  function Ei(e) {
    if (!e) return;
    let n;
    return t.isString(e)
      ? n = Oi(e) ? { unit: e.substring(6), binned: !0 } : { unit: e }
      : t.isObject(e) && (n = { ...e, ...e.unit ? { unit: e.unit } : {} }),
      Ci(n.unit) && (n.utc = !0, n.unit = n.unit.substring(3)),
      n;
  }
  function Mi(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : (e) => e;
    const n = Ei(e), i = Pi(n.unit);
    if (i && "day" !== i) {
      const e = {
          year: 2001,
          month: 1,
          date: 1,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        },
        { step: r, part: o } = Li(i, n.step);
      return `${t(Si({ ...e, [o]: +e[o] + r }))} - ${t(Si(e))}`;
    }
  }
  const Ri = {
    year: 1,
    month: 1,
    date: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1,
  };
  function Li(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    if (
      function (e) {
        return !!Ri[e];
      }(e)
    ) return { part: e, step: t };
    switch (e) {
      case "day":
      case "dayofyear":
        return { part: "date", step: t };
      case "quarter":
        return { part: "month", step: 3 * t };
      case "week":
        return { part: "date", step: 7 * t };
    }
  }
  function qi(e) {
    return !!e?.field && void 0 !== e.equal;
  }
  function Ui(e) {
    return !!e?.field && void 0 !== e.lt;
  }
  function Wi(e) {
    return !!e?.field && void 0 !== e.lte;
  }
  function Ii(e) {
    return !!e?.field && void 0 !== e.gt;
  }
  function Bi(e) {
    return !!e?.field && void 0 !== e.gte;
  }
  function Vi(e) {
    if (e?.field) {
      if (t.isArray(e.range) && 2 === e.range.length) return !0;
      if (yn(e.range)) return !0;
    }
    return !1;
  }
  function Hi(e) {
    return !!e?.field && (t.isArray(e.oneOf) || t.isArray(e.in));
  }
  function Gi(e) {
    return Hi(e) || qi(e) || Vi(e) || Ui(e) || Ii(e) || Wi(e) || Bi(e);
  }
  function Yi(e, t) {
    return xa(e, { timeUnit: t, wrapTime: !0 });
  }
  function Xi(e) {
    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    const { field: n } = e,
      i = Ei(e.timeUnit),
      { unit: r, binned: o } = i || {},
      a = ia(e, { expr: "datum" }),
      s = r ? `time(${o ? a : Ti(r, n)})` : a;
    if (qi(e)) return `${s}===${Yi(e.equal, r)}`;
    if (Ui(e)) return `${s}<${Yi(e.lt, r)}`;
    if (Ii(e)) return `${s}>${Yi(e.gt, r)}`;
    if (Wi(e)) return `${s}<=${Yi(e.lte, r)}`;
    if (Bi(e)) return `${s}>=${Yi(e.gte, r)}`;
    if (Hi(e)) {
      return `indexof([${
        function (e, t) {
          return e.map((e) => Yi(e, t));
        }(e.oneOf, r).join(",")
      }], ${s}) !== -1`;
    }
    if (
      function (e) {
        return !!e?.field && void 0 !== e.valid;
      }(e)
    ) return Qi(s, e.valid);
    if (Vi(e)) {
      const { range: n } = e,
        i = yn(n) ? { signal: `${n.signal}[0]` } : n[0],
        o = yn(n) ? { signal: `${n.signal}[1]` } : n[1];
      if (null !== i && null !== o && t) {
        return "inrange(" + s + ", [" + Yi(i, r) + ", " + Yi(o, r) + "])";
      }
      const a = [];
      return null !== i && a.push(`${s} >= ${Yi(i, r)}`),
        null !== o && a.push(`${s} <= ${Yi(o, r)}`),
        a.length > 0 ? a.join(" && ") : "true";
    }
    throw new Error(`Invalid field predicate: ${X(e)}`);
  }
  function Qi(e) {
    return !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
      ? `isValid(${e}) && isFinite(+${e})`
      : `!isValid(${e}) || !isFinite(+${e})`;
  }
  function Ji(e) {
    return Gi(e) && e.timeUnit ? { ...e, timeUnit: Ei(e.timeUnit) } : e;
  }
  function Ki(e) {
    return "quantitative" === e || "temporal" === e;
  }
  function Zi(e) {
    return "ordinal" === e || "nominal" === e;
  }
  const er = "quantitative",
    tr = "ordinal",
    nr = "temporal",
    ir = "nominal",
    rr = "geojson";
  const or = {
      LINEAR: "linear",
      LOG: "log",
      POW: "pow",
      SQRT: "sqrt",
      SYMLOG: "symlog",
      IDENTITY: "identity",
      SEQUENTIAL: "sequential",
      TIME: "time",
      UTC: "utc",
      QUANTILE: "quantile",
      QUANTIZE: "quantize",
      THRESHOLD: "threshold",
      BIN_ORDINAL: "bin-ordinal",
      ORDINAL: "ordinal",
      POINT: "point",
      BAND: "band",
    },
    ar = {
      linear: "numeric",
      log: "numeric",
      pow: "numeric",
      sqrt: "numeric",
      symlog: "numeric",
      identity: "numeric",
      sequential: "numeric",
      time: "time",
      utc: "time",
      ordinal: "ordinal",
      "bin-ordinal": "bin-ordinal",
      point: "ordinal-position",
      band: "ordinal-position",
      quantile: "discretizing",
      quantize: "discretizing",
      threshold: "discretizing",
    };
  function sr(e, t) {
    const n = ar[e], i = ar[t];
    return n === i || "ordinal-position" === n && "time" === i ||
      "ordinal-position" === i && "time" === n;
  }
  const lr = {
    linear: 0,
    log: 1,
    pow: 1,
    sqrt: 1,
    symlog: 1,
    identity: 1,
    sequential: 1,
    time: 0,
    utc: 0,
    point: 10,
    band: 11,
    ordinal: 0,
    "bin-ordinal": 0,
    quantile: 0,
    quantize: 0,
    threshold: 0,
  };
  function cr(e) {
    return lr[e];
  }
  const ur = new Set(["linear", "log", "pow", "sqrt", "symlog"]),
    fr = new Set([...ur, "time", "utc"]);
  function dr(e) {
    return ur.has(e);
  }
  const mr = new Set(["quantile", "quantize", "threshold"]),
    pr = new Set([...fr, ...mr, "sequential", "identity"]),
    gr = new Set(["ordinal", "bin-ordinal", "point", "band"]);
  function hr(e) {
    return gr.has(e);
  }
  function yr(e) {
    return pr.has(e);
  }
  function vr(e) {
    return fr.has(e);
  }
  function br(e) {
    return mr.has(e);
  }
  function xr(e) {
    return e?.param;
  }
  const {
      type: $r,
      domain: wr,
      range: kr,
      rangeMax: Sr,
      rangeMin: Dr,
      scheme: Fr,
      ...zr
    } = {
      type: 1,
      domain: 1,
      domainMax: 1,
      domainMin: 1,
      domainMid: 1,
      domainRaw: 1,
      align: 1,
      range: 1,
      rangeMax: 1,
      rangeMin: 1,
      scheme: 1,
      bins: 1,
      reverse: 1,
      round: 1,
      clamp: 1,
      nice: 1,
      base: 1,
      exponent: 1,
      constant: 1,
      interpolate: 1,
      zero: 1,
      padding: 1,
      paddingInner: 1,
      paddingOuter: 1,
    },
    Or = D(zr);
  function Cr(e, t) {
    switch (t) {
      case "type":
      case "domain":
      case "reverse":
      case "range":
        return !0;
      case "scheme":
      case "interpolate":
        return !["point", "band", "identity"].includes(e);
      case "bins":
        return !["point", "band", "identity", "ordinal"].includes(e);
      case "round":
        return vr(e) || "band" === e || "point" === e;
      case "padding":
      case "rangeMin":
      case "rangeMax":
        return vr(e) || ["point", "band"].includes(e);
      case "paddingOuter":
      case "align":
        return ["point", "band"].includes(e);
      case "paddingInner":
        return "band" === e;
      case "domainMax":
      case "domainMid":
      case "domainMin":
      case "domainRaw":
      case "clamp":
        return vr(e);
      case "nice":
        return vr(e) || "quantize" === e || "threshold" === e;
      case "exponent":
        return "pow" === e;
      case "base":
        return "log" === e;
      case "constant":
        return "symlog" === e;
      case "zero":
        return yr(e) && !p(["log", "time", "utc", "threshold", "quantile"], e);
    }
  }
  function Nr(e, t) {
    switch (t) {
      case "interpolate":
      case "scheme":
      case "domainMid":
        return Le(e)
          ? void 0
          : `Cannot use the scale property "${t}" with non-color channel.`;
      case "align":
      case "type":
      case "bins":
      case "domain":
      case "domainMax":
      case "domainMin":
      case "domainRaw":
      case "range":
      case "base":
      case "exponent":
      case "constant":
      case "nice":
      case "padding":
      case "paddingInner":
      case "paddingOuter":
      case "rangeMax":
      case "rangeMin":
      case "reverse":
      case "round":
      case "clamp":
      case "zero":
        return;
    }
  }
  const _r = {
      arc: "arc",
      area: "area",
      bar: "bar",
      image: "image",
      line: "line",
      point: "point",
      rect: "rect",
      rule: "rule",
      text: "text",
      tick: "tick",
      trail: "trail",
      circle: "circle",
      square: "square",
      geoshape: "geoshape",
    },
    Pr = _r.arc,
    Ar = _r.area,
    Tr = _r.bar,
    jr = _r.image,
    Er = _r.line,
    Mr = _r.point,
    Rr = _r.rect,
    Lr = _r.rule,
    qr = _r.text,
    Ur = _r.tick,
    Wr = _r.trail,
    Ir = _r.circle,
    Br = _r.square,
    Vr = _r.geoshape;
  function Hr(e) {
    return ["line", "area", "trail"].includes(e);
  }
  function Gr(e) {
    return ["rect", "bar", "image", "arc"].includes(e);
  }
  const Yr = new Set(D(_r));
  function Xr(e) {
    return e.type;
  }
  const Qr = [
      "stroke",
      "strokeWidth",
      "strokeDash",
      "strokeDashOffset",
      "strokeOpacity",
      "strokeJoin",
      "strokeMiterLimit",
      "fill",
      "fillOpacity",
    ],
    Jr = D({
      color: 1,
      filled: 1,
      invalid: 1,
      order: 1,
      radius2: 1,
      theta2: 1,
      timeUnitBandSize: 1,
      timeUnitBandPosition: 1,
    }),
    Kr = D({
      mark: 1,
      arc: 1,
      area: 1,
      bar: 1,
      circle: 1,
      image: 1,
      line: 1,
      point: 1,
      rect: 1,
      rule: 1,
      square: 1,
      text: 1,
      tick: 1,
      trail: 1,
      geoshape: 1,
    });
  function Zr(e) {
    return e && null != e.band;
  }
  const eo = {
      horizontal: ["cornerRadiusTopRight", "cornerRadiusBottomRight"],
      vertical: ["cornerRadiusTopLeft", "cornerRadiusTopRight"],
    },
    to = {
      binSpacing: 1,
      continuousBandSize: 5,
      minBandSize: .25,
      timeUnitBandPosition: .5,
    },
    no = {
      binSpacing: 0,
      continuousBandSize: 5,
      minBandSize: .25,
      timeUnitBandPosition: .5,
    };
  function io(e, t) {
    let { isPath: n } = t;
    return void 0 === e || "break-paths-show-path-domains" === e
      ? n ? "break-paths-show-domains" : "filter"
      : null === e
      ? "show"
      : e;
  }
  function ro(e) {
    let {
      markDef: t,
      config: n,
      scaleChannel: i,
      scaleType: r,
      isCountAggregate: o,
    } = e;
    if (!r || !yr(r) || o) return "always-valid";
    const a = io(_n("invalid", t, n), { isPath: Hr(t.type) }),
      s = n.scale?.invalid?.[i];
    return void 0 !== s ? "show" : a;
  }
  function oo(e) {
    let { scaleName: t, scale: n, mode: i } = e;
    const r = `domain('${t}')`;
    if (!n || !t) return;
    const o = `${r}[0]`, a = `peek(${r})`, s = n.domainHasZero();
    if ("definitely" === s) return { scale: t, value: 0 };
    if ("maybe" === s) {
      return {
        signal: `scale('${t}', inrange(0, ${r}) ? 0 : ${
          "zeroOrMin" === i ? o : a
        })`,
      };
    }
    return { signal: `scale('${t}', ${"zeroOrMin" === i ? o : a})` };
  }
  function ao(e) {
    let {
      scaleChannel: t,
      channelDef: n,
      scale: i,
      scaleName: r,
      markDef: o,
      config: a,
    } = e;
    const s = i?.get("type"),
      l = da(n),
      c = ro({
        scaleChannel: t,
        markDef: o,
        config: a,
        scaleType: s,
        isCountAggregate: rn(l?.aggregate),
      });
    if (l && "show" === c) {
      const e = a.scale.invalid?.[t] ?? "zero-or-min";
      return { test: Qi(ia(l, { expr: "datum" }), !1), ...so(e, i, r) };
    }
  }
  function so(e, n, i) {
    if (r = e, t.isObject(r) && "value" in r) {
      const { value: t } = e;
      return yn(t) ? { signal: t.signal } : { value: t };
    }
    var r;
    return oo({ scale: n, scaleName: i, mode: "zeroOrMin" });
  }
  function lo(e) {
    const {
        channel: t,
        channelDef: n,
        markDef: i,
        scale: r,
        scaleName: o,
        config: a,
      } = e,
      s = tt(t),
      l = fo(e),
      c = ao({
        scaleChannel: s,
        channelDef: n,
        scale: r,
        scaleName: o,
        markDef: i,
        config: a,
      });
    return void 0 !== c ? [c, l] : l;
  }
  function co(e, t, n, i) {
    const r = {};
    if (t && (r.scale = t), Vo(e)) {
      const { datum: t } = e;
      vi(t)
        ? r.signal = Si(t)
        : yn(t)
        ? r.signal = t.signal
        : mn(t)
        ? r.signal = t.expr
        : r.value = t;
    } else r.field = ia(e, n);
    if (i) {
      const { offset: e, band: t } = i;
      e && (r.offset = e), t && (r.band = t);
    }
    return r;
  }
  function uo(e) {
    let {
      scaleName: t,
      fieldOrDatumDef: n,
      fieldOrDatumDef2: i,
      offset: r,
      startSuffix: o,
      endSuffix: a = "end",
      bandPosition: s = .5,
    } = e;
    const l = !yn(s) && 0 < s && s < 1 ? "datum" : void 0,
      c = ia(n, { expr: l, suffix: o }),
      u = void 0 !== i ? ia(i, { expr: l }) : ia(n, { suffix: a, expr: l }),
      f = {};
    if (0 === s || 1 === s) {
      f.scale = t;
      const e = 0 === s ? c : u;
      f.field = e;
    } else {
      const e = yn(s)
        ? `(1-${s.signal}) * ${c} + ${s.signal} * ${u}`
        : `${1 - s} * ${c} + ${s} * ${u}`;
      f.signal = `scale("${t}", ${e})`;
    }
    return r && (f.offset = r), f;
  }
  function fo(e) {
    let {
      channel: n,
      channelDef: i,
      channel2Def: r,
      markDef: o,
      config: a,
      scaleName: s,
      scale: l,
      stack: c,
      offset: u,
      defaultRef: f,
      bandPosition: d,
    } = e;
    if (i) {
      if (Xo(i)) {
        const e = l?.get("type");
        if (Qo(i)) {
          d ??= Eo({ fieldDef: i, fieldDef2: r, markDef: o, config: a });
          const { bin: t, timeUnit: l, type: f } = i;
          if (ln(t) || d && l && f === nr) {
            return c?.impute
              ? co(i, s, { binSuffix: "mid" }, { offset: u })
              : d && !hr(e)
              ? uo({
                scaleName: s,
                fieldOrDatumDef: i,
                bandPosition: d,
                offset: u,
              })
              : co(i, s, wa(i, n) ? { binSuffix: "range" } : {}, { offset: u });
          }
          if (cn(t)) {
            if (Io(r)) {
              return uo({
                scaleName: s,
                fieldOrDatumDef: i,
                fieldOrDatumDef2: r,
                bandPosition: d,
                offset: u,
              });
            }
            yi(pi(n === Z ? te : ne));
          }
        }
        return co(i, s, hr(e) ? { binSuffix: "range" } : {}, {
          offset: u,
          band: "band" === e ? d ?? i.bandPosition ?? .5 : void 0,
        });
      }
      if (Jo(i)) {
        const e = u ? { offset: u } : {};
        return { ...mo(n, i.value), ...e };
      }
    }
    return t.isFunction(f) && (f = f()),
      f ? { ...f, ...u ? { offset: u } : {} } : f;
  }
  function mo(e, t) {
    return p(["x", "x2"], e) && "width" === t
      ? { field: { group: "width" } }
      : p(["y", "y2"], e) && "height" === t
      ? { field: { group: "height" } }
      : Fn(t);
  }
  function po(e) {
    return e && "number" !== e && "time" !== e;
  }
  function go(e, t, n) {
    return `${e}(${t}${n ? `, ${X(n)}` : ""})`;
  }
  const ho = " – ";
  function yo(e) {
    let {
      fieldOrDatumDef: n,
      format: i,
      formatType: r,
      expr: o,
      normalizeStack: a,
      config: s,
    } = e;
    if (po(r)) {
      return bo({
        fieldOrDatumDef: n,
        format: i,
        formatType: r,
        expr: o,
        config: s,
      });
    }
    const l = vo(n, o, a), c = Bo(n);
    if (void 0 === i && void 0 === r && s.customFormatTypes) {
      if ("quantitative" === c) {
        if (a && s.normalizedNumberFormatType) {
          return bo({
            fieldOrDatumDef: n,
            format: s.normalizedNumberFormat,
            formatType: s.normalizedNumberFormatType,
            expr: o,
            config: s,
          });
        }
        if (s.numberFormatType) {
          return bo({
            fieldOrDatumDef: n,
            format: s.numberFormat,
            formatType: s.numberFormatType,
            expr: o,
            config: s,
          });
        }
      }
      if (
        "temporal" === c && s.timeFormatType && Io(n) && void 0 === n.timeUnit
      ) {
        return bo({
          fieldOrDatumDef: n,
          format: s.timeFormat,
          formatType: s.timeFormatType,
          expr: o,
          config: s,
        });
      }
    }
    if (ba(n)) {
      const e = function (e) {
        let {
          field: n,
          timeUnit: i,
          format: r,
          formatType: o,
          rawTimeFormat: a,
          isUTCScale: s,
        } = e;
        return !i || r
          ? !i && o
            ? `${o}(${n}, '${r}')`
            : (r = t.isString(r) ? r : a,
              `${s ? "utc" : "time"}Format(${n}, '${r}')`)
          : function (e, t, n) {
            if (!e) return;
            const i = ji(e);
            return `${n || Ci(e) ? "utc" : "time"}Format(${t}, ${i})`;
          }(i, n, s);
      }({
        field: l,
        timeUnit: Io(n) ? Ei(n.timeUnit)?.unit : void 0,
        format: i,
        formatType: s.timeFormatType,
        rawTimeFormat: s.timeFormat,
        isUTCScale: Ko(n) && n.scale?.type === or.UTC,
      });
      return e ? { signal: e } : void 0;
    }
    if (
      i = wo({ type: c, specifiedFormat: i, config: s, normalizeStack: a }),
        Io(n) && ln(n.bin)
    ) return { signal: Do(l, ia(n, { expr: o, binSuffix: "end" }), i, r, s) };
    return i || "quantitative" === Bo(n)
      ? { signal: `${ko(l, i)}` }
      : { signal: `isValid(${l}) ? ${l} : ""+${l}` };
  }
  function vo(e, t, n) {
    return Io(e)
      ? n
        ? `${ia(e, { expr: t, suffix: "end" })}-${
          ia(e, { expr: t, suffix: "start" })
        }`
        : ia(e, { expr: t })
      : function (e) {
        const { datum: t } = e;
        return vi(t) ? Si(t) : `${X(t)}`;
      }(e);
  }
  function bo(e) {
    let {
      fieldOrDatumDef: t,
      format: n,
      formatType: i,
      expr: r,
      normalizeStack: o,
      config: a,
      field: s,
    } = e;
    if (s ??= vo(t, r, o), "datum.value" !== s && Io(t) && ln(t.bin)) {
      return { signal: Do(s, ia(t, { expr: r, binSuffix: "end" }), n, i, a) };
    }
    return { signal: go(i, s, n) };
  }
  function xo(e, n, i, r, o, a) {
    if (!t.isString(r) || !po(r)) {
      if (
        void 0 === i && void 0 === r && o.customFormatTypes &&
        "quantitative" === Bo(e)
      ) {
        if (o.normalizedNumberFormatType && Zo(e) && "normalize" === e.stack) {
          return;
        }
        if (o.numberFormatType) return;
      }
      if (Zo(e) && "normalize" === e.stack && o.normalizedNumberFormat) {
        return wo({ type: "quantitative", config: o, normalizeStack: !0 });
      }
      if (ba(e)) {
        const t = Io(e) ? Ei(e.timeUnit)?.unit : void 0;
        if (void 0 === t && o.customFormatTypes && o.timeFormatType) return;
        return function (e) {
          let {
            specifiedFormat: t,
            timeUnit: n,
            config: i,
            omitTimeFormatConfig: r,
          } = e;
          if (t) return t;
          if (n) return { signal: ji(n) };
          return r ? void 0 : i.timeFormat;
        }({
          specifiedFormat: i,
          timeUnit: t,
          config: o,
          omitTimeFormatConfig: a,
        });
      }
      return wo({ type: n, specifiedFormat: i, config: o });
    }
  }
  function $o(e, t, n) {
    return e && (yn(e) || "number" === e || "time" === e)
      ? e
      : ba(t) && "time" !== n && "utc" !== n
      ? Io(t) && Ei(t?.timeUnit)?.utc ? "utc" : "time"
      : void 0;
  }
  function wo(e) {
    let { type: n, specifiedFormat: i, config: r, normalizeStack: o } = e;
    return t.isString(i)
      ? i
      : n === er
      ? o ? r.normalizedNumberFormat : r.numberFormat
      : void 0;
  }
  function ko(e, t) {
    return `format(${e}, "${t || ""}")`;
  }
  function So(e, n, i, r) {
    return po(i)
      ? go(i, e, n)
      : ko(e, (t.isString(n) ? n : void 0) ?? r.numberFormat);
  }
  function Do(e, t, n, i, r) {
    if (
      void 0 === n && void 0 === i && r.customFormatTypes && r.numberFormatType
    ) return Do(e, t, r.numberFormat, r.numberFormatType, r);
    const o = So(e, n, i, r), a = So(t, n, i, r);
    return `${Qi(e, !1)} ? "null" : ${o} + "${ho}" + ${a}`;
  }
  const Fo = "min",
    zo = {
      x: 1,
      y: 1,
      color: 1,
      fill: 1,
      stroke: 1,
      strokeWidth: 1,
      size: 1,
      shape: 1,
      fillOpacity: 1,
      strokeOpacity: 1,
      opacity: 1,
      text: 1,
    };
  function Oo(e) {
    return e in zo;
  }
  function Co(e) {
    return e && ("count" === e.op || !!e.field);
  }
  function No(e) {
    return e && t.isArray(e);
  }
  function _o(e) {
    return "row" in e || "column" in e;
  }
  function Po(e) {
    return !!e && "header" in e;
  }
  function Ao(e) {
    return "facet" in e;
  }
  function To(e) {
    const { field: t, timeUnit: n, bin: i, aggregate: r } = e;
    return {
      ...n ? { timeUnit: n } : {},
      ...i ? { bin: i } : {},
      ...r ? { aggregate: r } : {},
      field: t,
    };
  }
  function jo(e) {
    return "sort" in e;
  }
  function Eo(e) {
    let { fieldDef: t, fieldDef2: n, markDef: i, config: r } = e;
    if (Xo(t) && void 0 !== t.bandPosition) return t.bandPosition;
    if (Io(t)) {
      const { timeUnit: e, bin: o } = t;
      if (e && !n) return Pn("timeUnitBandPosition", i, r);
      if (ln(o)) return .5;
    }
  }
  function Mo(e) {
    let {
      channel: t,
      fieldDef: n,
      fieldDef2: i,
      markDef: r,
      config: o,
      scaleType: a,
      useVlSizeChannel: s,
    } = e;
    const l = rt(t), c = _n(s ? "size" : l, r, o, { vgChannel: l });
    if (void 0 !== c) return c;
    if (Io(n)) {
      const { timeUnit: e, bin: t } = n;
      if (e && !i) return { band: Pn("timeUnitBandSize", r, o) };
      if (ln(t) && !hr(a)) return { band: 1 };
    }
    return Gr(r.type)
      ? a
        ? hr(a)
          ? o[r.type]?.discreteBandSize || { band: 1 }
          : o[r.type]?.continuousBandSize
        : o[r.type]?.discreteBandSize
      : void 0;
  }
  function Ro(e, t, n, i) {
    return !!(ln(e.bin) || e.timeUnit && Qo(e) && "temporal" === e.type) &&
      void 0 !== Eo({ fieldDef: e, fieldDef2: t, markDef: n, config: i });
  }
  function Lo(e) {
    return e && !!e.sort && !e.field;
  }
  function qo(e) {
    return e && "condition" in e;
  }
  function Uo(e) {
    const n = e?.condition;
    return !!n && !t.isArray(n) && Io(n);
  }
  function Wo(e) {
    const n = e?.condition;
    return !!n && !t.isArray(n) && Xo(n);
  }
  function Io(e) {
    return e && (!!e.field || "count" === e.aggregate);
  }
  function Bo(e) {
    return e?.type;
  }
  function Vo(e) {
    return e && "datum" in e;
  }
  function Ho(e) {
    return Qo(e) && !ra(e) || Yo(e);
  }
  function Go(e) {
    return Qo(e) && "quantitative" === e.type && !e.bin || Yo(e);
  }
  function Yo(e) {
    return Vo(e) && t.isNumber(e.datum);
  }
  function Xo(e) {
    return Io(e) || Vo(e);
  }
  function Qo(e) {
    return e && ("field" in e || "count" === e.aggregate) && "type" in e;
  }
  function Jo(e) {
    return e && "value" in e && "value" in e;
  }
  function Ko(e) {
    return e && ("scale" in e || "sort" in e);
  }
  function Zo(e) {
    return e && ("axis" in e || "stack" in e || "impute" in e);
  }
  function ea(e) {
    return e && "legend" in e;
  }
  function ta(e) {
    return e && ("format" in e || "formatType" in e);
  }
  function na(e) {
    return f(e, ["legend", "axis", "header", "scale"]);
  }
  function ia(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = e.field;
    const i = t.prefix;
    let r = t.suffix, o = "";
    if (
      function (e) {
        return "count" === e.aggregate;
      }(e)
    ) n = I("count");
    else {
      let i;
      if (!t.nofn) {
        if (
          function (e) {
            return "op" in e;
          }(e)
        ) i = e.op;
        else {
          const { bin: a, aggregate: s, timeUnit: l } = e;
          ln(a)
            ? (i = sn(a), r = (t.binSuffix ?? "") + (t.suffix ?? ""))
            : s
            ? en(s)
              ? (o = `["${n}"]`, n = `argmax_${s.argmax}`)
              : Zt(s)
              ? (o = `["${n}"]`, n = `argmin_${s.argmin}`)
              : i = String(s)
            : l && !zi(l) && (i = function (e) {
              const { utc: t, ...n } = Ei(e);
              return n.unit
                ? (t ? "utc" : "") +
                  D(n).map((e) => C(`${"unit" === e ? "" : `_${e}_`}${n[e]}`))
                    .join("")
                : (t ? "utc" : "") + "timeunit" +
                  D(n).map((e) => C(`_${e}_${n[e]}`)).join("");
            }(l),
              r =
                (!["range", "mid"].includes(t.binSuffix) && t.binSuffix || "") +
                (t.suffix ?? ""));
        }
      }
      i && (n = n ? `${i}_${n}` : i);
    }
    return r && (n = `${n}_${r}`),
      i && (n = `${i}_${n}`),
      t.forAs ? R(n) : t.expr ? T(n, t.expr) + o : E(n) + o;
  }
  function ra(e) {
    switch (e.type) {
      case "nominal":
      case "ordinal":
      case "geojson":
        return !0;
      case "quantitative":
        return Io(e) && !!e.bin;
      case "temporal":
        return !1;
    }
    throw new Error(Zn(e.type));
  }
  const oa = (e, t) => {
    switch (t.fieldTitle) {
      case "plain":
        return e.field;
      case "functional":
        return function (e) {
          const { aggregate: t, bin: n, timeUnit: i, field: r } = e;
          if (en(t)) return `${r} for argmax(${t.argmax})`;
          if (Zt(t)) return `${r} for argmin(${t.argmin})`;
          const o = i && !zi(i) ? Ei(i) : void 0,
            a = t || o?.unit || o?.maxbins && "timeunit" || ln(n) && "bin";
          return a ? `${a.toUpperCase()}(${r})` : r;
        }(e);
      default:
        return function (e, t) {
          const { field: n, bin: i, timeUnit: r, aggregate: o } = e;
          if ("count" === o) return t.countTitle;
          if (ln(i)) return `${n} (binned)`;
          if (r && !zi(r)) {
            const e = Ei(r)?.unit;
            if (e) return `${n} (${_i(e).join("-")})`;
          } else if (o) {
            return en(o)
              ? `${n} for max ${o.argmax}`
              : Zt(o)
              ? `${n} for min ${o.argmin}`
              : `${P(o)} of ${n}`;
          }
          return n;
        }(e, t);
    }
  };
  let aa = oa;
  function sa(e) {
    aa = e;
  }
  function la(e, t, n) {
    let { allowDisabling: i, includeDefault: r = !0 } = n;
    const o = ca(e)?.title;
    if (!Io(e)) return o ?? e.title;
    const a = e, s = r ? ua(a, t) : void 0;
    return i ? q(o, a.title, s) : o ?? a.title ?? s;
  }
  function ca(e) {
    return Zo(e) && e.axis
      ? e.axis
      : ea(e) && e.legend
      ? e.legend
      : Po(e) && e.header
      ? e.header
      : void 0;
  }
  function ua(e, t) {
    return aa(e, t);
  }
  function fa(e) {
    if (ta(e)) {
      const { format: t, formatType: n } = e;
      return { format: t, formatType: n };
    }
    {
      const t = ca(e) ?? {}, { format: n, formatType: i } = t;
      return { format: n, formatType: i };
    }
  }
  function da(e) {
    return Io(e) ? e : Uo(e) ? e.condition : void 0;
  }
  function ma(e) {
    return Xo(e) ? e : Wo(e) ? e.condition : void 0;
  }
  function pa(e, n, i) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    if (t.isString(e) || t.isNumber(e) || t.isBoolean(e)) {
      return yi(function (e, t, n) {
        return `Channel ${e} is a ${t}. Converted to {value: ${X(n)}}.`;
      }(n, t.isString(e) ? "string" : t.isNumber(e) ? "number" : "boolean", e)),
        { value: e };
    }
    return Xo(e)
      ? ga(e, n, i, r)
      : Wo(e)
      ? { ...e, condition: ga(e.condition, n, i, r) }
      : e;
  }
  function ga(e, n, i, r) {
    if (ta(e)) {
      const { format: t, formatType: o, ...a } = e;
      if (po(o) && !i.customFormatTypes) return yi(Jn(n)), ga(a, n, i, r);
    } else {
      const t = Zo(e) ? "axis" : ea(e) ? "legend" : Po(e) ? "header" : null;
      if (t && e[t]) {
        const { format: o, formatType: a, ...s } = e[t];
        if (po(a) && !i.customFormatTypes) {
          return yi(Jn(n)), ga({ ...e, [t]: s }, n, i, r);
        }
      }
    }
    return Io(e) ? ha(e, n, r) : function (e) {
      let n = e.type;
      if (n) return e;
      const { datum: i } = e;
      return n = t.isNumber(i)
        ? "quantitative"
        : t.isString(i)
        ? "nominal"
        : vi(i)
        ? "temporal"
        : void 0,
        { ...e, type: n };
    }(e);
  }
  function ha(e, n) {
    let { compositeMark: i = !1 } =
      arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { aggregate: r, timeUnit: o, bin: a, field: s } = e, l = { ...e };
    if (
      i || !r || tn(r) || en(r) || Zt(r) || (yi(function (e) {
        return `Invalid aggregation operator "${e}".`;
      }(r)),
        delete l.aggregate),
        o && (l.timeUnit = Ei(o)),
        s && (l.field = `${s}`),
        ln(a) && (l.bin = ya(a, n)),
        cn(a) && !zt(n) && yi(function (e) {
          return `Channel ${e} should not be used with "binned" bin.`;
        }(n)),
        Qo(l)
    ) {
      const { type: e } = l,
        t = function (e) {
          if (e) {
            switch (e = e.toLowerCase()) {
              case "q":
              case er:
                return "quantitative";
              case "t":
              case nr:
                return "temporal";
              case "o":
              case tr:
                return "ordinal";
              case "n":
              case ir:
                return "nominal";
              case rr:
                return "geojson";
            }
          }
        }(e);
      e !== t && (l.type = t),
        "quantitative" !== e && rn(r) && (yi(function (e, t) {
          return `Invalid field type "${e}" for aggregate: "${t}", using "quantitative" instead.`;
        }(e, r)),
          l.type = "quantitative");
    } else if (!et(n)) {
      const e = function (e, n) {
        switch (n) {
          case "latitude":
          case "longitude":
            return "quantitative";
          case "row":
          case "column":
          case "facet":
          case "shape":
          case "strokeDash":
            return "nominal";
          case "order":
            return "ordinal";
        }
        if (jo(e) && t.isArray(e.sort)) return "ordinal";
        const { aggregate: i, bin: r, timeUnit: o } = e;
        if (o) return "temporal";
        if (r || i && !en(i) && !Zt(i)) return "quantitative";
        if (Ko(e) && e.scale?.type) {
          switch (ar[e.scale.type]) {
            case "numeric":
            case "discretizing":
              return "quantitative";
            case "time":
              return "temporal";
          }
        }
        return "nominal";
      }(l, n);
      l.type = e;
    }
    if (Qo(l)) {
      const { compatible: e, warning: t } = function (e, t) {
        const n = e.type;
        if ("geojson" === n && "shape" !== t) {
          return {
            compatible: !1,
            warning: `Channel ${t} should not be used with a geojson data.`,
          };
        }
        switch (t) {
          case Q:
          case J:
          case K:
            return ra(e) ? va : { compatible: !1, warning: ii(t) };
          case Z:
          case ee:
          case ie:
          case re:
          case me:
          case pe:
          case ge:
          case Se:
          case Fe:
          case ze:
          case Oe:
          case Ce:
          case Ne:
          case ve:
          case se:
          case oe:
          case _e:
            return va;
          case ue:
          case de:
          case ce:
          case fe:
            return n !== er
              ? {
                compatible: !1,
                warning:
                  `Channel ${t} should be used with a quantitative field only, not ${e.type} field.`,
              }
              : va;
          case be:
          case xe:
          case $e:
          case we:
          case ye:
          case le:
          case ae:
          case te:
          case ne:
            return "nominal" !== n || e.sort ? va : {
              compatible: !1,
              warning:
                `Channel ${t} should not be used with an unsorted discrete field.`,
            };
          case he:
          case ke:
            return ra(e) || Ko(i = e) && br(i.scale?.type)
              ? va
              : { compatible: !1, warning: ri(t) };
          case De:
            return "nominal" !== e.type || "sort" in e ? va : {
              compatible: !1,
              warning:
                "Channel order is inappropriate for nominal field, which has no inherent order.",
            };
        }
        var i;
      }(l, n) || {};
      !1 === e && yi(t);
    }
    if (jo(l) && t.isString(l.sort)) {
      const { sort: e } = l;
      if (Oo(e)) return { ...l, sort: { encoding: e } };
      const t = e.substr(1);
      if ("-" === e.charAt(0) && Oo(t)) {
        return { ...l, sort: { encoding: t, order: "descending" } };
      }
    }
    if (Po(l)) {
      const { header: e } = l;
      if (e) {
        const { orient: t, ...n } = e;
        if (t) {
          return {
            ...l,
            header: {
              ...n,
              labelOrient: e.labelOrient || t,
              titleOrient: e.titleOrient || t,
            },
          };
        }
      }
    }
    return l;
  }
  function ya(e, n) {
    return t.isBoolean(e)
      ? { maxbins: dn(n) }
      : "binned" === e
      ? { binned: !0 }
      : e.maxbins || e.step
      ? e
      : { ...e, maxbins: dn(n) };
  }
  const va = { compatible: !0 };
  function ba(e) {
    const { formatType: t } = fa(e);
    return "time" === t ||
      !t && ((n = e) && ("temporal" === n.type || Io(n) && !!n.timeUnit));
    var n;
  }
  function xa(e, n) {
    let { timeUnit: i, type: r, wrapTime: o, undefinedIfExprNotRequired: a } =
      n;
    const s = i && Ei(i)?.unit;
    let l, c = s || "temporal" === r;
    return mn(e)
      ? l = e.expr
      : yn(e)
      ? l = e.signal
      : vi(e)
      ? (c = !0, l = Si(e))
      : (t.isString(e) || t.isNumber(e)) && c &&
        (l = `datetime(${X(e)})`,
          function (e) {
            return !!Di[e];
          }(s) &&
          (t.isNumber(e) && e < 1e4 || t.isString(e) && isNaN(Date.parse(e))) &&
          (l = Si({ [s]: e }))),
      l ? o && c ? `time(${l})` : l : a ? void 0 : X(e);
  }
  function $a(e, t) {
    const { type: n } = e;
    return t.map((t) => {
      const i = xa(t, {
        timeUnit: Io(e) && !zi(e.timeUnit) ? e.timeUnit : void 0,
        type: n,
        undefinedIfExprNotRequired: !0,
      });
      return void 0 !== i ? { signal: i } : t;
    });
  }
  function wa(e, t) {
    return ln(e.bin)
      ? Vt(t) && ["ordinal", "nominal"].includes(e.type)
      : (console.warn("Only call this method for binned field defs."), !1);
  }
  const ka = {
    labelAlign: { part: "labels", vgProp: "align" },
    labelBaseline: { part: "labels", vgProp: "baseline" },
    labelColor: { part: "labels", vgProp: "fill" },
    labelFont: { part: "labels", vgProp: "font" },
    labelFontSize: { part: "labels", vgProp: "fontSize" },
    labelFontStyle: { part: "labels", vgProp: "fontStyle" },
    labelFontWeight: { part: "labels", vgProp: "fontWeight" },
    labelOpacity: { part: "labels", vgProp: "opacity" },
    labelOffset: null,
    labelPadding: null,
    gridColor: { part: "grid", vgProp: "stroke" },
    gridDash: { part: "grid", vgProp: "strokeDash" },
    gridDashOffset: { part: "grid", vgProp: "strokeDashOffset" },
    gridOpacity: { part: "grid", vgProp: "opacity" },
    gridWidth: { part: "grid", vgProp: "strokeWidth" },
    tickColor: { part: "ticks", vgProp: "stroke" },
    tickDash: { part: "ticks", vgProp: "strokeDash" },
    tickDashOffset: { part: "ticks", vgProp: "strokeDashOffset" },
    tickOpacity: { part: "ticks", vgProp: "opacity" },
    tickSize: null,
    tickWidth: { part: "ticks", vgProp: "strokeWidth" },
  };
  function Sa(e) {
    return e?.condition;
  }
  const Da = ["domain", "grid", "labels", "ticks", "title"],
    Fa = {
      grid: "grid",
      gridCap: "grid",
      gridColor: "grid",
      gridDash: "grid",
      gridDashOffset: "grid",
      gridOpacity: "grid",
      gridScale: "grid",
      gridWidth: "grid",
      orient: "main",
      bandPosition: "both",
      aria: "main",
      description: "main",
      domain: "main",
      domainCap: "main",
      domainColor: "main",
      domainDash: "main",
      domainDashOffset: "main",
      domainOpacity: "main",
      domainWidth: "main",
      format: "main",
      formatType: "main",
      labelAlign: "main",
      labelAngle: "main",
      labelBaseline: "main",
      labelBound: "main",
      labelColor: "main",
      labelFlush: "main",
      labelFlushOffset: "main",
      labelFont: "main",
      labelFontSize: "main",
      labelFontStyle: "main",
      labelFontWeight: "main",
      labelLimit: "main",
      labelLineHeight: "main",
      labelOffset: "main",
      labelOpacity: "main",
      labelOverlap: "main",
      labelPadding: "main",
      labels: "main",
      labelSeparation: "main",
      maxExtent: "main",
      minExtent: "main",
      offset: "both",
      position: "main",
      tickCap: "main",
      tickColor: "main",
      tickDash: "main",
      tickDashOffset: "main",
      tickMinStep: "both",
      tickOffset: "both",
      tickOpacity: "main",
      tickRound: "both",
      ticks: "main",
      tickSize: "main",
      tickWidth: "both",
      title: "main",
      titleAlign: "main",
      titleAnchor: "main",
      titleAngle: "main",
      titleBaseline: "main",
      titleColor: "main",
      titleFont: "main",
      titleFontSize: "main",
      titleFontStyle: "main",
      titleFontWeight: "main",
      titleLimit: "main",
      titleLineHeight: "main",
      titleOpacity: "main",
      titlePadding: "main",
      titleX: "main",
      titleY: "main",
      encode: "both",
      scale: "both",
      tickBand: "both",
      tickCount: "both",
      tickExtra: "both",
      translate: "both",
      values: "both",
      zindex: "both",
    },
    za = {
      orient: 1,
      aria: 1,
      bandPosition: 1,
      description: 1,
      domain: 1,
      domainCap: 1,
      domainColor: 1,
      domainDash: 1,
      domainDashOffset: 1,
      domainOpacity: 1,
      domainWidth: 1,
      format: 1,
      formatType: 1,
      grid: 1,
      gridCap: 1,
      gridColor: 1,
      gridDash: 1,
      gridDashOffset: 1,
      gridOpacity: 1,
      gridWidth: 1,
      labelAlign: 1,
      labelAngle: 1,
      labelBaseline: 1,
      labelBound: 1,
      labelColor: 1,
      labelFlush: 1,
      labelFlushOffset: 1,
      labelFont: 1,
      labelFontSize: 1,
      labelFontStyle: 1,
      labelFontWeight: 1,
      labelLimit: 1,
      labelLineHeight: 1,
      labelOffset: 1,
      labelOpacity: 1,
      labelOverlap: 1,
      labelPadding: 1,
      labels: 1,
      labelSeparation: 1,
      maxExtent: 1,
      minExtent: 1,
      offset: 1,
      position: 1,
      tickBand: 1,
      tickCap: 1,
      tickColor: 1,
      tickCount: 1,
      tickDash: 1,
      tickDashOffset: 1,
      tickExtra: 1,
      tickMinStep: 1,
      tickOffset: 1,
      tickOpacity: 1,
      tickRound: 1,
      ticks: 1,
      tickSize: 1,
      tickWidth: 1,
      title: 1,
      titleAlign: 1,
      titleAnchor: 1,
      titleAngle: 1,
      titleBaseline: 1,
      titleColor: 1,
      titleFont: 1,
      titleFontSize: 1,
      titleFontStyle: 1,
      titleFontWeight: 1,
      titleLimit: 1,
      titleLineHeight: 1,
      titleOpacity: 1,
      titlePadding: 1,
      titleX: 1,
      titleY: 1,
      translate: 1,
      values: 1,
      zindex: 1,
    },
    Oa = { ...za, style: 1, labelExpr: 1, encoding: 1 };
  function Ca(e) {
    return !!Oa[e];
  }
  const Na = D({
    axis: 1,
    axisBand: 1,
    axisBottom: 1,
    axisDiscrete: 1,
    axisLeft: 1,
    axisPoint: 1,
    axisQuantitative: 1,
    axisRight: 1,
    axisTemporal: 1,
    axisTop: 1,
    axisX: 1,
    axisXBand: 1,
    axisXDiscrete: 1,
    axisXPoint: 1,
    axisXQuantitative: 1,
    axisXTemporal: 1,
    axisY: 1,
    axisYBand: 1,
    axisYDiscrete: 1,
    axisYPoint: 1,
    axisYQuantitative: 1,
    axisYTemporal: 1,
  });
  function _a(e) {
    return "mark" in e;
  }
  class Pa {
    constructor(e, t) {
      this.name = e, this.run = t;
    }
    hasMatchingType(e) {
      return !!_a(e) && (Xr(t = e.mark) ? t.type : t) === this.name;
      var t;
    }
  }
  function Aa(e, n) {
    const i = e && e[n];
    return !!i && (t.isArray(i) ? g(i, (e) => !!e.field) : Io(i) || Uo(i));
  }
  function Ta(e, n) {
    const i = e && e[n];
    return !!i &&
      (t.isArray(i) ? g(i, (e) => !!e.field) : Io(i) || Vo(i) || Wo(i));
  }
  function ja(e, t) {
    if (zt(t)) {
      const n = e[t];
      if ((Io(n) || Vo(n)) && (Zi(n.type) || Io(n) && n.timeUnit)) {
        return Ta(e, at(t));
      }
    }
    return !1;
  }
  function Ea(e) {
    return g(Ie, (n) => {
      if (Aa(e, n)) {
        const i = e[n];
        if (t.isArray(i)) return g(i, (e) => !!e.aggregate);
        {
          const e = da(i);
          return e && !!e.aggregate;
        }
      }
      return !1;
    });
  }
  function Ma(e, t) {
    const n = [], i = [], r = [], o = [], a = {};
    return qa(e, (s, l) => {
      if (Io(s)) {
        const { field: c, aggregate: u, bin: f, timeUnit: d, ...m } = s;
        if (u || d || f) {
          const e = ca(s), p = e?.title;
          let g = ia(s, { forAs: !0 });
          const h = {
            ...p ? [] : { title: la(s, t, { allowDisabling: !0 }) },
            ...m,
            field: g,
          };
          if (u) {
            let e;
            if (
              en(u)
                ? (e = "argmax",
                  g = ia({ op: "argmax", field: u.argmax }, { forAs: !0 }),
                  h.field = `${g}.${c}`)
                : Zt(u)
                ? (e = "argmin",
                  g = ia({ op: "argmin", field: u.argmin }, { forAs: !0 }),
                  h.field = `${g}.${c}`)
                : "boxplot" !== u && "errorbar" !== u && "errorband" !== u &&
                  (e = u), e
            ) {
              const t = { op: e, as: g };
              c && (t.field = c), o.push(t);
            }
          } else if (n.push(g), Qo(s) && ln(f)) {
            if (
              i.push({ bin: f, field: c, as: g }),
                n.push(ia(s, { binSuffix: "end" })),
                wa(s, l) && n.push(ia(s, { binSuffix: "range" })),
                zt(l)
            ) {
              const e = { field: `${g}_end` };
              a[`${l}2`] = e;
            }
            h.bin = "binned", et(l) || (h.type = er);
          } else if (d && !zi(d)) {
            r.push({ timeUnit: d, field: c, as: g });
            const e = Qo(s) && s.type !== nr && "time";
            e && (l === Se || l === Oe ? h.formatType = e : !function (e) {
                return !!kt[e];
              }(l)
              ? zt(l) && (h.axis = { formatType: e, ...h.axis })
              : h.legend = { formatType: e, ...h.legend });
          }
          a[l] = h;
        } else n.push(c), a[l] = e[l];
      } else a[l] = e[l];
    }),
      { bins: i, timeUnits: r, aggregate: o, groupby: n, encoding: a };
  }
  function Ra(e, t, n) {
    const i = Ht(t, n);
    if (!i) return !1;
    if ("binned" === i) {
      const n = e[t === te ? Z : ee];
      return !!(Io(n) && Io(e[t]) && cn(n.bin));
    }
    return !0;
  }
  function La(e, t) {
    const n = {};
    for (const i of D(e)) {
      const r = pa(e[i], i, t, { compositeMark: !0 });
      n[i] = r;
    }
    return n;
  }
  function qa(e, n, i) {
    if (e) {
      for (const r of D(e)) {
        const o = e[r];
        if (t.isArray(o)) { for (const e of o) n.call(i, e, r); }
        else n.call(i, o, r);
      }
    }
  }
  function Ua(e, n) {
    return D(n).reduce((i, r) => {
      switch (r) {
        case Z:
        case ee:
        case Ce:
        case _e:
        case Ne:
        case te:
        case ne:
        case ie:
        case re:
        case se:
        case le:
        case oe:
        case ae:
        case ce:
        case ue:
        case fe:
        case de:
        case Se:
        case he:
        case ve:
        case Oe:
          return i;
        case De:
          if ("line" === e || "trail" === e) return i;
        case Fe:
        case ze: {
          const e = n[r];
          if (t.isArray(e) || Io(e)) {
            for (const n of t.array(e)) n.aggregate || i.push(ia(n, {}));
          }
          return i;
        }
        case ye:
          if ("trail" === e) return i;
        case me:
        case pe:
        case ge:
        case be:
        case xe:
        case $e:
        case ke:
        case we: {
          const e = da(n[r]);
          return e && !e.aggregate && i.push(ia(e, {})), i;
        }
      }
    }, []);
  }
  function Wa(e, n, i) {
    let r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
    if ("tooltip" in i) return { tooltip: i.tooltip };
    return {
      tooltip: [
        ...e.map((e) => {
          let { fieldPrefix: t, titlePrefix: i } = e;
          const o = r ? ` of ${Ia(n)}` : "";
          return {
            field: t + n.field,
            type: n.type,
            title: yn(i) ? { signal: `${i}"${escape(o)}"` } : i + o,
          };
        }),
        ...b(
          function (e) {
            const n = [];
            for (const i of D(e)) {
              if (Aa(e, i)) {
                const r = e[i], o = t.array(r);
                for (const e of o) {
                  Io(e) ? n.push(e) : Uo(e) && n.push(e.condition);
                }
              }
            }
            return n;
          }(i).map(na),
          d,
        ),
      ],
    };
  }
  function Ia(e) {
    const { title: t, field: n } = e;
    return q(t, n);
  }
  function Ba(e, n, i, r, o) {
    const { scale: a, axis: s } = i;
    return (l) => {
      let {
        partName: c,
        mark: u,
        positionPrefix: f,
        endPositionPrefix: d,
        extraEncoding: m = {},
      } = l;
      const p = Ia(i);
      return Va(e, c, o, {
        mark: u,
        encoding: {
          [n]: {
            field: `${f}_${i.field}`,
            type: i.type,
            ...void 0 !== p ? { title: p } : {},
            ...void 0 !== a ? { scale: a } : {},
            ...void 0 !== s ? { axis: s } : {},
          },
          ...t.isString(d) ? { [`${n}2`]: { field: `${d}_${i.field}` } } : {},
          ...r,
          ...m,
        },
      });
    };
  }
  function Va(e, n, i, r) {
    const { clip: o, color: a, opacity: s } = e, l = e.type;
    return e[n] || void 0 === e[n] && i[n]
      ? [{
        ...r,
        mark: {
          ...i[n],
          ...o ? { clip: o } : {},
          ...a ? { color: a } : {},
          ...s ? { opacity: s } : {},
          ...Xr(r.mark) ? r.mark : { type: r.mark },
          style: `${l}-${String(n)}`,
          ...t.isBoolean(e[n]) ? {} : e[n],
        },
      }]
      : [];
  }
  function Ha(e, t, n) {
    const { encoding: i } = e,
      r = "vertical" === t ? "y" : "x",
      o = i[r],
      a = i[`${r}2`],
      s = i[`${r}Error`],
      l = i[`${r}Error2`];
    return {
      continuousAxisChannelDef: Ga(o, n),
      continuousAxisChannelDef2: Ga(a, n),
      continuousAxisChannelDefError: Ga(s, n),
      continuousAxisChannelDefError2: Ga(l, n),
      continuousAxis: r,
    };
  }
  function Ga(e, t) {
    if (e?.aggregate) {
      const { aggregate: n, ...i } = e;
      return n !== t && yi(function (e, t) {
        return `Continuous axis should not have customized aggregation function ${e}; ${t} already agregates the axis.`;
      }(n, t)),
        i;
    }
    return e;
  }
  function Ya(e, t) {
    const { mark: n, encoding: i } = e, { x: r, y: o } = i;
    if (Xr(n) && n.orient) return n.orient;
    if (Ho(r)) {
      if (Ho(o)) {
        const e = Io(r) && r.aggregate, n = Io(o) && o.aggregate;
        if (e || n !== t) {
          if (n || e !== t) {
            if (e === t && n === t) {
              throw new Error("Both x and y cannot have aggregate");
            }
            return ba(o) && !ba(r) ? "horizontal" : "vertical";
          }
          return "horizontal";
        }
        return "vertical";
      }
      return "horizontal";
    }
    if (Ho(o)) return "vertical";
    throw new Error(`Need a valid continuous axis for ${t}s`);
  }
  const Xa = "boxplot", Qa = new Pa(Xa, Ka);
  function Ja(e) {
    return t.isNumber(e) ? "tukey" : e;
  }
  function Ka(e, n) {
    let { config: i } = n;
    e = { ...e, encoding: La(e.encoding, i) };
    const { mark: r, encoding: o, params: a, projection: s, ...l } = e,
      c = Xr(r) ? r : { type: r };
    a && yi(Gn("boxplot"));
    const u = c.extent ?? i.boxplot.extent,
      d = _n("size", c, i),
      m = c.invalid,
      p = Ja(u),
      {
        bins: g,
        timeUnits: h,
        transform: y,
        continuousAxisChannelDef: v,
        continuousAxis: b,
        groupby: x,
        aggregate: $,
        encodingWithoutContinuousAxis: w,
        ticksOrient: k,
        boxOrient: D,
        customTooltipWithoutAggregatedField: F,
      } = function (e, n, i) {
        const r = Ya(e, Xa),
          { continuousAxisChannelDef: o, continuousAxis: a } = Ha(e, r, Xa),
          s = o.field,
          l = R(s),
          c = Ja(n),
          u = [...Za(s), { op: "median", field: s, as: `mid_box_${l}` }, {
            op: "min",
            field: s,
            as: ("min-max" === c ? "lower_whisker_" : "min_") + l,
          }, {
            op: "max",
            field: s,
            as: ("min-max" === c ? "upper_whisker_" : "max_") + l,
          }],
          f = "min-max" === c || "tukey" === c ? [] : [{
            calculate: `datum["upper_box_${l}"] - datum["lower_box_${l}"]`,
            as: `iqr_${l}`,
          }, {
            calculate:
              `min(datum["upper_box_${l}"] + datum["iqr_${l}"] * ${n}, datum["max_${l}"])`,
            as: `upper_whisker_${l}`,
          }, {
            calculate:
              `max(datum["lower_box_${l}"] - datum["iqr_${l}"] * ${n}, datum["min_${l}"])`,
            as: `lower_whisker_${l}`,
          }],
          { [a]: d, ...m } = e.encoding,
          { customTooltipWithoutAggregatedField: p, filteredEncoding: g } =
            function (e) {
              const { tooltip: n, ...i } = e;
              if (!n) return { filteredEncoding: i };
              let r, o;
              if (t.isArray(n)) {
                for (const e of n) {
                  e.aggregate
                    ? (r || (r = []), r.push(e))
                    : (o || (o = []), o.push(e));
                }
                r && (i.tooltip = r);
              } else n.aggregate ? i.tooltip = n : o = n;
              return t.isArray(o) && 1 === o.length && (o = o[0]),
                { customTooltipWithoutAggregatedField: o, filteredEncoding: i };
            }(m),
          { bins: h, timeUnits: y, aggregate: v, groupby: b, encoding: x } = Ma(
            g,
            i,
          ),
          $ = "vertical" === r ? "horizontal" : "vertical",
          w = r,
          k = [...h, ...y, { aggregate: [...v, ...u], groupby: b }, ...f];
        return {
          bins: h,
          timeUnits: y,
          transform: k,
          groupby: b,
          aggregate: v,
          continuousAxisChannelDef: o,
          continuousAxis: a,
          encodingWithoutContinuousAxis: x,
          ticksOrient: $,
          boxOrient: w,
          customTooltipWithoutAggregatedField: p,
        };
      }(e, u, i),
      z = R(v.field),
      { color: O, size: C, ...N } = w,
      _ = (e) => Ba(c, b, v, e, i.boxplot),
      P = _(N),
      A = _(w),
      T = (t.isObject(i.boxplot.box) ? i.boxplot.box.color : i.mark.color) ||
        "#4c78a8",
      j = _({
        ...N,
        ...C ? { size: C } : {},
        color: {
          condition: {
            test:
              `datum['lower_box_${v.field}'] >= datum['upper_box_${v.field}']`,
            ...O || { value: T },
          },
        },
      }),
      E = Wa(
        [
          {
            fieldPrefix: "min-max" === p ? "upper_whisker_" : "max_",
            titlePrefix: "Max",
          },
          { fieldPrefix: "upper_box_", titlePrefix: "Q3" },
          { fieldPrefix: "mid_box_", titlePrefix: "Median" },
          { fieldPrefix: "lower_box_", titlePrefix: "Q1" },
          {
            fieldPrefix: "min-max" === p ? "lower_whisker_" : "min_",
            titlePrefix: "Min",
          },
        ],
        v,
        w,
      ),
      M = {
        type: "tick",
        color: "black",
        opacity: 1,
        orient: k,
        invalid: m,
        aria: !1,
      },
      L = "min-max" === p ? E : Wa(
        [{ fieldPrefix: "upper_whisker_", titlePrefix: "Upper Whisker" }, {
          fieldPrefix: "lower_whisker_",
          titlePrefix: "Lower Whisker",
        }],
        v,
        w,
      ),
      q = [
        ...P({
          partName: "rule",
          mark: { type: "rule", invalid: m, aria: !1 },
          positionPrefix: "lower_whisker",
          endPositionPrefix: "lower_box",
          extraEncoding: L,
        }),
        ...P({
          partName: "rule",
          mark: { type: "rule", invalid: m, aria: !1 },
          positionPrefix: "upper_box",
          endPositionPrefix: "upper_whisker",
          extraEncoding: L,
        }),
        ...P({
          partName: "ticks",
          mark: M,
          positionPrefix: "lower_whisker",
          extraEncoding: L,
        }),
        ...P({
          partName: "ticks",
          mark: M,
          positionPrefix: "upper_whisker",
          extraEncoding: L,
        }),
      ],
      U = [
        ..."tukey" !== p ? q : [],
        ...A({
          partName: "box",
          mark: {
            type: "bar",
            ...d ? { size: d } : {},
            orient: D,
            invalid: m,
            ariaRoleDescription: "box",
          },
          positionPrefix: "lower_box",
          endPositionPrefix: "upper_box",
          extraEncoding: E,
        }),
        ...j({
          partName: "median",
          mark: {
            type: "tick",
            invalid: m,
            ...t.isObject(i.boxplot.median) && i.boxplot.median.color
              ? { color: i.boxplot.median.color }
              : {},
            ...d ? { size: d } : {},
            orient: k,
            aria: !1,
          },
          positionPrefix: "mid_box",
          extraEncoding: E,
        }),
      ];
    if ("min-max" === p) {
      return { ...l, transform: (l.transform ?? []).concat(y), layer: U };
    }
    const W = `datum["lower_box_${v.field}"]`,
      I = `datum["upper_box_${v.field}"]`,
      B = `(${I} - ${W})`,
      V = `${W} - ${u} * ${B}`,
      H = `${I} + ${u} * ${B}`,
      G = `datum["${v.field}"]`,
      Y = { joinaggregate: Za(v.field), groupby: x },
      X = {
        transform: [{ filter: `(${V} <= ${G}) && (${G} <= ${H})` }, {
          aggregate: [
            { op: "min", field: v.field, as: `lower_whisker_${z}` },
            { op: "max", field: v.field, as: `upper_whisker_${z}` },
            { op: "min", field: `lower_box_${v.field}`, as: `lower_box_${z}` },
            { op: "max", field: `upper_box_${v.field}`, as: `upper_box_${z}` },
            ...$,
          ],
          groupby: x,
        }],
        layer: q,
      },
      { tooltip: Q, ...J } = N,
      { scale: K, axis: Z } = v,
      ee = Ia(v),
      te = f(Z, ["title"]),
      ne = Va(c, "outliers", i.boxplot, {
        transform: [{ filter: `(${G} < ${V}) || (${G} > ${H})` }],
        mark: "point",
        encoding: {
          [b]: {
            field: v.field,
            type: v.type,
            ...void 0 !== ee ? { title: ee } : {},
            ...void 0 !== K ? { scale: K } : {},
            ...S(te) ? {} : { axis: te },
          },
          ...J,
          ...O ? { color: O } : {},
          ...F ? { tooltip: F } : {},
        },
      })[0];
    let ie;
    const re = [...g, ...h, Y];
    return ne
      ? ie = { transform: re, layer: [ne, X] }
      : (ie = X, ie.transform.unshift(...re)),
      { ...l, layer: [ie, { transform: y, layer: U }] };
  }
  function Za(e) {
    const t = R(e);
    return [{ op: "q1", field: e, as: `lower_box_${t}` }, {
      op: "q3",
      field: e,
      as: `upper_box_${t}`,
    }];
  }
  const es = "errorbar", ts = new Pa(es, ns);
  function ns(e, t) {
    let { config: n } = t;
    e = { ...e, encoding: La(e.encoding, n) };
    const {
      transform: i,
      continuousAxisChannelDef: r,
      continuousAxis: o,
      encodingWithoutContinuousAxis: a,
      ticksOrient: s,
      markDef: l,
      outerSpec: c,
      tooltipEncoding: u,
    } = rs(e, es, n);
    delete a.size;
    const f = Ba(l, o, r, a, n.errorbar),
      d = l.thickness,
      m = l.size,
      p = {
        type: "tick",
        orient: s,
        aria: !1,
        ...void 0 !== d ? { thickness: d } : {},
        ...void 0 !== m ? { size: m } : {},
      },
      g = [
        ...f({
          partName: "ticks",
          mark: p,
          positionPrefix: "lower",
          extraEncoding: u,
        }),
        ...f({
          partName: "ticks",
          mark: p,
          positionPrefix: "upper",
          extraEncoding: u,
        }),
        ...f({
          partName: "rule",
          mark: {
            type: "rule",
            ariaRoleDescription: "errorbar",
            ...void 0 !== d ? { size: d } : {},
          },
          positionPrefix: "lower",
          endPositionPrefix: "upper",
          extraEncoding: u,
        }),
      ];
    return { ...c, transform: i, ...g.length > 1 ? { layer: g } : { ...g[0] } };
  }
  function is(e, t) {
    const { encoding: n } = e;
    if (
      function (e) {
        return (Xo(e.x) || Xo(e.y)) && !Xo(e.x2) && !Xo(e.y2) &&
          !Xo(e.xError) && !Xo(e.xError2) && !Xo(e.yError) && !Xo(e.yError2);
      }(n)
    ) return { orient: Ya(e, t), inputType: "raw" };
    const i = function (e) {
        return Xo(e.x2) || Xo(e.y2);
      }(n),
      r = function (e) {
        return Xo(e.xError) || Xo(e.xError2) || Xo(e.yError) || Xo(e.yError2);
      }(n),
      o = n.x,
      a = n.y;
    if (i) {
      if (r) {
        throw new Error(
          `${t} cannot be both type aggregated-upper-lower and aggregated-error`,
        );
      }
      const e = n.x2, i = n.y2;
      if (Xo(e) && Xo(i)) throw new Error(`${t} cannot have both x2 and y2`);
      if (Xo(e)) {
        if (Ho(o)) {
          return { orient: "horizontal", inputType: "aggregated-upper-lower" };
        }
        throw new Error(`Both x and x2 have to be quantitative in ${t}`);
      }
      if (Xo(i)) {
        if (Ho(a)) {
          return { orient: "vertical", inputType: "aggregated-upper-lower" };
        }
        throw new Error(`Both y and y2 have to be quantitative in ${t}`);
      }
      throw new Error("No ranged axis");
    }
    {
      const e = n.xError, i = n.xError2, r = n.yError, s = n.yError2;
      if (Xo(i) && !Xo(e)) {
        throw new Error(`${t} cannot have xError2 without xError`);
      }
      if (Xo(s) && !Xo(r)) {
        throw new Error(`${t} cannot have yError2 without yError`);
      }
      if (Xo(e) && Xo(r)) {
        throw new Error(
          `${t} cannot have both xError and yError with both are quantiative`,
        );
      }
      if (Xo(e)) {
        if (Ho(o)) {
          return { orient: "horizontal", inputType: "aggregated-error" };
        }
        throw new Error(
          "All x, xError, and xError2 (if exist) have to be quantitative",
        );
      }
      if (Xo(r)) {
        if (Ho(a)) return { orient: "vertical", inputType: "aggregated-error" };
        throw new Error(
          "All y, yError, and yError2 (if exist) have to be quantitative",
        );
      }
      throw new Error("No ranged axis");
    }
  }
  function rs(e, t, n) {
    const { mark: i, encoding: r, params: o, projection: a, ...s } = e,
      l = Xr(i) ? i : { type: i };
    o && yi(Gn(t));
    const { orient: c, inputType: u } = is(e, t),
      {
        continuousAxisChannelDef: f,
        continuousAxisChannelDef2: d,
        continuousAxisChannelDefError: m,
        continuousAxisChannelDefError2: p,
        continuousAxis: g,
      } = Ha(e, c, t),
      {
        errorBarSpecificAggregate: h,
        postAggregateCalculates: y,
        tooltipSummary: v,
        tooltipTitleWithFieldName: b,
      } = function (e, t, n, i, r, o, a, s) {
        let l = [], c = [];
        const u = t.field;
        let f, d = !1;
        if ("raw" === o) {
          const t = e.center
              ? e.center
              : e.extent
              ? "iqr" === e.extent ? "median" : "mean"
              : s.errorbar.center,
            n = e.extent ? e.extent : "mean" === t ? "stderr" : "iqr";
          if (
            "median" === t != ("iqr" === n) && yi(function (e, t, n) {
              return `${e} is not usually used with ${t} for ${n}.`;
            }(t, n, a)), "stderr" === n || "stdev" === n
          ) {
            l = [{ op: n, field: u, as: `extent_${u}` }, {
              op: t,
              field: u,
              as: `center_${u}`,
            }],
              c = [{
                calculate: `datum["center_${u}"] + datum["extent_${u}"]`,
                as: `upper_${u}`,
              }, {
                calculate: `datum["center_${u}"] - datum["extent_${u}"]`,
                as: `lower_${u}`,
              }],
              f = [{ fieldPrefix: "center_", titlePrefix: P(t) }, {
                fieldPrefix: "upper_",
                titlePrefix: os(t, n, "+"),
              }, { fieldPrefix: "lower_", titlePrefix: os(t, n, "-") }],
              d = !0;
          } else {
            let e, t, i;
            "ci" === n
              ? (e = "mean", t = "ci0", i = "ci1")
              : (e = "median", t = "q1", i = "q3"),
              l = [{ op: t, field: u, as: `lower_${u}` }, {
                op: i,
                field: u,
                as: `upper_${u}`,
              }, { op: e, field: u, as: `center_${u}` }],
              f = [{
                fieldPrefix: "upper_",
                titlePrefix: la(
                  { field: u, aggregate: i, type: "quantitative" },
                  s,
                  { allowDisabling: !1 },
                ),
              }, {
                fieldPrefix: "lower_",
                titlePrefix: la(
                  { field: u, aggregate: t, type: "quantitative" },
                  s,
                  { allowDisabling: !1 },
                ),
              }, {
                fieldPrefix: "center_",
                titlePrefix: la(
                  { field: u, aggregate: e, type: "quantitative" },
                  s,
                  { allowDisabling: !1 },
                ),
              }];
          }
        } else {
          (e.center || e.extent) &&
          yi(
            (m = e.center,
              `${(p = e.extent) ? "extent " : ""}${p && m ? "and " : ""}${
                m ? "center " : ""
              }${p && m ? "are " : "is "}not needed when data are aggregated.`),
          ),
            "aggregated-upper-lower" === o
              ? (f = [],
                c = [{ calculate: `datum["${n.field}"]`, as: `upper_${u}` }, {
                  calculate: `datum["${u}"]`,
                  as: `lower_${u}`,
                }])
              : "aggregated-error" === o &&
                (f = [{ fieldPrefix: "", titlePrefix: u }],
                  c = [{
                    calculate: `datum["${u}"] + datum["${i.field}"]`,
                    as: `upper_${u}`,
                  }],
                  r
                    ? c.push({
                      calculate: `datum["${u}"] + datum["${r.field}"]`,
                      as: `lower_${u}`,
                    })
                    : c.push({
                      calculate: `datum["${u}"] - datum["${i.field}"]`,
                      as: `lower_${u}`,
                    }));
          for (const e of c) {
            f.push({
              fieldPrefix: e.as.substring(0, 6),
              titlePrefix: M(M(e.calculate, 'datum["', ""), '"]', ""),
            });
          }
        }
        var m, p;
        return {
          postAggregateCalculates: c,
          errorBarSpecificAggregate: l,
          tooltipSummary: f,
          tooltipTitleWithFieldName: d,
        };
      }(l, f, d, m, p, u, t, n),
      {
        [g]: x,
        ["x" === g ? "x2" : "y2"]: $,
        ["x" === g ? "xError" : "yError"]: w,
        ["x" === g ? "xError2" : "yError2"]: k,
        ...S
      } = r,
      { bins: D, timeUnits: F, aggregate: z, groupby: O, encoding: C } = Ma(
        S,
        n,
      ),
      N = [...z, ...h],
      _ = "raw" !== u ? [] : O,
      A = Wa(v, f, C, b);
    return {
      transform: [
        ...s.transform ?? [],
        ...D,
        ...F,
        ...0 === N.length ? [] : [{ aggregate: N, groupby: _ }],
        ...y,
      ],
      groupby: _,
      continuousAxisChannelDef: f,
      continuousAxis: g,
      encodingWithoutContinuousAxis: C,
      ticksOrient: "vertical" === c ? "horizontal" : "vertical",
      markDef: l,
      outerSpec: s,
      tooltipEncoding: A,
    };
  }
  function os(e, t, n) {
    return `${P(e)} ${n} ${t}`;
  }
  const as = "errorband", ss = new Pa(as, ls);
  function ls(e, t) {
    let { config: n } = t;
    e = { ...e, encoding: La(e.encoding, n) };
    const {
        transform: i,
        continuousAxisChannelDef: r,
        continuousAxis: o,
        encodingWithoutContinuousAxis: a,
        markDef: s,
        outerSpec: l,
        tooltipEncoding: c,
      } = rs(e, as, n),
      u = s,
      f = Ba(u, o, r, a, n.errorband),
      d = void 0 !== e.encoding.x && void 0 !== e.encoding.y;
    let m = { type: d ? "area" : "rect" }, p = { type: d ? "line" : "rule" };
    const g = {
      ...u.interpolate ? { interpolate: u.interpolate } : {},
      ...u.tension && u.interpolate ? { tension: u.tension } : {},
    };
    return d
      ? (m = { ...m, ...g, ariaRoleDescription: "errorband" },
        p = { ...p, ...g, aria: !1 })
      : u.interpolate
      ? yi(mi("interpolate"))
      : u.tension && yi(mi("tension")),
      {
        ...l,
        transform: i,
        layer: [
          ...f({
            partName: "band",
            mark: m,
            positionPrefix: "lower",
            endPositionPrefix: "upper",
            extraEncoding: c,
          }),
          ...f({
            partName: "borders",
            mark: p,
            positionPrefix: "lower",
            extraEncoding: c,
          }),
          ...f({
            partName: "borders",
            mark: p,
            positionPrefix: "upper",
            extraEncoding: c,
          }),
        ],
      };
  }
  const cs = {};
  function us(e, t, n) {
    const i = new Pa(e, t);
    cs[e] = { normalizer: i, parts: n };
  }
  us(Xa, Ka, ["box", "median", "outliers", "rule", "ticks"]),
    us(es, ns, ["ticks", "rule"]),
    us(as, ls, ["band", "borders"]);
  const fs = [
      "gradientHorizontalMaxLength",
      "gradientHorizontalMinLength",
      "gradientVerticalMaxLength",
      "gradientVerticalMinLength",
      "unselectedOpacity",
    ],
    ds = {
      titleAlign: "align",
      titleAnchor: "anchor",
      titleAngle: "angle",
      titleBaseline: "baseline",
      titleColor: "color",
      titleFont: "font",
      titleFontSize: "fontSize",
      titleFontStyle: "fontStyle",
      titleFontWeight: "fontWeight",
      titleLimit: "limit",
      titleLineHeight: "lineHeight",
      titleOrient: "orient",
      titlePadding: "offset",
    },
    ms = {
      labelAlign: "align",
      labelAnchor: "anchor",
      labelAngle: "angle",
      labelBaseline: "baseline",
      labelColor: "color",
      labelFont: "font",
      labelFontSize: "fontSize",
      labelFontStyle: "fontStyle",
      labelFontWeight: "fontWeight",
      labelLimit: "limit",
      labelLineHeight: "lineHeight",
      labelOrient: "orient",
      labelPadding: "offset",
    },
    ps = D(ds),
    gs = D(ms),
    hs = D({ header: 1, headerRow: 1, headerColumn: 1, headerFacet: 1 }),
    ys = [
      "size",
      "shape",
      "fill",
      "stroke",
      "strokeDash",
      "strokeWidth",
      "opacity",
    ],
    vs = "_vgsid_",
    bs = {
      point: {
        on: "click",
        fields: [vs],
        toggle: "event.shiftKey",
        resolve: "global",
        clear: "dblclick",
      },
      interval: {
        on: "[pointerdown, window:pointerup] > window:pointermove!",
        encodings: ["x", "y"],
        translate: "[pointerdown, window:pointerup] > window:pointermove!",
        zoom: "wheel!",
        mark: { fill: "#333", fillOpacity: .125, stroke: "white" },
        resolve: "global",
        clear: "dblclick",
      },
    };
  function xs(e) {
    return "legend" === e || !!e?.legend;
  }
  function $s(e) {
    return xs(e) && t.isObject(e);
  }
  function ws(e) {
    return !!e?.select;
  }
  function ks(e) {
    const t = [];
    for (const n of e || []) {
      if (ws(n)) continue;
      const { expr: e, bind: i, ...r } = n;
      if (i && e) {
        const n = { ...r, bind: i, init: e };
        t.push(n);
      } else {
        const n = { ...r, ...e ? { update: e } : {}, ...i ? { bind: i } : {} };
        t.push(n);
      }
    }
    return t;
  }
  function Ss(e) {
    return "concat" in e;
  }
  function Ds(e) {
    return "vconcat" in e;
  }
  function Fs(e) {
    return "hconcat" in e;
  }
  function zs(e) {
    let { step: t, offsetIsDiscrete: n } = e;
    return n ? t.for ?? "offset" : "position";
  }
  function Os(e) {
    return t.isObject(e) && void 0 !== e.step;
  }
  function Cs(e) {
    return e.view || e.width || e.height;
  }
  const Ns = D({ align: 1, bounds: 1, center: 1, columns: 1, spacing: 1 });
  function _s(e, t) {
    return e[t] ?? e["width" === t ? "continuousWidth" : "continuousHeight"];
  }
  function Ps(e, t) {
    const n = As(e, t);
    return Os(n) ? n.step : Ts;
  }
  function As(e, t) {
    return q(e[t] ?? e["width" === t ? "discreteWidth" : "discreteHeight"], {
      step: e.step,
    });
  }
  const Ts = 20,
    js = {
      background: "white",
      padding: 5,
      timeFormat: "%b %d, %Y",
      countTitle: "Count of Records",
      view: { continuousWidth: 200, continuousHeight: 200, step: Ts },
      mark: {
        color: "#4c78a8",
        invalid: "break-paths-show-path-domains",
        timeUnitBandSize: 1,
      },
      arc: {},
      area: {},
      bar: to,
      circle: {},
      geoshape: {},
      image: {},
      line: {},
      point: {},
      rect: no,
      rule: { color: "black" },
      square: {},
      text: { color: "black" },
      tick: { thickness: 1 },
      trail: {},
      boxplot: {
        size: 14,
        extent: 1.5,
        box: {},
        median: { color: "white" },
        outliers: {},
        rule: {},
        ticks: null,
      },
      errorbar: { center: "mean", rule: !0, ticks: !1 },
      errorband: { band: { opacity: .3 }, borders: !1 },
      scale: {
        pointPadding: .5,
        barBandPaddingInner: .1,
        rectBandPaddingInner: 0,
        bandWithNestedOffsetPaddingInner: .2,
        bandWithNestedOffsetPaddingOuter: .2,
        minBandSize: 2,
        minFontSize: 8,
        maxFontSize: 40,
        minOpacity: .3,
        maxOpacity: .8,
        minSize: 4,
        minStrokeWidth: 1,
        maxStrokeWidth: 4,
        quantileCount: 4,
        quantizeCount: 4,
        zero: !0,
      },
      projection: {},
      legend: {
        gradientHorizontalMaxLength: 200,
        gradientHorizontalMinLength: 100,
        gradientVerticalMaxLength: 200,
        gradientVerticalMinLength: 64,
        unselectedOpacity: .35,
      },
      header: { titlePadding: 10, labelPadding: 10 },
      headerColumn: {},
      headerRow: {},
      headerFacet: {},
      selection: bs,
      style: {},
      title: {},
      facet: { spacing: 20 },
      concat: { spacing: 20 },
      normalizedNumberFormat: ".0%",
    },
    Es = [
      "#4c78a8",
      "#f58518",
      "#e45756",
      "#72b7b2",
      "#54a24b",
      "#eeca3b",
      "#b279a2",
      "#ff9da6",
      "#9d755d",
      "#bab0ac",
    ],
    Ms = {
      text: 11,
      guideLabel: 10,
      guideTitle: 11,
      groupTitle: 13,
      groupSubtitle: 12,
    },
    Rs = {
      blue: Es[0],
      orange: Es[1],
      red: Es[2],
      teal: Es[3],
      green: Es[4],
      yellow: Es[5],
      purple: Es[6],
      pink: Es[7],
      brown: Es[8],
      gray0: "#000",
      gray1: "#111",
      gray2: "#222",
      gray3: "#333",
      gray4: "#444",
      gray5: "#555",
      gray6: "#666",
      gray7: "#777",
      gray8: "#888",
      gray9: "#999",
      gray10: "#aaa",
      gray11: "#bbb",
      gray12: "#ccc",
      gray13: "#ddd",
      gray14: "#eee",
      gray15: "#fff",
    };
  function Ls(e) {
    const t = D(e || {}), n = {};
    for (const i of t) {
      const t = e[i];
      n[i] = Sa(t) ? kn(t) : Sn(t);
    }
    return n;
  }
  const qs = [
    ...Kr,
    ...Na,
    ...hs,
    "background",
    "padding",
    "legend",
    "lineBreak",
    "scale",
    "style",
    "title",
    "view",
  ];
  function Us() {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const { color: n, font: i, fontSize: r, selection: o, ...a } = e,
      s = t.mergeConfig(
        {},
        l(js),
        i
          ? function (e) {
            return {
              text: { font: e },
              style: {
                "guide-label": { font: e },
                "guide-title": { font: e },
                "group-title": { font: e },
                "group-subtitle": { font: e },
              },
            };
          }(i)
          : {},
        n
          ? function () {
            let e = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {};
            return {
              signals: [{
                name: "color",
                value: t.isObject(e) ? { ...Rs, ...e } : Rs,
              }],
              mark: { color: { signal: "color.blue" } },
              rule: { color: { signal: "color.gray0" } },
              text: { color: { signal: "color.gray0" } },
              style: {
                "guide-label": { fill: { signal: "color.gray0" } },
                "guide-title": { fill: { signal: "color.gray0" } },
                "group-title": { fill: { signal: "color.gray0" } },
                "group-subtitle": { fill: { signal: "color.gray0" } },
                cell: { stroke: { signal: "color.gray8" } },
              },
              axis: {
                domainColor: { signal: "color.gray13" },
                gridColor: { signal: "color.gray8" },
                tickColor: { signal: "color.gray13" },
              },
              range: {
                category: [
                  { signal: "color.blue" },
                  { signal: "color.orange" },
                  { signal: "color.red" },
                  { signal: "color.teal" },
                  { signal: "color.green" },
                  { signal: "color.yellow" },
                  { signal: "color.purple" },
                  { signal: "color.pink" },
                  { signal: "color.brown" },
                  { signal: "color.grey8" },
                ],
              },
            };
          }(n)
          : {},
        r
          ? function (e) {
            return {
              signals: [{
                name: "fontSize",
                value: t.isObject(e) ? { ...Ms, ...e } : Ms,
              }],
              text: { fontSize: { signal: "fontSize.text" } },
              style: {
                "guide-label": { fontSize: { signal: "fontSize.guideLabel" } },
                "guide-title": { fontSize: { signal: "fontSize.guideTitle" } },
                "group-title": { fontSize: { signal: "fontSize.groupTitle" } },
                "group-subtitle": {
                  fontSize: { signal: "fontSize.groupSubtitle" },
                },
              },
            };
          }(r)
          : {},
        a || {},
      );
    o && t.writeConfig(s, "selection", o, !0);
    const c = f(s, qs);
    for (const e of ["background", "lineBreak", "padding"]) {
      s[e] && (c[e] = Sn(s[e]));
    }
    for (const e of Kr) s[e] && (c[e] = pn(s[e]));
    for (const e of Na) s[e] && (c[e] = Ls(s[e]));
    for (const e of hs) s[e] && (c[e] = pn(s[e]));
    if (s.legend && (c.legend = pn(s.legend)), s.scale) {
      const { invalid: e, ...t } = s.scale, n = pn(e, { level: 1 });
      c.scale = { ...pn(t), ...D(n).length > 0 ? { invalid: n } : {} };
    }
    return s.style && (c.style = function (e) {
      const t = D(e), n = {};
      for (const i of t) n[i] = Ls(e[i]);
      return n;
    }(s.style)),
      s.title && (c.title = pn(s.title)),
      s.view && (c.view = pn(s.view)),
      c;
  }
  const Ws = new Set(["view", ...Yr]),
    Is = [
      "color",
      "fontSize",
      "background",
      "padding",
      "facet",
      "concat",
      "numberFormat",
      "numberFormatType",
      "normalizedNumberFormat",
      "normalizedNumberFormatType",
      "timeFormat",
      "countTitle",
      "header",
      "axisQuantitative",
      "axisTemporal",
      "axisDiscrete",
      "axisPoint",
      "axisXBand",
      "axisXPoint",
      "axisXDiscrete",
      "axisXQuantitative",
      "axisXTemporal",
      "axisYBand",
      "axisYPoint",
      "axisYDiscrete",
      "axisYQuantitative",
      "axisYTemporal",
      "scale",
      "selection",
      "overlay",
    ],
    Bs = {
      view: [
        "continuousWidth",
        "continuousHeight",
        "discreteWidth",
        "discreteHeight",
        "step",
      ],
      area: ["line", "point"],
      bar: [
        "binSpacing",
        "continuousBandSize",
        "discreteBandSize",
        "minBandSize",
      ],
      rect: [
        "binSpacing",
        "continuousBandSize",
        "discreteBandSize",
        "minBandSize",
      ],
      line: ["point"],
      tick: ["bandSize", "thickness"],
    };
  function Vs(e) {
    e = l(e);
    for (const t of Is) delete e[t];
    if (e.axis) { for (const t in e.axis) Sa(e.axis[t]) && delete e.axis[t]; }
    if (e.legend) { for (const t of fs) delete e.legend[t]; }
    if (e.mark) {
      for (const t of Jr) delete e.mark[t];
      e.mark.tooltip && t.isObject(e.mark.tooltip) && delete e.mark.tooltip;
    }
    e.params &&
      (e.signals = (e.signals || []).concat(ks(e.params)), delete e.params);
    for (const t of Ws) {
      for (const n of Jr) delete e[t][n];
      const n = Bs[t];
      if (n) { for (const i of n) delete e[t][i]; }
      Hs(e, t);
    }
    for (const t of D(cs)) delete e[t];
    !function (e) {
      const { titleMarkConfig: t, subtitleMarkConfig: n, subtitle: i } = gn(
        e.title,
      );
      S(t) || (e.style["group-title"] = { ...e.style["group-title"], ...t });
      S(n) ||
        (e.style["group-subtitle"] = { ...e.style["group-subtitle"], ...n });
      S(i) ? delete e.title : e.title = i;
    }(e);
    for (const n in e) t.isObject(e[n]) && S(e[n]) && delete e[n];
    return S(e) ? void 0 : e;
  }
  function Hs(e, t, n, i) {
    "view" === t && (n = "cell");
    const r = { ...e[t], ...e.style[n ?? t] };
    S(r) || (e.style[n ?? t] = r), delete e[t];
  }
  function Gs(e) {
    return "layer" in e;
  }
  class Ys {
    map(e, t) {
      return Ao(e) ? this.mapFacet(e, t) : (function (e) {
          return "repeat" in e;
        })(e)
        ? this.mapRepeat(e, t)
        : Fs(e)
        ? this.mapHConcat(e, t)
        : Ds(e)
        ? this.mapVConcat(e, t)
        : Ss(e)
        ? this.mapConcat(e, t)
        : this.mapLayerOrUnit(e, t);
    }
    mapLayerOrUnit(e, t) {
      if (Gs(e)) return this.mapLayer(e, t);
      if (_a(e)) return this.mapUnit(e, t);
      throw new Error(Ln(e));
    }
    mapLayer(e, t) {
      return { ...e, layer: e.layer.map((e) => this.mapLayerOrUnit(e, t)) };
    }
    mapHConcat(e, t) {
      return { ...e, hconcat: e.hconcat.map((e) => this.map(e, t)) };
    }
    mapVConcat(e, t) {
      return { ...e, vconcat: e.vconcat.map((e) => this.map(e, t)) };
    }
    mapConcat(e, t) {
      const { concat: n, ...i } = e;
      return { ...i, concat: n.map((e) => this.map(e, t)) };
    }
    mapFacet(e, t) {
      return { ...e, spec: this.map(e.spec, t) };
    }
    mapRepeat(e, t) {
      return { ...e, spec: this.map(e.spec, t) };
    }
  }
  const Xs = { zero: 1, center: 1, normalize: 1 };
  const Qs = new Set([Pr, Tr, Ar, Lr, Mr, Ir, Br, Er, qr, Ur]),
    Js = new Set([Tr, Ar, Pr]);
  function Ks(e) {
    return Io(e) && "quantitative" === Bo(e) && !e.bin;
  }
  function Zs(e, t, n) {
    let { orient: i, type: r } = n;
    const o = "x" === t ? "y" : "radius",
      a = "x" === t && ["bar", "area"].includes(r),
      s = e[t],
      l = e[o];
    if (Io(s) && Io(l)) {
      if (Ks(s) && Ks(l)) {
        if (s.stack) return t;
        if (l.stack) return o;
        const e = Io(s) && !!s.aggregate;
        if (e !== (Io(l) && !!l.aggregate)) return e ? t : o;
        if (a) {
          if ("vertical" === i) return o;
          if ("horizontal" === i) return t;
        }
      } else {
        if (Ks(s)) return t;
        if (Ks(l)) return o;
      }
    } else {
      if (Ks(s)) {
        if (a && "vertical" === i) return;
        return t;
      }
      if (Ks(l)) {
        if (a && "horizontal" === i) return;
        return o;
      }
    }
  }
  function el(e, n) {
    const i = Xr(e) ? e : { type: e }, r = i.type;
    if (!Qs.has(r)) return null;
    const o = Zs(n, "x", i) || Zs(n, "theta", i);
    if (!o) return null;
    const a = n[o],
      s = Io(a) ? ia(a, {}) : void 0,
      l = function (e) {
        switch (e) {
          case "x":
            return "y";
          case "y":
            return "x";
          case "theta":
            return "radius";
          case "radius":
            return "theta";
        }
      }(o),
      c = [],
      u = new Set();
    if (n[l]) {
      const e = n[l], t = Io(e) ? ia(e, {}) : void 0;
      t && t !== s && (c.push(l), u.add(t));
    }
    const f = "x" === l ? "xOffset" : "yOffset",
      d = n[f],
      m = Io(d) ? ia(d, {}) : void 0;
    m && m !== s && (c.push(f), u.add(m));
    const p = St.reduce((e, i) => {
      if ("tooltip" !== i && Aa(n, i)) {
        const r = n[i];
        for (const n of t.array(r)) {
          const t = da(n);
          if (t.aggregate) continue;
          const r = ia(t, {});
          r && u.has(r) || e.push({ channel: i, fieldDef: t });
        }
      }
      return e;
    }, []);
    let g;
    return void 0 !== a.stack
      ? g = t.isBoolean(a.stack) ? a.stack ? "zero" : null : a.stack
      : Js.has(r) && (g = "zero"),
      g && g in Xs
        ? Ea(n) && 0 === p.length
          ? null
          : (a?.scale?.type && a?.scale?.type !== or.LINEAR && a?.stack &&
            yi(function (e) {
              return `Stack is applied to a non-linear scale (${e}).`;
            }(a.scale.type)),
            Xo(n[it(o)])
              ? (void 0 !== a.stack &&
                yi(`Cannot stack "${h = o}" if there is already "${h}2".`),
                null)
              : (Io(a) && a.aggregate && !on.has(a.aggregate) &&
                yi(
                  `Stacking is applied even though the aggregate function is non-summative ("${a.aggregate}").`,
                ),
                {
                  groupbyChannels: c,
                  groupbyFields: u,
                  fieldChannel: o,
                  impute: null !== a.impute && Hr(r),
                  stackBy: p,
                  offset: g,
                }))
        : null;
    var h;
  }
  function tl(e, t, n) {
    const i = pn(e), r = _n("orient", i, n);
    if (
      i.orient = function (e, t, n) {
        switch (e) {
          case Mr:
          case Ir:
          case Br:
          case qr:
          case Rr:
          case jr:
            return;
        }
        const { x: i, y: r, x2: o, y2: a } = t;
        switch (e) {
          case Tr:
            if (
              Io(i) && (cn(i.bin) || Io(r) && r.aggregate && !i.aggregate)
            ) return "vertical";
            if (
              Io(r) && (cn(r.bin) || Io(i) && i.aggregate && !r.aggregate)
            ) return "horizontal";
            if (a || o) {
              if (n) return n;
              if (!o) {
                return (Io(i) && i.type === er && !ln(i.bin) || Yo(i)) &&
                    Io(r) && cn(r.bin)
                  ? "horizontal"
                  : "vertical";
              }
              if (!a) {
                return (Io(r) && r.type === er && !ln(r.bin) || Yo(r)) &&
                    Io(i) && cn(i.bin)
                  ? "vertical"
                  : "horizontal";
              }
            }
          case Lr:
            if (
              o && (!Io(i) || !cn(i.bin)) && a && (!Io(r) || !cn(r.bin))
            ) return;
          case Ar:
            if (a) return Io(r) && cn(r.bin) ? "horizontal" : "vertical";
            if (o) return Io(i) && cn(i.bin) ? "vertical" : "horizontal";
            if (e === Lr) {
              if (i && !r) return "vertical";
              if (r && !i) return "horizontal";
            }
          case Er:
          case Ur: {
            const t = Go(i), o = Go(r);
            if (n) return n;
            if (t && !o) return "tick" !== e ? "horizontal" : "vertical";
            if (!t && o) return "tick" !== e ? "vertical" : "horizontal";
            if (t && o) return "vertical";
            {
              const e = Qo(i) && i.type === nr, t = Qo(r) && r.type === nr;
              if (e && !t) return "vertical";
              if (!e && t) return "horizontal";
            }
            return;
          }
        }
        return "vertical";
      }(i.type, t, r),
        void 0 !== r && r !== i.orient &&
        yi(`Specified orient "${i.orient}" overridden with "${r}".`),
        "bar" === i.type && i.orient
    ) {
      const e = _n("cornerRadiusEnd", i, n);
      if (void 0 !== e) {
        const n =
          "horizontal" === i.orient && t.x2 || "vertical" === i.orient && t.y2
            ? ["cornerRadius"]
            : eo[i.orient];
        for (const t of n) i[t] = e;
        void 0 !== i.cornerRadiusEnd && delete i.cornerRadiusEnd;
      }
    }
    const o = _n("opacity", i, n), a = _n("fillOpacity", i, n);
    void 0 === o && void 0 === a && (i.opacity = function (e, t) {
      if (p([Mr, Ur, Ir, Br], e) && !Ea(t)) return .7;
      return;
    }(i.type, t));
    return void 0 === _n("cursor", i, n) && (i.cursor = function (e, t, n) {
      if (t.href || e.href || _n("href", e, n)) return "pointer";
      return e.cursor;
    }(i, t, n)),
      i;
  }
  function nl(e) {
    const { point: t, line: n, ...i } = e;
    return D(i).length > 1 ? i : i.type;
  }
  function il(e) {
    for (const t of ["line", "area", "rule", "trail"]) {
      e[t] && (e = { ...e, [t]: f(e[t], ["point", "line"]) });
    }
    return e;
  }
  function rl(e) {
    let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      i = arguments.length > 2 ? arguments[2] : void 0;
    return "transparent" === e.point
      ? { opacity: 0 }
      : e.point
      ? t.isObject(e.point) ? e.point : {}
      : void 0 !== e.point
      ? null
      : n.point || i.shape
      ? t.isObject(n.point) ? n.point : {}
      : void 0;
  }
  function ol(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e.line
      ? !0 === e.line ? {} : e.line
      : void 0 !== e.line
      ? null
      : t.line
      ? !0 === t.line ? {} : t.line
      : void 0;
  }
  class al {
    name = "path-overlay";
    hasMatchingType(e, t) {
      if (_a(e)) {
        const { mark: n, encoding: i } = e, r = Xr(n) ? n : { type: n };
        switch (r.type) {
          case "line":
          case "rule":
          case "trail":
            return !!rl(r, t[r.type], i);
          case "area":
            return !!rl(r, t[r.type], i) || !!ol(r, t[r.type]);
        }
      }
      return !1;
    }
    run(e, t, n) {
      const { config: i } = t,
        { params: r, projection: o, mark: a, name: s, encoding: l, ...c } = e,
        d = La(l, i),
        m = Xr(a) ? a : { type: a },
        p = rl(m, i[m.type], d),
        g = "area" === m.type && ol(m, i[m.type]),
        h = [{
          name: s,
          ...r ? { params: r } : {},
          mark: nl({
            ..."area" === m.type && void 0 === m.opacity &&
                void 0 === m.fillOpacity
              ? { opacity: .7 }
              : {},
            ...m,
          }),
          encoding: f(d, ["shape"]),
        }],
        y = el(tl(m, d, i), d);
      let v = d;
      if (y) {
        const { fieldChannel: e, offset: t } = y;
        v = { ...d, [e]: { ...d[e], ...t ? { stack: t } : {} } };
      }
      return v = f(v, ["y2", "x2"]),
        g &&
        h.push({
          ...o ? { projection: o } : {},
          mark: {
            type: "line",
            ...u(m, ["clip", "interpolate", "tension", "tooltip"]),
            ...g,
          },
          encoding: v,
        }),
        p &&
        h.push({
          ...o ? { projection: o } : {},
          mark: {
            type: "point",
            opacity: 1,
            filled: !0,
            ...u(m, ["clip", "tooltip"]),
            ...p,
          },
          encoding: v,
        }),
        n({ ...c, layer: h }, { ...t, config: il(i) });
    }
  }
  function sl(e, t) {
    return t ? _o(e) ? ml(e, t) : ul(e, t) : e;
  }
  function ll(e, t) {
    return t ? ml(e, t) : e;
  }
  function cl(e, n, i) {
    const r = n[e];
    return (o = r) && !t.isString(o) && "repeat" in o
      ? r.repeat in i ? { ...n, [e]: i[r.repeat] } : void yi(function (e) {
        return `Unknown repeated value "${e}".`;
      }(r.repeat))
      : n;
    var o;
  }
  function ul(e, t) {
    if (void 0 !== (e = cl("field", e, t))) {
      if (null === e) return null;
      if (jo(e) && Co(e.sort)) {
        const n = cl("field", e.sort, t);
        e = { ...e, ...n ? { sort: n } : {} };
      }
      return e;
    }
  }
  function fl(e, t) {
    if (Io(e)) return ul(e, t);
    {
      const n = cl("datum", e, t);
      return n === e || n.type || (n.type = "nominal"), n;
    }
  }
  function dl(e, t) {
    if (!Xo(e)) {
      if (Wo(e)) {
        const n = fl(e.condition, t);
        if (n) return { ...e, condition: n };
        {
          const { condition: t, ...n } = e;
          return n;
        }
      }
      return e;
    }
    {
      const n = fl(e, t);
      if (n) return n;
      if (qo(e)) return { condition: e.condition };
    }
  }
  function ml(e, n) {
    const i = {};
    for (const r in e) {
      if (t.hasOwnProperty(e, r)) {
        const o = e[r];
        if (t.isArray(o)) i[r] = o.map((e) => dl(e, n)).filter((e) => e);
        else {
          const e = dl(o, n);
          void 0 !== e && (i[r] = e);
        }
      }
    }
    return i;
  }
  class pl {
    name = "RuleForRangedLine";
    hasMatchingType(e) {
      if (_a(e)) {
        const { encoding: t, mark: n } = e;
        if ("line" === n || Xr(n) && "line" === n.type) {
          for (const e of Ze) {
            const n = t[tt(e)];
            if (t[e] && (Io(n) && !cn(n.bin) || Vo(n))) return !0;
          }
        }
      }
      return !1;
    }
    run(e, n, i) {
      const { encoding: r, mark: o } = e;
      var a, s;
      return yi(
        (a = !!r.x2,
          s = !!r.y2,
          `Line mark is for continuous lines and thus cannot be used with ${
            a && s ? "x2 and y2" : a ? "x2" : "y2"
          }. We will use the rule mark (line segments) instead.`),
      ),
        i({ ...e, mark: t.isObject(o) ? { ...o, type: "rule" } : "rule" }, n);
    }
  }
  function gl(e) {
    let { parentEncoding: n, encoding: i = {}, layer: r } = e, o = {};
    if (n) {
      const e = new Set([...D(n), ...D(i)]);
      for (const a of e) {
        const e = i[a], s = n[a];
        if (Xo(e)) {
          const t = { ...s, ...e };
          o[a] = t;
        } else {Wo(e)
            ? o[a] = { ...e, condition: { ...s, ...e.condition } }
            : e || null === e
            ? o[a] = e
            : (r || Jo(s) || yn(s) || Xo(s) || t.isArray(s)) && (o[a] = s);}
      }
    } else o = i;
    return !o || S(o) ? void 0 : o;
  }
  function hl(e) {
    const { parentProjection: t, projection: n } = e;
    return t && n && yi(function (e) {
      const { parentProjection: t, projection: n } = e;
      return `Layer's shared projection ${
        X(t)
      } is overridden by a child projection ${X(n)}.`;
    }({ parentProjection: t, projection: n })),
      n ?? t;
  }
  function yl(e) {
    return "filter" in e;
  }
  function vl(e) {
    return "lookup" in e;
  }
  function bl(e) {
    return "pivot" in e;
  }
  function xl(e) {
    return "density" in e;
  }
  function $l(e) {
    return "quantile" in e;
  }
  function wl(e) {
    return "regression" in e;
  }
  function kl(e) {
    return "loess" in e;
  }
  function Sl(e) {
    return "sample" in e;
  }
  function Dl(e) {
    return "window" in e;
  }
  function Fl(e) {
    return "joinaggregate" in e;
  }
  function zl(e) {
    return "flatten" in e;
  }
  function Ol(e) {
    return "calculate" in e;
  }
  function Cl(e) {
    return "bin" in e;
  }
  function Nl(e) {
    return "impute" in e;
  }
  function _l(e) {
    return "timeUnit" in e;
  }
  function Pl(e) {
    return "aggregate" in e;
  }
  function Al(e) {
    return "stack" in e;
  }
  function Tl(e) {
    return "fold" in e;
  }
  function jl(e) {
    return "extent" in e && !("density" in e) && !("regression" in e);
  }
  function El(e, t) {
    const { transform: n, ...i } = e;
    if (n) {
      return {
        ...i,
        transform: n.map((e) => {
          if (yl(e)) return { filter: Ll(e, t) };
          if (Cl(e) && un(e.bin)) return { ...e, bin: Rl(e.bin) };
          if (vl(e)) {
            const { selection: t, ...n } = e.from;
            return t ? { ...e, from: { param: t, ...n } } : e;
          }
          return e;
        }),
      };
    }
    return e;
  }
  function Ml(e, n) {
    const i = l(e);
    if (
      Io(i) && un(i.bin) && (i.bin = Rl(i.bin)),
        Ko(i) && i.scale?.domain?.selection
    ) {
      const { selection: e, ...t } = i.scale.domain;
      i.scale.domain = { ...t, ...e ? { param: e } : {} };
    }
    if (qo(i)) {
      if (t.isArray(i.condition)) {
        i.condition = i.condition.map((e) => {
          const { selection: t, param: i, test: r, ...o } = e;
          return i ? e : { ...o, test: Ll(e, n) };
        });
      } else {
        const { selection: e, param: t, test: r, ...o } = Ml(i.condition, n);
        i.condition = t ? i.condition : { ...o, test: Ll(i.condition, n) };
      }
    }
    return i;
  }
  function Rl(e) {
    const t = e.extent;
    if (t?.selection) {
      const { selection: n, ...i } = t;
      return { ...e, extent: { ...i, param: n } };
    }
    return e;
  }
  function Ll(e, t) {
    const n = (e) =>
      s(e, (e) => {
        const n = { param: e, empty: t.emptySelections[e] ?? !0 };
        return t.selectionPredicates[e] ??= [],
          t.selectionPredicates[e].push(n),
          n;
      });
    return e.selection
      ? n(e.selection)
      : s(e.test || e.filter, (e) => e.selection ? n(e.selection) : e);
  }
  class ql extends Ys {
    map(e, t) {
      const n = t.selections ?? [];
      if (e.params && !_a(e)) {
        const t = [];
        for (const i of e.params) ws(i) ? n.push(i) : t.push(i);
        e.params = t;
      }
      return t.selections = n, super.map(e, t);
    }
    mapUnit(e, n) {
      const i = n.selections;
      if (!i || !i.length) return e;
      const r = (n.path ?? []).concat(e.name), o = [];
      for (const n of i) {
        if (n.views && n.views.length) {
          for (const i of n.views) {
            (t.isString(i) && (i === e.name || r.includes(i)) ||
              t.isArray(i) &&
                i.map((e) => r.indexOf(e)).every((e, t, n) =>
                  -1 !== e && (0 === t || e > n[t - 1])
                )) && o.push(n);
          }
        } else o.push(n);
      }
      return o.length && (e.params = o), e;
    }
  }
  for (
    const e of ["mapFacet", "mapRepeat", "mapHConcat", "mapVConcat", "mapLayer"]
  ) {
    const t = ql.prototype[e];
    ql.prototype[e] = function (e, n) {
      return t.call(this, e, Ul(e, n));
    };
  }
  function Ul(e, t) {
    return e.name ? { ...t, path: (t.path ?? []).concat(e.name) } : t;
  }
  function Wl(e, t) {
    void 0 === t && (t = Us(e.config));
    const n = function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : {};
        const n = { config: t };
        return Vl.map(Il.map(Bl.map(e, n), n), n);
      }(e, t),
      { width: i, height: r } = e,
      o = function (e, t, n) {
        let { width: i, height: r } = t;
        const o = _a(e) || Gs(e), a = {};
        o
          ? "container" == i && "container" == r
            ? (a.type = "fit", a.contains = "padding")
            : "container" == i
            ? (a.type = "fit-x", a.contains = "padding")
            : "container" == r && (a.type = "fit-y", a.contains = "padding")
          : ("container" == i && (yi(Un("width")), i = void 0),
            "container" == r && (yi(Un("height")), r = void 0));
        const s = {
          type: "pad",
          ...a,
          ...n ? Hl(n.autosize) : {},
          ...Hl(e.autosize),
        };
        "fit" !== s.type || o || (yi(qn), s.type = "pad");
        "container" == i && "fit" != s.type && "fit-x" != s.type &&
          yi(Wn("width"));
        "container" == r && "fit" != s.type && "fit-y" != s.type &&
          yi(Wn("height"));
        if (Y(s, { type: "pad" })) return;
        return s;
      }(n, { width: i, height: r, autosize: e.autosize }, t);
    return { ...n, ...o ? { autosize: o } : {} };
  }
  const Il = new class extends Ys {
      nonFacetUnitNormalizers = [Qa, ts, ss, new al(), new pl()];
      map(e, t) {
        if (_a(e)) {
          const n = Aa(e.encoding, Q),
            i = Aa(e.encoding, J),
            r = Aa(e.encoding, K);
          if (n || i || r) return this.mapFacetedUnit(e, t);
        }
        return super.map(e, t);
      }
      mapUnit(e, t) {
        const { parentEncoding: n, parentProjection: i } = t,
          r = ll(e.encoding, t.repeater),
          o = {
            ...e,
            ...e.name
              ? { name: [t.repeaterPrefix, e.name].filter((e) => e).join("_") }
              : {},
            ...r ? { encoding: r } : {},
          };
        if (n || i) return this.mapUnitWithParentEncodingOrProjection(o, t);
        const a = this.mapLayerOrUnit.bind(this);
        for (const e of this.nonFacetUnitNormalizers) {
          if (e.hasMatchingType(o, t.config)) return e.run(o, t, a);
        }
        return o;
      }
      mapRepeat(e, n) {
        return (function (e) {
            return !t.isArray(e.repeat) && e.repeat.layer;
          })(e)
          ? this.mapLayerRepeat(e, n)
          : this.mapNonLayerRepeat(e, n);
      }
      mapLayerRepeat(e, t) {
        const { repeat: n, spec: i, ...r } = e,
          { row: o, column: a, layer: s } = n,
          { repeater: l = {}, repeaterPrefix: c = "" } = t;
        return o || a
          ? this.mapRepeat({
            ...e,
            repeat: { ...o ? { row: o } : {}, ...a ? { column: a } : {} },
            spec: { repeat: { layer: s }, spec: i },
          }, t)
          : {
            ...r,
            layer: s.map((e) => {
              const n = { ...l, layer: e },
                r = `${(i.name ? `${i.name}_` : "") + c}child__layer_${C(e)}`,
                o = this.mapLayerOrUnit(i, {
                  ...t,
                  repeater: n,
                  repeaterPrefix: r,
                });
              return o.name = r, o;
            }),
          };
      }
      mapNonLayerRepeat(e, n) {
        const { repeat: i, spec: r, data: o, ...a } = e;
        !t.isArray(i) && e.columns && (e = f(e, ["columns"]), yi(Xn("repeat")));
        const s = [],
          { repeater: l = {}, repeaterPrefix: c = "" } = n,
          u = !t.isArray(i) && i.row || [l ? l.row : null],
          d = !t.isArray(i) && i.column || [l ? l.column : null],
          m = t.isArray(i) && i || [l ? l.repeat : null];
        for (const e of m) {
          for (const o of u) {
            for (const a of d) {
              const u = { repeat: e, row: o, column: a, layer: l.layer },
                d = (r.name ? `${r.name}_` : "") + c + "child__" +
                  (t.isArray(i) ? `${C(e)}` : (i.row ? `row_${C(o)}` : "") +
                    (i.column ? `column_${C(a)}` : "")),
                m = this.map(r, { ...n, repeater: u, repeaterPrefix: d });
              m.name = d, s.push(f(m, ["data"]));
            }
          }
        }
        const p = t.isArray(i) ? e.columns : i.column ? i.column.length : 1;
        return { data: r.data ?? o, align: "all", ...a, columns: p, concat: s };
      }
      mapFacet(e, t) {
        const { facet: n } = e;
        return _o(n) && e.columns && (e = f(e, ["columns"]), yi(Xn("facet"))),
          super.mapFacet(e, t);
      }
      mapUnitWithParentEncodingOrProjection(e, t) {
        const { encoding: n, projection: i } = e,
          { parentEncoding: r, parentProjection: o, config: a } = t,
          s = hl({ parentProjection: o, projection: i }),
          l = gl({ parentEncoding: r, encoding: ll(n, t.repeater) });
        return this.mapUnit({
          ...e,
          ...s ? { projection: s } : {},
          ...l ? { encoding: l } : {},
        }, { config: a });
      }
      mapFacetedUnit(e, t) {
        const { row: n, column: i, facet: r, ...o } = e.encoding,
          {
            mark: a,
            width: s,
            projection: l,
            height: c,
            view: u,
            params: f,
            encoding: d,
            ...m
          } = e,
          { facetMapping: p, layout: g } = this.getFacetMappingAndLayout({
            row: n,
            column: i,
            facet: r,
          }, t),
          h = ll(o, t.repeater);
        return this.mapFacet({
          ...m,
          ...g,
          facet: p,
          spec: {
            ...s ? { width: s } : {},
            ...c ? { height: c } : {},
            ...u ? { view: u } : {},
            ...l ? { projection: l } : {},
            mark: a,
            encoding: h,
            ...f ? { params: f } : {},
          },
        }, t);
      }
      getFacetMappingAndLayout(e, t) {
        const { row: n, column: i, facet: r } = e;
        if (n || i) {
          r &&
            yi(
              `Facet encoding dropped as ${
                (o = [...n ? [Q] : [], ...i ? [J] : []]).join(" and ")
              } ${o.length > 1 ? "are" : "is"} also specified.`,
            );
          const t = {}, a = {};
          for (const n of [Q, J]) {
            const i = e[n];
            if (i) {
              const { align: e, center: r, spacing: o, columns: s, ...l } = i;
              t[n] = l;
              for (const e of ["align", "center", "spacing"]) {
                void 0 !== i[e] && (a[e] ??= {}, a[e][n] = i[e]);
              }
            }
          }
          return { facetMapping: t, layout: a };
        }
        {
          const { align: e, center: n, spacing: i, columns: o, ...a } = r;
          return {
            facetMapping: sl(a, t.repeater),
            layout: {
              ...e ? { align: e } : {},
              ...n ? { center: n } : {},
              ...i ? { spacing: i } : {},
              ...o ? { columns: o } : {},
            },
          };
        }
        var o;
      }
      mapLayer(e, t) {
        let { parentEncoding: n, parentProjection: i, ...r } = t;
        const { encoding: o, projection: a, ...s } = e,
          l = {
            ...r,
            parentEncoding: gl({ parentEncoding: n, encoding: o, layer: !0 }),
            parentProjection: hl({ parentProjection: i, projection: a }),
          };
        return super.mapLayer({
          ...s,
          ...e.name
            ? { name: [l.repeaterPrefix, e.name].filter((e) => e).join("_") }
            : {},
        }, l);
      }
    }(),
    Bl = new class extends Ys {
      map(e, t) {
        return t.emptySelections ??= {},
          t.selectionPredicates ??= {},
          e = El(e, t),
          super.map(e, t);
      }
      mapLayerOrUnit(e, t) {
        if ((e = El(e, t)).encoding) {
          const n = {};
          for (const [i, r] of z(e.encoding)) n[i] = Ml(r, t);
          e = { ...e, encoding: n };
        }
        return super.mapLayerOrUnit(e, t);
      }
      mapUnit(e, t) {
        const { selection: n, ...i } = e;
        return n
          ? {
            ...i,
            params: z(n).map((e) => {
              let [n, i] = e;
              const { init: r, bind: o, empty: a, ...s } = i;
              "single" === s.type
                ? (s.type = "point", s.toggle = !1)
                : "multi" === s.type && (s.type = "point"),
                t.emptySelections[n] = "none" !== a;
              for (const e of F(t.selectionPredicates[n] ?? {})) {
                e.empty = "none" !== a;
              }
              return { name: n, value: r, select: s, bind: o };
            }),
          }
          : e;
      }
    }(),
    Vl = new ql();
  function Hl(e) {
    return t.isString(e) ? { type: e } : e ?? {};
  }
  const Gl = ["background", "padding"];
  function Yl(e, t) {
    const n = {};
    for (const t of Gl) e && void 0 !== e[t] && (n[t] = Sn(e[t]));
    return t && (n.params = e.params), n;
  }
  class Xl {
    constructor() {
      let e = arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : {},
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      this.explicit = e, this.implicit = t;
    }
    clone() {
      return new Xl(l(this.explicit), l(this.implicit));
    }
    combine() {
      return { ...this.explicit, ...this.implicit };
    }
    get(e) {
      return q(this.explicit[e], this.implicit[e]);
    }
    getWithExplicit(e) {
      return void 0 !== this.explicit[e]
        ? { explicit: !0, value: this.explicit[e] }
        : void 0 !== this.implicit[e]
        ? { explicit: !1, value: this.implicit[e] }
        : { explicit: !1, value: void 0 };
    }
    setWithExplicit(e, t) {
      let { value: n, explicit: i } = t;
      void 0 !== n && this.set(e, n, i);
    }
    set(e, t, n) {
      return delete this[n ? "implicit" : "explicit"][e],
        this[n ? "explicit" : "implicit"][e] = t,
        this;
    }
    copyKeyFromSplit(e, t) {
      let { explicit: n, implicit: i } = t;
      void 0 !== n[e]
        ? this.set(e, n[e], !0)
        : void 0 !== i[e] && this.set(e, i[e], !1);
    }
    copyKeyFromObject(e, t) {
      void 0 !== t[e] && this.set(e, t[e], !0);
    }
    copyAll(e) {
      for (const t of D(e.combine())) {
        const n = e.getWithExplicit(t);
        this.setWithExplicit(t, n);
      }
    }
  }
  function Ql(e) {
    return { explicit: !0, value: e };
  }
  function Jl(e) {
    return { explicit: !1, value: e };
  }
  function Kl(e) {
    return (t, n, i, r) => {
      const o = e(t.value, n.value);
      return o > 0 ? t : o < 0 ? n : Zl(t, n, i, r);
    };
  }
  function Zl(e, t, n, i) {
    return e.explicit && t.explicit && yi(function (e, t, n, i) {
      return `Conflicting ${t.toString()} property "${e.toString()}" (${
        X(n)
      } and ${X(i)}). Using ${X(n)}.`;
    }(n, i, e.value, t.value)),
      e;
  }
  function ec(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Zl;
    return void 0 === e || void 0 === e.value
      ? t
      : e.explicit && !t.explicit
      ? e
      : t.explicit && !e.explicit
      ? t
      : Y(e.value, t.value)
      ? e
      : r(e, t, n, i);
  }
  class tc extends Xl {
    constructor() {
      let e = arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : {},
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      super(e, t), this.explicit = e, this.implicit = t, this.parseNothing = n;
    }
    clone() {
      const e = super.clone();
      return e.parseNothing = this.parseNothing, e;
    }
  }
  function nc(e) {
    return "url" in e;
  }
  function ic(e) {
    return "values" in e;
  }
  function rc(e) {
    return "name" in e && !nc(e) && !ic(e) && !oc(e);
  }
  function oc(e) {
    return e && (ac(e) || sc(e) || lc(e));
  }
  function ac(e) {
    return "sequence" in e;
  }
  function sc(e) {
    return "sphere" in e;
  }
  function lc(e) {
    return "graticule" in e;
  }
  let cc = function (e) {
    return e[e.Raw = 0] = "Raw",
      e[e.Main = 1] = "Main",
      e[e.Row = 2] = "Row",
      e[e.Column = 3] = "Column",
      e[e.Lookup = 4] = "Lookup",
      e[e.PreFilterInvalid = 5] = "PreFilterInvalid",
      e[e.PostFilterInvalid = 6] = "PostFilterInvalid",
      e;
  }({});
  function uc(e) {
    let { invalid: t, isPath: n } = e;
    switch (io(t, { isPath: n })) {
      case "filter":
        return {
          marks: "exclude-invalid-values",
          scales: "exclude-invalid-values",
        };
      case "break-paths-show-domains":
        return {
          marks: n ? "include-invalid-values" : "exclude-invalid-values",
          scales: "include-invalid-values",
        };
      case "break-paths-filter-domains":
        return {
          marks: n ? "include-invalid-values" : "exclude-invalid-values",
          scales: "exclude-invalid-values",
        };
      case "show":
        return {
          marks: "include-invalid-values",
          scales: "include-invalid-values",
        };
    }
  }
  function fc(e) {
    const { signals: t, hasLegend: n, index: i, ...r } = e;
    return r.field = E(r.field), r;
  }
  function dc(e) {
    let n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
      i = arguments.length > 2 && void 0 !== arguments[2]
        ? arguments[2]
        : t.identity;
    if (t.isArray(e)) {
      const t = e.map((e) => dc(e, n, i));
      return n ? `[${t.join(", ")}]` : t;
    }
    return vi(e)
      ? i(
        n ? Si(e) : function (e) {
          const t = ki(e, !0);
          return e.utc ? +new Date(Date.UTC(...t)) : +new Date(...t);
        }(e),
      )
      : n
      ? i(X(e))
      : e;
  }
  function mc(e, n) {
    for (const i of F(e.component.selection ?? {})) {
      const r = i.name;
      let o = `${r}${Au}, ${
        "global" === i.resolve ? "true" : `{unit: ${Mu(e)}}`
      }`;
      for (const t of Eu) {
        t.defined(i) &&
          (t.signals && (n = t.signals(e, i, n)),
            t.modifyExpr && (o = t.modifyExpr(e, i, o)));
      }
      n.push({
        name: r + Tu,
        on: [{
          events: { signal: i.name + Au },
          update: `modify(${t.stringValue(i.name + Pu)}, ${o})`,
        }],
      });
    }
    return hc(n);
  }
  function pc(e, n) {
    if (e.component.selection && D(e.component.selection).length) {
      const i = t.stringValue(e.getName("cell"));
      n.unshift({
        name: "facet",
        value: {},
        on: [{
          events: t.parseSelector("pointermove", "scope"),
          update: `isTuple(facet) ? facet : group(${i}).datum`,
        }],
      });
    }
    return hc(n);
  }
  function gc(e, t) {
    for (const n of F(e.component.selection ?? {})) {
      for (const i of Eu) i.defined(n) && i.marks && (t = i.marks(e, n, t));
    }
    return t;
  }
  function hc(e) {
    return e.map((e) => (e.on && !e.on.length && delete e.on, e));
  }
  class yc {
    _children = [];
    _parent = null;
    constructor(e, t) {
      this.debugName = t, e && (this.parent = e);
    }
    clone() {
      throw new Error("Cannot clone node");
    }
    get parent() {
      return this._parent;
    }
    set parent(e) {
      this._parent = e, e && e.addChild(this);
    }
    get children() {
      return this._children;
    }
    numChildren() {
      return this._children.length;
    }
    addChild(e, t) {
      this._children.includes(e)
        ? yi("Attempt to add the same child twice.")
        : void 0 !== t
        ? this._children.splice(t, 0, e)
        : this._children.push(e);
    }
    removeChild(e) {
      const t = this._children.indexOf(e);
      return this._children.splice(t, 1), t;
    }
    remove() {
      let e = this._parent.removeChild(this);
      for (const t of this._children) {
        t._parent = this._parent, this._parent.addChild(t, e++);
      }
    }
    insertAsParentOf(e) {
      const t = e.parent;
      t.removeChild(this), this.parent = t, e.parent = this;
    }
    swapWithParent() {
      const e = this._parent, t = e.parent;
      for (const t of this._children) t.parent = e;
      this._children = [], e.removeChild(this);
      const n = e.parent.removeChild(e);
      this._parent = t, t.addChild(this, n), e.parent = this;
    }
  }
  class vc extends yc {
    clone() {
      const e = new this.constructor();
      return e.debugName = `clone_${this.debugName}`,
        e._source = this._source,
        e._name = `clone_${this._name}`,
        e.type = this.type,
        e.refCounts = this.refCounts,
        e.refCounts[e._name] = 0,
        e;
    }
    constructor(e, t, n, i) {
      super(e, t),
        this.type = n,
        this.refCounts = i,
        this._source = this._name = t,
        this.refCounts && !(this._name in this.refCounts) &&
        (this.refCounts[this._name] = 0);
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {
      return new Set();
    }
    hash() {
      return void 0 === this._hash && (this._hash = `Output ${W()}`),
        this._hash;
    }
    getSource() {
      return this.refCounts[this._name]++, this._source;
    }
    isRequired() {
      return !!this.refCounts[this._name];
    }
    setSource(e) {
      this._source = e;
    }
  }
  function bc(e) {
    return void 0 !== e.as;
  }
  function xc(e) {
    return `${e}_end`;
  }
  class $c extends yc {
    clone() {
      return new $c(null, l(this.timeUnits));
    }
    constructor(e, t) {
      super(e), this.timeUnits = t;
    }
    static makeFromEncoding(e, t) {
      const n = t.reduceFieldDef((e, n, i) => {
        const { field: r, timeUnit: o } = n;
        if (o) {
          let a;
          if (zi(o)) {
            if (xm(t)) {
              const { mark: e, markDef: i, config: s } = t,
                l = Eo({ fieldDef: n, markDef: i, config: s });
              (Gr(e) || l) && (a = { timeUnit: Ei(o), field: r });
            }
          } else a = { as: ia(n, { forAs: !0 }), field: r, timeUnit: o };
          if (xm(t)) {
            const { mark: e, markDef: r, config: o } = t,
              s = Eo({ fieldDef: n, markDef: r, config: o });
            Gr(e) && zt(i) && .5 !== s && (a.rectBandPosition = s);
          }
          a && (e[d(a)] = a);
        }
        return e;
      }, {});
      return S(n) ? null : new $c(e, n);
    }
    static makeFromTransform(e, t) {
      const { timeUnit: n, ...i } = { ...t }, r = { ...i, timeUnit: Ei(n) };
      return new $c(e, { [d(r)]: r });
    }
    merge(e) {
      this.timeUnits = { ...this.timeUnits };
      for (const t in e.timeUnits) {
        this.timeUnits[t] || (this.timeUnits[t] = e.timeUnits[t]);
      }
      for (const t of e.children) e.removeChild(t), t.parent = this;
      e.remove();
    }
    removeFormulas(e) {
      const t = {};
      for (const [n, i] of z(this.timeUnits)) {
        const r = bc(i) ? i.as : `${i.field}_end`;
        e.has(r) || (t[n] = i);
      }
      this.timeUnits = t;
    }
    producedFields() {
      return new Set(F(this.timeUnits).map((e) => bc(e) ? e.as : xc(e.field)));
    }
    dependentFields() {
      return new Set(F(this.timeUnits).map((e) => e.field));
    }
    hash() {
      return `TimeUnit ${d(this.timeUnits)}`;
    }
    assemble() {
      const e = [];
      for (const t of F(this.timeUnits)) {
        const { rectBandPosition: n } = t, i = Ei(t.timeUnit);
        if (bc(t)) {
          const { field: r, as: o } = t,
            { unit: a, utc: s, ...l } = i,
            c = [o, `${o}_end`];
          e.push({
            field: E(r),
            type: "timeunit",
            ...a ? { units: _i(a) } : {},
            ...s ? { timezone: "utc" } : {},
            ...l,
            as: c,
          }), e.push(...Dc(c, n, i));
        } else if (t) {
          const { field: r } = t,
            o = r.replaceAll("\\.", "."),
            a = Sc({ timeUnit: i, field: o }),
            s = xc(o);
          e.push({ type: "formula", expr: a, as: s }),
            e.push(...Dc([o, s], n, i));
        }
      }
      return e;
    }
  }
  const wc = "offsetted_rect_start", kc = "offsetted_rect_end";
  function Sc(e) {
    let { timeUnit: t, field: n, reverse: i } = e;
    const { unit: r, utc: o } = t,
      a = Pi(r),
      { part: s, step: l } = Li(a, t.step);
    return `${o ? "utcOffset" : "timeOffset"}('${s}', datum['${n}'], ${
      i ? -l : l
    })`;
  }
  function Dc(e, t, n) {
    let [i, r] = e;
    if (void 0 !== t && .5 !== t) {
      const e = `datum['${i}']`, o = `datum['${r}']`;
      return [{
        type: "formula",
        expr: Fc([Sc({ timeUnit: n, field: i, reverse: !0 }), e], t + .5),
        as: `${i}_${wc}`,
      }, { type: "formula", expr: Fc([e, o], t + .5), as: `${i}_${kc}` }];
    }
    return [];
  }
  function Fc(e, t) {
    let [n, i] = e;
    return `${1 - t} * ${n} + ${t} * ${i}`;
  }
  const zc = "_tuple_fields";
  class Oc {
    constructor() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
        t[n] = arguments[n];
      }
      this.items = t,
        this.hasChannel = {},
        this.hasField = {},
        this.hasSelectionId = !1;
    }
  }
  const Cc = {
      defined: () => !0,
      parse: (e, n, i) => {
        const r = n.name,
          o = n.project ??= new Oc(),
          a = {},
          s = {},
          l = new Set(),
          c = (e, t) => {
            const n = "visual" === t ? e.channel : e.field;
            let i = C(`${r}_${n}`);
            for (let e = 1; l.has(i); e++) i = C(`${r}_${n}_${e}`);
            return l.add(i), { [t]: i };
          },
          u = n.type,
          f = e.config.selection[u],
          m = void 0 !== i.value ? t.array(i.value) : null;
        let { fields: p, encodings: g } = t.isObject(i.select) ? i.select : {};
        if (!p && !g && m) {
          for (const e of m) {
            if (t.isObject(e)) {
              for (const t of D(e)) {
                Je[t] ? (g || (g = [])).push(t) : "interval" === u
                  ? (yi(
                    'Interval selections should be initialized using "x", "y", "longitude", or "latitude" keys.',
                  ),
                    g = f.encodings)
                  : (p ??= []).push(t);
              }
            }
          }
        }
        p || g || (g = f.encodings, "fields" in f && (p = f.fields));
        for (const t of g ?? []) {
          const n = e.fieldDef(t);
          if (n) {
            let i = n.field;
            if (n.aggregate) {
              yi(Hn(t, n.aggregate));
              continue;
            }
            if (!i) {
              yi(Vn(t));
              continue;
            }
            if (n.timeUnit && !zi(n.timeUnit)) {
              i = e.vgField(t);
              const r = { timeUnit: n.timeUnit, as: i, field: n.field };
              s[d(r)] = r;
            }
            if (!a[i]) {
              const r = {
                field: i,
                channel: t,
                type: "interval" === u && Vt(t) &&
                    yr(e.getScaleComponent(t).get("type"))
                  ? "R"
                  : n.bin
                  ? "R-RE"
                  : "E",
                index: o.items.length,
              };
              r.signals = { ...c(r, "data"), ...c(r, "visual") },
                o.items.push(a[i] = r),
                o.hasField[i] = a[i],
                o.hasSelectionId = o.hasSelectionId || i === vs,
                Ee(t)
                  ? (r.geoChannel = t,
                    r.channel = je(t),
                    o.hasChannel[r.channel] = a[i])
                  : o.hasChannel[t] = a[i];
            }
          } else yi(Vn(t));
        }
        for (const e of p ?? []) {
          if (o.hasField[e]) continue;
          const t = { type: "E", field: e, index: o.items.length };
          t.signals = { ...c(t, "data") },
            o.items.push(t),
            o.hasField[e] = t,
            o.hasSelectionId = o.hasSelectionId || e === vs;
        }
        m &&
        (n.init = m.map((e) =>
          o.items.map((n) =>
            t.isObject(e)
              ? void 0 !== e[n.geoChannel || n.channel]
                ? e[n.geoChannel || n.channel]
                : e[n.field]
              : e
          )
        )), S(s) || (o.timeUnit = new $c(null, s));
      },
      signals: (e, t, n) => {
        const i = t.name + zc;
        return n.filter((e) => e.name === i).length > 0 ||
            t.project.hasSelectionId
          ? n
          : n.concat({ name: i, value: t.project.items.map(fc) });
      },
    },
    Nc = {
      defined: (e) =>
        "interval" === e.type && "global" === e.resolve && e.bind &&
        "scales" === e.bind,
      parse: (e, t) => {
        const n = t.scales = [];
        for (const i of t.project.items) {
          const r = i.channel;
          if (!Vt(r)) continue;
          const o = e.getScaleComponent(r), a = o ? o.get("type") : void 0;
          "sequential" == a &&
          yi(
            "Sequntial scales are deprecated. The available quantitative scale type values are linear, log, pow, sqrt, symlog, time and utc",
          ),
            o && yr(a)
              ? (o.set(
                "selectionExtent",
                { param: t.name, field: i.field },
                !0,
              ),
                n.push(i))
              : yi(
                "Scale bindings are currently only supported for scales with unbinned, continuous domains.",
              );
        }
      },
      topLevelSignals: (e, n, i) => {
        const r = n.scales.filter(
          (e) => 0 === i.filter((t) => t.name === e.signals.data).length,
        );
        if (!e.parent || Pc(e) || 0 === r.length) return i;
        const o = i.filter((e) => e.name === n.name)[0];
        let a = o.update;
        if (a.indexOf(ju) >= 0) {
          o.update = `{${
            r.map((e) => `${t.stringValue(E(e.field))}: ${e.signals.data}`)
              .join(", ")
          }}`;
        } else {
          for (const e of r) {
            const n = `${t.stringValue(E(e.field))}: ${e.signals.data}`;
            a.includes(n) || (a = `${a.substring(0, a.length - 1)}, ${n}}`);
          }
          o.update = a;
        }
        return i.concat(r.map((e) => ({ name: e.signals.data })));
      },
      signals: (e, t, n) => {
        if (e.parent && !Pc(e)) {
          for (const e of t.scales) {
            const t = n.find((t) => t.name === e.signals.data);
            t.push = "outer", delete t.value, delete t.update;
          }
        }
        return n;
      },
    };
  function _c(e, n) {
    return `domain(${t.stringValue(e.scaleName(n))})`;
  }
  function Pc(e) {
    return e.parent && km(e.parent) &&
      (!e.parent.parent ?? Pc(e.parent.parent));
  }
  const Ac = "_brush",
    Tc = "_scale_trigger",
    jc = "geo_interval_init_tick",
    Ec = "_init",
    Mc = {
      defined: (e) => "interval" === e.type,
      parse: (e, n, i) => {
        if (e.hasProjection) {
          const e = { ...t.isObject(i.select) ? i.select : {} };
          e.fields = [vs],
            e.encodings || (e.encodings = i.value ? D(i.value) : [ue, ce]),
            i.select = { type: "interval", ...e };
        }
        if (n.translate && !Nc.defined(n)) {
          const e = `!event.item || event.item.mark.name !== ${
            t.stringValue(n.name + Ac)
          }`;
          for (const i of n.events) {
            if (!i.between) {
              yi(
                `${i} is not an ordered event stream for interval selections.`,
              );
              continue;
            }
            const n = t.array(i.between[0].filter ??= []);
            n.indexOf(e) < 0 && n.push(e);
          }
        }
      },
      signals: (e, n, i) => {
        const r = n.name,
          o = r + Au,
          a = F(n.project.hasChannel).filter(
            (e) => e.channel === Z || e.channel === ee,
          ),
          s = n.init ? n.init[0] : null;
        if (
          i.push(...a.reduce((i, r) =>
            i.concat(function (e, n, i, r) {
              const o = !e.hasProjection,
                a = i.channel,
                s = i.signals.visual,
                l = t.stringValue(o ? e.scaleName(a) : e.projectionName()),
                c = (e) => `scale(${l}, ${e})`,
                u = e.getSizeSignalRef(a === Z ? "width" : "height").signal,
                f = `${a}(unit)`,
                d = n.events.reduce(
                  (
                    e,
                    t,
                  ) => [
                    ...e,
                    { events: t.between[0], update: `[${f}, ${f}]` },
                    { events: t, update: `[${s}[0], clamp(${f}, 0, ${u})]` },
                  ],
                  [],
                );
              if (o) {
                const t = i.signals.data,
                  o = Nc.defined(n),
                  u = e.getScaleComponent(a),
                  f = u ? u.get("type") : void 0,
                  m = r ? { init: dc(r, !0, c) } : { value: [] };
                return d.push({
                  events: { signal: n.name + Tc },
                  update: yr(f)
                    ? `[${c(`${t}[0]`)}, ${c(`${t}[1]`)}]`
                    : "[0, 0]",
                }),
                  o ? [{ name: t, on: [] }] : [{ name: s, ...m, on: d }, {
                    name: t,
                    ...r ? { init: dc(r) } : {},
                    on: [{
                      events: { signal: s },
                      update: `${s}[0] === ${s}[1] ? null : invert(${l}, ${s})`,
                    }],
                  }];
              }
              {
                const e = a === Z ? 0 : 1, t = n.name + Ec;
                return [{
                  name: s,
                  ...r
                    ? { init: `[${t}[0][${e}], ${t}[1][${e}]]` }
                    : { value: [] },
                  on: d,
                }];
              }
            }(e, n, r, s && s[r.index])), [])), e.hasProjection
        ) {
          const l = t.stringValue(e.projectionName()),
            c = e.projectionName() + "_center",
            { x: u, y: f } = n.project.hasChannel,
            d = u && u.signals.visual,
            m = f && f.signals.visual,
            p = u ? s && s[u.index] : `${c}[0]`,
            g = f ? s && s[f.index] : `${c}[1]`,
            h = (t) => e.getSizeSignalRef(t).signal,
            y = `[[${d ? d + "[0]" : "0"}, ${m ? m + "[0]" : "0"}],[${
              d ? d + "[1]" : h("width")
            }, ${m ? m + "[1]" : h("height")}]]`;
          if (
            s &&
            (i.unshift({
              name: r + Ec,
              init: `[scale(${l}, [${u ? p[0] : p}, ${
                f ? g[0] : g
              }]), scale(${l}, [${u ? p[1] : p}, ${f ? g[1] : g}])]`,
            }),
              !u || !f)
          ) {
            i.find((e) => e.name === c) ||
              i.unshift({
                name: c,
                update: `invert(${l}, [${h("width")}/2, ${h("height")}/2])`,
              });
          }
          const v = `vlSelectionTuples(${`intersect(${y}, {markname: ${
              t.stringValue(e.getName("marks"))
            }}, unit.mark)`}, ${`{unit: ${Mu(e)}}`})`,
            b = a.map((e) => e.signals.visual);
          return i.concat({
            name: o,
            on: [{
              events: [
                ...b.length ? [{ signal: b.join(" || ") }] : [],
                ...s ? [{ signal: jc }] : [],
              ],
              update: v,
            }],
          });
        }
        {
          if (!Nc.defined(n)) {
            const n = r + Tc,
              o = a.map((n) => {
                const i = n.channel,
                  { data: r, visual: o } = n.signals,
                  a = t.stringValue(e.scaleName(i)),
                  s = yr(e.getScaleComponent(i).get("type")) ? "+" : "";
                return `(!isArray(${r}) || (${s}invert(${a}, ${o})[0] === ${s}${r}[0] && ${s}invert(${a}, ${o})[1] === ${s}${r}[1]))`;
              });
            o.length &&
              i.push({
                name: n,
                value: {},
                on: [{
                  events: a.map((t) => ({ scale: e.scaleName(t.channel) })),
                  update: o.join(" && ") + ` ? ${n} : {}`,
                }],
              });
          }
          const l = a.map((e) => e.signals.data),
            c = `unit: ${Mu(e)}, fields: ${r + zc}, values`;
          return i.concat({
            name: o,
            ...s ? { init: `{${c}: ${dc(s)}}` } : {},
            ...l.length
              ? {
                on: [{
                  events: [{ signal: l.join(" || ") }],
                  update: `${l.join(" && ")} ? {${c}: [${l}]} : null`,
                }],
              }
              : {},
          });
        }
      },
      topLevelSignals: (e, t, n) => {
        if (xm(e) && e.hasProjection && t.init) {
          n.filter((e) => e.name === jc).length ||
            n.unshift({
              name: jc,
              value: null,
              on: [{
                events: "timer{1}",
                update: `${jc} === null ? {} : ${jc}`,
              }],
            });
        }
        return n;
      },
      marks: (e, n, i) => {
        const r = n.name,
          { x: o, y: a } = n.project.hasChannel,
          s = o?.signals.visual,
          l = a?.signals.visual,
          c = `data(${t.stringValue(n.name + Pu)})`;
        if (Nc.defined(n) || !o && !a) return i;
        const u = {
          x: void 0 !== o ? { signal: `${s}[0]` } : { value: 0 },
          y: void 0 !== a ? { signal: `${l}[0]` } : { value: 0 },
          x2: void 0 !== o
            ? { signal: `${s}[1]` }
            : { field: { group: "width" } },
          y2: void 0 !== a
            ? { signal: `${l}[1]` }
            : { field: { group: "height" } },
        };
        if ("global" === n.resolve) {
          for (const t of D(u)) {
            u[t] = [{
              test: `${c}.length && ${c}[0].unit === ${Mu(e)}`,
              ...u[t],
            }, { value: 0 }];
          }
        }
        const { fill: f, fillOpacity: d, cursor: m, ...p } = n.mark,
          g = D(p).reduce(
            (
              e,
              t,
            ) => (e[t] = [{
              test: [
                void 0 !== o && `${s}[0] !== ${s}[1]`,
                void 0 !== a && `${l}[0] !== ${l}[1]`,
              ].filter((e) => e).join(" && "),
              value: p[t],
            }, { value: null }],
              e),
            {},
          ),
          h = m ?? (n.translate ? "move" : null);
        return [
          {
            name: `${r + Ac}_bg`,
            type: "rect",
            clip: !0,
            encode: {
              enter: { fill: { value: f }, fillOpacity: { value: d } },
              update: u,
            },
          },
          ...i,
          {
            name: r + Ac,
            type: "rect",
            clip: !0,
            encode: {
              enter: {
                ...h ? { cursor: { value: h } } : {},
                fill: { value: "transparent" },
              },
              update: { ...u, ...g },
            },
          },
        ];
      },
    };
  const Rc = {
    defined: (e) => "point" === e.type,
    signals: (e, n, i) => {
      const r = n.name,
        o = r + zc,
        a = n.project,
        s = "(item().isVoronoi ? datum.datum : datum)",
        l = F(e.component.selection ?? {}).reduce(
          (e, t) => "interval" === t.type ? e.concat(t.name + Ac) : e,
          [],
        ).map((e) => `indexof(item().mark.name, '${e}') < 0`).join(" && "),
        c =
          "datum && item().mark.marktype !== 'group' && indexof(item().mark.role, 'legend') < 0" +
          (l ? ` && ${l}` : "");
      let u = `unit: ${Mu(e)}, `;
      if (n.project.hasSelectionId) u += `${vs}: ${s}[${t.stringValue(vs)}]`;
      else {u += `fields: ${o}, values: [${
          a.items.map((n) => {
            const i = e.fieldDef(n.channel);
            return i?.bin
              ? `[${s}[${t.stringValue(e.vgField(n.channel, {}))}], ${s}[${
                t.stringValue(e.vgField(n.channel, { binSuffix: "end" }))
              }]]`
              : `${s}[${t.stringValue(n.field)}]`;
          }).join(", ")
        }]`;}
      const f = n.events;
      return i.concat([{
        name: r + Au,
        on: f ? [{ events: f, update: `${c} ? {${u}} : null`, force: !0 }] : [],
      }]);
    },
  };
  function Lc(e) {
    let {
      model: n,
      channelDef: i,
      vgChannel: r,
      invalidValueRef: o,
      mainRefFn: a,
    } = e;
    const s = qo(i) && i.condition;
    let l = [];
    if (s) {
      l = t.array(s).map((e) => {
        const t = a(e);
        if (
          function (e) {
            return e.param;
          }(e)
        ) {
          const { param: i, empty: r } = e;
          return { test: Bu(n, { param: i, empty: r }), ...t };
        }
        return { test: Hu(n, e.test), ...t };
      });
    }
    void 0 !== o && l.push(o);
    const c = a(i);
    return void 0 !== c && l.push(c),
      l.length > 1 || 1 === l.length && Boolean(l[0].test)
        ? { [r]: l }
        : 1 === l.length
        ? { [r]: l[0] }
        : {};
  }
  function qc(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : "text";
    const n = e.encoding[t];
    return Lc({
      model: e,
      channelDef: n,
      vgChannel: t,
      mainRefFn: (t) => Uc(t, e.config),
      invalidValueRef: void 0,
    });
  }
  function Uc(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2]
      ? arguments[2]
      : "datum";
    if (e) {
      if (Jo(e)) return Fn(e.value);
      if (Xo(e)) {
        const { format: i, formatType: r } = fa(e);
        return yo({
          fieldOrDatumDef: e,
          format: i,
          formatType: r,
          expr: n,
          config: t,
        });
      }
    }
  }
  function Wc(e) {
    let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const { encoding: i, markDef: r, config: o, stack: a } = e, s = i.tooltip;
    if (t.isArray(s)) return { tooltip: Bc({ tooltip: s }, a, o, n) };
    {
      const l = n.reactiveGeom ? "datum.datum" : "datum";
      return Lc({
        model: e,
        channelDef: s,
        vgChannel: "tooltip",
        mainRefFn: (e) => {
          const s = Uc(e, o, l);
          if (s) return s;
          if (null === e) return;
          let c = _n("tooltip", r, o);
          return !0 === c && (c = { content: "encoding" }),
            t.isString(c)
              ? { value: c }
              : t.isObject(c)
              ? yn(c)
                ? c
                : "encoding" === c.content
                ? Bc(i, a, o, n)
                : { signal: l }
              : void 0;
        },
        invalidValueRef: void 0,
      });
    }
  }
  function Ic(e, n, i) {
    let { reactiveGeom: r } = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : {};
    const o = { ...i, ...i.tooltipFormat },
      a = {},
      s = r ? "datum.datum" : "datum",
      l = [];
    function c(i, r) {
      const c = tt(r),
        u = Qo(i) ? i : { ...i, type: e[c].type },
        f = u.title || ua(u, o),
        d = t.array(f).join(", ").replaceAll(/"/g, '\\"');
      let m;
      if (zt(r)) {
        const t = "x" === r ? "x2" : "y2", n = da(e[t]);
        if (cn(u.bin) && n) {
          const e = ia(u, { expr: s }),
            i = ia(n, { expr: s }),
            { format: r, formatType: l } = fa(u);
          m = Do(e, i, r, l, o), a[t] = !0;
        }
      }
      if (
        (zt(r) || r === se || r === oe) && n && n.fieldChannel === r &&
        "normalize" === n.offset
      ) {
        const { format: e, formatType: t } = fa(u);
        m = yo({
          fieldOrDatumDef: u,
          format: e,
          formatType: t,
          expr: s,
          config: o,
          normalizeStack: !0,
        }).signal;
      }
      m ??= Uc(u, o, s).signal, l.push({ channel: r, key: d, value: m });
    }
    qa(e, (e, t) => {
      Io(e) ? c(e, t) : Uo(e) && c(e.condition, t);
    });
    const u = {};
    for (const { channel: e, key: t, value: n } of l) {
      a[e] || u[t] || (u[t] = n);
    }
    return u;
  }
  function Bc(e, t, n) {
    let { reactiveGeom: i } = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : {};
    const r = Ic(e, t, n, { reactiveGeom: i }),
      o = z(r).map((e) => {
        let [t, n] = e;
        return `"${t}": ${n}`;
      });
    return o.length > 0 ? { signal: `{${o.join(", ")}}` } : void 0;
  }
  function Vc(e) {
    const { markDef: t, config: n } = e, i = _n("aria", t, n);
    return !1 === i ? {} : { ...i ? { aria: i } : {}, ...Hc(e), ...Gc(e) };
  }
  function Hc(e) {
    const { mark: t, markDef: n, config: i } = e;
    if (!1 === i.aria) return {};
    const r = _n("ariaRoleDescription", n, i);
    return null != r
      ? { ariaRoleDescription: { value: r } }
      : t in $n
      ? {}
      : { ariaRoleDescription: { value: t } };
  }
  function Gc(e) {
    const { encoding: t, markDef: n, config: i, stack: r } = e,
      o = t.description;
    if (o) {
      return Lc({
        model: e,
        channelDef: o,
        vgChannel: "description",
        mainRefFn: (t) => Uc(t, e.config),
        invalidValueRef: void 0,
      });
    }
    const a = _n("description", n, i);
    if (null != a) return { description: Fn(a) };
    if (!1 === i.aria) return {};
    const s = Ic(t, r, i);
    return S(s) ? void 0 : {
      description: {
        signal: z(s).map((e, t) => {
          let [n, i] = e;
          return `"${t > 0 ? "; " : ""}${n}: " + (${i})`;
        }).join(" + "),
      },
    };
  }
  function Yc(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { markDef: i, encoding: r, config: o } = t, { vgChannel: a } = n;
    let { defaultRef: s, defaultValue: l } = n;
    void 0 === s &&
      (l ??= _n(e, i, o, { vgChannel: a, ignoreVgConfig: !0 }),
        void 0 !== l && (s = Fn(l)));
    const c = r[e],
      u = {
        markDef: i,
        config: o,
        scaleName: t.scaleName(e),
        scale: t.getScaleComponent(e),
      },
      f = ao({ ...u, scaleChannel: e, channelDef: c });
    return Lc({
      model: t,
      channelDef: c,
      vgChannel: a ?? e,
      invalidValueRef: f,
      mainRefFn: (t) =>
        fo({ ...u, channel: e, channelDef: t, stack: null, defaultRef: s }),
    });
  }
  function Xc(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : { filled: void 0 };
    const { markDef: n, encoding: i, config: r } = e,
      { type: o } = n,
      a = t.filled ?? _n("filled", n, r),
      s = p(["bar", "point", "circle", "square", "geoshape"], o)
        ? "transparent"
        : void 0,
      l = _n(!0 === a ? "color" : void 0, n, r, { vgChannel: "fill" }) ??
        r.mark[!0 === a && "color"] ?? s,
      c = _n(!1 === a ? "color" : void 0, n, r, { vgChannel: "stroke" }) ??
        r.mark[!1 === a && "color"],
      u = a ? "fill" : "stroke",
      f = { ...l ? { fill: Fn(l) } : {}, ...c ? { stroke: Fn(c) } : {} };
    return n.color && (a ? n.fill : n.stroke) &&
      yi(ei("property", { fill: "fill" in n, stroke: "stroke" in n })),
      {
        ...f,
        ...Yc("color", e, { vgChannel: u, defaultValue: a ? l : c }),
        ...Yc("fill", e, { defaultValue: i.fill ? l : void 0 }),
        ...Yc("stroke", e, { defaultValue: i.stroke ? c : void 0 }),
      };
  }
  function Qc(e) {
    const { encoding: t, mark: n } = e, i = t.order;
    return !Hr(n) && Jo(i)
      ? Lc({
        model: e,
        channelDef: i,
        vgChannel: "zindex",
        mainRefFn: (e) => Fn(e.value),
        invalidValueRef: void 0,
      })
      : {};
  }
  function Jc(e) {
    let {
      channel: t,
      markDef: n,
      encoding: i = {},
      model: r,
      bandPosition: o,
    } = e;
    const a = `${t}Offset`, s = n[a], l = i[a];
    if (("xOffset" === a || "yOffset" === a) && l) {
      return {
        offsetType: "encoding",
        offset: fo({
          channel: a,
          channelDef: l,
          markDef: n,
          config: r?.config,
          scaleName: r.scaleName(a),
          scale: r.getScaleComponent(a),
          stack: null,
          defaultRef: Fn(s),
          bandPosition: o,
        }),
      };
    }
    const c = n[a];
    return c ? { offsetType: "visual", offset: c } : {};
  }
  function Kc(e, t, n) {
    let { defaultPos: i, vgChannel: r } = n;
    const { encoding: o, markDef: a, config: s, stack: l } = t,
      c = o[e],
      u = o[it(e)],
      f = t.scaleName(e),
      d = t.getScaleComponent(e),
      { offset: m, offsetType: p } = Jc({
        channel: e,
        markDef: a,
        encoding: o,
        model: t,
        bandPosition: .5,
      }),
      g = Zc({ model: t, defaultPos: i, channel: e, scaleName: f, scale: d }),
      h = !c && zt(e) && (o.latitude || o.longitude)
        ? { field: t.getName(e) }
        : function (e) {
          const {
            channel: t,
            channelDef: n,
            scaleName: i,
            stack: r,
            offset: o,
            markDef: a,
          } = e;
          if (Xo(n) && r && t === r.fieldChannel) {
            if (Io(n)) {
              let e = n.bandPosition;
              if (
                void 0 !== e || "text" !== a.type ||
                "radius" !== t && "theta" !== t || (e = .5), void 0 !== e
              ) {
                return uo({
                  scaleName: i,
                  fieldOrDatumDef: n,
                  startSuffix: "start",
                  bandPosition: e,
                  offset: o,
                });
              }
            }
            return co(n, i, { suffix: "end" }, { offset: o });
          }
          return lo(e);
        }({
          channel: e,
          channelDef: c,
          channel2Def: u,
          markDef: a,
          config: s,
          scaleName: f,
          scale: d,
          stack: l,
          offset: m,
          defaultRef: g,
          bandPosition: "encoding" === p ? 0 : void 0,
        });
    return h ? { [r || e]: h } : void 0;
  }
  function Zc(e) {
    let { model: t, defaultPos: n, channel: i, scaleName: r, scale: o } = e;
    const { markDef: a, config: s } = t;
    return () => {
      const e = tt(i), l = nt(i), c = _n(i, a, s, { vgChannel: l });
      if (void 0 !== c) return mo(i, c);
      switch (n) {
        case "zeroOrMin":
          return eu({
            scaleName: r,
            scale: o,
            mode: "zeroOrMin",
            mainChannel: e,
            config: s,
          });
        case "zeroOrMax":
          return eu({
            scaleName: r,
            scale: o,
            mode: {
              zeroOrMax: {
                widthSignal: t.width.signal,
                heightSignal: t.height.signal,
              },
            },
            mainChannel: e,
            config: s,
          });
        case "mid":
          return { ...t[rt(i)], mult: .5 };
      }
    };
  }
  function eu(e) {
    let { mainChannel: t, config: n, ...i } = e;
    const r = oo(i), { mode: o } = i;
    if (r) return r;
    switch (t) {
      case "radius": {
        if ("zeroOrMin" === o) return { value: 0 };
        const { widthSignal: e, heightSignal: t } = o.zeroOrMax;
        return { signal: `min(${e},${t})/2` };
      }
      case "theta":
        return "zeroOrMin" === o ? { value: 0 } : { signal: "2*PI" };
      case "x":
        return "zeroOrMin" === o ? { value: 0 } : { field: { group: "width" } };
      case "y":
        return "zeroOrMin" === o
          ? { field: { group: "height" } }
          : { value: 0 };
    }
  }
  const tu = { left: "x", center: "xc", right: "x2" },
    nu = { top: "y", middle: "yc", bottom: "y2" };
  function iu(e, t, n) {
    let i = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : "middle";
    if ("radius" === e || "theta" === e) return nt(e);
    const r = "x" === e ? "align" : "baseline", o = _n(r, t, n);
    let a;
    return yn(o)
      ? (yi(function (e) {
        return `The ${e} for range marks cannot be an expression`;
      }(r)),
        a = void 0)
      : a = o,
      "x" === e ? tu[a || ("top" === i ? "left" : "center")] : nu[a || i];
  }
  function ru(e, t, n) {
    let { defaultPos: i, defaultPos2: r, range: o } = n;
    return o
      ? ou(e, t, { defaultPos: i, defaultPos2: r })
      : Kc(e, t, { defaultPos: i });
  }
  function ou(e, t, n) {
    let { defaultPos: i, defaultPos2: r } = n;
    const { markDef: o, config: a } = t,
      s = it(e),
      l = rt(e),
      c = function (e, t, n) {
        const { encoding: i, mark: r, markDef: o, stack: a, config: s } = e,
          l = tt(n),
          c = rt(n),
          u = nt(n),
          f = i[l],
          d = e.scaleName(l),
          m = e.getScaleComponent(l),
          { offset: p } = Jc(
            n in i || n in o
              ? { channel: n, markDef: o, encoding: i, model: e }
              : { channel: l, markDef: o, encoding: i, model: e },
          );
        if (!f && ("x2" === n || "y2" === n) && (i.latitude || i.longitude)) {
          const t = rt(n), i = e.markDef[t];
          return null != i
            ? { [t]: { value: i } }
            : { [u]: { field: e.getName(n) } };
        }
        const g = function (e) {
          let {
            channel: t,
            channelDef: n,
            channel2Def: i,
            markDef: r,
            config: o,
            scaleName: a,
            scale: s,
            stack: l,
            offset: c,
            defaultRef: u,
          } = e;
          if (Xo(n) && l && t.charAt(0) === l.fieldChannel.charAt(0)) {
            return co(n, a, { suffix: "start" }, { offset: c });
          }
          return lo({
            channel: t,
            channelDef: i,
            scaleName: a,
            scale: s,
            stack: l,
            markDef: r,
            config: o,
            offset: c,
            defaultRef: u,
          });
        }({
          channel: n,
          channelDef: f,
          channel2Def: i[n],
          markDef: o,
          config: s,
          scaleName: d,
          scale: m,
          stack: a,
          offset: p,
          defaultRef: void 0,
        });
        if (void 0 !== g) return { [u]: g };
        return au(n, o) ||
          au(n, { [n]: An(n, o, s.style), [c]: An(c, o, s.style) }) ||
          au(n, s[r]) || au(n, s.mark) ||
          {
            [u]: Zc({
              model: e,
              defaultPos: t,
              channel: n,
              scaleName: d,
              scale: m,
            })(),
          };
      }(t, r, s);
    return {
      ...Kc(e, t, { defaultPos: i, vgChannel: c[l] ? iu(e, o, a) : nt(e) }),
      ...c,
    };
  }
  function au(e, t) {
    const n = rt(e), i = nt(e);
    if (void 0 !== t[i]) return { [i]: mo(e, t[i]) };
    if (void 0 !== t[e]) return { [i]: mo(e, t[e]) };
    if (t[n]) {
      const i = t[n];
      if (!Zr(i)) return { [n]: mo(e, i) };
      yi(function (e) {
        return `Position range does not support relative band size for ${e}.`;
      }(n));
    }
  }
  function su(e, n) {
    const { config: i, encoding: r, markDef: o } = e,
      a = o.type,
      s = it(n),
      l = rt(n),
      c = r[n],
      u = r[s],
      f = e.getScaleComponent(n),
      d = f ? f.get("type") : void 0,
      m = o.orient,
      p = r[l] ?? r.size ?? _n("size", o, i, { vgChannel: l }),
      g = ot(n),
      h = "bar" === a && ("x" === n ? "vertical" === m : "horizontal" === m);
    return !Io(c) || !(ln(c.bin) || cn(c.bin) || c.timeUnit && !u) ||
        p && !Zr(p) || r[g] || hr(d)
      ? (Xo(c) && hr(d) || h) && !u
        ? function (e, n, i) {
          const { markDef: r, encoding: o, config: a, stack: s } = i,
            l = r.orient,
            c = i.scaleName(n),
            u = i.getScaleComponent(n),
            f = rt(n),
            d = it(n),
            m = ot(n),
            p = i.scaleName(m),
            g = i.getScaleComponent(at(n)),
            h = "horizontal" === l && "y" === n ||
              "vertical" === l && "x" === n;
          let y;
          (o.size || r.size) && (h
            ? y = Yc("size", i, { vgChannel: f, defaultRef: Fn(r.size) })
            : yi(function (e) {
              return `Cannot apply size to non-oriented mark "${e}".`;
            }(r.type)));
          const v = !!y,
            b = Mo({
              channel: n,
              fieldDef: e,
              markDef: r,
              config: a,
              scaleType: (u || g)?.get("type"),
              useVlSizeChannel: h,
            });
          y = y || { [f]: lu(f, p || c, g || u, a, b, !!e, r.type) };
          const x = "band" === (u || g)?.get("type") && Zr(b) && !v
              ? "top"
              : "middle",
            $ = iu(n, r, a, x),
            w = "xc" === $ || "yc" === $,
            { offset: k, offsetType: S } = Jc({
              channel: n,
              markDef: r,
              encoding: o,
              model: i,
              bandPosition: w ? .5 : 0,
            }),
            D = lo({
              channel: n,
              channelDef: e,
              markDef: r,
              config: a,
              scaleName: c,
              scale: u,
              stack: s,
              offset: k,
              defaultRef: Zc({
                model: i,
                defaultPos: "mid",
                channel: n,
                scaleName: c,
                scale: u,
              }),
              bandPosition: w
                ? "encoding" === S ? 0 : .5
                : yn(b)
                ? { signal: `(1-${b})/2` }
                : Zr(b)
                ? (1 - b.band) / 2
                : 0,
            });
          if (f) return { [$]: D, ...y };
          {
            const e = nt(d), n = y[f], i = k ? { ...n, offset: k } : n;
            return {
              [$]: D,
              [e]: t.isArray(D)
                ? [D[0], { ...D[1], offset: i }]
                : { ...D, offset: i },
            };
          }
        }(c, n, e)
        : ou(n, e, { defaultPos: "zeroOrMax", defaultPos2: "zeroOrMin" })
      : function (e) {
        let { fieldDef: t, fieldDef2: n, channel: i, model: r } = e;
        const { config: o, markDef: a, encoding: s } = r,
          l = r.getScaleComponent(i),
          c = r.scaleName(i),
          u = l ? l.get("type") : void 0,
          f = l.get("reverse"),
          d = Mo({
            channel: i,
            fieldDef: t,
            markDef: a,
            config: o,
            scaleType: u,
          }),
          m = r.component.axes[i]?.[0],
          p = m?.get("translate") ?? .5,
          g = zt(i) ? _n("binSpacing", a, o) ?? 0 : 0,
          h = it(i),
          y = nt(i),
          v = nt(h),
          b = Pn("minBandSize", a, o),
          { offset: x } = Jc({
            channel: i,
            markDef: a,
            encoding: s,
            model: r,
            bandPosition: 0,
          }),
          { offset: $ } = Jc({
            channel: h,
            markDef: a,
            encoding: s,
            model: r,
            bandPosition: 0,
          }),
          w = function (e) {
            let { scaleName: t, fieldDef: n } = e;
            const i = ia(n, { expr: "datum" });
            return `abs(scale("${t}", ${
              ia(n, { expr: "datum", suffix: "end" })
            }) - scale("${t}", ${i}))`;
          }({ fieldDef: t, scaleName: c }),
          k = cu(i, g, f, p, x, b, w),
          S = cu(h, g, f, p, $ ?? x, b, w),
          D = yn(d)
            ? { signal: `(1-${d.signal})/2` }
            : Zr(d)
            ? (1 - d.band) / 2
            : .5,
          F = Eo({ fieldDef: t, fieldDef2: n, markDef: a, config: o });
        if (ln(t.bin) || t.timeUnit) {
          const e = t.timeUnit && .5 !== F;
          return {
            [v]: uu({
              fieldDef: t,
              scaleName: c,
              bandPosition: D,
              offset: S,
              useRectOffsetField: e,
            }),
            [y]: uu({
              fieldDef: t,
              scaleName: c,
              bandPosition: yn(D) ? { signal: `1-${D.signal}` } : 1 - D,
              offset: k,
              useRectOffsetField: e,
            }),
          };
        }
        if (cn(t.bin)) {
          const e = co(t, c, {}, { offset: S });
          if (Io(n)) return { [v]: e, [y]: co(n, c, {}, { offset: k }) };
          if (un(t.bin) && t.bin.step) {
            return {
              [v]: e,
              [y]: {
                signal: `scale("${c}", ${
                  ia(t, { expr: "datum" })
                } + ${t.bin.step})`,
                offset: k,
              },
            };
          }
        }
        return void yi(pi(h));
      }({ fieldDef: c, fieldDef2: u, channel: n, model: e });
  }
  function lu(e, n, i, r, o, a, s) {
    if (Zr(o)) {
      if (!i) return { mult: o.band, field: { group: e } };
      {
        const e = i.get("type");
        if ("band" === e) {
          let e = `bandwidth('${n}')`;
          1 !== o.band && (e = `${o.band} * ${e}`);
          const t = Pn("minBandSize", { type: s }, r);
          return { signal: t ? `max(${On(t)}, ${e})` : e };
        }
        1 !== o.band && (yi(function (e) {
          return `Cannot use the relative band size with ${e} scale.`;
        }(e)),
          o = void 0);
      }
    } else {
      if (yn(o)) return o;
      if (o) return { value: o };
    }
    if (i) {
      const e = i.get("range");
      if (vn(e) && t.isNumber(e.step)) return { value: e.step - 2 };
    }
    if (!a) {
      const {
          bandPaddingInner: n,
          barBandPaddingInner: i,
          rectBandPaddingInner: o,
        } = r.scale,
        a = q(n, "bar" === s ? i : o);
      if (yn(a)) return { signal: `(1 - (${a.signal})) * ${e}` };
      if (t.isNumber(a)) return { signal: `${1 - a} * ${e}` };
    }
    return { value: Ps(r.view, e) - 2 };
  }
  function cu(e, t, n, i, r, o, a) {
    if (Ae(e)) return 0;
    const s = "x" === e || "y2" === e, l = s ? -t / 2 : t / 2;
    if (yn(n) || yn(r) || yn(i) || o) {
      const e = On(n),
        t = On(r),
        c = On(i),
        u = On(o),
        f = o
          ? `(${a} < ${u} ? ${s ? "" : "-"}0.5 * (${u} - (${a})) : ${l})`
          : l;
      return {
        signal: (c ? `${c} + ` : "") + (e ? `(${e} ? -1 : 1) * ` : "") +
          (t ? `(${t} + ${f})` : f),
      };
    }
    return r = r || 0, i + (n ? -r - l : +r + l);
  }
  function uu(e) {
    let {
      fieldDef: t,
      scaleName: n,
      bandPosition: i,
      offset: r,
      useRectOffsetField: o,
    } = e;
    return uo({
      scaleName: n,
      fieldOrDatumDef: t,
      bandPosition: i,
      offset: r,
      ...o ? { startSuffix: wc, endSuffix: kc } : {},
    });
  }
  const fu = new Set(["aria", "width", "height"]);
  function du(e, t) {
    const { fill: n, stroke: i } = "include" === t.color ? Xc(e) : {};
    return {
      ...pu(e.markDef, t),
      ...mu("fill", n),
      ...mu("stroke", i),
      ...Yc("opacity", e),
      ...Yc("fillOpacity", e),
      ...Yc("strokeOpacity", e),
      ...Yc("strokeWidth", e),
      ...Yc("strokeDash", e),
      ...Qc(e),
      ...Wc(e),
      ...qc(e, "href"),
      ...Vc(e),
    };
  }
  function mu(e, t) {
    return t ? { [e]: t } : {};
  }
  function pu(e, t) {
    return xn.reduce(
      (
        n,
        i,
      ) => (fu.has(i) || void 0 === e[i] || "ignore" === t[i] ||
        (n[i] = Fn(e[i])),
        n),
      {},
    );
  }
  function gu(e) {
    const { config: t, markDef: n } = e, i = new Set();
    if (
      e.forEachFieldDef((r, o) => {
        let a;
        if (!Vt(o) || !(a = e.getScaleType(o))) return;
        const s = rn(r.aggregate),
          l = ro({
            scaleChannel: o,
            markDef: n,
            config: t,
            scaleType: a,
            isCountAggregate: s,
          });
        if (
          "break-paths-filter-domains" === (c = l) ||
          "break-paths-show-domains" === c
        ) {
          const t = e.vgField(o, {
            expr: "datum",
            binSuffix: e.stack?.impute ? "mid" : void 0,
          });
          t && i.add(t);
        }
        var c;
      }), i.size > 0
    ) return { defined: { signal: [...i].map((e) => Qi(e, !0)).join(" && ") } };
  }
  function hu(e, t) {
    if (void 0 !== t) return { [e]: Fn(t) };
  }
  const yu = "voronoi",
    vu = {
      defined: (e) => "point" === e.type && e.nearest,
      parse: (e, t) => {
        if (t.events) { for (const n of t.events) n.markname = e.getName(yu); }
      },
      marks: (e, t, n) => {
        const { x: i, y: r } = t.project.hasChannel, o = e.mark;
        if (Hr(o)) {
          return yi(`The "nearest" transform is not supported for ${o} marks.`),
            n;
        }
        const a = {
          name: e.getName(yu),
          type: "path",
          interactive: !0,
          from: { data: e.getName("marks") },
          encode: {
            update: {
              fill: { value: "transparent" },
              strokeWidth: { value: .35 },
              stroke: { value: "transparent" },
              isVoronoi: { value: !0 },
              ...Wc(e, { reactiveGeom: !0 }),
            },
          },
          transform: [{
            type: "voronoi",
            x: { expr: i || !r ? "datum.datum.x || 0" : "0" },
            y: { expr: r || !i ? "datum.datum.y || 0" : "0" },
            size: [e.getSizeSignalRef("width"), e.getSizeSignalRef("height")],
          }],
        };
        let s = 0, l = !1;
        return n.forEach((t, n) => {
          const i = t.name ?? "";
          i === e.component.mark[0].name
            ? s = n
            : i.indexOf(yu) >= 0 && (l = !0);
        }),
          l || n.splice(s + 1, 0, a),
          n;
      },
    },
    bu = {
      defined: (e) =>
        "point" === e.type && "global" === e.resolve && e.bind &&
        "scales" !== e.bind && !xs(e.bind),
      parse: (e, t, n) => Lu(t, n),
      topLevelSignals: (e, n, i) => {
        const r = n.name,
          o = n.project,
          a = n.bind,
          s = n.init && n.init[0],
          l = vu.defined(n)
            ? "(item().isVoronoi ? datum.datum : datum)"
            : "datum";
        return o.items.forEach((e, o) => {
          const c = C(`${r}_${e.field}`);
          i.filter((e) => e.name === c).length || i.unshift({
            name: c,
            ...s ? { init: dc(s[o]) } : { value: null },
            on: n.events
              ? [{
                events: n.events,
                update: `datum && item().mark.marktype !== 'group' ? ${l}[${
                  t.stringValue(e.field)
                }] : null`,
              }]
              : [],
            bind: a[e.field] ?? a[e.channel] ?? a,
          });
        }),
          i;
      },
      signals: (e, t, n) => {
        const i = t.name,
          r = t.project,
          o = n.filter((e) => e.name === i + Au)[0],
          a = i + zc,
          s = r.items.map((e) => C(`${i}_${e.field}`)),
          l = s.map((e) => `${e} !== null`).join(" && ");
        return s.length &&
          (o.update = `${l} ? {fields: ${a}, values: [${
            s.join(", ")
          }]} : null`),
          delete o.value,
          delete o.on,
          n;
      },
    },
    xu = "_toggle",
    $u = {
      defined: (e) => "point" === e.type && !!e.toggle,
      signals: (e, t, n) =>
        n.concat({
          name: t.name + xu,
          value: !1,
          on: [{ events: t.events, update: t.toggle }],
        }),
      modifyExpr: (e, t) => {
        const n = t.name + Au, i = t.name + xu;
        return `${i} ? null : ${n}, ` + ("global" === t.resolve
          ? `${i} ? null : true, `
          : `${i} ? null : {unit: ${Mu(e)}}, `) +
          `${i} ? ${n} : null`;
      },
    },
    wu = {
      defined: (e) =>
        void 0 !== e.clear && !1 !== e.clear,
      parse: (e, n) => {
        n.clear &&
          (n.clear = t.isString(n.clear)
            ? t.parseSelector(n.clear, "view")
            : n.clear);
      },
      topLevelSignals: (e, t, n) => {
        if (bu.defined(t)) {
          for (const e of t.project.items) {
            const i = n.findIndex((n) => n.name === C(`${t.name}_${e.field}`));
            -1 !== i && n[i].on.push({ events: t.clear, update: "null" });
          }
        }
        return n;
      },
      signals: (e, t, n) => {
        function i(e, i) {
          -1 !== e && n[e].on && n[e].on.push({ events: t.clear, update: i });
        }
        if ("interval" === t.type) {
          for (const e of t.project.items) {
            const t = n.findIndex((t) => t.name === e.signals.visual);
            if (i(t, "[0, 0]"), -1 === t) {
              i(n.findIndex((t) => t.name === e.signals.data), "null");
            }
          }
        } else {
          let e = n.findIndex((e) => e.name === t.name + Au);
          i(e, "null"),
            $u.defined(t) &&
            (e = n.findIndex((e) => e.name === t.name + xu), i(e, "false"));
        }
        return n;
      },
    },
    ku = {
      defined: (e) => {
        const t = "global" === e.resolve && e.bind && xs(e.bind),
          n = 1 === e.project.items.length && e.project.items[0].field !== vs;
        return t && !n &&
          yi(
            "Legend bindings are only supported for selections over an individual field or encoding channel.",
          ),
          t && n;
      },
      parse: (e, n, i) => {
        const r = l(i);
        if (
          r.select = t.isString(r.select)
            ? { type: r.select, toggle: n.toggle }
            : { ...r.select, toggle: n.toggle },
            Lu(n, r),
            t.isObject(i.select) && (i.select.on || i.select.clear)
        ) {
          const e = 'event.item && indexof(event.item.mark.role, "legend") < 0';
          for (const i of n.events) {
            i.filter = t.array(i.filter ?? []),
              i.filter.includes(e) || i.filter.push(e);
          }
        }
        const o = $s(n.bind) ? n.bind.legend : "click",
          a = t.isString(o) ? t.parseSelector(o, "view") : t.array(o);
        n.bind = { legend: { merge: a } };
      },
      topLevelSignals: (e, t, n) => {
        const i = t.name,
          r = $s(t.bind) && t.bind.legend,
          o = (e) => (t) => {
            const n = l(t);
            return n.markname = e, n;
          };
        for (const e of t.project.items) {
          if (!e.hasLegend) continue;
          const a = `${C(e.field)}_legend`, s = `${i}_${a}`;
          if (0 === n.filter((e) => e.name === s).length) {
            const e = r.merge.map(o(`${a}_symbols`)).concat(
              r.merge.map(o(`${a}_labels`)),
            ).concat(r.merge.map(o(`${a}_entries`)));
            n.unshift({
              name: s,
              ...t.init ? {} : { value: null },
              on: [{
                events: e,
                update:
                  "isDefined(datum.value) ? datum.value : item().items[0].items[0].datum.value",
                force: !0,
              }, {
                events: r.merge,
                update: `!event.item || !datum ? null : ${s}`,
                force: !0,
              }],
            });
          }
        }
        return n;
      },
      signals: (e, t, n) => {
        const i = t.name,
          r = t.project,
          o = n.find((e) => e.name === i + Au),
          a = i + zc,
          s = r.items.filter((e) => e.hasLegend).map(
            (e) => C(`${i}_${C(e.field)}_legend`),
          ),
          l = `${
            s.map((e) => `${e} !== null`).join(" && ")
          } ? {fields: ${a}, values: [${s.join(", ")}]} : null`;
        t.events && s.length > 0
          ? o.on.push({ events: s.map((e) => ({ signal: e })), update: l })
          : s.length > 0 && (o.update = l, delete o.value, delete o.on);
        const c = n.find((e) => e.name === i + xu),
          u = $s(t.bind) && t.bind.legend;
        return c &&
          (t.events
            ? c.on.push({ ...c.on[0], events: u })
            : c.on[0].events = u),
          n;
      },
    };
  const Su = "_translate_anchor",
    Du = "_translate_delta",
    Fu = {
      defined: (e) => "interval" === e.type && e.translate,
      signals: (e, n, i) => {
        const r = n.name,
          o = Nc.defined(n),
          a = r + Su,
          { x: s, y: l } = n.project.hasChannel;
        let c = t.parseSelector(n.translate, "scope");
        return o || (c = c.map((e) => (e.between[0].markname = r + Ac, e))),
          i.push({
            name: a,
            value: {},
            on: [{
              events: c.map((e) => e.between[0]),
              update: "{x: x(unit), y: y(unit)" + (void 0 !== s
                ? `, extent_x: ${o ? _c(e, Z) : `slice(${s.signals.visual})`}`
                : "") +
                (void 0 !== l
                  ? `, extent_y: ${
                    o ? _c(e, ee) : `slice(${l.signals.visual})`
                  }`
                  : "") +
                "}",
            }],
          }, {
            name: r + Du,
            value: {},
            on: [{
              events: c,
              update: `{x: ${a}.x - x(unit), y: ${a}.y - y(unit)}`,
            }],
          }),
          void 0 !== s && zu(e, n, s, "width", i),
          void 0 !== l && zu(e, n, l, "height", i),
          i;
      },
    };
  function zu(e, t, n, i, r) {
    const o = t.name,
      a = o + Su,
      s = o + Du,
      l = n.channel,
      c = Nc.defined(t),
      u = r.filter((e) => e.name === n.signals[c ? "data" : "visual"])[0],
      f = e.getSizeSignalRef(i).signal,
      d = e.getScaleComponent(l),
      m = d && d.get("type"),
      p = d && d.get("reverse"),
      g = `${a}.extent_${l}`,
      h = `${
        c && d
          ? "log" === m
            ? "panLog"
            : "symlog" === m
            ? "panSymlog"
            : "pow" === m
            ? "panPow"
            : "panLinear"
          : "panLinear"
      }(${g}, ${`${c ? l === Z ? p ? "" : "-" : p ? "-" : "" : ""}${s}.${l} / ${
        c ? `${f}` : `span(${g})`
      }`}${
        c
          ? "pow" === m
            ? `, ${d.get("exponent") ?? 1}`
            : "symlog" === m
            ? `, ${d.get("constant") ?? 1}`
            : ""
          : ""
      })`;
    u.on.push({
      events: { signal: s },
      update: c ? h : `clampRange(${h}, 0, ${f})`,
    });
  }
  const Ou = "_zoom_anchor",
    Cu = "_zoom_delta",
    Nu = {
      defined: (e) => "interval" === e.type && e.zoom,
      signals: (e, n, i) => {
        const r = n.name,
          o = Nc.defined(n),
          a = r + Cu,
          { x: s, y: l } = n.project.hasChannel,
          c = t.stringValue(e.scaleName(Z)),
          u = t.stringValue(e.scaleName(ee));
        let f = t.parseSelector(n.zoom, "scope");
        return o || (f = f.map((e) => (e.markname = r + Ac, e))),
          i.push({
            name: r + Ou,
            on: [{
              events: f,
              update: o
                ? "{" +
                  [
                    c ? `x: invert(${c}, x(unit))` : "",
                    u ? `y: invert(${u}, y(unit))` : "",
                  ].filter((e) => e).join(", ") + "}"
                : "{x: x(unit), y: y(unit)}",
            }],
          }, {
            name: a,
            on: [{
              events: f,
              force: !0,
              update: "pow(1.001, event.deltaY * pow(16, event.deltaMode))",
            }],
          }),
          void 0 !== s && _u(e, n, s, "width", i),
          void 0 !== l && _u(e, n, l, "height", i),
          i;
      },
    };
  function _u(e, t, n, i, r) {
    const o = t.name,
      a = n.channel,
      s = Nc.defined(t),
      l = r.filter((e) => e.name === n.signals[s ? "data" : "visual"])[0],
      c = e.getSizeSignalRef(i).signal,
      u = e.getScaleComponent(a),
      f = u && u.get("type"),
      d = s ? _c(e, a) : l.name,
      m = o + Cu,
      p = `${
        s && u
          ? "log" === f
            ? "zoomLog"
            : "symlog" === f
            ? "zoomSymlog"
            : "pow" === f
            ? "zoomPow"
            : "zoomLinear"
          : "zoomLinear"
      }(${d}, ${`${o}${Ou}.${a}`}, ${m}${
        s
          ? "pow" === f
            ? `, ${u.get("exponent") ?? 1}`
            : "symlog" === f
            ? `, ${u.get("constant") ?? 1}`
            : ""
          : ""
      })`;
    l.on.push({
      events: { signal: m },
      update: s ? p : `clampRange(${p}, 0, ${c})`,
    });
  }
  const Pu = "_store",
    Au = "_tuple",
    Tu = "_modify",
    ju = "vlSelectionResolve",
    Eu = [Rc, Mc, Cc, $u, bu, Nc, ku, wu, Fu, Nu, vu];
  function Mu(e) {
    let { escape: n } = arguments.length > 1 && void 0 !== arguments[1]
        ? arguments[1]
        : { escape: !0 },
      i = n ? t.stringValue(e.name) : e.name;
    const r = function (e) {
      let t = e.parent;
      for (; t && !$m(t);) t = t.parent;
      return t;
    }(e);
    if (r) {
      const { facet: e } = r;
      for (const n of Ue) {
        e[n] &&
          (i += ` + '__facet_${n}_' + (facet[${t.stringValue(r.vgField(n))}])`);
      }
    }
    return i;
  }
  function Ru(e) {
    return F(e.component.selection ?? {}).reduce(
      (e, t) => e || t.project.hasSelectionId,
      !1,
    );
  }
  function Lu(e, n) {
    !t.isString(n.select) && n.select.on || delete e.events,
      !t.isString(n.select) && n.select.clear || delete e.clear,
      !t.isString(n.select) && n.select.toggle || delete e.toggle;
  }
  function qu(e) {
    const t = [];
    return "Identifier" === e.type
      ? [e.name]
      : "Literal" === e.type
      ? [e.value]
      : ("MemberExpression" === e.type &&
        (t.push(...qu(e.object)), t.push(...qu(e.property))),
        t);
  }
  function Uu(e) {
    return "MemberExpression" === e.object.type
      ? Uu(e.object)
      : "datum" === e.object.name;
  }
  function Wu(e) {
    const n = t.parseExpression(e), i = new Set();
    return n.visit((e) => {
      "MemberExpression" === e.type && Uu(e) && i.add(qu(e).slice(1).join("."));
    }),
      i;
  }
  class Iu extends yc {
    clone() {
      return new Iu(null, this.model, l(this.filter));
    }
    constructor(e, t, n) {
      super(e),
        this.model = t,
        this.filter = n,
        this.expr = Hu(this.model, this.filter, this),
        this._dependentFields = Wu(this.expr);
    }
    dependentFields() {
      return this._dependentFields;
    }
    producedFields() {
      return new Set();
    }
    assemble() {
      return { type: "filter", expr: this.expr };
    }
    hash() {
      return `Filter ${this.expr}`;
    }
  }
  function Bu(e, n, i) {
    let r = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : "datum";
    const o = t.isString(n) ? n : n.param, a = C(o), s = t.stringValue(a + Pu);
    let l;
    try {
      l = e.getSelectionComponent(a, o);
    } catch (e) {
      return `!!${a}`;
    }
    if (l.project.timeUnit) {
      const t = i ?? e.component.data.raw, n = l.project.timeUnit.clone();
      t.parent ? n.insertAsParentOf(t) : t.parent = n;
    }
    const c = `${
        l.project.hasSelectionId ? "vlSelectionIdTest(" : "vlSelectionTest("
      }${s}, ${r}${
        "global" === l.resolve ? ")" : `, ${t.stringValue(l.resolve)})`
      }`,
      u = `length(data(${s}))`;
    return !1 === n.empty ? `${u} && ${c}` : `!${u} || ${c}`;
  }
  function Vu(e, n, i) {
    const r = C(n), o = i.encoding;
    let a, s = i.field;
    try {
      a = e.getSelectionComponent(r, n);
    } catch (e) {
      return r;
    }
    if (o || s) {
      if (o && !s) {
        const e = a.project.items.filter((e) => e.channel === o);
        !e.length || e.length > 1
          ? (s = a.project.items[0].field,
            yi(
              (e.length ? "Multiple " : "No ") +
                `matching ${t.stringValue(o)} encoding found for selection ${
                  t.stringValue(i.param)
                }. ` + `Using "field": ${t.stringValue(s)}.`,
            ))
          : s = e[0].field;
      }
    } else {s = a.project.items[0].field,
        a.project.items.length > 1 &&
        yi(
          `A "field" or "encoding" must be specified when using a selection as a scale domain. Using "field": ${
            t.stringValue(s)
          }.`,
        );}
    return `${a.name}[${t.stringValue(E(s))}]`;
  }
  function Hu(e, n, i) {
    return N(n, (n) =>
      t.isString(n) ? n : (function (e) {
          return e?.param;
        })(n)
        ? Bu(e, n, i)
        : Xi(n));
  }
  function Gu(e, t, n, i) {
    e.encode ??= {},
      e.encode[t] ??= {},
      e.encode[t].update ??= {},
      e.encode[t].update[n] = i;
  }
  function Yu(e, n, i) {
    let r = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : { header: !1 };
    const {
      disable: o,
      orient: a,
      scale: s,
      labelExpr: l,
      title: c,
      zindex: u,
      ...f
    } = e.combine();
    if (!o) {
      for (const e in f) {
        const i = Fa[e], r = f[e];
        if (i && i !== n && "both" !== i) delete f[e];
        else if (Sa(r)) {
          const { condition: n, ...i } = r, o = t.array(n), a = ka[e];
          if (a) {
            const { vgProp: t, part: n } = a;
            Gu(f, n, t, [
              ...o.map((e) => {
                const { test: t, ...n } = e;
                return { test: Hu(null, t), ...n };
              }),
              i,
            ]), delete f[e];
          } else if (null === a) {
            const t = {
              signal: o.map((e) => {
                const { test: t, ...n } = e;
                return `${Hu(null, t)} ? ${zn(n)} : `;
              }).join("") + zn(i),
            };
            f[e] = t;
          }
        } else if (yn(r)) {
          const t = ka[e];
          if (t) {
            const { vgProp: n, part: i } = t;
            Gu(f, i, n, r), delete f[e];
          }
        }
        p(["labelAlign", "labelBaseline"], e) && null === f[e] && delete f[e];
      }
      if ("grid" === n) {
        if (!f.grid) return;
        if (f.encode) {
          const { grid: e } = f.encode;
          f.encode = { ...e ? { grid: e } : {} },
            S(f.encode) && delete f.encode;
        }
        return {
          scale: s,
          orient: a,
          ...f,
          domain: !1,
          labels: !1,
          aria: !1,
          maxExtent: 0,
          minExtent: 0,
          ticks: !1,
          zindex: q(u, 0),
        };
      }
      {
        if (!r.header && e.mainExtracted) return;
        if (void 0 !== l) {
          let e = l;
          f.encode?.labels?.update && yn(f.encode.labels.update.text) &&
          (e = M(l, "datum.label", f.encode.labels.update.text.signal)),
            Gu(f, "labels", "text", { signal: e });
        }
        if (null === f.labelAlign && delete f.labelAlign, f.encode) {
          for (const t of Da) e.hasAxisPart(t) || delete f.encode[t];
          S(f.encode) && delete f.encode;
        }
        const n = function (e, n) {
          if (e) {
            return t.isArray(e) && !hn(e)
              ? e.map((e) => ua(e, n)).join(", ")
              : e;
          }
        }(c, i);
        return {
          scale: s,
          orient: a,
          grid: !1,
          ...n ? { title: n } : {},
          ...f,
          ...!1 === i.aria ? { aria: !1 } : {},
          zindex: q(u, 0),
        };
      }
    }
  }
  function Xu(e) {
    const { axes: t } = e.component, n = [];
    for (const i of Ft) {
      if (t[i]) {
        for (const r of t[i]) {
          if (!r.get("disable") && !r.get("gridScale")) {
            const t = "x" === i ? "height" : "width",
              r = e.getSizeSignalRef(t).signal;
            t !== r && n.push({ name: t, update: r });
          }
        }
      }
    }
    return n;
  }
  function Qu(e, t, n, i) {
    return Object.assign.apply(null, [
      {},
      ...e.map((e) => {
        if ("axisOrient" === e) {
          const e = "x" === n ? "bottom" : "left",
            r = t["x" === n ? "axisBottom" : "axisLeft"] || {},
            o = t["x" === n ? "axisTop" : "axisRight"] || {},
            a = new Set([...D(r), ...D(o)]),
            s = {};
          for (const t of a.values()) {
            s[t] = {
              signal: `${i.signal} === "${e}" ? ${On(r[t])} : ${On(o[t])}`,
            };
          }
          return s;
        }
        return t[e];
      }),
    ]);
  }
  function Ju(e, n) {
    const i = [{}];
    for (const r of e) {
      let e = n[r]?.style;
      if (e) {
        e = t.array(e);
        for (const t of e) i.push(n.style[t]);
      }
    }
    return Object.assign.apply(null, i);
  }
  function Ku(e, t, n) {
    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const r = Tn(e, n, t);
    if (void 0 !== r) return { configFrom: "style", configValue: r };
    for (const t of ["vlOnlyAxisConfig", "vgAxisConfig", "axisConfigStyle"]) {
      if (void 0 !== i[t]?.[e]) return { configFrom: t, configValue: i[t][e] };
    }
    return {};
  }
  const Zu = {
    scale: (e) => {
      let { model: t, channel: n } = e;
      return t.scaleName(n);
    },
    format: (e) => {
      let { format: t } = e;
      return t;
    },
    formatType: (e) => {
      let { formatType: t } = e;
      return t;
    },
    grid: (e) => {
      let { fieldOrDatumDef: t, axis: n, scaleType: i } = e;
      return n.grid ?? function (e, t) {
        return !hr(e) && Io(t) && !ln(t?.bin) && !cn(t?.bin);
      }(i, t);
    },
    gridScale: (e) => {
      let { model: t, channel: n } = e;
      return function (e, t) {
        const n = "x" === t ? "y" : "x";
        if (e.getScaleComponent(n)) return e.scaleName(n);
        return;
      }(t, n);
    },
    labelAlign: (e) => {
      let { axis: t, labelAngle: n, orient: i, channel: r } = e;
      return t.labelAlign || nf(n, i, r);
    },
    labelAngle: (e) => {
      let { labelAngle: t } = e;
      return t;
    },
    labelBaseline: (e) => {
      let { axis: t, labelAngle: n, orient: i, channel: r } = e;
      return t.labelBaseline || tf(n, i, r);
    },
    labelFlush: (e) => {
      let { axis: t, fieldOrDatumDef: n, channel: i } = e;
      return t.labelFlush ?? function (e, t) {
        if ("x" === t && p(["quantitative", "temporal"], e)) return !0;
        return;
      }(n.type, i);
    },
    labelOverlap: (e) => {
      let { axis: n, fieldOrDatumDef: i, scaleType: r } = e;
      return n.labelOverlap ?? function (e, n, i, r) {
        if (i && !t.isObject(r) || "nominal" !== e && "ordinal" !== e) {
          return "log" !== n && "symlog" !== n || "greedy";
        }
        return;
      }(i.type, r, Io(i) && !!i.timeUnit, Io(i) ? i.sort : void 0);
    },
    orient: (e) => {
      let { orient: t } = e;
      return t;
    },
    tickCount: (e) => {
      let { channel: t, model: n, axis: i, fieldOrDatumDef: r, scaleType: o } =
        e;
      const a = "x" === t ? "width" : "y" === t ? "height" : void 0,
        s = a ? n.getSizeSignalRef(a) : void 0;
      return i.tickCount ?? function (e) {
        let { fieldOrDatumDef: t, scaleType: n, size: i, values: r } = e;
        if (!r && !hr(n) && "log" !== n) {
          if (Io(t)) {
            if (ln(t.bin)) return { signal: `ceil(${i.signal}/10)` };
            if (
              t.timeUnit &&
              p(["month", "hours", "day", "quarter"], Ei(t.timeUnit)?.unit)
            ) return;
          }
          return { signal: `ceil(${i.signal}/40)` };
        }
        return;
      }({ fieldOrDatumDef: r, scaleType: o, size: s, values: i.values });
    },
    tickMinStep: function (e) {
      let { format: t, fieldOrDatumDef: n } = e;
      if ("d" === t) return 1;
      if (Io(n)) {
        const { timeUnit: e } = n;
        if (e) {
          const t = Mi(e);
          if (t) return { signal: t };
        }
      }
      return;
    },
    title: (e) => {
      let { axis: t, model: n, channel: i } = e;
      if (void 0 !== t.title) return t.title;
      const r = rf(n, i);
      if (void 0 !== r) return r;
      const o = n.typedFieldDef(i),
        a = "x" === i ? "x2" : "y2",
        s = n.fieldDef(a);
      return En(o ? [To(o)] : [], Io(s) ? [To(s)] : []);
    },
    values: (e) => {
      let { axis: n, fieldOrDatumDef: i } = e;
      return function (e, n) {
        const i = e.values;
        if (t.isArray(i)) return $a(n, i);
        if (yn(i)) return i;
        return;
      }(n, i);
    },
    zindex: (e) => {
      let { axis: t, fieldOrDatumDef: n, mark: i } = e;
      return t.zindex ?? function (e, t) {
        if ("rect" === e && ra(t)) return 1;
        return 0;
      }(i, n);
    },
  };
  function ef(e) {
    return `(((${e.signal} % 360) + 360) % 360)`;
  }
  function tf(e, t, n, i) {
    if (void 0 !== e) {
      if ("x" === n) {
        if (yn(e)) {
          const n = ef(e);
          return {
            signal:
              `(45 < ${n} && ${n} < 135) || (225 < ${n} && ${n} < 315) ? "middle" :(${n} <= 45 || 315 <= ${n}) === ${
                yn(t) ? `(${t.signal} === "top")` : "top" === t
              } ? "bottom" : "top"`,
          };
        }
        if (45 < e && e < 135 || 225 < e && e < 315) return "middle";
        if (yn(t)) {
          const n = e <= 45 || 315 <= e ? "===" : "!==";
          return { signal: `${t.signal} ${n} "top" ? "bottom" : "top"` };
        }
        return (e <= 45 || 315 <= e) == ("top" === t) ? "bottom" : "top";
      }
      if (yn(e)) {
        const n = ef(e);
        return {
          signal:
            `${n} <= 45 || 315 <= ${n} || (135 <= ${n} && ${n} <= 225) ? ${
              i ? '"middle"' : "null"
            } : (45 <= ${n} && ${n} <= 135) === ${
              yn(t) ? `(${t.signal} === "left")` : "left" === t
            } ? "top" : "bottom"`,
        };
      }
      if (e <= 45 || 315 <= e || 135 <= e && e <= 225) {
        return i ? "middle" : null;
      }
      if (yn(t)) {
        const n = 45 <= e && e <= 135 ? "===" : "!==";
        return { signal: `${t.signal} ${n} "left" ? "top" : "bottom"` };
      }
      return (45 <= e && e <= 135) == ("left" === t) ? "top" : "bottom";
    }
  }
  function nf(e, t, n) {
    if (void 0 === e) return;
    const i = "x" === n, r = i ? 0 : 90, o = i ? "bottom" : "left";
    if (yn(e)) {
      const n = ef(e);
      return {
        signal: `(${r ? `(${n} + 90)` : n} % 180 === 0) ? ${
          i ? null : '"center"'
        } :(${r} < ${n} && ${n} < ${180 + r}) === ${
          yn(t) ? `(${t.signal} === "${o}")` : t === o
        } ? "left" : "right"`,
      };
    }
    if ((e + r) % 180 == 0) return i ? null : "center";
    if (yn(t)) {
      const n = r < e && e < 180 + r ? "===" : "!==";
      return { signal: `${`${t.signal} ${n} "${o}"`} ? "left" : "right"` };
    }
    return (r < e && e < 180 + r) == (t === o) ? "left" : "right";
  }
  function rf(e, t) {
    const n = "x" === t ? "x2" : "y2",
      i = e.fieldDef(t),
      r = e.fieldDef(n),
      o = i ? i.title : void 0,
      a = r ? r.title : void 0;
    return o && a
      ? Mn(o, a)
      : o || (a || (void 0 !== o ? o : void 0 !== a ? a : void 0));
  }
  class of extends yc {
    clone() {
      return new of(null, l(this.transform));
    }
    constructor(e, t) {
      super(e),
        this.transform = t,
        this._dependentFields = Wu(this.transform.calculate);
    }
    static parseAllForSortIndex(e, t) {
      return t.forEachFieldDef((t, n) => {
        if (Ko(t) && No(t.sort)) {
          const { field: i, timeUnit: r } = t,
            o = t.sort,
            a = o.map((e, t) =>
              `${Xi({ field: i, timeUnit: r, equal: e })} ? ${t} : `
            ).join("") +
              o.length;
          e = new of(e, { calculate: a, as: af(t, n, { forAs: !0 }) });
        }
      }),
        e;
    }
    producedFields() {
      return new Set([this.transform.as]);
    }
    dependentFields() {
      return this._dependentFields;
    }
    assemble() {
      return {
        type: "formula",
        expr: this.transform.calculate,
        as: this.transform.as,
      };
    }
    hash() {
      return `Calculate ${d(this.transform)}`;
    }
  }
  function af(e, t, n) {
    return ia(e, { prefix: t, suffix: "sort_index", ...n });
  }
  function sf(e, t) {
    return p(["top", "bottom"], t)
      ? "column"
      : p(["left", "right"], t) || "row" === e
      ? "row"
      : "column";
  }
  function lf(e, t, n, i) {
    const r = "row" === i
      ? n.headerRow
      : "column" === i
      ? n.headerColumn
      : n.headerFacet;
    return q((t || {})[e], r[e], n.header[e]);
  }
  function cf(e, t, n, i) {
    const r = {};
    for (const o of e) {
      const e = lf(o, t || {}, n, i);
      void 0 !== e && (r[o] = e);
    }
    return r;
  }
  const uf = ["row", "column"], ff = ["header", "footer"];
  function df(e, t) {
    const n = e.component.layoutHeaders[t].title,
      i = e.config ? e.config : void 0,
      r = e.component.layoutHeaders[t].facetFieldDef
        ? e.component.layoutHeaders[t].facetFieldDef
        : void 0,
      { titleAnchor: o, titleAngle: a, titleOrient: s } = cf(
        ["titleAnchor", "titleAngle", "titleOrient"],
        r.header,
        i,
        t,
      ),
      l = sf(t, s),
      c = V(a);
    return {
      name: `${t}-title`,
      type: "group",
      role: `${l}-title`,
      title: {
        text: n,
        ..."row" === t ? { orient: "left" } : {},
        style: "guide-title",
        ...pf(c, l),
        ...mf(l, c, o),
        ...$f(i, r, t, ps, ds),
      },
    };
  }
  function mf(e, t) {
    switch (
      arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "middle"
    ) {
      case "start":
        return { align: "left" };
      case "end":
        return { align: "right" };
    }
    const n = nf(t, "row" === e ? "left" : "top", "row" === e ? "y" : "x");
    return n ? { align: n } : {};
  }
  function pf(e, t) {
    const n = tf(e, "row" === t ? "left" : "top", "row" === t ? "y" : "x", !0);
    return n ? { baseline: n } : {};
  }
  function gf(e, t) {
    const n = e.component.layoutHeaders[t], i = [];
    for (const r of ff) {
      if (n[r]) {
        for (const o of n[r]) {
          const a = vf(e, t, r, n, o);
          null != a && i.push(a);
        }
      }
    }
    return i;
  }
  function hf(e, n) {
    const { sort: i } = e;
    return Co(i)
      ? { field: ia(i, { expr: "datum" }), order: i.order ?? "ascending" }
      : t.isArray(i)
      ? { field: af(e, n, { expr: "datum" }), order: "ascending" }
      : { field: ia(e, { expr: "datum" }), order: i ?? "ascending" };
  }
  function yf(e, t, n) {
    const {
        format: i,
        formatType: r,
        labelAngle: o,
        labelAnchor: a,
        labelOrient: s,
        labelExpr: l,
      } = cf(
        [
          "format",
          "formatType",
          "labelAngle",
          "labelAnchor",
          "labelOrient",
          "labelExpr",
        ],
        e.header,
        n,
        t,
      ),
      c = yo({
        fieldOrDatumDef: e,
        format: i,
        formatType: r,
        expr: "parent",
        config: n,
      }).signal,
      u = sf(t, s);
    return {
      text: {
        signal: l
          ? M(M(l, "datum.label", c), "datum.value", ia(e, { expr: "parent" }))
          : c,
      },
      ..."row" === t ? { orient: "left" } : {},
      style: "guide-label",
      frame: "group",
      ...pf(o, u),
      ...mf(u, o, a),
      ...$f(n, e, t, gs, ms),
    };
  }
  function vf(e, t, n, i, r) {
    if (r) {
      let o = null;
      const { facetFieldDef: a } = i, s = e.config ? e.config : void 0;
      if (a && r.labels) {
        const { labelOrient: e } = cf(["labelOrient"], a.header, s, t);
        ("row" === t && !p(["top", "bottom"], e) ||
          "column" === t && !p(["left", "right"], e)) && (o = yf(a, t, s));
      }
      const l = $m(e) && !_o(e.facet), c = r.axes, u = c?.length > 0;
      if (o || u) {
        const s = "row" === t ? "height" : "width";
        return {
          name: e.getName(`${t}_${n}`),
          type: "group",
          role: `${t}-${n}`,
          ...i.facetFieldDef
            ? { from: { data: e.getName(`${t}_domain`) }, sort: hf(a, t) }
            : {},
          ...u && l ? { from: { data: e.getName(`facet_domain_${t}`) } } : {},
          ...o ? { title: o } : {},
          ...r.sizeSignal ? { encode: { update: { [s]: r.sizeSignal } } } : {},
          ...u ? { axes: c } : {},
        };
      }
    }
    return null;
  }
  const bf = { column: { start: 0, end: 1 }, row: { start: 1, end: 0 } };
  function xf(e, t) {
    return bf[t][e];
  }
  function $f(e, t, n, i, r) {
    const o = {};
    for (const a of i) {
      if (!r[a]) continue;
      const i = lf(a, t?.header, e, n);
      void 0 !== i && (o[r[a]] = i);
    }
    return o;
  }
  function wf(e) {
    return [
      ...kf(e, "width"),
      ...kf(e, "height"),
      ...kf(e, "childWidth"),
      ...kf(e, "childHeight"),
    ];
  }
  function kf(e, t) {
    const n = "width" === t ? "x" : "y", i = e.component.layoutSize.get(t);
    if (!i || "merged" === i) return [];
    const r = e.getSizeSignalRef(t).signal;
    if ("step" === i) {
      const t = e.getScaleComponent(n);
      if (t) {
        const i = t.get("type"), o = t.get("range");
        if (hr(i) && vn(o)) {
          const i = e.scaleName(n);
          if ($m(e.parent)) {
            if ("independent" === e.parent.component.resolve.scale[n]) {
              return [Sf(i, o)];
            }
          }
          return [Sf(i, o), {
            name: r,
            update: Df(i, t, `domain('${i}').length`),
          }];
        }
      }
      throw new Error("layout size is step although width/height is not step.");
    }
    if ("container" == i) {
      const t = r.endsWith("width"),
        n = t ? "containerSize()[0]" : "containerSize()[1]",
        i = `isFinite(${n}) ? ${n} : ${
          _s(e.config.view, t ? "width" : "height")
        }`;
      return [{
        name: r,
        init: i,
        on: [{ update: i, events: "window:resize" }],
      }];
    }
    return [{ name: r, value: i }];
  }
  function Sf(e, t) {
    const n = `${e}_step`;
    return yn(t.step)
      ? { name: n, update: t.step.signal }
      : { name: n, value: t.step };
  }
  function Df(e, t, n) {
    const i = t.get("type"),
      r = t.get("padding"),
      o = q(t.get("paddingOuter"), r);
    let a = t.get("paddingInner");
    return a = "band" === i ? void 0 !== a ? a : r : 1,
      `bandspace(${n}, ${On(a)}, ${On(o)}) * ${e}_step`;
  }
  function Ff(e) {
    return "childWidth" === e ? "width" : "childHeight" === e ? "height" : e;
  }
  function zf(e, t) {
    return D(e).reduce(
      (n, i) => ({
        ...n,
        ...Lc({
          model: t,
          channelDef: e[i],
          vgChannel: i,
          mainRefFn: (e) => Fn(e.value),
          invalidValueRef: void 0,
        }),
      }),
      {},
    );
  }
  function Of(e, t) {
    if ($m(t)) return "theta" === e ? "independent" : "shared";
    if (km(t)) return "shared";
    if (wm(t)) {
      return zt(e) || "theta" === e || "radius" === e
        ? "independent"
        : "shared";
    }
    throw new Error("invalid model type for resolve");
  }
  function Cf(e, t) {
    const n = e.scale[t], i = zt(t) ? "axis" : "legend";
    return "independent" === n
      ? ("shared" === e[i][t] && yi(function (e) {
        return `Setting the scale to be independent for "${e}" means we also have to set the guide (axis or legend) to be independent.`;
      }(t)),
        "independent")
      : e[i][t] || "shared";
  }
  const Nf = D({
    aria: 1,
    clipHeight: 1,
    columnPadding: 1,
    columns: 1,
    cornerRadius: 1,
    description: 1,
    direction: 1,
    fillColor: 1,
    format: 1,
    formatType: 1,
    gradientLength: 1,
    gradientOpacity: 1,
    gradientStrokeColor: 1,
    gradientStrokeWidth: 1,
    gradientThickness: 1,
    gridAlign: 1,
    labelAlign: 1,
    labelBaseline: 1,
    labelColor: 1,
    labelFont: 1,
    labelFontSize: 1,
    labelFontStyle: 1,
    labelFontWeight: 1,
    labelLimit: 1,
    labelOffset: 1,
    labelOpacity: 1,
    labelOverlap: 1,
    labelPadding: 1,
    labelSeparation: 1,
    legendX: 1,
    legendY: 1,
    offset: 1,
    orient: 1,
    padding: 1,
    rowPadding: 1,
    strokeColor: 1,
    symbolDash: 1,
    symbolDashOffset: 1,
    symbolFillColor: 1,
    symbolLimit: 1,
    symbolOffset: 1,
    symbolOpacity: 1,
    symbolSize: 1,
    symbolStrokeColor: 1,
    symbolStrokeWidth: 1,
    symbolType: 1,
    tickCount: 1,
    tickMinStep: 1,
    title: 1,
    titleAlign: 1,
    titleAnchor: 1,
    titleBaseline: 1,
    titleColor: 1,
    titleFont: 1,
    titleFontSize: 1,
    titleFontStyle: 1,
    titleFontWeight: 1,
    titleLimit: 1,
    titleLineHeight: 1,
    titleOpacity: 1,
    titleOrient: 1,
    titlePadding: 1,
    type: 1,
    values: 1,
    zindex: 1,
    disable: 1,
    labelExpr: 1,
    selections: 1,
    opacity: 1,
    shape: 1,
    stroke: 1,
    fill: 1,
    size: 1,
    strokeWidth: 1,
    strokeDash: 1,
    encode: 1,
  });
  class _f extends Xl {}
  const Pf = {
    symbols: function (e, n) {
      let {
        fieldOrDatumDef: i,
        model: r,
        channel: o,
        legendCmpt: a,
        legendType: s,
      } = n;
      if ("symbol" !== s) return;
      const { markDef: l, encoding: c, config: u, mark: f } = r,
        d = l.filled && "trail" !== f;
      let m = { ...Cn({}, r, Qr), ...Xc(r, { filled: d }) };
      const p = a.get("symbolOpacity") ?? u.legend.symbolOpacity,
        g = a.get("symbolFillColor") ?? u.legend.symbolFillColor,
        h = a.get("symbolStrokeColor") ?? u.legend.symbolStrokeColor,
        y = void 0 === p ? Af(c.opacity) ?? l.opacity : void 0;
      if (m.fill) {
        if ("fill" === o || d && o === me) delete m.fill;
        else if (m.fill.field) {
          g
            ? delete m.fill
            : (m.fill = Fn(u.legend.symbolBaseFillColor ?? "black"),
              m.fillOpacity = Fn(y ?? 1));
        } else if (t.isArray(m.fill)) {
          const e = Tf(c.fill ?? c.color) ?? l.fill ?? (d && l.color);
          e && (m.fill = Fn(e));
        }
      }
      if (m.stroke) {
        if ("stroke" === o || !d && o === me) delete m.stroke;
        else if (m.stroke.field || h) delete m.stroke;
        else if (t.isArray(m.stroke)) {
          const e = q(Tf(c.stroke || c.color), l.stroke, d ? l.color : void 0);
          e && (m.stroke = { value: e });
        }
      }
      if (o !== be) {
        const e = Io(i) && Ef(r, a, i);
        e
          ? m.opacity = [
            { test: e, ...Fn(y ?? 1) },
            Fn(u.legend.unselectedOpacity),
          ]
          : y && (m.opacity = Fn(y));
      }
      return m = { ...m, ...e }, S(m) ? void 0 : m;
    },
    gradient: function (e, t) {
      let { model: n, legendType: i, legendCmpt: r } = t;
      if ("gradient" !== i) return;
      const { config: o, markDef: a, encoding: s } = n;
      let l = {};
      const c =
        void 0 === (r.get("gradientOpacity") ?? o.legend.gradientOpacity)
          ? Af(s.opacity) || a.opacity
          : void 0;
      c && (l.opacity = Fn(c));
      return l = { ...l, ...e }, S(l) ? void 0 : l;
    },
    labels: function (e, t) {
      let { fieldOrDatumDef: n, model: i, channel: r, legendCmpt: o } = t;
      const a = i.legend(r) || {},
        s = i.config,
        l = Io(n) ? Ef(i, o, n) : void 0,
        c = l
          ? [{ test: l, value: 1 }, { value: s.legend.unselectedOpacity }]
          : void 0,
        { format: u, formatType: f } = a;
      let d;
      po(f)
        ? d = bo({
          fieldOrDatumDef: n,
          field: "datum.value",
          format: u,
          formatType: f,
          config: s,
        })
        : void 0 === u && void 0 === f && s.customFormatTypes &&
          ("quantitative" === n.type && s.numberFormatType
            ? d = bo({
              fieldOrDatumDef: n,
              field: "datum.value",
              format: s.numberFormat,
              formatType: s.numberFormatType,
              config: s,
            })
            : "temporal" === n.type && s.timeFormatType && Io(n) &&
              void 0 === n.timeUnit &&
              (d = bo({
                fieldOrDatumDef: n,
                field: "datum.value",
                format: s.timeFormat,
                formatType: s.timeFormatType,
                config: s,
              })));
      const m = { ...c ? { opacity: c } : {}, ...d ? { text: d } : {}, ...e };
      return S(m) ? void 0 : m;
    },
    entries: function (e, t) {
      let { legendCmpt: n } = t;
      const i = n.get("selections");
      return i?.length ? { ...e, fill: { value: "transparent" } } : e;
    },
  };
  function Af(e) {
    return jf(e, (e, t) => Math.max(e, t.value));
  }
  function Tf(e) {
    return jf(e, (e, t) => q(e, t.value));
  }
  function jf(e, n) {
    return (function (e) {
        const n = e?.condition;
        return !!n && (t.isArray(n) || Jo(n));
      })(e)
      ? t.array(e.condition).reduce(n, e.value)
      : Jo(e)
      ? e.value
      : void 0;
  }
  function Ef(e, n, i) {
    const r = n.get("selections");
    if (!r?.length) return;
    const o = t.stringValue(i.field);
    return r.map(
      (e) =>
        `(!length(data(${
          t.stringValue(C(e) + Pu)
        })) || (${e}[${o}] && indexof(${e}[${o}], datum.value) >= 0))`,
    ).join(" || ");
  }
  const Mf = {
    direction: (e) => {
      let { direction: t } = e;
      return t;
    },
    format: (e) => {
      let { fieldOrDatumDef: t, legend: n, config: i } = e;
      const { format: r, formatType: o } = n;
      return xo(t, t.type, r, o, i, !1);
    },
    formatType: (e) => {
      let { legend: t, fieldOrDatumDef: n, scaleType: i } = e;
      const { formatType: r } = t;
      return $o(r, n, i);
    },
    gradientLength: (e) => {
      const { legend: t, legendConfig: n } = e;
      return t.gradientLength ?? n.gradientLength ?? function (e) {
        let {
          legendConfig: t,
          model: n,
          direction: i,
          orient: r,
          scaleType: o,
        } = e;
        const {
          gradientHorizontalMaxLength: a,
          gradientHorizontalMinLength: s,
          gradientVerticalMaxLength: l,
          gradientVerticalMinLength: c,
        } = t;
        if (vr(o)) {
          return "horizontal" === i
            ? "top" === r || "bottom" === r ? qf(n, "width", s, a) : s
            : qf(n, "height", c, l);
        }
        return;
      }(e);
    },
    labelOverlap: (e) => {
      let { legend: t, legendConfig: n, scaleType: i } = e;
      return t.labelOverlap ?? n.labelOverlap ?? function (e) {
        if (p(["quantile", "threshold", "log", "symlog"], e)) return "greedy";
        return;
      }(i);
    },
    symbolType: (e) => {
      let { legend: t, markDef: n, channel: i, encoding: r } = e;
      return t.symbolType ?? function (e, t, n, i) {
        if ("shape" !== t) {
          const e = Tf(n) ?? i;
          if (e) return e;
        }
        switch (e) {
          case "bar":
          case "rect":
          case "image":
          case "square":
            return "square";
          case "line":
          case "trail":
          case "rule":
            return "stroke";
          case "arc":
          case "point":
          case "circle":
          case "tick":
          case "geoshape":
          case "area":
          case "text":
            return "circle";
        }
      }(n.type, i, r.shape, n.shape);
    },
    title: (e) => {
      let { fieldOrDatumDef: t, config: n } = e;
      return la(t, n, { allowDisabling: !0 });
    },
    type: (e) => {
      let { legendType: t, scaleType: n, channel: i } = e;
      if (Le(i) && vr(n)) { if ("gradient" === t) return; }
      else if ("symbol" === t) return;
      return t;
    },
    values: (e) => {
      let { fieldOrDatumDef: n, legend: i } = e;
      return function (e, n) {
        const i = e.values;
        if (t.isArray(i)) return $a(n, i);
        if (yn(i)) return i;
        return;
      }(i, n);
    },
  };
  function Rf(e) {
    const { legend: t } = e;
    return q(
      t.type,
      function (e) {
        let { channel: t, timeUnit: n, scaleType: i } = e;
        if (Le(t)) {
          if (p(["quarter", "month", "day"], n)) return "symbol";
          if (vr(i)) return "gradient";
        }
        return "symbol";
      }(e),
    );
  }
  function Lf(e) {
    let { legendConfig: t, legendType: n, orient: i, legend: r } = e;
    return r.direction ?? t[n ? "gradientDirection" : "symbolDirection"] ??
      function (e, t) {
        switch (e) {
          case "top":
          case "bottom":
            return "horizontal";
          case "left":
          case "right":
          case "none":
          case void 0:
            return;
          default:
            return "gradient" === t ? "horizontal" : void 0;
        }
      }(i, n);
  }
  function qf(e, t, n, i) {
    return { signal: `clamp(${e.getSizeSignalRef(t).signal}, ${n}, ${i})` };
  }
  function Uf(e) {
    const t = xm(e)
      ? function (e) {
        const { encoding: t } = e, n = {};
        for (const i of [me, ...ys]) {
          const r = ma(t[i]);
          r && e.getScaleComponent(i) &&
            (i === he && Io(r) && r.type === rr || (n[i] = If(e, i)));
        }
        return n;
      }(e)
      : function (e) {
        const { legends: t, resolve: n } = e.component;
        for (const i of e.children) {
          Uf(i);
          for (const r of D(i.component.legends)) {
            n.legend[r] = Cf(e.component.resolve, r),
              "shared" === n.legend[r] &&
              (t[r] = Bf(t[r], i.component.legends[r]),
                t[r] || (n.legend[r] = "independent", delete t[r]));
          }
        }
        for (const i of D(t)) {
          for (const t of e.children) {
            t.component.legends[i] && "shared" === n.legend[i] &&
              delete t.component.legends[i];
          }
        }
        return t;
      }(e);
    return e.component.legends = t, t;
  }
  function Wf(e, t, n, i) {
    switch (t) {
      case "disable":
        return void 0 !== n;
      case "values":
        return !!n?.values;
      case "title":
        if ("title" === t && e === i?.title) return !0;
    }
    return e === (n || {})[t];
  }
  function If(e, t) {
    let n = e.legend(t);
    const { markDef: i, encoding: r, config: o } = e,
      a = o.legend,
      s = new _f(
        {},
        function (e, t) {
          const n = e.scaleName(t);
          if ("trail" === e.mark) {
            if ("color" === t) return { stroke: n };
            if ("size" === t) return { strokeWidth: n };
          }
          return "color" === t
            ? e.markDef.filled ? { fill: n } : { stroke: n }
            : { [t]: n };
        }(e, t),
      );
    !function (e, t, n) {
      const i = e.fieldDef(t)?.field;
      for (const r of F(e.component.selection ?? {})) {
        const e = r.project.hasField[i] ?? r.project.hasChannel[t];
        if (e && ku.defined(r)) {
          const t = n.get("selections") ?? [];
          t.push(r.name), n.set("selections", t, !1), e.hasLegend = !0;
        }
      }
    }(e, t, s);
    const l = void 0 !== n ? !n : a.disable;
    if (s.set("disable", l, void 0 !== n), l) return s;
    n = n || {};
    const c = e.getScaleComponent(t).get("type"),
      u = ma(r[t]),
      f = Io(u) ? Ei(u.timeUnit)?.unit : void 0,
      d = n.orient || o.legend.orient || "right",
      m = Rf({ legend: n, channel: t, timeUnit: f, scaleType: c }),
      p = {
        legend: n,
        channel: t,
        model: e,
        markDef: i,
        encoding: r,
        fieldOrDatumDef: u,
        legendConfig: a,
        config: o,
        scaleType: c,
        orient: d,
        legendType: m,
        direction: Lf({ legend: n, legendType: m, orient: d, legendConfig: a }),
      };
    for (const i of Nf) {
      if (
        "gradient" === m && i.startsWith("symbol") ||
        "symbol" === m && i.startsWith("gradient")
      ) continue;
      const r = i in Mf ? Mf[i](p) : n[i];
      if (void 0 !== r) {
        const a = Wf(r, i, n, e.fieldDef(t));
        (a || void 0 === o.legend[i]) && s.set(i, r, a);
      }
    }
    const g = n?.encoding ?? {},
      h = s.get("selections"),
      y = {},
      v = {
        fieldOrDatumDef: u,
        model: e,
        channel: t,
        legendCmpt: s,
        legendType: m,
      };
    for (
      const t of ["labels", "legend", "title", "symbols", "gradient", "entries"]
    ) {
      const n = zf(g[t] ?? {}, e), i = t in Pf ? Pf[t](n, v) : n;
      void 0 === i || S(i) ||
        (y[t] = {
          ...h?.length && Io(u) ? { name: `${C(u.field)}_legend_${t}` } : {},
          ...h?.length ? { interactive: !!h } : {},
          update: i,
        });
    }
    return S(y) || s.set("encode", y, !!n?.encoding), s;
  }
  function Bf(e, t) {
    if (!e) return t.clone();
    const n = e.getWithExplicit("orient"), i = t.getWithExplicit("orient");
    if (n.explicit && i.explicit && n.value !== i.value) return;
    let r = !1;
    for (const n of Nf) {
      const i = ec(
        e.getWithExplicit(n),
        t.getWithExplicit(n),
        n,
        "legend",
        (e, t) => {
          switch (n) {
            case "symbolType":
              return Vf(e, t);
            case "title":
              return Rn(e, t);
            case "type":
              return r = !0, Jl("symbol");
          }
          return Zl(e, t, n, "legend");
        },
      );
      e.setWithExplicit(n, i);
    }
    return r &&
      (e.implicit?.encode?.gradient && _(e.implicit, ["encode", "gradient"]),
        e.explicit?.encode?.gradient && _(e.explicit, ["encode", "gradient"])),
      e;
  }
  function Vf(e, t) {
    return "circle" === t.value ? t : e;
  }
  function Hf(e) {
    const t = e.component.legends, n = {};
    for (const i of D(t)) {
      const r = X(e.getScaleComponent(i).get("domains"));
      if (n[r]) { for (const e of n[r]) Bf(e, t[i]) || n[r].push(t[i]); }
      else n[r] = [t[i].clone()];
    }
    return F(n).flat().map((t) =>
      function (e, t) {
        const { disable: n, labelExpr: i, selections: r, ...o } = e.combine();
        if (n) return;
        !1 === t.aria && null == o.aria && (o.aria = !1);
        if (o.encode?.symbols) {
          const e = o.encode.symbols.update;
          !e.fill || "transparent" === e.fill.value || e.stroke || o.stroke ||
            (e.stroke = { value: "transparent" });
          for (const t of ys) o[t] && delete e[t];
        }
        o.title || delete o.title;
        if (void 0 !== i) {
          let e = i;
          o.encode?.labels?.update && yn(o.encode.labels.update.text) &&
          (e = M(i, "datum.label", o.encode.labels.update.text.signal)),
            function (e, t, n, i) {
              e.encode ??= {},
                e.encode[t] ??= {},
                e.encode[t].update ??= {},
                e.encode[t].update[n] = i;
            }(o, "labels", "text", { signal: e });
        }
        return o;
      }(t, e.config)
    ).filter((e) => void 0 !== e);
  }
  function Gf(e) {
    return km(e) || wm(e)
      ? function (e) {
        return e.children.reduce(
          (e, t) => e.concat(t.assembleProjections()),
          Yf(e),
        );
      }(e)
      : Yf(e);
  }
  function Yf(e) {
    const t = e.component.projection;
    if (!t || t.merged) return [];
    const n = t.combine(), { name: i } = n;
    if (t.data) {
      const r = { signal: `[${t.size.map((e) => e.signal).join(", ")}]` },
        o = t.data.reduce((t, n) => {
          const i = yn(n) ? n.signal : `data('${e.lookupDataSource(n)}')`;
          return p(t, i) || t.push(i), t;
        }, []);
      if (o.length <= 0) {
        throw new Error("Projection's fit didn't find any data sources");
      }
      return [{
        name: i,
        size: r,
        fit: { signal: o.length > 1 ? `[${o.join(", ")}]` : o[0] },
        ...n,
      }];
    }
    return [{
      name: i,
      translate: { signal: "[width / 2, height / 2]" },
      ...n,
    }];
  }
  const Xf = [
    "type",
    "clipAngle",
    "clipExtent",
    "center",
    "rotate",
    "precision",
    "reflectX",
    "reflectY",
    "coefficient",
    "distance",
    "fraction",
    "lobes",
    "parallel",
    "radius",
    "ratio",
    "spacing",
    "tilt",
  ];
  class Qf extends Xl {
    merged = !1;
    constructor(e, t, n, i) {
      super({ ...t }, { name: e }),
        this.specifiedProjection = t,
        this.size = n,
        this.data = i;
    }
    get isFit() {
      return !!this.data;
    }
  }
  function Jf(e) {
    e.component.projection = xm(e)
      ? function (e) {
        if (e.hasProjection) {
          const t = pn(e.specifiedProjection),
            n = !(t && (null != t.scale || null != t.translate)),
            i = n
              ? [e.getSizeSignalRef("width"), e.getSizeSignalRef("height")]
              : void 0,
            r = n
              ? function (e) {
                const t = [], { encoding: n } = e;
                for (const i of [[ue, ce], [de, fe]]) {
                  (ma(n[i[0]]) || ma(n[i[1]])) &&
                    t.push({ signal: e.getName(`geojson_${t.length}`) });
                }
                e.channelHasField(he) && e.typedFieldDef(he).type === rr &&
                  t.push({ signal: e.getName(`geojson_${t.length}`) });
                0 === t.length && t.push(e.requestDataName(cc.Main));
                return t;
              }(e)
              : void 0,
            o = new Qf(
              e.projectionName(!0),
              { ...pn(e.config.projection), ...t },
              i,
              r,
            );
          return o.get("type") || o.set("type", "equalEarth", !1), o;
        }
        return;
      }(e)
      : function (e) {
        if (0 === e.children.length) return;
        let n;
        for (const t of e.children) Jf(t);
        const i = h(e.children, (e) => {
          const i = e.component.projection;
          if (i) {
            if (n) {
              const e = function (e, n) {
                const i = h(
                  Xf,
                  (i) =>
                    !t.hasOwnProperty(e.explicit, i) &&
                      !t.hasOwnProperty(n.explicit, i) ||
                    !!(t.hasOwnProperty(e.explicit, i) &&
                      t.hasOwnProperty(n.explicit, i) && Y(e.get(i), n.get(i))),
                );
                if (Y(e.size, n.size)) {
                  if (i) return e;
                  if (Y(e.explicit, {})) return n;
                  if (Y(n.explicit, {})) return e;
                }
                return null;
              }(n, i);
              return e && (n = e), !!e;
            }
            return n = i, !0;
          }
          return !0;
        });
        if (n && i) {
          const t = e.projectionName(!0),
            i = new Qf(t, n.specifiedProjection, n.size, l(n.data));
          for (const n of e.children) {
            const e = n.component.projection;
            e &&
              (e.isFit && i.data.push(...n.component.projection.data),
                n.renameProjection(e.get("name"), t),
                e.merged = !0);
          }
          return i;
        }
        return;
      }(e);
  }
  function Kf(e, t, n, i) {
    if (wa(t, n)) {
      const r = xm(e) ? e.axis(n) ?? e.legend(n) ?? {} : {},
        o = ia(t, { expr: "datum" }),
        a = ia(t, { expr: "datum", binSuffix: "end" });
      return {
        formulaAs: ia(t, { binSuffix: "range", forAs: !0 }),
        formula: Do(o, a, r.format, r.formatType, i),
      };
    }
    return {};
  }
  function Zf(e, t) {
    return `${sn(e)}_${t}`;
  }
  function ed(e, t, n) {
    const i = Zf(ya(n, void 0) ?? {}, t);
    return e.getName(`${i}_bins`);
  }
  function td(e, n, i) {
    let r, o;
    r = (function (e) {
        return "as" in e;
      })(e)
      ? t.isString(e.as) ? [e.as, `${e.as}_end`] : [e.as[0], e.as[1]]
      : [ia(e, { forAs: !0 }), ia(e, { binSuffix: "end", forAs: !0 })];
    const a = { ...ya(n, void 0) },
      s = Zf(a, e.field),
      { signal: l, extentSignal: c } = function (e, t) {
        return {
          signal: e.getName(`${t}_bins`),
          extentSignal: e.getName(`${t}_extent`),
        };
      }(i, s);
    if (fn(a.extent)) {
      const e = a.extent;
      o = Vu(i, e.param, e), delete a.extent;
    }
    return {
      key: s,
      binComponent: {
        bin: a,
        field: e.field,
        as: [r],
        ...l ? { signal: l } : {},
        ...c ? { extentSignal: c } : {},
        ...o ? { span: o } : {},
      },
    };
  }
  class nd extends yc {
    clone() {
      return new nd(null, l(this.bins));
    }
    constructor(e, t) {
      super(e), this.bins = t;
    }
    static makeFromEncoding(e, t) {
      const n = t.reduceFieldDef((e, n, i) => {
        if (Qo(n) && ln(n.bin)) {
          const { key: r, binComponent: o } = td(n, n.bin, t);
          e[r] = { ...o, ...e[r], ...Kf(t, n, i, t.config) };
        }
        return e;
      }, {});
      return S(n) ? null : new nd(e, n);
    }
    static makeFromTransform(e, t, n) {
      const { key: i, binComponent: r } = td(t, t.bin, n);
      return new nd(e, { [i]: r });
    }
    merge(e, t) {
      for (const n of D(e.bins)) {
        n in this.bins
          ? (t(e.bins[n].signal, this.bins[n].signal),
            this.bins[n].as = b([...this.bins[n].as, ...e.bins[n].as], d))
          : this.bins[n] = e.bins[n];
      }
      for (const t of e.children) e.removeChild(t), t.parent = this;
      e.remove();
    }
    producedFields() {
      return new Set(F(this.bins).map((e) => e.as).flat(2));
    }
    dependentFields() {
      return new Set(F(this.bins).map((e) => e.field));
    }
    hash() {
      return `Bin ${d(this.bins)}`;
    }
    assemble() {
      return F(this.bins).flatMap((e) => {
        const t = [],
          [n, ...i] = e.as,
          { extent: r, ...o } = e.bin,
          a = {
            type: "bin",
            field: E(e.field),
            as: n,
            signal: e.signal,
            ...fn(r) ? { extent: null } : { extent: r },
            ...e.span ? { span: { signal: `span(${e.span})` } } : {},
            ...o,
          };
        !r && e.extentSignal &&
        (t.push({ type: "extent", field: E(e.field), signal: e.extentSignal }),
          a.extent = { signal: e.extentSignal }), t.push(a);
        for (const e of i) {
          for (let i = 0; i < 2; i++) {
            t.push({
              type: "formula",
              expr: ia({ field: n[i] }, { expr: "datum" }),
              as: e[i],
            });
          }
        }
        return e.formula &&
          t.push({ type: "formula", expr: e.formula, as: e.formulaAs }),
          t;
      });
    }
  }
  function id(e, n, i, r) {
    const o = xm(r) ? r.encoding[it(n)] : void 0;
    if (Qo(i) && xm(r) && Ro(i, o, r.markDef, r.config)) {
      e.add(ia(i, {})), e.add(ia(i, { suffix: "end" }));
      const { mark: t, markDef: o, config: a } = r,
        s = Eo({ fieldDef: i, markDef: o, config: a });
      Gr(t) && .5 !== s && zt(n) &&
      (e.add(ia(i, { suffix: wc })), e.add(ia(i, { suffix: kc }))),
        i.bin && wa(i, n) && e.add(ia(i, { binSuffix: "range" }));
    } else if (Ee(n)) {
      const t = je(n);
      e.add(r.getName(t));
    } else e.add(ia(i));
    return Ko(i) && function (e) {
      return t.isObject(e) && "field" in e;
    }(i.scale?.range) && e.add(i.scale.range.field),
      e;
  }
  class rd extends yc {
    clone() {
      return new rd(null, new Set(this.dimensions), l(this.measures));
    }
    constructor(e, t, n) {
      super(e), this.dimensions = t, this.measures = n;
    }
    get groupBy() {
      return this.dimensions;
    }
    static makeFromEncoding(e, t) {
      let n = !1;
      t.forEachFieldDef((e) => {
        e.aggregate && (n = !0);
      });
      const i = {}, r = new Set();
      return n
        ? (t.forEachFieldDef((e, n) => {
          const { aggregate: o, field: a } = e;
          if (o) {
            if ("count" === o) {
              i["*"] ??= {}, i["*"].count = new Set([ia(e, { forAs: !0 })]);
            } else {
              if (Zt(o) || en(o)) {
                const e = Zt(o) ? "argmin" : "argmax", t = o[e];
                i[t] ??= {},
                  i[t][e] = new Set([ia({ op: e, field: t }, { forAs: !0 })]);
              } else i[a] ??= {}, i[a][o] = new Set([ia(e, { forAs: !0 })]);
              Vt(n) && "unaggregated" === t.scaleDomain(n) &&
                (i[a] ??= {},
                  i[a].min = new Set([
                    ia({ field: a, aggregate: "min" }, { forAs: !0 }),
                  ]),
                  i[a].max = new Set([
                    ia({ field: a, aggregate: "max" }, { forAs: !0 }),
                  ]));
            }
          } else id(r, n, e, t);
        }),
          r.size + D(i).length === 0 ? null : new rd(e, r, i))
        : null;
    }
    static makeFromTransform(e, t) {
      const n = new Set(), i = {};
      for (const e of t.aggregate) {
        const { op: t, field: n, as: r } = e;
        t &&
          ("count" === t
            ? (i["*"] ??= {},
              i["*"].count = new Set([r || ia(e, { forAs: !0 })]))
            : (i[n] ??= {}, i[n][t] = new Set([r || ia(e, { forAs: !0 })])));
      }
      for (const e of t.groupby ?? []) n.add(e);
      return n.size + D(i).length === 0 ? null : new rd(e, n, i);
    }
    merge(e) {
      return x(this.dimensions, e.dimensions)
        ? (function (e, t) {
          for (const n of D(t)) {
            const i = t[n];
            for (const t of D(i)) {
              n in e
                ? e[n][t] = new Set([...e[n][t] ?? [], ...i[t]])
                : e[n] = { [t]: i[t] };
            }
          }
        }(this.measures, e.measures),
          !0)
        : (function () {
          hi.debug(...arguments);
        }("different dimensions, cannot merge"),
          !1);
    }
    addDimensions(e) {
      e.forEach(this.dimensions.add, this.dimensions);
    }
    dependentFields() {
      return new Set([...this.dimensions, ...D(this.measures)]);
    }
    producedFields() {
      const e = new Set();
      for (const t of D(this.measures)) {
        for (const n of D(this.measures[t])) {
          const i = this.measures[t][n];
          0 === i.size ? e.add(`${n}_${t}`) : i.forEach(e.add, e);
        }
      }
      return e;
    }
    hash() {
      return `Aggregate ${
        d({ dimensions: this.dimensions, measures: this.measures })
      }`;
    }
    assemble() {
      const e = [], t = [], n = [];
      for (const i of D(this.measures)) {
        for (const r of D(this.measures[i])) {
          for (const o of this.measures[i][r]) {
            n.push(o), e.push(r), t.push("*" === i ? null : E(i));
          }
        }
      }
      return {
        type: "aggregate",
        groupby: [...this.dimensions].map(E),
        ops: e,
        fields: t,
        as: n,
      };
    }
  }
  class od extends yc {
    constructor(e, n, i, r) {
      super(e), this.model = n, this.name = i, this.data = r;
      for (const e of Ue) {
        const i = n.facet[e];
        if (i) {
          const { bin: r, sort: o } = i;
          this[e] = {
            name: n.getName(`${e}_domain`),
            fields: [ia(i), ...ln(r) ? [ia(i, { binSuffix: "end" })] : []],
            ...Co(o)
              ? { sortField: o }
              : t.isArray(o)
              ? { sortIndexField: af(i, e) }
              : {},
          };
        }
      }
      this.childModel = n.child;
    }
    hash() {
      let e = "Facet";
      for (const t of Ue) this[t] && (e += ` ${t.charAt(0)}:${d(this[t])}`);
      return e;
    }
    get fields() {
      const e = [];
      for (const t of Ue) this[t]?.fields && e.push(...this[t].fields);
      return e;
    }
    dependentFields() {
      const e = new Set(this.fields);
      for (const t of Ue) {
        this[t] &&
          (this[t].sortField && e.add(this[t].sortField.field),
            this[t].sortIndexField && e.add(this[t].sortIndexField));
      }
      return e;
    }
    producedFields() {
      return new Set();
    }
    getSource() {
      return this.name;
    }
    getChildIndependentFieldsWithStep() {
      const e = {};
      for (const t of Ft) {
        const n = this.childModel.component.scales[t];
        if (n && !n.merged) {
          const i = n.get("type"), r = n.get("range");
          if (hr(i) && vn(r)) {
            const n = Jd(Kd(this.childModel, t));
            n ? e[t] = n : yi(Bn(t));
          }
        }
      }
      return e;
    }
    assembleRowColumnHeaderData(e, t, n) {
      const i = { row: "y", column: "x", facet: void 0 }[e],
        r = [],
        o = [],
        a = [];
      i && n && n[i] &&
        (t
          ? (r.push(`distinct_${n[i]}`), o.push("max"))
          : (r.push(n[i]), o.push("distinct")),
          a.push(`distinct_${n[i]}`));
      const { sortField: s, sortIndexField: l } = this[e];
      if (s) {
        const { op: e = Fo, field: t } = s;
        r.push(t), o.push(e), a.push(ia(s, { forAs: !0 }));
      } else l && (r.push(l), o.push("max"), a.push(l));
      return {
        name: this[e].name,
        source: t ?? this.data,
        transform: [{
          type: "aggregate",
          groupby: this[e].fields,
          ...r.length ? { fields: r, ops: o, as: a } : {},
        }],
      };
    }
    assembleFacetHeaderData(e) {
      const { columns: t } = this.model.layout,
        { layoutHeaders: n } = this.model.component,
        i = [],
        r = {};
      for (const e of uf) {
        for (const t of ff) {
          const i = (n[e] && n[e][t]) ?? [];
          for (const t of i) {
            if (t.axes?.length > 0) {
              r[e] = !0;
              break;
            }
          }
        }
        if (r[e]) {
          const n = `length(data("${this.facet.name}"))`,
            r = "row" === e
              ? t ? { signal: `ceil(${n} / ${t})` } : 1
              : t
              ? { signal: `min(${n}, ${t})` }
              : { signal: n };
          i.push({
            name: `${this.facet.name}_${e}`,
            transform: [{ type: "sequence", start: 0, stop: r }],
          });
        }
      }
      const { row: o, column: a } = r;
      return (o || a) &&
        i.unshift(this.assembleRowColumnHeaderData("facet", null, e)),
        i;
    }
    assemble() {
      const e = [];
      let t = null;
      const n = this.getChildIndependentFieldsWithStep(),
        { column: i, row: r, facet: o } = this;
      if (i && r && (n.x || n.y)) {
        t = `cross_${this.column.name}_${this.row.name}`;
        const i = [].concat(n.x ?? [], n.y ?? []), r = i.map(() => "distinct");
        e.push({
          name: t,
          source: this.data,
          transform: [{
            type: "aggregate",
            groupby: this.fields,
            fields: i,
            ops: r,
          }],
        });
      }
      for (const i of [J, Q]) {
        this[i] && e.push(this.assembleRowColumnHeaderData(i, t, n));
      }
      if (o) {
        const t = this.assembleFacetHeaderData(n);
        t && e.push(...t);
      }
      return e;
    }
  }
  function ad(e) {
    return e.startsWith("'") && e.endsWith("'") ||
        e.startsWith('"') && e.endsWith('"')
      ? e.slice(1, -1)
      : e;
  }
  function sd(e) {
    const n = {};
    return a(e.filter, (e) => {
      if (Gi(e)) {
        let i = null;
        qi(e)
          ? i = Sn(e.equal)
          : Wi(e)
          ? i = Sn(e.lte)
          : Ui(e)
          ? i = Sn(e.lt)
          : Ii(e)
          ? i = Sn(e.gt)
          : Bi(e)
          ? i = Sn(e.gte)
          : Vi(e)
          ? i = e.range[0]
          : Hi(e) && (i = (e.oneOf ?? e.in)[0]),
          i &&
          (vi(i)
            ? n[e.field] = "date"
            : t.isNumber(i)
            ? n[e.field] = "number"
            : t.isString(i) && (n[e.field] = "string")),
          e.timeUnit && (n[e.field] = "date");
      }
    }),
      n;
  }
  function ld(e) {
    const n = {};
    function i(e) {
      var i;
      ba(e) ? n[e.field] = "date" : "quantitative" === e.type &&
          (i = e.aggregate, t.isString(i) && p(["min", "max"], i))
        ? n[e.field] = "number"
        : L(e.field) > 1
        ? e.field in n || (n[e.field] = "flatten")
        : Ko(e) && Co(e.sort) && L(e.sort.field) > 1 &&
          (e.sort.field in n || (n[e.sort.field] = "flatten"));
    }
    if (
      (xm(e) || $m(e)) && e.forEachFieldDef((t, n) => {
        if (Qo(t)) i(t);
        else {
          const r = tt(n), o = e.fieldDef(r);
          i({ ...t, type: o.type });
        }
      }), xm(e)
    ) {
      const { mark: t, markDef: i, encoding: r } = e;
      if (Hr(t) && !e.encoding.order) {
        const e = r["horizontal" === i.orient ? "y" : "x"];
        Io(e) && "quantitative" === e.type && !(e.field in n) &&
          (n[e.field] = "number");
      }
    }
    return n;
  }
  class cd extends yc {
    clone() {
      return new cd(null, l(this._parse));
    }
    constructor(e, t) {
      super(e), this._parse = t;
    }
    hash() {
      return `Parse ${d(this._parse)}`;
    }
    static makeExplicit(e, t, n) {
      let i = {};
      const r = t.data;
      return !oc(r) && r?.format?.parse && (i = r.format.parse),
        this.makeWithAncestors(e, i, {}, n);
    }
    static makeWithAncestors(e, t, n, i) {
      for (const e of D(n)) {
        const t = i.getWithExplicit(e);
        void 0 !== t.value &&
          (t.explicit || t.value === n[e] || "derived" === t.value ||
              "flatten" === n[e]
            ? delete n[e]
            : yi(Qn(e, n[e], t.value)));
      }
      for (const e of D(t)) {
        const n = i.get(e);
        void 0 !== n && (n === t[e] ? delete t[e] : yi(Qn(e, t[e], n)));
      }
      const r = new Xl(t, n);
      i.copyAll(r);
      const o = {};
      for (const e of D(r.combine())) {
        const t = r.get(e);
        null !== t && (o[e] = t);
      }
      return 0 === D(o).length || i.parseNothing ? null : new cd(e, o);
    }
    get parse() {
      return this._parse;
    }
    merge(e) {
      this._parse = { ...this._parse, ...e.parse }, e.remove();
    }
    assembleFormatParse() {
      const e = {};
      for (const t of D(this._parse)) {
        const n = this._parse[t];
        1 === L(t) && (e[t] = n);
      }
      return e;
    }
    producedFields() {
      return new Set(D(this._parse));
    }
    dependentFields() {
      return new Set(D(this._parse));
    }
    assembleTransforms() {
      let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return D(this._parse).filter((t) => !e || L(t) > 1).map((e) => {
        const t = function (e, t) {
          const n = A(e);
          if ("number" === t) return `toNumber(${n})`;
          if ("boolean" === t) return `toBoolean(${n})`;
          if ("string" === t) return `toString(${n})`;
          if ("date" === t) return `toDate(${n})`;
          if ("flatten" === t) return n;
          if (t.startsWith("date:")) {
            return `timeParse(${n},'${ad(t.slice(5, t.length))}')`;
          }
          if (t.startsWith("utc:")) {
            return `utcParse(${n},'${ad(t.slice(4, t.length))}')`;
          }
          return yi(`Unrecognized parse "${t}".`), null;
        }(e, this._parse[e]);
        if (!t) return null;
        return { type: "formula", expr: t, as: R(e) };
      }).filter((e) => null !== e);
    }
  }
  class ud extends yc {
    clone() {
      return new ud(null);
    }
    constructor(e) {
      super(e);
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {
      return new Set([vs]);
    }
    hash() {
      return "Identifier";
    }
    assemble() {
      return { type: "identifier", as: vs };
    }
  }
  class fd extends yc {
    clone() {
      return new fd(null, this.params);
    }
    constructor(e, t) {
      super(e), this.params = t;
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {}
    hash() {
      return `Graticule ${d(this.params)}`;
    }
    assemble() {
      return { type: "graticule", ...!0 === this.params ? {} : this.params };
    }
  }
  class dd extends yc {
    clone() {
      return new dd(null, this.params);
    }
    constructor(e, t) {
      super(e), this.params = t;
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {
      return new Set([this.params.as ?? "data"]);
    }
    hash() {
      return `Hash ${d(this.params)}`;
    }
    assemble() {
      return { type: "sequence", ...this.params };
    }
  }
  class md extends yc {
    constructor(e) {
      let t;
      if (
        super(null),
          e ??= { name: "source" },
          oc(e) || (t = e.format ? { ...f(e.format, ["parse"]) } : {}),
          ic(e)
      ) this._data = { values: e.values };
      else if (nc(e)) {
        if (this._data = { url: e.url }, !t.type) {
          let n = /(?:\.([^.]+))?$/.exec(e.url)[1];
          p(["json", "csv", "tsv", "dsv", "topojson"], n) || (n = "json"),
            t.type = n;
        }
      } else {sc(e)
          ? this._data = { values: [{ type: "Sphere" }] }
          : (rc(e) || oc(e)) && (this._data = {});}
      this._generator = oc(e),
        e.name && (this._name = e.name),
        t && !S(t) && (this._data.format = t);
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {}
    get data() {
      return this._data;
    }
    hasName() {
      return !!this._name;
    }
    get isGenerator() {
      return this._generator;
    }
    get dataName() {
      return this._name;
    }
    set dataName(e) {
      this._name = e;
    }
    set parent(e) {
      throw new Error("Source nodes have to be roots.");
    }
    remove() {
      throw new Error("Source nodes are roots and cannot be removed.");
    }
    hash() {
      throw new Error("Cannot hash sources");
    }
    assemble() {
      return { name: this._name, ...this._data, transform: [] };
    }
  }
  function pd(e) {
    return e instanceof md || e instanceof fd || e instanceof dd;
  }
  class gd {
    #e;
    constructor() {
      this.#e = !1;
    }
    setModified() {
      this.#e = !0;
    }
    get modifiedFlag() {
      return this.#e;
    }
  }
  class hd extends gd {
    getNodeDepths(e, t, n) {
      n.set(e, t);
      for (const i of e.children) this.getNodeDepths(i, t + 1, n);
      return n;
    }
    optimize(e) {
      const t = [...this.getNodeDepths(e, 0, new Map()).entries()].sort(
        (e, t) => t[1] - e[1],
      );
      for (const e of t) this.run(e[0]);
      return this.modifiedFlag;
    }
  }
  class yd extends gd {
    optimize(e) {
      this.run(e);
      for (const t of e.children) this.optimize(t);
      return this.modifiedFlag;
    }
  }
  class vd extends yd {
    mergeNodes(e, t) {
      const n = t.shift();
      for (const i of t) e.removeChild(i), i.parent = n, i.remove();
    }
    run(e) {
      const t = e.children.map((e) => e.hash()), n = {};
      for (let i = 0; i < t.length; i++) {
        void 0 === n[t[i]]
          ? n[t[i]] = [e.children[i]]
          : n[t[i]].push(e.children[i]);
      }
      for (const t of D(n)) {
        n[t].length > 1 && (this.setModified(), this.mergeNodes(e, n[t]));
      }
    }
  }
  class bd extends yd {
    constructor(e) {
      super(), this.requiresSelectionId = e && Ru(e);
    }
    run(e) {
      e instanceof ud &&
        (this.requiresSelectionId &&
            (pd(e.parent) || e.parent instanceof rd ||
              e.parent instanceof cd) || (this.setModified(), e.remove()));
    }
  }
  class xd extends gd {
    optimize(e) {
      return this.run(e, new Set()), this.modifiedFlag;
    }
    run(e, t) {
      let n = new Set();
      e instanceof $c &&
        (n = e.producedFields(),
          $(n, t) &&
          (this.setModified(),
            e.removeFormulas(t),
            0 === e.producedFields.length && e.remove()));
      for (const i of e.children) this.run(i, new Set([...t, ...n]));
    }
  }
  class $d extends yd {
    constructor() {
      super();
    }
    run(e) {
      e instanceof vc && !e.isRequired() && (this.setModified(), e.remove());
    }
  }
  class wd extends hd {
    run(e) {
      if (!(pd(e) || e.numChildren() > 1)) {
        for (const t of e.children) {
          if (t instanceof cd) {
            if (e instanceof cd) this.setModified(), e.merge(t);
            else {
              if (k(e.producedFields(), t.dependentFields())) continue;
              this.setModified(), t.swapWithParent();
            }
          }
        }
      }
    }
  }
  class kd extends hd {
    run(e) {
      const t = [...e.children], n = e.children.filter((e) => e instanceof cd);
      if (e.numChildren() > 1 && n.length >= 1) {
        const i = {}, r = new Set();
        for (const e of n) {
          const t = e.parse;
          for (const e of D(t)) {
            e in i ? i[e] !== t[e] && r.add(e) : i[e] = t[e];
          }
        }
        for (const e of r) delete i[e];
        if (!S(i)) {
          this.setModified();
          const n = new cd(e, i);
          for (const r of t) {
            if (r instanceof cd) { for (const e of D(i)) delete r.parse[e]; }
            e.removeChild(r),
              r.parent = n,
              r instanceof cd && 0 === D(r.parse).length && r.remove();
          }
        }
      }
    }
  }
  class Sd extends hd {
    run(e) {
      e instanceof vc || e.numChildren() > 0 || e instanceof od ||
        e instanceof md || (this.setModified(), e.remove());
    }
  }
  class Dd extends hd {
    run(e) {
      const t = e.children.filter((e) => e instanceof $c), n = t.pop();
      for (const e of t) this.setModified(), n.merge(e);
    }
  }
  class Fd extends hd {
    run(e) {
      const t = e.children.filter((e) => e instanceof rd), n = {};
      for (const e of t) {
        const t = d(e.groupBy);
        t in n || (n[t] = []), n[t].push(e);
      }
      for (const t of D(n)) {
        const i = n[t];
        if (i.length > 1) {
          const t = i.pop();
          for (const n of i) {
            t.merge(n) &&
              (e.removeChild(n), n.parent = t, n.remove(), this.setModified());
          }
        }
      }
    }
  }
  class zd extends hd {
    constructor(e) {
      super(), this.model = e;
    }
    run(e) {
      const t =
          !(pd(e) || e instanceof Iu || e instanceof cd || e instanceof ud),
        n = [],
        i = [];
      for (const r of e.children) {
        r instanceof nd &&
          (t && !k(e.producedFields(), r.dependentFields())
            ? n.push(r)
            : i.push(r));
      }
      if (n.length > 0) {
        const t = n.pop();
        for (const e of n) t.merge(e, this.model.renameSignal.bind(this.model));
        this.setModified(),
          e instanceof nd
            ? e.merge(t, this.model.renameSignal.bind(this.model))
            : t.swapWithParent();
      }
      if (i.length > 1) {
        const e = i.pop();
        for (const t of i) e.merge(t, this.model.renameSignal.bind(this.model));
        this.setModified();
      }
    }
  }
  class Od extends hd {
    run(e) {
      const t = [...e.children];
      if (!g(t, (e) => e instanceof vc) || e.numChildren() <= 1) return;
      const n = [];
      let i;
      for (const r of t) {
        if (r instanceof vc) {
          let t = r;
          for (; 1 === t.numChildren();) {
            const [e] = t.children;
            if (!(e instanceof vc)) break;
            t = e;
          }
          n.push(...t.children),
            i
              ? (e.removeChild(r),
                r.parent = i.parent,
                i.parent.removeChild(i),
                i.parent = t,
                this.setModified())
              : i = t;
        } else n.push(r);
      }
      if (n.length) {
        this.setModified();
        for (const e of n) e.parent.removeChild(e), e.parent = i;
      }
    }
  }
  class Cd extends yc {
    clone() {
      return new Cd(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t;
    }
    addDimensions(e) {
      this.transform.groupby = b(this.transform.groupby.concat(e), (e) => e);
    }
    dependentFields() {
      const e = new Set();
      return this.transform.groupby && this.transform.groupby.forEach(e.add, e),
        this.transform.joinaggregate.map((e) => e.field).filter(
          (e) => void 0 !== e,
        ).forEach(e.add, e),
        e;
    }
    producedFields() {
      return new Set(this.transform.joinaggregate.map(this.getDefaultName));
    }
    getDefaultName(e) {
      return e.as ?? ia(e);
    }
    hash() {
      return `JoinAggregateTransform ${d(this.transform)}`;
    }
    assemble() {
      const e = [], t = [], n = [];
      for (const i of this.transform.joinaggregate) {
        t.push(i.op),
          n.push(this.getDefaultName(i)),
          e.push(void 0 === i.field ? null : i.field);
      }
      const i = this.transform.groupby;
      return {
        type: "joinaggregate",
        as: n,
        ops: t,
        fields: e,
        ...void 0 !== i ? { groupby: i } : {},
      };
    }
  }
  class Nd extends yc {
    clone() {
      return new Nd(null, { ...this.filter });
    }
    constructor(e, t) {
      super(e), this.filter = t;
    }
    static make(e, t, n) {
      const { config: i, markDef: r } = t, { marks: o, scales: a } = n;
      if ("include-invalid-values" === o && "include-invalid-values" === a) {
        return null;
      }
      const s = t.reduceFieldDef((e, n, o) => {
        const a = Vt(o) && t.getScaleComponent(o);
        if (a) {
          const t = a.get("type"),
            { aggregate: s } = n,
            l = ro({
              scaleChannel: o,
              markDef: r,
              config: i,
              scaleType: t,
              isCountAggregate: rn(s),
            });
          "show" !== l && "always-valid" !== l && (e[n.field] = n);
        }
        return e;
      }, {});
      return D(s).length ? new Nd(e, s) : null;
    }
    dependentFields() {
      return new Set(D(this.filter));
    }
    producedFields() {
      return new Set();
    }
    hash() {
      return `FilterInvalid ${d(this.filter)}`;
    }
    assemble() {
      const e = D(this.filter).reduce((e, t) => {
        const n = this.filter[t], i = ia(n, { expr: "datum" });
        return null !== n &&
          ("temporal" === n.type
            ? e.push(`(isDate(${i}) || (${_d(i)}))`)
            : "quantitative" === n.type && e.push(_d(i))),
          e;
      }, []);
      return e.length > 0 ? { type: "filter", expr: e.join(" && ") } : null;
    }
  }
  function _d(e) {
    return `isValid(${e}) && isFinite(+${e})`;
  }
  class Pd extends yc {
    clone() {
      return new Pd(null, l(this._stack));
    }
    constructor(e, t) {
      super(e), this._stack = t;
    }
    static makeFromTransform(e, n) {
      const { stack: i, groupby: r, as: o, offset: a = "zero" } = n,
        s = [],
        l = [];
      if (void 0 !== n.sort) {
        for (const e of n.sort) {
          s.push(e.field), l.push(q(e.order, "ascending"));
        }
      }
      const c = { field: s, order: l };
      let u;
      return u = (function (e) {
          return t.isArray(e) && e.every((e) => t.isString(e)) && e.length > 1;
        })(o)
        ? o
        : t.isString(o)
        ? [o, `${o}_end`]
        : [`${n.stack}_start`, `${n.stack}_end`],
        new Pd(e, {
          dimensionFieldDefs: [],
          stackField: i,
          groupby: r,
          offset: a,
          sort: c,
          facetby: [],
          as: u,
        });
    }
    static makeFromEncoding(e, n) {
      const i = n.stack, { encoding: r } = n;
      if (!i) return null;
      const { groupbyChannels: o, fieldChannel: a, offset: s, impute: l } = i,
        c = o.map((e) => da(r[e])).filter((e) => !!e),
        u = function (e) {
          return e.stack.stackBy.reduce((e, t) => {
            const n = ia(t.fieldDef);
            return n && e.push(n), e;
          }, []);
        }(n),
        f = n.encoding.order;
      let d;
      if (t.isArray(f) || Io(f)) d = jn(f);
      else {
        const e = Lo(f) ? f.sort : "y" === a ? "descending" : "ascending";
        d = u.reduce(
          (
            t,
            n,
          ) => (t.field.includes(n) || (t.field.push(n), t.order.push(e)), t),
          { field: [], order: [] },
        );
      }
      return new Pd(e, {
        dimensionFieldDefs: c,
        stackField: n.vgField(a),
        facetby: [],
        stackby: u,
        sort: d,
        offset: s,
        impute: l,
        as: [
          n.vgField(a, { suffix: "start", forAs: !0 }),
          n.vgField(a, { suffix: "end", forAs: !0 }),
        ],
      });
    }
    get stack() {
      return this._stack;
    }
    addDimensions(e) {
      this._stack.facetby.push(...e);
    }
    dependentFields() {
      const e = new Set();
      return e.add(this._stack.stackField),
        this.getGroupbyFields().forEach(e.add, e),
        this._stack.facetby.forEach(e.add, e),
        this._stack.sort.field.forEach(e.add, e),
        e;
    }
    producedFields() {
      return new Set(this._stack.as);
    }
    hash() {
      return `Stack ${d(this._stack)}`;
    }
    getGroupbyFields() {
      const { dimensionFieldDefs: e, impute: t, groupby: n } = this._stack;
      return e.length > 0
        ? e.map(
          (e) =>
            e.bin
              ? t
                ? [ia(e, { binSuffix: "mid" })]
                : [ia(e, {}), ia(e, { binSuffix: "end" })]
              : [ia(e)],
        ).flat()
        : n ?? [];
    }
    assemble() {
      const e = [],
        {
          facetby: t,
          dimensionFieldDefs: n,
          stackField: i,
          stackby: r,
          sort: o,
          offset: a,
          impute: s,
          as: l,
        } = this._stack;
      if (s) {
        for (const o of n) {
          const { bandPosition: n = .5, bin: a } = o;
          if (a) {
            const t = ia(o, { expr: "datum" }),
              i = ia(o, { expr: "datum", binSuffix: "end" });
            e.push({
              type: "formula",
              expr: `${_d(t)} ? ${n}*${t}+${1 - n}*${i} : ${t}`,
              as: ia(o, { binSuffix: "mid", forAs: !0 }),
            });
          }
          e.push({
            type: "impute",
            field: i,
            groupby: [...r, ...t],
            key: ia(o, { binSuffix: "mid" }),
            method: "value",
            value: 0,
          });
        }
      }
      return e.push({
        type: "stack",
        groupby: [...this.getGroupbyFields(), ...t],
        field: i,
        sort: o,
        as: l,
        offset: a,
      }),
        e;
    }
  }
  class Ad extends yc {
    clone() {
      return new Ad(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t;
    }
    addDimensions(e) {
      this.transform.groupby = b(this.transform.groupby.concat(e), (e) => e);
    }
    dependentFields() {
      const e = new Set();
      return (this.transform.groupby ?? []).forEach(e.add, e),
        (this.transform.sort ?? []).forEach((t) => e.add(t.field)),
        this.transform.window.map((e) => e.field).filter((e) => void 0 !== e)
          .forEach(e.add, e),
        e;
    }
    producedFields() {
      return new Set(this.transform.window.map(this.getDefaultName));
    }
    getDefaultName(e) {
      return e.as ?? ia(e);
    }
    hash() {
      return `WindowTransform ${d(this.transform)}`;
    }
    assemble() {
      const e = [], t = [], n = [], i = [];
      for (const r of this.transform.window) {
        t.push(r.op),
          n.push(this.getDefaultName(r)),
          i.push(void 0 === r.param ? null : r.param),
          e.push(void 0 === r.field ? null : r.field);
      }
      const r = this.transform.frame, o = this.transform.groupby;
      if (r && null === r[0] && null === r[1] && t.every((e) => tn(e))) {
        return {
          type: "joinaggregate",
          as: n,
          ops: t,
          fields: e,
          ...void 0 !== o ? { groupby: o } : {},
        };
      }
      const a = [], s = [];
      if (void 0 !== this.transform.sort) {
        for (const e of this.transform.sort) {
          a.push(e.field), s.push(e.order ?? "ascending");
        }
      }
      const l = { field: a, order: s }, c = this.transform.ignorePeers;
      return {
        type: "window",
        params: i,
        as: n,
        ops: t,
        fields: e,
        sort: l,
        ...void 0 !== c ? { ignorePeers: c } : {},
        ...void 0 !== o ? { groupby: o } : {},
        ...void 0 !== r ? { frame: r } : {},
      };
    }
  }
  function Td(e) {
    if (e instanceof od) {
      if (1 !== e.numChildren() || e.children[0] instanceof vc) {
        const n = e.model.component.data.main;
        jd(n);
        const i = (t = e, function e(n) {
            if (!(n instanceof od)) {
              const i = n.clone();
              if (i instanceof vc) {
                const e = Ed + i.getSource();
                i.setSource(e), t.model.component.data.outputNodes[e] = i;
              } else {(i instanceof rd || i instanceof Pd ||
                  i instanceof Ad || i instanceof Cd) &&
                  i.addDimensions(t.fields);}
              for (const t of n.children.flatMap(e)) {
                t.parent = i;
              }
              return [i];
            }
            return n.children.flatMap(e);
          }),
          r = e.children.map(i).flat();
        for (const e of r) e.parent = n;
      } else {
        const t = e.children[0];
        (t instanceof rd || t instanceof Pd || t instanceof Ad ||
          t instanceof Cd) && t.addDimensions(e.fields),
          t.swapWithParent(),
          Td(e);
      }
    } else e.children.map(Td);
    var t;
  }
  function jd(e) {
    if (e instanceof vc && e.type === cc.Main && 1 === e.numChildren()) {
      const t = e.children[0];
      t instanceof od || (t.swapWithParent(), jd(e));
    }
  }
  const Ed = "scale_", Md = 5;
  function Rd(e) {
    for (const t of e) {
      for (const e of t.children) if (e.parent !== t) return !1;
      if (!Rd(t.children)) return !1;
    }
    return !0;
  }
  function Ld(e, t) {
    let n = !1;
    for (const i of t) n = e.optimize(i) || n;
    return n;
  }
  function qd(e, t, n) {
    let i = e.sources, r = !1;
    return r = Ld(new $d(), i) || r,
      r = Ld(new bd(t), i) || r,
      i = i.filter((e) => e.numChildren() > 0),
      r = Ld(new Sd(), i) || r,
      i = i.filter((e) => e.numChildren() > 0),
      n ||
      (r = Ld(new wd(), i) || r,
        r = Ld(new zd(t), i) || r,
        r = Ld(new xd(), i) || r,
        r = Ld(new kd(), i) || r,
        r = Ld(new Fd(), i) || r,
        r = Ld(new Dd(), i) || r,
        r = Ld(new vd(), i) || r,
        r = Ld(new Od(), i) || r),
      e.sources = i,
      r;
  }
  class Ud {
    constructor(e) {
      Object.defineProperty(this, "signal", { enumerable: !0, get: e });
    }
    static fromName(e, t) {
      return new Ud(() => e(t));
    }
  }
  function Wd(e) {
    xm(e)
      ? function (e) {
        const t = e.component.scales;
        for (const n of D(t)) {
          const i = Id(e, n);
          if (
            t[n].setWithExplicit("domains", i),
              Gd(e, n),
              e.component.data.isFaceted
          ) {
            let t = e;
            for (; !$m(t) && t.parent;) t = t.parent;
            if ("shared" === t.component.resolve.scale[n]) {
              for (const e of i.value) {
                bn(e) && (e.data = Ed + e.data.replace(Ed, ""));
              }
            }
          }
        }
      }(e)
      : function (e) {
        for (const t of e.children) Wd(t);
        const t = e.component.scales;
        for (const n of D(t)) {
          let i, r = null;
          for (const t of e.children) {
            const e = t.component.scales[n];
            if (e) {
              i = void 0 === i
                ? e.getWithExplicit("domains")
                : ec(i, e.getWithExplicit("domains"), "domains", "scale", Xd);
              const t = e.get("selectionExtent");
              r && t && r.param !== t.param && yi(Yn), r = t;
            }
          }
          t[n].setWithExplicit("domains", i),
            r && t[n].set("selectionExtent", r, !0);
        }
      }(e);
  }
  function Id(e, t) {
    const n = e.getScaleComponent(t).get("type"),
      { encoding: i } = e,
      r = function (e, t, n, i) {
        if ("unaggregated" === e) {
          const { valid: e, reason: i } = Yd(t, n);
          if (!e) return void yi(i);
        } else if (void 0 === e && i.useUnaggregatedDomain) {
          const { valid: e } = Yd(t, n);
          if (e) return "unaggregated";
        }
        return e;
      }(e.scaleDomain(t), e.typedFieldDef(t), n, e.config.scale);
    return r !== e.scaleDomain(t) &&
      (e.specifiedScales[t] = { ...e.specifiedScales[t], domain: r }),
      "x" === t && ma(i.x2)
        ? ma(i.x)
          ? ec(Vd(n, r, e, "x"), Vd(n, r, e, "x2"), "domain", "scale", Xd)
          : Vd(n, r, e, "x2")
        : "y" === t && ma(i.y2)
        ? ma(i.y)
          ? ec(Vd(n, r, e, "y"), Vd(n, r, e, "y2"), "domain", "scale", Xd)
          : Vd(n, r, e, "y2")
        : Vd(n, r, e, t);
  }
  function Bd(e, t, n) {
    const i = Ei(n)?.unit;
    return "temporal" === t || i
      ? function (e, t, n) {
        return e.map(
          (e) => ({ signal: `{data: ${xa(e, { timeUnit: n, type: t })}}` }),
        );
      }(e, t, i)
      : [e];
  }
  function Vd(e, n, i, r) {
    const { encoding: o, markDef: a, mark: s, config: l, stack: c } = i,
      u = ma(o[r]),
      { type: f } = u,
      d = u.timeUnit,
      m = function (e) {
        const { marks: t, scales: n } = uc(e);
        return t === n
          ? cc.Main
          : "include-invalid-values" === n
          ? cc.PreFilterInvalid
          : cc.PostFilterInvalid;
      }({ invalid: Pn("invalid", a, l), isPath: Hr(s) });
    if (
      function (e) {
        return e?.unionWith;
      }(n)
    ) {
      const t = Vd(e, void 0, i, r);
      return Ql([...Bd(n.unionWith, f, d), ...t.value]);
    }
    if (yn(n)) return Ql([n]);
    if (n && "unaggregated" !== n && !xr(n)) return Ql(Bd(n, f, d));
    if (c && r === c.fieldChannel) {
      if ("normalize" === c.offset) return Jl([[0, 1]]);
      const e = i.requestDataName(m);
      return Jl([{ data: e, field: i.vgField(r, { suffix: "start" }) }, {
        data: e,
        field: i.vgField(r, { suffix: "end" }),
      }]);
    }
    const g = Vt(r) && Io(u)
      ? function (e, t, n) {
        if (!hr(n)) return;
        const i = e.fieldDef(t), r = i.sort;
        if (No(r)) return { op: "min", field: af(i, t), order: "ascending" };
        const { stack: o } = e,
          a = o
            ? new Set([
              ...o.groupbyFields,
              ...o.stackBy.map((e) => e.fieldDef.field),
            ])
            : void 0;
        if (Co(r)) return Hd(r, o && !a.has(r.field));
        if (
          function (e) {
            return !!e?.encoding;
          }(r)
        ) {
          const { encoding: t, order: n } = r,
            i = e.fieldDef(t),
            { aggregate: s, field: l } = i,
            c = o && !a.has(l);
          if (Zt(s) || en(s)) return Hd({ field: ia(i), order: n }, c);
          if (tn(s) || !s) return Hd({ op: s, field: l, order: n }, c);
        } else {
          if ("descending" === r) {
            return { op: "min", field: e.vgField(t), order: "descending" };
          }
          if (p(["ascending", void 0], r)) {
            return !0;
          }
        }
        return;
      }(i, r, e)
      : void 0;
    if (Vo(u)) return Jl(Bd([u.datum], f, d));
    const h = u;
    if ("unaggregated" === n) {
      const { field: e } = u;
      return Jl([{
        data: i.requestDataName(m),
        field: ia({ field: e, aggregate: "min" }),
      }, {
        data: i.requestDataName(m),
        field: ia({ field: e, aggregate: "max" }),
      }]);
    }
    if (ln(h.bin)) {
      if (hr(e)) {
        return Jl(
          "bin-ordinal" === e ? [] : [{
            data: O(g) ? i.requestDataName(m) : i.requestDataName(cc.Raw),
            field: i.vgField(r, wa(h, r) ? { binSuffix: "range" } : {}),
            sort: !0 !== g && t.isObject(g)
              ? g
              : { field: i.vgField(r, {}), op: "min" },
          }],
        );
      }
      {
        const { bin: e } = h;
        if (ln(e)) {
          const t = ed(i, h.field, e);
          return Jl([
            new Ud(() => {
              const e = i.getSignalName(t);
              return `[${e}.start, ${e}.stop]`;
            }),
          ]);
        }
        return Jl([{ data: i.requestDataName(m), field: i.vgField(r, {}) }]);
      }
    }
    if (h.timeUnit && p(["time", "utc"], e)) {
      const e = o[it(r)];
      if (Ro(h, e, a, l)) {
        const t = i.requestDataName(m),
          n = Eo({ fieldDef: h, fieldDef2: e, markDef: a, config: l }),
          o = Gr(s) && .5 !== n && zt(r);
        return Jl([{ data: t, field: i.vgField(r, o ? { suffix: wc } : {}) }, {
          data: t,
          field: i.vgField(r, { suffix: o ? kc : "end" }),
        }]);
      }
    }
    return Jl(
      g
        ? [{
          data: O(g) ? i.requestDataName(m) : i.requestDataName(cc.Raw),
          field: i.vgField(r),
          sort: g,
        }]
        : [{ data: i.requestDataName(m), field: i.vgField(r) }],
    );
  }
  function Hd(e, t) {
    const { op: n, field: i, order: r } = e;
    return {
      op: n ?? (t ? "sum" : Fo),
      ...i ? { field: E(i) } : {},
      ...r ? { order: r } : {},
    };
  }
  function Gd(e, t) {
    const n = e.component.scales[t],
      i = e.specifiedScales[t].domain,
      r = e.fieldDef(t)?.bin,
      o = xr(i) && i,
      a = un(r) && fn(r.extent) && r.extent;
    (o || a) && n.set("selectionExtent", o ?? a, !0);
  }
  function Yd(e, n) {
    const { aggregate: i, type: r } = e;
    return i
      ? t.isString(i) && !an.has(i)
        ? { valid: !1, reason: si(i) }
        : "quantitative" === r && "log" === n
        ? { valid: !1, reason: li(e) }
        : { valid: !0 }
      : { valid: !1, reason: ai(e) };
  }
  function Xd(e, t, n, i) {
    return e.explicit && t.explicit && yi(function (e, t, n, i) {
      return `Conflicting ${t.toString()} property "${e.toString()}" (${
        X(n)
      } and ${X(i)}). Using the union of the two domains.`;
    }(n, i, e.value, t.value)),
      { explicit: e.explicit, value: [...e.value, ...t.value] };
  }
  function Qd(e) {
    const n = b(
        e.map((e) => {
          if (bn(e)) {
            const { sort: t, ...n } = e;
            return n;
          }
          return e;
        }),
        d,
      ),
      i = b(
        e.map((e) => {
          if (bn(e)) {
            const t = e.sort;
            return void 0 === t || O(t) ||
              ("op" in t && "count" === t.op && delete t.field,
                "ascending" === t.order && delete t.order),
              t;
          }
        }).filter((e) => void 0 !== e),
        d,
      );
    if (0 === n.length) return;
    if (1 === n.length) {
      const n = e[0];
      if (bn(n) && i.length > 0) {
        let e = i[0];
        if (i.length > 1) {
          yi(fi);
          const n = i.filter(
            (e) => t.isObject(e) && "op" in e && "min" !== e.op,
          );
          e = !i.every((e) => t.isObject(e) && "op" in e) || 1 !== n.length ||
            n[0];
        } else if (t.isObject(e) && "field" in e) {
          const t = e.field;
          n.field === t && (e = !e.order || { order: e.order });
        }
        return { ...n, sort: e };
      }
      return n;
    }
    const r = b(
      i.map((e) =>
        O(e) || !("op" in e) || t.isString(e.op) && e.op in Kt
          ? e
          : (yi(function (e) {
            return `Dropping sort property ${
              X(e)
            } as unioned domains only support boolean or op "count", "min", and "max".`;
          }(e)),
            !0)
      ),
      d,
    );
    let o;
    1 === r.length ? o = r[0] : r.length > 1 && (yi(fi), o = !0);
    const a = b(e.map((e) => bn(e) ? e.data : null), (e) => e);
    if (1 === a.length && null !== a[0]) {
      return {
        data: a[0],
        fields: n.map((e) => e.field),
        ...o ? { sort: o } : {},
      };
    }
    return { fields: n, ...o ? { sort: o } : {} };
  }
  function Jd(e) {
    if (bn(e) && t.isString(e.field)) return e.field;
    if (
      function (e) {
        return !t.isArray(e) && "fields" in e && !("data" in e);
      }(e)
    ) {
      let n;
      for (const i of e.fields) {
        if (bn(i) && t.isString(i.field)) {
          if (n) {
            if (n !== i.field) {
              return yi(
                "Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect.",
              ),
                n;
            }
          } else n = i.field;
        }
      }
      return yi(
        "Detected faceted independent scales that union domain of the same fields from different source. We will assume that this is the same field from a different fork of the same data source. However, if this is not the case, the result view size may be incorrect.",
      ),
        n;
    }
    if (
      function (e) {
        return !t.isArray(e) && "fields" in e && "data" in e;
      }(e)
    ) {
      yi(
        "Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.",
      );
      const n = e.fields[0];
      return t.isString(n) ? n : void 0;
    }
  }
  function Kd(e, t) {
    const n = e.component.scales[t].get("domains").map(
      (t) => (bn(t) && (t.data = e.lookupDataSource(t.data)), t),
    );
    return Qd(n);
  }
  function Zd(e) {
    return km(e) || wm(e)
      ? e.children.reduce((e, t) => e.concat(Zd(t)), em(e))
      : em(e);
  }
  function em(e) {
    return D(e.component.scales).reduce((n, i) => {
      const r = e.component.scales[i];
      if (r.merged) return n;
      const o = r.combine(),
        {
          name: a,
          type: s,
          selectionExtent: l,
          domains: c,
          range: u,
          reverse: f,
          ...d
        } = o,
        m = function (e, n, i, r) {
          if (zt(i)) { if (vn(e)) return { step: { signal: `${n}_step` } }; }
          else if (t.isObject(e) && bn(e)) {
            return { ...e, data: r.lookupDataSource(e.data) };
          }
          return e;
        }(o.range, a, i, e),
        p = Kd(e, i),
        g = l
          ? function (e, n, i, r) {
            const o = Vu(e, n.param, n);
            return {
              signal: yr(i.get("type")) && t.isArray(r) && r[0] > r[1]
                ? `isValid(${o}) && reverse(${o})`
                : o,
            };
          }(e, l, r, p)
          : null;
      return n.push({
        name: a,
        type: s,
        ...p ? { domain: p } : {},
        ...g ? { domainRaw: g } : {},
        range: m,
        ...void 0 !== f ? { reverse: f } : {},
        ...d,
      }),
        n;
    }, []);
  }
  class tm extends Xl {
    merged = !1;
    constructor(e, t) {
      super({}, { name: e }), this.setWithExplicit("type", t);
    }
    domainHasZero() {
      const e = this.get("type");
      if (p([or.LOG, or.TIME, or.UTC], e)) return "definitely-not";
      const n = this.get("zero");
      if (
        !0 === n || void 0 === n && p([or.LINEAR, or.SQRT, or.POW], e)
      ) return "definitely";
      const i = this.get("domains");
      if (i.length > 0) {
        let e = !1, n = !1, r = !1;
        for (const o of i) {
          if (t.isArray(o)) {
            const i = o[0], r = o[o.length - 1];
            if (t.isNumber(i) && t.isNumber(r)) {
              if (i <= 0 && r >= 0) {
                e = !0;
                continue;
              }
              n = !0;
              continue;
            }
          }
          r = !0;
        }
        if (e) return "definitely";
        if (n && !r) return "definitely-not";
      }
      return "maybe";
    }
  }
  const nm = ["range", "scheme"];
  function im(e, n) {
    const i = e.fieldDef(n);
    if (i?.bin) {
      const { bin: r, field: o } = i, a = rt(n), s = e.getName(a);
      if (t.isObject(r) && r.binned && void 0 !== r.step) {
        return new Ud(() => {
          const t = e.scaleName(n),
            i = `(domain("${t}")[1] - domain("${t}")[0]) / ${r.step}`;
          return `${e.getSignalName(s)} / (${i})`;
        });
      }
      if (ln(r)) {
        const t = ed(e, o, r);
        return new Ud(() => {
          const n = e.getSignalName(t),
            i = `(${n}.stop - ${n}.start) / ${n}.step`;
          return `${e.getSignalName(s)} / (${i})`;
        });
      }
    }
  }
  function rm(e, n) {
    const i = n.specifiedScales[e],
      { size: r } = n,
      o = n.getScaleComponent(e).get("type");
    for (const r of nm) {
      if (void 0 !== i[r]) {
        const a = Cr(o, r), s = Nr(e, r);
        if (a) {
          if (s) yi(s);
          else {switch (r) {
              case "range": {
                const r = i.range;
                if (t.isArray(r)) {
                  if (zt(e)) {
                    return Ql(r.map((e) => {
                      if ("width" === e || "height" === e) {
                        const t = n.getName(e), i = n.getSignalName.bind(n);
                        return Ud.fromName(i, t);
                      }
                      return e;
                    }));
                  }
                } else if (t.isObject(r)) {
                  return Ql({
                    data: n.requestDataName(cc.Main),
                    field: r.field,
                    sort: { op: "min", field: n.vgField(e) },
                  });
                }
                return Ql(r);
              }
              case "scheme":
                return Ql(om(i[r]));
            }}
        } else yi(ci(o, r, e));
      }
    }
    const a = e === Z || "xOffset" === e ? "width" : "height", s = r[a];
    if (Os(s)) {
      if (zt(e)) {
        if (hr(o)) {
          const t = sm(s, n, e);
          if (t) return Ql({ step: t });
        } else yi(ui(a));
      } else if (Pt(e)) {
        const t = e === ie ? "x" : "y";
        if ("band" === n.getScaleComponent(t).get("type")) {
          const e = lm(s, o);
          if (e) return Ql(e);
        }
      }
    }
    const { rangeMin: l, rangeMax: u } = i,
      f = function (e, n) {
        const { size: i, config: r, mark: o, encoding: a } = n,
          { type: s } = ma(a[e]),
          l = n.getScaleComponent(e),
          u = l.get("type"),
          { domain: f, domainMid: d } = n.specifiedScales[e];
        switch (e) {
          case Z:
          case ee:
            if (p(["point", "band"], u)) {
              const t = cm(e, i, r.view);
              if (Os(t)) return { step: sm(t, n, e) };
            }
            return am(e, n, u);
          case ie:
          case re:
            return function (e, t, n) {
              const i = e === ie ? "x" : "y", r = t.getScaleComponent(i);
              if (!r) return am(i, t, n, { center: !0 });
              const o = r.get("type"),
                a = t.scaleName(i),
                { markDef: s, config: l } = t;
              if ("band" === o) {
                const e = cm(i, t.size, t.config.view);
                if (Os(e)) {
                  const t = lm(e, n);
                  if (t) return t;
                }
                return [0, { signal: `bandwidth('${a}')` }];
              }
              {
                const n = t.encoding[i];
                if (Io(n) && n.timeUnit) {
                  const e = Mi(n.timeUnit, (e) => `scale('${a}', ${e})`),
                    i = t.config.scale.bandWithNestedOffsetPaddingInner,
                    r = Eo({ fieldDef: n, markDef: s, config: l }) - .5,
                    o = 0 !== r ? ` + ${r}` : "";
                  if (i) {
                    return [{
                      signal: `${
                        yn(i) ? `${i.signal}/2` + o : `${i / 2 + r}`
                      } * (${e})`,
                    }, {
                      signal: `${
                        yn(i) ? `(1 - ${i.signal}/2)` + o : `${1 - i / 2 + r}`
                      } * (${e})`,
                    }];
                  }
                  return [0, { signal: e }];
                }
                return c(
                  `Cannot use ${e} scale if ${i} scale is not discrete.`,
                );
              }
            }(e, n, u);
          case ye: {
            const a = function (e, t) {
                switch (e) {
                  case "bar":
                  case "tick":
                    return t.scale.minBandSize;
                  case "line":
                  case "trail":
                  case "rule":
                    return t.scale.minStrokeWidth;
                  case "text":
                    return t.scale.minFontSize;
                  case "point":
                  case "square":
                  case "circle":
                    return t.scale.minSize;
                }
                throw new Error(ni("size", e));
              }(o, r),
              s = function (e, n, i, r) {
                const o = { x: im(i, "x"), y: im(i, "y") };
                switch (e) {
                  case "bar":
                  case "tick": {
                    if (void 0 !== r.scale.maxBandSize) {
                      return r.scale
                        .maxBandSize;
                    }
                    const e = fm(n, o, r.view);
                    return t.isNumber(e)
                      ? e - 1
                      : new Ud(() => `${e.signal} - 1`);
                  }
                  case "line":
                  case "trail":
                  case "rule":
                    return r.scale.maxStrokeWidth;
                  case "text":
                    return r.scale.maxFontSize;
                  case "point":
                  case "square":
                  case "circle": {
                    if (r.scale.maxSize) return r.scale.maxSize;
                    const e = fm(n, o, r.view);
                    return t.isNumber(e)
                      ? Math.pow(um * e, 2)
                      : new Ud(() => `pow(${um} * ${e.signal}, 2)`);
                  }
                }
                throw new Error(ni("size", e));
              }(o, i, n, r);
            return br(u)
              ? function (e, t, n) {
                const i = () => {
                  const i = On(t), r = On(e), o = `(${i} - ${r}) / (${n} - 1)`;
                  return `sequence(${r}, ${i} + ${o}, ${o})`;
                };
                return yn(t) ? new Ud(i) : { signal: i() };
              }(
                a,
                s,
                function (e, n, i, r) {
                  switch (e) {
                    case "quantile":
                      return n.scale.quantileCount;
                    case "quantize":
                      return n.scale.quantizeCount;
                    case "threshold":
                      return void 0 !== i && t.isArray(i)
                        ? i.length + 1
                        : (yi(function (e) {
                          return `Domain for ${e} is required for threshold scale.`;
                        }(r)),
                          3);
                  }
                }(u, r, f, e),
              )
              : [a, s];
          }
          case se:
            return [0, 2 * Math.PI];
          case ve:
            return [0, 360];
          case oe:
            return [
              0,
              new Ud(() =>
                `min(${
                  n.getSignalName($m(n.parent) ? "child_width" : "width")
                },${
                  n.getSignalName($m(n.parent) ? "child_height" : "height")
                })/2`
              ),
            ];
          case we:
            return [r.scale.minStrokeWidth, r.scale.maxStrokeWidth];
          case ke:
            return [[1, 0], [4, 2], [2, 1], [1, 1], [1, 2, 4, 2]];
          case he:
            return "symbol";
          case me:
          case pe:
          case ge:
            return "ordinal" === u
              ? "nominal" === s ? "category" : "ordinal"
              : void 0 !== d
              ? "diverging"
              : "rect" === o || "geoshape" === o
              ? "heatmap"
              : "ramp";
          case be:
          case xe:
          case $e:
            return [r.scale.minOpacity, r.scale.maxOpacity];
        }
      }(e, n);
    return (void 0 !== l || void 0 !== u) && Cr(o, "rangeMin") &&
        t.isArray(f) && 2 === f.length
      ? Ql([l ?? f[0], u ?? f[1]])
      : Jl(f);
  }
  function om(e) {
    return (function (e) {
        return !t.isString(e) && !!e.name;
      })(e)
      ? { scheme: e.name, ...f(e, ["name"]) }
      : { scheme: e };
  }
  function am(e, t, n) {
    let { center: i } = arguments.length > 3 && void 0 !== arguments[3]
      ? arguments[3]
      : {};
    const r = rt(e), o = t.getName(r), a = t.getSignalName.bind(t);
    return e === ee && yr(n)
      ? i
        ? [
          Ud.fromName((e) => `${a(e)}/2`, o),
          Ud.fromName((e) => `-${a(e)}/2`, o),
        ]
        : [Ud.fromName(a, o), 0]
      : i
      ? [
        Ud.fromName((e) => `-${a(e)}/2`, o),
        Ud.fromName((e) => `${a(e)}/2`, o),
      ]
      : [0, Ud.fromName(a, o)];
  }
  function sm(e, n, i) {
    const { encoding: r } = n, o = n.getScaleComponent(i), a = at(i), s = r[a];
    if (
      "offset" === zs({ step: e, offsetIsDiscrete: Xo(s) && Zi(s.type) }) &&
      Ta(r, a)
    ) {
      const i = n.getScaleComponent(a);
      let r = `domain('${n.scaleName(a)}').length`;
      if ("band" === i.get("type")) {
        r = `bandspace(${r}, ${
          i.get("paddingInner") ?? i.get("padding") ?? 0
        }, ${i.get("paddingOuter") ?? i.get("padding") ?? 0})`;
      }
      const s = o.get("paddingInner") ?? o.get("padding");
      return {
        signal: `${e.step} * ${r} / (1-${l = s,
          yn(l) ? l.signal : t.stringValue(l)})`,
      };
    }
    return e.step;
    var l;
  }
  function lm(e, t) {
    if ("offset" === zs({ step: e, offsetIsDiscrete: hr(t) })) {
      return { step: e.step };
    }
  }
  function cm(e, t, n) {
    const i = e === Z ? "width" : "height", r = t[i];
    return r || As(n, i);
  }
  const um = .95;
  function fm(e, t, n) {
    const i = Os(e.width) ? e.width.step : Ps(n, "width"),
      r = Os(e.height) ? e.height.step : Ps(n, "height");
    return t.x || t.y
      ? new Ud(
        () => `min(${[t.x ? t.x.signal : i, t.y ? t.y.signal : r].join(", ")})`,
      )
      : Math.min(i, r);
  }
  function dm(e, t) {
    xm(e)
      ? function (e, t) {
        const n = e.component.scales,
          { config: i, encoding: r, markDef: o, specifiedScales: a } = e;
        for (const s of D(n)) {
          const l = a[s],
            c = n[s],
            u = e.getScaleComponent(s),
            f = ma(r[s]),
            d = l[t],
            m = u.get("type"),
            p = u.get("padding"),
            g = u.get("paddingInner"),
            h = Cr(m, t),
            y = Nr(s, t);
          if (
            void 0 !== d && (h ? y && yi(y) : yi(ci(m, t, s))),
              h && void 0 === y
          ) {
            if (void 0 !== d) {
              const e = f.timeUnit, n = f.type;
              switch (t) {
                case "domainMax":
                case "domainMin":
                  vi(l[t]) || "temporal" === n || e
                    ? c.set(
                      t,
                      { signal: xa(l[t], { type: n, timeUnit: e }) },
                      !0,
                    )
                    : c.set(t, l[t], !0);
                  break;
                default:
                  c.copyKeyFromObject(t, l);
              }
            } else {
              const n = t in mm
                ? mm[t]({
                  model: e,
                  channel: s,
                  fieldOrDatumDef: f,
                  scaleType: m,
                  scalePadding: p,
                  scalePaddingInner: g,
                  domain: l.domain,
                  domainMin: l.domainMin,
                  domainMax: l.domainMax,
                  markDef: o,
                  config: i,
                  hasNestedOffsetScale: ja(r, s),
                  hasSecondaryRangeChannel: !!r[it(s)],
                })
                : i.scale[t];
              void 0 !== n && c.set(t, n, !1);
            }
          }
        }
      }(e, t)
      : gm(e, t);
  }
  const mm = {
    bins: (e) => {
      let { model: t, fieldOrDatumDef: n } = e;
      return Io(n)
        ? function (e, t) {
          const n = t.bin;
          if (ln(n)) {
            const i = ed(e, t.field, n);
            return new Ud(() => e.getSignalName(i));
          }
          if (cn(n) && un(n) && void 0 !== n.step) return { step: n.step };
          return;
        }(t, n)
        : void 0;
    },
    interpolate: (e) => {
      let { channel: t, fieldOrDatumDef: n } = e;
      return function (e, t) {
        if (p([me, pe, ge], e) && "nominal" !== t) return "hcl";
        return;
      }(t, n.type);
    },
    nice: (e) => {
      let {
        scaleType: n,
        channel: i,
        domain: r,
        domainMin: o,
        domainMax: a,
        fieldOrDatumDef: s,
      } = e;
      return function (e, n, i, r, o, a) {
        if (
          da(a)?.bin || t.isArray(i) || null != o || null != r ||
          p([or.TIME, or.UTC], e)
        ) return;
        return !!zt(n) || void 0;
      }(n, i, r, o, a, s);
    },
    padding: (e) => {
      let {
        channel: t,
        scaleType: n,
        fieldOrDatumDef: i,
        markDef: r,
        config: o,
      } = e;
      return function (e, t, n, i, r, o) {
        if (zt(e)) {
          if (vr(t)) {
            if (void 0 !== n.continuousPadding) return n.continuousPadding;
            const { type: t, orient: a } = r;
            if (
              "bar" === t && (!Io(i) || !i.bin && !i.timeUnit) &&
              ("vertical" === a && "x" === e || "horizontal" === a && "y" === e)
            ) return o.continuousBandSize;
          }
          if (t === or.POINT) return n.pointPadding;
        }
        return;
      }(t, n, o.scale, i, r, o.bar);
    },
    paddingInner: (e) => {
      let {
        scalePadding: t,
        channel: n,
        markDef: i,
        scaleType: r,
        config: o,
        hasNestedOffsetScale: a,
      } = e;
      return function (e, t, n, i, r) {
        let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        if (void 0 !== e) return;
        if (zt(t)) {
          const {
            bandPaddingInner: e,
            barBandPaddingInner: t,
            rectBandPaddingInner: i,
            bandWithNestedOffsetPaddingInner: a,
          } = r;
          return o ? a : q(e, "bar" === n ? t : i);
        }
        if (Pt(t) && i === or.BAND) return r.offsetBandPaddingInner;
        return;
      }(t, n, i.type, r, o.scale, a);
    },
    paddingOuter: (e) => {
      let {
        scalePadding: t,
        channel: n,
        scaleType: i,
        scalePaddingInner: r,
        config: o,
        hasNestedOffsetScale: a,
      } = e;
      return function (e, t, n, i, r) {
        let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        if (void 0 !== e) return;
        if (zt(t)) {
          const { bandPaddingOuter: e, bandWithNestedOffsetPaddingOuter: t } =
            r;
          if (o) return t;
          if (n === or.BAND) {
            return q(e, yn(i) ? { signal: `${i.signal}/2` } : i / 2);
          }
        } else if (Pt(t)) {
          if (n === or.POINT) return .5;
          if (n === or.BAND) return r.offsetBandPaddingOuter;
        }
        return;
      }(t, n, i, r, o.scale, a);
    },
    reverse: (e) => {
      let { fieldOrDatumDef: t, scaleType: n, channel: i, config: r } = e;
      return function (e, t, n, i) {
        if ("x" === n && void 0 !== i.xReverse) {
          return yr(e) && "descending" === t
            ? yn(i.xReverse) ? { signal: `!${i.xReverse.signal}` } : !i.xReverse
            : i.xReverse;
        }
        if (yr(e) && "descending" === t) return !0;
        return;
      }(n, Io(t) ? t.sort : void 0, i, r.scale);
    },
    zero: (e) => {
      let {
        channel: n,
        fieldOrDatumDef: i,
        domain: r,
        markDef: o,
        scaleType: a,
        config: s,
        hasSecondaryRangeChannel: l,
      } = e;
      return function (e, n, i, r, o, a, s) {
        if (i && "unaggregated" !== i && yr(o)) {
          if (t.isArray(i)) {
            const e = i[0], n = i[i.length - 1];
            if (t.isNumber(e) && e <= 0 && t.isNumber(n) && n >= 0) return !0;
          }
          return !1;
        }
        if ("size" === e && "quantitative" === n.type && !br(o)) return !0;
        if ((!Io(n) || !n.bin) && p([...Ft, ...Ct], e)) {
          const { orient: t, type: n } = r;
          return (!p(["bar", "area", "line", "trail"], n) ||
            !("horizontal" === t && "y" === e ||
              "vertical" === t && "x" === e)) &&
            (!(!p(["bar", "area"], n) || s) || a?.zero);
        }
        return !1;
      }(n, i, r, o, a, s.scale, l);
    },
  };
  function pm(e) {
    xm(e)
      ? function (e) {
        const t = e.component.scales;
        for (const n of Bt) {
          const i = t[n];
          if (!i) continue;
          const r = rm(n, e);
          i.setWithExplicit("range", r);
        }
      }(e)
      : gm(e, "range");
  }
  function gm(e, t) {
    const n = e.component.scales;
    for (const n of e.children) "range" === t ? pm(n) : dm(n, t);
    for (const i of D(n)) {
      let r;
      for (const n of e.children) {
        const e = n.component.scales[i];
        if (e) {
          r = ec(
            r,
            e.getWithExplicit(t),
            t,
            "scale",
            Kl(
              (e, n) => "range" === t && e.step && n.step ? e.step - n.step : 0,
            ),
          );
        }
      }
      n[i].setWithExplicit(t, r);
    }
  }
  function hm(e, t, n, i) {
    const r = function (e, t, n, i) {
        switch (t.type) {
          case "nominal":
          case "ordinal":
            if (Le(e) || "discrete" === Qt(e)) {
              return "shape" === e && "ordinal" === t.type &&
                yi(oi(e, "ordinal")),
                "ordinal";
            }
            if (zt(e) || Pt(e)) {
              if (p(["rect", "bar", "image", "rule"], n.type)) return "band";
              if (i) return "band";
            } else if ("arc" === n.type && e in Ot) return "band";
            return Zr(n[rt(e)]) || Zo(t) && t.axis?.tickBand ? "band" : "point";
          case "temporal":
            return Le(e)
              ? "time"
              : "discrete" === Qt(e)
              ? (yi(oi(e, "temporal")), "ordinal")
              : Io(t) && t.timeUnit && Ei(t.timeUnit).utc
              ? "utc"
              : "time";
          case "quantitative":
            return Le(e)
              ? Io(t) && ln(t.bin) ? "bin-ordinal" : "linear"
              : "discrete" === Qt(e)
              ? (yi(oi(e, "quantitative")), "ordinal")
              : "linear";
          case "geojson":
            return;
        }
        throw new Error(Zn(t.type));
      }(
        t,
        n,
        i,
        arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      ),
      { type: o } = e;
    return Vt(t)
      ? void 0 !== o
        ? (function (e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] &&
              arguments[2];
            if (!Vt(e)) return !1;
            switch (e) {
              case Z:
              case ee:
              case ie:
              case re:
              case se:
              case oe:
                return !!vr(t) || "band" === t || "point" === t && !n;
              case ye:
              case we:
              case be:
              case xe:
              case $e:
              case ve:
                return vr(t) || br(t) || p(["band", "point", "ordinal"], t);
              case me:
              case pe:
              case ge:
                return "band" !== t;
              case ke:
              case he:
                return "ordinal" === t || br(t);
            }
          })(t, o)
          ? Io(n) && (a = o,
              s = n.type,
              !(p([tr, ir], s)
                ? void 0 === a || hr(a)
                : s === nr
                ? p([or.TIME, or.UTC, void 0], a)
                : s !== er || dr(a) || br(a) || void 0 === a))
            ? (yi(function (e, t) {
              return `FieldDef does not work with "${e}" scale. We are using "${t}" scale instead.`;
            }(o, r)),
              r)
            : o
          : (yi(function (e, t, n) {
            return `Channel "${e}" does not work with "${t}" scale. We are using "${n}" scale instead.`;
          }(t, o, r)),
            r)
        : r
      : null;
    var a, s;
  }
  function ym(e) {
    xm(e)
      ? e.component.scales = function (e) {
        const { encoding: t, mark: n, markDef: i } = e, r = {};
        for (const o of Bt) {
          const a = ma(t[o]);
          if (a && n === Vr && o === he && a.type === rr) continue;
          let s = a && a.scale;
          if (a && null !== s && !1 !== s) {
            s ??= {};
            const n = hm(s, o, a, i, ja(t, o));
            r[o] = new tm(e.scaleName(`${o}`, !0), {
              value: n,
              explicit: s.type === n,
            });
          }
        }
        return r;
      }(e)
      : e.component.scales = function (e) {
        const t = e.component.scales = {}, n = {}, i = e.component.resolve;
        for (const t of e.children) {
          ym(t);
          for (const r of D(t.component.scales)) {
            if (i.scale[r] ??= Of(r, e), "shared" === i.scale[r]) {
              const e = n[r], o = t.component.scales[r].getWithExplicit("type");
              e
                ? sr(e.value, o.value)
                  ? n[r] = ec(e, o, "type", "scale", vm)
                  : (i.scale[r] = "independent", delete n[r])
                : n[r] = o;
            }
          }
        }
        for (const i of D(n)) {
          const r = e.scaleName(i, !0), o = n[i];
          t[i] = new tm(r, o);
          for (const t of e.children) {
            const e = t.component.scales[i];
            e && (t.renameScale(e.get("name"), r), e.merged = !0);
          }
        }
        return t;
      }(e);
  }
  const vm = Kl((e, t) => cr(e) - cr(t));
  class bm {
    constructor() {
      this.nameMap = {};
    }
    rename(e, t) {
      this.nameMap[e] = t;
    }
    has(e) {
      return void 0 !== this.nameMap[e];
    }
    get(e) {
      for (; this.nameMap[e] && e !== this.nameMap[e];) e = this.nameMap[e];
      return e;
    }
  }
  function xm(e) {
    return "unit" === e?.type;
  }
  function $m(e) {
    return "facet" === e?.type;
  }
  function wm(e) {
    return "concat" === e?.type;
  }
  function km(e) {
    return "layer" === e?.type;
  }
  class Sm {
    constructor(e, n, i, r, o, a, c) {
      this.type = n,
        this.parent = i,
        this.config = o,
        this.parent = i,
        this.config = o,
        this.view = pn(c),
        this.name = e.name ?? r,
        this.title = hn(e.title)
          ? { text: e.title }
          : e.title
          ? pn(e.title)
          : void 0,
        this.scaleNameMap = i ? i.scaleNameMap : new bm(),
        this.projectionNameMap = i ? i.projectionNameMap : new bm(),
        this.signalNameMap = i ? i.signalNameMap : new bm(),
        this.data = e.data,
        this.description = e.description,
        this.transforms = (e.transform ?? []).map(
          (e) => yl(e) ? { filter: s(e.filter, Ji) } : e,
        ),
        this.layout = "layer" === n || "unit" === n ? {} : function (e, n, i) {
          const r = i[n], o = {}, { spacing: a, columns: s } = r;
          void 0 !== a && (o.spacing = a),
            void 0 !== s && (Ao(e) && !_o(e.facet) || Ss(e)) && (o.columns = s),
            Ds(e) && (o.columns = 1);
          for (const n of Ns) {
            if (void 0 !== e[n]) {
              if ("spacing" === n) {
                const i = e[n];
                o[n] = t.isNumber(i)
                  ? i
                  : { row: i.row ?? a, column: i.column ?? a };
              } else o[n] = e[n];
            }
          }
          return o;
        }(e, n, o),
        this.component = {
          data: {
            sources: i ? i.component.data.sources : [],
            outputNodes: i ? i.component.data.outputNodes : {},
            outputNodeRefCounts: i ? i.component.data.outputNodeRefCounts : {},
            isFaceted: Ao(e) ||
              i?.component.data.isFaceted && void 0 === e.data,
          },
          layoutSize: new Xl(),
          layoutHeaders: { row: {}, column: {}, facet: {} },
          mark: null,
          resolve: { scale: {}, axis: {}, legend: {}, ...a ? l(a) : {} },
          selection: null,
          scales: null,
          projection: null,
          axes: {},
          legends: {},
        };
    }
    get width() {
      return this.getSizeSignalRef("width");
    }
    get height() {
      return this.getSizeSignalRef("height");
    }
    parse() {
      this.parseScale(),
        this.parseLayoutSize(),
        this.renameTopLevelLayoutSizeSignal(),
        this.parseSelections(),
        this.parseProjection(),
        this.parseData(),
        this.parseAxesAndHeaders(),
        this.parseLegends(),
        this.parseMarkGroup();
    }
    parseScale() {
      !function (e) {
        let { ignoreRange: t } = arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : {};
        ym(e), Wd(e);
        for (const t of Or) dm(e, t);
        t || pm(e);
      }(this);
    }
    parseProjection() {
      Jf(this);
    }
    renameTopLevelLayoutSizeSignal() {
      "width" !== this.getName("width") &&
      this.renameSignal(this.getName("width"), "width"),
        "height" !== this.getName("height") &&
        this.renameSignal(this.getName("height"), "height");
    }
    parseLegends() {
      Uf(this);
    }
    assembleEncodeFromView(e) {
      const { style: t, ...n } = e, i = {};
      for (const e of D(n)) {
        const t = n[e];
        void 0 !== t && (i[e] = Fn(t));
      }
      return i;
    }
    assembleGroupEncodeEntry(e) {
      let t = {};
      return this.view && (t = this.assembleEncodeFromView(this.view)),
        e ||
          (this.description && (t.description = Fn(this.description)),
            "unit" !== this.type && "layer" !== this.type)
          ? S(t) ? void 0 : t
          : {
            width: this.getSizeSignalRef("width"),
            height: this.getSizeSignalRef("height"),
            ...t,
          };
    }
    assembleLayout() {
      if (!this.layout) return;
      const { spacing: e, ...t } = this.layout,
        { component: n, config: i } = this,
        r = function (e, t) {
          const n = {};
          for (const i of Ue) {
            const r = e[i];
            if (r?.facetFieldDef) {
              const { titleAnchor: e, titleOrient: o } = cf(
                  ["titleAnchor", "titleOrient"],
                  r.facetFieldDef.header,
                  t,
                  i,
                ),
                a = sf(i, o),
                s = xf(e, a);
              void 0 !== s && (n[a] = s);
            }
          }
          return S(n) ? void 0 : n;
        }(n.layoutHeaders, i);
      return {
        padding: e,
        ...this.assembleDefaultLayout(),
        ...t,
        ...r ? { titleBand: r } : {},
      };
    }
    assembleDefaultLayout() {
      return {};
    }
    assembleHeaderMarks() {
      const { layoutHeaders: e } = this.component;
      let t = [];
      for (const n of Ue) e[n].title && t.push(df(this, n));
      for (const e of uf) t = t.concat(gf(this, e));
      return t;
    }
    assembleAxes() {
      return function (e, t) {
        const { x: n = [], y: i = [] } = e;
        return [
          ...n.map((e) => Yu(e, "grid", t)),
          ...i.map((e) => Yu(e, "grid", t)),
          ...n.map((e) => Yu(e, "main", t)),
          ...i.map((e) => Yu(e, "main", t)),
        ].filter((e) => e);
      }(this.component.axes, this.config);
    }
    assembleLegends() {
      return Hf(this);
    }
    assembleProjections() {
      return Gf(this);
    }
    assembleTitle() {
      const { encoding: e, ...t } = this.title ?? {},
        n = {
          ...gn(this.config.title).nonMarkTitleProperties,
          ...t,
          ...e ? { encode: { update: e } } : {},
        };
      if (n.text) {
        return p(["unit", "layer"], this.type)
          ? p(["middle", void 0], n.anchor) && (n.frame ??= "group")
          : n.anchor ??= "start",
          S(n) ? void 0 : n;
      }
    }
    assembleGroup() {
      let e = arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : [];
      const t = {};
      e = e.concat(this.assembleSignals()), e.length > 0 && (t.signals = e);
      const n = this.assembleLayout();
      n && (t.layout = n),
        t.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
      const i = !this.parent || $m(this.parent) ? Zd(this) : [];
      i.length > 0 && (t.scales = i);
      const r = this.assembleAxes();
      r.length > 0 && (t.axes = r);
      const o = this.assembleLegends();
      return o.length > 0 && (t.legends = o), t;
    }
    getName(e) {
      return C((this.name ? `${this.name}_` : "") + e);
    }
    getDataName(e) {
      return this.getName(cc[e].toLowerCase());
    }
    requestDataName(e) {
      const t = this.getDataName(e),
        n = this.component.data.outputNodeRefCounts;
      return n[t] = (n[t] || 0) + 1, t;
    }
    getSizeSignalRef(e) {
      if ($m(this.parent)) {
        const t = Nt(Ff(e)), n = this.component.scales[t];
        if (n && !n.merged) {
          const e = n.get("type"), i = n.get("range");
          if (hr(e) && vn(i)) {
            const e = n.get("name"), i = Jd(Kd(this, t));
            if (i) {
              return {
                signal: Df(
                  e,
                  n,
                  ia({ aggregate: "distinct", field: i }, { expr: "datum" }),
                ),
              };
            }
            return yi(Bn(t)), null;
          }
        }
      }
      return { signal: this.signalNameMap.get(this.getName(e)) };
    }
    lookupDataSource(e) {
      const t = this.component.data.outputNodes[e];
      return t ? t.getSource() : e;
    }
    getSignalName(e) {
      return this.signalNameMap.get(e);
    }
    renameSignal(e, t) {
      this.signalNameMap.rename(e, t);
    }
    renameScale(e, t) {
      this.scaleNameMap.rename(e, t);
    }
    renameProjection(e, t) {
      this.projectionNameMap.rename(e, t);
    }
    scaleName(e, t) {
      return t ? this.getName(e) : Ke(e) && Vt(e) && this.component.scales[e] ||
          this.scaleNameMap.has(this.getName(e))
        ? this.scaleNameMap.get(this.getName(e))
        : void 0;
    }
    projectionName(e) {
      return e
        ? this.getName("projection")
        : this.component.projection && !this.component.projection.merged ||
            this.projectionNameMap.has(this.getName("projection"))
        ? this.projectionNameMap.get(this.getName("projection"))
        : void 0;
    }
    correctDataNames = (e) => (e.from?.data &&
      (e.from.data = this.lookupDataSource(e.from.data)),
      e.from?.facet?.data &&
      (e.from.facet.data = this.lookupDataSource(e.from.facet.data)),
      e);
    getScaleComponent(e) {
      if (!this.component.scales) {
        throw new Error(
          "getScaleComponent cannot be called before parseScale(). Make sure you have called parseScale or use parseUnitModelWithScale().",
        );
      }
      const t = this.component.scales[e];
      return t && !t.merged
        ? t
        : this.parent
        ? this.parent.getScaleComponent(e)
        : void 0;
    }
    getScaleType(e) {
      const t = this.getScaleComponent(e);
      return t ? t.get("type") : void 0;
    }
    getSelectionComponent(e, t) {
      let n = this.component.selection[e];
      if (
        !n && this.parent && (n = this.parent.getSelectionComponent(e, t)), !n
      ) {
        throw new Error(function (e) {
          return `Cannot find a selection named "${e}".`;
        }(t));
      }
      return n;
    }
    hasAxisOrientSignalRef() {
      return this.component.axes.x?.some((e) => e.hasOrientSignalRef()) ||
        this.component.axes.y?.some((e) => e.hasOrientSignalRef());
    }
  }
  class Dm extends Sm {
    vgField(e) {
      let t = arguments.length > 1 && void 0 !== arguments[1]
        ? arguments[1]
        : {};
      const n = this.fieldDef(e);
      if (n) return ia(n, t);
    }
    reduceFieldDef(e, n) {
      return function (e, n, i, r) {
        return e
          ? D(e).reduce((i, o) => {
            const a = e[o];
            return t.isArray(a)
              ? a.reduce((e, t) => n.call(r, e, t, o), i)
              : n.call(r, i, a, o);
          }, i)
          : i;
      }(this.getMapping(), (t, n, i) => {
        const r = da(n);
        return r ? e(t, r, i) : t;
      }, n);
    }
    forEachFieldDef(e, t) {
      qa(this.getMapping(), (t, n) => {
        const i = da(t);
        i && e(i, n);
      }, t);
    }
  }
  class Fm extends yc {
    clone() {
      return new Fm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const n = this.transform.as ?? [void 0, void 0];
      this.transform.as = [n[0] ?? "value", n[1] ?? "density"];
      const i = this.transform.resolve ?? "shared";
      this.transform.resolve = i;
    }
    dependentFields() {
      return new Set([this.transform.density, ...this.transform.groupby ?? []]);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `DensityTransform ${d(this.transform)}`;
    }
    assemble() {
      const { density: e, ...t } = this.transform,
        n = { type: "kde", field: e, ...t };
      return n.resolve = this.transform.resolve, n;
    }
  }
  class zm extends yc {
    clone() {
      return new zm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
    }
    dependentFields() {
      return new Set([this.transform.extent]);
    }
    producedFields() {
      return new Set([]);
    }
    hash() {
      return `ExtentTransform ${d(this.transform)}`;
    }
    assemble() {
      const { extent: e, param: t } = this.transform;
      return { type: "extent", field: e, signal: t };
    }
  }
  class Om extends yc {
    clone() {
      return new Om(this.parent, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const { flatten: n, as: i = [] } = this.transform;
      this.transform.as = n.map((e, t) => i[t] ?? e);
    }
    dependentFields() {
      return new Set(this.transform.flatten);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `FlattenTransform ${d(this.transform)}`;
    }
    assemble() {
      const { flatten: e, as: t } = this.transform;
      return { type: "flatten", fields: e, as: t };
    }
  }
  class Cm extends yc {
    clone() {
      return new Cm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const n = this.transform.as ?? [void 0, void 0];
      this.transform.as = [n[0] ?? "key", n[1] ?? "value"];
    }
    dependentFields() {
      return new Set(this.transform.fold);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `FoldTransform ${d(this.transform)}`;
    }
    assemble() {
      const { fold: e, as: t } = this.transform;
      return { type: "fold", fields: e, as: t };
    }
  }
  class Nm extends yc {
    clone() {
      return new Nm(null, l(this.fields), this.geojson, this.signal);
    }
    static parseAll(e, t) {
      if (t.component.projection && !t.component.projection.isFit) return e;
      let n = 0;
      for (const i of [[ue, ce], [de, fe]]) {
        const r = i.map((e) => {
          const n = ma(t.encoding[e]);
          return Io(n)
            ? n.field
            : Vo(n)
            ? { expr: `${n.datum}` }
            : Jo(n)
            ? { expr: `${n.value}` }
            : void 0;
        });
        (r[0] || r[1]) && (e = new Nm(e, r, null, t.getName("geojson_" + n++)));
      }
      if (t.channelHasField(he)) {
        const i = t.typedFieldDef(he);
        i.type === rr &&
          (e = new Nm(e, null, i.field, t.getName("geojson_" + n++)));
      }
      return e;
    }
    constructor(e, t, n, i) {
      super(e), this.fields = t, this.geojson = n, this.signal = i;
    }
    dependentFields() {
      const e = (this.fields ?? []).filter(t.isString);
      return new Set([...this.geojson ? [this.geojson] : [], ...e]);
    }
    producedFields() {
      return new Set();
    }
    hash() {
      return `GeoJSON ${this.geojson} ${this.signal} ${d(this.fields)}`;
    }
    assemble() {
      return [
        ...this.geojson
          ? [{ type: "filter", expr: `isValid(datum["${this.geojson}"])` }]
          : [],
        {
          type: "geojson",
          ...this.fields ? { fields: this.fields } : {},
          ...this.geojson ? { geojson: this.geojson } : {},
          signal: this.signal,
        },
      ];
    }
  }
  class _m extends yc {
    clone() {
      return new _m(null, this.projection, l(this.fields), l(this.as));
    }
    constructor(e, t, n, i) {
      super(e), this.projection = t, this.fields = n, this.as = i;
    }
    static parseAll(e, t) {
      if (!t.projectionName()) return e;
      for (const n of [[ue, ce], [de, fe]]) {
        const i = n.map((e) => {
            const n = ma(t.encoding[e]);
            return Io(n)
              ? n.field
              : Vo(n)
              ? { expr: `${n.datum}` }
              : Jo(n)
              ? { expr: `${n.value}` }
              : void 0;
          }),
          r = n[0] === de ? "2" : "";
        (i[0] || i[1]) &&
          (e = new _m(e, t.projectionName(), i, [
            t.getName(`x${r}`),
            t.getName(`y${r}`),
          ]));
      }
      return e;
    }
    dependentFields() {
      return new Set(this.fields.filter(t.isString));
    }
    producedFields() {
      return new Set(this.as);
    }
    hash() {
      return `Geopoint ${this.projection} ${d(this.fields)} ${d(this.as)}`;
    }
    assemble() {
      return {
        type: "geopoint",
        projection: this.projection,
        fields: this.fields,
        as: this.as,
      };
    }
  }
  class Pm extends yc {
    clone() {
      return new Pm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t;
    }
    dependentFields() {
      return new Set([
        this.transform.impute,
        this.transform.key,
        ...this.transform.groupby ?? [],
      ]);
    }
    producedFields() {
      return new Set([this.transform.impute]);
    }
    processSequence(e) {
      const { start: t = 0, stop: n, step: i } = e;
      return { signal: `sequence(${[t, n, ...i ? [i] : []].join(",")})` };
    }
    static makeFromTransform(e, t) {
      return new Pm(e, t);
    }
    static makeFromEncoding(e, t) {
      const n = t.encoding, i = n.x, r = n.y;
      if (Io(i) && Io(r)) {
        const o = i.impute ? i : r.impute ? r : void 0;
        if (void 0 === o) return;
        const a = i.impute ? r : r.impute ? i : void 0,
          { method: s, value: l, frame: c, keyvals: u } = o.impute,
          f = Ua(t.mark, n);
        return new Pm(e, {
          impute: o.field,
          key: a.field,
          ...s ? { method: s } : {},
          ...void 0 !== l ? { value: l } : {},
          ...c ? { frame: c } : {},
          ...void 0 !== u ? { keyvals: u } : {},
          ...f.length ? { groupby: f } : {},
        });
      }
      return null;
    }
    hash() {
      return `Impute ${d(this.transform)}`;
    }
    assemble() {
      const {
          impute: e,
          key: t,
          keyvals: n,
          method: i,
          groupby: r,
          value: o,
          frame: a = [null, null],
        } = this.transform,
        s = {
          type: "impute",
          field: e,
          key: t,
          ...n
            ? {
              keyvals:
                (l = n, void 0 !== l?.stop ? this.processSequence(n) : n),
            }
            : {},
          method: "value",
          ...r ? { groupby: r } : {},
          value: i && "value" !== i ? null : o,
        };
      var l;
      if (i && "value" !== i) {
        return [s, {
          type: "window",
          as: [`imputed_${e}_value`],
          ops: [i],
          fields: [e],
          frame: a,
          ignorePeers: !1,
          ...r ? { groupby: r } : {},
        }, {
          type: "formula",
          expr: `datum.${e} === null ? datum.imputed_${e}_value : datum.${e}`,
          as: e,
        }];
      }
      return [s];
    }
  }
  class Am extends yc {
    clone() {
      return new Am(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const n = this.transform.as ?? [void 0, void 0];
      this.transform.as = [n[0] ?? t.on, n[1] ?? t.loess];
    }
    dependentFields() {
      return new Set([
        this.transform.loess,
        this.transform.on,
        ...this.transform.groupby ?? [],
      ]);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `LoessTransform ${d(this.transform)}`;
    }
    assemble() {
      const { loess: e, on: t, ...n } = this.transform;
      return { type: "loess", x: t, y: e, ...n };
    }
  }
  class Tm extends yc {
    clone() {
      return new Tm(null, l(this.transform), this.secondary);
    }
    constructor(e, t, n) {
      super(e), this.transform = t, this.secondary = n;
    }
    static make(e, t, n, i) {
      const r = t.component.data.sources, { from: o } = n;
      let a = null;
      if (
        function (e) {
          return "data" in e;
        }(o)
      ) {
        let e = Xm(o.data, r);
        e || (e = new md(o.data), r.push(e));
        const n = t.getName(`lookup_${i}`);
        a = new vc(e, n, cc.Lookup, t.component.data.outputNodeRefCounts),
          t.component.data.outputNodes[n] = a;
      } else if (
        function (e) {
          return "param" in e;
        }(o)
      ) {
        const e = o.param;
        let i;
        n = { as: e, ...n };
        try {
          i = t.getSelectionComponent(C(e), e);
        } catch (t) {
          throw new Error(function (e) {
            return `Lookups can only be performed on selection parameters. "${e}" is a variable parameter.`;
          }(e));
        }
        if (a = i.materialized, !a) {
          throw new Error(function (e) {
            return `Cannot define and lookup the "${e}" selection in the same view. Try moving the lookup into a second, layered view?`;
          }(e));
        }
      }
      return new Tm(e, n, a.getSource());
    }
    dependentFields() {
      return new Set([this.transform.lookup]);
    }
    producedFields() {
      return new Set(
        this.transform.as
          ? t.array(this.transform.as)
          : this.transform.from.fields,
      );
    }
    hash() {
      return `Lookup ${
        d({ transform: this.transform, secondary: this.secondary })
      }`;
    }
    assemble() {
      let e;
      if (this.transform.from.fields) {
        e = {
          values: this.transform.from.fields,
          ...this.transform.as ? { as: t.array(this.transform.as) } : {},
        };
      } else {
        let n = this.transform.as;
        t.isString(n) ||
        (yi(
          'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.',
        ),
          n = "_lookup"), e = { as: [n] };
      }
      return {
        type: "lookup",
        from: this.secondary,
        key: this.transform.from.key,
        fields: [this.transform.lookup],
        ...e,
        ...this.transform.default ? { default: this.transform.default } : {},
      };
    }
  }
  class jm extends yc {
    clone() {
      return new jm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const n = this.transform.as ?? [void 0, void 0];
      this.transform.as = [n[0] ?? "prob", n[1] ?? "value"];
    }
    dependentFields() {
      return new Set([
        this.transform.quantile,
        ...this.transform.groupby ?? [],
      ]);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `QuantileTransform ${d(this.transform)}`;
    }
    assemble() {
      const { quantile: e, ...t } = this.transform;
      return { type: "quantile", field: e, ...t };
    }
  }
  class Em extends yc {
    clone() {
      return new Em(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t, this.transform = l(t);
      const n = this.transform.as ?? [void 0, void 0];
      this.transform.as = [n[0] ?? t.on, n[1] ?? t.regression];
    }
    dependentFields() {
      return new Set([
        this.transform.regression,
        this.transform.on,
        ...this.transform.groupby ?? [],
      ]);
    }
    producedFields() {
      return new Set(this.transform.as);
    }
    hash() {
      return `RegressionTransform ${d(this.transform)}`;
    }
    assemble() {
      const { regression: e, on: t, ...n } = this.transform;
      return { type: "regression", x: t, y: e, ...n };
    }
  }
  class Mm extends yc {
    clone() {
      return new Mm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t;
    }
    addDimensions(e) {
      this.transform.groupby = b(
        (this.transform.groupby ?? []).concat(e),
        (e) => e,
      );
    }
    producedFields() {}
    dependentFields() {
      return new Set([
        this.transform.pivot,
        this.transform.value,
        ...this.transform.groupby ?? [],
      ]);
    }
    hash() {
      return `PivotTransform ${d(this.transform)}`;
    }
    assemble() {
      const { pivot: e, value: t, groupby: n, limit: i, op: r } =
        this.transform;
      return {
        type: "pivot",
        field: e,
        value: t,
        ...void 0 !== i ? { limit: i } : {},
        ...void 0 !== r ? { op: r } : {},
        ...void 0 !== n ? { groupby: n } : {},
      };
    }
  }
  class Rm extends yc {
    clone() {
      return new Rm(null, l(this.transform));
    }
    constructor(e, t) {
      super(e), this.transform = t;
    }
    dependentFields() {
      return new Set();
    }
    producedFields() {
      return new Set();
    }
    hash() {
      return `SampleTransform ${d(this.transform)}`;
    }
    assemble() {
      return { type: "sample", size: this.transform.sample };
    }
  }
  function Lm(e) {
    let t = 0;
    return function n(i, r) {
      if (i instanceof md && !i.isGenerator && !nc(i.data)) {
        e.push(r);
        r = { name: null, source: r.name, transform: [] };
      }
      if (
        i instanceof cd &&
        (i.parent instanceof md && !r.source
          ? (r.format = { ...r.format, parse: i.assembleFormatParse() },
            r.transform.push(...i.assembleTransforms(!0)))
          : r.transform.push(...i.assembleTransforms())), i instanceof od
      ) {
        return r.name || (r.name = "data_" + t++),
          !r.source || r.transform.length > 0
            ? (e.push(r), i.data = r.name)
            : i.data = r.source,
          void e.push(...i.assemble());
      }
      if (
        (i instanceof fd || i instanceof dd || i instanceof Nd ||
          i instanceof Iu || i instanceof of || i instanceof _m ||
          i instanceof rd || i instanceof Tm || i instanceof Ad ||
          i instanceof Cd || i instanceof Cm || i instanceof Om ||
          i instanceof Fm || i instanceof Am || i instanceof jm ||
          i instanceof Em || i instanceof ud || i instanceof Rm ||
          i instanceof Mm || i instanceof zm) && r.transform.push(i.assemble()),
          (i instanceof nd || i instanceof $c || i instanceof Pm ||
            i instanceof Pd || i instanceof Nm) &&
          r.transform.push(...i.assemble()),
          i instanceof vc
      ) {
        if (r.source && 0 === r.transform.length) i.setSource(r.source);
        else if (i.parent instanceof vc) i.setSource(r.name);
        else if (
          r.name || (r.name = "data_" + t++),
            i.setSource(r.name),
            1 === i.numChildren()
        ) {
          e.push(r);
          r = { name: null, source: r.name, transform: [] };
        }
      }
      switch (i.numChildren()) {
        case 0:
          i instanceof vc && (!r.source || r.transform.length > 0) && e.push(r);
          break;
        case 1:
          n(i.children[0], r);
          break;
        default: {
          r.name || (r.name = "data_" + t++);
          let o = r.name;
          !r.source || r.transform.length > 0 ? e.push(r) : o = r.source;
          for (const e of i.children) {
            n(e, { name: null, source: o, transform: [] });
          }
          break;
        }
      }
    };
  }
  function qm(e) {
    return "top" === e || "left" === e || yn(e) ? "header" : "footer";
  }
  function Um(e, n) {
    const { facet: i, config: r, child: o, component: a } = e;
    if (e.channelHasField(n)) {
      const s = i[n], l = lf("title", null, r, n);
      let c = la(s, r, {
        allowDisabling: !0,
        includeDefault: void 0 === l || !!l,
      });
      o.component.layoutHeaders[n].title &&
        (c = t.isArray(c) ? c.join(", ") : c,
          c += ` / ${o.component.layoutHeaders[n].title}`,
          o.component.layoutHeaders[n].title = null);
      const u = lf("labelOrient", s.header, r, n),
        f = null !== s.header && q(s.header?.labels, r.header.labels, !0),
        d = p(["bottom", "right"], u) ? "footer" : "header";
      a.layoutHeaders[n] = {
        title: null !== s.header ? c : null,
        facetFieldDef: s,
        [d]: "facet" === n ? [] : [Wm(e, n, f)],
      };
    }
  }
  function Wm(e, t, n) {
    const i = "row" === t ? "height" : "width";
    return {
      labels: n,
      sizeSignal: e.child.component.layoutSize.get(i)
        ? e.child.getSizeSignalRef(i)
        : void 0,
      axes: [],
    };
  }
  function Im(e, t) {
    const { child: n } = e;
    if (n.component.axes[t]) {
      const { layoutHeaders: i, resolve: r } = e.component;
      if (r.axis[t] = Cf(r, t), "shared" === r.axis[t]) {
        const r = "x" === t ? "column" : "row", o = i[r];
        for (const i of n.component.axes[t]) {
          const t = qm(i.get("orient"));
          o[t] ??= [Wm(e, r, !1)];
          const n = Yu(i, "main", e.config, { header: !0 });
          n && o[t][0].axes.push(n), i.mainExtracted = !0;
        }
      }
    }
  }
  function Bm(e) {
    for (const t of e.children) t.parseLayoutSize();
  }
  function Vm(e, t) {
    const n = Ff(t),
      i = Nt(n),
      r = e.component.resolve,
      o = e.component.layoutSize;
    let a;
    for (const t of e.children) {
      const o = t.component.layoutSize.getWithExplicit(n),
        s = r.scale[i] ?? Of(i, e);
      if ("independent" === s && "step" === o.value) {
        a = void 0;
        break;
      }
      if (a) {
        if ("independent" === s && a.value !== o.value) {
          a = void 0;
          break;
        }
        a = ec(a, o, n, "");
      } else a = o;
    }
    if (a) {
      for (const i of e.children) {
        e.renameSignal(i.getName(n), e.getName(t)),
          i.component.layoutSize.set(n, "merged", !1);
      }
      o.setWithExplicit(t, a);
    } else o.setWithExplicit(t, { explicit: !1, value: void 0 });
  }
  function Hm(e, t) {
    const n = "width" === t ? "x" : "y",
      i = e.config,
      r = e.getScaleComponent(n);
    if (r) {
      const e = r.get("type"), n = r.get("range");
      if (hr(e)) {
        const e = As(i.view, t);
        return vn(n) || Os(e) ? "step" : e;
      }
      return _s(i.view, t);
    }
    if (e.hasProjection || "arc" === e.mark) return _s(i.view, t);
    {
      const e = As(i.view, t);
      return Os(e) ? e.step : e;
    }
  }
  function Gm(e, t, n) {
    return ia(t, { suffix: `by_${ia(e)}`, ...n });
  }
  class Ym extends Dm {
    constructor(e, t, n, i) {
      super(e, "facet", t, n, i, e.resolve),
        this.child = wp(e.spec, this, this.getName("child"), void 0, i),
        this.children = [this.child],
        this.facet = this.initFacet(e.facet);
    }
    initFacet(e) {
      if (!_o(e)) return { facet: this.initFacetFieldDef(e, "facet") };
      const t = D(e), n = {};
      for (const i of t) {
        if (![Q, J].includes(i)) {
          yi(ni(i, "facet"));
          break;
        }
        const t = e[i];
        if (void 0 === t.field) {
          yi(ti(t, i));
          break;
        }
        n[i] = this.initFacetFieldDef(t, i);
      }
      return n;
    }
    initFacetFieldDef(e, t) {
      const n = ha(e, t);
      return n.header
        ? n.header = pn(n.header)
        : null === n.header && (n.header = null),
        n;
    }
    channelHasField(e) {
      return !!this.facet[e];
    }
    fieldDef(e) {
      return this.facet[e];
    }
    parseData() {
      this.component.data = Qm(this), this.child.parseData();
    }
    parseLayoutSize() {
      Bm(this);
    }
    parseSelections() {
      this.child.parseSelections(),
        this.component.selection = this.child.component.selection;
    }
    parseMarkGroup() {
      this.child.parseMarkGroup();
    }
    parseAxesAndHeaders() {
      this.child.parseAxesAndHeaders(),
        function (e) {
          for (const t of Ue) Um(e, t);
          Im(e, "x"), Im(e, "y");
        }(this);
    }
    assembleSelectionTopLevelSignals(e) {
      return this.child.assembleSelectionTopLevelSignals(e);
    }
    assembleSignals() {
      return this.child.assembleSignals(), [];
    }
    assembleSelectionData(e) {
      return this.child.assembleSelectionData(e);
    }
    getHeaderLayoutMixins() {
      const e = {};
      for (const t of Ue) {
        for (const n of ff) {
          const i = this.component.layoutHeaders[t],
            r = i[n],
            { facetFieldDef: o } = i;
          if (o) {
            const n = lf("titleOrient", o.header, this.config, t);
            if (["right", "bottom"].includes(n)) {
              const i = sf(t, n);
              e.titleAnchor ??= {}, e.titleAnchor[i] = "end";
            }
          }
          if (r?.[0]) {
            const r = "row" === t ? "height" : "width",
              o = "header" === n ? "headerBand" : "footerBand";
            "facet" === t || this.child.component.layoutSize.get(r) ||
            (e[o] ??= {}, e[o][t] = .5),
              i.title &&
              (e.offset ??= {},
                e.offset["row" === t ? "rowTitle" : "columnTitle"] = 10);
          }
        }
      }
      return e;
    }
    assembleDefaultLayout() {
      const { column: e, row: t } = this.facet,
        n = e ? this.columnDistinctSignal() : t ? 1 : void 0;
      let i = "all";
      return (t || "independent" !== this.component.resolve.scale.x) &&
          (e || "independent" !== this.component.resolve.scale.y) ||
        (i = "none"),
        {
          ...this.getHeaderLayoutMixins(),
          ...n ? { columns: n } : {},
          bounds: "full",
          align: i,
        };
    }
    assembleLayoutSignals() {
      return this.child.assembleLayoutSignals();
    }
    columnDistinctSignal() {
      if (!(this.parent && this.parent instanceof Ym)) {
        return { signal: `length(data('${this.getName("column_domain")}'))` };
      }
    }
    assembleGroupStyle() {}
    assembleGroup(e) {
      return this.parent && this.parent instanceof Ym
        ? {
          ...this.channelHasField("column")
            ? {
              encode: {
                update: {
                  columns: {
                    field: ia(this.facet.column, { prefix: "distinct" }),
                  },
                },
              },
            }
            : {},
          ...super.assembleGroup(e),
        }
        : super.assembleGroup(e);
    }
    getCardinalityAggregateForChild() {
      const e = [], t = [], n = [];
      if (this.child instanceof Ym) {
        if (this.child.channelHasField("column")) {
          const i = ia(this.child.facet.column);
          e.push(i), t.push("distinct"), n.push(`distinct_${i}`);
        }
      } else {for (const i of Ft) {
          const r = this.child.component.scales[i];
          if (r && !r.merged) {
            const o = r.get("type"), a = r.get("range");
            if (hr(o) && vn(a)) {
              const r = Jd(Kd(this.child, i));
              r
                ? (e.push(r), t.push("distinct"), n.push(`distinct_${r}`))
                : yi(Bn(i));
            }
          }
        }}
      return { fields: e, ops: t, as: n };
    }
    assembleFacet() {
      const { name: e, data: n } = this.component.data.facetRoot,
        { row: i, column: r } = this.facet,
        { fields: o, ops: a, as: s } = this.getCardinalityAggregateForChild(),
        l = [];
      for (const e of Ue) {
        const n = this.facet[e];
        if (n) {
          l.push(ia(n));
          const { bin: c, sort: u } = n;
          if (ln(c) && l.push(ia(n, { binSuffix: "end" })), Co(u)) {
            const { field: e, op: t = Fo } = u, l = Gm(n, u);
            i && r
              ? (o.push(l), a.push("max"), s.push(l))
              : (o.push(e), a.push(t), s.push(l));
          } else if (t.isArray(u)) {
            const t = af(n, e);
            o.push(t), a.push("max"), s.push(t);
          }
        }
      }
      const c = !!i && !!r;
      return {
        name: e,
        data: n,
        groupby: l,
        ...c || o.length > 0
          ? {
            aggregate: {
              ...c ? { cross: c } : {},
              ...o.length ? { fields: o, ops: a, as: s } : {},
            },
          }
          : {},
      };
    }
    facetSortFields(e) {
      const { facet: n } = this, i = n[e];
      return i
        ? Co(i.sort)
          ? [Gm(i, i.sort, { expr: "datum" })]
          : t.isArray(i.sort)
          ? [af(i, e, { expr: "datum" })]
          : [ia(i, { expr: "datum" })]
        : [];
    }
    facetSortOrder(e) {
      const { facet: n } = this, i = n[e];
      if (i) {
        const { sort: e } = i;
        return [(Co(e) ? e.order : !t.isArray(e) && e) || "ascending"];
      }
      return [];
    }
    assembleLabelTitle() {
      const { facet: e, config: t } = this;
      if (e.facet) return yf(e.facet, "facet", t);
      const n = { row: ["top", "bottom"], column: ["left", "right"] };
      for (const i of uf) {
        if (e[i]) {
          const r = lf("labelOrient", e[i]?.header, t, i);
          if (n[i].includes(r)) return yf(e[i], i, t);
        }
      }
    }
    assembleMarks() {
      const { child: e } = this,
        t = function (e) {
          const t = [], n = Lm(t);
          for (const t of e.children) {
            n(t, { source: e.name, name: null, transform: [] });
          }
          return t;
        }(this.component.data.facetRoot),
        n = e.assembleGroupEncodeEntry(!1),
        i = this.assembleLabelTitle() || e.assembleTitle(),
        r = e.assembleGroupStyle();
      return [{
        name: this.getName("cell"),
        type: "group",
        ...i ? { title: i } : {},
        ...r ? { style: r } : {},
        from: { facet: this.assembleFacet() },
        sort: {
          field: Ue.map((e) => this.facetSortFields(e)).flat(),
          order: Ue.map((e) => this.facetSortOrder(e)).flat(),
        },
        ...t.length > 0 ? { data: t } : {},
        ...n ? { encode: { update: n } } : {},
        ...e.assembleGroup(pc(this, [])),
      }];
    }
    getMapping() {
      return this.facet;
    }
  }
  function Xm(e, t) {
    for (const n of t) {
      const t = n.data;
      if (e.name && n.hasName() && e.name !== n.dataName) continue;
      const i = e.format?.mesh, r = t.format?.feature;
      if (i && r) continue;
      const o = e.format?.feature;
      if ((o || r) && o !== r) continue;
      const a = t.format?.mesh;
      if (!i && !a || i === a) {
        if (ic(e) && ic(t)) {
          if (Y(e.values, t.values)) return n;
        } else if (nc(e) && nc(t)) {
          if (e.url === t.url) return n;
        } else if (rc(e) && e.name === n.dataName) return n;
      }
    }
    return null;
  }
  function Qm(e) {
    let t = function (e, t) {
      if (e.data || !e.parent) {
        if (null === e.data) {
          const e = new md({ values: [] });
          return t.push(e), e;
        }
        const n = Xm(e.data, t);
        if (n) {
          return oc(e.data) ||
            (n.data.format = y({}, e.data.format, n.data.format)),
            !n.hasName() && e.data.name && (n.dataName = e.data.name),
            n;
        }
        {
          const n = new md(e.data);
          return t.push(n), n;
        }
      }
      return e.parent.component.data.facetRoot
        ? e.parent.component.data.facetRoot
        : e.parent.component.data.main;
    }(e, e.component.data.sources);
    const { outputNodes: n, outputNodeRefCounts: i } = e.component.data,
      r = e.data,
      o = !(r && (oc(r) || nc(r) || ic(r))) && e.parent
        ? e.parent.component.data.ancestorParse.clone()
        : new tc();
    oc(r)
      ? (ac(r)
        ? t = new dd(t, r.sequence)
        : lc(r) && (t = new fd(t, r.graticule)),
        o.parseNothing = !0)
      : null === r?.format?.parse && (o.parseNothing = !0),
      t = cd.makeExplicit(t, e, o) ?? t,
      t = new ud(t);
    const a = e.parent && km(e.parent);
    (xm(e) || $m(e)) && a && (t = nd.makeFromEncoding(t, e) ?? t),
      e.transforms.length > 0 && (t = function (e, t, n) {
        let i = 0;
        for (const r of t.transforms) {
          let o, a;
          if (Ol(r)) a = e = new of(e, r), o = "derived";
          else if (yl(r)) {
            const i = sd(r);
            a = e = cd.makeWithAncestors(e, {}, i, n) ?? e,
              e = new Iu(e, t, r.filter);
          } else if (Cl(r)) a = e = nd.makeFromTransform(e, r, t), o = "number";
          else if (_l(r)) {
            o = "date",
              void 0 === n.getWithExplicit(r.field).value &&
              (e = new cd(e, { [r.field]: o }), n.set(r.field, o, !1)),
              a = e = $c.makeFromTransform(e, r);
          } else if (Pl(r)) {
            a = e = rd.makeFromTransform(e, r),
              o = "number",
              Ru(t) && (e = new ud(e));
          } else if (vl(r)) a = e = Tm.make(e, t, r, i++), o = "derived";
          else if (Dl(r)) a = e = new Ad(e, r), o = "number";
          else if (Fl(r)) a = e = new Cd(e, r), o = "number";
          else if (Al(r)) a = e = Pd.makeFromTransform(e, r), o = "derived";
          else if (Tl(r)) a = e = new Cm(e, r), o = "derived";
          else if (jl(r)) a = e = new zm(e, r), o = "derived";
          else if (zl(r)) a = e = new Om(e, r), o = "derived";
          else if (bl(r)) a = e = new Mm(e, r), o = "derived";
          else if (Sl(r)) e = new Rm(e, r);
          else if (Nl(r)) a = e = Pm.makeFromTransform(e, r), o = "derived";
          else if (xl(r)) a = e = new Fm(e, r), o = "derived";
          else if ($l(r)) a = e = new jm(e, r), o = "derived";
          else if (wl(r)) a = e = new Em(e, r), o = "derived";
          else {
            if (!kl(r)) {
              yi(`Ignoring an invalid transform: ${X(r)}.`);
              continue;
            }
            a = e = new Am(e, r), o = "derived";
          }
          if (a && void 0 !== o) {
            for (const e of a.producedFields() ?? []) n.set(e, o, !1);
          }
        }
        return e;
      }(t, e, o));
    const s = function (e) {
        const t = {};
        if (xm(e) && e.component.selection) {
          for (const n of D(e.component.selection)) {
            const i = e.component.selection[n];
            for (const e of i.project.items) {
              !e.channel && L(e.field) > 1 && (t[e.field] = "flatten");
            }
          }
        }
        return t;
      }(e),
      l = ld(e);
    t = cd.makeWithAncestors(t, {}, { ...s, ...l }, o) ?? t,
      xm(e) && (t = Nm.parseAll(t, e), t = _m.parseAll(t, e)),
      (xm(e) || $m(e)) &&
      (a || (t = nd.makeFromEncoding(t, e) ?? t),
        t = $c.makeFromEncoding(t, e) ?? t,
        t = of.parseAllForSortIndex(t, e));
    const c = t = Jm(cc.Raw, e, t);
    if (xm(e)) {
      const n = rd.makeFromEncoding(t, e);
      n && (t = n, Ru(e) && (t = new ud(t))),
        t = Pm.makeFromEncoding(t, e) ?? t,
        t = Pd.makeFromEncoding(t, e) ?? t;
    }
    let u, f;
    if (xm(e)) {
      const { markDef: n, mark: i, config: r } = e,
        o = _n("invalid", n, r),
        { marks: a, scales: s } = f = uc({ invalid: o, isPath: Hr(i) });
      a !== s && "include-invalid-values" === s &&
      (u = t = Jm(cc.PreFilterInvalid, e, t)),
        "exclude-invalid-values" === a && (t = Nd.make(t, e, f) ?? t);
    }
    const d = t = Jm(cc.Main, e, t);
    let m;
    if (xm(e) && f) {
      const { marks: n, scales: i } = f;
      "include-invalid-values" === n && "exclude-invalid-values" === i &&
        (t = Nd.make(t, e, f) ?? t, m = t = Jm(cc.PostFilterInvalid, e, t));
    }
    xm(e) && function (e, t) {
      for (const [n, i] of z(e.component.selection ?? {})) {
        const r = e.getName(`lookup_${n}`);
        e.component.data.outputNodes[r] = i.materialized = new vc(
          new Iu(t, e, { param: n }),
          r,
          cc.Lookup,
          e.component.data.outputNodeRefCounts,
        );
      }
    }(e, d);
    let p = null;
    if ($m(e)) {
      const i = e.getName("facet");
      t = function (e, t) {
        const { row: n, column: i } = t;
        if (n && i) {
          let t = null;
          for (const r of [n, i]) {
            if (Co(r.sort)) {
              const { field: n, op: i = Fo } = r.sort;
              e = t = new Cd(e, {
                joinaggregate: [{
                  op: i,
                  field: n,
                  as: Gm(r, r.sort, { forAs: !0 }),
                }],
                groupby: [ia(r)],
              });
            }
          }
          return t;
        }
        return null;
      }(t, e.facet) ?? t,
        p = new od(t, e, i, d.getSource()),
        n[i] = p;
    }
    return {
      ...e.component.data,
      outputNodes: n,
      outputNodeRefCounts: i,
      raw: c,
      main: d,
      facetRoot: p,
      ancestorParse: o,
      preFilterInvalid: u,
      postFilterInvalid: m,
    };
  }
  function Jm(e, t, n) {
    const { outputNodes: i, outputNodeRefCounts: r } = t.component.data,
      o = t.getDataName(e),
      a = new vc(n, o, e, r);
    return i[o] = a, a;
  }
  class Km extends Sm {
    constructor(e, t, n, i) {
      super(e, "concat", t, n, i, e.resolve),
        "shared" !== e.resolve?.axis?.x && "shared" !== e.resolve?.axis?.y ||
        yi(
          "Axes cannot be shared in concatenated or repeated views yet (https://github.com/vega/vega-lite/issues/2415).",
        ),
        this.children = this.getChildren(e).map(
          (e, t) => wp(e, this, this.getName(`concat_${t}`), void 0, i),
        );
    }
    parseData() {
      this.component.data = Qm(this);
      for (const e of this.children) e.parseData();
    }
    parseSelections() {
      this.component.selection = {};
      for (const e of this.children) {
        e.parseSelections();
        for (const t of D(e.component.selection)) {
          this.component.selection[t] = e.component.selection[t];
        }
      }
    }
    parseMarkGroup() {
      for (const e of this.children) e.parseMarkGroup();
    }
    parseAxesAndHeaders() {
      for (const e of this.children) e.parseAxesAndHeaders();
    }
    getChildren(e) {
      return Ds(e) ? e.vconcat : Fs(e) ? e.hconcat : e.concat;
    }
    parseLayoutSize() {
      !function (e) {
        Bm(e);
        const t = 1 === e.layout.columns ? "width" : "childWidth",
          n = void 0 === e.layout.columns ? "height" : "childHeight";
        Vm(e, t), Vm(e, n);
      }(this);
    }
    parseAxisGroup() {
      return null;
    }
    assembleSelectionTopLevelSignals(e) {
      return this.children.reduce(
        (e, t) => t.assembleSelectionTopLevelSignals(e),
        e,
      );
    }
    assembleSignals() {
      return this.children.forEach((e) => e.assembleSignals()), [];
    }
    assembleLayoutSignals() {
      const e = wf(this);
      for (const t of this.children) e.push(...t.assembleLayoutSignals());
      return e;
    }
    assembleSelectionData(e) {
      return this.children.reduce((e, t) => t.assembleSelectionData(e), e);
    }
    assembleMarks() {
      return this.children.map((e) => {
        const t = e.assembleTitle(),
          n = e.assembleGroupStyle(),
          i = e.assembleGroupEncodeEntry(!1);
        return {
          type: "group",
          name: e.getName("group"),
          ...t ? { title: t } : {},
          ...n ? { style: n } : {},
          ...i ? { encode: { update: i } } : {},
          ...e.assembleGroup(),
        };
      });
    }
    assembleGroupStyle() {}
    assembleDefaultLayout() {
      const e = this.layout.columns;
      return {
        ...null != e ? { columns: e } : {},
        bounds: "full",
        align: "each",
      };
    }
  }
  const Zm = {
      disable: 1,
      gridScale: 1,
      scale: 1,
      ...za,
      labelExpr: 1,
      encode: 1,
    },
    ep = D(Zm);
  class tp extends Xl {
    constructor() {
      let e = arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : {},
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      super(), this.explicit = e, this.implicit = t, this.mainExtracted = n;
    }
    clone() {
      return new tp(l(this.explicit), l(this.implicit), this.mainExtracted);
    }
    hasAxisPart(e) {
      return "axis" === e ||
        ("grid" === e || "title" === e
          ? !!this.get(e)
          : !(!1 === (t = this.get(e)) || null === t));
      var t;
    }
    hasOrientSignalRef() {
      return yn(this.explicit.orient);
    }
  }
  const np = { bottom: "top", top: "bottom", left: "right", right: "left" };
  function ip(e, t) {
    if (!e) return t.map((e) => e.clone());
    {
      if (e.length !== t.length) return;
      const n = e.length;
      for (let i = 0; i < n; i++) {
        const n = e[i], r = t[i];
        if (!!n != !!r) return;
        if (n && r) {
          const t = n.getWithExplicit("orient"),
            o = r.getWithExplicit("orient");
          if (t.explicit && o.explicit && t.value !== o.value) return;
          e[i] = rp(n, r);
        }
      }
    }
    return e;
  }
  function rp(e, t) {
    for (const n of ep) {
      const i = ec(
        e.getWithExplicit(n),
        t.getWithExplicit(n),
        n,
        "axis",
        (e, t) => {
          switch (n) {
            case "title":
              return Rn(e, t);
            case "gridScale":
              return { explicit: e.explicit, value: q(e.value, t.value) };
          }
          return Zl(e, t, n, "axis");
        },
      );
      e.setWithExplicit(n, i);
    }
    return e;
  }
  function op(e, t, n, i, r) {
    if ("disable" === t) return void 0 !== n;
    switch (n = n || {}, t) {
      case "titleAngle":
      case "labelAngle":
        return e === (yn(n.labelAngle) ? n.labelAngle : V(n.labelAngle));
      case "values":
        return !!n.values;
      case "encode":
        return !!n.encoding || !!n.labelAngle;
      case "title":
        if (e === rf(i, r)) return !0;
    }
    return e === n[t];
  }
  const ap = new Set([
    "grid",
    "translate",
    "format",
    "formatType",
    "orient",
    "labelExpr",
    "tickCount",
    "position",
    "tickMinStep",
  ]);
  function sp(e, t) {
    let n = t.axis(e);
    const i = new tp(),
      r = ma(t.encoding[e]),
      { mark: o, config: a } = t,
      s = n?.orient || a["x" === e ? "axisX" : "axisY"]?.orient ||
        a.axis?.orient || function (e) {
        return "x" === e ? "bottom" : "left";
      }(e),
      l = t.getScaleComponent(e).get("type"),
      c = function (e, t, n, i) {
        const r = "band" === t
            ? ["axisDiscrete", "axisBand"]
            : "point" === t
            ? ["axisDiscrete", "axisPoint"]
            : dr(t)
            ? ["axisQuantitative"]
            : "time" === t || "utc" === t
            ? ["axisTemporal"]
            : [],
          o = "x" === e ? "axisX" : "axisY",
          a = yn(n) ? "axisOrient" : `axis${P(n)}`,
          s = [...r, ...r.map((e) => o + e.substr(4))],
          l = ["axis", a, o];
        return {
          vlOnlyAxisConfig: Qu(s, i, e, n),
          vgAxisConfig: Qu(l, i, e, n),
          axisConfigStyle: Ju([...l, ...s], i),
        };
      }(e, l, s, t.config),
      u = void 0 !== n ? !n : Ku("disable", a.style, n?.style, c).configValue;
    if (i.set("disable", u, void 0 !== n), u) return i;
    n = n || {};
    const f = function (e, t, n, i, r) {
        const o = t?.labelAngle;
        if (void 0 !== o) return yn(o) ? o : V(o);
        {
          const { configValue: o } = Ku("labelAngle", i, t?.style, r);
          return void 0 !== o
            ? V(o)
            : n !== Z || !p([ir, tr], e.type) || Io(e) && e.timeUnit
            ? void 0
            : 270;
        }
      }(r, n, e, a.style, c),
      d = $o(n.formatType, r, l),
      m = xo(r, r.type, n.format, n.formatType, a, !0),
      g = {
        fieldOrDatumDef: r,
        axis: n,
        channel: e,
        model: t,
        scaleType: l,
        orient: s,
        labelAngle: f,
        format: m,
        formatType: d,
        mark: o,
        config: a,
      };
    for (const r of ep) {
      const o = r in Zu ? Zu[r](g) : Ca(r) ? n[r] : void 0,
        s = void 0 !== o,
        l = op(o, r, n, t, e);
      if (s && l) i.set(r, o, l);
      else {
        const { configValue: e, configFrom: t } = Ca(r) && "values" !== r
            ? Ku(r, a.style, n.style, c)
            : {},
          u = void 0 !== e;
        s && !u
          ? i.set(r, o, l)
          : ("vgAxisConfig" !== t || ap.has(r) && u || Sa(e) || yn(e)) &&
            i.set(r, e, !1);
      }
    }
    const h = n.encoding ?? {},
      y = Da.reduce((n, r) => {
        if (!i.hasAxisPart(r)) return n;
        const o = zf(h[r] ?? {}, t),
          a = "labels" === r
            ? function (e, t, n) {
              const { encoding: i, config: r } = e,
                o = ma(i[t]) ?? ma(i[it(t)]),
                a = e.axis(t) || {},
                { format: s, formatType: l } = a;
              if (po(l)) {
                return {
                  text: bo({
                    fieldOrDatumDef: o,
                    field: "datum.value",
                    format: s,
                    formatType: l,
                    config: r,
                  }),
                  ...n,
                };
              }
              if (void 0 === s && void 0 === l && r.customFormatTypes) {
                if ("quantitative" === Bo(o)) {
                  if (
                    Zo(o) && "normalize" === o.stack &&
                    r.normalizedNumberFormatType
                  ) {
                    return {
                      text: bo({
                        fieldOrDatumDef: o,
                        field: "datum.value",
                        format: r.normalizedNumberFormat,
                        formatType: r.normalizedNumberFormatType,
                        config: r,
                      }),
                      ...n,
                    };
                  }
                  if (r.numberFormatType) {
                    return {
                      text: bo({
                        fieldOrDatumDef: o,
                        field: "datum.value",
                        format: r.numberFormat,
                        formatType: r.numberFormatType,
                        config: r,
                      }),
                      ...n,
                    };
                  }
                }
                if (
                  "temporal" === Bo(o) && r.timeFormatType && Io(o) &&
                  !o.timeUnit
                ) {
                  return {
                    text: bo({
                      fieldOrDatumDef: o,
                      field: "datum.value",
                      format: r.timeFormat,
                      formatType: r.timeFormatType,
                      config: r,
                    }),
                    ...n,
                  };
                }
              }
              return n;
            }(t, e, o)
            : o;
        return void 0 === a || S(a) || (n[r] = { update: a }), n;
      }, {});
    return S(y) || i.set("encode", y, !!n.encoding || void 0 !== n.labelAngle),
      i;
  }
  function lp(e, t) {
    const { config: n } = e;
    return {
      ...du(e, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        size: "include",
        orient: "ignore",
        theta: "ignore",
      }),
      ...Kc("x", e, { defaultPos: "mid" }),
      ...Kc("y", e, { defaultPos: "mid" }),
      ...Yc("size", e),
      ...Yc("angle", e),
      ...cp(e, n, t),
    };
  }
  function cp(e, t, n) {
    return n ? { shape: { value: n } } : Yc("shape", e);
  }
  const up = {
    vgMark: "rule",
    encodeEntry: (e) => {
      const { markDef: t } = e, n = t.orient;
      return e.encoding.x || e.encoding.y || e.encoding.latitude ||
          e.encoding.longitude
        ? {
          ...du(e, {
            align: "ignore",
            baseline: "ignore",
            color: "include",
            orient: "ignore",
            size: "ignore",
            theta: "ignore",
          }),
          ...ru("x", e, {
            defaultPos: "horizontal" === n ? "zeroOrMax" : "mid",
            defaultPos2: "zeroOrMin",
            range: "vertical" !== n,
          }),
          ...ru("y", e, {
            defaultPos: "vertical" === n ? "zeroOrMax" : "mid",
            defaultPos2: "zeroOrMin",
            range: "horizontal" !== n,
          }),
          ...Yc("size", e, { vgChannel: "strokeWidth" }),
        }
        : {};
    },
  };
  function fp(e, t, n) {
    if (void 0 === _n("align", e, n)) return "center";
  }
  function dp(e, t, n) {
    if (void 0 === _n("baseline", e, n)) return "middle";
  }
  const mp = {
    vgMark: "rect",
    encodeEntry: (e) => {
      const { config: t, markDef: n } = e,
        i = n.orient,
        r = "horizontal" === i ? "width" : "height",
        o = "horizontal" === i ? "height" : "width";
      return {
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          orient: "ignore",
          size: "ignore",
          theta: "ignore",
        }),
        ...Kc("x", e, { defaultPos: "mid", vgChannel: "xc" }),
        ...Kc("y", e, { defaultPos: "mid", vgChannel: "yc" }),
        ...Yc("size", e, { defaultValue: pp(e), vgChannel: r }),
        [o]: Fn(_n("thickness", n, t)),
      };
    },
  };
  function pp(e) {
    const { config: n, markDef: i } = e,
      { orient: r } = i,
      o = "horizontal" === r ? "width" : "height",
      a = e.getScaleComponent("horizontal" === r ? "x" : "y"),
      s = _n("size", i, n, { vgChannel: o }) ?? n.tick.bandSize;
    if (void 0 !== s) return s;
    {
      const e = a ? a.get("range") : void 0;
      if (e && vn(e) && t.isNumber(e.step)) return 3 * e.step / 4;
      return 3 * Ps(n.view, o) / 4;
    }
  }
  const gp = {
    arc: {
      vgMark: "arc",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          size: "ignore",
          orient: "ignore",
          theta: "ignore",
        }),
        ...Kc("x", e, { defaultPos: "mid" }),
        ...Kc("y", e, { defaultPos: "mid" }),
        ...su(e, "radius"),
        ...su(e, "theta"),
      }),
    },
    area: {
      vgMark: "area",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          orient: "include",
          size: "ignore",
          theta: "ignore",
        }),
        ...ru("x", e, {
          defaultPos: "zeroOrMin",
          defaultPos2: "zeroOrMin",
          range: "horizontal" === e.markDef.orient,
        }),
        ...ru("y", e, {
          defaultPos: "zeroOrMin",
          defaultPos2: "zeroOrMin",
          range: "vertical" === e.markDef.orient,
        }),
        ...gu(e),
      }),
    },
    bar: {
      vgMark: "rect",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          orient: "ignore",
          size: "ignore",
          theta: "ignore",
        }),
        ...su(e, "x"),
        ...su(e, "y"),
      }),
    },
    circle: { vgMark: "symbol", encodeEntry: (e) => lp(e, "circle") },
    geoshape: {
      vgMark: "shape",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          size: "ignore",
          orient: "ignore",
          theta: "ignore",
        }),
      }),
      postEncodingTransform: (e) => {
        const { encoding: t } = e, n = t.shape;
        return [{
          type: "geoshape",
          projection: e.projectionName(),
          ...n && Io(n) && n.type === rr
            ? { field: ia(n, { expr: "datum" }) }
            : {},
        }];
      },
    },
    image: {
      vgMark: "image",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "ignore",
          orient: "ignore",
          size: "ignore",
          theta: "ignore",
        }),
        ...su(e, "x"),
        ...su(e, "y"),
        ...qc(e, "url"),
      }),
    },
    line: {
      vgMark: "line",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          size: "ignore",
          orient: "ignore",
          theta: "ignore",
        }),
        ...Kc("x", e, { defaultPos: "mid" }),
        ...Kc("y", e, { defaultPos: "mid" }),
        ...Yc("size", e, { vgChannel: "strokeWidth" }),
        ...gu(e),
      }),
    },
    point: { vgMark: "symbol", encodeEntry: (e) => lp(e) },
    rect: {
      vgMark: "rect",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          orient: "ignore",
          size: "ignore",
          theta: "ignore",
        }),
        ...su(e, "x"),
        ...su(e, "y"),
      }),
    },
    rule: up,
    square: { vgMark: "symbol", encodeEntry: (e) => lp(e, "square") },
    text: {
      vgMark: "text",
      encodeEntry: (e) => {
        const { config: t, encoding: n } = e;
        return {
          ...du(e, {
            align: "include",
            baseline: "include",
            color: "include",
            size: "ignore",
            orient: "ignore",
            theta: "include",
          }),
          ...Kc("x", e, { defaultPos: "mid" }),
          ...Kc("y", e, { defaultPos: "mid" }),
          ...qc(e),
          ...Yc("size", e, { vgChannel: "fontSize" }),
          ...Yc("angle", e),
          ...hu("align", fp(e.markDef, n, t)),
          ...hu("baseline", dp(e.markDef, n, t)),
          ...Kc("radius", e, { defaultPos: null }),
          ...Kc("theta", e, { defaultPos: null }),
        };
      },
    },
    tick: mp,
    trail: {
      vgMark: "trail",
      encodeEntry: (e) => ({
        ...du(e, {
          align: "ignore",
          baseline: "ignore",
          color: "include",
          size: "include",
          orient: "ignore",
          theta: "ignore",
        }),
        ...Kc("x", e, { defaultPos: "mid" }),
        ...Kc("y", e, { defaultPos: "mid" }),
        ...Yc("size", e),
        ...gu(e),
      }),
    },
  };
  function hp(e) {
    if (p([Er, Ar, Wr], e.mark)) {
      const t = Ua(e.mark, e.encoding);
      if (t.length > 0) {
        return function (e, t) {
          return [{
            name: e.getName("pathgroup"),
            type: "group",
            from: {
              facet: {
                name: yp + e.requestDataName(cc.Main),
                data: e.requestDataName(cc.Main),
                groupby: t,
              },
            },
            encode: {
              update: {
                width: { field: { group: "width" } },
                height: { field: { group: "height" } },
              },
            },
            marks: bp(e, { fromPrefix: yp }),
          }];
        }(e, t);
      }
    } else if (e.mark === Tr) {
      const t = wn.some((t) => _n(t, e.markDef, e.config));
      if (e.stack && !e.fieldDef("size") && t) {
        return function (e) {
          const [t] = bp(e, { fromPrefix: vp }),
            n = e.scaleName(e.stack.fieldChannel),
            i = function () {
              let t = arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
              return e.vgField(e.stack.fieldChannel, t);
            },
            r = (e, t) =>
              `${e}(${
                [
                  i({ prefix: "min", suffix: "start", expr: t }),
                  i({ prefix: "max", suffix: "start", expr: t }),
                  i({ prefix: "min", suffix: "end", expr: t }),
                  i({ prefix: "max", suffix: "end", expr: t }),
                ].map((e) => `scale('${n}',${e})`).join(",")
              })`;
          let o, a;
          "x" === e.stack.fieldChannel
            ? (o = {
              ...u(t.encode.update, ["y", "yc", "y2", "height", ...wn]),
              x: { signal: r("min", "datum") },
              x2: { signal: r("max", "datum") },
              clip: { value: !0 },
            },
              a = {
                x: { field: { group: "x" }, mult: -1 },
                height: { field: { group: "height" } },
              },
              t.encode.update = {
                ...f(t.encode.update, ["y", "yc", "y2"]),
                height: { field: { group: "height" } },
              })
            : (o = {
              ...u(t.encode.update, ["x", "xc", "x2", "width"]),
              y: { signal: r("min", "datum") },
              y2: { signal: r("max", "datum") },
              clip: { value: !0 },
            },
              a = {
                y: { field: { group: "y" }, mult: -1 },
                width: { field: { group: "width" } },
              },
              t.encode.update = {
                ...f(t.encode.update, ["x", "xc", "x2"]),
                width: { field: { group: "width" } },
              });
          for (const n of wn) {
            const i = Pn(n, e.markDef, e.config);
            t.encode.update[n]
              ? (o[n] = t.encode.update[n], delete t.encode.update[n])
              : i && (o[n] = Fn(i)), i && (t.encode.update[n] = { value: 0 });
          }
          const s = [];
          if (e.stack.groupbyChannels?.length > 0) {
            for (const t of e.stack.groupbyChannels) {
              const n = e.fieldDef(t), i = ia(n);
              i && s.push(i),
                (n?.bin || n?.timeUnit) && s.push(ia(n, { binSuffix: "end" }));
            }
          }
          o = [
            "stroke",
            "strokeWidth",
            "strokeJoin",
            "strokeCap",
            "strokeDash",
            "strokeDashOffset",
            "strokeMiterLimit",
            "strokeOpacity",
          ].reduce((n, i) => {
            if (t.encode.update[i]) return { ...n, [i]: t.encode.update[i] };
            {
              const t = Pn(i, e.markDef, e.config);
              return void 0 !== t ? { ...n, [i]: Fn(t) } : n;
            }
          }, o),
            o.stroke &&
            (o.strokeForeground = { value: !0 }, o.strokeOffset = { value: 0 });
          return [{
            type: "group",
            from: {
              facet: {
                data: e.requestDataName(cc.Main),
                name: vp + e.requestDataName(cc.Main),
                groupby: s,
                aggregate: {
                  fields: [
                    i({ suffix: "start" }),
                    i({ suffix: "start" }),
                    i({ suffix: "end" }),
                    i({ suffix: "end" }),
                  ],
                  ops: ["min", "max", "min", "max"],
                },
              },
            },
            encode: { update: o },
            marks: [{ type: "group", encode: { update: a }, marks: [t] }],
          }];
        }(e);
      }
    }
    return bp(e);
  }
  const yp = "faceted_path_";
  const vp = "stack_group_";
  function bp(e) {
    let n = arguments.length > 1 && void 0 !== arguments[1]
      ? arguments[1]
      : { fromPrefix: "" };
    const { mark: i, markDef: r, encoding: o, config: a } = e,
      s = q(
        r.clip,
        function (e) {
          const t = e.getScaleComponent("x"), n = e.getScaleComponent("y");
          return !(!t?.get("selectionExtent") && !n?.get("selectionExtent")) ||
            void 0;
        }(e),
        function (e) {
          const t = e.component.projection;
          return !(!t || t.isFit) || void 0;
        }(e),
      ),
      l = Nn(r),
      c = o.key,
      u = function (e) {
        const { encoding: n, stack: i, mark: r, markDef: o, config: a } = e,
          s = n.order;
        if (
          !(!t.isArray(s) && Jo(s) && m(s.value) || !s && m(_n("order", o, a)))
        ) {
          if ((t.isArray(s) || Io(s)) && !i) return jn(s, { expr: "datum" });
          if (Hr(r)) {
            const e = "horizontal" === o.orient ? "y" : "x";
            if (Io(n[e])) return { field: e };
          }
        }
      }(e),
      f = function (e) {
        if (!e.component.selection) return null;
        const t = D(e.component.selection).length;
        let n = t, i = e.parent;
        for (; i && 0 === n;) n = D(i.component.selection).length, i = i.parent;
        return n
          ? {
            interactive: t > 0 || "geoshape" === e.mark ||
              !!e.encoding.tooltip || !!e.markDef.tooltip,
          }
          : null;
      }(e),
      d = _n("aria", r, a),
      p = gp[i].postEncodingTransform ? gp[i].postEncodingTransform(e) : null;
    return [{
      name: e.getName("marks"),
      type: gp[i].vgMark,
      ...s ? { clip: s } : {},
      ...l ? { style: l } : {},
      ...c ? { key: c.field } : {},
      ...u ? { sort: u } : {},
      ...f || {},
      ...!1 === d ? { aria: d } : {},
      from: { data: n.fromPrefix + e.requestDataName(cc.Main) },
      encode: { update: gp[i].encodeEntry(e) },
      ...p ? { transform: p } : {},
    }];
  }
  class xp extends Dm {
    specifiedScales = {};
    specifiedAxes = {};
    specifiedLegends = {};
    specifiedProjection = {};
    selection = [];
    children = [];
    constructor(e, n, i) {
      let r = arguments.length > 3 && void 0 !== arguments[3]
          ? arguments[3]
          : {},
        o = arguments.length > 4 ? arguments[4] : void 0;
      super(e, "unit", n, i, o, void 0, Cs(e) ? e.view : void 0);
      const a = Xr(e.mark) ? { ...e.mark } : { type: e.mark }, s = a.type;
      void 0 === a.filled && (a.filled = function (e, t, n) {
        let { graticule: i } = n;
        if (i) return !1;
        const r = Pn("filled", e, t), o = e.type;
        return q(r, o !== Mr && o !== Er && o !== Lr);
      }(a, o, { graticule: e.data && lc(e.data) }));
      const l = this.encoding = function (e, n, i, r) {
        const o = {};
        for (const t of D(e)) {
          Ke(t) ||
            yi(
              `${a =
                t}-encoding is dropped as ${a} is not a valid encoding channel.`,
            );
        }
        var a;
        for (let a of lt) {
          if (!e[a]) continue;
          const s = e[a];
          if (Pt(a)) {
            const e = st(a), t = o[e];
            if (Io(t) && Ki(t.type) && Io(s) && !t.timeUnit) {
              yi(Kn(e));
              continue;
            }
          }
          if (
            "angle" !== a || "arc" !== n || e.theta ||
            (yi(
              "Arc marks uses theta channel rather than angle, replacing angle with theta.",
            ),
              a = se), Ra(e, a, n)
          ) {
            if (a === ye && "line" === n) {
              const t = da(e[a]);
              if (t?.aggregate) {
                yi(
                  "Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.",
                );
                continue;
              }
            }
            if (a === me && (i ? "fill" in e : "stroke" in e)) {
              yi(ei("encoding", { fill: "fill" in e, stroke: "stroke" in e }));
            } else if (
              a === Fe || a === De && !t.isArray(s) && !Jo(s) ||
              a === Oe && t.isArray(s)
            ) {
              if (s) {
                if (a === De) {
                  const t = e[a];
                  if (Lo(t)) {
                    o[a] = t;
                    continue;
                  }
                }
                o[a] = t.array(s).reduce(
                  (e, t) => (Io(t) ? e.push(ha(t, a)) : yi(ti(t, a)), e),
                  [],
                );
              }
            } else {
              if (a === Oe && null === s) o[a] = null;
              else if (!(Io(s) || Vo(s) || Jo(s) || qo(s) || yn(s))) {
                yi(ti(s, a));
                continue;
              }
              o[a] = pa(s, a, r);
            }
          } else yi(ni(a, n));
        }
        return o;
      }(e.encoding || {}, s, a.filled, o);
      this.markDef = tl(a, l, o),
        this.size = function (e) {
          let { encoding: t, size: n } = e;
          for (const e of Ft) {
            const i = rt(e);
            Os(n[i]) && Ho(t[e]) && (delete n[i], yi(ui(i)));
          }
          return n;
        }({
          encoding: l,
          size: Cs(e)
            ? {
              ...r,
              ...e.width ? { width: e.width } : {},
              ...e.height ? { height: e.height } : {},
            }
            : r,
        }),
        this.stack = el(this.markDef, l),
        this.specifiedScales = this.initScales(s, l),
        this.specifiedAxes = this.initAxes(l),
        this.specifiedLegends = this.initLegends(l),
        this.specifiedProjection = e.projection,
        this.selection = (e.params ?? []).filter((e) => ws(e));
    }
    get hasProjection() {
      const { encoding: e } = this,
        t = this.mark === Vr,
        n = e && Me.some((t) => Xo(e[t]));
      return t || n;
    }
    scaleDomain(e) {
      const t = this.specifiedScales[e];
      return t ? t.domain : void 0;
    }
    axis(e) {
      return this.specifiedAxes[e];
    }
    legend(e) {
      return this.specifiedLegends[e];
    }
    initScales(e, t) {
      return Bt.reduce((e, n) => {
        const i = ma(t[n]);
        return i && (e[n] = this.initScale(i.scale ?? {})), e;
      }, {});
    }
    initScale(e) {
      const { domain: n, range: i } = e, r = pn(e);
      return t.isArray(n) && (r.domain = n.map(Sn)),
        t.isArray(i) && (r.range = i.map(Sn)),
        r;
    }
    initAxes(e) {
      return Ft.reduce((t, n) => {
        const i = e[n];
        if (Xo(i) || n === Z && Xo(e.x2) || n === ee && Xo(e.y2)) {
          const e = Xo(i) ? i.axis : void 0;
          t[n] = e ? this.initAxis({ ...e }) : e;
        }
        return t;
      }, {});
    }
    initAxis(e) {
      const t = D(e), n = {};
      for (const i of t) {
        const t = e[i];
        n[i] = Sa(t) ? kn(t) : Sn(t);
      }
      return n;
    }
    initLegends(e) {
      return Wt.reduce((t, n) => {
        const i = ma(e[n]);
        if (
          i && function (e) {
            switch (e) {
              case me:
              case pe:
              case ge:
              case ye:
              case he:
              case be:
              case we:
              case ke:
                return !0;
              case xe:
              case $e:
              case ve:
                return !1;
            }
          }(n)
        ) {
          const e = i.legend;
          t[n] = e ? pn(e) : e;
        }
        return t;
      }, {});
    }
    parseData() {
      this.component.data = Qm(this);
    }
    parseLayoutSize() {
      !function (e) {
        const { size: t, component: n } = e;
        for (const i of Ft) {
          const r = rt(i);
          if (t[r]) {
            const e = t[r];
            n.layoutSize.set(r, Os(e) ? "step" : e, !0);
          } else {
            const t = Hm(e, r);
            n.layoutSize.set(r, t, !1);
          }
        }
      }(this);
    }
    parseSelections() {
      this.component.selection = function (e, n) {
        const i = {}, r = e.config.selection;
        if (!n || !n.length) return i;
        for (const o of n) {
          const n = C(o.name),
            a = o.select,
            s = t.isString(a) ? a : a.type,
            c = t.isObject(a) ? l(a) : { type: s },
            u = r[s];
          for (const e in u) {
            "fields" !== e && "encodings" !== e &&
              ("mark" === e && (c[e] = { ...u[e], ...c[e] }),
                void 0 !== c[e] && !0 !== c[e] || (c[e] = l(u[e] ?? c[e])));
          }
          const f = i[n] = {
              ...c,
              name: n,
              type: s,
              init: o.value,
              bind: o.bind,
              events: t.isString(c.on)
                ? t.parseSelector(c.on, "scope")
                : t.array(l(c.on)),
            },
            d = l(o);
          for (const t of Eu) t.defined(f) && t.parse && t.parse(e, f, d);
        }
        return i;
      }(this, this.selection);
    }
    parseMarkGroup() {
      this.component.mark = hp(this);
    }
    parseAxesAndHeaders() {
      var e;
      this.component.axes = (e = this,
        Ft.reduce(
          (t, n) => (e.component.scales[n] && (t[n] = [sp(n, e)]), t),
          {},
        ));
    }
    assembleSelectionTopLevelSignals(e) {
      return function (e, n) {
        let i = !1;
        for (const r of F(e.component.selection ?? {})) {
          const o = r.name, a = t.stringValue(o + Pu);
          if (0 === n.filter((e) => e.name === o).length) {
            const e = "global" === r.resolve ? "union" : r.resolve,
              i = "point" === r.type ? ", true, true)" : ")";
            n.push({
              name: r.name,
              update: `${ju}(${a}, ${t.stringValue(e)}${i}`,
            });
          }
          i = !0;
          for (const t of Eu) {
            t.defined(r) && t.topLevelSignals &&
              (n = t.topLevelSignals(e, r, n));
          }
        }
        i && 0 === n.filter((e) => "unit" === e.name).length &&
          n.unshift({
            name: "unit",
            value: {},
            on: [{
              events: "pointermove",
              update: "isTuple(group()) ? group() : unit",
            }],
          });
        return hc(n);
      }(this, e);
    }
    assembleSignals() {
      return [...Xu(this), ...mc(this, [])];
    }
    assembleSelectionData(e) {
      return function (e, t) {
        const n = [...t], i = Mu(e, { escape: !1 });
        for (const t of F(e.component.selection ?? {})) {
          const e = { name: t.name + Pu };
          if (
            t.project.hasSelectionId &&
            (e.transform = [{ type: "collect", sort: { field: vs } }]), t.init
          ) {
            const n = t.project.items.map(fc);
            e.values = t.project.hasSelectionId
              ? t.init.map((e) => ({ unit: i, [vs]: dc(e, !1)[0] }))
              : t.init.map((e) => ({ unit: i, fields: n, values: dc(e, !1) }));
          }
          n.filter((e) => e.name === t.name + Pu).length || n.push(e);
        }
        return n;
      }(this, e);
    }
    assembleLayout() {
      return null;
    }
    assembleLayoutSignals() {
      return wf(this);
    }
    assembleMarks() {
      let e = this.component.mark ?? [];
      return this.parent && km(this.parent) || (e = gc(this, e)),
        e.map(this.correctDataNames);
    }
    assembleGroupStyle() {
      const { style: e } = this.view || {};
      return void 0 !== e
        ? e
        : this.encoding.x || this.encoding.y
        ? "cell"
        : "view";
    }
    getMapping() {
      return this.encoding;
    }
    get mark() {
      return this.markDef.type;
    }
    channelHasField(e) {
      return Aa(this.encoding, e);
    }
    fieldDef(e) {
      return da(this.encoding[e]);
    }
    typedFieldDef(e) {
      const t = this.fieldDef(e);
      return Qo(t) ? t : null;
    }
  }
  class $p extends Sm {
    constructor(e, t, n, i, r) {
      super(e, "layer", t, n, r, e.resolve, e.view);
      const o = {
        ...i,
        ...e.width ? { width: e.width } : {},
        ...e.height ? { height: e.height } : {},
      };
      this.children = e.layer.map((e, t) => {
        if (Gs(e)) return new $p(e, this, this.getName(`layer_${t}`), o, r);
        if (_a(e)) return new xp(e, this, this.getName(`layer_${t}`), o, r);
        throw new Error(Ln(e));
      });
    }
    parseData() {
      this.component.data = Qm(this);
      for (const e of this.children) e.parseData();
    }
    parseLayoutSize() {
      var e;
      Bm(e = this), Vm(e, "width"), Vm(e, "height");
    }
    parseSelections() {
      this.component.selection = {};
      for (const e of this.children) {
        e.parseSelections();
        for (const t of D(e.component.selection)) {
          this.component.selection[t] = e.component.selection[t];
        }
      }
    }
    parseMarkGroup() {
      for (const e of this.children) e.parseMarkGroup();
    }
    parseAxesAndHeaders() {
      !function (e) {
        const { axes: t, resolve: n } = e.component,
          i = { top: 0, bottom: 0, right: 0, left: 0 };
        for (const i of e.children) {
          i.parseAxesAndHeaders();
          for (const r of D(i.component.axes)) {
            n.axis[r] = Cf(e.component.resolve, r),
              "shared" === n.axis[r] &&
              (t[r] = ip(t[r], i.component.axes[r]),
                t[r] || (n.axis[r] = "independent", delete t[r]));
          }
        }
        for (const r of Ft) {
          for (const o of e.children) {
            if (o.component.axes[r]) {
              if ("independent" === n.axis[r]) {
                t[r] = (t[r] ?? []).concat(o.component.axes[r]);
                for (const e of o.component.axes[r]) {
                  const { value: t, explicit: n } = e.getWithExplicit("orient");
                  if (!yn(t)) {
                    if (i[t] > 0 && !n) {
                      const n = np[t];
                      i[t] > i[n] && e.set("orient", n, !1);
                    }
                    i[t]++;
                  }
                }
              }
              delete o.component.axes[r];
            }
          }
          if ("independent" === n.axis[r] && t[r] && t[r].length > 1) {
            for (const [e, n] of (t[r] || []).entries()) {
              e > 0 && n.get("grid") && !n.explicit.grid &&
                (n.implicit.grid = !1);
            }
          }
        }
      }(this);
    }
    assembleSelectionTopLevelSignals(e) {
      return this.children.reduce(
        (e, t) => t.assembleSelectionTopLevelSignals(e),
        e,
      );
    }
    assembleSignals() {
      return this.children.reduce(
        (e, t) => e.concat(t.assembleSignals()),
        Xu(this),
      );
    }
    assembleLayoutSignals() {
      return this.children.reduce(
        (e, t) => e.concat(t.assembleLayoutSignals()),
        wf(this),
      );
    }
    assembleSelectionData(e) {
      return this.children.reduce((e, t) => t.assembleSelectionData(e), e);
    }
    assembleGroupStyle() {
      const e = new Set();
      for (const n of this.children) {
        for (const i of t.array(n.assembleGroupStyle())) {
          e.add(i);
        }
      }
      const n = Array.from(e);
      return n.length > 1 ? n : 1 === n.length ? n[0] : void 0;
    }
    assembleTitle() {
      let e = super.assembleTitle();
      if (e) return e;
      for (const t of this.children) if (e = t.assembleTitle(), e) return e;
    }
    assembleLayout() {
      return null;
    }
    assembleMarks() {
      return function (e, t) {
        for (const n of e.children) xm(n) && (t = gc(n, t));
        return t;
      }(this, this.children.flatMap((e) => e.assembleMarks()));
    }
    assembleLegends() {
      return this.children.reduce(
        (e, t) => e.concat(t.assembleLegends()),
        Hf(this),
      );
    }
  }
  function wp(e, t, n, i, r) {
    if (Ao(e)) return new Ym(e, t, n, r);
    if (Gs(e)) return new $p(e, t, n, i, r);
    if (_a(e)) return new xp(e, t, n, i, r);
    if (
      function (e) {
        return Ds(e) || Fs(e) || Ss(e);
      }(e)
    ) return new Km(e, t, n, r);
    throw new Error(Ln(e));
  }
  const kp = n;
  e.accessPathDepth = L,
    e.accessPathWithDatum = A,
    e.compile = function (e) {
      let n = arguments.length > 1 && void 0 !== arguments[1]
        ? arguments[1]
        : {};
      var i;
      n.logger && (i = n.logger, hi = i), n.fieldTitle && sa(n.fieldTitle);
      try {
        const i = Us(t.mergeConfig(n.config, e.config)),
          r = Wl(e, i),
          o = wp(r, null, "", void 0, i);
        o.parse(),
          function (e, t) {
            Rd(e.sources);
            let n = 0, i = 0;
            for (let i = 0; i < Md && qd(e, t, !0); i++) n++;
            e.sources.map(Td);
            for (let n = 0; n < Md && qd(e, t, !1); n++) i++;
            Rd(e.sources),
              Math.max(n, i) === Md &&
              yi(`Maximum optimization runs(${Md}) reached.`);
          }(o.component.data, o);
        const a = function (e, t) {
          let n = arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : {},
            i = arguments.length > 3 ? arguments[3] : void 0;
          const r = e.config ? Vs(e.config) : void 0,
            o = [].concat(
              e.assembleSelectionData([]),
              function (e, t) {
                const n = [], i = Lm(n);
                let r = 0;
                for (const t of e.sources) {
                  t.hasName() || (t.dataName = "source_" + r++);
                  const e = t.assemble();
                  i(t, e);
                }
                for (const e of n) {
                  0 === e.transform.length && delete e.transform;
                }
                let o = 0;
                for (
                  const [e, t] of n.entries()
                ) {
                  0 !== (t.transform ?? []).length || t.source ||
                    n.splice(o++, 0, n.splice(e, 1)[0]);
                }
                for (const t of n) {
                  for (const n of t.transform ?? []) {
                    "lookup" === n.type &&
                      (n.from = e.outputNodes[n.from].getSource());
                  }
                }
                for (const e of n) e.name in t && (e.values = t[e.name]);
                return n;
              }(e.component.data, n),
            ),
            a = e.assembleProjections(),
            s = e.assembleTitle(),
            l = e.assembleGroupStyle(),
            c = e.assembleGroupEncodeEntry(!0);
          let u = e.assembleLayoutSignals();
          u = u.filter(
            (e) =>
              "width" !== e.name && "height" !== e.name || void 0 === e.value ||
              (t[e.name] = +e.value, !1),
          );
          const { params: f, ...d } = t;
          return {
            $schema: "https://vega.github.io/schema/vega/v5.json",
            ...e.description ? { description: e.description } : {},
            ...d,
            ...s ? { title: s } : {},
            ...l ? { style: l } : {},
            ...c ? { encode: { update: c } } : {},
            data: o,
            ...a.length > 0 ? { projections: a } : {},
            ...e.assembleGroup([
              ...u,
              ...e.assembleSelectionTopLevelSignals([]),
              ...ks(f),
            ]),
            ...r ? { config: r } : {},
            ...i ? { usermeta: i } : {},
          };
        }(
          o,
          function (e, n, i, r) {
            const o = r.component.layoutSize.get("width"),
              a = r.component.layoutSize.get("height");
            void 0 === n
              ? (n = { type: "pad" },
                r.hasAxisOrientSignalRef() && (n.resize = !0))
              : t.isString(n) && (n = { type: n });
            if (
              o && a &&
              (s = n.type, "fit" === s || "fit-x" === s || "fit-y" === s)
            ) {
              if ("step" === o && "step" === a) yi(In()), n.type = "pad";
              else if ("step" === o || "step" === a) {
                const e = "step" === o ? "width" : "height";
                yi(In(Nt(e)));
                const t = "width" === e ? "height" : "width";
                n.type = function (e) {
                  return e ? `fit-${Nt(e)}` : "fit";
                }(t);
              }
            }
            var s;
            return {
              ...1 === D(n).length && n.type
                ? "pad" === n.type ? {} : { autosize: n.type }
                : { autosize: n },
              ...Yl(i, !1),
              ...Yl(e, !0),
            };
          }(e, r.autosize, i, o),
          e.datasets,
          e.usermeta,
        );
        return { spec: a, normalized: r };
      } finally {
        n.logger && (hi = gi), n.fieldTitle && sa(oa);
      }
    },
    e.contains = p,
    e.deepEqual = Y,
    e.deleteNestedProperty = _,
    e.duplicate = l,
    e.entries = z,
    e.every = h,
    e.fieldIntersection = k,
    e.flatAccessWithDatum = T,
    e.getFirstDefined = q,
    e.hasIntersection = $,
    e.hash = d,
    e.internalField = I,
    e.isBoolean = O,
    e.isEmpty = S,
    e.isEqual = function (e, t) {
      const n = D(e), i = D(t);
      if (n.length !== i.length) return !1;
      for (const i of n) if (e[i] !== t[i]) return !1;
      return !0;
    },
    e.isInternalField = B,
    e.isNullOrFalse = m,
    e.isNumeric = H,
    e.keys = D,
    e.logicalExpr = N,
    e.mergeDeep = y,
    e.never = c,
    e.normalize = Wl,
    e.normalizeAngle = V,
    e.omit = f,
    e.pick = u,
    e.prefixGenerator = w,
    e.removePathFromField = R,
    e.replaceAll = M,
    e.replacePathInField = E,
    e.resetIdCounter = function () {
      U = 42;
    },
    e.setEqual = x,
    e.some = g,
    e.stringify = X,
    e.titleCase = P,
    e.unique = b,
    e.uniqueId = W,
    e.vals = F,
    e.varName = C,
    e.version = kp;
});
//# sourceMappingURL=vega-lite.min.js.map
