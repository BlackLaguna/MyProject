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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/add_products.js":
/*!**************************************!*\
  !*** ./resources/js/add_products.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var new_item = document.getElementById("new_item");
  var close = document.getElementById("close");
  var input = document.getElementById("input");
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  new_item.onclick = function (event) {
    if (event.target !== close) {
      new_item.style.height = 51 + "%";
      input.style.transitionDelay = "0.25";
      document.getElementById('visible_new_item').style.display = 'block';
    }
  };

  close.onclick = function () {
    new_item.style.height = 15 + "%";
    input.style.transitionDelay = "0";
    document.getElementById('visible_new_item').style.display = 'none';
  };

  var myData = {};
  var token = $('meta[name=csrf-token]').attr('content');
  var file;
  var files;
  var i = 0;
  $('#image').change(function () {
    file = this.files;
  });
  myData = new FormData();
  $('#image_multi').change(function () {
    files = [];
    var TotalImages = $('#image_multi')[0].files.length;
    var images = $('#image_multi')[0];

    for (var _i = 0; _i < TotalImages; _i++) {
      files = images.files[_i];
      myData.append('images[]', images.files[_i]);
    }

    myData.append('TotalImages', TotalImages);
  });

  function check_categorys() {
    var all_categorys = $('input[name*="all_categorys"]');
    var i = 0;
    all_categorys.each(function () {
      if (this.checked) {
        myData.append('old_categorys[]', this.value);
        i++;
      }
    });
    myData.append('TotalCategorys', i);
  }

  $("#add_product").click(function () {
    var file = $('#image')[0].files[0];
    myData.append('category', $('#product_category').val());
    myData.append('Price', $('#product_price').val());
    myData.append('DESCRIPTION', $('#product_description').val());
    myData.append('product_name', $('#product_name').val());
    myData.append('_token', token);
    myData.append('file', file);
    check_categorys();
    sendAjaxForm('add_product');
    return false;
  });

  function sendAjaxForm(url) {
    $.ajax({
      url: url,
      type: "POST",
      data: myData,
      processData: false,
      contentType: false,
      success: function success() {
        alert("+");
        myData["delete"]('old_categorys[]');
        myData["delete"]('images[]');
        $('#input').trigger("reset");
      },
      error: function error(response) {
        $('#result_form').html('Error. Data not send.');
      }
    });
  }

  $('#edit_product').click(function (event) {
    if (event.target !== $('div#close_edit_product')[0]) {
      $('#edit_product').css('height', '85%');
      $('#edit_product').css('overflow', 'scroll');
      $('.edit_product_product_div').css('display', 'block');
      $('#visible_edit_item').css('display', 'block');
    }
  });
  $('#close_edit_product').click(function () {
    $('#edit_product').css('height', '15%');
    $('#visible_edit_item').css('display', 'none');
    $('#edit_product').css('overflow', 'hidden');
  });
  var edit_data = new FormData();
  $(".edit_button").each(function () {
    var index = this.dataset.id;
    $(this).on("click", function () {
      edit_data.append('id', this.dataset.id);
      edit_data.append('price', $('#price_of' + this.dataset.id).val());
      edit_data.append('name', $('#name_of' + this.dataset.id).val());
      edit_data.append('havenow', $("input[name=" + this.dataset.id + "]:checked").val());
      $.ajax({
        url: 'edit_product',
        type: "POST",
        data: edit_data,
        processData: false,
        contentType: false,
        success: function success() {
          alert("+");
        },
        error: function error(response) {
          alert("-");
        }
      });
    });
  });
  $(".delete_button").each(function () {
    var index = this.dataset.id;
    $(this).on("click", function () {
      edit_data.append('id', this.dataset.id);
      $.ajax({
        url: 'delete_product',
        type: "POST",
        data: edit_data,
        processData: false,
        contentType: false,
        success: function success() {
          $("#product" + index).remove().end();
        },
        error: function error(response) {
          alert("-");
        }
      });
    });
  });
  $(".button_status").each(function () {
    var index = this.dataset.id;
    $(this).on("click", function () {
      edit_data.append('id', this.dataset.id);
      $.ajax({
        url: 'transaction_complite',
        type: "POST",
        data: edit_data,
        processData: false,
        contentType: false,
        success: function success() {
          $("#transaction_div" + index).remove().end();
        },
        error: function error(response) {
          alert("-");
        }
      });
    });
  });
});

/***/ }),

/***/ 2:
/*!********************************************!*\
  !*** multi ./resources/js/add_products.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\MyProject\resources\js\add_products.js */"./resources/js/add_products.js");


/***/ })

/******/ });