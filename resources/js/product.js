$(document).ready(function () {

$('.image_div').fadeOut(0);
$('.image_div.curry').fadeIn(0);


$('#slider_right').click(function (e) {
    e.preventDefault()
    var currentImage = $('.image_div.curry');
    var currentImageIndex = $('.image_div.curry').index();
    var nextImageIndex = currentImageIndex + 1;
    var nextImage = $('.image_div').eq(nextImageIndex);
    currentImage.fadeOut(500);
    currentImage.removeClass('curry');

    if(nextImageIndex == ($('.image_div:last').index()+1)){
        $('.image_div').eq(0).fadeIn(500);
        $('.image_div').eq(0).addClass('curry');
    } else {
        nextImage.fadeIn(500);
        nextImage.addClass('curry');
    }

});
$('#slider_left').click(function (e) {
    e.preventDefault()
    var currentImage = $('.image_div.curry');
    var currentImageIndex = $('.image_div.curry').index();
    var beforImageIndex = currentImageIndex - 1;
    var beforImage = $('.image_div').eq(beforImageIndex);

    currentImage.fadeOut(500);
    currentImage.removeClass('curry');
    beforImage.fadeIn(500);
    beforImage.addClass('curry');
});

$('#images_slider').click(function () {
    $('#slider').removeClass('content_slider');
    $('#slider').addClass('content_slider_full');
    $('#bg').addClass('bg');
    $('#general_content').css('z-index','5');
});
$('#bg').click(function () {
    $('#slider').removeClass('content_slider_full');
    $('#slider').addClass('content_slider');
    $('#bg').removeClass('bg');
    $('#general_content').css('z-index','1');
});




});