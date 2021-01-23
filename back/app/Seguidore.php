<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seguidore extends Model
{
    protected $fillable = ['id', 'esteUsuario', 'sigueAa'];
}