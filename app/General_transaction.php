<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class General_transaction extends Model
{
    public function transaction(){
        return $this->hasMany('App\Transaction','general_transaction_id','id');
    }
}
