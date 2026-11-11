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
<form>
  <input type="text" name="login">
  <pre>
  <?php
  print_r($_SESSION);
