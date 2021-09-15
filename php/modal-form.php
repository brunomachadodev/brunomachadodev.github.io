<?php
$nome		= $_POST['name'];
$phone		= $_POST['phone'];
$email		= $_POST['email'];
$msg 		= $_POST['message'];	
$origin 	= $_POST['origin'] ?: "Contato do Site Yooga";
$content 		= "Origem do Contato: $origin\n\nNome: $nome\n\nE-mail: $email\n\nTelefone: $phone\n\nMensagem: $msg\n";

include('env.php');
require_once("phpmailer/class.phpmailer.php");

$user = $ENV_USER;

function smtpmailer($para, $de, $de_nome, $assunto, $corpo) { 
	include('env.php');
	$user = $ENV_USER;
	$pass = $ENV_PASS;

	global $error;
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->SMTPOptions = array(
	    'ssl' => array(
	        'verify_peer' => true,
	        'verify_peer_name' => true,
	        'allow_self_signed' => true
	    )
	);

	$mail->SMTPDebug = 0;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
	$mail->SMTPAuth = true;	
	$mail->SMTPSecure = 'tls';
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587;
	$mail->Username = $user;
	$mail->Password = $pass;
	$mail->SetFrom($de, $de_nome);
	$mail->Subject = $assunto;
	$mail->Body = $corpo;
	$mail->AddAddress($para);
	if(!$mail->Send()) {
		$error = 'Mail error: '.$mail->ErrorInfo; 
		return false;
	} else {
		$error = 'Mensagem enviada!';
		return true;
	}
}

// Insira abaixo o email que irá receber a mensagem, o email que irá enviar (o mesmo da variável GUSER), 
// o nome do email que envia a mensagem, o Assunto da mensagem e por último a variável com o corpo do email.

if (smtpmailer('contato@yooga.com.br', $user, $nome, $origin, $content)) {
    $res = json_encode(array('type' => 'success', 'message' => 'Mensagem enviada!'));
} else {
    $res = json_encode(array('type' => 'success', 'message' => 'Falha ao enviar a mensagem!', 'error' => $error));
}

	header('Content-Type: application/json');
	echo $res;
?>