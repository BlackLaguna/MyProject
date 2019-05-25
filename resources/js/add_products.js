$(document).ready(function () {


var new_item = document.getElementById("new_item");
var close = document.getElementById("close");
var input = document.getElementById("input");

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
new_item.onclick = function (event) {
    if(event.target!==close) {
        new_item.style.height = 51 + "%";
        input.style.transitionDelay = "0.25";
        document.getElementById('visible_new_item').style.display = 'block';
}
}
close.onclick = function () {
    new_item.style.height = 15 + "%";
    input.style.transitionDelay = "0";
    document.getElementById('visible_new_item').style.display = 'none';

}
var myData = {};
var token  = $('meta[name=csrf-token]').attr('content');
var file;
var files;
var i = 0;
$('#image').change(function () {
    file = this.files;
})

myData = new FormData();
$('#image_multi').change(function(){
    files = [];
    var TotalImages = $('#image_multi')[0].files.length;
    let images = $('#image_multi')[0];
    for (let i = 0; i < TotalImages; i++) {
        files = images.files[i];
        myData.append('images[]', images.files[i]);
    }
    myData.append('TotalImages', TotalImages);

});
function check_categorys(){
    var all_categorys = $('input[name*="all_categorys"]');
    var i = 0;
    all_categorys.each(function() {
        if (this.checked) {
            myData.append('old_categorys[]',this.value);
            i++;
        }
    });
    myData.append('TotalCategorys',i);
}

    $("#add_product").click(
        function(){
            var file = $('#image')[0].files[0];
            myData.append('category',$('#product_category').val());
            myData.append('Price', $('#product_price').val());
            myData.append('DESCRIPTION', $('#product_description').val());
            myData.append('product_name',$('#product_name').val());
            myData.append('_token', token);
            myData.append('file', file);
            check_categorys();
            sendAjaxForm('add_product');
            return false;
        });


function sendAjaxForm(url) {
    $.ajax({
        url:     url,
        type:     "POST",
        data: myData,
        processData: false,
        contentType: false,
        success: function() {
            alert("+");
            myData.delete('old_categorys[]');
            myData.delete('images[]');
            $('#input').trigger("reset");
        },
        error: function(response) {
            $('#result_form').html('Error. Data not send.');
        }
    });
}
$('#edit_product').click(function (event) {
    if(event.target!==$('div#close_edit_product')[0]){
        $('#edit_product').css('height','85%');
        $('#edit_product').css('overflow','scroll');
        $('.edit_product_product_div').css('display','block');
        $('#visible_edit_item').css('display','block');
    }
});
$('#close_edit_product').click(function () {
    $('#edit_product').css('height','15%');
    $('#visible_edit_item').css('display','none');
    $('#edit_product').css('overflow','hidden');
});

var edit_data = new FormData();

    $(".edit_button").each(function () {
            let index = this.dataset.id;
        $(this).on("click", function(){
            edit_data.append('id',this.dataset.id);
            edit_data.append('price',$('#price_of'+this.dataset.id).val());
            edit_data.append('name',$('#name_of'+this.dataset.id).val());
            edit_data.append('havenow',$("input[name="+this.dataset.id+"]:checked").val());

            $.ajax({
                url:     'edit_product',
                type:     "POST",
                data: edit_data,
                processData: false,
                contentType: false,
                success: function() {
                    alert("+");
                },
                error: function(response) {
                    alert("-");
                }
            });
        });
    });
    $(".delete_button").each(function () {
        let index = this.dataset.id;
        $(this).on("click", function(){
            edit_data.append('id',this.dataset.id);
            $.ajax({
                url:     'delete_product',
                type:     "POST",
                data: edit_data,
                processData: false,
                contentType: false,
                success: function() {
                   $("#product"+index).remove().end();
                },
                error: function(response) {
                    alert("-");
                }
            });
        });
    });

    $(".button_status").each(function () {
        let index = this.dataset.id;
        $(this).on("click", function(){
            edit_data.append('id',this.dataset.id);
            $.ajax({
                url:     'transaction_complite',
                type:     "POST",
                data: edit_data,
                processData: false,
                contentType: false,
                success: function() {
                    $("#transaction_div"+index).remove().end();
                },
                error: function(response) {
                    alert("-");
                }
            });
        });
    });


















});
