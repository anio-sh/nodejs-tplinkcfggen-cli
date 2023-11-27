#!/bin/bash -eufx

npm i

rm -f ./dist/tpcfggen.mjs

./node_modules/.bin/anio_bundler .

curl \
	--request POST \
	--data-binary "@./dist/tpcfggen.mjs" \
	-H "Content-Type:application/octet-stream" \
	-H "x-anio-auth-key: $ANIO_SH_DEPLOY_KEY" \
	-H "x-anio-file-name: tplinkcfggen" \
	"$ANIO_SH_DEPLOY_URL"
