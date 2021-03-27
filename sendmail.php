<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require 'PHPMailer/src/Exception.php';
   require 'PHPMailer/src/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail -> CharSet = 'UTF-8';
   $mail -> serLanguage('ru', 'PHPMailer/language/');
   $mail -> IsHTML(true);

   $mail ->setFrom('fire_jacky@mail.ru', "It's me, JONNY");
   $mail ->addAdress('fire_tery@mail.ru');
   $mail ->Subject = "Hi! It's Jonny";

   $body = "<h1>Look it</h1>";

   if(trim(!empty($_POST['name']))){
      $body.='<p><strong>Name</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))){
      $body.='<p><strong>Email</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['messege']))){
      $body.='<p><strong>Messege</strong> '.$_POST['messege'].'</p>';
   }
  
   $mail->Body = $body;

   if(!$mail->send()) {
      $messege = 'Error';
   } else {
      $messege = 'Okay';
   }

   $response = ['messege' => $messege];

   header('Content-type: application/json');
   echo json_encode($response);
   
   ?>