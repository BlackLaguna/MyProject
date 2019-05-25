
@foreach($products as $product )
    <div id='target_content'>
        <a href="http://localhost/MyProject/public/{{$product->ID}}"><div id="intarget">
                @if($product['image'])
                    <img alt="" src= '{{asset('/storage/' . $product['image'])}}'>
                @endif
            </div></a>
        <div id="to_cart"><a href="#0" class="cd-add-to-cart button" data-name="{{$product['product_name']}}" data-image_path="{{asset('/storage/' . $product['image'])}}" data-price="{{$product['Price']}}" data-id="{{$product['ID']}}">Buy</a></div>
        <div id="price">{{$product['Price']}} pln</div>

    </div>
@endforeach
<div class="content" id="list">
    {{$products->links()}}
</div>