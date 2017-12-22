new WOW().init();

window.addEventListener('scroll', function(e) {
        if( $(".section").scrollTop() <= 100) {
            $('.wow').removeClass('animated');
            $('.wow').removeAttr('style');
            new WOW().init();
        }
});

console.log($(".section").scrollTop());

