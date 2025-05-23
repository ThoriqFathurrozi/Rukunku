<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory;
    protected $table = 'houses';
    protected $primaryKey = 'house_id';

    protected $fillable = [
        'number',
        'address',
    ];


    public function houseResidents()
    {
        return $this->hasMany(HouseResident::class, 'foreign_house_id', 'house_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'foreign_house_id', 'house_id');
    }
}
