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
    FROM golang:alpine
    RUN --mount=type=cache,target=/var/cache/apk <<EOX
      apk add git
    EOX
    COPY --from=build /go/bin/. /go/bin/.
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Golang environment with some packages for DevContainer development preinstalled"
  }
}
