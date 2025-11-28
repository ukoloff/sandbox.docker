group "default" {
  targets = ["golang"]
}

target "golang" {
  tags = ["ukoloff/golang:dev", "ghcr.io/ukoloff/golang:dev"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM golang:alpine AS build
    RUN <<EOX
      go install golang.org/x/tools/gopls@latest
      go install honnef.co/go/tools/cmd/staticcheck@latest
      go install github.com/go-delve/delve/cmd/dlv@latest
    EOX

    FROM debian:13-slim AS exts
    WORKDIR /tmp
    RUN <<EOX
      apt update
      apt install -y wget
      wget https://update.code.visualstudio.com/latest/server-linux-x64/stable -O server.tar.gz
      tar xfz server.tar.gz
      for ext in golang.go mhutchie.git-graph EditorConfig.EditorConfig
      do
        vscode-server-linux-x64/bin/code-server --install-extension $ext
      done
    EOX

    FROM golang:alpine
    RUN --mount=type=cache,target=/var/cache/apk <<EOX
      apk add git
    EOX
    COPY --from=build /go/bin/. /go/bin/.
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Golang environment with some packages for DevContainer development preinstalled"
		"org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
