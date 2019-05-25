<?php

namespace App\Http\Controllers;

use App\Category;
use App\General_transaction;
use App\Image;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use \Illuminate\Support\Facades\Session;
use phpDocumentor\Reflection\DocBlock\Tags\See;
use Illuminate\Http\UploadedFile;
use Symfony\Component\Console\Input\Input;

class AjaxController extends Controller
{
    public function add(Request $request){
        $images = $request->images;
        $image = array();
        for($i=0;$i<$request->input('TotalImages');$i++){
           $image[$i] = $images[$i]->store('uploads','public');
        }
        $path = $request->file('file')->store('uploads','public');
        Product::insert($request,$path,$image);
    }
    public function edit(Request $request){
        $product = Product::find($request->input('id'));
        $product->Price = $request->price;
        $product->product_name = $request->name;
        $product->havenow = $request->havenow;
        $product->save();
    }
    public function delete_product(Request $request){
        $product = Product::find($request->input('id'));
        $product->delete();
    }
    public function transaction_complite(Request $request){
        $transaction = General_transaction::find($request->input('id'));
        $transaction->status='was_send';
        $transaction->save();
    }
    public function busket_add(Request $request){

        if(Session::has('inBusket')) {
                $basket = Session::get('inBusket');
                $basket[$request->input('time')]['id']=$request->input('id');
                $basket[$request->input('time')]['image']=$request->input('image');
                $basket[$request->input('time')]['name']=$request->input('name');
                $basket[$request->input('time')]['price']=$request->input('price');
                $basket[$request->input('time')]['count']=$request->input('count');
                Session::put('inBusket', $basket);
        }
        if(!(Session::has('inBusket'))) {
            $basket[$request->input('time')]['count'] = $request->input('count');
            $basket[$request->input('time')]['id'] = $request->input('id');;
            $basket[$request->input('time')]['image']=$request->input('image');
            $basket[$request->input('time')]['price']=$request->input('price');
            $basket[$request->input('time')]['name']=$request->input('name');
            Session::put('inBusket', $basket);
        }

    }
    public function busket_change(Request $request){
        $basket = Session::get('inBusket');
        foreach ($basket as $key => $chek){
            if($key==$request->input('time')){
                $basket[$key]['count']=$request->input('count');
            }
        }
        Session::put('inBusket', $basket);
    }
    public function delete(Request $request){
        $basket = Session::get('inBusket');
        foreach ($basket as $key => $chek){
            if($key==$request->input('time')){
                unset($basket[$key]);
            }
        }
        Session::put('inBusket', $basket);
    }
    public function busket_get(){
        $basket = Session::get('inBusket');
        return $basket;
    }
    public function next(Request $request){

      $response =  DB::table('products')->skip($request->input('count')*12)->take(12)->get();
      return $response;
    }
    public function change_category(Request $request){
        $products = Category::find($request->input('id'))->products();
        $products = $products->simplePaginate(2);
        return view('pages.pagination',compact('products'));
    }
    public function change_category_get(Request $request){
        $products = Category::find(1)->products();
        $products = $products->simplePaginate(2);
        return view('pages.pagination',compact('products'));
    }

}
