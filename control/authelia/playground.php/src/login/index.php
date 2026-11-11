<?
if (isset($_REQUEST['id'])):
  setcookie('uxm-trusted-headers-sso', $_REQUEST['id']);
  Header('Location: ./');
  exit();
endif;
session_name('uxm-trusted-headers-sso');
session_start();
?>
Login:
<form method="POST">
  <input type="text" name="login" disabled>
  <p>
  <button type="submit">Login!</button>
  <pre>
  <?php
  print_r($_SESSION);
