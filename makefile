.PHONY: default render build sync
default: build sync

build:
	npm run build

sync:
	rsync -av ./ snoot:/srv/http/blog/wp-content/plugins/art-block/ --exclude node_modules --exclude .git

render:
	cat src/render-scripts/* | node_modules/.bin/esbuild --log-level=error --minify > dist/render.js
