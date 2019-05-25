<?php

namespace App\Http\Controllers;

use App\General_transaction;
use App\Product;
use App\Transaction;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Tags\See;
use phpDocumentor\Reflection\Types\Compound;

class OrderController extends Controller
{
    public function get_order(){
        if(!(Session::has('inBusket'))) return redirect()->route('index');
        $cart = true;
        $amount = 0;
        $busket = Product::get_from_basket(Session::get('inBusket'));
        foreach ($busket as $key => $products){
            $amount+=$products['count']*Product::find($key)->Price;
        }
        return view("pages.order",compact('busket'),compact('cart'))->with('amount',$amount);
    }
    public function ckeck_order(Request $request){
        if($request->input('email')===null)return redirect()->route('index');
        $data = array();
        $cart = true;
        $data['email']=$request->input('email');
        $data['phone_number']=$request->input('phone_number');
        $data['name']=$request->input('name');
        $data['second_name']=$request->input('second_name');
        $data['post_office']=$request->input('post_office');
        Session::put('order_data',$data);
        return view("pages.check_order",compact('data'),compact('cart'));
    }
    public function make_order(){
        if(!(Session::has('inBusket'))||!(Session::has('order_data'))) return  redirect()->route('index');
        $data = Session::pull('order_data');
        $general_transaction = new General_transaction;
        if(Auth::check())$general_transaction->user_id = Auth::user()->id;
        if(!Auth::check())$general_transaction->user_id = 1;
        $general_transaction->email=$data['email'];
        $general_transaction->phone_number=$data['phone_number'];
        $general_transaction->second_name=$data['second_name'];
        $general_transaction->name=$data['name'];
        $general_transaction->post_office=$data['post_office'];
        $general_transaction->status='new';
        $general_transaction->amount=0;
        $busket = Product::get_from_basket(Session::pull('inBusket'));
        foreach ($busket as $key => $products){
            $general_transaction->amount+=$products['count']*Product::find($key)->Price;
        }
        $general_transaction->save();
        foreach ($busket as $key => $products){
            $transaction = new Transaction;
            $transaction->general_transaction_id=$general_transaction->id;
            $transaction->product_id=Product::find($key)->ID;
            $transaction->count=$products['count'];
            $transaction->amount=$products['count']*Product::find($key)->Price;
            $transaction->save();
        }
        $cart = true;
        $id_transaction = $general_transaction->id;
        return view('pages.your_order',compact('id_transaction'),compact('cart'));
    }
}
