group "default" {
  targets = ["sstp"]
}

target "sstp" {
  tags = ["ukoloff/sstp"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM ghcr.io/astral-sh/uv:python3.9-trixie-slim
    WORKDIR /src
    RUN   \
      --mount=type=cache,target=/var/cache/apt,sharing=locked \
      --mount=type=cache,target=/var/lib/apt,sharing=locked   <<EORUN
      apt update && apt-get install -y ppp
    EORUN
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "SSTP server"
  }
}
