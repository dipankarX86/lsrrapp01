<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            // 
            $table->string('addr_line1')->nullable();
            $table->string('addr_line2')->nullable();
            $table->decimal('addr_city', 5, 0)->nullable();
            $table->decimal('addr_state', 5, 0)->nullable();
            $table->decimal('addr_country', 5, 0)->nullable();
            $table->string('addr_postal_code')->nullable();
            // 
            $table->string('lat_lon')->nullable();
            // 
            $table->string('pan')->nullable();
            $table->string('gst')->nullable();
            $table->string('trade_license')->nullable();
            // 
            $table->string('owner_name')->nullable();
            $table->string('owner_email')->nullable();
            $table->string('owner_phone')->nullable();
            // 
            $table->string('owner_addr_line1')->nullable();
            $table->string('owner_addr_line2')->nullable();
            $table->decimal('owner_addr_city', 5, 0)->nullable();
            $table->decimal('owner_addr_state', 5, 0)->nullable();
            $table->decimal('owner_addr_country', 5, 0)->nullable();
            $table->string('owner_addr_postal_code')->nullable();

            // $table->foreignId('initial_details');
            // $table->foreignId('gallery');        // load these separately in another rest call if needed
                                                    // can be easily searched for the shop id, dont link them in the model

                                                    // shop will need some varification columns: 'phone', 'email', 'owner-ph', 'owner-em', 'documents' and 
                                                    // 'permissions' and 'status' etc

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
        Schema::dropIfExists('shops');
    }
}
