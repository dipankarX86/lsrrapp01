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

            // $table->email();
            // $table->phone();

            // $table->addrLine1();
            // $table->addrLine2();
            // $table->addrCity();
            // $table->addrState();
            // $table->addrCountry();
            // $table->addrPostalCode();

            // $table->latLon();

            // $table->pan();
            // $table->gst();
            // $table->tradeLicense();

            // $table->ownerName();
            // $table->ownerEmail();
            // $table->ownerPhone();
            
            // $table->ownerAddrLine1();
            // $table->ownerAddrLine2();
            // $table->ownerAddrCity();
            // $table->ownerAddrState();
            // $table->ownerAddrCountry();
            // $table->ownerAddrPostalCode();

            $table->email();
            $table->phone();

            $table->addr_line_1();
            $table->addr_line_2();
            $table->addr_city();
            $table->addr_state();
            $table->addr_country();
            $table->addr_postal_code();

            $table->lat_lon();

            $table->pan();
            $table->gst();
            $table->trade_license();

            $table->owner_name();
            $table->owner_email();
            $table->owner_phone();
            
            $table->owner_addr_line_1();
            $table->owner_addr_line_2();
            $table->owner_addr_city();
            $table->owner_addr_state();
            $table->owner_addr_country();
            $table->owner_addr_postal_code();

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
