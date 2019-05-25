@extends('app')

@section('general_content')
  @foreach($busket as $key => $product)
    <div class="order_all">
    <div class="order_image"><img src="{{asset('/storage/' . App\Product::find($key)->image)}}"></div>
    <div class="order_product_name"><div class="order_text">{{App\Product::find($key)->product_name}}</div></div>
    <div class="order_price"><div class="order_text_price">{{App\Product::find($key)->Price}} pln.</div></div>
    <div class="order_coutn"><div class="order_text_coutn">{{$product['count']}} шт.</div></div>
    <div class="order_total_price"><div class="order_text_total">{{$product['count']*App\Product::find($key)->Price}} pln.</div></div>
    </div>
    @endforeach
  <div id="total_order_price">Total:{{$amount}}</div>
  <div id="order_form">
    <br>
  <form method="POST" action="{{ route('check_order') }}">
    @csrf
    <div class="form-group">
      <input placeholder="email" id="" type="email"  class="form-control inputs" name="email"  required autocomplete="email" autofocus>
    </div>
    <div class="form-group">
      <input placeholder="Phone nubmer" id="tel" class="form-control inputs" name="phone_number"   required autocomplete="phone_number" autofocus>
    </div>
    <div class="form-group">
      <input placeholder="Name" id="" type="text" class="form-control inputs" name="name" required autocomplete="Name">
    </div>
    <div class="form-group">
      <input placeholder="Surname" id="" type="text" class="form-control inputs" name="second_name" required autocomplete="Second_name">
    </div>
    <div class="form-group">
      <input placeholder="Number of Post office" id="" type="text" class="form-control inputs" name="post_office" required autocomplete="Post_Office">
    </div>
    <div class="form-group">
      <input type="submit" class="btn_login" value = "Buy">
    </div>
  </form>
  </div>

  <script src = "{{ URL::asset("js/order.js")}}" defer></script>﻿
@endsection