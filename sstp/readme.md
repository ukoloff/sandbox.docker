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
docker compose run crt
```

[SSTP]: https://en.wikipedia.org/wiki/Secure_Socket_Tunneling_Protocol
