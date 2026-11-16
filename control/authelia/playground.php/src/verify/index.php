<?
session_name('uxm-trusted-headers-sso');
session_start();

if ($_SESSION['auth']):
  foreach ($_SESSION['auth'] as $k => $v)
    Header("Remote-" . ucfirst($k) . ": " . $v);
else:
  $_SESSION['headers'] = getHeaders();
  Header('Location: https://auth.ekb.ru/?login=' . session_id());
endif;

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
