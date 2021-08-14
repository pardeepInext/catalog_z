<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    function index(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'name' => 'required',
            'email' => 'required',
            'message' => 'required',
            'subject' => 'required',
        ]);

        if ($validator->fails()) return response()->json(['success' => false, 'error' => $validator->errors()]);
        return response()->json(['success' => true]);
    }
}
