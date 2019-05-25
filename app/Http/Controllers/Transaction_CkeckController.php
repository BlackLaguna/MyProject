<?php

namespace App\Http\Controllers;

use App\General_transaction;
use App\Product;
use Illuminate\Http\Request;

class Transaction_CkeckController extends Controller
{
    public function check(){
        $products = Product::all();
        return view('pages.transaction_check',compact('products'));
    }
    public function response(Request $request){
        if(General_transaction::find($request->id)===null) return 'not found';
        $transaction_status = General_transaction::find($request->id)->status;

        return $transaction_status;
    }
}
