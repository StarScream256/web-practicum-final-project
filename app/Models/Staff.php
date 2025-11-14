<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
    protected $table = 'staffs';
    protected $fillable = [
        'user_id',
        'name',
        'salutation',
        'job_title_id',
        'specialization',
        'picture',
        'bio',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobTitle(): BelongsTo
    {
        return $this->belongsTo(JobTitle::class);
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(StaffAvailability::class, 'staff_id', 'id');
    }
}
