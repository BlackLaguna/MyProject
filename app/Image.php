<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Image extends Model
{
    public static function insert($ID,$images)
    {
        foreach ($images as $data) {
            $image = new Image;
            $image['path'] = $data;
            $image['product_id'] = $ID;
            $image->save();
        }
    }
    public function products(){

        return $this->belongsTo('App\Product','products_id','ID');
    }
}
