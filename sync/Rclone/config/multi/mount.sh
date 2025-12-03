#!/bin/sh

(
  sleep 3

  for remote in http webdav sftp
  do
    mkdir -p /mnt/$remote
    rclone rc --no-output mount/mount fs=$remote: mountPoint=/mnt/$remote mountOpt='{"AllowNonEmpty": true}' vfsOpt='{"DirCacheTime": 1000000000}'
  done
) &

exec rclone rcd --rc-no-auth --rc-addr :5572 --rc-web-gui --rc-web-gui-no-open-browser
