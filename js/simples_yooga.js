var current_fs, next_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

let pipefyData = null;

var firstStep = false;
var secondStep = false
var thirdStep = false

var utm;
$(document).ready(function() {
	let url = window.location.href
	let param = url.split("?")
	
	utm = param[1]   
	console.log(utm);        

});

$(".next").click(function(){
	let name = $("#name").val()
	let email = $("#email").val() 
	let phone = $("#phone").val() 

	if(!name | !email | !phone){
		return
	}
	if(name === "teste" | name === "TESTE" | name === "TESTE EMPRESA" |  name === "Teste" | name === "Sem empresa" | name === "Sem Empresa" | name === "sem empresa"){
		document.getElementById("WrongPhone").style.display = "block"
		return
	}
	var phoneClear = phone.replace(/[^0-9]/g, '')
	
	if(phoneClear.length < 11){
		
		document.getElementById("WrongPhone").style.display = "block"
		return
	}
	if(phoneClear === "12312312312" | phoneClear === "99999999999" | phoneClear === "88888888888" | phoneClear === "77777777777" | phoneClear === "66666666666" | phoneClear === "55555555555" | phoneClear === "44444444444" | phoneClear === "33333333333" | phoneClear === "22222222222" | phoneClear === "11111111111" | phoneClear === "00000000000"){
		document.getElementById("WrongPhone").style.display = "block"
		return
	}

	if((email.indexOf("@") > 0) === false){
		return
	}
	if((email.indexOf(".com") > 0) === false){
		return
	}

	if(!firstStep) {
		console.log("parceiro")
		firstStep = true;

		dataLayer.push({'step': 9, 'event': 'tracking'})

		$.ajax({
			type: "POST",
			url: "https://marketing.yooga.com.br/lead/pipefyParceiro",
			data: {
			name: $("#name").val(),
			email: $("#email").val(),
			phone: $("#phone").val(),
			utm: utm,
			},
			success: (res) => {
				// console.log(res)
				// console.log(res.data)
				pipefyData = res
			}
		});
		
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		next_fs.show(); 
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				scale = 1 - (1 - now) * 0.2;
				left = (now * 50)+"%";
				opacity = 1 - now;
				current_fs.css({
			'transform': 'scale('+scale+')',
			'position': 'absolute'
		});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			easing: 'easeInOutBack'
		});
	}
});

// $(".next_2").click(function(){
// 	let company = $("#company").val()
// 	let type = $("#type").val() 

// 	if(!company | !type){
// 		return
// 	}

// 	if(!secondStep) {
// 		console.log("secondStep")
// 		secondStep = true;
// 		dataLayer.push({'step': 6, 'event': 'tracking'})

// 		if(pipefyData && pipefyData[0].createCard && pipefyData[0].createCard.card) {
// 			$.ajax({
// 				type: "POST",
// 				url: "https://marketing.yooga.com.br/lead/pipefySecondStep",
// 				data: {
// 				  company: $("#company").val(),
// 				  type: $("#type").val(),
// 				  cardId: pipefyData[0].createCard.card.id,
// 				  db_id: pipefyData[1].id,
// 				  reativado: "reativado"
// 				},
// 				success: (res) => {
// 					console.log(res, "pipeUpadte")
// 				}
// 			});
// 		}

	
// 		if(animating) return false;
// 		animating = true;
		
// 		current_fs = $(this).parent();
// 		next_fs = $(this).parent().next();
		
// 		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
// 		next_fs.show(); 
// 		current_fs.animate({opacity: 0}, {
// 			step: function(now, mx) {
// 				scale = 1 - (1 - now) * 0.2;
// 				left = (now * 50)+"%";
// 				opacity = 1 - now;
// 				current_fs.css({
// 			'transform': 'scale('+scale+')',
// 			'position': 'absolute'
// 		});
// 				next_fs.css({'left': left, 'opacity': opacity});
// 			}, 
// 			duration: 800, 
// 			complete: function(){
// 				current_fs.hide();
// 				animating = false;
// 			}, 
// 			easing: 'easeInOutBack'
// 		});

// 	}
// });


// $(".last").click(function(){

// 	let inaugurou = $('input[name="inaugurou"]:checked').val()
// 	let solucao = $('input[name="solucao"]:checked').val()
// 	let satisfeito = $('input[name="satisfacao"]:checked').val()

// 	if(!inaugurou | !solucao | !satisfacao){
// 		return
// 	}

// 	if(!thirdStep) {
// 		console.log("thirdStep")
// 		thirdStep = true;
// 		dataLayer.push({'step': 7, 'event': 'tracking'})
// 		if(pipefyData && pipefyData[0].createCard && pipefyData[0].createCard.card) {
// 			$.ajax({
// 				type: "POST",
// 				url: "https://marketing.yooga.com.br/lead/pipefyThirdStep",
// 				data: {
// 					inaugurou: $('input[name="inaugurou"]:checked').val(),
// 					solucao: $('input[name="solucao"]:checked').val(),
// 					satisfeito: $('input[name="satisfacao"]:checked').val(),
// 					cardId: pipefyData[0].createCard.card.id,
// 					db_id: pipefyData[1].id,
// 					reativado: "reativado"
// 				},
// 				success: (res) => {
// 					console.log("pipeUpadte")
// 				}
// 			});
// 		}
	
// 		if(animating) return false;
// 		animating = true;
		
// 		current_fs = $(this).parent();
// 		next_fs = $(this).parent().next();
		
// 		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
// 		next_fs.show(); 
// 		current_fs.animate({opacity: 0}, {
// 			step: function(now, mx) {
// 				scale = 1 - (1 - now) * 0.2;
// 				left = (now * 50)+"%";
// 				opacity = 1 - now;
// 				current_fs.css({
// 			'transform': 'scale('+scale+')',
// 			'position': 'absolute'
// 		});
// 				next_fs.css({'left': left, 'opacity': opacity});
// 			}, 
// 			duration: 800, 
// 			complete: function(){
// 				current_fs.hide();
// 				animating = false;
// 			}, 
// 			easing: 'easeInOutBack'
// 		});
// 	}

// });


$(".submit").click(function(){
	return false;
});
