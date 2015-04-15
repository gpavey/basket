$(document).ready(function(){

    $('.bars').on('click',function() {
        $('.slide-menu').toggle("slide", {
            direction: "left",
            distance: 180
        }, 500);
    });

});