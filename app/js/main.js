new WOW().init();

$(document).ready(function(){
	$(window).scroll(function(){
		var top = ($(document).scrollTop());
	if (top >= 300) {
		$('.circle').css('opacity','1');
	}
	else{
		$('.circle').css('opacity','0');
	}
	});
	
});

$(document).ready(function() {
    $('a[href^="#"]').click(function() {
        var target = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(target).offset().top - 90 }, 1000);
    });
});