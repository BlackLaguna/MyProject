<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="-1">
    <title>{{Route::currentRouteName() }}</title>
    <link rel="stylesheet" href="{{URL::asset("css/style.css")}}">
    <link rel="stylesheet" href="{{URL::asset('css/busket.css')}}">
    <link rel="stylesheet" href="{{URL::asset('css/index.css')}}">

</head>
<body id="body">
@if(!(Illuminate\Support\Facades\Auth::check()))
<div id="go_to_login">
    <div id="log_on_reg">
        <div id = "login_panel" class="left_log_off">LOG</div>
        <div id = "reg_panel" class="right_log_on">REG</div>
    </div>
    <div id="div_log">
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="form-group">
                <input placeholder="email" id="email" type="email" class="form-control inputs" name="email" required autocomplete="email">
        </div>
        <div class="form-group">
                <input placeholder="Password" id="password" type="password" class="form-control inputs" name="password" required autocomplete="current-password">
        </div>
        <div class="form-group">
                <input type="submit" class="btn_login" value = "Login">
        </div>
    </form>
    </div>
    <div id="div_reg">
    <form method="POST" action="{{ route('register') }}">
        @csrf
        <div class="form-group">
                <input id="name" placeholder="name" type="text" class="form-control inputs @error('name') is-invalid @enderror" name="user_name" required autocomplete="name" >
        </div>
        <div class="form-group">
                <input id="email" placeholder="email" type="email" class="form-control inputs @error('email') is-invalid @enderror" name="email"  required autocomplete="email">
        </div>
        <div class="form-group">
                <input id="password" placeholder="password" type="password" class="form-control inputs @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

        </div>
        <div class="form-group">
                    <input id="password-confirm" placeholder="confirm password" type="password" class="form-control inputs" name="password_confirmation" required autocomplete="new-password">
        </div>
        <div class="form-group">
            <button type="submit" class="btn_registration">Register</button>
        </div>
    </form>
    </div>
</div>
@endif
@if(!isset($cart))
<div class="cd-cart-container empty">
    <a href="#0" class="cd-cart-trigger">
        Cart
        <ul class="count">
            <li>0</li>
            <li>0</li>
        </ul>
    </a>
    <div class="cd-cart">
        <div class="wrapper">
            <header>
                <h2>Products in your cart:</h2>
                <span class="undo">Product was delete. <a href="#0"></a></span>
            </header>
            <div class="body">
                <ul></ul>
            </div>
            <footer>
                <a href="order" class="checkout btn"><em>Make order</em></a>
            </footer>
        </div>
    </div>
</div>
@endif
<div id="hedright">
        @if(Illuminate\Support\Facades\Auth::check())
    <a href="{{route('logout')}}">
        @endif
        @if(Illuminate\Support\Facades\Auth::check())
            <div id="inhead_off"></div>
          @endif
        @if(!Illuminate\Support\Facades\Auth::check())
            <div id="inhead"></div>
        @endif
    @if(Illuminate\Support\Facades\Auth::check())
    </a>
        @endif
</div>



<div class="menu">
    <div class="menu__icon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="menu__links">
        <a href="http://localhost/MyProject/public/index" class="menu__links-item">Main</a>
        <a href="http://localhost/MyProject/public/delivery" class="menu__links-item">Delivery</a>
        <a href="http://localhost/MyProject/public/about" class="menu__links-item"> About us</a>
        <a href="http://localhost/MyProject/public/my_menu" class="menu__links-item"> My Menu</a>
        <a href="http://localhost/MyProject/public/contact" class="menu__links-item">Contact </a>
        <a href="http://localhost/MyProject/public/check_transaction" class="menu__links-item">Check order</a>
    </div>
</div>



<div id="left_block">
                <div class="on"><b>Products Categorys:</b></div>
        @foreach(App\Category::all() as $category)
                <div class="category_off" data-id="{{$category['id']}}">{{$category['name']}}</div>
        @endforeach
</div>
<div id="general_content">
    @yield("general_content")
</div>
<div id="opacity"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src = "{{ URL::asset('js/jquery.js') }}"></script>
<script src = "{{ URL::asset('js/index.js') }}"></script>
<script src = "{{ URL::asset('js/busket.js') }}"></script>
<script src = "{{ URL::asset("js/scripts.js") }}"></script>﻿
<script src = "{{ URL::asset("js/jquery.maskedinput.min.js") }}"></script>﻿
</body>
</html>