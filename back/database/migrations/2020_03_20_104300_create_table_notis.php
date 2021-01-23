<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableNotis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notis', function (Blueprint $table) {
            $table->increments('id');
            $table->string('receptor');
            $table->string('emisor');
            $table->integer('seguidorNuevo')->nullable();
            $table->integer('likeAtuit')->nullable();
            $table->integer('likeART')->nullable();
            $table->integer('rtAtuit')->nullable();
            $table->integer('rtART')->nullable();
            $table->integer('idTuit')->nullable();
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
        Schema::dropIfExists('notis');
    }
}
