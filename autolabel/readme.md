# Docker AutoLabel

Расстановка меток на узлы Swarm
в зависимости от работающих на них сервисов

## .env
```
DOCKER_HOST=ssh://root@swarm01.ekb.ru
SWARM_LABEL=ukoloff.swarm.label
CLEAN_ON_EXIT=1
```

## Run test stack
```sh
docker stack deploy test -dc .\test.yml
docker stack rm test
```

## See also
[Original idea](davideshay/)
