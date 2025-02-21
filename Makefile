
install-tools:
	npm ci

clean: zip-clean icons-clean

build: clean icons-resize lint zip

run-ff:
	npx web-ext run

lint:
	npx web-ext lint 

icons-clean:
	rm -rf icons

icons-resize:
	mkdir -p icons
	magick icon.png -resize 48 -quality 10 icons/icon48.png
	magick icon.png -resize 96 -quality 10 icons/icon96.png

zip-clean:
	rm -f youslow.zip

zip:
	zip youslow.zip \
		manifest.json \
		youslow-inject.js \
		icons/*
