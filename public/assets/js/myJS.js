var transparent = true;
var transparentDemo = true;
var logo = document.getElementsByClassName('Aashansh-Header-logo')[0];

var index ;
var imageCount;
var startindex;
var endindex;

$(document).ready(function(){
  var flag=0;
  $('.thumb').click(function(){
      imageCount = $(this).parent().children().length;
      startindex = $('.thumb').index($(this).parent().children()[0]);
      endindex = startindex + imageCount;
      index = $('.thumb').index($(this));
      var src = $(this).attr('data-src');
      $('.popImg').attr('src', src);
      $('#popUp').fadeIn();
      flag=1;  
  });

  $('.next').click(function(e){
      e.preventDefault();
      if (index < endindex-1){
          index += 1;
      }
      else if (index == endindex-1){
        index = startindex;
      }
      var nextElement= $('.thumb')[index];
      var src = $(nextElement).attr('data-src');
      $('.popImg').attr('src', src);
      flag=1;
  });

  $('.prev').click(function(e){
      e.preventDefault();
      if(index > startindex){
          index -= 1;
      }
      else if(index==startindex){
        index = endindex-1;
      }
      var nextElement= $('.thumb')[index];
      var src = $(nextElement).attr('data-src');
      $('.popImg').attr('src', src);
      flag=1;
  });

  $('.close').click(function(e){
    e.preventDefault();
    $("#popUp").fadeOut();
  });
  

});

//JS For Navbar Switch
$(document).ready(function(){
  $(window).scroll(function() { 
    if ($(document).scrollTop() > 50) { 
      logo.classList.add('Aashansh-Header-logo-small');
      $(".navbar-fixed-top").css("WebkitTransitionDuration","0.5s");
      $(".Aashansh-Brandname").css("WebkitTransitionDuration","0.5s");
      $(".Aashansh-Header-logo").css("WebkitTransitionDuration","0.5s");
      $(".navbar-fixed-top").css("background-color", "#ffffff");
      $(".navbar-fixed-top").css("z-index", "16");
      $(".navbar-fixed-top").css("padding", "0px");
      $(".navbar-fixed-top").css("height", "60px");
      $(".Aashansh-Brandname").css("font-size", "14px");
      $(".Aashansh-Brandname").css("padding-bottom", "10px");
      $(".Aashansh-Brandname").css("width", "100px");

    } else {
      logo.classList.remove('Aashansh-Header-logo-small');
      $(".navbar-fixed-top").css("background-color", "transparent"); 
      $(".Aashansh-Header-logo").css("display", "block");
      $(".Aashansh-Brandname").css("width", "70px");
    }
  });
});

//JS For moving arrow
$(document).ready(function(){
     $(".Moving-arrow").hover(function(){
        $(".img-arrow").css("opacity","1");
        $(".img-arrow").css("transition-duration","0.5s");
        $(".img-arrow").css("-webkit-transition-duration","0.5s");
        $(".img-arrow").css("left", "30%");
        $(".img-arrow").css("height","30%");

     },function(){
        $(".img-arrow").css("opacity","0");
        $(".img-arrow").css("transition-duration","0s");
        $(".img-arrow").css("-webkit-transition-duration","0s"); 
        $(".img-arrow").css("left", "-40%");
        $(".img-arrow").css("height","0");
        
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


