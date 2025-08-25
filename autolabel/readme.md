# Docker AutoLabel

Расстановка меток на узлы Swarm
в зависимости от работающих на них сервисов

## Build
```sh
docker compose build
```

## Start / stop
```sh
docker stack deploy AL -c .\stack.yml
docker stack rm AL
```

## See also
+ https://github.com/davideshay/dockerautolabel
+ https://hub.docker.com/r/decentralize/dockerautolabel
