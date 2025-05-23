<?php

namespace App\Enums;

enum MaritalStatusEnum: string
{
    case SINGLE = 'single';
    case MARRIED = 'married';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';
}
