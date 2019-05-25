
@extends('app')

@section('general_content')

    @if(Illuminate\Support\Facades\Auth::check())
        @if(!(Illuminate\Support\Facades\Auth::user()->admin_status))
        <div id="reset_user_pas">
            <div id="label_reset_user_pas">Change password:</div>
            <form method="POST" action="{{ route('password.update') }}">
                @csrf
                <div class="reset_pas_my_menu">
                        <input id="password" type="password" placeholder="New password" class="form-control inputs @error('password') is-invalid @enderror" name="password">
                </div>
                <div class="confirm_pas_my_menu">
                        <input id="password-confirm" placeholder="Confirm password" type="password" class="form-control inputs" name="password_confirmation">
                </div>
                <button type="submit" class="btn_login reset_pas_my_menu_button">Change password</button>
            </form>
            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div id="label_transaction_userlist">Order history:</div>
                <div id="transaction_list">
                @foreach(App\General_transaction::all()->where('user_id','=',Illuminate\Support\Facades\Auth::user()->id) as $transaction)
                    <div id="transaction_div{{$transaction['id']}}" class="transaction_div">
                        <div class="transaction_data">
                            <p>Name:    {{$transaction['name']}}</p>
                            <p>Surname:{{$transaction['second_name']}}</p>
                        </div>
                        <div class="transaction_data_contact">
                            <p>EMAIL:{{$transaction['email']}} | Post Office:{{$transaction['post_office']}}</p>
                            <p>Phone number:{{$transaction['phone_number']}}</p>
                        </div>
                        @if($transaction->status=='new')
                        <div class="status">{{$transaction['status']}}</div>
                        @endif
                    </div>
                @endforeach
                </div>

        @endif
        @if(Illuminate\Support\Facades\Auth::user()->admin_status)
            <div id="new_item">
                <div id="visible_new_item">
                <div id="close"></div>
                <form id="input" action="" method="POST" enctype="multipart/form-data">
                   @csrf
                    <br>
                    <input class="input_product" type="text" id="product_name" placeholder="Input product name">
                    <br>
                    <input class="input_product" type="int" id="product_price" placeholder="Input product price">
                    <br>
                    <input class="input_product" type="text" id="product_category" placeholder="Input new product category">
                    <br>
                    <div id="radio_div">
                        <div id="radio_div_lable">Choose category:</div>
                        <div id="category_list">
                        @foreach(App\Category::all() as $catogory)
                          <div class="radio_input"><input  type="checkbox" name="all_categorys" value="{{$catogory['id']}}">{{$catogory['name']}}</div>
                        @endforeach
                        </div>
                    </div>
                    <textarea class="input_product_description" type="text" rows="65" id="product_description" placeholder="Input product description"></textarea>
                    <br>
                    <input id="image" name="image" type="file" >
                    <input id="image_multi" name="images" type="file" multiple>
                </form>
                <div id="add_product">Add</div>
                <div id="result_form"></div>
            </div>
            </div>
            <div id="edit_product">
                <div id="visible_edit_item">
                <div id="close_edit_product"></div>
                @foreach(App\Product::all() as $product)
                <div id='product{{$product['ID']}}' class="edit_product_product_div">
                <div class="edit_product_name" >Change name
                <input id="name_of{{$product['ID']}}" class="edit_product_input" type="text" value="{{$product['product_name']}}"></div>
                    <div class="edit_product_id">ID:{{$product['ID']}}</div>
                <div class="edit_product_price">Change price:
                <input id="price_of{{$product['ID']}}" class="edit_product_input" type="text" value="{{$product['Price']}}"></div>
                <div class="edit_product_have_now">In stock<br>
                <input class="" type="radio" name="{{$product['ID']}}" value="1" checked >Yes
                <input class="" type="radio" name="{{$product['ID']}}"
                       @if($product['havenow']==0)
                checked
                        @endif
                value="0">No</div>
                    <div class="edit_button" data-id="{{$product['ID']}}">Change</div>
                    <div class="delete_button" data-id="{{$product['ID']}}">Remove</div>
                </div>
                @endforeach
                </div> </div>
            <div id="transaction_list">
                @foreach(App\General_transaction::all()->where('status','=','new') as $transaction)
                    <div id="transaction_div{{$transaction['id']}}" class="transaction_div">
                    <div class="transaction_data">
                        <p>Name:    {{$transaction['name']}}</p>
                        <p>Surname:{{$transaction['second_name']}}</p>
                    </div>
                        <div class="transaction_data_contact">
                            <p>EMAIL:{{$transaction['email']}} | Post office:{{$transaction['post_office']}}</p>
                            <p>Phone number:{{$transaction['phone_number']}}</p>
                        </div>
                        <div class="status">{{$transaction['status']}}</div>
                        <button class="button_status" data-id="{{$transaction['id']}}">was sent</button>
                    </div>
                @endforeach
            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
            <script src="{{ URL::asset("js/add_products.js") }}"></script>
        @endif
    @endif

@endsection