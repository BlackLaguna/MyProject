<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class myResetPasswordController extends Controller
{
    public function reset(Request $request){
        $user =  Auth::user();

        $request->validate($this->rules(), $this->validationErrorMessages());

        $user->password = Hash::make($request->password);
        $user->save();
        return back();
    }
    protected function rules()
    {
        return [
            'password' => 'required|confirmed|min:8',
        ];
    }
    protected function validationErrorMessages()
    {
        return [];
    }
}
