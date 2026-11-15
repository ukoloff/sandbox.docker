# Port-fwd

Простейшая переадресация порта.

Для подключения к MTProxy

## .env
```
REMOTE_HOST=xxx.xxx.xxx.xxx
REMOTE_PORT=8080
LOCAL_PORT=8888
```

## Кстати
В Windows заблокированы некоторые порты, в частности 8080
```bat
netsh interface ipv4 show excludedportrange protocol=tcp
```
