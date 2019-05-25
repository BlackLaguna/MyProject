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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/busket.js":
/*!********************************!*\
  !*** ./resources/js/busket.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(document).ready(function ($) {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  var token = $('meta[name=csrf-token]').attr('content');
  var cartWrapper = $('.cd-cart-container'); //product id - you don't need a counter in your real project but you can use your real product id

  var productId = 0;

  if (cartWrapper.length > 0) {
    //store jQuery objects
    var cartBody = cartWrapper.find('.body');
    var cartList = cartBody.find('ul').eq(0);
    var cartTotal = cartWrapper.find('.checkout').find('span');
    var cartTrigger = cartWrapper.children('.cd-cart-trigger');
    var cartCount = cartTrigger.children('.count');
    var addToCartBtn = $('.cd-add-to-cart');
    var undo = cartWrapper.find('.undo');
    var undoTimeoutId; //add product to cart

    $(document).on('click', '.cd-add-to-cart', function (event) {
      var addToCartBtn = $('.cd-add-to-cart');
      event.preventDefault();
      addToCart($(this));
    }); //open/close cart

    cartTrigger.on('click', function (event) {
      event.preventDefault();
      toggleCart();
    }); //close cart when clicking on the .cd-cart-container::before (bg layer)

    cartWrapper.on('click', function (event) {
      if ($(event.target).is($(this))) toggleCart(true);
    }); //delete an item from the cart

    cartList.on('click', '.delete-item', function (event) {
      event.preventDefault();
      removeProduct($(event.target).parents('.product'));
    }); //update item quantity

    cartList.on('change', 'select', function (event) {
      quickUpdateCart();
    }); //reinsert item deleted from the cart

    undo.on('click', 'a', function (event) {
      clearInterval(undoTimeoutId);
      event.preventDefault();
      var a = $('.product deleted')[0];
      cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
        quickUpdateCart();
      });
      undo.removeClass('visible');
    });
  }

  function toggleCart(bool) {
    var cartIsOpen = typeof bool === 'undefined' ? cartWrapper.hasClass('cart-open') : bool;

    if (cartIsOpen) {
      cartWrapper.removeClass('cart-open'); //reset undo

      clearInterval(undoTimeoutId);
      undo.removeClass('visible');
      cartList.find('.deleted').remove();
      setTimeout(function () {
        cartBody.scrollTop(0); //check if cart empty to hide it

        if (Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
      }, 500);
    } else {
      cartWrapper.addClass('cart-open');
    }
  }

  function addToCart(trigger) {
    var cartIsEmpty = cartWrapper.hasClass('empty'); //update cart product list

    addProduct(trigger.data('price'), trigger.data('id'), trigger.data('name'), trigger.data('image_path')); //update number of items

    updateCartCount(cartIsEmpty); //update total price

    updateCartTotal(25, true); //show cart

    cartWrapper.removeClass('empty');
  }

  function addProduct_noajax(PRICE, ID, NAME, newTime, select_value, image_path) {
    productId = ID;
    myData = new FormData();
    if (typeof newTime === 'undefined') var newTime = Date.now();
    var productAdded = $('<li class="product" data-time="' + newTime + '" data-id="' + ID + '" data-price="' + PRICE + '" data-name="' + NAME + '"><div class="product-image"><a href="#0">' + '<img src="' + image_path + '" alt="placeholder"></a>' + '</div>' + '<div class="product-details"><h3><' + 'a href="#0">' + NAME + '</a></h3>' + '<span id = "price-' + newTime + ' " class="price">' + (PRICE * select_value).toFixed(2) + '</span>' + '<div class="actions">' + '<a href="#0" class="delete-item">Remove</a>' + '<div class="quantity"><label for="cd-product-' + productId + '">Quantity product:</label>' + '<span class="select"><select id="cd-product-' + newTime + '" name="quantity"><option value="1" selected>1</option>' + '<option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
    cartList.prepend(productAdded);
    $('#cd-product-' + newTime).val(select_value);
    $('#cd-product-' + newTime).change(function () {
      var a = document.getElementById('price-' + newTime + ' ');
      a.innerHTML = (this.value * PRICE).toFixed(2);
      myData.append('_token', token);
      myData.append('id', ID);
      myData.append('time', newTime);
      myData.append('image', image_path);
      myData.append('name', NAME);
      myData.append('price', PRICE);
      myData.append('count', this.value);
      $.ajax({
        url: 'http://localhost/MyProject/public/busket_change',
        // куда отправляем данные
        type: 'POST',
        // метод
        data: myData,
        // данные, которые отправляем (id добавляемого товара)
        processData: false,
        // Не обрабатываем файлы (Don't process the files)
        contentType: false,
        success: function success() {// при получении ответа
        }
      });
    });
  }

  function addProduct(PRICE, ID, NAME, image_path, newTime) {
    //this is just a product placeholder
    //you should insert an item with the selected product info
    //replace productId, productName, price and url with your real product info
    productId = ID;
    myData = new FormData();
    if (typeof newTime === 'undefined') var newTime = Date.now();
    var productAdded = $('<li class="product" data-time="' + newTime + '" data-id="' + ID + '" data-price="' + PRICE + '" data-name="' + NAME + '"><div class="product-image"><a href="#0">' + '<img src="' + image_path + '" alt="placeholder"></a>' + '</div>' + '<div class="product-details"><h3><' + 'a href="#0">' + NAME + '</a></h3>' + '<span id = "price-' + newTime + ' " class="price">' + PRICE + '</span>' + '<div class="actions">' + '<a href="#0" class="delete-item">Remove</a>' + '<div class="quantity"><label for="cd-product-' + productId + '">Quantity product:</label>' + '<span class="select"><select id="cd-product-' + newTime + '" name="quantity"><option value="1">1</option>' + '<option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
    cartList.prepend(productAdded);
    myData.append('_token', token);
    myData.append('id', ID);
    myData.append('time', newTime);
    myData.append('image', image_path);
    myData.append('name', NAME);
    myData.append('price', PRICE);
    var x = 1;
    myData.append('count', x);
    $("#cd-product-" + newTime).change(function () {
      var a = document.getElementById('price-' + newTime + ' ');
      a.innerHTML = (this.value * PRICE).toFixed(2);
      myData.append('_token', token);
      myData.append('id', ID);
      myData.append('time', newTime);
      myData.append('name', NAME);
      myData.append('image', image_path);
      myData.append('price', PRICE);
      myData.append('count', this.value);
      $.ajax({
        url: 'http://localhost/MyProject/public/busket_change',
        // куда отправляем данные
        type: 'POST',
        // метод
        data: myData,
        // данные, которые отправляем (id добавляемого товара)
        processData: false,
        // Не обрабатываем файлы (Don't process the files)
        contentType: false,
        success: function success() {// при получении ответа
        }
      });
    });
    $.ajax({
      url: 'http://localhost/MyProject/public/busket_add',
      // куда отправляем данные
      type: 'POST',
      // метод
      data: myData,
      // данные, которые отправляем (id добавляемого товара)
      processData: false,
      // Не обрабатываем файлы (Don't process the files)
      contentType: false,
      success: function success() {// при получении ответа
      }
    });
  }

  function removeProduct(product) {
    clearInterval(undoTimeoutId);
    cartList.find('.deleted').remove();
    var myData = new FormData();
    var topPosition = product.offset().top - cartBody.children('ul').offset().top,
        productQuantity = Number(product.find('.quantity').find('select').val()),
        productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;
    product.css('top', topPosition + 'px').addClass('deleted'); //update items count + total price

    updateCartTotal(productTotPrice, false);
    updateCartCount(true, -productQuantity); //undo.addClass('visible');

    myData.append('time', product.data('time'));
    myData.append('_token', token);
    $.ajax({
      url: 'http://localhost/MyProject/public/busket_delete',
      // куда отправляем данные
      type: 'POST',
      // метод
      data: myData,
      // данные, которые отправляем (id добавляемого товара)
      processData: false,
      // Не обрабатываем файлы (Don't process the files)
      contentType: false,
      success: function success() {// при получении ответа
      }
    }); //wait 8sec before completely remove the item

    undoTimeoutId = setTimeout(function () {
      undo.removeClass('visible');
      cartList.find('.deleted').remove();
    }, 350);
  }

  function quickUpdateCart() {
    var quantity = 0;
    var price = 0;
    cartList.children('li:not(.deleted)').each(function () {
      var singleQuantity = Number($(this).find('select').val());
      quantity = quantity + singleQuantity;
      price = price + singleQuantity * Number($(this).find('.price').text().replace('$', ''));
    });
    cartTotal.text(price.toFixed(2));
    cartCount.find('li').eq(0).text(quantity);
    cartCount.find('li').eq(1).text(quantity + 1);
  }

  function updateCartCount(emptyCart, quantity) {
    if (typeof quantity === 'undefined') {
      var actual = Number(cartCount.find('li').eq(0).text()) + 1;
      var next = actual + 1;

      if (emptyCart) {
        cartCount.find('li').eq(0).text(actual);
        cartCount.find('li').eq(1).text(next);
      } else {
        cartCount.addClass('update-count');
        setTimeout(function () {
          cartCount.find('li').eq(0).text(actual);
        }, 150);
        setTimeout(function () {
          cartCount.removeClass('update-count');
        }, 200);
        setTimeout(function () {
          cartCount.find('li').eq(1).text(next);
        }, 250);
      }
    } else {
      var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
      var next = actual + 1;
      cartCount.find('li').eq(0).text(actual);
      cartCount.find('li').eq(1).text(next);
    }
  }

  function updateCartTotal(price, bool) {
    bool ? cartTotal.text((Number(cartTotal.text()) + Number(price)).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - Number(price)).toFixed(2));
  }

  function chek_busket() {
    $.ajax({
      url: 'http://localhost/MyProject/public/busket_get',
      // куда отправляем данные
      type: 'POST',
      // метод
      data: {
        _token: token
      },
      processData: false,
      // Не обрабатываем файлы (Don't process the files)
      contentType: false,
      dataType: 'json',
      success: function success(data) {
        // при получении ответа
        var i = 0;

        for (var key in data) {
          var miTIME = key;
          var PRICE = data[key]['price'];
          var NAME = data[key]['name'];
          var ID = data[key]['id'];
          var image_path = data[key]['image'];
          var cartIsEmpty = cartWrapper.hasClass('empty');
          var select_value = Number(data[key]['count']);
          i += Number(data[key]['count']); //update cart product list

          addProduct_noajax(PRICE, ID, NAME, miTIME, select_value, image_path); //update number of items

          updateCartCount(cartIsEmpty); //update total price

          updateCartTotal(25, true); //show cart

          cartWrapper.removeClass('empty');
        }

        cartCount.addClass('update-count');
        actual = i;
        next = i + 1;
        setTimeout(function () {
          cartCount.find('li').eq(0).text(actual);
        }, 150);
        setTimeout(function () {
          cartCount.removeClass('update-count');
        }, 200);
        setTimeout(function () {
          cartCount.find('li').eq(1).text(next);
        }, 250);
      }
    });
  }

  chek_busket();
});

/***/ }),

/***/ 3:
/*!**************************************!*\
  !*** multi ./resources/js/busket.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\MyProject\resources\js\busket.js */"./resources/js/busket.js");


/***/ })

/******/ });