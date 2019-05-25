var go_to_login = document.getElementById("go_to_login");
var logo = document.getElementById("inhead");
var category = document.getElementsByClassName("category_off");
var reg_panel = document.getElementById("reg_panel");
var login_panel = document.getElementById("login_panel");
var div_reg = document.getElementById("div_reg");
var div_log = document.getElementById("div_log");
var basket = document.getElementById("busket");



logo.onclick = screen_for_login;
function screen_for_login (to_open = true) {
    if(go_to_login.classList.contains("active_menu")) {
        go_to_login.classList.remove("active_menu");
    } else if(to_open) {
        go_to_login.classList.add("active_menu");
    }
}
function has_parent_element(element,needle){
    if(element === needle)return true;
    while((element = element.parentElement) !== needle){
        if(element === document.body)return false;
    }
    return true;
}
document.onmousedown=function (event) {
    if(!has_parent_element(event.target,go_to_login) && event.target != logo) screen_for_login(false);
}

console.log(category[2]);

reg_panel.onclick = function () {
    login_panel.classList.remove('left_log_off');
    login_panel.classList.add('left_log_on');
    reg_panel.classList.remove('right_log_on');
    reg_panel.classList.add('right_log_off');
    div_log.style.left = -370 +'px';
    div_reg.style.right = 0 +'px';
}
login_panel.onclick = function () {
    reg_panel.classList.remove('right_log_off');
    reg_panel.classList.add('right_log_on');
    login_panel.classList.remove('left_log_on');
    login_panel.classList.add('left_log_off');
    div_reg.style.right = -370 +'px';
    div_log.style.left = 0 +'px';
}


$( document ).ready(function() {
    (function ($) {
        $(function () {
            $('.menu__icon').on('click', function () {
                $(this).closest('.menu')
                    .toggleClass('menu_state_open');
            });

            $('.menu__links-item').on('click', function () {
                // do something

                $(this).closest('.menu')
                    .removeClass('menu_state_open');
            });
        });
    })(jQuery);
});
