var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/mithril/render/vnode.js
var require_vnode = __commonJS({
  "node_modules/mithril/render/vnode.js"(exports, module) {
    "use strict";
    function Vnode(tag, key, attrs, children, text, dom) {
      return { tag, key, attrs, children, text, dom, is: void 0, domSize: void 0, state: void 0, events: void 0, instance: void 0 };
    }
    Vnode.normalize = function(node) {
      if (Array.isArray(node)) return Vnode("[", void 0, void 0, Vnode.normalizeChildren(node), void 0, void 0);
      if (node == null || typeof node === "boolean") return null;
      if (typeof node === "object") return node;
      return Vnode("#", void 0, void 0, String(node), void 0, void 0);
    };
    Vnode.normalizeChildren = function(input) {
      var children = [];
      if (input.length) {
        var isKeyed = input[0] != null && input[0].key != null;
        for (var i = 1; i < input.length; i++) {
          if ((input[i] != null && input[i].key != null) !== isKeyed) {
            throw new TypeError(
              isKeyed && (input[i] == null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys."
            );
          }
        }
        for (var i = 0; i < input.length; i++) {
          children[i] = Vnode.normalize(input[i]);
        }
      }
      return children;
    };
    module.exports = Vnode;
  }
});

// node_modules/mithril/render/hyperscriptVnode.js
var require_hyperscriptVnode = __commonJS({
  "node_modules/mithril/render/hyperscriptVnode.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(attrs, children) {
      if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
        if (children.length === 1 && Array.isArray(children[0])) children = children[0];
      } else {
        children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children];
        attrs = void 0;
      }
      return Vnode("", attrs && attrs.key, attrs, children);
    };
  }
});

// node_modules/mithril/util/hasOwn.js
var require_hasOwn = __commonJS({
  "node_modules/mithril/util/hasOwn.js"(exports, module) {
    "use strict";
    module.exports = {}.hasOwnProperty;
  }
});

// node_modules/mithril/render/emptyAttrs.js
var require_emptyAttrs = __commonJS({
  "node_modules/mithril/render/emptyAttrs.js"(exports, module) {
    "use strict";
    module.exports = {};
  }
});

// node_modules/mithril/render/cachedAttrsIsStaticMap.js
var require_cachedAttrsIsStaticMap = __commonJS({
  "node_modules/mithril/render/cachedAttrsIsStaticMap.js"(exports, module) {
    "use strict";
    var emptyAttrs = require_emptyAttrs();
    module.exports = /* @__PURE__ */ new Map([[emptyAttrs, true]]);
  }
});

// node_modules/mithril/render/hyperscript.js
var require_hyperscript = __commonJS({
  "node_modules/mithril/render/hyperscript.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var hyperscriptVnode = require_hyperscriptVnode();
    var hasOwn = require_hasOwn();
    var emptyAttrs = require_emptyAttrs();
    var cachedAttrsIsStaticMap = require_cachedAttrsIsStaticMap();
    var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
    var selectorCache = /* @__PURE__ */ Object.create(null);
    function isEmpty(object) {
      for (var key in object) if (hasOwn.call(object, key)) return false;
      return true;
    }
    function isFormAttributeKey(key) {
      return key === "value" || key === "checked" || key === "selectedIndex" || key === "selected";
    }
    function compileSelector(selector) {
      var match, tag = "div", classes = [], attrs = {}, isStatic = true;
      while (match = selectorParser.exec(selector)) {
        var type = match[1], value = match[2];
        if (type === "" && value !== "") tag = value;
        else if (type === "#") attrs.id = value;
        else if (type === ".") classes.push(value);
        else if (match[3][0] === "[") {
          var attrValue = match[6];
          if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
          if (match[4] === "class") classes.push(attrValue);
          else {
            attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
            if (isFormAttributeKey(match[4])) isStatic = false;
          }
        }
      }
      if (classes.length > 0) attrs.className = classes.join(" ");
      if (isEmpty(attrs)) attrs = emptyAttrs;
      else cachedAttrsIsStaticMap.set(attrs, isStatic);
      return selectorCache[selector] = { tag, attrs, is: attrs.is };
    }
    function execSelector(state2, vnode) {
      vnode.tag = state2.tag;
      var attrs = vnode.attrs;
      if (attrs == null) {
        vnode.attrs = state2.attrs;
        vnode.is = state2.is;
        return vnode;
      }
      var hasClass = hasOwn.call(attrs, "class");
      var className = hasClass ? attrs.class : attrs.className;
      if (state2.attrs !== emptyAttrs) {
        attrs = Object.assign({}, state2.attrs, attrs);
        if (className != null || state2.attrs.className != null) attrs.className = className != null ? state2.attrs.className != null ? String(state2.attrs.className) + " " + String(className) : className : state2.attrs.className;
      } else {
        if (className != null) attrs.className = className;
      }
      if (hasClass) attrs.class = null;
      if (state2.tag === "input" && hasOwn.call(attrs, "type")) {
        attrs = Object.assign({ type: attrs.type }, attrs);
      }
      vnode.is = attrs.is;
      vnode.attrs = attrs;
      return vnode;
    }
    function hyperscript(selector, attrs, ...children) {
      if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
        throw Error("The selector must be either a string or a component.");
      }
      var vnode = hyperscriptVnode(attrs, children);
      if (typeof selector === "string") {
        vnode.children = Vnode.normalizeChildren(vnode.children);
        if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
      }
      if (vnode.attrs == null) vnode.attrs = {};
      vnode.tag = selector;
      return vnode;
    }
    module.exports = hyperscript;
  }
});

// node_modules/mithril/render/trust.js
var require_trust = __commonJS({
  "node_modules/mithril/render/trust.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(html) {
      if (html == null) html = "";
      return Vnode("<", void 0, void 0, html, void 0, void 0);
    };
  }
});

// node_modules/mithril/render/fragment.js
var require_fragment = __commonJS({
  "node_modules/mithril/render/fragment.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var hyperscriptVnode = require_hyperscriptVnode();
    module.exports = function(attrs, ...children) {
      var vnode = hyperscriptVnode(attrs, children);
      if (vnode.attrs == null) vnode.attrs = {};
      vnode.tag = "[";
      vnode.children = Vnode.normalizeChildren(vnode.children);
      return vnode;
    };
  }
});

// node_modules/mithril/hyperscript.js
var require_hyperscript2 = __commonJS({
  "node_modules/mithril/hyperscript.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript();
    hyperscript.trust = require_trust();
    hyperscript.fragment = require_fragment();
    module.exports = hyperscript;
  }
});

// node_modules/mithril/render/domFor.js
var require_domFor = __commonJS({
  "node_modules/mithril/render/domFor.js"(exports, module) {
    "use strict";
    var delayedRemoval = /* @__PURE__ */ new WeakMap();
    function* domFor(vnode) {
      var dom = vnode.dom;
      var domSize = vnode.domSize;
      var generation = delayedRemoval.get(dom);
      if (dom != null) do {
        var nextSibling = dom.nextSibling;
        if (delayedRemoval.get(dom) === generation) {
          yield dom;
          domSize--;
        }
        dom = nextSibling;
      } while (domSize);
    }
    module.exports = {
      delayedRemoval,
      domFor
    };
  }
});

// node_modules/mithril/render/render.js
var require_render = __commonJS({
  "node_modules/mithril/render/render.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var df = require_domFor();
    var delayedRemoval = df.delayedRemoval;
    var domFor = df.domFor;
    var cachedAttrsIsStaticMap = require_cachedAttrsIsStaticMap();
    module.exports = function() {
      var nameSpace = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML"
      };
      var currentRedraw;
      var currentRender;
      function getDocument(dom) {
        return dom.ownerDocument;
      }
      function getNameSpace(vnode) {
        return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
      }
      function checkState(vnode, original) {
        if (vnode.state !== original) throw new Error("'vnode.state' must not be modified.");
      }
      function callHook(vnode) {
        var original = vnode.state;
        try {
          return this.apply(original, arguments);
        } finally {
          checkState(vnode, original);
        }
      }
      function activeElement(dom) {
        try {
          return getDocument(dom).activeElement;
        } catch (e) {
          return null;
        }
      }
      function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
        for (var i = start; i < end; i++) {
          var vnode = vnodes[i];
          if (vnode != null) {
            createNode(parent, vnode, hooks, ns, nextSibling);
          }
        }
      }
      function createNode(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        if (typeof tag === "string") {
          vnode.state = {};
          if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
          switch (tag) {
            case "#":
              createText(parent, vnode, nextSibling);
              break;
            case "<":
              createHTML(parent, vnode, ns, nextSibling);
              break;
            case "[":
              createFragment(parent, vnode, hooks, ns, nextSibling);
              break;
            default:
              createElement(parent, vnode, hooks, ns, nextSibling);
          }
        } else createComponent(parent, vnode, hooks, ns, nextSibling);
      }
      function createText(parent, vnode, nextSibling) {
        vnode.dom = getDocument(parent).createTextNode(vnode.children);
        insertDOM(parent, vnode.dom, nextSibling);
      }
      var possibleParents = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" };
      function createHTML(parent, vnode, ns, nextSibling) {
        var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
        var temp = getDocument(parent).createElement(possibleParents[match[1]] || "div");
        if (ns === "http://www.w3.org/2000/svg") {
          temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
          temp = temp.firstChild;
        } else {
          temp.innerHTML = vnode.children;
        }
        vnode.dom = temp.firstChild;
        vnode.domSize = temp.childNodes.length;
        var fragment = getDocument(parent).createDocumentFragment();
        var child;
        while (child = temp.firstChild) {
          fragment.appendChild(child);
        }
        insertDOM(parent, fragment, nextSibling);
      }
      function createFragment(parent, vnode, hooks, ns, nextSibling) {
        var fragment = getDocument(parent).createDocumentFragment();
        if (vnode.children != null) {
          var children = vnode.children;
          createNodes(fragment, children, 0, children.length, hooks, null, ns);
        }
        vnode.dom = fragment.firstChild;
        vnode.domSize = fragment.childNodes.length;
        insertDOM(parent, fragment, nextSibling);
      }
      function createElement(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        var attrs = vnode.attrs;
        var is = vnode.is;
        ns = getNameSpace(vnode) || ns;
        var element = ns ? is ? getDocument(parent).createElementNS(ns, tag, { is }) : getDocument(parent).createElementNS(ns, tag) : is ? getDocument(parent).createElement(tag, { is }) : getDocument(parent).createElement(tag);
        vnode.dom = element;
        if (attrs != null) {
          setAttrs(vnode, attrs, ns);
        }
        insertDOM(parent, element, nextSibling);
        if (!maybeSetContentEditable(vnode)) {
          if (vnode.children != null) {
            var children = vnode.children;
            createNodes(element, children, 0, children.length, hooks, null, ns);
            if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
          }
        }
      }
      function initComponent(vnode, hooks) {
        var sentinel;
        if (typeof vnode.tag.view === "function") {
          vnode.state = Object.create(vnode.tag);
          sentinel = vnode.state.view;
          if (sentinel.$$reentrantLock$$ != null) return;
          sentinel.$$reentrantLock$$ = true;
        } else {
          vnode.state = void 0;
          sentinel = vnode.tag;
          if (sentinel.$$reentrantLock$$ != null) return;
          sentinel.$$reentrantLock$$ = true;
          vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
        }
        initLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        sentinel.$$reentrantLock$$ = null;
      }
      function createComponent(parent, vnode, hooks, ns, nextSibling) {
        initComponent(vnode, hooks);
        if (vnode.instance != null) {
          createNode(parent, vnode.instance, hooks, ns, nextSibling);
          vnode.dom = vnode.instance.dom;
          vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
        } else {
          vnode.domSize = 0;
        }
      }
      function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
        if (old === vnodes || old == null && vnodes == null) return;
        else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
        else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);
        else {
          var isOldKeyed = old[0] != null && old[0].key != null;
          var isKeyed = vnodes[0] != null && vnodes[0].key != null;
          var start = 0, oldStart = 0;
          if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++;
          if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++;
          if (isOldKeyed !== isKeyed) {
            removeNodes(parent, old, oldStart, old.length);
            createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
          } else if (!isKeyed) {
            var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
            start = start < oldStart ? start : oldStart;
            for (; start < commonLength; start++) {
              o = old[start];
              v = vnodes[start];
              if (o === v || o == null && v == null) continue;
              else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
              else if (v == null) removeNode(parent, o);
              else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
            }
            if (old.length > commonLength) removeNodes(parent, old, start, old.length);
            if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
          } else {
            var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
            while (oldEnd >= oldStart && end >= start) {
              oe = old[oldEnd];
              ve = vnodes[end];
              if (oe.key !== ve.key) break;
              if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
              if (ve.dom != null) nextSibling = ve.dom;
              oldEnd--, end--;
            }
            while (oldEnd >= oldStart && end >= start) {
              o = old[oldStart];
              v = vnodes[start];
              if (o.key !== v.key) break;
              oldStart++, start++;
              if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
            }
            while (oldEnd >= oldStart && end >= start) {
              if (start === end) break;
              if (o.key !== ve.key || oe.key !== v.key) break;
              topSibling = getNextSibling(old, oldStart, nextSibling);
              moveDOM(parent, oe, topSibling);
              if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
              if (++start <= --end) moveDOM(parent, o, nextSibling);
              if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
              if (ve.dom != null) nextSibling = ve.dom;
              oldStart++;
              oldEnd--;
              oe = old[oldEnd];
              ve = vnodes[end];
              o = old[oldStart];
              v = vnodes[start];
            }
            while (oldEnd >= oldStart && end >= start) {
              if (oe.key !== ve.key) break;
              if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
              if (ve.dom != null) nextSibling = ve.dom;
              oldEnd--, end--;
              oe = old[oldEnd];
              ve = vnodes[end];
            }
            if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);
            else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
            else {
              var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
              for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1;
              for (i = end; i >= start; i--) {
                if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
                ve = vnodes[i];
                var oldIndex = map[ve.key];
                if (oldIndex != null) {
                  pos = oldIndex < pos ? oldIndex : -1;
                  oldIndices[i - start] = oldIndex;
                  oe = old[oldIndex];
                  old[oldIndex] = null;
                  if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                  if (ve.dom != null) nextSibling = ve.dom;
                  matched++;
                }
              }
              nextSibling = originalNextSibling;
              if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
              if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
              else {
                if (pos === -1) {
                  lisIndices = makeLisIndices(oldIndices);
                  li = lisIndices.length - 1;
                  for (i = end; i >= start; i--) {
                    v = vnodes[i];
                    if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                    else {
                      if (lisIndices[li] === i - start) li--;
                      else moveDOM(parent, v, nextSibling);
                    }
                    if (v.dom != null) nextSibling = vnodes[i].dom;
                  }
                } else {
                  for (i = end; i >= start; i--) {
                    v = vnodes[i];
                    if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                    if (v.dom != null) nextSibling = vnodes[i].dom;
                  }
                }
              }
            }
          }
        }
      }
      function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
        var oldTag = old.tag, tag = vnode.tag;
        if (oldTag === tag && old.is === vnode.is) {
          vnode.state = old.state;
          vnode.events = old.events;
          if (shouldNotUpdate(vnode, old)) return;
          if (typeof oldTag === "string") {
            if (vnode.attrs != null) {
              updateLifecycle(vnode.attrs, vnode, hooks);
            }
            switch (oldTag) {
              case "#":
                updateText(old, vnode);
                break;
              case "<":
                updateHTML(parent, old, vnode, ns, nextSibling);
                break;
              case "[":
                updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                break;
              default:
                updateElement(old, vnode, hooks, ns);
            }
          } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
        } else {
          removeNode(parent, old);
          createNode(parent, vnode, hooks, ns, nextSibling);
        }
      }
      function updateText(old, vnode) {
        if (old.children.toString() !== vnode.children.toString()) {
          old.dom.nodeValue = vnode.children;
        }
        vnode.dom = old.dom;
      }
      function updateHTML(parent, old, vnode, ns, nextSibling) {
        if (old.children !== vnode.children) {
          removeDOM(parent, old);
          createHTML(parent, vnode, ns, nextSibling);
        } else {
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
        }
      }
      function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
        updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
        var domSize = 0, children = vnode.children;
        vnode.dom = null;
        if (children != null) {
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child != null && child.dom != null) {
              if (vnode.dom == null) vnode.dom = child.dom;
              domSize += child.domSize || 1;
            }
          }
          if (domSize !== 1) vnode.domSize = domSize;
        }
      }
      function updateElement(old, vnode, hooks, ns) {
        var element = vnode.dom = old.dom;
        ns = getNameSpace(vnode) || ns;
        if (old.attrs != vnode.attrs || vnode.attrs != null && !cachedAttrsIsStaticMap.get(vnode.attrs)) {
          updateAttrs(vnode, old.attrs, vnode.attrs, ns);
        }
        if (!maybeSetContentEditable(vnode)) {
          updateNodes(element, old.children, vnode.children, hooks, null, ns);
        }
      }
      function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        updateLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
        if (vnode.instance != null) {
          if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);
          else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
          vnode.dom = vnode.instance.dom;
          vnode.domSize = vnode.instance.domSize;
        } else if (old.instance != null) {
          removeNode(parent, old.instance);
          vnode.dom = void 0;
          vnode.domSize = 0;
        } else {
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
        }
      }
      function getKeyMap(vnodes, start, end) {
        var map = /* @__PURE__ */ Object.create(null);
        for (; start < end; start++) {
          var vnode = vnodes[start];
          if (vnode != null) {
            var key = vnode.key;
            if (key != null) map[key] = start;
          }
        }
        return map;
      }
      var lisTemp = [];
      function makeLisIndices(a) {
        var result = [0];
        var u = 0, v = 0, i = 0;
        var il = lisTemp.length = a.length;
        for (var i = 0; i < il; i++) lisTemp[i] = a[i];
        for (var i = 0; i < il; ++i) {
          if (a[i] === -1) continue;
          var j = result[result.length - 1];
          if (a[j] < a[i]) {
            lisTemp[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
            if (a[result[c]] < a[i]) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (a[i] < a[result[u]]) {
            if (u > 0) lisTemp[i] = result[u - 1];
            result[u] = i;
          }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
          result[u] = v;
          v = lisTemp[v];
        }
        lisTemp.length = 0;
        return result;
      }
      function getNextSibling(vnodes, i, nextSibling) {
        for (; i < vnodes.length; i++) {
          if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
        }
        return nextSibling;
      }
      function moveDOM(parent, vnode, nextSibling) {
        if (vnode.dom != null) {
          var target;
          if (vnode.domSize == null) {
            target = vnode.dom;
          } else {
            target = getDocument(parent).createDocumentFragment();
            for (var dom of domFor(vnode)) target.appendChild(dom);
          }
          insertDOM(parent, target, nextSibling);
        }
      }
      function insertDOM(parent, dom, nextSibling) {
        if (nextSibling != null) parent.insertBefore(dom, nextSibling);
        else parent.appendChild(dom);
      }
      function maybeSetContentEditable(vnode) {
        if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
        vnode.attrs.contentEditable == null) return false;
        var children = vnode.children;
        if (children != null && children.length === 1 && children[0].tag === "<") {
          var content = children[0].children;
          if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
        } else if (children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted.");
        return true;
      }
      function removeNodes(parent, vnodes, start, end) {
        for (var i = start; i < end; i++) {
          var vnode = vnodes[i];
          if (vnode != null) removeNode(parent, vnode);
        }
      }
      function tryBlockRemove(parent, vnode, source, counter) {
        var original = vnode.state;
        var result = callHook.call(source.onbeforeremove, vnode);
        if (result == null) return;
        var generation = currentRender;
        for (var dom of domFor(vnode)) delayedRemoval.set(dom, generation);
        counter.v++;
        Promise.resolve(result).finally(function() {
          checkState(vnode, original);
          tryResumeRemove(parent, vnode, counter);
        });
      }
      function tryResumeRemove(parent, vnode, counter) {
        if (--counter.v === 0) {
          onremove(vnode);
          removeDOM(parent, vnode);
        }
      }
      function removeNode(parent, vnode) {
        var counter = { v: 1 };
        if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.state, counter);
        if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.attrs, counter);
        tryResumeRemove(parent, vnode, counter);
      }
      function removeDOM(parent, vnode) {
        if (vnode.dom == null) return;
        if (vnode.domSize == null) {
          parent.removeChild(vnode.dom);
        } else {
          for (var dom of domFor(vnode)) parent.removeChild(dom);
        }
      }
      function onremove(vnode) {
        if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
        if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);
        if (typeof vnode.tag !== "string") {
          if (vnode.instance != null) onremove(vnode.instance);
        } else {
          if (vnode.events != null) vnode.events._ = null;
          var children = vnode.children;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child != null) onremove(child);
            }
          }
        }
      }
      function setAttrs(vnode, attrs, ns) {
        for (var key in attrs) {
          setAttr(vnode, key, null, attrs[key], ns);
        }
      }
      function setAttr(vnode, key, old, value, ns) {
        if (key === "key" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object") return;
        if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
        if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
        else if (key === "style") updateStyle(vnode.dom, old, value);
        else if (hasPropertyKey(vnode, key, ns)) {
          if (key === "value") {
            if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value) return;
            if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return;
            if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
            if (vnode.tag === "input" && vnode.attrs.type === "file" && "" + value !== "") {
              console.error("`value` is read-only on file inputs!");
              return;
            }
          }
          if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value);
          else vnode.dom[key] = value;
        } else {
          if (typeof value === "boolean") {
            if (value) vnode.dom.setAttribute(key, "");
            else vnode.dom.removeAttribute(key);
          } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
        }
      }
      function removeAttr(vnode, key, old, ns) {
        if (key === "key" || old == null || isLifecycleMethod(key)) return;
        if (key[0] === "o" && key[1] === "n") updateEvent(vnode, key, void 0);
        else if (key === "style") updateStyle(vnode.dom, old, null);
        else if (hasPropertyKey(vnode, key, ns) && key !== "className" && key !== "title" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement(vnode.dom))) && !(vnode.tag === "input" && key === "type")) {
          vnode.dom[key] = null;
        } else {
          var nsLastIndex = key.indexOf(":");
          if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
          if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
        }
      }
      function setLateSelectAttrs(vnode, attrs) {
        if ("value" in attrs) {
          if (attrs.value === null) {
            if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
          } else {
            var normalized = "" + attrs.value;
            if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
              vnode.dom.value = normalized;
            }
          }
        }
        if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, void 0);
      }
      function updateAttrs(vnode, old, attrs, ns) {
        var val;
        if (old != null) {
          if (old === attrs && !cachedAttrsIsStaticMap.has(attrs)) {
            console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");
          }
          for (var key in old) {
            if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) {
              removeAttr(vnode, key, val, ns);
            }
          }
        }
        if (attrs != null) {
          for (var key in attrs) {
            setAttr(vnode, key, old && old[key], attrs[key], ns);
          }
        }
      }
      function isFormAttribute(vnode, attr) {
        return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && (vnode.dom === activeElement(vnode.dom) || vnode.tag === "option" && vnode.dom.parentNode === activeElement(vnode.dom));
      }
      function isLifecycleMethod(attr) {
        return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
      }
      function hasPropertyKey(vnode, key, ns) {
        return ns === void 0 && // If it's a custom element, just keep it.
        (vnode.tag.indexOf("-") > -1 || vnode.is || // If it's a normal element, let's try to avoid a few browser bugs.
        key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode.dom;
      }
      function updateStyle(element, old, style) {
        if (old === style) {
        } else if (style == null) {
          element.style = "";
        } else if (typeof style !== "object") {
          element.style = style;
        } else if (old == null || typeof old !== "object") {
          element.style = "";
          for (var key in style) {
            var value = style[key];
            if (value != null) {
              if (key.includes("-")) element.style.setProperty(key, String(value));
              else element.style[key] = String(value);
            }
          }
        } else {
          for (var key in old) {
            if (old[key] != null && style[key] == null) {
              if (key.includes("-")) element.style.removeProperty(key);
              else element.style[key] = "";
            }
          }
          for (var key in style) {
            var value = style[key];
            if (value != null && (value = String(value)) !== String(old[key])) {
              if (key.includes("-")) element.style.setProperty(key, value);
              else element.style[key] = value;
            }
          }
        }
      }
      function EventDict() {
        this._ = currentRedraw;
      }
      EventDict.prototype = /* @__PURE__ */ Object.create(null);
      EventDict.prototype.handleEvent = function(ev) {
        var handler = this["on" + ev.type];
        var result;
        if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);
        else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
        var self = this;
        if (self._ != null) {
          if (ev.redraw !== false) (0, self._)();
          if (result != null && typeof result.then === "function") {
            Promise.resolve(result).then(function() {
              if (self._ != null && ev.redraw !== false) (0, self._)();
            });
          }
        }
        if (result === false) {
          ev.preventDefault();
          ev.stopPropagation();
        }
      };
      function updateEvent(vnode, key, value) {
        if (vnode.events != null) {
          vnode.events._ = currentRedraw;
          if (vnode.events[key] === value) return;
          if (value != null && (typeof value === "function" || typeof value === "object")) {
            if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
          } else {
            if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = void 0;
          }
        } else if (value != null && (typeof value === "function" || typeof value === "object")) {
          vnode.events = new EventDict();
          vnode.dom.addEventListener(key.slice(2), vnode.events, false);
          vnode.events[key] = value;
        }
      }
      function initLifecycle(source, vnode, hooks) {
        if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
        if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
      }
      function updateLifecycle(source, vnode, hooks) {
        if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
      }
      function shouldNotUpdate(vnode, old) {
        do {
          if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
            var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
            if (force !== void 0 && !force) break;
          }
          if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
            var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
            if (force !== void 0 && !force) break;
          }
          return false;
        } while (false);
        vnode.dom = old.dom;
        vnode.domSize = old.domSize;
        vnode.instance = old.instance;
        vnode.attrs = old.attrs;
        vnode.children = old.children;
        vnode.text = old.text;
        return true;
      }
      var currentDOM;
      return function(dom, vnodes, redraw) {
        if (!dom) throw new TypeError("DOM element being rendered to does not exist.");
        if (currentDOM != null && dom.contains(currentDOM)) {
          throw new TypeError("Node is currently being rendered to and thus is locked.");
        }
        var prevRedraw = currentRedraw;
        var prevDOM = currentDOM;
        var hooks = [];
        var active = activeElement(dom);
        var namespace = dom.namespaceURI;
        currentDOM = dom;
        currentRedraw = typeof redraw === "function" ? redraw : void 0;
        currentRender = {};
        try {
          if (dom.vnodes == null) dom.textContent = "";
          vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
          updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? void 0 : namespace);
          dom.vnodes = vnodes;
          if (active != null && activeElement(dom) !== active && typeof active.focus === "function") active.focus();
          for (var i = 0; i < hooks.length; i++) hooks[i]();
        } finally {
          currentRedraw = prevRedraw;
          currentDOM = prevDOM;
        }
      };
    };
  }
});

// node_modules/mithril/render.js
var require_render2 = __commonJS({
  "node_modules/mithril/render.js"(exports, module) {
    "use strict";
    module.exports = require_render()(typeof window !== "undefined" ? window : null);
  }
});

// node_modules/mithril/api/mount-redraw.js
var require_mount_redraw = __commonJS({
  "node_modules/mithril/api/mount-redraw.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(render, schedule, console2) {
      var subscriptions = [];
      var pending = false;
      var offset = -1;
      function sync() {
        for (offset = 0; offset < subscriptions.length; offset += 2) {
          try {
            render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw);
          } catch (e) {
            console2.error(e);
          }
        }
        offset = -1;
      }
      function redraw() {
        if (!pending) {
          pending = true;
          schedule(function() {
            pending = false;
            sync();
          });
        }
      }
      redraw.sync = sync;
      function mount(root, component) {
        if (component != null && component.view == null && typeof component !== "function") {
          throw new TypeError("m.mount expects a component, not a vnode.");
        }
        var index = subscriptions.indexOf(root);
        if (index >= 0) {
          subscriptions.splice(index, 2);
          if (index <= offset) offset -= 2;
          render(root, []);
        }
        if (component != null) {
          subscriptions.push(root, component);
          render(root, Vnode(component), redraw);
        }
      }
      return { mount, redraw };
    };
  }
});

// node_modules/mithril/mount-redraw.js
var require_mount_redraw2 = __commonJS({
  "node_modules/mithril/mount-redraw.js"(exports, module) {
    "use strict";
    var render = require_render2();
    module.exports = require_mount_redraw()(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);
  }
});

// node_modules/mithril/querystring/build.js
var require_build = __commonJS({
  "node_modules/mithril/querystring/build.js"(exports, module) {
    "use strict";
    module.exports = function(object) {
      if (Object.prototype.toString.call(object) !== "[object Object]") return "";
      var args = [];
      for (var key in object) {
        destructure(key, object[key]);
      }
      return args.join("&");
      function destructure(key2, value) {
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            destructure(key2 + "[" + i + "]", value[i]);
          }
        } else if (Object.prototype.toString.call(value) === "[object Object]") {
          for (var i in value) {
            destructure(key2 + "[" + i + "]", value[i]);
          }
        } else args.push(encodeURIComponent(key2) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
      }
    };
  }
});

// node_modules/mithril/pathname/build.js
var require_build2 = __commonJS({
  "node_modules/mithril/pathname/build.js"(exports, module) {
    "use strict";
    var buildQueryString = require_build();
    module.exports = function(template, params) {
      if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
        throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
      }
      if (params == null) return template;
      var queryIndex = template.indexOf("?");
      var hashIndex = template.indexOf("#");
      var queryEnd = hashIndex < 0 ? template.length : hashIndex;
      var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
      var path = template.slice(0, pathEnd);
      var query = {};
      Object.assign(query, params);
      var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m11, key, variadic) {
        delete query[key];
        if (params[key] == null) return m11;
        return variadic ? params[key] : encodeURIComponent(String(params[key]));
      });
      var newQueryIndex = resolved.indexOf("?");
      var newHashIndex = resolved.indexOf("#");
      var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
      var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
      var result = resolved.slice(0, newPathEnd);
      if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
      if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
      var querystring = buildQueryString(query);
      if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
      if (hashIndex >= 0) result += template.slice(hashIndex);
      if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
      return result;
    };
  }
});

// node_modules/mithril/request/request.js
var require_request = __commonJS({
  "node_modules/mithril/request/request.js"(exports, module) {
    "use strict";
    var buildPathname = require_build2();
    var hasOwn = require_hasOwn();
    module.exports = function($window, oncompletion) {
      function PromiseProxy(executor) {
        return new Promise(executor);
      }
      function makeRequest(url, args) {
        return new Promise(function(resolve, reject) {
          url = buildPathname(url, args.params);
          var method = args.method != null ? args.method.toUpperCase() : "GET";
          var body = args.body;
          var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams);
          var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
          var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false;
          var original = xhr, replacedAbort;
          var abort = xhr.abort;
          xhr.abort = function() {
            aborted = true;
            abort.call(this);
          };
          xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : void 0, typeof args.password === "string" ? args.password : void 0);
          if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          }
          if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
            xhr.setRequestHeader("Accept", "application/json, text/*");
          }
          if (args.withCredentials) xhr.withCredentials = args.withCredentials;
          if (args.timeout) xhr.timeout = args.timeout;
          xhr.responseType = responseType;
          for (var key in args.headers) {
            if (hasOwn.call(args.headers, key)) {
              xhr.setRequestHeader(key, args.headers[key]);
            }
          }
          xhr.onreadystatechange = function(ev) {
            if (aborted) return;
            if (ev.target.readyState === 4) {
              try {
                var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                var response = ev.target.response, message;
                if (responseType === "json") {
                  if (!ev.target.responseType && typeof args.extract !== "function") {
                    try {
                      response = JSON.parse(ev.target.responseText);
                    } catch (e) {
                      response = null;
                    }
                  }
                } else if (!responseType || responseType === "text") {
                  if (response == null) response = ev.target.responseText;
                }
                if (typeof args.extract === "function") {
                  response = args.extract(ev.target, args);
                  success = true;
                } else if (typeof args.deserialize === "function") {
                  response = args.deserialize(response);
                }
                if (success) {
                  if (typeof args.type === "function") {
                    if (Array.isArray(response)) {
                      for (var i = 0; i < response.length; i++) {
                        response[i] = new args.type(response[i]);
                      }
                    } else response = new args.type(response);
                  }
                  resolve(response);
                } else {
                  var completeErrorResponse = function() {
                    try {
                      message = ev.target.responseText;
                    } catch (e) {
                      message = response;
                    }
                    var error = new Error(message);
                    error.code = ev.target.status;
                    error.response = response;
                    reject(error);
                  };
                  if (xhr.status === 0) {
                    setTimeout(function() {
                      if (isTimeout) return;
                      completeErrorResponse();
                    });
                  } else completeErrorResponse();
                }
              } catch (e) {
                reject(e);
              }
            }
          };
          xhr.ontimeout = function(ev) {
            isTimeout = true;
            var error = new Error("Request timed out");
            error.code = ev.target.status;
            reject(error);
          };
          if (typeof args.config === "function") {
            xhr = args.config(xhr, args, url) || xhr;
            if (xhr !== original) {
              replacedAbort = xhr.abort;
              xhr.abort = function() {
                aborted = true;
                replacedAbort.call(this);
              };
            }
          }
          if (body == null) xhr.send();
          else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
          else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams) xhr.send(body);
          else xhr.send(JSON.stringify(body));
        });
      }
      PromiseProxy.prototype = Promise.prototype;
      PromiseProxy.__proto__ = Promise;
      function hasHeader(args, name) {
        for (var key in args.headers) {
          if (hasOwn.call(args.headers, key) && key.toLowerCase() === name) return true;
        }
        return false;
      }
      return {
        request: function(url, args) {
          if (typeof url !== "string") {
            args = url;
            url = url.url;
          } else if (args == null) args = {};
          var promise = makeRequest(url, args);
          if (args.background === true) return promise;
          var count = 0;
          function complete() {
            if (--count === 0 && typeof oncompletion === "function") oncompletion();
          }
          return wrap(promise);
          function wrap(promise2) {
            var then = promise2.then;
            promise2.constructor = PromiseProxy;
            promise2.then = function() {
              count++;
              var next = then.apply(promise2, arguments);
              next.then(complete, function(e) {
                complete();
                if (count === 0) throw e;
              });
              return wrap(next);
            };
            return promise2;
          }
        }
      };
    };
  }
});

// node_modules/mithril/request.js
var require_request2 = __commonJS({
  "node_modules/mithril/request.js"(exports, module) {
    "use strict";
    var mountRedraw = require_mount_redraw2();
    module.exports = require_request()(typeof window !== "undefined" ? window : null, mountRedraw.redraw);
  }
});

// node_modules/mithril/querystring/parse.js
var require_parse = __commonJS({
  "node_modules/mithril/querystring/parse.js"(exports, module) {
    "use strict";
    function decodeURIComponentSave(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return str;
      }
    }
    module.exports = function(string) {
      if (string === "" || string == null) return {};
      if (string.charAt(0) === "?") string = string.slice(1);
      var entries = string.split("&"), counters = {}, data = {};
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i].split("=");
        var key = decodeURIComponentSave(entry[0]);
        var value = entry.length === 2 ? decodeURIComponentSave(entry[1]) : "";
        if (value === "true") value = true;
        else if (value === "false") value = false;
        var levels = key.split(/\]\[?|\[/);
        var cursor = data;
        if (key.indexOf("[") > -1) levels.pop();
        for (var j = 0; j < levels.length; j++) {
          var level = levels[j], nextLevel = levels[j + 1];
          var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
          if (level === "") {
            var key = levels.slice(0, j).join();
            if (counters[key] == null) {
              counters[key] = Array.isArray(cursor) ? cursor.length : 0;
            }
            level = counters[key]++;
          } else if (level === "__proto__") break;
          if (j === levels.length - 1) cursor[level] = value;
          else {
            var desc = Object.getOwnPropertyDescriptor(cursor, level);
            if (desc != null) desc = desc.value;
            if (desc == null) cursor[level] = desc = isNumber ? [] : {};
            cursor = desc;
          }
        }
      }
      return data;
    };
  }
});

// node_modules/mithril/pathname/parse.js
var require_parse2 = __commonJS({
  "node_modules/mithril/pathname/parse.js"(exports, module) {
    "use strict";
    var parseQueryString = require_parse();
    module.exports = function(url) {
      var queryIndex = url.indexOf("?");
      var hashIndex = url.indexOf("#");
      var queryEnd = hashIndex < 0 ? url.length : hashIndex;
      var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
      var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
      if (!path) path = "/";
      else {
        if (path[0] !== "/") path = "/" + path;
      }
      return {
        path,
        params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
      };
    };
  }
});

// node_modules/mithril/pathname/compileTemplate.js
var require_compileTemplate = __commonJS({
  "node_modules/mithril/pathname/compileTemplate.js"(exports, module) {
    "use strict";
    var parsePathname = require_parse2();
    module.exports = function(template) {
      var templateData = parsePathname(template);
      var templateKeys = Object.keys(templateData.params);
      var keys = [];
      var regexp = new RegExp("^" + templateData.path.replace(
        // I escape literal text so people can use things like `:file.:ext` or
        // `:lang-:locale` in routes. This is all merged into one pass so I
        // don't also accidentally escape `-` and make it harder to detect it to
        // ban it from template parameters.
        /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
        function(m11, key, extra) {
          if (key == null) return "\\" + m11;
          keys.push({ k: key, r: extra === "..." });
          if (extra === "...") return "(.*)";
          if (extra === ".") return "([^/]+)\\.";
          return "([^/]+)" + (extra || "");
        }
      ) + "\\/?$");
      return function(data) {
        for (var i = 0; i < templateKeys.length; i++) {
          if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
        }
        if (!keys.length) return regexp.test(data.path);
        var values = regexp.exec(data.path);
        if (values == null) return false;
        for (var i = 0; i < keys.length; i++) {
          data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
        }
        return true;
      };
    };
  }
});

// node_modules/mithril/util/censor.js
var require_censor = __commonJS({
  "node_modules/mithril/util/censor.js"(exports, module) {
    "use strict";
    var hasOwn = require_hasOwn();
    var magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
    module.exports = function(attrs, extras) {
      var result = {};
      if (extras != null) {
        for (var key in attrs) {
          if (hasOwn.call(attrs, key) && !magic.test(key) && extras.indexOf(key) < 0) {
            result[key] = attrs[key];
          }
        }
      } else {
        for (var key in attrs) {
          if (hasOwn.call(attrs, key) && !magic.test(key)) {
            result[key] = attrs[key];
          }
        }
      }
      return result;
    };
  }
});

// node_modules/mithril/api/router.js
var require_router = __commonJS({
  "node_modules/mithril/api/router.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var m11 = require_hyperscript();
    var buildPathname = require_build2();
    var parsePathname = require_parse2();
    var compileTemplate = require_compileTemplate();
    var censor = require_censor();
    function decodeURIComponentSave(component) {
      try {
        return decodeURIComponent(component);
      } catch (e) {
        return component;
      }
    }
    module.exports = function($window, mountRedraw) {
      var callAsync = $window == null ? null : typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout;
      var p = Promise.resolve();
      var scheduled = false;
      var ready = false;
      var hasBeenResolved = false;
      var dom, compiled, fallbackRoute;
      var currentResolver, component, attrs, currentPath, lastUpdate;
      var RouterRoot = {
        onremove: function() {
          ready = hasBeenResolved = false;
          $window.removeEventListener("popstate", fireAsync, false);
        },
        view: function() {
          var vnode = Vnode(component, attrs.key, attrs);
          if (currentResolver) return currentResolver.render(vnode);
          return [vnode];
        }
      };
      var SKIP = route.SKIP = {};
      function resolveRoute() {
        scheduled = false;
        var prefix = $window.location.hash;
        if (route.prefix[0] !== "#") {
          prefix = $window.location.search + prefix;
          if (route.prefix[0] !== "?") {
            prefix = $window.location.pathname + prefix;
            if (prefix[0] !== "/") prefix = "/" + prefix;
          }
        }
        var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponentSave).slice(route.prefix.length);
        var data = parsePathname(path);
        Object.assign(data.params, $window.history.state);
        function reject(e) {
          console.error(e);
          route.set(fallbackRoute, null, { replace: true });
        }
        loop(0);
        function loop(i) {
          for (; i < compiled.length; i++) {
            if (compiled[i].check(data)) {
              var payload = compiled[i].component;
              var matchedRoute = compiled[i].route;
              var localComp = payload;
              var update = lastUpdate = function(comp) {
                if (update !== lastUpdate) return;
                if (comp === SKIP) return loop(i + 1);
                component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                attrs = data.params, currentPath = path, lastUpdate = null;
                currentResolver = payload.render ? payload : null;
                if (hasBeenResolved) mountRedraw.redraw();
                else {
                  hasBeenResolved = true;
                  mountRedraw.mount(dom, RouterRoot);
                }
              };
              if (payload.view || typeof payload === "function") {
                payload = {};
                update(localComp);
              } else if (payload.onmatch) {
                p.then(function() {
                  return payload.onmatch(data.params, path, matchedRoute);
                }).then(update, path === fallbackRoute ? null : reject);
              } else update(
                /* "div" */
              );
              return;
            }
          }
          if (path === fallbackRoute) {
            throw new Error("Could not resolve default route " + fallbackRoute + ".");
          }
          route.set(fallbackRoute, null, { replace: true });
        }
      }
      function fireAsync() {
        if (!scheduled) {
          scheduled = true;
          callAsync(resolveRoute);
        }
      }
      function route(root, defaultRoute, routes) {
        if (!root) throw new TypeError("DOM element being rendered to does not exist.");
        compiled = Object.keys(routes).map(function(route2) {
          if (route2[0] !== "/") throw new SyntaxError("Routes must start with a '/'.");
          if (/:([^\/\.-]+)(\.{3})?:/.test(route2)) {
            throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
          }
          return {
            route: route2,
            component: routes[route2],
            check: compileTemplate(route2)
          };
        });
        fallbackRoute = defaultRoute;
        if (defaultRoute != null) {
          var defaultData = parsePathname(defaultRoute);
          if (!compiled.some(function(i) {
            return i.check(defaultData);
          })) {
            throw new ReferenceError("Default route doesn't match any known routes.");
          }
        }
        dom = root;
        $window.addEventListener("popstate", fireAsync, false);
        ready = true;
        resolveRoute();
      }
      route.set = function(path, data, options) {
        if (lastUpdate != null) {
          options = options || {};
          options.replace = true;
        }
        lastUpdate = null;
        path = buildPathname(path, data);
        if (ready) {
          fireAsync();
          var state2 = options ? options.state : null;
          var title = options ? options.title : null;
          if (options && options.replace) $window.history.replaceState(state2, title, route.prefix + path);
          else $window.history.pushState(state2, title, route.prefix + path);
        } else {
          $window.location.href = route.prefix + path;
        }
      };
      route.get = function() {
        return currentPath;
      };
      route.prefix = "#!";
      route.Link = {
        view: function(vnode) {
          var child = m11(
            vnode.attrs.selector || "a",
            censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
            vnode.children
          );
          var options, onclick2, href;
          if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
            child.attrs.href = null;
            child.attrs["aria-disabled"] = "true";
          } else {
            options = vnode.attrs.options;
            onclick2 = vnode.attrs.onclick;
            href = buildPathname(child.attrs.href, vnode.attrs.params);
            child.attrs.href = route.prefix + href;
            child.attrs.onclick = function(e) {
              var result;
              if (typeof onclick2 === "function") {
                result = onclick2.call(e.currentTarget, e);
              } else if (onclick2 == null || typeof onclick2 !== "object") {
              } else if (typeof onclick2.handleEvent === "function") {
                onclick2.handleEvent(e);
              }
              if (
                // Skip if `onclick` prevented default
                result !== false && !e.defaultPrevented && // Ignore everything but left clicks
                (e.button === 0 || e.which === 0 || e.which === 1) && // Let the browser handle `target=_blank`, etc.
                (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
              ) {
                e.preventDefault();
                e.redraw = false;
                route.set(href, null, options);
              }
            };
          }
          return child;
        }
      };
      route.param = function(key) {
        return attrs && key != null ? attrs[key] : attrs;
      };
      return route;
    };
  }
});

// node_modules/mithril/route.js
var require_route = __commonJS({
  "node_modules/mithril/route.js"(exports, module) {
    "use strict";
    var mountRedraw = require_mount_redraw2();
    module.exports = require_router()(typeof window !== "undefined" ? window : null, mountRedraw);
  }
});

// node_modules/mithril/index.js
var require_mithril = __commonJS({
  "node_modules/mithril/index.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript2();
    var request = require_request2();
    var mountRedraw = require_mount_redraw2();
    var domFor = require_domFor();
    var m11 = function m12() {
      return hyperscript.apply(this, arguments);
    };
    m11.m = hyperscript;
    m11.trust = hyperscript.trust;
    m11.fragment = hyperscript.fragment;
    m11.Fragment = "[";
    m11.mount = mountRedraw.mount;
    m11.route = require_route();
    m11.render = require_render2();
    m11.redraw = mountRedraw.redraw;
    m11.request = request.request;
    m11.parseQueryString = require_parse();
    m11.buildQueryString = require_build();
    m11.parsePathname = require_parse2();
    m11.buildPathname = require_build2();
    m11.vnode = require_vnode();
    m11.censor = require_censor();
    m11.domFor = domFor.domFor;
    module.exports = m11;
  }
});

// ts/index.ts
var import_mithril10 = __toESM(require_mithril());

// ts/app.ts
var import_mithril9 = __toESM(require_mithril());

// ts/components/header.ts
var import_mithril = __toESM(require_mithril());

// ts/events.ts
function broadcast(label, detail) {
  console.info(`broadcasting event: ${label}`, detail);
  document.dispatchEvent(
    new CustomEvent(label, {
      detail
    })
  );
}

// ts/components/header.ts
function BurgerMenu() {
  const onclick2 = (_) => {
    broadcast("click_burger_menu", {});
  };
  return {
    view() {
      return (0, import_mithril.default)("a", { href: "/", onclick: onclick2 }, (0, import_mithril.default)("span.burger", "\u039E"));
    }
  };
}
function HeaderBrandText() {
  const BRAND_TEXT = "photos";
  return {
    view() {
      return (0, import_mithril.default)("a", { href: "/" }, (0, import_mithril.default)("span.brand", BRAND_TEXT));
    }
  };
}
function RSSIcon() {
  const SVG_PATH = (0, import_mithril.default)("path", {
    fill: "#ff9132",
    d: "M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"
  });
  return {
    view() {
      return (0, import_mithril.default)("a.rss", { title: "rss", href: "/manifest/atom-index.xml" }, [
        (0, import_mithril.default)("svg", {
          alt: "rss",
          width: "25px",
          height: "25px",
          viewBox: "0 0 32 32",
          style: "position: relative; top: 5px;"
        }, [
          SVG_PATH
        ])
      ]);
    }
  };
}
function ThemeSwitch() {
  return {
    view(vnode) {
      const text = vnode.attrs.darkMode ? "\u2600\uFE0F" : "\u{1F319}";
      return (0, import_mithril.default)(
        "a",
        {},
        (0, import_mithril.default)("span.brand.switch", {
          onclick: () => {
            broadcast("switch_theme", {});
          }
        }, text)
      );
    }
  };
}
function Header() {
  return {
    view(vnode) {
      return (0, import_mithril.default)("nav.header", { role: "navigation" }, [
        (0, import_mithril.default)("ul", [
          (0, import_mithril.default)("li", {}, (0, import_mithril.default)(BurgerMenu())),
          (0, import_mithril.default)("li", {}, (0, import_mithril.default)(HeaderBrandText())),
          (0, import_mithril.default)("li.rss-tag", { style: "float: right" }, (0, import_mithril.default)(RSSIcon())),
          (0, import_mithril.default)(
            "li",
            { style: "float: right" },
            (0, import_mithril.default)(ThemeSwitch(), {
              darkMode: vnode.attrs.darkMode
            })
          )
        ])
      ]);
    }
  };
}

// ts/services/dark-mode.ts
var DarkModes = class {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }
  static save(value) {
    return localStorage.setItem("darkMode", `${value}`);
  }
};

// node_modules/@rgrannell1/tribbledb/dist/mod.js
var IndexedSet = class {
  #idx;
  #map;
  #reverseMap;
  constructor() {
    this.#idx = 0;
    this.#map = /* @__PURE__ */ new Map();
    this.#reverseMap = /* @__PURE__ */ new Map();
  }
  /*
   * Return the underlying map of values to indices
   */
  map() {
    return this.#map;
  }
  /*
   * Return the underlying map of indices to values
   */
  reverseMap() {
    return this.#reverseMap;
  }
  /*
   * Add a value to the set, and return its index
   */
  add(value) {
    if (this.#map.has(value)) {
      return this.#map.get(value);
    }
    this.#map.set(value, this.#idx);
    this.#reverseMap.set(this.#idx, value);
    this.#idx++;
    return this.#idx - 1;
  }
  /**
   * Set the index for a value in the set
   */
  setIndex(value, index) {
    this.#map.set(value, index);
    this.#reverseMap.set(index, value);
  }
  /**
   * Get the index for a value in the set
   */
  getIndex(value) {
    return this.#map.get(value);
  }
  /**
   * Set the values for an index in the set
   */
  getValue(idx) {
    return this.#reverseMap.get(idx);
  }
  /**
   * Does this structure have a value?
   */
  has(value) {
    return this.#map.has(value);
  }
};
var Sets = class {
  /*
   * Compute the intersection of multiple numeric sets.
   * The number of sets will be low (we're not adding ninety
   * query parameters to these URNs) so first sort the
   * sets in ascending size.
   */
  static intersection(metrics, sets) {
    if (sets.length === 0) {
      return /* @__PURE__ */ new Set();
    }
    sets.sort((setA, setB) => {
      return setA.size - setB.size;
    });
    const acc = new Set(sets[0]);
    for (let idx = 1; idx < sets.length; idx++) {
      const currentSet = sets[idx];
      for (const value of acc) {
        metrics.setCheck();
        if (!currentSet.has(value)) {
          acc.delete(value);
        }
      }
      if (acc.size === 0) {
        break;
      }
    }
    return acc;
  }
};
function parseUrn(urn, namespace = "r\xF3") {
  if (!urn.startsWith(`urn:${namespace}:`)) {
    throw new Error(`Invalid URN for namespace ${namespace}: ${urn}`);
  }
  const type = urn.split(":")[2];
  const [urnPart, queryString] = urn.split("?");
  const id = urnPart.split(":")[3];
  const qs = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};
  return {
    type,
    id,
    qs
  };
}
function asUrn(value, namespace = "r\xF3") {
  try {
    return parseUrn(value, namespace);
  } catch (_) {
    return {
      type: "unknown",
      id: value,
      qs: {}
    };
  }
}
var IndexPerformanceMetrics = class {
  mapReadCount;
  constructor() {
    this.mapReadCount = 0;
  }
  mapRead() {
    this.mapReadCount++;
  }
};
var TribbleDBPerformanceMetrics = class {
  setCheckCount;
  constructor() {
    this.setCheckCount = 0;
  }
  setCheck() {
    this.setCheckCount++;
  }
};
var Index = class {
  // Internal indexed representation for memory efficiency
  indexedTriples;
  // String indexing sets for memory efficiency
  stringIndex;
  sourceType;
  sourceId;
  // note: QS uses a composite key: <key>=<value>
  sourceQs;
  relations;
  targetType;
  targetId;
  targetQs;
  metrics;
  stringUrn;
  constructor(triples) {
    this.indexedTriples = [];
    this.stringIndex = new IndexedSet();
    this.sourceType = /* @__PURE__ */ new Map();
    this.sourceId = /* @__PURE__ */ new Map();
    this.sourceQs = /* @__PURE__ */ new Map();
    this.relations = /* @__PURE__ */ new Map();
    this.targetType = /* @__PURE__ */ new Map();
    this.targetId = /* @__PURE__ */ new Map();
    this.targetQs = /* @__PURE__ */ new Map();
    this.stringUrn = /* @__PURE__ */ new Map();
    this.add(triples);
    this.metrics = new IndexPerformanceMetrics();
  }
  /*
   * Add new triples to the index incrementally
   */
  add(triples) {
    const startIdx = this.indexedTriples.length;
    for (let jdx = 0; jdx < triples.length; jdx++) {
      const idx = startIdx + jdx;
      const triple = triples[jdx];
      const parsedSource = this.stringUrn.has(triple[0]) ? this.stringUrn.get(triple[0]) : this.stringUrn.set(triple[0], asUrn(triple[0])).get(triple[0]);
      const relation = triple[1];
      const parsedTarget = this.stringUrn.has(triple[2]) ? this.stringUrn.get(triple[2]) : this.stringUrn.set(triple[2], asUrn(triple[2])).get(triple[2]);
      const sourceTypeIdx = this.stringIndex.add(parsedSource.type);
      const sourceIdIdx = this.stringIndex.add(parsedSource.id);
      const relationIdx = this.stringIndex.add(relation);
      const targetTypeIdx = this.stringIndex.add(parsedTarget.type);
      const targetIdIdx = this.stringIndex.add(parsedTarget.id);
      this.indexedTriples.push([
        this.stringIndex.add(triple[0]),
        relationIdx,
        this.stringIndex.add(triple[2])
      ]);
      if (!this.sourceType.has(sourceTypeIdx)) {
        this.sourceType.set(sourceTypeIdx, /* @__PURE__ */ new Set());
      }
      this.sourceType.get(sourceTypeIdx).add(idx);
      if (!this.sourceId.has(sourceIdIdx)) {
        this.sourceId.set(sourceIdIdx, /* @__PURE__ */ new Set());
      }
      this.sourceId.get(sourceIdIdx).add(idx);
      for (const [key, val] of Object.entries(parsedSource.qs)) {
        const qsIdx = this.stringIndex.add(`${key}=${val}`);
        if (!this.sourceQs.has(qsIdx)) {
          this.sourceQs.set(qsIdx, /* @__PURE__ */ new Set());
        }
        this.sourceQs.get(qsIdx).add(idx);
      }
      if (!this.relations.has(relationIdx)) {
        this.relations.set(relationIdx, /* @__PURE__ */ new Set());
      }
      this.relations.get(relationIdx).add(idx);
      if (!this.targetType.has(targetTypeIdx)) {
        this.targetType.set(targetTypeIdx, /* @__PURE__ */ new Set());
      }
      this.targetType.get(targetTypeIdx).add(idx);
      if (!this.targetId.has(targetIdIdx)) {
        this.targetId.set(targetIdIdx, /* @__PURE__ */ new Set());
      }
      this.targetId.get(targetIdIdx).add(idx);
      for (const [key, val] of Object.entries(parsedTarget.qs)) {
        const qsIdx = this.stringIndex.add(`${key}=${val}`);
        if (!this.targetQs.has(qsIdx)) {
          this.targetQs.set(qsIdx, /* @__PURE__ */ new Set());
        }
        this.targetQs.get(qsIdx).add(idx);
      }
    }
  }
  /*
   * Get the number of triples in the index
   */
  get length() {
    return this.indexedTriples.length;
  }
  /*
   * Reconstruct the original triples from the indexed representation
   */
  triples() {
    return this.indexedTriples.map(([sourceIdx, relationIdx, targetIdx]) => [
      this.stringIndex.getValue(sourceIdx),
      this.stringIndex.getValue(relationIdx),
      this.stringIndex.getValue(targetIdx)
    ]);
  }
  /*
   * Get a specific triple by index
   */
  getTriple(index) {
    if (index < 0 || index >= this.indexedTriples.length) {
      return void 0;
    }
    const [sourceIdx, relationIdx, targetIdx] = this.indexedTriples[index];
    return [
      this.stringIndex.getValue(sourceIdx),
      this.stringIndex.getValue(relationIdx),
      this.stringIndex.getValue(targetIdx)
    ];
  }
  getTripleIndices(index) {
    if (index < 0 || index >= this.indexedTriples.length) {
      return void 0;
    }
    return this.indexedTriples[index];
  }
  /*
   * Helper methods to convert string keys to indices for external API compatibility
   */
  getSourceTypeSet(type) {
    const typeIdx = this.stringIndex.getIndex(type);
    if (typeIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.sourceType.get(typeIdx);
  }
  getSourceIdSet(id) {
    const idIdx = this.stringIndex.getIndex(id);
    if (idIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.sourceId.get(idIdx);
  }
  getSourceQsSet(key, val) {
    const qsIdx = this.stringIndex.getIndex(`${key}=${val}`);
    if (qsIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.sourceQs.get(qsIdx);
  }
  getRelationSet(relation) {
    const relationIdx = this.stringIndex.getIndex(relation);
    if (relationIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.relations.get(relationIdx);
  }
  getTargetTypeSet(type) {
    const typeIdx = this.stringIndex.getIndex(type);
    if (typeIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.targetType.get(typeIdx);
  }
  getTargetIdSet(id) {
    const idIdx = this.stringIndex.getIndex(id);
    if (idIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.targetId.get(idIdx);
  }
  getTargetQsSet(key, val) {
    const qsIdx = this.stringIndex.getIndex(`${key}=${val}`);
    if (qsIdx === void 0) {
      return void 0;
    }
    this.metrics.mapRead();
    return this.targetQs.get(qsIdx);
  }
};
var Triples = class {
  static source(triple) {
    return triple[0];
  }
  static relation(triple) {
    return triple[1];
  }
  static target(triple) {
    return triple[2];
  }
};
function joinSubqueryResults(metrics, acc, tripleResult) {
  const joinedNames = acc.names.concat(tripleResult.names);
  if (acc.rows.length === 0 || tripleResult.rows.length === 0) {
    return {
      names: joinedNames,
      rows: []
    };
  }
  const endings = /* @__PURE__ */ new Map();
  const starts = /* @__PURE__ */ new Map();
  for (let idx = 0; idx < acc.rows.length; idx++) {
    const refId = acc.rows[idx][2];
    if (!endings.has(refId)) {
      endings.set(refId, []);
    }
    endings.get(refId).push(idx);
  }
  for (let idx = 0; idx < tripleResult.rows.length; idx++) {
    const refId = tripleResult.rows[idx][0];
    if (!starts.has(refId)) {
      starts.set(refId, []);
    }
    starts.get(refId).push(idx);
  }
  const commonLinks = Sets.intersection(metrics, [
    new Set(endings.keys()),
    new Set(starts.keys())
  ]);
  const joinedRows = [];
  for (const link of commonLinks) {
    const startRowIndices = starts.get(link);
    const endRowsIndices = endings.get(link);
    for (const startRowIndex of startRowIndices) {
      for (const endRowIndex of endRowsIndices) {
        const joinedRow = acc.rows[startRowIndex].concat(
          tripleResult.rows[endRowIndex]
        );
        joinedRows.push(joinedRow);
      }
    }
  }
  return {
    names: joinedNames,
    rows: joinedRows
  };
}
var TribbleDB = class _TribbleDB {
  index;
  triplesCount;
  cursorIndices;
  metrics;
  validations;
  constructor(triples, validations = {}) {
    this.index = new Index(triples);
    this.triplesCount = this.index.length;
    this.cursorIndices = /* @__PURE__ */ new Set();
    this.metrics = new TribbleDBPerformanceMetrics();
    this.validations = validations;
    for (let idx = 0; idx < this.triplesCount; idx++) {
      this.cursorIndices.add(idx);
    }
  }
  /*
   * Clone the database.
   *
   * @returns A new TribbleDB instance, constructed with the same data as the original.
   */
  clone() {
    const clonedDB = new _TribbleDB([]);
    clonedDB.index = this.index;
    clonedDB.triplesCount = this.triplesCount;
    clonedDB.cursorIndices = this.cursorIndices;
    clonedDB.metrics = this.metrics;
    return clonedDB;
  }
  static of(triples) {
    return new _TribbleDB(triples);
  }
  /*
   * Convert an array of TripleObject instances to a TribbleDB.
   *
   * @param objects - An array of TripleObject instances.
   *
   * @returns A TribbleDB instance.
   */
  static from(objects) {
    const triples = [];
    for (const obj of objects) {
      const { id, ...relations } = obj;
      if (typeof id !== "string") {
        throw new Error("Each TripleObject must have a string id.");
      }
      for (const [relation, target] of Object.entries(relations)) {
        if (Array.isArray(target)) {
          for (const sub of target) {
            triples.push([id, relation, sub]);
          }
        } else {
          triples.push([id, relation, target]);
        }
      }
    }
    return new _TribbleDB(triples);
  }
  validateTriples(triples) {
    const messages = [];
    for (const [source, relation, target] of triples) {
      const validator = this.validations[relation];
      if (!validator) {
        continue;
      }
      const { type } = asUrn(source);
      const res = validator(type, relation, target);
      if (typeof res === "string") {
        messages.push(res);
      }
    }
    if (messages.length > 0) {
      throw new Error(`Triple validation failed:
- ${messages.join("\n- ")}`);
    }
  }
  /**
   * Add new triples to the database.
   *
   * @param triples - An array of triples to add.
   */
  add(triples) {
    const oldLength = this.index.length;
    this.validateTriples(triples);
    this.index.add(triples);
    this.triplesCount = this.index.length;
    for (let idx = oldLength; idx < this.triplesCount; idx++) {
      this.cursorIndices.add(idx);
    }
  }
  /**
   * Map over the triples in the database.
   *
   * @param fn - A mapping function.
   * @returns A new TribbleDB instance containing the mapped triples.
   */
  map(fn) {
    return new _TribbleDB(this.index.triples().map(fn));
  }
  /**
   * Flat map over the triples in the database.
   *
   * @param fn - A mapping function.
   * @returns A new TribbleDB instance containing the flat-mapped triples.
   */
  flatMap(fn) {
    const flatMappedTriples = this.index.triples().flatMap(fn);
    return new _TribbleDB(flatMappedTriples);
  }
  /**
   * Get the first triple in the database.
   *
   * @returns The first triple, or undefined if there are no triples.
   */
  firstTriple() {
    return this.index.length > 0 ? this.index.getTriple(0) : void 0;
  }
  /*
   * Get the first source in the database.
   */
  firstSource() {
    const first = this.firstTriple();
    return first ? Triples.source(first) : void 0;
  }
  /**
   * Get the first relation in the database.
   */
  firstRelation() {
    const first = this.firstTriple();
    return first ? Triples.relation(first) : void 0;
  }
  /**
   * Get the first target in the database.
   */
  firstTarget() {
    const first = this.firstTriple();
    return first ? Triples.target(first) : void 0;
  }
  /*
   * Get the first object in the database.
   */
  firstObject(listOnly = false) {
    return this.objects(listOnly)[0];
  }
  /*
   * Get all triples in the database.
   *
   * @returns An array of all triples.
   */
  triples() {
    return this.index.triples();
  }
  /**
   * Get all unique sources in the database.
   *
   * @returns A set of all unique sources.
   */
  sources() {
    return new Set(
      this.index.triples().map(Triples.source)
    );
  }
  /**
   * Get all unique relations in the database.
   *
   * @returns A set of all unique relations.
   */
  relations() {
    return new Set(
      this.index.triples().map(Triples.relation)
    );
  }
  /**
   * Get all unique targets in the database.
   *
   * @returns A set of all unique targets.
   */
  targets() {
    return new Set(
      this.index.triples().map(Triples.target)
    );
  }
  /*
   * Get all unique objects represented by the triples.
   *
   * @returns An array of unique TripleObject instances.
   */
  objects(listOnly = false) {
    const output = [];
    for (const [id, obj] of Object.entries(this.object(listOnly))) {
      obj.id = id;
      output.push(obj);
    }
    return output;
  }
  /*
   * yes, this is a bad name given firstObject.
   */
  object(listOnly = false) {
    const objs = {};
    for (const [source, relation, target] of this.index.triples()) {
      if (!objs[source]) {
        objs[source] = { id: source };
      }
      if (!objs[source][relation]) {
        objs[source][relation] = listOnly ? [target] : target;
      } else if (Array.isArray(objs[source][relation])) {
        objs[source][relation].push(target);
      } else {
        objs[source][relation] = [objs[source][relation], target];
      }
    }
    return objs;
  }
  #findMatchingRows(params) {
    const matchingRowSets = [
      this.cursorIndices
    ];
    const { source, relation, target } = params;
    if (typeof source === "undefined" && typeof target === "undefined" && typeof relation === "undefined") {
      throw new Error("At least one search parameter must be defined");
    }
    const allowedKeys = ["source", "relation", "target"];
    for (const key of Object.keys(params)) {
      if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
      if (!allowedKeys.includes(key)) {
        throw new Error(`Unexpected search parameter: ${key}`);
      }
    }
    if (source) {
      if (source.type) {
        const sourceTypeSet = this.index.getSourceTypeSet(source.type);
        if (sourceTypeSet) {
          matchingRowSets.push(sourceTypeSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (source.id) {
        const sourceIdSet = this.index.getSourceIdSet(source.id);
        if (sourceIdSet) {
          matchingRowSets.push(sourceIdSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (source.qs) {
        for (const [key, val] of Object.entries(source.qs)) {
          const sourceQsSet = this.index.getSourceQsSet(key, val);
          if (sourceQsSet) {
            matchingRowSets.push(sourceQsSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
      }
    }
    if (target) {
      if (target.type) {
        const targetTypeSet = this.index.getTargetTypeSet(target.type);
        if (targetTypeSet) {
          matchingRowSets.push(targetTypeSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (target.id) {
        const targetIdSet = this.index.getTargetIdSet(target.id);
        if (targetIdSet) {
          matchingRowSets.push(targetIdSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (target.qs) {
        for (const [key, val] of Object.entries(target.qs)) {
          const targetQsSet = this.index.getTargetQsSet(key, val);
          if (targetQsSet) {
            matchingRowSets.push(targetQsSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
      }
    }
    if (relation) {
      const relationDsl = typeof relation === "string" ? { relation: [relation] } : relation;
      if (relationDsl.relation) {
        const unionedRelations = /* @__PURE__ */ new Set();
        for (const rel of relationDsl.relation) {
          const relationSet = this.index.getRelationSet(rel);
          if (relationSet) {
            for (const elem of relationSet) {
              unionedRelations.add(elem);
            }
          }
        }
        if (unionedRelations.size > 0) {
          matchingRowSets.push(unionedRelations);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
    }
    const intersection = Sets.intersection(this.metrics, matchingRowSets);
    const matchingTriples = /* @__PURE__ */ new Set();
    for (const index of intersection) {
      const triple = this.index.getTriple(index);
      if (!source?.predicate && !target?.predicate && !(typeof relation === "object" && relation.predicate)) {
        matchingTriples.add(index);
        continue;
      }
      let isValid2 = true;
      if (source?.predicate) {
        isValid2 = isValid2 && source.predicate(Triples.source(triple));
      }
      if (target?.predicate) {
        isValid2 = isValid2 && target.predicate(Triples.target(triple));
      }
      if (typeof relation === "object" && relation.predicate) {
        isValid2 = isValid2 && relation.predicate(Triples.relation(triple));
      }
      if (isValid2) {
        matchingTriples.add(index);
      }
    }
    return matchingTriples;
  }
  /*
   * Search all triples in the database.
   *
   * @param params - The search parameters.
   * @returns A new TribbleDB instance containing the matching triples.
   */
  search(params) {
    const matchingTriples = [];
    for (const rowIdx of this.#findMatchingRows(params)) {
      const triple = this.index.getTriple(rowIdx);
      if (triple) {
        matchingTriples.push(triple);
      }
    }
    return new _TribbleDB(matchingTriples);
  }
  search2(query) {
    const bindings = Object.entries(query);
    const subqueryResults = [];
    for (let idx = 0; idx < bindings.length - 2; idx += 2) {
      const tripleSlice = bindings.slice(idx, idx + 3);
      const pattern = {
        source: tripleSlice[0][1],
        relation: tripleSlice[1][1],
        target: tripleSlice[2][1]
      };
      const bindingNames = tripleSlice.map((pair) => pair[0]);
      const tripleRows = this.#findMatchingRows(pattern);
      const rowData = Array.from(tripleRows).flatMap((row) => {
        const contents = this.index.getTripleIndices(row);
        return typeof contents === "undefined" ? [] : [contents];
      });
      subqueryResults.push({
        names: bindingNames,
        rows: rowData
      });
    }
    const queryResult = subqueryResults.reduce(
      joinSubqueryResults.bind(this, this.metrics)
    );
    const outputNames = queryResult.names;
    const objects = [];
    for (const row of queryResult.rows) {
      const data = {};
      for (let idx = 0; idx < outputNames.length; idx++) {
        const label = outputNames[idx];
        data[label] = this.index.stringIndex.getValue(row[idx]);
      }
      objects.push(data);
    }
    return objects;
  }
  getMetrics() {
    return {
      index: this.index.metrics,
      db: this.metrics
    };
  }
};

// node_modules/tribbledb/dist/mod.js
var IndexedSet2 = class {
  #idx;
  #map;
  #reverseMap;
  constructor() {
    this.#idx = 0;
    this.#map = /* @__PURE__ */ new Map();
    this.#reverseMap = /* @__PURE__ */ new Map();
  }
  /*
   * Return the underlying map of values to indices
   */
  map() {
    return this.#map;
  }
  /*
   * Return the underlying map of indices to values
   */
  reverseMap() {
    return this.#reverseMap;
  }
  /*
   * Add a value to the set, and return its index
   */
  add(value) {
    if (this.#map.has(value)) {
      return this.#map.get(value);
    }
    this.#map.set(value, this.#idx);
    this.#reverseMap.set(this.#idx, value);
    this.#idx++;
    return this.#idx - 1;
  }
  /**
   * Set the index for a value in the set
   */
  setIndex(value, index) {
    this.#map.set(value, index);
    this.#reverseMap.set(index, value);
  }
  /**
   * Get the index for a value in the set
   */
  getIndex(value) {
    return this.#map.get(value);
  }
  /**
   * Set the values for an index in the set
   */
  getValue(idx) {
    return this.#reverseMap.get(idx);
  }
  /**
   * Does this structure have a value?
   */
  has(value) {
    return this.#map.has(value);
  }
};
var TribbleParser = class {
  stringIndex;
  constructor() {
    this.stringIndex = new IndexedSet2();
  }
  parseTriple(line) {
    const match = line.match(/^(\d+) (\d+) (\d+)$/);
    if (!match) {
      throw new SyntaxError(`Invalid format for triple line: ${line}`);
    }
    const src = this.stringIndex.getValue(parseInt(match[1], 10));
    const rel = this.stringIndex.getValue(parseInt(match[2], 10));
    const tgt = this.stringIndex.getValue(parseInt(match[3], 10));
    if (src === void 0 || rel === void 0 || tgt === void 0) {
      throw new SyntaxError(`Invalid triple reference: ${line}`);
    }
    return [src, rel, tgt];
  }
  parseDeclaration(line) {
    const match = line.match(/^(\d+) "(.*)"$/);
    if (!match) {
      throw new SyntaxError(`Invalid format for declaration line: ${line}`);
    }
    const id = match[1];
    const value = match[2];
    this.stringIndex.setIndex(value, parseInt(id, 10));
  }
  parse(line) {
    const isTriple = /^(\d+)\s(\d+)\s(\d+)$/;
    if (isTriple.test(line)) {
      return this.parseTriple(line);
    } else {
      this.parseDeclaration(line);
      return;
    }
  }
};

// ts/services/data.ts
async function* streamTribbles(url) {
  const parser = new TribbleParser();
  const res = await fetch(url);
  if (!res.body) {
    throw new Error("No response body");
  }
  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += value;
    let lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const triple = parser.parse(line);
      if (triple !== void 0) {
        yield triple;
      }
    }
  }
  if (buffer.length > 0) {
    const triple = parser.parse(buffer);
    if (triple !== void 0) {
      yield triple;
    }
  }
}
var tdb = null;
async function loadTriples(url, schema = {}, fn = (x) => [x]) {
  const buffer = [];
  if (!tdb) {
    tdb = new TribbleDB([], schema);
  }
  for await (const triple of streamTribbles(url)) {
    buffer.push(...[triple].flatMap(fn));
    if (buffer.length > 500) {
      tdb.add(buffer);
      buffer.length = 0;
    }
  }
  tdb.add(buffer);
  return tdb;
}

// ts/constants.ts
var PHOTO_WIDTH = 400;
var PHOTO_HEIGHT = 400;
var KnownRelations = class {
  static {
    this.SUBJECT = "subject";
  }
  static {
    this.LOCATION = "location";
  }
  static {
    this.LONGITUDE = "longitude";
  }
  static {
    this.LATITUDE = "latitude";
  }
  static {
    this.COUNTRY = "country";
  }
  static {
    this.FLAG = "flag";
  }
  static {
    this.RATING = "rating";
  }
  static {
    this.NAME = "name";
  }
  static {
    this.BIRDWATCH_URL = "birdwatchUrl";
  }
  static {
    this.WIKIPEDIA = "wikipedia";
  }
  static {
    this.CREATED_AT = "createdAt";
  }
  static {
    this.SEASON = "season";
  }
  static {
    this.F_STOP = "f_stop";
  }
  static {
    this.FOCAL_LENGTH = "focalLength";
  }
  static {
    this.MODEL = "model";
  }
  static {
    this.EXPOSURE_TIME = "exposureTime";
  }
  static {
    this.ISO = "iso";
  }
  static {
    this.WIDTH = "width";
  }
  static {
    this.HEIGHT = "height";
  }
  static {
    this.THUMBNAIL_URL = "thumbnailUrl";
  }
  static {
    this.PNG_URL = "pngUrl";
  }
  static {
    this.MID_IMAGE_LOSSY_URL = "midImageLossyUrl";
  }
  static {
    this.FULL_IMAGE = "fullImage";
  }
  static {
    this.POSTER_URL = "posterUrl";
  }
  static {
    this.VIDEO_URL_1080P = "videoUrl1080p";
  }
  static {
    this.VIDEO_URL_480P = "videoUrl480p";
  }
  static {
    this.VIDEO_URL_720P = "videoUrl720p";
  }
  static {
    this.VIDEO_URL_UNSCALED = "videoUrlUnscaled";
  }
  static {
    this.YEAR = "year";
  }
  static {
    this.CONTAINS = "contains";
  }
  static {
    this.IN = "in";
  }
};
var CDN_RELATIONS = /* @__PURE__ */ new Set([
  KnownRelations.THUMBNAIL_URL,
  KnownRelations.PNG_URL,
  KnownRelations.MID_IMAGE_LOSSY_URL,
  KnownRelations.FULL_IMAGE,
  KnownRelations.POSTER_URL,
  KnownRelations.VIDEO_URL_1080P,
  KnownRelations.VIDEO_URL_480P,
  KnownRelations.VIDEO_URL_720P,
  KnownRelations.VIDEO_URL_UNSCALED
]);
var RelationSymmetries = [
  [KnownRelations.IN, KnownRelations.CONTAINS]
];

// ts/strings.ts
var Strings = class {
  static capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static pluralise(str) {
    return str + "s";
  }
  static camelCase(str) {
    return str.replace(/[-_ ]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());
  }
};

// ts/semantic/derive.ts
var CURIES = {
  "i": "urn:r\xF3:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/"
};
var CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;
var ENDPOINT = "https://photos-cdn.rgrannell.xyz";
function convertRatingsToUrns(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.RATING) {
    return [triple];
  }
  return [[
    src,
    rel,
    `urn:r\xF3:rating:${encodeURIComponent(tgt)}`
  ]];
}
function convertCountriesToUrns(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.COUNTRY) {
    return [triple];
  }
  const id = tgt.toLowerCase().replace(/ /g, "-");
  const countryUrn = `urn:r\xF3:country:${id}`;
  return [[
    src,
    rel,
    countryUrn
  ]];
}
function expandCdnUrls(triple) {
  const [src, rel, tgt] = triple;
  const isCDNRelation = Array.from(CDN_RELATIONS).some((candidate) => {
    return rel === candidate;
  });
  if (!isCDNRelation) {
    return [triple];
  }
  return [[
    src,
    rel,
    `${ENDPOINT}${tgt}`
  ]];
}
function convertRelationCasing(triple) {
  const [src, rel, tgt] = triple;
  return [[
    src,
    Strings.camelCase(rel),
    tgt
  ]];
}
function expandUrns(triple) {
  const [src, rel, tgt] = triple;
  return [[
    typeof src === "string" && src.startsWith("::") ? `urn:r\xF3:${src.slice(2)}` : src,
    rel,
    typeof tgt === "string" && tgt.startsWith("::") ? `urn:r\xF3:${tgt.slice(2)}` : tgt
  ]];
}
function addSeason(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }
  const date = new Date(tgt);
  if (isNaN(date.getTime())) {
    return [triple];
  }
  const month = date.getUTCMonth() + 1;
  let season = "Winter";
  if (month >= 3 && month <= 5) {
    season = "Spring";
  } else if (month >= 6 && month <= 8) {
    season = "Summer";
  } else if (month >= 9 && month <= 11) {
    season = "Autumn";
  }
  return [
    triple,
    [
      src,
      KnownRelations.SEASON,
      season
    ]
  ];
}
function addYear(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }
  const date = new Date(tgt);
  if (isNaN(date.getTime())) {
    return [triple];
  }
  const year = date.getUTCFullYear().toString();
  return [
    triple,
    [
      src,
      KnownRelations.YEAR,
      year
    ]
  ];
}
function addInverseRelations(triple) {
  const [src, rel, tgt] = triple;
  for (const [left, right] of RelationSymmetries) {
    if (rel === left) {
      return [
        triple,
        [
          tgt,
          right,
          src
        ]
      ];
    }
  }
  return [triple];
}
function expandCurie(curies, value) {
  if (typeof value !== "string" || !CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);
  if (!match) {
    return value;
  }
  const prefix = match[1];
  const id = match[2];
  return curies[prefix] ? `${curies[prefix]}${id}` : value;
}
function expandTripleCuries(triple) {
  const [src, rel, tgt] = triple;
  const expandedSource = expandCurie(CURIES, src);
  const expandedTarget = expandCurie(CURIES, tgt);
  if (CURIE_REGEX.test(expandedSource)) {
    throw new Error(
      `Source still matches CURIE regex after expansion: "${src}" ${expandedSource}`
    );
  }
  if (CURIE_REGEX.test(expandedTarget)) {
    throw new Error(
      `Target still matches CURIE regex after expansion: "${tgt}" ${expandedTarget}`
    );
  }
  return [
    [
      expandedSource,
      rel,
      expandedTarget
    ]
  ];
}
function deriveTriples(triple) {
  const tripleProcessors = [
    convertRatingsToUrns,
    convertCountriesToUrns,
    convertRelationCasing,
    expandCdnUrls,
    expandUrns,
    addSeason,
    addYear,
    addInverseRelations,
    expandTripleCuries
  ];
  let outputTriples = [triple];
  for (const fn of tripleProcessors) {
    outputTriples = outputTriples.flatMap(fn);
  }
  return outputTriples;
}

// ts/state.ts
async function loadData() {
  const schema = {};
  const db = await loadTriples("/manifest/tribbles.eab0f8c457.txt", schema, deriveTriples);
  return db;
}
async function loadState() {
  return {
    darkMode: DarkModes.load(),
    sidebarVisible: false,
    data: await loadData()
  };
}

// ts/components/sidebar.ts
var import_mithril2 = __toESM(require_mithril());
function SidebarItem() {
  return {
    view(vnode) {
      return (0, import_mithril2.default)("li", {
        class: "sidebar-item",
        onclick() {
          import_mithril2.default.route.set(vnode.attrs.route);
        }
      }, vnode.attrs.name);
    }
  };
}
function Sidebar() {
  function classes(visible) {
    const cls = ["photo-sidebar"];
    if (visible) {
      cls.push("sidebar-visible");
    }
    return cls.join(" ");
  }
  return {
    view(vnode) {
      return (0, import_mithril2.default)("aside", { class: classes(vnode.attrs.visible) }, [
        (0, import_mithril2.default)("nav", [
          (0, import_mithril2.default)("ul", [
            (0, import_mithril2.default)(SidebarItem, { name: "PHOTOS", route: "/photos" }),
            (0, import_mithril2.default)(SidebarItem, { name: "VIDEOS", route: "/videos" }),
            (0, import_mithril2.default)(SidebarItem, { name: "ALBUMS", route: "/albums" }),
            (0, import_mithril2.default)(SidebarItem, { name: "ABOUT", route: "/about" })
          ])
        ])
      ]);
    }
  };
}

// ts/pages/albums.ts
var import_mithril8 = __toESM(require_mithril());

// ts/components/album-stats.ts
var import_mithril3 = __toESM(require_mithril());

// ts/stats.json
var stats_default = {
  photos: 1203,
  albums: 106,
  years: 13,
  countries: 18,
  bird_species: 142,
  mammal_species: 55,
  reptile_species: 5,
  amphibian_species: 3,
  fish_species: 1,
  unesco_sites: 8
};

// ts/components/album-stats.ts
function validateState(stats) {
  if (typeof stats !== "object" || stats === null) {
    throw new Error("Stats is not an object");
  }
  const keys = [
    "photos",
    "albums",
    "years",
    "countries",
    "bird_species",
    "mammal_species",
    "amphibian_species",
    "reptile_species",
    "unesco_sites"
  ];
  for (const key of keys) {
    if (!(key in stats)) {
      throw new Error(`Stats is missing key: ${key}`);
    }
    if (typeof stats[key] !== "number") {
      throw new Error(`Stats key ${key} is not a number`);
    }
  }
}
function AlbumStats() {
  validateState(stats_default);
  return {
    view() {
      return (0, import_mithril3.default)("p.photo-stats", [
        `${stats_default.photos} `,
        (0, import_mithril3.default)("a", { href: "#/photos" }, "photos"),
        " \xB7 ",
        `${stats_default.albums} albums \xB7 ${stats_default.years} years \xB7 `,
        `${stats_default.countries} `,
        (0, import_mithril3.default)("a", { href: "#/listing/country" }, "countries"),
        " \xB7 ",
        `${stats_default.bird_species} `,
        (0, import_mithril3.default)("a", { href: "#/listing/bird" }, "bird species"),
        " \xB7 ",
        `${stats_default.mammal_species} `,
        (0, import_mithril3.default)("a", { href: "#/listing/mammal" }, "mammal species"),
        " \xB7 a few ",
        (0, import_mithril3.default)("a", { href: "#/listing/amphibian" }, "amphibians"),
        " and ",
        (0, import_mithril3.default)("a", { href: "#/listing/reptile" }, "reptiles"),
        " \xB7 ",
        `${stats_default.unesco_sites} `,
        (0, import_mithril3.default)("a", { href: "#/thing/unesco:*" }, "UNESCO sites")
      ]);
    }
  };
}

// ts/components/year-cursor.ts
function YearCursor() {
  return {
    view() {
    }
  };
}

// ts/services/photos.ts
var coloursCache = /* @__PURE__ */ new Map();
var Photos = class {
  /*
   * Determine whether a photo should be eagerly or lazily loaded
   * depending on page position
   */
  static loadingMode(idx) {
    const viewportWidth = globalThis.innerWidth;
    const viewportHeight = globalThis.innerHeight;
    const imageDimension = PHOTO_WIDTH;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);
    return idx > maxImagesPerRow * maxRowsInFold + 1 ? "lazy" : "eager";
  }
  /*
   * Convert a mosaic colour string into a bitmap data URL
   */
  static encodeBitmapDataURL(colours) {
    if (coloursCache.has(colours)) {
      return coloursCache.get(colours);
    }
    const coloursList = colours.split("#").map(
      (colour) => `#${colour}`
    );
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context missing");
    }
    ctx.fillStyle = coloursList[1];
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = coloursList[2];
    ctx.fillRect(1, 0, 1, 1);
    ctx.fillStyle = coloursList[3];
    ctx.fillRect(0, 1, 1, 1);
    ctx.fillStyle = coloursList[4];
    ctx.fillRect(1, 1, 1, 1);
    coloursCache.set(colours, canvas.toDataURL("image/png"));
    return coloursCache.get(colours);
  }
};

// ts/components/photo-album-metadata.ts
var import_mithril4 = __toESM(require_mithril());

// ts/services/window.ts
var Windows = class {
  static isSmallerThan(width = 500) {
    return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
  }
  static setTitle(title) {
    document.title = title;
  }
};

// ts/services/dates.ts
var Dates = class {
  static parse(dateTime) {
    let [date, time] = dateTime.split(" ");
    date = date.replace(/:/g, "-");
    return /* @__PURE__ */ new Date(`${date} ${time}`);
  }
  static formatExifDate(dateTime) {
    if (!dateTime) {
      return dateTime;
    }
    const createdAt = new Date(dateTime).toISOString();
    const [date, time] = createdAt.split("T")[0].replace(/\:/g, "-");
    return `${date.replace(/\:/g, "/")} ${time}`;
  }
  static dateRange(minDate, maxDate, smallDevice) {
    if (!minDate && !maxDate) {
      return "unknown date";
    }
    const parsedMinDate = minDate instanceof Date ? minDate : new Date(parseFloat(minDate));
    const parsedMaxDate = maxDate instanceof Date ? maxDate : new Date(parseFloat(maxDate));
    if (smallDevice) {
      const optsShort = {
        day: "numeric",
        month: "short"
      };
      const from = parsedMinDate.toLocaleDateString("en-IE", optsShort);
      const to = parsedMaxDate.toLocaleDateString("en-IE", optsShort);
      const minDay = parsedMinDate.toLocaleDateString("en-IE", {
        day: "numeric"
      });
      const maxDay = parsedMaxDate.toLocaleDateString("en-IE", {
        day: "numeric"
      });
      const minMonth = parsedMinDate.toLocaleDateString("en-IE", {
        month: "short"
      });
      const maxMonth = parsedMaxDate.toLocaleDateString("en-IE", {
        month: "short"
      });
      const minYear = parsedMinDate.getFullYear();
      const maxYear = parsedMaxDate.getFullYear();
      const monthsEqual = minMonth === maxMonth;
      const yearsEqual = minYear === maxYear;
      if (from === to) {
        return `${from} ${minYear}`;
      } else if (monthsEqual && yearsEqual) {
        return `${minDay} - ${maxDay} ${maxMonth} ${minYear}`;
      } else {
        return `${from} ${minYear} - ${to} ${maxYear}`;
      }
    } else {
      const opts = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      const from = parsedMinDate.toLocaleDateString("en-IE", opts);
      const to = parsedMaxDate.toLocaleDateString("en-IE", opts);
      if (from === to) {
        return from;
      }
      return `${from} \u2014 ${to}`;
    }
  }
};

// ts/components/photo-album-metadata.ts
function PhotoAlbumMetadata() {
  function dateRange(minDate, maxDate) {
    if (!minDate || !maxDate) {
      return "unknown date";
    }
    const isSmall = Windows.isSmallerThan(500);
    return Dates.dateRange(minDate, maxDate, isSmall);
  }
  return {
    view(vnode) {
      const { title, minDate, maxDate, count, countryLinks } = vnode.attrs;
      const text = count === 1 ? "photo" : "photos";
      return (0, import_mithril4.default)("div.photo-album-metadata", [
        (0, import_mithril4.default)("p.photo-album-title", title),
        (0, import_mithril4.default)("p.photo-album-date", [
          (0, import_mithril4.default)("time", dateRange(minDate, maxDate))
        ]),
        (0, import_mithril4.default)("div.photo-metadata-inline", [
          (0, import_mithril4.default)("p.photo-album-count", `${count} ${text}`),
          (0, import_mithril4.default)("p.photo-album-countries", countryLinks)
        ])
      ]);
    }
  };
}

// ts/components/photo-album.ts
var import_mithril7 = __toESM(require_mithril());

// ts/components/photo.ts
var import_mithril6 = __toESM(require_mithril());

// ts/components/metadata-icon.ts
var import_mithril5 = __toESM(require_mithril());

// ts/components/photo.ts
function loadImage(url, event) {
  broadcast("photo_loaded", { url });
  const $placeholder = event.target?.parentNode?.querySelector(
    ".thumbnail-placeholder"
  );
  if (!$placeholder) {
    return;
  }
  $placeholder.style.zIndex = "-1";
}
function Image() {
  return {
    view(vnode) {
      const { thumbnailUrl, loading, onclick: onclick2 } = vnode.attrs;
      return (0, import_mithril6.default)("img.thumbnail-image", {
        onload: loadImage.bind(null, thumbnailUrl),
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        src: thumbnailUrl,
        loading,
        onclick: onclick2
      });
    }
  };
}
function PlaceholderImage() {
  return {
    view(vnode) {
      const { thumbnailDataUrl } = vnode.attrs;
      return (0, import_mithril6.default)("img.u-photo.thumbnail-image.thumbnail-placeholder", {
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        src: thumbnailDataUrl
      });
    }
  };
}
function ImagePair() {
  return {
    view(vnode) {
      const {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        onclick: onclick2
      } = vnode.attrs;
      return (0, import_mithril6.default)("a", {
        href: imageUrl,
        target: "_blank",
        rel: "external"
      }, [
        (0, import_mithril6.default)(PlaceholderImage, { thumbnailDataUrl }),
        (0, import_mithril6.default)(Image, { thumbnailUrl, loading, onclick: onclick2 })
      ]);
    }
  };
}

// ts/components/photo-album.ts
function PhotoAlbum() {
  return {
    view(vnode) {
      const {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        child,
        onclick: onclick2
      } = vnode.attrs;
      return (0, import_mithril7.default)("div.photo-album", [
        (0, import_mithril7.default)(ImagePair, {
          imageUrl,
          thumbnailUrl,
          thumbnailDataUrl,
          loading,
          onclick: onclick2
        }),
        child
      ]);
    }
  };
}

// ts/pages/albums.ts
function AlbumsList() {
  const albumComponents = [];
  function albumYear(album) {
    return new Date(album.minDate).getFullYear();
  }
  return {
    view(vnode) {
      let year = 2e3;
      const { albums } = vnode.attrs;
      for (let idx = 0; idx < albums.length; idx++) {
        const album = albums[idx];
        const loading = Photos.loadingMode(idx);
        if (year !== albumYear(album)) {
          year = albumYear(album);
          const $h2 = (0, import_mithril8.default)("h2.album-year-header", year.toString());
          albumComponents.push($h2);
        }
        const $md = (0, import_mithril8.default)(PhotoAlbumMetadata, {
          title: album.name,
          minDate: album.minDate,
          maxDate: album.maxDate,
          count: album.photosCount,
          countryLinks: []
        });
        const $album = (0, import_mithril8.default)(PhotoAlbum, {
          imageUrl: album.thumbnailUrl,
          thumbnailUrl: album.thumbnailUrl,
          thumbnailDataUrl: Photos.encodeBitmapDataURL(album.mosaicColours),
          loading,
          onclick: () => {
          }
        });
        albumComponents.push($md);
        albumComponents.push($album);
      }
      return (0, import_mithril8.default)("section.album-container", albumComponents);
    }
  };
}
function AlbumsPage() {
  return {
    oninit() {
      Windows.setTitle("Albums - photos");
    },
    view(vnode) {
      const $md = (0, import_mithril8.default)("section.album-metadata", [
        (0, import_mithril8.default)("h1.albums-header", "Albums"),
        (0, import_mithril8.default)(AlbumStats)
      ]);
      const $albumContainer = (0, import_mithril8.default)("section.album-container", [
        (0, import_mithril8.default)(YearCursor),
        (0, import_mithril8.default)(AlbumsList, { albums: vnode.attrs.albums })
      ]);
      return (0, import_mithril8.default)("div", [
        $md,
        $albumContainer
      ]);
    }
  };
}

// ../node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m11) => !!m11).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[a-z][a-z0-9]*$/;
var ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  constructor() {
    super(...arguments);
    this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
    this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
    this.trim = () => new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
    this.toLowerCase = () => new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
    this.toUpperCase = () => new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
        //
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return Object.keys(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return _ZodEnum.create(values);
  }
  exclude(values) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.issues.length) {
        return {
          status: "dirty",
          value: ctx.data
        };
      }
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    if (isValid(result)) {
      result.value = Object.freeze(result.value);
    }
    return result;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// ts/numbers.ts
function asInt(value) {
  if (typeof value === "number") {
    return value;
  }
  return parseInt(value, 10);
}

// ts/services/albums.ts
var AlbumSchema = z.object({
  name: z.string(),
  minDate: z.union([z.string(), z.number()]),
  maxDate: z.union([z.string(), z.number()]),
  thumbnailUrl: z.string(),
  mosaic: z.any(),
  id: z.string(),
  photosCount: z.union([z.string(), z.number()]),
  flags: z.any()
});
function parseAlbum(album) {
  const result = AlbumSchema.safeParse(album);
  if (!result.success) {
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.error.issues)}`
    );
  }
  return {
    name: result.data.name,
    minDate: asInt(result.data.minDate),
    maxDate: asInt(result.data.maxDate),
    thumbnailUrl: result.data.thumbnailUrl,
    mosaicColours: result.data.mosaic,
    id: result.data.id,
    photosCount: asInt(result.data.photosCount),
    flags: result.data.flags
  };
}
function readAlbums(tdb2) {
  return tdb2.search({
    source: { type: "album" }
  }).objects().map(parseAlbum).sort((album0, album1) => {
    return album1.minDate - album0.minDate;
  });
}

// ts/app.ts
var state = await loadState();
function App() {
  return {
    view(vnode) {
      return (0, import_mithril9.default)("body", [
        (0, import_mithril9.default)("div", [
          (0, import_mithril9.default)(Header, state),
          (0, import_mithril9.default)("div", [
            (0, import_mithril9.default)(Sidebar, { visible: state.sidebarVisible }),
            (0, import_mithril9.default)(AlbumsPage, {
              albums: readAlbums(state.data)
            })
          ])
        ])
      ]);
    }
  };
}

// ts/index.ts
import_mithril10.default.mount(document.body, App(AlbumsPage));
//# sourceMappingURL=app.js.map
