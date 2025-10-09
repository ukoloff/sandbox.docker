# DNSmasq

Minimal DNS server

## Add records
```sh
docker compose cp etc/dnsmasq.d/. dnsmasq:etc/dnsmasq.d/.
docker compose restart
```

## See also
- [Dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html)
- [Dnsmasq@docker](https://github.com/4km3/docker-dnsmasq)
