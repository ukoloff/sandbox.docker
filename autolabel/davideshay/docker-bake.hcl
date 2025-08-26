group "default" {
  targets = ["daemon"]
}

target "daemon" {
  tags = ["ukoloff/autolabel"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM alpine
    RUN --mount=type=cache,target=/var/cache/apk apk add jq curl docker-cli
    COPY --chmod=0744 ./bin/* /bin/
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Label Swarm nodes according to services running"
  }
}
