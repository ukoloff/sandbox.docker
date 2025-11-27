group "default" {
	targets = ["js"]
}

target "js" {
	tags = ["ukoloff/sidecar:js", "ghcr.io/ukoloff/sidecar:js"]
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
		"org.opencontainers.image.authors" = "Stanislav.Ukolov@omzglobal.com"
		"org.opencontainers.image.description" = "Sidecar container fetches config from repo and performs some setup"
		"org.opencontainers.image.source" = "https://github.com/ukoloff/sandbox.docker"
	}
}
