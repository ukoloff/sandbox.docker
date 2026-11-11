<?
session_name('uxm-trusted-headers-sso');
session_start();
$_SESSION['me'] = 123;

Header('X-PHP-SSO: Yes!');
Header('Remote-User: nobody');
Header('Location: https://auth.ekb.ru/login/?id='.session_id());
