var current_fs, next_fs;
var left, opacity, scale;
var animating;
let cardPipeComercial;
let cardPipeSelfService;

let pipefyData = null;

let produtos = [];
var firstStep = false;
var secondStep = false;
var thirdStep = false;
let already = false;

let clientUserAgent = navigator.userAgent;

var utm;

// const urlSite = "http://localhost:3333/";
const urlSite = "https://marketing.yooga.com.br/";

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

let produtosObj = [
  {
    negocio: "Informática / Acessórios",
    categorias: [
      {
        descricao: "Acessórios",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200811181223YmM73TxQ8.jpeg",
        produtos: [
          {
            descricao:
              "TECLADO GAMING REDRAGON KALA MECÂNICO RGB SWITCH AZUL, K557RGB-PT-BLUE",
            valor_venda: 349.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812082213bAqboYFHt.jpeg",
          },
          {
            descricao:
              "MOUSEPAD GAMER ASUS ROG EDGE GRANDE 400X450X3MM, 90MP00T0-B0UA00",
            valor_venda: 139.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812082451l8V5tUmZI.jpeg",
          },
          {
            descricao:
              "TECLADO CORSAIR K63 COMPACTO LED AZUL CHERRY MX RED, CH-9145030-BR",
            valor_venda: 939.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812091808ZW8tN0LoQ.jpeg",
          },
          {
            descricao:
              "APRESENTADOR LOGITECH R500 USB WIRELESS PRETO, 910-005333",
            valor_venda: 144.89,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120831389dTH8fm3l.jpeg",
          },
          {
            descricao: "MINI MOUSE LOGITECH M187 WIRELESS AMARELO, 910-005365",
            valor_venda: 55,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812083329JshWCtWqm.jpeg",
          },
          {
            descricao:
              "CAIXA DE SOM LOGITECH MX SOUND 12W BLUETOOTH, 980-001287",
            valor_venda: 449.51,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120834571qlxe29dd.jpeg",
          },
        ],
      },
      {
        descricao: "CPU's",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200811181429Rr2kOx7WH.jpeg",
        produtos: [
          {
            descricao:
              "COMPUTADOR PICHAU GAMER, I3-9100F, RADEON RX 5500 XT 8GB, 8GB DDR4, HD 1TB, 500W, KOMOR RGB",
            valor_venda: 3885.41,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812084151d1gAnsgte.png",
          },
          {
            descricao:
              "COMPUTADOR PICHAU GAMER, I7-9700K, GEFORCE RTX 2060 6GB GIGABYTE, 16GB DDR4, HD 1TB, 650W, WATER COO",
            valor_venda: 7527.68,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812084440WGCkGUHTH.jpeg",
          },
          {
            descricao:
              "COMPUTADOR PICHAU GAMER, I3-8100, RADEON RX 550 4GB, 8GB DDR4, HD 1TB, 400W, HUNTER RGB",
            valor_venda: 3040.32,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812084536IIllSSvLx.jpeg",
          },
          {
            descricao:
              "COMPUTADOR PICHAU GAMER, RYZEN 3 3200G, AMD RADEON RX 550 2GB, RAM 8GB DDR4, HD 1TB, 400W, KRONEN RG",
            valor_venda: 2853.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812084846TmrUrJqJp.jpeg",
          },
          {
            descricao:
              "COMPUTADOR PICHAU LOKI, INTEL G5420, RADEON RX 550 4GB, 8GB (2X4) DDR4, SSD 256GB, 550W, ARGON",
            valor_venda: 2598.64,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812085035sg0al5jQk.png",
          },
          {
            descricao:
              "COMPUTADOR PICHAU GAMER, AMD ATHLON 3000G, RADEON RX 550 2GB, 8GB DDR4, HD 1TB, 400W, TGT ARCHER",
            valor_venda: 2482.45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812085247fj9MytcIy.png",
          },
          {
            descricao:
              "COMPUTADOR PICHAU GAMER VALORANT OMEN, RYZEN 5 3600, RX 5700 XT 8GB, 16GB DDR4, HD 1TB, 650W, SERAPH",
            valor_venda: 6990,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812085457ouPzmjWK8.png",
          },
        ],
      },
      {
        descricao: "Notebooks",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200811181559IEKSdmW7k.jpeg",
        produtos: [
          {
            descricao:
              'NOTEBOOK ACER ASPIRE 3 15,6 " I3-8130U 4GB DDR4 1TB, A315-51-30V4',
            valor_venda: 2199.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812085727aKlLjP76q.jpeg",
          },
          {
            descricao:
              'NOTEBOOK GAMER ACER ASPIRE NITRO 5 GTX 1050 4GB I7-7700HQ 8GB 1TB 15.5" IPS, AN515-51-77FH',
            valor_venda: 5246.32,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120858369rsC5qZ8l.jpeg",
          },
          {
            descricao:
              'NOTEBOOK VAIO C14 I7-6500U 8GB SSD 256GB 14" WINDOWS 10 HOME, VJC141F11X-B1311L',
            valor_venda: 3599.11,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812085950e2ZzPxZoD.jpeg",
          },
          {
            descricao:
              "NOTEBOOK GAMER MSI GP62 2QE LEOPARD PRO INTEL CORE I5-4210H, GTX 950M, 4GB DDR3, TELA 15,6",
            valor_venda: 5698.98,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090054Q5sElnGOy.jpeg",
          },
          {
            descricao: "FONTE PARA NOTEBOOK VINIK UNIVERSAL 90W FN-90W, 25663",
            valor_venda: 66.53,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090153ZfKwVS72X.jpeg",
          },
        ],
      },
      {
        descricao: "Redes e Wireless",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120817446b70hWZzU.jpeg",
        produtos: [
          {
            descricao:
              "ROTEADOR MERCUSYS WIRELESS 300MBPS DUAL BAND 3 ANTENAS, MW330HP",
            valor_venda: 149.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090335aF2vfUsyQ.jpeg",
          },
          {
            descricao: "ACCESS POINT WIRELESS TP-LINK AC1750 DUAL BAND, EAP245",
            valor_venda: 729.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090625zgYppal6F.jpeg",
          },
          {
            descricao:
              "ROTEADOR TP-LINK AC1200 WIRELESS DUAL BAND GIGABIT CEILING MOUNT, EAP320",
            valor_venda: 915.3,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120907554SfTOroyW.jpeg",
          },
          {
            descricao: "SWITCH MERCUSYS DESKTOP 8 PORTAS 10/100MBPS, MS108",
            valor_venda: 56.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090834Rtv1SiqVl.jpeg",
          },
          {
            descricao:
              "ROTEADOR MERCUSYS WI-FI N 300 MBPS 4 ANTENAS 5 DBI COM CONTROLE DOS PAIS, MW325R",
            valor_venda: 109.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812090917YMuVvoBW8.jpeg",
          },
        ],
      },
      {
        descricao: "Hardware",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812081920hZzXuRaMd.jpeg",
        produtos: [
          {
            descricao: "FONTE AEROCOOL KCAS 500W BRONZE 80 PLUS, EN53367",
            valor_venda: 319.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120912031ZHjfs5NX.jpeg",
          },
          {
            descricao:
              "SUPORTE PARA WATER COOLER NZXT KRAKEN G12 BRANCO, RL-KRG12-W1",
            valor_venda: 215,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812091250fdb54AjBl.jpeg",
          },
          {
            descricao:
              "MEMORIA CORSAIR VENGEANCE LPX 16GB (2X8) DDR4 3000MHZ VERMELHA, CMK16GX4M2B3000C15R",
            valor_venda: 719.02,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/689202008120913588AGwqQOET.jpeg",
          },
          {
            descricao: "PASTA TÉRMICA DEEPCOOL Z3, DP-TIM-Z3",
            valor_venda: 16.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812091500Y1pu7jQ14.jpeg",
          },
          {
            descricao: 'SSD WD GREEN 240GB 2.5" SATA III 6GB/S, WDS240G2G0A',
            valor_venda: 259.01,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812091544Vxv40wjRK.jpeg",
          },
          {
            descricao:
              "PLACA DE VIDEO GALAX GEFORCE GT 1030 2GB GDDR5 EXOC WHITE 64-BIT, 30NPH4HVQ5EW",
            valor_venda: 560,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68920200812091651TKjJBnHLv.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Hot Dog",
    categorias: [
      {
        descricao: "Entradas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143128kwCWi3zMa.jpeg",
        produtos: [
          {
            descricao: "Macaroni and Cheese Muenstro",
            valor_venda: 16.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811150200CR2Tds2SU.jpeg",
          },
          {
            descricao: "The Ultra Salcisha",
            valor_venda: 19.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143704CHf9q9eIT.png",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Fritas com Bacon",
            valor_venda: 18.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111438395BXgau57I.png",
            complementos: [
              {
                descricao: "Cheddar",
                valor_venda: 4,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Premium Hot Dogs",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143214OL2uDxBsR.jpeg",
        produtos: [
          {
            descricao: "Originale da Italia",
            valor_venda: 18.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143954xqcilpi76.jpeg",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Salvatore",
            valor_venda: 18.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144207QimgtG3Yz.png",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Virgil o VEGANAUM",
            valor_venda: 18.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144309ebjfD4GhY.png",
          },
          {
            descricao: "Dom Corleone El Mafioso",
            valor_venda: 23.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144403d60O9Fh4N.png",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Jack, the killer",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144531rn704lyko.jpeg",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Michael Corleone, o filho pródigo",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144648LdwjBR7pB.jpeg",
            complementos: [
              {
                descricao: "Salsicha Extra",
                valor_venda: 2.99,
                complemento: 1,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Bacon",
                complemento: 1,
                valor_venda: 4,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Sobremesas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143313QPqwHtpPU.jpeg",
        produtos: [
          {
            descricao: "Strudel",
            valor_venda: 28.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144810M8MkuZt0Z.jpeg",
          },
          {
            descricao: "Charlie Brownie Junior",
            valor_venda: 28.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811144902WoZnJf9YM.png",
          },
          {
            descricao: "Milk shake Galático - Chocolate",
            valor_venda: 22.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111450228uqJVzKDf.png",
          },
          {
            descricao: "Milk shake Galático - Morango",
            valor_venda: 22.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811145232DDWU22ejg.png",
          },
        ],
      },
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811143354kWOzGQD2H.jpeg",
        produtos: [
          {
            descricao: "Eisenbahn",
            valor_venda: 6.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111454197hN8cZtSg.jpeg",
          },
          {
            descricao: "Chop Devassa  Geladão",
            valor_venda: 5.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811145509x3fxhPwPu.jpeg",
          },
          {
            descricao: "Heineken",
            valor_venda: 6.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811150644zep7B9rkv.jpeg",
          },
          {
            descricao: "Coca-Cola",
            valor_venda: 5.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111457351WWfAYJ8s.jpeg",
          },
          {
            descricao: "Suco Del Valle",
            valor_venda: 6.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111458195jVI5hkjK.jpeg",
          },
          {
            descricao: "Fanta Guaraná",
            valor_venda: 5.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811145928b0bFEdOJq.jpeg",
          },
          {
            descricao: "Fanta Laranja",
            valor_venda: 5.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67320200811150006vQqYn1D7S.jpeg",
          },
          {
            descricao: "Sprite",
            valor_venda: 5.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/673202008111500490zXmiDefd.jpeg",
          },
        ],
      },
    ],
  },
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
    negocio: "Floricultura",
    categorias: [
      {
        descricao: "Trepadeira/Pendente",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812090002XgzbQbmCy.jpeg",
        produtos: [
          {
            descricao: "Peperomia",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812090139dT7bbMMnm.jpeg",
          },
          {
            descricao: "Jibóia",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6942020081209025543wYpcPdc.jpeg",
          },
          {
            descricao: "Hera",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812090344PXgzRbuVw.jpeg",
          },
          {
            descricao: "Barba de Moisés",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812090458C3clB2QS9.jpeg",
          },
        ],
      },
      {
        descricao: "Buquê",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812085357X2IlUzFiH.jpeg",
        produtos: [
          {
            descricao: "Buquê 12 Rosas Brancas",
            valor_venda: 78,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812092703mGnUF7f38.jpeg",
            complementos: [
              {
                descricao: "Fita Vermelha",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Sisal para Buquê",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Fita Branca",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Buquê 20 Rosas Vermelhas",
            valor_venda: 190,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812092515oSyb33r4D.png",
            complementos: [
              {
                descricao: "Fita Vermelha",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Sisal para Buquê",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Fita Branca",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Buquê Flores do Campo",
            valor_venda: 98.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812092410kSVvPo0KQ.jpeg",
            complementos: [
              {
                descricao: "Fita Vermelha",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Sisal para Buquê",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Fita Branca",
                valor_venda: 3,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Vasos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812085845Hjs2ZPU77.jpeg",
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
        descricao: "Flor Avulsa",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812092910bF2jIpuDH.jpeg",
        produtos: [
          {
            descricao: "Girassol",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812092947QrVwSXldO.jpeg",
          },
          {
            descricao: "Rosa Vermelha Un",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812093111wYwShxN9L.jpeg",
          },
          {
            descricao: "Rosa Branca Un",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812093159KemGvhs9R.jpeg",
          },
          {
            descricao: "Rosa Rosa Un",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812093222Duh11MHUu.jpeg",
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
    negocio: "Cosméticos",
    categorias: [
      {
        descricao: "Shampoo",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811164300O54qdYEXW.jpeg",
        produtos: [
          {
            descricao: "Shampoo Tressemé Cachos Definidos",
            valor_venda: 14.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69420200812090139dT7bbMMnm.jpeg",
          },
          {
            descricao: "Shampoo Tresemmé Reconstrução e Força",
            valor_venda: 14.99,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811161541DHX9odGqA.jpeg",
          },
          {
            descricao: "Shampoo Tresemmé Hidratação Profunda",
            valor_venda: 14.37,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811161621AGKDIJ4rS.jpeg",
          },
          {
            descricao: "Shampoo Griffus Vou de BABOSA",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811162701oWgpMefz1.jpeg",
          },
        ],
      },
      {
        descricao: "Condicionador",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811164223dTwr1l8q1.jpeg",
        produtos: [
          {
            descricao: "Condicionador Tresemmé Hidratação Profunda",
            valor_venda: 12.8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811161800MyzioDD9s.jpeg",
          },
          {
            descricao: "Condicionador Tresemmé Reconstrução e Força",
            valor_venda: 11.85,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811161916XzGZVGiAn.jpeg",
          },
          {
            descricao: "Condicionador Tresemmé Cachos Perfeitos",
            valor_venda: 12.55,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/680202008111620353i7BHjIrF.jpeg",
          },
        ],
      },
      {
        descricao: "Esmaltes",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811165548OpJkutvte.jpeg",
        produtos: [
          {
            descricao: "Esmalte Dailus",
            valor_venda: 3.25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/680202008111658553jm02e6w9.jpeg",
          },
          {
            descricao: "Esmalte Risqué",
            valor_venda: 2.95,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811170003jpZvpl0oU.jpeg",
          },
          {
            descricao: "Esmalte Colorama",
            valor_venda: 3.2,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811170111WtUwamRoO.jpeg",
          },
          {
            descricao: "Removedor de esmaltes Farmax",
            valor_venda: 4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68020200811170213o0ozYSE8b.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Suplementos",
    categorias: [
      {
        descricao: "Proteínas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811163258JI19D0Q6J.jpeg",
        produtos: [
          {
            descricao: "WHEY PROTEIN CONCENTRADO (1KG) - GROWTH SUPPLEMENTS",
            valor_venda: 76.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811165908jFf5XMXhl.jpeg",
          },
          {
            descricao: "WHEY PROTEIN ISOLADO (1KG) - GROWTH SUPPLEMENTS",
            valor_venda: 139.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811170002NrZobnETl.png",
          },
          {
            descricao:
              "BARRA DE PROTEÍNA (BARRINHA DE PROTEÍNA) - GROWTH SUPPLEMENTS",
            valor_venda: 2.34,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/681202008111704571RJhmNeoM.png",
            complementos: [
              {
                descricao: "Barra de Proteína - Churros",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Barra de Proteína - Cookies n'cream",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Barra de Proteína - Chocolate",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Barra de Proteína - Chocolate com morango",
                valor_venda: 0,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao:
              "SOY PROTEIN (PROTEÍNA ISOLADA DE SOJA) 1KG - GROWTH SUPPLEMENTS",
            valor_venda: 39.6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811171101vD7eFmleX.jpeg",
          },
        ],
      },
      {
        descricao: "Aminoácidos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/681202008111633353OuYkTm91.jpeg",
        produtos: [
          {
            descricao: "BCAA (10:1:1) (200G) (EM PÓ) - GROWTH SUPPLEMENTS",
            valor_venda: 50.4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811171141kh3OKTw09.jpeg",
          },
          {
            descricao: "L-GLUTAMINA (250G) - GROWTH SUPPLEMENTS",
            valor_venda: 43.2,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811171305AjRmpsIgm.png",
          },
          {
            descricao: "CREATINA (250G) (CREAPURE®) - GROWTH SUPPLEMENTS",
            valor_venda: 41.4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811171450DJW4YmGbH.png",
          },
        ],
      },
      {
        descricao: "Carboidratos ",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811163357llPD9Qn2F.png",
        produtos: [
          {
            descricao: "DEXTROSE (1KG) - GROWTH SUPPLEMENTS",
            valor_venda: 14.4,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811171952ZGzoOTEy1.png",
          },
          {
            descricao:
              "HIPERCALÓRICO (SABOR CHOCOLATE) (1KG) - GROWTH SUPPLEMENTS",
            valor_venda: 40.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811172725oky8kcnId.png",
          },
          {
            descricao:
              "100% BATATA DOCE EM PÓ (SABOR NATURAL) (1KG) - GROWTH SUPPLEMENTS",
            valor_venda: 39.6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68120200811172512Abypnpu1A.png",
          },
        ],
      },
    ],
  },
  {
    negocio: "Lava jato",
    categorias: [
      {
        descricao: "Lavagem Simples",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811175550zlvaWQgeX.jpeg",
        produtos: [
          {
            descricao: "Lavagem Hatch",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811180247UPrgHZi9J.png",
            complementos: [
              {
                descricao: "Pretinho no Pneu",
                valor_venda: 1.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Odororizador",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Cera", valor_venda: 10, minimo: 0, maximo: 100 },
              { descricao: "Aspirar", valor_venda: 10, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Lavagem Sedan",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181027i4C5NsACn.jpeg",
            complementos: [
              {
                descricao: "Pretinho no Pneu",
                valor_venda: 1.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Odororizador",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Cera", valor_venda: 10, minimo: 0, maximo: 100 },
              { descricao: "Aspirar", valor_venda: 10, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Lavagem SUV",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181134Vqd09Rqa8.jpeg",
            complementos: [
              {
                descricao: "Pretinho no Pneu",
                valor_venda: 1.5,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Odororizador",
                valor_venda: 5,
                minimo: 0,
                maximo: 100,
              },
              { descricao: "Cera", valor_venda: 10, minimo: 0, maximo: 100 },
              { descricao: "Aspirar", valor_venda: 10, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Lavagem Completa",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811175604a1CTifKCP.jpeg",
        produtos: [
          {
            descricao: "Lavagem Hatch Premium",
            valor_venda: 50,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181309WbNKNRe8y.png",
          },
          {
            descricao: "Lavagem Sedan Premium",
            valor_venda: 60,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181410Y273oGZxP.jpeg",
          },
          {
            descricao: "Lavagem SUV Premium",
            valor_venda: 70,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181504r4rczPVCJ.jpeg",
          },
        ],
      },
      {
        descricao: "Cristalização de Pintura ",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811175617bT2tE2Nkr.png",
        produtos: [
          {
            descricao: "Cristilização Hatch",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811181734vLuAQQCTo.png",
          },
          {
            descricao: "Cristalização Sedan",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811182023gm83elism.jpeg",
          },
          {
            descricao: "Cristalização SUV",
            valor_venda: 45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68620200811182123JLB4iF7VZ.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Roupas e Acessórios",
    categorias: [
      {
        descricao: "Masculino",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812095906Q6J6r5H19.png",
        produtos: [
          {
            descricao: "Camiseta Tradicional - Lost Gold",
            valor_venda: 49.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/697202008120959218QLszvb7k.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Camiseta - Potter",
            valor_venda: 49.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812100110R2B48VyGM.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Camiseta Tradicional - Felidae",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/697202008121003057YdWfdfXL.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Jaqueta de Sarja - Enemy",
            valor_venda: 149.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812100645ohU2BjRNr.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Feminino",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812101950iAG8aGMrz.png",
        produtos: [
          {
            descricao: "Shorts - Marilyn White",
            valor_venda: 49.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812102005pPqyAuIcp.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Regata Feminina - Nefasto",
            valor_venda: 49.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6972020081210215049qyVBU2D.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Raglan Feminina - Noel",
            valor_venda: 54.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812102322pnl5Sd2no.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
          {
            descricao: "Camiseta Feminina Gola Careca - Ariel",
            valor_venda: 54.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812102940Woo8lcYP1.png",
            complementos: [
              { descricao: "P", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "M", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "G", valor_venda: 0, minimo: 0, maximo: 100 },
              { descricao: "GG", valor_venda: 0, minimo: 0, maximo: 100 },
              {
                descricao: "Lavar Cofre do Motor",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
              {
                descricao: "Geral Porta-malas",
                valor_venda: 10,
                minimo: 0,
                maximo: 100,
              },
            ],
          },
        ],
      },
      {
        descricao: "Acessórios",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812104812u0fsHtzkZ.png",
        produtos: [
          {
            descricao: "Chinelo - Black Cat",
            valor_venda: 109.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812110233XnNEQkyet.png",
          },
          {
            descricao: "Snapback Trucker Aba Reta - Flamingo",
            valor_venda: 79.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812110457Gc0ZQ1S3D.png",
          },
          {
            descricao: "Mochila - Goat Luz",
            valor_venda: 189.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69720200812110606gR4uIXn4j.png",
          },
        ],
      },
    ],
  },
  {
    negocio: "Auto Peças",
    categorias: [
      {
        descricao: "Exterior",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/700202008121001408fwFfLxfg.png",
        produtos: [
          {
            descricao: "Farol Máscara Negra Gol G6",
            valor_venda: 192,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812100429GCwIRRTWW.jpeg",
          },
          {
            descricao: "Lanterna Traseira Gol G6",
            valor_venda: 119.8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812100747WToPsjAy7.jpeg",
          },
          {
            descricao: "Capa para Gol G6",
            valor_venda: 52,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812101048GJ3W2zdST.jpeg",
          },
          {
            descricao: "Rack de Teto Gol G6",
            valor_venda: 99.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/7002020081210130284JIP6ALK.jpeg",
          },
          {
            descricao: "Haste Antena Gol G6",
            valor_venda: 69.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812101440VPx5XGsoZ.jpeg",
          },
        ],
      },
      {
        descricao: "Interior",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/700202008121002026J2eQSSR9.jpeg",
        produtos: [
          {
            descricao: "Banco Dianteiro Gol G6",
            valor_venda: 600,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812101800XDGeKXaFb.jpeg",
          },
          {
            descricao: "Banco Traseiro Gol G6",
            valor_venda: 450,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812101932OluY7XSFI.jpeg",
          },
          {
            descricao: "Volante Gol G6",
            valor_venda: 169.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/700202008121021177QGboosB6.jpeg",
          },
          {
            descricao: "Painel de Instrumentos Gol G6",
            valor_venda: 249.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812102240moxSX1LwC.jpeg",
          },
          {
            descricao: "Manopla de Câmbio Gol G6",
            valor_venda: 25.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812102511EY1Fupwz1.jpeg",
          },
        ],
      },
      {
        descricao: "Mecânica",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812100218iDAzCX0AA.jpeg",
        produtos: [
          {
            descricao: "Bateria Moura",
            valor_venda: 314.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812103213CaidIbPKo.jpeg",
          },
          {
            descricao: "Vela de Ignição NGK",
            valor_venda: 14.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812103357QUyIPshlI.png",
          },
          {
            descricao: "Correia Dentada Gol G6",
            valor_venda: 459.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812104206wL3lYmZ1z.jpeg",
          },
        ],
      },
      {
        descricao: "Acessórios",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812100239gPOtrAPwM.jpeg",
        produtos: [
          {
            descricao: "Aromatizante Little Trees Kit com 10",
            valor_venda: 99.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812105209fxQ511ZSk.jpeg",
          },
          {
            descricao: "Organizador Térmico p/ Banco",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812105833BTlZ81Sd4.jpeg",
          },
          {
            descricao: "Suporte p/ Celular",
            valor_venda: 39.9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/70020200812110053RJGneEipz.jpeg",
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
    negocio: "Churrasquinho",
    categorias: [
      {
        descricao: "Bebidas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170330Eu0yrYL9a.jpeg",
        produtos: [
          {
            descricao: "Refrigerante Lata",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170024IxsgVDmta.jpeg",
          },
          {
            descricao: "Cerveja Long Neck",
            valor_venda: 6,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja.jpg",
          },
          {
            descricao: "Heineken 600",
            valor_venda: 10,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_heineken_garrafa.jpg",
          },
          {
            descricao: "Cerveja Devassa Litrão",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/676202008111658196QBjoD3Z3.jpeg",
          },
          {
            descricao: "Latão Brahma",
            valor_venda: 5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/cerveja_latao_brahma.jpg",
          },
          {
            descricao: "Cerveja Litrinho",
            valor_venda: 3.5,
            url_imagem:
              "https://raw.githubusercontent.com/vcslima/banco_de_imagens/master/brahma_litrinho.jpg",
          },
          {
            descricao: "Refrigerante 600 ml",
            valor_venda: 6.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170110KgS1EGB0X.jpeg",
          },
        ],
      },
      {
        descricao: "Espetinho",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170342QKccFhclu.jpeg",
        produtos: [
          {
            descricao: "Espetinho de Boi",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165553TjkHp2SvY.jpeg",
          },
          {
            descricao: "Espetinho de Frango",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165628GEQ79B6Ti.jpeg",
          },
          {
            descricao: "Espetinho de Calabresa",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165208XNfv4r7MA.png",
          },
          {
            descricao: "Espetinho no Pão Francês",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811171913elm888rdG.jpeg",
          },
        ],
      },
      {
        descricao: "Espetão",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170430JUqo6SmCG.jpeg",
        produtos: [
          {
            descricao: "Espetão de Boi",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165608rIBlDY1vf.jpeg",
          },
          {
            descricao: "Espetão de Frango",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165641NottYD4Qq.jpeg",
          },
          {
            descricao: "Espetão Misto",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811165258KCKUHaaRZ.png",
          },
        ],
      },
      {
        descricao: "Porções",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170522CdenutimC.jpeg",
        produtos: [
          {
            descricao: "Batata Frita",
            valor_venda: 8.5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/676202008111656547QBbEzhIS.jpeg",
          },
          {
            descricao: "Jantinha",
            valor_venda: 12,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811170826WPdsbLs6L.jpeg",
          },
          {
            descricao: "Batata Frita com Cheddar e Bacon",
            valor_venda: 14,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811171012WH2sJndF3.jpeg",
          },
          {
            descricao: "Pão de Alho",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67620200811171207lW02jH0bO.jpeg",
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
    negocio: "Petshop",
    categorias: [
      {
        descricao: "Brinquedos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811163248gT3ZyQ7dw.jpeg",
        produtos: [
          {
            descricao: "Osso",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811164635prYBODf2N.png",
          },
          {
            descricao: "Galinha",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811164857XfFdhWpXP.jpeg",
          },
          {
            descricao: "Bolinha",
            valor_venda: 7,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811164950F7U8J6XVK.jpeg",
          },
          {
            descricao: "Corda",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811165136VRkyNdDhE.jpeg",
          },
        ],
      },
      {
        descricao: "Shampoo / Condicionador",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811163422zyltrqURY.jpeg",
        produtos: [
          {
            descricao: "Shampoo para filhote - Cachorro",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811165457kzpDaoqCn.png",
          },
          {
            descricao: "Condicionador para filhote - Cachorro",
            valor_venda: 35,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811165617R49QeJ8Su.jpeg",
          },
          {
            descricao: "Shampoo pelos Claros - Cachorro",
            valor_venda: 45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811165741qWfiCfmRR.jpeg",
          },
          {
            descricao: "Condicionador pelos claros - Cachorro",
            valor_venda: 45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811165918AhXhmKn1B.jpeg",
          },
        ],
      },
      {
        descricao: "Coleira",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811163537u2QCkXACF.jpeg",
        produtos: [
          {
            descricao: "Coleira com nome e telefone - Fêmea",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170101HRW0ty9Qf.jpeg",
          },
          {
            descricao: "Coleira com nome e telefone - Macho",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170145xdfR2aG03.jpeg",
          },
          {
            descricao: "Coleira Peitoral - Pequeno Porte",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170310ZvrZdIj4w.jpeg",
          },
          {
            descricao: "Coleira - Grande Porte",
            valor_venda: 45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170534RsfTfx8gN.jpeg",
          },
        ],
      },
      {
        descricao: "Casinha",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811163733JkA9Sr0wt.jpeg",
        produtos: [
          {
            descricao: "Casinha - Pequeno Porte",
            valor_venda: 110,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170711rxli6Oax9.jpeg",
          },
          {
            descricao: "Casinha - Gato",
            valor_venda: 100,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811170817pYVBL2vUE.jpeg",
          },
        ],
      },
      {
        descricao: "Ração",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/675202008111727022FvvpOtL9.jpeg",
        produtos: [
          {
            descricao: "Ração - Cachorro Filhote",
            valor_venda: 100,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811172902Tq4Mu0Dif.png",
          },
          {
            descricao: "Ração - Cachorro Adulto",
            valor_venda: 110,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811173131998olVHnM.jpeg",
          },
          {
            descricao: "Ração - Gato Adulto",
            valor_venda: 95,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811173250gIsgmbTQX.jpeg",
          },
          {
            descricao: "Ração - Gato Filhote",
            valor_venda: 85,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/67520200811173343soNBsK45F.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Barbearia",
    categorias: [
      {
        descricao: "Degrades",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811175040nMOLrGBVd.jpeg",
        produtos: [
          {
            descricao: "Degrade na 0 e Tesoura em Cima",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811174821tKnmovns0.jpeg",
          },
          {
            descricao: "Degrade 0 Alta e Tesou em Cima",
            valor_venda: 18,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811181203EOZ5mEGAE.png",
          },
        ],
      },
      {
        descricao: "Navalhado",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811175127noWQjWwRx.jpeg",
        produtos: [
          {
            descricao: "Navalhado e máquina em Cima",
            valor_venda: 22,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811181633iFobxYLdg.jpeg",
          },
          {
            descricao: "Navalhado - Tesoura em cima",
            valor_venda: 27,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200812090324sFxRYTVSp.png",
          },
        ],
      },
      {
        descricao: "Pezinho",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811180904jSFaOrMeF.png",
        produtos: [
          {
            descricao: "Pezinho Navalha - Fino",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/6832020081118220895rVbJpI0.png",
          },
          {
            descricao: "Pezinho Navalha - Quadrado",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200811182437q5JlIirH8.jpeg",
          },
        ],
      },
      {
        descricao: "Barba",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/683202008111754204I6m3ZaND.jpeg",
        produtos: [
          {
            descricao: "Barba Desenhada",
            valor_venda: 18,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200812090627kLQBphFZA.jpeg",
          },
          {
            descricao: "Barba Degrade",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/68320200812090814Gq9Pg0mF6.jpeg",
          },
        ],
      },
    ],
  },
  {
    negocio: "Material de Construção",
    categorias: [
      {
        descricao: "Acessórios",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812094733Rtb3saMZ4.png",
        produtos: [
          {
            descricao: "Capacete",
            valor_venda: 60,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812100059epwmIlhku.jpeg",
          },
          {
            descricao: "Colete Refletor",
            valor_venda: 50,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/698202008121002137IcHma5Lf.jpeg",
          },
          {
            descricao: "Botina",
            valor_venda: 150,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812103139iWCrR81LZ.jpeg",
          },
        ],
      },
      {
        descricao: "Tintas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812094911sVNFyKrE3.png",
        produtos: [
          {
            descricao: "Tinta Coral Verde",
            valor_venda: 120,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/698202008121007357ogoU5ppf.png",
          },
          {
            descricao: "Tinta Suvinil Branca",
            valor_venda: 110,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812100839Z7hksVWhz.png",
          },
        ],
      },
      {
        descricao: "Canos e Conectores",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812095629lhMQNtGhc.png",
        produtos: [
          {
            descricao: "Cano de PVC 25MM ",
            tipo_produto: 1,
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812101102qKRIAQp4I.jpeg",
          },
          {
            descricao: "Cotovelo de PVC",
            valor_venda: 5,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812101315EOU52ImHL.jpeg",
          },
          {
            descricao: "Conector em T de PVC",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/698202008121014301By5Co0SW.png",
          },
          {
            descricao: "Tubo Cano Cobre 3/16 Flexível Panqueca 15M",
            valor_venda: 50,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812103300qnL6cew4g.jpeg",
          },
        ],
      },
      {
        descricao: "Ferramentas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812095750LQ2ZaoFHS.jpeg",
        produtos: [
          {
            descricao: "Chave de fenda",
            valor_venda: 40,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812102212kDXpZwUQp.png",
          },
          {
            descricao: "Serrote",
            valor_venda: 45,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/698202008121023234CrZFLJYa.jpeg",
          },
          {
            descricao: "Kit de Ferramentas",
            valor_venda: 150,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/698202008121024592i1RVbdBK.png",
          },
          {
            descricao: "Furadeira",
            valor_venda: 110,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/69820200812103048eiN8iasfN.jpeg",
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
    negocio: "Açougue",
    categorias: [
      {
        descricao: "Cortes bovinos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821135950HuQb4LD5i.jpeg",
        produtos: [
          {
            descricao: "Lagarto",
            valor_venda: 19,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821143040qTtyXW8Ip.jpeg",
          },
          {
            descricao: "Acém",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821142804kDjLUuyXk.jpeg",
          },
          {
            descricao: "Costela",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821142506PCDdNxobG.png",
          },
          {
            descricao: "Patinho",
            valor_venda: 23,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821142047P4OcU7Ke9.jpeg",
          },
          {
            descricao: "Fraldinha",
            valor_venda: 25,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141959Mz7RfaBFd.jpeg",
          },
          {
            descricao: "Filet mignon",
            valor_venda: 55,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141911IjnpxQxjG.jpeg",
          },
          {
            descricao: "Picanha",
            valor_venda: 50,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141801BCpBODKQT.jpeg",
          },
          {
            descricao: "Alcatra",
            valor_venda: 40,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141702IaEx7J33y.jpeg",
          },
        ],
      },
      {
        descricao: "Cortes suínos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141206k1KyMRcvc.jpeg",
        produtos: [
          {
            descricao: "Bacon",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821144057eKMshJp7g.jpeg",
          },
          {
            descricao: "Barriga",
            valor_venda: 14,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821143942t5uTBXDg0.jpeg",
          },
          {
            descricao: "Bisteca",
            valor_venda: 9,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821143810OKzkNjib1.jpeg",
          },
          {
            descricao: "Orelha",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/792202008211437062NSd1BTbj.jpeg",
          },
          {
            descricao: "Rabo",
            valor_venda: 10,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821143518fzP6wgZlL.jpeg",
          },
          {
            descricao: "Costela ",
            valor_venda: 20,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/792202008211433363IM94Eb4S.jpeg",
          },
        ],
      },
      {
        descricao: "Cortes bovinos",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821135950HuQb4LD5i.jpeg",
        produtos: [
          {
            descricao: "Ovo caipira",
            valor_venda: 6,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821144546RKSjYwt3s.jpeg",
          },
          {
            descricao: "Pé ",
            valor_venda: 8,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821144413thJ7F1mie.jpeg",
          },
          {
            descricao: "Coxa e sobrecoxa",
            valor_venda: 15,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821144301jqet4nBey.jpeg",
          },
          {
            descricao: "Peito de frango",
            valor_venda: 16,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/7922020082114415492W8uf5gW.jpeg",
          },
        ],
      },
      {
        descricao: "Linguiças",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/792202008211414329vFLO22nH.jpeg",
        produtos: [
          {
            descricao: "Linguiça apimentada",
            valor_venda: 17,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821145408G1IXREsSn.jpeg",
          },
          {
            descricao: "Linguiça de frango",
            valor_venda: 18,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821144642BOSrTHlf8.jpeg",
          },
        ],
      },
      {
        descricao: "Carnes exóticas",
        url_imagem:
          "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821141547xd97qiZAx.jpeg",
        produtos: [
          {
            descricao: "Carne de jacaré",
            valor_venda: 30,
            url_imagem:
              "https://cdn-adonis.s3.sa-east-1.amazonaws.com/79220200821145521uwAO4nRYF.jpeg",
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

$(document).ready(function () {
  let url = window.location.href;
  let param = url.split("?");

  utm = param[1];
});

//===========================================================
// Primeiro Step
//===========================================================

$(".next").click(function () {
  if (!isFirstStepValid()) {
    return;
  }

  if (!firstStep) {
    firstStep = true;
    // Label - lead
    dataLayer.push({ step: "b2", event: "tracking" });

    $.ajax({
      type: "POST",
      url: `${urlSite}lead/pipefyFirstStep`,
      data: {
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        cupom: $("#cupom").val() ? $("#cupom").val() : "",
        utm: utm,
      },
      success: (res) => {
        pipefyData = res;
        if (pipefyData[0]) {
          cardPipeComercial = pipefyData[0].vendas00.card.id;
          cardPipeSelfService = pipefyData[0].self00.card.id;
        } else {
          cardPipeComercial = "";
          cardPipeSelfService = "";
        }
      },
    });

    animateNext($(this));
  }
});

//===========================================================
// Segundo Step
//===========================================================

$(".next_2").click(function () {
  let company = $("#company").val();
  let negocio = $("#negocio").val();
  let como_vendas = $("input[name=como-vendas]:checked").val();

  if (!isSecondStepValid(company, negocio, como_vendas)) {
    return;
  }

  if (!secondStep) {
    secondStep = true;
    // Label - qualified-lead
    dataLayer.push({ step: "b3", event: "tracking" });

    if (pipefyData) {
      $.ajax({
        type: "POST",
        url: `${urlSite}lead/pipefySecondStep`,
        data: {
          company: company,
          negocio: negocio,
          como_vendas: como_vendas,
          comercial: {
            cardId: cardPipeComercial,
          },
          selfService: {
            cardId: cardPipeSelfService,
          },
          db_id: pipefyData[1].id,
        },
        success: (res) => {
          //
        },
      });
    }

    animateNext($(this));
  }
});

//===========================================================
// Terceiro Step
//===========================================================

$(".last").click(function () {
  let emite = $('input[name="emite"]:checked').val();
  let vendas_dia = $('input[name="vendas_dia"]:checked').val();
  let faturamento_mensal = $('input[name="faturamento_mensal"]:checked').val();
  let tempo_negocio = $('input[name="tempo_negocio"]:checked').val();

  if (!isThirdStepValid(faturamento_mensal, tempo_negocio)) {
    return;
  }

  if (!thirdStep) {
    thirdStep = true;

    // Label - opportunity
    dataLayer.push({ step: "b4", event: "tracking" });

    if (pipefyData) {
      let cardPipe;
      if (pipefyData[0].createCard) {
        cardPipe = pipefyData[0].createCard.card.id;
      } else {
        cardPipe = "";
      }

      $.ajax({
        type: "POST",
        url: `${urlSite}lead/pipefyThirdStep`,
        data: {
          faturamento_mensal: $(
            'input[name="faturamento_mensal"]:checked'
          ).val(),
          tempo_negocio: $('input[name="tempo_negocio"]:checked').val(),
          comercial: {
            cardId: cardPipeComercial,
          },
          selfService: {
            cardId: cardPipeSelfService,
          },
          db_id: pipefyData[1].id,
        },
        success: (res) => {
          //
        },
      });

      $.ajax({
        type: "POST",
        url: `${urlSite}lead/conversionApi`,
        data: {
          event_name: "Opportunity",
          event_url: "https://yooga.com.br/quero-yooga",
          event_id: `${localStorage.getItem("eventId")}`,
          event_time: `${Math.floor(new Date().getTime() / 1000)}`,
          email: $("#email").val(),
          phone: $("#phone").val(),
          client_user_agent: clientUserAgent,
        },
      });
    }

    animateNext($(this));
  }
});

//===========================================================
// Quero falar com um especialista
//===========================================================

$(".especialista").click(function () {
  // Label - specialist
  dataLayer.push({ step: "b5", event: "tracking" });

  if (pipefyData) {
    let cardPipe;

    if (pipefyData[0].createCard) {
      cardPipe = pipefyData[0].createCard.card.id;
    } else {
      cardPipe = "";
    }

    $.ajax({
      type: "POST",
      url: `${urlSite}lead/updateLabel`,
      data: {
        especialista: true,
        db_id: pipefyData[1].id,
        comercial: {
          cardId: cardPipeComercial,
        },
        selfService: {
          cardId: cardPipeSelfService,
        },
      },
      success: (res) => {
        //
      },
    });
  }

  $("#espec").show();
  $("#usar-sistema").hide();

  animateLast($(this));
});

//===========================================================
// Usar Sistema
//===========================================================

$("#usar-sistema-btn").click(function () {
  // Label - start
  dataLayer.push({ step: "b6", event: "tracking" });
  let cnpj = $("#cnpj").val();

  if (pipefyData) {
    let cardPipe;

    if (pipefyData[0].createCard) {
      cardPipe = pipefyData[0].createCard.card.id;
    } else {
      cardPipe = "";
    }

    $.ajax({
      type: "POST",
      url: `${urlSite}lead/updateLabel`,
      data: {
        trial: true,
        db_id: pipefyData[1].id,
        comercial: {
          cardId: cardPipeComercial,
        },
        selfService: {
          cardId: cardPipeSelfService,
        },
      },
      success: (res) => {
        //
      },
    });
  }

  $("#usar-sistema").show();

  animateLast($(this));
});

//===========================================================
// Self-service
//===========================================================

$("#negocio").on("change", function () {
  $("#negocio-finish").val($(this).val());
});

$(".test-now-btn").click(function () {
  //=====================================
  // Data
  //=====================================
  let cnpj = $("#cnpj").val();
  let password = $("#password").val();
  let negocio = $("#negocio-finish").val();

  if (!isTestStepValid(cnpj, password, negocio)) {
    return;
  }

  // Label - trial
  dataLayer.push({ step: "b7", event: "tracking" });

  if (already) {
    return;
  }

  already = true;

  let name = $("#name").val();
  let name2 = $("#company").val();
  let email = $("#email").val();
  let phone = $("#phone").val();

  let data = {
    nome: name2 ? name2 : name,
    cnpj: cnpj,
    email: email,
    telefone: phone,
    password: password,
    produtos: produtos,
    negocio: negocio,
    origin: 3,
    utm: "?utm_source=browse&utm_medium=serp&utm_content=register",
  };

  $.ajax({
    type: "POST",
    url: "https://api.yooga.com.br/instalacoes/new",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (res) => {
      $.ajax({
        type: "POST",
        url: "https://api.yooga.com.br/authenticate",
        data: JSON.stringify({ login_api: cnpj, senha_api: password }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (res) => {
          window.location.href =
            "https://app.yooga.com.br?token=" +
            res.token +
            "&user=" +
            JSON.stringify(res.user);
        },
        error: (res) => {
        },
      });
    },
    error: (res) => {
    },
  });
});

$(".submit").click(function () {
  return false;
});

$("#negocio").on("change", function (event) {
  for (const data of produtosObj) {
    if (data.negocio === $("#negocio").val()) {
      return (produtos = data.categorias);
    }
  }
});

//===========================================================
// Validation
//===========================================================

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isFirstStepValid() {
  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#phone").val();

  if (!name | !email | !phone) {
    return false;
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
    return false;
  }

  var phoneClear = phone.replace(/[^0-9]/g, "");

  if (phoneClear.length < 11) {
    document.getElementById("WrongPhone").style.display = "block";
    return false;
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
    return false;
  }

  if (!validateEmail(email)) {
    document.getElementById("WrongPhone").style.display = "block";
    return false;
  }

  if (email.indexOf("@") > 0 === false) {
    document.getElementById("WrongPhone").style.display = "block";
    return false;
  }
  if (email.indexOf(".com") > 0 === false) {
    document.getElementById("WrongPhone").style.display = "block";
    return false;
  }

  return true;
}

function isSecondStepValid(company, type, como_vendas) {
  if (!company?.trim() || !type || !como_vendas) {
    return false;
  }

  return true;
}

function isThirdStepValid(faturamento_mensal, tempo_negocio) {
  if (!faturamento_mensal || !tempo_negocio) {
    return;
  }

  return true;
}

function isTestStepValid(documento, password, negocio) {
  if (!documento) {
    return false;
  }

  if (documento.length !== 18 && documento.length !== 14) {
    return false;
  }

  if (!password) {
    return false;
  }

  if (!negocio) {
    return false;
  }

  return true;
}
//===========================================================
// Utils
//===========================================================

function animateLast(el) {
  current_fs = $(el).parent();
  next_fs = $(el).parent().next();

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

function animateNext(el) {
  if (animating) return false;
  animating = true;

  current_fs = el.parent();
  next_fs = el.parent().next();

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
        next_fs.css({
          left: left,
          opacity: opacity,
        });
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
