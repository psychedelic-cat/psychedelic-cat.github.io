"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Skew
 */
function mdSkew(t, n) {
  function i(t) {
    return t && "undefined" != typeof window && (t === window || t.nodeType);
  }

  function o(t) {
    if (arguments.length <= 0) throw new Error("Missing arguments in _extend function");
    var n,
        e,
        s = t || {};

    for (e = 1; e < arguments.length; e++) {
      var r = arguments[e] || {};

      for (n in r) {
        "object" != _typeof(s[n]) || i(s[n]) ? s[n] = s[n] || r[n] : s[n] = o(s[n], r[n]);
      }
    }

    return s;
  }

  this.elem = t, this.options = o(n, mdSkew.options), this.options.min > 0 && (this.options.min = -1 * Math.abs(this.options.min)), this.options.max > 0 && (this.options.max = -1 * Math.abs(this.options.max));
}

mdSkew.prototype = {
  constructor: mdSkew,
  init: function init() {
    return this._start(), this._setCSS(), this._scroll(), this;
  },
  _start: function _start() {
    this.elem.style.transform = "skewY(" + this.options.min + "deg)";
  },
  _setCSS: function _setCSS() {
    this.options.setCSS && (this.elem.style.transition = this.options.transition, this.elem.style.transformOrigin = this.options.transformOrigin);
  },
  _scroll: function _scroll() {
    function t() {
      var t = !1;
      return p = {
        top: h.elem.offsetTop,
        bottom: h.elem.offsetTop + h.elem.clientHeight,
        height: h.elem.clientHeight
      }, c.bottom < p.top || c.top > p.bottom || (t = !0), t;
    }

    function n() {
      c = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + window.innerHeight
      };
    }

    function i(t) {
      r = !0, m = t.deltaY, m > 0 && (m = -1 * Math.abs(m)), n();
    }

    function o(t) {
      r = !0, m = f.y - t.touches[0].clientY, m > 0 && (m = -1 * Math.abs(m)), n();
    }

    function e(t) {
      f.y = t.touches[0].clientY;
    }

    function s() {
      requestAnimationFrame(s), r && t() ? (r = !1, a = m * h.options.speed, a > 0 ? a = 0 : a < h.options.max ? a = h.options.max : a > h.options.min && (a = h.options.min), h.elem.style.transform = "skewY(" + a + "deg)") : h._start();
    }

    var r = !1,
        m = 0,
        a = 0,
        h = this,
        f = {
      y: 0
    },
        c = {},
        p = {};
    window.addEventListener("wheel", i, !1), window.addEventListener("touchmove", o, !1), window.addEventListener("touchstart", e, !1), s();
  }
}, mdSkew.options = {
  min: 0,
  max: 5,
  speed: 1,
  setCSS: !0,
  transition: "transform .6s cubic-bezier(.215,.61,.355,1)",
  transformOrigin: "50% 50%"
}, function (t) {
  t && (t.fn.mdSkew = function (t) {
    return void 0 === t && (t = {}), this.each(function () {
      new mdSkew(this, t).init();
    });
  });
}(window.jQuery);