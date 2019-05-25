<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('transactions', function(Blueprint $table)
		{
			$table->foreign('product_id', 'transaction_product_id_foreign')->references('ID')->on('products')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('general_transaction_id', 'transaction_user_id_foreign')->references('id')->on('general_transactions')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('transactions', function(Blueprint $table)
		{
			$table->dropForeign('transaction_product_id_foreign');
			$table->dropForeign('transaction_user_id_foreign');
		});
	}

}
