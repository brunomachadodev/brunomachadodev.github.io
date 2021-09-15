var current_fs, next_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

let pipefyData = null;

let produtos = [];
var firstStep = false;
var secondStep = false;
var thirdStep = false;

// const urlSite = "http://localhost:3333/";
var urlSite = "https://marketing.yooga.com.br/";

$(".next").click(function () {
  let name = $("#name").val();
  let company = $("#company").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let utm = $("#utm").val();

  var phoneClear = phone.replace(/[^0-9]/g, "");

  function showErrorDialog(errorText) {
    document.getElementById("ErrorDialog").innerHTML = errorText;
    document.getElementById("ErrorDialog").style.display = "block";
  }

  if ($("input[name=origin]:checked").length == 0) {
    showErrorDialog("Ei! Você não contou de onde vem esse Lead :(");
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
    showErrorDialog("Por favor, informe um nome válido");
    return;
  }

  if (!name) {
    showErrorDialog("Informe o nome do contato");
    return;
  }

  if (!company) {
    showErrorDialog("Não esqueça de informar o nome da empresa!");
    return;
  }

  if (phoneClear.length < 11) {
    showErrorDialog(
      "Número de telefone incompleto.<br/> Será que está faltando o DDD?"
    );
    return;
  }

  if (!utm) {
    showErrorDialog("Por favor, preencha o campo de UTM");
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
    showErrorDialog("Por favor, informe um número de telefone válido");
    return;
  }

  if (email && email.indexOf("@") > 0 === false) {
    showErrorDialog("Preencha um email válido");
    return;
  }

  if (email && email.indexOf(".com") > 0 === false) {
    showErrorDialog("Preencha um email válido");
    return;
  }

  let origin = $('input[name="origin"]:checked').val();

  if (!firstStep) {
    firstStep = true;

    $.ajax({
      type: "POST",
      url: `${urlSite}lead/pipefyPipeVendas`,
      data: {
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        company: $("#company").val(),
        instagram: $("#instagram").val(),
        indicacao: $("#quem_indicou_2_0").val(),
        utm: $("#utm").val(),
        origin: origin,
        comentario: $("#comentario").val(),
      },

      success: (res) => {
        console.log(res);
        console.log(res.data);
        pipefyData = res;
      },
    });

    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          scale = 1 - (1 - now) * 0.2;
          left = now * 50 + "%";
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: "easeInOutBack",
      }
    );
  }
});
