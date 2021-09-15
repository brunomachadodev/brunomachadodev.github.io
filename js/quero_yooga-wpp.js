var firstStep = false;

var utm;

// const urlSite = "http://localhost:3333/";
var urlSite = "https://marketing.yooga.com.br/";

$(document).ready(function () {
  let location = window.location.href;
  let main_utm = location.split("?");

  utm = main_utm[1];
});

//===========================================================
// Primeiro Step
//===========================================================

function CadWpp() {
  let name = $("#name").val();
  let phone = $("#phone").val();

  if (!name | !phone) {
    document.getElementById("WrongPhone").style.display = "block";
    return;
  }
  if (
    (name === "teste") |
    (name === "TESTE") |
    (name === "TESTE EMPRESA") |
    (name === "Teste") |
    (name === "Sem empresa") |
    (name === "Sem Empresa") |
    (name === "sem empresa")
  ) {
    document.getElementById("WrongPhone").style.display = "block";
    return;
  }

  var phoneClear = phone.replace(/[^0-9]/g, "");

  console.log(phoneClear);
  if (phoneClear.length < 11) {
    document.getElementById("WrongPhone").style.display = "block";
    return;
  }
  if (
    (phoneClear === "12312312312") |
    (phoneClear === "99999999999") |
    (phoneClear === "88888888888") |
    (phoneClear === "77777777777") |
    (phoneClear === "66666666666") |
    (phoneClear === "55555555555") |
    (phoneClear === "44444444444") |
    (phoneClear === "33333333333") |
    (phoneClear === "22222222222") |
    (phoneClear === "11111111111") |
    (phoneClear === "00000000000")
  ) {
    document.getElementById("WrongPhone").style.display = "block";
    return;
  }

  dataLayer.push({ step: "i1", event: "tracking" });

  if (!firstStep) {
    firstStep = true;

    $.ajax({
      type: "POST",
      url: `${urlSite}lead/pipefyWppLead`,
      data: {
        name: $("#name").val(),
        phone: $("#phone").val(),
        utm: utm,
      },
      success: (res) => {
        pipefyData = res;
      },
    });
    window.open(
      "https://api.whatsapp.com/send?phone=5527997240170&text=Ol%C3%A1%2C%20quero%20conhecer%20mais%20sobre%20a%20Yooga!",
      "_blank"
    );
  }
}

//===========================================================
// Utils
//===========================================================

// function animateLast(el) {
// 	current_fs = $(el).parent();
// 	next_fs = $(el).parent().next();

// 	next_fs.show();
// 	current_fs.animate({opacity: 0}, {
// 		step: function(now, mx) {
// 			scale = 1 - (1 - now) * 0.2;
// 			left = (now * 50)+"%";
// 			opacity = 1 - now;
// 			current_fs.css({
//     		'transform': 'scale('+scale+')',
//     		'position': 'absolute'
// 	    });
// 			next_fs.css({ 'left': left, 'opacity': opacity });
// 		},
// 		duration: 800,
// 		complete: function(){
// 			current_fs.hide();
// 			animating = false;
// 		},
// 		easing: 'easeInOutBack'
// 	});

// }

// function animateNext(el) {
// 	if(animating) return false;
// 	animating = true;

// 	current_fs = el.parent();
// 	next_fs = el.parent().next();

// 	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

// 	next_fs.show();

// 	current_fs.animate({opacity: 0}, {
// 		step: function(now, mx) {
// 			scale = 1 - (1 - now) * 0.2;
// 			left = (now * 50) + "%";
// 			opacity = 1 - now;
// 			current_fs.css({
//   			transform: 'scale('+scale+')',
//   			position: 'absolute'
// 	    });
// 			next_fs.css({
//         left: left,
//         opacity: opacity
//       });
// 		},
// 		duration: 800,
// 		complete: function(){
// 			current_fs.hide();
// 			animating = false;
// 		},
// 		easing: 'easeInOutBack'
// 	});
// }
