apk add openssh-keygen

mkdir -p sftp/.ssh
mkdir -p mnt22/.ssh

if [ ! -f sftp/.ssh/id_ed25519 ]
then
  ssh-keygen -t ed25519 -f sftp/.ssh/id_ed25519 -N ''
  echo sftp $(cat sftp/.ssh/id_ed25519.pub) > mnt22/.ssh/known_hosts
fi

if [ ! -f mnt22/.ssh/id_ed25519 ]
then
  ssh-keygen -t ed25519 -f mnt22/.ssh/id_ed25519 -N ''
  cat mnt22/.ssh/id_ed25519.pub > sftp/.ssh/authorized_keys
fi
