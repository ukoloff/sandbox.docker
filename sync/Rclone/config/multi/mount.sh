#!/bin/sh

for remote in http webdav sftp
do
  mkdir -p /mnt/$remote
done
