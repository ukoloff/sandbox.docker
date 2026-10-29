# awg

AmneziaWG in docker

## Build

Jist run
```sh
docker bake
```
Pushing to registry is not neccessary

## AmneziaWG client
```ini
[Interface]
PrivateKey = mememememememememememememememememememememe
Address = 10.119.33.40/32

PostUp = ip route add 10.0.0.0/8 via $(ip route | grep default | awk '{print $3}')
PostUp = iptables -t nat -A POSTROUTING -o %i -j MASQUERADE
PostDown = ip route del 10.0.0.0/8 via $(ip route | grep default | awk '{print $3}')
PostDown = iptables -t nat -D POSTROUTING -o %i -j MASQUERADE

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
PublicKey = VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
PresharedKey = PskPskPskPskPskPskPskPskPskPskPskPskPskPskPsk
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
Endpoint = serv.e.r:50119
```
Save it as
[etc/amnezia/amneziawg/awg0.conf](./etc/amnezia/amneziawg/awg0.conf)

Make sure `PostUp\Down` scripts added.

### Copy
```sh
docker compose create
docker compose cp ./etc tweedledee:/tmp/.
```

## .env
```
WEB_UI_USER=admin
# base64(sha256(пароль)); значение ниже — это "changeme", замените:
# printf 'ваш-пароль' | openssl dgst -binary -sha256 | openssl base64
WEB_UI_PASSWORD=BXugPWxEEEhj3HNh/kV4ll0YhzYPkKCJWILlimJI/IY=
```

## NB
Refresh config
```sh
awg syncconf wg0 <(awg-quick strip wg0)
```

Check versions
```sh
awg version
amneziawg-go --version
```

## See also
+ https://habr.com/ru/articles/1080342/
+ https://github.com/vernette/amneziawg-docker
+ https://github.com/mycelium-mesh/amneziawg-ui
