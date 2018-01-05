// new WOW().init();

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
// Плавная прокрутка
$(document).ready(function() {
	$('a[href^="#contact"]').click(function() {
		var target = $(this).attr('href');
		$('html, body').animate({ scrollTop: $(target).offset().top - 90 }, 1000);
	});   
	$('a[href^="#top"]').click(function() {
		var target = $(this).attr('href');
		$('html, body').animate({ scrollTop: $(target).offset().top - 90 }, 1000);
	});
	$('a[href^="#ckosts"]').click(function() {
		var target = $(this).attr('href');
		$('html, body').animate({ scrollTop: $(target).offset().top - 90 }, 1000);
	});
});

// Кнопка заказать
$(document).ready(function() {
	$('.order').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
	$("input[id='send']").click(function(){
		$.magnificPopup.close();
	});
});

// Почта
$(document).ready(function() {
	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		var win = window.open('http://google.com.ua');
		$.ajax({
			type: "POST",
			url: "mail/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			win;
			setTimeout(function() {
				// Done Functions
				win.close();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});
});