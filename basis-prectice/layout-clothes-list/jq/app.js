var colors = ["#f75375", "#53a0f7", "#59cfaf", "#c7c7c7", "#4e5156", "#2060af"];
for (var i = 0; i < 10; i++) {
    $(".cloth_color li").each(function(index) {
        $(this).css('background', colors[index]);
    });
    $("#clothes").append("<li class='item'>" + $(".item").eq(0).html() + "<li>");
}

$(".item").each(function() {
    $(this).hover(function() {
        $(this).addClass('shadow');
        $(this).children().eq(2).animate({
            top: "-=105px"
        }, "fast").prev().fadeIn("fast");
    }, function() {
        $(this).removeClass('shadow');
        $(this).children().eq(2).animate({
            top: "+=105px"
        }, "fast").prev().fadeOut("fast");
    });
});