group "default" {
  targets = ["js"]
}

target "js" {
  tags = flatten(
    [for reg in ["", "ghcr.io/"] :
      [for date in ["", formatdate("-YYYY.MM", timestamp())] :
	    "${reg}ukoloff/sidecar:js${date}"]])
  pull = true
  dockerfile-inline = <<-EOT
		FROM node:lts-alpine AS build

		WORKDIR /build
		COPY ./*.json ./
		COPY ./src/. ./src/.
		RUN --mount=type=cache,target=/root/.npm <<-EOX
			npm install
			npm run build
			chmod -R +x dist
		EOX

		FROM node:lts-alpine

		RUN --mount=type=cache,target=/var/cache/apk <<-EOX
			apk add git
		EOX
		COPY --from=build /build/dist/. /bin/.

		CMD ["/bin/sidecar-git"]
		EOT

  labels = {
    "org.opencontainers.image.authors" = "ukoloff@gmail.com"
    "org.opencontainers.image.description" = "Sidecar container fetches config from repo and performs some setup"
    "org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
    "dev.dozzle.icon" = "it-tools"
  }
}
