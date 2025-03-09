
install-tools:
	npm ci

clean: icons-clean tailwind-clean
	rm -rf build

build-mkdir:
	mkdir -p build/chrome
	mkdir -p build/firefox

build-prepare: build-mkdir icons-resize tailwind-build

build-firefox: image-resize-firefox
	cp manifest.firefox.json manifest.json
	zip -r build/firefox/youslow.xpi \
		manifest.json \
		icons/* \
		src

build-chrome:image-resize-chrome
	mkdir -p build
	cp manifest.chrome.json manifest.json
	zip -r build/chrome/youslow.zip \
		manifest.json \
		icons/* \
		src \
		node_modules/webextension-polyfill/dist/browser-polyfill.min.js

build: clean build-prepare build-chrome build-firefox

run-firefox:
	npx web-ext run

lint:
	npx web-ext lint 

icons-clean:
	rm -rf icons

icons-resize:
	mkdir -p icons
	magick icon.png -scale 48 -quality 10 icons/icon48.png
	magick icon.png -scale 96 -quality 10 icons/icon96.png
	magick icon.png -scale 256 -quality 10 icons/icon256.png

image-resize-chrome:
	magick icon.png -scale 128 -quality 10 build/chrome/icon-128.png
	magick screenshots/1-one-click-speed-toggle.jpg -resize 1280x800 -background "#0F0F0F" -gravity center -extent 1280x800  build/chrome/screenshot-1-one-click-speed-toggle.jpg
	magick screenshots/2-change-speed-using-hotkeys.jpg -resize 1280x800 -background "#0F0F0F" -gravity center -extent 1280x800  build/chrome/screenshot-2-change-speed-using-hotkeys.jpg
	magick screenshots/3-set-default-speed.jpg -resize 1280x800 -background white -gravity center -extent 1280x800  build/chrome/screenshot-3-set-default-speed.jpg

image-resize-firefox:
	magick icon.png -scale 512 -quality 10 build/firefox/icon512.png

tailwind-build:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css

tailwind-watch:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css --watch

tailwind-clean:
	rm -f ./pages/tailwind.css
