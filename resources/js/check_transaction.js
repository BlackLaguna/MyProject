$(document).ready(function () {
    $.ajaxSetup({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    });

$('#check_transaction_button').on('click',function () {
   let val = $('#check_transaction_input').val();

    $.ajax({
        url : 'check_transaction',
        type : 'POST',
        data : {'id':val},
        success : function(response) {
            console.log(response);
            $('#response_check_transaction_span').html(response);
        }
    });
});




























});