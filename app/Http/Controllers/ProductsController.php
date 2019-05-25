<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;


class ProductsController extends Controller
{
    public function show($id){
    $product = new Product;
    $product = Product::findOrFail($id);

    return view('pages.products',compact('product'));
    }
}
