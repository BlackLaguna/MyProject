<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Category extends Model
{
    public $timestamps = false;
    public static function new_category(Request $request,$id){
        $new_Category = new Category;
        $new_Category->name = $request->input('category');
        $new_Category->save();
        $new_Category->products()->attach($id);
    }
    public function products(){
        return $this->belongsToMany('App\Product','category_product')->withTimestamps();
    }
}
