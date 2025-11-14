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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/vnode.js
var require_vnode = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/vnode.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/hyperscriptVnode.js
var require_hyperscriptVnode = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/hyperscriptVnode.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/util/hasOwn.js
var require_hasOwn = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/util/hasOwn.js"(exports, module) {
    "use strict";
    module.exports = {}.hasOwnProperty;
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/emptyAttrs.js
var require_emptyAttrs = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/emptyAttrs.js"(exports, module) {
    "use strict";
    module.exports = {};
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/cachedAttrsIsStaticMap.js
var require_cachedAttrsIsStaticMap = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/cachedAttrsIsStaticMap.js"(exports, module) {
    "use strict";
    var emptyAttrs = require_emptyAttrs();
    module.exports = /* @__PURE__ */ new Map([[emptyAttrs, true]]);
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/hyperscript.js
var require_hyperscript = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/hyperscript.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var hyperscriptVnode = require_hyperscriptVnode();
    var hasOwn = require_hasOwn();
    var emptyAttrs = require_emptyAttrs();
    var cachedAttrsIsStaticMap = require_cachedAttrsIsStaticMap();
    var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
    var selectorCache = /* @__PURE__ */ Object.create(null);
    function isEmpty(object2) {
      for (var key in object2) if (hasOwn.call(object2, key)) return false;
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/trust.js
var require_trust = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/trust.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(html) {
      if (html == null) html = "";
      return Vnode("<", void 0, void 0, html, void 0, void 0);
    };
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/fragment.js
var require_fragment = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/fragment.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/hyperscript.js
var require_hyperscript2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/hyperscript.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript();
    hyperscript.trust = require_trust();
    hyperscript.fragment = require_fragment();
    module.exports = hyperscript;
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/domFor.js
var require_domFor = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/domFor.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/render.js
var require_render = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render/render.js"(exports, module) {
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
              v2 = vnodes[start];
              if (o === v2 || o == null && v2 == null) continue;
              else if (o == null) createNode(parent, v2, hooks, ns, getNextSibling(old, start + 1, nextSibling));
              else if (v2 == null) removeNode(parent, o);
              else updateNode(parent, o, v2, hooks, getNextSibling(old, start + 1, nextSibling), ns);
            }
            if (old.length > commonLength) removeNodes(parent, old, start, old.length);
            if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
          } else {
            var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v2, oe, ve, topSibling;
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
              v2 = vnodes[start];
              if (o.key !== v2.key) break;
              oldStart++, start++;
              if (o !== v2) updateNode(parent, o, v2, hooks, getNextSibling(old, oldStart, nextSibling), ns);
            }
            while (oldEnd >= oldStart && end >= start) {
              if (start === end) break;
              if (o.key !== ve.key || oe.key !== v2.key) break;
              topSibling = getNextSibling(old, oldStart, nextSibling);
              moveDOM(parent, oe, topSibling);
              if (oe !== v2) updateNode(parent, oe, v2, hooks, topSibling, ns);
              if (++start <= --end) moveDOM(parent, o, nextSibling);
              if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
              if (ve.dom != null) nextSibling = ve.dom;
              oldStart++;
              oldEnd--;
              oe = old[oldEnd];
              ve = vnodes[end];
              o = old[oldStart];
              v2 = vnodes[start];
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
                    v2 = vnodes[i];
                    if (oldIndices[i - start] === -1) createNode(parent, v2, hooks, ns, nextSibling);
                    else {
                      if (lisIndices[li] === i - start) li--;
                      else moveDOM(parent, v2, nextSibling);
                    }
                    if (v2.dom != null) nextSibling = vnodes[i].dom;
                  }
                } else {
                  for (i = end; i >= start; i--) {
                    v2 = vnodes[i];
                    if (oldIndices[i - start] === -1) createNode(parent, v2, hooks, ns, nextSibling);
                    if (v2.dom != null) nextSibling = vnodes[i].dom;
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
        var u = 0, v2 = 0, i = 0;
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
          v2 = result.length - 1;
          while (u < v2) {
            var c = (u >>> 1) + (v2 >>> 1) + (u & v2 & 1);
            if (a[result[c]] < a[i]) {
              u = c + 1;
            } else {
              v2 = c;
            }
          }
          if (a[i] < a[result[u]]) {
            if (u > 0) lisTemp[i] = result[u - 1];
            result[u] = i;
          }
        }
        u = result.length;
        v2 = result[u - 1];
        while (u-- > 0) {
          result[u] = v2;
          v2 = lisTemp[v2];
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/render.js
var require_render2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/render.js"(exports, module) {
    "use strict";
    module.exports = require_render()(typeof window !== "undefined" ? window : null);
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/api/mount-redraw.js
var require_mount_redraw = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/api/mount-redraw.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/mount-redraw.js
var require_mount_redraw2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/mount-redraw.js"(exports, module) {
    "use strict";
    var render = require_render2();
    module.exports = require_mount_redraw()(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/querystring/build.js
var require_build = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/querystring/build.js"(exports, module) {
    "use strict";
    module.exports = function(object2) {
      if (Object.prototype.toString.call(object2) !== "[object Object]") return "";
      var args = [];
      for (var key in object2) {
        destructure(key, object2[key]);
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/build.js
var require_build2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/build.js"(exports, module) {
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
      var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m36, key, variadic) {
        delete query[key];
        if (params[key] == null) return m36;
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/request/request.js
var require_request = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/request/request.js"(exports, module) {
    "use strict";
    var buildPathname = require_build2();
    var hasOwn = require_hasOwn();
    module.exports = function($window, oncompletion) {
      function PromiseProxy(executor) {
        return new Promise(executor);
      }
      function makeRequest(url2, args) {
        return new Promise(function(resolve, reject) {
          url2 = buildPathname(url2, args.params);
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
          xhr.open(method, url2, args.async !== false, typeof args.user === "string" ? args.user : void 0, typeof args.password === "string" ? args.password : void 0);
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
                var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url2);
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
            xhr = args.config(xhr, args, url2) || xhr;
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
        request: function(url2, args) {
          if (typeof url2 !== "string") {
            args = url2;
            url2 = url2.url;
          } else if (args == null) args = {};
          var promise = makeRequest(url2, args);
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/request.js
var require_request2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/request.js"(exports, module) {
    "use strict";
    var mountRedraw = require_mount_redraw2();
    module.exports = require_request()(typeof window !== "undefined" ? window : null, mountRedraw.redraw);
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/querystring/parse.js
var require_parse = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/querystring/parse.js"(exports, module) {
    "use strict";
    function decodeURIComponentSave(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return str;
      }
    }
    module.exports = function(string2) {
      if (string2 === "" || string2 == null) return {};
      if (string2.charAt(0) === "?") string2 = string2.slice(1);
      var entries = string2.split("&"), counters = {}, data = {};
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/parse.js
var require_parse2 = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/parse.js"(exports, module) {
    "use strict";
    var parseQueryString = require_parse();
    module.exports = function(url2) {
      var queryIndex = url2.indexOf("?");
      var hashIndex = url2.indexOf("#");
      var queryEnd = hashIndex < 0 ? url2.length : hashIndex;
      var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
      var path = url2.slice(0, pathEnd).replace(/\/{2,}/g, "/");
      if (!path) path = "/";
      else {
        if (path[0] !== "/") path = "/" + path;
      }
      return {
        path,
        params: queryIndex < 0 ? {} : parseQueryString(url2.slice(queryIndex + 1, queryEnd))
      };
    };
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/compileTemplate.js
var require_compileTemplate = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/pathname/compileTemplate.js"(exports, module) {
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
        function(m36, key, extra) {
          if (key == null) return "\\" + m36;
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/util/censor.js
var require_censor = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/util/censor.js"(exports, module) {
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/api/router.js
var require_router = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/api/router.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var m36 = require_hyperscript();
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
          var child = m36(
            vnode.attrs.selector || "a",
            censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
            vnode.children
          );
          var options, onclick, href;
          if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
            child.attrs.href = null;
            child.attrs["aria-disabled"] = "true";
          } else {
            options = vnode.attrs.options;
            onclick = vnode.attrs.onclick;
            href = buildPathname(child.attrs.href, vnode.attrs.params);
            child.attrs.href = route.prefix + href;
            child.attrs.onclick = function(e) {
              var result;
              if (typeof onclick === "function") {
                result = onclick.call(e.currentTarget, e);
              } else if (onclick == null || typeof onclick !== "object") {
              } else if (typeof onclick.handleEvent === "function") {
                onclick.handleEvent(e);
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

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/route.js
var require_route = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/route.js"(exports, module) {
    "use strict";
    var mountRedraw = require_mount_redraw2();
    module.exports = require_router()(typeof window !== "undefined" ? window : null, mountRedraw);
  }
});

// node_modules/.deno/mithril@2.3.7/node_modules/mithril/index.js
var require_mithril = __commonJS({
  "node_modules/.deno/mithril@2.3.7/node_modules/mithril/index.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript2();
    var request = require_request2();
    var mountRedraw = require_mount_redraw2();
    var domFor = require_domFor();
    var m36 = function m37() {
      return hyperscript.apply(this, arguments);
    };
    m36.m = hyperscript;
    m36.trust = hyperscript.trust;
    m36.fragment = hyperscript.fragment;
    m36.Fragment = "[";
    m36.mount = mountRedraw.mount;
    m36.route = require_route();
    m36.render = require_render2();
    m36.redraw = mountRedraw.redraw;
    m36.request = request.request;
    m36.parseQueryString = require_parse();
    m36.buildQueryString = require_build();
    m36.parsePathname = require_parse2();
    m36.buildPathname = require_build2();
    m36.vnode = require_vnode();
    m36.censor = require_censor();
    m36.domFor = domFor.domFor;
    module.exports = m36;
  }
});

// ts/index.ts
var import_mithril35 = __toESM(require_mithril());

// ts/app.ts
var import_mithril34 = __toESM(require_mithril());

// ts/components/header.ts
var import_mithril = __toESM(require_mithril());

// ts/commons/events.ts
function broadcast(label, detail) {
  console.info(`broadcasting event: ${label}`, detail);
  document.dispatchEvent(
    new CustomEvent(label, {
      detail
    })
  );
}
function listen(label, callback) {
  document.addEventListener(label, callback);
}
function block(event) {
  event?.preventDefault();
}
function navigate(route) {
  return (event) => {
    broadcast("navigate", { route });
    block(event);
  };
}

// ts/components/header.ts
function BurgerMenu() {
  const onclick = (_) => {
    broadcast("click_burger_menu", {});
  };
  return {
    view() {
      return (0, import_mithril.default)("a", { href: "/", onclick }, (0, import_mithril.default)("span.burger", "\u039E"));
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
        // TODO this is a bad fix to an unknown reversion which messed up header item placement
        // ideally we should find out what's actually wrong with the css, but for now...
        (0, import_mithril.default)("ul", { style: "display: ruby" }, [
          (0, import_mithril.default)("li.header-item", {}, (0, import_mithril.default)(BurgerMenu())),
          (0, import_mithril.default)("li.header-item", {}, (0, import_mithril.default)(HeaderBrandText())),
          (0, import_mithril.default)("li.rss-tag header-item", { style: "float: right" }, (0, import_mithril.default)(RSSIcon())),
          (0, import_mithril.default)(
            "li.header-item",
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

// node_modules/.deno/@rgrannell1+tribbledb@0.0.12/node_modules/@rgrannell1/tribbledb/dist/mod.js
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
  static append(set0, set1) {
    for (const item of set1) {
      set0.add(item);
    }
    return set0;
  }
};
var TribbleParser = class {
  stringIndex;
  constructor() {
    this.stringIndex = new IndexedSet();
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
function parseUrn(urn, namespace = "r\xF3") {
  if (!urn.startsWith(`urn:${namespace}:`)) {
    throw new Error(`Invalid URN for namespace ${namespace}: ${urn}`);
  }
  const delimited = urn.split(":");
  const type = delimited[2];
  const idx = urn.indexOf("?");
  const queryString = idx !== -1 ? urn.slice(idx + 1) : "";
  const id = idx !== -1 ? delimited[3].slice(0, delimited[3].indexOf("?")) : delimited[3];
  const qs = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};
  return {
    type,
    id,
    qs
  };
}
function asUrn(value, namespace = "r\xF3") {
  if (typeof value !== "string" || !value.startsWith(`urn:${namespace}:`)) {
    return {
      type: "unknown",
      id: value,
      qs: {}
    };
  }
  return parseUrn(value, namespace);
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
      const source = triple[0];
      const relation = triple[1];
      const target = triple[2];
      let parsedSource = this.stringUrn.get(source);
      if (!parsedSource) {
        parsedSource = asUrn(source);
        this.stringUrn.set(source, parsedSource);
      }
      let parsedTarget = this.stringUrn.get(target);
      if (!parsedTarget) {
        parsedTarget = asUrn(target);
        this.stringUrn.set(target, parsedTarget);
      }
      const sourceTypeIdx = this.stringIndex.add(parsedSource.type);
      const sourceIdIdx = this.stringIndex.add(parsedSource.id);
      const relationIdx = this.stringIndex.add(relation);
      const targetTypeIdx = this.stringIndex.add(parsedTarget.type);
      const targetIdIdx = this.stringIndex.add(parsedTarget.id);
      this.indexedTriples.push([
        this.stringIndex.add(source),
        relationIdx,
        this.stringIndex.add(target)
      ]);
      let sourceTypeSet = this.sourceType.get(sourceTypeIdx);
      if (!sourceTypeSet) {
        sourceTypeSet = /* @__PURE__ */ new Set();
        this.sourceType.set(sourceTypeIdx, sourceTypeSet);
      }
      sourceTypeSet.add(idx);
      let sourceIdSet = this.sourceId.get(sourceIdIdx);
      if (!sourceIdSet) {
        sourceIdSet = /* @__PURE__ */ new Set();
        this.sourceId.set(sourceIdIdx, sourceIdSet);
      }
      sourceIdSet.add(idx);
      for (const [key, val] of Object.entries(parsedSource.qs)) {
        const qsIdx = this.stringIndex.add(`${key}=${val}`);
        if (!this.sourceQs.has(qsIdx)) {
          this.sourceQs.set(qsIdx, /* @__PURE__ */ new Set());
        }
        this.sourceQs.get(qsIdx).add(idx);
      }
      let relationSet = this.relations.get(relationIdx);
      if (!relationSet) {
        relationSet = /* @__PURE__ */ new Set();
        this.relations.set(relationIdx, relationSet);
      }
      relationSet.add(idx);
      let targetTypeSet = this.targetType.get(targetTypeIdx);
      if (!targetTypeSet) {
        targetTypeSet = /* @__PURE__ */ new Set();
        this.targetType.set(targetTypeIdx, targetTypeSet);
      }
      targetTypeSet.add(idx);
      let targetIdSet = this.targetId.get(targetIdIdx);
      if (!targetIdSet) {
        targetIdSet = /* @__PURE__ */ new Set();
        this.targetId.set(targetIdIdx, targetIdSet);
      }
      targetIdSet.add(idx);
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
  /*
   * Convert an array of triples to a TribbleDB.
   */
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
    let firstId = void 0;
    const obj = {};
    for (const [source, relation, target] of this.index.triples()) {
      if (firstId === void 0) {
        firstId = source;
        obj.id = source;
      }
      if (firstId !== source) {
        continue;
      }
      if (!obj[relation]) {
        obj[relation] = listOnly ? [target] : target;
      } else if (Array.isArray(obj[relation])) {
        obj[relation].push(target);
      } else {
        obj[relation] = [obj[relation], target];
      }
    }
    return obj;
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
    for (const [id, obj] of Object.entries(this.#object(listOnly))) {
      obj.id = id;
      output.push(obj);
    }
    return output;
  }
  /*
   * Internal function; convert all triples to an object representation.
   *
   * @param listOnly - Whether to always represent relation values as lists.
   */
  #object(listOnly = false) {
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
  /*
   * Convert a node to a node DSL object.
   */
  nodeAsDSL(node) {
    if (typeof node === "undefined") {
      return void 0;
    }
    if (typeof node === "string") {
      return { type: "unknown", id: node };
    }
    if (Array.isArray(node)) {
      return { type: "unknown", id: node };
    }
    return node;
  }
  /*
   * Convert a relation input to a relation DSL object
   */
  relationAsDSL(relation) {
    if (typeof relation === "undefined") {
      return void 0;
    }
    if (typeof relation === "string") {
      return { relation: [relation] };
    }
    if (Array.isArray(relation)) {
      return { relation };
    }
    return relation;
  }
  searchParamsToObject(params) {
    if (!Array.isArray(params)) {
      return params;
    }
    const [source, relation, target] = params;
    return {
      source: this.nodeAsDSL(source),
      relation: this.relationAsDSL(relation),
      target: this.nodeAsDSL(target)
    };
  }
  #findMatchingRows(params) {
    const matchingRowSets = [
      this.cursorIndices
    ];
    const { source, relation, target } = this.searchParamsToObject(params);
    if (typeof source === "undefined" && typeof target === "undefined" && typeof relation === "undefined") {
      throw new Error("At least one search parameter must be defined");
    }
    const allowedKeys = ["source", "relation", "target"];
    if (!Array.isArray(params)) {
      for (const key of Object.keys(params)) {
        if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
        if (!allowedKeys.includes(key)) {
          throw new Error(`Unexpected search parameter: ${key}`);
        }
      }
    }
    const expandedSource = this.nodeAsDSL(source);
    const expandedRelation = this.relationAsDSL(relation);
    const expandedTarget = this.nodeAsDSL(target);
    if (expandedSource) {
      if (expandedSource.type) {
        const sourceTypeSet = this.index.getSourceTypeSet(expandedSource.type);
        if (sourceTypeSet) {
          matchingRowSets.push(sourceTypeSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (expandedSource.id) {
        const ids = Array.isArray(expandedSource.id) ? expandedSource.id : [expandedSource.id];
        const idSet = /* @__PURE__ */ new Set();
        for (const id of ids) {
          const sourceIdSet = this.index.getSourceIdSet(id);
          if (sourceIdSet) {
            Sets.append(idSet, sourceIdSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
        matchingRowSets.push(idSet);
      }
      if (expandedSource.qs) {
        for (const [key, val] of Object.entries(expandedSource.qs)) {
          const sourceQsSet = this.index.getSourceQsSet(key, val);
          if (sourceQsSet) {
            matchingRowSets.push(sourceQsSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
      }
    }
    if (expandedTarget) {
      if (expandedTarget.type) {
        const targetTypeSet = this.index.getTargetTypeSet(expandedTarget.type);
        if (targetTypeSet) {
          matchingRowSets.push(targetTypeSet);
        } else {
          return /* @__PURE__ */ new Set();
        }
      }
      if (expandedTarget.id) {
        const ids = Array.isArray(expandedTarget.id) ? expandedTarget.id : [expandedTarget.id];
        const idSet = /* @__PURE__ */ new Set();
        for (const id of ids) {
          const targetIdSet = this.index.getTargetIdSet(id);
          if (targetIdSet) {
            Sets.append(idSet, targetIdSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
        matchingRowSets.push(idSet);
      }
      if (expandedTarget.qs) {
        for (const [key, val] of Object.entries(expandedTarget.qs)) {
          const targetQsSet = this.index.getTargetQsSet(key, val);
          if (targetQsSet) {
            matchingRowSets.push(targetQsSet);
          } else {
            return /* @__PURE__ */ new Set();
          }
        }
      }
    }
    if (expandedRelation && expandedRelation.relation) {
      const unionedRelations = /* @__PURE__ */ new Set();
      for (const rel of expandedRelation.relation) {
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
    const intersection = Sets.intersection(this.metrics, matchingRowSets);
    const matchingTriples = /* @__PURE__ */ new Set();
    const hasSourcePredicate = expandedSource?.predicate !== void 0;
    const hasTargetPredicate = expandedTarget?.predicate !== void 0;
    const hasRelationPredicate = typeof expandedRelation === "object" && expandedRelation.predicate !== void 0;
    for (const index of intersection) {
      const triple = this.index.getTriple(index);
      if (!hasSourcePredicate && !hasTargetPredicate && !hasRelationPredicate) {
        matchingTriples.add(index);
        continue;
      }
      let isValid = true;
      if (hasSourcePredicate) {
        isValid = isValid && expandedSource.predicate(Triples.source(triple));
      }
      if (hasTargetPredicate && isValid) {
        isValid = isValid && expandedTarget.predicate(Triples.target(triple));
      }
      if (hasRelationPredicate && isValid) {
        isValid = isValid && expandedRelation.predicate(Triples.relation(triple));
      }
      if (isValid) {
        matchingTriples.add(index);
      }
    }
    return matchingTriples;
  }
  /*
   * Search across all triples in the database. There are two forms of query possible:
   *
   * - Object: { source?, relation?, target }
   * - Array: [ source?, relation?, target? ]
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
  /*
   * Get performance metrics for the database.
   */
  getMetrics() {
    return {
      index: this.index.metrics,
      db: this.metrics
    };
  }
};

// ts/services/dark-mode.ts
var DarkModes = class {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }
  static save(value) {
    return localStorage.setItem("darkMode", `${value}`);
  }
};

// ts/constants.ts
var PHOTO_WIDTH = 400;
var PHOTO_HEIGHT = 400;
var KnownRelations = class {
  static {
    this.ALBUM_ID = "albumId";
  }
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
  static {
    this.STYLE = "style";
  }
  static {
    // horrible
    this.FLAGS = "flags";
  }
};
var KnownTypes = class {
  static {
    this.PLACE = "place";
  }
  static {
    this.COUNTRY = "country";
  }
  static {
    this.BIRD = "bird";
  }
  static {
    this.MAMMAL = "mammal";
  }
  static {
    this.REPTILE = "reptile";
  }
  static {
    this.AMPHIBIAN = "amphibian";
  }
  static {
    this.INSECT = "insect";
  }
  static {
    this.CAMERA = "camera";
  }
  static {
    this.PHOTO = "photo";
  }
  static {
    this.VIDEO = "video";
  }
  static {
    this.ALBUM = "album";
  }
  static {
    this.UNESCO = "unesco";
  }
  static {
    this.FISH = "fish";
  }
  static {
    this.PLACE_FEATURE = "place_feature";
  }
};
var NonListableTypes = /* @__PURE__ */ new Set([
  KnownTypes.COUNTRY,
  KnownTypes.CAMERA,
  KnownTypes.PLACE
]);
var PLURALS = /* @__PURE__ */ new Map([
  ["country", "countries"]
]);
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
var CURIES = {
  "i": "urn:r\xF3:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/"
};
var CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;
var ENDPOINT = "https://photos-cdn.rgrannell.xyz";
var PLACE_FEATURES_TO_EMOJI = {
  aquarium: "\u{1F420}",
  archaeological: "\u{1F3FA}",
  beach: "\u{1F3D6}\uFE0F",
  bridge: "\u{1F309}",
  canal: "\u{1F6A4}",
  castle: "\u{1F3F0}",
  church: "\u26EA",
  cathedral: "\u26EA",
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
  zoo: "\u{1F993}"
};
var CAMERA_MODELS = /* @__PURE__ */ new Set([
  "dc-gh5",
  "dc-gh6",
  "dmc-fz72",
  "dmc-g7",
  "finepix-f70exr",
  "xz-1"
]);
var PHONE_MODELS = /* @__PURE__ */ new Set([
  "pixel-4a",
  "pixel-7-pro",
  "pixel-9a",
  "sm-a520f"
]);
var BinomialTypes = /* @__PURE__ */ new Set([
  KnownTypes.BIRD,
  KnownTypes.MAMMAL,
  KnownTypes.REPTILE,
  KnownTypes.AMPHIBIAN,
  KnownTypes.FISH,
  KnownTypes.INSECT
]);

// ts/commons/strings.ts
var CAMEL_CASE_CACHE = /* @__PURE__ */ new Map();
var Strings = class _Strings {
  static capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static pluralise(str) {
    if (PLURALS.has(str)) {
      return PLURALS.get(str);
    }
    return str + "s";
  }
  static camelCase(str) {
    if (CAMEL_CASE_CACHE.has(str)) {
      return CAMEL_CASE_CACHE.get(str);
    }
    const result = str.replace(/[-_ ]+([a-z0-9])/g, (_, char) => char.toUpperCase());
    CAMEL_CASE_CACHE.set(str, result);
    return result;
  }
  static binomial(binomial) {
    const pretty = binomial.replace(/-/g, " ");
    return _Strings.capitalise(pretty);
  }
};

// ts/semantic/derive.ts
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
var styleNames = /* @__PURE__ */ new Set();
function convertStylesToUrns(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.STYLE) {
    return [triple];
  }
  const id = tgt.toLowerCase().replace(/ /g, "-");
  const styleUrn = `urn:r\xF3:style:${id}`;
  if (!styleNames.has(tgt)) {
    styleNames.add(tgt);
    return [
      [
        src,
        rel,
        styleUrn
      ],
      [
        styleUrn,
        KnownRelations.NAME,
        tgt
      ]
    ];
  } else {
    return [[
      src,
      rel,
      styleUrn
    ]];
  }
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
  for (const [to, from] of RelationSymmetries) {
    if (rel === to) {
      return [
        triple,
        [
          tgt,
          from,
          src
        ]
      ];
    }
  }
  return [triple];
}
var CURIE_CACHE = /* @__PURE__ */ new Map();
function expandCurie(curies, value) {
  const cached = CURIE_CACHE.get(value);
  if (cached) {
    return cached;
  }
  if (typeof value !== "string" || !CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);
  if (!match) {
    return value;
  }
  const prefix = match[1];
  const id = match[2];
  const result = curies[prefix] ? `${curies[prefix]}${id}` : value;
  CURIE_CACHE.set(value, result);
  return result;
}
function expandTripleCuries(triple) {
  const [src, rel, tgt] = triple;
  return [
    [
      expandCurie(CURIES, src),
      rel,
      expandCurie(CURIES, tgt)
    ]
  ];
}
var TREE_STATE = {
  nodes: /* @__PURE__ */ new Map(),
  // used later to detect whether a node is a leaf
  branchIds: /* @__PURE__ */ new Set()
};
function buildLocationTrees(triple) {
  const [src, rel, tgt] = triple;
  if (rel !== KnownRelations.IN) {
    return [triple];
  }
  const nodes = TREE_STATE.nodes;
  if (!nodes.has(src)) {
    nodes.set(src, { id: src, parents: /* @__PURE__ */ new Set() });
  }
  const srcNode = nodes.get(src);
  if (!nodes.has(tgt)) {
    nodes.set(tgt, { id: tgt, parents: /* @__PURE__ */ new Set() });
  }
  TREE_STATE.branchIds.add(tgt);
  srcNode?.parents.add(tgt);
  return [triple];
}
var HARD_CODED_TRIPLES = [
  ["urn:r\xF3:rating:%E2%AD%90", KnownRelations.NAME, "\u2B50"],
  ["urn:r\xF3:rating:%E2%AD%90%E2%AD%90", KnownRelations.NAME, "\u2B50\u2B50"],
  ["urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90", KnownRelations.NAME, "\u2B50\u2B50\u2B50"],
  [
    "urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
    KnownRelations.NAME,
    "\u2B50\u2B50\u2B50\u2B50"
  ],
  [
    "urn:r\xF3:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
    KnownRelations.NAME,
    "\u2B50\u2B50\u2B50\u2B50\u2B50"
  ]
];
function deriveTriples(triple) {
  const tripleProcessors = [
    convertRatingsToUrns,
    convertCountriesToUrns,
    convertStylesToUrns,
    convertRelationCasing,
    expandCdnUrls,
    expandUrns,
    addSeason,
    addYear,
    addInverseRelations,
    expandTripleCuries,
    buildLocationTrees
  ];
  let outputTriples = [triple];
  for (const fn of tripleProcessors) {
    let nextStep = [];
    for (const triple2 of outputTriples) {
      nextStep.push(...fn(triple2));
    }
    outputTriples = [...nextStep];
    nextStep = [];
  }
  return outputTriples;
}
function addNestedLocations() {
  function recurse(path, urn) {
    const triples2 = [];
    const node = TREE_STATE.nodes.get(urn);
    if (!node) {
      throw new Error(`no node in location tree for ${urn}`);
    }
    if (path.length > 5) {
      throw new Error(`likely cycle; ${JSON.stringify(path)}`);
    }
    if (node.parents.size === 0) {
      const totalPath = [...path, urn];
      for (let idx = 0; idx < totalPath.length - 1; idx++) {
        for (let jdx = idx; jdx < totalPath.length; jdx++) {
          const src = totalPath[idx];
          const tgt = totalPath[jdx];
          if (src === tgt) {
            continue;
          }
          triples2.push([src, KnownRelations.IN, tgt]);
          triples2.push([tgt, KnownRelations.CONTAINS, src]);
        }
      }
    } else {
      for (const parent of node.parents) {
        triples2.push(...recurse([...path, urn], parent));
      }
    }
    return triples2;
  }
  const triples = [];
  for (const nodeId of TREE_STATE.nodes.keys()) {
    if (TREE_STATE.branchIds.has(nodeId)) {
      continue;
    }
    triples.push(...recurse([], nodeId));
  }
  return triples;
}

// ts/semantic/data.ts
async function* streamTribbles(url2) {
  const parser = new TribbleParser();
  const res = await fetch(url2);
  if (!res.body) {
    throw new Error("No response body");
  }
  const decoder = new TextDecoderStream();
  const reader = res.body.pipeThrough(decoder).getReader();
  let buffer = "";
  const tripleBuffer = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const triple = parser.parse(line);
      if (triple !== void 0) {
        tripleBuffer.push(triple);
      }
      if (tripleBuffer.length >= 500) {
        yield [...tripleBuffer];
        tripleBuffer.length = 0;
      }
    }
  }
  if (buffer.length > 0) {
    const triple = parser.parse(buffer);
    if (triple !== void 0) {
      tripleBuffer.push(triple);
    }
  }
  if (tripleBuffer.length > 0) {
    yield [...tripleBuffer];
  }
}
var tdb = null;
async function loadTriples(url2, schema = {}, fn = (x) => [x]) {
  if (!tdb) {
    tdb = new TribbleDB([], schema);
  }
  for await (const triples of streamTribbles(url2)) {
    for (const triple of triples) {
      tdb.add(fn(triple));
    }
  }
  tdb.add(addNestedLocations());
  return tdb;
}

// ts/commons/numbers.ts
function asInt(value) {
  if (typeof value === "number") {
    return value;
  }
  return parseInt(value, 10);
}

// ts/semantic/names.ts
var NAME_TO_URN_CACHE = /* @__PURE__ */ new Map();
function namesToUrns(tdb2, names) {
  const urns = /* @__PURE__ */ new Set();
  if (names.size === 0) {
    return urns;
  }
  for (const name of names) {
    if (NAME_TO_URN_CACHE.has(name)) {
      const cachedUrn = NAME_TO_URN_CACHE.get(name);
      if (cachedUrn) {
        urns.add(cachedUrn);
      }
    }
  }
  if (urns.size === names.size) {
    return urns;
  }
  const namesCursor = tdb2.search({
    relation: KnownRelations.NAME,
    target: Array.from(names)
  });
  for (const [urn, _, name] of namesCursor.triples()) {
    if (names.has(name)) {
      urns.add(urn);
    }
  }
  return urns;
}

// ts/commons/arrays.ts
function arrayify(value) {
  if (value === void 0) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function one(value) {
  if (value === void 0) {
    return void 0;
  }
  return Array.isArray(value) ? value[0] : value;
}

// ts/services/things.ts
var import_mithril3 = __toESM(require_mithril());

// ts/components/thing-link.ts
var import_mithril2 = __toESM(require_mithril());

// ts/services/emoji.ts
function placeEmoji(thing) {
  const feature = one(thing.feature);
  const { id: featureId } = asUrn(feature);
  if (Object.prototype.hasOwnProperty.call(PLACE_FEATURES_TO_EMOJI, featureId)) {
    return PLACE_FEATURES_TO_EMOJI[featureId];
  }
  return "\u{1F4CD}";
}
function placeFeatureEmoji(featureUrn) {
  const { id: featureId } = asUrn(featureUrn);
  if (Object.prototype.hasOwnProperty.call(PLACE_FEATURES_TO_EMOJI, featureId)) {
    return PLACE_FEATURES_TO_EMOJI[featureId];
  }
  return "\u{1F4CD}";
}
function countryEmoji(thing) {
  const flag = one(thing.flag);
  return flag;
}
function birdEmoji() {
  return "\u{1F424}";
}
function cameraEmoji(thing) {
  const { id } = asUrn(thing.id);
  if (CAMERA_MODELS.has(id)) {
    return "\u{1F4F7}";
  } else if (PHONE_MODELS.has(id)) {
    return "\u{1F4F1}";
  }
  return "\u{1F4F7}";
}
function thingEmoji(urn, name, thing) {
  const { type } = asUrn(urn);
  switch (type) {
    case KnownTypes.PLACE:
      return placeEmoji(thing);
    case KnownTypes.COUNTRY:
      return countryEmoji(thing);
    case KnownTypes.BIRD:
      return birdEmoji();
    case KnownTypes.CAMERA:
      return cameraEmoji(thing);
    case KnownTypes.PLACE_FEATURE:
      return placeFeatureEmoji(urn);
    default:
      return "";
  }
}

// ts/components/thing-link.ts
function ThingLink() {
  return {
    view(vnode) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);
      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);
      return (0, import_mithril2.default)("a", {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
        class: ["thing-link", `${type}-link`].join(" ")
      }, `${emoji}	${name}`);
    }
  };
}

// ts/services/things.ts
function readThing(tdb2, urn) {
  const parsed = asUrn(urn);
  return tdb2.search({
    source: { id: parsed.id, type: parsed.type }
  }).firstObject();
}
function readParsedThing(parser, tdb2, id) {
  const thing = readThing(tdb2, id);
  if (!thing) {
    return void 0;
  }
  return parser(tdb2, thing);
}
function readThings(tdb2, urns) {
  const things = [];
  for (const urn of urns) {
    const thing = readThing(tdb2, urn);
    if (thing) {
      things.push(thing);
    }
  }
  return things;
}
var readParsedThings = function(parser, tdb2, urns) {
  const parsedThings = [];
  for (const urn of urns) {
    const thing = readThing(tdb2, urn);
    if (!thing) {
      continue;
    }
    const parsed = parser(tdb2, thing);
    if (parsed) {
      parsedThings.push(parsed);
    }
  }
  return parsedThings;
};
function readNamedTypeThings(tdb2, type) {
  const things = tdb2.search({
    source: { type }
  }).objects();
  return things.filter((thing) => {
    return Object.prototype.hasOwnProperty.call(thing, "name");
  }).sort((thinga, thingb) => {
    const firstName = thinga.name;
    const secondName = thingb.name;
    const first = one(firstName);
    const second = one(secondName);
    return first.localeCompare(second);
  });
}
function toThingLinks(tdb2, urns) {
  return urns.flatMap((urn) => {
    if (!urn) {
      return [];
    }
    const thing = readThing(tdb2, urn);
    if (!thing || !thing.name) {
      return [];
    }
    return [(0, import_mithril3.default)(ThingLink, {
      urn,
      thing: readThing(tdb2, urn)
    })];
  });
}

// node_modules/.deno/valibot@1.1.0/node_modules/valibot/dist/index.js
var store;
// @__NO_SIDE_EFFECTS__
function getGlobalConfig(config2) {
  return {
    lang: config2?.lang ?? store?.lang,
    message: config2?.message,
    abortEarly: config2?.abortEarly ?? store?.abortEarly,
    abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
  };
}
var store2;
// @__NO_SIDE_EFFECTS__
function getGlobalMessage(lang) {
  return store2?.get(lang);
}
var store3;
// @__NO_SIDE_EFFECTS__
function getSchemaMessage(lang) {
  return store3?.get(lang);
}
var store4;
// @__NO_SIDE_EFFECTS__
function getSpecificMessage(reference, lang) {
  return store4?.get(reference)?.get(lang);
}
// @__NO_SIDE_EFFECTS__
function _stringify(input) {
  const type = typeof input;
  if (type === "string") {
    return `"${input}"`;
  }
  if (type === "number" || type === "bigint" || type === "boolean") {
    return `${input}`;
  }
  if (type === "object" || type === "function") {
    return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
  }
  return type;
}
function _addIssue(context, label, dataset, config2, other) {
  const input = other && "input" in other ? other.input : dataset.value;
  const expected = other?.expected ?? context.expects ?? null;
  const received = other?.received ?? /* @__PURE__ */ _stringify(input);
  const issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config2.lang,
    abortEarly: config2.abortEarly,
    abortPipeEarly: config2.abortPipeEarly
  };
  const isSchema = context.kind === "schema";
  const message2 = other?.message ?? context.message ?? /* @__PURE__ */ getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? /* @__PURE__ */ getSchemaMessage(issue.lang) : null) ?? config2.message ?? /* @__PURE__ */ getGlobalMessage(issue.lang);
  if (message2 !== void 0) {
    issue.message = typeof message2 === "function" ? (
      // @ts-expect-error
      message2(issue)
    ) : message2;
  }
  if (isSchema) {
    dataset.typed = false;
  }
  if (dataset.issues) {
    dataset.issues.push(issue);
  } else {
    dataset.issues = [issue];
  }
}
// @__NO_SIDE_EFFECTS__
function _getStandardProps(context) {
  return {
    version: 1,
    vendor: "valibot",
    validate(value2) {
      return context["~run"]({ value: value2 }, /* @__PURE__ */ getGlobalConfig());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _joinExpects(values2, separator) {
  const list = [...new Set(values2)];
  if (list.length > 1) {
    return `(${list.join(` ${separator} `)})`;
  }
  return list[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function url(message2) {
  return {
    kind: "validation",
    type: "url",
    reference: url,
    async: false,
    expects: null,
    requirement(input) {
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    },
    message: message2,
    "~run"(dataset, config2) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, "URL", dataset, config2);
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function getFallback(schema, dataset, config2) {
  return typeof schema.fallback === "function" ? (
    // @ts-expect-error
    schema.fallback(dataset, config2)
  ) : (
    // @ts-expect-error
    schema.fallback
  );
}
// @__NO_SIDE_EFFECTS__
function getDefault(schema, dataset, config2) {
  return typeof schema.default === "function" ? (
    // @ts-expect-error
    schema.default(dataset, config2)
  ) : (
    // @ts-expect-error
    schema.default
  );
}
// @__NO_SIDE_EFFECTS__
function any() {
  return {
    kind: "schema",
    type: "any",
    reference: any,
    expects: "any",
    async: false,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset) {
      dataset.typed = true;
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function array(item, message2) {
  return {
    kind: "schema",
    type: "array",
    reference: array,
    expects: "Array",
    async: false,
    item,
    message: message2,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < input.length; key++) {
          const value2 = input[key];
          const itemDataset = this.item["~run"]({ value: value2 }, config2);
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value2
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) {
                issue.path.unshift(pathItem);
              } else {
                issue.path = [pathItem];
              }
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) {
              dataset.issues = itemDataset.issues;
            }
            if (config2.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) {
            dataset.typed = false;
          }
          dataset.value.push(itemDataset.value);
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function object(entries2, message2) {
  return {
    kind: "schema",
    type: "object",
    reference: object,
    expects: "Object",
    async: false,
    entries: entries2,
    message: message2,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && // @ts-expect-error
          valueSchema.default !== void 0) {
            const value2 = key in input ? (
              // @ts-expect-error
              input[key]
            ) : /* @__PURE__ */ getDefault(valueSchema);
            const valueDataset = valueSchema["~run"]({ value: value2 }, config2);
            if (valueDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value2
              };
              for (const issue of valueDataset.issues) {
                if (issue.path) {
                  issue.path.unshift(pathItem);
                } else {
                  issue.path = [pathItem];
                }
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) {
                dataset.issues = valueDataset.issues;
              }
              if (config2.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!valueDataset.typed) {
              dataset.typed = false;
            }
            dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== void 0) {
            dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
          } else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
            _addIssue(this, "key", dataset, config2, {
              input: void 0,
              expected: `"${key}"`,
              path: [
                {
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  // @ts-expect-error
                  value: input[key]
                }
              ]
            });
            if (config2.abortEarly) {
              break;
            }
          }
        }
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function optional(wrapped, default_) {
  return {
    kind: "schema",
    type: "optional",
    reference: optional,
    expects: `(${wrapped.expects} | undefined)`,
    async: false,
    wrapped,
    default: default_,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      if (dataset.value === void 0) {
        if (this.default !== void 0) {
          dataset.value = /* @__PURE__ */ getDefault(this, dataset, config2);
        }
        if (dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped["~run"](dataset, config2);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function string(message2) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: false,
    message: message2,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      if (typeof dataset.value === "string") {
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config2);
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _subIssues(datasets) {
  let issues;
  if (datasets) {
    for (const dataset of datasets) {
      if (issues) {
        issues.push(...dataset.issues);
      } else {
        issues = dataset.issues;
      }
    }
  }
  return issues;
}
// @__NO_SIDE_EFFECTS__
function union(options, message2) {
  return {
    kind: "schema",
    type: "union",
    reference: union,
    expects: /* @__PURE__ */ _joinExpects(
      options.map((option) => option.expects),
      "|"
    ),
    async: false,
    options,
    message: message2,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      let validDataset;
      let typedDatasets;
      let untypedDatasets;
      for (const schema of this.options) {
        const optionDataset = schema["~run"]({ value: dataset.value }, config2);
        if (optionDataset.typed) {
          if (optionDataset.issues) {
            if (typedDatasets) {
              typedDatasets.push(optionDataset);
            } else {
              typedDatasets = [optionDataset];
            }
          } else {
            validDataset = optionDataset;
            break;
          }
        } else {
          if (untypedDatasets) {
            untypedDatasets.push(optionDataset);
          } else {
            untypedDatasets = [optionDataset];
          }
        }
      }
      if (validDataset) {
        return validDataset;
      }
      if (typedDatasets) {
        if (typedDatasets.length === 1) {
          return typedDatasets[0];
        }
        _addIssue(this, "type", dataset, config2, {
          issues: /* @__PURE__ */ _subIssues(typedDatasets)
        });
        dataset.typed = true;
      } else if (untypedDatasets?.length === 1) {
        return untypedDatasets[0];
      } else {
        _addIssue(this, "type", dataset, config2, {
          issues: /* @__PURE__ */ _subIssues(untypedDatasets)
        });
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function pipe(...pipe2) {
  return {
    ...pipe2[0],
    pipe: pipe2,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config2) {
      for (const item of pipe2) {
        if (item.kind !== "metadata") {
          if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
            dataset.typed = false;
            break;
          }
          if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
            dataset = item["~run"](dataset, config2);
          }
        }
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function safeParse(schema, input, config2) {
  const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config2));
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}

// ts/parsers/schemas.ts
var v = {
  string,
  array,
  object,
  optional,
  union,
  any,
  pipe,
  url
};
var AlbumSchema = v.object({
  name: v.string(),
  minDate: v.string(),
  maxDate: v.string(),
  thumbnailUrl: v.string(),
  mosaic: v.any(),
  id: v.string(),
  photosCount: v.string(),
  videosCount: v.string(),
  flags: v.any(),
  description: v.optional(v.string())
});
var CountrySchema = v.object({
  id: v.string(),
  flag: v.optional(v.string()),
  name: v.string(),
  contains: v.optional(v.union([v.string(), v.array(v.string())]))
});
var UnescoSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  longitude: v.optional(v.string()),
  latitude: v.optional(v.string())
});
var PlaceSchema = v.object({
  id: v.string(),
  name: v.string(),
  feature: v.optional(v.union([v.string(), v.array(v.string())])),
  in: v.optional(v.union([v.string(), v.array(v.string())])),
  shortName: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
  unescoId: v.optional(v.string())
});
var PhotoSchema = v.object({
  albumId: v.string(),
  country: v.optional(v.union([v.string(), v.array(v.string())])),
  createdAt: v.string(),
  subject: v.optional(v.union([v.string(), v.array(v.string())])),
  exposureTime: v.optional(v.string()),
  fStop: v.optional(v.string()),
  focalLength: v.optional(v.string()),
  fullImage: v.string(),
  height: v.optional(v.string()),
  id: v.string(),
  iso: v.optional(v.string()),
  location: v.optional(v.union([v.string(), v.array(v.string())])),
  midImageLossyUrl: v.string(),
  model: v.optional(v.string()),
  mosaicColours: v.string(),
  pngUrl: v.string(),
  rating: v.optional(v.string()),
  style: v.optional(v.string()),
  thumbnailUrl: v.string(),
  width: v.optional(v.string()),
  description: v.optional(v.string()),
  summary: v.optional(v.string())
});
var MammalSchema = v.object({
  id: v.string(),
  name: v.string(),
  wikipedia: v.optional(v.string())
});
var ReptileSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string())
});
var AmphibianSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string())
});
var InsectSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string())
});
var SubjectSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string())
});
var BirdSchema = v.object({
  id: v.string(),
  name: v.optional(v.string()),
  wikipedia: v.optional(v.string()),
  birdwatchUrl: v.optional(v.union([v.string(), v.array(v.string())]))
});
var VideoSchema = v.object({
  id: v.string(),
  albumId: v.string(),
  description: v.string(),
  posterUrl: v.pipe(v.string(), v.url()),
  videoUrl1080p: v.pipe(v.string(), v.url()),
  videoUrl480p: v.pipe(v.string(), v.url()),
  videoUrl720p: v.pipe(v.string(), v.url()),
  videoUrlUnscaled: v.pipe(v.string(), v.url())
});
var FeatureSchema = v.object({
  id: v.string(),
  name: v.optional(v.string())
});

// ts/commons/logger.ts
function logParseWarning(issues) {
  const message = [];
  for (const issue of issues) {
    message.push(`Parse warning [${issue.path.join(".")}]: ${issue.message}`);
  }
  console.warn(message.join("\n"));
}

// ts/parsers/parser.ts
function parseObject(schema, type, object2) {
  const result = safeParse(schema, object2);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }
  return { ...result.output, type };
}

// ts/parsers/location.ts
function parsePlace(tdb2, place) {
  const result = safeParse(PlaceSchema, place);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }
  const refs = arrayify(result.output.in);
  const lookedUpRefs = refs.flatMap((ref) => {
    const obj = readThing(tdb2, ref);
    if (!obj) {
      return [];
    }
    const parsed = parseLocation(tdb2, obj);
    if (!parsed) {
      return [];
    }
    return [parsed];
  });
  return {
    ...result.output,
    type: "place",
    in: lookedUpRefs
  };
}
function parseCountry(_, country) {
  return parseObject(CountrySchema, "country", country);
}
function parseUnesco(_, unesco) {
  return parseObject(UnescoSchema, "unesco", unesco);
}
function parseLocation(tdb2, location2) {
  if (!location2.id) {
    return void 0;
  }
  const id = asUrn(location2.id);
  if (id.type === KnownTypes.PLACE) {
    return parsePlace(tdb2, location2);
  } else if (id.type === KnownTypes.COUNTRY) {
    return parseCountry(tdb2, location2);
  }
  return void 0;
}

// ts/services/location.ts
var readCountry = (tdb2, id) => {
  return readParsedThing(
    parseCountry,
    tdb2,
    id
  );
};
var readPlace = (tdb2, id) => {
  return readParsedThing(
    parsePlace,
    tdb2,
    id
  );
};
var readLocation = (tdb2, id) => {
  return readParsedThing(
    parseLocation,
    tdb2,
    id
  );
};
var readUnesco = (tdb2, id) => {
  return readParsedThing(
    parseUnesco,
    tdb2,
    id
  );
};
var readCountries = (tdb2, urns) => {
  return readParsedThings(
    parseCountry,
    tdb2,
    urns
  );
};
var readLocations = (tdb2, urns) => {
  return readParsedThings(
    parseLocation,
    tdb2,
    urns
  );
};
var readUnescos = (tdb2, urns) => {
  return readParsedThings(
    parseUnesco,
    tdb2,
    urns
  );
};

// ts/parsers/album.ts
function parseAlbum(tdb2, album) {
  const result = safeParse(AlbumSchema, album);
  if (!result.success) {
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.issues)}`
    );
  }
  const data = result.output;
  const countryNames = new Set(arrayify(data.flags));
  const countries = readCountries(tdb2, namesToUrns(tdb2, countryNames));
  return {
    name: data.name,
    minDate: asInt(data.minDate),
    maxDate: asInt(data.maxDate),
    thumbnailUrl: data.thumbnailUrl,
    mosaicColours: data.mosaic,
    id: data.id,
    photosCount: asInt(data.photosCount),
    videosCount: asInt(data.videosCount),
    description: data.description ?? "",
    countries
  };
}

// ts/parsers/photo.ts
function parsePhoto(_, photo) {
  return parseObject(PhotoSchema, "photo", photo);
}

// ts/parsers/subject.ts
function parseBird(_, subject) {
  return parseObject(BirdSchema, "bird", subject);
}
function parseMammal(_, subject) {
  return parseObject(MammalSchema, "mammal", subject);
}
function parseReptile(_, subject) {
  return parseObject(ReptileSchema, "reptile", subject);
}
function parseAmphibian(_, subject) {
  return parseObject(AmphibianSchema, "amphibian", subject);
}
function parseInsect(_, subject) {
  return parseObject(InsectSchema, "insect", subject);
}
function parseSubject(_, subject) {
  const parsed = asUrn(subject.id);
  if (parsed.type === KnownTypes.BIRD) {
    return parseBird(_, subject);
  } else if (parsed.type === KnownTypes.MAMMAL) {
    return parseMammal(_, subject);
  } else if (parsed.type === KnownTypes.REPTILE) {
    return parseReptile(_, subject);
  } else if (parsed.type === KnownTypes.AMPHIBIAN) {
    return parseAmphibian(_, subject);
  } else if (parsed.type === KnownTypes.INSECT) {
    return parseInsect(_, subject);
  }
  const result = safeParse(SubjectSchema, subject);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }
  return result.output;
}

// ts/services/subjects.ts
var readMammal = (tdb2, id) => {
  return readParsedThing(parseMammal, tdb2, id);
};
var readReptile = (tdb2, id) => {
  return readParsedThing(parseReptile, tdb2, id);
};
var readAmphibian = (tdb2, id) => {
  return readParsedThing(parseMammal, tdb2, id);
};
var readInsect = (tdb2, id) => {
  return readParsedThing(parseInsect, tdb2, id);
};
var readSubjects = (tdb2, urns) => {
  return readParsedThings(parseSubject, tdb2, urns);
};

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
function readAllPhotos(tdb2) {
  return tdb2.search({
    source: { type: "photo" }
  }).objects().flatMap((obj) => {
    const photo = parsePhoto(tdb2, obj);
    return photo ? [photo] : [];
  });
}
function readThingsByPhotoIds(tdb2, photoIds) {
  const locations = /* @__PURE__ */ new Set();
  const subjects = /* @__PURE__ */ new Set();
  for (const photoId of photoIds) {
    const pid = asUrn(photoId);
    const obj = tdb2.search({
      source: { type: pid.type, id: pid.id },
      relation: [KnownRelations.LOCATION, KnownRelations.SUBJECT]
    }).firstObject(true);
    if (!obj) {
      continue;
    }
    const location2 = obj?.location ?? [];
    const subject = obj?.subject ?? [];
    for (const loc of location2) {
      locations.add(loc);
    }
    for (const subj of subject) {
      subjects.add(subj);
    }
  }
  return {
    subjects: readSubjects(tdb2, subjects),
    locations: readLocations(tdb2, locations)
  };
}
function readPhotosByThingIds(tdb2, thingsUrns) {
  const photoIds = /* @__PURE__ */ new Set();
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);
    const results = tdb2.search({
      //relation: KnownRelations.SUBJECT,
      target: { type, id }
    }).sources();
    for (const result of results) {
      photoIds.add(result);
    }
  }
  return readPhotos(tdb2, photoIds);
}
var readPhoto = (tdb2, id) => {
  return readParsedThing(parsePhoto, tdb2, id);
};
var readPhotos = (tdb2, urns) => {
  return readParsedThings(parsePhoto, tdb2, urns);
};

// ts/parsers/video.ts
function parseVideo(_, video) {
  return parseObject(VideoSchema, "video", video);
}

// ts/services/videos.ts
var readVideo = (tdb2, id) => {
  return readParsedThing(parseVideo, tdb2, id);
};
var readVideos = (tdb2, urns) => {
  return readParsedThings(parseVideo, tdb2, urns);
};
function readAllVideos(tdb2) {
  const videos = tdb2.search({
    source: { type: "video" }
  }).sources();
  return readVideos(tdb2, videos);
}

// ts/services/albums.ts
function albumYear(album) {
  return new Date(album.minDate).getFullYear();
}
function readAllAlbums(tdb2) {
  const ids = tdb2.search({
    source: { type: KnownTypes.ALBUM }
  }).sources();
  return readAlbums(tdb2, ids).sort((album0, album1) => {
    return album1.minDate - album0.minDate;
  });
}
function readAlbumPhotoIds(tdb2, id) {
  return tdb2.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.ALBUM_ID,
    target: { id: asUrn(id).id }
  }).sources();
}
function readAlbumPhotosByAlbumId(tdb2, id) {
  return readPhotos(tdb2, readAlbumPhotoIds(tdb2, id));
}
function readAlbumVideoIds(tdb2, id) {
  return tdb2.search({
    source: { type: KnownTypes.VIDEO },
    relation: KnownRelations.ALBUM_ID,
    target: { id: asUrn(id).id }
  }).sources();
}
function readAlbumVideosByAlbumId(tdb2, id) {
  return readVideos(tdb2, readAlbumVideoIds(tdb2, id));
}
function readThingsByAlbumId(tdb2, id) {
  return readThingsByPhotoIds(tdb2, readAlbumPhotoIds(tdb2, id));
}
function readAlbumsByThingIds(tdb2, thingsUrns) {
  const photoIds = /* @__PURE__ */ new Set();
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);
    const results = tdb2.search({
      //relation: KnownRelations.SUBJECT,
      target: { type, id }
    }).sources();
    for (const result of results) {
      photoIds.add(result);
    }
  }
  const albumIds = /* @__PURE__ */ new Set();
  for (const photoId of photoIds) {
    const pid = asUrn(photoId);
    const results = tdb2.search({
      source: { type: pid.type, id: pid.id },
      relation: KnownRelations.ALBUM_ID
    }).targets();
    for (const result of results) {
      albumIds.add(result);
    }
  }
  return readAlbums(tdb2, albumIds);
}
var readAlbum = (tdb2, id) => {
  return readParsedThing(
    parseAlbum,
    tdb2,
    id
  );
};
var readAlbums = (tdb2, urns) => {
  return readParsedThings(parseAlbum, tdb2, urns);
};

// ts/parsers/feature.ts
function parseFeature(_, feature) {
  return parseObject(FeatureSchema, "feature", feature);
}

// ts/services/features.ts
var readFeatures = (tdb2, urns) => {
  return readParsedThings(
    parseFeature,
    tdb2,
    urns
  );
};

// ts/state.ts
async function loadData() {
  const schema = {};
  const db = await loadTriples(
    `/manifest/tribbles.${window.envConfig.publication_id}.txt`,
    schema,
    deriveTriples
  );
  db.add(HARD_CODED_TRIPLES);
  return db;
}
function loadServices(tdb2) {
  return {
    readThing: readThing.bind(null, tdb2),
    readAlbum: readAlbum.bind(null, tdb2),
    readCountry: readCountry.bind(null, tdb2),
    readPlace: readPlace.bind(null, tdb2),
    readPhoto: readPhoto.bind(null, tdb2),
    readMammal: readMammal.bind(null, tdb2),
    readReptile: readReptile.bind(null, tdb2),
    readAmphibian: readAmphibian.bind(null, tdb2),
    readInsect: readInsect.bind(null, tdb2),
    readVideo: readVideo.bind(null, tdb2),
    readLocation: readLocation.bind(null, tdb2),
    readUnesco: readUnesco.bind(null, tdb2),
    readLocations: readLocations.bind(null, tdb2),
    readFeatures: readFeatures.bind(null, tdb2),
    readPhotos: readPhotos.bind(null, tdb2),
    readUnescos: readUnescos.bind(null, tdb2),
    readThings: readThings.bind(null, tdb2),
    readPhotosByThingIds: readPhotosByThingIds.bind(null, tdb2),
    readAlbumsByThingIds: readAlbumsByThingIds.bind(null, tdb2),
    toThingLinks: toThingLinks.bind(null, tdb2)
  };
}
async function loadState() {
  const data = await loadData();
  return {
    darkMode: DarkModes.load(),
    sidebarVisible: false,
    data,
    currentAlbum: void 0,
    currentPhoto: void 0,
    currentUrn: void 0,
    currentType: void 0,
    services: loadServices(data)
  };
}

// ts/components/sidebar.ts
var import_mithril4 = __toESM(require_mithril());
function SidebarItem() {
  return {
    view(vnode) {
      return (0, import_mithril4.default)("li", {
        class: "sidebar-item",
        onclick() {
          import_mithril4.default.route.set(vnode.attrs.route);
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
      return (0, import_mithril4.default)("aside", { class: classes(vnode.attrs.visible) }, [
        (0, import_mithril4.default)("nav", [
          (0, import_mithril4.default)("ul", [
            (0, import_mithril4.default)(SidebarItem, { name: "PHOTOS", route: "/photos" }),
            (0, import_mithril4.default)(SidebarItem, { name: "VIDEOS", route: "/videos" }),
            (0, import_mithril4.default)(SidebarItem, { name: "ALBUMS", route: "/albums" }),
            (0, import_mithril4.default)(SidebarItem, { name: "ABOUT", route: "/about" })
          ])
        ])
      ]);
    }
  };
}

// ts/pages/albums.ts
var import_mithril11 = __toESM(require_mithril());

// ts/components/album-stats.ts
var import_mithril5 = __toESM(require_mithril());
function isStats(stats) {
  if (typeof stats !== "object" || stats === null) {
    console.warn("Stats is not an object");
  }
  const keys = [
    "photos",
    "videos",
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
      console.warn(`Stats is missing key: ${key}`);
    }
    if (typeof stats[key] !== "number") {
      console.warn(`Stats key ${key} is not a number`);
    }
  }
  return true;
}
function AlbumStats() {
  const stats = window.stats;
  return {
    view() {
      if (!isStats(stats)) {
        return (0, import_mithril5.default)("p");
      }
      return (0, import_mithril5.default)("p.photo-stats", [
        `${stats.photos} `,
        (0, import_mithril5.default)("a", { href: "#/photos" }, "photos"),
        " \xB7 ",
        `${stats.videos} `,
        (0, import_mithril5.default)("a", { href: "#/videos" }, "videos"),
        " \xB7 ",
        `${stats.albums} albums \xB7 ${stats.years} years \xB7 `,
        `${stats.countries} `,
        (0, import_mithril5.default)("a", { href: "#/listing/country" }, "countries"),
        " \xB7 ",
        `${stats.bird_species} `,
        (0, import_mithril5.default)("a", { href: "#/listing/bird" }, "bird species"),
        " \xB7 ",
        `${stats.mammal_species} `,
        (0, import_mithril5.default)("a", { href: "#/listing/mammal" }, "mammal species"),
        " \xB7 a few ",
        (0, import_mithril5.default)("a", { href: "#/listing/amphibian" }, "amphibians"),
        " and ",
        (0, import_mithril5.default)("a", { href: "#/listing/reptile" }, "reptiles"),
        " \xB7 ",
        `${stats.unesco_sites} `,
        (0, import_mithril5.default)("a", { href: "#/thing/unesco:*" }, "UNESCO sites")
      ]);
    }
  };
}

// ts/components/photo-album-metadata.ts
var import_mithril6 = __toESM(require_mithril());

// ts/services/window.ts
var Windows = class {
  /*
   * Check if the window is smaller than a given width
   * used to detect a mobile device
   */
  static isSmallerThan(width = 500) {
    return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
  }
  /*
   * Set the page's title
   */
  static setTitle(title) {
    document.title = title;
  }
};

// ts/services/dates.ts
var Dates = class {
  /* */
  static parse(dateTime) {
    let [date, time] = dateTime.split(" ");
    date = date.replace(/:/g, "-");
    return /* @__PURE__ */ new Date(`${date} ${time}`);
  }
  /* */
  static formatExifDate(dateTime) {
    if (!dateTime) {
      return dateTime;
    }
    const createdAt = new Date(dateTime).toISOString();
    const [date, time] = createdAt.split("T")[0].replace(/\:/g, "-");
    return `${date.replace(/\:/g, "/")} ${time}`;
  }
  /* */
  static formatCreatedAt(dateTime) {
    const date = new Date(parseInt(dateTime));
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  }
  /* */
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
      return (0, import_mithril6.default)("div.photo-album-metadata", [
        (0, import_mithril6.default)("p.photo-album-title", title),
        (0, import_mithril6.default)("p.photo-album-date", [
          (0, import_mithril6.default)("time", dateRange(minDate, maxDate))
        ]),
        (0, import_mithril6.default)("div.photo-metadata-inline", [
          (0, import_mithril6.default)("p.photo-album-count", `${count} ${text}`),
          (0, import_mithril6.default)("p.photo-album-countries", countryLinks)
        ])
      ]);
    }
  };
}

// ts/components/photo-album.ts
var import_mithril9 = __toESM(require_mithril());

// ts/components/photo.ts
var import_mithril8 = __toESM(require_mithril());

// ts/components/metadata-icon.ts
var import_mithril7 = __toESM(require_mithril());
function InfoSVG() {
  return (0, import_mithril7.default)("svg.photo-icon", {
    height: 40,
    width: 40,
    preserveAspectRatio: "xMinYMin",
    viewBox: "-2 -2 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    (0, import_mithril7.default)("path", {
      d: "m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
    })
  ]);
}
function MetadataIcon() {
  return {
    view(vnode) {
      const { id } = vnode.attrs;
      return (0, import_mithril7.default)("div.photo-metadata-popover", {
        onclick: () => broadcast("navigate", { route: `/photo/${id}` })
      }, InfoSVG());
    }
  };
}

// ts/components/photo.ts
function loadImage(url2, event) {
  broadcast("photo_loaded", { url: url2 });
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
      const { thumbnailUrl, loading, onclick } = vnode.attrs;
      return (0, import_mithril8.default)("img.thumbnail-image", {
        onload: loadImage.bind(null, thumbnailUrl),
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        src: thumbnailUrl,
        loading,
        onclick
      });
    }
  };
}
function PlaceholderImage() {
  return {
    view(vnode) {
      const { thumbnailDataUrl } = vnode.attrs;
      return (0, import_mithril8.default)("img.u-photo.thumbnail-image.thumbnail-placeholder", {
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
        fullImage,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        onclick
      } = vnode.attrs;
      return (0, import_mithril8.default)("a", {
        href: fullImage,
        target: "_blank",
        rel: "external"
      }, [
        (0, import_mithril8.default)(PlaceholderImage, { thumbnailDataUrl }),
        (0, import_mithril8.default)(Image, { thumbnailUrl, loading, onclick })
      ]);
    }
  };
}
function formatId(id) {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}
function Photo() {
  return {
    view(vnode) {
      const { photo, loading, interactive } = vnode.attrs;
      const id = formatId(photo.id);
      const {
        fullImage,
        thumbnailUrl,
        mosaicColours
      } = photo;
      const thumbnailDataUrl = Photos.encodeBitmapDataURL(mosaicColours);
      const $mdIcon = (0, import_mithril8.default)(MetadataIcon, { id });
      const $imagePair = (0, import_mithril8.default)(ImagePair, {
        fullImage,
        thumbnailUrl,
        thumbnailDataUrl,
        loading
      });
      return (0, import_mithril8.default)(
        "div",
        (0, import_mithril8.default)("div.photo", {}, [
          (0, import_mithril8.default)(
            "a",
            { onclick: block },
            interactive ? [
              $mdIcon,
              $imagePair
            ] : [$imagePair]
          )
        ])
      );
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
        minDate,
        onclick
      } = vnode.attrs;
      return (0, import_mithril9.default)("div.photo-album", { "data-min-date": minDate }, [
        (0, import_mithril9.default)(ImagePair, {
          imageUrl,
          thumbnailUrl,
          thumbnailDataUrl,
          loading,
          onclick
        }),
        // TODO this is broken
        child
      ]);
    }
  };
}

// ts/components/place-links.ts
var import_mithril10 = __toESM(require_mithril());

// ts/models/urn.ts
function urnToUrl(urn) {
  const { type, id } = asUrn(urn);
  return `#/thing/${type}:${id}`;
}

// ts/components/place-links.ts
function CountryLink() {
  return {
    view(vnode) {
      const { country, mode } = vnode.attrs;
      const { id, name } = country;
      if (!id) {
        return (0, import_mithril10.default)("p");
      }
      const flag = countryEmoji(country);
      const parsed = asUrn(id);
      const onclick = navigate(`/thing/${parsed.type}:${parsed.id}`);
      if (mode === "flag") {
        return (0, import_mithril10.default)("a.country-link-short", { href: urnToUrl(id), onclick }, flag);
      }
      return (0, import_mithril10.default)(
        "a.country-link",
        { href: urnToUrl(id), onclick },
        `${flag} ${name}`
      );
    }
  };
}

// ts/pages/albums.ts
function onAlbumClick(id, title, event) {
  const parsed = asUrn(id);
  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
}
function drawAlbum(state2, album, idx) {
  const loading = Photos.loadingMode(idx);
  const $albumComponents = [];
  if (state2.year !== albumYear(album)) {
    state2.year = albumYear(album);
    if (state2.year !== (/* @__PURE__ */ new Date()).getFullYear()) {
      const $h2 = (0, import_mithril11.default)(
        "h2.album-year-heading",
        { key: `year-${state2.year}` },
        state2.year.toString()
      );
      $albumComponents.push($h2);
    }
  }
  const $countryLinks = album.countries.map((country) => {
    return (0, import_mithril11.default)(CountryLink, {
      country,
      key: `album-country-${album.id}-${country.id}`,
      mode: "flag"
    });
  });
  const $md = (0, import_mithril11.default)(PhotoAlbumMetadata, {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: $countryLinks
  });
  const $album = (0, import_mithril11.default)(PhotoAlbum, {
    imageUrl: album.thumbnailUrl,
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: Photos.encodeBitmapDataURL(album.mosaicColours),
    loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id, album.name)
  });
  $albumComponents.push(
    (0, import_mithril11.default)("div", {
      key: `album-${album.id}`
    }, [
      $album,
      $md
    ])
  );
  return $albumComponents;
}
function AlbumsList() {
  return {
    view(vnode) {
      const state2 = { year: 2005 };
      const { albums } = vnode.attrs;
      const $albumComponents = [];
      for (let idx = 0; idx < albums.length; idx++) {
        $albumComponents.push(...drawAlbum(state2, albums[idx], idx));
      }
      return (0, import_mithril11.default)("section.album-container", $albumComponents);
    }
  };
}
function AlbumsPage() {
  return {
    oninit() {
      Windows.setTitle("Albums - photos");
    },
    view(vnode) {
      const { albums } = vnode.attrs;
      const $md = (0, import_mithril11.default)("section.album-metadata", [
        (0, import_mithril11.default)("h1.albums-header", "Albums"),
        (0, import_mithril11.default)(AlbumStats)
      ]);
      return (0, import_mithril11.default)("div", [
        $md,
        //m(YearCursor),
        (0, import_mithril11.default)(AlbumsList, { albums })
      ]);
    }
  };
}

// ts/pages/about.ts
var import_mithril12 = __toESM(require_mithril());
function AboutPage() {
  return {
    oninit() {
      Windows.setTitle("About - photos");
    },
    view() {
      const years = (/* @__PURE__ */ new Date()).getFullYear() - 2012;
      return (0, import_mithril12.default)("div", [
        (0, import_mithril12.default)("section.about-page", [
          (0, import_mithril12.default)("h1", "About"),
          (0, import_mithril12.default)(
            "p",
            `I started taking photos ${years} years ago, and have taken a lot of photos since. I've become, in my opinion, a reasonable wildlife photographer (though hit-or-miss at other styles of photography). I built this website to share the things`,
            (0, import_mithril12.default)("a", {
              href: "https://photos.rgrannell.xyz/#/thing/rating:\u2B50\u2B50\u2B50\u2B50\u2B50",
              onclick: navigate(`/thing/rating:\u2B50\u2B50\u2B50\u2B50\u2B50`)
            }, " I found beautiful in this world.")
          ),
          (0, import_mithril12.default)("h2", "Can I use the photos on this site?"),
          (0, import_mithril12.default)(
            "p",
            "You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not."
          ),
          (0, import_mithril12.default)("h2", "Can I use data from this site to train AI?"),
          (0, import_mithril12.default)(
            "p",
            "No, absolutely not. The ",
            (0, import_mithril12.default)(
              "a",
              { href: "http://photos.rgrannell.xyz/robots.txt" },
              "robots.txt"
            ),
            " file for this site explicitly prohibits this."
          ),
          (0, import_mithril12.default)("h2", "What is your contact information?"),
          (0, import_mithril12.default)(
            "p",
            "See ",
            (0, import_mithril12.default)("a", { href: "https://rgrannell.xyz/" }, "my personal site"),
            " for contact details."
          )
        ])
      ]);
    }
  };
}

// ts/pages/videos.ts
var import_mithril14 = __toESM(require_mithril());

// ts/components/video.ts
var import_mithril13 = __toESM(require_mithril());
function Video() {
  return {
    view(vnode) {
      const {
        preload,
        video
      } = vnode.attrs;
      if (!video) {
        return (0, import_mithril13.default)("div", "No video");
      }
      const {
        posterUrl,
        videoUrl1080p,
        videoUrl480p,
        videoUrl720p,
        videoUrlUnscaled
      } = video;
      const $source = (0, import_mithril13.default)("source", {
        src: videoUrl480p,
        type: "video/mp4"
      });
      const $resolutionLinks = (0, import_mithril13.default)("ul", [
        (0, import_mithril13.default)("a", { href: videoUrlUnscaled }, "[L]"),
        (0, import_mithril13.default)("a", { href: videoUrl1080p }, "[M]"),
        (0, import_mithril13.default)("a", { href: videoUrl720p }, "[S]"),
        (0, import_mithril13.default)("a", { href: videoUrl480p }, "[XS]")
      ]);
      return (0, import_mithril13.default)("div", { key: `video-${video.id}` }, [
        (0, import_mithril13.default)("video.thumbnail-video", {
          controls: true,
          preload,
          poster: posterUrl
        }, $source),
        $resolutionLinks
      ]);
    }
  };
}

// ts/pages/videos.ts
function VideosPage() {
  return {
    view(vnode) {
      const { videos } = vnode.attrs;
      const videoLengthText = videos.length === 1 ? "1 video" : `${videos.length} videos`;
      const $videosList = videos.map((video) => {
        return (0, import_mithril14.default)(Video, { video, preload: "auto" });
      });
      return (0, import_mithril14.default)(
        "div",
        (0, import_mithril14.default)("section.photos-metadata", [
          (0, import_mithril14.default)("h1", "Videos"),
          (0, import_mithril14.default)("p.photo-album-count", videoLengthText)
        ]),
        (0, import_mithril14.default)("section.photo-container", $videosList)
      );
    }
  };
}

// ts/pages/album.ts
var import_mithril18 = __toESM(require_mithril());

// ts/components/album-share-button.ts
var import_mithril15 = __toESM(require_mithril());
function handleError(message) {
  if (message.includes("Shared canceled")) {
    return;
  }
  alert(message);
}
async function shareAlbum(state2, url2, name) {
  if (!navigator.share) {
    handleError("navigator.share not available");
    return;
  }
  try {
    await navigator.share({
      title: `${name} - photos.rgrannell.xyz`,
      url: url2
    });
  } catch (error) {
    console.error("Error sharing:", error);
  } finally {
    state2.sharing = false;
  }
}
function buttonText(state2) {
  return state2.sharing ? "[sharing...]" : "[share]";
}
function AlbumShareButton() {
  const localState = {
    sharing: false
  };
  return {
    view(vnode) {
      const { url: url2, name } = vnode.attrs;
      return (0, import_mithril15.default)("button.photo-share-button", {
        disabled: !navigator.share,
        onclick: shareAlbum.bind(null, localState, url2, name)
      }, buttonText(localState));
    }
  };
}

// ts/components/albums-button.ts
var import_mithril16 = __toESM(require_mithril());
function AlbumsButton() {
  return {
    view() {
      return (0, import_mithril16.default)(
        "a",
        { href: "/albums", onclick: navigate(`/albums`) },
        "[albums]"
      );
    }
  };
}

// ts/components/album-things.ts
var import_mithril17 = __toESM(require_mithril());
function AlbumThings() {
  return {
    view(vnode) {
      const { locations, subjects } = vnode.attrs;
    }
  };
}

// ts/pages/album.ts
function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view(vnode) {
      const {
        album,
        photos,
        videos,
        subjects,
        locations
      } = vnode.attrs;
      const {
        name,
        minDate,
        maxDate,
        photosCount,
        description,
        countries
      } = album;
      const dateRange = Dates.dateRange(
        minDate,
        maxDate,
        Windows.isSmallerThan(500)
      );
      const photoCountMessage = photosCount === 1 ? "1 photo" : `${photosCount} photos`;
      const $countryLinks = countries.map((country) => {
        return (0, import_mithril18.default)(CountryLink, {
          country,
          mode: "flag"
        });
      });
      const $albumMetadata = (0, import_mithril18.default)("section.photos-metadata", [
        (0, import_mithril18.default)("h1", name),
        (0, import_mithril18.default)("p.photo-album-date", (0, import_mithril18.default)("time", dateRange)),
        (0, import_mithril18.default)("p.photo-album-count", photoCountMessage),
        (0, import_mithril18.default)("p.photo-album-countries", $countryLinks),
        (0, import_mithril18.default)("p.photo-album-description", import_mithril18.default.trust(description ?? "")),
        (0, import_mithril18.default)(AlbumShareButton, { url: location.href, name }),
        " ",
        (0, import_mithril18.default)(AlbumsButton),
        " ",
        (0, import_mithril18.default)(AlbumThings, { subjects, locations })
      ]);
      const $photosList = photos.map((photo, idx) => {
        return (0, import_mithril18.default)(
          Photo,
          {
            photo,
            loading: Photos.loadingMode(idx),
            interactive: true
          }
        );
      });
      const $videosList = videos.map((video) => {
        return (0, import_mithril18.default)(Video, { video, preload: "auto" });
      });
      return (0, import_mithril18.default)(
        "div",
        $albumMetadata,
        (0, import_mithril18.default)("section.photo-container", $photosList),
        (0, import_mithril18.default)("section.video-container", $videosList)
      );
    }
  };
}

// ts/pages/photos.ts
var import_mithril19 = __toESM(require_mithril());
function PhotosList() {
  return {
    view(vnode) {
      const { photos } = vnode.attrs;
      return (0, import_mithril19.default)(
        "section.photo-container",
        photos.map((photo, idx) => {
          const loading = Photos.loadingMode(idx);
          return (0, import_mithril19.default)(Photo, {
            key: `photo-${photo.id}`,
            photo,
            loading,
            interactive: true
          });
        })
      );
    }
  };
}
function PhotosPage() {
  return {
    view(vnode) {
      const { photos } = vnode.attrs;
      const countText = `${photos.length} photo${photos.length === 1 ? "" : "s"}`;
      const $md = (0, import_mithril19.default)("section.photos-metadata", [
        (0, import_mithril19.default)("h1", "Photos"),
        (0, import_mithril19.default)("p.photo-album-count", countText)
      ]);
      return (0, import_mithril19.default)("div", [$md, (0, import_mithril19.default)(PhotosList, { photos })]);
    }
  };
}

// ts/pages/photo.ts
var import_mithril23 = __toESM(require_mithril());

// ts/components/album-button.ts
var import_mithril20 = __toESM(require_mithril());
function AlbumButton() {
  return {
    view(vnode) {
      const { id } = vnode.attrs;
      return (0, import_mithril20.default)("a", {
        href: `#/album/${id}`,
        onclick: () => navigate(`/album/${id}`)
      }, "[album]");
    }
  };
}

// ts/components/exif-data.ts
var import_mithril21 = __toESM(require_mithril());
function Heading() {
  return {
    view(vnode) {
      const { text } = vnode.attrs;
      return (0, import_mithril21.default)("th.exif-heading", text);
    }
  };
}
function CameraModel() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $model = services.toThingLinks([photo.model]);
      if ($model.length > 0) {
        return (0, import_mithril21.default)("td", $model);
      }
      return (0, import_mithril21.default)("td", "Unknown");
    }
  };
}
function ExifDimensions() {
  return {
    view(vnode) {
      const { photo } = vnode.attrs;
      if (typeof photo.width === "string" && typeof photo.height === "string") {
        return (0, import_mithril21.default)("td", `${photo.width} x ${photo.height}`);
      }
      return (0, import_mithril21.default)("td", "Unknown");
    }
  };
}
function FocalLength() {
  return {
    view(vnode) {
      const { photo } = vnode.attrs;
      if (photo.focalLength === "Unknown") {
        return (0, import_mithril21.default)("td", "Unknown");
      } else if (photo.focalLength === "0") {
        return (0, import_mithril21.default)("td", "Manual lens");
      } else if (!photo.focalLength) {
        return (0, import_mithril21.default)("td", "Unknown");
      } else {
        return (0, import_mithril21.default)("td", `${photo.focalLength}mm`);
      }
    }
  };
}
function ShutterSpeed() {
  return {
    view(vnode) {
      const { photo } = vnode.attrs;
      if (typeof photo.exposureTime === "string") {
        const parsed = parseFloat(photo.exposureTime);
        if (isNaN(parsed)) {
          return (0, import_mithril21.default)("td", "Unknown");
        } else if (parsed >= 1) {
          return (0, import_mithril21.default)("td", `${parsed} s`);
        } else {
          return (0, import_mithril21.default)("td", `1/${Math.round(1 / parsed)} s`);
        }
      }
      return (0, import_mithril21.default)("td", "Unknown");
    }
  };
}
function Aperture() {
  return {
    view(vnode) {
      const { photo } = vnode.attrs;
      if (photo.fStop === "Unknown") {
        return (0, import_mithril21.default)("td", "Unknown");
      } else if (photo.fStop === "0.0") {
        return (0, import_mithril21.default)("td", "Manual aperture control");
      } else if (!photo.fStop) {
        return (0, import_mithril21.default)("td", "Unknown");
      }
      return (0, import_mithril21.default)("td", `\u0192/${photo.fStop}`);
    }
  };
}
function ExifData() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $dateTime = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Date-Time" }),
        (0, import_mithril21.default)("td", (0, import_mithril21.default)("time", Dates.formatCreatedAt(photo.createdAt)))
      ]);
      const $model = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Camera Model" }),
        (0, import_mithril21.default)(CameraModel, { photo, services })
      ]);
      const $dimensions = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Dimensions" }),
        (0, import_mithril21.default)(ExifDimensions, { photo, services })
      ]);
      const $focalLength = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Focal Length" }),
        (0, import_mithril21.default)(FocalLength, { photo, services })
      ]);
      const $shutterSpeed = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Shutter Speed" }),
        (0, import_mithril21.default)(ShutterSpeed, { photo, services })
      ]);
      const $aperture = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "Aperture" }),
        (0, import_mithril21.default)(Aperture, { photo, services })
      ]);
      const $iso = (0, import_mithril21.default)("tr", [
        (0, import_mithril21.default)(Heading, { text: "ISO" }),
        (0, import_mithril21.default)("td", photo.iso ?? "Unknown")
      ]);
      return (0, import_mithril21.default)("table.metadata-table", [
        $dateTime,
        $model,
        $dimensions,
        $focalLength,
        $shutterSpeed,
        $aperture,
        $iso
      ]);
    }
  };
}

// ts/components/photo-info.ts
var import_mithril22 = __toESM(require_mithril());
function Heading2() {
  return {
    view(vnode) {
      const { text } = vnode.attrs;
      return (0, import_mithril22.default)("th.exif-heading", text);
    }
  };
}
function Description() {
  return {
    view(vnode) {
      const { photo } = vnode.attrs;
      const html = photo.description ?? photo.summary;
      if (html) {
        return (0, import_mithril22.default)("td", import_mithril22.default.trust(html));
      }
      return (0, import_mithril22.default)("td", "\u2014");
    }
  };
}
function Location() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $locations = services.toThingLinks(arrayify(photo.location));
      return (0, import_mithril22.default)("td", $locations.length > 0 ? $locations : "\u2014");
    }
  };
}
function Rating() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $rating = services.toThingLinks([photo.rating]);
      return (0, import_mithril22.default)("td", $rating.length > 0 ? $rating : "\u2014");
    }
  };
}
function Style() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $style = services.toThingLinks([photo.style]);
      return (0, import_mithril22.default)("td", $style.length > 0 ? $style : "\u2014");
    }
  };
}
function Subject() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $subject = services.toThingLinks(arrayify(photo.subject));
      return (0, import_mithril22.default)("td", $subject.length > 0 ? $subject : "\u2014");
    }
  };
}
function Country() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $countries = services.toThingLinks(arrayify(photo.country));
      return (0, import_mithril22.default)("td", $countries.length > 0 ? $countries : "\u2014");
    }
  };
}
function PhotoInfo() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const infoItems = [];
      if (photo.description || photo.summary) {
        infoItems.push((0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Description" }),
          (0, import_mithril22.default)(Description, { photo, services })
        ]));
      }
      infoItems.push(
        (0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Country" }),
          (0, import_mithril22.default)(Country, { photo, services })
        ]),
        (0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Location" }),
          (0, import_mithril22.default)(Location, { photo, services })
        ]),
        (0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Rating" }),
          (0, import_mithril22.default)(Rating, { photo, services })
        ]),
        (0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Style" }),
          (0, import_mithril22.default)(Style, { photo, services })
        ]),
        (0, import_mithril22.default)("tr", [
          (0, import_mithril22.default)(Heading2, { text: "Subject" }),
          (0, import_mithril22.default)(Subject, { photo, services })
        ])
      );
      return (0, import_mithril22.default)("table.metadata-table", infoItems);
    }
  };
}

// ts/pages/photo.ts
function PhotoPage() {
  return {
    view(vnode) {
      const { photo, services } = vnode.attrs;
      const $links = (0, import_mithril23.default)("p", [
        (0, import_mithril23.default)("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]"),
        " ",
        (0, import_mithril23.default)("a", { href: photo.pngUrl, rel: "noreferrer" }, "[png]"),
        " ",
        // [share]
        (0, import_mithril23.default)(AlbumButton, { id: photo.albumId })
      ]);
      const $exif = (0, import_mithril23.default)(ExifData, { photo, services });
      const $photoInfo = (0, import_mithril23.default)(PhotoInfo, { photo, services });
      return (0, import_mithril23.default)("section", [
        (0, import_mithril23.default)("h1", "Photo"),
        (0, import_mithril23.default)(Photo, {
          photo,
          loading: "eager",
          interactive: false
        }),
        $links,
        (0, import_mithril23.default)(
          "div",
          (0, import_mithril23.default)("h3", "Photo Information"),
          $photoInfo,
          (0, import_mithril23.default)("h3", "Exif Data"),
          $exif
        )
      ]);
    }
  };
}

// ts/pages/listing.ts
var import_mithril24 = __toESM(require_mithril());
function AlbumsList2() {
  return {
    view() {
      const $albumComponents = [];
      return (0, import_mithril24.default)("section.album-container", $albumComponents);
    }
  };
}
function ListingTitle() {
  return {
    view(vnode) {
      const { type } = vnode.attrs;
      return (0, import_mithril24.default)(
        "h1.albums-header",
        `${Strings.capitalise(Strings.pluralise(type))}`
      );
    }
  };
}
function ListingThingsButton() {
  return {
    view(vnode) {
      const { type } = vnode.attrs;
      return (0, import_mithril24.default)("a", {
        href: `/thing/${type}`
      }, `See all ${type} photos`);
    }
  };
}
function ListingPage() {
  return {
    view(vnode) {
      const { type, things } = vnode.attrs;
      const $albums = [];
      const $md = [
        (0, import_mithril24.default)(ListingTitle, { type })
      ];
      if (!NonListableTypes.has(type)) {
        $md.push(
          (0, import_mithril24.default)("section.album-metadata", [
            (0, import_mithril24.default)(ListingThingsButton, { type })
          ])
        );
      }
      return (0, import_mithril24.default)("div", [
        (0, import_mithril24.default)("section.album-metadata", $md),
        (0, import_mithril24.default)(AlbumsList2)
      ]);
    }
  };
}

// ts/pages/thing.ts
var import_mithril33 = __toESM(require_mithril());

// ts/components/thing-title.ts
var import_mithril25 = __toESM(require_mithril());
function computeTitle(urn, things) {
  const parsed = parseUrn(urn);
  if (parsed.id === "*") {
    return Strings.capitalise(Strings.pluralise(parsed.type));
  }
  if (things.length === 0) {
    return urn;
  }
  const [thing] = things;
  const name = one(thing.name) ?? parsed.id;
  if (parsed.type === KnownTypes.COUNTRY) {
    return `${countryEmoji(thing)} ${name}`;
  } else if (parsed.type === KnownTypes.PLACE) {
    return `${placeEmoji(thing)} ${name}`;
  }
  return name;
}
function ThingTitle() {
  return {
    view(vnode) {
      const { urn, things } = vnode.attrs;
      return (0, import_mithril25.default)("h1", computeTitle(urn, things));
    }
  };
}
function ThingSubtitle() {
  return {
    view(vnode) {
      const parsed = asUrn(vnode.attrs.urn);
      return BinomialTypes.has(parsed.type) && parsed.id !== "*" ? (0, import_mithril25.default)(
        "span",
        { class: `thing-binomial ${parsed.type}-binomial` },
        Strings.binomial(parsed.id)
      ) : (0, import_mithril25.default)("span");
    }
  };
}

// ts/components/external-link.ts
var import_mithril26 = __toESM(require_mithril());
function ExternalLink() {
  return {
    view(vnode) {
      const { href, text } = vnode.attrs;
      return (0, import_mithril26.default)("a", {
        href,
        target: "_blank",
        rel: "noopener"
      }, text);
    }
  };
}

// ts/components/places-list.ts
var import_mithril27 = __toESM(require_mithril());
function PlacesList() {
  return {
    view(vnode) {
      const { urns, services } = vnode.attrs;
      const locations = services.readLocations(urns).sort(
        (loca, locb) => {
          return (one(loca.name) ?? "").localeCompare(one(locb.name) ?? "");
        }
      );
      const $contains = locations.map((location2) => {
        const $link = (0, import_mithril27.default)(ThingLink, {
          urn: one(location2.id),
          thing: location2
        });
        return (0, import_mithril27.default)("li", { key: `place-${location2.id}` }, $link);
      });
      return (0, import_mithril27.default)("ul", $contains);
    }
  };
}

// ts/commons/sets.ts
function setify(value) {
  if (value === void 0) {
    return /* @__PURE__ */ new Set();
  }
  return new Set(Array.isArray(value) ? value : [value]);
}
function setOf(property, objects) {
  const result = /* @__PURE__ */ new Set();
  for (const obj of objects) {
    if (property in obj) {
      const value = obj[property];
      if (value === void 0) {
        continue;
      }
      if (Array.isArray(value)) {
        for (const elem of value) {
          result.add(elem);
        }
      } else {
        result.add(value);
      }
    }
  }
  return result;
}

// ts/components/listing-link.ts
var import_mithril28 = __toESM(require_mithril());
function onListingClick(type, event) {
  broadcast("navigate", {
    route: `/listing/${type}`
  });
  block(event);
}
function ListingLink() {
  return {
    view(vnode) {
      let type = "";
      if ("type" in vnode.attrs) {
        type = vnode.attrs.type;
      } else {
        const parsed = asUrn(vnode.attrs.urn);
        type = parsed.type;
      }
      return (0, import_mithril28.default)("a", {
        href: `#/listing/${type}`,
        onclick: onListingClick.bind(null, type)
      }, Strings.capitalise(type));
    }
  };
}

// ts/components/features-list.ts
var import_mithril30 = __toESM(require_mithril());

// ts/components/feature-link.ts
var import_mithril29 = __toESM(require_mithril());
function FeatureLink() {
  return {
    view(vnode) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);
      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);
      return (0, import_mithril29.default)("p", {
        class: ["thing-link", `${type}-link`].join(" ")
      }, `${emoji}	${name}`);
    }
  };
}

// ts/components/features-list.ts
function FeaturesList() {
  return {
    view(vnode) {
      const { urns, services } = vnode.attrs;
      const features = services.readFeatures(urns);
      const $features = features.map((feature) => {
        const id = one(feature.id);
        return (0, import_mithril30.default)("li", {
          key: `feature-${id}`
        }, (0, import_mithril30.default)(FeatureLink, { urn: id, thing: feature }));
      });
      return (0, import_mithril30.default)("ul", $features);
    }
  };
}

// ts/components/unesco-list.ts
var import_mithril32 = __toESM(require_mithril());

// ts/components/unesco-link.ts
var import_mithril31 = __toESM(require_mithril());
function UnescoLink() {
  return {
    view(vnode) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);
      const name = one(thing.name) ?? id;
      return (0, import_mithril31.default)("a", {
        href: `https://whc.unesco.org/en/list/${id}`,
        target: "_blank",
        rel: "noopener noreferrer",
        class: ["thing-link", `${type}-link`].join(" ")
      }, name);
    }
  };
}

// ts/components/unesco-list.ts
function UnescoList() {
  return {
    view(vnode) {
      const { urns, services } = vnode.attrs;
      const unescos = services.readUnescos(urns);
      const $unescos = unescos.map((unesco) => {
        const urn = one(unesco.id);
        return (0, import_mithril32.default)("li", (0, import_mithril32.default)(UnescoLink, { urn, thing: unesco }));
      });
      return (0, import_mithril32.default)("ul", $unescos);
    }
  };
}

// ts/pages/thing.ts
function ThingUrls() {
  return {
    view(vnode) {
      const { things } = vnode.attrs;
      if (things.length !== 1) {
        return (0, import_mithril33.default)("ul");
      }
      const [thing] = things;
      const $links = [];
      const wikipedia = one(thing.wikipedia);
      if (wikipedia) {
        $links.push(
          (0, import_mithril33.default)("li", (0, import_mithril33.default)(ExternalLink, { href: wikipedia, text: "[wikipedia]" }))
        );
      }
      const birdwatch = one(thing.birdwatchUrl);
      if (birdwatch) {
        $links.push(
          (0, import_mithril33.default)("li", (0, import_mithril33.default)(ExternalLink, { href: birdwatch, text: "[birdwatch]" }))
        );
      }
      return (0, import_mithril33.default)("ul.link-list", $links);
    }
  };
}
function ThingMetadata() {
  return {
    view(vnode) {
      const metadata = {};
      const { urn, things, services } = vnode.attrs;
      metadata.Classification = (0, import_mithril33.default)(ListingLink, { urn });
      const locatedIn = setOf(KnownRelations.IN, things);
      if (locatedIn.size > 0) {
        metadata["Located In"] = (0, import_mithril33.default)(PlacesList, { services, urns: locatedIn });
      }
      if (things.length !== 1) {
        return;
      }
      const [thing] = things;
      if (thing.feature) {
        metadata["Place Type"] = (0, import_mithril33.default)(FeaturesList, { urns: setify(thing.feature), services });
      }
      if (thing.contains) {
        metadata["Contains"] = (0, import_mithril33.default)(PlacesList, { services, urns: setify(thing.contains) });
      }
      if (thing.unescoId) {
        metadata["UNESCO"] = (0, import_mithril33.default)(UnescoList, {
          urns: new Set(arrayify(thing.unescoId)),
          services
        });
      }
      const $rows = Object.entries(metadata).map(([key, value]) => {
        return (0, import_mithril33.default)("tr", [
          (0, import_mithril33.default)("th.exif-heading", key),
          (0, import_mithril33.default)("td", value)
        ]);
      });
      return (0, import_mithril33.default)("div", [
        (0, import_mithril33.default)("h3", "Details"),
        (0, import_mithril33.default)("table.metadata-table", $rows)
      ]);
    }
  };
}
function PhotoSection() {
  return {
    view(vnode) {
      const { things, services } = vnode.attrs;
      const urns = setOf("id", things);
      const photos = services.readPhotosByThingIds(urns);
      return (0, import_mithril33.default)(
        "section.photo-container",
        photos.map((photo, idx) => {
          const loading = Photos.loadingMode(idx);
          return (0, import_mithril33.default)(Photo, {
            key: `photo-${photo.id}`,
            photo,
            loading,
            interactive: true
          });
        })
      );
    }
  };
}
function ThingPage() {
  return {
    view(vnode) {
      const { urn, things, services } = vnode.attrs;
      return (0, import_mithril33.default)("div", [
        (0, import_mithril33.default)("section.thing-page", [
          (0, import_mithril33.default)(ThingTitle, { urn, things }),
          (0, import_mithril33.default)(ThingSubtitle, { urn }),
          (0, import_mithril33.default)("br"),
          (0, import_mithril33.default)(ThingUrls, { urn, things, services }),
          (0, import_mithril33.default)(ThingMetadata, { urn, things, services }),
          (0, import_mithril33.default)("h3", "Photos"),
          (0, import_mithril33.default)(PhotoSection, { urn, things, services }),
          (0, import_mithril33.default)("h3", "Albums")
          //m(AlbumSection, { urn, things, services }),
        ])
      ]);
    }
  };
}

// ts/app.ts
var state = await loadState();
function AlbumsApp() {
  return {
    oninit() {
    },
    view() {
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(AlbumsPage, {
                albums: readAllAlbums(state.data)
              })
            ])
          ]
        )
      ]);
    }
  };
}
function AlbumApp() {
  return {
    oninit() {
      const id = import_mithril34.default.route.param("id");
      state.currentAlbum = `urn:r\xF3:album:${id}`;
    },
    view() {
      if (!state.currentAlbum) {
        return (0, import_mithril34.default)("p", "No album selected");
      }
      const album = readAlbum(state.data, state.currentAlbum);
      const photos = readAlbumPhotosByAlbumId(state.data, state.currentAlbum);
      const videos = readAlbumVideosByAlbumId(state.data, state.currentAlbum);
      if (!album) {
        return (0, import_mithril34.default)("p", "Album not found");
      }
      const { subjects, locations } = readThingsByAlbumId(
        state.data,
        state.currentAlbum
      );
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(AlbumPage, {
                album,
                subjects,
                locations,
                photos,
                videos
              })
            ])
          ]
        )
      ]);
    }
  };
}
function AboutApp() {
  return {
    view() {
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(AboutPage)
            ])
          ]
        )
      ]);
    }
  };
}
function VideosApp() {
  return {
    view() {
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(VideosPage, {
                videos: readAllVideos(state.data)
              })
            ])
          ]
        )
      ]);
    }
  };
}
function PhotosApp() {
  return {
    view() {
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(PhotosPage, {
                photos: readAllPhotos(state.data)
              })
            ])
          ]
        )
      ]);
    }
  };
}
function ThingApp() {
  let things = [];
  return {
    view() {
      const pair = import_mithril34.default.route.param("pair");
      state.currentUrn = `urn:r\xF3:${pair}`;
      const parsed = asUrn(state.currentUrn);
      if (parsed.id === "*") {
        things = readNamedTypeThings(state.data, pair.split(":")[0]);
      } else {
        const thing = readThing(state.data, state.currentUrn);
        if (thing) {
          things = [thing];
        }
      }
      if (!state.currentUrn) {
        return (0, import_mithril34.default)("p", "No thing selected");
      }
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(ThingPage, {
                urn: state.currentUrn,
                things,
                services: state.services
              })
            ])
          ]
        )
      ]);
    }
  };
}
function PhotoApp() {
  return {
    oninit() {
      const id = import_mithril34.default.route.param("id");
      state.currentPhoto = `urn:r\xF3:photo:${id}`;
    },
    view() {
      if (!state.currentPhoto) {
        return (0, import_mithril34.default)("p", "No photo selected");
      }
      const photo = readPhoto(state.data, state.currentPhoto);
      if (!photo) {
        return (0, import_mithril34.default)("p", "Photo not found");
      }
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(PhotoPage, { photo, services: state.services })
            ])
          ]
        )
      ]);
    }
  };
}
function ListingApp() {
  return {
    oninit() {
      const type = import_mithril34.default.route.param("type");
      state.currentType = type;
    },
    view() {
      if (!state.currentType) {
        return (0, import_mithril34.default)("p", "No type selected");
      }
      const things = readNamedTypeThings(state.data, state.currentType);
      return (0, import_mithril34.default)("body", [
        (0, import_mithril34.default)(
          "div.photos-app",
          { class: state.darkMode ? "dark-mode" : void 0 },
          [
            (0, import_mithril34.default)(Header, state),
            (0, import_mithril34.default)("div.app-container", [
              (0, import_mithril34.default)(Sidebar, { visible: state.sidebarVisible }),
              (0, import_mithril34.default)(ListingPage, {
                type: state.currentType,
                things
              })
            ])
          ]
        )
      ]);
    }
  };
}
listen("navigate", (event) => {
  const { route } = event.detail;
  console.info(`navigating to route: ${route}`);
  import_mithril34.default.route.set(route);
});
listen("switch_theme", () => {
  state.darkMode = !state.darkMode;
});

// ts/index.ts
import_mithril35.default.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
  "/photos": PhotosApp,
  "/album/:id": AlbumApp,
  "/thing/:pair": ThingApp,
  "/photo/:id": PhotoApp,
  "/listing/:type": ListingApp
});
//# sourceMappingURL=app.119bf96a84.js.map
