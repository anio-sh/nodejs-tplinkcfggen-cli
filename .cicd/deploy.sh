#!/bin/bash -eufx

printf "Deploying with version '%s'\n" "$RELEASE_VERSION"

rm -f ./dist/tpcfggen.mjs

./node_modules/.bin/anio_bundler .

curl \
	--request POST \
	--data-binary "@./dist/tpcfggen.mjs" \
	-H "Content-Type:application/octet-stream" \
	-H "x-anio-auth-key: $ANIO_SH_DEPLOY_KEY" \
	-H "x-anio-file-name: tplinkcfggen" \
	-H "x-anio-release-version: $RELEASE_VERSION" \
	"$ANIO_SH_DEPLOY_URL"
