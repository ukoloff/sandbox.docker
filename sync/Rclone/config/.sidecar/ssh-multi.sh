mkdir -p multi/.ssh
cp mnt22/.ssh/id_ed25519 multi/.ssh/id_ed25519

for f in 80 88 22
do
  mkdir -p /mnt/$f
done
