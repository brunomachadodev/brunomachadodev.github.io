const url = window.location.href

// Navbar fixa ao scrollar a página
$(window).scroll(() => {
  if (screen.width > 767) {
    if ($(window).scrollTop() > 5) {
      $("#yooga-header").css("background", () => (url.includes('autonomo') || url.includes('honest') ? 'rgba(1,39,58, 0.95)' : 'rgba(74, 196, 243, 0.96)'));
      $("#yooga-header").css("box-shadow", "0px 0px 30px 0px rgb(0 0 0 / 10%)");
    } else {
      $("#yooga-header").css("background", "transparent");
      $("#yooga-header").css("box-shadow", "");
    }
  } else {
    if ($(window).scrollTop() > 40) {
      $("#yooga-header").css("background", () => (url.includes('autonomo') || url.includes('honest') ? 'rgba(1,39,58, 0.95)' : 'rgba(74, 196, 243, 0.96)'));
      $("#yooga-header").css("box-shadow", "0px 0px 30px 0px rgb(0 0 0 / 10%)");
    } else {
      $("#yooga-header").css("background", "transparent");
      $("#yooga-header").css("box-shadow", "");
    }
  }
});

// Header
// Menu mobile
const btnMobile = document.getElementById("btn-mobile");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", active);
  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMobile?.addEventListener("click", toggleMenu);
btnMobile?.addEventListener("touchstart", toggleMenu);

// Dropdown Soluções

$(".dropdown").hover(

    function () {
      if (screen.width > 991){
      $(".dropdown-toggle").addClass("show");
      $(".dropdown-menu").addClass("show");
    }
    },
    function () {
      if (screen.width > 991){
      $(".dropdown-toggle").removeClass("show");
      $(".dropdown-menu").removeClass("show");
    }}
    );
  

// UTM params
$(document).ready(function () {
  let url = window.location.href;
  let param = url.split('?');

  if (param[1]) {
    function setHrefUtm(paramId, utmValue) {
      let element = document.getElementById(`param${paramId}`)
      let elementHref = element.getAttribute("href")
      
      element.setAttribute("href", `${elementHref}?${utmValue}`)
    }

    let paramElements = document.getElementsByClassName('param')

    Array.from(paramElements).forEach((a, index) => {
      setHrefUtm(index, param[1])
    })
  }
})