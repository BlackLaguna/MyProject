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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/index.js":
/*!*******************************!*\
  !*** ./resources/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  var block = $('#general_content');
  var id_category = 'all';
  $('.category_off').each(function () {
    $(this).on('click', function () {
      id_category = this.dataset.id;
      $.ajax({
        url: 'http://localhost/MyProject/public/index/' + this.dataset.id,
        type: "GET",
        data: {
          'id': this.dataset.id
        },
        cache: false,
        dataType: 'html',
        success: function success(response) {
          refresh(response);
          disableHref();
          var loc = window.location.href;
          history.pushState(loc, '', 'http://localhost/MyProject/public/index/' + id_category);
        }
      });
    });
  });

  function disableHref() {
    $('.page-link').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $.ajax({
          url: href,
          type: "GET",
          cache: false,
          data: {
            'id_category': id_category
          },
          dataType: 'html',
          success: function success(response) {
            refresh(response);
            var loc = window.location.href;
            history.pushState(loc, '', href);
            disableHref();
          }
        });
      });
    });
  }

  disableHref();

  window.onpopstate = function () {
    var str = document.location.toString();
    str = str.indexOf('index');

    if (str !== -1) {
      $.ajax({
        url: document.location,
        type: "GET",
        data: {
          'flag': 1
        },
        cache: false,
        dataType: 'html',
        success: function success(response) {
          refresh(response);
          disableHref();
        }
      });
    } else {
      $.ajax({
        url: document.location,
        type: "GET",
        data: {
          'flag': 1
        },
        cache: false,
        dataType: 'html',
        success: function success(response) {
          $('body').children().remove().end();
          $('body').append(response);
          disableHref();
        }
      });
    }

    chek();
  };

  function refresh(resopnse) {
    $('#general_content').children().remove().end();
    $('#general_content').append(resopnse);
    $('#general_content').fadeOut(1);
    setTimeout(function () {
      $('#general_content').fadeIn(250);
    }, 5);
  }

  $('.category_off').each(function () {
    $(this).on('click', function () {
      $('.check').removeClass('check').addClass('category_off');
      $(this).removeClass('category_off');
      $(this).addClass('check');
    });
  });

  function chek() {
    $('.check').removeClass('check').addClass('category_off');
    $('.category_off').each(function () {
      var str = document.location.toString();
      var regexp = new RegExp("index/(" + this.dataset.id + ')' + '$');
      str = str.search(regexp);

      if (str !== -1) {
        $(this).removeClass('category_off');
        $(this).addClass('check');
      }
    });
  }

  chek();
});

/***/ }),

/***/ 7:
/*!*************************************!*\
  !*** multi ./resources/js/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\MyProject\resources\js\index.js */"./resources/js/index.js");


/***/ })

/******/ });