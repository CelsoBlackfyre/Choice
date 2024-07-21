<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('age')->nullable();
            $table->string('gender');
            $table->string('sexual_orientation')->nullable();
            $table->string('race');
            $table->string('skin_color');
            $table->string('body_type');
            $table->string('eye_color')->nullable();
            $table->string('hair_color');
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->text('description')->nullable();
            $table->json('traits')->nullable();
            $table->json('strengths')->nullable();
            $table->string('image_url')->nullable();
            $table->string('status');
            $table->string('birthplace')->nullable();
            $table->string('nationality')->nullable();
            $table->string('occupation')->nullable();
            $table->string('class')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
