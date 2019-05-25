@extends('app')

@section('general_content')
<div id="check_order">
    <div>
        <div id="order_all_right">Everything right?</div><br>
        <div id="order_text_email"><span style="color:gray">Email:</span> {{$data['email']}}</div><br>
        <div id="order_text_number"><span style="color:gray">Phone nubmer:</span> {{$data['phone_number']}}</div><br>
        <div id="order_text_name"><span style="color:gray">Name:</span> {{$data['name']}}  <span style="color:gray">Surname:</span> {{$data['second_name']}}</div><br>
        <div id="order_text_sname"><span style="color:gray">Post office:</span> {{$data['post_office']}}</div><br>
    </div>
    <div>
        <a href="{{route('order')}}"><input id="order_button_return" type="button" class="btn_login" value="Cansel order"></a>
        <a href="{{route('make_order')}}"><input id="order_button_acept" type="button" class="btn_login" value="Make order"></a>
    </div>
</div>
@endsection