SHELL=/bin/bash
WWW ?= ~/www/appli/ascacou2
yes ?= n

#TARGET=$$(find $$(sed s/^/src\\// src/build ) -type f)
TARGET=src/
BUILD_OPT=
SERVE_OPT=--host 0.0.0.0 --strictPort --port 1234

all: clean build
	@echo $(TARGET)

fast-build: mount
	#npx parcel build --no-scope-hoist --no-optimize $(BUILD_OPT) $(TARGET)

build: mount
	yarn vite build $(BUILD_OPT) $(TARGET)

pretty:
	yarn prettier --write --print-width 100 --jsx-single-quote --single-quote 'src/**/*.js*' # --single-attribute-per-line

clean:
	rm -rf .cache dist .parcel-cache/ /tmp/parcel-dist /tmp/parcel-cache

https: #TODO 	yarn vite --https $(SERVE_OPT) $(TARGET)
	yarn vite $(SERVE_OPT) $(TARGET)

install: clean build
	rsync -Cav$(yes) --del dist/ u50644085@home258443028.1and1-data.host:$(WWW)
	@test -n "$(yes)" && echo -e "utiliser : \n  make install WWW='$(WWW)' yes=\npour faire vraiment l'install dans : $(WWW)" || true

serve: mount
	yarn vite $(SERVE_OPT) $(TARGET)

mount:
	#mkdir -p src
	#mountpoint src || unionfs -o cow src.top/=RW:src.bottom src && sleep 1

flatten: mount
	#fusermount -u src
	#unionfs src.top:src.bottom src
	#rsync -av --delete --exclude .unionfs-fuse src/ src.bottom
	#sleep 1 && fusermount -u src
	#rm -rf src.top
	#mkdir -p src.top
