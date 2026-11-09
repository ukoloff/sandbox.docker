group "default" {
  targets = ["2empty"]
}

target "2empty" {
  tags = flatten(
    [for reg in ["", "ghcr.io/"] :
	    "${reg}ukoloff/2empty"])
  dockerfile-inline = <<-EOT
    FROM alpine AS build
    WORKDIR /scripts
    COPY scripts/. .
    RUN <<EOX
      for script in cleanup setup
      do
        echo '#!/bin/sh' > $${script}_iptables.sh
      done
      chmod +x *
    EOX

    FROM scratch
    COPY --from=build /scripts/. .
    EOT
  labels = {
    "org.opencontainers.image.authors" = "ukoloff@gmail.com"
    "org.opencontainers.image.description" = "Disable iptables manipulations inside myceliummesh/amneziawg-ui"
    "org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
  }
}
