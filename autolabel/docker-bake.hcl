group "default" {
  targets = ["daemon"]
}

target "daemon" {
  tags = ["ukoloff/autolabel:js"]
  pull = true
  dockerfile-inline = <<-EOT
    FROM node:alpine
    WORKDIR /repo
    COPY package*.json .
    RUN --mount=type=cache,target=/root/.npm npm ci --only=production
    COPY src/* src/
    EOT
  labels = {
    "org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
    "org.opencontainers.image.description" = "Label Swarm nodes according to services running"
  }
}
