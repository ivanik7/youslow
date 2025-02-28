
install-tools:
	npm ci

clean: icons-clean tailwind-clean zip-clean

build: icons-resize tailwind-build zip

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

tailwind-build:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css

tailwind-watch:
	npx @tailwindcss/cli -i ./src/style/style.css -o ./src/pages/style.css --watch

tailwind-clean:
	rm -f ./pages/tailwind.css

zip-clean:
	rm -f youslow.zip

zip:
	zip youslow.zip \
		manifest.json \
		youslow-inject.js \
		icons/* \
		pages/*
