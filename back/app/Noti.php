<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Noti extends Model
{
    protected $fillable =   ['id',
                            'receptor',
                            'emisor',
                            'seguidorNuevo',
                            'likeAtuit',
                            'likeART',
                            'rtAtuit',
                            'rtART',
                            'idTuit'];
}