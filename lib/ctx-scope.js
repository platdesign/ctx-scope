(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ctx-scope", [], factory);
	else if(typeof exports === 'object')
		exports["ctx-scope"] = factory();
	else
		root["ctx-scope"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EXP = /(\{([0-9A-Za-z\.\[\]^\}]*)\})/;

function getImpl(object, property) {
	var elems = Array.isArray(property) ? property : property.split('.'),
	    name = elems[0],
	    value = object[name];

	if (elems.length <= 1) {
		return value;
	}
	// Note that typeof null === 'object'
	if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
		return undefined;
	}
	return getImpl(value, elems.slice(1));
};

module.exports = function () {
	function CtxScope() {
		_classCallCheck(this, CtxScope);
	}

	_createClass(CtxScope, null, [{
		key: 'match',
		value: function match(def, current, ctx) {
			ctx = ctx || {};
			// let last = def.length - 1;

			def = def.map(function (item) {

				var replaced = item;
				var match = void 0;

				while ((match = replaced.match(EXP)) !== null) {
					replaced = replaced.replace(match[1], getImpl(ctx, match[2]));
				}

				return replaced;
			});

			var somes = def.filter(function (item) {
				return !['+', '-'].includes(item.substr(0, 1));
			});
			var everys = def.filter(function (item) {
				return item.substr(0, 1) === '+';
			}).map(function (item) {
				return item.substr(1);
			});
			var nones = def.filter(function (item) {
				return item.substr(0, 1) === '-';
			}).map(function (item) {
				return item.substr(1);
			});

			var somesRes = somes.length ? somes.some(function (item, index) {
				return current.includes(item);
			}) : true;

			var everyRes = everys.length ? everys.every(function (item) {
				return current.includes(item);
			}) : true;
			var nonesRes = nones.length ? nones.every(function (item) {
				return !current.includes(item);
			}) : true;

			var res = [everyRes, nonesRes, somesRes].every(Boolean);

			if (res !== true) {
				throw new Error();
			}

			return true;
		}
	}]);

	return CtxScope;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=ctx-scope.js.map