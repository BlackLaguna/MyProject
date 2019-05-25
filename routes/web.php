<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('index', 'PagesController@index')->name('index');



Route::get('about','PagesController@about')->name('about');
Route::get('delivery','PagesController@delivery')->name('delivery');
Route::get('contact','PagesController@contact')->name('contact');
Route::get('my_menu','PagesController@my_menu')->name('my_menu');
Route::get('check_transaction','Transaction_CkeckController@check')->name('check_transaction');
Route::post('check_transaction','Transaction_CkeckController@response');

Route::get('order','OrderController@get_order')->name('order');
Route::post('make_order','OrderController@ckeck_order')->name('check_order');
Route::get('make_order','OrderController@make_order')->name('make_order');



Route::post('login','Auth\LoginController@login')->name("login");
Route::get('logout','Auth\LoginController@logout')->name("logout");
Route::post('register','Auth\RegisterController@register')->name('register');
Route::post('update_password','myResetPasswordController@reset')->name('password.update');

Route::post('change_category','AjaxController@change_category');
Route::get('change_category','AjaxController@change_category_get');


Route::post('add_product','AjaxController@add');
Route::post('edit_product','Ajaxcontroller@edit');
Route::post('delete_product','Ajaxcontroller@delete_product');
Route::post('transaction_complite','Ajaxcontroller@transaction_complite');
Route::post('busket_add','AjaxController@busket_add');
Route::post('busket_change','AjaxController@busket_change');
Route::post('busket_get','AjaxController@busket_get');
Route::post('busket_delete','AjaxController@delete');

Route::get('{id}','ProductsController@show');
Route::get('index/{id}', 'PagesController@index_with_id');