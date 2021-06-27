//Nav-link active on scrolling to appropriate section
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop() + 100;

    $('section').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('ul a.active1').removeClass('active1');


            $('ul a').eq(i).addClass('active1');

        }
    });
}).scroll();

function callUs(){
    window.location.href = 'tel:9550603996';
}

function getDirections(){
    windows.location.href = 'https://goo.gl/maps/WBDt8qnH4r61gL4P8';
}