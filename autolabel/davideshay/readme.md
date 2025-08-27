# Docker AutoLabel

Расстановка меток на узлы Swarm
в зависимости от работающих на них сервисов

## Build
```sh
docker bake --push
```

## Config
```sh
docker config create autolabel.services config/servicelist.txt
```

## Start / stop
```sh
docker stack deploy AL -c .\stack.yml
docker stack rm AL
```

## Test affinity
- Add `service name` + `label` to [config file](config/servicelist.txt)
- Аdd label to [placement constraint](test.yml)
```sh
docker stack deploy test -c .\test.yml
docker stack rm test
```


## See also
+ https://github.com/davideshay/dockerautolabel
+ https://hub.docker.com/r/decentralize/dockerautolabel
