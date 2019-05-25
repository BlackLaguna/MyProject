$( document ).ready(function() {
    $.ajaxSetup({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
    let block = $('#general_content');

    let id_category='all';
$('.category_off').each(function () {
   $(this).on('click',function () {
       id_category = this.dataset.id;
       $.ajax({
           url: 'http://localhost/MyProject/public/index/'+this.dataset.id,
           type: "GET",
           data: {'id': this.dataset.id},
           cache:false,
           dataType: 'html',
           success: function (response) {
               refresh(response);
               disableHref();
               var loc = window.location.href;
               history.pushState(loc,'','http://localhost/MyProject/public/index/'+id_category);
               },
       });
   });
});
function disableHref() {
    $('.page-link').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            var href = $(this).attr('href');
            $.ajax({
                url : href,
                type: "GET",
                cache:false,
                data: {'id_category': id_category},
                dataType: 'html',
                success: function (response) {
                    refresh(response);
                    var loc = window.location.href;
                    history.pushState(loc,'',href);
                    disableHref();
                },
            });
        });
    });
}
disableHref();
    window.onpopstate = function() {
        var str = document.location.toString();
        str = str.indexOf('index');
        if (str !== -1) {
            $.ajax({
                url: document.location,
                type: "GET",
                data: {'flag': 1},
                cache: false,
                dataType: 'html',
                success: function (response) {
                    refresh(response);
                    disableHref();
                },
            });
        }else{
            $.ajax({
                url: document.location,
                type: "GET",
                data: {'flag': 1},
                cache: false,
                dataType: 'html',
                success: function (response) {
                    $('body').children().remove().end();
                    $('body').append(response);
                    disableHref();
                },
            });
        }
        chek();
    };
    function refresh(resopnse) {
        $('#general_content').children().remove().end();
        $('#general_content').append(resopnse);
        $('#general_content').fadeOut(1);
        setTimeout(function () {
            $('#general_content').fadeIn(250);
        },5);
    }
    $('.category_off').each(function () {
        $(this).on('click',function () {
            $('.check').removeClass('check').addClass('category_off');
            $(this).removeClass('category_off');
            $(this).addClass('check');
       });
    });
function chek(){
    $('.check').removeClass('check').addClass('category_off');
    $('.category_off').each(function () {
        var str = document.location.toString();
        var regexp = new RegExp("index/(" + this.dataset.id +')'+'$');
        str = str.search(regexp);
        if(str!==-1) {
           $(this).removeClass('category_off');
           $(this).addClass('check');
       }
    });
}
chek();






});
