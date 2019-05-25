<?php

namespace App\Http\Controllers;
use App\Category;
use Illuminate\Support\Facades\Auth;

use App\Product;
use Illuminate\Http\Request;

class PagesController extends Controller
{

    public function index(Request $request){
        $products = Product::where('havenow','=','1')->simplePaginate(12);
        if($request->ajax()){
            return view('pages.pagination', compact('products'));
        }
        return view('pages.index',compact('products'));
    }
    public function index_with_id($id,Request $request){

            if($request->has('id')) {
                $products = Category::find($request->input('id'))->products()->where('havenow','=','1');
                $products = $products->simplePaginate(12);
                return view('pages.pagination', compact('products'));
            }else if($request->has('id_category')&&$request->input('id_category')!='all'){
                $products = Category::find($request->input('id_category'))->products()->where('havenow','=','1');
                $products = $products->simplePaginate(12);
                return view('pages.pagination', compact('products'));
            }else if($request->ajax()) {
                $products = Category::find($id)->products()->where('havenow','=','1');
                $products = $products->simplePaginate(12);
                return view('pages.pagination', compact('products'));
            }else{
                $products = Category::find($id)->products()->where('havenow','=','1');
                $products = $products->simplePaginate(12);
                return view('pages.index', compact('products'));
            }
    }




    public function about(){
        $products = Product::all();
        return view('pages.about',compact('products'));
    }
    public function delivery(){
        $products = Product::all();
        return view('pages.delivery',compact('products'));
    }
    public function contact(){
        $products = Product::all();
        return view("pages.contact",compact('products'));
    }
    public function my_menu(){
        $products = Product::all();
        return view("pages.my_menu",compact('products'));
    }
}
