<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'path', 'category_id', 'downloads'];
    protected $appends = ['file', 'date'];

    function getFileAttribute()
    {
        return asset("assets/img/$this->path");
    }

    function getDateAttribute()
    {
        return date('d M Y', strtotime($this->created_at));
    }

    function category()
    {
        return  $this->hasOne(Category::class, 'id', 'category_id');
    }
}
