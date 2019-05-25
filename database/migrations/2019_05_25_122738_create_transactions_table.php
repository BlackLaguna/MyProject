<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->bigInteger('transaction_id', true)->unsigned();
			$table->bigInteger('general_transaction_id')->unsigned()->index('transaction_user_id_foreign');
			$table->integer('product_id')->index('transaction_product_id_foreign');
			$table->integer('count');
			$table->decimal('amount');
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
		Schema::drop('transactions');
	}

}
