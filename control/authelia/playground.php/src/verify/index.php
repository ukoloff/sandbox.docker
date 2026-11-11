<?
session_name('uxm-trusted-headers-sso');
session_start();
$_SESSION['headers'] = getHeaders();

Header('X-PHP-SSO: Yes!');
Header('Remote-User: nobody');
Header('Location: https://auth.ekb.ru/login/?id=' . session_id());

function getHeaders()
{
  $headers = [];
  foreach ($_SERVER as $name => $value) {
    if (substr($name, 0, 5) == 'HTTP_') {
      $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
    }
  }
  return $headers;
}
