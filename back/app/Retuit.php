<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Retuit extends Model
{
    protected $fillable = ['id', 'user', 'idTuitOriginal'];
}