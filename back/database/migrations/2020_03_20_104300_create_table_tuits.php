<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTuits extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tuits', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user');
            $table->string('tuit');
            $table->integer('rt');
            $table->integer('mg');
            $table->string('rtSiOno');
            $table->string('rtPOR')->nullable();
            $table->integer('idTuitOriginal')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tuits');
    }
}
