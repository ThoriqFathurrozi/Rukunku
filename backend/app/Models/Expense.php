<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $table = 'expenses';
    protected $primaryKey = 'expense_id';

    protected $fillable = [
        'date',
        'total',
        'description',
        'foreign_category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'foreign_category_id', 'category_id');
    }
}
