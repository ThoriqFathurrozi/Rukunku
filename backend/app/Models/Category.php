<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'name',
        'description',
        'type',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'foreign_category_id', 'category_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'foreign_category_id', 'category_id');
    }
}
