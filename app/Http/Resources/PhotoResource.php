<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CategoryResource;

class PhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'downloads' => $this->downloads,
            'path' => $this->path,
            'category_id' => $this->category_id,
            'file' => $this->file,
            'date' => $this->date,
            'category' => new CategoryResource($this->category)
        ];
    }
}
