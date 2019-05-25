<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCategoryProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('category_product', function(Blueprint $table)
		{
			$table->timestamps();
			$table->integer('category_id')->index('category_product_category_id_foreign');
			$table->integer('product_id')->index('category_product_product_id_foreign');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('category_product');
	}

}
