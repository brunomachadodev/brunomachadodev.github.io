var searchVisible = 0;
var transparent = true;
var mobile_device = false;

var firstStep = false;
var secondStep = false;
var thirdStep = false;

const clientUserAgent = navigator.userAgent;

var utm = null;

const urlSite = "http://localhost:3333/";
// const urlSite = "https://marketing.yooga.com.br/";

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

window.onload = localStorage.setItem("eventId", create_UUID());

$(document).ready(function () {
  let url = window.location.href;
  let param = url.split("?");

  utm = param[1];
});

//masks
$("#phone").inputmask({
  mask: function () {
    return ["(99) 9999-9999", "(99) 99999-9999"];
  },
  showMaskOnHover: false,
  showMaskOnFocus: false,
});
$("#cnpj").inputmask({
  mask: function () {
    return ["999.999.999-99", "99.999.999/9999-99"];
  },
  showMaskOnHover: false,
  showMaskOnFocus: false,
});

$("[data-action=reset-scroll]").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 100);
});

$("#inside-sale-playlist").click(function () {
  let center = $(window).outerHeight() / 2;
  let top = $(this).offset().top;
  if (top > center) {
    $("html, body").animate({ scrollTop: top - center }, "fast");
  }
});

$(document).ready(function () {
  $.material.init();
  $('[data-toggle="tooltip"]').tooltip();

  var $validator = $(".wizard-card form").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      lastname: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        minlength: 3,
        email: true,
      },
      company: {
        required: true,
        minlength: 3,
      },
      businessModel: {
        required: true,
      },
      monthlyRevenue: {
        required: true,
      },
      uptime: {
        required: true,
      },
      systemChoices: {
        required: true,
        minlength: 1,
      },
    },

    errorPlacement: function (error, element) {
      $(element).parent("div").addClass("has-error");
    },
  });

  $(".wizard-card").bootstrapWizard({
    tabClass: "nav nav-pills",
    nextSelector: ".btn-next",
    previousSelector: ".btn-previous",

    onNext: function (tab, navigation, index) {
      var $valid = $(".wizard-card form").valid();
      if (!$valid) {
        $validator.focusInvalid();
        return false;
      }
    },

    onInit: function (tab, navigation, index) {
      var $total = navigation.find("li").length;
      var $wizard = navigation.closest(".wizard-card");

      $first_li = navigation.find("li:first-child a").html();
      $moving_div = $('<div class="moving-tab">' + $first_li + "</div>");
      $(".wizard-card .wizard-navigation").append($moving_div);

      refreshAnimation($wizard, index);

      $(".moving-tab").css("transition", "transform 0s");
    },

    // onTabClick: function (tab, navigation, index) {
    //   var $valid = $(".wizard-card form").valid();

    //   if (!$valid) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },

    onTabShow: function (tab, navigation, index) {
      var $total = navigation.find("li").length;
      var $current = index + 1;

      var $wizard = navigation.closest(".wizard-card");

      if ($current >= $total) {
        $($wizard).find(".btn-next").hide();
        // $($wizard).find(".btn-finish").show();
      } else {
        $($wizard).find(".btn-next").show();
        $($wizard).find(".btn-finish").hide();
      }

      button_text = navigation.find("li:nth-child(" + $current + ") a").html();

      setTimeout(function () {
        $(".moving-tab").text(button_text);
      }, 150);
      refreshAnimation($wizard, index);
    },
  });
  $(".set-full-height").css("height", "auto");
});

// $('[data-toggle="wizard-radio"]').on("click", function () {
//   wizard = $(this).closest(".wizard-card");
//   wizard.find('[data-toggle="wizard-radio"]').removeClass("active");
//   $(this).addClass("active");
//   $(wizard).find('[type="radio"]').removeAttr("checked");
//   $(this).find('[type="radio"]').attr("checked", "true");
// });

$("[name=next]").click(function () {
  // If de validação ---
  // if (!isFirstStepValid()) {
  //   return;
  // }

  //===========================================================
  // Primeiro Step
  //===========================================================
  if (!firstStep) {
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();

    if (name && email && phone) {
      firstStep = true;
    }

    // Label - lead
    // dataLayer.push({ step: "b2", event: "tracking" });

    // $.ajax({
    //   type: "POST",
    //   url: `${urlSite}lead/pipefyFirstStep`,
    //   data: {
    //     name: $("#name").val(),
    //     email: $("#email").val(),
    //     phone: $("#phone").val(),
    //     cupom: $("#cupom").val() ? $("#cupom").val() : "",
    //     utm: utm,
    //   },
    //   success: (res) => {
    //     pipefyData = res;
    //     if (pipefyData[0]) {
    //       cardPipeComercial = pipefyData[0].vendas00.card.id;
    //       cardPipeSelfService = pipefyData[0].self00.card.id;
    //     } else {
    //       cardPipeComercial = "";
    //       cardPipeSelfService = "";
    //     }
    //   },
    // });

    let data = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      // cupom: $("#cupom").val() ? $("#cupom").val() : null,
      utm: utm ? utm : null,
    };

    console.log(data);
  }
  //===========================================================
  // Segundo Step
  //===========================================================
  else if (!secondStep && firstStep) {
    let values = Array.from(
      document.querySelectorAll('input[name="systemChoices"]')
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    if (values.length > 0) {
      secondStep = true;
    } else {
      let errorMessage = document.querySelector(".system-choices-error");
      errorMessage.style.display = "block";
      var center = $(window).outerHeight() / 2;
      var top = $(this).offset().top;
      if (top > center) {
        $("html, body").animate({ scrollTop: top - center }, "fast");
      }
    }

    // Label - qualified-lead
    // dataLayer.push({ step: "b3", event: "tracking" });

    // if (pipefyData) {
    //   $.ajax({
    //     type: "POST",
    //     url: `${urlSite}lead/pipefySecondStep`,
    //     data: {
    //       company: company,
    //       negocio: negocio,
    //       como_vendas: como_vendas,
    //       comercial: {
    //         cardId: cardPipeComercial,
    //       },
    //       selfService: {
    //         cardId: cardPipeSelfService,
    //       },
    //       db_id: pipefyData[1].id,
    //     },
    //     success: (res) => {
    //       //
    //     },
    //   });
    // }

    let data = {
      company: $("#company").val(),
      negocio: $("#businessModel").val(),
      faturamento_mensal: $("#monthlyRevenue").val(),
      tempo_negocio: $("#uptime").val(),
      systemChoices: values,
    };

    console.log(data);
  }
});

// $("[name=next]").click(function () {
//   // let company = $("#company").val();
//   // let negocio = $("#negocio").val();
//   // let como_vendas = $("input[name=como-vendas]:checked").val();
//   // if (!isSecondStepValid(company, negocio, como_vendas)) {
//   //   return;
//   // }
// });

$("[data-toggle=wizard-checkbox]").each(function () {
  this.onclick = function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).find('[type="checkbox"]').removeAttr("checked");
    } else {
      $(this).addClass("active");
      $(this).find('[type="checkbox"]').attr("checked", "true");
    }
  };
});

$(window).resize(function () {
  $(".wizard-card").each(function () {
    $wizard = $(this);

    index = $wizard.bootstrapWizard("currentIndex");
    refreshAnimation($wizard, index);

    $(".moving-tab").css({
      transition: "transform 0s",
    });
  });
});

function refreshAnimation($wizard, index) {
  $total = $wizard.find(".nav li").length;
  $li_width = 100 / $total;

  total_steps = $wizard.find(".nav li").length;
  move_distance = $wizard.width() / total_steps;
  index_temp = index;
  vertical_level = 0;

  mobile_device = $(document).width() < 600 && $total > 3;

  if (mobile_device) {
    move_distance = $wizard.width() / 2;
    index_temp = index % 2;
    $li_width = 50;
  }

  $wizard.find(".nav li").css("width", $li_width + "%");

  step_width = move_distance;
  move_distance = move_distance * index_temp;

  $current = index + 1;

  if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
    move_distance -= 8;
  } else if (
    $current == total_steps ||
    (mobile_device == true && index % 2 == 1)
  ) {
    move_distance += 8;
  }

  if (mobile_device) {
    vertical_level = parseInt(index / 2);
    vertical_level = vertical_level * 38;
  }

  $wizard.find(".moving-tab").css("width", step_width);
  $(".moving-tab").css({
    transform:
      "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
    transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
  });
}

materialDesign = {
  checkScrollForTransparentNavbar: debounce(function () {
    if ($(document).scrollTop() > 260) {
      if (transparent) {
        transparent = false;
        $(".navbar-color-on-scroll").removeClass("navbar-transparent");
      }
    } else {
      if (!transparent) {
        transparent = true;
        $(".navbar-color-on-scroll").addClass("navbar-transparent");
      }
    }
  }, 17),
};

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

document.getElementById("inside-sale-button").addEventListener("click", () => {
  document.getElementById("wizard-navigation").style.display = "none";
  document.getElementById("wizard-footer").style.display = "none";
  document.getElementById("finish-step").style.display = "none";
  document.getElementById("inside-sale-step").style.display = "block";
});

document
  .getElementById("inside-sale-playlist")
  .addEventListener("click", () => {
    document.getElementById("playlist").classList.add("active");
    document.getElementById("youtube-container").classList.add("active");
    document.getElementById("playlist").focus();
  });

document.getElementById("trial-button").addEventListener("click", () => {
  document.getElementById("inside-sale-button").style.display = "none";
  document.getElementById("trial-sign-in").style.display = "block";
  document.getElementById("acessar-sistema").style.display = "block";
  document.getElementById("form-choice-title").style.display = "none";
  document.getElementById("trial-button").style.display = "none";
  document.getElementById("finishing-choices").style.display = "none";
});

function watchForHover() {
  let lastTouchTime = 0;

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add("hasHover");
  }

  function disableHover() {
    document.body.classList.remove("hasHover");
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener("touchstart", updateLastTouchTime, true);
  document.addEventListener("touchstart", disableHover, true);
  document.addEventListener("mousemove", enableHover, true);

  enableHover();
}

watchForHover();

let produtosObj = [
  {
    negocio: "Sorveteria",
    categorias: [
      {
        descricao: "Picolés",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811173535lvO4spfu7.jpeg",
        produtos: [
          {
            descricao: "Picolé Simples",
            valor_venda: 3,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/picole_3.jpg",
          },
          {
            descricao: "Picolé Recheado",
            valor_venda: 4,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/picole_recheado.jpg",
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/682202008111737134TbnfTn3Q.jpeg",
        produtos: [
          {
            descricao: "Água sem gás",
            valor_venda: 3,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_sem_gas.jpg",
          },
          {
            descricao: "Água com gás",
            valor_venda: 3.5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_com_gas.jpg",
          },
          {
            descricao: "Refrigerante lata",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811173820Gn9YPuGVK.jpeg",
          },
        ],
      },
      {
        descricao: "Açaí",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811174052jsasCWaud.jpeg",
        produtos: [
          {
            descricao: "Taça de Açaí",
            valor_venda: 10,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/acai.jpg",
            complementos: [
              {
                descricao: "Confetes/Biscoito",
                valor_venda: 1,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Frutas",
                valor_venda: 2,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Calda cobertura simples",
                complemento: 1,
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Calda cobertura gourmet",
                complemento: 1,
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Açaí com Cupuaçu",
            valor_venda: 12,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/acai_cupuacu.jpg",
          },
        ],
      },
      {
        descricao: "Sorvete",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811174210Vm4WzBfDw.jpeg",
        produtos: [
          {
            descricao: "Sorvete kg",
            valor_venda: 59.9,
            tipo_produto: 1,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/sorvete_kg.jpg",
          },
          {
            descricao: "1 bola",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811174317HY7JSBFWR.jpeg",
          },
          {
            descricao: "2 bolas",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811174344quAb2S3GU.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Restaurante",
    categorias: [
      {
        descricao: "Self Service",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812085619RGIgzD3dc.jpeg",
        produtos: [
          {
            descricao: "Self Service s/ Churrasco",
            tipo_produto: 1,
            valor_venda: 39.9,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/prato%20comercial_2.jpg",
          },
          {
            descricao: "Self Service c/ Churrasco",
            tipo_produto: 1,
            valor_venda: 59.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812085902udLrKBgZX.jpeg",
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/682202008111737134TbnfTn3Q.jpeg",
        produtos: [
          {
            descricao: "Refrigerante Lata",
            valor_venda: 3,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_sem_gas.jpg",
          },
          {
            descricao: "Água com gás",
            valor_venda: 3.5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_com_gas.jpg",
          },
          {
            descricao: "Refrigerante lata",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68220200811173820Gn9YPuGVK.jpeg",
          },
          {
            descricao: "Água mineral sem gás",
            valor_venda: 3,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_sem_gas.jpg",
          },
          {
            descricao: "Suco",
            valor_venda: 3.5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/coca-cola-ks.jpg",
          },
        ],
      },
      {
        descricao: "Prato Principal",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812091015xb8mtMV2W.jpeg",
        produtos: [
          {
            descricao: "Feijoada Especial",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/695202008120922406LZjrQ8Dr.jpeg",
          },
          {
            descricao: "Strogonoff de Filé Mignon",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/695202008120923462ZdXtgmKB.jpeg",
          },
          {
            descricao: "Salmão c/ Legumes",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812092419F7kog7U24.jpeg",
          },
        ],
      },
      {
        descricao: "Sobremesas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812091102lelzGZ9Yc.jpeg",
        produtos: [
          {
            descricao: "Pudim de Leite Condensado",
            valor_venda: 12.9,
            tipo_produto: 1,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812093514VAdVqbmOI.jpeg",
          },
          {
            descricao: "Mousse de Chocolate",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69520200812093603cRhHIvfKt.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Doceria",
    categorias: [
      {
        descricao: "Bolo fatia",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/678202008111343198Hp3KtbRQ.png",
        produtos: [
          {
            descricao: "Fatia Brigadeiro",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811140122VO1zk3dKy.png",
          },
          {
            descricao: "Fatia Red Velvet",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/678202008111411547u3GnrEzx.png",
          },
          {
            descricao: "Fatia Abacaxi c/ coco",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811140515TJpgT4RGy.png",
          },
          {
            descricao: "Fatia Prestígio",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811140630e5ZYokjS7.png",
          },
        ],
      },
      {
        descricao: "Bolos de pote",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811134409v1zo0JxOF.png",
        produtos: [
          {
            descricao: "Bolo pote Prestígio",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811141421RGF0PP1Ba.png",
          },
          {
            descricao: "Bolo pote Brownie ",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811141458xrV4CKFmy.png",
          },
          {
            descricao: "Bolo pote Morango e Brigadeiro",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811141533EKOHY955M.png",
          },
        ],
      },
      {
        descricao: "Bolos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/678202008111349187pDjSTYDU.png",
        produtos: [
          {
            descricao: "Bolo Decorado",
            valor_venda: 80,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811143333qJGndrFv4.png",
          },
          {
            descricao: "Bolo Brigadeiro",
            valor_venda: 70,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811144646gYLyqItpu.png",
          },
          {
            descricao: "Bolo Red Velvet",
            valor_venda: 70,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811144819ygdRG0Tt4.png",
          },
        ],
      },
      {
        descricao: "Docinhos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811134603XiK2uPoHc.png",
        produtos: [
          {
            descricao: "Leite Ninho com Nutella",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811135115nBuobYrxz.png",
          },
          {
            descricao: "Brigadeiro",
            valor_venda: 2,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811135338FzO4qXnPe.png",
          },
          {
            descricao: "Beijinho",
            valor_venda: 2,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811140920sMdxSBzaZ.png",
          },
          {
            descricao: "Leite Ninho",
            valor_venda: 2.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67820200811141041E6QmULjL3.png",
          },
        ],
      },
    ],
  },
  {
    negocio: "Bar / Petiscaria",
    categorias: [
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812101222uhDOo6gQ7.jpeg",
        produtos: [
          {
            descricao: "Long Neck Heineken",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6992020081210240328VuGb53p.jpeg",
          },
          {
            descricao: "Long Neck Budweiser",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812102458hBJEUc4ca.jpeg",
          },
          {
            descricao: "Eisenbhan 600ml",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812102558PVypSXGTa.jpeg",
          },
          {
            descricao: "Cacildis 600ml",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812102716ZgvBvi3uu.jpeg",
          },
          {
            descricao: "Skol 600ml",
            valor_venda: 11,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/699202008121028173lOtsh3WK.jpeg",
          },
          {
            descricao: "Água s/ gás",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812102940gPWFBiHEQ.jpeg",
          },
          {
            descricao: "Água c/ gás",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812103008NP0T8XqxY.jpeg",
          },
          {
            descricao: "Refrigerante lata",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812103213OJFOOjQr5.jpeg",
          },
          {
            descricao: "Refrigerante 2L",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812103323mANI5Bdpw.jpeg",
          },
        ],
      },
      {
        descricao: "Porções",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/699202008120953260JMdnq1zU.jpeg",
        produtos: [
          {
            descricao: "Batata Frita",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/699202008121018479nOFAYLnu.jpeg",
            complementos: [
              { descricao: "Cheddar", valor_venda: 5, minimo: 0, maximo: 100 },
              {
                descricao: "Provolone",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Molho de Alho Premium",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Frango a Passarinho ",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812101930ozzSTAK9b.jpeg",
            complementos: [
              { descricao: "Cheddar", valor_venda: 5, minimo: 0, maximo: 100 },
              {
                descricao: "Provolone",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Molho de Alho Premium",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Misto (carne, linguiça e frango)",
            valor_venda: 38,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812102250F49TtKj19.jpeg",
            complementos: [
              { descricao: "Cheddar", valor_venda: 5, minimo: 0, maximo: 100 },
              {
                descricao: "Provolone",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Molho de Alho Premium",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Espetinhos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812095642ePOmOkjf2.jpeg",
        produtos: [
          {
            descricao: "Espetinho de Carne",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812103540HK2BEkYZN.jpeg",
          },
          {
            descricao: "Espetinho de Frango",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/699202008121002330WLcNV1Hs.jpeg",
          },
          {
            descricao: "Espetinho de Medalhão de Frango",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812100523A1Arb3Wxv.jpeg",
          },
          {
            descricao: "Espetinho Misto",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812101035NsmwD4vnE.jpeg",
          },
        ],
      },
      {
        descricao: "Drinks",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/699202008121038194h86kh9zw.jpeg",
        produtos: [
          {
            descricao: "Mojito",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812104104tw2l7pCdc.jpeg",
          },
          {
            descricao: "Piña Colada",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812104130GJWKDqt5X.jpeg",
          },
          {
            descricao: "Caipirinha c/ Vodka",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812104241AR24650Pu.jpeg",
          },
          {
            descricao: "Caipirinha c/ Cachaça",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812104403legIq5afU.jpeg",
          },
          {
            descricao: "Caipifruta",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69920200812104432PpRP1IelM.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Padaria / Cafeteria",
    categorias: [
      {
        descricao: "Cafés",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811153926Ey9nOGkUo.jpeg",
        produtos: [
          {
            descricao: "Capuccino Trufado Deluxe",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811160453Ix6WfiNbv.jpeg",
          },
          {
            descricao: "Café Coado Clássico",
            valor_venda: 2.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811160730ZtKcXejHi.jpeg",
          },
          {
            descricao: "Café tipo Americano ",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811161101viikZpLfY.jpeg",
          },
        ],
      },
      {
        descricao: "Assados",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111542554chY8LkpC.jpeg",
        produtos: [
          {
            descricao: "Esfiha Carne",
            valor_venda: 6.49,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811161405S9jDIBLwi.jpeg",
          },
          {
            descricao: "Esfiha Frango c/ Catupiry",
            valor_venda: 6.49,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111615517FEKDwMig.jpeg",
          },
          {
            descricao: "Esfiha Calabresa",
            valor_venda: 6.49,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811161740IQoJ4F9on.jpeg",
          },
          {
            descricao: "Empadão de Frango Premium",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811161917pTo1Yj7l3.jpeg",
          },
          {
            descricao: "Calzone Presunto e Queijo",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811162726BBm1zdNaz.jpeg",
          },
        ],
      },
      {
        descricao: "Sobremesas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111543530PR7pBedy.jpeg",
        produtos: [
          {
            descricao: "Torta Holandesa Fatia",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111630100O8aijdzf.jpeg",
          },
          {
            descricao: "Cheesecake Blueberry Fatia",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811163133GKqBlUmwT.jpeg",
          },
          {
            descricao: "Mousse de Chocolate Belga",
            valor_venda: 7.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811163411wVkXZZ5D0.jpeg",
          },
          {
            descricao: "Bolo Cremoso de Chocolate Fatia",
            valor_venda: 7.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111639176zASthI55.jpeg",
          },
        ],
      },
      {
        descricao: "Bebidas Geladas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/677202008111544517XK90rxQV.jpeg",
        produtos: [
          {
            descricao: "Refrigerante lata",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6772020081116503517PJXkL1X.png",
          },
          {
            descricao: "Ice Tea Limão",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811164540osJWo2hDm.jpeg",
          },
          {
            descricao: "Ice Tea Mix Frutas",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811164829joVmzaxG1.jpeg",
          },
          {
            descricao: "Suco de Laranja Natural",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67720200811170803OuqEFrvLh.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Saladeria",
    categorias: [
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811174755XeuAp7m13.jpeg",
        produtos: [
          {
            descricao: "Sucos",
            valor_venda: 5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/suco_natural.jpg",
          },
          {
            descricao: "Água S/ Gás",
            valor_venda: 3,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/agua_sem_gas.jpg",
          },
          {
            descricao: "Coca-Cola Zero Lata",
            valor_venda: 5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/coca-cola-zero-acucar.jpg",
          },
          {
            descricao: "H2O Limão",
            valor_venda: 5.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811175643u8M0ejDwn.jpeg",
          },
          {
            descricao: "Água com Gás",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811175831jYrIIzRXk.jpeg",
          },
          {
            descricao: "Refrigerante Lata",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6852020081118243523wkffFhY.jpeg",
          },
        ],
      },
      {
        descricao: "Salada KG (Monte sua Salada)",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811174855YBQ5fTAL8.jpeg",
        produtos: [
          {
            descricao: "SALADA KG",
            tipo_produto: 1,
            valor_venda: 46.9,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/salada.jpg",
          },
        ],
      },
      {
        descricao: "Sortidos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811174916e7WKY2YVu.jpeg",
        produtos: [
          {
            descricao: "Trident",
            valor_venda: 2.5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/trident_menta.jpg",
          },
          {
            descricao: "Bala Halls",
            valor_venda: 2.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/685202008111759352LmqK2qv2.jpeg",
          },
          {
            descricao: "Barra de Proteína",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811180528889YsBOFY.jpeg",
          },
        ],
      },
      {
        descricao: "Wrap",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811181816ppGDD5WU1.jpeg",
        produtos: [
          {
            descricao: "Wrap",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811181849pVtt0iApJ.jpeg",
          },
          {
            descricao: "Crepioca",
            valor_venda: 9.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811181927qMqtc2bdM.jpeg",
          },
        ],
      },
      {
        descricao: "Sobremesa",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/685202008111752503a8djgQve.jpeg",
        produtos: [
          {
            descricao: "Salada de Frutas 400g",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811180041BFt2eaXtH.jpeg",
          },
          {
            descricao: "Brownie",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811180228SLTfSyS3b.jpeg",
          },
          {
            descricao: "Picolé de Fruta",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68520200811182229DJGIBtvvY.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Distribuidora de Bebidas",
    categorias: [
      {
        descricao: "Cervejas Lata",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812091933cj9QqJELc.jpeg",
        produtos: [
          {
            descricao: "Latão Skol",
            valor_venda: 5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_latao_skol.jpg",
          },
          {
            descricao: "Latão Brahma",
            valor_venda: 6,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_latao_brahma.jpg",
          },
          {
            descricao: "Latão Devassa",
            valor_venda: 3.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008120926423rOpfzPjh.jpeg",
          },
          {
            descricao: "Latão Budweiser",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008120954030Ef7lfheu.jpeg",
          },
          {
            descricao: "Latão Bohemia",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008121001310rtFb5t0O.jpeg",
          },
        ],
      },
      {
        descricao: "Cervejas Litro",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008120919582R4FM9E8h.jpeg",
        produtos: [
          {
            descricao: "Cerveja Long Neck",
            valor_venda: 6,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja.jpg",
          },
          {
            descricao: "Heineken Litro",
            valor_venda: 10,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_heineken_garrafa.jpg",
          },
          {
            descricao: "Itaipava Litro",
            valor_venda: 9,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_garrafa_itaipava.jpg",
          },
          {
            descricao: "Cerveja Litrinho",
            valor_venda: 7,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/brahma_litrinho.jpg",
          },
          {
            descricao: "Devassa Litro",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812092523wNoXMrZdS.jpeg",
          },
        ],
      },
      {
        descricao: "Bebidas Não Alcoólicas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812092715PvcpXiYzE.jpeg",
        produtos: [
          {
            descricao: "Refrigerante Lata",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812094044j8qRUJhQh.jpeg",
          },
          {
            descricao: "H2O",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812094116DQ4HCBsZa.jpeg",
          },
          {
            descricao: "Água com Gás",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812094547daLdYjYvI.jpeg",
          },
          {
            descricao: "Água sem Gás",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812094619YQn7T0zel.jpeg",
          },
          {
            descricao: "Energético Litro",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008120948571ZRsqZWxN.jpeg",
          },
        ],
      },
      {
        descricao: "Destilados",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812093023OPXaliAck.jpeg",
        produtos: [
          {
            descricao: "Vodka",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812093056MSl6koSJj.jpeg",
          },
          {
            descricao: "Cachaça Nacional",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812093128EPEyNCUZX.jpeg",
          },
          {
            descricao: "Tequila",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812093215OcrYB9aSq.jpeg",
          },
          {
            descricao: "Whisky",
            valor_venda: 50,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/696202008120932354kVnjfEdt.jpeg",
          },
          {
            descricao: "Campari",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812093506mayy3gt3a.jpeg",
          },
          {
            descricao: "Gin",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69620200812094409OP2MCXsNy.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Hamburgueria",
    categorias: [
      {
        descricao: "Hambúrguer Artesanal",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819144656np4WVE6pT.jpeg",
        produtos: [
          {
            descricao: "X-burger",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819145232wD1R805jK.jpeg",
            complementos: [
              {
                descricao: "Queijo cheddar",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Queijo prato",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Banana", valor_venda: 1, minimo: 0, maximo: 100 },
              { descricao: "Picles", valor_venda: 1, minimo: 0, maximo: 100 },
              {
                descricao: "Maionese caseira",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife artesanal",
                valor_venda: 6,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Ovo", valor_venda: 2, minimo: 0, maximo: 100 },
              { descricao: "Bacon", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "X-egg-burger",
            valor_venda: 17,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819151616e5JYCA54l.jpeg",
            complementos: [
              {
                descricao: "Queijo cheddar",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Queijo prato",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Banana", valor_venda: 1, minimo: 0, maximo: 100 },
              { descricao: "Picles", valor_venda: 1, minimo: 0, maximo: 100 },
              {
                descricao: "Maionese caseira",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife artesanal",
                valor_venda: 6,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Ovo", valor_venda: 2, minimo: 0, maximo: 100 },
              { descricao: "Bacon", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "X-tudo",
            valor_venda: 23,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819151733IuVLMG4xo.jpeg",
            complementos: [
              {
                descricao: "Queijo cheddar",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Queijo prato",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Banana", valor_venda: 1, minimo: 0, maximo: 100 },
              { descricao: "Picles", valor_venda: 1, minimo: 0, maximo: 100 },
              {
                descricao: "Maionese caseira",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife artesanal",
                valor_venda: 6,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Ovo", valor_venda: 2, minimo: 0, maximo: 100 },
              { descricao: "Bacon", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "X-egg-frango",
            valor_venda: 18,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819155311pB53dywZ6.jpeg",
            complementos: [
              {
                descricao: "Queijo cheddar",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Queijo prato",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Banana", valor_venda: 1, minimo: 0, maximo: 100 },
              { descricao: "Picles", valor_venda: 1, minimo: 0, maximo: 100 },
              {
                descricao: "Maionese caseira",
                valor_venda: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife artesanal",
                valor_venda: 6,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Ovo", valor_venda: 2, minimo: 0, maximo: 100 },
              { descricao: "Bacon", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819144915yyGwZp39A.jpeg",
        produtos: [
          {
            descricao: "Refri Lata ",
            valor_venda: 3.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200821140924jQQHEUIJV.jpeg",
          },
          {
            descricao: "Suco",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819152922bbBAxu9t4.jpeg",
          },
        ],
      },
      {
        descricao: "Fritas ",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/746202008191450286kBmM0lkJ.jpeg",
        produtos: [
          {
            descricao: "Fritas",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819153218iWtNbmRtW.jpeg",
          },
          {
            descricao: "Batata com Cheddar e Bacon ",
            valor_venda: 18,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200821142249byzVgRpPt.jpeg",
          },
        ],
      },
      {
        descricao: "Sobremesas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200821141826TxGV9szCJ.jpeg",
        produtos: [
          {
            descricao: "Churros ",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200821141717kjbYbtzC8.jpeg",
          },
          {
            descricao: "Milkshake",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/74620200819154759wdk3j0p01.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Açaíteria",
    categorias: [
      {
        descricao: "Açaí",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819150546CGLjJZZfH.jpeg",
        produtos: [
          {
            descricao: "Açaí 350ml",
            valor_venda: 17,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/7502020081915021139szZ5Lc9.jpeg",
            complementos: [
              { descricao: "Kiwi", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Banana", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Morango", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Manga", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Castanha", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Mel", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Confete", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite em pó",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Granola", valor_venda: 0, minimo: 0, maximo: 100 },
            ],
          },
          {
            descricao: "Açaí 500ml",
            valor_venda: 23,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819150242Q1JOI80lI.jpeg",
            complementos: [
              { descricao: "Kiwi", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Banana", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Morango", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Manga", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Castanha", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Mel", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Confete", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite em pó",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Granola", valor_venda: 0, minimo: 0, maximo: 100 },
            ],
          },
          {
            descricao: "Barca 1L",
            valor_venda: 32,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/750202008191526550C6HGZ2rD.jpeg",
            complementos: [
              { descricao: "Kiwi", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Banana", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Morango", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Manga", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Castanha", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Mel", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "Confete", valor_venda: 2, minimo: 0, maximo: 100 },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bife de frango",
                valor_venda: 2,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite condensado",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Leite em pó",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Granola", valor_venda: 0, minimo: 0, maximo: 100 },
            ],
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819151140F2eh6GMjr.jpeg",
        produtos: [
          {
            descricao: "Suco de Laranja 300ml",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819151952dw64IkF5O.jpeg",
          },
          {
            descricao: "Suco Detox 300ml",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819152003oMF4CkXx3.jpeg",
          },
          {
            descricao: "Água sem gás",
            valor_venda: 3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819152018yMEkm7CmV.jpeg",
          },
          {
            descricao: "Vitamina Frutas Vermelhas",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/75020200819152050hwI9zbFxc.jpeg",
          },
          {
            descricao: "Vitamina Banana com Maça",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/750202008191521019ec4Fuw07.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Pizzaria",
    categorias: [
      {
        descricao: "PIZZA",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821140123jPprJ3SWI.jpeg",
        produtos: [
          {
            descricao: "PIZZA",
            valor_venda: 0.01,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821140537BE30lL1Fa.png",
            complementos: [
              {
                descricao: "CALABRESA",
                valor_venda: 35,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "PORTUGUESA",
                valor_venda: 35,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "MARGUERITA",
                valor_venda: 35,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "QUATRO QUEIJOS",
                valor_venda: 30,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "MONTE SUA PIZZA",
            valor_venda: 0.01,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821145443tO4bGdIrl.jpeg",
            complementos: [
              {
                descricao: "MEIA CALABRESA",
                valor_venda: 17.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "MEIA PORTUGUESA",
                valor_venda: 17.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "MEIA MARGUERITA",
                valor_venda: 17.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "MEIA FRANGO COM CATUPIRY",
                valor_venda: 17.5,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821140350OyGipWLl2.jpeg",
        produtos: [
          {
            descricao: "CERVEJA LONG NECK",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821150022LirtDN9WA.png",
          },
          {
            descricao: "COLA-COLA 2LT",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821150057BAwVbackP.jpeg",
          },
          {
            descricao: "REFRIGERANTE LATA",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79320200821150249w73QhN4iR.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Sushi",
    categorias: [
      {
        descricao: "Entradas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211224bXsou79CC.jpeg",
        produtos: [
          {
            descricao: "Sunomono (250 ml)",
            valor_venda: 4.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211019iHOTYgDgh.jpeg",
          },
          {
            descricao: "Sunomono (500ml)",
            valor_venda: 7.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211033mKoqJaiHH.jpeg",
          },
          {
            descricao: "Shimeji (250 ml)",
            valor_venda: 9.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211126L38NMlcuI.jpeg",
          },
          {
            descricao: "Shimeji (500ml)",
            valor_venda: 18.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211102Ys5LlJ6FF.jpeg",
          },
          {
            descricao: "Ceviche (250 ml)",
            valor_venda: 14.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211204w2R82m1N7.jpeg",
          },
          {
            descricao: "Ceviche (500 ml)",
            valor_venda: 21.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211224bXsou79CC.jpeg",
          },
          {
            descricao: "Guioza (carne bovina) - 3 unidades",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/1059202009152113307USN6bB0e.jpeg",
          },
          {
            descricao: "Guioza (carne suina) - 3 unidades",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211356vKOuSEk7y.jpeg",
          },
          {
            descricao: "Harumaki de queijo - 3 unidades",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211417KmDM91Ole.jpeg",
          },
          {
            descricao: "Harumaki de queijo - 3 unidades",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211417KmDM91Ole.jpeg",
          },
        ],
      },
      {
        descricao: "Yakissoba",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205059oZFTYR0hk.jpeg",
        produtos: [
          {
            descricao: "Yakissoba de Carne (1 kg)",
            valor_venda: 29.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205059oZFTYR0hk.jpeg",
          },
          {
            descricao: "Yakissoba de Carne (500g)",
            valor_venda: 17.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205114JufsWoIU6.jpeg",
          },
          {
            descricao: "Yakissoba de Frango (1 kg)",
            valor_venda: 28.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205137kAu6aZuFr.jpeg",
          },
          {
            descricao: "Yakissoba de Frango (500g)",
            valor_venda: 14.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205156PwvXOsQF0.jpeg",
          },
          {
            descricao: "Yakissoba Misto (1 kg)",
            valor_venda: 28.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205221SmwDixwYd.jpeg",
          },
          {
            descricao: "Yakissoba Misto (500g)",
            valor_venda: 16.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205242vwn5YjTQG.jpeg",
          },
        ],
      },
      {
        descricao: "Temaki",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205316jrEVdUDNT.jpeg",
        produtos: [
          {
            descricao: "Temaki Philadelphia",
            valor_venda: 11.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205316jrEVdUDNT.jpeg",
          },
          {
            descricao: "Temaki Grelhado",
            valor_venda: 12.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/1059202009152053333gtyhm9IA.jpeg",
          },
          {
            descricao: "Temaki Hot",
            valor_venda: 15.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205352MtbTxuMG9.jpeg",
          },
          {
            descricao: "Temaki Skin",
            valor_venda: 7.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205423pj2wDdRcv.jpeg",
          },
          {
            descricao: "Temaki Shimeji",
            valor_venda: 11.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205444hogm5d6Ox.jpeg",
          },
        ],
      },
      {
        descricao: "Sushi",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915211842Wmcol9JaG.jpeg",
        produtos: [
          {
            descricao: "Hot Roll (5 peças)",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915205505wWAlGQrrf.jpeg",
          },
          {
            descricao: "Uramaki Salmão (4 peças)",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915212857lYRiHTHcx.jpeg",
          },
          {
            descricao: "Hossomaki Salmão (4 peças)",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210657weHQqsprp.jpeg",
          },
          {
            descricao: "Joe (2 peças)",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210105FQvttKRoK.jpeg",
          },
          {
            descricao: "Niguiri (2 peças)",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210200E0kHXsW4F.jpeg",
          },
        ],
      },
      {
        descricao: "Combos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210612P4R1btxGe.jpeg",
        produtos: [
          {
            descricao: "Hot Roll - 20 peças",
            valor_venda: 24,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/1059202009152105594bI9PWo22.jpeg",
          },
          {
            descricao: "Hot Roll - 30 peças",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210612P4R1btxGe.jpeg",
          },
          {
            descricao: "Hossoaki Salmão (8 peças)",
            valor_venda: 9.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210637OXhblKCx9.jpeg",
          },
          {
            descricao: "Uramaki Salmão (8 peças)",
            valor_venda: 11.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210726g18HCrtAA.jpeg",
          },
        ],
      },
      {
        descricao: "Combinados",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210403DLV8c5bKd.jpeg",
        produtos: [
          {
            descricao: "Combinado 1 (48 peças)",
            valor_venda: 69.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210328B3Av40ngy.jpeg",
          },
          {
            descricao: "Combinado 2 (27 peças)",
            valor_venda: 42.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210403DLV8c5bKd.jpeg",
          },
          {
            descricao: "Combinado 3 (46 peças)",
            valor_venda: 61.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210527AHf0frU1b.jpeg",
          },
          {
            descricao: "Combinado 4 (6 peças)",
            valor_venda: 9.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210443a7bG1XsOh.jpeg",
          },
          {
            descricao: "Combinado 5 (8 peças)",
            valor_venda: 13.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915210514sWCAtKmsJ.jpeg",
          },
          {
            descricao: "Combinado 6 (18 peças)",
            valor_venda: 29.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915213227efZlHhURQ.jpeg",
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231627033CQ6GaJ.png",
        produtos: [
          {
            descricao: "Coca Cola (2l)",
            valor_venda: 11,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231558s2btwCY8e.png",
          },
          {
            descricao: "Fanta Laranja (1,5l)",
            valor_venda: 7.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231612tFtbR22VO.png",
          },
          {
            descricao: "Guaraná Antartica (2l)",
            valor_venda: 7.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915215800pFxCtF0Ek.jpeg",
          },
          {
            descricao: "Coca cola (350 ml)",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231627033CQ6GaJ.png",
          },
          {
            descricao: "Fanta Laranja (350 ml)",
            valor_venda: 4.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915215435GisPaX3DJ.jpeg",
          },
          {
            descricao: "Dolly Guaraná",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915215813EFtF7mDp3.jpeg",
          },
          {
            descricao: "Coca Cola (zero) - 1 l",
            valor_venda: 6.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231642UPJEisWVE.png",
          },
          {
            descricao: "Draft (chop de vinho)",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/1059202009152154580zlpdeR7m.jpeg",
          },
          {
            descricao: "Brahma (lata)",
            valor_venda: 3.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231916D34aIICRn.png",
          },
          {
            descricao: "Skol (lata)",
            valor_venda: 3.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231937hpif6B5Wu.png",
          },
          {
            descricao: "Itaipava",
            valor_venda: 3.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915231949ziX5589o6.png",
          },
        ],
      },
      {
        descricao: "Diversos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915214541jX7xBXnak.jpeg",
        produtos: [
          {
            descricao: "Molho extra (1shoyo+1tarê)",
            valor_venda: 1.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915214541jX7xBXnak.jpeg",
          },
          {
            descricao: "Adaptador de Hashi (unidade)",
            valor_venda: 1,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915230045cK9HAH6q1.png",
          },
          {
            descricao: "Molho Extra - Gengibre",
            valor_venda: 1,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/105920200915214624bIRtWC65j.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Neutro",
    categorias: [
      {
        descricao: "Categoria A",
        url_imagem: null,
        produtos: [
          { descricao: "Produto 1", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 2", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 3", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 4", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 5", valor_venda: 1, url_imagem: null },
        ],
      },
      {
        descricao: "Categoria B",
        url_imagem: null,
        produtos: [
          { descricao: "Produto 6", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 7", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 8", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 9", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 10", valor_venda: 1, url_imagem: null },
        ],
      },
      {
        descricao: "Categoria C",
        url_imagem: null,
        produtos: [
          { descricao: "Produto 11", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 12", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 13", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 14", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 15", valor_venda: 1, url_imagem: null },
        ],
      },
      {
        descricao: "Categoria D",
        url_imagem: null,
        produtos: [
          { descricao: "Produto 16", valor_venda: 1, url_imagem: null },
          { descricao: "Produto 17", valor_venda: 1, url_imagem: null },
        ],
      },
    ],
  },
  { negocio: "Outros", categorias: [] },
];
