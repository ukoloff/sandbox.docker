<?
$cookieName = 'uxm-trusted-headers-sso';
$isLogin = isset($_REQUEST['login']);
$id = $isLogin ? trim($_REQUEST['login']) : '';
if ($id):
  setcookie($cookieName, $id);
  Header('Location: ./');
  exit();
endif;

session_name($cookieName);
session_start();

if (isset($_REQUEST['login!'])):
  $_SESSION['auth'] = array(
    'user' => 'stas',
    'email' => 'stas@ekb.ru',
    'name' => 'Stanislav U.',
    'groups' => 'admin, shell',
  );
  print_r($_SESSION);
  $fwd = getForwards();
  $to = ($fwd->proto && $fwd->host && $fwd->port && $fwd->uri) ?
    $fwd->proto . "://" . $fwd->host . ":" . $fwd->port . $fwd->uri
    :
    './';
  header("Location: $to");
  exit();
endif;

if (isset($_REQUEST['logout!'])):
  session_destroy();
  // setcookie($cookieName, '#', time() - 60 * 60 * 24);
  header("Location: ./");
  exit();
endif;

$isAuth = !!$_SESSION['auth'];
?>
<h1>Hello, world!</h1>

<? if ($isAuth): ?>
  You are logged:
  <ul>
    <? foreach ($_SESSION['auth'] as $k => $v): ?>
      <li><i><?= htmlspecialchars($k) ?></i>: <?= htmlspecialchars($v) ?>
      <? endforeach; ?>
  </ul>
<? else: ?>
  You are not logged!
<? endif; ?>

<? if ($isLogin || !$isAuth): ?>
  <form action="./">
    <input type="hidden" name="login!">
    <button>
      Login!
    </button>
  </form>
<? elseif ($isAuth || isset($_REQUEST['logout'])): ?>
  <form action="./?Logout">
    <input type="hidden" name="logout!">
    <button>
      Logout!
    </button>
  </form>
<? endif; ?>

<ul>
  <li><a href="i">PHP Info</a>
  <li><a href="/">Start</a> over
  <li>Go to
    <a href="https://t5k.ekb.ru/protected/<?= random() ?>/?<?= random() ?>">protected page</a>
</ul>

<?
function random()
{
  return substr(preg_replace('/\W+/', '', base64_encode(sha1(rand()))), 0, 5);
}

function getForwards()
{
  $r = (object)null;
  foreach ($_SESSION['headers'] as $k => $v):
    if (!preg_match('/^x-forwarded-(.*)/i', $k, $m)) continue;
    $k = strtolower($m[1]);
    $r->$k = $v;
  endforeach;
  return $r;
}
