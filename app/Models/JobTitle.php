<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobTitle extends Model
{
    protected $fillable = ['title', 'description'];

    public function staffs(): HasMany
    {
        return $this->hasMany(Staff::class);
    }
}
