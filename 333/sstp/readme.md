# SSTP

Сервер [SSTP]

По [мотивам](https://github.com/maxqfz/SSTP)

[Клиент на Linux](https://homepage.np-tokumei.net/post/notes-connect-to-an-sstp-vpn-server-using-command-line-in-ubuntu/)

## Готовые сертификаты
Вспомогательный (sidecar) контейнер `crt`
копирует сертификаты из папки
`/etc/ssl/uxm' на хосте Docker
```
docker compose create crt
docker compose cp scripts/. crt:/scripts/.
docker compose start crt
```

## Самописные сертификаты
Вспомогательный (sidecar) контейнер `ca`
содержит простейшую реализацию
Certification Authority
```
docker compose create ca
docker compose cp scripts/. ca:/scripts/.
docker compose start ca
docker compose cp ca:/ssl/ca/ca.cer .
```
Сертификат `ca.cer`
следует установить в:
Локальный компьютер/Доверенные корневые центры сертификации

[SSTP]: https://en.wikipedia.org/wiki/Secure_Socket_Tunneling_Protocol
