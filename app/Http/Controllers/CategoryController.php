<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    function searchCategory(Request $request)
    {
        return CategoryResource::collection(Category::where('name', 'like', "%{$request->search}%")->get());
    }
}
