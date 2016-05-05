var transparent = true;
var transparentDemo = true;


//JS For Navbar Switch
$(document).ready(function(){
  $(window).scroll(function() { 
    if ($(document).scrollTop() > 50) { 
      $(".navbar-fixed-top").css("background-color", "#4b4d52");
      $(".navbar-fixed-top").css("z-index", "16");
    } else {
      $(".navbar-fixed-top").css("background-color", "transparent"); 
    }
  });
});

//JS For LearnMore
function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
   document.getElementById('Show-about-us').style.display = "none";
}
function hideDiv() {
   document.getElementById('welcomeDiv').style.display = "none";
   document.getElementById('Show-about-us').style.display = "block";
}


//JS For Parallax
$().ready(function(){
  window_width = $(window).width();

  if (window_width >= 768){
    big_image = $('.wrapper > .header');

      $(window).on('scroll', checkScrollForParallax);
    }

  });

checkScrollForParallax = debounce(function(){
  var current_scroll = $(this).scrollTop();

  ValueForParallax = ($(window).scrollTop() / 3);
  big_image.css({
  'transform':'translate3d(0,' + ValueForParallax +'px,0)',
  '-webkit-transform':'translate3d(0,' + ValueForParallax +'px,0)',
  '-ms-transform':'translate3d(0,' + ValueForParallax +'px,0)',
  '-o-transform':'translate3d(0,' + ValueForParallax +'px,0)'
  });

}, 6);


//JS for auto slide change
$(document).ready(function(){

    $.material.init();
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
             weekStart:1
        });
    }
    $('[data-toggle="popover"]').popover();
  $('.carousel').carousel({
      interval: 400000
    });

});




//The Debounce Function 
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

