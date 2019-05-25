<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http;
use Illuminate\Support\Facades\DB;

/** @mixin \ Eloquent */
class Product extends Model
{
    protected $primaryKey = "ID";
    public $timestamps = false;
    public static function insert(Request $request,$path,$image){
        $products = new Product;
        $products['product_name'] = $request->input('product_name');
        $products['Price'] = $request->input('Price');
        $products['DESCRIPTION'] = $request->input('DESCRIPTION');
        $products['havenow'] = true;
        $products['image'] = $path;
        $products->save();
        Image::insert($products['ID'],$image);

            $categorys=$request->old_categorys;
            for($i=0;$i<$request->input('TotalCategorys');$i++){
            $products->category()->attach($categorys[$i]);
            }
        if($request['category']!='')Category::new_category($request,$products['ID']);
    }
    public function images(){
        return $this->hasMany('App\Image','product_id','ID');
    }
    public static function get_from_basket($products){
        $order_products = array();
        foreach ($products as $product){
            if(isset($order_products[$product['id']])){
                $order_products[$product['id']]['count']+=$product['count'];
            }else{
                $order_products[$product['id']]['count']=$product['count'];
            }
        }
        return $order_products;
    }
    public function category(){
        return $this->belongsToMany('App\Category','category_product','product_id','category_id')->withTimestamps();
    }
}

