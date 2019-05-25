/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/scripts.js":
/*!*********************************!*\
  !*** ./resources/js/scripts.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var go_to_login = document.getElementById("go_to_login");
var logo = document.getElementById("inhead");
var category = document.getElementsByClassName("category_off");
var reg_panel = document.getElementById("reg_panel");
var login_panel = document.getElementById("login_panel");
var div_reg = document.getElementById("div_reg");
var div_log = document.getElementById("div_log");
var basket = document.getElementById("busket");
logo.onclick = screen_for_login;

function screen_for_login() {
  var to_open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (go_to_login.classList.contains("active_menu")) {
    go_to_login.classList.remove("active_menu");
  } else if (to_open) {
    go_to_login.classList.add("active_menu");
  }
}

function has_parent_element(element, needle) {
  if (element === needle) return true;

  while ((element = element.parentElement) !== needle) {
    if (element === document.body) return false;
  }

  return true;
}

document.onmousedown = function (event) {
  if (!has_parent_element(event.target, go_to_login) && event.target != logo) screen_for_login(false);
};

console.log(category[2]);

reg_panel.onclick = function () {
  login_panel.classList.remove('left_log_off');
  login_panel.classList.add('left_log_on');
  reg_panel.classList.remove('right_log_on');
  reg_panel.classList.add('right_log_off');
  div_log.style.left = -370 + 'px';
  div_reg.style.right = 0 + 'px';
};

login_panel.onclick = function () {
  reg_panel.classList.remove('right_log_off');
  reg_panel.classList.add('right_log_on');
  login_panel.classList.remove('left_log_on');
  login_panel.classList.add('left_log_off');
  div_reg.style.right = -370 + 'px';
  div_log.style.left = 0 + 'px';
};

$(document).ready(function () {
  (function ($) {
    $(function () {
      $('.menu__icon').on('click', function () {
        $(this).closest('.menu').toggleClass('menu_state_open');
      });
      $('.menu__links-item').on('click', function () {
        // do something
        $(this).closest('.menu').removeClass('menu_state_open');
      });
    });
  })(jQuery);
});

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./resources/js/scripts.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\MyProject\resources\js\scripts.js */"./resources/js/scripts.js");


/***/ })

/******/ });