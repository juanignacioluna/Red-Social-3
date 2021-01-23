<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Megusta extends Model
{
    protected $fillable = ['id', 'user', 'idTuitOriginal'];
}