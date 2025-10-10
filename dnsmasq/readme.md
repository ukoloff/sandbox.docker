# DNSmasq

Minimal DNS server

## Add records
```sh
docker compose cp etc/dnsmasq.hosts dnsmasq:etc/
```
These changes automagically refresh.

## Delegate
- Add glue record(s0)
```
zone.domain   IN NS server.domain
server.domain IN A  1.2.3.4
```

## See also
- [Dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html)
- [Dnsmasq@docker](https://github.com/4km3/docker-dnsmasq)
- [acme-dns](https://github.com/joohoi/acme-dns)
