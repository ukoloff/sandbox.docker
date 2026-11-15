<?php
$me = 'World';
?>
<h1>Hello, <?= $me ?></h1>

<ul>
  <li><a href="i">PHP Info</a>
  <li><a href="https://t5k.ekb.ru/protected/<?= random() ?>/?<?= random() ?>">Start authentication</a>
</ul>

<?
function random()
{
  return substr(preg_replace('/\W+/', '', base64_encode(sha1(rand()))), 0, 5);
}
