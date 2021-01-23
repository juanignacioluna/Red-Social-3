<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['id', 'fullName', 'user', 'password', 'siguiendo', 'seguidores'];
}