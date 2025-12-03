#!/bin/sh

for remote in http webdav sftp
do
  mkdir -p /mnt/$remote
  rclone rc mount/mount fs=$remote: mountPoint=/mnt/$remote mountOpt='{"AllowNonEmpty": true}'
done
