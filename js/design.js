/* JavaScript Document */

var windowSize = "";
var windowWidth = 0;
var actualSize = 0;
var firstRun = true;
var isIE = false;


$(document).ready(function(){
	var isIE = false;
	if (!$.support.leadingWhitespace) { isIE = true }  //JQ检查用户用的浏览器是否为IE7，8
	//alert("this is working");
	checkBrowserSize();
	setInterval("checkBrowserSize()",100);
	//loadHero();

	$("a.mobile_menu").on("click",function() {
		var navHeight = $("nav").height();
		var newNavHeight = $("nav div").height();

		if (navHeight == 0) {
			$("nav").animate({"height":newNavHeight+"px"},500);
			$(this).addClass("selected");
		} else {
			$("nav").animate({"height":"0px"},500);
			$(this).removeClass("selected");
		}
	}); 
});

function animateHero() {
	if (firstRun) {
		firstRun = false;
		$("#hero img").imgpreload(function(){ 
			$("#hero .panel img").css({"opacity": 0, "right": "-100px"}).animate({opacity: 1, "right": "0px"}, 2000);
			$("#hero .panel .caption").css({"opacity": 0, "left": "-75%"}).animate({opacity: 1, "left": "0px"}, 2000);
			
			var logoPosition = $("header a.logo").position();
			$("header a.logo").css({"opacity": 0, "top": "0px"}).delay(500)
			.animate({opacity: 1, "top": logoPosition.top+"px"},1000, function() {
				$(this).removeAttr("style"); // 去除选中目标JQ做的CSS效果
			});
		});
	}
}

function checkBrowserSize() {

	if(isIE) {
		windowWidth = $("body").width() + 33;
	} else {
		windowWidth = window.outerWidth;
	}

	var contentWidth = $("body").width();
	var sizeDiff = windowWidth - contentWidth;
	actualSize = windowWidth - sizeDiff;

	if(actualSize > 800) {newWindowSize = "large";}
	if(actualSize <=800 && actualSize > 500) {newWindowSize = "medium";}
	if(actualSize <=500) {newWindowSize = "small";}

	if (windowSize != newWindowSize) {
		windowSize = newWindowSize; 
		loadHero();
	}
	//$('h1').html(windowWidth+' ('+actualSize+'+'+sizeDiff+')'+' is '+newWindowSize);
}

function loadHero(){
	if(actualSize > 800) {
		$("nav").css("height","auto");
		$("#hero").html("<div class='panel'><img src='images/banner_large.jpg'><div class='caption'><h3>Large Screen Heading</h3><p>Dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut itation ullamco laboris nisi ut aliquip.</p><a href='#' class='cta'>Learn more</a></div></div>");
		animateHero();
	} else if(actualSize <=800 && actualSize > 500) {
		$("nav").css("height","auto");
		$("#hero").html("<div class='panel'><img src='images/banner_medium.jpg'><div class='caption'><h3>Medium Heading</h3><p>Dolor sit amet consectetur adipisicing elit sed do eiusmod tempor.</p><a href='#' class='cta'>Learn more</a></div></div>");
		animateHero();
	} else {

		if(isIE) {
			$("nav").css("height","auto");
		} else {
			$("nav").css("height","0");
		}
		
		$("#hero").html("");
		$("a.mobile_menu").removeClass("selected");
		//firstRun = false; -----小屏幕到大屏幕不会做firstRun的效果 
	}
}
