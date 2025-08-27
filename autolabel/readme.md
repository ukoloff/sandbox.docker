# Docker AutoLabel

Расстановка меток на узлы Swarm
в зависимости от работающих на них сервисов

## .env
Для локальной отладки
```
DOCKER_HOST=ssh://root@swarm01.ekb.ru
SWARM_LABEL=ukoloff.swarm.label
CLEAN_ON_EXIT=1
```

## Build
```sh
docker bake --push
```

## Start / stop
```sh
docker stack deploy AL -dc .\stack.yml
docker stack rm AL
```

## Run test stack
- (необязательно) укажите имя метки `SWARM_LABEL`, по которой идёт поиск
- Вставьте эту метку в [отслеживаемые службы](test.yml)
- Укажите placement constraint
```sh
docker stack deploy test -dc .\test.yml
docker stack rm test
```

## See also
[Original idea](davideshay/)
