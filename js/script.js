

var firstRun = true;

$(document).ready(function(){  
    // 汉堡图标点击后blur，隐藏菜单
    $("#navbarToggle").blur(function (event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
           $("#collapsable-nav").collapse('hide');
        }
    });

    setInterval("slideImages()", 3000);
    animateNav();


});

function animateNav() {
    if(firstRun) {
        firstRun = false;
                  
            $("#nav-list").css({"opacity": 0, "position": "absolute", "top": "-100%","right": "15px"})
            .animate({opacity: 1, "top": "0px","right": "15px"},2000,function() {
                $(this).removeAttr("style"); // 去除选中目标JQ做的CSS效果
            });
    }
}




function slideImages() {
    var currentPhoto = $('#specials-tile .current');
    var nextPhoto = currentPhoto.next();
    if (nextPhoto.length == 0)
        nextPhoto = $('#specials-tile a:first');

    currentPhoto.removeClass('current').addClass('previous');
    nextPhoto.css({ opacity: 0.0 }).addClass('current')
            .animate({ opacity: 1.0 }, 1000,
                        function() {
                            currentPhoto.removeClass('previous');
                        });
}


