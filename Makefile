
install-tools:
	npm ci

clean: icons-clean tailwind-clean
	rm -rf build

build-prepare: icons-resize tailwind-build

build-firefox:
	mkdir -p build
	cp manifest.firefox.json manifest.json
	zip -r build/youslow-firefox.xpi \
		manifest.json \
		icons/* \
		src

build-chrome:
	mkdir -p build
	cp manifest.chrome.json manifest.json
	zip -r build/youslow-chrome.zip \
		manifest.json \
		icons/* \
		src \
		node_modules/webextension-polyfill/dist/browser-polyfill.min.js

build: build-prepare build-chrome build-firefox

run-firefox:
	npx web-ext run

lint:
	npx web-ext lint 

icons-clean:
	rm -rf icons

icons-resize:
	mkdir -p icons
	magick icon.png -resize 48 -quality 10 icons/icon48.png
	magick icon.png -resize 96 -quality 10 icons/icon96.png

tailwind-build:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css

tailwind-watch:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css --watch

tailwind-clean:
	rm -f ./pages/tailwind.css
