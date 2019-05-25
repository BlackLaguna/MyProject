@extends('app')

@section('general_content')
    <div id="check_transaction_div">
      <div id="ckeck_transaction_label">Your transaction number</div>
        <div id="check_transaction_imput_div">
            <input id="check_transaction_input" class="form-control inputs" type="text">
            <div id="check_transaction_button">Ok</div>
        </div>
    </div>

    <div id="response_check_transaction">
        <span id="response_check_transaction_span"></span>
    </div>
    <script src = "{{URL::asset('js/check_transaction.js') }}" defer></script>
@endsection