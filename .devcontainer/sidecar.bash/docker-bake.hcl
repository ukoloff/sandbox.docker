group "default" {
  targets = ["bash"]
}

target "bash" {
  tags = ["ukoloff/bash:dev", "ghcr.io/ukoloff/bash:dev"]
  pull = true
  dockerfile-inline = <<-EOT
    # Thanks to RosTelek!
    FROM debian:13-slim AS exts
    WORKDIR /tmp
    RUN <<EOX
      apt update
      apt install -y wget
      wget https://update.code.visualstudio.com/latest/server-linux-x64/stable -O server.tar.gz
      tar xfz server.tar.gz
      for ext in EditorConfig.EditorConfig fabiospampinato.vscode-open-in-github mhutchie.git-graph rogalmic.bash-debug mads-hartmann.bash-ide-vscode timonwong.shellcheck jetmartin.bats
      do
        vscode-server-linux-x64/bin/code-server --install-extension $ext
      done
    EOX

    FROM debian:13-slim
    RUN --mount=type=cache,target=/var/cache/apt \
        --mount=type=cache,target=/var/lib/apt/lists <<EOX
      apt update
      apt install -yq procps git shellcheck shfmt bats
    EOX
    COPY --from=exts /root/.vscode-server/extensions/. /root/.vscode-server/extensions/.
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Dev container for Bash development"
		"org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
