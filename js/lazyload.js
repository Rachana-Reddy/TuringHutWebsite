var _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    },
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
! function(e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t()
}(this, function() {
    "use strict";
    var r = "data-",
        u = function(e, t) {
            return e.getAttribute(r + t)
        },
        n = function(e, t, n) {
            return e.setAttribute(r + t, n)
        };

    function s(e) {
        return e.filter(function(e) {
            return !u(e, "was-processed")
        })
    }
    var o = function(e, t) {
        var n, r = "LazyLoad::Initialized",
            s = new e(t);
        try {
            n = new CustomEvent(r, {
                detail: {
                    instance: s
                }
            })
        } catch (e) {
            (n = document.createEvent("CustomEvent")).initCustomEvent(r, !1, !1, {
                instance: s
            })
        }
        window.dispatchEvent(n)
    };
    var d = function(e, t, n) {
            for (var r, s = 0; r = e.children[s]; s += 1)
                if ("SOURCE" === r.tagName) {
                    var o = u(r, n);
                    o && r.setAttribute(t, o)
                }
        },
        f = function(e, t, n) {
            n && e.setAttribute(t, n)
        },
        a = function(e, t) {
            var n = t.data_sizes,
                r = t.data_srcset,
                s = t.data_src,
                o = u(e, s),
                a = e.tagName;
            if ("IMG" === a) {
                var i = e.parentNode;
                i && "PICTURE" === i.tagName && d(i, "srcset", r);
                var c = u(e, n);
                f(e, "sizes", c);
                var l = u(e, r);
                return f(e, "srcset", l), void f(e, "src", o)
            }
            if ("IFRAME" !== a) return "VIDEO" === a ? (d(e, "src", s), void f(e, "src", o)) : void(o && (e.style.backgroundImage = 'url("' + o + '")'));
            f(e, "src", o)
        },
        e = "undefined" != typeof window,
        i = e && "IntersectionObserver" in window,
        c = e && "classList" in document.createElement("p"),
        l = function(e, t) {
            c ? e.classList.add(t) : e.className += (e.className ? " " : "") + t
        },
        v = function(e, t) {
            e && e(t)
        },
        _ = "load",
        m = "error",
        b = function(e, t, n) {
            e.removeEventListener(_, t), e.removeEventListener(m, n)
        },
        h = function(n, r) {
            var s = function e(t) {
                    p(t, !0, r), b(n, e, o)
                },
                o = function e(t) {
                    p(t, !1, r), b(n, s, e)
                };
            n.addEventListener(_, s), n.addEventListener(m, o)
        },
        p = function(e, t, n) {
            var r, s, o = e.target;
            r = o, s = n.class_loading, c ? r.classList.remove(s) : r.className = r.className.replace(new RegExp("(^|\\s+)" + s + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, ""), l(o, t ? n.class_loaded : n.class_error), v(t ? n.callback_load : n.callback_error, o)
        };

    function y(e, t) {
        v(t.callback_enter, e), -1 < ["IMG", "IFRAME", "VIDEO"].indexOf(e.tagName) && (h(e, t), l(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), v(t.callback_set, e)
    }
    var t = function(e, t) {
        var n;
        this._settings = (n = {
            elements_selector: "img",
            container: document,
            threshold: 300,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_enter: null
        }, _extends({}, n, e)), this._setObserver(), this.update(t)
    };
    t.prototype = {
        _setObserver: function() {
            var r = this;
            if (i) {
                var e = this._settings,
                    t = {
                        root: e.container === document ? null : e.container,
                        rootMargin: e.threshold + "px"
                    };
                this._observer = new IntersectionObserver(function(e) {
                    e.forEach(function(e) {
                        if ((n = e).isIntersecting || 0 < n.intersectionRatio) {
                            var t = e.target;
                            y(t, r._settings), r._observer.unobserve(t)
                        }
                        var n
                    }), r._elements = s(r._elements)
                }, t)
            }
        },
        loadAll: function() {
            var t = this._settings;
            this._elements.forEach(function(e) {
                y(e, t)
            }), this._elements = s(this._elements)
        },
        update: function(e) {
            var t = this,
                n = this._settings,
                r = e || n.container.querySelectorAll(n.elements_selector);
            this._elements = s(Array.prototype.slice.call(r)), this._observer ? this._elements.forEach(function(e) {
                t._observer.observe(e)
            }) : this.loadAll()
        },
        destroy: function() {
            var t = this;
            this._observer && (s(this._elements).forEach(function(e) {
                t._observer.unobserve(e)
            }), this._observer = null), this._elements = null, this._settings = null
        }
    };
    var g = window.lazyLoadOptions;
    return e && g && function(e, t) {
        if (t.length)
            for (var n, r = 0; n = t[r]; r += 1) o(e, n);
        else o(e, t)
    }(t, g), t
});
