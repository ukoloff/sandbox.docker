# wg

Test WireGuard client

## Config
```ini
[Interface]
PrivateKey = *************************
Address = 10.1.2.3/32
MTU = 1420
DNS = 1.1.1.1

[Peer]
PublicKey = ***************************
AllowedIPs = 0.0.0.0/0
Endpoint = 1.2.3.4:55212
PersistentKeepalive = 21
```
Save it as
[wg0.conf](./config/wg0.conf)

Copy:
```sh
docker compose create
docker compose cp ./config/wg0.conf wireguard:/etc/wireguard/
```
