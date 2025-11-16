group "default" {
  targets = ["vsct"]
}

target "vsct" {
  tags = ["ukoloff/vsc.tun", "ghcr.io/ukoloff/vsc.tun"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM alpine

    WORKDIR /tmp
    RUN --mount=type=cache,target=/var/cache/apk <<EOR
      apk add curl docker-cli
      curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
      tar -xzf vscode_cli.tar.gz -C /usr/bin
      rm vscode_cli.tar.gz
    EOR

    ENTRYPOINT ["/usr/bin/code", "tunnel", "--accept-server-license-terms"]
    EOT

  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Minimal container to develop via VSCode Tunnel"
    "org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
