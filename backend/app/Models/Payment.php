<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';
    protected $primaryKey = 'payment_id';


    protected $fillable = [
        'description',
        'payment_date',
        'total_payment',
        'total_month',
        'status',
        'foreign_resident_id',
        'foreign_house_id',
        'foreign_category_id',
    ];


    public function resident()
    {
        return $this->belongsTo(Resident::class, 'foreign_resident_id', 'resident_id');
    }

    public function house()
    {
        return $this->belongsTo(House::class, 'foreign_house_id', 'house_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'foreign_category_id', 'category_id');
    }
}
