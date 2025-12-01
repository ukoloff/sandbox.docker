# SyncThing sandbox

## Generate .env
```sh
node script/make.env.js
```
## Access to REST API
```sh
curl -sk -H "X-API-Key: $STGUIAPIKEY" http://sthng:8384/rest/system/discovery
```
