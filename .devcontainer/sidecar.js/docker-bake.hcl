group "default" {
  targets = ["node-js"]
}

target "node-js" {
  tags = flatten(
    [for reg in ["", "ghcr.io/"] :
      [for date in ["", formatdate("-YYYY.MM", timestamp())] :
	    "${reg}ukoloff/dev:js${date}"]])
  pull = true
  dockerfile-inline = <<-EOT
    # Thanks to RosTelek!
    FROM debian:13-slim AS exts
    WORKDIR /tmp
    COPY devcontainer.json .
    RUN <<EOX
      apt update
      apt install -y wget jq
      wget https://update.code.visualstudio.com/latest/server-linux-x64/stable -O server.tar.gz
      tar xfz server.tar.gz
      sed 's|[[:blank:]]*//.*||' devcontainer.json | jq -r '.customizations.vscode.extensions.[]' |
      while read ext
      do
        vscode-server-linux-x64/bin/code-server --install-extension $ext
      done
    EOX

    FROM node:lts-alpine
    RUN --mount=type=cache,target=/var/cache/apk <<EOX
      apk add git
    EOX
    COPY --from=exts /root/.vscode-server/extensions/. /root/.vscode-server/extensions/.
    EOT
  labels = {
    "org.opencontainers.image.authors" = "ukoloff@gmail.com"
    "org.opencontainers.image.description" = "Node.js environment, a few packages for DevContainer development preinstalled"
    "org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
