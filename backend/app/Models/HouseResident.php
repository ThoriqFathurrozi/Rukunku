<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HouseResident extends Model
{
    use HasFactory;
    protected $table = 'house_residents';
    protected $primaryKey = 'house_resident_id';

    protected $fillable = [
        'foreign_house_id',
        'foreign_resident_id',
        'start_date',
        'end_date',
    ];



    public function house()
    {
        return $this->belongsTo(House::class, 'foreign_house_id', 'house_id');
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class, 'foreign_resident_id', 'resident_id');
    }

}
