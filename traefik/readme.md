# Traefik

## Boot config
```sh
docker compose create
docker compose cp etc/traefik itself:/etc/
```

## Run in Swarm mode
```sh
docker stack deploy traefik -dc .\swarm.yml
```

## .env
```
NETANGELS_API_KEY=XXXXXXXXXXXX
```

## See also
+ [Traefik]
+ @Habr:
  - [Введение в Traefik 2.0]
  - [Traefikация сервера]
  - [Traefik, docker и docker registry]
  - [Обзор балансировщика traefik]

[Traefik]: https://traefik.io/traefik
[Введение в Traefik 2.0]: https://habr.com/ru/articles/508636/
[Traefikация сервера]: https://habr.com/ru/articles/757820/
[Traefik, docker и docker registry]: https://habr.com/ru/articles/551792/
[Обзор балансировщика traefik]: https://habr.com/ru/companies/otus/articles/797243/
