var transparent = true;
var transparentDemo = true;
var logo = document.getElementsByClassName('Aashansh-Header-logo')[0];

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
