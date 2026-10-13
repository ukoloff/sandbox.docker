#!/bin/sh

(
  for n in $(seq 60)
  do
    rclone rc rc/noop --no-output && break
    sleep 0.61803398875
  done

  for remote in http webdav sftp
  do
    mkdir -p /mnt/$remote
    rclone rc --no-output mount/mount fs=$remote: mountPoint=/mnt/$remote mountOpt='{"AllowNonEmpty": true}' vfsOpt='{"DirCacheTime": 1000000000, "CacheMode": "full"}'
  done
) &

exec rclone rcd --rc-no-auth --rc-addr :5572 --rc-web-gui --rc-web-gui-no-open-browser
