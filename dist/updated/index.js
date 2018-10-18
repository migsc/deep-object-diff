(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "../utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("../utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.utils);
    global.index = mod.exports;
  }
})(this, function (module, exports, _utils) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _strikethrough = function _strikethrough(text) {
    return (text.split("").join("\u0336") + "\u0336").trim();
  };
  var _toString = function _toString(o) {
    try {
      return (0, _utils.isDate)(o) ? o.toISOString() : o.toString();
    } catch (e) {
      return o + "";
    }
  };

  var updatedDiff = function updatedDiff(lhs, rhs) {
    if (lhs === rhs) return {};

    if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) {
      var lhsFormatted = _strikethrough(_toString(lhs));
      var rhsFormatted = _toString(rhs);
      return lhsFormatted + "=>" + rhsFormatted;
    }

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    if ((0, _utils.isDate)(l) || (0, _utils.isDate)(r)) {
      if (l.valueOf() == r.valueOf()) return {};
      var _lhsFormatted = _strikethrough(_toString(l));
      var _rhsFormatted = _toString(r);
      return _lhsFormatted + "=>" + _rhsFormatted;
    }

    return Object.keys(r).reduce(function (acc, key) {
      if (l.hasOwnProperty(key)) {
        var difference = updatedDiff(l[key], r[key]);

        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference) && !(0, _utils.isDate)(difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, difference));
      }

      return acc;
    }, {});
  };

  exports.default = updatedDiff;
  module.exports = exports["default"];
});