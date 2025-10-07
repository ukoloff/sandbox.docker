group "default" {
  targets = ["sstp"]
}

target "sstp" {
  tags = ["ukoloff/sstp"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM ghcr.io/astral-sh/uv:python3.9-trixie-slim
    COPY /etc/. /etc/.
    WORKDIR /src
    COPY *.toml .
    RUN   \
      --mount=type=cache,target=/var/cache/apt,sharing=locked \
      --mount=type=cache,target=/var/lib/apt,sharing=locked   \
      --mount=type=cache,target=/root/.cache/uv   <<EORUN
      apt update
      apt-get install -y ppp
      uv sync
      openssl req -newkey rsa:4096 -nodes -keyout sstp.key -x509 -days 365 -out sstp.cer -subj /CN=localhost
    EORUN
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "SSTP server"
  }
}
