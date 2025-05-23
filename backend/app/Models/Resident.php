<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $table = 'residents';
    protected $primaryKey = 'resident_id';

    protected $fillable = [
        'full_name',
        'identification_card_img',
        'maritial_status',
        'phone_number',
        'resident_status',
    ];

    public function houseResidents()
    {
        return $this->hasMany(HouseResident::class, 'foreign_resident_id', 'resident_id');
    }

    public function payment()
    {
        return $this->hasMany(Payment::class, 'foreign_resident_id', 'resident_id');
    }

}
