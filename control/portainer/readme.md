# Portainer

Установка на
- [отдельно стоящий Docker](agent/compose.yml)
- [Swarm](swarm.yml)
- [Swarm + Samba storage](swarm+samba.yml)

    Поскольку `docker stack`
    (в отличие от `docker compose`)
    не загружает `.env`,
    запускать нужно примерно так:
    ```sh
    node --env-file=.env env docker stack deploy portainer -c swarm+samba.yml
    ```
