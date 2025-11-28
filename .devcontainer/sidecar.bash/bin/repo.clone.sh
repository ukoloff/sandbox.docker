if test -n "$(find ./ -maxdepth 0 -empty)"
then
  git clone -b sidecar.bash --depth 2 -n --filter=tree:0 https://github.com/ukoloff/sandbox.docker .
  git sparse-checkout set --no-cone /sidecar '/.*'
  git checkout
fi
