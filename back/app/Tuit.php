<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tuit extends Model
{
    protected $fillable = ['id', 'user', 'tuit', 'rt', 'mg', 'rtSiOno', 'rtPOR', 'idTuitOriginal'];
}