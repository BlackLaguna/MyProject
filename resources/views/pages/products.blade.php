@extends('app')

@section('general_content')

<div id="content_name"><b>{{$product['product_name']}}</b></div>


<div id="slider" class="content_slider">
    <a href="#"><div id="slider_left"> <img src= '{{URL::asset('images/left.png')}}'></div></a>
    <div id="images_slider">
        <div class="image_div curry"><img src= '{{asset('/storage/' . $product['image'])}}'></div>
    @foreach($product->images as $image)
            <div class="image_div"><img alt="" src= '{{asset('/storage/' . $image['path'])}}'></div>
    @endforeach

    </div>
    <a href="#"><div id="slider_right"> <img src= '{{URL::asset('images/130884.png')}}'></div></a>
</div>



<div id="content_info">
    <a href="#0" class="cd-add-to-cart" data-name="{{$product['product_name']}}" data-image_path="{{asset('/storage/' . $product['image'])}}" data-price="{{$product['Price']}}" data-id="{{$product['ID']}}"><p class="price_table">{{$product['Price']}} pln</p></a>
    <p class="category_table">Categorys:
        <ul class="category_ul">
           @foreach($product->category->toArray() as $categorys)
            <li>{{$categorys['name']}}</li>
            @endforeach
        </ul>
    </p>

</div>
<div id="product_desripton">
    {{$product['DESCRIPTION']}}
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src = "{{ URL::asset('js/product.js') }}" ></script>
<div id="bg"></div>
@endsection