<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

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

        $contact = contact::create($request->only('name', 'email', 'message', 'subject'));
        Mail::to('admin@catalog.com')->send(new ContactMail($request->only('name', 'email', 'subject', 'message')));
        return response()->json(['success' => true]);
    }
}
