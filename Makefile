SHELL=/bin/bash
WWW ?= ~/www/appli/ascacou2
yes ?= n

#TARGET=$$(find $$(sed s/^/src\\// src/build ) -type f)
TARGET=public/index.html
BUILD_OPT=--public-url ./
SERVE_OPT=--lazy

all: clean build
	@echo $(TARGET)

fast-build: static
	npx parcel build --no-scope-hoist --no-optimize $(BUILD_OPT) $(TARGET)

build: clean static 
	npx parcel build $(BUILD_OPT) $(TARGET)

clean:
		rm -rf .cache dist .parcel-cache/

pretty:
	npx prettier --write 'src/**/*.js*'

static:
	mkdir -p dist
	rsync -av src/static/ dist

server http https: static
	npx parcel serve -p 3000 $(TARGET)

install:
	rsync -Cav$(yes) --del dist/ u50644085@home258443028.1and1-data.host:$(WWW)
	@test -n "$(yes)" && echo -e "utiliser : \n  make install WWW='$(WWW)' yes=\npour faire vraiment l'install dans : $(WWW)" || true
