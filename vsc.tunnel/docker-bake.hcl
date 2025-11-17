group "default" {
  targets = ["vsct"]
}

target "vsct" {
  tags = ["ukoloff/vsc.tun", "ghcr.io/ukoloff/vsc.tun"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM alpine

    RUN --mount=type=cache,target=/var/cache/apk <<EOR
      apk add curl docker-cli nodejs-lts git
      curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output /tmp/vscode_cli.tar.gz
      tar -xzf /tmp/vscode_cli.tar.gz -C /usr/bin
      rm /tmp/vscode_cli.tar.gz

      adduser stas -D
      addgroup stas root
    EOR

    # USER stas
    ENTRYPOINT ["/usr/bin/code", "tunnel", "--accept-server-license-terms", "--disable-telemetry"]
    EOT

  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Minimal container to develop via VSCode Tunnel"
    "org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
