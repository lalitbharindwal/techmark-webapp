!function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t || self).gridjs = {})
}(this, function(t) {
    function n(t, n) {
        for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(t, "symbol" == typeof (o = function(t, n) {
                if ("object" != typeof t || null === t)
                    return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var r = e.call(t, "string");
                    if ("object" != typeof r)
                        return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(r.key)) ? o : String(o), r)
        }
        var o
    }
    function e(t, e, r) {
        return e && n(t.prototype, e),
        r && n(t, r),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        t
    }
    function r() {
        return r = Object.assign ? Object.assign.bind() : function(t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
        }
        ,
        r.apply(this, arguments)
    }
    function o(t, n) {
        t.prototype = Object.create(n.prototype),
        t.prototype.constructor = t,
        i(t, n)
    }
    function i(t, n) {
        return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, n) {
            return t.__proto__ = n,
            t
        }
        ,
        i(t, n)
    }
    function u(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function s(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++)
            r[e] = t[e];
        return r
    }
    function a(t, n) {
        var e = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (e)
            return (e = e.call(t)).next.bind(e);
        if (Array.isArray(t) || (e = function(t, n) {
            if (t) {
                if ("string" == typeof t)
                    return s(t, n);
                var e = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === e && t.constructor && (e = t.constructor.name),
                "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? s(t, n) : void 0
            }
        }(t)) || n && t && "number" == typeof t.length) {
            e && (t = e);
            var r = 0;
            return function() {
                return r >= t.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: t[r++]
                }
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var l;
    !function(t) {
        t[t.Init = 0] = "Init",
        t[t.Loading = 1] = "Loading",
        t[t.Loaded = 2] = "Loaded",
        t[t.Rendered = 3] = "Rendered",
        t[t.Error = 4] = "Error"
    }(l || (l = {}));
    var c, f, p, d, h, _, m, v = {}, g = [], y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function b(t, n) {
        for (var e in n)
            t[e] = n[e];
        return t
    }
    function w(t) {
        var n = t.parentNode;
        n && n.removeChild(t)
    }
    function x(t, n, e) {
        var r, o, i, u = {};
        for (i in n)
            "key" == i ? r = n[i] : "ref" == i ? o = n[i] : u[i] = n[i];
        if (arguments.length > 2 && (u.children = arguments.length > 3 ? c.call(arguments, 2) : e),
        "function" == typeof t && null != t.defaultProps)
            for (i in t.defaultProps)
                void 0 === u[i] && (u[i] = t.defaultProps[i]);
        return k(t, u, r, o, null)
    }
    function k(t, n, e, r, o) {
        var i = {
            type: t,
            props: n,
            key: e,
            ref: r,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == o ? ++p : o
        };
        return null == o && null != f.vnode && f.vnode(i),
        i
    }
    function S(t) {
        return t.children
    }
    function N(t, n) {
        this.props = t,
        this.context = n
    }
    function P(t, n) {
        if (null == n)
            return t.__ ? P(t.__, t.__.__k.indexOf(t) + 1) : null;
        for (var e; n < t.__k.length; n++)
            if (null != (e = t.__k[n]) && null != e.__e)
                return e.__e;
        return "function" == typeof t.type ? P(t) : null
    }
    function C(t) {
        var n, e;
        if (null != (t = t.__) && null != t.__c) {
            for (t.__e = t.__c.base = null,
            n = 0; n < t.__k.length; n++)
                if (null != (e = t.__k[n]) && null != e.__e) {
                    t.__e = t.__c.base = e.__e;
                    break
                }
            return C(t)
        }
    }
    function E(t) {
        (!t.__d && (t.__d = !0) && h.push(t) && !T.__r++ || _ !== f.debounceRendering) && ((_ = f.debounceRendering) || setTimeout)(T)
    }
    function T() {
        for (var t; T.__r = h.length; )
            t = h.sort(function(t, n) {
                return t.__v.__b - n.__v.__b
            }),
            h = [],
            t.some(function(t) {
                var n, e, r, o, i, u;
                t.__d && (i = (o = (n = t).__v).__e,
                (u = n.__P) && (e = [],
                (r = b({}, o)).__v = o.__v + 1,
                F(u, o, r, n.__n, void 0 !== u.ownerSVGElement, null != o.__h ? [i] : null, e, null == i ? P(o) : i, o.__h),
                R(e, o),
                o.__e != i && C(o)))
            })
    }
    function I(t, n, e, r, o, i, u, s, a, l) {
        var c, f, p, d, h, _, m, y = r && r.__k || g, b = y.length;
        for (e.__k = [],
        c = 0; c < n.length; c++)
            if (null != (d = e.__k[c] = null == (d = n[c]) || "boolean" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? k(null, d, null, null, d) : Array.isArray(d) ? k(S, {
                children: d
            }, null, null, null) : d.__b > 0 ? k(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
                if (d.__ = e,
                d.__b = e.__b + 1,
                null === (p = y[c]) || p && d.key == p.key && d.type === p.type)
                    y[c] = void 0;
                else
                    for (f = 0; f < b; f++) {
                        if ((p = y[f]) && d.key == p.key && d.type === p.type) {
                            y[f] = void 0;
                            break
                        }
                        p = null
                    }
                F(t, d, p = p || v, o, i, u, s, a, l),
                h = d.__e,
                (f = d.ref) && p.ref != f && (m || (m = []),
                p.ref && m.push(p.ref, null, d),
                m.push(f, d.__c || h, d)),
                null != h ? (null == _ && (_ = h),
                "function" == typeof d.type && d.__k === p.__k ? d.__d = a = L(d, a, t) : a = A(t, d, p, y, h, a),
                "function" == typeof e.type && (e.__d = a)) : a && p.__e == a && a.parentNode != t && (a = P(p))
            }
        for (e.__e = _,
        c = b; c--; )
            null != y[c] && W(y[c], y[c]);
        if (m)
            for (c = 0; c < m.length; c++)
                U(m[c], m[++c], m[++c])
    }
    function L(t, n, e) {
        for (var r, o = t.__k, i = 0; o && i < o.length; i++)
            (r = o[i]) && (r.__ = t,
            n = "function" == typeof r.type ? L(r, n, e) : A(e, r, r, o, r.__e, n));
        return n
    }
    function A(t, n, e, r, o, i) {
        var u, s, a;
        if (void 0 !== n.__d)
            u = n.__d,
            n.__d = void 0;
        else if (null == e || o != i || null == o.parentNode)
            t: if (null == i || i.parentNode !== t)
                t.appendChild(o),
                u = null;
            else {
                for (s = i,
                a = 0; (s = s.nextSibling) && a < r.length; a += 1)
                    if (s == o)
                        break t;
                t.insertBefore(o, i),
                u = i
            }
        return void 0 !== u ? u : o.nextSibling
    }
    function H(t, n, e) {
        "-" === n[0] ? t.setProperty(n, e) : t[n] = null == e ? "" : "number" != typeof e || y.test(n) ? e : e + "px"
    }
    function j(t, n, e, r, o) {
        var i;
        t: if ("style" === n)
            if ("string" == typeof e)
                t.style.cssText = e;
            else {
                if ("string" == typeof r && (t.style.cssText = r = ""),
                r)
                    for (n in r)
                        e && n in e || H(t.style, n, "");
                if (e)
                    for (n in e)
                        r && e[n] === r[n] || H(t.style, n, e[n])
            }
        else if ("o" === n[0] && "n" === n[1])
            i = n !== (n = n.replace(/Capture$/, "")),
            n = n.toLowerCase()in t ? n.toLowerCase().slice(2) : n.slice(2),
            t.l || (t.l = {}),
            t.l[n + i] = e,
            e ? r || t.addEventListener(n, i ? M : D, i) : t.removeEventListener(n, i ? M : D, i);
        else if ("dangerouslySetInnerHTML" !== n) {
            if (o)
                n = n.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
            else if ("href" !== n && "list" !== n && "form" !== n && "tabIndex" !== n && "download" !== n && n in t)
                try {
                    t[n] = null == e ? "" : e;
                    break t
                } catch (t) {}
            "function" == typeof e || (null == e || !1 === e && -1 == n.indexOf("-") ? t.removeAttribute(n) : t.setAttribute(n, e))
        }
    }
    function D(t) {
        this.l[t.type + !1](f.event ? f.event(t) : t)
    }
    function M(t) {
        this.l[t.type + !0](f.event ? f.event(t) : t)
    }
    function F(t, n, e, r, o, i, u, s, a) {
        var l, c, p, d, h, _, m, v, g, y, w, x, k, P, C, E = n.type;
        if (void 0 !== n.constructor)
            return null;
        null != e.__h && (a = e.__h,
        s = n.__e = e.__e,
        n.__h = null,
        i = [s]),
        (l = f.__b) && l(n);
        try {
            t: if ("function" == typeof E) {
                if (v = n.props,
                g = (l = E.contextType) && r[l.__c],
                y = l ? g ? g.props.value : l.__ : r,
                e.__c ? m = (c = n.__c = e.__c).__ = c.__E : ("prototype"in E && E.prototype.render ? n.__c = c = new E(v,y) : (n.__c = c = new N(v,y),
                c.constructor = E,
                c.render = B),
                g && g.sub(c),
                c.props = v,
                c.state || (c.state = {}),
                c.context = y,
                c.__n = r,
                p = c.__d = !0,
                c.__h = [],
                c._sb = []),
                null == c.__s && (c.__s = c.state),
                null != E.getDerivedStateFromProps && (c.__s == c.state && (c.__s = b({}, c.__s)),
                b(c.__s, E.getDerivedStateFromProps(v, c.__s))),
                d = c.props,
                h = c.state,
                p)
                    null == E.getDerivedStateFromProps && null != c.componentWillMount && c.componentWillMount(),
                    null != c.componentDidMount && c.__h.push(c.componentDidMount);
                else {
                    if (null == E.getDerivedStateFromProps && v !== d && null != c.componentWillReceiveProps && c.componentWillReceiveProps(v, y),
                    !c.__e && null != c.shouldComponentUpdate && !1 === c.shouldComponentUpdate(v, c.__s, y) || n.__v === e.__v) {
                        for (c.props = v,
                        c.state = c.__s,
                        n.__v !== e.__v && (c.__d = !1),
                        c.__v = n,
                        n.__e = e.__e,
                        n.__k = e.__k,
                        n.__k.forEach(function(t) {
                            t && (t.__ = n)
                        }),
                        w = 0; w < c._sb.length; w++)
                            c.__h.push(c._sb[w]);
                        c._sb = [],
                        c.__h.length && u.push(c);
                        break t
                    }
                    null != c.componentWillUpdate && c.componentWillUpdate(v, c.__s, y),
                    null != c.componentDidUpdate && c.__h.push(function() {
                        c.componentDidUpdate(d, h, _)
                    })
                }
                if (c.context = y,
                c.props = v,
                c.__v = n,
                c.__P = t,
                x = f.__r,
                k = 0,
                "prototype"in E && E.prototype.render) {
                    for (c.state = c.__s,
                    c.__d = !1,
                    x && x(n),
                    l = c.render(c.props, c.state, c.context),
                    P = 0; P < c._sb.length; P++)
                        c.__h.push(c._sb[P]);
                    c._sb = []
                } else
                    do {
                        c.__d = !1,
                        x && x(n),
                        l = c.render(c.props, c.state, c.context),
                        c.state = c.__s
                    } while (c.__d && ++k < 25);
                c.state = c.__s,
                null != c.getChildContext && (r = b(b({}, r), c.getChildContext())),
                p || null == c.getSnapshotBeforeUpdate || (_ = c.getSnapshotBeforeUpdate(d, h)),
                C = null != l && l.type === S && null == l.key ? l.props.children : l,
                I(t, Array.isArray(C) ? C : [C], n, e, r, o, i, u, s, a),
                c.base = n.__e,
                n.__h = null,
                c.__h.length && u.push(c),
                m && (c.__E = c.__ = null),
                c.__e = !1
            } else
                null == i && n.__v === e.__v ? (n.__k = e.__k,
                n.__e = e.__e) : n.__e = O(e.__e, n, e, r, o, i, u, a);
            (l = f.diffed) && l(n)
        } catch (t) {
            n.__v = null,
            (a || null != i) && (n.__e = s,
            n.__h = !!a,
            i[i.indexOf(s)] = null),
            f.__e(t, n, e)
        }
    }
    function R(t, n) {
        f.__c && f.__c(n, t),
        t.some(function(n) {
            try {
                t = n.__h,
                n.__h = [],
                t.some(function(t) {
                    t.call(n)
                })
            } catch (t) {
                f.__e(t, n.__v)
            }
        })
    }
    function O(t, n, e, r, o, i, u, s) {
        var a, l, f, p = e.props, d = n.props, h = n.type, _ = 0;
        if ("svg" === h && (o = !0),
        null != i)
            for (; _ < i.length; _++)
                if ((a = i[_]) && "setAttribute"in a == !!h && (h ? a.localName === h : 3 === a.nodeType)) {
                    t = a,
                    i[_] = null;
                    break
                }
        if (null == t) {
            if (null === h)
                return document.createTextNode(d);
            t = o ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h, d.is && d),
            i = null,
            s = !1
        }
        if (null === h)
            p === d || s && t.data === d || (t.data = d);
        else {
            if (i = i && c.call(t.childNodes),
            l = (p = e.props || v).dangerouslySetInnerHTML,
            f = d.dangerouslySetInnerHTML,
            !s) {
                if (null != i)
                    for (p = {},
                    _ = 0; _ < t.attributes.length; _++)
                        p[t.attributes[_].name] = t.attributes[_].value;
                (f || l) && (f && (l && f.__html == l.__html || f.__html === t.innerHTML) || (t.innerHTML = f && f.__html || ""))
            }
            if (function(t, n, e, r, o) {
                var i;
                for (i in e)
                    "children" === i || "key" === i || i in n || j(t, i, null, e[i], r);
                for (i in n)
                    o && "function" != typeof n[i] || "children" === i || "key" === i || "value" === i || "checked" === i || e[i] === n[i] || j(t, i, n[i], e[i], r)
            }(t, d, p, o, s),
            f)
                n.__k = [];
            else if (_ = n.props.children,
            I(t, Array.isArray(_) ? _ : [_], n, e, r, o && "foreignObject" !== h, i, u, i ? i[0] : e.__k && P(e, 0), s),
            null != i)
                for (_ = i.length; _--; )
                    null != i[_] && w(i[_]);
            s || ("value"in d && void 0 !== (_ = d.value) && (_ !== t.value || "progress" === h && !_ || "option" === h && _ !== p.value) && j(t, "value", _, p.value, !1),
            "checked"in d && void 0 !== (_ = d.checked) && _ !== t.checked && j(t, "checked", _, p.checked, !1))
        }
        return t
    }
    function U(t, n, e) {
        try {
            "function" == typeof t ? t(n) : t.current = n
        } catch (t) {
            f.__e(t, e)
        }
    }
    function W(t, n, e) {
        var r, o;
        if (f.unmount && f.unmount(t),
        (r = t.ref) && (r.current && r.current !== t.__e || U(r, null, n)),
        null != (r = t.__c)) {
            if (r.componentWillUnmount)
                try {
                    r.componentWillUnmount()
                } catch (t) {
                    f.__e(t, n)
                }
            r.base = r.__P = null,
            t.__c = void 0
        }
        if (r = t.__k)
            for (o = 0; o < r.length; o++)
                r[o] && W(r[o], n, e || "function" != typeof t.type);
        e || null == t.__e || w(t.__e),
        t.__ = t.__e = t.__d = void 0
    }
    function B(t, n, e) {
        return this.constructor(t, e)
    }
    function q(t, n, e) {
        var r, o, i;
        f.__ && f.__(t, n),
        o = (r = "function" == typeof e) ? null : e && e.__k || n.__k,
        i = [],
        F(n, t = (!r && e || n).__k = x(S, null, [t]), o || v, v, void 0 !== n.ownerSVGElement, !r && e ? [e] : o ? null : n.firstChild ? c.call(n.childNodes) : null, i, !r && e ? e : o ? o.__e : n.firstChild, r),
        R(i, t)
    }
    function z() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var n = 16 * Math.random() | 0;
            return ("x" == t ? n : 3 & n | 8).toString(16)
        })
    }
    c = g.slice,
    f = {
        __e: function(t, n, e, r) {
            for (var o, i, u; n = n.__; )
                if ((o = n.__c) && !o.__)
                    try {
                        if ((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(t)),
                        u = o.__d),
                        null != o.componentDidCatch && (o.componentDidCatch(t, r || {}),
                        u = o.__d),
                        u)
                            return o.__E = o
                    } catch (n) {
                        t = n
                    }
            throw t
        }
    },
    p = 0,
    d = function(t) {
        return null != t && void 0 === t.constructor
    }
    ,
    N.prototype.setState = function(t, n) {
        var e;
        e = null != this.__s && this.__s !== this.state ? this.__s : this.__s = b({}, this.state),
        "function" == typeof t && (t = t(b({}, e), this.props)),
        t && b(e, t),
        null != t && this.__v && (n && this._sb.push(n),
        E(this))
    }
    ,
    N.prototype.forceUpdate = function(t) {
        this.__v && (this.__e = !0,
        t && this.__h.push(t),
        E(this))
    }
    ,
    N.prototype.render = S,
    h = [],
    T.__r = 0,
    m = 0;
    var V = /*#__PURE__*/
    function() {
        function t(t) {
            this._id = void 0,
            this._id = t || z()
        }
        return e(t, [{
            key: "id",
            get: function() {
                return this._id
            }
        }]),
        t
    }();
    function $(t) {
        return x(t.parentElement || "span", {
            dangerouslySetInnerHTML: {
                __html: t.content
            }
        })
    }
    function G(t, n) {
        return x($, {
            content: t,
            parentElement: n
        })
    }
    var K, X = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this).data = void 0,
            e.update(n),
            e
        }
        o(n, t);
        var e = n.prototype;
        return e.cast = function(t) {
            return t instanceof HTMLElement ? G(t.outerHTML) : t
        }
        ,
        e.update = function(t) {
            return this.data = this.cast(t),
            this
        }
        ,
        n
    }(V), Z = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this)._cells = void 0,
            e.cells = n || [],
            e
        }
        o(n, t);
        var r = n.prototype;
        return r.cell = function(t) {
            return this._cells[t]
        }
        ,
        r.toArray = function() {
            return this.cells.map(function(t) {
                return t.data
            })
        }
        ,
        n.fromCells = function(t) {
            return new n(t.map(function(t) {
                return new X(t.data)
            }))
        }
        ,
        e(n, [{
            key: "cells",
            get: function() {
                return this._cells
            },
            set: function(t) {
                this._cells = t
            }
        }, {
            key: "length",
            get: function() {
                return this.cells.length
            }
        }]),
        n
    }(V), J = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this)._rows = void 0,
            e._length = void 0,
            e.rows = n instanceof Array ? n : n instanceof Z ? [n] : [],
            e
        }
        return o(n, t),
        n.prototype.toArray = function() {
            return this.rows.map(function(t) {
                return t.toArray()
            })
        }
        ,
        n.fromRows = function(t) {
            return new n(t.map(function(t) {
                return Z.fromCells(t.cells)
            }))
        }
        ,
        n.fromArray = function(t) {
            return new n((t = function(t) {
                return !t[0] || t[0]instanceof Array ? t : [t]
            }(t)).map(function(t) {
                return new Z(t.map(function(t) {
                    return new X(t)
                }))
            }))
        }
        ,
        e(n, [{
            key: "rows",
            get: function() {
                return this._rows
            },
            set: function(t) {
                this._rows = t
            }
        }, {
            key: "length",
            get: function() {
                return this._length || this.rows.length
            },
            set: function(t) {
                this._length = t
            }
        }]),
        n
    }(V), Q = /*#__PURE__*/
    function() {
        function t() {
            this.callbacks = void 0
        }
        var n = t.prototype;
        return n.init = function(t) {
            this.callbacks || (this.callbacks = {}),
            t && !this.callbacks[t] && (this.callbacks[t] = [])
        }
        ,
        n.listeners = function() {
            return this.callbacks
        }
        ,
        n.on = function(t, n) {
            return this.init(t),
            this.callbacks[t].push(n),
            this
        }
        ,
        n.off = function(t, n) {
            var e = t;
            return this.init(),
            this.callbacks[e] && 0 !== this.callbacks[e].length ? (this.callbacks[e] = this.callbacks[e].filter(function(t) {
                return t != n
            }),
            this) : this
        }
        ,
        n.emit = function(t) {
            var n = arguments
              , e = t;
            return this.init(e),
            this.callbacks[e].length > 0 && (this.callbacks[e].forEach(function(t) {
                return t.apply(void 0, [].slice.call(n, 1))
            }),
            !0)
        }
        ,
        t
    }();
    !function(t) {
        t[t.Initiator = 0] = "Initiator",
        t[t.ServerFilter = 1] = "ServerFilter",
        t[t.ServerSort = 2] = "ServerSort",
        t[t.ServerLimit = 3] = "ServerLimit",
        t[t.Extractor = 4] = "Extractor",
        t[t.Transformer = 5] = "Transformer",
        t[t.Filter = 6] = "Filter",
        t[t.Sort = 7] = "Sort",
        t[t.Limit = 8] = "Limit"
    }(K || (K = {}));
    var Y = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this).id = void 0,
            e._props = void 0,
            e._props = {},
            e.id = z(),
            n && e.setProps(n),
            e
        }
        o(n, t);
        var r = n.prototype;
        return r.process = function() {
            var t = [].slice.call(arguments);
            this.validateProps instanceof Function && this.validateProps.apply(this, t),
            this.emit.apply(this, ["beforeProcess"].concat(t));
            var n = this._process.apply(this, t);
            return this.emit.apply(this, ["afterProcess"].concat(t)),
            n
        }
        ,
        r.setProps = function(t) {
            return Object.assign(this._props, t),
            this.emit("propsUpdated", this),
            this
        }
        ,
        e(n, [{
            key: "props",
            get: function() {
                return this._props
            }
        }]),
        n
    }(Q)
      , tt = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            return this.props.keyword ? (n = String(this.props.keyword).trim(),
            e = this.props.columns,
            r = this.props.ignoreHiddenColumns,
            o = t,
            i = this.props.selector,
            n = n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
            new J(o.rows.filter(function(t, o) {
                return t.cells.some(function(t, u) {
                    if (!t)
                        return !1;
                    if (r && e && e[u] && "object" == typeof e[u] && e[u].hidden)
                        return !1;
                    var s = "";
                    if ("function" == typeof i)
                        s = i(t.data, o, u);
                    else if ("object" == typeof t.data) {
                        var a = t.data;
                        a && a.props && a.props.content && (s = a.props.content)
                    } else
                        s = String(t.data);
                    return new RegExp(n,"gi").test(s)
                })
            }))) : t;
            var n, e, r, o, i
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Filter
            }
        }]),
        n
    }(Y);
    function nt() {
        var t = "gridjs";
        return "" + t + [].slice.call(arguments).reduce(function(t, n) {
            return t + "-" + n
        }, "")
    }
    function et() {
        return [].slice.call(arguments).map(function(t) {
            return t ? t.toString() : ""
        }).filter(function(t) {
            return t
        }).reduce(function(t, n) {
            return (t || "") + " " + n
        }, "").trim()
    }
    var rt, ot, it, ut, st = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            if (!this.props.keyword)
                return t;
            var n = {};
            return this.props.url && (n.url = this.props.url(t.url, this.props.keyword)),
            this.props.body && (n.body = this.props.body(t.body, this.props.keyword)),
            r({}, t, n)
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.ServerFilter
            }
        }]),
        n
    }(Y), at = 0, lt = [], ct = [], ft = f.__b, pt = f.__r, dt = f.diffed, ht = f.__c, _t = f.unmount;
    function mt(t, n) {
        f.__h && f.__h(ot, t, at || n),
        at = 0;
        var e = ot.__H || (ot.__H = {
            __: [],
            __h: []
        });
        return t >= e.__.length && e.__.push({
            __V: ct
        }),
        e.__[t]
    }
    function vt(t) {
        return at = 1,
        function(t, n, e) {
            var r = mt(rt++, 2);
            if (r.t = t,
            !r.__c && (r.__ = [Ct(void 0, n), function(t) {
                var n = r.__N ? r.__N[0] : r.__[0]
                  , e = r.t(n, t);
                n !== e && (r.__N = [e, r.__[1]],
                r.__c.setState({}))
            }
            ],
            r.__c = ot,
            !ot.u)) {
                ot.u = !0;
                var o = ot.shouldComponentUpdate;
                ot.shouldComponentUpdate = function(t, n, e) {
                    if (!r.__c.__H)
                        return !0;
                    var i = r.__c.__H.__.filter(function(t) {
                        return t.__c
                    });
                    if (i.every(function(t) {
                        return !t.__N
                    }))
                        return !o || o.call(this, t, n, e);
                    var u = !1;
                    return i.forEach(function(t) {
                        if (t.__N) {
                            var n = t.__[0];
                            t.__ = t.__N,
                            t.__N = void 0,
                            n !== t.__[0] && (u = !0)
                        }
                    }),
                    !(!u && r.__c.props === t) && (!o || o.call(this, t, n, e))
                }
            }
            return r.__N || r.__
        }(Ct, t)
    }
    function gt(t, n) {
        var e = mt(rt++, 3);
        !f.__s && Pt(e.__H, n) && (e.__ = t,
        e.i = n,
        ot.__H.__h.push(e))
    }
    function yt(t) {
        return at = 5,
        bt(function() {
            return {
                current: t
            }
        }, [])
    }
    function bt(t, n) {
        var e = mt(rt++, 7);
        return Pt(e.__H, n) ? (e.__V = t(),
        e.i = n,
        e.__h = t,
        e.__V) : e.__
    }
    function wt() {
        for (var t; t = lt.shift(); )
            if (t.__P && t.__H)
                try {
                    t.__H.__h.forEach(St),
                    t.__H.__h.forEach(Nt),
                    t.__H.__h = []
                } catch (n) {
                    t.__H.__h = [],
                    f.__e(n, t.__v)
                }
    }
    f.__b = function(t) {
        ot = null,
        ft && ft(t)
    }
    ,
    f.__r = function(t) {
        pt && pt(t),
        rt = 0;
        var n = (ot = t.__c).__H;
        n && (it === ot ? (n.__h = [],
        ot.__h = [],
        n.__.forEach(function(t) {
            t.__N && (t.__ = t.__N),
            t.__V = ct,
            t.__N = t.i = void 0
        })) : (n.__h.forEach(St),
        n.__h.forEach(Nt),
        n.__h = [])),
        it = ot
    }
    ,
    f.diffed = function(t) {
        dt && dt(t);
        var n = t.__c;
        n && n.__H && (n.__H.__h.length && (1 !== lt.push(n) && ut === f.requestAnimationFrame || ((ut = f.requestAnimationFrame) || kt)(wt)),
        n.__H.__.forEach(function(t) {
            t.i && (t.__H = t.i),
            t.__V !== ct && (t.__ = t.__V),
            t.i = void 0,
            t.__V = ct
        })),
        it = ot = null
    }
    ,
    f.__c = function(t, n) {
        n.some(function(t) {
            try {
                t.__h.forEach(St),
                t.__h = t.__h.filter(function(t) {
                    return !t.__ || Nt(t)
                })
            } catch (e) {
                n.some(function(t) {
                    t.__h && (t.__h = [])
                }),
                n = [],
                f.__e(e, t.__v)
            }
        }),
        ht && ht(t, n)
    }
    ,
    f.unmount = function(t) {
        _t && _t(t);
        var n, e = t.__c;
        e && e.__H && (e.__H.__.forEach(function(t) {
            try {
                St(t)
            } catch (t) {
                n = t
            }
        }),
        e.__H = void 0,
        n && f.__e(n, e.__v))
    }
    ;
    var xt = "function" == typeof requestAnimationFrame;
    function kt(t) {
        var n, e = function() {
            clearTimeout(r),
            xt && cancelAnimationFrame(n),
            setTimeout(t)
        }, r = setTimeout(e, 100);
        xt && (n = requestAnimationFrame(e))
    }
    function St(t) {
        var n = ot
          , e = t.__c;
        "function" == typeof e && (t.__c = void 0,
        e()),
        ot = n
    }
    function Nt(t) {
        var n = ot;
        t.__c = t.__(),
        ot = n
    }
    function Pt(t, n) {
        return !t || t.length !== n.length || n.some(function(n, e) {
            return n !== t[e]
        })
    }
    function Ct(t, n) {
        return "function" == typeof n ? n(t) : n
    }
    function Et() {
        return function(t) {
            var n = ot.context[t.__c]
              , e = mt(rt++, 9);
            return e.c = t,
            n ? (null == e.__ && (e.__ = !0,
            n.sub(ot)),
            n.props.value) : t.__
        }(cn)
    }
    var Tt = {
        search: {
            placeholder: "Type a keyword..."
        },
        sort: {
            sortAsc: "Sort column ascending",
            sortDesc: "Sort column descending"
        },
        pagination: {
            previous: "Previous",
            next: "Next",
            navigate: function(t, n) {
                return "Page " + t + " of " + n
            },
            page: function(t) {
                return "Page " + t
            },
            showing: "Showing",
            of: "of",
            to: "to",
            results: "results"
        },
        loading: "Loading...",
        noRecordsFound: "No matching records found",
        error: "An error happened while fetching the data"
    }
      , It = /*#__PURE__*/
    function() {
        function t(t) {
            this._language = void 0,
            this._defaultLanguage = void 0,
            this._language = t,
            this._defaultLanguage = Tt
        }
        var n = t.prototype;
        return n.getString = function(t, n) {
            if (!n || !t)
                return null;
            var e = t.split(".")
              , r = e[0];
            if (n[r]) {
                var o = n[r];
                return "string" == typeof o ? function() {
                    return o
                }
                : "function" == typeof o ? o : this.getString(e.slice(1).join("."), o)
            }
            return null
        }
        ,
        n.translate = function(t) {
            var n, e = this.getString(t, this._language);
            return (n = e || this.getString(t, this._defaultLanguage)) ? n.apply(void 0, [].slice.call(arguments, 1)) : t
        }
        ,
        t
    }();
    function Lt() {
        var t = Et();
        return function(n) {
            var e;
            return (e = t.translator).translate.apply(e, [n].concat([].slice.call(arguments, 1)))
        }
    }
    var At = function(t) {
        return function(n) {
            return r({}, n, {
                search: {
                    keyword: t
                }
            })
        }
    };
    function Ht() {
        return Et().store
    }
    function jt(t) {
        var n = Ht()
          , e = vt(t(n.getState()))
          , r = e[0]
          , o = e[1];
        return gt(function() {
            return n.subscribe(function() {
                var e = t(n.getState());
                r !== e && o(e)
            })
        }, []),
        r
    }
    function Dt() {
        var t, n = vt(void 0), e = n[0], r = n[1], o = Et(), i = o.search, u = Lt(), s = Ht().dispatch, a = jt(function(t) {
            return t.search
        });
        gt(function() {
            e && e.setProps({
                keyword: null == a ? void 0 : a.keyword
            })
        }, [a, e]),
        gt(function() {
            r(i.server ? new st({
                keyword: i.keyword,
                url: i.server.url,
                body: i.server.body
            }) : new tt({
                keyword: i.keyword,
                columns: o.header && o.header.columns,
                ignoreHiddenColumns: i.ignoreHiddenColumns || void 0 === i.ignoreHiddenColumns,
                selector: i.selector
            })),
            i.keyword && s(At(i.keyword))
        }, [i]),
        gt(function() {
            return o.pipeline.register(e),
            function() {
                return o.pipeline.unregister(e)
            }
        }, [o, e]);
        var l, c, f, p = function(t, n) {
            return at = 8,
            bt(function() {
                return t
            }, n)
        }((l = function(t) {
            t.target instanceof HTMLInputElement && s(At(t.target.value))
        }
        ,
        c = e instanceof st ? i.debounceTimeout || 250 : 0,
        function() {
            var t = arguments;
            return new Promise(function(n) {
                f && clearTimeout(f),
                f = setTimeout(function() {
                    return n(l.apply(void 0, [].slice.call(t)))
                }, c)
            }
            )
        }
        ), [i, e]);
        return x("div", {
            className: nt(et("search", null == (t = o.className) ? void 0 : t.search))
        }, x("input", {
            type: "search",
            placeholder: u("search.placeholder"),
            "aria-label": u("search.placeholder"),
            onInput: p,
            className: et(nt("input"), nt("search", "input")),
            value: (null == a ? void 0 : a.keyword) || ""
        }))
    }
    var Mt = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        o(n, t);
        var r = n.prototype;
        return r.validateProps = function() {
            if (isNaN(Number(this.props.limit)) || isNaN(Number(this.props.page)))
                throw Error("Invalid parameters passed")
        }
        ,
        r._process = function(t) {
            var n = this.props.page;
            return new J(t.rows.slice(n * this.props.limit, (n + 1) * this.props.limit))
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Limit
            }
        }]),
        n
    }(Y)
      , Ft = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            var n = {};
            return this.props.url && (n.url = this.props.url(t.url, this.props.page, this.props.limit)),
            this.props.body && (n.body = this.props.body(t.body, this.props.page, this.props.limit)),
            r({}, t, n)
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.ServerLimit
            }
        }]),
        n
    }(Y);
    function Rt() {
        var t = Et()
          , n = t.pagination
          , e = n.server
          , r = n.summary
          , o = void 0 === r || r
          , i = n.nextButton
          , u = void 0 === i || i
          , s = n.prevButton
          , a = void 0 === s || s
          , l = n.buttonsCount
          , c = void 0 === l ? 3 : l
          , f = n.limit
          , p = void 0 === f ? 10 : f
          , d = n.page
          , h = void 0 === d ? 0 : d
          , _ = n.resetPageOnUpdate
          , m = void 0 === _ || _
          , v = yt(null)
          , g = vt(h)
          , y = g[0]
          , b = g[1]
          , w = vt(0)
          , k = w[0]
          , N = w[1]
          , P = Lt();
        gt(function() {
            return v.current = e ? new Ft({
                limit: p,
                page: y,
                url: e.url,
                body: e.body
            }) : new Mt({
                limit: p,
                page: y
            }),
            v.current instanceof Ft ? t.pipeline.on("afterProcess", function(t) {
                return N(t.length)
            }) : v.current instanceof Mt && v.current.on("beforeProcess", function(t) {
                return N(t.length)
            }),
            t.pipeline.on("updated", C),
            t.pipeline.register(v.current),
            t.pipeline.on("error", function() {
                N(0),
                b(0)
            }),
            function() {
                t.pipeline.unregister(v.current),
                t.pipeline.off("updated", C)
            }
        }, []);
        var C = function(t) {
            m && t !== v.current && b(0)
        }
          , E = function() {
            return Math.ceil(k / p)
        }
          , T = function(t) {
            if (t >= E() || t < 0 || t === y)
                return null;
            b(t),
            v.current.setProps({
                page: t
            })
        };
        return x("div", {
            className: et(nt("pagination"), t.className.pagination)
        }, x(S, null, o && k > 0 && x("div", {
            role: "status",
            "aria-live": "polite",
            className: et(nt("summary"), t.className.paginationSummary),
            title: P("pagination.navigate", y + 1, E())
        }, P("pagination.showing"), " ", x("b", null, P("" + (y * p + 1))), " ", P("pagination.to"), " ", x("b", null, P("" + Math.min((y + 1) * p, k))), " ", P("pagination.of"), " ", x("b", null, P("" + k)), " ", P("pagination.results"))), x("div", {
            className: nt("pages")
        }, a && x("button", {
            tabIndex: 0,
            role: "button",
            disabled: 0 === y,
            onClick: function() {
                return T(y - 1)
            },
            title: P("pagination.previous"),
            "aria-label": P("pagination.previous"),
            className: et(t.className.paginationButton, t.className.paginationButtonPrev)
        }, P("pagination.previous")), function() {
            if (c <= 0)
                return null;
            var n = Math.min(E(), c)
              , e = Math.min(y, Math.floor(n / 2));
            return y + Math.floor(n / 2) >= E() && (e = n - (E() - y)),
            x(S, null, E() > n && y - e > 0 && x(S, null, x("button", {
                tabIndex: 0,
                role: "button",
                onClick: function() {
                    return T(0)
                },
                title: P("pagination.firstPage"),
                "aria-label": P("pagination.firstPage"),
                className: t.className.paginationButton
            }, P("1")), x("button", {
                tabIndex: -1,
                className: et(nt("spread"), t.className.paginationButton)
            }, "...")), Array.from(Array(n).keys()).map(function(t) {
                return y + (t - e)
            }).map(function(n) {
                return x("button", {
                    tabIndex: 0,
                    role: "button",
                    onClick: function() {
                        return T(n)
                    },
                    className: et(y === n ? et(nt("currentPage"), t.className.paginationButtonCurrent) : null, t.className.paginationButton),
                    title: P("pagination.page", n + 1),
                    "aria-label": P("pagination.page", n + 1)
                }, P("" + (n + 1)))
            }), E() > n && E() > y + e + 1 && x(S, null, x("button", {
                tabIndex: -1,
                className: et(nt("spread"), t.className.paginationButton)
            }, "..."), x("button", {
                tabIndex: 0,
                role: "button",
                onClick: function() {
                    return T(E() - 1)
                },
                title: P("pagination.page", E()),
                "aria-label": P("pagination.page", E()),
                className: t.className.paginationButton
            }, P("" + E()))))
        }(), u && x("button", {
            tabIndex: 0,
            role: "button",
            disabled: E() === y + 1 || 0 === E(),
            onClick: function() {
                return T(y + 1)
            },
            title: P("pagination.next"),
            "aria-label": P("pagination.next"),
            className: et(t.className.paginationButton, t.className.paginationButtonNext)
        }, P("pagination.next"))))
    }
    function Ot(t, n) {
        return "string" == typeof t ? t.indexOf("%") > -1 ? n / 100 * parseInt(t, 10) : parseInt(t, 10) : t
    }
    function Ut(t) {
        return t ? Math.floor(t) + "px" : ""
    }
    function Wt(t) {
        var n = t.tableRef.cloneNode(!0);
        return n.style.position = "absolute",
        n.style.width = "100%",
        n.style.zIndex = "-2147483640",
        n.style.visibility = "hidden",
        x("div", {
            ref: function(t) {
                t && t.appendChild(n)
            }
        })
    }
    function Bt(t) {
        if (!t)
            return "";
        var n = t.split(" ");
        return 1 === n.length && /([a-z][A-Z])+/g.test(t) ? t : n.map(function(t, n) {
            return 0 == n ? t.toLowerCase() : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
        }).join("")
    }
    var qt, zt = new (/*#__PURE__*/
    function() {
        function t() {}
        var n = t.prototype;
        return n.format = function(t, n) {
            return "[Grid.js] [" + n.toUpperCase() + "]: " + t
        }
        ,
        n.error = function(t, n) {
            void 0 === n && (n = !1);
            var e = this.format(t, "error");
            if (n)
                throw Error(e);
            console.error(e)
        }
        ,
        n.warn = function(t) {
            console.warn(this.format(t, "warn"))
        }
        ,
        n.info = function(t) {
            console.info(this.format(t, "info"))
        }
        ,
        t
    }());
    t.PluginPosition = void 0,
    (qt = t.PluginPosition || (t.PluginPosition = {}))[qt.Header = 0] = "Header",
    qt[qt.Footer = 1] = "Footer",
    qt[qt.Cell = 2] = "Cell";
    var Vt = /*#__PURE__*/
    function() {
        function t() {
            this.plugins = void 0,
            this.plugins = []
        }
        var n = t.prototype;
        return n.get = function(t) {
            return this.plugins.find(function(n) {
                return n.id === t
            })
        }
        ,
        n.add = function(t) {
            return t.id ? this.get(t.id) ? (zt.error("Duplicate plugin ID: " + t.id),
            this) : (this.plugins.push(t),
            this) : (zt.error("Plugin ID cannot be empty"),
            this)
        }
        ,
        n.remove = function(t) {
            var n = this.get(t);
            return n && this.plugins.splice(this.plugins.indexOf(n), 1),
            this
        }
        ,
        n.list = function(t) {
            var n;
            return n = null != t || null != t ? this.plugins.filter(function(n) {
                return n.position === t
            }) : this.plugins,
            n.sort(function(t, n) {
                return t.order && n.order ? t.order - n.order : 1
            })
        }
        ,
        t
    }();
    function $t(t) {
        var n = this
          , e = Et();
        if (t.pluginId) {
            var o = e.plugin.get(t.pluginId);
            return o ? x(S, {}, x(o.component, r({
                plugin: o
            }, t.props))) : null
        }
        return void 0 !== t.position ? x(S, {}, e.plugin.list(t.position).map(function(t) {
            return x(t.component, r({
                plugin: t
            }, n.props.props))
        })) : null
    }
    var Gt = /*#__PURE__*/
    function(n) {
        function i() {
            var t;
            return (t = n.call(this) || this)._columns = void 0,
            t._columns = [],
            t
        }
        o(i, n);
        var u = i.prototype;
        return u.adjustWidth = function(t, n, e) {
            var o = t.container
              , u = t.autoWidth;
            if (!o)
                return this;
            var s = o.clientWidth
              , l = {};
            n.current && u && (q(x(Wt, {
                tableRef: n.current
            }), e.current),
            l = function(t) {
                var n = t.querySelector("table");
                if (!n)
                    return {};
                var e = n.className
                  , o = n.style.cssText;
                n.className = e + " " + nt("shadowTable"),
                n.style.tableLayout = "auto",
                n.style.width = "auto",
                n.style.padding = "0",
                n.style.margin = "0",
                n.style.border = "none",
                n.style.outline = "none";
                var i = Array.from(n.parentNode.querySelectorAll("thead th")).reduce(function(t, n) {
                    var e;
                    return n.style.width = n.clientWidth + "px",
                    r(((e = {})[n.getAttribute("data-column-id")] = {
                        minWidth: n.clientWidth
                    },
                    e), t)
                }, {});
                return n.className = e,
                n.style.cssText = o,
                n.style.tableLayout = "auto",
                Array.from(n.parentNode.querySelectorAll("thead th")).reduce(function(t, n) {
                    return t[n.getAttribute("data-column-id")].width = n.clientWidth,
                    t
                }, i)
            }(e.current));
            for (var c, f = a(i.tabularFormat(this.columns).reduce(function(t, n) {
                return t.concat(n)
            }, [])); !(c = f()).done; ) {
                var p = c.value;
                p.columns && p.columns.length > 0 || (!p.width && u ? p.id in l && (p.width = Ut(l[p.id].width),
                p.minWidth = Ut(l[p.id].minWidth)) : p.width = Ut(Ot(p.width, s)))
            }
            return n.current && u && q(null, e.current),
            this
        }
        ,
        u.setSort = function(t, n) {
            for (var e, o = a(n || this.columns || []); !(e = o()).done; ) {
                var i = e.value;
                i.columns && i.columns.length > 0 ? i.sort = void 0 : void 0 === i.sort && t ? i.sort = {} : i.sort ? "object" == typeof i.sort && (i.sort = r({}, i.sort)) : i.sort = void 0,
                i.columns && this.setSort(t, i.columns)
            }
        }
        ,
        u.setResizable = function(t, n) {
            for (var e, r = a(n || this.columns || []); !(e = r()).done; ) {
                var o = e.value;
                void 0 === o.resizable && (o.resizable = t),
                o.columns && this.setResizable(t, o.columns)
            }
        }
        ,
        u.setID = function(t) {
            for (var n, e = a(t || this.columns || []); !(n = e()).done; ) {
                var r = n.value;
                r.id || "string" != typeof r.name || (r.id = Bt(r.name)),
                r.id || zt.error('Could not find a valid ID for one of the columns. Make sure a valid "id" is set for all columns.'),
                r.columns && this.setID(r.columns)
            }
        }
        ,
        u.populatePlugins = function(n, e) {
            for (var o, i = a(e); !(o = i()).done; ) {
                var u = o.value;
                void 0 !== u.plugin && n.add(r({
                    id: u.id
                }, u.plugin, {
                    position: t.PluginPosition.Cell
                }))
            }
        }
        ,
        i.fromColumns = function(t) {
            for (var n, e = new i, r = a(t); !(n = r()).done; ) {
                var o = n.value;
                if ("string" == typeof o || d(o))
                    e.columns.push({
                        name: o
                    });
                else if ("object" == typeof o) {
                    var u = o;
                    u.columns && (u.columns = i.fromColumns(u.columns).columns),
                    "object" == typeof u.plugin && void 0 === u.data && (u.data = null),
                    e.columns.push(o)
                }
            }
            return e
        }
        ,
        i.createFromConfig = function(t) {
            var n = new i;
            return t.from ? n.columns = i.fromHTMLTable(t.from).columns : t.columns ? n.columns = i.fromColumns(t.columns).columns : !t.data || "object" != typeof t.data[0] || t.data[0]instanceof Array || (n.columns = Object.keys(t.data[0]).map(function(t) {
                return {
                    name: t
                }
            })),
            n.columns.length ? (n.setID(),
            n.setSort(t.sort),
            n.setResizable(t.resizable),
            n.populatePlugins(t.plugin, n.columns),
            n) : null
        }
        ,
        i.fromHTMLTable = function(t) {
            for (var n, e = new i, r = a(t.querySelector("thead").querySelectorAll("th")); !(n = r()).done; ) {
                var o = n.value;
                e.columns.push({
                    name: o.innerHTML,
                    width: o.width
                })
            }
            return e
        }
        ,
        i.tabularFormat = function(t) {
            var n = []
              , e = t || []
              , r = [];
            if (e && e.length) {
                n.push(e);
                for (var o, i = a(e); !(o = i()).done; ) {
                    var u = o.value;
                    u.columns && u.columns.length && (r = r.concat(u.columns))
                }
                r.length && (n = n.concat(this.tabularFormat(r)))
            }
            return n
        }
        ,
        i.leafColumns = function(t) {
            var n = []
              , e = t || [];
            if (e && e.length)
                for (var r, o = a(e); !(r = o()).done; ) {
                    var i = r.value;
                    i.columns && 0 !== i.columns.length || n.push(i),
                    i.columns && (n = n.concat(this.leafColumns(i.columns)))
                }
            return n
        }
        ,
        i.maximumDepth = function(t) {
            return this.tabularFormat([t]).length - 1
        }
        ,
        e(i, [{
            key: "columns",
            get: function() {
                return this._columns
            },
            set: function(t) {
                this._columns = t
            }
        }, {
            key: "visibleColumns",
            get: function() {
                return this._columns.filter(function(t) {
                    return !t.hidden
                })
            }
        }]),
        i
    }(V)
      , Kt = function() {}
      , Xt = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this).data = void 0,
            e.set(n),
            e
        }
        o(n, t);
        var e = n.prototype;
        return e.get = function() {
            try {
                return Promise.resolve(this.data()).then(function(t) {
                    return {
                        data: t,
                        total: t.length
                    }
                })
            } catch (t) {
                return Promise.reject(t)
            }
        }
        ,
        e.set = function(t) {
            return t instanceof Array ? this.data = function() {
                return t
            }
            : t instanceof Function && (this.data = t),
            this
        }
        ,
        n
    }(Kt)
      , Zt = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this).options = void 0,
            e.options = n,
            e
        }
        o(n, t);
        var e = n.prototype;
        return e.handler = function(t) {
            return "function" == typeof this.options.handle ? this.options.handle(t) : t.ok ? t.json() : (zt.error("Could not fetch data: " + t.status + " - " + t.statusText, !0),
            null)
        }
        ,
        e.get = function(t) {
            var n = r({}, this.options, t);
            return "function" == typeof n.data ? n.data(n) : fetch(n.url, n).then(this.handler.bind(this)).then(function(t) {
                return {
                    data: n.then(t),
                    total: "function" == typeof n.total ? n.total(t) : void 0
                }
            })
        }
        ,
        n
    }(Kt)
      , Jt = /*#__PURE__*/
    function() {
        function t() {}
        return t.createFromConfig = function(t) {
            var n = null;
            return t.data && (n = new Xt(t.data)),
            t.from && (n = new Xt(this.tableElementToArray(t.from)),
            t.from.style.display = "none"),
            t.server && (n = new Zt(t.server)),
            n || zt.error("Could not determine the storage type", !0),
            n
        }
        ,
        t.tableElementToArray = function(t) {
            for (var n, e, r = [], o = a(t.querySelector("tbody").querySelectorAll("tr")); !(n = o()).done; ) {
                for (var i, u = [], s = a(n.value.querySelectorAll("td")); !(i = s()).done; ) {
                    var l = i.value;
                    1 === l.childNodes.length && l.childNodes[0].nodeType === Node.TEXT_NODE ? u.push((e = l.innerHTML,
                    (new DOMParser).parseFromString(e, "text/html").documentElement.textContent)) : u.push(G(l.innerHTML))
                }
                r.push(u)
            }
            return r
        }
        ,
        t
    }()
      , Qt = "undefined" != typeof Symbol ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
    function Yt(t, n, e) {
        if (!t.s) {
            if (e instanceof tn) {
                if (!e.s)
                    return void (e.o = Yt.bind(null, t, n));
                1 & n && (n = e.s),
                e = e.v
            }
            if (e && e.then)
                return void e.then(Yt.bind(null, t, n), Yt.bind(null, t, 2));
            t.s = n,
            t.v = e;
            var r = t.o;
            r && r(t)
        }
    }
    var tn = /*#__PURE__*/
    function() {
        function t() {}
        return t.prototype.then = function(n, e) {
            var r = new t
              , o = this.s;
            if (o) {
                var i = 1 & o ? n : e;
                if (i) {
                    try {
                        Yt(r, 1, i(this.v))
                    } catch (t) {
                        Yt(r, 2, t)
                    }
                    return r
                }
                return this
            }
            return this.o = function(t) {
                try {
                    var o = t.v;
                    1 & t.s ? Yt(r, 1, n ? n(o) : o) : e ? Yt(r, 1, e(o)) : Yt(r, 2, o)
                } catch (t) {
                    Yt(r, 2, t)
                }
            }
            ,
            r
        }
        ,
        t
    }();
    function nn(t) {
        return t instanceof tn && 1 & t.s
    }
    var en = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this)._steps = new Map,
            e.cache = new Map,
            e.lastProcessorIndexUpdated = -1,
            n && n.forEach(function(t) {
                return e.register(t)
            }),
            e
        }
        o(n, t);
        var r = n.prototype;
        return r.clearCache = function() {
            this.cache = new Map,
            this.lastProcessorIndexUpdated = -1
        }
        ,
        r.register = function(t, n) {
            if (void 0 === n && (n = null),
            t) {
                if (null === t.type)
                    throw Error("Processor type is not defined");
                t.on("propsUpdated", this.processorPropsUpdated.bind(this)),
                this.addProcessorByPriority(t, n),
                this.afterRegistered(t)
            }
        }
        ,
        r.unregister = function(t) {
            if (t) {
                var n = this._steps.get(t.type);
                n && n.length && (this._steps.set(t.type, n.filter(function(n) {
                    return n != t
                })),
                this.emit("updated", t))
            }
        }
        ,
        r.addProcessorByPriority = function(t, n) {
            var e = this._steps.get(t.type);
            if (!e) {
                var r = [];
                this._steps.set(t.type, r),
                e = r
            }
            if (null === n || n < 0)
                e.push(t);
            else if (e[n]) {
                var o = e.slice(0, n - 1)
                  , i = e.slice(n + 1);
                this._steps.set(t.type, o.concat(t).concat(i))
            } else
                e[n] = t
        }
        ,
        r.getStepsByType = function(t) {
            return this.steps.filter(function(n) {
                return n.type === t
            })
        }
        ,
        r.getSortedProcessorTypes = function() {
            return Object.keys(K).filter(function(t) {
                return !isNaN(Number(t))
            }).map(function(t) {
                return Number(t)
            })
        }
        ,
        r.process = function(t) {
            try {
                var n = function(t) {
                    return e.lastProcessorIndexUpdated = o.length,
                    e.emit("afterProcess", i),
                    i
                }
                  , e = this
                  , r = e.lastProcessorIndexUpdated
                  , o = e.steps
                  , i = t
                  , u = function(t, n) {
                    try {
                        var u = function(t, n, e) {
                            if ("function" == typeof t[Qt]) {
                                var r, o, i, u = t[Qt]();
                                if (function t(e) {
                                    try {
                                        for (; !(r = u.next()).done; )
                                            if ((e = n(r.value)) && e.then) {
                                                if (!nn(e))
                                                    return void e.then(t, i || (i = Yt.bind(null, o = new tn, 2)));
                                                e = e.v
                                            }
                                        o ? Yt(o, 1, e) : o = e
                                    } catch (t) {
                                        Yt(o || (o = new tn), 2, t)
                                    }
                                }(),
                                u.return) {
                                    var s = function(t) {
                                        try {
                                            r.done || u.return()
                                        } catch (t) {}
                                        return t
                                    };
                                    if (o && o.then)
                                        return o.then(s, function(t) {
                                            throw s(t)
                                        });
                                    s()
                                }
                                return o
                            }
                            if (!("length"in t))
                                throw new TypeError("Object is not iterable");
                            for (var a = [], l = 0; l < t.length; l++)
                                a.push(t[l]);
                            return function(t, n, e) {
                                var r, o, i = -1;
                                return function e(u) {
                                    try {
                                        for (; ++i < t.length; )
                                            if ((u = n(i)) && u.then) {
                                                if (!nn(u))
                                                    return void u.then(e, o || (o = Yt.bind(null, r = new tn, 2)));
                                                u = u.v
                                            }
                                        r ? Yt(r, 1, u) : r = u
                                    } catch (t) {
                                        Yt(r || (r = new tn), 2, t)
                                    }
                                }(),
                                r
                            }(a, function(t) {
                                return n(a[t])
                            })
                        }(o, function(t) {
                            var n = e.findProcessorIndexByID(t.id)
                              , o = function() {
                                if (n >= r)
                                    return Promise.resolve(t.process(i)).then(function(n) {
                                        e.cache.set(t.id, i = n)
                                    });
                                i = e.cache.get(t.id)
                            }();
                            if (o && o.then)
                                return o.then(function() {})
                        })
                    } catch (t) {
                        return n(t)
                    }
                    return u && u.then ? u.then(void 0, n) : u
                }(0, function(t) {
                    throw zt.error(t),
                    e.emit("error", i),
                    t
                });
                return Promise.resolve(u && u.then ? u.then(n) : n())
            } catch (t) {
                return Promise.reject(t)
            }
        }
        ,
        r.findProcessorIndexByID = function(t) {
            return this.steps.findIndex(function(n) {
                return n.id == t
            })
        }
        ,
        r.setLastProcessorIndex = function(t) {
            var n = this.findProcessorIndexByID(t.id);
            this.lastProcessorIndexUpdated > n && (this.lastProcessorIndexUpdated = n)
        }
        ,
        r.processorPropsUpdated = function(t) {
            this.setLastProcessorIndex(t),
            this.emit("propsUpdated"),
            this.emit("updated", t)
        }
        ,
        r.afterRegistered = function(t) {
            this.setLastProcessorIndex(t),
            this.emit("afterRegister"),
            this.emit("updated", t)
        }
        ,
        e(n, [{
            key: "steps",
            get: function() {
                for (var t, n = [], e = a(this.getSortedProcessorTypes()); !(t = e()).done; ) {
                    var r = this._steps.get(t.value);
                    r && r.length && (n = n.concat(r))
                }
                return n.filter(function(t) {
                    return t
                })
            }
        }]),
        n
    }(Q)
      , rn = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            try {
                return Promise.resolve(this.props.storage.get(t))
            } catch (t) {
                return Promise.reject(t)
            }
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Extractor
            }
        }]),
        n
    }(Y)
      , on = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            var n = J.fromArray(t.data);
            return n.length = t.total,
            n
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Transformer
            }
        }]),
        n
    }(Y)
      , un = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function() {
            return Object.entries(this.props.serverStorageOptions).filter(function(t) {
                return "function" != typeof t[1]
            }).reduce(function(t, n) {
                var e;
                return r({}, t, ((e = {})[n[0]] = n[1],
                e))
            }, {})
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Initiator
            }
        }]),
        n
    }(Y)
      , sn = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        o(n, t);
        var r = n.prototype;
        return r.castData = function(t) {
            if (!t || !t.length)
                return [];
            if (!this.props.header || !this.props.header.columns)
                return t;
            var n = Gt.leafColumns(this.props.header.columns);
            return t[0]instanceof Array ? t.map(function(t) {
                var e = 0;
                return n.map(function(n, r) {
                    return void 0 !== n.data ? (e++,
                    "function" == typeof n.data ? n.data(t) : n.data) : t[r - e]
                })
            }) : "object" != typeof t[0] || t[0]instanceof Array ? [] : t.map(function(t) {
                return n.map(function(n, e) {
                    return void 0 !== n.data ? "function" == typeof n.data ? n.data(t) : n.data : n.id ? t[n.id] : (zt.error("Could not find the correct cell for column at position " + e + ".\n                          Make sure either 'id' or 'selector' is defined for all columns."),
                    null)
                })
            })
        }
        ,
        r._process = function(t) {
            return {
                data: this.castData(t.data),
                total: t.total
            }
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Transformer
            }
        }]),
        n
    }(Y)
      , an = /*#__PURE__*/
    function() {
        function t() {}
        return t.createFromConfig = function(t) {
            var n = new en;
            return t.storage instanceof Zt && n.register(new un({
                serverStorageOptions: t.server
            })),
            n.register(new rn({
                storage: t.storage
            })),
            n.register(new sn({
                header: t.header
            })),
            n.register(new on),
            n
        }
        ,
        t
    }()
      , ln = function(t) {
        var n = this;
        this.state = void 0,
        this.listeners = [],
        this.isDispatching = !1,
        this.getState = function() {
            return n.state
        }
        ,
        this.getListeners = function() {
            return n.listeners
        }
        ,
        this.dispatch = function(t) {
            if ("function" != typeof t)
                throw new Error("Reducer is not a function");
            if (n.isDispatching)
                throw new Error("Reducers may not dispatch actions");
            n.isDispatching = !0;
            var e = n.state;
            try {
                n.state = t(n.state)
            } finally {
                n.isDispatching = !1
            }
            for (var r, o = a(n.listeners); !(r = o()).done; )
                (0,
                r.value)(n.state, e);
            return n.state
        }
        ,
        this.subscribe = function(t) {
            if ("function" != typeof t)
                throw new Error("Listener is not a function");
            return n.listeners = [].concat(n.listeners, [t]),
            function() {
                return n.listeners = n.listeners.filter(function(n) {
                    return n !== t
                })
            }
        }
        ,
        this.state = t
    }
      , cn = function(t, n) {
        var e = {
            __c: n = "__cC" + m++,
            __: null,
            Consumer: function(t, n) {
                return t.children(n)
            },
            Provider: function(t) {
                var e, r;
                return this.getChildContext || (e = [],
                (r = {})[n] = this,
                this.getChildContext = function() {
                    return r
                }
                ,
                this.shouldComponentUpdate = function(t) {
                    this.props.value !== t.value && e.some(E)
                }
                ,
                this.sub = function(t) {
                    e.push(t);
                    var n = t.componentWillUnmount;
                    t.componentWillUnmount = function() {
                        e.splice(e.indexOf(t), 1),
                        n && n.call(t)
                    }
                }
                ),
                t.children
            }
        };
        return e.Provider.__ = e.Consumer.contextType = e
    }()
      , fn = /*#__PURE__*/
    function() {
        function n() {
            Object.assign(this, n.defaultConfig())
        }
        var e = n.prototype;
        return e.assign = function(t) {
            return Object.assign(this, t)
        }
        ,
        e.update = function(t) {
            return t ? (this.assign(n.fromPartialConfig(r({}, this, t))),
            this) : this
        }
        ,
        n.defaultConfig = function() {
            return {
                store: new ln({
                    status: l.Init,
                    header: void 0,
                    data: null
                }),
                plugin: new Vt,
                tableRef: {
                    current: null
                },
                width: "100%",
                height: "auto",
                autoWidth: !0,
                style: {},
                className: {}
            }
        }
        ,
        n.fromPartialConfig = function(e) {
            var r = (new n).assign(e);
            return "boolean" == typeof e.sort && e.sort && r.assign({
                sort: {
                    multiColumn: !0
                }
            }),
            r.assign({
                header: Gt.createFromConfig(r)
            }),
            r.assign({
                storage: Jt.createFromConfig(r)
            }),
            r.assign({
                pipeline: an.createFromConfig(r)
            }),
            r.assign({
                translator: new It(r.language)
            }),
            r.search && r.plugin.add({
                id: "search",
                position: t.PluginPosition.Header,
                component: Dt
            }),
            r.pagination && r.plugin.add({
                id: "pagination",
                position: t.PluginPosition.Footer,
                component: Rt
            }),
            r.plugins && r.plugins.forEach(function(t) {
                return r.plugin.add(t)
            }),
            r
        }
        ,
        n
    }();
    function pn(t) {
        var n, e = Et();
        return x("td", r({
            role: t.role,
            colSpan: t.colSpan,
            "data-column-id": t.column && t.column.id,
            className: et(nt("td"), t.className, e.className.td),
            style: r({}, t.style, e.style.td),
            onClick: function(n) {
                t.messageCell || e.eventEmitter.emit("cellClick", n, t.cell, t.column, t.row)
            }
        }, (n = t.column) ? "function" == typeof n.attributes ? n.attributes(t.cell.data, t.row, t.column) : n.attributes : {}), t.column && "function" == typeof t.column.formatter ? t.column.formatter(t.cell.data, t.row, t.column) : t.column && t.column.plugin ? x($t, {
            pluginId: t.column.id,
            props: {
                column: t.column,
                cell: t.cell,
                row: t.row
            }
        }) : t.cell.data)
    }
    function dn(t) {
        var n = Et()
          , e = jt(function(t) {
            return t.header
        });
        return x("tr", {
            className: et(nt("tr"), n.className.tr),
            onClick: function(e) {
                t.messageRow || n.eventEmitter.emit("rowClick", e, t.row)
            }
        }, t.children ? t.children : t.row.cells.map(function(n, r) {
            var o = function(t) {
                if (e) {
                    var n = Gt.leafColumns(e.columns);
                    if (n)
                        return n[t]
                }
                return null
            }(r);
            return o && o.hidden ? null : x(pn, {
                key: n.id,
                cell: n,
                row: t.row,
                column: o
            })
        }))
    }
    function hn(t) {
        return x(dn, {
            messageRow: !0
        }, x(pn, {
            role: "alert",
            colSpan: t.colSpan,
            messageCell: !0,
            cell: new X(t.message),
            className: et(nt("message"), t.className ? t.className : null)
        }))
    }
    function _n() {
        var t = Et()
          , n = jt(function(t) {
            return t.data
        })
          , e = jt(function(t) {
            return t.status
        })
          , r = jt(function(t) {
            return t.header
        })
          , o = Lt()
          , i = function() {
            return r ? r.visibleColumns.length : 0
        };
        return x("tbody", {
            className: et(nt("tbody"), t.className.tbody)
        }, n && n.rows.map(function(t) {
            return x(dn, {
                key: t.id,
                row: t
            })
        }), e === l.Loading && (!n || 0 === n.length) && x(hn, {
            message: o("loading"),
            colSpan: i(),
            className: et(nt("loading"), t.className.loading)
        }), e === l.Rendered && n && 0 === n.length && x(hn, {
            message: o("noRecordsFound"),
            colSpan: i(),
            className: et(nt("notfound"), t.className.notfound)
        }), e === l.Error && x(hn, {
            message: o("error"),
            colSpan: i(),
            className: et(nt("error"), t.className.error)
        }))
    }
    var mn = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        o(n, t);
        var r = n.prototype;
        return r.validateProps = function() {
            for (var t, n = a(this.props.columns); !(t = n()).done; ) {
                var e = t.value;
                void 0 === e.direction && (e.direction = 1),
                1 !== e.direction && -1 !== e.direction && zt.error("Invalid sort direction " + e.direction)
            }
        }
        ,
        r.compare = function(t, n) {
            return t > n ? 1 : t < n ? -1 : 0
        }
        ,
        r.compareWrapper = function(t, n) {
            for (var e, r = 0, o = a(this.props.columns); !(e = o()).done; ) {
                var i = e.value;
                if (0 !== r)
                    break;
                var u = t.cells[i.index].data
                  , s = n.cells[i.index].data;
                r |= "function" == typeof i.compare ? i.compare(u, s) * i.direction : this.compare(u, s) * i.direction
            }
            return r
        }
        ,
        r._process = function(t) {
            var n = [].concat(t.rows);
            n.sort(this.compareWrapper.bind(this));
            var e = new J(n);
            return e.length = t.length,
            e
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.Sort
            }
        }]),
        n
    }(Y)
      , vn = function(t, n, e, o) {
        return function(i) {
            var u = i.sort ? [].concat(i.sort.columns) : []
              , s = u.length
              , a = u.find(function(n) {
                return n.index === t
            })
              , l = !1
              , c = !1
              , f = !1
              , p = !1;
            if (void 0 !== a ? e ? -1 === a.direction ? f = !0 : p = !0 : 1 === s ? p = !0 : s > 1 && (c = !0,
            l = !0) : 0 === s ? l = !0 : s > 0 && !e ? (l = !0,
            c = !0) : s > 0 && e && (l = !0),
            c && (u = []),
            l)
                u.push({
                    index: t,
                    direction: n,
                    compare: o
                });
            else if (p) {
                var d = u.indexOf(a);
                u[d].direction = n
            } else if (f) {
                var h = u.indexOf(a);
                u.splice(h, 1)
            }
            return r({}, i, {
                sort: {
                    columns: u
                }
            })
        }
    }
      , gn = function(t, n, e) {
        return function(o) {
            var i = (o.sort ? [].concat(o.sort.columns) : []).find(function(n) {
                return n.index === t
            });
            return r({}, o, i ? vn(t, 1 === i.direction ? -1 : 1, n, e)(o) : vn(t, 1, n, e)(o))
        }
    }
      , yn = /*#__PURE__*/
    function(t) {
        function n() {
            return t.apply(this, arguments) || this
        }
        return o(n, t),
        n.prototype._process = function(t) {
            var n = {};
            return this.props.url && (n.url = this.props.url(t.url, this.props.columns)),
            this.props.body && (n.body = this.props.body(t.body, this.props.columns)),
            r({}, t, n)
        }
        ,
        e(n, [{
            key: "type",
            get: function() {
                return K.ServerSort
            }
        }]),
        n
    }(Y);
    function bn(t) {
        var n = Et()
          , e = Lt()
          , o = vt(0)
          , i = o[0]
          , u = o[1]
          , s = vt(void 0)
          , a = s[0]
          , l = s[1]
          , c = jt(function(t) {
            return t.sort
        })
          , f = Ht().dispatch
          , p = n.sort;
        gt(function() {
            var t = d();
            t && l(t)
        }, []),
        gt(function() {
            return n.pipeline.register(a),
            function() {
                return n.pipeline.unregister(a)
            }
        }, [n, a]),
        gt(function() {
            if (c) {
                var n = c.columns.find(function(n) {
                    return n.index === t.index
                });
                u(n ? n.direction : 0)
            }
        }, [c]),
        gt(function() {
            a && c && a.setProps({
                columns: c.columns
            })
        }, [c]);
        var d = function() {
            var t = K.Sort;
            return p && "object" == typeof p.server && (t = K.ServerSort),
            0 === n.pipeline.getStepsByType(t).length ? t === K.ServerSort ? new yn(r({
                columns: c ? c.columns : []
            }, p.server)) : new mn({
                columns: c ? c.columns : []
            }) : null
        };
        return x("button", {
            tabIndex: -1,
            "aria-label": e("sort.sort" + (1 === i ? "Desc" : "Asc")),
            title: e("sort.sort" + (1 === i ? "Desc" : "Asc")),
            className: et(nt("sort"), nt("sort", function(t) {
                return 1 === t ? "asc" : -1 === t ? "desc" : "neutral"
            }(i)), n.className.sort),
            onClick: function(n) {
                n.preventDefault(),
                n.stopPropagation(),
                f(gn(t.index, !0 === n.shiftKey && p.multiColumn, t.compare))
            }
        })
    }
    function wn(t) {
        var n, e = function(t) {
            return t instanceof MouseEvent ? Math.floor(t.pageX) : Math.floor(t.changedTouches[0].pageX)
        }, r = function(r) {
            r.stopPropagation();
            var u, s, a, l, c, f = parseInt(t.thRef.current.style.width, 10) - e(r);
            u = function(t) {
                return o(t, f)
            }
            ,
            void 0 === (s = 10) && (s = 100),
            n = function() {
                var t = [].slice.call(arguments);
                a ? (clearTimeout(l),
                l = setTimeout(function() {
                    Date.now() - c >= s && (u.apply(void 0, t),
                    c = Date.now())
                }, Math.max(s - (Date.now() - c), 0))) : (u.apply(void 0, t),
                c = Date.now(),
                a = !0)
            }
            ,
            document.addEventListener("mouseup", i),
            document.addEventListener("touchend", i),
            document.addEventListener("mousemove", n),
            document.addEventListener("touchmove", n)
        }, o = function(n, r) {
            n.stopPropagation();
            var o = t.thRef.current;
            r + e(n) >= parseInt(o.style.minWidth, 10) && (o.style.width = r + e(n) + "px")
        }, i = function t(e) {
            e.stopPropagation(),
            document.removeEventListener("mouseup", t),
            document.removeEventListener("mousemove", n),
            document.removeEventListener("touchmove", n),
            document.removeEventListener("touchend", t)
        };
        return x("div", {
            className: et(nt("th"), nt("resizable")),
            onMouseDown: r,
            onTouchStart: r,
            onClick: function(t) {
                return t.stopPropagation()
            }
        })
    }
    function xn(t) {
        var n = Et()
          , e = yt(null)
          , o = vt({})
          , i = o[0]
          , u = o[1]
          , s = Ht().dispatch;
        gt(function() {
            if (n.fixedHeader && e.current) {
                var t = e.current.offsetTop;
                "number" == typeof t && u({
                    top: t
                })
            }
        }, [e]);
        var a, l = function() {
            return null != t.column.sort
        }, c = function(e) {
            e.stopPropagation(),
            l() && s(gn(t.index, !0 === e.shiftKey && n.sort.multiColumn, t.column.sort.compare))
        };
        return x("th", r({
            ref: e,
            "data-column-id": t.column && t.column.id,
            className: et(nt("th"), l() ? nt("th", "sort") : null, n.fixedHeader ? nt("th", "fixed") : null, n.className.th),
            onClick: c,
            style: r({}, n.style.th, {
                minWidth: t.column.minWidth,
                width: t.column.width
            }, i, t.style),
            onKeyDown: function(t) {
                l() && 13 === t.which && c(t)
            },
            rowSpan: t.rowSpan > 1 ? t.rowSpan : void 0,
            colSpan: t.colSpan > 1 ? t.colSpan : void 0
        }, (a = t.column) ? "function" == typeof a.attributes ? a.attributes(null, null, t.column) : a.attributes : {}, l() ? {
            tabIndex: 0
        } : {}), x("div", {
            className: nt("th", "content")
        }, void 0 !== t.column.name ? t.column.name : void 0 !== t.column.plugin ? x($t, {
            pluginId: t.column.plugin.id,
            props: {
                column: t.column
            }
        }) : null), l() && x(bn, r({
            index: t.index
        }, t.column.sort)), t.column.resizable && t.index < n.header.visibleColumns.length - 1 && x(wn, {
            column: t.column,
            thRef: e
        }))
    }
    function kn() {
        var t, n = Et(), e = jt(function(t) {
            return t.header
        });
        return e ? x("thead", {
            key: e.id,
            className: et(nt("thead"), n.className.thead)
        }, (t = Gt.tabularFormat(e.columns)).map(function(n, r) {
            return function(t, n, r) {
                var o = Gt.leafColumns(e.columns);
                return x(dn, null, t.map(function(t) {
                    return t.hidden ? null : function(t, n, e, r) {
                        var o = function(t, n, e) {
                            var r = Gt.maximumDepth(t)
                              , o = e - n;
                            return {
                                rowSpan: Math.floor(o - r - r / o),
                                colSpan: t.columns && t.columns.length || 1
                            }
                        }(t, n, r);
                        return x(xn, {
                            column: t,
                            index: e,
                            colSpan: o.colSpan,
                            rowSpan: o.rowSpan
                        })
                    }(t, n, o.indexOf(t), r)
                }))
            }(n, r, t.length)
        })) : null
    }
    var Sn = function(t) {
        return function(n) {
            return r({}, n, {
                header: t
            })
        }
    };
    function Nn() {
        var t = Et()
          , n = yt(null)
          , e = Ht().dispatch;
        return gt(function() {
            n && e(function(t) {
                return function(n) {
                    return r({}, n, {
                        tableRef: t
                    })
                }
            }(n))
        }, [n]),
        x("table", {
            ref: n,
            role: "grid",
            className: et(nt("table"), t.className.table),
            style: r({}, t.style.table, {
                height: t.height
            })
        }, x(kn, null), x(_n, null))
    }
    function Pn() {
        var n = vt(!0)
          , e = n[0]
          , o = n[1]
          , i = yt(null)
          , u = Et();
        return gt(function() {
            0 === i.current.children.length && o(!1)
        }, [i]),
        e ? x("div", {
            ref: i,
            className: et(nt("head"), u.className.header),
            style: r({}, u.style.header)
        }, x($t, {
            position: t.PluginPosition.Header
        })) : null
    }
    function Cn() {
        var n = yt(null)
          , e = vt(!0)
          , o = e[0]
          , i = e[1]
          , u = Et();
        return gt(function() {
            0 === n.current.children.length && i(!1)
        }, [n]),
        o ? x("div", {
            ref: n,
            className: et(nt("footer"), u.className.footer),
            style: r({}, u.style.footer)
        }, x($t, {
            position: t.PluginPosition.Footer
        })) : null
    }
    function En() {
        var t = Et()
          , n = Ht().dispatch
          , e = jt(function(t) {
            return t.status
        })
          , o = jt(function(t) {
            return t.data
        })
          , i = jt(function(t) {
            return t.tableRef
        })
          , u = {
            current: null
        };
        gt(function() {
            return n(Sn(t.header)),
            s(),
            t.pipeline.on("updated", s),
            function() {
                return t.pipeline.off("updated", s)
            }
        }, []),
        gt(function() {
            t.header && e === l.Loaded && null != o && o.length && n(Sn(t.header.adjustWidth(t, i, u)))
        }, [o, t, u]);
        var s = function() {
            try {
                n(function(t) {
                    return r({}, t, {
                        status: l.Loading
                    })
                });
                var e = function(e, o) {
                    try {
                        var i = Promise.resolve(t.pipeline.process()).then(function(t) {
                            n(function(t) {
                                return function(n) {
                                    return t ? r({}, n, {
                                        data: t,
                                        status: l.Loaded
                                    }) : n
                                }
                            }(t)),
                            setTimeout(function() {
                                n(function(t) {
                                    return t.status === l.Loaded ? r({}, t, {
                                        status: l.Rendered
                                    }) : t
                                })
                            }, 0)
                        })
                    } catch (t) {
                        return o(t)
                    }
                    return i && i.then ? i.then(void 0, o) : i
                }(0, function(t) {
                    zt.error(t),
                    n(function(t) {
                        return r({}, t, {
                            data: null,
                            status: l.Error
                        })
                    })
                });
                return Promise.resolve(e && e.then ? e.then(function() {}) : void 0)
            } catch (t) {
                return Promise.reject(t)
            }
        };
        return x("div", {
            role: "complementary",
            className: et("gridjs", nt("container"), e === l.Loading ? nt("loading") : null, t.className.container),
            style: r({}, t.style.container, {
                width: t.width
            })
        }, e === l.Loading && x("div", {
            className: nt("loading-bar")
        }), x(Pn, null), x("div", {
            className: nt("wrapper"),
            style: {
                height: t.height
            }
        }, x(Nn, null)), x(Cn, null), x("div", {
            ref: u,
            id: "gridjs-temp",
            className: nt("temp")
        }))
    }
    var Tn = /*#__PURE__*/
    function(t) {
        function n(n) {
            var e;
            return (e = t.call(this) || this).config = void 0,
            e.plugin = void 0,
            e.config = (new fn).assign({
                instance: u(e),
                eventEmitter: u(e)
            }).update(n),
            e.plugin = e.config.plugin,
            e
        }
        o(n, t);
        var e = n.prototype;
        return e.updateConfig = function(t) {
            return this.config.update(t),
            this
        }
        ,
        e.createElement = function() {
            return x(cn.Provider, {
                value: this.config,
                children: x(En, {})
            })
        }
        ,
        e.forceRender = function() {
            return this.config && this.config.container || zt.error("Container is empty. Make sure you call render() before forceRender()", !0),
            this.destroy(),
            q(this.createElement(), this.config.container),
            this
        }
        ,
        e.destroy = function() {
            this.config.pipeline.clearCache(),
            q(null, this.config.container)
        }
        ,
        e.render = function(t) {
            return t || zt.error("Container element cannot be null", !0),
            t.childNodes.length > 0 ? (zt.error("The container element " + t + " is not empty. Make sure the container is empty and call render() again"),
            this) : (this.config.container = t,
            q(this.createElement(), t),
            this)
        }
        ,
        n
    }(Q);
    t.Cell = X,
    t.Component = N,
    t.Config = fn,
    t.Grid = Tn,
    t.Row = Z,
    t.className = nt,
    t.createElement = x,
    t.createRef = function() {
        return {
            current: null
        }
    }
    ,
    t.h = x,
    t.html = G,
    t.useConfig = Et,
    t.useEffect = gt,
    t.useRef = yt,
    t.useSelector = jt,
    t.useState = vt,
    t.useStore = Ht,
    t.useTranslator = Lt
});
//# sourceMappingURL=gridjs.umd.js.map
