# awg

AmneziaWG in docker

## AmneziaWG client
```ini
[Interface]
PrivateKey = **************************************
Address = 10.119.33.40/32
DNS = 1.1.1.1, 8.8.8.8
MTU = 1280
Jc = 9
Jmin = 30
Jmax = 90
S1 = 110
S2 = 120
S3 = 47
S4 = 23
H1 = 7291435-486117520
H2 = 602843917-1157629843
H3 = 1249871566-1680354947
H4 = 1781926002-2106438100
I1 = <b 0x0003><r 2><b 0x2112A442><r 12><r 20>
I2 = <b 0x0103><r 2><b 0x2112A442><r 12><r 24>
I3 = <b 0x0008><r 2><b 0x2112A442><r 12><r 16>

[Peer]
PublicKey = **************************************
PresharedKey = **************************************
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
Endpoint = serv.e.r:50119
```
Save it as
[etc/amnezia/amneziawg/awg0.conf](./etc/amnezia/amneziawg/awg0.conf)

### Copy
```sh
docker compose create
docker compose cp ./etc tweedledee:/tmp/.
```

## WireGuard server
```ini
[Interface]
Address = 10.10.0.1/24
PrivateKey = **************************************
ListenPort = 54321

[Peer]
PublicKey = **************************************
AllowedIPs = 10.10.0.10/32
```
Client
```ini
[Interface]
Address = 10.10.0.10/32
PrivateKey = **************************************

[Peer]
PublicKey = **************************************
Endpoint = awg.ekb.ru:54321
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 27
```

## See also
+ https://habr.com/ru/articles/1080342/
+ https://github.com/vernette/amneziawg-docker
