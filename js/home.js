// Section Funcionalidades
$(document).ready(function () {
  changeTab(null, "fun-1");
});
function changeTab(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent-desktop");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  if (evt) {
    evt.currentTarget.className += " active";
  }

  $(cityName).focus(function () {
    var center = $(window).outerHeight() / 2;
    var top = $(this).offset().top;
    if (top > center) {
      $("html, body").animate({ scrollTop: top - center }, "fast");
    }
  });
}
// Deixa o primeiro elemento de "Funcionalidades" ativo ao carregar a página
document.getElementsByClassName("tablinks")[0].className += " active";

// Depoimentos
// Carousel
(function () {
  "use strict";

  var carousels = function () {
    $(".owl-carousel1").owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      responsiveClass: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      navClass: ["owl-prev", "owl-next"],
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        800: {
          items: 2,
          nav: true,
        },
        1000: {
          items: 3,
          nav: true,
        },
      },
    });
  };

  (function ($) {
    carousels();
  })(jQuery);
})();

// Efeito de digitação de diferentes palavras
// typed.js
var typed = new Typed("#typed", {
  stringsElement: "#typed-strings",
  typeSpeed: 55,
  startDelay: 500,
  backDelay: 1000,
  autoInsertCss: true,
  backSpeed: 40,
  smartBackspace: false,
  loop: true,
});
