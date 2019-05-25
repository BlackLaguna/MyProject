<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGeneralTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('general_transactions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->timestamps();
			$table->bigInteger('user_id')->unsigned()->index('general_transactions_user_id_foreign');
			$table->decimal('amount', 10);
			$table->text('phone_number', 65535);
			$table->text('email', 65535);
			$table->text('name', 65535);
			$table->text('second_name', 65535);
			$table->text('post_office', 65535);
			$table->text('status', 65535);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('general_transactions');
	}

}
