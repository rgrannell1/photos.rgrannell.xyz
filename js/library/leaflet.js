var disableTextSelection,
  enableTextSelection,
  _userSelect,
  _outlineElement,
  _outlineStyle,
  _lastCode,
  version = "1.9.4";
function extend(t) {
  var e, i, n, o;
  for (i = 1, n = arguments.length; i < n; i += 1) {
    for (e in o = arguments[i]) t[e] = o[e];
  }
  return t;
}
var create$2 = Object.create || function () {
  function t() {}
  return function (e) {
    return t.prototype = e, new t();
  };
}();
function bind(t, e) {
  var i = Array.prototype.slice;
  if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
  var n = i.call(arguments, 2);
  return function () {
    return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
  };
}
var lastId = 0;
function stamp(t) {
  return "_leaflet_id" in t || (t._leaflet_id = ++lastId), t._leaflet_id;
}
function throttle(t, e, i) {
  var n, o, s, r;
  return r = function () {
    n = !1, o && (s.apply(i, o), o = !1);
  },
    s = function () {
      n ? o = arguments : (t.apply(i, arguments), setTimeout(r, e), n = !0);
    };
}
function wrapNum(t, e, i) {
  var n = e[1], o = e[0], s = n - o;
  return t === n && i ? t : ((t - o) % s + s) % s + o;
}
function falseFn() {
  return !1;
}
function formatNum(t, e) {
  if (!1 === e) return t;
  var i = Math.pow(10, void 0 === e ? 6 : e);
  return Math.round(t * i) / i;
}
function trim(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function splitWords(t) {
  return trim(t).split(/\s+/);
}
function setOptions(t, e) {
  for (
    var i in Object.prototype.hasOwnProperty.call(t, "options") ||
      (t.options = t.options ? create$2(t.options) : {}),
      e
  ) t.options[i] = e[i];
  return t.options;
}
function getParamString(t, e, i) {
  var n = [];
  for (var o in t) {
    n.push(
      encodeURIComponent(i ? o.toUpperCase() : o) + "=" +
        encodeURIComponent(t[o]),
    );
  }
  return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&");
}
var templateRe = /\{ *([\w_ -]+) *\}/g;
function template(t, e) {
  return t.replace(templateRe, function (t, i) {
    var n = e[i];
    if (void 0 === n) throw Error("No value provided for variable " + t);
    return "function" == typeof n && (n = n(e)), n;
  });
}
var isArray = Array.isArray || function (t) {
  return "[object Array]" === Object.prototype.toString.call(t);
};
function indexOf(t, e) {
  for (var i = 0; i < t.length; i += 1) if (t[i] === e) return i;
  return -1;
}
var emptyImageUrl =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
function getPrefixed(t) {
  return window["webkit" + t] || window["moz" + t] || window["ms" + t];
}
var lastTime = 0;
function timeoutDefer(t) {
  var e = +new Date(), i = Math.max(0, 16 - (e - lastTime));
  return lastTime = e + i, window.setTimeout(t, i);
}
var requestFn = window.requestAnimationFrame ||
    getPrefixed("RequestAnimationFrame") || timeoutDefer,
  cancelFn = window.cancelAnimationFrame ||
    getPrefixed("CancelAnimationFrame") ||
    getPrefixed("CancelRequestAnimationFrame") || function (t) {
    window.clearTimeout(t);
  };
function requestAnimFrame(t, e, i) {
  if (!i || requestFn !== timeoutDefer) {
    return requestFn.call(window, bind(t, e));
  }
  t.call(e);
}
function cancelAnimFrame(t) {
  t && cancelFn.call(window, t);
}
var Util = {
  __proto__: null,
  extend: extend,
  create: create$2,
  bind: bind,
  get lastId() {
    return lastId;
  },
  stamp: stamp,
  throttle: throttle,
  wrapNum: wrapNum,
  falseFn: falseFn,
  formatNum: formatNum,
  trim: trim,
  splitWords: splitWords,
  setOptions: setOptions,
  getParamString: getParamString,
  template: template,
  isArray: isArray,
  indexOf: indexOf,
  emptyImageUrl: emptyImageUrl,
  requestFn: requestFn,
  cancelFn: cancelFn,
  requestAnimFrame: requestAnimFrame,
  cancelAnimFrame: cancelAnimFrame,
};
function Class() {}
function checkDeprecatedMixinEvents(t) {
  if ("undefined" != typeof L && L && L.Mixin) {
    t = isArray(t) ? t : [t];
    for (var e = 0; e < t.length; e += 1) {
      t[e] === L.Mixin.Events &&
        console.warn(
          "Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",
          Error().stack,
        );
    }
  }
}
Class.extend = function (t) {
  var e = function () {
      setOptions(this),
        this.initialize && this.initialize.apply(this, arguments),
        this.callInitHooks();
    },
    i = e.__super__ = this.prototype,
    n = create$2(i);
  for (var o in n.constructor = e, e.prototype = n, this) {
    Object.prototype.hasOwnProperty.call(this, o) && "prototype" !== o &&
      "__super__" !== o && (e[o] = this[o]);
  }
  return t.statics && extend(e, t.statics),
    t.includes &&
    (checkDeprecatedMixinEvents(t.includes),
      extend.apply(null, [n].concat(t.includes))),
    extend(n, t),
    delete n.statics,
    delete n.includes,
    n.options &&
    (n.options = i.options ? create$2(i.options) : {},
      extend(n.options, t.options)),
    n._initHooks = [],
    n.callInitHooks = function () {
      if (!this._initHooksCalled) {
        i.callInitHooks && i.callInitHooks.call(this),
          this._initHooksCalled = !0;
        for (var t = 0, e = n._initHooks.length; t < e; t += 1) {
          n._initHooks[t].call(this);
        }
      }
    },
    e;
},
  Class.include = function (t) {
    var e = this.prototype.options;
    return extend(this.prototype, t),
      t.options && (this.prototype.options = e, this.mergeOptions(t.options)),
      this;
  },
  Class.mergeOptions = function (t) {
    return extend(this.prototype.options, t), this;
  },
  Class.addInitHook = function (t) {
    var e = Array.prototype.slice.call(arguments, 1);
    return this.prototype._initHooks = this.prototype._initHooks || [],
      this.prototype._initHooks.push(
        "function" == typeof t ? t : function () {
          this[t].apply(this, e);
        },
      ),
      this;
  };
var Events = {
  on: function (t, e, i) {
    if ("object" == typeof t) { for (var n in t) this._on(n, t[n], e); }
    else {
      t = splitWords(t);
      for (var o = 0, s = t.length; o < s; o += 1) this._on(t[o], e, i);
    }
    return this;
  },
  off: function (t, e, i) {
    if (arguments.length) {
      if ("object" == typeof t) { for (var n in t) this._off(n, t[n], e); }
      else {
        t = splitWords(t);
        for (
          var o = 1 === arguments.length, s = 0, r = t.length;
          s < r;
          s += 1
        ) o ? this._off(t[s]) : this._off(t[s], e, i);
      }
    } else delete this._events;
    return this;
  },
  _on: function (t, e, i, n) {
    if ("function" != typeof e) {
      console.warn("wrong listener type: " + typeof e);
      return;
    }
    if (!1 === this._listens(t, e, i)) {
      i === this && (i = void 0);
      var o = { fn: e, ctx: i };
      n && (o.once = !0),
        this._events = this._events || {},
        this._events[t] = this._events[t] || [],
        this._events[t].push(o);
    }
  },
  _off: function (t, e, i) {
    if (this._events && (n = this._events[t])) {
      if (1 === arguments.length) {
        if (this._firingCount) {
          for (o = 0, s = n.length; o < s; o += 1) n[o].fn = falseFn;
        }
        delete this._events[t];
        return;
      }
      if ("function" != typeof e) {
        console.warn("wrong listener type: " + typeof e);
        return;
      }
      var n, o, s, r = this._listens(t, e, i);
      if (!1 !== r) {
        var a = n[r];
        this._firingCount && (a.fn = falseFn, this._events[t] = n = n.slice()),
          n.splice(r, 1);
      }
    }
  },
  fire: function (t, e, i) {
    if (!this.listens(t, i)) return this;
    var n = extend({}, e, {
      type: t,
      target: this,
      sourceTarget: e && e.sourceTarget || this,
    });
    if (this._events) {
      var o = this._events[t];
      if (o) {
        this._firingCount = this._firingCount + 1 || 1;
        for (var s = 0, r = o.length; s < r; s += 1) {
          var a = o[s], h = a.fn;
          a.once && this.off(t, h, a.ctx), h.call(a.ctx || this, n);
        }
        this._firingCount -= 1;
      }
    }
    return i && this._propagateEvent(n), this;
  },
  listens: function (t, e, i, n) {
    "string" != typeof t && console.warn('"string" type argument expected');
    var o = e;
    "function" != typeof e && (n = !!e, o = void 0, i = void 0);
    var s = this._events && this._events[t];
    if (s && s.length && !1 !== this._listens(t, o, i)) return !0;
    if (n) {
      for (
        var r in this._eventParents
      ) if (this._eventParents[r].listens(t, e, i, n)) return !0;
    }
    return !1;
  },
  _listens: function (t, e, i) {
    if (!this._events) return !1;
    var n = this._events[t] || [];
    if (!e) return !!n.length;
    i === this && (i = void 0);
    for (var o = 0, s = n.length; o < s; o += 1) {
      if (n[o].fn === e && n[o].ctx === i) return o;
    }
    return !1;
  },
  once: function (t, e, i) {
    if ("object" == typeof t) { for (var n in t) this._on(n, t[n], e, !0); }
    else {
      t = splitWords(t);
      for (var o = 0, s = t.length; o < s; o += 1) this._on(t[o], e, i, !0);
    }
    return this;
  },
  addEventParent: function (t) {
    return this._eventParents = this._eventParents || {},
      this._eventParents[stamp(t)] = t,
      this;
  },
  removeEventParent: function (t) {
    return this._eventParents && delete this._eventParents[stamp(t)], this;
  },
  _propagateEvent: function (t) {
    for (var e in this._eventParents) {
      this._eventParents[e].fire(
        t.type,
        extend({ layer: t.target, propagatedFrom: t.target }, t),
        !0,
      );
    }
  },
};
Events.addEventListener = Events.on,
  Events.removeEventListener = Events.clearAllEventListeners = Events.off,
  Events.addOneTimeEventListener = Events.once,
  Events.fireEvent = Events.fire,
  Events.hasEventListeners = Events.listens;
var Evented = Class.extend(Events);
function Point(t, e, i) {
  this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
}
var trunc = Math.trunc || function (t) {
  return t > 0 ? Math.floor(t) : Math.ceil(t);
};
function toPoint(t, e, i) {
  return t instanceof Point
    ? t
    : isArray(t)
    ? new Point(t[0], t[1])
    : null == t
    ? t
    : "object" == typeof t && "x" in t && "y" in t
    ? new Point(t.x, t.y)
    : new Point(t, e, i);
}
function Bounds(t, e) {
  if (t) {
    for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n += 1) {
      this.extend(i[n]);
    }
  }
}
function toBounds(t, e) {
  return !t || t instanceof Bounds ? t : new Bounds(t, e);
}
function LatLngBounds(t, e) {
  if (t) {
    for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n += 1) {
      this.extend(i[n]);
    }
  }
}
function toLatLngBounds(t, e) {
  return t instanceof LatLngBounds ? t : new LatLngBounds(t, e);
}
function LatLng(t, e, i) {
  if (isNaN(t) || isNaN(e)) {
    throw Error("Invalid LatLng object: (" + t + ", " + e + ")");
  }
  this.lat = +t, this.lng = +e, void 0 !== i && (this.alt = +i);
}
function toLatLng(t, e, i) {
  return t instanceof LatLng
    ? t
    : isArray(t) && "object" != typeof t[0]
    ? 3 === t.length
      ? new LatLng(t[0], t[1], t[2])
      : 2 === t.length
      ? new LatLng(t[0], t[1])
      : null
    : null == t
    ? t
    : "object" == typeof t && "lat" in t
    ? new LatLng(t.lat, "lng" in t ? t.lng : t.lon, t.alt)
    : void 0 === e
    ? null
    : new LatLng(t, e, i);
}
Point.prototype = {
  clone: function () {
    return new Point(this.x, this.y);
  },
  add: function (t) {
    return this.clone()._add(toPoint(t));
  },
  _add: function (t) {
    return this.x += t.x, this.y += t.y, this;
  },
  subtract: function (t) {
    return this.clone()._subtract(toPoint(t));
  },
  _subtract: function (t) {
    return this.x -= t.x, this.y -= t.y, this;
  },
  divideBy: function (t) {
    return this.clone()._divideBy(t);
  },
  _divideBy: function (t) {
    return this.x /= t, this.y /= t, this;
  },
  multiplyBy: function (t) {
    return this.clone()._multiplyBy(t);
  },
  _multiplyBy: function (t) {
    return this.x *= t, this.y *= t, this;
  },
  scaleBy: function (t) {
    return new Point(this.x * t.x, this.y * t.y);
  },
  unscaleBy: function (t) {
    return new Point(this.x / t.x, this.y / t.y);
  },
  round: function () {
    return this.clone()._round();
  },
  _round: function () {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  },
  floor: function () {
    return this.clone()._floor();
  },
  _floor: function () {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  },
  ceil: function () {
    return this.clone()._ceil();
  },
  _ceil: function () {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  },
  trunc: function () {
    return this.clone()._trunc();
  },
  _trunc: function () {
    return this.x = trunc(this.x), this.y = trunc(this.y), this;
  },
  distanceTo: function (t) {
    var e = (t = toPoint(t)).x - this.x, i = t.y - this.y;
    return Math.sqrt(e * e + i * i);
  },
  equals: function (t) {
    return (t = toPoint(t)).x === this.x && t.y === this.y;
  },
  contains: function (t) {
    return Math.abs((t = toPoint(t)).x) <= Math.abs(this.x) &&
      Math.abs(t.y) <= Math.abs(this.y);
  },
  toString: function () {
    return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
  },
},
  Bounds.prototype = {
    extend: function (t) {
      var e, i;
      if (!t) return this;
      if (t instanceof Point || "number" == typeof t[0] || "x" in t) {
        e = i = toPoint(t);
      } else if (e = (t = toBounds(t)).min, i = t.max, !e || !i) return this;
      return this.min || this.max
        ? (this.min.x = Math.min(e.x, this.min.x),
          this.max.x = Math.max(i.x, this.max.x),
          this.min.y = Math.min(e.y, this.min.y),
          this.max.y = Math.max(i.y, this.max.y))
        : (this.min = e.clone(), this.max = i.clone()),
        this;
    },
    getCenter: function (t) {
      return toPoint(
        (this.min.x + this.max.x) / 2,
        (this.min.y + this.max.y) / 2,
        t,
      );
    },
    getBottomLeft: function () {
      return toPoint(this.min.x, this.max.y);
    },
    getTopRight: function () {
      return toPoint(this.max.x, this.min.y);
    },
    getTopLeft: function () {
      return this.min;
    },
    getBottomRight: function () {
      return this.max;
    },
    getSize: function () {
      return this.max.subtract(this.min);
    },
    contains: function (t) {
      var e, i;
      return (t = "number" == typeof t[0] || t instanceof Point
          ? toPoint(t)
          : toBounds(t)) instanceof Bounds
        ? (e = t.min, i = t.max)
        : e = i = t,
        e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y &&
        i.y <= this.max.y;
    },
    intersects: function (t) {
      t = toBounds(t);
      var e = this.min,
        i = this.max,
        n = t.min,
        o = t.max,
        s = o.x >= e.x && n.x <= i.x,
        r = o.y >= e.y && n.y <= i.y;
      return s && r;
    },
    overlaps: function (t) {
      t = toBounds(t);
      var e = this.min,
        i = this.max,
        n = t.min,
        o = t.max,
        s = o.x > e.x && n.x < i.x,
        r = o.y > e.y && n.y < i.y;
      return s && r;
    },
    isValid: function () {
      return !!(this.min && this.max);
    },
    pad: function (t) {
      var e = this.min,
        i = this.max,
        n = Math.abs(e.x - i.x) * t,
        o = Math.abs(e.y - i.y) * t;
      return toBounds(toPoint(e.x - n, e.y - o), toPoint(i.x + n, i.y + o));
    },
    equals: function (t) {
      return !!t &&
        (t = toBounds(t),
          this.min.equals(t.getTopLeft()) &&
          this.max.equals(t.getBottomRight()));
    },
  },
  LatLngBounds.prototype = {
    extend: function (t) {
      var e, i, n = this._southWest, o = this._northEast;
      if (t instanceof LatLng) e = t, i = t;
      else if (!(t instanceof LatLngBounds)) {
        return t ? this.extend(toLatLng(t) || toLatLngBounds(t)) : this;
      } else if (e = t._southWest, i = t._northEast, !e || !i) return this;
      return n || o
        ? (n.lat = Math.min(e.lat, n.lat),
          n.lng = Math.min(e.lng, n.lng),
          o.lat = Math.max(i.lat, o.lat),
          o.lng = Math.max(i.lng, o.lng))
        : (this._southWest = new LatLng(e.lat, e.lng),
          this._northEast = new LatLng(i.lat, i.lng)),
        this;
    },
    pad: function (t) {
      var e = this._southWest,
        i = this._northEast,
        n = Math.abs(e.lat - i.lat) * t,
        o = Math.abs(e.lng - i.lng) * t;
      return new LatLngBounds(
        new LatLng(e.lat - n, e.lng - o),
        new LatLng(i.lat + n, i.lng + o),
      );
    },
    getCenter: function () {
      return new LatLng(
        (this._southWest.lat + this._northEast.lat) / 2,
        (this._southWest.lng + this._northEast.lng) / 2,
      );
    },
    getSouthWest: function () {
      return this._southWest;
    },
    getNorthEast: function () {
      return this._northEast;
    },
    getNorthWest: function () {
      return new LatLng(this.getNorth(), this.getWest());
    },
    getSouthEast: function () {
      return new LatLng(this.getSouth(), this.getEast());
    },
    getWest: function () {
      return this._southWest.lng;
    },
    getSouth: function () {
      return this._southWest.lat;
    },
    getEast: function () {
      return this._northEast.lng;
    },
    getNorth: function () {
      return this._northEast.lat;
    },
    contains: function (t) {
      t = "number" == typeof t[0] || t instanceof LatLng || "lat" in t
        ? toLatLng(t)
        : toLatLngBounds(t);
      var e, i, n = this._southWest, o = this._northEast;
      return t instanceof LatLngBounds
        ? (e = t.getSouthWest(), i = t.getNorthEast())
        : e = i = t,
        e.lat >= n.lat && i.lat <= o.lat && e.lng >= n.lng && i.lng <= o.lng;
    },
    intersects: function (t) {
      t = toLatLngBounds(t);
      var e = this._southWest,
        i = this._northEast,
        n = t.getSouthWest(),
        o = t.getNorthEast(),
        s = o.lat >= e.lat && n.lat <= i.lat,
        r = o.lng >= e.lng && n.lng <= i.lng;
      return s && r;
    },
    overlaps: function (t) {
      t = toLatLngBounds(t);
      var e = this._southWest,
        i = this._northEast,
        n = t.getSouthWest(),
        o = t.getNorthEast(),
        s = o.lat > e.lat && n.lat < i.lat,
        r = o.lng > e.lng && n.lng < i.lng;
      return s && r;
    },
    toBBoxString: function () {
      return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()]
        .join(",");
    },
    equals: function (t, e) {
      return !!t &&
        (t = toLatLngBounds(t),
          this._southWest.equals(t.getSouthWest(), e) &&
          this._northEast.equals(t.getNorthEast(), e));
    },
    isValid: function () {
      return !!(this._southWest && this._northEast);
    },
  },
  LatLng.prototype = {
    equals: function (t, e) {
      return !!t &&
        (t = toLatLng(t),
          Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <=
            (void 0 === e ? 1e-9 : e));
    },
    toString: function (t) {
      return "LatLng(" + formatNum(this.lat, t) + ", " +
        formatNum(this.lng, t) + ")";
    },
    distanceTo: function (t) {
      return Earth.distance(this, toLatLng(t));
    },
    wrap: function () {
      return Earth.wrapLatLng(this);
    },
    toBounds: function (t) {
      var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
      return toLatLngBounds([this.lat - e, this.lng - i], [
        this.lat + e,
        this.lng + i,
      ]);
    },
    clone: function () {
      return new LatLng(this.lat, this.lng, this.alt);
    },
  };
var CRS = {
    latLngToPoint: function (t, e) {
      var i = this.projection.project(t), n = this.scale(e);
      return this.transformation._transform(i, n);
    },
    pointToLatLng: function (t, e) {
      var i = this.scale(e), n = this.transformation.untransform(t, i);
      return this.projection.unproject(n);
    },
    project: function (t) {
      return this.projection.project(t);
    },
    unproject: function (t) {
      return this.projection.unproject(t);
    },
    scale: function (t) {
      return 256 * Math.pow(2, t);
    },
    zoom: function (t) {
      return Math.log(t / 256) / Math.LN2;
    },
    getProjectedBounds: function (t) {
      if (this.infinite) return null;
      var e = this.projection.bounds,
        i = this.scale(t),
        n = this.transformation.transform(e.min, i),
        o = this.transformation.transform(e.max, i);
      return new Bounds(n, o);
    },
    infinite: !1,
    wrapLatLng: function (t) {
      var e = this.wrapLng ? wrapNum(t.lng, this.wrapLng, !0) : t.lng,
        i = this.wrapLat ? wrapNum(t.lat, this.wrapLat, !0) : t.lat,
        n = t.alt;
      return new LatLng(i, e, n);
    },
    wrapLatLngBounds: function (t) {
      var e = t.getCenter(),
        i = this.wrapLatLng(e),
        n = e.lat - i.lat,
        o = e.lng - i.lng;
      if (0 === n && 0 === o) return t;
      var s = t.getSouthWest(),
        r = t.getNorthEast(),
        a = new LatLng(s.lat - n, s.lng - o),
        h = new LatLng(r.lat - n, r.lng - o);
      return new LatLngBounds(a, h);
    },
  },
  Earth = extend({}, CRS, {
    wrapLng: [-180, 180],
    R: 6371e3,
    distance: function (t, e) {
      var i = Math.PI / 180,
        n = t.lat * i,
        o = e.lat * i,
        s = Math.sin((e.lat - t.lat) * i / 2),
        r = Math.sin((e.lng - t.lng) * i / 2),
        a = s * s + Math.cos(n) * Math.cos(o) * r * r;
      return this.R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    },
  }),
  earthRadius = 6378137,
  SphericalMercator = {
    R: earthRadius,
    MAX_LATITUDE: 85.0511287798,
    project: function (t) {
      var e = Math.PI / 180,
        i = this.MAX_LATITUDE,
        n = Math.sin(Math.max(Math.min(i, t.lat), -i) * e);
      return new Point(
        this.R * t.lng * e,
        this.R * Math.log((1 + n) / (1 - n)) / 2,
      );
    },
    unproject: function (t) {
      var e = 180 / Math.PI;
      return new LatLng(
        (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
        t.x * e / this.R,
      );
    },
    bounds: function () {
      var t = earthRadius * Math.PI;
      return new Bounds([-t, -t], [t, t]);
    }(),
  };
function Transformation(t, e, i, n) {
  if (isArray(t)) {
    this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
    return;
  }
  this._a = t, this._b = e, this._c = i, this._d = n;
}
function toTransformation(t, e, i, n) {
  return new Transformation(t, e, i, n);
}
Transformation.prototype = {
  transform: function (t, e) {
    return this._transform(t.clone(), e);
  },
  _transform: function (t, e) {
    return e = e || 1,
      t.x = e * (this._a * t.x + this._b),
      t.y = e * (this._c * t.y + this._d),
      t;
  },
  untransform: function (t, e) {
    return e = e || 1,
      new Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c);
  },
};
var EPSG3857 = extend({}, Earth, {
    code: "EPSG:3857",
    projection: SphericalMercator,
    transformation: function () {
      var t = .5 / (Math.PI * SphericalMercator.R);
      return toTransformation(t, .5, -t, .5);
    }(),
  }),
  EPSG900913 = extend({}, EPSG3857, { code: "EPSG:900913" });
function svgCreate(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function pointsToPath(t, e) {
  var i, n, o, s, r, a, h = "";
  for (i = 0, o = t.length; i < o; i += 1) {
    for (n = 0, s = (r = t[i]).length; n < s; n += 1) {
      a = r[n], h += (n ? "L" : "M") + a.x + " " + a.y;
    }
    h += e ? Browser.svg ? "z" : "x" : "";
  }
  return h || "M0 0";
}
var style = document.documentElement.style,
  ie = "ActiveXObject" in window,
  ielt9 = ie && !document.addEventListener,
  edge = "msLaunchUri" in navigator && !("documentMode" in document),
  webkit = userAgentContains("webkit"),
  android = userAgentContains("android"),
  android23 = userAgentContains("android 2") || userAgentContains("android 3"),
  webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
  androidStock = android && userAgentContains("Google") && webkitVer < 537 &&
    !("AudioNode" in window),
  opera = !!window.opera,
  chrome = !edge && userAgentContains("chrome"),
  gecko = userAgentContains("gecko") && !webkit && !opera && !ie,
  safari = !chrome && userAgentContains("safari"),
  phantom = userAgentContains("phantom"),
  opera12 = "OTransition" in style,
  win = 0 === navigator.platform.indexOf("Win"),
  ie3d = ie && "transition" in style,
  webkit3d = "WebKitCSSMatrix" in window &&
    "m11" in new window.WebKitCSSMatrix() && !android23,
  gecko3d = "MozPerspective" in style,
  any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 &&
    !phantom,
  mobile = "undefined" != typeof orientation || userAgentContains("mobile"),
  mobileWebkit = mobile && webkit,
  mobileWebkit3d = mobile && webkit3d,
  msPointer = !window.PointerEvent && window.MSPointerEvent,
  pointer = !!(window.PointerEvent || msPointer),
  touchNative = "ontouchstart" in window || !!window.TouchEvent,
  touch = !window.L_NO_TOUCH && (touchNative || pointer),
  mobileOpera = mobile && opera,
  mobileGecko = mobile && gecko,
  retina = (window.devicePixelRatio ||
    window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
  passiveEvents = function () {
    var t = !1;
    try {
      var e = Object.defineProperty({}, "passive", {
        get: function () {
          t = !0;
        },
      });
      window.addEventListener("testPassiveEventSupport", falseFn, e),
        window.removeEventListener("testPassiveEventSupport", falseFn, e);
    } catch (i) {}
    return t;
  }(),
  canvas$1 = !!document.createElement("canvas").getContext,
  svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect),
  inlineSvg = !!svg$1 && function () {
    var t = document.createElement("div");
    return t.innerHTML = "<svg/>",
      "http://www.w3.org/2000/svg" ===
        (t.firstChild && t.firstChild.namespaceURI);
  }(),
  vml = !svg$1 && function () {
    try {
      var t = document.createElement("div");
      t.innerHTML = '<v:shape adj="1"/>';
      var e = t.firstChild;
      return e.style.behavior = "url(#default#VML)",
        e && "object" == typeof e.adj;
    } catch (i) {
      return !1;
    }
  }(),
  mac = 0 === navigator.platform.indexOf("Mac"),
  linux = 0 === navigator.platform.indexOf("Linux");
function userAgentContains(t) {
  return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
}
var Browser = {
    ie: ie,
    ielt9: ielt9,
    edge: edge,
    webkit: webkit,
    android: android,
    android23: android23,
    androidStock: androidStock,
    opera: opera,
    chrome: chrome,
    gecko: gecko,
    safari: safari,
    phantom: phantom,
    opera12: opera12,
    win: win,
    ie3d: ie3d,
    webkit3d: webkit3d,
    gecko3d: gecko3d,
    any3d: any3d,
    mobile: mobile,
    mobileWebkit: mobileWebkit,
    mobileWebkit3d: mobileWebkit3d,
    msPointer: msPointer,
    pointer: pointer,
    touch: touch,
    touchNative: touchNative,
    mobileOpera: mobileOpera,
    mobileGecko: mobileGecko,
    retina: retina,
    passiveEvents: passiveEvents,
    canvas: canvas$1,
    svg: svg$1,
    vml: vml,
    inlineSvg: inlineSvg,
    mac: mac,
    linux: linux,
  },
  POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown",
  POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove",
  POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup",
  POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel",
  pEvent = {
    touchstart: POINTER_DOWN,
    touchmove: POINTER_MOVE,
    touchend: POINTER_UP,
    touchcancel: POINTER_CANCEL,
  },
  handle = {
    touchstart: _onPointerStart,
    touchmove: _handlePointer,
    touchend: _handlePointer,
    touchcancel: _handlePointer,
  },
  _pointers = {},
  _pointerDocListener = !1;
function addPointerListener(t, e, i) {
  return ("touchstart" === e && _addPointerDocListener(), handle[e])
    ? (i = handle[e].bind(this, i), t.addEventListener(pEvent[e], i, !1), i)
    : (console.warn("wrong event specified:", e), falseFn);
}
function removePointerListener(t, e, i) {
  if (!pEvent[e]) {
    console.warn("wrong event specified:", e);
    return;
  }
  t.removeEventListener(pEvent[e], i, !1);
}
function _globalPointerDown(t) {
  _pointers[t.pointerId] = t;
}
function _globalPointerMove(t) {
  _pointers[t.pointerId] && (_pointers[t.pointerId] = t);
}
function _globalPointerUp(t) {
  delete _pointers[t.pointerId];
}
function _addPointerDocListener() {
  _pointerDocListener ||
    (document.addEventListener(POINTER_DOWN, _globalPointerDown, !0),
      document.addEventListener(POINTER_MOVE, _globalPointerMove, !0),
      document.addEventListener(POINTER_UP, _globalPointerUp, !0),
      document.addEventListener(POINTER_CANCEL, _globalPointerUp, !0),
      _pointerDocListener = !0);
}
function _handlePointer(t, e) {
  if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
    for (var i in e.touches = [], _pointers) e.touches.push(_pointers[i]);
    e.changedTouches = [e], t(e);
  }
}
function _onPointerStart(t, e) {
  e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH &&
  preventDefault(e), _handlePointer(t, e);
}
function makeDblclick(t) {
  var e, i, n = {};
  for (i in t) e = t[i], n[i] = e && e.bind ? e.bind(t) : e;
  return t = n,
    n.type = "dblclick",
    n.detail = 2,
    n.isTrusted = !1,
    n._simulated = !0,
    n;
}
var delay = 200;
function addDoubleTapListener(t, e) {
  t.addEventListener("dblclick", e);
  var i, n = 0;
  function o(t) {
    if (1 !== t.detail) {
      i = t.detail;
      return;
    }
    if (
      "mouse" !== t.pointerType &&
      (!t.sourceCapabilities || t.sourceCapabilities.firesTouchEvents)
    ) {
      var o = getPropagationPath(t);
      if (
        !o.some(function (t) {
          return t instanceof HTMLLabelElement && t.attributes.for;
        }) || o.some(function (t) {
          return t instanceof HTMLInputElement ||
            t instanceof HTMLSelectElement;
        })
      ) {
        var s = Date.now();
        s - n <= delay ? 2 === (i += 1) && e(makeDblclick(t)) : i = 1, n = s;
      }
    }
  }
  return t.addEventListener("click", o), { dblclick: e, simDblclick: o };
}
function removeDoubleTapListener(t, e) {
  t.removeEventListener("dblclick", e.dblclick),
    t.removeEventListener("click", e.simDblclick);
}
var TRANSFORM = testProp([
    "transform",
    "webkitTransform",
    "OTransform",
    "MozTransform",
    "msTransform",
  ]),
  TRANSITION = testProp([
    "webkitTransition",
    "transition",
    "OTransition",
    "MozTransition",
    "msTransition",
  ]),
  TRANSITION_END =
    "webkitTransition" === TRANSITION || "OTransition" === TRANSITION
      ? TRANSITION + "End"
      : "transitionend";
function get(t) {
  return "string" == typeof t ? document.getElementById(t) : t;
}
function getStyle(t, e) {
  var i = t.style[e] || t.currentStyle && t.currentStyle[e];
  if ((!i || "auto" === i) && document.defaultView) {
    var n = document.defaultView.getComputedStyle(t, null);
    i = n ? n[e] : null;
  }
  return "auto" === i ? null : i;
}
function create$1(t, e, i) {
  var n = document.createElement(t);
  return n.className = e || "", i && i.appendChild(n), n;
}
function remove(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function empty(t) {
  for (; t.firstChild;) t.removeChild(t.firstChild);
}
function toFront(t) {
  var e = t.parentNode;
  e && e.lastChild !== t && e.appendChild(t);
}
function toBack(t) {
  var e = t.parentNode;
  e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
}
function hasClass(t, e) {
  if (void 0 !== t.classList) return t.classList.contains(e);
  var i = getClass(t);
  return i.length > 0 && RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
}
function addClass(t, e) {
  if (void 0 !== t.classList) {
    for (var i = splitWords(e), n = 0, o = i.length; n < o; n += 1) {
      t.classList.add(i[n]);
    }
  } else if (!hasClass(t, e)) {
    var s = getClass(t);
    setClass(t, (s ? s + " " : "") + e);
  }
}
function removeClass(t, e) {
  void 0 !== t.classList
    ? t.classList.remove(e)
    : setClass(t, trim((" " + getClass(t) + " ").replace(" " + e + " ", " ")));
}
function setClass(t, e) {
  void 0 === t.className.baseVal ? t.className = e : t.className.baseVal = e;
}
function getClass(t) {
  return t.correspondingElement && (t = t.correspondingElement),
    void 0 === t.className.baseVal ? t.className : t.className.baseVal;
}
function setOpacity(t, e) {
  "opacity" in t.style
    ? t.style.opacity = e
    : "filter" in t.style && _setOpacityIE(t, e);
}
function _setOpacityIE(t, e) {
  var i = !1, n = "DXImageTransform.Microsoft.Alpha";
  try {
    i = t.filters.item(n);
  } catch (o) {
    if (1 === e) return;
  }
  e = Math.round(100 * e),
    i
      ? (i.Enabled = 100 !== e, i.Opacity = e)
      : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
}
function testProp(t) {
  for (var e = document.documentElement.style, i = 0; i < t.length; i += 1) {
    if (t[i] in e) return t[i];
  }
  return !1;
}
function setTransform(t, e, i) {
  var n = e || new Point(0, 0);
  t.style[TRANSFORM] =
    (Browser.ie3d
      ? "translate(" + n.x + "px," + n.y + "px)"
      : "translate3d(" + n.x + "px," + n.y + "px,0)") +
    (i ? " scale(" + i + ")" : "");
}
function setPosition(t, e) {
  t._leaflet_pos = e,
    Browser.any3d
      ? setTransform(t, e)
      : (t.style.left = e.x + "px", t.style.top = e.y + "px");
}
function getPosition(t) {
  return t._leaflet_pos || new Point(0, 0);
}
if ("onselectstart" in document) {
  disableTextSelection = function () {
    on(window, "selectstart", preventDefault);
  },
    enableTextSelection = function () {
      off(window, "selectstart", preventDefault);
    };
} else {
  var t = testProp([
    "userSelect",
    "WebkitUserSelect",
    "OUserSelect",
    "MozUserSelect",
    "msUserSelect",
  ]);
  disableTextSelection = function () {
    if (t) {
      var e = document.documentElement.style;
      _userSelect = e[t], e[t] = "none";
    }
  },
    enableTextSelection = function () {
      t &&
        (document.documentElement.style[t] = _userSelect, _userSelect = void 0);
    };
}
function disableImageDrag() {
  on(window, "dragstart", preventDefault);
}
function enableImageDrag() {
  off(window, "dragstart", preventDefault);
}
function preventOutline(t) {
  for (; -1 === t.tabIndex;) t = t.parentNode;
  t.style &&
    (restoreOutline(),
      _outlineElement = t,
      _outlineStyle = t.style.outlineStyle,
      t.style.outlineStyle = "none",
      on(window, "keydown", restoreOutline));
}
function restoreOutline() {
  _outlineElement &&
    (_outlineElement.style.outlineStyle = _outlineStyle,
      _outlineElement = void 0,
      _outlineStyle = void 0,
      off(window, "keydown", restoreOutline));
}
function getSizedParentNode(t) {
  do t = t.parentNode; while (
    (!t.offsetWidth || !t.offsetHeight) && t !== document.body
  );
  return t;
}
function getScale(t) {
  var e = t.getBoundingClientRect();
  return {
    x: e.width / t.offsetWidth || 1,
    y: e.height / t.offsetHeight || 1,
    boundingClientRect: e,
  };
}
var DomUtil = {
  __proto__: null,
  TRANSFORM: TRANSFORM,
  TRANSITION: TRANSITION,
  TRANSITION_END: TRANSITION_END,
  get: get,
  getStyle: getStyle,
  create: create$1,
  remove: remove,
  empty: empty,
  toFront: toFront,
  toBack: toBack,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  setClass: setClass,
  getClass: getClass,
  setOpacity: setOpacity,
  testProp: testProp,
  setTransform: setTransform,
  setPosition: setPosition,
  getPosition: getPosition,
  get disableTextSelection() {
    return disableTextSelection;
  },
  get enableTextSelection() {
    return enableTextSelection;
  },
  disableImageDrag: disableImageDrag,
  enableImageDrag: enableImageDrag,
  preventOutline: preventOutline,
  restoreOutline: restoreOutline,
  getSizedParentNode: getSizedParentNode,
  getScale: getScale,
};
function on(t, e, i, n) {
  if (e && "object" == typeof e) { for (var o in e) addOne(t, o, e[o], i); }
  else {
    e = splitWords(e);
    for (var s = 0, r = e.length; s < r; s += 1) addOne(t, e[s], i, n);
  }
  return this;
}
var eventsKey = "_leaflet_events";
function off(t, e, i, n) {
  if (1 === arguments.length) batchRemove(t), delete t[eventsKey];
  else if (e && "object" == typeof e) {
    for (var o in e) removeOne(t, o, e[o], i);
  } else if (e = splitWords(e), 2 === arguments.length) {
    batchRemove(t, function (t) {
      return -1 !== indexOf(e, t);
    });
  } else for (var s = 0, r = e.length; s < r; s += 1) removeOne(t, e[s], i, n);
  return this;
}
function batchRemove(t, e) {
  for (var i in t[eventsKey]) {
    var n = i.split(/\d/)[0];
    (!e || e(n)) && removeOne(t, n, null, null, i);
  }
}
var mouseSubst = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  wheel: !("onwheel" in window) && "mousewheel",
};
function addOne(t, e, i, n) {
  var o = e + stamp(i) + (n ? "_" + stamp(n) : "");
  if (t[eventsKey] && t[eventsKey][o]) return this;
  var s = function (e) {
      return i.call(n || t, e || window.event);
    },
    r = s;
  !Browser.touchNative && Browser.pointer && 0 === e.indexOf("touch")
    ? s = addPointerListener(t, e, s)
    : Browser.touch && "dblclick" === e
    ? s = addDoubleTapListener(t, s)
    : "addEventListener" in t
    ? "touchstart" === e || "touchmove" === e || "wheel" === e ||
        "mousewheel" === e
      ? t.addEventListener(
        mouseSubst[e] || e,
        s,
        !!Browser.passiveEvents && { passive: !1 },
      )
      : "mouseenter" === e || "mouseleave" === e
      ? (s = function (e) {
        isExternalTarget(t, e = e || window.event) && r(e);
      },
        t.addEventListener(mouseSubst[e], s, !1))
      : t.addEventListener(e, r, !1)
    : t.attachEvent("on" + e, s),
    t[eventsKey] = t[eventsKey] || {},
    t[eventsKey][o] = s;
}
function removeOne(t, e, i, n, o) {
  o = o || e + stamp(i) + (n ? "_" + stamp(n) : "");
  var s = t[eventsKey] && t[eventsKey][o];
  if (!s) return this;
  !Browser.touchNative && Browser.pointer && 0 === e.indexOf("touch")
    ? removePointerListener(t, e, s)
    : Browser.touch && "dblclick" === e
    ? removeDoubleTapListener(t, s)
    : "removeEventListener" in t
    ? t.removeEventListener(mouseSubst[e] || e, s, !1)
    : t.detachEvent("on" + e, s), t[eventsKey][o] = null;
}
function stopPropagation(t) {
  return t.stopPropagation
    ? t.stopPropagation()
    : t.originalEvent
    ? t.originalEvent._stopped = !0
    : t.cancelBubble = !0,
    this;
}
function disableScrollPropagation(t) {
  return addOne(t, "wheel", stopPropagation), this;
}
function disableClickPropagation(t) {
  return on(t, "mousedown touchstart dblclick contextmenu", stopPropagation),
    t._leaflet_disable_click = !0,
    this;
}
function preventDefault(t) {
  return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
}
function stop(t) {
  return preventDefault(t), stopPropagation(t), this;
}
function getPropagationPath(t) {
  if (t.composedPath) return t.composedPath();
  for (var e = [], i = t.target; i;) e.push(i), i = i.parentNode;
  return e;
}
function getMousePosition(t, e) {
  if (!e) return new Point(t.clientX, t.clientY);
  var i = getScale(e), n = i.boundingClientRect;
  return new Point(
    (t.clientX - n.left) / i.x - e.clientLeft,
    (t.clientY - n.top) / i.y - e.clientTop,
  );
}
var wheelPxFactor = Browser.linux && Browser.chrome
  ? window.devicePixelRatio
  : Browser.mac
  ? 3 * window.devicePixelRatio
  : window.devicePixelRatio > 0
  ? 2 * window.devicePixelRatio
  : 1;
function getWheelDelta(t) {
  return Browser.edge
    ? t.wheelDeltaY / 2
    : t.deltaY && 0 === t.deltaMode
    ? -t.deltaY / wheelPxFactor
    : t.deltaY && 1 === t.deltaMode
    ? -(20 * t.deltaY)
    : t.deltaY && 2 === t.deltaMode
    ? -(60 * t.deltaY)
    : t.deltaX || t.deltaZ
    ? 0
    : t.wheelDelta
    ? (t.wheelDeltaY || t.wheelDelta) / 2
    : t.detail && 32765 > Math.abs(t.detail)
    ? -(20 * t.detail)
    : t.detail
    ? -(60 * (t.detail / 32765))
    : 0;
}
function isExternalTarget(t, e) {
  var i = e.relatedTarget;
  if (!i) return !0;
  try {
    for (; i && i !== t;) i = i.parentNode;
  } catch (n) {
    return !1;
  }
  return i !== t;
}
var DomEvent = {
    __proto__: null,
    on: on,
    off: off,
    stopPropagation: stopPropagation,
    disableScrollPropagation: disableScrollPropagation,
    disableClickPropagation: disableClickPropagation,
    preventDefault: preventDefault,
    stop: stop,
    getPropagationPath: getPropagationPath,
    getMousePosition: getMousePosition,
    getWheelDelta: getWheelDelta,
    isExternalTarget: isExternalTarget,
    addListener: on,
    removeListener: off,
  },
  PosAnimation = Evented.extend({
    run: function (t, e, i, n) {
      this.stop(),
        this._el = t,
        this._inProgress = !0,
        this._duration = i || .25,
        this._easeOutPower = 1 / Math.max(n || .5, .2),
        this._startPos = getPosition(t),
        this._offset = e.subtract(this._startPos),
        this._startTime = +new Date(),
        this.fire("start"),
        this._animate();
    },
    stop: function () {
      this._inProgress && (this._step(!0), this._complete());
    },
    _animate: function () {
      this._animId = requestAnimFrame(this._animate, this), this._step();
    },
    _step: function (t) {
      var e = +new Date() - this._startTime, i = 1e3 * this._duration;
      e < i
        ? this._runFrame(this._easeOut(e / i), t)
        : (this._runFrame(1), this._complete());
    },
    _runFrame: function (t, e) {
      var i = this._startPos.add(this._offset.multiplyBy(t));
      e && i._round(), setPosition(this._el, i), this.fire("step");
    },
    _complete: function () {
      cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end");
    },
    _easeOut: function (t) {
      return 1 - Math.pow(1 - t, this._easeOutPower);
    },
  }),
  Map = Evented.extend({
    options: {
      crs: EPSG3857,
      center: void 0,
      zoom: void 0,
      minZoom: void 0,
      maxZoom: void 0,
      layers: [],
      maxBounds: void 0,
      renderer: void 0,
      zoomAnimation: !0,
      zoomAnimationThreshold: 4,
      fadeAnimation: !0,
      markerZoomAnimation: !0,
      transform3DLimit: 8388608,
      zoomSnap: 1,
      zoomDelta: 1,
      trackResize: !0,
    },
    initialize: function (t, e) {
      e = setOptions(this, e),
        this._handlers = [],
        this._layers = {},
        this._zoomBoundLayers = {},
        this._sizeChanged = !0,
        this._initContainer(t),
        this._initLayout(),
        this._onResize = bind(this._onResize, this),
        this._initEvents(),
        e.maxBounds && this.setMaxBounds(e.maxBounds),
        void 0 !== e.zoom && (this._zoom = this._limitZoom(e.zoom)),
        e.center && void 0 !== e.zoom &&
        this.setView(toLatLng(e.center), e.zoom, { reset: !0 }),
        this.callInitHooks(),
        this._zoomAnimated = TRANSITION && Browser.any3d &&
          !Browser.mobileOpera && this.options.zoomAnimation,
        this._zoomAnimated &&
        (this._createAnimProxy(),
          on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this)),
        this._addLayers(this.options.layers);
    },
    setView: function (t, e, i) {
      return (e = void 0 === e ? this._zoom : this._limitZoom(e),
          t = this._limitCenter(toLatLng(t), e, this.options.maxBounds),
          i = i || {},
          this._stop(),
          this._loaded && !i.reset && !0 !== i &&
          (void 0 !== i.animate &&
            (i.zoom = extend({ animate: i.animate }, i.zoom),
              i.pan = extend(
                { animate: i.animate, duration: i.duration },
                i.pan,
              )),
            this._zoom !== e
              ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom)
              : this._tryAnimatedPan(t, i.pan)))
        ? (clearTimeout(this._sizeTimer), this)
        : (this._resetView(t, e, i.pan && i.pan.noMoveStart), this);
    },
    setZoom: function (t, e) {
      return this._loaded
        ? this.setView(this.getCenter(), t, { zoom: e })
        : (this._zoom = t, this);
    },
    zoomIn: function (t, e) {
      return t = t || (Browser.any3d ? this.options.zoomDelta : 1),
        this.setZoom(this._zoom + t, e);
    },
    zoomOut: function (t, e) {
      return t = t || (Browser.any3d ? this.options.zoomDelta : 1),
        this.setZoom(this._zoom - t, e);
    },
    setZoomAround: function (t, e, i) {
      var n = this.getZoomScale(e),
        o = this.getSize().divideBy(2),
        s = (t instanceof Point ? t : this.latLngToContainerPoint(t)).subtract(
          o,
        ).multiplyBy(1 - 1 / n),
        r = this.containerPointToLatLng(o.add(s));
      return this.setView(r, e, { zoom: i });
    },
    _getBoundsCenterZoom: function (t, e) {
      e = e || {}, t = t.getBounds ? t.getBounds() : toLatLngBounds(t);
      var i = toPoint(e.paddingTopLeft || e.padding || [0, 0]),
        n = toPoint(e.paddingBottomRight || e.padding || [0, 0]),
        o = this.getBoundsZoom(t, !1, i.add(n));
      if (
        (o = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, o) : o) ===
          1 / 0
      ) return { center: t.getCenter(), zoom: o };
      var s = n.subtract(i).divideBy(2),
        r = this.project(t.getSouthWest(), o),
        a = this.project(t.getNorthEast(), o);
      return {
        center: this.unproject(r.add(a).divideBy(2).add(s), o),
        zoom: o,
      };
    },
    fitBounds: function (t, e) {
      if (!(t = toLatLngBounds(t)).isValid()) {
        throw Error("Bounds are not valid.");
      }
      var i = this._getBoundsCenterZoom(t, e);
      return this.setView(i.center, i.zoom, e);
    },
    fitWorld: function (t) {
      return this.fitBounds([[-90, -180], [90, 180]], t);
    },
    panTo: function (t, e) {
      return this.setView(t, this._zoom, { pan: e });
    },
    panBy: function (t, e) {
      if (t = toPoint(t).round(), e = e || {}, !t.x && !t.y) {
        return this.fire("moveend");
      }
      if (!0 !== e.animate && !this.getSize().contains(t)) {
        return this._resetView(
          this.unproject(this.project(this.getCenter()).add(t)),
          this.getZoom(),
        ),
          this;
      }
      if (
        this._panAnim ||
        (this._panAnim = new PosAnimation(),
          this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd,
          }, this)),
          e.noMoveStart || this.fire("movestart"),
          !1 !== e.animate
      ) {
        addClass(this._mapPane, "leaflet-pan-anim");
        var i = this._getMapPanePos().subtract(t).round();
        this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity);
      } else this._rawPanBy(t), this.fire("move").fire("moveend");
      return this;
    },
    flyTo: function (t, e, i) {
      if (!1 === (i = i || {}).animate || !Browser.any3d) {
        return this.setView(t, e, i);
      }
      this._stop();
      var n = this.project(this.getCenter()),
        o = this.project(t),
        s = this.getSize(),
        r = this._zoom;
      t = toLatLng(t), e = void 0 === e ? r : e;
      var a = Math.max(s.x, s.y),
        h = a * this.getZoomScale(r, e),
        l = o.distanceTo(n) || 1;
      function u(t) {
        var e = (h * h - a * a + (t ? -1 : 1) * 4.0658689599999995 * l * l) /
            (2 * (t ? h : a) * 2.0164 * l),
          i = Math.sqrt(e * e + 1) - e;
        return i < 1e-9 ? -18 : Math.log(i);
      }
      function c(t) {
        return (Math.exp(t) - Math.exp(-t)) / 2;
      }
      function d(t) {
        return (Math.exp(t) + Math.exp(-t)) / 2;
      }
      var p = u(0),
        m = Date.now(),
        f = (u(1) - p) / 1.42,
        g = i.duration ? 1e3 * i.duration : 1e3 * f * .8;
      function v() {
        var i,
          s,
          h,
          u,
          y = (Date.now() - m) / g,
          P = (1 - Math.pow(1 - (u = y), 1.5)) * f;
        y <= 1
          ? (this._flyToFrame = requestAnimFrame(v, this),
            this._move(
              this.unproject(
                n.add(
                  o.subtract(n).multiplyBy(
                    (i = P,
                      a * (d(p) * (c(s = p + 1.42 * i) / d(s)) - c(p)) /
                      2.0164 / l),
                  ),
                ),
                r,
              ),
              this.getScaleZoom(a / (h = P, a * (d(p) / d(p + 1.42 * h))), r),
              { flyTo: !0 },
            ))
          : this._move(t, e)._moveEnd(!0);
      }
      return this._moveStart(!0, i.noMoveStart), v.call(this), this;
    },
    flyToBounds: function (t, e) {
      var i = this._getBoundsCenterZoom(t, e);
      return this.flyTo(i.center, i.zoom, e);
    },
    setMaxBounds: function (t) {
      return (t = toLatLngBounds(t),
          this.listens("moveend", this._panInsideMaxBounds) &&
          this.off("moveend", this._panInsideMaxBounds),
          t.isValid())
        ? (this.options.maxBounds = t,
          this._loaded && this._panInsideMaxBounds(),
          this.on("moveend", this._panInsideMaxBounds))
        : (this.options.maxBounds = null, this);
    },
    setMinZoom: function (t) {
      var e = this.options.minZoom;
      return (this.options.minZoom = t,
          this._loaded && e !== t &&
          (this.fire("zoomlevelschange"),
            this.getZoom() < this.options.minZoom))
        ? this.setZoom(t)
        : this;
    },
    setMaxZoom: function (t) {
      var e = this.options.maxZoom;
      return (this.options.maxZoom = t,
          this._loaded && e !== t &&
          (this.fire("zoomlevelschange"),
            this.getZoom() > this.options.maxZoom))
        ? this.setZoom(t)
        : this;
    },
    panInsideBounds: function (t, e) {
      this._enforcingBounds = !0;
      var i = this.getCenter(),
        n = this._limitCenter(i, this._zoom, toLatLngBounds(t));
      return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
    },
    panInside: function (t, e) {
      var i = toPoint((e = e || {}).paddingTopLeft || e.padding || [0, 0]),
        n = toPoint(e.paddingBottomRight || e.padding || [0, 0]),
        o = this.project(this.getCenter()),
        s = this.project(t),
        r = this.getPixelBounds(),
        a = toBounds([r.min.add(i), r.max.subtract(n)]),
        h = a.getSize();
      if (!a.contains(s)) {
        this._enforcingBounds = !0;
        var l = s.subtract(a.getCenter()),
          u = a.extend(s).getSize().subtract(h);
        o.x += l.x < 0 ? -u.x : u.x,
          o.y += l.y < 0 ? -u.y : u.y,
          this.panTo(this.unproject(o), e),
          this._enforcingBounds = !1;
      }
      return this;
    },
    invalidateSize: function (t) {
      if (!this._loaded) return this;
      t = extend({ animate: !1, pan: !0 }, !0 === t ? { animate: !0 } : t);
      var e = this.getSize();
      this._sizeChanged = !0, this._lastCenter = null;
      var i = this.getSize(),
        n = e.divideBy(2).round(),
        o = i.divideBy(2).round(),
        s = n.subtract(o);
      return s.x || s.y
        ? (t.animate && t.pan
          ? this.panBy(s)
          : (t.pan && this._rawPanBy(s),
            this.fire("move"),
            t.debounceMoveend
              ? (clearTimeout(this._sizeTimer),
                this._sizeTimer = setTimeout(
                  bind(this.fire, this, "moveend"),
                  200,
                ))
              : this.fire("moveend")),
          this.fire("resize", { oldSize: e, newSize: i }))
        : this;
    },
    stop: function () {
      return this.setZoom(this._limitZoom(this._zoom)),
        this.options.zoomSnap || this.fire("viewreset"),
        this._stop();
    },
    locate: function (t) {
      if (
        t = this._locateOptions = extend({ timeout: 1e4, watch: !1 }, t),
          !("geolocation" in navigator)
      ) {
        return this._handleGeolocationError({
          code: 0,
          message: "Geolocation not supported.",
        }),
          this;
      }
      var e = bind(this._handleGeolocationResponse, this),
        i = bind(this._handleGeolocationError, this);
      return t.watch
        ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t)
        : navigator.geolocation.getCurrentPosition(e, i, t),
        this;
    },
    stopLocate: function () {
      return navigator.geolocation && navigator.geolocation.clearWatch &&
        navigator.geolocation.clearWatch(this._locationWatchId),
        this._locateOptions && (this._locateOptions.setView = !1),
        this;
    },
    _handleGeolocationError: function (t) {
      if (this._container._leaflet_id) {
        var e = t.code,
          i = t.message ||
            (1 === e
              ? "permission denied"
              : 2 === e
              ? "position unavailable"
              : "timeout");
        this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire("locationerror", {
            code: e,
            message: "Geolocation error: " + i + ".",
          });
      }
    },
    _handleGeolocationResponse: function (t) {
      if (this._container._leaflet_id) {
        var e = t.coords.latitude,
          i = t.coords.longitude,
          n = new LatLng(e, i),
          o = n.toBounds(2 * t.coords.accuracy),
          s = this._locateOptions;
        if (s.setView) {
          var r = this.getBoundsZoom(o);
          this.setView(n, s.maxZoom ? Math.min(r, s.maxZoom) : r);
        }
        var a = { latlng: n, bounds: o, timestamp: t.timestamp };
        for (var h in t.coords) {
          "number" == typeof t.coords[h] && (a[h] = t.coords[h]);
        }
        this.fire("locationfound", a);
      }
    },
    addHandler: function (t, e) {
      if (!e) return this;
      var i = this[t] = new e(this);
      return this._handlers.push(i), this.options[t] && i.enable(), this;
    },
    remove: function () {
      var t;
      if (
        this._initEvents(!0),
          this.options.maxBounds &&
          this.off("moveend", this._panInsideMaxBounds),
          this._containerId !== this._container._leaflet_id
      ) throw Error("Map container is being reused by another instance");
      try {
        delete this._container._leaflet_id, delete this._containerId;
      } catch (e) {
        this._container._leaflet_id = void 0, this._containerId = void 0;
      }
      for (
        t in void 0 !== this._locationWatchId && this.stopLocate(),
          this._stop(),
          remove(this._mapPane),
          this._clearControlPos && this._clearControlPos(),
          this._resizeRequest &&
          (cancelAnimFrame(this._resizeRequest), this._resizeRequest = null),
          this._clearHandlers(),
          this._loaded && this.fire("unload"),
          this._layers
      ) this._layers[t].remove();
      for (t in this._panes) remove(this._panes[t]);
      return this._layers = [],
        this._panes = [],
        delete this._mapPane,
        delete this._renderer,
        this;
    },
    createPane: function (t, e) {
      var i = create$1(
        "div",
        "leaflet-pane" +
          (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""),
        e || this._mapPane,
      );
      return t && (this._panes[t] = i), i;
    },
    getCenter: function () {
      return (this._checkIfLoaded(), this._lastCenter && !this._moved())
        ? this._lastCenter.clone()
        : this.layerPointToLatLng(this._getCenterLayerPoint());
    },
    getZoom: function () {
      return this._zoom;
    },
    getBounds: function () {
      var t = this.getPixelBounds(),
        e = this.unproject(t.getBottomLeft()),
        i = this.unproject(t.getTopRight());
      return new LatLngBounds(e, i);
    },
    getMinZoom: function () {
      return void 0 === this.options.minZoom
        ? this._layersMinZoom || 0
        : this.options.minZoom;
    },
    getMaxZoom: function () {
      return void 0 === this.options.maxZoom
        ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom
        : this.options.maxZoom;
    },
    getBoundsZoom: function (t, e, i) {
      t = toLatLngBounds(t), i = toPoint(i || [0, 0]);
      var n = this.getZoom() || 0,
        o = this.getMinZoom(),
        s = this.getMaxZoom(),
        r = t.getNorthWest(),
        a = t.getSouthEast(),
        h = this.getSize().subtract(i),
        l = toBounds(this.project(a, n), this.project(r, n)).getSize(),
        u = Browser.any3d ? this.options.zoomSnap : 1,
        c = h.x / l.x,
        d = h.y / l.y;
      return n = this.getScaleZoom(e ? Math.max(c, d) : Math.min(c, d), n),
        u &&
        (n = Math.round(n / (u / 100)) * (u / 100),
          n = e ? Math.ceil(n / u) * u : Math.floor(n / u) * u),
        Math.max(o, Math.min(s, n));
    },
    getSize: function () {
      return (!this._size || this._sizeChanged) &&
        (this._size = new Point(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0,
        ),
          this._sizeChanged = !1),
        this._size.clone();
    },
    getPixelBounds: function (t, e) {
      var i = this._getTopLeftPoint(t, e);
      return new Bounds(i, i.add(this.getSize()));
    },
    getPixelOrigin: function () {
      return this._checkIfLoaded(), this._pixelOrigin;
    },
    getPixelWorldBounds: function (t) {
      return this.options.crs.getProjectedBounds(
        void 0 === t ? this.getZoom() : t,
      );
    },
    getPane: function (t) {
      return "string" == typeof t ? this._panes[t] : t;
    },
    getPanes: function () {
      return this._panes;
    },
    getContainer: function () {
      return this._container;
    },
    getZoomScale: function (t, e) {
      var i = this.options.crs;
      return e = void 0 === e ? this._zoom : e, i.scale(t) / i.scale(e);
    },
    getScaleZoom: function (t, e) {
      var i = this.options.crs;
      e = void 0 === e ? this._zoom : e;
      var n = i.zoom(t * i.scale(e));
      return isNaN(n) ? 1 / 0 : n;
    },
    project: function (t, e) {
      return e = void 0 === e ? this._zoom : e,
        this.options.crs.latLngToPoint(toLatLng(t), e);
    },
    unproject: function (t, e) {
      return e = void 0 === e ? this._zoom : e,
        this.options.crs.pointToLatLng(toPoint(t), e);
    },
    layerPointToLatLng: function (t) {
      var e = toPoint(t).add(this.getPixelOrigin());
      return this.unproject(e);
    },
    latLngToLayerPoint: function (t) {
      return this.project(toLatLng(t))._round()._subtract(
        this.getPixelOrigin(),
      );
    },
    wrapLatLng: function (t) {
      return this.options.crs.wrapLatLng(toLatLng(t));
    },
    wrapLatLngBounds: function (t) {
      return this.options.crs.wrapLatLngBounds(toLatLngBounds(t));
    },
    distance: function (t, e) {
      return this.options.crs.distance(toLatLng(t), toLatLng(e));
    },
    containerPointToLayerPoint: function (t) {
      return toPoint(t).subtract(this._getMapPanePos());
    },
    layerPointToContainerPoint: function (t) {
      return toPoint(t).add(this._getMapPanePos());
    },
    containerPointToLatLng: function (t) {
      var e = this.containerPointToLayerPoint(toPoint(t));
      return this.layerPointToLatLng(e);
    },
    latLngToContainerPoint: function (t) {
      return this.layerPointToContainerPoint(
        this.latLngToLayerPoint(toLatLng(t)),
      );
    },
    mouseEventToContainerPoint: function (t) {
      return getMousePosition(t, this._container);
    },
    mouseEventToLayerPoint: function (t) {
      return this.containerPointToLayerPoint(
        this.mouseEventToContainerPoint(t),
      );
    },
    mouseEventToLatLng: function (t) {
      return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
    },
    _initContainer: function (t) {
      var e = this._container = get(t);
      if (e) {
        if (e._leaflet_id) {
          throw Error("Map container is already initialized.");
        }
      } else throw Error("Map container not found.");
      on(e, "scroll", this._onScroll, this), this._containerId = stamp(e);
    },
    _initLayout: function () {
      var t = this._container;
      this._fadeAnimated = this.options.fadeAnimation && Browser.any3d,
        addClass(
          t,
          "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") +
            (Browser.retina ? " leaflet-retina" : "") +
            (Browser.ielt9 ? " leaflet-oldie" : "") +
            (Browser.safari ? " leaflet-safari" : "") +
            (this._fadeAnimated ? " leaflet-fade-anim" : ""),
        );
      var e = getStyle(t, "position");
      "absolute" !== e && "relative" !== e && "fixed" !== e && "sticky" !== e &&
      (t.style.position = "relative"),
        this._initPanes(),
        this._initControlPos && this._initControlPos();
    },
    _initPanes: function () {
      var t = this._panes = {};
      this._paneRenderers = {},
        this._mapPane = this.createPane("mapPane", this._container),
        setPosition(this._mapPane, new Point(0, 0)),
        this.createPane("tilePane"),
        this.createPane("overlayPane"),
        this.createPane("shadowPane"),
        this.createPane("markerPane"),
        this.createPane("tooltipPane"),
        this.createPane("popupPane"),
        this.options.markerZoomAnimation ||
        (addClass(t.markerPane, "leaflet-zoom-hide"),
          addClass(t.shadowPane, "leaflet-zoom-hide"));
    },
    _resetView: function (t, e, i) {
      setPosition(this._mapPane, new Point(0, 0));
      var n = !this._loaded;
      this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
      var o = this._zoom !== e;
      this._moveStart(o, i)._move(t, e)._moveEnd(o),
        this.fire("viewreset"),
        n && this.fire("load");
    },
    _moveStart: function (t, e) {
      return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
    },
    _move: function (t, e, i, n) {
      void 0 === e && (e = this._zoom);
      var o = this._zoom !== e;
      return this._zoom = e,
        this._lastCenter = t,
        this._pixelOrigin = this._getNewPixelOrigin(t),
        n
          ? i && i.pinch && this.fire("zoom", i)
          : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)),
        this;
    },
    _moveEnd: function (t) {
      return t && this.fire("zoomend"), this.fire("moveend");
    },
    _stop: function () {
      return cancelAnimFrame(this._flyToFrame),
        this._panAnim && this._panAnim.stop(),
        this;
    },
    _rawPanBy: function (t) {
      setPosition(this._mapPane, this._getMapPanePos().subtract(t));
    },
    _getZoomSpan: function () {
      return this.getMaxZoom() - this.getMinZoom();
    },
    _panInsideMaxBounds: function () {
      this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
    },
    _checkIfLoaded: function () {
      if (!this._loaded) throw Error("Set map center and zoom first.");
    },
    _initEvents: function (t) {
      this._targets = {}, this._targets[stamp(this._container)] = this;
      var e = t ? off : on;
      e(
        this._container,
        "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",
        this._handleDOMEvent,
        this,
      ),
        this.options.trackResize && e(window, "resize", this._onResize, this),
        Browser.any3d && this.options.transform3DLimit &&
        (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
    },
    _onResize: function () {
      cancelAnimFrame(this._resizeRequest),
        this._resizeRequest = requestAnimFrame(function () {
          this.invalidateSize({ debounceMoveend: !0 });
        }, this);
    },
    _onScroll: function () {
      this._container.scrollTop = 0, this._container.scrollLeft = 0;
    },
    _onMoveEnd: function () {
      var t = this._getMapPanePos();
      Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit &&
        this._resetView(this.getCenter(), this.getZoom());
    },
    _findEventTargets: function (t, e) {
      for (
        var i,
          n = [],
          o = "mouseout" === e || "mouseover" === e,
          s = t.target || t.srcElement,
          r = !1;
        s;
      ) {
        if (
          (i = this._targets[stamp(s)]) &&
          ("click" === e || "preclick" === e) && this._draggableMoved(i)
        ) {
          r = !0;
          break;
        }
        if (
          i && i.listens(e, !0) &&
            (o && !isExternalTarget(s, t) || (n.push(i), o)) ||
          s === this._container
        ) break;
        s = s.parentNode;
      }
      return !n.length && !r && !o && this.listens(e, !0) && (n = [this]), n;
    },
    _isClickDisabled: function (t) {
      for (; t && t !== this._container;) {
        if (t._leaflet_disable_click) return !0;
        t = t.parentNode;
      }
    },
    _handleDOMEvent: function (t) {
      var e = t.target || t.srcElement;
      if (
        !(!this._loaded || e._leaflet_disable_events ||
          "click" === t.type && this._isClickDisabled(e))
      ) {
        var i = t.type;
        "mousedown" === i && preventOutline(e), this._fireDOMEvent(t, i);
      }
    },
    _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
    _fireDOMEvent: function (t, e, i) {
      if ("click" === t.type) {
        var n = extend({}, t);
        n.type = "preclick", this._fireDOMEvent(n, n.type, i);
      }
      var o = this._findEventTargets(t, e);
      if (i) {
        for (var s = [], r = 0; r < i.length; r += 1) {
          i[r].listens(e, !0) && s.push(i[r]);
        }
        o = s.concat(o);
      }
      if (o.length) {
        "contextmenu" === e && preventDefault(t);
        var a = o[0], h = { originalEvent: t };
        if (
          "keypress" !== t.type && "keydown" !== t.type && "keyup" !== t.type
        ) {
          var l = a.getLatLng && (!a._radius || a._radius <= 10);
          h.containerPoint = l
            ? this.latLngToContainerPoint(a.getLatLng())
            : this.mouseEventToContainerPoint(t),
            h.layerPoint = this.containerPointToLayerPoint(h.containerPoint),
            h.latlng = l
              ? a.getLatLng()
              : this.layerPointToLatLng(h.layerPoint);
        }
        for (r = 0; r < o.length; r += 1) {
          if (
            o[r].fire(e, h, !0),
              h.originalEvent._stopped ||
              !1 === o[r].options.bubblingMouseEvents &&
                -1 !== indexOf(this._mouseEvents, e)
          ) return;
        }
      }
    },
    _draggableMoved: function (t) {
      return (t = t.dragging && t.dragging.enabled() ? t : this).dragging &&
          t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
    },
    _clearHandlers: function () {
      for (var t = 0, e = this._handlers.length; t < e; t += 1) {
        this._handlers[t].disable();
      }
    },
    whenReady: function (t, e) {
      return this._loaded
        ? t.call(e || this, { target: this })
        : this.on("load", t, e),
        this;
    },
    _getMapPanePos: function () {
      return getPosition(this._mapPane) || new Point(0, 0);
    },
    _moved: function () {
      var t = this._getMapPanePos();
      return t && !t.equals([0, 0]);
    },
    _getTopLeftPoint: function (t, e) {
      return (t && void 0 !== e
        ? this._getNewPixelOrigin(t, e)
        : this.getPixelOrigin()).subtract(this._getMapPanePos());
    },
    _getNewPixelOrigin: function (t, e) {
      var i = this.getSize()._divideBy(2);
      return this.project(t, e)._subtract(i)._add(this._getMapPanePos())
        ._round();
    },
    _latLngToNewLayerPoint: function (t, e, i) {
      var n = this._getNewPixelOrigin(i, e);
      return this.project(t, e)._subtract(n);
    },
    _latLngBoundsToNewLayerBounds: function (t, e, i) {
      var n = this._getNewPixelOrigin(i, e);
      return toBounds([
        this.project(t.getSouthWest(), e)._subtract(n),
        this.project(t.getNorthWest(), e)._subtract(n),
        this.project(t.getSouthEast(), e)._subtract(n),
        this.project(t.getNorthEast(), e)._subtract(n),
      ]);
    },
    _getCenterLayerPoint: function () {
      return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
    },
    _getCenterOffset: function (t) {
      return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
    },
    _limitCenter: function (t, e, i) {
      if (!i) return t;
      var n = this.project(t, e),
        o = this.getSize().divideBy(2),
        s = new Bounds(n.subtract(o), n.add(o)),
        r = this._getBoundsOffset(s, i, e);
      return 1 >= Math.abs(r.x) && 1 >= Math.abs(r.y)
        ? t
        : this.unproject(n.add(r), e);
    },
    _limitOffset: function (t, e) {
      if (!e) return t;
      var i = this.getPixelBounds(), n = new Bounds(i.min.add(t), i.max.add(t));
      return t.add(this._getBoundsOffset(n, e));
    },
    _getBoundsOffset: function (t, e, i) {
      var n = toBounds(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i),
        ),
        o = n.min.subtract(t.min),
        s = n.max.subtract(t.max),
        r = this._rebound(o.x, -s.x),
        a = this._rebound(o.y, -s.y);
      return new Point(r, a);
    },
    _rebound: function (t, e) {
      return t + e > 0
        ? Math.round(t - e) / 2
        : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
    },
    _limitZoom: function (t) {
      var e = this.getMinZoom(),
        i = this.getMaxZoom(),
        n = Browser.any3d ? this.options.zoomSnap : 1;
      return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
    },
    _onPanTransitionStep: function () {
      this.fire("move");
    },
    _onPanTransitionEnd: function () {
      removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
    },
    _tryAnimatedPan: function (t, e) {
      var i = this._getCenterOffset(t)._trunc();
      return !!(!0 === (e && e.animate) || this.getSize().contains(i)) &&
        (this.panBy(i, e), !0);
    },
    _createAnimProxy: function () {
      var t = this._proxy = create$1(
        "div",
        "leaflet-proxy leaflet-zoom-animated",
      );
      this._panes.mapPane.appendChild(t),
        this.on("zoomanim", function (t) {
          var e = TRANSFORM, i = this._proxy.style[e];
          setTransform(
            this._proxy,
            this.project(t.center, t.zoom),
            this.getZoomScale(t.zoom, 1),
          ),
            i === this._proxy.style[e] && this._animatingZoom &&
            this._onZoomTransitionEnd();
        }, this),
        this.on("load moveend", this._animMoveEnd, this),
        this._on("unload", this._destroyAnimProxy, this);
    },
    _destroyAnimProxy: function () {
      remove(this._proxy),
        this.off("load moveend", this._animMoveEnd, this),
        delete this._proxy;
    },
    _animMoveEnd: function () {
      var t = this.getCenter(), e = this.getZoom();
      setTransform(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
    },
    _catchTransitionEnd: function (t) {
      this._animatingZoom && t.propertyName.indexOf("transform") >= 0 &&
        this._onZoomTransitionEnd();
    },
    _nothingToAnimate: function () {
      return !this._container.getElementsByClassName("leaflet-zoom-animated")
        .length;
    },
    _tryAnimatedZoom: function (t, e, i) {
      if (this._animatingZoom) return !0;
      if (
        i = i || {},
          !this._zoomAnimated || !1 === i.animate || this._nothingToAnimate() ||
          Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold
      ) return !1;
      var n = this.getZoomScale(e),
        o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
      return !!(!0 === i.animate || this.getSize().contains(o)) &&
        (requestAnimFrame(function () {
          this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
        }, this),
          !0);
    },
    _animateZoom: function (t, e, i, n) {
      this._mapPane &&
        (i &&
          (this._animatingZoom = !0,
            this._animateToCenter = t,
            this._animateToZoom = e,
            addClass(this._mapPane, "leaflet-zoom-anim")),
          this.fire("zoomanim", { center: t, zoom: e, noUpdate: n }),
          this._tempFireZoomEvent ||
          (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          setTimeout(bind(this._onZoomTransitionEnd, this), 250));
    },
    _onZoomTransitionEnd: function () {
      this._animatingZoom &&
        (this._mapPane && removeClass(this._mapPane, "leaflet-zoom-anim"),
          this._animatingZoom = !1,
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          this._tempFireZoomEvent && this.fire("zoom"),
          delete this._tempFireZoomEvent,
          this.fire("move"),
          this._moveEnd(!0));
    },
  });
function createMap(t, e) {
  return new Map(t, e);
}
var Control = Class.extend({
    options: { position: "topright" },
    initialize: function (t) {
      setOptions(this, t);
    },
    getPosition: function () {
      return this.options.position;
    },
    setPosition: function (t) {
      var e = this._map;
      return e && e.removeControl(this),
        this.options.position = t,
        e && e.addControl(this),
        this;
    },
    getContainer: function () {
      return this._container;
    },
    addTo: function (t) {
      this.remove(), this._map = t;
      var e = this._container = this.onAdd(t),
        i = this.getPosition(),
        n = t._controlCorners[i];
      return addClass(e, "leaflet-control"),
        -1 !== i.indexOf("bottom")
          ? n.insertBefore(e, n.firstChild)
          : n.appendChild(e),
        this._map.on("unload", this.remove, this),
        this;
    },
    remove: function () {
      return this._map &&
        (remove(this._container),
          this.onRemove && this.onRemove(this._map),
          this._map.off("unload", this.remove, this),
          this._map = null),
        this;
    },
    _refocusOnMap: function (t) {
      this._map && t && t.screenX > 0 && t.screenY > 0 &&
        this._map.getContainer().focus();
    },
  }),
  control = function (t) {
    return new Control(t);
  };
Map.include({
  addControl: function (t) {
    return t.addTo(this), this;
  },
  removeControl: function (t) {
    return t.remove(), this;
  },
  _initControlPos: function () {
    var t = this._controlCorners = {},
      e = "leaflet-",
      i = this._controlContainer = create$1(
        "div",
        e + "control-container",
        this._container,
      );
    function n(n, o) {
      t[n + o] = create$1("div", e + n + " " + e + o, i);
    }
    n("top", "left"),
      n("top", "right"),
      n("bottom", "left"),
      n("bottom", "right");
  },
  _clearControlPos: function () {
    for (var t in this._controlCorners) remove(this._controlCorners[t]);
    remove(this._controlContainer),
      delete this._controlCorners,
      delete this._controlContainer;
  },
});
var Layers = Control.extend({
    options: {
      collapsed: !0,
      position: "topright",
      autoZIndex: !0,
      hideSingleBase: !1,
      sortLayers: !1,
      sortFunction: function (t, e, i, n) {
        return i < n ? -1 : n < i ? 1 : 0;
      },
    },
    initialize: function (t, e, i) {
      for (
        var n in setOptions(this, i),
          this._layerControlInputs = [],
          this._layers = [],
          this._lastZIndex = 0,
          this._handlingClick = !1,
          this._preventClick = !1,
          t
      ) this._addLayer(t[n], n);
      for (n in e) this._addLayer(e[n], n, !0);
    },
    onAdd: function (t) {
      this._initLayout(),
        this._update(),
        this._map = t,
        t.on("zoomend", this._checkDisabledLayers, this);
      for (var e = 0; e < this._layers.length; e += 1) {
        this._layers[e].layer.on("add remove", this._onLayerChange, this);
      }
      return this._container;
    },
    addTo: function (t) {
      return Control.prototype.addTo.call(this, t),
        this._expandIfNotCollapsed();
    },
    onRemove: function () {
      this._map.off("zoomend", this._checkDisabledLayers, this);
      for (var t = 0; t < this._layers.length; t += 1) {
        this._layers[t].layer.off("add remove", this._onLayerChange, this);
      }
    },
    addBaseLayer: function (t, e) {
      return this._addLayer(t, e), this._map ? this._update() : this;
    },
    addOverlay: function (t, e) {
      return this._addLayer(t, e, !0), this._map ? this._update() : this;
    },
    removeLayer: function (t) {
      t.off("add remove", this._onLayerChange, this);
      var e = this._getLayer(stamp(t));
      return e && this._layers.splice(this._layers.indexOf(e), 1),
        this._map ? this._update() : this;
    },
    expand: function () {
      addClass(this._container, "leaflet-control-layers-expanded"),
        this._section.style.height = null;
      var t = this._map.getSize().y - (this._container.offsetTop + 50);
      return t < this._section.clientHeight
        ? (addClass(this._section, "leaflet-control-layers-scrollbar"),
          this._section.style.height = t + "px")
        : removeClass(this._section, "leaflet-control-layers-scrollbar"),
        this._checkDisabledLayers(),
        this;
    },
    collapse: function () {
      return removeClass(this._container, "leaflet-control-layers-expanded"),
        this;
    },
    _initLayout: function () {
      var t = "leaflet-control-layers",
        e = this._container = create$1("div", t),
        i = this.options.collapsed;
      e.setAttribute("aria-haspopup", !0),
        disableClickPropagation(e),
        disableScrollPropagation(e);
      var n = this._section = create$1("section", t + "-list");
      i &&
        (this._map.on("click", this.collapse, this),
          on(
            e,
            { mouseenter: this._expandSafely, mouseleave: this.collapse },
            this,
          ));
      var o = this._layersLink = create$1("a", t + "-toggle", e);
      o.href = "#",
        o.title = "Layers",
        o.setAttribute("role", "button"),
        on(o, {
          keydown: function (t) {
            13 === t.keyCode && this._expandSafely();
          },
          click: function (t) {
            preventDefault(t), this._expandSafely();
          },
        }, this),
        i || this.expand(),
        this._baseLayersList = create$1("div", t + "-base", n),
        this._separator = create$1("div", t + "-separator", n),
        this._overlaysList = create$1("div", t + "-overlays", n),
        e.appendChild(n);
    },
    _getLayer: function (t) {
      for (var e = 0; e < this._layers.length; e += 1) {
        if (this._layers[e] && stamp(this._layers[e].layer) === t) {
          return this._layers[e];
        }
      }
    },
    _addLayer: function (t, e, i) {
      this._map && t.on("add remove", this._onLayerChange, this),
        this._layers.push({ layer: t, name: e, overlay: i }),
        this.options.sortLayers && this._layers.sort(bind(function (t, e) {
          return this.options.sortFunction(t.layer, e.layer, t.name, e.name);
        }, this)),
        this.options.autoZIndex && t.setZIndex &&
        (this._lastZIndex += 1, t.setZIndex(this._lastZIndex)),
        this._expandIfNotCollapsed();
    },
    _update: function () {
      if (!this._container) return this;
      empty(this._baseLayersList),
        empty(this._overlaysList),
        this._layerControlInputs = [];
      var t, e, i, n, o = 0;
      for (i = 0; i < this._layers.length; i += 1) {
        n = this._layers[i],
          this._addItem(n),
          e = e || n.overlay,
          t = t || !n.overlay,
          o += n.overlay ? 0 : 1;
      }
      return this.options.hideSingleBase &&
        (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"),
        this._separator.style.display = e && t ? "" : "none",
        this;
    },
    _onLayerChange: function (t) {
      this._handlingClick || this._update();
      var e = this._getLayer(stamp(t.target)),
        i = e.overlay
          ? "add" === t.type ? "overlayadd" : "overlayremove"
          : "add" === t.type
          ? "baselayerchange"
          : null;
      i && this._map.fire(i, e);
    },
    _createRadioElement: function (t, e) {
      var i = document.createElement("div");
      return i.innerHTML =
        '<input type="radio" class="leaflet-control-layers-selector" name="' +
        t + '"' + (e ? ' checked="checked"' : "") + "/>",
        i.firstChild;
    },
    _addItem: function (t) {
      var e,
        i = document.createElement("label"),
        n = this._map.hasLayer(t.layer);
      t.overlay
        ? ((e = document.createElement("input")).type = "checkbox",
          e.className = "leaflet-control-layers-selector",
          e.defaultChecked = n)
        : e = this._createRadioElement("leaflet-base-layers_" + stamp(this), n),
        this._layerControlInputs.push(e),
        e.layerId = stamp(t.layer),
        on(e, "click", this._onInputClick, this);
      var o = document.createElement("span");
      o.innerHTML = " " + t.name;
      var s = document.createElement("span");
      return i.appendChild(s),
        s.appendChild(e),
        s.appendChild(o),
        (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(i),
        this._checkDisabledLayers(),
        i;
    },
    _onInputClick: function () {
      if (!this._preventClick) {
        var t, e, i = this._layerControlInputs, n = [], o = [];
        this._handlingClick = !0;
        for (var s = i.length - 1; s >= 0; s -= 1) {
          t = i[s],
            e = this._getLayer(t.layerId).layer,
            t.checked ? n.push(e) : t.checked || o.push(e);
        }
        for (s = 0; s < o.length; s += 1) {
          this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
        }
        for (s = 0; s < n.length; s += 1) {
          this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
        }
        this._handlingClick = !1, this._refocusOnMap();
      }
    },
    _checkDisabledLayers: function () {
      for (
        var t,
          e,
          i = this._layerControlInputs,
          n = this._map.getZoom(),
          o = i.length - 1;
        o >= 0;
        o -= 1
      ) {
        t = i[o],
          e = this._getLayer(t.layerId).layer,
          t.disabled = void 0 !== e.options.minZoom && n < e.options.minZoom ||
            void 0 !== e.options.maxZoom && n > e.options.maxZoom;
      }
    },
    _expandIfNotCollapsed: function () {
      return this._map && !this.options.collapsed && this.expand(), this;
    },
    _expandSafely: function () {
      var t = this._section;
      this._preventClick = !0, on(t, "click", preventDefault), this.expand();
      var e = this;
      setTimeout(function () {
        off(t, "click", preventDefault), e._preventClick = !1;
      });
    },
  }),
  layers = function (t, e, i) {
    return new Layers(t, e, i);
  },
  Zoom = Control.extend({
    options: {
      position: "topleft",
      zoomInText: '<span aria-hidden="true">+</span>',
      zoomInTitle: "Zoom in",
      zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
      zoomOutTitle: "Zoom out",
    },
    onAdd: function (t) {
      var e = "leaflet-control-zoom",
        i = create$1("div", e + " leaflet-bar"),
        n = this.options;
      return this._zoomInButton = this._createButton(
        n.zoomInText,
        n.zoomInTitle,
        e + "-in",
        i,
        this._zoomIn,
      ),
        this._zoomOutButton = this._createButton(
          n.zoomOutText,
          n.zoomOutTitle,
          e + "-out",
          i,
          this._zoomOut,
        ),
        this._updateDisabled(),
        t.on("zoomend zoomlevelschange", this._updateDisabled, this),
        i;
    },
    onRemove: function (t) {
      t.off("zoomend zoomlevelschange", this._updateDisabled, this);
    },
    disable: function () {
      return this._disabled = !0, this._updateDisabled(), this;
    },
    enable: function () {
      return this._disabled = !1, this._updateDisabled(), this;
    },
    _zoomIn: function (t) {
      !this._disabled && this._map._zoom < this._map.getMaxZoom() &&
        this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _zoomOut: function (t) {
      !this._disabled && this._map._zoom > this._map.getMinZoom() &&
        this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _createButton: function (t, e, i, n, o) {
      var s = create$1("a", i, n);
      return s.innerHTML = t,
        s.href = "#",
        s.title = e,
        s.setAttribute("role", "button"),
        s.setAttribute("aria-label", e),
        disableClickPropagation(s),
        on(s, "click", stop),
        on(s, "click", o, this),
        on(s, "click", this._refocusOnMap, this),
        s;
    },
    _updateDisabled: function () {
      var t = this._map, e = "leaflet-disabled";
      removeClass(this._zoomInButton, e),
        removeClass(this._zoomOutButton, e),
        this._zoomInButton.setAttribute("aria-disabled", "false"),
        this._zoomOutButton.setAttribute("aria-disabled", "false"),
        (this._disabled || t._zoom === t.getMinZoom()) &&
        (addClass(this._zoomOutButton, e),
          this._zoomOutButton.setAttribute("aria-disabled", "true")),
        (this._disabled || t._zoom === t.getMaxZoom()) &&
        (addClass(this._zoomInButton, e),
          this._zoomInButton.setAttribute("aria-disabled", "true"));
    },
  });
Map.mergeOptions({ zoomControl: !0 }),
  Map.addInitHook(function () {
    this.options.zoomControl &&
      (this.zoomControl = new Zoom(), this.addControl(this.zoomControl));
  });
var zoom = function (t) {
    return new Zoom(t);
  },
  Scale = Control.extend({
    options: {
      position: "bottomleft",
      maxWidth: 100,
      metric: !0,
      imperial: !0,
    },
    onAdd: function (t) {
      var e = "leaflet-control-scale", i = create$1("div", e), n = this.options;
      return this._addScales(n, e + "-line", i),
        t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this),
        t.whenReady(this._update, this),
        i;
    },
    onRemove: function (t) {
      t.off(
        this.options.updateWhenIdle ? "moveend" : "move",
        this._update,
        this,
      );
    },
    _addScales: function (t, e, i) {
      t.metric && (this._mScale = create$1("div", e, i)),
        t.imperial && (this._iScale = create$1("div", e, i));
    },
    _update: function () {
      var t = this._map,
        e = t.getSize().y / 2,
        i = t.distance(
          t.containerPointToLatLng([0, e]),
          t.containerPointToLatLng([this.options.maxWidth, e]),
        );
      this._updateScales(i);
    },
    _updateScales: function (t) {
      this.options.metric && t && this._updateMetric(t),
        this.options.imperial && t && this._updateImperial(t);
    },
    _updateMetric: function (t) {
      var e = this._getRoundNum(t);
      this._updateScale(
        this._mScale,
        e < 1e3 ? e + " m" : e / 1e3 + " km",
        e / t,
      );
    },
    _updateImperial: function (t) {
      var e, i, n, o = 3.2808399 * t;
      o > 5280
        ? (e = o / 5280,
          i = this._getRoundNum(e),
          this._updateScale(this._iScale, i + " mi", i / e))
        : (n = this._getRoundNum(o),
          this._updateScale(this._iScale, n + " ft", n / o));
    },
    _updateScale: function (t, e, i) {
      t.style.width = Math.round(this.options.maxWidth * i) + "px",
        t.innerHTML = e;
    },
    _getRoundNum: function (t) {
      var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
      return e * (i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1);
    },
  }),
  scale = function (t) {
    return new Scale(t);
  },
  ukrainianFlag =
    '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',
  Attribution = Control.extend({
    options: {
      position: "bottomright",
      prefix:
        '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' +
        (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>",
    },
    initialize: function (t) {
      setOptions(this, t), this._attributions = {};
    },
    onAdd: function (t) {
      for (
        var e in t.attributionControl = this,
          this._container = create$1("div", "leaflet-control-attribution"),
          disableClickPropagation(this._container),
          t._layers
      ) {
        t._layers[e].getAttribution &&
          this.addAttribution(t._layers[e].getAttribution());
      }
      return this._update(),
        t.on("layeradd", this._addAttribution, this),
        this._container;
    },
    onRemove: function (t) {
      t.off("layeradd", this._addAttribution, this);
    },
    _addAttribution: function (t) {
      t.layer.getAttribution &&
        (this.addAttribution(t.layer.getAttribution()),
          t.layer.once("remove", function () {
            this.removeAttribution(t.layer.getAttribution());
          }, this));
    },
    setPrefix: function (t) {
      return this.options.prefix = t, this._update(), this;
    },
    addAttribution: function (t) {
      return t &&
        (this._attributions[t] || (this._attributions[t] = 0),
          this._attributions[t] += 1,
          this._update()),
        this;
    },
    removeAttribution: function (t) {
      return t && this._attributions[t] &&
        (this._attributions[t] -= 1, this._update()),
        this;
    },
    _update: function () {
      if (this._map) {
        var t = [];
        for (var e in this._attributions) this._attributions[e] && t.push(e);
        var i = [];
        this.options.prefix && i.push(this.options.prefix),
          t.length && i.push(t.join(", ")),
          this._container.innerHTML = i.join(
            ' <span aria-hidden="true">|</span> ',
          );
      }
    },
  });
Map.mergeOptions({ attributionControl: !0 }),
  Map.addInitHook(function () {
    this.options.attributionControl && new Attribution().addTo(this);
  });
var attribution = function (t) {
  return new Attribution(t);
};
Control.Layers = Layers,
  Control.Zoom = Zoom,
  Control.Scale = Scale,
  Control.Attribution = Attribution,
  control.layers = layers,
  control.zoom = zoom,
  control.scale = scale,
  control.attribution = attribution;
var Handler = Class.extend({
  initialize: function (t) {
    this._map = t;
  },
  enable: function () {
    return this._enabled || (this._enabled = !0, this.addHooks()), this;
  },
  disable: function () {
    return this._enabled && (this._enabled = !1, this.removeHooks()), this;
  },
  enabled: function () {
    return !!this._enabled;
  },
});
Handler.addTo = function (t, e) {
  return t.addHandler(e, this), this;
};
var Mixin = { Events: Events },
  START = Browser.touch ? "touchstart mousedown" : "mousedown",
  Draggable = Evented.extend({
    options: { clickTolerance: 3 },
    initialize: function (t, e, i, n) {
      setOptions(this, n),
        this._element = t,
        this._dragStartTarget = e || t,
        this._preventOutline = i;
    },
    enable: function () {
      this._enabled ||
        (on(this._dragStartTarget, START, this._onDown, this),
          this._enabled = !0);
    },
    disable: function () {
      this._enabled &&
        (Draggable._dragging === this && this.finishDrag(!0),
          off(this._dragStartTarget, START, this._onDown, this),
          this._enabled = !1,
          this._moved = !1);
    },
    _onDown: function (t) {
      if (
        !(!this._enabled ||
          (this._moved = !1, hasClass(this._element, "leaflet-zoom-anim")))
      ) {
        if (t.touches && 1 !== t.touches.length) {
          Draggable._dragging === this && this.finishDrag();
          return;
        }
        if (
          !Draggable._dragging && !t.shiftKey &&
          (1 === t.which || 1 === t.button || t.touches) &&
          (Draggable._dragging = this,
            this._preventOutline && preventOutline(this._element),
            disableImageDrag(),
            disableTextSelection(),
            !this._moving)
        ) {
          this.fire("down");
          var e = t.touches ? t.touches[0] : t,
            i = getSizedParentNode(this._element);
          this._startPoint = new Point(e.clientX, e.clientY),
            this._startPos = getPosition(this._element),
            this._parentScale = getScale(i);
          var n = "mousedown" === t.type;
          on(document, n ? "mousemove" : "touchmove", this._onMove, this),
            on(
              document,
              n ? "mouseup" : "touchend touchcancel",
              this._onUp,
              this,
            );
        }
      }
    },
    _onMove: function (t) {
      if (this._enabled) {
        if (t.touches && t.touches.length > 1) {
          this._moved = !0;
          return;
        }
        var e = t.touches && 1 === t.touches.length ? t.touches[0] : t,
          i = new Point(e.clientX, e.clientY)._subtract(this._startPoint);
        if (i.x || i.y) {
          if (Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance) {
            return;
          }
          i.x /= this._parentScale.x,
            i.y /= this._parentScale.y,
            preventDefault(t),
            this._moved ||
            (this.fire("dragstart"),
              this._moved = !0,
              addClass(document.body, "leaflet-dragging"),
              this._lastTarget = t.target || t.srcElement,
              window.SVGElementInstance &&
              this._lastTarget instanceof window.SVGElementInstance &&
              (this._lastTarget = this._lastTarget.correspondingUseElement),
              addClass(this._lastTarget, "leaflet-drag-target")),
            this._newPos = this._startPos.add(i),
            this._moving = !0,
            this._lastEvent = t,
            this._updatePosition();
        }
      }
    },
    _updatePosition: function () {
      var t = { originalEvent: this._lastEvent };
      this.fire("predrag", t),
        setPosition(this._element, this._newPos),
        this.fire("drag", t);
    },
    _onUp: function () {
      this._enabled && this.finishDrag();
    },
    finishDrag: function (t) {
      removeClass(document.body, "leaflet-dragging"),
        this._lastTarget &&
        (removeClass(this._lastTarget, "leaflet-drag-target"),
          this._lastTarget = null),
        off(document, "mousemove touchmove", this._onMove, this),
        off(document, "mouseup touchend touchcancel", this._onUp, this),
        enableImageDrag(),
        enableTextSelection();
      var e = this._moved && this._moving;
      this._moving = !1,
        Draggable._dragging = !1,
        e &&
        this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos),
        });
    },
  });
function clipPolygon(t, e, i) {
  var n, o, s, r, a, h, l, u, c, d = [1, 4, 2, 8];
  for (o = 0, l = t.length; o < l; o += 1) t[o]._code = _getBitCode(t[o], e);
  for (r = 0; r < 4; r += 1) {
    for (o = 0, u = d[r], n = [], s = (l = t.length) - 1; o < l; s = o++) {
      a = t[o],
        h = t[s],
        a._code & u
          ? h._code & u ||
            ((c = _getEdgeIntersection(h, a, u, e, i))._code = _getBitCode(
              c,
              e,
            ),
              n.push(c))
          : (h._code & u &&
            ((c = _getEdgeIntersection(h, a, u, e, i))._code = _getBitCode(
              c,
              e,
            ),
              n.push(c)),
            n.push(a));
    }
    t = n;
  }
  return t;
}
function polygonCenter(t, e) {
  if (!t || 0 === t.length) throw Error("latlngs not passed");
  isFlat(t) ||
    (console.warn("latlngs are not flat! Only the first ring will be used"),
      t = t[0]);
  var i, n, o, s, r, a, h, l, u, c = toLatLng([0, 0]), d = toLatLngBounds(t);
  d.getNorthWest().distanceTo(d.getSouthWest()) *
          d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 &&
    (c = centroid(t));
  var p = t.length, m = [];
  for (i = 0; i < p; i += 1) {
    var f = toLatLng(t[i]);
    m.push(e.project(toLatLng([f.lat - c.lat, f.lng - c.lng])));
  }
  for (i = 0, a = h = l = 0, n = p - 1; i < p; n = i++) {
    o = m[i],
      s = m[n],
      r = o.y * s.x - s.y * o.x,
      h += (o.x + s.x) * r,
      l += (o.y + s.y) * r,
      a += 3 * r;
  }
  u = 0 === a ? m[0] : [h / a, l / a];
  var g = e.unproject(toPoint(u));
  return toLatLng([g.lat + c.lat, g.lng + c.lng]);
}
function centroid(t) {
  for (var e = 0, i = 0, n = 0, o = 0; o < t.length; o += 1) {
    var s = toLatLng(t[o]);
    e += s.lat, i += s.lng, n += 1;
  }
  return toLatLng([e / n, i / n]);
}
var PolyUtil = {
  __proto__: null,
  clipPolygon: clipPolygon,
  polygonCenter: polygonCenter,
  centroid: centroid,
};
function simplify(t, e) {
  if (!e || !t.length) return t.slice();
  var i = e * e;
  return t = _simplifyDP(t = _reducePoints(t, i), i);
}
function pointToSegmentDistance(t, e, i) {
  return Math.sqrt(_sqClosestPointOnSegment(t, e, i, !0));
}
function closestPointOnSegment(t, e, i) {
  return _sqClosestPointOnSegment(t, e, i);
}
function _simplifyDP(t, e) {
  var i = t.length,
    n = new ("undefined" != typeof Uint8Array ? Uint8Array : Array)(i);
  n[0] = n[i - 1] = 1, _simplifyDPStep(t, n, e, 0, i - 1);
  var o, s = [];
  for (o = 0; o < i; o += 1) n[o] && s.push(t[o]);
  return s;
}
function _simplifyDPStep(t, e, i, n, o) {
  var s, r, a, h = 0;
  for (r = n + 1; r <= o - 1; r += 1) {
    (a = _sqClosestPointOnSegment(t[r], t[n], t[o], !0)) > h && (s = r, h = a);
  }
  h > i &&
    (e[s] = 1, _simplifyDPStep(t, e, i, n, s), _simplifyDPStep(t, e, i, s, o));
}
function _reducePoints(t, e) {
  for (var i = [t[0]], n = 1, o = 0, s = t.length; n < s; n += 1) {
    _sqDist(t[n], t[o]) > e && (i.push(t[n]), o = n);
  }
  return o < s - 1 && i.push(t[s - 1]), i;
}
function clipSegment(t, e, i, n, o) {
  var s, r, a, h = n ? _lastCode : _getBitCode(t, i), l = _getBitCode(e, i);
  for (_lastCode = l;;) {
    if (!(h | l)) return [t, e];
    if (h & l) return !1;
    s = h || l,
      r = _getEdgeIntersection(t, e, s, i, o),
      a = _getBitCode(r, i),
      s === h ? (t = r, h = a) : (e = r, l = a);
  }
}
function _getEdgeIntersection(t, e, i, n, o) {
  var s, r, a = e.x - t.x, h = e.y - t.y, l = n.min, u = n.max;
  return 8 & i
    ? (s = t.x + a * (u.y - t.y) / h, r = u.y)
    : 4 & i
    ? (s = t.x + a * (l.y - t.y) / h, r = l.y)
    : 2 & i
    ? (s = u.x, r = t.y + h * (u.x - t.x) / a)
    : 1 & i && (s = l.x, r = t.y + h * (l.x - t.x) / a),
    new Point(s, r, o);
}
function _getBitCode(t, e) {
  var i = 0;
  return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2),
    t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8),
    i;
}
function _sqDist(t, e) {
  var i = e.x - t.x, n = e.y - t.y;
  return i * i + n * n;
}
function _sqClosestPointOnSegment(t, e, i, n) {
  var o, s = e.x, r = e.y, a = i.x - s, h = i.y - r, l = a * a + h * h;
  return l > 0 &&
    ((o = ((t.x - s) * a + (t.y - r) * h) / l) > 1
      ? (s = i.x, r = i.y)
      : o > 0 && (s += a * o, r += h * o)),
    a = t.x - s,
    h = t.y - r,
    n ? a * a + h * h : new Point(s, r);
}
function isFlat(t) {
  return !isArray(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0];
}
function _flat(t) {
  return console.warn(
    "Deprecated use of _flat, please use L.LineUtil.isFlat instead.",
  ),
    isFlat(t);
}
function polylineCenter(t, e) {
  if (!t || 0 === t.length) throw Error("latlngs not passed");
  isFlat(t) ||
    (console.warn("latlngs are not flat! Only the first ring will be used"),
      t = t[0]);
  var i, n, o, s, r, a, h, l, u = toLatLng([0, 0]), c = toLatLngBounds(t);
  c.getNorthWest().distanceTo(c.getSouthWest()) *
          c.getNorthEast().distanceTo(c.getNorthWest()) < 1700 &&
    (u = centroid(t));
  var d = t.length, p = [];
  for (i = 0; i < d; i += 1) {
    var m = toLatLng(t[i]);
    p.push(e.project(toLatLng([m.lat - u.lat, m.lng - u.lng])));
  }
  for (i = 0, n = 0; i < d - 1; i += 1) n += p[i].distanceTo(p[i + 1]) / 2;
  if (0 === n) l = p[0];
  else {for (i = 0, s = 0; i < d - 1; i += 1) {
      if (r = p[i], a = p[i + 1], (s += o = r.distanceTo(a)) > n) {
        h = (s - n) / o, l = [a.x - h * (a.x - r.x), a.y - h * (a.y - r.y)];
        break;
      }
    }}
  var f = e.unproject(toPoint(l));
  return toLatLng([f.lat + u.lat, f.lng + u.lng]);
}
var LineUtil = {
    __proto__: null,
    simplify: simplify,
    pointToSegmentDistance: pointToSegmentDistance,
    closestPointOnSegment: closestPointOnSegment,
    clipSegment: clipSegment,
    _getEdgeIntersection: _getEdgeIntersection,
    _getBitCode: _getBitCode,
    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
    isFlat: isFlat,
    _flat: _flat,
    polylineCenter: polylineCenter,
  },
  LonLat = {
    project: function (t) {
      return new Point(t.lng, t.lat);
    },
    unproject: function (t) {
      return new LatLng(t.y, t.x);
    },
    bounds: new Bounds([-180, -90], [180, 90]),
  },
  Mercator = {
    R: 6378137,
    R_MINOR: 6356752.314245179,
    bounds: new Bounds([-20037508.34279, -15496570.73972], [
      20037508.34279,
      18764656.23138,
    ]),
    project: function (t) {
      var e = Math.PI / 180,
        i = this.R,
        n = t.lat * e,
        o = this.R_MINOR / i,
        s = Math.sqrt(1 - o * o),
        r = s * Math.sin(n);
      return n = -i *
        Math.log(
          Math.max(
            Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2),
            1e-10,
          ),
        ),
        new Point(t.lng * e * i, n);
    },
    unproject: function (t) {
      for (
        var e,
          i = 180 / Math.PI,
          n = this.R,
          o = this.R_MINOR / n,
          s = Math.sqrt(1 - o * o),
          r = Math.exp(-t.y / n),
          a = Math.PI / 2 - 2 * Math.atan(r),
          h = 0,
          l = .1;
        h < 15 && Math.abs(l) > 1e-7;
        h += 1
      ) {
        e = Math.pow((1 - (e = s * Math.sin(a))) / (1 + e), s / 2),
          l = Math.PI / 2 - 2 * Math.atan(r * e) - a,
          a += l;
      }
      return new LatLng(a * i, t.x * i / n);
    },
  },
  index = {
    __proto__: null,
    LonLat: LonLat,
    Mercator: Mercator,
    SphericalMercator: SphericalMercator,
  },
  EPSG3395 = extend({}, Earth, {
    code: "EPSG:3395",
    projection: Mercator,
    transformation: function () {
      var t = .5 / (Math.PI * Mercator.R);
      return toTransformation(t, .5, -t, .5);
    }(),
  }),
  EPSG4326 = extend({}, Earth, {
    code: "EPSG:4326",
    projection: LonLat,
    transformation: toTransformation(1 / 180, 1, -1 / 180, .5),
  }),
  Simple = extend({}, CRS, {
    projection: LonLat,
    transformation: toTransformation(1, 0, -1, 0),
    scale: function (t) {
      return Math.pow(2, t);
    },
    zoom: function (t) {
      return Math.log(t) / Math.LN2;
    },
    distance: function (t, e) {
      var i = e.lng - t.lng, n = e.lat - t.lat;
      return Math.sqrt(i * i + n * n);
    },
    infinite: !0,
  });
CRS.Earth = Earth,
  CRS.EPSG3395 = EPSG3395,
  CRS.EPSG3857 = EPSG3857,
  CRS.EPSG900913 = EPSG900913,
  CRS.EPSG4326 = EPSG4326,
  CRS.Simple = Simple;
var Layer = Evented.extend({
  options: { pane: "overlayPane", attribution: null, bubblingMouseEvents: !0 },
  addTo: function (t) {
    return t.addLayer(this), this;
  },
  remove: function () {
    return this.removeFrom(this._map || this._mapToAdd);
  },
  removeFrom: function (t) {
    return t && t.removeLayer(this), this;
  },
  getPane: function (t) {
    return this._map.getPane(t ? this.options[t] || t : this.options.pane);
  },
  addInteractiveTarget: function (t) {
    return this._map._targets[stamp(t)] = this, this;
  },
  removeInteractiveTarget: function (t) {
    return delete this._map._targets[stamp(t)], this;
  },
  getAttribution: function () {
    return this.options.attribution;
  },
  _layerAdd: function (t) {
    var e = t.target;
    if (e.hasLayer(this)) {
      if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
        var i = this.getEvents();
        e.on(i, this),
          this.once("remove", function () {
            e.off(i, this);
          }, this);
      }
      this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
    }
  },
});
Map.include({
  addLayer: function (t) {
    if (!t._layerAdd) throw Error("The provided object is not a Layer.");
    var e = stamp(t);
    return this._layers[e] ||
      (this._layers[e] = t,
        t._mapToAdd = this,
        t.beforeAdd && t.beforeAdd(this),
        this.whenReady(t._layerAdd, t)),
      this;
  },
  removeLayer: function (t) {
    var e = stamp(t);
    return this._layers[e] &&
      (this._loaded && t.onRemove(this),
        delete this._layers[e],
        this._loaded &&
        (this.fire("layerremove", { layer: t }), t.fire("remove")),
        t._map = t._mapToAdd = null),
      this;
  },
  hasLayer: function (t) {
    return stamp(t) in this._layers;
  },
  eachLayer: function (t, e) {
    for (var i in this._layers) t.call(e, this._layers[i]);
    return this;
  },
  _addLayers: function (t) {
    t = t ? isArray(t) ? t : [t] : [];
    for (var e = 0, i = t.length; e < i; e += 1) this.addLayer(t[e]);
  },
  _addZoomLimit: function (t) {
    isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) ||
      (this._zoomBoundLayers[stamp(t)] = t, this._updateZoomLevels());
  },
  _removeZoomLimit: function (t) {
    var e = stamp(t);
    this._zoomBoundLayers[e] &&
      (delete this._zoomBoundLayers[e], this._updateZoomLevels());
  },
  _updateZoomLevels: function () {
    var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
    for (var n in this._zoomBoundLayers) {
      var o = this._zoomBoundLayers[n].options;
      t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom),
        e = void 0 === o.maxZoom ? e : Math.max(e, o.maxZoom);
    }
    this._layersMaxZoom = e === -1 / 0 ? void 0 : e,
      this._layersMinZoom = t === 1 / 0 ? void 0 : t,
      i !== this._getZoomSpan() && this.fire("zoomlevelschange"),
      void 0 === this.options.maxZoom && this._layersMaxZoom &&
      this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
      void 0 === this.options.minZoom && this._layersMinZoom &&
      this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
  },
});
var LayerGroup = Layer.extend({
    initialize: function (t, e) {
      var i, n;
      if (setOptions(this, e), this._layers = {}, t) {
        for (i = 0, n = t.length; i < n; i += 1) {
          this.addLayer(t[i]);
        }
      }
    },
    addLayer: function (t) {
      var e = this.getLayerId(t);
      return this._layers[e] = t, this._map && this._map.addLayer(t), this;
    },
    removeLayer: function (t) {
      var e = t in this._layers ? t : this.getLayerId(t);
      return this._map && this._layers[e] &&
        this._map.removeLayer(this._layers[e]),
        delete this._layers[e],
        this;
    },
    hasLayer: function (t) {
      return ("number" == typeof t ? t : this.getLayerId(t)) in this._layers;
    },
    clearLayers: function () {
      return this.eachLayer(this.removeLayer, this);
    },
    invoke: function (t) {
      var e, i, n = Array.prototype.slice.call(arguments, 1);
      for (e in this._layers) (i = this._layers[e])[t] && i[t].apply(i, n);
      return this;
    },
    onAdd: function (t) {
      this.eachLayer(t.addLayer, t);
    },
    onRemove: function (t) {
      this.eachLayer(t.removeLayer, t);
    },
    eachLayer: function (t, e) {
      for (var i in this._layers) t.call(e, this._layers[i]);
      return this;
    },
    getLayer: function (t) {
      return this._layers[t];
    },
    getLayers: function () {
      var t = [];
      return this.eachLayer(t.push, t), t;
    },
    setZIndex: function (t) {
      return this.invoke("setZIndex", t);
    },
    getLayerId: function (t) {
      return stamp(t);
    },
  }),
  layerGroup = function (t, e) {
    return new LayerGroup(t, e);
  },
  FeatureGroup = LayerGroup.extend({
    addLayer: function (t) {
      return this.hasLayer(t)
        ? this
        : (t.addEventParent(this),
          LayerGroup.prototype.addLayer.call(this, t),
          this.fire("layeradd", { layer: t }));
    },
    removeLayer: function (t) {
      return this.hasLayer(t)
        ? (t in this._layers && (t = this._layers[t]),
          t.removeEventParent(this),
          LayerGroup.prototype.removeLayer.call(this, t),
          this.fire("layerremove", { layer: t }))
        : this;
    },
    setStyle: function (t) {
      return this.invoke("setStyle", t);
    },
    bringToFront: function () {
      return this.invoke("bringToFront");
    },
    bringToBack: function () {
      return this.invoke("bringToBack");
    },
    getBounds: function () {
      var t = new LatLngBounds();
      for (var e in this._layers) {
        var i = this._layers[e];
        t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
      }
      return t;
    },
  }),
  featureGroup = function (t, e) {
    return new FeatureGroup(t, e);
  },
  Icon = Class.extend({
    options: { popupAnchor: [0, 0], tooltipAnchor: [0, 0], crossOrigin: !1 },
    initialize: function (t) {
      setOptions(this, t);
    },
    createIcon: function (t) {
      return this._createIcon("icon", t);
    },
    createShadow: function (t) {
      return this._createIcon("shadow", t);
    },
    _createIcon: function (t, e) {
      var i = this._getIconUrl(t);
      if (!i) {
        if ("icon" === t) {
          throw Error("iconUrl not set in Icon options (see the docs).");
        }
        return null;
      }
      var n = this._createImg(i, e && "IMG" === e.tagName ? e : null);
      return this._setIconStyles(n, t),
        (this.options.crossOrigin || "" === this.options.crossOrigin) &&
        (n.crossOrigin = !0 === this.options.crossOrigin
          ? ""
          : this.options.crossOrigin),
        n;
    },
    _setIconStyles: function (t, e) {
      var i = this.options, n = i[e + "Size"];
      "number" == typeof n && (n = [n, n]);
      var o = toPoint(n),
        s = toPoint(
          "shadow" === e && i.shadowAnchor || i.iconAnchor ||
            o && o.divideBy(2, !0),
        );
      t.className = "leaflet-marker-" + e + " " + (i.className || ""),
        s &&
        (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"),
        o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
    },
    _createImg: function (t, e) {
      return (e = e || document.createElement("img")).src = t, e;
    },
    _getIconUrl: function (t) {
      return Browser.retina && this.options[t + "RetinaUrl"] ||
        this.options[t + "Url"];
    },
  });
function icon(t) {
  return new Icon(t);
}
var IconDefault = Icon.extend({
    options: {
      iconUrl: "marker-icon.png",
      iconRetinaUrl: "marker-icon-2x.png",
      shadowUrl: "marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    },
    _getIconUrl: function (t) {
      return "string" != typeof IconDefault.imagePath &&
        (IconDefault.imagePath = this._detectIconPath()),
        (this.options.imagePath || IconDefault.imagePath) +
        Icon.prototype._getIconUrl.call(this, t);
    },
    _stripUrl: function (t) {
      var e = function (t, e, i) {
        var n = e.exec(t);
        return n && n[i];
      };
      return (t = e(t, /^url\((['"])?(.+)\1\)$/, 2)) &&
        e(t, /^(.*)marker-icon\.png$/, 1);
    },
    _detectIconPath: function () {
      var t = create$1("div", "leaflet-default-icon-path", document.body),
        e = getStyle(t, "background-image") || getStyle(t, "backgroundImage");
      if (document.body.removeChild(t), e = this._stripUrl(e)) return e;
      var i = document.querySelector('link[href$="leaflet.css"]');
      return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
    },
  }),
  MarkerDrag = Handler.extend({
    initialize: function (t) {
      this._marker = t;
    },
    addHooks: function () {
      var t = this._marker._icon;
      this._draggable || (this._draggable = new Draggable(t, t, !0)),
        this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd,
        }, this).enable(),
        addClass(t, "leaflet-marker-draggable");
    },
    removeHooks: function () {
      this._draggable.off({
        dragstart: this._onDragStart,
        predrag: this._onPreDrag,
        drag: this._onDrag,
        dragend: this._onDragEnd,
      }, this).disable(),
        this._marker._icon &&
        removeClass(this._marker._icon, "leaflet-marker-draggable");
    },
    moved: function () {
      return this._draggable && this._draggable._moved;
    },
    _adjustPan: function (t) {
      var e = this._marker,
        i = e._map,
        n = this._marker.options.autoPanSpeed,
        o = this._marker.options.autoPanPadding,
        s = getPosition(e._icon),
        r = i.getPixelBounds(),
        a = i.getPixelOrigin(),
        h = toBounds(r.min._subtract(a).add(o), r.max._subtract(a).subtract(o));
      if (!h.contains(s)) {
        var l = toPoint(
          (Math.max(h.max.x, s.x) - h.max.x) / (r.max.x - h.max.x) -
            (Math.min(h.min.x, s.x) - h.min.x) / (r.min.x - h.min.x),
          (Math.max(h.max.y, s.y) - h.max.y) / (r.max.y - h.max.y) -
            (Math.min(h.min.y, s.y) - h.min.y) / (r.min.y - h.min.y),
        ).multiplyBy(n);
        i.panBy(l, { animate: !1 }),
          this._draggable._newPos._add(l),
          this._draggable._startPos._add(l),
          setPosition(e._icon, this._draggable._newPos),
          this._onDrag(t),
          this._panRequest = requestAnimFrame(this._adjustPan.bind(this, t));
      }
    },
    _onDragStart: function () {
      this._oldLatLng = this._marker.getLatLng(),
        this._marker.closePopup && this._marker.closePopup(),
        this._marker.fire("movestart").fire("dragstart");
    },
    _onPreDrag: function (t) {
      this._marker.options.autoPan &&
        (cancelAnimFrame(this._panRequest),
          this._panRequest = requestAnimFrame(this._adjustPan.bind(this, t)));
    },
    _onDrag: function (t) {
      var e = this._marker,
        i = e._shadow,
        n = getPosition(e._icon),
        o = e._map.layerPointToLatLng(n);
      i && setPosition(i, n),
        e._latlng = o,
        t.latlng = o,
        t.oldLatLng = this._oldLatLng,
        e.fire("move", t).fire("drag", t);
    },
    _onDragEnd: function (t) {
      cancelAnimFrame(this._panRequest),
        delete this._oldLatLng,
        this._marker.fire("moveend").fire("dragend", t);
    },
  }),
  Marker = Layer.extend({
    options: {
      icon: new IconDefault(),
      interactive: !0,
      keyboard: !0,
      title: "",
      alt: "Marker",
      zIndexOffset: 0,
      opacity: 1,
      riseOnHover: !1,
      riseOffset: 250,
      pane: "markerPane",
      shadowPane: "shadowPane",
      bubblingMouseEvents: !1,
      autoPanOnFocus: !0,
      draggable: !1,
      autoPan: !1,
      autoPanPadding: [50, 50],
      autoPanSpeed: 10,
    },
    initialize: function (t, e) {
      setOptions(this, e), this._latlng = toLatLng(t);
    },
    onAdd: function (t) {
      this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation,
        this._zoomAnimated && t.on("zoomanim", this._animateZoom, this),
        this._initIcon(),
        this.update();
    },
    onRemove: function (t) {
      this.dragging && this.dragging.enabled() &&
      (this.options.draggable = !0, this.dragging.removeHooks()),
        delete this.dragging,
        this._zoomAnimated && t.off("zoomanim", this._animateZoom, this),
        this._removeIcon(),
        this._removeShadow();
    },
    getEvents: function () {
      return { zoom: this.update, viewreset: this.update };
    },
    getLatLng: function () {
      return this._latlng;
    },
    setLatLng: function (t) {
      var e = this._latlng;
      return this._latlng = toLatLng(t),
        this.update(),
        this.fire("move", { oldLatLng: e, latlng: this._latlng });
    },
    setZIndexOffset: function (t) {
      return this.options.zIndexOffset = t, this.update();
    },
    getIcon: function () {
      return this.options.icon;
    },
    setIcon: function (t) {
      return this.options.icon = t,
        this._map && (this._initIcon(), this.update()),
        this._popup && this.bindPopup(this._popup, this._popup.options),
        this;
    },
    getElement: function () {
      return this._icon;
    },
    update: function () {
      if (this._icon && this._map) {
        var t = this._map.latLngToLayerPoint(this._latlng).round();
        this._setPos(t);
      }
      return this;
    },
    _initIcon: function () {
      var t = this.options,
        e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
        i = t.icon.createIcon(this._icon),
        n = !1;
      i !== this._icon &&
      (this._icon && this._removeIcon(),
        n = !0,
        t.title && (i.title = t.title),
        "IMG" === i.tagName && (i.alt = t.alt || "")),
        addClass(i, e),
        t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")),
        this._icon = i,
        t.riseOnHover &&
        this.on({ mouseover: this._bringToFront, mouseout: this._resetZIndex }),
        this.options.autoPanOnFocus && on(i, "focus", this._panOnFocus, this);
      var o = t.icon.createShadow(this._shadow), s = !1;
      o !== this._shadow && (this._removeShadow(), s = !0),
        o && (addClass(o, e), o.alt = ""),
        this._shadow = o,
        t.opacity < 1 && this._updateOpacity(),
        n && this.getPane().appendChild(this._icon),
        this._initInteraction(),
        o && s && this.getPane(t.shadowPane).appendChild(this._shadow);
    },
    _removeIcon: function () {
      this.options.riseOnHover &&
      this.off({ mouseover: this._bringToFront, mouseout: this._resetZIndex }),
        this.options.autoPanOnFocus &&
        off(this._icon, "focus", this._panOnFocus, this),
        remove(this._icon),
        this.removeInteractiveTarget(this._icon),
        this._icon = null;
    },
    _removeShadow: function () {
      this._shadow && remove(this._shadow), this._shadow = null;
    },
    _setPos: function (t) {
      this._icon && setPosition(this._icon, t),
        this._shadow && setPosition(this._shadow, t),
        this._zIndex = t.y + this.options.zIndexOffset,
        this._resetZIndex();
    },
    _updateZIndex: function (t) {
      this._icon && (this._icon.style.zIndex = this._zIndex + t);
    },
    _animateZoom: function (t) {
      var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
        .round();
      this._setPos(e);
    },
    _initInteraction: function () {
      if (
        this.options.interactive &&
        (addClass(this._icon, "leaflet-interactive"),
          this.addInteractiveTarget(this._icon),
          MarkerDrag)
      ) {
        var t = this.options.draggable;
        this.dragging && (t = this.dragging.enabled(), this.dragging.disable()),
          this.dragging = new MarkerDrag(this),
          t && this.dragging.enable();
      }
    },
    setOpacity: function (t) {
      return this.options.opacity = t, this._map && this._updateOpacity(), this;
    },
    _updateOpacity: function () {
      var t = this.options.opacity;
      this._icon && setOpacity(this._icon, t),
        this._shadow && setOpacity(this._shadow, t);
    },
    _bringToFront: function () {
      this._updateZIndex(this.options.riseOffset);
    },
    _resetZIndex: function () {
      this._updateZIndex(0);
    },
    _panOnFocus: function () {
      var t = this._map;
      if (t) {
        var e = this.options.icon.options,
          i = e.iconSize ? toPoint(e.iconSize) : toPoint(0, 0),
          n = e.iconAnchor ? toPoint(e.iconAnchor) : toPoint(0, 0);
        t.panInside(this._latlng, {
          paddingTopLeft: n,
          paddingBottomRight: i.subtract(n),
        });
      }
    },
    _getPopupAnchor: function () {
      return this.options.icon.options.popupAnchor;
    },
    _getTooltipAnchor: function () {
      return this.options.icon.options.tooltipAnchor;
    },
  });
function marker(t, e) {
  return new Marker(t, e);
}
var Path = Layer.extend({
    options: {
      stroke: !0,
      color: "#3388ff",
      weight: 3,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
      dashArray: null,
      dashOffset: null,
      fill: !1,
      fillColor: null,
      fillOpacity: .2,
      fillRule: "evenodd",
      interactive: !0,
      bubblingMouseEvents: !0,
    },
    beforeAdd: function (t) {
      this._renderer = t.getRenderer(this);
    },
    onAdd: function () {
      this._renderer._initPath(this),
        this._reset(),
        this._renderer._addPath(this);
    },
    onRemove: function () {
      this._renderer._removePath(this);
    },
    redraw: function () {
      return this._map && this._renderer._updatePath(this), this;
    },
    setStyle: function (t) {
      return setOptions(this, t),
        this._renderer &&
        (this._renderer._updateStyle(this),
          this.options.stroke && t &&
          Object.prototype.hasOwnProperty.call(t, "weight") &&
          this._updateBounds()),
        this;
    },
    bringToFront: function () {
      return this._renderer && this._renderer._bringToFront(this), this;
    },
    bringToBack: function () {
      return this._renderer && this._renderer._bringToBack(this), this;
    },
    getElement: function () {
      return this._path;
    },
    _reset: function () {
      this._project(), this._update();
    },
    _clickTolerance: function () {
      return (this.options.stroke ? this.options.weight / 2 : 0) +
        (this._renderer.options.tolerance || 0);
    },
  }),
  CircleMarker = Path.extend({
    options: { fill: !0, radius: 10 },
    initialize: function (t, e) {
      setOptions(this, e),
        this._latlng = toLatLng(t),
        this._radius = this.options.radius;
    },
    setLatLng: function (t) {
      var e = this._latlng;
      return this._latlng = toLatLng(t),
        this.redraw(),
        this.fire("move", { oldLatLng: e, latlng: this._latlng });
    },
    getLatLng: function () {
      return this._latlng;
    },
    setRadius: function (t) {
      return this.options.radius = this._radius = t, this.redraw();
    },
    getRadius: function () {
      return this._radius;
    },
    setStyle: function (t) {
      var e = t && t.radius || this._radius;
      return Path.prototype.setStyle.call(this, t), this.setRadius(e), this;
    },
    _project: function () {
      this._point = this._map.latLngToLayerPoint(this._latlng),
        this._updateBounds();
    },
    _updateBounds: function () {
      var t = this._radius,
        e = this._radiusY || t,
        i = this._clickTolerance(),
        n = [t + i, e + i];
      this._pxBounds = new Bounds(this._point.subtract(n), this._point.add(n));
    },
    _update: function () {
      this._map && this._updatePath();
    },
    _updatePath: function () {
      this._renderer._updateCircle(this);
    },
    _empty: function () {
      return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
    },
    _containsPoint: function (t) {
      return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
    },
  });
function circleMarker(t, e) {
  return new CircleMarker(t, e);
}
var Circle = CircleMarker.extend({
  initialize: function (t, e, i) {
    if (
      "number" == typeof e && (e = extend({}, i, { radius: e })),
        setOptions(this, e),
        this._latlng = toLatLng(t),
        isNaN(this.options.radius)
    ) throw Error("Circle radius cannot be NaN");
    this._mRadius = this.options.radius;
  },
  setRadius: function (t) {
    return this._mRadius = t, this.redraw();
  },
  getRadius: function () {
    return this._mRadius;
  },
  getBounds: function () {
    var t = [this._radius, this._radiusY || this._radius];
    return new LatLngBounds(
      this._map.layerPointToLatLng(this._point.subtract(t)),
      this._map.layerPointToLatLng(this._point.add(t)),
    );
  },
  setStyle: Path.prototype.setStyle,
  _project: function () {
    var t = this._latlng.lng,
      e = this._latlng.lat,
      i = this._map,
      n = i.options.crs;
    if (n.distance === Earth.distance) {
      var o = Math.PI / 180,
        s = this._mRadius / Earth.R / o,
        r = i.project([e + s, t]),
        a = i.project([e - s, t]),
        h = r.add(a).divideBy(2),
        l = i.unproject(h).lat,
        u = Math.acos(
          (Math.cos(s * o) - Math.sin(e * o) * Math.sin(l * o)) /
            (Math.cos(e * o) * Math.cos(l * o)),
        ) / o;
      (isNaN(u) || 0 === u) && (u = s / Math.cos(Math.PI / 180 * e)),
        this._point = h.subtract(i.getPixelOrigin()),
        this._radius = isNaN(u) ? 0 : h.x - i.project([l, t - u]).x,
        this._radiusY = h.y - r.y;
    } else {
      var c = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
      this._point = i.latLngToLayerPoint(this._latlng),
        this._radius = this._point.x - i.latLngToLayerPoint(c).x;
    }
    this._updateBounds();
  },
});
function circle(t, e, i) {
  return new Circle(t, e, i);
}
var Polyline = Path.extend({
  options: { smoothFactor: 1, noClip: !1 },
  initialize: function (t, e) {
    setOptions(this, e), this._setLatLngs(t);
  },
  getLatLngs: function () {
    return this._latlngs;
  },
  setLatLngs: function (t) {
    return this._setLatLngs(t), this.redraw();
  },
  isEmpty: function () {
    return !this._latlngs.length;
  },
  closestLayerPoint: function (t) {
    for (
      var e,
        i,
        n = 1 / 0,
        o = null,
        s = _sqClosestPointOnSegment,
        r = 0,
        a = this._parts.length;
      r < a;
      r += 1
    ) {
      for (var h = this._parts[r], l = 1, u = h.length; l < u; l += 1) {
        var c = s(t, e = h[l - 1], i = h[l], !0);
        c < n && (n = c, o = s(t, e, i));
      }
    }
    return o && (o.distance = Math.sqrt(n)), o;
  },
  getCenter: function () {
    if (!this._map) {
      throw Error("Must add layer to map before using getCenter()");
    }
    return polylineCenter(this._defaultShape(), this._map.options.crs);
  },
  getBounds: function () {
    return this._bounds;
  },
  addLatLng: function (t, e) {
    return e = e || this._defaultShape(),
      t = toLatLng(t),
      e.push(t),
      this._bounds.extend(t),
      this.redraw();
  },
  _setLatLngs: function (t) {
    this._bounds = new LatLngBounds(), this._latlngs = this._convertLatLngs(t);
  },
  _defaultShape: function () {
    return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
  },
  _convertLatLngs: function (t) {
    for (var e = [], i = isFlat(t), n = 0, o = t.length; n < o; n += 1) {
      i
        ? (e[n] = toLatLng(t[n]), this._bounds.extend(e[n]))
        : e[n] = this._convertLatLngs(t[n]);
    }
    return e;
  },
  _project: function () {
    var t = new Bounds();
    this._rings = [],
      this._projectLatlngs(this._latlngs, this._rings, t),
      this._bounds.isValid() && t.isValid() &&
      (this._rawPxBounds = t, this._updateBounds());
  },
  _updateBounds: function () {
    var t = this._clickTolerance(), e = new Point(t, t);
    this._rawPxBounds &&
      (this._pxBounds = new Bounds([
        this._rawPxBounds.min.subtract(e),
        this._rawPxBounds.max.add(e),
      ]));
  },
  _projectLatlngs: function (t, e, i) {
    var n, o, s = t[0] instanceof LatLng, r = t.length;
    if (s) {
      for (n = 0, o = []; n < r; n += 1) {
        o[n] = this._map.latLngToLayerPoint(t[n]), i.extend(o[n]);
      }
      e.push(o);
    } else for (n = 0; n < r; n += 1) this._projectLatlngs(t[n], e, i);
  },
  _clipPoints: function () {
    var t = this._renderer._bounds;
    if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
      if (this.options.noClip) {
        this._parts = this._rings;
        return;
      }
      var e, i, n, o, s, r, a, h = this._parts;
      for (e = 0, n = 0, o = this._rings.length; e < o; e += 1) {
        for (i = 0, s = (a = this._rings[e]).length; i < s - 1; i += 1) {
          (r = clipSegment(a[i], a[i + 1], t, i, !0)) &&
            (h[n] = h[n] || [],
              h[n].push(r[0]),
              (r[1] !== a[i + 1] || i === s - 2) && (h[n].push(r[1]), n += 1));
        }
      }
    }
  },
  _simplifyPoints: function () {
    for (
      var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length;
      i < n;
      i += 1
    ) t[i] = simplify(t[i], e);
  },
  _update: function () {
    this._map &&
      (this._clipPoints(), this._simplifyPoints(), this._updatePath());
  },
  _updatePath: function () {
    this._renderer._updatePoly(this);
  },
  _containsPoint: function (t, e) {
    var i, n, o, s, r, a, h = this._clickTolerance();
    if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
    for (i = 0, s = this._parts.length; i < s; i += 1) {
      for (n = 0, o = (r = (a = this._parts[i]).length) - 1; n < r; o = n++) {
        if (
          (e || 0 !== n) && pointToSegmentDistance(t, a[o], a[n]) <= h
        ) {
          return !0;
        }
      }
    }
    return !1;
  },
});
function polyline(t, e) {
  return new Polyline(t, e);
}
Polyline._flat = _flat;
var Polygon = Polyline.extend({
  options: { fill: !0 },
  isEmpty: function () {
    return !this._latlngs.length || !this._latlngs[0].length;
  },
  getCenter: function () {
    if (!this._map) {
      throw Error("Must add layer to map before using getCenter()");
    }
    return polygonCenter(this._defaultShape(), this._map.options.crs);
  },
  _convertLatLngs: function (t) {
    var e = Polyline.prototype._convertLatLngs.call(this, t), i = e.length;
    return i >= 2 && e[0] instanceof LatLng && e[0].equals(e[i - 1]) && e.pop(),
      e;
  },
  _setLatLngs: function (t) {
    Polyline.prototype._setLatLngs.call(this, t),
      isFlat(this._latlngs) && (this._latlngs = [this._latlngs]);
  },
  _defaultShape: function () {
    return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  },
  _clipPoints: function () {
    var t = this._renderer._bounds,
      e = this.options.weight,
      i = new Point(e, e);
    if (
      t = new Bounds(t.min.subtract(i), t.max.add(i)),
        this._parts = [],
        this._pxBounds && this._pxBounds.intersects(t)
    ) {
      if (this.options.noClip) {
        this._parts = this._rings;
        return;
      }
      for (var n, o = 0, s = this._rings.length; o < s; o += 1) {
        (n = clipPolygon(this._rings[o], t, !0)).length && this._parts.push(n);
      }
    }
  },
  _updatePath: function () {
    this._renderer._updatePoly(this, !0);
  },
  _containsPoint: function (t) {
    var e, i, n, o, s, r, a, h, l = !1;
    if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
    for (o = 0, a = this._parts.length; o < a; o += 1) {
      for (s = 0, r = (h = (e = this._parts[o]).length) - 1; s < h; r = s++) {
        i = e[s],
          n = e[r],
          i.y > t.y != n.y > t.y &&
          t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (l = !l);
      }
    }
    return l || Polyline.prototype._containsPoint.call(this, t, !0);
  },
});
function polygon(t, e) {
  return new Polygon(t, e);
}
var GeoJSON = FeatureGroup.extend({
  initialize: function (t, e) {
    setOptions(this, e), this._layers = {}, t && this.addData(t);
  },
  addData: function (t) {
    var e, i, n, o = isArray(t) ? t : t.features;
    if (o) {
      for (e = 0, i = o.length; e < i; e += 1) {
        ((n = o[e]).geometries || n.geometry || n.features || n.coordinates) &&
          this.addData(n);
      }
      return this;
    }
    var s = this.options;
    if (s.filter && !s.filter(t)) return this;
    var r = geometryToLayer(t, s);
    return r
      ? (r.feature = asFeature(t),
        r.defaultOptions = r.options,
        this.resetStyle(r),
        s.onEachFeature && s.onEachFeature(t, r),
        this.addLayer(r))
      : this;
  },
  resetStyle: function (t) {
    return void 0 === t
      ? this.eachLayer(this.resetStyle, this)
      : (t.options = extend({}, t.defaultOptions),
        this._setLayerStyle(t, this.options.style),
        this);
  },
  setStyle: function (t) {
    return this.eachLayer(function (e) {
      this._setLayerStyle(e, t);
    }, this);
  },
  _setLayerStyle: function (t, e) {
    t.setStyle && ("function" == typeof e && (e = e(t.feature)), t.setStyle(e));
  },
});
function geometryToLayer(t, e) {
  var i,
    n,
    o,
    s,
    r = "Feature" === t.type ? t.geometry : t,
    a = r ? r.coordinates : null,
    h = [],
    l = e && e.pointToLayer,
    u = e && e.coordsToLatLng || coordsToLatLng;
  if (!a && !r) return null;
  switch (r.type) {
    case "Point":
      return i = u(a), _pointToLayer(l, t, i, e);
    case "MultiPoint":
      for (o = 0, s = a.length; o < s; o += 1) {
        i = u(a[o]), h.push(_pointToLayer(l, t, i, e));
      }
      return new FeatureGroup(h);
    case "LineString":
    case "MultiLineString":
      return n = coordsToLatLngs(a, "LineString" === r.type ? 0 : 1, u),
        new Polyline(n, e);
    case "Polygon":
    case "MultiPolygon":
      return n = coordsToLatLngs(a, "Polygon" === r.type ? 1 : 2, u),
        new Polygon(n, e);
    case "GeometryCollection":
      for (o = 0, s = r.geometries.length; o < s; o += 1) {
        var c = geometryToLayer({
          geometry: r.geometries[o],
          type: "Feature",
          properties: t.properties,
        }, e);
        c && h.push(c);
      }
      return new FeatureGroup(h);
    case "FeatureCollection":
      for (o = 0, s = r.features.length; o < s; o += 1) {
        var d = geometryToLayer(r.features[o], e);
        d && h.push(d);
      }
      return new FeatureGroup(h);
    default:
      throw Error("Invalid GeoJSON object.");
  }
}
function _pointToLayer(t, e, i, n) {
  return t ? t(e, i) : new Marker(i, n && n.markersInheritOptions && n);
}
function coordsToLatLng(t) {
  return new LatLng(t[1], t[0], t[2]);
}
function coordsToLatLngs(t, e, i) {
  for (var n, o = [], s = 0, r = t.length; s < r; s += 1) {
    o.push(
      n = e ? coordsToLatLngs(t[s], e - 1, i) : (i || coordsToLatLng)(t[s]),
    );
  }
  return o;
}
function latLngToCoords(t, e) {
  return void 0 !== (t = toLatLng(t)).alt
    ? [formatNum(t.lng, e), formatNum(t.lat, e), formatNum(t.alt, e)]
    : [formatNum(t.lng, e), formatNum(t.lat, e)];
}
function latLngsToCoords(t, e, i, n) {
  for (var o = [], s = 0, r = t.length; s < r; s += 1) {
    o.push(
      e
        ? latLngsToCoords(t[s], isFlat(t[s]) ? 0 : e - 1, i, n)
        : latLngToCoords(t[s], n),
    );
  }
  return !e && i && o.length > 0 && o.push(o[0].slice()), o;
}
function getFeature(t, e) {
  return t.feature ? extend({}, t.feature, { geometry: e }) : asFeature(e);
}
function asFeature(t) {
  return "Feature" === t.type || "FeatureCollection" === t.type
    ? t
    : { type: "Feature", properties: {}, geometry: t };
}
var PointToGeoJSON = {
  toGeoJSON: function (t) {
    return getFeature(this, {
      type: "Point",
      coordinates: latLngToCoords(this.getLatLng(), t),
    });
  },
};
function geoJSON(t, e) {
  return new GeoJSON(t, e);
}
Marker.include(PointToGeoJSON),
  Circle.include(PointToGeoJSON),
  CircleMarker.include(PointToGeoJSON),
  Polyline.include({
    toGeoJSON: function (t) {
      var e = !isFlat(this._latlngs),
        i = latLngsToCoords(this._latlngs, e ? 1 : 0, !1, t);
      return getFeature(this, {
        type: (e ? "Multi" : "") + "LineString",
        coordinates: i,
      });
    },
  }),
  Polygon.include({
    toGeoJSON: function (t) {
      var e = !isFlat(this._latlngs),
        i = e && !isFlat(this._latlngs[0]),
        n = latLngsToCoords(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
      return e || (n = [n]),
        getFeature(this, {
          type: (i ? "Multi" : "") + "Polygon",
          coordinates: n,
        });
    },
  }),
  LayerGroup.include({
    toMultiPoint: function (t) {
      var e = [];
      return this.eachLayer(function (i) {
        e.push(i.toGeoJSON(t).geometry.coordinates);
      }),
        getFeature(this, { type: "MultiPoint", coordinates: e });
    },
    toGeoJSON: function (t) {
      var e = this.feature && this.feature.geometry &&
        this.feature.geometry.type;
      if ("MultiPoint" === e) return this.toMultiPoint(t);
      var i = "GeometryCollection" === e, n = [];
      return (this.eachLayer(function (e) {
          if (e.toGeoJSON) {
            var o = e.toGeoJSON(t);
            if (i) n.push(o.geometry);
            else {
              var s = asFeature(o);
              "FeatureCollection" === s.type
                ? n.push.apply(n, s.features)
                : n.push(s);
            }
          }
        }),
          i)
        ? getFeature(this, { geometries: n, type: "GeometryCollection" })
        : { type: "FeatureCollection", features: n };
    },
  });
var geoJson = geoJSON,
  ImageOverlay = Layer.extend({
    options: {
      opacity: 1,
      alt: "",
      interactive: !1,
      crossOrigin: !1,
      errorOverlayUrl: "",
      zIndex: 1,
      className: "",
    },
    initialize: function (t, e, i) {
      this._url = t, this._bounds = toLatLngBounds(e), setOptions(this, i);
    },
    onAdd: function () {
      !this._image &&
      (this._initImage(), this.options.opacity < 1 && this._updateOpacity()),
        this.options.interactive &&
        (addClass(this._image, "leaflet-interactive"),
          this.addInteractiveTarget(this._image)),
        this.getPane().appendChild(this._image),
        this._reset();
    },
    onRemove: function () {
      remove(this._image),
        this.options.interactive && this.removeInteractiveTarget(this._image);
    },
    setOpacity: function (t) {
      return this.options.opacity = t,
        this._image && this._updateOpacity(),
        this;
    },
    setStyle: function (t) {
      return t.opacity && this.setOpacity(t.opacity), this;
    },
    bringToFront: function () {
      return this._map && toFront(this._image), this;
    },
    bringToBack: function () {
      return this._map && toBack(this._image), this;
    },
    setUrl: function (t) {
      return this._url = t, this._image && (this._image.src = t), this;
    },
    setBounds: function (t) {
      return this._bounds = toLatLngBounds(t), this._map && this._reset(), this;
    },
    getEvents: function () {
      var t = { zoom: this._reset, viewreset: this._reset };
      return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
    },
    setZIndex: function (t) {
      return this.options.zIndex = t, this._updateZIndex(), this;
    },
    getBounds: function () {
      return this._bounds;
    },
    getElement: function () {
      return this._image;
    },
    _initImage: function () {
      var t = "IMG" === this._url.tagName,
        e = this._image = t ? this._url : create$1("img");
      if (
        addClass(e, "leaflet-image-layer"),
          this._zoomAnimated && addClass(e, "leaflet-zoom-animated"),
          this.options.className && addClass(e, this.options.className),
          e.onselectstart = falseFn,
          e.onmousemove = falseFn,
          e.onload = bind(this.fire, this, "load"),
          e.onerror = bind(this._overlayOnError, this, "error"),
          (this.options.crossOrigin || "" === this.options.crossOrigin) &&
          (e.crossOrigin = !0 === this.options.crossOrigin
            ? ""
            : this.options.crossOrigin),
          this.options.zIndex && this._updateZIndex(),
          t
      ) {
        this._url = e.src;
        return;
      }
      e.src = this._url, e.alt = this.options.alt;
    },
    _animateZoom: function (t) {
      var e = this._map.getZoomScale(t.zoom),
        i = this._map._latLngBoundsToNewLayerBounds(
          this._bounds,
          t.zoom,
          t.center,
        ).min;
      setTransform(this._image, i, e);
    },
    _reset: function () {
      var t = this._image,
        e = new Bounds(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast()),
        ),
        i = e.getSize();
      setPosition(t, e.min),
        t.style.width = i.x + "px",
        t.style.height = i.y + "px";
    },
    _updateOpacity: function () {
      setOpacity(this._image, this.options.opacity);
    },
    _updateZIndex: function () {
      this._image && void 0 !== this.options.zIndex &&
        null !== this.options.zIndex &&
        (this._image.style.zIndex = this.options.zIndex);
    },
    _overlayOnError: function () {
      this.fire("error");
      var t = this.options.errorOverlayUrl;
      t && this._url !== t && (this._url = t, this._image.src = t);
    },
    getCenter: function () {
      return this._bounds.getCenter();
    },
  }),
  imageOverlay = function (t, e, i) {
    return new ImageOverlay(t, e, i);
  },
  VideoOverlay = ImageOverlay.extend({
    options: {
      autoplay: !0,
      loop: !0,
      keepAspectRatio: !0,
      muted: !1,
      playsInline: !0,
    },
    _initImage: function () {
      var t = "VIDEO" === this._url.tagName,
        e = this._image = t ? this._url : create$1("video");
      if (
        addClass(e, "leaflet-image-layer"),
          this._zoomAnimated && addClass(e, "leaflet-zoom-animated"),
          this.options.className && addClass(e, this.options.className),
          e.onselectstart = falseFn,
          e.onmousemove = falseFn,
          e.onloadeddata = bind(this.fire, this, "load"),
          t
      ) {
        for (
          var i = e.getElementsByTagName("source"), n = [], o = 0;
          o < i.length;
          o += 1
        ) n.push(i[o].src);
        this._url = i.length > 0 ? n : [e.src];
        return;
      }
      isArray(this._url) || (this._url = [this._url]),
        !this.options.keepAspectRatio &&
        Object.prototype.hasOwnProperty.call(e.style, "objectFit") &&
        (e.style.objectFit = "fill"),
        e.autoplay = !!this.options.autoplay,
        e.loop = !!this.options.loop,
        e.muted = !!this.options.muted,
        e.playsInline = !!this.options.playsInline;
      for (var s = 0; s < this._url.length; s += 1) {
        var r = create$1("source");
        r.src = this._url[s], e.appendChild(r);
      }
    },
  });
function videoOverlay(t, e, i) {
  return new VideoOverlay(t, e, i);
}
var SVGOverlay = ImageOverlay.extend({
  _initImage: function () {
    var t = this._image = this._url;
    addClass(t, "leaflet-image-layer"),
      this._zoomAnimated && addClass(t, "leaflet-zoom-animated"),
      this.options.className && addClass(t, this.options.className),
      t.onselectstart = falseFn,
      t.onmousemove = falseFn;
  },
});
function svgOverlay(t, e, i) {
  return new SVGOverlay(t, e, i);
}
var DivOverlay = Layer.extend({
  options: {
    interactive: !1,
    offset: [0, 0],
    className: "",
    pane: void 0,
    content: "",
  },
  initialize: function (t, e) {
    t && (t instanceof LatLng || isArray(t))
      ? (this._latlng = toLatLng(t), setOptions(this, e))
      : (setOptions(this, t), this._source = e),
      this.options.content && (this._content = this.options.content);
  },
  openOn: function (t) {
    return t = arguments.length ? t : this._source._map,
      t.hasLayer(this) || t.addLayer(this),
      this;
  },
  close: function () {
    return this._map && this._map.removeLayer(this), this;
  },
  toggle: function (t) {
    return this._map
      ? this.close()
      : (arguments.length ? this._source = t : t = this._source,
        this._prepareOpen(),
        this.openOn(t._map)),
      this;
  },
  onAdd: function (t) {
    this._zoomAnimated = t._zoomAnimated,
      this._container || this._initLayout(),
      t._fadeAnimated && setOpacity(this._container, 0),
      clearTimeout(this._removeTimeout),
      this.getPane().appendChild(this._container),
      this.update(),
      t._fadeAnimated && setOpacity(this._container, 1),
      this.bringToFront(),
      this.options.interactive &&
      (addClass(this._container, "leaflet-interactive"),
        this.addInteractiveTarget(this._container));
  },
  onRemove: function (t) {
    t._fadeAnimated
      ? (setOpacity(this._container, 0),
        this._removeTimeout = setTimeout(
          bind(remove, void 0, this._container),
          200,
        ))
      : remove(this._container),
      this.options.interactive &&
      (removeClass(this._container, "leaflet-interactive"),
        this.removeInteractiveTarget(this._container));
  },
  getLatLng: function () {
    return this._latlng;
  },
  setLatLng: function (t) {
    return this._latlng = toLatLng(t),
      this._map && (this._updatePosition(), this._adjustPan()),
      this;
  },
  getContent: function () {
    return this._content;
  },
  setContent: function (t) {
    return this._content = t, this.update(), this;
  },
  getElement: function () {
    return this._container;
  },
  update: function () {
    this._map &&
      (this._container.style.visibility = "hidden",
        this._updateContent(),
        this._updateLayout(),
        this._updatePosition(),
        this._container.style.visibility = "",
        this._adjustPan());
  },
  getEvents: function () {
    var t = { zoom: this._updatePosition, viewreset: this._updatePosition };
    return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
  },
  isOpen: function () {
    return !!this._map && this._map.hasLayer(this);
  },
  bringToFront: function () {
    return this._map && toFront(this._container), this;
  },
  bringToBack: function () {
    return this._map && toBack(this._container), this;
  },
  _prepareOpen: function (t) {
    var e = this._source;
    if (!e._map) return !1;
    if (e instanceof FeatureGroup) {
      e = null;
      var i = this._source._layers;
      for (var n in i) {
        if (i[n]._map) {
          e = i[n];
          break;
        }
      }
      if (!e) return !1;
      this._source = e;
    }
    if (!t) {
      if (e.getCenter) t = e.getCenter();
      else if (e.getLatLng) t = e.getLatLng();
      else if (e.getBounds) t = e.getBounds().getCenter();
      else throw Error("Unable to get source layer LatLng.");
    }
    return this.setLatLng(t), this._map && this.update(), !0;
  },
  _updateContent: function () {
    if (this._content) {
      var t = this._contentNode,
        e = "function" == typeof this._content
          ? this._content(this._source || this)
          : this._content;
      if ("string" == typeof e) t.innerHTML = e;
      else {
        for (; t.hasChildNodes();) t.removeChild(t.firstChild);
        t.appendChild(e);
      }
      this.fire("contentupdate");
    }
  },
  _updatePosition: function () {
    if (this._map) {
      var t = this._map.latLngToLayerPoint(this._latlng),
        e = toPoint(this.options.offset),
        i = this._getAnchor();
      this._zoomAnimated
        ? setPosition(this._container, t.add(i))
        : e = e.add(t).add(i);
      var n = this._containerBottom = -e.y,
        o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
      this._container.style.bottom = n + "px",
        this._container.style.left = o + "px";
    }
  },
  _getAnchor: function () {
    return [0, 0];
  },
});
Map.include({
  _initOverlay: function (t, e, i, n) {
    var o = e;
    return o instanceof t || (o = new t(n).setContent(e)),
      i && o.setLatLng(i),
      o;
  },
}),
  Layer.include({
    _initOverlay: function (t, e, i, n) {
      var o = i;
      return o instanceof t
        ? (setOptions(o, n), o._source = this)
        : (o = e && !n ? e : new t(n, this)).setContent(i),
        o;
    },
  });
var Popup = DivOverlay.extend({
    options: {
      pane: "popupPane",
      offset: [0, 7],
      maxWidth: 300,
      minWidth: 50,
      maxHeight: null,
      autoPan: !0,
      autoPanPaddingTopLeft: null,
      autoPanPaddingBottomRight: null,
      autoPanPadding: [5, 5],
      keepInView: !1,
      closeButton: !0,
      autoClose: !0,
      closeOnEscapeKey: !0,
      className: "",
    },
    openOn: function (t) {
      return t = arguments.length ? t : this._source._map,
        !t.hasLayer(this) && t._popup && t._popup.options.autoClose &&
        t.removeLayer(t._popup),
        t._popup = this,
        DivOverlay.prototype.openOn.call(this, t);
    },
    onAdd: function (t) {
      DivOverlay.prototype.onAdd.call(this, t),
        t.fire("popupopen", { popup: this }),
        !this._source ||
        (this._source.fire("popupopen", { popup: this }, !0),
          this._source instanceof Path ||
          this._source.on("preclick", stopPropagation));
    },
    onRemove: function (t) {
      DivOverlay.prototype.onRemove.call(this, t),
        t.fire("popupclose", { popup: this }),
        !this._source ||
        (this._source.fire("popupclose", { popup: this }, !0),
          this._source instanceof Path ||
          this._source.off("preclick", stopPropagation));
    },
    getEvents: function () {
      var t = DivOverlay.prototype.getEvents.call(this);
      return (void 0 !== this.options.closeOnClick
        ? this.options.closeOnClick
        : this._map.options.closePopupOnClick) && (t.preclick = this.close),
        this.options.keepInView && (t.moveend = this._adjustPan),
        t;
    },
    _initLayout: function () {
      var t = "leaflet-popup",
        e = this._container = create$1(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated",
        ),
        i = this._wrapper = create$1("div", t + "-content-wrapper", e);
      if (
        this._contentNode = create$1("div", t + "-content", i),
          disableClickPropagation(e),
          disableScrollPropagation(this._contentNode),
          on(e, "contextmenu", stopPropagation),
          this._tipContainer = create$1("div", t + "-tip-container", e),
          this._tip = create$1("div", t + "-tip", this._tipContainer),
          this.options.closeButton
      ) {
        var n = this._closeButton = create$1("a", t + "-close-button", e);
        n.setAttribute("role", "button"),
          n.setAttribute("aria-label", "Close popup"),
          n.href = "#close",
          n.innerHTML = '<span aria-hidden="true">&#215;</span>',
          on(n, "click", function (t) {
            preventDefault(t), this.close();
          }, this);
      }
    },
    _updateLayout: function () {
      var t = this._contentNode, e = t.style;
      e.width = "", e.whiteSpace = "nowrap";
      var i = t.offsetWidth;
      i = Math.max(
        i = Math.min(i, this.options.maxWidth),
        this.options.minWidth,
      ),
        e.width = i + 1 + "px",
        e.whiteSpace = "",
        e.height = "";
      var n = t.offsetHeight,
        o = this.options.maxHeight,
        s = "leaflet-popup-scrolled";
      o && n > o ? (e.height = o + "px", addClass(t, s)) : removeClass(t, s),
        this._containerWidth = this._container.offsetWidth;
    },
    _animateZoom: function (t) {
      var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
        i = this._getAnchor();
      setPosition(this._container, e.add(i));
    },
    _adjustPan: function () {
      if (this.options.autoPan) {
        if (
          this._map._panAnim && this._map._panAnim.stop(), this._autopanning
        ) {
          this._autopanning = !1;
          return;
        }
        var t = this._map,
          e = parseInt(getStyle(this._container, "marginBottom"), 10) || 0,
          i = this._container.offsetHeight + e,
          n = this._containerWidth,
          o = new Point(this._containerLeft, -i - this._containerBottom);
        o._add(getPosition(this._container));
        var s = t.layerPointToContainerPoint(o),
          r = toPoint(this.options.autoPanPadding),
          a = toPoint(this.options.autoPanPaddingTopLeft || r),
          h = toPoint(this.options.autoPanPaddingBottomRight || r),
          l = t.getSize(),
          u = 0,
          c = 0;
        s.x + n + h.x > l.x && (u = s.x + n - l.x + h.x),
          s.x - u - a.x < 0 && (u = s.x - a.x),
          s.y + i + h.y > l.y && (c = s.y + i - l.y + h.y),
          s.y - c - a.y < 0 && (c = s.y - a.y),
          (u || c) &&
          (this.options.keepInView && (this._autopanning = !0),
            t.fire("autopanstart").panBy([u, c]));
      }
    },
    _getAnchor: function () {
      return toPoint(
        this._source && this._source._getPopupAnchor
          ? this._source._getPopupAnchor()
          : [0, 0],
      );
    },
  }),
  popup = function (t, e) {
    return new Popup(t, e);
  };
Map.mergeOptions({ closePopupOnClick: !0 }),
  Map.include({
    openPopup: function (t, e, i) {
      return this._initOverlay(Popup, t, e, i).openOn(this), this;
    },
    closePopup: function (t) {
      return t = arguments.length ? t : this._popup, t && t.close(), this;
    },
  }),
  Layer.include({
    bindPopup: function (t, e) {
      return this._popup = this._initOverlay(Popup, this._popup, t, e),
        this._popupHandlersAdded ||
        (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup,
        }),
          this._popupHandlersAdded = !0),
        this;
    },
    unbindPopup: function () {
      return this._popup &&
        (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup,
        }),
          this._popupHandlersAdded = !1,
          this._popup = null),
        this;
    },
    openPopup: function (t) {
      return this._popup &&
        (this instanceof FeatureGroup || (this._popup._source = this),
          this._popup._prepareOpen(t || this._latlng) &&
          this._popup.openOn(this._map)),
        this;
    },
    closePopup: function () {
      return this._popup && this._popup.close(), this;
    },
    togglePopup: function () {
      return this._popup && this._popup.toggle(this), this;
    },
    isPopupOpen: function () {
      return !!this._popup && this._popup.isOpen();
    },
    setPopupContent: function (t) {
      return this._popup && this._popup.setContent(t), this;
    },
    getPopup: function () {
      return this._popup;
    },
    _openPopup: function (t) {
      if (this._popup && this._map) {
        stop(t);
        var e = t.layer || t.target;
        if (this._popup._source === e && !(e instanceof Path)) {
          this._map.hasLayer(this._popup)
            ? this.closePopup()
            : this.openPopup(t.latlng);
          return;
        }
        this._popup._source = e, this.openPopup(t.latlng);
      }
    },
    _movePopup: function (t) {
      this._popup.setLatLng(t.latlng);
    },
    _onKeyPress: function (t) {
      13 === t.originalEvent.keyCode && this._openPopup(t);
    },
  });
var Tooltip = DivOverlay.extend({
    options: {
      pane: "tooltipPane",
      offset: [0, 0],
      direction: "auto",
      permanent: !1,
      sticky: !1,
      opacity: .9,
    },
    onAdd: function (t) {
      DivOverlay.prototype.onAdd.call(this, t),
        this.setOpacity(this.options.opacity),
        t.fire("tooltipopen", { tooltip: this }),
        this._source &&
        (this.addEventParent(this._source),
          this._source.fire("tooltipopen", { tooltip: this }, !0));
    },
    onRemove: function (t) {
      DivOverlay.prototype.onRemove.call(this, t),
        t.fire("tooltipclose", { tooltip: this }),
        this._source &&
        (this.removeEventParent(this._source),
          this._source.fire("tooltipclose", { tooltip: this }, !0));
    },
    getEvents: function () {
      var t = DivOverlay.prototype.getEvents.call(this);
      return this.options.permanent || (t.preclick = this.close), t;
    },
    _initLayout: function () {
      var t = "leaflet-tooltip " + (this.options.className || "") +
        " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
      this._contentNode = this._container = create$1("div", t),
        this._container.setAttribute("role", "tooltip"),
        this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
    },
    _updateLayout: function () {},
    _adjustPan: function () {},
    _setPosition: function (t) {
      var e,
        i,
        n = this._map,
        o = this._container,
        s = n.latLngToContainerPoint(n.getCenter()),
        r = n.layerPointToContainerPoint(t),
        a = this.options.direction,
        h = o.offsetWidth,
        l = o.offsetHeight,
        u = toPoint(this.options.offset),
        c = this._getAnchor();
      "top" === a
        ? (e = h / 2, i = l)
        : "bottom" === a
        ? (e = h / 2, i = 0)
        : "center" === a
        ? (e = h / 2, i = l / 2)
        : "right" === a
        ? (e = 0, i = l / 2)
        : "left" === a
        ? (e = h, i = l / 2)
        : r.x < s.x
        ? (a = "right", e = 0, i = l / 2)
        : (a = "left", e = h + (u.x + c.x) * 2, i = l / 2),
        t = t.subtract(toPoint(e, i, !0)).add(u).add(c),
        removeClass(o, "leaflet-tooltip-right"),
        removeClass(o, "leaflet-tooltip-left"),
        removeClass(o, "leaflet-tooltip-top"),
        removeClass(o, "leaflet-tooltip-bottom"),
        addClass(o, "leaflet-tooltip-" + a),
        setPosition(o, t);
    },
    _updatePosition: function () {
      var t = this._map.latLngToLayerPoint(this._latlng);
      this._setPosition(t);
    },
    setOpacity: function (t) {
      this.options.opacity = t,
        this._container && setOpacity(this._container, t);
    },
    _animateZoom: function (t) {
      var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
      this._setPosition(e);
    },
    _getAnchor: function () {
      return toPoint(
        this._source && this._source._getTooltipAnchor && !this.options.sticky
          ? this._source._getTooltipAnchor()
          : [0, 0],
      );
    },
  }),
  tooltip = function (t, e) {
    return new Tooltip(t, e);
  };
Map.include({
  openTooltip: function (t, e, i) {
    return this._initOverlay(Tooltip, t, e, i).openOn(this), this;
  },
  closeTooltip: function (t) {
    return t.close(), this;
  },
}),
  Layer.include({
    bindTooltip: function (t, e) {
      return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
        this._tooltip = this._initOverlay(Tooltip, this._tooltip, t, e),
        this._initTooltipInteractions(),
        this._tooltip.options.permanent && this._map &&
        this._map.hasLayer(this) && this.openTooltip(),
        this;
    },
    unbindTooltip: function () {
      return this._tooltip &&
        (this._initTooltipInteractions(!0),
          this.closeTooltip(),
          this._tooltip = null),
        this;
    },
    _initTooltipInteractions: function (t) {
      if (t || !this._tooltipHandlersAdded) {
        var e = { remove: this.closeTooltip, move: this._moveTooltip };
        this._tooltip.options.permanent
          ? e.add = this._openTooltip
          : (e.mouseover = this._openTooltip,
            e.mouseout = this.closeTooltip,
            e.click = this._openTooltip,
            this._map
              ? this._addFocusListeners()
              : e.add = this._addFocusListeners),
          this._tooltip.options.sticky && (e.mousemove = this._moveTooltip),
          this[t ? "off" : "on"](e),
          this._tooltipHandlersAdded = !t;
      }
    },
    openTooltip: function (t) {
      return this._tooltip &&
        (this instanceof FeatureGroup || (this._tooltip._source = this),
          this._tooltip._prepareOpen(t) &&
          (this._tooltip.openOn(this._map),
            this.getElement
              ? this._setAriaDescribedByOnLayer(this)
              : this.eachLayer &&
                this.eachLayer(this._setAriaDescribedByOnLayer, this))),
        this;
    },
    closeTooltip: function () {
      if (this._tooltip) return this._tooltip.close();
    },
    toggleTooltip: function () {
      return this._tooltip && this._tooltip.toggle(this), this;
    },
    isTooltipOpen: function () {
      return this._tooltip.isOpen();
    },
    setTooltipContent: function (t) {
      return this._tooltip && this._tooltip.setContent(t), this;
    },
    getTooltip: function () {
      return this._tooltip;
    },
    _addFocusListeners: function () {
      this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer &&
        this.eachLayer(this._addFocusListenersOnLayer, this);
    },
    _addFocusListenersOnLayer: function (t) {
      var e = "function" == typeof t.getElement && t.getElement();
      e && (on(e, "focus", function () {
        this._tooltip._source = t, this.openTooltip();
      }, this),
        on(e, "blur", this.closeTooltip, this));
    },
    _setAriaDescribedByOnLayer: function (t) {
      var e = "function" == typeof t.getElement && t.getElement();
      e && e.setAttribute("aria-describedby", this._tooltip._container.id);
    },
    _openTooltip: function (t) {
      if (this._tooltip && this._map) {
        if (
          this._map.dragging && this._map.dragging.moving() &&
          !this._openOnceFlag
        ) {
          this._openOnceFlag = !0;
          var e = this;
          this._map.once("moveend", function () {
            e._openOnceFlag = !1, e._openTooltip(t);
          });
          return;
        }
        this._tooltip._source = t.layer || t.target,
          this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
      }
    },
    _moveTooltip: function (t) {
      var e, i, n = t.latlng;
      this._tooltip.options.sticky && t.originalEvent &&
      (e = this._map.mouseEventToContainerPoint(t.originalEvent),
        i = this._map.containerPointToLayerPoint(e),
        n = this._map.layerPointToLatLng(i)), this._tooltip.setLatLng(n);
    },
  });
var DivIcon = Icon.extend({
  options: {
    iconSize: [12, 12],
    html: !1,
    bgPos: null,
    className: "leaflet-div-icon",
  },
  createIcon: function (t) {
    var e = t && "DIV" === t.tagName ? t : document.createElement("div"),
      i = this.options;
    if (
      i.html instanceof Element
        ? (empty(e), e.appendChild(i.html))
        : e.innerHTML = !1 !== i.html ? i.html : "", i.bgPos
    ) {
      var n = toPoint(i.bgPos);
      e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
    }
    return this._setIconStyles(e, "icon"), e;
  },
  createShadow: function () {
    return null;
  },
});
function divIcon(t) {
  return new DivIcon(t);
}
Icon.Default = IconDefault;
var GridLayer = Layer.extend({
  options: {
    tileSize: 256,
    opacity: 1,
    updateWhenIdle: Browser.mobile,
    updateWhenZooming: !0,
    updateInterval: 200,
    zIndex: 1,
    bounds: null,
    minZoom: 0,
    maxZoom: void 0,
    maxNativeZoom: void 0,
    minNativeZoom: void 0,
    noWrap: !1,
    pane: "tilePane",
    className: "",
    keepBuffer: 2,
  },
  initialize: function (t) {
    setOptions(this, t);
  },
  onAdd: function () {
    this._initContainer(),
      this._levels = {},
      this._tiles = {},
      this._resetView();
  },
  beforeAdd: function (t) {
    t._addZoomLimit(this);
  },
  onRemove: function (t) {
    this._removeAllTiles(),
      remove(this._container),
      t._removeZoomLimit(this),
      this._container = null,
      this._tileZoom = void 0;
  },
  bringToFront: function () {
    return this._map &&
      (toFront(this._container), this._setAutoZIndex(Math.max)),
      this;
  },
  bringToBack: function () {
    return this._map &&
      (toBack(this._container), this._setAutoZIndex(Math.min)),
      this;
  },
  getContainer: function () {
    return this._container;
  },
  setOpacity: function (t) {
    return this.options.opacity = t, this._updateOpacity(), this;
  },
  setZIndex: function (t) {
    return this.options.zIndex = t, this._updateZIndex(), this;
  },
  isLoading: function () {
    return this._loading;
  },
  redraw: function () {
    if (this._map) {
      this._removeAllTiles();
      var t = this._clampZoom(this._map.getZoom());
      t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()),
        this._update();
    }
    return this;
  },
  getEvents: function () {
    var t = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,
      zoom: this._resetView,
      moveend: this._onMoveEnd,
    };
    return this.options.updateWhenIdle ||
      (this._onMove ||
        (this._onMove = throttle(
          this._onMoveEnd,
          this.options.updateInterval,
          this,
        )),
        t.move = this._onMove),
      this._zoomAnimated && (t.zoomanim = this._animateZoom),
      t;
  },
  createTile: function () {
    return document.createElement("div");
  },
  getTileSize: function () {
    var t = this.options.tileSize;
    return t instanceof Point ? t : new Point(t, t);
  },
  _updateZIndex: function () {
    this._container && void 0 !== this.options.zIndex &&
      null !== this.options.zIndex &&
      (this._container.style.zIndex = this.options.zIndex);
  },
  _setAutoZIndex: function (t) {
    for (
      var e,
        i = this.getPane().children,
        n = -t(-1 / 0, 1 / 0),
        o = 0,
        s = i.length;
      o < s;
      o += 1
    ) e = i[o].style.zIndex, i[o] !== this._container && e && (n = t(n, +e));
    isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex());
  },
  _updateOpacity: function () {
    if (this._map && !Browser.ielt9) {
      setOpacity(this._container, this.options.opacity);
      var t = +new Date(), e = !1, i = !1;
      for (var n in this._tiles) {
        var o = this._tiles[n];
        if (o.current && o.loaded) {
          var s = Math.min(1, (t - o.loaded) / 200);
          setOpacity(o.el, s),
            s < 1
              ? e = !0
              : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0);
        }
      }
      i && !this._noPrune && this._pruneTiles(),
        e &&
        (cancelAnimFrame(this._fadeFrame),
          this._fadeFrame = requestAnimFrame(this._updateOpacity, this));
    }
  },
  _onOpaqueTile: falseFn,
  _initContainer: function () {
    this._container ||
      (this._container = create$1(
        "div",
        "leaflet-layer " + (this.options.className || ""),
      ),
        this._updateZIndex(),
        this.options.opacity < 1 && this._updateOpacity(),
        this.getPane().appendChild(this._container));
  },
  _updateLevels: function () {
    var t = this._tileZoom, e = this.options.maxZoom;
    if (void 0 !== t) {
      for (var i in this._levels) {
        i = Number(i),
          this._levels[i].el.children.length || i === t
            ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i),
              this._onUpdateLevel(i))
            : (remove(this._levels[i].el),
              this._removeTilesAtZoom(i),
              this._onRemoveLevel(i),
              delete this._levels[i]);
      }
      var n = this._levels[t], o = this._map;
      return n ||
        ((n = this._levels[t] = {}).el = create$1(
          "div",
          "leaflet-tile-container leaflet-zoom-animated",
          this._container,
        ),
          n.el.style.zIndex = e,
          n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(),
          n.zoom = t,
          this._setZoomTransform(n, o.getCenter(), o.getZoom()),
          falseFn(n.el.offsetWidth),
          this._onCreateLevel(n)),
        this._level = n,
        n;
    }
  },
  _onUpdateLevel: falseFn,
  _onRemoveLevel: falseFn,
  _onCreateLevel: falseFn,
  _pruneTiles: function () {
    if (this._map) {
      var t, e, i = this._map.getZoom();
      if (i > this.options.maxZoom || i < this.options.minZoom) {
        this._removeAllTiles();
        return;
      }
      for (t in this._tiles) (e = this._tiles[t]).retain = e.current;
      for (t in this._tiles) {
        if ((e = this._tiles[t]).current && !e.active) {
          var n = e.coords;
          this._retainParent(n.x, n.y, n.z, n.z - 5) ||
            this._retainChildren(n.x, n.y, n.z, n.z + 2);
        }
      }
      for (t in this._tiles) this._tiles[t].retain || this._removeTile(t);
    }
  },
  _removeTilesAtZoom: function (t) {
    for (var e in this._tiles) {
      this._tiles[e].coords.z === t && this._removeTile(e);
    }
  },
  _removeAllTiles: function () {
    for (var t in this._tiles) this._removeTile(t);
  },
  _invalidateAll: function () {
    for (var t in this._levels) {
      remove(this._levels[t].el),
        this._onRemoveLevel(Number(t)),
        delete this._levels[t];
    }
    this._removeAllTiles(), this._tileZoom = void 0;
  },
  _retainParent: function (t, e, i, n) {
    var o = Math.floor(t / 2),
      s = Math.floor(e / 2),
      r = i - 1,
      a = new Point(+o, +s);
    a.z = +r;
    var h = this._tileCoordsToKey(a), l = this._tiles[h];
    return l && l.active
      ? (l.retain = !0, !0)
      : (l && l.loaded && (l.retain = !0),
        r > n && this._retainParent(o, s, r, n));
  },
  _retainChildren: function (t, e, i, n) {
    for (var o = 2 * t; o < 2 * t + 2; o += 1) {
      for (var s = 2 * e; s < 2 * e + 2; s += 1) {
        var r = new Point(o, s);
        r.z = i + 1;
        var a = this._tileCoordsToKey(r), h = this._tiles[a];
        if (h && h.active) {
          h.retain = !0;
          continue;
        }
        h && h.loaded && (h.retain = !0),
          i + 1 < n && this._retainChildren(o, s, i + 1, n);
      }
    }
  },
  _resetView: function (t) {
    var e = t && (t.pinch || t.flyTo);
    this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
  },
  _animateZoom: function (t) {
    this._setView(t.center, t.zoom, !0, t.noUpdate);
  },
  _clampZoom: function (t) {
    var e = this.options;
    return void 0 !== e.minNativeZoom && t < e.minNativeZoom
      ? e.minNativeZoom
      : void 0 !== e.maxNativeZoom && e.maxNativeZoom < t
      ? e.maxNativeZoom
      : t;
  },
  _setView: function (t, e, i, n) {
    var o = Math.round(e);
    o = void 0 !== this.options.maxZoom && o > this.options.maxZoom ||
        void 0 !== this.options.minZoom && o < this.options.minZoom
      ? void 0
      : this._clampZoom(o);
    var s = this.options.updateWhenZooming && o !== this._tileZoom;
    (!n || s) &&
    (this._tileZoom = o,
      this._abortLoading && this._abortLoading(),
      this._updateLevels(),
      this._resetGrid(),
      void 0 !== o && this._update(t),
      i || this._pruneTiles(),
      this._noPrune = !!i), this._setZoomTransforms(t, e);
  },
  _setZoomTransforms: function (t, e) {
    for (var i in this._levels) this._setZoomTransform(this._levels[i], t, e);
  },
  _setZoomTransform: function (t, e, i) {
    var n = this._map.getZoomScale(i, t.zoom),
      o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i))
        .round();
    Browser.any3d ? setTransform(t.el, o, n) : setPosition(t.el, o);
  },
  _resetGrid: function () {
    var t = this._map,
      e = t.options.crs,
      i = this._tileSize = this.getTileSize(),
      n = this._tileZoom,
      o = this._map.getPixelWorldBounds(this._tileZoom);
    o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
      this._wrapX = e.wrapLng && !this.options.noWrap &&
        [
          Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
          Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y),
        ],
      this._wrapY = e.wrapLat && !this.options.noWrap &&
        [
          Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
          Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y),
        ];
  },
  _onMoveEnd: function () {
    this._map && !this._map._animatingZoom && this._update();
  },
  _getTiledPixelBounds: function (t) {
    var e = this._map,
      i = e._animatingZoom
        ? Math.max(e._animateToZoom, e.getZoom())
        : e.getZoom(),
      n = e.getZoomScale(i, this._tileZoom),
      o = e.project(t, this._tileZoom).floor(),
      s = e.getSize().divideBy(2 * n);
    return new Bounds(o.subtract(s), o.add(s));
  },
  _update: function (t) {
    var e = this._map;
    if (e) {
      var i = this._clampZoom(e.getZoom());
      if (void 0 === t && (t = e.getCenter()), void 0 !== this._tileZoom) {
        var n = this._getTiledPixelBounds(t),
          o = this._pxBoundsToTileRange(n),
          s = o.getCenter(),
          r = [],
          a = this.options.keepBuffer,
          h = new Bounds(
            o.getBottomLeft().subtract([a, -a]),
            o.getTopRight().add([a, -a]),
          );
        if (
          !(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) &&
            isFinite(o.max.y))
        ) throw Error("Attempted to load an infinite number of tiles");
        for (var l in this._tiles) {
          var u = this._tiles[l].coords;
          u.z === this._tileZoom && h.contains(new Point(u.x, u.y)) ||
            (this._tiles[l].current = !1);
        }
        if (Math.abs(i - this._tileZoom) > 1) {
          this._setView(t, i);
          return;
        }
        for (var c = o.min.y; c <= o.max.y; c += 1) {
          for (var d = o.min.x; d <= o.max.x; d += 1) {
            var p = new Point(d, c);
            if (p.z = this._tileZoom, this._isValidTile(p)) {
              var m = this._tiles[this._tileCoordsToKey(p)];
              m ? m.current = !0 : r.push(p);
            }
          }
        }
        if (
          r.sort(function (t, e) {
            return t.distanceTo(s) - e.distanceTo(s);
          }), 0 !== r.length
        ) {
          this._loading || (this._loading = !0, this.fire("loading"));
          var f = document.createDocumentFragment();
          for (d = 0; d < r.length; d += 1) this._addTile(r[d], f);
          this._level.el.appendChild(f);
        }
      }
    }
  },
  _isValidTile: function (t) {
    var e = this._map.options.crs;
    if (!e.infinite) {
      var i = this._globalTileRange;
      if (
        !e.wrapLng && (t.x < i.min.x || t.x > i.max.x) ||
        !e.wrapLat && (t.y < i.min.y || t.y > i.max.y)
      ) return !1;
    }
    if (!this.options.bounds) return !0;
    var n = this._tileCoordsToBounds(t);
    return toLatLngBounds(this.options.bounds).overlaps(n);
  },
  _keyToBounds: function (t) {
    return this._tileCoordsToBounds(this._keyToTileCoords(t));
  },
  _tileCoordsToNwSe: function (t) {
    var e = this._map,
      i = this.getTileSize(),
      n = t.scaleBy(i),
      o = n.add(i),
      s = e.unproject(n, t.z),
      r = e.unproject(o, t.z);
    return [s, r];
  },
  _tileCoordsToBounds: function (t) {
    var e = this._tileCoordsToNwSe(t), i = new LatLngBounds(e[0], e[1]);
    return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
  },
  _tileCoordsToKey: function (t) {
    return t.x + ":" + t.y + ":" + t.z;
  },
  _keyToTileCoords: function (t) {
    var e = t.split(":"), i = new Point(+e[0], +e[1]);
    return i.z = +e[2], i;
  },
  _removeTile: function (t) {
    var e = this._tiles[t];
    e &&
      (remove(e.el),
        delete this._tiles[t],
        this.fire("tileunload", {
          tile: e.el,
          coords: this._keyToTileCoords(t),
        }));
  },
  _initTile: function (t) {
    addClass(t, "leaflet-tile");
    var e = this.getTileSize();
    t.style.width = e.x + "px",
      t.style.height = e.y + "px",
      t.onselectstart = falseFn,
      t.onmousemove = falseFn,
      Browser.ielt9 && this.options.opacity < 1 &&
      setOpacity(t, this.options.opacity);
  },
  _addTile: function (t, e) {
    var i = this._getTilePos(t),
      n = this._tileCoordsToKey(t),
      o = this.createTile(this._wrapCoords(t), bind(this._tileReady, this, t));
    this._initTile(o),
      this.createTile.length < 2 &&
      requestAnimFrame(bind(this._tileReady, this, t, null, o)),
      setPosition(o, i),
      this._tiles[n] = { el: o, coords: t, current: !0 },
      e.appendChild(o),
      this.fire("tileloadstart", { tile: o, coords: t });
  },
  _tileReady: function (t, e, i) {
    e && this.fire("tileerror", { error: e, tile: i, coords: t });
    var n = this._tileCoordsToKey(t);
    (i = this._tiles[n]) &&
      (i.loaded = +new Date(),
        this._map._fadeAnimated
          ? (setOpacity(i.el, 0),
            cancelAnimFrame(this._fadeFrame),
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this))
          : (i.active = !0, this._pruneTiles()),
        e ||
        (addClass(i.el, "leaflet-tile-loaded"),
          this.fire("tileload", { tile: i.el, coords: t })),
        this._noTilesToLoad() &&
        (this._loading = !1,
          this.fire("load"),
          Browser.ielt9 || !this._map._fadeAnimated
            ? requestAnimFrame(this._pruneTiles, this)
            : setTimeout(bind(this._pruneTiles, this), 250)));
  },
  _getTilePos: function (t) {
    return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
  },
  _wrapCoords: function (t) {
    var e = new Point(
      this._wrapX ? wrapNum(t.x, this._wrapX) : t.x,
      this._wrapY ? wrapNum(t.y, this._wrapY) : t.y,
    );
    return e.z = t.z, e;
  },
  _pxBoundsToTileRange: function (t) {
    var e = this.getTileSize();
    return new Bounds(
      t.min.unscaleBy(e).floor(),
      t.max.unscaleBy(e).ceil().subtract([1, 1]),
    );
  },
  _noTilesToLoad: function () {
    for (var t in this._tiles) if (!this._tiles[t].loaded) return !1;
    return !0;
  },
});
function gridLayer(t) {
  return new GridLayer(t);
}
var TileLayer = GridLayer.extend({
  options: {
    minZoom: 0,
    maxZoom: 18,
    subdomains: "abc",
    errorTileUrl: "",
    zoomOffset: 0,
    tms: !1,
    zoomReverse: !1,
    detectRetina: !1,
    crossOrigin: !1,
    referrerPolicy: !1,
  },
  initialize: function (t, e) {
    this._url = t,
      (e = setOptions(this, e)).detectRetina && Browser.retina && e.maxZoom > 0
        ? (e.tileSize = Math.floor(e.tileSize / 2),
          e.zoomReverse
            ? (e.zoomOffset -= 1,
              e.minZoom = Math.min(e.maxZoom, e.minZoom + 1))
            : (e.zoomOffset += 1,
              e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)),
          e.minZoom = Math.max(0, e.minZoom))
        : e.zoomReverse
        ? e.minZoom = Math.min(e.maxZoom, e.minZoom)
        : e.maxZoom = Math.max(e.minZoom, e.maxZoom),
      "string" == typeof e.subdomains &&
      (e.subdomains = e.subdomains.split("")),
      this.on("tileunload", this._onTileRemove);
  },
  setUrl: function (t, e) {
    return this._url === t && void 0 === e && (e = !0),
      this._url = t,
      e || this.redraw(),
      this;
  },
  createTile: function (t, e) {
    var i = document.createElement("img");
    return on(i, "load", bind(this._tileOnLoad, this, e, i)),
      on(i, "error", bind(this._tileOnError, this, e, i)),
      (this.options.crossOrigin || "" === this.options.crossOrigin) &&
      (i.crossOrigin = !0 === this.options.crossOrigin
        ? ""
        : this.options.crossOrigin),
      "string" == typeof this.options.referrerPolicy &&
      (i.referrerPolicy = this.options.referrerPolicy),
      i.alt = "",
      i.src = this.getTileUrl(t),
      i;
  },
  getTileUrl: function (t) {
    var e = {
      r: Browser.retina ? "@2x" : "",
      s: this._getSubdomain(t),
      x: t.x,
      y: t.y,
      z: this._getZoomForUrl(),
    };
    if (this._map && !this._map.options.crs.infinite) {
      var i = this._globalTileRange.max.y - t.y;
      this.options.tms && (e.y = i), e["-y"] = i;
    }
    return template(this._url, extend(e, this.options));
  },
  _tileOnLoad: function (t, e) {
    Browser.ielt9 ? setTimeout(bind(t, this, null, e), 0) : t(null, e);
  },
  _tileOnError: function (t, e, i) {
    var n = this.options.errorTileUrl;
    n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
  },
  _onTileRemove: function (t) {
    t.tile.onload = null;
  },
  _getZoomForUrl: function () {
    var t = this._tileZoom,
      e = this.options.maxZoom,
      i = this.options.zoomReverse,
      n = this.options.zoomOffset;
    return i && (t = e - t), t + n;
  },
  _getSubdomain: function (t) {
    var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
    return this.options.subdomains[e];
  },
  _abortLoading: function () {
    var t, e;
    for (t in this._tiles) {
      if (
        this._tiles[t].coords.z !== this._tileZoom &&
        ((e = this._tiles[t].el).onload = falseFn,
          e.onerror = falseFn,
          !e.complete)
      ) {
        e.src = emptyImageUrl;
        var i = this._tiles[t].coords;
        remove(e),
          delete this._tiles[t],
          this.fire("tileabort", { tile: e, coords: i });
      }
    }
  },
  _removeTile: function (t) {
    var e = this._tiles[t];
    if (e) {
      return e.el.setAttribute("src", emptyImageUrl),
        GridLayer.prototype._removeTile.call(this, t);
    }
  },
  _tileReady: function (t, e, i) {
    if (this._map && (!i || i.getAttribute("src") !== emptyImageUrl)) {
      return GridLayer.prototype._tileReady.call(this, t, e, i);
    }
  },
});
function tileLayer(t, e) {
  return new TileLayer(t, e);
}
var TileLayerWMS = TileLayer.extend({
  defaultWmsParams: {
    service: "WMS",
    request: "GetMap",
    layers: "",
    styles: "",
    format: "image/jpeg",
    transparent: !1,
    version: "1.1.1",
  },
  options: { crs: null, uppercase: !1 },
  initialize: function (t, e) {
    this._url = t;
    var i = extend({}, this.defaultWmsParams);
    for (var n in e) n in this.options || (i[n] = e[n]);
    var o = (e = setOptions(this, e)).detectRetina && Browser.retina ? 2 : 1,
      s = this.getTileSize();
    i.width = s.x * o, i.height = s.y * o, this.wmsParams = i;
  },
  onAdd: function (t) {
    this._crs = this.options.crs || t.options.crs,
      this._wmsVersion = parseFloat(this.wmsParams.version);
    var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
    this.wmsParams[e] = this._crs.code, TileLayer.prototype.onAdd.call(this, t);
  },
  getTileUrl: function (t) {
    var e = this._tileCoordsToNwSe(t),
      i = this._crs,
      n = toBounds(i.project(e[0]), i.project(e[1])),
      o = n.min,
      s = n.max,
      r = (this._wmsVersion >= 1.3 && this._crs === EPSG4326
        ? [o.y, o.x, s.y, s.x]
        : [o.x, o.y, s.x, s.y]).join(","),
      a = TileLayer.prototype.getTileUrl.call(this, t);
    return a + getParamString(this.wmsParams, a, this.options.uppercase) +
      (this.options.uppercase ? "&BBOX=" : "&bbox=") + r;
  },
  setParams: function (t, e) {
    return extend(this.wmsParams, t), e || this.redraw(), this;
  },
});
function tileLayerWMS(t, e) {
  return new TileLayerWMS(t, e);
}
TileLayer.WMS = TileLayerWMS, tileLayer.wms = tileLayerWMS;
var Renderer = Layer.extend({
    options: { padding: .1 },
    initialize: function (t) {
      setOptions(this, t), stamp(this), this._layers = this._layers || {};
    },
    onAdd: function () {
      this._container ||
      (this._initContainer(),
        addClass(this._container, "leaflet-zoom-animated")),
        this.getPane().appendChild(this._container),
        this._update(),
        this.on("update", this._updatePaths, this);
    },
    onRemove: function () {
      this.off("update", this._updatePaths, this), this._destroyContainer();
    },
    getEvents: function () {
      var t = {
        viewreset: this._reset,
        zoom: this._onZoom,
        moveend: this._update,
        zoomend: this._onZoomEnd,
      };
      return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
    },
    _onAnimZoom: function (t) {
      this._updateTransform(t.center, t.zoom);
    },
    _onZoom: function () {
      this._updateTransform(this._map.getCenter(), this._map.getZoom());
    },
    _updateTransform: function (t, e) {
      var i = this._map.getZoomScale(e, this._zoom),
        n = this._map.getSize().multiplyBy(.5 + this.options.padding),
        o = this._map.project(this._center, e),
        s = n.multiplyBy(-i).add(o).subtract(
          this._map._getNewPixelOrigin(t, e),
        );
      Browser.any3d
        ? setTransform(this._container, s, i)
        : setPosition(this._container, s);
    },
    _reset: function () {
      for (
        var t in this._update(),
          this._updateTransform(this._center, this._zoom),
          this._layers
      ) this._layers[t]._reset();
    },
    _onZoomEnd: function () {
      for (var t in this._layers) this._layers[t]._project();
    },
    _updatePaths: function () {
      for (var t in this._layers) this._layers[t]._update();
    },
    _update: function () {
      var t = this.options.padding,
        e = this._map.getSize(),
        i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
      this._bounds = new Bounds(i, i.add(e.multiplyBy(1 + 2 * t)).round()),
        this._center = this._map.getCenter(),
        this._zoom = this._map.getZoom();
    },
  }),
  Canvas = Renderer.extend({
    options: { tolerance: 0 },
    getEvents: function () {
      var t = Renderer.prototype.getEvents.call(this);
      return t.viewprereset = this._onViewPreReset, t;
    },
    _onViewPreReset: function () {
      this._postponeUpdatePaths = !0;
    },
    onAdd: function () {
      Renderer.prototype.onAdd.call(this), this._draw();
    },
    _initContainer: function () {
      var t = this._container = document.createElement("canvas");
      on(t, "mousemove", this._onMouseMove, this),
        on(
          t,
          "click dblclick mousedown mouseup contextmenu",
          this._onClick,
          this,
        ),
        on(t, "mouseout", this._handleMouseOut, this),
        t._leaflet_disable_events = !0,
        this._ctx = t.getContext("2d");
    },
    _destroyContainer: function () {
      cancelAnimFrame(this._redrawRequest),
        delete this._ctx,
        remove(this._container),
        off(this._container),
        delete this._container;
    },
    _updatePaths: function () {
      var t;
      if (!this._postponeUpdatePaths) {
        for (var e in this._redrawBounds = null, this._layers) {
          (t = this._layers[e])._update();
        }
        this._redraw();
      }
    },
    _update: function () {
      if (!this._map._animatingZoom || !this._bounds) {
        Renderer.prototype._update.call(this);
        var t = this._bounds,
          e = this._container,
          i = t.getSize(),
          n = Browser.retina ? 2 : 1;
        setPosition(e, t.min),
          e.width = n * i.x,
          e.height = n * i.y,
          e.style.width = i.x + "px",
          e.style.height = i.y + "px",
          Browser.retina && this._ctx.scale(2, 2),
          this._ctx.translate(-t.min.x, -t.min.y),
          this.fire("update");
      }
    },
    _reset: function () {
      Renderer.prototype._reset.call(this),
        this._postponeUpdatePaths &&
        (this._postponeUpdatePaths = !1, this._updatePaths());
    },
    _initPath: function (t) {
      this._updateDashArray(t), this._layers[stamp(t)] = t;
      var e = t._order = { layer: t, prev: this._drawLast, next: null };
      this._drawLast && (this._drawLast.next = e),
        this._drawLast = e,
        this._drawFirst = this._drawFirst || this._drawLast;
    },
    _addPath: function (t) {
      this._requestRedraw(t);
    },
    _removePath: function (t) {
      var e = t._order, i = e.next, n = e.prev;
      i ? i.prev = n : this._drawLast = n,
        n ? n.next = i : this._drawFirst = i,
        delete t._order,
        delete this._layers[stamp(t)],
        this._requestRedraw(t);
    },
    _updatePath: function (t) {
      this._extendRedrawBounds(t),
        t._project(),
        t._update(),
        this._requestRedraw(t);
    },
    _updateStyle: function (t) {
      this._updateDashArray(t), this._requestRedraw(t);
    },
    _updateDashArray: function (t) {
      if ("string" == typeof t.options.dashArray) {
        var e, i, n = t.options.dashArray.split(/[, ]+/), o = [];
        for (i = 0; i < n.length; i += 1) {
          if (isNaN(e = Number(n[i]))) return;
          o.push(e);
        }
        t.options._dashArray = o;
      } else t.options._dashArray = t.options.dashArray;
    },
    _requestRedraw: function (t) {
      this._map &&
        (this._extendRedrawBounds(t),
          this._redrawRequest = this._redrawRequest ||
            requestAnimFrame(this._redraw, this));
    },
    _extendRedrawBounds: function (t) {
      if (t._pxBounds) {
        var e = (t.options.weight || 0) + 1;
        this._redrawBounds = this._redrawBounds || new Bounds(),
          this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])),
          this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
      }
    },
    _redraw: function () {
      this._redrawRequest = null,
        this._redrawBounds &&
        (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
        this._clear(),
        this._draw(),
        this._redrawBounds = null;
    },
    _clear: function () {
      var t = this._redrawBounds;
      if (t) {
        var e = t.getSize();
        this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
      } else {this._ctx.save(),
          this._ctx.setTransform(1, 0, 0, 1, 0, 0),
          this._ctx.clearRect(
            0,
            0,
            this._container.width,
            this._container.height,
          ),
          this._ctx.restore();}
    },
    _draw: function () {
      var t, e = this._redrawBounds;
      if (this._ctx.save(), e) {
        var i = e.getSize();
        this._ctx.beginPath(),
          this._ctx.rect(e.min.x, e.min.y, i.x, i.y),
          this._ctx.clip();
      }
      this._drawing = !0;
      for (var n = this._drawFirst; n; n = n.next) {
        t = n.layer,
          (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
      }
      this._drawing = !1, this._ctx.restore();
    },
    _updatePoly: function (t, e) {
      if (this._drawing) {
        var i, n, o, s, r = t._parts, a = r.length, h = this._ctx;
        if (a) {
          for (h.beginPath(), i = 0; i < a; i += 1) {
            for (n = 0, o = r[i].length; n < o; n += 1) {
              s = r[i][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
            }
            e && h.closePath();
          }
          this._fillStroke(h, t);
        }
      }
    },
    _updateCircle: function (t) {
      if (!(!this._drawing || t._empty())) {
        var e = t._point,
          i = this._ctx,
          n = Math.max(Math.round(t._radius), 1),
          o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
        1 !== o && (i.save(), i.scale(1, o)),
          i.beginPath(),
          i.arc(e.x, e.y / o, n, 0, 2 * Math.PI, !1),
          1 !== o && i.restore(),
          this._fillStroke(i, t);
      }
    },
    _fillStroke: function (t, e) {
      var i = e.options;
      i.fill &&
      (t.globalAlpha = i.fillOpacity,
        t.fillStyle = i.fillColor || i.color,
        t.fill(i.fillRule || "evenodd")),
        i.stroke && 0 !== i.weight &&
        (t.setLineDash &&
          t.setLineDash(e.options && e.options._dashArray || []),
          t.globalAlpha = i.opacity,
          t.lineWidth = i.weight,
          t.strokeStyle = i.color,
          t.lineCap = i.lineCap,
          t.lineJoin = i.lineJoin,
          t.stroke());
    },
    _onClick: function (t) {
      for (
        var e, i, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst;
        o;
        o = o.next
      ) {
        (e = o.layer).options.interactive && e._containsPoint(n) &&
          (!("click" === t.type || "preclick" === t.type) ||
            !this._map._draggableMoved(e)) &&
          (i = e);
      }
      this._fireEvent(!!i && [i], t);
    },
    _onMouseMove: function (t) {
      if (
        !(!this._map || this._map.dragging.moving()) &&
        !this._map._animatingZoom
      ) {
        var e = this._map.mouseEventToLayerPoint(t);
        this._handleMouseHover(t, e);
      }
    },
    _handleMouseOut: function (t) {
      var e = this._hoveredLayer;
      e &&
        (removeClass(this._container, "leaflet-interactive"),
          this._fireEvent([e], t, "mouseout"),
          this._hoveredLayer = null,
          this._mouseHoverThrottled = !1);
    },
    _handleMouseHover: function (t, e) {
      if (!this._mouseHoverThrottled) {
        for (var i, n, o = this._drawFirst; o; o = o.next) {
          (i = o.layer).options.interactive && i._containsPoint(e) && (n = i);
        }
        n !== this._hoveredLayer &&
        (this._handleMouseOut(t),
          n &&
          (addClass(this._container, "leaflet-interactive"),
            this._fireEvent([n], t, "mouseover"),
            this._hoveredLayer = n)),
          this._fireEvent(!!this._hoveredLayer && [this._hoveredLayer], t),
          this._mouseHoverThrottled = !0,
          setTimeout(
            bind(function () {
              this._mouseHoverThrottled = !1;
            }, this),
            32,
          );
      }
    },
    _fireEvent: function (t, e, i) {
      this._map._fireDOMEvent(e, i || e.type, t);
    },
    _bringToFront: function (t) {
      var e = t._order;
      if (e) {
        var i = e.next, n = e.prev;
        if (!i) return;
        i.prev = n,
          n ? n.next = i : i && (this._drawFirst = i),
          e.prev = this._drawLast,
          this._drawLast.next = e,
          e.next = null,
          this._drawLast = e,
          this._requestRedraw(t);
      }
    },
    _bringToBack: function (t) {
      var e = t._order;
      if (e) {
        var i = e.next, n = e.prev;
        if (!n) return;
        n.next = i,
          i ? i.prev = n : n && (this._drawLast = n),
          e.prev = null,
          e.next = this._drawFirst,
          this._drawFirst.prev = e,
          this._drawFirst = e,
          this._requestRedraw(t);
      }
    },
  });
function canvas(t) {
  return Browser.canvas ? new Canvas(t) : null;
}
var vmlCreate = function () {
    try {
      return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
        function (t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
    } catch (t) {}
    return function (t) {
      return document.createElement(
        "<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">',
      );
    };
  }(),
  vmlMixin = {
    _initContainer: function () {
      this._container = create$1("div", "leaflet-vml-container");
    },
    _update: function () {
      this._map._animatingZoom ||
        (Renderer.prototype._update.call(this), this.fire("update"));
    },
    _initPath: function (t) {
      var e = t._container = vmlCreate("shape");
      addClass(e, "leaflet-vml-shape " + (this.options.className || "")),
        e.coordsize = "1 1",
        t._path = vmlCreate("path"),
        e.appendChild(t._path),
        this._updateStyle(t),
        this._layers[stamp(t)] = t;
    },
    _addPath: function (t) {
      var e = t._container;
      this._container.appendChild(e),
        t.options.interactive && t.addInteractiveTarget(e);
    },
    _removePath: function (t) {
      var e = t._container;
      remove(e), t.removeInteractiveTarget(e), delete this._layers[stamp(t)];
    },
    _updateStyle: function (t) {
      var e = t._stroke, i = t._fill, n = t.options, o = t._container;
      o.stroked = !!n.stroke,
        o.filled = !!n.fill,
        n.stroke
          ? (e || (e = t._stroke = vmlCreate("stroke")),
            o.appendChild(e),
            e.weight = n.weight + "px",
            e.color = n.color,
            e.opacity = n.opacity,
            n.dashArray
              ? e.dashStyle = isArray(n.dashArray)
                ? n.dashArray.join(" ")
                : n.dashArray.replace(/( *, *)/g, " ")
              : e.dashStyle = "",
            e.endcap = n.lineCap.replace("butt", "flat"),
            e.joinstyle = n.lineJoin)
          : e && (o.removeChild(e), t._stroke = null),
        n.fill
          ? (i || (i = t._fill = vmlCreate("fill")),
            o.appendChild(i),
            i.color = n.fillColor || n.color,
            i.opacity = n.fillOpacity)
          : i && (o.removeChild(i), t._fill = null);
    },
    _updateCircle: function (t) {
      var e = t._point.round(),
        i = Math.round(t._radius),
        n = Math.round(t._radiusY || i);
      this._setPath(
        t,
        t._empty()
          ? "M0 0"
          : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0,23592600",
      );
    },
    _setPath: function (t, e) {
      t._path.v = e;
    },
    _bringToFront: function (t) {
      toFront(t._container);
    },
    _bringToBack: function (t) {
      toBack(t._container);
    },
  },
  create = Browser.vml ? vmlCreate : svgCreate,
  SVG = Renderer.extend({
    _initContainer: function () {
      this._container = create("svg"),
        this._container.setAttribute("pointer-events", "none"),
        this._rootGroup = create("g"),
        this._container.appendChild(this._rootGroup);
    },
    _destroyContainer: function () {
      remove(this._container),
        off(this._container),
        delete this._container,
        delete this._rootGroup,
        delete this._svgSize;
    },
    _update: function () {
      if (!this._map._animatingZoom || !this._bounds) {
        Renderer.prototype._update.call(this);
        var t = this._bounds, e = t.getSize(), i = this._container;
        this._svgSize && this._svgSize.equals(e) ||
        (this._svgSize = e,
          i.setAttribute("width", e.x),
          i.setAttribute("height", e.y)),
          setPosition(i, t.min),
          i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")),
          this.fire("update");
      }
    },
    _initPath: function (t) {
      var e = t._path = create("path");
      t.options.className && addClass(e, t.options.className),
        t.options.interactive && addClass(e, "leaflet-interactive"),
        this._updateStyle(t),
        this._layers[stamp(t)] = t;
    },
    _addPath: function (t) {
      this._rootGroup || this._initContainer(),
        this._rootGroup.appendChild(t._path),
        t.addInteractiveTarget(t._path);
    },
    _removePath: function (t) {
      remove(t._path),
        t.removeInteractiveTarget(t._path),
        delete this._layers[stamp(t)];
    },
    _updatePath: function (t) {
      t._project(), t._update();
    },
    _updateStyle: function (t) {
      var e = t._path, i = t.options;
      e &&
        (i.stroke
          ? (e.setAttribute("stroke", i.color),
            e.setAttribute("stroke-opacity", i.opacity),
            e.setAttribute("stroke-width", i.weight),
            e.setAttribute("stroke-linecap", i.lineCap),
            e.setAttribute("stroke-linejoin", i.lineJoin),
            i.dashArray
              ? e.setAttribute("stroke-dasharray", i.dashArray)
              : e.removeAttribute("stroke-dasharray"),
            i.dashOffset
              ? e.setAttribute("stroke-dashoffset", i.dashOffset)
              : e.removeAttribute("stroke-dashoffset"))
          : e.setAttribute("stroke", "none"),
          i.fill
            ? (e.setAttribute("fill", i.fillColor || i.color),
              e.setAttribute("fill-opacity", i.fillOpacity),
              e.setAttribute("fill-rule", i.fillRule || "evenodd"))
            : e.setAttribute("fill", "none"));
    },
    _updatePoly: function (t, e) {
      this._setPath(t, pointsToPath(t._parts, e));
    },
    _updateCircle: function (t) {
      var e = t._point,
        i = Math.max(Math.round(t._radius), 1),
        n = Math.max(Math.round(t._radiusY), 1) || i,
        o = "a" + i + "," + n + " 0 1,0 ",
        s = t._empty()
          ? "M0 0"
          : "M" + (e.x - i) + "," + e.y + o + 2 * i + ",0 " + o + -(2 * i) +
            ",0 ";
      this._setPath(t, s);
    },
    _setPath: function (t, e) {
      t._path.setAttribute("d", e);
    },
    _bringToFront: function (t) {
      toFront(t._path);
    },
    _bringToBack: function (t) {
      toBack(t._path);
    },
  });
function svg(t) {
  return Browser.svg || Browser.vml ? new SVG(t) : null;
}
Browser.vml && SVG.include(vmlMixin),
  Map.include({
    getRenderer: function (t) {
      var e = t.options.renderer || this._getPaneRenderer(t.options.pane) ||
        this.options.renderer || this._renderer;
      return e || (e = this._renderer = this._createRenderer()),
        this.hasLayer(e) || this.addLayer(e),
        e;
    },
    _getPaneRenderer: function (t) {
      if ("overlayPane" === t || void 0 === t) return !1;
      var e = this._paneRenderers[t];
      return void 0 === e &&
        (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e),
        e;
    },
    _createRenderer: function (t) {
      return this.options.preferCanvas && canvas(t) || svg(t);
    },
  });
var Rectangle = Polygon.extend({
  initialize: function (t, e) {
    Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
  },
  setBounds: function (t) {
    return this.setLatLngs(this._boundsToLatLngs(t));
  },
  _boundsToLatLngs: function (t) {
    return [
      (t = toLatLngBounds(t)).getSouthWest(),
      t.getNorthWest(),
      t.getNorthEast(),
      t.getSouthEast(),
    ];
  },
});
function rectangle(t, e) {
  return new Rectangle(t, e);
}
SVG.create = create,
  SVG.pointsToPath = pointsToPath,
  GeoJSON.geometryToLayer = geometryToLayer,
  GeoJSON.coordsToLatLng = coordsToLatLng,
  GeoJSON.coordsToLatLngs = coordsToLatLngs,
  GeoJSON.latLngToCoords = latLngToCoords,
  GeoJSON.latLngsToCoords = latLngsToCoords,
  GeoJSON.getFeature = getFeature,
  GeoJSON.asFeature = asFeature,
  Map.mergeOptions({ boxZoom: !0 });
var BoxZoom = Handler.extend({
  initialize: function (t) {
    this._map = t,
      this._container = t._container,
      this._pane = t._panes.overlayPane,
      this._resetStateTimeout = 0,
      t.on("unload", this._destroy, this);
  },
  addHooks: function () {
    on(this._container, "mousedown", this._onMouseDown, this);
  },
  removeHooks: function () {
    off(this._container, "mousedown", this._onMouseDown, this);
  },
  moved: function () {
    return this._moved;
  },
  _destroy: function () {
    remove(this._pane), delete this._pane;
  },
  _resetState: function () {
    this._resetStateTimeout = 0, this._moved = !1;
  },
  _clearDeferredResetState: function () {
    0 !== this._resetStateTimeout &&
      (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
  },
  _onMouseDown: function (t) {
    if (!t.shiftKey || 1 !== t.which && 1 !== t.button) return !1;
    this._clearDeferredResetState(),
      this._resetState(),
      disableTextSelection(),
      disableImageDrag(),
      this._startPoint = this._map.mouseEventToContainerPoint(t),
      on(document, {
        contextmenu: stop,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown,
      }, this);
  },
  _onMouseMove: function (t) {
    this._moved ||
    (this._moved = !0,
      this._box = create$1("div", "leaflet-zoom-box", this._container),
      addClass(this._container, "leaflet-crosshair"),
      this._map.fire("boxzoomstart")),
      this._point = this._map.mouseEventToContainerPoint(t);
    var e = new Bounds(this._point, this._startPoint), i = e.getSize();
    setPosition(this._box, e.min),
      this._box.style.width = i.x + "px",
      this._box.style.height = i.y + "px";
  },
  _finish: function () {
    this._moved &&
    (remove(this._box), removeClass(this._container, "leaflet-crosshair")),
      enableTextSelection(),
      enableImageDrag(),
      off(document, {
        contextmenu: stop,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown,
      }, this);
  },
  _onMouseUp: function (t) {
    if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
      this._clearDeferredResetState(),
        this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
      var e = new LatLngBounds(
        this._map.containerPointToLatLng(this._startPoint),
        this._map.containerPointToLatLng(this._point),
      );
      this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
    }
  },
  _onKeyDown: function (t) {
    27 === t.keyCode &&
      (this._finish(), this._clearDeferredResetState(), this._resetState());
  },
});
Map.addInitHook("addHandler", "boxZoom", BoxZoom),
  Map.mergeOptions({ doubleClickZoom: !0 });
var DoubleClickZoom = Handler.extend({
  addHooks: function () {
    this._map.on("dblclick", this._onDoubleClick, this);
  },
  removeHooks: function () {
    this._map.off("dblclick", this._onDoubleClick, this);
  },
  _onDoubleClick: function (t) {
    var e = this._map,
      i = e.getZoom(),
      n = e.options.zoomDelta,
      o = t.originalEvent.shiftKey ? i - n : i + n;
    "center" === e.options.doubleClickZoom
      ? e.setZoom(o)
      : e.setZoomAround(t.containerPoint, o);
  },
});
Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom),
  Map.mergeOptions({
    dragging: !0,
    inertia: !0,
    inertiaDeceleration: 3400,
    inertiaMaxSpeed: 1 / 0,
    easeLinearity: .2,
    worldCopyJump: !1,
    maxBoundsViscosity: 0,
  });
var Drag = Handler.extend({
  addHooks: function () {
    if (!this._draggable) {
      var t = this._map;
      this._draggable = new Draggable(t._mapPane, t._container),
        this._draggable.on({
          dragstart: this._onDragStart,
          drag: this._onDrag,
          dragend: this._onDragEnd,
        }, this),
        this._draggable.on("predrag", this._onPreDragLimit, this),
        t.options.worldCopyJump &&
        (this._draggable.on("predrag", this._onPreDragWrap, this),
          t.on("zoomend", this._onZoomEnd, this),
          t.whenReady(this._onZoomEnd, this));
    }
    addClass(this._map._container, "leaflet-grab leaflet-touch-drag"),
      this._draggable.enable(),
      this._positions = [],
      this._times = [];
  },
  removeHooks: function () {
    removeClass(this._map._container, "leaflet-grab"),
      removeClass(this._map._container, "leaflet-touch-drag"),
      this._draggable.disable();
  },
  moved: function () {
    return this._draggable && this._draggable._moved;
  },
  moving: function () {
    return this._draggable && this._draggable._moving;
  },
  _onDragStart: function () {
    var t = this._map;
    if (
      t._stop(),
        this._map.options.maxBounds && this._map.options.maxBoundsViscosity
    ) {
      var e = toLatLngBounds(this._map.options.maxBounds);
      this._offsetLimit = toBounds(
        this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
        this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(
          this._map.getSize(),
        ),
      ),
        this._viscosity = Math.min(
          1,
          Math.max(0, this._map.options.maxBoundsViscosity),
        );
    } else this._offsetLimit = null;
    t.fire("movestart").fire("dragstart"),
      t.options.inertia && (this._positions = [], this._times = []);
  },
  _onDrag: function (t) {
    if (this._map.options.inertia) {
      var e = this._lastTime = +new Date(),
        i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
      this._positions.push(i), this._times.push(e), this._prunePositions(e);
    }
    this._map.fire("move", t).fire("drag", t);
  },
  _prunePositions: function (t) {
    for (; this._positions.length > 1 && t - this._times[0] > 50;) {
      this._positions.shift(), this._times.shift();
    }
  },
  _onZoomEnd: function () {
    var t = this._map.getSize().divideBy(2),
      e = this._map.latLngToLayerPoint([0, 0]);
    this._initialWorldOffset = e.subtract(t).x,
      this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
  },
  _viscousLimit: function (t, e) {
    return t - (t - e) * this._viscosity;
  },
  _onPreDragLimit: function () {
    if (this._viscosity && this._offsetLimit) {
      var t = this._draggable._newPos.subtract(this._draggable._startPos),
        e = this._offsetLimit;
      t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)),
        t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)),
        t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)),
        t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)),
        this._draggable._newPos = this._draggable._startPos.add(t);
    }
  },
  _onPreDragWrap: function () {
    var t = this._worldWidth,
      e = Math.round(t / 2),
      i = this._initialWorldOffset,
      n = this._draggable._newPos.x,
      o = (n - e + i) % t + e - i,
      s = (n + e + i) % t - e - i;
    this._draggable._absPos = this._draggable._newPos.clone(),
      this._draggable._newPos.x = Math.abs(o + i) < Math.abs(s + i) ? o : s;
  },
  _onDragEnd: function (t) {
    var e = this._map,
      i = e.options,
      n = !i.inertia || t.noInertia || this._times.length < 2;
    if (e.fire("dragend", t), n) e.fire("moveend");
    else {
      this._prunePositions(+new Date());
      var o = this._lastPos.subtract(this._positions[0]),
        s = (this._lastTime - this._times[0]) / 1e3,
        r = i.easeLinearity,
        a = o.multiplyBy(r / s),
        h = a.distanceTo([0, 0]),
        l = Math.min(i.inertiaMaxSpeed, h),
        u = a.multiplyBy(l / h),
        c = l / (i.inertiaDeceleration * r),
        d = u.multiplyBy(-c / 2).round();
      d.x || d.y
        ? (d = e._limitOffset(d, e.options.maxBounds),
          requestAnimFrame(function () {
            e.panBy(d, {
              duration: c,
              easeLinearity: r,
              noMoveStart: !0,
              animate: !0,
            });
          }))
        : e.fire("moveend");
    }
  },
});
Map.addInitHook("addHandler", "dragging", Drag),
  Map.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 });
var Keyboard = Handler.extend({
  keyCodes: {
    left: [37],
    right: [39],
    down: [40],
    up: [38],
    zoomIn: [187, 107, 61, 171],
    zoomOut: [189, 109, 54, 173],
  },
  initialize: function (t) {
    this._map = t,
      this._setPanDelta(t.options.keyboardPanDelta),
      this._setZoomDelta(t.options.zoomDelta);
  },
  addHooks: function () {
    var t = this._map._container;
    t.tabIndex <= 0 && (t.tabIndex = "0"),
      on(t, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown,
      }, this),
      this._map.on({ focus: this._addHooks, blur: this._removeHooks }, this);
  },
  removeHooks: function () {
    this._removeHooks(),
      off(this._map._container, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown,
      }, this),
      this._map.off({ focus: this._addHooks, blur: this._removeHooks }, this);
  },
  _onMouseDown: function () {
    if (!this._focused) {
      var t = document.body,
        e = document.documentElement,
        i = t.scrollTop || e.scrollTop,
        n = t.scrollLeft || e.scrollLeft;
      this._map._container.focus(), window.scrollTo(n, i);
    }
  },
  _onFocus: function () {
    this._focused = !0, this._map.fire("focus");
  },
  _onBlur: function () {
    this._focused = !1, this._map.fire("blur");
  },
  _setPanDelta: function (t) {
    var e, i, n = this._panKeys = {}, o = this.keyCodes;
    for (e = 0, i = o.left.length; e < i; e += 1) n[o.left[e]] = [-1 * t, 0];
    for (e = 0, i = o.right.length; e < i; e += 1) n[o.right[e]] = [t, 0];
    for (e = 0, i = o.down.length; e < i; e += 1) n[o.down[e]] = [0, t];
    for (e = 0, i = o.up.length; e < i; e += 1) n[o.up[e]] = [0, -1 * t];
  },
  _setZoomDelta: function (t) {
    var e, i, n = this._zoomKeys = {}, o = this.keyCodes;
    for (e = 0, i = o.zoomIn.length; e < i; e += 1) n[o.zoomIn[e]] = t;
    for (e = 0, i = o.zoomOut.length; e < i; e += 1) n[o.zoomOut[e]] = -t;
  },
  _addHooks: function () {
    on(document, "keydown", this._onKeyDown, this);
  },
  _removeHooks: function () {
    off(document, "keydown", this._onKeyDown, this);
  },
  _onKeyDown: function (t) {
    if (!t.altKey && !t.ctrlKey && !t.metaKey) {
      var e, i = t.keyCode, n = this._map;
      if (i in this._panKeys) {
        if (!n._panAnim || !n._panAnim._inProgress) {
          if (
            e = this._panKeys[i],
              t.shiftKey && (e = toPoint(e).multiplyBy(3)),
              n.options.maxBounds &&
              (e = n._limitOffset(toPoint(e), n.options.maxBounds)),
              n.options.worldCopyJump
          ) {
            var o = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(e)));
            n.panTo(o);
          } else n.panBy(e);
        }
      } else if (i in this._zoomKeys) {
        n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[i]);
      } else {
        if (27 !== i || !n._popup || !n._popup.options.closeOnEscapeKey) return;
        n.closePopup();
      }
      stop(t);
    }
  },
});
Map.addInitHook("addHandler", "keyboard", Keyboard),
  Map.mergeOptions({
    scrollWheelZoom: !0,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60,
  });
var ScrollWheelZoom = Handler.extend({
  addHooks: function () {
    on(this._map._container, "wheel", this._onWheelScroll, this),
      this._delta = 0;
  },
  removeHooks: function () {
    off(this._map._container, "wheel", this._onWheelScroll, this);
  },
  _onWheelScroll: function (t) {
    var e = getWheelDelta(t), i = this._map.options.wheelDebounceTime;
    this._delta += e,
      this._lastMousePos = this._map.mouseEventToContainerPoint(t),
      this._startTime || (this._startTime = +new Date());
    var n = Math.max(i - (+new Date() - this._startTime), 0);
    clearTimeout(this._timer),
      this._timer = setTimeout(bind(this._performZoom, this), n),
      stop(t);
  },
  _performZoom: function () {
    var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
    t._stop();
    var n = 4 *
        Math.log(
          2 /
            (1 +
              Math.exp(
                -Math.abs(
                  this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                ),
              )),
        ) / Math.LN2,
      o = i ? Math.ceil(n / i) * i : n,
      s = t._limitZoom(e + (this._delta > 0 ? o : -o)) - e;
    this._delta = 0,
      this._startTime = null,
      s && ("center" === t.options.scrollWheelZoom
        ? t.setZoom(e + s)
        : t.setZoomAround(this._lastMousePos, e + s));
  },
});
Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
var tapHoldDelay = 600;
Map.mergeOptions({
  tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
  tapTolerance: 15,
});
var TapHold = Handler.extend({
  addHooks: function () {
    on(this._map._container, "touchstart", this._onDown, this);
  },
  removeHooks: function () {
    off(this._map._container, "touchstart", this._onDown, this);
  },
  _onDown: function (t) {
    if (clearTimeout(this._holdTimeout), 1 === t.touches.length) {
      var e = t.touches[0];
      this._startPos = this._newPos = new Point(e.clientX, e.clientY),
        this._holdTimeout = setTimeout(
          bind(function () {
            this._cancel(),
              this._isTapValid() &&
              (on(document, "touchend", preventDefault),
                on(document, "touchend touchcancel", this._cancelClickPrevent),
                this._simulateEvent("contextmenu", e));
          }, this),
          tapHoldDelay,
        ),
        on(document, "touchend touchcancel contextmenu", this._cancel, this),
        on(document, "touchmove", this._onMove, this);
    }
  },
  _cancelClickPrevent: function t() {
    off(document, "touchend", preventDefault),
      off(document, "touchend touchcancel", t);
  },
  _cancel: function () {
    clearTimeout(this._holdTimeout),
      off(document, "touchend touchcancel contextmenu", this._cancel, this),
      off(document, "touchmove", this._onMove, this);
  },
  _onMove: function (t) {
    var e = t.touches[0];
    this._newPos = new Point(e.clientX, e.clientY);
  },
  _isTapValid: function () {
    return this._newPos.distanceTo(this._startPos) <=
      this._map.options.tapTolerance;
  },
  _simulateEvent: function (t, e) {
    var i = new MouseEvent(t, {
      bubbles: !0,
      cancelable: !0,
      view: window,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
    });
    i._simulated = !0, e.target.dispatchEvent(i);
  },
});
Map.addInitHook("addHandler", "tapHold", TapHold),
  Map.mergeOptions({ touchZoom: Browser.touch, bounceAtZoomLimits: !0 });
var TouchZoom = Handler.extend({
  addHooks: function () {
    addClass(this._map._container, "leaflet-touch-zoom"),
      on(this._map._container, "touchstart", this._onTouchStart, this);
  },
  removeHooks: function () {
    removeClass(this._map._container, "leaflet-touch-zoom"),
      off(this._map._container, "touchstart", this._onTouchStart, this);
  },
  _onTouchStart: function (t) {
    var e = this._map;
    if (
      t.touches && 2 === t.touches.length && !e._animatingZoom && !this._zooming
    ) {
      var i = e.mouseEventToContainerPoint(t.touches[0]),
        n = e.mouseEventToContainerPoint(t.touches[1]);
      this._centerPoint = e.getSize()._divideBy(2),
        this._startLatLng = e.containerPointToLatLng(this._centerPoint),
        "center" !== e.options.touchZoom &&
        (this._pinchStartLatLng = e.containerPointToLatLng(
          i.add(n)._divideBy(2),
        )),
        this._startDist = i.distanceTo(n),
        this._startZoom = e.getZoom(),
        this._moved = !1,
        this._zooming = !0,
        e._stop(),
        on(document, "touchmove", this._onTouchMove, this),
        on(document, "touchend touchcancel", this._onTouchEnd, this),
        preventDefault(t);
    }
  },
  _onTouchMove: function (t) {
    if (t.touches && 2 === t.touches.length && this._zooming) {
      var e = this._map,
        i = e.mouseEventToContainerPoint(t.touches[0]),
        n = e.mouseEventToContainerPoint(t.touches[1]),
        o = i.distanceTo(n) / this._startDist;
      if (
        this._zoom = e.getScaleZoom(o, this._startZoom),
          !e.options.bounceAtZoomLimits &&
          (this._zoom < e.getMinZoom() && o < 1 ||
            this._zoom > e.getMaxZoom() && o > 1) &&
          (this._zoom = e._limitZoom(this._zoom)),
          "center" === e.options.touchZoom
      ) { if (this._center = this._startLatLng, 1 === o) return; } else {
        var s = i._add(n)._divideBy(2)._subtract(this._centerPoint);
        if (1 === o && 0 === s.x && 0 === s.y) return;
        this._center = e.unproject(
          e.project(this._pinchStartLatLng, this._zoom).subtract(s),
          this._zoom,
        );
      }
      this._moved || (e._moveStart(!0, !1), this._moved = !0),
        cancelAnimFrame(this._animRequest);
      var r = bind(e._move, e, this._center, this._zoom, {
        pinch: !0,
        round: !1,
      }, void 0);
      this._animRequest = requestAnimFrame(r, this, !0), preventDefault(t);
    }
  },
  _onTouchEnd: function () {
    if (!this._moved || !this._zooming) {
      this._zooming = !1;
      return;
    }
    this._zooming = !1,
      cancelAnimFrame(this._animRequest),
      off(document, "touchmove", this._onTouchMove, this),
      off(document, "touchend touchcancel", this._onTouchEnd, this),
      this._map.options.zoomAnimation
        ? this._map._animateZoom(
          this._center,
          this._map._limitZoom(this._zoom),
          !0,
          this._map.options.zoomSnap,
        )
        : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
  },
});
Map.addInitHook("addHandler", "touchZoom", TouchZoom),
  Map.BoxZoom = BoxZoom,
  Map.DoubleClickZoom = DoubleClickZoom,
  Map.Drag = Drag,
  Map.Keyboard = Keyboard,
  Map.ScrollWheelZoom = ScrollWheelZoom,
  Map.TapHold = TapHold,
  Map.TouchZoom = TouchZoom;
export {
  bind,
  Bounds,
  Browser,
  Canvas,
  canvas,
  Circle,
  circle,
  CircleMarker,
  circleMarker,
  Class,
  Control,
  control,
  createMap as map,
  CRS,
  DivIcon,
  divIcon,
  DivOverlay,
  DomEvent,
  DomUtil,
  Draggable,
  Evented,
  extend,
  FeatureGroup,
  featureGroup,
  GeoJSON,
  geoJSON,
  geoJson,
  GridLayer,
  gridLayer,
  Handler,
  Icon,
  icon,
  ImageOverlay,
  imageOverlay,
  index as Projection,
  LatLng,
  LatLngBounds,
  Layer,
  LayerGroup,
  layerGroup,
  LineUtil,
  Map,
  Marker,
  marker,
  Mixin,
  Path,
  Point,
  Polygon,
  polygon,
  Polyline,
  polyline,
  PolyUtil,
  Popup,
  popup,
  PosAnimation,
  Rectangle,
  rectangle,
  Renderer,
  setOptions,
  stamp,
  SVG,
  svg,
  SVGOverlay,
  svgOverlay,
  TileLayer,
  tileLayer,
  toBounds as bounds,
  toLatLng as latLng,
  toLatLngBounds as latLngBounds,
  Tooltip,
  tooltip,
  toPoint as point,
  toTransformation as transformation,
  Transformation,
  Util,
  version,
  VideoOverlay,
  videoOverlay,
};
